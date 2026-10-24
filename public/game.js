// Bitmap pixel fonts (rasterised from Press Start 2P and Silkscreen, both OFL) so text is crisp at any scale
const BFONT={big:{h:8,g:{"0":[7,28,38,99,99,99,50,28,0],"1":[6,12,28,12,12,12,12,63,0],"2":[7,62,99,7,30,60,112,127,0],"3":[7,63,6,12,30,3,99,62,0],"4":[7,14,30,54,102,127,6,6,0],"5":[7,126,96,126,3,3,99,62,0],"6":[7,30,48,96,126,99,99,62,0],"7":[7,127,99,6,12,24,24,24,0],"8":[7,60,98,114,60,79,67,62,0],"9":[7,62,99,99,63,3,6,60,0]," ":[4],"!":[3,7,7,7,6,6,0,6,0],"\"":[5,27,27,27,0,0,0,0,0],"#":[7,54,127,54,54,54,127,54,0],"$":[7,8,62,104,62,11,126,8,0],"%":[7,49,82,100,8,19,37,70,0],"&":[7,56,108,108,56,109,102,63,0],"'":[2,3,3,3,0,0,0,0,0],"(":[4,3,6,12,12,12,6,3,0],")":[4,12,6,3,3,3,6,12,0],"*":[7,0,54,28,127,28,54,0,0],"+":[6,0,12,12,63,12,12,0,0],",":[3,0,0,0,0,0,3,3,6],"-":[6,0,0,0,63,0,0,0,0],".":[2,0,0,0,0,0,3,3,0],"/":[7,1,2,4,8,16,32,64,0],":":[2,0,3,3,0,3,3,0,0],";":[3,0,3,3,0,3,3,6,0],"<":[5,3,6,12,24,12,6,3,0],"=":[7,0,0,127,0,127,0,0,0],">":[5,24,12,6,3,6,12,24,0],"?":[7,62,127,99,6,28,0,28,0],"@":[7,62,65,93,85,95,64,62,0],"A":[7,28,54,99,99,127,99,99,0],"B":[7,126,99,99,126,99,99,126,0],"C":[7,30,51,96,96,96,51,30,0],"D":[7,124,102,99,99,99,102,124,0],"E":[7,127,96,96,126,96,96,127,0],"F":[7,127,96,96,126,96,96,96,0],"G":[7,31,48,96,103,99,51,31,0],"H":[7,99,99,99,127,99,99,99,0],"I":[6,63,12,12,12,12,12,63,0],"J":[7,3,3,3,3,3,99,62,0],"K":[7,99,102,108,120,124,110,103,0],"L":[6,48,48,48,48,48,48,63,0],"M":[7,99,119,127,107,107,99,99,0],"N":[7,99,115,123,111,103,99,99,0],"O":[7,62,99,99,99,99,99,62,0],"P":[7,126,99,99,99,126,96,96,0],"Q":[7,62,99,99,99,111,102,61,0],"R":[7,126,99,99,103,124,110,103,0],"S":[7,62,99,96,62,3,99,62,0],"T":[6,63,12,12,12,12,12,12,0],"U":[7,99,99,99,99,99,99,62,0],"V":[7,99,99,99,119,62,28,8,0],"W":[7,107,107,107,107,127,119,34,0],"X":[7,99,99,54,28,54,99,99,0],"Y":[6,51,51,51,30,12,12,12,0],"Z":[7,127,7,14,28,56,112,127,0],"[":[4,15,12,12,12,12,12,15,0],"\\":[7,64,32,16,8,4,2,1,0],"]":[4,15,3,3,3,3,3,15,0],"^":[5,14,27,0,0,0,0,0,0],"_":[7,0,0,0,0,0,0,0,127],"`":[2,2,1,0,0,0,0,0,0],"a":[7,0,0,62,3,63,99,63,0],"b":[7,96,96,126,99,99,99,62,0],"c":[7,0,0,63,96,96,96,63,0],"d":[7,3,3,63,99,99,99,63,0],"e":[7,0,0,62,99,127,96,62,0],"f":[6,7,12,63,12,12,12,12,0],"g":[7,0,0,63,99,99,63,3,62],"h":[7,96,96,126,99,99,99,99,0],"i":[6,12,0,28,12,12,12,63,0],"j":[5,3,0,7,3,3,3,3,30],"k":[7,96,96,99,102,124,102,99,0],"l":[6,28,12,12,12,12,12,63,0],"m":[7,0,0,126,91,91,91,91,0],"n":[7,0,0,126,99,99,99,99,0],"o":[7,0,0,62,99,99,99,62,0],"p":[7,0,0,126,99,99,126,96,96],"q":[7,0,0,63,99,99,63,3,3],"r":[6,0,0,55,56,48,48,48,0],"s":[7,0,0,62,96,62,3,126,0],"t":[6,12,12,63,12,12,12,12,0],"u":[7,0,0,99,99,99,99,63,0],"v":[6,0,0,51,51,51,30,12,0],"w":[7,0,0,107,107,107,107,54,0],"x":[7,0,0,99,54,28,54,99,0],"y":[7,0,0,99,99,99,63,3,62],"z":[7,0,0,127,14,28,56,127,0],"{":[4,3,6,6,12,6,6,3,0],"|":[2,3,3,3,3,3,3,3,0],"}":[4,12,6,6,3,6,6,12,0],"~":[7,0,0,56,93,14,0,0,0]}},small:{h:7,g:{"0":[4,0,6,9,9,9,6,0],"1":[3,0,6,2,2,2,7,0],"2":[4,0,14,1,6,8,15,0],"3":[4,0,14,1,6,1,14,0],"4":[4,0,10,10,15,2,2,0],"5":[4,0,15,8,14,1,14,0],"6":[4,0,6,8,14,9,6,0],"7":[4,0,15,1,2,4,4,0],"8":[4,0,6,9,6,9,6,0],"9":[4,0,6,9,7,1,6,0]," ":[2],"!":[1,0,1,1,1,0,1,0],"\"":[3,0,5,5,0,0,0,0],"#":[5,0,10,31,10,31,10,0],"$":[4,2,7,8,6,1,14,4],"%":[5,0,26,26,4,11,11,0],"&":[4,2,7,8,6,8,7,2],"'":[1,0,1,1,0,0,0,0],"(":[2,0,1,2,2,2,1,0],")":[2,0,2,1,1,1,2,0],"*":[5,0,4,21,14,21,4,0],"+":[5,0,4,4,31,4,4,0],",":[2,0,0,0,0,0,1,2],"-":[3,0,0,0,7,0,0,0],".":[1,0,0,0,0,0,1,0],"/":[3,0,1,1,2,4,4,0],":":[1,0,0,1,0,1,0,0],";":[2,0,0,1,0,1,2,0],"<":[3,0,1,2,4,2,1,0],"=":[3,0,0,7,0,7,0,0],">":[3,0,4,2,1,2,4,0],"?":[4,0,14,1,6,0,4,0],"@":[5,0,14,21,22,16,14,0],"A":[4,0,6,9,15,9,9,0],"B":[4,0,14,9,15,9,14,0],"C":[4,0,6,9,8,9,6,0],"D":[4,0,14,9,9,9,14,0],"E":[3,0,7,4,7,4,7,0],"F":[3,0,7,4,7,4,4,0],"G":[4,0,7,8,11,9,6,0],"H":[4,0,9,9,15,9,9,0],"I":[1,0,1,1,1,1,1,0],"J":[4,0,1,1,1,9,6,0],"K":[4,0,9,10,12,10,9,0],"L":[3,0,4,4,4,4,7,0],"M":[5,0,17,27,21,17,17,0],"N":[5,0,17,25,21,19,17,0],"O":[4,0,6,9,9,9,6,0],"P":[4,0,14,9,14,8,8,0],"Q":[4,0,6,9,9,9,6,1],"R":[4,0,14,9,14,10,9,0],"S":[4,0,7,8,6,1,14,0],"T":[3,0,7,2,2,2,2,0],"U":[4,0,9,9,9,9,6,0],"V":[5,0,17,17,10,10,4,0],"W":[5,0,17,21,21,21,10,0],"X":[5,0,17,10,4,10,17,0],"Y":[5,0,17,10,4,4,4,0],"Z":[3,0,7,1,2,4,7,0],"[":[2,0,3,2,2,2,3,0],"\\":[3,0,4,4,2,1,1,0],"]":[2,0,3,1,1,1,3,0],"^":[3,2,5,0,0,0,0,0],"_":[4,0,0,0,0,0,0,15],"`":[2],"a":[4,0,6,9,15,9,9,0],"b":[4,0,14,9,15,9,14,0],"c":[4,0,6,9,8,9,6,0],"d":[4,0,14,9,9,9,14,0],"e":[3,0,7,4,7,4,7,0],"f":[3,0,7,4,7,4,4,0],"g":[4,0,7,8,11,9,6,0],"h":[4,0,9,9,15,9,9,0],"i":[1,0,1,1,1,1,1,0],"j":[4,0,1,1,1,9,6,0],"k":[4,0,9,10,12,10,9,0],"l":[3,0,4,4,4,4,7,0],"m":[5,0,17,27,21,17,17,0],"n":[5,0,17,25,21,19,17,0],"o":[4,0,6,9,9,9,6,0],"p":[4,0,14,9,14,8,8,0],"q":[4,0,6,9,9,9,6,1],"r":[4,0,14,9,14,10,9,0],"s":[4,0,7,8,6,1,14,0],"t":[3,0,7,2,2,2,2,0],"u":[4,0,9,9,9,9,6,0],"v":[5,0,17,17,10,10,4,0],"w":[5,0,17,21,21,21,10,0],"x":[5,0,17,10,4,10,17,0],"y":[5,0,17,10,4,4,4,0],"z":[3,0,7,1,2,4,7,0],"{":[3,0,3,2,4,2,3,0],"|":[1,1,1,1,1,1,1,1],"}":[3,0,6,2,1,2,6,0],"~":[4,0,5,10,0,0,0,0]}}};
const PTXT_CACHE=new Map();
function ptMeasure(str,font){const F=BFONT[font];let w=0;for(const ch of String(str)){const gl=F.g[ch]||F.g['?'];w+=gl[0]+1;}return Math.max(0,w-1);}
// Render a string to a small canvas: 1 canvas pixel per font pixel, optional 1px drop shadow.
function ptCanvas(str,font,color,shadow){str=String(str).replace(/·/g,'-').replace(/…/g,'...').replace(/[—–]/g,'-').replace(/[’‘]/g,"'");const key=str+'|'+font+'|'+color+'|'+shadow;let c=PTXT_CACHE.get(key);if(c)return c;
  const F=BFONT[font],w=ptMeasure(str,font)+1,h=F.h+1;c=document.createElement('canvas');c.width=Math.max(1,w);c.height=h;const g=c.getContext('2d');
  const paint=(ox,oy,col)=>{g.fillStyle=col;let x=ox;for(const ch of str){const gl=F.g[ch]||F.g['?'],gw=gl[0];if(gl.length>1)for(let r=0;r<F.h;r++){const bits=gl[1+r];for(let i=0;i<gw;i++)if(bits>>(gw-1-i)&1)g.fillRect(x+i,oy+r,1,1);}x+=gw+1;}};
  if(shadow)paint(1,1,shadow);paint(0,0,color);
  if(PTXT_CACHE.size>600)PTXT_CACHE.clear();PTXT_CACHE.set(key,c);return c;}
function ptDraw(g,str,x,y,o){o=o||{};const c=ptCanvas(str,o.font||'small',o.color||'#f4f4f4',o.shadow===undefined?'#1a1c2c':o.shadow);
  const al=o.align||'center',dx=al==='center'?-Math.floor((c.width-1)/2):al==='right'?-(c.width-1):0;
  if(o.bg){g.fillStyle=o.bg;g.fillRect(Math.round(x+dx-2),Math.round(y-2),c.width+3,c.height+3);}
  g.drawImage(c,Math.round(x+dx),Math.round(y));return c.width;}
// Crisp text inside the HUD: draws into a <canvas> sized to a whole number of device pixels per font pixel.
function ptSet(el,str,o){o=o||{};str=String(str);if(el._pt===str+(o.color||''))return;el._pt=str+(o.color||'');
  const font=o.font||'big',src=ptCanvas(str,font,o.color||'#f4f4f4',o.shadow===undefined?'#1a1c2c':o.shadow),dpr=window.devicePixelRatio||1;
  const want=o.px||12,F=BFONT[font],m=Math.max(1,Math.round(want*dpr/F.h+.25));
  el.width=src.width*m;el.height=src.height*m;const g=el.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(src,0,0,el.width,el.height);
  el.style.width=(el.width/dpr)+'px';el.style.height=(el.height/dpr)+'px';}

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
function stumpSprite(){const p=new Px(32,32);p.rect(12,23,8,6,PAL.bark).rect(13,23,6,1,PAL.tan).rect(14,24,4,1,PAL.wood);p.rect(10,28,3,2,PAL.bark).rect(19,28,3,2,PAL.bark);p.ell(16,30,6,2,null);p.outline();return p.canvas();}
function axeSprite(){const p=new Px(10,12);p.rect(4,2,2,10,PAL.wood).rect(5,2,1,10,PAL.bark);p.rect(5,1,4,4,'#94b0c2').rect(8,0,1,6,'#c2d3e0').rect(6,2,2,1,'#566c86');p.outline();return p.canvas();}
function treeSprite(){const p=new Px(32,32);p.rect(14,20,4,10,PAL.bark).rect(15,20,1,10,PAL.wood);
  p.ell(16,13,11,10,PAL.fern);p.ell(14,11,8,7,PAL.green);p.ell(12,9,4,3,PAL.lime);p.ell(16,30,6,2,null);p.outline();return p.canvas();}
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
  ART.tree=treeSprite();ART.stump=stumpSprite();ART.axe=axeSprite();ART.house=houseSprite();ART.bank=bankSprite();ART.forge=[0,1].map(forgeSprite);ART.kitchen=[0,1].map(kitchenSprite);
  ART.press=pressSprite();ART.board=boardSprite();ART.gate=gateSprite();ART.fence=fenceSprite();ART.well=wellSprite();
  ART.flowers=[PAL.pink,PAL.white,PAL.yellow,PAL.sky].map(flowerSprite);
  ART.crop={};for(const k of ['wheat','lampseed','glowcap'])ART.crop[k]=[0,1,2].map(s=>cropSprite(k,s));
  ART.icon={};
}
function iconOf(id){if(!ART.icon[id])ART.icon[id]=icon(id);return ART.icon[id];}

// ===== Lanternhold content pack (season 0). Expansions add entries here, not code. =====
const ITEMS={
  gold:{n:'Gold',v:1},
  copper_ore:{n:'Copper Ore',v:4},iron_ore:{n:'Iron Ore',v:9},ember_ore:{n:'Emberite Ore',v:30},
  gem:{n:'Cave Gem',v:40},slime_gel:{n:'Slime Gel',v:2},bone:{n:'Old Bone',v:3},
  wheat_seed:{n:'Wheat Seed',v:2},lampseed:{n:'Lampseed',v:12},glowcap_spore:{n:'Glowcap Spore',v:6},
  wheat:{n:'Wheat',v:3},glowcap:{n:'Glowcap',v:9},
  logs:{n:'Logs',v:2},
  bread:{n:'Bread',v:8,heal:30,food:true},stew:{n:'Glowcap Stew',v:20,heal:70,food:true},
  oil:{n:'Oil Flask',v:15,oil:50},
  rusty_blade:{n:'Rusty Blade',v:1,gear:'blade',tier:'rusty'},traveler_garb:{n:'Traveler Garb',v:1,gear:'mail',tier:'none'},
  copper_blade:{n:'Copper Blade',v:60,gear:'blade',tier:'copper'},iron_blade:{n:'Iron Blade',v:160,gear:'blade',tier:'iron'},ember_blade:{n:'Ember Blade',v:520,gear:'blade',tier:'ember'},
  copper_mail:{n:'Copper Mail',v:70,gear:'mail',tier:'copper'},iron_mail:{n:'Iron Mail',v:180,gear:'mail',tier:'iron'},ember_mail:{n:'Ember Mail',v:560,gear:'mail',tier:'ember'},
  raw_pondfin:{n:'Raw Pondfin',v:5},pondfin:{n:'Cooked Pondfin',v:12,heal:35,food:true},burnt_fish:{n:'Burnt Fish',v:0},
  copper_helm:{n:'Copper Helm',v:40,gear:'helm',tier:'copper'},iron_helm:{n:'Iron Helm',v:120,gear:'helm',tier:'iron'},ember_helm:{n:'Ember Helm',v:420,gear:'helm',tier:'ember'},
  partyhat_helm:{n:'Blue Party Hat',v:0,gear:'helm',tier:'partyhat',rarity:'unique',bound:true},
  greenhat_helm:{n:'Green Party Hat',v:0,gear:'helm',tier:'greenhat',rarity:'unique',bound:true},
  relic_crown:{n:'Slime Crown',v:400,relic:true},relic_sigil:{n:"Knight's Sigil",v:900,relic:true}
};
const GEAR={
  blade:{rusty:{dmg:6,n:'Rusty Blade'},copper:{dmg:10},iron:{dmg:16},ember:{dmg:25}},
  mail:{none:{def:0,n:'Traveler Garb'},copper:{def:2},iron:{def:4},ember:{def:7}},
  helm:{copper:{def:1},iron:{def:2},ember:{def:4},partyhat:{def:25},greenhat:{def:25}}
};
// Helmets can carry attributes like capes. The Blue Party Hat is one of one: admin only, never drops, can't be sold or dropped.
const HELM_ATTR={partyhat:{dmg:900,hp:500,spd:25,light:40,luck:50},greenhat:{dmg:900,hp:500,spd:25,light:40,luck:50}};
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
const CAPES={
  tattered:{n:'Tattered Cloak',r:'common',c1:'#8a6f30',c2:'#6b3e26',attr:{hp:6},v:30},
  moss:{n:'Mossweave Cape',r:'uncommon',c1:'#38b764',c2:'#2b4b3a',attr:{oil:10,spd:5},v:110},
  angler:{n:"Angler's Cape",r:'uncommon',c1:'#41a6f6',c2:'#29366f',attr:{fishXp:10,catch:6},v:140,src:'fishing'},
  grave:{n:'Gravecloth Mantle',r:'rare',c1:'#94b0c2',c2:'#333c57',attr:{def:2,hp:10},v:320},
  hearth:{n:'Hearthkeeper Cape',r:'rare',c1:'#ef7d57',c2:'#b13e53',attr:{cookSafe:50,regen:.2},v:300},
  glow:{n:'Glowcap Shroud',r:'xrare',c1:'#e86fd0',c2:'#5d275d',attr:{light:20,luck:12},v:900},
  mother:{n:"Mother's Mantle",r:'legendary',aura:'#a7f070',c1:'#a7f070',c2:'#257179',attr:{dmg:15,regen:.35,hp:12},v:3000,boss:'mother'},
  knight:{n:'Pall of the Ossuary',r:'legendary',aura:'#c77dff',c1:'#5d275d',c2:'#1a1c2c',attr:{def:3,dmg:12,oil:10},v:4500,boss:'knight'},
  wayfinder:{n:"Wayfinder's Mantle",r:'mythic',aura:'#ff77a8',c1:'#ff77a8',c2:'#29366f',attr:{spd:10,luck:15,light:15,fishXp:10,chopXp:10},v:7000,src:'goal',goal:true}
};
const ATTR_TXT={hp:v=>`+${v} max HP`,def:v=>`+${v} defense`,dmg:v=>`+${v}% damage`,oil:v=>`Oil lasts ${v}% longer`,spd:v=>`+${v}% move speed`,light:v=>`+${v}% light radius`,
  luck:v=>`+${v}% loot luck`,regen:v=>`Regenerate ${v} HP/s in the Depths`,fishXp:v=>`+${v}% Fishing XP`,catch:v=>`+${v}% catch chance`,cookSafe:v=>`${v}% less burnt food`,chopXp:v=>`+${v}% Woodcutting XP`};
for(const [k,l] of Object.entries(LANTERNS))ITEMS[k+'_lantern']={n:l.n,v:l.v,lantern:k,rarity:l.r,keep:!!l.goal};
for(const [k,c] of Object.entries(CAPES))ITEMS['cape_'+k]={n:c.n,v:c.v,cape:k,rarity:c.r,keep:!!c.goal};
// ---------- skills 1–99 (classic curve: early levels fly by, late levels take a very long time) ----------
const SKILLS={farming:{n:'Farming',icon:'wheat',c:'#a7f070'},fishing:{n:'Fishing',icon:'raw_pondfin',c:'#41a6f6'},cooking:{n:'Cooking',icon:'pondfin',c:'#ef7d57'},smithing:{n:'Smithing',icon:'copper_blade',c:'#94b0c2'},woodcutting:{n:'Woodcutting',icon:'logs',c:'#a0663b'}};
const XP_TABLE=(()=>{const t=[0,0];let p=0;for(let l=1;l<99;l++){p+=Math.floor(l+300*Math.pow(2,l/7));t.push(Math.floor(p/4));}return t;})();
const levelFor=xp=>{let l=1;while(l<99&&xp>=XP_TABLE[l+1])l++;return l;};
// ---------- fish: one species per map. Expansions add new waters and fish ----------
const FISH={pondfin:{n:'Pondfin',lvl:1,xp:10,item:'raw_pondfin'}};
const WATERS={hold:{n:'Hold Lake',fish:['pondfin']}};
// ---------- trees: shared by everyone in the world. Each holds a stack of logs, falls when it runs out, then regrows ----------
// Expansions add new trees (with higher levels) per area. Logs will feed a future skill.
const TREES={oak:{n:'Oak Tree',lvl:1,xp:3,logs:150,regrow:90,item:'logs'}};
const RECIPES={
  forge:[
    {out:'copper_blade',need:{copper_ore:6},gold:20,lvl:1,xp:60},{out:'copper_helm',need:{copper_ore:4},gold:10,lvl:3,xp:45},{out:'copper_mail',need:{copper_ore:8,slime_gel:4},gold:20,lvl:6,xp:90},
    {out:'iron_blade',need:{iron_ore:6,copper_ore:2},gold:60,lvl:10,xp:150},{out:'iron_helm',need:{iron_ore:4,bone:3},gold:40,lvl:12,xp:120},{out:'iron_mail',need:{iron_ore:8,bone:6},gold:60,lvl:14,xp:220},
    {out:'ember_blade',need:{ember_ore:4,gem:2},gold:200,lvl:25,xp:400},{out:'ember_helm',need:{ember_ore:3,gem:1},gold:150,lvl:28,xp:320},{out:'ember_mail',need:{ember_ore:6,gem:2},gold:200,lvl:32,xp:550}
  ],
  kitchen:[{out:'bread',need:{wheat:2},lvl:1,xp:6},{out:'pondfin',need:{raw_pondfin:1},lvl:1,xp:10,burn:{chance:.45,safeAt:30,out:'burnt_fish'}},{out:'stew',need:{glowcap:1,wheat:1},lvl:5,xp:16}],
  press:[{out:'oil',n:2,need:{lampseed:1}}]
};
// growth in seconds (demo speed). Live: 30 min to 8 h.
const CROPS={
  wheat:{seed:'wheat_seed',grow:45,yield:[3,4],out:'wheat',n:'Wheat',lvl:1,plantXp:2,xp:4},
  lampseed:{seed:'lampseed',grow:70,yield:[2,3],out:'lampseed',n:'Lampseed',lvl:3,plantXp:5,xp:7},
  glowcap:{seed:'glowcap_spore',grow:100,yield:[2,3],out:'glowcap',n:'Glowcap',lvl:6,plantXp:8,xp:11}
};
const SHOP=[{id:'wheat_seed',price:5},{id:'lampseed',price:30},{id:'oil',price:45},{id:'bread',price:20}];
// enemies: hp, damage, speed (px/s), xp, AI, drops [item, chance, min, max]
const ENEMIES={
  slime:{hp:14,dmg:5,spd:24,xp:4,ai:'hop',art:'slime',drops:[['slime_gel',.6,1,2],['gold',.5,1,4]]},
  gelling:{hp:6,dmg:3,spd:34,xp:1,ai:'hop',art:'gelling',small:true,drops:[['slime_gel',.3,1,1]]},
  bat:{hp:9,dmg:4,spd:48,xp:3,ai:'flutter',art:'bat',drops:[['gold',.6,1,3]]},
  crawler:{hp:22,dmg:7,spd:28,xp:6,ai:'chase',art:'crawler',drops:[['lampseed',.18,1,1],['gold',.6,2,6],['glowcap_spore',.15,1,1]]},
  skeleton:{hp:32,dmg:9,spd:30,xp:9,ai:'lunge',art:'skeleton',drops:[['bone',.7,1,2],['gold',.6,3,8]]},
  wisp:{hp:18,dmg:8,spd:40,xp:8,ai:'float',art:'wisp',light:true,drops:[['gem',.06,1,1],['gold',.5,2,6],['lampseed',.12,1,1]]},
  spider:{hp:26,dmg:10,spd:52,xp:10,ai:'dash',art:'spider',drops:[['gold',.6,3,9],['bone',.3,1,1]]},
  shade:{hp:20,dmg:11,spd:56,xp:5,ai:'chase',art:'shade',drops:[]},
  mother:{hp:280,dmg:11,spd:30,xp:120,ai:'mother',art:'mother',boss:true,big:true,drops:[['relic_crown',1,1,1],['gem',1,2,3],['gold',1,60,90],['lampseed',1,2,3]]},
  knight:{hp:520,dmg:15,spd:34,xp:300,ai:'knight',art:'knight',boss:true,big:true,drops:[['relic_sigil',1,1,1],['gem',1,3,4],['gold',1,150,220],['ember_ore',1,2,4]]}
};
// Biome packs: floors, enemy mix, ore, boss. Season 1 adds the next pack.
const PACKS=[
  {id:'moss',from:1,to:5,enemies:['slime','bat','crawler'],ore:'copper',boss:'mother',bossName:'Mother Slime'},
  {id:'crypt',from:6,to:10,enemies:['skeleton','wisp','spider','bat'],ore:'iron',rareOre:'ember',boss:'knight',bossName:'The Ossuary Knight'},
  {id:'ember',from:11,to:15,locked:true,season:1,name:'Emberforge Halls'}
];
const packOf=f=>PACKS.find(p=>f>=p.from&&f<=p.to);
const NAMES_X=0;const NAMES=['@mira_dig','@oakhand','@lumen_lou','@pitkid','@runa_k','@tallowtom','@vexa','@gravelgus','@sora_lamps','@bram_b'];

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
  for(let x=1;x<W-1;x++){setT(m,x,11,PATH);setT(m,x,12,PATH);}
  for(let x=14;x<17;x++)setT(m,x,13,PATH);
  // pond
  [[18,19],[19,19],[20,19],[21,19],[17,20],[18,20],[19,20],[20,20],[21,20],[22,20],[18,21],[19,21],[20,21],[21,21],[22,21],[19,22],[20,22],[21,22]].forEach(([x,y])=>{setT(m,x,y,WATER);setSolid(m,x,y,1);});
  // border + inner trees
  const tree=(tx,ty)=>addObj(m,{type:'tree',x:tx*T+8,y:ty*T+15,spr:'tree',block:[[tx,ty]]});
  for(let x=0;x<W;x+=2){tree(x,0);tree(x+1,H-1);}for(let y=1;y<H;y+=2){tree(0,y);tree(W-1,y);}
  // the inner trees can be cut (Woodcutting); border trees are the edge of the world
  m.trees=[];[[3,9],[22,8],[15,21],[9,21],[23,13],[2,21],[16,2],[8,2],[21,3]].forEach(([x,y])=>{tree(x,y);const o=m.objs[m.objs.length-1];o.kind='oak';o.chop=true;o.ti=m.trees.length;o.logs=TREES.oak.logs;o.until=0;m.trees.push(o);});
  // buildings
  addObj(m,{type:'gate',x:13*T,y:5*T,spr:'gate',block:[[11,3],[12,3],[13,3],[14,3],[11,4],[14,4]],act:{x:13*T,y:5*T+6,label:'Delve',id:'gate'},light:{r:34,c:'warm'}});
  addObj(m,{type:'bank',x:5*T,y:8*T,spr:'bank',block:[[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[6,7]],act:{x:5*T,y:8*T+4,label:'Bank',id:'bank'}});
  addObj(m,{type:'forge',x:19*T,y:8*T,spr:'forge',anim:true,block:[[17,6],[18,6],[19,6],[20,6],[17,7],[18,7],[19,7],[20,7]],act:{x:18*T+2,y:8*T+6,label:'Forge',id:'forge'},light:{r:30,c:'warm',dx:-6,dy:-10}});
  addObj(m,{type:'board',x:17*T,y:10*T+2,spr:'board',block:[[16,9],[17,9]],act:{x:17*T,y:10*T+8,label:'Market',id:'market'}});
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

// ---------- pre-render the static ground layer ----------
function bakeGround(m){
  const cv=document.createElement('canvas');cv.width=m.w*T;cv.height=m.h*T;const g=cv.getContext('2d');
  const r=rng(m.floor||3);
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const t=tAt(m,x,y),v=(x*7+y*13)%4;let s=null;
    if(m.kind==='hold'){if(t===GRASS)s=ART.grass[v];else if(t===PATH)s=ART.path[v%3];else if(t===SOIL)s=ART.soil;else if(t===WATER)s=null;}
    else{if(t===FLOOR)s=ART.floor[m.biome][v];else if(m.faces.has(y*m.w+x))s=ART.face[m.biome][v%3];else{g.fillStyle='#0d0e17';g.fillRect(x*T,y*T,T,T);
        const fl=(dx,dy)=>tAt(m,x+dx,y+dy)===FLOOR||m.faces.has((y+dy)*m.w+x+dx);g.fillStyle=m.biome==='moss'?'#2e4a3a':'#3a3550';
        if(fl(-1,0))g.fillRect(x*T,y*T,2,T);if(fl(1,0))g.fillRect(x*T+T-2,y*T,2,T);if(fl(0,-1))g.fillRect(x*T,y*T,T,2);if(fl(0,1))g.fillRect(x*T,y*T+T-2,T,2);
        if((x*31+y*17)%5===0){g.fillStyle='#181a28';g.fillRect(x*T+5,y*T+6,3,2);}}}
    if(s)g.drawImage(s,x*T,y*T);}
  if(m.kind==='delve'&&m.stairs&&!m.stairs.hidden)g.drawImage(ART.stairs,m.stairs.tx*T,m.stairs.ty*T);
  m.ground=cv;
}

