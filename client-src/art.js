// ===== Lanternhold pixel art: every sprite is painted pixel-by-pixel at load time =====
const PAL={
  ink:'#1a1c2c',plum:'#5d275d',red:'#b13e53',orange:'#ef7d57',yellow:'#ffcd75',lime:'#a7f070',green:'#38b764',teal:'#257179',
  navy:'#29366f',blue:'#3b5dc9',sky:'#41a6f6',cyan:'#73eff7',white:'#f4f4f4',silver:'#94b0c2',slate:'#566c86',dusk:'#333c57',
  bark:'#6b3e26',wood:'#a0663b',tan:'#d9a066',skin:'#f0c8a0',soil:'#3d2a1e',bone:'#d8c8a0',olive:'#8a6f30',pink:'#e86fd0',
  moss:'#2b4b3a',fern:'#4f7a3a',night:'#10121c',ember:'#ff9f3d',gold:'#f7c64a',rust:'#8f4a2b',cave:'#2a2f45',cave2:'#363c57'
};
function hex(c){const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255];}
// A tiny paint surface: index-free, stores css colors per pixel, then auto-outlines and rasterises.
class Px{
  constructor(w,h){this.w=w;this.h=h;this.p=new Array(w*h).fill(null);}
  set(x,y,c){x|=0;y|=0;if(x<0||y<0||x>=this.w||y>=this.h)return this;this.p[y*this.w+x]=c;return this;}
  get(x,y){if(x<0||y<0||x>=this.w||y>=this.h)return null;return this.p[y*this.w+x];}
  rect(x,y,w,h,c){for(let j=0;j<h;j++)for(let i=0;i<w;i++)this.set(x+i,y+j,c);return this;}
  ell(cx,cy,rx,ry,c){for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){const dx=(x+.5-cx)/rx,dy=(y+.5-cy)/ry;if(dx*dx+dy*dy<=1)this.set(x,y,c);}return this;}
  line(x0,y0,x1,y1,c){const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)this.set(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c);return this;}
  rows(x,y,map,key){map.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch!=='.'&&key[ch])this.set(x+i,y+j,key[ch]);}});return this;}
  shadeBottom(c,from){for(let x=0;x<this.w;x++){for(let y=this.h-1;y>=0;y--){if(this.get(x,y)&&this.get(x,y)!==PAL.ink){if(y>=from)this.set(x,y,c);break;}}}return this;}
  outline(c){c=c||PAL.ink;const add=[];for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){if(this.get(x,y))continue;
    if(this.get(x+1,y)||this.get(x-1,y)||this.get(x,y+1)||this.get(x,y-1))add.push([x,y]);}
    add.forEach(([x,y])=>this.set(x,y,c));return this;}
  mirror(){const o=new Px(this.w,this.h);for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++)o.set(this.w-1-x,y,this.get(x,y));return o;}
  canvas(){const cv=document.createElement('canvas');cv.width=this.w;cv.height=this.h;const g=cv.getContext('2d'),id=g.createImageData(this.w,this.h);
    for(let i=0;i<this.p.length;i++){const c=this.p[i];if(!c)continue;const [r,gg,b]=hex(c);id.data[i*4]=r;id.data[i*4+1]=gg;id.data[i*4+2]=b;id.data[i*4+3]=255;}
    g.putImageData(id,0,0);return cv;}
}
function rng(seed){let a=seed|0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

// ---------- hero ----------
const TIER_COLORS={
  none:{tun:PAL.teal,tun2:PAL.moss,trim:PAL.green},
  copper:{tun:PAL.orange,tun2:PAL.rust,trim:PAL.yellow},
  iron:{tun:PAL.silver,tun2:PAL.slate,trim:PAL.white},
  ember:{tun:PAL.red,tun2:PAL.plum,trim:PAL.ember}
};
// Appearance options. Expansions can add more swatches/styles here.
const LOOKS={
  skin:['#f6d7bb','#f0c8a0','#d9a066','#b5764a','#8a5634','#5e3a24'],
  hair:['#2a2230','#6b3e26','#a0522d','#e8c66a','#f4f4f4','#b13e53','#3b5dc9','#e86fd0','#38b764','#ef7d57'],
  cloth:['#257179','#3b5dc9','#38b764','#b13e53','#7a3b8f','#ef7d57','#566c86','#333c57','#d9a066','#e86fd0'],
  style:['short','long','spiky','hood']
};
const DEFAULT_LOOK={skin:1,hair:1,cloth:0,style:0};
function shade(c,f){const [r,g,b]=hex(c);const k=v=>Math.max(0,Math.min(255,Math.round(f<1?v*f:v+(255-v)*(f-1))));return '#'+[k(r),k(g),k(b)].map(v=>v.toString(16).padStart(2,'0')).join('');}
const ARMOR={copper:{m:PAL.orange,m2:PAL.rust,hi:PAL.yellow},iron:{m:PAL.silver,m2:PAL.slate,hi:PAL.white},ember:{m:PAL.red,m2:PAL.plum,hi:PAL.ember}};
function heroFrame(dir,step,look){
  look=look||{};const p=new Px(16,16);
  const face=LOOKS.skin[look.skin??1]||LOOKS.skin[1],face2=shade(face,.82);
  const hair=LOOKS.hair[look.hair??1]||LOOKS.hair[1],hair2=shade(hair,.7),hairHi=shade(hair,1.35);
  const tun=LOOKS.cloth[look.cloth??0]||LOOKS.cloth[0],tun2=shade(tun,.68),trim=shade(tun,1.45);
  const style=LOOKS.style[look.style??0]||'short',A=ARMOR[look.armor];
  const lf=step===1?1:0,rf=step===2?1:0,C=look.cape&&CAPES[look.cape];
  // cape behind the body (front view)
  // legs + boots
  p.rect(5,12,2,3-lf,PAL.navy).rect(9,12,2,3-rf,PAL.navy);
  p.rect(5,15-lf,2,1,PAL.bark).rect(9,15-rf,2,1,PAL.bark);
  // long hair behind the body
  if(style==='long'){if(dir==='up')p.rect(4,6,8,5,hair).rect(4,10,8,1,hair2);else if(dir==='down')p.rect(4,5,1,5,hair).rect(11,5,1,5,hair);else p.rect(dir==='left'?8:4,5,4,5,hair);}
  // tunic
  p.rect(4,8,8,5,tun).rect(4,12,8,1,tun2).rect(4,8,1,5,tun2);
  if(dir==='down')p.rect(7,8,2,3,trim);
  // armor over the clothes
  if(A){p.rect(5,8,6,3,A.m).rect(5,10,6,1,A.m2);p.set(4,8,A.m2).set(11,8,A.m2);if(dir==='down')p.rect(6,8,4,1,A.hi);else p.rect(5,8,6,1,A.hi);}
  p.rect(4,11,8,1,PAL.bark).set(8,11,PAL.yellow);
  // arms
  const sl=A?A.m2:tun2;
  if(dir==='left'){p.rect(6,9,2,3,sl).set(6,12,face);}
  else if(dir==='right'){p.rect(8,9,2,3,sl).set(9,12,face);}
  else{p.rect(3,9,1,3,sl).set(3,12,face).rect(12,9,1,3,sl).set(12,12,face);}
  // cape over the back / trailing to the side
  // (capes are drawn as their own layer around the hero: capeLayer)
  // head
  const cap=style==='hood'?tun:hair,cap2=style==='hood'?tun2:hair2;
  p.ell(8,5,4.2,4,cap);
  if(dir==='down'){p.rect(5,4,6,4,face).rect(5,7,6,1,face2);p.set(6,5,PAL.ink).set(9,5,PAL.ink);p.set(5,6,shade(face,.9)).set(10,6,shade(face,.9));p.rect(5,3,6,1,cap2);
    if(style!=='hood'){p.set(5,4,hair).set(10,4,hair);}if(style==='hood')p.rect(4,4,1,4,cap).rect(11,4,1,4,cap);}
  else if(dir==='up'){p.rect(5,7,6,1,cap2);}
  else if(dir==='left'){p.rect(4,4,4,4,face).rect(4,7,4,1,face2);p.set(5,5,PAL.ink);p.rect(4,3,5,1,cap2);}
  else{p.rect(8,4,4,4,face).rect(8,7,4,1,face2);p.set(10,5,PAL.ink);p.rect(7,3,5,1,cap2);}
  if(style==='spiky'){p.set(5,0,hair).set(8,0,hair).set(11,1,hair).set(4,1,hair).set(7,1,hair).set(10,1,hair);}
  p.set(6,2,style==='hood'?trim:hairHi).set(7,2,style==='hood'?trim:hairHi);
  // helmet on top of the head
  const HM={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d']}[look.helm];
  if(HM){p.ell(8,4,4.4,2.6,HM[0]);p.rect(4,5,8,1,HM[1]);p.set(6,2,HM[2]).set(7,2,HM[2]);if(dir==='down'||dir==='up')p.rect(7,1,2,1,HM[1]);if(dir==='down'){p.rect(5,4,6,1,HM[1]);}}
  if(look.helm==='partyhat'){p.rect(5,1,6,2,'#3b5dc9');p.set(6,1,'#73eff7').set(9,2,'#73eff7');p.rect(4,3,8,1,'#29366f');}
  if(look.helm==='greenhat'){p.rect(5,1,6,2,'#38b764');p.set(6,1,'#a7f070').set(9,2,'#a7f070');p.rect(4,3,8,1,'#257179');}
  p.outline();
  return p.canvas();
}
// Capes: a separate 20x20 layer around the hero (hero sits at 2,2), so a cape can be wider and longer than the body and sway.
const CAPE_CACHE={};
function capeLayer(k,dir,step,front){const key=[k,dir,step,front].join('|');if(key in CAPE_CACHE)return CAPE_CACHE[key];
  const C=CAPES[k];if(!C){return CAPE_CACHE[key]=null;}const p=new Px(20,20),c1=C.c1,c2=C.c2,hi=shade(c1,1.35),sw=step===1?1:step===2?-1:0;let any=false;
  const row=(y,x0,x1,c)=>{for(let x=x0;x<=x1;x++)p.set(x,y,c);any=true;};
  if(dir==='up'&&front){ // full back view, drawn over the hero, ends above the boots
    for(let y=9;y<=16;y++){const w=y<10?3:y<11?4:y<13?5:6,s=y>=14?sw:0;row(y,10-w+s,9+w+s,c1);p.set(10-w+s,y,c2).set(9+w+s,y,c2);}
    for(let y=11;y<=16;y++){p.set(8+(y>=14?sw:0),y,c2);p.set(11+(y>=14?sw:0),y,c2);}
    for(let x=4;x<=15;x+=2)p.set(x+sw,16,c2);row(9,7,12,hi);p.set(7,9,PAL.gold).set(12,9,PAL.gold);}
  else if(dir==='down'&&!front){ // seen from the front: flares out behind the arms
    for(let y=9;y<=16;y++){const w=y<11?5:y<14?6:7,s=y>=14?sw:0;row(y,10-w+s,9+w+s,y>=15?c2:c1);}}
  else if(dir==='down'&&front){row(10,6,7,c1);row(10,12,13,c1);p.set(9,10,PAL.gold).set(10,10,PAL.gold);}
  else if((dir==='left'||dir==='right')&&!front){ // side view: streams out behind the shoulders
    for(let y=9;y<=16;y++){const back=Math.min(19,14+Math.round((y-9)*.5)+(y>=13?Math.abs(sw):0));row(y,11,back,c1);p.set(back,y,c2);}
    for(let y=11;y<=16;y+=2)p.set(15+(y>13?1:0),y,c2);p.set(12,9,PAL.gold);
    if(dir==='right'){const q=new Array(400).fill(null);for(let y=0;y<20;y++)for(let x=0;x<20;x++)q[y*20+(19-x)]=p.get(x,y);p.p=q;}}
  if(!any){return CAPE_CACHE[key]=null;}p.outline();return CAPE_CACHE[key]=p.canvas();}
// Auras: legendary and one-of-one gear make the wearer glow.
function auraColors(look,lantern){const out=[];const C=look.cape&&CAPES[look.cape];if(C&&(C.r==='legendary'||C.r==='mythic'))out.push(C.aura||'#ffcd75');
  if(look.helm==='partyhat')out.push('#73eff7');if(look.helm==='greenhat')out.push('#a7f070');const L=lantern&&LANTERNS[lantern];if(L&&(L.r==='legendary'||L.r==='mythic'))out.push(L.aura||'#b8f7ff');return out;}
const HERO_CACHE={};
function heroImg(look,dir,frame){const k=[look.skin,look.hair,look.cloth,look.style,look.armor||'none',look.cape||'',look.helm||'',dir,frame].join('|');return HERO_CACHE[k]||(HERO_CACHE[k]=heroFrame(dir,frame,look));}
// lantern carried by the hero (drawn separately so its glow can pulse)
function lanternSprite(key){const L=LANTERNS[key]||LANTERNS.basic,m=L.metal,gl=L.glow,p=new Px(6,8);
  p.rect(2,0,2,1,m).rect(1,1,4,1,m).rect(1,2,4,4,gl).rect(2,3,2,2,PAL.white).rect(1,6,4,1,m);if(L.r==='legendary'||L.r==='mythic'||L.r==='xrare')p.set(0,3,gl).set(5,3,gl);p.outline();return p.canvas();}
function swordSprite(tier){const p=new Px(16,16);const blade=tier==='ember'?PAL.ember:tier==='iron'?PAL.white:tier==='copper'?PAL.orange:PAL.silver;
  for(let i=0;i<9;i++){p.set(4+i,11-i,blade);p.set(5+i,11-i,i<8?(tier==='ember'?PAL.red:PAL.silver):blade);}
  p.rect(2,11,4,2,PAL.olive).set(3,13,PAL.bark).set(2,14,PAL.bark);p.set(1,12,PAL.gold).set(6,10,PAL.gold);p.outline();return p.canvas();}

// ---------- enemies ----------
function slimeFrame(f,col,col2,big){const s=big?32:16,p=new Px(s,s),k=big?2:1;
  const sq=f?1:0;p.ell(s/2,s-5*k+sq*k,6.5*k+sq*k,5*k-sq*k,col);p.ell(s/2,s-4*k+sq*k,6.5*k+sq*k,3*k-sq*k,col2);
  p.rect(s/2-4*k,s-8*k+sq*k,2*k,2*k,PAL.white).set(s/2-4*k,s-8*k+sq*k,PAL.white);
  p.rect(s/2-2*k,s-6*k+sq*k,k,2*k,PAL.ink).rect(s/2+2*k,s-6*k+sq*k,k,2*k,PAL.ink);
  p.ell(s/2-3.5*k,s-8.5*k+sq*k,1.2*k,.8*k,PAL.white);
  if(big){p.rows(s/2-6,4+sq*2,['g.g.g.g.g','ggggggggg','gyygygyyg','ggggggggg'].map(r=>r),{g:PAL.gold,y:PAL.red});}
  p.outline();return p.canvas();}
function batFrame(f){const p=new Px(16,16);p.ell(8,8,2.5,2.5,PAL.plum);
  if(f){p.line(6,7,2,4,PAL.plum).line(6,8,1,6,PAL.plum).line(3,5,2,8,PAL.plum).line(10,7,14,4,PAL.plum).line(10,8,15,6,PAL.plum).line(13,5,14,8,PAL.plum);}
  else{p.line(6,8,2,11,PAL.plum).line(6,9,1,9,PAL.plum).line(3,10,2,12,PAL.plum).line(10,8,14,11,PAL.plum).line(10,9,15,9,PAL.plum).line(13,10,14,12,PAL.plum);}
  p.set(7,6,PAL.plum).set(9,6,PAL.plum);p.set(7,8,PAL.red).set(9,8,PAL.red);p.outline();return p.canvas();}
function crawlerFrame(f){const p=new Px(16,16);p.ell(8,10,5,3.5,PAL.fern);p.ell(8,9,4,2,PAL.lime);
  [[3,0],[6,1],[10,1],[13,0]].forEach(([x,o],i)=>{const dy=(i+f)%2;p.line(x,11,x+(x<8?-1:1),14-dy,PAL.moss);});
  p.ell(13,9,2.4,2.4,PAL.fern);p.set(14,8,PAL.yellow);p.rect(5,7,1,1,PAL.pink).rect(9,7,1,1,PAL.pink).rect(7,6,1,1,PAL.pink);p.outline();return p.canvas();}
function skeletonFrame(f){const p=new Px(16,16);
  p.ell(8,4.5,3.6,3.4,PAL.bone);p.rect(6,4,2,2,PAL.ink).rect(9,4,2,2,PAL.ink);p.rect(7,7,3,1,PAL.bone).set(8,7,PAL.ink);
  p.rect(7,8,2,4,PAL.bone);for(let y=8;y<12;y+=2)p.rect(5,y,6,1,PAL.bone);
  p.rect(4,8,1,4,PAL.bone).rect(11,8,1,4,PAL.bone);p.rect(6,12,1,3-f,PAL.bone).rect(9,12,1,2+f,PAL.bone);
  p.line(12,6,15,2,PAL.silver);p.set(12,7,PAL.olive);p.outline();return p.canvas();}
function wispFrame(f){const p=new Px(16,16);p.ell(8,9,4,4,PAL.cyan);p.ell(8,10,2.6,2.6,PAL.white);
  p.line(6,6,5+f,1,PAL.cyan).line(8,5,8,0+f,PAL.cyan).line(10,6,11-f,2,PAL.cyan);p.set(7,9,PAL.navy).set(9,9,PAL.navy);p.outline(PAL.teal);return p.canvas();}
function spiderFrame(f){const p=new Px(16,16);p.ell(8,9,3.6,3,PAL.ink);p.ell(8,6,2.4,2,PAL.dusk);
  for(let i=0;i<4;i++){const y=7+i*2,d=(i+f)%2;p.line(5,y,1,y-2+d*2,PAL.dusk);p.line(11,y,15,y-2+d*2,PAL.dusk);}
  p.set(7,6,PAL.red).set(9,6,PAL.red).set(8,5,PAL.red);p.rect(7,10,2,1,PAL.red);p.outline(PAL.night);return p.canvas();}
function shadeFrame(f){const p=new Px(16,16);p.ell(8,7,4.5,5,PAL.night);for(let x=4;x<=12;x+=2)p.rect(x,11,1,3+((x/2+f)%2),PAL.night);
  p.set(6,6,PAL.pink).set(10,6,PAL.pink);p.outline(PAL.plum);return p.canvas();}
function knightFrame(f){const p=new Px(32,32);
  p.rect(9,12,14,12,PAL.slate);p.rect(10,13,12,10,PAL.silver);p.rect(15,13,2,10,PAL.slate);
  p.ell(16,8,6,6,PAL.bone);p.rect(12,5,8,3,PAL.slate);p.rect(12,8,3,3,PAL.ink).rect(17,8,3,3,PAL.ink);p.set(13,9,PAL.red).set(18,9,PAL.red);
  p.rect(13,12,6,1,PAL.bone);p.rows(10,0,['....r.r....','...rrrrr...'],{r:PAL.red});
  p.rect(10,24,4,6-f,PAL.slate).rect(18,24,4,5+f,PAL.slate);
  p.rect(2,12,7,12,PAL.navy);p.rect(3,13,5,10,PAL.blue);p.rect(5,15,1,6,PAL.gold).rect(4,17,3,1,PAL.gold);
  p.line(24,22,30,4,PAL.white);p.line(25,22,31,4,PAL.silver);p.rect(22,21,5,2,PAL.olive);
  p.outline();return p.canvas();}

// ---------- tiles ----------
function grassTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,PAL.green);
  for(let i=0;i<14;i++)p.set(r()*16,r()*16,r()<.5?PAL.fern:PAL.lime);
  for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0;p.set(x,y,PAL.fern).set(x+1,y-1,PAL.fern).set(x+2,y,PAL.fern);}return p.canvas();}
function pathTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,PAL.tan);
  for(let i=0;i<10;i++)p.set(r()*16,r()*16,PAL.wood);for(let i=0;i<4;i++){const x=r()*15|0,y=r()*15|0;p.rect(x,y,2,1,PAL.yellow);}return p.canvas();}
function waterTile(f){const p=new Px(16,16);p.rect(0,0,16,16,PAL.blue);
  for(let y=2;y<16;y+=5)for(let x=(y+f*3)%8;x<16;x+=8){p.rect(x,y,3,1,PAL.sky);}p.set((5+f*4)%16,9,PAL.cyan);return p.canvas();}
function soilTile(wet){const p=new Px(16,16);p.rect(0,0,16,16,wet?PAL.soil:PAL.bark);
  for(let y=2;y<16;y+=4)p.rect(1,y,14,1,wet?PAL.bark:PAL.soil);p.rect(0,0,16,1,PAL.wood).rect(0,0,1,16,PAL.wood);return p.canvas();}
const BIOMES={
  moss:{floor:[PAL.cave,PAL.cave2,PAL.moss],wall:[PAL.dusk,PAL.slate,PAL.fern],accent:PAL.fern,light:'#7fffb0',name:'Mossroot Caverns'},
  crypt:{floor:[PAL.dusk,PAL.cave2,PAL.slate],wall:[PAL.ink,PAL.slate,PAL.silver],accent:PAL.bone,light:'#b7d4ff',name:'Bone Crypts'}
};
function floorTile(b,seed){const B=BIOMES[b],p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,B.floor[0]);
  if(b==='crypt'){for(let y=0;y<16;y+=8){p.rect(0,y,16,1,PAL.ink);const o=(y/8)%2?4:0;for(let x=o;x<16;x+=8)p.rect(x,y,1,8,PAL.ink);}
    for(let i=0;i<8;i++)p.set(r()*16,r()*16,B.floor[1]);}
  else{for(let i=0;i<12;i++){const x=r()*15|0,y=r()*15|0;p.rect(x,y,2,1,B.floor[1]);}for(let i=0;i<5;i++)p.set(r()*16,r()*16,B.floor[2]);}
  return p.canvas();}
