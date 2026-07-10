// Genera un sitio estático de un solo HTML por variante.
// Uso: node build-site.mjs <variante>   (es | en | en-pm | ... = carpeta en content/)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const variant = process.argv[2] || 'es';
const SRC = path.join(__dirname, 'content', variant);
const OUT = path.join(__dirname, 'docs', variant, 'index.html');
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, 'manifest.json'), 'utf8'));

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ICON_RE = /^(\p{Extended_Pictographic}(?:️)?)\s*/u;
const splitIcon = label => {
  const m = label.match(ICON_RE);
  return m ? { icon: m[1], text: label.slice(m[0].length) } : { icon: '', text: label };
};

// Pase 1: recopila las páginas reales (con archivo existente) para poder
// calcular posición dentro del módulo, tiempo de lectura y navegación prev/next.
let pid = 0;
const pages = [];
const secTotals = manifest.sections.map(sec =>
  sec.items.filter(it => it.type === 'page' && fs.existsSync(path.join(SRC, it.file))).length
);

for (let s = 0; s < manifest.sections.length; s++) {
  const sec = manifest.sections[s];
  let idxInSec = 0;
  for (const it of sec.items) {
    if (it.type !== 'page') continue;
    const full = path.join(SRC, it.file);
    if (!fs.existsSync(full)) continue;
    idxInSec++; pid++;
    const id = 'p' + pid;
    const raw = fs.readFileSync(full, 'utf8');
    const words = raw.split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.round(words / 200));
    let html = marked.parse(raw);
    html = html.replace(/<img\b([^>]*?impolicy=Avatar[^>]*?)>/g, '<img class="avatar"$1>');
    html = html.replace(/<img\b(?![^>]*\bclass=)([^>]*?)>/g, '<img loading="lazy" decoding="async"$1>');
    const { icon, text } = splitIcon(it.label);
    pages.push({ id, secTitle: sec.title, secIdx: s, idxInSec, totalInSec: secTotals[s], icon, text, label: it.label, html, mins });
  }
}
const firstId = pages[0]?.id || null;

// Pase 2: nav lateral (misma estructura para todos los tipos de item).
let nav = '';
let p = 0;
for (let s = 0; s < manifest.sections.length; s++) {
  const sec = manifest.sections[s];
  nav += `<div class="mod"><div class="mod-t"><span>${esc(sec.title)}</span>${secTotals[s] ? `<span class="mod-count" data-total="${secTotals[s]}">0/${secTotals[s]}</span>` : ''}</div><ul>`;
  for (const it of sec.items) {
    if (it.type === 'page') {
      const full = path.join(SRC, it.file);
      if (!fs.existsSync(full)) { nav += `<li class="dis">${esc(it.label)}</li>`; continue; }
      const pg = pages[p++];
      nav += `<li><a href="#${pg.id}" data-id="${pg.id}"><span class="ic">${esc(pg.icon)}</span><span class="tx">${esc(pg.text)}</span><span class="chk">✓</span></a></li>`;
    } else if (it.type === 'video') {
      nav += `<li class="dis vid" title="${esc(manifest.ui.videoTip)}">🎬 ${esc(it.label.replace(/^📼\s*/, ''))}</li>`;
    } else {
      nav += `<li class="dis" title="${esc(manifest.ui.pending)}">${esc(it.label)} <span class="pend">${esc(manifest.ui.pending)}</span></li>`;
    }
  }
  nav += `</ul></div>`;
}

// Pase 3: artículos, con cabecera de metadatos y navegación prev/next.
let articles = '';
for (let i = 0; i < pages.length; i++) {
  const pg = pages[i];
  const prev = pages[i - 1];
  const next = pages[i + 1];
  const prevBtn = prev ? `<a class="nav-btn prev" href="#${prev.id}" data-id="${prev.id}"><span class="nb-dir">← Previous</span><span class="nb-label">${esc(prev.icon)} ${esc(prev.text)}</span></a>` : '<span class="nav-spacer"></span>';
  const nextBtn = next ? `<a class="nav-btn next" href="#${next.id}" data-id="${next.id}"><span class="nb-dir">Next →</span><span class="nb-label">${esc(next.icon)} ${esc(next.text)}</span></a>` : '<span class="nav-btn next done">🎉 That\'s the course</span>';
  articles += `<article id="${pg.id}">` +
    `<div class="art-meta"><span class="badge sec">${esc(pg.secTitle)}</span><span class="dot">·</span><span class="badge idx">Lesson ${pg.idxInSec} of ${pg.totalInSec}</span><span class="dot">·</span><span class="badge time">⏱ ${pg.mins} min</span></div>` +
    pg.html +
    `<nav class="art-nav">${prevBtn}${nextBtn}</nav>` +
    `</article>`;
}

