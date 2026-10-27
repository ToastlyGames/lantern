// GET /api/rt-ticket: a short-lived pass for the realtime server (players, chat, parties). Needs a hero.
import { db } from '../lib/db.js';
import { guard, send, fail } from '../lib/http.js';
import { rtEnabled, rtUrl, rtTicket } from '../lib/rt.js';
import { mintOpen, isHolder } from '../lib/founders.js';
import { BUILD } from '../lib/build.js';

// '0.9.10' vs '0.9.4': compare version numbers part by part
export const older = (a, b) => { const x = String(a || '0').split('.').map(Number), y = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) < (y[i] || 0); } return false; };

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
    // a game left open from before an update plays by old rules (old map, no PvP): it has to reload before it can join
    const v = new URL(req.url, 'http://x').searchParams.get('v');
    if (!v || !/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v) || older(v, BUILD.minClient)) return fail(res, 426, 'update', { version: BUILD.version, msg: 'A new version of Lanternhold is out. Reload to keep playing.' });
    send(res, 200, { url: rtUrl(), ticket: await rtTicket(st.hero, { muted: !!st.muted, founder: st.hero.is_admin || await founder(s.accountId, st.wallet), v }) });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
