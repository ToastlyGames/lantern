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
    return { id: c.sub, name: c.n, adm: !!c.adm };
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

// ---------- Lobby: one for the whole game ----------
export class Lobby {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env;
    this.users = new Map();      // id -> { id, name, adm, ws, room, floor, party, on, lastFeed, offT }
    this.watchers = new Map();   // id -> Set of ids watching them (friends lists)
    this.parties = new Map();    // partyId -> { id, leader, members: [id], inst: { room, floor, seed } | null }
    this.invites = new Map();    // toId -> Map(fromId -> at)
    this.feedQ = []; this.feedT = null; this.lastFeedAt = 0;
    // Players send a heartbeat every 20 s. A connection silent for 75 s is dead (phone locked, network gone): close it.
    this.sweep = setInterval(() => { const now = Date.now(); for (const u of this.users.values()) if (u.on && now - (u.seen || now) > 75000) { try { u.ws.close(4001, 'silent'); } catch { } this.dropSilent(u); } }, 15000);
    ctx.blockConcurrencyWhile(async () => {
      const saved = await ctx.storage.get('parties');
      if (saved) for (const p of saved) this.parties.set(p.id, p);
    });
  }
  persist() { this.ctx.storage.put('parties', [...this.parties.values()]).catch(() => { }); }
  async fetch(req) {
    const who = JSON.parse(req.headers.get('x-lh-who'));
    const [client, server] = Object.values(new WebSocketPair());
    server.accept();
    this.connect(who, server);
    return new Response(null, { status: 101, webSocket: client });
  }
  dropSilent(u) { if (u.drop) u.drop(); }
  online() { let n = 0; for (const u of this.users.values()) if (u.on) n++; return n; }
  partyOf(id) { const u = this.users.get(id); return u && u.party ? this.parties.get(u.party) : null; }
  view(p) { return p ? { id: p.id, leader: p.leader, inst: p.inst, members: p.members.map(m => { const u = this.users.get(m); return { id: m, name: u ? u.name : m, on: !!(u && u.on), room: u && u.on ? u.room : null, floor: u && u.on ? u.floor : null }; }) } : null; }
  pushParty(p) { const v = this.view(p); for (const m of p.members) { const u = this.users.get(m); if (u && u.on) send(u.ws, { t: 'party', party: v }); } }
  status(id) { const u = this.users.get(id); return { id, on: !!(u && u.on), room: u && u.on ? u.room : null, floor: u && u.on ? u.floor : null }; }
  notifyWatchers(id) { const s = this.status(id); for (const w of this.watchers.get(id) || []) { const u = this.users.get(w); if (u && u.on) send(u.ws, { t: 'status', list: [s] }); } }
  note(u, text, bad) { send(u.ws, { t: 'note', text, bad: !!bad }); }

  connect(who, ws) {
    let u = this.users.get(who.id);
    if (u && u.on && u.ws !== ws) { send(u.ws, { t: 'kicked', reason: 'You signed in somewhere else.' }); try { u.ws.close(4000, 'replaced'); } catch { } }
    if (!u) { u = { id: who.id, party: null }; this.users.set(who.id, u); }
    Object.assign(u, { name: who.name, adm: who.adm, ws, on: true, room: null, floor: null, tok: 50, tokAt: Date.now() });
    clearTimeout(u.offT);
    // rejoin a saved party after a reconnect or a server restart
    if (!u.party) for (const p of this.parties.values()) if (p.members.includes(u.id)) u.party = p.id;
    send(ws, { t: 'hello', you: u.id, online: this.online(), party: this.view(this.partyOf(u.id)) });
    const p = this.partyOf(u.id); if (p) this.pushParty(p);
    this.notifyWatchers(u.id);
    u.seen = Date.now();
    ws.addEventListener('message', ev => { if (u.ws !== ws) return; u.seen = Date.now(); if (ev.data === '{"t":"ping"}') return send(ws, '{"t":"pong"}'); if (!allow(u)) return; let m; try { m = JSON.parse(ev.data); } catch { return; } if (m && typeof m.t === 'string') this.onMessage(u, m); });
    u.drop = () => gone();
    const gone = () => { if (u.ws !== ws || !u.on) return; u.on = false; u.room = null; this.notifyWatchers(u.id); const p2 = this.partyOf(u.id); if (p2) { this.pushParty(p2); this.checkInst(p2); }
      u.offT = setTimeout(() => { if (!u.on) { this.leaveParty(u, true); this.users.delete(u.id); } }, OFFLINE_GRACE_MS); };
    ws.addEventListener('close', gone); ws.addEventListener('error', gone);
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
      case 'where': {
        const room = typeof m.room === 'string' && ROOM_RE.test(m.room) ? m.room : null;
        u.room = room; u.floor = room && room[0] === 'd' && Number.isInteger(m.floor) && m.floor > 0 && m.floor < 100 ? m.floor : null;
        this.notifyWatchers(u.id); const p = this.partyOf(u.id); if (p) { this.checkInst(p); this.pushParty(p); }
        return;
      }
      case 'watch': {
        const ids = Array.isArray(m.ids) ? m.ids.filter(x => typeof x === 'string' && /^[a-z0-9_]{3,16}$/.test(x)).slice(0, 250) : [];
        for (const old of u.watching || []) this.watchers.get(old)?.delete(u.id);
        u.watching = new Set(ids);
        for (const id of ids) { if (!this.watchers.has(id)) this.watchers.set(id, new Set()); this.watchers.get(id).add(u.id); }
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
    p.members.push(u.id); u.party = p.id; this.persist();
    this.pushParty(p);
    for (const id of p.members) if (id !== u.id) { const x = this.users.get(id); if (x && x.on) this.note(x, u.name + ' joined the party.'); }
    if (p.inst) send(u.ws, Object.assign({ t: 'partyDelve', by: (this.users.get(p.leader) || {}).name || 'Your party' }, p.inst));
  }
  leaveParty(u, quiet) {
    const p = this.partyOf(u.id) || [...this.parties.values()].find(x => x.members.includes(u.id));
    u.party = null; if (!p) { if (!quiet && u.on) send(u.ws, { t: 'party', party: null }); return; }
    p.members = p.members.filter(x => x !== u.id);
    if (u.on) send(u.ws, { t: 'party', party: null });
    if (p.members.length <= 1) {                       // a party of one is no party
      for (const id of p.members) { const x = this.users.get(id); if (x) { x.party = null; if (x.on) { send(x.ws, { t: 'party', party: null }); this.note(x, 'Your party has disbanded.'); } } }
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
export class Room {
  constructor(ctx, env) {
    this.ctx = ctx; this.env = env; this.players = new Map(); this.chat = []; this.flushT = null; this.seq = 0;
    this.cfg = null;   // dungeon instances only: { allowed: [ids], host, seed, floor }
    ctx.blockConcurrencyWhile(async () => { this.cfg = (await ctx.storage.get('cfg')) || null; });
    // Remove players whose connection went silent (no heartbeat for 75 s), so nobody is left standing frozen on others' screens.
    this.sweep = setInterval(() => { const now = Date.now(); for (const p of [...this.players.values()]) if (now - (p.seen || now) > 75000) { try { p.ws.close(4001, 'silent'); } catch { } p.drop && p.drop(); } }, 15000);
  }
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/setup' && req.method === 'POST') {          // called by the Lobby only (not reachable from outside)
      const c = await req.json(); this.cfg = { allowed: c.allowed, host: c.host, seed: c.seed, floor: c.floor };
      await this.ctx.storage.put('cfg', this.cfg); return new Response('ok');
    }
    const who = JSON.parse(req.headers.get('x-lh-who')), room = req.headers.get('x-lh-room');
    this.id = room; this.inst = room[0] === 'd';
    const [client, server] = Object.values(new WebSocketPair());
    server.accept();
    if (this.inst && !(this.cfg && this.cfg.allowed.includes(who.id))) { send(server, { t: 'denied', reason: 'This dungeon belongs to another party.' }); server.close(4003, 'denied'); }
    else if (!this.inst && this.players.size >= WORLD_CAP && !this.players.has(who.id)) { send(server, { t: 'full' }); server.close(4009, 'full'); }
    else this.join(who, server);
    return new Response(null, { status: 101, webSocket: client });
  }
  host() { if (!this.inst) return null; const h = this.cfg.host; if (this.players.has(h)) return h; return null; }
  pick() {  // a new host when the old one leaves: whoever has been here longest
    let best = null; for (const p of this.players.values()) if (!best || p.joined < best.joined) best = p;
    this.cfg.host = best ? best.id : this.cfg.host; this.ctx.storage.put('cfg', this.cfg).catch(() => { });
    if (best) this.all({ t: 'host', id: best.id });
  }
  pub(p) { return { id: p.id, name: p.name, look: p.look, x: p.x, y: p.y, d: p.d, m: p.m }; }
  all(o, except) { const s = JSON.stringify(o); for (const p of this.players.values()) if (p.id !== except) send(p.ws, s); }
  join(who, ws) {
    const old = this.players.get(who.id);
    if (old) { try { old.ws.close(4000, 'replaced'); } catch { } }
    const p = { id: who.id, name: who.name, adm: who.adm, ws, x: old ? old.x : 0, y: old ? old.y : 0, d: 'down', m: false, look: old ? old.look : null, joined: old ? old.joined : Date.now() + (this.seq++) / 1000, dirty: false, tok: 50, tokAt: Date.now() };
    this.players.set(who.id, p);
    if (this.inst && !this.host()) this.pick();
    send(ws, { t: 'hi', me: who.id, room: this.id, host: this.inst ? this.cfg.host : null, seed: this.inst ? this.cfg.seed : null, floor: this.inst ? this.cfg.floor : null,
      players: [...this.players.values()].filter(x => x.id !== who.id).map(x => this.pub(x)), chat: this.chat });
    if (!old) this.all({ t: '+', p: this.pub(p) }, who.id);
    p.seen = Date.now();
    ws.addEventListener('message', ev => { if (this.players.get(who.id) !== p) return; p.seen = Date.now(); if (ev.data === '{"t":"ping"}') return send(ws, '{"t":"pong"}'); if (!allow(p)) return; if (typeof ev.data !== 'string' || ev.data.length > 6000) return; let m; try { m = JSON.parse(ev.data); } catch { return; } if (m && typeof m.t === 'string') this.onMessage(p, m); });
    const gone = () => { if (this.players.get(who.id) !== p) return; this.players.delete(who.id); this.all({ t: '-', id: who.id });
      if (this.inst && this.cfg.host === who.id) this.pick(); };
    p.drop = gone;
    ws.addEventListener('close', gone); ws.addEventListener('error', gone);
  }
  onMessage(p, m) {
    const t = m.t;
    if (t === 's') {
      const x = +m.x, y = +m.y; if (!(x >= 0 && x < 20000 && y >= 0 && y < 20000)) return;
      p.x = Math.round(x * 10) / 10; p.y = Math.round(y * 10) / 10; p.d = DIRS.has(m.d) ? m.d : p.d; p.m = !!m.m; p.dirty = true;
      if (!this.flushT) this.flushT = setTimeout(() => this.flush(), 100);
      return;
    }
    if (t === 'look') { p.look = cleanLook(m.look, p.adm); return this.all({ t: 'L', id: p.id, look: p.look }, p.id); }
    if (t === 'say') {
      const now = Date.now(); if (now - (p.lastSay || 0) < 1200) return send(p.ws, { t: 'slow' }); p.lastSay = now;
      const text = cleanText(m.text); if (!text) return;
      const msg = { t: 'say', id: p.id, name: p.name, text, at: now, n: ++this.seq };
      this.chat.push(msg); if (this.chat.length > 30) this.chat.shift();
      return this.all(msg);
    }
    if (!this.inst) return;
    const host = this.cfg.host;
    if (HOST_OUT.has(t) && p.id === host) {
      if (t === 'floor' && Number.isInteger(m.f) && m.f > 0 && m.f < 100) { this.cfg.floor = m.f; this.ctx.storage.put('cfg', this.cfg).catch(() => { }); }
      const out = Object.assign({}, m, { from: p.id });
      if (typeof m.to === 'string') { const q = this.players.get(m.to); if (q) send(q.ws, out); } else this.all(out, p.id);
      return;
    }
    if (TO_HOST.has(t) && p.id !== host) { const h = this.players.get(host); if (h) send(h.ws, Object.assign({}, m, { from: p.id })); }
  }
  flush() {
    this.flushT = null; const rows = [];
    for (const p of this.players.values()) if (p.dirty) { p.dirty = false; rows.push([p.id, p.x, p.y, p.d, p.m ? 1 : 0]); }
    if (rows.length) this.all({ t: 'S', p: rows });
  }
}
function cleanLook(l, adm) {
  if (!l || typeof l !== 'object') return null;
  const i = v => Number.isInteger(v) && v >= 0 && v < 40 ? v : 0, s = v => typeof v === 'string' && /^[a-z]{1,12}$/.test(v) ? v : null;
  const helm = s(l.helm);
  return { skin: i(l.skin), hair: i(l.hair), cloth: i(l.cloth), style: i(l.style), armor: s(l.armor), cape: s(l.cape), helm: helm === 'partyhat' && !adm ? null : helm, lan: s(l.lan), blade: s(l.blade) };
}