function wallTile(b,face,seed){const B=BIOMES[b],p=new Px(16,16),r=rng(seed);
  if(face){p.rect(0,0,16,16,B.wall[1]);p.rect(0,0,16,4,B.wall[2]);p.rect(0,13,16,3,B.wall[0]);
    if(b==='crypt'){for(let y=4;y<13;y+=4){p.rect(0,y,16,1,B.wall[0]);for(let x=(y%8?0:4);x<16;x+=8)p.rect(x,y,1,4,B.wall[0]);}}
    else{for(let i=0;i<8;i++){const x=r()*14|0,y=4+(r()*8|0);p.rect(x,y,3,1,B.wall[0]);}for(let i=0;i<4;i++)p.set(r()*16,r()*4,PAL.lime);}}
  else{p.rect(0,0,16,16,B.wall[0]);for(let i=0;i<10;i++)p.set(r()*16,r()*16,B.wall[1]);}
  return p.canvas();}
function stairsTile(){const p=new Px(16,16);p.rect(0,0,16,16,PAL.ink);for(let i=0;i<5;i++){p.rect(1+i,2+i*3,14-2*i,2,i%2?PAL.slate:PAL.silver);}p.rect(6,14,4,2,PAL.night);return p.canvas();}
function chestSprite(open){const p=new Px(16,16);p.rect(2,6,12,8,PAL.wood);p.rect(2,6,12,2,PAL.bark);p.rect(2,10,12,1,PAL.bark);p.rect(7,9,2,3,PAL.gold);
  if(open){p.rect(2,3,12,3,PAL.bark);p.rect(4,6,8,2,PAL.yellow);}else p.rect(2,4,12,2,PAL.wood);p.outline();return p.canvas();}
