// ===== The Bulletin: build version + update history shown on the board in the Hold. =====
// EVERY update adds an entry at the TOP (newest first) and bumps BUILD. Never delete old entries: this is the game's history.
// scripts/build.mjs also writes CHANGELOG.md from this list.
const BUILD={version:'0.7.7',season:'Season 0 (Beta)',date:'2026-10-24'};
const CHANGELOG=[
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
