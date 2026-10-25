// Admin moderation.  GET /api/admin/mod?name=X: a player's status.  POST /api/admin/mod { name, action }:
//   kick   - nothing stored: the realtime server disconnects them and their game signs them out. They can sign straight back in.
//   mute / unmute - stored on their account, so a mute lasts until an admin unmutes them (chat is blocked by the realtime server).
//   ban    - 3 strikes: 24 hours, 72 hours, then permanent. Per account (wallet or Google), not per IP.
// Only admins can call it, and admins can't be moderated.
import { db } from '../../lib/db.js';
import { guard, send, fail, body } from '../../lib/http.js';
import { banOf, nextBan } from '../../lib/mod.js';

const ACTIONS = new Set(['kick', 'mute', 'unmute', 'ban']);
const status = (t, row = t.row) => ({ name: t.name, muted: !!row.muted, strikes: row.ban_count | 0, ban: banOf(row) });

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    const me = await db().state(s.accountId);
    if (!me || me.banned || !me.hero || !me.hero.is_admin) return fail(res, 403, 'not_admin');
    const b = req.method === 'POST' ? (await body(req)) || {} : {};
    const name = String((req.method === 'POST' ? b.name : new URL(req.url, 'http://x').searchParams.get('name')) || '').trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(name)) return fail(res, 400, 'bad_name');
    let t;
    try { t = await db().modTarget(name.toLowerCase()); }
    catch (e) { console.error(e); return fail(res, 500, 'needs_setup', { msg: 'Run supabase/moderation.sql in Supabase first.' }); }
    if (!t) return fail(res, 404, 'no_such_player');
    if (t.accountId === s.accountId) return fail(res, 400, 'self');
    if (t.admin) return fail(res, 403, 'is_admin');
    if (!('muted' in t.row) && req.method === 'POST' && b.action !== 'kick') return fail(res, 500, 'needs_setup', { msg: 'Run supabase/moderation.sql in Supabase first.' });
    if (req.method === 'GET') return send(res, 200, status(t));

    const action = String(b.action || '');
    if (!ACTIONS.has(action)) return fail(res, 400, 'bad_action');
    const row = Object.assign({}, t.row);
    if (action === 'mute' || action === 'unmute') { row.muted = action === 'mute'; await db().modSet(t.accountId, { muted: row.muted }); }
    if (action === 'ban') {
      if (banOf(row)) return fail(res, 409, 'already_banned', { status: status(t) });
      const nb = nextBan(row.ban_count);
      Object.assign(row, { ban_count: nb.strikes, banned_until: nb.until, banned: nb.perm });
      await db().modSet(t.accountId, { ban_count: nb.strikes, banned_until: nb.until, banned: nb.perm });
    }
    console.log(`mod: ${me.hero.name} ${action} ${t.name}`);
    send(res, 200, Object.assign({ ok: true, action, id: t.name.toLowerCase() }, status(t, row)));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
