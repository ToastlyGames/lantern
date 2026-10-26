// GET /api/rt-ticket: a short-lived pass for the realtime server (players, chat, parties). Needs a hero.
import { db } from '../lib/db.js';
import { guard, send, fail } from '../lib/http.js';
import { rtEnabled, rtUrl, rtTicket } from '../lib/rt.js';
import { mintOpen, isHolder } from '../lib/founders.js';

// Holds a Founder's Lantern? (Lights the Founder's Flame, which the realtime server only shows for holders.)
// Uses the saved answer, re-checked on-chain when it's over 30 minutes old (never holding up the pass for long).
async function founder(accountId, wallet) {
  try {
    const f = await db().founder(accountId);
    if (!mintOpen() || !wallet || Date.now() - f.at < 30 * 60e3) return f.holder;
    const v = await Promise.race([isHolder(wallet), new Promise(r => setTimeout(() => r(null), 2500))]);
    if (v === null) return f.holder;
    await db().founderSet(accountId, v); return v;
  } catch { return false; }
}

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET'] });
  if (!s) return;
  if (!rtEnabled()) return send(res, 200, { url: null });
  try {
    const st = await db().state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    send(res, 200, { url: rtUrl(), ticket: await rtTicket(st.hero, { muted: !!st.muted, founder: st.hero.is_admin || await founder(s.accountId, st.wallet) }) });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