function torchSprite(f){const p=new Px(8,12);p.rect(3,6,2,6,PAL.wood);p.ell(4,4,2+f*.3,3,PAL.ember);p.ell(4,4.5,1,1.6,PAL.yellow);p.outline();return p.canvas();}
function oreSprite(kind){const c={copper:[PAL.orange,PAL.yellow],iron:[PAL.silver,PAL.white],ember:[PAL.ember,PAL.red]}[kind];const p=new Px(16,16);
  [[4,5],[10,4],[7,10],[12,11],[3,12]].forEach(([x,y])=>{p.rect(x,y,2,2,c[0]);p.set(x,y,c[1]);});return p.canvas();}
// Emberite: a lump of dark basalt split by molten cracks. Two frames so the lava pulses.
function emberOreSprite(f){const p=new Px(16,16),crust='#170a10',crust2='#2a121c';
  p.ell(8,9,6.5,5.5,crust);p.ell(7,8,4,3,crust2);p.set(4,6,crust2).set(11,12,crust2);
  const cracks=[[2,10,6,8],[6,8,11,10],[11,10,14,8],[6,8,7,4],[8,9,9,13],[11,10,12,13]];
  for(const [a,b,c,d] of cracks)p.line(a,b,c,d,PAL.red);
  for(const [a,b,c,d] of cracks.slice(0,4))p.line(a+(c>a?1:0),b,c,d,f?PAL.yellow:PAL.ember);
  p.set(6,8,PAL.yellow).set(11,10,PAL.yellow).set(f?9:4,f?11:9,PAL.yellow).set(f?7:12,f?5:9,PAL.ember);
  if(f)p.set(8,14,PAL.ember).set(12,14,PAL.red);else p.set(8,14,PAL.red);
  p.outline('#120a10');return p.canvas();}
