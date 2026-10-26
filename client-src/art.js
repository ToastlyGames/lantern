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
// The hood style: a real hood with a pointed tip that flops back, a lit rim around a shadowed opening, and a short drape
// over the shoulders that ends in a point (front) or falls down the back.
function hoodHead(p,dir,c,face,face2){const c2=shade(c,.68),hi=shade(c,1.3),dk=shade(c,.42);
  const row=(y,x0,x1,col)=>{for(let x=x0;x<=x1;x++)p.set(x,y,col);};
  const mir=dir==='right',X=x=>mir?15-x:x,set=(x,y,col)=>p.set(X(x),y,col),run=(y,x0,x1,col)=>{for(let x=x0;x<=x1;x++)set(x,y,col);};
  if(dir==='down'){
    row(0,8,9,c);row(1,6,10,c);p.set(10,0,c2);row(2,5,11,c);for(let y=3;y<=8;y++)row(y,4,11,c);row(9,5,10,c);p.set(7,10,c).set(8,10,c);   // tip, hood, drape to a point
    row(2,6,9,hi);for(let y=3;y<=7;y++){p.set(4,y,c2);p.set(11,y,c2);}row(8,4,11,c2);p.set(7,9,c2).set(8,9,c2);
    row(3,5,10,dk);for(let y=4;y<=7;y++){p.set(5,y,dk);p.set(10,y,dk);}                // the dark opening
    row(4,6,9,shade(face,.78));row(5,6,9,face);row(6,6,9,face);row(7,6,9,face2);p.set(6,5,PAL.ink).set(9,5,PAL.ink);
    for(let y=3;y<=7;y++){p.set(4,y,hi);p.set(11,y,c2);}}
  else if(dir==='up'){
    row(0,7,8,c);row(1,6,10,c);p.set(10,1,c2);row(2,5,11,c);for(let y=3;y<=7;y++)row(y,4,11,c);row(8,5,10,c2);p.set(7,9,c2).set(8,9,c2);
    for(let y=2;y<=7;y++)p.set(8,y,c2);row(1,6,8,hi);for(let y=3;y<=6;y++)p.set(4,y,hi);for(let y=3;y<=7;y++)p.set(11,y,c2);}
  else{ // side view (drawn facing left, mirrored for right): the opening at the front, the tip trailing back
    run(0,10,11,c);run(1,7,12,c);set(12,0,c2);set(13,1,c2);run(2,5,12,c);for(let y=3;y<=8;y++)run(y,4,11,c);run(9,5,11,c);run(10,9,11,c);
    run(2,6,9,hi);for(let y=3;y<=7;y++)set(4,y,hi);for(let y=3;y<=9;y++)set(11,y,c2);run(8,5,10,c2);
    run(3,4,8,dk);for(let y=4;y<=7;y++)set(8,y,dk);
    run(4,4,7,shade(face,.78));run(5,4,7,face);run(6,4,7,face);run(7,4,7,face2);set(5,5,PAL.ink);for(let y=4;y<=7;y++)set(4,y,face);set(4,4,shade(face,.78));}
}
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
  if(style==='hood'){hoodHead(p,dir,tun,face,face2);}else{
  p.ell(8,5,4.2,4,cap);
  if(dir==='down'){p.rect(5,4,6,4,face).rect(5,7,6,1,face2);p.set(6,5,PAL.ink).set(9,5,PAL.ink);p.set(5,6,shade(face,.9)).set(10,6,shade(face,.9));p.rect(5,3,6,1,cap2);
    if(style!=='hood'){p.set(5,4,hair).set(10,4,hair);}if(style==='hood')p.rect(4,4,1,4,cap).rect(11,4,1,4,cap);}
  else if(dir==='up'){p.rect(5,7,6,1,cap2);}
  else if(dir==='left'){p.rect(4,4,4,4,face).rect(4,7,4,1,face2);p.set(5,5,PAL.ink);p.rect(4,3,5,1,cap2);}
  else{p.rect(8,4,4,4,face).rect(8,7,4,1,face2);p.set(10,5,PAL.ink);p.rect(7,3,5,1,cap2);}
  if(style==='spiky'){p.set(5,0,hair).set(8,0,hair).set(11,1,hair).set(4,1,hair).set(7,1,hair).set(10,1,hair);}
  p.set(6,2,hairHi).set(7,2,hairHi);}
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
  if(look.flame==='founder')out.push('#b98cff');if(look.helm==='partyhat')out.push('#73eff7');if(look.helm==='greenhat')out.push('#a7f070');const L=lantern&&LANTERNS[lantern];if(L&&(L.r==='legendary'||L.r==='mythic'))out.push(L.aura||'#b8f7ff');return out;}
