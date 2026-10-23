// POST /api/x/unlink: removes the linked X account from the signed-in player's hero.
import { db } from '../../lib/db.js';
import { guard, send, fail } from '../../lib/http.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['POST'] });
  if (!s) return;
  try { await db().xUnlink(s.accountId); send(res, 200, { ok: true }); }
  catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
