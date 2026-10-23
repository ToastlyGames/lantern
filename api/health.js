// GET /api/health: a setup check you can open in a browser (https://your-site/api/health).
// Reports which settings are present and whether the database is reachable. Never shows secret values.
import { db, supabaseUrl, supabaseKey } from '../lib/db.js';
import { send, appDomain } from '../lib/http.js';
import { xEnabled, callbackUrl } from '../lib/x.js';
import { googleEnabled, googleCallback } from '../lib/google.js';
import { rtEnabled, rtUrl, rtTicket } from '../lib/rt.js';

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
  let rtReach = null;
  if (rtEnabled()) {
    const site = 'https://' + appDomain(req), base = rtUrl().replace(/^ws/, 'http');
    try {
      const r = await fetch(base + '/health', { signal: AbortSignal.timeout(4000) });
      const txt = r.ok ? await r.text() : '';
      if (!r.ok) rtReach = 'HTTP ' + r.status + ' from ' + base;
      else if (!/Lanternhold realtime/.test(txt)) rtReach = 'that address isn’t the Lanternhold realtime worker (is it a Pages site or another app?)';
      else {
        const t = await rtTicket({ name: 'Healthcheck', is_admin: false });
        const c = await fetch(base + '/check?t=' + encodeURIComponent(t) + '&origin=' + encodeURIComponent(site), { signal: AbortSignal.timeout(4000) });
        const j = c.ok ? await c.json() : null;
        if (!j) rtReach = 'the worker is an older version: redeploy it from GitHub';
        else if (!j.secretSet) rtReach = 'RT_SECRET is not set on Cloudflare (Settings → Variables and Secrets, type Secret)';
        else if (!j.ticket) rtReach = 'RT_SECRET on Cloudflare doesn’t match RT_SECRET on Vercel. Paste the same 64 characters in both, then redeploy Vercel';
        else if (!j.origin) rtReach = `ALLOWED_ORIGINS on Cloudflare is [${j.allowedOrigins.join(', ')}] but this site is ${site}. Add exactly "${site}"`;
        else rtReach = 'ok';
      }
    } catch (e) { rtReach = 'unreachable at ' + base + ' (check RT_URL)'; }
  }
  const realtime = rtEnabled() && rtReach !== 'ok' ? 'PROBLEM: ' + rtReach : rtEnabled() ? 'ok: players, chat and parties go through ' + rtUrl() : !process.env.RT_URL ? 'MISSING: set RT_URL to your Cloudflare realtime address (see README)' : 'MISSING: set RT_SECRET (the same 64 random characters as on Cloudflare)';
  const google = googleEnabled() ? 'ok: Google sign-in is on. Redirect URI to register in Google Cloud: ' + googleCallback(appDomain(req)) : 'off (optional): add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to turn on Google sign-in';
  const x = xEnabled() ? 'ok: X linking is on. Callback URL to register at developer.x.com: ' + callbackUrl(appDomain(req)) : 'off (optional): add X_CLIENT_ID and X_CLIENT_SECRET to turn on X linking';
  send(res, ok && rtEnabled() && rtReach === 'ok' ? 200 : 500, { ok: ok && rtEnabled() && rtReach === 'ok', host, env, database, realtime, google, x, node: process.version });
}
