// ===== Lanternhold content pack (season 0). Expansions add entries here, not code. =====
const ITEMS={
  gold:{n:'Gold',v:1},
  copper_ore:{n:'Copper Ore',v:4},iron_ore:{n:'Iron Ore',v:9},ember_ore:{n:'Emberite Ore',v:30},
  coal_ore:{n:'Coal',v:14},cobalt_ore:{n:'Cobalt Ore',v:45},starshard_ore:{n:'Starshard',v:150},
  // gems for jewelry: found in chests (the Cave Gem also drops from wisps and bosses)
  ruby:{n:'Ruby',v:90,gem:true},sapphire:{n:'Sapphire',v:110,gem:true},emerald:{n:'Emerald',v:140,gem:true},diamond:{n:'Diamond',v:400,gem:true},
  // bars: smelted from ore at the Forge, for jewelry
  copper_bar:{n:'Copper Bar',v:12,bar:true},iron_bar:{n:'Iron Bar',v:28,bar:true},ember_bar:{n:'Emberite Bar',v:95,bar:true},steel_bar:{n:'Steel Bar',v:70,bar:true},cobalt_bar:{n:'Cobalt Bar',v:140,bar:true},
  gem:{n:'Cave Gem',v:40},slime_gel:{n:'Slime Gel',v:2},bone:{n:'Old Bone',v:3},
  wheat_seed:{n:'Wheat Seed',v:2},lampseed:{n:'Lampseed',v:12},glowcap_spore:{n:'Glowcap Spore',v:6},
  wheat:{n:'Wheat',v:3},glowcap:{n:'Glowcap',v:9},
  logs:{n:'Logs',v:2},blackwood_logs:{n:'Blackwood Logs',v:9},willow_logs:{n:'Willow Logs',v:18},
  bread:{n:'Bread',v:8,heal:30,food:true},stew:{n:'Glowcap Stew',v:20,heal:70,food:true},
  oil:{n:'Oil Flask',v:15,oil:50},oil2:{n:'Greater Oil Flask',v:90,oil:100},
  moonpetal_seed:{n:'Moonpetal Seed',v:30},moonpetal:{n:'Moonpetal',v:45},
  // floors 21–30: Gloamite, the one new ore of the Drowned Archive and the Hollow Throne
  gloam_ore:{n:'Gloamite Ore',v:260},gloam_bar:{n:'Gloamite Bar',v:600,bar:true},
  gloam_blade:{n:'Gloamite Blade',v:2600,gear:'blade',tier:'gloam'},gloam_helm:{n:'Gloamite Helm',v:1900,gear:'helm',tier:'gloam'},gloam_mail:{n:'Gloamite Mail',v:2900,gear:'mail',tier:'gloam'},
  // staffs (the weapon slot): wield one and your attacks become spells, which train Magic instead of Fighting
  apprentice_staff:{n:'Apprentice Staff',v:40,gear:'blade',tier:'apprentice'},blackwood_staff:{n:'Blackwood Staff',v:320,gear:'blade',tier:'blackwood'},
  ember_staff:{n:'Emberwood Staff',v:900,gear:'blade',tier:'emberwood'},gloam_staff:{n:'Gloamwood Staff',v:3200,gear:'blade',tier:'gloamwood'},
  // the boss drops of floors 21–30: the Drowned Archmage (Mythic staff, Legendary robe), the Hollow King (Legendary staff, Mythic robe)
  moon_staff:{n:'Moonwell Staff',v:22000,gear:'blade',tier:'moon',rarity:'mythic'},hollow_staff:{n:'Hollow Scepter',v:9000,gear:'blade',tier:'hollow',rarity:'legendary'},
  tide_robe:{n:"Archmage's Tiderobe",v:8000,gear:'mail',tier:'tide',rarity:'legendary'},void_robe:{n:'Voidwoven Robe',v:20000,gear:'mail',tier:'voidrobe',rarity:'mythic'},
  raw_moonfin:{n:'Raw Moonfin',v:40},moonfin:{n:'Cooked Moonfin',v:90,heal:85,food:true},
  rusty_blade:{n:'Rusty Blade',v:1,gear:'blade',tier:'rusty'},traveler_garb:{n:'Traveler Garb',v:1,gear:'mail',tier:'none'},
  copper_blade:{n:'Copper Blade',v:60,gear:'blade',tier:'copper'},iron_blade:{n:'Iron Blade',v:160,gear:'blade',tier:'iron'},ember_blade:{n:'Ember Blade',v:520,gear:'blade',tier:'ember'},
  copper_mail:{n:'Copper Mail',v:70,gear:'mail',tier:'copper'},iron_mail:{n:'Iron Mail',v:180,gear:'mail',tier:'iron'},ember_mail:{n:'Ember Mail',v:560,gear:'mail',tier:'ember'},
  raw_pondfin:{n:'Raw Pondfin',v:5},pondfin:{n:'Cooked Pondfin',v:12,heal:35,food:true},burnt_fish:{n:'Burnt Fish',v:0},
  raw_gloomfin:{n:'Raw Gloomfin',v:18},gloomfin:{n:'Cooked Gloomfin',v:40,heal:55,food:true},
  copper_helm:{n:'Copper Helm',v:40,gear:'helm',tier:'copper'},iron_helm:{n:'Iron Helm',v:120,gear:'helm',tier:'iron'},ember_helm:{n:'Ember Helm',v:420,gear:'helm',tier:'ember'},
  steel_blade:{n:'Steel Blade',v:900,gear:'blade',tier:'steel'},steel_helm:{n:'Steel Helm',v:650,gear:'helm',tier:'steel'},steel_mail:{n:'Steel Mail',v:1000,gear:'mail',tier:'steel'},
  // the two rarest finds below floor 10: each boss of floors 11–20 has a tiny chance to drop one
  cinder_blade:{n:'Cinderfang',v:15000,gear:'blade',tier:'cinder',rarity:'mythic'},star_helm:{n:"Starwarden's Helm",v:12000,gear:'helm',tier:'star',rarity:'mythic'},
  partyhat_helm:{n:'Blue Party Hat',v:0,gear:'helm',tier:'partyhat',rarity:'unique',bound:true},
  greenhat_helm:{n:'Green Party Hat',v:0,gear:'helm',tier:'greenhat',rarity:'unique',bound:true},
  relic_crown:{n:'Slime Crown',v:400,relic:true},relic_sigil:{n:"Knight's Sigil",v:900,relic:true},
  relic_heart:{n:'Forge Heart',v:1800,relic:true},relic_star:{n:'Fallen Star',v:3000,relic:true},
  relic_tome:{n:'Drowned Grimoire',v:4500,relic:true},relic_throne:{n:'Hollow Crown',v:6500,relic:true}
};
const GEAR={
  // staffs: dmg is what they do as a club (in the Wilderness); mag is the bonus to spell damage, in %
  blade:{rusty:{dmg:6,n:'Rusty Blade'},copper:{dmg:10},iron:{dmg:16},ember:{dmg:25},steel:{dmg:34},gloam:{dmg:40},cinder:{dmg:46},
    apprentice:{dmg:4,staff:true,mag:0},blackwood:{dmg:6,staff:true,mag:6},emberwood:{dmg:9,staff:true,mag:12},gloamwood:{dmg:12,staff:true,mag:20},hollow:{dmg:14,staff:true,mag:30},moon:{dmg:16,staff:true,mag:40}},
  // robes: lighter than plate, but they add to spell damage (mag, in %)
  mail:{none:{def:0,n:'Traveler Garb'},copper:{def:2},iron:{def:4},ember:{def:7},steel:{def:10},gloam:{def:13},tide:{def:8,mag:15,robe:true},voidrobe:{def:11,mag:25,robe:true}},
  helm:{copper:{def:1},iron:{def:2},ember:{def:4},steel:{def:5},gloam:{def:7},star:{def:9},partyhat:{def:25},greenhat:{def:25}}
};
// the item id for a gear tier in a slot (gear:'blade', tier:'apprentice' -> 'apprentice_staff')
const GEAR_ITEM={};for(const [id,it] of Object.entries(ITEMS))if(it.gear)GEAR_ITEM[it.gear+':'+it.tier]=id;
const isStaff=t=>!!(GEAR.blade[t]&&GEAR.blade[t].staff);
// Helmets can carry attributes like capes. The Blue Party Hat is one of one: admin only, never drops, can't be sold or dropped.
const HELM_ATTR={star:{hp:25,light:15,luck:10},partyhat:{dmg:900,hp:500,spd:25,light:40,luck:50},greenhat:{dmg:900,hp:500,spd:25,light:40,luck:50}};
const ADMIN_HATS={partyhat:'Blue Party Hat',greenhat:'Green Party Hat'};
// ---------- rarity ----------
const RARITY={unique:{n:'One of One',c:'#73eff7',w:0},common:{n:'Common',c:'#c2d3e0',w:62},uncommon:{n:'Uncommon',c:'#a7f070',w:26},rare:{n:'Rare',c:'#41a6f6',w:9},xrare:{n:'Extremely Rare',c:'#c77dff',w:2.6},legendary:{n:'Legendary',c:'#ffcd75',w:.4},mythic:{n:'Mythic',c:'#ff77a8',w:0}};
const RORDER=['common','uncommon','rare','xrare','legendary','mythic','unique'];
// ---------- lanterns: everyone starts with Basic. Better lanterns burn oil slower (last longer) and throw more light ----------
const LANTERNS={
  basic:{n:'Basic Lantern',r:'common',burn:1,light:1,metal:'#566c86',glow:'#ffcd75',v:2},
  tin:{n:'Tin Lantern',r:'common',burn:.9,light:1,metal:'#94b0c2',glow:'#ffcd75',v:25},
  copper:{n:'Copper Lantern',r:'uncommon',burn:.8,light:1.05,metal:'#ef7d57',glow:'#ffcd75',v:70},
  iron:{n:'Iron Lantern',r:'rare',burn:.68,light:1.1,metal:'#f4f4f4',glow:'#ffe9a8',v:180},
  crystal:{n:'Crystal Lantern',r:'xrare',burn:.55,light:1.2,metal:'#73eff7',glow:'#c9fbff',v:600},
  wisp:{n:'Wispheart Lantern',r:'legendary',aura:'#b8f7ff',burn:.42,light:1.32,metal:'#ffcd75',glow:'#b8f7ff',v:2400},
  // Goal relics: never drop, can't be bought, sold or dropped. A very rare, random reward for completing goals.
  starlit:{n:'Starlit Lantern',r:'mythic',aura:'#ff77a8',burn:.36,light:1.45,metal:'#c77dff',glow:'#ffd6f0',v:9000,goal:true}
};
// ---------- capes: nobody starts with one; each carries special attributes ----------
// attrs: hp (+max HP), def (+defense), dmg (% damage), oil (% slower oil burn), spd (% move speed), light (% light radius),
//        luck (% better loot odds), regen (HP per second in the Depths), fishXp (% Fishing XP), catch (% catch chance), cookSafe (% less burning)
// Skilling capes (src: a skill) can drop from that skill's every action, but only at a tiny chance: 1 in SKILL_CAPE_ODDS.
const SKILL_CAPE_ODDS=35000;
const CAPES={
  tattered:{n:'Tattered Cloak',r:'common',c1:'#8a6f30',c2:'#6b3e26',attr:{hp:6},v:30},
  moss:{n:'Mossweave Cape',r:'uncommon',c1:'#38b764',c2:'#2b4b3a',attr:{oil:10,spd:5},v:110},
  angler:{n:"Angler's Cape",r:'xrare',c1:'#41a6f6',c2:'#29366f',attr:{fishXp:10,catch:6},v:1200,src:'fishing'},
  grave:{n:'Gravecloth Mantle',r:'rare',c1:'#94b0c2',c2:'#333c57',attr:{def:2,hp:10},v:320},
  hearth:{n:'Hearthkeeper Cape',r:'rare',c1:'#ef7d57',c2:'#b13e53',attr:{cookSafe:50,regen:.2},v:300},
  glow:{n:'Glowcap Shroud',r:'xrare',c1:'#e86fd0',c2:'#5d275d',attr:{light:20,luck:12},v:900},
  mother:{n:"Mother's Mantle",r:'legendary',aura:'#a7f070',c1:'#a7f070',c2:'#257179',attr:{dmg:15,regen:.35,hp:12},v:3000,boss:'mother'},
  knight:{n:'Pall of the Ossuary',r:'legendary',aura:'#c77dff',c1:'#5d275d',c2:'#1a1c2c',attr:{def:3,dmg:12,oil:10},v:4500,boss:'knight'},
  wayfinder:{n:"Wayfinder's Mantle",r:'mythic',aura:'#ff77a8',c1:'#ff77a8',c2:'#29366f',attr:{spd:10,luck:15,light:15,fishXp:10,chopXp:10},v:7000,src:'goal',goal:true}
};
const ATTR_TXT={hp:v=>`+${v} max HP`,def:v=>`+${v} defense`,dmg:v=>`+${v}% damage`,oil:v=>`Oil lasts ${v}% longer`,spd:v=>`+${v}% move speed`,light:v=>`+${v}% light radius`,
  luck:v=>`+${v}% loot luck`,mag:v=>`+${v}% spell damage`,regen:v=>`Regenerate ${v} HP/s in the Depths`,fishXp:v=>`+${v}% Fishing XP`,catch:v=>`+${v}% catch chance`,cookSafe:v=>`${v}% less burnt food`,chopXp:v=>`+${v}% Woodcutting XP`};