const HERO_CACHE={};
function heroImg(look,dir,frame){const k=[look.skin,look.hair,look.cloth,look.style,look.armor||'none',look.cape||'',look.helm||'',dir,frame].join('|');return HERO_CACHE[k]||(HERO_CACHE[k]=heroFrame(dir,frame,look));}
// lantern carried by the hero (drawn separately so its glow can pulse)
function lanternSprite(key,flame){const L=LANTERNS[key]||LANTERNS.basic,m=L.metal,gl=flame||L.glow,p=new Px(6,8);   // flame: the Founder's Flame colour
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
// dock planks over the water (transparent gaps between boards and at the sides let the water show through)
function dockTile(kind){const p=new Px(16,16),W='#a0663b',W2='#8a5a3a',D='#6b3e26',HI='#c98a4a';
  const x0=kind==='walk'?2:0,x1=kind==='walk'?14:16;
  for(let y=0;y<16;y+=4){p.rect(x0,y,x1-x0,3,(y/4)%2?W2:W);p.rect(x0,y,x1-x0,1,HI);p.set(x0+3+(y%8),y+1,D).set(x1-4,y+2,D);}
  if(kind==='walk'){p.rect(1,0,1,16,D);p.rect(14,0,1,16,D);p.rect(0,6,2,3,'#4b3226');p.rect(14,6,2,3,'#4b3226');}
  else{p.rect(0,15,16,1,D);p.rect(0,0,2,2,'#4b3226');p.rect(14,0,2,2,'#4b3226');p.rect(0,13,2,3,'#4b3226');p.rect(14,13,2,3,'#4b3226');}
  return p.canvas();}
function lilySprite(f){const p=new Px(8,6);p.ell(3.5,3,3.5,2.5,'#38b764');p.set(3,3,'#2b4b3a').set(4,2,'#2b4b3a');p.set(1,2,'#a7f070');if(f)p.set(6,1,'#e86fd0').set(5,1,'#f4f4f4');return p.canvas();}
// a plot that isn't open yet: hard, weedy ground with a little stake
function lockedSoilTile(){const p=new Px(16,16);p.rect(0,0,16,16,'#5a4a3a');p.rect(0,0,16,1,PAL.wood).rect(0,0,1,16,PAL.wood);
  [[3,4],[11,3],[6,11],[12,12],[2,13]].forEach(([x,y])=>{p.set(x,y,'#38b764').set(x+1,y-1,'#38b764').set(x-1,y-1,'#257179');});
  p.set(5,7,'#4b3226').set(6,7,'#4b3226').set(9,9,'#4b3226');p.rect(12,5,1,6,PAL.wood);p.rect(10,4,5,3,'#e3d2bf');p.set(12,5,'#6b3e26');return p.canvas();}
function soilTile(wet){const p=new Px(16,16);p.rect(0,0,16,16,wet?PAL.soil:PAL.bark);
  for(let y=2;y<16;y+=4)p.rect(1,y,14,1,wet?PAL.bark:PAL.soil);p.rect(0,0,16,1,PAL.wood).rect(0,0,1,16,PAL.wood);return p.canvas();}
const BIOMES={
  moss:{floor:[PAL.cave,PAL.cave2,PAL.moss],wall:[PAL.dusk,PAL.slate,PAL.fern],accent:PAL.fern,light:'#7fffb0',name:'Mossroot Caverns'},
  crypt:{floor:[PAL.dusk,PAL.cave2,PAL.slate],wall:[PAL.ink,PAL.slate,PAL.silver],accent:PAL.bone,light:'#b7d4ff',name:'Bone Crypts'}
};
// ---- dungeon tiles: hand-set flagstones and stone walls, shaded so the Depths read like a real dungeon ----
const DUN={
  moss:{mortar:'#1a1e28',stone:['#2c3441','#29303c','#303846','#272e39'],hi:'#37404e',lo:'#20262f',moss:['#2f4a3c','#3a5c44','#4f7a3a'],
        brick:['#4c5867','#46525f','#52606e'],bhi:'#6a7888',blo:'#2e3641',bmortar:'#1c2129',cap:'#7b8a99'},
  crypt:{mortar:'#17151f',stone:['#3a3850','#353349','#403e58','#33314a'],hi:'#4c4a66',lo:'#25233a',moss:['#3a3550','#423c5c','#4a4466'],
        brick:['#504c6c','#4a4665','#565273'],bhi:'#6f6a92',blo:'#2c2a42',bmortar:'#1c1a29',cap:'#7a7598'}};
function floorTile(b,seed){const D=DUN[b],p=new Px(16,16),r=rng(seed*31+7);p.rect(0,0,16,16,D.mortar);
  const stone=(x,y,w,h)=>{if(w<2||h<2)return;const c=D.stone[r()*D.stone.length|0];p.rect(x,y,w,h,c);
    p.rect(x,y,w,1,D.hi);p.rect(x,y,1,h,D.hi);p.rect(x,y+h-1,w,1,D.lo);p.rect(x+w-1,y,1,h,D.lo);
    if(r()<.35){const cx=x+1+(r()*(w-2)|0),cy=y+1+(r()*(h-2)|0);p.set(cx,cy,D.lo).set(cx+1,cy+1,D.lo);}
    if(r()<.5)p.set(x+1+(r()*(w-2)|0),y+1+(r()*(h-2)|0),D.hi);};
  if(b==='crypt'){const o=seed%2?4:0;stone(0,0,8,8);stone(8,0,8,8);stone(-o+0,8,8,8);stone(8-o,8,8,8);if(o)stone(12,8,4,8);
    if(seed%4===1){p.line(3,2,6,6,D.lo).line(6,6,5,10,D.lo);}}
  else{let y=0;while(y<16){const h=Math.min(16-y,6+(r()*4|0));let x=-(r()*6|0);while(x<16){const w=7+(r()*6|0);stone(Math.max(0,x),y,Math.min(w-1,16-Math.max(0,x)),h-1);x+=w;}y+=h;}
    for(let i=0;i<3;i++)if(r()<.5){const mx=r()*14|0,my=r()*14|0;p.rect(mx,my,2,1,D.moss[0]).set(mx+1,my+1,D.moss[1]);}}
  return p.canvas();}
// wall face = the stone wall you look at, above a floor tile
function wallTile(b,face,seed){const D=DUN[b],p=new Px(16,16),r=rng(seed*17+3);
  if(face){p.rect(0,0,16,16,D.bmortar);
    for(let row=0;row<4;row++){const y=row*4,off=(row%2?4:0)-(seed%3);for(let x=-8+off;x<16;x+=8){const c=D.brick[r()*D.brick.length|0],x0=Math.max(0,x),w=Math.min(x+7,16)-x0;if(w<=0)continue;
        p.rect(x0,y,w,3,c);p.rect(x0,y,w,1,D.bhi);p.rect(x0,y+2,w,1,D.blo);if(r()<.25)p.set(x0+(r()*w|0),y+1,D.blo);}}
    p.rect(0,0,16,1,D.cap);p.rect(0,15,16,1,'#10121c');p.rect(0,14,16,1,D.blo);
    if(b==='moss'){for(let i=0;i<4;i++){const x=r()*16|0,len=1+(r()*5|0);for(let k=0;k<len;k++)p.set(x,k,k===len-1?DUN.moss.moss[2]:DUN.moss.moss[k%2]);}}
  }
  else{p.rect(0,0,16,16,'#0d0e17');for(let i=0;i<6;i++)p.set(r()*16,r()*16,'#151726');}
  return p.canvas();}
function stairsTile(){const p=new Px(16,16);p.rect(0,0,16,16,'#07080e');
  const steps=[['#5a5f78',14,0],['#4b5068',12,1],['#3c4056',10,2],['#2e3144',8,3],['#212333',6,4]];
  steps.forEach(([c,w,i])=>{const x=(16-w)/2|0,y=13-i*3;p.rect(x,y,w,2,c);p.rect(x,y,w,1,'#6d7391');p.rect(x,y+2,w,1,'#141520');});
  p.rect(0,0,1,16,'#2a2d40').rect(15,0,1,16,'#2a2d40');return p.canvas();}
// ---- dungeon dressing, baked into the floor: cobwebs, bones, skulls, rubble, puddles, mushrooms, banners, chains, roots ----
function decoSprites(){const D={};
  {const p=new Px(10,10),c='rgba(220,226,236,.55)';p.line(0,0,9,9,c).line(0,0,9,3,c).line(0,0,3,9,c).line(0,0,7,6,c);p.line(0,4,4,0,c).line(0,7,7,0,c);D.web=p.canvas();}
  {const p=new Px(10,10),c='rgba(220,226,236,.55)';p.line(9,0,0,9,c).line(9,0,0,3,c).line(9,0,6,9,c).line(9,0,2,6,c);p.line(9,4,5,0,c).line(9,7,2,0,c);D.webR=p.canvas();}
  {const p=new Px(8,6);p.set(1,4,'#4b5068').set(2,4,'#5a5f78').set(5,3,'#4b5068').set(6,4,'#3c4056').set(3,2,'#5a5f78');D.pebbles=p.canvas();}
  {const p=new Px(10,8);p.line(1,6,7,3,PAL.bone).line(2,3,8,6,PAL.bone);p.set(1,6,'#b8a880').set(8,6,'#b8a880');D.bones=p.canvas();}
  {const p=new Px(8,8);p.ell(4,3.5,3,3,PAL.bone);p.rect(2,5,4,2,PAL.bone);p.set(3,3,PAL.ink).set(5,3,PAL.ink).set(3,6,'#8a7e62').set(5,6,'#8a7e62');p.outline('#1a1c2c');D.skull=p.canvas();}
  {const p=new Px(12,8);p.rect(1,5,4,3,'#3c4056').rect(5,4,3,4,'#4b5068').rect(8,6,3,2,'#3c4056');p.set(2,5,'#5a5f78').set(6,4,'#5a5f78');D.rubble=p.canvas();}
  {const p=new Px(12,6);p.ell(6,3,5.5,2.4,'#1d2a44');p.ell(6,3,4,1.6,'#24375a');p.set(3,2,'#5f87c4').set(4,2,'#41a6f6');D.puddle=p.canvas();}
  {const p=new Px(10,8);[[2,5,'#73eff7'],[6,4,'#e86fd0'],[8,6,'#73eff7']].forEach(([x,y,c])=>{p.rect(x,y,1,3,PAL.bone);p.rect(x-1,y-1,3,1,c);p.set(x,y-2,PAL.white);});D.shrooms=p.canvas();}
  // wall dressings (drawn on wall faces)
  {const p=new Px(8,14);p.rect(1,0,6,12,'#8f2d3f');p.rect(1,0,6,1,PAL.gold).rect(1,11,6,1,'#5d1f2c');p.set(1,12,'#8f2d3f').set(3,12,'#8f2d3f').set(5,12,'#8f2d3f').set(2,13,'#8f2d3f').set(6,13,'#8f2d3f');
    p.rect(3,4,2,3,PAL.gold).set(4,3,PAL.gold);p.rect(0,0,8,1,'#3a3f55');D.banner=p.canvas();}
  {const p=new Px(6,12);for(let y=0;y<11;y+=2){p.set(y%4?2:3,y,'#6d7391').set(y%4?3:2,y+1,'#4b5068');}p.rect(1,10,4,2,'#4b5068');D.chain=p.canvas();}
  {const p=new Px(8,10);p.line(2,0,3,6,'#6b3e26').line(3,6,2,9,'#6b3e26').line(5,0,6,4,'#4f7a3a');p.set(1,3,'#4f7a3a').set(4,5,'#38b764').set(6,4,'#a7f070').set(2,8,'#38b764');D.roots=p.canvas();}
  return D;}
function chestSprite(open){const p=new Px(16,16);p.rect(2,6,12,8,PAL.wood);p.rect(2,6,12,2,PAL.bark);p.rect(2,10,12,1,PAL.bark);p.rect(7,9,2,3,PAL.gold);
  if(open){p.rect(2,3,12,3,PAL.bark);p.rect(4,6,8,2,PAL.yellow);}else p.rect(2,4,12,2,PAL.wood);p.outline();return p.canvas();}
function torchSprite(f){const p=new Px(8,14);p.rect(2,9,4,1,'#3a3f55').rect(1,8,1,2,'#3a3f55').rect(6,8,1,2,'#3a3f55');p.rect(3,6,2,7,PAL.bark).set(3,6,PAL.wood);
  p.ell(4,4,2.2+f*.4,3.2,PAL.red);p.ell(4,4.4,1.6,2.4,PAL.ember);p.ell(4,5,1,1.5,PAL.yellow);p.set(f?3:5,1,PAL.ember);p.outline();return p.canvas();}
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
// the small crown that sits beside an admin's name tag (7×7 with a tiny A)
function crownSmall(){const p=new Px(9,9),G='#ffcd75',D='#d9a066',R='#e43b44',I='#1a1c2c';
  p.rows(1,1,['g..r..g','gg.g.gg','ddddddd','ddddddd','ddddddd','ddddddd','ggggggg'],{g:G,d:D,r:R});
  for(const [x,y] of [[3,2],[2,3],[4,3],[2,4],[3,4],[4,4],[2,5],[4,5]])p.set(x+1,y+1,I);p.outline();return p.canvas();}
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
// The Delve Gate: a stone archway over stairs that drop into the dark, a lantern hanging in the arch.
function gateSprite(f){const W=64,H=56,p=new Px(W,H),r=rng(41),cx=32;
  const M='#262a3a',S=['#7a869c','#6c778d','#838fa6','#707b92'],HI='#a3aec2',LO='#4f586c';
  const inArchOuter=(x,y)=>y>=26?x>=2&&x<62:((x+.5-cx)/30)**2+((y+.5-27)/25)**2<=1;
  const inOpen=(x,y)=>y>=30?x>=15&&x<49:((x+.5-cx)/17)**2+((y+.5-30)/18)**2<=1;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inArchOuter(x,y)&&!inOpen(x,y))p.set(x,y,M);
  // bricks: courses of 5 px, staggered; voussoirs radiate around the arch
  for(let y=0;y<H;y+=5){const off=(y/5)%2?5:0;for(let x=-10+off;x<W;x+=10){const c=S[r()*S.length|0];
      for(let yy=y;yy<y+4;yy++)for(let xx=x;xx<x+9;xx++){if(!inArchOuter(xx,yy)||inOpen(xx,yy))continue;const ang=Math.atan2(yy-30,xx-cx),dist=Math.hypot(xx-cx,(yy-30)*1.05);
        if(yy<32&&dist>17&&dist<23){const seg=Math.floor((ang+Math.PI)/(Math.PI/9));p.set(xx,yy,seg%2?S[1]:S[2]);if(Math.abs(((ang+Math.PI)/(Math.PI/9))%1)<.12)p.set(xx,yy,M);continue;}
        p.set(xx,yy,yy===y?HI:yy===y+3?LO:c);}}}
  // keystone with a carved lantern
  p.rect(28,8,8,9,'#9aa6bc');p.rect(28,8,8,1,'#c2cbdb');p.rect(28,16,8,1,LO);p.rect(31,10,2,1,PAL.gold);p.rect(30,11,4,4,PAL.gold);p.rect(31,12,2,2,PAL.yellow);
  // the dark mouth and the stairs going down into it (warm light on the near steps)
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inOpen(x,y))p.set(x,y,'#07080e');
  const steps=[[52,46,'#8a6a52','#b48a64'],[48,42,'#6e5444','#8e6c52'],[44,38,'#56423a','#6e5444'],[40,34,'#3f322e','#53413a'],[37,30,'#2c2427','#3a2f2e']];
  steps.forEach(([y,w,c,hi],i)=>{const h=i===0?4:3,x0=cx-w/2;if(y+h>H)return;p.rect(x0,y,w,h,c);p.rect(x0,y,w,1,hi);p.rect(x0,y+h-1,w,1,'#1a1418');});
  // side walls of the stairwell
  for(let y=30;y<H;y++){p.set(15,y,'#3a3f55');p.set(48,y,'#3a3f55');}
  // the hanging lantern
  p.line(cx,14,cx,20,'#4b5068');p.rect(cx-2,20,5,1,'#3a3f55');p.rect(cx-2,21,5,5,f?'#ffd98a':'#ffcd75');p.rect(cx-1,22,3,3,f?PAL.white:'#fff1c4');p.rect(cx-2,26,5,1,'#3a3f55');
  // moss and ivy creeping over the stones
  for(let i=0;i<22;i++){const x=2+(r()*60|0),y=8+(r()*46|0);if(p.get(x,y)&&p.get(x,y)!=='#07080e'&&!inOpen(x,y))p.set(x,y,r()<.5?'#4f7a3a':'#38b764');}
  // plinths at the foot of the arch
  p.rect(2,50,13,6,'#5d6880');p.rect(2,50,13,1,HI);p.rect(49,50,13,6,'#5d6880');p.rect(49,50,13,1,HI);
  p.outline();return p.canvas();}
