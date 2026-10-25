// Lanternhold realtime server (Cloudflare Workers + Durable Objects).
//
//   /lobby?t=TICKET        one global Lobby: who's online, friend status, parties, invites, picking a world, the world feed
//   /room/w3?t=TICKET      a Hold world (up to 50 players): positions, looks, chat
//   /room/d-xxxx?t=TICKET  a dungeon instance (solo or one party): the same, plus relaying the host's monsters
//
// TICKET is a 2-minute HS256 token from the game's /api/rt-ticket, signed with RT_SECRET (shared with Vercel).
// Every message is JSON. The server never trusts names from clients: the hero name comes from the ticket.

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
    return { id: c.sub, name: c.n, adm: !!c.adm, hat: c.adm ? (c.hat === 'greenhat' ? 'greenhat' : 'partyhat') : null };
  } catch { return null; }
}
export function cleanText(t) {
  if (typeof t !== 'string') return '';
  t = t.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140);
  for (const w of BAD) t = t.replace(new RegExp('\\b' + w + '\\w*', 'gi'), m => m[0] + '*'.repeat(m.length - 1));
  return t;
}
const send = (ws, o) => { try { ws.send(typeof o === 'string' ? o : JSON.stringify(o)); } catch { } };
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
  att(u) { if (!u.on) return; try { u.ws.serializeAttachment({ id: u.id, name: u.name, adm: u.adm, hat: u.hat, room: u.room, floor: u.floor, party: u.party, at: u.at, seen: u.seen, watching: u.watching ? [...u.watching].slice(0, 100) : null }); } catch { } }
  async fetch(req) {
    const who = JSON.parse(req.headers.get('x-lh-who'));
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    this.connect(who, server);
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
    Object.assign(u, { name: who.name, adm: who.adm, hat: who.hat, ws, on: true, room: null, floor: null, tok: 50, tokAt: Date.now(), at: Date.now() });
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
      case 'pchat': { const p = this.partyOf(u.id), text = cleanText(m.text); if (!p || !text) return; if (Date.now() - (u.lastP || 0) < 1000) return; u.lastP = Date.now();
        for (const id of p.members) { const x = this.users.get(id); if (x && x.on) send(x.ws, { t: 'pchat', id: u.id, name: u.name, text }); } return; }
      case 'feed': return this.feed(u, m);
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
    floor = Number.isInteger(floor) && floor >= 1 && floor <= 15 ? floor : 1;
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
    const T = { loot: a && `found a ${a}`, boss: a && `defeated ${a}`, level: a && /^\d{1,3}$/.test(a) && `reached combat level ${a}`, skill: a && `reached ${a}`, deep: a && /^\d{1,3}$/.test(a) && `reached floor ${a} of the Depths` }[m.k];
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
const TO_HOST = new Set(['hit', 'act', 'mine', 'shade', 'down', 'sync']);                    // a player -> the host
const FISH_PH = new Set(['cast', 'wait', 'bite', 'reel']);
// Tree types (match TREES in the game's data.js): logs per tree and regrow time. Higher-level trees in later areas hold
// fewer logs and take longer to regrow.
// regenDelay/regenEvery: a tree nobody has cut for regenDelay grows back 1 log every regenEvery, up to full.
const TREE_TYPES = { oak: { logs: 300, regrow: 20e3, regenDelay: 15e3, regenEvery: 2e3 } }, TREE_MAX = 64, CHOP_GAP_MS = 1200;
const treeType = k => TREE_TYPES[k] || TREE_TYPES.oak;
const DROP_MAX = 400, DROP_PRIVATE_MS = 30e3, DROP_LIFE_MS = 180e3, LOOT_LIFE_MS = 30 * 60e3;
export class Room {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env; this.players = new Map(); this.flushT = null; this.seq = 0; this.drops = new Map(); this.trees = new Map();
    this.cfg = null;   // dungeon instances only: { allowed: [ids], host, seed, floor }
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
  att(p) { try { p.ws.serializeAttachment({ id: p.id, name: p.name, adm: p.adm, hat: p.hat, x: p.x, y: p.y, d: p.d, m: p.m, look: p.look, joined: p.joined, seen: p.seen, fish: p.fish || null }); } catch { } }
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/setup' && req.method === 'POST') {          // called by the Lobby only (not reachable from outside)
      const c = await req.json(); this.cfg = { allowed: c.allowed, host: c.host, seed: c.seed, floor: c.floor };
      await this.ctx.storage.put('cfg', this.cfg); return new Response('ok');
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
    for (const p of [...this.players.values()]) if (now - lastHeard(this.ctx, p.ws, p.seen) > SILENT_MS) { try { p.ws.close(4001, 'silent'); } catch { } this.gone(p, p.ws); }
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
    if (this.players.get(p.id) !== p || p.ws !== ws) return; this.players.delete(p.id); this.all({ t: '-', id: p.id });
    if (this.inst && this.cfg && this.cfg.host === p.id) this.pick();
  }
  host() { if (!this.inst) return null; const h = this.cfg.host; if (this.players.has(h)) return h; return null; }
  pick() {  // a new host when the old one leaves: whoever has been here longest
    let best = null; for (const p of this.players.values()) if (!best || p.joined < best.joined) best = p;
    this.cfg.host = best ? best.id : this.cfg.host; this.ctx.storage.put('cfg', this.cfg).catch(() => { });
    if (best) this.all({ t: 'host', id: best.id });
  }
  pub(p) { return { id: p.id, name: p.name, adm: p.adm ? 1 : 0, look: p.look, x: p.x, y: p.y, d: p.d, m: p.m, fish: p.fish || null }; }
  // ---- items on the ground: dungeon loot (seen by the whole party at once) and items dropped from a bag (the dropper sees
  // them at once, everyone else after 30 s). The server decides who picks each one up, so nothing is ever picked up twice.
  pruneDrops() { const now = Date.now(); let ch = false; for (const [k, d] of this.drops) if (d.exp && now > d.exp) { this.drops.delete(k); ch = true; }
    while (this.drops.size > DROP_MAX) { this.drops.delete(this.drops.keys().next().value); ch = true; } return ch; }
  saveDrops() { this.ctx.storage.put('drops', [...this.drops.values()]).catch(() => { }); }
  dropView(d, forId) { return { did: d.did, it: d.it, n: d.n, x: d.x, y: d.y, vx: d.vx, vy: d.vy, f: d.f, by: d.by, bag: d.bag ? 1 : 0, wait: forId === d.by ? 0 : Math.max(0, d.pub - Date.now()), left: d.exp ? Math.max(0, d.exp - Date.now()) : null }; }
  onDrop(p, m) {
    const it = typeof m.it === 'string' && /^[a-z0-9_]{1,32}$/.test(m.it) ? m.it : null, n = Number.isInteger(m.n) && m.n >= 1 && m.n <= 1e6 ? m.n : 0;
    const x = +m.x, y = +m.y; if (!it || !n || !(x >= 0 && x < 20000 && y >= 0 && y < 20000)) return;
    const now = Date.now(), bag = !!m.bag, f = this.inst ? (this.cfg ? this.cfg.floor : null) : null;
    const v = q => Number.isFinite(+q) ? Math.max(-200, Math.min(200, Math.round(+q))) : 0;
    const d = { did: rid(10), it, n, x: Math.round(x), y: Math.round(y), vx: v(m.vx), vy: v(m.vy), f, by: p.id, bag, at: now, pub: bag ? now + DROP_PRIVATE_MS : now, exp: bag ? now + DROP_LIFE_MS : now + LOOT_LIFE_MS };
    this.pruneDrops(); this.drops.set(d.did, d); this.saveDrops();
    send(p.ws, Object.assign({ t: 'D', ref: typeof m.ref === 'string' ? m.ref.slice(0, 24) : null }, { d: this.dropView(d, p.id) }));
    const s = JSON.stringify({ t: 'D', d: this.dropView(d, null) }); for (const q of this.players.values()) if (q.id !== p.id) send(q.ws, s);
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
  }
  all(o, except) { const s = JSON.stringify(o); for (const p of this.players.values()) if (p.id !== except) send(p.ws, s); }
  join(who, ws) {
    const old = this.players.get(who.id);
    if (old) { try { old.ws.close(4000, 'replaced'); } catch { } }
    const p = { id: who.id, name: who.name, adm: who.adm, hat: who.hat, ws, x: old ? old.x : 0, y: old ? old.y : 0, d: 'down', m: false, look: old ? old.look : null, joined: old ? old.joined : Date.now() + (this.seq++) / 1000, dirty: false, tok: 50, tokAt: Date.now(), seen: Date.now() };
    this.players.set(who.id, p); this.att(p);
    if (this.inst && !this.host()) this.pick();
    send(ws, { t: 'hi', me: who.id, room: this.id, host: this.inst ? this.cfg.host : null, seed: this.inst ? this.cfg.seed : null, floor: this.inst ? this.cfg.floor : null,
      players: [...this.players.values()].filter(x => x.id !== who.id).map(x => this.pub(x)),
      drops: (this.pruneDrops(), [...this.drops.values()].filter(d => !this.inst || d.f === (this.cfg ? this.cfg.floor : null)).map(d => this.dropView(d, who.id))),
      trees: this.inst ? null : [...this.trees.values()].map(t => this.treeView(this.tree(t.i))).filter((v, j) => v[2] > 0 || v[1] < treeType([...this.trees.values()][j].kind).logs) });
    if (!old) this.all({ t: '+', p: this.pub(p) }, who.id);
    p.seen = Date.now();
  }
  onMessage(p, m) {
    const t = m.t;
    if (t === 's') {
      const x = +m.x, y = +m.y; if (!(x >= 0 && x < 20000 && y >= 0 && y < 20000)) return;
      p.x = Math.round(x * 10) / 10; p.y = Math.round(y * 10) / 10; p.d = DIRS.has(m.d) ? m.d : p.d; p.m = !!m.m; p.dirty = true;
      if (!this.flushT) this.flushT = setTimeout(() => this.flush(), 100);
      return;
    }
    if (t === 'look') { p.look = cleanLook(m.look, p.hat); this.att(p); return this.all({ t: 'L', id: p.id, look: p.look }, p.id); }
    if (t === 'say') {
      const now = Date.now(); if (now - (p.lastSay || 0) < 1200) return send(p.ws, { t: 'slow' }); p.lastSay = now;
      const text = cleanText(m.text); if (!text) return;
      const msg = { t: 'say', id: p.id, name: p.name, text, at: now, n: now * 1000 + (++this.seq % 1000) };
      return this.all(msg);
    }
    if (t === 'fish') {
      const f = m.f && typeof m.f === 'object' && DIRS.has(m.f.d) && FISH_PH.has(m.f.ph) && +m.f.bx >= 0 && +m.f.bx < 20000 && +m.f.by >= 0 && +m.f.by < 20000
        ? { d: m.f.d, ph: m.f.ph, bx: Math.round(+m.f.bx), by: Math.round(+m.f.by) } : null;
      p.fish = f; this.att(p); return this.all({ t: 'F', id: p.id, f }, p.id);
    }
    if (t === 'drop') return this.onDrop(p, m);
    if (t === 'take') return this.onTake(p, m);
    if (t === 'chop') return this.onChop(p, m);
    if (!this.inst) return;
    if (t === 'sw') {   // a swing in a party dungeon: everyone else sees the blade, the damage numbers and the ore chips
      const now = Date.now(); if (now - (p.lastSw || 0) < 120) return; p.lastSw = now;
      const h = Array.isArray(m.h) ? m.h.slice(0, 8).filter(x => Array.isArray(x) && Number.isInteger(x[0]) && Number.isFinite(+x[1])).map(x => [x[0], Math.max(0, Math.min(9999, Math.round(+x[1])))]) : [];
      return this.all({ t: 'W', id: p.id, d: DIRS.has(m.d) ? m.d : 'down', h, o: Number.isInteger(m.o) && m.o >= 0 && m.o < 5000 ? m.o : -1 }, p.id);
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
    for (const p of this.players.values()) if (p.dirty) { p.dirty = false; this.att(p); rows.push([p.id, p.x, p.y, p.d, p.m ? 1 : 0]); }
    if (rows.length) this.all({ t: 'S', p: rows });
  }
}
const ADMIN_HATS = ['partyhat', 'greenhat'];
function cleanLook(l, hat) {
  if (!l || typeof l !== 'object') return null;
  const i = v => Number.isInteger(v) && v >= 0 && v < 40 ? v : 0, s = v => typeof v === 'string' && /^[a-z]{1,12}$/.test(v) ? v : null;
  const helm = s(l.helm);
  return { skin: i(l.skin), hair: i(l.hair), cloth: i(l.cloth), style: i(l.style), armor: s(l.armor), cape: s(l.cape), helm: ADMIN_HATS.includes(helm) && helm !== hat ? null : helm, lan: s(l.lan), blade: s(l.blade), lvl: Number.isInteger(l.lvl) && l.lvl >= 1 && l.lvl <= 200 ? l.lvl : 1 };
}
