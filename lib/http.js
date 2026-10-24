// Small helpers shared by every API route.
import { readSession } from './session.js';

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
export const fail = (res, status, error, extra) => send(res, status, Object.assign({ error }, extra || {}));

export function cookie(req, name) {
  const h = req.headers.cookie || '';
  for (const part of h.split(';')) { const i = part.indexOf('='); if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim()); }
  return null;
}

export async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return null; } }
  const chunks = []; let size = 0;
  try { for await (const c of req) { size += c.length; if (size > 256 * 1024) return null; chunks.push(c); } } catch { return null; }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { return null; }
}

// The site's own addresses. APP_DOMAIN can list several, comma separated (e.g. "lanternhold.fun, lanternhold.vercel.app");
// "https://" and paths are ignored, and each listed name also allows its www. twin. Unset: the request's own host.
const norm = d => String(d || '').trim().replace(/^["']+|["']+$/g, '').replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
export function appDomains() {
  const out = [];
  for (const d of String(process.env.APP_DOMAIN || '').split(',').map(norm).filter(Boolean)) { out.push(d); if (!d.startsWith('www.') && !/^localhost|^\d|\.vercel\.app$/.test(d)) out.push('www.' + d); }
  return [...new Set(out)];
}
export const reqHost = req => norm(String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0]);
export function hostAllowed(h) { const list = appDomains(); return !list.length || list.includes(norm(h)); }
// The address this request is for: the page's own host when it's one of ours, otherwise the main (first) one.
export function appDomain(req) { const list = appDomains(), h = reqHost(req); return !list.length || list.includes(h) ? h : list[0]; }
// The main address (first in APP_DOMAIN): other addresses of the live site send players here.
export const canonicalDomain = () => appDomains()[0] || null;

// State-changing requests must come from our own page: custom header (blocks plain cross-site forms) + Origin check.
// The Origin must be this very host, and that host must be one of ours.
export function sameOrigin(req) {
  if (req.method === 'GET') return true;
  if (req.headers['x-lh'] !== '1') return false;
  const origin = req.headers.origin;
  if (!origin) return true;
  try { const o = new URL(origin).host.toLowerCase(); return o === reqHost(req) && hostAllowed(o); } catch { return false; }
}

// Route guard: method, origin and (optionally) a valid session.
export async function guard(req, res, { methods, auth = true }) {
  if (!methods.includes(req.method)) { res.setHeader('Allow', methods.join(', ')); fail(res, 405, 'method_not_allowed'); return null; }
  if (!sameOrigin(req)) { fail(res, 403, 'bad_origin'); return null; }
  if (!auth) return {};
  const s = await readSession(cookie(req, 'lh_s'));
  if (!s) { fail(res, 401, 'not_signed_in'); return null; }
  return s;
}
