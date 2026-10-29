// Cosmetic NFT tests: a local chain (ganache) with the real LanternCosmetics contract, and the dev server (in-memory
// database) using it. Run: node contracts/test/compile.cjs, then node scripts/test-cosnft.mjs (needs ganache, see
// contracts/test/compile.cjs).
import ganache from 'ganache';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createWalletClient, createPublicClient, http } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';

const C = JSON.parse(readFileSync(new URL('../contracts/LanternCosmetics.json', import.meta.url)));
let pass = 0, failN = 0; const ok = (c, n) => { (c ? pass++ : failN++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const keys = Array.from({ length: 5 }, () => generatePrivateKey());
const chainSrv = ganache.server({ logging: { quiet: true }, chain: { chainId: 4663 }, wallet: { accounts: keys.map(k => ({ secretKey: k, balance: '0x' + (10n ** 21n).toString(16) })) } });
await chainSrv.listen(8547);
const chain = { id: 4663, name: 'test', nativeCurrency: { name: 'E', symbol: 'E', decimals: 18 }, rpcUrls: { default: { http: ['http://127.0.0.1:8547'] } } };
const pub = createPublicClient({ chain, transport: http() });
const [owner, signer, alice, bob] = keys.map(k => privateKeyToAccount(k)), w = a => createWalletClient({ account: a, chain, transport: http() });
const h = await w(owner).deployContract({ abi: C.abi, bytecode: C.bytecode, args: [signer.address, 'http://localhost/api/cosmetics?id=', 'http://localhost/api/cosmetics?contract=1'] });
const nft = (await pub.waitForTransactionReceipt({ hash: h })).contractAddress;
const rd = (fn, args = []) => pub.readContract({ address: nft, abi: C.abi, functionName: fn, args });
const sendTx = async (a, v) => { try { const x = await w(a).sendTransaction({ to: v.to, data: v.data, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success' ? x : null; } catch { return null; } };
const call = async (a, fn, args) => { try { const x = await w(a).writeContract({ address: nft, abi: C.abi, functionName: fn, args, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };

const PORT = 3988, BASE = `http://localhost:${PORT}`;
const srv = spawn(process.execPath, ['scripts/dev-server.mjs'], { env: { ...process.env, PORT: String(PORT), LH_OFFLINE: '1', LH_MEMORY_DB: '1', SUPABASE_URL: '', RT_URL: '', COSMETICS_CONTRACT: nft, COSMETICS_NFT: '1', FOUNDERS_SIGNER_KEY: keys[1], RPC_URL: 'http://127.0.0.1:8547', CHAIN_ID: '4663', COSMETICS_VOUCHER_MS: '4000', COSMETICS_CANCEL_GRACE_MS: '0' }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
class Client {
  constructor(acct) { this.acct = acct; this.jar = new Map(); }
  async req(path, { method = 'GET', body } = {}) {
    const r = await fetch(BASE + '/api/' + path, { method, headers: { 'X-LH': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(this.jar.size ? { cookie: [...this.jar].map(([k, v]) => k + '=' + v).join('; ') } : {}) }, body: body ? JSON.stringify(body) : undefined });
    for (const sc of r.headers.getSetCookie ? r.headers.getSetCookie() : []) { const [kv] = sc.split(';'); const i = kv.indexOf('='); this.jar.set(kv.slice(0, i).trim(), kv.slice(i + 1).trim()); }
    let data = {}; try { data = await r.json(); } catch { } return { status: r.status, data };
  }
  async signIn() { const n = (await this.req('auth/nonce?address=' + this.acct.address.toLowerCase())).data; return this.req('auth/verify', { method: 'POST', body: { message: n.message, signature: await this.acct.signMessage({ message: n.message }) } }); }
  async save(f) { await sleep(2100); const me = (await this.req('me')).data, d = me.save.data; f(d); return this.req('save', { method: 'POST', body: { data: d, rev: me.save.rev } }); }
}
try {
  const A = new Client(alice), B = new Client(bob);
  await A.signIn(); await A.req('hero', { method: 'POST', body: { name: 'Pumpkin' } });
  await B.signIn(); await B.req('hero', { method: 'POST', body: { name: 'Buyer' } });
  console.log('Earning');
  let r = await A.save(d => { d.quests = { hallow: { s: 6, n: 0, done: true } }; d.cos = { own: ['jack_lantern', 'reaper_scythe'], head: 'jack_lantern', weapon: 'reaper_scythe' }; });
  let me = (await A.req('me')).data;
  ok(r.status === 200 && me.save.data.cos.own.length === 2 && me.save.data.cos.head === 'jack_lantern', 'All Hallows’ Lantern done: both cosmetics on the hero');
  ok((await B.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'jack_lantern' } })).status === 409, 'a hero who never earned it can’t mint it');
  r = await A.req('cosmetics'); ok(r.data.on && r.data.contract.toLowerCase() === nft.toLowerCase() && JSON.stringify(r.data.held) === '{}' && !r.data.mints.length, 'the Cosmetics tab: minting is on, nothing held yet');

  console.log('Minting');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'jack_lantern' } });
  const v = r.data.voucher;
  ok(r.status === 200 && v && v.data.startsWith('0x704e92d0') && v.to.toLowerCase() === nft.toLowerCase() && v.cos === 'jack_lantern', 'mint starts: a voucher for the wallet (the selector the game checks)');
  me = (await A.req('me')).data;
  ok(!me.save.data.cos.own.includes('jack_lantern') && me.save.data.cos.out.includes('jack_lantern') && me.save.data.cos.head === null && me.save.data.cos.own.includes('reaper_scythe'), 'the Jack-o’-Lantern has left the hero at once (the Scythe stays)');
  ok((await A.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'jack_lantern' } })).status === 409, 'it can’t be minted twice');
  r = await A.save(d => { d.cos.own.push('jack_lantern'); d.cos.out = []; d.cos.head = 'jack_lantern'; });
  me = (await A.req('me')).data;
  ok(!me.save.data.cos.own.includes('jack_lantern') && me.save.data.cos.head === null, 'a save can’t bring it back (not even by finishing the quest again)');
  ok(!(await sendTx(bob, v)), 'someone else can’t use the voucher');
  const tx = await sendTx(alice, v);
  ok(!!tx && await rd('balanceOf', [alice.address, 1n]) === 1n && await rd('totalSupply', [1n]) === 1n, 'Alice’s wallet mints Jack-o’-Lantern #1 (token ID 1)');
  ok(!(await sendTx(alice, v)), 'the voucher only works once');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'sync', tx } });
  ok(r.data.held.jack_lantern === 1 && r.data.mints[0].status === 'done', 'synced: done, and her wallet holds it');
  r = await A.save(d => { d.cos.head = 'jack_lantern'; });
  me = (await A.req('me')).data;
  ok(r.status === 200 && me.save.data.cos.head === 'jack_lantern' && me.save.data.cos.held.includes('jack_lantern'), 'she can wear it: her wallet holds the NFT');
  ok(await rd('uri', [1n]) === 'http://localhost/api/cosmetics?id=1', 'its metadata points at the game');
  const m = (await new Client(alice).req('cosmetics?id=1')).data;
  ok(m.name === 'Jack-o’-Lantern' && /\/nft\/cos\/jack_lantern\.png$/.test(m.image) && m.attributes.some(a => a.value === 'Head'), 'public metadata for OpenSea: name, image, traits');
  ok((await fetch(BASE + '/nft/cos/jack_lantern.png')).headers.get('content-type') === 'image/png', 'the token image is served');

  console.log('Trading');
  ok(await call(alice, 'safeTransferFrom', [alice.address, bob.address, 1n, 1n, '0x']), 'Alice sells it to Bob (an ERC-1155 transfer)');
  r = await B.req('cosmetics', { method: 'POST', body: { action: 'sync' } });
  ok(r.data.held.jack_lantern === 1, 'Bob’s Cosmetics tab shows the NFT in his wallet');
  r = await B.save(d => { d.cos.head = 'jack_lantern'; });
  ok((await B.req('me')).data.save.data.cos.head === 'jack_lantern', 'Bob can wear it, though he never did the quest');
  await A.req('cosmetics', { method: 'POST', body: { action: 'sync' } });
  r = await A.save(d => { d.cos.head = 'jack_lantern'; });
  ok((await A.req('me')).data.save.data.cos.head === null, 'Alice can’t wear it any more');

  console.log('Cancelling');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'reaper_scythe' } });
  const v2 = r.data.voucher;
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'cancel', mintId: v2.mintId } });
  ok(r.status === 409 && r.data.error === 'wait', 'a mint can’t be cancelled while its voucher still works');
  await sleep(5500);
  ok(!(await sendTx(alice, v2)), 'the expired voucher no longer mints');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'cancel', mintId: v2.mintId } });
  me = (await A.req('me')).data;
  ok(r.status === 200 && me.save.data.cos.own.includes('reaper_scythe') && !me.save.data.cos.out.includes('reaper_scythe'), 'cancelled: the Scythe is back on the hero');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'reaper_scythe' } });
  const v3 = r.data.voucher; await sleep(4500);
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'voucher', mintId: v3.mintId } });
  ok(r.status === 200 && r.data.voucher.mintId === v3.mintId && !!(await sendTx(alice, r.data.voucher)), 'an expired voucher can be renewed (same mintId) and mints');
  r = await A.req('cosmetics', { method: 'POST', body: { action: 'cancel', mintId: v3.mintId } });
  ok(r.status === 409 && r.data.error === 'done', 'a mint that landed can’t be cancelled');

  console.log('Owner');
  ok(!(await call(alice, 'setPaused', [true])) && !(await call(bob, 'setURI', ['x'])), 'only the owner can change settings');
  ok(await call(owner, 'setPaused', [true]), 'the owner can pause');
  r = await B.save(d => { d.quests = { hallow: { s: 6, n: 0, done: true } }; });
  ok((await B.req('cosmetics', { method: 'POST', body: { action: 'mint', cos: 'reaper_scythe' } })).data.error === 'paused', 'paused: the game doesn’t start new mints');
  const [rcv, amt] = await rd('royaltyInfo', [1n, 10000n]); ok(rcv === owner.address && amt === 500n, 'royalties: 5% to the owner');
  ok(await rd('supportsInterface', ['0xd9b67a26']) && await rd('supportsInterface', ['0x2a55205a']) && await rd('supportsInterface', ['0x0e89341c']), 'marketplaces see an ERC-1155 with royalties and metadata');
} catch (e) { console.log('ERR', e); failN++; }
finally { srv.kill(); await chainSrv.close(); console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0); }
