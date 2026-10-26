// Sign in to the owner tools with an admin wallet (Sign-In with Ethereum). The server decides who's allowed.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var show = function (html, cls) { var e = $('who'); e.className = 'box ' + (cls || ''); e.innerHTML = html; };
  async function post(b) { var r = await fetch('/api/tools', { method: 'POST', headers: { 'content-type': 'application/json', 'x-lh': '1' }, body: JSON.stringify(b), credentials: 'same-origin' }); var d = {}; try { d = await r.json(); } catch (e) { } return { ok: r.ok, d: d }; }
  $('go').onclick = async function () {
    var pv = window.ethereum; if (!pv) { show('No wallet found. Open this page in your wallet app’s browser.', 'bad'); return; }
    try {
      $('go').disabled = true;
      var addr = (await pv.request({ method: 'eth_requestAccounts' }))[0];
      show('Checking ' + addr + '…');
      var n = await post({ action: 'nonce', address: addr });
      if (!n.ok) { show(n.d.msg || 'Not allowed.', 'bad'); $('go').disabled = false; return; }
      show('Sign the message in your wallet…');
      var hex = '0x' + Array.from(new TextEncoder().encode(n.d.message)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      var sig = await pv.request({ method: 'personal_sign', params: [hex, addr] });
      var v = await post({ action: 'verify', message: n.d.message, signature: sig });
      if (!v.ok) { show(v.d.msg || 'Sign-in failed.', 'bad'); $('go').disabled = false; return; }
      show('Signed in as <b>' + v.d.address + '</b>', 'ok'); location.reload();
    } catch (e) { show('Stopped: ' + (e.message || e), 'bad'); $('go').disabled = false; }
  };
})();
