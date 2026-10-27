// Bitmap pixel fonts (rasterised from Press Start 2P and Silkscreen, both OFL) so text is crisp at any scale
const BFONT={big:{h:8,g:{"0":[7,28,38,99,99,99,50,28,0],"1":[6,12,28,12,12,12,12,63,0],"2":[7,62,99,7,30,60,112,127,0],"3":[7,63,6,12,30,3,99,62,0],"4":[7,14,30,54,102,127,6,6,0],"5":[7,126,96,126,3,3,99,62,0],"6":[7,30,48,96,126,99,99,62,0],"7":[7,127,99,6,12,24,24,24,0],"8":[7,60,98,114,60,79,67,62,0],"9":[7,62,99,99,63,3,6,60,0]," ":[4],"!":[3,7,7,7,6,6,0,6,0],"\"":[5,27,27,27,0,0,0,0,0],"#":[7,54,127,54,54,54,127,54,0],"$":[7,8,62,104,62,11,126,8,0],"%":[7,49,82,100,8,19,37,70,0],"&":[7,56,108,108,56,109,102,63,0],"'":[2,3,3,3,0,0,0,0,0],"(":[4,3,6,12,12,12,6,3,0],")":[4,12,6,3,3,3,6,12,0],"*":[7,0,54,28,127,28,54,0,0],"+":[6,0,12,12,63,12,12,0,0],",":[3,0,0,0,0,0,3,3,6],"-":[6,0,0,0,63,0,0,0,0],".":[2,0,0,0,0,0,3,3,0],"/":[7,1,2,4,8,16,32,64,0],":":[2,0,3,3,0,3,3,0,0],";":[3,0,3,3,0,3,3,6,0],"<":[5,3,6,12,24,12,6,3,0],"=":[7,0,0,127,0,127,0,0,0],">":[5,24,12,6,3,6,12,24,0],"?":[7,62,127,99,6,28,0,28,0],"@":[7,62,65,93,85,95,64,62,0],"A":[7,28,54,99,99,127,99,99,0],"B":[7,126,99,99,126,99,99,126,0],"C":[7,30,51,96,96,96,51,30,0],"D":[7,124,102,99,99,99,102,124,0],"E":[7,127,96,96,126,96,96,127,0],"F":[7,127,96,96,126,96,96,96,0],"G":[7,31,48,96,103,99,51,31,0],"H":[7,99,99,99,127,99,99,99,0],"I":[6,63,12,12,12,12,12,63,0],"J":[7,3,3,3,3,3,99,62,0],"K":[7,99,102,108,120,124,110,103,0],"L":[6,48,48,48,48,48,48,63,0],"M":[7,99,119,127,107,107,99,99,0],"N":[7,99,115,123,111,103,99,99,0],"O":[7,62,99,99,99,99,99,62,0],"P":[7,126,99,99,99,126,96,96,0],"Q":[7,62,99,99,99,111,102,61,0],"R":[7,126,99,99,103,124,110,103,0],"S":[7,62,99,96,62,3,99,62,0],"T":[6,63,12,12,12,12,12,12,0],"U":[7,99,99,99,99,99,99,62,0],"V":[7,99,99,99,119,62,28,8,0],"W":[7,107,107,107,107,127,119,34,0],"X":[7,99,99,54,28,54,99,99,0],"Y":[6,51,51,51,30,12,12,12,0],"Z":[7,127,7,14,28,56,112,127,0],"[":[4,15,12,12,12,12,12,15,0],"\\":[7,64,32,16,8,4,2,1,0],"]":[4,15,3,3,3,3,3,15,0],"^":[5,14,27,0,0,0,0,0,0],"_":[7,0,0,0,0,0,0,0,127],"`":[2,2,1,0,0,0,0,0,0],"a":[7,0,0,62,3,63,99,63,0],"b":[7,96,96,126,99,99,99,62,0],"c":[7,0,0,63,96,96,96,63,0],"d":[7,3,3,63,99,99,99,63,0],"e":[7,0,0,62,99,127,96,62,0],"f":[6,7,12,63,12,12,12,12,0],"g":[7,0,0,63,99,99,63,3,62],"h":[7,96,96,126,99,99,99,99,0],"i":[6,12,0,28,12,12,12,63,0],"j":[5,3,0,7,3,3,3,3,30],"k":[7,96,96,99,102,124,102,99,0],"l":[6,28,12,12,12,12,12,63,0],"m":[7,0,0,126,91,91,91,91,0],"n":[7,0,0,126,99,99,99,99,0],"o":[7,0,0,62,99,99,99,62,0],"p":[7,0,0,126,99,99,126,96,96],"q":[7,0,0,63,99,99,63,3,3],"r":[6,0,0,55,56,48,48,48,0],"s":[7,0,0,62,96,62,3,126,0],"t":[6,12,12,63,12,12,12,12,0],"u":[7,0,0,99,99,99,99,63,0],"v":[6,0,0,51,51,51,30,12,0],"w":[7,0,0,107,107,107,107,54,0],"x":[7,0,0,99,54,28,54,99,0],"y":[7,0,0,99,99,99,63,3,62],"z":[7,0,0,127,14,28,56,127,0],"{":[4,3,6,6,12,6,6,3,0],"|":[2,3,3,3,3,3,3,3,0],"}":[4,12,6,6,3,6,6,12,0],"~":[7,0,0,56,93,14,0,0,0]}},small:{h:7,g:{"0":[4,0,6,9,9,9,6,0],"1":[3,0,6,2,2,2,7,0],"2":[4,0,14,1,6,8,15,0],"3":[4,0,14,1,6,1,14,0],"4":[4,0,10,10,15,2,2,0],"5":[4,0,15,8,14,1,14,0],"6":[4,0,6,8,14,9,6,0],"7":[4,0,15,1,2,4,4,0],"8":[4,0,6,9,6,9,6,0],"9":[4,0,6,9,7,1,6,0]," ":[2],"!":[1,0,1,1,1,0,1,0],"\"":[3,0,5,5,0,0,0,0],"#":[5,0,10,31,10,31,10,0],"$":[4,2,7,8,6,1,14,4],"%":[5,0,26,26,4,11,11,0],"&":[4,2,7,8,6,8,7,2],"'":[1,0,1,1,0,0,0,0],"(":[2,0,1,2,2,2,1,0],")":[2,0,2,1,1,1,2,0],"*":[5,0,4,21,14,21,4,0],"+":[5,0,4,4,31,4,4,0],",":[2,0,0,0,0,0,1,2],"-":[3,0,0,0,7,0,0,0],".":[1,0,0,0,0,0,1,0],"/":[3,0,1,1,2,4,4,0],":":[1,0,0,1,0,1,0,0],";":[2,0,0,1,0,1,2,0],"<":[3,0,1,2,4,2,1,0],"=":[3,0,0,7,0,7,0,0],">":[3,0,4,2,1,2,4,0],"?":[4,0,14,1,6,0,4,0],"@":[5,0,14,21,22,16,14,0],"A":[4,0,6,9,15,9,9,0],"B":[4,0,14,9,15,9,14,0],"C":[4,0,6,9,8,9,6,0],"D":[4,0,14,9,9,9,14,0],"E":[3,0,7,4,7,4,7,0],"F":[3,0,7,4,7,4,4,0],"G":[4,0,7,8,11,9,6,0],"H":[4,0,9,9,15,9,9,0],"I":[1,0,1,1,1,1,1,0],"J":[4,0,1,1,1,9,6,0],"K":[4,0,9,10,12,10,9,0],"L":[3,0,4,4,4,4,7,0],"M":[5,0,17,27,21,17,17,0],"N":[5,0,17,25,21,19,17,0],"O":[4,0,6,9,9,9,6,0],"P":[4,0,14,9,14,8,8,0],"Q":[4,0,6,9,9,9,6,1],"R":[4,0,14,9,14,10,9,0],"S":[4,0,7,8,6,1,14,0],"T":[3,0,7,2,2,2,2,0],"U":[4,0,9,9,9,9,6,0],"V":[5,0,17,17,10,10,4,0],"W":[5,0,17,21,21,21,10,0],"X":[5,0,17,10,4,10,17,0],"Y":[5,0,17,10,4,4,4,0],"Z":[3,0,7,1,2,4,7,0],"[":[2,0,3,2,2,2,3,0],"\\":[3,0,4,4,2,1,1,0],"]":[2,0,3,1,1,1,3,0],"^":[3,2,5,0,0,0,0,0],"_":[4,0,0,0,0,0,0,15],"`":[2],"a":[4,0,6,9,15,9,9,0],"b":[4,0,14,9,15,9,14,0],"c":[4,0,6,9,8,9,6,0],"d":[4,0,14,9,9,9,14,0],"e":[3,0,7,4,7,4,7,0],"f":[3,0,7,4,7,4,4,0],"g":[4,0,7,8,11,9,6,0],"h":[4,0,9,9,15,9,9,0],"i":[1,0,1,1,1,1,1,0],"j":[4,0,1,1,1,9,6,0],"k":[4,0,9,10,12,10,9,0],"l":[3,0,4,4,4,4,7,0],"m":[5,0,17,27,21,17,17,0],"n":[5,0,17,25,21,19,17,0],"o":[4,0,6,9,9,9,6,0],"p":[4,0,14,9,14,8,8,0],"q":[4,0,6,9,9,9,6,1],"r":[4,0,14,9,14,10,9,0],"s":[4,0,7,8,6,1,14,0],"t":[3,0,7,2,2,2,2,0],"u":[4,0,9,9,9,9,6,0],"v":[5,0,17,17,10,10,4,0],"w":[5,0,17,21,21,21,10,0],"x":[5,0,17,10,4,10,17,0],"y":[5,0,17,10,4,4,4,0],"z":[3,0,7,1,2,4,7,0],"{":[3,0,3,2,4,2,3,0],"|":[1,1,1,1,1,1,1,1],"}":[3,0,6,2,1,2,6,0],"~":[4,0,5,10,0,0,0,0]}},tiny:{h:5,g:{"A":[3,2,5,7,5,5],"B":[3,6,5,6,5,6],"C":[3,3,4,4,4,3],"D":[3,6,5,5,5,6],"E":[3,7,4,6,4,7],"F":[3,7,4,6,4,4],"G":[3,3,4,5,5,3],"H":[3,5,5,7,5,5],"I":[3,7,2,2,2,7],"J":[3,1,1,1,5,2],"K":[3,5,5,6,5,5],"L":[3,4,4,4,4,7],"M":[5,17,27,21,17,17],"N":[4,9,13,11,9,9],"O":[3,2,5,5,5,2],"P":[3,6,5,6,4,4],"Q":[3,2,5,5,6,3],"R":[3,6,5,6,5,5],"S":[3,3,4,2,1,6],"T":[3,7,2,2,2,2],"U":[3,5,5,5,5,3],"V":[3,5,5,5,2,2],"W":[5,17,17,21,27,17],"X":[3,5,5,2,5,5],"Y":[3,5,5,2,2,2],"Z":[3,7,1,2,4,7],"0":[3,7,5,5,5,7],"1":[3,2,6,2,2,7],"2":[3,6,1,2,4,7],"3":[3,6,1,2,1,6],"4":[3,5,5,7,1,1],"5":[3,7,4,6,1,6],"6":[3,3,4,7,5,7],"7":[3,7,1,2,2,2],"8":[3,7,5,7,5,7],"9":[3,7,5,7,1,6],"(":[2,1,2,2,2,1],")":[2,2,1,1,1,2],"_":[3,0,0,0,0,7],"-":[3,0,0,7,0,0],"?":[3,6,1,2,0,2],".":[1,0,0,0,0,1]," ":[2,0,0,0,0,0],"'":[1,1,1,0,0,0],"/":[3,1,1,2,4,4],":":[1,0,1,0,1,0],"a":[3,2,5,7,5,5],"b":[3,6,5,6,5,6],"c":[3,3,4,4,4,3],"d":[3,6,5,5,5,6],"e":[3,7,4,6,4,7],"f":[3,7,4,6,4,4],"g":[3,3,4,5,5,3],"h":[3,5,5,7,5,5],"i":[3,7,2,2,2,7],"j":[3,1,1,1,5,2],"k":[3,5,5,6,5,5],"l":[3,4,4,4,4,7],"m":[5,17,27,21,17,17],"n":[4,9,13,11,9,9],"o":[3,2,5,5,5,2],"p":[3,6,5,6,4,4],"q":[3,2,5,5,6,3],"r":[3,6,5,6,5,5],"s":[3,3,4,2,1,6],"t":[3,7,2,2,2,2],"u":[3,5,5,5,5,3],"v":[3,5,5,5,2,2],"w":[5,17,17,21,27,17],"x":[3,5,5,2,5,5],"y":[3,5,5,2,2,2],"z":[3,7,1,2,4,7]}}};
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
  ember:{tun:PAL.red,tun2:PAL.plum,trim:PAL.ember},
  steel:{tun:'#7d8fa3',tun2:'#3e4a5c',trim:'#c9d6e3'}
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
const ARMOR={copper:{m:PAL.orange,m2:PAL.rust,hi:PAL.yellow},iron:{m:PAL.silver,m2:PAL.slate,hi:PAL.white},ember:{m:PAL.red,m2:PAL.plum,hi:PAL.ember},steel:{m:'#7d8fa3',m2:'#3e4a5c',hi:'#c9d6e3'}};
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
  if(dir==='down'){p.set(6,15-lf,sole).set(10,15-rf,sole);}
  // long hair and tails behind the body
  backHair(p,dir,style,hair,hair2,hairHi,set,rect);
  // tunic: shaded side, a lighter front panel, a hem, a neckline
  p.rect(4,8,8,5,tun).rect(4,12,8,1,tun2).rect(4,8,1,5,tun2);p.rect(11,9,1,3,shade(tun,.84));
  if(dir==='down'){p.rect(6,9,4,2,tunHi);p.rect(7,8,2,1,face2);p.set(6,8,trim).set(9,8,trim);p.rect(7,9,2,2,trim);p.set(7,10,tun2).set(8,10,tun2);}
  else if(dir==='up'){p.rect(5,8,6,1,tun2);p.rect(6,9,4,2,tunHi);}
  else{rect(5,9,4,2,tunHi);set(5,8,trim);}
  // armor over the clothes
  if(A){p.rect(5,8,6,3,A.m).rect(5,10,6,1,A.m2);p.set(4,8,A.m2).set(11,8,A.m2);if(dir==='down'){p.rect(6,8,4,1,A.hi);p.set(7,9,A.hi);}else p.rect(5,8,6,1,A.hi);p.set(10,9,A.m2);}
  // belt with a buckle that catches the light
  p.rect(4,11,8,1,boot);if(dir==='down'){p.set(7,11,PAL.gold).set(8,11,PAL.yellow);}else if(dir!=='up')set(5,11,PAL.yellow);
  // arms: sleeve, cuff, hand
  const sl=A?A.m2:tun2,cuff=A?A.m:tun;
  if(side){rect(6,9,2,3,sl);set(6,9,cuff);set(6,12,face);set(7,12,face2);}
  else{p.rect(3,9,1,3,sl).rect(12,9,1,3,sl);p.set(3,9,cuff).set(12,9,shade(cuff,.85));p.set(3,12,face).set(12,12,face2);}
  // head
  if(style==='hood'){hoodHead(p,dir,tun,face,face2);}
  else{
    p.ell(8,5,4.2,4,hair);
    if(dir==='down'){
      p.rect(5,4,6,4,face).rect(5,7,6,1,face2);p.set(5,4,face2).set(10,4,face2);
      p.set(6,5,PAL.ink).set(9,5,PAL.ink);p.set(6,4,hair2).set(9,4,hair2);                       // eyes and brows
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
    frontHair(p,dir,style,hair,hair2,hairHi,set,rect);
  }
  // helmet on top of the head
  const HM={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d'],steel:['#7d8fa3','#3e4a5c','#c9d6e3'],star:['#2c3f86','#1a1c4c','#ffe9a8']}[look.helm];
  if(HM){p.ell(8,4,4.4,2.6,HM[0]);p.rect(4,5,8,1,HM[1]);p.set(6,2,HM[2]).set(7,2,HM[2]);if(dir==='down'||dir==='up')p.rect(7,1,2,1,HM[1]);if(dir==='down'){p.rect(5,4,6,1,HM[1]);}}
  if(look.helm==='star'){p.rect(7,0,2,2,'#ffe9a8');p.set(7,0,'#fff3c4');p.set(6,1,'#73eff7').set(9,1,'#73eff7');if(dir==='down')p.set(6,4,'#73eff7').set(9,4,'#73eff7');}
  if(look.helm==='partyhat'){p.rect(5,1,6,2,'#3b5dc9');p.set(6,1,'#73eff7').set(9,2,'#73eff7');p.rect(4,3,8,1,'#29366f');}
  if(look.helm==='greenhat'){p.rect(5,1,6,2,'#38b764');p.set(6,1,'#a7f070').set(9,2,'#a7f070');p.rect(4,3,8,1,'#257179');}
  p.outline();
  return p.canvas();
}
const FEM_STYLES=['long','pigtails','ponytail','bun','bob'];
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
function heroImg(look,dir,frame){const k=[look.skin,look.hair,look.cloth,look.style,look.armor||'none',look.cape||'',look.helm||'',dir,frame].join('|');return HERO_CACHE[k]||(HERO_CACHE[k]=heroFrame(dir,frame,look));}
// lantern carried by the hero (drawn separately so its glow can pulse)
function lanternSprite(key,flame){const L=LANTERNS[key]||LANTERNS.basic,m=L.metal,gl=flame||L.glow,p=new Px(6,8);   // flame: the Founder's Flame colour
  p.rect(2,0,2,1,m).rect(1,1,4,1,m).rect(1,2,4,4,gl).rect(2,3,2,2,PAL.white).rect(1,6,4,1,m);if(L.r==='legendary'||L.r==='mythic'||L.r==='xrare')p.set(0,3,gl).set(5,3,gl);p.outline();return p.canvas();}
function swordSprite(tier){if(tier==='cinder')return cinderSprite();const p=new Px(16,16);const blade=tier==='ember'?PAL.ember:tier==='iron'?PAL.white:tier==='copper'?PAL.orange:tier==='steel'?'#c9d6e3':PAL.silver;
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
  star:{floor:['#1a1c4c','#2c3f86','#4a6fd0'],wall:['#0a0c22','#2c3f86','#73eff7'],accent:'#73eff7',light:'#b8f7ff',name:'Starfall Hollow'}
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
        brick:['#2c3566','#28305e','#323c70'],bhi:'#4a5896',blo:'#1a1f44',bmortar:'#0e1028',cap:'#5a68a8'}};
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
function oreSprite(kind){const c={copper:[PAL.orange,PAL.yellow],iron:[PAL.silver,PAL.white],ember:[PAL.ember,PAL.red],coal:['#14141c','#6d7391'],cobalt:['#3b5dc9','#73eff7']}[kind];const p=new Px(16,16);
  if(kind==='coal'){[[4,5],[10,4],[7,10],[12,11],[3,12],[9,7]].forEach(([x,y])=>{p.rect(x,y,3,2,c[0]);p.set(x+1,y,c[1]);});return p.canvas();}
  if(kind==='cobalt'){[[4,6],[10,4],[7,10],[12,11]].forEach(([x,y])=>{p.rect(x,y,2,3,c[0]);p.set(x,y,c[1]).set(x+1,y-1,c[1]);});p.set(3,12,c[1]);return p.canvas();}
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
    case 'coal_ore':p.ell(8,9,5,4,'#1d1d24');p.ell(7,8,3,2,'#2e2f3a');p.set(6,7,'#8d93ad').set(10,10,'#6d7391').set(9,7,'#6d7391');break;
    case 'cobalt_ore':ore('#3b5dc9','#73eff7');p.set(9,7,'#b8f7ff');break;
    case 'starshard_ore':p.rows(3,3,['....s....','...sws...','..swWws..','sswWWWwss','..swWws..','...sws...','....s....'],{s:'#ffe9a8',w:'#fff3c4',W:'#ffffff'});p.set(3,12,'#73eff7').set(12,4,'#73eff7');p.outline('#3d2f52');return p.canvas();
    case 'pickaxe':p.line(4,13,11,6,PAL.wood).line(5,13,12,6,PAL.bark);p.rows(6,2,['.ssss....','s....ss..','.......s.','........s'],{s:'#94b0c2'});p.set(6,3,'#c9d6e3').set(14,6,'#566c86');break;
    case 'relic_heart':p.ell(8,9,5,5,'#7a1c2c');p.ell(8,9,3.6,3.6,PAL.red);p.ell(8,9,2,2,PAL.ember);p.set(8,9,PAL.yellow);p.line(3,4,5,6,'#3e272b').line(13,4,11,6,'#3e272b');p.set(6,7,'#ffcd75');break;
    case 'relic_star':p.rows(2,2,['.....s.....','.....s.....','....sws....','sssswWwssss','..swWWWws..','...swWws...','..sws.sws..','.ss.....ss.'],{s:'#ffe9a8',w:'#fff3c4',W:'#ffffff'});p.ell(8,13,4,1.5,'#4a6fd0');break;
    case 'star_helm':p.ell(8,8,6,5,'#2c3f86');p.rect(2,8,12,5,'#2c3f86');p.rect(2,12,12,1,'#1a1c4c');p.rect(5,9,6,2,PAL.ink);p.set(6,9,'#73eff7').set(9,9,'#73eff7');p.rect(7,9,2,4,'#2c3f86');
      p.rows(5,0,['...s..','..sws.','.sswss','..s.s.'],{s:'#ffe9a8',w:'#ffffff'});p.set(3,7,'#4a6fd0').set(12,7,'#4a6fd0');break;
    case 'ember_ore':p.ell(8,9,5,4,'#2b1620');p.ell(7,8,3,2,'#45202c');p.line(4,10,7,8,PAL.red).line(7,8,11,10,PAL.red).line(7,8,8,5,PAL.red);p.line(5,9,7,8,PAL.ember).line(8,8,10,9,PAL.ember);p.set(7,8,PAL.yellow).set(10,9,PAL.yellow);p.outline('#120a10');break;
    case 'gem':p.rows(4,3,['..cc..','.cbbc.','cbbbac','cbbaac','.caac.','..cc..','......'],{c:PAL.sky,b:PAL.cyan,a:PAL.blue});p.set(6,4,PAL.white);break;
    case 'slime_gel':p.ell(8,10,5,4,PAL.green);p.ell(7,9,2,1.5,PAL.lime);p.set(6,8,PAL.white);break;
    case 'blackwood_logs':p.rect(2,8,12,4,'#2a1e22');p.rect(2,8,12,1,'#4a3640');p.rect(4,4,11,4,'#2a1e22');p.rect(4,4,11,1,'#4a3640');p.ell(3,10,2,2,'#7a5ca8');p.set(3,10,'#3d2f52');p.ell(14,6,2,2,'#7a5ca8');p.set(14,6,'#3d2f52');break;
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
    case 'copper_helm':case 'iron_helm':case 'ember_helm':case 'steel_helm':{const C={copper:['#ef7d57','#8f4a2b','#ffcd75'],iron:['#94b0c2','#566c86','#f4f4f4'],ember:['#b13e53','#5d275d','#ff9f3d'],steel:['#7d8fa3','#3e4a5c','#c9d6e3']}[id.split('_')[0]];
      p.ell(8,8,6,5,C[0]);p.rect(2,8,12,5,C[0]);p.rect(2,12,12,1,C[1]);p.rect(5,9,6,2,PAL.ink);p.rect(7,9,2,4,C[0]);p.rect(6,4,4,1,C[2]);p.rect(7,2,2,3,C[1]);break;}
    case 'partyhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#3b5dc9',s:'#73eff7',c:'#29366f'});p.set(7,1,PAL.yellow);break;
    case 'greenhat_helm':p.rows(3,1,['....yy....','....bb....','...bsbb...','...bbbs...','..bbsbbb..','..sbbbbs..','.bbbbsbbb.','.bbsbbbbb.','bbbbbbsbbb','bbbbbbbbbb','cccccccccc'],{y:PAL.gold,b:'#38b764',s:'#a7f070',c:'#257179'});p.set(7,1,PAL.yellow);break;
    case 'traveler_garb':p.rect(4,4,8,10,PAL.teal);p.rect(2,4,3,4,PAL.moss).rect(11,4,3,4,PAL.moss);p.rect(6,4,4,2,PAL.ink);p.rect(4,11,8,1,PAL.bark);p.rect(7,6,2,5,PAL.green);break;
    case 'copper_blade':case 'iron_blade':case 'ember_blade':case 'steel_blade':case 'cinder_blade':{const t=id.split('_')[0];return swordSprite(t);}
    case 'copper_mail':case 'iron_mail':case 'ember_mail':case 'steel_mail':{const t=id.split('_')[0],C=TIER_COLORS[t==='ember'?'ember':t];
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

// ---------- build the atlas ----------
const ART={};
function buildArt(){
  const dirs=['down','up','left','right'];
  
  ART.lantern={};for(const t of Object.keys(LANTERNS))ART.lantern[t]=lanternSprite(t);ART.lantern.none=ART.lantern.basic;
  ART.lanternF={};for(const t of Object.keys(LANTERNS))ART.lanternF[t]=lanternSprite(t,'#b98cff');
  ART.sword={};for(const t of ['rusty','copper','iron','ember','steel','cinder'])ART.sword[t]=swordSprite(t==='rusty'?'none':t);
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
  ART.ore={copper:oreSprite('copper'),iron:oreSprite('iron'),ember:emberOreSprite(0),coal:oreSprite('coal'),cobalt:oreSprite('cobalt'),starshard:starOreSprite(0)};ART.emberOre=[emberOreSprite(0),emberOreSprite(1)];ART.starOre=[starOreSprite(0),starOreSprite(1)];
  ART.cinders=[0,1].map(cindersSprite);ART.crystal=[0,1].map(crystalSprite);
  ART.glowcap=glowcapSprite();ART.bones=bonesSprite();
  ART.partyhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#3b5dc9',s:'#73eff7',c:'#29366f'});q.outline();return q.canvas();})();
  ART.greenhat=(()=>{const q=new Px(10,12);q.rows(0,0,['....yy....','....yy....','....bb....','...bsb....','...bbbs...','..sbbbb...','..bbbsbb..','.bbsbbbbs.','.bbbbbbbb.','bsbbbbsbbb','cccccccccc'],{y:'#f7c64a',b:'#38b764',s:'#a7f070',c:'#257179'});q.outline();return q.canvas();})();
  ART.tree=treeSprite();ART.crown=crownSprite();ART.crownS=crownSmall();ART.treeSway=[treeSprite(-.6),treeSprite(.6)];ART.stump=stumpSprite();ART.axe=axeSprite();ART.house=houseSprite();ART.bank=bankSprite();ART.forge=[0,1].map(forgeSprite);ART.kitchen=[0,1].map(kitchenSprite);
  ART.press=pressSprite();ART.board=boardSprite();ART.gate=[gateSprite(0),gateSprite(1)];ART.merchant=[merchantSprite(0),merchantSprite(1)];ART.wick=[wickSprite(0),wickSprite(1)];ART.stall=stallSprite();ART.sign=signSprite();ART.barricade=barricadeSprite();ART.lanternPost=[lanternPost(0),lanternPost(1)];ART.fence=fenceSprite();ART.well=wellSprite();
  ART.flowers=[PAL.pink,PAL.white,PAL.yellow,PAL.sky].map(flowerSprite);
  ART.wgrass=[41,42,43,44].map(wildGrassTile);ART.wpath=[45,46,47].map(wildPathTile);ART.gloom=[0,1].map(gloomTile);
  ART.wwall={};for(const e of ['',  'l','r'])for(const v of [0,1,2])ART.wwall[e+v]=wildWallSprite(v,e||null);
  ART.deadtree=[0,1].map(deadTreeSprite);ART.bwTree=blackwoodSprite();ART.bwSway=[blackwoodSprite(-.6),blackwoodSprite(.6)];
  ART.rock=[0,1].map(rockSprite);ART.grave=[0,1,2].map(graveSprite);ART.pillar=[0,1].map(pillarSprite);ART.obelisk=[0,1].map(obeliskSprite);
  ART.skullpost=skullPostSprite();ART.wsign=wildSignSprite();ART.wbones=[0,1,2].map(wildBonesSprite);ART.weed=[0,1,2].map(weedSprite);ART.skull=skullMark();
  ART.crop={};for(const k of ['wheat','lampseed','glowcap'])ART.crop[k]=[0,1,2].map(s=>cropSprite(k,s));
  ART.icon={};
}
function iconOf(id){if(!ART.icon[id])ART.icon[id]=icon(id);return ART.icon[id];}

// ===== Lanternhold content pack (season 0). Expansions add entries here, not code. =====
const ITEMS={
  gold:{n:'Gold',v:1},
  copper_ore:{n:'Copper Ore',v:4},iron_ore:{n:'Iron Ore',v:9},ember_ore:{n:'Emberite Ore',v:30},
  coal_ore:{n:'Coal',v:14},cobalt_ore:{n:'Cobalt Ore',v:45},starshard_ore:{n:'Starshard',v:150},
  gem:{n:'Cave Gem',v:40},slime_gel:{n:'Slime Gel',v:2},bone:{n:'Old Bone',v:3},
  wheat_seed:{n:'Wheat Seed',v:2},lampseed:{n:'Lampseed',v:12},glowcap_spore:{n:'Glowcap Spore',v:6},
  wheat:{n:'Wheat',v:3},glowcap:{n:'Glowcap',v:9},
  logs:{n:'Logs',v:2},blackwood_logs:{n:'Blackwood Logs',v:9},
  bread:{n:'Bread',v:8,heal:30,food:true},stew:{n:'Glowcap Stew',v:20,heal:70,food:true},
  oil:{n:'Oil Flask',v:15,oil:50},
  rusty_blade:{n:'Rusty Blade',v:1,gear:'blade',tier:'rusty'},traveler_garb:{n:'Traveler Garb',v:1,gear:'mail',tier:'none'},
  copper_blade:{n:'Copper Blade',v:60,gear:'blade',tier:'copper'},iron_blade:{n:'Iron Blade',v:160,gear:'blade',tier:'iron'},ember_blade:{n:'Ember Blade',v:520,gear:'blade',tier:'ember'},
  copper_mail:{n:'Copper Mail',v:70,gear:'mail',tier:'copper'},iron_mail:{n:'Iron Mail',v:180,gear:'mail',tier:'iron'},ember_mail:{n:'Ember Mail',v:560,gear:'mail',tier:'ember'},
  raw_pondfin:{n:'Raw Pondfin',v:5},pondfin:{n:'Cooked Pondfin',v:12,heal:35,food:true},burnt_fish:{n:'Burnt Fish',v:0},
  raw_gloomfin:{n:'Raw Gloomfin',v:18},gloomfin:{n:'Cooked Gloomfin',v:40,heal:55,food:true},
  copper_helm:{n:'Copper Helm',v:40,gear:'helm',tier:'copper'},iron_helm:{n:'Iron Helm',v:120,gear:'helm',tier:'iron'},ember_helm:{n:'Ember Helm',v:420,gear:'helm',tier:'ember'},
  steel_blade:{n:'Steel Blade',v:900,gear:'blade',tier:'steel'},steel_helm:{n:'Steel Helm',v:650,gear:'helm',tier:'steel'},steel_mail:{n:'Steel Mail',v:1000,gear:'mail',tier:'steel'},
  // the two rarest finds below floor 10: each boss of floors 11–20 has a tiny chance to drop one
  cinder_blade:{n:'Cinderfang',v:15000,gear:'blade',tier:'cinder',rarity:'mythic'},star_helm:{n:"Starwarden's Helm",v:12000,gear:'helm',tier:'star',rarity:'mythic'},
  partyhat_helm:{n:'Blue Party Hat',v:0,gear:'helm',tier:'partyhat',rarity:'unique',bound:true},
  greenhat_helm:{n:'Green Party Hat',v:0,gear:'helm',tier:'greenhat',rarity:'unique',bound:true},
  relic_crown:{n:'Slime Crown',v:400,relic:true},relic_sigil:{n:"Knight's Sigil",v:900,relic:true},
  relic_heart:{n:'Forge Heart',v:1800,relic:true},relic_star:{n:'Fallen Star',v:3000,relic:true}
};
const GEAR={
  blade:{rusty:{dmg:6,n:'Rusty Blade'},copper:{dmg:10},iron:{dmg:16},ember:{dmg:25},steel:{dmg:34},cinder:{dmg:46}},
  mail:{none:{def:0,n:'Traveler Garb'},copper:{def:2},iron:{def:4},ember:{def:7},steel:{def:10}},
  helm:{copper:{def:1},iron:{def:2},ember:{def:4},steel:{def:5},star:{def:9},partyhat:{def:25},greenhat:{def:25}}
};
// Helmets can carry attributes like capes. The Blue Party Hat is one of one: admin only, never drops, can't be sold or dropped.
const HELM_ATTR={star:{hp:25,light:15,luck:10},partyhat:{dmg:900,hp:500,spd:25,light:40,luck:50},greenhat:{dmg:900,hp:500,spd:25,light:40,luck:50}};
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
const SKILLS={farming:{n:'Farming',icon:'wheat',c:'#a7f070'},fishing:{n:'Fishing',icon:'raw_pondfin',c:'#41a6f6'},cooking:{n:'Cooking',icon:'pondfin',c:'#ef7d57'},smithing:{n:'Smithing',icon:'copper_blade',c:'#94b0c2'},woodcutting:{n:'Woodcutting',icon:'logs',c:'#a0663b'},mining:{n:'Mining',icon:'pickaxe',c:'#c9a26b'}};
// the skills combat level was built from before Mining (saves from then keep the level they had: see cbFloor)
const SKILLS_V096=['farming','fishing','cooking','smithing','woodcutting'];
const FIGHT_MAX=99;   // Fighting tops out at 99 like every other skill
const XP_TABLE=(()=>{const t=[0,0];let p=0;for(let l=1;l<99;l++){p+=Math.floor(l+300*Math.pow(2,l/7));t.push(Math.floor(p/4));}return t;})();
const levelFor=xp=>{let l=1;while(l<99&&xp>=XP_TABLE[l+1])l++;return l;};
// Combat level: built from everything you do. Fighting (XP from monsters) counts double, and every other skill adds its
// level: (2 × Fighting + all skill levels) ÷ (2 + number of skills). A new hero is combat level 1; combat level 10 takes
// a mix like Fighting 16 with your skills around 8, so the whitelist for the Founder's Lantern is earned.
const combatFrom=(fight,skills,keys)=>{const ks=keys||Object.keys(SKILLS);fight=Math.min(FIGHT_MAX,fight);return Math.max(1,Math.min(200,Math.floor((2*fight+ks.reduce((a,k)=>a+levelFor((skills||{})[k]||0),0))/(2+ks.length))));};
// ---------- fish: one species per map. Expansions add new waters and fish ----------
const FISH={pondfin:{n:'Pondfin',lvl:1,xp:10,item:'raw_pondfin'},gloomfin:{n:'Gloomfin',lvl:15,xp:30,item:'raw_gloomfin'}};
const WATERS={hold:{n:'Hold Lake',fish:['pondfin']},wild:{n:'Gloom Pond',fish:['gloomfin'],lvl:15}};
// ---------- trees: shared by everyone in the world. Each holds a stack of logs, falls when it runs out, then regrows ----------
// Expansions add new trees per area: the higher the level, the fewer logs and the longer the regrow. Logs feed a future skill.
// Keep logs/regrow in step with TREE_TYPES in realtime/src/index.js (the server keeps the shared count).
// regenDelay/regenEvery (s): a partly cut tree left alone for regenDelay grows back 1 log every regenEvery.
const TREES={oak:{n:'Oak Tree',lvl:1,xp:3,logs:300,regrow:20,regenDelay:15,regenEvery:2,item:'logs'},
  // the Wilderness: fewer logs, slower to regrow, much more xp
  blackwood:{n:'Blackwood Tree',lvl:15,xp:9,logs:60,regrow:45,regenDelay:20,regenEvery:6,item:'blackwood_logs'}};
// ---------- ore veins in the Depths: Mining level to mine, XP per vein, hits to break ----------
const ORES={copper:{n:'Copper',lvl:1,xp:20,hp:3},iron:{n:'Iron',lvl:10,xp:35,hp:3},coal:{n:'Coal',lvl:20,xp:50,hp:4},
  ember:{n:'Emberite',lvl:25,xp:80,hp:4},cobalt:{n:'Cobalt',lvl:30,xp:100,hp:4},starshard:{n:'Starshard',lvl:40,xp:160,hp:5}};
const RECIPES={
  forge:[
    {out:'copper_blade',need:{copper_ore:6},gold:20,lvl:1,xp:60},{out:'copper_helm',need:{copper_ore:4},gold:10,lvl:3,xp:45},{out:'copper_mail',need:{copper_ore:8,slime_gel:4},gold:20,lvl:6,xp:90},
    {out:'iron_blade',need:{iron_ore:6,copper_ore:2},gold:60,lvl:10,xp:150},{out:'iron_helm',need:{iron_ore:4,bone:3},gold:40,lvl:12,xp:120},{out:'iron_mail',need:{iron_ore:8,bone:6},gold:60,lvl:14,xp:220},
    {out:'ember_blade',need:{ember_ore:4,gem:2},gold:200,lvl:25,xp:400},{out:'ember_helm',need:{ember_ore:3,gem:1},gold:150,lvl:28,xp:320},{out:'ember_mail',need:{ember_ore:6,gem:2},gold:200,lvl:32,xp:550},
    {out:'steel_helm',need:{iron_ore:4,coal_ore:6},gold:300,lvl:35,xp:650},{out:'steel_blade',need:{iron_ore:6,coal_ore:8,cobalt_ore:2},gold:450,lvl:38,xp:850},{out:'steel_mail',need:{iron_ore:8,coal_ore:10,cobalt_ore:4},gold:500,lvl:42,xp:1100}
  ],
  // time: seconds per item at the Kitchen. Fish take longer the better they are: 2 s + 0.05 s per Fishing level the fish needs.
  kitchen:[{out:'bread',need:{wheat:2},lvl:1,xp:6,time:1.5},{out:'pondfin',need:{raw_pondfin:1},lvl:1,xp:10,fish:'pondfin',burn:{chance:.45,safeAt:30,out:'burnt_fish'}},{out:'stew',need:{glowcap:1,wheat:1},lvl:5,xp:16,time:3},
    {out:'gloomfin',need:{raw_gloomfin:1},lvl:15,xp:30,fish:'gloomfin',burn:{chance:.5,safeAt:50,out:'burnt_fish'}}],
  press:[{out:'oil',n:2,need:{lampseed:1}}]
};
// growth in seconds (demo speed). Live: 30 min to 8 h.
const CROPS={
  wheat:{seed:'wheat_seed',grow:45,yield:[3,4],out:'wheat',n:'Wheat',lvl:1,plantXp:2,xp:4},
  lampseed:{seed:'lampseed',grow:70,yield:[2,3],out:'lampseed',n:'Lampseed',lvl:3,plantXp:5,xp:7},
  glowcap:{seed:'glowcap_spore',grow:100,yield:[2,3],out:'glowcap',n:'Glowcap',lvl:6,plantXp:8,xp:11}
};
// Farm plots: 12 squares (2 rows of 6). Everyone starts with 4; more open with Farming levels or for gold (each purchase costs more).
const PLOT_BASE=4,PLOT_MAX=12,PLOT_LVLS=[5,10,15,20,30,40,50,60],PLOT_BUYS=[750,1500,3000,5000,8000,12000,18000,25000];
const plotCap=(farmLvl,buys)=>Math.min(PLOT_MAX,PLOT_BASE+PLOT_LVLS.filter(l=>farmLvl>=l).length+buys);
// saves from before the 12-square farm had 6 two-square plots: keep their crops and give them 6 squares (2 bought)
function cleanPlots(o,now){const P0=Array.isArray(o.plots)?o.plots:[],legacy=o.plotBuys===undefined&&P0.length===6,ok=p=>p&&typeof p==='object'&&CROPS[p.crop];
  const v=p=>({crop:p.crop,t0:Math.min(now,Math.max(0,Number(p.t0)||now))});
  const plots=Array(PLOT_MAX).fill(null);if(legacy){let k=0;for(const p of P0)if(ok(p))plots[k++]=v(p);}else for(let i=0;i<PLOT_MAX;i++)if(ok(P0[i]))plots[i]=v(P0[i]);
  return {plots,plotBuys:legacy?2:Math.max(0,Math.min(PLOT_BUYS.length,Math.floor(Number(o.plotBuys)||0)))};}
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
  knight:{hp:520,dmg:15,spd:34,xp:300,ai:'knight',art:'knight',boss:true,big:true,drops:[['relic_sigil',1,1,1],['gem',1,3,4],['gold',1,150,220],['ember_ore',1,2,4]]},
  // Emberforge Halls (floors 11–15)
  imp:{hp:20,dmg:9,spd:50,xp:12,ai:'dash',art:'imp',drops:[['gold',.6,4,10],['coal_ore',.25,1,1]]},
  golem:{hp:48,dmg:12,spd:20,xp:18,ai:'chase',art:'golem',drops:[['coal_ore',.5,1,2],['gold',.6,5,12],['ember_ore',.06,1,1]]},
  cinderbat:{hp:12,dmg:7,spd:52,xp:7,ai:'flutter',art:'cinderbat',drops:[['gold',.6,2,6]]},
  // the Starfall Hollow (floors 16–20)
  wraith:{hp:30,dmg:12,spd:44,xp:16,ai:'float',art:'wraith',light:true,drops:[['gem',.08,1,1],['gold',.6,6,14]]},
  sentinel:{hp:52,dmg:14,spd:30,xp:22,ai:'lunge',art:'sentinel',drops:[['cobalt_ore',.3,1,2],['gold',.6,8,16],['bone',.3,1,2]]},
  shardling:{hp:26,dmg:12,spd:58,xp:15,ai:'dash',art:'shardling',drops:[['gold',.5,4,10],['starshard_ore',.02,1,1]]},
  // rare: [item, chance] rolled once per kill for everyone who hit it (better with loot luck)
  tyrant:{hp:700,dmg:16,spd:28,xp:700,ai:'tyrant',art:'tyrant',boss:true,big:true,drops:[['relic_heart',1,1,1],['coal_ore',1,4,8],['ember_ore',1,3,5],['gold',1,300,450],['gem',1,3,5]],rare:[['cinder_blade',.015]]},
  warden:{hp:900,dmg:18,spd:32,xp:1100,ai:'warden',art:'warden',boss:true,big:true,drops:[['relic_star',1,1,1],['cobalt_ore',1,4,8],['starshard_ore',1,1,3],['gold',1,500,750],['gem',1,4,6]],rare:[['star_helm',.015]]}
};
// Biome packs: floors, enemy mix, ore, boss. Season 1 adds the next pack.
const PACKS=[
// veins: [ore, weight, from floor] (the ore walls of each floor are rolled from these). ore: the pack's main ore (chests).
  {id:'moss',from:1,to:5,enemies:['slime','bat','crawler'],ore:'copper',veins:[['copper',1]],boss:'mother',bossName:'Mother Slime'},
  {id:'crypt',from:6,to:10,enemies:['skeleton','wisp','spider','bat'],ore:'iron',veins:[['iron',3],['ember',1,8]],boss:'knight',bossName:'The Ossuary Knight'},
  {id:'ember',from:11,to:15,enemies:['imp','golem','cinderbat','imp'],ore:'coal',veins:[['coal',5],['iron',3],['ember',1.6,12]],boss:'tyrant',bossName:'The Forge Tyrant'},
  {id:'star',from:16,to:20,enemies:['wraith','sentinel','shardling'],ore:'cobalt',veins:[['cobalt',6],['coal',3],['starshard',1,17]],boss:'warden',bossName:'The Starwarden'}
];
const packOf=f=>PACKS.find(p=>f>=p.from&&f<=p.to);
// the lift at the Gate: floor 1, then the first floor of each pack whose previous boss you've beaten
const LIFTS=PACKS.map(p=>p.from);
const liftBoss=f=>{const i=PACKS.findIndex(p=>p.from===f);return i>0?PACKS[i-1].boss:null;};
const NAMES_X=0;const NAMES=['@mira_dig','@oakhand','@lumen_lou','@pitkid','@runa_k','@tallowtom','@vexa','@gravelgus','@sora_lamps','@bram_b'];

