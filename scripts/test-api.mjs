// API tests against the local dev server (in-memory database) with real wallet signatures.
//   npm run build && npm test
import { spawn } from 'node:child_process';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import http from 'node:http';
import { createHash } from 'node:crypto';

// A stand-in for X's OAuth server: checks the client credentials and the PKCE verifier like the real one.
const XPORT = 4005, xSeen = { challenge: null, revoked: 0 };
const xMock = http.createServer(async (req, res) => {
  let body = ''; for await (const c of req) body += c;
  const f = new URLSearchParams(body), j = (st, o) => { res.writeHead(st, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };
  if (req.url === '/2/oauth2/token') {
    if (req.headers.authorization !== 'Basic ' + Buffer.from('test-client:test-secret').toString('base64')) return j(401, { error: 'unauthorized_client' });
    const ok = createHash('sha256').update(f.get('code_verifier') || '').digest('base64url') === xSeen.challenge;
    if (!ok || !/^good/.test(f.get('code'))) return j(400, { error: 'invalid_grant' });
    return j(200, { access_token: 'tok-' + f.get('code'), token_type: 'bearer' });
  }
  if (req.url === '/2/users/me') return /^Bearer tok-good/.test(req.headers.authorization || '') ? j(200, { data: { id: '4242', name: 'Lantern Fan', username: 'lanternfan' } }) : j(401, {});
  if (req.url === '/2/oauth2/revoke') { xSeen.revoked++; return j(200, { revoked: true }); }
  j(404, {});
}).listen(XPORT);

// A stand-in for Google's sign-in: checks the client secret and PKCE, returns an ID token for the "user" named by the code.
const GPORT = 4007, gSeen = { challenge: null };
const gMock = http.createServer(async (req, res) => {
  let body = ''; for await (const c of req) body += c;
  const f = new URLSearchParams(body), j = (st, o) => { res.writeHead(st, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(o)); };
  if (req.url === '/token') {
    if (f.get('client_secret') !== 'g-secret' || f.get('client_id') !== 'g-client') return j(401, { error: 'invalid_client' });
    if (createHash('sha256').update(f.get('code_verifier') || '').digest('base64url') !== gSeen.challenge) return j(400, { error: 'invalid_grant' });
    const who = f.get('code'), aud = who === 'wrongaud' ? 'someone-else' : 'g-client';
    const claims = { iss: 'https://accounts.google.com', aud, sub: '1000' + (who.match(/\d+/) || ['1'])[0].padStart(5, '0'), email: who + '@gmail.com', email_verified: true, exp: Math.floor(Date.now() / 1000) + 3600 };
    return j(200, { id_token: 'x.' + Buffer.from(JSON.stringify(claims)).toString('base64url') + '.sig', access_token: 'a' });
  }
  j(404, {});
}).listen(GPORT);

const PORT = 3999, BASE = `http://localhost:${PORT}`;
// TEST_SUPABASE_URL + TEST_SUPABASE_KEY run the same tests against a real Supabase/PostgREST database instead of memory.
const PG = process.env.TEST_SUPABASE_URL ? { SUPABASE_URL: process.env.TEST_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: process.env.TEST_SUPABASE_KEY, LH_DEV_HOOKS: '1', LH_MEMORY_DB: '' } : { LH_MEMORY_DB: '1', SUPABASE_URL: '' };
const XENV = { GOOGLE_CLIENT_ID: 'g-client', GOOGLE_CLIENT_SECRET: 'g-secret', GOOGLE_AUTH_URL: `http://localhost:${GPORT}/auth`, GOOGLE_TOKEN_URL: `http://localhost:${GPORT}/token`, RT_URL: 'https://rt.example.workers.dev', RT_SECRET: 'r'.repeat(40), X_CLIENT_ID: 'test-client', X_CLIENT_SECRET: 'test-secret', X_API_BASE: `http://localhost:${XPORT}`, X_AUTH_URL: `http://localhost:${XPORT}/authorize`, TOKEN_CA: '0x52908400098527886e0f7030069857d2e4169ee7', TOKEN_SYMBOL: '$lant', REWARDS_ON: '1' };
const srv = spawn(process.execPath, ['scripts/dev-server.mjs'], { env: { ...process.env, PORT: String(PORT), LH_OFFLINE: '1', ...XENV, ...PG }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, failN = 0;
const ok = (cond, name) => { if (cond) { pass++; console.log('  ✓', name); } else { failN++; console.log('  ✗', name); } };

const STATEMENT = 'Sign in to Lanternhold. This free signature only proves you own this wallet. It is not a transaction, costs no gas, and gives no access to your funds.';
class Client {
  constructor(key) { this.acct = privateKeyToAccount(key || generatePrivateKey()); this.jar = new Map(); }
  get cookie() { return [...this.jar].map(([k, v]) => k + '=' + v).join('; '); }
  set cookie(v) { this.jar.clear(); if (v) for (const p of v.split(';')) { const i = p.indexOf('='); if (i > 0) this.jar.set(p.slice(0, i).trim(), p.slice(i + 1).trim()); } }
  async req(path, { method = 'GET', body, headers = {}, manual } = {}) {
    const r = await fetch(BASE + '/api/' + path, { redirect: manual ? 'manual' : 'follow', method, headers: { 'X-LH': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(this.jar.size ? { cookie: this.cookie } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
    for (const sc of r.headers.getSetCookie ? r.headers.getSetCookie() : []) { const [kv, ...attrs] = sc.split(';'); const i = kv.indexOf('='), k = kv.slice(0, i).trim(), v = kv.slice(i + 1).trim(); if (!v || /max-age=0/i.test(attrs.join(';'))) this.jar.delete(k); else this.jar.set(k, v); }
    let data = {}; try { data = await r.json(); } catch { }
    return { status: r.status, data, location: r.headers.get('location') };
  }
  // the server writes the message; tests can tamper with any part of it to check it gets refused
  async message({ nonce, domain, chainId, issued, expires, address, statement, extra } = {}) {
    const n = (await this.req('auth/nonce?address=' + this.acct.address.toLowerCase())).data;
    if (!nonce && !domain && !chainId && !issued && !address && !statement && !extra) return n.message;
    nonce ||= n.nonce; domain ||= `localhost:${PORT}`; chainId ||= 4663; issued ||= new Date(); expires ||= new Date(issued.getTime() + 300e3);
    return `${domain} wants you to sign in with your Ethereum account:\n${address || n.address}\n\n${statement || STATEMENT}\n\nURI: http://${domain}\nVersion: 1\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issued.toISOString()}\nExpiration Time: ${expires.toISOString()}${extra || ''}`;
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
  { const c = new Client(); const message = await c.message(); const signature = await c.acct.signMessage({ message });
    ok((await c.req('auth/verify', { method: 'POST', body: { message, signature } })).status === 200, 'server-written message signs in');
    ok((await c.req('auth/verify', { method: 'POST', body: { message, signature } })).status === 400, 'the same signed message can’t be used twice'); }
  { const c = new Client(), thief = new Client(); thief.acct = c.acct; const message = await c.message(); const signature = await c.acct.signMessage({ message });
    ok((await thief.req('auth/verify', { method: 'POST', body: { message, signature } })).status === 400, 'a signed message only works in the browser that asked for it'); }
  ok((await new Client().signIn({ statement: 'Sign in to Lanternhold and approve all tokens.' })).status === 400, 'reworded message refused');
  ok((await new Client().signIn({ extra: '\nResources:\n- https://evil.example' })).status === 400, 'extra lines in the message refused');
  { const c = new Client(); ok((await c.signIn({ address: c.acct.address.toLowerCase() })).status === 400, 'address must be checksummed (EIP-55)'); }
  ok((await new Client().signIn({ issued: new Date(Date.now() - 6 * 60e3), expires: new Date(Date.now() + 60e3) })).status === 400, 'message older than 5 minutes refused');
  { const r = await new Client().req('auth/nonce?address=nope'); ok(r.status === 400, 'nonce needs a real address'); }
  { const r = await new Client().req('auth/nonce?address=' + privateKeyToAccount(generatePrivateKey()).address.toLowerCase()); ok(r.status === 200 && /^localhost:\d+ wants you to sign in/.test(r.data.message) && /Chain ID: 4663/.test(r.data.message) && r.data.statement === STATEMENT, 'server writes a standard sign-in message for this site'); }
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

  await sleep(2100);
  { const g = JSON.parse(JSON.stringify(me.save.data)); g.goals = { fish: 1, konami: 1, 'bad key!': 1 }; g.cnt = { logs: 12, burnt: 2, x: -5 }; g.skills.woodcutting = 40; g.bank.logs = 12;
    r = await a.req('save', { method: 'POST', body: { data: g, rev: me.save.rev } }); me = (await a.req('me')).data;
    ok(r.status === 200 && me.save.data.goals.fish && me.save.data.goals.konami && !me.save.data.goals['bad key!'] && me.save.data.cnt.logs === 12 && me.save.data.skills.woodcutting === 40 && me.save.data.bank.logs === 12, 'goals, counters, Woodcutting and logs save and load'); }
  await sleep(2100);
  { const g = JSON.parse(JSON.stringify(me.save.data)); g.bank.cape_wayfinder = 1; r = await a.req('save', { method: 'POST', body: { data: g, rev: me.save.rev } }); me = (await a.req('me')).data;
    ok(r.status === 200 && me.save.data.bank.cape_wayfinder === 1, 'a Goal Relic (one item) saves like any rare find'); }

  console.log('Admin');
  const t = new Client(), t0 = t; await t.signIn(); await t.req('hero', { method: 'POST', body: { name: 'Test' } });
  await fetch(BASE + '/__dev/admin?name=test');
  let tm = (await t.req('me')).data;
  ok(tm.hero.admin === true && tm.save.data.gear.helm === 'partyhat', 'admin hero gets the Blue Party Hat from the server');
  await sleep(2100);
  const rich = JSON.parse(JSON.stringify(tm.save.data)); rich.gold = 9_999_999;
  ok((await t.req('save', { method: 'POST', body: { data: rich, rev: tm.save.rev } })).status === 200, 'admin saves skip the plausibility check');
  ok(tm.hero.hat === 'partyhat', 'admin hat defaults to blue');
  const k = new Client(); await k.signIn(); await k.req('hero', { method: 'POST', body: { name: 'Kush' } });
  await fetch(BASE + '/__dev/admin?name=kush&hat=greenhat');
  let km = (await k.req('me')).data;
  ok(km.hero.admin === true && km.hero.hat === 'greenhat' && km.save.data.gear.helm === 'greenhat', 'second admin gets the Green Party Hat');
  await sleep(2100);
  const swap = JSON.parse(JSON.stringify(km.save.data)); swap.gear.helm = 'partyhat'; swap.bank.partyhat_helm = 1;
  await k.req('save', { method: 'POST', body: { data: swap, rev: km.save.rev } });
  km = (await k.req('me')).data;
  ok(km.save.data.gear.helm === 'greenhat' && !km.save.data.bank.partyhat_helm, 'green-hat admin cannot take the Blue Party Hat');
  await sleep(2100);
  const g2 = JSON.parse(JSON.stringify(me.save.data)); g2.gear.helm = 'greenhat'; g2.bank.greenhat_helm = 1;
  r = await a.req('save', { method: 'POST', body: { data: g2, rev: me.save.rev } });
  me = (await a.req('me')).data;
  ok(me.save.data.gear.helm === null && !me.save.data.bank.greenhat_helm, 'Green Party Hat stripped from a non-admin save');

  console.log('X account linking');
  { const x = new Client(); await x.signIn(); await x.req('hero', { method: 'POST', body: { name: 'Xer' } });
    let r = await x.req('x/start', { manual: true });
    const loc = new URL(r.location || 'http://none'); xSeen.challenge = loc.searchParams.get('code_challenge');
    ok(r.status === 302 && loc.pathname === '/authorize' && loc.searchParams.get('code_challenge_method') === 'S256' && loc.searchParams.get('redirect_uri') === `http://localhost:${PORT}/api/x/callback` && /users\.read/.test(loc.searchParams.get('scope')), 'start sends the player to X with PKCE and the right callback');
    const state = loc.searchParams.get('state');
    ok((await new Client().req('x/start', { manual: true })).status === 401, 'linking needs a signed-in player');
    r = await new Client().req('x/callback?state=' + 'z'.repeat(32) + '&code=good', { manual: true });
    ok(r.location === '/?x=expired', 'a made-up state is refused');
    // the callback works without the game's cookie (X may open in another browser or the X app)
    r = await new Client().req(`x/callback?state=${state}&code=good-1`, { manual: true });
    ok(r.location === '/?x=linked&u=lanternfan' && xSeen.revoked === 1, 'approved on X: hero linked, X token revoked straight away');
    ok((await x.req('me')).data.hero.x === 'lanternfan', 'the hero shows the linked @username');
    ok((await new Client().req(`x/callback?state=${state}&code=good-1`, { manual: true })).location === '/?x=expired', 'each approval can only be used once');
    const y = new Client(); await y.signIn(); await y.req('hero', { method: 'POST', body: { name: 'Yer' } });
    r = await y.req('x/start', { manual: true }); const l2 = new URL(r.location); xSeen.challenge = l2.searchParams.get('code_challenge');
    r = await y.req(`x/callback?state=${l2.searchParams.get('state')}&code=good-2`, { manual: true });
    ok(r.location === '/?x=taken&u=lanternfan' && !(await y.req('me')).data.hero.x, 'one X account can only be linked to one hero');
    r = await y.req('x/start', { manual: true }); const l3 = new URL(r.location); xSeen.challenge = 'not-the-right-challenge';
    ok((await y.req(`x/callback?state=${l3.searchParams.get('state')}&code=good-3`, { manual: true })).location === '/?x=error', 'wrong PKCE verifier is refused by X');
    r = await y.req('x/start', { manual: true }); const l4 = new URL(r.location);
    ok((await y.req(`x/callback?state=${l4.searchParams.get('state')}&error=access_denied`, { manual: true })).location === '/?x=declined', 'declining on X is handled');
    ok((await x.req('x/unlink', { method: 'POST' })).status === 200 && !(await x.req('me')).data.hero.x, 'unlink removes it'); }

  console.log('Token rewards');
  { const p = new Client(); await p.signIn(); await p.req('hero', { method: 'POST', body: { name: 'Earner' } });
    let me = (await p.req('me')).data;
    ok(me.tok && me.tok.balance === 0 && me.tok.cap === 1250 && me.tok.pool === 50e6, 'a new hero starts with 0, a daily share of 1,250 and the 50M pool');
    await sleep(2100);
    const g = JSON.parse(JSON.stringify(me.save.data)); g.cnt.bossmother = 1; g.bosses = { mother: true };
    let r = await p.req('save', { method: 'POST', body: { data: g, rev: me.save.rev } });
    ok(r.status === 200 && r.data.tok && r.data.tok.got >= 100 && r.data.tok.got <= 150 && r.data.tok.from.includes('mother'), `beating Mother Slime pays 100–150 on day 1 (got ${r.data.tok && r.data.tok.got})`);
    await sleep(2100);
    const g2 = JSON.parse(JSON.stringify(g)); g2.cnt.bossmother = 40;
    r = await p.req('save', { method: 'POST', body: { data: g2, rev: r.data.rev } });
    ok(r.status === 200 && (!r.data.tok || r.data.tok.got <= 150), 'claiming 39 boss kills in 2 seconds only counts one');
    const t = await p.req('rewards'); ok(t.status === 200 && t.data.on && t.data.claims === null && t.data.tok.balance > 0, 'the rewards panel shows the balance (claims not open yet)');
    ok((await p.req('rewards', { method: 'POST', body: { action: 'voucher' } })).data.error === 'claims_off', 'no vouchers until the vault is set up');
    const am = (await t0.req('me')).data; await sleep(2100);
    const ag = JSON.parse(JSON.stringify(am.save.data)); ag.cnt.bossmother = (ag.cnt.bossmother || 0) + 1;
    r = await t0.req('save', { method: 'POST', body: { data: ag, rev: am.save.rev } });
    ok(r.status === 200 && !r.data.tok, 'admins don’t earn from the pool'); }

  console.log('Trading');
  { const { SignJWT } = await import('jose');
    const tk = (payload, exp = '1m', secret = 'r'.repeat(40)) => new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuer('lanternhold-trade').setExpirationTime(exp).sign(new TextEncoder().encode(secret));
    const x = new Client(), y = new Client(); await x.signIn(); await y.signIn();
    await x.req('hero', { method: 'POST', body: { name: 'Trader' } }); await y.req('hero', { method: 'POST', body: { name: 'Buyer' } });
    const side = (id, name, i, g) => ({ id, name, i, g });
    let r = await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't1', a: side('trader', 'Trader', { wheat_seed: 5 }, 10), b: side('buyer', 'Buyer', { bread: 1 }, 0) }) } });
    const xs = (await x.req('me')).data.save, ys = (await y.req('me')).data.save;
    ok(r.status === 200 && xs.data.bank.wheat_seed === 15 && xs.data.bank.bread === 4 && xs.data.gold === 30 && ys.data.bank.wheat_seed === 25 && ys.data.bank.bread === 2 && ys.data.gold === 50 && r.data.revs.a === xs.rev && r.data.revs.b === ys.rev, 'a signed trade moves items and gold for both saves at once');
    ok((await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't1', a: side('trader', 'Trader', { wheat_seed: 1 }, 0), b: side('buyer', 'Buyer', {}, 0) }) } })).data.error === 'used', 'a trade can only go through once');
    ok((await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't2', a: side('trader', 'Trader', {}, 0), b: side('buyer', 'Buyer', { wheat_seed: 1 }, 0) }, '1m', 'x'.repeat(40)) } })).data.error === 'bad_ticket', 'a ticket not signed by the realtime server is refused');
    ok((await y.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't3', a: side('trader', 'Trader', {}, 0), b: side('buyer', 'Buyer', { wheat_seed: 9 }, 0) }) } })).data.error === 'not_yours', 'only the player who started it can send it');
    r = await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't4', a: side('trader', 'Trader', { wheat_seed: 500 }, 0), b: side('buyer', 'Buyer', {}, 0) }) } });
    ok(r.status === 409 && r.data.error === 'missing' && (await x.req('me')).data.save.data.bank.wheat_seed === 15, 'you can’t give what you don’t have (nothing changes)');
    r = await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't5', a: side('trader', 'Trader', {}, 0), b: side('buyer', 'Buyer', {}, 999) }) } });
    ok(r.status === 409 && r.data.error === 'missing', 'or take more gold than they have');
    r = await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't6', a: side('trader', 'Trader', { partyhat_helm: 1 }, 0), b: side('buyer', 'Buyer', {}, 0) }) } });
    ok(r.status === 409 && /can’t be traded/.test(r.data.msg), 'bound items and Goal Relics can’t be traded');
    ok((await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't7', a: side('trader', 'Trader', {}, 0), b: side('buyer', 'Buyer', {}, 0) }) } })).data.error === 'empty', 'an empty trade is refused');
    r = await x.req('trade', { method: 'POST', body: { ticket: await tk({ tid: 't8', a: side('trader', 'Trader', { wheat_seed: 1 }, 0), b: side('buyer', 'Buyer', {}, 0) }) } });
    ok(r.status === 200, 'a one-sided trade (a gift) goes through'); }

  console.log('Moderation');
  { const { jwtVerify } = await import('jose'); const vk = generatePrivateKey(), v = new Client(vk); await v.signIn(); await v.req('hero', { method: 'POST', body: { name: 'Villain' } });
    ok((await v.req('admin/mod?name=test')).status === 403, 'players can’t use the admin tools');
    let r = await t.req('admin/mod?name=villain');
    ok(r.status === 200 && r.data.muted === false && r.data.strikes === 0 && !r.data.ban, 'an admin can look a player up');
    ok((await t.req('admin/mod', { method: 'POST', body: { name: 'Kush', action: 'ban' } })).data.error === 'is_admin', 'admins can’t be moderated');
    ok((await t.req('admin/mod', { method: 'POST', body: { name: 'Test', action: 'mute' } })).data.error === 'self', 'or moderate themselves');
    const mu = async () => { const q = await v.req('rt-ticket'); return (await jwtVerify(q.data.ticket, new TextEncoder().encode('r'.repeat(40)), { issuer: 'lanternhold-rt' })).payload.mu; };
    r = await t.req('admin/mod', { method: 'POST', body: { name: 'Villain', action: 'mute' } });
    ok(r.status === 200 && r.data.muted === true && await mu() === 1, 'mute is stored and goes into their realtime pass');
    r = await t.req('admin/mod', { method: 'POST', body: { name: 'Villain', action: 'unmute' } });
    ok(r.data.muted === false && await mu() === 0, 'unmute lifts it');
    r = await t.req('admin/mod', { method: 'POST', body: { name: 'Villain', action: 'kick' } });
    ok(r.status === 200 && r.data.id === 'villain' && (await v.req('me')).data.hero, 'kick stores nothing (the player can sign straight back in)');
    r = await t.req('admin/mod', { method: 'POST', body: { name: 'Villain', action: 'ban' } });
    const hrs = r.data.ban && (Date.parse(r.data.ban.until) - Date.now()) / 3600e3;
    ok(r.status === 200 && r.data.strikes === 1 && hrs > 23.9 && hrs <= 24, 'first ban: 24 hours, strike 1');
    ok((await v.req('rt-ticket')).status === 403 && (await v.req('me')).data.signedIn === false, 'a banned player can’t reconnect and is signed out');
    const again = await new Client(vk).signIn();
    ok(again.status === 403 && again.data.error === 'banned' && again.data.until === r.data.ban.until, 'and can’t sign back in until it ends');
    ok((await t.req('admin/mod', { method: 'POST', body: { name: 'Villain', action: 'ban' } })).status === 409, 'no stacking a ban on a ban');
    const fresh = new Client(); ok((await fresh.signIn()).status === 200, 'a different wallet can still sign in (bans aren’t per IP)');
    const { nextBan } = await import('../lib/mod.js');
    const b2 = nextBan(1), b3 = nextBan(2);
    ok(Math.round((Date.parse(b2.until) - Date.now()) / 3600e3) === 72 && !b2.perm && b3.perm && b3.until === null && b3.strikes === 3, 'second ban 72 hours, third permanent'); }

  console.log('Google sign-in and linking');
  const google = async (c, who, q = '') => { const r = await c.req('auth/google/start' + q, { manual: true }); const u = new URL(r.location, BASE); if (u.pathname.startsWith('/?')) return r.location;
    gSeen.challenge = u.searchParams.get('code_challenge'); return (await c.req(`auth/google/callback?state=${u.searchParams.get('state')}&code=${who}`, { manual: true })).location; };
  ok((await new Client().req('config')).data.google === true, 'config says Google sign-in is on');
  { const t = (await new Client().req('config')).data.token; ok(t && t.ca === '0x52908400098527886E0F7030069857D2E4169EE7' && t.symbol === 'LANT', 'config gives the official contract address, checksummed'); }
  { const g = new Client();
    const r0 = await g.req('auth/google/start', { manual: true }), u0 = new URL(r0.location);
    ok(u0.searchParams.get('code_challenge_method') === 'S256' && u0.searchParams.get('redirect_uri') === `http://localhost:${PORT}/api/auth/google/callback` && /openid/.test(u0.searchParams.get('scope')), 'Google sign-in uses PKCE and the right redirect');
    ok(await google(g, 'player7') === '/?g=in' && g.cookie.startsWith('lh_s='), 'signing in with Google starts a session');
    let me = (await g.req('me')).data;
    ok(me.google === 'player7@gmail.com' && me.wallet === null && me.hero === null, 'new Google account: no wallet, no hero yet');
    ok((await g.req('hero', { method: 'POST', body: { name: 'Googler' } })).status === 201, 'Google players can create a hero');
    const g2 = new Client(); await google(g2, 'player7');
    ok((await g2.req('me')).data.hero.name === 'Googler', 'signing in with the same Google account loads the same hero');
    // connect a wallet in game
    const w = new Client();
    const linkMsg = async (c, wal = w) => { const message = (await c.req('auth/nonce?address=' + wal.acct.address.toLowerCase())).data.message; return { message, signature: await wal.acct.signMessage({ message }) }; };
    let r = await g.req('auth/link-wallet', { method: 'POST', body: await linkMsg(g) });
    ok(r.status === 200 && r.data.wallet === w.acct.address.toLowerCase(), 'a Google player can connect a wallet');
    const viaWallet = new Client(); viaWallet.acct = w.acct; await viaWallet.signIn();
    ok((await viaWallet.req('me')).data.hero.name === 'Googler', 'that wallet now signs in to the same hero');
    r = await g.req('auth/link-wallet', { method: 'POST', body: await linkMsg(g) });
    ok(r.status === 409, 'an account can only have one wallet');
    const other = new Client(); await google(other, 'player8');
    const theirs = new Client(); await theirs.signIn(); await theirs.req('hero', { method: 'POST', body: { name: 'Walleteer' } });
    r = await other.req('auth/link-wallet', { method: 'POST', body: await linkMsg(other, theirs) });
    ok(r.status === 409 && r.data.error === 'wallet_in_use', 'a wallet that already has its own hero can’t be linked to another account');
    // wallet player links Google
    ok(await google(theirs, 'player9', '?link=1') === '/?g=linked' && (await theirs.req('me')).data.google === 'player9@gmail.com', 'a wallet player can link Google');
    const viaGoogle = new Client(); await google(viaGoogle, 'player9');
    ok((await viaGoogle.req('me')).data.hero.name === 'Walleteer', 'then Google signs in to the same hero');
    ok(await google(theirs, 'player11', '?link=1') === '/?g=has', 'an account can only link one Google account');
    const fresh = new Client(); await fresh.signIn();
    ok(await google(fresh, 'player7', '?link=1') === '/?g=taken', 'a Google account already in use can’t be linked again');
    ok(await google(new Client(), 'wrongaud') === '/?g=error', 'an ID token meant for another app is refused');
    ok((await new Client().req('auth/google/callback?state=' + 'q'.repeat(30) + '&code=player7', { manual: true })).location === '/?g=expired', 'made-up state refused'); }

  console.log('Friends');
  { const a = new Client(); await a.signIn(); await a.req('hero', { method: 'POST', body: { name: 'Frienda' } });
    const b = new Client(); await b.signIn(); await b.req('hero', { method: 'POST', body: { name: 'Friendb' } });
    let r = await a.req('friends', { method: 'POST', body: { action: 'add', name: 'friendb' } });
    ok(r.status === 200 && r.data.state === 'requested' && r.data.list.outgoing[0] === 'Friendb', 'friend request sent (any capitalisation)');
    ok((await b.req('friends')).data.incoming[0] === 'Frienda', 'the other player sees the request');
    r = await b.req('friends', { method: 'POST', body: { action: 'accept', name: 'Frienda' } });
    ok(r.data.state === 'friends' && r.data.list.friends[0].name === 'Frienda' && (await a.req('friends')).data.friends[0].name === 'Friendb', 'accepted: both are friends');
    ok((await a.req('friends', { method: 'POST', body: { action: 'add', name: 'Frienda' } })).data.error === 'self', 'can’t friend yourself');
    ok((await a.req('friends', { method: 'POST', body: { action: 'add', name: 'Nobodyhere' } })).status === 404, 'unknown name refused');
    r = await a.req('friends', { method: 'POST', body: { action: 'remove', name: 'Friendb' } });
    ok(r.data.list.friends.length === 0 && (await b.req('friends')).data.friends.length === 0, 'removing a friend removes it for both');
    const c = new Client(); await c.signIn(); await c.req('hero', { method: 'POST', body: { name: 'Friendc' } });
    await c.req('friends', { method: 'POST', body: { action: 'add', name: 'Frienda' } });
    r = await a.req('friends', { method: 'POST', body: { action: 'add', name: 'Friendc' } });
    ok(r.data.state === 'friends', 'adding someone who already asked you makes you friends straight away');
    ok((await new Client().req('friends')).status === 401, 'friends need a signed-in player'); }

  console.log('Realtime ticket');
  { const { jwtVerify } = await import('jose');
    const t = new Client(); await t.signIn();
    ok((await t.req('rt-ticket')).status === 404, 'no ticket before you have a hero');
    await t.req('hero', { method: 'POST', body: { name: 'Ticketed' } });
    const r = await t.req('rt-ticket'); const { payload } = await jwtVerify(r.data.ticket, new TextEncoder().encode('r'.repeat(40)), { issuer: 'lanternhold-rt' });
    ok(r.data.url === 'wss://rt.example.workers.dev' && payload.sub === 'ticketed' && payload.n === 'Ticketed' && payload.exp - payload.iat <= 120, 'ticket names the hero, expires in 2 minutes, signed with RT_SECRET'); }

  console.log('Bans');
  const c = new Client(); await c.signIn(); await c.req('hero', { method: 'POST', body: { name: 'Banme' } });
  const cm = (await c.req('me')).data; await sleep(2100);
  await fetch(BASE + '/__dev/ban?name=banme');
  ok((await c.req('save', { method: 'POST', body: { data: cm.save.data, rev: cm.save.rev } })).status === 403, 'banned account cannot save');
  ok((await c.req('me')).data.signedIn !== true && !(await c.req('me')).data.hero, 'banned account gets no hero data');

  console.log('Settings');
  { const st = new Client(); await st.signIn(); await st.req('hero', { method: 'POST', body: { name: 'Setter' } });
    let sm = (await st.req('me')).data; await sleep(2100);
    const d = sm.save.data; d.settings = { zoom: 9, bright: 999, pnames: 1, feed: 1, evil: '<script>' };
    await st.req('save', { method: 'POST', body: { data: d, rev: sm.save.rev } });
    const st2 = new Client(); st2.acct = st.acct; await st2.signIn(); sm = (await st2.req('me')).data;
    ok(JSON.stringify(sm.save.data.settings) === JSON.stringify({ zoom: 4, bright: 160, shake: true, pnames: true, feed: true, vib: true, sound: true }), 'settings saved with the hero, cleaned, and loaded on another device'); }

  console.log('Sign out');
  await a.req('auth/logout', { method: 'POST' });
  ok((await a.req('me')).data.signedIn === false, 'signed out');
  const a2 = new Client(); a2.acct = a.acct; await a2.signIn();
  me = (await a2.req('me')).data;
  ok(me.hero.name === 'Lampwright' && me.save.data.gold === 160, 'signing in again (new device) loads the same hero and progress');
} catch (e) { failN++; console.error(e); }
srv.kill(); xMock.close(); gMock.close();
console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
