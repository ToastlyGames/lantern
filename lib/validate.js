// Server-side save handling. The server never trusts a save from the browser:
// 1) sanitize() keeps only known keys, valid item ids and sane numbers (same rules as the client).
// 2) plausible() compares the new save with the last stored one and rejects jumps no real player could make
//    in the time that passed (gold, XP, items, depth). This is a v1 safety net, not full server authority:
//    before the token goes live in Season 1, loot rolls must move to the server.
import { ITEMS, GEAR, GEAR_ITEM, LANTERNS, CAPES, SKILLS, SKILL_ERAS, JEWELS, ENCHANTS, ENCH_ATTR, enchMax, enchTop, RELIC_FORGE, FORGE_MAX, forgeable, SPELLS, FIGHT_MAX, LIFTS, liftBoss, CROPS, ENEMIES, PACKS, RARITY, PLOT_MAX, PLOT_BUYS, cleanPlots, plotCap, levelFor, combatFrom } from './gamedata.js';

const LOOK_N = { skin: 6, hair: 10, cloth: 10, style: 8 };
const BANK_BUYS = [250, 750, 2000, 5000, 10000, 20000, 40000, 75000];
const num = (v, lo, hi, d) => { v = Number(v); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; };
const int = (v, lo, hi, d) => Math.floor(num(v, lo, hi, d));
const obj = v => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
const BOUND = new Set(Object.keys(ITEMS).filter(k => ITEMS[k].bound));

