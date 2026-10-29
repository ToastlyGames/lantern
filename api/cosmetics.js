// Cosmetic NFTs (Season 1). See lib/cosnft.js and contracts/LanternCosmetics.sol.
//  GET  /api/cosmetics                      your cosmetic tokens: on/off, the contract, what your wallet holds, your mints
//  POST /api/cosmetics {action:'mint', cos}       turn a cosmetic you earned into a token: it leaves your hero, and you
//                                                 get a voucher for your wallet to send (gas only)
//  POST /api/cosmetics {action:'voucher', mintId} a fresh voucher for a mint you started (same mintId: it still mints once)
//  POST /api/cosmetics {action:'cancel', mintId}  give up a mint that never landed: the cosmetic comes back to your hero
//                                                 (only once its last voucher has expired unused)
//  POST /api/cosmetics {action:'sync', tx?}       after the mint lands: mark it done and re-read what your wallet holds
// Public (no sign-in), for wallets and marketplaces:
//  GET  /api/cosmetics?id=N           token metadata      GET /api/cosmetics?contract=1   collection metadata
import { db } from '../lib/db.js';
import { guard, send, fail, body, appDomain } from '../lib/http.js';
import { sanitize } from '../lib/validate.js';
import { COSMETICS } from '../lib/gamedata.js';
import { cosNftOn, cosNftLive, cosContract, chainId, voucher, newMintId, usedOnChain, pausedOnChain, waitTx, meta, contractMeta, VOUCHER_MS, CANCEL_GRACE_MS } from '../lib/cosnft.js';
import { cosState, cosxFor } from '../lib/cosx.js';

const origin = req => 'https://' + (appDomain(req) || 'lanternhold.fun');

export default async function handler(req, res) {
  const q = new URL(req.url, 'http://x').searchParams;
  if (req.method === 'GET' && (q.has('id') || q.has('contract'))) return publicMeta(req, res, q);
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    const d = db(), st = await d.state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero || !st.save) return fail(res, 404, 'no_hero');
    const b = req.method === 'POST' ? ((await body(req)) || {}) : {};
    if (b.action === 'sync' && typeof b.tx === 'string' && /^0x[0-9a-fA-F]{64}$/.test(b.tx) && cosNftLive()) await waitTx(b.tx);
    let cs = await cosState(s.accountId, st.wallet, { fresh: req.method === 'POST' });
    if (!cs) return send(res, 200, { on: false, live: false });   // supabase/cosmetics-nft.sql not run yet
    // mints that landed on-chain are done (checked whenever the hero has one pending)
    if (cosNftLive() && cs.mints.some(m => m.status === 'pending')) {
      for (const m of cs.mints) if (m.status === 'pending') { try { if (await usedOnChain(m.mint_id)) { await d.cosMintSet(m.mint_id, { status: 'done' }); m.status = 'done'; } } catch { } }
    }
    const view = () => ({ on: cosNftOn(), live: cosNftLive(), contract: cosContract(), chainId: chainId(), wallet: st.wallet || null, held: cs.heldMap,
      mints: cs.mints.map(m => ({ mintId: m.mint_id, cos: m.cos, status: m.status, wallet: m.wallet, deadline: m.deadline })) });
    if (req.method === 'GET' || b.action === 'sync') return send(res, 200, view());

    if (!cosNftOn()) return fail(res, 409, 'not_open', { msg: 'Turning cosmetics into NFTs opens in Season 1.' });
    if (!st.wallet) return fail(res, 409, 'no_wallet', { msg: 'Connect a wallet to your hero first (Hero screen). The NFT is minted to it.' });
    try { if (await pausedOnChain()) return fail(res, 409, 'paused', { msg: 'Minting is paused for a moment. Try again soon.' }); } catch { }
    const now = Date.now();
    if (b.action === 'mint') {
      const k = typeof b.cos === 'string' && COSMETICS[b.cos] && COSMETICS[b.cos].nft ? b.cos : null;
      if (!k) return fail(res, 400, 'bad_cosmetic');
      const save = sanitize(st.save.data, { admin: !!st.hero.is_admin, hat: st.hero.hat, cosx: cosxFor(cs, st.save.data) });
      if (cs.minted.includes(k)) return fail(res, 409, 'already', { msg: 'You’ve already turned your ' + COSMETICS[k].n + ' into an NFT.' });
      if (!save.cos.own.includes(k)) return fail(res, 409, 'not_yours', { msg: 'Your hero doesn’t have a ' + COSMETICS[k].n + ' to turn into an NFT.' });
      const mintId = newMintId(), deadline = now + VOUCHER_MS;
      try { await d.cosMintAdd({ mint_id: mintId, account_id: s.accountId, cos: k, wallet: st.wallet, deadline }); }   // from here on, the cosmetic has left the hero
      catch { return fail(res, 409, 'already', { msg: 'That mint has already started. Open your Cosmetics tab again.' }); }   // (one of each per hero: a double tap can't make two)
      console.log(`cosmetic mint ${mintId}: ${st.hero.name} ${k}`);
      return send(res, 200, Object.assign({ voucher: await voucher(st.wallet, k, mintId, deadline) }, view(), { mints: [...view().mints, { mintId, cos: k, status: 'pending', wallet: st.wallet, deadline }] }));
    }
    const m = typeof b.mintId === 'string' ? cs.mints.find(x => x.mint_id === b.mintId) : null;
    if (b.action === 'voucher') {
      if (!m) return fail(res, 404, 'no_mint');
      if (m.status === 'done') return fail(res, 409, 'done', { msg: 'That NFT has already been minted.' });
      const deadline = now + VOUCHER_MS;
      await d.cosMintSet(m.mint_id, { deadline, wallet: st.wallet });
      return send(res, 200, { voucher: await voucher(st.wallet, m.cos, m.mint_id, deadline) });
    }
    if (b.action === 'cancel') {
      if (!m) return fail(res, 404, 'no_mint');
      if (m.status === 'done') return fail(res, 409, 'done', { msg: 'That NFT has already been minted.' });
      // a voucher that could still be sent would mint the token after the cosmetic came back: wait until it expires
      if (now <= m.deadline + CANCEL_GRACE_MS) return fail(res, 409, 'wait', { msg: 'The last mint pass is still valid. You can cancel ' + Math.max(1, Math.ceil((m.deadline + CANCEL_GRACE_MS - now) / 60e3)) + ' minutes from now.', at: m.deadline + CANCEL_GRACE_MS });
      let landed = true; try { landed = await usedOnChain(m.mint_id); } catch { return fail(res, 503, 'chain', { msg: 'Couldn’t check Robinhood Chain. Try again in a moment.' }); }
      if (landed) { await d.cosMintSet(m.mint_id, { status: 'done' }); return fail(res, 409, 'done', { msg: 'That NFT was minted after all. It’s in your wallet.' }); }
      await d.cosMintDel(m.mint_id);
      cs = await cosState(s.accountId, st.wallet);
      return send(res, 200, view());
    }
    fail(res, 400, 'bad_action');
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}

function publicMeta(req, res, q) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Content-Type', 'application/json');
    if (q.has('contract')) { res.statusCode = 200; res.setHeader('Cache-Control', 'public, max-age=3600'); return res.end(JSON.stringify(contractMeta(origin(req)))); }
    const id = Number(q.get('id')), m = Number.isInteger(id) && id >= 1 && id <= 1e6 ? meta(id, origin(req)) : null;
    if (!m) return fail(res, 404, 'not_found');
    res.statusCode = 200; res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400'); res.end(JSON.stringify(m));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
