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
  selOutline(){const add=[];for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){if(this.get(x,y))continue;
    const n=[this.get(x,y-1),this.get(x-1,y),this.get(x+1,y),this.get(x,y+1)].filter(Boolean);if(!n.length)continue;
    const below=!this.get(x,y+1)&&this.get(x,y-1);add.push([x,y,below?PAL.ink:mix(shade(n[0],.42),PAL.ink,.55)]);}
    add.forEach(([x,y,c])=>this.set(x,y,c));return this;}
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
  ember:{tun:PAL.red,tun2:PAL.plum,trim:PAL.ember},
  steel:{tun:'#7d8fa3',tun2:'#3e4a5c',trim:'#c9d6e3'},
  gloam:{tun:'#2e4a52',tun2:'#1d2a33',trim:'#7affd6'},tide:{tun:'#24454d',tun2:'#173036',trim:'#73eff7'},voidrobe:{tun:'#2e2a42',tun2:'#1d1a2a',trim:'#c79bf2'}
};
// Appearance options. Expansions can add more swatches/styles here.
const LOOKS={
  skin:['#f6d7bb','#f0c8a0','#d9a066','#b5764a','#8a5634','#5e3a24'],
  hair:['#2a2230','#6b3e26','#a0522d','#e8c66a','#f4f4f4','#b13e53','#3b5dc9','#e86fd0','#38b764','#ef7d57'],
  cloth:['#257179','#3b5dc9','#38b764','#b13e53','#7a3b8f','#ef7d57','#566c86','#333c57','#d9a066','#e86fd0'],
  style:['short','long','spiky','hood','pigtails','ponytail','bun','bob']
};
const DEFAULT_LOOK={skin:1,hair:1,cloth:0,style:0};
function shade(c,f){const [r,g,b]=hex(c);const k=v=>Math.max(0,Math.min(255,Math.round(f<1?v*f:v+(255-v)*(f-1))));return '#'+[k(r),k(g),k(b)].map(v=>v.toString(16).padStart(2,'0')).join('');}
const ARMOR={copper:{m:PAL.orange,m2:PAL.rust,hi:PAL.yellow},iron:{m:PAL.silver,m2:PAL.slate,hi:PAL.white},ember:{m:PAL.red,m2:PAL.plum,hi:PAL.ember},steel:{m:'#7d8fa3',m2:'#3e4a5c',hi:'#c9d6e3'},gloam:{m:'#2e4a52',m2:'#1d2a33',hi:'#7affd6'},
  // robes: long, to the boots, with a glowing hem and sash
  tide:{m:'#24454d',m2:'#173036',hi:'#73eff7',robe:true},voidrobe:{m:'#2e2a42',m2:'#1d1a2a',hi:'#c79bf2',robe:true}};
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
  const face=LOOKS.skin[look.skin??1]||LOOKS.skin[1],face2=shade(face,.82),faceHi=shade(face,1.08),blush=mix(face,'#e8707a',.28);
  const hair=LOOKS.hair[look.hair??1]||LOOKS.hair[1],hair2=shade(hair,.7),hairHi=shade(hair,1.35);
  const tun=LOOKS.cloth[look.cloth??0]||LOOKS.cloth[0],tun2=shade(tun,.68),tunHi=shade(tun,1.18),trim=shade(tun,1.45);
  const style=LOOKS.style[look.style??0]||'short',A=ARMOR[look.armor],girl=FEM_STYLES.includes(style);
  const pants=PAL.navy,pants2=shade(PAL.navy,.72),boot=PAL.bark,boot2=PAL.wood,sole=PAL.soil;
  const lf=step===1?1:0,rf=step===2?1:0;
  const side=dir==='left'||dir==='right',R=dir==='right',X=x=>R?15-x:x;   // side views are drawn facing left, mirrored for right
  const set=(x,y,c)=>p.set(side?X(x):x,y,c),rect=(x,y,w,h,c)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++)set(x+i,y+j,c);};
  // legs (shaded on the inside) and boots (a toe highlight, a darker sole)
  p.rect(5,12,2,3-lf,pants).rect(9,12,2,3-rf,pants);p.rect(6,12,1,3-lf,pants2).rect(10,12,1,3-rf,pants2);
  p.rect(5,15-lf,2,1,boot).rect(9,15-rf,2,1,boot);p.set(5,15-lf,boot2).set(9,15-rf,boot2);
  if(dir==='down'){p.set(6,15-lf,sole).set(10,15-rf,sole);p.set(5,14-lf,shade(boot,1.25)).set(9,14-rf,shade(boot,1.25));}
  else if(dir==='up'){p.set(6,14-lf,shade(boot,.8)).set(10,14-rf,shade(boot,.8));}
  // long hair and tails behind the body
  backHair(p,dir,style,hair,hair2,hairHi,set,rect);
  // tunic: shaded side, a lighter front panel, a hem, a neckline
  p.rect(4,8,8,5,tun).rect(4,12,8,1,tun2).rect(4,8,1,5,tun2);p.rect(11,9,1,3,shade(tun,.84));
  if(dir!=='up'){p.set(5,8,tunHi);p.set(10,12,shade(tun,.8));}   // light on the near shoulder, a fold at the hem
  if(dir==='down'){p.rect(6,9,4,2,tunHi);p.rect(7,8,2,1,face2);p.set(6,8,trim).set(9,8,trim);p.rect(7,9,2,2,trim);p.set(7,10,tun2).set(8,10,tun2);}
  else if(dir==='up'){p.rect(5,8,6,1,tun2);p.rect(6,9,4,2,tunHi);}
  else{rect(5,9,4,2,tunHi);set(5,8,trim);}
  // armor over the clothes
  if(A&&A.robe){p.rect(4,8,8,6,A.m);p.rect(4,8,1,6,A.m2);p.rect(11,9,1,5,A.m2);p.rect(4,13,8,1,A.hi);p.rect(5,14,6,1,A.m2);
    if(dir==='down'){p.rect(7,8,2,5,A.m2);p.set(7,9,A.hi).set(8,11,A.hi);p.set(6,8,A.hi).set(9,8,A.hi);}else if(dir==='up'){p.rect(6,9,4,3,A.m2);}else{rect(5,9,1,4,A.hi);}}
  else if(A){p.rect(5,8,6,3,A.m).rect(5,10,6,1,A.m2);p.set(4,8,A.m2).set(11,8,A.m2);if(dir==='down'){p.rect(6,8,4,1,A.hi);p.set(7,9,A.hi);}else p.rect(5,8,6,1,A.hi);p.set(10,9,A.m2);}
  // belt with a buckle that catches the light
  p.rect(4,11,8,1,boot);if(dir==='down'){p.set(7,11,PAL.gold).set(8,11,PAL.yellow);}else if(dir!=='up')set(5,11,PAL.yellow);
  // arms: sleeve, cuff, hand
  const sl=A?A.m2:tun2,cuff=A?A.m:tun,sw=step===1?1:step===2?-1:0;   // sw: the arms swing opposite the legs
  if(side){const ax=6-sw;rect(ax,9,2,3,sl);set(ax,9,cuff);set(ax,10,shade(sl,1.15));set(ax,12,face);set(ax+1,12,face2);}
  else{const lA=sw>0?1:0,rA=sw<0?1:0;p.rect(3,9,1,3+lA,sl).rect(12,9,1,3+rA,sl);p.set(3,9,cuff).set(12,9,shade(cuff,.85));p.set(3,10,shade(sl,1.15));p.set(3,12+lA,face).set(12,12+rA,face2);}
  // head
  if(style==='hood'){hoodHead(p,dir,tun,face,face2);}
  else{
    p.ell(8,5,4.2,4,hair);
    if(dir==='down'){
      p.rect(5,4,6,4,face).rect(5,7,6,1,face2);p.set(5,4,face2).set(10,4,face2);
      p.set(6,5,'#2a2238').set(9,5,'#2a2238');p.set(6,4,hair2).set(9,4,hair2);p.set(10,5,face2);   // eyes and brows, the far cheek in shade
      p.set(5,6,blush).set(10,6,blush);p.set(7,7,shade(face,.7)).set(8,7,shade(face,.7));      // cheeks, mouth
      p.set(7,5,faceHi).set(8,5,faceHi);
      if(girl)p.set(6,4,PAL.ink).set(9,4,PAL.ink);   // taller eyes with lashes
      p.rect(5,3,6,1,hair2);if(style!=='bob'){p.set(5,4,hair).set(10,4,hair);}
      if(style==='short'||style==='spiky')p.set(4,5,face2).set(11,5,face2);                  // ears
    }
    else if(dir==='up'){p.rect(5,7,6,1,hair2);p.rect(10,3,2,4,hair2);}
    else{rect(4,4,4,4,face);rect(4,7,4,1,face2);set(5,5,PAL.ink);set(5,4,hair2);set(4,6,blush);set(4,7,shade(face,.7));rect(4,3,5,1,hair2);
      if(girl)set(4,5,PAL.ink);
      if(style==='short'||style==='spiky')set(8,5,face2);}
    // shine on top, shading on the far side
    p.set(6,2,hairHi).set(7,2,hairHi).set(5,3,dir==='up'?hairHi:p.get(5,3));if(dir!=='down'&&dir!=='up')set(10,2,hair2);
    p.set(8,1,mix(hair,hairHi,.5));p.set(11,4,hair2);if(dir==='up'){p.set(6,3,hairHi);p.set(9,5,hair2).set(6,6,hair2);}   // a lit crown, strands at the back
    frontHair(p,dir,style,hair,hair2,hairHi,set,rect);
  }
  // helmet on top of the head
  const HM={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d'],steel:['#7d8fa3','#3e4a5c','#c9d6e3'],gloam:['#2e4a52','#1d2a33','#7affd6'],star:['#2c3f86','#1a1c4c','#ffe9a8']}[look.helm];
  if(HM){const [h0,h1,h2]=HM;p.rect(6,1,4,1,h0).rect(5,2,6,1,h0).rect(4,3,8,1,h0).rect(4,4,8,1,h1);p.set(6,1,h2).set(5,2,h2).set(6,2,h2).set(10,3,h1).set(9,2,shade(h0,.85));
    if(dir==='down'){p.set(4,5,h0).set(4,6,h1).set(11,5,h0).set(11,6,h1);p.set(7,4,h2).set(8,4,h2);}                       // cheek guards, a lit nasal
    else if(dir==='up'){p.rect(4,5,8,2,h0).rect(4,7,8,1,h1);p.set(5,5,h2);p.rect(7,1,2,4,shade(h0,.9));}               // the back plate and ridge
    else{set(10,5,h0);set(10,6,h0);set(11,5,h1);set(11,6,h1);set(4,4,h2);rect(9,7,3,1,h1);}}                                // neck guard behind the ear
  if(look.helm==='star'){p.rect(7,0,2,2,'#ffe9a8');p.set(7,0,'#fff3c4');p.set(6,1,'#73eff7').set(9,1,'#73eff7');if(dir==='down')p.set(6,4,'#73eff7').set(9,4,'#73eff7');}
  if(look.helm==='partyhat'){p.rect(5,1,6,2,'#3b5dc9');p.set(6,1,'#73eff7').set(9,2,'#73eff7');p.rect(4,3,8,1,'#29366f');}
  if(look.helm==='greenhat'){p.rect(5,1,6,2,'#38b764');p.set(6,1,'#a7f070').set(9,2,'#a7f070');p.rect(4,3,8,1,'#257179');}
  if(look.ch)cosmeticOver(p,dir,look,set,rect,step);   // a head cosmetic always goes over the hair and helmet
  p.selOutline();
  return p.canvas();
}
const FEM_STYLES=['long','pigtails','ponytail','bun','bob'];
// Cosmetics (v0.13.1): the head one is drawn over the hair and helmet (the helmet stays on underneath); the weapon one
// (the Reaper's Scythe, scytheSprite) replaces how your blade or staff looks, never its stats.
// The Jack-o'-Lantern: a ribbed pumpkin with a curled stem and a leaf, the face carved through to a violet flame inside.
// The carvings flicker in the world (drawJack in game.js); here they're the steady base colour.
const JACK={o:'#f28a2e',o2:'#c2561f',o3:'#7a3418',hi:'#ffb347',hi2:'#ffd98a',stem:'#5a8a3a',stem2:'#2f5a2a',leaf:'#a7f070',cut:'#5d275d',glow:'#a46cf5',core:'#f6ecff'};
const JACK_FACE={down:[[6,3,'g'],[5,4,'g'],[6,4,'c'],[9,3,'g'],[9,4,'c'],[10,4,'g'],     // two triangle eyes
    [4,5,'g'],[11,5,'g'],[5,6,'g'],[6,6,'c'],[8,6,'c'],[9,6,'c'],[10,6,'g'],[6,7,'g'],[7,7,'c'],[9,7,'c'],[10,7,'g']],   // a toothy grin, corners up
  side:[[4,3,'g'],[4,4,'c'],[5,4,'g'],[3,5,'g'],[3,6,'c'],[4,6,'c'],[5,6,'g'],[4,7,'g']]};   // side view drawn facing left
