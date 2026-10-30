// ===== Maps: the Hold (handmade) and the Depths (procedural) =====
const T=16,WALL=0,FLOOR=1,GRASS=2,PATH=3,WATER=4,SOIL=5,DOCK=6,WILDG=7,WPATH=8,GLOOM=9,
  MGRASS=10,DGRASS=11,MPATH=12,PLAZA=13,MOON=14,CANOPY=15,CLIFF=16,MOSS=17,WG1=18,WG2=19,WG3=20,WPATH2=21,   // Hollowmere (v0.12); moss, the wood's blends v0.13
  COBBLE=22,SITE=23;   // Coppergate (v0.13.6): cobbled streets and the building sites' packed earth
function newMap(w,h,kind,fill){return {w,h,kind,t:new Uint8Array(w*h).fill(fill),solid:new Uint8Array(w*h),objs:[],lights:[],seed:0};}
const tAt=(m,x,y)=>x<0||y<0||x>=m.w||y>=m.h?WALL:m.t[y*m.w+x];
const setT=(m,x,y,v)=>{if(x>=0&&y>=0&&x<m.w&&y<m.h)m.t[y*m.w+x]=v;};
const solidAt=(m,x,y)=>x<0||y<0||x>=m.w||y>=m.h||m.solid[y*m.w+x]===1;
const setSolid=(m,x,y,v)=>{if(x>=0&&y>=0&&x<m.w&&y<m.h)m.solid[y*m.w+x]=v;};
function addObj(m,o){m.objs.push(o);if(o.block)for(const [x,y] of o.block)setSolid(m,x,y,1);return o;}

// ---------- the Hold ----------
// The Hold sits at the bottom of the map. North of it, past the old wall, lies the Wilderness: the first expansion, where
// players can attack each other. WILD_ROWS rows were added on top, so every Hold coordinate below is shifted down by O rows.
// Keep WILD_ROWS in step with WILD_Y in realtime/src/index.js (2 rows per Wilderness level, levels 1–20).
const WILD_ROWS=40,WILD_Y=WILD_ROWS*T,WILD_MAX=20,RETURN_MAX=20;   // the Return Flame works up to this Wilderness level (deeper areas will block it)
const wildLvl=y=>y<WILD_Y?Math.min(WILD_MAX,Math.max(1,Math.ceil((WILD_Y-y)/(2*T)))):0;
const isWater=t=>t===WATER||t===GLOOM||t===MOON;
// ---------- Hollowmere: the land WEST of the Hold (v0.12; grown to 96x120 tiles in v0.13) ----------
// The Hold and the Wilderness keep their shape; the map grows WEST_COLS columns to the west (so every Hold and Wilderness
// x moves right by WEST_X) and Hollowmere runs south below the Hold. Keep WEST_X in step with realtime/src/index.js.
// Saved positions carry a version: v2 = the v0.12 map (WEST_X 704), v3 = this one. normalize() in game.js moves older ones.
const WEST_COLS=96,WEST_X=WEST_COLS*T,HM_ROWS=120,HM_Y0=WILD_ROWS,WEST_X_V2=704;   // Hollowmere: columns 0–95, rows 40–159
const WOOD_COLS=30,WOOD_X=WEST_X-WOOD_COLS*T;   // the Hollow Wood: the Hold's bright woods fading into the moor
const inHollowmere=(x,y)=>x<WEST_X&&y>=WILD_Y;
const HM_ENTRY={x:66*T+8,y:(HM_Y0+12)*T+10};   // the road by Mordecai, where the Hollow Wood ends
// Coppergate (v0.13.6): a new town south of the Mossy Barrows and the deepwood, still being built. The map grows TOWN_ROWS
// rows at the bottom (nothing above moves, so saved positions stay put).
const TOWN_ROWS=30,TOWN_Y0=HM_Y0+HM_ROWS,inTown=(x,y)=>y>=TOWN_Y0*T;
function buildHold(){const base=buildHoldBase(),DX=WEST_X,W=WEST_COLS+base.w,H=TOWN_Y0+TOWN_ROWS,m=newMap(W,H,'hold',CANOPY);
  m.solid.fill(1);
  for(let y=0;y<base.h;y++)for(let x=0;x<base.w;x++){m.t[y*W+x+WEST_COLS]=base.t[y*base.w+x];m.solid[y*W+x+WEST_COLS]=base.solid[y*base.w+x];}
  for(let y=0;y<HM_Y0;y++)for(let x=0;x<WEST_COLS;x++)m.t[y*W+x]=CLIFF;   // west of the Wilderness: sheer cliffs
  const sh=o=>{if(o.x!=null)o.x+=DX;if(o.act)o.act.x+=DX;if(o.block)o.block=o.block.map(([x,y])=>[x+WEST_COLS,y]);if(o.tile)o.tile=[o.tile[0]+WEST_COLS,o.tile[1]];return o;};
  m.objs=base.objs.map(sh);m.trees=base.trees;m.plots=base.plots.map(p=>Object.assign(p,{tx:p.tx+WEST_COLS,cx:p.cx+DX}));m.lilies=base.lilies.map(([x,y,f])=>[x+WEST_COLS,y,f]);
  m.spawn={x:base.spawn.x+DX,y:base.spawn.y};m.doors={gate:{x:base.doors.gate.x+DX,y:base.doors.gate.y}};
  // v0.13: the Hold's west tree line is gone (rows 1–22 of the Hold): the Hold's grass runs straight on into the Hollow Wood
  const gx=WEST_COLS,open=y=>y>=WILD_ROWS+1&&y<=WILD_ROWS+22;
  m.objs=m.objs.filter(o=>!(o.type==='tree'&&!o.chop&&o.block&&o.block.some(([x,y])=>x===gx&&open(y))));
  for(let y=WILD_ROWS+1;y<=WILD_ROWS+22;y++){setT(m,gx,y,y===WILD_ROWS+11||y===WILD_ROWS+12?PATH:GRASS);setSolid(m,gx,y,0);}
  buildHollowmere(m);buildTown(m);
  return m;}
