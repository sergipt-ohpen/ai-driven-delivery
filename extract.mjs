// Extrae las lecciones desde ~/Downloads/clippings (md crudos del clipper),
// las limpia (frontmatter + navegación de la plataforma) y las copia a
// content/es/ con nombres slug, junto a un manifest.json con la estructura.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIR = '/Users/sergipt/Downloads/clippings';
const INDEX = path.join(DIR, '🗂️ Índice — AI4Devs 2026 06 Seniors.md');
const OUTDIR = path.join(__dirname, 'content', 'es');

function stripFrontmatter(md) {
  if (md.startsWith('---')) {
    const end = md.indexOf('\n---', 3);
    if (end !== -1) return md.slice(md.indexOf('\n', end + 1) + 1);
  }
  return md;
}
function cleanContent(md) {
  const lines = md.split('\n');
  // El contenido real empieza en el primer H1 FUERA de bloques de código
  // posterior al menú de la plataforma (cuyo final marca "Contraer todo");
  // los "# ..." dentro de fences son comentarios de ejemplos y no cuentan.
  let menuEnd = -1;
  lines.forEach((l, i) => { if (l.includes('Contraer todo')) menuEnd = i; });
  const heads = [];
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('```')) { fence = !fence; continue; }
    if (!fence && /^#\s+\S/.test(lines[i])) heads.push(i);
  }
  let start = heads.find(i => i > menuEnd) ?? heads[0] ?? 0;
  const footer = new Set(['Anterior', 'Siguiente', 'Editar Sección', 'Contraer todo', 'Explora más publicaciones']);
  const dblImg = /^-\s+!\[[^\]]*\]\([^)]*\)\s+!\[/;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (footer.has(t) || dblImg.test(t) || /Visibilidad:\s*Visible/.test(t)) { end = i; break; }
  }
  return lines.slice(start, end).join('\n');
}
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^\x20-\x7E]/g, ' ').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const sections = [];
let cur = null;
const linkRe = /^-\s+\[(.+?)\]\(<?(.+?)>?\)\s*$/;
const plainRe = /^-\s+(.+?)\s*(·\s*pendiente)?\s*$/;
for (const line of fs.readFileSync(INDEX, 'utf8').split('\n')) {
  const h = line.match(/^##\s+(.+)/);
  if (h) { cur = { title: h[1].trim(), items: [] }; sections.push(cur); continue; }
  if (!cur) continue;
  if (/Eval[úu]a el contenido/i.test(line)) continue;
  const m = line.match(linkRe);
  if (m) {
    const label = m[1].trim(), target = m[2].trim();
    if (target.includes('Índice —')) continue;
    if (target.endsWith('.md')) cur.items.push({ type: 'page', label, src: target });
    else if (target.endsWith('.mp4')) cur.items.push({ type: 'video', label });
    continue;
  }
  const p = line.match(plainRe);
  if (p && line.includes('pendiente')) cur.items.push({ type: 'pending', label: p[1].replace(/·\s*pendiente/, '').trim() });
}

fs.mkdirSync(OUTDIR, { recursive: true });
let n = 0;
for (const sec of sections) {
  for (const it of sec.items) {
    if (it.type !== 'page') continue;
    const full = path.join(DIR, it.src);
    if (!fs.existsSync(full)) { it.type = 'pending'; delete it.src; continue; }
    n++;
    it.file = `${String(n).padStart(2, '0')}-${slug(it.label)}.md`;
    fs.writeFileSync(path.join(OUTDIR, it.file),
      cleanContent(stripFrontmatter(fs.readFileSync(full, 'utf8'))));
    delete it.src;
  }
}

const manifest = {
  lang: 'es',
  title: 'AI4Devs 2026/06 Seniors — Curso',
  brand: '🎓 AI4Devs 2026/06 Seniors',
  subtitle: 'Documentación del curso',
  ui: { pending: 'pendiente', videoTip: 'Vídeo no incluido en este paquete', theme: 'Cambiar tema' },
  sections,
};
fs.writeFileSync(path.join(OUTDIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Lecciones extraídas:', n);
