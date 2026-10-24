// GET /api/auth/nonce?address=0x…: the exact Sign-In with Ethereum message for this wallet to sign.
// The server writes the whole message (domain = the site the player is on, checksummed address, one-time nonce, 5-minute
// expiry), so the wallet shows a proper, verified "Sign-in request" for this site. The nonce is also set in a short-lived
// HttpOnly cookie, so a signed message only works from the browser that asked for it, and only once.
import { randomBytes } from 'node:crypto';
import { db } from '../../lib/db.js';
import { guard, send, fail, appDomain, hostAllowed, reqHost } from '../../lib/http.js';
import { CHAIN_ID, STATEMENT, TTL_MS, buildSiwe, checksum } from '../../lib/siwe.js';
import { nonceCookie } from '../../lib/session.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['GET'], auth: false }))) return;
  try {
    if (!hostAllowed(reqHost(req))) return fail(res, 403, 'bad_origin', { msg: 'Open the game at its main address to sign in.' });
    const address = checksum(new URL(req.url, 'http://x').searchParams.get('address') || '');
    if (!address) return fail(res, 400, 'bad_address');
    const nonce = randomBytes(18).toString('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 24).padEnd(16, '0');
    await db().createNonce(nonce);
    const domain = appDomain(req), local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(domain);
    const now = new Date(), f = { domain, address, uri: (local ? 'http://' : 'https://') + domain, chainId: CHAIN_ID, nonce, issuedAt: now.toISOString(), expiresAt: new Date(now.getTime() + TTL_MS).toISOString() };
    res.setHeader('Set-Cookie', nonceCookie(nonce));
    send(res, 200, { message: buildSiwe(f), nonce, domain, address, chainId: CHAIN_ID, statement: STATEMENT });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