// Hollowmere, from the Hold westward:
//  · the Hollow Wood: the Hold's green grass and oaks, darkening tile by tile into the moor (no monsters but ravens at its far edge)
//  · Mordecai the Reaper waits where the wood ends, by the Hollowmere sign (the Halloween quest)
//  · the meadows (wolves, boars: levels 3–8), the Moonmere (a great lake with a dock to a platform in the middle)
//  · the marsh in the west (boglings, mirewisps: 9–14), the fens east of the lake (gloomstags: 12–16)
//  · the deepwood in the south-east (treants: 15–20), the Mossy Barrows in the south-west (mossy giants: 22–28)
//  · the Abyssal Maw in the far north-west, the raid gate (Season 1), with a bank chest on its safe plaza
function buildHollowmere(m){const X0=0,Y0=HM_Y0,WC=WEST_COLS,HR=HM_ROWS,r=rng(912);
  const L=(x,y)=>[x+X0,y+Y0];
  const put=(lx,ly,t,solid)=>{const [x,y]=L(lx,ly);setT(m,x,y,t);setSolid(m,x,y,solid?1:0);};
  const at=(lx,ly)=>tAt(m,...L(lx,ly));
  // the woods' light: 1 at the Hold's edge, 0 where the moor begins (the wood only runs alongside the Hold, rows 0–26)
  const wood=(lx,ly)=>Math.max(0,Math.min(1,1-((WC-1-lx)+Math.max(0,ly-24)*1.6)/WOOD_COLS));
  // the ground, with a ragged edge of deep forest; the wood's grass is the Hold's, dithered into the moor's
  for(let ly=0;ly<HR;ly++)for(let lx=0;lx<WC;lx++){const edge=Math.min(lx,ly,HR-1-ly),wob=((lx*7+ly*13)%5===0)?1:0,b=wood(lx,ly);
    if(lx<WC-1&&edge<2+wob||lx>=WC-1&&ly>23){put(lx,ly,CANOPY,1);continue;}
    const v=b+(r()-.5)*.16;put(lx,ly,b<=0||v<.2?MGRASS:v>.84?GRASS:v>.64?WG1:v>.42?WG2:WG3,0);}   // the Hold's grass, three blends, then the moor's
  // darker grounds: the marsh (west), the fens (east of the lake), the deepwood (south-east); moss on the barrows (south-west)
  // soft noise: patches of darker ground rather than a checkerboard
  const nz=(x,y)=>(Math.sin(x*.37+y*.11)+Math.sin(x*.13-y*.41+1.7)+Math.sin((x+y)*.23+4.1)+Math.sin(x*.71-y*.29+2.3)*.5)/3.5*.5+.5;
  const zone=(x0,y0,x1,y1,t,k)=>{for(let ly=y0;ly<=y1;ly++)for(let lx=x0;lx<=x1;lx++)if(at(lx,ly)===MGRASS&&nz(lx,ly)+(r()-.5)*.12<k)put(lx,ly,t,0);};
  zone(3,36,26,86,DGRASS,.62);zone(58,40,76,62,DGRASS,.5);zone(56,66,93,116,DGRASS,.9);zone(3,88,48,116,MOSS,.92);zone(49,92,55,116,MOSS,.4);
  // roads (2 tiles wide): the old road from the Hold west to the crossroads and on to the Maw; south to the lake; west to the
  // marsh and down to the barrows; east and down into the deepwood; a long road along the south linking the barrows and the deepwood
  const road=(x0,y0,x1,y1,w)=>{w=w||2;const pave=(lx,ly)=>{if(lx<2||ly<2||ly>HR-3||lx>WC-1)return;const t=at(lx,ly);if(t===MOON||t===PLAZA||t===DOCK)return;{const b=wood(lx,ly);put(lx,ly,b>.62?PATH:b>.4?WPATH2:MPATH,0);}};
    if(y0===y1){for(let x=Math.min(x0,x1);x<=Math.max(x0,x1);x++)for(let k=0;k<w;k++)pave(x,y0+k);}else{for(let y=Math.min(y0,y1);y<=Math.max(y0,y1);y++)for(let k=0;k<w;k++)pave(x0+k,y);}};
  // the plaza of the Abyssal Maw (far north-west): dark flagstones, kept clear
  for(let ly=3;ly<=16;ly++)for(let lx=3;lx<=16;lx++)if(!(lx<4&&ly<4))put(lx,ly,PLAZA,0);
  // the Moonmere: a great lake in the middle of the moor
  const cx=40,cy=50,rx=15,ry=11;for(let ly=36;ly<=64;ly++)for(let lx=22;lx<=58;lx++){const d=((lx+.5-cx)/rx)**2+((ly+.5-cy)/ry)**2+(Math.sin(lx*1.7+ly)*.05);if(d<1)put(lx,ly,MOON,1);}
  // bog pools in the marsh
  for(const [px,py,pr] of [[8,46,2.4],[20,56,2.8],[6,67,2.2],[18,74,2.6],[10,82,2]])for(let ly=py-3;ly<=py+3;ly++)for(let lx=px-3;lx<=px+3;lx++)if(Math.hypot(lx-px,(ly-py)*1.2)<pr)put(lx,ly,MOON,1);
  road(17,11,WC-1,11);road(46,11,46,32);road(39,32,46,32);road(39,32,39,36);road(12,32,39,32);road(12,32,12,100);road(46,32,76,32);road(76,32,76,101);road(12,100,77,100);
  // the dock: from the north shore straight out to a 5x5 platform near the middle of the lake
  for(let ly=36;ly<=45;ly++)for(let lx=39;lx<=40;lx++)put(lx,ly,DOCK,0);for(let ly=46;ly<=50;ly++)for(let lx=38;lx<=42;lx++)put(lx,ly,DOCK,0);
  m.lilies.push(...[[28,44,1],[52,44,0],[30,57,0],[49,58,1],[55,50,0],[25,50,1],[34,40,0],[46,60,1],[44,54,0],[33,52,1]].map(([x,y,f])=>[x+X0,y+Y0,f,1]));
  // buildings and landmarks
  const obj=(type,lx,ly,extra)=>{const [x,y]=L(lx,ly);return addObj(m,Object.assign({type,x:x*T+8,y:y*T+14},extra||{}));};
  // the Abyssal Maw: 9 tiles wide and 8 tall; the skull and its cliff block the way, the jaw (the portal) faces the plaza
  {const [x,y]=L(9,10);const blk=[];for(let j=y-7;j<=y;j++)for(let i=x-4;i<=x+4;i++)blk.push([i,j]);for(const i of [x-4,x-3,x+3,x+4])blk.push([i,y+1]);
    addObj(m,{type:'maw',x:x*T+8,y:(y+1)*T+14,sortY:(y-1)*T,block:blk,act:{x:x*T+8,y:(y+2)*T+6,label:'Enter',id:'raid'},light:{r:60,c:'violet'}});}
  obj('bankchest',14,10,{block:[[...L(14,10)]],act:{x:L(14,10)[0]*T+8,y:L(14,11)[1]*T+4,label:'Bank',id:'bank'}});
  obj('campfire',12,14,{block:[[...L(12,14)]],light:{r:30,c:'warm'}});
  for(const [lx,ly,v] of [[4,4,0],[4,15,1],[15,4,1],[16,16,0]])obj('menhir',lx,ly,{v,block:[[...L(lx,ly)]]});
  // Mordecai the Reaper, where the wood ends and the moor begins (the Halloween quest), with candle-lit pumpkins and old graves
  obj('npc',66,9,{npc:'reaper',name:'Mordecai',block:[[...L(66,9)]],act:{x:L(66,10)[0]*T+8,y:L(66,10)[1]*T+8,label:'Talk',id:'reaper'},light:{r:26,c:'violet'}});
  for(const [lx,ly,v] of [[64,9,0],[68,9,1],[63,14,1],[69,14,0],[65,7,1]])obj('pumpkin',lx,ly,{v,block:[[...L(lx,ly)]],light:{r:14,c:'warm'}});
  for(const [lx,ly,v] of [[62,7,0],[70,7,2],[67,6,1]])obj('grave',lx,ly,{v,block:[[...L(lx,ly)]]});
  obj('hmsign',60,14,{block:[[...L(60,14)]],act:{x:L(60,14)[0]*T+8,y:L(60,15)[1]*T+4,label:'Read',id:'hmsign'}});
  // lamp posts along the roads
  for(const [lx,ly] of [[22,10],[34,10],[50,10],[58,10],[72,10],[48,20],[48,30],[36,30],[24,30],[14,42],[14,58],[14,74],[14,90],[48,34],[60,34],[78,44],[78,58],[78,74],[78,90],[24,102],[40,102],[56,102],[70,98]])
    if(at(lx,ly)!==MPATH&&at(lx,ly)!==PATH&&at(lx,ly)!==WPATH2)obj('lpost',lx,ly,{block:[[...L(lx,ly)]]});
  const free=(lx,ly)=>{const [x,y]=L(lx,ly);const t=tAt(m,x,y);return !solidAt(m,x,y)&&t!==MPATH&&t!==PATH&&t!==WPATH2&&t!==PLAZA&&t!==DOCK;};
  const clear=(lx,ly,rr)=>{for(let j=-rr;j<=rr;j++)for(let i=-rr;i<=rr;i++)if(!free(lx+i,ly+j))return false;return true;};
  // the Hollow Wood: the Hold's oaks, thick in the middle of the wood, thinning toward the Hold and giving way to willows
  for(let ly=2;ly<=40;ly++)for(let lx=WC-WOOD_COLS-2;lx<WC;lx++){const b=wood(lx,ly);if(b<=.04||!free(lx,ly)||Math.abs(ly-11.5)<3||Math.hypot(lx-66,ly-10)<6)continue;
    const dens=b>.85?.05:b>.25?.2:.1;if(r()>=dens||!clear(lx,ly,1))continue;
    if(b>.3)obj('tree',lx,ly,{spr:'tree',block:[[...L(lx,ly)]],wood:true});else obj('willow',lx,ly,{block:[[...L(lx,ly)]]});}
  // the deepwood: dead trees among the willows
  for(let i=0;i<70;i++){const lx=56+(r()*38|0),ly=66+(r()*50|0);if(clear(lx,ly,1)&&at(lx,ly)===DGRASS)obj('deadtree',lx,ly,{v:i%2,block:[[...L(lx,ly)]]});}
  // the Mossy Barrows: grassy burial mounds and moss-grown standing stones
  for(const [lx,ly,v] of [[8,94,0],[30,92,1],[18,100,0],[42,98,1],[8,108,1],[28,110,0],[44,112,0],[34,104,1]])if(clear(lx,ly,1)&&clear(lx+1,ly,1))obj('barrow',lx,ly,{v,block:[[...L(lx,ly)],[...L(lx+1,ly)]]});
  for(const [lx,ly,v] of [[5,90,0],[22,96,1],[38,90,0],[14,114,1],[46,106,0],[24,116,1]])if(free(lx,ly))obj('menhir',lx,ly,{v,block:[[...L(lx,ly)]],moss:true});
  // willows across the moor: every one can be chopped (Woodcutting 30). Their indexes come after the Hold's oaks and the
  // Wilderness blackwoods (the realtime server keys trees by index: only ever add to the end).
  const wl=[];for(let i=0;i<900&&wl.length<44;i++){const lx=4+(r()*(WC-WOOD_COLS-4)|0),ly=4+(r()*(HR-8)|0);if(!clear(lx,ly,1))continue;if(lx<20&&ly<20)continue;wl.push([lx,ly]);
    const o=obj('willow',lx,ly,{block:[[...L(lx,ly)]]});o.kind='willow';o.chop=true;o.ti=m.trees.length;o.logs=TREES.willow.logs;o.until=0;m.trees.push(o);}
  // reeds and moon crystals by the water, fairy rings in the grass, flowers (the Hold's in the wood, pale ones on the moor)
  for(let ly=2;ly<HR-2;ly++)for(let lx=2;lx<WC-WOOD_COLS;lx++){const [x,y]=L(lx,ly);if(!free(lx,ly))continue;const nearW=[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>tAt(m,x+a,y+b)===MOON);
    if(nearW&&r()<.28)m.objs.push({type:'reeds',x:x*T+8,y:y*T+15,flat:true,v:r()*2|0});else if(nearW&&r()<.05)obj('mcrystal',lx,ly,{v:r()*2|0,block:[[x,y]],light:{r:18,c:'violet'}});}
  for(let i=0;i<40;i++){const lx=3+(r()*(WC-6)|0),ly=3+(r()*(HR-6)|0);if(free(lx,ly)){const [x,y]=L(lx,ly);m.objs.push({type:'mushring',x:x*T+8,y:y*T+15,flat:true});}}
  for(let i=0;i<160;i++){const lx=2+(r()*(WC-3)|0),ly=2+(r()*(HR-4)|0);if(free(lx,ly)){const [x,y]=L(lx,ly),b=wood(lx,ly);m.objs.push({type:'flowers',x:x*T+8,y:y*T+15,spr:'flowers',v:(r()*4|0),flat:true,hm:b<.5});}}
  // monster dens: [type, local x, local y, level]. Each den holds one monster that respawns after a while.
  m.dens=[['raven',62,20,2],['raven',66,28,3],['raven',58,4,3],['raven',64,36,4],
    ['wolf',52,4,3],['wolf',56,17,4],['boar',44,5,4],['boar',36,17,5],['wolf',52,25,5],['boar',30,6,6],['wolf',34,26,7],['boar',25,19,8],
    ['bogling',6,40,9],['mirewisp',4,55,10],['bogling',16,48,10],['bogling',22,63,11],['mirewisp',24,44,12],['bogling',7,73,12],['bogling',19,81,13],['mirewisp',15,66,14],
    ['gloomstag',62,45,12],['gloomstag',70,52,14],['gloomstag',64,59,15],['gloomstag',72,41,16],
    ['treant',60,70,15],['treant',70,77,16],['treant',85,72,17],['treant',64,88,18],['treant',82,86,19],['treant',88,104,20],['treant',68,108,20],['treant',86,113,19],
    ['mossgiant',10,97,22],['mossgiant',24,106,24],['mossgiant',37,95,25],['mossgiant',19,113,26],['mossgiant',41,109,28]]
    .map(([type,lx,ly,lvl],i)=>{const [x,y]=L(lx,ly);return {i,type,x:x*T+8,y:y*T+12,lvl};});
  m.hm={x0:X0,y0:Y0,w:WC,h:HR,entry:{x:L(66,12)[0]*T+8,y:L(66,12)[1]*T+10}};}
