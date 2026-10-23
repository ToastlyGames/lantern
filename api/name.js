// GET /api/name?name=Foo: is this hero name free?
import { db } from '../lib/db.js';
import { guard, send, fail } from '../lib/http.js';
import { nameProblem } from '../lib/names.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['GET'], auth: false }))) return;
  try {
    const name = new URL(req.url, 'http://x').searchParams.get('name') || '';
    const p = nameProblem(name);
    if (p) return send(res, 200, { ok: false, msg: p });
    send(res, 200, (await db().nameTaken(name.toLowerCase())) ? { ok: false, msg: 'That name is taken' } : { ok: true, msg: 'Available' });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
