// The Lantern Exchange (Season 1): trade Lanternhold cosmetic NFTs on OpenSea from inside the game. See lib/opensea.js.
//  GET  /api/market                         is it open, the listings (cheapest first), the floor of each cosmetic, yours
//  POST /api/market {action:'list', cos, price, days}   an order for your wallet to sign (+ a one-time approval if needed)
//  POST /api/market {action:'submit', parameters, signature}   post your signed listing to OpenSea
//  POST /api/market {action:'delist', hash}  the transaction that cancels your listing (your wallet sends it)
//  POST /api/market {action:'buy', hash}     the transaction that buys that listing
//  POST /api/market {action:'snipe', cos?}   the cheapest listing (of that cosmetic, or of the whole collection) and the
//                                            transaction that buys it, to confirm in the game
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { COSMETICS } from '../lib/gamedata.js';
import { cosContract, chainId } from '../lib/cosnft.js';
import { cosState } from '../lib/cosx.js';
import { marketOn, listings, buildListing, submitListing, cancelTx, buyTx, approvalTx, openseaUrl, DAYS, SEAPORT } from '../lib/opensea.js';

const why = e => ({ msg: e.code === 'opensea_only' ? 'That listing is priced in a token, not ETH. You can buy it on OpenSea.' : e.status === 403 ? 'That isn’t your listing.' : 'OpenSea didn’t answer. Try again in a moment.' });

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    if (!marketOn()) return send(res, 200, { on: false });
    const st = await db().state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    const wallet = st.wallet || null, me = wallet ? wallet.toLowerCase() : '';
    const b = req.method === 'POST' ? ((await body(req)) || {}) : {};
    if (req.method === 'GET') {
      let all = []; try { all = await listings(); } catch (e) { console.error('market', e.message); return send(res, 200, { on: true, down: true, contract: cosContract() }); }
      const floor = {}; for (const l of all) if (l.native && !floor[l.cos]) floor[l.cos] = { eth: l.eth, hash: l.hash };
      const cs = await cosState(s.accountId, wallet, { fresh: true });
      return send(res, 200, { on: true, contract: cosContract(), seaport: SEAPORT, chainId: chainId(), wallet, url: await openseaUrl(), days: DAYS, held: cs ? cs.heldMap : {},
        listings: all.slice(0, 200).map(l => ({ ...l, mine: l.maker.toLowerCase() === me })), floor });
    }
    if (!wallet) return fail(res, 409, 'no_wallet', { msg: 'Connect a wallet to your hero first (Hero screen).' });
    try {
      if (b.action === 'list') {
        const k = typeof b.cos === 'string' && COSMETICS[b.cos] && COSMETICS[b.cos].nft ? b.cos : null, price = String(b.price || '').trim(), days = Number(b.days);
        if (!k) return fail(res, 400, 'bad_cosmetic');
        if (!/^\d{1,7}(\.\d{1,18})?$/.test(price) || Number(price) <= 0) return fail(res, 400, 'bad_price', { msg: 'Enter a price in ETH, like 0.01.' });
        if (!DAYS.includes(days)) return fail(res, 400, 'bad_days');
        const cs = await cosState(s.accountId, wallet, { fresh: true });
        if (!cs || !cs.heldMap[k]) return fail(res, 409, 'not_held', { msg: 'Your wallet doesn’t hold a ' + COSMETICS[k].n + ' NFT.' });
        const all = await listings({ fresh: true }), mine = all.filter(l => l.cos === k && l.maker.toLowerCase() === me).length;
        if (mine >= cs.heldMap[k]) return fail(res, 409, 'listed', { msg: 'Every ' + COSMETICS[k].n + ' you hold is already listed. Delist one to change its price.' });
        return send(res, 200, { approval: await approvalTx(wallet), ...(await buildListing(wallet, k, price, days)) });
      }
      if (b.action === 'submit') return send(res, 200, { ok: true, ...(await submitListing(wallet, b.parameters, b.signature)) });
      const hash = typeof b.hash === 'string' && /^0x[0-9a-fA-F]{64}$/.test(b.hash) ? b.hash : null;
      if (b.action === 'delist') { if (!hash) return fail(res, 400, 'bad_hash'); return send(res, 200, { tx: await cancelTx(wallet, hash) }); }
      if (b.action === 'buy') { if (!hash) return fail(res, 400, 'bad_hash'); return send(res, 200, { tx: await buyTx(wallet, hash) }); }
      if (b.action === 'snipe') {
        const k = typeof b.cos === 'string' && COSMETICS[b.cos] ? b.cos : null;
        const l = (await listings({ fresh: true })).find(x => x.native && (!k || x.cos === k) && x.maker.toLowerCase() !== me);
        if (!l) return fail(res, 404, 'none', { msg: k ? 'Nobody is selling a ' + COSMETICS[k].n + ' right now.' : 'Nothing is for sale right now.' });
        return send(res, 200, { listing: l, tx: await buyTx(wallet, l.hash) });
      }
    } catch (e) { console.error('market', e.message); return fail(res, e.status && e.status < 500 ? e.status : 502, e.code || 'opensea', why(e)); }
    fail(res, 400, 'bad_action');
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
