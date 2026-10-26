// Token rewards.  GET /api/rewards: your balance, today's share and the pool.
// POST /api/rewards { action: 'voucher' }: a signed claim for everything you've earned, for your wallet to send.
// POST /api/rewards { action: 'sync', tx }: after a claim lands, update your balance (and the pool) from the vault.
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { rewardsOn, split } from '../lib/rewards.js';
import { claimsOn, claimContract, chainId, claimMin, claimMinLevel, voucher, onChain, waitTx, vaultBalance } from '../lib/claim.js';
import { getAddress } from 'viem';

const info = () => claimsOn() ? { contract: claimContract(), chainId: chainId(), min: claimMin(), minLevel: claimMinLevel() } : null;

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    if (!rewardsOn()) return send(res, 200, { on: false });
    const st = await db().state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    if (st.hero.is_admin) return send(res, 200, { on: true, admin: true });
    if (req.method === 'GET') return send(res, 200, { on: true, claims: info(), tok: await db().tok(s.accountId, await vaultBalance()) });

    const b = (await body(req)) || {};
    if (!claimsOn()) return fail(res, 409, 'claims_off', { msg: 'Claiming isn’t open yet.' });
    if (!st.wallet) return fail(res, 409, 'no_wallet', { msg: 'Connect a wallet to your hero first (Hero screen), then claim to it.' });
    const wallet = getAddress(st.wallet);

    if (b.action === 'sync') {
      if (typeof b.tx === 'string' && /^0x[0-9a-fA-F]{64}$/.test(b.tx)) await waitTx(b.tx);
      const c = await onChain(wallet);
      await db().tokSync(s.accountId, c.claimed, c.totalGross);
      return send(res, 200, { ok: true, tok: await db().tok(s.accountId, await vaultBalance()) });
    }
    if (b.action !== 'voucher') return fail(res, 400, 'bad_action');
    const lvl = st.save && st.save.data ? st.save.data.lvl | 0 : 0;
    if (lvl < claimMinLevel()) return fail(res, 409, 'level', { msg: `Reach combat level ${claimMinLevel()} to claim.` });
    // what the vault has already paid this wallet counts first, so the balance is always right
    const c = await onChain(wallet);
    if (c.paused) return fail(res, 409, 'paused', { msg: 'Claims are paused for a moment. Try again soon.' });
    await db().tokSync(s.accountId, c.claimed, c.totalGross);
    const r = await db().claim(s.accountId, wallet.toLowerCase(), claimMin());
    if (r.error === 'too_small') return fail(res, 409, 'too_small', { msg: `You can claim once you have ${claimMin()} or more.` });
    if (r.error === 'wallet_locked') return fail(res, 409, 'wallet_locked', { msg: 'Rewards for this hero go to the wallet you first claimed with: ' + r.wallet });
    if (r.error === 'wallet_taken') return fail(res, 409, 'wallet_taken', { msg: 'That wallet already claims rewards for another hero.' });
    if (r.error) return fail(res, 409, r.error);
    const gross = Math.round((+r.total - c.claimed) * 100) / 100;
    if (gross <= 0) return fail(res, 409, 'nothing', { msg: 'Nothing new to claim yet.' });
    const v = await voucher(wallet, +r.total);
    send(res, 200, Object.assign({ wallet, gross }, split(gross), v));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
