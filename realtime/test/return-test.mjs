// The Return Flame out of the Wilderness, going home after a defeat, and party death notices (against `wrangler dev`).
import WebSocket from 'ws';
import { SignJWT } from 'jose';
const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
let pass = 0, failN = 0; const ok = (c, n) => { c ? pass++ : failN++; console.log(c ? '  ✓' : '  ✗', n); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ticket = n => new SignJWT({ n }).setProtectedHeader({ alg: 'HS256' }).setSubject(n.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime('2m').sign(new TextEncoder().encode(SECRET));
const tag = Math.random().toString(36).slice(2, 6), W = 'w' + (200 + Math.floor(Math.random() * 700));
class Sock { constructor(path, t) { this.msgs = []; this.ws = new WebSocket(BASE + path + '?t=' + t, { headers: { Origin: 'http://localhost:3000' } }); this.ws.on('message', d => this.msgs.push(JSON.parse(d))); this.open = new Promise(r => this.ws.on('open', r)); }
  send(o) { this.ws.send(JSON.stringify(o)); } async wait(f, ms = 2500) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const m = this.msgs.find(f); if (m) { this.msgs.splice(this.msgs.indexOf(m), 1); return m; } await sleep(20); } return null; } close() { this.ws.close(); } }
const join = async (n, x, y, lvl) => { const R = new Sock('/room/' + W, await ticket(n)); await R.open; await R.wait(m => m.t === 'hi'); R.id = n.toLowerCase(); R.send({ t: 'look', look: { blade: 'ember', lvl } }); R.send({ t: 's', x, y, d: 'up', m: false }); await sleep(150); return R; };
try {
  const A = await join(('Ra' + tag).slice(0, 12), 100, 300, 10), B = await join(('Rb' + tag).slice(0, 12), 110, 300, 10);
  A.send({ t: 'atk', to: B.id }); await B.wait(m => m.t === 'PH');
  B.send({ t: 's', x: 208, y: 800, d: 'down', m: true }); ok(!!(await B.wait(m => m.t === 'pos')), 'mid-fight: walking off the map is refused');
  B.send({ t: 'home', x: 208, y: 300 }); await sleep(300); B.send({ t: 's', x: 208, y: 300, d: 'down', m: false }); ok(!!(await B.wait(m => m.t === 'pos')), 'the Return Flame can’t land you somewhere in the Wilderness');
  B.send({ t: 'home', x: 208, y: 800 }); const S = await A.wait(m => m.t === 'S' && m.p.some(r => r[0] === B.id && r[2] === 800));
  ok(!!S, 'the Return Flame takes you home to the Hold, even mid-fight');
  B.send({ t: 's', x: 210, y: 802, d: 'down', m: true }); await sleep(300); ok(!B.msgs.some(m => m.t === 'pos'), 'and you can walk on from there');
  // a defeat: going home straight away is allowed
  await sleep(10500); B.send({ t: 's', x: 110, y: 300, d: 'up', m: false }); await sleep(300);   // out of combat by now: walk back in
  let died = null; const t0 = Date.now(); while (!died && Date.now() - t0 < 25000) { A.send({ t: 'atk', to: B.id }); died = await B.wait(m => m.t === 'DIED', 800); }
  ok(!!died, 'defeated');
  B.send({ t: 's', x: 208, y: 800, d: 'down', m: false }); await sleep(300); ok(!B.msgs.some(m => m.t === 'pos'), 'after a defeat you go straight home (no "mid-fight" block)');
  // party death notices
  const La = new Sock('/lobby', await ticket(('Ra' + tag).slice(0, 12))), Lb = new Sock('/lobby', await ticket(('Rb' + tag).slice(0, 12))); await La.open; await Lb.open; await sleep(300);
  La.send({ t: 'invite', to: B.id }); await Lb.wait(m => m.t === 'invited'); Lb.send({ t: 'accept', from: A.id }); await La.wait(m => m.t === 'party' && m.party && m.party.members.length === 2);
  Lb.send({ t: 'pdie', k: 'wild', by: ('Ra' + tag).slice(0, 12) }); const pm = await La.wait(m => m.t === 'pchat' && m.sys);
  ok(pm && pm.text === ('Rb' + tag).slice(0, 12) + ' was defeated by ' + ('Ra' + tag).slice(0, 12) + ' in the Wilderness', 'the party is told: ' + (pm && pm.text));
  await sleep(4200); Lb.send({ t: 'pdie', k: 'depths', floor: 7 }); const pm2 = await La.wait(m => m.t === 'pchat' && m.sys); ok(pm2 && /died in the Depths \(floor 7\)/.test(pm2.text), pm2 && pm2.text);
  Lb.send({ t: 'pdie', k: 'depths', by: '<b>x' }); await sleep(400); ok(!La.msgs.some(m => m.t === 'pchat' && m.sys), 'no spam, nothing typed by players');
  [A, B, La, Lb].forEach(s => s.close());
} catch (e) { failN++; console.error(e); }
console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0);
