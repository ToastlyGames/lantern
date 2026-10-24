// Hibernation checks against `wrangler dev`: heartbeats are answered, and a silent socket is closed by the alarm sweep.
import WebSocket from 'ws';
import { SignJWT } from 'jose';
const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
const tk = n => new SignJWT({ n }).setProtectedHeader({ alg: 'HS256' }).setSubject(n.toLowerCase()).setIssuer('lanternhold-rt').setExpirationTime('2m').sign(new TextEncoder().encode(SECRET));
const open = async (path, n) => { const ws = new WebSocket(BASE + path + '?t=' + await tk(n), { headers: { Origin: 'http://localhost:3000' } }); ws.msgs = []; ws.on('message', d => ws.msgs.push(String(d))); await new Promise(r => ws.on('open', r)); return ws; };
const tag = Math.random().toString(36).slice(2, 6);
let pass = 0, fail = 0; const ok = (c, n) => { c ? pass++ : fail++; console.log(c ? '  ✓' : '  ✗', n); };
const live = await open('/room/w7', 'Live' + tag), quiet = await open('/room/w7', 'Quiet' + tag);
live.send('{"t":"ping"}'); await new Promise(r => setTimeout(r, 500));
ok(live.msgs.includes('{"t":"pong"}'), 'heartbeat answered');
let closedAt = 0; quiet.on('close', c => closedAt = c);
const t0 = Date.now(), keep = setInterval(() => live.send('{"t":"ping"}'), 20000);
while (!closedAt && Date.now() - t0 < 130000) await new Promise(r => setTimeout(r, 1000));
clearInterval(keep);
ok(closedAt === 4001, 'silent socket closed by the sweep (' + Math.round((Date.now() - t0) / 1000) + ' s)');
ok(live.readyState === 1, 'player sending heartbeats stays connected');
ok(live.msgs.some(m => m.includes('"t":"-"') && m.includes('quiet' + tag)), 'others are told the silent player left');
live.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
