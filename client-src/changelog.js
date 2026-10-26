// ===== The Bulletin: build version + update history shown on the board in the Hold. =====
// EVERY update adds an entry at the TOP (newest first) and bumps BUILD. Never delete old entries: this is the game's history.
// scripts/build.mjs also writes CHANGELOG.md from this list.
const BUILD={version:'0.8.15',season:'Season 0 (Beta)',date:'2026-10-25'};
const CHANGELOG=[
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
