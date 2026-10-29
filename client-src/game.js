// ===== Lanternhold: game =====
(function(){
const $=id=>document.getElementById(id);
buildArt();
const cv=$('cv'),g=cv.getContext('2d');
{const u=c=>c.toDataURL();{const p=new Px(16,16);p.ell(8,8,5.5,5.5,PAL.silver);for(const [x,y] of [[7,1],[7,13],[1,7],[13,7],[3,3],[11,3],[3,11],[11,11]])p.rect(x,y,2,2,PAL.silver);p.ell(8,8,2.2,2.2,PAL.ink);p.set(6,5,PAL.white).set(5,6,PAL.white);p.outline();$('setIc').src=u(p.canvas());}$('setB').onclick=()=>{if(started)openSettings();};{const p=new Px(16,16);p.rect(3,2,10,12,'#c2a26b');p.rect(4,3,8,10,'#f4e4c1');for(const y of [5,7,9,11])p.rect(5,y,6,1,'#8a6f30');p.rect(2,1,12,2,'#8a6f30');p.rect(2,13,12,2,'#8a6f30');p.set(12,4,PAL.gold).set(11,3,PAL.gold);p.outline();$('icSkill').src=u(p.canvas());}$('icBag').src=u(ART.chest[0]);$('mapIc').src=u(ART.globe);$('icRet').src=u(ART.torch[0]);
}
const reduceMotion=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand=Math.random,ri=(a,b)=>a+Math.floor(rand()*(b-a+1));
const fmt=n=>Math.floor(n).toLocaleString('en-US');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

// ---------- save ----------
const DEF={name:'',look:null,wallet:null,gold:40,bank:{wheat_seed:20,oil:3,bread:3},lvl:1,xp:0,gear:{blade:'rusty',mail:'none',lantern:'basic',cape:null,helm:null,ring:null,amulet:null},skills:{farming:0,fishing:0,cooking:0},caught:0,flags:{},guide:0,vault:{},bankBuys:0,quick:['oil','bread','pondfin','stew',null],lift:1,deepest:0,plots:Array(12).fill(null),plotBuys:0,kills:0,deaths:0,bosses:{},goals:{},cnt:{},runes:{},ench:{},spell:'spark',forged:{},quests:{},cos:{own:[],head:null,weapon:null}};
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
  const G=obj(o.gear);s.gear={blade:GEAR.blade[G.blade]?G.blade:'rusty',mail:GEAR.mail[G.mail]?G.mail:'none',lantern:LANTERNS[G.lantern]?G.lantern:'basic',cape:CAPES[G.cape]?G.cape:null,helm:GEAR.helm[G.helm]?G.helm:null,ring:JEWELS[G.ring]&&JEWELS[G.ring].slot==='ring'?G.ring:null,amulet:JEWELS[G.amulet]&&JEWELS[G.amulet].slot==='amulet'?G.amulet:null};
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
   if(!legacy)for(const [k,before] of SKILL_ERAS)if(K[k]===undefined)s.cbFloor=Math.max(s.cbFloor,combatFrom(s.flv,s.skills,before));   // a new skill joined the formula: nobody drops a level
   s.lvl=Math.max(s.cbFloor,combatFrom(s.flv,s.skills));}
  s.skull=int(o.skull,0,9e15,0);   // the Wilderness skull: until when (it follows you to other worlds)
  {const q=obj(o.pos);let x=Math.round(+q.x),y=Math.round(+q.y);if(Number.isFinite(x)&&Number.isFinite(y)&&x>0&&y>0&&x<20000&&y<20000){
    if(q.v!==3){const x2=q.v===2?x:x+WEST_X_V2;if(x2<WEST_X_V2&&y>=WILD_Y){x=HM_ENTRY.x;y=HM_ENTRY.y;}else x=x2+(WEST_X-WEST_X_V2);}s.pos={x,y,v:3};}else s.pos=null;}   // where you logged out (v3: Hollowmere grew in v0.13)   // where you logged out (v2: the map grew west in v0.12)
  // the rune bag, enchantments on worn jewelry, the attack spell you've chosen
  s.runes={};for(const [k,v] of Object.entries(obj(o.runes)))if(ITEMS[k]&&ITEMS[k].rune){const n=int(v,0,1e7,0);if(n>0)s.runes[k]=n;}
  s.ench={};for(const sl of ['ring','amulet']){const e=obj(obj(o.ench)[sl]);if(e.id&&e.id===s.gear[sl]&&ENCHANTS[e.s]){const a={};for(const [k,v] of Object.entries(obj(e.a)).slice(0,3))if(ENCH_ATTR[k]){const n=num(v,0,enchMax(k),0);if(n>0)a[k]=Math.round(n*100)/100;}if(Object.keys(a).length)s.ench[sl]={id:e.id,s:e.s,a};}}
  {const own=k=>(s.bank[k]||0)+(s.vault[k]||0)>0||['blade','mail','helm','ring','amulet'].some(sl=>wornId(s.gear,sl)===k);s.forged={};for(const [k,v] of Object.entries(obj(o.forged)))if(forgeable(k)&&own(k)){const n=int(v,0,FORGE_MAX,0);if(n>0)s.forged[k]=n;}}   // relic-forging: kept while you own the piece
  s.quests={};for(const [k,Q] of Object.entries(QUESTS)){const q=obj(obj(o.quests)[k]);const st=int(q.s,0,Q.steps.length,0);if(st)s.quests[k]={s:st,n:int(q.n,0,999,0),done:!!q.done&&st>=Q.steps.length};}
  {const c=obj(o.cos),raw=(Array.isArray(c.own)?c.own:[]).flatMap(k=>COS_OLD[k]||[k]);   // v0.13.0's Reaper's Shroud became the Jack-o'-Lantern and the Scythe
    for(const [k,Q] of Object.entries(QUESTS))if((s.quests[k]||{}).done)raw.push(...Q.rewards);   // a finished quest always gives all its rewards
    const own=[...new Set(raw.filter(k=>COSMETICS[k]&&(!COSMETICS[k].quest||(s.quests[COSMETICS[k].quest]||{}).done)))];s.cos={own,head:null,weapon:null};
    if(c.body&&COS_OLD[c.body]){c.head=c.head||COS_OLD[c.body][0];c.weapon=c.weapon||COS_OLD[c.body][1];}   // wearing the shroud: wear both
    for(const sl of COS_SLOTS)if(own.includes(c[sl])&&COSMETICS[c[sl]].slot===sl)s.cos[sl]=c[sl];}   // quests and the cosmetics they reward
  s.spell=SPELLS[o.spell]?o.spell:'spark';
  return s;}
let S=normalize({}),PID=null;
function save(now){if(!PID)return;S.savedAt=Date.now();S.pack=scene==='delve'&&run&&run.pack?Object.assign({},run.pack):{};if(S.forged)for(const k of Object.keys(S.forged))if(!ownsItem(k))delete S.forged[k];try{localStorage.setItem('lanternhold.p.'+PID,JSON.stringify(S));}catch(e){}if(window.ACC)ACC.cloudSave(S,now);}
// Bag = what you carry (goes into the Depths, half lost if you fall). Vault = the Bank (always safe, limited slots).
const atHold=()=>scene==='hold';
const avail=id=>(S.bank[id]||0)+(atHold()?(S.vault[id]||0):0);
const allKeys=()=>[...new Set([...Object.keys(S.bank),...(atHold()?Object.keys(S.vault):[])])].filter(id=>ITEMS[id]);
const has=(id,n)=>avail(id)>=(n||1);
const give=(bag,id,n)=>{bag[id]=(bag[id]||0)+n;};
const take=(id,n)=>{const k=Math.min(n,S.bank[id]||0);if(k){S.bank[id]-=k;if(S.bank[id]<=0)delete S.bank[id];}n-=k;if(n>0&&atHold()&&S.vault[id]){S.vault[id]-=n;if(S.vault[id]<=0)delete S.vault[id];}};
// the item worn in a gear slot (null for none), and its relic-forge level
const wornId=(g,sl)=>{const t=g[sl];return !t?null:sl==='ring'||sl==='amulet'?t:sl==='blade'?(t==='rusty'?'rusty_blade':GEAR_ITEM['blade:'+t]||null):sl==='mail'?(t==='none'?'traveler_garb':GEAR_ITEM['mail:'+t]||null):sl==='helm'?GEAR_ITEM['helm:'+t]||null:null;};
const fLv=sl=>{const id=wornId(S.gear,sl);return id&&S.forged&&S.forged[id]||0;};
const ownsItem=id=>(S.bank[id]||0)+(S.vault[id]||0)>0||['blade','mail','helm','ring','amulet'].some(sl=>wornId(S.gear,sl)===id);
const capeA=()=>S.gear.cape&&CAPES[S.gear.cape]?CAPES[S.gear.cape].attr:{};const jewA=k=>(((JEWELS[S.gear.ring]||{}).attr||{})[k]||0)*(1+FORGE_FX.jewel*fLv('ring')/100)+(((JEWELS[S.gear.amulet]||{}).attr||{})[k]||0)*(1+FORGE_FX.jewel*fLv('amulet')/100);
// an enchantment counts only while the piece it was cast on is the one you're wearing
const enchA=k=>['ring','amulet'].reduce((a,sl)=>{const e=S.ench&&S.ench[sl];return a+(e&&e.id===S.gear[sl]&&e.a[k]||0);},0);
const A=k=>(capeA()[k]||0)+((HELM_ATTR[S.gear.helm]||{})[k]||0)+jewA(k)+enchA(k);
let ADMIN=false,HAT='partyhat';
const LAN=()=>LANTERNS[S.gear.lantern]||LANTERNS.basic;
const maxHp=()=>Math.round(60+8*(S.lvl-1)+A('hp'));
// Only in the Wilderness does your health follow the Wilderness rules (the same for everyone: level and cape, nothing else).
// Everywhere else (the Hold, Hollowmere, the Depths) it's your full health. v0.13.2: the Hold used the Wilderness rules
// too, so walking between the Hold and Hollowmere (with no visible border since v0.13) cut your health back.
const pvpMaxHp=()=>60+8*(S.lvl-1)+((((CAPES[S.gear.cape]||{}).attr)||{}).hp||0);
const hpMax=()=>inWild()?pvpMaxHp():maxHp();
const inWild=()=>scene==='hold'&&P.y<WILD_Y;
const inWest=()=>scene==='hold'&&inHollowmere(P.x,P.y);   // Hollowmere: monsters, no PvP, your full bonuses count
const staffOn=()=>isStaff(S.gear.blade);
// spell damage: the spell's max hit, plus the staff's and the robe's bonus (and enchantments and capes with +spell damage)
const spellMax=sp=>Math.round((SPELLS[sp]||SPELLS.spark).max*(1+((GEAR.blade[S.gear.blade]||{}).mag||0)/100+((GEAR.mail[S.gear.mail]||{}).mag||0)/100+A('mag')/100+(staffOn()?FORGE_FX.staff*fLv('blade')/100:0)+((GEAR.mail[S.gear.mail]||{}).robe?FORGE_FX.robe*fLv('mail')/100:0)));
const runeN=k=>(S.runes&&S.runes[k+'_rune'])||0;
// runes always go into the rune bag (never the bag or the bank), wherever they come from
const giveAny=(bag,id,n)=>{if(ITEMS[id]&&ITEMS[id].rune){S.runes[id]=(S.runes[id]||0)+n;return;}give(bag,id,n);};
const xpNeed=l=>Math.round(22*Math.pow(l,1.5));
const dmgOf=()=>GEAR.blade[S.gear.blade].dmg*(1+A('dmg')/100)*(staffOn()?1:1+FORGE_FX.blade*fLv('blade')/100);
const defOf=()=>Math.round((GEAR.mail[S.gear.mail].def+(S.gear.helm?GEAR.helm[S.gear.helm].def:0)+A('def')+FORGE_FX.def*(fLv('mail')+fLv('helm')))*10)/10;
const myLook=()=>Object.assign({},S.look,{armor:S.gear.mail==='none'?null:S.gear.mail,cape:S.gear.cape,helm:S.gear.helm,flame:flameOn()?'founder':null,cw:S.cos&&S.cos.weapon?COSMETICS[S.cos.weapon].look:null,ch:S.cos&&S.cos.head?COSMETICS[S.cos.head].look:null});
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
// The layout guard: on any screen, the on-screen controls must never cover each other. After every resize it checks the
// buttons against each other and steps the controls down a size (.tight, then .tighter) until nothing overlaps.
const UI_GROUPS=[['#side button'],['#mini button','#bRet'],['#quick .qs','#bA'],['#pad'],['#chatB'],['#vit']];
function uiGuard(){const R=document.documentElement;R.classList.remove('tight','tighter');
  const vis=e=>{if(!e||e.hidden)return null;const st=getComputedStyle(e);if(st.display==='none'||st.visibility==='hidden')return null;const r=e.getBoundingClientRect();return r.width?r:null;};
  const hit=()=>{const G=UI_GROUPS.map(sel=>sel.flatMap(q=>[...document.querySelectorAll(q)]).map(vis).filter(Boolean));
    for(let i=0;i<G.length;i++)for(let j=i+1;j<G.length;j++)for(const a of G[i])for(const b of G[j])if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1)return true;return false;};
  if(!hit())return;R.classList.add('tight');if(!hit())return;R.classList.add('tighter');}
const light=document.createElement('canvas'),lg=light.getContext('2d');
let fitT=0;const refit=()=>{clearTimeout(fitT);fitT=setTimeout(()=>{fit();updateHud(true);requestAnimationFrame(uiGuard);},60);};
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
  obelisk:[-10,-50,20,52,'The Old Obelisk'],skullpost:[-6,-26,12,26,'Wilderness Warning'],
  maw:[-66,-124,132,124,'The Abyssal Maw'],bankchest:[-12,-18,24,19,'Bank Chest'],campfire:[-7,-13,14,14,'Campfire'],menhir:[-6,-30,12,30,'Standing Stone'],lpost:[-5,-28,10,28,'Lamp Post'],pumpkin:[-7,-14,14,14,'Jack-o’-Lantern'],barrow:[0,-18,32,18,'Barrow'],
  hmsign:[-8,-22,16,22,'Hollowmere'],willow:[-13,-38,26,38,'Willow'],mcrystal:[-6,-20,12,20,'Moon Crystal']};
function hoverTarget(wx,wy){let best=null;const hit=(x,y,w,h)=>wx>=x&&wx<x+w&&wy>=y&&wy<y+h;
  for(const o of map.objs){if(o.gone)continue;let b=null,name=null;
    if(o.type==='ore'){const x=o.tile[0]*T,y=o.tile[1]*T;if(hit(x,y,T,T))b=[x,y,T,T],name=(ITEMS[o.kind+'_ore']||{}).n||'Ore';}
    else{const H=HOVER_BOX[o.type];if(!H||(o.type==='chest'&&o.open))continue;if(o.type==='tree'&&o.chop&&!treeUp(o))continue;
      if(hit(o.x+H[0],o.y+H[1],H[2],H[3]))b=[o.x+H[0],o.y+H[1],H[2],H[3]],name=(o.type==='tree'||o.type==='willow')&&TREES[o.kind]?TREES[o.kind].n:o.type==='sign'&&o.wild?'Wilderness Warning':o.type==='chest'&&o.tier==='u'?'Uncommon Chest':H[4];}
    if(b&&(!best||o.y>best.z))best={x:b[0]+b[2]/2,y:b[1]-3,name,z:o.y};}
  if(best)return best;
  const tx=Math.floor(wx/T),ty=Math.floor(wy/T),t=tAt(map,tx,ty);
  if(scene==='hold'){
    if(map.plots&&map.plots.some(p=>p.tx===tx&&p.ty===ty))return {x:tx*T+8,y:ty*T-2,name:'Farm'};
    if(t===DOCK)return {x:tx*T+8,y:ty*T-2,name:'Dock'};if(t===WATER)return {x:tx*T+8,y:ty*T-2,name:'Lake'};if(t===MOON)return {x:tx*T+8,y:ty*T-2,name:'The Moonmere'};if(t===GLOOM)return {x:tx*T+8,y:ty*T-2,name:'Gloom Pond'};}
  if(scene==='delve'&&map.stairs&&!map.stairs.hidden&&tx===map.stairs.tx&&ty===map.stairs.ty)return {x:tx*T+8,y:ty*T-2,name:'Stairs down'};
  return null;}
function hoverTag(){if(!HOVER_OK||!HOV.on||!started||!$('sheet').hidden||!$('acct').hidden){if(cv.style.cursor)cv.style.cursor='';return;}
  const r=cv.getBoundingClientRect();if(!r.width)return;const wx=camX+(HOV.x-r.left)*VW/r.width,wy=camY+(HOV.y-r.top)*VH/r.height;
  const h=hoverTarget(wx,wy);cv.style.cursor=h?'pointer':'';if(h)TAGS.push({x:h.x,y:h.y,name:h.name,npc:true,hov:true});}