const css = `
:root{--bg:#fff;--fg:#1e1e22;--muted:#7a7a85;--accent:#c0392b;--accent2:#2f6fed;--line:#ececf0;--side:#f7f7f9;--hover:#efeff3;--card:#fff;--code:#f0f0f4;--pre:#f6f6f8;--quote-bg:rgba(47,111,237,.06);--sidew:340px;}
[data-theme="dark"]{--bg:#16161a;--fg:#e6e6ea;--muted:#8b8b96;--accent:#ff6b5e;--accent2:#5b9bff;--line:#2b2b33;--side:#1c1c22;--hover:#26262e;--card:#1f1f26;--code:#2a2a33;--pre:#1f1f26;--quote-bg:rgba(91,155,255,.1);}
*{box-sizing:border-box;}
html,body{margin:0;height:100%;}
body{font-family:-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:var(--bg);}
#layout{display:flex;height:100vh;overflow:hidden;}
#side{width:var(--sidew);flex:0 0 var(--sidew);background:var(--side);border-right:1px solid var(--line);overflow-y:auto;padding:0 0 40px;}
#brand{position:sticky;top:0;background:var(--side);padding:18px 52px 18px 20px;border-bottom:1px solid var(--line);z-index:2;}
#brand b{display:block;font-size:15px;}
#brand span{font-size:12px;color:var(--muted);}
#theme{position:absolute;top:16px;right:16px;width:32px;height:32px;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:8px;cursor:pointer;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;}
#theme:hover{background:var(--hover);}
.mod{padding:10px 0;}
.mod-t{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);font-weight:700;padding:12px 20px 6px;}
.mod-count{font-size:10px;letter-spacing:0;text-transform:none;font-weight:700;color:var(--muted);background:var(--hover);border-radius:20px;padding:2px 8px;}
.mod ul{list-style:none;margin:0;padding:0;}
.mod li{font-size:13.5px;line-height:1.35;}
.mod li a{display:flex;align-items:center;gap:9px;padding:7px 16px 7px 20px;color:var(--fg);text-decoration:none;border-left:3px solid transparent;}
.mod li a .ic{font-size:15px;flex:0 0 auto;}
.mod li a .tx{flex:1;}
.mod li a .chk{flex:0 0 auto;font-size:12px;color:#2e9e5b;opacity:0;transform:scale(.6);transition:opacity .15s,transform .15s;}
.mod li a.done .chk{opacity:1;transform:none;}
.mod li a:hover{background:var(--hover);}
.mod li a.active{background:var(--card);border-left-color:var(--accent);color:var(--accent);font-weight:600;}
.mod li.dis{padding:7px 20px 7px 24px;color:#b6b6bf;cursor:default;}
.mod li.pend,.mod li .pend{font-size:10px;color:#bbb;background:#eee;border-radius:3px;padding:1px 5px;margin-left:4px;}
.mod li.vid{color:#9a9aa3;}
#main{flex:1;overflow-y:auto;position:relative;}
#progresswrap{position:sticky;top:0;height:3px;background:var(--line);z-index:3;}
#progressbar{height:100%;width:0;background:var(--accent);transition:width .3s;}
#content{max-width:820px;margin:0 auto;padding:40px 56px 100px;}
article{display:none;}
article.show{display:block;animation:f .18s ease;}
@keyframes f{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:none;}}
.art-meta{display:flex;align-items:center;gap:10px;margin-bottom:22px;}
.art-meta .badge{font-size:11.5px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.03em;}
.art-meta .badge.sec{color:var(--accent);}
.art-meta .dot{color:var(--line);}
article h1{font-size:27px;line-height:1.25;margin:.1em 0 .7em;}
article h2{font-size:20px;margin-top:2em;padding-top:.6em;border-top:1px solid var(--line);}
article h3{font-size:17px;margin-top:1.6em;}
article p,article li{line-height:1.7;}
article p{margin:1em 0;}
article a{color:var(--accent);}
article img{max-width:100%;height:auto;border-radius:8px;border:1px solid var(--line);}
article img.avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;vertical-align:middle;border:none;}
article p:has(> img.avatar:only-child){margin-bottom:2px;}
article table{border-collapse:collapse;width:100%;margin:1em 0;}
article th,article td{border:1px solid var(--line);padding:7px 10px;text-align:left;}
article pre{position:relative;background:var(--pre);padding:30px 14px 14px;border-radius:10px;overflow:auto;border:1px solid var(--line);}
article pre::before{content:"📋 Copy this";position:absolute;top:9px;left:14px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);}
article pre:has(code.language-diagram){background:var(--card);}
article pre:has(code.language-diagram)::before{content:"🗺️ How it fits together";}
article pre:has(code.language-diagram) code{display:inline-block;font-size:12.5px;line-height:1.55;}
article code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:.9em;}
article pre code{background:none;padding:0;}
.diagram-wrap{margin:1.4em 0;overflow-x:auto;}
.diagram-wrap svg{display:block;width:100%;height:auto;min-width:560px;}
article blockquote{position:relative;margin:1.4em 0;padding:1.6em 1.1em .9em;border:1px solid var(--line);border-left:4px solid var(--accent2);border-radius:10px;background:var(--quote-bg);color:var(--fg);}
article blockquote::before{content:"💬 Try this prompt";position:absolute;top:.7em;left:1.1em;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--accent2);}
article blockquote p{margin:0;font-style:italic;}
.art-nav{display:flex;gap:14px;margin-top:3em;padding-top:1.6em;border-top:1px solid var(--line);}
.nav-btn{flex:1;display:flex;flex-direction:column;gap:3px;padding:12px 16px;border:1px solid var(--line);border-radius:10px;text-decoration:none;color:var(--fg);background:var(--card);}
.nav-btn:hover{background:var(--hover);}
.nav-btn.next{text-align:right;align-items:flex-end;}
.nav-btn.next:not(.done){background:var(--accent);border-color:var(--accent);color:#fff;}
.nav-btn.next:not(.done) .nb-dir{color:rgba(255,255,255,.8);}
.nav-btn.next.done{cursor:default;text-align:center;align-items:center;}
.nb-dir{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);}
.nb-label{font-size:13.5px;font-weight:600;}
.nav-spacer{flex:1;}
#burger{display:none;position:fixed;top:12px;left:12px;z-index:10;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;width:42px;height:40px;font-size:20px;cursor:pointer;}
@media(max-width:780px){
 #side{position:fixed;left:0;top:0;height:100%;z-index:9;transform:translateX(-100%);transition:transform .2s;box-shadow:0 0 30px rgba(0,0,0,.15);}
 body.open #side{transform:none;}
 #burger{display:block;}
 #content{padding:70px 22px 100px;}
 .art-nav{flex-direction:column;}
 .nav-btn.next{text-align:left;align-items:flex-start;}
}
`;