for(const [k,l] of Object.entries(LANTERNS))ITEMS[k+'_lantern']={n:l.n,v:l.v,lantern:k,rarity:l.r,keep:!!l.goal};
for(const [k,c] of Object.entries(CAPES))ITEMS['cape_'+k]={n:c.n,v:c.v,cape:k,rarity:c.r,keep:!!c.goal};
// ---------- jewelry: rings and amulets, made at the Jeweler's Bench (Crafting) from bars and gems. Each carries attributes,
// like a cape. The item id is what you wear (S.gear.ring / S.gear.amulet). Bonuses work everywhere except Wilderness fights.
const JEWELS={
  copper_ring:{n:'Copper Ring',slot:'ring',lvl:1,need:{copper_bar:1,gem:1},xp:30,attr:{hp:6},v:70},
  copper_amulet:{n:'Copper Amulet',slot:'amulet',lvl:5,need:{copper_bar:2,gem:1},xp:45,attr:{oil:8},v:85},
  ruby_ring:{n:'Ruby Ring',slot:'ring',lvl:10,need:{iron_bar:1,ruby:1},xp:80,attr:{dmg:5},v:150},
  sapphire_ring:{n:'Sapphire Ring',slot:'ring',lvl:15,need:{iron_bar:1,sapphire:1},xp:100,attr:{def:1,hp:5},v:180},
  ruby_amulet:{n:'Ruby Amulet',slot:'amulet',lvl:20,need:{iron_bar:2,ruby:1},xp:140,attr:{dmg:8},v:190},
  emerald_ring:{n:'Emerald Ring',slot:'ring',lvl:25,need:{steel_bar:1,emerald:1},xp:190,attr:{luck:8},v:270},
  sapphire_amulet:{n:'Sapphire Amulet',slot:'amulet',lvl:30,need:{steel_bar:2,sapphire:1},xp:240,attr:{def:2,regen:.15},v:320},
  ember_amulet:{n:'Emberheart Amulet',slot:'amulet',lvl:35,need:{ember_bar:2,ruby:2},xp:320,attr:{dmg:12,light:10},v:480},
  diamond_ring:{n:'Diamond Ring',slot:'ring',lvl:40,need:{cobalt_bar:1,diamond:1},xp:400,attr:{def:3,hp:12},v:700},
  star_amulet:{n:'Starshard Amulet',slot:'amulet',lvl:45,need:{cobalt_bar:2,starshard_ore:1,diamond:1},xp:550,attr:{light:15,luck:12,hp:15},v:1080}};