// Mouse: left-click on the game attacks / acts, same as Space. In the Depths the hero turns toward the click first.
let camX=0,camY=0;
cv.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||!started||!$('sheet').hidden||!$('acct').hidden)return;
  e.preventDefault();const a=document.activeElement;if(a&&a.id==='chatIn')a.blur();
  if(scene==='delve'||inWild()||inWest()){const r=cv.getBoundingClientRect(),wx=camX+(e.clientX-r.left)*VW/r.width,wy=camY+(e.clientY-r.top)*VH/r.height,dx=wx-P.x,dy=wy-(P.y-6);
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
function enterHold(at){FISHING=null;CHOP=null;COOK=null;scene='hold';map=HOLD;ents=[];drops=[];fx=[];slashes=[];BOLTS=[];SPFX=[];for(const d of HOLD.dens||[])d.e=null;P.x=at?at.x:HOLD.spawn.x;P.y=at?at.y:HOLD.spawn.y+8;P.dir='down';P.chan=0;run=null;P.hp=hpMax();
  updateHud();MP.toHold();}
// where you are, kept in your save so you sign back in on the same spot (in the Depths: the entrance you went in by)
function notePos(){if(started&&scene==='hold'&&P.hp>0)S.pos={x:Math.round(P.x),y:Math.round(P.y),v:3};}
function placeAt(q){if(!q||!(q.x>0&&q.y>0&&q.x<map.w*T&&q.y<map.h*T)||blocked(q.x,q.y,4))return false;if(q.y<WILD_Y&&!S.flags.wildok)return false;P.x=q.x;P.y=q.y;return true;}
function startDelve(from,seed,door){door=door||'gate';const d=HOLD.doors[door];if(d){S.pos={x:d.x,y:d.y,v:3};save();}
  run={seed:seed!=null?seed:(rand()*1e9)|0,floor:from,pack:{},oil:100,kills:0,start:from,shadeT:0,door};enterFloor(from);closeSheet();toast('Floor '+from+' · '+BIOMES[packOf(from).id].name);}
function enterFloor(f){
  run.floor=f;map=buildFloor(f,run.seed);bakeGround(map);scene='delve';
  const sc=1+.12*(f-1);
  ents=map.spawns.map((s,i)=>Object.assign(makeEnemy(s.type,s.x,s.y,sc),{id:i+1}));MP.nextEid=ents.length+1;if(MP.client())ents=[];drops=[];fx=[];slashes=[];BOLTS=[];SPFX=[];P.x=map.spawn.x;P.y=map.spawn.y;P.chan=0;
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
  // Hollowmere: when a monster is coming for you, the button fights (no chopping or fishing with a wolf at your back)
  const foe=inWest()&&ents.some(e=>e.west&&!e.dead&&e.aggro&&Math.hypot(e.x-P.x,e.y-P.y)<90);
  for(const o of map.objs){if(!o.act||o.gone)continue;const d=Math.hypot(o.act.x-P.x,o.act.y-P.y);if(d<bd){bd=d;best={o,label:o.act.label,id:o.act.id};}}
  if(scene==='hold'){for(const p of map.plots){const d=Math.hypot(p.cx-P.x,p.cy+6-P.y);if(d<bd){bd=d;const st=S.plots[p.i],ready=st&&growth(st)>=1;best={plot:p,label:readyPlots().length?'Harvest':'Farm',id:'plot'};}}}
  if(scene==='hold'){if(FISHING&&!foe)return {label:FISHING.phase==='bite'?'Hook!':'Fishing',id:'hook'};if(!best){const sp=fishSpot();if(sp)best={label:'Fish',id:'fish',sp};}}
  if(scene==='hold'&&COOK)return {label:'Stop',id:'cookstop'};
  if(foe&&best&&(best.id==='fish'||best.id==='plot'))best=null;
  if(scene==='hold'){if(CHOP&&!(inWild()&&pvpTarget())&&!foe)return {label:'Chopping',id:'noop'};if(!best&&!foe){const o=nearTree();if(o)best={label:treeUp(o)?'Chop':'Stump',id:'chop',o};}}
  if(inWild()&&!FISHING&&!COOK){const o=pvpTarget();if(o)best={label:'Attack',id:'pvp',o};}
  {const d=nearBagDrop();if(d)best={label:'Pick up',id:'pickup',d};}
  if(scene==='delve'&&map.stairs&&!map.stairs.hidden){const sx=map.stairs.tx*T+8,sy=map.stairs.ty*T+10,d=Math.hypot(sx-P.x,sy-P.y);if(d<14)best={label:'Descend',id:'stairs'};}
  return best;
}
function doAct(a){
  if(a.id==='gate')return openGate();if(a.id==='house')return openHero();if(a.id==='bank')return openBank();if(a.id==='forge')return openCraft('forge');if(a.id==='bench')return openCraft('jewel');
  if(a.id==='kitchen')return openKitchen();if(a.id==='press')return openCraft('press');if(a.id==='market')return qStep('hallow')==='gourd'?openQuestTalk('tallow'):openMarket('shop',true);if(a.id==='wick')return qStep('hallow')==='light'?openQuestTalk('wick'):openWick();if(a.id==='reaper')return openReaper();if(a.id==='bulletin')return openBulletin();if(a.id==='eastsign')return openEastSign();if(a.id==='raid')return openRaid();if(a.id==='hmsign')return openHmSign();
  if(a.id==='pickup')return claimDrop(a.d);if(a.id==='pvp')return pvpSwing(a.o);if(a.id==='wildsign')return openWildSign();if(a.id==='chop')return startChop(a.o);if(a.id==='cookstop')return stopCook('stopped');if(a.id==='noop')return;
  if(a.id==='plot')return openFarm();if(a.id==='fish')return startFishing(a.sp);if(a.id==='hook')return hookFish();
  if(a.id==='chest'||a.id==='glowcap'){const o=a.o,i=map.objs.indexOf(o);if(MP.client()){if(!o.req){o.req=1;NET.send({t:'act',o:i});setTimeout(()=>o.req=0,1500);}return;}objTaken(o,MP.me());MP.objOut(i,o,MP.me());return;}
  if(a.id==='stairs'&&MP.client())return MP.askDown();
  if(a.id==='stairs'){const next=run.floor+1,pk=packOf(next);
    if(!pk||pk.locked){openSheet(`<h2>The way is sealed</h2><p class="lead">Below floor ${run.floor} lies ${pk?pk.name:'something older'}. ${pk?'It opens in Season '+pk.season+'.':'Deeper floors are coming.'}</p><p class="lead">Light the Return Flame to bring your haul home.</p><div class="row"><button class="btn" id="sx">Keep exploring</button></div>`);$('sx').onclick=closeSheet;return;}
    sfx('stairs');enterFloor(next);MP.floorOut(next);toast('Floor '+next+(packOf(next).id!==map.pack.id?' · '+BIOMES[packOf(next).id].name:''));}
}

// ---------- combat ----------
const oreAhead=()=>{if(scene!=='delve'||!map)return false;const b=hitBox();return map.objs.some(o=>o.type==='ore'&&!o.gone&&o.tile[0]*T+T>b.x&&o.tile[0]*T<b.x+b.w&&o.tile[1]*T+T>b.y&&o.tile[1]*T<b.y+b.h);};
function swing(){if(P.swingCD>0)return;if(inWest()){CHOP=null;FISHING=null;}if(staffOn()&&!oreAhead())return cast();P.swing=.2;P.swingCD=.32;P.hitDone=false;sfx('swing');}
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
  for(const e of ents){if(e.dead||e.d.proj)continue;const r=e.r;if(e.x+r>b.x&&e.x-r<b.x+b.w&&e.y>b.y&&e.y-r*2<b.y+b.h){
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
  else if(inWest()&&roomUp())NET.send({t:'sw',d:P.dir,h:[],o:-1});   // in Hollowmere, everyone nearby sees you swing
}
// another party member swung: show their blade, the damage they did and the ore they chipped
function peerSwing(m){const o=OTH.get(m.id);if(!o||!(scene==='delve'||scene==='hold'&&(o.y<WILD_Y||o.x<WEST_X)))return;o.dir=m.d||o.dir;
  if(m.c&&SPELLS[m.c]){o.castT=.42;o.castSp=m.c;setTimeout(()=>{const tip=staffTip(o.x,o.y,o.dir);launchBolt(m.c,tip,typeof m.a==='number'?m.a:0,null,false,o.id);},130);return;}
  o.swT=.2;   // a plain swing: a blade, or a staff used as a club (Wilderness) or a pick (ore)
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
  if(e.d.proj)return;
  if(hit.includes(me)){if(run)run.kills++;S.kills++;killXp(xp);if(e.west){bump('hmkills');questKill(e);}if(e.d.boss)bump('bossxp');}else if(MP.shared()){killXp(xp);if(e.d.boss)bump('bossxp');}puff(e.x,e.y-6,e.d.boss?'#ffcd75':'#a7f070',e.d.boss?30:9);
  const roll=hit.includes(me)||(!hit.length&&mine);MP.lastRoll=roll;
  if(roll&&e.d.relic&&scene==='delve'&&rand()<RELIC_CHANCE*(1+A('luck')/200)){e.relicDrop=true;spawnLoot(e.x,e.y-4,[[e.d.relic,1,1,1]],true);setTimeout(()=>{sfx('rare');buzz([60,40,60,40,120]);toast('A relic! The '+ITEMS[e.d.relic].n+' fell from the boss','rare r-legendary');},700);}
  if(roll){spawnLoot(e.x,e.y-4,e.d.drops,true);if(e.type!=='shade'&&e.type!=='gelling')dropGear(e.x,e.y-4,e.d.boss?'boss':'enemy',e.d.boss?e.type:null,true);
    const area=scene==='delve'&&run?packOf(run.floor).id:'mere';spawnLoot(e.x,e.y-4,(RUNE_DROPS[area]||[]).concat(e.d.boss?RUNE_DROPS.boss:[]).map(([k,c,a,b])=>[k+'_rune',c,a,b]),true);}
  if(e.d.boss&&scene==='delve'){if(hit.includes(me)){MP.feed('boss',map.pack.bossName);bump('boss'+e.type);}sfx('boss');buzz([60,40,60]);map.stairs.hidden=false;bakeGround(map);S.bosses[e.type]=true;if(LIFTS.includes(run.floor+1)&&run.floor+1>S.lift)S.lift=run.floor+1;save();
    ents.forEach(o=>{if(!o.d.boss&&!o.dead){o.dead=true;puff(o.x,o.y-6,'#a7f070',6);}});
    setTimeout(()=>openSheet(`<h2>${map.pack.bossName} falls</h2><p class="lead">The stairs are open.${S.lift>run.floor?' The lift at the Gate now reaches floor '+S.lift+'.':''}</p>${e.relicDrop?'<p class="lead" style="color:#ffcd75">It dropped its relic, the '+ITEMS[e.d.relic].n+'! Relics are rare: spend them at the Forge to empower your gear.</p>':''}${packOf(run.floor+1)?'':'<p class="lead">This is as deep as the Depths go for now.</p>'}<div class="row"><button class="btn" id="sx">Onward</button></div>`,()=>{}),300);
    setTimeout(()=>{const b=$('sx');if(b)b.onclick=closeSheet;},320);}}
// Monster XP trains Fighting. Combat level comes from Fighting plus every other skill, so it's checked after any XP.
function gainXp(n){S.xp+=n;setTimeout(()=>xpShow('combat'),0);while(S.flv<FIGHT_MAX&&S.xp>=xpNeed(S.flv)){S.xp-=xpNeed(S.flv);S.flv++;toast('Fighting level '+S.flv+'!','good');if(S.flv%10===0||S.flv===FIGHT_MAX)MP.feed('skill','Fighting '+S.flv);sfx('level');buzz(60);puff(P.x,P.y-8,'#ef7d57',12);}if(S.flv>=FIGHT_MAX)S.xp=0;combatCheck();}
const cbPts=()=>2*Math.max(Math.min(FIGHT_MAX,S.flv),lvlOf('magic'))+Object.keys(SKILLS).reduce((a,k)=>a+lvlOf(k),0),cbDiv=()=>2+Object.keys(SKILLS).length;
function combatCheck(){const c=Math.max(S.cbFloor||1,combatFrom(S.flv,S.skills));if(c===S.lvl)return;const up=c>S.lvl;S.lvl=c;if(!up)return;
  P.hp=Math.min(hpMax(),P.hp+8);setTimeout(()=>{toast('Combat level '+S.lvl+'! Max HP '+hpMax(),'good');sfx('level');puff(P.x,P.y-8,'#ffcd75',16);floatText(P.x,P.y-40,'Combat '+S.lvl+'!','#ffcd75');},900);if(S.lvl%5===0)MP.feed('level',String(S.lvl));}
function hurtPlayer(dmg,src){if(P.inv>0||ADMIN&&S.flags.god||P.hp<=0)return;P.hitT=time;const d=Math.max(1,Math.round(dmg)-defOf());P.hp-=d;P.inv=.7;P.chan=0;sfx('hurt');buzz(40);floatText(P.x,P.y-20,'-'+d,'#ff6b6b');
  shake=!SET.shake?0:3;if(src){const a=Math.atan2(P.y-src.y,P.x-src.x);for(let i=0;i<6;i++)moveBody(P,Math.cos(a)*1.5,Math.sin(a)*1.5,4);}
  if(P.hp<=0)die();}
let shake=0;
// ---------- Magic: casting with a staff ----------
// Your attack casts your chosen spell. A bolt flies from the staff's tip toward the nearest monster you're facing (or
// straight ahead); Starfall and Cataclysm fall from the sky onto the target instead. Each spell looks and hits differently.
let BOLTS=[],SPFX=[];
const bestSpell=()=>{let b='spark';for(const [k,s] of Object.entries(SPELLS))if(lvlOf('magic')>=s.lvl)b=k;return b;};
const curSpell=()=>SPELLS[S.spell]&&lvlOf('magic')>=SPELLS[S.spell].lvl?S.spell:bestSpell();
const SKY=new Set(['starfall','cataclysm']);
// where the staff's tip is while casting (the staff is raised on the side you face)
function staffTip(x,y,dir){return {x:x+(dir==='left'?-7:dir==='right'?7:dir==='up'?5:-6),y:y-(dir==='up'?21:19)};}
function cast(){if(P.swingCD>0)return;const sp=curSpell(),D=SPELLS[sp];P.swingCD=.55;P.cast=.42;P.castSp=sp;FISHING=null;CHOP=null;
  const f={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[P.dir],tip=staffTip(P.x,P.y,P.dir);
  let tgt=null,bd=170;for(const e of ents){if(e.dead||e.d.proj)continue;const dx=e.x-P.x,dy=e.y-P.y,d=Math.hypot(dx,dy);if(d<bd&&(dx*f[0]+dy*f[1])>d*.3){bd=d;tgt=e;}}
  const a=tgt?Math.atan2((tgt.y-(tgt.d.big?12:6))-tip.y,tgt.x-tip.x):Math.atan2(f[1],f[0]);
  P.castA=a;P.castTip=tip;P.castLaunch=.13;P.castTgt=tgt;sfx('cast');
  if(MP.shared()||inWest()&&roomUp())NET.send({t:'sw',d:P.dir,h:[],o:-1,c:sp,a:Math.round(a*100)/100});}   // the party (or anyone in Hollowmere) sees the cast
function launchBolt(sp,tip,a,tgt,mine,who){const D=SPELLS[sp];
  if(SKY.has(sp)){const tx=tgt?tgt.x:tip.x+Math.cos(a)*80,ty=tgt?tgt.y-4:tip.y+19+Math.sin(a)*80;BOLTS.push({sp,sky:true,x:tx-26,y:ty-120,sx:tx-26,sy:ty-120,tx,ty,t:0,life:.42,mine,who,hit:new Set()});}
  else BOLTS.push({sp,x:tip.x,y:tip.y,a,v:D.spd,t:0,life:1.05,mine,who,pierce:D.pierce||1,hit:new Set(),tr:[]});
  spellSfx(sp);for(let i=0;i<(reduceMotion?3:10);i++){const b=a+(rand()-.5)*1.6,s=30+rand()*50;fx.push({x:tip.x,y:tip.y,vx:Math.cos(b)*s,vy:Math.sin(b)*s-10,t:0,life:.25+rand()*.2,col:i%2?D.col:D.col2});}}
function spellSfx(sp){const n={spark:[880,1320],ember:[300,600],frost:[1200,1800],storm:[150,2200],burst:[220,440],lance:[180,90],starfall:[1500,700],cataclysm:[120,60]}[sp]||[600,900];
  tone(n[0],.14,sp==='frost'||sp==='spark'||sp==='starfall'?'triangle':sp==='storm'?'sawtooth':'square',.035,n[1]/n[0]);if(sp==='storm')tone(90,.12,'sawtooth',.03,.5,.02);if(sp==='cataclysm'||sp==='burst')tone(70,.3,'sawtooth',.04,.5,.08);}
function updateBolts(dt){if(!BOLTS.length)return;
  for(const b of BOLTS){if(b.done)continue;b.t+=dt;const D=SPELLS[b.sp];
    if(b.sky){const k=Math.min(1,b.t/b.life),e2=k*k;b.x=b.sx+(b.tx-b.sx)*e2;b.y=b.sy+(b.ty-b.sy)*e2;
      if(!reduceMotion&&rand()<.9)fx.push({x:b.x+(rand()-.5)*3,y:b.y+(rand()-.5)*3,vx:(rand()-.5)*14,vy:-8-rand()*14,t:0,life:.3+rand()*.25,col:rand()<.5?D.col:D.col2});
      if(k>=1){b.done=true;spellImpact(b,b.tx,b.ty,null);}continue;}
    const ox=b.x,oy=b.y;b.x+=Math.cos(b.a)*b.v*dt;b.y+=Math.sin(b.a)*b.v*dt;b.tr.push([b.x,b.y]);if(b.tr.length>(b.sp==='storm'?7:b.sp==='lance'?6:5))b.tr.shift();
    if(!reduceMotion){const n=b.sp==='ember'||b.sp==='burst'?2:1;for(let i=0;i<n;i++)if(rand()<.8)fx.push({x:ox+(rand()-.5)*3,y:oy+(rand()-.5)*3,vx:(rand()-.5)*16,vy:(b.sp==='ember'||b.sp==='burst'?-18:-4)-rand()*10,t:0,life:.18+rand()*.22,col:rand()<.6?D.col:D.col2});}
    if(solidAt(map,Math.floor(b.x/T),Math.floor((b.y+6)/T))){b.done=true;spellImpact(b,ox,oy,null);continue;}
    if(b.t>=b.life){b.done=true;if(D.aoe)spellImpact(b,b.x,b.y,null);else SPFX.push({k:'fizzle',x:b.x,y:b.y,t:0,life:.25,c:D.col});continue;}
    for(const e of ents){if(e.dead||e.d.proj||b.hit.has(e.id))continue;const ey=e.y-(e.d.big?12:6);if(Math.hypot(e.x-b.x,ey-b.y)<e.r+5){b.hit.add(e.id);spellImpact(b,b.x,b.y,e);if(--b.pierce<=0){b.done=true;break;}}}}
  BOLTS=BOLTS.filter(b=>!b.done);}
// damage one monster with a spell (party dungeons: the host decides, like a sword hit)
function spellHit(e,d,a,col,slow){if(e.dead)return 0;floatText(e.x,e.y-(e.d.big?28:16),String(d),col);e.flash=.12;e.sq=.16;if(slow)e.slowT=1.8;
  if(MP.client()){e.hp=Math.max(0,e.hp-d);NET.send(slow?{t:'hit',e:e.id,d,a:Math.round(a*100)/100,s:1}:{t:'hit',e:e.id,d,a:Math.round(a*100)/100});return d;}applyHit(e,d,a,MP.me());return d;}
function spellImpact(b,x,y,e){const D=SPELLS[b.sp],R=D.aoe||0,mx=spellMax(b.sp);
  SPFX.push({k:b.sp,x,y,t:0,life:R?.5:.32,R:R||10,c:D.col,c2:D.col2});
  if(b.mine){hitStop=Math.max(hitStop,R?.06:.035);if(SET.shake)shake=Math.max(shake,b.sp==='cataclysm'?5:R?3:1.2);}
  if(!b.mine)return;const roll=()=>Math.max(1,Math.round(mx*(.65+rand()*.35)));
  if(e){const a=Math.atan2(e.y-P.y,e.x-P.x);spellHit(e,roll(),a,D.col2,!!D.slow);
    if(D.chain){let n=D.chain,from=e;const done=new Set([e.id]);while(n-->0){let best=null,bd=70;for(const q of ents){if(q.dead||q.d.proj||done.has(q.id))continue;const k=Math.hypot(q.x-from.x,q.y-from.y);if(k<bd){bd=k;best=q;}}
      if(!best)break;done.add(best.id);SPFX.push({k:'arc',x:from.x,y:from.y-6,x2:best.x,y2:best.y-6,t:0,life:.22,c:D.col});spellHit(best,Math.round(roll()*.75),Math.atan2(best.y-from.y,best.x-from.x),D.col2);from=best;}}}
  if(R)for(const q of ents){if(q.dead||q.d.proj||q===e)continue;if(Math.hypot(q.x-x,(q.y-6)-y)<R+q.r)spellHit(q,Math.round(roll()*.7),Math.atan2(q.y-y,q.x-x),D.col2);}
}
// the look of casting: the staff raised, a turning circle of runes at your feet, light gathering at the tip
function drawCastPose(x,y,dir,left,sp,blade,cw){const D=SPELLS[sp]||SPELLS.spark,k=1-left/.42,X=Math.round(x),Y=Math.round(y),tip=staffTip(x,y,dir),sw=cw==='scythe'?(dir==='right'?ART.scytheM:ART.scythe):ART.sword[blade]||ART.sword.apprentice;
  g.save();g.globalCompositeOperation='lighter';
  const ring=(R,al,rot,n)=>{for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rot;g.globalAlpha=al*(.6+.4*Math.sin(a*3+time*8));g.fillStyle=i%3?D.col:D.col2;g.fillRect(Math.round(X+Math.cos(a)*R),Math.round(Y+1+Math.sin(a)*R*.38),1,1);}};
  const fade=Math.min(1,k*3)*Math.min(1,(1-k)*4+.2);ring(11,fade,time*3,22);ring(7,fade*.8,-time*4,14);
  const gr=g.createRadialGradient(X,Y+1,0,X,Y+1,14);gr.addColorStop(0,'rgba(255,255,255,'+(.18*fade)+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.globalAlpha=1;g.fillStyle=gr;g.fillRect(X-14,Y-6,28,14);
  // light gathering into the tip
  const tg=g.createRadialGradient(tip.x,tip.y,0,tip.x,tip.y,6+fade*7);tg.addColorStop(0,D.col2);tg.addColorStop(.35,D.col);tg.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.85*fade;g.fillStyle=tg;g.fillRect(tip.x-13,tip.y-13,26,26);
  if(!reduceMotion)for(let i=0;i<6;i++){const ph=((time*2.2+i/6)%1),a=i*1.047+time*2,r=(1-ph)*14;g.globalAlpha=ph*fade;g.fillStyle=i%2?D.col2:D.col;g.fillRect(Math.round(tip.x+Math.cos(a)*r),Math.round(tip.y+Math.sin(a)*r),1,1);}
  g.restore();
  // the staff, held upright beside you, tipped a little toward where you face
  const lean=dir==='left'?-.35:dir==='right'?.35:dir==='up'?.15:-.15;g.save();g.translate(Math.round(tip.x-Math.sin(lean)*2),Math.round(tip.y+16));g.rotate(lean-Math.PI/4);g.drawImage(sw,-2,-(sw.hy||14));g.restore();}
function drawBolts(){if(!BOLTS.length&&!SPFX.length)return;g.save();g.globalCompositeOperation='lighter';
  const glow=(x,y,r,c,a)=>{const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=a;g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);};
  const px=(x,y,c,a)=>{g.globalAlpha=a==null?1:a;g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),1,1);};
  for(const b of BOLTS){const D=SPELLS[b.sp],X=b.x,Y=b.y,fl=.85+.15*Math.sin(time*40+b.t*30);
    switch(b.sp){
      case 'spark':glow(X,Y,7,D.col,.7*fl);px(X,Y,'#ffffff');for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])px(X+dx,Y+dy,D.col2);for(const [i,[tx,ty]] of b.tr.entries())px(tx,ty,D.col,i/b.tr.length*.6);break;
      case 'ember':glow(X,Y,10,D.col,.75*fl);glow(X,Y,4,D.col2,.9);g.globalAlpha=1;g.fillStyle='#fff3c4';g.fillRect(Math.round(X)-1,Math.round(Y)-1,3,3);for(const [i,[tx,ty]] of b.tr.entries())glow(tx,ty,3+i,D.col2,.12*i);break;
      case 'frost':{const ca=Math.cos(b.a),sa=Math.sin(b.a);glow(X,Y,8,D.col,.55);g.globalAlpha=1;for(let i=-4;i<=3;i++){const w=i<-1?0:i>1?0:1;g.fillStyle=i>1?'#ffffff':D.col;g.fillRect(Math.round(X+ca*i-sa*w),Math.round(Y+sa*i+ca*w),1,1);g.fillRect(Math.round(X+ca*i),Math.round(Y+sa*i),1,1);}
        for(const [i,[tx,ty]] of b.tr.entries())px(tx+Math.sin(i+time*20)*2,ty+Math.cos(i*2)*2,'#e8fbff',.15*i);break;}
      case 'storm':{g.strokeStyle=D.col;g.lineWidth=1;g.globalAlpha=.95;g.beginPath();const pts=b.tr;pts.forEach(([tx,ty],i)=>{const j=(rand()-.5)*5;i?g.lineTo(tx+j,ty+j):g.moveTo(tx,ty);});g.stroke();
        g.strokeStyle='#ffffff';g.globalAlpha=.7;g.beginPath();pts.forEach(([tx,ty],i)=>{const j=(rand()-.5)*2;i?g.lineTo(tx+j,ty+j):g.moveTo(tx,ty);});g.stroke();glow(X,Y,9,D.col2,.6*fl);break;}
      case 'burst':glow(X,Y,13,D.col,.7*fl);glow(X,Y,6,D.col2,.9);g.globalAlpha=1;g.fillStyle='#ffffff';g.fillRect(Math.round(X)-1,Math.round(Y)-1,2,2);for(const [i,[tx,ty]] of b.tr.entries())glow(tx,ty,4+i*1.4,D.col,.14*i);break;
      case 'lance':{const ca=Math.cos(b.a),sa=Math.sin(b.a),L=22;g.globalAlpha=.9;g.strokeStyle=D.col;g.lineWidth=3;g.beginPath();g.moveTo(X-ca*L,Y-sa*L);g.lineTo(X+ca*3,Y+sa*3);g.stroke();
        g.strokeStyle='#f1e4ff';g.lineWidth=1;g.beginPath();g.moveTo(X-ca*L*.7,Y-sa*L*.7);g.lineTo(X+ca*4,Y+sa*4);g.stroke();glow(X,Y,10,D.col,.6*fl);break;}
      case 'starfall':case 'cataclysm':{const big=b.sp==='cataclysm',dx=b.tx-b.sx,dy=b.ty-b.sy,l=Math.hypot(dx,dy),ux=dx/l,uy=dy/l,L=big?34:26;
        const gr=g.createLinearGradient(X-ux*L,Y-uy*L,X,Y);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,D.col);g.globalAlpha=.9;g.strokeStyle=gr;g.lineWidth=big?5:3;g.beginPath();g.moveTo(X-ux*L,Y-uy*L);g.lineTo(X,Y);g.stroke();
        glow(X,Y,big?16:11,D.col,.85);glow(X,Y,big?6:4,'#ffffff',.9);
        // where it will land: a shrinking ring on the ground
        const k=Math.min(1,b.t/b.life);g.globalAlpha=.5+.4*k;g.strokeStyle=D.col2;g.lineWidth=1;g.beginPath();g.ellipse(b.tx,b.ty,(D.aoe||20)*(1.3-k*.5),(D.aoe||20)*(1.3-k*.5)*.45,0,0,Math.PI*2);g.stroke();break;}
    }}
  for(const f of SPFX){const p=f.t/f.life,X=f.x,Y=f.y,a=1-p;
    if(f.k==='arc'){g.strokeStyle=f.c;g.lineWidth=1;g.globalAlpha=a;g.beginPath();g.moveTo(X,Y);const n=6;for(let i=1;i<=n;i++){const t=i/n,j=i<n?(rand()-.5)*8:0;g.lineTo(X+(f.x2-X)*t+j,Y+(f.y2-Y)*t+j);}g.stroke();glow(f.x2,f.y2,8,'#ffffff',.5*a);continue;}
    if(f.k==='fizzle'){glow(X,Y,6*(1-p)+2,f.c,a*.6);continue;}
    const R=f.R*(.3+.9*Math.sqrt(p));
    if(f.k==='frost'){glow(X,Y,10,f.c,.7*a);g.globalAlpha=a;g.fillStyle='#e8fbff';for(let i=0;i<8;i++){const an=i/8*Math.PI*2,r=4+p*12;g.fillRect(Math.round(X+Math.cos(an)*r),Math.round(Y+Math.sin(an)*r),1,1);g.fillRect(Math.round(X+Math.cos(an)*r*.5),Math.round(Y+Math.sin(an)*r*.5),1,1);}continue;}
    glow(X,Y,Math.max(4,R*.9),f.c,.65*a);glow(X,Y,Math.max(2,R*.35),f.c2||'#ffffff',.8*a);
    if(f.R>10){g.globalAlpha=a*.9;g.strokeStyle=f.c2||f.c;g.lineWidth=f.k==='cataclysm'?2:1;g.beginPath();g.ellipse(X,Y,R,R*.5,0,0,Math.PI*2);g.stroke();
      if(f.k==='cataclysm'||f.k==='starfall'){g.globalAlpha=a*.5;g.beginPath();g.ellipse(X,Y,R*.6,R*.3,0,0,Math.PI*2);g.stroke();}}
    if(p<.18&&(f.k==='cataclysm'||f.k==='starfall'))glow(X,Y,f.R*(f.k==='cataclysm'?4:3),f.c2||'#ffffff',(1-p/.18)*.55);}
  g.restore();g.globalAlpha=1;}
function updateSpellFx(dt){for(const f of SPFX){f.t+=dt;if(f.t<dt*1.5&&!reduceMotion&&f.k!=='arc'&&f.k!=='fizzle'){const n=f.R>10?18:8;for(let i=0;i<n;i++){const a=rand()*Math.PI*2,s=(f.R>10?40:25)+rand()*60;fx.push({x:f.x,y:f.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s*.6-20,t:0,life:.3+rand()*.35,col:i%3?f.c:(f.c2||'#ffffff')});}}}SPFX=SPFX.filter(f=>f.t<f.life);}
// kill XP: with a staff it trains Magic (never Fighting); with a blade, Fighting
function killXp(xp){if(staffOn()){const n=Math.max(1,Math.round(xp*2));skillXp('magic',n);floatText(P.x,P.y-30,'+'+n+' Magic xp','#c79bf2');}else gainXp(xp);}

// ---------- loot ----------
function rollRarity(floor,boost){const w={};let tot=0;for(const r of RORDER){let x=RARITY[r].w;if(r==='rare')x*=1+floor*.08*boost;if(r==='xrare')x*=1+floor*.15*boost;if(r==='legendary')x*=1+floor*.25*boost;w[r]=x;tot+=x;}
  let q=rand()*tot;for(const r of RORDER){q-=w[r];if(q<=0)return r;}return 'common';}
