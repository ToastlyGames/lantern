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
