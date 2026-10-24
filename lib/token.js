// The official token, shown in the Bulletin (and the wiki) so players can copy the real contract address.
// Set TOKEN_CA (and optionally TOKEN_SYMBOL) in Vercel, then redeploy. Until TOKEN_CA is set, the game says the
// address will be posted at launch, so no player is fooled by an address from anywhere else.
import { checksum } from './siwe.js';

export function tokenInfo(env = process.env) {
  const ca = String(env.TOKEN_CA || '').trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(ca)) return null;
  const sym = String(env.TOKEN_SYMBOL || '').trim().replace(/^\$/, '');
  return { ca: checksum(ca), symbol: /^[A-Za-z0-9]{1,12}$/.test(sym) ? sym.toUpperCase() : null };
}
