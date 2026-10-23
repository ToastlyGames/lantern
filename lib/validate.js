// Server-side save handling. The server never trusts a save from the browser:
// 1) sanitize() keeps only known keys, valid item ids and sane numbers (same rules as the client).
// 2) plausible() compares the new save with the last stored one and rejects jumps no real player could make
//    in the time that passed (gold, XP, items, depth). This is a v1 safety net, not full server authority:
//    before the token goes live in Season 1, loot rolls must move to the server.
import { ITEMS, GEAR, LANTERNS, CAPES, SKILLS, CROPS, ENEMIES, PACKS, RARITY } from './gamedata.js';

const LOOK_N = { skin: 6, hair: 10, cloth: 10, style: 4 };
const BANK_BUYS = [250, 750, 2000, 5000, 10000, 20000, 40000, 75000];
const num = (v, lo, hi, d) => { v = Number(v); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; };
const int = (v, lo, hi, d) => Math.floor(num(v, lo, hi, d));
const obj = v => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
const BOUND = new Set(Object.keys(ITEMS).filter(k => ITEMS[k].bound));

export function newSave() {
  return {
    gold: 40, bank: { wheat_seed: 20, oil: 3, bread: 3 }, lvl: 1, xp: 0,
    gear: { blade: 'rusty', mail: 'none', lantern: 'basic', cape: null, helm: null },
    skills: Object.fromEntries(Object.keys(SKILLS).map(k => [k, 0])), caught: 0, flags: { vault: true }, guide: 0,
    vault: {}, bankBuys: 0, quick: ['oil', 'bread', 'pondfin', 'stew', null], lift: 1, deepest: 0,
    plots: [null, null, null, null, null, null], kills: 0, deaths: 0, bosses: {}
  };
}

function items(src, admin) {
  const out = {};
  for (const [k, v] of Object.entries(obj(src))) {
    if (!ITEMS[k] || k === 'gold' || (BOUND.has(k) && !admin)) continue;
    const n = int(v, 0, 1e7, 0); if (n > 0) out[k] = n;
  }
  return out;
}

// Display settings travel with the hero: zoom step 0–4, brightness 60–160 %, on/off switches.
const SET_BOOLS = ['shake', 'names', 'feed', 'vib', 'sound'];
function cleanSettings(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const o = { zoom: int(v.zoom, 0, 4, 2), bright: int(v.bright, 60, 160, 100) };
  for (const k of SET_BOOLS) o[k] = v[k] === undefined ? true : !!v[k];
  return o;
}

const ADMIN_HATS = ['partyhat', 'greenhat'];
export function sanitize(raw, { admin = false, hat = 'partyhat', now = Date.now() } = {}) {
  if (!ADMIN_HATS.includes(hat)) hat = 'partyhat';
  const o = obj(raw), s = newSave();
  s.gold = int(o.gold, 0, 1e10, s.gold); s.lvl = int(o.lvl, 1, 200, 1); s.xp = int(o.xp, 0, 1e9, 0);
  s.kills = int(o.kills, 0, 1e9, 0); s.deaths = int(o.deaths, 0, 1e9, 0); s.caught = int(o.caught, 0, 1e9, 0);
  s.deepest = int(o.deepest, 0, PACKS[PACKS.length - 1].to, 0);
  s.bank = o.bank === undefined ? s.bank : items(o.bank, admin);
  s.vault = items(o.vault, admin);
  s.bankBuys = int(o.bankBuys, 0, BANK_BUYS.length, 0);
  const G = obj(o.gear);
  s.gear = {
    blade: GEAR.blade[G.blade] ? G.blade : 'rusty', mail: GEAR.mail[G.mail] ? G.mail : 'none',
    lantern: LANTERNS[G.lantern] ? G.lantern : 'basic', cape: CAPES[G.cape] ? G.cape : null,
    helm: GEAR.helm[G.helm] && (!ADMIN_HATS.includes(G.helm) || (admin && G.helm === hat)) ? G.helm : null
  };
  const K = obj(o.skills); for (const k of Object.keys(SKILLS)) s.skills[k] = num(K[k], 0, 200e6, 0);
  const P0 = Array.isArray(o.plots) ? o.plots : [];
  s.plots = s.plots.map((_, i) => { const p = obj(P0[i]); return CROPS[p.crop] ? { crop: p.crop, t0: num(p.t0, 0, now, now) } : null; });
  s.bosses = {}; for (const k of Object.keys(obj(o.bosses))) if (ENEMIES[k] && ENEMIES[k].boss) s.bosses[k] = true;
  s.lift = s.bosses.mother && int(o.lift, 1, 6, 1) >= 6 ? 6 : 1;
  s.flags = {}; for (const [k, v] of Object.entries(obj(o.flags))) if (/^[a-z]{2,16}$/.test(k)) s.flags[k] = !!v;
  s.guide = int(o.guide, 0, 99, 0);
  const Q = Array.isArray(o.quick) ? o.quick : s.quick;
  s.quick = [0, 1, 2, 3, 4].map(i => (ITEMS[Q[i]] && (ITEMS[Q[i]].food || ITEMS[Q[i]].oil) ? Q[i] : null));
  s.settings = cleanSettings(o.settings);
  for (const h of ADMIN_HATS) if (h !== hat) { delete s.bank[h + '_helm']; delete s.vault[h + '_helm']; }
  if (admin && s.gear.helm !== hat && !s.bank[hat + '_helm'] && !s.vault[hat + '_helm']) s.gear.helm = hat;
  return s;
}

