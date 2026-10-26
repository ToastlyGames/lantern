// Claiming rewards on-chain (contracts/LanternRewards.sol). The server signs an EIP-712 voucher for everything a
// player has earned; their wallet sends it to the vault, which pays 90% and burns 5% / recycles 5%.
// Vercel settings: CLAIM_CONTRACT (the vault's address), CLAIM_SIGNER_KEY (the signer's private key: secret!),
// optional RPC_URL, CHAIN_ID (default 4663, Robinhood Chain), CLAIM_MIN (default 100 tokens), CLAIM_MIN_LEVEL (default 5).
import { createPublicClient, http, encodeFunctionData, parseSignature, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { rewardsOn } from './rewards.js';

const ABI = [
  { type: 'function', name: 'claim', stateMutability: 'nonpayable', inputs: [{ name: 'total', type: 'uint256' }, { name: 'deadline', type: 'uint256' }, { name: 'v', type: 'uint8' }, { name: 'r', type: 'bytes32' }, { name: 's', type: 'bytes32' }], outputs: [] },
  { type: 'function', name: 'claimed', stateMutability: 'view', inputs: [{ name: 'w', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'totalGross', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'token', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { type: 'function', name: 'paused', stateMutability: 'view', inputs: [], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }], outputs: [{ type: 'uint256' }] }
];
const clean = v => String(v || '').trim().replace(/^["']+|["']+$/g, '').trim();
export const claimContract = () => { try { return getAddress(clean(process.env.CLAIM_CONTRACT)); } catch { return null; } };
const signerKey = () => { const k = clean(process.env.CLAIM_SIGNER_KEY); const h = k.startsWith('0x') ? k : '0x' + k; return /^0x[0-9a-fA-F]{64}$/.test(h) ? h : null; };
export const chainId = () => Number(process.env.CHAIN_ID || 4663);
export const claimMin = () => Number(process.env.CLAIM_MIN || 100);
export const claimMinLevel = () => Number(process.env.CLAIM_MIN_LEVEL || 5);
export const claimsOn = () => rewardsOn() && !!claimContract() && !!signerKey();
export const signerAddress = () => { const k = signerKey(); return k ? privateKeyToAccount(k).address : null; };

const rpc = () => clean(process.env.RPC_URL) || 'https://rpc.mainnet.chain.robinhood.com';
let pub = null;
const client = () => pub || (pub = createPublicClient({ transport: http(rpc(), { timeout: 10000 }) }));
let dec = null;
async function decimals() {
  if (dec != null) return dec;
  const tok = await client().readContract({ address: claimContract(), abi: ABI, functionName: 'token' });
  dec = Number(await client().readContract({ address: tok, abi: ABI, functionName: 'decimals' }));
  return dec;
}
// tokens (2 decimals, as the game stores them) <-> the token's base units
export async function toUnits(tokens) { const d = await decimals(); return BigInt(Math.round(tokens * 100)) * 10n ** BigInt(d - 2); }
export async function fromUnits(u) { const d = await decimals(); return Number(BigInt(u) / 10n ** BigInt(d - 2)) / 100; }

// The vault's token balance (in tokens), which sets how much is left to hand out. Read on-chain and kept for 5 minutes,
// so topping the vault up (funding in phases) raises the budget from the next UTC day. null until CLAIM_CONTRACT is set.
let vb = null;
export async function vaultBalance() {
  const c = claimContract(); if (!c) return null;
  if (vb && vb.c === c && Date.now() - vb.at < 5 * 60e3) return vb.v;
  try {
    const tok = await client().readContract({ address: c, abi: ABI, functionName: 'token' });
    const v = await fromUnits(await client().readContract({ address: tok, abi: ABI, functionName: 'balanceOf', args: [c] }));
    vb = { c, v, at: Date.now() }; return v;
  } catch (e) { console.error('vault balance', e.message || e); return vb && vb.c === c ? vb.v : null; }
}

export async function onChain(wallet) {
  const c = claimContract();
  const [claimed, totalGross, paused] = await Promise.all([
    client().readContract({ address: c, abi: ABI, functionName: 'claimed', args: [wallet] }),
    client().readContract({ address: c, abi: ABI, functionName: 'totalGross' }),
    client().readContract({ address: c, abi: ABI, functionName: 'paused' })]);
  return { claimed: await fromUnits(claimed), totalGross: await fromUnits(totalGross), paused };
}

// a voucher for `total` tokens (everything earned), ready for the wallet to send as a transaction
export async function voucher(wallet, total) {
  const acct = privateKeyToAccount(signerKey()), c = claimContract(), deadline = BigInt(Math.floor(Date.now() / 1000) + 3600), units = await toUnits(total);
  const sig = await acct.signTypedData({
    domain: { name: 'LanternRewards', version: '1', chainId: chainId(), verifyingContract: c },
    types: { Claim: [{ name: 'wallet', type: 'address' }, { name: 'total', type: 'uint256' }, { name: 'deadline', type: 'uint256' }] },
    primaryType: 'Claim', message: { wallet: getAddress(wallet), total: units, deadline }
  });
  const { v, r, s, yParity } = parseSignature(sig);
  const data = encodeFunctionData({ abi: ABI, functionName: 'claim', args: [units, deadline, Number(v ?? (27n + BigInt(yParity))), r, s] });
  return { to: c, data, chainId: chainId(), deadline: Number(deadline) };
}

export async function waitTx(hash) {
  try { const r = await client().waitForTransactionReceipt({ hash, timeout: 25000 }); return r.status === 'success'; } catch { return null; }
}