function cosmeticOver(p,dir,look,set,rect,step){
  if(look.ch==='jack'){const J=JACK,side=dir==='left'||dir==='right';
    // clear the head (hair, helmet) so nothing pokes out of the pumpkin
    const W=[[1,5,10],[2,4,11],[3,3,12],[4,3,12],[5,3,12],[6,3,12],[7,4,11],[8,5,10]];
    for(let y=0;y<=2;y++)for(let x=1;x<=14;x++){const r=W.find(w=>w[0]===y);if(!r||x<r[1]||x>r[2])p.set(x,y,null);}   // hair spikes, buns, hat brims
    for(const [y,a,b] of W)for(let x=a;x<=b;x++)p.set(x,y,J.o);
    // ribs: darker grooves, a lit face on each lobe, shadow at the base and the far side
    for(const x of [5,10])for(let y=2;y<=7;y++)if(dir!=='down'||y<3||y>7)p.set(x,y,J.o2);for(let y=1;y<=2;y++)p.set(7,y,J.o2);
    if(dir==='down'){p.set(4,3,J.o2).set(11,3,J.o2);}   // facing you, the ribs bow out around the face
    p.set(4,3,J.hi).set(4,4,J.hi).set(6,2,J.hi2).set(6,3,J.hi).set(8,2,J.hi).set(11,3,J.hi);
    for(let x=5;x<=10;x++)p.set(x,8,J.o3);p.set(4,7,J.o2).set(11,7,J.o3).set(12,5,J.o3).set(12,6,J.o3);
    if(dir!=='down'&&!side){p.set(8,3,J.hi2).set(9,4,J.hi);}                        // the back: just ribs and light
    // the stem, curled, with a little leaf
    p.set(7,0,J.stem).set(8,0,J.stem2).set(8,1,J.stem2).set(7,1,J.stem);p.set(9,0,J.leaf).set(10,0,J.stem);
    if(dir==='down')for(const [x,y,k] of JACK_FACE.down)p.set(x,y,k==='c'?J.core:J.glow);
    else if(side)for(const [x,y,k] of JACK_FACE.side)set(x,y,k==='c'?J.core:J.glow);
  }
}
// The Reaper's Scythe (24x24, the grip at 2,22): a long dark-wood snath with bone wraps, an iron collar set with a violet
// soul-gem, and a great crescent blade whose inner edge burns soul-green. Same diagonal as the swords, so it swings,
// rests and casts the same way.
function scytheSprite(mir){const p=new Px(24,24),wd='#3b2a20',wd2='#6b4a33',wd3='#8a6446',bone='#e8dcc0',bone2='#b8a988',ir='#2a2438',ir2='#4a4560',gem='#c79bf2',gem2='#f3e3ff',
  st='#5d6b80',st2='#a3b4c8',st3='#c9d6e3',edge='#e8f4ff',soul='#9cf0d2';   // a bright moonlit steel so it reads on dark ground
  for(let i=0;i<=14;i++){p.set(2+i,22-i,wd);if(i<14)p.set(3+i,22-i,i%4===1?wd3:wd2);}
  for(const i of [2,3,10]){p.set(2+i,22-i,bone2);p.set(3+i,22-i,bone);}
  p.set(1,23,bone).set(2,23,bone2).set(1,22,bone2);                                     // a bone cap at the butt
  p.rect(15,7,3,3,ir);p.set(17,7,ir2).set(15,9,ir2);p.set(16,8,gem).set(17,8,gem2);       // the collar and soul-gem
  p.set(13,11,ir).set(12,12,ir2);                                                         // a second grip (the nib)
  const spine=[[16,5],[15,4],[14,3],[13,2],[12,2],[11,2],[10,2],[9,2],[8,3],[7,4],[6,5],[5,6],[4,7]],wid=[4,4,4,4,3,3,3,2,2,2,1,1,0],
    eg=['#ffffff','#e8f4ff','#e8f4ff','#d6f7ee','#d6f7ee','#c0f5e2','#b4f3dc','#a9f2d8','#9cf0d2','#9cf0d2','#7fe0c0','#9cf0d2','#c8fff0'];
  spine.forEach(([x,y],i)=>{const w=wid[i];p.set(x,y,'#6a6385');for(let k=1;k<=w;k++)p.set(x,y+k,k===1?st2:k===w&&w>2?st3:st);p.set(x,y+w+1,eg[i]);});
  p.set(14,4,'#c9d6e3').set(12,3,'#c9d6e3').set(10,3,st3);                                // light across the flat
  p.set(3,9,soul).set(4,9,null);                                                          // the hooked tip
  if(mir){const q=new Px(25,25);for(let y=0;y<24;y++)for(let x=0;x<24;x++){const c=p.get(x,y);if(c)q.set(24-y,24-x,c);}q.outline();const c=q.canvas();c.hy=22;return c;}   // flipped across the haft: the blade hooks the other way
  p.outline();const c=p.canvas();c.hy=22;return c;}
