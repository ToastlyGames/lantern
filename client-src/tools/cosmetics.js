// Owner tool: deploy the Lanternhold Cosmetics collection (contracts/LanternCosmetics.sol) and pause minting, from the owner's wallet.
(function () {
  var BYTECODE = '__BYTECODE__', CHAIN = '0x1237', $ = function (id) { return document.getElementById(id); };
  var NFTS = [[1, 'Jack-o’-Lantern'], [2, 'Reaper’s Scythe']];
  var pv = window.ethereum, from = null;
  var hex32 = function (h) { return h.replace(/^0x/, '').toLowerCase().padStart(64, '0'); };
  var num32 = function (n) { return BigInt(n).toString(16).padStart(64, '0'); };
  var isAddr = function (a) { return /^0x[0-9a-fA-F]{40}$/.test(a); };
  var show = function (id, html, cls) { var e = $(id); e.hidden = false; e.className = 'box ' + (cls || ''); e.innerHTML = html; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function str(s) { var b = new TextEncoder().encode(s), h = ''; for (var i = 0; i < b.length; i++) h += b[i].toString(16).padStart(2, '0'); return num32(b.length) + h.padEnd(Math.ceil(b.length / 32) * 64, '0'); }
  // constructor(address signer, string uri, string contractURI)
  function args(sig, uri, curi) { var a = str(uri), b = str(curi); return hex32(sig) + num32(96) + num32(96 + a.length / 2) + a + b; }
  async function call(to, data) { return pv.request({ method: 'eth_call', params: [{ to: to, data: data }, 'latest'] }); }
  async function receipt(hash) { for (var i = 0; i < 90; i++) { var r = await pv.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (r) return r; await new Promise(function (ok) { setTimeout(ok, 2000); }); } return null; }
  async function chain() { var c = await pv.request({ method: 'eth_chainId' }); if (String(c).toLowerCase() === CHAIN) return;
    try { await pv.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN }] }); }
    catch (e) { await pv.request({ method: 'wallet_addEthereumChain', params: [{ chainId: CHAIN, chainName: 'Robinhood Chain', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'], blockExplorerUrls: ['https://robinhoodchain.blockscout.com'] }] }); } }
  $('base').value = location.origin + '/api/cosmetics?id=';
  fetch('/api/health').then(function (r) { return r.json(); }).then(function (h) { var f = h.founders || {}, c = h.cosmetics || {}; if (f.signer && !$('sig').value) $('sig').value = f.signer; if (c.contract && !$('nft').value) $('nft').value = c.contract; }).catch(function () { });
  $('conn').onclick = async function () {
    if (!pv) { show('who', 'No wallet found. Open this page in your wallet app’s browser.', 'bad'); return; }
    try { from = (await pv.request({ method: 'eth_requestAccounts' }))[0]; await chain(); show('who', 'Connected: <b>' + from + '</b> on Robinhood Chain', 'ok'); ['dep', 'refresh', 'pause'].forEach(function (k) { $(k).disabled = false; }); if (isAddr($('nft').value.trim())) status(); }
    catch (e) { show('who', 'Couldn’t connect: ' + esc(e.message || e), 'bad'); }
  };
  async function send(to, data, out) {
    var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, to: to, data: data }] });
    show(out, 'Sent… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
    var r = await receipt(h); return r && r.status === '0x1' ? r : null;
  }
  $('dep').onclick = async function () {
    var sig = $('sig').value.trim(), base = $('base').value.trim();
    if (!isAddr(sig) || !/^https:\/\//.test(base)) { show('depOut', 'Check the signer address and the metadata address (https://…).', 'bad'); return; }
    try {
      $('dep').disabled = true; show('depOut', 'Confirm the deployment in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, data: BYTECODE + args(sig, base, base.replace(/\?id=$/, '?contract=1')) }] });
      show('depOut', 'Deploying… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
      var r = await receipt(h);
      if (!r || r.status !== '0x1' || !r.contractAddress) { show('depOut', 'The deployment failed. Check the transaction in the explorer.', 'bad'); $('dep').disabled = false; return; }
      $('nft').value = r.contractAddress;
      show('depOut', 'Collection deployed: <b>' + r.contractAddress + '</b><br>Save this address: it’s your <code>COSMETICS_CONTRACT</code>.', 'ok'); status();
    } catch (e) { show('depOut', 'Stopped: ' + esc(e.message || e), 'bad'); $('dep').disabled = false; }
  };
  async function status() {
    var nft = $('nft').value.trim(); if (!isAddr(nft)) return show('stat', 'Enter the collection address.', 'bad');
    try {
      var paused = parseInt(await call(nft, '0x5c975abb'), 16) === 1, rows = [];
      for (var i = 0; i < NFTS.length; i++) rows.push(esc(NFTS[i][1]) + ': <b>' + parseInt(await call(nft, '0xbd85b039' + num32(NFTS[i][0])), 16).toLocaleString() + '</b> minted');
      show('stat', 'Minting <b class="' + (paused ? 'bad' : 'ok') + '">' + (paused ? 'paused' : 'open') + '</b><br>' + rows.join('<br>'));
    } catch (e) { show('stat', 'Couldn’t read it: ' + esc(e.message || e), 'bad'); }
  }
  $('refresh').onclick = status;
  $('pause').onclick = async function () {
    var nft = $('nft').value.trim(); if (!isAddr(nft)) return show('ctlOut', 'Enter the collection address.', 'bad');
    try { var paused = parseInt(await call(nft, '0x5c975abb'), 16) === 1; show('ctlOut', 'Confirm in your wallet…');
      var ok = await send(nft, '0x16c38b3c' + num32(paused ? 0 : 1), 'ctlOut'); show('ctlOut', ok ? (paused ? 'Minting is open again.' : 'Minting is paused.') : 'That didn’t go through (only the owner can do this).', ok ? 'ok' : 'bad'); status(); }
    catch (e) { show('ctlOut', 'Stopped: ' + esc(e.message || e), 'bad'); }
  };
})();