// ===== Lanternhold realtime connection: one socket to the Lobby (friends, parties, invites, feed) and one to the current
// room (a Hold world or a dungeon instance). Tickets come from /api/rt-ticket.
// Staying connected: a heartbeat every 20 s keeps quiet connections from being cut, a watchdog replaces any socket that has
// gone silent, and waking the phone or getting back online checks both sockets at once. =====
(function(){
const HL={},HR={};
const emit=(H,t,m)=>{for(const f of H[t]||[])try{f(m);}catch(e){console.error(e);}};
let base=null,lobby=null,room=null,roomId=null,stopped=true,lq=[],retryL=0,retryR=0,available=null,hero=null;
let busyL=false,busyR=false,lastL=0,lastR=0,timerL=null,timerR=null;
const PING_MS=20000,DEAD_MS=50000;
async function ticket(){
  try{const r=await fetch('/api/rt-ticket',{headers:{'X-LH':'1'},credentials:'same-origin',cache:'no-store'});
    if(!r.ok)return null;const j=await r.json();if(!j||!j.url||!j.ticket){available=false;return null;}available=true;base=j.url;return j;}
  catch(e){return null;}}
const backoff=n=>Math.min(15000,1000*2**n)*(0.7+Math.random()*0.6);
function laterL(ms){clearTimeout(timerL);timerL=setTimeout(openLobby,ms);}
function laterR(id,ms){clearTimeout(timerR);timerR=setTimeout(()=>openRoom(id),ms);}
async function openLobby(){
  if(stopped||busyL||(lobby&&lobby.readyState<=1))return;busyL=true;clearTimeout(timerL);
  const t=await ticket();busyL=false;if(stopped||(lobby&&lobby.readyState<=1))return;
  if(!t){if(available===false){emit(HL,'off',{});return;}laterL(backoff(retryL++));return;}
  const ws=new WebSocket(base+'/lobby?t='+encodeURIComponent(t.ticket));lobby=ws;lastL=Date.now();
  ws.onopen=()=>{retryL=0;lastL=Date.now();const q=lq;lq=[];for(const m of q)ws.send(m);emit(HL,'open',{});};
  ws.onmessage=e=>{if(lobby!==ws)return;lastL=Date.now();let m;try{m=JSON.parse(e.data);}catch(x){return;}if(m&&m.t&&m.t!=='pong')emit(HL,m.t,m);};
  ws.onclose=e=>{if(lobby!==ws)return;lobby=null;emit(HL,'close',{code:e.code});if(stopped)return;
    if(e.code===4000){stopped=true;emit(HL,'kicked',{reason:'You signed in somewhere else.'});return;}
    laterL(backoff(retryL++));};
}
async function openRoom(id){
  if(stopped||roomId!==id||busyR||(room&&room.readyState<=1))return;busyR=true;clearTimeout(timerR);
  const t=await ticket();busyR=false;if(stopped||roomId!==id||(room&&room.readyState<=1))return;
  if(!t){laterR(id,backoff(retryR++));return;}
  const ws=new WebSocket(base+'/room/'+id+'?t='+encodeURIComponent(t.ticket));room=ws;lastR=Date.now();
  ws.onopen=()=>{retryR=0;lastR=Date.now();};
  ws.onmessage=e=>{if(room!==ws)return;lastR=Date.now();let m;try{m=JSON.parse(e.data);}catch(x){return;}if(m&&m.t&&m.t!=='pong')emit(HR,m.t,m);};
  ws.onclose=e=>{if(room!==ws)return;room=null;if(stopped||roomId!==id)return;
    if(e.code===4003){roomId=null;emit(HR,'denied',{});return;}
    if(e.code===4009){roomId=null;emit(HR,'full',{});return;}
    if(e.code===4000)return;
    emit(HR,'drop',{});laterR(id,backoff(retryR++));};
}
// A socket that has heard nothing (not even a pong) for 50 s is dead even if the browser still calls it open: replace it.
function kill(ws){try{ws.onclose&&ws.onclose({code:1006});}catch(e){}try{ws.close();}catch(e){}}
function watchdog(){
  if(stopped)return;const now=Date.now();
  if(lobby&&lobby.readyState===1){if(now-lastL>DEAD_MS)kill(lobby);else if(now-lastL>PING_MS)try{lobby.send('{"t":"ping"}');}catch(e){}}
  else if(!lobby&&!busyL&&!timerL)openLobby();
  if(roomId){if(room&&room.readyState===1){if(now-lastR>DEAD_MS)kill(room);else if(now-lastR>PING_MS)try{room.send('{"t":"ping"}');}catch(e){}}
    else if(!room&&!busyR)openRoom(roomId);}
}
setInterval(watchdog,5000);
// Back from the background or back online: ask both sockets to answer within 4 s, otherwise reconnect right away.
function probe(){
  if(stopped)return;retryL=0;retryR=0;const t0=Date.now();
  if(lobby&&lobby.readyState===1){try{lobby.send('{"t":"ping"}');}catch(e){}const w=lobby;setTimeout(()=>{if(lobby===w&&lastL<t0)kill(w);},4000);}else{clearTimeout(timerL);timerL=null;openLobby();}
  if(roomId){if(room&&room.readyState===1){try{room.send('{"t":"ping"}');}catch(e){}const w=room;setTimeout(()=>{if(room===w&&lastR<t0)kill(w);},4000);}else{clearTimeout(timerR);openRoom(roomId);}}
}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')probe();});
addEventListener('online',probe);addEventListener('pageshow',probe);
window.NET={
  onL(t,f){(HL[t]=HL[t]||[]).push(f);},onR(t,f){(HR[t]=HR[t]||[]).push(f);},
  start(name){if(!stopped)return;stopped=false;hero=name;openLobby();},
  stop(){stopped=true;roomId=null;clearTimeout(timerL);clearTimeout(timerR);try{lobby&&lobby.close();}catch(e){}try{room&&room.close();}catch(e){}lobby=null;room=null;},
  live(){return !stopped&&available!==false;},lobbyOpen(){return !!(lobby&&lobby.readyState===1);},
  roomOpen(){return !!(room&&room.readyState===1);},room(){return roomId;},
  lsend(o){const s=JSON.stringify(o);if(lobby&&lobby.readyState===1)lobby.send(s);else if(lq.length<50)lq.push(s);},
  send(o){if(room&&room.readyState===1)room.send(JSON.stringify(o));},
  join(id){if(roomId===id&&room)return;const old=room;roomId=id;room=null;try{old&&old.close(1000,'leave');}catch(e){}retryR=0;busyR=false;openRoom(id);},
  leave(){const old=room;roomId=null;room=null;clearTimeout(timerR);try{old&&old.close(1000,'leave');}catch(e){}},
  _kill(which){kill(which==='lobby'?lobby:room);}   // tests only
};
})();

// ===== Lanternhold: game =====
(function(){
const $=id=>document.getElementById(id);
buildArt();
const cv=$('cv'),g=cv.getContext('2d');
{const u=c=>c.toDataURL();{const p=new Px(16,16);p.ell(8,8,5.5,5.5,PAL.silver);for(const [x,y] of [[7,1],[7,13],[1,7],[13,7],[3,3],[11,3],[3,11],[11,11]])p.rect(x,y,2,2,PAL.silver);p.ell(8,8,2.2,2.2,PAL.ink);p.set(6,5,PAL.white).set(5,6,PAL.white);p.outline();$('setIc').src=u(p.canvas());}$('setB').onclick=()=>{if(started)openSettings();};{const p=new Px(16,16);p.rect(3,2,10,12,'#c2a26b');p.rect(4,3,8,10,'#f4e4c1');for(const y of [5,7,9,11])p.rect(5,y,6,1,'#8a6f30');p.rect(2,1,12,2,'#8a6f30');p.rect(2,13,12,2,'#8a6f30');p.set(12,4,PAL.gold).set(11,3,PAL.gold);p.outline();$('icSkill').src=u(p.canvas());}$('icBag').src=u(ART.chest[0]);$('icRet').src=u(ART.torch[0]);
}
const reduceMotion=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand=Math.random,ri=(a,b)=>a+Math.floor(rand()*(b-a+1));
const fmt=n=>Math.floor(n).toLocaleString('en-US');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

// ---------- save ----------
const DEF={name:'',look:null,wallet:null,gold:40,bank:{wheat_seed:20,oil:3,bread:3},lvl:1,xp:0,gear:{blade:'rusty',mail:'none',lantern:'basic',cape:null,helm:null},skills:{farming:0,fishing:0,cooking:0},caught:0,flags:{},guide:0,vault:{},bankBuys:0,quick:['oil','bread','pondfin','stew',null],lift:1,deepest:0,plots:[null,null,null,null,null,null],kills:0,deaths:0,bosses:{},goals:{},cnt:{}};
const BANK_BASE=16,BANK_BUYS=[250,750,2000,5000,10000,20000,40000,75000],BANK_BUY_SLOTS=4;
const fresh=()=>JSON.parse(JSON.stringify(DEF));
// Saves come from localStorage or the cloud, so treat them as untrusted: keep only known keys, valid ids and sane numbers.
const num=(v,lo,hi,d)=>{v=Number(v);return Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):d;};
const int=(v,lo,hi,d)=>Math.floor(num(v,lo,hi,d));
const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const SET_DEF={zoom:2,bright:100,shake:true,names:true,feed:true,vib:true,sound:true};
function cleanSet(v){if(!v||typeof v!=='object')return null;const o={};for(const k of Object.keys(SET_DEF))o[k]=typeof SET_DEF[k]==='boolean'?(v[k]===undefined?SET_DEF[k]:!!v[k]):SET_DEF[k];
  o.zoom=Math.max(0,Math.min(4,Math.round(+v.zoom)||0));if(v.zoom===undefined)o.zoom=SET_DEF.zoom;o.bright=Math.max(60,Math.min(160,Math.round(+v.bright)||100));return o;}
function normalize(raw){const o=obj(raw),s=fresh();
  s.settings=cleanSet(o.settings);
  s.name=typeof o.name==='string'&&/^[A-Za-z0-9_]{3,16}$/.test(o.name)?o.name:'';
  s.wallet=typeof o.wallet==='string'&&/^0x[0-9a-f]{40}$/.test(o.wallet)?o.wallet:null;
  const L=obj(o.look);s.look={skin:int(L.skin,0,LOOKS.skin.length-1,DEFAULT_LOOK.skin),hair:int(L.hair,0,LOOKS.hair.length-1,DEFAULT_LOOK.hair),cloth:int(L.cloth,0,LOOKS.cloth.length-1,DEFAULT_LOOK.cloth),style:int(L.style,0,LOOKS.style.length-1,DEFAULT_LOOK.style)};
  s.gold=int(o.gold,0,1e10,DEF.gold);s.lvl=int(o.lvl,1,200,1);s.xp=int(o.xp,0,1e9,0);s.kills=int(o.kills,0,1e9,0);s.deaths=int(o.deaths,0,1e9,0);s.caught=int(o.caught,0,1e9,0);
  s.deepest=int(o.deepest,0,PACKS[PACKS.length-1].to,0);s.lift=int(o.lift,1,s.deepest+1,1)>=6?6:1;s.savedAt=int(o.savedAt,0,9e15,0);
  s.vault={};for(const [k,v] of Object.entries(obj(o.vault)))if(ITEMS[k]&&k!=='gold'){const n=int(v,0,1e7,0);if(n>0)s.vault[k]=n;}s.bankBuys=int(o.bankBuys,0,BANK_BUYS.length,0);
  if(o.bank!==undefined){s.bank={};for(const [k,v] of Object.entries(obj(o.bank)))if(ITEMS[k]&&k!=='gold'){const n=int(v,0,1e7,0);if(n>0)s.bank[k]=n;}}
  const G=obj(o.gear);s.gear={blade:GEAR.blade[G.blade]?G.blade:'rusty',mail:GEAR.mail[G.mail]?G.mail:'none',lantern:LANTERNS[G.lantern]?G.lantern:'basic',cape:CAPES[G.cape]?G.cape:null,helm:GEAR.helm[G.helm]?G.helm:null};
  const K=obj(o.skills);s.skills={};for(const k of Object.keys(SKILLS))s.skills[k]=num(K[k],0,200e6,0);
  const now=Date.now(),P0=Array.isArray(o.plots)?o.plots:[];s.plots=DEF.plots.map((_,i)=>{const p=obj(P0[i]);return CROPS[p.crop]?{crop:p.crop,t0:num(p.t0,0,now,now)}:null;});
  s.bosses={};for(const k of Object.keys(obj(o.bosses)))if(ENEMIES[k]&&ENEMIES[k].boss)s.bosses[k]=true;
  const Q=Array.isArray(o.quick)?o.quick:DEF.quick;s.quick=[0,1,2,3,4].map(i=>ITEMS[Q[i]]&&(ITEMS[Q[i]].food||ITEMS[Q[i]].oil)?Q[i]:null);
  s.flags={};for(const [k,v] of Object.entries(obj(o.flags)))if(/^[a-z]{2,16}$/.test(k))s.flags[k]=!!v;s.guide=int(o.guide,0,99,0);
  s.goals={};for(const k of Object.keys(obj(o.goals)).slice(0,300))if(/^[a-z0-9]{2,16}$/.test(k))s.goals[k]=1;
  s.cnt={};for(const [k,v] of Object.entries(obj(o.cnt)).slice(0,60))if(/^[a-z]{2,16}$/.test(k)){const n=int(v,0,1e9,0);if(n)s.cnt[k]=n;}
  return s;}
let S=normalize({}),PID=null;
function save(now){if(!PID)return;S.savedAt=Date.now();try{localStorage.setItem('lanternhold.p.'+PID,JSON.stringify(S));}catch(e){}if(window.ACC)ACC.cloudSave(S,now);}
// Bag = what you carry (goes into the Depths, half lost if you fall). Vault = the Bank (always safe, limited slots).
const atHold=()=>scene==='hold';
const avail=id=>(S.bank[id]||0)+(atHold()?(S.vault[id]||0):0);
const allKeys=()=>[...new Set([...Object.keys(S.bank),...(atHold()?Object.keys(S.vault):[])])].filter(id=>ITEMS[id]);
const has=(id,n)=>avail(id)>=(n||1);
const give=(bag,id,n)=>{bag[id]=(bag[id]||0)+n;};
const take=(id,n)=>{const k=Math.min(n,S.bank[id]||0);if(k){S.bank[id]-=k;if(S.bank[id]<=0)delete S.bank[id];}n-=k;if(n>0&&atHold()&&S.vault[id]){S.vault[id]-=n;if(S.vault[id]<=0)delete S.vault[id];}};
const capeA=()=>S.gear.cape&&CAPES[S.gear.cape]?CAPES[S.gear.cape].attr:{};const A=k=>(capeA()[k]||0)+((HELM_ATTR[S.gear.helm]||{})[k]||0);
let ADMIN=false,HAT='partyhat';
const LAN=()=>LANTERNS[S.gear.lantern]||LANTERNS.basic;
const maxHp=()=>60+8*(S.lvl-1)+A('hp');
const xpNeed=l=>Math.round(22*Math.pow(l,1.5));
const dmgOf=()=>GEAR.blade[S.gear.blade].dmg*(1+A('dmg')/100);
const defOf=()=>GEAR.mail[S.gear.mail].def+(S.gear.helm?GEAR.helm[S.gear.helm].def:0)+A('def');
const myLook=()=>Object.assign({},S.look,{armor:S.gear.mail==='none'?null:S.gear.mail,cape:S.gear.cape,helm:S.gear.helm});

// ---------- sound: tiny synth, no files ----------
let AC=null,muted=false;try{muted=localStorage.getItem('lanternhold.mute')==='1';}catch(e){}
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){AC=null;}}if(AC&&AC.state==='suspended')AC.resume();return AC;}
addEventListener('pointerdown',()=>ac(),{once:true});addEventListener('keydown',()=>ac(),{once:true});
function tone(f,d,type,vol,slide,delay){const a=ac();if(!a||muted)return;const t=a.currentTime+(delay||0),o=a.createOscillator(),gn=a.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),t+d);
  gn.gain.setValueAtTime(vol||.05,t);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(a.destination);o.start(t);o.stop(t+d+.02);}
const SFX={swing:()=>tone(320,.06,'triangle',.03,.5),hit:()=>tone(180,.08,'square',.05,.5),hurt:()=>{tone(140,.15,'sawtooth',.06,.5);},coin:()=>{tone(988,.05,'square',.03);tone(1319,.08,'square',.03,1,.05);},
  pick:()=>tone(660,.06,'triangle',.04,1.5),rare:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.12,'square',.04,1,i*.07)),level:()=>[392,523,659,784,1047].forEach((f,i)=>tone(f,.14,'triangle',.06,1,i*.08)),
  cast:()=>tone(500,.12,'sine',.04,.4),bite:()=>{tone(880,.05,'square',.05);tone(880,.05,'square',.05,1,.09);},splash:()=>tone(300,.18,'sawtooth',.025,.3),chest:()=>{tone(220,.08,'square',.04);tone(440,.1,'square',.04,1,.07);},
  cook:()=>tone(240,.2,'sawtooth',.02,.6),plant:()=>tone(200,.08,'triangle',.05,1.4),drop:()=>tone(260,.1,'triangle',.04,.6),stairs:()=>[440,330,220].forEach((f,i)=>tone(f,.1,'square',.04,1,i*.08)),
  flame:()=>[330,440,554,660].forEach((f,i)=>tone(f,.15,'sine',.06,1,i*.09)),die:()=>[300,220,160,110].forEach((f,i)=>tone(f,.2,'sawtooth',.05,1,i*.15)),boss:()=>[196,247,294,392,494].forEach((f,i)=>tone(f,.2,'square',.05,1,i*.1))};
function toggleMute(){muted=!muted;try{localStorage.setItem('lanternhold.mute',muted?'1':'0');}catch(e){}if(typeof saveSet==='function')saveSet();toast('Sound '+(muted?'off':'on'));}
function sfx(n){try{SFX[n]&&SFX[n]();}catch(e){}}
const buzz=ms=>{try{if(!muted&&SET.vib&&navigator.vibrate)navigator.vibrate(ms);}catch(e){}};

// ---------- view sizing: integer pixel scale ----------
// ---------- settings (per device) ----------
const ZOOMS=['Far','Wide','Normal','Close','Closer'];
// Settings live in the hero's save (so they follow the player to any device) and in this device's storage (used before sign-in).
const SET=Object.assign({},SET_DEF,{shake:!reduceMotion},cleanSet((()=>{try{return JSON.parse(localStorage.getItem('lanternhold.settings2')||'null');}catch(e){return null;}})())||{});
SET.zoom=Math.max(0,Math.min(4,SET.zoom|0));SET.bright=Math.max(60,Math.min(160,+SET.bright||100));
function applySet(){cv.style.filter=SET.bright===100?'':'brightness('+(SET.bright/100)+')';const f=document.getElementById('feed');if(f)f.classList.toggle('off',!SET.feed);}
function saveSet(refit){SET.sound=!muted;try{localStorage.setItem('lanternhold.settings2',JSON.stringify(SET));}catch(e){}applySet();if(refit){fit();updateHud(true);}
  if(started&&PID){S.settings=Object.assign({},SET);save();}}
function loadSet(v){const c=cleanSet(v);if(!c)return false;Object.assign(SET,c);muted=!c.sound;try{localStorage.setItem('lanternhold.settings2',JSON.stringify(SET));localStorage.setItem('lanternhold.mute',muted?'1':'0');}catch(e){}applySet();fit();return true;}
let VW=180,VH=320,SCALE=3;
function fit(){
  const vv=window.visualViewport,dpr=window.devicePixelRatio||1,w=Math.round(vv?vv.width:innerWidth),h=Math.round(vv?vv.height:innerHeight);
  const fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  const base=Math.max(1,Math.floor(Math.min(w*dpr/180,h*dpr/(fine?300:220))));
  SCALE=Math.max(1,base+(SET.zoom-1)*Math.max(1,Math.round(base/6)));
  document.documentElement.classList.toggle('land',w>h);document.documentElement.classList.toggle('short',h<500);
  VW=Math.floor(w*dpr/SCALE);VH=Math.floor(h*dpr/SCALE);
  cv.width=VW;cv.height=VH;cv.style.width=(VW*SCALE/dpr)+'px';cv.style.height=(VH*SCALE/dpr)+'px';
  g.imageSmoothingEnabled=false;light.width=VW;light.height=VH;
}
const light=document.createElement('canvas'),lg=light.getContext('2d');
let fitT=0;const refit=()=>{clearTimeout(fitT);fitT=setTimeout(()=>{fit();updateHud(true);},60);};
window.addEventListener('resize',refit);window.addEventListener('orientationchange',refit);if(window.visualViewport)visualViewport.addEventListener('resize',refit);

// ---------- input ----------
const keys={};let stick={x:0,y:0,on:false},aPressed=false,retHeld=false;
window.addEventListener('keydown',e=>{if(!started||!$('acct').hidden)return;const tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA')return;if(!$('sheet').hidden&&e.code!=='Escape')return;const k=e.code;if((k==='KeyT'||k==='Slash')&&!e.repeat){e.preventDefault();toggleChat(true);$('chatIn').focus();return;}keys[k]=true;
  if(k==='Space'||k==='KeyJ'||k==='KeyE'||k==='Enter'){e.preventDefault();if(!e.repeat)aPressed=true;}
  if(/^Digit[1-5]$/.test(k)&&!e.repeat)useQuick(+k.slice(5)-1);if(k==='KeyF'&&!e.repeat)useFlask();if(k==='KeyQ'&&!e.repeat)useFood();if(k==='KeyR')retHeld=true;
  if((k==='KeyI'||k==='KeyB')&&!e.repeat)openBag();if(k==='KeyH'&&!e.repeat)openHero();if(k==='KeyK'&&!e.repeat)openSkills();if(k==='KeyM'&&!e.repeat)toggleMute();if(k==='Escape')closeSheet();
  if(k.startsWith('Arrow'))e.preventDefault();});
window.addEventListener('keyup',e=>{keys[e.code]=false;if(e.code==='KeyR')retHeld=false;});
const pad=$('pad'),knob=$('knob');let padId=null,padC={x:0,y:0};
pad.addEventListener('pointerdown',e=>{padId=e.pointerId;pad.setPointerCapture(e.pointerId);const r=pad.getBoundingClientRect();padC={x:r.left+r.width/2,y:r.top+r.height/2};moveStick(e);});
pad.addEventListener('pointermove',e=>{if(e.pointerId===padId)moveStick(e);});
['pointerup','pointercancel','lostpointercapture'].forEach(t=>pad.addEventListener(t,e=>{if(e.pointerId!==padId)return;padId=null;stick={x:0,y:0,on:false};knob.style.transform='';}));
function moveStick(e){const dx=e.clientX-padC.x,dy=e.clientY-padC.y,l=Math.hypot(dx,dy),max=40,k=Math.min(1,l/max);
  stick={x:l?dx/l*k:0,y:l?dy/l*k:0,on:true};knob.style.transform=`translate(${stick.x*max}px,${stick.y*max}px)`;}
$('bA').addEventListener('pointerdown',e=>{e.preventDefault();aPressed=true;});
// Mouse wheel zooms (computers): scroll forward = closer, back = further. One step per notch; trackpads are smoothed.
let wheelAcc=0,wheelT=0,wheelLast=0;
cv.addEventListener('wheel',e=>{if(!started||!$('sheet').hidden||!$('acct').hidden)return;e.preventDefault();
  const now=performance.now();if(now-wheelLast>250)wheelAcc=0;wheelLast=now;wheelAcc+=e.deltaMode===1?e.deltaY*30:e.deltaY;
  if(Math.abs(wheelAcc)<50||now-wheelT<120)return;const z=Math.max(0,Math.min(4,SET.zoom+(wheelAcc<0?1:-1)));wheelAcc=0;wheelT=now;
  if(z===SET.zoom)return toast(z===4?'Zoomed in all the way':'Zoomed out all the way');SET.zoom=z;saveSet(true);toast('Zoom: '+ZOOMS[z]);},{passive:false});
// Mouse: left-click on the game attacks / acts, same as Space. In the Depths the hero turns toward the click first.
let camX=0,camY=0;
cv.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||!started||!$('sheet').hidden||!$('acct').hidden)return;
  e.preventDefault();const a=document.activeElement;if(a&&a.id==='chatIn')a.blur();
  if(scene==='delve'){const r=cv.getBoundingClientRect(),wx=camX+(e.clientX-r.left)*VW/r.width,wy=camY+(e.clientY-r.top)*VH/r.height,dx=wx-P.x,dy=wy-(P.y-6);
    if(Math.abs(dx)>3||Math.abs(dy)>3)P.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');}
  aPressed=true;});

// No pinch or double-tap zoom while playing: iOS ignores user-scalable=no, so block its gesture events and multi-finger moves,
// and if the page somehow ends up zoomed anyway, snap it straight back to normal.
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1||(e.scale&&e.scale!==1))e.preventDefault();},{passive:false});
if(window.visualViewport){const vm=document.querySelector('meta[name=viewport]'),base=vm&&vm.content;
  visualViewport.addEventListener('resize',()=>{if(vm&&visualViewport.scale>1.01){vm.content=base.replace('maximum-scale=1','maximum-scale=1.0001');setTimeout(()=>{vm.content=base;},60);}});}
addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea,#acctBody,.sel'))e.preventDefault();});
addEventListener('dragstart',e=>{if(e.target.tagName==='IMG'||e.target.tagName==='CANVAS')e.preventDefault();});
const bRet=$('bRet');bRet.addEventListener('pointerdown',e=>{e.preventDefault();retHeld=true;try{bRet.setPointerCapture(e.pointerId);}catch(_){}});
['pointerup','pointercancel','lostpointercapture'].forEach(t=>bRet.addEventListener(t,()=>{retHeld=false;}));
$('bBag').addEventListener('click',()=>openBag());$('bHero').addEventListener('click',()=>openHero());$('bSkill').addEventListener('click',()=>openSkills());

// ---------- world state ----------
const HOLD=buildHold();bakeGround(HOLD);
let scene='hold',map=HOLD,ents=[],drops=[],fx=[],texts=[],npcs=[],run=null,time=0;
const P={x:HOLD.spawn.x,y:HOLD.spawn.y,dir:'down',moving:false,anim:0,hp:maxHp(),inv:0,swing:0,swingCD:0,chan:0,hitDone:false};

// ---------- toasts ----------
let toastT=0;function toast(msg,kind){const t=$('toast');t.textContent=msg;t.className='toast '+(kind||'');t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2400);}
function floatText(x,y,txt,col){texts.push({x,y,txt,col:col||'#f4f4f4',t:0});}

// ---------- scenes ----------
function enterHold(){FISHING=null;CHOP=null;scene='hold';map=HOLD;ents=[];drops=[];fx=[];P.x=HOLD.spawn.x;P.y=HOLD.spawn.y+8;P.dir='down';P.chan=0;run=null;P.hp=maxHp();
  updateHud();MP.toHold();}
function startDelve(from,seed){run={seed:seed!=null?seed:(rand()*1e9)|0,floor:from,pack:{},oil:100,kills:0,start:from,shadeT:0};enterFloor(from);closeSheet();toast('Floor '+from+' · '+BIOMES[packOf(from).id].name);}
function enterFloor(f){
  run.floor=f;map=buildFloor(f,run.seed);bakeGround(map);scene='delve';
  const sc=1+.12*(f-1);
  ents=map.spawns.map((s,i)=>Object.assign(makeEnemy(s.type,s.x,s.y,sc),{id:i+1}));MP.nextEid=ents.length+1;if(MP.client())ents=[];drops=[];fx=[];P.x=map.spawn.x;P.y=map.spawn.y;P.chan=0;
  if(f>S.deepest){S.deepest=f;save();if(f>=3)MP.feed('deep',String(f));}updateHud();MP.floorEntered(f);
  if(map.pack.boss&&f===map.pack.to)setTimeout(()=>toast(map.pack.bossName+' awaits','bad'),400);
}
function makeEnemy(type,x,y,sc){const d=ENEMIES[type];return {id:MP.nextEid++,type,d,x,y,hp:Math.round(d.hp*(sc||1)),max:Math.round(d.hp*(sc||1)),dmgSc:sc||1,vx:0,vy:0,t:rand()*2,cd:1+rand(),st:'idle',flash:0,kb:{x:0,y:0},r:d.big?11:5,dead:false,spawnT:d.boss?0:0};}

// ---------- collision ----------
function lineOfSight(x0,y0,x1,y1){const d=Math.hypot(x1-x0,y1-y0),n=Math.ceil(d/6);for(let i=1;i<n;i++){const x=x0+(x1-x0)*i/n,y=y0+(y1-y0)*i/n;if(solidAt(map,Math.floor(x/T),Math.floor(y/T)))return false;}return true;}
function blocked(x,y,r){const pts=[[x-r,y-4],[x+r,y-4],[x-r,y+1],[x+r,y+1]];for(const [px,py] of pts){if(solidAt(map,Math.floor(px/T),Math.floor(py/T)))return true;}return false;}
function moveBody(o,dx,dy,r){if(dx&&!blocked(o.x+dx,o.y,r))o.x+=dx;if(dy&&!blocked(o.x,o.y+dy,r))o.y+=dy;}

// ---------- context action ----------
function nearestAct(){
  let best=null,bd=22;
  for(const o of map.objs){if(!o.act||o.gone)continue;const d=Math.hypot(o.act.x-P.x,o.act.y-P.y);if(d<bd){bd=d;best={o,label:o.act.label,id:o.act.id};}}
  if(scene==='hold'){for(const p of map.plots){const d=Math.hypot(p.cx-P.x,p.cy+6-P.y);if(d<bd){bd=d;const st=S.plots[p.i],ready=st&&growth(st)>=1;best={plot:p,label:readyPlots().length?'Harvest':'Farm',id:'plot'};}}}
  if(scene==='hold'){if(FISHING)return {label:FISHING.phase==='bite'?'Hook!':'Fishing',id:'hook'};if(!best){const sp=fishSpot();if(sp)best={label:'Fish',id:'fish',sp};}}
  if(scene==='hold'){if(CHOP)return {label:'Chopping',id:'noop'};if(!best){const o=nearTree();if(o)best={label:treeUp(o)?'Chop':'Stump',id:'chop',o};}}
  {const d=nearBagDrop();if(d)best={label:'Pick up',id:'pickup',d};}
  if(scene==='delve'&&map.stairs&&!map.stairs.hidden){const sx=map.stairs.tx*T+8,sy=map.stairs.ty*T+10,d=Math.hypot(sx-P.x,sy-P.y);if(d<14)best={label:'Descend',id:'stairs'};}
  return best;
}
function doAct(a){
  if(a.id==='gate')return openGate();if(a.id==='house')return openHero();if(a.id==='bank')return openBank();if(a.id==='forge')return openCraft('forge');
  if(a.id==='kitchen')return openKitchen();if(a.id==='press')return openCraft('press');if(a.id==='market')return openMarket('sell');
  if(a.id==='pickup')return claimDrop(a.d);if(a.id==='chop')return startChop(a.o);if(a.id==='noop')return;
  if(a.id==='plot')return openFarm();if(a.id==='fish')return startFishing(a.sp);if(a.id==='hook')return hookFish();
  if(a.id==='chest'||a.id==='glowcap'){const o=a.o,i=map.objs.indexOf(o);if(MP.client()){if(!o.req){o.req=1;NET.send({t:'act',o:i});setTimeout(()=>o.req=0,1500);}return;}objTaken(o,MP.me());MP.objOut(i,o,MP.me());return;}
  if(a.id==='stairs'&&MP.client())return MP.askDown();
  if(a.id==='stairs'){const next=run.floor+1,pk=packOf(next);
    if(!pk||pk.locked){openSheet(`<h2>The way is sealed</h2><p class="lead">Below floor ${run.floor} lies ${pk?pk.name:'something older'}. It opens in Season ${pk?pk.season:1}.</p><p class="lead">Light the Return Flame to bring your haul home.</p><div class="row"><button class="btn" id="sx">Keep exploring</button></div>`);$('sx').onclick=closeSheet;return;}
    sfx('stairs');enterFloor(next);MP.floorOut(next);toast('Floor '+next+(packOf(next).id!==map.pack.id?' · '+BIOMES[packOf(next).id].name:''));}
}