function mix(a,b,t){const A=hex(a),B=hex(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('');}
// hair that hangs behind the body (drawn before the tunic)
const tieOf=h=>{const [r,g,b]=hex(h);return r>200&&b>150&&g<160?'#73eff7':'#e86fd0';};   // hair ties: pink, or cyan on pink hair
function backHair(p,dir,style,h,h2,hi,set,rect){
  const tie=tieOf(h);
  if(style==='long'){if(dir==='up'){p.rect(4,6,8,5,h).rect(4,10,8,1,h2);p.set(7,7,h2).set(8,8,h2);}else if(dir==='down'){p.rect(4,5,1,5,h).rect(11,5,1,5,h);p.set(4,9,h2).set(11,9,h2);}else{rect(8,5,4,5,h);rect(8,9,4,1,h2);}}
  if(style==='ponytail'){
    if(dir==='up'){p.rect(7,6,2,5,h);p.set(8,9,h2).set(7,10,h2);p.rect(7,5,2,1,tie);}
    else if(dir!=='down'){rect(12,3,2,2,h);rect(12,5,2,4,h);set(13,8,h2);set(12,9,h);set(12,4,tie);}}
  if(style==='bob'){if(dir==='up'){p.rect(4,6,8,2,h).rect(4,8,8,1,h2);}}
}
// hair over the head (after the face): spikes, bangs, buns, the tails' ties from the front
function frontHair(p,dir,style,h,h2,hi,set,rect){
  const tie=tieOf(h);
  if(style==='spiky'){p.set(5,0,h).set(8,0,h).set(11,1,h).set(4,1,h).set(7,1,h).set(10,1,h);p.set(8,0,hi);}
  if(style==='long'&&dir==='down'){p.set(5,4,h).set(10,4,h).set(10,3,h);}
  if(style==='bun'){if(dir==='down'||dir==='up'){p.ell(8,1.2,2.2,1.6,h);p.set(7,0,hi);p.rect(7,2,2,1,tie);}else{rect(9,0,3,3,h);set(10,0,hi);set(9,2,tie);}}
  if(style==='bob'){
    if(dir==='down'){p.rect(4,4,1,5,h).rect(11,4,1,5,h);p.set(4,8,h2).set(11,8,h2);p.rect(5,3,6,1,h);p.set(6,3,h2).set(9,3,h2);}
    else if(dir!=='up'){rect(8,4,4,5,h);set(9,8,h2);set(11,8,h2);rect(4,3,4,1,h);set(8,5,h2);}}
  if(style==='pigtails'){   // two tails tied at the sides of the head, hanging over the shoulders
    if(dir==='down'||dir==='up'){for(const [x,o] of [[3,-1],[12,1]]){p.rect(x,5,1,4,h);p.rect(x+o,6,1,3,h);p.set(x+o,8,h2).set(x,8,h2);p.set(x+o,9,h2);p.set(x,5,tie);}}
    else{rect(11,5,1,4,h);rect(12,6,1,3,h);set(12,8,h2);set(12,9,h2);set(11,5,tie);}}
  if(style==='ponytail'&&dir==='down'){p.set(11,3,tie);}
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
  if(look.flame==='founder')out.push('#b98cff');if(look.helm==='partyhat')out.push('#73eff7');if(look.helm==='greenhat')out.push('#a7f070');if(look.helm==='star')out.push('#b8f7ff');const L=lantern&&LANTERNS[lantern];if(L&&(L.r==='legendary'||L.r==='mythic'))out.push(L.aura||'#b8f7ff');return out;}
const HERO_CACHE={};
function heroImg(look,dir,frame){const k=[look.skin,look.hair,look.cloth,look.style,look.armor||'none',look.cape||'',look.helm||'',look.ch||'',dir,frame].join('|');return HERO_CACHE[k]||(HERO_CACHE[k]=heroFrame(dir,frame,look));}
// lantern carried by the hero (drawn separately so its glow can pulse)
function lanternSprite(key,flame){const L=LANTERNS[key]||LANTERNS.basic,m=L.metal,gl=flame||L.glow,p=new Px(6,8);   // flame: the Founder's Flame colour
  p.rect(2,0,2,1,m).rect(1,1,4,1,m).rect(1,2,4,4,gl).rect(2,3,2,2,PAL.white).rect(1,6,4,1,m);if(L.r==='legendary'||L.r==='mythic'||L.r==='xrare')p.set(0,3,gl).set(5,3,gl);p.outline();return p.canvas();}
function swordSprite(tier){if(tier==='cinder')return cinderSprite();if(tier==='gloam')return gloamSwordSprite();if(STAFF_ART[tier])return staffSprite(tier);const p=new Px(16,16);const blade=tier==='ember'?PAL.ember:tier==='iron'?PAL.white:tier==='copper'?PAL.orange:tier==='steel'?'#c9d6e3':PAL.silver;
  for(let i=0;i<9;i++){p.set(4+i,11-i,blade);p.set(5+i,11-i,i<8?(tier==='ember'?PAL.red:tier==='steel'?'#7d8fa3':PAL.silver):blade);}
  if(tier==='steel'){p.set(13,2,'#f4f4f4');p.rect(2,11,4,2,'#3e4a5c');}
  p.rect(2,11,4,2,PAL.olive).set(3,13,PAL.bark).set(2,14,PAL.bark);p.set(1,12,PAL.gold).set(6,10,PAL.gold);p.outline();return p.canvas();}

// Cinderfang: a long, jagged blade of black glass with a molten edge and a burning hilt
function cinderSprite(){const p=new Px(16,16),E='#ff5a2a',H='#ffcd75',K='#3a1218';
  for(let i=0;i<10;i++){p.set(4+i,11-i,K);p.set(5+i,11-i,i<9?E:H);if(i%3===1)p.set(5+i,12-i,E);}p.set(14,1,H).set(13,2,H).set(12,4,H);
  p.rect(2,11,4,2,'#5d275d').set(3,13,K).set(2,14,K);p.set(1,12,E).set(6,10,E).set(4,10,H);p.outline('#12060a');return p.canvas();}

// ---------- enemies ----------
function slimeFrame(f,col,col2,big){const s=big?32:16,p=new Px(s,s),k=big?2:1;
  const sq=f?1:0;p.ell(s/2,s-5*k+sq*k,6.5*k+sq*k,5*k-sq*k,col);p.ell(s/2,s-4*k+sq*k,6.5*k+sq*k,3*k-sq*k,col2);
  p.rect(s/2-4*k,s-8*k+sq*k,2*k,2*k,PAL.white).set(s/2-4*k,s-8*k+sq*k,PAL.white);
  p.rect(s/2-2*k,s-6*k+sq*k,k,2*k,PAL.ink).rect(s/2+2*k,s-6*k+sq*k,k,2*k,PAL.ink);
  p.ell(s/2-3.5*k,s-8.5*k+sq*k,1.2*k,.8*k,PAL.white);
  if(big){p.rows(s/2-6,4+sq*2,['g.g.g.g.g','ggggggggg','gyygygyyg','ggggggggg'].map(r=>r),{g:PAL.gold,y:PAL.red});}
  p.outline();return p.canvas();}
function batFrame(f,body,eye){const B=body||PAL.plum,p=new Px(16,16);p.ell(8,8,2.5,2.5,B);
  if(f){p.line(6,7,2,4,B).line(6,8,1,6,B).line(3,5,2,8,B).line(10,7,14,4,B).line(10,8,15,6,B).line(13,5,14,8,B);}
  else{p.line(6,8,2,11,B).line(6,9,1,9,B).line(3,10,2,12,B).line(10,8,14,11,B).line(10,9,15,9,B).line(13,10,14,12,B);}
  p.set(7,6,B).set(9,6,B);p.set(7,8,eye||PAL.red).set(9,8,eye||PAL.red);if(body){p.set(4,f?5:10,PAL.ember).set(12,f?5:10,PAL.ember);}p.outline();return p.canvas();}
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
// ---- Emberforge Halls ----
function impFrame(f){const p=new Px(16,16),R='#c4303f',R2='#7a1c2c',Y='#ffcd75';
  p.ell(8,10,3.6,3.2,R);p.ell(8,6,3,2.6,R);p.set(5,3,R2).set(4,2,R2).set(11,3,R2).set(12,2,R2);p.set(7,6,Y).set(9,6,Y);p.rect(7,8,3,1,R2);
  p.line(4,9,2,7+f,R).line(12,9,14,7+f,R);p.rect(6,13,1,2-f,R2).rect(10,13,1,1+f,R2);p.line(11,12,14,14,R2).set(14,13,PAL.ember);
  p.set(6,9,'#e2584a').set(8,4,'#e2584a');p.outline(PAL.ink);return p.canvas();}
function golemFrame(f){const p=new Px(16,16),K='#2a1a1e',K2='#3e272b',L=PAL.ember,L2=PAL.yellow;
  p.rect(4,5,8,8,K);p.rect(5,6,6,6,K2);p.ell(8,4,3,2.4,K);p.set(7,4,L2).set(9,4,L2);
  p.rect(2,6,2,6,K).rect(12,6,2,6,K);p.rect(2,11+f,2,2,K2).rect(12,12-f,2,2,K2);p.rect(5,13,2,2,K).rect(9,13,2,2,K);
  p.line(6,7,8,9,L).line(8,9,10,7,L).line(8,9,8,12,L);p.set(8,9,L2);p.set(3,8,L).set(12,9,L);p.outline('#12080a');return p.canvas();}
// ---- the Starfall Hollow ----
function wraithFrame(f){const p=new Px(16,16),C='#4a6fd0',C2='#2c3f86',W='#b8f7ff';
  p.ell(8,6,4,4,C);p.rect(4,6,8,5,C);for(let x=4;x<=11;x+=2)p.rect(x,11,1,2+((x/2+f)%2),C2);p.ell(8,6,2.6,2.6,C2);
  p.set(7,6,W).set(9,6,W);p.line(4,8,1,6+f,C).line(11,8,14,6+f,C);p.set(8,2,W);p.outline('#141838');return p.canvas();}
function sentinelFrame(f){const p=new Px(16,16),S='#566c86',S2='#333c57',S3='#94b0c2',G='#73eff7';
  p.rect(5,6,6,7,S);p.rect(6,7,4,5,S2);p.rect(6,2,4,4,S3);p.rect(6,4,4,1,S2);p.set(7,4,G).set(8,4,G);p.set(8,9,G);
  p.rect(3,6,2,5,S3).rect(11,6,2,5,S3);p.line(13,10,15,1,'#c9d6e3').set(15,0,G);p.rect(6,13,1,2+f,S2).rect(9,13,1,3-f,S2);p.outline(PAL.ink);return p.canvas();}
function shardlingFrame(f){const p=new Px(16,16),B='#2c3f86',G='#73eff7',W='#f4f4f4';p.ell(8,10,3.6,2.6,B);
  for(let i=0;i<3;i++){const y=9+i*2,d=(i+f)%2;p.line(5,y,1,y-2+d*2,B);p.line(11,y,15,y-2+d*2,B);}
  p.rows(5,3,['..g...','.gwg.g','gggggg','.gggg.'],{g:G,w:W});p.set(7,10,W).set(9,10,W);p.outline('#0f1430');return p.canvas();}
// ---- bosses (32x32) ----
function tyrantFrame(f){const p=new Px(32,32),K='#2a1a1e',K2='#3e272b',K3='#56383a',L=PAL.ember,L2=PAL.yellow,R='#c4303f';
  p.rect(8,10,16,14,K);p.rect(9,11,14,12,K2);p.ell(16,8,6,5,K);p.rect(12,6,8,3,K3);p.rect(12,8,3,2,L2).rect(17,8,3,2,L2);p.rows(10,1,['r..r..r..r..','rr.rr.rr.rr.'],{r:R});
  p.line(11,13,16,18,L).line(16,18,21,13,L).line(16,18,16,23,L);p.rect(15,17,3,2,L2);p.rect(9,24,5,6-f,K).rect(18,24,5,5+f,K);p.rect(9,29-f,5,1,K3);
  p.rect(3,11,5,10,K).rect(24,11,5,10,K);p.set(5,15,L).set(26,16,L);
  p.rect(26,2+f,3,18,'#4b3d36');p.rect(23,0+f,9,6,K3);p.rect(24,1+f,7,4,'#6d7391');p.rect(23,5+f,9,1,L);p.outline('#12080a');return p.canvas();}
function wardenFrame(f){const p=new Px(32,32),N='#1a1c4c',N2='#2c3f86',N3='#4a6fd0',G='#73eff7',S='#ffe9a8',W='#f4f4f4';
  p.rect(9,11,14,14,N);p.rect(10,12,12,12,N2);p.ell(16,8,6,5.5,N2);p.rect(11,7,10,3,N);p.rect(12,8,3,1,G).rect(17,8,3,1,G);
  p.rows(13,0,['...s...','.s.s.s.','..sss..'],{s:S});p.rect(13,15,6,6,N3);p.rect(15,16,2,4,S);p.rect(14,17,4,2,S);p.set(15,17,W);
  for(let x=10;x<=22;x+=2)p.rect(x,25,1,4+((x/2+f)%2),N);
  p.rect(2,12,7,10,N2);p.rect(3,13,5,8,N3);p.set(5,16,S).set(4,17,S).set(6,17,S).set(5,18,S);
  p.line(24,26,29,3,'#c9d6e3');p.ell(29,3,2,2,G);p.set(29,3,W);p.rect(23,20,4,2,N3);if(f)p.set(27,1,W).set(31,5,W);p.outline('#0a0c22');return p.canvas();}
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
  crypt:{floor:[PAL.dusk,PAL.cave2,PAL.slate],wall:[PAL.ink,PAL.slate,PAL.silver],accent:PAL.bone,light:'#b7d4ff',name:'Bone Crypts'},
  ember:{floor:['#2a1a1e','#3e272b','#56383a'],wall:['#12080a','#3e272b','#ff9f3d'],accent:PAL.ember,light:'#ffb070',name:'Emberforge Halls'},
  star:{floor:['#1a1c4c','#2c3f86','#4a6fd0'],wall:['#0a0c22','#2c3f86','#73eff7'],accent:'#73eff7',light:'#b8f7ff',name:'Starfall Hollow'},
  tide:{floor:['#16303a','#1d3f4a','#2c5a66'],wall:['#08161a','#1d3f4a','#73eff7'],accent:'#73eff7',light:'#9ff0ff',name:'Drowned Archive'},
  void:{floor:['#16131f','#211d2e','#2e2a42'],wall:['#07060b','#211d2e','#c79bf2'],accent:'#c79bf2',light:'#d8b8ff',name:'Hollow Throne'}
};
// ---- dungeon tiles: hand-set flagstones and stone walls, shaded so the Depths read like a real dungeon ----
const DUN={
  moss:{mortar:'#1a1e28',stone:['#2c3441','#29303c','#303846','#272e39'],hi:'#37404e',lo:'#20262f',moss:['#2f4a3c','#3a5c44','#4f7a3a'],
        brick:['#4c5867','#46525f','#52606e'],bhi:'#6a7888',blo:'#2e3641',bmortar:'#1c2129',cap:'#7b8a99'},
  crypt:{mortar:'#17151f',stone:['#3a3850','#353349','#403e58','#33314a'],hi:'#4c4a66',lo:'#25233a',moss:['#3a3550','#423c5c','#4a4466'],
        brick:['#504c6c','#4a4665','#565273'],bhi:'#6f6a92',blo:'#2c2a42',bmortar:'#1c1a29',cap:'#7a7598'},
  ember:{mortar:'#1a0f12',stone:['#33242a','#302127','#372730','#2d1f25'],hi:'#3d2b32',lo:'#271a20',moss:['#4a2428','#5e2c2c','#ff9f3d'],
        brick:['#4a2f33','#43292e','#523439'],bhi:'#6a4448',blo:'#2a1a1e',bmortar:'#160c0e',cap:'#7a5054'},
  star:{mortar:'#11142c',stone:['#232a50','#212749','#262e55','#1f2546'],hi:'#2b3460',lo:'#1a1f40',moss:['#2a336a','#323d7a','#73eff7'],
        brick:['#2c3566','#28305e','#323c70'],bhi:'#4a5896',blo:'#1a1f44',bmortar:'#0e1028',cap:'#5a68a8'},
  tide:{mortar:'#0c1a1f',stone:['#1f3a42','#1c353d','#234149','#1a3239'],hi:'#2a4a53',lo:'#132a30',moss:['#24504a','#2e6056','#73eff7'],
        brick:['#25434b','#213e46','#2a4b54'],bhi:'#3d6670',blo:'#16282d',bmortar:'#0a1416',cap:'#4f7f8a'},
  void:{mortar:'#0b0a10',stone:['#1d1a2a','#1a1726','#211d30','#181523'],hi:'#29253a',lo:'#121019',moss:['#2e2342','#3a2b55','#c79bf2'],
        brick:['#25213a','#211d34','#2a2541'],bhi:'#3d3756',blo:'#15121f',bmortar:'#09080d',cap:'#4f4870'}};
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
    if(b==='ember'){for(let i=0;i<2;i++){const x=r()*16|0,y=r()*12|0;p.line(x,y,x+(r()*4|0)-2,y+3,D.moss[1]);p.set(x,y,D.moss[2]);}}
    if(b==='star'){for(let i=0;i<3;i++)p.set(r()*16|0,1+(r()*13|0),r()<.5?D.moss[2]:'#e8fbff');}
    if(b==='tide'){for(let i=0;i<3;i++){const x=r()*16|0,len=2+(r()*6|0);for(let k=0;k<len;k++)p.set(x,4+k,k===len-1?'#73eff7':'#2e6056');}}   // water seeping down the bricks
    if(b==='void'){for(let i=0;i<2;i++){const x=r()*16|0,y=2+(r()*10|0);p.line(x,y,x+(r()*4|0)-2,y+4,'#3a2b55');p.set(x,y,'#c79bf2');}}
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
function oreSprite(kind){const c={copper:[PAL.orange,PAL.yellow],iron:[PAL.silver,PAL.white],ember:[PAL.ember,PAL.red],coal:['#14141c','#6d7391'],cobalt:['#3b5dc9','#73eff7'],gloam:['#2e7a6a','#7affd6']}[kind];const p=new Px(16,16);
  // set into the wall like the other ores, but bigger chunks with a bright rim and a white glint, so they catch the eye
  if(kind==='coal'){const K='#0e0e14',K2='#2e2f3a',RIM='#b8bfd6',W='#ffffff';
    [[3,4,4,3],[9,3,4,3],[6,9,4,3],[11,10,3,3],[2,11,3,2]].forEach(([x,y,w,h])=>{p.rect(x,y,w,h,K);p.rect(x+1,y+1,w-2>0?w-2:1,h-2>0?h-2:1,K2);p.rect(x,y,w,1,RIM);p.rect(x,y,1,h,RIM);p.set(x+w-1,y+h-1,'#4b5068');});
    p.set(4,4,W).set(10,3,W).set(7,9,W);return p.canvas();}
  if(kind==='cobalt'){const B='#2a55d8',B2='#4f8bff',C='#73eff7',W='#ffffff';
    [[4,7,4],[9,6,5],[12,11,3],[6,12,3],[2,12,2]].forEach(([x,y,h])=>{p.rect(x,y-h+3,2,h,B);p.rect(x,y-h+3,1,h,B2);p.set(x,y-h+2,C).set(x+1,y-h+2,C);p.set(x,y-h+3,W);});
    return p.canvas();}
  if(kind==='gloam'){const D='#1d2a33',G='#2e7a6a',L='#7affd6',W='#e8fff8';
    [[3,4,4,4],[9,3,5,4],[6,9,4,4],[11,10,3,3]].forEach(([x,y,w,h])=>{p.rect(x,y,w,h,D);p.line(x,y+h-1,x+w-1,y,G);p.set(x+1,y+h-2,L);});p.set(10,4,W).set(7,10,W).set(4,5,L);return p.canvas();}
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
// Starshard: a pale crystal star set in dark rock, two frames so it twinkles
function starOreSprite(f){const p=new Px(16,16),R='#1d1f33',R2='#2c2f4a',S='#ffe9a8',W='#fff3c4',G='#73eff7';
  p.ell(8,9,6,5,R);p.ell(7,8,3.5,2.6,R2);p.rows(4,4,['...s...','..sws..','sswWwss','..sws..','...s...','.......'],{s:S,w:W,W:'#ffffff'});
  p.set(11,12,G).set(4,11,G);if(f){p.set(7,3,W).set(3,6,G).set(13,7,G);}else p.set(12,5,W);return p.canvas();}
function cindersSprite(f){const p=new Px(16,16);[[4,10],[9,12],[12,9],[6,13]].forEach(([x,y],i)=>{p.rect(x,y,2,1,'#3a1a1e');p.set(x+(i+f)%2,y,(i+f)%2?PAL.ember:'#ff5a2a');});if(f)p.set(10,8,PAL.yellow);return p.canvas();}
function crystalSprite(v){const p=new Px(16,20),A='#4a6fd0',B='#73eff7',W='#e8fbff';
  const spike=(x,h,w)=>{p.rect(x,19-h,w,h,A);p.rect(x,19-h,1,h,B);p.set(x,18-h,W);};
  if(v){spike(4,9,3);spike(8,13,3);spike(11,6,2);}else{spike(5,7,2);spike(8,11,3);spike(11,8,2);}p.outline('#141838');return p.canvas();}
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
// the Jeweler's Bench: a low wooden bench with a tiny anvil, a vice, a lamp and trays of gems (the gems twinkle)
function benchSprite(f){const p=new Px(32,28),W=PAL.wood,W2=PAL.bark,M='#566c86',M2='#94b0c2';
  p.rect(2,12,28,4,W).rect(2,12,28,1,PAL.tan).rect(2,15,28,1,W2);p.rect(4,16,3,11,W2).rect(25,16,3,11,W2).rect(7,22,18,2,W2);
  p.rect(5,9,6,3,M).rect(4,8,8,1,M2).rect(7,7,2,1,M2);p.rect(13,10,7,2,'#3a3f55');[[14,'#e43b44'],[16,'#3b5dc9'],[18,'#38b764']].forEach(([x,c])=>p.set(x,10,c));
  p.rect(23,4,2,8,'#3a3f55').rect(21,2,6,3,'#3a3f55');p.rect(22,5,4,1,PAL.yellow);
  p.set(f?14:16,9,'#f4f4f4');if(f)p.set(18,9,'#f4f4f4');p.outline();return p.canvas();}
function gemIcon(p,a,b,c){p.rows(4,3,['..cc..','.cbbc.','cbbbac','cbbaac','.caac.','..cc..'],{c:a,b,a:c});p.set(6,4,PAL.white);}
function barIcon(p,a,b,c){p.rows(2,6,['...aaaaaaaa.','..abbbbbbbba','.abbbbbbbbac','accccccccccc','.ccccccccccc'],{a:b,b:a,c});p.set(5,7,PAL.white).set(6,7,PAL.white);}
const JEWEL_COL={copper:['#ef7d57','#8f4a2b'],ruby:['#94b0c2','#566c86'],sapphire:['#94b0c2','#566c86'],emerald:['#c9d6e3','#7d8fa3'],ember:['#ff9f3d','#8f2d3f'],diamond:['#73a7f7','#2a55d8'],star:['#73a7f7','#2a55d8']};
const GEM_COL={gem:['#41a6f6','#73eff7'],ruby:['#e43b44','#ff8a8a'],sapphire:['#3b5dc9','#73a7f7'],emerald:['#38b764','#a7f070'],diamond:['#e8fbff','#ffffff'],starshard:['#ffe9a8','#ffffff']};
function jewelIcon(p,k){const J=JEWELS[k],metal=JEWEL_COL[k.split('_')[0]]||JEWEL_COL.copper,gk=Object.keys(J.need).find(g=>GEM_COL[g.replace('_ore','')])||'gem',G=GEM_COL[gk.replace('_ore','')];
  if(J.slot==='ring'){p.ell(8,10,5,4,metal[0]);p.ell(8,10,3,2.2,null);for(let y=8;y<=12;y++)for(let x=6;x<=10;x++)if(((x-8)/3)**2+((y-10)/2.2)**2<1)p.set(x,y,null);p.set(4,10,metal[1]).set(12,10,metal[1]);p.rect(6,3,4,4,G[0]);p.set(7,4,G[1]).set(8,4,G[1]);p.rect(7,6,2,1,metal[1]);}
  else{p.line(3,2,8,9,metal[1]).line(13,2,8,9,metal[1]);p.ell(8,11,3.5,3.5,metal[0]);p.ell(8,11,2.2,2.2,G[0]);p.set(7,10,G[1]);if(k==='star_amulet')p.set(8,6,'#ffe9a8').set(5,11,'#ffe9a8').set(11,11,'#ffe9a8');}}
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
  const c={wheat:[PAL.lime,PAL.yellow,PAL.gold],lampseed:[PAL.green,PAL.yellow,PAL.ember],glowcap:[PAL.pink,PAL.pink,PAL.white],moonpetal:['#b8a7ff','#e8e0ff','#73eff7']}[kind];
  if(kind==='moonpetal'&&stage>0){for(const x of [5,9,12]){const h=stage===1?4:7;p.rect(x,14-h,1,h,'#2f6b55');if(stage===2){p.ell(x+.5,14-h-1,2,1.6,c[0]);p.set(x,14-h-1,c[1]);p.set(x+1,14-h-2,c[2]);}}p.outline();return p.canvas();}
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
function icon(id){if(ITEMS[id]&&ITEMS[id].lantern)return lanternIcon(ITEMS[id].lantern);if(ITEMS[id]&&ITEMS[id].rune){const q=new Px(16,16);runeIcon(q,ITEMS[id].rune);q.outline();return q.canvas();}if(ITEMS[id]&&ITEMS[id].jewel){const q=new Px(16,16);jewelIcon(q,id);q.outline();return q.canvas();}if(ITEMS[id]&&ITEMS[id].cape)return capeIcon(ITEMS[id].cape);const p=new Px(16,16);
  const ore=(a,b)=>{p.ell(8,9,5,4,PAL.slate);p.ell(7,8,3,2,PAL.silver);p.rect(5,8,2,2,a).rect(9,7,2,2,a).rect(8,10,2,2,b);};
  switch(id){
    case 'gold':p.ell(8,9,5,5,PAL.gold);p.ell(8,9,3,3,PAL.yellow);p.rect(7,7,2,4,PAL.olive);break;
    case 'copper_ore':ore(PAL.orange,PAL.yellow);break;
    case 'iron_ore':ore(PAL.white,PAL.silver);break;
    case 'coal_ore':p.ell(8,9,5,4,'#1d1d24');p.ell(7,8,3,2,'#2e2f3a');p.set(6,7,'#8d93ad').set(10,10,'#6d7391').set(9,7,'#6d7391');break;
    case 'cobalt_ore':ore('#3b5dc9','#73eff7');p.set(9,7,'#b8f7ff');break;
    case 'starshard_ore':p.rows(3,3,['....s....','...sws...','..swWws..','sswWWWwss','..swWws..','...sws...','....s....'],{s:'#ffe9a8',w:'#fff3c4',W:'#ffffff'});p.set(3,12,'#73eff7').set(12,4,'#73eff7');p.outline('#3d2f52');return p.canvas();
    case 'ruby':gemIcon(p,'#e43b44','#ff8a8a','#8f2d3f');break;
    case 'sapphire':gemIcon(p,'#3b5dc9','#73a7f7','#29366f');break;
    case 'emerald':gemIcon(p,'#38b764','#a7f070','#257179');break;
    case 'diamond':gemIcon(p,'#c9e8ff','#ffffff','#73a7f7');break;
    case 'copper_bar':barIcon(p,'#ef7d57','#ffcd75','#8f4a2b');break;
    case 'iron_bar':barIcon(p,'#94b0c2','#f4f4f4','#566c86');break;
    case 'steel_bar':barIcon(p,'#7d8fa3','#c9d6e3','#3e4a5c');break;
    case 'ember_bar':barIcon(p,'#ff9f3d','#ffcd75','#b13e53');break;
    case 'cobalt_bar':barIcon(p,'#3b5dc9','#73eff7','#29366f');break;
    case 'pickaxe':p.line(4,13,11,6,PAL.wood).line(5,13,12,6,PAL.bark);p.rows(6,2,['.ssss....','s....ss..','.......s.','........s'],{s:'#94b0c2'});p.set(6,3,'#c9d6e3').set(14,6,'#566c86');break;
    case 'relic_heart':p.ell(8,9,5,5,'#7a1c2c');p.ell(8,9,3.6,3.6,PAL.red);p.ell(8,9,2,2,PAL.ember);p.set(8,9,PAL.yellow);p.line(3,4,5,6,'#3e272b').line(13,4,11,6,'#3e272b');p.set(6,7,'#ffcd75');break;
    case 'relic_star':p.rows(2,2,['.....s.....','.....s.....','....sws....','sssswWwssss','..swWWWws..','...swWws...','..sws.sws..','.ss.....ss.'],{s:'#ffe9a8',w:'#fff3c4',W:'#ffffff'});p.ell(8,13,4,1.5,'#4a6fd0');break;
    case 'star_helm':p.ell(8,8,6,5,'#2c3f86');p.rect(2,8,12,5,'#2c3f86');p.rect(2,12,12,1,'#1a1c4c');p.rect(5,9,6,2,PAL.ink);p.set(6,9,'#73eff7').set(9,9,'#73eff7');p.rect(7,9,2,4,'#2c3f86');
      p.rows(5,0,['...s..','..sws.','.sswss','..s.s.'],{s:'#ffe9a8',w:'#ffffff'});p.set(3,7,'#4a6fd0').set(12,7,'#4a6fd0');break;
    case 'ember_ore':p.ell(8,9,5,4,'#2b1620');p.ell(7,8,3,2,'#45202c');p.line(4,10,7,8,PAL.red).line(7,8,11,10,PAL.red).line(7,8,8,5,PAL.red);p.line(5,9,7,8,PAL.ember).line(8,8,10,9,PAL.ember);p.set(7,8,PAL.yellow).set(10,9,PAL.yellow);p.outline('#120a10');break;
    case 'gem':p.rows(4,3,['..cc..','.cbbc.','cbbbac','cbbaac','.caac.','..cc..','......'],{c:PAL.sky,b:PAL.cyan,a:PAL.blue});p.set(6,4,PAL.white);break;
    case 'slime_gel':p.ell(8,10,5,4,PAL.green);p.ell(7,9,2,1.5,PAL.lime);p.set(6,8,PAL.white);break;
    case 'blackwood_logs':p.rect(2,8,12,4,'#2a1e22');p.rect(2,8,12,1,'#4a3640');p.rect(4,4,11,4,'#2a1e22');p.rect(4,4,11,1,'#4a3640');p.ell(3,10,2,2,'#7a5ca8');p.set(3,10,'#3d2f52');p.ell(14,6,2,2,'#7a5ca8');p.set(14,6,'#3d2f52');break;
    case 'willow_logs':p.rect(2,8,12,4,'#4a3a2a');p.rect(2,8,12,1,'#6b5a3e');p.rect(4,4,11,4,'#4a3a2a');p.rect(4,4,11,1,'#6b5a3e');p.ell(3,10,2,2,'#d8c99a');p.set(3,10,'#8a7a50');p.ell(14,6,2,2,'#d8c99a');p.set(14,6,'#8a7a50');p.set(8,5,'#73c7a0');p.set(10,9,'#73c7a0');break;
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
    case 'apprentice_staff':case 'blackwood_staff':case 'ember_staff':case 'gloam_staff':case 'moon_staff':case 'hollow_staff':return staffSprite({apprentice_staff:'apprentice',blackwood_staff:'blackwood',ember_staff:'emberwood',gloam_staff:'gloamwood',moon_staff:'moon',hollow_staff:'hollow'}[id]);
    case 'gloam_blade':return gloamSwordSprite();
    case 'gloam_ore':p.ell(8,9,5,4,'#1d2a33');p.ell(7,8,3,2,'#2e4a52');p.line(4,10,8,6,'#2e7a6a');p.set(6,8,'#7affd6').set(10,10,'#7affd6').set(9,7,'#e8fff8');break;
    case 'gloam_bar':barIcon(p,'#2e7a6a','#7affd6','#1d2a33');break;
    case 'oil2':p.rect(6,2,4,2,PAL.bark);p.rect(4,4,8,10,'#c9d6e3');p.rect(5,6,6,7,'#7affd6');p.rect(5,6,6,1,'#e8fff8');p.set(6,8,'#ffffff');p.rect(3,6,1,5,'#94b0c2').rect(12,6,1,5,'#94b0c2');break;
    case 'moonpetal_seed':p.ell(8,9,3.5,4.5,'#5a4ab0');p.ell(8,8,2,3,'#b8a7ff');p.set(7,6,PAL.white);break;
    case 'moonpetal':p.rect(7,9,2,5,'#2f6b55');p.ell(8,7,4.5,3.4,'#b8a7ff');p.ell(8,7,2,1.6,'#e8e0ff');p.set(8,6,'#73eff7').set(5,6,'#ffffff');break;
    case 'raw_moonfin':fishIcon(p,'#b8a7ff','#5a4ab0','#29366f');p.set(9,8,'#73eff7');break;
    case 'moonfin':fishIcon(p,'#d9a066','#5a4ab0','#3d2f52');p.set(6,4,PAL.white).set(9,3,PAL.white);break;
    case 'relic_tome':p.rect(3,4,10,10,'#24454d');p.rect(4,5,8,8,'#3c6e7a');p.rect(7,4,2,10,'#173036');p.ell(8,9,2,2,'#73eff7');p.set(8,9,'#ffffff');p.set(4,13,'#b8f7ff').set(12,4,'#b8f7ff');break;
    case 'relic_throne':p.rows(2,4,['g..g..g..g.','gg.gg.gg.gg','ggggggggggg','gvgggvgggvg','ggggggggggg'],{g:'#ffcd75',v:'#c79bf2'});p.ell(8,13,4,1.5,'#5d275d');break;
    case 'tide_robe':case 'void_robe':{const C=id==='tide_robe'?['#24454d','#173036','#73eff7']:['#2e2a42','#1d1a2a','#c79bf2'];
      p.rect(4,3,8,12,C[0]);p.rect(3,6,1,8,C[0]).rect(12,6,1,8,C[0]);p.rect(2,4,3,4,C[1]).rect(11,4,3,4,C[1]);p.rect(6,3,4,2,PAL.ink);p.rect(4,14,8,1,C[2]);p.rect(7,5,2,9,C[1]);p.set(7,7,C[2]).set(8,10,C[2]);p.rect(4,9,8,1,C[2]);break;}
    case 'copper_helm':case 'iron_helm':case 'ember_helm':case 'steel_helm':case 'gloam_helm':{const C={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d'],steel:['#7d8fa3','#3e4a5c','#c9d6e3'],gloam:['#2e4a52','#1d2a33','#7affd6']}[id.split('_')[0]];
      p.ell(8,8,6,5,C[0]);p.rect(2,8,12,5,C[0]);p.rect(2,12,12,1,C[1]);p.rect(5,9,6,2,PAL.ink);p.rect(7,9,2,4,C[0]);p.rect(6,4,4,1,C[2]);p.rect(7,2,2,3,C[1]);break;}
    case 'partyhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#3b5dc9',s:'#73eff7',c:'#29366f'});p.set(7,1,PAL.yellow);break;
    case 'greenhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#38b764',s:'#a7f070',c:'#257179'});p.set(7,1,PAL.yellow);break;
    case 'traveler_garb':p.rect(4,4,8,10,PAL.teal);p.rect(2,4,3,4,PAL.moss).rect(11,4,3,4,PAL.moss);p.rect(6,4,4,2,PAL.ink);p.rect(4,11,8,1,PAL.bark);p.rect(7,6,2,5,PAL.green);break;
    case 'copper_blade':case 'iron_blade':case 'ember_blade':case 'steel_blade':case 'cinder_blade':{const t=id.split('_')[0];return swordSprite(t);}
    case 'copper_mail':case 'iron_mail':case 'ember_mail':case 'steel_mail':case 'gloam_mail':{const t=id.split('_')[0],C=TIER_COLORS[t==='ember'?'ember':t];
      p.rect(4,4,8,10,C.tun);p.rect(2,4,3,4,C.tun2).rect(11,4,3,4,C.tun2);p.rect(6,4,4,2,PAL.ink);p.rect(4,11,8,1,PAL.bark);p.rect(7,6,2,5,C.trim);break;}
    case 'raw_pondfin':fishIcon(p,'#7fb0c8','#41a6f6','#29366f');break;
    case 'pondfin':fishIcon(p,'#d9a066','#a0663b','#6b3e26');p.set(6,4,PAL.white).set(9,3,PAL.white);break;
    case 'burnt_fish':fishIcon(p,'#3a3550','#262b44','#1a1c2c');break;
    case 'raw_gloomfin':fishIcon(p,'#8a6ad0','#5a4578','#2b2238');p.set(9,8,'#c79bf2');break;
    case 'gloomfin':fishIcon(p,'#c98a4a','#7a5ca8','#3d2f52');p.set(6,4,PAL.white).set(9,3,PAL.white);break;
    case 'relic_crown':p.rows(2,4,['g.g.g.g.g.g','ggggggggggg','gyggrggyggg','ggggggggggg'],{g:PAL.gold,y:PAL.lime,r:PAL.red});p.ell(8,13,5,2,PAL.green);break;
    case 'relic_sigil':p.ell(8,8,5.5,5.5,PAL.silver);p.ell(8,8,4,4,PAL.navy);p.rect(7,5,2,7,PAL.gold).rect(5,7,6,2,PAL.gold);break;
    default:p.rect(4,4,8,8,PAL.pink);}
  p.outline();return p.canvas();}