// ===== The Bulletin: build version + update history shown on the board in the Hold. =====
// EVERY update adds an entry at the TOP (newest first) and bumps BUILD. Never delete old entries: this is the game's history.
// scripts/build.mjs also writes CHANGELOG.md from this list.
// minClient: the oldest game version allowed into the shared world (worlds, parties, PvP). Raise it whenever the map or
// the realtime messages change, so a tab left open from before an update can't play by old rules. Keep MIN_CLIENT in
// realtime/src/index.js in step.
const BUILD={version:'0.10.0',season:'Season 0 (Beta)',date:'2026-10-27',minClient:'0.10.0'};
const CHANGELOG=[
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
const WILD_ROWS=40,WILD_Y=WILD_ROWS*T,WILD_MAX=20,RETURN_MAX=20;   // the Return Flame works up to this Wilderness level (deeper areas will block it)
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
  // ore veins: rolled from the pack's vein table (some ores only show up from a given floor)
  const veins=(pack.veins||[[pack.ore,1]]).filter(v=>!v[2]||floor>=v[2]),vw=veins.reduce((a,v)=>a+v[1],0);
  const ORE_LIGHT={ember:{r:15,c:'lava'},cobalt:{r:12,c:'cool'},starshard:{r:18,c:'star'}};
  if(!boss)for(let i=0;i<10&&fpool.length;i++){const [x,y]=pick(fpool);let q=r()*vw,kind=veins[0][0];for(const v of veins){q-=v[1];if(q<=0){kind=v[0];break;}}
    addObj(m,{type:'ore',kind,x:x*T+8,y:y*T+15,tile:[x,y],hp:(ORES[kind]||{hp:3}).hp,onWall:true,light:ORE_LIGHT[kind]||null});}
  const cells=[];rooms.forEach((o,i)=>{if(i===0)return;for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)cells.push([x,y]);});
  const free=cells.filter(([x,y])=>!(x===m.stairs.tx&&y===m.stairs.ty));
  if(!boss){
    for(let i=0;i<1+(r()<.6?1:0);i++){const [x,y]=pick(free);addObj(m,{type:'chest',x:x*T+8,y:y*T+14,open:false,act:{x:x*T+8,y:y*T+14,label:'Open',id:'chest'},block:[[x,y]]});}
    const glow=pack.id==='moss'?4:2;for(let i=0;i<glow;i++){const [x,y]=pick(free);addObj(m,{type:'glowcap',x:x*T+8,y:y*T+15,light:{r:20,c:'pink'},act:{x:x*T+8,y:y*T+12,label:'Pick',id:'glowcap'}});}
    if(pack.id==='crypt')for(let i=0;i<6;i++){const [x,y]=pick(free);m.objs.push({type:'bones',x:x*T+8,y:y*T+15,flat:true});}
    if(pack.id==='ember')for(let i=0;i<5;i++){const [x,y]=pick(free);m.objs.push({type:'cinders',x:x*T+8,y:y*T+15,flat:true,v:r()*2|0});}
    if(pack.id==='star')for(let i=0;i<4;i++){const [x,y]=pick(free);addObj(m,{type:'crystal',x:x*T+8,y:y*T+15,v:r()*2|0,light:{r:16,c:'cool'}});}
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
    if(m.biome==='crypt'||m.biome==='ember'){if(k<.07)g.drawImage(D.banner,X+4,Y+1);else if(k<.14)g.drawImage(D.chain,X+5,Y+2);}
    else if(k<.18)g.drawImage(D.roots,X+4,Y);}}
// ---------- pre-render the static ground layer ----------
function bakeGround(m){
  const cv=document.createElement('canvas');cv.width=m.w*T;cv.height=m.h*T;const g=cv.getContext('2d');
  const r=rng(m.floor||3);
  for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const t=tAt(m,x,y),v=(x*7+y*13)%4;let s=null;
    if(m.kind==='hold'){if(t===GRASS)s=ART.grass[v];else if(t===PATH)s=ART.path[v%3];else if(t===SOIL)s=ART.soil;else if(t===WILDG)s=ART.wgrass[v];else if(t===WPATH)s=ART.wpath[v%3];else if(isWater(t))s=null;}
    else{if(t===FLOOR)s=ART.floor[m.biome][v];else if(m.faces.has(y*m.w+x))s=ART.face[m.biome][v%3];else{g.fillStyle='#0d0e17';g.fillRect(x*T,y*T,T,T);
        const fl=(dx,dy)=>tAt(m,x+dx,y+dy)===FLOOR||m.faces.has((y+dy)*m.w+x+dx);g.fillStyle={moss:'#3a4a4a',ember:'#4a2f33',star:'#2c3566'}[m.biome]||'#45425f';
        if(fl(-1,0))g.fillRect(x*T,y*T,2,T);if(fl(1,0))g.fillRect(x*T+T-2,y*T,2,T);if(fl(0,-1))g.fillRect(x*T,y*T,T,2);if(fl(0,1))g.fillRect(x*T,y*T+T-2,T,2);
        if((x*31+y*17)%5===0){g.fillStyle='#181a28';g.fillRect(x*T+5,y*T+6,3,2);}}}
    if(s)g.drawImage(s,x*T,y*T);}
  if(m.kind==='delve')dressDungeon(m,g);
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
  try{const r=await fetch('/api/rt-ticket?v='+encodeURIComponent(BUILD.version),{headers:{'X-LH':'1'},credentials:'same-origin',cache:'no-store'});
    if(r.status===426){stopped=true;emit(HL,'update',{});return null;}   // this copy of the game is out of date
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
    if(e.code===4012){stopped=true;emit(HL,'update',{});return;}
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
    if(e.code===4012){stopped=true;emit(HL,'update',{});return;}
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
// closing the tab or the app: leave now, so other players see you go at once (instead of standing frozen until the
// server notices the silence). If the page comes back from the cache, pageshow reconnects.
addEventListener('pagehide',()=>{if(stopped)return;try{room&&room.close(1000,'bye');}catch(e){}try{lobby&&lobby.close(1000,'bye');}catch(e){}});
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
  refresh(){if(stopped)return;if(lobby)kill(lobby);if(room)kill(room);},   // reconnect with a fresh pass (e.g. just became a Founder)
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
const DEF={name:'',look:null,wallet:null,gold:40,bank:{wheat_seed:20,oil:3,bread:3},lvl:1,xp:0,gear:{blade:'rusty',mail:'none',lantern:'basic',cape:null,helm:null},skills:{farming:0,fishing:0,cooking:0},caught:0,flags:{},guide:0,vault:{},bankBuys:0,quick:['oil','bread','pondfin','stew',null],lift:1,deepest:0,plots:Array(12).fill(null),plotBuys:0,kills:0,deaths:0,bosses:{},goals:{},cnt:{}};
const BANK_BASE=16,BANK_BUYS=[250,750,2000,5000,10000,20000,40000,75000],BANK_BUY_SLOTS=4;
const fresh=()=>JSON.parse(JSON.stringify(DEF));
// Saves come from localStorage or the cloud, so treat them as untrusted: keep only known keys, valid ids and sane numbers.
const num=(v,lo,hi,d)=>{v=Number(v);return Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):d;};
const int=(v,lo,hi,d)=>Math.floor(num(v,lo,hi,d));
const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const SET_DEF={zoom:2,bright:100,shake:true,pnames:true,feed:true,vib:true,sound:true,flame:true};
function cleanSet(v){if(!v||typeof v!=='object')return null;const o={};for(const k of Object.keys(SET_DEF))o[k]=typeof SET_DEF[k]==='boolean'?(v[k]===undefined?SET_DEF[k]:!!v[k]):SET_DEF[k];
  o.zoom=Math.max(0,Math.min(4,Math.round(+v.zoom)||0));if(v.zoom===undefined)o.zoom=SET_DEF.zoom;o.bright=Math.max(60,Math.min(160,Math.round(+v.bright)||100));return o;}
function normalize(raw){const o=obj(raw),s=fresh();
  s.settings=cleanSet(o.settings);
  s.name=typeof o.name==='string'&&/^[A-Za-z0-9_]{3,16}$/.test(o.name)?o.name:'';
  s.wallet=typeof o.wallet==='string'&&/^0x[0-9a-f]{40}$/.test(o.wallet)?o.wallet:null;
  const L=obj(o.look);s.look={skin:int(L.skin,0,LOOKS.skin.length-1,DEFAULT_LOOK.skin),hair:int(L.hair,0,LOOKS.hair.length-1,DEFAULT_LOOK.hair),cloth:int(L.cloth,0,LOOKS.cloth.length-1,DEFAULT_LOOK.cloth),style:int(L.style,0,LOOKS.style.length-1,DEFAULT_LOOK.style)};
  s.gold=int(o.gold,0,1e10,DEF.gold);s.lvl=int(o.lvl,1,200,1);s.xp=int(o.xp,0,1e9,0);s.kills=int(o.kills,0,1e9,0);s.deaths=int(o.deaths,0,1e9,0);s.caught=int(o.caught,0,1e9,0);
  s.deepest=int(o.deepest,0,PACKS[PACKS.length-1].to,0);s.savedAt=int(o.savedAt,0,9e15,0);
  s.vault={};for(const [k,v] of Object.entries(obj(o.vault)))if(ITEMS[k]&&k!=='gold'){const n=int(v,0,1e7,0);if(n>0)s.vault[k]=n;}s.bankBuys=int(o.bankBuys,0,BANK_BUYS.length,0);
  if(o.bank!==undefined){s.bank={};for(const [k,v] of Object.entries(obj(o.bank)))if(ITEMS[k]&&k!=='gold'){const n=int(v,0,1e7,0);if(n>0)s.bank[k]=n;}}
  const G=obj(o.gear);s.gear={blade:GEAR.blade[G.blade]?G.blade:'rusty',mail:GEAR.mail[G.mail]?G.mail:'none',lantern:LANTERNS[G.lantern]?G.lantern:'basic',cape:CAPES[G.cape]?G.cape:null,helm:GEAR.helm[G.helm]?G.helm:null};
  const K=obj(o.skills);s.skills={};for(const k of Object.keys(SKILLS))s.skills[k]=num(K[k],0,200e6,0);
  Object.assign(s,cleanPlots(o,Date.now()));
  s.bosses={};for(const k of Object.keys(obj(o.bosses)))if(ENEMIES[k]&&ENEMIES[k].boss)s.bosses[k]=true;
  {const want=int(o.lift,1,99,1);s.lift=Math.max(...LIFTS.filter(f=>f<=want&&f<=s.deepest+1&&(!liftBoss(f)||s.bosses[liftBoss(f)])));}   // the deepest lift you've opened
  const Q=Array.isArray(o.quick)?o.quick:DEF.quick;s.quick=[0,1,2,3,4].map(i=>ITEMS[Q[i]]&&(ITEMS[Q[i]].food||ITEMS[Q[i]].oil)?Q[i]:null);
  s.flags={};for(const [k,v] of Object.entries(obj(o.flags)))if(/^[a-z]{2,16}$/.test(k))s.flags[k]=!!v;s.guide=int(o.guide,0,99,0);
  s.goals={};for(const k of Object.keys(obj(o.goals)).slice(0,300))if(/^[a-z0-9]{2,16}$/.test(k))s.goals[k]=1;
  s.cnt={};for(const [k,v] of Object.entries(obj(o.cnt)).slice(0,60))if(/^[a-z]{2,16}$/.test(k)){const n=int(v,0,1e9,0);if(n)s.cnt[k]=n;}
  // Combat level = Fighting (monster XP) counted double + every skill level (see combatFrom in data.js). Saves from before
  // this change keep the combat level they had as a floor, and their old combat progress becomes their Fighting level.
  {const legacy=o.flv===undefined;s.flv=Math.min(FIGHT_MAX,legacy?s.lvl:int(o.flv,1,200,1));s.cbFloor=legacy?s.lvl:int(o.cbFloor,1,200,1);
   if(!legacy&&K.mining===undefined)s.cbFloor=Math.max(s.cbFloor,combatFrom(s.flv,s.skills,SKILLS_V096));   // Mining joined in v0.10.0: nobody drops a level
   s.lvl=Math.max(s.cbFloor,combatFrom(s.flv,s.skills));}
  s.skull=int(o.skull,0,9e15,0);   // the Wilderness skull: until when (it follows you to other worlds)
  {const q=obj(o.pos);s.pos=Number.isFinite(+q.x)&&Number.isFinite(+q.y)&&+q.x>0&&+q.y>0&&+q.x<20000&&+q.y<20000?{x:Math.round(+q.x),y:Math.round(+q.y)}:null;}   // where you logged out
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
// In the Hold and the Wilderness your health follows the Wilderness rules (the same for everyone: no admin-hat bonus)
const pvpMaxHp=()=>60+8*(S.lvl-1)+((((CAPES[S.gear.cape]||{}).attr)||{}).hp||0);
const hpMax=()=>scene==='hold'?pvpMaxHp():maxHp();
const inWild=()=>scene==='hold'&&P.y<WILD_Y;
const xpNeed=l=>Math.round(22*Math.pow(l,1.5));
const dmgOf=()=>GEAR.blade[S.gear.blade].dmg*(1+A('dmg')/100);
const defOf=()=>GEAR.mail[S.gear.mail].def+(S.gear.helm?GEAR.helm[S.gear.helm].def:0)+A('def');
const myLook=()=>Object.assign({},S.look,{armor:S.gear.mail==='none'?null:S.gear.mail,cape:S.gear.cape,helm:S.gear.helm,flame:flameOn()?'founder':null});
// The Founder's Flame: a violet light only Founder's Lantern holders have (the realtime server hides it for anyone else)
const FLAME='#b98cff',FLAMEC='185,140,255';
let FND=null;const isFounder=()=>!!(FND&&FND.holder),flameOn=()=>isFounder()&&SET.flame!==false;

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
// ---- the joystick ----
// Fingers use touch events (Android browsers and wallet-app browsers deliver these most reliably, and calling
// preventDefault stops Chrome from treating a drag as a scroll, pull-down or address-bar gesture); a mouse or pen uses
// pointer events. The joystick lets go whenever its finger is no longer on the screen, even if the phone never reports
// the lift (a thumb sliding off the bottom edge into the home or back gesture), and when the game loses focus.
const pad=$('pad'),knob=$('knob');let padId=null,padTouch=null;
const padCenter=()=>{const r=pad.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};};   // fresh each time: the address bar can resize the screen mid-drag
function moveStick(x,y){const c=padCenter(),dx=x-c.x,dy=y-c.y,l=Math.hypot(dx,dy),max=40,k=Math.min(1,l/max);
  stick={x:l?dx/l*k:0,y:l?dy/l*k:0,on:true};knob.style.transform=`translate(${stick.x*max}px,${stick.y*max}px)`;}
const padRelease=()=>{padId=null;padTouch=null;stick={x:0,y:0,on:false};knob.style.transform='';};
const findT=(list,id)=>{for(const t of list)if(t.identifier===id)return t;return null;};
pad.addEventListener('touchstart',e=>{e.preventDefault();const t=e.changedTouches[0];if(!t)return;padTouch=t.identifier;padId=null;moveStick(t.clientX,t.clientY);},{passive:false});
addEventListener('touchmove',e=>{if(padTouch==null)return;const t=findT(e.changedTouches,padTouch);if(!t)return;e.preventDefault();moveStick(t.clientX,t.clientY);},{passive:false,capture:true});
['touchend','touchcancel'].forEach(n=>addEventListener(n,e=>{if(padTouch!=null&&(findT(e.changedTouches,padTouch)||!findT(e.touches,padTouch)))padRelease();},{passive:true,capture:true}));
addEventListener('touchstart',e=>{if(padTouch!=null&&!findT(e.touches,padTouch))padRelease();},{passive:true,capture:true});   // a new touch, and the joystick's finger is gone
pad.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;padId=e.pointerId;try{pad.setPointerCapture(e.pointerId);}catch(x){}moveStick(e.clientX,e.clientY);});
pad.addEventListener('pointermove',e=>{if(e.pointerId===padId)moveStick(e.clientX,e.clientY);});
['pointerup','pointercancel','lostpointercapture'].forEach(n=>pad.addEventListener(n,e=>{if(e.pointerId===padId)padRelease();}));
addEventListener('blur',padRelease);document.addEventListener('visibilitychange',()=>{if(document.hidden)padRelease();});
// Android: keep the controls a little further from the screen edges, where the back and home swipes start
if(/Android/i.test(navigator.userAgent))document.documentElement.classList.add('android');
$('bA').addEventListener('pointerdown',e=>{e.preventDefault();aPressed=true;});
// Mouse wheel zooms (computers): scroll forward = closer, back = further. One step per notch; trackpads are smoothed.
let wheelAcc=0,wheelT=0,wheelLast=0;
cv.addEventListener('wheel',e=>{if(!started||!$('sheet').hidden||!$('acct').hidden)return;e.preventDefault();
  const now=performance.now();if(now-wheelLast>250)wheelAcc=0;wheelLast=now;wheelAcc+=e.deltaMode===1?e.deltaY*30:e.deltaY;
  if(Math.abs(wheelAcc)<50||now-wheelT<120)return;const z=Math.max(0,Math.min(4,SET.zoom+(wheelAcc<0?1:-1)));wheelAcc=0;wheelT=now;
  if(z===SET.zoom)return toast(z===4?'Zoomed in all the way':'Zoomed out all the way');SET.zoom=z;saveSet(true);toast('Zoom: '+ZOOMS[z]);},{passive:false});
// Mouse hover (computers only): the name of whatever you point at shows above it, in the same green as NPC names.
const HOVER_OK=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches,HOV={on:false,x:0,y:0};
cv.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;HOV.on=true;HOV.x=e.clientX;HOV.y=e.clientY;});
cv.addEventListener('pointerleave',()=>{HOV.on=false;cv.style.cursor='';});
// [left, top, width, height] from the object's x/y (its feet), and the name to show
const HOVER_BOX={gate:[-26,-52,52,56,'Delve Gate'],bank:[-22,-46,44,46,'Bank'],forge:[-22,-38,44,38,'Forge'],kitchen:[-14,-30,28,30,'Kitchen'],press:[-14,-30,28,30,'Oil Press'],
  board:[-14,-30,28,30,'Bulletin Board'],stall:[-20,-30,40,32,'Tallow’s Cart'],sign:[-8,-22,16,22,'The Road East'],barricade:[-10,-58,20,58,'The Road East (closed)'],
  tree:[-11,-30,22,32,'Oak Tree'],chest:[-7,-13,14,14,'Chest'],glowcap:[-7,-14,14,14,'Glowcap'],
  wwall:[-8,-20,16,22,'Wilderness Wall'],deadtree:[-11,-30,22,32,'Dead Tree'],rock:[-7,-12,14,13,'Rock'],grave:[-6,-17,12,18,'Grave'],pillar:[-5,-28,10,30,'Ruined Pillar'],
  obelisk:[-10,-50,20,52,'The Old Obelisk'],skullpost:[-6,-26,12,26,'Wilderness Warning']};
function hoverTarget(wx,wy){let best=null;const hit=(x,y,w,h)=>wx>=x&&wx<x+w&&wy>=y&&wy<y+h;
  for(const o of map.objs){if(o.gone)continue;let b=null,name=null;
    if(o.type==='ore'){const x=o.tile[0]*T,y=o.tile[1]*T;if(hit(x,y,T,T))b=[x,y,T,T],name=(ITEMS[o.kind+'_ore']||{}).n||'Ore';}
    else{const H=HOVER_BOX[o.type];if(!H||(o.type==='chest'&&o.open))continue;if(o.type==='tree'&&o.chop&&!treeUp(o))continue;
      if(hit(o.x+H[0],o.y+H[1],H[2],H[3]))b=[o.x+H[0],o.y+H[1],H[2],H[3]],name=o.type==='tree'&&TREES[o.kind]?TREES[o.kind].n:o.type==='sign'&&o.wild?'Wilderness Warning':H[4];}
    if(b&&(!best||o.y>best.z))best={x:b[0]+b[2]/2,y:b[1]-3,name,z:o.y};}
  if(best)return best;
  const tx=Math.floor(wx/T),ty=Math.floor(wy/T),t=tAt(map,tx,ty);
  if(scene==='hold'){
    if(map.plots&&map.plots.some(p=>p.tx===tx&&p.ty===ty))return {x:tx*T+8,y:ty*T-2,name:'Farm'};
    if(t===DOCK)return {x:tx*T+8,y:ty*T-2,name:'Dock'};if(t===WATER)return {x:tx*T+8,y:ty*T-2,name:'Lake'};if(t===GLOOM)return {x:tx*T+8,y:ty*T-2,name:'Gloom Pond'};}
  if(scene==='delve'&&map.stairs&&!map.stairs.hidden&&tx===map.stairs.tx&&ty===map.stairs.ty)return {x:tx*T+8,y:ty*T-2,name:'Stairs down'};
  return null;}
function hoverTag(){if(!HOVER_OK||!HOV.on||!started||!$('sheet').hidden||!$('acct').hidden){if(cv.style.cursor)cv.style.cursor='';return;}
  const r=cv.getBoundingClientRect();if(!r.width)return;const wx=camX+(HOV.x-r.left)*VW/r.width,wy=camY+(HOV.y-r.top)*VH/r.height;
  const h=hoverTarget(wx,wy);cv.style.cursor=h?'pointer':'';if(h)TAGS.push({x:h.x,y:h.y,name:h.name,npc:true,hov:true});}
// Mouse: left-click on the game attacks / acts, same as Space. In the Depths the hero turns toward the click first.
let camX=0,camY=0;
cv.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||!started||!$('sheet').hidden||!$('acct').hidden)return;
  e.preventDefault();const a=document.activeElement;if(a&&a.id==='chatIn')a.blur();
  if(scene==='delve'||inWild()){const r=cv.getBoundingClientRect(),wx=camX+(e.clientX-r.left)*VW/r.width,wy=camY+(e.clientY-r.top)*VH/r.height,dx=wx-P.x,dy=wy-(P.y-6);
    if(Math.abs(dx)>3||Math.abs(dy)>3)P.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
    if(inWild()){const o=otherAt(e.clientX,e.clientY);MP.aim=o?o.id:null;}}
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
let scene='hold',map=HOLD,ents=[],drops=[],fx=[],texts=[],npcs=[],run=null,time=0,slashes=[],hitStop=0;
const P={x:HOLD.spawn.x,y:HOLD.spawn.y,dir:'down',moving:false,anim:0,hp:maxHp(),inv:0,swing:0,swingCD:0,chan:0,hitDone:false};

// ---------- toasts ----------
let toastT=0;function toast(msg,kind){const t=$('toast');t.textContent=msg;t.className='toast '+(kind||'');t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2400);}
function floatText(x,y,txt,col){texts.push({x,y,txt,col:col||'#f4f4f4',t:0});}

// ---------- scenes ----------
function enterHold(at){FISHING=null;CHOP=null;COOK=null;scene='hold';map=HOLD;ents=[];drops=[];fx=[];slashes=[];P.x=at?at.x:HOLD.spawn.x;P.y=at?at.y:HOLD.spawn.y+8;P.dir='down';P.chan=0;run=null;P.hp=hpMax();
  updateHud();MP.toHold();}
// where you are, kept in your save so you sign back in on the same spot (in the Depths: the entrance you went in by)
function notePos(){if(started&&scene==='hold'&&P.hp>0)S.pos={x:Math.round(P.x),y:Math.round(P.y)};}
function placeAt(q){if(!q||!(q.x>0&&q.y>0&&q.x<map.w*T&&q.y<map.h*T)||blocked(q.x,q.y,4))return false;if(q.y<WILD_Y&&!S.flags.wildok)return false;P.x=q.x;P.y=q.y;return true;}
function startDelve(from,seed,door){door=door||'gate';const d=HOLD.doors[door];if(d){S.pos={x:d.x,y:d.y};save();}
  run={seed:seed!=null?seed:(rand()*1e9)|0,floor:from,pack:{},oil:100,kills:0,start:from,shadeT:0,door};enterFloor(from);closeSheet();toast('Floor '+from+' · '+BIOMES[packOf(from).id].name);}
function enterFloor(f){
  run.floor=f;map=buildFloor(f,run.seed);bakeGround(map);scene='delve';
  const sc=1+.12*(f-1);
  ents=map.spawns.map((s,i)=>Object.assign(makeEnemy(s.type,s.x,s.y,sc),{id:i+1}));MP.nextEid=ents.length+1;if(MP.client())ents=[];drops=[];fx=[];slashes=[];P.x=map.spawn.x;P.y=map.spawn.y;P.chan=0;
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
  if(scene==='hold'&&COOK)return {label:'Stop',id:'cookstop'};
  if(scene==='hold'){if(CHOP&&!(inWild()&&pvpTarget()))return {label:'Chopping',id:'noop'};if(!best){const o=nearTree();if(o)best={label:treeUp(o)?'Chop':'Stump',id:'chop',o};}}
  if(inWild()&&!FISHING&&!COOK){const o=pvpTarget();if(o)best={label:'Attack',id:'pvp',o};}
  {const d=nearBagDrop();if(d)best={label:'Pick up',id:'pickup',d};}
  if(scene==='delve'&&map.stairs&&!map.stairs.hidden){const sx=map.stairs.tx*T+8,sy=map.stairs.ty*T+10,d=Math.hypot(sx-P.x,sy-P.y);if(d<14)best={label:'Descend',id:'stairs'};}
  return best;
}
function doAct(a){
  if(a.id==='gate')return openGate();if(a.id==='house')return openHero();if(a.id==='bank')return openBank();if(a.id==='forge')return openCraft('forge');
  if(a.id==='kitchen')return openKitchen();if(a.id==='press')return openCraft('press');if(a.id==='market')return openMarket('shop',true);if(a.id==='wick')return openWick();if(a.id==='bulletin')return openBulletin();if(a.id==='eastsign')return openEastSign();
  if(a.id==='pickup')return claimDrop(a.d);if(a.id==='pvp')return pvpSwing(a.o);if(a.id==='wildsign')return openWildSign();if(a.id==='chop')return startChop(a.o);if(a.id==='cookstop')return stopCook('stopped');if(a.id==='noop')return;
  if(a.id==='plot')return openFarm();if(a.id==='fish')return startFishing(a.sp);if(a.id==='hook')return hookFish();
  if(a.id==='chest'||a.id==='glowcap'){const o=a.o,i=map.objs.indexOf(o);if(MP.client()){if(!o.req){o.req=1;NET.send({t:'act',o:i});setTimeout(()=>o.req=0,1500);}return;}objTaken(o,MP.me());MP.objOut(i,o,MP.me());return;}
  if(a.id==='stairs'&&MP.client())return MP.askDown();
  if(a.id==='stairs'){const next=run.floor+1,pk=packOf(next);
    if(!pk||pk.locked){openSheet(`<h2>The way is sealed</h2><p class="lead">Below floor ${run.floor} lies ${pk?pk.name:'something older'}. ${pk?'It opens in Season '+pk.season+'.':'Deeper floors are coming.'}</p><p class="lead">Light the Return Flame to bring your haul home.</p><div class="row"><button class="btn" id="sx">Keep exploring</button></div>`);$('sx').onclick=closeSheet;return;}
    sfx('stairs');enterFloor(next);MP.floorOut(next);toast('Floor '+next+(packOf(next).id!==map.pack.id?' · '+BIOMES[packOf(next).id].name:''));}
}

// ---------- combat ----------
function swing(){if(P.swingCD>0)return;P.swing=.2;P.swingCD=.32;P.hitDone=false;sfx('swing');}
// ---- swing feel: the hero steps into the swing, the blade leaves a smear, and a hit flashes, sparks and briefly freezes ----
const BLADE_FX={rusty:'#c2c7cf',copper:'#ef7d57',iron:'#f4f4f4',ember:'#ff9f3d',steel:'#c9d6e3',cinder:'#ff5a2a'};
const easeOut=t=>1-(1-t)*(1-t);
function lungeOff(dir,left){const k=Math.round(Math.sin((1-left/.2)*Math.PI)*2);return [dir==='left'?-k:dir==='right'?k:0,dir==='up'?-k:dir==='down'?k:0];}
function impact(x,y,a,col,big,mine){
  slashes.push({x,y,a:a+Math.PI/2,t:0,col,big});
  if(!reduceMotion)for(let i=0;i<(big?9:6);i++){const b=a+(rand()-.5)*1.4,s=60+rand()*70;fx.push({x,y,vx:Math.cos(b)*s,vy:Math.sin(b)*s-10,t:0,life:.18+rand()*.14,col:i%3?col:'#fff3c4'});}
  if(mine){hitStop=Math.max(hitStop,big?.07:.045);if(SET.shake)shake=Math.max(shake,big?2.5:1.5);}}
function hitBox(){const d=P.dir,cx=P.x+(d==='left'?-11:d==='right'?11:0),cy=P.y-5+(d==='up'?-11:d==='down'?9:0);return {x:cx-10,y:cy-9,w:20,h:18};}
function resolveSwing(){
  const b=hitBox(),dmg=dmgOf(),hits=[];let ore=-1;
  for(const e of ents){if(e.dead)continue;const r=e.r;if(e.x+r>b.x&&e.x-r<b.x+b.w&&e.y>b.y&&e.y-r*2<b.y+b.h){
    const d=Math.round(dmg*(.9+rand()*.2)),a=Math.atan2(e.y-P.y,e.x-P.x);floatText(e.x,e.y-(e.d.big?28:16),String(d),'#ffcd75');sfx('hit');e.flash=.12;e.sq=.16;
    impact(e.x,e.y-(e.d.big?12:6),a,BLADE_FX[S.gear.blade]||'#f4f4f4',!!e.d.big,true);
    hits.push([e.id,d]);
    if(MP.client()){e.hp=Math.max(0,e.hp-d);NET.send({t:'hit',e:e.id,d,a:Math.round(a*100)/100});continue;}
    applyHit(e,d,a,MP.me());}}
  for(const o of map.objs){if(o.type!=='ore'||o.gone)continue;const ox=o.tile[0]*T,oy=o.tile[1]*T;
    if(ox+T>b.x&&ox<b.x+b.w&&oy+T>b.y&&oy<b.y+b.h){const OR=ORES[o.kind]||ORES.copper;
      if(lvlOf('mining')<OR.lvl){floatText(ox+8,oy+4,'Mining '+OR.lvl,'#ff8a8a');if(time-(MP.mineWarn||-9)>2){MP.mineWarn=time;toast(OR.n+' needs Mining '+OR.lvl+'. You have '+lvlOf('mining')+'.','bad');}sfx('swing',.4);break;}
      puff(ox+8,oy+12,'#94b0c2',4);floatText(ox+8,oy+4,'chip','#94b0c2');const i=map.objs.indexOf(o);ore=i;
      if(MP.client()){NET.send({t:'mine',o:i});break;}mineOre(o,i,MP.me());break;}}
  if(MP.shared())NET.send({t:'sw',d:P.dir,h:hits.slice(0,8),o:ore});   // the party sees your swing, your damage numbers and your pickaxe chips
}
// another party member swung: show their blade, the damage they did and the ore they chipped
function peerSwing(m){const o=OTH.get(m.id);if(!o||!(scene==='delve'||scene==='hold'&&o.y<WILD_Y))return;o.dir=m.d||o.dir;o.swT=.2;
  for(const [eid,d] of m.h||[]){const e=ents.find(q=>q.id===eid&&!q.dead);if(e){floatText(e.x,e.y-(e.d.big?28:16),String(d),'#f4f4f4');e.flash=.12;e.sq=.16;impact(e.x,e.y-(e.d.big?12:6),Math.atan2(e.y-o.y,e.x-o.x),BLADE_FX[(o.look&&o.look.blade)||'rusty']||'#f4f4f4',!!e.d.big,false);}
    else{const f=fallen.get(eid);if(f&&time-f.t<2){floatText(f.x,f.y-(f.big?28:16),String(d),'#f4f4f4');impact(f.x,f.y-(f.big?12:6),Math.atan2(f.y-o.y,f.x-o.x),BLADE_FX[(o.look&&o.look.blade)||'rusty']||'#f4f4f4',f.big,false);}}}
  if(m.o>=0&&map.objs&&map.objs[m.o]&&map.objs[m.o].type==='ore'){const q=map.objs[m.o],ox=q.tile[0]*T,oy=q.tile[1]*T;puff(ox+8,oy+12,'#94b0c2',4);floatText(ox+8,oy+4,'chip','#94b0c2');}
  if(Math.hypot(o.x-P.x,o.y-P.y)<160)sfx((m.h&&m.h.length)?'hit':'swing',.5);}