function glowcapSprite(){const p=new Px(16,16);[[5,9,3],[10,11,2.4],[8,13,2]].forEach(([x,y,r])=>{p.rect(x,y,1,4,PAL.bone);p.ell(x+.5,y,r,r*.7,PAL.pink);p.set(x,y-1,PAL.white);});p.outline(PAL.plum);return p.canvas();}
function bonesSprite(){const p=new Px(16,16);p.line(3,12,10,9,PAL.bone).line(5,8,12,13,PAL.bone);p.ell(12,6,2.4,2,PAL.bone);p.set(11,6,PAL.ink).set(13,6,PAL.ink);p.outline();return p.canvas();}

// ---------- the Hold ----------
// admin badge: a small gold crown with an "A", shown before admin names
function crownSprite(){const p=new Px(13,13),G='#ffcd75',D='#d9a066',H='#fff3c4',R='#e43b44',I='#1a1c2c';
  p.rows(1,1,['h....r....h','g...ggg...g','gg..ggg..gg','ggg.ggg.ggg','ggggggggggg','ddddddddddd','ddddddddddd','ddddddddddd','ddddddddddd','ddddddddddd','ggggggggggg'],{g:G,d:D,h:H,r:R});
  for(const [x,y] of [[5,5],[4,6],[6,6],[4,7],[5,7],[6,7],[4,8],[6,8],[4,9],[6,9]])p.set(x+1,y+1,I);
  p.outline();return p.canvas();}
function stumpSprite(){const p=new Px(32,32);p.rect(12,23,8,6,PAL.bark).rect(13,23,6,1,PAL.tan).rect(14,24,4,1,PAL.wood);p.rect(10,28,3,2,PAL.bark).rect(19,28,3,2,PAL.bark);p.ell(16,30,6,2,null);p.outline();return p.canvas();}
function axeSprite(){const p=new Px(10,12);p.rect(4,2,2,10,PAL.wood).rect(5,2,1,10,PAL.bark);p.rect(5,1,4,4,'#94b0c2').rect(8,0,1,6,'#c2d3e0').rect(6,2,2,1,'#566c86');p.outline();return p.canvas();}
function treeSprite(dx=0){const p=new Px(32,32);p.rect(14,20,4,10,PAL.bark).rect(15,20,1,10,PAL.wood);
  p.ell(16+dx,13,11,10,PAL.fern);p.ell(14+dx,11,8,7,PAL.green);p.ell(12+dx*1.5,9,4,3,PAL.lime);p.ell(16,30,6,2,null);p.outline();return p.canvas();}
function bankSprite(){const p=new Px(48,48),st='#94b0c2',st2='#566c86',st3='#c2d3e0',roof='#333c57',G=PAL.gold;
  // pediment roof
  for(let y=0;y<10;y++){const w=8+y*4;p.rect(24-w/2,6+y,w,1,y<2?st3:roof);}p.rect(2,16,44,3,st3);p.rect(2,18,44,1,st2);
  // coin emblem in the pediment
  p.ell(24,11,3.2,3.2,G);p.ell(24,11,1.8,1.8,'#ffcd75');p.set(24,10,PAL.olive).set(24,11,PAL.olive).set(24,12,PAL.olive);
  // walls + columns
  p.rect(4,19,40,24,st);for(const x of [6,14,30,38]){p.rect(x,19,4,24,st3);p.rect(x+3,19,1,24,st2);p.rect(x-1,19,6,2,st3);p.rect(x-1,41,6,2,st2);}
  // vault door
  p.rect(19,25,10,18,roof);p.rect(20,26,8,17,'#29366f');p.ell(24,33,2.5,2.5,G);p.set(24,33,PAL.olive);p.rect(19,24,10,1,G);
  // steps + sign
  p.rect(2,43,44,2,st2);p.rect(0,45,48,3,'#333c57');p.rect(20,20,8,3,PAL.wood);p.rect(21,21,6,1,G);
  p.outline();return p.canvas();}
