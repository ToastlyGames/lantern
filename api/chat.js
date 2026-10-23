// Chat for players on the same map. Channels: 'hold' or 'f1'…'f15' (a Depths floor).
// GET  /api/chat?ch=hold&after=<last id>  → { messages: [{ id, name, text, at, me }] } (last hour, up to 50)
// POST /api/chat { ch, text }              → { id, name, text }  (429 slow-mode, 403 banned, 404 no hero)
import { db } from '../lib/db.js';
import { guard, send, fail, body } from '../lib/http.js';
import { cleanChat, CHAT_CHANNEL } from '../lib/names.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['GET', 'POST'] });
  if (!s) return;
  try {
    const d = db();
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://x'), ch = url.searchParams.get('ch') || '';
      const after = Math.max(0, Math.floor(Number(url.searchParams.get('after')) || 0));
      if (!CHAT_CHANNEL.test(ch)) return fail(res, 400, 'bad_channel');
      const rows = await d.chatList(ch, after);
      return send(res, 200, { messages: rows.map(m => ({ id: Number(m.id), name: m.name, text: m.text, at: m.at, me: m.account_id === s.accountId })) });
    }
    const b = await body(req);
    const ch = b && typeof b.ch === 'string' ? b.ch : '';
    if (!CHAT_CHANNEL.test(ch)) return fail(res, 400, 'bad_channel');
    const text = cleanChat(b.text);
    if (!text) return fail(res, 400, 'empty');
    const r = await d.chatPost(s.accountId, ch, text);
    if (r.error === 'too_fast') return fail(res, 429, 'too_fast', { retryAfter: 1.2 });
    if (r.error === 'banned') return fail(res, 403, 'banned');
    if (r.error) return fail(res, 404, r.error);
    send(res, 200, { id: Number(r.id), name: r.name, text });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
