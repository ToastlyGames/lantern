// POST /api/trade { ticket }: complete a trade both players accepted in the game.
// The realtime server signs a ticket (RT_SECRET) naming both players and exactly what each offered; the first player
// sends it here. Both saves are checked (each player still has what they offered) and written in one transaction.
// Items that can't be traded: bound items (the admin party hats) and Goal Relics.
import { jwtVerify } from 'jose';
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { sanitize } from '../lib/validate.js';
import { ITEMS } from '../lib/gamedata.js';

export const tradable = id => !!(ITEMS[id] && !ITEMS[id].bound && !ITEMS[id].keep && id !== 'gold');
const clean = o => { const i = {}; for (const [k, n] of Object.entries(o && o.i && typeof o.i === 'object' ? o.i : {})) if (Number.isInteger(n) && n > 0) i[k] = n; return { i, g: Number.isInteger(o && o.g) && o.g > 0 ? o.g : 0 }; };
// can `s` give offer `o`? (items come from the bag)
function check(s, o) {
  for (const [id, n] of Object.entries(o.i)) { if (!tradable(id)) return (ITEMS[id] ? ITEMS[id].n : id) + ' can’t be traded'; if ((s.bank[id] || 0) < n) return 'not enough ' + ITEMS[id].n; }
  if (s.gold < o.g) return 'not enough gold';
  return null;
}
function move(from, to, o) {
  for (const [id, n] of Object.entries(o.i)) { from.bank[id] -= n; if (from.bank[id] <= 0) delete from.bank[id]; to.bank[id] = (to.bank[id] || 0) + n; }
  from.gold -= o.g; to.gold += o.g;
}

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['POST'] });
  if (!s) return;
  try {
    const b = (await body(req)) || {};
    let t;
    try { t = (await jwtVerify(String(b.ticket || ''), new TextEncoder().encode(process.env.RT_SECRET || ''), { issuer: 'lanternhold-trade', algorithms: ['HS256'] })).payload; }
    catch { return fail(res, 400, 'bad_ticket', { msg: 'That trade expired. Try again.' }); }
    const d = db(), me = await d.state(s.accountId);
    if (!me || me.banned || !me.hero || me.hero.name.toLowerCase() !== t.a.id) return fail(res, 403, 'not_yours');
    const bId = await d.accountByHero(String(t.b.id || '')); if (!bId || bId === s.accountId) return fail(res, 404, 'no_partner');
    const them = await d.state(bId);
    if (!them || them.banned || !them.hero || !them.save || !me.save) return fail(res, 409, 'unavailable', { msg: 'The trade couldn’t be completed.' });
    const A = sanitize(me.save.data, { admin: !!me.hero.is_admin, hat: me.hero.hat }), B = sanitize(them.save.data, { admin: !!them.hero.is_admin, hat: them.hero.hat });
    const oa = clean(t.a), ob = clean(t.b);
    if (!oa.g && !ob.g && !Object.keys(oa.i).length && !Object.keys(ob.i).length) return fail(res, 400, 'empty', { msg: 'Add something to the trade first.' });
    const why = check(A, oa) || check(B, ob);
    if (why) return fail(res, 409, 'missing', { msg: 'Trade cancelled: ' + why + '.' });
    move(A, B, oa); move(B, A, ob);
    const r = await d.trade(String(t.tid), s.accountId, me.save.rev, A, bId, them.save.rev, B, { a: { name: t.a.name, ...oa }, b: { name: t.b.name, ...ob } });
    if (r.error === 'used') return fail(res, 409, 'used', { msg: 'That trade already went through.' });
    if (r.error === 'stale') return fail(res, 409, 'stale', { msg: 'One of you was still saving. Try the trade again.' });
    console.log(`trade ${t.tid}: ${t.a.name} <-> ${t.b.name}`);
    send(res, 200, { ok: true, revs: { a: r.a, b: r.b } });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