function houseSprite(){const p=new Px(48,48);
  p.rect(6,22,36,22,PAL.wood);for(let y=24;y<44;y+=4)p.rect(6,y,36,1,PAL.bark);
  for(let i=0;i<20;i++)p.rect(4+i,22-i,40-2*i,1,i%3?PAL.red:PAL.plum);
  p.rect(20,32,8,12,PAL.bark).rect(21,33,6,11,PAL.soil).set(26,38,PAL.gold);
  p.rect(10,28,7,6,PAL.yellow).rect(13,28,1,6,PAL.bark).rect(10,31,7,1,PAL.bark);
  p.rect(31,28,7,6,PAL.yellow).rect(34,28,1,6,PAL.bark).rect(31,31,7,1,PAL.bark);
  p.rect(33,4,5,10,PAL.slate).rect(33,4,5,2,PAL.silver);p.outline();return p.canvas();}
function forgeSprite(f){const p=new Px(48,40);
  p.rect(4,12,40,26,PAL.slate);for(let y=14;y<38;y+=4){p.rect(4,y,40,1,PAL.dusk);for(let x=(y%8?4:8);x<44;x+=8)p.rect(x,y,1,4,PAL.dusk);}
  p.rect(2,8,44,5,PAL.dusk);p.rect(34,0,8,9,PAL.slate);p.rect(34,0,8,2,PAL.silver);
  p.ell(18,28,8,7,PAL.ink);p.ell(18,29,6,5,f?PAL.ember:PAL.orange);p.ell(18,30,3,3,PAL.yellow);
  p.rect(30,26,10,4,PAL.dusk).rect(32,24,6,2,PAL.ink).rect(29,30,3,6,PAL.dusk);p.outline();return p.canvas();}
function kitchenSprite(f){const p=new Px(32,32);
  p.rect(2,4,28,3,PAL.red);for(let x=2;x<30;x+=6)p.rect(x,4,3,3,PAL.white);
  p.rect(4,7,2,20,PAL.wood).rect(26,7,2,20,PAL.wood);
  p.ell(16,22,8,6,PAL.dusk);p.ell(16,19,7,2,PAL.slate);p.ell(16,19,5,1.4,PAL.lime);
  p.rect(10,27,12,3,PAL.ember);p.set(12,26,PAL.yellow).set(18,26,PAL.yellow);
  [[13,15-f],[16,13+f],[19,15-f]].forEach(([x,y])=>p.set(x,y,PAL.white));p.outline();return p.canvas();}
function pressSprite(){const p=new Px(32,32);
  p.rect(4,10,24,4,PAL.wood).rect(6,4,3,26,PAL.bark).rect(23,4,3,26,PAL.bark).rect(4,3,24,3,PAL.wood);
  p.rect(14,6,4,10,PAL.slate).rect(12,15,8,2,PAL.slate);
  p.ell(16,24,7,6,PAL.wood);for(let y=20;y<30;y+=3)p.rect(9,y,14,1,PAL.bark);p.rect(10,22,2,4,PAL.gold);
  p.rect(25,22,5,7,PAL.yellow).rect(26,20,3,2,PAL.olive);p.outline();return p.canvas();}
function boardSprite(){const p=new Px(32,32);p.rect(6,20,2,11,PAL.bark).rect(24,20,2,11,PAL.bark);
  p.rect(3,4,26,18,PAL.wood);p.rect(4,5,24,16,PAL.tan);
  [[6,7,7,6,PAL.white],[15,6,6,5,PAL.yellow],[22,8,5,7,PAL.white],[8,14,6,5,PAL.yellow],[17,13,8,6,PAL.white]].forEach(([x,y,w,h,c])=>{p.rect(x,y,w,h,c);p.rect(x+1,y+1,w-2,1,PAL.slate);p.set(x+w/2|0,y,PAL.red);});
  p.rect(3,2,26,3,PAL.red);p.outline();return p.canvas();}
function gateSprite(){const p=new Px(48,40);
  p.ell(24,26,23,18,PAL.slate);p.ell(24,24,22,16,PAL.silver);p.ell(24,30,13,13,PAL.ink);p.rect(11,30,26,10,PAL.ink);
  for(let i=0;i<10;i++)p.set(6+((i*13)%36),14+((i*7)%14),PAL.dusk);
  p.rect(6,22,2,14,PAL.bark).rect(40,22,2,14,PAL.bark);p.rect(5,18,4,5,PAL.yellow).rect(39,18,4,5,PAL.yellow);
  p.rect(18,34,12,1,PAL.slate).rect(16,37,16,1,PAL.slate);p.outline();return p.canvas();}
function fenceSprite(){const p=new Px(16,16);p.rect(0,6,16,2,PAL.wood).rect(0,11,16,2,PAL.wood);p.rect(2,3,2,12,PAL.bark).rect(12,3,2,12,PAL.bark);p.outline();return p.canvas();}
function flowerSprite(c){const p=new Px(16,16);[[4,6],[11,9],[6,12]].forEach(([x,y])=>{p.set(x,y+1,PAL.fern);p.rect(x-1,y,3,1,c);p.rect(x,y-1,1,3,c);p.set(x,y,PAL.yellow);});return p.canvas();}
function wellSprite(){const p=new Px(32,32);p.ell(16,22,10,6,PAL.slate);p.ell(16,21,8,4,PAL.blue);p.rect(5,6,2,16,PAL.bark).rect(25,6,2,16,PAL.bark);
  for(let i=0;i<8;i++)p.rect(3+i,6-i/2|0,26-2*i,1,PAL.red);p.rect(15,6,2,10,PAL.bone);p.outline();return p.canvas();}

// ---------- crops ----------
function cropSprite(kind,stage){const p=new Px(16,16);
  const c={wheat:[PAL.lime,PAL.yellow,PAL.gold],lampseed:[PAL.green,PAL.yellow,PAL.ember],glowcap:[PAL.pink,PAL.pink,PAL.white]}[kind];
  if(stage===0){p.set(5,11,PAL.lime).set(10,11,PAL.lime).set(8,9,PAL.lime);}
  else if(kind==='glowcap'){const r=stage===1?1.5:2.6;[[5,10],[11,11],[8,8]].forEach(([x,y])=>{p.rect(x,y,1,3,PAL.bone);p.ell(x+.5,y,r,r*.7,c[0]);if(stage===2)p.set(x,y-1,PAL.white);});}
  else{for(const x of [4,8,12]){const h=stage===1?4:8;p.rect(x,14-h,1,h,PAL.green);p.set(x-1,12,PAL.green);
    if(stage===2){if(kind==='wheat')p.rect(x-1,14-h-2,3,3,c[2]);else{p.ell(x+.5,14-h-1,1.8,1.8,c[1]);p.set(x,14-h-1,c[2]);}}}}
  p.outline();return p.canvas();}

