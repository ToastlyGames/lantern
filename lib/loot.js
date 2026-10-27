// Wilderness loot receipts. When a hero picks up an item dropped by a hero defeated in the Wilderness, the realtime server
// (Cloudflare) sends them a short receipt signed with RT_SECRET: { iss: 'lanternhold-loot', sub: hero id, it, n, jti }.
// The game sends receipts with its next save, and the save check (lib/validate.js) allows that much extra wealth and that
// many extra rare items, so winning a fight against a well-geared hero isn't mistaken for cheating.
import { jwtVerify } from 'jose';
import { ITEMS } from './gamedata.js';

export async function lootAllowance(list, heroName) {
  const out = { value: 0, rare: 0 }, secret = process.env.RT_SECRET || '';
  if (!Array.isArray(list) || !list.length || secret.trim().length < 32 || typeof heroName !== 'string') return out;
  const key = new TextEncoder().encode(secret), me = heroName.toLowerCase(), seen = new Set();
  for (const tk of list.slice(0, 40)) {
    if (typeof tk !== 'string' || tk.length > 1000) continue;
    try {
      const { payload: c } = await jwtVerify(tk, key, { issuer: 'lanternhold-loot', algorithms: ['HS256'] });
      const it = ITEMS[c.it], n = Number.isInteger(c.n) ? Math.min(1e7, Math.max(0, c.n)) : 0;
      if (c.sub !== me || !it || !n || typeof c.jti !== 'string' || seen.has(c.jti)) continue;
      seen.add(c.jti);
      out.value += (it.v || 0) * n;
      if (it.rarity || it.relic) out.rare += n;
    } catch { }
  }
  return out;
}
