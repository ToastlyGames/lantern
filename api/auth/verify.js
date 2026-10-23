// POST /api/auth/verify { message, signature }: checks the Sign-In with Ethereum signature and starts a session.
import { db } from '../../lib/db.js';
import { guard, send, fail, body } from '../../lib/http.js';
import { parseSiwe, checkFields, signatureValid } from '../../lib/siwe.js';
import { makeSession, sessionCookie } from '../../lib/session.js';
import { mePayload } from '../../lib/me.js';

export default async function handler(req, res) {
  if (!(await guard(req, res, { methods: ['POST'], auth: false }))) return;
  try {
    const b = await body(req);
    const msg = parseSiwe(b && b.message);
    const problem = checkFields(msg, { domain: process.env.APP_DOMAIN || req.headers.host });
    if (problem) return fail(res, 400, 'bad_message', { detail: problem });
    if (!(await db().consumeNonce(msg.nonce))) return fail(res, 400, 'bad_message', { detail: 'nonce already used or expired' });
    if (!(await signatureValid(msg.address, b.message, b.signature))) return fail(res, 401, 'bad_signature');
    const acct = await db().accountFor(msg.address.toLowerCase());
    if (acct.banned) return fail(res, 403, 'banned');
    res.setHeader('Set-Cookie', sessionCookie(await makeSession(acct.id, acct.wallet)));
    send(res, 200, await mePayload(acct.id));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
