// Contract tests: ganache chain + the real server voucher code (lib/claim.js).
import ganache from 'ganache';
import { createWalletClient, createPublicClient, http, parseEther, formatEther } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { readFileSync } from 'node:fs';
// Run: node contracts/test/compile.cjs, then node contracts/test/vault-test.mjs (needs ganache, see compile.cjs)
const V = JSON.parse(readFileSync(new URL('../LanternRewards.json', import.meta.url))), T = JSON.parse(readFileSync(new URL('./TestToken.json', import.meta.url)));
let pass = 0, fail = 0; const ok = (c, n) => { (c ? pass++ : fail++); console.log((c ? '  ✓ ' : '  ✗ ') + n); };
const keys = [generatePrivateKey(), generatePrivateKey(), generatePrivateKey(), generatePrivateKey(), generatePrivateKey()];
const srv = ganache.server({ logging: { quiet: true }, chain: { chainId: 4663 }, wallet: { accounts: keys.map(k => ({ secretKey: k, balance: '0x' + (10n ** 21n).toString(16) })) } });
await srv.listen(8545);
const chain = { id: 4663, name: 'test', nativeCurrency: { name: 'E', symbol: 'E', decimals: 18 }, rpcUrls: { default: { http: ['http://127.0.0.1:8545'] } } };
const pub = createPublicClient({ chain, transport: http() });
const [owner, signer, alice, bob, carol] = keys.map(k => privateKeyToAccount(k)), w = a => createWalletClient({ account: a, chain, transport: http() });
const deploy = async (art, args) => { const h = await w(owner).deployContract({ abi: art.abi, bytecode: art.bytecode, args }); return (await pub.waitForTransactionReceipt({ hash: h })).contractAddress; };
const tok = await deploy(T, [parseEther('1000000000')]);
const now0 = Number((await pub.getBlock()).timestamp), YEAR = 365 * 86400;
const vault = await deploy(V, [tok, signer.address, parseEther('500000'), 100n, BigInt(now0 + YEAR)]);
const bal = a => pub.readContract({ address: tok, abi: T.abi, functionName: 'balanceOf', args: [a] });
const rd = (fn, args = []) => pub.readContract({ address: vault, abi: V.abi, functionName: fn, args });
const call = async (a, fn, args) => { try { const h = await w(a).writeContract({ address: vault, abi: V.abi, functionName: fn, args, gas: 300000n }); const r = await pub.waitForTransactionReceipt({ hash: h }); return r.status === 'success'; } catch (e) { return false; } };
const send = async (a, v) => { try { const h = await w(a).sendTransaction({ to: v.to, data: v.data, gas: 300000n }); const rc = await pub.waitForTransactionReceipt({ hash: h }); if (process.env.DBG && rc.status !== 'success') console.log('   reverted, gas used', rc.gasUsed); return rc.status === 'success'; } catch (e) { if (process.env.DBG) console.log('   send:', e.details || e.shortMessage); return false; } };
await w(owner).writeContract({ address: tok, abi: T.abi, functionName: 'transfer', args: [vault, parseEther('50000000')] });
process.env.REWARDS_ON = '1'; process.env.CLAIM_CONTRACT = vault; process.env.CLAIM_SIGNER_KEY = keys[1]; process.env.RPC_URL = 'http://127.0.0.1:8545'; process.env.CHAIN_ID = '4663';
const C = await import('../../lib/claim.js');

console.log('Claiming');
ok(C.claimsOn() && C.signerAddress() === signer.address, 'the server is set up with the signer');
let v = await C.voucher(alice.address, 1250);
ok(await send(alice, v), 'a player sends their voucher');
ok(await bal(alice.address) === parseEther('1125') && await bal('0x000000000000000000000000000000000000dEaD') === parseEther('62.5'), 'they get 90% (1,125), 5% (62.5) is burned');
ok(await bal(vault) === parseEther('50000000') - parseEther('1187.5'), 'and 5% (62.5) stays in the vault');
ok(!(await send(alice, v)), 'the same voucher can’t be used twice');
const c1 = await C.onChain(alice.address); ok(c1.claimed === 1250 && c1.totalGross === 1250, 'the server reads what was paid');
v = await C.voucher(alice.address, 1500);
ok(await send(alice, v) && await bal(alice.address) === parseEther('1350'), 'a newer voucher pays only what’s new (250 → 225)');
ok(!(await send(bob, await C.voucher(alice.address, 9999))), 'someone else can’t use your voucher');
{ const fake = privateKeyToAccount(generatePrivateKey()); process.env.CLAIM_SIGNER_KEY = generatePrivateKey(); const bad = await C.voucher(bob.address, 100); process.env.CLAIM_SIGNER_KEY = keys[1];
  ok(!(await send(bob, bad)), 'a voucher from any other key is refused'); }
