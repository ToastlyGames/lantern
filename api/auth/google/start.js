// GET /api/auth/google/start          → sign in (or create an account) with Google
// GET /api/auth/google/start?link=1   → link Google to the signed-in account as a second way to sign in
import { db } from '../../../lib/db.js';
import { guard, appDomain, cookie } from '../../../lib/http.js';
import { readSession } from '../../../lib/session.js';
import { googleEnabled, newGoogleRequest } from '../../../lib/google.js';

const back = (res, q) => { res.statusCode = 302; res.setHeader('Location', '/?g=' + q); res.setHeader('Cache-Control', 'no-store'); res.end(); };

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['GET'], auth: false }))) return;
  if (!googleEnabled()) return back(res, 'off');
  try {
    const link = new URL(req.url, 'http://x').searchParams.get('link') === '1';
    let accountId = null;
    if (link) { const s = await readSession(cookie(req, 'lh_s')); if (!s) return back(res, 'signin'); accountId = s.accountId; }
    const r = newGoogleRequest(appDomain(req));
    await db().oauthStateCreate('google', r.state, r.verifier, accountId);
    res.statusCode = 302; res.setHeader('Location', r.url); res.setHeader('Cache-Control', 'no-store'); res.end();
  } catch (e) { console.error(e); back(res, 'error'); }
}
