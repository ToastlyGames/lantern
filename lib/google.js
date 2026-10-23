// Sign in with Google (OpenID Connect, authorization code + PKCE).
// Needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Cloud Console, with this redirect URI registered:
//   https://<APP_DOMAIN>/api/auth/google/callback
// Google refuses sign-in inside in-app browsers (wallet apps, X, Instagram), so Google players use a normal browser.
import { createHash, randomBytes } from 'node:crypto';

const b64u = buf => Buffer.from(buf).toString('base64url');
export const googleEnabled = () => !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const authUrl = () => process.env.GOOGLE_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth';
const tokenUrl = () => process.env.GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token';
export const googleCallback = domain => `${/^localhost(:\d+)?$/.test(domain) ? 'http' : 'https'}://${domain}/api/auth/google/callback`;

export function newGoogleRequest(domain) {
  const state = b64u(randomBytes(24)), verifier = b64u(randomBytes(32));
  const q = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, redirect_uri: googleCallback(domain), response_type: 'code',
    scope: 'openid email', state, code_challenge: b64u(createHash('sha256').update(verifier).digest()), code_challenge_method: 'S256', prompt: 'select_account' });
  return { state, verifier, url: `${authUrl()}?${q}` };
}

// Exchange the code. The ID token comes straight from Google over TLS, so its claims are checked rather than its signature
// (OpenID Connect Core 3.1.3.7); issuer, audience, expiry and a verified email are all required.
export async function finishGoogle(code, verifier, domain) {
  const r = await fetch(tokenUrl(), { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: googleCallback(domain), grant_type: 'authorization_code', code_verifier: verifier }),
    signal: AbortSignal.timeout(8000) });
  const t = await r.json().catch(() => ({}));
  if (!r.ok || typeof t.id_token !== 'string') throw new Error('google_token ' + r.status + ' ' + (t.error || ''));
  let c; try { c = JSON.parse(Buffer.from(t.id_token.split('.')[1], 'base64url').toString()); } catch { throw new Error('google_id_token'); }
  const now = Date.now() / 1000;
  if (!['accounts.google.com', 'https://accounts.google.com'].includes(c.iss)) throw new Error('google_iss');
  if (c.aud !== process.env.GOOGLE_CLIENT_ID) throw new Error('google_aud');
  if (!(c.exp > now)) throw new Error('google_exp');
  if (!/^\d{5,32}$/.test(String(c.sub))) throw new Error('google_sub');
  if (c.email && c.email_verified === false) throw new Error('google_email_unverified');
  return { sub: String(c.sub), email: typeof c.email === 'string' ? c.email.slice(0, 200).toLowerCase() : null };
}
