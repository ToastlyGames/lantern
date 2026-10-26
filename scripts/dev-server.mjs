// Local server for development and tests: serves public/ and runs the same /api routes Vercel runs.
// Uses an in-memory database unless SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
//   npm run build && npm run dev   →   http://localhost:3000
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
process.env.SESSION_SECRET ||= 'dev-only-secret-change-me-0123456789abcdef';
process.env.LH_INSECURE_COOKIE ||= '1';
if (!process.env.SUPABASE_URL) process.env.LH_MEMORY_DB = '1';
const PORT = Number(process.env.PORT || 3000);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const cache = new Map();
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const pageHeaders = vercel.headers.find(h => h.source === '/(.*)').headers.filter(h => h.key !== 'Strict-Transport-Security');
// local realtime server (wrangler dev) is plain ws:// on localhost
for (const h of pageHeaders) if (h.key === 'Content-Security-Policy') h.value = h.value.replace("connect-src 'self'", "connect-src 'self' ws://127.0.0.1:8787 ws://localhost:8787");

async function route(path) {
  const file = join(root, 'api', normalize(path).replace(/^(\.\.[/\\])+/, '') + '.js');
  if (!file.startsWith(join(root, 'api'))) return null;
  try { await stat(file); } catch { return null; }
  if (!cache.has(file)) cache.set(file, (await import(pathToFileURL(file).href)).default);
  return cache.get(file);
}

let apiRequests = 0;
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/__dev/stats') { res.end(JSON.stringify({ cpu: process.cpuUsage(), rss: process.memoryUsage().rss, requests: apiRequests })); return; }
  if (url.pathname === '/tools' || url.pathname.startsWith('/tools/')) {   // same as vercel.json's rewrites: the locked owner tools
    const h = await route('tools'); req.url = '/api/tools?f=' + encodeURIComponent(url.pathname.slice(7)); return h(req, res);
  }
  if (url.pathname.startsWith('/api/')) {
    apiRequests++;
    const h = await route(url.pathname.slice(5));
    if (!h) { res.statusCode = 404; return res.end('{"error":"not_found"}'); }
    return h(req, res);
  }
  if (url.pathname === '/__dev/admin' && process.env.LH_MEMORY_DB === '1') { // test hook: make a hero an admin
    const { db } = await import('../lib/db.js'); db()._makeAdmin(url.searchParams.get('name'), url.searchParams.get('hat')); res.end('ok'); return;
  }
  if (url.pathname.startsWith('/__dev/') && process.env.LH_DEV_HOOKS === '1' && process.env.SUPABASE_URL) { // same test hooks against a real database (tests only)
    const { createClient } = await import('@supabase/supabase-js');
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    const key = url.searchParams.get('name');
    if (url.pathname === '/__dev/admin') { await sb.from('heroes').update({ is_admin: true, ...(url.searchParams.get('hat') ? { admin_hat: url.searchParams.get('hat') } : {}) }).eq('name_key', key); return res.end('ok'); }
    if (url.pathname === '/__dev/ban') { const { data } = await sb.from('heroes').select('account_id').eq('name_key', key); for (const h of data || []) await sb.from('accounts').update({ banned: true }).eq('id', h.account_id); return res.end('ok'); }
    if (url.pathname === '/__dev/flags') { const { data } = await sb.from('save_flags').select('account_id,reason'); return res.end(JSON.stringify((data || []).map(f => ({ accountId: f.account_id, reason: f.reason })))); }
  }
  if (url.pathname === '/__dev/ban' && process.env.LH_MEMORY_DB === '1') {
    const { db } = await import('../lib/db.js'); db()._ban(url.searchParams.get('name')); res.end('ok'); return;
  }
  if (url.pathname === '/__dev/flags' && process.env.LH_MEMORY_DB === '1') {
    const { db } = await import('../lib/db.js'); res.end(JSON.stringify(db()._flags)); return;
  }
  const file = join(root, 'public', url.pathname === '/' ? 'index.html' : normalize(url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname));
  if (!file.startsWith(join(root, 'public'))) { res.statusCode = 403; return res.end(); }
  try { const b = await readFile(file); for (const h of pageHeaders) res.setHeader(h.key, h.value); res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream'); res.end(b); }
  catch { res.statusCode = 404; res.end('not found'); }
});
server.listen(PORT, () => console.log(`Lanternhold dev server on http://localhost:${PORT} (${process.env.LH_MEMORY_DB ? 'in-memory database' : 'Supabase'})`));
