// What the server knows about a hero's cosmetic NFTs, for saves, the realtime pass and the Cosmetics tab:
//   minted: cosmetics this hero turned into tokens (they've left the hero), held: cosmetics their wallet holds as tokens.
// Holdings are re-read on-chain when they're over 2 minutes old (never holding a save up for long).
import { db } from './db.js';
import { cosNftLive, holdings } from './cosnft.js';

export async function cosState(accountId, wallet, { fresh = false } = {}) {
  let mints, h;
  try { [mints, h] = await Promise.all([db().cosMints(accountId), db().cosHeld(accountId)]); } catch { return null; }   // supabase/cosmetics-nft.sql not run yet
  let held = h.held || {};
  if (cosNftLive() && wallet && (fresh || Date.now() - h.at > 2 * 60e3)) {
    const v = await Promise.race([holdings(wallet).catch(() => null), new Promise(r => setTimeout(() => r(null), fresh ? 3000 : 2000))]);
    if (v) { held = v; await db().cosHeldSet(accountId, v).catch(() => { }); }
  }
  if (!wallet) held = {};
  return { mints, minted: [...new Set(mints.map(m => m.cos))], held: Object.keys(held), heldMap: held };
}
// the sanitize option: from the database, or (if that can't be read) what the stored save already says
export const cosxFor = (st, raw) => st || { minted: (raw && raw.cos && raw.cos.out) || [], held: (raw && raw.cos && raw.cos.held) || [] };