for(const [k,j] of Object.entries(JEWELS))ITEMS[k]={n:j.n,v:j.v,jewel:j.slot};
// ---------- runes: kept in the rune bag (part of the bag that never empties when you fall). Enchanting spells use them ----------
const RUNES={gale:{n:'Gale Rune',c:'#c2d3e0',c2:'#73eff7',v:3},stone:{n:'Stone Rune',c:'#a0663b',c2:'#d9a066',v:5},tide:{n:'Tide Rune',c:'#3b5dc9',c2:'#73a7f7',v:9},
  ember:{n:'Ember Rune',c:'#b13e53',c2:'#ff9f3d',v:12},soul:{n:'Soul Rune',c:'#7a3b8f',c2:'#c79bf2',v:40},star:{n:'Star Rune',c:'#ffcd75',c2:'#fff3c4',v:150}};
for(const [k,r] of Object.entries(RUNES))ITEMS[k+'_rune']={n:r.n,v:r.v,rune:k};
// ---------- Magic: wield a staff and your attack casts your chosen spell. Combat spells need no runes: the staff powers them.
// max: the most a cast can hit before staff and robe bonuses. fx drives the look of the bolt (see castFx in game.js).
const SPELLS={
  spark:{n:'Spark',lvl:1,max:5,spd:190,col:'#ffcd75',col2:'#fff3c4',d:'A crackle of light. Weak, but it never misses its mark.'},
  ember:{n:'Ember Bolt',lvl:8,max:9,spd:175,col:'#ff9f3d',col2:'#ff5a2a',d:'A ball of fire that leaves a trail of sparks.'},
  frost:{n:'Frost Shard',lvl:16,max:13,spd:200,col:'#73eff7',col2:'#e8fbff',slow:.45,d:'An icicle that slows what it hits.'},
  storm:{n:'Storm Lash',lvl:26,max:17,spd:260,col:'#b8f7ff',col2:'#41a6f6',chain:1,d:'Lightning that jumps to a second monster.'},
  burst:{n:'Flame Burst',lvl:36,max:22,spd:170,col:'#ff5a2a',col2:'#ffcd75',aoe:22,d:'Explodes on impact, burning everything close by.'},
  lance:{n:'Void Lance',lvl:48,max:28,spd:240,col:'#c79bf2',col2:'#5d275d',pierce:3,d:'A spear of nothing that passes through up to 3 monsters.'},
  starfall:{n:'Starfall',lvl:62,max:34,spd:150,col:'#ffe9a8',col2:'#73eff7',aoe:28,d:'A falling star that bursts into light.'},
  cataclysm:{n:'Cataclysm',lvl:80,max:42,spd:140,col:'#ff77a8',col2:'#7a3b8f',aoe:36,d:'The sky splits. Everything near the impact burns.'}};
