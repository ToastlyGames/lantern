// Lanternhold wiki: mobile menu, current-section highlight in the contents, and instant search.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var toc = $('toc'), menu = $('menu'), q = $('q'), none = $('none');
  var sections = [].slice.call(document.querySelectorAll('main section'));
  var links = [].slice.call(toc.querySelectorAll('a'));

  menu.addEventListener('click', function () { var o = toc.classList.toggle('open'); menu.setAttribute('aria-expanded', o); });
  toc.addEventListener('click', function (e) { if (e.target.tagName === 'A') { toc.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });

  // highlight the section being read
  var heads = [].slice.call(document.querySelectorAll('main h2[id], main section[id], main h3[id]'));
  function spy() {
    var y = window.scrollY + 90, cur = null;
    heads.forEach(function (h) { if (h.offsetParent !== null && h.getBoundingClientRect().top + window.scrollY <= y) cur = h.id; });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', spy, { passive: true }); spy();

  // search: keep only the paragraphs, list items and table rows that match, inside the sections that match
  var blocks = [];
  sections.forEach(function (s) {
    [].slice.call(s.children).forEach(function (el) {
      if (el.tagName === 'H2') return;
      blocks.push({ s: s, el: el, rows: [].slice.call(el.querySelectorAll('tbody tr, li, article')) });
    });
  });
  var marked = [];
  function unmark() { marked.forEach(function (m) { var p = m.parentNode; if (p) { p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); } }); marked = []; }
  function mark(el, term) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n, hits = [];
    while ((n = w.nextNode())) { var i = n.nodeValue.toLowerCase().indexOf(term); if (i >= 0) hits.push([n, i]); }
    hits.forEach(function (h) { var n = h[0], r = n.splitText(h[1]); r.splitText(term.length); var m = document.createElement('mark'); m.textContent = r.nodeValue; r.parentNode.replaceChild(m, r); marked.push(m); });
  }
  function run() {
    var term = q.value.trim().toLowerCase(); unmark();
    var shown = new Set();
    blocks.forEach(function (b) {
      b.el.classList.remove('hide'); b.rows.forEach(function (r) { r.classList.remove('hide'); });
      if (!term) return;
      var hit = b.el.textContent.toLowerCase().indexOf(term) >= 0;
      if (hit && b.rows.length) b.rows.forEach(function (r) { r.classList.toggle('hide', r.textContent.toLowerCase().indexOf(term) < 0 && !r.closest('ul ul')); });
      b.el.classList.toggle('hide', !hit && !/^H3$/.test(b.el.tagName));
      if (hit) { shown.add(b.s); mark(b.el, term); }
    });
    sections.forEach(function (s) { s.classList.toggle('hide', !!term && !shown.has(s) && s.querySelector('h2').textContent.toLowerCase().indexOf(term) < 0); });
    // hide sub-headings with nothing under them
    if (term) [].slice.call(document.querySelectorAll('main h3')).forEach(function (h) {
      var n = h.nextElementSibling, any = false; while (n && n.tagName !== 'H3') { if (!n.classList.contains('hide')) any = true; n = n.nextElementSibling; }
      h.classList.toggle('hide', !any && h.textContent.toLowerCase().indexOf(term) < 0);
    });
    none.style.display = term && !sections.some(function (s) { return !s.classList.contains('hide'); }) ? 'block' : 'none';
    document.querySelector('.hero').classList.toggle('hide', !!term);
  }
  var t; q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 120); });
  q.addEventListener('keydown', function (e) { if (e.key === 'Escape') { q.value = ''; run(); } });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); } });
})();
