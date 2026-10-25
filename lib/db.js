// Data access. Production uses Supabase (Postgres) with the service-role key, server-side only.
// Local development and tests use an in-memory store with the same functions.
import { createClient } from '@supabase/supabase-js';

let impl = null;
export function db() {
  if (impl) return impl;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) impl = supabaseDb();
  else if (process.env.LH_MEMORY_DB === '1') impl = memoryDb();
  else throw new Error('Database not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  return impl;
}

// Forgive common copy-paste mistakes in the Supabase settings: spaces or quotes, a missing https://,
// a trailing /rest/v1, the dashboard link, or just the 20-letter project ID.
export function supabaseUrl(raw = process.env.SUPABASE_URL) {
  let u = String(raw || '').trim().replace(/^["'<]+|["'>]+$/g, '').trim();
  const dash = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9]{20})/i);
  if (dash) u = `https://${dash[1].toLowerCase()}.supabase.co`;
  else if (/^[a-z0-9]{20}$/i.test(u)) u = `https://${u.toLowerCase()}.supabase.co`;
  else if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u.replace(/\/(rest\/v1\/?)?$/i, '').replace(/\/+$/, '');
}
export const supabaseKey = (raw = process.env.SUPABASE_SERVICE_ROLE_KEY) => String(raw || '').trim().replace(/^["']+|["']+$/g, '').replace(/^Bearer\s+/i, '').trim();

function supabaseDb() {
  const sb = createClient(supabaseUrl(), supabaseKey(), { auth: { persistSession: false, autoRefreshToken: false } });
  const one = async q => { const { data, error } = await q; if (error) throw error; return data; };
  return {
    async createNonce(nonce) { await one(sb.from('nonces').insert({ nonce })); },
    async consumeNonce(nonce) {
      const since = new Date(Date.now() - 10 * 60e3).toISOString();
      const rows = await one(sb.from('nonces').update({ used_at: new Date().toISOString() }).eq('nonce', nonce).is('used_at', null).gte('created_at', since).select('nonce'));
      return rows.length === 1;
    },
    async accountFor(wallet) {
      const rows = await one(sb.from('accounts').upsert({ wallet, last_login: new Date().toISOString() }, { onConflict: 'wallet' }).select('*'));
      return rows[0];
    },
    async account(id) { const rows = await one(sb.from('accounts').select('*').eq('id', id).limit(1)); return rows[0] || null; },
    // moderation (needs supabase/moderation.sql): look a player up by hero name, and change their mute / ban
    async modTarget(key) {
      const h = (await one(sb.from('heroes').select('account_id,name,is_admin').eq('name_key', key).limit(1)))[0]; if (!h) return null;
      const a = (await one(sb.from('accounts').select('*').eq('id', h.account_id).limit(1)))[0]; if (!a) return null;
      return { accountId: a.id, name: h.name, admin: !!h.is_admin, row: a };
    },
    async modSet(accountId, fields) { await one(sb.from('accounts').update(fields).eq('id', accountId)); },
    async hero(accountId) { const rows = await one(sb.from('heroes').select('name,name_key,look,is_admin,admin_hat').eq('account_id', accountId).limit(1)); return rows[0] || null; },
    async nameTaken(key) { const rows = await one(sb.from('heroes').select('account_id').eq('name_key', key).limit(1)); return rows.length > 0; },
    async createHero(accountId, name, key, look) {
      const { error } = await sb.from('heroes').insert({ account_id: accountId, name, name_key: key, look });
      if (!error) return { ok: true };
      if (error.code === '23505') return { ok: false, taken: /name_key/.test(`${error.message} ${error.details}`) };
      throw error;
    },
    async setLook(accountId, look) { await one(sb.from('heroes').update({ look }).eq('account_id', accountId)); },
    async save(accountId) { const rows = await one(sb.from('saves').select('data,rev,updated_at').eq('account_id', accountId).limit(1)); return rows[0] || null; },
    async createSave(accountId, data) { await one(sb.from('saves').insert({ account_id: accountId, data, rev: 1 })); return 1; },
    async flag(accountId, reason) { await sb.from('save_flags').insert({ account_id: accountId, reason: String(reason).slice(0, 200) }); },
    async chatPost(accountId, channel, text) { return await one(sb.rpc('lh_chat_post', { p_account: accountId, p_channel: channel, p_text: text })); },
    async chatList(channel, after) {
      const since = new Date(Date.now() - 3600e3).toISOString();
      const rows = await one(sb.from('chat_messages').select('id,account_id,name,text,at').eq('channel', channel).gt('id', after).gt('at', since).order('id', { ascending: false }).limit(50));
      return rows.reverse();
    },
    // Google sign-in and linking a second way to sign in
    async accountByGoogle(sub, email) {
      const now = new Date().toISOString();
      const found = await one(sb.from('accounts').select('*').eq('google_sub', sub).limit(1));
      if (found[0]) { await sb.from('accounts').update({ last_login: now, email }).eq('id', found[0].id); return found[0]; }
      const { data, error } = await sb.from('accounts').insert({ google_sub: sub, email, last_login: now }).select('*');
      if (error) { if (error.code === '23505') return (await one(sb.from('accounts').select('*').eq('google_sub', sub).limit(1)))[0]; throw error; }
      return data[0];
    },
    async linkGoogle(accountId, sub, email) {
      const { data, error } = await sb.from('accounts').update({ google_sub: sub, email }).eq('id', accountId).is('google_sub', null).select('id');
      if (error) { if (error.code === '23505') return { taken: true }; throw error; }
      return data.length ? { ok: true } : { has: true };
    },
    async linkWallet(accountId, wallet) {
      const { data, error } = await sb.from('accounts').update({ wallet }).eq('id', accountId).is('wallet', null).select('id');
      if (error) { if (error.code === '23505') return { taken: true }; throw error; }
      return data.length ? { ok: true } : { has: true };
    },
    async oauthStateCreate(kind, state, verifier, accountId) { await one(sb.from('oauth_states').insert({ kind, state, verifier, account_id: accountId || null })); },
    async oauthStateTake(kind, state) {
      const since = new Date(Date.now() - 15 * 60e3).toISOString();
      const rows = await one(sb.from('oauth_states').delete().eq('state', state).eq('kind', kind).gte('created_at', since).select('account_id,verifier'));
      return rows[0] || null;
    },
    // friends
    async friend(accountId, action, name) { return await one(sb.rpc('lh_friend', { p_account: accountId, p_action: action, p_name: name })); },
    async friendsList(accountId) { return await one(sb.rpc('lh_friends', { p_account: accountId })); },
    // X account linking
    async xStateCreate(accountId, state, verifier) {
      await one(sb.from('x_link_states').delete().eq('account_id', accountId));
      await one(sb.from('x_link_states').insert({ state, account_id: accountId, verifier }));
    },
    async xStateTake(state) {
      const since = new Date(Date.now() - 15 * 60e3).toISOString();
      const rows = await one(sb.from('x_link_states').delete().eq('state', state).gte('created_at', since).select('account_id,verifier'));
      return rows[0] || null;
    },
    async xLink(accountId, xId, username) {
      const { data, error } = await sb.from('heroes').update({ x_id: xId, x_username: username, x_linked_at: new Date().toISOString() }).eq('account_id', accountId).select('name');
      if (error) { if (error.code === '23505') return { ok: false, taken: true }; throw error; }
      return data.length ? { ok: true, hero: data[0].name } : { ok: false };
    },
    async xUnlink(accountId) { await one(sb.from('heroes').update({ x_id: null, x_username: null, x_linked_at: null }).eq('account_id', accountId)); },
    // used by /api/health: can the server key read every table and call the functions?
    async health() {
      const out = {};
      for (const t of ['accounts', 'heroes', 'saves', 'nonces', 'save_flags', 'chat_messages', 'x_link_states']) {
        const { error } = await sb.from(t).select('*', { head: true }).limit(1);
        out[t] = error ? `${error.code || ''} ${error.message || 'error'}`.trim() : 'ok';
      }
      const { error } = await sb.rpc('lh_state', { p_account: '00000000-0000-0000-0000-000000000000' });
      out.functions = error ? `${error.code || ''} ${error.message || 'error'}`.trim() : 'ok';
      return out;
    },
    // hot path: one call each (see lh_* functions in supabase/schema.sql)
    async state(accountId) { return (await one(sb.rpc('lh_state', { p_account: accountId }))) || null; },
    async casSave(accountId, rev, data) { const r = await one(sb.rpc('lh_cas_save', { p_account: accountId, p_rev: rev, p_data: data })); return Number.isInteger(r) ? r : null; },
    async reject(accountId, reason) { await one(sb.rpc('lh_reject', { p_account: accountId, p_reason: String(reason).slice(0, 200) })); }
  };
}

export function memoryDb() {
  // LH_MEMORY_LATENCY_MS simulates the network trip to a real database (used by the load test).
  const lat = Number(process.env.LH_MEMORY_LATENCY_MS || 0);
  const m = memoryImpl();
  if (!lat) return m;
  for (const k of Object.keys(m)) if (typeof m[k] === 'function' && !k.startsWith('_')) { const f = m[k]; m[k] = async (...a) => { await new Promise(r => setTimeout(r, lat)); return f(...a); }; }
  return m;
}
function memoryImpl() {
  const nonces = new Map(), accounts = new Map(), byWallet = new Map(), heroes = new Map(), keys = new Map(), saves = new Map();
  const flags = [], chat = [], xStates = new Map(), oauth = new Map(), byGoogle = new Map(), fr = new Set(), rq = new Set();
  let n = 0;
  return {
    _flags: flags,
    async createNonce(nonce) { nonces.set(nonce, { at: Date.now(), used: false }); },
    async consumeNonce(nonce) { const x = nonces.get(nonce); if (!x || x.used || Date.now() - x.at > 10 * 60e3) return false; x.used = true; return true; },
    async accountFor(wallet) { if (!byWallet.has(wallet)) { const id = 'acct-' + (++n); accounts.set(id, { id, wallet, banned: false }); byWallet.set(wallet, id); } return accounts.get(byWallet.get(wallet)); },
    async account(id) { return accounts.get(id) || null; },
    async hero(accountId) { return heroes.get(accountId) || null; },
    async nameTaken(key) { return keys.has(key); },
    async createHero(accountId, name, key, look) { if (keys.has(key) || heroes.has(accountId)) return { ok: false, taken: keys.has(key) }; keys.set(key, accountId); heroes.set(accountId, { name, name_key: key, look, is_admin: false }); return { ok: true }; },
    async setLook(accountId, look) { const h = heroes.get(accountId); if (h) h.look = look; },
    async save(accountId) { return saves.get(accountId) || null; },
    async createSave(accountId, data) { saves.set(accountId, { data, rev: 1, updated_at: new Date().toISOString() }); return 1; },
    async casSave(accountId, rev, data) { const s = saves.get(accountId); if (!s || s.rev !== rev) return null; saves.set(accountId, { data, rev: rev + 1, updated_at: new Date().toISOString() }); return rev + 1; },
    async flag(accountId, reason) { flags.push({ accountId, reason }); },
    async state(accountId) {
      const a = accounts.get(accountId); if (!a) return null;
      const h = heroes.get(accountId), sv = saves.get(accountId);
      const tb = !a.banned && a.banned_until && Date.parse(a.banned_until) > Date.now();
      return { wallet: a.wallet, google: a.google_sub ? (a.email || 'linked') : null, banned: a.banned || !!tb, ban_perm: !!a.banned, ban_until: tb ? a.banned_until : null, strikes: a.ban_count || 0, muted: !!a.muted, hero: h ? { name: h.name, look: h.look, is_admin: h.is_admin, hat: h.admin_hat || 'partyhat', x: h.x_username || null } : null,
        save: sv ? { data: JSON.parse(JSON.stringify(sv.data)), rev: sv.rev, age_ms: Date.now() - Date.parse(sv.updated_at) } : null };
    },
    async reject(accountId, reason) { flags.push({ accountId, reason }); const sv = saves.get(accountId); if (sv) sv.updated_at = new Date().toISOString(); },
    async chatPost(accountId, channel, text) {
      const a = accounts.get(accountId), h = heroes.get(accountId);
      if (a && a.banned) return { error: 'banned' };
      if (!h) return { error: 'no_hero' };
      const last = chat.findLast(m => m.account_id === accountId);
      if (last && Date.now() - Date.parse(last.at) < 1200) return { error: 'too_fast' };
      const m = { id: chat.length + 1, channel, account_id: accountId, name: h.name, text, at: new Date().toISOString() };
      chat.push(m); return { id: m.id, name: m.name };
    },
    async chatList(channel, after) { const since = Date.now() - 3600e3; return chat.filter(m => m.channel === channel && m.id > after && Date.parse(m.at) > since).slice(-50); },
    async health() { return { memory: 'ok' }; },
    async accountByGoogle(sub, email) {
      if (!byGoogle.has(sub)) { const id = 'acct-' + (++n); accounts.set(id, { id, wallet: null, google_sub: sub, email, banned: false }); byGoogle.set(sub, id); }
      return accounts.get(byGoogle.get(sub));
    },
    async linkGoogle(accountId, sub, email) { const a = accounts.get(accountId); if (a.google_sub) return { has: true }; if (byGoogle.has(sub)) return { taken: true }; a.google_sub = sub; a.email = email; byGoogle.set(sub, accountId); return { ok: true }; },
    async linkWallet(accountId, wallet) { const a = accounts.get(accountId); if (a.wallet) return { has: true }; if (byWallet.has(wallet)) return { taken: true }; a.wallet = wallet; byWallet.set(wallet, accountId); return { ok: true }; },
    async oauthStateCreate(kind, state, verifier, accountId) { oauth.set(state, { kind, verifier, account_id: accountId || null, at: Date.now() }); },
    async oauthStateTake(kind, state) { const v = oauth.get(state); oauth.delete(state); return v && v.kind === kind && Date.now() - v.at < 15 * 60e3 ? v : null; },
    async friend(accountId, action, name) {
      const t = keys.get(String(name || '').toLowerCase()); if (!t) return { error: 'no_such_player' }; if (t === accountId) return { error: 'self' };
      const pair = [accountId, t].sort().join('|'), req = (f, to) => f + '>' + to;
      if (action === 'add') {
        if (fr.has(pair)) return { state: 'friends' };
        if (rq.has(req(t, accountId))) { rq.delete(req(t, accountId)); fr.add(pair); return { state: 'friends' }; }
        if (rq.has(req(accountId, t))) return { state: 'requested' };
        if ([...fr].filter(p => p.split('|').includes(accountId)).length >= 200) return { error: 'too_many_friends' };
        if ([...rq].filter(r => r.startsWith(accountId + '>')).length >= 50) return { error: 'too_many_requests' };
        rq.add(req(accountId, t)); return { state: 'requested' };
      }
      if (action === 'accept') { if (!rq.has(req(t, accountId))) return { error: 'no_request' }; rq.delete(req(t, accountId)); fr.add(pair); return { state: 'friends' }; }
      if (action === 'decline') { rq.delete(req(t, accountId)); return { state: 'none' }; }
      if (action === 'cancel') { rq.delete(req(accountId, t)); return { state: 'none' }; }
      if (action === 'remove') { fr.delete(pair); rq.delete(req(t, accountId)); rq.delete(req(accountId, t)); return { state: 'none' }; }
      return { error: 'bad_action' };
    },
    async friendsList(accountId) {
      const hn = id => heroes.get(id);
      const friends = [...fr].map(p => p.split('|')).filter(p => p.includes(accountId)).map(p => hn(p[0] === accountId ? p[1] : p[0])).filter(Boolean).map(h => ({ name: h.name, x: h.x_username || null })).sort((a, b) => a.name.localeCompare(b.name));
      const incoming = [...rq].map(r => r.split('>')).filter(r => r[1] === accountId).map(r => (hn(r[0]) || {}).name).filter(Boolean);
      const outgoing = [...rq].map(r => r.split('>')).filter(r => r[0] === accountId).map(r => (hn(r[1]) || {}).name).filter(Boolean);
      return { friends, incoming, outgoing };
    },
    async xStateCreate(accountId, state, verifier) { for (const [k, v] of xStates) if (v.account_id === accountId) xStates.delete(k); xStates.set(state, { account_id: accountId, verifier, at: Date.now() }); },
    async xStateTake(state) { const v = xStates.get(state); xStates.delete(state); return v && Date.now() - v.at < 15 * 60e3 ? v : null; },
    async xLink(accountId, xId, username) {
      const h = heroes.get(accountId); if (!h) return { ok: false };
      for (const [id, o] of heroes) if (id !== accountId && o.x_id === xId) return { ok: false, taken: true };
      Object.assign(h, { x_id: xId, x_username: username }); return { ok: true, hero: h.name };
    },
    async xUnlink(accountId) { const h = heroes.get(accountId); if (h) Object.assign(h, { x_id: null, x_username: null }); },
    async modTarget(key) { const id = keys.get(key); if (!id) return null; const h = heroes.get(id); const a = accounts.get(id); return { accountId: id, name: h.name, admin: !!h.is_admin, row: Object.assign({ muted: false, ban_count: 0, banned_until: null }, a) }; },
    async modSet(accountId, fields) { Object.assign(accounts.get(accountId), fields); },
    _ban(key) { const id = keys.get(key); if (id) accounts.get(id).banned = true; },
    _makeAdmin(key, hat) { const id = keys.get(key); if (id) { heroes.get(id).is_admin = true; if (hat) heroes.get(id).admin_hat = hat; } }
  };
}
