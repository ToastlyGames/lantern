// Founder's Lantern contract tests: ganache chain + the real server voucher code (lib/founders.js).
// Run: node contracts/test/compile.cjs, then node contracts/test/founders-test.mjs (needs ganache, see compile.cjs)
import ganache from 'ganache';
import { createWalletClient, createPublicClient, http, encodeFunctionData } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { readFileSync } from 'node:fs';
const F = JSON.parse(readFileSync(new URL('../LanternFounders.json', import.meta.url)));
let pass = 0, fail = 0; const ok = (c, n) => { (c ? pass++ : fail++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const keys = [generatePrivateKey(), generatePrivateKey(), generatePrivateKey(), generatePrivateKey(), generatePrivateKey()];
const srv = ganache.server({ logging: { quiet: true }, chain: { chainId: 4663 }, wallet: { accounts: keys.map(k => ({ secretKey: k, balance: '0x' + (10n ** 21n).toString(16) })) } });
await srv.listen(8546);
const chain = { id: 4663, name: 'test', nativeCurrency: { name: 'E', symbol: 'E', decimals: 18 }, rpcUrls: { default: { http: ['http://127.0.0.1:8546'] } } };
const pub = createPublicClient({ chain, transport: http() });
const [owner, signer, alice, bob, carol] = keys.map(k => privateKeyToAccount(k)), w = a => createWalletClient({ account: a, chain, transport: http() });
const h = await w(owner).deployContract({ abi: F.abi, bytecode: F.bytecode, args: [signer.address, 1000n, 'https://lanternhold.fun/api/founders?id=', 'https://lanternhold.fun/api/founders?contract=1'] });
const nft = (await pub.waitForTransactionReceipt({ hash: h })).contractAddress;
const rd = (fn, args = []) => pub.readContract({ address: nft, abi: F.abi, functionName: fn, args });
const call = async (a, fn, args) => { try { const x = await w(a).writeContract({ address: nft, abi: F.abi, functionName: fn, args, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };
const send = async (a, v) => { try { const x = await w(a).sendTransaction({ to: v.to, data: v.data, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };
process.env.FOUNDERS_CONTRACT = nft; process.env.FOUNDERS_SIGNER_KEY = keys[1]; process.env.RPC_URL = 'http://127.0.0.1:8546'; process.env.CHAIN_ID = '4663';
const L = await import('../../lib/founders.js');

console.log('Minting');
ok(L.mintOpen() && L.signerAddress() === signer.address, 'the server is set up with the signer');
let v = await L.voucher(alice.address, 7);
ok(v.data.startsWith('0x7fb9a063'), 'the voucher calls mint() (the selector the game checks)');
ok(await send(alice, v), 'Hero #7 mints with their voucher');
ok(await rd('ownerOf', [7n]) === alice.address && await rd('balanceOf', [alice.address]) === 1n && await rd('totalSupply') === 1n, 'token #7 is theirs');
ok(await rd('tokenURI', [7n]) === 'https://lanternhold.fun/api/founders?id=7', 'its metadata points at the game');
ok(!(await send(alice, v)), 'the same voucher can’t mint twice');
ok(!(await send(alice, await L.voucher(alice.address, 8))), 'one per wallet: the same wallet can’t mint another number');
ok(!(await send(bob, await L.voucher(alice.address, 9))), 'someone else can’t use your voucher');
ok(!(await send(bob, await L.voucher(bob.address, 7))), 'a hero number can only be minted once');
ok(!(await send(bob, await L.voucher(bob.address, 1001))), 'numbers past the whitelist (1,000) can’t mint');
ok(!(await send(bob, await L.voucher(bob.address, 0))), 'there is no #0');
{ process.env.FOUNDERS_SIGNER_KEY = generatePrivateKey(); const bad = await L.voucher(bob.address, 12); process.env.FOUNDERS_SIGNER_KEY = keys[1];
  ok(!(await send(bob, bad)), 'a voucher from any other key is refused'); }
{ const expired = await L.voucher(bob.address, 12); const d = encodeFunctionData({ abi: F.abi, functionName: 'mint', args: [12n, 1n, 27, '0x' + '1'.repeat(64), '0x' + '1'.repeat(64)] });
  ok(!(await send(bob, { to: nft, data: d })), 'an expired or made-up voucher is refused');
  ok(await send(bob, expired), 'Hero #12 mints'); }
const st = await L.chainState(12, bob.address);
ok(st.taken && st.walletUsed && st.holder && st.supply === 2 && st.owner === bob.address, 'the server reads the mint’s state');
ok(await L.isHolder(alice.address) && !(await L.isHolder(carol.address)), 'the server can tell who holds one');

console.log('Holding and trading');
ok(await call(alice, 'transferFrom', [alice.address, carol.address, 7n]), 'a Founder’s Lantern can be sold or sent');
ok(await L.isHolder(carol.address, { fresh: true }) && !(await L.isHolder(alice.address, { fresh: true })), 'the flame follows the holder');
ok(!(await call(alice, 'transferFrom', [carol.address, alice.address, 7n])), 'no one else can move it');
ok(await call(carol, 'approve', [bob.address, 7n]) && await call(bob, 'safeTransferFrom', [carol.address, bob.address, 7n]), 'approved marketplaces can move it');
ok(!(await send(carol, await L.voucher(carol.address, 7))), 'holding one doesn’t let you mint a taken number');

console.log('Owner');
ok(!(await call(alice, 'setPaused', [true])) && !(await call(alice, 'setMaxId', [5000n])), 'only the owner can change settings');
ok(await call(owner, 'setPaused', [true]) && !(await send(carol, await L.voucher(carol.address, 30))), 'paused: no mints');
await call(owner, 'setPaused', [false]);
ok(!(await call(owner, 'setMaxId', [500n])), 'the whitelist can’t shrink');
ok(await call(owner, 'setMaxId', [2000n]) && await send(carol, await L.voucher(carol.address, 1500)), 'a later phase can open more numbers');
const now = Number((await pub.getBlock()).timestamp);
ok(await call(owner, 'setMintEnd', [BigInt(now - 10)]) && !(await send(owner, await L.voucher(owner.address, 31))), 'after the end time, no mints');
const [rcv, amt] = await rd('royaltyInfo', [7n, 10000n]); ok(rcv === owner.address && amt === 500n, 'royalties: 5% to the owner by default');
ok(!(await call(owner, 'setRoyalty', [owner.address, 1500n])), 'royalties can’t go over 10%');
ok(await rd('supportsInterface', ['0x80ac58cd']) && await rd('supportsInterface', ['0x2a55205a']), 'marketplaces see an ERC-721 with royalties');
ok(L.svg(7).startsWith('<svg') && L.meta(7, 'https://lanternhold.fun', 'Wren').name === 'Founder’s Lantern #7', 'metadata and image');
console.log(`\n${pass} passed, ${fail} failed`); await srv.close(); process.exit(fail ? 1 : 0);