// ---------- item icons (16x16) ----------
function fishIcon(p,a,b,c){p.ell(7,9,5,3,a);p.ell(7,10,5,2,b);p.rows(11,6,['c..','cc.','ccc','cc.','c..','...'],{c});p.rect(4,8,1,1,PAL.ink);p.line(5,11,9,11,c);}
function lanternIcon(k){const L=LANTERNS[k],p=new Px(16,16),m=L.metal;p.rect(6,1,4,1,m).rect(7,0,2,1,m);p.rect(4,2,8,2,m);p.rect(4,4,8,8,L.glow);p.rect(5,5,6,6,PAL.white);p.rect(7,6,2,4,L.glow);
  p.rect(4,4,1,8,m).rect(11,4,1,8,m);p.rect(4,12,8,2,m);p.rect(5,14,6,1,shade(m,.7));if(L.r==='legendary'||L.r==='mythic'){p.set(2,6,L.glow).set(13,6,L.glow).set(3,9,L.glow).set(12,9,L.glow);}p.outline();return p.canvas();}
function capeIcon(k){const C=CAPES[k],p=new Px(16,16);
  p.rect(4,2,8,1,C.c2);p.rect(3,3,10,10,C.c1);p.rect(2,6,1,7,C.c1).rect(13,6,1,7,C.c1);p.rect(3,12,10,1,C.c2);p.rect(5,4,1,8,C.c2).rect(10,4,1,8,C.c2);p.rect(2,13,3,1,C.c2).rect(7,13,2,1,C.c2).rect(11,13,3,1,C.c2);
  p.rect(7,2,2,2,PAL.gold);p.set(7,2,PAL.yellow);p.outline();return p.canvas();}
function icon(id){if(ITEMS[id]&&ITEMS[id].lantern)return lanternIcon(ITEMS[id].lantern);if(ITEMS[id]&&ITEMS[id].cape)return capeIcon(ITEMS[id].cape);const p=new Px(16,16);
  const ore=(a,b)=>{p.ell(8,9,5,4,PAL.slate);p.ell(7,8,3,2,PAL.silver);p.rect(5,8,2,2,a).rect(9,7,2,2,a).rect(8,10,2,2,b);};
  switch(id){
    case 'gold':p.ell(8,9,5,5,PAL.gold);p.ell(8,9,3,3,PAL.yellow);p.rect(7,7,2,4,PAL.olive);break;
    case 'copper_ore':ore(PAL.orange,PAL.yellow);break;
    case 'iron_ore':ore(PAL.white,PAL.silver);break;
    case 'ember_ore':p.ell(8,9,5,4,'#2b1620');p.ell(7,8,3,2,'#45202c');p.line(4,10,7,8,PAL.red).line(7,8,11,10,PAL.red).line(7,8,8,5,PAL.red);p.line(5,9,7,8,PAL.ember).line(8,8,10,9,PAL.ember);p.set(7,8,PAL.yellow).set(10,9,PAL.yellow);p.outline('#120a10');break;
    case 'gem':p.rows(4,3,['..cc..','.cbbc.','cbbbac','cbbaac','.caac.','..cc..','......'],{c:PAL.sky,b:PAL.cyan,a:PAL.blue});p.set(6,4,PAL.white);break;
    case 'slime_gel':p.ell(8,10,5,4,PAL.green);p.ell(7,9,2,1.5,PAL.lime);p.set(6,8,PAL.white);break;
    case 'logs':p.rect(2,8,12,4,PAL.bark);p.rect(2,8,12,1,PAL.wood);p.rect(4,4,11,4,PAL.bark);p.rect(4,4,11,1,PAL.wood);p.ell(3,10,2,2,PAL.tan);p.set(3,10,PAL.wood);p.ell(14,6,2,2,PAL.tan);p.set(14,6,PAL.wood);break;
    case 'bone':p.line(4,12,12,4,PAL.bone);p.line(5,12,12,5,PAL.bone);p.rect(3,11,2,3,PAL.bone).rect(11,3,3,2,PAL.bone);break;
    case 'wheat_seed':p.rect(5,7,6,7,PAL.wood);p.rect(5,6,6,2,PAL.bark);p.rect(7,9,2,3,PAL.yellow);break;
    case 'lampseed':p.ell(8,9,3.5,4.5,PAL.olive);p.ell(8,8,2,3,PAL.yellow);p.set(7,6,PAL.white);break;
    case 'glowcap_spore':p.ell(8,9,4,4,PAL.plum);[[6,8],[9,7],[8,11],[10,10]].forEach(([x,y])=>p.set(x,y,PAL.pink));break;
    case 'wheat':p.line(5,14,10,3,PAL.green);p.line(7,14,11,4,PAL.green);p.rect(9,2,4,5,PAL.gold);p.rect(10,3,2,3,PAL.yellow);break;
    case 'glowcap':p.rect(7,9,2,5,PAL.bone);p.ell(8,7,5,3,PAL.pink);p.set(6,6,PAL.white).set(9,5,PAL.white);break;
    case 'bread':p.ell(8,10,6,4,PAL.wood);p.ell(8,9,5,3,PAL.tan);[5,8,11].forEach(x=>p.set(x,8,PAL.wood));break;
    case 'stew':p.ell(8,11,6,3.5,PAL.wood);p.ell(8,9,5,1.6,PAL.lime);p.set(6,9,PAL.pink).set(10,9,PAL.orange);p.set(7,5,PAL.white).set(9,4,PAL.white);break;
    case 'oil':p.rect(6,3,4,2,PAL.bark);p.rect(5,5,6,9,PAL.silver);p.rect(6,7,4,6,PAL.ember);p.rect(6,7,4,1,PAL.yellow);break;
    case 'rusty_blade':return swordSprite('none');
    case 'copper_helm':case 'iron_helm':case 'ember_helm':{const C={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d']}[id.split('_')[0]];
      p.ell(8,8,6,5,C[0]);p.rect(2,8,12,5,C[0]);p.rect(2,12,12,1,C[1]);p.rect(5,9,6,2,PAL.ink);p.rect(7,9,2,4,C[0]);p.rect(6,4,4,1,C[2]);p.rect(7,2,2,3,C[1]);break;}
    case 'partyhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#3b5dc9',s:'#73eff7',c:'#29366f'});p.set(7,1,PAL.yellow);break;
    case 'greenhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#38b764',s:'#a7f070',c:'#257179'});p.set(7,1,PAL.yellow);break;
    case 'traveler_garb':p.rect(4,4,8,10,PAL.teal);p.rect(2,4,3,4,PAL.moss).rect(11,4,3,4,PAL.moss);p.rect(6,4,4,2,PAL.ink);p.rect(4,11,8,1,PAL.bark);p.rect(7,6,2,5,PAL.green);break;
    case 'copper_blade':case 'iron_blade':case 'ember_blade':{const t=id.split('_')[0];return swordSprite(t==='ember'?'ember':t);}
    case 'copper_mail':case 'iron_mail':case 'ember_mail':{const t=id.split('_')[0],C=TIER_COLORS[t==='ember'?'ember':t];
      p.rect(4,4,8,10,C.tun);p.rect(2,4,3,4,C.tun2).rect(11,4,3,4,C.tun2);p.rect(6,4,4,2,PAL.ink);p.rect(4,11,8,1,PAL.bark);p.rect(7,6,2,5,C.trim);break;}
    case 'raw_pondfin':fishIcon(p,'#7fb0c8','#41a6f6','#29366f');break;
    case 'pondfin':fishIcon(p,'#d9a066','#a0663b','#6b3e26');p.set(6,4,PAL.white).set(9,3,PAL.white);break;
    case 'burnt_fish':fishIcon(p,'#3a3550','#262b44','#1a1c2c');break;
    case 'relic_crown':p.rows(2,4,['g.g.g.g.g.g','ggggggggggg','gyggrggyggg','ggggggggggg'],{g:PAL.gold,y:PAL.lime,r:PAL.red});p.ell(8,13,5,2,PAL.green);break;
    case 'relic_sigil':p.ell(8,8,5.5,5.5,PAL.silver);p.ell(8,8,4,4,PAL.navy);p.rect(7,5,2,7,PAL.gold).rect(5,7,6,2,PAL.gold);break;
    default:p.rect(4,4,8,8,PAL.pink);}
  p.outline();return p.canvas();}