// ---------- combat ----------
function swing(){if(P.swingCD>0)return;P.swing=.2;P.swingCD=.32;P.hitDone=false;sfx('swing');}
function hitBox(){const d=P.dir,cx=P.x+(d==='left'?-11:d==='right'?11:0),cy=P.y-5+(d==='up'?-11:d==='down'?9:0);return {x:cx-10,y:cy-9,w:20,h:18};}
function resolveSwing(){
  const b=hitBox(),dmg=dmgOf();
  for(const e of ents){if(e.dead)continue;const r=e.r;if(e.x+r>b.x&&e.x-r<b.x+b.w&&e.y>b.y&&e.y-r*2<b.y+b.h){
    const d=Math.round(dmg*(.9+rand()*.2)),a=Math.atan2(e.y-P.y,e.x-P.x);floatText(e.x,e.y-(e.d.big?28:16),String(d),'#ffcd75');sfx('hit');e.flash=.12;
    if(MP.client()){e.hp-=d;NET.send({t:'hit',e:e.id,d,a:Math.round(a*100)/100});continue;}
    applyHit(e,d,a,MP.me());}}
  for(const o of map.objs){if(o.type!=='ore'||o.gone)continue;const ox=o.tile[0]*T,oy=o.tile[1]*T;
    if(ox+T>b.x&&ox<b.x+b.w&&oy+T>b.y&&oy<b.y+b.h){puff(ox+8,oy+12,'#94b0c2',4);floatText(ox+8,oy+4,'chip','#94b0c2');const i=map.objs.indexOf(o);
      if(MP.client()){NET.send({t:'mine',o:i});break;}mineOre(o,i,MP.me());break;}}
}
// Loot goes to whoever dealt the most damage; everyone who hit it gets the full XP. In a party, the host decides and tells everyone.
const lootOwner=e=>{let best=null,bd=-1;for(const [who,d] of Object.entries(e.dmgBy||{}))if(d>bd){bd=d;best=who;}return best;};
function killEnemy(e){if(e.dead)return;const me=MP.me(),top=lootOwner(e)||me,hit=e.dmgBy?Object.keys(e.dmgBy):[me],xp=Math.round(e.d.xp*e.dmgSc);
  if(MP.shared())NET.send({t:'kill',e:e.id,top,hit,xp,x:Math.round(e.x),y:Math.round(e.y),ty:e.type});
  onKilled(e,top,hit,xp);}
function onKilled(e,top,hit,xp){const me=MP.me(),mine=top===me;e.dead=true;MP.lastKill={e:e.id,top,hit:hit.slice(),xp};
  if(hit.includes(me)){run.kills++;S.kills++;gainXp(xp);}puff(e.x,e.y-6,e.d.boss?'#ffcd75':'#a7f070',e.d.boss?30:9);
  if(mine)spawnLoot(e.x,e.y-4,e.d.drops);if(mine&&e.type!=='shade'&&e.type!=='gelling')dropGear(e.x,e.y-4,e.d.boss?'boss':'enemy',e.d.boss?e.type:null);
  if(e.d.boss){if(hit.includes(me))MP.feed('boss',map.pack.bossName);sfx('boss');buzz([60,40,60]);map.stairs.hidden=false;bakeGround(map);S.bosses[e.type]=true;if(run.floor+1>S.lift&&!(packOf(run.floor+1)||{}).locked)S.lift=run.floor+1;save();
    ents.forEach(o=>{if(!o.d.boss&&!o.dead){o.dead=true;puff(o.x,o.y-6,'#a7f070',6);}});
    setTimeout(()=>openSheet(`<h2>${map.pack.bossName} falls</h2><p class="lead">The stairs are open.${S.lift>run.floor?' The lift at the Gate now reaches floor '+S.lift+'.':''}</p><p class="lead">It dropped a Relic. In the live game, Relics can be minted on-chain and traded.</p><div class="row"><button class="btn" id="sx">Onward</button></div>`,()=>{}),300);
    setTimeout(()=>{const b=$('sx');if(b)b.onclick=closeSheet;},320);}}
function gainXp(n){S.xp+=n;while(S.xp>=xpNeed(S.lvl)){S.xp-=xpNeed(S.lvl);S.lvl++;P.hp=maxHp();toast('Level '+S.lvl+'! Max HP '+maxHp(),'good');if(S.lvl%5===0)MP.feed('level',String(S.lvl));sfx('level');buzz(60);puff(P.x,P.y-8,'#ffcd75',16);}}
function hurtPlayer(dmg,src){if(P.inv>0||ADMIN&&S.flags.god)return;const d=Math.max(1,Math.round(dmg)-defOf());P.hp-=d;P.inv=.7;P.chan=0;sfx('hurt');buzz(40);floatText(P.x,P.y-20,'-'+d,'#ff6b6b');
  shake=!SET.shake?0:3;if(src){const a=Math.atan2(P.y-src.y,P.x-src.x);for(let i=0;i<6;i++)moveBody(P,Math.cos(a)*1.5,Math.sin(a)*1.5,4);}
  if(P.hp<=0)die();}
let shake=0;

// ---------- loot ----------
function rollRarity(floor,boost){const w={};let tot=0;for(const r of RORDER){let x=RARITY[r].w;if(r==='rare')x*=1+floor*.08*boost;if(r==='xrare')x*=1+floor*.15*boost;if(r==='legendary')x*=1+floor*.25*boost;w[r]=x;tot+=x;}
  let q=rand()*tot;for(const r of RORDER){q-=w[r];if(q<=0)return r;}return 'common';}
function gearDrops(src,floor,boss){const luck=1+A('luck')/100,out=[];
  if(rand()<{chest:.10,enemy:.006,boss:.5}[src]*luck){const r=rollRarity(floor,src==='boss'?2:1);let pool=Object.keys(LANTERNS).filter(k=>k!=='basic'&&!LANTERNS[k].goal&&LANTERNS[k].r===r);if(!pool.length)pool=['tin'];out.push(pool[ri(0,pool.length-1)]+'_lantern');}
  if(rand()<{chest:.035,enemy:.0025,boss:.25}[src]*luck){const r=rollRarity(floor,1);let pool=Object.keys(CAPES).filter(k=>!CAPES[k].src&&!CAPES[k].boss&&CAPES[k].r===r);if(!pool.length)pool=['glow'];out.push('cape_'+pool[ri(0,pool.length-1)]);}
  if(boss){const k=Object.keys(CAPES).find(k=>CAPES[k].boss===boss);if(k&&rand()<.05*luck)out.push('cape_'+k);}
  return out;}
function dropGear(x,y,src,boss){for(const id of gearDrops(src,run?run.floor:1,boss))addDrop(mkDrop(x,y,id,1));}
function spawnLoot(x,y,table){for(const [id,ch,a,b] of table){if(rand()>=(id==='gold'?ch:ch*(1+A('luck')/100)))continue;const n=ri(a,b);
  if(id==='gold'){const piles=Math.min(4,Math.ceil(n/6));for(let i=0;i<piles;i++)addDrop(mkDrop(x,y,'gold',Math.ceil(n/piles)));}
  else addDrop(mkDrop(x,y,id,n));}}
function rareFound(id){const it=ITEMS[id],R=RARITY[it.rarity];sfx('rare');buzz([30,40,30]);toast(R.n+': '+it.n,'rare r-'+it.rarity);puff(P.x,P.y-10,R.c,it.rarity==='legendary'?30:12);if(RORDER.indexOf(it.rarity)>=RORDER.indexOf('rare'))MP.feed('loot',it.n);}
// ---------- items on the ground ----------
// Loot (monsters, ore, chests): in a party dungeon everyone sees it and whoever walks over it first gets it.
// Bag drops: land at your feet, you can pick them back up at once, other players nearby see them after 30 s (anywhere).
// The realtime room decides who gets each networked item, so it is never picked up twice.
let dropRef=0;
const roomUp=()=>netOn()&&NET.roomOpen()&&!!MP.room;
function addDrop(d,bag){d.ref='r'+(++dropRef);d.bag=!!bag;if(bag){d.vx=d.vy=0;d.vz=0;d.t=1;d.expAt=Date.now()+180e3;}drops.push(d);
  if(roomUp()&&(bag||MP.shared())){d.net=true;NET.send({t:'drop',ref:d.ref,it:d.id,n:d.n,x:Math.round(d.x),y:Math.round(d.y),vx:Math.round(d.vx),vy:Math.round(d.vy),bag:d.bag});}
  return d;}
function netDrop(v,settled){if(drops.some(d=>d.did===v.did))return;if(scene==='delve'?(!run||v.f!==run.floor):v.f!=null)return;if(!ITEMS[v.it]&&v.it!=='gold')return;
  drops.push({x:v.x,y:v.y,id:v.it,n:v.n,vx:settled||v.bag?0:v.vx,vy:settled||v.bag?0:v.vy,z:0,vz:settled||v.bag?0:70,t:settled||v.bag?1:0,did:v.did,bag:!!v.bag,net:true,showAt:Date.now()+(v.wait||0),expAt:v.left!=null?Date.now()+v.left:null});}
const dropShown=d=>!d.showAt||Date.now()>=d.showAt;
function grantDrop(d){d.taken=true;const into=scene==='delve'&&run?run.pack:S.bank;give(into,d.id,d.n);
  if(ITEMS[d.id]&&ITEMS[d.id].rarity)rareFound(d.id);else sfx(d.id==='gold'?'coin':'pick');
  floatText(P.x,P.y-24,'+'+d.n+' '+(d.id==='gold'?'gold':ITEMS[d.id].n),d.id==='gold'?'#ffcd75':'#a7f070');if(scene==='hold')save();}
function claimDrop(d){if(d.taken)return;
  if(!d.net)return grantDrop(d);                    // solo: it's just yours
  if(!d.did||!roomUp())return;                      // waiting for the room to confirm the drop (or to reconnect)
  if(d.pending&&Date.now()-d.pendAt<3000)return;d.pending=true;d.pendAt=Date.now();NET.send({t:'take',did:d.did});}
function updateDrops(dt){const now=Date.now();
  for(const d of drops){d.t+=dt;if(d.expAt&&now>d.expAt){d.taken=true;continue;}if(!dropShown(d))continue;
    d.vz-=260*dt;d.z=Math.max(0,d.z+d.vz*dt);if(d.z===0)d.vz=0;d.vx*=.9;d.vy*=.9;moveBody(d,d.vx*dt,d.vy*dt,2);
    if(d.bag||P.hp<=0)continue;                     // bag drops are picked up with the action button, never by walking past
    const dist=Math.hypot(P.x-d.x,P.y-4-d.y);if(d.t>.35&&dist<30&&!d.pending){d.x+=(P.x-d.x)*Math.min(1,dt*8);d.y+=(P.y-4-d.y)*Math.min(1,dt*8);}
    if(d.t>.35&&dist<7)claimDrop(d);}
  drops=drops.filter(d=>!d.taken);}
// (re)joining a room: its list of items on the ground is the truth; a drop of mine it never confirmed is sent again
function syncDrops(list){const mine=drops.filter(d=>d.net&&!d.did&&!d.taken);drops=drops.filter(d=>!d.net);
  for(const v of list){const a=mine.find(d=>!d.did&&v.by===MP.id&&v.it===d.id&&v.n===d.n&&Math.hypot(v.x-d.x,v.y-d.y)<6);if(a){a.did=v.did;drops.push(a);}else netDrop(v,true);}
  for(const d of mine)if(!d.did){drops.push(d);NET.send({t:'drop',ref:d.ref,it:d.id,n:d.n,x:Math.round(d.x),y:Math.round(d.y),vx:0,vy:0,bag:d.bag});}}
function nearBagDrop(){let best=null,bd=16;for(const d of drops){if(!d.bag||d.taken||!dropShown(d))continue;const k=Math.hypot(d.x-P.x,d.y-(P.y-4));if(k<bd){bd=k;best=d;}}return best;}
// drop from the bag: lands at your feet
function dropToGround(id,n){return addDrop({x:P.x+(P.dir==='left'?-8:P.dir==='right'?8:0),y:P.y+(P.dir==='up'?-6:4),id,n,vx:0,vy:0,z:0,vz:0,t:1},true);}
function mkDrop(x,y,id,n){const a=rand()*Math.PI*2,s=30+rand()*40;return {x,y,id,n,vx:Math.cos(a)*s,vy:Math.sin(a)*s,z:0,vz:70,t:0};}
function puff(x,y,col,n){if(reduceMotion)n=Math.min(n,3);for(let i=0;i<n;i++){const a=rand()*Math.PI*2,s=20+rand()*50;fx.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-20,t:0,life:.4+rand()*.3,col});}}

// ---------- consumables, return, death ----------
function useFlask(){if(scene!=='delve')return;if(!has('oil')){toast('No Oil Flasks. Press Lampseed at the Hold.','bad');return;}if(run.oil>=99){toast('Lantern is full');return;}
  take('oil',1);run.oil=Math.min(100,run.oil+ITEMS.oil.oil);puff(P.x,P.y-12,'#ffcd75',8);updateHud();}
