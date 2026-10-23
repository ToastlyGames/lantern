// Tickets for the realtime server (Cloudflare): a 2-minute HS256 token naming the hero, signed with RT_SECRET
// (a separate secret shared only with the realtime server).
import { SignJWT } from 'jose';

export const rtEnabled = () => !!(process.env.RT_URL && process.env.RT_SECRET && process.env.RT_SECRET.length >= 32);
export const rtUrl = () => String(process.env.RT_URL || '').trim().replace(/\/+$/, '').replace(/^http/, 'ws');
export async function rtTicket(hero) {
  return new SignJWT({ n: hero.name, adm: !!hero.is_admin }).setProtectedHeader({ alg: 'HS256' })
    .setSubject(hero.name.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime('2m')
    .sign(new TextEncoder().encode(process.env.RT_SECRET));
}
