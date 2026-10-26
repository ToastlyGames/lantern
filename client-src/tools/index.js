// Owner tools home: who's signed in, and sign out.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var post = function (b) { return fetch('/api/tools', { method: 'POST', headers: { 'content-type': 'application/json', 'x-lh': '1' }, body: JSON.stringify(b), credentials: 'same-origin' }).then(function (r) { return r.json(); }); };
  post({ action: 'whoami' }).then(function (d) { if (d.address) $('who').innerHTML = 'Signed in as <b>' + d.address + '</b>'; });
  $('out').onclick = function () { post({ action: 'logout' }).then(function () { location.href = '/tools'; }); };
})();
