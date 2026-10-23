// ===== Lanternhold realtime connection: one socket to the Lobby (friends, parties, invites, feed) and one to the current
// room (a Hold world or a dungeon instance). Tickets come from /api/rt-ticket; sockets reconnect on their own. =====
(function(){
const HL={},HR={};
const emit=(H,t,m)=>{for(const f of H[t]||[])try{f(m);}catch(e){console.error(e);}};
let base=null,lobby=null,room=null,roomId=null,stopped=true,lq=[],retryL=0,retryR=0,available=null,hero=null;
async function ticket(){
  try{const r=await fetch('/api/rt-ticket',{headers:{'X-LH':'1'},credentials:'same-origin',cache:'no-store'});
    if(!r.ok)return null;const j=await r.json();if(!j||!j.url||!j.ticket){available=false;return null;}available=true;base=j.url;return j;}
  catch(e){return null;}}
const backoff=n=>Math.min(30000,1000*2**n)*(0.7+Math.random()*0.6);
async function openLobby(){
  if(stopped)return;const t=await ticket();if(stopped)return;
  if(!t){if(available===false){emit(HL,'off',{});return;}setTimeout(openLobby,backoff(retryL++));return;}
  const ws=new WebSocket(base+'/lobby?t='+encodeURIComponent(t.ticket));lobby=ws;
  ws.onopen=()=>{retryL=0;const q=lq;lq=[];for(const m of q)ws.send(m);emit(HL,'open',{});};
  ws.onmessage=e=>{let m;try{m=JSON.parse(e.data);}catch(x){return;}if(m&&m.t)emit(HL,m.t,m);};
  ws.onclose=e=>{if(lobby!==ws)return;lobby=null;emit(HL,'close',{code:e.code});if(stopped)return;
    if(e.code===4000){stopped=true;emit(HL,'kicked',{reason:'You signed in somewhere else.'});return;}
    setTimeout(openLobby,backoff(retryL++));};
}
async function openRoom(id){
  if(stopped||roomId!==id)return;const t=await ticket();if(stopped||roomId!==id)return;
  if(!t){setTimeout(()=>openRoom(id),backoff(retryR++));return;}
  const ws=new WebSocket(base+'/room/'+id+'?t='+encodeURIComponent(t.ticket));room=ws;
  ws.onopen=()=>{retryR=0;};
  ws.onmessage=e=>{if(room!==ws)return;let m;try{m=JSON.parse(e.data);}catch(x){return;}if(m&&m.t)emit(HR,m.t,m);};
  ws.onclose=e=>{if(room!==ws)return;room=null;if(stopped||roomId!==id)return;
    if(e.code===4003){roomId=null;emit(HR,'denied',{});return;}
    if(e.code===4009){roomId=null;emit(HR,'full',{});return;}
    if(e.code===4000)return;
    emit(HR,'drop',{});setTimeout(()=>openRoom(id),backoff(retryR++));};
}
window.NET={
  onL(t,f){(HL[t]=HL[t]||[]).push(f);},onR(t,f){(HR[t]=HR[t]||[]).push(f);},
  start(name){if(!stopped)return;stopped=false;hero=name;openLobby();},
  stop(){stopped=true;roomId=null;try{lobby&&lobby.close();}catch(e){}try{room&&room.close();}catch(e){}lobby=null;room=null;},
  live(){return !stopped&&available!==false;},lobbyOpen(){return !!(lobby&&lobby.readyState===1);},
  roomOpen(){return !!(room&&room.readyState===1);},room(){return roomId;},
  lsend(o){const s=JSON.stringify(o);if(lobby&&lobby.readyState===1)lobby.send(s);else if(lq.length<50)lq.push(s);},
  send(o){if(room&&room.readyState===1)room.send(JSON.stringify(o));},
  join(id){if(roomId===id&&room)return;const old=room;roomId=id;room=null;try{old&&old.close(1000,'leave');}catch(e){}retryR=0;openRoom(id);},
  leave(){const old=room;roomId=null;room=null;try{old&&old.close(1000,'leave');}catch(e){}}
};
})();
