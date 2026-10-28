// Token rewards (Season 1): players earn tokens from the rewards vault while they play.
//
// How the pool lasts:
//  - What's left = the vault's real token balance (read on-chain, so funding it in phases just works) minus what players
//    have earned but not claimed yet. Before the vault is set up, the 50M plan is used instead.
//  - Every UTC day gets a budget of 0.25% of what's left (it shrinks as the pool shrinks, so rewards taper off slowly
//    instead of running dry). If every day's budget is earned and claimed, about 42% is still left after a year.
//  - The budget is split into "units" by how much players asked for the day before (at least 25,000), so a single
//    reward is worth less when there are more players and the day's budget lasts all day, for 100 or 10,000 players.
//  - Each player can earn at most 1% of the day's budget per day, so being early, or online all day, or cheating,
//    can't take a big share. When the day's budget is spent, rewards rest until the next UTC day.
//  - A claim keeps 10% back: 5% is burned and 5% goes back into the vault (see contracts/LanternRewards.sol).
// Tuning (Vercel, takes effect from the next UTC day): REWARDS_DAY_RATE (default 0.0025 = 0.25%),
// REWARDS_PLAYER_SHARE (default 0.01 = 1%), REWARDS_MIN_UNITS (default 25000).
//
// What earns: the server rolls rewards itself from what changed between two saves (kills, chests, bosses, fish, logs,
// crops). The game can't choose its own reward, and counts beyond what a real player could do in the time are ignored.
import { randomInt } from 'node:crypto';

export const POOL_TOTAL = 50_000_000;   // the plan: 5% of the 1B supply (used until the vault is set up)
export const DAY_RATE = 0.0025;         // a day's budget: 0.25% of what's left
export const PLAYER_SHARE = 0.01;       // one player: at most 1% of the day's budget
export const UNITS_PER_DAY = 25_000;    // the day's budget is split into at least this many reward "units"
const envNum = (k, def, lo, hi) => { const v = Number(process.env[k]); return Number.isFinite(v) && v >= lo && v <= hi ? v : def; };
export const dayRate = () => envNum('REWARDS_DAY_RATE', DAY_RATE, 0.0001, 0.02);
export const playerShare = () => envNum('REWARDS_PLAYER_SHARE', PLAYER_SHARE, 0.0005, 0.1);
export const minUnits = () => envNum('REWARDS_MIN_UNITS', UNITS_PER_DAY, 1000, 10_000_000);
export const CLAIM_BURN_BPS = 500;      // 5% of each claim burned
export const CLAIM_RECYCLE_BPS = 500;   // 5% of each claim back into the pool

// [chance, min units, max units] per event. A unit is worth (day's budget / UNITS_PER_DAY) tokens: about 5 on day 1.
export const EARN = {
  kill:   [0.10, 1, 2],     // a monster you helped kill (deeper floors pay a little more)
  chest:  [0.40, 3, 6],
  mother: [1.00, 20, 30],   // Mother Slime
  knight: [1.00, 35, 50],   // the Ossuary Knight
  tyrant: [1.00, 50, 70],   // the Forge Tyrant
  warden: [1.00, 70, 100],  // the Starwarden
  archmage: [1.00, 90, 130],    // the Drowned Archmage
  hollowking: [1.00, 110, 160], // the Hollow King
  fish:   [0.03, 1, 1],
  log:    [0.01, 1, 1],
  crop:   [0.02, 1, 1]
};
// The most of each event one save can count, for the seconds since the last save (anything above is ignored).
const RATE = { kill: 1.2, chest: 5, mother: 240, knight: 240, tyrant: 240, warden: 240, archmage: 240, hollowking: 240, fish: 2.5, log: 1.5, crop: 1 };
const SLACK = { kill: 4, chest: 2, mother: 1, knight: 1, tyrant: 1, warden: 1, archmage: 1, hollowking: 1, fish: 2, log: 2, crop: 12 };

