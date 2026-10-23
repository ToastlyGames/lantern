// What the client gets back after sign-in or on load: wallet, hero and the latest server save (one database call).
import { db } from './db.js';
import { sanitize } from './validate.js';

export async function mePayload(accountId) {
  const st = await db().state(accountId);
  if (!st || st.banned) return null;
  if (!st.hero) return { wallet: st.wallet, hero: null, save: null };
  const admin = !!st.hero.is_admin;
  return {
    wallet: st.wallet,
    hero: { name: st.hero.name, look: st.hero.look, admin },
    save: st.save ? { data: sanitize(st.save.data, { admin }), rev: st.save.rev } : null
  };
}
