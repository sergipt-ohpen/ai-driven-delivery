// Genera un sitio estático de un solo HTML por variante.
// Uso: node build-site.mjs <variante>   (es | en | en-pm | ... = carpeta en content/)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const variant = process.argv[2] || 'es';
const SRC = path.join(__dirname, 'content', variant);
const OUT = path.join(__dirname, 'site', variant, 'index.html');
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, 'manifest.json'), 'utf8'));

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

let pid = 0;
let nav = '';
let articles = '';
let firstId = null;
for (const sec of manifest.sections) {
  nav += `<div class="mod"><div class="mod-t">${esc(sec.title)}</div><ul>`;
  for (const it of sec.items) {
    if (it.type === 'page') {
      const full = path.join(SRC, it.file);
      if (!fs.existsSync(full)) { nav += `<li class="dis">${esc(it.label)}</li>`; continue; }
      pid++; const id = 'p' + pid; if (!firstId) firstId = id;
      nav += `<li><a href="#${id}" data-id="${id}">${esc(it.label)}</a></li>`;
      let html = marked.parse(fs.readFileSync(full, 'utf8'));
      html = html.replace(/<img\b([^>]*?impolicy=Avatar[^>]*?)>/g, '<img class="avatar"$1>');
      articles += `<article id="${id}"><div class="crumb">${esc(sec.title)}</div>${html}</article>`;
    } else if (it.type === 'video') {
      nav += `<li class="dis vid" title="${esc(manifest.ui.videoTip)}">🎬 ${esc(it.label.replace(/^📼\s*/, ''))}</li>`;
    } else {
      nav += `<li class="dis" title="${esc(manifest.ui.pending)}">${esc(it.label)} <span class="pend">${esc(manifest.ui.pending)}</span></li>`;
    }
  }
  nav += `</ul></div>`;
}

const css = `
:root{--bg:#fff;--fg:#1e1e22;--muted:#7a7a85;--accent:#c0392b;--line:#ececf0;--side:#f7f7f9;--hover:#efeff3;--card:#fff;--code:#f0f0f4;--pre:#f6f6f8;--sidew:340px;}
[data-theme="dark"]{--bg:#16161a;--fg:#e6e6ea;--muted:#8b8b96;--accent:#ff6b5e;--line:#2b2b33;--side:#1c1c22;--hover:#26262e;--card:#1f1f26;--code:#2a2a33;--pre:#1f1f26;}
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
.mod{padding:6px 0;}
.mod-t{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);font-weight:700;padding:12px 20px 4px;}
.mod ul{list-style:none;margin:0;padding:0;}
.mod li{font-size:13.5px;line-height:1.35;}
.mod li a{display:block;padding:7px 20px 7px 24px;color:var(--fg);text-decoration:none;border-left:3px solid transparent;}
.mod li a:hover{background:var(--hover);}
.mod li a.active{background:var(--card);border-left-color:var(--accent);color:var(--accent);font-weight:600;}
.mod li.dis{padding:7px 20px 7px 24px;color:#b6b6bf;cursor:default;}
.mod li.pend,.mod li .pend{font-size:10px;color:#bbb;background:#eee;border-radius:3px;padding:1px 5px;margin-left:4px;}
.mod li.vid{color:#9a9aa3;}
#main{flex:1;overflow-y:auto;}
#content{max-width:820px;margin:0 auto;padding:44px 56px 120px;}
article{display:none;}
article.show{display:block;animation:f .18s ease;}
@keyframes f{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:none;}}
.crumb{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:8px;margin-bottom:20px;}
article h1{font-size:26px;line-height:1.2;margin:.2em 0 .6em;}
article h2{font-size:20px;margin-top:1.6em;}
article h3{font-size:17px;}
article a{color:var(--accent);}
article img{max-width:100%;height:auto;border-radius:6px;}
article img.avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;vertical-align:middle;}
article p:has(> img.avatar:only-child){margin-bottom:2px;}
article table{border-collapse:collapse;width:100%;margin:1em 0;}
article th,article td{border:1px solid var(--line);padding:7px 10px;text-align:left;}
article pre{background:var(--pre);padding:14px;border-radius:8px;overflow:auto;border:1px solid var(--line);}
article code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:.9em;}
article pre code{background:none;padding:0;}
article blockquote{margin:1em 0;padding:.4em 1em;border-left:4px solid var(--line);color:var(--muted);}
#burger{display:none;position:fixed;top:12px;left:12px;z-index:10;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;width:42px;height:40px;font-size:20px;cursor:pointer;}
@media(max-width:780px){
 #side{position:fixed;left:0;top:0;height:100%;z-index:9;transform:translateX(-100%);transition:transform .2s;box-shadow:0 0 30px rgba(0,0,0,.15);}
 body.open #side{transform:none;}
 #burger{display:block;}
 #content{padding:70px 22px 100px;}
}
`;

const js = `
const arts=[...document.querySelectorAll('article')];
const links=[...document.querySelectorAll('.mod a[data-id]')];
function show(id){
 const a=document.getElementById(id); if(!a)return;
 arts.forEach(x=>x.classList.remove('show')); a.classList.add('show');
 links.forEach(l=>l.classList.toggle('active',l.dataset.id===id));
 document.getElementById('main').scrollTop=0;
 document.body.classList.remove('open');
}
links.forEach(l=>l.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'','#'+l.dataset.id);show(l.dataset.id);}));
document.getElementById('burger').addEventListener('click',()=>document.body.classList.toggle('open'));
const tbtn=document.getElementById('theme');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);tbtn.textContent=t==='dark'?'☀️':'🌙';try{localStorage.setItem('a4d-theme',t);}catch(e){}}
tbtn.addEventListener('click',()=>setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
let saved;try{saved=localStorage.getItem('a4d-theme');}catch(e){}
setTheme(saved||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
show((location.hash||'#${firstId}').slice(1));
`;

const out = `<!doctype html><html lang="${manifest.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(manifest.title)}</title><style>${css}</style></head>
<body><button id="burger">☰</button><div id="layout">
<nav id="side"><div id="brand"><b>${esc(manifest.brand)}</b><span>${esc(manifest.subtitle)}</span><button id="theme" title="${esc(manifest.ui.theme)}">🌙</button></div>${nav}</nav>
<div id="main"><div id="content">${articles}</div></div>
</div><script>${js}</script></body></html>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log(`[${variant}] lecciones: ${pid} → ${OUT}`);
