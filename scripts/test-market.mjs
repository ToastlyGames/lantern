// Lantern Exchange tests: the dev server (in-memory database) against a local chain (ganache: the real LanternCosmetics
// contract, stand-ins for Seaport's counter and OpenSea's conduit) and a stand-in for OpenSea's API that keeps an order
// book. Run: node contracts/test/compile.cjs, then node scripts/test-market.mjs (needs ganache and solc, see
// contracts/test/compile.cjs).
import ganache from 'ganache';
import solc from 'solc';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createWalletClient, createPublicClient, http as vhttp, decodeFunctionData, formatEther, parseEther, getAddress } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';

let pass = 0, failN = 0; const ok = (c, n) => { (c ? pass++ : failN++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const C = JSON.parse(readFileSync(new URL('../contracts/LanternCosmetics.json', import.meta.url)));
const SEAPORT = '0x0000000000000068F116a894984e2DB1123eB395', CC = '0x00000000F9490004C11Cef243f5400493c00Ad63', CONDUIT = '0x1E0049783F008A0085193E00003D00cd54003c71';
const FEE_TO = '0x0000a26b00c1F0DF003000390027140000fAa719', CREATOR = '0x000000000000000000000000000000000000c0de';
const keys = Array.from({ length: 4 }, () => generatePrivateKey());
const chainSrv = ganache.server({ logging: { quiet: true }, chain: { chainId: 4663 }, wallet: { accounts: keys.map(k => ({ secretKey: k, balance: '0x' + (10n ** 21n).toString(16) })) } });
await chainSrv.listen(8550);
const chain = { id: 4663, name: 't', nativeCurrency: { name: 'E', symbol: 'E', decimals: 18 }, rpcUrls: { default: { http: ['http://127.0.0.1:8550'] } } };
const pub = createPublicClient({ chain, transport: vhttp() });
const [owner, signer, alice, bob] = keys.map(k => privateKeyToAccount(k)), w = a => createWalletClient({ account: a, chain, transport: vhttp() });
// stand-ins at Seaport's and the ConduitController's real addresses (only the two reads the server makes)
const mocks = JSON.parse(solc.compile(JSON.stringify({ language: 'Solidity', sources: { 'm.sol': { content: `pragma solidity 0.8.26;
contract S { mapping(address => uint256) public c; function getCounter(address a) external view returns (uint256) { return c[a]; } }
contract CC { function getConduit(bytes32) external pure returns (address, bool) { return (${CONDUIT}, true); } }` } }, settings: { evmVersion: 'paris', outputSelection: { '*': { '*': ['evm.deployedBytecode.object'] } } } })));
await pub.request({ method: 'evm_setAccountCode', params: [SEAPORT, '0x' + mocks.contracts['m.sol'].S.evm.deployedBytecode.object] });
await pub.request({ method: 'evm_setAccountCode', params: [CC, '0x' + mocks.contracts['m.sol'].CC.evm.deployedBytecode.object] });
const nft = (await pub.waitForTransactionReceipt({ hash: await w(owner).deployContract({ abi: C.abi, bytecode: C.bytecode, args: [signer.address, 'x', 'y'] }) })).contractAddress;
const send = async (a, tx) => { try { const h = await w(a).sendTransaction({ to: tx.to, data: tx.data, value: BigInt(tx.value || 0), gas: 500000n }); return (await pub.waitForTransactionReceipt({ hash: h })).status === 'success'; } catch { return false; } };
// Alice mints a Jack-o'-Lantern (a server voucher, straight to the contract)
process.env.COSMETICS_CONTRACT = nft; process.env.FOUNDERS_SIGNER_KEY = keys[1]; process.env.CHAIN_ID = '4663';
const CN = await import('../lib/cosnft.js');
await send(alice, await CN.voucher(alice.address, 'jack_lantern', CN.newMintId(), Date.now() + 600e3));

// ---- a stand-in for OpenSea's API: an order book for one collection ----
const SLUG = 'lanternhold-cosmetics', book = new Map(), seen = { key: null, posted: null };
const order = (hash, p) => ({ order_hash: hash, chain: 'robinhood', protocol_address: SEAPORT.toLowerCase(), protocol_data: { parameters: p, signature: '0x' + '11'.repeat(65) },
  price: { current: { currency: p.consideration[0].itemType === 1 ? 'USDG' : 'ETH', decimals: p.consideration[0].itemType === 1 ? 6 : 18, value: p.consideration.reduce((a, x) => a + BigInt(x.startAmount), 0n).toString() } } });
const listing = (maker, id, eth, extra = {}) => ({ offerer: maker, zone: '0x0000000000000000000000000000000000000000', zoneHash: '0x' + '0'.repeat(64), orderType: 0, offer: [{ itemType: 3, token: nft, identifierOrCriteria: String(id), startAmount: '1', endAmount: '1' }],
  consideration: [{ itemType: 0, token: '0x0000000000000000000000000000000000000000', identifierOrCriteria: '0', startAmount: parseEther(eth).toString(), endAmount: parseEther(eth).toString(), recipient: maker }], startTime: '1', endTime: String(Math.floor(Date.now() / 1000) + 86400),
  salt: '7', conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000', counter: '0', totalOriginalConsiderationItems: 1, ...extra });
book.set('0x' + 'b0'.repeat(32), order('0x' + 'b0'.repeat(32), listing(bob.address, 1, '0.02')));
book.set('0x' + 'b1'.repeat(32), order('0x' + 'b1'.repeat(32), listing(bob.address, 2, '0.04')));
{ const p = listing(bob.address, 1, '0.001'); p.consideration[0] = { ...p.consideration[0], itemType: 1, token: '0x00000000000000000000000000000000000000aa', startAmount: '5000000', endAmount: '5000000' }; book.set('0x' + 'b2'.repeat(32), order('0x' + 'b2'.repeat(32), p)); }
const os = http.createServer(async (req, res) => {
  let body = ''; for await (const c of req) body += c; const j = (st, o) => { res.writeHead(st, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); };
  seen.key = req.headers['x-api-key']; const u = new URL(req.url, 'http://x');
  if (u.pathname.toLowerCase() === `/chain/robinhood/contract/${nft}`.toLowerCase()) return j(200, { collection: SLUG });
  if (u.pathname === `/collections/${SLUG}`) return j(200, { fees: [{ fee: 1.0, recipient: FEE_TO, required: true }, { fee: 5.0, recipient: CREATOR, required: false }] });
  if (u.pathname === `/listings/collection/${SLUG}/all`) return j(200, { listings: [...book.values()], next: null });
  if (u.pathname === '/orders/robinhood/seaport/listings' && req.method === 'POST') { const b = JSON.parse(body); seen.posted = b; const h = '0x' + 'a1'.repeat(32); book.set(h, order(h, b.parameters)); return j(201, { order: { order_hash: h } }); }
  const m = u.pathname.match(/^\/orders\/chain\/robinhood\/protocol\/0x[0-9a-f]{40}\/(0x[0-9a-f]{64})$/); if (m) return book.has(m[1]) ? j(200, { order: book.get(m[1]) }) : j(404, {});
  if (u.pathname === '/listings/fulfillment_data') { const b = JSON.parse(body), o = book.get(b.listing.hash); if (!o) return j(400, { errors: ['not found'] }); const p = o.protocol_data.parameters, c0 = p.consideration[0];
    return j(200, { fulfillment_data: { transaction: { function: 'fulfillBasicOrder_efficient_6GL6yc((address,uint256,uint256,address,address,address,uint256,uint256,uint8,uint256,uint256,bytes32,uint256,bytes32,bytes32,uint256,(uint256,address)[],bytes))', chain: 4663, to: SEAPORT, value: o.price.current.value,
      input_data: { parameters: { considerationToken: c0.token, considerationIdentifier: '0', considerationAmount: c0.startAmount, offerer: p.offerer, zone: p.zone, offerToken: p.offer[0].token, offerIdentifier: p.offer[0].identifierOrCriteria, offerAmount: '1', basicOrderType: 4, startTime: p.startTime, endTime: p.endTime,
        zoneHash: p.zoneHash, salt: p.salt, offererConduitKey: p.conduitKey, fulfillerConduitKey: '0x' + '0'.repeat(64), totalOriginalAdditionalRecipients: String(p.consideration.length - 1), additionalRecipients: p.consideration.slice(1).map(x => ({ amount: x.startAmount, recipient: x.recipient })), signature: o.protocol_data.signature } } } } }); }
  j(404, { errors: ['no route ' + u.pathname] });
}).listen(4011);

const PORT = 3990, BASE = `http://localhost:${PORT}`;
const srv = spawn(process.execPath, ['scripts/dev-server.mjs'], { env: { ...process.env, PORT: String(PORT), LH_OFFLINE: '1', LH_MEMORY_DB: '1', SUPABASE_URL: '', RT_URL: '', COSMETICS_CONTRACT: nft, FOUNDERS_SIGNER_KEY: keys[1], RPC_URL: 'http://127.0.0.1:8550', CHAIN_ID: '4663',
  MARKET_ON: '1', OPENSEA_API_KEY: 'test-key', OPENSEA_API: 'http://localhost:4011' }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
class Client {
  constructor(acct) { this.acct = acct; this.jar = new Map(); }
  async req(path, { method = 'GET', body } = {}) {
    const r = await fetch(BASE + '/api/' + path, { method, headers: { 'X-LH': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(this.jar.size ? { cookie: [...this.jar].map(([k, v]) => k + '=' + v).join('; ') } : {}) }, body: body ? JSON.stringify(body) : undefined });
    for (const sc of r.headers.getSetCookie ? r.headers.getSetCookie() : []) { const [kv] = sc.split(';'); const i = kv.indexOf('='); this.jar.set(kv.slice(0, i).trim(), kv.slice(i + 1).trim()); }
    let data = {}; try { data = await r.json(); } catch { } return { status: r.status, data };
  }
  async signIn() { const n = (await this.req('auth/nonce?address=' + this.acct.address.toLowerCase())).data; return this.req('auth/verify', { method: 'POST', body: { message: n.message, signature: await this.acct.signMessage({ message: n.message }) } }); }
}
try {
  const A = new Client(alice), B = new Client(bob);
  await A.signIn(); await A.req('hero', { method: 'POST', body: { name: 'Seller' } });
  await B.signIn(); await B.req('hero', { method: 'POST', body: { name: 'Sniper' } });
  console.log('Browsing');
  let r = await A.req('market');
  ok(r.data.on && r.data.listings.length === 3 && seen.key === 'test-key', 'the Exchange is open and shows the collection’s OpenSea listings (the API key stays on the server)');
  ok(r.data.listings[0].eth === '0.02' && r.data.listings[1].eth === '0.04' && !r.data.listings[2].native, 'cheapest first, token-priced listings last');
  ok(r.data.floor.jack_lantern.eth === '0.02' && r.data.floor.reaper_scythe.eth === '0.04' && r.data.held.jack_lantern === 1, 'the floor of each cosmetic, and Alice’s wallet holds a Jack-o’-Lantern');
  ok(r.data.url === 'https://opensea.io/collection/' + SLUG, 'a link to the collection on OpenSea');

  console.log('Listing');
  ok((await B.req('market', { method: 'POST', body: { action: 'list', cos: 'jack_lantern', price: '0.05', days: 7 } })).data.error === 'not_held', 'you can only list what your wallet holds');
  ok((await A.req('market', { method: 'POST', body: { action: 'list', cos: 'jack_lantern', price: 'abc', days: 7 } })).status === 400, 'a bad price is refused');
  r = await A.req('market', { method: 'POST', body: { action: 'list', cos: 'jack_lantern', price: '0.05', days: 7 } });
  const L = r.data;
  ok(L.approval && L.approval.to.toLowerCase() === nft.toLowerCase() && L.approval.data.startsWith('0xa22cb465') && decodeFunctionData({ abi: C.abi, data: L.approval.data }).args[0] === CONDUIT, 'first time: approve OpenSea’s conduit on the cosmetics contract');
  ok(await send(alice, L.approval) && await pub.readContract({ address: nft, abi: C.abi, functionName: 'isApprovedForAll', args: [alice.address, CONDUIT] }), 'Alice’s wallet approves it');
  const p = L.parameters;
  ok(p.offer[0].itemType === 3 && p.offer[0].identifierOrCriteria === '1' && p.consideration.length === 2 && formatEther(BigInt(p.consideration[0].startAmount)) === '0.0495' && formatEther(BigInt(p.consideration[1].startAmount)) === '0.0005' && getAddress(p.consideration[1].recipient) === getAddress(FEE_TO),
    'the order: Jack-o’-Lantern #1 for 0.05 ETH, OpenSea’s required 1% fee taken out (0.0495 to Alice)');
  ok(Number(p.endTime) - Number(p.startTime) >= 7 * 86400 && L.typed.domain.verifyingContract === SEAPORT && L.typed.domain.chainId === 4663, 'for 7 days, signed for Seaport 1.6 on Robinhood Chain');
  const sig = await alice.signTypedData(L.typed);
  ok((await B.req('market', { method: 'POST', body: { action: 'submit', parameters: p, signature: sig } })).status === 403, 'someone else can’t post Alice’s listing');
  ok((await A.req('market', { method: 'POST', body: { action: 'submit', parameters: { ...p, salt: '99' }, signature: sig } })).status === 400, 'a tampered order (signature doesn’t match) is refused');
  r = await A.req('market', { method: 'POST', body: { action: 'submit', parameters: p, signature: sig } });
  ok(r.status === 200 && seen.posted && seen.posted.protocol_address === SEAPORT.toLowerCase() && seen.posted.signature === sig && seen.posted.parameters.totalOriginalConsiderationItems === 2, 'Alice signs, and the game posts it to OpenSea');
  r = await A.req('market');
  ok(r.data.listings.some(l => l.mine && l.cos === 'jack_lantern' && l.eth === '0.05'), 'her listing shows as hers');
  ok((await A.req('market', { method: 'POST', body: { action: 'list', cos: 'jack_lantern', price: '0.06', days: 7 } })).data.error === 'listed', 'she can’t list more than she holds');

  console.log('Delisting');
  const mine = r.data.listings.find(l => l.mine).hash;
  ok((await B.req('market', { method: 'POST', body: { action: 'delist', hash: mine } })).status === 403, 'Bob can’t delist Alice’s listing');
  r = await A.req('market', { method: 'POST', body: { action: 'delist', hash: mine } });
  const dc = decodeFunctionData({ abi: (await import('../lib/opensea.js')).SEAPORT_ABI, data: r.data.tx.data });
  ok(r.data.tx.to === SEAPORT && dc.functionName === 'cancel' && dc.args[0][0].offerer === alice.address && dc.args[0][0].salt === BigInt(p.salt), 'Alice gets the Seaport cancel for exactly her order');

  console.log('Buying and sniping');
  r = await B.req('market', { method: 'POST', body: { action: 'buy', hash: mine } });
  const bc = decodeFunctionData({ abi: (await import('../lib/opensea.js')).SEAPORT_ABI, data: r.data.tx.data });
  ok(r.data.tx.to === SEAPORT && r.data.tx.value === parseEther('0.05').toString() && bc.functionName === 'fulfillBasicOrder_efficient_6GL6yc' && bc.args[0].offerer === alice.address && bc.args[0].offerIdentifier === 1n, 'Bob can buy it: OpenSea’s fulfillment, ready to send for 0.05 ETH');
  r = await A.req('market', { method: 'POST', body: { action: 'snipe' } });
  ok(r.status === 200 && r.data.listing.eth === '0.02' && r.data.listing.maker === bob.address && r.data.tx.value === parseEther('0.02').toString(), 'snipe: the collection’s cheapest listing (not your own), ready to buy');
  r = await A.req('market', { method: 'POST', body: { action: 'snipe', cos: 'reaper_scythe' } });
  ok(r.data.listing.cos === 'reaper_scythe' && r.data.listing.eth === '0.04', 'snipe one cosmetic’s floor');
  r = await A.req('market', { method: 'POST', body: { action: 'buy', hash: '0x' + 'b2'.repeat(32) } });
  ok(r.status === 409 && r.data.error === 'opensea_only', 'a listing priced in a token sends you to OpenSea');
} catch (e) { console.log('ERR', e); failN++; }
finally { srv.kill(); os.close(); await chainSrv.close(); console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0); }
