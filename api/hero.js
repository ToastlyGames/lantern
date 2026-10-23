// POST /api/hero { name, look }: create this wallet's hero (one per wallet, names unique forever).
// PATCH /api/hero { look }: change appearance (the name never changes).
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { nameProblem, cleanLook } from '../lib/names.js';
import { newSave } from '../lib/validate.js';
import { mePayload } from '../lib/me.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['POST', 'PATCH'] });
  if (!s) return;
  try {
    const b = (await body(req)) || {};
    const d = db();
    if (req.method === 'PATCH') {
      if (!(await d.hero(s.accountId))) return fail(res, 404, 'no_hero');
      await d.setLook(s.accountId, cleanLook(b.look));
      return send(res, 200, { ok: true });
    }
    if (await d.hero(s.accountId)) return fail(res, 409, 'hero_exists', { msg: 'This wallet already has a hero' });
    const p = nameProblem(b.name);
    if (p) return fail(res, 400, 'bad_name', { msg: p });
    const r = await d.createHero(s.accountId, b.name, b.name.toLowerCase(), cleanLook(b.look));
    if (!r.ok) return fail(res, 409, r.taken ? 'name_taken' : 'hero_exists', { msg: r.taken ? 'That name is taken' : 'This wallet already has a hero' });
    if (!(await d.save(s.accountId))) await d.createSave(s.accountId, newSave());
    send(res, 201, await mePayload(s.accountId));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
