// GET /api/config: which optional features are switched on (no secrets).
import { send, canonicalDomain, reqHost, hostAllowed } from '../lib/http.js';
import { googleEnabled } from '../lib/google.js';
import { xEnabled } from '../lib/x.js';

export default function handler(req, res) {
  // main: only an address that isn't in APP_DOMAIN sends players to the main one. Every listed address (and its www.)
  // signs in on its own, so a domain redirect set up in Vercel (apex <-> www) can never cause a loop.
  const main = process.env.VERCEL_ENV === 'production' && !hostAllowed(reqHost(req)) ? canonicalDomain() : null;
  send(res, 200, { google: googleEnabled(), x: xEnabled(), realtime: !!(process.env.RT_URL && process.env.RT_SECRET), main: main && main !== reqHost(req) ? main : null });
}
