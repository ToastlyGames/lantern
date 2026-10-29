// Tickets for the realtime server (Cloudflare): a 2-minute HS256 token naming the hero, signed with RT_SECRET
// (a separate secret shared only with the realtime server).
import { SignJWT } from 'jose';

export const rtEnabled = () => !!(process.env.RT_URL && process.env.RT_SECRET && process.env.RT_SECRET.trim().length >= 32);
// Forgiving about how RT_URL was pasted: quotes, spaces, a missing https://, or a path like /health on the end.
export const rtUrl = () => {
  let u = String(process.env.RT_URL || '').trim().replace(/^["']+|["']+$/g, '').trim();
  if (u && !/^(https?|wss?):\/\//i.test(u)) u = 'https://' + u;
  try { const x = new URL(u); return (x.protocol === 'http:' || x.protocol === 'ws:' ? 'ws://' : 'wss://') + x.host; } catch { return ''; }
};
export async function rtTicket(hero, { muted = false, founder = false, v = null, co = null } = {}) {   // co: the cosmetic looks this hero may show (earned + held as NFTs)   // fd: holds a Founder's Lantern (may show the Founder's Flame)   // mu: muted by an admin (the realtime server blocks their chat)
  return new SignJWT({ n: hero.name, adm: !!hero.is_admin, hat: hero.is_admin ? (hero.hat || hero.admin_hat || 'partyhat') : null, mu: muted && !hero.is_admin ? 1 : 0, fd: founder ? 1 : 0, v: v || null, ...(co ? { co } : {}) }).setProtectedHeader({ alg: 'HS256' })
    .setSubject(hero.name.toLowerCase()).setIssuer('lanternhold-rt').setIssuedAt().setExpirationTime('2m')
    .sign(new TextEncoder().encode(process.env.RT_SECRET));
}
