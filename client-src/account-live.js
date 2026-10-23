// ===== Lanternhold accounts (live): wallet sign-in verified by the server, unique names, server-side saves =====
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const RH={chainId:'0x1237',chainName:'Robinhood Chain',nativeCurrency:{name:'Ether',symbol:'ETH',decimals:18},rpcUrls:['https://rpc.mainnet.chain.robinhood.com'],blockExplorerUrls:['https://robinhoodchain.blockscout.com']};
const RESERVED=new Set(['admin','moderator','mod','lanternhold','robinhood','support','system','official','gm','staff'].concat(NAMES.map(n=>n.replace(/^@/,'').toLowerCase())));
const NAME_RE=/^[A-Za-z0-9_]{3,16}$/;
const BAD=['fuck','shit','bitch','cunt','dick','cock','pussy','nigg','fag','rape','nazi','hitler','porn','slut','whore','penis','vagina','retard','kkk','anus','molest','pedo'];
const clean=n=>{const t=n.toLowerCase().replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s').replace(/7/g,'t').replace(/_/g,'');return !BAD.some(w=>t.includes(w));};
const short=a=>a?a.slice(0,6)+'…'+a.slice(-4):'';
const box=$('acct'),body=$('acctBody');

// ---------- server API ----------
async function api(path,opt){opt=opt||{};
  try{const r=await fetch('/api/'+path,{method:opt.method||'GET',credentials:'same-origin',cache:'no-store',keepalive:!!opt.keepalive,
      headers:Object.assign({'X-LH':'1'},opt.body?{'Content-Type':'application/json'}:{}),body:opt.body?JSON.stringify(opt.body):undefined});
    let j={};try{j=await r.json();}catch(e){}return {status:r.status,ok:r.ok,data:j};}
  catch(e){return {status:0,ok:false,data:{error:'offline'}};}}
const online=()=>!!(ACC.me&&ACC.pid&&ACC.pid!=='guest');
function localNames(){try{return JSON.parse(localStorage.getItem('lanternhold.names')||'{}');}catch(e){return {};}}
async function nameStatus(name){
  if(!NAME_RE.test(name))return {ok:false,msg:'3–16 letters, numbers or _'};
  if(!clean(name))return {ok:false,msg:'Please pick a different name'};
  const key=name.toLowerCase();if(RESERVED.has(key))return {ok:false,msg:'That name is taken'};
  if(ACC.pid==='guest'){const ln=localNames();if(ln[key]&&ln[key]!==ACC.pid)return {ok:false,msg:'Taken on this device'};return {ok:true,msg:'Available on this device',warn:true};}
  const r=await api('name?name='+encodeURIComponent(name));if(!r.ok)return {ok:true,msg:'Couldn’t check right now',warn:true};return r.data;
}
async function claimName(name,wallet,look){
  const st=await nameStatus(name);if(!st.ok)return st;
  if(ACC.pid==='guest'){const ln=localNames();ln[name.toLowerCase()]='guest';try{localStorage.setItem('lanternhold.names',JSON.stringify(ln));}catch(e){}return {ok:true,local:true};}
  const r=await api('hero',{method:'POST',body:{name,look}});
  if(!r.ok)return {ok:false,msg:r.data.msg||(r.status===401?'Your sign-in expired. Connect your wallet again.':'Couldn’t reach the server. Try again.')};
  ACC.me=r.data;return {ok:true};
}
// ---------- saving to the server ----------
// Throttled: at most one save every 10–14 s while playing (random spread so players don't all save at the same moment),
// immediately on key moments (return home, death, sign out). Nothing is sent when nothing changed, so idle players cost nothing.
let cloudTimer=null,cloudBusy=false,cloudPending=null,offlineWarned=false,lastSent=null,lastAt=0,fails=0,stopped=false;
const SAVE_GAP=10000+Math.random()*4000; // this player's spacing between saves (each player gets a different one)
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
  else if(r.status===401)return stop('Your sign-in expired. Please connect your wallet again.',2500);
  else if(r.status===403){stopped=true;notice('This account can’t save progress right now.');return;}
  else{if(!cloudPending)cloudPending=p;if(!offlineWarned&&r.status===0){offlineWarned=true;notice('Connection lost. Progress will sync when you’re back online.');}
    // back off when the server is busy or unreachable: 5 s, 10 s, 20 s… up to 60 s, with random spread
    if(r.status===429)return retry(2000+Math.random()*1500);
    fails++;return retry(Math.min(60000,5000*2**(fails-1))*(0.75+Math.random()*0.5));}
  if(cloudPending&&!cloudTimer)retry(2500+Math.random()*1000);}
