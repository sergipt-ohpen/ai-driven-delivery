// Protege con contraseña las paginas ya generadas en docs/.
// Requiere STATICRYPT_PASSWORD en el entorno (no se guarda en el repo).
// Uso: STATICRYPT_PASSWORD="..." node protect-site.mjs
import { execFileSync } from 'child_process';

if (!process.env.STATICRYPT_PASSWORD) {
  console.error('Falta STATICRYPT_PASSWORD en el entorno.');
  process.exit(1);
}

const pages = [
  { file: 'docs/index.html', dir: 'docs', title: 'AI-Driven Delivery' },
  { file: 'docs/es/index.html', dir: 'docs/es', title: 'IA para Devs' },
  { file: 'docs/en/index.html', dir: 'docs/en', title: 'AI for Devs' },
  { file: 'docs/en-pm/index.html', dir: 'docs/en-pm', title: 'AI for PMs' },
];

for (const p of pages) {
  execFileSync('npx', [
    'staticrypt', p.file,
    '-d', p.dir,
    '--template-title', p.title,
    '--template-color-primary', '#c0392b',
    '--template-color-secondary', '#1e1e22',
    '--remember', '365',
  ], { stdio: 'inherit', shell: true });
  console.log(`[protect] ${p.file}`);
}