const FOODS=['bread','pondfin','stew'];
const foodCount=()=>FOODS.reduce((a,f)=>a+(S.bank[f]||0),0);
function eat(id){if(scene!=='delve'){toast('Save your food for the Depths');return;}if(!(S.bank[id]>0)){toast('No '+ITEMS[id].n+' in your bag','bad');return;}
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');sfx('pick');updateHud();}
function useQuick(i){const id=S.quick[i];if(!id){if(scene==='hold')openQuickPick(i);else toast('Set quick slots from your bag');return;}
  if(scene==='hold'){openQuickPick(i);return;}if(id==='oil')useFlask();else eat(id);}
function useFood(){if(scene!=='delve')return;const have=FOODS.filter(f=>has(f)).sort((a,b)=>ITEMS[a].heal-ITEMS[b].heal);if(!have.length){toast('No food. Cook at the Kitchen.','bad');return;}
  const miss=maxHp()-P.hp,id=have.find(f=>ITEMS[f].heal>=miss)||have[have.length-1];
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');updateHud();}
const halfLoss=n=>Math.floor(n/2)+(n%2&&rand()<.5?1:0);
function returnHome(){setTimeout(()=>save(true),50);sfx('flame');const r=run,out={};for(const [id,n] of Object.entries(r.pack)){if(id==='gold')S.gold+=n;else give(S.bank,id,n);out[id]=n;}save();enterHold();
  summary('Back at the Hold',`You lit the Return Flame on floor ${r.floor} with ${r.kills} kills. Your haul is in your bag. Bank anything you can't afford to lose.`,out,null,'Brought home');}
function die(){setTimeout(()=>save(true),50);sfx('die');buzz(200);const r=run;S.deaths++;const kept={},lost={};
  for(const [id,n] of Object.entries(r.pack)){const l=id==='gold'?Math.floor(n/2):halfLoss(n),k=n-l;if(k>0){if(id==='gold')S.gold+=k;else give(S.bank,id,k);kept[id]=(kept[id]||0)+k;}if(l>0)lost[id]=(lost[id]||0)+l;}
  for(const [id,n] of Object.entries(S.bank)){const l=halfLoss(n);if(l>0){S.bank[id]-=l;if(S.bank[id]<=0)delete S.bank[id];lost[id]=(lost[id]||0)+l;}}
  save();enterHold();
  summary('The dark took you',`You fell on floor ${r.floor} and lost about half of everything you carried: this delve's loot and your bag. Your Bank, your equipped gear and your gold are safe.`,kept,lost,'Kept');}
function listItems(o){const e=Object.entries(o);return e.length?'<ul class="loot">'+e.map(([id,n])=>`<li>${iconImg(id)}<span>${ITEMS[id].n}</span><b>${fmt(n)}</b></li>`).join('')+'</ul>':'<p class="lead">Nothing.</p>';}
function summary(title,lead,got,lost,head){openSheet(`<h2>${title}</h2><p class="lead">${lead}</p><h3>${head||'Brought home'}</h3>${listItems(got)}${lost&&Object.keys(lost).length?'<h3>Lost</h3>'+listItems(lost):''}<div class="row"><button class="btn" id="sx">Continue</button></div>`);$('sx').onclick=closeSheet;}

// ---------- skills ----------
const lvlOf=sk=>levelFor(S.skills[sk]||0);
function skillXp(sk,n){if(sk==='fishing')n*=1+A('fishXp')/100;const before=lvlOf(sk);S.skills[sk]=Math.min(200e6,(S.skills[sk]||0)+n);const after=lvlOf(sk);
  if(after>before){toast(SKILLS[sk].n+' level '+after+'!','good');if(after%10===0||after===99)MP.feed('skill',SKILLS[sk].n+' '+after);sfx('level');buzz(60);puff(P.x,P.y-10,SKILLS[sk].c,16);floatText(P.x,P.y-34,SKILLS[sk].n+' '+after+'!',SKILLS[sk].c);}return n;}
// ---------- fishing ----------
let FISHING=null;
function fishSpot(){if(scene!=='hold')return null;const tx=Math.floor(P.x/T),ty=Math.floor((P.y-3)/T),O={down:[0,1],up:[0,-1],left:[-1,0],right:[1,0]};
  for(const d of [P.dir,'down','right','left','up']){const [dx,dy]=O[d];if(tAt(map,tx+dx,ty+dy)===WATER){let bx=tx+dx,by=ty+dy;if(tAt(map,bx+dx,by+dy)===WATER){bx+=dx;by+=dy;}return {dir:d,bx:bx*T+8,by:by*T+9};}}return null;}
const catchChance=()=>Math.min(.93,.32+.006*(lvlOf('fishing')-1)+A('catch')/100);
const biteWait=()=>(2.5+rand()*3.5)*(1-.004*(lvlOf('fishing')-1));
function startFishing(sp){CHOP=null;sfx('cast');FISHING=Object.assign({phase:'cast',t:0,wait:0,px:P.x,py:P.y},sp);P.dir=sp.dir;}
let missRun=0;
function landFish(hooked){missRun=0;{const h=new Date().getHours();if(h<3)secret('night');}const pool=WATERS.hold.fish,F=FISH[pool[ri(0,pool.length-1)]];give(S.bank,F.item,1);S.caught=(S.caught||0)+1;
  sfx('pick');const x=skillXp('fishing',F.xp);floatText(P.x,P.y-24,(hooked?'Hooked! ':'')+'+1 '+F.n+' · '+Math.round(x)+' xp','#73eff7');puff(FISHING.bx,FISHING.by,'#73eff7',6);
  if(rand()<(1/300)*(1+A('luck')/100)){give(S.bank,'cape_angler',1);rareFound('cape_angler');}save();}
function updateFishing(dt){if(!FISHING)return;if(P.moving||scene!=='hold'||Math.hypot(P.x-FISHING.px,P.y-FISHING.py)>3){FISHING=null;return;}const f=FISHING;f.t+=dt;
  if(f.phase==='cast'&&f.t>.6){f.phase='wait';f.t=0;f.wait=biteWait();sfx('splash');}
  else if(f.phase==='wait'&&f.t>f.wait){f.phase='bite';f.t=0;sfx('bite');buzz(50);}
  else if(f.phase==='bite'&&f.t>1.3){if(rand()<catchChance())landFish(false);else{floatText(P.x,P.y-24,'It got away…','#94b0c2');if(++missRun>=5)secret('miss5');}f.phase='reel';f.t=0;}
  else if(f.phase==='reel'&&f.t>.7){f.phase='cast';f.t=0;}}
// ---------- woodcutting: trees at the Hold are shared by everyone in your world ----------
// Each tree holds 150 logs. Every log anyone cuts comes off the same stack (the world's realtime room keeps count), then the
// tree falls and regrows 90 s later. One swing every ~2.5 s, so there's time to chat with whoever is cutting next to you.
let CHOP=null;
const chopEvery=()=>Math.max(1.6,2.6-.01*(lvlOf('woodcutting')-1));
const chopChance=()=>Math.min(.95,.62+.005*(lvlOf('woodcutting')-1));
function treeUp(o){if(o.until&&Date.now()>=o.until){o.until=0;o.logs=TREES[o.kind].logs;}return !o.until;}
function nearTree(){if(scene!=='hold'||!map.trees)return null;let best=null,bd=22;for(const o of map.trees){const d=Math.hypot(o.x-P.x,o.y+5-P.y);if(d<bd){bd=d;best=o;}}return best;}
function startChop(o){if(!treeUp(o))return toast('Just a stump for now. It regrows soon.');const L=TREES[o.kind];if(lvlOf('woodcutting')<L.lvl)return toast('You need Woodcutting '+L.lvl+' for the '+L.n+'.','bad');
  FISHING=null;CHOP={o,t:0,sw:0,px:P.x,py:P.y};const dx=o.x-P.x,dy=o.y-P.y;P.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');sfx('swing');}
function updateChop(dt){const c=CHOP;if(!c)return;const o=c.o;
  if(P.moving||scene!=='hold'||Math.hypot(P.x-c.px,P.y-c.py)>3){CHOP=null;return;}
  if(!treeUp(o)){CHOP=null;return;}
  c.sw+=dt;if(c.sw>=.85){c.sw=0;sfx('hit');puff(o.x+(P.x<o.x?-4:4),o.y-6,PAL.wood,3);o.shake=.25;}
  c.t+=dt;if(c.t<chopEvery())return;c.t=0;
  const ok=rand()<chopChance();if(ok)gotLog(o);else floatText(P.x,P.y-24,'…','#94b0c2');
  if(roomUp())NET.send({t:'chop',i:o.ti,ok:ok?1:0});
  else if(ok){o.logs--;if(o.logs<=0)treeFell(o,TREES[o.kind].regrow*1000);}}
function gotLog(o){const L=TREES[o.kind];give(S.bank,L.item,1);bump('logs');const x=skillXp('woodcutting',L.xp*(1+A('chopXp')/100));
  floatText(P.x,P.y-24,'+1 '+ITEMS[L.item].n+' · '+Math.round(x*10)/10+' xp','#d9a066');sfx('pick');save();}
function treeFell(o,ms){o.logs=0;o.until=Date.now()+ms;if(CHOP&&CHOP.o===o)CHOP=null;puff(o.x,o.y-14,PAL.green,14);puff(o.x,o.y-4,PAL.wood,8);
  if(Math.hypot(o.x-P.x,o.y-P.y)<120){sfx('boss');toast('Timber! The '+TREES[o.kind].n+' is down. It regrows in '+Math.round(ms/1000)+' s.');}}
// a tree update from the room: how many logs are left, and who swung
function onTree(m){const o=HOLD.trees&&HOLD.trees[m.i];if(!o)return;const was=!o.until;
  if(m.wait>0){if(was)treeFell(o,m.wait);else o.until=Date.now()+m.wait;}else{o.until=0;o.logs=m.left;}
  if(m.by&&m.by!==MP.id){const p=OTH.get(m.by);if(p){p.chopT=3.6;p.chopX=o.x;}o.shake=.25;
    o.cut=o.cut||{};o.cut[m.by]=Date.now();
    if(CHOP&&CHOP.o===o&&Object.values(o.cut).filter(t=>Date.now()-t<7000).length>=2)secret('choir');}}
function drawAxe(x,y,dir,ph){const a=(dir==='left'?-1:1)*(-.9+Math.sin(ph*Math.PI*2)*.9);g.save();g.translate(Math.round(x+(dir==='left'?-5:5)),Math.round(y-8));g.scale(dir==='left'?-1:1,1);g.rotate(a);g.drawImage(ART.axe,-5,-11);g.restore();}
function hookFish(){const f=FISHING;if(f&&f.phase==='bite'){landFish(true);f.phase='reel';f.t=0;}}
// px/py: whose rod it is (you, or another player whose cast arrives through the room)
function drawFishing(f=FISHING,px=P.x,py=P.y){if(!f)return;const d=f.dir,sx=d==='left'?-1:1;
  const hx=px+(d==='left'?-4:4),hy=py-7,tx=px+(d==='up'?6:d==='left'?-10:10),ty=py+(d==='up'?-20:-17);
  g.fillStyle='#6b3e26';const n=Math.max(Math.abs(tx-hx),Math.abs(ty-hy));for(let i=0;i<=n;i++)g.fillRect(Math.round(hx+(tx-hx)*i/n),Math.round(hy+(ty-hy)*i/n),1,1);
  let bx=f.bx,by=f.by+Math.round(Math.sin(time*3));if(f.phase==='cast'){const k=Math.min(1,f.t/.6);bx=tx+(f.bx-tx)*k;by=ty+(f.by-ty)*k-Math.sin(k*Math.PI)*14;}
  else if(f.phase==='reel'){const k=Math.min(1,f.t/.7);bx=f.bx+(tx-f.bx)*k;by=f.by+(ty-f.by)*k;}
  else if(f.phase==='bite')by=f.by+2+(Math.floor(time*12)%2);
  g.fillStyle='rgba(244,244,244,.75)';const m=Math.max(Math.abs(bx-tx),Math.abs(by-ty))||1;for(let i=0;i<=m;i+=1)g.fillRect(Math.round(tx+(bx-tx)*i/m),Math.round(ty+(by-ty)*i/m+Math.sin(i/m*Math.PI)*2),1,1);
  if(f.phase==='wait'||f.phase==='bite'){const rr=f.phase==='bite'?3+Math.floor(time*6)%3:2+Math.floor(time*2)%2;g.fillStyle='rgba(199,251,255,.6)';g.fillRect(Math.round(f.bx-rr),Math.round(f.by+2),rr*2+1,1);}
  g.fillStyle='#b13e53';g.fillRect(Math.round(bx)-1,Math.round(by)-1,3,2);g.fillStyle='#f4f4f4';g.fillRect(Math.round(bx)-1,Math.round(by)+1,3,1);
  if(f.phase==='bite'){const yy=P.y-40-(Math.floor(time*8)%2);ptDraw(g,'!',P.x+1,yy,{font:'big',color:'#ffcd75',bg:'#1a1c2c'});}}

// ---------- farm ----------
const growth=st=>Math.min(1,(Date.now()-st.t0)/1000/CROPS[st.crop].grow);
let farmSel=null,farmQty=0,farmTick=null;
const emptyPlots=()=>S.plots.map((p,i)=>p?-1:i).filter(i=>i>=0);
const readyPlots=()=>S.plots.map((p,i)=>p&&growth(p)>=1?i:-1).filter(i=>i>=0);
function harvestAll(){const got={};let xp=0;for(const i of readyPlots()){const st=S.plots[i],c=CROPS[st.crop],n=ri(c.yield[0],c.yield[1])+(rand()<lvlOf('farming')/100?1:0);give(S.bank,c.out,n);xp+=c.xp*n;got[c.out]=(got[c.out]||0)+n;bump('crops',n);S.plots[i]=null;const p=HOLD.plots[i];puff(p.cx,p.cy,'#a7f070',6);}
  if(xp)skillXp('farming',xp);save();const txt=Object.entries(got).map(([id,n])=>'+'+n+' '+ITEMS[id].n).join(', ');if(txt){floatText(P.x,P.y-20,txt,'#a7f070');toast('Harvested '+txt+' · '+xp+' Farming xp','good');}}
function plantMany(crop,n){const free=emptyPlots().slice(0,n),c=CROPS[crop];n=Math.min(free.length,avail(c.seed));
  for(let k=0;k<n;k++){const i=free[k];S.plots[i]={crop,t0:Date.now()};const p=HOLD.plots[i];puff(p.cx,p.cy,'#a0663b',4);}take(c.seed,n);if(n){sfx('plant');S.flags.planted=true;skillXp('farming',c.plantXp*n);}save();toast('Planted '+n+' '+c.n+' · '+c.plantXp*n+' Farming xp','good');}
function plotCells(){return S.plots.map((st,i)=>{if(!st)return `<div class="plot empty"><span class="pi"></span><small>Empty</small></div>`;
  const gr=growth(st),c=CROPS[st.crop],left=Math.ceil(c.grow*(1-gr));
  return `<div class="plot ${gr>=1?'ready':''}">${iconImg(c.out)}<small>${gr>=1?'Ready':fmtT(left)}</small><i style="width:${Math.round(gr*100)}%"></i></div>`;}).join('');}
const fmtT=s=>s>=60?Math.floor(s/60)+'m '+(s%60)+'s':s+'s';
let farmPicked=false;
function openFarm(){
  const free=emptyPlots().length,ready=readyPlots().length,crops=Object.entries(CROPS);
  const canCrop=c=>avail(c.seed)>0&&lvlOf('farming')>=c.lvl,lvl=lvlOf('farming');
  if(!farmSel||!canCrop(CROPS[farmSel])&&!farmPicked){const f=crops.find(([k,c])=>canCrop(c))||crops.find(([k,c])=>avail(c.seed)>0);farmSel=f?f[0]:crops[0][0];}
  const sc=CROPS[farmSel],sn=avail(sc.seed),sName=ITEMS[sc.seed].n+(sn===1?'':'s');
  const why=lvl<sc.lvl?`<p class="lead small lockmsg">🔒 You have ${sn?sn+' '+sName:'no '+ITEMS[sc.seed].n+'s'}, but planting ${sc.n} needs <b>Farming ${sc.lvl}</b> (you're Farming ${lvl}). Plant and harvest Wheat to level up.${sc.seed==='lampseed'?' Until then, Lampseed can be pressed into Oil Flasks at the Oil Press.':''}</p>`
    :`<p class="lead small">No ${ITEMS[sc.seed].n}s in your bag or bank.${sc.seed==='wheat_seed'?' Buy them at the Market.':' Find them in the Depths'+(sc.seed==='lampseed'?' or buy them at the Market.':'.')}</p>`;
  const seeds=canCrop(CROPS[farmSel])?avail(CROPS[farmSel].seed):0,max=Math.min(free,seeds);farmQty=Math.max(max?1:0,Math.min(farmQty||max,max));
  openSheet(`<h2>Farm</h2>${skillLine('farming')}<p class="lead small">Crops grow in real time, even while you're away. Higher Farming means a better chance of an extra crop.</p>
  <div class="plots" id="plots">${plotCells()}</div>
  ${ready?`<button class="btn big" id="harv">Harvest all (${ready} ready)</button>`:''}
  <h3>Plant ${free?`<small>${free} empty plot${free>1?'s':''}</small>`:''}</h3>
  ${free?`<div class="list crops">${crops.map(([k,c])=>`<button class="item${canCrop(c)?'':' locked'}" aria-pressed="${k===farmSel}" data-crop="${k}">${iconImg(c.seed)}<span><b>${lvl<c.lvl?'🔒 ':''}${c.n}</b><small>${lvl<c.lvl?'Needs Farming '+c.lvl+' · ':''}${avail(c.seed)} ${ITEMS[c.seed].n}${avail(c.seed)===1?'':'s'} · ${fmtT(c.grow)} · ${c.yield[0]}–${c.yield[1]} each</small></span></button>`).join('')}</div>
   ${max?`<div class="qty"><span>How many?</span><button class="btn alt sm" id="qm" aria-label="Fewer">−</button><output id="qn">${farmQty}</output><button class="btn alt sm" id="qp" aria-label="More">+</button><button class="btn alt sm" id="qx">Max</button></div>
   <button class="btn big" id="plant">Plant ${farmQty} ${CROPS[farmSel].n}</button>`:why}`
   :'<p class="lead small">Every plot is growing. Harvest to free them up.</p>'}
  <div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;
  if($('harv'))$('harv').onclick=()=>{harvestAll();openFarm();};
  q.querySelectorAll('[data-crop]').forEach(b=>b.onclick=()=>{farmSel=b.dataset.crop;farmPicked=true;farmQty=0;openFarm();});
  const setQ=v=>{farmQty=Math.max(1,Math.min(max,v));$('qn').textContent=farmQty;$('plant').textContent='Plant '+farmQty+' '+CROPS[farmSel].n;};
  if($('qm')){$('qm').onclick=()=>setQ(farmQty-1);$('qp').onclick=()=>setQ(farmQty+1);$('qx').onclick=()=>setQ(max);}
  if($('plant'))$('plant').onclick=()=>{plantMany(farmSel,farmQty);farmQty=0;openFarm();};
  clearInterval(farmTick);farmTick=setInterval(()=>{const el=$('plots');if(!el||$('sheet').hidden){clearInterval(farmTick);return;}el.innerHTML=plotCells();
    const r=readyPlots().length;if(r!==ready)openFarm();},1000);
}

// ---------- panels ----------
let paused=false;
function openSheet(html,after){$('sheetBody').innerHTML=html;$('sheet').hidden=false;paused=true;stick={x:0,y:0,on:false};knob.style.transform='';retHeld=false;}
function closeSheet(){$('sheet').hidden=true;paused=false;updateHud();}
$('sheet').addEventListener('click',e=>{if(e.target.id==='sheet')closeSheet();});
function iconImg(id){return `<img class="ic" alt="" src="${iconOf(id).toDataURL()}">`;}
function openGate(){
  if(MP.party&&MP.party.leader!==MP.id&&netOn())return MP.gateMember();
  const lifts=[1];if(S.lift>=6)lifts.push(6);
  openSheet(`<h2>The Delve Gate</h2><p class="lead">Your lantern starts full. It burns oil as you go, faster on deeper floors. At empty, Shades come for you.</p>
  <div class="kit"><span>${iconImg('oil')} Oil Flasks <b>${S.bank.oil||0}</b></span><span>${iconImg('bread')} Bread <b>${S.bank.bread||0}</b></span><span>${iconImg('pondfin')} Fish <b>${S.bank.pondfin||0}</b></span><span>${iconImg('stew')} Stew <b>${S.bank.stew||0}</b></span></div>
  <div class="gear" style="--rc:${RARITY[LANTERNS[S.gear.lantern].r].c}">${iconImg(S.gear.lantern+'_lantern')}<span><small>Your lantern</small><b>${LANTERNS[S.gear.lantern].n}</b><small>${lanStat(S.gear.lantern)}${A('oil')?' · cape: oil lasts '+A('oil')+'% longer':''}</small></span></div>
  ${(()=>{const n=Object.keys(S.bank).filter(id=>ITEMS[id]&&!['oil','bread','stew','pondfin'].includes(id)).length,sup=['oil','bread','stew','pondfin'].reduce((a,id)=>a+(S.vault[id]||0),0);
    return (n?`<p class="lead small warn">Your bag holds ${n} other stack${n>1?'s':''} that could be lost. <button class="link inl" id="toBank">Visit the Bank</button></p>`:'')+(sup?`<button class="btn alt big" id="pack">Take ${sup} supplies from the Bank</button>`:'');})()}
  <div class="list">${lifts.map(f=>`<button class="item" data-go="${f}">${iconImg(f===1?'copper_ore':'iron_ore')}<span><b>${f===1?'Enter floor 1':'Take the lift to floor 6'}</b><small>${BIOMES[packOf(f).id].name}${f===6?' · unlocked by beating Mother Slime':''}</small></span></button>`).join('')}
  <div class="item locked">${iconImg('ember_ore')}<span><b>Floors 11–15 · Emberforge Halls</b><small>Season 1 expansion</small></span></div></div>
  <p class="lead small">Deepest floor: ${S.deepest||'none yet'}. Light the Return Flame (hold the flame button for 2 seconds) to come home with your loot. Dying loses about half of what you carry.</p>
  <div class="row"><button class="btn alt" id="sx">Not yet</button></div>`);
  $('sx').onclick=closeSheet;$('sheet').querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>MP.delve(+b.dataset.go));
  if($('toBank'))$('toBank').onclick=openBank;if($('pack'))$('pack').onclick=()=>{for(const id of ['oil','bread','stew','pondfin'])withdraw(id,0);save();sfx('pick');openGate();};
}
function skillLine(sk){const l=lvlOf(sk),xp=S.skills[sk]||0,a=XP_TABLE[l],b=XP_TABLE[Math.min(99,l+1)],p=l>=99?1:(xp-a)/(b-a);
  return `<div class="skl">${iconImg(SKILLS[sk].icon)}<span><b>${SKILLS[sk].n} <em>${l}</em><small>/99</small></b><i class="xpb"><i style="width:${Math.round(p*100)}%;background:${SKILLS[sk].c}"></i></i><small>${l>=99?'Max level':fmt(b-xp)+' xp to level '+(l+1)}</small></span></div>`;}
const burnChance=r=>!r.burn?0:Math.max(0,r.burn.chance*(1-(lvlOf('cooking')-1)/(r.burn.safeAt-1)))*(1-A('cookSafe')/100);
function maxMake(r){let n=Infinity;for(const [id,q] of Object.entries(r.need))n=Math.min(n,Math.floor(avail(id)/q));return n===Infinity?0:n;}
function cook(r,n){let ok=0,burnt=0,xp=0;for(let i=0;i<n&&canMake(r);i++){for(const [id,q] of Object.entries(r.need))take(id,q);
    if(rand()<burnChance(r)){give(S.bank,r.burn.out,1);burnt++;}else{give(S.bank,r.out,r.n||1);ok++;xp+=r.xp;}}
  sfx('cook');if(xp)skillXp('cooking',xp);bump('cooked',ok);bump('burnt',burnt);S.flags.cooked=true;save();toast(`Cooked ${ok} ${ITEMS[r.out].n}${burnt?`, burnt ${burnt}`:''}${xp?' · '+xp+' Cooking xp':''}`,burnt&&!ok?'bad':'good');}
function openKitchen(){const lv=lvlOf('cooking');
  openSheet(`<h2>The Kitchen</h2>${skillLine('cooking')}<p class="lead small">Food heals you in the Depths. Higher Cooking means less burnt food.</p><div class="list">${RECIPES.kitchen.map((r,i)=>{const it=ITEMS[r.out],m=maxMake(r),lock=lv<r.lvl,bc=burnChance(r);
    return `<div class="recipe${lock?' locked':''}"><div class="rh">${iconImg(r.out)}<span><b>${it.n}</b><small>Heals ${it.heal} · ${r.xp} xp${bc>0?' · '+Math.round(bc*100)+'% burn':''} · have ${avail(r.out)}${lock?' · Needs Cooking '+r.lvl:''}</small></span></div><div class="need">${needText(r)}</div>
    <div class="cookb"><button class="btn sm" data-ck="${i}" data-n="1" ${!lock&&m>=1?'':'disabled'}>Cook 1</button><button class="btn sm alt" data-ck="${i}" data-n="5" ${!lock&&m>=5?'':'disabled'}>×5</button><button class="btn sm alt" data-ck="${i}" data-n="${m}" ${!lock&&m>1?'':'disabled'}>All${m>1?' ('+m+')':''}</button></div></div>`;}).join('')}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;$('sheet').querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>{cook(RECIPES.kitchen[+b.dataset.ck],+b.dataset.n);openKitchen();});}
function needText(r){const p=Object.entries(r.need).map(([id,n])=>`<span class="${has(id,n)?'ok':'no'}">${iconImg(id)}${avail(id)}/${n}</span>`);if(r.gold)p.push(`<span class="${S.gold>=r.gold?'ok':'no'}">${iconImg('gold')}${r.gold}</span>`);return p.join('');}
const canMake=r=>Object.entries(r.need).every(([id,n])=>has(id,n))&&S.gold>=(r.gold||0)&&(!r.lvl||RECIPES.forge.indexOf(r)<0||lvlOf('smithing')>=r.lvl);
function openCraft(kind){
  const T2={forge:['The Forge','Forge gear to train Smithing. Better gear unlocks as your level rises. New gear goes into your bag; equipping it swaps your old piece back into the bag.'],kitchen:['The Kitchen','Food heals you mid-delve. Use it with the food button.'],press:['The Oil Press','Lampseed becomes Oil Flasks, the fuel for your lantern.']}[kind];
  openSheet(`<h2>${T2[0]}</h2>${kind==='forge'?skillLine('smithing'):''}<p class="lead${kind==='forge'?' small':''}">${T2[1]}</p><div class="list">${RECIPES[kind].map((r,i)=>{const lock=kind==='forge'&&lvlOf('smithing')<r.lvl;const it=ITEMS[r.out],owned=it.gear&&(S.gear[it.gear]===it.tier||(avail(r.out))>0);
    const stat=it.gear?(it.gear==='blade'?'Damage '+GEAR.blade[it.tier].dmg:'Defense '+GEAR[it.gear][it.tier].def):it.heal?'Heals '+it.heal:it.oil?'+'+it.oil+'% oil':'';
    return `<div class="recipe"><div class="rh">${iconImg(r.out)}<span><b>${it.n}${r.n?' ×'+r.n:''}</b><small>${lock?'<span class="lockt">Needs Smithing '+r.lvl+'</span> · ':''}${stat}${kind==='forge'?' · '+r.xp+' xp':''}${owned?' · owned':''}${kind!=='forge'?' · have '+(avail(r.out)):''}</small></span><button class="btn sm" data-make="${i}" ${canMake(r)?'':'disabled'}>Make</button></div><div class="need">${needText(r)}</div></div>`;}).join('')}${kind==='forge'?'<div class="recipe locked"><div class="rh"><span class="ic blank"></span><span><b>Cinderite gear</b><small>Smithing 50+ · arrives with Season 1</small></span></div></div>':''}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;
  $('sheet').querySelectorAll('[data-make]').forEach(b=>b.onclick=()=>{const r=RECIPES[kind][+b.dataset.make];if(!canMake(r))return;
    for(const [id,n] of Object.entries(r.need))take(id,n);S.gold-=r.gold||0;const it=ITEMS[r.out];
    if(it.gear){give(S.bank,r.out,1);S.flags.forged=true;bump('forged');sfx('cook');if(r.xp)skillXp('smithing',r.xp);save();toast('Forged '+it.n+'. It is in your bag.','good');openItem(r.out);return;}
    else{give(S.bank,r.out,r.n||1);toast('Made '+it.n+(r.n?' ×'+r.n:''),'good');if(kind==='press'){S.flags.pressed=true;bump('pressed');}}
    sfx('cook');
    save();openCraft(kind);});
}
// market: sell to the Hold and buy from its shop. Player-to-player trading comes later.
function openSettings(){
  const tog=(k,l,on)=>`<div class="setrow"><span>${l}</span><button class="btn alt sm" data-tog="${k}" aria-pressed="${!!on}">${on?'On':'Off'}</button></div>`;
  openSheet(`<h2>Settings</h2><p class="lead small">Saved automatically to your hero, so they load on any device you sign in from.</p>
   <h3>Display</h3>
   <div class="setrow col"><span>Zoom <b id="zv">${ZOOMS[SET.zoom]}</b></span><div class="seg">${ZOOMS.map((z,i)=>`<button class="btn alt sm" data-zoom="${i}" aria-pressed="${i===SET.zoom}">${z}</button>`).join('')}</div></div>
   <div class="setrow col"><span>Brightness <b id="bv">${SET.bright}%</b></span><input type="range" id="bright" min="60" max="160" step="5" value="${SET.bright}" aria-label="Brightness"></div>
   ${tog('names',"Other players' names",SET.names)}${tog('feed','World feed in the Hold',SET.feed)}${tog('shake','Screen shake',SET.shake)}
   <h3>Sound and feel</h3>${tog('sound','Sound effects',!muted)}${tog('vib','Vibration',SET.vib)}
   <div class="row"><button class="btn alt" id="sdef">Reset to default</button><button class="btn" id="sx">Done</button></div>`);
  const q=s=>$('sheet').querySelectorAll(s);$('sx').onclick=closeSheet;
  q('[data-zoom]').forEach(b=>b.onclick=()=>{SET.zoom=+b.dataset.zoom;saveSet(true);openSettings();});
  const r=$('bright');r.oninput=()=>{SET.bright=+r.value;$('bv').textContent=SET.bright+'%';applySet();};r.onchange=()=>saveSet();
  q('[data-tog]').forEach(b=>b.onclick=()=>{const k=b.dataset.tog;if(k==='sound'){muted=!muted;try{localStorage.setItem('lanternhold.mute',muted?'1':'0');}catch(e){}}else SET[k]=!SET[k];saveSet();openSettings();});
  $('sdef').onclick=()=>{Object.assign(SET,SET_DEF,{shake:!reduceMotion});muted=false;try{localStorage.setItem('lanternhold.mute','0');}catch(e){}saveSet(true);openSettings();};}
let sellArm=null;
function openMarket(tab){
  const ok=id=>ITEMS[id]&&!ITEMS[id].bound&&!ITEMS[id].keep,byV=(a,b)=>ITEMS[b].v-ITEMS[a].v;
  const rows=(store,from)=>Object.keys(store).filter(id=>ok(id)&&store[id]>0).sort(byV).map(id=>{const n=store[id],arm=sellArm===from+':'+id;
    return `<div class="recipe"><div class="rh">${iconImg(id)}<span><b>${ITEMS[id].n}</b><small>×${n} · ${fmt(ITEMS[id].v)} gold each${ITEMS[id].relic?' · Relic':''}${rTag(id)?' · '+rTag(id):''}</small></span><button class="btn sm${arm?' warn':''}" data-sell="${id}" data-from="${from}">${arm?'Sure?':'Sell 1'}</button>${n>1?`<button class="btn sm alt" data-sellall="${id}" data-from="${from}">All</button>`:''}</div></div>`;}).join('');
  const bagR=rows(S.bank,'bag'),bankR=rows(S.vault,'bank');
  const body=tab==='sell'?`<h3>From your bag</h3>${bagR||'<p class="lead small">Nothing in your bag to sell.</p>'}<h3>From your bank</h3>${bankR||'<p class="lead small">Nothing in your bank to sell.</p>'}<p class="lead small">Gear you're wearing isn't listed. Take it off in your bag to sell it.</p>`
   :tab==='shop'?SHOP.map(s=>`<div class="recipe"><div class="rh">${iconImg(s.id)}<span><b>${ITEMS[s.id].n}</b><small>Hold shop · ${s.price} gold</small></span><button class="btn sm" data-buy="${s.id}" data-n="1" ${S.gold>=s.price?'':'disabled'}>Buy 1</button><button class="btn sm alt" data-buy="${s.id}" data-n="5" ${S.gold>=s.price*5?'':'disabled'}>×5</button></div></div>`).join('')+'<p class="lead small">Trading between players arrives in a later update.</p>':'';
  openSheet(`<h2>Market Board</h2><div class="tabs"><button class="tab" aria-selected="${tab==='sell'}" data-tab="sell">Sell</button><button class="tab" aria-selected="${tab==='shop'}" data-tab="shop">Shop</button></div><p class="lead">You have ${iconImg('gold')} <b>${fmt(S.gold)}</b> gold.</p><div class="list">${body}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;const q=s=>$('sheet').querySelectorAll(s);
  q('[data-tab]').forEach(b=>b.onclick=()=>openMarket(b.dataset.tab));
  const sellFrom=(from,id,n)=>{const st=from==='bank'?S.vault:S.bank;n=Math.min(n,st[id]||0);if(!n)return 0;st[id]-=n;if(st[id]<=0)delete st[id];S.gold+=ITEMS[id].v*n;bump('sold',ITEMS[id].v*n);sfx('coin');save();return n;};
  const pricey=id=>ITEMS[id].relic||ITEMS[id].v>=300||(ITEMS[id].rarity&&RORDER.indexOf(ITEMS[id].rarity)>=2);
  q('[data-sell]').forEach(b=>b.onclick=()=>{const id=b.dataset.sell,from=b.dataset.from,key=from+':'+id;if(pricey(id)&&sellArm!==key){sellArm=key;return openMarket('sell');}sellArm=null;if(sellFrom(from,id,1))toast('Sold '+ITEMS[id].n+' for '+fmt(ITEMS[id].v)+' gold');openMarket('sell');});
  q('[data-sellall]').forEach(b=>b.onclick=()=>{const id=b.dataset.sellall,from=b.dataset.from,key='all:'+from+':'+id;if(pricey(id)&&sellArm!==key){sellArm=key;b.textContent='Sure?';b.classList.add('warn');return;}sellArm=null;const n=sellFrom(from,id,1e9);if(n)toast('Sold '+n+' '+ITEMS[id].n);openMarket('sell');});
  q('[data-buy]').forEach(b=>b.onclick=()=>{const s=SHOP.find(x=>x.id===b.dataset.buy),n=+b.dataset.n||1;if(S.gold<s.price*n)return;S.gold-=s.price*n;give(S.bank,s.id,n);save();toast('Bought '+n+' '+ITEMS[s.id].n);openMarket('shop');});
}
const rc=id=>ITEMS[id]&&ITEMS[id].rarity?RARITY[ITEMS[id].rarity]:null;
const rTag=id=>{const R=rc(id);return R?`<em class="rt" style="color:${R.c}">${R.n}</em>`:'';};
const lanStat=k=>{const L=LANTERNS[k];return (L.burn>=1?'Standard burn time':`Oil lasts ${Math.round((1/L.burn-1)*100)}% longer`)+(L.light>1?' · +'+Math.round((L.light-1)*100)+'% light':'');};
const capeStat=k=>Object.entries(CAPES[k].attr).map(([a,v])=>ATTR_TXT[a](v)).join(' · ');
let bagTab='hero',xArm=false;
// Linked X account (live game only: the account script provides ACC.xInfo; the demo has none, so the row is hidden)
// Ways to sign in: a wallet and/or Google. Either can be added from here.
function linkRows(){const L=window.ACC&&ACC.links&&ACC.links();if(!L)return '';const out=[];
  out.push(`<div class="gear xrow"><i class="ic xic" aria-hidden="true">◆</i><span><small>Wallet</small><b>${L.wallet?L.wallet.slice(0,6)+'…'+L.wallet.slice(-4):'Not connected'}</b><small>${L.wallet?'Signs you in · Robinhood Chain':'Needed later for Season 1 rewards'}</small></span>${L.wallet?'':'<button class="btn sm" id="wLn">Connect</button>'}</div>`);
  if(L.googleEnabled||L.google)out.push(`<div class="gear xrow"><i class="ic xic" aria-hidden="true">G</i><span><small>Google</small><b>${L.google?chatEsc(L.google):'Not linked'}</b><small>${L.google?'Signs you in':'A second way to sign in'}</small></span>${L.google?'':'<button class="btn alt sm" id="gLn">Link</button>'}</div>`);
  return out.join('');}
function xRow(){const x=window.ACC&&ACC.xInfo&&ACC.xInfo();if(!x)return '';const u=x.username;
  return `<div class="gear xrow"><i class="ic xic" aria-hidden="true">X</i><span><small>X account</small><b>${u?`<a href="https://x.com/${chatEsc(u)}" target="_blank" rel="noopener noreferrer">@${chatEsc(u)}</a>`:'Not linked'}</b><small>${u?'Linked to this hero':x.enabled?'Approve on X to prove it’s yours':'Coming soon'}</small></span>${u?`<button class="btn alt sm${xArm?' warn':''}" id="xUn">${xArm?'Sure?':'Unlink'}</button>`:x.enabled?'<button class="btn sm" id="xLn">Link X</button>':''}</div>`;}
function heroIcon(){try{const c=document.createElement('canvas');c.width=16;c.height=16;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(heroImg(myLook(),'down',0),0,-1);$('icHero').src=c.toDataURL();}catch(e){}}
function openHero(){openBag('hero');}function openSkills(){openBag('skills');}
function openBag(tab){bagTab=tab||'items';
  const hc=document.createElement('canvas');hc.width=16;hc.height=16;hc.getContext('2d').drawImage(heroImg(myLook(),'down',0),0,0);
  const LK=window.ACC&&ACC.links?ACC.links():{},wa=LK.wallet||S.wallet,wl=wa?wa.slice(0,6)+'…'+wa.slice(-4):LK.google?'Google account':'Signed in';
  const img=c=>`<img class="ic" alt="" src="${c.toDataURL()}">`;
  const row=(icon,label,name,stat,btn,id)=>`<div class="gear" ${id?`style="--rc:${(rc(id)||{}).c||'transparent'}"`:''}>${icon}<span><small>${label}</small><b>${name}</b><small>${stat}</small></span>${btn||''}</div>`;
  const bl=S.gear.blade,ml=S.gear.mail,ln=S.gear.lantern,cp=S.gear.cape;
  const owned=t=>allKeys().filter(id=>ITEMS[id][t]).length;
  let body='';
  if(bagTab==='hero'){body=`<div class="hero"><img class="ic" alt="" src="${hc.toDataURL()}"><span><b>${esc(S.name||'Adventurer')}</b><small>${wl}${window.ACC&&ACC.online()?' · saved to your account':''}</small></span>${scene==='hold'?'<button class="btn alt sm" id="look">Change look</button>':''}</div>${linkRows()}${xRow()}
   <div class="stats"><span>Combat <b>${S.lvl}</b></span><span>HP <b>${Math.ceil(P.hp)}/${maxHp()}</b></span><span>Damage <b>${Math.round(dmgOf())}</b></span><span>Defense <b>${defOf()}</b></span></div>
   <div class="gears">
    ${row(iconImg(gearId('blade',bl)),'Blade',ITEMS[gearId('blade',bl)].n,'Damage '+GEAR.blade[bl].dmg,`<button class="btn alt sm" data-eq="blade">Change${owned('gear')&&allKeys().some(id=>itemSlot(id)==='blade')?' ('+allKeys().filter(id=>itemSlot(id)==='blade').length+')':''}</button>`)}
    ${row(iconImg(gearId('mail',ml)),'Armor',ITEMS[gearId('mail',ml)].n,'Defense '+GEAR.mail[ml].def,`<button class="btn alt sm" data-eq="mail">Change${allKeys().some(id=>itemSlot(id)==='mail')?' ('+allKeys().filter(id=>itemSlot(id)==='mail').length+')':''}</button>`)}
    ${row(iconImg(ln+'_lantern'),'Lantern '+rTag(ln+'_lantern'),LANTERNS[ln].n,lanStat(ln),`<button class="btn alt sm" data-eq="lantern">Change${owned('lantern')?' ('+owned('lantern')+')':''}</button>`,ln+'_lantern')}
    ${cp?row(iconImg('cape_'+cp),'Cape '+rTag('cape_'+cp),CAPES[cp].n,capeStat(cp),`<button class="btn alt sm" data-eq="cape">Change</button>`,'cape_'+cp)
        :row('<i class="ic blank"></i>','Cape','No cape',owned('cape')?'You have '+owned('cape')+' to wear':'Capes are rare finds in the Depths',owned('cape')?`<button class="btn alt sm" data-eq="cape">Wear</button>`:'')}
    ${S.gear.helm?row(iconImg(gearId('helm',S.gear.helm)),'Helmet '+rTag(gearId('helm',S.gear.helm)),ITEMS[gearId('helm',S.gear.helm)].n,helmStat(S.gear.helm),'<button class="btn alt sm" data-eq="helm">Change</button>',gearId('helm',S.gear.helm))
       :row('<i class="ic blank"></i>','Helmet','No helmet',allKeys().some(id=>itemSlot(id)==='helm')?'You have one to wear':'Forge one from Smithing 3',allKeys().some(id=>itemSlot(id)==='helm')?'<button class="btn alt sm" data-eq="helm">Wear</button>':'')}
   </div>
   ${ADMIN?'<button class="btn big admin" id="adm">Admin powers</button>':''}
   <h3>Quick slots <small>tap to set</small></h3><div class="qslots">${S.quick.map((id,j)=>`<button class="qs" data-qs="${j}" aria-label="Quick slot ${j+1}${id?': '+ITEMS[id].n:''}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>
   <div class="row"><button class="btn alt" id="setO">Settings</button><button class="btn alt" id="gd">Goals</button></div>
   <div class="row"><button class="btn alt" id="reset">Reset progress</button><button class="btn alt" id="out">Sign out</button></div>`;}
  else if(bagTab==='skills'){body=`<div class="list">${['woodcutting','fishing','farming','cooking','smithing'].map(skillLine).join('')}</div><p class="small">Total level ${totalLvl()} · <button class="linkb" id="gd2">Goals ${goalsDone()}/${GOALS.length}</button></p>
   <div class="perks"><p><b>Farming</b> ${Math.round(lvlOf('farming'))}% chance of a bonus crop. Unlocks Lampseed at 3, Glowcap at 6.</p>
   <p><b>Fishing</b> ${Math.round(catchChance()*100)}% catch chance if you don't hook. Tap <b>Hook!</b> when the bobber dips for a sure catch. ${fmt(S.caught||0)} fish caught.</p>
   <p><b>Woodcutting</b> ${Math.round(chopChance()*100)}% chance per swing, one swing every ${chopEvery().toFixed(1)} s. Trees at the Hold hold 150 logs, shared by everyone, then fall and regrow. ${fmt(C('logs'))} logs cut. Logs will feed a new skill soon, so stack them.</p>
   <p><b>Smithing</b> Forge gear for XP. Helmets at 3, armor at 6, Iron at 10–14, Ember at 25–32.</p>
   <p><b>Cooking</b> ${Math.round(burnChance(RECIPES.kitchen[1])*100)}% chance to burn Pondfin (none at level 30). Unlocks Glowcap Stew at 5.</p>
   <p class="small">Combat level ${S.lvl} · ${S.xp}/${xpNeed(S.lvl)} xp · deepest floor ${S.deepest||'—'}</p></div>`;}
  else{const items=Object.entries(S.bank).filter(([id])=>ITEMS[id]).sort((a,b)=>(RORDER.indexOf(ITEMS[b[0]].rarity)+1)-(RORDER.indexOf(ITEMS[a[0]].rarity)+1));
   const pg=scene==='delve'&&run?(run.pack.gold||0):0,found=scene==='delve'&&run?Object.fromEntries(Object.entries(run.pack).filter(([id])=>id!=='gold')):{};
   body=`<div class="goldline">${iconImg('gold')}<span><b>${fmt(S.gold)}</b> gold${pg?` <em>+${fmt(pg)} found this delve</em>`:''}</span></div>
   ${scene==='delve'&&Object.keys(found).length?'<h3>Found this delve</h3>'+listItems(found):''}<p class="lead small">Everything here comes with you into the Depths, and about half is lost if you fall. ${scene==='hold'?'Keep valuables in the Bank.':'Your Bank at the Hold is safe.'}</p><h3>On you</h3><div class="grid">${items.length?items.map(([id,n])=>`<button class="cell" data-item="${id}" aria-label="${ITEMS[id].n}, ${n}" ${rc(id)?`style="--rc:${rc(id).c}"`:''}>${iconImg(id)}<b>${n}</b><small>${ITEMS[id].n}</small></button>`).join(''):'<p class="lead">Empty.</p>'}</div>`;}
  openSheet(`<h2>${{hero:'Hero',skills:'Skills'}[bagTab]||'Bag'}</h2>${body}<div class="row"><button class="btn" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;q.querySelectorAll('[data-bt]').forEach(b=>b.onclick=()=>openBag(b.dataset.bt));
  q.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>openEquip(b.dataset.eq));
  q.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>openItem(b.dataset.item));
  q.querySelectorAll('[data-qs]').forEach(b=>b.onclick=()=>openQuickPick(+b.dataset.qs));
  if($('look'))$('look').onclick=()=>{closeSheet();ACC.editLook(S.name,S.look);};
  if($('adm'))$('adm').onclick=openAdmin;
  if($('setO'))$('setO').onclick=openSettings;if($('gLn'))$('gLn').onclick=()=>{$('gLn').disabled=true;ACC.linkGoogle();};
  if($('wLn'))$('wLn').onclick=async()=>{const b=$('wLn');b.disabled=true;b.textContent='Check wallet…';const r=await ACC.linkWallet();toast(r.ok?'Wallet connected: '+r.addr.slice(0,6)+'…'+r.addr.slice(-4):r.msg,r.ok?'good':'bad');openHero();};if($('xLn'))$('xLn').onclick=()=>{$('xLn').disabled=true;$('xLn').textContent='Opening X…';ACC.xLink();};
  if($('xUn'))$('xUn').onclick=async()=>{if(!xArm){xArm=true;return openHero();}xArm=false;const ok=await ACC.xUnlink();toast(ok?'X account unlinked':'Couldn’t unlink. Try again.',ok?'good':'bad');openHero();};if($('gd'))$('gd').onclick=()=>openGuide();if($('gd2'))$('gd2').onclick=()=>openGuide();
  if($('out'))$('out').onclick=()=>{save();ACC.flush();ACC.logout();};
  if($('reset'))$('reset').onclick=()=>{if($('reset').dataset.c){S=normalize({name:S.name,look:S.look,wallet:S.wallet});save();P.hp=maxHp();enterHold();closeSheet();toast('Progress reset');}else{$('reset').dataset.c=1;$('reset').textContent='Tap again to reset';}};
}
function itemInfo(id){const it=ITEMS[id],o=[];
  if(it.lantern)o.push(lanStat(it.lantern));if(it.cape)o.push(capeStat(it.cape));if(it.heal)o.push('Heals '+it.heal+' HP in the Depths');if(it.oil)o.push('Refills '+it.oil+'% lantern oil');
  if(it.gear)o.push(it.gear==='blade'?'Damage '+GEAR.blade[it.tier].dmg:'Defense '+GEAR.mail[it.tier].def);if(it.relic)o.push('Boss relic. Can be minted on-chain in the live game');
  const seedOf=Object.values(CROPS).find(c=>c.seed===id);if(seedOf)o.push('Plant at the Farm · Farming '+seedOf.lvl);
  const ck=RECIPES.kitchen.find(r=>r.need[id]);if(ck)o.push('Cook into '+ITEMS[ck.out].n+' at the Kitchen');
  if(id==='lampseed')o.push('Press into Oil Flasks at the Oil Press');if(/_ore$|gem|gel|bone/.test(id))o.push('Used at the Forge');
  if(id==='burnt_fish')o.push('Not much use to anyone');return o;}
let dropQty=1,dropArm=false;
function openItem(id,keep){const it=ITEMS[id],n=S.bank[id]||0;if(!n){openBag();return;}if(!keep){dropQty=1;dropArm=false;}dropQty=Math.min(dropQty,n);
  const R=rc(id),rare=!!R||!!it.relic;
  if(it.bound){openSheet(`<div class="itemhd" style="--rc:${R.c}"><img class="big" alt="" src="${iconOf(id).toDataURL()}"><span><b>${it.n}</b><em style="color:${R.c}">${R.n}</em><small>Bound to you</small></span></div>
     <ul class="info"><li>${helmStat(it.tier)}</li><li>The only one in the game. It can never be sold, traded or dropped.</li></ul>
     ${S.gear.helm!==it.tier?'<button class="btn big" id="eqIt">Equip</button>':''}<div class="row"><button class="btn alt" id="back">Back to items</button></div>`);
    $('back').onclick=()=>openBag();if($('eqIt'))$('eqIt').onclick=()=>{equipItem(id);openHero();};return;}
  openSheet(`<div class="itemhd" ${R?`style="--rc:${R.c}"`:''}><img class="big" alt="" src="${iconOf(id).toDataURL()}"><span><b>${it.n}</b>${R?`<em style="color:${R.c}">${R.n}</em>`:''}<small>You have ${fmt(n)} · worth ${fmt(it.v)} gold each</small></span></div>
   <ul class="info">${itemInfo(id).map(t=>`<li>${t}</li>`).join('')}</ul>
   ${itemSlot(id)?`<button class="btn big" id="eqIt">Equip${S.gear[itemSlot(id)]?' (swap with '+ITEMS[gearId(itemSlot(id),S.gear[itemSlot(id)])].n+')':''}</button>`:''}
   ${it.food||it.oil?`<h3>Quick slot</h3><div class="qslots">${S.quick.map((q,j)=>`<button class="qs ${q===id?'on':''}" data-qset="${j}" aria-label="Put in quick slot ${j+1}">${q?`<img alt="" src="${iconOf(q).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>`:''}
   ${it.keep?'<p class="lead small" style="color:#ff77a8">Goal Relic. Earned only through goals. It can’t be sold, traded or dropped.</p>':`   <h3>Drop</h3><p class="lead small">It lands at your feet. Tap <b>Pick up</b> to take it back. After 30 seconds, other players nearby can see it and pick it up. It disappears after 3 minutes. To get gold instead, sell at the Market Board.</p>
   ${n>1?`<div class="qty"><span>How many?</span><button class="btn alt sm" id="dm" aria-label="Fewer">−</button><output id="dn">${dropQty}</output><button class="btn alt sm" id="dp" aria-label="More">+</button><button class="btn alt sm" id="dx">All</button></div>`:''}
   <button class="btn big danger" id="drop">${dropArm?`Tap again to drop ${dropQty} ${it.n}`:`Drop ${dropQty>1?dropQty+' ':''}${it.n}`}</button>
`}
   <div class="row"><button class="btn alt" id="back">Back to items</button></div>`);
  const setQ=v=>{dropQty=Math.max(1,Math.min(n,v));dropArm=false;openItem(id,true);};
  if($('dm')&&$('dp')){$('dm').onclick=()=>setQ(dropQty-1);$('dp').onclick=()=>setQ(dropQty+1);$('dx').onclick=()=>setQ(n);}
  $('back').onclick=()=>openBag();
  if($('eqIt'))$('eqIt').onclick=()=>{equipItem(id);if(S.bank[id])openItem(id,true);else openHero();};
  $('sheet').querySelectorAll('[data-qset]').forEach(b=>b.onclick=()=>{const j=+b.dataset.qset,o=S.quick.indexOf(id);if(o>=0)S.quick[o]=S.quick[j]===id?null:S.quick[j];S.quick[j]=id;save();updateQuick(true);openItem(id,true);});
  if($('drop'))$('drop').onclick=()=>{if((rare||dropQty>=10||dropQty===n&&n>1)&&!dropArm){dropArm=true;openItem(id,true);return;}
    take(id,dropQty);dropToGround(id,dropQty);save();toast('Dropped '+dropQty+' '+it.n+' at your feet');sfx('drop');dropArm=false;if(S.bank[id])openItem(id,true);else openBag();};}
function openAdmin(){if(!ADMIN)return;
  const acts=[['kit','Top loadout: best gear + every lantern, cape and relic'],['gold','+10,000 gold'],['mats','+50 of every ore, gem and material'],['food','+20 food and Oil Flasks'],['skills','All skills to 99'],['combat','Combat level 50'],['bank','Max bank space'],['lift','Unlock the lift to floor 6'],['heal','Full health and oil'],['god',(S.flags.god?'Turn off':'Turn on')+' god mode']].concat(scene==='delve'?[['f5','Jump to Mother Slime (F5)'],['f10','Jump to the Ossuary Knight (F10)']]:[]);
  openSheet(`<h2>Admin powers</h2><p class="lead small">Only party hat owners see this. Admin changes save to your account; the server skips its usual checks for admin heroes.</p><div class="list">${acts.map(([k,l])=>`<button class="item" data-ad="${k}"><span><b>${l}</b></span></button>`).join('')}</div><div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  $('sheet').querySelectorAll('[data-ad]').forEach(b=>b.onclick=()=>{const k=b.dataset.ad;
    if(k==='kit'){grantKit();S.gold-=100000;}
    if(k==='gold')S.gold+=10000;
    if(k==='mats')for(const id of ['copper_ore','iron_ore','ember_ore','gem','slime_gel','bone','lampseed','glowcap_spore','wheat_seed','raw_pondfin','wheat','glowcap'])give(S.bank,id,50);
    if(k==='food')for(const id of ['oil','bread','pondfin','stew'])give(S.bank,id,20);
    if(k==='skills')for(const sk of Object.keys(SKILLS))S.skills[sk]=XP_TABLE[99];
    if(k==='combat'){S.lvl=50;S.xp=0;P.hp=maxHp();}
    if(k==='bank')S.bankBuys=BANK_BUYS.length;
    if(k==='lift')S.lift=6;
    if(k==='heal'){P.hp=maxHp();if(run)run.oil=100;}
    if(k==='god')S.flags.god=!S.flags.god;
    if(k==='f5'||k==='f10'){enterFloor(k==='f5'?5:10);closeSheet();}
    save();sfx('level');toast('Admin: done','good');if(k!=='f5'&&k!=='f10')openAdmin();});}
function openQuickPick(i){const opts=['oil'].concat(FOODS);
  openSheet(`<h2>Quick slot ${i+1}</h2><p class="lead small">Quick slots sit on your screen in the Depths. Tap one to eat or refill your lantern. Keys 1–5 work too.</p>
   <div class="qslots">${S.quick.map((id,j)=>`<button class="qs ${j===i?'on':''}" data-qs="${j}" aria-label="Slot ${j+1}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>
   <div class="list">${opts.map(id=>`<button class="item" aria-pressed="${S.quick[i]===id}" data-q="${id}">${iconImg(id)}<span><b>${ITEMS[id].n}</b><small>${ITEMS[id].heal?'Heals '+ITEMS[id].heal:'Refills '+ITEMS[id].oil+'% oil'} · ${S.bank[id]||0} in bag${S.vault[id]?' · '+S.vault[id]+' in bank':''}</small></span></button>`).join('')}</div>
   <div class="row"><button class="btn alt" id="qclr">Clear slot</button><button class="btn" id="sx">Done</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;q.querySelectorAll('[data-qs]').forEach(b=>b.onclick=()=>openQuickPick(+b.dataset.qs));
  q.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const id=b.dataset.q,o=S.quick.indexOf(id);if(o>=0&&o!==i)S.quick[o]=S.quick[i];S.quick[i]=id;save();updateQuick(true);openQuickPick(i);});
  $('qclr').onclick=()=>{S.quick[i]=null;save();updateQuick(true);openQuickPick(i);};}
// ---------- gear: every slot equips from the bag and swaps the old piece back into it ----------
const gearId=(slot,t)=>!t?null:slot==='blade'?(t==='rusty'?'rusty_blade':t+'_blade'):slot==='mail'?(t==='none'?'traveler_garb':t+'_mail'):slot==='lantern'?t+'_lantern':slot==='helm'?t+'_helm':'cape_'+t;
const itemSlot=id=>{const it=ITEMS[id];return !it?null:it.gear||(it.lantern?'lantern':it.cape?'cape':null);};
const itemTier=id=>{const it=ITEMS[id];return it.tier||it.lantern||it.cape;};
const helmStat=t=>'Defense '+GEAR.helm[t].def+(HELM_ATTR[t]?' · '+Object.entries(HELM_ATTR[t]).map(([a,v])=>ATTR_TXT[a](v)).join(' · '):'');
const gearStat=(slot,t)=>slot==='helm'?helmStat(t):slot==='blade'?'Damage '+GEAR.blade[t].dmg:slot==='mail'?'Defense '+GEAR.mail[t].def:slot==='lantern'?lanStat(t):capeStat(t);
function equipItem(id){const slot=itemSlot(id);if(!slot||!has(id))return;take(id,1);const old=gearId(slot,S.gear[slot]);if(old)give(S.bank,old,1);S.gear[slot]=itemTier(id);
  P.hp=Math.min(P.hp,maxHp());save();sfx('pick');toast('Equipped '+ITEMS[id].n+(old?'. '+ITEMS[old].n+' went to your bag':''),'good');}
function openEquip(slot){
  const cur=S.gear[slot],curId=gearId(slot,cur),NAMES2={blade:'Blades',mail:'Armor',helm:'Helmets',lantern:'Lanterns',cape:'Capes'};
  const opts=allKeys().filter(id=>itemSlot(id)===slot).sort((a,b)=>(RORDER.indexOf(ITEMS[b].rarity)-RORDER.indexOf(ITEMS[a].rarity))||(ITEMS[b].v-ITEMS[a].v));
  const line=(id,btn)=>`<div class="gear" style="--rc:${(rc(id)||{}).c||'var(--ink)'}">${iconImg(id)}<span><small>${rTag(id)}</small><b>${ITEMS[id].n}</b><small>${gearStat(slot,itemTier(id))}</small></span>${btn}</div>`;
  const help={helm:'Forge helmets at the Forge from Smithing 3.',blade:'Forge better blades at the Forge.',mail:'Forge armor at the Forge.',lantern:'Better lanterns burn oil slower and light up more of the dark.',cape:'Capes carry special attributes. Find them in chests, from monsters and bosses, and rarely while fishing.'}[slot];
  openSheet(`<h2>${NAMES2[slot]}</h2><p class="lead small">${help} Equipping swaps: what you wore goes into your bag, where you can sell, bank or drop it.</p>
   <h3>Equipped</h3>${curId?line(curId,slot==='cape'||slot==='helm'?'<button class="btn alt sm" id="off">Take off</button>':''):'<p class="lead small">Nothing.</p>'}
   <h3>${scene==='hold'?'In your bag and bank':'In your bag'}</h3>${opts.length?`<div class="list">${opts.map(id=>line(id,`<button class="btn sm" data-wear="${id}">Equip</button>`)).join('')}</div>`:`<p class="lead small">None yet.${scene==='delve'?' Items found this delve go into your bag when you get home.':''}</p>`}
   <div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  if($('off'))$('off').onclick=()=>{give(S.bank,curId,1);S.gear[slot]=null;P.hp=Math.min(P.hp,maxHp());save();openEquip(slot);};
  $('sheet').querySelectorAll('[data-wear]').forEach(b=>b.onclick=()=>{equipItem(b.dataset.wear);openHero();});
}
// ---------- the Bank ----------
const BANK_UNLOCKS=[
  {t:'Defeat Mother Slime',slots:4,done:()=>!!S.bosses.mother},
  {t:'Defeat the Ossuary Knight',slots:6,done:()=>!!S.bosses.knight},
  {t:'Reach Farming 15',slots:2,done:()=>lvlOf('farming')>=15},
  {t:'Reach Fishing 15',slots:2,done:()=>lvlOf('fishing')>=15},
  {t:'Reach Cooking 15',slots:2,done:()=>lvlOf('cooking')>=15},
  {t:'Reach Smithing 15',slots:2,done:()=>lvlOf('smithing')>=15},
  {t:'Reach combat level 10',slots:2,done:()=>S.lvl>=10},
  {t:'Complete 25 goals',slots:4,done:()=>goalsDone()>=25}];
const bankCap=()=>BANK_BASE+BANK_UNLOCKS.reduce((a,u)=>a+(u.done()?u.slots:0),0)+S.bankBuys*BANK_BUY_SLOTS;
const bankMax=()=>BANK_BASE+BANK_UNLOCKS.reduce((a,u)=>a+u.slots,0)+BANK_BUYS.length*BANK_BUY_SLOTS;
const bankUsed=()=>Object.keys(S.vault).length;
const byWorth=([a,n],[b,m])=>(RORDER.indexOf(ITEMS[b].rarity)-RORDER.indexOf(ITEMS[a].rarity))||(ITEMS[b].v*m-ITEMS[a].v*n);
let bankAmt=0,lastCap=0;
function deposit(id,amt,quiet){const have=S.bank[id]||0;if(!have)return 0;if(!S.vault[id]&&bankUsed()>=bankCap()){if(!quiet)toast('Bank is full. Free a slot or get more space.','bad');return 0;}
  const n=amt?Math.min(amt,have):have;S.bank[id]-=n;if(!S.bank[id])delete S.bank[id];give(S.vault,id,n);S.flags.deposited=true;return n;}
function withdraw(id,amt){const have=S.vault[id]||0;if(!have)return 0;const n=amt?Math.min(amt,have):have;S.vault[id]-=n;if(!S.vault[id])delete S.vault[id];give(S.bank,id,n);return n;}
const SUPPLIES=['oil','bread','stew','pondfin'];
function depositAll(){let n=0,skip=0;for(const [id,q] of Object.entries(S.bank).filter(([id])=>ITEMS[id]&&!SUPPLIES.includes(id)).sort(byWorth)){if(deposit(id,0,true))n++;else skip++;}
  save();sfx('coin');toast(skip?`Banked ${n} stack${n===1?'':'s'}. ${skip} didn't fit.`:`Banked ${n} stack${n===1?'':'s'}`,skip?'bad':'good');}
function bankCell(id,n,attr){const R=rc(id);return `<button class="cell" ${attr}="${id}" aria-label="${ITEMS[id].n}, ${n}" ${R?`style="--rc:${R.c}"`:''}>${iconImg(id)}<b>${fmt(n)}</b><small>${ITEMS[id].n}</small></button>`;}
function openBank(){if(scene!=='hold')return;const cap=bankCap(),used=bankUsed(),next=BANK_BUYS[S.bankBuys];
  const vault=Object.entries(S.vault).filter(([id])=>ITEMS[id]).sort(byWorth),bag=Object.entries(S.bank).filter(([id])=>ITEMS[id]).sort(byWorth);
  openSheet(`<h2>Bank</h2><p class="lead small">Banked items are always safe. Your bag comes with you into the Depths, and you lose about half of it if you fall. Stations at the Hold can use banked items directly.</p>
   <div class="skl bankcap"><span><b>${used} / ${cap} <small>slots used</small></b><i class="xpb"><i style="width:${Math.round(used/cap*100)}%;background:${used>=cap?'#b13e53':'#ffcd75'}"></i></i><small>Each slot holds any amount of one item</small></span></div>
   <div class="qty"><span>Move</span>${[[1,'1'],[10,'10'],[0,'All']].map(([v,l])=>`<button class="chip" aria-pressed="${bankAmt===v}" data-amt="${v}">${l}</button>`).join('')}</div>
   <h3>In the bank <small>tap to take out</small></h3><div class="grid">${vault.length?vault.map(([id,n])=>bankCell(id,n,'data-wd')).join(''):'<p class="lead small">Empty.</p>'}</div>
   <h3>In your bag <small>tap to bank</small></h3><div class="grid">${bag.length?bag.map(([id,n])=>bankCell(id,n,'data-dep')).join(''):'<p class="lead small">Your bag is empty.</p>'}</div>
   ${bag.some(([id])=>!SUPPLIES.includes(id))?'<button class="btn big" id="depAll">Bank everything but supplies</button><p class="lead small">Oil Flasks and food stay in your bag for the next delve.</p>':''}
   <h3>More bank space <small>${cap} of ${bankMax()} slots</small></h3>
   <ul class="unlocks">${BANK_UNLOCKS.map(u=>`<li class="${u.done()?'done':''}"><span>${u.done()?'✓':'○'}</span><b>${u.t}</b><em>+${u.slots}</em></li>`).join('')}</ul>
   ${next!==undefined?`<button class="btn big" id="buy" ${S.gold>=next?'':'disabled'}>Buy ${BANK_BUY_SLOTS} slots · ${fmt(next)} gold</button><p class="lead small">${BANK_BUYS.length-S.bankBuys} purchases left. Each costs more than the last.</p>`:'<p class="lead small">You have bought every expansion.</p>'}
   <div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;
  q.querySelectorAll('[data-amt]').forEach(b=>b.onclick=()=>{bankAmt=+b.dataset.amt;openBank();});
  q.querySelectorAll('[data-dep]').forEach(b=>b.onclick=()=>{if(deposit(b.dataset.dep,bankAmt)){sfx('pick');save();}openBank();});
  q.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>{if(withdraw(b.dataset.wd,bankAmt)){sfx('pick');save();}openBank();});
  if($('depAll'))$('depAll').onclick=()=>{depositAll();openBank();};
  if($('buy'))$('buy').onclick=()=>{const c=BANK_BUYS[S.bankBuys];if(c===undefined||S.gold<c)return;S.gold-=c;S.bankBuys++;save();sfx('level');toast('Bank expanded to '+bankCap()+' slots','good');openBank();};}
function checkBankGrowth(){const c=bankCap();if(lastCap&&c>lastCap){toast('Bank expanded to '+c+' slots!','good');sfx('level');}lastCap=c;}
function migrateBank(){if(S.flags.vault)return;S.flags.vault=true;const keepOut=new Set(['oil','bread','stew','pondfin']);let moved=0;
  for(const [id] of Object.entries(S.bank).filter(([id])=>ITEMS[id]&&!keepOut.has(id)).sort(byWorth))if(deposit(id,0,true))moved++;
  S.flags.deposited=false;if(moved)setTimeout(()=>toast('Your stored items are now in the Bank. Supplies stay in your bag.','good'),1600);}

// ---------- goals: complete in any order, each pays gold once ----------
// Categories run from first steps to long grinds. Secret goals stay hidden ("???") until someone stumbles on them.
// Every goal completed rolls for a Goal Relic, items that exist nowhere else in the game (much better odds on secrets).
const bump=(k,n=1)=>{if(n>0)S.cnt[k]=(S.cnt[k]||0)+n;};
const C=k=>S.cnt[k]||0;
const totalLvl=()=>Object.keys(SKILLS).reduce((a,k)=>a+lvlOf(k),0);
const ownsRarity=r=>allKeys().concat(Object.keys(S.vault)).some(id=>ITEMS[id]&&ITEMS[id].rarity&&RORDER.indexOf(ITEMS[id].rarity)>=RORDER.indexOf(r)&&ITEMS[id].rarity!=='unique');
const GOAL_CATS=[['start','First steps'],['skills','Skills'],['depths','The Depths'],['hold','Life at the Hold'],['secret','Secrets']];
const lv=(k,n)=>({done:()=>lvlOf(k)>=n,prog:()=>[lvlOf(k),n]}),cn=(f,n)=>({done:()=>f()>=n,prog:()=>[Math.min(n,f()),n]});
const GOALS=[
  {id:'plant',cat:'start',t:'Plant crops at the Farm',hint:'Walk to the fenced field and tap Farm. You start with 20 Wheat Seeds.',done:()=>S.flags.planted,gold:10},
  {id:'fish',cat:'start',t:'Catch a fish',hint:'Stand at the lake edge and tap Fish. Tap Hook! when the bobber dips.',done:()=>S.caught>0,gold:10},
  {id:'chop',cat:'start',t:'Cut your first log',hint:'Walk up to a tree inside the Hold and tap Chop.',...cn(()=>C('logs'),1),gold:10},
  {id:'cook',cat:'start',t:'Cook food at the Kitchen',hint:'Cooked Pondfin heals 35. Bread heals 30.',done:()=>S.flags.cooked,gold:10},
  {id:'press',cat:'start',t:'Press Lampseed into oil',hint:'The Oil Press turns 1 Lampseed into 2 Oil Flasks.',done:()=>S.flags.pressed,gold:15},
  {id:'bank',cat:'start',t:'Store something in the Bank',hint:'The stone building. Banked items are safe if you fall.',done:()=>!!S.flags.deposited,gold:10},
  {id:'gate',cat:'start',t:'Enter the Delve Gate',hint:'The cave at the top of the Hold.',done:()=>S.deepest>=1,gold:15},
  {id:'f3',cat:'start',t:'Reach floor 3',hint:'Find the stairs on each floor. Mine ore on the walls.',done:()=>S.deepest>=3,gold:25,prog:()=>[Math.min(3,S.deepest),3]},
  {id:'forge',cat:'start',t:'Forge a Copper Blade',hint:'6 Copper Ore + 20 gold at the Forge, then equip it.',done:()=>!!S.flags.forged||S.gear.blade!=='rusty',gold:25},
  {id:'fish10',cat:'skills',t:'Reach Fishing 10',hint:'Pondfin give 10 xp each.',...lv('fishing',10),gold:50},
  {id:'fish25',cat:'skills',t:'Reach Fishing 25',hint:'Hook! catches never miss.',...lv('fishing',25),gold:150},
  {id:'fish100',cat:'skills',t:'Catch 100 fish',hint:'A quiet afternoon at the lake.',...cn(()=>S.caught||0,100),gold:75},
  {id:'fish1k',cat:'skills',t:'Catch 1,000 fish',hint:'The lake knows your name.',...cn(()=>S.caught||0,1000),gold:400},
  {id:'wc5',cat:'skills',t:'Reach Woodcutting 5',hint:'Every log is 3 xp. Cut with friends.',...lv('woodcutting',5),gold:30},
  {id:'wc15',cat:'skills',t:'Reach Woodcutting 15',hint:'Faster swings and fewer misses as you level.',...lv('woodcutting',15),gold:100},
  {id:'wc30',cat:'skills',t:'Reach Woodcutting 30',hint:'New trees arrive with new areas.',...lv('woodcutting',30),gold:250},
  {id:'logs500',cat:'skills',t:'Cut 500 logs',hint:'Stack them. Logs will feed a new skill soon.',...cn(()=>C('logs'),500),gold:100},
  {id:'logs5k',cat:'skills',t:'Cut 5,000 logs',hint:'Somewhere, a forest trembles.',...cn(()=>C('logs'),5000),gold:500},
  {id:'farm10',cat:'skills',t:'Reach Farming 10',hint:'Plant and harvest at the Farm.',...lv('farming',10),gold:50},
  {id:'crops',cat:'skills',t:'Harvest 500 crops',hint:'Higher Farming gives bonus crops.',...cn(()=>C('crops'),500),gold:150},
  {id:'cook10',cat:'skills',t:'Reach Cooking 10',hint:'Cook at the Kitchen.',...lv('cooking',10),gold:50},
  {id:'smith10',cat:'skills',t:'Reach Smithing 10',hint:'Forge gear at the Forge.',...lv('smithing',10),gold:60},
  {id:'smith25',cat:'skills',t:'Reach Smithing 25',hint:'Ember gear starts at 25.',...lv('smithing',25),gold:200},
  {id:'total',cat:'skills',t:'Total skill level 100',hint:'Every skill counts.',...cn(totalLvl,100),gold:200},
  {id:'mother',cat:'depths',t:'Defeat Mother Slime',hint:'She waits on floor 5. Bring food.',done:()=>!!S.bosses.mother,gold:60},
  {id:'knight',cat:'depths',t:'Defeat the Ossuary Knight',hint:'Floor 10. Watch for his charge.',done:()=>!!S.bosses.knight,gold:150},
  {id:'f10',cat:'depths',t:'Reach floor 10',hint:'The crypt goes deep.',done:()=>S.deepest>=10,gold:100,prog:()=>[Math.min(10,S.deepest),10]},
  {id:'cb10',cat:'depths',t:'Reach combat level 10',hint:'Defeat monsters in the Depths.',done:()=>S.lvl>=10,prog:()=>[Math.min(10,S.lvl),10],gold:50},
  {id:'cb25',cat:'depths',t:'Reach combat level 25',hint:'Better blades help.',done:()=>S.lvl>=25,prog:()=>[Math.min(25,S.lvl),25],gold:200},
  {id:'kill100',cat:'depths',t:'Defeat 100 monsters',hint:'Every hit counts in a party.',...cn(()=>S.kills||0,100),gold:60},
  {id:'kill1k',cat:'depths',t:'Defeat 1,000 monsters',hint:'The Depths grow quiet when you visit.',...cn(()=>S.kills||0,1000),gold:300},
  {id:'chests',cat:'depths',t:'Open 25 chests',hint:'Chests hide in dead ends.',...cn(()=>C('chests'),25),gold:75},
  {id:'ore',cat:'depths',t:'Mine 200 ore',hint:'Hit the glinting rocks in the walls.',...cn(()=>C('ores'),200),gold:75},
  {id:'rare',cat:'depths',t:'Find a Rare lantern or cape',hint:'Chests and bosses drop them most.',done:()=>ownsRarity('rare'),gold:100},
  {id:'party',cat:'depths',t:'Delve with a party',hint:'Invite a friend from the Social button, then enter the Gate.',done:()=>!!S.flags.partied,gold:40},
  {id:'friend',cat:'hold',t:'Make a friend',hint:'Social button → Friends → add a name.',done:()=>!!S.flags.friend,gold:20},
  {id:'sell',cat:'hold',t:'Earn 5,000 gold at the Market',hint:'Sell what you don’t need at the Market Board.',...cn(()=>C('sold'),5000),gold:75},
  {id:'expand',cat:'hold',t:'Buy more bank space',hint:'At the Bank.',done:()=>S.bankBuys>=1,gold:50},
  {id:'rich',cat:'hold',t:'Hold 25,000 gold at once',hint:'Saving up for something?',done:()=>S.gold>=25000,prog:()=>[Math.min(25000,S.gold),25000],gold:250},
  // secrets: hidden until found
  {id:'konami',cat:'secret',t:'Old Habits',hint:'Up, up, and away… then down again. Left and right, twice.',gold:300,secret:true},
  {id:'night',cat:'secret',t:'Night Owl',hint:'The lake is quietest after midnight.',gold:150,secret:true},
  {id:'miss5',cat:'secret',t:'The One That Got Away',hint:'Some days the fish win. Again and again.',gold:77,secret:true},
  {id:'burnt',cat:'secret',t:'Chef’s Kiss',hint:'Practice makes… charcoal.',gold:99,secret:true,done:()=>C('burnt')>=25},
  {id:'dizzy',cat:'secret',t:'Dizzy',hint:'Round and round the lantern goes.',gold:111,secret:true},
  {id:'choir',cat:'secret',t:'Timber Choir',hint:'Three axes, one tree.',gold:150,secret:true},
  {id:'word',cat:'secret',t:'Speak, Friend',hint:'Say the name of this place aloud.',gold:50,secret:true},
  {id:'fall10',cat:'secret',t:'Persistence',hint:'Fall ten times. Rise ten times.',gold:100,secret:true,done:()=>(S.deaths||0)>=10},
  {id:'giver',cat:'secret',t:'Generous Soul',hint:'Leave something on the ground for a stranger.',gold:120,secret:true}];
const GOAL_BY=Object.fromEntries(GOALS.map(g=>[g.id,g]));
const goalsDone=()=>GOALS.filter(g=>S.goals[g.id]).length;
// Goal Relics: the only way to get them. Rolled on every goal completed; secrets roll ten times better.
const GOAL_RELICS=[['cape_wayfinder',1/600],['starlit_lantern',1/2000]];
function goalRelic(secretGoal){for(const [id,ch] of GOAL_RELICS){const has=(S.bank[id]||0)+(S.vault[id]||0)>0||S.gear.cape===ITEMS[id].cape||S.gear.lantern===ITEMS[id].lantern;
    if(has||rand()>=ch*(secretGoal?10:1)*(1+A('luck')/200))continue;give(S.vault,id,1);const R=RARITY[ITEMS[id].rarity];
    setTimeout(()=>{sfx('rare');buzz([60,40,60,40,120]);puff(P.x,P.y-10,R.c,40);toast('Goal Relic! '+ITEMS[id].n+' is waiting in your Bank','rare r-mythic');MP.feed('loot',ITEMS[id].n);},1800);return;}}
function completeGoal(g){if(!g||S.goals[g.id])return;S.goals[g.id]=1;S.gold+=g.gold;
  if(g.secret){toast('Secret found: '+g.t+' · +'+g.gold+' gold','rare r-xrare');sfx('rare');buzz([30,30,30]);puff(P.x,P.y-10,'#c77dff',18);}
  else{toast('Goal complete: '+g.t+' · +'+g.gold+' gold','good');sfx('coin');}
  goalRelic(!!g.secret);save();}
function secret(id){if(started&&S.goals&&!S.goals[id])completeGoal(GOAL_BY[id]);}
// first run of the new goals: anything already done counts, with a one-time gold catch-up (capped)
function migrateGoals(){if(S.flags.goalsv)return;S.flags.goalsv=true;let n=0,g0=0;
  for(const g of GOALS)if(g.done&&!S.goals[g.id]&&g.done()){S.goals[g.id]=1;n++;g0+=g.gold;}
  const pay=Math.min(1000,g0);S.gold+=pay;if(n)setTimeout(()=>toast(`Goals upgraded: ${n} already complete · +${pay} gold`,'good'),2500);save();}
function nextGoal(){for(const [c] of GOAL_CATS){if(c==='secret')continue;const g=GOALS.find(g=>g.cat===c&&!S.goals[g.id]);if(g)return g;}return null;}
let guideT=0;
function updateGuide(dt){guideT-=dt;if(guideT>0)return;guideT=.8;checkBankGrowth();const el=$('guide');
  if(!S.flags.goalsv)migrateGoals();
  if(MP.party&&scene==='delve'&&MP.shared())S.flags.partied=true;if(MP.friends&&MP.friends.friends&&MP.friends.friends.length)S.flags.friend=true;
  let k=0;for(const g of GOALS)if(!S.goals[g.id]&&g.done&&g.done()){completeGoal(g);if(++k>=2)break;}
  const nx=nextGoal(),d=goalsDone(),land=document.documentElement.classList.contains('land');
  const t=nx?(land?`Goals ${d}/${GOALS.length}`:`Goals ${d}/${GOALS.length} · ${nx.t}`):`Goals ${d}/${GOALS.length}`;el.hidden=false;if(el.textContent!==t)el.textContent=t;}
let goalTab='start';
function openGuide(tab){goalTab=tab||goalTab;const d=goalsDone();
  const list=GOALS.filter(g=>g.cat===goalTab).map(g=>{const ok=!!S.goals[g.id],hid=g.secret&&!ok,pr=!ok&&g.prog?g.prog():null;
    return `<li class="${ok?'done':''}${hid?' secret':''}"><b>${hid?'???':g.t}</b><small>${ok?'Done':g.hint} · +${g.gold} gold</small>${pr?`<i class="xpb"><i style="width:${Math.round(pr[0]/pr[1]*100)}%;background:#ffcd75"></i></i><small>${fmt(Math.floor(pr[0]))} / ${fmt(pr[1])}</small>`:''}</li>`;}).join('');
  const cnt=c=>{const a=GOALS.filter(g=>g.cat===c);return `${a.filter(g=>S.goals[g.id]).length}/${a.length}`;};
  openSheet(`<h2>Goals <small>${d}/${GOALS.length}</small></h2><p class="lead small">Finish them in any order for gold. Every goal also has a tiny chance to award a <b style="color:#ff77a8">Goal Relic</b>, something that exists nowhere else. Secrets have far better odds.</p>
    <div class="tabs">${GOAL_CATS.map(([k,l])=>`<button class="tab" aria-selected="${goalTab===k}" data-gt="${k}">${l} <small>${cnt(k)}</small></button>`).join('')}</div>
    <ol class="goals">${list}</ol><div class="row"><button class="btn" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;$('sheet').querySelectorAll('[data-gt]').forEach(b=>b.onclick=()=>openGuide(b.dataset.gt));}
// ---- secret inputs: a remembered direction sequence (keys or stick), and spinning on the spot ----
const SEQ=[];let seqLast=null,spinLog=[];
function secretInput(mx,my,l){const d=l>.5?(Math.abs(mx)>Math.abs(my)?(mx>0?'right':'left'):(my>0?'down':'up')):null;
  if(d!==seqLast){seqLast=d;if(d){const now=performance.now();SEQ.push([d,now]);if(SEQ.length>8)SEQ.shift();
      if(SEQ.length===8&&SEQ.map(x=>x[0]).join()==='up,up,down,down,left,right,left,right'&&now-SEQ[0][1]<6000)secret('konami');
      spinLog.push([d,now]);spinLog=spinLog.filter(x=>now-x[1]<4000);
      const ring=['up','right','down','left'];let turns=0,dirn=0;for(let i=1;i<spinLog.length;i++){const a=ring.indexOf(spinLog[i-1][0]),b=ring.indexOf(spinLog[i][0]),st=(b-a+4)%4;
        const s2=st===1?1:st===3?-1:0;if(s2&&(dirn===0||s2===dirn)){dirn=s2;turns++;}else{turns=s2?1:0;dirn=s2;}}
      if(turns>=12)secret('dizzy');}}}
$('guide').addEventListener('click',()=>{if(started)openGuide();});

// ---------- simulated town ----------
// ---------- update ----------
function update(dt){
  time+=dt;MP.tick(dt);
  if(paused&&!(scene==='delve'&&MP.shared()))return;
  // movement
  let mx=(keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0),my=(keys.ArrowDown||keys.KeyS?1:0)-(keys.ArrowUp||keys.KeyW?1:0);
  if(stick.on){mx=stick.x;my=stick.y;}
  if(paused){mx=0;my=0;aPressed=false;retHeld=false;}
  const l=Math.hypot(mx,my);if(l>1){mx/=l;my/=l;}if(started)secretInput(mx,my,l);
  P.moving=l>.15&&P.chan<=0;
  if(P.moving){const sp=(scene==='hold'?72:62)*dt*(1+A('spd')/100);moveBody(P,mx*sp,0,4);moveBody(P,0,my*sp,4);P.anim+=dt;
    if(P.swing<=0)P.dir=Math.abs(mx)>Math.abs(my)?(mx>0?'right':'left'):(my>0?'down':'up');}
  if(P.inv>0)P.inv-=dt;if(P.swingCD>0)P.swingCD-=dt;
  if(P.swing>0){P.swing-=dt;if(!P.hitDone&&P.swing<.14){P.hitDone=true;resolveSwing();}}
  // context
  const ctx=nearestAct();setActLabel(ctx);
  if(aPressed){aPressed=false;if(ctx)doAct(ctx);else if(scene==='delve')swing();}
  if(scene==='hold'){updateFishing(dt);updateChop(dt);updateDrops(dt);for(const o of HOLD.trees||[])if(o.shake>0)o.shake-=dt;}
  updateGuide(dt);
  if(scene==='delve'){
    // lantern
    const burn=(.5+.06*run.floor)*LAN().burn*(1-A('oil')/100);run.oil=Math.max(0,run.oil-burn*dt);
    if(A('regen')&&P.hp>0)P.hp=Math.min(maxHp(),P.hp+A('regen')*dt);
    if(run.oil<=0){run.shadeT-=dt;if(run.shadeT<=0){run.shadeT=5;const a=rand()*Math.PI*2;let sx=P.x+Math.cos(a)*70,sy=P.y+Math.sin(a)*70;
      for(let k=0;k<10&&blocked(sx,sy,4);k++){const b=rand()*Math.PI*2;sx=P.x+Math.cos(b)*60;sy=P.y+Math.sin(b)*60;}
      if(!blocked(sx,sy,4)){if(MP.client())NET.send({t:'shade',x:Math.round(sx),y:Math.round(sy)});else ents.push(makeEnemy('shade',sx,sy,1+.1*run.floor));toast('A Shade stirs in the dark','bad');}}}
    // return flame
    if(retHeld&&P.hp>0){P.chan+=dt;if(P.chan>=2){retHeld=false;returnHome();return;}}else P.chan=0;
    updateEnemies(dt);
    updateDrops(dt);
  }
  for(const f of fx){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=90*dt;}fx=fx.filter(f=>f.t<f.life);
  for(const t of texts)t.t+=dt;texts=texts.filter(t=>t.t<.9);
  if(shake>0)shake=Math.max(0,shake-dt*12);
  updateHud();
}
function updateEnemies(dt){
  if(MP.client())return followEnemies(dt);
  for(const e of ents){if(e.dead)continue;e.t+=dt;if(e.flash>0)e.flash-=dt;
    e.kb.x*=.82;e.kb.y*=.82;moveBody(e,e.kb.x*dt,e.kb.y*dt,e.r>6?8:4);
    const TG=nearestTarget(e),dx=TG.x-e.x,dy=TG.y-e.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,sp=e.d.spd;let vx=0,vy=0;
    e.losT=(e.losT||0)-dt;if(e.losT<=0){e.losT=.25;e.los=d<(e.d.boss?400:130)&&lineOfSight(e.x,e.y-6,TG.x,TG.y-6);if(e.los)e.mem=3;}
    e.mem=(e.mem||0)-dt;const sees=e.d.ai==='flutter'?d<130:(e.los||e.mem>0);
    switch(e.d.ai){
      case 'hop':e.cd-=dt;if(e.st==='hop'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=.6+rand()*.5;}}else if(e.cd<=0&&sees){e.st='hop';e.cd=.35;e.vx=ux*sp*2.4;e.vy=uy*sp*2.4;}break;
      case 'flutter':if(sees){vx=ux*sp+Math.cos(e.t*6)*uy*30;vy=uy*sp-Math.cos(e.t*6)*ux*30;}else{vx=Math.cos(e.t)*15;vy=Math.sin(e.t*1.3)*15;}break;
      case 'chase':case 'float':if(sees){vx=ux*sp;vy=uy*sp+(e.d.ai==='float'?Math.sin(e.t*3)*12:0);}break;
      case 'lunge':e.cd-=dt;if(e.st==='wind'){if(e.cd<=0){e.st='lunge';e.cd=.28;e.vx=ux*sp*4;e.vy=uy*sp*4;}}
        else if(e.st==='lunge'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=1.2;}}
        else if(sees){vx=ux*sp;vy=uy*sp;if(d<44&&e.cd<=0){e.st='wind';e.cd=.4;e.flash=.4;}}break;
      case 'dash':e.cd-=dt;if(e.st==='dash'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=.7+rand()*.4;}}else if(sees&&e.cd<=0){e.st='dash';e.cd=.4;e.vx=ux*sp*2;e.vy=uy*sp*2;}break;
      case 'mother':{e.cd-=dt;e.sp=(e.sp||4.5)-dt;const fast=e.hp<e.max/2;
        if(e.st==='hop'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=fast?.6:1;shake=!SET.shake?0:2;}}else if(e.cd<=0){e.st='hop';e.cd=.5;e.vx=ux*sp*3;e.vy=uy*sp*3;}
        if(e.sp<=0){e.sp=fast?3.2:4.5;if(ents.filter(o=>o.type==='gelling'&&!o.dead).length<6)for(let i=0;i<2;i++){ents.push(makeEnemy('gelling',e.x+(i?14:-14),e.y,e.dmgSc));}puff(e.x,e.y-10,'#a7f070',8);}break;}
      case 'knight':{e.cd-=dt;e.sm=(e.sm||8)-dt;
        if(e.st==='wind'){if(e.cd<=0){e.st='charge';e.cd=.6;e.vx=ux*sp*4.2;e.vy=uy*sp*4.2;}}
        else if(e.st==='charge'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=2.6;}}
        else{vx=ux*sp;vy=uy*sp;if(e.cd<=0&&d<160){e.st='wind';e.cd=.6;e.flash=.6;}}
        if(e.sm<=0){e.sm=9;if(ents.filter(o=>o.type==='skeleton'&&!o.dead).length<4)for(let i=0;i<2;i++)ents.push(makeEnemy('skeleton',e.x+(i?18:-18),e.y+6,e.dmgSc));puff(e.x,e.y-12,'#d8c8a0',10);}break;}
    }
    if(e.side>0){e.side-=dt;const px=-vy,py=vx;vx=vx*.3+px*e.sd;vy=vy*.3+py*e.sd;}
    const ox=e.x,oy=e.y;moveBody(e,vx*dt,vy*dt,e.r>6?8:4);
    if((vx||vy)&&Math.hypot(e.x-ox,e.y-oy)<Math.hypot(vx,vy)*dt*.2&&!(e.side>0)){e.side=.5;e.sd=rand()<.5?1:-1;}
    // contact
    let dmg=e.d.dmg*(1+.08*(e.dmgSc-1)/.12);if(e.st==='charge')dmg*=1.4;const cd=Math.hypot(P.x-e.x,(P.y-4)-(e.y-e.r));if(cd<e.r+6)hurtPlayer(dmg,e);if(OTH.size)MP.contact(e,dmg);
  }
  ents=ents.filter(e=>!e.dead);
}

// ---------- HUD ----------
let lastAct=null;
function setActLabel(a){const lab=a?a.label:(scene==='delve'?'Attack':'');if(lab!==lastAct){lastAct=lab;$('bAl').textContent=lab;$('bA').classList.toggle('ctx',!!a);$('bA').classList.toggle('idle',!lab);}}
const PT=['hpTxt','oilTxt','packN'];
let quickKey='';
function updateQuick(force){const key=S.quick.join(',')+'|'+S.quick.map(id=>id?S.bank[id]||0:'').join(',')+'|'+scene+'|'+(force?Math.random():'');if(key===quickKey)return;quickKey=key;
  $('quick').innerHTML=S.quick.map((id,i)=>{const n=id?S.bank[id]||0:0;return `<button class="qs ${id&&!n?'empty':''}" data-q="${i}" aria-label="Quick slot ${i+1}${id?': '+ITEMS[id].n+', '+n:' (empty)'}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:'<b>+</b>'}${id?`<span class="cnt"><canvas class="pt"></canvas></span>`:''}<i>${i+1}</i></button>`;}).join('');
  $('quick').querySelectorAll('.qs').forEach(b=>{const i=+b.dataset.q,id=S.quick[i];const c=b.querySelector('canvas');if(c)ptSet(c,S.bank[id]||0,{font:'small',px:9,color:'#ffcd75'});
    b.addEventListener('pointerdown',e=>{e.preventDefault();useQuick(i);});});}
function updateHud(force){
  if(force)PT.forEach(id=>{const e=$(id);if(e)e._pt=null;});
  const mh=maxHp();$('hpFill').style.width=Math.max(0,Math.min(1,P.hp/mh)*100)+'%';ptSet($('hpTxt'),Math.max(0,Math.ceil(P.hp))+'/'+mh,{font:'small',px:7});
  $('lvl').textContent='Lv '+S.lvl;{const lk=JSON.stringify(myLook());if(lk!==updateHud.lk){updateHud.lk=lk;heroIcon();}}
  $('where').textContent=scene==='hold'?'The Hold'+(MP.room&&MP.room[0]==='w'?(NET.roomOpen()?' · World '+MP.room.slice(1):' · reconnecting…'):netOn()?' · connecting…':''):'F'+run.floor+' · '+BIOMES[map.biome].name+(MP.shared()?' · party':'');
  {const sb=$('socB');if(sb)sb.classList.toggle('off',!!MP.id&&netOn()&&!NET.roomOpen());}
  const dv=scene==='delve';$('oilRow').hidden=!dv;$('bRet').hidden=!dv;$('feed').hidden=dv;updateQuick(force);
  if(dv){$('oilFill').style.width=run.oil+'%';$('oilFill').classList.toggle('low',run.oil<25);ptSet($('oilTxt'),Math.ceil(run.oil)+'%',{font:'small',px:7});
    
    const pn=Object.values(run.pack).reduce((a,b)=>a+b,0);$('packW').hidden=!pn;ptSet($('packN'),pn,{font:'small',px:9,color:'#c2d3e0'});
    $('retRing').style.setProperty('--p',Math.min(1,P.chan/2));}else $('packW').hidden=true;
}

// ---------- render ----------
function spr(img,x,y){g.drawImage(img,Math.round(x),Math.round(y));}
function render(){
  g.setTransform(1,0,0,1,0,0);g.fillStyle=scene==='hold'?'#1a1c2c':'#0b0c14';g.fillRect(0,0,VW,VH);
  const mw=map.w*T,mh=map.h*T;let cx=Math.round(P.x-VW/2),cy=Math.round(P.y-8-VH/2);
  cx=mw<VW?Math.round((mw-VW)/2):Math.max(0,Math.min(mw-VW,cx));cy=mh<VH?Math.round((mh-VH)/2):Math.max(0,Math.min(mh-VH,cy));
  if(shake>0){cx+=Math.round((rand()-.5)*shake*2);cy+=Math.round((rand()-.5)*shake*2);}
  camX=cx;camY=cy;g.save();g.translate(-cx,-cy);
  g.drawImage(map.ground,0,0);
  const x0=Math.floor(cx/T),y0=Math.floor(cy/T),x1=Math.ceil((cx+VW)/T),y1=Math.ceil((cy+VH)/T),wf=Math.floor(time*2)%2;
  if(scene==='hold'){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(tAt(map,x,y)===WATER)g.drawImage(ART.water[(wf+x)%2],x*T,y*T);
    for(const p of map.plots){const st=S.plots[p.i];if(!st)continue;const gr=growth(st),stg=gr>=1?2:gr>=.5?1:0;spr(ART.crop[st.crop][stg],p.cx-8,p.cy-10);
      if(gr>=1&&Math.floor(time*3)%2)g.fillStyle='#f4f4f4',g.fillRect(p.cx+5,p.cy-12,1,1);
      else if(gr<1){g.fillStyle='#1a1c2c';g.fillRect(p.cx-8,p.cy+6,16,2);g.fillStyle='#a7f070';g.fillRect(p.cx-8,p.cy+6,Math.round(16*gr),2);}}}
  const vis=o=>o.x>cx-60&&o.x<cx+VW+60&&o.y>cy-20&&o.y<cy+VH+70;
  for(const o of map.objs){if(!o.flat||!vis(o))continue;if(o.type==='flowers')spr(ART.flowers[o.v],o.x-8,o.y-15);else if(o.type==='bones')spr(ART.bones,o.x-8,o.y-15);}
  for(const o of map.objs){if(!o.onWall||o.gone||!vis(o))continue;const [tx,ty]=o.tile;
    if(o.type==='ore'){if(o.kind==='ember'){spr(ART.emberOre[Math.floor(time*2.5+tx)%2],tx*T,ty*T);for(let k=0;k<2;k++){const ph=(time*.7+k*.5+tx*.37)%1;g.fillStyle=ph<.5?'#ffcd75':'#ff9f3d';g.globalAlpha=1-ph;g.fillRect(Math.round(tx*T+5+k*6+Math.sin(time*3+k+tx)*1.5),Math.round(ty*T+6-ph*10),1,1);}g.globalAlpha=1;}else spr(ART.ore[o.kind],tx*T,ty*T);}else if(o.type==='torch')spr(ART.torch[Math.floor(time*6+tx)%2],tx*T+4,ty*T+2);}
  // y-sorted
  const list=[];
  for(const o of map.objs)if(!o.flat&&!o.onWall&&!o.gone&&vis(o))list.push({y:o.y,f:()=>drawObj(o)});
  for(const e of ents)list.push({y:e.y,f:()=>drawEnemy(e)});
  for(const o of OTH.values())list.push({y:o.y,f:()=>{drawHero(o.x,o.y,o.dir,o.moving,o.anim,o.look,o.name,o);if(o.fish&&scene==='hold')drawFishing(o.fish,o.x,o.y);if(o.chopT>0&&scene==='hold')drawAxe(o.x,o.y,o.dir,time*1.18);}});
  for(const d of drops)if(dropShown(d))list.push({y:d.y,f:()=>{const b=Math.sin(d.t*6)*1;const R=rc(d.id);if(R){g.globalAlpha=.28+.12*Math.sin(time*4);g.fillStyle=R.c;g.fillRect(Math.round(d.x-1),Math.round(d.y-44),3,40);g.globalAlpha=.5;g.fillRect(Math.round(d.x-4),Math.round(d.y-1),9,2);g.globalAlpha=1;}g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(d.x-3),Math.round(d.y),6,1);spr(iconOf(d.id),d.x-8,d.y-14-d.z+b);}});
  list.push({y:P.y,f:drawPlayer});
  list.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  for(const f of fx){g.fillStyle=f.col;g.fillRect(Math.round(f.x),Math.round(f.y),1,1);}
  g.restore();
  if(scene==='delve')drawLight(cx,cy);
  g.save();g.translate(-cx,-cy);
  for(const t of texts){ptDraw(g,t.txt,t.x,Math.round(t.y-t.t*14)-6,{color:t.col});}
  // boss bar
  g.restore();
  const boss=ents.find(e=>e.d.boss);if(boss){const dpr=window.devicePixelRatio||1,w=Math.min(140,VW-24),x=(VW-w)/2,y=Math.round(($('vit').getBoundingClientRect().bottom+30)*dpr/SCALE);g.fillStyle='#1a1c2c';g.fillRect(x-1,y-1,w+2,6);g.fillStyle='#5d275d';g.fillRect(x,y,w,4);g.fillStyle='#b13e53';g.fillRect(x,y,Math.round(w*boss.hp/boss.max),4);
    ptDraw(g,map.pack.bossName,VW/2,y-9,{color:'#f4f4f4'});}
  if(P.chan>0){g.fillStyle='rgba(255,205,117,'+(.15+.25*P.chan/2)+')';g.fillRect(0,0,VW,VH);}
}
function drawObj(o){
  if(o.type==='tree'){if(o.chop&&!treeUp(o))spr(ART.stump,o.x-16,o.y-30);else{const k=o.shake>0?Math.round(Math.sin(time*60)):0;spr(ART.tree,o.x-16+k,o.y-30);
    if(o.chop&&(CHOP&&CHOP.o===o||o.shake>0)&&o.logs<TREES[o.kind].logs){const w=Math.round(20*o.logs/TREES[o.kind].logs);g.fillStyle='rgba(26,28,44,.8)';g.fillRect(o.x-11,o.y-34,22,4);g.fillStyle='#d9a066';g.fillRect(o.x-10,o.y-33,w,2);}}}
  else if(o.type==='house')spr(ART.house,o.x-24,o.y-48);
  else if(o.type==='bank')spr(ART.bank,o.x-24,o.y-48);
  else if(o.type==='forge')spr(ART.forge[Math.floor(time*4)%2],o.x-24,o.y-40);
  else if(o.type==='kitchen')spr(ART.kitchen[Math.floor(time*3)%2],o.x-16,o.y-32);
  else if(o.type==='press')spr(ART.press,o.x-16,o.y-32);
  else if(o.type==='board')spr(ART.board,o.x-16,o.y-32);
  else if(o.type==='gate')spr(ART.gate,o.x-24,o.y-40);
  else if(o.type==='well')spr(ART.well,o.x-16,o.y-32);
  else if(o.type==='fence')spr(ART.fence,o.x-8,o.y-14);
  else if(o.type==='chest')spr(ART.chest[o.open?1:0],o.x-8,o.y-14);
  else if(o.type==='glowcap')spr(ART.glowcap,o.x-8,o.y-15);
}
function drawAura(x,y,cols,seed){const t=time+seed,X=Math.round(x),Y=Math.round(y);
  g.save();const k=1/Math.sqrt(cols.length);
  cols.forEach((c,ci)=>{const pulse=.5+.5*Math.sin(t*3+ci*2);
    g.globalAlpha=(.26+.1*pulse)*k;g.fillStyle=c;g.beginPath();g.ellipse(X,Y-8,10,13,0,0,Math.PI*2);g.fill();
    g.globalAlpha=(.55+.2*pulse)*k;g.beginPath();g.ellipse(X,Y,12,4,0,0,Math.PI*2);g.fill();});
  g.restore();
  // a pixel ring at the feet that slowly turns
  cols.forEach((c,ci)=>{g.fillStyle=c;for(let k=0;k<14;k++){const a=k/14*Math.PI*2+t*(ci%2?-1.2:1.2);g.globalAlpha=.55+.45*Math.sin(a*2+t*4);g.fillRect(Math.round(X+Math.cos(a)*12),Math.round(Y+Math.sin(a)*4),1,1);}});
  // sparkles drifting up
  for(let i=0;i<14;i++){const c=cols[i%cols.length],ph=(t*.6+i/14)%1,ang=i*2.4+t*.9,px=X+Math.sin(ang)*(5+4*Math.sin(i*1.7)),py=Y-2-ph*28;
    g.globalAlpha=Math.max(0,1-ph);g.fillStyle=ph<.2?'#ffffff':c;g.fillRect(Math.round(px),Math.round(py),1,1);if(i%2===0){g.fillRect(Math.round(px),Math.round(py)-1,1,1);g.fillRect(Math.round(px)-1,Math.round(py),1,1);}}
  g.globalAlpha=1;}
function drawHero(x,y,dir,moving,anim,look,name,npc,me){
  const fr=moving?1+Math.floor(anim*8)%2:0,img=heroImg(look,dir,fr);
  const au=look?auraColors(look,me?S.gear.lantern:look.lan||null):[];if(au.length)drawAura(x,y,au,(npc?npc.name.length:0));
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(Math.round(x-4),Math.round(y),8,1);
  const cb=look&&look.cape?capeLayer(look.cape,dir,moving?fr:0,false):null;if(cb)spr(cb,x-10,y-17);
  spr(img,x-8,y-15);
  const cf=look&&look.cape?capeLayer(look.cape,dir,moving?fr:0,true):null;if(cf)spr(cf,x-10,y-17);if(look&&ADMIN_HATS[look.helm])spr(ART[look.helm],x-5,y-25);
  if(name&&(me||SET.names))ptDraw(g,name,x,y-(look&&ADMIN_HATS[look.helm]?34:24),{color:me?'#ffcd75':'#c2d3e0',bg:'rgba(26,28,44,.6)'});
  if(npc&&npc.sayT>0)ptDraw(g,npc.say,x,y-34,{color:'#1a1c2c',shadow:null,bg:'#f4f4f4'});
}
function drawPlayer(){
  if(P.inv>0&&Math.floor(P.inv*20)%2)return;
  const look=myLook(),d=P.dir,lan=ART.lantern[S.gear.lantern]||ART.lantern.basic;
  const lx=d==='left'?-9:d==='right'?4:d==='up'?3:-9,ly=-9;
  if(d==='up')spr(lan,P.x+lx,P.y+ly);
  if(P.swing>0&&(d==='up'||d==='left'))drawSwing();
  drawHero(P.x,P.y,d,P.moving,P.anim,look,scene==='hold'&&S.name?S.name:null,null,true);
  if(P.say&&time<P.sayUntil)ptDraw(g,P.say.length>26?P.say.slice(0,25)+'...':P.say,P.x,P.y-(ADMIN_HATS[S.gear.helm]?(scene==='hold'?44:34):(scene==='hold'?34:24)),{color:'#1a1c2c',shadow:null,bg:'#f4f4f4'});
  if(d!=='up'&&scene!=='hold')spr(lan,P.x+lx,P.y+ly+Math.round(Math.sin(time*5)));
  if(P.swing>0&&!(d==='up'||d==='left'))drawSwing();
  drawFishing();if(CHOP)drawAxe(P.x,P.y,P.dir,CHOP.sw/.85);
}
function drawSwing(){const t=1-P.swing/.2,base={down:Math.PI*.5,up:-Math.PI*.5,left:Math.PI,right:0}[P.dir],a=base-1.2+t*2.4;
  const sw=ART.sword[S.gear.blade];g.save();g.translate(Math.round(P.x),Math.round(P.y-6));g.rotate(a+Math.PI/4);g.drawImage(sw,-2,-14);g.restore();
  g.strokeStyle='rgba(244,244,244,'+(1-t)*.8+')';g.lineWidth=1;g.beginPath();g.arc(Math.round(P.x),Math.round(P.y-6),13,base-1.2,a);g.stroke();}
function drawEnemy(e){const a=ART[e.d.art],fr=Math.floor(e.t*4)%2,img=a[fr],big=e.d.big;
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(e.x-(big?10:4)),Math.round(e.y),big?20:8,1);
  const ox=big?16:8,oy=big?31:15;
  if(e.flash>0&&Math.floor(e.flash*30)%2){g.save();g.filter='brightness(3)';spr(img,e.x-ox,e.y-oy);g.restore();}else spr(img,e.x-ox,e.y-oy);
  if(!e.d.boss&&e.hp<e.max){g.fillStyle='#1a1c2c';g.fillRect(Math.round(e.x-6),Math.round(e.y-oy-4),12,2);g.fillStyle='#b13e53';g.fillRect(Math.round(e.x-6),Math.round(e.y-oy-4),Math.round(12*e.hp/e.max),2);}
}
function drawLight(cx,cy){
  lg.globalCompositeOperation='source-over';lg.globalAlpha=1;lg.fillStyle=run.oil>0?'rgba(5,6,13,.9)':'rgba(3,3,8,.97)';lg.fillRect(0,0,VW,VH);
  lg.globalCompositeOperation='destination-out';
  const hole=(x,y,r)=>{for(const [f,a] of [[1,.3],[.84,.55],[.68,.8],[.5,1]]){lg.globalAlpha=a;lg.beginPath();lg.arc(Math.round(x-cx),Math.round(y-cy),Math.max(1,r*f),0,Math.PI*2);lg.fill();}};
  const flick=Math.sin(time*9)*1.5+Math.sin(time*23)*.8;
  hole(P.x,P.y-8,(22+70*(run.oil/100))*LAN().light*(1+A('light')/100)+flick);
  for(const o of map.objs){if(!o.light||o.gone)continue;if(Math.abs(o.x-P.x)>VW||Math.abs(o.y-P.y)>VH)continue;
    const yy=o.onWall?o.tile[1]*T+6:o.y-6;hole(o.x,yy,o.light.r+(o.light.c==='warm'?Math.sin(time*7+o.x)*2:o.light.c==='lava'?Math.sin(time*2.5+o.x)*2.5:0));}
  for(const e of ents)if(e.d.light)hole(e.x,e.y-8,22);
  for(const o of OTH.values())hole(o.x,o.y-8,46+Math.sin(time*9+o.x)*1.5);
  if(auraColors(myLook(),S.gear.lantern).length)hole(P.x,P.y-6,26+Math.sin(time*3)*2);
  if(map.stairs&&!map.stairs.hidden)hole(map.stairs.tx*T+8,map.stairs.ty*T+8,26);
  lg.globalAlpha=1;lg.globalCompositeOperation='source-over';
  g.drawImage(light,0,0);
  // warm tint around light sources
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.08;g.fillStyle='#ef7d57';
  for(const o of map.objs){if(o.light&&o.light.c==='lava'&&!o.gone&&Math.abs(o.x-P.x)<VW){const yy=o.tile[1]*T+8,pu=.5+.5*Math.sin(time*2.5+o.x);const X=Math.round(o.x-cx),Y=Math.round(yy-cy),R=16+pu*4,gr=g.createRadialGradient(X,Y,0,X,Y,R);gr.addColorStop(0,'rgba(255,110,40,'+(.32+.16*pu)+')');gr.addColorStop(.5,'rgba(255,80,30,'+(.12+.06*pu)+')');gr.addColorStop(1,'rgba(255,60,20,0)');g.globalAlpha=1;g.fillStyle=gr;g.fillRect(X-R,Y-R,R*2,R*2);g.globalAlpha=.08;g.fillStyle='#ef7d57';}}
  for(const o of map.objs){if(o.light&&o.light.c==='warm'&&!o.gone){const yy=o.onWall?o.tile[1]*T+6:o.y-6;g.beginPath();g.arc(Math.round(o.x-cx),Math.round(yy-cy),o.light.r*.6,0,Math.PI*2);g.fill();}}
  g.fillStyle='#ffcd75';g.beginPath();g.arc(Math.round(P.x-cx),Math.round(P.y-8-cy),10+40*run.oil/100,0,Math.PI*2);g.fill();g.restore();
}

// ---------- loop ----------
// ===================== MULTIPLAYER (Season 0) =====================
// Other players (OTH) arrive through the realtime server (net.js). In a dungeon instance one player is the host:
// their game runs the monsters and sends snapshots; everyone else follows them and sends their hits to the host.
// Loot goes to whoever dealt the most damage; XP goes to everyone who hit. Without the realtime server the game runs solo.
const OTH=new Map();
const MP={id:null,room:null,host:null,party:null,online:0,status:new Map(),friends:null,nextEid:1,sent:'',lookKey:'',lookT:0,sendT:0,enT:0,chatLog:[],chatCb:null,invites:[],prompt:null,wantWorld:null};
const netOn=()=>!!(window.NET&&NET.live());
MP.me=()=>MP.id||'me';
MP.inInst=()=>!!(MP.room&&MP.room[0]==='d');
MP.shared=()=>MP.inInst()&&OTH.size>0;
MP.client=()=>MP.inInst()&&!!MP.host&&MP.host!==MP.id;          // someone else runs the monsters
MP.isLeader=()=>!MP.party||MP.party.leader===MP.id;
MP.feed=(k,a)=>{if(netOn())NET.lsend({t:'feed',k,a});};
MP.toHold=()=>{if(!netOn())return;if(MP.inInst()||NET.room()&&NET.room()[0]==='d')NET.leave();MP.room=null;MP.host=null;OTH.clear();
  if(NET.lobbyOpen()||NET.live())NET.lsend({t:'world',want:MP.wantWorld||undefined});MP.wantWorld=null;};
MP.floorEntered=f=>{if(netOn()&&MP.inInst())NET.lsend({t:'where',room:MP.room,floor:f});};
// ---- starting a delve ----
MP.delve=floor=>{if(!netOn()||!NET.lobbyOpen())return startDelve(floor);closeSheet();toast('Opening the way…');NET.lsend({t:'delve',floor});};
MP.enterInst=(room,floor,seed)=>{closeSheet();MP.prompt=null;hidePrompt();if(scene==='delve')NET.leave();OTH.clear();MP.room=null;MP.host=null;startDelve(floor,seed);NET.join(room);};
MP.gateMember=()=>{const p=MP.party,lead=(p.members.find(m=>m.id===p.leader)||{}).name||'Your leader';
  openSheet(`<h2>The Delve Gate</h2><p class="lead">You’re in <b>${chatEsc(lead)}</b>’s party. The party leader opens the way, and the whole party shares one dungeon.</p>
  ${p.inst?`<button class="btn big" id="jp">Join your party on floor ${p.inst.floor}</button>`:'<p class="lead small">When your leader enters the Depths, you’ll be asked to join.</p>'}
  <div class="row"><button class="btn alt" id="lv">Leave party &amp; delve alone</button><button class="btn alt" id="sx">Not yet</button></div>`);
  $('sx').onclick=closeSheet;if($('jp'))$('jp').onclick=()=>MP.enterInst(p.inst.room,p.inst.floor,p.inst.seed);$('lv').onclick=()=>{NET.lsend({t:'leave'});closeSheet();setTimeout(openGate,400);};};
// ---- shared objects (chests, glowcaps, ore): the host decides who gets them ----
function objTaken(o,by){const mine=by===MP.me();
  if(o.type==='chest'){o.open=true;o.act=null;if(mine){sfx('chest');bump('chests');const f=run.floor;spawnLoot(o.x,o.y-4,[['gold',1,6+f*3,14+f*5],[map.pack.ore+'_ore',.8,1,3],['lampseed',.35,1,1],['gem',.2,1,1],['oil',.3,1,1],['glowcap_spore',.25,1,2]]);dropGear(o.x,o.y-4,'chest');}puff(o.x,o.y-6,'#ffcd75',10);}
  else if(o.type==='glowcap'){o.gone=true;o.light=null;o.act=null;if(mine)spawnLoot(o.x,o.y-4,[['glowcap_spore',1,1,2]]);puff(o.x,o.y-4,'#e86fd0',8);}
  else if(o.type==='ore'){o.gone=true;const ox=o.tile[0]*T,oy=o.tile[1]*T;if(mine){bump('ores');spawnLoot(ox+8,oy+20,[[o.kind+'_ore',1,2,3],['gem',.06,1,1]]);}puff(ox+8,oy+12,'#ffcd75',10);}}
function mineOre(o,i,who){if(o.gone)return;o.hp--;if(o.hp<=0){objTaken(o,who);MP.objOut(i,o,who);}else MP.objOut(i,o,null);}
MP.objOut=(i,o,by)=>{if(MP.shared())NET.send({t:'obj',o:i,open:o.open?1:0,gone:o.gone?1:0,hp:o.hp,by});};
function applyHit(e,d,a,who){e.hp-=d;e.dmgBy=e.dmgBy||{};e.dmgBy[who]=(e.dmgBy[who]||0)+d;e.flash=.12;const kk=e.d.boss?40:150;e.kb={x:Math.cos(a)*kk,y:Math.sin(a)*kk};if(e.hp<=0)killEnemy(e);}
function nearestTarget(e){let best={x:P.x,y:P.y},bd=Math.hypot(P.x-e.x,P.y-e.y);for(const o of OTH.values()){const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<bd){bd=d;best=o;}}return best;}
MP.contact=(e,dmg)=>{const now=performance.now();e.hc=e.hc||{};for(const o of OTH.values()){if(Math.hypot(o.x-e.x,(o.y-4)-(e.y-e.r))<e.r+6&&now-(e.hc[o.id]||0)>700){e.hc[o.id]=now;NET.send({t:'hurt',to:o.id,d:Math.round(dmg),x:Math.round(e.x),y:Math.round(e.y)});}}};
MP.askDown=()=>{const h=OTH.get(MP.host);toast((h?h.name:'Your host')+' leads the way down. Wait at the stairs.');if(!MP.downT||time-MP.downT>4){MP.downT=time;NET.send({t:'down'});}};
MP.floorOut=f=>{if(MP.shared())NET.send({t:'floor',f});};
// followers: monsters come from the host's snapshots and glide to their new spots
function followEnemies(dt){for(const e of ents){e.t+=dt;if(e.flash>0)e.flash-=dt;if(e.tx!=null){const k=Math.min(1,dt*12);e.x+=(e.tx-e.x)*k;e.y+=(e.ty-e.y)*k;}}ents=ents.filter(e=>!e.dead);}
// ---- per-frame: send my position (10x a second at most, only when it changed), glide other players, host sends monsters ----
MP.tick=dt=>{
  for(const o of OTH.values()){const k=Math.min(1,dt*10),dx=o.tx-o.x,dy=o.ty-o.y;if(Math.abs(dx)>80||Math.abs(dy)>80){o.x=o.tx;o.y=o.ty;}else{o.x+=dx*k;o.y+=dy*k;}
    if(o.moving)o.anim+=dt;if(o.sayT>0)o.sayT-=dt;if(o.fish)o.fish.t+=dt;if(o.chopT>0)o.chopT-=dt;}
  if(!netOn()||!NET.roomOpen()||!MP.room)return;
  MP.sendT-=dt;if(MP.sendT<=0){MP.sendT=.1;const key=Math.round(P.x)+','+Math.round(P.y)+','+P.dir+','+(P.moving?1:0);if(key!==MP.sent){MP.sent=key;NET.send({t:'s',x:Math.round(P.x*10)/10,y:Math.round(P.y*10)/10,d:P.dir,m:P.moving});}}
  {const f=FISHING&&scene==='hold'?{d:FISHING.dir,ph:FISHING.phase,bx:Math.round(FISHING.bx),by:Math.round(FISHING.by)}:null,k=f?f.d+f.ph+f.bx+','+f.by:'';if(k!==MP.fishKey){MP.fishKey=k;NET.send({t:'fish',f});}}
  MP.lookT-=dt;if(MP.lookT<=0){MP.lookT=1;const l=Object.assign({},myLook(),{lan:S.gear.lantern,blade:S.gear.blade}),k=JSON.stringify(l);if(k!==MP.lookKey){MP.lookKey=k;NET.send({t:'look',look:l});}}
  if(scene==='delve'&&MP.inInst()&&MP.host===MP.id&&OTH.size){MP.enT-=dt;if(MP.enT<=0){MP.enT=.1;
    NET.send({t:'en',f:run.floor,e:ents.filter(e=>!e.dead).map(e=>[e.id,e.type,Math.round(e.x),Math.round(e.y),Math.max(0,Math.round(e.hp)),e.max,e.flash>0?1:0,Math.round(e.dmgSc*100)])});}}
};
const fishOf=f=>f?{dir:f.d,phase:f.ph,bx:f.bx,by:f.by,t:0}:null;
function addOther(p){if(p.id===MP.id)return;const o=OTH.get(p.id)||{id:p.id,anim:0,sayT:0,say:''};Object.assign(o,{name:p.name,look:p.look||DEFAULT_LOOK,dir:p.d||'down',moving:!!p.m,fish:fishOf(p.fish)});
  if(o.x==null||!OTH.has(p.id)){o.x=o.tx=p.x||(map.spawn?map.spawn.x:0);o.y=o.ty=p.y||(map.spawn?map.spawn.y:0);}OTH.set(p.id,o);}
