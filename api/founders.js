// The Founder's Lantern (2,222 free NFTs on Robinhood Chain: 1,222 open, 1,000 held for X giveaway winners). See lib/founders.js.
//  GET  /api/founders                 your hero number, your spot (open, or reserved for a giveaway winner), and the mint's state
//  POST /api/founders {action:'voucher'}   a signed mint for your hero number, for your wallet to send
//  POST /api/founders {action:'sync', tx}  after the mint lands: re-check that your wallet holds it
// Public (no sign-in), for wallets and marketplaces:
//  GET  /api/founders?id=N            token metadata    GET /api/founders?img=N   the token's image (SVG)
//  GET  /api/founders?contract=1      collection metadata
import { db } from '../lib/db.js';
import { guard, send, fail, body, appDomain } from '../lib/http.js';
import { foundersContract, foundersMinLevel, canMint, serverLevelCheck, FOUNDERS_SUPPLY, mintOpen, chainId, chainState, voucher, waitTx, svg, meta, contractMeta } from '../lib/founders.js';
import { getAddress } from 'viem';

const origin = req => 'https://' + (appDomain(req) || 'lanternhold.fun');
const idOf = v => { const n = Number(v); return Number.isInteger(n) && n >= 1 && n <= 1e7 ? n : null; };

export default async function handler(req, res) {
  const q = new URL(req.url, 'http://x').searchParams;
  if (req.method === 'GET' && (q.has('id') || q.has('img') || q.has('contract'))) return publicMeta(req, res, q);
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    const st = await db().state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    let f; try { f = await db().founder(s.accountId); } catch { return send(res, 200, { on: false }); }   // the SQL hasn't been run yet
    if (!f.no) return send(res, 200, { on: false });
    // every hero can mint; the game asks for combat level minLvl first (the server only checks it if FOUNDERS_SERVER_LEVEL=1)
    const listed = canMint(f.no), minLvl = foundersMinLevel(), lvl = st.save && st.save.data ? st.save.data.lvl | 0 : 0;
    const base = { on: true, no: f.no, supply: FOUNDERS_SUPPLY, reserved: !!f.reserved, listed, minLvl, lvl, ready: listed && lvl >= minLvl, open: mintOpen(), contract: foundersContract(), chainId: chainId(), wallet: st.wallet || null };

    if (req.method === 'GET') {
      if (!mintOpen()) return send(res, 200, base);
      let c = null; try { c = await chainState(f.no, st.wallet); } catch (e) { console.error('founders chain', e.message); }
      if (c && c.holder !== f.holder) await db().founderSet(s.accountId, c.holder);
      return send(res, 200, Object.assign(base, { chain: c, holder: c ? c.holder : f.holder }));
    }

    const b = (await body(req)) || {};
    if (!mintOpen()) return fail(res, 409, 'not_open', { msg: 'The mint isn’t open yet. Your spot on the whitelist is saved.' });
    if (!st.wallet) return fail(res, 409, 'no_wallet', { msg: 'Connect a wallet to your hero first (Hero screen), then mint to it.' });
    const wallet = getAddress(st.wallet);
    if (b.action === 'sync') {
      if (typeof b.tx === 'string' && /^0x[0-9a-fA-F]{64}$/.test(b.tx)) await waitTx(b.tx);
      const c = await chainState(f.no, wallet);
      await db().founderSet(s.accountId, c.holder);
      return send(res, 200, Object.assign(base, { chain: c, holder: c.holder }));
    }
    if (b.action !== 'voucher') return fail(res, 400, 'bad_action');
    if (!canMint(f.no)) return fail(res, 409, 'not_listed', { msg: 'Your hero doesn’t have a number yet.' });
    if (serverLevelCheck() && lvl < minLvl) return fail(res, 409, 'level', { msg: `Reach combat level ${minLvl} to lock in your whitelist spot. You’re level ${lvl}.` });
    const c = await chainState(f.no, wallet);
    if (c.paused) return fail(res, 409, 'paused', { msg: 'Minting is paused for a moment. Try again soon.' });
    if (c.ended) return fail(res, 409, 'ended', { msg: 'The Founder’s Lantern mint has ended.' });
    if (c.taken) return fail(res, 409, 'taken', { msg: `Founder’s Lantern #${f.no} has already been minted.` });
    if (c.walletUsed) return fail(res, 409, 'wallet_used', { msg: 'This wallet has already minted a Founder’s Lantern.' });
    // a giveaway winner mints from the reserved pool (or the open pool, if the reserved one ran out); everyone else from the open pool
    const reserved = !!f.reserved && c.reservedLeft > 0;
    if (!reserved && c.openLeft <= 0) return fail(res, 409, 'sold_out', { msg: f.reserved ? 'Every Founder’s Lantern has been minted.' : 'All the open Founder’s Lanterns have been minted. The rest are held for giveaway winners.' });
    send(res, 200, Object.assign({ wallet, no: f.no }, await voucher(wallet, f.no, reserved)));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}

async function publicMeta(req, res, q) {
  try {
    if (q.has('img')) {
      const id = idOf(q.get('img')); if (!id) return fail(res, 404, 'not_found');
      res.statusCode = 200; res.setHeader('Content-Type', 'image/svg+xml'); res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
      return res.end(svg(id));
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (q.has('contract')) { res.statusCode = 200; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'public, max-age=3600'); return res.end(JSON.stringify(contractMeta(origin(req)))); }
    const id = idOf(q.get('id')); if (!id) return fail(res, 404, 'not_found');
    let hero = null; try { hero = await db().heroByNo(id); } catch { }
    res.statusCode = 200; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=3600');
    res.end(JSON.stringify(meta(id, origin(req), hero)));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