// Enchanting (Magic): on a worn ring or amulet. Each spell rolls attributes from its own pool; casting again rerolls.
// tier scales the rolls; n is how many attributes it gives. The enchantment belongs to the piece you're wearing.
const ENCH_ATTR={hp:[4,8],def:[.5,1],dmg:[2,4],mag:[3,5],luck:[2,4],oil:[3,5],light:[3,5],spd:[1,2],regen:[.04,.07],fishXp:[2,4],chopXp:[2,4]};
const ENCHANTS={
  lesser:{n:'Lesser Enchant',lvl:3,runes:{gale:3,soul:1},xp:40,tier:1,k:1,pool:['hp','oil','light','luck']},
  enchant:{n:'Enchant',lvl:18,runes:{tide:3,stone:2,soul:1},xp:110,tier:2,k:1,pool:['hp','oil','light','luck','dmg','def','fishXp','chopXp']},
  greater:{n:'Greater Enchant',lvl:35,runes:{ember:4,stone:3,soul:2},xp:240,tier:3,k:2,pool:['hp','def','dmg','mag','luck','regen','oil']},
  arcane:{n:'Arcane Enchant',lvl:52,runes:{tide:3,soul:3,star:1},xp:420,tier:4,k:2,pool:['hp','def','dmg','mag','luck','regen','spd','light']},
  mythic:{n:'Mythic Enchant',lvl:70,runes:{ember:3,soul:5,star:3},xp:750,tier:5,k:3,pool:['hp','def','dmg','mag','luck','regen','spd','oil','light']}};
// the most an attribute can reach from any enchantment (the server clamps saves to this)
const enchMax=k=>{const [a,b]=ENCH_ATTR[k]||[0,0];return Math.ceil(b*5*100)/100;};
// the most an enchantment can roll for one bonus (the Hollow Crown raises every bonus on an enchantment to this)
const enchTop=(sp,k)=>{const [a,b]=ENCH_ATTR[k]||[0,0],t=(ENCHANTS[sp]||{tier:0}).tier;return k==='regen'?Math.round(b*t*100)/100:Math.round(b*t);};
// ---------- Quests (v0.13) ----------
// A quest is a list of steps done in order: q.s is how many are done, q.n counts toward a step with a target (n).
const QUESTS={hallow:{n:'All Hallows’ Lantern',giver:'Mordecai the Reaper',tag:'Halloween',rewards:['jack_lantern','reaper_scythe'],
  steps:[{id:'talk',t:'Speak with Mordecai the Reaper, where the Hollow Wood ends'},
    {id:'gourd',t:'Ask Tallow, the trader at the Hold, for a hollow gourd'},
    {id:'light',t:'Ask Wick to light the gourd with his lantern'},
    {id:'wolves',t:'Drive off the Moor Wolves howling in the meadows',n:6},
    {id:'souls',t:'Gather lost souls from the monsters of Hollowmere',n:3},
    {id:'return',t:'Bring the lantern and the souls back to Mordecai'}]}};
// Cosmetics: soulbound to the hero (never items: they can't be traded, dropped, sold or lost). Two slots: the head one is
// drawn over the helmet, the weapon one over the blade or staff; both stay equipped underneath with their stats.
const COSMETICS={jack_lantern:{n:'Jack-o’-Lantern',slot:'head',look:'jack',quest:'hallow',nft:1,d:'A carved pumpkin lit from inside by a cold violet flame that flickers through its grin. From Mordecai the Reaper, for All Hallows’ Eve.'},
  reaper_scythe:{n:'Reaper’s Scythe',slot:'weapon',look:'scythe',quest:'hallow',nft:2,d:'Mordecai’s own scythe: a crescent blade with a soul-lit edge and a violet soul-gem. Shown over your blade or staff.'}};
const COS_SLOTS=['head','weapon'];
// Cosmetic NFTs (Season 1): each cosmetic's token ID on the Lanternhold Cosmetics contract is its nft number. Never reuse one.
const COS_BY_NFT=Object.fromEntries(Object.entries(COSMETICS).filter(([,c])=>c.nft).map(([k,c])=>[c.nft,k]));
const COS_OLD={reaper_shroud:['jack_lantern','reaper_scythe']};   // v0.13.0's quest reward became these two
// ---------- Relic-forging (v0.12.1). Each boss has a rare chance (RELIC_CHANCE) to drop its relic. Relics are spent at the
// Forge to empower a piece you wear, +1 to +5, each step taking the next boss's relic, gold and Smithing. The Hollow Crown
// instead perfects an enchantment. A forge stays with you while you own that piece; lose every copy and it's gone. ----------
const RELIC_CHANCE=.04;
const RELIC_FORGE=[null,
  {relic:'relic_crown',gold:200,lvl:10,xp:150},
  {relic:'relic_sigil',gold:600,lvl:20,xp:300},
  {relic:'relic_heart',gold:1500,lvl:35,xp:500},
  {relic:'relic_star',gold:4000,lvl:50,xp:650},
  {relic:'relic_tome',gold:10000,lvl:65,xp:750}];
