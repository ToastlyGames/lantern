// Signed session cookie (HS256 JWT). HttpOnly so page scripts can't read it; SameSite=Strict: never sent on requests started by another site.
import { SignJWT, jwtVerify } from 'jose';

const DAYS = 7;
function key() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET must be set to at least 32 random characters');
  return new TextEncoder().encode(s);
}

export async function makeSession(accountId, wallet) {
  return new SignJWT({ w: wallet }).setProtectedHeader({ alg: 'HS256' }).setSubject(accountId)
    .setIssuedAt().setExpirationTime(`${DAYS}d`).setIssuer('lanternhold').sign(key());
}

export async function readSession(token) {
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, key(), { issuer: 'lanternhold', algorithms: ['HS256'] }); return { accountId: payload.sub, wallet: payload.w }; }
  catch { return null; }
}

export function sessionCookie(token) {
  const secure = process.env.LH_INSECURE_COOKIE === '1' ? '' : '; Secure';
  return token
    ? `lh_s=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${DAYS * 86400}${secure}`
    : `lh_s=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

// The sign-in nonce, tied to the browser that asked for it (5 minutes, sent only to /api/auth).
export function nonceCookie(nonce) {
  const secure = process.env.LH_INSECURE_COOKIE === '1' ? '' : '; Secure';
  return nonce ? `lh_n=${nonce}; Path=/api/auth; HttpOnly; SameSite=Strict; Max-Age=300${secure}` : `lh_n=; Path=/api/auth; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}