// Everyone who hit a monster at least once gets the full XP and their own roll at its drops (only they see and pick up
// their loot). The host decides when it dies and tells everyone who hit it. `top` is kept for older game versions.
const lootOwner=e=>{let best=null,bd=-1;for(const [who,d] of Object.entries(e.dmgBy||{}))if(d>bd){bd=d;best=who;}return best;};
function killEnemy(e){if(e.dead)return;const me=MP.me(),top=lootOwner(e)||me,hit=e.dmgBy?Object.keys(e.dmgBy):[me],xp=Math.round(e.d.xp*e.dmgSc);
  if(MP.shared())NET.send({t:'kill',e:e.id,top,hit,xp,x:Math.round(e.x),y:Math.round(e.y),ty:e.type});
  onKilled(e,top,hit,xp);}
const fallen=new Map();   // monster id -> where it was when it died (for 2 s)
function onKilled(e,top,hit,xp){const me=MP.me(),mine=top===me;e.dead=true;fallen.set(e.id,{x:e.x,y:e.y,big:!!e.d.big,t:time});if(fallen.size>40)fallen.delete(fallen.keys().next().value);MP.lastKill={e:e.id,top,hit:hit.slice(),xp};
  // XP: everyone who hit it, and every party member in the same dungeon (even if they didn't land a hit)
  if(hit.includes(me)){run.kills++;S.kills++;gainXp(xp);}else if(MP.shared())gainXp(xp);puff(e.x,e.y-6,e.d.boss?'#ffcd75':'#a7f070',e.d.boss?30:9);
  const roll=hit.includes(me)||(!hit.length&&mine);MP.lastRoll=roll;
  if(roll){spawnLoot(e.x,e.y-4,e.d.drops,true);if(e.type!=='shade'&&e.type!=='gelling')dropGear(e.x,e.y-4,e.d.boss?'boss':'enemy',e.d.boss?e.type:null,true);}
  if(e.d.boss){if(hit.includes(me)){MP.feed('boss',map.pack.bossName);bump('boss'+e.type);}sfx('boss');buzz([60,40,60]);map.stairs.hidden=false;bakeGround(map);S.bosses[e.type]=true;if(LIFTS.includes(run.floor+1)&&run.floor+1>S.lift)S.lift=run.floor+1;save();
    ents.forEach(o=>{if(!o.d.boss&&!o.dead){o.dead=true;puff(o.x,o.y-6,'#a7f070',6);}});
    setTimeout(()=>openSheet(`<h2>${map.pack.bossName} falls</h2><p class="lead">The stairs are open.${S.lift>run.floor?' The lift at the Gate now reaches floor '+S.lift+'.':''}</p><p class="lead">It dropped a Relic. In the live game, Relics can be minted on-chain and traded.${packOf(run.floor+1)?'':' This is as deep as the Depths go for now.'}</p><div class="row"><button class="btn" id="sx">Onward</button></div>`,()=>{}),300);
    setTimeout(()=>{const b=$('sx');if(b)b.onclick=closeSheet;},320);}}
// Monster XP trains Fighting. Combat level comes from Fighting plus every other skill, so it's checked after any XP.
function gainXp(n){S.xp+=n;setTimeout(()=>xpShow('combat'),0);while(S.flv<FIGHT_MAX&&S.xp>=xpNeed(S.flv)){S.xp-=xpNeed(S.flv);S.flv++;toast('Fighting level '+S.flv+'!','good');if(S.flv%10===0||S.flv===FIGHT_MAX)MP.feed('skill','Fighting '+S.flv);sfx('level');buzz(60);puff(P.x,P.y-8,'#ef7d57',12);}if(S.flv>=FIGHT_MAX)S.xp=0;combatCheck();}
const cbPts=()=>2*Math.min(FIGHT_MAX,S.flv)+Object.keys(SKILLS).reduce((a,k)=>a+lvlOf(k),0),cbDiv=()=>2+Object.keys(SKILLS).length;
function combatCheck(){const c=Math.max(S.cbFloor||1,combatFrom(S.flv,S.skills));if(c===S.lvl)return;const up=c>S.lvl;S.lvl=c;if(!up)return;
  P.hp=Math.min(hpMax(),P.hp+8);setTimeout(()=>{toast('Combat level '+S.lvl+'! Max HP '+hpMax(),'good');sfx('level');puff(P.x,P.y-8,'#ffcd75',16);floatText(P.x,P.y-40,'Combat '+S.lvl+'!','#ffcd75');},900);if(S.lvl%5===0)MP.feed('level',String(S.lvl));}
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
  if(boss){const k=Object.keys(CAPES).find(k=>CAPES[k].boss===boss);if(k&&rand()<.05*luck)out.push('cape_'+k);
    for(const [id,ch] of (ENEMIES[boss]&&ENEMIES[boss].rare)||[])if(rand()<ch*luck)out.push(id);}   // the rarest finds in the Depths
  return out;}
function dropGear(x,y,src,boss,own){for(const id of gearDrops(src,run?run.floor:1,boss))addDrop(mkDrop(x,y,id,1),false,own);}
function spawnLoot(x,y,table,own){for(const [id,ch,a,b] of table){if(rand()>=(id==='gold'?ch:ch*(1+A('luck')/100)))continue;const n=ri(a,b);
  if(id==='gold'){const piles=Math.min(4,Math.ceil(n/6));for(let i=0;i<piles;i++)addDrop(mkDrop(x,y,'gold',Math.ceil(n/piles)),false,own);}
  else addDrop(mkDrop(x,y,id,n),false,own);}}
function rareFound(id){const it=ITEMS[id],R=RARITY[it.rarity];sfx('rare');buzz([30,40,30]);toast(R.n+': '+it.n,'rare r-'+it.rarity);puff(P.x,P.y-10,R.c,it.rarity==='legendary'?30:12);if(RORDER.indexOf(it.rarity)>=RORDER.indexOf('rare'))MP.feed('loot',it.n);}
// ---------- items on the ground ----------
// Loot (monsters, ore, chests): in a party dungeon everyone sees it and whoever walks over it first gets it.
// Bag drops: land at your feet, you can pick them back up at once, other players nearby see them after 30 s (anywhere).
// The realtime room decides who gets each networked item, so it is never picked up twice.
let dropRef=0;
const roomUp=()=>netOn()&&NET.roomOpen()&&!!MP.room;
// own: your personal roll from a monster you helped kill (only you see it, so it never goes to the room)
function addDrop(d,bag,own){d.ref='r'+(++dropRef);d.bag=!!bag;d.own=!!own&&MP.shared();if(bag){d.vx=d.vy=0;d.vz=0;d.t=1;d.expAt=Date.now()+180e3;}drops.push(d);
  if(!own&&roomUp()&&(bag||MP.shared())){d.net=true;NET.send({t:'drop',ref:d.ref,it:d.id,n:d.n,x:Math.round(d.x),y:Math.round(d.y),vx:Math.round(d.vx),vy:Math.round(d.vy),bag:d.bag});}
  return d;}
