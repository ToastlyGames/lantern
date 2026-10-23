// GET /api/auth/nonce: a one-time code the wallet signs, valid for 10 minutes and usable once.
import { randomBytes } from 'node:crypto';
import { db } from '../../lib/db.js';
import { guard, send, fail } from '../../lib/http.js';
import { CHAIN_ID } from '../../lib/siwe.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['GET'], auth: false }))) return;
  try {
    const nonce = randomBytes(18).toString('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 24).padEnd(16, '0');
    await db().createNonce(nonce);
    send(res, 200, { nonce, domain: process.env.APP_DOMAIN || req.headers.host, chainId: CHAIN_ID });
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
