// Lanternhold realtime server (Cloudflare Workers + Durable Objects).
//
//   /lobby?t=TICKET        one global Lobby: who's online, friend status, parties, invites, picking a world, the world feed
//   /room/w3?t=TICKET      a Hold world (up to 50 players): positions, looks, chat
//   /room/d-xxxx?t=TICKET  a dungeon instance (solo or one party): the same, plus relaying the host's monsters
//
// TICKET is a 2-minute HS256 token from the game's /api/rt-ticket, signed with RT_SECRET (shared with Vercel).
// Every message is JSON. The server never trusts names from clients: the hero name comes from the ticket.

// The oldest game version allowed in (keep in step with BUILD.minClient in client-src/changelog.js). A tab left open
// from before an update plays by old rules (an old map, no PvP), so it's turned away and told to reload.
const MIN_CLIENT = '0.13.1';
const older = (a, b) => { const x = String(a || '0').split('.').map(Number), y = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) < (y[i] || 0); } return false; };
const WORLD_CAP = 50, PARTY_MAX = 4, INVITE_MS = 90e3, OFFLINE_GRACE_MS = 120e3;
const ROOM_RE = /^(w[1-9][0-9]{0,2}|d-[a-z0-9]{12})$/;
const DIRS = new Set(['up', 'down', 'left', 'right']);
const BAD = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'nigg', 'fag', 'rape', 'nazi', 'hitler', 'porn', 'slut', 'whore', 'penis', 'vagina', 'retard', 'kkk', 'molest', 'pedo'];

