// GET /api/me: the signed-in player's wallet, hero and latest save ({ signedIn: false } when nobody is signed in).
import { guard, send, fail, cookie } from '../lib/http.js';
import { mePayload } from '../lib/me.js';
import { sessionCookie, readSession } from '../lib/session.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['GET'], auth: false }))) return;
  const s = await readSession(cookie(req, 'lh_s'));
  if (!s) return send(res, 200, { signedIn: false });
  try {
    const me = await mePayload(s.accountId);
    if (!me) { res.setHeader('Set-Cookie', sessionCookie(null)); return send(res, 200, { signedIn: false }); }
    send(res, 200, me);
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
