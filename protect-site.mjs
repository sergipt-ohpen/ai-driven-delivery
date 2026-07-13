// Regenera (en plano) y protege con contraseña las 4 paginas de docs/.
// Requiere STATICRYPT_PASSWORD en el entorno (no se guarda en el repo).
// Uso: STATICRYPT_PASSWORD="..." node protect-site.mjs
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

if (!process.env.STATICRYPT_PASSWORD) {
  console.error('Falta STATICRYPT_PASSWORD en el entorno.');
  process.exit(1);
}

const STATICRYPT_CLI = path.join('node_modules', 'staticrypt', 'cli', 'index.js');
const BUILD_SITE = 'build-site.mjs';

// { variant: null para la landing (no tiene build-site.mjs, la fuente es landing.html),
//   o el nombre de variante que build-site.mjs regenera en plano justo antes de cifrar. }
const pages = [
  { variant: null, input: 'landing.html', output: 'docs/index.html', title: 'AI-Driven Delivery' },
  { variant: 'es', input: 'docs/es/index.html', output: 'docs/es/index.html', title: 'IA para Devs' },
  { variant: 'en', input: 'docs/en/index.html', output: 'docs/en/index.html', title: 'AI for Devs' },
  { variant: 'en-pm', input: 'docs/en-pm/index.html', output: 'docs/en-pm/index.html', title: 'AI for PMs' },
];

for (const p of pages) {
  // Regenera SIEMPRE en plano justo antes de cifrar: nunca cifra encima de un
  // fichero que ya pueda estar cifrado (evita el doble cifrado por completo).
  if (p.variant) {
    execFileSync(process.execPath, [BUILD_SITE, p.variant], { stdio: 'inherit' });
  }

  const tmpDir = `.protect-tmp-${path.basename(path.dirname(p.output))}`;
  execFileSync(process.execPath, [
    STATICRYPT_CLI,
    p.input,
    '-d', tmpDir,
    '--template-title', p.title,
    '--template-color-primary', '#c0392b',
    '--template-color-secondary', '#1e1e22',
    '--remember', '365',
  ], { stdio: 'inherit' });

  const produced = path.join(tmpDir, path.basename(p.input));
  fs.mkdirSync(path.dirname(p.output), { recursive: true });
  fs.renameSync(produced, p.output);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(`[protect] ${p.input} -> ${p.output}`);
}
