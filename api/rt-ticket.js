// GET /api/rt-ticket: a short-lived pass for the realtime server (players, chat, parties). Needs a hero.
import { db } from '../lib/db.js';
import { guard, send, fail } from '../lib/http.js';
import { rtEnabled, rtUrl, rtTicket } from '../lib/rt.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET'] });
  if (!s) return;
  if (!rtEnabled()) return send(res, 200, { url: null });
  try {
    const st = await db().state(s.accountId);
    if (!st || st.banned) return fail(res, 403, 'banned');
    if (!st.hero) return fail(res, 404, 'no_hero');
    send(res, 200, { url: rtUrl(), ticket: await rtTicket(st.hero, { muted: !!st.muted }) });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
