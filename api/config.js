// GET /api/config: which optional features are switched on (no secrets).
import { send } from '../lib/http.js';
import { googleEnabled } from '../lib/google.js';
import { xEnabled } from '../lib/x.js';

export default function handler(req, res) {
  send(res, 200, { google: googleEnabled(), x: xEnabled(), realtime: !!(process.env.RT_URL && process.env.RT_SECRET) });
}