// --- plausibility between two saves ---
const gearItems = g => [
  g.blade === 'rusty' ? 'rusty_blade' : g.blade + '_blade', g.mail === 'none' ? 'traveler_garb' : g.mail + '_mail',
  g.lantern + '_lantern', g.cape ? 'cape_' + g.cape : null, g.helm ? g.helm + '_helm' : null
].filter(id => id && ITEMS[id]);
const special = id => !!(ITEMS[id] && (ITEMS[id].rarity || ITEMS[id].relic));
function holdings(s) {
  const all = {};
  for (const src of [s.bank, s.vault]) for (const [k, n] of Object.entries(src)) all[k] = (all[k] || 0) + n;
  for (const id of gearItems(s.gear)) all[id] = (all[id] || 0) + 1;
  return all;
}
function worth(s) {
  let w = s.gold;
  for (const [k, n] of Object.entries(holdings(s))) w += (ITEMS[k].v || 0) * n;
  for (let i = 0; i < s.bankBuys; i++) w += BANK_BUYS[i];
  return w;
}
const totalXp = s => s.xp + s.lvl * 1000 + Object.values(s.skills).reduce((a, b) => a + b, 0);

export function plausible(prev, next, dtSec, { admin = false } = {}) {
  if (admin) return { ok: true };
  const dt = Math.max(1, Math.min(3600, dtSec));
  const a = holdings(prev), b = holdings(next);
  // rare finds: a few per save at most, and only real items
  let newRare = 0, rareValue = 0;
  for (const [k, n] of Object.entries(b)) { const d = n - (a[k] || 0); if (d > 0 && special(k)) { newRare += d; rareValue += d * (ITEMS[k].v || 0); } }
  if (newRare > 3) return { ok: false, reason: `too many rare items at once (${newRare})` };
  const gain = worth(next) - worth(prev), budget = 1500 + 40 * dt + rareValue;
  if (gain > budget) return { ok: false, reason: `wealth jumped by ${gain} (allowed ${Math.round(budget)})` };
  const xpGain = totalXp(next) - totalXp(prev), xpBudget = 3000 + 120 * dt;
  if (xpGain > xpBudget) return { ok: false, reason: `xp jumped by ${Math.round(xpGain)} (allowed ${Math.round(xpBudget)})` };
  for (const k of Object.keys(SKILLS)) if (next.skills[k] - prev.skills[k] > 800 + 80 * dt) return { ok: false, reason: `${k} xp jumped` };
  if (next.lvl - prev.lvl > 2 + dt / 60) return { ok: false, reason: 'combat level jumped' };
  if (next.deepest - prev.deepest > 2 + dt / 20) return { ok: false, reason: 'depth jumped' };
  if (next.bankBuys - prev.bankBuys > 2) return { ok: false, reason: 'bank purchases jumped' };
  return { ok: true };
}

export const RARITIES = RARITY;