// lantern post that stands beside the Delve Gate
function lanternPost(f){const p=new Px(14,30);p.rect(6,8,2,22,PAL.bark);p.rect(6,8,1,22,PAL.wood);p.rect(4,28,6,2,'#4b3226');
  p.rect(2,7,10,2,PAL.bark);p.rect(2,9,1,2,'#3a3f55');p.rect(1,11,4,1,'#3a3f55');p.rect(1,12,4,5,f?'#ffe2a0':'#ffcd75');p.rect(2,13,2,3,PAL.white);p.rect(1,17,4,1,'#3a3f55');
  p.outline();return p.canvas();}
// ---- Tallow, the Hold's first merchant: wide-brim hat, teal coat, red scarf, a pack piled high and a lantern on a staff ----
function merchantSprite(f){const p=new Px(26,30),SK='#f0c8a0',SK2='#d9a37a',HAT='#4b3226',HAT2='#3a2519',COAT='#257179',COAT2='#1b5560',SC='#b13e53',BEARD='#c2c7cf',BEARD2='#94a0ad',B=f?1:0;
  // backpack behind (pot, bedroll, a tiny lantern)
  p.rect(14,9+B,9,12,'#6b3e26');p.rect(14,9+B,9,1,'#8a5a3a');p.rect(15,6+B,8,3,'#a0663b');p.rect(15,6+B,8,1,'#d9a066');p.ell(21,7.5+B,2,1.6,'#566c86');p.set(21,6+B,'#94b0c2');
  p.rect(22,13+B,2,3,f?'#ffe2a0':'#ffcd75');p.set(22,12+B,'#3a3f55');
  // staff with a hanging lantern (sways)
  p.rect(2,6,1,23,'#8a5a3a');p.rect(2,6,3,1,'#6b3e26');const lx=f?3:4;p.set(lx,7,'#3a3f55');p.rect(lx-1,8,3,4,'#ffcd75');p.set(lx,9,'#fff3c4');p.rect(lx-1,12,3,1,'#3a3f55');
  // boots and coat
  p.rect(8,26,3,3,'#3a2519').rect(13,26,3,3,'#3a2519');p.rect(7,14+B,10,13-B,COAT);p.rect(7,14+B,1,13-B,COAT2);p.rect(16,14+B,1,13-B,COAT2);p.rect(11,16+B,1,10-B,COAT2);
  p.set(10,18+B,'#f7c64a').set(10,21+B,'#f7c64a').set(10,24,'#f7c64a');p.rect(7,22,10,1,'#6b3e26');p.set(12,22,'#f7c64a');
  // arms: one on the staff, one on the belt
  p.rect(4,15+B,3,2,COAT);p.set(3,15+B,SK).set(3,16+B,SK);p.rect(17,16+B,2,4,COAT);p.set(17,20+B,SK);
  // scarf
  p.rect(8,13+B,8,2,SC);p.rect(13,15+B,2,4,SC);p.set(14,19+B,'#8f2d3f');
  // head: face, bushy grey beard, gold earring
  p.rect(9,7+B,6,6,SK);p.rect(9,11+B,6,1,SK2);p.set(10,9+B,'#1a1c2c').set(13,9+B,'#1a1c2c');p.set(11,10+B,SK2);
  p.rect(9,11+B,6,3,BEARD);p.rect(10,14+B,4,1,BEARD);p.set(9,13+B,BEARD2).set(14,13+B,BEARD2);p.rect(10,11+B,4,1,BEARD2);p.set(15,10+B,'#f7c64a');
  // wide-brim hat with a gold band and a red feather
  p.rect(5,6+B,14,2,HAT);p.rect(5,7+B,14,1,HAT2);p.rect(8,2+B,8,4,HAT);p.rect(8,5+B,8,1,'#f7c64a');p.rect(9,2+B,6,1,'#5f4030');p.line(16,1+B,18,4+B,SC);p.set(17,1+B,'#ef7d57');
  p.outline();return p.canvas();}