// ---------- Coppergate: the town past the Mossy Barrows and the deepwood (still under construction) ----------
// A road runs south from the long southern road of Hollowmere, through the forest, into the town. Orrin Ledgerwright is
// building the Lantern Exchange on the north side of the square: the in-game market for cosmetic NFTs (Season 1).
// Everything here is placed in map tiles (x across the whole map, y from the top). No monsters: the town is safe.
function buildTown(m){const Y0=TOWN_Y0,r=rng(4417);
  const put=(x,y,t,solid)=>{setT(m,x,y,t);setSolid(m,x,y,solid?1:0);};
  const obj=(type,x,y,extra)=>addObj(m,Object.assign({type,x:x*T+8,y:y*T+14},extra||{}));
  const blk=(x0,y0,x1,y1)=>{const b=[];for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)b.push([x,y]);return b;};
  // the road south from Hollowmere (local x 50-51 from its southern road down through the forest)
  const RX=50;for(let y=HM_Y0+100;y<Y0+4;y++)for(const x of [RX,RX+1]){const t=tAt(m,x,y);if(t===MOON)continue;put(x,y,y>=Y0?COBBLE:MPATH,0);}
  // anything (not a choppable willow) sitting on that road is moved off it
  const onRoad=(x,y)=>(x===RX||x===RX+1)&&y>=HM_Y0+100&&y<Y0+4,blocks=o=>o.block&&o.block.some(([x,y])=>onRoad(x,y));
  for(const o of m.objs)if(!o.chop&&blocks(o))for(const [x,y] of o.block)setSolid(m,x,y,0);
  m.objs=m.objs.filter(o=>o.chop||!(blocks(o)||(o.flat&&onRoad(Math.floor(o.x/T),Math.floor(o.y/T)))));
  for(const d of m.dens||[])if(Math.abs(d.x/T-RX)<3&&d.y/T>=HM_Y0+100)d.x-=4*T;   // no monster den right on the road
  // the ground: the Hold's bright grass, a deep-forest edge all round
  const X0=20,X1=78,Y1=Y0+TOWN_ROWS-1;
  for(let y=Y0;y<=Y1;y++)for(let x=X0;x<=X1;x++){const edge=Math.min(x-X0,X1-x,y-Y0,Y1-y),wob=((x*5+y*11)%4===0)?1:0;if(edge<2+wob&&!(x>=RX&&x<=RX+1&&y<Y0+4))continue;put(x,y,GRASS,0);}
  // the square, the high street, and the building sites' packed earth
  for(let y=Y0+12;y<=Y0+20;y++)for(let x=39;x<=65;x++)if(!((x<41||x>63)&&(y<Y0+13||y>Y0+19)))put(x,y,COBBLE,0);
  for(const [x0,y0] of [[42,Y0+18],[60,Y0+18]])for(let y=y0;y<=y0+1;y++)for(let x=x0;x<=x0+2;x++)put(x,y,GRASS,0);   // two flower beds
  for(let y=Y0;y<Y0+12;y++)for(const x of [RX,RX+1])put(x,y,COBBLE,0);
  for(let y=Y0+3;y<=Y0+11;y++)for(let x=54;x<=68;x++)if(tAt(m,x,y)===GRASS)put(x,y,SITE,0);    // the Exchange's yard
  for(let y=Y0+14;y<=Y0+25;y++)for(let x=24;x<=36;x++)if(tAt(m,x,y)===GRASS)put(x,y,SITE,0);   // the lumber yard
  for(let y=Y0+4;y<=Y0+10;y++)for(let x=36;x<=47;x++)if(tAt(m,x,y)===GRASS)put(x,y,SITE,0);    // two houses going up
  for(let y=Y0+21;y<=Y0+23;y++)for(let x=40;x<=64;x++)put(x,y,COBBLE,0);                      // the market row (tarped stalls)
  // the Lantern Exchange: 11 tiles wide, 8 tall, scaffolding all over; its door faces the square
  const EX=61,EY=Y0+11;obj('exchange',EX,EY,{sortY:(EY-1)*T,block:blk(EX-5,EY-6,EX+5,EY),act:{x:EX*T+8,y:(EY+1)*T+8,label:'Look',id:'exchange'}});
  obj('npc',57,Y0+13,{npc:'orrin',name:'Orrin',block:[[57,Y0+13]],act:{x:57*T+8,y:(Y0+14)*T+8,label:'Talk',id:'orrin'},light:{r:20,c:'warm'}});
  obj('plans',55,Y0+13,{block:[[55,Y0+13]]});
  obj('notice',47,Y0+13,{block:[[47,Y0+13]],act:{x:47*T+8,y:(Y0+14)*T+6,label:'Read',id:'exchange'}});
  // the crane: its base stands beside the Exchange, its jib (a separate object, drawn after the Exchange) reaches over the roof
  obj('crane',68,Y0+8,{block:[[68,Y0+8],[69,Y0+8],[70,Y0+8]]});obj('cranetop',68,Y0+8,{sortY:(EY+1)*T+15});
  for(const [x,y] of [[55,Y0+11],[67,Y0+11],[54,Y0+6],[71,Y0+5]])obj('sawhorse',x,y,{block:[[x,y]]});
  obj('stones',53,Y0+9,{block:[[52,Y0+9],[53,Y0+9]]});obj('stones',67,Y0+6,{block:[[66,Y0+6],[67,Y0+6]]});
  for(const [x,y,v] of [[56,Y0+4,0],[66,Y0+3,1],[54,Y0+9,2]])obj('crate',x,y,{v,block:[[x,y]]});
  // two houses going up, timber frames on stone footings
  obj('frame',39,Y0+9,{v:0,block:blk(38,Y0+8,40,Y0+9)});obj('frame',45,Y0+9,{v:1,block:blk(44,Y0+8,46,Y0+9)});
  obj('scaffold',47,Y0+9,{block:[[47,Y0+9]]});obj('toolrack',42,Y0+5,{block:[[41,Y0+5],[42,Y0+5]]});obj('stones',36,Y0+7,{block:[[35,Y0+7],[36,Y0+7]]});
  // the lumber yard: log piles, plank stacks, crates, a sawpit, and the workers' fire
  for(const [x,y,v] of [[26,Y0+16,0],[30,Y0+16,1],[26,Y0+20,1],[33,Y0+19,0]])obj('lumber',x,y,{v,block:[[x,y],[x+1,y]]});
  for(const [x,y,v] of [[35,Y0+15,0],[35,Y0+16,1],[29,Y0+23,2],[25,Y0+24,0]])obj('crate',x,y,{v,block:[[x,y]]});
  obj('sawhorse',29,Y0+18,{block:[[29,Y0+18]]});obj('toolrack',33,Y0+14,{block:[[32,Y0+14],[33,Y0+14]]});
  obj('campfire',30,Y0+21,{block:[[30,Y0+21]],light:{r:30,c:'warm'}});
  // the market row: stalls under tarps, waiting for Season 1
  for(const x of [43,48,53,58,63])obj('tarpstall',x,Y0+22,{block:[[x-1,Y0+22],[x,Y0+22],[x+1,Y0+22]]});
  // the town sign at the gate, lamp posts, a bank chest, a well
  obj('tsign',RX-2,Y0+3,{block:[[RX-2,Y0+3]],act:{x:(RX-2)*T+8,y:(Y0+4)*T+4,label:'Read',id:'tsign'}});
  obj('bankchest',RX+3,Y0+5,{block:[[RX+3,Y0+5]],act:{x:(RX+3)*T+8,y:(Y0+6)*T+4,label:'Bank',id:'bank'}});
  for(const [x,y] of [[RX-1,Y0+7],[RX+2,Y0+10],[37,Y0+12],[67,Y0+19],[37,Y0+20],[46,Y0+19]])obj('lpost',x,y,{block:[[x,y]]});
  obj('well',44,Y0+15,{block:[[43,Y0+15],[44,Y0+15]]});
  // the Wyrmbane Monument, unveiled in the middle of the square (v0.13.8): read its plaque to hear of the second quest
  obj('monument',52,Y0+17,{block:blk(50,Y0+16,53,Y0+17),act:{x:52*T,y:(Y0+18)*T+8,label:'Read',id:'monument'},light:{r:26,c:'warm'}});
  // bunting strung across the square and over the market row
  for(const [x0,y0,x1,y1] of [[41,Y0+13,51,Y0+13],[39,Y0+21,65,Y0+21]]){obj('bpole',x0,y0,{block:[[x0,y0]]});obj('bpole',x1,y1,{block:[[x1,y1]]});
    m.objs.push({type:'bunting',x:(x0+x1)/2*T+8,y:Math.max(y0,y1)*T+15,sortY:(Math.max(y0,y1)+3)*T,x0:x0*T+8,y0:y0*T+14,x1:x1*T+8,y1:y1*T+14});}
  for(const [x,y] of [[42,Y0+18],[44,Y0+19],[60,Y0+19],[62,Y0+18],[43,Y0+19],[61,Y0+18]])m.objs.push({type:'flowers',x:x*T+8,y:y*T+15,spr:'flowers',v:(x+y)%4,flat:true});
  // trees and flowers on the open grass
  const free=(x,y)=>tAt(m,x,y)===GRASS&&!solidAt(m,x,y)&&!m.objs.some(o=>o.block&&o.block.some(([a,b])=>Math.abs(a-x)<2&&Math.abs(b-y)<2));
  for(let i=0;i<300;i++){const x=X0+3+(r()*(X1-X0-6)|0),y=Y0+3+(r()*(TOWN_ROWS-6)|0);if(!free(x,y)||(y>Y0+10&&y<Y0+25&&x>37&&x<67))continue;if(r()<.35)obj('tree',x,y,{spr:'tree',block:[[x,y]]});else m.objs.push({type:'flowers',x:x*T+8,y:y*T+15,spr:'flowers',v:(r()*4|0),flat:true});}
  // the builders at work (drawn by the game, they don't block anyone). Carriers walk their path back and forth.
  const ex=61*T+8,ey=EY*T+14,P_=(x,y)=>[x*T+8,y*T+12];
  m.workers=[
    {k:'hammer',name:'Bram',x:39*T+8,y:(Y0+10)*T+10,dir:'up',look:{skin:2,hair:0,cloth:5,style:0}},
    {k:'hammer',name:'Hilde',x:47*T+8,y:(Y0+9)*T-18,dir:'left',lift:true,sortY:(Y0+9)*T+16,look:{skin:0,hair:3,cloth:1,style:5}},
    {k:'plank',name:'Tobin',path:[P_(34,Y0+18),P_(38,Y0+18),P_(38,Y0+11),P_(41,Y0+11)],look:{skin:3,hair:2,cloth:2,style:2}},
    {k:'saw',name:'Greta',x:29*T+8,y:(Y0+19)*T+8,dir:'up',look:{skin:1,hair:9,cloth:3,style:6}},
    {k:'stone',name:'Osric',path:[P_(53,Y0+10),P_(53,Y0+12),P_(58,Y0+12)],look:{skin:4,hair:0,cloth:6,style:0}},
    {k:'hammer',name:'Pell',x:ex+52,y:ey-70,dir:'down',lift:true,sortY:ey+3,look:{skin:1,hair:1,cloth:8,style:7}},
    {k:'hammer',name:'Marta',x:ex-58,y:ey-40,dir:'up',lift:true,sortY:ey+3,look:{skin:5,hair:0,cloth:4,style:1}},
    {k:'crate',name:'Jory',path:[P_(44,Y0+20),P_(62,Y0+20)],look:{skin:2,hair:5,cloth:0,style:2}}];
  m.town={x0:X0,x1:X1,y0:Y0,y1:Y1,gate:{x:RX*T+16,y:(Y0+2)*T}};}
