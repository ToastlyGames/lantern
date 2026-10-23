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

// The site's own address. Accepts "lanternhold.gg", "https://lanternhold.gg/" or with stray spaces; falls back to the request's host.
export function appDomain(req) {
  const raw = String(process.env.APP_DOMAIN || '').trim().replace(/^["']+|["']+$/g, '');
  const d = raw.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
  return d || String(req.headers['x-forwarded-host'] || req.headers.host || '');
}

// State-changing requests must come from our own page: custom header (blocks plain cross-site forms) + Origin check.
export function sameOrigin(req) {
  if (req.method === 'GET') return true;
  if (req.headers['x-lh'] !== '1') return false;
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === appDomain(req); } catch { return false; }
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
