// Founder's Lantern contract tests: ganache chain + the real server voucher code (lib/founders.js).
// Run: node contracts/test/compile.cjs, then node contracts/test/founders-test.mjs (needs ganache, see compile.cjs)
import ganache from 'ganache';
import { createWalletClient, createPublicClient, http, encodeFunctionData } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { readFileSync } from 'node:fs';
const F = JSON.parse(readFileSync(new URL('../LanternFounders.json', import.meta.url)));
let pass = 0, fail = 0; const ok = (c, n) => { (c ? pass++ : fail++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const keys = Array.from({ length: 7 }, () => generatePrivateKey());
const srv = ganache.server({ logging: { quiet: true }, chain: { chainId: 4663 }, wallet: { accounts: keys.map(k => ({ secretKey: k, balance: '0x' + (10n ** 21n).toString(16) })) } });
await srv.listen(8546);
const chain = { id: 4663, name: 'test', nativeCurrency: { name: 'E', symbol: 'E', decimals: 18 }, rpcUrls: { default: { http: ['http://127.0.0.1:8546'] } } };
const pub = createPublicClient({ chain, transport: http() });
const [owner, signer, alice, bob, carol, dave, erin] = keys.map(k => privateKeyToAccount(k)), w = a => createWalletClient({ account: a, chain, transport: http() });
const h = await w(owner).deployContract({ abi: F.abi, bytecode: F.bytecode, args: [signer.address, 4n, 2n, 'https://lanternhold.fun/api/founders?id=', 'https://lanternhold.fun/api/founders?contract=1'] });
const nft = (await pub.waitForTransactionReceipt({ hash: h })).contractAddress;
const rd = (fn, args = []) => pub.readContract({ address: nft, abi: F.abi, functionName: fn, args });
const call = async (a, fn, args) => { try { const x = await w(a).writeContract({ address: nft, abi: F.abi, functionName: fn, args, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };
const send = async (a, v) => { try { const x = await w(a).sendTransaction({ to: v.to, data: v.data, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };
process.env.FOUNDERS_CONTRACT = nft; process.env.FOUNDERS_SIGNER_KEY = keys[1]; process.env.RPC_URL = 'http://127.0.0.1:8546'; process.env.CHAIN_ID = '4663';
const L = await import('../../lib/founders.js');

console.log('Minting (small pools for the test: 4 open, 2 held for giveaway winners)');
ok(L.mintOpen() && L.signerAddress() === signer.address, 'the server is set up with the signer');
ok(await rd('MAX_SUPPLY') === 6n && await rd('openCap') === 4n && await rd('reservedCap') === 2n, 'supply = open + reserved');
let v = await L.voucher(alice.address, 7);
ok(v.data.startsWith('0x585c3af8') && v.reserved === false, 'the voucher calls mint(heroNo, reserved, …) from the open pool');
ok(await send(alice, v), 'Hero #7 mints with their voucher');
ok(await rd('ownerOf', [7n]) === alice.address && await rd('balanceOf', [alice.address]) === 1n && await rd('totalSupply') === 1n && await rd('openMinted') === 1n, 'token #7 is theirs, from the open pool');
ok(await rd('tokenURI', [7n]) === 'https://lanternhold.fun/api/founders?id=7', 'its metadata points at the game');
ok(!(await send(alice, v)), 'the same voucher can’t mint twice');
ok(!(await send(alice, await L.voucher(alice.address, 8))), 'one per wallet: the same wallet can’t mint another number');
ok(!(await send(bob, await L.voucher(alice.address, 9))), 'someone else can’t use your voucher');
ok(!(await send(bob, await L.voucher(bob.address, 7))), 'a hero number can only be minted once');
ok(!(await send(bob, await L.voucher(bob.address, 0))), 'there is no #0');
{ process.env.FOUNDERS_SIGNER_KEY = generatePrivateKey(); const bad = await L.voucher(bob.address, 12); process.env.FOUNDERS_SIGNER_KEY = keys[1];
  ok(!(await send(bob, bad)), 'a voucher from any other key is refused'); }
{ const open = await L.voucher(bob.address, 5000), d = '0x585c3af8' + open.data.slice(10, 74) + '1'.padStart(64, '0') + open.data.slice(138);
  ok(!(await send(bob, { to: nft, data: d })), 'an open voucher can’t be switched to the reserved pool'); }
{ const d = encodeFunctionData({ abi: F.abi, functionName: 'mint', args: [12n, false, 1n, 27, '0x' + '1'.repeat(64), '0x' + '1'.repeat(64)] });
  ok(!(await send(bob, { to: nft, data: d })), 'an expired or made-up voucher is refused'); }
ok(await send(bob, await L.voucher(bob.address, 5000)), 'any hero number can mint (Hero #5,000)');
const st = await L.chainState(5000, bob.address);
ok(st.taken && st.walletUsed && st.holder && st.supply === 2 && st.owner === bob.address && st.openLeft === 2 && st.reservedLeft === 2 && st.max === 6, 'the server reads the mint’s state and both pools');
ok(await L.isHolder(alice.address) && !(await L.isHolder(carol.address)), 'the server can tell who holds one');

console.log('Giveaway pool');
const rv = await L.voucher(dave.address, 21, true);
ok(rv.reserved === true && await send(dave, rv) && await rd('reservedMinted') === 1n, 'a giveaway winner mints from the reserved pool');
ok(await send(carol, await L.voucher(carol.address, 30)) && await send(owner, await L.voucher(owner.address, 31)), 'the open pool fills up');
ok((await L.chainState(1, erin.address)).openLeft === 0 && !(await send(erin, await L.voucher(erin.address, 32))), 'open pool full: no more open mints');
ok(await send(erin, await L.voucher(erin.address, 32, true)), 'but a winner still gets theirs from the reserved pool');
const fred = privateKeyToAccount(generatePrivateKey());
await w(owner).sendTransaction({ to: fred.address, value: 10n ** 18n });
ok(!(await send(fred, await L.voucher(fred.address, 40, true))), 'reserved pool full too: sold out (6 of 6)');
ok(await rd('totalSupply') === 6n, 'never more than MAX_SUPPLY');

console.log('Holding and trading');
ok(await call(alice, 'approve', [bob.address, 7n]) && await call(bob, 'safeTransferFrom', [alice.address, fred.address, 7n]), 'approved marketplaces can move it');
ok(await L.isHolder(fred.address, { fresh: true }) && !(await L.isHolder(alice.address, { fresh: true })), 'the flame follows the holder');
ok(!(await call(alice, 'transferFrom', [fred.address, alice.address, 7n])), 'no one else can move it');

console.log('Owner');
const h2 = await w(owner).deployContract({ abi: F.abi, bytecode: F.bytecode, args: [signer.address, 1222n, 1000n, 'https://x/', 'https://x/c'] });
const nft2 = (await pub.waitForTransactionReceipt({ hash: h2 })).contractAddress;
const rd2 = fn => pub.readContract({ address: nft2, abi: F.abi, functionName: fn });
const c2 = async (a, fn, args) => { try { const x = await w(a).writeContract({ address: nft2, abi: F.abi, functionName: fn, args, gas: 300000n }); return (await pub.waitForTransactionReceipt({ hash: x })).status === 'success'; } catch { return false; } };
ok(await rd2('MAX_SUPPLY') === 2222n, 'the real deploy: 1,222 + 1,000 = 2,222');
ok(!(await c2(alice, 'moveReservedToOpen', [10n])) && !(await c2(alice, 'setPaused', [true])), 'only the owner can change settings');
ok(await c2(owner, 'moveReservedToOpen', [100n]) && await rd2('openCap') === 1322n && await rd2('reservedCap') === 900n && await rd2('MAX_SUPPLY') === 2222n, 'unclaimed giveaway spots can move to the open pool (supply stays 2,222)');
ok(!(await c2(owner, 'moveReservedToOpen', [901n])), 'but not more than are left');
ok(!(await call(owner, 'moveReservedToOpen', [1n])), 'claimed giveaway spots can’t be moved');
ok(await call(owner, 'setPaused', [true]), 'the owner can pause');
await call(owner, 'setPaused', [false]);
const now = Number((await pub.getBlock()).timestamp);
ok(await c2(owner, 'setMintEnd', [BigInt(now - 10)]), 'the owner can set an end time');
const [rcv, amt] = await rd('royaltyInfo', [7n, 10000n]); ok(rcv === owner.address && amt === 500n, 'royalties: 5% to the owner by default');
ok(!(await call(owner, 'setRoyalty', [owner.address, 1500n])), 'royalties can’t go over 10%');
ok(await rd('supportsInterface', ['0x80ac58cd']) && await rd('supportsInterface', ['0x2a55205a']), 'marketplaces see an ERC-721 with royalties');
ok(L.svg(7).startsWith('<svg') && L.meta(7, 'https://lanternhold.fun', 'Wren').name === 'Founder’s Lantern #7', 'metadata and image');
console.log(`\n${pass} passed, ${fail} failed`); await srv.close(); process.exit(fail ? 1 : 0);
