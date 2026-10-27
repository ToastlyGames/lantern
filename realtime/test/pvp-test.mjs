// The Wilderness (PvP) against `wrangler dev`: node test/pvp-test.mjs
// Checks the room is a fair referee: who can attack whom, damage, skulls, deaths and drops, eating, combat logout, and
// that a hero who hasn't said where they are yet is never shown to anyone.
import WebSocket from 'ws';
import { SignJWT } from 'jose';
const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
let pass = 0, failN = 0;
const ok = (c, name) => { if (c) { pass++; console.log('  ✓', name); } else { failN++; console.log('  ✗', name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ticket = name => new SignJWT({ v: '9.9.9', n: name, adm: false }).setProtectedHeader({ alg: 'HS256' }).setSubject(name.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime('2m').sign(new TextEncoder().encode(SECRET));
const tag = Math.random().toString(36).slice(2, 6), W = 'w' + (200 + Math.floor(Math.random() * 700));
class Sock {
  constructor(path, t) { this.msgs = []; this.ws = new WebSocket(BASE + path + '?t=' + t, { headers: { Origin: 'http://localhost:3000' } });
    this.ws.on('message', d => this.msgs.push(JSON.parse(d))); this.ws.on('error', () => { }); this.open = new Promise(r => { this.ws.on('open', r); this.ws.on('close', r); }); }
  send(o) { this.ws.send(JSON.stringify(o)); }
  async wait(pred, ms = 2500) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const m = this.msgs.find(pred); if (m) { this.msgs.splice(this.msgs.indexOf(m), 1); return m; } await sleep(20); } return null; }
  has(pred) { return this.msgs.some(pred); }
  close() { try { this.ws.close(); } catch { } }
}
const look = (lvl, extra) => Object.assign({ skin: 1, hair: 1, cloth: 0, style: 0, blade: 'ember', lvl }, extra || {});
async function join(name, x, y, lvl, opts = {}) {
  const R = new Sock('/room/' + W, await ticket(name)); await R.open; const hi = await R.wait(m => m.t === 'hi', 3000);
  R.id = name.toLowerCase(); R.hi = hi;
  if (lvl) R.send({ t: 'look', look: look(lvl, opts.look) });
  if (x != null) R.send({ t: 's', x, y, d: 'down', m: false });
  await sleep(150); return R;
}
const kill = async (A, B, ms = 15000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { A.send({ t: 'atk', to: B.id }); const d = await B.wait(m => m.t === 'DIED', 800); if (d) return d; } return null; };
try {
  const N = n => (n + tag).slice(0, 16);
  console.log('Heroes appear only once they say where they are');
  const A = await join(N('Aa'), 100, 700, 20), C = new Sock('/room/' + W, await ticket(N('Cc'))); await C.open; await C.wait(m => m.t === 'hi'); C.id = N('Cc').toLowerCase();
  await sleep(300); ok(!A.has(m => m.t === '+' && m.p.id === C.id), 'a connection that never sends a position is not announced');
  const D = await join(N('Dd'), 120, 700, 3); ok(!D.hi.players.some(p => p.id === C.id) && D.hi.players.some(p => p.id === A.id), 'newcomers see placed heroes only');
  C.send({ t: 's', x: 130, y: 700, d: 'down', m: false }); ok(!!(await A.wait(m => m.t === '+' && m.p.id === C.id && m.p.x === 130)), 'announced with a real position on their first move');
  C.close(); ok(!!(await A.wait(m => m.t === '-' && m.id === C.id)), 'and the leave is announced');
  D.close(); await sleep(200);

  console.log('Who can attack whom');
  const B = await join(N('Bb'), 110, 700, 5);
  ok(A.hi.pvp === 1, 'Hold worlds say PvP is on');
  A.send({ t: 'atk', to: B.id }); ok((await A.wait(m => m.t === 'PN'))?.why === 'safe_you', 'no fighting in the Hold');
  A.send({ t: 's', x: 100, y: 600, d: 'up', m: false }); B.send({ t: 's', x: 110, y: 600, d: 'up', m: false }); await sleep(200);   // Wilderness level 2
  A.send({ t: 'atk', to: B.id }); ok((await A.wait(m => m.t === 'PN'))?.why === 'level', 'combat levels 20 and 5 can’t fight at Wilderness level 2');
  A.send({ t: 's', x: 100, y: 100, d: 'up', m: false }); B.send({ t: 's', x: 300, y: 100, d: 'up', m: false }); await sleep(900);   // level 17, far apart
  A.send({ t: 'atk', to: B.id }); ok((await A.wait(m => m.t === 'PN'))?.why === 'far', 'too far away to hit');
  B.send({ t: 's', x: 115, y: 100, d: 'up', m: false }); await sleep(900);
  B.send({ t: 'risk', it: [['ember_blade', 1, 'blade', 520], ['gem', 5, 0, 40], ['bread', 3, 0, 8], ['oil', 2, 0, 15]] }); await sleep(100);
  A.send({ t: 'atk', to: B.id }); const ph = await B.wait(m => m.t === 'PH');
  ok(ph && ph.a === A.id && ph.v === B.id && ph.max === 60 + 8 * 4 && ph.hp === ph.max - ph.d, `a hit at Wilderness 17 (${ph && ph.d} damage, ${ph && ph.hp}/${ph && ph.max})`);
  ok(!!(await B.wait(m => m.t === 'SK' && m.id === A.id && m.left > 19 * 60e3)), 'attacking first: the attacker is skulled for 20 minutes');
  A.send({ t: 'atk', to: B.id }); await sleep(250); ok(!B.has(m => m.t === 'PH'), 'one attack every 0.75 s');
  await sleep(600); B.send({ t: 'atk', to: A.id }); await A.wait(m => m.t === 'PH' && m.a === B.id); await sleep(300);
  ok(!A.has(m => m.t === 'SK' && m.id === B.id), 'hitting back doesn’t skull you');

  console.log('Food, and no running off mid-fight');
  const before = (await (async () => { B.send({ t: 'eat', h: 30 }); return A.wait(m => m.t === 'H' && m.id === B.id); })());
  ok(before && before.hp > 0 && before.hp <= before.max, 'eating heals, and everyone sees the new health');
  B.send({ t: 'eat', h: 30 }); await sleep(250); ok(!A.has(m => m.t === 'H' && m.id === B.id), 'one bite every 1.5 s');
  B.send({ t: 's', x: 115, y: 900, d: 'down', m: true }); ok(!!(await B.wait(m => m.t === 'pos' && m.y === 100)), 'a teleport out of a fight is sent back');

  console.log('Falling: unskulled keeps 3 items');
  const E = await join(N('Ee'), 140, 100, 22);   // a bystander
  const died = await kill(A, B);
  ok(died && died.sk === 0 && JSON.stringify(died.kept) === JSON.stringify([['ember_blade', 1, 'blade'], ['gem', 2, 0]]), 'kept: the 3 most valuable items (Ember Blade, 2 Cave Gems)');
  ok(died && JSON.stringify(died.lost) === JSON.stringify([['gem', 3, 0], ['oil', 2, 0], ['bread', 3, 0]]), 'dropped: the rest');
  const pk = await E.wait(m => m.t === 'PK'); ok(pk && pk.v === B.id && pk.a === A.id, 'everyone is told who fell, and to whom');
  await sleep(200);
  const dA = A.msgs.filter(m => m.t === 'D' && m.d.by === A.id), dE = E.msgs.filter(m => m.t === 'D' && m.d.by === A.id);
  ok(dA.length === 3 && dA.every(m => m.d.wait === 0 && m.d.bag === 1), 'the killer sees the loot at once');
  ok(dE.length === 3 && dE.every(m => m.d.wait > 55000), 'everyone else after a minute');
  E.send({ t: 'take', did: dA[0].d.did }); ok(!!(await E.wait(m => m.t === 'nope')), 'a bystander can’t grab it early');
  A.send({ t: 'take', did: dA[0].d.did }); ok(!!(await A.wait(m => m.t === 'took' && m.by === A.id)), 'the killer picks it up');
  const rc = await A.wait(m => m.t === 'RC'); ok(rc && rc.tk.split('.').length === 3, 'with a signed receipt for the save');
  ok(!!(await A.wait(m => m.t === 'S' && m.p.some(r => r[0] === B.id && r[2] === 800))), 'the fallen hero is sent home to the Hold by the server');
  A.send({ t: 'atk', to: B.id }); await sleep(900); A.send({ t: 'atk', to: B.id }); ok(['protected', 'safe_them'].includes((await A.wait(m => m.t === 'PN'))?.why), 'and can’t be hit again');

  console.log('Falling skulled: lose everything');
  await sleep(5200); B.send({ t: 's', x: 115, y: 100, d: 'up', m: false }); await sleep(300);
  B.send({ t: 'risk', it: [['ember_blade', 1, 'blade', 520], ['gem', 2, 0, 40]] });
  const F = await join(N('Ff'), 120, 100, 6);
  B.send({ t: 'atk', to: F.id }); ok(!!(await F.wait(m => m.t === 'SK' && m.id === B.id)), 'B attacks first and is skulled');
  await sleep(800);
  const died2 = await kill(A, B); ok(died2 && died2.sk === 1 && died2.kept.length === 0 && died2.lost.length === 2, 'a skulled hero keeps nothing');

  console.log('Logging out mid-fight');
  await sleep(5200); B.send({ t: 's', x: 115, y: 100, d: 'up', m: false }); B.send({ t: 'risk', it: [['iron_mail', 1, 'mail', 180]] }); await sleep(900);
  A.msgs.length = 0; A.send({ t: 'atk', to: B.id }); ok(!!(await A.wait(m => m.t === 'PH' && m.v === B.id)), 'in a fight'); B.close(); await sleep(400);
  ok(!A.has(m => m.t === '-' && m.id === B.id), 'the hero stays in the world');
  const L = new Sock('/lobby', await ticket(N('Bb')));   // (lobby connection for the pending defeat)
  let pk2 = null; for (let i = 0; i < 20 && !pk2; i++) { await sleep(800); A.send({ t: 'atk', to: B.id }); pk2 = A.msgs.find(m => m.t === 'PK' && m.v === B.id); }
  ok(!!pk2, 'and can still be defeated');
  ok(!!(await A.wait(m => m.t === '-' && m.id === B.id)), 'then leaves');
  L.close(); await sleep(300);
  const L2 = new Sock('/lobby', await ticket(N('Bb'))); await L2.open; const away = await L2.wait(m => m.t === 'died', 3000);
  ok(away && away.away === 1 && away.kept[0][0] === 'iron_mail' && Array.isArray(away.lost), 'signing back in: told about the defeat, with what was kept and dropped');
  L2.close();
  console.log('Coming back in time');
  await sleep(1000); A.msgs.length = 0; const G = await join(N('Gg'), 160, 100, 21); G.send({ t: 's', x: 160, y: 100, d: 'up', m: false }); await sleep(300);
  A.send({ t: 's', x: 150, y: 100, d: 'up', m: false }); await sleep(800); A.send({ t: 'atk', to: G.id }); await G.wait(m => m.t === 'PH'); G.close(); await sleep(500);
  const G2 = new Sock('/room/' + W, await ticket(N('Gg'))); await G2.open; const hiG = await G2.wait(m => m.t === 'hi');
  ok(hiG && hiG.back && hiG.back.x === 160 && hiG.back.hp < hiG.back.max, 'reconnecting puts you back where you stood, as hurt as you were');
  ok(!A.has(m => (m.t === '-' || m.t === '+') && m.id === G.id), 'and nobody saw you leave');
  [A, E, F, G2].forEach(s => s.close());
} catch (e) { failN++; console.error(e); }
console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
