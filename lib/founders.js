// The Founder's Lantern (contracts/LanternFounders.sol, on Robinhood Chain): a free NFT for the first heroes.
// Whitelist: the first FOUNDERS_WL heroes ever made (default 1,000), by hero number. The token ID is the hero number.
// Holding one lights the Founder's Flame in the game (a light colour only holders have).
// Vercel settings: FOUNDERS_CONTRACT (the NFT's address; until it's set the game shows the whitelist and "mint opens
// soon"), FOUNDERS_SIGNER_KEY (secret! falls back to CLAIM_SIGNER_KEY), optional FOUNDERS_WL, RPC_URL, CHAIN_ID.
import { createPublicClient, http, encodeFunctionData, parseSignature, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export const ABI = [
  { type: 'function', name: 'mint', stateMutability: 'nonpayable', inputs: [{ name: 'heroNo', type: 'uint256' }, { name: 'deadline', type: 'uint256' }, { name: 'v', type: 'uint8' }, { name: 'r', type: 'bytes32' }, { name: 's', type: 'bytes32' }], outputs: [] },
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'minted', stateMutability: 'view', inputs: [{ name: 'id', type: 'uint256' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'hasMinted', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'ownerOf', stateMutability: 'view', inputs: [{ name: 'id', type: 'uint256' }], outputs: [{ type: 'address' }] },
  { type: 'function', name: 'totalSupply', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'paused', stateMutability: 'view', inputs: [], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'maxId', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'mintEnd', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] }
];
const clean = v => String(v || '').trim().replace(/^["']+|["']+$/g, '').trim();
export const foundersContract = () => { try { return getAddress(clean(process.env.FOUNDERS_CONTRACT)); } catch { return null; } };
const signerKey = () => { const k = clean(process.env.FOUNDERS_SIGNER_KEY) || clean(process.env.CLAIM_SIGNER_KEY); const h = k.startsWith('0x') ? k : '0x' + k; return /^0x[0-9a-fA-F]{64}$/.test(h) ? h : null; };
export const foundersMinLevel = () => { const n = Number(process.env.FOUNDERS_MIN_LEVEL || 10); return Number.isInteger(n) && n >= 1 ? n : 10; };   // combat level needed to be whitelisted
export const foundersWl = () => { const n = Number(process.env.FOUNDERS_WL || 1000); return Number.isInteger(n) && n > 0 ? n : 1000; };
export const chainId = () => Number(process.env.CHAIN_ID || 4663);
export const mintOpen = () => !!foundersContract() && !!signerKey();
export const signerAddress = () => { const k = signerKey(); return k ? privateKeyToAccount(k).address : null; };
export const onWhitelist = no => Number.isInteger(no) && no >= 1 && no <= foundersWl();

const rpc = () => clean(process.env.RPC_URL) || 'https://rpc.mainnet.chain.robinhood.com';
let pub = null, pubUrl = '';
const client = () => { if (!pub || pubUrl !== rpc()) { pubUrl = rpc(); pub = createPublicClient({ transport: http(pubUrl, { timeout: 8000 }) }); } return pub; };
const read = (fn, args = []) => client().readContract({ address: foundersContract(), abi: ABI, functionName: fn, args });

// Does this wallet hold a Founder's Lantern right now? (Short in-memory cache: holders are re-checked on each sign-in.)
const cache = new Map();
export async function isHolder(wallet, { fresh = false } = {}) {
  if (!wallet || !foundersContract()) return false;
  const k = wallet.toLowerCase(), c = cache.get(k);
  if (!fresh && c && Date.now() - c.at < 5 * 60e3) return c.v;
  const v = (await read('balanceOf', [getAddress(wallet)])) > 0n;
  cache.set(k, { v, at: Date.now() }); if (cache.size > 5000) cache.clear();
  return v;
}

// Everything the mint screen needs for this hero and wallet.
export async function chainState(heroNo, wallet) {
  const [supply, paused, maxId, mintEnd, taken, walletUsed, holder] = await Promise.all([
    read('totalSupply'), read('paused'), read('maxId'), read('mintEnd'),
    heroNo ? read('minted', [BigInt(heroNo)]) : false,
    wallet ? read('hasMinted', [getAddress(wallet)]) : false,
    wallet ? isHolder(wallet, { fresh: true }) : false]);
  let owner = null;
  if (taken) { try { owner = await read('ownerOf', [BigInt(heroNo)]); } catch { } }
  const end = Number(mintEnd);
  return { supply: Number(supply), paused, maxId: Number(maxId), ended: end > 0 && Date.now() / 1000 > end, mintEnd: end || null, taken, owner, walletUsed, holder };
}

// A signed voucher: this wallet may mint the token for this hero number. Ready for the wallet to send.
export async function voucher(wallet, heroNo) {
  const acct = privateKeyToAccount(signerKey()), c = foundersContract(), deadline = BigInt(Math.floor(Date.now() / 1000) + 1800);
  const sig = await acct.signTypedData({
    domain: { name: 'LanternFounders', version: '1', chainId: chainId(), verifyingContract: c },
    types: { Mint: [{ name: 'wallet', type: 'address' }, { name: 'heroNo', type: 'uint256' }, { name: 'deadline', type: 'uint256' }] },
    primaryType: 'Mint', message: { wallet: getAddress(wallet), heroNo: BigInt(heroNo), deadline }
  });
  const { v, r, s, yParity } = parseSignature(sig);
  const data = encodeFunctionData({ abi: ABI, functionName: 'mint', args: [BigInt(heroNo), deadline, Number(v ?? (27n + BigInt(yParity))), r, s] });
  return { to: c, data, chainId: chainId(), deadline: Number(deadline) };
}

export async function waitTx(hash) {
  try { const r = await client().waitForTransactionReceipt({ hash, timeout: 25000 }); return r.status === 'success'; } catch { return null; }
}

// ---- metadata (what marketplaces show) ----
export const FLAME = '#b98cff';
const GLYPH = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111',
  '#': '0101011111010101111101010', A: '010101111101101', D: '110101101101110', E: '111100110100111', F: '111100110100100', H: '101101111101101', L: '100100100100111', N: '110101101101101',
  O: '111101101101111', "'": '11000', G: '111100101101111', W: '101101101111101', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', ' ': '000000000000000', '·': '000000010000000' };
function text(str, x, y, px, fill) {   // a 3x5 pixel font, drawn as SVG rects (marketplaces render it the same everywhere)
  let out = '';
  for (const ch of str) { const g = GLYPH[ch]; if (!g) continue; const w = g.length / 5;   // 3 wide, or 5 for #
    for (let k = 0; k < g.length; k++) if (g[k] === '1') out += `<rect x="${x + (k % w) * px}" y="${y + Math.floor(k / w) * px}" width="${px}" height="${px}" fill="${fill}"/>`;
    x += (w + 1) * px; }
  return out;
}
const textW = (str, px) => [...str].reduce((n, ch) => n + ((GLYPH[ch] || '').length / 5 + 1) * px, 0) - px;
// The token image: a pixel lantern burning with the Founder's Flame (the same for every token).
export function svg(id) {
  const P = 20, r = (x, y, w, h, c) => `<rect x="${x * P}" y="${y * P}" width="${w * P}" height="${h * P}" fill="${c}"/>`;
  const m = '#ffcd75', dk = '#b06a2a', fl = FLAME, mid = '#d7bcff', core = '#f8f0ff', glass = '#2a1b45';
  const lantern = [
    r(22, 5, 6, 1, m), r(21, 6, 1, 2, m), r(28, 6, 1, 2, m), r(20, 8, 10, 1, m), r(19, 9, 12, 2, m), r(18, 11, 14, 1, dk),   // handle and cap
    r(19, 12, 2, 14, m), r(29, 12, 2, 14, m), r(21, 12, 8, 14, glass),                                                  // frame and glass
    r(22, 22, 6, 3, fl), r(23, 19, 4, 3, fl), r(24, 16, 2, 3, fl), r(24, 15, 1, 1, fl), r(26, 18, 1, 1, fl),             // the flame
    r(23, 21, 4, 3, mid), r(24, 18, 2, 3, mid), r(24, 22, 2, 2, core), r(24, 20, 1, 2, core),
    r(21, 12, 1, 14, 'rgba(255,255,255,.08)'), r(18, 26, 14, 2, m), r(19, 28, 12, 1, dk)].join('');                     // shine, base
  const sparks = [[14, 13], [36, 16], [16, 21], [34, 23], [13, 27], [37, 9], [16, 7], [33, 4]].map(([x, y], i) => r(x, y, 1, 1, i % 2 ? fl : core)).join('');
  const px = 18;   // the same art for every token: the Founder's Lantern (the number is in the token's name)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000" shape-rendering="crispEdges">
<defs><radialGradient id="g" cx="50%" cy="40%" r="48%"><stop offset="0" stop-color="${fl}" stop-opacity=".5"/><stop offset=".5" stop-color="#5d275d" stop-opacity=".3"/><stop offset="1" stop-color="#0b0c14" stop-opacity="0"/></radialGradient></defs>
<rect width="1000" height="1000" fill="#0b0c14"/><rect width="1000" height="1000" fill="url(#g)"/>
${lantern}${sparks}
${text("FOUNDER'S", Math.round(500 - textW("FOUNDER'S", px) / 2), 610, px, m)}${text('LANTERN', Math.round(500 - textW('LANTERN', px) / 2), 728, px, m)}
<rect x="0" y="850" width="1000" height="150" fill="#1a1c2c"/><rect x="0" y="846" width="1000" height="4" fill="${fl}"/>
${text('LANTERNHOLD', 56, 898, 10, '#eef1f5')}${text('SEASON 0', 1000 - 56 - textW('SEASON 0', 10), 898, 10, fl)}
</svg>`;
}
export function meta(id, origin, hero) {
  const attrs = [{ trait_type: 'Hero number', value: id, display_type: 'number' }, { trait_type: 'Season', value: 'Season 0' }, { trait_type: 'Flame', value: 'Founder’s Flame' }];
  if (hero) attrs.push({ trait_type: 'Hero', value: hero });
  return {
    name: `Founder’s Lantern #${id}`,
    description: `Hero #${id} of Lanternhold, the pixel dungeon MMO on Robinhood Chain. Free for the first ${foundersWl().toLocaleString('en-US')} heroes ever made. Whoever holds it lights the Founder’s Flame in the game, a light colour no one else has. Play at lanternhold.fun`,
    image: `${origin}/api/founders?img=${id}`, external_url: `${origin}/wiki#founder-s-lantern`, attributes: attrs
  };
}
export function contractMeta(origin) {
  return { name: 'Lanternhold Founders', description: `The Founder’s Lantern: a free NFT for the first ${foundersWl().toLocaleString('en-US')} heroes of Lanternhold, the pixel dungeon MMO on Robinhood Chain. Holders light the Founder’s Flame in the game.`,
    image: `${origin}/api/founders?img=1`, external_link: origin };
}
