// Combat level from Fighting + every skill:  node scripts/test-combat.mjs
import { sanitize, plausible } from '../lib/validate.js';
import { combatFrom, XP_TABLE } from '../lib/gamedata.js';
let pass = 0, failN = 0; const ok = (c, n) => { c ? pass++ : failN++; console.log(c ? '  ✓' : '  ✗', n); };
const sk = l => Object.fromEntries(['farming', 'fishing', 'cooking', 'smithing', 'woodcutting'].map(k => [k, XP_TABLE[l]]));
ok(sanitize({}).lvl === 1, 'a new hero is combat level 1');
ok(combatFrom(9, sk(1)) === 3 && combatFrom(33, sk(1)) === 10 && combatFrom(32, sk(1)) === 9, 'fighting alone: combat 10 needs Fighting 33');
ok(combatFrom(15, sk(8)) === 10 && combatFrom(14, sk(8)) === 9, 'a mix: Fighting 15 with skills at 8 is combat 10');
ok(combatFrom(1, sk(13)) === 9 && combatFrom(1, sk(14)) === 10, 'skills alone: all five at 14 is combat 10');
const old = sanitize({ lvl: 12, xp: 40 });
ok(old.lvl === 12 && old.flv === 12 && old.cbFloor === 12, 'a save from before keeps its combat level (old combat progress becomes Fighting)');
const fake = sanitize({ lvl: 40, flv: 3, cbFloor: 1 });
ok(fake.lvl === combatFrom(3, {}), 'a combat level sent by the browser is ignored: the server works it out (' + fake.lvl + ')');
const p = sanitize({ flv: 10, cbFloor: 1, skills: sk(5) }), n = sanitize({ flv: 10, cbFloor: 1, skills: Object.assign(sk(5), { fishing: XP_TABLE[6] }) });
ok(plausible(p, n, 60).ok, 'gaining a skill level (and maybe a combat level with it) is a normal save');
console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0);