export function newSave() {
  return {
    gold: 40, bank: { wheat_seed: 20, oil: 3, bread: 3 }, lvl: 1, xp: 0,
    gear: { blade: 'rusty', mail: 'none', lantern: 'basic', cape: null, helm: null, ring: null, amulet: null },
    skills: Object.fromEntries(Object.keys(SKILLS).map(k => [k, 0])), caught: 0, flags: { vault: true }, guide: 0,
    vault: {}, bankBuys: 0, quick: ['oil', 'bread', 'pondfin', 'stew', null], lift: 1, deepest: 0,
    plots: Array(PLOT_MAX).fill(null), plotBuys: 0, kills: 0, deaths: 0, bosses: {}, goals: {}, cnt: {}, runes: {}, ench: {}, spell: 'spark', forged: {}, pack: {}
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
const SET_BOOLS = ['shake', 'pnames', 'feed', 'vib', 'sound'], SET_OFF = new Set();   // pnames: player names, on unless turned off
function cleanSettings(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
  const o = { zoom: int(v.zoom, 0, 4, 2), bright: int(v.bright, 60, 160, 100) };
  for (const k of SET_BOOLS) o[k] = v[k] === undefined ? !SET_OFF.has(k) : !!v[k];
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
    helm: GEAR.helm[G.helm] && (!ADMIN_HATS.includes(G.helm) || (admin && G.helm === hat)) ? G.helm : null,
    ring: JEWELS[G.ring] && JEWELS[G.ring].slot === 'ring' ? G.ring : null, amulet: JEWELS[G.amulet] && JEWELS[G.amulet].slot === 'amulet' ? G.amulet : null
  };
  const K = obj(o.skills); for (const k of Object.keys(SKILLS)) s.skills[k] = num(K[k], 0, 200e6, 0);
  // Combat level is worked out here from Fighting + every skill (never taken from the browser). Saves from before this
  // change (no flv) keep the combat level they had as a floor: nobody loses a level they already earned.
  const legacy = o.flv === undefined;
  s.flv = Math.min(FIGHT_MAX, legacy ? s.lvl : int(o.flv, 1, 200, 1)); s.cbFloor = legacy ? s.lvl : int(o.cbFloor, 1, 200, 1);
  // new skills join the formula (Mining in v0.10.0, Crafting in v0.11.0): a save from before one keeps the level it had
  if (!legacy) for (const [k, before] of SKILL_ERAS) if (K[k] === undefined) s.cbFloor = Math.max(s.cbFloor, combatFrom(s.flv, s.skills, before));
  s.lvl = Math.max(s.cbFloor, combatFrom(s.flv, s.skills));
  Object.assign(s, cleanPlots(o, now));
  { const open = plotCap(levelFor(s.skills.farming), s.plotBuys); s.plots = s.plots.map((p, i) => (i < open ? p : null)); }   // nothing grows on a plot you haven't opened   // 12 squares; saves with the old 6 two-square plots keep their crops and get 6 squares
  s.bosses = {}; for (const k of Object.keys(obj(o.bosses))) if (ENEMIES[k] && ENEMIES[k].boss) s.bosses[k] = true;
  // the lift reaches the first floor of each area whose previous boss you've beaten
  { const want = int(o.lift, 1, 99, 1); s.lift = Math.max(...LIFTS.filter(f => f <= want && f <= s.deepest + 1 && (!liftBoss(f) || s.bosses[liftBoss(f)]))); }
  s.flags = {}; for (const [k, v] of Object.entries(obj(o.flags))) if (/^[a-z]{2,16}$/.test(k)) s.flags[k] = !!v;
  s.guide = int(o.guide, 0, 99, 0);
  s.goals = {}; for (const k of Object.keys(obj(o.goals)).slice(0, 300)) if (/^[a-z0-9]{2,16}$/.test(k)) s.goals[k] = 1;
  s.cnt = {}; for (const [k, v] of Object.entries(obj(o.cnt)).slice(0, 60)) if (/^[a-z]{2,16}$/.test(k)) { const n = int(v, 0, 1e9, 0); if (n) s.cnt[k] = n; }
  const Q = Array.isArray(o.quick) ? o.quick : s.quick;
  s.quick = [0, 1, 2, 3, 4].map(i => (ITEMS[Q[i]] && (ITEMS[Q[i]].food || ITEMS[Q[i]].oil) ? Q[i] : null));
  s.settings = cleanSettings(o.settings);
  s.skull = int(o.skull, 0, 9e15, 0);
  { const q = obj(o.pos), x = Number(q.x), y = Number(q.y); s.pos = x > 0 && y > 0 && x < 20000 && y < 20000 ? (q.v === 2 ? { x: Math.round(x), y: Math.round(y), v: 2 } : { x: Math.round(x), y: Math.round(y) }) : null; }   // v2: the map grew west in v0.12 (the game shifts older spots)
  // the rune bag, enchantments on the ring and amulet you wear (clamped to what any enchantment can roll), the attack spell
  s.runes = {}; for (const [k, v] of Object.entries(obj(o.runes))) if (ITEMS[k] && ITEMS[k].rune) { const n = int(v, 0, 1e7, 0); if (n > 0) s.runes[k] = n; }
  s.ench = {}; for (const sl of ['ring', 'amulet']) { const e = obj(obj(o.ench)[sl]); if (!e.id || e.id !== s.gear[sl] || !ENCHANTS[e.s]) continue; const a = {};
    for (const [k, v] of Object.entries(obj(e.a)).filter(([k]) => ENCHANTS[e.s].pool.includes(k)).slice(0, ENCHANTS[e.s].k)) if (ENCH_ATTR[k]) { const n = num(v, 0, Math.min(enchMax(k), enchTop(e.s, k) || enchMax(k)), 0); if (n > 0) a[k] = Math.round(n * 100) / 100; }
    if (Object.keys(a).length) s.ench[sl] = { id: e.id, s: e.s, a }; }
  // relic-forging (v0.12.1): a forge level per item id, kept only while the hero owns that item
  { const own = new Set([...Object.keys(s.bank), ...Object.keys(s.vault), ...gearItems(s.gear)]); s.forged = {};
    for (const [k, v] of Object.entries(obj(o.forged)).slice(0, 60)) if (forgeable(k) && own.has(k)) { const n = int(v, 0, FORGE_MAX, 0); if (n > 0) s.forged[k] = n; } }
  // the delve haul you're carrying (v0.12.1): saved as you go, so getting home with it isn't one big jump in wealth
  s.pack = {}; for (const [k, v] of Object.entries(obj(o.pack)).slice(0, 200)) if (k === 'gold' || (ITEMS[k] && !ITEMS[k].bound)) { const n = int(v, 0, 1e7, 0); if (n > 0) s.pack[k] = n; }
  s.spell = SPELLS[o.spell] ? o.spell : 'spark';   // where the hero logged out   // the Wilderness skull (until when); it only ever makes a hero lose more if they fall
  for (const h of ADMIN_HATS) if (h !== hat) { delete s.bank[h + '_helm']; delete s.vault[h + '_helm']; }
  if (admin && s.gear.helm !== hat && !s.bank[hat + '_helm'] && !s.vault[hat + '_helm']) s.gear.helm = hat;
  return s;
}

// --- plausibility between two saves ---
const gearItems = g => [
  g.blade === 'rusty' ? 'rusty_blade' : GEAR_ITEM['blade:' + g.blade] || g.blade + '_blade', g.mail === 'none' ? 'traveler_garb' : GEAR_ITEM['mail:' + g.mail] || g.mail + '_mail',
  g.lantern + '_lantern', g.cape ? 'cape_' + g.cape : null, g.helm ? GEAR_ITEM['helm:' + g.helm] || g.helm + '_helm' : null, g.ring || null, g.amulet || null
].filter(id => id && ITEMS[id]);
const special = id => !!(ITEMS[id] && (ITEMS[id].rarity || ITEMS[id].relic));
function holdings(s) {
  const all = {};
  for (const src of [s.bank, s.vault, s.runes || {}, s.pack || {}]) for (const [k, n] of Object.entries(src)) if (k !== 'gold') all[k] = (all[k] || 0) + n;
  for (const id of gearItems(s.gear)) all[id] = (all[id] || 0) + 1;
  return all;
}
function worth(s) {
  let w = s.gold + ((s.pack && s.pack.gold) || 0);
  for (const [k, n] of Object.entries(holdings(s))) w += (ITEMS[k].v || 0) * n;
  for (let i = 0; i < s.bankBuys; i++) w += BANK_BUYS[i];
  for (let i = 0; i < (s.plotBuys || 0); i++) w += PLOT_BUYS[i];
  return w;
}
const totalXp = s => s.xp + (s.flv || s.lvl) * 1000 + Object.values(s.skills).reduce((a, b) => a + b, 0);

export function plausible(prev, next, dtSec, { admin = false, loot = null } = {}) {
  if (admin) return { ok: true };
  const dt = Math.max(1, Math.min(3600, dtSec));
  const a = holdings(prev), b = holdings(next);
  // rare finds: a few per save at most, and only real items
  let newRare = 0, rareValue = 0;
  for (const [k, n] of Object.entries(b)) { const d = n - (a[k] || 0); if (d > 0 && special(k)) { newRare += d; rareValue += d * (ITEMS[k].v || 0); } }
  // loot: items picked up from a hero defeated in the Wilderness, proven by receipts signed by the realtime server
  const lootRare = loot ? loot.rare : 0, lootValue = loot ? loot.value : 0;
  // relic-forging: every forge step spends its relic, so the relics must have left the hero's holdings. A relic found and
  // spent between two saves never shows up in them, so a shortfall counts as a rare find (the same allowance as any rare drop).
  const need = {}; let short = 0;
  for (const [k, l] of Object.entries(next.forged || {})) for (let i = ((prev.forged || {})[k] || 0) + 1; i <= l; i++) need[RELIC_FORGE[i].relic] = (need[RELIC_FORGE[i].relic] || 0) + 1;
  for (const [r, n] of Object.entries(need)) { const s = n - Math.max(0, (a[r] || 0) - (b[r] || 0)); if (s > 0) { short += s; rareValue += s * (ITEMS[r].v || 0); } }
  if (newRare + short > 3 + lootRare) return { ok: false, reason: short ? 'forged without the relics' : `too many rare items at once (${newRare})` };
  const gain = worth(next) - worth(prev), budget = 1500 + 40 * dt + rareValue + lootValue;
  if (gain > budget) return { ok: false, reason: `wealth jumped by ${gain} (allowed ${Math.round(budget)})` };
  // boss kills since the last save (bossxp counts every hero who got the boss's XP), at most one per 20 s: a floor-30 boss is
  // worth ~10k XP with a blade and ~21k Magic XP with a staff
  const cn = (s, k) => (s.cnt && s.cnt[k]) || 0, bosses = Math.max(0, Math.min(cn(next, 'bossxp') - cn(prev, 'bossxp'), 1 + Math.floor(dt / 20)));
  const xpGain = totalXp(next) - totalXp(prev), xpBudget = 15000 + 150 * dt + 25000 * bosses;
  if (xpGain > xpBudget) return { ok: false, reason: `xp jumped by ${Math.round(xpGain)} (allowed ${Math.round(xpBudget)})` };
  for (const k of Object.keys(SKILLS)) if (next.skills[k] - prev.skills[k] > (k === 'magic' ? 6000 + 300 * dt + 25000 * bosses : 800 + 80 * dt)) return { ok: false, reason: `${k} xp jumped` };   // Magic: a staff kill gives twice the monster's XP
  if ((next.flv || next.lvl) - (prev.flv || prev.lvl) > 2 + dt / 60) return { ok: false, reason: 'fighting level jumped' };
  if (next.deepest - prev.deepest > 2 + dt / 20) return { ok: false, reason: 'depth jumped' };
  if ((next.plotBuys || 0) - (prev.plotBuys || 0) > 2) return { ok: false, reason: 'plot purchases jumped' };
  if (next.bankBuys - prev.bankBuys > 2) return { ok: false, reason: 'bank purchases jumped' };

  return { ok: true };
}

export const RARITIES = RARITY;