const FORGE_MAX=RELIC_FORGE.length-1,RELIC_CROWN='relic_throne';
// per forge level: blades +6% damage, staffs +5% spell damage, armor and helmets +1 defense (robes also +3% spell damage), rings and amulets +12% of their bonuses
const FORGE_FX={blade:6,staff:5,def:1,robe:3,jewel:12};
// an item's level: what it takes to make it (Smithing for forged gear, Crafting for jewelry and staffs); boss-only drops by how deep they come from
const DROP_LVL={cinder_blade:50,star_helm:55,tide_robe:62,hollow_staff:68,moon_staff:72,void_robe:75};
const itemLvl=id=>{if(DROP_LVL[id])return DROP_LVL[id];if(JEWELS[id])return JEWELS[id].lvl;const r=RECIPES.forge.find(q=>q.out===id)||RECIPES.staff.find(q=>q.out===id);return r?r.lvl:1;};
// relic-forging gold: the step's base cost times (1 + item level / 10), so higher-level gear costs more to empower
const forgeGold=(id,step)=>Math.round(RELIC_FORGE[step].gold*(1+itemLvl(id)/10)/50)*50;
const forgeable=id=>{const it=ITEMS[id];if(!it)return false;if(it.jewel)return true;if(!it.gear||it.bound)return false;return !(it.tier==='rusty'||it.tier==='none');};
// ---------- skills 1–99 (classic curve: early levels fly by, late levels take a very long time) ----------
const SKILLS={farming:{n:'Farming',icon:'wheat',c:'#a7f070'},fishing:{n:'Fishing',icon:'raw_pondfin',c:'#41a6f6'},cooking:{n:'Cooking',icon:'pondfin',c:'#ef7d57'},smithing:{n:'Smithing',icon:'copper_blade',c:'#94b0c2'},woodcutting:{n:'Woodcutting',icon:'logs',c:'#a0663b'},mining:{n:'Mining',icon:'pickaxe',c:'#c9a26b'},crafting:{n:'Crafting',icon:'copper_ring',c:'#e86fd0'},magic:{n:'Magic',icon:'apprentice_staff',c:'#9b7bff'}};
// the skills combat level was built from before Mining (saves from then keep the level they had: see cbFloor)
const SKILLS_V096=['farming','fishing','cooking','smithing','woodcutting'],SKILLS_V010=SKILLS_V096.concat('mining'),SKILLS_V011=SKILLS_V010.concat('crafting');
// a save from before a skill existed keeps the combat level the formula of its day gave it: [the new skill, the skills before it]
const SKILL_ERAS=[['mining',SKILLS_V096],['crafting',SKILLS_V010],['magic',SKILLS_V011]];
const FIGHT_MAX=99;   // Fighting tops out at 99 like every other skill
const XP_TABLE=(()=>{const t=[0,0];let p=0;for(let l=1;l<99;l++){p+=Math.floor(l+300*Math.pow(2,l/7));t.push(Math.floor(p/4));}return t;})();
const levelFor=xp=>{let l=1;while(l<99&&xp>=XP_TABLE[l+1])l++;return l;};
// Combat level: built from everything you do. Fighting (XP from monsters) counts double, and every other skill adds its
// level: (2 × Fighting + all skill levels) ÷ (2 + number of skills). A new hero is combat level 1; combat level 10 takes
// a mix like Fighting 16 with your skills around 8, so the whitelist for the Founder's Lantern is earned.
// Magic is a fighting style too: whichever is higher, Fighting or Magic, counts double (Magic also counts once as a skill).
const combatFrom=(fight,skills,keys)=>{const ks=keys||Object.keys(SKILLS);fight=Math.min(FIGHT_MAX,fight);if(ks.includes('magic'))fight=Math.max(fight,levelFor((skills||{}).magic||0));return Math.max(1,Math.min(200,Math.floor((2*fight+ks.reduce((a,k)=>a+levelFor((skills||{})[k]||0),0))/(2+ks.length))));};
// ---------- fish: one species per map. Expansions add new waters and fish ----------
const FISH={pondfin:{n:'Pondfin',lvl:1,xp:10,item:'raw_pondfin'},gloomfin:{n:'Gloomfin',lvl:15,xp:30,item:'raw_gloomfin'},moonfin:{n:'Moonfin',lvl:30,xp:60,item:'raw_moonfin'}};
const WATERS={hold:{n:'Hold Lake',fish:['pondfin']},wild:{n:'Gloom Pond',fish:['gloomfin'],lvl:15},mere:{n:'the Moonmere',fish:['moonfin'],lvl:30}};
// ---------- trees: shared by everyone in the world. Each holds a stack of logs, falls when it runs out, then regrows ----------
// Expansions add new trees per area: the higher the level, the fewer logs and the longer the regrow. Logs feed a future skill.
// Keep logs/regrow in step with TREE_TYPES in realtime/src/index.js (the server keeps the shared count).
// regenDelay/regenEvery (s): a partly cut tree left alone for regenDelay grows back 1 log every regenEvery.
const TREES={oak:{n:'Oak Tree',lvl:1,xp:3,logs:300,regrow:20,regenDelay:15,regenEvery:2,item:'logs'},
  // the Wilderness: fewer logs, slower to regrow, much more xp
  blackwood:{n:'Blackwood Tree',lvl:15,xp:9,logs:60,regrow:45,regenDelay:20,regenEvery:6,item:'blackwood_logs'},
  willow:{n:'Willow Tree',lvl:30,xp:18,logs:80,regrow:60,regenDelay:20,regenEvery:5,item:'willow_logs'}};   // Hollowmere (v0.12.4)
// ---------- ore veins in the Depths: Mining level to mine, XP per vein, hits to break, seconds to grow back ----------
// respawn: seconds until a mined-out vein grows back (harder ores take longer)
const ORES={copper:{n:'Copper',lvl:1,xp:20,hp:3,respawn:15},iron:{n:'Iron',lvl:10,xp:35,hp:3,respawn:25},coal:{n:'Coal',lvl:20,xp:50,hp:4,respawn:40},
  ember:{n:'Emberite',lvl:25,xp:80,hp:4,respawn:60},cobalt:{n:'Cobalt',lvl:30,xp:100,hp:4,respawn:80},starshard:{n:'Starshard',lvl:40,xp:160,hp:5,respawn:150},
  gloam:{n:'Gloamite',lvl:50,xp:240,hp:5,respawn:200}};
