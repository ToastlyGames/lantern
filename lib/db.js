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

function supabaseDb() {
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const one = async q => { const { data, error } = await q; if (error) throw error; return data; };
  return {
    async createNonce(nonce) { await one(sb.from('nonces').insert({ nonce })); },
    async consumeNonce(nonce) {
      const since = new Date(Date.now() - 10 * 60e3).toISOString();
      const rows = await one(sb.from('nonces').update({ used_at: new Date().toISOString() }).eq('nonce', nonce).is('used_at', null).gte('created_at', since).select('nonce'));
      return rows.length === 1;
    },
    async accountFor(wallet) {
      const rows = await one(sb.from('accounts').upsert({ wallet, last_login: new Date().toISOString() }, { onConflict: 'wallet' }).select('id,wallet,banned'));
      return rows[0];
    },
    async account(id) { const rows = await one(sb.from('accounts').select('id,wallet,banned').eq('id', id).limit(1)); return rows[0] || null; },
    async hero(accountId) { const rows = await one(sb.from('heroes').select('name,name_key,look,is_admin').eq('account_id', accountId).limit(1)); return rows[0] || null; },
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
  const flags = [], chat = [];
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
      return { wallet: a.wallet, banned: a.banned, hero: h ? { name: h.name, look: h.look, is_admin: h.is_admin } : null,
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
    _ban(key) { const id = keys.get(key); if (id) accounts.get(id).banned = true; },
    _makeAdmin(key) { const id = keys.get(key); if (id) heroes.get(id).is_admin = true; }
  };
}
