// API tests against the local dev server (in-memory database) with real wallet signatures.
//   npm run build && npm test
import { spawn } from 'node:child_process';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';

const PORT = 3999, BASE = `http://localhost:${PORT}`;
// TEST_SUPABASE_URL + TEST_SUPABASE_KEY run the same tests against a real Supabase/PostgREST database instead of memory.
const PG = process.env.TEST_SUPABASE_URL ? { SUPABASE_URL: process.env.TEST_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: process.env.TEST_SUPABASE_KEY, LH_DEV_HOOKS: '1', LH_MEMORY_DB: '' } : { LH_MEMORY_DB: '1', SUPABASE_URL: '' };
const srv = spawn(process.execPath, ['scripts/dev-server.mjs'], { env: { ...process.env, PORT: String(PORT), LH_OFFLINE: '1', ...PG }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, failN = 0;
const ok = (cond, name) => { if (cond) { pass++; console.log('  ✓', name); } else { failN++; console.log('  ✗', name); } };

class Client {
  constructor(key) { this.acct = privateKeyToAccount(key || generatePrivateKey()); this.cookie = ''; }
  async req(path, { method = 'GET', body, headers = {} } = {}) {
    const r = await fetch(BASE + '/api/' + path, { method, headers: { 'X-LH': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(this.cookie ? { cookie: this.cookie } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
    const sc = r.headers.get('set-cookie'); if (sc) this.cookie = sc.split(';')[0];
    let data = {}; try { data = await r.json(); } catch { }
    return { status: r.status, data };
  }
  async message({ nonce, domain = `localhost:${PORT}`, chainId = 4663, issued = new Date(), expires } = {}) {
    if (!nonce) nonce = (await this.req('auth/nonce')).data.nonce;
    expires ||= new Date(issued.getTime() + 600e3);
    return `${domain} wants you to sign in with your Ethereum account:\n${this.acct.address}\n\nSign in to Lanternhold.\n\nURI: http://${domain}\nVersion: 1\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issued.toISOString()}\nExpiration Time: ${expires.toISOString()}`;
  }
  async signIn(opts) { const message = await this.message(opts); const signature = await this.acct.signMessage({ message }); return this.req('auth/verify', { method: 'POST', body: { message, signature } }); }
}

try {
  console.log('Sign-in');
  const a = new Client();
  ok((await a.req('me')).data.signedIn === false, 'not signed in at first');
  const s1 = await a.signIn();
  ok(s1.status === 200 && s1.data.wallet === a.acct.address.toLowerCase() && s1.data.hero === null, 'wallet signature accepted, no hero yet');
  ok(a.cookie.startsWith('lh_s='), 'session cookie set');
  { const c = new Client(); const message = await c.message(); const signature = await new Client().acct.signMessage({ message }); ok((await c.req('auth/verify', { method: 'POST', body: { message, signature } })).status === 401, 'signature from another wallet refused'); }
  { const c = new Client(); const nonce = (await c.req('auth/nonce')).data.nonce; await c.signIn({ nonce }); ok((await new Client().signIn({ nonce })).status === 400, 'a nonce can only be used once'); }
  ok((await new Client().signIn({ domain: 'evil.example' })).status === 400, 'message for another site refused');
  ok((await new Client().signIn({ chainId: 1 })).status === 400, 'message for another chain refused');
  ok((await new Client().signIn({ issued: new Date(Date.now() - 3600e3), expires: new Date(Date.now() - 1800e3) })).status === 400, 'expired message refused');
  ok((await new Client().signIn({ nonce: 'madeUpNonce1234567890' })).status === 400, 'made-up nonce refused');

  console.log('Request protection');
  ok((await a.req('hero', { method: 'POST', body: { name: 'Nope' }, headers: { 'X-LH': '' } })).status === 403, 'POST without the X-LH header refused');
  ok((await a.req('hero', { method: 'POST', body: { name: 'Nope' }, headers: { Origin: 'https://evil.example' } })).status === 403, 'POST from another origin refused');
  ok((await new Client().req('save', { method: 'POST', body: { data: {}, rev: 1 } })).status === 401, 'save without a session refused');

  console.log('Heroes and names');
  ok((await a.req('name?name=Lampwright')).data.ok === true, 'free name reported available');
  ok((await a.req('name?name=admin')).data.ok === false, 'reserved name refused');
  ok((await a.req('name?name=sh1thead')).data.ok === false, 'offensive name refused');
  const h1 = await a.req('hero', { method: 'POST', body: { name: 'Lampwright', look: { skin: 2, hair: 99, cloth: 1, style: 1 } } });
  ok(h1.status === 201 && h1.data.hero.name === 'Lampwright' && h1.data.save.rev === 1, 'hero created with a fresh save');
  ok(h1.data.hero.look.hair === 0, 'invalid look values cleaned');
  ok((await a.req('hero', { method: 'POST', body: { name: 'Second' } })).status === 409, 'one hero per wallet');
  const b = new Client(); await b.signIn();
  ok((await b.req('hero', { method: 'POST', body: { name: 'LAMPWRIGHT' } })).data.error === 'name_taken', 'name taken by someone else (any capitalisation)');
  ok((await a.req('name?name=lampwright')).data.ok === false, 'taken name reported taken');

  console.log('Saves');
  let me = (await a.req('me')).data, rev = me.save.rev, data = me.save.data;
  ok((await a.req('save', { method: 'POST', body: { data, rev } })).status === 429, 'saving twice within 2 s throttled');
  await sleep(2100);
  data.gold += 120; data.bank.copper_ore = 9; data.skills.fishing = 40; data.caught = 4; data.xp = 30;
  let r = await a.req('save', { method: 'POST', body: { data, rev } });
  ok(r.status === 200 && r.data.rev === rev + 1, 'normal progress saved');
  ok((await a.req('save', { method: 'POST', body: { data, rev } })).status === 409, 'stale save from another device refused');
  me = (await a.req('me')).data;
  ok(me.save.data.gold === 160 && me.save.data.bank.copper_ore === 9 && me.save.data.skills.fishing === 40, 'progress loads back exactly (second device)');
  await sleep(2100);
  const cheat = JSON.parse(JSON.stringify(me.save.data)); cheat.gold = 9_999_999;
  r = await a.req('save', { method: 'POST', body: { data: cheat, rev: me.save.rev } });
  ok(r.status === 422 && r.data.save.data.gold === 160, 'impossible gold jump refused, server copy returned');
  const flags = await (await fetch(BASE + '/__dev/flags')).json();
  ok(flags.length === 1 && /wealth/.test(flags[0].reason), 'refused save logged for review');
  ok((await a.req('save', { method: 'POST', body: { data: cheat, rev: me.save.rev } })).status === 429, 'refused saves are rate-limited too (no log flooding)');
  await sleep(2100);
  const hat = JSON.parse(JSON.stringify(me.save.data)); hat.gear.helm = 'partyhat'; hat.bank.partyhat_helm = 1; hat.bank.cape_mother = 1; hat.bank.cape_knight = 1; hat.bank.wisp_lantern = 1; hat.bank.relic_sigil = 1;
  r = await a.req('save', { method: 'POST', body: { data: hat, rev: me.save.rev } });
  ok(r.status === 422 && /rare/.test(r.data.reason), 'five legendary items at once refused');
  await sleep(2100);
  const hat2 = JSON.parse(JSON.stringify(me.save.data)); hat2.gear.helm = 'partyhat'; hat2.bank.partyhat_helm = 1;
  r = await a.req('save', { method: 'POST', body: { data: hat2, rev: me.save.rev } });
  me = (await a.req('me')).data;
  ok(r.status === 200 && me.save.data.gear.helm === null && !me.save.data.bank.partyhat_helm, 'Blue Party Hat stripped from a non-admin save');

  console.log('Admin');
  const t = new Client(); await t.signIn(); await t.req('hero', { method: 'POST', body: { name: 'Test' } });
  await fetch(BASE + '/__dev/admin?name=test');
  let tm = (await t.req('me')).data;
  ok(tm.hero.admin === true && tm.save.data.gear.helm === 'partyhat', 'admin hero gets the Blue Party Hat from the server');
  await sleep(2100);
  const rich = JSON.parse(JSON.stringify(tm.save.data)); rich.gold = 9_999_999;
  ok((await t.req('save', { method: 'POST', body: { data: rich, rev: tm.save.rev } })).status === 200, 'admin saves skip the plausibility check');

  console.log('Chat');
  { const x = new Client(); await x.signIn(); await x.req('hero', { method: 'POST', body: { name: 'Chatty' } });
    const y = new Client(); await y.signIn(); await y.req('hero', { method: 'POST', body: { name: 'Listener' } });
    let r = await x.req('chat', { method: 'POST', body: { ch: 'hold', text: '  hello   <b>world</b>  ' } });
    ok(r.status === 200 && r.data.name === 'Chatty' && r.data.text === 'hello bworld/b', 'message posted, cleaned, signed with the hero name');
    ok((await x.req('chat', { method: 'POST', body: { ch: 'hold', text: 'again' } })).status === 429, 'chat slow-mode (1.2 s)');
    await sleep(1300);
    r = await x.req('chat', { method: 'POST', body: { ch: 'hold', text: 'grapes are not a shitty snack' } });
    ok(r.data.text === 'grapes are not a s***** snack', 'offensive words masked, harmless words untouched');
    await x.req('chat', { method: 'POST', body: { ch: 'f3', text: 'deep down' } }).catch(() => {});
    await sleep(1300); await x.req('chat', { method: 'POST', body: { ch: 'f3', text: 'floor three' } });
    let l = await y.req('chat?ch=hold&after=0');
    ok(l.status === 200 && l.data.messages.length === 2 && l.data.messages.every(m => m.me === false && m.name === 'Chatty'), 'players in the Hold see Hold messages only');
    const last = l.data.messages[1].id;
    ok((await y.req('chat?ch=hold&after=' + last)).data.messages.length === 0, 'polling with after= returns only new messages');
    ok((await x.req('chat?ch=hold&after=0')).data.messages.every(m => m.me === true), 'your own messages are marked as yours');
    ok((await y.req('chat?ch=f3&after=0')).data.messages.length >= 1, 'floor channels are separate');
    ok((await y.req('chat?ch=lobby&after=0')).status === 400 && (await y.req('chat', { method: 'POST', body: { ch: 'f99', text: 'x' } })).status === 400, 'unknown channels refused');
    ok((await new Client().req('chat?ch=hold')).status === 401, 'chat needs a signed-in player');
    await fetch(BASE + '/__dev/ban?name=chatty'); await sleep(1300);
    ok((await x.req('chat', { method: 'POST', body: { ch: 'hold', text: 'hi' } })).status === 403, 'banned players cannot chat'); }

  console.log('Bans');
  const c = new Client(); await c.signIn(); await c.req('hero', { method: 'POST', body: { name: 'Banme' } });
  const cm = (await c.req('me')).data; await sleep(2100);
  await fetch(BASE + '/__dev/ban?name=banme');
  ok((await c.req('save', { method: 'POST', body: { data: cm.save.data, rev: cm.save.rev } })).status === 403, 'banned account cannot save');
  ok((await c.req('me')).data.signedIn !== true && !(await c.req('me')).data.hero, 'banned account gets no hero data');

  console.log('Settings');
  { const st = new Client(); await st.signIn(); await st.req('hero', { method: 'POST', body: { name: 'Setter' } });
    let sm = (await st.req('me')).data; await sleep(2100);
    const d = sm.save.data; d.settings = { zoom: 9, bright: 999, names: false, feed: 1, evil: '<script>' };
    await st.req('save', { method: 'POST', body: { data: d, rev: sm.save.rev } });
    const st2 = new Client(); st2.acct = st.acct; await st2.signIn(); sm = (await st2.req('me')).data;
    ok(JSON.stringify(sm.save.data.settings) === JSON.stringify({ zoom: 4, bright: 160, shake: true, names: false, feed: true, vib: true, sound: true }), 'settings saved with the hero, cleaned, and loaded on another device'); }

  console.log('Sign out');
  await a.req('auth/logout', { method: 'POST' });
  ok((await a.req('me')).data.signedIn === false, 'signed out');
  const a2 = new Client(); a2.acct = a.acct; await a2.signIn();
  me = (await a2.req('me')).data;
  ok(me.hero.name === 'Lampwright' && me.save.data.gold === 160, 'signing in again (new device) loads the same hero and progress');
} catch (e) { failN++; console.error(e); }
srv.kill();
console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
