// What the client gets back after sign-in or on load: wallet, hero and the latest server save (one database call).
import { db } from './db.js';
import { sanitize } from './validate.js';
import { xEnabled } from './x.js';
import { googleEnabled } from './google.js';
import { rewardsOn } from './rewards.js';
import { vaultBalance } from './claim.js';

export async function mePayload(accountId) {
  const st = await db().state(accountId);
  if (!st || st.banned) return null;
  if (!st.hero) return { account: true, wallet: st.wallet, google: st.google || null, hero: null, save: null, xEnabled: xEnabled(), googleEnabled: googleEnabled() };
  const admin = !!st.hero.is_admin;
  let tok = null;
  if (rewardsOn()) { try { tok = await db().tok(accountId, await vaultBalance()); } catch (e) { console.error('rewards', e.message || e); } }
  return {
    account: true,
    wallet: st.wallet,
    google: st.google || null,
    googleEnabled: googleEnabled(),
    hero: { name: st.hero.name, look: st.hero.look, admin, hat: admin ? (st.hero.hat || 'partyhat') : null, x: st.hero.x || null },
    xEnabled: xEnabled(),
    tok,
    save: st.save ? { data: sanitize(st.save.data, { admin, hat: st.hero.hat }), rev: st.save.rev } : null
  };
}
