// The owner tools (/tools/*), locked to the admin wallets in lib/admins.js.
// The tool pages are never in public/: they're built into lib/toolfiles.js and only served from here, to a browser
// holding a tools pass. The pass comes from signing a fresh Sign-In with Ethereum message with an admin wallet.
//   GET  /tools, /tools/<file>           (vercel.json sends these to /api/tools?f=<file>)
//   POST /api/tools { action: 'nonce', address }        the message to sign (admin wallets only)
//   POST /api/tools { action: 'verify', message, signature }   checks it and sets the pass (8 hours)
//   POST /api/tools { action: 'logout' }
import { randomBytes } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { db } from '../lib/db.js';
import { guard, send, fail, body, cookie, appDomain, hostAllowed, reqHost } from '../lib/http.js';
import { CHAIN_ID, STATEMENT, TTL_MS, buildSiwe, checksum, parseSiwe, checkFields, signatureValid } from '../lib/siwe.js';
import { isToolAdmin } from '../lib/admins.js';
import { TOOL_FILES } from '../lib/toolfiles.js';

const HOURS = 8, ISS = 'lanternhold-tools';
const secure = () => process.env.LH_INSECURE_COOKIE === '1' ? '' : '; Secure';
const key = () => { const s = process.env.SESSION_SECRET; if (!s || s.length < 32) throw new Error('SESSION_SECRET must be set'); return new TextEncoder().encode(s); };
const passCookie = t => t ? `lh_t=${t}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${HOURS * 3600}${secure()}` : `lh_t=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure()}`;
const nonceCookie = n => n ? `lh_tn=${n}; Path=/api/tools; HttpOnly; SameSite=Strict; Max-Age=300${secure()}` : `lh_tn=; Path=/api/tools; HttpOnly; SameSite=Strict; Max-Age=0${secure()}`;
const TYPES = { html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8' };
const PUBLIC = new Set(['login.js']);   // the sign-in screen's own script is the only file served without a pass

// Who holds a valid pass? The wallet is checked against the admin list on every request, so removing a wallet from
// lib/admins.js locks it out at the next deploy, even with a pass it already has.
async function admin(req) {
  const t = cookie(req, 'lh_t'); if (!t) return null;
  try { const { payload } = await jwtVerify(t, key(), { issuer: ISS, algorithms: ['HS256'] }); return isToolAdmin(payload.sub) ? checksum(payload.sub) : null; }
  catch { return null; }
}

function serve(res, name, status = 200) {
  const ext = name.split('.').pop();
  res.statusCode = status;
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Frame-Options', 'DENY'); res.setHeader('Referrer-Policy', 'no-referrer');
  res.end(TOOL_FILES[name]);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const f = String(new URL(req.url, 'http://x').searchParams.get('f') || '').replace(/^\/+|\/+$/g, '') || 'index.html';
    if (PUBLIC.has(f)) return serve(res, f);
    const who = await admin(req).catch(() => null);
    if (!who) return /\.js$|\.css$/.test(f) ? fail(res, 401, 'locked') : serve(res, 'login.html', 401);
    if (!Object.prototype.hasOwnProperty.call(TOOL_FILES, f) || f === 'login.html') return fail(res, 404, 'not_found');
    return serve(res, f);
  }
  if (!(await guard(req, res, { methods: ['GET', 'POST'], auth: false }))) return;
  try {
    const b = (await body(req)) || {};
    if (b.action === 'logout') { res.setHeader('Set-Cookie', passCookie(null)); return send(res, 200, { ok: true }); }
    if (b.action === 'nonce') {
      if (!hostAllowed(reqHost(req))) return fail(res, 403, 'bad_origin');
      const address = checksum(b.address || '');
      if (!address || !isToolAdmin(address)) return fail(res, 403, 'not_admin', { msg: 'This wallet isn’t allowed into the owner tools.' });
      const nonce = randomBytes(18).toString('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 24).padEnd(16, '0');
      await db().createNonce(nonce);
      const domain = appDomain(req), local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(domain), now = new Date();
      const message = buildSiwe({ domain, address, uri: (local ? 'http://' : 'https://') + domain, chainId: CHAIN_ID, nonce, issuedAt: now.toISOString(), expiresAt: new Date(now.getTime() + TTL_MS).toISOString() });
      res.setHeader('Set-Cookie', nonceCookie(nonce));
      return send(res, 200, { message, statement: STATEMENT });
    }
    if (b.action === 'verify') {
      const msg = parseSiwe(b.message);
      const problem = checkFields(msg, { domain: appDomain(req), message: b.message });
      if (problem) return fail(res, 400, 'bad_message', { msg: 'That sign-in message isn’t valid: ' + problem + '.' });
      if (!isToolAdmin(msg.address)) return fail(res, 403, 'not_admin', { msg: 'This wallet isn’t allowed into the owner tools.' });
      if (cookie(req, 'lh_tn') !== msg.nonce) return fail(res, 400, 'bad_message', { msg: 'Sign-in started in another tab. Try again.' });
      if (!(await db().consumeNonce(msg.nonce))) return fail(res, 400, 'bad_message', { msg: 'That sign-in was already used or expired. Try again.' });
      if (!(await signatureValid(msg.address, b.message, b.signature))) return fail(res, 401, 'bad_signature', { msg: 'The signature doesn’t match that wallet.' });
      const t = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setSubject(msg.address).setIssuer(ISS).setIssuedAt().setExpirationTime(`${HOURS}h`).sign(key());
      res.setHeader('Set-Cookie', [nonceCookie(null), passCookie(t)]);
      return send(res, 200, { ok: true, address: msg.address });
    }
    if (b.action === 'whoami') return send(res, 200, { address: await admin(req) });
    fail(res, 400, 'bad_action');
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
