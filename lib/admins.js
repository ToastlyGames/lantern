// The only wallets that can open the owner tools (/tools: the rewards vault, the Founder's Lantern and any tool added
// later). Kept in the code on purpose, not in a Vercel setting: changing who gets in takes a code change and a deploy.
// Getting in needs a fresh Sign-In with Ethereum signature from one of these wallets (see api/tools.js).
import { getAddress } from 'viem';

export const TOOL_ADMINS = [
  '0xC9dfC0A41220115366B77a818b2B1687d750c12A',
  '0x9487cF1660cDc1BCE8f3546f48471E2d1B96bfEC',
  '0xbA53D8b7006f0EacF886F2C795EDdA4047505059',
  '0x3e23f7Be8Cd2B89D6a73708f26C303Eb909e17Ce'
].map(a => getAddress(a));

export const isToolAdmin = a => { try { return TOOL_ADMINS.includes(getAddress(String(a || ''))); } catch { return false; } };