// Rewards are completely off (no earning, no rewards panel, no claims) unless REWARDS_ON=1. Optional REWARDS_START
// (a UTC date/time, e.g. 2026-12-01T17:00:00Z) keeps them off until that moment even when REWARDS_ON=1 is already set.
export const rewardsStart = () => { const t = Date.parse(String(process.env.REWARDS_START || '').trim()); return Number.isFinite(t) ? t : null; };
export const rewardsOn = () => process.env.REWARDS_ON === '1' && !(rewardsStart() > Date.now());
export const utcDay = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);
export const dayBudget = available => Math.max(0, Math.floor(available * dayRate()));
export const round2 = n => Math.floor(n * 100) / 100;

// What happened between two (already sanitized and plausibility-checked) saves.
export function events(prev, next, dtSec) {
  const c = (s, k) => (s.cnt && s.cnt[k]) || 0, d = Math.max(1, dtSec);
  const raw = {
    kill: next.kills - prev.kills, chest: c(next, 'chests') - c(prev, 'chests'),
    mother: c(next, 'bossmother') - c(prev, 'bossmother'), knight: c(next, 'bossknight') - c(prev, 'bossknight'),
    tyrant: c(next, 'bosstyrant') - c(prev, 'bosstyrant'), warden: c(next, 'bosswarden') - c(prev, 'bosswarden'),
    archmage: c(next, 'bossarchmage') - c(prev, 'bossarchmage'), hollowking: c(next, 'bosshollowking') - c(prev, 'bosshollowking'),
    fish: next.caught - prev.caught, log: c(next, 'logs') - c(prev, 'logs'), crop: c(next, 'crops') - c(prev, 'crops')
  };
  // every real kill, catch, log and crop also gives XP: counts the XP doesn't back up are ignored
  const sk = k => Math.max(0, ((next.skills || {})[k] || 0) - ((prev.skills || {})[k] || 0));
  const combat = (next.flv || next.lvl) > (prev.flv || prev.lvl) ? Infinity : Math.max(0, next.xp - prev.xp);
  const backed = { kill: combat + sk('magic'), fish: sk('fishing') / 10, log: sk('woodcutting') / 3, crop: sk('farming') / 4,
    mother: next.bosses && next.bosses.mother ? Infinity : 0, knight: next.bosses && next.bosses.knight ? Infinity : 0,
    tyrant: next.bosses && next.bosses.tyrant ? Infinity : 0, warden: next.bosses && next.bosses.warden ? Infinity : 0,
    archmage: next.bosses && next.bosses.archmage ? Infinity : 0, hollowking: next.bosses && next.bosses.hollowking ? Infinity : 0, chest: Infinity };
  const out = {};
  for (const [k, n] of Object.entries(raw)) { const cap = Math.min(Math.floor(d / RATE[k]) + SLACK[k], Math.floor(backed[k])); const v = Math.max(0, Math.min(n | 0, cap)); if (v) out[k] = v; }
  return out;
}

// Roll the units those events earn (server-side randomness). Kills on deeper floors pay up to 60% more.
export function roll(ev, deepest = 0, rnd = (a, b) => randomInt(a, b + 1), chance = () => randomInt(0, 1_000_000) / 1_000_000) {
  let units = 0; const got = {};
  for (const [k, n] of Object.entries(ev)) {
    const [p, a, b] = EARN[k]; let u = 0;
    for (let i = 0; i < Math.min(n, 400); i++) if (chance() < p) u += rnd(a, b);
    if (k === 'kill') u *= 1 + Math.min(15, deepest) * 0.04;
    if (u) { got[k] = round2(u); units += u; }
  }
  return { units: round2(units), got };
}

// The claim split (mirrors the contract): what the player receives, what's burned, what goes back to the pool.
export function split(gross) {
  const burn = Math.floor(gross * CLAIM_BURN_BPS / 10000 * 100) / 100, recycle = Math.floor(gross * CLAIM_RECYCLE_BPS / 10000 * 100) / 100;
  return { net: round2(gross - burn - recycle), burn, recycle };
}
