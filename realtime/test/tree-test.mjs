// Shared trees: chopping takes logs off one stack, and a tree left alone grows logs back (oak: after 15 s, +1 every 2 s).
import WebSocket from 'ws';
import { SignJWT } from 'jose';
const BASE = process.env.RT_TEST_URL || 'ws://127.0.0.1:8787', SECRET = process.env.RT_SECRET || 'dev-only-realtime-secret-0123456789abcdef';
const tk = n => new SignJWT({ n }).setProtectedHeader({ alg: 'HS256' }).setSubject(n.toLowerCase()).setIssuer('lanternhold-rt').setExpirationTime('2m').sign(new TextEncoder().encode(SECRET));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tag = Math.random().toString(36).slice(2, 6), room = 'w' + (500 + Math.floor(Math.random() * 400));
const open = async n => { const ws = new WebSocket(BASE + '/room/' + room + '?t=' + await tk(n), { headers: { Origin: 'http://localhost:3000' } }); ws.msgs = []; ws.on('message', d => ws.msgs.push(JSON.parse(d))); await new Promise(r => ws.on('open', r)); await sleep(200); return ws; };
let pass = 0, fail = 0; const ok = (c, n) => { c ? pass++ : fail++; console.log(c ? '  ✓' : '  ✗', n); };
const a = await open('Cut' + tag);
for (let k = 0; k < 5; k++) { a.send(JSON.stringify({ t: 'chop', i: 2, k: 'oak', ok: 1 })); await sleep(1300); }
const last = a.msgs.filter(m => m.t === 'T').pop();
ok(last && last.left === 295, 'five logs cut: 295 left (' + (last && last.left) + ')');
a.close(); console.log('  …leaving the tree alone for 20 s');
await sleep(20000);
const b = await open('Look' + tag); const hi = b.msgs.find(m => m.t === 'hi'); const tr = (hi.trees || []).find(v => v[0] === 2);
ok(tr && tr[1] > 295 && tr[1] < 300, 'the tree grew logs back while nobody cut it (' + (tr ? tr[1] : 300) + ' of 300, still growing)');
ok(tr && tr[3] >= 0, 'newcomers get how long ago it was cut, so their screen keeps regrowing it too');
b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