// ---------- helpers ----------
const enc = new TextEncoder();
const b64uDecode = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
async function verifyTicket(token, secret) {
  if (!token || !secret || token.length > 2000) return null;
  const [h, p, sig] = token.split('.');
  if (!h || !p || !sig) return null;
  try {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    if (!(await crypto.subtle.verify('HMAC', key, b64uDecode(sig), enc.encode(h + '.' + p)))) return null;
    if (JSON.parse(new TextDecoder().decode(b64uDecode(h))).alg !== 'HS256') return null;
    const c = JSON.parse(new TextDecoder().decode(b64uDecode(p)));
    if (c.iss !== 'lanternhold-rt' || !(c.exp > Date.now() / 1000) || !/^[a-z0-9_]{3,16}$/.test(c.sub) || typeof c.n !== 'string' || c.n.toLowerCase() !== c.sub) return null;
    return { id: c.sub, name: c.n, adm: !!c.adm, hat: c.adm ? (c.hat === 'greenhat' ? 'greenhat' : 'partyhat') : null, mu: !c.adm && !!c.mu, fd: !!c.adm || !!c.fd, v: typeof c.v === 'string' ? c.v : null };
  } catch { return null; }
}
export function cleanText(t) {
  if (typeof t !== 'string') return '';
  t = t.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140);
  for (const w of BAD) t = t.replace(new RegExp('\\b' + w + '\\w*', 'gi'), m => m[0] + '*'.repeat(m.length - 1));
  return t;
}
const send = (ws, o) => { try { ws.send(typeof o === 'string' ? o : JSON.stringify(o)); } catch { } };
const b64u = b => btoa(String.fromCharCode(...(b instanceof Uint8Array ? b : new Uint8Array(b)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
// a short HS256 token (RT_SECRET) the website can check: used for trades both players accepted
async function signToken(payload, secret) {
  const data = b64u(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))) + '.' + b64u(enc.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return data + '.' + b64u(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
const rid = n => { const a = crypto.getRandomValues(new Uint8Array(n)); return Array.from(a, b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join(''); };
// Per-socket flood control: about 25 messages a second sustained, bursts of 50. Past 4x that the socket is closed.
function allow(c) {
  const now = Date.now(); c.tok = Math.min(50, (c.tok ?? 50) + (now - (c.tokAt || now)) * 0.025); c.tokAt = now;
  if (c.tok >= 1) { c.tok -= 1; c.over = 0; return true; }
  c.over = (c.over || 0) + 1; if (c.over > 200) try { c.ws.close(1008, 'flood'); } catch { } return false;
}

// ---------- Worker entry ----------
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/' || url.pathname === '/health') return new Response('Lanternhold realtime: ok', { headers: { 'content-type': 'text/plain' } });
    // Setup check used by the game's /api/health: is the ticket (RT_SECRET) accepted, and is the site's address allowed?
    if (url.pathname === '/check') {
      const list = String(env.ALLOWED_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean), o = url.searchParams.get('origin') || '';
      const who = await verifyTicket(url.searchParams.get('t'), env.RT_SECRET);
      return Response.json({ secretSet: !!env.RT_SECRET, ticket: !!who, origin: !list.length || list.includes(o), allowedOrigins: list });
    }
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('Expected a WebSocket', { status: 426 });
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const origin = req.headers.get('Origin') || '';
    if (allowed.length && !allowed.includes(origin)) return new Response('Origin not allowed', { status: 403 });
    const who = await verifyTicket(url.searchParams.get('t'), env.RT_SECRET);
    if (!who) return new Response('Bad or expired ticket', { status: 401 });
    if (older(who.v, MIN_CLIENT)) { const [client, server] = Object.values(new WebSocketPair()); server.accept(); send(server, { t: 'update', min: MIN_CLIENT }); server.close(4012, 'update'); return new Response(null, { status: 101, webSocket: client }); }
    const fwd = new Request(req); fwd.headers.set('x-lh-who', JSON.stringify(who));
    if (url.pathname === '/lobby') return env.LOBBY.get(env.LOBBY.idFromName('lobby')).fetch(fwd);
    const m = url.pathname.match(/^\/room\/([a-z0-9-]+)$/);
    if (m && ROOM_RE.test(m[1])) { fwd.headers.set('x-lh-room', m[1]); return env.ROOM.get(env.ROOM.idFromName(m[1])).fetch(fwd); }
    return new Response('Not found', { status: 404 });
  }
};

// ---------- Staying cheap: WebSocket hibernation ----------
// Both Durable Objects use Cloudflare's hibernation API: between messages the object sleeps and isn't billed for time, even
// with players connected. (Plain accept() bills every second a socket is open; on the free plan that ran out the daily
// quota after a night of play and every player vanished until midnight UTC.) Heartbeats are answered by Cloudflare itself
// without waking the object. Anything the object must remember across a nap lives in each socket's attachment or in storage.
const PING = '{"t":"ping"}', PONG = '{"t":"pong"}', SWEEP_MS = 20000, SILENT_MS = 75000;
function autoPong(ctx) { try { ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair(PING, PONG)); } catch { } }
function lastHeard(ctx, ws, seen) { let t = seen || 0; try { const a = ctx.getWebSocketAutoResponseTimestamp(ws); if (a && +a > t) t = +a; } catch { } return t; }
async function armSweep(ctx) { try { if (!(await ctx.storage.getAlarm())) await ctx.storage.setAlarm(Date.now() + SWEEP_MS); } catch { } }

// ---------- Lobby: one for the whole game ----------
export class Lobby {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env;
    this.users = new Map();      // id -> { id, name, adm, hat, ws, room, floor, party, on, lastFeed, offT, watching }
    this.watchers = new Map();   // id -> Set of ids watching them (friends lists)
    this.parties = new Map();    // partyId -> { id, leader, members: [id], inst: { room, floor, seed } | null }
    this.invites = new Map();    // toId -> Map(fromId -> at)
    this.feedQ = []; this.feedT = null; this.lastFeedAt = 0;
    autoPong(ctx);
    ctx.blockConcurrencyWhile(async () => {
      const saved = await ctx.storage.get('parties');
      if (saved) for (const p of saved) this.parties.set(p.id, p);
      // waking from a nap: rebuild who is connected from their sockets
      const now = Date.now();
      for (const ws of ctx.getWebSockets()) {
        const a = ws.deserializeAttachment(); if (!a || !a.id) continue;
        const u = { ...a, ws, on: true, seen: a.seen || now, tok: 50, tokAt: now };
        const prev = this.users.get(a.id); if (prev && (prev.at || 0) > (a.at || 0)) continue;
        this.users.set(a.id, u);
      }
      for (const u of this.users.values()) if (Array.isArray(u.watching)) { u.watching = new Set(u.watching); for (const id of u.watching) { if (!this.watchers.has(id)) this.watchers.set(id, new Set()); this.watchers.get(id).add(u.id); } }
    });
  }
  persist() { this.ctx.storage.put('parties', [...this.parties.values()]).catch(() => { }); }
  att(u) { if (!u.on) return; try { u.ws.serializeAttachment({ id: u.id, name: u.name, adm: u.adm, hat: u.hat, mu: !!u.mu, room: u.room, floor: u.floor, party: u.party, at: u.at, seen: u.seen, watching: u.watching ? [...u.watching].slice(0, 100) : null }); } catch { } }
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/pk' && req.method === 'POST') {   // a Room only: a hero was defeated in the Wilderness while disconnected
      const c = await req.json(); if (c && /^[a-z0-9_]{3,16}$/.test(c.id) && c.died) await this.ctx.storage.put('pk:' + c.id, c.died);
      return new Response('ok');
    }
    const who = JSON.parse(req.headers.get('x-lh-who'));
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    this.connect(who, server);
    // tell them about a defeat that happened while they were away (they logged out mid-fight)
    const pk = await this.ctx.storage.get('pk:' + who.id);
    if (pk) { send(server, Object.assign({}, pk, { t: 'died', away: 1 })); await this.ctx.storage.delete('pk:' + who.id); }
    await armSweep(this.ctx);
    return new Response(null, { status: 101, webSocket: client });
  }
  // Players send a heartbeat every 20 s. A connection silent for 75 s is dead (phone locked, network gone): close it.
  async alarm() {
    const now = Date.now();
    for (const u of [...this.users.values()]) if (u.on && now - lastHeard(this.ctx, u.ws, u.seen) > SILENT_MS) { try { u.ws.close(4001, 'silent'); } catch { } this.gone(u, u.ws); }
    if (this.ctx.getWebSockets().length) await this.ctx.storage.setAlarm(Date.now() + SWEEP_MS);
  }
  webSocketMessage(ws, data) {
    const u = this.byWs(ws); if (!u) return;
    const now = Date.now(); u.seen = now; if (now - (u.seenSaved || 0) > 15000) { u.seenSaved = now; this.att(u); }
    if (data === PING) return send(ws, PONG); if (!allow(u)) return;
    let m; try { m = JSON.parse(data); } catch { return; } if (m && typeof m.t === 'string') this.onMessage(u, m);
  }
  webSocketClose(ws) { const u = this.byWs(ws); if (u) this.gone(u, ws); try { ws.close(); } catch { } }
  webSocketError(ws) { const u = this.byWs(ws); if (u) this.gone(u, ws); }
  byWs(ws) { const a = ws.deserializeAttachment(); const u = a && this.users.get(a.id); return u && u.ws === ws ? u : null; }
  online() { let n = 0; for (const u of this.users.values()) if (u.on) n++; return n; }
  partyOf(id) { const u = this.users.get(id); return u && u.party ? this.parties.get(u.party) : null; }
  view(p) { return p ? { id: p.id, leader: p.leader, inst: p.inst, members: p.members.map(m => { const u = this.users.get(m); return { id: m, name: u ? u.name : m, on: !!(u && u.on), room: u && u.on ? u.room : null, floor: u && u.on ? u.floor : null }; }) } : null; }
  pushParty(p) { const v = this.view(p); for (const m of p.members) { const u = this.users.get(m); if (u && u.on) send(u.ws, { t: 'party', party: v }); } }
  status(id) { const u = this.users.get(id); return { id, on: !!(u && u.on), room: u && u.on ? u.room : null, floor: u && u.on ? u.floor : null }; }
  notifyWatchers(id) { const s = this.status(id); for (const w of this.watchers.get(id) || []) { const u = this.users.get(w); if (u && u.on) send(u.ws, { t: 'status', list: [s] }); } }
  note(u, text, bad) { send(u.ws, { t: 'note', text, bad: !!bad }); }

  connect(who, ws) {
    let u = this.users.get(who.id);
    if (u && u.on && u.ws !== ws) { const old = u.ws; send(old, { t: 'kicked', reason: 'You signed in somewhere else.' }); try { old.close(4000, 'replaced'); } catch { } }
    if (!u) { u = { id: who.id, party: null }; this.users.set(who.id, u); }
    Object.assign(u, { name: who.name, adm: who.adm, hat: who.hat, mu: !!who.mu, ws, on: true, room: null, floor: null, tok: 50, tokAt: Date.now(), at: Date.now() });
    clearTimeout(u.offT);
    // rejoin a saved party after a reconnect or a server restart
    if (!u.party) for (const p of this.parties.values()) if (p.members.includes(u.id)) u.party = p.id;
    u.seen = Date.now(); this.att(u);
    send(ws, { t: 'hello', you: u.id, online: this.online(), party: this.view(this.partyOf(u.id)) });
    const p = this.partyOf(u.id); if (p) this.pushParty(p);
    this.notifyWatchers(u.id);
    u.seen = Date.now();
  }
  gone(u, ws) {
    if (u.ws !== ws || !u.on) return; u.on = false; u.room = null; this.notifyWatchers(u.id); const p2 = this.partyOf(u.id); if (p2) { this.pushParty(p2); this.checkInst(p2); }
    u.offT = setTimeout(() => { if (!u.on) { this.leaveParty(u, true); this.users.delete(u.id); } }, OFFLINE_GRACE_MS);
  }

  // Admin moderation (the admin's game already recorded mutes and bans on their account through the website's API;
  // this applies it live). Only admins can send it, and admins can't be moderated.
  mod(u, m) {
    if (!u.adm) return;
    const id = String(m.to || '').toLowerCase(), act = String(m.act || '');
    if (!/^[a-z0-9_]{3,16}$/.test(id) || id === u.id || !['kick', 'ban', 'mute', 'unmute'].includes(act)) return;
    const t = this.users.get(id);
    if (t && t.adm) return this.note(u, 'Admins can’t be moderated.', true);
    const room = t && t.on ? t.room : null;
    if (act === 'mute' || act === 'unmute') {
      if (t) { t.mu = act === 'mute'; this.att(t); if (t.on) send(t.ws, { t: 'muted', on: t.mu }); }
    } else if (t && t.on) {
      send(t.ws, { t: 'kicked', mod: act, reason: act === 'ban' ? 'You were banned by an admin.' : 'You were kicked by an admin.', until: typeof m.until === 'string' ? m.until.slice(0, 40) : null, perm: !!m.perm });
      const ws = t.ws; this.gone(t, ws); try { ws.close(4010, act); } catch { }
    }
    if (room) { const stub = this.env.ROOM.get(this.env.ROOM.idFromName(room)); this.ctx.waitUntil(stub.fetch('https://room/mod', { method: 'POST', body: JSON.stringify({ id, act }) }).catch(() => { })); }
    this.note(u, (t ? t.name : id) + (act === 'kick' ? ' was kicked.' : act === 'ban' ? ' was banned.' : act === 'mute' ? ' is muted.' : ' is unmuted.'));
  }
  worldCounts() { const c = new Map(); for (const u of this.users.values()) if (u.on && u.room && u.room[0] === 'w') c.set(u.room, (c.get(u.room) || 0) + 1); return c; }
  pickWorld(u, want) {
    const c = this.worldCounts(), has = r => (c.get(r) || 0) < WORLD_CAP || u.room === r;
    if (want && /^w[1-9][0-9]{0,2}$/.test(want) && has(want)) return want;
    const p = this.partyOf(u.id);
    if (p) for (const m of p.members) { const mu = this.users.get(m); if (mu && mu.on && mu.room && mu.room[0] === 'w' && has(mu.room)) return mu.room; }
    let best = null, bn = -1;                      // fill the busiest world that still has room, so the Hold feels alive
    for (const [r, n] of c) if (n < WORLD_CAP && n > bn) { best = r; bn = n; }
    if (best) return best;
    for (let i = 1; ; i++) if (!c.has('w' + i)) return 'w' + i;
  }

  onMessage(u, m) {
    switch (m.t) {
      case 'world': return send(u.ws, { t: 'world', room: this.pickWorld(u, typeof m.want === 'string' ? m.want : null) });
      case 'worlds': { const c = this.worldCounts(); return send(u.ws, { t: 'worlds', cap: WORLD_CAP, list: [...c].sort((a, b) => +a[0].slice(1) - +b[0].slice(1)).slice(0, 100) }); }
      case 'where': {
        const room = typeof m.room === 'string' && ROOM_RE.test(m.room) ? m.room : null;
        u.room = room; u.floor = room && room[0] === 'd' && Number.isInteger(m.floor) && m.floor > 0 && m.floor < 100 ? m.floor : null;
        this.att(u);
        this.notifyWatchers(u.id); const p = this.partyOf(u.id); if (p) { this.checkInst(p); this.pushParty(p); }
        return;
      }
      case 'watch': {
        const ids = Array.isArray(m.ids) ? m.ids.filter(x => typeof x === 'string' && /^[a-z0-9_]{3,16}$/.test(x)).slice(0, 250) : [];
        for (const old of u.watching || []) this.watchers.get(old)?.delete(u.id);
        u.watching = new Set(ids);
        for (const id of ids) { if (!this.watchers.has(id)) this.watchers.set(id, new Set()); this.watchers.get(id).add(u.id); }
        this.att(u);
        return send(u.ws, { t: 'status', list: ids.map(id => this.status(id)) });
      }
      case 'nudge': { const to = this.users.get(String(m.to || '').toLowerCase()); if (to && to.on) send(to.ws, { t: 'nudge', from: u.name, k: m.k === 'friend' ? 'friend' : 'x' }); return; }
      case 'online': return send(u.ws, { t: 'online', n: this.online() });
      case 'invite': return this.invite(u, String(m.to || '').toLowerCase());
      case 'accept': return this.accept(u, String(m.from || '').toLowerCase());
      case 'decline': { const from = String(m.from || '').toLowerCase(); this.invites.get(u.id)?.delete(from); const f = this.users.get(from); if (f && f.on) this.note(f, u.name + ' declined your party invite.'); return; }
      case 'leave': return this.leaveParty(u, false);
      case 'kick': { const p = this.partyOf(u.id), id = String(m.id || ''); if (!p || p.leader !== u.id || id === u.id || !p.members.includes(id)) return; const k = this.users.get(id); if (k) { this.leaveParty(k, false); if (k.on) this.note(k, 'You were removed from the party.', true); } return; }
      case 'lead': { const p = this.partyOf(u.id), id = String(m.id || ''); if (!p || p.leader !== u.id || !p.members.includes(id)) return; p.leader = id; this.persist(); return this.pushParty(p); }
      case 'delve': return this.delve(u, m.floor);
      case 'joinInst': { const p = this.partyOf(u.id); if (p && p.inst) return send(u.ws, Object.assign({ t: 'go' }, p.inst)); return this.note(u, 'Your party isn’t in the Depths right now.'); }
      case 'pchat': { const p = this.partyOf(u.id), text = cleanText(m.text); if (!p || !text) return; if (u.mu) return send(u.ws, { t: 'muted', on: true, said: 1 }); if (Date.now() - (u.lastP || 0) < 1000) return; u.lastP = Date.now();
        for (const id of p.members) { const x = this.users.get(id); if (x && x.on) send(x.ws, { t: 'pchat', id: u.id, name: u.name, text }); } return; }
      case 'pdie': {   // a party member fell: tell the party (built from a template; nothing typed by players)
        const p = this.partyOf(u.id); if (!p || Date.now() - (u.lastDie || 0) < 4000) return; u.lastDie = Date.now();
        const f = Number.isInteger(m.floor) && m.floor > 0 && m.floor < 100 ? m.floor : null, by = typeof m.by === 'string' && /^[A-Za-z0-9_]{3,16}$/.test(m.by) ? m.by : null;
        const text = m.k === 'wild' ? u.name + (by ? ' was defeated by ' + by : ' was defeated') + ' in the Wilderness' : u.name + ' died in the Depths' + (f ? ' (floor ' + f + ')' : '');
        for (const id of p.members) { const x = this.users.get(id); if (x && x.on) send(x.ws, { t: 'pchat', sys: 1, id: u.id, name: u.name, text, die: 1 }); }
        return;
      }
      case 'feed': return this.feed(u, m);
      case 'mod': return this.mod(u, m);
    }
  }

  invite(u, to) {
    const t = this.users.get(to);
    if (!t || !t.on) return this.note(u, 'That player isn’t online.', true);
    if (to === u.id) return;
    const p = this.partyOf(u.id);
    if (p && p.members.includes(to)) return this.note(u, t.name + ' is already in your party.');
    if (p && p.members.length >= PARTY_MAX) return this.note(u, 'Your party is full (4 players).', true);
    if (t.party) return this.note(u, t.name + ' is already in a party.', true);
    if (!this.invites.has(to)) this.invites.set(to, new Map());
    this.invites.get(to).set(u.id, Date.now());
    send(t.ws, { t: 'invited', from: u.id, name: u.name });
    this.note(u, 'Party invite sent to ' + t.name + '.');
  }
  accept(u, from) {
    const at = this.invites.get(u.id)?.get(from); this.invites.get(u.id)?.delete(from);
    const f = this.users.get(from);
    if (!at || Date.now() - at > INVITE_MS) return this.note(u, 'That invite has expired.', true);
    if (!f || !f.on) return this.note(u, 'They went offline.', true);
    let p = this.partyOf(from);
    if (p && p.members.length >= PARTY_MAX) return this.note(u, 'That party is full.', true);
    if (u.party) this.leaveParty(u, false);
    if (!p) { p = { id: 'p' + rid(10), leader: from, members: [from], inst: null }; this.parties.set(p.id, p); f.party = p.id; }
    p.members.push(u.id); u.party = p.id; this.att(u); this.att(f); this.persist();
    this.pushParty(p);
    for (const id of p.members) if (id !== u.id) { const x = this.users.get(id); if (x && x.on) this.note(x, u.name + ' joined the party.'); }
    if (p.inst) send(u.ws, Object.assign({ t: 'partyDelve', by: (this.users.get(p.leader) || {}).name || 'Your party' }, p.inst));
  }
  leaveParty(u, quiet) {
    const p = this.partyOf(u.id) || [...this.parties.values()].find(x => x.members.includes(u.id));
    u.party = null; this.att(u); if (!p) { if (!quiet && u.on) send(u.ws, { t: 'party', party: null }); return; }
    p.members = p.members.filter(x => x !== u.id);
    if (u.on) send(u.ws, { t: 'party', party: null });
    if (p.members.length <= 1) {                       // a party of one is no party
      for (const id of p.members) { const x = this.users.get(id); if (x) { x.party = null; this.att(x); if (x.on) { send(x.ws, { t: 'party', party: null }); this.note(x, 'Your party has disbanded.'); } } }
      this.parties.delete(p.id);
    } else {
      if (p.leader === u.id) p.leader = p.members.find(id => (this.users.get(id) || {}).on) || p.members[0];
      for (const id of p.members) { const x = this.users.get(id); if (x && x.on) this.note(x, u.name + ' left the party.'); }
      this.pushParty(p);
    }
    this.persist();
  }
  // Start a dungeon instance: just you, or your whole party (only the leader can lead a party down).
  async delve(u, floor) {
    floor = Number.isInteger(floor) && floor >= 1 && floor <= 30 ? floor : 1;
    const p = this.partyOf(u.id);
    if (p && p.leader !== u.id) {
      if (p.inst) return send(u.ws, Object.assign({ t: 'go' }, p.inst));
      return this.note(u, 'Only your party leader can lead the party into the Depths. Leave the party to delve alone.', true);
    }
    const room = 'd-' + rid(12), seed = crypto.getRandomValues(new Uint32Array(1))[0] % 1e9;
    const members = p ? p.members.slice() : [u.id];
    const stub = this.env.ROOM.get(this.env.ROOM.idFromName(room));
    await stub.fetch('https://room/setup', { method: 'POST', body: JSON.stringify({ allowed: members, host: u.id, seed, floor }) });
    const inst = { room, floor, seed };
    if (p) { p.inst = inst; this.persist(); this.pushParty(p); }
    send(u.ws, Object.assign({ t: 'go' }, inst));
    if (p) for (const id of members) if (id !== u.id) { const x = this.users.get(id); if (x && x.on) send(x.ws, Object.assign({ t: 'partyDelve', by: u.name }, inst)); }
  }
  // Forget a party's instance once nobody from the party is in it any more.
  checkInst(p) {
    if (!p.inst) return;
    const inside = p.members.some(id => { const x = this.users.get(id); return x && x.on && x.room === p.inst.room; });
    if (!inside) { clearTimeout(p.instT); p.instT = setTimeout(() => { if (!p.inst) return; const still = p.members.some(id => { const x = this.users.get(id); return x && x.on && x.room === p.inst.room; }); if (!still) { p.inst = null; this.persist(); this.pushParty(p); } }, 15000); }
  }
  // The world feed: real events from real players, built from templates (players can't post free text here).
  feed(u, m) {
    const now = Date.now(); if (now - (u.lastFeed || 0) < 20000) return; u.lastFeed = now;
    const a = typeof m.a === 'string' && /^[A-Za-z0-9' ]{1,32}$/.test(m.a) ? m.a : null;
    const T = { loot: a && `found a ${a}`, boss: a && `defeated ${a}`, level: a && /^\d{1,3}$/.test(a) && `reached combat level ${a}`, skill: a && `reached ${a}`, deep: a && /^\d{1,3}$/.test(a) && `reached floor ${a} of the Depths`, pk: a && /^[A-Za-z0-9_]{3,16}$/.test(a) && `defeated ${a} in the Wilderness` }[m.k];
    if (!T) return;
    this.feedQ.push(u.name + ' ' + T); if (this.feedQ.length > 6) this.feedQ.shift();
    this.pumpFeed();
  }
  pumpFeed() {   // at most one feed line every 2 seconds for everyone, however busy the game gets
    if (this.feedT || !this.feedQ.length) return;
    const wait = Math.max(0, 2000 - (Date.now() - this.lastFeedAt));
    this.feedT = setTimeout(() => { this.feedT = null; const text = this.feedQ.shift(); if (!text) return; this.lastFeedAt = Date.now();
      const msg = JSON.stringify({ t: 'feed', text }); for (const x of this.users.values()) if (x.on) send(x.ws, msg); this.pumpFeed(); }, wait);
  }
}

