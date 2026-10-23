// POST /api/auth/link-wallet { message, signature }: adds a wallet to the signed-in account (for players who signed in with Google).
// Same Sign-In with Ethereum checks as /api/auth/verify. A wallet can belong to only one account.
import { db } from '../../lib/db.js';
import { guard, send, fail, body, appDomain } from '../../lib/http.js';
import { parseSiwe, checkFields, signatureValid } from '../../lib/siwe.js';
import { makeSession, sessionCookie } from '../../lib/session.js';
import { mePayload } from '../../lib/me.js';

export default async function handler(req, res) {
  const s = await guard(req, res, { methods: ['POST'] });
  if (!s) return;
  try {
    const b = await body(req);
    const msg = parseSiwe(b && b.message);
    const problem = checkFields(msg, { domain: appDomain(req) });
    if (problem) return fail(res, 400, 'bad_message', { detail: problem });
    if (!(await db().consumeNonce(msg.nonce))) return fail(res, 400, 'bad_message', { detail: 'nonce already used or expired' });
    if (!(await signatureValid(msg.address, b.message, b.signature))) return fail(res, 401, 'bad_signature');
    const wallet = msg.address.toLowerCase();
    const r = await db().linkWallet(s.accountId, wallet);
    if (r.taken) return fail(res, 409, 'wallet_in_use', { msg: 'That wallet already has its own hero. Sign in with it directly, or connect a different wallet.' });
    if (r.has) return fail(res, 409, 'has_wallet', { msg: 'This account already has a wallet connected.' });
    res.setHeader('Set-Cookie', sessionCookie(await makeSession(s.accountId, wallet)));
    send(res, 200, await mePayload(s.accountId));
  } catch (e) { console.error(e); fail(res, 500, 'server_error'); }
}