const RECIPES={
  // the Forge also smelts ore into bars (Smithing), for jewelry
  smelt:[{out:'copper_bar',need:{copper_ore:2},lvl:1,xp:8},{out:'iron_bar',need:{iron_ore:2},lvl:10,xp:15},{out:'ember_bar',need:{ember_ore:2},lvl:25,xp:40},
    {out:'steel_bar',need:{iron_ore:1,coal_ore:2},lvl:30,xp:30},{out:'cobalt_bar',need:{cobalt_ore:2},lvl:35,xp:55},{out:'gloam_bar',need:{gloam_ore:2,coal_ore:1},lvl:50,xp:90}],
  forge:[
    {out:'copper_blade',need:{copper_ore:6},gold:20,lvl:1,xp:60},{out:'copper_helm',need:{copper_ore:4},gold:10,lvl:3,xp:45},{out:'copper_mail',need:{copper_ore:8,slime_gel:4},gold:20,lvl:6,xp:90},
    {out:'iron_blade',need:{iron_ore:6,copper_ore:2},gold:60,lvl:10,xp:150},{out:'iron_helm',need:{iron_ore:4,bone:3},gold:40,lvl:12,xp:120},{out:'iron_mail',need:{iron_ore:8,bone:6},gold:60,lvl:14,xp:220},
    {out:'ember_blade',need:{ember_ore:4,gem:2},gold:200,lvl:25,xp:400},{out:'ember_helm',need:{ember_ore:3,gem:1},gold:150,lvl:28,xp:320},{out:'ember_mail',need:{ember_ore:6,gem:2},gold:200,lvl:32,xp:550},
    {out:'steel_helm',need:{iron_ore:4,coal_ore:6},gold:300,lvl:35,xp:650},{out:'steel_blade',need:{iron_ore:6,coal_ore:8,cobalt_ore:2},gold:450,lvl:38,xp:850},{out:'steel_mail',need:{iron_ore:8,coal_ore:10,cobalt_ore:4},gold:500,lvl:42,xp:1100},
    {out:'gloam_helm',need:{gloam_bar:3,cobalt_ore:2},gold:700,lvl:52,xp:1500},{out:'gloam_blade',need:{gloam_bar:4,cobalt_bar:2},gold:900,lvl:55,xp:1900},{out:'gloam_mail',need:{gloam_bar:6,cobalt_bar:2,coal_ore:6},gold:1000,lvl:58,xp:2400}
  ],
  // time: seconds per item at the Kitchen. Fish take longer the better they are: 2 s + 0.05 s per Fishing level the fish needs.
  kitchen:[{out:'bread',need:{wheat:2},lvl:1,xp:6,time:1.5},{out:'pondfin',need:{raw_pondfin:1},lvl:1,xp:10,fish:'pondfin',burn:{chance:.45,safeAt:30,out:'burnt_fish'}},{out:'stew',need:{glowcap:1,wheat:1},lvl:5,xp:16,time:3},
    {out:'gloomfin',need:{raw_gloomfin:1},lvl:15,xp:30,fish:'gloomfin',burn:{chance:.5,safeAt:50,out:'burnt_fish'}},
    {out:'moonfin',need:{raw_moonfin:1},lvl:30,xp:60,fish:'moonfin',burn:{chance:.5,safeAt:65,out:'burnt_fish'}}],
  // the Greater Oil Flask refills the whole lantern: pressing it takes Farming 30 and a Moonpetal
  press:[{out:'oil',n:2,need:{lampseed:1}},{out:'oil2',need:{lampseed:2,moonpetal:1},lvl:30,sk:'farming',xp:25}],
  // staffs, carved at the Jeweler's Bench (Crafting)
  staff:[{out:'apprentice_staff',need:{logs:10},lvl:1,xp:20},{out:'blackwood_staff',need:{blackwood_logs:8,sapphire:1},lvl:15,xp:140},
    {out:'ember_staff',need:{blackwood_logs:10,ember_bar:2,ruby:2},lvl:30,xp:330},{out:'gloam_staff',need:{blackwood_logs:12,gloam_bar:3,diamond:1},lvl:50,xp:900}]
};
// growth in seconds (demo speed). Live: 30 min to 8 h.
const CROPS={
  wheat:{seed:'wheat_seed',grow:45,yield:[3,4],out:'wheat',n:'Wheat',lvl:1,plantXp:2,xp:4},
  lampseed:{seed:'lampseed',grow:70,yield:[2,3],out:'lampseed',n:'Lampseed',lvl:3,plantXp:5,xp:7},
  glowcap:{seed:'glowcap_spore',grow:100,yield:[2,3],out:'glowcap',n:'Glowcap',lvl:6,plantXp:8,xp:11},
  moonpetal:{seed:'moonpetal_seed',grow:150,yield:[1,2],out:'moonpetal',n:'Moonpetal',lvl:25,plantXp:14,xp:24}
};
// Farm plots: 12 squares (2 rows of 6). Everyone starts with 4; more open with Farming levels or for gold (each purchase costs more).
const PLOT_BASE=4,PLOT_MAX=12,PLOT_LVLS=[5,10,15,20,30,40,50,60],PLOT_BUYS=[750,1500,3000,5000,8000,12000,18000,25000];
const plotCap=(farmLvl,buys)=>Math.min(PLOT_MAX,PLOT_BASE+PLOT_LVLS.filter(l=>farmLvl>=l).length+buys);
// saves from before the 12-square farm had 6 two-square plots: keep their crops and give them 6 squares (2 bought)
function cleanPlots(o,now){const P0=Array.isArray(o.plots)?o.plots:[],legacy=o.plotBuys===undefined&&P0.length===6,ok=p=>p&&typeof p==='object'&&CROPS[p.crop];
  const v=p=>({crop:p.crop,t0:Math.min(now,Math.max(0,Number(p.t0)||now))});
  const plots=Array(PLOT_MAX).fill(null);if(legacy){let k=0;for(const p of P0)if(ok(p))plots[k++]=v(p);}else for(let i=0;i<PLOT_MAX;i++)if(ok(P0[i]))plots[i]=v(P0[i]);
  return {plots,plotBuys:legacy?2:Math.max(0,Math.min(PLOT_BUYS.length,Math.floor(Number(o.plotBuys)||0)))};}