// ---------- Room: a Hold world or a dungeon instance ----------
const HOST_OUT = new Set(['en', 'kill', 'obj', 'objs', 'floor', 'hurt', 'grant', 'fx']);   // host -> everyone (or one player with `to`)
const TRADE_MSG = new Set(['tq', 'ta', 'tu', 'tk', 'tr', 'td', 'tx']);
const TO_HOST = new Set(['hit', 'act', 'mine', 'shade', 'down', 'sync']);                    // a player -> the host
const FISH_PH = new Set(['cast', 'wait', 'bite', 'reel']);
// Tree types (match TREES in the game's data.js): logs per tree and regrow time. Higher-level trees in later areas hold
// fewer logs and take longer to regrow.
// regenDelay/regenEvery: a tree nobody has cut for regenDelay grows back 1 log every regenEvery, up to full.
const TREE_TYPES = { oak: { logs: 300, regrow: 20e3, regenDelay: 15e3, regenEvery: 2e3 }, blackwood: { logs: 60, regrow: 45e3, regenDelay: 20e3, regenEvery: 6e3 }, willow: { logs: 80, regrow: 60e3, regenDelay: 20e3, regenEvery: 5e3 } }, TREE_MAX = 64, CHOP_GAP_MS = 1200;
const treeType = k => TREE_TYPES[k] || TREE_TYPES.oak;
const DROP_MAX = 400, DROP_PRIVATE_MS = 30e3, DROP_LIFE_MS = 180e3, LOOT_LIFE_MS = 30 * 60e3;
// ---- the Wilderness: the north of every Hold world, past the old wall, is PvP. The room is the referee: it checks every
// attack (both in the Wilderness, combat levels within the Wilderness level, close enough), rolls the damage from what each
// hero wears, keeps everyone's health, hands out skulls, and when a hero falls it drops their items for the killer.
// Keep WILD_Y in step with WILD_ROWS in client-src/world.js (40 rows of 16 px; 2 rows per Wilderness level, up to 20).
const WILD_Y = 640, WILD_ROW_PX = 32, WILD_MAX = 20;
export const wildLvl = y => (y < WILD_Y ? Math.min(WILD_MAX, Math.max(1, Math.ceil((WILD_Y - y) / WILD_ROW_PX))) : 0);
const PVP = { gap: 750, reach: 34, skullMs: 20 * 60e3, retaliateMs: 120e3, combatMs: 10e3, regenAfter: 8e3, regenPerS: 1, eatGap: 1500, safeMs: 5000, ghostMs: 15e3, returnMax: 20, lootPrivate: 60e3, lootLife: 180e3, mult: .7, miss: .12 };
// what gear does in a fight (the same numbers as the game's data.js; admin hats count as an Ember Helm here)
// staffs are clubs in the Wilderness (spells don't hit players); robes are lighter than plate
const BLADE_DMG = { rusty: 6, copper: 10, iron: 16, ember: 25, steel: 34, gloam: 40, cinder: 46, apprentice: 4, blackwood: 6, emberwood: 9, gloamwood: 12, hollow: 14, moon: 16 },
  MAIL_DEF = { copper: 2, iron: 4, ember: 7, steel: 10, gloam: 13, tide: 8, voidrobe: 11 }, HELM_DEF = { copper: 1, iron: 2, ember: 4, steel: 5, gloam: 7, star: 9, partyhat: 4, greenhat: 4 };