function notice(t){const el=document.getElementById('toast');if(!el)return;el.textContent=t;el.className='toast bad';el.hidden=false;setTimeout(()=>el.hidden=true,4000);}
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushCloud();});addEventListener('pagehide',()=>flushCloud());
function loadGuest(){let local=null;try{const r=localStorage.getItem('lanternhold.p.guest');if(r)local=JSON.parse(r);}catch(e){}return local;}

// ---------- wallets (EIP-6963 discovery, injected fallback) ----------
const wallets=[];
addEventListener('eip6963:announceProvider',e=>{const d=e.detail;if(d&&d.info&&d.provider&&!wallets.find(w=>w.info.uuid===d.info.uuid)){wallets.push(d);if(ACC.screen==='welcome')render();}});
dispatchEvent(new Event('eip6963:requestProvider'));
function allWallets(){const l=wallets.slice();if(!l.length&&window.ethereum)l.push({info:{uuid:'injected',name:window.ethereum.isMetaMask?'MetaMask':'Browser wallet',icon:''},provider:window.ethereum});return l;}
const hexUtf8=s=>'0x'+Array.from(new TextEncoder().encode(s)).map(b=>b.toString(16).padStart(2,'0')).join('');
async function connectWallet(w){
  const pv=w.provider;ACC.err='';go('signing',{wname:w.info.name});
  try{
    const accts=await pv.request({method:'eth_requestAccounts'});const addr=(accts&&accts[0]||'').toLowerCase();if(!/^0x[0-9a-f]{40}$/.test(addr))throw {message:'No valid account was shared'};
    let onChain=false;
    try{const c=await pv.request({method:'eth_chainId'});onChain=parseInt(c,16)===4663;
      if(!onChain){try{await pv.request({method:'wallet_switchEthereumChain',params:[{chainId:RH.chainId}]});onChain=true;}
        catch(e){const code=e&&(e.code||(e.data&&e.data.originalError&&e.data.originalError.code));if(code===4902){await pv.request({method:'wallet_addEthereumChain',params:[RH]});onChain=true;}}}}catch(e){}
    ACC.stage='Sign the message in your wallet to log in. It’s free and doesn’t send a transaction.';render();
    const n=await api('auth/nonce');if(!n.ok)throw {message:'Couldn’t reach the server'};
    const now=new Date(),exp=new Date(now.getTime()+10*60000),raw=accts[0];
    // EIP-4361 (Sign-In with Ethereum); the server checks every field and the signature
    const msg=`${n.data.domain} wants you to sign in with your Ethereum account:\n${raw}\n\nSign in to Lanternhold. This free signature proves you own this wallet. It does not send a transaction or move funds.\n\nURI: ${location.origin}\nVersion: 1\nChain ID: ${n.data.chainId}\nNonce: ${n.data.nonce}\nIssued At: ${now.toISOString()}\nExpiration Time: ${exp.toISOString()}`;
    const sig=await pv.request({method:'personal_sign',params:[hexUtf8(msg),raw]});if(typeof sig!=='string'||!/^0x[0-9a-fA-F]+$/.test(sig))throw {message:'The wallet returned no signature'};
    const v=await api('auth/verify',{method:'POST',body:{message:msg,signature:sig}});
    if(!v.ok)throw {message:v.data.error==='banned'?'This wallet is banned':v.data.error==='bad_signature'?'The signature didn’t match this wallet':'Sign-in was refused ('+(v.data.detail||v.data.error||v.status)+')'};
    ACC.me=v.data;ACC.wallet={addr,name:w.info.name,onChain};await enter('w_'+addr);
  }catch(e){const code=e&&e.code;ACC.err=code===4001?'You declined the request in your wallet. Try again when you’re ready.':'Wallet error: '+esc((e&&e.message)||'unknown');go('welcome');}
}