RECIPES.jewel=Object.entries(JEWELS).map(([k,j])=>({out:k,need:j.need,lvl:j.lvl,xp:j.xp}));
const SHOP=[{id:'wheat_seed',price:5},{id:'lampseed',price:30},{id:'oil',price:45},{id:'bread',price:20},{id:'moonpetal_seed',price:90},
  {id:'gale_rune',price:5},{id:'stone_rune',price:8},{id:'tide_rune',price:14},{id:'ember_rune',price:18}];
// enemies: hp, damage, speed (px/s), xp, AI, drops [item, chance, min, max]. Runes come on top: see RUNE_DROPS.
const ENEMIES={
  slime:{hp:14,dmg:5,spd:24,xp:4,ai:'hop',art:'slime',drops:[['slime_gel',.6,1,2],['gold',.5,1,4]]},
  gelling:{hp:6,dmg:3,spd:34,xp:1,ai:'hop',art:'gelling',small:true,drops:[['slime_gel',.3,1,1]]},
  bat:{hp:9,dmg:4,spd:48,xp:3,ai:'flutter',art:'bat',drops:[['gold',.6,1,3]]},
  crawler:{hp:22,dmg:7,spd:28,xp:6,ai:'chase',art:'crawler',drops:[['lampseed',.18,1,1],['gold',.6,2,6],['glowcap_spore',.15,1,1]]},
  skeleton:{hp:32,dmg:9,spd:30,xp:9,ai:'lunge',art:'skeleton',drops:[['bone',.7,1,2],['gold',.6,3,8]]},
  wisp:{hp:18,dmg:8,spd:40,xp:8,ai:'float',art:'wisp',light:true,drops:[['gem',.06,1,1],['gold',.5,2,6],['lampseed',.12,1,1]]},
  spider:{hp:26,dmg:10,spd:52,xp:10,ai:'dash',art:'spider',drops:[['gold',.6,3,9],['bone',.3,1,1]]},
  shade:{hp:20,dmg:11,spd:56,xp:5,ai:'chase',art:'shade',drops:[]},
  mother:{hp:280,dmg:11,spd:30,xp:120,ai:'mother',art:'mother',boss:true,big:true,relic:'relic_crown',drops:[['gem',1,2,3],['gold',1,60,90],['lampseed',1,2,3],['sapphire',.25,1,1]]},
  knight:{hp:520,dmg:15,spd:34,xp:300,ai:'knight',art:'knight',boss:true,big:true,relic:'relic_sigil',drops:[['gem',1,3,4],['gold',1,150,220],['ember_ore',1,2,4],['ruby',.35,1,1],['emerald',.2,1,1]]},
  // Emberforge Halls (floors 11–15)
  imp:{hp:20,dmg:9,spd:50,xp:12,ai:'dash',art:'imp',drops:[['gold',.6,4,10],['coal_ore',.25,1,1]]},
  golem:{hp:48,dmg:12,spd:20,xp:18,ai:'chase',art:'golem',drops:[['coal_ore',.5,1,2],['gold',.6,5,12],['ember_ore',.06,1,1]]},
  cinderbat:{hp:12,dmg:7,spd:52,xp:7,ai:'flutter',art:'cinderbat',drops:[['gold',.6,2,6]]},
  // the Starfall Hollow (floors 16–20)
  wraith:{hp:30,dmg:12,spd:44,xp:16,ai:'float',art:'wraith',light:true,drops:[['gem',.08,1,1],['gold',.6,6,14]]},
  sentinel:{hp:52,dmg:14,spd:30,xp:22,ai:'lunge',art:'sentinel',drops:[['cobalt_ore',.3,1,2],['gold',.6,8,16],['bone',.3,1,2]]},
  shardling:{hp:26,dmg:12,spd:58,xp:15,ai:'dash',art:'shardling',drops:[['gold',.5,4,10],['starshard_ore',.02,1,1]]},
  // rare: [item, chance] rolled once per kill for everyone who hit it (better with loot luck)
  tyrant:{hp:700,dmg:16,spd:28,xp:700,ai:'tyrant',art:'tyrant',boss:true,big:true,relic:'relic_heart',drops:[['coal_ore',1,4,8],['ember_ore',1,3,5],['gold',1,300,450],['gem',1,3,5],['ruby',.5,1,2],['diamond',.2,1,1]],rare:[['cinder_blade',.015]]},
  warden:{hp:900,dmg:18,spd:32,xp:1100,ai:'warden',art:'warden',boss:true,big:true,relic:'relic_star',drops:[['cobalt_ore',1,4,8],['starshard_ore',1,1,3],['gold',1,500,750],['gem',1,4,6],['emerald',.5,1,2],['diamond',.35,1,1]],rare:[['star_helm',.015]]},
  // the Drowned Archive (floors 21–25)
  drowned:{hp:62,dmg:16,spd:30,xp:28,ai:'lunge',art:'drowned',drops:[['gold',.6,10,20],['bone',.3,1,2],['gloam_ore',.08,1,1]]},
  eel:{hp:38,dmg:14,spd:62,xp:22,ai:'dash',art:'eel',drops:[['gold',.6,8,16],['raw_moonfin',.12,1,1]]},
  tome:{hp:34,dmg:13,spd:46,xp:24,ai:'flutter',art:'tome',light:true,drops:[['gold',.6,8,18],['moonpetal_seed',.05,1,1]]},
  // the Hollow Throne (floors 26–30)
  husk:{hp:84,dmg:19,spd:26,xp:36,ai:'chase',art:'husk',drops:[['gold',.6,12,24],['gloam_ore',.12,1,2]]},
  voidling:{hp:44,dmg:17,spd:52,xp:30,ai:'float',art:'voidling',light:true,drops:[['gold',.6,10,20],['gem',.1,1,1]]},
  watcher:{hp:70,dmg:20,spd:34,xp:34,ai:'lunge',art:'watcher',drops:[['gold',.6,12,26],['diamond',.02,1,1]]},
  // boss attacks: a bolt that flies straight and bursts on whatever it touches, and a rift that tears open where you stood
  orb:{hp:1,dmg:18,spd:120,xp:0,ai:'orb',art:'orb',proj:true,light:true,drops:[]},
  rift:{hp:1,dmg:24,spd:0,xp:0,ai:'rift',art:'rift',proj:true,drops:[]},
  vorb:{hp:1,dmg:20,spd:110,xp:0,ai:'orb',art:'vorb',proj:true,light:true,drops:[]},
  // The Drowned Archmage: blinks, throws fans of tide bolts, freezes the floor around it, calls grimoires to its side
  archmage:{hp:1150,dmg:20,spd:30,xp:1600,ai:'archmage',art:'archmage',boss:true,big:true,relic:'relic_tome',drops:[['gloam_ore',1,4,8],['gold',1,700,1000],['gem',1,4,6],['sapphire',.6,1,2],['diamond',.4,1,1],['moonpetal_seed',.5,1,3]],rare:[['moon_staff',.012],['tide_robe',.03]]},
  // The Hollow King: slams, charges, opens rifts under you, and below half health throws rings of void bolts
  hollowking:{hp:1450,dmg:22,spd:32,xp:2300,ai:'hollowking',art:'hollowking',boss:true,big:true,relic:'relic_throne',drops:[['gloam_ore',1,6,10],['gold',1,900,1300],['gem',1,5,8],['emerald',.6,1,2],['diamond',.5,1,2]],rare:[['hollow_staff',.03],['void_robe',.012]]},
  // Hollowmere, west of the Hold: they wander near their dens and attack if you get too close (levels 3–20)
  wolf:{hp:26,dmg:7,spd:56,xp:7,ai:'dash',art:'wolf',drops:[['gold',.6,2,6],['bone',.3,1,1]]},
  boar:{hp:40,dmg:9,spd:40,xp:10,ai:'lunge',art:'boar',drops:[['gold',.6,3,8],['bread',.06,1,1]]},
  raven:{hp:14,dmg:4,spd:64,xp:4,ai:'float',art:'raven',drops:[['gold',.6,1,4],['bone',.15,1,1]]},   // v0.13: the Hollow Wood's edge
  gloomstag:{hp:44,dmg:11,spd:58,xp:15,ai:'dash',art:'gloomstag',drops:[['gold',.6,6,12],['gem',.06,1,1],['bone',.3,1,2]]},   // the fens
  mossgiant:{hp:120,dmg:15,spd:22,xp:34,ai:'chase',art:'mossgiant',big:true,drops:[['gold',.7,12,26],['emerald',.04,1,1],['glowcap_spore',.3,1,2],['moonpetal_seed',.06,1,1],['logs',.4,2,5]]},   // the Mossy Barrows
  bogling:{hp:48,dmg:12,spd:30,xp:14,ai:'hop',art:'bogling',drops:[['gold',.6,5,10],['moonpetal_seed',.04,1,1],['glowcap_spore',.15,1,1]]},
  mirewisp:{hp:42,dmg:13,spd:46,xp:16,ai:'float',art:'mirewisp',light:true,drops:[['gold',.6,6,12],['gem',.06,1,1]]},
  treant:{hp:90,dmg:16,spd:24,xp:24,ai:'chase',art:'treant',drops:[['gold',.6,8,16],['blackwood_logs',.4,1,3],['logs',.5,2,4]]}
};
// runes on top of every monster's drops, by area: [rune, chance, min, max]. Bosses drop a handful.
const RUNE_DROPS={moss:[['gale',.1,1,2]],crypt:[['stone',.1,1,2],['soul',.02,1,1]],ember:[['ember',.12,1,2],['soul',.03,1,1]],star:[['tide',.1,1,2],['soul',.04,1,1],['star',.004,1,1]],
  tide:[['tide',.14,1,3],['soul',.06,1,1],['star',.008,1,1]],void:[['soul',.1,1,2],['ember',.08,1,3],['star',.015,1,1]],mere:[['gale',.12,1,3],['stone',.08,1,2],['soul',.02,1,1]],
  boss:[['soul',1,2,5],['star',.5,1,2]]};
