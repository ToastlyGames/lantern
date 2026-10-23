// Load test: simulates many players signing in with real wallet signatures, then playing and saving.
//
//   Local (in-memory database with simulated database latency, nothing leaves your machine):
//     npm run build && npm run loadtest -- --players 1000 --minutes 2
//
//   Against your real deployment (creates test heroes named lt_xxxx_N; remove them afterwards
//   with supabase/cleanup-load-test.sql):
//     npm run loadtest -- --url https://your-game.vercel.app --players 1000 --minutes 3 --confirm
//
// Options: --players N (1000)  --minutes M (2)  --interval S (12, average seconds between saves while active)
//          --idle P (0.15, share of save ticks where the player changed nothing, so the game sends nothing)
//          --latency MS (15, local only: simulated delay of each database call)  --join C (50, sign-ins at once)
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';

const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map(a => { const [k, ...v] = a.trim().split(/\s+/); return [k, v.length ? v.join(' ') : true]; }));
const PLAYERS = Number(args.players || 1000), MINUTES = Number(args.minutes || 2), INTERVAL = Number(args.interval || 12);
const IDLE = Number(args.idle ?? 0.15), LATENCY = Number(args.latency ?? 15), JOIN = Number(args.join || (args.url ? 20 : 50));
const REMOTE = typeof args.url === 'string';
if (REMOTE && !args.confirm) { console.error('Add --confirm to run against a real deployment (it creates test heroes in your database).'); process.exit(1); }

let BASE, srv;
if (REMOTE) BASE = args.url.replace(/\/$/, '');
else {
  const PORT = 3998; BASE = `http://localhost:${PORT}`;
  srv = spawn(process.execPath, ['scripts/dev-server.mjs'], { env: { ...process.env, PORT: String(PORT), LH_MEMORY_DB: '1', LH_OFFLINE: '1', LH_MEMORY_LATENCY_MS: String(LATENCY), SUPABASE_URL: '' }, stdio: ['ignore', 'pipe', 'inherit'] });
  await new Promise(r => srv.stdout.once('data', r));
}
const host = new URL(BASE).host, origin = new URL(BASE).origin;
const tag = [...randomBytes(4)].map(b => 'bcdfghjmpqrvwxyz'[b % 16]).join(''); // no vowels, so names never trip the word filter
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---- measurements ----
const stats = {};
function rec(kind, ms, status) {
  const s = stats[kind] ||= { lat: [], codes: {} };
  s.lat.push(ms); s.codes[status] = (s.codes[status] || 0) + 1;
}
const pct = (a, p) => { if (!a.length) return 0; const b = [...a].sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.floor(p / 100 * b.length))]; };

