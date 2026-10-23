// GET /api/x/start: sends the signed-in player to x.com to approve linking their X account.
import { db } from '../../lib/db.js';
import { guard, appDomain } from '../../lib/http.js';
import { xEnabled, newLinkRequest } from '../../lib/x.js';

const back = (res, q) => { res.statusCode = 302; res.setHeader('Location', '/?x=' + q); res.setHeader('Cache-Control', 'no-store'); res.end(); };

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET'] });
  if (!s) return;
  if (!xEnabled()) return back(res, 'off');
  try {
    const st = await db().state(s.accountId);
    if (!st || st.banned || !st.hero) return back(res, 'error');
    const r = newLinkRequest(appDomain(req));
    await db().xStateCreate(s.accountId, r.state, r.verifier);
    res.statusCode = 302; res.setHeader('Location', r.url); res.setHeader('Cache-Control', 'no-store'); res.end();
  } catch (e) { console.error(e); back(res, 'error'); }
}
