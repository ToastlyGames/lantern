// ===== Maps: the Hold (handmade) and the Depths (procedural) =====
const T=16,WALL=0,FLOOR=1,GRASS=2,PATH=3,WATER=4,SOIL=5;
function newMap(w,h,kind,fill){return {w,h,kind,t:new Uint8Array(w*h).fill(fill),solid:new Uint8Array(w*h),objs:[],lights:[],seed:0};}
const tAt=(m,x,y)=>x<0||y<0||x>=m.w||y>=m.h?WALL:m.t[y*m.w+x];
const setT=(m,x,y,v)=>{if(x>=0&&y>=0&&x<m.w&&y<m.h)m.t[y*m.w+x]=v;};
const solidAt=(m,x,y)=>x<0||y<0||x>=m.w||y>=m.h||m.solid[y*m.w+x]===1;
const setSolid=(m,x,y,v)=>{if(x>=0&&y>=0&&x<m.w&&y<m.h)m.solid[y*m.w+x]=v;};
function addObj(m,o){m.objs.push(o);if(o.block)for(const [x,y] of o.block)setSolid(m,x,y,1);return o;}

// ---------- the Hold ----------
function buildHold(){
  const W=26,H=24,m=newMap(W,H,'hold',GRASS);
  for(let x=0;x<W;x++)for(let y=0;y<H;y++)if(x<1||y<1||x>=W-1||y>=H-1)setSolid(m,x,y,1);
  for(let y=5;y<H-1;y++){setT(m,12,y,PATH);setT(m,13,y,PATH);}
  for(let x=1;x<W;x++){setT(m,x,11,PATH);setT(m,x,12,PATH);}
  for(let x=14;x<17;x++)setT(m,x,13,PATH);
  // pond
  [[18,19],[19,19],[20,19],[21,19],[17,20],[18,20],[19,20],[20,20],[21,20],[22,20],[18,21],[19,21],[20,21],[21,21],[22,21],[19,22],[20,22],[21,22]].forEach(([x,y])=>{setT(m,x,y,WATER);setSolid(m,x,y,1);});
  // border + inner trees
  const tree=(tx,ty)=>addObj(m,{type:'tree',x:tx*T+8,y:ty*T+15,spr:'tree',block:[[tx,ty]]});
  // the east road ends at an opening in the trees (rows 11–12), closed with a barricade until Season 1's new area
  for(let x=0;x<W;x+=2){tree(x,0);tree(x+1,H-1);}for(let y=1;y<H;y+=2){tree(0,y);if(y!==11&&y!==13)tree(W-1,y);}
  // the inner trees can be cut (Woodcutting); border trees are the edge of the world
  m.trees=[];[[3,9],[22,8],[15,21],[9,21],[23,13],[2,21],[16,2],[8,2],[21,3]].forEach(([x,y])=>{tree(x,y);const o=m.objs[m.objs.length-1];o.kind='oak';o.chop=true;o.ti=m.trees.length;o.logs=TREES.oak.logs;o.until=0;m.trees.push(o);});
  // buildings
  addObj(m,{type:'gate',x:13*T,y:5*T,spr:'gate',block:[[11,3],[12,3],[13,3],[14,3],[11,4],[14,4]],act:{x:13*T,y:5*T+6,label:'Delve',id:'gate'},light:{r:34,c:'warm'}});
  addObj(m,{type:'bank',x:5*T,y:8*T,spr:'bank',block:[[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[6,7]],act:{x:5*T,y:8*T+4,label:'Bank',id:'bank'}});
  addObj(m,{type:'forge',x:19*T,y:8*T,spr:'forge',anim:true,block:[[17,6],[18,6],[19,6],[20,6],[17,7],[18,7],[19,7],[20,7]],act:{x:18*T+2,y:8*T+6,label:'Forge',id:'forge'},light:{r:30,c:'warm',dx:-6,dy:-10}});
  // the bulletin board (latest updates + build version), at the corner of the grass by the crossroads
  addObj(m,{type:'board',x:15*T,y:10*T+2,spr:'board',block:[[14,9],[15,9]],act:{x:15*T,y:10*T+8,label:'Bulletin',id:'bulletin'}});
  // Tallow's trading cart: the Hold's first merchant (buy supplies, sell anything)
  addObj(m,{type:'stall',x:19*T+8,y:9*T+14,spr:'stall',block:[[18,9],[19,9]]});
  addObj(m,{type:'npc',name:'Tallow',x:20*T+12,y:10*T+12,act:{x:20*T+12,y:11*T+2,label:'Trade',id:'market'}});
  // the east road: a sign and a barricaded opening in the trees
  addObj(m,{type:'sign',x:23*T+8,y:10*T+12,spr:'sign',block:[[23,10]],act:{x:23*T+8,y:11*T+4,label:'Read',id:'eastsign'}});
  addObj(m,{type:'barricade',x:W*T-8,y:12*T+15,spr:'barricade',block:[[W-1,10],[W-1,11],[W-1,12],[W-1,13]]});
  addObj(m,{type:'kitchen',x:17*T,y:16*T,spr:'kitchen',anim:true,block:[[16,15],[17,15]],act:{x:17*T,y:16*T+6,label:'Kitchen',id:'kitchen'}});
  addObj(m,{type:'press',x:21*T,y:16*T,spr:'press',block:[[20,15],[21,15]],act:{x:21*T,y:16*T+6,label:'Oil Press',id:'press'}});
  addObj(m,{type:'well',x:9*T,y:10*T,spr:'well',block:[[8,9],[9,9]]});
  // farm with fence
  for(let x=2;x<=9;x++){if(x!==5&&x!==6)addObj(m,{type:'fence',x:x*T+8,y:14*T+14,spr:'fence',block:[[x,14]]});addObj(m,{type:'fence',x:x*T+8,y:19*T+14,spr:'fence',block:[[x,19]]});}
  for(let y=15;y<=18;y++){addObj(m,{type:'fence',x:2*T+8,y:y*T+14,spr:'fence',block:[[2,y]]});addObj(m,{type:'fence',x:9*T+8,y:y*T+14,spr:'fence',block:[[9,y]]});}
  m.plots=[];[[3,15],[5,15],[7,15],[3,17],[5,17],[7,17]].forEach(([x,y],i)=>{setT(m,x,y,SOIL);setT(m,x+1,y,SOIL);m.plots.push({i,tx:x,ty:y,cx:x*T+16,cy:y*T+10});});
  // flowers
  const r=rng(7);for(let i=0;i<34;i++){const x=1+(r()*(W-2)|0),y=1+(r()*(H-2)|0);if(tAt(m,x,y)===GRASS&&!solidAt(m,x,y))m.objs.push({type:'flowers',x:x*T+8,y:y*T+15,spr:'flowers',v:r()*4|0,flat:true});}
  m.spawn={x:13*T,y:9*T+8};
  return m;
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
    if(m.kind==='hold'){if(t===GRASS)s=ART.grass[v];else if(t===PATH)s=ART.path[v%3];else if(t===SOIL)s=ART.soil;else if(t===WATER)s=null;}
    else{if(t===FLOOR)s=ART.floor[m.biome][v];else if(m.faces.has(y*m.w+x))s=ART.face[m.biome][v%3];else{g.fillStyle='#0d0e17';g.fillRect(x*T,y*T,T,T);
        const fl=(dx,dy)=>tAt(m,x+dx,y+dy)===FLOOR||m.faces.has((y+dy)*m.w+x+dx);g.fillStyle=m.biome==='moss'?'#3a4a4a':'#45425f';
        if(fl(-1,0))g.fillRect(x*T,y*T,2,T);if(fl(1,0))g.fillRect(x*T+T-2,y*T,2,T);if(fl(0,-1))g.fillRect(x*T,y*T,T,2);if(fl(0,1))g.fillRect(x*T,y*T+T-2,T,2);
        if((x*31+y*17)%5===0){g.fillStyle='#181a28';g.fillRect(x*T+5,y*T+6,3,2);}}}
    if(s)g.drawImage(s,x*T,y*T);}
  if(m.kind==='delve')dressDungeon(m,g);
  if(m.kind==='delve'&&m.stairs&&!m.stairs.hidden)g.drawImage(ART.stairs,m.stairs.tx*T,m.stairs.ty*T);
  m.ground=cv;
}
