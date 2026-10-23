// Link an X (Twitter) account to a hero with X's own sign-in (OAuth 2.0 with PKCE).
// Needs X_CLIENT_ID and X_CLIENT_SECRET from developer.x.com, with this callback URL registered:
//   https://<APP_DOMAIN>/api/x/callback
// Only the account id and @username are kept; the X access token is revoked straight after the lookup.
import { createHash, randomBytes } from 'node:crypto';

const b64u = buf => Buffer.from(buf).toString('base64url');
export const xEnabled = () => !!(process.env.X_CLIENT_ID && process.env.X_CLIENT_SECRET);
const authBase = () => (process.env.X_AUTH_URL || 'https://x.com/i/oauth2/authorize');
const apiBase = () => (process.env.X_API_BASE || 'https://api.x.com').replace(/\/+$/, '');
export const callbackUrl = domain => `${/^localhost(:\d+)?$/.test(domain) ? 'http' : 'https'}://${domain}/api/x/callback`;

export function newLinkRequest(domain) {
  const state = b64u(randomBytes(24)), verifier = b64u(randomBytes(32));
  const challenge = b64u(createHash('sha256').update(verifier).digest());
  const q = new URLSearchParams({ response_type: 'code', client_id: process.env.X_CLIENT_ID, redirect_uri: callbackUrl(domain),
    scope: 'users.read tweet.read', state, code_challenge: challenge, code_challenge_method: 'S256' });
  return { state, verifier, url: `${authBase()}?${q}` };
}

// Trade the one-time code for a token, read who the player is on X, then throw the token away.
export async function finishLink(code, verifier, domain) {
  const basic = 'Basic ' + Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64');
  const tr = await fetch(apiBase() + '/2/oauth2/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: basic },
    body: new URLSearchParams({ code, grant_type: 'authorization_code', client_id: process.env.X_CLIENT_ID, redirect_uri: callbackUrl(domain), code_verifier: verifier }),
    signal: AbortSignal.timeout(8000)
  });
  const tok = await tr.json().catch(() => ({}));
  if (!tr.ok || !tok.access_token) throw new Error('x_token ' + tr.status + ' ' + (tok.error || ''));
  const ur = await fetch(apiBase() + '/2/users/me', { headers: { Authorization: 'Bearer ' + tok.access_token }, signal: AbortSignal.timeout(8000) });
  const u = await ur.json().catch(() => ({}));
  await fetch(apiBase() + '/2/oauth2/revoke', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: basic },
    body: new URLSearchParams({ token: tok.access_token, token_type_hint: 'access_token', client_id: process.env.X_CLIENT_ID }), signal: AbortSignal.timeout(4000) }).catch(() => {});
  const d = u && u.data;
  if (!ur.ok || !d || !/^\d{1,25}$/.test(String(d.id)) || !/^[A-Za-z0-9_]{1,15}$/.test(String(d.username))) throw new Error('x_user ' + ur.status);
  return { id: String(d.id), username: String(d.username) };
}
