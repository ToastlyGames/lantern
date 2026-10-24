// Builds the public wiki at lanternhold.fun/wiki from docs/WIKI.md (the one source) plus the Bulletin's update history.
// Output: public/wiki/index.html (static, no inline scripts so it fits the site's Content-Security-Policy) + wiki.js (search, menu).
// Markdown support is the subset the wiki uses: # / ## / ### headings, paragraphs, - and 1. lists, tables, **bold**, _italic_, `code`, [links](url).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { tokenInfo } from '../lib/token.js';

const root = new URL('../', import.meta.url);
const read = p => readFileSync(new URL(p, root), 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function inline(s) {
  s = esc(s).replace(/\\_/g, '_');
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])_([^_]+)_(?=[\s).,]|$)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[a-z0-9-]+|\/[^)\s]*)\)/g, (m, t, u) => `<a href="${u}"${u.startsWith('http') ? ' rel="noopener"' : ''}>${t}</a>`);
}

// markdown → { title, subtitle, sections: [{ id, title, html, subs: [{id,title}] }] }
function parse(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  let title = '', subtitle = '', sections = [], cur = null, i = 0;
  const out = h => { if (cur) cur.html += h + '\n'; };
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = /^# (.*)/.exec(l))) { title = m[1]; i++; if (lines[i] === '' && lines[i + 1] && !/^#/.test(lines[i + 1])) { subtitle = lines[i + 1]; i += 2; } continue; }
    if ((m = /^## (.*)/.exec(l))) { cur = { id: slug(m[1]), title: m[1], html: '', subs: [] }; sections.push(cur); i++; continue; }
    if ((m = /^### (.*)/.exec(l))) { const id = cur.id + '-' + slug(m[1]); cur.subs.push({ id, title: m[1] }); out(`<h3 id="${id}">${inline(m[1])}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h3>`); i++; continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(rows[0]), body = rows.slice(2).map(cells);
      out(`<div class="tbl"><table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^- /.test(l)) { const it = []; while (i < lines.length && /^- /.test(lines[i])) it.push(lines[i++].slice(2)); out(`<ul>${it.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`); continue; }
    if (/^\d+\. /.test(l)) { const it = []; while (i < lines.length && /^\d+\. /.test(lines[i])) it.push(lines[i++].replace(/^\d+\. /, '')); out(`<ol>${it.map(x => `<li>${inline(x)}</li>`).join('')}</ol>`); continue; }
    // paragraph: consecutive plain lines; a **bold question** line followed by an answer becomes a FAQ pair
    const para = []; while (i < lines.length && lines[i].trim() && !/^(#|\||- |\d+\. )/.test(lines[i])) para.push(lines[i++]);
    if (para.length === 2 && /^\*\*.*\?\*\*$/.test(para[0])) out(`<div class="qa"><p class="q">${inline(para[0].replace(/\*\*/g, ''))}</p><p>${inline(para[1])}</p></div>`);
    else out(`<p>${inline(para.join(' '))}</p>`);
  }
  return { title, subtitle, sections };
}

export function buildWiki() {
  const { BUILD, CHANGELOG } = new Function(read('client-src/changelog.js') + '\nreturn { BUILD, CHANGELOG };')();
  const parsed = parse(read('docs/WIKI.md')), { title, sections } = parsed;
  const subtitle = parsed.subtitle.replace(/build v[\d.]+/, 'build v' + BUILD.version);   // always the live build
  const fmtDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  // the official token (from TOKEN_CA at build time, the same value the in-game Bulletin shows), right after Welcome
  { const t = tokenInfo();
    sections.splice(1, 0, { id: 'token', title: 'Official token', subs: [], html: t
      ? `<div class="ca"><b>Official ${t.symbol ? '$' + esc(t.symbol) + ' ' : ''}contract address</b><button class="caaddr" id="caCopy" type="button" data-ca="${t.ca}" title="${t.ca}" aria-label="Copy the contract address">${t.ca}</button><small id="caMsg">Click the address to copy it · Robinhood Chain · launched on Pons</small></div>\n<p>This is the only official contract address. It's also shown on the Bulletin in the Hold. Always check an address against one of these two places before you buy, and never trust an address sent to you in a DM.</p>`
      : `<p>The official contract address will be posted on the Bulletin in the Hold and here at launch. Until then, any address you see anywhere else is not ours.</p>` }); }
  sections.push({
    id: 'updates', title: 'Updates', subs: [],
    html: `<p>Every update to the game, newest first. The same list is on the Bulletin at the crossroads in the Hold.</p>\n` +
      CHANGELOG.map((e, k) => `<article class="upd${k ? '' : ' latest'}"><header><b>v${esc(e.v)}</b><span>${esc(e.title)}</span><time datetime="${e.date}">${fmtDate(e.date)}</time></header><ul>${e.notes.map(n => `<li>${inline(n)}</li>`).join('')}</ul></article>`).join('\n')
  });
  const font = read('client-src/fontface.css');
  const nav = sections.map(s => `<li><a href="#${s.id}">${inline(s.title)}</a>${s.subs.length ? `<ul>${s.subs.map(x => `<li><a href="#${x.id}">${inline(x.title)}</a></li>`).join('')}</ul>` : ''}</li>`).join('');
  const body = sections.map(s => `<section id="${s.id}"><h2>${inline(s.title)}<a class="anchor" href="#${s.id}" aria-label="Link to this section">#</a></h2>\n${s.html}</section>`).join('\n');
  const desc = 'The official Lanternhold wiki: skills, the Hold, the Depths, gear, goals, trading and every update. Lanternhold is a pixel-art dungeon MMO for Robinhood Chain.';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lanternhold Wiki</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://lanternhold.fun/wiki/">
<meta name="theme-color" content="#1a1c2c">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lanternhold">
<meta property="og:title" content="Lanternhold Wiki">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://lanternhold.fun/wiki/">
<meta property="og:image" content="https://lanternhold.fun/wiki/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Lanternhold Wiki">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://lanternhold.fun/wiki/og.png">
<link rel="icon" href="/favicon.ico?v=2" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2">
<style>
${font}
:root{--ink:#1a1c2c;--deep:#0f1020;--panel:#20243a;--panel2:#2a3050;--line:#3d4a66;--text:#eef1f5;--muted:#a9bdcc;--gold:#ffcd75;--green:#a7f070;--link:#8fd3ff;--pix:"Jersey 10",ui-monospace,monospace;--sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:72px;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--deep);color:var(--text);font:16px/1.6 var(--sans)}
a{color:var(--link)}a:hover{color:var(--gold)}
.top{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:10px 16px;background:rgba(15,16,32,.94);backdrop-filter:blur(6px);border-bottom:2px solid var(--ink);box-shadow:0 2px 0 var(--line)}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--gold);font:28px/1 var(--pix);white-space:nowrap}
.brand img{width:30px;height:30px;image-rendering:pixelated}
.brand small{color:var(--muted);font-size:20px}
.search{flex:1;min-width:0;max-width:420px;margin-left:auto}
.search input{width:100%;font:16px var(--sans);padding:8px 12px;background:var(--panel);color:var(--text);border:2px solid var(--line);border-radius:0;outline:none}
.search input:focus{border-color:var(--gold)}
.play{font:20px/1 var(--pix);color:var(--ink);background:var(--gold);padding:9px 14px;text-decoration:none;border:2px solid var(--ink);box-shadow:0 3px 0 #b07a2a;white-space:nowrap}
.play:hover{color:var(--ink);filter:brightness(1.08)}
.menu{display:none;font:20px var(--pix);background:var(--panel);color:var(--text);border:2px solid var(--line);padding:6px 10px}
.wrap{display:grid;grid-template-columns:250px minmax(0,1fr);max-width:1180px;margin:0 auto;gap:32px;padding:0 16px}
nav.toc{position:sticky;top:70px;align-self:start;max-height:calc(100vh - 80px);overflow:auto;padding:20px 0 30px}
nav.toc ul{list-style:none;margin:0;padding:0}nav.toc li{margin:0}
nav.toc>ul>li>a{display:block;font:21px/1.3 var(--pix);color:var(--text);text-decoration:none;padding:5px 10px;border-left:3px solid transparent}
nav.toc ul ul a{display:block;font-size:14px;color:var(--muted);text-decoration:none;padding:2px 10px 2px 22px;border-left:3px solid transparent}
nav.toc a.on{border-left-color:var(--gold);color:var(--gold)}nav.toc a:hover{color:var(--gold)}
main{padding:8px 0 80px;min-width:0}
.hero{position:relative;margin:20px 0 8px;border:2px solid var(--ink);box-shadow:0 0 0 2px var(--line);overflow:hidden;background:var(--ink)}
.hero img{display:block;width:100%;height:auto;image-rendering:pixelated;aspect-ratio:2/1;object-fit:cover}
.hero .cap{position:absolute;left:0;right:0;bottom:0;padding:40px 20px 14px;background:linear-gradient(transparent,rgba(11,12,20,.92))}
h1{font:52px/1 var(--pix);color:var(--gold);margin:0;text-shadow:3px 3px 0 var(--ink)}
.sub{color:var(--muted);margin:6px 0 0;font-size:15px}
section{padding-top:14px}
h2{font:38px/1.1 var(--pix);color:var(--gold);margin:34px 0 10px;padding-bottom:6px;border-bottom:2px solid var(--line)}
h3{font:28px/1.15 var(--pix);color:var(--text);margin:28px 0 8px}
h2 .anchor,h3 .anchor{font-size:.6em;margin-left:10px;color:var(--line);text-decoration:none;opacity:0}h2:hover .anchor,h3:hover .anchor{opacity:1}
p,li{max-width:72ch}strong{color:#fff}
code{background:var(--panel2);padding:1px 5px}
.tbl{overflow-x:auto;margin:12px 0 18px;border:2px solid var(--ink);box-shadow:0 0 0 1px var(--line)}
table{border-collapse:collapse;width:100%;font-size:15px}
th{font:19px/1.2 var(--pix);text-align:left;color:var(--gold);background:var(--panel2);padding:8px 10px;white-space:nowrap}
td{padding:7px 10px;border-top:1px solid var(--line);vertical-align:top}
tbody tr:nth-child(odd) td{background:rgba(255,255,255,.025)}
.qa{background:var(--panel);border-left:3px solid var(--gold);padding:10px 14px;margin:10px 0}.qa p{margin:0}.qa .q{font-weight:700;color:#fff;margin-bottom:4px}
.upd{background:var(--panel);border:2px solid var(--ink);box-shadow:0 0 0 1px var(--line);padding:10px 14px;margin:0 0 12px}
.upd.latest{box-shadow:0 0 0 2px var(--gold)}
.upd header{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}
.upd b{font:26px/1 var(--pix);color:var(--gold)}.upd span{font:22px/1 var(--pix)}.upd time{margin-left:auto;color:var(--muted);font-size:14px}
.upd ul{margin:8px 0 2px;padding-left:20px}
mark{background:var(--gold);color:var(--ink);padding:0 2px}
.ca{background:var(--panel);border:2px solid var(--gold);padding:12px 14px;margin:12px 0}.ca b{display:block;font:24px/1.1 var(--pix);color:var(--gold);margin-bottom:8px}.ca small{display:block;color:var(--muted);margin-top:6px}.ca small.ok{color:var(--green)}
.caaddr{display:block;width:100%;text-align:center;font:600 16px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;overflow:hidden;color:var(--text);background:var(--panel2);border:2px solid var(--line);padding:8px 10px;cursor:pointer;user-select:none}.caaddr:hover{border-color:var(--gold)}
.none{display:none;background:var(--panel);padding:14px;border:2px solid var(--line);margin-top:20px}
.hide{display:none!important}
footer{border-top:2px solid var(--line);margin-top:50px;padding:20px 0;color:var(--muted);font-size:14px}
@media (max-width:860px){
  .wrap{grid-template-columns:1fr;gap:0}
  .menu{display:block}
  nav.toc{display:none;position:fixed;inset:58px 0 0 0;max-height:none;background:var(--deep);z-index:4;padding:14px 16px 40px}
  nav.toc.open{display:block}
  .brand small{display:none}
  h1{font-size:40px}h2{font-size:32px}
  .hero .cap{position:static;background:var(--panel);padding:14px 16px}
}
@media (max-width:520px){.play{display:none}.brand{font-size:24px}.brand span{display:none}.top{gap:8px}table{font-size:14px}th{font-size:17px}}
</style>
</head>
<body>
<header class="top">
  <button class="menu" id="menu" aria-expanded="false" aria-controls="toc">Menu</button>
  <a class="brand" href="/wiki/"><img src="/favicon-32.png?v=2" alt=""><span>Lanternhold</span> <small>Wiki</small></a>
  <div class="search"><input id="q" type="search" placeholder="Search the wiki" aria-label="Search the wiki" autocomplete="off"></div>
  <a class="play" href="/">Play now</a>
</header>
<div class="wrap">
<nav class="toc" id="toc" aria-label="Contents"><ul>${nav}</ul></nav>
<main>
<div class="hero"><img src="/wiki/hold.png" alt="The Hold: farm, lake with a dock, trees and the crossroads" width="1200" height="600"><div class="cap"><h1>${inline(title)}</h1><p class="sub">${inline(subtitle)}</p></div></div>
${body}
<p class="none" id="none">Nothing in the wiki matches that search.</p>
<footer>The official wiki for <a href="https://lanternhold.fun">Lanternhold</a> · ${esc(BUILD.season)} · build v${esc(BUILD.version)}. The only official site is lanternhold.fun.</footer>
</main>
</div>
<script src="/wiki/wiki.js"></script>
</body>
</html>
`;
  mkdirSync(new URL('public/wiki/', root), { recursive: true });
  writeFileSync(new URL('public/wiki/index.html', root), html);
  copyFileSync(new URL('client-src/wiki/wiki.js', root), new URL('public/wiki/wiki.js', root));
  for (const f of ['hold.png', 'og.png']) if (existsSync(new URL('client-src/wiki/' + f, root))) copyFileSync(new URL('client-src/wiki/' + f, root), new URL('public/wiki/' + f, root));
  // search engines: what to crawl
  writeFileSync(new URL('public/robots.txt', root), 'User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://lanternhold.fun/sitemap.xml\n');
  writeFileSync(new URL('public/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://lanternhold.fun/</loc><lastmod>${BUILD.date}</lastmod></url>\n  <url><loc>https://lanternhold.fun/wiki/</loc><lastmod>${BUILD.date}</lastmod></url>\n</urlset>\n`);
}
