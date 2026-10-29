// The Lantern Exchange (Season 1): the game's own window onto OpenSea for the Lanternhold Cosmetics collection.
// Every listing is a real Seaport 1.6 order on OpenSea's order book: listed here, it's for sale on OpenSea too (and the
// other way round). The server talks to OpenSea's API (the key stays on the server); the player's wallet signs the
// listing and sends the transactions (approve, buy, cancel). Nothing here can move anyone's NFTs or money by itself.
// Vercel settings: MARKET_ON=1 (the switch), OPENSEA_API_KEY (secret), optional OPENSEA_COLLECTION (the collection's
// OpenSea slug; found from the contract otherwise), OPENSEA_CHAIN (default robinhood), OPENSEA_API (tests only).
import { createPublicClient, http, encodeFunctionData, parseEther, formatEther, getAddress, verifyTypedData } from 'viem';
import { randomBytes } from 'node:crypto';
import { COSMETICS } from './gamedata.js';
import { cosContract, keyOf, chainId } from './cosnft.js';

export const SEAPORT = '0x0000000000000068F116a894984e2DB1123eB395';               // Seaport 1.6, the same address on every chain
export const CONDUIT_CONTROLLER = '0x00000000F9490004C11Cef243f5400493c00Ad63';
export const OS_CONDUIT_KEY = '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000';   // OpenSea's conduit
const ZERO = '0x0000000000000000000000000000000000000000', ZERO32 = '0x' + '0'.repeat(64);
const clean = v => String(v || '').trim().replace(/^["']+|["']+$/g, '').trim();
const apiBase = () => clean(process.env.OPENSEA_API) || 'https://api.opensea.io/api/v2';
const apiKey = () => clean(process.env.OPENSEA_API_KEY);
export const osChain = () => clean(process.env.OPENSEA_CHAIN) || 'robinhood';
export const marketOn = () => process.env.MARKET_ON === '1' && !!apiKey() && !!cosContract();
export const DAYS = [1, 3, 7, 30];

const rpc = () => clean(process.env.RPC_URL) || 'https://rpc.mainnet.chain.robinhood.com';
let pub = null, pubUrl = '';
const client = () => { if (!pub || pubUrl !== rpc()) { pubUrl = rpc(); pub = createPublicClient({ transport: http(pubUrl, { timeout: 8000 }) }); } return pub; };

// ---- Seaport types ----
const OFFER = [{ name: 'itemType', type: 'uint8' }, { name: 'token', type: 'address' }, { name: 'identifierOrCriteria', type: 'uint256' }, { name: 'startAmount', type: 'uint256' }, { name: 'endAmount', type: 'uint256' }];
const CONS = [...OFFER, { name: 'recipient', type: 'address' }];
const ORDER = [{ name: 'offerer', type: 'address' }, { name: 'zone', type: 'address' }, { name: 'offer', type: 'OfferItem[]' }, { name: 'consideration', type: 'ConsiderationItem[]' }, { name: 'orderType', type: 'uint8' },
  { name: 'startTime', type: 'uint256' }, { name: 'endTime', type: 'uint256' }, { name: 'zoneHash', type: 'bytes32' }, { name: 'salt', type: 'uint256' }, { name: 'conduitKey', type: 'bytes32' }, { name: 'counter', type: 'uint256' }];
export const TYPES = { OrderComponents: ORDER, OfferItem: OFFER, ConsiderationItem: CONS };
export const domain = () => ({ name: 'Seaport', version: '1.6', chainId: chainId(), verifyingContract: SEAPORT });
const tup = (n, comps) => ({ name: n, type: 'tuple', components: comps });
const OFFER_T = OFFER.map(f => ({ name: f.name, type: f.type })), CONS_T = CONS.map(f => ({ name: f.name, type: f.type }));
const ORDER_T = [{ name: 'offerer', type: 'address' }, { name: 'zone', type: 'address' }, { name: 'offer', type: 'tuple[]', components: OFFER_T }, { name: 'consideration', type: 'tuple[]', components: CONS_T },
  { name: 'orderType', type: 'uint8' }, { name: 'startTime', type: 'uint256' }, { name: 'endTime', type: 'uint256' }, { name: 'zoneHash', type: 'bytes32' }, { name: 'salt', type: 'uint256' }, { name: 'conduitKey', type: 'bytes32' }, { name: 'counter', type: 'uint256' }];
const BASIC_T = [{ name: 'considerationToken', type: 'address' }, { name: 'considerationIdentifier', type: 'uint256' }, { name: 'considerationAmount', type: 'uint256' }, { name: 'offerer', type: 'address' }, { name: 'zone', type: 'address' },
  { name: 'offerToken', type: 'address' }, { name: 'offerIdentifier', type: 'uint256' }, { name: 'offerAmount', type: 'uint256' }, { name: 'basicOrderType', type: 'uint8' }, { name: 'startTime', type: 'uint256' }, { name: 'endTime', type: 'uint256' },
  { name: 'zoneHash', type: 'bytes32' }, { name: 'salt', type: 'uint256' }, { name: 'offererConduitKey', type: 'bytes32' }, { name: 'fulfillerConduitKey', type: 'bytes32' }, { name: 'totalOriginalAdditionalRecipients', type: 'uint256' },
  { name: 'additionalRecipients', type: 'tuple[]', components: [{ name: 'amount', type: 'uint256' }, { name: 'recipient', type: 'address' }] }, { name: 'signature', type: 'bytes' }];
export const SEAPORT_ABI = [
  { type: 'function', name: 'cancel', stateMutability: 'nonpayable', inputs: [{ name: 'orders', type: 'tuple[]', components: ORDER_T }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'fulfillBasicOrder', stateMutability: 'payable', inputs: [tup('parameters', BASIC_T)], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'fulfillBasicOrder_efficient_6GL6yc', stateMutability: 'payable', inputs: [tup('parameters', BASIC_T)], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'getCounter', stateMutability: 'view', inputs: [{ name: 'offerer', type: 'address' }], outputs: [{ type: 'uint256' }] }
];
const CC_ABI = [{ type: 'function', name: 'getConduit', stateMutability: 'view', inputs: [{ name: 'conduitKey', type: 'bytes32' }], outputs: [{ name: 'conduit', type: 'address' }, { name: 'exists', type: 'bool' }] }];
const NFT_ABI = [{ type: 'function', name: 'isApprovedForAll', stateMutability: 'view', inputs: [{ name: 'a', type: 'address' }, { name: 'op', type: 'address' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'setApprovalForAll', stateMutability: 'nonpayable', inputs: [{ name: 'op', type: 'address' }, { name: 'ok', type: 'bool' }], outputs: [] }];

// ---- OpenSea API ----
async function os(path, { method = 'GET', body } = {}) {
  const r = await fetch(apiBase() + path, { method, headers: { 'x-api-key': apiKey(), accept: 'application/json', ...(body ? { 'content-type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(7000) });
  let j = null; try { j = await r.json(); } catch { }
  if (!r.ok) { const e = new Error('opensea ' + r.status + ': ' + JSON.stringify(j || {}).slice(0, 300)); e.status = r.status; e.body = j; throw e; }
  return j;
}
let slugC = null;
export async function slug() {
  if (clean(process.env.OPENSEA_COLLECTION)) return clean(process.env.OPENSEA_COLLECTION);
  if (slugC && slugC.c === cosContract()) return slugC.v;
  const j = await os(`/chain/${osChain()}/contract/${cosContract()}`); slugC = { c: cosContract(), v: j.collection }; return j.collection;
}
let feesC = null;
// the fees OpenSea requires on this collection (its own and any enforced creator earnings), as [{ bps, recipient }]
async function fees() {
  if (feesC && Date.now() - feesC.at < 10 * 60e3) return feesC.v;
  const j = await os(`/collections/${await slug()}`);
  const v = (j.fees || []).filter(f => f.required && f.recipient && Number(f.fee) > 0).map(f => ({ bps: Math.round(Number(f.fee) * 100), recipient: getAddress(f.recipient) }));
  feesC = { v, at: Date.now() }; return v;
}
export const openseaUrl = async () => 'https://opensea.io/collection/' + (await slug().catch(() => ''));

// Every active listing of the collection on OpenSea, cheapest first (cached briefly). Only listings of this contract.
let listC = null;
export async function listings({ fresh = false } = {}) {
  if (!fresh && listC && Date.now() - listC.at < 15e3) return listC.v;
  const out = []; let next = '', pages = 0; const s = await slug(), c = cosContract().toLowerCase(), now = Math.floor(Date.now() / 1000);
  do {
    const j = await os(`/listings/collection/${s}/all?limit=100${next ? '&next=' + encodeURIComponent(next) : ''}`);
    for (const l of j.listings || []) { const v = view(l, c, now); if (v) out.push(v); }
    next = j.next || ''; pages++;
  } while (next && pages < 5);
  out.sort((a, b) => (a.native === b.native ? 0 : a.native ? -1 : 1) || (BigInt(a.wei) < BigInt(b.wei) ? -1 : BigInt(a.wei) > BigInt(b.wei) ? 1 : 0));
  listC = { v: out, at: Date.now() }; return out;
}
export const dropListingCache = () => { listC = null; };
function view(l, c, now) {
  try {
    const p = l.protocol_data && l.protocol_data.parameters, it = p && p.offer && p.offer[0];
    if (!it || String(it.token).toLowerCase() !== c || Number(it.itemType) !== 3) return null;
    if (Number(p.endTime) && Number(p.endTime) < now) return null;
    const cos = keyOf(Number(it.identifierOrCriteria)); if (!cos) return null;
    const cur = (l.price && l.price.current) || {}, native = !cur.currency || cur.currency === 'ETH';
    const wei = String(cur.value || p.consideration.reduce((a, x) => a + BigInt(Number(x.itemType) === 0 ? x.startAmount : 0), 0n));
    return { hash: l.order_hash, cos, id: Number(it.identifierOrCriteria), maker: getAddress(p.offerer), wei, eth: native ? formatEther(BigInt(wei)) : null, currency: cur.currency || 'ETH', decimals: cur.decimals ?? 18, native, ends: Number(p.endTime) || 0 };
  } catch { return null; }
}

// ---- listing: build the order for the player's wallet to sign, then post it ----
async function conduit() { const [a, ok] = await client().readContract({ address: CONDUIT_CONTROLLER, abi: CC_ABI, functionName: 'getConduit', args: [OS_CONDUIT_KEY] }); if (!ok) throw new Error('no conduit'); return getAddress(a); }
export async function approvalTx(wallet) {
  const op = await conduit();
  if (await client().readContract({ address: cosContract(), abi: NFT_ABI, functionName: 'isApprovedForAll', args: [getAddress(wallet), op] })) return null;
  return { to: cosContract(), value: '0', data: encodeFunctionData({ abi: NFT_ABI, functionName: 'setApprovalForAll', args: [op, true] }), what: 'approve' };
}
export async function buildListing(wallet, cos, priceEth, days) {
  const price = parseEther(String(priceEth)), w = getAddress(wallet), f = await fees();
  const cut = f.map(x => ({ ...x, amount: price * BigInt(x.bps) / 10000n })), toSeller = price - cut.reduce((a, x) => a + x.amount, 0n);
  if (toSeller <= 0n) throw new Error('price too low');
  const counter = await client().readContract({ address: SEAPORT, abi: SEAPORT_ABI, functionName: 'getCounter', args: [w] });
  const now = Math.floor(Date.now() / 1000), eth = a => ({ itemType: 0, token: ZERO, identifierOrCriteria: '0', startAmount: a.toString(), endAmount: a.toString() });
  const parameters = {
    offerer: w, zone: ZERO, zoneHash: ZERO32, orderType: 0,
    offer: [{ itemType: 3, token: cosContract(), identifierOrCriteria: String(COSMETICS[cos].nft), startAmount: '1', endAmount: '1' }],
    consideration: [{ ...eth(toSeller), recipient: w }, ...cut.map(x => ({ ...eth(x.amount), recipient: x.recipient }))],
    startTime: String(now - 60), endTime: String(now + days * 86400), salt: BigInt('0x' + randomBytes(16).toString('hex')).toString(),
    conduitKey: OS_CONDUIT_KEY, counter: counter.toString(), totalOriginalConsiderationItems: 1 + cut.length
  };
  const { totalOriginalConsiderationItems, ...message } = parameters;
  return { parameters, typed: { domain: domain(), types: TYPES, primaryType: 'OrderComponents', message }, fees: cut.map(x => ({ bps: x.bps, eth: formatEther(x.amount) })), toSeller: formatEther(toSeller) };
}
// checks the signed order is exactly a listing of one of our cosmetics by this wallet, then posts it to OpenSea
export async function submitListing(wallet, parameters, signature) {
  const w = getAddress(wallet), p = parameters || {}, it = (p.offer || [])[0] || {};
  if (getAddress(p.offerer) !== w) throw Object.assign(new Error('not your listing'), { status: 403 });
  if (p.offer.length !== 1 || Number(it.itemType) !== 3 || getAddress(it.token) !== cosContract() || !keyOf(Number(it.identifierOrCriteria))) throw Object.assign(new Error('not a Lanternhold cosmetic'), { status: 400 });
  const { totalOriginalConsiderationItems, ...message } = p;
  const ok = await verifyTypedData({ address: w, domain: domain(), types: TYPES, primaryType: 'OrderComponents', message, signature });
  if (!ok) throw Object.assign(new Error('bad signature'), { status: 400 });
  const j = await os(`/orders/${osChain()}/seaport/listings`, { method: 'POST', body: { protocol_address: SEAPORT.toLowerCase(), parameters: p, signature } });
  listC = null; return { hash: (j && j.order && j.order.order_hash) || (j && j.order_hash) || null };
}

// ---- delisting: an on-chain Seaport cancel of the order, sent by its maker ----
export async function cancelTx(wallet, hash) {
  const j = await os(`/orders/chain/${osChain()}/protocol/${SEAPORT.toLowerCase()}/${hash}`), o = j.order || j, p = o.protocol_data && o.protocol_data.parameters;
  if (!p || getAddress(p.offerer) !== getAddress(wallet)) throw Object.assign(new Error('not your listing'), { status: 403 });
  const B = v => BigInt(v);
  const order = { offerer: getAddress(p.offerer), zone: getAddress(p.zone), offer: p.offer.map(i => ({ itemType: Number(i.itemType), token: getAddress(i.token), identifierOrCriteria: B(i.identifierOrCriteria), startAmount: B(i.startAmount), endAmount: B(i.endAmount) })),
    consideration: p.consideration.map(i => ({ itemType: Number(i.itemType), token: getAddress(i.token), identifierOrCriteria: B(i.identifierOrCriteria), startAmount: B(i.startAmount), endAmount: B(i.endAmount), recipient: getAddress(i.recipient) })),
    orderType: Number(p.orderType), startTime: B(p.startTime), endTime: B(p.endTime), zoneHash: p.zoneHash, salt: B(p.salt), conduitKey: p.conduitKey, counter: B(p.counter ?? 0) };
  listC = null;
  return { to: SEAPORT, value: '0', data: encodeFunctionData({ abi: SEAPORT_ABI, functionName: 'cancel', args: [[order]] }), what: 'cancel' };
}

// ---- buying ("sniping"): OpenSea's fulfillment data for this wallet, as a ready transaction ----
export async function buyTx(wallet, hash) {
  const j = await os('/listings/fulfillment_data', { method: 'POST', body: { listing: { hash, chain: osChain(), protocol_address: SEAPORT.toLowerCase() }, fulfiller: { address: getAddress(wallet) } } });
  const t = j && j.fulfillment_data && j.fulfillment_data.transaction, fn = t && String(t.function || '');
  if (!t || getAddress(t.to) !== SEAPORT) throw Object.assign(new Error('unexpected fulfillment'), { status: 502 });
  const name = /^fulfillBasicOrder_efficient_6GL6yc/.test(fn) ? 'fulfillBasicOrder_efficient_6GL6yc' : /^fulfillBasicOrder\(/.test(fn) ? 'fulfillBasicOrder' : null;
  if (!name) throw Object.assign(new Error('this listing can only be bought on OpenSea'), { status: 409, code: 'opensea_only' });
  const q = t.input_data.parameters, B = v => BigInt(v);
  if (getAddress(q.offerToken) !== cosContract()) throw Object.assign(new Error('not a Lanternhold cosmetic'), { status: 400 });
  const args = { considerationToken: getAddress(q.considerationToken), considerationIdentifier: B(q.considerationIdentifier), considerationAmount: B(q.considerationAmount), offerer: getAddress(q.offerer), zone: getAddress(q.zone),
    offerToken: getAddress(q.offerToken), offerIdentifier: B(q.offerIdentifier), offerAmount: B(q.offerAmount), basicOrderType: Number(q.basicOrderType), startTime: B(q.startTime), endTime: B(q.endTime), zoneHash: q.zoneHash,
    salt: B(q.salt), offererConduitKey: q.offererConduitKey, fulfillerConduitKey: q.fulfillerConduitKey, totalOriginalAdditionalRecipients: B(q.totalOriginalAdditionalRecipients),
    additionalRecipients: (q.additionalRecipients || []).map(r => ({ amount: B(r.amount), recipient: getAddress(r.recipient) })), signature: q.signature };
  if (getAddress(args.considerationToken) !== ZERO) throw Object.assign(new Error('this listing can only be bought on OpenSea'), { status: 409, code: 'opensea_only' });   // priced in a token, not ETH
  listC = null;
  return { to: SEAPORT, value: String(t.value), data: encodeFunctionData({ abi: SEAPORT_ABI, functionName: name, args: [args] }), what: 'buy', cos: keyOf(Number(args.offerIdentifier)), eth: formatEther(B(t.value)) };
}