// ---- lobby messages ----
if(window.NET){
  NET.onL('hello',m=>{MP.id=m.you;MP.online=m.online;MP.party=m.party;if(MP.room)NET.lsend({t:'where',room:MP.room,floor:MP.inInst()&&run?run.floor:undefined});else if(scene==='hold')MP.toHold();MP.loadFriends();refreshSocial();});
  NET.onL('off',()=>{});
  NET.onL('world',m=>{if(scene==='hold')NET.join(m.room);});
  NET.onL('online',m=>{MP.online=m.n;refreshSocial();});
  NET.onL('status',m=>{for(const s of m.list)MP.status.set(s.id,s);refreshSocial();});
  NET.onL('party',m=>{const had=!!MP.party;MP.party=m.party;refreshSocial();if(!m.party&&had&&MP.inInst()&&MP.host!==MP.id){} });
  NET.onL('invited',m=>{MP.invites=MP.invites.filter(i=>i.from!==m.from);MP.invites.push({from:m.from,name:m.name,at:Date.now()});showPrompt();sfx('rare');buzz(40);});
  NET.onL('note',m=>toast(m.text,m.bad?'bad':''));
  NET.onL('go',m=>MP.enterInst(m.room,m.floor,m.seed));
  NET.onL('partyDelve',m=>{if(scene==='hold'){MP.prompt={kind:'delve',room:m.room,floor:m.floor,seed:m.seed,by:m.by};showPrompt();sfx('rare');}else toast(m.by+' led the party into floor '+m.floor+'. Head home to join them.');});
  NET.onL('pchat',m=>{const msg={id:'p'+Date.now()+Math.random(),name:m.name,text:m.text,at:Date.now(),party:true,me:m.id===MP.id};MP.chatLog.push(msg);if(MP.chatCb)MP.chatCb([msg]);});
  NET.onL('feed',m=>{if(!SET.feed)return;const f=$('feed');f.textContent='★ '+m.text;f.classList.add('real');clearTimeout(MP.feedT);MP.feedT=setTimeout(()=>{f.textContent='';},9000);});
  NET.onL('nudge',m=>{if(m.k==='friend'){MP.loadFriends();toast(m.from+' sent you a friend request','good');}});
  NET.onL('kicked',m=>{OTH.clear();MP.room=null;openSheet(`<h2>Signed in elsewhere</h2><p class="lead">${chatEsc(m.reason)} Only one device can play a hero at a time.</p><div class="row"><button class="btn" id="rl">Play here instead</button></div>`);$('rl').onclick=()=>location.reload();});
  // ---- room messages ----
  NET.onR('hi',m=>{MP.room=m.room;MP.host=m.host;OTH.clear();for(const p of m.players)addOther(p);syncDrops(m.drops||[]);if(m.trees&&HOLD.trees){for(const o of HOLD.trees){o.until=0;o.logs=TREES[o.kind].logs;}for(const [i,left,wait] of m.trees){const o=HOLD.trees[i];if(o){o.logs=left;o.until=wait>0?Date.now()+wait:0;}}}MP.sent='';MP.lookKey='';MP.fishKey='';MP.sendT=0;MP.lookT=0;
    MP.chatLog=(m.chat||[]).map(c=>({id:m.room+':'+c.n,name:c.name,text:c.text,at:c.at,me:c.id===MP.id}));if(MP.chatCb)MP.chatCb(MP.chatLog);
    NET.lsend({t:'where',room:m.room,floor:m.room[0]==='d'?m.floor:undefined});
    if(m.room[0]==='d'){
      if(run&&m.floor&&m.floor!==run.floor)enterFloor(m.floor);
      if(MP.host!==MP.id){ents=[];NET.send({t:'sync'});}
      else MP.nextEid=Math.max(MP.nextEid,...ents.map(e=>e.id+1),1);
    }});
  NET.onR('+',m=>{addOther(m.p);if(scene==='hold'||OTH.size===1)sfx('pick');});
  NET.onR('-',m=>{const o=OTH.get(m.id);OTH.delete(m.id);if(o&&MP.inInst())toast(o.name+' left the dungeon');});
  NET.onR('S',m=>{for(const [id,x,y,d,mv] of m.p){const o=OTH.get(id);if(!o)continue;o.tx=x;o.ty=y;o.dir=d;o.moving=!!mv;}});
  NET.onR('L',m=>{const o=OTH.get(m.id);if(o)o.look=m.look||DEFAULT_LOOK;});
  NET.onR('D',m=>{const v=m.d;if(m.ref){const d=drops.find(q=>q.ref===m.ref);if(d){d.did=v.did;if(v.left!=null)d.expAt=Date.now()+v.left;return;}}netDrop(v,false);});
  NET.onR('took',m=>{const d=drops.find(q=>q.did===m.did);if(d&&d.bag&&d.ref&&m.by!==MP.id)secret('giver');if(m.by===MP.id){if(d)grantDrop(d);else if(ITEMS[m.it]||m.it==='gold')grantDrop({id:m.it,n:m.n});}else if(d)d.taken=true;});
  NET.onR('gone',m=>{const d=drops.find(q=>q.did===m.did);if(d)d.taken=true;});
  NET.onR('nope',m=>{const d=drops.find(q=>q.did===m.did);if(d){d.pending=false;d.showAt=Date.now()+5000;}});
  NET.onR('T',onTree);
  NET.onR('F',m=>{const o=OTH.get(m.id);if(o)o.fish=fishOf(m.f);});
  NET.onR('say',m=>{const msg={id:MP.room+':'+m.n,name:m.name,text:m.text,at:m.at,me:m.id===MP.id};MP.chatLog.push(msg);if(MP.chatLog.length>60)MP.chatLog.shift();if(MP.chatCb)MP.chatCb([msg]);
    const o=OTH.get(m.id);if(o){o.say=m.text.length>26?m.text.slice(0,25)+'...':m.text;o.sayT=4.5;}});
  NET.onR('slow',()=>chatSys('Slow down a little.'));
  NET.onR('full',()=>{MP.room=null;NET.lsend({t:'world'});});
  NET.onR('denied',()=>{if(scene==='delve'){toast('That dungeon is closed. Heading home.','bad');returnHome();}});
  NET.onR('host',m=>{MP.host=m.id;if(m.id===MP.id){MP.nextEid=Math.max(1000,...ents.map(e=>(e.id||0)+1000));for(const e of ents){e.tx=null;e.st=e.st||'idle';e.cd=e.cd||1;e.kb=e.kb||{x:0,y:0};}if(scene==='delve')toast('You’re now leading this dungeon');}});
  // host → everyone
  NET.onR('en',m=>{if(!MP.client()||scene!=='delve'||m.f!==run.floor)return;const seen=new Set();
    for(const [id,type,x,y,hp,max,fl,sc] of m.e){if(!ENEMIES[type])continue;seen.add(id);let e=ents.find(q=>q.id===id);
      if(!e){e=makeEnemy(type,x,y,(sc||100)/100);e.id=id;ents.push(e);}e.tx=x;e.ty=y;e.hp=hp;e.max=max;if(fl)e.flash=Math.max(e.flash,.1);}
    for(const e of ents)if(!seen.has(e.id))e.dead=true;});
  NET.onR('kill',m=>{if(!MP.client()||scene!=='delve')return;let e=ents.find(q=>q.id===m.e);
    if(!e){if(!ENEMIES[m.ty])return;e=makeEnemy(m.ty,m.x,m.y,1);}e.x=m.x;e.y=m.y;e.dead=true;onKilled(e,m.top,m.hit||[],m.xp|0);});
  NET.onR('obj',m=>{if(scene!=='delve'||!map.objs)return;const o=map.objs[m.o];if(!o)return;if(m.hp!=null)o.hp=m.hp;
    if((m.gone&&!o.gone)||(m.open&&!o.open))objTaken(o,m.by);o.req=0;});
  NET.onR('objs',m=>{if(scene!=='delve'||m.f!==run.floor)return;for(const [i,op,gn,hp] of m.s){const o=map.objs[i];if(!o)continue;if(op){o.open=true;o.act=null;}if(gn){o.gone=true;o.light=null;o.act=null;}if(hp!=null)o.hp=hp;}
    if(m.bd&&map.stairs&&map.stairs.hidden){map.stairs.hidden=false;bakeGround(map);}});
  NET.onR('floor',m=>{if(scene!=='delve'||m.f===run.floor)return;sfx('stairs');enterFloor(m.f);toast('Floor '+m.f+' · '+BIOMES[packOf(m.f).id].name);});
  NET.onR('hurt',m=>{if(scene==='delve')hurtPlayer(m.d,{x:m.x,y:m.y});});
  // player → host
  NET.onR('hit',m=>{if(MP.client()||scene!=='delve')return;const e=ents.find(q=>q.id===m.e&&!q.dead);if(!e)return;applyHit(e,Math.max(1,Math.min(e.max,m.d|0)),+m.a||0,m.from);});
  NET.onR('act',m=>{if(MP.client()||scene!=='delve')return;const o=map.objs[m.o];if(!o||(o.type!=='chest'&&o.type!=='glowcap')||o.open||o.gone)return;objTaken(o,m.from);MP.objOut(m.o,o,m.from);});
  NET.onR('mine',m=>{if(MP.client()||scene!=='delve')return;const o=map.objs[m.o];if(!o||o.type!=='ore')return;mineOre(o,m.o,m.from);});
  NET.onR('shade',m=>{if(MP.client()||scene!=='delve')return;if(ents.filter(e=>e.type==='shade'&&!e.dead).length>=8)return;if(!blocked(m.x,m.y,4))ents.push(makeEnemy('shade',m.x,m.y,1+.1*run.floor));});
  NET.onR('down',m=>{const o=OTH.get(m.from);if(o)toast(o.name+' is waiting at the stairs');});
  NET.onR('sync',m=>{if(MP.client()||scene!=='delve')return;const s=[];map.objs.forEach((o,i)=>{if(o.open||o.gone||(o.type==='ore'&&o.hp<3))s.push([i,o.open?1:0,o.gone?1:0,o.hp]);});
    NET.send({t:'objs',to:m.from,f:run.floor,s,bd:map.stairs&&!map.stairs.hidden&&map.pack.boss&&run.floor===map.pack.to?1:0});MP.enT=0;});
}
// ---- chat goes through the current room (and /p for party chat) ----
window.CHATNET={
  why(){if(!netOn())return 'Chat isn’t available right now.';if(!MP.room)return 'Connecting to the world…';return null;},
  join(ch,cb){MP.chatCb=cb;cb(MP.chatLog.slice());return ()=>{if(MP.chatCb===cb)MP.chatCb=null;};},
  async send(ch,text){const pm=text.match(/^\/p\s+(.+)/i);if(pm){if(!MP.party)return {ok:false,msg:'You’re not in a party. Invite someone from the Social menu.'};NET.lsend({t:'pchat',text:pm[1]});return {ok:true,party:true};}
    if(!NET.roomOpen())return {ok:false,msg:'Reconnecting… try again in a moment.'};NET.send({t:'say',text});if(/\blanternhold\b/i.test(text))secret('word');return {ok:true};}
};
// ---- friends ----
MP.loadFriends=async()=>{if(!window.ACC||!ACC.api)return;const r=await ACC.api.call(null,'friends');if(!r.ok)return;MP.friends=r.data;
  NET.lsend({t:'watch',ids:r.data.friends.map(f=>f.name.toLowerCase())});refreshSocial();};
