// GET  /api/friends                         → { friends: [{ name, x }], incoming: [name], outgoing: [name] }
// POST /api/friends { action, name }        → add | accept | decline | cancel | remove   (players are named by hero name)
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { NAME_RE } from '../lib/names.js';

const ACTIONS = new Set(['add', 'accept', 'decline', 'cancel', 'remove']);
const MSG = { no_such_player: 'No hero has that name.', self: 'That’s you!', too_many_friends: 'Your friend list is full (200).', too_many_requests: 'You have too many requests waiting. Cancel some first.', no_request: 'That request is gone.' };

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    const d = db(), st = await d.state(s.accountId);
    if (!st || st.banned || !st.hero) return fail(res, 403, 'no_hero');
    if (req.method === 'GET') return send(res, 200, await d.friendsList(s.accountId));
    const b = (await body(req)) || {};
    if (!ACTIONS.has(b.action) || typeof b.name !== 'string' || !NAME_RE.test(b.name)) return fail(res, 400, 'bad_request');
    const r = await d.friend(s.accountId, b.action, b.name);
    if (r.error) return fail(res, r.error === 'no_such_player' ? 404 : 400, r.error, { msg: MSG[r.error] || 'That didn’t work.' });
    send(res, 200, { state: r.state, list: await d.friendsList(s.accountId) });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