// ---------- the Wilderness ----------
// dead, dry grass: olive and brown with a few dark tufts
function wildGrassTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#5a5634');
  for(let i=0;i<16;i++)p.set(r()*16,r()*16,r()<.5?'#48462c':'#6e683c');
  for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0;p.set(x,y,'#6b6236').set(x+1,y-1,'#7a6e3c').set(x+2,y,'#6b6236');}
  if(r()<.5){const x=r()*13|0,y=r()*13|0;p.set(x,y,'#2e2c1e').set(x+1,y,'#2e2c1e');}return p.canvas();}
function wildPathTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#5a4636');
  for(let i=0;i<12;i++)p.set(r()*16,r()*16,r()<.6?'#463628':'#6e5844');for(let i=0;i<3;i++){const x=r()*15|0,y=r()*15|0;p.rect(x,y,2,1,'#7e6a50');}return p.canvas();}
// the Gloom Pond: dark, still water with a violet sheen
function gloomTile(f){const p=new Px(16,16);p.rect(0,0,16,16,'#2e2f5c');
  for(let y=3;y<16;y+=6)for(let x=(y+f*3)%9;x<16;x+=9)p.rect(x,y,3,1,'#4a4884');p.set((4+f*5)%16,10,'#9a7ad0');p.set((11+f*3)%16,4,'#6a62a8');return p.canvas();}
