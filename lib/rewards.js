// Token rewards (Season 1): players earn tokens from the 50M rewards pool while they play.
//
// How the pool lasts:
//  - Every UTC day gets a budget of 0.25% of what's left in the pool (it shrinks as the pool shrinks, so rewards taper
//    off slowly instead of running dry). 50M → about 125K on day 1, ~50K a day after a year, before recycling.
//  - Each player can earn at most 1% of the day's budget per day, so being early, or online all day, or cheating,
//    can't take a big share. When the day's budget is spent, rewards rest until the next UTC day.
//  - A claim keeps 10% back: 5% is burned and 5% goes back into the pool (see contracts/LanternRewards.sol).
//
// What earns: the server rolls rewards itself from what changed between two saves (kills, chests, bosses, fish, logs,
// crops). The game can't choose its own reward, and counts beyond what a real player could do in the time are ignored.
import { randomInt } from 'node:crypto';

export const POOL_TOTAL = 50_000_000;   // tokens set aside for rewards (5% of the 1B supply)
export const DAY_RATE = 0.0025;         // a day's budget: 0.25% of what's left
export const PLAYER_SHARE = 0.01;       // one player: at most 1% of the day's budget
export const UNITS_PER_DAY = 25_000;    // how many reward "units" the day's budget is split into (sets the size of one drop)
export const CLAIM_BURN_BPS = 500;      // 5% of each claim burned
export const CLAIM_RECYCLE_BPS = 500;   // 5% of each claim back into the pool

// [chance, min units, max units] per event. A unit is worth (day's budget / UNITS_PER_DAY) tokens: about 5 on day 1.
export const EARN = {
  kill:   [0.10, 1, 2],     // a monster you helped kill (deeper floors pay a little more)
  chest:  [0.40, 3, 6],
  mother: [1.00, 20, 30],   // Mother Slime
  knight: [1.00, 35, 50],   // the Ossuary Knight
  fish:   [0.03, 1, 1],
  log:    [0.01, 1, 1],
  crop:   [0.02, 1, 1]
};
// The most of each event one save can count, for the seconds since the last save (anything above is ignored).
const RATE = { kill: 1.2, chest: 5, mother: 240, knight: 240, fish: 2.5, log: 1.5, crop: 1 };
const SLACK = { kill: 4, chest: 2, mother: 1, knight: 1, fish: 2, log: 2, crop: 12 };

export const rewardsOn = () => process.env.REWARDS_ON === '1';
export const utcDay = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);
export const dayBudget = available => Math.max(0, Math.floor(available * DAY_RATE));
export const round2 = n => Math.floor(n * 100) / 100;

// What happened between two (already sanitized and plausibility-checked) saves.
export function events(prev, next, dtSec) {
  const c = (s, k) => (s.cnt && s.cnt[k]) || 0, d = Math.max(1, dtSec);
  const raw = {
    kill: next.kills - prev.kills, chest: c(next, 'chests') - c(prev, 'chests'),
    mother: c(next, 'bossmother') - c(prev, 'bossmother'), knight: c(next, 'bossknight') - c(prev, 'bossknight'),
    fish: next.caught - prev.caught, log: c(next, 'logs') - c(prev, 'logs'), crop: c(next, 'crops') - c(prev, 'crops')
  };
  // every real kill, catch, log and crop also gives XP: counts the XP doesn't back up are ignored
  const sk = k => Math.max(0, ((next.skills || {})[k] || 0) - ((prev.skills || {})[k] || 0));
  const combat = next.lvl > prev.lvl ? Infinity : Math.max(0, next.xp - prev.xp);
  const backed = { kill: combat, fish: sk('fishing') / 10, log: sk('woodcutting') / 3, crop: sk('farming') / 4,
    mother: next.bosses && next.bosses.mother ? Infinity : 0, knight: next.bosses && next.bosses.knight ? Infinity : 0, chest: Infinity };
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
