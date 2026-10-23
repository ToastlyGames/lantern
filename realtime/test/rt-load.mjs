// Realtime load test: N players connect (lobby + a Hold world), walk around sending positions, and chat now and then.
//   node test/rt-load.mjs --players 600 --seconds 60          (against `npm run dev`)
//   RT_TEST_URL=wss://your-worker.workers.dev RT_SECRET=... node test/rt-load.mjs --players 300 --seconds 60
import WebSocket from 'ws';
import { SignJWT } from 'jose';
const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map(a => a.trim().split(/\s+/)));
const N = +(args.players || 600), SECS = +(args.seconds || 60), MOVE_SHARE = +(args.moving || 0.5);
const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
const tag = Math.random().toString(36).slice(2, 5), sleep = ms => new Promise(r => setTimeout(r, ms));
const ticket = n => new SignJWT({ n, adm: false }).setProtectedHeader({ alg: 'HS256' }).setSubject(n.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime('5m').sign(new TextEncoder().encode(SECRET));
const stats = { connected: 0, failed: 0, sent: 0, recvS: 0, rows: 0, lat: [], chats: 0, chatRecv: 0, worlds: new Map() };
class Bot {
  constructor(i) { this.name = ('L' + tag + i).slice(0, 16); this.x = 200 + Math.random() * 100; this.y = 200 + Math.random() * 100; }
  async start() {
    const t = await ticket(this.name);
    this.L = new WebSocket(BASE + '/lobby?t=' + t);
    await new Promise((res, rej) => { this.L.on('open', res); this.L.on('error', rej); });
    this.L.send(JSON.stringify({ t: 'world' }));
    const w = await new Promise(res => this.L.on('message', d => { const m = JSON.parse(d); if (m.t === 'world') res(m.room); }));
    this.world = w; stats.worlds.set(w, (stats.worlds.get(w) || 0) + 1);
    this.R = new WebSocket(BASE + '/room/' + w + '?t=' + await ticket(this.name));
    await new Promise((res, rej) => { this.R.on('open', res); this.R.on('error', rej); });
    this.L.send(JSON.stringify({ t: 'where', room: w }));
    this.R.on('message', d => { const m = JSON.parse(d); if (m.t === 'S') { stats.recvS++; stats.rows += m.p.length; for (const r of m.p) if (r[0] === this.name.toLowerCase() && this.sentAt) { stats.lat.push(Date.now() - this.sentAt); this.sentAt = 0; } } else if (m.t === 'say') stats.chatRecv++; });
    stats.connected++;
  }
  tick() { if (!this.R || this.R.readyState !== 1) return; if (Math.random() > MOVE_SHARE) return; this.x += (Math.random() - .5) * 8; this.y += (Math.random() - .5) * 8;
    this.R.send(JSON.stringify({ t: 's', x: this.x, y: this.y, d: 'down', m: true })); stats.sent++; if (!this.sentAt && Math.random() < .2) this.sentAt = Date.now(); }
}
const bots = Array.from({ length: N }, (_, i) => new Bot(i));
console.log(`Realtime load test: ${N} players, ${SECS}s, ${Math.round(MOVE_SHARE * 100)}% walking at any moment, against ${BASE}`);
const t0 = Date.now();
for (let i = 0; i < N; i += 25) await Promise.all(bots.slice(i, i + 25).map(b => b.start().catch(() => stats.failed++)));
console.log(`  ${stats.connected} connected (${stats.failed} failed) in ${((Date.now() - t0) / 1000).toFixed(1)}s across ${stats.worlds.size} worlds: ${[...stats.worlds.values()].join(', ')}`);
const end = Date.now() + SECS * 1000; const t1 = Date.now(); stats.lat = [];
const iv = setInterval(() => { for (const b of bots) b.tick(); }, 100);            // each walking player sends 10x a second
const civ = setInterval(() => { const b = bots[(Math.random() * bots.length) | 0]; if (b.R && b.R.readyState === 1) { b.R.send(JSON.stringify({ t: 'say', text: 'hi from ' + b.name })); stats.chats++; } }, 200);
while (Date.now() < end) await sleep(500);
clearInterval(iv); clearInterval(civ); await sleep(500);
const secs = (Date.now() - t1) / 1000, L = stats.lat.sort((a, b) => a - b), q = p => L[Math.min(L.length - 1, Math.floor(p * L.length))] || 0;
console.log(`  sent ${stats.sent} position updates (${(stats.sent / secs).toFixed(0)}/s); received ${stats.recvS} batches (${(stats.recvS / secs).toFixed(0)}/s) carrying ${stats.rows} player positions`);
console.log(`  position delay to others: median ${q(.5)} ms, 95% ${q(.95)} ms, 99% ${q(.99)} ms (includes the 100 ms batching)`);
console.log(`  chat: ${stats.chats} messages sent, ${stats.chatRecv} deliveries`);
const dropped = bots.filter(b => !b.R || b.R.readyState !== 1).length;
console.log(dropped ? `  ✗ ${dropped} connections dropped` : '  ✓ no dropped connections');
bots.forEach(b => { try { b.L.close(); b.R.close(); } catch { } });
setTimeout(() => process.exit(dropped || stats.failed ? 1 : 0), 500);