class Player {
  constructor(i) { this.i = i; this.acct = privateKeyToAccount(generatePrivateKey()); this.cookie = ''; }
  async req(kind, path, { method = 'GET', body } = {}) {
    const t = performance.now();
    let status = 0, data = {};
    try {
      const r = await fetch(BASE + '/api/' + path, { method, headers: { 'X-LH': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(this.cookie ? { cookie: this.cookie } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(15000) });
      status = r.status;
      const sc = r.headers.get('set-cookie'); if (sc) this.cookie = sc.split(';')[0];
      try { data = await r.json(); } catch { }
    } catch { status = 0; }
    rec(kind, performance.now() - t, status);
    return { status, data };
  }
  async join() {
    const nonce = (await this.req('nonce', 'auth/nonce')).data.nonce;
    if (!nonce) return false;
    const now = new Date();
    const message = `${host} wants you to sign in with your Ethereum account:\n${this.acct.address}\n\nSign in to Lanternhold.\n\nURI: ${origin}\nVersion: 1\nChain ID: 4663\nNonce: ${nonce}\nIssued At: ${now.toISOString()}\nExpiration Time: ${new Date(now.getTime() + 600e3).toISOString()}`;
    const signature = await this.acct.signMessage({ message });
    const v = await this.req('sign-in', 'auth/verify', { method: 'POST', body: { message, signature } });
    if (v.status !== 200) return false;
    let me = v.data;
    if (!me.hero) {
      const h = await this.req('create hero', 'hero', { method: 'POST', body: { name: `lt_${tag}_${this.i}`, look: { skin: this.i % 4, hair: this.i % 6, cloth: this.i % 8, style: this.i % 3 } } });
      if (h.status !== 201) return false;
      me = h.data;
    }
    this.data = me.save.data; this.rev = me.save.rev;
    return true;
  }
  async play(until) {
    await sleep(Math.random() * INTERVAL * 1000); // players arrive at different moments
    while (Date.now() < until) {
      await sleep((INTERVAL - 2 + Math.random() * 4) * 1000);
      if (Date.now() >= until) break;
      if (Math.random() < 0.01) { // someone reloads the page
        const m = await this.req('page load', 'me');
        if (m.data.save) { this.data = m.data.save.data; this.rev = m.data.save.rev; }
        continue;
      }
      if (Math.random() < IDLE) { idleSkipped++; continue; } // nothing changed: the game sends nothing
      const d = this.data;
      d.gold += Math.floor(Math.random() * 15); d.xp += 25; d.caught += 1; d.skills.fishing = (d.skills.fishing || 0) + 60;
      const r = await this.req('save', 'save', { method: 'POST', body: { data: d, rev: this.rev } });
      if (r.status === 200) this.rev = r.data.rev;
      else if (r.data && r.data.save) { this.data = r.data.save.data; this.rev = r.data.save.rev; }
    }
  }
}
let idleSkipped = 0;

async function serverStats() { if (REMOTE) return null; try { return await (await fetch(BASE + '/__dev/stats')).json(); } catch { return null; } }

try {
  console.log(`Lanternhold load test: ${PLAYERS} players, ${MINUTES} min, ${REMOTE ? BASE : `local server, ${LATENCY} ms per database call`}`);
  const players = Array.from({ length: PLAYERS }, (_, i) => new Player(i + 1));

  // 1) everyone signs in (as if the servers opened and players poured in)
  let t0 = performance.now(), joined = 0, next = 0;
  await Promise.all(Array.from({ length: JOIN }, async () => { while (next < players.length) { const p = players[next++]; if (await p.join()) { p.ok = true; joined++; } } }));
  const joinSec = (performance.now() - t0) / 1000;
  console.log(`  ${joined}/${PLAYERS} players signed in and created heroes in ${joinSec.toFixed(1)} s (${JOIN} at a time)`);

  // 2) everyone plays at the same time
  const before = await serverStats();
  for (const k of Object.keys(stats)) if (k !== 'save') stats['join: ' + k] = stats[k], delete stats[k];
  t0 = performance.now();
  const until = Date.now() + MINUTES * 60e3;
  const tick = setInterval(() => { const s = stats.save; if (s) process.stdout.write(`\r  playing… ${((performance.now() - t0) / 1000).toFixed(0)} s, ${s.lat.length} saves`); }, 2000);
  await Promise.all(players.filter(p => p.ok).map(p => p.play(until)));
  clearInterval(tick); process.stdout.write('\n');
  const playSec = (performance.now() - t0) / 1000;
  const after = await serverStats();

  // 3) report
  console.log('\n  request          count    p50 ms   p95 ms   p99 ms   max ms   results');
  for (const [k, s] of Object.entries(stats)) {
    const codes = Object.entries(s.codes).map(([c, n]) => `${c === '0' ? 'timeout/error' : c}×${n}`).join(' ');
    console.log(`  ${k.padEnd(16)} ${String(s.lat.length).padStart(5)} ${pct(s.lat, 50).toFixed(0).padStart(9)} ${pct(s.lat, 95).toFixed(0).padStart(8)} ${pct(s.lat, 99).toFixed(0).padStart(8)} ${Math.max(...s.lat).toFixed(0).padStart(8)}   ${codes}`);
  }
  const playReqs = ['save', 'page load'].reduce((n, k) => n + (stats[k] ? stats[k].lat.length : 0), 0);
  const saves = stats.save ? stats.save.lat.length : 0, good = stats.save ? (stats.save.codes[200] || 0) : 0;
  console.log(`\n  While playing: ${(playReqs / playSec).toFixed(1)} requests/s from ${joined} players; ${(100 * good / Math.max(1, saves)).toFixed(2)}% of saves accepted; ${idleSkipped} idle ticks sent nothing.`);
  if (before && after) {
    const cpuMs = ((after.cpu.user + after.cpu.system) - (before.cpu.user + before.cpu.system)) / 1000;
    const reqs = after.requests - before.requests;
    const perReq = cpuMs / Math.max(1, reqs);
    console.log(`  Server CPU: ${perReq.toFixed(2)} ms per request, ${(100 * cpuMs / (playSec * 1000)).toFixed(0)}% of one core for ${joined} players; memory ${(after.rss / 1048576).toFixed(0)} MB.`);
    const monthReqs = (playReqs / playSec) * 3600 * 24 * 30;
    const cpuHours = monthReqs * perReq / 3.6e6;
    console.log(`  If ${joined} players were online 24/7 for a month: ~${(monthReqs / 1e6).toFixed(0)}M requests, ~${cpuHours.toFixed(1)} CPU-hours of function time (Vercel iad1: $0.60 per 1M invocations, $0.128 per CPU-hour).`);
  }
  const failed = Object.values(stats).reduce((n, s) => n + (s.codes[0] || 0) + Object.entries(s.codes).filter(([c]) => Number(c) >= 500).reduce((m, [, v]) => m + v, 0), 0);
  console.log(failed ? `\n  ✗ ${failed} requests failed or timed out.` : '\n  ✓ No failed or timed-out requests.');
  if (REMOTE) console.log(`\n  Test heroes are named lt_${tag}_1 … lt_${tag}_${PLAYERS}. Remove them with supabase/cleanup-load-test.sql.`);
  process.exitCode = failed ? 1 : 0;
} catch (e) { console.error(e); process.exitCode = 1; }
if (srv) srv.kill();