// ---------- flow ----------
const ACC={screen:'welcome',pid:null,wallet:null,err:'',stage:'',draft:null,edit:false};
function session(){if(ACC.me&&ACC.me.hero)return {pid:'w_'+ACC.me.wallet,name:ACC.me.hero.name,addr:ACC.me.wallet};try{const s=JSON.parse(localStorage.getItem('lanternhold.session')||'null');if(!s||s.pid!=='guest'||typeof s.name!=='string')return null;return s;}catch(e){return null;}}
function setSession(o){if(o&&o.pid!=='guest')return;try{o?localStorage.setItem('lanternhold.session',JSON.stringify(Object.assign({at:Date.now()},o))):localStorage.removeItem('lanternhold.session');}catch(e){}}
async function enter(pid){
  ACC.pid=pid;
  if(pid==='guest'){const data=loadGuest();if(data&&data.name){setSession({pid,name:data.name});finish(data,false);return;}
    ACC.base=data;ACC.ownName=null;ACC.draft={name:'',look:Object.assign({},DEFAULT_LOOK,{skin:(Math.random()*4)|0,hair:(Math.random()*6)|0,cloth:(Math.random()*8)|0})};go('creator');return;}
  const me=ACC.me;if(me&&me.hero&&me.save){finish(Object.assign({},me.save.data,{name:me.hero.name,look:me.hero.look,wallet:me.wallet}),false,me.save.rev);return;}
  ACC.ownName=null;ACC.base=null;ACC.draft={name:'',look:Object.assign({},DEFAULT_LOOK,{skin:(Math.random()*4)|0,hair:(Math.random()*6)|0,cloth:(Math.random()*8)|0})};
  go('account');
}
function finish(data,isNew,rev){if(rev!==undefined)ACC.rev=rev;lastAt=Date.now();const admin=!!(ACC.me&&ACC.me.hero&&ACC.me.hero.admin&&ACC.pid!=='guest');
  box.hidden=true;stopPreview();window.LH.start(ACC.pid,data,{isNew,wallet:ACC.wallet,online:online(),admin});}
function go(s,extra){ACC.screen=s;Object.assign(ACC,extra||{});render();}

// ---------- preview ----------
let pvT=null;
function startPreview(){stopPreview();let t=0;const dirs=['down','right','up','left'];pvT=setInterval(()=>{const c=$('pv');if(!c){stopPreview();return;}t++;const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,c.width,c.height);
  const d=dirs[Math.floor(t/12)%4],fr=1+(t>>2)%2;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(8,20,8,1);g.drawImage(heroImg(ACC.draft.look,d,fr),4,5);},110);}
function stopPreview(){clearInterval(pvT);pvT=null;}
function bigHero(look){const c=document.createElement('canvas');c.width=16;c.height=16;c.getContext('2d').drawImage(heroImg(look,'down',0),0,0);return c.toDataURL();}