// a low, broken stone wall: the edge of the Hold. end:'l'/'r' crumbles down at a gap
function wildWallSprite(v,end){const p=new Px(16,22),S='#6d7391',S2='#4b5068',S3='#8d93ad',M='#3a3f55';
  const top=end?9:5;p.rect(0,top,16,16-top+4,S);p.rect(0,top,16,1,S3);
  for(let y=top+3;y<20;y+=4)p.rect(0,y,16,1,S2);for(let y=top;y<20;y+=4){const o=((y/4)|0)%2?4:0;for(let x=o;x<16;x+=8)p.rect(x,y+1,1,3,S2);}
  if(end==='l'){p.rect(0,top-3,6,3,S);p.rect(0,top-3,6,1,S3);p.rect(11,top,5,3,null);p.set(12,top+3,S3).set(14,top+4,S2);}
  if(end==='r'){p.rect(10,top-3,6,3,S);p.rect(10,top-3,6,1,S3);p.rect(0,top,5,3,null);p.set(2,top+3,S3).set(1,top+4,S2);}
  if(v===1){p.rect(5,top,4,2,null);p.set(5,top+2,S3).set(8,top+2,S3);}if(v===2){p.set(3,top+5,'#4f7a3a').set(4,top+4,'#4f7a3a').set(12,top+8,'#4f7a3a');}
  p.rect(0,20,16,2,M);p.outline();return p.canvas();}
// a dead tree: bare grey branches
function deadTreeSprite(v){const p=new Px(32,32),B='#4b3d36',B2='#6b5a4e',B3='#2e2622';
  p.rect(14,14,4,16,B);p.rect(15,14,1,16,B2);p.rect(13,28,6,2,B);
  p.line(15,16,8,8,B).line(16,15,9,7,B2).line(9,8,6,4,B).line(9,8,11,3,B);
  p.line(17,17,24,9,B).line(16,16,23,8,B2).line(23,8,27,6,B).line(23,8,22,3,B);
  if(v){p.line(16,12,16,2,B).line(16,6,19,3,B);}else{p.line(16,13,13,4,B).line(14,7,12,5,B3);}
  p.set(6,4,B3).set(27,6,B3).set(11,3,B3);p.outline();return p.canvas();}
// Blackwood: a dark, twisted tree with violet-black leaves
function blackwoodSprite(dx=0){const p=new Px(32,32);p.rect(14,19,4,11,'#2a1e22').rect(15,19,1,11,'#4a3640');p.line(13,22,10,19,'#2a1e22').line(18,21,21,18,'#2a1e22');
  p.ell(16+dx,12,11,9.5,'#2b2238');p.ell(14+dx,10,8,6.5,'#3d2f52');p.ell(12+dx*1.5,8,4,3,'#5a4578');p.set(20,7,'#7a5ca8').set(9,13,'#7a5ca8').set(22,14,'#5a4578');p.outline();return p.canvas();}
function rockSprite(v){const p=new Px(16,16),A='#6d7391',B='#4b5068',C='#8d93ad';
  if(v){p.ell(8,10,6.5,4.5,B);p.ell(7,9,5,3.5,A);p.set(5,8,C).set(6,7,C).set(9,7,C);}else{p.ell(6,10,4.5,4,B);p.ell(5.5,9,3.5,3,A);p.ell(11,11,3,2.5,B);p.set(4,8,C).set(10,10,C);}
  p.outline();return p.canvas();}
function graveSprite(v){const p=new Px(16,20),S='#8d93ad',S2='#6d7391',D='#4b5068';
  if(v===2){p.rect(7,4,2,13,S);p.rect(4,7,8,2,S);p.rect(8,4,1,13,S2);}
  else{p.rect(4,5,8,12,S);p.ell(8,6,4,3,S);p.rect(10,5,2,12,S2);p.rect(6,9,4,1,D);p.rect(6,11,3,1,D);if(v)p.set(5,5,D).set(11,8,D);}
  p.rect(2,17,12,2,'#3a2f2a');p.set(3,16,'#4f7a3a').set(12,16,'#4f7a3a');p.outline();return p.canvas();}
function pillarSprite(v){const p=new Px(16,32),S='#8d93ad',S2='#6d7391',S3='#b2b7ca';
  const top=v?10:4;p.rect(4,top,8,26-top,S);p.rect(9,top,3,26-top,S2);p.rect(3,26,10,3,S2);p.rect(3,top-1,10,2,S3);
  for(let y=top+4;y<26;y+=5)p.rect(4,y,8,1,S2);if(v){p.set(4,top-2,S3).set(7,top-3,S3);p.set(1,29,S2).set(14,28,S2);}
  p.set(5,top+8,'#4f7a3a').set(5,top+9,'#38b764');p.outline();return p.canvas();}
// the obelisk at the top of the Wilderness: black stone, violet runes
function obeliskSprite(f){const p=new Px(32,52),K='#1d1a2a',K2='#2e2a42',K3='#45405e',V=f?'#c79bf2':'#9a6ad8';
  p.rect(10,10,12,36,K);p.rect(10,10,4,36,K2);p.rect(12,4,8,6,K);p.rect(13,1,6,3,K2);p.set(15,0,K3).set(16,0,K3);p.rect(6,46,20,4,K2);p.rect(6,46,20,1,K3);
  for(const y of [14,21,28,35])p.rect(15,y,2,4,V);p.set(14,16,V).set(17,23,V).set(14,30,V).set(17,37,V);p.rect(15,6,2,2,V);
  p.outline();return p.canvas();}
// skull on a post: the warning at the gaps in the wall
function skullPostSprite(){const p=new Px(16,28),W='#6b3e26',W2='#8a5a3a';p.rect(7,10,2,18,W);p.rect(7,10,1,18,W2);p.rect(3,14,10,2,W);
  p.ell(8,6,4,4,PAL.bone);p.rect(5,8,6,3,PAL.bone);p.rect(6,5,2,2,PAL.ink);p.rect(9,5,2,2,PAL.ink);p.set(8,8,PAL.ink);p.set(6,10,'#8a7e62').set(8,10,'#8a7e62').set(10,10,'#8a7e62');
  p.outline();return p.canvas();}
// the warning sign: the signpost with a red skull on it
function wildSignSprite(){const p=new Px(18,24);p.rect(8,8,2,16,'#6b3e26');p.rect(8,8,1,16,'#8a5a3a');p.rect(1,1,16,9,'#a0663b');p.rect(1,1,16,1,'#d9a066');p.rect(1,9,16,1,'#6b3e26');
  p.ell(9,5,3,2.6,'#b13e53');p.rect(7,6,5,2,'#b13e53');p.set(8,4,PAL.ink).set(10,4,PAL.ink);p.set(9,7,PAL.ink);p.outline();return p.canvas();}
function wildBonesSprite(v){const p=new Px(16,16);if(v===0){p.line(3,12,9,10,PAL.bone).line(4,9,10,12,PAL.bone);}else if(v===1){p.ell(8,10,2.6,2.2,PAL.bone);p.rect(7,11,3,2,PAL.bone);p.set(7,10,PAL.ink).set(9,10,PAL.ink);}
  else{p.line(2,12,7,12,PAL.bone).set(1,11,PAL.bone).set(1,13,PAL.bone).set(8,11,PAL.bone).set(8,13,PAL.bone);p.line(10,9,13,11,'#b8a880');}return p.canvas();}
// dry thorny weeds and dead shrubs scattered through the Wilderness grass
function weedSprite(v){const p=new Px(16,16),A='#7a6e3c',B='#4a3d2a',R='#8f2d3f';
  if(v===0){p.line(5,13,3,8,A).line(6,13,7,7,A).line(7,13,10,9,A);p.set(3,7,B).set(7,6,B).set(10,8,B);}
  else if(v===1){p.line(8,13,8,6,B).line(8,10,5,7,B).line(8,9,11,6,B);p.set(5,6,R).set(11,5,R).set(8,5,R);}
  else{p.ell(8,12,4,2,'#5e5a34');p.set(6,10,A).set(9,10,A).set(8,9,A).set(11,11,B);}return p.canvas();}
// a small skull, the PvP mark shown over a hero's head
function skullMark(){const p=new Px(9,9),W='#f4f4f4',G='#c2c7cf';p.ell(4.5,3.5,3.5,3.4,W);p.rect(2,5,5,2,W);p.rect(5,1,2,6,G);p.rect(2,3,2,2,PAL.ink);p.rect(5,3,2,2,PAL.ink);p.set(4,5,PAL.ink);p.set(2,7,W).set(4,7,W).set(6,7,W);p.outline();return p.canvas();}


// =================== v0.12: Magic, floors 21–30, Hollowmere ===================
// ---- staffs: a long shaft from bottom-left to top-right (drawn like a blade), a headpiece with a focus that glows ----
const STAFF_ART={apprentice:{w:'#a0663b',w2:'#6b3e26',h:'#c2a26b',g:'#ffcd75',g2:'#fff3c4'},blackwood:{w:'#4a3640',w2:'#2a1e22',h:'#7a5ca8',g:'#73a7f7',g2:'#e8fbff'},
  emberwood:{w:'#6b3e26',w2:'#3a1218',h:'#b13e53',g:'#ff9f3d',g2:'#ffcd75'},gloamwood:{w:'#2e2a42',w2:'#1d1a2a',h:'#4f8b9a',g:'#7affd6',g2:'#e8fff8'},
  hollow:{w:'#1d1a2a',w2:'#0e0c16',h:'#5d275d',g:'#c79bf2',g2:'#f1e4ff'},moon:{w:'#c9d6e3',w2:'#566c86',h:'#73a7f7',g:'#b8f7ff',g2:'#ffffff'}};
function staffSprite(t){const S=STAFF_ART[t]||STAFF_ART.apprentice,p=new Px(16,16);
  for(let i=0;i<12;i++){p.set(2+i,14-i,S.w);if(i%3===0)p.set(3+i,14-i,S.w2);}            // the shaft
  p.set(1,15,S.w2);
  if(t==='moon'){p.ell(13,3,2.6,2.6,S.h);p.ell(13,3,1.5,1.5,S.g);p.set(13,3,S.g2);p.set(10,1,S.h).set(15,6,S.h).set(11,0,S.g).set(15,5,S.g);p.set(14,1,S.g2);}
  else if(t==='hollow'){p.rows(10,0,['h...h.','hh.hh.','.hgh..','.hgh..','..h...'],{h:S.h,g:S.g});p.set(12,2,S.g2);}
  else if(t==='gloamwood'){p.rows(10,0,['..hh..','.hggh.','.hggh.','..hh..'],{h:S.h,g:S.g});p.set(12,1,S.g2);p.set(10,5,S.h).set(15,4,S.h);}
  else if(t==='emberwood'){p.rows(11,0,['.g.g.','gggg.','.hgh.','..h..'],{g:S.g,h:S.h});p.set(12,0,S.g2);}
  else if(t==='blackwood'){p.rows(11,1,['hgh.','hggh','.hh.'],{h:S.h,g:S.g});p.set(12,2,S.g2);p.set(10,0,S.h).set(14,0,S.h);}
  else{p.ell(13,3,2,2,S.h);p.set(13,3,S.g).set(12,2,S.g2);}
  p.outline(t==='moon'?'#29366f':'#1a1c2c');return p.canvas();}
// Gloamite: dark teal-black metal that shines green-white at the edge
function gloamSwordSprite(){const p=new Px(16,16),B='#2e4a52',E='#7affd6',H='#e8fff8';
  for(let i=0;i<10;i++){p.set(4+i,11-i,B);p.set(5+i,11-i,i<9?E:H);}p.set(14,1,H);p.rect(2,11,4,2,'#1d2a33').set(3,13,'#4f8b9a').set(2,14,'#4f8b9a');p.set(1,12,E).set(6,10,E);p.outline('#0b1418');return p.canvas();}
// ---- runes: a small carved stone with a glowing glyph ----
const RUNE_GLYPH={gale:['..x..','.x.x.','x...x','.x.x.','..x..'],stone:['xxxxx','x...x','x.x.x','x...x','xxxxx'],tide:['x.x.x','.x.x.','x.x.x','.....','xxxxx'],
  ember:['..x..','.xx..','.xxx.','xxxxx','.xxx.'],soul:['.xxx.','x.x.x','.xxx.','..x..','.x.x.'],star:['..x..','x.x.x','.xxx.','x.x.x','..x..']};
function runeIcon(p,k){const R=RUNES[k];p.ell(8,9,6,5.5,'#4b5068');p.ell(8,8.5,5.4,4.8,'#6d7391');p.ell(7,7,3,2,'#8d93ad');p.rows(6,6,RUNE_GLYPH[k],{x:R.c2});p.set(6,6,R.c);}
// ---- floors 21–30 monsters ----
function drownedFrame(f){const p=new Px(16,16),C='#3c6e7a',C2='#24454d',W='#b8f7ff',K='#1a2f36';
  p.ell(8,5,3.4,3.2,C);p.rect(5,7,6,6,C2);p.rect(6,8,4,4,C);p.set(7,5,W).set(9,5,W);p.rect(7,7,3,1,K);
  for(let x=5;x<=10;x+=2)p.rect(x,13,1,1+((x+f)%2),C2);p.line(4,8,2,11+f,C).line(11,8,13,11-f,C);p.set(2,12,W);p.rows(5,1,['g.g.g.','.g.g.g'],{g:'#4f7a3a'});p.outline('#0b161a');return p.canvas();}
function eelFrame(f){const p=new Px(16,16),A='#2c5a8a',B='#41a6f6',Y='#ffe9a8';
  for(let i=0;i<12;i++){const y=9+Math.round(Math.sin((i+f*2)*.9)*2);p.rect(2+i,y,1,3,A);p.set(2+i,y,B);}p.ell(13,9,2.6,2.2,A);p.set(14,8,Y);p.set(15,10,'#1a1c2c');p.rows(5,6,['b.b.b'],{b:B});p.outline('#0c1a2c');return p.canvas();}
function tomeFrame(f){const p=new Px(16,16),C='#5d275d',C2='#3a1838',P='#f4e4c1',G='#73eff7';
  const w=f?6:5;p.rect(8-w,6,w,6,C);p.rect(8,6,w,6,C);p.rect(8-w+1,7,w-1,4,P);p.rect(8,7,w-1,4,P);p.rect(7,6,2,7,C2);
  for(let y=8;y<11;y++){p.set(9-w+2,y,'#8a7e62');p.set(9+w-3,y,'#8a7e62');}p.set(5,4-f,G).set(11,3+f,G).set(8,3,'#e8fbff');p.outline('#1a0c1a');return p.canvas();}
function huskFrame(f){const p=new Px(16,16),K='#2e2a42',K2='#1d1a2a',V='#c79bf2',B='#45405e';
  p.rect(4,5,8,8,K);p.rect(5,6,6,6,K2);p.ell(8,4,3.4,2.8,K);p.set(7,4,V).set(9,4,V);p.line(5,7,10,11,B);p.line(10,7,6,10,B);
  p.rect(2,6,2,7,K).rect(12,6,2,7,K);p.rect(2,12+f,2,2,V).rect(12,13-f,2,1,V);p.rect(5,13,2,2,K).rect(9,13,2,2,K);p.outline('#08070d');return p.canvas();}