// ---- Wick, keeper of the Founders' Ledger: an old lamplighter in a long violet robe with a deep pointed hood, a long white
// beard, a violet-flame lantern on his staff and the big ledger of the first heroes under his arm ----
function wickSprite(f){const p=new Px(26,30),SK='#f0c8a0',SK2='#c99572',H='#6a4596',H2='#4d2f73',HI='#8a63b8',IN='#1f1430',R='#4a2f6e',R2='#36214f',RH='#5f3f8a',GD='#ffcd75',FL='#b98cff',CORE='#f1e4ff',BD='#eef1f5',BD2='#c2c7cf',B=f?1:0;
  const row=(y,x0,x1,c)=>{for(let x=x0;x<=x1;x++)p.set(x,y,c);};
  // staff with a hanging lantern (the flame flickers)
  p.rect(3,6,1,24,'#8a5a3a');p.set(3,29,'#6b3e26');p.rect(2,4,3,1,'#6b3e26');p.set(4,5,'#3a3f55');
  p.rect(1,6,5,1,GD);p.rect(1,7,1,4,GD);p.rect(5,7,1,4,GD);p.rect(2,7,3,4,'#2a1b45');p.rect(3,8-B,1,3+B,FL);p.set(3,9,CORE);if(!f)p.set(2,9,FL);else p.set(4,9,FL);p.rect(1,11,5,1,GD);
  // the robe: narrow at the shoulders, flaring to the ground, with deep folds and a hem that pools over the boots
  for(let y=14;y<=28;y++){const k=Math.floor((y-14)/3),l=8-k,r=18+k;row(y,l,r,R);p.set(l,y,R2);p.set(r,y,R2);}
  for(let y=17;y<=28;y++){p.set(10-(y>23?1:0),y,R2);p.set(16+(y>23?1:0),y,R2);p.set(12,y,RH);}
  row(28,4,22,R2);for(let x=5;x<=21;x+=3)p.set(x,28,R);p.rect(10,29,2,1,'#2a1b45');p.rect(15,29,2,1,'#2a1b45');
  p.rect(13,15,1,13,GD);p.set(13,28,'#f7c64a');
  // a rope belt with a hanging tassel
  row(20,8,18,'#b07c4f');p.set(13,20,'#d9a066');p.set(14,21,'#b07c4f');p.set(14,22,'#d9a066');p.set(14,23,'#d9a066');p.set(13,24,'#b07c4f').set(15,24,'#b07c4f');
  // wide bell sleeves: one reaching for the staff, one cradling the ledger
  row(15,6,9,R);row(16,5,9,R);row(17,4,8,R);row(18,4,7,R2);p.set(4,16,SK).set(4,17,SK);p.set(5,18,IN);
  p.rect(16,17,7,8,'#8f2d3f');p.rect(16,17,7,1,GD);p.rect(16,24,7,1,GD);p.rect(22,18,1,6,'#f4e4c1');p.rect(18,19,3,3,GD);p.set(19,20,'#8f2d3f');
  row(16,17,19,R);row(17,18,20,R);row(18,19,21,R2);p.set(17,21,SK).set(16,21,SK);
  // the hood's drape over the shoulders, its edge falling in points
  row(12+B,8,18,H);row(13+B,7,19,H);row(14+B,7,19,H2);for(let x=7;x<=19;x+=2)p.set(x,15+B,H2);
  // the hood: tall and pointed, the tip flopping back, with a lit rim around a deep dark opening
  row(1+B,15,16,H);row(2+B,13,16,H);row(3+B,11,16,H);row(4+B,10,17,H);for(let y=5;y<=11;y++)row(y+B,9,18,H);
  p.set(17,1+B,H2).set(17,2+B,H2);for(let y=4;y<=11;y++){p.set(9,y+B,H2);p.set(18,y+B,H2);}
  for(let y=5;y<=11;y++)row(y+B,11,16,IN);row(4+B,11,16,HI);for(let y=5;y<=11;y++){p.set(10,y+B,HI);p.set(17,y+B,HI);}
  // the face in the hood's shadow: bushy white brows, kind eyes, a long white beard
  p.rect(12,6+B,4,4,SK);p.rect(12,6+B,4,1,SK2);p.set(12,7+B,BD).set(15,7+B,BD);p.set(12,8+B,IN).set(15,8+B,IN);p.set(13,9+B,SK2).set(14,9+B,SK2);
  row(10+B,11,16,BD);row(11+B,11,16,BD);row(12+B,12,15,BD);row(13+B,12,15,BD);row(14+B,12,15,BD);row(15+B,13,14,BD);p.set(13,16+B,BD);
  p.set(11,11+B,BD2).set(16,11+B,BD2).set(12,14+B,BD2).set(15,14+B,BD2).set(14,16+B,BD2);p.set(13,12+B,BD2);
  p.outline();return p.canvas();}
