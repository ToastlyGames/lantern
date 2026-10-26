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
  // constructor(address signer, uint256 maxId, string base, string contractURI)
  function args(sig, max, base, curi) { var a = str(base), b = str(curi); return hex32(sig) + num32(max) + num32(128) + num32(128 + a.length / 2) + a + b; }
  async function call(to, data) { return pv.request({ method: 'eth_call', params: [{ to: to, data: data }, 'latest'] }); }
  async function receipt(hash) { for (var i = 0; i < 90; i++) { var r = await pv.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (r) return r; await new Promise(function (ok) { setTimeout(ok, 2000); }); } return null; }
  async function chain() { var c = await pv.request({ method: 'eth_chainId' }); if (String(c).toLowerCase() === CHAIN) return;
    try { await pv.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN }] }); }
    catch (e) { await pv.request({ method: 'wallet_addEthereumChain', params: [{ chainId: CHAIN, chainName: 'Robinhood Chain', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'], blockExplorerUrls: ['https://robinhoodchain.blockscout.com'] }] }); } }
  $('base').value = location.origin + '/api/founders?id=';
  fetch('/api/health').then(function (r) { return r.json(); }).then(function (h) { var f = h.founders || {}; if (f.signer && !$('sig').value) $('sig').value = f.signer; if (f.contract && !$('nft').value) $('nft').value = f.contract; if (f.whitelist) $('max').value = f.whitelist; }).catch(function () { });
  $('conn').onclick = async function () {
    if (!pv) { show('who', 'No wallet found. Open this page in your wallet app’s browser.', 'bad'); return; }
    try { from = (await pv.request({ method: 'eth_requestAccounts' }))[0]; await chain(); show('who', 'Connected: <b>' + from + '</b> on Robinhood Chain', 'ok'); ['dep', 'refresh', 'pause', 'setEnd'].forEach(function (k) { $(k).disabled = false; }); if (isAddr($('nft').value.trim())) status(); }
    catch (e) { show('who', 'Couldn’t connect: ' + esc(e.message || e), 'bad'); }
  };
  async function send(to, data, out) {
    var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, to: to, data: data }] });
    show(out, 'Sent… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
    var r = await receipt(h); return r && r.status === '0x1' ? r : null;
  }
  $('dep').onclick = async function () {
    var sig = $('sig').value.trim(), max = $('max').value.trim(), base = $('base').value.trim();
    if (!isAddr(sig) || !/^\d+$/.test(max) || +max < 1 || !/^https:\/\//.test(base)) { show('depOut', 'Check the signer address, whitelist size and metadata address (https://…).', 'bad'); return; }
    try {
      $('dep').disabled = true; show('depOut', 'Confirm the deployment in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, data: BYTECODE + args(sig, max, base, base.replace(/\?id=$/, '?contract=1')) }] });
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
      var sup = parseInt(await call(nft, '0x18160ddd'), 16), max = parseInt(await call(nft, '0xc5ea3c65'), 16), paused = parseInt(await call(nft, '0x5c975abb'), 16) === 1, end = parseInt(await call(nft, '0xea2b4ab2'), 16);
      show('stat', '<b>' + sup.toLocaleString() + '</b> of ' + max.toLocaleString() + ' minted · minting <b class="' + (paused ? 'bad' : 'ok') + '">' + (paused ? 'paused' : 'open') + '</b> · ' + (end ? 'ends ' + new Date(end * 1000).toLocaleString() : 'no end time'));
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
})();
