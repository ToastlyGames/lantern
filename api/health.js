// GET /api/health: a setup check you can open in a browser (https://your-site/api/health).
// Reports which settings are present and whether the database is reachable. Never shows secret values.
import { db, supabaseUrl, supabaseKey } from '../lib/db.js';
import { send, appDomain } from '../lib/http.js';

// The role inside an older-style JWT key (anon / service_role); new sb_ keys aren't JWTs.
function keyRole(k) { try { return JSON.parse(Buffer.from(k.split('.')[1], 'base64url').toString()).role || null; } catch { return null; } }

export default async function handler(req, res) {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  const env = {
    SUPABASE_URL: !process.env.SUPABASE_URL ? 'MISSING' : /^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(supabaseUrl()) ? 'ok (' + supabaseUrl() + ')'
      : `NOT A SUPABASE API URL: read as "${supabaseUrl().slice(0, 80)}". Use the Project URL from Supabase → Project Settings → API (or Data API), like https://abcd1234efgh5678ijkl.supabase.co`,
    SUPABASE_SERVICE_ROLE_KEY: !process.env.SUPABASE_SERVICE_ROLE_KEY ? 'MISSING' : /^sb_publishable_/.test(supabaseKey()) || keyRole(supabaseKey()) === 'anon' ? 'WRONG KEY: this is the public (anon/publishable) key; use the service_role / secret key'
      : /^sb_secret_/.test(supabaseKey()) || keyRole(supabaseKey()) === 'service_role' ? 'ok' : 'set, but it doesn’t look like a Supabase service_role or sb_secret_ key',
    SESSION_SECRET: !process.env.SESSION_SECRET ? 'MISSING' : process.env.SESSION_SECRET.length < 32 ? 'TOO SHORT: use 64 random characters' : 'ok',
    APP_DOMAIN: !process.env.APP_DOMAIN ? 'not set (add your site address, then redeploy)' : appDomain(req) === host ? 'ok (' + host + ')' : `set to "${appDomain(req)}" but this site is "${host}". Sign-in only works on the address in APP_DOMAIN.`
  };
  let database;
  if (!env.SUPABASE_URL.startsWith('ok') || !env.SUPABASE_SERVICE_ROLE_KEY.startsWith('ok')) database = 'skipped: fix the Supabase settings above first, then redeploy';
  else {
    try {
      const h = await db().health();
      const bad = Object.entries(h).filter(([, v]) => v !== 'ok');
      database = bad.length ? Object.fromEntries(bad.map(([k, v]) => [k, /42501|permission denied/i.test(v) ? 'PERMISSION DENIED: run supabase/schema.sql again (it adds the grants)' : /42P01|PGRST205|does not exist|schema cache/i.test(v) ? 'MISSING: run supabase/schema.sql in the SQL Editor' : v])) : 'ok';
    } catch (e) { database = 'could not connect: ' + String(e && e.message || e).slice(0, 160); }
  }
  const ok = Object.values(env).every(v => v.startsWith('ok')) && database === 'ok';
  send(res, ok ? 200 : 500, { ok, host, env, database, node: process.version });
}
