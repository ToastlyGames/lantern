// Cosmetic NFTs (contracts/LanternCosmetics.sol, ERC-1155 on Robinhood Chain): a cosmetic earned in the game can be
// turned into a token. The cosmetic leaves the hero for good, and whoever's linked wallet holds the token can wear it,
// so it can be sold on OpenSea. Each kind of cosmetic has its own token ID (COSMETICS[k].nft).
// Vercel settings: COSMETICS_CONTRACT (the contract's address), COSMETICS_NFT=1 (the switch: minting is off until it's
// set, planned for Season 1), the signer: FOUNDERS_SIGNER_KEY or CLAIM_SIGNER_KEY (secret), optional RPC_URL, CHAIN_ID.
import { createPublicClient, http, encodeFunctionData, parseSignature, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { randomBytes } from 'node:crypto';
import { COSMETICS, COS_BY_NFT } from './gamedata.js';

export const ABI = [
  { type: 'function', name: 'mint', stateMutability: 'nonpayable', inputs: [{ name: 'id', type: 'uint256' }, { name: 'mintId', type: 'bytes32' }, { name: 'deadline', type: 'uint256' }, { name: 'v', type: 'uint8' }, { name: 'r', type: 'bytes32' }, { name: 's', type: 'bytes32' }], outputs: [] },
  { type: 'function', name: 'balanceOfBatch', stateMutability: 'view', inputs: [{ name: 'accounts', type: 'address[]' }, { name: 'ids', type: 'uint256[]' }], outputs: [{ type: 'uint256[]' }] },
  { type: 'function', name: 'used', stateMutability: 'view', inputs: [{ name: 'mintId', type: 'bytes32' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'paused', stateMutability: 'view', inputs: [], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'totalSupply', stateMutability: 'view', inputs: [{ name: 'id', type: 'uint256' }], outputs: [{ type: 'uint256' }] }
];
export const MINT_SELECTOR = '0x' + encodeFunctionData({ abi: ABI, functionName: 'mint', args: [1n, '0x' + '0'.repeat(64), 0n, 27, '0x' + '0'.repeat(64), '0x' + '0'.repeat(64)] }).slice(2, 10);
const clean = v => String(v || '').trim().replace(/^["']+|["']+$/g, '').trim();
export const cosContract = () => { try { return getAddress(clean(process.env.COSMETICS_CONTRACT)); } catch { return null; } };
const signerKey = () => { const k = clean(process.env.FOUNDERS_SIGNER_KEY) || clean(process.env.CLAIM_SIGNER_KEY); const h = k.startsWith('0x') ? k : '0x' + k; return /^0x[0-9a-fA-F]{64}$/.test(h) ? h : null; };
export const chainId = () => Number(process.env.CHAIN_ID || 4663);
export const cosNftOn = () => process.env.COSMETICS_NFT === '1' && !!cosContract() && !!signerKey();   // minting switched on
export const cosNftLive = () => !!cosContract();   // the contract exists: holdings are read (so a bought cosmetic can be worn)
export const signerAddress = () => { const k = signerKey(); return k ? privateKeyToAccount(k).address : null; };
export const NFT_KEYS = Object.keys(COSMETICS).filter(k => COSMETICS[k].nft);
export const keyOf = id => COS_BY_NFT[id] || null;
export const VOUCHER_MS = Number(process.env.COSMETICS_VOUCHER_MS) || 30 * 60e3;   // how long a mint pass works (tests shorten it)
export const CANCEL_GRACE_MS = process.env.COSMETICS_CANCEL_GRACE_MS != null ? Number(process.env.COSMETICS_CANCEL_GRACE_MS) : 60e3;   // and a margin after that before a mint can be cancelled

const rpc = () => clean(process.env.RPC_URL) || 'https://rpc.mainnet.chain.robinhood.com';
let pub = null, pubUrl = '';
const client = () => { if (!pub || pubUrl !== rpc()) { pubUrl = rpc(); pub = createPublicClient({ transport: http(pubUrl, { timeout: 8000 }) }); } return pub; };
const read = (fn, args = []) => client().readContract({ address: cosContract(), abi: ABI, functionName: fn, args });

// Which cosmetics does this wallet hold as tokens? { jack_lantern: 1, ... } (only ones it holds)
export async function holdings(wallet) {
  if (!wallet || !cosContract() || !NFT_KEYS.length) return {};
  const w = getAddress(wallet), bal = await read('balanceOfBatch', [NFT_KEYS.map(() => w), NFT_KEYS.map(k => BigInt(COSMETICS[k].nft))]);
  const out = {}; NFT_KEYS.forEach((k, i) => { if (bal[i] > 0n) out[k] = Number(bal[i]); }); return out;
}
export const usedOnChain = mintId => read('used', [mintId]);
export const pausedOnChain = () => read('paused');
export const newMintId = () => '0x' + randomBytes(32).toString('hex');

// A signed voucher: this wallet may mint one of this cosmetic, once (mintId). Ready for the wallet to send.
export async function voucher(wallet, key, mintId, deadlineMs) {
  const acct = privateKeyToAccount(signerKey()), c = cosContract(), id = BigInt(COSMETICS[key].nft), deadline = BigInt(Math.floor(deadlineMs / 1000));
  const sig = await acct.signTypedData({
    domain: { name: 'LanternCosmetics', version: '1', chainId: chainId(), verifyingContract: c },
    types: { Mint: [{ name: 'wallet', type: 'address' }, { name: 'id', type: 'uint256' }, { name: 'mintId', type: 'bytes32' }, { name: 'deadline', type: 'uint256' }] },
    primaryType: 'Mint', message: { wallet: getAddress(wallet), id, mintId, deadline }
  });
  const { r, s, v, yParity } = parseSignature(sig);
  const data = encodeFunctionData({ abi: ABI, functionName: 'mint', args: [id, mintId, deadline, Number(v ?? (27n + BigInt(yParity))), r, s] });
  return { to: c, data, chainId: chainId(), deadline: Number(deadline), mintId, wallet: getAddress(wallet), cos: key };
}
export async function waitTx(hash) { try { await client().waitForTransactionReceipt({ hash, timeout: 6000 }); } catch { } }   // functions stop at 10 s

// ---- metadata (what OpenSea shows): served from /api/cosmetics?id=N, images from /nft/cos/<key>.png ----
const SLOT_NAME = { head: 'Head', weapon: 'Weapon', body: 'Body' };
export function meta(id, origin) {
  const k = keyOf(id); if (!k) return null; const C = COSMETICS[k];
  return {
    name: C.n, description: C.d + ' Earned in Lanternhold and turned into a token. Whoever holds it can wear it in the game: link the wallet to your hero.',
    image: origin + '/nft/cos/' + k + '.png', external_url: origin,
    attributes: [{ trait_type: 'Slot', value: SLOT_NAME[C.slot] || C.slot }, { trait_type: 'Earned from', value: C.quest ? 'Quest' : 'Game' }, ...(C.quest === 'hallow' ? [{ trait_type: 'Event', value: 'All Hallows’ Eve 2026' }] : [])]
  };
}
export function contractMeta(origin) {
  return { name: 'Lanternhold Cosmetics', description: 'Cosmetics earned in Lanternhold, the pixel-art dungeon MMO on Robinhood Chain. Each one was earned by a hero in the game. Hold one and your hero can wear it.',
    image: origin + '/nft/cos/collection.png', external_link: origin };
}