const js = `
const arts=[...document.querySelectorAll('article')];
const navLinks=[...document.querySelectorAll('.mod a[data-id]')];
const visitedKey='a4d-visited-${variant}';
let visited;try{visited=new Set(JSON.parse(localStorage.getItem(visitedKey)||'[]'));}catch(e){visited=new Set();}
function saveVisited(){try{localStorage.setItem(visitedKey,JSON.stringify([...visited]));}catch(e){}}
function updateProgress(){
 document.querySelectorAll('.mod').forEach(mod=>{
  const links=[...mod.querySelectorAll('a[data-id]')];
  if(!links.length)return;
  const done=links.filter(l=>visited.has(l.dataset.id)).length;
  const badge=mod.querySelector('.mod-count'); if(badge) badge.textContent=done+'/'+links.length;
  links.forEach(l=>l.classList.toggle('done',visited.has(l.dataset.id)));
 });
 const total=navLinks.length,done=navLinks.filter(l=>visited.has(l.dataset.id)).length;
 const bar=document.getElementById('progressbar'); if(bar) bar.style.width=(total?done/total*100:0)+'%';
}
function show(id){
 const a=document.getElementById(id); if(!a)return;
 arts.forEach(x=>x.classList.remove('show')); a.classList.add('show');
 navLinks.forEach(l=>l.classList.toggle('active',l.dataset.id===id));
 document.getElementById('main').scrollTop=0;
 document.body.classList.remove('open');
 visited.add(id); saveVisited(); updateProgress();
}
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-id]'); if(!el)return;
 e.preventDefault(); history.replaceState(null,'','#'+el.dataset.id); show(el.dataset.id);
});
document.getElementById('burger').addEventListener('click',()=>document.body.classList.toggle('open'));
const tbtn=document.getElementById('theme');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);tbtn.textContent=t==='dark'?'☀️':'🌙';try{localStorage.setItem('a4d-theme',t);}catch(e){}}
tbtn.addEventListener('click',()=>setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
let saved;try{saved=localStorage.getItem('a4d-theme');}catch(e){}
setTheme(saved||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
updateProgress();
show((location.hash||'#${firstId}').slice(1));
`;

const out = `<!doctype html><html lang="${manifest.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(manifest.title)}</title><style>${css}</style></head>
<body><button id="burger">☰</button><div id="layout">
<nav id="side"><div id="brand"><b>${esc(manifest.brand)}</b><span>${esc(manifest.subtitle)}</span><button id="theme" title="${esc(manifest.ui.theme)}">🌙</button></div>${nav}</nav>
<div id="main"><div id="progresswrap"><div id="progressbar"></div></div><div id="content">${articles}</div></div>
</div><script>${js}</script></body></html>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);

const IMAGES_SRC = path.join(SRC, 'images');
const IMAGES_OUT = path.join(path.dirname(OUT), 'images');
if (fs.existsSync(IMAGES_SRC)) {
  fs.cpSync(IMAGES_SRC, IMAGES_OUT, { recursive: true });
}

console.log(`[${variant}] lecciones: ${pid} → ${OUT}`);