function voidlingFrame(f){const p=new Px(16,16),V='#7a3b8f',V2='#c79bf2',K='#1d1a2a';
  p.ell(8,8,4.5,4.5,K);p.ell(8,8,3.4,3.4,V);p.ell(8,8,1.6,1.6,V2);p.set(8,8,'#ffffff');
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2+f*.5;p.set(8+Math.round(Math.cos(a)*6),8+Math.round(Math.sin(a)*6),V2);}p.outline('#0e0718');return p.canvas();}
function watcherFrame(f){const p=new Px(16,16),S='#45405e',S2='#2e2a42',E='#ff6b6b',W='#f4f4f4';
  p.ell(8,7,5,4.6,S);p.ell(8,7,3.4,3.2,W);p.ell(8+(f?1:-1),7,1.8,1.8,E);p.set(8+(f?1:-1),7,'#1a1c2c');
  for(let x=4;x<=12;x+=2)p.line(x,11,x+(x<8?-1:1),14-((x/2+f)%2),S2);p.rect(5,2,6,1,S2);p.outline('#0d0c14');return p.canvas();}
function orbFrame(f){const p=new Px(16,16),A='#73eff7',B='#e8fbff',C='#3b5dc9';p.ell(8,10,3+f*.4,3+f*.4,C);p.ell(8,10,2.2,2.2,A);p.ell(8,10,1,1,B);p.set(5,7+f,A).set(11,12-f,A);return p.canvas();}
function voidOrbFrame(f){const p=new Px(16,16),A='#c79bf2',B='#f1e4ff',C='#5d275d';p.ell(8,10,3+f*.4,3+f*.4,C);p.ell(8,10,2.2,2.2,A);p.ell(8,10,1,1,B);p.set(5,7+f,A).set(11,12-f,A);return p.canvas();}
function riftFrame(f){const p=new Px(16,16),V='#c79bf2',K='#1d1a2a';p.ell(8,12,6,2.6,K);p.ell(8,12,4.6,1.8,'#5d275d');p.line(5,12,11,12,V);p.set(8,11,'#ffffff');if(f)p.set(4,11,V).set(12,13,V);return p.canvas();}
function archmageFrame(f){const p=new Px(32,32),R='#24454d',R2='#3c6e7a',R3='#73a7f7',G='#73eff7',W='#e8fbff',K='#0b161a',S='#c9d6e3';
  p.rect(9,12,14,15,R);p.rect(10,13,12,13,R2);p.rect(15,13,2,13,R3);for(let x=9;x<=22;x+=2)p.rect(x,27,1,2+((x/2+f)%2),R);
  p.ell(16,8,6,6,R);p.rows(10,0,['.....rr.....','....rrrr....','...rrrrrr...'],{r:R});p.ell(16,9,4,3.6,K);p.set(14,9,G).set(18,9,G);p.rect(14,12,4,3,S);
  p.rect(5,13,4,9,R);p.rect(23,13,4,9,R);p.ell(7,22,1.8,1.8,'#d8c8a0');p.ell(25,22,1.8,1.8,'#d8c8a0');
  p.line(27,28,29,4,S);p.ell(29,4,3,3,R3);p.ell(29,4,1.8,1.8,G);p.set(29,4,W);if(f){p.set(26,1,W).set(31,7,G);}else p.set(31,2,W);
  p.rows(3,6,['.g.','g.g','.g.'],{g:G});p.outline(K);return p.canvas();}
function hollowKingFrame(f){const p=new Px(32,32),K='#1d1a2a',K2='#2e2a42',K3='#45405e',V='#c79bf2',V2='#7a3b8f',G='#ffcd75';
  p.rect(8,11,16,14,K);p.rect(9,12,14,12,K2);p.ell(16,8,6,5.5,K2);p.rect(12,7,8,4,K);p.rect(13,8,2,1,V).rect(17,8,2,1,V);
  p.rows(10,0,['g..g..g..g.','gg.gg.gg.gg','ggggggggggg'],{g:G});p.rect(13,15,6,6,V2);p.ell(16,18,2,2,V);p.set(16,18,'#ffffff');
  p.rect(9,25,5,6-f,K).rect(18,25,5,5+f,K);p.rect(3,11,5,11,K2);p.rect(24,11,5,11,K2);p.set(5,15,V).set(26,16,V);
  p.rect(1,3+f,3,20,K3);p.rect(0,1+f,5,3,V2);p.set(2,0+f,V);for(let i=0;i<4;i++)p.set(4+i*7,29,V2);p.outline('#06050a');return p.canvas();}
// ---- Hollowmere monsters (out in the open, under the sky) ----
function wolfFrame(f){const p=new Px(16,16),G='#6d7391',G2='#4b5068',W='#c2c7cf';
  p.rect(3,8,9,4,G);p.rect(3,11,9,1,G2);p.ell(12,7,2.8,2.4,G);p.rows(11,3,['g.g','ggg'],{g:G2});p.set(13,7,'#ffcd75');p.set(15,8,'#1a1c2c');p.line(3,8,0,6+f,G);
  p.rect(4,12,1,3-f,G2).rect(7,12,1,2+f,G2).rect(9,12,1,3-f,G2).rect(11,12,1,2+f,G2);p.rect(5,9,5,1,W);p.outline();return p.canvas();}
function boarFrame(f){const p=new Px(16,16),B='#6b3e26',B2='#4b2a1a',T='#f4e4c1';
  p.ell(7,9,5.5,3.6,B);p.ell(12,9,2.6,2.4,B);p.set(14,10,B2).set(15,10,'#3a2519');p.set(12,8,'#1a1c2c');p.set(14,11,T).set(13,12,T);p.rows(3,5,['b.b.b.b'],{b:B2});
  p.rect(4,12,1,3-f,B2).rect(7,12,1,2+f,B2).rect(9,12,1,3-f,B2).rect(11,12,1,2+f,B2);p.outline();return p.canvas();}
function boglingFrame(f){const p=new Px(16,16),M='#4f7a3a',M2='#2b4b3a',Y='#e8c66a';const sq=f?1:0;
  p.ell(8,11+sq,5.5+sq,4-sq,M2);p.ell(8,10+sq,4.5,3,M);p.set(6,9+sq,Y).set(10,9+sq,Y);p.rect(7,12+sq,3,1,'#1a1c2c');p.set(4,7,M).set(12,7+sq,M).set(5,6,'#a7f070');p.outline('#141f18');return p.canvas();}
function mirewispFrame(f){const p=new Px(16,16),A='#a7f070',B='#f4f4f4',C='#38b764';p.ell(8,9,3.6,3.6,C);p.ell(8,9,2.4,2.4,A);p.ell(8,9.5,1.2,1.2,B);
  p.line(6,6,5+f,2,A).line(10,6,11-f,1,A);p.set(7,9,'#1a1c2c').set(9,9,'#1a1c2c');p.outline('#1b3a24');return p.canvas();}
function treantFrame(f){const p=new Px(16,16),B='#4b3226',B2='#6b3e26',L='#2b4b3a',L2='#38b764';
  p.ell(8,4,6,3.6,L);p.ell(7,3,4,2.2,L2);p.rect(5,6,6,7,B);p.rect(6,7,4,5,B2);p.set(6,8,'#ffcd75').set(9,8,'#ffcd75');p.rect(7,10,2,1,'#1a1c2c');
  p.line(5,7,1,10+f,B).line(10,7,14,10-f,B);p.rect(5,13,2,2+f,B).rect(9,13,2,3-f,B);p.outline();return p.canvas();}
// ---- Hollowmere v0.13: carrion ravens, gloomstags, mossy giants ----
function ravenFrame(f){const p=new Px(16,16),B='#1d1a26',B2='#2e2a42',HI='#4a4a6a',BK='#e8b04a',EY='#ff4d6d';
  p.ell(8,9,3.2,2.4,B);p.ell(5,7,2,1.8,B);p.set(3,7,BK).set(2,7,BK);p.set(5,6,EY);p.rect(10,9,3,1,B2);p.set(13,8,B).set(13,10,B);   // body, head, beak, tail
  if(f){p.line(7,8,3,3,B2).line(8,8,6,3,B);p.line(9,8,12,3,B).line(10,8,14,4,B2);p.set(6,3,HI).set(12,3,HI);}                          // wings up
  else{p.line(7,9,2,12,B2).line(8,10,5,13,B);p.line(9,9,13,12,B).line(10,10,14,13,B2);}                                              // wings down
  p.set(7,8,HI).set(9,8,HI);p.set(7,12,BK).set(9,12,BK);p.outline();return p.canvas();}
function gloomstagFrame(f){const p=new Px(16,16),B='#3a3550',B2='#2a2638',HI='#5a5278',AN='#73eff7',AN2='#3b5dc9',EY='#c7fff6';
  p.rect(4,7,8,4,B);p.rect(4,10,8,1,B2);p.rect(4,7,8,1,HI);p.rect(2,4,3,4,B);p.set(1,6,B2);p.set(2,5,EY);   // body, neck and head (facing left)
  p.line(3,4,1,1,AN).line(4,4,5,1,AN).set(1,2,AN2).set(5,2,AN2).set(2,1,AN).set(6,1,AN2);                         // glowing antlers
  p.rect(5,11,1,4-f,B2).rect(7,11,1,3+f,B).rect(10,11,1,4-f,B2).rect(11,11,1,3+f,B);p.set(12,7,B2).set(13,8,B2);    // legs, tail
  p.set(6,8,'#7a6f9c').set(9,9,'#7a6f9c');p.outline();return p.canvas();}
function mossGiantFrame(f){const p=new Px(32,32),S='#5a6460',S2='#3e4744',S3='#2b3230',M='#4a8a3a',M2='#6fb84a',M3='#2f5a2a',EY='#ffcd75';
  const B=f?1:0;
  p.rect(10,26,5,5,S2).rect(18,26,5,5,S2);p.rect(10,30,5,1,S3).rect(18,30,5,1,S3);                                  // stone legs
  p.ell(16,18,9,9,S);p.ell(14,15,6,5,shade(S,1.12));p.rect(9,24,15,3,S2);                                            // a hulking stone body
  p.ell(16,8+B,5,4,S);p.rect(13,8+B,2,1,EY).rect(18,8+B,2,1,EY);p.rect(14,11+B,5,1,S3);                             // a small head sunk in the shoulders, glowing eyes
  p.ell(5,17-B,4,5,S2);p.ell(27,17+B,4,5,S2);p.rect(2,21-B,6,4,S);p.rect(24,21+B,6,4,S);p.rect(2,24-B,6,1,S3);p.rect(24,24+B,6,1,S3);   // great arms and fists
  // moss: thick on the shoulders and head, hanging in strands
  p.ell(9,11,5,2.4,M);p.ell(23,11,5,2.4,M);p.ell(16,5+B,4,1.6,M);p.ell(9,10,3,1.2,M2);p.ell(23,10,3,1.2,M2);
  for(const [x,y,n] of [[6,12,4],[11,13,3],[21,13,4],[26,12,3],[15,22,3],[19,20,2]])for(let k=0;k<n;k++)p.set(x,y+k,k===n-1?M3:M);
  for(const [x,y] of [[12,18],[20,16],[16,21],[8,20],[24,20]])p.set(x,y,M2);p.set(14,4+B,'#e86fd0').set(19,5+B,'#ffcd75');   // tiny flowers in the moss
  for(const [x,y] of [[11,16],[19,23],[22,18],[13,22]])p.set(x,y,S3);p.outline();return p.canvas();}
// the Hollow Wood's grass: the Hold's bright green, blended a step at a time toward the moor's (k: 0 = Hold, 1 = moor)
function blendGrassTile(k,seed){const p=new Px(16,16),r=rng(seed),M=(a,b)=>mix(a,b,k);p.rect(0,0,16,16,M(PAL.green,'#2f6b55'));
  for(let i=0;i<15;i++)p.set(r()*16,r()*16,r()<.5?M(PAL.fern,'#285a48'):M(PAL.lime,'#3d8466'));
  for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0,c=M(PAL.fern,'#4a9a74');p.set(x,y,c).set(x+1,y-1,c).set(x+2,y,c);}
  if(k>.5&&r()<.25)p.set(r()*16,r()*16,'#b8f7ff');return p.canvas();}
// where the dirt road meets the moor's flagstones: dirt with stones set in it
function dirtStoneTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,mix(PAL.tan,'#6a6656',.45));
  for(let i=0;i<10;i++)p.set(r()*16,r()*16,mix(PAL.wood,'#5a5648',.4));
  for(let i=0;i<3;i++){const x=r()*12|0,y=r()*12|0,w=3+(r()*3|0);p.rect(x,y,w,3,'#8a8572');p.rect(x,y,w,1,'#a39e88');p.rect(x,y+2,w,1,'#5a5648');}return p.canvas();}
function mossTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#2b5236');
  for(let i=0;i<18;i++)p.set(r()*16,r()*16,r()<.5?'#234530':'#3a6a42');
  for(let i=0;i<4;i++){const x=r()*13|0,y=r()*13|0;p.ell(x+1.5,y+1.5,1.8,1.3,'#4f8a44');p.set(x+1,y,'#7bc25a');}
  if(r()<.45){const x=r()*12|0,y=r()*12|0;p.rect(x,y,3,2,'#56605a');p.rect(x,y,3,1,'#6e7a72');p.set(x+1,y,'#7bc25a');}return p.canvas();}
// a carved pumpkin with a candle inside (two faces)
function pumpkinSprite(v){const p=new Px(16,16),O='#ef7d57',O2='#b0502a',O3='#ffb070',G='#ffcd75',G2='#fff3c4',ST='#38b764';
  p.ell(8,11,6,4.2,O);p.ell(5,11,2,3.6,O2);p.ell(11,11,2,3.6,O2);p.ell(8,11,1.6,4,O);p.set(6,8,O3).set(9,8,O3);p.rect(7,6,2,2,'#5a3a1e');p.set(9,5,ST).set(10,5,ST);
  if(v){p.set(5,10,G).set(6,10,G2).set(10,10,G).set(11,10,G2);p.rect(5,13,7,1,G);p.set(6,14,G).set(10,14,G);p.set(8,13,G2);}
  else{p.set(5,10,G).set(6,9,G).set(10,9,G).set(11,10,G);p.set(6,10,G2).set(10,10,G2);p.rect(6,13,5,1,G);p.set(7,12,G).set(9,12,G);p.set(8,13,G2);}
  p.outline();return p.canvas();}