const steps=n=>`<ol class="steps">${['Wallet','Account','Hero'].map((s,i)=>`<li class="${i<n?'done':i===n?'on':''}">${s}</li>`).join('')}</ol>`;
function render(){
  const s=ACC.screen;let h='';
  if(s==='welcome'){
    const ses=session(),list=allWallets();
    h=`<img class="logoHero" alt="" src="${bigHero(DEFAULT_LOOK)}"><h1>Lanternhold</h1><p class="tag">Farm your Hold. Press oil for your lantern. Delve into the dark and bring the loot home.</p>
    ${ACC.me&&!ACC.me.hero?`<button class="btn big" id="mk">Create your hero</button><p class="sub">Signed in as ${short(ACC.me.wallet)} · <button class="link inl" id="signout">Sign out</button></p><div class="or"><span>or</span></div>`:''}
    ${ses?`<button class="btn big" id="cont">Continue as ${esc(ses.name)}</button><p class="sub">${ses.addr?'Wallet '+short(ses.addr)+' · saved to your account':'Guest profile on this device'}</p><div class="or"><span>or use another account</span></div>`:''}
    ${list.length>1?list.map((w,i)=>`<button class="btn wal" data-w="${i}">${w.info.icon&&/^data:image\//.test(w.info.icon)?`<img alt="" src="${esc(w.info.icon)}">`:'<span class="wi"></span>'}Connect ${esc(w.info.name)}</button>`).join('')
      :`<button class="btn wal ${ses?'alt':''}" id="wal" ${list.length?'data-w="0"':''}><span class="wi"></span>Connect wallet</button>`}
    <button class="btn alt goog" disabled><span class="gi">G</span>Continue with Google<em>At launch</em></button>
    ${ACC.err?`<p class="err" role="alert">${ACC.err}</p>`:''}
    <button class="link" id="guest">Play as a guest</button>
    <p class="fine">EVM wallets on Robinhood Chain. Signing in is a free signature, never a transaction.<br>Guest progress stays on this device only. Connect a wallet to keep it on any device.</p>`;
  }else if(s==='nowallet'){
    h=`<h2>No wallet found</h2><p class="lead">This browser doesn’t have an EVM wallet. To sign in with your wallet:</p>
    <ol class="how"><li>Open your wallet app (Robinhood Wallet, MetaMask, Rabby…)</li><li>Use its built-in browser to open this page</li><li>Tap <b>Connect wallet</b> again</li></ol>
    <p class="lead small">On a computer, install a wallet extension and reload. You can also play as a guest. Guest progress stays on this device.</p>
    <div class="row"><button class="btn alt" id="back">Back</button><button class="btn" id="guest">Play as guest</button></div>`;
  }else if(s==='signing'){
    h=`${steps(0)}<div class="spin" aria-hidden="true"></div><h2>Check your wallet</h2><p class="lead">${esc(ACC.stage||('Approve the connection in '+(ACC.wname||'your wallet')+'.'))}</p><button class="btn alt" id="back">Cancel</button>`;
  }else if(s==='account'){
    const w=ACC.wallet;
    h=`${steps(1)}<h2>Create your account</h2><p class="lead">Your wallet is your login. Your progress is saved to it, so you can pick up on any device.</p>
    <div class="acctRow ok"><span class="wi"></span><span><b>${esc(w.name)}</b><small>${short(w.addr)} · ${w.onChain?'Robinhood Chain':'Not on Robinhood Chain yet'}</small></span><i>✓</i></div>
    <div class="acctRow"><span class="gi">G</span><span><b>Link Google account</b><small>Optional backup login, arriving at launch</small></span><em>Soon</em></div>
    <button class="btn big" id="next">Create your hero</button><button class="link" id="out">Use a different wallet</button>`;
  }else if(s==='creator'){
    const d=ACC.draft,L=d.look;
    const sw=(k,arr)=>`<div class="swrow" role="radiogroup" aria-label="${k}">${arr.map((c,i)=>`<button class="sw" role="radio" aria-checked="${L[k]===i}" aria-label="${k} ${i+1}" data-k="${k}" data-i="${i}" style="--c:${c}"></button>`).join('')}</div>`;
    h=`${ACC.edit||ACC.pid==='guest'?'':steps(2)}<h2>${ACC.edit?'Change your look':'Create your hero'}</h2>
    <div class="creator"><div class="pvWrap"><canvas id="pv" width="24" height="24"></canvas><button class="btn alt sm" id="rnd">Shuffle</button></div>
    <div class="opts">
      ${ACC.edit||ACC.ownName?`<p class="lead"><b>${esc(d.name)}</b><br><small>${ACC.ownName&&!ACC.edit?'Your account’s hero name.':'Names are permanent.'}</small></p>`:`<label class="fld"><span>Name</span><input id="nm" maxlength="16" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="3–16 letters, numbers, _" value="${esc(d.name)}"><small id="nmS" aria-live="polite">${ACC.pid==='guest'?'Guest names are saved on this device only.':'Names are permanent and unique.'}</small></label>`}
      <h3>Skin</h3>${sw('skin',LOOKS.skin)}<h3>Hair</h3>${sw('hair',LOOKS.hair)}
      <h3>Hair style</h3><div class="chips">${LOOKS.style.map((s,i)=>`<button class="chip" aria-pressed="${L.style===i}" data-st="${i}">${s[0].toUpperCase()+s.slice(1)}</button>`).join('')}</div>
      <h3>Clothes</h3>${sw('cloth',LOOKS.cloth)}
    </div></div>
    ${ACC.err?`<p class="err" role="alert">${ACC.err}</p>`:''}
    <div class="row">${ACC.edit?'<button class="btn alt" id="cancelEd">Cancel</button><button class="btn" id="saveEd">Save look</button>':`<button class="btn alt" id="back2">Back</button><button class="btn" id="claim" ${d.name?'':'disabled'}>${ACC.ownName?'Play':'Claim name &amp; play'}</button>`}</div>`;
  }
  body.innerHTML=h;wire();
}
function wire(){
  const on=(id,f)=>{const e=$(id);if(e)e.onclick=f;};
  body.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const w=allWallets()[+b.dataset.w];if(w)connectWallet(w);});
  const wb=$('wal');if(wb&&!wb.dataset.w)wb.onclick=()=>{const l=allWallets();if(l.length)connectWallet(l[0]);else go('nowallet');};
  on('guest',()=>{ACC.wallet=null;enter('guest');});on('back',()=>go('welcome',{err:''}));on('out',()=>{ACC.wallet=null;go('welcome');});
  on('cont',()=>{const s=session();if(!s)return;ACC.wallet=s.addr?{addr:s.addr,name:'Wallet',onChain:true}:null;enter(s.pid);});
  on('signout',async()=>{await api('auth/logout',{method:'POST'});ACC.me=null;render();});
  on('next',()=>go('creator'));on('mk',()=>{ACC.wallet={addr:ACC.me.wallet,name:'Wallet',onChain:true};enter('w_'+ACC.me.wallet);});on('back2',()=>go(ACC.pid==='guest'?'welcome':'account',{err:''}));
  body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ACC.draft.look[b.dataset.k]=+b.dataset.i;body.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach(x=>x.setAttribute('aria-checked',x===b));});
  body.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ACC.draft.look.style=+b.dataset.st;body.querySelectorAll('[data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b));});
  on('rnd',()=>{const L=ACC.draft.look,r=a=>(Math.random()*a.length)|0;L.skin=r(LOOKS.skin);L.hair=r(LOOKS.hair);L.cloth=r(LOOKS.cloth);L.style=r(LOOKS.style);const n=$('nm');if(n)ACC.draft.name=n.value;render();});
  const nm=$('nm');if(nm){let t=null;nm.oninput=()=>{ACC.draft.name=nm.value.trim();$('claim').disabled=!ACC.draft.name;const s=$('nmS');s.className='';clearTimeout(t);
      if(!ACC.draft.name){s.textContent='Names are permanent and unique.';return;}s.textContent='Checking…';const v=ACC.draft.name;
      t=setTimeout(async()=>{const r=await nameStatus(v);if(v!==ACC.draft.name)return;s.textContent=r.msg;s.className=r.ok?(r.warn?'warn':'good'):'bad';},350);};
    nm.onkeydown=e=>{if(e.key==='Enter')$('claim').click();};}
  on('claim',async()=>{const b=$('claim');const name=ACC.draft.name;b.disabled=true;b.textContent='Claiming…';
    const r=await claimName(name,ACC.wallet&&ACC.wallet.addr,ACC.draft.look);
    if(!r.ok){ACC.err=esc(r.msg);b.disabled=false;b.textContent='Claim name & play';render();const n=$('nm');if(n)n.focus();return;}
    ACC.err='';
    if(ACC.pid==='guest'){const data=Object.assign({},ACC.base||{},{name,look:ACC.draft.look,wallet:null});setSession({pid:'guest',name});finish(data,true);return;}
    const me=ACC.me;finish(Object.assign({},me.save.data,{name:me.hero.name,look:me.hero.look,wallet:me.wallet}),true,me.save.rev);});
  on('cancelEd',()=>{ACC.edit=false;box.hidden=true;stopPreview();window.LH.resume();});
  on('saveEd',()=>{ACC.edit=false;box.hidden=true;stopPreview();window.LH.setLook(ACC.draft.look);
    if(online())api('hero',{method:'PATCH',body:{look:ACC.draft.look}});});
  if($('pv'))startPreview();
}
// ---------- chat: polled from /api/chat every 3 s, only while the chat panel is open ----------
window.CHATNET={
  why(){return online()?null:'Connect a wallet to chat with other players.';},
  join(ch,cb){let after=0,stop=false,t=null;
    const tick=async()=>{if(stop)return;const r=await api('chat?ch='+encodeURIComponent(ch)+'&after='+after);if(stop)return;
      if(r.ok&&Array.isArray(r.data.messages)){for(const m of r.data.messages)after=Math.max(after,m.id);
        cb(r.data.messages.map(m=>({id:'c'+m.id,name:m.name,text:m.text,at:Date.parse(m.at)||Date.now(),me:!!m.me})));}
      t=setTimeout(tick,document.visibilityState==='hidden'?15000:3000);};
    tick();return ()=>{stop=true;clearTimeout(t);};},
  async send(ch,text){const r=await api('chat',{method:'POST',body:{ch,text}});
    if(r.ok)return {ok:true,msg:{id:'c'+r.data.id,name:r.data.name,text:r.data.text,at:Date.now()}};
    return {ok:false,msg:r.status===429?'Slow down a little.':r.status===403?'You can’t chat right now.':r.status===401?'Your sign-in expired. Connect your wallet again.':'Message not sent. Try again.'};}
};
window.ACC={open(){document.documentElement.classList.add('pre');box.hidden=false;go('welcome',{err:''});},editLook(name,look){document.documentElement.classList.add('pre');ACC.edit=true;ACC.draft={name,look:Object.assign({},look)};box.hidden=false;go('creator');},
  async logout(){setSession(null);await flushCloud();if(ACC.pid!=='guest')await api('auth/logout',{method:'POST'});location.reload();},cloudSave,flush:flushCloud,get pid(){return ACC.pid;},online};
render();
api('me').then(r=>{if(r.ok&&r.data.wallet){ACC.me=r.data;if(ACC.screen==='welcome')render();}});
})();
