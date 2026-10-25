// GET /api/auth/google/callback?code&state: Google sends the player back here.
import { banOf } from '../../../lib/mod.js';
import { db } from '../../../lib/db.js';
import { appDomain } from '../../../lib/http.js';
import { makeSession, sessionCookie } from '../../../lib/session.js';
import { googleEnabled, finishGoogle } from '../../../lib/google.js';

const back = (res, q, cookieHeader) => { res.statusCode = 302; if (cookieHeader) res.setHeader('Set-Cookie', cookieHeader); res.setHeader('Location', '/?g=' + q); res.setHeader('Cache-Control', 'no-store'); res.end(); };

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.statusCode = 405; return res.end(); }
  if (!googleEnabled()) return back(res, 'off');
  const url = new URL(req.url, 'http://x'), state = url.searchParams.get('state') || '', code = url.searchParams.get('code') || '';
  const okState = /^[A-Za-z0-9_-]{20,64}$/.test(state);
  if (url.searchParams.get('error')) { if (okState) await db().oauthStateTake('google', state).catch(() => {}); return back(res, 'declined'); }
  if (!okState || !code || code.length > 1000) return back(res, 'error');
  try {
    const pending = await db().oauthStateTake('google', state);
    if (!pending) return back(res, 'expired');
    const who = await finishGoogle(code, pending.verifier, appDomain(req));
    if (pending.account_id) {                                   // linking Google to an existing account
      const r = await db().linkGoogle(pending.account_id, who.sub, who.email);
      return back(res, r.ok ? 'linked' : r.taken ? 'taken' : 'has');
    }
    const acct = await db().accountByGoogle(who.sub, who.email);  // signing in
    const ban = banOf(acct);
    if (ban) return back(res, ban.perm ? 'banned' : 'banned&until=' + encodeURIComponent(ban.until));
    back(res, 'in', sessionCookie(await makeSession(acct.id, acct.wallet || null)));
  } catch (e) { console.error(e); back(res, 'error'); }
}
