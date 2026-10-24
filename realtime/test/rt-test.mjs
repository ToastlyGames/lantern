// Realtime server tests against `wrangler dev` (npm run dev in another terminal): node test/rt-test.mjs
import WebSocket from 'ws';
import { SignJWT } from 'jose';

const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
let pass = 0, failN = 0;
const ok = (c, name) => { if (c) { pass++; console.log('  ✓', name); } else { failN++; console.log('  ✗', name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ticket = (name, { adm = false, secret = SECRET, exp = '2m' } = {}) => new SignJWT({ n: name, adm }).setProtectedHeader({ alg: 'HS256' }).setSubject(name.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime(exp).sign(new TextEncoder().encode(secret));
const tag = Math.random().toString(36).slice(2, 6);

class Sock {
  constructor(path, t) { this.msgs = []; this.ws = new WebSocket(BASE + path + '?t=' + t, { headers: { Origin: 'http://localhost:3000' } }); this.closed = null;
    this.ws.on('message', d => this.msgs.push(JSON.parse(d))); this.ws.on('close', (c) => this.closed = c); this.ws.on('error', () => { });
    this.open = new Promise(r => { this.ws.on('open', r); this.ws.on('close', r); this.ws.on('unexpected-response', (q, res) => { this.status = res.statusCode; r(); }); }); }
  send(o) { this.ws.send(JSON.stringify(o)); }
  async wait(pred, ms = 2000) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const m = this.msgs.find(pred); if (m) { this.msgs.splice(this.msgs.indexOf(m), 1); return m; } await sleep(20); } return null; }
  close() { try { this.ws.close(); } catch { } }
}
class Player {
  constructor(name, opts) { this.name = name; this.id = name.toLowerCase(); this.opts = opts; }
  async lobby() { this.t = await ticket(this.name, this.opts); this.L = new Sock('/lobby', this.t); await this.L.open; return this.L.wait(m => m.t === 'hello'); }
  async room(id) { if (this.R) this.R.close(); this.R = new Sock('/room/' + id, await ticket(this.name, this.opts)); await this.R.open; return this.R.wait(m => m.t === 'hi' || m.t === 'denied' || m.t === 'full', 3000); }
}
const names = n => Array.from({ length: n }, (_, i) => `P${tag}${i}`.slice(0, 16));

try {
  console.log('Tickets');
  { const s = new Sock('/lobby', 'garbage'); await s.open; ok(s.status === 401, 'bad ticket refused');
    const s2 = new Sock('/lobby', await ticket('Hacker' + tag, { secret: 'x'.repeat(40) })); await s2.open; ok(s2.status === 401, 'ticket signed with another secret refused');
    const s3 = new Sock('/lobby', await ticket('Late' + tag, { exp: Math.floor(Date.now() / 1000) - 5 })); await s3.open; ok(s3.status === 401, 'expired ticket refused'); }

  console.log('Lobby and worlds');
  const [a, b, c, d] = names(4).map(n => new Player(n));
  const ha = await a.lobby(); ok(ha && ha.you === a.id && ha.party === null, 'hello: knows who you are');
  await b.lobby(); await c.lobby(); await d.lobby();
  a.L.send({ t: 'world' }); const wa = await a.L.wait(m => m.t === 'world'); ok(/^w\d+$/.test(wa.room), 'lobby assigns a world');
  const hia = await a.room(wa.room); a.L.send({ t: 'where', room: wa.room });
  ok(hia.t === 'hi' && hia.me === a.id && Array.isArray(hia.players), 'joined the world room');
  b.L.send({ t: 'world' }); const wb = await b.L.wait(m => m.t === 'world'); ok(wb.room === wa.room, 'next player is put in the same (busiest) world');
  const hib = await b.room(wb.room); b.L.send({ t: 'where', room: wb.room });
  ok(hib.players.some(p => p.id === a.id), 'you see players already there');
  ok(!!(await a.R.wait(m => m.t === '+' && m.p.id === b.id)), 'players already there see you arrive');

  console.log('Movement, looks, chat');
  b.R.send({ t: 's', x: 120.5, y: 80, d: 'left', m: true });
  const S = await a.R.wait(m => m.t === 'S'); ok(S && S.p.some(r => r[0] === b.id && r[1] === 120.5 && r[3] === 'left' && r[4] === 1), 'positions relay to others (batched 10x a second)');
  b.R.send({ t: 's', x: 'evil', y: 1 }); await sleep(250); ok(!a.R.msgs.some(m => m.t === 'S' && m.p.some(r => r[1] === 'evil')), 'bad positions ignored');
  b.R.send({ t: 'look', look: { skin: 2, hair: 3, cloth: 1, style: 0, armor: 'iron', cape: 'moss', helm: 'partyhat', lan: 'wisp' } });
  const L = await a.R.wait(m => m.t === 'L'); ok(L && L.look.armor === 'iron' && L.look.helm === null, 'looks relay; the Blue Party Hat is stripped from non-admins');
  b.R.send({ t: 'say', text: 'hello <b>world</b> shitty' });
  const say = await a.R.wait(m => m.t === 'say'); ok(say && say.name === b.name && say.text === 'hello bworld/b s*****', 'chat relays with the real hero name, cleaned and filtered');
  b.R.send({ t: 'say', text: 'again' }); ok(!!(await b.R.wait(m => m.t === 'slow')), 'chat slow-mode');
  b.R.send({ t: 'say', text: 'hi', name: 'Lantern' }); await sleep(1300); b.R.send({ t: 'say', text: 'spoof?', name: 'Lantern' });
  const sp = await a.R.wait(m => m.t === 'say' && m.text === 'spoof?'); ok(sp && sp.name === b.name, 'clients can’t pick their own name');
  const late = new Player(names(5)[4].slice(0, 15) + 'z'); await late.lobby(); const hl = await late.room(wa.room);
  ok(!hl.chat && !(hl.chat || []).some(m => m.text === 'spoof?'), 'newcomers start with a fresh chat (no history is stored or sent)');

  console.log('Friends status');
  c.L.send({ t: 'watch', ids: [a.id, 'nobody_here'] });
  const st = await c.L.wait(m => m.t === 'status'); const sa = st.list.find(x => x.id === a.id);
  ok(sa && sa.on && sa.room === wa.room && st.list.find(x => x.id === 'nobody_here').on === false, 'friend list shows who is online and where');
  a.L.send({ t: 'where', room: null }); ok(!!(await c.L.wait(m => m.t === 'status' && m.list[0].id === a.id && m.list[0].room === null)), 'friends are told when you move');

  console.log('Parties');
  a.L.send({ t: 'invite', to: b.id }); const inv = await b.L.wait(m => m.t === 'invited'); ok(inv && inv.from === a.id && inv.name === a.name, 'party invite delivered');
  b.L.send({ t: 'accept', from: a.id }); const pa = await a.L.wait(m => m.t === 'party' && m.party && m.party.members.length === 2);
  ok(pa && pa.party.leader === a.id && pa.party.members.map(x => x.id).join() === [a.id, b.id].join(), 'accepted: party of two, inviter leads');
  b.L.send({ t: 'accept', from: a.id }); ok(!!(await b.L.wait(m => m.t === 'note' && /expired/.test(m.text))), 'an invite can only be used once');
  c.L.send({ t: 'invite', to: b.id }); ok(!!(await c.L.wait(m => m.t === 'note' && /already in a party/.test(m.text))), 'can’t invite someone already in a party');
  a.L.send({ t: 'invite', to: c.id }); await c.L.wait(m => m.t === 'invited'); c.L.send({ t: 'accept', from: a.id });
  await a.L.wait(m => m.t === 'party' && m.party && m.party.members.length === 3);
  b.L.send({ t: 'pchat', text: 'party time' }); ok(!!(await c.L.wait(m => m.t === 'pchat' && m.text === 'party time' && m.name === b.name)), 'party chat');

  console.log('Dungeon instances');
  b.L.send({ t: 'delve', floor: 2 }); ok(!!(await b.L.wait(m => m.t === 'note' && /leader/.test(m.text))), 'only the leader can lead the party down');
  a.L.send({ t: 'delve', floor: 2 });
  const go = await a.L.wait(m => m.t === 'go'); ok(go && /^d-[a-z0-9]{12}$/.test(go.room) && go.floor === 2 && Number.isInteger(go.seed), 'leader gets a new private instance');
  const pd = await b.L.wait(m => m.t === 'partyDelve'); ok(pd && pd.room === go.room && pd.seed === go.seed && pd.by === a.name, 'party members are told where the party went');
  const hiA = await a.room(go.room); a.L.send({ t: 'where', room: go.room, floor: 2 });
  ok(hiA.t === 'hi' && hiA.host === a.id && hiA.seed === go.seed && hiA.floor === 2, 'leader enters as the host with the shared seed and floor');
  const hiB = await b.room(go.room); b.L.send({ t: 'where', room: go.room, floor: 2 });
  ok(hiB.t === 'hi' && hiB.host === a.id && hiB.players.some(p => p.id === a.id), 'member joins the same instance');
  const hiD = await d.room(go.room); ok(hiD && hiD.t === 'denied', 'someone outside the party can’t get in');
  b.R.send({ t: 'hit', e: 3, d: 12 }); const hit = await a.R.wait(m => m.t === 'hit'); ok(hit && hit.from === b.id && hit.e === 3, 'members’ hits go to the host');
  a.R.send({ t: 'en', e: [[3, 'slime', 50, 60, 10, 30]] }); const en = await b.R.wait(m => m.t === 'en'); ok(en && en.e[0][0] === 3 && en.from === a.id, 'host’s monsters go to everyone');
  b.R.send({ t: 'en', e: [[9, 'fake', 1, 1, 1, 1]] }); await sleep(300); ok(!a.R.msgs.some(m => m.t === 'en' && m.e[0][0] === 9), 'only the host can move monsters');
  a.R.send({ t: 'grant', to: b.id, items: { gem: 1 } }); const gr = await b.R.wait(m => m.t === 'grant'); ok(gr && gr.items.gem === 1, 'host can send one player a message');
  a.R.send({ t: 'floor', f: 3 }); ok(!!(await b.R.wait(m => m.t === 'floor' && m.f === 3)), 'host leads everyone to the next floor');
  // host leaves: the member who has been there longest takes over
  a.R.close(); const nh = await b.R.wait(m => m.t === 'host'); ok(nh && nh.id === b.id, 'if the host leaves, another player takes over the monsters');
  const back = await a.room(go.room); ok(back.t === 'hi' && back.host === b.id && back.floor === 3, 'rejoining later lands on the party’s current floor');
  // solo instance
  d.L.send({ t: 'delve', floor: 1 }); const gd = await d.L.wait(m => m.t === 'go'); const hd = await d.room(gd.room); ok(hd.host === d.id && hd.players.length === 0, 'a player without a party delves alone in their own instance');

  console.log('Leaving parties');
  c.L.send({ t: 'leave' }); ok(!!(await c.L.wait(m => m.t === 'party' && m.party === null)), 'leaving a party');
  ok(!!(await a.L.wait(m => m.t === 'party' && m.party && m.party.members.length === 2)), 'the rest of the party is updated');
  a.L.send({ t: 'kick', id: b.id }); ok(!!(await b.L.wait(m => m.t === 'note' && /removed/.test(m.text))), 'leader can remove a member');
  ok(!!(await a.L.wait(m => m.t === 'party' && m.party === null)), 'a party of one disbands');

  console.log('Feed and single session');
  a.L.send({ t: 'feed', k: 'loot', a: 'Wispheart Lantern' }); ok(!!(await d.L.wait(m => m.t === 'feed' && m.text === a.name + ' found a Wispheart Lantern', 3000)), 'world feed reaches everyone, built from a template');
  a.L.send({ t: 'feed', k: 'loot', a: '<script>' }); a.L.send({ t: 'feed', k: 'free', a: 'anything' }); await sleep(2500); ok(!d.L.msgs.some(m => m.t === 'feed' && /script|anything/.test(m.text)), 'free text can’t be put in the feed');
  const a2 = new Player(a.name); await a2.lobby(); ok(!!(await a.L.wait(m => m.t === 'kicked')), 'signing in on a second device closes the first');

  console.log('World capacity');
  const crowd = names(52).map((n, i) => new Player('C' + tag + i)); const w = 'w' + (90 + Math.floor(Math.random() * 9));
  const res = []; for (const p of crowd) res.push((await p.room(w)).t);
  ok(res.filter(x => x === 'hi').length === 50 && res.filter(x => x === 'full').length === 2, 'a world holds 50 players; the 51st is told it’s full');
  crowd.forEach(p => p.R.close());
  [a, b, c, d, late, a2].forEach(p => { p.L && p.L.close(); p.R && p.R.close(); });
} catch (e) { failN++; console.error(e); }
console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