// Tallow's cart: a striped awning over crates of bread, oil and seed
function stallSprite(){const p=new Px(40,34),A='#b13e53',A2='#f4e4c1',W='#8a5a3a',W2='#6b3e26';
  p.rect(3,6,2,24,W2).rect(35,6,2,24,W2);
  for(let x=1;x<39;x++){const c=Math.floor((x-1)/4)%2?A2:A;p.rect(x,2,1,6,c);if(x%4===2)p.set(x,8,c);}p.rect(1,1,38,1,'#8f2d3f');
  p.rect(2,18,36,8,W);p.rect(2,18,36,1,'#a0663b');p.rect(2,25,36,1,W2);for(let x=6;x<38;x+=8)p.rect(x,19,1,6,W2);
  // goods on the counter
  p.ell(9,16,3,1.8,'#d9a066');p.set(8,15,'#ffcd75');p.ell(14,16,2.4,1.6,'#c98a4a');
  for(const x of [19,22,25]){p.rect(x,13,2,4,'#ef7d57');p.rect(x,12,2,1,'#566c86');p.set(x,14,'#ffcd75');}
  p.rect(29,13,6,5,'#8a6f30');p.rect(29,13,6,1,'#c2a26b');p.set(31,12,'#a7f070').set(33,12,'#38b764');
  // wheels
  p.ell(8,29,3.5,3.5,'#3a2519');p.ell(8,29,2,2,W);p.ell(32,29,3.5,3.5,'#3a2519');p.ell(32,29,2,2,W);
  p.outline();return p.canvas();}