// a grassy burial mound with a stone door
function barrowSprite(v){const p=new Px(32,20),G='#3a6a42',G2='#2b5236',G3='#4f8a44',S='#56605a',S2='#3e4744',D='#141a18';
  p.ell(16,14,15,8,G);p.ell(14,11,10,5,G3);p.rect(1,17,30,3,G2);for(let x=3;x<29;x+=3)p.set(x,9+((x*7)%3),'#7bc25a');
  p.rect(12,10,8,8,S);p.rect(12,10,8,1,'#6e7a72');p.rect(14,12,4,6,D);p.set(13,11,S2).set(18,11,S2);if(v){p.set(15,13,'#c79bf2');p.set(16,13,'#c79bf2');}
  p.outline();return p.canvas();}
// Mordecai the Reaper: a tall black-robed figure with a lantern-lit skull face and a scythe, the hem fraying into mist
function reaperSprite(f){const p=new Px(26,32),R='#1f1b29',R2='#14111c',RH='#3a3350',BN='#e8dcc0',BN2='#b8a988',EY=f?'#c79bf2':'#e8d0ff',W='#6b4a32',BL='#c9d6e3',BL2='#7d8fa3',B=f?1:0;
  const row=(y,x0,x1,c)=>{for(let x=x0;x<=x1;x++)p.set(x,y,c);};
  // the scythe's haft (the blade is added below, out to the side, so it never hides behind his hood)
  p.line(21,3,20,31,W);p.set(21,31,'#4a3222');
  // the robe, flaring to the ground, its hem tattering into mist
  for(let y=13;y<=29;y++){const k=Math.floor((y-13)/3),l=8-k,r=17+k;row(y,l,r,R);p.set(l,y,R2);p.set(r,y,R2);}
  for(let y=16;y<=29;y++){p.set(12,y,RH);p.set(15+(y>24?1:0),y,R2);}
  for(let x=3;x<=22;x++)if((x+B)%2)p.set(x,30,R2);for(let x=4;x<=21;x+=3)p.set(x,31,'#2e2a42');
  // a bony hand on the haft, the other in the sleeve
  row(15,17,20,R);row(16,18,20,R2);p.set(20,15,BN).set(20,16,BN2);row(16,5,8,R);row(17,5,7,R2);
  // the hood: deep, the lit rim, a skull face in the dark with soul-lit eyes
  row(1+B,11,14,R);row(2+B,10,15,R);for(let y=3;y<=11;y++)row(y+B,9,16,R);row(12+B,8,17,R);
  for(let y=3;y<=11;y++){p.set(9,y+B,RH);p.set(16,y+B,R2);}row(2+B,11,14,RH);
  for(let y=4;y<=10;y++)row(y+B,10,15,R2);
  p.rect(11,5+B,4,4,BN);p.rect(11,8+B,4,1,BN2);p.set(11,6+B,EY).set(14,6+B,EY);p.set(12,6+B,'#14111c').set(13,6+B,'#14111c');p.set(12,9+B,BN).set(13,9+B,BN2);p.set(12,10+B,BN2);
  // v0.13.2: a bigger canvas (34x36, Mordecai 4 rows down) so the blade can sweep out to his left side and away from his
  // head: an iron collar with a soul-gem, then a great crescent curving down, its edge burning soul-green
  const q=new Px(34,36);for(let y=0;y<32;y++)for(let x=0;x<26;x++){const c=p.get(x,y);if(c)q.set(x,y+4,c);}
  const sp=[[22,6],[23,5],[24,4],[25,4],[26,4],[27,4],[28,5],[29,5],[30,6],[31,7],[32,8],[32,9],[33,10],[33,11]],wd=[2,3,3,3,3,3,3,3,2,2,2,1,1,0],
    eg=['#e8f4ff','#e8f4ff','#ffffff','#e8f4ff','#d6f7ee','#d6f7ee','#c0f5e2','#b4f3dc','#a9f2d8','#9cf0d2','#9cf0d2','#9cf0d2','#9cf0d2','#c8fff0'];
  sp.forEach(([x,y],i)=>{const w=wd[i];q.set(x,y,'#4a4560');for(let k=1;k<=w;k++)q.set(x,y+k,k===1?BL:BL2);q.set(x,y+w+1,eg[i]);});
  q.set(25,5,'#f4f4f4').set(27,5,'#e8f4ff');                                                       // moonlight on the flat
  q.rect(20,6,3,2,'#2a2438');q.set(21,6,'#c79bf2').set(22,7,'#f3e3ff');                           // the collar and its gem
  q.outline();return q.canvas();}
// ---- Hollowmere ground ----
function moorGrassTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#2f6b55');
  for(let i=0;i<16;i++)p.set(r()*16,r()*16,r()<.5?'#285a48':'#3d8466');
  for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0;p.set(x,y,'#4a9a74').set(x+1,y-1,'#4a9a74').set(x+2,y,'#3d8466');}
  if(r()<.35){const x=r()*14|0,y=r()*14|0;p.set(x,y,'#b8f7ff');}return p.canvas();}
function deepGrassTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#243f45');
  for(let i=0;i<16;i++)p.set(r()*16,r()*16,r()<.5?'#1d3438':'#2e5056');for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0;p.set(x,y,'#3a6268').set(x+1,y-1,'#3a6268');}
  if(r()<.3)p.set(r()*16,r()*16,'#c79bf2');return p.canvas();}
function moorPathTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#6a6656');
  const st=(x,y,w,h)=>{p.rect(x,y,w,h,r()<.5?'#8a8572':'#7d7866');p.rect(x,y,w,1,'#a39e88');p.rect(x,y+h-1,w,1,'#5a5648');};
  st(0,0,7,7);st(8,0,8,6);st(0,8,5,8);st(6,7,10,9);if(r()<.5)p.set(r()*16,r()*16,'#4f7a3a');return p.canvas();}
function plazaTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#191626');
  const st=(x,y,w,h)=>{p.rect(x,y,w,h,r()<.5?'#2e2a42':'#29263b');p.rect(x,y,w,1,'#3d3856');p.rect(x,y+h-1,w,1,'#1d1a2a');};st(0,0,8,8);st(8,0,8,8);st(0,8,8,8);st(8,8,8,8);
  if(seed%3===0){p.set(4,4,'#7a3b8f').set(11,11,'#7a3b8f');}if(seed%5===1)p.line(2,13,6,9,'#1d1a2a');return p.canvas();}
function moonWaterTile(f){const p=new Px(16,16);p.rect(0,0,16,16,'#1d3a6a');
  for(let y=2;y<16;y+=5)for(let x=(y+f*3)%8;x<16;x+=8)p.rect(x,y,3,1,'#2f5a9a');p.set((5+f*4)%16,9,'#b8f7ff');p.set((12+f*5)%16,4,'#c79bf2');p.set((2+f*7)%16,13,'#73eff7');return p.canvas();}
function canopyTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#0f1f1c');
  for(let i=0;i<5;i++){const x=r()*16,y=r()*16;p.ell(x,y,3+r()*2,2.5+r()*2,r()<.5?'#173229':'#1c3a30');}for(let i=0;i<5;i++)p.set(r()*16,r()*16,'#2b4b3a');return p.canvas();}
function cliffTile(seed){const p=new Px(16,16),r=rng(seed);p.rect(0,0,16,16,'#211e30');
  for(let y=0;y<16;y+=4){const o=(seed*3+y)%5;p.rect(0,y,16,1,'#2c2840');p.rect(0,y+3,16,1,'#17151f');for(let x=o;x<16;x+=6+((x+y)%3)){p.rect(x,y,1,4,'#17151f');p.set(x+1,y+1,'#3a3552');}}
  for(let i=0;i<3;i++){const x=r()*14|0,y=r()*14|0;p.set(x,y,'#45405e').set(x+1,y,'#3a3552');}return p.canvas();}
// a big weeping willow, blue-green
function willowSprite(dx=0){const p=new Px(32,40),B='#3a2a24',L='#2f6b55',L2='#3d8466',L3='#73c7a0';
  p.rect(14,22,4,16,B);p.rect(15,22,1,16,'#5a4236');p.ell(16+dx,12,13,10,L);p.ell(15+dx,9,9,6,L2);
  for(let x=4;x<=28;x+=3){const len=8+((x*7)%7);p.rect(x+Math.round(dx),14,1,len,x%2?L:L2);p.set(x+Math.round(dx),14+len,L3);}p.set(11,6,L3).set(19,5,L3);p.outline('#0f1f1c');return p.canvas();}
// standing stone with a glowing rune
function menhirSprite(v){const p=new Px(16,32),S='#4b5068',S2='#3a3f55',S3='#6d7391',G=v?'#c79bf2':'#73eff7';
  p.rect(4,6,8,24,S);p.rect(9,6,3,24,S2);p.ell(8,6,4,3,S);p.set(5,4,S3).set(6,3,S3);p.rect(3,29,10,2,S2);p.rect(7,11,2,7,G);p.set(6,13,G).set(9,15,G);p.set(5,22,'#4f7a3a').set(6,21,'#38b764');p.outline();return p.canvas();}
function reedsSprite(v){const p=new Px(16,16),A='#4a9a74',B='#2f6b55',C='#a0663b';for(let i=0;i<4;i++){const x=3+i*3+(v?1:0),h=6+((i*5+v)%4);p.line(x,15,x+(i%2?1:-1),15-h,i%2?A:B);if(i%2===0)p.rect(x-1+(i%2?1:-1),15-h,1,3,C);}return p.canvas();}
function mushRingSprite(){const p=new Px(16,16);[[3,9],[8,7],[13,9],[5,13],[11,13]].forEach(([x,y],i)=>{p.rect(x,y,1,2,'#d8c8a0');p.rect(x-1,y-1,3,1,i%2?'#c79bf2':'#73eff7');});return p.canvas();}
function moonCrystalSprite(v){const p=new Px(16,22),A='#5a4ab0',B='#b8a7ff',W='#f1e4ff';
  const spike=(x,h,w)=>{p.rect(x,21-h,w,h,A);p.rect(x,21-h,1,h,B);p.set(x,20-h,W);};if(v){spike(3,10,3);spike(7,15,3);spike(11,7,2);}else{spike(4,8,2);spike(7,12,3);spike(11,10,3);}p.outline('#1d1a2a');return p.canvas();}
function campfireSprite(f){const p=new Px(16,16);p.line(3,13,12,11,'#6b3e26').line(3,11,12,13,'#4b3226');p.ell(8,9,3+f*.4,4,'#b13e53');p.ell(8,9.5,2,3,'#ff9f3d');p.ell(8,10,1,1.6,'#ffcd75');p.set(f?6:10,4,'#ff9f3d');p.rect(2,13,12,1,'#4b5068');p.outline();return p.canvas();}
// the bank chest by the raid gate: an iron-bound strongbox with the Bank's gold seal
function bankChestSprite(){const p=new Px(24,20),I='#4b5068',I2='#6d7391',W='#5a4236',W2='#3a2a24',G='#ffcd75';
  p.rect(1,7,22,12,W);p.rect(1,7,22,2,W2);p.rect(1,3,22,5,W);p.ell(12,4,11,2.5,W);p.rect(1,7,22,1,I2);for(const x of [3,11,19])p.rect(x,2,2,17,I);
  p.rect(9,9,6,6,G);p.rect(10,10,4,4,'#d9a066');p.set(11,11,'#fff3c4');p.rect(11,13,2,2,'#1a1c2c');p.rect(1,18,22,1,'#1a1c2c');p.outline();return p.canvas();}
function hmSignSprite(){const p=new Px(18,24);p.rect(8,8,2,16,'#3a2a24');p.rect(8,8,1,16,'#5a4236');p.rect(1,1,16,9,'#2e2a42');p.rect(1,1,16,1,'#45405e');p.rect(1,9,16,1,'#1d1a2a');
  p.rows(2,3,['..x..........','.xx.xxxxxxxx.','xxxxxxxxxxxx.','.xx.xxxxxxxx.','..x..........'],{x:'#c79bf2'});p.set(14,2,'#f1e4ff').set(13,3,'#f1e4ff');p.outline();return p.canvas();}
