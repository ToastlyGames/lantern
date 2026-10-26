// Owner tool: deploy the rewards vault (contracts/LanternRewards.sol) and fund it, from the owner's own wallet.
(function () {
  var BYTECODE = '__BYTECODE__', CHAIN = '0x1237', $ = function (id) { return document.getElementById(id); };
  var pv = window.ethereum, from = null;
  var hex32 = function (h) { return h.replace(/^0x/, '').toLowerCase().padStart(64, '0'); };
  var isAddr = function (a) { return /^0x[0-9a-fA-F]{40}$/.test(a); };
  var show = function (id, html, cls) { var e = $(id); e.hidden = false; e.className = 'box ' + (cls || ''); e.innerHTML = html; };
  function units(amount, dec) { var p = String(amount).trim().split('.'); var frac = (p[1] || '').slice(0, dec).padEnd(dec, '0'); return BigInt(p[0] || '0') * 10n ** BigInt(dec) + BigInt(frac || '0'); }
  async function call(to, data) { return pv.request({ method: 'eth_call', params: [{ to: to, data: data }, 'latest'] }); }
  async function decimals(tok) { var r = await call(tok, '0x313ce567'); return parseInt(r, 16); }
  async function receipt(hash) { for (var i = 0; i < 90; i++) { var r = await pv.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (r) return r; await new Promise(function (ok) { setTimeout(ok, 2000); }); } return null; }
  async function chain() { var c = await pv.request({ method: 'eth_chainId' }); if (String(c).toLowerCase() === CHAIN) return;
    try { await pv.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN }] }); }
    catch (e) { await pv.request({ method: 'wallet_addEthereumChain', params: [{ chainId: CHAIN, chainName: 'Robinhood Chain', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'], blockExplorerUrls: ['https://robinhoodchain.blockscout.com'] }] }); } }
  // prefill from the site: the token's address and the signer's (public) address
  fetch('/api/config').then(function (r) { return r.json(); }).then(function (c) { if (c.token && c.token.ca && !$('tok').value) $('tok').value = c.token.ca; }).catch(function () { });
  fetch('/api/health').then(function (r) { return r.json(); }).then(function (h) { var x = h.rewards || {}; if (x.signer && !$('sig').value) $('sig').value = x.signer; if (x.contract && !$('vault').value) $('vault').value = x.contract; }).catch(function () { });
  $('conn').onclick = async function () {
    if (!pv) { show('who', 'No wallet found. Open this page in your wallet app’s browser.', 'bad'); return; }
    try { from = (await pv.request({ method: 'eth_requestAccounts' }))[0]; await chain(); show('who', 'Connected: <b>' + from + '</b> on Robinhood Chain', 'ok'); $('dep').disabled = $('fund').disabled = $('chk').disabled = $('lim').disabled = false; }
    catch (e) { show('who', 'Couldn’t connect: ' + (e.message || e), 'bad'); }
  };
  (function () { var d = new Date(); d.setFullYear(d.getFullYear() + 1); $('unlock').value = d.toISOString().slice(0, 10); })();   // default: locked for a year
  function pctBps(v) { var n = Math.round(parseFloat(v) * 100); return n >= 1 && n <= 1000 ? n : 0; }   // 1% = 100 bps
  function unlockTs() { var v = $('unlock').value; return v ? Math.floor(new Date(v + 'T00:00:00Z').getTime() / 1000) : 0; }
  $('dep').onclick = async function () {
    var tok = $('tok').value.trim(), sig = $('sig').value.trim(), cap = $('cap').value.trim(), bps = pctBps($('bps').value), until = unlockTs();
    if (!isAddr(tok) || !isAddr(sig) || !/^\d+(\.\d+)?$/.test(cap) || !bps) { show('depOut', 'Check the token address, signer address, daily limit and % (0.01 to 10).', 'bad'); return; }
    if (!(until > Date.now() / 1000 + 86400)) { show('depOut', 'Pick an unlock date in the future.', 'bad'); return; }
    if (!confirm('Lock the vault until ' + new Date(until * 1000).toUTCString().slice(0, 16) + '? This date can never be changed.')) return;
    try {
      $('dep').disabled = true; show('depOut', 'Reading the token…');
      var dec = await decimals(tok), data = BYTECODE + hex32(tok) + hex32(sig) + units(cap, dec).toString(16).padStart(64, '0') + BigInt(bps).toString(16).padStart(64, '0') + BigInt(until).toString(16).padStart(64, '0');
      show('depOut', 'Confirm the deployment in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, data: data }] });
      show('depOut', 'Deploying… <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>');
      var r = await receipt(h);
      if (!r || r.status !== '0x1' || !r.contractAddress) { show('depOut', 'The deployment failed. Check the transaction in the explorer.', 'bad'); $('dep').disabled = false; return; }
      $('vault').value = r.contractAddress;
      show('depOut', 'Vault deployed: <b>' + r.contractAddress + '</b><br>Save this address: it’s your <code>CLAIM_CONTRACT</code>. Next, fund it.', 'ok');
    } catch (e) { show('depOut', 'Stopped: ' + (e.message || e), 'bad'); $('dep').disabled = false; }
  };
  $('chk').onclick = async function () {
    var vault = $('vault').value.trim(), tok = $('tok').value.trim(); if (!isAddr(vault)) { show('lockOut', 'Enter the vault address.', 'bad'); return; }
    try {
      var un = parseInt(await call(vault, '0xaa5dec6f'), 16), mx = BigInt(await call(vault, '0xeb339391')), bp = parseInt(await call(vault, '0xc8b07bbc'), 16), tl = BigInt(await call(vault, '0xa47d0b6d')), sg = '0x' + (await call(vault, '0x238ac933')).slice(26), dec = await decimals(tok), bal = BigInt(await call(tok, '0x70a08231' + hex32(vault)));
      var f = function (v) { return (v / 10n ** BigInt(dec)).toLocaleString(); };
      show('lockOut', 'Holds <b>' + f(bal) + '</b> tokens · locked until <b>' + new Date(un * 1000).toUTCString().slice(0, 16) + '</b> · daily limit <b>' + f(mx) + '</b> or <b>' + (bp / 100) + '%</b> of the vault · can still pay today <b>' + f(tl) + '</b> · signer ' + sg, 'ok');
    } catch (e) { show('lockOut', 'Couldn’t read it: ' + (e.message || e), 'bad'); }
  };
  $('lim').onclick = async function () {
    var vault = $('vault').value.trim(), tok = $('tok').value.trim(), cap = $('cap2').value.trim(), bps = pctBps($('bps2').value);
    if (!isAddr(vault) || !isAddr(tok) || !/^\d+(\.\d+)?$/.test(cap) || !bps) { show('limOut', 'Check the vault address, the limit and the % (0.01 to 10).', 'bad'); return; }
    try { var dec = await decimals(tok); show('limOut', 'Confirm in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, to: vault, data: '0x9883cffe' + units(cap, dec).toString(16).padStart(64, '0') + BigInt(bps).toString(16).padStart(64, '0') }] });
      var r = await receipt(h); show('limOut', r && r.status === '0x1' ? 'Updated: at most ' + Number(cap).toLocaleString() + ' tokens or ' + (bps / 100) + '% of the vault per day.' : 'That didn’t go through (only the owner can do this).', r && r.status === '0x1' ? 'ok' : 'bad');
    } catch (e) { show('limOut', 'Stopped: ' + (e.message || e), 'bad'); }
  };
  $('fund').onclick = async function () {
    var tok = $('tok').value.trim(), vault = $('vault').value.trim(), amt = $('amt').value.trim();
    if (!isAddr(tok) || !isAddr(vault) || !/^\d+(\.\d+)?$/.test(amt)) { show('fundOut', 'Check the token address, vault address and amount.', 'bad'); return; }
    try {
      $('fund').disabled = true; var dec = await decimals(tok);
      var data = '0xa9059cbb' + hex32(vault) + units(amt, dec).toString(16).padStart(64, '0');   // transfer(vault, amount)
      show('fundOut', 'Confirm the transfer of ' + Number(amt).toLocaleString() + ' tokens in your wallet…');
      var h = await pv.request({ method: 'eth_sendTransaction', params: [{ from: from, to: tok, data: data }] });
      var r = await receipt(h);
      show('fundOut', r && r.status === '0x1' ? 'Sent. The vault holds the rewards pool. <a href="https://robinhoodchain.blockscout.com/tx/' + h + '" target="_blank" rel="noopener">transaction</a>' : 'The transfer failed.', r && r.status === '0x1' ? 'ok' : 'bad');
      $('fund').disabled = false;
    } catch (e) { show('fundOut', 'Stopped: ' + (e.message || e), 'bad'); $('fund').disabled = false; }
  };
})();