function netDrop(v,settled){if(drops.some(d=>d.did===v.did))return;if(scene==='delve'?(!run||v.f!==run.floor):v.f!=null)return;if(!ITEMS[v.it]&&v.it!=='gold')return;
  drops.push({pk:!!v.pk,x:v.x,y:v.y,id:v.it,n:v.n,vx:settled||v.bag?0:v.vx,vy:settled||v.bag?0:v.vy,z:0,vz:settled||v.bag?0:70,t:settled||v.bag?1:0,did:v.did,bag:!!v.bag,net:true,showAt:Date.now()+(v.wait||0),expAt:v.left!=null?Date.now()+v.left:null});}
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
    if((d.bag&&!d.pk)||P.hp<=0)continue;            // bag drops are picked up with the action button (Wilderness loot: walk over it too)
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
const FOODS=['bread','pondfin','gloomfin','stew'];
const foodCount=()=>FOODS.reduce((a,f)=>a+(S.bank[f]||0),0);
function eat(id){if(scene==='hold')return eatHold(id);if(scene!=='delve'){toast('Save your food for the Depths');return;}if(!(S.bank[id]>0)){toast('No '+ITEMS[id].n+' in your bag','bad');return;}
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');sfx('pick');updateHud();}
function useQuick(i){const id=S.quick[i];if(!id){if(scene==='hold')openQuickPick(i);else toast('Set quick slots from your bag');return;}
  if(scene==='hold'&&(id==='oil'||!(inWild()||P.hp<hpMax()-.5))){openQuickPick(i);return;}if(id==='oil')useFlask();else eat(id);}
// eating in the Hold and the Wilderness: from your bag only, one bite every 1.5 s (the world's server keeps your health)
function eatHold(id){if(P.hp>=hpMax()-.5){toast(inWild()?'Already at full health':'Save your food for the Depths');return;}
  if(!(S.bank[id]>0)){toast('No '+ITEMS[id].n+' in your bag','bad');return;}if(time-(MP.eatT||-9)<1.5)return;MP.eatT=time;
  S.bank[id]--;if(S.bank[id]<=0)delete S.bank[id];P.hp=Math.min(hpMax(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');sfx('pick');
  if(roomUp()&&MP.pvpOn)NET.send({t:'eat',h:ITEMS[id].heal});updateHud();updateQuick(true);save();}
function useFood(){if(scene==='hold'){const have=FOODS.filter(f=>S.bank[f]>0).sort((a,b)=>ITEMS[a].heal-ITEMS[b].heal);if(!have.length)return toast('No food in your bag','bad');const miss=hpMax()-P.hp;return eatHold(have.find(f=>ITEMS[f].heal>=miss)||have[have.length-1]);}if(scene!=='delve')return;const have=FOODS.filter(f=>has(f)).sort((a,b)=>ITEMS[a].heal-ITEMS[b].heal);if(!have.length){toast('No food. Cook at the Kitchen.','bad');return;}
  const miss=maxHp()-P.hp,id=have.find(f=>ITEMS[f].heal>=miss)||have[have.length-1];
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');updateHud();}
const halfLoss=n=>Math.floor(n/2)+(n%2&&rand()<.5?1:0);
function returnHome(){setTimeout(()=>save(true),50);sfx('flame');const r=run,out={};for(const [id,n] of Object.entries(r.pack)){if(id==='gold')S.gold+=n;else give(S.bank,id,n);out[id]=n;}enterHold(HOLD.doors[r.door]||HOLD.doors.gate);notePos();save();
  summary('Back at the Hold',`You lit the Return Flame on floor ${r.floor} with ${r.kills} kills. Your haul is in your bag. Bank anything you can't afford to lose.`,out,null,'Brought home');}
function die(){setTimeout(()=>save(true),50);sfx('die');buzz(200);const r=run;S.deaths++;if(netOn()&&MP.party)NET.lsend({t:'pdie',k:'depths',floor:r.floor});const kept={},lost={};
  for(const [id,n] of Object.entries(r.pack)){const l=id==='gold'?Math.floor(n/2):halfLoss(n),k=n-l;if(k>0){if(id==='gold')S.gold+=k;else give(S.bank,id,k);kept[id]=(kept[id]||0)+k;}if(l>0)lost[id]=(lost[id]||0)+l;}
  for(const [id,n] of Object.entries(S.bank)){const l=halfLoss(n);if(l>0){S.bank[id]-=l;if(S.bank[id]<=0)delete S.bank[id];lost[id]=(lost[id]||0)+l;}}
  enterHold(HOLD.doors[r.door]||HOLD.doors.gate);notePos();save();
  summary('The dark took you',`You fell on floor ${r.floor} and lost about half of everything you carried: this delve's loot and your bag. Your Bank, your equipped gear and your gold are safe.`,kept,lost,'Kept');}
function listItems(o){const e=Object.entries(o);return e.length?'<ul class="loot">'+e.map(([id,n])=>`<li>${iconImg(id)}<span>${ITEMS[id].n}</span><b>${fmt(n)}</b></li>`).join('')+'</ul>':'<p class="lead">Nothing.</p>';}
function summary(title,lead,got,lost,head){openSheet(`<h2>${title}</h2><p class="lead">${lead}</p><h3>${head||'Brought home'}</h3>${listItems(got)}${lost&&Object.keys(lost).length?'<h3>Lost</h3>'+listItems(lost):''}<div class="row"><button class="btn" id="sx">Continue</button></div>`);$('sx').onclick=closeSheet;}

// ---------- skills ----------
const lvlOf=sk=>levelFor(S.skills[sk]||0);
function skillXp(sk,n){if(sk==='fishing')n*=1+A('fishXp')/100;const before=lvlOf(sk);S.skills[sk]=Math.min(200e6,(S.skills[sk]||0)+n);const after=lvlOf(sk);xpShow(sk);
  if(after>before){combatCheck();toast(SKILLS[sk].n+' level '+after+'!','good');if(after%10===0||after===99)MP.feed('skill',SKILLS[sk].n+' '+after);sfx('level');buzz(60);puff(P.x,P.y-10,SKILLS[sk].c,16);floatText(P.x,P.y-34,SKILLS[sk].n+' '+after+'!',SKILLS[sk].c);}return n;}
// ---------- fishing ----------
let FISHING=null;
function fishSpot(){if(scene!=='hold')return null;const tx=Math.floor(P.x/T),ty=Math.floor((P.y-3)/T),O={down:[0,1],up:[0,-1],left:[-1,0],right:[1,0]};
  for(const d of [P.dir,'down','right','left','up']){const [dx,dy]=O[d],w=tAt(map,tx+dx,ty+dy);if(isWater(w)){let bx=tx+dx,by=ty+dy;if(isWater(tAt(map,bx+dx,by+dy))&&isWater(tAt(map,bx+2*dx,by+2*dy))){bx+=dx;by+=dy;}return {dir:d,bx:bx*T+8,by:by*T+9,w:w===GLOOM?'wild':'hold'};}}return null;}
const catchChance=()=>Math.min(.93,.32+.006*(lvlOf('fishing')-1)+A('catch')/100);
const biteWait=()=>(2.5+rand()*3.5)*(1-.004*(lvlOf('fishing')-1));
function startFishing(sp){const W=WATERS[sp.w||'hold'];if(W.lvl&&lvlOf('fishing')<W.lvl){toast('You need Fishing '+W.lvl+' to fish the '+W.n+'.','bad');return;}CHOP=null;if(COOK)stopCook();sfx('cast');FISHING=Object.assign({phase:'cast',t:0,wait:0,px:P.x,py:P.y},sp);P.dir=sp.dir;}
let missRun=0;
function landFish(hooked){missRun=0;{const h=new Date().getHours();if(h<3)secret('night');}const pool=WATERS[FISHING.w||'hold'].fish,F=FISH[pool[ri(0,pool.length-1)]];give(S.bank,F.item,1);S.caught=(S.caught||0)+1;if(F.item==='raw_gloomfin')bump('gloomfin');
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
function treeUp(o){const L=TREES[o.kind],now=Date.now();if(o.until&&now>=o.until){o.until=0;o.logs=L.logs;o.cutAt=0;}
  // same slow regrowth as the server: untouched for regenDelay, then +1 log every regenEvery
  if(!o.until&&o.cutAt&&o.logs<L.logs){const grown=Math.floor((now-o.cutAt-L.regenDelay*1000)/(L.regenEvery*1000));if(grown>0)o.logs=Math.min(L.logs,o.leftAtCut+grown);if(o.logs>=L.logs)o.cutAt=0;}
  return !o.until;}
function nearTree(){if(scene!=='hold'||!map.trees)return null;let best=null,bd=22;for(const o of map.trees){const d=Math.hypot(o.x-P.x,o.y+5-P.y);if(d<bd){bd=d;best=o;}}return best;}
function startChop(o){if(!treeUp(o))return toast('Just a stump for now. It regrows soon.');const L=TREES[o.kind];if(lvlOf('woodcutting')<L.lvl)return toast('You need Woodcutting '+L.lvl+' for the '+L.n+'.','bad');
  FISHING=null;if(COOK)stopCook();CHOP={o,t:0,sw:0,px:P.x,py:P.y};const dx=o.x-P.x,dy=o.y-P.y;P.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');sfx('swing');}
function updateChop(dt){const c=CHOP;if(!c)return;const o=c.o;
  if(P.moving||scene!=='hold'||Math.hypot(P.x-c.px,P.y-c.py)>3){CHOP=null;return;}
  if(!treeUp(o)){CHOP=null;return;}
  c.sw+=dt;if(c.sw>=.85){c.sw=0;sfx('hit');puff(o.x+(P.x<o.x?-4:4),o.y-6,PAL.wood,3);o.shake=.25;}
  c.t+=dt;if(c.t<chopEvery())return;c.t=0;
  const ok=rand()<chopChance();if(ok)gotLog(o);else floatText(P.x,P.y-24,'…','#94b0c2');
  if(roomUp())NET.send({t:'chop',i:o.ti,k:o.kind,ok:ok?1:0});
  else{if(ok)o.logs--;o.cutAt=Date.now();o.leftAtCut=o.logs;if(o.logs<=0)treeFell(o,TREES[o.kind].regrow*1000);}}
function gotLog(o){const L=TREES[o.kind];give(S.bank,L.item,1);bump('logs');if(o.kind==='blackwood')bump('bwlogs');const x=skillXp('woodcutting',L.xp*(1+A('chopXp')/100));
  floatText(P.x,P.y-24,'+1 '+ITEMS[L.item].n+' · '+Math.round(x*10)/10+' xp','#d9a066');sfx('pick');save();}
function treeFell(o,ms){o.logs=0;o.until=Date.now()+ms;if(CHOP&&CHOP.o===o)CHOP=null;puff(o.x,o.y-14,PAL.green,14);puff(o.x,o.y-4,PAL.wood,8);
  if(Math.hypot(o.x-P.x,o.y-P.y)<120){sfx('boss');toast('Timber! The '+TREES[o.kind].n+' is down. It regrows in '+Math.round(ms/1000)+' s.');}}
// a tree update from the room: how many logs are left, and who swung
function onTree(m){const o=HOLD.trees&&HOLD.trees[m.i];if(!o)return;const was=!o.until;
  if(m.wait>0){if(was)treeFell(o,m.wait);else o.until=Date.now()+m.wait;}else{o.until=0;o.logs=m.left;o.leftAtCut=m.left;o.cutAt=Date.now();}
  if(m.by&&m.by!==MP.id){const p=OTH.get(m.by);if(p){p.chopT=3.6;p.chopX=o.x;}o.shake=.25;
    o.cut=o.cut||{};o.cut[m.by]=Date.now();
    if(CHOP&&CHOP.o===o&&Object.values(o.cut).filter(t=>Date.now()-t<7000).length>=2)secret('choir');}}
// ---- the axe swing: drawn pixel by pixel with both arms on the handle, so it reads as a person chopping ----
// ph 0→1 is one swing: a short follow-through, a slow wind-up over the shoulder, then a fast strike that lands at ph=1
// (exactly when the chips fly and the thunk plays). Side views swing at the tree; front/back views swing at the side.
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function axeAngle(ph){if(ph<.12)return .35-.15*(ph/.12);if(ph<.8)return .2+(-2.35-.2)*ease((ph-.12)/.68);const k=(ph-.8)/.2;return -2.35+(2.35+.35)*k*k;}
function pxLine(x0,y0,x1,y1,c){const n=Math.max(1,Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0))));g.fillStyle=c;for(let i=0;i<=n;i++)g.fillRect(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),1,1);}
const axeBehind=ph=>axeAngle(((ph%1)+1)%1)<-.95;   // raised above the shoulder: the head hides the handle
function drawAxe(x,y,dir,ph,look,patchOnly){look=look||myLook();ph=((ph%1)+1)%1;
  const A=look.armor&&ARMOR[look.armor],tun=LOOKS.cloth[look.cloth??0]||LOOKS.cloth[0],sl=A?A.m2:shade(tun,.68),skin=LOOKS.skin[look.skin??1]||LOOKS.skin[1];
  const side=dir==='left'||dir==='right',m=dir==='left'?-1:1,X=Math.round(x),Y=Math.round(y);
  let th=axeAngle(ph);
  // pivot = shoulder (sprite-space → world): side views at the front shoulder, front/back views at the right shoulder
  let sx,sy;if(side){sx=X-m*1;sy=Y-6;}else{sx=X+4;sy=Y-6;th=th*0.9;}
  const ux=Math.cos(th)*(side?m:1),uy=Math.sin(th),vx=-uy*(side?m:1),vy=Math.cos(th);   // u: along the arm/handle, v: the blade's edge side
  // hide the hanging sprite arm on the swinging side (paint it as tunic)
  g.fillStyle=A?A.m:tun;if(side)g.fillRect(X+(m>0?0:-2),Y-6,2,3);else if(dir==='down')g.fillRect(X+4,Y-6,1,3);
  if(patchOnly)return;
  const hx=sx+ux*3.6,hy=sy+uy*3.6;            // hands
  if(dir==='up'){pxLine(sx,sy,hx,hy,sl);}      // from behind: one arm, axe goes up past the head's side
  else{pxLine(sx,sy,hx,hy,sl);pxLine(sx-(side?m*2:7),sy+1,hx-ux*.6,hy-uy*.6,shade(sl,.8));}
  // handle (wood, 7 px) and head (steel, 3 px wide, edge highlighted)
  const ex=hx+ux*7,ey=hy+uy*7;pxLine(hx-ux*.8,hy-uy*.8,ex,ey,'#8a5a3a');
  g.fillStyle=skin;g.fillRect(Math.round(hx),Math.round(hy),1,1);g.fillRect(Math.round(hx-ux*1.4),Math.round(hy-uy*1.4),1,1);
  for(let k=-1;k<=2;k++)for(let w=0;w<2;w++){const px=ex-ux*w+vx*k,py=ey-uy*w+vy*k;g.fillStyle=k===2?'#f4f4f4':k===-1?'#566c86':'#94b0c2';g.fillRect(Math.round(px),Math.round(py),1,1);}
  // a quick motion smear during the strike
  if(ph>.86){g.globalAlpha=.35*(1-(ph-.86)/.14);for(let k=1;k<=3;k++){const t2=axeAngle(ph-k*.035),a=Math.cos(t2)*(side?m:1),b=Math.sin(t2);g.fillStyle='#f4f4f4';g.fillRect(Math.round(sx+a*9.7),Math.round(sy+b*9.7),1,1);g.fillRect(Math.round(sx+a*8.7),Math.round(sy+b*8.7),1,1);}g.globalAlpha=1;}}
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
  if(f.phase==='bite'){const yy=py-40-(Math.floor(time*8)%2);ptDraw(g,'!',px+1,yy,{font:'big',color:'#ffcd75',bg:'#1a1c2c'});}}


// ---------- the Wilderness (north of the Hold): players can fight here ----------
// The world's realtime room is the referee: it checks every attack, rolls the damage, keeps everyone's health and drops a
// fallen hero's items. Rules: both players in the Wilderness, combat levels no further apart than the Wilderness level
// (the lower of the two), and close enough to hit. Attack someone who hasn't attacked you and you're skulled for 20 minutes:
// a skulled hero who falls loses everything they carry and wear; anyone else keeps their 3 most valuable items.
let wasWild=false,wildLvlShown=-1,closeCall=false;
const skulled=()=>(S.skull||0)>Date.now();
const lvlRange=l=>[Math.max(1,S.lvl-l),Math.min(200,S.lvl+l)];
function canHit(o){if(!o||o.pend||!inWild())return false;const wa=wildLvl(P.y),wb=wildLvl(o.y);if(!wb)return false;const lb=(o.look&&o.look.lvl)||1;return Math.abs(S.lvl-lb)<=Math.min(wa,wb);}
function pvpTarget(){let best=null,bd=30;const aim=MP.aim&&OTH.get(MP.aim);if(aim&&canHit(aim)&&Math.hypot(aim.x-P.x,aim.y-P.y)<34)return aim;
  for(const o of OTH.values()){if(!canHit(o))continue;const d=Math.hypot(o.x-P.x,o.y-P.y);if(d<bd){bd=d;best=o;}}return best;}
let whyT=0;
function pvpWhy(o){if(time-whyT<2)return;whyT=time;const wl=wildLvl(P.y),[a,b]=lvlRange(Math.min(wl,wildLvl(o.y)||wl));
  if(!wildLvl(o.y))return toast(o.name+' is outside the Wilderness.','bad');
  toast(o.name+' (level '+((o.look&&o.look.lvl)||1)+') is out of your range here. You can fight levels '+a+'–'+b+'.','bad');}
function pvpSwing(t){if(P.swingCD>0)return;CHOP=null;FISHING=null;const o=t||pvpTarget();
  if(o){const dx=o.x-P.x,dy=o.y-P.y;P.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');}
  P.swing=.2;P.swingCD=.8;P.hitDone=true;sfx('swing');if(roomUp())NET.send({t:'sw',d:P.dir,h:[],o:-1});
  if(!o){let n=null,nd=30;for(const q of OTH.values()){if(q.pend)continue;const d=Math.hypot(q.x-P.x,q.y-P.y);if(d<nd){nd=d;n=q;}}if(n)pvpWhy(n);return;}
  if(!MP.pvpOn||!roomUp()){if(time-whyT>3){whyT=time;toast('Fighting isn’t switched on in this world yet.','bad');}return;}
  NET.send({t:'atk',to:o.id});}
// crossing the wall: the first time, a warning you have to accept
function wildStep(dt){const w=P.y<WILD_Y;
  if(w&&!S.flags.wildok){P.y=WILD_Y+3;stick={x:0,y:0,on:false};knob.style.transform='';for(const k of ['ArrowUp','KeyW'])keys[k]=false;if(!paused)openWildWarn();return;}
  if(w!==wasWild){wasWild=w;document.documentElement.classList.toggle('inwild',w);MP.riskKey='';
    if(started){if(w){toast('You enter the Wilderness. Other players can attack you here.','bad');buzz(30);}
      else{toast('You leave the Wilderness.','good');if(closeCall&&P.hp>0&&P.hp<=hpMax()*.1)secret('closecall');}}closeCall=false;}
  if(w){const l=wildLvl(P.y);if(l>(S.cnt.wilddeep||0))S.cnt.wilddeep=l;if(P.hp<hpMax()*.1&&P.hp>0)closeCall=true;}
  // health climbs back 1 a second after 8 s out of a fight (the same rule the server uses)
  if(P.hp>0&&P.hp<hpMax()&&time-(MP.lc??-99)>8)P.hp=Math.min(hpMax(),P.hp+dt);
  // defeated but the server's word never came (a dropped message): don't leave the hero standing at 0 health
  if(P.hp<=0&&MP.deadAt&&time-MP.deadAt>2){MP.deadAt=0;respawnHold();save(true);toast('You were defeated and woke up back in the Hold.','bad');}if(P.hp>hpMax())P.hp=hpMax();
  wildHud();}
function wildHud(){const w=inWild(),l=w?wildLvl(P.y):0,key=l+'|'+S.lvl+'|'+(skulled()?1:0);if(key===wildHud.k)return;wildHud.k=key;const el=$('wildB');if(!el)return;el.hidden=!w;if(!w)return;
  const [a,b]=lvlRange(l);if(!$('wildIc').getAttribute('src'))$('wildIc').src=ART.skull.toDataURL();
  $('wildL').textContent='Wilderness '+l;$('wildR').textContent='Lv '+a+'–'+b+(skulled()?' · skulled':'');el.classList.toggle('sk',skulled());}
// what you'd drop if you fell: your bag and the gear you wear (not starter gear, not bound or goal items), most valuable first
function riskList(){const out=[],DEFG={blade:'rusty',mail:'none',lantern:'basic'};
  for(const [id,n] of Object.entries(S.bank))if(ITEMS[id]&&tradable(id)&&n>0)out.push([id,n,0,ITEMS[id].v||0]);
  for(const sl of ['blade','mail','lantern','cape','helm']){const t=S.gear[sl];if(!t||DEFG[sl]===t)continue;const id=gearId(sl,t);if(id&&tradable(id))out.push([id,1,sl,ITEMS[id].v||0]);}
  return out.sort((a,b)=>b[3]-a[3]).slice(0,80);}
// the Return Flame (hold it for 2 s) works in the Wilderness up to level 20: home to the Hold. A hit interrupts it.
function wildReturn(){FISHING=null;CHOP=null;const h=HOLD.spawn;P.x=h.x;P.y=h.y+8;P.dir='down';MP.aim=null;S.pos={x:P.x,y:P.y};
  if(roomUp()&&MP.pvpOn)NET.send({t:'home',x:Math.round(P.x),y:Math.round(P.y)});MP.sent='';sfx('flame');puff(P.x,P.y-10,'#ffcd75',16);toast('The Return Flame carries you home to the Hold.','good');save();}
// back at the Hold after falling in the Wilderness (no new world: you stay where your friends are)
function respawnHold(){MP.deadAt=0;FISHING=null;CHOP=null;if(COOK)stopCook();P.x=HOLD.spawn.x;P.y=HOLD.spawn.y+8;S.pos={x:P.x,y:P.y};P.dir='down';P.hp=hpMax();P.inv=1.2;P.swing=0;MP.lc=-99;MP.sent='';MP.aim=null;}
function applyPkDeath(m){const lost=Array.isArray(m.lost)?m.lost:[],kept=Array.isArray(m.kept)?m.kept:[],L={},K={},DEFG={blade:'rusty',mail:'none',lantern:'basic',cape:null,helm:null};
  for(const [id,n,slot] of lost){if(!ITEMS[id]||!(n>0))continue;
    if(slot&&DEFG.hasOwnProperty(slot)&&gearId(slot,S.gear[slot])===id)S.gear[slot]=DEFG[slot];
    else{const k=Math.min(n,S.bank[id]||0);if(k){S.bank[id]-=k;if(S.bank[id]<=0)delete S.bank[id];}}L[id]=(L[id]||0)+n;}
  for(const [id,n] of kept)if(ITEMS[id])K[id]=(K[id]||0)+n;
  const wasSk=!!m.sk;S.skull=0;bump('pkd');if(netOn())NET.lsend({t:'pdie',k:'wild',by:typeof m.by==='string'?m.by:undefined});if(scene==='hold')respawnHold();else S.pos=null;save(true);updateQuick(true);sfx('die');buzz(200);
  openSheet(`<h2>Defeated in the Wilderness</h2><p class="lead">${chatEsc(m.by||'Another hero')} defeated you${m.away?' while you were logged out mid-fight':''}. ${wasSk?'You were <b>skulled</b>, so you dropped everything you carried and wore.':'You kept your 3 most valuable items and dropped the rest.'} Your Bank is always safe.</p>
   ${Object.keys(K).length?'<h3>Kept</h3>'+listItems(K):''}${Object.keys(L).length?'<h3>Dropped where you fell</h3>'+listItems(L):'<p class="lead small">You weren’t carrying anything worth taking.</p>'}
   <p class="lead small">Next time: bank what you can’t afford to lose before heading north, and don’t attack first unless you’re ready to risk it all.</p><div class="row"><button class="btn" id="sx">Back to the Hold</button></div>`);$('sx').onclick=closeSheet;}
function wildRules(){return `<ul class="info"><li><b>Other players can attack you</b> north of the wall, and you can attack them.</li>
   <li>The further north, the higher the <b>Wilderness level</b> (1 to 20). You can fight heroes whose combat level is within that many levels of yours.</li>
   <li>Attack someone who hasn’t attacked you and you get a <b>skull</b> over your head for 20 minutes.</li>
   <li>Fall here and you <b>drop your items</b> where you stand: everything in your bag and the gear you wear. Without a skull you keep your 3 most valuable items. With a skull you keep nothing.</li>
   <li>Your Bank is always safe. Logging out in the middle of a fight leaves your hero standing there for 15 seconds.</li>
   <li>Up north: the <b>Gloom Pond</b> (Gloomfin, Fishing 15) and <b>Blackwood</b> trees (Woodcutting 15).</li></ul>`;}
function openWildWarn(){openSheet(`<div class="wildhd"><img alt="" src="${ART.skullpost.toDataURL()}"><span><b>The Wilderness</b><small>Beyond the wall, heroes fight heroes</small></span></div>${wildRules()}
   <div class="row"><button class="btn alt" id="wStay">Stay in the Hold</button><button class="btn danger" id="wGo">Enter the Wilderness</button></div>`);
  $('wStay').onclick=closeSheet;$('wGo').onclick=()=>{S.flags.wildok=true;save();closeSheet();P.y=WILD_Y-4;sfx('boss');};}
function openWildSign(){openSheet(`<div class="wildhd"><img alt="" src="${ART.wsign.toDataURL()}"><span><b>Danger: the Wilderness</b><small>North of this wall</small></span></div>${wildRules()}<div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;}
// north is up: tap the compass for a reminder of what lies where
$('compass').addEventListener('click',()=>{if(started)toast(inWild()?'North takes you deeper into the Wilderness. South is the way home.':'North, past the old wall: the Wilderness, where players can fight.',inWild()?'bad':'');});

// ---------- farm ----------
const growth=st=>Math.min(1,(Date.now()-st.t0)/1000/CROPS[st.crop].grow);
let farmSel=null,farmQty=0,farmTick=null;
const plotsOpen=()=>plotCap(lvlOf('farming'),S.plotBuys||0);
const emptyPlots=()=>S.plots.map((p,i)=>p||i>=plotsOpen()?-1:i).filter(i=>i>=0);
const readyPlots=()=>S.plots.map((p,i)=>p&&growth(p)>=1?i:-1).filter(i=>i>=0);
function harvestAll(replant){const got={},again=[];let xp=0;for(const i of readyPlots()){const st=S.plots[i];again.push([i,st.crop]);const c=CROPS[st.crop],n=ri(c.yield[0],c.yield[1])+(rand()<lvlOf('farming')/100?1:0);give(S.bank,c.out,n);xp+=c.xp*n;got[c.out]=(got[c.out]||0)+n;bump('crops',n);S.plots[i]=null;const p=HOLD.plots[i];puff(p.cx,p.cy,'#a7f070',6);}
  if(xp)skillXp('farming',xp);
  if(replant){let n=0,pxp=0;for(const [i,k] of again){const c=CROPS[k];if(i>=plotsOpen()||S.plots[i]||lvlOf('farming')<c.lvl||avail(c.seed)<1)continue;take(c.seed,1);S.plots[i]={crop:k,t0:Date.now()};pxp+=c.plantXp;n++;}if(n){skillXp('farming',pxp);sfx('plant');}}
  save();const txt=Object.entries(got).map(([id,n])=>'+'+n+' '+ITEMS[id].n).join(', ');if(txt){floatText(P.x,P.y-20,txt,'#a7f070');toast('Harvested '+txt+' · '+xp+' Farming xp','good');}}
function plantMany(crop,n){const free=emptyPlots().slice(0,n),c=CROPS[crop];n=Math.min(free.length,avail(c.seed));
  for(let k=0;k<n;k++){const i=free[k];S.plots[i]={crop,t0:Date.now()};const p=HOLD.plots[i];puff(p.cx,p.cy,'#a0663b',4);}take(c.seed,n);if(n){sfx('plant');S.flags.planted=true;skillXp('farming',c.plantXp*n);}save();toast('Planted '+n+' '+c.n+' · '+c.plantXp*n+' Farming xp','good');}
// the sheet's grid matches the field: 2 rows of 6, plot index = column*2 + row
function plotCells(){const open=plotsOpen(),cells=[];for(let r=0;r<2;r++)for(let c=0;c<6;c++){const i=c*2+r,st=S.plots[i];
  if(!st){cells.push(i<open?`<div class="plot empty"><span class="pi"></span><small>Empty</small></div>`:`<div class="plot locked"><span class="pl">🔒</span><small>${i===open?'Next':'Locked'}</small></div>`);continue;}
  const gr=growth(st),c2=CROPS[st.crop],left=Math.ceil(c2.grow*(1-gr));
  cells.push(`<div class="plot ${gr>=1?'ready':''}">${iconImg(c2.out)}<small>${gr>=1?'Ready':fmtT(left)}</small><i style="width:${Math.round(gr*100)}%"></i></div>`);}
  return cells.join('');}
function plotExpand(){const open=plotsOpen(),lvl=lvlOf('farming'),cost=PLOT_BUYS[S.plotBuys||0],nextL=PLOT_LVLS.find(l=>l>lvl);
  if(open>=PLOT_MAX)return `<p class="lead small">All ${PLOT_MAX} plots are open.</p>`;
  return `<h3>Expand the farm <small>${open} of ${PLOT_MAX} plots open</small></h3>
  <p class="lead small">${nextL?`The next plot opens for free at <b>Farming ${nextL}</b>. `:''}Or buy one now${cost!==undefined?'':' (you have bought every plot you can)'}.</p>
  ${cost!==undefined?`<button class="btn big" id="pbuy" ${S.gold>=cost?'':'disabled'}>Buy a plot · ${fmt(cost)} gold</button>${S.gold<cost?`<p class="lead small">You have ${fmt(S.gold)} gold.</p>`:''}`:''}`;}
function buyPlot(){const cost=PLOT_BUYS[S.plotBuys||0];if(cost===undefined||S.gold<cost||plotsOpen()>=PLOT_MAX)return;S.gold-=cost;S.plotBuys=(S.plotBuys||0)+1;save();sfx('level');toast('New farm plot! '+plotsOpen()+' of '+PLOT_MAX+' open','good');}
const fmtT=s=>s>=60?Math.floor(s/60)+'m '+(s%60)+'s':s+'s';
let farmPicked=false;
function openFarm(){
  const free=emptyPlots().length,ready=readyPlots().length,crops=Object.entries(CROPS);
  const canCrop=c=>avail(c.seed)>0&&lvlOf('farming')>=c.lvl,lvl=lvlOf('farming');
  if(!farmSel||!canCrop(CROPS[farmSel])&&!farmPicked){const f=crops.find(([k,c])=>canCrop(c))||crops.find(([k,c])=>avail(c.seed)>0);farmSel=f?f[0]:crops[0][0];}
  const sc=CROPS[farmSel],sn=avail(sc.seed),sName=ITEMS[sc.seed].n+(sn===1?'':'s');
  const why=lvl<sc.lvl?`<p class="lead small lockmsg">🔒 You have ${sn?sn+' '+sName:'no '+ITEMS[sc.seed].n+'s'}, but planting ${sc.n} needs <b>Farming ${sc.lvl}</b> (you're Farming ${lvl}). Plant and harvest Wheat to level up.${sc.seed==='lampseed'?' Until then, Lampseed can be pressed into Oil Flasks at the Oil Press.':''}</p>`
    :`<p class="lead small">No ${ITEMS[sc.seed].n}s in your bag or bank.${sc.seed==='wheat_seed'?' Buy them at the Market.':' Find them in the Depths'+(sc.seed==='lampseed'?' or buy them at the Market.':'.')}</p>`;
  const seeds=canCrop(CROPS[farmSel])?avail(CROPS[farmSel].seed):0,max=Math.min(free,seeds);farmQty=max;   // default: fill every empty plot
  openSheet(`<h2>Farm</h2>${skillLine('farming')}<p class="lead small">Crops grow in real time, even while you're away. Higher Farming means a better chance of an extra crop.</p>
  <div class="plots" id="plots">${plotCells()}</div>
  ${ready?`<div class="row"><button class="btn big" id="harv">Harvest all (${ready})</button><button class="btn big alt" id="harvR">Harvest &amp; replant</button></div>`:''}
  <h3>Plant ${free?`<small>${free} empty plot${free>1?'s':''}</small>`:''}</h3>
  ${free?`<div class="list crops">${crops.map(([k,c])=>`<button class="item${canCrop(c)?'':' locked'}" aria-pressed="${k===farmSel}" data-crop="${k}">${iconImg(c.seed)}<span><b>${lvl<c.lvl?'🔒 ':''}${c.n}</b><small>${lvl<c.lvl?'Needs Farming '+c.lvl+' · ':''}${avail(c.seed)} ${ITEMS[c.seed].n}${avail(c.seed)===1?'':'s'} · ${fmtT(c.grow)} · ${c.yield[0]}–${c.yield[1]} each</small></span></button>`).join('')}</div>
   ${max?`<div class="qty"><span>How many?</span><button class="btn alt sm" id="qm" aria-label="Fewer">−</button><output id="qn">${farmQty}</output><button class="btn alt sm" id="qp" aria-label="More">+</button><button class="btn alt sm" id="qx">Max</button></div>
   <button class="btn big" id="plant">Plant ${farmQty} ${CROPS[farmSel].n}</button>`:why}`
   :'<p class="lead small">Every plot is growing. Harvest to free them up.</p>'}
  ${plotExpand()}
  <div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;
  if($('pbuy'))$('pbuy').onclick=()=>{buyPlot();openFarm();};
  if($('harv'))$('harv').onclick=()=>{harvestAll();openFarm();};if($('harvR'))$('harvR').onclick=()=>{harvestAll(true);openFarm();};
  q.querySelectorAll('[data-crop]').forEach(b=>b.onclick=()=>{farmSel=b.dataset.crop;farmPicked=true;farmQty=0;openFarm();});
  const setQ=v=>{farmQty=Math.max(1,Math.min(max,v));$('qn').textContent=farmQty;$('plant').textContent='Plant '+farmQty+' '+CROPS[farmSel].n;};
  if($('qm')){$('qm').onclick=()=>setQ(farmQty-1);$('qp').onclick=()=>setQ(farmQty+1);$('qx').onclick=()=>setQ(max);}
  if($('plant'))$('plant').onclick=()=>{plantMany(farmSel,farmQty);farmQty=0;openFarm();};
  clearInterval(farmTick);farmTick=setInterval(()=>{const el=$('plots');if(!el||$('sheet').hidden){clearInterval(farmTick);return;}el.innerHTML=plotCells();
    const r=readyPlots().length;if(r!==ready)openFarm();},1000);
}

// ---------- panels ----------
let paused=false;
function openSheet(html,after){$('sheetBody').innerHTML=html;$('sheet').hidden=false;paused=true;stick={x:0,y:0,on:false};knob.style.transform='';retHeld=false;P.moving=false;P.chan=0;}
function closeSheet(){$('sheet').hidden=true;paused=false;updateHud();}
$('sheet').addEventListener('click',e=>{if(e.target.id==='sheet')closeSheet();});
function iconImg(id){return `<img class="ic" alt="" src="${iconOf(id).toDataURL()}">`;}
function openGate(){
  if(MP.party&&MP.party.leader!==MP.id&&netOn())return MP.gateMember();
  const lifts=LIFTS.filter(f=>f<=S.lift&&(!liftBoss(f)||S.bosses[liftBoss(f)])),LIFT_ORE={1:'copper_ore',6:'iron_ore',11:'coal_ore',16:'cobalt_ore'};
  openSheet(`<h2>The Delve Gate</h2><p class="lead">Your lantern starts full. It burns oil as you go, faster on deeper floors. At empty, Shades come for you.</p>
  <div class="kit"><span>${iconImg('oil')} Oil Flasks <b>${S.bank.oil||0}</b></span><span>${iconImg('bread')} Bread <b>${S.bank.bread||0}</b></span><span>${iconImg('pondfin')} Fish <b>${S.bank.pondfin||0}</b></span><span>${iconImg('stew')} Stew <b>${S.bank.stew||0}</b></span></div>
  <div class="gear" style="--rc:${RARITY[LANTERNS[S.gear.lantern].r].c}">${iconImg(S.gear.lantern+'_lantern')}<span><small>Your lantern</small><b>${LANTERNS[S.gear.lantern].n}</b><small>${lanStat(S.gear.lantern)}${A('oil')?' · cape: oil lasts '+A('oil')+'% longer':''}</small></span></div>
  ${(()=>{const n=Object.keys(S.bank).filter(id=>ITEMS[id]&&!['oil','bread','stew','pondfin'].includes(id)).length,sup=['oil','bread','stew','pondfin'].reduce((a,id)=>a+(S.vault[id]||0),0);
    return (n?`<p class="lead small warn">Your bag holds ${n} other stack${n>1?'s':''} that could be lost. <button class="link inl" id="toBank">Visit the Bank</button></p>`:'')+(sup?`<button class="btn alt big" id="pack">Take ${sup} supplies from the Bank</button>`:'');})()}
  <div class="list">${lifts.map(f=>`<button class="item" data-go="${f}">${iconImg(LIFT_ORE[f]||'copper_ore')}<span><b>${f===1?'Enter floor 1':'Take the lift to floor '+f}</b><small>${BIOMES[packOf(f).id].name}${liftBoss(f)?' · unlocked by beating '+PACKS.find(p=>p.boss===liftBoss(f)).bossName.replace(/^The /,'the '):''}</small></span></button>`).join('')}
  ${LIFTS.filter(f=>!lifts.includes(f)).slice(0,1).map(f=>`<div class="item locked">${iconImg(LIFT_ORE[f]||'copper_ore')}<span><b>Lift to floor ${f} · ${BIOMES[packOf(f).id].name}</b><small>Beat ${PACKS.find(p=>p.boss===liftBoss(f)).bossName.replace(/^The /,'the ')} to open it</small></span></div>`).join('')}</div>
  <p class="lead small">Deepest floor: ${S.deepest||'none yet'}. Light the Return Flame (hold the flame button for 2 seconds) to come home with your loot. Dying loses about half of what you carry.</p>
  <div class="row"><button class="btn alt" id="sx">Not yet</button></div>`);
  $('sx').onclick=closeSheet;$('sheet').querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>MP.delve(+b.dataset.go));
  if($('toBank'))$('toBank').onclick=openBank;if($('pack'))$('pack').onclick=()=>{for(const id of ['oil','bread','stew','pondfin'])withdraw(id,0);save();sfx('pick');openGate();};
}
// ---- XP: the skill you're training shows as a thin strip under your health, and for a few seconds after each gain
// the goals pill turns into "Fishing 12 · ▬▬ · 230 xp to 13" (tap it for the Skills tab). Combat counts too.
let xpTipT=0,xpLast=null;
function xpInfo(k){if(k==='combat'){const need=xpNeed(S.flv);const mx=S.flv>=FIGHT_MAX;return {n:'Fighting',c:'#ef7d57',icon:S.gear.blade==='rusty'?'rusty_blade':S.gear.blade+'_blade',l:S.flv,p:mx?1:S.xp/need,left:need-S.xp,max:mx};}
  const l=lvlOf(k),xp=S.skills[k]||0,a=XP_TABLE[l],b=XP_TABLE[Math.min(99,l+1)];return {n:SKILLS[k].n,c:SKILLS[k].c,icon:SKILLS[k].icon,l,p:l>=99?1:(xp-a)/(b-a),left:Math.ceil(b-xp),max:l>=99};}
function xpShow(k){if(!started)return;const x=xpInfo(k),f=$('xpFill'),bar=$('xpb'),g=$('guide');xpLast=k;
  bar.hidden=false;f.style.width=Math.max(2,Math.round(x.p*100))+'%';f.style.background=x.c;f.style.color=x.c;bar.title=x.n;
  const land=document.documentElement.classList.contains('land');
  g.innerHTML=`${iconImg(x.icon)}<b>${x.n} ${x.l}</b>${land?'':`<i class="xpm"><i style="width:${Math.round(x.p*100)}%;background:${x.c}"></i></i>`}<small>${x.max?'max level':(land?' · ':'')+fmt(x.left)+' xp to '+(x.l+1)}</small>`;
  g.classList.add('xp');g.hidden=false;xpTipT=time+5;}
function skillLine(sk){const l=lvlOf(sk),xp=S.skills[sk]||0,a=XP_TABLE[l],b=XP_TABLE[Math.min(99,l+1)],p=l>=99?1:(xp-a)/(b-a);
  return `<div class="skl${xpLast===sk?' cur':''}">${iconImg(SKILLS[sk].icon)}<span><b>${SKILLS[sk].n} <em>${l}</em><small>/99</small>${xpLast===sk?' <small class="trn">training</small>':''}</b><i class="xpb"><i style="width:${Math.round(p*100)}%;background:${SKILLS[sk].c}"></i></i><small>${l>=99?'Max level':`<b>${fmt(Math.ceil(b-xp))}</b> xp to level ${l+1} · ${fmt(Math.floor(xp-a))} / ${fmt(b-a)} (${Math.floor(p*100)}%)`}</small></span></div>`;}
function combatLine(){const x=xpInfo('combat'),pts=cbPts(),div=cbDiv(),base=combatFrom(S.flv,S.skills),nextAt=(base+1)*div,held=(S.cbFloor||1)>base,cp=Math.max(0,Math.min(1,(pts-base*div)/div));
  return `<div class="skl cbsum"><span class="ic cbic">⚔</span><span><b>Combat level <em>${S.lvl}</em></b><i class="xpb"><i style="width:${held?100:Math.round(cp*100)}%;background:#ffcd75"></i></i><small>${held?`Kept from before the update. It climbs again once Fighting and your skills pass it (${pts}/${(S.lvl+1)*div} points).`:`<b>${nextAt-pts}</b> more point${nextAt-pts===1?'':'s'} to combat level ${base+1} · Fighting counts 2 points a level, every other skill 1`}</small></span></div>
   <div class="skl${xpLast==='combat'?' cur':''}">${iconImg(x.icon)}<span><b>Fighting <em>${x.l}</em><small>/${FIGHT_MAX}</small>${xpLast==='combat'?' <small class="trn">training</small>':''}</b><i class="xpb"><i style="width:${Math.round(x.p*100)}%;background:${x.c}"></i></i><small>${x.max?'Max level':`<b>${fmt(x.left)}</b> xp to level ${x.l+1} · from monsters in the Depths`}</small></span></div>`;}
const burnChance=r=>!r.burn?0:Math.max(0,r.burn.chance*(1-(lvlOf('cooking')-1)/(r.burn.safeAt-1)))*(1-A('cookSafe')/100);
function maxMake(r){let n=Infinity;for(const [id,q] of Object.entries(r.need))n=Math.min(n,Math.floor(avail(id)/q));return n===Infinity?0:n;}
// ---------- timed cooking: each item takes a moment at the Kitchen; Cook All queues them up ----------
const cookTime=r=>r.time||(r.fish&&FISH[r.fish]?2+.05*(FISH[r.fish].lvl-1):2);
let COOK=null;
function startCook(r,n){const kit=HOLD.objs.find(o=>o.type==='kitchen');
  n=Math.min(n,maxMake(r));if(n<1)return;FISHING=null;CHOP=null;closeSheet();
  COOK={r,n,i:0,t:0,ok:0,burnt:0,xp:0,px:P.x,py:P.y,kx:kit?kit.x:P.x,ky:kit?kit.y-14:P.y-20};sfx('cook');}
function stopCook(why){const c=COOK;if(!c)return;COOK=null;if(c.ok||c.burnt){if(c.xp)skillXp('cooking',c.xp);save();
    toast(`Cooked ${c.ok} ${ITEMS[c.r.out].n}${c.burnt?`, burnt ${c.burnt}`:''}${c.xp?' · '+c.xp+' Cooking xp':''}${why?' · '+why:''}`,c.burnt&&!c.ok?'bad':'good');}
  else if(why)toast(why);}
function updateCook(dt){const c=COOK;if(!c)return;
  if(P.moving||scene!=='hold'||Math.hypot(P.x-c.px,P.y-c.py)>3)return stopCook('stopped');
  c.t+=dt;if(Math.random()<dt*3)puff(c.kx+(Math.random()-.5)*6,c.ky,'#f4f4f4',1);
  if(c.t<cookTime(c.r))return;c.t=0;
  if(!canMake(c.r))return stopCook('out of ingredients');
  for(const [id,q] of Object.entries(c.r.need))take(id,q);
  if(rand()<burnChance(c.r)){give(S.bank,c.r.burn.out,1);c.burnt++;bump('burnt');floatText(P.x,P.y-24,'Burnt!','#94b0c2');sfx('hurt');}
  else{give(S.bank,c.r.out,c.r.n||1);c.ok++;c.xp+=c.r.xp;bump('cooked');S.flags.cooked=true;floatText(P.x,P.y-24,'+1 '+ITEMS[c.r.out].n,'#ef7d57');sfx('pick');}
  puff(c.kx,c.ky,'#ffcd75',4);c.i++;updateQuick(true);
  if(c.i>=c.n){c.i=c.n;stopCook();}}
function drawCook(){const c=COOK;if(!c)return;const k=Math.min(1,c.t/cookTime(c.r)),X=Math.round(P.x),Y=Math.round(P.y-(ADMIN_HATS[S.gear.helm]?46:36));
  g.fillStyle='rgba(26,28,44,.85)';g.fillRect(X-12,Y,24,5);g.fillStyle='#ef7d57';g.fillRect(X-11,Y+1,Math.round(22*k),3);
  ptDraw(g,(c.i+1)+'/'+c.n,X,Y-6,{font:'small',px:7,color:'#ffcd75'});}
function cook(r,n){let ok=0,burnt=0,xp=0;for(let i=0;i<n&&canMake(r);i++){for(const [id,q] of Object.entries(r.need))take(id,q);
    if(rand()<burnChance(r)){give(S.bank,r.burn.out,1);burnt++;}else{give(S.bank,r.out,r.n||1);ok++;xp+=r.xp;}}
  sfx('cook');if(xp)skillXp('cooking',xp);bump('cooked',ok);bump('burnt',burnt);S.flags.cooked=true;save();toast(`Cooked ${ok} ${ITEMS[r.out].n}${burnt?`, burnt ${burnt}`:''}${xp?' · '+xp+' Cooking xp':''}`,burnt&&!ok?'bad':'good');}
function openKitchen(){const lv=lvlOf('cooking');
  openSheet(`<h2>The Kitchen</h2>${skillLine('cooking')}<p class="lead small">Food heals you in the Depths. Higher Cooking means less burnt food.</p><div class="list">${RECIPES.kitchen.map((r,i)=>{const it=ITEMS[r.out],m=maxMake(r),lock=lv<r.lvl,bc=burnChance(r);
    return `<div class="recipe${lock?' locked':''}"><div class="rh">${iconImg(r.out)}<span><b>${it.n}</b><small>Heals ${it.heal} · ${r.xp} xp · ${cookTime(r)} s each${bc>0?' · '+Math.round(bc*100)+'% burn':''} · have ${avail(r.out)}${lock?' · Needs Cooking '+r.lvl:''}</small></span></div><div class="need">${needText(r)}</div>
    <div class="cookb"><button class="btn sm" data-ck="${i}" data-n="1" ${!lock&&m>=1?'':'disabled'}>Cook 1</button><button class="btn sm alt" data-ck="${i}" data-n="5" ${!lock&&m>=5?'':'disabled'}>×5</button><button class="btn sm alt" data-ck="${i}" data-n="${m}" ${!lock&&m>1?'':'disabled'}>All${m>1?' ('+m+')':''}</button></div></div>`;}).join('')}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;$('sheet').querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>startCook(RECIPES.kitchen[+b.dataset.ck],+b.dataset.n));}
function needText(r){const p=Object.entries(r.need).map(([id,n])=>`<span class="${has(id,n)?'ok':'no'}">${iconImg(id)}${avail(id)}/${n}</span>`);if(r.gold)p.push(`<span class="${S.gold>=r.gold?'ok':'no'}">${iconImg('gold')}${r.gold}</span>`);return p.join('');}
const canMake=r=>Object.entries(r.need).every(([id,n])=>has(id,n))&&S.gold>=(r.gold||0)&&(!r.lvl||RECIPES.forge.indexOf(r)<0||lvlOf('smithing')>=r.lvl);
function openCraft(kind){
  const T2={forge:['The Forge','Forge gear to train Smithing. Better gear unlocks as your level rises. New gear goes into your bag; equipping it swaps your old piece back into the bag.'],kitchen:['The Kitchen','Food heals you mid-delve. Use it with the food button.'],press:['The Oil Press','Lampseed becomes Oil Flasks, the fuel for your lantern.']}[kind];
  openSheet(`<h2>${T2[0]}</h2>${kind==='forge'?skillLine('smithing'):''}<p class="lead${kind==='forge'?' small':''}">${T2[1]}</p><div class="list">${RECIPES[kind].map((r,i)=>{const lock=kind==='forge'&&lvlOf('smithing')<r.lvl;const it=ITEMS[r.out],owned=it.gear&&(S.gear[it.gear]===it.tier||(avail(r.out))>0);
    const stat=it.gear?(it.gear==='blade'?'Damage '+GEAR.blade[it.tier].dmg:'Defense '+GEAR[it.gear][it.tier].def):it.heal?'Heals '+it.heal:it.oil?'+'+it.oil+'% oil':'';
    return `<div class="recipe"><div class="rh">${iconImg(r.out)}<span><b>${it.n}${r.n?' ×'+r.n:''}</b><small>${lock?'<span class="lockt">Needs Smithing '+r.lvl+'</span> · ':''}${stat}${kind==='forge'?' · '+r.xp+' xp':''}${owned?' · owned':''}${kind!=='forge'?' · have '+(avail(r.out)):''}</small></span><button class="btn sm" data-make="${i}" ${canMake(r)?'':'disabled'}>Make</button></div><div class="need">${needText(r)}</div></div>`;}).join('')}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
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
   ${tog('pnames','Player names',SET.pnames)}${tog('feed','World feed in the Hold',SET.feed)}${tog('shake','Screen shake',SET.shake)}
   <h3>Sound and feel</h3>${tog('sound','Sound effects',!muted)}${tog('vib','Vibration',SET.vib)}
   <h3>Help</h3><div class="setrow"><span>Guides for everything in the game</span><a class="btn alt sm" href="/wiki/" target="_blank" rel="noopener">Open the wiki</a></div>
   <div class="row"><button class="btn alt" id="sdef">Reset to default</button><button class="btn" id="sx">Done</button></div>`);
  const q=s=>$('sheet').querySelectorAll(s);$('sx').onclick=closeSheet;
  q('[data-zoom]').forEach(b=>b.onclick=()=>{SET.zoom=+b.dataset.zoom;saveSet(true);openSettings();});
  const r=$('bright');r.oninput=()=>{SET.bright=+r.value;$('bv').textContent=SET.bright+'%';applySet();};r.onchange=()=>saveSet();
  q('[data-tog]').forEach(b=>b.onclick=()=>{const k=b.dataset.tog;if(k==='sound'){muted=!muted;try{localStorage.setItem('lanternhold.mute',muted?'1':'0');}catch(e){}}else SET[k]=!SET[k];saveSet();openSettings();});
  $('sdef').onclick=()=>{Object.assign(SET,SET_DEF,{shake:!reduceMotion});muted=false;try{localStorage.setItem('lanternhold.mute','0');}catch(e){}saveSet(true);openSettings();};}
let sellArm=null;
const TALLOW_HI=['Lanterns, oil, a bite to eat. What\'ll it be?','Ah, a delver! Mind the dark down there.','Sell me your spoils. Fair prices, mostly.','Back again? My cart\'s always open.'];
function openMarket(tab,hello){if(hello)MP.tallowHi=TALLOW_HI[ri(0,TALLOW_HI.length-1)];
  const ok=id=>ITEMS[id]&&!ITEMS[id].bound&&!ITEMS[id].keep,byV=(a,b)=>ITEMS[b].v-ITEMS[a].v;
  const rows=(store,from)=>Object.keys(store).filter(id=>ok(id)&&store[id]>0).sort(byV).map(id=>{const n=store[id],arm=sellArm===from+':'+id;
    return `<div class="recipe"><div class="rh">${iconImg(id)}<span><b>${ITEMS[id].n}</b><small>×${n} · ${fmt(ITEMS[id].v)} gold each${ITEMS[id].relic?' · Relic':''}${rTag(id)?' · '+rTag(id):''}</small></span><button class="btn sm${arm?' warn':''}" data-sell="${id}" data-from="${from}">${arm?'Sure?':'Sell 1'}</button>${n>1?`<button class="btn sm alt" data-sellall="${id}" data-from="${from}">All</button>`:''}</div></div>`;}).join('');
  const bagR=rows(S.bank,'bag'),bankR=rows(S.vault,'bank');
  const body=tab==='sell'?`<h3>From your bag</h3>${bagR||'<p class="lead small">Nothing in your bag to sell.</p>'}<h3>From your bank</h3>${bankR||'<p class="lead small">Nothing in your bank to sell.</p>'}<p class="lead small">Gear you're wearing isn't listed. Take it off in your bag to sell it.</p>`
   :tab==='shop'?SHOP.map(s=>`<div class="recipe"><div class="rh">${iconImg(s.id)}<span><b>${ITEMS[s.id].n}</b><small>${s.price} gold each</small></span><button class="btn sm" data-buy="${s.id}" data-n="1" ${S.gold>=s.price?'':'disabled'}>Buy 1</button><button class="btn sm alt" data-buy="${s.id}" data-n="5" ${S.gold>=s.price*5?'':'disabled'}>×5</button></div></div>`).join('')+'<p class="lead small">Trading between players arrives in a later update. Tallow\'s stock grows with each season.</p>':'';
  openSheet(`<div class="npchd"><img alt="" src="${ART.merchant[0].toDataURL()}"><span><b>Tallow</b><small>Travelling merchant</small><em>“${chatEsc(MP.tallowHi||TALLOW_HI[0])}”</em></span></div><div class="tabs"><button class="tab" aria-selected="${tab==='shop'}" data-tab="shop">Buy</button><button class="tab" aria-selected="${tab==='sell'}" data-tab="sell">Sell</button></div><p class="lead">You have ${iconImg('gold')} <b>${fmt(S.gold)}</b> gold.</p><div class="list">${body}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
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
  if(bagTab==='hero'){body=`<div class="hero"><img class="ic" alt="" src="${hc.toDataURL()}"><span><b>${esc(S.name||'Adventurer')}</b><small>${FND&&FND.no?'Hero #'+nfmt(FND.no)+' · ':''}${wl}${window.ACC&&ACC.online()?' · saved to your account':''}</small></span>${scene==='hold'?'<button class="btn alt sm" id="look">Change look</button>':''}</div>${linkRows()}${xRow()}
   <div class="stats"><span>Combat <b>${S.lvl}</b></span><span>HP <b>${Math.ceil(P.hp)}/${maxHp()}</b></span><span>Damage <b>${Math.round(dmgOf())}</b></span><span>Defense <b>${defOf()}</b></span></div>
   <div class="gears">
    ${row(iconImg(gearId('blade',bl)),'Blade',ITEMS[gearId('blade',bl)].n,'Damage '+GEAR.blade[bl].dmg,`<button class="btn alt sm" data-eq="blade">Change${owned('gear')&&allKeys().some(id=>itemSlot(id)==='blade')?' ('+allKeys().filter(id=>itemSlot(id)==='blade').length+')':''}</button>`)}
    ${row(iconImg(gearId('mail',ml)),'Armor',ITEMS[gearId('mail',ml)].n,'Defense '+GEAR.mail[ml].def,`<button class="btn alt sm" data-eq="mail">Change${allKeys().some(id=>itemSlot(id)==='mail')?' ('+allKeys().filter(id=>itemSlot(id)==='mail').length+')':''}</button>`)}
    ${row(iconImg(ln+'_lantern'),'Lantern '+rTag(ln+'_lantern'),LANTERNS[ln].n,lanStat(ln),`<button class="btn alt sm" data-eq="lantern">Change${owned('lantern')?' ('+owned('lantern')+')':''}</button>`,ln+'_lantern')}
    ${cp?row(iconImg('cape_'+cp),'Cape '+rTag('cape_'+cp),CAPES[cp].n,capeStat(cp),`<button class="btn alt sm" data-eq="cape">Change</button>`,'cape_'+cp)
        :row('<i class="ic blank"></i>','Cape','No cape',owned('cape')?'You have '+owned('cape')+' to wear':'Capes are rare finds in the Depths',owned('cape')?`<button class="btn alt sm" data-eq="cape">Wear</button>`:'')}
    ${S.gear.helm?row(iconImg(gearId('helm',S.gear.helm)),'Helmet '+rTag(gearId('helm',S.gear.helm)),ITEMS[gearId('helm',S.gear.helm)].n,helmStat(S.gear.helm),'<button class="btn alt sm" data-eq="helm">Change</button>',gearId('helm',S.gear.helm))
       :row('<i class="ic blank"></i>','Helmet','No helmet',allKeys().some(id=>itemSlot(id)==='helm')?'You have one to wear':'Forge one from Smithing 3',allKeys().some(id=>itemSlot(id)==='helm')?'<button class="btn alt sm" data-eq="helm">Wear</button>':'')}
    ${isFounder()?row('<i class="ic flameic"></i>','Founder','Founder’s Flame',SET.flame!==false?'Lit: your light burns violet':'Off',`<button class="btn alt sm" id="flH">${SET.flame!==false?'Turn off':'Light it'}</button>`):''}
   </div>
   ${ADMIN?'<button class="btn big admin" id="adm">Admin powers</button>':''}
   <h3>Quick slots <small>tap to set</small></h3><div class="qslots">${S.quick.map((id,j)=>`<button class="qs" data-qs="${j}" aria-label="Quick slot ${j+1}${id?': '+ITEMS[id].n:''}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>
   <div class="row"><button class="btn alt" id="setO">Settings</button><button class="btn alt" id="gd">Goals</button></div>
   <div class="row"><button class="btn alt" id="reset">Reset progress</button><button class="btn alt" id="out">Sign out</button></div>`;}
  else if(bagTab==='skills'){body=`<div class="list">${combatLine()}${['woodcutting','fishing','farming','cooking','smithing','mining'].map(skillLine).join('')}</div><p class="small">Total level ${totalLvl()} · <button class="linkb" id="gd2">Goals ${goalsDone()}/${GOALS.length}</button></p>
   <div class="perks"><p><b>Farming</b> ${Math.round(lvlOf('farming'))}% chance of a bonus crop. Unlocks Lampseed at 3, Glowcap at 6.</p>
   <p><b>Fishing</b> ${Math.round(catchChance()*100)}% catch chance if you don't hook. Tap <b>Hook!</b> when the bobber dips for a sure catch. ${fmt(S.caught||0)} fish caught.</p>
   <p><b>Woodcutting</b> ${Math.round(chopChance()*100)}% chance per swing, one swing every ${chopEvery().toFixed(1)} s. Oaks at the Hold hold 300 logs, shared by everyone, then fall and regrow. ${fmt(C('logs'))} logs cut. Logs will feed a new skill soon, so stack them.</p>
   <p><b>Smithing</b> Forge gear for XP. Helmets at 3, armor at 6, Iron at 10–14, Ember at 25–32.</p>
   <p><b>Cooking</b> ${Math.round(burnChance(RECIPES.kitchen[1])*100)}% chance to burn Pondfin (none at level 30). Unlocks Glowcap Stew at 5.</p>
   <p class="small">Combat level ${S.lvl} · Fighting ${S.flv} · deepest floor ${S.deepest||'—'}</p><p><b>Combat level</b> = (2 × Fighting + all your skill levels) ÷ ${cbDiv()}. Every skill counts, so fishing, chopping, farming, cooking, smithing and mining all raise it. Fighting tops out at 99.</p></div>`;}
  else{const items=Object.entries(S.bank).filter(([id])=>ITEMS[id]).sort((a,b)=>(RORDER.indexOf(ITEMS[b[0]].rarity)+1)-(RORDER.indexOf(ITEMS[a[0]].rarity)+1));
   const pg=scene==='delve'&&run?(run.pack.gold||0):0,found=scene==='delve'&&run?Object.fromEntries(Object.entries(run.pack).filter(([id])=>id!=='gold')):{};
   body=`<div class="goldline">${iconImg('gold')}<span><b>${fmt(S.gold)}</b> gold${pg?` <em>+${fmt(pg)} found this delve</em>`:''}</span></div>${tokLine()}
   ${scene==='delve'&&Object.keys(found).length?'<h3>Found this delve</h3>'+listItems(found):''}<p class="lead small">Everything here comes with you into the Depths, and about half is lost if you fall. ${scene==='hold'?'Keep valuables in the Bank.':'Your Bank at the Hold is safe.'}</p><h3>On you</h3><div class="grid">${items.length?items.map(([id,n])=>`<button class="cell" data-item="${id}" aria-label="${ITEMS[id].n}, ${n}" ${rc(id)?`style="--rc:${rc(id).c}"`:''}>${iconImg(id)}<b>${n}</b><small>${ITEMS[id].n}</small></button>`).join(''):'<p class="lead">Empty.</p>'}</div>`;}
  openSheet(`<h2>${{hero:'Hero',skills:'Skills'}[bagTab]||'Bag'}</h2>${body}<div class="row"><button class="btn" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;q.querySelectorAll('[data-bt]').forEach(b=>b.onclick=()=>openBag(b.dataset.bt));
  q.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>openEquip(b.dataset.eq));if($('rewB'))$('rewB').onclick=()=>openRewards();
  q.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>openItem(b.dataset.item));
  q.querySelectorAll('[data-qs]').forEach(b=>b.onclick=()=>openQuickPick(+b.dataset.qs));
  if($('look'))$('look').onclick=()=>{closeSheet();ACC.editLook(S.name,S.look);};
  if($('flH'))$('flH').onclick=()=>{SET.flame=SET.flame===false;saveSet();sfx('pick');toast(SET.flame?'Founder’s Flame lit':'Founder’s Flame off');openBag('hero');};
  if($('adm'))$('adm').onclick=openAdmin;
  if($('setO'))$('setO').onclick=openSettings;if($('gLn'))$('gLn').onclick=()=>{$('gLn').disabled=true;ACC.linkGoogle();};
  if($('wLn'))$('wLn').onclick=async()=>{const b=$('wLn');b.disabled=true;b.textContent='Check wallet…';const r=await ACC.linkWallet();toast(r.ok?'Wallet connected: '+r.addr.slice(0,6)+'…'+r.addr.slice(-4):r.msg,r.ok?'good':'bad');openHero();};if($('xLn'))$('xLn').onclick=()=>{$('xLn').disabled=true;$('xLn').textContent='Opening X…';ACC.xLink();};
  if($('xUn'))$('xUn').onclick=async()=>{if(!xArm){xArm=true;return openHero();}xArm=false;const ok=await ACC.xUnlink();toast(ok?'X account unlinked':'Couldn’t unlink. Try again.',ok?'good':'bad');openHero();};if($('gd'))$('gd').onclick=()=>openGuide();if($('gd2'))$('gd2').onclick=()=>openGuide();
  if($('out'))$('out').onclick=()=>{notePos();save();ACC.flush();ACC.logout();};
  if($('reset'))$('reset').onclick=()=>{if($('reset').dataset.c){S=normalize({name:S.name,look:S.look,wallet:S.wallet});save();P.hp=maxHp();enterHold();closeSheet();toast('Progress reset');}else{$('reset').dataset.c=1;$('reset').textContent='Tap again to reset';}};
}
function itemInfo(id){const it=ITEMS[id],o=[];
  if(it.lantern)o.push(lanStat(it.lantern));if(it.cape)o.push(capeStat(it.cape));if(it.heal)o.push('Heals '+it.heal+' HP in the Depths');if(it.oil)o.push('Refills '+it.oil+'% lantern oil');
  if(it.gear)o.push(it.gear==='blade'?'Damage '+GEAR.blade[it.tier].dmg:it.gear==='helm'?helmStat(it.tier):'Defense '+GEAR.mail[it.tier].def);
  {const ok=Object.keys(ORES).find(k=>k+'_ore'===id);if(ok)o.push('Mined in the Depths · Mining '+ORES[ok].lvl);}
  if(it.rarity==='mythic'&&it.gear)o.push('One of the two rarest finds in the Depths');if(it.relic)o.push('Boss relic. Can be minted on-chain in the live game');
  const seedOf=Object.values(CROPS).find(c=>c.seed===id);if(seedOf)o.push('Plant at the Farm · Farming '+seedOf.lvl);
  const ck=RECIPES.kitchen.find(r=>r.need[id]);if(ck)o.push('Cook into '+ITEMS[ck.out].n+' at the Kitchen');
  if(id==='lampseed')o.push('Press into Oil Flasks at the Oil Press');if(/_ore$|gem|gel|bone/.test(id)&&RECIPES.forge.some(r=>r.need[id]))o.push('Used at the Forge');if(id==='starshard_ore')o.push('Prized by traders: sell it to Tallow');
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
   ${it.keep?'<p class="lead small" style="color:#ff77a8">Goal Relic. Earned only through goals. It can’t be sold, traded or dropped.</p>':`   <h3>Drop</h3><p class="lead small">It lands at your feet. Tap <b>Pick up</b> to take it back. ${scene==='delve'&&MP.shared()?'Your party sees it right away and can pick it up.':'After 30 seconds, other players nearby can see it and pick it up.'} It disappears after 3 minutes. ${scene==='hold'?'To swap items with a player, use Social → Nearby → Trade. To get gold instead, sell it to Tallow.':''}</p>
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
  const acts=[['kit','Top loadout: best gear + every lantern, cape and relic'],['gold','+10,000 gold'],['mats','+50 of every ore, gem and material'],['food','+20 food and Oil Flasks'],['skills','All skills to 99'],['combat','Combat level 50'],['bank','Max bank space'],['lift','Unlock every lift (floors 6, 11, 16)'],['heal','Full health and oil'],['god',(S.flags.god?'Turn off':'Turn on')+' god mode']].concat(scene==='delve'?PACKS.map(p=>['f'+p.to,'Jump to '+p.bossName+' (F'+p.to+')']):[]);
  openSheet(`<h2>Admin powers</h2><p class="lead small">Only party hat owners see this. Admin changes save to your account; the server skips its usual checks for admin heroes.</p><div class="list">${acts.map(([k,l])=>`<button class="item" data-ad="${k}"><span><b>${l}</b></span></button>`).join('')}</div><div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  $('sheet').querySelectorAll('[data-ad]').forEach(b=>b.onclick=()=>{const k=b.dataset.ad;
    if(k==='kit'){grantKit();S.gold-=100000;}
    if(k==='gold')S.gold+=10000;
    if(k==='mats')for(const id of ['copper_ore','iron_ore','ember_ore','coal_ore','cobalt_ore','starshard_ore','gem','slime_gel','bone','lampseed','glowcap_spore','wheat_seed','raw_pondfin','wheat','glowcap'])give(S.bank,id,50);
    if(k==='food')for(const id of ['oil','bread','pondfin','stew'])give(S.bank,id,20);
    if(k==='skills')for(const sk of Object.keys(SKILLS))S.skills[sk]=XP_TABLE[99];
    if(k==='combat'){S.flv=Math.max(S.flv,60);S.cbFloor=Math.max(S.cbFloor||1,50);S.xp=0;combatCheck();P.hp=hpMax();}
    if(k==='bank')S.bankBuys=BANK_BUYS.length;
    if(k==='lift'){for(const p of PACKS)S.bosses[p.boss]=true;S.lift=LIFTS[LIFTS.length-1];S.deepest=Math.max(S.deepest,S.lift);}
    if(k==='heal'){P.hp=maxHp();if(run)run.oil=100;}
    if(k==='god')S.flags.god=!S.flags.god;
    const jump=/^f\d+$/.test(k);if(jump){enterFloor(+k.slice(1));closeSheet();}
    save();sfx('level');toast('Admin: done','good');if(!jump)openAdmin();});}
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
const GOAL_CATS=[['start','First steps'],['skills','Skills'],['depths','The Depths'],['hold','Life at the Hold'],['wild','Wilderness'],['secret','Secrets']];
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
  {id:'smith35',cat:'skills',t:'Reach Smithing 35',hint:'Steel gear starts at 35: iron and coal at the Forge.',...lv('smithing',35),gold:300},
  {id:'mine10',cat:'skills',t:'Reach Mining 10',hint:'Mine the glinting rocks in the Depths. Iron needs Mining 10.',...lv('mining',10),gold:50},
  {id:'mine25',cat:'skills',t:'Reach Mining 25',hint:'Coal at 20, Emberite at 25.',...lv('mining',25),gold:150},
  {id:'mine40',cat:'skills',t:'Reach Mining 40',hint:'Enough to mine a Starshard.',...lv('mining',40),gold:400},
  {id:'total',cat:'skills',t:'Total skill level 100',hint:'Every skill counts.',...cn(totalLvl,100),gold:200},
  {id:'mother',cat:'depths',t:'Defeat Mother Slime',hint:'She waits on floor 5. Bring food.',done:()=>!!S.bosses.mother,gold:60},
  {id:'knight',cat:'depths',t:'Defeat the Ossuary Knight',hint:'Floor 10. Watch for his charge.',done:()=>!!S.bosses.knight,gold:150},
  {id:'f10',cat:'depths',t:'Reach floor 10',hint:'The crypt goes deep.',done:()=>S.deepest>=10,gold:100,prog:()=>[Math.min(10,S.deepest),10]},
  {id:'tyrant',cat:'depths',t:'Defeat the Forge Tyrant',hint:'Floor 15. Step out of the ring of fire before the hammer lands.',done:()=>!!S.bosses.tyrant,gold:300},
  {id:'warden',cat:'depths',t:'Defeat the Starwarden',hint:'Floor 20. When it vanishes, look behind you.',done:()=>!!S.bosses.warden,gold:500},
  {id:'f20',cat:'depths',t:'Reach floor 20',hint:'Below the Emberforge Halls lies the Starfall Hollow.',done:()=>S.deepest>=20,gold:250,prog:()=>[Math.min(20,S.deepest),20]},
  {id:'steel',cat:'depths',t:'Wear a full set of steel',hint:'Steel Blade, Steel Mail and Steel Helm, all equipped.',done:()=>S.gear.blade==='steel'&&S.gear.mail==='steel'&&S.gear.helm==='steel',gold:300},
  {id:'cb10',cat:'depths',t:'Reach combat level 10',hint:'Fighting counts double, and every skill adds to it.',done:()=>S.lvl>=10,prog:()=>[Math.min(10,S.lvl),10],gold:50},
  {id:'cb25',cat:'depths',t:'Reach combat level 25',hint:'Fight in the Depths and train every skill.',done:()=>S.lvl>=25,prog:()=>[Math.min(25,S.lvl),25],gold:200},
  {id:'kill100',cat:'depths',t:'Defeat 100 monsters',hint:'Every hit counts in a party.',...cn(()=>S.kills||0,100),gold:60},
  {id:'kill1k',cat:'depths',t:'Defeat 1,000 monsters',hint:'The Depths grow quiet when you visit.',...cn(()=>S.kills||0,1000),gold:300},
  {id:'chests',cat:'depths',t:'Open 25 chests',hint:'Chests hide in dead ends.',...cn(()=>C('chests'),25),gold:75},
  {id:'ore',cat:'depths',t:'Mine 200 ore veins',hint:'Hit the glinting rocks in the walls.',...cn(()=>C('ores'),200),gold:75},
  {id:'rare',cat:'depths',t:'Find a Rare lantern or cape',hint:'Chests and bosses drop them most.',done:()=>ownsRarity('rare'),gold:100},
  {id:'party',cat:'depths',t:'Delve with a party',hint:'Invite a friend from the Social button, then enter the Gate.',done:()=>!!S.flags.partied,gold:40},
  {id:'friend',cat:'hold',t:'Make a friend',hint:'Social button → Friends → add a name.',done:()=>!!S.flags.friend,gold:20},
  {id:'sell',cat:'hold',t:'Earn 5,000 gold trading with Tallow',hint:'Sell what you don’t need to Tallow, the merchant by the crossroads.',...cn(()=>C('sold'),5000),gold:75},
  {id:'expand',cat:'hold',t:'Buy more bank space',hint:'At the Bank.',done:()=>S.bankBuys>=1,gold:50},
  {id:'rich',cat:'hold',t:'Hold 25,000 gold at once',hint:'Saving up for something?',done:()=>S.gold>=25000,prog:()=>[Math.min(25000,S.gold),25000],gold:250},
  {id:'wild',cat:'wild',t:'Enter the Wilderness',hint:'North of the Hold, through a gap in the old wall. Other players can attack you there.',...cn(()=>C('wilddeep'),1),gold:15},
  {id:'wild10',cat:'wild',t:'Reach Wilderness level 10',hint:'The further north you go, the higher the level.',...cn(()=>C('wilddeep'),10),gold:60},
  {id:'wild20',cat:'wild',t:'Stand before the Old Obelisk',hint:'At the very top of the Wilderness: level 20.',...cn(()=>C('wilddeep'),20),gold:150},
  {id:'gloom',cat:'wild',t:'Catch a Gloomfin',hint:'In the Gloom Pond. Needs Fishing 15.',...cn(()=>C('gloomfin'),1),gold:40},
  {id:'bwood',cat:'wild',t:'Cut a Blackwood log',hint:'Blackwood grows in the Wilderness. Needs Woodcutting 15.',...cn(()=>C('bwlogs'),1),gold:40},
  {id:'pk1',cat:'wild',t:'Defeat a player',hint:'Only in the Wilderness, and only heroes in your level range.',...cn(()=>C('pks'),1),gold:100},
  {id:'pk10',cat:'wild',t:'Defeat 10 players',hint:'Attacking first gets you skulled. Choose your fights.',...cn(()=>C('pks'),10),gold:300},
  // secrets: hidden until found
  {id:'konami',cat:'secret',t:'Old Habits',hint:'Up, up, and away… then down again. Left and right, twice.',gold:300,secret:true},
  {id:'night',cat:'secret',t:'Night Owl',hint:'The lake is quietest after midnight.',gold:150,secret:true},
  {id:'miss5',cat:'secret',t:'The One That Got Away',hint:'Some days the fish win. Again and again.',gold:77,secret:true},
  {id:'burnt',cat:'secret',t:'Chef’s Kiss',hint:'Practice makes… charcoal.',gold:99,secret:true,done:()=>C('burnt')>=25},
  {id:'dizzy',cat:'secret',t:'Dizzy',hint:'Round and round the lantern goes.',gold:111,secret:true},
  {id:'choir',cat:'secret',t:'Timber Choir',hint:'Three axes, one tree.',gold:150,secret:true},
  {id:'word',cat:'secret',t:'Speak, Friend',hint:'Say the name of this place aloud.',gold:50,secret:true},
  {id:'fall10',cat:'secret',t:'Persistence',hint:'Fall ten times. Rise ten times.',gold:100,secret:true,done:()=>(S.deaths||0)>=10},
  {id:'giver',cat:'secret',t:'Generous Soul',hint:'Leave something on the ground for a stranger.',gold:120,secret:true},
  {id:'closecall',cat:'secret',t:'Close Call',hint:'Make it out of the Wilderness by the skin of your teeth.',gold:150,secret:true}];
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
  if(time<xpTipT)return;if(el.classList.contains('xp')){el.classList.remove('xp');el.textContent='';}
  if(!S.flags.goalsv)migrateGoals();
  if(MP.party&&scene==='delve'&&MP.shared())S.flags.partied=true;if(MP.friends&&MP.friends.friends&&MP.friends.friends.length)S.flags.friend=true;
  let k=0;for(const g of GOALS)if(!S.goals[g.id]&&g.done&&g.done()){completeGoal(g);if(++k>=2)break;}
  const nx=nextGoal(),d=goalsDone(),land=document.documentElement.classList.contains('land');
  const t=nx?(land?`Goals ${d}/${GOALS.length}`:`Goals ${d}/${GOALS.length} · ${nx.t}`):`Goals ${d}/${GOALS.length}`;el.hidden=false;if(el.textContent!==t)el.textContent=t;}
let goalTab='start';
// ---- the Bulletin: current build and every update, newest first (data in changelog.js) ----
const SEENV='lanternhold.seenBuild';
const bulletinNew=()=>{try{return localStorage.getItem(SEENV)!==BUILD.version;}catch(e){return false;}};
function openBulletin(){try{localStorage.setItem(SEENV,BUILD.version);}catch(e){}
  openSheet(`<h2>The Bulletin</h2>${tokenCard()}<div class="buildv"><b>v${BUILD.version}</b><span>${BUILD.season} · current build</span></div>
   <p class="lead small">Every update we ship is posted here, newest first.</p>
   <div class="changelog">${CHANGELOG.map((e,i)=>`<section class="${i===0?'latest':''}"><h3>v${e.v} · ${chatEsc(e.title)} <small>${e.date}</small></h3><ul>${e.notes.map(n=>`<li>${chatEsc(n)}</li>`).join('')}</ul></section>`).join('')}</div>
   <div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;if($('caCopy')){$('caCopy').onclick=copyCA;caFit($('caCopy'));}}
// one line, always: if the whole address doesn't fit (phones), show the first 4 and last 4 (tapping still copies all of it)
const caShort=ca=>ca.slice(0,6)+'…'+ca.slice(-4);
function caFit(el){const t=tokenInfo();if(!t)return;el.textContent=t.ca;el.title=t.ca;el.style.fontSize='';
  if(el.scrollWidth>el.clientWidth){el.style.fontSize='13px';if(el.scrollWidth>el.clientWidth){el.style.fontSize='';el.textContent=caShort(t.ca);}}}
// The official token: the contract address comes from the server (TOKEN_CA in Vercel), never from anything a player typed.
// set by the account code from /api/config (it runs in its own scope, so it's handed over on window)
const tokenInfo=()=>{const t=window.LH_TOKEN;return t&&/^0x[0-9a-fA-F]{40}$/.test(t.ca)?t:null;};
function tokenCard(){const t=tokenInfo();
  if(!t)return `<div class="ca pending"><b>Official contract address</b><small>It will be posted right here at launch. Until then, any address you see anywhere else is not ours.</small></div>`;
  return `<div class="ca"><b>Official ${t.symbol?'$'+chatEsc(t.symbol)+' ':''}contract address</b><button class="caaddr" id="caCopy" aria-label="Copy the contract address">${t.ca}</button>
   <small id="caMsg">Tap to copy the full address · Robinhood Chain · launched on Pons</small><small class="warn">This is the only official address. Always check it here before you buy.</small></div>`;}
async function copyCA(){const t=tokenInfo();if(!t)return;let ok=false;
  try{await navigator.clipboard.writeText(t.ca);ok=true;}catch(e){}
  if(!ok){try{const ta=document.createElement('textarea');ta.value=t.ca;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-9999px;top:0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,99);ok=document.execCommand('copy');ta.remove();}catch(e){}}
  const m=$('caMsg');if(m){m.textContent=ok?'Copied! Paste it into your wallet or Pons to check it.':'Couldn\'t copy automatically. Press and hold the address to copy it.';m.classList.toggle('ok',ok);}
  if(ok){sfx('pick');toast('Contract address copied','good');}}
// ---- the Founder's Lantern: a free NFT on Robinhood Chain for the first 1,000 heroes (token ID = hero number) ----
// The server knows each hero's number and whether their wallet holds one (lib/founders.js). Holders get the Founder's Flame.
async function refreshFounder(rerender){if(!window.ACC||!ACC.online())return;const r=await ACC.api.call(null,'founders');if(!r.ok||!r.data.on)return;
  const was=isFounder();FND=r.data;if(isFounder()!==was&&isFounder())toast('Founder’s Flame lit. Your light burns violet.','rare');
  if(rerender&&!$('sheet').hidden&&$('fndSheet'))openFounders(true);}
const nfmt=n=>Number(n).toLocaleString('en-US');
// Wick, keeper of the Founders' Ledger (by the road up to the Delve Gate): checks your whitelist spot, and opens the mint.
// He'll also be the one to see for the Founder's Lantern's phase 2.
const WICK_SAY=['The Founders’ Ledger is open.','The first thousand heroes… are you one?','A violet flame burns for the Founders.','Come, let me find your name.'];
const wickKey=()=>'lanternhold.wick.'+(S&&S.name||'');
function wickSeen(){try{return localStorage.getItem(wickKey())==='1';}catch(e){return true;}}
const wickHd=q=>`<div class="npchd wick"><img alt="" src="${ART.wick[0].toDataURL()}"><span><b>Wick</b><small>Keeper of the Founders’ Ledger</small><em>“${chatEsc(q)}”</em></span></div>`;
let wickChecked=false;
async function openWick(){try{localStorage.setItem(wickKey(),'1');}catch(e){}
  if(FND&&wickChecked)return openFounders();
  openSheet(`<div id="fndSheet"></div>${wickHd('Welcome, '+(S.name||'traveller')+'. Let me find your name in the ledger…')}<p class="lead small wickchk">Wick runs a finger down the pages of the Founders’ Ledger…</p><div class="row"><button class="btn" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;
  const t0=Date.now();await refreshFounder();await new Promise(r=>setTimeout(r,Math.max(0,1100-(Date.now()-t0))));
  if(!$('fndSheet'))return;
  if(!FND||!FND.on){openSheet(`<div id="fndSheet"></div>${wickHd(window.ACC&&ACC.online()?'The ledger isn’t ready for new names just yet. Come back soon.':'I can only read the ledger while you’re signed in and online.')}<div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;return;}
  wickChecked=true;sfx(FND.listed||isFounder()?'rare':'pick');openFounders(true);}
let fndV=null;
function openFounders(fresh){if(!FND)return refreshFounder(true);if(!fresh)refreshFounder(true);const F=FND,c=F.chain||{},listed=F.no<=F.wl,minL=F.minLvl||10,lvlOk=S.lvl>=minL;
  const checks=listed?`<ul class="fchk"><li class="ok">Hero #${nfmt(F.no)}: one of the first ${nfmt(F.wl)} heroes</li><li class="${lvlOk?'ok':''}">Combat level ${minL}${lvlOk?'':` <small>(you’re ${S.lvl})</small>`}</li></ul>`:'';
  let st='';
  if(isFounder())st=`<div class="soon fnd"><b>You hold a Founder’s Lantern</b><p>Your Founder’s Flame: a violet light at your shoulder and around your lantern, that every other player sees. Only holders have it.</p>
    <button class="btn big" id="flT">${SET.flame!==false?'Turn the flame off':'Light the flame'}</button></div>`;
  else if(!listed)st=`<p class="lead small">The whitelist is the first <b>${nfmt(F.wl)}</b> heroes ever made, and you’re Hero #${nfmt(F.no)}. If you pick up a Founder’s Lantern from another player, the flame is yours while you hold it.</p>`;
  else if(!lvlOk)st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: your spot is held</b>${checks}<div class="xpb"><i style="width:${Math.min(100,Math.round(S.lvl/minL*100))}%;background:#b98cff"></i></div><p>Reach combat level ${minL} to lock in your whitelist spot. Combat level comes from Fighting (monsters in the Depths) plus all your skills, so train everything. The mint is free, one per hero.</p></div>`;
  else if(!F.open)st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: you’re whitelisted</b>${checks}<p>The mint opens soon. Your spot is saved to your hero, so there’s nothing to do yet. We’ll post it in the Bulletin.</p></div>`;
  else if(!F.wallet)st=`<p class="lead small">Connect a wallet to your hero first (Hero screen). Your Founder’s Lantern is minted to it.</p><button class="btn big" id="fnHero">Open my hero</button>`;
  else if(c.taken)st=`<p class="lead small">Founder’s Lantern #${nfmt(F.no)} has been minted${c.owner?' to '+chatEsc(c.owner.slice(0,6)+'…'+c.owner.slice(-4)):''}. To light the flame, the hero’s linked wallet (${chatEsc(F.wallet.slice(0,6)+'…'+F.wallet.slice(-4))}) needs to hold a Founder’s Lantern.</p>`;
  else if(c.walletUsed)st=`<p class="lead small">The wallet linked to your hero has already minted a Founder’s Lantern. It’s one per wallet.</p>`;
  else if(c.ended)st=`<p class="lead small">The Founder’s Lantern mint has ended.</p>`;
  else if(c.paused)st=`<p class="lead small">Minting is paused for a moment. Try again soon.</p>`;
  else if(fndV)st=`<div class="soon fnd"><b>Mint Founder’s Lantern #${nfmt(fndV.no)}</b><ul><li>Free: you only pay a tiny gas fee in ETH</li><li>Minted to your wallet ${chatEsc(fndV.wallet.slice(0,6)+'…'+fndV.wallet.slice(-4))}</li><li>On Robinhood Chain</li></ul></div>
    <button class="btn big" id="fnGo">Open my wallet</button><button class="btn alt big" id="fnNo">Not now</button>`;
  else st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: you’re whitelisted</b>${checks}<p>Mint Founder’s Lantern #${nfmt(F.no)} for free. You only pay a tiny gas fee.</p></div><button class="btn big" id="fnM">Mint for free</button>`;
  const q=isFounder()?'That violet flame suits you, Founder. The ledger remembers.':!listed?`Hero #${nfmt(F.no)}… The ledger holds the first ${nfmt(F.wl)} names, and yours came after. But a Founder’s Lantern can still change hands.`:!lvlOk?`Hero #${nfmt(F.no)}… your name is in the ledger, but the ink is still wet. Reach combat level ${minL} and it’s yours to keep.`:`Hero #${nfmt(F.no)}… ah, here you are. Your name is written in the Founders’ Ledger.`;
  openSheet(`<div id="fndSheet"></div>${wickHd(q)}<h2>Founder’s Lantern</h2>
   <div class="fndart"><img src="/api/founders?img=${F.no}" alt="Founder’s Lantern #${F.no}" width="160" height="160"><span><b>#${nfmt(F.no)}</b><small>Your hero number: Hero #${nfmt(F.no)}</small>${c.supply!=null?`<small>${nfmt(c.supply)} / ${nfmt(F.wl)} minted</small>`:''}</span></div>
   <p class="lead small">A free NFT on Robinhood Chain for the first ${nfmt(F.wl)} heroes who reach combat level ${minL}. Minted only here in the game, one per hero. Its number is your hero number, so there’s only ever one of each. Whoever holds one gets the <b class="flamet">Founder’s Flame</b> in the game: a light colour no one else has.</p>
   ${st}${F.open&&F.contract?`<p class="lead small"><a class="linkb" href="https://robinhoodchain.blockscout.com/token/${chatEsc(F.contract)}" target="_blank" rel="noopener">View the collection</a></p>`:''}
   <div class="row"><button class="btn" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;
  if($('flT'))$('flT').onclick=()=>{SET.flame=SET.flame===false;saveSet();sfx('pick');toast(SET.flame?'Founder’s Flame lit':'Founder’s Flame off');openFounders(true);};
  if($('fnHero'))$('fnHero').onclick=()=>openHero();
  if($('fnNo'))$('fnNo').onclick=()=>{fndV=null;openFounders(true);};
  const m=$('fnM');if(m)m.onclick=async()=>{m.disabled=true;m.textContent='Preparing…';const r=await ACC.api.call(null,'founders',{method:'POST',body:{action:'voucher'}});
    if(!r.ok){toast(r.data.msg||'Couldn’t start the mint. Try again.','bad');refreshFounder(true);return;}fndV=r.data;openFounders(true);};
  const go=$('fnGo');if(go)go.onclick=async()=>{const v=fndV;go.disabled=true;go.textContent='Confirm in your wallet…';let hash;
    try{hash=await ACC.mintTx(v,FND.contract);}catch(e){fndV=null;toast(e&&e.code===4001?'You cancelled the mint in your wallet.':(e&&e.message)||'The mint didn’t go through.','bad');return openFounders(true);}
    fndV=null;openSheet(`<div id="fndSheet"></div><h2>Minting…</h2><p class="lead">Waiting for Robinhood Chain to confirm Founder’s Lantern #${nfmt(v.no)}…</p><p class="lead small"><a class="linkb" href="https://robinhoodchain.blockscout.com/tx/${chatEsc(hash)}" target="_blank" rel="noopener">View the transaction</a></p>`);
    const r=await ACC.api.call(null,'founders',{method:'POST',body:{action:'sync',tx:hash}});if(r.ok&&r.data.on)FND=r.data;
    if(isFounder()){sfx('rare');toast('Founder’s Lantern #'+nfmt(v.no)+' is yours. Founder’s Flame lit!','rare');if(window.NET&&NET.refresh)NET.refresh();}
    else toast('Sent! It can take a moment to show up. Check back here soon.','good');
    openFounders(true);};}
function openEastSign(){openSheet(`<h2>The Road East</h2><p class="lead">The path beyond the barricade is closed… for now.</p>
   <div class="soon"><b>Coming in Season 1: a new area</b><ul><li>A new fishing pond with new fish to catch</li><li>A new kind of tree for Woodcutting</li><li>A brand new skill</li><li>…and a lot more</li></ul></div>
   <p class="lead small">Keep stacking your logs and levelling your skills. You'll want them.</p><div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;}
function openGuide(tab){goalTab=tab||goalTab;const d=goalsDone();
  const list=GOALS.filter(g=>g.cat===goalTab).map(g=>{const ok=!!S.goals[g.id],hid=g.secret&&!ok,pr=!ok&&g.prog?g.prog():null;
    return `<li class="${ok?'done':''}${hid?' secret':''}"><b>${hid?'???':g.t}</b><small>${ok?'Done':g.hint} · +${g.gold} gold</small>${pr?`<i class="xpb"><i style="width:${Math.round(pr[0]/pr[1]*100)}%;background:#ffcd75"></i></i><small>${fmt(Math.floor(pr[0]))} / ${fmt(pr[1])}</small>`:''}</li>`;}).join('');
  const cnt=c=>{const a=GOALS.filter(g=>g.cat===c);return `${a.filter(g=>S.goals[g.id]).length}/${a.length}`;};
  openSheet(`<h2>Goals <small>${d}/${GOALS.length}</small></h2><p class="lead small">Finish them in any order for gold. Every goal also has a tiny chance to award a <b style="color:#ff77a8">Goal Relic</b>, something that exists nowhere else. Secrets have far better odds.</p>
    <div class="tabs gt">${GOAL_CATS.map(([k,l])=>`<button class="tab" aria-selected="${goalTab===k}" data-gt="${k}">${l} <small>${cnt(k)}</small></button>`).join('')}</div>
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
$('guide').addEventListener('click',()=>{if(!started)return;if($('guide').classList.contains('xp'))openSkills();else openGuide();});

// ---------- simulated town ----------
// ---------- update ----------
function update(dt){
  time+=dt;if(S&&(S.gold|0)!==goldHud.g){goldHud.g=S.gold|0;goldHud();}MP.tick(dt);
  if(paused&&!(scene==='delve'&&MP.shared())){P.moving=false;return;}
  // movement
  let mx=(keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0),my=(keys.ArrowDown||keys.KeyS?1:0)-(keys.ArrowUp||keys.KeyW?1:0);
  if(stick.on){mx=stick.x;my=stick.y;}
  if(paused||scene==='hold'&&P.hp<=0){mx=0;my=0;aPressed=false;retHeld=false;}
  const l=Math.hypot(mx,my);if(l>1){mx/=l;my/=l;}if(started)secretInput(mx,my,l);
  P.moving=l>.15&&P.chan<=0;
  if(P.moving){const sp=(scene==='hold'?72:62)*dt*(1+A('spd')/100);moveBody(P,mx*sp,0,4);moveBody(P,0,my*sp,4);P.anim+=dt;
    if(P.swing<=0)P.dir=Math.abs(mx)>Math.abs(my)?(mx>0?'right':'left'):(my>0?'down':'up');}
  if(P.inv>0)P.inv-=dt;if(P.swingCD>0)P.swingCD-=dt;
  if(P.swing>0){P.swing-=dt;if(!P.hitDone&&P.swing<.14){P.hitDone=true;resolveSwing();}}
  // context
  const ctx=nearestAct();setActLabel(ctx);
  if(aPressed){aPressed=false;if(ctx)doAct(ctx);else if(scene==='delve')swing();else if(inWild())pvpSwing();}
  if(inWild()){if(retHeld&&P.hp>0){if(wildLvl(P.y)>RETURN_MAX){P.chan=0;if(time-whyT>2){whyT=time;toast('Too deep for the Return Flame. Head south of Wilderness level '+RETURN_MAX+'.','bad');}}else{P.chan+=dt;if(P.chan>=2){retHeld=false;P.chan=0;wildReturn();}}}else P.chan=0;}
  else if(scene==='hold')P.chan=0;
  if(scene==='hold'){wildStep(dt);updateFishing(dt);updateChop(dt);updateCook(dt);updateDrops(dt);for(const o of HOLD.trees||[])if(o.shake>0)o.shake-=dt;}
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
  for(const k of slashes)k.t+=dt;if(slashes.length)slashes=slashes.filter(k=>k.t<.16);
  if(P.swing>0&&(S.gear.blade==='ember'||S.gear.blade==='cinder')&&!reduceMotion&&rand()<.7){const t=easeOut(1-P.swing/.2),base={down:Math.PI*.5,up:-Math.PI*.5,left:Math.PI,right:0}[P.dir]||0,a=base-1.2+t*2.4;
    fx.push({x:P.x+Math.cos(a)*14,y:P.y-6+Math.sin(a)*14,vx:(rand()-.5)*20,vy:-20-rand()*25,t:0,life:.3+rand()*.2,col:rand()<.5?'#ff9f3d':'#ffcd75'});}
  updateHud();
}
// a boss slam or starburst lands: everyone inside the ring is hit (through the normal contact damage, for 0.22 s)
function bossBlast(e,R,col){e.st='blast';e.cd=.22;e.tg=2;e.aoeR=R;blastFx(e,R,col);}
function blastFx(e,R,col){if(SET.shake&&Math.hypot(P.x-e.x,P.y-e.y)<220)shake=Math.max(shake,4);sfx('hurt',.6);
  if(!reduceMotion)for(let i=0;i<22;i++){const a=i/22*Math.PI*2;fx.push({x:e.x+Math.cos(a)*R*.85,y:e.y-4+Math.sin(a)*R*.5,vx:Math.cos(a)*30,vy:-30-rand()*30,t:0,life:.35+rand()*.2,col:i%3?col:'#fff3c4'});}}
function updateEnemies(dt){
  if(MP.client())return followEnemies(dt);
  for(const e of ents){if(e.dead)continue;e.t+=dt;if(e.flash>0)e.flash-=dt;if(e.sq>0)e.sq-=dt;
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
      // The Forge Tyrant: charges like the Knight, and every few seconds raises its hammer and slams the floor (a ring of
      // fire shows where it lands: step out of it). Calls imps out of the forge. Faster below half health.
      case 'tyrant':{const fast=e.hp<e.max/2;e.cd-=dt;e.sl=(e.sl??4)-dt;e.sm=(e.sm??6)-dt;
        if(e.st==='slamw'){e.tgK=1-e.cd/e.wind;if(e.cd<=0)bossBlast(e,46,'#ff9f3d');}
        else if(e.st==='blast'){if(e.cd<=0){e.st='idle';e.tg=0;e.aoeR=0;e.cd=.8;}}
        else if(e.st==='wind'){if(e.cd<=0){e.st='charge';e.cd=.6;e.vx=ux*sp*4;e.vy=uy*sp*4;}}
        else if(e.st==='charge'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=fast?1.6:2.4;}}
        else{vx=ux*sp;vy=uy*sp;if(e.sl<=0&&d<110){e.st='slamw';e.wind=e.cd=fast?.75:1;e.tg=1;e.tgR=46;e.tgK=0;e.sl=fast?3.6:5;}else if(e.cd<=0&&d<170){e.st='wind';e.cd=.6;e.flash=.6;}}
        if(e.sm<=0){e.sm=fast?7:10;if(ents.filter(o=>o.type==='imp'&&!o.dead).length<4)for(let i=0;i<2;i++)ents.push(makeEnemy('imp',e.x+(i?20:-20),e.y+6,e.dmgSc));puff(e.x,e.y-12,'#ff9f3d',12);}break;}
      // The Starwarden: blinks to the far side of you, then bursts with starlight (a cold ring shows the reach).
      // Calls wraiths to its side. Blinks more often below half health.
      case 'warden':{const fast=e.hp<e.max/2;e.cd-=dt;e.bl=(e.bl??4)-dt;e.sm=(e.sm??7)-dt;
        if(e.st==='blinkw'){if(e.cd<=0){const a=Math.atan2(e.y-TG.y,e.x-TG.x)+Math.PI,nx=TG.x+Math.cos(a)*30,ny=TG.y+Math.sin(a)*30;puff(e.x,e.y-12,'#73eff7',14);if(!blocked(nx,ny,8)){e.x=nx;e.y=ny;}puff(e.x,e.y-12,'#b8f7ff',14);sfx('stairs',.6);e.st='novaw';e.wind=e.cd=fast?.6:.8;e.tg=1;e.tgR=54;e.tgK=0;}}
        else if(e.st==='novaw'){e.tgK=1-e.cd/e.wind;if(e.cd<=0)bossBlast(e,54,'#73eff7');}
        else if(e.st==='blast'){if(e.cd<=0){e.st='idle';e.tg=0;e.aoeR=0;e.cd=.6;}}
        else{vx=ux*sp;vy=uy*sp+Math.sin(e.t*2)*10;if(e.bl<=0&&d<200){e.st='blinkw';e.cd=.45;e.flash=.45;e.bl=fast?3.4:5.2;}}
        if(e.sm<=0){e.sm=fast?8:11;if(ents.filter(o=>o.type==='wraith'&&!o.dead).length<3)for(let i=0;i<2;i++)ents.push(makeEnemy('wraith',e.x+(i?22:-22),e.y,e.dmgSc));puff(e.x,e.y-12,'#73eff7',12);}break;}
    }
    if(e.side>0){e.side-=dt;const px=-vy,py=vx;vx=vx*.3+px*e.sd;vy=vy*.3+py*e.sd;}
    const ox=e.x,oy=e.y;moveBody(e,vx*dt,vy*dt,e.r>6?8:4);
    if((vx||vy)&&Math.hypot(e.x-ox,e.y-oy)<Math.hypot(vx,vy)*dt*.2&&!(e.side>0)){e.side=.5;e.sd=rand()<.5?1:-1;}
    // contact
    let dmg=e.d.dmg*(1+.08*(e.dmgSc-1)/.12);if(e.st==='charge')dmg*=1.4;if(e.aoeR)dmg*=1.5;const cd=Math.hypot(P.x-e.x,(P.y-4)-(e.y-e.r));if(cd<(e.aoeR||e.r)+6)hurtPlayer(dmg,e);if(OTH.size)MP.contact(e,dmg);
  }
  ents=ents.filter(e=>!e.dead);
}

// ---------- HUD ----------
let lastAct=null;
function setActLabel(a){const lab=a?a.label:(scene==='delve'||inWild()?'Attack':'');if(lab!==lastAct){lastAct=lab;$('bAl').textContent=lab;$('bA').classList.toggle('ctx',!!a);$('bA').classList.toggle('idle',!lab);}}
const PT=['hpTxt','oilTxt','packN'];
let quickKey='';
function updateQuick(force){const key=S.quick.join(',')+'|'+S.quick.map(id=>id?S.bank[id]||0:'').join(',')+'|'+scene+'|'+(force?Math.random():'');if(key===quickKey)return;quickKey=key;
  $('quick').innerHTML=S.quick.map((id,i)=>{const n=id?S.bank[id]||0:0;return `<button class="qs ${id&&!n?'empty':''}" data-q="${i}" aria-label="Quick slot ${i+1}${id?': '+ITEMS[id].n+', '+n:' (empty)'}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:'<b>+</b>'}${id?`<span class="cnt"><canvas class="pt"></canvas></span>`:''}<i>${i+1}</i></button>`;}).join('');
  $('quick').querySelectorAll('.qs').forEach(b=>{const i=+b.dataset.q,id=S.quick[i];const c=b.querySelector('canvas');if(c)ptSet(c,S.bank[id]||0,{font:'small',px:9,color:'#ffcd75'});
    b.addEventListener('pointerdown',e=>{e.preventDefault();useQuick(i);});});}
// gold on the HUD, short: 9,850 · 12.4k · 1.25M
const fmtGold=n=>n<10000?n.toLocaleString('en-US'):n<1e6?(Math.floor(n/100)/10)+'k':(Math.floor(n/1e4)/100)+'M';
function goldHud(){const gv=fmtGold(S.gold|0),gb=$('goldV');if(gb&&gb._v!==gv){gb._v=gv;gb.lastChild.textContent=gv;gb.title=(S.gold|0).toLocaleString('en-US')+' gold';if(!gb.firstChild.getAttribute('src'))gb.firstChild.src=iconOf('gold').toDataURL();}}
function updateHud(force){
  if(force)PT.forEach(id=>{const e=$(id);if(e)e._pt=null;});
  const mh=hpMax();$('hpFill').style.width=Math.max(0,Math.min(1,P.hp/mh)*100)+'%';ptSet($('hpTxt'),Math.max(0,Math.ceil(P.hp))+'/'+mh,{font:'small',px:7});
  $('lvl').textContent='Lv '+S.lvl;goldHud();{const lk=JSON.stringify(myLook());if(lk!==updateHud.lk){updateHud.lk=lk;heroIcon();}}
  $('where').textContent=scene==='hold'?(inWild()?'Wilderness '+wildLvl(P.y):'The Hold')+(MP.room&&MP.room[0]==='w'?(NET.roomOpen()?' · World '+MP.room.slice(1):' · reconnecting…'):netOn()?' · connecting…':''):'F'+run.floor+' · '+BIOMES[map.biome].name+(MP.shared()?' · party':'');
  {const sb=$('socB');if(sb)sb.classList.toggle('off',!!MP.id&&netOn()&&!NET.roomOpen());}
  const dv=scene==='delve';$('oilRow').hidden=!dv;$('bRet').hidden=!(dv||inWild());$('retRing').style.setProperty('--p',Math.min(1,P.chan/2));$('feed').hidden=dv;updateQuick(force);
  if(dv){$('oilFill').style.width=run.oil+'%';$('oilFill').classList.toggle('low',run.oil<25);ptSet($('oilTxt'),Math.ceil(run.oil)+'%',{font:'small',px:7});
    
    const pn=Object.values(run.pack).reduce((a,b)=>a+b,0);$('packW').hidden=!pn;ptSet($('packN'),pn,{font:'small',px:9,color:'#c2d3e0'});
    $('retRing').style.setProperty('--p',Math.min(1,P.chan/2));}else $('packW').hidden=true;
}

// ---------- render ----------
function spr(img,x,y){g.drawImage(img,Math.round(x),Math.round(y));}
// ---- name tags: real HTML text placed over the game, so it stays sharp on every phone and screen ----
// The NAME is centred over the hero; the combat level hangs to its right and an admin's crown to its left.
const TAGS=[];const tagBox=$('tags'),tagPool=[];
function tagEl(i){let e=tagPool[i];if(!e){e=document.createElement('div');e.className='tag';e.innerHTML='<img class="cr" alt=""><b></b><i></i><img class="sk" alt="Skulled">';e.firstChild.src=ART.crownS.toDataURL();e.children[3].src=ART.skull.toDataURL();tagBox.appendChild(e);tagPool[i]=e;e._k='';}return e;}
function drawTags(){const dpr=window.devicePixelRatio||1,k=SCALE/dpr,W=VW*k,H=VH*k;let n=0;
  for(const t of TAGS){const x=Math.round((t.x-camX)*k),y=Math.round((t.y-camY)*k);if(x<-150||x>W+150||y<-30||y>H+30)continue;
    const e=tagEl(n++);if(e.hidden)e.hidden=false;   // unhide first: a hidden tag measures 0 wide and the level badge would cover the name
    const key=t.say!=null?'S|'+t.say:t.name+'|'+(t.lv||'')+'|'+(t.adm?1:0)+'|'+(t.me?1:0)+'|'+(t.npc?1:0)+'|'+(t.hov?1:0)+'|'+(t.sk?1:0);
    if(e._k!==key&&t.say!=null){e._k=key;e.className='tag say';e.children[1].textContent=t.say;e.children[2].style.display='none';e.children[0].style.display='none';e.children[3].style.display='none';}
    else if(e._k!==key){e._k=key;e.className='tag';e.children[1].textContent=t.name;const L=e.children[2];L.textContent=t.lv?String(t.lv):'';L.style.display=t.lv?'':'none';
      L.style.color=t.me?'#cfd8e3':t.lv?lvlColor(t.lv):'';e.children[3].style.display=t.sk?'':'none';e.classList.toggle('adm',!!t.adm);e.classList.toggle('me',!!t.me);e.classList.toggle('npc',!!t.npc);e.classList.toggle('hov',!!t.hov);e.children[0].style.display=t.adm?'':'none';
      const hw=e.children[1].offsetWidth/2;L.style.left=Math.round(hw+3)+'px';e.children[0].style.left=Math.round(-hw-3-12)+'px';}
    const tr=`translate(${x}px,${y}px)`;if(e._t!==tr){e._t=tr;e.style.transform=tr;}if(e.hidden)e.hidden=false;}
  for(let i=n;i<tagPool.length;i++)if(!tagPool[i].hidden)tagPool[i].hidden=true;}
function render(){TAGS.length=0;
  g.setTransform(1,0,0,1,0,0);g.fillStyle=scene==='hold'?'#1a1c2c':'#0b0c14';g.fillRect(0,0,VW,VH);
  const mw=map.w*T,mh=map.h*T;let cx=Math.round(P.x-VW/2),cy=Math.round(P.y-8-VH/2);
  cx=mw<VW?Math.round((mw-VW)/2):Math.max(0,Math.min(mw-VW,cx));cy=mh<VH?Math.round((mh-VH)/2):Math.max(0,Math.min(mh-VH,cy));
  if(shake>0){cx+=Math.round((rand()-.5)*shake*2);cy+=Math.round((rand()-.5)*shake*2);}
  camX=cx;camY=cy;g.save();g.translate(-cx,-cy);
  g.drawImage(map.ground,0,0);
  const x0=Math.floor(cx/T),y0=Math.floor(cy/T),x1=Math.ceil((cx+VW)/T),y1=Math.ceil((cy+VH)/T),wf=Math.floor(time*2)%2;
  if(scene==='hold'){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const tt=tAt(map,x,y);if(tt===WATER||tt===DOCK)g.drawImage(ART.water[(wf+x)%2],x*T,y*T);else if(tt===GLOOM){g.drawImage(ART.gloom[(wf+x)%2],x*T,y*T);g.fillStyle='#8a7aa8';if(!isWater(tAt(map,x,y-1)))g.fillRect(x*T,y*T,T,1);if(!isWater(tAt(map,x-1,y)))g.fillRect(x*T,y*T,1,T);if(!isWater(tAt(map,x+1,y)))g.fillRect(x*T+T-1,y*T,1,T);g.fillStyle='#1d1a2a';if(!isWater(tAt(map,x,y+1)))g.fillRect(x*T,y*T+T-2,T,2);}
      if(tt===DOCK)g.drawImage(tAt(map,x,y+1)===WATER&&tAt(map,x-1,y)!==DOCK&&tAt(map,x+1,y)!==DOCK?ART.dock.walk:tAt(map,x-1,y)===DOCK||tAt(map,x+1,y)===DOCK?ART.dock.deck:ART.dock.walk,x*T,y*T);}
    for(const [lx,ly,lf] of map.lilies||[])g.drawImage(ART.lily[lf],lx*T+4+Math.round(Math.sin(time*.8+lx)*.6),ly*T+5);
    {const open=plotsOpen();for(const p of map.plots)if(p.i>=open&&!S.plots[p.i])g.drawImage(ART.soilLocked,p.tx*T,p.ty*T);}
    for(const p of map.plots){const st=S.plots[p.i];if(!st)continue;const gr=growth(st),stg=gr>=1?2:gr>=.5?1:0;spr(ART.crop[st.crop][stg],p.cx-8,p.cy-10);
      if(gr>=1&&Math.floor(time*3)%2)g.fillStyle='#f4f4f4',g.fillRect(p.cx+5,p.cy-12,1,1);
      else if(gr<1){g.fillStyle='#1a1c2c';g.fillRect(p.cx-8,p.cy+6,16,2);g.fillStyle='#a7f070';g.fillRect(p.cx-8,p.cy+6,Math.round(16*gr),2);}}}
  const vis=o=>o.x>cx-60&&o.x<cx+VW+60&&o.y>cy-20&&o.y<cy+VH+70;
  for(const o of map.objs){if(!o.flat||!vis(o))continue;if(o.type==='flowers')spr(ART.flowers[o.v],o.x-8,o.y-15);else if(o.type==='bones')spr(ART.bones,o.x-8,o.y-15);else if(o.type==='wbones')spr(ART.wbones[o.v],o.x-8,o.y-15);else if(o.type==='weed')spr(ART.weed[o.v],o.x-8,o.y-15);else if(o.type==='cinders')spr(ART.cinders[(o.v+Math.floor(time*2+o.x))%2],o.x-8,o.y-15);}
  if(scene==='hold'&&cy<WILD_Y)wildShade(cx,cy);
  for(const o of map.objs){if(!o.onWall||o.gone||!vis(o))continue;const [tx,ty]=o.tile;
    if(o.type==='ore'){if(o.kind==='ember'){spr(ART.emberOre[Math.floor(time*2.5+tx)%2],tx*T,ty*T);for(let k=0;k<2;k++){const ph=(time*.7+k*.5+tx*.37)%1;g.fillStyle=ph<.5?'#ffcd75':'#ff9f3d';g.globalAlpha=1-ph;g.fillRect(Math.round(tx*T+5+k*6+Math.sin(time*3+k+tx)*1.5),Math.round(ty*T+6-ph*10),1,1);}g.globalAlpha=1;}else if(o.kind==='starshard'){spr(ART.starOre[Math.floor(time*2+tx)%2],tx*T,ty*T);const ph=(time*.9+tx*.31)%1;g.globalAlpha=1-ph;g.fillStyle=ph<.5?'#fff3c4':'#73eff7';g.fillRect(Math.round(tx*T+8+Math.sin(time*2+tx)*4),Math.round(ty*T+5-ph*8),1,1);g.globalAlpha=1;}else spr(ART.ore[o.kind]||ART.ore.copper,tx*T,ty*T);}else if(o.type==='torch')spr(ART.torch[Math.floor(time*6+tx)%2],tx*T+4,ty*T+2);}
  // y-sorted
  const list=[];
  for(const o of map.objs)if(!o.flat&&!o.onWall&&!o.gone&&vis(o))list.push({y:o.sortY??o.y,f:()=>drawObj(o)});   // sortY: drawn as if further back (the Delve Gate, so players walking into it stay on top)
  for(const e of ents)list.push({y:e.y,f:()=>drawEnemy(e)});
  for(const o of OTH.values())if(!o.pend)list.push({y:o.y,f:()=>{const ax=o.chopT>0&&scene==='hold',ph=time/.85+o.id.length*.3;if(ax&&axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look);const wb=scene==='hold'&&o.y<WILD_Y,sw=o.swT>0&&(scene==='delve'||wb),swB=sw&&(o.dir==='up'||o.dir==='left'),bl=(o.look&&o.look.blade)||'rusty';const [lx,ly]=sw&&!reduceMotion?lungeOff(o.dir,o.swT):[0,0],dun=scene==='delve',hd=(dun||wb)&&!sw&&!ax&&!o.fish,ox=o.x+lx,oy=o.y+ly,ol=dun&&((o.look&&o.look.flame==='founder'?ART.lanternF:ART.lantern)[(o.look&&o.look.lan)||'basic']||ART.lantern.basic),llx=o.dir==='left'?-9:o.dir==='right'?4:o.dir==='up'?3:-9;if(ol&&o.dir==='up')spr(ol,ox+llx,oy-9);if(hd&&o.dir!=='down')drawHeldBlade(ox,oy,o.dir,bl,o.moving,o.anim);if(swB)drawSwingAt(ox,oy,o.dir,o.swT,bl);drawHero(ox,oy,o.dir,o.moving,o.anim,o.look,o.name,o);if(ol&&o.dir!=='up')spr(ol,ox+llx,oy-9+Math.round(Math.sin(time*5+o.x)));if(hd&&o.dir==='down')drawHeldBlade(ox,oy,o.dir,bl,o.moving,o.anim);if(sw&&!swB)drawSwingAt(ox,oy,o.dir,o.swT,bl);if(ax&&axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look,true);if(o.fish&&scene==='hold')drawFishing(o.fish,o.x,o.y);if(ax&&!axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look);}});
  for(const d of drops)if(dropShown(d))list.push({y:d.y,f:()=>{const b=Math.sin(d.t*6)*1;const R=rc(d.id);if(R){g.globalAlpha=.28+.12*Math.sin(time*4);g.fillStyle=R.c;g.fillRect(Math.round(d.x-1),Math.round(d.y-44),3,40);g.globalAlpha=.5;g.fillRect(Math.round(d.x-4),Math.round(d.y-1),9,2);g.globalAlpha=1;}g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(d.x-3),Math.round(d.y),6,1);spr(iconOf(d.id),d.x-8,d.y-14-d.z+b);}});
  list.push({y:P.y,f:drawPlayer});
  list.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  if(scene==='hold'&&!reduceMotion)drawAmbient(cx,cy,x0,y0,x1,y1);
  if(scene==='hold'&&cy<WILD_Y&&!reduceMotion)wildAsh(cx,cy);
  for(const f of fx){g.fillStyle=f.col;g.fillRect(Math.round(f.x),Math.round(f.y),1,1);}
  if(slashes.length)drawSlashes();
  g.restore();
  if(scene==='delve')drawLight(cx,cy);
  g.save();g.translate(-cx,-cy);
  for(const t of texts){ptDraw(g,t.txt,t.x,Math.round(t.y-t.t*14)-6,{color:t.col});}
  // boss bar
  g.restore();
  const boss=ents.find(e=>e.d.boss);if(boss){const dpr=window.devicePixelRatio||1,w=Math.min(140,VW-24),x=(VW-w)/2,gd=$('guide'),top=Math.max($('vit').getBoundingClientRect().bottom,gd&&!gd.hidden?gd.getBoundingClientRect().bottom:0),y=Math.round((top+30)*dpr/SCALE);g.fillStyle='#1a1c2c';g.fillRect(x-1,y-1,w+2,6);g.fillStyle='#5d275d';g.fillRect(x,y,w,4);g.fillStyle='#b13e53';g.fillRect(x,y,Math.max(0,Math.round(w*boss.hp/boss.max)),4);
    ptDraw(g,map.pack.bossName,VW/2,y-9,{color:'#f4f4f4'});}
  if(P.chan>0){g.fillStyle='rgba(255,205,117,'+(.15+.25*P.chan/2)+')';g.fillRect(0,0,VW,VH);}
  if(scene==='delve'&&!reduceMotion)drawDelveAmbient(camX,camY);
  hoverTag();drawTags();
}
// ---- life in the Depths: dust drifting through your lantern light, sparks rising from torches ----
function drawDelveAmbient(cx,cy){const t=time;g.save();g.translate(-cx,-cy);
  const R=(10+40*run.oil/100)*LAN().light;
  for(let i=0;i<18;i++){const ph=(t*.05+i*.137)%1,a=i*2.39+t*.15,rr=R*(.2+.75*((i*.618)%1)),x=P.x+Math.cos(a)*rr+Math.sin(t*.7+i)*3,y=P.y-8+Math.sin(a)*rr*.7-ph*10;
    g.globalAlpha=.35*Math.sin(ph*Math.PI);g.fillStyle=i%3?'#ffe6b0':'#f4f4f4';g.fillRect(Math.round(x),Math.round(y),1,1);}
  for(const o of map.objs){if(o.type!=='torch'||Math.abs(o.x-P.x)>VW*.7||Math.abs(o.y-P.y)>VH*.7)continue;const [tx,ty]=o.tile;
    for(let k=0;k<3;k++){const ph=(t*.9+k/3+tx*.31)%1,x=tx*T+8+Math.sin(ph*9+k*2+tx)*2,y=ty*T+4-ph*14;g.globalAlpha=(1-ph)*.9;g.fillStyle=ph<.4?'#ffcd75':'#ff9f3d';g.fillRect(Math.round(x),Math.round(y),1,1);}}
  g.globalAlpha=1;g.restore();}
// the Wilderness: the ground darkens past the wall (deeper = darker), and ash drifts down
function wildShade(cx,cy){const top=Math.max(0,cy),bot=Math.min(WILD_Y,cy+VH);if(bot<=top)return;
  const gr=g.createLinearGradient(0,WILD_Y-14*T,0,WILD_Y);gr.addColorStop(0,'rgba(30,12,36,.2)');gr.addColorStop(1,'rgba(30,12,36,.04)');
  g.fillStyle='rgba(30,12,36,.2)';const a=Math.min(bot,WILD_Y-14*T);if(a>top)g.fillRect(cx,top,VW,a-top);
  g.fillStyle=gr;const b0=Math.max(top,WILD_Y-14*T);if(bot>b0)g.fillRect(cx,b0,VW,bot-b0);}
function wildAsh(cx,cy){const t=time;for(let i=0;i<34;i++){const ph=(t*.07+i*.161)%1,x=cx+((i*97.3+Math.sin(t*.4+i)*14)%VW+VW)%VW,y=cy+ph*VH;if(y>WILD_Y)continue;
    g.globalAlpha=.55*Math.sin(ph*Math.PI);g.fillStyle=i%4?'#8d8597':'#e8a87c';g.fillRect(Math.round(x),Math.round(y),1,1);}g.globalAlpha=1;}
function drawObj(o){
  if(o.type==='tree'){if(o.chop&&!treeUp(o))spr(ART.stump,o.x-16,o.y-30);else{const k=o.shake>0?Math.round(Math.sin(time*60)):0;const sw=reduceMotion?0:Math.sin(time*1.1+o.x*.07+o.y*.03),bw=o.kind==='blackwood';spr(sw>.55?(bw?ART.bwSway:ART.treeSway)[1]:sw<-.75?(bw?ART.bwSway:ART.treeSway)[0]:bw?ART.bwTree:ART.tree,o.x-16+k,o.y-30);
    if(o.chop&&(CHOP&&CHOP.o===o||o.shake>0)&&o.logs<TREES[o.kind].logs){const w=Math.round(20*o.logs/TREES[o.kind].logs);g.fillStyle='rgba(26,28,44,.8)';g.fillRect(o.x-11,o.y-34,22,4);g.fillStyle='#d9a066';g.fillRect(o.x-10,o.y-33,w,2);}}}
  else if(o.type==='house')spr(ART.house,o.x-24,o.y-48);
  else if(o.type==='bank')spr(ART.bank,o.x-24,o.y-48);
  else if(o.type==='forge')spr(ART.forge[Math.floor(time*4)%2],o.x-24,o.y-40);
  else if(o.type==='kitchen')spr(ART.kitchen[Math.floor(time*3)%2],o.x-16,o.y-32);
  else if(o.type==='press')spr(ART.press,o.x-16,o.y-32);
  else if(o.type==='board'){spr(ART.board,o.x-16,o.y-32);if(bulletinNew()){const b=Math.round(Math.sin(time*4)*1.5);g.fillStyle='#1a1c2c';g.fillRect(Math.round(o.x-3),Math.round(o.y-46+b),7,9);g.fillStyle='#ffcd75';g.fillRect(Math.round(o.x-2),Math.round(o.y-45+b),5,7);g.fillStyle='#b13e53';g.fillRect(Math.round(o.x),Math.round(o.y-44+b),1,3);g.fillRect(Math.round(o.x),Math.round(o.y-40+b),1,1);}}
  else if(o.type==='stall')spr(ART.stall,o.x-20,o.y-30);
  else if(o.type==='npc'){const W=o.npc==='wick',fr=Math.floor(time*1.6+Math.sin(time*.7)+(W?.5:0))%2;spr((W?ART.wick:ART.merchant)[fr],o.x-13,o.y-29);TAGS.push({x:o.x,y:o.y-37,name:o.name,npc:true});
    if(W){if(!reduceMotion){g.save();g.globalCompositeOperation='lighter';const X=Math.round(o.x-9),Y=Math.round(o.y-20),gr=g.createRadialGradient(X,Y,0,X,Y,10);gr.addColorStop(0,`rgba(${FLAMEC},${.35+.08*Math.sin(time*7)})`);gr.addColorStop(1,`rgba(${FLAMEC},0)`);g.fillStyle=gr;g.fillRect(X-10,Y-10,20,20);g.restore();}
      if(!wickSeen()){const b=Math.round(Math.sin(time*4)*1.5);g.fillStyle='#1a1c2c';g.fillRect(Math.round(o.x-3),Math.round(o.y-52+b),7,9);g.fillStyle='#b98cff';g.fillRect(Math.round(o.x-2),Math.round(o.y-51+b),5,7);g.fillStyle='#1a1c2c';g.fillRect(Math.round(o.x),Math.round(o.y-50+b),1,3);g.fillRect(Math.round(o.x),Math.round(o.y-46+b),1,1);}}
    if(time>(o.nextSay||0)){o.nextSay=time+14+Math.random()*10;o.sayT=4;o.say=W?WICK_SAY[ri(0,WICK_SAY.length-1)]:['Oil! Bread! Seeds!','Fine lanterns, finer prices.','Psst. Heard there\'s gold in the crypts.','Trade with Tallow!'][ri(0,3)];}
    if(o.sayT>0){o.sayT-=1/60;TAGS.push({x:o.x,y:o.y-45,say:o.say});}}
  else if(o.type==='sign')spr(o.wild?ART.wsign:ART.sign,o.x-9,o.y-22);
  else if(o.type==='wwall')spr(ART.wwall[(o.end||'')+o.v],o.x-8,o.y-20);
  else if(o.type==='deadtree')spr(ART.deadtree[o.v],o.x-16,o.y-30);
  else if(o.type==='rock')spr(ART.rock[o.v],o.x-8,o.y-14);
  else if(o.type==='crystal'){spr(ART.crystal[o.v],o.x-8,o.y-18);if(!reduceMotion){const ph=(time*.6+o.x*.01)%1;g.globalAlpha=(1-ph)*.9;g.fillStyle='#b8f7ff';g.fillRect(Math.round(o.x-3+o.v*5),Math.round(o.y-14-ph*8),1,1);g.globalAlpha=1;}}
  else if(o.type==='grave')spr(ART.grave[o.v],o.x-8,o.y-18);
  else if(o.type==='pillar')spr(ART.pillar[o.v],o.x-8,o.y-30);
  else if(o.type==='skullpost')spr(ART.skullpost,o.x-8,o.y-26);
  else if(o.type==='obelisk'){spr(ART.obelisk[Math.floor(time*1.4)%2],o.x-16,o.y-50);if(!reduceMotion){g.save();g.globalCompositeOperation='lighter';const X=Math.round(o.x),Y=Math.round(o.y-30),R=26+2*Math.sin(time*2),gr=g.createRadialGradient(X,Y,0,X,Y,R);gr.addColorStop(0,`rgba(${FLAMEC},.28)`);gr.addColorStop(1,`rgba(${FLAMEC},0)`);g.fillStyle=gr;g.fillRect(X-R,Y-R,R*2,R*2);g.restore();
    for(let k=0;k<4;k++){const ph=(time*.5+k/4)%1;g.globalAlpha=1-ph;g.fillStyle=k%2?FLAME:'#f1e4ff';g.fillRect(Math.round(o.x+Math.sin(ph*6+k*2)*6),Math.round(o.y-44-ph*18),1,1);}g.globalAlpha=1;}}
  else if(o.type==='barricade')spr(ART.barricade,o.x-10,o.y-60);
  else if(o.type==='gate'){const fl=Math.floor(time*5+Math.sin(time*13))%2;spr(ART.gate[fl],o.x-32,o.y-52);spr(ART.lanternPost[fl],o.x-48,o.y-28);const pr=ART.lanternPost[1-fl];g.save();g.translate(Math.round(o.x+48),0);g.scale(-1,1);g.drawImage(pr,0,Math.round(o.y-28));g.restore();}
  else if(o.type==='well')spr(ART.well,o.x-16,o.y-32);
  else if(o.type==='fence')spr(ART.fence,o.x-8,o.y-14);
  else if(o.type==='chest')spr(ART.chest[o.open?1:0],o.x-8,o.y-14);
  else if(o.type==='glowcap')spr(ART.glowcap,o.x-8,o.y-15);
}
// ---- life at the Hold: chimney smoke, kitchen steam, butterflies over the flowers, falling leaves, glints on the lake ----
function drawAmbient(cx,cy,x0,y0,x1,y1){const t=time;
  const inView=(x,y,m=40)=>x>cx-m&&x<cx+VW+m&&y>cy-m&&y<cy+VH+m;
  for(const o of map.objs){
    if(o.type==='gate'&&inView(o.x,o.y-30,80)){g.save();g.globalCompositeOperation='lighter';const f=.85+.15*Math.sin(time*9+Math.sin(time*3)),pool=(X,Y,R,a)=>{const gr=g.createRadialGradient(X,Y,0,X,Y,R);gr.addColorStop(0,`rgba(255,190,100,${a})`);gr.addColorStop(1,'rgba(255,170,80,0)');g.fillStyle=gr;g.fillRect(X-R,Y-R,R*2,R*2);};
      pool(o.x-44,o.y-14,22*f,.28*f);pool(o.x+44,o.y-14,22*f,.28*f);pool(o.x,o.y-28,16*f,.32*f);pool(o.x,o.y+2,24,.12*f);g.restore();
      for(let k=0;k<5;k++){const ph=(t*.4+k/5)%1,x=o.x+Math.sin(ph*7+k*1.7)*14,y=o.y-6-ph*30;g.globalAlpha=(1-ph)*.7;g.fillStyle='#ffcd75';g.fillRect(Math.round(x),Math.round(y),1,1);}g.globalAlpha=1;}
    if(o.type==='forge'&&inView(o.x,o.y-40))for(let i=0;i<8;i++){const ph=(t*.32+i/8)%1,x=o.x+14+Math.sin(ph*4+i)*1.5+ph*7,y=o.y-41-ph*30,r=1+ph*2.6;
      g.globalAlpha=(1-ph)*.5;g.fillStyle=ph<.25?'#566c86':'#94b0c2';g.fillRect(Math.round(x-r/2),Math.round(y-r/2),Math.round(r),Math.round(r));}
    else if(o.type==='kitchen'&&inView(o.x,o.y-20))for(let i=0;i<4;i++){const ph=(t*.45+i/4)%1,x=o.x+Math.sin(ph*6+i*2)*2.5,y=o.y-15-ph*14;
      g.globalAlpha=(1-ph)*.45;g.fillStyle='#f4f4f4';g.fillRect(Math.round(x),Math.round(y),1+(ph>.5?1:0),1);}
    else if(o.type==='tree'&&!(o.chop&&o.until)&&inView(o.x,o.y-20)&&o.spr){const ph=(t*.11+o.x*.0137+o.y*.0071)%1;if(ph<.4){const k=ph/.4,x=o.x-6+(o.x*7%12)+Math.sin(k*14)*3+k*8,y=o.y-20+k*26;
      g.globalAlpha=k>.85?(1-k)/.15:1;g.fillStyle=o.kind==='blackwood'?((o.x/16|0)%2?'#5a4578':'#3d2f52'):(o.x/16|0)%2?'#a7f070':'#38b764';g.fillRect(Math.round(x),Math.round(y),Math.sin(k*14)>0?2:1,1);}}}
  g.globalAlpha=1;
  // butterflies drifting around the flowers
  if(!map.flies)map.flies=map.objs.filter(o=>o.type==='flowers').filter((_,i)=>i%5===0).slice(0,7).map((o,i)=>({x:o.x,y:o.y,c:['#f4f4f4','#ffcd75','#73eff7','#e86fd0','#a7f070'][i%5],s:.6+i*.13}));
  for(const [i,f] of map.flies.entries()){const x=f.x+Math.sin(t*.5*f.s+i)*22+Math.sin(t*1.7+i*2)*4,y=f.y-10+Math.cos(t*.7*f.s+i*1.3)*9+Math.sin(t*3+i)*2;if(!inView(x,y))continue;
    const open=Math.floor(t*12+i*3)%3!==0,X=Math.round(x),Y=Math.round(y);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(X,Y+10,2,1);
    g.fillStyle=f.c;if(open){g.fillRect(X-2,Y-1,2,2);g.fillRect(X+1,Y-1,2,2);}else{g.fillRect(X-1,Y-2,1,2);g.fillRect(X+1,Y-2,1,2);}g.fillStyle='#1a1c2c';g.fillRect(X,Y-1,1,2);}
  // light glinting on the water
  const tick=Math.floor(t*2.2);for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(tAt(map,x,y)===WATER&&((x*73+y*151+tick*7)%23)===0){const px=x*T+((x*5+tick)%12)+2,py=y*T+((y*7+tick*3)%12)+2;
    g.fillStyle='#f4f4f4';g.globalAlpha=.85;g.fillRect(px,py,2,1);g.globalAlpha=.5;g.fillRect(px+2,py,1,1);g.fillRect(px-1,py,1,1);g.globalAlpha=1;}}
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
// another player's combat level against yours: same or lower is green, a little higher yellow, much higher red
const lvlColor=l=>{const d=l-S.lvl;return d<=0?'#a7f070':d<=5?'#ffcd75':'#ff6b6b';};
function drawHero(x,y,dir,moving,anim,look,name,npc,me){
  const fr=moving?1+Math.floor(anim*8)%2:0,img=heroImg(look,dir,fr);
  const au=look?auraColors(look,me?S.gear.lantern:look.lan||null):[];if(au.length)drawAura(x,y,au,(npc?npc.name.length:0));
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(Math.round(x-4),Math.round(y),8,1);
  const yb=moving&&!reduceMotion?-(Math.floor(anim*16)%2):0;   // a 1-px bob on each step
  const cb=look&&look.cape?capeLayer(look.cape,dir,moving?fr:0,false):null;if(cb)spr(cb,x-10,y-17+yb);
  spr(img,x-8,y-15+yb);
  const cf=look&&look.cape?capeLayer(look.cape,dir,moving?fr:0,true):null;if(cf)spr(cf,x-10,y-17+yb);if(look&&ADMIN_HATS[look.helm])spr(ART[look.helm],x-5,y-25+yb);
  if(look&&look.flame==='founder')drawFlame(x,y,dir,(npc?npc.name.length:0));
  // In the Wilderness: a health bar over anyone who's hurt, and every name, level and skull always shows
  const wild=scene==='hold'&&y<WILD_Y,hat=look&&ADMIN_HATS[look.helm]?10:0;
  if(wild){const hp=me?P.hp:npc&&npc.hp,mx=me?hpMax():npc&&npc.max;if(hp!=null&&mx&&hp<mx){const X=Math.round(x)-7,Y=Math.round(y)-21-hat;g.fillStyle='#1a1c2c';g.fillRect(X-1,Y-1,16,4);g.fillStyle='#b13e53';g.fillRect(X,Y,14,2);g.fillStyle='#a7f070';g.fillRect(X,Y,Math.max(0,Math.round(14*hp/mx)),2);}}
  // Name tags are collected here and drawn on a sharp overlay after the world (see drawTags). Off by default
  // (Settings → Player names), except admins, whose names everyone always sees, and everyone in the Wilderness.
  {const adm=me?ADMIN:!!(npc&&npc.adm),sk=wild&&(me?skulled():!!(npc&&npc.sk>Date.now()));if(name&&(adm||SET.pnames||wild))TAGS.push({x,y:y-(wild?28:20)-hat,name,lv:me?S.lvl:look&&look.lvl,adm,me,sk});}
  if(npc&&npc.sayT>0)TAGS.push({x,y:y-(look&&ADMIN_HATS[look.helm]?28:18)-(npc.adm||SET.pnames||wild?5:0)-(wild?9:0),say:npc.say});
}
// A small violet flame that floats at the Founder's shoulder, with sparks drifting up from it
function drawFlame(x,y,dir,seed){const t=time+seed*.7,bx=Math.round(x+(dir==='left'?7:-8)),by=Math.round(y-17+Math.sin(t*2.4)*1.5);
  g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(bx+1,by+2,0,bx+1,by+2,9);gr.addColorStop(0,`rgba(${FLAMEC},.55)`);gr.addColorStop(1,`rgba(${FLAMEC},0)`);g.fillStyle=gr;g.fillRect(bx-8,by-7,18,18);
  if(!reduceMotion)for(let i=0;i<3;i++){const ph=(t*.7+i/3)%1,sx=bx+1+Math.round(Math.sin(t*3+i*2.1)*2),sy=Math.round(by-1-ph*9);g.globalAlpha=1-ph;g.fillStyle=i%2?FLAME:'#f1e4ff';g.fillRect(sx,sy,1,1);}
  g.restore();const fl=Math.floor(t*8)%2;g.fillStyle='#5d275d';g.fillRect(bx-1,by+1,4,4);g.fillStyle=FLAME;g.fillRect(bx,by-1+fl,2,5-fl);g.fillRect(bx-1,by+2,4,2);g.fillStyle='#f1e4ff';g.fillRect(bx,by+2,2,2);}
function drawPlayer(){
  if(P.inv>0&&Math.floor(P.inv*20)%2)return;
  const [lx0,ly0]=P.swing>0&&!reduceMotion?lungeOff(P.dir,P.swing):[0,0];if(lx0||ly0){const ox=P.x,oy=P.y;P.x+=lx0;P.y+=ly0;try{drawPlayerAt();}finally{P.x=ox;P.y=oy;}return;}
  drawPlayerAt();}
function drawPlayerAt(){
  const look=myLook(),d=P.dir,lan=(look.flame?ART.lanternF:ART.lantern)[S.gear.lantern]||ART.lantern.basic;
  const lx=d==='left'?-9:d==='right'?4:d==='up'?3:-9,ly=-9;
  const dun=scene!=='hold',held=(dun||inWild()&&!CHOP&&!FISHING)&&!(P.swing>0);   // in the Depths: lantern in one hand, blade in the other, always (the Wilderness: blade drawn)
  if(d==='up'&&dun)spr(lan,P.x+lx,P.y+ly);
  if(held&&d!=='down')drawHeldBlade(P.x,P.y,d,S.gear.blade,P.moving,P.anim);
  if(P.swing>0&&(d==='up'||d==='left'))drawSwing();
  const axPh=CHOP?CHOP.sw/.85:0;if(CHOP&&axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look);
  drawHero(P.x,P.y,d,P.moving,P.anim,look,scene==='hold'&&S.name?S.name:null,null,true);if(CHOP&&axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look,true);
  if(P.say&&time<P.sayUntil)TAGS.push({x:P.x,y:P.y-(ADMIN_HATS[S.gear.helm]?28:18)-(ADMIN||SET.pnames||inWild()?5:0)-(inWild()?9:0),say:P.say});
  if(d!=='up'&&dun)spr(lan,P.x+lx,P.y+ly+Math.round(Math.sin(time*5)));
  if(held&&d==='down')drawHeldBlade(P.x,P.y,d,S.gear.blade,P.moving,P.anim);
  if(P.swing>0&&!(d==='up'||d==='left'))drawSwing();
  drawFishing();drawCook();if(CHOP&&!axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look);
}
function drawSwing(){drawSwingAt(P.x,P.y,P.dir,P.swing,S.gear.blade);}
// The blade at rest in the free hand (the lantern is in the other): tilted up, bobbing with each step, swaying a little.
// Facing down it's in front of the body; facing up or to the side it's held at the far side, behind.
const HELD={down:[4.5,-3,-Math.PI/2+.45],up:[-4.5,-3,-Math.PI/2-.45],left:[2,-4,-Math.PI/2+.6],right:[-2,-4,-Math.PI/2-.6]};
function drawHeldBlade(x,y,dir,blade,moving,anim){const h=HELD[dir]||HELD.down,sw=ART.sword[blade]||ART.sword.rusty;
  const bob=moving&&!reduceMotion?-(Math.floor(anim*16)%2):0,a=h[2]+(reduceMotion?0:moving?Math.sin(anim*16)*.09:Math.sin(time*1.8+x*.1)*.04);
  g.save();g.translate(Math.round(x+h[0]),Math.round(y+h[1]+bob));g.rotate(a+Math.PI/4);g.scale(.85,.85);g.drawImage(sw,-2,-14);g.restore();}
function drawSwingAt(x,y,dir,left,blade){const t=easeOut(Math.min(1,1-left/.2)),base={down:Math.PI*.5,up:-Math.PI*.5,left:Math.PI,right:0}[dir]||0,a0=base-1.2,a=a0+t*2.4;
  const sw=ART.sword[blade]||ART.sword.rusty,X=Math.round(x),Y=Math.round(y-6),col=BLADE_FX[blade]||'#f4f4f4',fade=1-t;
  // the smear: a crescent from where the swing started to the blade, brightest at the edge
  if(!reduceMotion&&a-a0>.15){g.save();g.globalCompositeOperation='lighter';
    for(const [r,w,al] of [[15,3,.22],[12,2,.32],[16,1,.6]]){g.strokeStyle=col;g.globalAlpha=al*fade+.05;g.lineWidth=w;g.beginPath();g.arc(X,Y,r,Math.max(a0,a-1.5),a);g.stroke();}
    g.restore();
    // afterimages of the blade
    for(const [k,al] of [[.5,.35],[1,.15]]){const b=a-k;if(b<a0)continue;g.save();g.globalAlpha=al*fade;g.translate(X,Y);g.rotate(b+Math.PI/4);g.drawImage(sw,-2,-14);g.restore();}}
  g.save();g.translate(X,Y);g.rotate(a+Math.PI/4);g.drawImage(sw,-2,-14);g.restore();
  if(t<.85){g.fillStyle='#fff3c4';g.globalAlpha=fade;g.fillRect(Math.round(X+Math.cos(a)*15),Math.round(Y+Math.sin(a)*15),1,1);g.globalAlpha=1;}}   // a glint at the tip
// a hit: a bright slash across the target that flashes and fades
function drawSlashes(){for(const k of slashes){const p=k.t/.16,L=(k.big?14:9)*(.6+p*.6),cx=Math.round(k.x),cy=Math.round(k.y),dx=Math.cos(k.a),dy=Math.sin(k.a);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-p;g.strokeStyle='#fff3c4';g.lineWidth=p<.4?2:1;g.beginPath();g.moveTo(cx-dx*L,cy-dy*L);g.lineTo(cx+dx*L,cy+dy*L);g.stroke();
  g.strokeStyle=k.col;g.lineWidth=1;g.beginPath();g.moveTo(cx-dy*L*.5,cy+dx*L*.5);g.lineTo(cx+dy*L*.5,cy-dx*L*.5);g.stroke();
  if(p<.35){g.fillStyle='#ffffff';g.fillRect(cx-1,cy-1,3,3);}g.restore();}}
function drawEnemy(e){const a=ART[e.d.art],fr=Math.floor(e.t*4)%2,img=a[fr],big=e.d.big;
  if(e.tg){const R=e.tgR||44,X=Math.round(e.x),Y=Math.round(e.y-4),warden=e.type==='warden',col=warden?'115,239,247':'255,110,40';g.save();
    if(e.tg===1){const k=Math.min(1,e.tgK||0);g.fillStyle=`rgba(${col},${.08+.1*k})`;g.beginPath();g.ellipse(X,Y,R*k,R*k*.6,0,0,Math.PI*2);g.fill();g.strokeStyle=`rgba(${col},${.5+.4*Math.sin(time*20)})`;g.lineWidth=1;g.beginPath();g.ellipse(X,Y,R,R*.6,0,0,Math.PI*2);g.stroke();}
    else{g.fillStyle=`rgba(${col},.35)`;g.beginPath();g.ellipse(X,Y,R,R*.6,0,0,Math.PI*2);g.fill();}g.restore();}
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(e.x-(big?10:4)),Math.round(e.y),big?20:8,1);
  const ox=big?16:8,oy=big?31:15;
  const sq=e.sq>0&&!reduceMotion?e.sq/.16:0;if(sq){g.save();g.translate(Math.round(e.x),Math.round(e.y));g.scale(1+sq*.25,1-sq*.2);g.translate(-Math.round(e.x),-Math.round(e.y));}
  if(e.flash>0&&Math.floor(e.flash*30)%2){g.save();g.filter='brightness(3)';spr(img,e.x-ox,e.y-oy);g.restore();}else spr(img,e.x-ox,e.y-oy);
  if(sq)g.restore();
  if(!e.d.boss&&e.hp<e.max){const w=Math.max(0,Math.min(12,Math.round(12*e.hp/e.max)));g.fillStyle='#1a1c2c';g.fillRect(Math.round(e.x-6),Math.round(e.y-oy-4),12,2);if(w){g.fillStyle='#b13e53';g.fillRect(Math.round(e.x-6),Math.round(e.y-oy-4),w,2);}}
}
function drawLight(cx,cy){
  lg.globalCompositeOperation='source-over';lg.globalAlpha=1;lg.fillStyle=run.oil>0?'rgba(6,6,14,.88)':'rgba(3,3,8,.97)';lg.fillRect(0,0,VW,VH);
  lg.globalCompositeOperation='destination-out';
  // smooth light pools (no banding): a radial gradient cut out of the darkness
  const hole=(x,y,r)=>{r=Math.max(2,r);const X=x-cx,Y=y-cy,gr=lg.createRadialGradient(X,Y,0,X,Y,r);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.45,'rgba(0,0,0,.92)');gr.addColorStop(.75,'rgba(0,0,0,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');lg.globalAlpha=1;lg.fillStyle=gr;lg.fillRect(X-r,Y-r,r*2,r*2);};
  const flick=Math.sin(time*9)*1.5+Math.sin(time*23)*.8;
  hole(P.x,P.y-8,(22+70*(run.oil/100))*LAN().light*(1+A('light')/100)+flick);
  for(const e of ents)if(e.tg&&!e.dead)hole(e.x,e.y-4,(e.tgR||44)*(e.tg===2?1.5:.9+.4*(e.tgK||0)));   // a boss attack lights up its own ring
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
  // warm firelight: soft orange pools around torches (flickering) and a golden one around your lantern
  const glow=(x,y,r,c,a)=>{const X=x-cx,Y=y-cy,gr=g.createRadialGradient(X,Y,0,X,Y,r);gr.addColorStop(0,`rgba(${c},${a})`);gr.addColorStop(.5,`rgba(${c},${a*.4})`);gr.addColorStop(1,`rgba(${c},0)`);g.globalAlpha=1;g.fillStyle=gr;g.fillRect(X-r,Y-r,r*2,r*2);};
  for(const o of map.objs){if(o.light&&o.light.c==='warm'&&!o.gone){const yy=o.onWall?o.tile[1]*T+6:o.y-6;if(Math.abs(o.x-P.x)>VW||Math.abs(yy-P.y)>VH)continue;const f=.85+.15*Math.sin(time*11+o.x)*Math.sin(time*7.3+o.y);glow(o.x,yy,o.light.r*.9*f,'255,140,60',.22*f);}}
  {const L=(10+44*run.oil/100)*LAN().light;glow(P.x,P.y-8,L*1.15,flameOn()?FLAMEC:'255,205,120',(flameOn()?.2:.16)+.03*Math.sin(time*9));}
  for(const o of OTH.values())if(o.look&&o.look.flame==='founder'&&Math.abs(o.x-P.x)<VW)glow(o.x,o.y-8,40,FLAMEC,.18+.03*Math.sin(time*9+o.x));
  g.restore();
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
  else if(o.type==='ore'){o.gone=true;o.light=null;const ox=o.tile[0]*T,oy=o.tile[1]*T;if(mine){bump('ores');const OR=ORES[o.kind]||ORES.copper;spawnLoot(ox+8,oy+20,[[o.kind+'_ore',1,o.kind==='starshard'?1:2,o.kind==='starshard'?2:3],['gem',.06,1,1]]);skillXp('mining',OR.xp);floatText(ox+8,oy-6,'+'+OR.xp+' Mining xp','#c9a26b');}puff(ox+8,oy+12,'#ffcd75',10);}}
function mineOre(o,i,who){if(o.gone)return;o.hp--;if(o.hp<=0){objTaken(o,who);MP.objOut(i,o,who);}else MP.objOut(i,o,null);}
MP.objOut=(i,o,by)=>{if(MP.shared())NET.send({t:'obj',o:i,open:o.open?1:0,gone:o.gone?1:0,hp:o.hp,by});};
function applyHit(e,d,a,who){e.hp-=d;e.dmgBy=e.dmgBy||{};e.dmgBy[who]=(e.dmgBy[who]||0)+d;e.flash=.12;const kk=e.d.boss?40:150;e.kb={x:Math.cos(a)*kk,y:Math.sin(a)*kk};if(e.hp<=0)killEnemy(e);}
function nearestTarget(e){let best={x:P.x,y:P.y},bd=Math.hypot(P.x-e.x,P.y-e.y);for(const o of OTH.values()){const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<bd){bd=d;best=o;}}return best;}
MP.contact=(e,dmg)=>{const now=performance.now();e.hc=e.hc||{};for(const o of OTH.values()){if(Math.hypot(o.x-e.x,(o.y-4)-(e.y-e.r))<(e.aoeR||e.r)+6&&now-(e.hc[o.id]||0)>700){e.hc[o.id]=now;NET.send({t:'hurt',to:o.id,d:Math.round(dmg),x:Math.round(e.x),y:Math.round(e.y)});}}};
MP.askDown=()=>{const h=OTH.get(MP.host);toast((h?h.name:'Your host')+' leads the way down. Wait at the stairs.');if(!MP.downT||time-MP.downT>4){MP.downT=time;NET.send({t:'down'});}};
MP.floorOut=f=>{if(MP.shared())NET.send({t:'floor',f});};
// followers: monsters come from the host's snapshots and glide to their new spots
function followEnemies(dt){for(const e of ents){e.t+=dt;if(e.flash>0)e.flash-=dt;if(e.sq>0)e.sq-=dt;if(e.tx!=null){const k=Math.min(1,dt*12);e.x+=(e.tx-e.x)*k;e.y+=(e.ty-e.y)*k;}}ents=ents.filter(e=>!e.dead);}
// ---- per-frame: send my position (10x a second at most, only when it changed), glide other players, host sends monsters ----
MP.tick=dt=>{
  for(const o of OTH.values()){const k=Math.min(1,dt*10),dx=o.tx-o.x,dy=o.ty-o.y;if(Math.abs(dx)>40||Math.abs(dy)>40){o.x=o.tx;o.y=o.ty;}else{o.x+=dx*k;o.y+=dy*k;}
    if(o.moving)o.anim+=dt;if(o.sayT>0)o.sayT-=dt;if(o.fish)o.fish.t+=dt;if(o.chopT>0)o.chopT-=dt;if(o.swT>0)o.swT-=dt;
    if(o.hp!=null&&o.max&&o.hp<o.max&&time-(o.lc??-99)>8)o.hp=Math.min(o.max,o.hp+dt);}
  if(!netOn()||!NET.roomOpen()||!MP.room)return;
  MP.sendT-=dt;if(MP.sendT<=0){MP.sendT=.1;const key=Math.round(P.x)+','+Math.round(P.y)+','+P.dir+','+(P.moving?1:0);if(key!==MP.sent){MP.sent=key;NET.send({t:'s',x:Math.round(P.x*10)/10,y:Math.round(P.y*10)/10,d:P.dir,m:P.moving});}}
  {const f=FISHING&&scene==='hold'?{d:FISHING.dir,ph:FISHING.phase,bx:Math.round(FISHING.bx),by:Math.round(FISHING.by)}:null,k=f?f.d+f.ph+f.bx+','+f.by:'';if(k!==MP.fishKey){MP.fishKey=k;NET.send({t:'fish',f});}}
  // in the Wilderness the room keeps a list of what you'd drop if you fell (sent when it changes)
  if(MP.pvpOn&&inWild()){MP.riskT=(MP.riskT||0)-dt;if(MP.riskT<=0){MP.riskT=.5;const it=riskList(),k=JSON.stringify(it)+(skulled()?'|s':'');if(k!==MP.riskKey){MP.riskKey=k;NET.send({t:'risk',it,sk:Math.max(0,(S.skull||0)-Date.now())});}}}
  MP.lookT-=dt;if(MP.lookT<=0){MP.lookT=1;const l=Object.assign({},myLook(),{lan:S.gear.lantern,blade:S.gear.blade,lvl:S.lvl}),k=JSON.stringify(l);if(k!==MP.lookKey){MP.lookKey=k;NET.send({t:'look',look:l});}}
  if(scene==='delve'&&MP.inInst()&&MP.host===MP.id&&OTH.size){MP.enT-=dt;if(MP.enT<=0){MP.enT=.1;
    NET.send({t:'en',f:run.floor,e:ents.filter(e=>!e.dead).map(e=>[e.id,e.type,Math.round(e.x),Math.round(e.y),Math.max(0,Math.round(e.hp)),e.max,e.flash>0?1:0,Math.round(e.dmgSc*100),e.tg||0,Math.round((e.tgK||0)*100),e.tgR||0])});}}
};
const fishOf=f=>f?{dir:f.d,phase:f.ph,bx:f.bx,by:f.by,t:0}:null;
function addOther(p){if(p.id===MP.id)return;const o=OTH.get(p.id)||{id:p.id,anim:0,sayT:0,say:''};Object.assign(o,{name:p.name,adm:!!p.adm,look:p.look||DEFAULT_LOOK,dir:p.d||'down',moving:!!p.m,fish:fishOf(p.fish),hp:p.hp??null,max:p.max||null,sk:p.sk?Date.now()+p.sk:0});
  // a hero who hasn't said where they are yet stays hidden (older servers announced everyone at 0,0, which drew a
  // faceless, levelless hero flickering at the spawn whenever a backgrounded phone reconnected)
  if(o.x==null||!OTH.has(p.id)){o.pend=!(p.x||p.y);o.x=o.tx=p.x||(map.spawn?map.spawn.x:0);o.y=o.ty=p.y||(map.spawn?map.spawn.y:0);}OTH.set(p.id,o);}
// ---- lobby messages ----
if(window.NET){
  NET.onL('hello',m=>{MP.id=m.you;MP.online=m.online;MP.party=m.party;if(MP.room)NET.lsend({t:'where',room:MP.room,floor:MP.inInst()&&run?run.floor:undefined});else if(scene==='hold')MP.toHold();MP.loadFriends();refreshSocial();});
  NET.onL('off',()=>{});
  NET.onL('world',m=>{if(MP.wantWorld){if(m.room!==MP.wantWorld)toast('World '+MP.wantWorld.slice(1)+' just filled up. You’re in World '+m.room.slice(1)+'.','bad');else if(m.room!==MP.room)toast('Welcome to World '+m.room.slice(1),'good');MP.wantWorld=null;}if(scene==='hold')NET.join(m.room);});
  NET.onL('muted',onMuted);
  NET.onL('online',m=>{MP.online=m.n;refreshSocial();});
  NET.onL('worlds',m=>{MP.worlds={cap:m.cap||50,list:Array.isArray(m.list)?m.list:[]};refreshSocial();});
  NET.onL('status',m=>{for(const s of m.list)MP.status.set(s.id,s);refreshSocial();});
  NET.onL('party',m=>{const had=!!MP.party;MP.party=m.party;refreshSocial();if(!m.party&&had&&MP.inInst()&&MP.host!==MP.id){} });
  NET.onL('invited',m=>{MP.invites=MP.invites.filter(i=>i.from!==m.from);MP.invites.push({from:m.from,name:m.name,at:Date.now()});showPrompt();sfx('rare');buzz(40);});
  NET.onL('note',m=>toast(m.text,m.bad?'bad':''));
  NET.onL('go',m=>MP.enterInst(m.room,m.floor,m.seed));
  NET.onL('partyDelve',m=>{if(scene==='hold'){MP.prompt={kind:'delve',room:m.room,floor:m.floor,seed:m.seed,by:m.by};showPrompt();sfx('rare');}else toast(m.by+' led the party into floor '+m.floor+'. Head home to join them.');});
  NET.onL('pchat',m=>{if(m.sys&&m.id!==MP.id)toast(m.text,'bad');const msg={id:'p'+Date.now()+Math.random(),name:m.name,text:m.text,at:Date.now(),party:true,me:m.id===MP.id,sys:!!m.sys,tab:m.sys?'party':undefined,die:!!m.die};MP.chatLog.push(msg);if(MP.chatCb)MP.chatCb([msg]);});
  NET.onL('feed',m=>{if(!SET.feed)return;const f=$('feed');f.textContent='★ '+m.text;f.classList.add('real');clearTimeout(MP.feedT);MP.feedT=setTimeout(()=>{f.textContent='';},9000);});
  NET.onL('nudge',m=>{if(m.k==='friend'){MP.loadFriends();toast(m.from+' sent you a friend request','good');}});
  NET.onL('died',m=>applyPkDeath(m));
  // a new version is out: this copy can't join the world any more. Save, say so, and reload.
  NET.onL('update',()=>{if(MP.updating)return;MP.updating=true;OTH.clear();MP.room=null;try{save(true);ACC.flush&&ACC.flush();}catch(e){}
    openSheet(`<h2>A new update is out</h2><p class="lead">Lanternhold just got an update. Reloading so you’re on the latest version with everyone else…</p><div class="row"><button class="btn" id="rlU">Reload now</button></div>`);
    $('rlU').onclick=()=>location.reload();setTimeout(()=>location.reload(),2500);});   // you were defeated in the Wilderness after logging out mid-fight
  NET.onL('kicked',m=>{if(m.mod)return modRemoved(m);OTH.clear();MP.room=null;openSheet(`<h2>Signed in elsewhere</h2><p class="lead">${chatEsc(m.reason)} Only one device can play a hero at a time.</p><div class="row"><button class="btn" id="rl">Play here instead</button></div>`);$('rl').onclick=()=>location.reload();});
  // ---- room messages ----
  NET.onR('hi',m=>{if(MP.trade)tradeClear();MP.room=m.room;MP.host=m.host;MP.pvpOn=!!m.pvp;MP.riskKey='';MP.aim=null;OTH.clear();
    // back in the middle of a Wilderness fight (a reconnect, or a reload): right where you were, with the health you had
    if(m.back&&scene==='hold'){P.x=m.back.x;P.y=m.back.y;P.hp=Math.min(hpMax(),m.back.hp);MP.lc=time;if(m.back.sk)S.skull=Date.now()+m.back.sk;FISHING=null;CHOP=null;toast('You’re back in the fight!','bad');}for(const p of m.players)addOther(p);syncDrops(m.drops||[]);if(m.trees&&HOLD.trees){for(const o of HOLD.trees){o.until=0;o.logs=TREES[o.kind].logs;o.cutAt=0;}for(const [i,left,wait,age] of m.trees){const o=HOLD.trees[i];if(o){o.logs=left;o.leftAtCut=left;o.until=wait>0?Date.now()+wait:0;o.cutAt=age>=0?Date.now()-age:0;}}}MP.sent='';MP.lookKey='';MP.fishKey='';MP.sendT=0;MP.lookT=0;
    // chat lives only for this session: nothing said before you signed in is shown, and your log carries over between rooms
    if(MP.chatRoom&&MP.chatRoom!==m.room&&MP.chatLog.length){const msg={id:'sys'+Date.now(),sys:true,text:m.room[0]==='w'?'You’re in World '+m.room.slice(1):'You entered the Depths',at:Date.now()};MP.chatLog.push(msg);if(MP.chatCb)MP.chatCb([msg]);}MP.chatRoom=m.room;
    NET.lsend({t:'where',room:m.room,floor:m.room[0]==='d'?m.floor:undefined});
    if(m.room[0]==='d'){
      if(run&&m.floor&&m.floor!==run.floor)enterFloor(m.floor);
      if(MP.host!==MP.id){ents=[];NET.send({t:'sync'});}
      else MP.nextEid=Math.max(MP.nextEid,...ents.map(e=>e.id+1),1);
    }});
  NET.onR('+',m=>{addOther(m.p);if(scene==='hold'||OTH.size===1)sfx('pick');});
  NET.onR('-',m=>{const o=OTH.get(m.id);OTH.delete(m.id);if(o&&MP.inInst())toast(o.name+' left the dungeon');});
  NET.onR('S',m=>{for(const [id,x,y,d,mv] of m.p){const o=OTH.get(id);if(!o)continue;if(o.pend){o.pend=false;o.x=x;o.y=y;}o.tx=x;o.ty=y;o.dir=d;o.moving=!!mv;}});
  NET.onR('L',m=>{const o=OTH.get(m.id);if(o)o.look=m.look||DEFAULT_LOOK;});
  NET.onR('D',m=>{const v=m.d;if(m.ref){const d=drops.find(q=>q.ref===m.ref);if(d){d.did=v.did;if(v.left!=null)d.expAt=Date.now()+v.left;return;}}netDrop(v,false);});
  NET.onR('took',m=>{const d=drops.find(q=>q.did===m.did);if(d&&d.bag&&d.ref&&m.by!==MP.id)secret('giver');if(m.by===MP.id){if(d)grantDrop(d);else if(ITEMS[m.it]||m.it==='gold')grantDrop({id:m.it,n:m.n});}else if(d)d.taken=true;});
  NET.onR('gone',m=>{const d=drops.find(q=>q.did===m.did);if(d)d.taken=true;});
  NET.onR('nope',m=>{const d=drops.find(q=>q.did===m.did);if(d){d.pending=false;d.showAt=Date.now()+5000;}});
  NET.onR('T',onTree);
  // ---- the Wilderness ----
  NET.onR('PH',m=>{const me=MP.id,a=m.a===me?null:OTH.get(m.a),v=m.v===me?null:OTH.get(m.v),vx=m.v===me?P.x:v&&v.x,vy=m.v===me?P.y:v&&v.y;if(vx==null)return;
    const ax=m.a===me?P.x:a?a.x:vx,ay=m.a===me?P.y:a?a.y:vy;
    if(a){a.swT=.2;const dx=vx-a.x,dy=vy-a.y;a.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');a.lc=time;}
    floatText(vx,vy-20,m.d?String(m.d):'0',!m.d?'#94b0c2':m.v===me?'#ff6b6b':m.a===me?'#ffcd75':'#f4f4f4');
    if(m.d)impact(vx,vy-6,Math.atan2(vy-ay,vx-ax),m.v===me?'#ff6b6b':'#ffcd75',false,m.a===me||m.v===me);
    if(m.a===me)MP.lc=time;
    if(m.v===me){P.hp=m.hp;MP.lc=time;P.chan=0;if(m.hp<=0)MP.deadAt=time;if(m.d){sfx('hurt');buzz(40);if(SET.shake)shake=3;}if(FISHING||CHOP){FISHING=null;CHOP=null;}}
    else if(v){v.hp=m.hp;v.max=m.max;v.lc=time;if(m.a===me&&m.d)sfx('hit');}});
  NET.onR('H',m=>{if(m.id===MP.id){P.hp=Math.min(hpMax(),m.hp);}else{const o=OTH.get(m.id);if(o){o.hp=m.hp;o.max=m.max;}}});
  NET.onR('SK',m=>{const until=m.left>0?Date.now()+m.left:0;if(m.id===MP.id){const was=skulled();S.skull=until;if(until&&!was){toast('You attacked first: you’re skulled for 20 minutes. Fall now and you lose everything.','bad');sfx('boss');}save();}else{const o=OTH.get(m.id);if(o)o.sk=until;}});
  NET.onR('PK',m=>{puff(m.x,m.y-8,'#b13e53',18);const who=m.a===MP.id?'You':m.an;
    if(m.a===MP.id){bump('pks');toast('You defeated '+m.vn+'! Their loot is yours to pick up for a minute.','good');MP.feed('pk',m.vn);sfx('boss');buzz([40,30,40]);}
    else if(m.v!==MP.id&&Math.hypot(m.x-P.x,m.y-P.y)<220)floatText(m.x,m.y-28,who+' defeated '+m.vn,'#ff6b6b');
    const o=OTH.get(m.v);if(o){o.hp=null;o.sk=0;}});
  NET.onR('DIED',m=>applyPkDeath(m));
  NET.onR('PN',m=>{const o=OTH.get(m.to);if(m.why==='level'&&o)pvpWhy(o);else if(m.why==='safe_them'&&o&&time-whyT>2){whyT=time;toast(o.name+' is outside the Wilderness.','bad');}else if(m.why==='protected'&&time-whyT>2){whyT=time;toast('They just arrived. Give them a moment.','bad');}});
  NET.onR('RC',m=>{if(typeof m.tk==='string'){const r=window.LH_RCPT=window.LH_RCPT||[];r.push(m.tk);if(r.length>40)r.shift();}});
  NET.onR('pos',m=>{if(scene!=='hold'||!Number.isFinite(m.x)||!Number.isFinite(m.y))return;
    if(m.home&&P.y<WILD_Y){respawnHold();save(true);return;}   // defeated: the server sends you home to the Hold
    P.x=m.x;P.y=m.y;MP.sent='';});
  NET.onR('muted',onMuted);
  NET.onR('W',peerSwing);
  NET.onR('TQ',m=>{MP.tradeReqs=(MP.tradeReqs||[]).filter(r=>r.from!==m.from);MP.tradeReqs.push({from:m.from,name:m.name,at:Date.now()});showPrompt();sfx('rare');buzz(40);});
  NET.onR('TO',m=>{const prev=MP.trade;MP.trade=m;if(!prev||prev.ver!==m.ver)MP.tradeChanged=Date.now();if(!prev||tradeOpen())openTrade();showPrompt();});
  NET.onR('TR',async()=>{MP.tradeBusy='saving';if(tradeOpen())openTrade();save(true);await ACC.tradeLock();MP.tradeLocked=true;clearTimeout(MP.tradeWD);
    MP.tradeWD=setTimeout(()=>{if(MP.tradeLocked){tradeClear();toast('The trade timed out. Nothing changed.','bad');}},30000);NET.send({t:'tr'});});
  NET.onR('TG',async m=>{MP.tradeBusy='sending';if(tradeOpen())openTrade();const r=await ACC.api.call(null,'trade',{method:'POST',body:{ticket:m.ticket}});
    NET.send({t:'td',ok:!!r.ok,revs:r.ok?r.data.revs:null,why:r.ok?null:(r.data.msg||'The trade didn’t go through.')});});
  NET.onR('TW',()=>{MP.tradeBusy='sending';if(tradeOpen())openTrade();});
  NET.onR('TD',m=>tradeDone(m));
  NET.onR('TX',m=>{const was=MP.trade;tradeClear();if(m.why==='busy')toast((m.by||'They')+' is busy right now.','bad');else if(was)toast((m.by||'The other player')+(m.why==='left'?' left, so the trade was cancelled.':' cancelled the trade.'),'bad');});
  NET.onR('F',m=>{const o=OTH.get(m.id);if(o)o.fish=fishOf(m.f);});
  NET.onR('say',m=>{const msg={id:MP.room+':'+m.n,name:m.name,text:m.text,at:m.at,me:m.id===MP.id};MP.chatLog.push(msg);if(MP.chatLog.length>60)MP.chatLog.shift();if(MP.chatCb)MP.chatCb([msg]);
    const o=OTH.get(m.id);if(o){o.say=m.text;o.sayT=4.5;}});
  NET.onR('slow',()=>chatSys('Slow down a little.'));
  NET.onR('full',()=>{MP.room=null;NET.lsend({t:'world'});});
  NET.onR('denied',()=>{if(scene==='delve'){toast('That dungeon is closed. Heading home.','bad');returnHome();}});
  NET.onR('host',m=>{MP.host=m.id;if(m.id===MP.id){MP.nextEid=Math.max(1000,...ents.map(e=>(e.id||0)+1000));for(const e of ents){e.tx=null;e.st=e.st||'idle';e.cd=e.cd||1;e.kb=e.kb||{x:0,y:0};}if(scene==='delve')toast('You’re now leading this dungeon');}});
  // host → everyone
  NET.onR('en',m=>{if(!MP.client()||scene!=='delve'||m.f!==run.floor)return;const seen=new Set();
    for(const [id,type,x,y,hp,max,fl,sc,tg,tk,tr] of m.e){if(!ENEMIES[type])continue;seen.add(id);let e=ents.find(q=>q.id===id);
      if(!e){e=makeEnemy(type,x,y,(sc||100)/100);e.id=id;ents.push(e);}e.tx=x;e.ty=y;e.hp=hp;e.max=max;if(fl)e.flash=Math.max(e.flash,.1);
      if(tg===2&&e.tg!==2)blastFx(e,tr||46,type==='warden'?'#73eff7':'#ff9f3d');e.tg=tg||0;e.tgK=(tk||0)/100;e.tgR=tr||0;}
    for(const e of ents)if(!seen.has(e.id))e.dead=true;});
  NET.onR('kill',m=>{if(!MP.client()||scene!=='delve')return;let e=ents.find(q=>q.id===m.e);
    if(!e){if(!ENEMIES[m.ty])return;e=makeEnemy(m.ty,m.x,m.y,1);}e.x=m.x;e.y=m.y;e.dead=true;onKilled(e,m.top,m.hit||[],m.xp|0);});
  NET.onR('obj',m=>{if(scene!=='delve'||!map.objs)return;const o=map.objs[m.o];if(!o)return;if(m.hp!=null)o.hp=m.hp;
    if((m.gone&&!o.gone)||(m.open&&!o.open)){objTaken(o,m.by);const who=m.by&&m.by!==MP.me()&&OTH.get(m.by);if(who&&o.type==='chest'){floatText(o.x,o.y-18,who.name+' opened a chest','#ffcd75');if(Math.hypot(o.x-P.x,o.y-P.y)<200)sfx('chest',.5);}}o.req=0;});
  NET.onR('objs',m=>{if(scene!=='delve'||m.f!==run.floor)return;for(const [i,op,gn,hp] of m.s){const o=map.objs[i];if(!o)continue;if(op){o.open=true;o.act=null;}if(gn){o.gone=true;o.light=null;o.act=null;}if(hp!=null)o.hp=hp;}
    if(m.bd&&map.stairs&&map.stairs.hidden){map.stairs.hidden=false;bakeGround(map);}});
  NET.onR('floor',m=>{if(scene!=='delve'||m.f===run.floor)return;sfx('stairs');enterFloor(m.f);toast('Floor '+m.f+' · '+BIOMES[packOf(m.f).id].name);});
  NET.onR('hurt',m=>{if(scene==='delve')hurtPlayer(m.d,{x:m.x,y:m.y});});
  // player → host
  NET.onR('hit',m=>{if(MP.client()||scene!=='delve')return;const e=ents.find(q=>q.id===m.e&&!q.dead);if(!e)return;applyHit(e,Math.max(1,Math.min(e.max,m.d|0)),+m.a||0,m.from);});
  NET.onR('act',m=>{if(MP.client()||scene!=='delve')return;const o=map.objs[m.o];if(!o||(o.type!=='chest'&&o.type!=='glowcap')||o.open||o.gone)return;objTaken(o,m.from);MP.objOut(m.o,o,m.from);const who=OTH.get(m.from);if(who&&o.type==='chest'){floatText(o.x,o.y-18,who.name+' opened a chest','#ffcd75');sfx('chest');}});
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
  async send(ch,text){if(MP.muted)return {ok:false,msg:'You’re muted by an admin.'};const pm=text.match(/^\/p\s+(.+)/i);if(pm){if(!MP.party)return {ok:false,msg:'You’re not in a party. Invite someone from the Social menu.'};NET.lsend({t:'pchat',text:pm[1]});return {ok:true,party:true};}
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
  MP.tradeReqs=(MP.tradeReqs||[]).filter(r=>Date.now()-r.at<85000&&OTH.has(r.from));const tq=MP.tradeReqs[0],tOpen=MP.trade&&!tradeOpen();
  if(!inv&&!pd&&!tq&&!tOpen){el.hidden=true;return;}el.hidden=false;
  if(tOpen){const t=MP.trade,o=t.names[t.a===MP.me()?t.b:t.a];el.innerHTML=`<span>Trading with <b>${chatEsc(o)}</b></span><button class="btn sm" id="invY">Open</button><button class="btn alt sm" id="invN">Cancel trade</button>`;
    $('invY').onclick=()=>openTrade();$('invN').onclick=()=>{NET.send({t:'tx'});tradeClear();};return;}
  if(tq&&!inv){el.innerHTML=`<span><b>${chatEsc(tq.name)}</b> wants to trade with you</span><button class="btn sm" id="invY">Trade</button><button class="btn alt sm" id="invN">No thanks</button>`;
    $('invY').onclick=()=>{NET.send({t:'ta',from:tq.from});MP.tradeReqs.shift();showPrompt();};$('invN').onclick=()=>{MP.tradeReqs.shift();showPrompt();};
    clearTimeout(MP.invT);MP.invT=setTimeout(showPrompt,86000);return;}
  if(inv){el.innerHTML=`<span><b>${chatEsc(inv.name)}</b> invited you to their party</span><button class="btn sm" id="invY">Join</button><button class="btn alt sm" id="invN">No thanks</button>`;
    $('invY').onclick=()=>{NET.lsend({t:'accept',from:inv.from});MP.invites.shift();showPrompt();};$('invN').onclick=()=>{NET.lsend({t:'decline',from:inv.from});MP.invites.shift();showPrompt();};
    clearTimeout(MP.invT);MP.invT=setTimeout(showPrompt,86000);return;}
  el.innerHTML=`<span><b>${chatEsc(pd.by)}</b> led your party into floor ${pd.floor}</span><button class="btn sm" id="invY">Join them</button><button class="btn alt sm" id="invN">Later</button>`;
  $('invY').onclick=()=>MP.enterInst(pd.room,pd.floor,pd.seed);$('invN').onclick=()=>{MP.prompt=null;showPrompt();};}
function hidePrompt(){if(!MP.invites.length&&!MP.prompt)$('invite').hidden=true;else showPrompt();}
// ---- token rewards (Season 1) ----
// The server rolls rewards from what you do (kills, chests, bosses, and now and then fish, logs and crops) and keeps
// your balance; this just shows it. Claiming sends it to your wallet (see openRewards).
const tokSym=()=>window.LH_TOKEN&&LH_TOKEN.symbol?'$'+LH_TOKEN.symbol:'tokens';
const fmtTok=n=>(+n||0).toLocaleString(undefined,{maximumFractionDigits:n>=10000?0:2});
let tokNote={rest:'',cap:''};
window.LH_onTok=t=>{const T0=window.LH_TOK||{};window.LH_TOK=Object.assign({},T0,{balance:t.balance,today:t.today,cap:t.cap,earned:(T0.earned||0)+(t.got||0)});
  if(t.got>0){floatText(P.x,P.y-30,'+'+fmtTok(t.got)+' '+tokSym(),'#a7f070');sfx(t.from&&t.from.some(k=>k==='mother'||k==='knight')?'rare':'coin');
    if(t.from&&t.from.some(k=>k==='mother'||k==='knight'))toast('Boss reward: +'+fmtTok(t.got)+' '+tokSym(),'rare');}
  const d=new Date().toISOString().slice(0,10);
  if(t.today>=t.cap&&tokNote.cap!==d){tokNote.cap=d;toast('You’ve earned today’s full share of rewards. More tomorrow (midnight UTC).','good');}
  else if(t.resting&&tokNote.rest!==d){tokNote.rest=d;toast('Today’s rewards are all handed out. The vault refills at midnight UTC.');}
  if(!$('sheet').hidden&&$('rewSheet'))openRewards(true);};
function tokLine(){const t=window.LH_TOK;if(!t)return '';
  return `<div class="goldline tokl"><img class="ic" src="/favicon-32.png?v=2" alt=""><span><b>${fmtTok(t.balance)}</b> ${chatEsc(tokSym())} <em>rewards</em></span><button class="btn alt sm" id="rewB">Rewards</button></div>`;}
function openRewards(fresh){const t=window.LH_TOK;if(!t)return;if(!fresh)refreshRewards();const sym=chatEsc(tokSym()),pct=t.cap?Math.min(100,Math.round(t.today/t.cap*100)):0;
  openSheet(`<div id="rewSheet"></div><h2>Rewards</h2>
   <div class="goldline tokl big"><img class="ic" src="/favicon-32.png?v=2" alt=""><span><b>${fmtTok(t.balance)}</b> ${sym} <em>ready to claim</em></span></div>
   <h3>Today <small>${fmtTok(t.today)} / ${fmtTok(t.cap)} ${sym}</small></h3><div class="xpb"><i style="width:${pct}%;background:#a7f070"></i></div>
   <p class="lead small">Everyone can earn up to 1% of the day’s rewards each day. Resets at midnight UTC.</p>
   <h3>How you earn</h3><ul class="earn"><li><b>Bosses</b> always pay out</li><li><b>Chests</b> often</li><li><b>Monsters</b> you hit, now and then (deeper floors pay more)</li><li><b>Fishing, woodcutting and farming</b> once in a while</li></ul>
   <h3>The rewards vault</h3><p class="lead small">${t.pool!=null?fmtTok(t.pool)+' '+sym+' left in the vault. ':''}Each day hands out 0.25% of what’s left, so rewards slowly get smaller as the vault empties and it lasts a long time. Every claim burns 5% and sends 5% back into the vault.</p>
   ${claimBox()}
   <div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;wireClaim();}
// claiming: one transaction from the wallet linked to your hero (the server signs a voucher, the vault pays it)
let REW=null,claimV=null;
async function refreshRewards(){const r=await ACC.api.call(null,'rewards');if(!r.ok||!r.data.on)return;REW=r.data;if(r.data.tok)window.LH_TOK=Object.assign({},window.LH_TOK||{},r.data.tok);
  if(!$('sheet').hidden&&$('rewSheet'))openRewards(true);}
function claimBox(){const c=REW&&REW.claims,t=window.LH_TOK||{},sym=chatEsc(tokSym());
  if(!REW)return '<p class="lead small">Loading…</p>';
  if(!c)return '<p class="lead small"><b>Claiming opens soon.</b> Your rewards are saved to your account until then.</p>';
  if(claimV){const v=claimV;return `<div class="soon"><b>Claim ${fmtTok(v.gross)} ${sym}</b><ul><li>You receive <b>${fmtTok(v.net)}</b></li><li>${fmtTok(v.burn)} burned (5%)</li><li>${fmtTok(v.recycle)} back into the vault (5%)</li></ul></div>
    <p class="lead small">Your wallet (${chatEsc(v.wallet.slice(0,6)+'…'+v.wallet.slice(-4))}) will ask you to confirm one transaction on Robinhood Chain. It costs a small gas fee in ETH.</p>
    <button class="btn big" id="clGo">Open my wallet</button><button class="btn alt big" id="clNo">Not now</button>`;}
  const can=t.balance>=c.min&&S.lvl>=c.minLevel;
  return `<h3>Claim</h3><p class="lead small">Send your rewards to your wallet. 90% is yours; 5% is burned and 5% goes back into the vault. ${S.lvl<c.minLevel?`Reach combat level ${c.minLevel} to claim. `:''}${t.balance<c.min?`You can claim from ${fmtTok(c.min)} ${sym}.`:''}</p>
   <button class="btn big" id="clB" ${can?'':'disabled'}>Claim ${fmtTok(t.balance)} ${sym}</button>`;}
function wireClaim(){const b=$('clB');
  if(b)b.onclick=async()=>{b.disabled=true;b.textContent='Preparing…';const r=await ACC.api.call(null,'rewards',{method:'POST',body:{action:'voucher'}});
    if(!r.ok){toast(r.data.msg||'Couldn’t start the claim. Try again.','bad');return openRewards(true);}claimV=r.data;openRewards(true);};
  if($('clNo'))$('clNo').onclick=()=>{claimV=null;openRewards(true);};
  if($('clGo'))$('clGo').onclick=async()=>{const v=claimV,g=$('clGo');g.disabled=true;g.textContent='Confirm in your wallet…';let hash;
    try{hash=await ACC.claimTx(v,REW.claims.contract);}catch(e){claimV=null;toast(e&&e.code===4001?'You cancelled the claim in your wallet.':(e&&e.message)||'The claim didn’t go through.','bad');return openRewards(true);}
    claimV=null;openSheet(`<div id="rewSheet"></div><h2>Claim sent</h2><p class="lead">Waiting for Robinhood Chain to confirm it…</p><p class="lead small"><a class="linkb" href="https://robinhoodchain.blockscout.com/tx/${chatEsc(hash)}" target="_blank" rel="noopener">View the transaction</a></p>`);
    const r=await ACC.api.call(null,'rewards',{method:'POST',body:{action:'sync',tx:hash}});if(r.ok&&r.data.tok)window.LH_TOK=Object.assign({},window.LH_TOK,r.data.tok);
    sfx('rare');toast('Claimed! '+fmtTok(v.net)+' '+tokSym()+' sent to your wallet.','rare');
    openSheet(`<h2>Claimed</h2><p class="lead"><b>${fmtTok(v.net)} ${chatEsc(tokSym())}</b> are on their way to your wallet. ${fmtTok(v.burn)} were burned and ${fmtTok(v.recycle)} went back into the vault.</p>
     <p class="lead small"><a class="linkb" href="https://robinhoodchain.blockscout.com/tx/${chatEsc(hash)}" target="_blank" rel="noopener">View the transaction</a></p><div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;};}
// ---- trading (in the Hold): both players build offers and both accept; the website then moves the items for both ----
const tradeOpen=()=>!$('sheet').hidden&&!!$('tradeSheet');
const tradable=id=>!!(ITEMS[id]&&!ITEMS[id].bound&&!ITEMS[id].keep);
function tradeClear(){const locked=MP.tradeLocked;MP.trade=null;MP.tradeBusy=null;MP.tradeLocked=false;MP.tradePick=false;clearTimeout(MP.tradeWD);if(locked)ACC.tradeUnlock(null);if(tradeOpen())closeSheet();showPrompt();}
function tradeDone(m){const me=MP.me(),them=m.a===me?m.b:m.a,give=m.off[me],get=m.off[them],name=(MP.trade&&MP.trade.names[them])||'them';
  MP.tradeLocked=false;clearTimeout(MP.tradeWD);MP.trade=null;MP.tradeBusy=null;
  if(!m.ok){ACC.tradeUnlock(null);if(tradeOpen())closeSheet();toast(m.why||'The trade didn’t go through. Nothing changed.','bad');showPrompt();return;}
  for(const [id,n] of Object.entries(give.i)){S.bank[id]=Math.max(0,(S.bank[id]||0)-n);if(!S.bank[id])delete S.bank[id];}
  for(const [id,n] of Object.entries(get.i))if(ITEMS[id])S.bank[id]=(S.bank[id]||0)+n;
  S.gold=Math.max(0,S.gold-give.g)+get.g;ACC.tradeUnlock(m.revs[me]);save();sfx('level');
  const list=o=>[...Object.entries(o.i).map(([id,n])=>n+' '+ITEMS[id].n),o.g?fmt(o.g)+' gold':''].filter(Boolean).join(', ')||'nothing';
  openSheet(`<h2>Trade complete</h2><p class="lead">You gave ${chatEsc(name)} <b>${chatEsc(list(give))}</b> and got <b>${chatEsc(list(get))}</b>.</p><p class="lead small">Your new items are in your bag.</p><div class="row"><button class="btn" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;showPrompt();}
function tradeSend(i,g){NET.send({t:'tu',i,g});}
function openTrade(){const t=MP.trade;if(!t)return;const me=MP.me(),them=t.a===me?t.b:t.a,mine=t.off[me],theirs=t.off[them],name=chatEsc(t.names[them]);
  const row=(id,n,rm)=>`<div class="trrow">${iconImg(id)}<span>${chatEsc(ITEMS[id].n)} <b>×${fmt(n)}</b></span>${rm?`<button class="btn alt sm" data-trm="${id}">Remove</button>`:''}</div>`;
  const list=(o,rm)=>(Object.entries(o.i).map(([id,n])=>ITEMS[id]?row(id,n,rm):'').join('')+(o.g?`<div class="trrow">${iconImg('gold')}<span><b>${fmt(o.g)}</b> gold</span></div>`:''))||'<p class="lead small">Nothing yet.</p>';
  const wait=Date.now()-(MP.tradeChanged||0)<2500,iOk=t.ok[me]===t.ver,tOk=t.ok[them]===t.ver,busy=t.go||MP.tradeBusy;
  const none=o=>!o.g&&!Object.keys(o.i).length,empty=none(mine)&&none(theirs),gift=!empty&&(none(mine)||none(theirs));
  const pick=MP.tradePick&&!busy?Object.entries(S.bank).filter(([id,n])=>tradable(id)&&n>(mine.i[id]||0)).map(([id,n])=>{const left=n-(mine.i[id]||0);
    return `<div class="trrow">${iconImg(id)}<span>${chatEsc(ITEMS[id].n)} <small>${fmt(left)} left</small></span><button class="btn alt sm" data-tad="${id}" data-n="1">+1</button>${left>1?`<button class="btn alt sm" data-tad="${id}" data-n="${left}">All</button>`:''}</div>`;}).join('')||'<p class="lead small">Nothing else in your bag can be traded.</p>':'';
  openSheet(`<div id="tradeSheet"></div><h2>Trade with ${name}</h2>
   <h3>${name} offers ${tOk?'<small class="ok">✓ accepted</small>':''}</h3><div class="trbox">${list(theirs,false)}</div>
   <h3>You offer ${iOk?'<small class="ok">✓ accepted</small>':''}</h3><div class="trbox">${list(mine,!busy)}</div>
   ${busy?'':`<div class="row"><button class="btn alt" id="trPick">${MP.tradePick?'Done adding':'Add items from your bag'}</button></div>${pick?`<div class="trbox">${pick}</div>`:''}
   <div class="setrow col"><span>Gold <small>(you have ${fmt(S.gold)})</small></span><div class="row" style="margin-top:4px"><input id="trG" type="number" min="0" max="${S.gold}" value="${mine.g||''}" placeholder="0" class="trg"><button class="btn alt sm" id="trGs">Set gold</button></div></div>`}
   ${gift&&!busy?`<p class="lead small trgift">${none(mine)?`<b>A gift to you:</b> ${name} gets nothing back.`:`<b>A gift:</b> you get nothing back from ${name}.`}</p>`:''}
   <p class="lead small">${busy?'<b>Completing the trade…</b> Both of you are saved, then the items move for both at once.':empty?'Add an item or some gold to start. One side can be empty (a gift), but not both.':'Both of you must accept. Any change to either offer resets both accepts, so check what you’re getting before you accept.'}</p>
   ${busy?'':`<div class="row"><button class="btn alt" id="trX">Cancel</button><button class="btn" id="trOk" ${iOk||wait||empty?'disabled':''}>${iOk?'Waiting for '+name+'…':empty?'Nothing to trade yet':wait?'Check the offers…':gift&&none(mine)?'Accept gift':'Accept trade'}</button></div>`}`);
  if(busy)return;
  const q=s=>$('sheet').querySelectorAll(s);
  $('trX').onclick=()=>{NET.send({t:'tx'});tradeClear();};
  $('trOk').onclick=()=>NET.send({t:'tk',ver:t.ver});
  $('trPick').onclick=()=>{MP.tradePick=!MP.tradePick;openTrade();};
  q('[data-trm]').forEach(b=>b.onclick=()=>{const i=Object.assign({},mine.i);delete i[b.dataset.trm];tradeSend(i,mine.g);});
  q('[data-tad]').forEach(b=>b.onclick=()=>{const id=b.dataset.tad,i=Object.assign({},mine.i);if(!i[id]&&Object.keys(i).length>=12)return toast('Up to 12 kinds of items per trade.','bad');
    i[id]=Math.min(S.bank[id]||0,(i[id]||0)+(+b.dataset.n));tradeSend(i,mine.g);});
  $('trGs').onclick=()=>{const g=Math.max(0,Math.min(S.gold,Math.floor(+$('trG').value||0)));tradeSend(mine.i,g);};
  $('trG').onkeydown=e=>e.stopPropagation();
  if(wait)setTimeout(()=>{if(tradeOpen()&&MP.trade===t)openTrade();},2600);}
// ---- moderation ----
// a player an admin muted: chat is blocked by the realtime server until an admin unmutes them
function onMuted(m){const was=!!MP.muted;MP.muted=!!m.on;if(m.said){chatSys('You’re muted by an admin.');return;}
  if(MP.muted!==was)toast(MP.muted?'An admin muted you. You can’t chat until you’re unmuted.':'An admin unmuted you. You can chat again.',MP.muted?'bad':'good');}
const banWhen=b=>!b?'':b.perm?'permanently':'until '+new Date(b.until).toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
// kicked or banned by an admin: save, sign out and say why on the sign-in screen (a kicked player can sign straight back in)
function modRemoved(m){OTH.clear();MP.room=null;
  const msg=m.mod==='ban'?'You were banned by an admin '+banWhen(m.perm?{perm:true}:m.until?{until:m.until}:null)+'.':'You were kicked by an admin. You can sign back in.';
  try{sessionStorage.setItem('lanternhold.notice',msg);}catch(e){}
  openSheet(`<h2>${m.mod==='ban'?'Banned':'Kicked'}</h2><p class="lead">${chatEsc(msg)}</p>`);
  if(window.ACC&&ACC.logout)ACC.logout().catch(()=>location.reload());else location.reload();}
// admins: right-click (or press and hold) a player, or use Moderate in Social → Nearby
const BAN_LABEL=['Ban · 24 hours (strike 1 of 3)','Ban · 72 hours (strike 2 of 3)','Ban · permanent (strike 3 of 3)'];
async function openMod(id,name,arm){if(!ADMIN)return;
  openSheet(`<h2>${chatEsc(name)}</h2><p class="lead small">Checking…</p><div class="row"><button class="btn alt" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;
  const r=await ACC.api.call(null,'admin/mod?name='+encodeURIComponent(name));
  if(!r.ok){openSheet(`<h2>${chatEsc(name)}</h2><p class="lead">${chatEsc(r.data.msg||{is_admin:'Admins can’t be moderated.',self:'That’s you.',no_such_player:'No player by that name.',not_admin:'Only admins can do this.'}[r.data.error]||'Couldn’t load this player.')}</p><div class="row"><button class="btn alt" id="sx">Close</button></div>`);$('sx').onclick=closeSheet;return;}
  const st=r.data,strikes=st.strikes|0,o=OTH.get(id);
  const lines=[o?'Here with you':'Not on this map',st.muted?'<b style="color:#ef7d57">Muted</b>':'Not muted',`Strikes: ${strikes} of 3`];if(st.ban)lines.push('Banned '+banWhen(st.ban));
  const confirm=k=>arm===k;
  openSheet(`<div class="npchd"><span><b>${chatEsc(st.name)}</b><small>Admin tools</small></span></div><p class="lead small">${lines.join(' · ')}</p>
   <div class="list modl">
    <button class="btn ${confirm('kick')?'danger':'alt'} big" data-mod="kick">${confirm('kick')?'Tap again to kick '+chatEsc(st.name):'Kick'}</button><p class="lead small">Disconnects them and signs them out. They can sign straight back in.</p>
    <button class="btn alt big" data-mod="${st.muted?'unmute':'mute'}">${st.muted?'Unmute':'Mute'}</button><p class="lead small">${st.muted?'Lets them chat again.':'They can’t chat until an admin unmutes them.'}</p>
    ${st.ban?'':`<button class="btn ${confirm('ban')?'danger':'alt'} big" data-mod="ban">${confirm('ban')?'Tap again to confirm: '+BAN_LABEL[Math.min(2,strikes)].replace('Ban · ','ban '):BAN_LABEL[Math.min(2,strikes)]}</button><p class="lead small">Three strikes: 24 hours, then 72 hours, then permanent. Bans are per account, not per IP.</p>`}
   </div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;
  $('sheet').querySelectorAll('[data-mod]').forEach(b=>b.onclick=async()=>{const act=b.dataset.mod;
    if((act==='kick'||act==='ban')&&!confirm(act))return openMod(id,name,act);
    b.disabled=true;const q=await ACC.api.call(null,'admin/mod',{method:'POST',body:{name,action:act}});
    if(!q.ok){toast(q.data.msg||(q.data.error==='already_banned'?'They’re already banned.':'That didn’t work.'),'bad');return openMod(id,name);}
    NET.lsend({t:'mod',act,to:q.data.id,until:q.data.ban&&q.data.ban.until||null,perm:!!(q.data.ban&&q.data.ban.perm)});
    toast(act==='kick'?st.name+' was kicked':act==='ban'?st.name+' is banned '+banWhen(q.data.ban):act==='mute'?st.name+' is muted':st.name+' is unmuted','good');
    if(act==='mute'||act==='unmute')openMod(id,name);else closeSheet();});}
// right-click a player (computers): a small menu with Trade (in the Hold), and Moderate for admins
function playerMenu(o,x,y){closeMenu();const items=[];
  if(scene==='hold'&&MP.room&&MP.room[0]==='w')items.push(['trade',MP.trade?'Trading…':'Trade',!!MP.trade]);
  if(ADMIN&&!o.adm)items.push(['mod','Moderate',false]);
  if(!items.length)return;
  const m=document.createElement('div');m.id='pmenu';m.className='px';m.setAttribute('role','menu');
  m.innerHTML=`<b>${chatEsc(o.name)}</b>`+items.map(([k,l,dis])=>`<button class="btn alt sm" role="menuitem" data-pm="${k}" ${dis?'disabled':''}>${l}</button>`).join('');
  document.body.appendChild(m);const r=m.getBoundingClientRect();
  m.style.left=Math.max(6,Math.min(innerWidth-r.width-6,x))+'px';m.style.top=Math.max(6,Math.min(innerHeight-r.height-6,y))+'px';
  m.querySelectorAll('[data-pm]').forEach(b=>b.onclick=()=>{closeMenu();
    if(b.dataset.pm==='trade'){if(!OTH.has(o.id))return toast(o.name+' isn’t here any more','bad');NET.send({t:'tq',to:o.id});toast('Trade request sent to '+o.name);}
    else openMod(o.id,o.name);});
  setTimeout(()=>{addEventListener('pointerdown',menuAway,true);addEventListener('keydown',menuKey,true);},0);}
function menuAway(e){if(!e.target.closest('#pmenu'))closeMenu();}
function menuKey(e){if(e.key==='Escape')closeMenu();}
function closeMenu(){const m=$('pmenu');if(m)m.remove();removeEventListener('pointerdown',menuAway,true);removeEventListener('keydown',menuKey,true);}
// which player is under the pointer (screen → world)
function otherAt(cx,cy){const dpr=window.devicePixelRatio||1,k=SCALE/dpr,wx=cx/k+camX,wy=cy/k+camY;let best=null,bd=14;
  for(const o of OTH.values()){if(o.pend)continue;const d=Math.hypot(o.x-wx,o.y-8-wy);if(d<bd){bd=d;best=o;}}return best;}
{let lp=null;const cvEl=$('cv');
  cvEl.addEventListener('contextmenu',e=>{if(!started||!$('sheet').hidden)return;const o=otherAt(e.clientX,e.clientY);if(o){e.preventDefault();playerMenu(o,e.clientX,e.clientY);}});
  cvEl.addEventListener('touchstart',e=>{if(!ADMIN||!started||e.touches.length!==1)return;const t=e.touches[0],o=otherAt(t.clientX,t.clientY);if(!o)return;
    lp={x:t.clientX,y:t.clientY,o,tm:setTimeout(()=>{if(lp){buzz(30);openMod(lp.o.id,lp.o.name);lp=null;}},600)};},{passive:true});
  const end=e=>{if(lp&&(e.type!=='touchmove'||Math.hypot(e.touches[0].clientX-lp.x,e.touches[0].clientY-lp.y)>10)){clearTimeout(lp.tm);lp=null;}};
  cvEl.addEventListener('touchmove',end,{passive:true});cvEl.addEventListener('touchend',end);cvEl.addEventListener('touchcancel',end);}
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
  }else if(socTab==='worlds'){
    const W=MP.worlds,cap=W?W.cap:50;
    if(!W)body='<p class="lead small">Looking up worlds…</p>';
    else{const list=W.list.slice();if(myWorld&&!list.some(w=>w[0]===myWorld))list.push([myWorld,OTH.size+1]);list.sort((a,b)=>+a[0].slice(1)-+b[0].slice(1));
      let next=1;while(list.some(w=>w[0]==='w'+next))next++;
      body=list.map(([r,n])=>{const me=r===myWorld,full=n>=cap&&!me,b=me?'':full?'<button class="btn alt sm" disabled>Full</button>':scene!=='hold'?'':`<button class="btn sm" data-sw="${r}">Switch</button>`;
          return `<div class="srow"><span><b>World ${r.slice(1)}${me?' (you’re here)':''}</b><small>${n}/${cap} players</small><i class="xpb"><i style="width:${Math.min(100,Math.round(n/cap*100))}%;background:${full?'#b13e53':'#a7f070'}"></i></i></span><span class="sbtns">${b}</span></div>`;}).join('')
        +(scene==='hold'?`<div class="srow"><span><b>World ${next}</b><small>Empty. A quiet place to start fresh.</small></span><span class="sbtns"><button class="btn alt sm" data-sw="w${next}">Open</button></span></div>`:'')
        +`<p class="lead small">${scene==='hold'?'Each world holds '+cap+' players. Your party, friends list and progress come with you; trees, chat and items on the ground belong to each world.':'Return home to the Hold to switch worlds.'}</p>`;}
  }else{
    const near=[...OTH.values()].filter(o=>!o.pend);
    body=near.length?near.map(o=>{const fr=F.friends.some(f=>f.name.toLowerCase()===o.id),pend=F.outgoing.some(n=>n.toLowerCase()===o.id),b=[];
        if(!fr&&!pend)b.push(`<button class="btn alt sm" data-fadd="${chatEsc(o.name)}">Add friend</button>`);
        if(!inParty(o.id)&&MP.isLeader())b.push(`<button class="btn sm" data-inv="${o.id}">Invite</button>`);
        if(scene==='hold'&&!MP.trade)b.push(`<button class="btn alt sm" data-trq="${o.id}">Trade</button>`);
        if(ADMIN&&!o.adm)b.push(`<button class="btn danger sm" data-modp="${o.id}">Moderate</button>`);
        return row(o.name,fr?'Friend':pend?'Request sent':'Here with you',b.join(''),true);}).join('')
      :'<p class="lead small">No one else is here right now.</p>';
  }
  const pn=p?p.members.length:0;
  openSheet(`<div id="socialSheet"></div><h2>Social</h2><p class="lead small">${MP.online||1} player${MP.online===1?'':'s'} online${MP.room&&MP.room[0]==='w'?' · you’re in World '+MP.room.slice(1)+(socTab!=='worlds'?' · <button class="linkb" id="swB">Switch world</button>':''):''}</p>
   <div class="tabs"><button class="tab" aria-selected="${socTab==='friends'}" data-st2="friends">Friends${F.incoming.length?' ('+F.incoming.length+')':''}</button><button class="tab" aria-selected="${socTab==='party'}" data-st2="party">Party${pn?' '+pn+'/4':''}</button><button class="tab" aria-selected="${socTab==='here'}" data-st2="here">Nearby ${OTH.size}</button><button class="tab" aria-selected="${socTab==='worlds'}" data-st2="worlds">Worlds</button></div>
   <div class="list social">${body}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  const q=s=>$('sheet').querySelectorAll(s);$('sx').onclick=()=>{socOpen=false;closeSheet();};
  q('[data-st2]').forEach(b=>b.onclick=()=>{MP.rmArm=null;openSocial(b.dataset.st2);});
  const add=async()=>{const v=($('fadd').value||'').trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(v)){toast('Type a hero name (3–16 letters, numbers or _)','bad');return;}if(await MP.friendDo('add',v))$('fadd').value='';};
  if($('faddB')){$('faddB').onclick=add;$('fadd').onkeydown=e=>{if(e.key==='Enter')add();e.stopPropagation();};if(keep&&typed)$('fadd').focus();}
  q('[data-fa]').forEach(b=>b.onclick=()=>{const a=b.dataset.fa,n=b.dataset.n;if(a==='remove'&&MP.rmArm!==n){MP.rmArm=n;return openSocial('friends');}MP.rmArm=null;MP.friendDo(a,n);});
  q('[data-fadd]').forEach(b=>b.onclick=()=>MP.friendDo('add',b.dataset.fadd));
  q('[data-trq]').forEach(b=>b.onclick=()=>{NET.send({t:'tq',to:b.dataset.trq});b.disabled=true;b.textContent='Asked';toast('Trade request sent');});
  q('[data-modp]').forEach(b=>b.onclick=()=>{const o=OTH.get(b.dataset.modp);if(o){socOpen=false;openMod(o.id,o.name);}});
  q('[data-inv]').forEach(b=>b.onclick=()=>{NET.lsend({t:'invite',to:b.dataset.inv});b.disabled=true;b.textContent='Invited';});
  q('[data-jw]').forEach(b=>b.onclick=()=>{MP.wantWorld=b.dataset.jw;socOpen=false;closeSheet();NET.lsend({t:'world',want:b.dataset.jw});toast('Travelling to World '+b.dataset.jw.slice(1));});
  if(socTab==='worlds'&&!keep)NET.lsend({t:'worlds'});
  if($('swB'))$('swB').onclick=()=>openSocial('worlds');
  q('[data-sw]').forEach(b=>b.onclick=()=>{if(scene!=='hold')return;MP.wantWorld=b.dataset.sw;socOpen=false;closeSheet();NET.lsend({t:'world',want:b.dataset.sw});toast('Travelling to World '+b.dataset.sw.slice(1)+'…');});
  q('[data-kick]').forEach(b=>b.onclick=()=>NET.lsend({t:'kick',id:b.dataset.kick}));
  q('[data-lead]').forEach(b=>b.onclick=()=>NET.lsend({t:'lead',id:b.dataset.lead}));
  if($('lvP'))$('lvP').onclick=()=>NET.lsend({t:'leave'});
  if($('jp'))$('jp').onclick=()=>{socOpen=false;if(scene==='delve'){toast('Return home first, then join your party.');return;}MP.enterInst(p.inst.room,p.inst.floor,p.inst.seed);};
}
{const p=new Px(16,16);p.ell(5.5,6,2.6,2.6,PAL.white);p.ell(11,6.5,2.2,2.2,PAL.silver);p.ell(5.5,12.5,4.2,2.6,PAL.white);p.ell(11.5,12.5,3.2,2.3,PAL.silver);p.outline();$('socIc').src=p.canvas().toDataURL();}
$('socB').onclick=()=>{if(!$('sheet').hidden&&$('socialSheet')){socOpen=false;closeSheet();}else openSocial();};

let last=0;
function frame(ts){let dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(hitStop>0){hitStop-=dt;dt*=.12;}if(started)update(dt);else time+=dt;render();requestAnimationFrame(frame);}
let started=false;
fit();applySet();enterHold();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{});
let posTick=0;setInterval(()=>{if(started){if(++posTick%3===0)notePos();save();}},10000);
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&started){notePos();save();}});addEventListener('pagehide',()=>{if(started){notePos();save();}});
// Admin loadout: the best gear equipped, one of every lantern, cape and top-tier piece in the bank, both relics, max bank space.
function grantKit(){const old=S.gear,eq={blade:'cinder',mail:'steel',lantern:'wisp',cape:'mother',helm:HAT};
  for(const sl of ['blade','mail','lantern','cape','helm']){const cur=old[sl];if(cur&&cur!==eq[sl]&&!(sl==='blade'&&cur==='rusty')&&!(sl==='mail'&&cur==='none')&&!(sl==='lantern'&&cur==='basic'))give(S.bank,gearId(sl,cur),1);}
  S.gear=Object.assign({},eq);S.bankBuys=BANK_BUYS.length;S.gold+=100000;
  const has=id=>(S.bank[id]||0)+(S.vault[id]||0)>0;
  for(const k of Object.keys(LANTERNS))if(k!=='wisp'&&k!=='basic'&&!has(k+'_lantern'))give(S.vault,k+'_lantern',1);
  for(const k of Object.keys(CAPES))if(k!=='mother'&&!has('cape_'+k))give(S.vault,'cape_'+k,1);
  for(const id of ['ember_blade','ember_mail','ember_helm','steel_blade','steel_helm','star_helm','relic_crown','relic_sigil','relic_heart','relic_star'])if(!has(id))give(S.vault,id,1);
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
let chatOpen=false,chatCh=null,chatLeaveFn=null,chatMsgs=[],chatSeen=new Set(),chatLast=0,chatTab='world';const chatUnread={world:0,party:0};
// two tabs: World (everyone on your map) and Party (your party, wherever they are)
const chatIn=(m,tab)=>m.sys?(!m.tab||m.tab===tab):tab==='party'?!!m.party:!m.party;
function chatTabs(){for(const t of ['world','party']){const b=$(t==='world'?'ctW':'ctP');b.setAttribute('aria-selected',String(chatTab===t));const n=b.querySelector('i');n.hidden=!chatUnread[t];n.textContent=chatUnread[t]>9?'9+':chatUnread[t];}
  $('chatIn').placeholder=chatTab==='party'?(MP.party?'Message your party…':'Join a party to chat here…'):'Say something to everyone here…';}
function setChatTab(t){chatTab=t;chatUnread[t]=0;chatTabs();const L=$('chatLog');chatRender();if(L)L.scrollTop=L.scrollHeight;}
const CHAT_BAD=['fuck','shit','bitch','cunt','dick','cock','pussy','nigg','fag','rape','nazi','hitler','porn','slut','whore','penis','vagina','retard','kkk','molest','pedo'];
const chatClean=t=>{t=String(t).replace(/[\u0000-\u001f\u007f<>]/g,'').replace(/\s+/g,' ').trim().slice(0,140);for(const w of CHAT_BAD)t=t.replace(new RegExp('\\b'+w+'\\w*','gi'),m=>m[0]+'*'.repeat(m.length-1));return t;};
const chatChannel=()=>MP.room||(scene==='delve'?'solo':'hold');
const chatPlace=ch=>ch[0]==='w'?'World '+ch.slice(1):ch[0]==='d'||ch==='solo'?'your dungeon':'the Hold';
const chatEsc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function chatRender(){const L=$('chatLog');if(!L)return;const atEnd=L.scrollHeight-L.scrollTop-L.clientHeight<30;
  const list=chatMsgs.filter(m=>chatIn(m,chatTab)).slice(-80);
  L.innerHTML=list.map(m=>m.sys?`<p class="sys${m.die?' die':''}">${m.die?'☠ ':''}${chatEsc(m.text)}</p>`:`<p class="${m.me?'me':''}${m.party?' pty':''}"><b>${chatEsc(m.name)}</b> ${chatEsc(m.text)}</p>`).join('');
  if(atEnd||list.length<3)L.scrollTop=L.scrollHeight;$('chatWhere').textContent=chatTab==='party'?(MP.party?MP.party.members.length+'/4':'no party'):chatPlace(chatCh||chatChannel());}
function chatSys(text,at,tab){chatMsgs.push({id:'s'+Math.random(),sys:true,text,tab:tab||null,at:at===undefined?Date.now():at});chatRender();}
function chatAdd(list){let n=0;for(const m of list||[]){if(!m||chatSeen.has(m.id))continue;chatSeen.add(m.id);m.text=chatClean(m.text);if(!m.text)continue;m.me=m.me||(!!S.name&&m.name===S.name);chatMsgs.push(m);n++;
    const t=m.party?'party':'world';if(t!==chatTab&&!m.me&&m.at>Date.now()-15000){chatUnread[t]++;}}
  if(n)chatTabs();
  if(!n)return;chatMsgs.sort((a,b)=>a.at-b.at);if(chatMsgs.length>150)chatMsgs=chatMsgs.slice(-150);if(chatOpen)chatRender();}
function chatLeave(){if(chatLeaveFn){try{chatLeaveFn();}catch(e){}}chatLeaveFn=null;}
function chatJoin(){const ch=chatChannel();chatLeave();chatCh=ch;chatMsgs=[];chatSeen.clear();
  chatSys('Chatting with everyone in '+chatPlace(ch)+'. Be kind.',0,'world');chatSys('Your party’s chat: only party members see it, wherever they are.',0,'party');chatTabs();
  const net=window.CHATNET,why=net&&net.why&&net.why();
  if(!net||why){chatSys(why||'Chat is offline right now.');$('chatIn').disabled=true;return;}
  $('chatIn').disabled=false;chatLeaveFn=net.join(ch,chatAdd);}
function toggleChat(force){if(!started)return;chatOpen=force===undefined?!chatOpen:!!force;$('chat').hidden=!chatOpen;$('chatB').setAttribute('aria-pressed',String(chatOpen));
  if(chatOpen){chatJoin();if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches)setTimeout(()=>$('chatIn').focus(),0);}
  else{chatLeave();chatCh=null;$('chatIn').blur();}}
async function chatSend(){const i=$('chatIn'),t=chatClean(i.value);if(!t)return;const now=Date.now();
  if(now-chatLast<1500){chatSys('Slow down a little.');return;}chatLast=now;i.value='';
  const net=window.CHATNET;if(!net||(net.why&&net.why()))return chatSys('Chat is offline right now.');
  const party=chatTab==='party'&&!/^\/p\s/i.test(t);
  if(party&&!MP.party){chatSys('You’re not in a party. Invite someone from Social → Friends or Nearby.',undefined,'party');return;}
  const r=await net.send(chatCh||chatChannel(),party?'/p '+t:t);
  if(r&&r.ok){if(r.msg)chatAdd([Object.assign({me:true},r.msg)]);if(r.party){if(chatTab!=='party')setChatTab('party');}else{P.say=t;P.sayUntil=time+4.5;}}else chatSys((r&&r.msg)||'Message not sent. Try again.',undefined,chatTab);}
$('ctW').onclick=()=>setChatTab('world');$('ctP').onclick=()=>setChatTab('party');
setInterval(()=>{if(chatOpen&&chatCh!==chatChannel())chatJoin();},500);
{const p=new Px(16,16);p.rows(2,3,['.aaaaaaaaaa.','abbbbbbbbbba','abbbbbbbbbba','abccbccbccba','abbbbbbbbbba','abbbbbbbbbba','.aaaaabbaaa.','.....abba...','......aa....'],{a:PAL.ink,b:PAL.white,c:PAL.slate});
  $('chatIc').src=p.canvas().toDataURL();}
$('chatB').onclick=()=>toggleChat();$('chatX').onclick=()=>toggleChat(false);$('chatGo').onclick=()=>{chatSend();if(!(window.matchMedia&&matchMedia('(hover:hover)').matches))$('chatIn').focus();};
$('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();chatSend();}else if(e.key==='Escape'){e.preventDefault();toggleChat(false);}e.stopPropagation();});
window.LH={heroName:()=>S.name,start(pid,data,o){document.documentElement.classList.remove('pre');PID=pid;S=normalize(data);if(!loadSet(S.settings))S.settings=Object.assign({},SET,{sound:!muted});/* v0.9.2: player names on for everyone, once (they can turn them off) */if(!S.flags.names){S.flags.names=true;SET.pnames=true;S.settings=Object.assign({},S.settings||SET,{pnames:true});saveSet();}applyAdmin(o&&o.admin,o&&o.hat);setTimeout(()=>{if(bulletinNew())toast('New update: v'+BUILD.version+'. Read the Bulletin at the crossroads.','good');},6000);migrateBank();lastCap=bankCap();P.hp=maxHp();started=true;enterHold();placeAt(S.pos);save();setTimeout(()=>refreshFounder(),2500);if(o.isNew){setTimeout(()=>toast('Welcome to the Hold, '+S.name+'!','good'),300);setTimeout(()=>toast('Visit Wick by the road to the Delve Gate to see if you’re a Founder.','good'),4200);}else toast('Welcome back, '+S.name,'good');},
  resume(){document.documentElement.classList.remove('pre');},setLook(l){S.look=Object.assign({},l);save();openBag();}};
if(location.hostname==='localhost'||location.protocol==='file:')window.__lh={makeEnemy,get drops(){return drops},get MP(){return MP},get OTH(){return OTH},openSocial:t=>openSocial(t),get S(){return S},get P(){return P},get run(){return run},get ents(){return ents},get map(){return map},get scene(){return scene},startDelve,enterFloor,setStick:(x,y)=>{stick={x,y,on:!!(x||y)};},press:()=>{aPressed=true;},hold:v=>{retHeld=v;},spawnLoot,dropItem:(id,n)=>{take(id,n);dropToGround(id,n);},act:()=>{const a=nearestAct();if(a)doAct(a);return a&&a.id;},fishSpot,startFishing,get FISHING(){return FISHING},T,get CHOP(){return CHOP},HOLD,startChop,openGuide,openHero,openSkills,openBag,GOALS,goalsDone,skillXp,lvlOf,get COOK(){return COOK},startCook,RECIPES,get cam(){return [camX,camY,VW,VH]},get SET(){return SET},openFounders,openWick,openBulletin,get FND(){return FND},get texts(){return texts},set FND(v){FND=v},myLook,closeSheet,riskList,applyPkDeath,pvpTarget,canHit,openWildWarn,inWild,hpMax,get TAGS(){return TAGS},openGate,openCraft,gainXp,gearDrops,openItem,openAdmin,get shake(){return shake}};
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
  ACC.me=r.data;window.LH_TOK=r.data&&r.data.tok||null;return {ok:true};
}

// ---------- saving to the server ----------
// At most one save every 10–14 s while playing (each player gets their own spacing), immediately on key moments
// (return home, death, sign out). Nothing is sent when nothing changed, so idle players cost nothing.
let held=false,cloudTimer=null,cloudBusy=false,cloudPending=null,offlineWarned=false,lastSent=null,lastAt=0,fails=0,stopped=false;
const SAVE_GAP=10000+Math.random()*4000;
const strip=S=>{const d=JSON.parse(JSON.stringify(S));delete d.name;delete d.look;delete d.wallet;delete d.savedAt;return d;};
function cloudSave(S,now){if(!online()||stopped)return;const d=strip(S),j=JSON.stringify(d);if(j===lastSent&&!cloudPending)return;cloudPending={d,j};
  if(now){clearTimeout(cloudTimer);cloudTimer=null;return flushCloud();}
  if(!cloudTimer)retry(Math.max(1000,lastAt+SAVE_GAP-Date.now()));}
function retry(ms){clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>{cloudTimer=null;flushCloud();},ms);}
async function flushCloud(){if(held||cloudBusy||!cloudPending||!online()||stopped)return;cloudBusy=true;const p=cloudPending;cloudPending=null;
  if(p.j===lastSent){cloudBusy=false;return;}
  // receipts for Wilderness loot you picked up (signed by the realtime server) go with the save, so a big haul passes the checks
  const rc=(window.LH_RCPT||[]).slice(0,40);
  const r=await api('save',{method:'POST',body:rc.length?{data:p.d,rev:ACC.rev,loot:rc}:{data:p.d,rev:ACC.rev},keepalive:true});cloudBusy=false;
  if(r.ok&&rc.length&&window.LH_RCPT)window.LH_RCPT=window.LH_RCPT.filter(t=>!rc.includes(t));
  const stop=(t,ms)=>{stopped=true;notice(t);setTimeout(()=>location.reload(),ms);};
  if(r.ok){ACC.rev=r.data.rev;if(r.data.tok&&window.LH_onTok)LH_onTok(r.data.tok);lastSent=p.j;lastAt=Date.now();fails=0;offlineWarned=false;}
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
// Claiming rewards is the one transaction Lanternhold ever asks a wallet for: claim() on the rewards vault, with a
// voucher from our server. It's checked here before the wallet sees it (that contract, that function, nothing else:
// never a token approval), and it goes from the wallet linked to the hero.
const CLAIM_SEL='0xfa6b3b53',MINT_SEL='0x7fb9a063';   // claim(...) on the rewards vault, mint(...) on the Founder's Lantern: both (uint256,uint256,uint8,bytes32,bytes32)
// Send a transaction the server prepared, after checking it goes to the contract we expect and calls the function we expect.
async function contractTx(v,to,sel,what){
  if(!to||!/^0x[0-9a-fA-F]{40}$/.test(v.to||'')||v.to.toLowerCase()!==String(to).toLowerCase())throw {message:'That isn’t the '+what+' contract.'};
  if(typeof v.data!=='string'||!v.data.startsWith(sel)||v.data.length!==10+64*5)throw {message:'That isn’t a '+what+' transaction.'};
  const pv=savedWalletProvider()||(allWallets()[0]||{}).provider;
  if(!pv)throw {message:'No wallet found. Open the game in your wallet app’s browser to do this.'};
  const accts=await pv.request({method:'eth_requestAccounts'}),from=(accts||[]).find(a=>String(a).toLowerCase()===String(v.wallet).toLowerCase());
  if(!from)throw {message:'Switch your wallet to '+short(v.wallet)+', the wallet linked to your hero.'};
  const want='0x'+Number(v.chainId).toString(16),cur=String(await pv.request({method:'eth_chainId'})).toLowerCase();
  if(cur!==want){try{await pv.request({method:'wallet_switchEthereumChain',params:[{chainId:want}]});}
    catch(e){if(e&&e.code===4001)throw e;if(want===RH.chainId)await pv.request({method:'wallet_addEthereumChain',params:[RH]});else throw e;}}
  return await pv.request({method:'eth_sendTransaction',params:[{from,to:v.to,data:v.data}]});}
const claimTx=(v,vault)=>contractTx(v,vault,CLAIM_SEL,'rewards vault');
const mintTx=(v,nft)=>contractTx(v,nft,MINT_SEL,'Founder’s Lantern');
// If the wallet already shared an account with this site, wallets like MetaMask hand that same account back even after
// you switch accounts. So we ask the wallet to show its account picker and use the account the player chooses.
// Which account: the one the wallet has selected (eth_requestAccounts lists it first). If this site is already
// connected there's no pop-up at all, so a returning player sees just one request: the free sign-in signature.
// To play as another account, switch accounts in the wallet (the game signs you out and you connect again).
async function pickAccount(pv){const accts=(await ask(pv,'eth_requestAccounts'))||[];
  // Only if the wallet has switched to an account that isn't connected to this site yet: ask it to connect that one
  // (otherwise the wallet would quietly hand back the old account). Normal sign-ins never see this extra pop-up.
  const sel=typeof pv.selectedAddress==='string'?pv.selectedAddress:'';
  if(/^0x[0-9a-fA-F]{40}$/.test(sel)&&!accts.some(a=>String(a).toLowerCase()===sel.toLowerCase())){
    try{await ask(pv,'wallet_requestPermissions',[{eth_accounts:{}}]);const now=(await ask(pv,'eth_accounts'))||[];const hit=now.find(a=>String(a).toLowerCase()===sel.toLowerCase());if(hit)return String(hit);}
    catch(e){if(e&&e.code===4001)throw e;}}
  return String(accts[0]||'');}
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
// At most two wallet pop-ups the first time (connect, then one free signature); after that, just the signature. The server writes the exact message
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
  if(!v.ok)throw {plain:v.data.error==='banned',message:v.data.error==='banned'?banMsg(v.data):v.data.msg||(v.data.error==='banned'?'This wallet is banned':v.data.error==='bad_signature'?'The signature didn’t match this wallet':'Sign-in was refused ('+(v.data.detail||v.data.error||v.status)+')')};
  return {me:v.data,addr};
}
async function connectWallet(w){
  ACC.err='';go('signing',{wname:w.info.name,stage:''});
  try{const r=await signWithWallet(w,'auth/verify',t=>{ACC.stage=t;render();});
    ACC.me=r.me;window.LH_TOK=r.me&&r.me.tok||null;setVia('wallet');rememberWallet(w);enter();}
  catch(e){const code=e&&e.code;ACC.err=code===4001?'You declined the request in your wallet. Try again when you’re ready.':e&&e.plain?esc(e.message):'Wallet error: '+esc((e&&e.message)||'unknown');go('welcome');}
}