function buildHoldBase(){
  const O=WILD_ROWS,W=26,HH=24,H=HH+O,m=newMap(W,H,'hold',GRASS);
  for(let x=0;x<W;x++)for(let y=0;y<H;y++)if(x<1||y<1||x>=W-1||y>=H-1)setSolid(m,x,y,1);
  for(let y=5;y<HH-1;y++){setT(m,12,y+O,PATH);setT(m,13,y+O,PATH);}
  for(let x=1;x<W;x++){setT(m,x,11+O,PATH);setT(m,x,12+O,PATH);}
  for(let x=14;x<17;x++)setT(m,x,13+O,PATH);
  // the lake, with a wooden dock running out to a platform in the middle (stand on it and fish off any side)
  const lake=[[18,22],[17,23],[16,23],[16,23],[16,23],[17,22]];   // rows 17–22: [from x, to x]
  lake.forEach(([a,b],j)=>{for(let x=a;x<=b;x++){setT(m,x,17+j+O,WATER);setSolid(m,x,17+j+O,1);}});
  for(let y=17;y<=18;y++){setT(m,19,y+O,DOCK);setSolid(m,19,y+O,0);}
  for(let x=18;x<=20;x++){setT(m,x,19+O,DOCK);setSolid(m,x,19+O,0);}   // platform in the middle: open water on every side
  m.lilies=[[17,18,0],[22,18,1],[16,21,1],[21,22,0],[23,20,0]].map(([x,y,f])=>[x,y+O,f]);
  // border + inner trees
  const tree=(tx,ty)=>addObj(m,{type:'tree',x:tx*T+8,y:ty*T+15,spr:'tree',block:[[tx,ty]]});
  // the east road ends at an opening in the trees (rows 11–12), closed with a barricade until Season 1's new area
  for(let x=0;x<W;x+=2)tree(x+1,H-1);for(let y=1;y<HH;y+=2){tree(0,y+O);if(y!==11&&y!==13)tree(W-1,y+O);}
  // the inner trees can be cut (Woodcutting); border trees are the edge of the world
  m.trees=[];const cuttable=(x,y,kind)=>{tree(x,y);const o=m.objs[m.objs.length-1];o.kind=kind;o.chop=true;o.ti=m.trees.length;o.logs=TREES[kind].logs;o.until=0;m.trees.push(o);return o;};
  [[3,9],[22,8],[15,21],[9,21],[23,13],[2,21],[16,2],[8,2],[21,3]].forEach(([x,y])=>cuttable(x,y+O,'oak'));   // the order is the realtime server's tree index: only ever add to the end
  // buildings
  addObj(m,{type:'gate',x:13*T,y:(5+O)*T,sortY:(3+O)*T,spr:'gate',block:[[11,3+O],[12,3+O],[13,3+O],[14,3+O],[11,4+O],[14,4+O]],act:{x:13*T,y:(5+O)*T+6,label:'Delve',id:'gate'},light:{r:34,c:'warm'}});
  addObj(m,{type:'bank',x:5*T,y:(8+O)*T,spr:'bank',block:[[3,6+O],[4,6+O],[5,6+O],[6,6+O],[3,7+O],[4,7+O],[6,7+O]],act:{x:5*T,y:(8+O)*T+4,label:'Bank',id:'bank'}});
  addObj(m,{type:'forge',x:19*T,y:(8+O)*T,spr:'forge',anim:true,block:[[17,6+O],[18,6+O],[19,6+O],[20,6+O],[17,7+O],[18,7+O],[19,7+O],[20,7+O]],act:{x:18*T+2,y:(8+O)*T+6,label:'Forge',id:'forge'},light:{r:30,c:'warm',dx:-6,dy:-10}});
  // the Jeweler's Bench (Crafting): on the grass between the road up to the Gate and the Forge
  addObj(m,{type:'bench',x:15*T+8,y:(8+O)*T+2,spr:'bench',block:[[15,7+O],[16,7+O]],act:{x:15*T+8,y:(8+O)*T+10,label:'Craft',id:'bench'},light:{r:16,c:'warm',dx:4,dy:-14}});
  // the bulletin board (latest updates + build version), at the corner of the grass by the crossroads
  addObj(m,{type:'board',x:15*T,y:(10+O)*T+14,spr:'board',block:[[14,10+O],[15,10+O]],act:{x:15*T,y:(11+O)*T+6,label:'Bulletin',id:'bulletin'}});
  // the east road: a sign and a barricaded opening in the trees
  addObj(m,{type:'sign',x:23*T+8,y:(10+O)*T+12,spr:'sign',block:[[23,10+O]],act:{x:23*T+8,y:(11+O)*T+4,label:'Read',id:'eastsign'}});
  addObj(m,{type:'barricade',x:W*T-8,y:(12+O)*T+15,spr:'barricade',block:[[W-1,10+O],[W-1,11+O],[W-1,12+O],[W-1,13+O]]});
  // Kitchen in the corner of the grass between the north–south road and the short path; Oil Press where that path ends
  addObj(m,{type:'kitchen',x:15*T,y:(16+O)*T,spr:'kitchen',anim:true,block:[[14,15+O],[15,15+O]],act:{x:15*T,y:(16+O)*T+6,label:'Kitchen',id:'kitchen'}});
  addObj(m,{type:'press',x:18*T,y:(13+O)*T+14,spr:'press',block:[[17,13+O],[18,13+O]],act:{x:17*T-2,y:(13+O)*T+10,label:'Oil Press',id:'press'}});
  // Tallow's trading cart where the old well stood: the corner of the grass where the two roads cross
  addObj(m,{type:'stall',x:9*T+8,y:(10+O)*T+12,spr:'stall',block:[[8,10+O],[9,10+O]]});
  addObj(m,{type:'npc',name:'Tallow',x:11*T+4,y:(10+O)*T+13,act:{x:11*T+4,y:(11+O)*T+6,label:'Trade',id:'market'}});
  // Wick, keeper of the Founders' Ledger, by the road up to the Delve Gate (checks the Founder's Lantern whitelist; phase 2 later)
  addObj(m,{type:'npc',npc:'wick',name:'Wick',x:10*T+8,y:(7+O)*T+13,act:{x:10*T+8,y:(8+O)*T+6,label:'Talk',id:'wick'}});
  // farm with fence
  for(let x=2;x<=9;x++){if(x!==5&&x!==6)addObj(m,{type:'fence',x:x*T+8,y:(14+O)*T+14,spr:'fence',block:[[x,14+O]]});addObj(m,{type:'fence',x:x*T+8,y:(19+O)*T+14,spr:'fence',block:[[x,19+O]]});}
  for(let y=15;y<=18;y++){addObj(m,{type:'fence',x:2*T+8,y:(y+O)*T+14,spr:'fence',block:[[2,y+O]]});addObj(m,{type:'fence',x:9*T+8,y:(y+O)*T+14,spr:'fence',block:[[9,y+O]]});}
  m.plots=[];for(let c=0;c<6;c++)[15,17].forEach((y,r)=>{const x=3+c;setT(m,x,y+O,SOIL);m.plots.push({i:c*2+r,tx:x,ty:y+O,cx:x*T+8,cy:(y+O)*T+10});});   // one plot per square; index order = unlock order (left to right, both rows)
  m.plots.sort((a,b)=>a.i-b.i);
  // flowers (only in the Hold itself)
  const r=rng(7);for(let i=0;i<34;i++){const x=1+(r()*(W-2)|0),y=1+(r()*(HH-2)|0)+O;if(tAt(m,x,y)===GRASS&&!solidAt(m,x,y))m.objs.push({type:'flowers',x:x*T+8,y:y*T+15,spr:'flowers',v:r()*4|0,flat:true});}
  m.spawn={x:13*T,y:(9+O)*T+8};
  // dungeon entrances: where you stand when you come back up (or sign back in after logging out in the Depths)
  m.doors={gate:{x:13*T,y:(6+O)*T+8}};
  buildWild(m,O,W);
  return m;
}
// ---------- the Wilderness: rows 1 to O-1, north of the old wall ----------
// A broken stone wall along row O with two gaps (west and east). Beyond it: dead grass and dark trails, the Gloom Pond
// (Gloomfin, Fishing 15), Blackwood trees (Woodcutting 15), a graveyard, and an old obelisk at the very top (level 20).
function buildWild(m,O,W){
  for(let y=0;y<O;y++)for(let x=0;x<W;x++)setT(m,x,y,WILDG);setT(m,0,O,WILDG);setT(m,W-1,O,WILDG);
  const trail=(x0,y0,x1,y1)=>{for(let y=Math.min(y0,y1);y<=Math.max(y0,y1);y++)for(let x=Math.min(x0,x1);x<=Math.max(x0,x1);x++)setT(m,x,y,WPATH);};
  trail(5,30,6,O);trail(19,30,20,O);trail(5,30,20,31);trail(12,4,13,31);trail(8,22,12,23);trail(9,9,12,10);
  // the wall, with gaps at x 5–6 and 19–20 (the trails)
  const gaps=new Set([5,6,19,20]);
  for(let x=1;x<W-1;x++){if(gaps.has(x))continue;const L=gaps.has(x+1),R=gaps.has(x-1);addObj(m,{type:'wwall',x:x*T+8,y:O*T+14,v:(x*7)%3,end:L?'r':R?'l':null,block:[[x,O]]});}
  // the edge of the world up here: dead trees and darkness
  const dead=(x,y,edge)=>addObj(m,{type:'deadtree',x:x*T+8,y:y*T+15,v:(x+y)%2,edge:!!edge,block:[[x,y]]});
  for(let x=0;x<W;x+=2)dead(x,0,true);for(let y=1;y<O;y+=2){dead(0,y,true);dead(W-1,y,true);}dead(0,O,true);dead(W-1,O,true);
  // the Gloom Pond (rows 19–24)
  const pond=[[5,8],[4,9],[3,9],[3,9],[4,8],[5,7]];pond.forEach(([a,b],j)=>{for(let x=a;x<=b;x++){setT(m,x,19+j,GLOOM);setSolid(m,x,19+j,1);}});
  // Blackwood trees (shared, like the oaks; indexes after the Hold's)
  const cut=(x,y)=>{addObj(m,{type:'tree',x:x*T+8,y:y*T+15,spr:'tree',block:[[x,y]]});const o=m.objs[m.objs.length-1];o.kind='blackwood';o.chop=true;o.ti=m.trees.length;o.logs=TREES.blackwood.logs;o.until=0;m.trees.push(o);};
  [[17,21],[21,17],[16,13],[20,10]].forEach(([x,y])=>cut(x,y));
  for(const [x,y] of [[3,34],[9,36],[16,35],[23,33],[2,27],[22,27],[8,16],[3,13],[18,6],[22,4],[6,3],[15,26],[10,28]])dead(x,y);
  for(const [x,y,v] of [[8,37,0],[15,38,1],[23,37,0],[2,31,1],[10,25,0],[21,25,1],[5,15,0],[23,12,1],[9,4,0],[16,3,1],[14,17,0]])addObj(m,{type:'rock',x:x*T+8,y:y*T+14,v,block:[[x,y]]});
  // the graveyard
  for(const [x,y] of [[3,6],[5,6],[7,6],[3,8],[5,8],[7,8],[4,10],[6,10]])addObj(m,{type:'grave',x:x*T+8,y:y*T+14,v:(x+y)%3,block:[[x,y]]});
  // ruins around the obelisk at the very top (Wilderness level 20)
  for(const [x,y] of [[10,3],[15,3],[10,6],[15,6]])addObj(m,{type:'pillar',x:x*T+8,y:y*T+14,v:(x+y)%2,block:[[x,y]]});
  addObj(m,{type:'obelisk',x:13*T,y:3*T+14,sortY:3*T+10,block:[[12,2],[13,2],[12,3],[13,3]]});
  // skull posts either side of each gap, and a warning sign on the Hold side of each
  for(const x of [4,7,18,21])addObj(m,{type:'skullpost',x:x*T+8,y:(O-1)*T+14,block:[[x,O-1]]});
  for(const x of [3,22])addObj(m,{type:'sign',wild:true,x:x*T+8,y:(O+1)*T+12,spr:'sign',block:[[x,O+1]],act:{x:x*T+8,y:(O+2)*T+4,label:'Read',id:'wildsign'}});
  // bones in the dead grass
  const r=rng(41);for(let i=0;i<46;i++){const x=1+(r()*(W-2)|0),y=1+(r()*(O-2)|0);if(!solidAt(m,x,y)&&tAt(m,x,y)===WILDG)m.objs.push({type:'weed',x:x*T+8,y:y*T+15,v:r()*3|0,flat:true});}
  for(let i=0;i<22;i++){const x=1+(r()*(W-2)|0),y=1+(r()*(O-2)|0);if(!solidAt(m,x,y)&&tAt(m,x,y)===WILDG)m.objs.push({type:'wbones',x:x*T+8,y:y*T+15,v:r()*3|0,flat:true});}
}
// ---------- the Depths ----------
function buildFloor(floor,runSeed){
  const pack=packOf(floor),r=rng(runSeed*977+floor*7919),W=46,H=46,m=newMap(W,H,'delve',WALL);
  m.floor=floor;m.biome=pack.id;m.pack=pack;
  for(let i=0;i<m.solid.length;i++)m.solid[i]=1;
  const carve=(x,y)=>{setT(m,x,y,FLOOR);setSolid(m,x,y,0);};
  const rooms=[];const boss=floor===pack.to;
  const room=(x,y,w,h)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)carve(i,j);const o={x,y,w,h,cx:x+(w>>1),cy:y+(h>>1)};rooms.push(o);return o;};
  const corridor=(a,b)=>{let x=a.cx,y=a.cy;const hf=r()<.5;
    const stepX=()=>{while(x!==b.cx){carve(x,y);carve(x,y+1);x+=Math.sign(b.cx-x);}};const stepY=()=>{while(y!==b.cy){carve(x,y);carve(x+1,y);y+=Math.sign(b.cy-y);}};
    if(hf){stepX();stepY();}else{stepY();stepX();}carve(x,y);};
  if(boss){
    const a=room(4,19,7,7),b=room(17,13,20,17);corridor(a,b);m.bossRoom=b;
  }else{
    for(let k=0;k<80&&rooms.length<9;k++){const w=5+(r()*6|0),h=5+(r()*4|0),x=2+(r()*(W-w-4)|0),y=3+(r()*(H-h-5)|0);
      if(rooms.some(o=>x<o.x+o.w+2&&x+w+2>o.x&&y<o.y+o.h+3&&y+h+3>o.y))continue;room(x,y,w,h);}
    for(let i=1;i<rooms.length;i++)corridor(rooms[i-1],rooms[i]);
    if(rooms.length>3)corridor(rooms[0],rooms[rooms.length-1]);
  }
  const start=rooms[0];m.spawn={x:start.cx*T+8,y:start.cy*T+12};
  // stairs: farthest room by walking distance
  const dist=bfs(m,start.cx,start.cy);
  let far=rooms[rooms.length-1];if(!boss){let best=-1;for(const o of rooms){const d=dist[o.cy*W+o.cx];if(d>best){best=d;far=o;}}}
  m.stairs={tx:far.cx,ty:far.cy,hidden:boss};
  // wall faces: wall with floor directly below
  const faces=[];for(let y=0;y<H-1;y++)for(let x=0;x<W;x++)if(tAt(m,x,y)===WALL&&tAt(m,x,y+1)===FLOOR)faces.push([x,y]);
  m.faces=new Set(faces.map(([x,y])=>y*W+x));
  const pick=a=>a.splice(r()*a.length|0,1)[0];
  const fpool=faces.slice();
  for(let i=0;i<(boss?6:9)&&fpool.length;i++){const [x,y]=pick(fpool);addObj(m,{type:'torch',x:x*T+8,y:y*T+12,tile:[x,y],light:{r:46,c:'warm'},onWall:true});}
  // ore veins: rolled from the pack's vein table (some ores only show up from a given floor)
  const veins=(pack.veins||[[pack.ore,1]]).filter(v=>!v[2]||floor>=v[2]),vw=veins.reduce((a,v)=>a+v[1],0);
  const ORE_LIGHT={ember:{r:15,c:'lava'},coal:{r:11,c:'cool'},cobalt:{r:14,c:'cool'},starshard:{r:18,c:'star'},gloam:{r:16,c:'green'}};
  if(!boss)for(let i=0;i<10&&fpool.length;i++){const [x,y]=pick(fpool);let q=r()*vw,kind=veins[0][0];for(const v of veins){q-=v[1];if(q<=0){kind=v[0];break;}}
    addObj(m,{type:'ore',kind,x:x*T+8,y:y*T+15,tile:[x,y],hp:(ORES[kind]||{hp:3}).hp,onWall:true,light:ORE_LIGHT[kind]||null,light0:ORE_LIGHT[kind]||null});}
  const cells=[];rooms.forEach((o,i)=>{if(i===0)return;for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)cells.push([x,y]);});
  const free=cells.filter(([x,y])=>!(x===m.stairs.tx&&y===m.stairs.ty));
  if(!boss){
    for(let i=0;i<1+(r()<.6?1:0);i++){const [x,y]=pick(free);addObj(m,{type:'chest',x:x*T+8,y:y*T+14,open:false,act:{x:x*T+8,y:y*T+14,label:'Open',id:'chest'},block:[[x,y]]});}
    // floors 21–30: an Uncommon Chest (glows green) on most floors, with more inside
    if(pack.uchest&&r()<.75){const [x,y]=pick(free);addObj(m,{type:'chest',tier:'u',x:x*T+8,y:y*T+14,open:false,act:{x:x*T+8,y:y*T+14,label:'Open',id:'chest'},block:[[x,y]],light:{r:24,c:'green'}});}
    const glow=pack.id==='moss'?4:2;for(let i=0;i<glow;i++){const [x,y]=pick(free);addObj(m,{type:'glowcap',x:x*T+8,y:y*T+15,light:{r:20,c:'pink'},act:{x:x*T+8,y:y*T+12,label:'Pick',id:'glowcap'}});}
    if(pack.id==='crypt')for(let i=0;i<6;i++){const [x,y]=pick(free);m.objs.push({type:'bones',x:x*T+8,y:y*T+15,flat:true});}
    if(pack.id==='ember')for(let i=0;i<5;i++){const [x,y]=pick(free);m.objs.push({type:'cinders',x:x*T+8,y:y*T+15,flat:true,v:r()*2|0});}
    if(pack.id==='star')for(let i=0;i<4;i++){const [x,y]=pick(free);addObj(m,{type:'crystal',x:x*T+8,y:y*T+15,v:r()*2|0,light:{r:16,c:'cool'}});}
    if(pack.id==='tide')for(let i=0;i<6;i++){const [x,y]=pick(free);m.objs.push({type:'reeds',x:x*T+8,y:y*T+15,flat:true,v:r()*2|0,dun:true});}
    if(pack.id==='void')for(let i=0;i<4;i++){const [x,y]=pick(free);addObj(m,{type:'mcrystal',x:x*T+8,y:y*T+14,v:r()*2|0,block:[[x,y]],light:{r:18,c:'violet'}});}
  }
  // enemies
  m.spawns=[];
  if(boss){m.spawns.push({type:pack.boss,x:m.bossRoom.cx*T+8,y:m.bossRoom.cy*T});}
  else{const n=5+floor+(r()*3|0);for(let i=0;i<n&&free.length;i++){const [x,y]=pick(free);m.spawns.push({type:pack.enemies[r()*pack.enemies.length|0],x:x*T+8,y:y*T+12});}}
  m.rooms=rooms;
  return m;
}
function bfs(m,sx,sy){const d=new Int32Array(m.w*m.h).fill(-1),q=[[sx,sy]];d[sy*m.w+sx]=0;
  while(q.length){const [x,y]=q.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(tAt(m,nx,ny)===FLOOR&&d[ny*m.w+nx]<0){d[ny*m.w+nx]=d[y*m.w+x]+1;q.push([nx,ny]);}}}return d;}