MP.friendDo=async(action,name)=>{const r=await ACC.api.call(null,'friends',{method:'POST',body:{action,name}});
  if(!r.ok){toast(r.data.msg||'That didn’t work.','bad');return false;}MP.friends=r.data.list;NET.lsend({t:'watch',ids:r.data.list.friends.map(f=>f.name.toLowerCase())});
  if(action==='add'){toast(r.data.state==='friends'?'You’re now friends with '+name:'Friend request sent to '+name,'good');NET.lsend({t:'nudge',to:name.toLowerCase(),k:'friend'});}
  if(action==='accept'){toast('You’re now friends with '+name,'good');NET.lsend({t:'nudge',to:name.toLowerCase(),k:'friend'});}
  refreshSocial();return true;};
// ---- prompts: party invites and "your party went into the Depths" ----
function showPrompt(){socBadge();const el=$('invite');MP.invites=MP.invites.filter(i=>Date.now()-i.at<85000);const inv=MP.invites[0],pd=MP.prompt;
  if(!inv&&!pd){el.hidden=true;return;}el.hidden=false;
  if(inv){el.innerHTML=`<span><b>${chatEsc(inv.name)}</b> invited you to their party</span><button class="btn sm" id="invY">Join</button><button class="btn alt sm" id="invN">No thanks</button>`;
    $('invY').onclick=()=>{NET.lsend({t:'accept',from:inv.from});MP.invites.shift();showPrompt();};$('invN').onclick=()=>{NET.lsend({t:'decline',from:inv.from});MP.invites.shift();showPrompt();};
    clearTimeout(MP.invT);MP.invT=setTimeout(showPrompt,86000);return;}
  el.innerHTML=`<span><b>${chatEsc(pd.by)}</b> led your party into floor ${pd.floor}</span><button class="btn sm" id="invY">Join them</button><button class="btn alt sm" id="invN">Later</button>`;
  $('invY').onclick=()=>MP.enterInst(pd.room,pd.floor,pd.seed);$('invN').onclick=()=>{MP.prompt=null;showPrompt();};}