console.log('Safety');
ok(!(await call(alice, 'setPaused', [true])) && !(await call(alice, 'withdraw', [alice.address, 1n])), 'only the owner can pause or withdraw');
ok(!(await call(owner, 'withdraw', [owner.address, 1n])), 'the owner can’t withdraw while claims are open');
ok(await call(owner, 'setPaused', [true]) && !(await send(bob, await C.voucher(bob.address, 100))), 'paused: no claims');
ok(!(await call(owner, 'withdraw', [owner.address, parseEther('1')])), 'locked: even paused, the owner can’t withdraw before the unlock date');
await call(owner, 'setPaused', [false]);
console.log('The lock');
ok(!(await call(alice, 'setDailyLimits', [1n, 1n])) && !(await call(owner, 'setDailyLimits', [1n, 1001n])), 'only the owner tunes the daily limits, and the share stays between 0.01% and 10%');
ok(await rd('unlockAt') === BigInt(now0 + YEAR) && await rd('dailyBps') === 100n, 'unlock date and daily share are public');
const evil = privateKeyToAccount(generatePrivateKey());
ok(await call(owner, 'proposeSigner', [evil.address]) && !(await call(owner, 'activateSigner', [])), 'a new signer can’t take over right away');
ok(!(await call(alice, 'proposeSigner', [alice.address])), 'only the owner can propose one');
ok(await rd('signer') === signer.address && await rd('pendingSigner') === evil.address, 'the proposal is public on-chain while it waits');
await call(owner, 'setDailyLimits', [parseEther('2000'), 100n]);
ok(!(await send(bob, await C.voucher(bob.address, 1900))), 'the daily payout cap holds (1,750 already paid today + 1,900 > 2,000)');
ok(await send(bob, await C.voucher(bob.address, 200)), 'smaller claims still fit under it');
const [g, n] = await rd('preview', [bob.address, parseEther('300')]); ok(g === parseEther('100') && n === parseEther('90'), 'preview shows what a voucher would pay');
console.log('Shrinks with the pool, grows with funding');
await call(owner, 'setDailyLimits', [parseEther('100000000'), 1n]);   // no fixed cap: only 0.01% of the vault per day
await pub.request({ method: 'evm_increaseTime', params: [86400] }); await pub.request({ method: 'evm_mine', params: [] });
const realNow = Date.now; Date.now = () => 0; const chainNow = async () => { const t = Number((await pub.request({ method: 'eth_getBlockByNumber', params: ['latest', false] })).timestamp) * 1000 + 300 * 86400e3; Date.now = () => t; };   // vouchers dated by the (fast-forwarded) chain clock
await chainNow();
{ const left = await rd('todayLeft'), bal = await rd('vaultBalance'); ok(left === bal / 10000n, `the most it pays in a day is 0.01% of the vault here (${formatEther(left)})`);
  { const over = await C.voucher(carol.address, Number(formatEther(left)) + 10); let why = ''; try { await pub.call({ account: carol, to: over.to, data: over.data }); } catch (e) { why = e.details || ''; } ok(/daily limit reached/.test(why), 'a claim over today’s limit waits for tomorrow'); }
  { const vv = await C.voucher(carol.address, Math.floor(Number(formatEther(left)) / 2)); let sOk = true; try { await pub.call({ account: carol, to: vv.to, data: vv.data }); } catch (e) { sOk = false; console.log('   why', e.details); } ok(sOk, 'smaller claims go through'); }
  await w(owner).writeContract({ address: tok, abi: T.abi, functionName: 'transfer', args: [vault, parseEther('50000000')] });
  await pub.request({ method: 'evm_increaseTime', params: [86400] }); await pub.request({ method: 'evm_mine', params: [] });
  await chainNow(); const left2 = await rd('todayLeft'); ok(left2 > left * 19n / 10n, `topping up the vault (phase 2: +50M) raises tomorrow’s limit (${formatEther(left)} → ${formatEther(left2)})`); }
await call(owner, 'setDailyLimits', [parseEther('500000'), 100n]); Date.now = realNow;
console.log('Later');
await pub.request({ method: 'evm_increaseTime', params: [2 * 86400 + 5] }); await pub.request({ method: 'evm_mine', params: [] });
ok(await call(owner, 'activateSigner', []) && await rd('signer') === evil.address, 'after 2 days it can be switched in');
await pub.request({ method: 'evm_increaseTime', params: [YEAR] }); await pub.request({ method: 'evm_mine', params: [] });
await call(owner, 'setPaused', [true]);
ok(await call(owner, 'withdraw', [owner.address, parseEther('1')]), 'after the unlock date (and paused), the owner can move tokens');
console.log(`\n${pass} passed, ${fail} failed`); await srv.close(); process.exit(fail ? 1 : 0);
