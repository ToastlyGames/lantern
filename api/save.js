// POST /api/save { data, rev }: store the player's progress. Two database calls per save:
//   1) lh_state: ban status + hero + current save (with its age on the database clock)
//   2) lh_cas_save: write only if the revision still matches (two devices can't overwrite each other)
// The save is cleaned and checked against the previous one; impossible jumps are refused (422) and logged.
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { sanitize, plausible } from '../lib/validate.js';
import { combatFrom } from '../lib/gamedata.js';
import { rewardsOn, events, roll } from '../lib/rewards.js';
import { vaultBalance } from '../lib/claim.js';
import { lootAllowance } from '../lib/loot.js';
import { cosState, cosxFor } from '../lib/cosx.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['POST'] });
  if (!s) return;
  try {
    const b = await body(req);
    if (!b || typeof b.data !== 'object' || b.data === null || !Number.isInteger(b.rev)) return fail(res, 400, 'bad_request');
    const d = db();
    const st = await d.state(s.accountId);
    if (!st) return fail(res, 401, 'not_signed_in');
    if (st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    if (!st.save) return fail(res, 404, 'no_save');
    const admin = !!st.hero.is_admin, hat = st.hero.hat, cur = st.save;
    const cosx = cosxFor(await cosState(s.accountId, st.wallet), cur.data);   // cosmetic NFTs: minted ones have left the hero, held ones can be worn
    if (b.rev !== cur.rev) return fail(res, 409, 'stale', { save: { data: sanitize(cur.data, { admin, hat, cosx }), rev: cur.rev } });
    const dt = Math.max(0, cur.age_ms) / 1000;
    if (dt < 2) return fail(res, 429, 'too_fast', { retryAfter: 2 });
    const prev = sanitize(cur.data, { admin, hat, cosx }), next = sanitize(b.data, { admin, hat, cosx });
    // the old-level floor can only ever stay or go away, never grow (only admins can set it)
    if (!admin && next.cbFloor > prev.cbFloor) { next.cbFloor = prev.cbFloor; next.lvl = Math.max(next.cbFloor, combatFrom(next.flv, next.skills)); }
    const loot = await lootAllowance(b.loot, st.hero.name);   // Wilderness loot receipts from the realtime server
    const check = plausible(prev, next, dt, { admin, loot });
    if (!check.ok) {
      await d.reject(s.accountId, check.reason);
      return fail(res, 422, 'rejected', { reason: check.reason, save: { data: prev, rev: cur.rev } });
    }
    const rev = await d.casSave(s.accountId, cur.rev, next);
    if (rev === null) { const now = await d.state(s.accountId); return fail(res, 409, 'stale', { save: { data: sanitize(now.save.data, { admin, hat, cosx }), rev: now.save.rev } }); }
    // token rewards: rolled here, on the server, from what changed since the last save (admins don't earn)
    let tok = null;
    if (rewardsOn() && !admin) {
      const ev = events(prev, next, dt), r = roll(ev, next.deepest);
      if (r.units > 0) {
        try { const e = await d.earn(s.accountId, r.units, await vaultBalance()); if (e) tok = { got: +e.got, balance: +e.balance, today: +e.today, cap: +e.cap, resting: !!e.resting, from: Object.keys(r.got) }; }
        catch (e) { console.error('rewards', e.message || e); }
      }
    }
    send(res, 200, tok ? { rev, tok } : { rev });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
