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
const CLAIM_SEL='0xfa6b3b53',MINT_SEL='0x585c3af8';   // claim(uint256,uint256,uint8,bytes32,bytes32) on the rewards vault; mint(uint256,bool,uint256,uint8,bytes32,bytes32) on the Founder's Lantern
// Send a transaction the server prepared, after checking it goes to the contract we expect and calls the function we expect.
async function contractTx(v,to,sel,what,words=5){
  if(!to||!/^0x[0-9a-fA-F]{40}$/.test(v.to||'')||v.to.toLowerCase()!==String(to).toLowerCase())throw {message:'That isn’t the '+what+' contract.'};
  if(typeof v.data!=='string'||!v.data.startsWith(sel)||v.data.length!==10+64*words)throw {message:'That isn’t a '+what+' transaction.'};
  const pv=savedWalletProvider()||(allWallets()[0]||{}).provider;
  if(!pv)throw {message:'No wallet found. Open the game in your wallet app’s browser to do this.'};
  const accts=await pv.request({method:'eth_requestAccounts'}),from=(accts||[]).find(a=>String(a).toLowerCase()===String(v.wallet).toLowerCase());
  if(!from)throw {message:'Switch your wallet to '+short(v.wallet)+', the wallet linked to your hero.'};
  const want='0x'+Number(v.chainId).toString(16),cur=String(await pv.request({method:'eth_chainId'})).toLowerCase();
  if(cur!==want){try{await pv.request({method:'wallet_switchEthereumChain',params:[{chainId:want}]});}
    catch(e){if(e&&e.code===4001)throw e;if(want===RH.chainId)await pv.request({method:'wallet_addEthereumChain',params:[RH]});else throw e;}}
  return await pv.request({method:'eth_sendTransaction',params:[{from,to:v.to,data:v.data}]});}
const claimTx=(v,vault)=>contractTx(v,vault,CLAIM_SEL,'rewards vault');
const mintTx=(v,nft)=>contractTx(v,nft,MINT_SEL,'Founder’s Lantern',6);
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
