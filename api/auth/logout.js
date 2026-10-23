// POST /api/auth/logout: clears the session cookie.
import { guard, send } from '../../lib/http.js';
import { sessionCookie } from '../../lib/session.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['POST'], auth: false }))) return;
  res.setHeader('Set-Cookie', sessionCookie(null));
  send(res, 200, { ok: true });
}
