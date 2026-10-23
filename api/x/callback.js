// GET /api/x/callback?code&state: x.com sends the player back here after they approve (or decline).
// Works even if X opens in another browser or the X app, because the request is matched by its one-time state, not a cookie.
import { db } from '../../lib/db.js';
import { appDomain } from '../../lib/http.js';
import { xEnabled, finishLink } from '../../lib/x.js';

const back = (res, q) => { res.statusCode = 302; res.setHeader('Location', '/?' + q); res.setHeader('Cache-Control', 'no-store'); res.end(); };

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.statusCode = 405; return res.end(); }
  if (!xEnabled()) return back(res, 'x=off');
  const url = new URL(req.url, 'http://x'), state = url.searchParams.get('state') || '', code = url.searchParams.get('code') || '';
  if (url.searchParams.get('error')) { if (/^[A-Za-z0-9_-]{20,64}$/.test(state)) await db().xStateTake(state).catch(() => {}); return back(res, 'x=declined'); }
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(state) || !code || code.length > 500) return back(res, 'x=error');
  try {
    const pending = await db().xStateTake(state);
    if (!pending) return back(res, 'x=expired');
    const who = await finishLink(code, pending.verifier, appDomain(req));
    const r = await db().xLink(pending.account_id, who.id, who.username);
    if (r.taken) return back(res, 'x=taken&u=' + encodeURIComponent(who.username));
    if (!r.ok) return back(res, 'x=error');
    back(res, 'x=linked&u=' + encodeURIComponent(who.username));
  } catch (e) { console.error(e); back(res, 'x=error'); }
}
