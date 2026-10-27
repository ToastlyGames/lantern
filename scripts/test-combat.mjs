// Combat level from Fighting + every skill, Mining, the Fighting cap and the lift:  node scripts/test-combat.mjs
import { sanitize, plausible } from '../lib/validate.js';
import { combatFrom, XP_TABLE, SKILLS, ORES, PACKS, ENEMIES, ITEMS, GEAR, RECIPES } from '../lib/gamedata.js';
let pass = 0, failN = 0; const ok = (c, n) => { c ? pass++ : failN++; console.log(c ? '  ✓' : '  ✗', n); };
const FIVE = ['farming', 'fishing', 'cooking', 'smithing', 'woodcutting'];
const sk5 = l => Object.fromEntries(FIVE.map(k => [k, XP_TABLE[l]]));                    // a save from before Mining
const sk6 = l => Object.assign(sk5(l), { mining: XP_TABLE[l] });                          // every skill, Mining too
ok(Object.keys(SKILLS).length === 6 && SKILLS.mining, 'six skills: Mining joined');
ok(sanitize({}).lvl === 1, 'a new hero is combat level 1');
ok(combatFrom(37, {}) === 10 && combatFrom(36, {}) === 9, 'fighting alone: combat 10 needs Fighting 37');
ok(combatFrom(16, sk6(8)) === 10 && combatFrom(15, sk6(8)) === 9, 'a mix: Fighting 16 with every skill at 8 is combat 10');
ok(combatFrom(1, sk6(13)) === 10 && combatFrom(1, sk6(12)) === 9, 'skills alone: all six at 13 is combat 10');
ok(combatFrom(99, sk6(99)) === 99 && combatFrom(200, sk6(99)) === 99, 'everything at 99 is combat 99, and Fighting past 99 adds nothing');
const old = sanitize({ lvl: 12, xp: 40 });
ok(old.lvl === 12 && old.flv === 12 && old.cbFloor === 12, 'a save from before v0.9.6 keeps its combat level (old combat progress becomes Fighting)');
const pre = sanitize({ flv: 15, cbFloor: 1, skills: sk5(8) }), post = sanitize({ flv: 15, cbFloor: 1, skills: Object.assign(sk5(8), { mining: 0 }) });
ok(pre.lvl === 10 && pre.cbFloor === 10, 'a save from before Mining keeps the level the old formula gave it (' + pre.lvl + ')');
ok(post.lvl === 8 && post.cbFloor === 1, 'a new save (Mining in it) is worked out with the new formula (' + post.lvl + ')');
ok(sanitize(pre).lvl === 10, 'and the kept level stays once the save has Mining in it');
const fake = sanitize({ lvl: 40, flv: 3, cbFloor: 1, skills: { mining: 0 } });
ok(fake.lvl === combatFrom(3, {}), 'a combat level sent by the browser is ignored: the server works it out (' + fake.lvl + ')');
ok(sanitize({ flv: 150, skills: { mining: 0 } }).flv === 99, 'Fighting tops out at 99');
const p = sanitize({ flv: 10, cbFloor: 1, skills: sk6(5) }), n = sanitize({ flv: 10, cbFloor: 1, skills: Object.assign(sk6(5), { mining: XP_TABLE[6] }) });
ok(plausible(p, n, 60).ok, 'gaining a Mining level (and maybe a combat level with it) is a normal save');
// the lift
const B = { mother: true, knight: true, tyrant: true };
ok(sanitize({ lift: 11, deepest: 10, bosses: B }).lift === 11, 'beat the Knight: the lift reaches floor 11');
ok(sanitize({ lift: 11, deepest: 10, bosses: { mother: true } }).lift === 6, 'no lift to 11 without beating the Knight');
ok(sanitize({ lift: 16, deepest: 15, bosses: B }).lift === 16 && sanitize({ lift: 16, deepest: 10, bosses: B }).lift === 11, 'floor 16 needs the Tyrant beaten and floor 15 reached');
ok(sanitize({ lift: 6, deepest: 5 }).lift === 1 && sanitize({ lift: 7, deepest: 9, bosses: B }).lift === 6, 'no boss, no lift; odd floors round down to a real stop');
// the content is wired up
ok(PACKS.length === 4 && PACKS[3].to === 20 && PACKS.every(pk => ENEMIES[pk.boss] && pk.enemies.every(e => ENEMIES[e]) && pk.veins.every(v => ORES[v[0]] && ITEMS[v[0] + '_ore'])), 'floors 1–20: every monster, boss and ore exists');
ok(['tyrant', 'warden'].every(b => ENEMIES[b].rare.every(([id, ch]) => ITEMS[id] && ITEMS[id].rarity === 'mythic' && ch < .05)), 'the new bosses each have a very rare Mythic drop');
ok(ITEMS.cinder_blade.gear === 'blade' && GEAR.blade.cinder.dmg > GEAR.blade.steel.dmg && ITEMS.star_helm.gear === 'helm' && GEAR.helm.star.def > GEAR.helm.steel.def, 'the rare blade and helm beat steel');
ok(['steel_blade', 'steel_helm', 'steel_mail'].every(id => RECIPES.forge.some(r => r.out === id && Object.keys(r.need).every(k => ITEMS[k]))), 'steel gear is forged from real materials');
const s1 = sanitize({ bank: { cinder_blade: 1, coal_ore: 5 }, gear: { blade: 'steel', mail: 'steel', helm: 'star' } });
ok(s1.bank.cinder_blade === 1 && s1.bank.coal_ore === 5 && s1.gear.blade === 'steel' && s1.gear.helm === 'star', 'new items and gear survive a save');
console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0);
