// Combat level from Fighting (or Magic) + every skill, Mining, Crafting, Magic, the Fighting cap, the lift and jewelry:  node scripts/test-combat.mjs
import { sanitize, plausible } from '../lib/validate.js';
import { combatFrom, XP_TABLE, SKILLS, ORES, PACKS, ENEMIES, ITEMS, GEAR, RECIPES, JEWELS, RELIC_CHANCE, RELIC_FORGE, forgeable } from '../lib/gamedata.js';
let pass = 0, failN = 0; const ok = (c, n) => { c ? pass++ : failN++; console.log(c ? '  ✓' : '  ✗', n); };
const FIVE = ['farming', 'fishing', 'cooking', 'smithing', 'woodcutting'];
const sk5 = l => Object.fromEntries(FIVE.map(k => [k, XP_TABLE[l]]));                    // a save from before Mining
const sk6 = l => Object.assign(sk5(l), { mining: XP_TABLE[l] });                          // a save from before Crafting
const sk7 = l => Object.assign(sk6(l), { crafting: XP_TABLE[l] });                        // a save from before Magic
const sk8 = l => Object.assign(sk7(l), { magic: XP_TABLE[l] });                           // every skill
ok(Object.keys(SKILLS).length === 8 && SKILLS.mining && SKILLS.crafting && SKILLS.magic, 'eight skills: Mining, Crafting and Magic joined');
ok(sanitize({}).lvl === 1, 'a new hero is combat level 1');
ok(combatFrom(46, {}) === 10 && combatFrom(45, {}) === 9, 'fighting alone: combat 10 needs Fighting 46');
ok(combatFrom(1, { magic: XP_TABLE[46] }) >= 10 && combatFrom(1, { magic: XP_TABLE[46] }) > combatFrom(46, {}) - 1, 'magic counts as the fighting side of combat (Magic 46 alone is combat ' + combatFrom(1, { magic: XP_TABLE[46] }) + ')');
ok(combatFrom(18, sk8(8)) === 10 && combatFrom(17, sk8(8)) === 9, 'a mix: Fighting 18 with every skill at 8 is combat 10');
ok(combatFrom(1, sk8(10)) === 10 && combatFrom(1, sk8(9)) === 9, 'skills alone: all eight at 10 is combat 10 (Magic stands in for Fighting)');
ok(combatFrom(99, sk8(99)) === 99 && combatFrom(200, sk8(99)) === 99, 'everything at 99 is combat 99, and Fighting past 99 adds nothing');
const old = sanitize({ lvl: 12, xp: 40 });
ok(old.lvl === 12 && old.flv === 12 && old.cbFloor === 12, 'a save from before v0.9.6 keeps its combat level (old combat progress becomes Fighting)');
const pre = sanitize({ flv: 15, cbFloor: 1, skills: sk5(8) }), post = sanitize({ flv: 15, cbFloor: 1, skills: Object.assign(sk5(8), { mining: 0, crafting: 0, magic: 0 }) });
ok(pre.lvl === 10 && pre.cbFloor === 10, 'a save from before Mining keeps the level the old formula gave it (' + pre.lvl + ')');
ok(post.lvl === 7 && post.cbFloor === 1, 'a new save (Magic in it) is worked out with the new formula (' + post.lvl + ')');
ok(sanitize(pre).lvl === 10, 'and the kept level stays once the save has Mining in it');
const v010 = sanitize({ flv: 16, cbFloor: 1, skills: sk6(8) }), v011 = sanitize({ flv: 16, cbFloor: 1, skills: Object.assign(sk6(8), { crafting: 0, magic: 0 }) });
ok(v010.lvl === 10 && v010.cbFloor === 10 && v011.lvl === 8, `a save from before Crafting keeps its level too (${v010.lvl}; new formula: ${v011.lvl})`);
const v012 = sanitize({ flv: 16, cbFloor: 1, skills: sk7(8) });
ok(v012.lvl === 9 && v012.cbFloor === 9, 'a save from before Magic keeps the level the old formula gave it (' + v012.lvl + ')');
const fake = sanitize({ lvl: 40, flv: 3, cbFloor: 1, skills: { mining: 0 } });
ok(fake.lvl === combatFrom(3, {}), 'a combat level sent by the browser is ignored: the server works it out (' + fake.lvl + ')');
ok(sanitize({ flv: 150, skills: { mining: 0 } }).flv === 99, 'Fighting tops out at 99');
const p = sanitize({ flv: 10, cbFloor: 1, skills: sk7(5) }), n = sanitize({ flv: 10, cbFloor: 1, skills: Object.assign(sk7(5), { mining: XP_TABLE[6] }) });
ok(plausible(p, n, 60).ok, 'gaining a Mining level (and maybe a combat level with it) is a normal save');
// the lift
const B = { mother: true, knight: true, tyrant: true };
ok(sanitize({ lift: 11, deepest: 10, bosses: B }).lift === 11, 'beat the Knight: the lift reaches floor 11');
ok(sanitize({ lift: 11, deepest: 10, bosses: { mother: true } }).lift === 6, 'no lift to 11 without beating the Knight');
ok(sanitize({ lift: 16, deepest: 15, bosses: B }).lift === 16 && sanitize({ lift: 16, deepest: 10, bosses: B }).lift === 11, 'floor 16 needs the Tyrant beaten and floor 15 reached');
ok(sanitize({ lift: 6, deepest: 5 }).lift === 1 && sanitize({ lift: 7, deepest: 9, bosses: B }).lift === 6, 'no boss, no lift; odd floors round down to a real stop');
// the content is wired up
ok(PACKS.length === 6 && PACKS[5].to === 30 && PACKS.every(pk => ENEMIES[pk.boss] && pk.enemies.every(e => ENEMIES[e]) && pk.veins.every(v => ORES[v[0]] && ITEMS[v[0] + '_ore'])), 'floors 1–30: every monster, boss and ore exists');
ok(['tyrant', 'warden'].every(b => ENEMIES[b].rare.every(([id, ch]) => ITEMS[id] && ITEMS[id].rarity === 'mythic' && ch < .05)), 'the floor 20 bosses each have a very rare Mythic drop');
ok(['archmage', 'hollowking'].every(b => { const r = ENEMIES[b].rare.map(([id, ch]) => [ITEMS[id], ch]); return r.length === 2 && r.every(([it, ch]) => it && ch < .05) && r.some(([it]) => it.rarity === 'mythic') && r.some(([it]) => it.rarity === 'legendary') && r.some(([it]) => GEAR.blade[it.tier] && GEAR.blade[it.tier].staff) && r.some(([it]) => GEAR.mail[it.tier] && GEAR.mail[it.tier].robe); }), 'each floor 30 boss drops one staff and one robe, one Mythic and one Legendary');
ok(ORES.gloam && ITEMS.gloam_ore && ['gloam_blade', 'gloam_helm', 'gloam_mail'].every(id => RECIPES.forge.some(r => r.out === id)) && GEAR.blade.gloam.dmg > GEAR.blade.steel.dmg && GEAR.mail.gloam.def > GEAR.mail.steel.def, 'Gloamite: one new ore, forged into a blade and armour past steel');
ok(ITEMS.cinder_blade.gear === 'blade' && GEAR.blade.cinder.dmg > GEAR.blade.steel.dmg && ITEMS.star_helm.gear === 'helm' && GEAR.helm.star.def > GEAR.helm.steel.def, 'the rare blade and helm beat steel');
ok(['steel_blade', 'steel_helm', 'steel_mail'].every(id => RECIPES.forge.some(r => r.out === id && Object.keys(r.need).every(k => ITEMS[k]))), 'steel gear is forged from real materials');
const s1 = sanitize({ bank: { cinder_blade: 1, coal_ore: 5 }, gear: { blade: 'steel', mail: 'steel', helm: 'star' } });
ok(s1.bank.cinder_blade === 1 && s1.bank.coal_ore === 5 && s1.gear.blade === 'steel' && s1.gear.helm === 'star', 'new items and gear survive a save');
// jewelry
const j1 = sanitize({ gear: { ring: 'diamond_ring', amulet: 'star_amulet' }, bank: { ruby: 2, copper_bar: 3 } }), j2 = sanitize({ gear: { ring: 'star_amulet', amulet: 'copper_ring' } });
ok(j1.gear.ring === 'diamond_ring' && j1.gear.amulet === 'star_amulet' && j1.bank.ruby === 2 && j1.bank.copper_bar === 3, 'a ring, an amulet, gems and bars survive a save');
ok(j2.gear.ring === null && j2.gear.amulet === null, 'a ring can’t be worn as an amulet (or the other way round)');
ok(RECIPES.jewel.length === Object.keys(JEWELS).length && RECIPES.jewel.every(r => Object.keys(r.need).every(k => ITEMS[k])) && RECIPES.smelt.every(r => ITEMS[r.out].bar && Object.keys(r.need).every(k => ITEMS[k])), 'every jewelry and smelting recipe uses real items');
const c0 = sanitize({ flv: 30, skills: sk7(45), bank: { cobalt_bar: 2, starshard_ore: 1, diamond: 1 } }), c1 = sanitize({ flv: 30, skills: Object.assign(sk7(45), { crafting: XP_TABLE[45] + 550 }), bank: { star_amulet: 1 } });
ok(plausible(c0, c1, 3).ok, 'crafting the Starshard Amulet is a normal save (' + JSON.stringify(plausible(c0, c1, 3)) + ')');
// magic
const m1 = sanitize({ gear: { blade: 'moonstaff' }, runes: { gale_rune: 40, stone_rune: -3, junk: 5 }, spell: 'cataclysm', skills: sk8(5) });
ok(m1.runes.gale_rune === 40 && !m1.runes.stone_rune && !m1.runes.junk, 'runes survive a save; junk and negative runes do not');
ok(Object.values(ENEMIES).filter(e => e.proj).length >= 3, 'the floor bosses throw projectiles');
const e1 = sanitize({ gear: { ring: 'diamond_ring' }, bank: {}, ench: { ring: { id: 'lesser', s: 'atk', a: 9999 } } });
ok(!e1.ench || !e1.ench.ring || e1.ench.ring.a < 9999, 'an enchantment can’t roll past its maximum (' + JSON.stringify(e1.ench) + ')');
// relics and relic-forging (v0.12.1)
ok(PACKS.every(p => ENEMIES[p.boss].relic && ITEMS[ENEMIES[p.boss].relic].relic && !ENEMIES[p.boss].drops.some(([id]) => ITEMS[id] && ITEMS[id].relic)) && RELIC_CHANCE === .04, 'every boss has its own relic, rolled at 4% (not in its normal drops)');
ok(RELIC_FORGE.slice(1).every((f, i) => ITEMS[f.relic] && f.relic === ENEMIES[PACKS[i].boss].relic), 'forge steps +1..+5 take the relics of the first five bosses, in order');
ok(forgeable('steel_blade') && forgeable('moon_staff') && forgeable('void_robe') && forgeable('diamond_ring') && !forgeable('rusty_blade') && !forgeable('traveler_garb') && !forgeable('partyhat_helm') && !forgeable('relic_crown'), 'what can be forged (not starter gear, admin hats or non-gear)');
const f1 = sanitize({ gear: { blade: 'steel', ring: 'ruby_ring' }, bank: { iron_blade: 1 }, forged: { steel_blade: 3, ruby_ring: 9, iron_blade: 2, cinder_blade: 4, rusty_blade: 1, nope: 2 } });
ok(f1.forged.steel_blade === 3 && f1.forged.ruby_ring === 5 && f1.forged.iron_blade === 2 && !f1.forged.cinder_blade && !f1.forged.rusty_blade && !f1.forged.nope, 'forge levels survive a save: kept for owned pieces, capped at +5 (' + JSON.stringify(f1.forged) + ')');
const g0 = sanitize({ flv: 30, skills: sk8(30), gold: 5000, gear: { blade: 'steel' }, bank: { relic_crown: 2 } }), g1 = sanitize({ flv: 30, skills: sk8(30), gold: 4500, gear: { blade: 'steel' }, bank: { relic_crown: 1 }, forged: { steel_blade: 1 } });
ok(plausible(g0, g1, 20).ok, 'forging +1 with a Slime Crown is a normal save');
const g2 = sanitize({ flv: 30, skills: sk8(30), gold: 5000, gear: { blade: 'steel' }, bank: {}, forged: { steel_blade: 5 } });
ok(!plausible(g0, g2, 20).ok, 'jumping to +5 without the relics is rejected (' + plausible(g0, g2, 20).reason + ')');
const e2 = sanitize({ gear: { ring: 'diamond_ring' }, ench: { ring: { id: 'diamond_ring', s: 'lesser', a: { hp: 30 } } } });
ok(e2.ench.ring && e2.ench.ring.a.hp === 8, 'an enchantment is capped at the most its own spell can roll (Lesser: +8 HP, got ' + JSON.stringify(e2.ench) + ')');
// v0.12.1 save checks (from the v0.12.0 audit)
const hb = { gold: 5000, flv: 60, cbFloor: 1, deepest: 29, lift: 26, bosses: { mother: 1, knight: 1, tyrant: 1, warden: 1, archmage: 1 }, skills: Object.assign(sk7(30), { magic: XP_TABLE[70] }), gear: { blade: 'moon', mail: 'voidrobe' }, kills: 100, cnt: { bossxp: 4 } };
const hkMag = Math.round(2300 * (1 + .12 * 29)) * 2, hp0 = sanitize(hb), hk = JSON.parse(JSON.stringify(hb)); hk.skills.magic += hkMag; hk.kills++; hk.cnt.bossxp++;
ok(plausible(hp0, sanitize(hk), 12).ok, 'a Hollow King kill with a staff (' + hkMag + ' Magic XP) is a normal save');
const hk2 = JSON.parse(JSON.stringify(hk)); hk2.cnt.bossxp = 4;
ok(!plausible(hp0, sanitize(hk2), 12).ok, 'but that much Magic XP with no boss kill is rejected');
const ch = JSON.parse(JSON.stringify(hb)); ch.skills.magic += 15200;
ok(!plausible(hp0, sanitize(ch), 2).ok, 'a +15,200 Magic save 2 s after the last one is rejected');
const cast = JSON.parse(JSON.stringify(hb)); cast.skills.magic += 7000;
ok(plausible(hp0, sanitize(cast), 12).ok, 'a few Cataclysm volleys on floor 30 in 12 s (+7,000 Magic) is a normal save');
const haul = { gloam_ore: 14, gem: 9, emerald: 2, diamond: 2, gold: 1600, oil2: 1 }, d0 = sanitize(Object.assign({}, hb, { pack: haul })), d1 = JSON.parse(JSON.stringify(hb));
d1.gold += 1600; d1.bank = { gloam_ore: 14, gem: 9, emerald: 2, diamond: 2, oil2: 1 };
ok(plausible(d0, sanitize(d1), 12).ok && !plausible(hp0, sanitize(d1), 12).ok, 'a big floor-30 haul carried in the save gets home without a jump in wealth (and would be one without it)');
const lc = sanitize({ gear: { ring: 'copper_ring' }, ench: { ring: { id: 'copper_ring', s: 'lesser', a: { dmg: 4, mag: 5, hp: 8, luck: 3 } } } });
ok(JSON.stringify(lc.ench.ring.a) === '{"hp":8}', 'an enchantment keeps only bonuses its spell can roll, and only as many as it rolls (' + JSON.stringify(lc.ench.ring.a) + ')');
// v0.13.7: gold an older game put in the bag (monster gold outside the Depths) counts as gold, not a lost item
{ const gb = sanitize({ gold: 100, bank: { gold: 50, bread: 2 } }); ok(gb.gold === 150 && !gb.bank.gold && gb.bank.bread === 2, 'gold in the bag becomes gold (' + gb.gold + ')'); }
// v0.13: quests, soulbound cosmetics, positions on the bigger map
const q0 = sanitize({ cos: { own: ['jack_lantern', 'reaper_scythe'], head: 'jack_lantern', weapon: 'reaper_scythe' }, quests: { hallow: { s: 3, n: 2 } } });
ok(!q0.cos.own.length && q0.cos.head === null && q0.cos.weapon === null && q0.quests.hallow.s === 3, 'no Halloween cosmetics before All Hallows’ Lantern is done (' + JSON.stringify(q0.cos) + ')');
const q1 = sanitize({ cos: { own: ['jack_lantern', 'nope'], head: 'reaper_scythe', weapon: 'reaper_scythe' }, quests: { hallow: { s: 6, n: 0, done: true } } });
ok(q1.cos.own.sort().join() === 'jack_lantern,reaper_scythe' && q1.cos.weapon === 'reaper_scythe' && q1.cos.head === null && q1.quests.hallow.done, 'done: both rewards owned, each only in its own slot (' + JSON.stringify(q1.cos) + ')');
const qm = sanitize({ cos: { own: ['reaper_shroud'], body: 'reaper_shroud' }, quests: { hallow: { s: 6, n: 0, done: true } } });
ok(qm.cos.own.sort().join() === 'jack_lantern,reaper_scythe' && qm.cos.head === 'jack_lantern' && qm.cos.weapon === 'reaper_scythe' && !('body' in qm.cos), 'a v0.13.0 Reaper’s Shroud becomes the Jack-o’-Lantern and the Scythe, both worn (' + JSON.stringify(qm.cos) + ')');
const q2 = sanitize({ quests: { hallow: { s: 99, done: true } } }), q3 = sanitize({ quests: { hallow: { s: 2, done: true } } });
ok(q2.quests.hallow.s === 6 && q2.quests.hallow.done && !q3.quests.hallow.done, 'quest steps are clamped, and a quest is only done at its last step');
ok(!q1.bank.jack_lantern && !q1.vault.reaper_scythe, 'cosmetics are never bank items (soulbound)');
const pv3 = sanitize({ pos: { x: 1600, y: 900, v: 3 } }), pv2 = sanitize({ pos: { x: 900, y: 900, v: 2 } });
ok(pv3.pos.v === 3 && pv3.pos.x === 1600 && pv2.pos.v === 2, 'saved positions keep their map version (v3 for v0.13; the game moves older ones)');
console.log(`\n${pass} passed, ${failN} failed`); process.exit(failN ? 1 : 0);