function eyeIcon(){const p=new Px(16,16);p.ell(8,8,6,4,'#f4f4f4');p.ell(8,8,3,3,'#3b5dc9');p.ell(8,8,1.4,1.4,'#1a1c2c');p.set(6,6,'#ffffff');p.outline();return p.canvas();}
// THE ABYSSAL MAW: the raid gate. A colossal horned skull of black stone set into a cliff, its jaw a portal of violet
// fire, flanked by two obsidian spires crowned with braziers. 112 x 104 px, two frames (the fire breathes).
function mawSprite(f){const W=144,H=128,p=new Px(W,H),r=rng(77),cx=72;
  const K='#0b0a12',K2='#15131f',K3='#221f31',K4='#302b45',K5='#3d3756',B='#e2d5b0',B2='#bfb08a',B3='#8f8264',B4='#5e5442',V='#c79bf2',V2='#7a3b8f',V3='#f1e4ff',V4='#4a2366',E='#ff4d6d',E2='#ffb3c1';
  const poly=(pts,c)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const [x,y] of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
    for(let y=Math.floor(y0);y<=Math.ceil(y1);y++)for(let x=Math.floor(x0);x<=Math.ceil(x1);x++){let inn=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>y+.5)!==(yj>y+.5)&&x+.5<(xj-xi)*(y+.5-yi)/(yj-yi)+xi)inn=!inn;}if(inn)p.set(x,y,c);}};
  const mir=pts=>pts.map(([x,y])=>[2*cx-x,y]);
  // the cliff: a jagged wall of black rock with violet veins
  const ridge=[[0,H-14]];for(let x=0;x<=W;x+=6)ridge.push([x,(x/6)%2?30+(r()*14|0):12+(r()*12|0)]);ridge.push([W,H-14]);poly(ridge,K2);
  for(let y=20;y<H-14;y+=5)for(let x=0;x<W;x++)if(p.get(x,y)===K2&&((x+y*3)%11)<7)p.set(x,y,K3);
  for(let i=0;i<5;i++){let x=10+r()*124|0,y=40+r()*40|0;for(let k=0;k<14;k++){if(p.get(x,y))p.set(x,y,k%4?V4:V2);x+=r()<.5?1:-1;y+=1;}}
  // horns: thick crescents from the temples, out and up to a point
  const horn=(sgn)=>{for(let i=0;i<=26;i++){const t=i/26,x=cx+sgn*(26+t*34-t*t*10),y=46-t*30-t*t*8,rad=6.5*(1-t)+1;p.ell(x,y,rad,rad,i%5===0?B3:B2);p.ell(x-sgn*rad*.3,y-rad*.3,rad*.55,rad*.55,i%5===0?B2:B);}};horn(-1);horn(1);
  // the skull: a broad angular cranium, heavy cheekbones, tapering to the jaw
  const head=[[cx-22,18],[cx-30,26],[cx-36,40],[cx-38,56],[cx-32,66],[cx-30,76],[cx-20,80],[cx-12,72]];poly(head.concat(mir(head).reverse()),B);
  poly([[cx-22,18],[cx-30,26],[cx-36,40],[cx-38,56],[cx-32,66],[cx-30,60],[cx-31,44],[cx-25,28]],B2);poly(mir([[cx-22,18],[cx-30,26],[cx-36,40],[cx-38,56],[cx-32,66],[cx-30,60],[cx-31,44],[cx-25,28]]),B3);
  for(const [x,y,l] of [[cx-6,20,9],[cx+10,24,7],[cx-16,30,6],[cx+20,36,8]]){let px2=x,py=y;for(let k=0;k<l;k++){p.set(px2,py,B4);px2+=((k*7)%3)-1;py++;}}   // cracks
  // the brow: a heavy V that makes the skull glare
  poly([[cx-34,38],[cx-4,46],[cx,52],[cx+4,46],[cx+34,38],[cx+30,34],[cx,42],[cx-30,34]],B3);
  // eye sockets: slanted, deep, burning
  const eye=[[cx-30,42],[cx-8,48],[cx-12,56],[cx-26,54]];poly(eye,K);poly(mir(eye),K);
  const glow=(x)=>{p.ell(x,51,4.5,2.6,f?E:'#d9304f');p.ell(x,51,2.2,1.4,E2);p.set(x,51,'#ffffff');};glow(cx-18);glow(cx+18);
  // nose: an inverted, split triangle
  poly([[cx-6,58],[cx+6,58],[cx+2,68],[cx-2,68]],K);p.rect(cx,58,1,10,K3);
  // the open jaw: a portal of violet fire, framed by fangs
  p.ell(cx,95,31,23,K);p.ell(cx,96,28,20,V4);p.ell(cx,97,24,17,f?V2:'#8a4aa8');p.ell(cx,98,19,13,f?'#a77de0':V);p.ell(cx,99,13,8,V);p.ell(cx,100,7,4,V3);p.ell(cx,100,3,2,'#ffffff');
  for(let k=0;k<3;k++){const a0=(f?.6:0)+k*2.1;for(let t=0;t<16;t++){const a=a0+t*.35,rr=4+t*1.35;p.set(Math.round(cx+Math.cos(a)*rr*1.35),Math.round(99+Math.sin(a)*rr*.8),t%3?V3:V);}}   // the swirl
  // cheek plates down to the jaw hinge
  poly([[cx-32,66],[cx-36,74],[cx-30,92],[cx-26,80],[cx-22,74]],B2);poly(mir([[cx-32,66],[cx-36,74],[cx-30,92],[cx-26,80],[cx-22,74]]),B3);
  // upper fangs (long at the corners) and lower fangs
  const fang=(x,y,len,down,c)=>{for(let i=0;i<len;i++){const w=Math.max(0,Math.round(2.4*(1-i/len)));p.rect(x-w,y+(down?i:-i),w*2+1,1,c);}p.set(x,y+(down?len:-len),c);};
  for(let i=-5;i<=5;i++){const L=Math.abs(i)===4?16:Math.abs(i)===5?9:7;fang(cx+i*5,74,L,true,i%2?B:B2);}
  for(let i=-4;i<=4;i++){const L=Math.abs(i)===3?12:6;fang(cx+i*6+3,118,L,false,i%2?B2:B);}
  poly([[cx-34,114],[cx+34,114],[cx+30,120],[cx-30,120]],B3);p.rect(cx-30,118,60,2,B4);
  // spires with braziers of violet flame at either side
  const spire=(x)=>{poly([[x,30],[x+5,14],[x+10,30],[x+10,112],[x,112]],K);p.rect(x+1,30,3,82,K4);for(let y=36;y<106;y+=10)p.rect(x+4,y,2,5,f?V:V2);p.rect(x-3,108,16,4,K4);
    p.rect(x-2,26,14,3,K5);p.rect(x,23,10,3,K4);p.ell(x+5,17,4.5+f*.5,6,V2);p.ell(x+5,18,3,4,V);p.ell(x+5,19,1.4,2,V3);};spire(4);spire(W-14);
  // chains from the horn tips to the spires
  for(let i=0;i<16;i++){const t=i/16;p.set(Math.round(12+t*26),Math.round(28+Math.sin(t*Math.PI)*8+t*-8),i%2?'#6d7391':'#94b0c2');p.set(Math.round(W-12-t*26),Math.round(28+Math.sin(t*Math.PI)*8+t*-8),i%2?'#6d7391':'#94b0c2');}
  // rune steps
  p.rect(20,120,104,4,K4);p.rect(14,124,116,4,K5);p.rect(22,121,100,1,K5);for(let x=26;x<120;x+=8)p.set(x,125,f?V:V2).set(x+1,125,V4);
  p.outline('#05040a');return p.canvas();}
function globeIcon(){const p=new Px(16,16),O='#3b5dc9',L='#38b764',L2='#a7f070';p.ell(8,8,7,7,O);p.ell(8,8,5.6,5.6,'#41a6f6');
  p.rows(3,3,['..ll.....','.llll..l.','..lll.ll.','...l..ll.','......l..','..ll.....','...l.....'],{l:L});p.set(5,4,L2).set(11,5,L2);p.set(5,3,'#e8fbff').set(4,4,'#e8fbff');p.outline();return p.canvas();}
function uncommonChestSprite(open){const p=new Px(16,16),W='#2f6b55',W2='#1d4a3a',G='#a7f070',M='#94b0c2';p.rect(2,6,12,8,W);p.rect(2,6,12,2,W2);p.rect(2,10,12,1,W2);
  p.rect(2,6,1,8,M).rect(13,6,1,8,M);p.rect(7,9,2,3,G);p.set(7,9,'#e8fff8');if(open){p.rect(2,3,12,3,W2);p.rect(4,6,8,2,G);}else{p.rect(2,4,12,2,W);p.rect(2,4,12,1,M);}p.outline();return p.canvas();}

// ---------- build the atlas ----------
const ART={};
function buildArt(){
  const dirs=['down','up','left','right'];
  
  ART.lantern={};for(const t of Object.keys(LANTERNS))ART.lantern[t]=lanternSprite(t);ART.lantern.none=ART.lantern.basic;
  ART.lanternF={};for(const t of Object.keys(LANTERNS))ART.lanternF[t]=lanternSprite(t,'#b98cff');
  ART.sword={};for(const t of Object.keys(GEAR.blade))ART.sword[t]=swordSprite(t==='rusty'?'none':t);
  ART.scythe=scytheSprite();ART.scytheM=scytheSprite(true);
  ART.slime=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime));
  ART.gelling=[0,1].map(f=>slimeFrame(f,PAL.lime,PAL.white));
  ART.mother=[0,1].map(f=>slimeFrame(f,PAL.green,PAL.lime,true));
  ART.bat=[0,1].map(f=>batFrame(f));ART.crawler=[0,1].map(crawlerFrame);
  ART.skeleton=[0,1].map(skeletonFrame);ART.wisp=[0,1].map(wispFrame);ART.spider=[0,1].map(spiderFrame);
  ART.shade=[0,1].map(shadeFrame);ART.knight=[0,1].map(knightFrame);
  ART.imp=[0,1].map(impFrame);ART.golem=[0,1].map(golemFrame);ART.cinderbat=[0,1].map(f=>batFrame(f,'#7a1c2c',PAL.yellow));ART.tyrant=[0,1].map(tyrantFrame);
  ART.wraith=[0,1].map(wraithFrame);ART.sentinel=[0,1].map(sentinelFrame);ART.shardling=[0,1].map(shardlingFrame);ART.warden=[0,1].map(wardenFrame);
  ART.grass=[1,2,3,4].map(grassTile);ART.path=[5,6,7].map(pathTile);ART.water=[0,1].map(waterTile);
  ART.soil=soilTile(false);ART.soilLocked=lockedSoilTile();ART.dock={walk:dockTile('walk'),deck:dockTile('deck')};ART.lily=[lilySprite(0),lilySprite(1)];ART.soilWet=soilTile(true);
  ART.floor={};ART.wall={};ART.face={};
  for(const b of Object.keys(BIOMES)){ART.floor[b]=[11,12,13,14].map(s=>floorTile(b,s));ART.wall[b]=[21,22].map(s=>wallTile(b,false,s));ART.face[b]=[31,32,33].map(s=>wallTile(b,true,s));}
  ART.stairs=stairsTile();ART.deco=decoSprites();ART.chest=[chestSprite(false),chestSprite(true)];ART.torch=[0,1].map(torchSprite);
  ART.ore={copper:oreSprite('copper'),iron:oreSprite('iron'),ember:emberOreSprite(0),coal:oreSprite('coal'),cobalt:oreSprite('cobalt'),gloam:oreSprite('gloam'),starshard:starOreSprite(0)};ART.emberOre=[emberOreSprite(0),emberOreSprite(1)];ART.starOre=[starOreSprite(0),starOreSprite(1)];
  ART.cinders=[0,1].map(cindersSprite);ART.crystal=[0,1].map(crystalSprite);
  ART.glowcap=glowcapSprite();ART.bones=bonesSprite();
  ART.partyhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#3b5dc9',s:'#73eff7',c:'#29366f'});q.outline();return q.canvas();})();
  ART.greenhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#38b764',s:'#a7f070',c:'#257179'});q.outline();return q.canvas();})();
  ART.tree=treeSprite();ART.crown=crownSprite();ART.crownS=crownSmall();ART.treeSway=[treeSprite(-.6),treeSprite(.6)];ART.stump=stumpSprite();ART.axe=axeSprite();ART.house=houseSprite();ART.bank=bankSprite();ART.forge=[0,1].map(forgeSprite);ART.kitchen=[0,1].map(kitchenSprite);
  ART.press=pressSprite();ART.bench=[0,1].map(benchSprite);ART.board=boardSprite();ART.gate=[gateSprite(0),gateSprite(1)];ART.merchant=[merchantSprite(0),merchantSprite(1)];ART.wick=[wickSprite(0),wickSprite(1)];ART.stall=stallSprite();ART.sign=signSprite();ART.barricade=barricadeSprite();ART.lanternPost=[lanternPost(0),lanternPost(1)];ART.fence=fenceSprite();ART.well=wellSprite();
  ART.flowers=[PAL.pink,PAL.white,PAL.yellow,PAL.sky].map(flowerSprite);
  ART.wgrass=[41,42,43,44].map(wildGrassTile);ART.wpath=[45,46,47].map(wildPathTile);ART.gloom=[0,1].map(gloomTile);
  ART.wwall={};for(const e of ['',  'l','r'])for(const v of [0,1,2])ART.wwall[e+v]=wildWallSprite(v,e||null);
  ART.deadtree=[0,1].map(deadTreeSprite);ART.bwTree=blackwoodSprite();ART.bwSway=[blackwoodSprite(-.6),blackwoodSprite(.6)];
  ART.rock=[0,1].map(rockSprite);ART.grave=[0,1,2].map(graveSprite);ART.pillar=[0,1].map(pillarSprite);ART.obelisk=[0,1].map(obeliskSprite);
  ART.skullpost=skullPostSprite();ART.wsign=wildSignSprite();ART.wbones=[0,1,2].map(wildBonesSprite);ART.weed=[0,1,2].map(weedSprite);ART.skull=skullMark();
  ART.crop={};for(const k of Object.keys(CROPS))ART.crop[k]=[0,1,2].map(s=>cropSprite(k,s));
  // v0.12
  ART.drowned=[0,1].map(drownedFrame);ART.eel=[0,1].map(eelFrame);ART.tome=[0,1].map(tomeFrame);ART.husk=[0,1].map(huskFrame);ART.voidling=[0,1].map(voidlingFrame);ART.watcher=[0,1].map(watcherFrame);
  ART.orb=[0,1].map(orbFrame);ART.vorb=[0,1].map(voidOrbFrame);ART.rift=[0,1].map(riftFrame);ART.archmage=[0,1].map(archmageFrame);ART.hollowking=[0,1].map(hollowKingFrame);
  ART.raven=[0,1].map(ravenFrame);ART.gloomstag=[0,1].map(gloomstagFrame);ART.mossgiant=[0,1].map(mossGiantFrame);ART.moss=[71,72,73,74].map(mossTile);ART.wgblend=[.3,.55,.78].map((k,j)=>[1,2,3,4].map(i=>blendGrassTile(k,80+j*10+i)));ART.wpath2=[91,92,93].map(dirtStoneTile);ART.pumpkin=[0,1].map(pumpkinSprite);ART.barrow=[0,1].map(barrowSprite);ART.reaper=[reaperSprite(0),reaperSprite(1)];
  ART.wolf=[0,1].map(wolfFrame);ART.boar=[0,1].map(boarFrame);ART.bogling=[0,1].map(boglingFrame);ART.mirewisp=[0,1].map(mirewispFrame);ART.treant=[0,1].map(treantFrame);
  ART.mgrass=[51,52,53,54].map(moorGrassTile);ART.dgrass=[55,56,57,58].map(deepGrassTile);ART.mpath=[61,62,63].map(moorPathTile);ART.plaza=[64,65,66,67,68].map(plazaTile);
  ART.moonw=[0,1].map(moonWaterTile);ART.canopy=[71,72,73,74].map(canopyTile);ART.cliff=[75,76].map(cliffTile);
  ART.willow=willowSprite();ART.willowSway=[willowSprite(-.6),willowSprite(.6)];ART.menhir=[0,1].map(menhirSprite);ART.reeds=[0,1].map(reedsSprite);ART.mushring=mushRingSprite();
  ART.mcrystal=[0,1].map(moonCrystalSprite);ART.campfire=[0,1].map(campfireSprite);ART.bankChest=bankChestSprite();ART.hmsign=hmSignSprite();ART.maw=[mawSprite(0),mawSprite(1)];
  ART.globe=globeIcon();ART.uchest=[uncommonChestSprite(false),uncommonChestSprite(true)];
  ART.icon={};
}
function iconOf(id){if(!ART.icon[id])ART.icon[id]=icon(id);return ART.icon[id];}
