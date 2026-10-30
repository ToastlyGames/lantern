// ===== The Bulletin: build version + update history shown on the board in the Hold. =====
// EVERY update adds an entry at the TOP (newest first) and bumps BUILD. Never delete old entries: this is the game's history.
// scripts/build.mjs also writes CHANGELOG.md from this list.
// minClient: the oldest game version allowed into the shared world (worlds, parties, PvP). Raise it whenever the map or
// the realtime messages change, so a tab left open from before an update can't play by old rules. Keep MIN_CLIENT in
// realtime/src/index.js in step.
const BUILD={version:'0.13.8',season:'Season 0 (Beta)',date:'2026-10-30',minClient:'0.13.6'};
const CHANGELOG=[
  {v:'0.13.8',date:'2026-10-30',title:'Magic lock-on, the Wyrmbane Monument, a busier Coppergate',notes:[
    'Magic now locks on. Cast once at a monster and your staff keeps casting at it by itself, turning you to face it. When it falls, it locks onto the next monster close by. Violet corners mark the one you’re locked onto. Walk freely while it casts; it lets go when nothing is in reach or you put the staff away.',
    'The Reaper’s Scythe swing now always shows its wide soul-green arc, even with your phone’s Reduce Motion setting on (that setting used to hide it). Scythe hits now flash soul-green.',
    'Coppergate’s monument is unveiled: the Wyrmbane Monument, a bronze knight with a lantern raised high and a boot on a dragon’s skull. Read its plaque (look for the !) to hear about the second quest.',
    'Coming soon: Quest 2, The Wyrm of Cinderpeak. Climb Cinderpeak and slay Cindermaw, a massive dragon that breathes fire and stomps the ground. Reward: the Cindermaw Crown cosmetic. It’s listed under Hero → Quests.',
    'Builders are at work all over Coppergate: hammering on the scaffolding, carrying planks and stone, sawing timber in the lumber yard. They chat, too.',
    'The crane is rebuilt: taller, with a long jib over the Exchange’s roof that hoists stone and planks up and down. It no longer gets cut off.',
    'More detail in town: rounder, worn cobbles, bunting over the square and the market row, stone piles, scaffolding, tool racks.',
    'Fixed: tall buildings like the Exchange could vanish at the edge of the screen while still in view.',
    'If you logged out on a spot that’s now built on, you step out onto the nearest open ground when you come back.']},
  {v:'0.13.7',date:'2026-10-29',title:'Fix: monster gold keeps',notes:[
    'Fixed: gold from monsters in Hollowmere (and loot gold picked up in the Hold and the Wilderness) disappeared after the game saved. It now goes straight to your gold and stays.',
    'If your game still had some of that gold waiting, it’s added to your gold the next time you save.']},
  {v:'0.13.6',date:'2026-10-28',title:'Coppergate, a town under construction',notes:[
    'A new town: Coppergate, past the Mossy Barrows and the deepwood. Take the road south from Hollowmere’s southern road, between the barrows and the dead trees.',
    'It’s still being built: scaffolding, timber frames, a lumber yard, market stalls under tarps and a monument under wraps. No monsters inside the town, and there’s a Bank Chest by the gate.',
    'Meet Orrin Ledgerwright, master builder. He’s building the Lantern Exchange, the in-game market for Lanternhold cosmetic NFTs, opening in Season 1: browse, list, delist and snipe them on OpenSea without leaving the game.',
    'Coppergate is on the world map.']},
  {v:'0.13.5',date:'2026-10-28',title:'Return Flame in Hollowmere',notes:[
    'Fixed: the Return Flame now works in Hollowmere. Hold the flame button (or R) for 2 seconds to go home to the Hold. A monster’s hit restarts it.',
    'The Return Flame works everywhere except the Hold itself: the Depths, Hollowmere and the Wilderness (up to level 20).']},
  {v:'0.13.4',date:'2026-10-28',title:'Zoom the world map',notes:[
    'The world map zooms: pinch on a phone, scroll on a computer, or use the new + and − buttons. Double-tap a spot to zoom straight in on it.',
    'Drag to look around a zoomed map. It stays sharp at every zoom, and the labels stay easy to read.',
    'Tapping on the map no longer closes it. Tap outside it, or the ×, to close.']},
  {v:'0.13.3',date:'2026-10-28',title:'Skilling capes are extremely rare',notes:[
    'Capes earned from skilling are now Extremely Rare. The Angler’s Cape can still come up on any catch, but only about 1 in 35,000 (it was 1 in 300). Loot luck still helps a little.',
    'Every Angler’s Cape already caught keeps its stats, and is now marked Extremely Rare.']},
  {v:'0.13.2',date:'2026-10-28',title:'Fixes: health, phone buttons, scythes',notes:[
    'Fixed: walking between the Hold and Hollowmere no longer changes your health. You have your full health everywhere except the Wilderness, which still uses its own rules (and now tells you your max health there as you cross the wall).',
    'Phones held sideways: the Hero, Skills and Bag buttons now sit beside the quick slots instead of on top of the compass, globe and settings. On very small screens the buttons shrink a little so nothing ever covers anything else.',
    'The Reaper’s Scythe is easier to see in your hand: brighter steel, a stronger soul-glow, and the blade always hooks the right way whichever way you face.',
    'Mordecai’s scythe now sweeps out beside him instead of hiding behind his hood.']},
  {v:'0.13.1',date:'2026-10-28',title:'A pumpkin head and a reaper’s scythe',notes:[
    'All Hallows’ Lantern now rewards two cosmetics: the Jack-o’-Lantern, a carved pumpkin with a violet flame flickering through its grin, and the Reaper’s Scythe, Mordecai’s own soul-lit scythe.',
    'The Cosmetics tab now has a head slot and a weapon slot. The Scythe shows over your blade or staff and swings with a wide soul-green arc; your weapon’s stats stay the same.',
    'Already finished the quest? Your Reaper’s Shroud has become the Jack-o’-Lantern and the Scythe. If you were wearing the shroud, you’re now wearing both.',
    'The Founder’s Lantern: 2,222 in all. Reach combat level 10 for your mint. 1,000 of them are being given away on X.']},
  {v:'0.13.0',date:'2026-10-27',title:'All Hallows’ Eve in a bigger Hollowmere',notes:[
    'Hollowmere is more than four times bigger. Walk west out of the Hold and the Hold’s green grass and oaks run on into the Hollow Wood, where dusk falls slowly around you until you reach the moor. The Hold’s west tree line is gone.',
    'New regions: the fens east of the Moonmere, the deepwood’s dead trees, and the Mossy Barrows in the far south-west, where mossy giants walk (levels 22–28). New monsters: carrion ravens at the wood’s edge, gloomstags in the fens and the mossy giants.',
    'The Moonmere is bigger, and the Abyssal Maw now stands far off in the north-west. More willows to chop, more lamp posts on more roads.',
    'A Halloween quest: All Hallows’ Lantern. Find Mordecai the Reaper where the Hollow Wood ends. You will need Tallow, Wick, a few wolves and three lost souls.',
    'Quests: a new Quests tab on the Hero screen. A quest is red until it’s done, then green, and the steps you’ve finished are crossed out.',
    'Cosmetics: a new Cosmetics tab with a head slot and a body slot. Cosmetics always show over your armour and helmet, which stay equipped underneath. They are soulbound: never traded, dropped or lost. The first one is the Reaper’s Shroud, the reward for All Hallows’ Lantern.',
    'The hero looks sharper: softer outlines, more shading, arms that swing as you walk, and helmets that show your face.',
    'A new goal: complete All Hallows’ Lantern.']},
  {v:'0.12.4',date:'2026-10-27',title:'Willows and a bigger dock',notes:[
    'The willows of Hollowmere can be chopped: Woodcutting 30, 18 XP a log. Willow Logs sell well to Tallow. Like the oaks, every willow is shared with your world and grows back after it falls.',
    'The Moonmere dock is bigger: the walkway is two planks wide and the platform in the middle is 5 by 5, with room for a crowd to fish.',
    'In Hollowmere, when a monster comes for you, the action button fights instead of chopping or fishing.',
    'A new goal: cut a willow log.']},
  {v:'0.12.3',date:'2026-10-27',title:'How raids will work',notes:[
    'Raids arrive in Season 1, and every raid is a world event for the whole server.',
    'One raid opens every hour at the Abyssal Maw. Players from every world can join the same raid at the same time.',
    'A raid begins once at least 10 players are in the raid queue. The Maw in Hollowmere now explains it all.']},
  {v:'0.12.2',date:'2026-10-27',title:'Relic-forging by item level',notes:[
    'The gold a relic-forge step costs now depends on the item’s level: the higher the level, the more gold. A Copper Blade costs about 18,000 gold to take all the way to +5, a Steel Blade about 78,000, and the Voidwoven Robe about 139,000.',
    'An item’s level is what it takes to make it (Smithing for forged gear, Crafting for jewelry and staffs). Boss-only drops are levels 50 to 75. The Relic forge tab shows each piece’s level.']},
  {v:'0.12.1',date:'2026-10-27',title:'Relic-forging',notes:[
    'Boss relics are now rare: each boss drops its relic about once in every 25 kills (Loot Luck helps a little). Relics you already have are yours to keep.',
    'Relics now have a use. At the Forge, the new Relic forge tab spends them to forge power into the gear you wear, up to +5: blades +6% damage per level, staffs +5% spell damage, armor and helmets +1 defense (robes also +3% spell damage), rings and amulets +12% to their bonuses.',
    'Each step takes the next boss’s relic, plus gold and Smithing: +1 Slime Crown, +2 Knight’s Sigil, +3 Forge Heart, +4 Fallen Star, +5 Drowned Grimoire.',
    'The Hollow Crown crowns an enchantment instead: spend it on an enchanted ring or amulet and every bonus rises to the most that enchantment can roll.',
    'A forged piece keeps its power while you own it and counts everywhere except Wilderness fights. Sell, trade or lose every copy and the forging is gone.',
    'A new goal: relic-forge a piece of gear.',
    'You can mine ore while holding a staff: face a vein and your staff works as a pick.',
    'Fixed: beating the Drowned Archmage or the Hollow King with a staff could be undone a moment later. The kill, its XP and its drops now stick.',
    'Fixed: coming home from floors 21–30 with a big haul could be undone. What you carry now saves as you go.',
    'Fixed: in a party, boss bolts and rifts hit everyone as hard as they hit the leader, and Frost Shard slows monsters whoever casts it.',
    'Fixed: an enchantment could come back after its ring or amulet was lost in the Wilderness.',
    'Other heroes now see a staff swing in the Wilderness.']},
  {v:'0.12.0',date:'2026-10-27',title:'Magic, Hollowmere and ten more floors',notes:[
    'A new skill, Magic. Wield a staff and your attack becomes a spell, with your Magic level deciding which spells you can cast: Spark at 1, Ember Bolt at 8, Frost Shard (slows) at 16, Storm Lash (jumps between monsters) at 26, Flame Burst (explodes) at 36, Void Lance (pierces) at 48, Starfall at 62 and Cataclysm at 80. Pick your spell on the Hero screen.',
    'Spells start weak and hit harder as you level and move to new spells. Kills with a staff train Magic, never Fighting. Magic counts toward your combat level: the higher of Fighting and Magic counts double.',
    'Four staffs to carve at the Jeweler’s Bench (new Staffs tab): the Apprentice Staff (10 logs), Blackwood Staff, Emberwood Staff and Gloamwood Staff. Each adds to your spell damage.',
    'Enchanting: use Magic on the ring and amulet you wear. Five enchanting spells, from Lesser Enchant (Magic 3) to Mythic Enchant (Magic 70), each rolling its own kind of bonus. They use runes.',
    'The rune bag, a new part of your bag: Gale, Stone, Tide, Ember, Soul and Star Runes. Monsters and chests drop them, and Tallow sells the first four. Runes never take bank space and are never lost.',
    'Floors 21–30. The Drowned Archive (21–25): drowned scribes, tide eels and cursed grimoires, with the Drowned Archmage on floor 25. The Hollow Throne (26–30): husks, voidlings and watchers, with the Hollow King on floor 30. The lift reaches floors 21 and 26 once you beat the boss before them.',
    'The new bosses fight with a mix of attacks: the Archmage throws fans of bolts, freezes the floor and blinks away; the Hollow King slams, charges, tears rifts open under you and throws rings of void bolts.',
    'Their rarest drops: the Archmage can drop the Moonwell Staff (Mythic) or the Archmage’s Tiderobe (Legendary); the Hollow King can drop the Hollow Scepter (Legendary) or the Voidwoven Robe (Mythic). Robes add to spell damage.',
    'One new ore on floors 21–30: Gloamite (Mining 50). Smelt it into bars and forge Gloamite Helm, Blade and Mail (Smithing 52–58).',
    'The Uncommon Chest, on floors 21–30: it glows green and holds more, with a small chance of a Greater Oil Flask, which refills your whole lantern. You can also press Greater Oil Flasks yourself (Farming 30): 2 Lampseed and a Moonpetal, a new crop (Farming 25, seeds from Tallow and the deep floors).',
    'A new area west of the Hold: Hollowmere, about four times the size of the Hold. A misty moor around the Moonmere, a great lake with a dock out to the middle (Moonfin, Fishing 30). Monsters roam its meadows, marsh and deepwood (levels 3 to 20) and attack if you get too close. Falling there costs nothing.',
    'In Hollowmere’s far corner stands the Abyssal Maw, the gate to the raids coming in Season 1, with a Bank Chest beside it. The plaza around it is safe.',
    'A globe under the compass opens your world map. It’s see-through, so you can watch the game while you look.',
    'Other heroes in Hollowmere see your swings and spells, and you see theirs.',
    '15 new goals.']},
  {v:'0.11.1',date:'2026-10-27',title:'Ore that shines',notes:[
    'Coal and Cobalt are set back into the wall like every other ore, without the pale rock around them.',
    'They shine instead: Coal has bright silver edges and a soft glow, Cobalt glows blue, and Copper and Iron veins glow softly too. Every vein still twinkles now and then, so you can spot ore from across the room.']},
  {v:'0.11.0',date:'2026-10-27',title:'Crafting: rings and amulets',notes:[
    'A new skill, Crafting. Visit the new Jeweler’s Bench, between the road to the Delve Gate and the Forge, to set gems into bars and make rings and amulets.',
    'You can wear one ring and one amulet. Like capes, they carry bonuses: more health, damage, defence, loot luck, light, or longer-lasting oil. Their bonuses work everywhere except fights in the Wilderness.',
    '10 pieces to make, from the Copper Ring (Crafting 1) to the Starshard Amulet (Crafting 45).',
    'Smelt bars at the Forge: open the Forge and pick Smelt bars. Copper, Iron, Emberite, Steel and Cobalt bars. Smelting trains Smithing, and you can smelt everything at once.',
    'New gems in chests: Rubies and Sapphires on any floor, Emeralds from floor 6 and Diamonds from floor 11. The bosses drop them too. Cave Gems finally have a use: every Copper ring and amulet needs one.',
    'Coal and Cobalt veins are much easier to spot: they now sit in pale rock, and every ore vein twinkles now and then.',
    'Crafting counts toward your combat level, which is now (2 × Fighting + all your skill levels) ÷ 9. Nobody loses a level: you keep the combat level you had.',
    '5 new goals for Crafting and smelting.']},
  {v:'0.10.1',date:'2026-10-27',title:'Ore grows back',notes:[
    'Fixed: after a reconnect (locking your phone, a signal drop, a server update) some heroes deep in the Depths were sent back to an earlier floor, like floor 14 back to floor 7. You now stay on the floor you were on.',
    'Ore veins grow back after you mine them, so there is always something to swing at. The harder the ore, the longer it takes: Copper 15 seconds, Iron 25, Coal 40, Emberite 60, Cobalt 80 and Starshard 150.',
    'In a party, everyone sees a vein grow back at the same moment.']},
  {v:'0.10.0',date:'2026-10-27',title:'Ten new floors and Mining',notes:[
    'The Depths go to floor 20. Floors 11–15 are the Emberforge Halls: fire imps, magma golems and cinder bats, with the Forge Tyrant on floor 15. Floors 16–20 are the Starfall Hollow: wraiths, crystal sentinels and shardlings, with the Starwarden on floor 20.',
    'A new skill, Mining. Mine the ore in the walls to train it. Each ore needs a Mining level: Copper 1, Iron 10, Coal 20, Emberite 25, Cobalt 30, Starshard 40. Mining counts toward your combat level like every other skill.',
    'New ores: Coal, Cobalt and the rare Starshard (it sparkles; traders pay well for it).',
    'Steel gear at the Forge: Steel Helm (Smithing 35), Steel Blade (Smithing 38) and Steel Mail (Smithing 42), made from iron, coal and cobalt. The strongest gear you can forge.',
    'The two rarest finds in the Depths: Cinderfang, a blade that only the Forge Tyrant drops, and the Starwarden’s Helm, which only the Starwarden drops. Very, very rarely.',
    'New boss Relics: the Forge Heart and the Fallen Star.',
    'Watch the bosses: a ring of fire means the Tyrant’s hammer is about to land, and a cold ring means the Starwarden is about to burst. Step out of the ring.',
    'Beat the Ossuary Knight to open the lift to floor 11, and the Forge Tyrant to open it to floor 16.',
    'Fighting now tops out at 99, like every other skill.',
    'Combat level = (2 × Fighting + all your skill levels) ÷ 8 now that Mining counts. Nobody loses a level: you keep the combat level you had.',
    '8 new goals for Mining, Smithing and the new floors.']},
  {v:'0.9.6',date:'2026-10-27',title:'Combat level from everything you do',notes:[
    'Your combat level now comes from all your skills together. Monster XP trains a new skill, Fighting, which counts double, and Woodcutting, Fishing, Farming, Cooking and Smithing each add their level too.',
    'Combat level = (2 × Fighting + all your skill levels) ÷ 7. Combat level 10 takes something like Fighting 15 with your skills around 8, so it’s a real milestone.',
    'Already played? You keep the combat level you had, and your old combat progress became your Fighting level. Your combat level climbs again once your skills catch up.',
    'The Skills tab shows your combat level, how many points to the next one, and your Fighting level.']},
  {v:'0.9.5',date:'2026-10-27',title:'Party damage numbers',notes:[
    'In a party dungeon everyone sees everyone’s damage numbers, including the hit that finishes a monster off.',
    'Fixed a huge red health bar flashing across the screen when a party member hit a monster hard.']},
  {v:'0.9.4',date:'2026-10-27',title:'Everyone on the latest version',notes:[
    'If a new update comes out while you’re playing, the game asks you to reload, and reloads by itself. An old version can no longer join a world, so everyone always plays by the same rules.',
    'Fixed: a player on an old version could survive a Wilderness defeat, keep their items and even fish in the middle of the Wilderness.',
    'Fall in the Wilderness and the server itself now sends you home to the Hold. Your items drop where you fell, every time.']},
  {v:'0.9.3',date:'2026-10-27',title:'Wilderness fixes and the Return Flame',notes:[
    'Fall to another player in the Wilderness and you always wake up back in the Hold, healed.',
    'Wilderness loot is easier to grab: walk over it to pick it up (the winner straight away, everyone else after a minute). The Pick up button still works.',
    'The Return Flame now works in the Wilderness: hold it for 2 seconds to go home to the Hold, even mid-fight. Taking a hit interrupts it. It works up to Wilderness level 20; deeper areas later will block it.',
    'When a party member dies in the Depths or is defeated in the Wilderness, your Party chat says so.',
    'Fixed your hero running on the spot while the Wilderness warning was open.']},
  {v:'0.9.2',date:'2026-10-27',title:'Player names on',notes:[
    'Player names and combat levels now show over everyone’s heads by default. Turn them off any time in Settings → Player names.']},
  {v:'0.9.1',date:'2026-10-27',title:'Pick up where you left off',notes:[
    'Signing in puts you exactly where you logged out: the Hold, the Wilderness, wherever you were standing.',
    'Log out in the Depths and you come back at the entrance you went in by (the Delve Gate, for now).',
    'Chat has two tabs: World (everyone on your map) and Party (only your party, wherever they are). A badge shows new messages on the other tab. No more /p needed, though it still works.',
    'Players who close the game now disappear straight away, instead of standing still or jumping back to the spawn.',
    'Fixed a quick flash across the screen when other players joined, left or reconnected.',
    'The Wilderness: a skulled hero who falls loses only what they carry and wear. The Bank is never touched.']},
  {v:'0.9.0',date:'2026-10-27',title:'The Wilderness',notes:[
    'The first expansion: the Wilderness, north of the Hold. Walk through a gap in the old stone wall to cross. Other players can attack you there, and you can attack them.',
    'Wilderness levels run from 1 just past the wall to 20 at the Old Obelisk at the very top. You can fight heroes whose combat level is within the Wilderness level of yours. A red badge shows your level and who you can fight.',
    'Attack someone who hasn’t attacked you and you get a skull over your head for 20 minutes. Fall while skulled and you drop everything you carry and wear. Without a skull you keep your 3 most valuable items. Your Bank and gold are always safe.',
    'The winner gets a minute to pick up the loot before anyone else. Logging out mid-fight leaves your hero standing there for 15 seconds.',
    'New up north: the Gloom Pond with Gloomfin (Fishing 15, heals 55 cooked) and Blackwood trees (Woodcutting 15, 9 XP a log). Plus 8 new goals, including one secret.',
    'A small compass now sits left of the Settings button. North is the Wilderness.',
    'Party members in the Depths now all get the combat XP for every kill, even if they didn’t land a hit.',
    'Fixed: a hero could flicker at the spawn without a combat level, as if online when they weren’t.',
    'Fixed: when someone else got a bite while fishing, the “!” showed over your head instead of theirs.']},
  {v:'0.8.19',date:'2026-10-26',title:'Wider top bar',notes:[
    'The health card at the top is a little wider, so your level, gold and the world you’re in (like “The Hold · World 1”) all fit.']},
  {v:'0.8.18',date:'2026-10-26',title:'Gold on screen',notes:[
    'Your gold now shows next to your level at the top of the screen, in the Hold and in the Depths. Big amounts are shortened (12.4k, 1.25M); hover it on a computer for the exact number.',
    'Fixed the health card being cut off on the right on some screens.']},
  {v:'0.8.17',date:'2026-10-26',title:'Hover to see names',notes:[
    'On a computer, point your mouse at anything you can use and its name shows above it in green: the Kitchen, Oil Press, Forge, Bank, Bulletin Board, Delve Gate, Tallow’s Cart, the Farm, the Lake, the Dock and the oak trees.',
    'In the Depths it works for chests, ore, glowcaps and the stairs down.']},
  {v:'0.8.16',date:'2026-10-26',title:'Sharper heroes, new hair',notes:[
    'Heroes are crisper and more detailed: brows, cheeks and a mouth, shaded boots and trousers, a lit front on your tunic, cuffs, a shining belt buckle and highlights in your hair.',
    'Four new hair styles: pigtails, ponytail, bun and bob. The long, pigtail, ponytail, bun and bob styles have softer eyes with lashes.',
    'In the Depths your hero now always holds their blade in one hand and their lantern in the other. The blade moves with you as you walk, and swings when you attack.',
    'Other players in the Depths show their lantern and blade too.',
    'Change your look any time from the Hero screen (in the Hold).',
    'Signing in with a wallet is simpler: one connect the first time, then just one free signature.']},
  {v:'0.8.15',date:'2026-10-25',title:'See Wick for your spot',notes:[
    'Your Founder’s Lantern spot is now only checked with Wick, by the road up to the Delve Gate. The Bulletin no longer shows it.',
    'Updates about the Founder’s Lantern, including when the mint opens, are still posted here.']},
  {v:'0.8.14',date:'2026-10-25',title:'Founder’s whitelist: combat level 10',notes:[
    'The Founder’s Lantern whitelist is the first 1,000 heroes who reach combat level 10. If your hero number is 1,000 or lower, your spot is held; reach combat level 10 to lock it in.',
    'Wick shows your progress: your hero number and your combat level, with a bar to level 10.',
    'The mint is free, only in the game, and one per hero.']},
  {v:'0.8.13',date:'2026-10-25',title:'Sharper swings, better hoods',notes:[
    'Swinging your blade feels better: your hero steps into each swing, the blade leaves a smear in its own colour, and every hit flashes, throws sparks and lands with a short punch.',
    'Monsters squash when you hit them. Ember blades trail embers as they swing.',
    'Party members’ swings get the same effects.',
    'The Hood look now looks like a real hood: a pointed tip, a shadowed opening around your face and a drape over your shoulders.',
    'Wick has a new look: a long flowing robe, a deep pointed hood and a long white beard.']},
  {v:'0.8.12',date:'2026-10-25',title:'Meet Wick',notes:[
    'Wick, keeper of the Founders’ Ledger, now stands by the road up to the Delve Gate.',
    'Talk to him to check whether your hero is on the Founder’s Lantern whitelist. When the mint opens, he’s where you mint it.',
    'New heroes see a violet ! over Wick until they’ve paid him a visit.',
    'The Founder’s Lantern art is now the same for every token: the lantern itself, burning violet.']},
  {v:'0.8.11',date:'2026-10-25',title:'Founder’s Lantern',notes:[
    'Every hero now has a hero number, in the order heroes were made. See yours on the Hero screen.',
    'The Founder’s Lantern: a free NFT on Robinhood Chain for the first 1,000 heroes. If your hero number is 1,000 or lower, you’re on the whitelist. Your spot is saved, nothing to sign up for.',
    'Your token’s number is your hero number. Free to mint, you only pay a tiny gas fee. One per wallet.',
    'Holders get the Founder’s Flame: a violet light only Founders have, seen by every player. Purely cosmetic, and you can turn it off on the Hero screen.',
    'Check your spot on the Bulletin. The mint opening will be posted here.']},
  {v:'0.8.10',date:'2026-10-25',title:'Higher joystick sideways',notes:[
    'With your phone held sideways, the joystick now sits higher up, where your thumb rests naturally.']},
  {v:'0.8.9',date:'2026-10-25',title:'XP bars',notes:[
    'A thin XP strip along the bottom of your health bar shows progress in whatever you’re training, combat included, in that skill’s colour.',
    'Each time you gain XP, the goals pill briefly shows the skill, its level, a mini bar and how much XP is left to the next level. Tap it to open Skills.',
    'The Skills tab now shows Combat too, and every skill shows XP left, progress (like 65 / 83) and a percentage. The skill you’re training is marked.']},
  {v:'0.8.8',date:'2026-10-25',title:'Right-click to trade',notes:[
    'On a computer, right-click another player in the Hold and choose Trade.',
    'On phones, trades start from Social → Nearby → Trade.']},
  {v:'0.8.7',date:'2026-10-25',title:'Gifts',notes:[
    'You can give items or gold to another player for nothing in return: start a trade, add what you want to give, and both accept.',
    'The trade window clearly marks a gift, so nobody is surprised by getting nothing back.',
    'A trade with nothing on either side can’t be accepted.']},
  {v:'0.8.6',date:'2026-10-25',title:'Smoother on Android',notes:[
    'Fixed the joystick getting stuck on Android phones, including inside wallet-app browsers.',
    'Dragging the joystick no longer lets the browser grab the swipe (no address bar or pull-down popping in mid-move).',
    'On Android, the controls sit a little further from the screen edges, away from the back and home swipes.',
    'The joystick keeps pointing the right way if the screen resizes while you’re moving.']},
  {v:'0.8.5',date:'2026-10-25',title:'Joystick fix',notes:[
    'Fixed the joystick sometimes getting stuck on phones after sliding your thumb down off the bottom of the screen, which kept your hero walking.',
    'The joystick also lets go if you switch apps or the screen locks while you’re moving.']},
  {v:'0.8.4',date:'2026-10-25',title:'Trading',notes:[
    'Trade with other players in the Hold: Social → Nearby → Trade.',
    'Both of you build your offers in a trade window and see each other’s offer live. Both must accept, and any change resets both accepts.',
    'When both accept, the items and gold move for both of you at the same moment. Goal Relics and the admin party hats can’t be traded.',
    'In a party dungeon, items you drop from your bag show up for your party right away, and they can pick them up straight away.']},
  {v:'0.8.3',date:'2026-10-24',title:'Fighting side by side',notes:[
    'In a party dungeon you now see your partners swing their blades, the damage they deal and the ore they chip.',
    'When a partner opens a chest, it pops open with their name over it.',
    'Monster loot is now personal: everyone who hit a monster at least once gets their own roll at its drops, bosses included. Only you see and pick up your loot.',
    'Chests, ore and glowcaps still drop shared loot for the whole party.']},
  {v:'0.8.2',date:'2026-10-24',title:'The official contract address',notes:[
    'The Bulletin now has a permanent spot at the top for the official token contract address. Tap it to copy it.',
    'Until launch it says the address will be posted there, so you know any address from anywhere else isn\'t ours.',
    'The wiki shows the same address under Official token.',
    'The address always sits on one line. On phones it shows the first and last 4 characters, and tapping it still copies the whole address.']},
  {v:'0.8.1',date:'2026-10-24',title:'Tidy name tags',notes:[
    'Fixed name tags where the level badge could sit on top of a player\'s name (for example "Lant 34" instead of "Lantern 34") when several players were close together.']},
  {v:'0.8.0',date:'2026-10-24',title:'The Lanternhold Wiki',notes:[
    'The official Lanternhold Wiki is live at lanternhold.fun/wiki: every skill, place, monster, item and goal, with search.',
    'Open it any time from Settings → Open the wiki.',
    'The wiki\'s Updates page shows this same history and stays up to date with every build.']},
  {v:'0.7.9',date:'2026-10-24',title:'The farm, plot by plot',notes:[
    'Every square of soil is now its own plot: 12 in all, 2 rows of 6, with crops growing right in the middle of each square.',
    'New farmers start with 4 plots. More open for free at Farming 5, 10, 15, 20, 30, 40, 50 and 60, or buy one sooner with gold (750 gold for the first, each one after costs more).',
    'Farmers from before this update keep their crops and start with 6 plots.',
    'Locked plots show as rough ground with a little stake, and the Farm screen lays out the plots exactly like the field.',
    'New "Harvest & replant" button, and planting now fills every empty plot by default.']},
  {v:'0.7.8',date:'2026-10-24',title:'A bigger lake and a dock',notes:[
    'The lake in the Hold is bigger, with lily pads drifting on the water.',
    'A wooden dock runs out to a platform in the middle of the lake: walk out and fish off any side of it.',
    'Your line always lands in open water, never up against the shore.']},
  {v:'0.7.8',date:'2026-10-24',title:'A bigger lake and a dock',notes:[
    'The lake in the Hold is bigger, with lily pads drifting on the water.',
    'A wooden dock now runs out to a platform in the middle of the lake: walk out and fish off any side of it.']},
  {v:'0.7.7',date:'2026-10-24',title:'Into the arch',notes:[
    'Walking up into the Delve Gate\'s archway no longer hides your character behind the stone: you stay visible on the stairs.']},
  {v:'0.7.6',date:'2026-10-24',title:'Tidier crossroads',notes:[
    'The Bulletin moved forward to line up with the road, matching Tallow\'s cart across the crossroads.',
    'The Kitchen moved into the corner of the grass by the road, and the Oil Press now stands where the little path ends.']},
  {v:'0.7.5',date:'2026-10-24',title:'Trees grow back',notes:[
    'A tree that was only partly chopped now slowly grows its logs back when nobody is cutting it.',
    'Oaks start regrowing 15 seconds after the last swing and add a log every 2 seconds until they are full again.']},
  {v:'0.7.4',date:'2026-10-24',title:'Fresh chat every session',notes:[
    'Chat now starts fresh each time you sign in: you see what\'s said from the moment you log in until you log out.',
    'Messages aren\'t stored on the server any more.',
    'Your chat carries over when you switch worlds or head into the Depths, with a note showing where you went.']},
  {v:'0.7.3',date:'2026-10-24',title:'Quieter chat bubbles',notes:[
    'Chat over players\' heads is now small, sharp text with a barely-there background, sitting just above their name.',
    'Longer messages wrap onto up to 3 short lines instead of being cut off.']},
  {v:'0.7.2',date:'2026-10-24',title:'Upright phones',notes:[
    'Playing with your phone upright: the Return Flame now sits just above the joystick, so the chat button no longer covers it.',
    'The chat button moved to the left edge, below the top bar.']},
  {v:'0.7.1',date:'2026-10-24',title:'Tallow sets up shop',notes:[
    'Tallow moved his cart to the old well\'s spot, on the corner of the grass where the two roads cross.',
    'The well is gone, making room for his cart.']},
  {v:'0.7.0',date:'2026-10-24',title:'Tallow arrives, and the road east',notes:[
    'Meet Tallow, the Hold\'s first merchant. Buy supplies and sell your goods at his cart.',
    'The Market Board is now the Bulletin: the current build and every update we ship, newest first.',
    'Oak trees now hold 300 logs and grow back in 20 seconds, so several players can chop together.',
    'The east road now ends at a barricade and a sign. Something is coming in Season 1.']},
  {v:'0.6.0',date:'2026-10-24',title:'The Depths, rebuilt',notes:[
    'A new stone archway for the Delve Gate, with lantern posts and stairs into the dark.',
    'Dungeon floors are now flagstones and brick walls, with cobwebs, bones, banners, chains, puddles and glowing mushrooms.',
    'Smooth lantern and torch light, sparks from the torches and dust drifting through your light.']},
  {v:'0.5.1',date:'2026-10-24',title:'Name tags',notes:[
    'Combat levels next to names, in green, yellow or red depending on how they compare to yours.',
    'A gold crown marks admins.',
    'Player names are off by default: turn them on with Settings → Player names. Tags are now small, sharp text.']},
  {v:'0.5.0',date:'2026-10-24',title:'Life at the Hold',notes:[
    'Proper axe swings with arms, a step bob when walking, swaying trees, chimney smoke, butterflies and a glinting lake.',
    'Switch worlds from Social → Worlds.',
    'Cooking takes time now: Cook all works through a stack with a progress bar.',
    'A round favicon.']},
  {v:'0.4.1',date:'2026-10-24',title:'lanternhold.fun',notes:[
    'The game moved to lanternhold.fun.',
    'Wallet sign-in is now two approvals (connect, then one free signature), with stronger protection against copycat sites.']},
  {v:'0.4.0',date:'2026-10-23',title:'Woodcutting and goals',notes:[
    'New skill: Woodcutting. Trees in the Hold are shared by everyone in your world.',
    '48 goals in any order, including 9 secrets, and two Goal Relics you can only get from goals.',
    'Hero and Skills got their own buttons. Your gold now shows in your bag.']},
  {v:'0.3.0',date:'2026-10-23',title:'Sharing the world',notes:[
    'See other players\' fishing rods.',
    'Party loot in dungeons is visible to the whole party.',
    'Items dropped from your bag land on the ground for others to find after 30 seconds.']},
  {v:'0.2.0',date:'2026-10-23',title:'Admins and mobile fixes',notes:[
    'Admin party hats.',
    'No more long-press menus or pinch-zoom on game buttons on phones.',
    'A sturdier realtime server that stays up all day.']},
  {v:'0.1.1',date:'2026-10-22',title:'Staying connected',notes:[
    'Players stay connected and visible to each other through phone sleeps and network blips.',
    'The lantern favicon.']},
  {v:'0.1.0',date:'2026-10-21',title:'Season 0 begins',notes:[
    'Every player is real: sign in with a wallet or Google.',
    'One shared Hold per world, chat, friends, parties and shared party dungeons.']}
];
