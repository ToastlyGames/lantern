// Owner tool: deploy the Founder's Lantern collection (contracts/LanternFounders.sol) and control the mint, from the owner's wallet.
(function () {
  var BYTECODE = '__BYTECODE__', CHAIN = '0x1237', $ = function (id) { return document.getElementById(id); };
  var pv = window.ethereum, from = null;
  var hex32 = function (h) { return h.replace(/^0x/, '').toLowerCase().padStart(64, '0'); };
  var num32 = function (n) { return BigInt(n).toString(16).padStart(64, '0'); };
  var isAddr = function (a) { return /^0x[0-9a-fA-F]{40}$/.test(a); };
  var show = function (id, html, cls) { var e = $(id); e.hidden = false; e.className = 'box ' + (cls || ''); e.innerHTML = html; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function str(s) { var b = new TextEncoder().encode(s), h = ''; for (var i = 0; i < b.length; i++) h += b[i].toString(16).padStart(2, '0'); return num32(b.length) + h.padEnd(Math.ceil(b.length / 32) * 64, '0'); }
  // constructor(address signer, uint256 openCap, uint256 reservedCap, string base, string contractURI)
  function args(sig, open, resv, base, curi) { var a = str(base), b = str(curi); return hex32(sig) + num32(open) + num32(resv) + num32(160) + num32(160 + a.length / 2) + a + b; }
  async function call(to, data) { return pv.request({ method: 'eth_call', params: [{ to: to, data: data }, 'latest'] }); }
  async function receipt(hash) { for (var i = 0; i < 90; i++) { var r = await pv.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (r) return r; await new Promise(function (ok) { setTimeout(ok, 2000); }); } return null; }
  async function chain() { var c = await pv.request({ method: 'eth_chainId' }); if (String(c).toLowerCase() === CHAIN) return;
    try { await pv.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN }] }); }
    catch (e) { await pv.request({ method: 'wallet_addEthereumChain', params: [{ chainId: CHAIN, chainName: 'Robinhood Chain', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'], blockExplorerUrls: ['https://robinhoodchain.blockscout.com'] }] }); } }
  $('base').value = location.origin + '/api/founders?id=';
  fetch('/api/health').then(function (r) { return r.json(); }).then(function (h) { var f = h.founders || {}; if (f.signer && !$('sig').value) $('sig').value = f.signer; if (f.contract && !$('nft').value) $('nft').value = f.contract; }).catch(function () { });
  $('conn').onclick = async function () {
    if (!pv) { show('who', 'No wallet found. Open this page in your wallet app’s browser.', 'bad'); return; }
    try { from = (await pv.request({ method: 'eth_requestAccounts' }))[0]; await chain(); show('who', 'Connected: <b>' + from + '</b> on Robinhood Chain', 'ok'); ['dep', 'refresh', 'pause', 'setEnd', 'move'].forEach(function (k) { $(k).disabled = false; }); if (isAddr($('nft').value.trim())) status(); }
    catch (e) { show('who', 'Couldn’t connect: ' + esc(e.message || e), 'bad'); }
  };
  async function send(to, data, out) {
    var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, to: to, data: data }] });
    show(out, 'Sent… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
    var r = await receipt(h); return r && r.status === '0x1' ? r : null;
  }
  $('dep').onclick = async function () {
    var sig = $('sig').value.trim(), open = $('openCap').value.trim(), resv = $('resvCap').value.trim(), base = $('base').value.trim();
    if (!isAddr(sig) || !/^\d+$/.test(open) || !/^\d+$/.test(resv) || +open + +resv < 1 || !/^https:\/\//.test(base)) { show('depOut', 'Check the signer address, the two pool sizes and metadata address (https://…).', 'bad'); return; }
    try {
      $('dep').disabled = true; show('depOut', 'Confirm the deployment in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, data: BYTECODE + args(sig, open, resv, base, base.replace(/\?id=$/, '?contract=1')) }] });
      show('depOut', 'Deploying… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
      var r = await receipt(h);
      if (!r || r.status !== '0x1' || !r.contractAddress) { show('depOut', 'The deployment failed. Check the transaction in the explorer.', 'bad'); $('dep').disabled = false; return; }
      $('nft').value = r.contractAddress;
      show('depOut', 'Collection deployed: <b>' + r.contractAddress + '</b><br>Save this address: it’s your <code>FOUNDERS_CONTRACT</code>.', 'ok'); status();
    } catch (e) { show('depOut', 'Stopped: ' + esc(e.message || e), 'bad'); $('dep').disabled = false; }
  };
  async function status() {
    var nft = $('nft').value.trim(); if (!isAddr(nft)) return show('stat', 'Enter the collection address.', 'bad');
    try {
      var n = async function (sel) { return parseInt(await call(nft, sel), 16); };
      var sup = await n('0x18160ddd'), max = await n('0x32cb6b0c'), oc = await n('0xb507a381'), rc = await n('0x51c4f15c'), om = await n('0x0baa7400'), rm = await n('0x4f297ccc'), paused = (await n('0x5c975abb')) === 1, end = await n('0xea2b4ab2');
      show('stat', '<b>' + sup.toLocaleString() + '</b> of ' + max.toLocaleString() + ' minted · minting <b class="' + (paused ? 'bad' : 'ok') + '">' + (paused ? 'paused' : 'open') + '</b> · ' + (end ? 'ends ' + new Date(end * 1000).toLocaleString() : 'no end time') +
        '<br>Open to every hero: <b>' + om.toLocaleString() + '</b> / ' + oc.toLocaleString() + ' · Held for giveaway winners: <b>' + rm.toLocaleString() + '</b> / ' + rc.toLocaleString());
    } catch (e) { show('stat', 'Couldn’t read it: ' + esc(e.message || e), 'bad'); }
  }
  $('refresh').onclick = status;
  $('pause').onclick = async function () {
    var nft = $('nft').value.trim(); if (!isAddr(nft)) return show('ctlOut', 'Enter the collection address.', 'bad');
    try { var paused = parseInt(await call(nft, '0x5c975abb'), 16) === 1; show('ctlOut', 'Confirm in your wallet…');
      var ok = await send(nft, '0x16c38b3c' + num32(paused ? 0 : 1), 'ctlOut'); show('ctlOut', ok ? (paused ? 'Minting is open again.' : 'Minting is paused.') : 'That didn’t go through (only the owner can do this).', ok ? 'ok' : 'bad'); status(); }
    catch (e) { show('ctlOut', 'Stopped: ' + esc(e.message || e), 'bad'); }
  };
  $('setEnd').onclick = async function () {
    var nft = $('nft').value.trim(), v = $('end').value; if (!isAddr(nft)) return show('ctlOut', 'Enter the collection address.', 'bad');
    var t = v ? Math.floor(new Date(v).getTime() / 1000) : 0;
    try { show('ctlOut', 'Confirm in your wallet…'); var ok = await send(nft, '0xeb20614e' + num32(t), 'ctlOut'); show('ctlOut', ok ? (t ? 'The mint ends ' + new Date(t * 1000).toLocaleString() + '.' : 'The mint has no end time.') : 'That didn’t go through (only the owner can do this).', ok ? 'ok' : 'bad'); status(); }
    catch (e) { show('ctlOut', 'Stopped: ' + esc(e.message || e), 'bad'); }
  };
  // move unclaimed giveaway spots into the open pool (after the giveaway, for spots no winner took)
  $('move').onclick = async function () {
    var nft = $('nft').value.trim(), n = $('moveN').value.trim(); if (!isAddr(nft)) return show('ctlOut', 'Enter the collection address.', 'bad');
    if (!/^\d+$/.test(n) || +n < 1) return show('ctlOut', 'Enter how many spots to move.', 'bad');
    try { show('ctlOut', 'Confirm in your wallet…'); var ok = await send(nft, '0xad63d7a0' + num32(n), 'ctlOut'); show('ctlOut', ok ? n + ' giveaway spots moved to the open pool.' : 'That didn’t go through (only the owner can, and only unclaimed giveaway spots).', ok ? 'ok' : 'bad'); status(); }
    catch (e) { show('ctlOut', 'Stopped: ' + esc(e.message || e), 'bad'); }
  };
  // X giveaway winners (stored by the game server; your tools pass is checked on every call)
  async function api(body) { var r = await fetch('/api/tools', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(body) }); var d = await r.json().catch(function () { return {}; }); if (!r.ok) throw new Error(d.msg || d.error || ('error ' + r.status)); return d; }
  function winners(d, note) {
    var list = d.winners || [];
    $('wCount').innerHTML = '<b>' + list.length.toLocaleString() + '</b> of ' + (d.cap || 1000).toLocaleString() + ' giveaway spots given out' + (note ? '<br>' + note : '');
    $('wList').innerHTML = list.length ? list.map(function (w) { return '<span class="w">' + esc(w.name) + ' <small>#' + esc(w.no) + '</small></span>'; }).join('') : '<i>No winners yet.</i>';
  }
  function note(d) { var p = []; if (d.done && d.done.length) p.push('<span class="ok">Done: ' + d.done.map(esc).join(', ') + '</span>'); if (d.missing && d.missing.length) p.push('<span class="bad">No hero named: ' + d.missing.map(esc).join(', ') + '</span>'); if (d.skipped && d.skipped.length) p.push('<span class="bad">Full, not added: ' + d.skipped.map(esc).join(', ') + '</span>'); return p.join('<br>'); }
  function loadW() { api({ action: 'winners' }).then(function (d) { winners(d); }).catch(function (e) { $('wCount').innerHTML = '<span class="bad">' + esc(e.message) + ' (run supabase/founders-giveaway.sql?)</span>'; }); }
  $('wAdd').onclick = function () { api({ action: 'winners_add', names: $('wNames').value }).then(function (d) { $('wNames').value = ''; winners(d, note(d)); }).catch(function (e) { $('wCount').innerHTML = '<span class="bad">' + esc(e.message) + '</span>'; }); };
  $('wDel').onclick = function () { api({ action: 'winners_remove', names: $('wNames').value }).then(function (d) { $('wNames').value = ''; winners(d, note(d)); }).catch(function (e) { $('wCount').innerHTML = '<span class="bad">' + esc(e.message) + '</span>'; }); };
  loadW();
})();
