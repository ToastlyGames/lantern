// Unit tests for the token rewards rules (lib/rewards.js) and the in-memory ledger that mirrors supabase/rewards.sql.
process.env.LH_MEMORY_DB = '1';
const R = await import('../lib/rewards.js');
const { memoryDb } = await import('../lib/db.js');
let pass = 0, fail = 0; const ok = (c, n) => { (c ? pass++ : fail++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const base = { kills: 0, caught: 0, cnt: {}, deepest: 0 };

console.log('The pool');
ok(R.dayBudget(R.POOL_TOTAL) === 125000, 'day 1 budget: 125,000 (0.25% of 50M)');
{ let left = R.POOL_TOTAL; for (let d = 0; d < 365; d++) left -= R.dayBudget(left); ok(left > 19e6 && left < 21e6, `after a year of full days, ~${Math.round(left / 1e6)}M still left (it tapers, never runs dry)`); }
ok(R.dayBudget(R.POOL_TOTAL) * R.PLAYER_SHARE === 1250, 'one player can earn at most 1,250 on day 1');

console.log('What earns');
const base2 = { ...base, lvl: 1, xp: 0, skills: { fishing: 0, woodcutting: 0, farming: 0 }, bosses: {} };
const ev = R.events(base2, { ...base2, kills: 500, xp: 900, caught: 3, skills: { fishing: 30, woodcutting: 12, farming: 0 }, bosses: { mother: true }, cnt: { chests: 2, bossmother: 1, logs: 4 } }, 10);
ok(ev.kill === 12 && ev.chest === 2 && ev.mother === 1 && ev.fish === 3 && ev.log === 4, 'counts are capped to what a player could do in the time (500 kills in 10 s → 12)');
ok(!R.events(base2, { ...base2, kills: 10, cnt: { bossmother: 1 } }, 60).kill && !R.events(base2, { ...base2, cnt: { bossmother: 1 } }, 600).mother, 'kills need the XP that comes with them, and a boss kill needs that boss beaten');
ok(R.events(base2, { ...base2, caught: 5, skills: { fishing: 20, woodcutting: 0, farming: 0 } }, 60).fish === 2, 'fish need their Fishing XP (20 XP → 2 fish)');
ok(Object.keys(R.events(base, { ...base, kills: -5 }, 10)).length === 0, 'going backwards earns nothing');
ok(R.roll({ mother: 1 }).units >= 20 && R.roll({ mother: 1 }).units <= 30, 'Mother Slime always pays 20–30 units');
ok(R.roll({ kill: 1 }, 0, (a, b) => b, () => 0).units === 2 && R.roll({ kill: 1 }, 10, (a, b) => b, () => 0).units === 2.8, 'deeper floors make kills worth more (floor 10: +40%)');
ok(R.roll({ kill: 1 }, 0, (a, b) => b, () => 0.5).units === 0, 'most kills drop nothing (10% chance)');
{ let u = 0; for (let i = 0; i < 2000; i++) u += R.roll({ chest: 1 }).units; const avg = u / 2000; ok(avg > 1.5 && avg < 2.1, `chests average ~1.8 units (got ${avg.toFixed(2)})`); }

console.log('The ledger');
const d = memoryDb(); const a = await d.accountFor('0x' + '1'.repeat(40)), b = await d.accountFor('0x' + '2'.repeat(40));
let r = await d.earn(a.id, 10);
ok(r.got === 50 && r.balance === 50 && r.unit === 5, '10 units = 50 tokens on day 1');
r = await d.earn(a.id, 1000);
ok(r.got === 1200 && r.today === 1250, 'a player stops at their daily share (1,250)');
r = await d.earn(a.id, 10);
ok(r.got === 0 && r.balance === 1250, 'and earns nothing more today');
ok((await d.earn(b.id, 10)).got === 50, 'other players are unaffected');
// burn through the day's budget with many accounts
const many = []; for (let i = 0; i < 120; i++) many.push(await d.accountFor('0x' + (1000 + i).toString(16).padStart(40, '0')));
let total = 0, rest = false; for (const x of many) { const e = await d.earn(x.id, 1000); total += e.got; rest = rest || e.resting; }
const t = await d.tok(a.id);
ok(t.spent <= t.budget && rest && Math.abs(t.spent - t.budget) < 0.01, 'the whole day never pays more than its budget, then rewards rest');
ok(t.pool === R.POOL_TOTAL - t.spent, 'the pool shrinks by exactly what was earned');

console.log('Claims');
let c = await d.claim(a.id, '0x' + 'a'.repeat(40), 100);
ok(c.total === 1250 && c.wallet === '0x' + 'a'.repeat(40), 'a claim voucher covers everything earned');
ok((await d.claim(a.id, '0x' + 'b'.repeat(40), 100)).error === 'wallet_locked', 'and the claim wallet is fixed after the first claim');
ok((await d.claim(b.id, '0x' + 'a'.repeat(40), 1)).error === 'wallet_taken', 'one wallet can’t claim for two accounts');
ok((await d.claim(many[0].id, '0x' + 'c'.repeat(40), 1e9)).error === 'too_small', 'small balances wait for the minimum');
await d.tokSync(a.id, 1250, 1250);
const t2 = await d.tok(a.id);
ok(t2.balance === 0 && t2.claimed === 1250 && t2.recycled === 62.5 && t2.burned === 62.5, 'after the claim lands: balance 0, 5% recycled, 5% burned');
ok(t2.pool === t.pool + 62.5, 'recycled tokens go back into the pool');
const s = R.split(1250); ok(s.net === 1125 && s.burn === 62.5 && s.recycle === 62.5, 'the player receives 90% of a claim');

console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
