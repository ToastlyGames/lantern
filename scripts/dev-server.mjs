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
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
const cache = new Map();
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const pageHeaders = vercel.headers.find(h => h.source === '/(.*)').headers.filter(h => h.key !== 'Strict-Transport-Security');

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
  if (url.pathname.startsWith('/api/')) {
    apiRequests++;
    const h = await route(url.pathname.slice(5));
    if (!h) { res.statusCode = 404; return res.end('{"error":"not_found"}'); }
    return h(req, res);
  }
  if (url.pathname === '/__dev/admin' && process.env.LH_MEMORY_DB === '1') { // test hook: make a hero an admin
    const { db } = await import('../lib/db.js'); db()._makeAdmin(url.searchParams.get('name')); res.end('ok'); return;
  }
  if (url.pathname === '/__dev/ban' && process.env.LH_MEMORY_DB === '1') {
    const { db } = await import('../lib/db.js'); db()._ban(url.searchParams.get('name')); res.end('ok'); return;
  }
  if (url.pathname === '/__dev/flags' && process.env.LH_MEMORY_DB === '1') {
    const { db } = await import('../lib/db.js'); res.end(JSON.stringify(db()._flags)); return;
  }
  const file = join(root, 'public', url.pathname === '/' ? 'index.html' : normalize(url.pathname));
  if (!file.startsWith(join(root, 'public'))) { res.statusCode = 403; return res.end(); }
  try { const b = await readFile(file); for (const h of pageHeaders) res.setHeader(h.key, h.value); res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream'); res.end(b); }
  catch { res.statusCode = 404; res.end('not found'); }
});
server.listen(PORT, () => console.log(`Lanternhold dev server on http://localhost:${PORT} (${process.env.LH_MEMORY_DB ? 'in-memory database' : 'Supabase'})`));
