# AI-Driven Delivery — Curso web

Webs estáticas (un solo `index.html` autocontenido por variante) generadas a
partir de los apuntes markdown del curso clipeados en `~/Downloads/clippings`.

## Variantes

| Variante | Web | Contenido |
|----------|-----|-----------|
| `es` | `docs/es/index.html` | Curso original en español (44 lecciones) |
| `en` | `docs/en/index.html` | Traducción íntegra al inglés |
| `en-pm` | `docs/en-pm/index.html` | Edición PO/PM en inglés: curada, práctica, enfocada a qué puede hacer un PO/PM con Claude |

Publicado en GitHub Pages desde `main` / carpeta `docs`.

## Estructura

- `extract.mjs` — lee el índice y los md crudos de `~/Downloads/clippings`, los
  limpia (frontmatter y navegación de la plataforma) y los copia a
  `content/es/` + `manifest.json`.
- `content/<variante>/` — lecciones en markdown + `manifest.json` (estructura
  de secciones, etiquetas y textos de UI de esa variante).
- `build-site.mjs <variante>` — genera `docs/<variante>/index.html`.
- `landing.html` — fuente en claro de la portada (`docs/index.html`); no se
  edita `docs/index.html` directamente, `protect-site.mjs` lo genera cifrado
  a partir de este fichero.

## Regenerar

```bash
npm install
node extract.mjs        # solo si hay lecciones nuevas clipeadas (actualiza content/es)
node build-site.mjs es
node build-site.mjs en
node build-site.mjs en-pm
```

Si añades lecciones nuevas: tras `extract.mjs`, traduce los md nuevos a
`content/en/` (mismo nombre de archivo) y añade la entrada al `manifest.json`
de cada variante.

## Protección con contraseña

El sitio es público (GitHub Pages en repo público, cuenta personal gratuita),
así que las 4 páginas de `docs/` se cifran con [staticrypt](https://github.com/robinmoisson/staticrypt)
tras cada build: sin la contraseña no se puede leer el contenido, ni siquiera
mirando el HTML crudo.

```bash
STATICRYPT_PASSWORD="..." npm run protect
```

La contraseña **no está en el repo** (ni en este README, ni en ningún script);
se comparte aparte con quien deba tener acceso. `.staticrypt.json` sí está
commiteado: guarda solo la sal (no la contraseña), y hace falta que sea la
misma en las 4 páginas para que "Remember me" funcione entre ellas.

Orden importante: `build-site.mjs` **siempre** antes que `protect`. El build
sobreescribe `docs/<variante>/index.html` con la versión en claro (borrando
cualquier cifrado anterior), y solo entonces `protect-site.mjs` la cifra. La
portada (`docs/index.html`) nunca se edita a mano: se genera cifrada a partir
de `landing.html`, que sí puedes editar libremente.

⚠️ No corras `npm run protect` dos veces seguidas sin un build en medio para
`es`/`en`/`en-pm` — cifraría la versión ya cifrada por encima (doble capa,
rompe el "Remember me" y pide la contraseña dos veces). Si pasa, `git
checkout -- docs/` y vuelve a hacer build + protect en el orden correcto.