function gearDrops(src,floor,boss){const luck=1+A('luck')/100,out=[];
  if(rand()<{chest:.10,uchest:.2,enemy:.006,boss:.5}[src]*luck){const r=rollRarity(floor,src==='boss'?2:1);let pool=Object.keys(LANTERNS).filter(k=>k!=='basic'&&!LANTERNS[k].goal&&LANTERNS[k].r===r);if(!pool.length)pool=['tin'];out.push(pool[ri(0,pool.length-1)]+'_lantern');}
  if(rand()<{chest:.035,uchest:.07,enemy:.0025,boss:.25}[src]*luck){const r=rollRarity(floor,1);let pool=Object.keys(CAPES).filter(k=>!CAPES[k].src&&!CAPES[k].boss&&CAPES[k].r===r);if(!pool.length)pool=['glow'];out.push('cape_'+pool[ri(0,pool.length-1)]);}
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
function grantDrop(d){d.taken=true;const into=scene==='delve'&&run?run.pack:S.bank;giveAny(into,d.id,d.n);
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
// the plain flask refills half the lantern, the Greater Oil Flask all of it (used first when the lantern is low)
function useFlask(id){if(scene!=='delve')return;if(run.oil>=99){toast('Lantern is full');return;}
  id=id&&has(id)?id:run.oil<=45&&has('oil2')?'oil2':has('oil')?'oil':has('oil2')?'oil2':null;if(!id){toast('No Oil Flasks. Press Lampseed at the Hold.','bad');return;}
  take(id,1);run.oil=Math.min(100,run.oil+ITEMS[id].oil);puff(P.x,P.y-12,id==='oil2'?'#7affd6':'#ffcd75',id==='oil2'?16:8);updateHud();}
const FOODS=['bread','pondfin','gloomfin','stew','moonfin'];
const foodCount=()=>FOODS.reduce((a,f)=>a+(S.bank[f]||0),0);
function eat(id){if(scene==='hold')return eatHold(id);if(scene!=='delve'){toast('Save your food for the Depths');return;}if(!(S.bank[id]>0)){toast('No '+ITEMS[id].n+' in your bag','bad');return;}
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');sfx('pick');updateHud();}
function useQuick(i){const id=S.quick[i];if(!id){if(scene==='hold')openQuickPick(i);else toast('Set quick slots from your bag');return;}
  if(scene==='hold'&&(ITEMS[id].oil||!(inWild()||inWest()||P.hp<hpMax()-.5))){openQuickPick(i);return;}if(ITEMS[id].oil)useFlask(id);else eat(id);}
// eating in the Hold and the Wilderness: from your bag only, one bite every 1.5 s (the world's server keeps your health)
function eatHold(id){if(P.hp>=hpMax()-.5){toast(inWild()?'Already at full health':'Save your food for the Depths');return;}
  if(!(S.bank[id]>0)){toast('No '+ITEMS[id].n+' in your bag','bad');return;}if(time-(MP.eatT||-9)<1.5)return;MP.eatT=time;
  S.bank[id]--;if(S.bank[id]<=0)delete S.bank[id];P.hp=Math.min(hpMax(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');sfx('pick');
  if(roomUp()&&MP.pvpOn&&inWild())NET.send({t:'eat',h:ITEMS[id].heal});updateHud();updateQuick(true);save();}
function useFood(){if(scene==='hold'){const have=FOODS.filter(f=>S.bank[f]>0).sort((a,b)=>ITEMS[a].heal-ITEMS[b].heal);if(!have.length)return toast('No food in your bag','bad');const miss=hpMax()-P.hp;return eatHold(have.find(f=>ITEMS[f].heal>=miss)||have[have.length-1]);}if(scene!=='delve')return;const have=FOODS.filter(f=>has(f)).sort((a,b)=>ITEMS[a].heal-ITEMS[b].heal);if(!have.length){toast('No food. Cook at the Kitchen.','bad');return;}
  const miss=maxHp()-P.hp,id=have.find(f=>ITEMS[f].heal>=miss)||have[have.length-1];
  if(P.hp>=maxHp()){toast('Already at full health');return;}take(id,1);P.hp=Math.min(maxHp(),P.hp+ITEMS[id].heal);floatText(P.x,P.y-20,'+'+ITEMS[id].heal,'#a7f070');updateHud();}
const halfLoss=n=>Math.floor(n/2)+(n%2&&rand()<.5?1:0);
function returnHome(){setTimeout(()=>save(true),50);sfx('flame');const r=run,out={};for(const [id,n] of Object.entries(r.pack)){if(id==='gold')S.gold+=n;else give(S.bank,id,n);out[id]=n;}enterHold(HOLD.doors[r.door]||HOLD.doors.gate);notePos();save();
  summary('Back at the Hold',`You lit the Return Flame on floor ${r.floor} with ${r.kills} kills. Your haul is in your bag. Bank anything you can't afford to lose.`,out,null,'Brought home');}
function die(){if(scene==='hold')return westDie();setTimeout(()=>save(true),50);sfx('die');buzz(200);const r=run;S.deaths++;if(netOn()&&MP.party)NET.lsend({t:'pdie',k:'depths',floor:r.floor});const kept={},lost={};
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
  for(const d of [P.dir,'down','right','left','up']){const [dx,dy]=O[d],w=tAt(map,tx+dx,ty+dy);if(isWater(w)){let bx=tx+dx,by=ty+dy;if(isWater(tAt(map,bx+dx,by+dy))&&isWater(tAt(map,bx+2*dx,by+2*dy))){bx+=dx;by+=dy;}return {dir:d,bx:bx*T+8,by:by*T+9,w:w===GLOOM?'wild':w===MOON?'mere':'hold'};}}return null;}
const catchChance=()=>Math.min(.93,.32+.006*(lvlOf('fishing')-1)+A('catch')/100);
const biteWait=()=>(2.5+rand()*3.5)*(1-.004*(lvlOf('fishing')-1));
function startFishing(sp){const W=WATERS[sp.w||'hold'];if(W.lvl&&lvlOf('fishing')<W.lvl){toast('You need Fishing '+W.lvl+' to fish the '+W.n+'.','bad');return;}CHOP=null;if(COOK)stopCook();sfx('cast');FISHING=Object.assign({phase:'cast',t:0,wait:0,px:P.x,py:P.y},sp);P.dir=sp.dir;}
let missRun=0;
function landFish(hooked){missRun=0;{const h=new Date().getHours();if(h<3)secret('night');}const pool=WATERS[FISHING.w||'hold'].fish,F=FISH[pool[ri(0,pool.length-1)]];give(S.bank,F.item,1);S.caught=(S.caught||0)+1;if(F.item==='raw_gloomfin')bump('gloomfin');if(F.item==='raw_moonfin')bump('moonfin');
  sfx('pick');const x=skillXp('fishing',F.xp);floatText(P.x,P.y-24,(hooked?'Hooked! ':'')+'+1 '+F.n+' · '+Math.round(x)+' xp','#73eff7');puff(FISHING.bx,FISHING.by,'#73eff7',6);
  if(rand()<(1/SKILL_CAPE_ODDS)*(1+A('luck')/100)){give(S.bank,'cape_angler',1);rareFound('cape_angler');}save();}
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
function gotLog(o){const L=TREES[o.kind];give(S.bank,L.item,1);bump('logs');if(o.kind==='blackwood')bump('bwlogs');if(o.kind==='willow')bump('wlogs');const x=skillXp('woodcutting',L.xp*(1+A('chopXp')/100));
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
    if(started){if(w){const pm=pvpMaxHp();toast('You enter the Wilderness. Other players can attack you here.'+(maxHp()>pm?' Wilderness rules: your max health here is '+pm+'.':''),'bad');buzz(30);}
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
  for(const sl of ['blade','mail','lantern','cape','helm','ring','amulet']){const t=S.gear[sl];if(!t||DEFG[sl]===t)continue;const id=gearId(sl,t);if(id&&tradable(id))out.push([id,1,sl,ITEMS[id].v||0]);}
  return out.sort((a,b)=>b[3]-a[3]).slice(0,80);}
// the Return Flame (hold it for 2 s) works in the Wilderness up to level 20: home to the Hold. A hit interrupts it.
function wildReturn(){FISHING=null;CHOP=null;const h=HOLD.spawn;P.x=h.x;P.y=h.y+8;P.dir='down';MP.aim=null;S.pos={x:P.x,y:P.y,v:3};
  if(roomUp()&&MP.pvpOn)NET.send({t:'home',x:Math.round(P.x),y:Math.round(P.y)});MP.sent='';sfx('flame');puff(P.x,P.y-10,'#ffcd75',16);toast('The Return Flame carries you home to the Hold.','good');save();}
// back at the Hold after falling in the Wilderness (no new world: you stay where your friends are)
function respawnHold(){MP.deadAt=0;FISHING=null;CHOP=null;if(COOK)stopCook();P.x=HOLD.spawn.x;P.y=HOLD.spawn.y+8;S.pos={x:P.x,y:P.y,v:3};P.dir='down';P.hp=hpMax();P.inv=1.2;P.swing=0;MP.lc=-99;MP.sent='';MP.aim=null;}
function applyPkDeath(m){const lost=Array.isArray(m.lost)?m.lost:[],kept=Array.isArray(m.kept)?m.kept:[],L={},K={},DEFG={blade:'rusty',mail:'none',lantern:'basic',cape:null,helm:null,ring:null,amulet:null};
  for(const [id,n,slot] of lost){if(!ITEMS[id]||!(n>0))continue;
    if(slot&&DEFG.hasOwnProperty(slot)&&gearId(slot,S.gear[slot])===id){S.gear[slot]=DEFG[slot];enchFade(slot);}
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
  const lifts=LIFTS.filter(f=>f<=S.lift&&(!liftBoss(f)||S.bosses[liftBoss(f)])),LIFT_ORE={1:'copper_ore',6:'iron_ore',11:'coal_ore',16:'cobalt_ore',21:'gloam_ore',26:'gloam_ore'};
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
function xpInfo(k){if(k==='combat'){const need=xpNeed(S.flv);const mx=S.flv>=FIGHT_MAX;return {n:'Fighting',c:'#ef7d57',icon:staffOn()?'rusty_blade':gearId('blade',S.gear.blade),l:S.flv,p:mx?1:S.xp/need,left:need-S.xp,max:mx};}
  const l=lvlOf(k),xp=S.skills[k]||0,a=XP_TABLE[l],b=XP_TABLE[Math.min(99,l+1)];return {n:SKILLS[k].n,c:SKILLS[k].c,icon:SKILLS[k].icon,l,p:l>=99?1:(xp-a)/(b-a),left:Math.ceil(b-xp),max:l>=99};}
function xpShow(k){if(!started)return;const x=xpInfo(k),f=$('xpFill'),bar=$('xpb'),g=$('guide');xpLast=k;
  bar.hidden=false;f.style.width=Math.max(2,Math.round(x.p*100))+'%';f.style.background=x.c;f.style.color=x.c;bar.title=x.n;
  const land=document.documentElement.classList.contains('land');
  g.innerHTML=`${iconImg(x.icon)}<b>${x.n} ${x.l}</b>${land?'':`<i class="xpm"><i style="width:${Math.round(x.p*100)}%;background:${x.c}"></i></i>`}<small>${x.max?'max level':(land?' · ':'')+fmt(x.left)+' xp to '+(x.l+1)}</small>`;
  g.classList.add('xp');g.hidden=false;xpTipT=time+5;}
function skillLine(sk){const l=lvlOf(sk),xp=S.skills[sk]||0,a=XP_TABLE[l],b=XP_TABLE[Math.min(99,l+1)],p=l>=99?1:(xp-a)/(b-a);
  return `<div class="skl${xpLast===sk?' cur':''}">${iconImg(SKILLS[sk].icon)}<span><b>${SKILLS[sk].n} <em>${l}</em><small>/99</small>${xpLast===sk?' <small class="trn">training</small>':''}</b><i class="xpb"><i style="width:${Math.round(p*100)}%;background:${SKILLS[sk].c}"></i></i><small>${l>=99?'Max level':`<b>${fmt(Math.ceil(b-xp))}</b> xp to level ${l+1} · ${fmt(Math.floor(xp-a))} / ${fmt(b-a)} (${Math.floor(p*100)}%)`}</small></span></div>`;}
function combatLine(){const x=xpInfo('combat'),pts=cbPts(),div=cbDiv(),base=combatFrom(S.flv,S.skills),nextAt=(base+1)*div,held=(S.cbFloor||1)>base,cp=Math.max(0,Math.min(1,(pts-base*div)/div));
  return `<div class="skl cbsum"><span class="ic cbic">⚔</span><span><b>Combat level <em>${S.lvl}</em></b><i class="xpb"><i style="width:${held?100:Math.round(cp*100)}%;background:#ffcd75"></i></i><small>${held?`Kept from before the update. It climbs again once Fighting and your skills pass it (${pts}/${(S.lvl+1)*div} points).`:`<b>${nextAt-pts}</b> more point${nextAt-pts===1?'':'s'} to combat level ${base+1} · Fighting (or Magic, if higher) counts 2 points a level, every other skill 1`}</small></span></div>
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
const canMake=r=>Object.entries(r.need).every(([id,n])=>has(id,n))&&S.gold>=(r.gold||0)&&(!r.lvl||!r.sk||lvlOf(r.sk)>=r.lvl);
// which skill each workstation trains (and gates recipes by)
const CRAFT_SK={forge:'smithing',smelt:'smithing',jewel:'crafting',staff:'crafting'};
for(const [k,sk] of Object.entries(CRAFT_SK))RECIPES[k].forEach(r=>r.sk=sk);
let craftQty=1;
function openCraft(kind){
  const T2={forge:['The Forge','Forge gear to train Smithing. Better gear unlocks as your level rises. New gear goes into your bag; equipping it swaps your old piece back into the bag.'],
    smelt:['The Forge','Smelt ore into bars for Smithing XP. Bars are what the Jeweler’s Bench makes rings and amulets from.'],
    jewel:['Jeweler’s Bench','Set gems into bars to craft rings and amulets for Crafting XP. You can wear one of each: they work like capes, everywhere except Wilderness fights.'],
    staff:['Jeweler’s Bench','Carve staffs for Crafting XP. Wield one and your attacks become spells that train Magic.'],
    kitchen:['The Kitchen','Food heals you mid-delve. Use it with the food button.'],press:['The Oil Press','Lampseed becomes Oil Flasks, the fuel for your lantern. The Greater Oil Flask refills it all: pressing one takes Farming 30 and a Moonpetal (grow it from Moonpetal Seeds, Farming 25).']}[kind];
  const sk=CRAFT_SK[kind],forgeTabs=kind==='forge'||kind==='smelt',multi=kind==='smelt'||kind==='press';
  const tabs=kind==='jewel'||kind==='staff'?`<div class="tabs" role="tablist"><button class="tab" role="tab" id="tbJ" aria-selected="${kind==='jewel'}">Rings &amp; amulets</button><button class="tab" role="tab" id="tbT" aria-selected="${kind==='staff'}">Staffs</button></div>`:forgeTabs?`<div class="tabs" role="tablist"><button class="tab" role="tab" id="tbF" aria-selected="${kind==='forge'}">Forge gear</button><button class="tab" role="tab" id="tbS" aria-selected="${kind==='smelt'}">Smelt bars</button><button class="tab" role="tab" id="tbR" aria-selected="false">Relic forge</button></div>`:'';
  openSheet(`<h2>${T2[0]}</h2>${tabs}${sk?skillLine(sk):''}<p class="lead${sk?' small':''}">${T2[1]}</p><div class="list">${RECIPES[kind].map((r,i)=>{const lock=sk&&lvlOf(sk)<r.lvl;const it=ITEMS[r.out],owned=(it.gear&&(S.gear[it.gear]===it.tier||(avail(r.out))>0))||(it.jewel&&(S.gear[it.jewel]===r.out||avail(r.out)>0));
    const lk=r.sk&&lvlOf(r.sk)<r.lvl,stat=it.gear?(it.gear==='blade'?(isStaff(it.tier)?'+'+GEAR.blade[it.tier].mag+'% spell damage':'Damage '+GEAR.blade[it.tier].dmg):'Defense '+GEAR[it.gear][it.tier].def):it.jewel?(it.jewel==='ring'?'Ring · ':'Amulet · ')+jewelStat(r.out):it.heal?'Heals '+it.heal:it.oil?'+'+it.oil+'% oil':'';
    const mx=multi?maxMake(r):0;
    return `<div class="recipe"><div class="rh">${iconImg(r.out)}<span><b>${it.n}${r.n?' ×'+r.n:''}</b><small>${lock||(!sk&&lk)?'<span class="lockt">Needs '+SKILLS[sk||r.sk].n+' '+r.lvl+'</span> · ':''}${stat?stat+' · ':''}${r.xp?r.xp+' xp':''}${owned?' · owned':''}${!it.gear&&!it.jewel?' · have '+(avail(r.out)):''}</small></span><span class="mk"><button class="btn sm" data-make="${i}" ${canMake(r)?'':'disabled'}>Make</button>${multi&&mx>1&&canMake(r)?`<button class="btn alt sm" data-all="${i}">All ${mx}</button>`:''}</span></div><div class="need">${needText(r)}</div></div>`;}).join('')}</div><div class="row"><button class="btn alt" id="sx">Close</button></div>`);
  $('sx').onclick=closeSheet;if($('tbF'))$('tbF').onclick=()=>openCraft('forge');if($('tbS'))$('tbS').onclick=()=>openCraft('smelt');if($('tbR'))$('tbR').onclick=openRelicForge;if($('tbJ'))$('tbJ').onclick=()=>openCraft('jewel');if($('tbT'))$('tbT').onclick=()=>openCraft('staff');
  const make=(r,times)=>{let made=0;for(let k=0;k<times&&canMake(r);k++){for(const [id,n] of Object.entries(r.need))take(id,n);S.gold-=r.gold||0;give(S.bank,r.out,r.n||1);made++;if(r.xp&&r.sk)skillXp(r.sk,r.xp);}return made;};
  $('sheet').querySelectorAll('[data-make],[data-all]').forEach(b=>b.onclick=()=>{const all=b.dataset.all!=null,r=RECIPES[kind][+(all?b.dataset.all:b.dataset.make)];if(!canMake(r))return;const it=ITEMS[r.out];
    const n=make(r,all?maxMake(r):1);
    if(it.gear&&!isStaff(it.tier)){S.flags.forged=true;bump('forged');sfx('cook');save();toast('Forged '+it.n+'. It is in your bag.','good');openItem(r.out);return;}
    if(it.gear&&isStaff(it.tier)){S.flags.staff=true;bump('staffs');sfx('rare');puff(P.x,P.y-12,'#9b7bff',14);save();toast('Carved '+it.n+'. It is in your bag.','good');openItem(r.out);return;}
    if(it.jewel){S.flags.crafted=true;bump('crafted');sfx('rare');puff(P.x,P.y-12,'#e86fd0',14);save();toast('Crafted '+it.n+'. It is in your bag.','good');openItem(r.out);return;}
    toast('Made '+it.n+((r.n||1)*n>1?' ×'+(r.n||1)*n:''),'good');if(kind==='press'){S.flags.pressed=true;bump('pressed');if(r.out==='oil2')bump('oiltwo');}if(kind==='smelt')bump('bars',n);
    sfx('cook');save();openCraft(kind);});
}
// ---------- Relic-forging: spend boss relics to forge power into the gear you wear, +1 to +5 ----------
const forgeFx=(id,l)=>{const it=ITEMS[id];if(!it||!l)return '';if(it.jewel)return '+'+FORGE_FX.jewel*l+'% to its bonuses';if(it.gear==='blade')return isStaff(it.tier)?'+'+FORGE_FX.staff*l+'% spell damage':'+'+FORGE_FX.blade*l+'% damage';
  return '+'+FORGE_FX.def*l+' defense'+(it.gear==='mail'&&GEAR.mail[it.tier].robe?' · +'+FORGE_FX.robe*l+'% spell damage':'');};
const fTag=sl=>{const l=fLv(sl);return l?' <em class="rt" style="color:#ffcd75">+'+l+'</em>':'';};
function openRelicForge(){const sm=lvlOf('smithing'),relics=RELIC_FORGE.filter(Boolean).map(f=>f.relic).concat(RELIC_CROWN);
  openSheet(`<h2>The Forge</h2><div class="tabs" role="tablist"><button class="tab" role="tab" id="tbF" aria-selected="false">Forge gear</button><button class="tab" role="tab" id="tbS" aria-selected="false">Smelt bars</button><button class="tab" role="tab" id="tbR" aria-selected="true">Relic forge</button></div>${skillLine('smithing')}
   <p class="lead small">Spend boss relics to forge power into the gear you wear, up to +5. Each step takes the next boss’s relic (+1 Slime Crown, +2 Knight’s Sigil, +3 Forge Heart, +4 Fallen Star, +5 Drowned Grimoire) and gold: the higher the item’s level, the more gold. The Hollow Crown perfects an enchantment instead (Enchant, on the Hero screen).</p>
   <p class="lead small">A forged piece keeps its power while you own it, and it counts everywhere except Wilderness fights. Sell, trade or lose every copy and the forging is gone. Relics you spend are gone for good.</p>
   <div class="need relics">${relics.map(k=>`<span class="${avail(k)?'ok':'no'}" title="${ITEMS[k].n}">${iconImg(k)}${avail(k)}</span>`).join('')}</div>
   <div class="list">${[['blade','Blade'],['mail','Armor'],['helm','Helmet'],['ring','Ring'],['amulet','Amulet']].map(([sl,L])=>{const id=wornId(S.gear,sl);
     if(!id||!forgeable(id))return `<div class="recipe locked"><div class="rh"><i class="ic blank"></i><span><b>${L}</b><small>${id?ITEMS[id].n+' can’t be forged':'Nothing worn'}</small></span></div></div>`;
     const l=S.forged[id]||0,R=RELIC_FORGE[l+1];
     if(!R)return `<div class="recipe"><div class="rh">${iconImg(id)}<span><b>${ITEMS[id].n} +${l}</b><small>Fully forged: ${forgeFx(id,l)}</small></span></div></div>`;
     const G=forgeGold(id,l+1),can=sm>=R.lvl&&has(R.relic)&&S.gold>=G;
     return `<div class="recipe${sm<R.lvl?' locked':''}"><div class="rh">${iconImg(id)}<span><b>${ITEMS[id].n}${l?' +'+l:''}</b><small>Item level ${itemLvl(id)} · ${sm<R.lvl?'<span class="lockt">Needs Smithing '+R.lvl+'</span> · ':''}${l?'Now '+forgeFx(id,l)+' · ':''}+${l+1}: ${forgeFx(id,l+1)} · ${R.xp} xp</small></span><span class="mk"><button class="btn sm" data-rf="${sl}" ${can?'':'disabled'}>Forge</button></span></div><div class="need"><span class="${has(R.relic)?'ok':'no'}">${iconImg(R.relic)}${avail(R.relic)}/1</span><span class="${S.gold>=G?'ok':'no'}">${iconImg('gold')}${fmt(G)}</span></div></div>`;}).join('')}</div>
   <div class="row"><button class="btn" id="sx">Done</button></div>`);
  $('sx').onclick=closeSheet;$('tbF').onclick=()=>openCraft('forge');$('tbS').onclick=()=>openCraft('smelt');$('tbR').onclick=openRelicForge;
  $('sheet').querySelectorAll('[data-rf]').forEach(b=>b.onclick=()=>{const sl=b.dataset.rf,id=wornId(S.gear,sl);if(!id||!forgeable(id))return;const l=S.forged[id]||0,R=RELIC_FORGE[l+1];
    const G=forgeGold(id,l+1);if(!R||lvlOf('smithing')<R.lvl||!has(R.relic)||S.gold<G)return;
    take(R.relic,1);S.gold-=G;S.forged[id]=l+1;skillXp('smithing',R.xp);bump('relicforge');P.hp=Math.min(P.hp,hpMax());
    sfx('rare');buzz([40,30,40,30,90]);puff(P.x,P.y-12,'#ffcd75',26);SPFX.push({k:'starfall',x:P.x,y:P.y-8,t:0,life:.6,R:18,c:'#ffcd75',c2:'#fff3c4'});
    toast(ITEMS[id].n+' +'+(l+1)+': '+forgeFx(id,l+1),'rare r-legendary');save(true);openRelicForge();});}
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
  q('[data-buy]').forEach(b=>b.onclick=()=>{const s=SHOP.find(x=>x.id===b.dataset.buy),n=+b.dataset.n||1;if(S.gold<s.price*n)return;S.gold-=s.price*n;giveAny(S.bank,s.id,n);save();toast('Bought '+n+' '+ITEMS[s.id].n);openMarket('shop');});
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
  const htabs=`<div class="tabs" role="tablist">${[['hero','Hero'],['cos','Cosmetics'],['quests','Quests']].map(([k,n])=>`<button class="tab" role="tab" data-bt="${k}" aria-selected="${bagTab===k}">${n}${k==='quests'&&questOpen()?' <i class="qdot"></i>':''}</button>`).join('')}</div>`;
  if(bagTab==='cos')body=htabs+cosTab();else if(bagTab==='quests')body=htabs+questTab();
  else if(bagTab==='hero'){body=htabs+`<div class="hero"><img class="ic" alt="" src="${hc.toDataURL()}"><span><b>${esc(S.name||'Adventurer')}</b><small>${FND&&FND.no?'Hero #'+nfmt(FND.no)+' · ':''}${wl}${window.ACC&&ACC.online()?' · saved to your account':''}</small></span>${scene==='hold'?'<button class="btn alt sm" id="look">Change look</button>':''}</div>${linkRows()}${xRow()}
   <div class="stats"><span>Combat <b>${S.lvl}</b></span><span>HP <b>${Math.ceil(P.hp)}/${maxHp()}</b></span>${staffOn()?`<span>Spell <b>${spellMax(curSpell())}</b></span>`:`<span>Damage <b>${Math.round(dmgOf())}</b></span>`}<span>Defense <b>${defOf()}</b></span></div>
   <div class="gears">
    ${row(iconImg(gearId('blade',bl)),isStaff(bl)?'Staff':'Blade',ITEMS[gearId('blade',bl)].n+fTag('blade'),(isStaff(bl)?'+'+GEAR.blade[bl].mag+'% spell damage · attacks cast spells':'Damage '+GEAR.blade[bl].dmg)+(fLv('blade')?' · forged '+forgeFx(gearId('blade',bl),fLv('blade')):''),`<button class="btn alt sm" data-eq="blade">Change${owned('gear')&&allKeys().some(id=>itemSlot(id)==='blade')?' ('+allKeys().filter(id=>itemSlot(id)==='blade').length+')':''}</button>`)}
    ${isStaff(bl)?row(`<i class="ic spic" style="--sc:${SPELLS[curSpell()].col}">✦</i>`,'Attack spell',SPELLS[curSpell()].n,'Hits up to '+spellMax(curSpell())+' · '+SPELLS[curSpell()].d,'<button class="btn alt sm" id="spB">Change</button>'):''}
    ${row(iconImg(gearId('mail',ml)),'Armor',ITEMS[gearId('mail',ml)].n+fTag('mail'),'Defense '+GEAR.mail[ml].def+(GEAR.mail[ml].mag?' · +'+GEAR.mail[ml].mag+'% spell damage':'')+(fLv('mail')?' · forged '+forgeFx(gearId('mail',ml),fLv('mail')):''),`<button class="btn alt sm" data-eq="mail">Change${allKeys().some(id=>itemSlot(id)==='mail')?' ('+allKeys().filter(id=>itemSlot(id)==='mail').length+')':''}</button>`)}
    ${row(iconImg(ln+'_lantern'),'Lantern '+rTag(ln+'_lantern'),LANTERNS[ln].n,lanStat(ln),`<button class="btn alt sm" data-eq="lantern">Change${owned('lantern')?' ('+owned('lantern')+')':''}</button>`,ln+'_lantern')}
    ${cp?row(iconImg('cape_'+cp),'Cape '+rTag('cape_'+cp),CAPES[cp].n,capeStat(cp),`<button class="btn alt sm" data-eq="cape">Change</button>`,'cape_'+cp)
        :row('<i class="ic blank"></i>','Cape','No cape',owned('cape')?'You have '+owned('cape')+' to wear':'Capes are rare finds in the Depths',owned('cape')?`<button class="btn alt sm" data-eq="cape">Wear</button>`:'')}
    ${S.gear.helm?row(iconImg(gearId('helm',S.gear.helm)),'Helmet '+rTag(gearId('helm',S.gear.helm)),ITEMS[gearId('helm',S.gear.helm)].n+fTag('helm'),helmStat(S.gear.helm)+(fLv('helm')?' · forged '+forgeFx(gearId('helm',S.gear.helm),fLv('helm')):''),'<button class="btn alt sm" data-eq="helm">Change</button>',gearId('helm',S.gear.helm))
       :row('<i class="ic blank"></i>','Helmet','No helmet',allKeys().some(id=>itemSlot(id)==='helm')?'You have one to wear':'Forge one from Smithing 3',allKeys().some(id=>itemSlot(id)==='helm')?'<button class="btn alt sm" data-eq="helm">Wear</button>':'')}
    ${['ring','amulet'].map(sl=>{const k=S.gear[sl],L=sl==='ring'?'Ring':'Amulet',n=allKeys().filter(id=>itemSlot(id)===sl).length,en=S.ench[sl]&&S.ench[sl].id===k?S.ench[sl]:null;return k?row(iconImg(k),L+(en?' <em class="rt" style="color:#c79bf2">Enchanted</em>':''),ITEMS[k].n+fTag(sl),jewelStat(k)+(fLv(sl)?' · forged '+forgeFx(k,fLv(sl)):'')+(en?' · <span style="color:#c79bf2">'+enchStat(en)+'</span>':''),`<span class="mk"><button class="btn alt sm" data-ench="${sl}">Enchant</button><button class="btn alt sm" data-eq="${sl}">Change</button></span>`)
       :row('<i class="ic blank"></i>',L,'No '+sl,n?'You have '+n+' to wear':'Craft one at the Jeweler’s Bench',n?`<button class="btn alt sm" data-eq="${sl}">Wear</button>`:'');}).join('')}
    ${isFounder()?row('<i class="ic flameic"></i>','Founder','Founder’s Flame',SET.flame!==false?'Lit: your light burns violet':'Off',`<button class="btn alt sm" id="flH">${SET.flame!==false?'Turn off':'Light it'}</button>`):''}
   </div>
   ${ADMIN?'<button class="btn big admin" id="adm">Admin powers</button>':''}
   <h3>Quick slots <small>tap to set</small></h3><div class="qslots">${S.quick.map((id,j)=>`<button class="qs" data-qs="${j}" aria-label="Quick slot ${j+1}${id?': '+ITEMS[id].n:''}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>
   <div class="row"><button class="btn alt" id="setO">Settings</button><button class="btn alt" id="gd">Goals</button></div>
   <div class="row"><button class="btn alt" id="reset">Reset progress</button><button class="btn alt" id="out">Sign out</button></div>`;}
  else if(bagTab==='skills'){body=`<div class="list">${combatLine()}${['magic','woodcutting','fishing','farming','cooking','smithing','mining','crafting'].map(skillLine).join('')}</div><p class="small">Total level ${totalLvl()} · <button class="linkb" id="gd2">Goals ${goalsDone()}/${GOALS.length}</button></p>
   <div class="perks"><p><b>Farming</b> ${Math.round(lvlOf('farming'))}% chance of a bonus crop. Unlocks Lampseed at 3, Glowcap at 6.</p>
   <p><b>Fishing</b> ${Math.round(catchChance()*100)}% catch chance if you don't hook. Tap <b>Hook!</b> when the bobber dips for a sure catch. ${fmt(S.caught||0)} fish caught.</p>
   <p><b>Woodcutting</b> ${Math.round(chopChance()*100)}% chance per swing, one swing every ${chopEvery().toFixed(1)} s. Oaks at the Hold hold 300 logs, shared by everyone, then fall and regrow. ${fmt(C('logs'))} logs cut. Logs will feed a new skill soon, so stack them.</p>
   <p><b>Smithing</b> Forge gear for XP. Helmets at 3, armor at 6, Iron at 10–14, Ember at 25–32, Steel at 35–42. Smelt ore into bars at the Forge too.</p>
   <p><b>Mining</b> Mine the ore in the walls of the Depths. Iron at 10, Coal at 20, Emberite at 25, Cobalt at 30, Starshard at 40. Veins grow back.</p>
   <p><b>Crafting</b> Set gems into bars at the Jeweler’s Bench to make rings and amulets, and carve staffs there too. Find Rubies, Sapphires, Emeralds and Diamonds in chests.</p>
   <p><b>Magic</b> Wield a staff and your attacks become spells: Spark at 1, Ember Bolt 8, Frost Shard 16, Storm Lash 26, Flame Burst 36, Void Lance 48, Starfall 62, Cataclysm 80. Kills with a staff train Magic, never Fighting. Magic also enchants your ring and amulet with runes from your rune bag.</p>
   <p><b>Cooking</b> ${Math.round(burnChance(RECIPES.kitchen[1])*100)}% chance to burn Pondfin (none at level 30). Unlocks Glowcap Stew at 5.</p>
   <p class="small">Combat level ${S.lvl} · Fighting ${S.flv} · deepest floor ${S.deepest||'—'}</p><p><b>Combat level</b> = (2 × the higher of Fighting and Magic + all your skill levels) ÷ ${cbDiv()}. Every skill counts, so fishing, chopping, farming, cooking, smithing, mining, crafting and magic all raise it. Fighting tops out at 99.</p></div>`;}
  else{const items=Object.entries(S.bank).filter(([id])=>ITEMS[id]).sort((a,b)=>(RORDER.indexOf(ITEMS[b[0]].rarity)+1)-(RORDER.indexOf(ITEMS[a[0]].rarity)+1));
   const pg=scene==='delve'&&run?(run.pack.gold||0):0,found=scene==='delve'&&run?Object.fromEntries(Object.entries(run.pack).filter(([id])=>id!=='gold')):{};
   body=`<div class="goldline">${iconImg('gold')}<span><b>${fmt(S.gold)}</b> gold${pg?` <em>+${fmt(pg)} found this delve</em>`:''}</span></div>${tokLine()}
   <h3>Rune bag <small>never lost, even if you fall</small></h3><div class="grid runes">${Object.keys(RUNES).map(k=>{const id=k+'_rune',n=S.runes[id]||0;return `<button class="cell${n?'':' dim'}" data-rune="${id}" aria-label="${ITEMS[id].n}, ${n}">${iconImg(id)}<b>${fmt(n)}</b><small>${ITEMS[id].n}</small></button>`;}).join('')}</div>
   ${scene==='delve'&&Object.keys(found).length?'<h3>Found this delve</h3>'+listItems(found):''}<p class="lead small">Everything here comes with you into the Depths, and about half is lost if you fall. ${scene==='hold'?'Keep valuables in the Bank.':'Your Bank at the Hold is safe.'}</p><h3>On you</h3><div class="grid">${items.length?items.map(([id,n])=>`<button class="cell" data-item="${id}" aria-label="${ITEMS[id].n}, ${n}" ${rc(id)?`style="--rc:${rc(id).c}"`:''}>${iconImg(id)}<b>${n}</b><small>${ITEMS[id].n}</small></button>`).join(''):'<p class="lead">Empty.</p>'}</div>`;}
  openSheet(`<h2>${{hero:'Hero',cos:'Hero',quests:'Hero',skills:'Skills'}[bagTab]||'Bag'}</h2>${body}<div class="row"><button class="btn" id="sx">Close</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;q.querySelectorAll('[data-bt]').forEach(b=>b.onclick=()=>openBag(b.dataset.bt));
  q.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>openEquip(b.dataset.eq));q.querySelectorAll('[data-cos]').forEach(b=>b.onclick=()=>{const [sl,k]=b.dataset.cos.split(':');S.cos[sl]=k||null;sfx(k?'rare':'pick');if(k)puff(P.x,P.y-12,'#c79bf2',16);save();openBag('cos');});if($('rewB'))$('rewB').onclick=()=>openRewards();
  q.querySelectorAll('[data-ench]').forEach(b=>b.onclick=()=>openEnchant(b.dataset.ench));if($('spB'))$('spB').onclick=openSpells;q.querySelectorAll('[data-rune]').forEach(b=>b.onclick=()=>openRuneInfo(b.dataset.rune));
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
  if(it.gear)o.push(it.gear==='blade'?(isStaff(it.tier)?'+'+GEAR.blade[it.tier].mag+'% spell damage · a club ('+GEAR.blade[it.tier].dmg+' damage) in the Wilderness':'Damage '+GEAR.blade[it.tier].dmg):it.gear==='helm'?helmStat(it.tier):'Defense '+GEAR.mail[it.tier].def+(GEAR.mail[it.tier].mag?' · +'+GEAR.mail[it.tier].mag+'% spell damage':''));
  if(it.gear==='blade'&&isStaff(it.tier))o.push('Wield it and your attacks cast spells, which train Magic instead of Fighting');
  if(id==='moon_staff'||id==='tide_robe')o.push('Only the Drowned Archmage drops it (floor 25)');if(id==='hollow_staff'||id==='void_robe')o.push('Only the Hollow King drops it (floor 30)');
  if(id==='oil2')o.push('Pressed at the Oil Press: 2 Lampseed + 1 Moonpetal, Farming 30. Also found in Uncommon Chests');if(id==='moonpetal')o.push('Press it with Lampseed into a Greater Oil Flask');if(id==='willow_logs')o.push('Cut from the willows of Hollowmere (Woodcutting 30). Tallow pays well for them');
  if(id==='gloam_ore')o.push('The one ore of floors 21–30. Smelt it into Gloamite Bars at the Forge (Smithing 50)');if(id==='gloam_bar')o.push('Forge Gloamite gear (Smithing 52–58) and the Gloamwood Staff');
  {const ok=Object.keys(ORES).find(k=>k+'_ore'===id);if(ok)o.push('Mined in the Depths · Mining '+ORES[ok].lvl);}
  if(it.rarity==='mythic'&&it.gear)o.push('One of the rarest finds in the Depths');if(it.relic){const st=RELIC_FORGE.findIndex(f=>f&&f.relic===id),bk=Object.keys(ENEMIES).find(k=>ENEMIES[k].relic===id),pk=PACKS.find(p=>p.boss===bk);
    o.push(id===RELIC_CROWN?'Crowns an enchantment: spend it on an enchanted ring or amulet (Enchant, on the Hero screen) and every bonus rises to the most that enchantment can roll':'Relic-forging: takes a piece you wear from +'+(st-1)+' to +'+st+' at the Forge (Relic forge tab, Smithing '+RELIC_FORGE[st].lvl+')');
    if(pk)o.push('A rare drop from '+pk.bossName+' (about 1 kill in 25)');}
  const seedOf=Object.values(CROPS).find(c=>c.seed===id);if(seedOf)o.push('Plant at the Farm · Farming '+seedOf.lvl);
  const ck=RECIPES.kitchen.find(r=>r.need[id]);if(ck)o.push('Cook into '+ITEMS[ck.out].n+' at the Kitchen');
  if(id==='lampseed')o.push('Press into Oil Flasks at the Oil Press');if(/_ore$|gem|gel|bone/.test(id)&&RECIPES.forge.some(r=>r.need[id]))o.push('Used at the Forge');if(RECIPES.smelt.some(r=>r.need[id]))o.push('Smelt into bars at the Forge');
  if(RECIPES.jewel.some(r=>r.need[id]))o.push('Used at the Jeweler’s Bench for rings and amulets');if(it.gem&&id!=='gem')o.push('Found in chests in the Depths');
  if(it.jewel)o.push((it.jewel==='ring'?'Ring':'Amulet')+': '+jewelStat(id),'Bonuses work everywhere except Wilderness fights');if(id==='starshard_ore')o.push('Prized by traders: sell it to Tallow');
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
  const acts=[['kit','Top loadout: best gear + every lantern, cape and relic'],['gold','+10,000 gold'],['mats','+50 of every ore, gem and material'],['food','+20 food and Oil Flasks'],['skills','All skills to 99'],['combat','Combat level 50'],['bank','Max bank space'],['lift','Unlock every lift (floors 6 to 26)'],['runes','+100 of every rune'],['heal','Full health and oil'],['god',(S.flags.god?'Turn off':'Turn on')+' god mode']].concat(scene==='delve'?PACKS.map(p=>['f'+p.to,'Jump to '+p.bossName+' (F'+p.to+')']):[]);
  openSheet(`<h2>Admin powers</h2><p class="lead small">Only party hat owners see this. Admin changes save to your account; the server skips its usual checks for admin heroes.</p><div class="list">${acts.map(([k,l])=>`<button class="item" data-ad="${k}"><span><b>${l}</b></span></button>`).join('')}</div><div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  $('sheet').querySelectorAll('[data-ad]').forEach(b=>b.onclick=()=>{const k=b.dataset.ad;
    if(k==='kit'){grantKit();S.gold-=100000;}
    if(k==='gold')S.gold+=10000;
    if(k==='mats')for(const id of ['copper_ore','iron_ore','ember_ore','coal_ore','cobalt_ore','starshard_ore','gloam_ore','gem','ruby','sapphire','emerald','diamond','copper_bar','iron_bar','steel_bar','ember_bar','cobalt_bar','gloam_bar','slime_gel','bone','lampseed','glowcap_spore','moonpetal_seed','moonpetal','wheat_seed','raw_pondfin','wheat','glowcap','logs','blackwood_logs'])give(S.bank,id,50);
    if(k==='runes')for(const r of Object.keys(RUNES))giveAny(S.bank,r+'_rune',100);
    if(k==='food')for(const id of ['oil','oil2','bread','pondfin','stew','moonfin'])give(S.bank,id,20);
    if(k==='skills')for(const sk of Object.keys(SKILLS))S.skills[sk]=XP_TABLE[99];
    if(k==='combat'){S.flv=Math.max(S.flv,60);S.cbFloor=Math.max(S.cbFloor||1,50);S.xp=0;combatCheck();P.hp=hpMax();}
    if(k==='bank')S.bankBuys=BANK_BUYS.length;
    if(k==='lift'){for(const p of PACKS)S.bosses[p.boss]=true;S.lift=LIFTS[LIFTS.length-1];S.deepest=Math.max(S.deepest,S.lift);}
    if(k==='heal'){P.hp=maxHp();if(run)run.oil=100;}
    if(k==='god')S.flags.god=!S.flags.god;
    const jump=/^f\d+$/.test(k);if(jump){enterFloor(+k.slice(1));closeSheet();}
    save();sfx('level');toast('Admin: done','good');if(!jump)openAdmin();});}
function openQuickPick(i){const opts=['oil','oil2'].concat(FOODS);
  openSheet(`<h2>Quick slot ${i+1}</h2><p class="lead small">Quick slots sit on your screen in the Depths. Tap one to eat or refill your lantern. Keys 1–5 work too.</p>
   <div class="qslots">${S.quick.map((id,j)=>`<button class="qs ${j===i?'on':''}" data-qs="${j}" aria-label="Slot ${j+1}">${id?`<img alt="" src="${iconOf(id).toDataURL()}">`:''}<i>${j+1}</i></button>`).join('')}</div>
   <div class="list">${opts.map(id=>`<button class="item" aria-pressed="${S.quick[i]===id}" data-q="${id}">${iconImg(id)}<span><b>${ITEMS[id].n}</b><small>${ITEMS[id].heal?'Heals '+ITEMS[id].heal:'Refills '+ITEMS[id].oil+'% oil'} · ${S.bank[id]||0} in bag${S.vault[id]?' · '+S.vault[id]+' in bank':''}</small></span></button>`).join('')}</div>
   <div class="row"><button class="btn alt" id="qclr">Clear slot</button><button class="btn" id="sx">Done</button></div>`);
  const q=$('sheet');$('sx').onclick=closeSheet;q.querySelectorAll('[data-qs]').forEach(b=>b.onclick=()=>openQuickPick(+b.dataset.qs));
  q.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const id=b.dataset.q,o=S.quick.indexOf(id);if(o>=0&&o!==i)S.quick[o]=S.quick[i];S.quick[i]=id;save();updateQuick(true);openQuickPick(i);});
  $('qclr').onclick=()=>{S.quick[i]=null;save();updateQuick(true);openQuickPick(i);};}
// ---------- gear: every slot equips from the bag and swaps the old piece back into it ----------
const gearId=(slot,t)=>!t?null:slot==='ring'||slot==='amulet'?t:slot==='blade'?(t==='rusty'?'rusty_blade':GEAR_ITEM['blade:'+t]||t+'_blade'):slot==='mail'?(t==='none'?'traveler_garb':GEAR_ITEM['mail:'+t]||t+'_mail'):slot==='lantern'?t+'_lantern':slot==='helm'?GEAR_ITEM['helm:'+t]||t+'_helm':'cape_'+t;
const itemSlot=id=>{const it=ITEMS[id];return !it?null:it.gear||it.jewel||(it.lantern?'lantern':it.cape?'cape':null);};
const itemTier=id=>{const it=ITEMS[id];return it.jewel?id:it.tier||it.lantern||it.cape;};
const jewelStat=k=>Object.entries((JEWELS[k]||{}).attr||{}).map(([a,v])=>ATTR_TXT[a](v)).join(' · ');
const helmStat=t=>'Defense '+GEAR.helm[t].def+(HELM_ATTR[t]?' · '+Object.entries(HELM_ATTR[t]).map(([a,v])=>ATTR_TXT[a](v)).join(' · '):'');
const gearStat=(slot,t)=>slot==='ring'||slot==='amulet'?jewelStat(t):slot==='helm'?helmStat(t):slot==='blade'?'Damage '+GEAR.blade[t].dmg:slot==='mail'?'Defense '+GEAR.mail[t].def:slot==='lantern'?lanStat(t):capeStat(t);
function equipItem(id){const slot=itemSlot(id);if(!slot||!has(id))return;take(id,1);const old=gearId(slot,S.gear[slot]);if(old)give(S.bank,old,1);S.gear[slot]=itemTier(id);const faded=enchFade(slot);
  if(slot==='blade'){const was=old&&isStaff(itemTier(old)),now=staffOn();if(now!==!!was)setTimeout(()=>toast(now?'Staff in hand: your attacks are now spells and train Magic. Pick your spell on the Hero screen.':'Blade in hand: your attacks train Fighting again.','good'),900);}
  P.hp=Math.min(P.hp,hpMax());save();sfx('pick');toast('Equipped '+ITEMS[id].n+(old?'. '+ITEMS[old].n+' went to your bag':'')+(faded?'. The old enchantment faded':''),'good');}
// swapping or removing an enchanted ring or amulet lets its enchantment fade
function enchFade(slot){const e=S.ench&&S.ench[slot];if(e&&e.id!==S.gear[slot]){delete S.ench[slot];return true;}return false;}
function openEquip(slot){
  const cur=S.gear[slot],curId=gearId(slot,cur),NAMES2={blade:'Blades',mail:'Armor',helm:'Helmets',lantern:'Lanterns',cape:'Capes',ring:'Rings',amulet:'Amulets'};
  const opts=allKeys().filter(id=>itemSlot(id)===slot).sort((a,b)=>(RORDER.indexOf(ITEMS[b].rarity)-RORDER.indexOf(ITEMS[a].rarity))||(ITEMS[b].v-ITEMS[a].v));
  const line=(id,btn)=>`<div class="gear" style="--rc:${(rc(id)||{}).c||'var(--ink)'}">${iconImg(id)}<span><small>${rTag(id)}</small><b>${ITEMS[id].n}</b><small>${gearStat(slot,itemTier(id))}</small></span>${btn}</div>`;
  const help={helm:'Forge helmets at the Forge from Smithing 3.',blade:'Forge better blades at the Forge.',mail:'Forge armor at the Forge.',lantern:'Better lanterns burn oil slower and light up more of the dark.',cape:'Capes carry special attributes. Find them in chests, from monsters and bosses, and rarely while fishing.',ring:'Craft rings at the Jeweler’s Bench from bars and gems.',amulet:'Craft amulets at the Jeweler’s Bench from bars and gems.'}[slot];
  openSheet(`<h2>${NAMES2[slot]}</h2><p class="lead small">${help} Equipping swaps: what you wore goes into your bag, where you can sell, bank or drop it.</p>
   <h3>Equipped</h3>${curId?line(curId,['cape','helm','ring','amulet'].includes(slot)?'<button class="btn alt sm" id="off">Take off</button>':''):'<p class="lead small">Nothing.</p>'}
   <h3>${scene==='hold'?'In your bag and bank':'In your bag'}</h3>${opts.length?`<div class="list">${opts.map(id=>line(id,`<button class="btn sm" data-wear="${id}">Equip</button>`)).join('')}</div>`:`<p class="lead small">None yet.${scene==='delve'?' Items found this delve go into your bag when you get home.':''}</p>`}
   <div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  if($('off'))$('off').onclick=()=>{give(S.bank,curId,1);S.gear[slot]=null;if(enchFade(slot))toast('The enchantment faded','bad');P.hp=Math.min(P.hp,hpMax());save();openEquip(slot);};
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
  {id:'craft1',cat:'start',t:'Craft a ring',hint:'Smelt Copper Ore into bars at the Forge, then visit the Jeweler’s Bench beside it.',done:()=>!!S.flags.crafted,gold:25},
  {id:'craft15',cat:'skills',t:'Reach Crafting 15',hint:'Rings and amulets at the Jeweler’s Bench.',...lv('crafting',15),gold:100},
  {id:'craft35',cat:'skills',t:'Reach Crafting 35',hint:'The Emberheart Amulet waits at 35.',...lv('crafting',35),gold:300},
  {id:'bars',cat:'skills',t:'Smelt 100 bars',hint:'At the Forge: Smelt bars.',...cn(()=>C('bars'),100),gold:100},
  {id:'jewels',cat:'skills',t:'Wear a ring and an amulet',hint:'One of each, from the Jeweler’s Bench.',done:()=>!!(S.gear.ring&&S.gear.amulet),gold:75},
  {id:'mine10',cat:'skills',t:'Reach Mining 10',hint:'Mine the glinting rocks in the Depths. Iron needs Mining 10.',...lv('mining',10),gold:50},
  {id:'mine25',cat:'skills',t:'Reach Mining 25',hint:'Coal at 20, Emberite at 25.',...lv('mining',25),gold:150},
  {id:'mine40',cat:'skills',t:'Reach Mining 40',hint:'Enough to mine a Starshard.',...lv('mining',40),gold:400},
  {id:'total',cat:'skills',t:'Total skill level 100',hint:'Every skill counts.',...cn(totalLvl,100),gold:200},
  {id:'mother',cat:'depths',t:'Defeat Mother Slime',hint:'She waits on floor 5. Bring food.',done:()=>!!S.bosses.mother,gold:60},
  {id:'knight',cat:'depths',t:'Defeat the Ossuary Knight',hint:'Floor 10. Watch for his charge.',done:()=>!!S.bosses.knight,gold:150},
  {id:'f10',cat:'depths',t:'Reach floor 10',hint:'The crypt goes deep.',done:()=>S.deepest>=10,gold:100,prog:()=>[Math.min(10,S.deepest),10]},
  {id:'tyrant',cat:'depths',t:'Defeat the Forge Tyrant',hint:'Floor 15. Step out of the ring of fire before the hammer lands.',done:()=>!!S.bosses.tyrant,gold:300},
  {id:'warden',cat:'depths',t:'Defeat the Starwarden',hint:'Floor 20. When it vanishes, look behind you.',done:()=>!!S.bosses.warden,gold:500},
  {id:'archmage',cat:'depths',t:'Defeat the Drowned Archmage',hint:'Floor 25. Step out of the frost ring, dodge the bolts, chase it down when it blinks.',done:()=>!!S.bosses.archmage,gold:700},
  {id:'hollowking',cat:'depths',t:'Defeat the Hollow King',hint:'Floor 30. Keep moving: rifts open where you stand.',done:()=>!!S.bosses.hollowking,gold:1000},
  {id:'f30',cat:'depths',t:'Reach floor 30',hint:'Below the Starfall Hollow: the Drowned Archive, then the Hollow Throne.',done:()=>S.deepest>=30,gold:500,prog:()=>[Math.min(30,S.deepest),30]},
  {id:'relicf',cat:'depths',t:'Relic-forge a piece of gear',hint:'Bosses rarely drop relics. Spend one at the Forge (Relic forge tab).',...cn(()=>C('relicforge'),1),gold:150},
  {id:'uchest',cat:'depths',t:'Open 10 Uncommon Chests',hint:'They glow green, on floors 21–30.',...cn(()=>C('uchests'),10),gold:200},
  {id:'gloamset',cat:'depths',t:'Wear a full set of Gloamite',hint:'Gloamite Blade, Mail and Helm, forged from the ore of floors 21–30.',done:()=>S.gear.blade==='gloam'&&S.gear.mail==='gloam'&&S.gear.helm==='gloam',gold:600},
  {id:'staff',cat:'start',t:'Carve a staff',hint:'At the Jeweler’s Bench, Staffs tab: an Apprentice Staff takes 10 logs.',done:()=>!!S.flags.staff,gold:20},
  {id:'mage10',cat:'skills',t:'Reach Magic 10',hint:'Wield a staff: kills with spells train Magic.',...lv('magic',10),gold:60},
  {id:'mage30',cat:'skills',t:'Reach Magic 30',hint:'Storm Lash at 26 jumps between monsters.',...lv('magic',30),gold:250},
  {id:'mage60',cat:'skills',t:'Reach Magic 60',hint:'Starfall waits at 62.',...lv('magic',60),gold:600},
  {id:'enchant',cat:'skills',t:'Enchant a ring or amulet',hint:'Hero screen → Enchant. Lesser Enchant needs Magic 3, 3 Gale Runes and a Soul Rune.',done:()=>!!S.flags.enchanted,gold:60},
  {id:'oil2',cat:'skills',t:'Press a Greater Oil Flask',hint:'Farming 30 at the Oil Press: 2 Lampseed and a Moonpetal.',...cn(()=>C('oiltwo'),1),gold:120},
  {id:'hallow',cat:'hold',t:'Complete All Hallows’ Lantern',hint:'Talk to Mordecai the Reaper, where the Hollow Wood ends.',...cn(()=>C('quests'),1),gold:100},
  {id:'willow',cat:'hold',t:'Cut a willow log',hint:'Willows grow in Hollowmere (Woodcutting 30).',...cn(()=>C('wlogs'),1),gold:60},
  {id:'hmvisit',cat:'hold',t:'Walk into Hollowmere',hint:'Take the road west out of the Hold.',...cn(()=>C('hmvisit'),1),gold:20},
  {id:'maw',cat:'hold',t:'Stand before the Abyssal Maw',hint:'In the far north-west of Hollowmere.',...cn(()=>C('maw'),1),gold:50},
  {id:'hm100',cat:'hold',t:'Defeat 100 monsters in Hollowmere',hint:'From the meadow wolves to the deepwood treants.',...cn(()=>C('hmkills'),100),gold:200},
  {id:'moonfin',cat:'hold',t:'Catch a Moonfin',hint:'Off the dock in the middle of the Moonmere. Needs Fishing 30.',...cn(()=>C('moonfin'),1),gold:100},
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
// ---- the Founder's Lantern: 2,222 free NFTs on Robinhood Chain (token ID = hero number); 1,000 of them held for X giveaway winners ----
// The game asks for combat level 10 before it offers the mint.
// The server knows each hero's number and whether their wallet holds one (lib/founders.js). Holders get the Founder's Flame.
async function refreshFounder(rerender){if(!window.ACC||!ACC.online())return;const r=await ACC.api.call(null,'founders');if(!r.ok||!r.data.on)return;
  const was=isFounder();FND=r.data;if(isFounder()!==was&&isFounder())toast('Founder’s Flame lit. Your light burns violet.','rare');
  if(rerender&&!$('sheet').hidden&&$('fndSheet'))openFounders(true);}
const nfmt=n=>Number(n).toLocaleString('en-US');
// Wick, keeper of the Founders' Ledger (by the road up to the Delve Gate): checks your whitelist spot, and opens the mint.
// He'll also be the one to see for the Founder's Lantern's phase 2.
const WICK_SAY=['The Founders’ Ledger is open.','Two thousand, two hundred and twenty-two lanterns… is one yours?','A violet flame burns for the Founders.','Come, let me find your name.'];
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
function openFounders(fresh){if(!FND)return refreshFounder(true);if(!fresh)refreshFounder(true);const F=FND,c=F.chain||{},listed=F.listed!==false,minL=F.minLvl||10,lvlOk=S.lvl>=minL,sup=F.supply||2222,soldOut=!F.reserved&&c.openLeft!=null&&c.openLeft<=0;
  const checks=listed?`<ul class="fchk"><li class="ok">Hero #${nfmt(F.no)}: ${F.reserved?'giveaway winner: a Lantern is held for you':'a spot in the Founders’ Ledger'}</li><li class="${lvlOk?'ok':''}">Combat level ${minL}${lvlOk?'':` <small>(you’re ${S.lvl})</small>`}</li></ul>`:'';
  let st='';
  if(isFounder())st=`<div class="soon fnd"><b>You hold a Founder’s Lantern</b><p>Your Founder’s Flame: a violet light at your shoulder and around your lantern, that every other player sees. Only holders have it.</p>
    <button class="btn big" id="flT">${SET.flame!==false?'Turn the flame off':'Light the flame'}</button></div>`;
  else if(!listed)st=`<p class="lead small">Your hero doesn’t have a number in the ledger yet. Check back soon.</p>`;
  else if(!lvlOk)st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: your spot is held</b>${checks}<div class="xpb"><i style="width:${Math.min(100,Math.round(S.lvl/minL*100))}%;background:#b98cff"></i></div><p>Reach combat level ${minL} to unlock your mint. Combat level comes from Fighting (monsters in the Depths) plus all your skills, so train everything. The mint is free, one per hero.</p></div>`;
  else if(!F.open)st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: you’re whitelisted</b>${checks}<p>The mint opens soon. Your spot is saved to your hero, so there’s nothing to do yet. We’ll post it in the Bulletin.</p></div>`;
  else if(!F.wallet)st=`<p class="lead small">Connect a wallet to your hero first (Hero screen). Your Founder’s Lantern is minted to it.</p><button class="btn big" id="fnHero">Open my hero</button>`;
  else if(c.taken)st=`<p class="lead small">Founder’s Lantern #${nfmt(F.no)} has been minted${c.owner?' to '+chatEsc(c.owner.slice(0,6)+'…'+c.owner.slice(-4)):''}. To light the flame, the hero’s linked wallet (${chatEsc(F.wallet.slice(0,6)+'…'+F.wallet.slice(-4))}) needs to hold a Founder’s Lantern.</p>`;
  else if(c.walletUsed)st=`<p class="lead small">The wallet linked to your hero has already minted a Founder’s Lantern. It’s one per wallet.</p>`;
  else if(soldOut)st=`<p class="lead small">All the open Founder’s Lanterns have been minted. The rest are held for giveaway winners. If you pick one up from another player, the flame is yours while you hold it.</p>`;
  else if(c.ended)st=`<p class="lead small">The Founder’s Lantern mint has ended.</p>`;
  else if(c.paused)st=`<p class="lead small">Minting is paused for a moment. Try again soon.</p>`;
  else if(fndV)st=`<div class="soon fnd"><b>Mint Founder’s Lantern #${nfmt(fndV.no)}</b><ul><li>Free: you only pay a tiny gas fee in ETH</li><li>Minted to your wallet ${chatEsc(fndV.wallet.slice(0,6)+'…'+fndV.wallet.slice(-4))}</li><li>On Robinhood Chain</li></ul></div>
    <button class="btn big" id="fnGo">Open my wallet</button><button class="btn alt big" id="fnNo">Not now</button>`;
  else st=`<div class="soon fnd"><b>Hero #${nfmt(F.no)}: you’re whitelisted${F.reserved?' (giveaway winner)':''}</b>${checks}<p>Mint Founder’s Lantern #${nfmt(F.no)} for free. You only pay a tiny gas fee.</p></div><button class="btn big" id="fnM">Mint for free</button>`;
  const q=isFounder()?'That violet flame suits you, Founder. The ledger remembers.':F.reserved&&!lvlOk?`Hero #${nfmt(F.no)}… a winner! A Lantern is set aside for you. Reach combat level ${minL} and it’s yours to mint.`:!listed?'Hmm… I can’t find your name yet. Come back in a little while.':!lvlOk?`Hero #${nfmt(F.no)}… your name is in the ledger, but the ink is still wet. Reach combat level ${minL} and it’s yours to keep.`:`Hero #${nfmt(F.no)}… ah, here you are. Your name is written in the Founders’ Ledger.`;
  openSheet(`<div id="fndSheet"></div>${wickHd(q)}<h2>Founder’s Lantern</h2>
   <div class="fndart"><img src="/api/founders?img=${F.no}" alt="Founder’s Lantern #${F.no}" width="160" height="160"><span><b>#${nfmt(F.no)}</b><small>Your hero number: Hero #${nfmt(F.no)}</small>${c.supply!=null?`<small>${nfmt(c.supply)} / ${nfmt(c.max||sup)} minted</small>`:`<small>${nfmt(sup)} in all</small>`}</span></div>
   <p class="lead small">${nfmt(sup)} free NFTs on Robinhood Chain for heroes who reach combat level ${minL}. Minted only here in the game, one per hero. Its number is your hero number, so there’s only ever one of each. Whoever holds one gets the <b class="flamet">Founder’s Flame</b> in the game: a light colour no one else has.</p>
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
// ---------- the world map (the globe under the compass): see-through, so the game keeps going underneath ----------
const WM_COL={[GRASS]:'#38b764',[PATH]:'#d9a066',[WATER]:'#3b5dc9',[SOIL]:'#6b3e26',[DOCK]:'#a0663b',[WILDG]:'#5a5634',[WPATH]:'#6e5844',[GLOOM]:'#2e2f5c',
  [MGRASS]:'#2f6b55',[DGRASS]:'#243f45',[MOSS]:'#3a6a42',[WG1]:'#36a160',[WG2]:'#33895b',[WG3]:'#317a57',[WPATH2]:'#a08a68',[MPATH]:'#8a8572',[PLAZA]:'#3d3856',[MOON]:'#3a5ab0',[CANOPY]:'#0f1f1c',[CLIFF]:'#1a1826',[FLOOR]:'#566c86',[WALL]:'#0d0e17'};
function miniBase(m){if(m.mini)return m.mini;const c=document.createElement('canvas');c.width=m.w;c.height=m.h;const x=c.getContext('2d'),id=x.createImageData(m.w,m.h);
  for(let y=0;y<m.h;y++)for(let i=0;i<m.w;i++){let t=tAt(m,i,y),col=WM_COL[t]||'#0d0e17';if(m.kind==='delve'){col=t===FLOOR?(BIOMES[m.biome]||BIOMES.moss).floor[2]:'#0b0c14';}
    else if(solidAt(m,i,y)&&(t===GRASS||t===PATH||t===MGRASS||t===WILDG||t===PLAZA||t===DGRASS))col='#1d2a24';const [r,g2,b]=hex(col);const k=(y*m.w+i)*4;id.data[k]=r;id.data[k+1]=g2;id.data[k+2]=b;id.data[k+3]=255;}
  x.putImageData(id,0,0);m.mini=c;return c;}
let wmOpen=false,wmT=0;
// v0.13.4: the map zooms (pinch on a phone, the scroll wheel or the + / − buttons on a computer) and pans by dragging.
// WM.z is the zoom (1 = the whole map), WM.tx/ty the offset in CSS pixels; WM.bw/bh the map's size at zoom 1.
const WM={z:1,tx:0,ty:0,bw:0,bh:0,max:6};
function toggleMap(force){wmOpen=force===undefined?!wmOpen:force;$('wmap').hidden=!wmOpen;$('mapB').setAttribute('aria-pressed',String(wmOpen));if(wmOpen){WM.z=1;WM.tx=WM.ty=0;drawMap();wmApply();sfx('pick');}}
// keep the map inside its window, and show it at the current zoom
function wmApply(){const v=$('wmV'),c=$('wmC');WM.tx=Math.min(0,Math.max(WM.bw-WM.bw*WM.z,WM.tx));WM.ty=Math.min(0,Math.max(WM.bh-WM.bh*WM.z,WM.ty));
  c.style.transform=`translate(${WM.tx}px,${WM.ty}px) scale(${WM.z})`;v.style.width=WM.bw+'px';v.style.height=WM.bh+'px';
  $('wmIn').disabled=WM.z>=WM.max-.01;$('wmOut').disabled=WM.z<=1.01;}
// zoom to z, keeping the point (px,py) (CSS pixels inside the map window) where it is
let wmRedraw=0;
function wmZoom(z,px,py){z=Math.max(1,Math.min(WM.max,z));const mx=(px-WM.tx)/WM.z,my=(py-WM.ty)/WM.z;WM.z=z;WM.tx=px-mx*z;WM.ty=py-my*z;wmApply();
  if(!wmRedraw)wmRedraw=requestAnimationFrame(()=>{wmRedraw=0;drawMap();});}
function drawMap(){if(!wmOpen)return;const m=map,base=miniBase(m),cvm=$('wmC'),dl=scene==='delve';
  const availW=Math.min(innerWidth*.9,760),availH=innerHeight*(innerHeight<500?.7:.66),k0=Math.max(2,Math.floor(Math.min(availW/m.w,availH/m.h)*(window.devicePixelRatio||1)));
  // zoomed in, the map is drawn sharper (up to 4096 pixels across) so the land and the labels stay crisp; dots and labels
  // keep the same size on screen at any zoom (u)
  const dpr=window.devicePixelRatio||1,kk=Math.max(k0,Math.floor(k0*Math.min(WM.z,4096/(Math.max(m.w,m.h)*k0)))),u=kk/(k0*WM.z),k=k0*u;
  WM.bw=m.w*k0/dpr;WM.bh=m.h*k0/dpr;
  cvm.width=m.w*kk;cvm.height=m.h*kk;cvm.style.width=WM.bw+'px';cvm.style.height=WM.bh+'px';
  const x=cvm.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(base,0,0,m.w*kk,m.h*kk);
  const P2=(px,py)=>[px/T*kk,py/T*kk],dot=(px,py,r,c,ring)=>{const [X,Y]=P2(px,py);x.fillStyle=c;x.beginPath();x.arc(X,Y,r,0,Math.PI*2);x.fill();if(ring){x.strokeStyle=ring;x.lineWidth=Math.max(1,k/3);x.stroke();}};
  const label=(px,py,t,c,sz)=>{let [X,Y]=P2(px,py);x.font=`600 ${Math.round((sz||1)*Math.max(11,k*3.4))}px system-ui,-apple-system,"Segoe UI",sans-serif`;const hw=x.measureText(t).width/2+3;X=Math.max(hw,Math.min(cvm.width-hw,X));x.font=`600 ${Math.round((sz||1)*Math.max(11,k*3.4))}px system-ui,-apple-system,"Segoe UI",sans-serif`;x.textAlign='center';x.lineWidth=Math.max(2,k*.9);x.strokeStyle='rgba(10,12,24,.9)';x.strokeText(t,X,Y);x.fillStyle=c||'#f4f4f4';x.fillText(t,X,Y);};
  if(!dl){for(const o of m.objs){if(['bank','forge','kitchen','gate','bench','stall','press','board','maw','bankchest','obelisk'].includes(o.type)||o.npc==='reaper')dot(o.x,o.y-8,Math.max(2,k*.9),o.type==='maw'||o.npc==='reaper'?'#c79bf2':'#ffcd75');}
    const W0=WEST_X,mid=W0+13*T;label(mid,WILD_Y+12*T,'The Hold','#ffcd75',1.1);label(mid,WILD_Y-20*T,'The Wilderness','#ff8a8a',1.1);label(mid,WILD_Y-4*T,'PvP north of the wall','#ff8a8a',.75);
    const HY=WILD_Y;label(40*T,HY+30*T,'Hollowmere','#a7f0c8',1.3);label(40*T,HY+66*T,'Moonmere','#d8d0ff',.9);label(9*T+8,HY+19*T,'Abyssal Maw','#c79bf2',.85);label(80*T,HY+20*T,'Hollow Wood','#a7f070',.8);
    label(42*T,HY+4*T,'Meadows · Lv 3–8','#a7f070',.75);label(14*T,HY+60*T,'Marsh · Lv 9–14','#ffcd75',.75);label(67*T,HY+65*T,'Fens · Lv 12–16','#ffcd75',.75);label(75*T,HY+108*T,'Deepwood · Lv 15–20','#ff8a8a',.75);label(25*T,HY+118*T,'Mossy Barrows · Lv 22–28','#ff8a8a',.75);label(48*T,WILD_Y-20*T,'Cliffs','#6d7391',.8);
    const g0=m.objs.find(o=>o.type==='gate');if(g0)label(g0.x,g0.y-26,'Delve Gate','#ffcd75',.8);}
  else{if(m.stairs&&!m.stairs.hidden)dot(m.stairs.tx*T+8,m.stairs.ty*T+8,Math.max(3,k*1.2),'#ffffff','#1a1c2c');for(const o of m.objs)if(o.type==='chest'&&!o.open)dot(o.x,o.y-6,Math.max(2,k*.9),o.tier==='u'?'#a7f070':'#ffcd75');}
  for(const o of OTH.values())if(!o.pend)dot(o.x,o.y-4,Math.max(2.5,k*.9),'#f4f4f4','#1a1c2c');
  const pu=.6+.4*Math.sin(time*5);dot(P.x,P.y-4,Math.max(5,k*2.4)*(1+.25*pu),'rgba(255,205,117,.35)');dot(P.x,P.y-4,Math.max(3.5,k*1.4),'#ffcd75','#1a1c2c');
  {const [X,Y]=P2(P.x,P.y-4);x.font=`700 ${Math.max(12,Math.round(k*3.4))}px system-ui,sans-serif`;x.textAlign='center';x.lineWidth=3;x.strokeStyle='#1a1c2c';x.strokeText('You',X,Y-Math.max(8,k*3));x.fillStyle='#ffcd75';x.fillText('You',X,Y-Math.max(8,k*3));}
  $('wmH').textContent=matchMedia('(pointer:coarse)').matches?'Pinch to zoom · drag to look around · double-tap to zoom':'Scroll to zoom · drag to look around · double-click to zoom';$('wmT').textContent=dl?'Floor '+run.floor:'World map';$('wmS').textContent=dl?BIOMES[m.biome].name:inWild()?'You are in the Wilderness, level '+wildLvl(P.y):inWest()?'You are in Hollowmere':'You are in the Hold';
  $('wmL').innerHTML=dl?'<span><i style="background:#ffcd75"></i>You</span><span><i style="background:#fff"></i>Stairs down</span><span><i style="background:#ffcd75"></i>Chest</span><span><i style="background:#a7f070"></i>Uncommon chest</span>'
    :'<span><i style="background:#ffcd75;box-shadow:0 0 0 2px #1a1c2c"></i>You</span><span><i style="background:#f4f4f4"></i>Other players</span><span><i style="background:#c79bf2"></i>Raid gate</span>';}
$('mapB').addEventListener('click',()=>{if(started)toggleMap();});$('wmX').addEventListener('click',e=>{e.stopPropagation();toggleMap(false);});
$('wmap').addEventListener('click',e=>{if(e.target===$('wmap'))toggleMap(false);});   // only a tap outside the map closes it
$('wmIn').addEventListener('click',e=>{e.stopPropagation();wmZoom(WM.z*1.6,WM.bw/2,WM.bh/2);});$('wmOut').addEventListener('click',e=>{e.stopPropagation();wmZoom(WM.z/1.6,WM.bw/2,WM.bh/2);});
{const v=$('wmV'),pts=new Map();let pinch=null,drag=null,lastTap=0;
  const rel=e=>{const r=v.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
  // the scroll wheel (or a trackpad pinch, which arrives as a wheel with ctrlKey) zooms around the pointer
  v.addEventListener('wheel',e=>{e.preventDefault();e.stopPropagation();const [px,py]=rel(e),d=e.deltaMode===1?e.deltaY*16:e.deltaY;wmZoom(WM.z*Math.exp(-d*(e.ctrlKey?.01:.0018)),px,py);},{passive:false});
  v.addEventListener('pointerdown',e=>{e.preventDefault();v.setPointerCapture(e.pointerId);pts.set(e.pointerId,rel(e));
    if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1])||1,z:WM.z};drag=null;}
    else if(pts.size===1){const [px,py]=rel(e),now=performance.now();
      if(now-lastTap<300){wmZoom(WM.z>1.5?1:2.5,px,py);lastTap=0;return;}   // double tap: zoom in there, or back out
      lastTap=now;drag={x:px,y:py,tx:WM.tx,ty:WM.ty};}});
  v.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,rel(e));
    if(pinch&&pts.size>=2){const [a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1])||1;wmZoom(pinch.z*d/pinch.d,(a[0]+b[0])/2,(a[1]+b[1])/2);}
    else if(drag&&WM.z>1){const [px,py]=rel(e);WM.tx=drag.tx+px-drag.x;WM.ty=drag.ty+py-drag.y;v.classList.add('drag');wmApply();}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){drag=null;v.classList.remove('drag');}
    else if(pts.size===1){const [p]=[...pts.values()];drag={x:p[0],y:p[1],tx:WM.tx,ty:WM.ty};}};
  v.addEventListener('pointerup',up);v.addEventListener('pointercancel',up);v.addEventListener('click',e=>e.stopPropagation());}
addEventListener('keydown',e=>{if(!started||e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return;if(e.code==='KeyG'&&!e.repeat)toggleMap();else if(e.code==='Escape'&&wmOpen)toggleMap(false);});
// ---------- the spellbook: pick the spell your attack casts ----------
function openSpells(){const ml=lvlOf('magic'),cur=curSpell();
  openSheet(`<h2>Spellbook</h2>${skillLine('magic')}<p class="lead small">With a staff in hand, your attack casts this spell. Combat spells need no runes: your staff powers them. Better staffs and robes hit harder.</p>
   <div class="list">${Object.entries(SPELLS).map(([k,sp])=>{const lock=ml<sp.lvl;return `<button class="item spell${k===cur?' on':''}" data-sp="${k}" ${lock?'disabled':''} aria-pressed="${k===cur}"><i class="ic spic" style="--sc:${sp.col}">✦</i><span><b>${sp.n}${k===cur?' · selected':''}</b><small>${lock?'<span class="lockt">Needs Magic '+sp.lvl+'</span> · ':''}Hits up to ${spellMax(k)}${sp.aoe?' · hits everything close by':''}${sp.slow?' · slows':''}${sp.chain?' · chains':''}${sp.pierce?' · pierces '+sp.pierce:''}</small><small>${sp.d}</small></span></button>`;}).join('')}</div>
   <div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();$('sheet').querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>{S.spell=b.dataset.sp;save();sfx('cast');toast(SPELLS[S.spell].n+' ready','good');openSpells();});}
// ---------- Enchanting (Magic): runes from the rune bag + a worn ring or amulet ----------
const enchStat=en=>Object.entries(en.a).map(([a,v])=>ATTR_TXT[a](Math.round(v*100)/100)).join(' · ');
function rollEnchant(sp){const E=ENCHANTS[sp],pool=E.pool.slice(),out={};
  for(let i=0;i<E.k&&pool.length;i++){const k=pool.splice(ri(0,pool.length-1),1)[0],[lo,hi]=ENCH_ATTR[k],v=(lo+(hi-lo)*Math.pow(rand(),1.4))*E.tier;out[k]=v<1&&k!=='regen'?Math.max(1,Math.round(v)):k==='regen'?Math.round(v*100)/100:Math.round(v);}return out;}
function openEnchant(slot){const k=S.gear[slot];if(!k)return openHero();const ml=lvlOf('magic'),en=S.ench[slot]&&S.ench[slot].id===k?S.ench[slot]:null;
  const need=E=>Object.entries(E.runes).map(([r,n])=>`<span class="${runeN(r)>=n?'ok':'no'}">${iconImg(r+'_rune')}${runeN(r)}/${n}</span>`).join('');
  openSheet(`<h2>Enchant your ${slot}</h2>${skillLine('magic')}
   <div class="gear">${iconImg(k)}<span><small>${slot==='ring'?'Ring':'Amulet'}</small><b>${ITEMS[k].n}</b><small>${jewelStat(k)}</small>${en?`<small style="color:#c79bf2">Enchanted: ${enchStat(en)}</small>`:'<small>Not enchanted yet</small>'}</span></div>
   <p class="lead small">Each spell rolls its own kind of bonus. Casting again rerolls it (the old roll is replaced). The enchantment stays on this ${slot} while you wear it, and fades if you take it off or swap it. Bonuses work everywhere except Wilderness fights.</p>
   ${en?(()=>{const top=Object.keys(en.a).every(k=>en.a[k]>=enchTop(en.s,k)),prev=Object.keys(en.a).map(k=>ATTR_TXT[k](enchTop(en.s,k))).join(' · ');
     return `<div class="recipe crown"><div class="rh">${iconImg(RELIC_CROWN)}<span><b>${top?'Crowned':'Crown this enchantment'}</b><small>${top?'Every bonus is at the most '+ENCHANTS[en.s].n+' can roll.':'Spend a Hollow Crown and every bonus rises to the most '+ENCHANTS[en.s].n+' can roll: '+prev+'. Casting a new enchantment replaces it.'}</small></span>${top?'':`<span class="mk"><button class="btn sm" id="crownB" ${has(RELIC_CROWN)?'':'disabled'}>Crown</button></span>`}</div>${top?'':`<div class="need"><span class="${has(RELIC_CROWN)?'ok':'no'}">${iconImg(RELIC_CROWN)}${avail(RELIC_CROWN)}/1</span></div>`}</div>`;})():''}
   <div class="list">${Object.entries(ENCHANTS).map(([sp,E])=>{const lock=ml<E.lvl,can=!lock&&Object.entries(E.runes).every(([r,n])=>runeN(r)>=n);
     return `<div class="recipe${lock?' locked':''}"><div class="rh"><i class="ic spic" style="--sc:#c79bf2">✧</i><span><b>${E.n}</b><small>${lock?'<span class="lockt">Needs Magic '+E.lvl+'</span> · ':''}${E.k} bonus${E.k>1?'es':''} from: ${E.pool.map(a=>({hp:'health',def:'defense',dmg:'damage',mag:'spell damage',luck:'loot luck',oil:'oil',light:'light',spd:'speed',regen:'regeneration',fishXp:'Fishing XP',chopXp:'Woodcutting XP'})[a]).join(', ')} · ${E.xp} xp</small></span><span class="mk"><button class="btn sm" data-en="${sp}" ${can?'':'disabled'}>Cast</button></span></div><div class="need">${need(E)}</div></div>`;}).join('')}</div>
   <p class="lead small">Runes drop from monsters and chests (Soul and Star Runes only that way). Tallow sells Gale, Stone, Tide and Ember Runes.</p>
   <div class="row"><button class="btn alt" id="back">Back</button></div>`);
  $('back').onclick=()=>openHero();
  if($('crownB'))$('crownB').onclick=()=>{const e=S.ench[slot];if(!e||e.id!==S.gear[slot]||!has(RELIC_CROWN))return;take(RELIC_CROWN,1);for(const a of Object.keys(e.a))e.a[a]=enchTop(e.s,a);bump('crowned');P.hp=Math.min(P.hp,hpMax());
    sfx('rare');buzz([40,30,40,30,90]);puff(P.x,P.y-12,'#ffcd75',26);SPFX.push({k:'cataclysm',x:P.x,y:P.y-8,t:0,life:.6,R:18,c:'#ffcd75',c2:'#c79bf2'});toast('Crowned: '+enchStat(e),'rare r-legendary');save(true);openEnchant(slot);};
  $('sheet').querySelectorAll('[data-en]').forEach(b=>b.onclick=()=>{const sp=b.dataset.en,E=ENCHANTS[sp];if(lvlOf('magic')<E.lvl||!Object.entries(E.runes).every(([r,n])=>runeN(r)>=n))return;
    for(const [r,n] of Object.entries(E.runes)){S.runes[r+'_rune']-=n;if(S.runes[r+'_rune']<=0)delete S.runes[r+'_rune'];}
    S.ench[slot]={id:k,s:sp,a:rollEnchant(sp)};skillXp('magic',E.xp);bump('enchants');S.flags.enchanted=true;P.hp=Math.min(P.hp,hpMax());
    sfx('rare');buzz([30,40,30]);puff(P.x,P.y-12,'#c79bf2',22);SPFX.push({k:'starfall',x:P.x,y:P.y-8,t:0,life:.6,R:18,c:'#c79bf2',c2:'#f1e4ff'});save();toast(E.n+': '+enchStat(S.ench[slot]),'rare r-xrare');openEnchant(slot);});}
function openRuneInfo(id){const k=ITEMS[id].rune,n=S.runes[id]||0,uses=Object.values(ENCHANTS).filter(E=>E.runes[k]).map(E=>E.n);
  openSheet(`<div class="itemhd"><img class="big" alt="" src="${iconOf(id).toDataURL()}"><span><b>${ITEMS[id].n}</b><small>${fmt(n)} in your rune bag</small></span></div>
   <ul class="info"><li>Used by: ${uses.join(', ')||'nothing yet'}</li><li>${k==='soul'||k==='star'?'Found only on monsters and in chests, more often deep down.':'Dropped by monsters, found in chests, sold by Tallow.'}</li><li>Runes live in your rune bag: they never take bank space and are never lost when you fall.</li></ul>
   <div class="row"><button class="btn alt" id="back">Back to items</button></div>`);$('back').onclick=()=>openBag();}
// ---------- Quests (v0.13): All Hallows' Lantern, given by Mordecai the Reaper where the Hollow Wood ends ----------
const qState=id=>S.quests[id]||(S.quests[id]={s:0,n:0,done:false});
const qStep=id=>{const q=S.quests[id],Q=QUESTS[id];return q&&q.done?null:Q.steps[q?q.s:0].id;};
const questOpen=()=>Object.keys(QUESTS).some(k=>{const q=S.quests[k];return q&&q.s>0&&!q.done;});
function qAdvance(id){const q=qState(id),Q=QUESTS[id];q.s++;q.n=0;const nx=Q.steps[q.s];bump('qsteps');sfx('pick');
  if(nx)setTimeout(()=>toast('Quest: '+nx.t+(nx.n?' (0/'+nx.n+')':''),'good'),250);save();}
// Hollowmere kills that count toward the quest: wolves, then lost souls from anything out there
function questKill(e){const st=qStep('hallow'),q=S.quests.hallow;if(!q)return;
  if(st==='wolves'&&e.type==='wolf'){q.n++;floatText(e.x,e.y-26,'Wolves '+q.n+'/6','#ffcd75');if(q.n>=6)qAdvance('hallow');else save();}
  else if(st==='souls'&&rand()<.45){q.n++;floatText(e.x,e.y-26,'+1 Lost Soul','#c79bf2');puff(e.x,e.y-10,'#c79bf2',16);sfx('rare',.5);if(q.n>=3)qAdvance('hallow');else save();}}
// a bobbing "!" (something to do here) or "?" (come back to me) over a quest NPC
function questMark(o){const st=qStep('hallow');let m=null;
  if(o.npc==='reaper')m=st==='talk'?'!':st==='return'?'?':null;else if(o.npc==='wick')m=st==='light'?'!':null;else if(o.name==='Tallow')m=st==='gourd'?'!':null;
  if(!m)return;const b=Math.round(Math.sin(time*4)*1.5),y=o.y-(o.npc==='reaper'?54:o.npc==='wick'?62:50)+b;ptDraw(g,m,o.x+1,y,{font:'big',color:'#ffcd75',bg:'#1a1c2c'});}
const reaperHead=()=>`<div class="rhead"><img alt="" src="${ART.reaper[0].toDataURL()}" style="width:136px;image-rendering:pixelated"></div>`;
function openReaper(){const q=qState('hallow'),Q=QUESTS.hallow,st=qStep('hallow');sfx('pick');
  const steps=`<p class="lead small">Track it any time under Hero → Quests.</p>`;
  if(st==='talk'){openSheet(`${reaperHead()}<h2>Mordecai the Reaper</h2><p class="lead">“Ah. A living one, out on the edge of the wood. Don’t be afraid. On All Hallows’ Eve the veil grows thin, and the lost souls of Hollowmere wander out of the mist. It is my task to lead them home.”</p>
      <p class="lead">“But my lantern has gone out, and souls follow only a light. Bring me a hollow gourd from the Hold. Have the old keeper of flames light it. Drive off the wolves that howl the souls away, and gather three of the lost ones for me. Do this, and the lantern is yours to wear, and my scythe besides.”</p>
      <div class="soon fnd"><b>${Q.n}</b><p>A Halloween quest. Rewards: the <b>Jack-o’-Lantern</b> (worn over your helmet) and the <b>Reaper’s Scythe</b> (shown over your blade or staff), two soulbound cosmetics.</p></div>
      <div class="row"><button class="btn alt" id="sx">Not now</button><button class="btn" id="qok">I’ll help</button></div>`);
    $('sx').onclick=closeSheet;$('qok').onclick=()=>{qAdvance('hallow');closeSheet();toast('Quest started: '+Q.n,'rare r-xrare');};return;}
  if(st==='return'){openSheet(`${reaperHead()}<h2>Mordecai the Reaper</h2><p class="lead">“The lantern burns, and the souls are drawn to it like moths. Listen: they are quiet now. They will find their way home tonight.”</p>
      <p class="lead">“You have my thanks. Keep the lantern: wear it, and its flame will never go out. And take my scythe. I have carried it for a thousand Hallows’ Eves… I think I can spare it for one night.”</p>
      <div class="row"><button class="btn" id="qok">Take the lantern and the scythe</button></div>`);
    $('qok').onclick=()=>{q.s=Q.steps.length;q.done=true;q.n=0;for(const k of Q.rewards)if(!S.cos.own.includes(k))S.cos.own.push(k);bump('quests');sfx('rare');buzz([60,40,60,40,120]);puff(P.x,P.y-12,'#c79bf2',36);
      floatText(P.x,P.y-40,'Quest complete!','#a7f070');save(true);
      openSheet(`<h2>Quest complete</h2><div class="cosgift">${Q.rewards.map(k=>cosIcon(k,72)).join('')}</div><p class="lead">${Q.n}: done. The <b>Jack-o’-Lantern</b> and the <b>Reaper’s Scythe</b> are yours, bound to your hero. They can never be traded, dropped or lost.</p><p class="lead small">Cosmetics show over your helmet and weapon, and those still work underneath.</p>
        <div class="row"><button class="btn alt" id="sx">Later</button><button class="btn" id="qw">Wear it now</button></div>`);$('sx').onclick=closeSheet;$('qw').onclick=()=>{S.cos.head='jack_lantern';S.cos.weapon='reaper_scythe';save();sfx('rare');puff(P.x,P.y-12,'#c79bf2',22);openBag('cos');};};return;}
  if(q.done){openSheet(`${reaperHead()}<h2>Mordecai the Reaper</h2><p class="lead">“The souls rest easier, thanks to you. ${S.cos.head==='jack_lantern'?'The lantern suits you. It grins like it knows a secret.':'Your lantern and scythe wait for you under Hero → Cosmetics.'} Mind the mist out there, little light.”</p><div class="row"><button class="btn" id="sx">Farewell</button></div>`);$('sx').onclick=closeSheet;return;}
  const say={gourd:'“A hollow gourd. Tallow, the trader in the Hold, keeps all sorts in that cart of his.”',light:'“Take the gourd to the old keeper of flames: Wick, by the road to the Delve Gate. His lantern never goes out.”',
    wolves:`“The wolves in the meadows howl the souls back into the mist. Drive them off. (${q.n}/6)”`,souls:`“Now the souls. They cling to the beasts of Hollowmere. Defeat them and the lantern will draw the souls out. (${q.n}/3)”`}[st];
  openSheet(`${reaperHead()}<h2>Mordecai the Reaper</h2><p class="lead">${say}</p>${steps}<div class="row"><button class="btn" id="sx">I’m on it</button></div>`);$('sx').onclick=closeSheet;}
function openQuestTalk(who){const Q=QUESTS.hallow;
  if(who==='tallow'){openSheet(`<h2>Tallow</h2><p class="lead">“A hollow gourd? For the Reaper? Well, I don’t ask questions, I just sell lanterns. Here, take this one. It’s on the house, given who it’s for. Gives me the shivers, that one.”</p><p class="lead small">You get a hollow gourd.</p><div class="row"><button class="btn" id="qok">Thanks, Tallow</button></div>`);
    $('qok').onclick=()=>{qAdvance('hallow');closeSheet();};return;}
  if(who==='wick'){openSheet(`<div class="rhead"><img alt="" src="${ART.wick[0].toDataURL()}" style="width:90px;image-rendering:pixelated"></div><h2>Wick</h2><p class="lead">“Mordecai’s lantern went out? Then the souls are wandering, and that won’t do on All Hallows’ Eve. Hold the gourd still…”</p><p class="lead">He touches his lantern to the gourd. A cold violet flame catches inside it and grins out through the carved face.</p><p class="lead small">The gourd is now a lit jack-o’-lantern.</p><div class="row"><button class="btn" id="qok">Thank you, Wick</button></div>`);
    $('qok').onclick=()=>{qAdvance('hallow');closeSheet();puff(P.x,P.y-12,'#c79bf2',18);};return;}}
// the Quests tab: each quest is red until it's done, then green; finished steps are crossed out
function questTab(){return `<p class="lead small">Quests are stories told by the people of Lanternhold. Talk to them to start one; finished steps are crossed out.</p>`+Object.entries(QUESTS).map(([k,Q])=>{const q=S.quests[k]||{s:0,n:0},done=!!q.done,C=Q.rewards.map(r=>COSMETICS[r].n).join(' and ');
  return `<div class="quest ${done?'qdone':'qtodo'}"><div class="qh"><b>${Q.n}</b><span class="qtag">${Q.tag}</span><small>${done?'Completed':q.s?'In progress':'Not started'}</small></div><p class="small">From ${Q.giver}${q.s?'':' · find him where the Hollow Wood ends, west of the Hold'}</p>
    <ol class="qsteps">${Q.steps.map((st,i)=>`<li class="${done||i<q.s?'qx':i===q.s?'qcur':'qnext'}">${st.t}${st.n&&i===q.s&&!done?` <em>${q.n}/${st.n}</em>`:''}</li>`).join('')}</ol>
    <p class="small">Rewards: <b>${C}</b>, soulbound cosmetics${done?' · <span style="color:#a7f070">received</span>':''}</p></div>`;}).join('');}
// the Cosmetics tab: two slots shown over your gear (your armour and helmet stay on underneath)
// a cosmetic's picture: the hero wearing it (head), or the scythe itself (weapon)
const cosIcon=(k,w)=>{const C=COSMETICS[k],c=document.createElement('canvas');
  if(C.slot==='weapon'){c.width=24;c.height=24;c.getContext('2d').drawImage(ART.scythe,0,0);}
  else{c.width=16;c.height=16;c.getContext('2d').drawImage(heroImg(Object.assign({},S.look,{ch:C.look}),'down',0),0,0);}
  return `<img class="ic" alt="" src="${c.toDataURL()}"${w?` style="width:${w}px;height:${w}px"`:''}>`;};
// the preview: you, with your weapon (or its cosmetic) at your side
function cosPreview(){const c=document.createElement('canvas');c.width=32;c.height=28;const x=c.getContext('2d'),sw=S.cos.weapon?ART.scythe:ART.sword[S.gear.blade]||ART.sword.rusty;
  x.drawImage(heroImg(myLook(),'down',0),6,10);x.save();x.translate(21,22);x.rotate(-Math.PI/2+.45+Math.PI/4);x.drawImage(sw,-2,-(sw.hy||14));x.restore();return c.toDataURL();}
function cosTab(){
  const slot=sl=>{const cur=S.cos[sl],own=S.cos.own.filter(k=>COSMETICS[k].slot===sl);return `<div class="gear">${cur?cosIcon(cur):'<i class="ic blank"></i>'}<span><small>${sl==='head'?'Head (over your helmet)':'Weapon (over your blade or staff)'}</small><b>${cur?COSMETICS[cur].n:'Nothing'}</b><small>${cur?COSMETICS[cur].d:own.length?'You have '+own.length+' to wear':'No '+sl+' cosmetics yet'}</small></span>${cur?`<button class="btn alt sm" data-cos="${sl}:">Take off</button>`:''}</div>
    ${own.filter(k=>k!==cur).map(k=>`<div class="gear">${cosIcon(k)}<span><small>Soulbound</small><b>${COSMETICS[k].n}</b><small>${COSMETICS[k].d}</small></span><button class="btn sm" data-cos="${sl}:${k}">Wear</button></div>`).join('')}`;};
  return `<div class="hero cosprev"><img class="ic" alt="" src="${cosPreview()}" style="width:112px;height:98px"><span><b>How you look</b><small>Cosmetics always show over your helmet and weapon. What you wear for stats stays equipped underneath.</small></span></div>
    <div class="gears">${COS_SLOTS.map(slot).join('')}</div><p class="lead small">Cosmetics are soulbound to your hero: they can’t be traded, dropped, sold or lost, even in the Wilderness. Complete quests to earn them.</p>`;}
// ---------- the Abyssal Maw (the raid dungeon) and the Hollowmere sign ----------
// Raids (Season 1), as designed: a world event for the whole server, one every hour. Players from every world join the
// same raid; it starts only with at least 10 players in the raid queue. Admins can always enter, for testing.
function openRaid(){bump('maw');sfx('boss');
  openSheet(`<div class="rhead"><img alt="" src="${ART.maw[0].toDataURL()}"></div><h2>The Abyssal Maw</h2><p class="lead">The jaw of the great skull burns with violet fire. Something vast is breathing on the other side, and the stone hums under your feet.</p>
   <div class="soon fnd"><b>World raids are coming in Season 1</b><p>Beyond the Maw waits Lanternhold’s raid dungeon, with its own bosses and its own treasure. Every raid is a world event for the whole server.</p>
    <ul class="info"><li><b>One raid every hour.</b> When it goes live, everyone in the game hears about it.</li><li><b>Every world, together.</b> Players from every world can join the same raid at the same time.</li><li><b>Join the raid queue here.</b> A raid begins once at least 10 players are queued.</li></ul></div>
   <p class="lead small">The plaza around the Maw is safe: no monster dens nearby. The Bank Chest beside it works just like the Bank.</p><div class="row"><button class="btn" id="sx">Step back</button></div>`);$('sx').onclick=closeSheet;}
function openHmSign(){openSheet(`<h2>Hollowmere</h2><p class="lead">A great moor at dusk, past the Hollow Wood, around the Moonmere lake. Lamp posts mark the roads.</p>
   <ul class="info"><li><b>Monsters roam here.</b> Get too close and they attack. Ravens at the wood's edge: levels 2–4. The meadows: 3–8. The marsh (west): 9–14. The fens (east of the lake): 12–16. The deepwood (south-east): 15–20. The Mossy Barrows (south-west), where the mossy giants walk: 22–28.</li>
   <li>Willows grow all over the moor (Woodcutting 30).</li>
   <li>Falling here costs nothing: you wake up at the Hold.</li><li>Fish for Moonfin off the dock in the middle of the Moonmere (Fishing 30).</li>
   <li>In the far north-west stands the Abyssal Maw, where hourly world raids begin in Season 1, with a Bank Chest beside it.</li></ul><div class="row"><button class="btn" id="sx">Onward</button></div>`);$('sx').onclick=closeSheet;}
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
  if(P.cast>0)P.cast-=dt;if(P.castLaunch>0){P.castLaunch-=dt;if(P.castLaunch<=0){const t=P.castTgt&&!P.castTgt.dead?P.castTgt:null,tip=staffTip(P.x,P.y,P.dir);launchBolt(P.castSp,tip,t?Math.atan2((t.y-(t.d.big?12:6))-tip.y,t.x-tip.x):P.castA,t,true);}}
  updateBolts(dt);updateSpellFx(dt);
  // context
  const ctx=nearestAct();setActLabel(ctx);
  if(aPressed){aPressed=false;if(ctx)doAct(ctx);else if(scene==='delve'||inWest())swing();else if(inWild())pvpSwing();}
  if(inWild()){if(retHeld&&P.hp>0){if(wildLvl(P.y)>RETURN_MAX){P.chan=0;if(time-whyT>2){whyT=time;toast('Too deep for the Return Flame. Head south of Wilderness level '+RETURN_MAX+'.','bad');}}else{P.chan+=dt;if(P.chan>=2){retHeld=false;P.chan=0;wildReturn();}}}else P.chan=0;}
  else if(scene==='hold')P.chan=0;
  if(scene==='hold'){wildStep(dt);westStep(dt);updateFishing(dt);updateChop(dt);updateCook(dt);updateDrops(dt);for(const o of HOLD.trees||[])if(o.shake>0)o.shake-=dt;}
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
    if(!MP.client())oreTick();
    updateDrops(dt);
  }
  for(const f of fx){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=90*dt;}fx=fx.filter(f=>f.t<f.life);
  for(const t of texts)t.t+=dt;texts=texts.filter(t=>t.t<.9);
  if(shake>0)shake=Math.max(0,shake-dt*12);
  for(const k of slashes)k.t+=dt;if(slashes.length)slashes=slashes.filter(k=>k.t<.16);
  if(P.swing>0&&(S.gear.blade==='ember'||S.gear.blade==='cinder')&&!reduceMotion&&rand()<.7){const t=easeOut(1-P.swing/.2),base={down:Math.PI*.5,up:-Math.PI*.5,left:Math.PI,right:0}[P.dir]||0,a=base-1.2+t*2.4;
    fx.push({x:P.x+Math.cos(a)*14,y:P.y-6+Math.sin(a)*14,vx:(rand()-.5)*20,vy:-20-rand()*25,t:0,life:.3+rand()*.2,col:rand()<.5?'#ff9f3d':'#ffcd75'});}
  if(wmOpen){wmT-=dt;if(wmT<=0){wmT=.25;drawMap();}}
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
    const TG=nearestTarget(e),dx=TG.x-e.x,dy=TG.y-e.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,sp=e.d.spd*(e.slowT>0?.5:1);let vx=0,vy=0;if(e.slowT>0)e.slowT-=dt;
    if(e.d.proj){projStep(e,dt);continue;}
    if(e.west&&westIdle(e,d,dt))continue;
    e.losT=(e.losT||0)-dt;if(e.losT<=0){e.losT=.25;e.los=d<(e.d.boss?400:130)&&lineOfSight(e.x,e.y-6,TG.x,TG.y-6);if(e.los)e.mem=3;}
    e.mem=(e.mem||0)-dt;const sees=e.west?true:e.d.ai==='flutter'?d<130:(e.los||e.mem>0);
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
      // The Drowned Archmage: keeps its distance, throws fans of tide bolts at you, blinks away when you close in and
      // freezes the floor around it (a ring of frost shows the reach). Calls grimoires. Below half health: wider fans, faster.
      case 'archmage':{const fast=e.hp<e.max/2;e.cd-=dt;e.vo=(e.vo??2)-dt;e.nv=(e.nv??6)-dt;e.sm=(e.sm??8)-dt;e.bl=(e.bl??5)-dt;
        if(e.st==='novaw'){e.tgK=1-e.cd/e.wind;if(e.cd<=0)bossBlast(e,50,'#73eff7');}
        else if(e.st==='blast'){if(e.cd<=0){e.st='idle';e.tg=0;e.aoeR=0;e.cd=.6;}}
        else if(e.st==='volw'){if(e.cd<=0){const n=fast?5:3,a0=Math.atan2(dy,dx);for(let i=0;i<n;i++){const a=a0+(i-(n-1)/2)*.32;ents.push(projOf('orb',e.x+Math.cos(a)*10,e.y-8+Math.sin(a)*8,a,e.dmgSc));}sfx('cast');e.st='idle';e.cd=.4;}}
        else{const want=d<70?-1:d>130?1:0;vx=ux*sp*want+(-uy)*sp*.6*Math.sin(e.t*.8);vy=uy*sp*want+ux*sp*.6*Math.sin(e.t*.8);
          if(d<46&&e.bl<=0){const a=Math.atan2(e.y-TG.y,e.x-TG.x)+(rand()-.5),nx=TG.x+Math.cos(a)*110,ny=TG.y+Math.sin(a)*110;puff(e.x,e.y-12,'#73eff7',14);if(!blocked(nx,ny,8)){e.x=nx;e.y=ny;}puff(e.x,e.y-12,'#b8f7ff',14);sfx('stairs',.6);e.bl=fast?3:4.5;}
          else if(e.nv<=0&&d<70){e.st='novaw';e.wind=e.cd=fast?.7:.9;e.tg=1;e.tgR=50;e.tgK=0;e.nv=fast?5:7;}
          else if(e.vo<=0&&d<220){e.st='volw';e.cd=.35;e.flash=.35;e.vo=fast?1.6:2.4;}}
        if(e.sm<=0){e.sm=fast?9:12;if(ents.filter(o=>o.type==='tome'&&!o.dead).length<3)for(let i=0;i<2;i++)ents.push(makeEnemy('tome',e.x+(i?22:-22),e.y,e.dmgSc));puff(e.x,e.y-12,'#73eff7',12);}break;}
      // The Hollow King: walks you down, slams the floor (a violet ring), charges, and tears rifts open under your feet.
      // Below half health it also throws rings of void bolts, and calls husks.
      case 'hollowking':{const fast=e.hp<e.max/2;e.cd-=dt;e.sl=(e.sl??4)-dt;e.rf=(e.rf??3)-dt;e.rg=(e.rg??6)-dt;e.sm=(e.sm??9)-dt;
        if(e.st==='slamw'){e.tgK=1-e.cd/e.wind;if(e.cd<=0)bossBlast(e,52,'#c79bf2');}
        else if(e.st==='blast'){if(e.cd<=0){e.st='idle';e.tg=0;e.aoeR=0;e.cd=.8;}}
        else if(e.st==='wind'){if(e.cd<=0){e.st='charge';e.cd=.55;e.vx=ux*sp*4.4;e.vy=uy*sp*4.4;}}
        else if(e.st==='charge'){vx=e.vx;vy=e.vy;if(e.cd<=0){e.st='idle';e.cd=fast?1.4:2.2;}}
        else{vx=ux*sp;vy=uy*sp;if(e.sl<=0&&d<100){e.st='slamw';e.wind=e.cd=fast?.7:.95;e.tg=1;e.tgR=52;e.tgK=0;e.sl=fast?3.4:4.8;}else if(e.cd<=0&&d<170&&d>60){e.st='wind';e.cd=.55;e.flash=.55;}}
        if(e.rf<=0){e.rf=fast?2.2:3.2;const n=fast?3:2;for(let i=0;i<n;i++){const a=rand()*Math.PI*2,r=i?14+rand()*26:0;ents.push(projOf('rift',TG.x+Math.cos(a)*r,TG.y+Math.sin(a)*r,0,e.dmgSc));}}
        if(fast&&e.rg<=0){e.rg=5;for(let i=0;i<10;i++){const a=i/10*Math.PI*2;ents.push(projOf('vorb',e.x+Math.cos(a)*12,e.y-10+Math.sin(a)*8,a,e.dmgSc));}sfx('boss');}
        if(e.sm<=0){e.sm=fast?8:11;if(ents.filter(o=>o.type==='husk'&&!o.dead).length<3)for(let i=0;i<2;i++)ents.push(makeEnemy('husk',e.x+(i?22:-22),e.y+6,e.dmgSc));puff(e.x,e.y-12,'#c79bf2',12);}break;}
    }
    if(e.side>0){e.side-=dt;const px=-vy,py=vx;vx=vx*.3+px*e.sd;vy=vy*.3+py*e.sd;}
    const ox=e.x,oy=e.y;moveBody(e,vx*dt,vy*dt,e.r>6?8:4);
    if((vx||vy)&&Math.hypot(e.x-ox,e.y-oy)<Math.hypot(vx,vy)*dt*.2&&!(e.side>0)){e.side=.5;e.sd=rand()<.5?1:-1;}
    // contact
    let dmg=e.d.dmg*(1+.08*(e.dmgSc-1)/.12);if(e.st==='charge')dmg*=1.4;if(e.aoeR)dmg*=1.5;const cd=Math.hypot(P.x-e.x,(P.y-4)-(e.y-e.r));if(cd<(e.aoeR||e.r)+6)hurtPlayer(dmg,e);if(OTH.size&&scene==='delve')MP.contact(e,dmg);
  }
  ents=ents.filter(e=>!e.dead);
}

// boss attacks that fly or open on the floor: they hurt whoever they touch and can't be hit back
function projOf(type,x,y,a,sc){const e=makeEnemy(type,x,y,sc);e.a=a;e.life=type==='rift'?1.25:2.6;e.r=4;if(type==='rift'){e.tg=1;e.tgR=16;e.tgK=0;e.st='open';}return e;}
function projStep(e,dt){e.t+=dt;e.life-=dt;
  if(e.type==='rift'){if(e.st==='open'){e.tgK=Math.min(1,1-(e.life-.25)/1);if(e.life<=.25){e.st='burst';e.tg=2;e.aoeR=16;blastFx(e,16,'#c79bf2');}}
    else if(e.life<=0)e.dead=true;if(e.st==='burst'&&Math.hypot(P.x-e.x,(P.y-4)-e.y)<20)hurtPlayer(e.d.dmg*(1+.08*(e.dmgSc-1)/.12),e);if(e.st==='burst'&&OTH.size&&scene==='delve')MP.contact(e,e.d.dmg*(1+.08*(e.dmgSc-1)/.12));return;}
  const sp=e.d.spd;const nx=e.x+Math.cos(e.a)*sp*dt,ny=e.y+Math.sin(e.a)*sp*dt;if(solidAt(map,Math.floor(nx/T),Math.floor(ny/T))||e.life<=0){e.dead=true;puff(e.x,e.y-6,e.type==='vorb'?'#c79bf2':'#73eff7',5);return;}e.x=nx;e.y=ny;
  if(Math.hypot(P.x-e.x,(P.y-6)-(e.y-4))<9){hurtPlayer(e.d.dmg*(1+.08*(e.dmgSc-1)/.12),e);e.dead=true;puff(e.x,e.y-6,'#ffffff',6);}else if(OTH.size&&scene==='delve')MP.contact(e,e.d.dmg*(1+.08*(e.dmgSc-1)/.12));}
// ---------- Hollowmere: dens, aggro, respawns ----------
const WEST_NAMES={wolf:'Moor Wolf',boar:'Bristleboar',bogling:'Bogling',mirewisp:'Mirewisp',treant:'Deepwood Treant',raven:'Carrion Raven',gloomstag:'Gloomstag',mossgiant:'Mossy Giant'};
let wasWest=false;
function westStep(dt){const now=Date.now(),w=inWest();
  if(w!==wasWest){wasWest=w;P.hp=Math.min(P.hp,hpMax());if(w){bump('hmvisit');if(!S.flags.hmseen){S.flags.hmseen=true;setTimeout(()=>toast('Hollowmere. Monsters here attack if you get close. The road and the Maw are safe.','good'),400);}}else for(const e of ents)if(e.west){e.aggro=false;e.ret=true;}}
  if(P.x>WEST_X+260&&!ents.length)return;
  for(const d of HOLD.dens){const far=Math.hypot(d.x-P.x,d.y-P.y);
    if(d.e&&!d.e.dead&&far>720&&!d.e.aggro){const i=ents.indexOf(d.e);if(i>=0)ents.splice(i,1);d.e=null;continue;}   // out of sight: back to its den
    if(d.e&&!d.e.dead)continue;if(d.e){d.e=null;d.next=now+(18+d.lvl*1.2)*1000;}
    if(now>=(d.next||0)&&far>120&&far<640){const sc=1+.1*(d.lvl-3),e=makeEnemy(d.type,d.x,d.y,sc);Object.assign(e,{west:true,den:d,home:{x:d.x,y:d.y},lvl:d.lvl,wt:rand()*2});ents.push(e);d.e=e;}}
  if(inWest()&&P.hp>0&&time-(P.hitT??-99)>6&&P.hp<hpMax())P.hp=Math.min(hpMax(),P.hp+3*dt);
  updateEnemies(dt);}
// out of a fight a Hollowmere monster wanders near its den; get too close (or hit it) and it comes for you
// the plaza of the Abyssal Maw is safe ground: monsters won't follow you onto it
const mawSafe=()=>{const o=HOLD.maw||(HOLD.maw=HOLD.objs.find(q=>q.type==='maw'));return !!o&&Math.abs(P.x-o.x)<7*T&&P.y>o.y-6*T&&P.y<o.y+5*T;};
function westIdle(e,d,dt){const fh=Math.hypot(e.x-e.home.x,e.y-e.home.y),sp=e.d.spd,safe=mawSafe();
  if(e.aggro&&(fh>170||P.hp<=0||!inWest()||safe)){e.aggro=false;e.ret=true;}
  if(!e.aggro&&!e.ret&&inWest()&&!safe&&P.hp>0&&d<44+e.lvl*1.4&&lineOfSight(e.x,e.y-6,P.x,P.y-6)){e.aggro=true;e.flash=.15;}
  if(e.aggro)return false;
  let vx=0,vy=0;if(e.ret){const a=Math.atan2(e.home.y-e.y,e.home.x-e.x);vx=Math.cos(a)*sp*.9;vy=Math.sin(a)*sp*.9;if(fh<8){e.ret=false;e.hp=e.max;e.st='idle';e.tg=0;}}
  else{e.wt-=dt;if(e.wt<=0){e.wt=1.5+rand()*3;e.wa=rand()<.45?null:fh>40?Math.atan2(e.home.y-e.y,e.home.x-e.x):rand()*Math.PI*2;}if(e.wa!=null){vx=Math.cos(e.wa)*sp*.3;vy=Math.sin(e.wa)*sp*.3;}}
  moveBody(e,vx*dt,vy*dt,4);return true;}
function westDie(){setTimeout(()=>save(true),50);sfx('die');buzz(200);S.deaths++;bump('hmdeaths');FISHING=null;CHOP=null;BOLTS=[];
  for(const e of ents)if(e.west){e.aggro=false;e.ret=true;}respawnHold();P.inv=2;save();
  openSheet(`<h2>Knocked out in Hollowmere</h2><p class="lead">You woke up back at the Hold. Nothing was lost: out in Hollowmere a fall only costs you the walk back.</p><p class="lead small">The monsters there are levels 2 to 28. The ravens at the edge of the Hollow Wood and the meadows are the gentlest; the deepwood and the Mossy Barrows are not.</p><div class="row"><button class="btn" id="sx">Back on my feet</button></div>`);$('sx').onclick=closeSheet;}
// ---------- HUD ----------
let lastAct=null;
function setActLabel(a){const lab=a?a.label:(scene==='delve'||inWest()?(staffOn()?'Cast':'Attack'):inWild()?'Attack':'');if(lab!==lastAct){lastAct=lab;$('bAl').textContent=lab;$('bA').classList.toggle('ctx',!!a);$('bA').classList.toggle('idle',!lab);}}
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
  $('where').textContent=scene==='hold'?(inWild()?'Wilderness '+wildLvl(P.y):inWest()?'Hollowmere':'The Hold')+(MP.room&&MP.room[0]==='w'?(NET.roomOpen()?' · World '+MP.room.slice(1):' · reconnecting…'):netOn()?' · connecting…':''):'F'+run.floor+' · '+BIOMES[map.biome].name+(MP.shared()?' · party':'');
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
  if(scene==='hold'){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const tt=tAt(map,x,y);if(tt===MOON||tt===DOCK&&x<WEST_COLS){g.drawImage(ART.moonw[(wf+x+y)%2],x*T,y*T);if(tt===MOON){g.fillStyle='#b8a7ff';if(!isWater(tAt(map,x,y-1))&&tAt(map,x,y-1)!==DOCK)g.fillRect(x*T,y*T,T,1);g.fillStyle='#10223f';if(!isWater(tAt(map,x,y+1))&&tAt(map,x,y+1)!==DOCK)g.fillRect(x*T,y*T+T-2,T,2);}}else if(tt===WATER||tt===DOCK)g.drawImage(ART.water[(wf+x)%2],x*T,y*T);else if(tt===GLOOM){g.drawImage(ART.gloom[(wf+x)%2],x*T,y*T);g.fillStyle='#8a7aa8';if(!isWater(tAt(map,x,y-1)))g.fillRect(x*T,y*T,T,1);if(!isWater(tAt(map,x-1,y)))g.fillRect(x*T,y*T,1,T);if(!isWater(tAt(map,x+1,y)))g.fillRect(x*T+T-1,y*T,1,T);g.fillStyle='#1d1a2a';if(!isWater(tAt(map,x,y+1)))g.fillRect(x*T,y*T+T-2,T,2);}
      if(tt===DOCK){let run=1;for(let k=1;k<4&&tAt(map,x-k,y)===DOCK;k++)run++;for(let k=1;k<4&&tAt(map,x+k,y)===DOCK;k++)run++;g.drawImage(run>=3?ART.dock.deck:ART.dock.walk,x*T,y*T);}}   // a walkway (1–2 planks wide) or the platform
    for(const [lx,ly,lf] of map.lilies||[])g.drawImage(ART.lily[lf],lx*T+4+Math.round(Math.sin(time*.8+lx)*.6),ly*T+5);
    {const open=plotsOpen();for(const p of map.plots)if(p.i>=open&&!S.plots[p.i])g.drawImage(ART.soilLocked,p.tx*T,p.ty*T);}
    for(const p of map.plots){const st=S.plots[p.i];if(!st)continue;const gr=growth(st),stg=gr>=1?2:gr>=.5?1:0;spr(ART.crop[st.crop][stg],p.cx-8,p.cy-10);
      if(gr>=1&&Math.floor(time*3)%2)g.fillStyle='#f4f4f4',g.fillRect(p.cx+5,p.cy-12,1,1);
      else if(gr<1){g.fillStyle='#1a1c2c';g.fillRect(p.cx-8,p.cy+6,16,2);g.fillStyle='#a7f070';g.fillRect(p.cx-8,p.cy+6,Math.round(16*gr),2);}}}
  const vis=o=>o.x>cx-60&&o.x<cx+VW+60&&o.y>cy-20&&o.y<cy+VH+70;
  for(const o of map.objs){if(!o.flat||!vis(o))continue;if(o.type==='flowers')spr(ART.flowers[o.v],o.x-8,o.y-15);else if(o.type==='bones')spr(ART.bones,o.x-8,o.y-15);else if(o.type==='wbones')spr(ART.wbones[o.v],o.x-8,o.y-15);else if(o.type==='weed')spr(ART.weed[o.v],o.x-8,o.y-15);else if(o.type==='cinders')spr(ART.cinders[(o.v+Math.floor(time*2+o.x))%2],o.x-8,o.y-15);else if(o.type==='reeds')spr(ART.reeds[o.v],o.x-8+(reduceMotion?0:Math.round(Math.sin(time*1.3+o.x*.1)*.6)),o.y-15);else if(o.type==='mushring')spr(ART.mushring,o.x-8,o.y-15);}
  if(scene==='hold'&&cy<WILD_Y)wildShade(cx,cy);
  for(const o of map.objs){if(!o.onWall||o.gone||!vis(o))continue;const [tx,ty]=o.tile;
    if(o.type==='ore'){if(o.kind==='ember'){spr(ART.emberOre[Math.floor(time*2.5+tx)%2],tx*T,ty*T);for(let k=0;k<2;k++){const ph=(time*.7+k*.5+tx*.37)%1;g.fillStyle=ph<.5?'#ffcd75':'#ff9f3d';g.globalAlpha=1-ph;g.fillRect(Math.round(tx*T+5+k*6+Math.sin(time*3+k+tx)*1.5),Math.round(ty*T+6-ph*10),1,1);}g.globalAlpha=1;}else if(o.kind==='starshard'){spr(ART.starOre[Math.floor(time*2+tx)%2],tx*T,ty*T);const ph=(time*.9+tx*.31)%1;g.globalAlpha=1-ph;g.fillStyle=ph<.5?'#fff3c4':'#73eff7';g.fillRect(Math.round(tx*T+8+Math.sin(time*2+tx)*4),Math.round(ty*T+5-ph*8),1,1);g.globalAlpha=1;}else{const SH=ORE_SHINE[o.kind];if(SH&&!reduceMotion){const pu=.5+.5*Math.sin(time*2.2+tx*1.3),X=tx*T+8,Y=ty*T+8,R=11+pu*3,gr=g.createRadialGradient(X,Y,0,X,Y,R);g.save();g.globalCompositeOperation='lighter';gr.addColorStop(0,`rgba(${SH},${.22+.18*pu})`);gr.addColorStop(1,`rgba(${SH},0)`);g.fillStyle=gr;g.fillRect(X-R,Y-R,R*2,R*2);g.restore();}
      spr(ART.ore[o.kind]||ART.ore.copper,tx*T,ty*T);const ph=(time*.8+tx*.37+ty*.21)%1.6;if(ph<.25){const k=1-Math.abs(ph-.125)/.125,gx=tx*T+5+((tx*7)%6),gy=ty*T+5+((ty*5)%5);g.globalAlpha=k;g.fillStyle='#ffffff';g.fillRect(gx,gy,1,1);g.fillRect(gx-1,gy,3,1);g.fillRect(gx,gy-1,1,3);g.globalAlpha=1;}}}else if(o.type==='torch')spr(ART.torch[Math.floor(time*6+tx)%2],tx*T+4,ty*T+2);}
  // y-sorted
  const list=[];
  for(const o of map.objs)if(!o.flat&&!o.onWall&&!o.gone&&vis(o))list.push({y:o.sortY??o.y,f:()=>drawObj(o)});   // sortY: drawn as if further back (the Delve Gate, so players walking into it stay on top)
  for(const e of ents)list.push({y:e.y,f:()=>drawEnemy(e)});
  for(const o of OTH.values())if(!o.pend)list.push({y:o.y,f:()=>{const ax=o.chopT>0&&scene==='hold',ph=time/.85+o.id.length*.3;if(ax&&axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look);const wb=scene==='hold'&&(o.y<WILD_Y||inHollowmere(o.x,o.y)),sw=o.swT>0&&(scene==='delve'||wb),swB=sw&&(o.dir==='up'||o.dir==='left'),bl=(o.look&&o.look.blade)||'rusty',ocw=o.look&&o.look.cw;const [lx,ly]=sw&&!reduceMotion?lungeOff(o.dir,o.swT):[0,0],dun=scene==='delve',hd=(dun||wb)&&!sw&&!ax&&!o.fish&&!(o.castT>0),ox=o.x+lx,oy=o.y+ly,ol=dun&&((o.look&&o.look.flame==='founder'?ART.lanternF:ART.lantern)[(o.look&&o.look.lan)||'basic']||ART.lantern.basic),llx=o.dir==='left'?-9:o.dir==='right'?4:o.dir==='up'?3:-9;if(ol&&o.dir==='up')spr(ol,ox+llx,oy-9);if(hd&&o.dir!=='down')drawHeldBlade(ox,oy,o.dir,bl,o.moving,o.anim,ocw);if(swB)drawSwingAt(ox,oy,o.dir,o.swT,bl,ocw);drawHero(ox,oy,o.dir,o.moving,o.anim,o.look,o.name,o);if(o.castT>0)drawCastPose(ox,oy,o.dir,o.castT,o.castSp,bl,ocw);if(ol&&o.dir!=='up')spr(ol,ox+llx,oy-9+Math.round(Math.sin(time*5+o.x)));if(hd&&o.dir==='down')drawHeldBlade(ox,oy,o.dir,bl,o.moving,o.anim,ocw);if(sw&&!swB)drawSwingAt(ox,oy,o.dir,o.swT,bl,ocw);if(ax&&axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look,true);if(o.fish&&scene==='hold')drawFishing(o.fish,o.x,o.y);if(ax&&!axeBehind(ph))drawAxe(o.x,o.y,o.dir,ph,o.look);}});
  for(const d of drops)if(dropShown(d))list.push({y:d.y,f:()=>{const b=Math.sin(d.t*6)*1;const R=rc(d.id);if(R){g.globalAlpha=.28+.12*Math.sin(time*4);g.fillStyle=R.c;g.fillRect(Math.round(d.x-1),Math.round(d.y-44),3,40);g.globalAlpha=.5;g.fillRect(Math.round(d.x-4),Math.round(d.y-1),9,2);g.globalAlpha=1;}g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(d.x-3),Math.round(d.y),6,1);spr(iconOf(d.id),d.x-8,d.y-14-d.z+b);}});
  list.push({y:P.y,f:drawPlayer});
  list.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  if(scene==='hold'&&!reduceMotion)drawAmbient(cx,cy,x0,y0,x1,y1);
  if(scene==='hold'&&cx<WEST_X)drawHollowmere(cx,cy,x0,y0,x1,y1);
  drawBolts();
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
// ---- Hollowmere at dusk: a cool twilight over the moor, fireflies, moonlight on the lake, the Maw breathing violet fire ----
function drawHollowmere(cx,cy,x0,y0,x1,y1){const t=time,right=Math.min(cx+VW,WEST_X),top=Math.max(cy,WILD_Y);if(right<=cx)return;
  // dusk falls slowly as you walk west through the Hollow Wood: none at the Hold's edge, full twilight where the moor begins
  g.save();const D0=WOOD_X+2*T,gr=g.createLinearGradient(D0,0,WEST_X,0);g.fillStyle='rgba(18,26,58,.24)';if(D0>cx)g.fillRect(cx,top,Math.min(right,D0)-cx,cy+VH-top);
  gr.addColorStop(0,'rgba(18,26,58,.24)');gr.addColorStop(.55,'rgba(18,26,58,.1)');gr.addColorStop(1,'rgba(18,26,58,0)');g.fillStyle=gr;const a0=Math.max(cx,D0);if(right>a0)g.fillRect(a0,top,right-a0,cy+VH-top);
  g.globalCompositeOperation='lighter';
  const pool=(X,Y,R,c,a)=>{const q=g.createRadialGradient(X,Y,0,X,Y,R);q.addColorStop(0,`rgba(${c},${a})`);q.addColorStop(1,`rgba(${c},0)`);g.fillStyle=q;g.fillRect(X-R,Y-R,R*2,R*2);};
  for(const o of map.objs){if(o.x>right+80||o.x<cx-80||o.y<cy-40||o.y>cy+VH+120)continue;
    if(o.type==='maw'){const f=.85+.15*Math.sin(t*3);pool(o.x,o.y-26,52*f,'199,155,242',.34);pool(o.x-63,o.y-108,16*f,'199,155,242',.5);pool(o.x+63,o.y-108,16*f,'199,155,242',.5);pool(o.x-18,o.y-75,9,'255,77,109',.6*f);pool(o.x+18,o.y-75,9,'255,77,109',.6*f);
      // embers and runes rising out of the portal, and a slow swirl in it
      for(let k=0;k<14;k++){const ph=(t*.35+k/14)%1,x=o.x+Math.sin(ph*7+k*1.9)*16*(1-ph*.4),y=o.y-20-ph*70;g.globalAlpha=(1-ph)*.9;g.fillStyle=k%3?'#c79bf2':'#f1e4ff';g.fillRect(Math.round(x),Math.round(y),1,k%4?1:2);}
      for(let k=0;k<10;k++){const a=t*1.6+k/10*Math.PI*2,r=6+(k%3)*4;g.globalAlpha=.6;g.fillStyle=k%2?'#f1e4ff':'#7a3b8f';g.fillRect(Math.round(o.x+Math.cos(a)*r*1.4),Math.round(o.y-24+Math.sin(a)*r*.7),1,1);}g.globalAlpha=1;}
    else if(o.type==='campfire'){const f=.8+.2*Math.sin(t*11+Math.sin(t*5));pool(o.x,o.y-6,30*f,'255,150,70',.35);}
    else if(o.type==='lpost'){const f=.85+.15*Math.sin(t*9+o.x);pool(o.x-1,o.y-24,18*f,'255,190,100',.3);}
    else if(o.type==='pumpkin'){const f=.75+.25*Math.sin(t*13+o.x+Math.sin(t*4));pool(o.x,o.y-6,16*f,'255,160,60',.42);}
    else if(o.npc==='reaper'){pool(o.x,o.y-22,24+3*Math.sin(t*2),'199,155,242',.22);pool(o.x-4,o.y-24,5,'232,208,255',.5+.3*Math.sin(t*3));}
    else if(o.type==='mcrystal')pool(o.x,o.y-10,16+2*Math.sin(t*2+o.x),'184,167,255',.28);
    else if(o.type==='menhir')pool(o.x,o.y-16,12,o.v?'199,155,242':'115,239,247',.22+.1*Math.sin(t*2+o.x));}
  // fireflies drifting over the moor
  for(let i=0;i<90;i++){const bx=(i*173.7)%(WOOD_X-60)+30,by=WILD_Y+((i*97.3)%(HM_ROWS*T-60))+30,x=bx+Math.sin(t*.4+i)*22,y=by+Math.cos(t*.53+i*1.7)*14;if(x<cx-4||x>right||y<cy-4||y>cy+VH)continue;
    const on=.5+.5*Math.sin(t*3+i*2.3);if(on<.25)continue;pool(x,y,4,'200,255,140',.35*on);g.globalAlpha=on;g.fillStyle='#e8ffb0';g.fillRect(Math.round(x),Math.round(y),1,1);g.globalAlpha=1;}
  // moonlight glinting on the Moonmere
  const tick=Math.floor(t*2);for(let y=Math.max(y0,HM_Y0);y<=y1;y++)for(let x=x0;x<=Math.min(x1,WEST_COLS);x++)if(tAt(map,x,y)===MOON&&((x*31+y*57+tick*5)%19)===0){g.globalAlpha=.8;g.fillStyle=(x+y)%2?'#f1e4ff':'#b8f7ff';g.fillRect(x*T+((x*5+tick)%12)+2,y*T+((y*3+tick*3)%12)+2,2,1);g.globalAlpha=1;}
  g.restore();}
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
  else if(o.type==='bench')spr(ART.bench[Math.floor(time*2)%2],o.x-16,o.y-26);
  else if(o.type==='board'){spr(ART.board,o.x-16,o.y-32);if(bulletinNew()){const b=Math.round(Math.sin(time*4)*1.5);g.fillStyle='#1a1c2c';g.fillRect(Math.round(o.x-3),Math.round(o.y-46+b),7,9);g.fillStyle='#ffcd75';g.fillRect(Math.round(o.x-2),Math.round(o.y-45+b),5,7);g.fillStyle='#b13e53';g.fillRect(Math.round(o.x),Math.round(o.y-44+b),1,3);g.fillRect(Math.round(o.x),Math.round(o.y-40+b),1,1);}}
  else if(o.type==='stall')spr(ART.stall,o.x-20,o.y-30);
  else if(o.type==='npc'&&o.npc==='reaper'){const fr=Math.floor(time*1.2)%2;spr(ART.reaper[fr],o.x-13,o.y-35);TAGS.push({x:o.x,y:o.y-43,name:o.name,npc:true});questMark(o);}
  else if(o.type==='npc'){const W=o.npc==='wick',fr=Math.floor(time*1.6+Math.sin(time*.7)+(W?.5:0))%2;spr((W?ART.wick:ART.merchant)[fr],o.x-13,o.y-29);questMark(o);TAGS.push({x:o.x,y:o.y-37,name:o.name,npc:true});
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
  else if(o.type==='chest'){if(o.tier==='u'){if(!o.open&&!reduceMotion){g.save();g.globalCompositeOperation='lighter';const X=Math.round(o.x),Y=Math.round(o.y-8),R=14+2*Math.sin(time*3),gr=g.createRadialGradient(X,Y,0,X,Y,R);gr.addColorStop(0,'rgba(167,240,112,.45)');gr.addColorStop(1,'rgba(167,240,112,0)');g.fillStyle=gr;g.fillRect(X-R,Y-R,R*2,R*2);g.restore();
      for(let k=0;k<3;k++){const ph=(time*.6+k/3)%1;g.globalAlpha=1-ph;g.fillStyle=k%2?'#a7f070':'#e8fff8';g.fillRect(Math.round(o.x-5+k*5+Math.sin(ph*6+k)*1.5),Math.round(o.y-12-ph*12),1,1);}g.globalAlpha=1;}spr(ART.uchest[o.open?1:0],o.x-8,o.y-14);}else spr(ART.chest[o.open?1:0],o.x-8,o.y-14);}
  else if(o.type==='maw'){const fl=Math.floor(time*3)%2;spr(ART.maw[fl],o.x-72,o.y-126);}
  else if(o.type==='bankchest')spr(ART.bankChest,o.x-12,o.y-18);
  else if(o.type==='campfire')spr(ART.campfire[Math.floor(time*6)%2],o.x-8,o.y-15);
  else if(o.type==='menhir'){spr(ART.menhir[o.v],o.x-8,o.y-30);if(!reduceMotion){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25+.15*Math.sin(time*2+o.x);g.fillStyle=o.v?'#c79bf2':'#73eff7';g.fillRect(Math.round(o.x-2),Math.round(o.y-20),4,9);g.restore();}}
  else if(o.type==='lpost'){const fl=Math.floor(time*5+o.x)%2;spr(ART.lanternPost[fl],o.x-7,o.y-28);}
  else if(o.type==='pumpkin')spr(ART.pumpkin[o.v],o.x-8,o.y-15);
  else if(o.type==='barrow')spr(ART.barrow[o.v],o.x,o.y-19);
  else if(o.type==='hmsign')spr(ART.hmsign,o.x-9,o.y-22);
  else if(o.type==='willow'){if(o.chop&&!treeUp(o))spr(ART.stump,o.x-16,o.y-30);else{const k=o.shake>0?Math.round(Math.sin(time*60)):0,sw=reduceMotion?0:Math.sin(time*.9+o.x*.05);spr(sw>.6?ART.willowSway[1]:sw<-.7?ART.willowSway[0]:ART.willow,o.x-16+k,o.y-38);
    if(o.chop&&(CHOP&&CHOP.o===o||o.shake>0)&&o.logs<TREES[o.kind].logs){const w=Math.round(20*o.logs/TREES[o.kind].logs);g.fillStyle='rgba(26,28,44,.8)';g.fillRect(o.x-11,o.y-42,22,4);g.fillStyle='#d9a066';g.fillRect(o.x-10,o.y-41,w,2);}}}
  else if(o.type==='mcrystal'){spr(ART.mcrystal[o.v],o.x-8,o.y-20);if(!reduceMotion){const ph=(time*.5+o.x*.013)%1;g.globalAlpha=(1-ph)*.9;g.fillStyle='#f1e4ff';g.fillRect(Math.round(o.x-3+o.v*5),Math.round(o.y-16-ph*10),1,1);g.globalAlpha=1;}}
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
// The Jack-o'-Lantern's flame: the carved face flickers violet-white, a soft violet light spills around the head, and
// now and then a violet ember drifts up out of the stem.
function drawJack(x,y,dir,seed){if(dir==='up'&&reduceMotion)return;const X=Math.round(x)-8,Y=Math.round(y)-15,t=time*9+seed*7;
  const fl=reduceMotion?.8:.62+.22*Math.sin(t)+.16*Math.sin(t*2.7+1.3)+(Math.sin(t*.37)>.93?-.35:0);
  g.save();g.globalCompositeOperation='lighter';
  const cx=X+8+(dir==='left'?-3:dir==='right'?3:0),cy=Y+5,gr=g.createRadialGradient(cx,cy,0,cx,cy,13);
  gr.addColorStop(0,'rgba(199,155,242,'+(.34*fl)+')');gr.addColorStop(.5,'rgba(150,90,220,'+(.12*fl)+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(cx-13,cy-13,26,26);
  if(dir!=='up'){const F=dir==='down'?JACK_FACE.down:JACK_FACE.side;for(const [fx,fy,k] of F){const px=dir==='right'?15-fx:fx;g.globalAlpha=(k==='c'?.9:.55)*fl;g.fillStyle=k==='c'?'#ffffff':'#e0c4ff';g.fillRect(X+px,Y+fy,1,1);}}
  if(!reduceMotion){for(let i=0;i<2;i++){const ph=((time*.55+i*.5+seed)%1);if(ph>.7)continue;const ex=X+8+Math.sin((time+i)*3+seed)*1.5,ey=Y-1-ph*12;g.globalAlpha=(1-ph/.7)*.8;g.fillStyle=i?'#f3e3ff':'#b98cff';g.fillRect(Math.round(ex),Math.round(ey),1,1);}}
  g.restore();}
// The Reaper's Scythe at rest: cold soul-light around the blade, with a wisp curling off it.
function drawScytheGlow(hx,hy,a){const bx=hx+Math.cos(a)*19,by=hy+Math.sin(a)*19,p=.7+.3*Math.sin(time*3+hx*.1);
  g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(bx,by,0,bx,by,12);gr.addColorStop(0,'rgba(156,240,210,'+(.42*p)+')');gr.addColorStop(.55,'rgba(164,108,245,'+(.14*p)+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(bx-12,by-12,24,24);
  const ph=(time*.7+hx*.013)%1;g.globalAlpha=(1-ph)*.7;g.fillStyle=ph<.5?'#9cf0d2':'#c79bf2';g.fillRect(Math.round(bx-3+Math.sin(time*4)*2),Math.round(by-2-ph*9),1,1);g.restore();}
function drawHero(x,y,dir,moving,anim,look,name,npc,me){
  const fr=moving?1+Math.floor(anim*8)%2:0,img=heroImg(look,dir,fr);
  const au=look?auraColors(look,me?S.gear.lantern:look.lan||null):[];if(au.length)drawAura(x,y,au,(npc?npc.name.length:0));
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(Math.round(x-4),Math.round(y),8,1);
  const yb=moving&&!reduceMotion?-(Math.floor(anim*16)%2):0;   // a 1-px bob on each step
  const cb=look&&look.cape?capeLayer(look.cape,dir,moving?fr:0,false):null;if(cb)spr(cb,x-10,y-17+yb);
  spr(img,x-8,y-15+yb);if(look&&look.ch==='jack')drawJack(x,y+yb,dir,(npc?npc.name.length:0)+x*.01);
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
  const dun=scene!=='hold',casting=P.cast>0&&staffOn(),held=(dun||(inWild()||inWest())&&!CHOP&&!FISHING)&&!(P.swing>0)&&!casting;   // in the Depths: lantern in one hand, blade in the other, always (the Wilderness: blade drawn)
  if(d==='up'&&dun)spr(lan,P.x+lx,P.y+ly);if(casting&&d==='up')drawCastPose(P.x,P.y,d,P.cast,P.castSp,S.gear.blade,myCw());
  if(held&&d!=='down')drawHeldBlade(P.x,P.y,d,S.gear.blade,P.moving,P.anim,myCw());
  if(P.swing>0&&(d==='up'||d==='left'))drawSwing();
  const axPh=CHOP?CHOP.sw/.85:0;if(CHOP&&axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look);
  drawHero(P.x,P.y,d,P.moving,P.anim,look,scene==='hold'&&S.name?S.name:null,null,true);if(CHOP&&axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look,true);
  if(P.say&&time<P.sayUntil)TAGS.push({x:P.x,y:P.y-(ADMIN_HATS[S.gear.helm]?28:18)-(ADMIN||SET.pnames||inWild()?5:0)-(inWild()?9:0),say:P.say});
  if(d!=='up'&&dun)spr(lan,P.x+lx,P.y+ly+Math.round(Math.sin(time*5)));
  if(held&&d==='down')drawHeldBlade(P.x,P.y,d,S.gear.blade,P.moving,P.anim,myCw());if(casting&&d!=='up')drawCastPose(P.x,P.y,d,P.cast,P.castSp,S.gear.blade,myCw());
  if(P.swing>0&&!(d==='up'||d==='left'))drawSwing();
  drawFishing();drawCook();if(CHOP&&!axeBehind(axPh))drawAxe(P.x,P.y,P.dir,axPh,look);
}
function drawSwing(){drawSwingAt(P.x,P.y,P.dir,P.swing,S.gear.blade,myCw());}
const myCw=()=>S.cos&&S.cos.weapon?COSMETICS[S.cos.weapon].look:null;
// The blade at rest in the free hand (the lantern is in the other): tilted up, bobbing with each step, swaying a little.
// Facing down it's in front of the body; facing up or to the side it's held at the far side, behind.
const HELD={down:[4.5,-3,-Math.PI/2+.45],up:[-4.5,-3,-Math.PI/2-.45],left:[2,-4,-Math.PI/2+.6],right:[-2,-4,-Math.PI/2-.6]};
function drawHeldBlade(x,y,dir,blade,moving,anim,cw){const h=HELD[dir]||HELD.down,sc=cw==='scythe',sw=sc?(h[2]<-Math.PI/2?ART.scytheM:ART.scythe):ART.sword[blade]||ART.sword.rusty;   // the scythe's blade always hooks out over the tilt
  if(sc&&!reduceMotion)drawScytheGlow(x+h[0],y+h[1],h[2]);
  if(isStaff(blade)&&!sc&&!reduceMotion){const S2=STAFF_ART[blade]||STAFF_ART.apprentice,tx=x+h[0]+(dir==='left'?-4:dir==='right'?4:dir==='up'?-3:3),ty=y+h[1]-11,gr=g.createRadialGradient(tx,ty,0,tx,ty,6);g.save();g.globalCompositeOperation='lighter';gr.addColorStop(0,S2.g);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.45+.2*Math.sin(time*4+x);g.fillStyle=gr;g.fillRect(tx-6,ty-6,12,12);g.restore();}
  const bob=moving&&!reduceMotion?-(Math.floor(anim*16)%2):0,a=h[2]+(reduceMotion?0:moving?Math.sin(anim*16)*.09:Math.sin(time*1.8+x*.1)*.04);
  g.save();g.translate(Math.round(x+h[0]),Math.round(y+h[1]+bob));g.rotate(a+Math.PI/4);if(!sc)g.scale(.85,.85);g.drawImage(sw,-2,-(sw.hy||14));g.restore();}
function drawSwingAt(x,y,dir,left,blade,cw){const sc=cw==='scythe';const t=easeOut(Math.min(1,1-left/.2)),base={down:Math.PI*.5,up:-Math.PI*.5,left:Math.PI,right:0}[dir]||0,a0=base-1.2,a=a0+t*2.4;
  const sw=sc?ART.scythe:ART.sword[blade]||ART.sword.rusty,X=Math.round(x),Y=Math.round(y-6),col=sc?'#9cf0d2':BLADE_FX[blade]||'#f4f4f4',fade=1-t,rr=sc?1.35:1;
  // the smear: a crescent from where the swing started to the blade, brightest at the edge
  if(!reduceMotion&&a-a0>.15){g.save();g.globalCompositeOperation='lighter';
    for(const [r,w,al] of [[15,3,.22],[12,2,.32],[16,1,.6]]){g.strokeStyle=col;g.globalAlpha=al*fade+.05;g.lineWidth=w;g.beginPath();g.arc(X,Y,r*rr,Math.max(a0,a-1.5),a);g.stroke();}
    if(sc){g.strokeStyle='#c79bf2';g.globalAlpha=.45*fade;g.lineWidth=2;g.beginPath();g.arc(X,Y,18,Math.max(a0,a-1.1),a);g.stroke();}   // the scythe: a wide soul-green crescent with a violet edge
    g.restore();
    // afterimages of the blade
    for(const [k,al] of [[.5,.35],[1,.15]]){const b=a-k;if(b<a0)continue;g.save();g.globalAlpha=al*fade;g.translate(X,Y);g.rotate(b+Math.PI/4);g.drawImage(sw,-2,-(sw.hy||14));g.restore();}}
  g.save();g.translate(X,Y);g.rotate(a+Math.PI/4);g.drawImage(sw,-2,-(sw.hy||14));g.restore();
  if(t<.85){g.fillStyle=sc?'#9cf0d2':'#fff3c4';g.globalAlpha=fade;g.fillRect(Math.round(X+Math.cos(a)*15*rr),Math.round(Y+Math.sin(a)*15*rr),1,1);g.globalAlpha=1;}}   // a glint at the tip
// a hit: a bright slash across the target that flashes and fades
function drawSlashes(){for(const k of slashes){const p=k.t/.16,L=(k.big?14:9)*(.6+p*.6),cx=Math.round(k.x),cy=Math.round(k.y),dx=Math.cos(k.a),dy=Math.sin(k.a);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-p;g.strokeStyle='#fff3c4';g.lineWidth=p<.4?2:1;g.beginPath();g.moveTo(cx-dx*L,cy-dy*L);g.lineTo(cx+dx*L,cy+dy*L);g.stroke();
  g.strokeStyle=k.col;g.lineWidth=1;g.beginPath();g.moveTo(cx-dy*L*.5,cy+dx*L*.5);g.lineTo(cx+dy*L*.5,cy-dx*L*.5);g.stroke();
  if(p<.35){g.fillStyle='#ffffff';g.fillRect(cx-1,cy-1,3,3);}g.restore();}}
function drawEnemy(e){const a=ART[e.d.art],fr=Math.floor(e.t*4)%2,img=a[fr],big=e.d.big;
  if(e.tg){const R=e.tgR||44,X=Math.round(e.x),Y=Math.round(e.y-4),col=e.type==='warden'||e.type==='archmage'?'115,239,247':e.type==='hollowking'||e.type==='rift'?'199,155,242':'255,110,40';g.save();
    if(e.tg===1){const k=Math.min(1,e.tgK||0);g.fillStyle=`rgba(${col},${.08+.1*k})`;g.beginPath();g.ellipse(X,Y,R*k,R*k*.6,0,0,Math.PI*2);g.fill();g.strokeStyle=`rgba(${col},${.5+.4*Math.sin(time*20)})`;g.lineWidth=1;g.beginPath();g.ellipse(X,Y,R,R*.6,0,0,Math.PI*2);g.stroke();}
    else{g.fillStyle=`rgba(${col},.35)`;g.beginPath();g.ellipse(X,Y,R,R*.6,0,0,Math.PI*2);g.fill();}g.restore();}
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(Math.round(e.x-(big?10:4)),Math.round(e.y),big?20:8,1);
  const ox=big?16:8,oy=big?31:15;
  const sq=e.sq>0&&!reduceMotion?e.sq/.16:0;if(sq){g.save();g.translate(Math.round(e.x),Math.round(e.y));g.scale(1+sq*.25,1-sq*.2);g.translate(-Math.round(e.x),-Math.round(e.y));}
  if(e.flash>0&&Math.floor(e.flash*30)%2){g.save();g.filter='brightness(3)';spr(img,e.x-ox,e.y-oy);g.restore();}else spr(img,e.x-ox,e.y-oy);
  if(sq)g.restore();
  if(e.d.proj){if(e.type!=='rift'&&!reduceMotion){g.save();g.globalCompositeOperation='lighter';const X=Math.round(e.x),Y=Math.round(e.y-5),gr=g.createRadialGradient(X,Y,0,X,Y,9);gr.addColorStop(0,e.type==='vorb'?'rgba(199,155,242,.6)':'rgba(115,239,247,.6)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(X-9,Y-9,18,18);g.restore();}return;}
  if(e.west&&Math.hypot(e.x-P.x,e.y-P.y)<110)TAGS.push({x:e.x,y:e.y-oy-(e.hp<e.max?8:3),name:WEST_NAMES[e.type]||e.type,lv:e.lvl,mob:true});
  if(e.slowT>0){g.save();g.globalAlpha=.35;g.fillStyle='#73eff7';g.fillRect(Math.round(e.x-5),Math.round(e.y-oy+3),10,10);g.restore();}
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
  if(o.type==='chest'){o.open=true;o.act=null;const u=o.tier==='u';if(u)o.light=null;
    if(mine){sfx('chest');bump('chests');const f=run.floor,runes=(RUNE_DROPS[map.pack.id]||[]).map(([k,c,a,b])=>[k+'_rune',Math.min(1,c*(u?6:3)),a,b+(u?2:0)]);
      if(u){bump('uchests');sfx('rare');spawnLoot(o.x,o.y-4,[['gold',1,(6+f*3)*2,(14+f*5)*2],[map.pack.ore+'_ore',1,3,6],['lampseed',.6,1,3],['gem',.5,1,2],['oil',.6,1,2],['moonpetal_seed',.3,1,2],['glowcap_spore',.4,1,3],...chestGems(f).map(([k,c,a,b])=>[k,c*2.5,a,b]),...runes,['oil2',.07,1,1]]);dropGear(o.x,o.y-4,'uchest');}
      else{spawnLoot(o.x,o.y-4,[['gold',1,6+f*3,14+f*5],[map.pack.ore+'_ore',.8,1,3],['lampseed',.35,1,1],['gem',.2,1,1],['oil',.3,1,1],['glowcap_spore',.25,1,2],...chestGems(f),...runes]);dropGear(o.x,o.y-4,'chest');}}
    puff(o.x,o.y-6,u?'#a7f070':'#ffcd75',u?18:10);}
  else if(o.type==='glowcap'){o.gone=true;o.light=null;o.act=null;if(mine)spawnLoot(o.x,o.y-4,[['glowcap_spore',1,1,2]]);puff(o.x,o.y-4,'#e86fd0',8);}
  else if(o.type==='ore'){o.gone=true;o.light=null;o.back=Date.now()+(ORES[o.kind]||ORES.copper).respawn*1000;const ox=o.tile[0]*T,oy=o.tile[1]*T;if(mine){bump('ores');const OR=ORES[o.kind]||ORES.copper;spawnLoot(ox+8,oy+20,[[o.kind+'_ore',1,o.kind==='starshard'?1:2,o.kind==='starshard'?2:3],['gem',.06,1,1]]);skillXp('mining',OR.xp);floatText(ox+8,oy-6,'+'+OR.xp+' Mining xp','#c9a26b');}puff(ox+8,oy+12,'#ffcd75',10);}}
// special gems in chests, for jewelry: rubies and sapphires anywhere, emeralds from floor 6, diamonds from floor 11
const chestGems=f=>[['ruby',.07,1,1],['sapphire',.06,1,1]].concat(f>=6?[['emerald',.05,1,1]]:[],f>=11?[['diamond',.03,1,1]]:[]);
function mineOre(o,i,who){if(o.gone)return;o.hp--;if(o.hp<=0){objTaken(o,who);MP.objOut(i,o,who);}else MP.objOut(i,o,null);}
// mined-out veins grow back after a while (the harder the ore, the longer); the dungeon leader keeps the clock
function oreRegrow(i,o){o.gone=false;o.hp=(ORES[o.kind]||ORES.copper).hp;o.light=o.light0||null;o.back=0;const ox=o.tile[0]*T,oy=o.tile[1]*T;puff(ox+8,oy+12,'#c9a26b',8);}
// ores that would blend into the wall get a soft pulsing shine around them
const ORE_SHINE={coal:'220,228,255',cobalt:'90,170,255',iron:'230,240,255',copper:'255,170,110'};
function oreTick(){if(!map||!map.objs)return;const now=Date.now();map.objs.forEach((o,i)=>{if(o.type==='ore'&&o.gone&&o.back&&now>=o.back){oreRegrow(i,o);if(MP.shared())NET.send({t:'obj',o:i,open:0,gone:0,hp:o.hp,rs:1});}});}
MP.objOut=(i,o,by)=>{if(MP.shared())NET.send({t:'obj',o:i,open:o.open?1:0,gone:o.gone?1:0,hp:o.hp,by});};
function applyHit(e,d,a,who){if(e.west){e.aggro=true;e.ret=false;}e.hp-=d;e.dmgBy=e.dmgBy||{};e.dmgBy[who]=(e.dmgBy[who]||0)+d;e.flash=.12;const kk=e.d.boss?40:150;e.kb={x:Math.cos(a)*kk,y:Math.sin(a)*kk};if(e.hp<=0)killEnemy(e);}
function nearestTarget(e){let best={x:P.x,y:P.y},bd=Math.hypot(P.x-e.x,P.y-e.y);if(scene==='hold')return best;/* Hollowmere's monsters are yours alone */for(const o of OTH.values()){const d=Math.hypot(o.x-e.x,o.y-e.y);if(d<bd){bd=d;best=o;}}return best;}
MP.contact=(e,dmg)=>{const now=performance.now();e.hc=e.hc||{};for(const o of OTH.values()){if(Math.hypot(o.x-e.x,(o.y-4)-(e.y-e.r))<(e.aoeR||e.r)+6&&now-(e.hc[o.id]||0)>700){e.hc[o.id]=now;NET.send({t:'hurt',to:o.id,d:Math.round(dmg),x:Math.round(e.x),y:Math.round(e.y)});}}};
MP.askDown=()=>{const h=OTH.get(MP.host);toast((h?h.name:'Your host')+' leads the way down. Wait at the stairs.');if(!MP.downT||time-MP.downT>4){MP.downT=time;NET.send({t:'down'});}};
// the room always learns the floor (solo too): a reconnect asks the room which floor you're on, so it must never be stale
MP.floorOut=f=>{if(netOn()&&MP.inInst()&&NET.roomOpen())NET.send({t:'floor',f});};
// followers: monsters come from the host's snapshots and glide to their new spots
function followEnemies(dt){for(const e of ents){e.t+=dt;if(e.flash>0)e.flash-=dt;if(e.sq>0)e.sq-=dt;if(e.tx!=null){const k=Math.min(1,dt*12);e.x+=(e.tx-e.x)*k;e.y+=(e.ty-e.y)*k;}}ents=ents.filter(e=>!e.dead);}
// ---- per-frame: send my position (10x a second at most, only when it changed), glide other players, host sends monsters ----
MP.tick=dt=>{
  for(const o of OTH.values()){const k=Math.min(1,dt*10),dx=o.tx-o.x,dy=o.ty-o.y;if(Math.abs(dx)>40||Math.abs(dy)>40){o.x=o.tx;o.y=o.ty;}else{o.x+=dx*k;o.y+=dy*k;}
    if(o.moving)o.anim+=dt;if(o.sayT>0)o.sayT-=dt;if(o.fish)o.fish.t+=dt;if(o.chopT>0)o.chopT-=dt;if(o.swT>0)o.swT-=dt;if(o.castT>0)o.castT-=dt;
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
      // a reconnect: you lead the dungeon, so the room follows you (older rooms could remember an earlier floor);
      // a party member follows the leader's floor
      if(run&&m.floor&&m.floor!==run.floor){if(MP.host===MP.id){NET.send({t:'floor',f:run.floor});NET.lsend({t:'where',room:m.room,floor:run.floor});}else enterFloor(m.floor);}
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
  NET.onR('H',m=>{if(m.id===MP.id){if(inWild())P.hp=Math.min(hpMax(),m.hp);}else{const o=OTH.get(m.id);if(o){o.hp=m.hp;o.max=m.max;}}});
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
  NET.onR('obj',m=>{if(scene!=='delve'||!map.objs)return;const o=map.objs[m.o];if(!o)return;if(m.rs&&o.type==='ore'){if(o.gone)oreRegrow(m.o,o);return;}if(m.hp!=null)o.hp=m.hp;
    if((m.gone&&!o.gone)||(m.open&&!o.open)){objTaken(o,m.by);const who=m.by&&m.by!==MP.me()&&OTH.get(m.by);if(who&&o.type==='chest'){floatText(o.x,o.y-18,who.name+' opened a chest','#ffcd75');if(Math.hypot(o.x-P.x,o.y-P.y)<200)sfx('chest',.5);}}o.req=0;});
  NET.onR('objs',m=>{if(scene!=='delve'||m.f!==run.floor)return;for(const [i,op,gn,hp] of m.s){const o=map.objs[i];if(!o)continue;if(op){o.open=true;o.act=null;}if(gn){o.gone=true;o.light=null;o.act=null;}if(hp!=null)o.hp=hp;}
    if(m.bd&&map.stairs&&map.stairs.hidden){map.stairs.hidden=false;bakeGround(map);}});
  NET.onR('floor',m=>{if(scene!=='delve'||m.f===run.floor)return;sfx('stairs');enterFloor(m.f);toast('Floor '+m.f+' · '+BIOMES[packOf(m.f).id].name);});
  NET.onR('hurt',m=>{if(scene==='delve')hurtPlayer(m.d,{x:m.x,y:m.y});});
  // player → host
  NET.onR('hit',m=>{if(MP.client()||scene!=='delve')return;const e=ents.find(q=>q.id===m.e&&!q.dead);if(!e)return;if(m.s===1)e.slowT=1.8;applyHit(e,Math.max(1,Math.min(e.max,m.d|0)),+m.a||0,m.from);});
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
fit();applySet();enterHold();requestAnimationFrame(frame);setTimeout(uiGuard,400);setInterval(uiGuard,2000);   // buttons come and go (the Return Flame), so the guard keeps checking
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{});
let posTick=0;setInterval(()=>{if(started){if(++posTick%3===0)notePos();save();}},10000);
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&started){notePos();save();}});addEventListener('pagehide',()=>{if(started){notePos();save();}});
// Admin loadout: the best gear equipped, one of every lantern, cape and top-tier piece in the bank, both relics, max bank space.
function grantKit(){const old=S.gear,eq={blade:'cinder',mail:'steel',lantern:'wisp',cape:'mother',helm:HAT,ring:'diamond_ring',amulet:'star_amulet'};
  for(const sl of ['blade','mail','lantern','cape','helm','ring','amulet']){const cur=old[sl];if(cur&&cur!==eq[sl]&&!(sl==='blade'&&cur==='rusty')&&!(sl==='mail'&&cur==='none')&&!(sl==='lantern'&&cur==='basic'))give(S.bank,gearId(sl,cur),1);}
  S.gear=Object.assign({},eq);S.bankBuys=BANK_BUYS.length;S.gold+=100000;
  const has=id=>(S.bank[id]||0)+(S.vault[id]||0)>0;
  for(const k of Object.keys(LANTERNS))if(k!=='wisp'&&k!=='basic'&&!has(k+'_lantern'))give(S.vault,k+'_lantern',1);
  for(const k of Object.keys(CAPES))if(k!=='mother'&&!has('cape_'+k))give(S.vault,'cape_'+k,1);
  for(const id of ['ember_blade','ember_mail','ember_helm','steel_blade','steel_helm','gloam_blade','gloam_helm','gloam_mail','star_helm','relic_crown','relic_sigil','relic_heart','relic_star','relic_tome','relic_throne',
    'apprentice_staff','blackwood_staff','ember_staff','gloam_staff','moon_staff','hollow_staff','tide_robe','void_robe',...Object.keys(JEWELS).filter(k=>k!=='diamond_ring'&&k!=='star_amulet')])if(!has(id))give(S.vault,id,1);
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
if(location.hostname==='localhost'||location.protocol==='file:')window.__lh={makeEnemy,get drops(){return drops},get MP(){return MP},get OTH(){return OTH},openSocial:t=>openSocial(t),get S(){return S},get P(){return P},get run(){return run},get ents(){return ents},get map(){return map},get scene(){return scene},startDelve,enterFloor,setStick:(x,y)=>{stick={x,y,on:!!(x||y)};},press:()=>{aPressed=true;},hold:v=>{retHeld=v;},spawnLoot,dropItem:(id,n)=>{take(id,n);dropToGround(id,n);},act:()=>{const a=nearestAct();if(a)doAct(a);return a&&a.id;},fishSpot,startFishing,get FISHING(){return FISHING},T,get CHOP(){return CHOP},HOLD,startChop,openGuide,openHero,openSkills,openBag,GOALS,goalsDone,skillXp,lvlOf,get COOK(){return COOK},startCook,RECIPES,get cam(){return [camX,camY,VW,VH]},get SET(){return SET},openFounders,openWick,openBulletin,get FND(){return FND},get texts(){return texts},set FND(v){FND=v},myLook,closeSheet,riskList,applyPkDeath,pvpTarget,canHit,openWildWarn,inWild,hpMax,get TAGS(){return TAGS},openGate,openCraft,gainXp,gearDrops,openItem,openAdmin,get shake(){return shake},chestGems,get BOLTS(){return BOLTS},get SPFX(){return SPFX},cast,openSpells,openEnchant,openRaid,toggleMap,inWest,staffOn,spellMax,curSpell,equipItem,objTaken,useFlask,enterHold,westStep,get wmOpen(){return wmOpen},openReaper,questKill,qStep,questTab,cosTab,normalize,updateHud,hurtPlayer,killXp};
})();
