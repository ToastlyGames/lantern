// Wilderness loot receipts: the save check allows a big PvP haul only with receipts signed by the realtime server.
//   node scripts/test-loot.mjs
import { SignJWT } from 'jose';
process.env.RT_SECRET = 'test-realtime-secret-0123456789abcdef-xyz';
const { lootAllowance } = await import('../lib/loot.js');
const { sanitize, plausible } = await import('../lib/validate.js');
let pass = 0, failN = 0; const ok = (c, n) => { c ? pass++ : failN++; console.log(c ? '  ✓' : '  ✗', n); };
const sign = (p, secret = process.env.RT_SECRET) => new SignJWT(p).setProtectedHeader({ alg: 'HS256' }).setIssuer('lanternhold-loot').setExpirationTime('30m').sign(new TextEncoder().encode(secret));
const prev = sanitize({}), next = sanitize({ bank: Object.assign({}, prev.bank, { iron_lantern: 1, crystal_lantern: 1, copper_lantern: 1, cape_moss: 1, cape_hearth: 1, cape_tattered: 1 }) });
ok(!plausible(prev, next, 15).ok, 'six new rare items in one save are refused without receipts');
const rc = await Promise.all(['iron_lantern', 'crystal_lantern', 'copper_lantern', 'cape_moss', 'cape_hearth', 'cape_tattered'].map((it, i) => sign({ sub: 'ash', it, n: 1, jti: 'd' + i })));
const al = await lootAllowance(rc, 'Ash');
ok(al.rare === 6 && al.value === 180 + 600 + 70 + 110 + 300 + 30, 'receipts add up (' + al.rare + ' rare, ' + al.value + ' gold of value)');
ok(plausible(prev, next, 15, { loot: al }).ok, 'with receipts the same save is accepted');
ok((await lootAllowance(rc, 'Someone')).rare === 0, 'someone else’s receipts count for nothing');
ok((await lootAllowance([await sign({ sub: 'ash', it: 'wisp_lantern', n: 1, jti: 'x' }, 'forged-secret-forged-secret-forged-secret')], 'Ash')).rare === 0, 'forged receipts count for nothing');
ok((await lootAllowance([rc[0], rc[0], rc[0]], 'Ash')).rare === 1, 'the same receipt counts once per save');
ok((await lootAllowance('junk', 'Ash')).rare === 0 && (await lootAllowance([{}], 'Ash')).rare === 0, 'junk is ignored');
console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0);
