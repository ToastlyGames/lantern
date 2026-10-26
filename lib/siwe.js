// Sign-In with Ethereum (EIP-4361) on Robinhood Chain.
// The browser asks for a one-time nonce, the wallet signs a standard message, and the server checks:
// the domain is ours, the chain is Robinhood Chain, the nonce is fresh and unused, the message hasn't expired,
// and the signature really comes from that address (plain wallets locally; smart-contract wallets via the chain's RPC).
import { recoverMessageAddress, createPublicClient, http, defineChain, getAddress } from 'viem';

export const CHAIN_ID = 4663;
export const TTL_MS = 5 * 60e3;   // a sign-in message is good for 5 minutes, once
// The one sentence players see in their wallet. The server only accepts messages built exactly like buildSiwe() builds them,
// so nothing can be slipped in (no extra lines, no "Resources", no different wording).
export const STATEMENT = 'Sign in to Lanternhold.';   // short and plain, like every standard sign-in: wallets show the rest (site, account, expiry)
export const checksum = a => { try { return getAddress(a); } catch { return null; } };
export function buildSiwe({ domain, address, uri, chainId, nonce, issuedAt, expiresAt }) {
  return `${domain} wants you to sign in with your Ethereum account:\n${address}\n\n${STATEMENT}\n\nURI: ${uri}\nVersion: 1\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issuedAt}\nExpiration Time: ${expiresAt}`;
}
export const robinhood = defineChain({
  id: CHAIN_ID, name: 'Robinhood Chain', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [process.env.RPC_URL || 'https://rpc.mainnet.chain.robinhood.com'] } },
  blockExplorers: { default: { name: 'Blockscout', url: 'https://robinhoodchain.blockscout.com' } }
});

export function parseSiwe(message) {
  if (typeof message !== 'string' || message.length > 2000) return null;
  const lines = message.split('\n');
  const head = /^(\S+) wants you to sign in with your Ethereum account:$/.exec(lines[0] || '');
  const address = (lines[1] || '').trim();
  if (!head || !/^0x[0-9a-fA-F]{40}$/.test(address)) return null;
  const f = {};
  for (const l of lines.slice(2)) { const m = /^(URI|Version|Chain ID|Nonce|Issued At|Expiration Time): (.+)$/.exec(l); if (m) f[m[1]] = m[2].trim(); }
  return { domain: head[1], address, uri: f['URI'], version: f['Version'], chainId: Number(f['Chain ID']), nonce: f['Nonce'], issuedAt: f['Issued At'], expiresAt: f['Expiration Time'] };
}

export function checkFields(m, { domain, message, now = Date.now() }) {
  if (!m) return 'malformed message';
  if (m.domain !== domain) return 'wrong domain';
  let u; try { u = new URL(m.uri); } catch { return 'bad uri'; }
  if (u.host !== domain || (u.protocol !== 'https:' && !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(u.host)) || (u.pathname !== '/' && u.pathname !== '')) return 'wrong uri';
  if (m.version !== '1') return 'wrong version';
  if (m.chainId !== CHAIN_ID) return 'wrong chain';
  if (!/^[A-Za-z0-9]{16,64}$/.test(m.nonce || '')) return 'bad nonce';
  if (checksum(m.address) !== m.address) return 'address not checksummed';
  const iat = Date.parse(m.issuedAt), exp = Date.parse(m.expiresAt);
  if (!Number.isFinite(iat) || iat > now + 60e3 || now - iat > TTL_MS) return 'message too old';
  if (!Number.isFinite(exp) || exp < now || exp - iat > TTL_MS + 1000) return 'message expired';
  if (message !== undefined && message !== buildSiwe(m)) return 'message not in the expected format';
  return null;
}

export async function signatureValid(address, message, signature) {
  if (typeof signature !== 'string' || !/^0x[0-9a-fA-F]{130,}$/.test(signature)) return false;
  try { const who = await recoverMessageAddress({ message, signature }); if (who.toLowerCase() === address.toLowerCase()) return true; } catch { /* not a plain wallet signature */ }
  if (process.env.LH_OFFLINE === '1') return false;
  try { // smart-contract wallets (ERC-1271 / ERC-6492)
    const client = createPublicClient({ chain: robinhood, transport: http() });
    return await client.verifyMessage({ address, message, signature });
  } catch { return false; }
}