// Biome packs: floors, enemy mix, ore, boss. Season 1 adds the next pack.
const PACKS=[
// veins: [ore, weight, from floor] (the ore walls of each floor are rolled from these). ore: the pack's main ore (chests).
  {id:'moss',from:1,to:5,enemies:['slime','bat','crawler'],ore:'copper',veins:[['copper',1]],boss:'mother',bossName:'Mother Slime'},
  {id:'crypt',from:6,to:10,enemies:['skeleton','wisp','spider','bat'],ore:'iron',veins:[['iron',3],['ember',1,8]],boss:'knight',bossName:'The Ossuary Knight'},
  {id:'ember',from:11,to:15,enemies:['imp','golem','cinderbat','imp'],ore:'coal',veins:[['coal',5],['iron',3],['ember',1.6,12]],boss:'tyrant',bossName:'The Forge Tyrant'},
  {id:'star',from:16,to:20,enemies:['wraith','sentinel','shardling'],ore:'cobalt',veins:[['cobalt',6],['coal',3],['starshard',1,17]],boss:'warden',bossName:'The Starwarden'},
  // floors 21–30 have one new ore, Gloamite, and a new chest: the Uncommon Chest (glows green)
  {id:'tide',from:21,to:25,enemies:['drowned','eel','tome'],ore:'gloam',veins:[['gloam',5],['cobalt',2],['coal',2]],boss:'archmage',bossName:'The Drowned Archmage',uchest:true},
  {id:'void',from:26,to:30,enemies:['husk','voidling','watcher','voidling'],ore:'gloam',veins:[['gloam',7],['cobalt',1.5],['starshard',.6]],boss:'hollowking',bossName:'The Hollow King',uchest:true}
];
const packOf=f=>PACKS.find(p=>f>=p.from&&f<=p.to);
// the lift at the Gate: floor 1, then the first floor of each pack whose previous boss you've beaten
const LIFTS=PACKS.map(p=>p.from);
const liftBoss=f=>{const i=PACKS.findIndex(p=>p.from===f);return i>0?PACKS[i-1].boss:null;};
const NAMES_X=0;const NAMES=['@mira_dig','@oakhand','@lumen_lou','@pitkid','@runa_k','@tallowtom','@vexa','@gravelgus','@sora_lamps','@bram_b'];
