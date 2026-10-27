// ===== Maps: the Hold (handmade) and the Depths (procedural) =====
const T=16,WALL=0,FLOOR=1,GRASS=2,PATH=3,WATER=4,SOIL=5,DOCK=6,WILDG=7,WPATH=8,GLOOM=9;
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
const WILD_ROWS=40,WILD_Y=WILD_ROWS*T,WILD_MAX=20;
const wildLvl=y=>y<WILD_Y?Math.min(WILD_MAX,Math.max(1,Math.ceil((WILD_Y-y)/(2*T)))):0;
const isWater=t=>t===WATER||t===GLOOM;
function buildHold(){
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
  if(!boss)for(let i=0;i<10&&fpool.length;i++){const [x,y]=pick(fpool);const kind=pack.rareOre&&floor>=8&&r()<.25?pack.rareOre:pack.ore;addObj(m,{type:'ore',kind,x:x*T+8,y:y*T+15,tile:[x,y],hp:3,onWall:true,light:kind==='ember'?{r:15,c:'lava'}:null});}
  const cells=[];rooms.forEach((o,i)=>{if(i===0)return;for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)cells.push([x,y]);});
  const free=cells.filter(([x,y])=>!(x===m.stairs.tx&&y===m.stairs.ty));
  if(!boss){
    for(let i=0;i<1+(r()<.6?1:0);i++){const [x,y]=pick(free);addObj(m,{type:'chest',x:x*T+8,y:y*T+14,open:false,act:{x:x*T+8,y:y*T+14,label:'Open',id:'chest'},block:[[x,y]]});}
    const glow=pack.id==='moss'?4:2;for(let i=0;i<glow;i++){const [x,y]=pick(free);addObj(m,{type:'glowcap',x:x*T+8,y:y*T+15,light:{r:20,c:'pink'},act:{x:x*T+8,y:y*T+12,label:'Pick',id:'glowcap'}});}
    if(pack.id==='crypt')for(let i=0;i<6;i++){const [x,y]=pick(free);m.objs.push({type:'bones',x:x*T+8,y:y*T+15,flat:true});}
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
    else if(!crypt&&k<.135)g.drawImage(D.puddle,X+(r()*4|0),Y+5+(r()*6|0));
    else if(!crypt&&k<.15)g.drawImage(D.shrooms,X+(r()*6|0),Y+6+(r()*4|0));}
  // wall faces: banners and chains in the crypt, roots in the caverns
  for(const key of m.faces){const x=key%m.w,y=(key/m.w)|0;if(taken.has(key))continue;const k=r(),X=x*T,Y=y*T;
    if(m.biome==='crypt'){if(k<.07)g.drawImage(D.banner,X+4,Y+1);else if(k<.14)g.drawImage(D.chain,X+5,Y+2);}
    else if(k<.18)g.drawImage(D.roots,X+4,Y);}}
// ---------- pre-render the static ground layer ----------
function bakeGround(m){
  const cv=document.createElement('canvas');cv.width=m.w*T;cv.height=m.h*T;const g=cv.getContext('2d');
  const r=rng(m.floor||3);
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const t=tAt(m,x,y),v=(x*7+y*13)%4;let s=null;
    if(m.kind==='hold'){if(t===GRASS)s=ART.grass[v];else if(t===PATH)s=ART.path[v%3];else if(t===SOIL)s=ART.soil;else if(t===WILDG)s=ART.wgrass[v];else if(t===WPATH)s=ART.wpath[v%3];else if(isWater(t))s=null;}
    else{if(t===FLOOR)s=ART.floor[m.biome][v];else if(m.faces.has(y*m.w+x))s=ART.face[m.biome][v%3];else{g.fillStyle='#0d0e17';g.fillRect(x*T,y*T,T,T);
        const fl=(dx,dy)=>tAt(m,x+dx,y+dy)===FLOOR||m.faces.has((y+dy)*m.w+x+dx);g.fillStyle=m.biome==='moss'?'#3a4a4a':'#45425f';
        if(fl(-1,0))g.fillRect(x*T,y*T,2,T);if(fl(1,0))g.fillRect(x*T+T-2,y*T,2,T);if(fl(0,-1))g.fillRect(x*T,y*T,T,2);if(fl(0,1))g.fillRect(x*T,y*T+T-2,T,2);
        if((x*31+y*17)%5===0){g.fillStyle='#181a28';g.fillRect(x*T+5,y*T+6,3,2);}}}
    if(s)g.drawImage(s,x*T,y*T);}
  if(m.kind==='delve')dressDungeon(m,g);
  if(m.kind==='delve'&&m.stairs&&!m.stairs.hidden)g.drawImage(ART.stairs,m.stairs.tx*T,m.stairs.ty*T);
  m.ground=cv;
}