// ---------- dungeon dressing: soft shadows under walls, then props scattered by a fixed seed (same for the whole party) ----------
function dressDungeon(m,g){const D=ART.deco,r=rng((m.floor||1)*131+(m.w*7)),isF=(x,y)=>tAt(m,x,y)===FLOOR,isW=(x,y)=>!isF(x,y);
  const taken=new Set(m.objs.filter(o=>o.tile).map(o=>o.tile[1]*m.w+o.tile[0]));
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){if(!isF(x,y))continue;const X=x*T,Y=y*T;
    // ambient occlusion: walls cast a soft shadow onto the floor beside them
    if(isW(x,y-1)){const gr=g.createLinearGradient(0,Y,0,Y+7);gr.addColorStop(0,'rgba(0,0,0,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(X,Y,T,7);}
    if(isW(x-1,y)){const gr=g.createLinearGradient(X,0,X+4,0);gr.addColorStop(0,'rgba(0,0,0,.32)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(X,Y,4,T);}
    if(isW(x+1,y)){const gr=g.createLinearGradient(X+T,0,X+T-4,0);gr.addColorStop(0,'rgba(0,0,0,.32)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(X+T-4,Y,4,T);}
    if(m.stairs&&x===m.stairs.tx&&y===m.stairs.ty)continue;
    const k=r(),crypt=m.biome==='crypt';
    if(isW(x,y-1)&&isW(x-1,y)&&k<.55)g.drawImage(D.web,X,Y);
    else if(isW(x,y-1)&&isW(x+1,y)&&k<.55)g.drawImage(D.webR,X+6,Y);
    else if(k<.05)g.drawImage(D.pebbles,X+(r()*8|0),Y+(r()*10|0));
    else if(k<(crypt?.085:.065))g.drawImage(D.bones,X+(r()*6|0),Y+4+(r()*6|0));
    else if(crypt&&k<.1)g.drawImage(D.skull,X+(r()*8|0),Y+4+(r()*6|0));
    else if(k<.115)g.drawImage(D.rubble,X+(r()*4|0),Y+6+(r()*4|0));
    else if(!crypt&&k<(m.biome==='tide'?.2:.135))g.drawImage(D.puddle,X+(r()*4|0),Y+5+(r()*6|0));
    else if(!crypt&&k<.15)g.drawImage(D.shrooms,X+(r()*6|0),Y+6+(r()*4|0));}
  // wall faces: banners and chains in the crypt, roots in the caverns
  for(const key of m.faces){const x=key%m.w,y=(key/m.w)|0;if(taken.has(key))continue;const k=r(),X=x*T,Y=y*T;
    if(m.biome==='crypt'||m.biome==='ember'||m.biome==='tide'||m.biome==='void'){if(k<.07)g.drawImage(D.banner,X+4,Y+1);else if(k<.14)g.drawImage(D.chain,X+5,Y+2);}
    else if(k<.18)g.drawImage(D.roots,X+4,Y);}}
// soft shadows where the forest and the cliffs meet open ground, so the edges of Hollowmere read as deep woods
function edgeShade(m,g){const dark=t=>t===CANOPY||t===CLIFF;
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const t=tAt(m,x,y);if(dark(t)||isWater(t))continue;const X=x*T,Y=y*T;
    const sh=(dx,dy,x0,y0,x1,y1,w,h)=>{if(!dark(tAt(m,x+dx,y+dy)))return;const gr=g.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,'rgba(5,12,14,.55)');gr.addColorStop(1,'rgba(5,12,14,0)');g.fillStyle=gr;g.fillRect(X+(dx>0?T-w:0),Y+(dy>0?T-h:0),w,h);};
    sh(0,-1,X,Y,X,Y+8,T,8);sh(-1,0,X,Y,X+6,Y,6,T);sh(1,0,X+T,Y,X+T-6,Y,6,T);sh(0,1,X,Y+T,X,Y+T-5,T,5);}}
// ---------- pre-render the static ground layer ----------
function bakeGround(m){
  const cv=document.createElement('canvas');cv.width=m.w*T;cv.height=m.h*T;const g=cv.getContext('2d');
  const r=rng(m.floor||3);
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const t=tAt(m,x,y),v=(x*7+y*13)%4;let s=null;
    if(m.kind==='hold'){if(t===GRASS)s=ART.grass[v];else if(t===PATH)s=ART.path[v%3];else if(t===SOIL)s=ART.soil;else if(t===WILDG)s=ART.wgrass[v];else if(t===WPATH)s=ART.wpath[v%3];
      else if(t===MGRASS)s=ART.mgrass[v];else if(t===MOSS)s=ART.moss[v];else if(t===WG1||t===WG2||t===WG3)s=ART.wgblend[t-WG1][v];else if(t===WPATH2)s=ART.wpath2[v%3];else if(t===COBBLE)s=ART.cobble[v];else if(t===SITE)s=ART.site[v];else if(t===DGRASS)s=ART.dgrass[v];else if(t===MPATH)s=ART.mpath[v%3];else if(t===PLAZA)s=ART.plaza[(x*3+y*5)%5];else if(t===CANOPY)s=ART.canopy[v];else if(t===CLIFF)s=ART.cliff[v%2];else if(isWater(t))s=null;}
    else{if(t===FLOOR)s=ART.floor[m.biome][v];else if(m.faces.has(y*m.w+x))s=ART.face[m.biome][v%3];else{g.fillStyle='#0d0e17';g.fillRect(x*T,y*T,T,T);
        const fl=(dx,dy)=>tAt(m,x+dx,y+dy)===FLOOR||m.faces.has((y+dy)*m.w+x+dx);g.fillStyle={moss:'#3a4a4a',ember:'#4a2f33',star:'#2c3566',tide:'#24454d',void:'#2e2a42'}[m.biome]||'#45425f';
        if(fl(-1,0))g.fillRect(x*T,y*T,2,T);if(fl(1,0))g.fillRect(x*T+T-2,y*T,2,T);if(fl(0,-1))g.fillRect(x*T,y*T,T,2);if(fl(0,1))g.fillRect(x*T,y*T+T-2,T,2);
        if((x*31+y*17)%5===0){g.fillStyle='#181a28';g.fillRect(x*T+5,y*T+6,3,2);}}}
    if(s)g.drawImage(s,x*T,y*T);}
  if(m.kind==='delve')dressDungeon(m,g);
  if(m.kind==='hold')edgeShade(m,g);
  if(m.kind==='delve'&&m.stairs&&!m.stairs.hidden)g.drawImage(ART.stairs,m.stairs.tx*T,m.stairs.ty*T);
  m.ground=cv;
}
