# AI4Devs 2026/06 Seniors — Curso web

Webs estáticas (un solo `index.html` autocontenido por variante) generadas a
partir de los apuntes markdown del curso clipeados en `~/Downloads/clippings`.

## Variantes

| Variante | Web | Contenido |
|----------|-----|-----------|
| `es` | `site/es/index.html` | Curso original en español (44 lecciones) |
| `en` | `site/en/index.html` | Traducción íntegra al inglés |
| `en-pm` | `site/en-pm/index.html` | Edición PO/PM en inglés: curada, práctica, enfocada a qué puede hacer un PO/PM con Claude |

## Estructura

- `extract.mjs` — lee el índice y los md crudos de `~/Downloads/clippings`, los
  limpia (frontmatter y navegación de la plataforma) y los copia a
  `content/es/` + `manifest.json`.
- `content/<variante>/` — lecciones en markdown + `manifest.json` (estructura
  de secciones, etiquetas y textos de UI de esa variante).
- `build-site.mjs <variante>` — genera `site/<variante>/index.html`.

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