// banned by an admin: when it ends, in the player's own time
const banMsg=b=>b.perm?'This account is permanently banned.':b.until&&!isNaN(Date.parse(b.until))?'This account is banned until '+new Date(b.until).toLocaleString([], {weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})+'.':'This account is banned.';
// ---------- flow ----------
const ACC={screen:'welcome',pid:null,err:'',stage:'',draft:null,edit:false,cfg:{}};
const newDraft=()=>({name:'',look:Object.assign({},DEFAULT_LOOK,{skin:(Math.random()*4)|0,hair:(Math.random()*6)|0,cloth:(Math.random()*8)|0})});
function enter(){
  const me=ACC.me;if(!me){go('welcome');return;}
  if(me.hero&&me.save){ACC.pid='h_'+me.hero.name.toLowerCase();finish(Object.assign({},me.save.data,{name:me.hero.name,look:me.hero.look,wallet:me.wallet}),false,me.save.rev);return;}
  ACC.draft=newDraft();go('creator');
}
function finish(data,isNew,rev){if(rev!==undefined)ACC.rev=rev;try{localStorage.setItem('lanternhold.lastHero',JSON.stringify({name:ACC.me.hero.name,wallet:ACC.me.wallet||null,google:!!ACC.me.google&&!ACC.me.wallet}));}catch(e){}lastAt=Date.now();ACC.pid='h_'+ACC.me.hero.name.toLowerCase();
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
    let last=null;try{last=JSON.parse(localStorage.getItem('lanternhold.lastHero')||'null');}catch(e){}
    const other=!ACC.edit&&last&&last.name&&ACC.me&&!(last.wallet&&ACC.me.wallet&&last.wallet===ACC.me.wallet);
    h=`${other?`<div class="warnbox"><b>Looking for ${esc(last.name)}?</b> ${last.wallet?`${esc(last.name)} is on wallet <b>${short(last.wallet)}</b>, but you’re signed in with ${ACC.me.wallet?'<b>'+short(ACC.me.wallet)+'</b>':'Google'}.`:`${esc(last.name)} was signed in with Google, not this wallet.`} Making a hero here starts a new one. To get back to ${esc(last.name)}, ${last.wallet?'switch to that wallet in your wallet app, then ':''}<button class="link inl" id="signout">sign out</button> and connect again.</div>`:''}<h2>${ACC.edit?'Change your look':'Create your hero'}</h2>
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
  // trading: save now, then hold further saves until the website has moved the items (it writes both saves itself)
  async tradeLock(){for(let i=0;i<20&&(cloudBusy||cloudPending);i++){await flushCloud();if(cloudBusy||cloudPending)await new Promise(r=>setTimeout(r,250));}held=true;return !cloudPending;},
  tradeUnlock(rev){held=false;if(Number.isInteger(rev)){ACC.rev=rev;lastSent=null;}retry(2500);},
  cloudSave,flush:flushCloud,get pid(){return ACC.pid;},online,api,claimTx,mintTx};

// ---------- start ----------
render();
{const q=new URLSearchParams(location.search),x=q.get('x'),g=q.get('g');
  if(x){const u=(q.get('u')||'').replace(/[^A-Za-z0-9_]/g,'').slice(0,15);
    const msg={linked:`X account @${u} is now linked to your hero.`,taken:`@${u} is already linked to another hero.`,declined:'You didn’t approve the link on X, so nothing changed.',expired:'That link request expired. Try again from your bag’s Hero tab.',off:'X linking isn’t switched on yet.',error:'Couldn’t link your X account. Try again in a moment.'}[x];
    if(msg){ACC.note=msg;ACC.noteOk=x==='linked';}}
  if(g){const msg={linked:'Google is now linked. You can sign in with it as well as your wallet.',taken:'That Google account already has its own hero.',has:'This account already has a Google account linked.',declined:'Google sign-in was cancelled.',expired:'That sign-in took too long. Try again.',off:'Google sign-in isn’t switched on yet.',banned:banMsg({until:q.get('until')}),signin:'Sign in first, then link Google from your bag’s Hero tab.',error:'Google sign-in didn’t work. Try again in a moment.'}[g];
    if(msg){ACC.note=msg;ACC.noteOk=g==='linked';}}
  if(x||g)history.replaceState(null,'',location.pathname);}
try{const n=sessionStorage.getItem('lanternhold.notice');if(n){sessionStorage.removeItem('lanternhold.notice');ACC.err=esc(n);}}catch(e){}
api('config').then(r=>{if(r.ok){ACC.cfg=r.data;window.LH_TOKEN=r.data.token?Object.freeze({ca:String(r.data.token.ca),symbol:r.data.token.symbol?String(r.data.token.symbol):null}):null;const m=r.data.main;let last=0;try{last=+sessionStorage.getItem('lanternhold.hop')||0;}catch(e){}
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