// ---------- build the atlas ----------
const ART={};
function buildArt(){
  const dirs=['down','up','left','right'];
  
  ART.lantern={};for(const t of Object.keys(LANTERNS))ART.lantern[t]=lanternSprite(t);ART.lantern.none=ART.lantern.basic;
  ART.sword={};for(const t of ['rusty','copper','iron','ember'])ART.sword[t]=swordSprite(t==='rusty'?'none':t);
  ART.slime=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime));
  ART.gelling=[0,1].map(f=>slimeFrame(f,PAL.lime,PAL.white));
  ART.mother=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime,true));
  ART.bat=[0,1].map(batFrame);ART.crawler=[0,1].map(crawlerFrame);
  ART.skeleton=[0,1].map(skeletonFrame);ART.wisp=[0,1].map(wispFrame);ART.spider=[0,1].map(spiderFrame);
  ART.shade=[0,1].map(shadeFrame);ART.knight=[0,1].map(knightFrame);
  ART.grass=[1,2,3,4].map(grassTile);ART.path=[5,6,7].map(pathTile);ART.water=[0,1].map(waterTile);
  ART.soil=soilTile(false);ART.soilWet=soilTile(true);
  ART.floor={};ART.wall={};ART.face={};
  for(const b of Object.keys(BIOMES)){ART.floor[b]=[11,12,13,14].map(s=>floorTile(b,s));ART.wall[b]=[21,22].map(s=>wallTile(b,false,s));ART.face[b]=[31,32,33].map(s=>wallTile(b,true,s));}
  ART.stairs=stairsTile();ART.chest=[chestSprite(false),chestSprite(true)];ART.torch=[0,1].map(torchSprite);
  ART.ore={copper:oreSprite('copper'),iron:oreSprite('iron'),ember:emberOreSprite(0)};ART.emberOre=[emberOreSprite(0),emberOreSprite(1)];
  ART.glowcap=glowcapSprite();ART.bones=bonesSprite();
  ART.partyhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#3b5dc9',s:'#73eff7',c:'#29366f'});q.outline();return q.canvas();})();
  ART.greenhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#38b764',s:'#a7f070',c:'#257179'});q.outline();return q.canvas();})();
  ART.tree=treeSprite();ART.crown=crownSprite();ART.treeSway=[treeSprite(-.6),treeSprite(.6)];ART.stump=stumpSprite();ART.axe=axeSprite();ART.house=houseSprite();ART.bank=bankSprite();ART.forge=[0,1].map(forgeSprite);ART.kitchen=[0,1].map(kitchenSprite);
  ART.press=pressSprite();ART.board=boardSprite();ART.gate=gateSprite();ART.fence=fenceSprite();ART.well=wellSprite();
  ART.flowers=[PAL.pink,PAL.white,PAL.yellow,PAL.sky].map(flowerSprite);
  ART.crop={};for(const k of ['wheat','lampseed','glowcap'])ART.crop[k]=[0,1,2].map(s=>cropSprite(k,s));
  ART.icon={};
}
function iconOf(id){if(!ART.icon[id])ART.icon[id]=icon(id);return ART.icon[id];}