function hidePrompt(){if(!MP.invites.length&&!MP.prompt)$('invite').hidden=true;else showPrompt();}
// ---- the Social menu: friends, party, players nearby ----
let socTab='friends',socOpen=false;
const where=s=>!s||!s.on?'Offline':s.room&&s.room[0]==='w'?'World '+s.room.slice(1):s.room&&s.room[0]==='d'?'In the Depths'+(s.floor?' · floor '+s.floor:''):'Online';
function socBadge(){const n=((MP.friends&&MP.friends.incoming.length)||0)+MP.invites.length,el=$('socN');if(!el)return;el.hidden=!n;el.textContent=n;}
function refreshSocial(){socBadge();if(socOpen&&!$('sheet').hidden&&$('socialSheet'))openSocial(socTab,true);}
function openSocial(tab,keep){if(!started)return;socTab=tab||socTab;socOpen=true;if(!keep&&netOn())NET.lsend({t:'online'});const inp=$('fadd'),typed=keep&&inp?inp.value:'';
  if(!netOn()){openSheet(`<h2>Social</h2><p class="lead">Friends and parties need the game’s realtime server, which isn’t reachable right now.</p><div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;return;}
  const F=MP.friends||{friends:[],incoming:[],outgoing:[]},p=MP.party,inParty=id=>!!(p&&p.members.some(m=>m.id===id)),myWorld=MP.room&&MP.room[0]==='w'?MP.room:null;
  const onlineN=F.friends.filter(f=>(MP.status.get(f.name.toLowerCase())||{}).on).length;
  const row=(name,sub,btns,dot)=>`<div class="srow">${dot!=null?`<i class="dot ${dot?'on':''}"></i>`:''}<span><b>${chatEsc(name)}</b><small>${sub}</small></span><span class="sbtns">${btns}</span></div>`;
  let body='';
  if(socTab==='friends'){
    body=`<div class="addf"><input id="fadd" maxlength="16" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Hero name" value="${chatEsc(typed)}" aria-label="Add a friend by hero name"><button class="btn sm" id="faddB">Add friend</button></div>`
     +(F.incoming.length?`<h3>Friend requests</h3>`+F.incoming.map(n=>row(n,'wants to be friends',`<button class="btn sm" data-fa="accept" data-n="${chatEsc(n)}">Accept</button><button class="btn alt sm" data-fa="decline" data-n="${chatEsc(n)}">Decline</button>`)).join(''):'')
     +`<h3>Friends <small>${onlineN} online</small></h3>`+(F.friends.length?F.friends.slice().sort((a,b)=>((MP.status.get(b.name.toLowerCase())||{}).on?1:0)-((MP.status.get(a.name.toLowerCase())||{}).on?1:0)).map(f=>{const id=f.name.toLowerCase(),s=MP.status.get(id)||{},b=[];
        if(s.on&&!inParty(id)&&MP.isLeader())b.push(`<button class="btn sm" data-inv="${id}">Invite</button>`);
        if(s.on&&s.room&&s.room[0]==='w'&&s.room!==myWorld&&scene==='hold')b.push(`<button class="btn alt sm" data-jw="${s.room}">Join world</button>`);
        b.push(`<button class="btn alt sm${MP.rmArm===f.name?' warn':''}" data-fa="remove" data-n="${chatEsc(f.name)}">${MP.rmArm===f.name?'Sure?':'Remove'}</button>`);
        return row(f.name,where(s)+(f.x?' · @'+chatEsc(f.x):''),b.join(''),!!s.on);}).join(''):'<p class="lead small">No friends yet. Add one by hero name above, or from Nearby.</p>')
     +(F.outgoing.length?`<h3>Waiting for an answer</h3>`+F.outgoing.map(n=>row(n,'request sent',`<button class="btn alt sm" data-fa="cancel" data-n="${chatEsc(n)}">Cancel</button>`)).join(''):'');
  }else if(socTab==='party'){
    body=p?p.members.map(m=>{const me=m.id===MP.id,b=[];if(MP.party.leader===MP.id&&!me){b.push(`<button class="btn alt sm" data-lead="${m.id}">Make leader</button>`);b.push(`<button class="btn alt sm" data-kick="${m.id}">Remove</button>`);}
        return row((m.id===p.leader?'♛ ':'')+m.name+(me?' (you)':''),m.on?where(m):'Offline',b.join(''),m.on);}).join('')
      +`<p class="lead small">${p.members.length}/4 · ${p.leader===MP.id?'You lead: when you enter the Depths, your party is asked to join you in the same dungeon.':'Your leader opens the way into the Depths for the whole party.'} Start a chat message with <b>/p</b> to talk to your party only.</p>`
      +(p.inst&&MP.room!==p.inst.room?`<button class="btn big" id="jp">Join your party on floor ${p.inst.floor}</button>`:'')
      +`<div class="row"><button class="btn alt" id="lvP">Leave party</button></div>`
      :`<p class="lead">You’re not in a party. Parties of up to 4 delve together in one shared dungeon. Invite friends from the Friends tab, or players around you from Nearby.</p>`;
  }else{
    const near=[...OTH.values()];
    body=near.length?near.map(o=>{const fr=F.friends.some(f=>f.name.toLowerCase()===o.id),pend=F.outgoing.some(n=>n.toLowerCase()===o.id),b=[];
        if(!fr&&!pend)b.push(`<button class="btn alt sm" data-fadd="${chatEsc(o.name)}">Add friend</button>`);
        if(!inParty(o.id)&&MP.isLeader())b.push(`<button class="btn sm" data-inv="${o.id}">Invite</button>`);
        return row(o.name,fr?'Friend':pend?'Request sent':'Here with you',b.join(''),true);}).join('')
      :'<p class="lead small">No one else is here right now.</p>';
  }
  const pn=p?p.members.length:0;
  openSheet(`<div id="socialSheet"></div><h2>Social</h2><p class="lead small">${MP.online||1} player${MP.online===1?'':'s'} online${MP.room&&MP.room[0]==='w'?' · you’re in World '+MP.room.slice(1):''}</p>
   <div class="tabs"><button class="tab" aria-selected="${socTab==='friends'}" data-st2="friends">Friends${F.incoming.length?' ('+F.incoming.length+')':''}</button><button class="tab" aria-selected="${socTab==='party'}" data-st2="party">Party${pn?' '+pn+'/4':''}</button><button class="tab" aria-selected="${socTab==='here'}" data-st2="here">Nearby ${OTH.size}</button></div>
   <div class="list social">${body}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  const q=s=>$('sheet').querySelectorAll(s);$('sx').onclick=()=>{socOpen=false;closeSheet();};
  q('[data-st2]').forEach(b=>b.onclick=()=>{MP.rmArm=null;openSocial(b.dataset.st2);});
  const add=async()=>{const v=($('fadd').value||'').trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(v)){toast('Type a hero name (3–16 letters, numbers or _)','bad');return;}if(await MP.friendDo('add',v))$('fadd').value='';};
  if($('faddB')){$('faddB').onclick=add;$('fadd').onkeydown=e=>{if(e.key==='Enter')add();e.stopPropagation();};if(keep&&typed)$('fadd').focus();}
  q('[data-fa]').forEach(b=>b.onclick=()=>{const a=b.dataset.fa,n=b.dataset.n;if(a==='remove'&&MP.rmArm!==n){MP.rmArm=n;return openSocial('friends');}MP.rmArm=null;MP.friendDo(a,n);});
  q('[data-fadd]').forEach(b=>b.onclick=()=>MP.friendDo('add',b.dataset.fadd));
  q('[data-inv]').forEach(b=>b.onclick=()=>{NET.lsend({t:'invite',to:b.dataset.inv});b.disabled=true;b.textContent='Invited';});
  q('[data-jw]').forEach(b=>b.onclick=()=>{MP.wantWorld=b.dataset.jw;socOpen=false;closeSheet();NET.lsend({t:'world',want:b.dataset.jw});toast('Travelling to World '+b.dataset.jw.slice(1));});
  q('[data-kick]').forEach(b=>b.onclick=()=>NET.lsend({t:'kick',id:b.dataset.kick}));
  q('[data-lead]').forEach(b=>b.onclick=()=>NET.lsend({t:'lead',id:b.dataset.lead}));
  if($('lvP'))$('lvP').onclick=()=>NET.lsend({t:'leave'});
  if($('jp'))$('jp').onclick=()=>{socOpen=false;if(scene==='delve'){toast('Return home first, then join your party.');return;}MP.enterInst(p.inst.room,p.inst.floor,p.inst.seed);};
}
{const p=new Px(16,16);p.ell(5.5,6,2.6,2.6,PAL.white);p.ell(11,6.5,2.2,2.2,PAL.silver);p.ell(5.5,12.5,4.2,2.6,PAL.white);p.ell(11.5,12.5,3.2,2.3,PAL.silver);p.outline();$('socIc').src=p.canvas().toDataURL();}
$('socB').onclick=()=>{if(!$('sheet').hidden&&$('socialSheet')){socOpen=false;closeSheet();}else openSocial();};

let last=0;
function frame(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(started)update(dt);else time+=dt;render();requestAnimationFrame(frame);}
let started=false;
fit();applySet();enterHold();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{});
setInterval(()=>{if(started)save();},10000);
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&started)save();});addEventListener('pagehide',()=>{if(started)save();});
// Admin loadout: the best gear equipped, one of every lantern, cape and top-tier piece in the bank, both relics, max bank space.
function grantKit(){const old=S.gear,eq={blade:'ember',mail:'ember',lantern:'wisp',cape:'mother',helm:HAT};
  for(const sl of ['blade','mail','lantern','cape','helm']){const cur=old[sl];if(cur&&cur!==eq[sl]&&!(sl==='blade'&&cur==='rusty')&&!(sl==='mail'&&cur==='none')&&!(sl==='lantern'&&cur==='basic'))give(S.bank,gearId(sl,cur),1);}
  S.gear=Object.assign({},eq);S.bankBuys=BANK_BUYS.length;S.gold+=100000;
  const has=id=>(S.bank[id]||0)+(S.vault[id]||0)>0;
  for(const k of Object.keys(LANTERNS))if(k!=='wisp'&&k!=='basic'&&!has(k+'_lantern'))give(S.vault,k+'_lantern',1);
  for(const k of Object.keys(CAPES))if(k!=='mother'&&!has('cape_'+k))give(S.vault,'cape_'+k,1);
  for(const id of ['ember_blade','ember_mail','ember_helm','relic_crown','relic_sigil'])if(!has(id))give(S.vault,id,1);
  for(const id of ['pondfin','stew','oil'])give(S.bank,id,20);
  S.quick=['stew','pondfin','oil','bread',null];S.flags.kit=true;P.hp=maxHp();save(true);}
function applyAdmin(on,hat){ADMIN=!!on;HAT=ADMIN_HATS[hat]?hat:'partyhat';
  // Admin hats are one of one: strip any hat that isn't this hero's own (all of them for a regular hero).
  for(const h of Object.keys(ADMIN_HATS))if(!ADMIN||h!==HAT){delete S.bank[h+'_helm'];delete S.vault[h+'_helm'];if(S.gear.helm===h)S.gear.helm=null;}
  if(!ADMIN){S.flags.god=false;return;}
  const H=HAT+'_helm';
  if(S.gear.helm!==HAT&&!S.bank[H]&&!S.vault[H]){S.gear.helm&&give(S.bank,gearId('helm',S.gear.helm),1);S.gear.helm=HAT;setTimeout(()=>{toast('The '+ADMIN_HATS[HAT]+' is yours. One of one.','rare r-unique');sfx('rare');},2200);}
  if(!S.flags.kit){grantKit();setTimeout(()=>{toast('Admin loadout ready: top gear equipped, every lantern and cape in your bank.','rare r-legendary');sfx('rare');},4200);}}
// ---------- chat: talk with players on the same map (the Hold, or the same Depths floor) ----------
// The network side is window.CHATNET, provided by the account script: join(channel, onMessages) -> leave(), send(channel, text) -> {ok,msg}|{ok:false,msg}.
let chatOpen=false,chatCh=null,chatLeaveFn=null,chatMsgs=[],chatSeen=new Set(),chatLast=0;
const CHAT_BAD=['fuck','shit','bitch','cunt','dick','cock','pussy','nigg','fag','rape','nazi','hitler','porn','slut','whore','penis','vagina','retard','kkk','molest','pedo'];
const chatClean=t=>{t=String(t).replace(/[\u0000-\u001f\u007f<>]/g,'').replace(/\s+/g,' ').trim().slice(0,140);for(const w of CHAT_BAD)t=t.replace(new RegExp('\\b'+w+'\\w*','gi'),m=>m[0]+'*'.repeat(m.length-1));return t;};
const chatChannel=()=>MP.room||(scene==='delve'?'solo':'hold');
const chatPlace=ch=>ch[0]==='w'?'World '+ch.slice(1):ch[0]==='d'||ch==='solo'?'your dungeon':'the Hold';
const chatEsc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function chatRender(){const L=$('chatLog');if(!L)return;const atEnd=L.scrollHeight-L.scrollTop-L.clientHeight<30;
  L.innerHTML=chatMsgs.slice(-80).map(m=>m.sys?`<p class="sys">${chatEsc(m.text)}</p>`:`<p class="${m.me?'me':''}${m.party?' pty':''}">${m.party?'<i>Party</i> ':''}<b>${chatEsc(m.name)}</b> ${chatEsc(m.text)}</p>`).join('');
  if(atEnd||chatMsgs.length<3)L.scrollTop=L.scrollHeight;$('chatWhere').textContent=chatPlace(chatCh||chatChannel());}
function chatSys(text,at){chatMsgs.push({id:'s'+Math.random(),sys:true,text,at:at===undefined?Date.now():at});chatRender();}
function chatAdd(list){let n=0;for(const m of list||[]){if(!m||chatSeen.has(m.id))continue;chatSeen.add(m.id);m.text=chatClean(m.text);if(!m.text)continue;m.me=m.me||(!!S.name&&m.name===S.name);chatMsgs.push(m);n++;}
  if(!n)return;chatMsgs.sort((a,b)=>a.at-b.at);if(chatMsgs.length>150)chatMsgs=chatMsgs.slice(-150);if(chatOpen)chatRender();}
function chatLeave(){if(chatLeaveFn){try{chatLeaveFn();}catch(e){}}chatLeaveFn=null;}
function chatJoin(){const ch=chatChannel();chatLeave();chatCh=ch;chatMsgs=[];chatSeen.clear();
  chatSys('Chatting with players in '+chatPlace(ch)+'. Start with /p to talk to your party only. Be kind.',0);
  const net=window.CHATNET,why=net&&net.why&&net.why();
  if(!net||why){chatSys(why||'Chat is offline right now.');$('chatIn').disabled=true;return;}
  $('chatIn').disabled=false;chatLeaveFn=net.join(ch,chatAdd);}
function toggleChat(force){if(!started)return;chatOpen=force===undefined?!chatOpen:!!force;$('chat').hidden=!chatOpen;$('chatB').setAttribute('aria-pressed',String(chatOpen));
  if(chatOpen){chatJoin();if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches)setTimeout(()=>$('chatIn').focus(),0);}
  else{chatLeave();chatCh=null;$('chatIn').blur();}}
async function chatSend(){const i=$('chatIn'),t=chatClean(i.value);if(!t)return;const now=Date.now();
  if(now-chatLast<1500){chatSys('Slow down a little.');return;}chatLast=now;i.value='';
  const net=window.CHATNET;if(!net||(net.why&&net.why()))return chatSys('Chat is offline right now.');
  const r=await net.send(chatCh||chatChannel(),t);
  if(r&&r.ok){if(r.msg)chatAdd([Object.assign({me:true},r.msg)]);if(!r.party){P.say=t;P.sayUntil=time+4.5;}}else chatSys((r&&r.msg)||'Message not sent. Try again.');}
setInterval(()=>{if(chatOpen&&chatCh!==chatChannel())chatJoin();},500);
{const p=new Px(16,16);p.rows(2,3,['.aaaaaaaaaa.','abbbbbbbbbba','abbbbbbbbbba','abccbccbccba','abbbbbbbbbba','abbbbbbbbbba','.aaaaabbaaa.','.....abba...','......aa....'],{a:PAL.ink,b:PAL.white,c:PAL.slate});
  $('chatIc').src=p.canvas().toDataURL();}
$('chatB').onclick=()=>toggleChat();$('chatX').onclick=()=>toggleChat(false);$('chatGo').onclick=()=>{chatSend();if(!(window.matchMedia&&matchMedia('(hover:hover)').matches))$('chatIn').focus();};
$('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();chatSend();}else if(e.key==='Escape'){e.preventDefault();toggleChat(false);}e.stopPropagation();});
window.LH={heroName:()=>S.name,start(pid,data,o){document.documentElement.classList.remove('pre');PID=pid;S=normalize(data);if(!loadSet(S.settings))S.settings=Object.assign({},SET,{sound:!muted});applyAdmin(o&&o.admin,o&&o.hat);migrateBank();lastCap=bankCap();P.hp=maxHp();started=true;enterHold();save();if(o.isNew)setTimeout(()=>toast('Welcome to the Hold, '+S.name+'!','good'),300);else toast('Welcome back, '+S.name,'good');},
  resume(){document.documentElement.classList.remove('pre');},setLook(l){S.look=Object.assign({},l);save();openBag();}};
if(location.hostname==='localhost'||location.protocol==='file:')window.__lh={get drops(){return drops},get MP(){return MP},get OTH(){return OTH},openSocial:t=>openSocial(t),get S(){return S},get P(){return P},get run(){return run},get ents(){return ents},get map(){return map},get scene(){return scene},startDelve,enterFloor,setStick:(x,y)=>{stick={x,y,on:!!(x||y)};},press:()=>{aPressed=true;},hold:v=>{retHeld=v;},spawnLoot,dropItem:(id,n)=>{take(id,n);dropToGround(id,n);},act:()=>{const a=nearestAct();if(a)doAct(a);return a&&a.id;},fishSpot,startFishing,get FISHING(){return FISHING},T,get CHOP(){return CHOP},HOLD,startChop,openGuide,openHero,openSkills,openBag,GOALS,goalsDone,skillXp,lvlOf};
})();

// ===== Lanternhold accounts (Season 0): sign in with a wallet or Google, one hero per account, server-side saves =====
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const RH={chainId:'0x1237',chainName:'Robinhood Chain',nativeCurrency:{name:'Ether',symbol:'ETH',decimals:18},rpcUrls:['https://rpc.mainnet.chain.robinhood.com'],blockExplorerUrls:['https://robinhoodchain.blockscout.com']};
const NAME_RE=/^[A-Za-z0-9_]{3,16}$/;
const BAD=['fuck','shit','bitch','cunt','dick','cock','pussy','nigg','fag','rape','nazi','hitler','porn','slut','whore','penis','vagina','retard','kkk','anus','molest','pedo'];
const clean=n=>{const t=n.toLowerCase().replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s').replace(/7/g,'t').replace(/_/g,'');return !BAD.some(w=>t.includes(w));};
const short=a=>a?a.slice(0,6)+'…'+a.slice(-4):'';
const box=$('acct'),body=$('acctBody');
const inAppBrowser=()=>/(MetaMask|Trust|CoinbaseWallet|Rabby|Rainbow|Phantom|OKApp|Bitget|FBAN|FBAV|Instagram|Twitter|Line\/)/i.test(navigator.userAgent)||(!!window.ethereum&&/Mobi/i.test(navigator.userAgent));

// ---------- server API ----------
async function api(path,opt){opt=opt||{};
  try{const r=await fetch('/api/'+path,{method:opt.method||'GET',credentials:'same-origin',cache:'no-store',keepalive:!!opt.keepalive,
      headers:Object.assign({'X-LH':'1'},opt.body?{'Content-Type':'application/json'}:{}),body:opt.body?JSON.stringify(opt.body):undefined});
    let j={};try{j=await r.json();}catch(e){}return {status:r.status,ok:r.ok,data:j};}
  catch(e){return {status:0,ok:false,data:{error:'offline'}};}}
const online=()=>!!(ACC.me&&ACC.me.hero&&ACC.pid);
async function nameStatus(name){
  if(!NAME_RE.test(name))return {ok:false,msg:'3–16 letters, numbers or _'};
  if(!clean(name))return {ok:false,msg:'Please pick a different name'};
  const r=await api('name?name='+encodeURIComponent(name));if(!r.ok)return {ok:true,msg:'Couldn’t check right now',warn:true};return r.data;
}
async function claimName(name,look){
  const st=await nameStatus(name);if(!st.ok)return st;
  const r=await api('hero',{method:'POST',body:{name,look}});
  if(!r.ok)return {ok:false,msg:r.data.msg||(r.status===401?'Your sign-in expired. Sign in again.':'Couldn’t reach the server. Try again.')};
  ACC.me=r.data;return {ok:true};
}

// ---------- saving to the server ----------
// At most one save every 10–14 s while playing (each player gets their own spacing), immediately on key moments
// (return home, death, sign out). Nothing is sent when nothing changed, so idle players cost nothing.
let cloudTimer=null,cloudBusy=false,cloudPending=null,offlineWarned=false,lastSent=null,lastAt=0,fails=0,stopped=false;
const SAVE_GAP=10000+Math.random()*4000;
const strip=S=>{const d=JSON.parse(JSON.stringify(S));delete d.name;delete d.look;delete d.wallet;delete d.savedAt;return d;};
function cloudSave(S,now){if(!online()||stopped)return;const d=strip(S),j=JSON.stringify(d);if(j===lastSent&&!cloudPending)return;cloudPending={d,j};
  if(now){clearTimeout(cloudTimer);cloudTimer=null;return flushCloud();}
  if(!cloudTimer)retry(Math.max(1000,lastAt+SAVE_GAP-Date.now()));}
function retry(ms){clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>{cloudTimer=null;flushCloud();},ms);}
async function flushCloud(){if(cloudBusy||!cloudPending||!online()||stopped)return;cloudBusy=true;const p=cloudPending;cloudPending=null;
  if(p.j===lastSent){cloudBusy=false;return;}
  const r=await api('save',{method:'POST',body:{data:p.d,rev:ACC.rev},keepalive:true});cloudBusy=false;
  const stop=(t,ms)=>{stopped=true;notice(t);setTimeout(()=>location.reload(),ms);};
  if(r.ok){ACC.rev=r.data.rev;lastSent=p.j;lastAt=Date.now();fails=0;offlineWarned=false;}
  else if(r.status===409)return stop('Your hero was played on another device. Loading the latest progress…',1800);
  else if(r.status===422)return stop('Some progress couldn’t be verified and was rolled back.',2500);
  else if(r.status===401)return stop('Your sign-in expired. Please sign in again.',2500);
  else if(r.status===403){stopped=true;notice('This account can’t save progress right now.');return;}
  else{if(!cloudPending)cloudPending=p;if(!offlineWarned&&r.status===0){offlineWarned=true;notice('Connection lost. Progress will sync when you’re back online.');}
    if(r.status===429)return retry(2000+Math.random()*1500);
    fails++;return retry(Math.min(60000,5000*2**(fails-1))*(0.75+Math.random()*0.5));}
  if(cloudPending&&!cloudTimer)retry(2500+Math.random()*1000);}
function notice(t){const el=document.getElementById('toast');if(!el)return;el.textContent=t;el.className='toast bad';el.hidden=false;setTimeout(()=>el.hidden=true,4000);}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushCloud();});addEventListener('pagehide',()=>flushCloud());

// ---------- wallets (EIP-6963 discovery, injected fallback) ----------
const wallets=[];
addEventListener('eip6963:announceProvider',e=>{const d=e.detail;if(d&&d.info&&d.provider&&!wallets.find(w=>w.info.uuid===d.info.uuid)){wallets.push(d);if(ACC.screen==='welcome'&&!box.hidden)render();}});
dispatchEvent(new Event('eip6963:requestProvider'));
function allWallets(){const l=wallets.slice();if(!l.length&&window.ethereum)l.push({info:{uuid:'injected',name:window.ethereum.isMetaMask?'MetaMask':'Browser wallet',icon:''},provider:window.ethereum});return l;}
const hexUtf8=s=>'0x'+Array.from(new TextEncoder().encode(s)).map(b=>b.toString(16).padStart(2,'0')).join('');
// Lanternhold only ever asks a wallet for these: which account, and one free sign-in signature. Never a transaction,
// a token approval, a chain switch or anything else, so a bug or an injected script can't use our wallet code to do more.
const SAFE_METHODS=new Set(['eth_accounts','eth_requestAccounts','wallet_requestPermissions','personal_sign']);
const ask=(pv,method,params)=>{if(!SAFE_METHODS.has(method))return Promise.reject({message:'Blocked wallet request: '+method});return pv.request(params?{method,params}:{method});};
// If the wallet already shared an account with this site, wallets like MetaMask hand that same account back even after
// you switch accounts. So we ask the wallet to show its account picker and use the account the player chooses.
async function pickAccount(pv){
  let known=[];try{known=(await ask(pv,'eth_accounts'))||[];}catch(e){}
  if(known.length){
    try{const perms=await ask(pv,'wallet_requestPermissions',[{eth_accounts:{}}]);
      let now=[];try{now=(await ask(pv,'eth_accounts'))||[];}catch(e){}
      const cav=(perms||[]).flatMap(p=>(p&&p.caveats)||[]).find(c=>c&&c.type==='restrictReturnedAccounts');
      const pick=now[0]||(cav&&Array.isArray(cav.value)&&cav.value[0]);if(pick)return String(pick);}
    catch(e){if(e&&e.code===4001)throw e;}
  }
  const accts=await ask(pv,'eth_requestAccounts');return String(accts&&accts[0]||'');
}
// Watch the wallet a player signed in with: switching or disconnecting its account signs them out.
const LW='lanternhold.wallet';let watched=null;
const signedInWithWallet=()=>{try{return localStorage.getItem('lanternhold.via')==='wallet';}catch(e){return false;}};
const setVia=v=>{try{localStorage.setItem('lanternhold.via',v);}catch(e){}};
function rememberWallet(w){try{localStorage.setItem(LW,JSON.stringify({rdns:w.info.rdns||'',name:w.info.name||''}));}catch(e){}watchWallet(w.provider);}
function savedWalletProvider(){let m=null;try{m=JSON.parse(localStorage.getItem(LW)||'null');}catch(e){}const l=allWallets();
  return ((m&&l.find(w=>(m.rdns&&w.info.rdns===m.rdns)||(!m.rdns&&w.info.name===m.name)))||l[0]||{}).provider||null;}
function watchWallet(pv){if(!pv||pv===watched||typeof pv.on!=='function')return;
  if(watched&&watched.removeListener)try{watched.removeListener('accountsChanged',onAccounts);}catch(e){}
  watched=pv;try{pv.on('accountsChanged',onAccounts);}catch(e){}}
let switching=false;
async function onAccounts(accts){const me=ACC.me&&ACC.me.wallet;if(!me||switching||ACC.screen==='signing'||!signedInWithWallet())return;
  const now=String(accts&&accts[0]||'').toLowerCase();if(now===me)return;
  switching=true;try{await flushCloud();}catch(e){}if(window.NET)NET.stop();await api('auth/logout',{method:'POST'});ACC.me=null;
  try{sessionStorage.setItem('lanternhold.notice',now?'You switched wallets, so you were signed out. Connect again to sign in with '+short(now)+'.':'Your wallet disconnected, so you were signed out.');}catch(e){}
  location.reload();}
// Signs a Sign-In with Ethereum message. endpoint: 'auth/verify' to sign in, 'auth/link-wallet' to add the wallet to this account.
// At most two wallet pop-ups: pick/connect the account, then one free signature. The server writes the exact message
// (this site's address, your checksummed address, a one-time code, 5-minute expiry), so the wallet can show it as a
// verified sign-in request for this site instead of a warning. No network switch is needed just to sign in.
async function signWithWallet(w,endpoint,onStage){
  const pv=w.provider;
  const raw=await pickAccount(pv),addr=raw.toLowerCase();if(!/^0x[0-9a-f]{40}$/.test(addr))throw {message:'No valid account was shared'};
  onStage&&onStage('Approve the sign-in request in your wallet. It’s a free signature: no transaction, no gas, no access to your funds.');
  const n=await api('auth/nonce?address='+addr);
  if(!n.ok)throw {message:n.status===0?'Couldn’t reach the server. Check your connection and try again.':n.data&&n.data.msg?n.data.msg:'The game server isn’t set up correctly (error '+n.status+'). The site owner can open '+location.host+'/api/health to see what’s missing.'};
  const msg=n.data.message;
  // only sign what we expect: a sign-in for this exact site, for this account, with the game's own wording
  if(typeof msg!=='string'||!msg.startsWith(location.host+' wants you to sign in with your Ethereum account:\n'+n.data.address+'\n')||msg.indexOf('\nURI: '+location.protocol+'//'+location.host+'\n')<0||n.data.address.toLowerCase()!==addr)
    throw {message:'Sign-in message didn’t match this site. Refresh the page and try again.'};
  const sig=await ask(pv,'personal_sign',[hexUtf8(msg),raw]);if(typeof sig!=='string'||!/^0x[0-9a-fA-F]+$/.test(sig))throw {message:'The wallet returned no signature'};
  const v=await api(endpoint,{method:'POST',body:{message:msg,signature:sig}});
  if(!v.ok)throw {message:v.data.msg||(v.data.error==='banned'?'This wallet is banned':v.data.error==='bad_signature'?'The signature didn’t match this wallet':'Sign-in was refused ('+(v.data.detail||v.data.error||v.status)+')')};
  return {me:v.data,addr};
}
async function connectWallet(w){
  ACC.err='';go('signing',{wname:w.info.name,stage:''});
  try{const r=await signWithWallet(w,'auth/verify',t=>{ACC.stage=t;render();});
    ACC.me=r.me;setVia('wallet');rememberWallet(w);enter();}
  catch(e){const code=e&&e.code;ACC.err=code===4001?'You declined the request in your wallet. Try again when you’re ready.':'Wallet error: '+esc((e&&e.message)||'unknown');go('welcome');}
}

// ---------- flow ----------
const ACC={screen:'welcome',pid:null,err:'',stage:'',draft:null,edit:false,cfg:{}};
const newDraft=()=>({name:'',look:Object.assign({},DEFAULT_LOOK,{skin:(Math.random()*4)|0,hair:(Math.random()*6)|0,cloth:(Math.random()*8)|0})});
function enter(){
  const me=ACC.me;if(!me){go('welcome');return;}
  if(me.hero&&me.save){ACC.pid='h_'+me.hero.name.toLowerCase();finish(Object.assign({},me.save.data,{name:me.hero.name,look:me.hero.look,wallet:me.wallet}),false,me.save.rev);return;}
  ACC.draft=newDraft();go('creator');
}
function finish(data,isNew,rev){if(rev!==undefined)ACC.rev=rev;lastAt=Date.now();ACC.pid='h_'+ACC.me.hero.name.toLowerCase();
  box.hidden=true;stopPreview();window.LH.start(ACC.pid,data,{isNew,wallet:ACC.me.wallet,online:true,admin:!!ACC.me.hero.admin,hat:ACC.me.hero.hat});
  if(window.NET)NET.start(ACC.me.hero.name);}
function go(s,extra){ACC.screen=s;Object.assign(ACC,extra||{});render();}

// ---------- hero preview ----------
let pvT=null;
function startPreview(){stopPreview();let t=0;const dirs=['down','right','up','left'];pvT=setInterval(()=>{const c=$('pv');if(!c){stopPreview();return;}t++;const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,c.width,c.height);
  const d=dirs[Math.floor(t/12)%4],fr=1+(t>>2)%2;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(8,20,8,1);g.drawImage(heroImg(ACC.draft.look,d,fr),4,5);},110);}
function stopPreview(){clearInterval(pvT);pvT=null;}
function bigHero(look){const c=document.createElement('canvas');c.width=16;c.height=16;c.getContext('2d').drawImage(heroImg(look,'down',0),0,0);return c.toDataURL();}

const who=me=>me.wallet?'Wallet '+short(me.wallet):me.google?'Google · '+esc(me.google):'Signed in';
function render(){
  const s=ACC.screen;let h='';
  if(s==='welcome'){
    const me=ACC.me,list=allWallets(),g=ACC.cfg.google;
    const signin=`${list.length>1?list.map((w,i)=>`<button class="btn wal" data-w="${i}">${w.info.icon&&/^data:image\//.test(w.info.icon)?`<img alt="" src="${esc(w.info.icon)}">`:'<span class="wi"></span>'}Connect ${esc(w.info.name)}</button>`).join('')
        :`<button class="btn wal" id="wal" ${list.length?'data-w="0"':''}><span class="wi"></span>Connect wallet</button>`}
      <button class="btn alt goog" id="goog" ${g?'':'disabled'}><span class="gi">G</span>Continue with Google${g?'':'<em>Soon</em>'}</button>
      ${g&&inAppBrowser()?'<p class="fine">Google sign-in doesn’t work inside wallet apps. Use Safari or Chrome for Google, or connect your wallet here.</p>':''}`;
    h=`<img class="logoHero" alt="" src="${bigHero(me&&me.hero?me.hero.look:DEFAULT_LOOK)}"><h1>Lanternhold</h1><p class="tag">Season 0 · Beta. Farm your Hold, delve into the dark with friends, and bring the loot home.</p>
    ${me&&me.hero?`<button class="btn big" id="cont">Continue as ${esc(me.hero.name)}</button><p class="sub">${who(me)} · <button class="link inl" id="signout">Sign out</button></p>`
      :me?`<button class="btn big" id="mk">Create your hero</button><p class="sub">${who(me)} · <button class="link inl" id="signout">Sign out</button></p>`
      :signin}
    ${ACC.note?`<p class="${ACC.noteOk?'note':'err'}" role="status">${esc(ACC.note)}</p>`:''}
    ${ACC.err?`<p class="err" role="alert">${ACC.err}</p>`:''}
    ${me?'':'<p class="fine">Sign in with an EVM wallet (two quick approvals: connect, then one free signature. Never a transaction) or with Google. Your hero and progress are saved to your account.</p>'}`;
  }else if(s==='nowallet'){
    h=`<h2>No wallet found</h2><p class="lead">This browser doesn’t have an EVM wallet. To sign in with your wallet:</p>
    <ol class="how"><li>Open your wallet app (Robinhood Wallet, MetaMask, Rabby…)</li><li>Use its built-in browser to open this page</li><li>Tap <b>Connect wallet</b> again</li></ol>
    <p class="lead small">On a computer, install a wallet extension and reload.${ACC.cfg.google?' Or sign in with Google instead. You can connect a wallet later from the game.':''}</p>
    <div class="row"><button class="btn alt" id="back">Back</button>${ACC.cfg.google?'<button class="btn" id="goog">Continue with Google</button>':''}</div>`;
  }else if(s==='signing'){
    h=`<div class="spin" aria-hidden="true"></div><h2>Check your wallet</h2><p class="lead">${esc(ACC.stage||('Approve the connection in '+(ACC.wname||'your wallet')+'.'))}</p><ul class="safe"><li>✓ The request should say <b>${esc(location.host)}</b></li><li>✓ It’s only a signature: no transaction, no gas</li><li>✓ Lanternhold never asks for approvals, transfers or your secret phrase</li></ul><button class="btn alt" id="back">Cancel</button>`;
  }else if(s==='creator'){
    const d=ACC.draft,L=d.look;
    const sw=(k,arr)=>`<div class="swrow" role="radiogroup" aria-label="${k}">${arr.map((c,i)=>`<button class="sw" role="radio" aria-checked="${L[k]===i}" aria-label="${k} ${i+1}" data-k="${k}" data-i="${i}" style="--c:${c}"></button>`).join('')}</div>`;
    h=`<h2>${ACC.edit?'Change your look':'Create your hero'}</h2>
    <div class="creator"><div class="pvWrap"><canvas id="pv" width="24" height="24"></canvas><button class="btn alt sm" id="rnd">Shuffle</button></div>
    <div class="opts">
      ${ACC.edit?`<p class="lead"><b>${esc(d.name)}</b><br><small>Names are permanent.</small></p>`:`<label class="fld"><span>Name</span><input id="nm" maxlength="16" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="3–16 letters, numbers, _" value="${esc(d.name)}"><small id="nmS" aria-live="polite">Names are permanent and unique. Other players will see it.</small></label>`}
      <h3>Skin</h3>${sw('skin',LOOKS.skin)}<h3>Hair</h3>${sw('hair',LOOKS.hair)}
      <h3>Hair style</h3><div class="chips">${LOOKS.style.map((s,i)=>`<button class="chip" aria-pressed="${L.style===i}" data-st="${i}">${s[0].toUpperCase()+s.slice(1)}</button>`).join('')}</div>
      <h3>Clothes</h3>${sw('cloth',LOOKS.cloth)}
    </div></div>
    ${ACC.err?`<p class="err" role="alert">${ACC.err}</p>`:''}
    <div class="row">${ACC.edit?'<button class="btn alt" id="cancelEd">Cancel</button><button class="btn" id="saveEd">Save look</button>':`<button class="btn alt" id="back2">Back</button><button class="btn" id="claim" ${d.name?'':'disabled'}>Claim name &amp; play</button>`}</div>`;
  }
  body.innerHTML=h;wire();
}
function wire(){
  const on=(id,f)=>{const e=$(id);if(e)e.onclick=f;};
  body.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const w=allWallets()[+b.dataset.w];if(w)connectWallet(w);});
  const wb=$('wal');if(wb&&!wb.dataset.w)wb.onclick=()=>{const l=allWallets();if(l.length)connectWallet(l[0]);else go('nowallet');};
  on('goog',()=>{if(!ACC.cfg.google)return;setVia('google');location.href='/api/auth/google/start';});
  on('back',()=>go('welcome',{err:''}));
  on('cont',enter);on('mk',enter);
  on('signout',async()=>{await api('auth/logout',{method:'POST'});ACC.me=null;ACC.err='';ACC.note='';render();});
  on('back2',()=>go('welcome',{err:''}));
  body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ACC.draft.look[b.dataset.k]=+b.dataset.i;body.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach(x=>x.setAttribute('aria-checked',x===b));});
  body.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ACC.draft.look.style=+b.dataset.st;body.querySelectorAll('[data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b));});
  on('rnd',()=>{const L=ACC.draft.look,r=a=>(Math.random()*a.length)|0;L.skin=r(LOOKS.skin);L.hair=r(LOOKS.hair);L.cloth=r(LOOKS.cloth);L.style=r(LOOKS.style);const n=$('nm');if(n)ACC.draft.name=n.value;render();});
  const nm=$('nm');if(nm){let t=null;nm.oninput=()=>{ACC.draft.name=nm.value.trim();$('claim').disabled=!ACC.draft.name;const s=$('nmS');s.className='';clearTimeout(t);
      if(!ACC.draft.name){s.textContent='Names are permanent and unique.';return;}s.textContent='Checking…';const v=ACC.draft.name;
      t=setTimeout(async()=>{const r=await nameStatus(v);if(v!==ACC.draft.name)return;s.textContent=r.msg;s.className=r.ok?(r.warn?'warn':'good'):'bad';},350);};
    nm.onkeydown=e=>{if(e.key==='Enter')$('claim').click();};}
  on('claim',async()=>{const b=$('claim');const name=ACC.draft.name;b.disabled=true;b.textContent='Claiming…';
    const r=await claimName(name,ACC.draft.look);
    if(!r.ok){ACC.err=esc(r.msg);b.disabled=false;b.textContent='Claim name & play';render();const n=$('nm');if(n)n.focus();return;}
    ACC.err='';const me=ACC.me;finish(Object.assign({},me.save.data,{name:me.hero.name,look:me.hero.look,wallet:me.wallet}),true,me.save.rev);});
  on('cancelEd',()=>{ACC.edit=false;box.hidden=true;stopPreview();window.LH.resume();});
  on('saveEd',()=>{ACC.edit=false;box.hidden=true;stopPreview();window.LH.setLook(ACC.draft.look);api('hero',{method:'PATCH',body:{look:ACC.draft.look}});});
  if($('pv'))startPreview();
}

// ---------- in-game account links: wallet, Google, X ----------
window.ACC={open(){document.documentElement.classList.add('pre');box.hidden=false;go('welcome',{err:''});},
  editLook(name,look){document.documentElement.classList.add('pre');ACC.edit=true;ACC.draft={name,look:Object.assign({},look)};box.hidden=false;go('creator');},
  xInfo(){return ACC.me&&ACC.me.hero?{enabled:!!ACC.me.xEnabled,username:ACC.me.hero.x||null}:null;},
  async xLink(){try{await flushCloud();}catch(e){}location.href='/api/x/start';},
  async xUnlink(){const r=await api('x/unlink',{method:'POST'});if(r.ok&&ACC.me&&ACC.me.hero)ACC.me.hero.x=null;return r.ok;},
  links(){const m=ACC.me||{};return {wallet:m.wallet||null,google:m.google||null,googleEnabled:!!m.googleEnabled,hasWallet:allWallets().length>0};},
  // Google players add a wallet (or a wallet player re-signs): the wallet signs a message for this account.
  async linkWallet(){const l=allWallets();if(!l.length)return {ok:false,msg:'No wallet found in this browser. Open the game in your wallet app’s browser to connect it.'};
    try{const r=await signWithWallet(l[0],'auth/link-wallet');ACC.me=Object.assign(ACC.me,{wallet:r.me.wallet});rememberWallet(l[0]);return {ok:true,addr:r.addr};}
    catch(e){return {ok:false,msg:e&&e.code===4001?'You declined in your wallet.':(e&&e.message)||'Couldn’t connect the wallet.'};}},
  async linkGoogle(){try{await flushCloud();}catch(e){}location.href='/api/auth/google/start?link=1';},
  async logout(){await flushCloud();if(window.NET)NET.stop();await api('auth/logout',{method:'POST'});location.reload();},
  cloudSave,flush:flushCloud,get pid(){return ACC.pid;},online,api};

// ---------- start ----------
render();
{const q=new URLSearchParams(location.search),x=q.get('x'),g=q.get('g');
  if(x){const u=(q.get('u')||'').replace(/[^A-Za-z0-9_]/g,'').slice(0,15);
    const msg={linked:`X account @${u} is now linked to your hero.`,taken:`@${u} is already linked to another hero.`,declined:'You didn’t approve the link on X, so nothing changed.',expired:'That link request expired. Try again from your bag’s Hero tab.',off:'X linking isn’t switched on yet.',error:'Couldn’t link your X account. Try again in a moment.'}[x];
    if(msg){ACC.note=msg;ACC.noteOk=x==='linked';}}
  if(g){const msg={linked:'Google is now linked. You can sign in with it as well as your wallet.',taken:'That Google account already has its own hero.',has:'This account already has a Google account linked.',declined:'Google sign-in was cancelled.',expired:'That sign-in took too long. Try again.',off:'Google sign-in isn’t switched on yet.',banned:'This account is banned.',signin:'Sign in first, then link Google from your bag’s Hero tab.',error:'Google sign-in didn’t work. Try again in a moment.'}[g];
    if(msg){ACC.note=msg;ACC.noteOk=g==='linked';}}
  if(x||g)history.replaceState(null,'',location.pathname);}
try{const n=sessionStorage.getItem('lanternhold.notice');if(n){sessionStorage.removeItem('lanternhold.notice');ACC.err=esc(n);}}catch(e){}
api('config').then(r=>{if(r.ok){ACC.cfg=r.data;const m=r.data.main;let last=0;try{last=+sessionStorage.getItem('lanternhold.hop')||0;}catch(e){}
  if(m&&/^[a-z0-9.-]+\.[a-z]{2,}$/.test(m)&&m!==location.host&&Date.now()-last>60000){try{sessionStorage.setItem('lanternhold.hop',String(Date.now()));}catch(e){}location.replace('https://'+m+location.pathname+location.search+location.hash);return;}if(ACC.screen==='welcome'&&!box.hidden)render();}});
api('me').then(async r=>{if(!(r.ok&&r.data.account))return render();
  if(r.data.wallet&&signedInWithWallet()){
    await new Promise(res=>setTimeout(res,300)); // let wallets announce themselves
    const pv=savedWalletProvider();let now=[];if(pv)try{now=(await pv.request({method:'eth_accounts'}))||[];}catch(e){}
    const cur=String(now[0]||'').toLowerCase();
    if(cur&&cur!==r.data.wallet){await api('auth/logout',{method:'POST'});ACC.err=esc('Your wallet is now on '+short(cur)+', not '+short(r.data.wallet)+', so you were signed out. Connect to sign in with the wallet you have open.');return render();}
    watchWallet(pv);}
  ACC.me=r.data;render();});
})();