const CAPE_PVP = { tattered: { hp: 6 }, grave: { def: 2, hp: 10 }, mother: { dmg: 15, hp: 12 }, knight: { def: 3, dmg: 12 } };
export const pvpMax = l => 60 + 8 * (((l && l.lvl) || 1) - 1) + ((CAPE_PVP[l && l.cape] || {}).hp || 0);
const SLOTS = new Set(['blade', 'mail', 'lantern', 'cape', 'helm', 'ring', 'amulet']);
// The map grew west in v0.12 (Hollowmere): every Hold and Wilderness x moved right by WEST_X. Keep in step with world.js.
const WEST_X = 1536;   // v0.13: Hollowmere grew to 96 columns
const HOLD_SPAWN = { x: 208 + WEST_X, y: 800 };   // where a defeated hero wakes up (the Hold's spawn in client-src/world.js)
const recent = (o, now, ms) => { const r = {}; let k = 0; for (const [id, t] of Object.entries(o || {})) if (now - t < ms && k++ < 12) r[id] = t; return r; };
export class Room {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env; this.players = new Map(); this.flushT = null; this.seq = 0; this.drops = new Map(); this.trees = new Map();
    this.cfg = null;   // dungeon instances only: { allowed: [ids], host, seed, floor }
    this.trades = new Map();   // Hold worlds: trades in progress (in memory; a trade is short)
    autoPong(ctx);
    ctx.blockConcurrencyWhile(async () => {
      this.cfg = (await ctx.storage.get('cfg')) || null; ctx.storage.delete('chat').catch(() => { });   // chat is never stored: players only see what's said while they're online
      this.id = (await ctx.storage.get('id')) || null; this.inst = !!(this.id && this.id[0] === 'd');
      this.drops = new Map(((await ctx.storage.get('drops')) || []).map(d => [d.did, d]));
      this.trees = new Map(((await ctx.storage.get('trees')) || []).map(t => [t.i, t]));
      const now = Date.now();   // waking from a nap: rebuild the players from their sockets
      for (const ws of ctx.getWebSockets()) {
        const a = ws.deserializeAttachment(); if (!a || !a.id) continue;
        const prev = this.players.get(a.id); if (prev && prev.joined > a.joined) continue;
        this.players.set(a.id, { ...a, ws, dirty: false, seen: a.seen || now, tok: 50, tokAt: now });
      }
    });
  }
  att(p) { if (p.ghost) return; try { p.ws.serializeAttachment({ id: p.id, name: p.name, adm: p.adm, hat: p.hat, mu: !!p.mu, fd: !!p.fd, x: p.x, y: p.y, d: p.d, m: p.m, look: p.look, joined: p.joined, seen: p.seen, fish: p.fish || null,
    rd: !!p.rd, hp: p.hp ?? null, hpAt: p.hpAt || 0, lc: p.lc || 0, sk: p.sk || 0, safe: p.safe || 0, ag: p.ag || null, dmg: p.dmg ? Object.fromEntries(Object.entries(p.dmg).slice(0, 8)) : null }); } catch { } }
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/setup' && req.method === 'POST') {          // called by the Lobby only (not reachable from outside)
      const c = await req.json(); this.cfg = { allowed: c.allowed, host: c.host, seed: c.seed, floor: c.floor };
      await this.ctx.storage.put('cfg', this.cfg); return new Response('ok');
    }
    if (url.pathname === '/mod' && req.method === 'POST') {            // called by the Lobby only: an admin muted or removed a player
      const c = await req.json(), p = this.players.get(String(c.id || ''));
      if (p) {
        if (c.act === 'mute' || c.act === 'unmute') { p.mu = c.act === 'mute'; this.att(p); }
        else { const ws = p.ws; this.gone(p, ws); try { ws.close(4010, c.act); } catch { } }
      }
      return new Response('ok');
    }
    const who = JSON.parse(req.headers.get('x-lh-who')), room = req.headers.get('x-lh-room');
    if (this.id !== room) { this.id = room; this.ctx.storage.put('id', room).catch(() => { }); }
    this.inst = room[0] === 'd';
    const [client, server] = Object.values(new WebSocketPair());
    if (this.inst && !(this.cfg && this.cfg.allowed.includes(who.id))) { server.accept(); send(server, { t: 'denied', reason: 'This dungeon belongs to another party.' }); server.close(4003, 'denied'); }
    else if (!this.inst && this.players.size >= WORLD_CAP && !this.players.has(who.id)) { server.accept(); send(server, { t: 'full' }); server.close(4009, 'full'); }
    else { this.ctx.acceptWebSocket(server); this.join(who, server); await armSweep(this.ctx); }
    return new Response(null, { status: 101, webSocket: client });
  }
  // Remove players whose connection went silent (no heartbeat for 75 s), so nobody is left standing frozen on others' screens.
  async alarm() {
    const now = Date.now();
    if (this.pruneDrops()) this.saveDrops();
    for (const p of [...this.players.values()]) if (!p.ghost && now - lastHeard(this.ctx, p.ws, p.seen) > SILENT_MS) { try { p.ws.close(4001, 'silent'); } catch { } this.gone(p, p.ws); }
    if (this.ctx.getWebSockets().length) await this.ctx.storage.setAlarm(Date.now() + SWEEP_MS);
  }
  byWs(ws) { const a = ws.deserializeAttachment(); const p = a && this.players.get(a.id); return p && p.ws === ws ? p : null; }
  webSocketMessage(ws, data) {
    const p = this.byWs(ws); if (!p) return;
    const now = Date.now(); p.seen = now; if (now - (p.seenSaved || 0) > 15000) { p.seenSaved = now; this.att(p); }
    if (data === PING) return send(ws, PONG); if (!allow(p)) return; if (typeof data !== 'string' || data.length > 6000) return;
    let m; try { m = JSON.parse(data); } catch { return; } if (m && typeof m.t === 'string') this.onMessage(p, m);
  }
  webSocketClose(ws) { const p = this.byWs(ws); if (p) this.gone(p, ws); try { ws.close(); } catch { } }
  webSocketError(ws) { const p = this.byWs(ws); if (p) this.gone(p, ws); }
  gone(p, ws) {
    if (this.players.get(p.id) !== p || p.ws !== ws || p.ghost) return;
    if (p.trade) this.tradeEnd(this.trades.get(p.trade), 'left', p);
    // Logged out (or lost the connection) in the middle of a fight in the Wilderness: the hero stays where they stood
    // for 15 s and can still be defeated. Coming back in time picks the fight up where it was.
    if (!this.inst && p.rd && wildLvl(p.y) && Date.now() - (p.lc || 0) < PVP.combatMs) { p.ghost = true; p.ghostT = setTimeout(() => this.dropGhost(p), PVP.ghostMs); return; }
    this.players.delete(p.id); if (p.rd) this.all({ t: '-', id: p.id });
    if (this.inst && this.cfg && this.cfg.host === p.id) this.pick();
  }
  dropGhost(p) { clearTimeout(p.ghostT); if (this.players.get(p.id) !== p) return; this.players.delete(p.id); if (p.rd) this.all({ t: '-', id: p.id }); }
  host() { if (!this.inst) return null; const h = this.cfg.host; if (this.players.has(h)) return h; return null; }
  pick() {  // a new host when the old one leaves: whoever has been here longest
    let best = null; for (const p of this.players.values()) if (!best || p.joined < best.joined) best = p;
    this.cfg.host = best ? best.id : this.cfg.host; this.ctx.storage.put('cfg', this.cfg).catch(() => { });
    if (best) this.all({ t: 'host', id: best.id });
  }
  pub(p) { const now = Date.now(), o = { id: p.id, name: p.name, adm: p.adm ? 1 : 0, look: p.look, x: p.x, y: p.y, d: p.d, m: p.m, fish: p.fish || null };
    if (!this.inst) { const max = pvpMax(p.look), hp = this.hpOf(p, now); if (hp < max) { o.hp = Math.ceil(hp); o.max = max; } if ((p.sk || 0) > now) o.sk = p.sk - now; }
    return o; }
  // ---- PvP health: full unless hurt; after 8 s out of combat it climbs back 1 HP a second ----
  hpOf(p, now = Date.now()) {
    const max = pvpMax(p.look); if (p.hp == null) return max;
    let hp = Math.min(p.hp, max); const from = Math.max(p.hpAt || 0, (p.lc || 0) + PVP.regenAfter);
    if (now > from) hp = Math.min(max, hp + (now - from) / 1000 * PVP.regenPerS);
    return hp;
  }
  setHp(p, hp, now) { if (hp >= pvpMax(p.look)) { p.hp = null; p.hpAt = 0; } else { p.hp = hp; p.hpAt = now; } }
  onAtk(p, m) {
    const q = this.players.get(String(m.to || '')), now = Date.now();
    if (this.inst || p.ghost || p.dead || !p.rd || !q || q === p || !q.rd || q.dead) return;
    const no = why => send(p.ws, { t: 'PN', to: q.id, why });
    if (now - (p.lastAtk || 0) < PVP.gap) return;
    const wa = wildLvl(p.y), wb = wildLvl(q.y);
    if (!wa) return no('safe_you'); if (!wb) return no('safe_them');
    if ((p.safe || 0) > now || (q.safe || 0) > now) return no('protected');
    const la = (p.look && p.look.lvl) || 1, lb = (q.look && q.look.lvl) || 1;
    if (Math.abs(la - lb) > Math.min(wa, wb)) return no('level');
    if (Math.hypot(p.x - q.x, p.y - q.y) > PVP.reach) return no('far');
    p.lastAtk = now; p.safe = 0;
    // the skull: attack someone who hasn't attacked you in the last 2 minutes, and you're marked for 20 minutes
    if (!((q.ag || {})[p.id] > now - PVP.retaliateMs)) { const was = (p.sk || 0) > now; p.sk = now + PVP.skullMs; if (!was) this.all({ t: 'SK', id: p.id, left: PVP.skullMs }); else send(p.ws, { t: 'SK', id: p.id, left: PVP.skullMs }); }
    p.ag = recent(p.ag, now, PVP.retaliateMs); p.ag[q.id] = now;
    const A = p.look || {}, B = q.look || {}, cA = CAPE_PVP[A.cape] || {}, cB = CAPE_PVP[B.cape] || {};
    let d = 0;
    if (Math.random() >= PVP.miss) {
      const base = (BLADE_DMG[A.blade] || 6) * (1 + (cA.dmg || 0) / 100) * PVP.mult, def = (MAIL_DEF[B.armor] || 0) + (HELM_DEF[B.helm] || 0) + (cB.def || 0);
      d = Math.max(1, Math.round(base * (.75 + Math.random() * .5) - def * .5));
    }
    const hp = Math.max(0, this.hpOf(q, now) - d), max = pvpMax(q.look);
    p.lc = q.lc = now; q.dmg = q.dmg || {}; q.dmg[p.id] = (q.dmg[p.id] || 0) + d;
    this.setHp(q, hp, now);
    this.all({ t: 'PH', a: p.id, v: q.id, d, hp: Math.ceil(hp), max });
    this.att(p); this.att(q);
    if (hp <= 0) this.pkDeath(q, p, now);
  }
  // A hero falls: whoever did the most damage gets the loot first (everyone else can pick it up after a minute).
  // Unskulled heroes keep their 3 most valuable items; a skulled hero loses everything they carry and wear.
  async pkDeath(q, by, now) {
    q.dead = true;
    let top = by.id, best = -1; for (const [id, d] of Object.entries(q.dmg || {})) if (d > best && this.players.has(id)) { best = d; top = id; }
    const killer = this.players.get(top) || by, skulled = (q.sk || 0) > now, x = q.x, y = q.y, ghost = !!q.ghost;
    let risk = q.risk;
    // the fight is over for them right now: full health, no skull, a few seconds' protection, and back to the Hold
    Object.assign(q, { hp: null, hpAt: 0, lc: 0, sk: 0, ag: {}, dmg: {}, risk: null, safe: now + PVP.safeMs, x: HOLD_SPAWN.x, y: HOLD_SPAWN.y, home: now + PVP.safeMs, fish: null, sAt: now }); this.att(q);
    this.all({ t: 'F', id: q.id, f: null }); this.all({ t: 'S', p: [[q.id, q.x, q.y, 'down', 0]] });
    if (!ghost) send(q.ws, { t: 'pos', x: q.x, y: q.y, home: 1 });
    this.all({ t: 'PK', v: q.id, a: killer.id, vn: q.name, an: killer.name, x: Math.round(x), y: Math.round(y) });
    if (skulled) this.all({ t: 'SK', id: q.id, left: 0 });
    if (!risk) { try { risk = await this.ctx.storage.get('rk:' + q.id); } catch { } } risk = Array.isArray(risk) ? risk : [];
    this.ctx.storage.delete('rk:' + q.id).catch(() => { });
    const kept = [], lost = []; let keep = skulled ? 0 : 3;
    for (const [id, n, slot] of risk) { const k = Math.min(keep, n); keep -= k; if (k) kept.push([id, k, slot]); if (n - k) lost.push([id, n - k, slot]); }
    const made = [];
    lost.forEach(([it, n], i) => { const a = i * 2.39996, r = i ? 5 + 2.2 * Math.sqrt(i) : 0;
      made.push({ did: rid(10), it, n, x: Math.round(Math.max(WEST_X + 20, Math.min(WEST_X + 396, x + Math.cos(a) * r))), y: Math.round(Math.max(20, y - 3 + Math.sin(a) * r * .7)), vx: 0, vy: 0, f: null, by: killer.id, bag: true, pk: 1, at: now, pub: now + PVP.lootPrivate, exp: now + PVP.lootLife }); });
    this.pruneDrops(); for (const d of made) this.drops.set(d.did, d); if (made.length) this.saveDrops();
    for (const r of this.players.values()) if (!r.ghost) for (const d of made) send(r.ws, { t: 'D', d: this.dropView(d, r.id) });
    const died = { by: killer.name, lost, kept, sk: skulled ? 1 : 0 };
    if (ghost) { try { await this.env.LOBBY.get(this.env.LOBBY.idFromName('lobby')).fetch('https://lobby/pk', { method: 'POST', body: JSON.stringify({ id: q.id, died }) }); } catch { } this.dropGhost(q); }
    else send(q.ws, Object.assign({ t: 'DIED' }, died));
    q.dead = false;
  }
  // the Return Flame from the Wilderness: allowed up to level 20 (deeper areas will block it). Lands in the Hold.
  onHome(p, m) {
    const x = +m.x, y = +m.y;
    if (this.inst || p.dead || !(x >= 0 && x < 20000 && y >= WILD_Y && y < 20000)) return;
    const l = wildLvl(p.y); if (l > PVP.returnMax) return send(p.ws, { t: 'PN', why: 'too_deep' });
    p.x = x; p.y = y; p.sAt = Date.now(); p.dirty = true; this.att(p); if (!this.flushT) this.flushT = setTimeout(() => this.flush(), 100);
  }
  // ---- items on the ground: dungeon loot (seen by the whole party at once) and items dropped from a bag (the dropper sees
  // them at once, everyone else after 30 s). The server decides who picks each one up, so nothing is ever picked up twice.
  pruneDrops() { const now = Date.now(); let ch = false; for (const [k, d] of this.drops) if (d.exp && now > d.exp) { this.drops.delete(k); ch = true; }
    while (this.drops.size > DROP_MAX) { this.drops.delete(this.drops.keys().next().value); ch = true; } return ch; }
  saveDrops() { this.ctx.storage.put('drops', [...this.drops.values()]).catch(() => { }); }
  dropView(d, forId) { return { did: d.did, it: d.it, n: d.n, x: d.x, y: d.y, vx: d.vx, vy: d.vy, f: d.f, by: d.by, bag: d.bag ? 1 : 0, pk: d.pk ? 1 : 0, wait: forId === d.by ? 0 : Math.max(0, d.pub - Date.now()), left: d.exp ? Math.max(0, d.exp - Date.now()) : null }; }
  onDrop(p, m) {
    const it = typeof m.it === 'string' && /^[a-z0-9_]{1,32}$/.test(m.it) ? m.it : null, n = Number.isInteger(m.n) && m.n >= 1 && m.n <= 1e6 ? m.n : 0;
    const x = +m.x, y = +m.y; if (!it || !n || !(x >= 0 && x < 20000 && y >= 0 && y < 20000)) return;
    const now = Date.now(), bag = !!m.bag, f = this.inst ? (this.cfg ? this.cfg.floor : null) : null;
    const v = q => Number.isFinite(+q) ? Math.max(-200, Math.min(200, Math.round(+q))) : 0;
    const d = { did: rid(10), it, n, x: Math.round(x), y: Math.round(y), vx: v(m.vx), vy: v(m.vy), f, by: p.id, bag, at: now, pub: bag && !this.inst ? now + DROP_PRIVATE_MS : now, exp: bag ? now + DROP_LIFE_MS : now + LOOT_LIFE_MS };
    this.pruneDrops(); this.drops.set(d.did, d); this.saveDrops();
    send(p.ws, Object.assign({ t: 'D', ref: typeof m.ref === 'string' ? m.ref.slice(0, 24) : null }, { d: this.dropView(d, p.id) }));
    const s = JSON.stringify({ t: 'D', d: this.dropView(d, null) }); for (const q of this.players.values()) if (q.id !== p.id) send(q.ws, s);
  }
  // ---- trading (Hold worlds): ask → accept → both build offers → both accept the same offers → both save → the
  // website moves the items in one database transaction, using a ticket signed here that names exactly what was agreed.
  tradeView(tr) { return { t: 'TO', id: tr.id, a: tr.a, b: tr.b, names: tr.names, off: tr.off, ok: tr.ok, ver: tr.ver, go: !!tr.go }; }
  tradeOut(tr, msg) { const s = JSON.stringify(msg || this.tradeView(tr)); for (const id of [tr.a, tr.b]) { const q = this.players.get(id); if (q) send(q.ws, s); } }
  tradeEnd(tr, why, by) {
    if (!tr) return; this.trades.delete(tr.id);
    for (const id of [tr.a, tr.b]) { const q = this.players.get(id); if (q && q.trade === tr.id) { q.trade = null; if (!by || q.id !== by.id) send(q.ws, { t: 'TX', why, by: by ? by.name : null }); } }
  }
  async onTrade(p, t, m) {
    const now = Date.now(), tr = p.trade ? this.trades.get(p.trade) : null;
    if (t === 'tq') {                                    // ask someone here to trade
      const q = this.players.get(String(m.to || '')); if (!q || q === p) return;
      if (now - (p.lastTq || 0) < 3000) return; p.lastTq = now;
      if (p.trade || q.trade) return send(p.ws, { t: 'TX', why: 'busy', by: q.name });
      (q.tqFrom || (q.tqFrom = new Map())).set(p.id, now);
      return send(q.ws, { t: 'TQ', from: p.id, name: p.name });
    }
    if (t === 'ta') {                                    // accept someone's request
      const a = this.players.get(String(m.from || '')); if (!a || !p.tqFrom || !(now - (p.tqFrom.get(a.id) || 0) < 90e3)) return;
      p.tqFrom.delete(a.id);
      if (a.trade || p.trade) return send(p.ws, { t: 'TX', why: 'busy', by: a.name });
      const n = { id: rid(12), a: a.id, b: p.id, names: { [a.id]: a.name, [p.id]: p.name }, off: { [a.id]: { i: {}, g: 0 }, [p.id]: { i: {}, g: 0 } }, ok: {}, rdy: {}, ver: 0, at: now };
      this.trades.set(n.id, n); a.trade = p.trade = n.id; return this.tradeOut(n);
    }
    if (!tr) return;
    if (t === 'tx') return this.tradeEnd(tr, 'cancelled', p);
    if (t === 'tu' && !tr.go) {                         // change my offer: up to 12 kinds of items and some gold
      const i = {}; let k = 0;
      for (const [id, n] of Object.entries(m.i && typeof m.i === 'object' ? m.i : {})) { if (k >= 12) break; if (/^[a-z0-9_]{1,32}$/.test(id) && Number.isInteger(n) && n > 0 && n <= 1e7) { i[id] = n; k++; } }
      const g = Number.isInteger(m.g) && m.g >= 0 && m.g <= 1e10 ? m.g : 0;
      tr.off[p.id] = { i, g }; tr.ver++; tr.ok = {}; tr.at = now; return this.tradeOut(tr);
    }
    if (t === 'tk' && !tr.go && m.ver === tr.ver) {     // accept the offers as they are now (one side can be a gift, but not both empty)
      const empty = o => !o.g && !Object.keys(o.i).length; if (empty(tr.off[tr.a]) && empty(tr.off[tr.b])) return;
      tr.ok[p.id] = tr.ver;
      if (tr.ok[tr.a] === tr.ver && tr.ok[tr.b] === tr.ver) { tr.go = true; this.tradeOut(tr); return this.tradeOut(tr, { t: 'TR', id: tr.id }); }
      return this.tradeOut(tr);
    }
    if (t === 'tr' && tr.go) {                           // I've saved: when both have, the first player sends the trade to the website
      tr.rdy[p.id] = 1; if (!(tr.rdy[tr.a] && tr.rdy[tr.b]) || tr.sent) return; tr.sent = true;
      const side = id => ({ id, name: tr.names[id], i: tr.off[id].i, g: tr.off[id].g });
      const ticket = await signToken({ iss: 'lanternhold-trade', tid: tr.id, a: side(tr.a), b: side(tr.b), exp: Math.floor(now / 1000) + 60 }, this.env.RT_SECRET);
      const a = this.players.get(tr.a), b = this.players.get(tr.b);
      if (a) send(a.ws, { t: 'TG', id: tr.id, ticket }); if (b) send(b.ws, { t: 'TW', id: tr.id });
      return;
    }
    if (t === 'td' && tr.sent && p.id === tr.a) {        // the website's answer
      const r = m.revs && typeof m.revs === 'object' ? m.revs : {};
      this.tradeOut(tr, { t: 'TD', id: tr.id, ok: !!m.ok, revs: { [tr.a]: Number.isInteger(r.a) ? r.a : null, [tr.b]: Number.isInteger(r.b) ? r.b : null }, off: tr.off, a: tr.a, b: tr.b, why: typeof m.why === 'string' ? m.why.slice(0, 140) : null });
      this.trades.delete(tr.id); for (const id of [tr.a, tr.b]) { const q = this.players.get(id); if (q && q.trade === tr.id) q.trade = null; }
    }
  }
  // ---- shared trees (Hold worlds): every log anyone cuts comes off the same stack; at 0 the tree falls and regrows ----
  tree(i, kind) { let t = this.trees.get(i); if (!t) { const k = TREE_TYPES[kind] ? kind : 'oak'; t = { i, kind: k, left: treeType(k).logs, until: 0 }; this.trees.set(i, t); }
    const T = treeType(t.kind), now = Date.now(); if (t.left > T.logs) t.left = T.logs; if (t.until && (now >= t.until || t.until - now > T.regrow)) { t.left = T.logs; t.until = 0; t.cut = 0; }
    // left alone for a while, a partly cut tree slowly grows its logs back
    if (!t.until && t.cut && t.left < T.logs) { const grown = Math.floor((now - t.cut - T.regenDelay) / T.regenEvery); if (grown > 0) t.left = Math.min(T.logs, (t.leftAtCut ?? t.left) + grown); if (t.left >= T.logs) t.cut = 0; }
    return t; }
  treeView(t) { return [t.i, t.left, t.until ? Math.max(0, t.until - Date.now()) : 0, t.cut ? Date.now() - t.cut : -1]; }
  onChop(p, m) {
    const i = m.i; if (this.inst || !Number.isInteger(i) || i < 0 || i >= TREE_MAX) return;
    const now = Date.now(); if (now - (p.lastChop || 0) < CHOP_GAP_MS) return; p.lastChop = now;
    const t = this.tree(i, typeof m.k === 'string' ? m.k : 'oak');
    if (!t.until && m.ok) { t.left--; t.cut = now; t.leftAtCut = t.left; if (t.left <= 0) { t.left = 0; t.until = now + treeType(t.kind).regrow; } this.ctx.storage.put('trees', [...this.trees.values()]).catch(() => { }); }
    if (!t.until && !m.ok && t.cut) { t.cut = now; t.leftAtCut = t.left; }   // a swing that missed still counts as cutting
    const [, left, wait] = this.treeView(t); this.all({ t: 'T', i, left, wait, by: p.id });
  }
  onTake(p, m) {
    const d = this.drops.get(String(m.did || '')), now = Date.now();
    if (!d || (d.exp && now > d.exp)) return send(p.ws, { t: 'gone', did: String(m.did || '').slice(0, 24) });
    if (d.by !== p.id && now < d.pub) return send(p.ws, { t: 'nope', did: d.did });
    this.drops.delete(d.did); this.saveDrops();
    this.all({ t: 'took', did: d.did, by: p.id, it: d.it, n: d.n });
    // Wilderness loot: a receipt the website accepts with the next save, so a big haul isn't mistaken for cheating
    if (d.pk && this.env.RT_SECRET) signToken({ iss: 'lanternhold-loot', sub: p.id, it: d.it, n: d.n, jti: d.did, exp: Math.floor(now / 1000) + 1800 }, this.env.RT_SECRET).then(tk => send(p.ws, { t: 'RC', tk })).catch(() => { });
  }
  all(o, except) { const s = JSON.stringify(o); for (const p of this.players.values()) if (p.id !== except && !p.ghost) send(p.ws, s); }
  join(who, ws) {
    const old = this.players.get(who.id), now = Date.now();
    if (old) { clearTimeout(old.ghostT); if (!old.ghost) try { old.ws.close(4000, 'replaced'); } catch { } }
    const p = { id: who.id, name: who.name, adm: who.adm, hat: who.hat, mu: !!who.mu, fd: !!who.fd, ws, x: old ? old.x : 0, y: old ? old.y : 0, d: 'down', m: false, look: old ? old.look : null, joined: old ? old.joined : now + (this.seq++) / 1000, dirty: false, tok: 50, tokAt: now, seen: now,
      // a Hold world only shows a hero to others once they've said where they are (no faceless heroes flickering at the spawn)
      rd: this.inst || !!(old && old.rd) };
    if (old && !this.inst) for (const k of ['hp', 'hpAt', 'lc', 'sk', 'ag', 'dmg', 'risk', 'safe']) p[k] = old[k];   // back mid-fight: same health, same skull
    this.players.set(who.id, p); this.att(p);
    if (this.inst && !this.host()) this.pick();
    const fight = !this.inst && old && old.rd && wildLvl(old.y) ? { x: old.x, y: old.y, hp: Math.ceil(this.hpOf(p, now)), max: pvpMax(p.look), sk: (p.sk || 0) > now ? p.sk - now : 0 } : null;
    send(ws, { t: 'hi', me: who.id, room: this.id, host: this.inst ? this.cfg.host : null, seed: this.inst ? this.cfg.seed : null, floor: this.inst ? this.cfg.floor : null, pvp: this.inst ? 0 : 1, back: fight,
      players: [...this.players.values()].filter(x => x.id !== who.id && x.rd).map(x => this.pub(x)),
      drops: (this.pruneDrops(), [...this.drops.values()].filter(d => !this.inst || d.f === (this.cfg ? this.cfg.floor : null)).map(d => this.dropView(d, who.id))),
      trees: this.inst ? null : [...this.trees.values()].map(t => this.treeView(this.tree(t.i))).filter((v, j) => v[2] > 0 || v[1] < treeType([...this.trees.values()][j].kind).logs) });
    if (!old && p.rd) this.all({ t: '+', p: this.pub(p) }, who.id);
    p.seen = Date.now();
  }
  onMessage(p, m) {
    const t = m.t;
    if (t === 's') {
      const x = +m.x, y = +m.y; if (!(x >= 0 && x < 20000 && y >= 0 && y < 20000)) return;
      const now = Date.now();
      // in a fight nobody teleports away: a jump further than anyone can walk is sent back
      if (!this.inst && p.rd && now - (p.lc || 0) < PVP.combatMs && Math.hypot(x - p.x, y - p.y) > 24 + 200 * Math.max(0, now - (p.sAt || now)) / 1000) { p.sAt = now; return send(p.ws, { t: 'pos', x: p.x, y: p.y }); }
      // just defeated: the Wilderness is off limits for a few seconds (the hero is back at the Hold)
      if (!this.inst && (p.home || 0) > now && wildLvl(y)) { p.sAt = now; return send(p.ws, { t: 'pos', x: p.x, y: p.y, home: 1 }); }
      p.sAt = now;
      p.x = Math.round(x * 10) / 10; p.y = Math.round(y * 10) / 10; p.d = DIRS.has(m.d) ? m.d : p.d; p.m = !!m.m;
      if (!p.rd) { p.rd = true; this.att(p); this.all({ t: '+', p: this.pub(p) }, p.id); return; }
      p.dirty = true;
      if (!this.flushT) this.flushT = setTimeout(() => this.flush(), 100);
      return;
    }
    if (t === 'look') { p.look = cleanLook(m.look, p.hat, p.fd); this.att(p); if (p.rd) this.all({ t: 'L', id: p.id, look: p.look }, p.id); return; }
    if (t === 'atk') return this.onAtk(p, m);
    if (t === 'home') return this.onHome(p, m);
    if (t === 'risk' && !this.inst) {   // what this hero would drop if they fell in the Wilderness, most valuable first
      const list = (Array.isArray(m.it) ? m.it : []).slice(0, 80).filter(e => Array.isArray(e) && typeof e[0] === 'string' && /^[a-z0-9_]{1,32}$/.test(e[0]) && Number.isInteger(e[1]) && e[1] > 0 && e[1] <= 1e7)
        .map(e => [e[0], e[1], SLOTS.has(e[2]) ? e[2] : 0, Math.max(0, Math.min(1e6, Number(e[3]) || 0))]).sort((a, b) => b[3] - a[3]);
      p.risk = list; this.ctx.storage.put('rk:' + p.id, list).catch(() => { });
      const now = Date.now(), sk = Number(m.sk);   // the game remembers its own skull across worlds; it can only ever make itself skulled
      if (sk > 0 && now + Math.min(PVP.skullMs, sk) > (p.sk || 0) + 2000) { const was = (p.sk || 0) > now; p.sk = now + Math.min(PVP.skullMs, sk); this.att(p); if (!was && p.rd) this.all({ t: 'SK', id: p.id, left: p.sk - now }); }
      return;
    }
    if (t === 'eat' && !this.inst) {
      const h = Number.isInteger(m.h) && m.h > 0 && m.h <= 80 ? m.h : 0, now = Date.now(); if (!h || p.dead || now - (p.eatAt || 0) < PVP.eatGap) return; p.eatAt = now;
      const max = pvpMax(p.look), hp = Math.min(max, this.hpOf(p, now) + h); this.setHp(p, hp, now); this.att(p);
      return this.all({ t: 'H', id: p.id, hp: Math.ceil(hp), max });
    }
    if (t === 'say') {
      if (p.mu) return send(p.ws, { t: 'muted', on: true, said: 1 });
      const now = Date.now(); if (now - (p.lastSay || 0) < 1200) return send(p.ws, { t: 'slow' }); p.lastSay = now;
      const text = cleanText(m.text); if (!text) return;
      const msg = { t: 'say', id: p.id, name: p.name, text, at: now, n: now * 1000 + (++this.seq % 1000) };
      return this.all(msg);
    }
    if (t === 'fish') {
      const f = m.f && typeof m.f === 'object' && DIRS.has(m.f.d) && FISH_PH.has(m.f.ph) && +m.f.bx >= 0 && +m.f.bx < 20000 && +m.f.by >= 0 && +m.f.by < 20000
        ? { d: m.f.d, ph: m.f.ph, bx: Math.round(+m.f.bx), by: Math.round(+m.f.by) } : null;
      p.fish = f; this.att(p); if (p.rd) this.all({ t: 'F', id: p.id, f }, p.id); return;
    }
    if (t === 'drop') return this.onDrop(p, m);
    if (t === 'take') return this.onTake(p, m);
    if (t === 'chop') return this.onChop(p, m);
    if (TRADE_MSG.has(t)) return this.inst ? undefined : this.onTrade(p, t, m);
    if (!this.inst && !(t === 'sw' && p.rd && (wildLvl(p.y) || p.x < WEST_X))) return;   // in a Hold world, swings and casts only show in the Wilderness and Hollowmere
    if (t === 'sw') {   // a swing in a party dungeon: everyone else sees the blade, the damage numbers and the ore chips
      const now = Date.now(); if (now - (p.lastSw || 0) < 120) return; p.lastSw = now;
      const h = Array.isArray(m.h) ? m.h.slice(0, 8).filter(x => Array.isArray(x) && Number.isInteger(x[0]) && Number.isFinite(+x[1])).map(x => [x[0], Math.max(0, Math.min(9999, Math.round(+x[1])))]) : [];
      const c = typeof m.c === 'string' && /^[a-z]{3,12}$/.test(m.c) ? m.c : undefined, a = Number.isFinite(+m.a) ? Math.round(Math.max(-7, Math.min(7, +m.a)) * 100) / 100 : undefined;   // a spell cast (v0.12)
      return this.all({ t: 'W', id: p.id, d: DIRS.has(m.d) ? m.d : 'down', h, o: Number.isInteger(m.o) && m.o >= 0 && m.o < 5000 ? m.o : -1, c, a }, p.id);
    }
    const host = this.cfg.host;
    if (HOST_OUT.has(t) && p.id === host) {
      if (t === 'floor' && Number.isInteger(m.f) && m.f > 0 && m.f < 100) { this.cfg.floor = m.f; this.ctx.storage.put('cfg', this.cfg).catch(() => { }); let ch = false; for (const [k, d] of this.drops) if (d.f !== m.f) { this.drops.delete(k); ch = true; } if (ch) this.saveDrops(); }
      const out = Object.assign({}, m, { from: p.id });
      if (typeof m.to === 'string') { const q = this.players.get(m.to); if (q) send(q.ws, out); } else this.all(out, p.id);
      return;
    }
    if (TO_HOST.has(t) && p.id !== host) { const h = this.players.get(host); if (h) send(h.ws, Object.assign({}, m, { from: p.id })); }
  }
  flush() {
    this.flushT = null; const rows = [];
    for (const p of this.players.values()) if (p.dirty && p.rd) { p.dirty = false; this.att(p); rows.push([p.id, p.x, p.y, p.d, p.m ? 1 : 0]); }
    if (rows.length) this.all({ t: 'S', p: rows });
  }
}
const ADMIN_HATS = ['partyhat', 'greenhat'];
function cleanLook(l, hat, fd) {   // fd: holds a Founder's Lantern, so may show the Founder's Flame
  if (!l || typeof l !== 'object') return null;
  const i = v => Number.isInteger(v) && v >= 0 && v < 40 ? v : 0, s = v => typeof v === 'string' && /^[a-z]{1,12}$/.test(v) ? v : null;
  const helm = s(l.helm);
  return { skin: i(l.skin), hair: i(l.hair), cloth: i(l.cloth), style: i(l.style), armor: s(l.armor), cape: s(l.cape), cw: s(l.cw), ch: s(l.ch), helm: ADMIN_HATS.includes(helm) && helm !== hat ? null : helm, lan: s(l.lan), blade: s(l.blade), lvl: Number.isInteger(l.lvl) && l.lvl >= 1 && l.lvl <= 200 ? l.lvl : 1, flame: fd && l.flame === 'founder' ? 'founder' : null };
}