// the east road's signpost
function signSprite(){const p=new Px(18,24);p.rect(8,8,2,16,'#6b3e26');p.rect(8,8,1,16,'#8a5a3a');
  p.rect(1,2,14,7,'#a0663b');p.rect(1,2,14,1,'#d9a066');p.rect(1,8,14,1,'#6b3e26');p.rect(15,3,1,5,'#a0663b');p.set(16,4,'#a0663b').set(16,5,'#a0663b').set(16,6,'#a0663b').set(17,5,'#a0663b');
  p.rect(3,5,8,1,'#4b3226');p.set(10,4,'#4b3226').set(10,6,'#4b3226');p.set(12,4,'#ffcd75').set(13,5,'#ffcd75');p.outline();return p.canvas();}
// the barricade across the opening in the trees (the way to Season 1's new area)
function barricadeSprite(){const p=new Px(20,64),W='#8a5a3a',W2='#6b3e26';
  for(const y0 of [6,34]){p.line(2,y0,17,y0+22,W);p.line(3,y0,18,y0+22,W2);p.line(17,y0,2,y0+22,W);p.line(18,y0,3,y0+22,W2);}
  for(const y of [12,40]){p.rect(1,y,18,3,W);p.rect(1,y,18,1,'#a0663b');}
  p.rect(5,24,10,8,'#b13e53');p.rect(5,24,10,1,'#e43b44');p.rect(7,27,6,1,'#f4f4f4');p.rect(7,29,6,1,'#f4f4f4');
  p.line(0,30,4,26,'#c2a26b');p.line(15,26,19,30,'#c2a26b');p.outline();return p.canvas();}
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
  ART.lanternF={};for(const t of Object.keys(LANTERNS))ART.lanternF[t]=lanternSprite(t,'#b98cff');
  ART.sword={};for(const t of ['rusty','copper','iron','ember'])ART.sword[t]=swordSprite(t==='rusty'?'none':t);
  ART.slime=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime));
  ART.gelling=[0,1].map(f=>slimeFrame(f,PAL.lime,PAL.white));
  ART.mother=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime,true));
  ART.bat=[0,1].map(batFrame);ART.crawler=[0,1].map(crawlerFrame);
  ART.skeleton=[0,1].map(skeletonFrame);ART.wisp=[0,1].map(wispFrame);ART.spider=[0,1].map(spiderFrame);
  ART.shade=[0,1].map(shadeFrame);ART.knight=[0,1].map(knightFrame);
  ART.grass=[1,2,3,4].map(grassTile);ART.path=[5,6,7].map(pathTile);ART.water=[0,1].map(waterTile);
  ART.soil=soilTile(false);ART.soilLocked=lockedSoilTile();ART.dock={walk:dockTile('walk'),deck:dockTile('deck')};ART.lily=[lilySprite(0),lilySprite(1)];ART.soilWet=soilTile(true);
  ART.floor={};ART.wall={};ART.face={};
  for(const b of Object.keys(BIOMES)){ART.floor[b]=[11,12,13,14].map(s=>floorTile(b,s));ART.wall[b]=[21,22].map(s=>wallTile(b,false,s));ART.face[b]=[31,32,33].map(s=>wallTile(b,true,s));}
  ART.stairs=stairsTile();ART.deco=decoSprites();ART.chest=[chestSprite(false),chestSprite(true)];ART.torch=[0,1].map(torchSprite);
  ART.ore={copper:oreSprite('copper'),iron:oreSprite('iron'),ember:emberOreSprite(0)};ART.emberOre=[emberOreSprite(0),emberOreSprite(1)];
  ART.glowcap=glowcapSprite();ART.bones=bonesSprite();
  ART.partyhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#3b5dc9',s:'#73eff7',c:'#29366f'});q.outline();return q.canvas();})();
  ART.greenhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#38b764',s:'#a7f070',c:'#257179'});q.outline();return q.canvas();})();
  ART.tree=treeSprite();ART.crown=crownSprite();ART.crownS=crownSmall();ART.treeSway=[treeSprite(-.6),treeSprite(.6)];ART.stump=stumpSprite();ART.axe=axeSprite();ART.house=houseSprite();ART.bank=bankSprite();ART.forge=[0,1].map(forgeSprite);ART.kitchen=[0,1].map(kitchenSprite);
  ART.press=pressSprite();ART.board=boardSprite();ART.gate=[gateSprite(0),gateSprite(1)];ART.merchant=[merchantSprite(0),merchantSprite(1)];ART.wick=[wickSprite(0),wickSprite(1)];ART.stall=stallSprite();ART.sign=signSprite();ART.barricade=barricadeSprite();ART.lanternPost=[lanternPost(0),lanternPost(1)];ART.fence=fenceSprite();ART.well=wellSprite();
  ART.flowers=[PAL.pink,PAL.white,PAL.yellow,PAL.sky].map(flowerSprite);
  ART.crop={};for(const k of ['wheat','lampseed','glowcap'])ART.crop[k]=[0,1,2].map(s=>cropSprite(k,s));
  ART.icon={};
}
function iconOf(id){if(!ART.icon[id])ART.icon[id]=icon(id);return ART.icon[id];}
