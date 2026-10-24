// GET /api/config: which optional features are switched on (no secrets).
import { send, canonicalDomain, reqHost } from '../lib/http.js';
import { googleEnabled } from '../lib/google.js';
import { xEnabled } from '../lib/x.js';

export default function handler(req, res) {
  // main: on the live site, every other address (www., the old vercel.app address) sends players to the main one,
  // so wallets always see one site name and sign-ins, saved settings and cookies all live in one place.
  const main = process.env.VERCEL_ENV === 'production' ? canonicalDomain() : null;
  send(res, 200, { google: googleEnabled(), x: xEnabled(), realtime: !!(process.env.RT_URL && process.env.RT_SECRET), main: main && main !== reqHost(req) ? main : null });
}
