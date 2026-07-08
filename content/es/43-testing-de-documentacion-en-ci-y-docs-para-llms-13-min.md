# 📄 Testing de documentación en CI y docs para LLMs 🔴 — 13 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 13 min

## La documentación también se testea

Si el código sin tests es deuda técnica, la documentación sin validación automatizada es deuda documental. La diferencia es que la deuda documental es silenciosa: los enlaces rotos que nadie detecta, el Markdown que rompe el build del sitio, la prosa que usa terminología inconsistente — todo eso llega al lector sin que nadie lo vea en PR.

La validación de documentación en CI tiene cuatro capas:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/2769b156-128a-4810-8199-5af0d7d4a570/2817dffe06afc10e.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Ninguna de estas herramientas es costosa de configurar. La GitHub Action completa corre en menos de 2 minutos.

---

## Vale: el linter de prosa

**Vale** es un linter de lenguaje natural orientado a documentación técnica. Funciona con reglas configurables (llamadas "estilos") y tiene soporte nativo para Markdown, RST, AsciiDoc, y HTML. Lo usan GitLab, Spotify, Datadog, y Elastic en sus pipelines de documentación.

La propuesta de valor para un equipo de software: fuerza consistencia terminológica automáticamente. "backend", "back-end", y "Back End" en el mismo proyecto son tres formas de escribir lo mismo — Vale puede forzar una convención sin revisión manual.

### Instalación y configuración

```
# macOS
brew install vale
```

Configuración mínima (`.vale.ini` en la raíz del proyecto):

```
StylesPath = .vale/styles

# Nivel mínimo que aparece en la salida
MinAlertLevel = warning

# Formatos que Vale procesa
[*.{md,mdx}]
BasedOnStyles = Microsoft, Vale

# Excepciones para términos del proyecto
[*.{md,mdx}]
BlockIgnores = (?s) `{3}[\\w]*\\n.+?\\n`{3}  # Ignora bloques de código
```

Descargar el estilo Microsoft (el más completo para docs técnicas):

```
vale sync
```

Esto descarga el paquete de estilo Microsoft a `.vale/styles/Microsoft/`. Entre las ~150 reglas incluidas:

-   Voz activa vs. pasiva (`Microsoft.Passive`)
    
-   Términos a evitar (`Microsoft.Avoid` — "easy", "simple", "just")
    
-   Mayúsculas en nombres de productos (`Microsoft.Brands`)
    
-   Lenguaje inclusivo (`Microsoft.Bias`)
    

### Añadir un vocabulario personalizado

El vocabulario del proyecto (nombres de entidades, comandos, nombres propios) necesita declararse explícitamente para que Vale no los marque como errores:

```
# .vale/styles/Vocab/FlowSync/accept.txt
AdonisJS
Lucid ORM
VineJS
adonis-autoswagger
OpenSpec
Claude Code
Scalar
Starlight
FlowSync
```

### Uso en CI

```
# .github/workflows/docs-quality.yml
name: Docs quality

on: [pull_request]

jobs:
  vale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: errata-ai/vale-action@reviewdog
        with:
          files: docs/
          reporter: github-pr-review    # Comenta directamente en el PR
          fail_on_error: true
          vale_flags: "--minAlertLevel=error"
```

> 💡 **Empieza con** `--minAlertLevel=warning` **en local,** `=error` **en CI**
> 
> Vale suele tener muchos warnings en una primera pasada — no bloquees el pipeline en warnings hasta haber limpiado el baseline. En CI solo falla en `error`; en local puedes ver warnings para mejorar progresivamente.

---

## markdownlint-cli2: Markdown bien formado

**markdownlint-cli2** es el successor del markdownlint original — más rápido, config en YAML, y la acción oficial de GitHub es `DavidAnson/markdownlint-cli2-action`.

Detecta 40+ reglas: headings inconsistentes, saltos de línea faltantes, listas mal indentadas, links vacíos, y más.

Configuración (`.markdownlint.yaml` en la raíz):

```
# Reglas activas
default: true

# Desactivar las que no aplican al proyecto
MD013: false   # line-length — los bloques de código pueden ser largos
MD033: false   # no-inline-html — Starlight usa MDX con JSX
MD041: false   # first-line-heading — algunos MDX tienen frontmatter sin H1

# Personalizar
MD024:         # no-duplicate-heading
  siblings_only: true  # Solo chequea headings al mismo nivel

MD007:         # unordered-list-indent
  indent: 2    # Indentación de 2 espacios en listas
```

En CI:

```
- name: Lint Markdown
  uses: DavidAnson/markdownlint-cli2-action@v18
  with:
    globs: |
      docs/**/*.md
      docs/**/*.mdx
      README.md
```

---

## lychee: detector de enlaces rotos

**Lychee** es un link checker asíncrono escrito en Rust. Procesa Markdown, HTML, y RST, detecta URLs muertas, anchors inexistentes, y dominios caducados. Corre el check completo de 576 links en ~60 segundos.

```
- name: Check broken links
  uses: lycheeverse/lychee-action@v2
  with:
    # Qué archivos chequear
    args: >-
      --verbose
      --no-progress
      --cache
      --max-cache-age 1d
      docs/**/*.md
      README.md
    # No falla en 429 (rate limiting) ni en redirects válidos
    fail: true
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Configuración de excepciones (`.lychee.toml`):

```
# URLs a ignorar (pueden dar 404 transitorio o requieren auth)
exclude = [
  "<http://localhost>",
  "<https://github.com/.*#L[0-9]+>",   # Line anchors en GitHub
  "<https://example.com>",
]

# Timeout por request
timeout = 30

# Reintentos en caso de error transitorio
max_retries = 3
```

> ⚠ **Corre lychee en cron, no solo en PRs**
> 
> Los enlaces externos pueden romperse sin que nadie toque la documentación. Configura lychee en un cron semanal además de en PRs:
> 
> ```
> on:
>   push:
>     branches: [main]
>   schedule:
>     - cron: '0 9 * * 1'  # Cada lunes a las 9:00
> ```

---

## TypeDoc en CI: cobertura de documentación

Para que la cobertura de TSDoc no retroceda con cada PR, TypeDoc puede correr en modo validación y fallar si hay funciones públicas sin documentar:

```
- name: TypeDoc coverage check
  run: |
    npx typedoc \\
      --validation.notDocumented \\
      --logLevel Warn \\
      app/ 2>&1 | tee typedoc-output.txt
    # Falla si hay funciones públicas sin @param/@returns
    if grep -q "WARNING" typedoc-output.txt; then
      echo "Funciones públicas sin documentar detectadas"
      grep "WARNING" typedoc-output.txt
      exit 1
    fi
```

Para un proyecto nuevo, empieza con `--validation.notDocumented` solo en `app/services/` y `app/controllers/` (las capas públicas) y expande a `app/models/` progresivamente.

---

## El workflow completo de docs-quality

```
# .github/workflows/docs-quality.yml
name: Docs quality

on:
  pull_request:
    paths:
      - 'docs/**'
      - 'README.md'
      - 'app/**/*.ts'   # Para TypeDoc coverage
  schedule:
    - cron: '0 9 * * 1'  # Cron semanal para lychee

jobs:
  lint-markdown:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: DavidAnson/markdownlint-cli2-action@v18
        with:
          globs: 'docs/**/*.{md,mdx}\\nREADME.md'

  vale-prose:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: errata-ai/vale-action@reviewdog
        with:
          files: docs/
          reporter: github-pr-review
          vale_flags: "--minAlertLevel=error"

  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lycheeverse/lychee-action@v2
        with:
          args: --cache --max-cache-age 1d docs/**/*.md README.md
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  typedoc-coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: backend
      - run: npx typedoc --validation.notDocumented --logLevel Warn app/
        working-directory: backend
```

---

## llms.txt: el robots.txt para agentes IA

Este es el patrón más nuevo de esta sesión. En 2026, tus docs no son consumidas solo por humanos — los agentes IA (Claude, GPT, Gemini en modo agentic) rastrean y procesan documentación para generar respuestas o código. El archivo `llms.txt` es el estándar emergente que les dice qué leer y cómo.

La convención (propuesta en 2024 por el equipo de FastHTML/[Answer.AI](http://answer.ai/), adoptada rápidamente por herramientas como Mintlify, Scalar, y Starlight):

```
# llms.txt — FlowSync

FlowSync es una aplicación de gestión de tareas construida con AdonisJS 7
(backend TypeScript) y React 19 (frontend).

## Stack técnico

- Backend: AdonisJS 7 + Lucid ORM + SQLite (better-sqlite3) + VineJS
- Frontend: React 19 + Vite + Tailwind v4 + shadcn/ui
- Autenticación: @adonisjs/auth con guard access_tokens (tokens opacos oat_*)

## Documentación principal

- [Guía de inicio](<https://tu-proyecto.github.io/flowsync/guides/getting-started/>)
- [Referencia de API (Scalar)](<https://api.flowsync.dev/docs>)
- [Referencia de tipos (TypeDoc)](<https://tu-proyecto.github.io/flowsync/api-reference/>)
- [Decisiones arquitectónicas](<https://tu-proyecto.github.io/flowsync/adr/>)

## Llms-full

Para el contexto completo (más verboso), ver llms-full.txt
```

El archivo `llms-full.txt` es una versión expandida con toda la documentación serializada, pensada para herramientas que consumen el contexto completo de forma programática.

### Dónde poner estos archivos

En la raíz del proyecto y, si tienes sitio de docs, en la raíz del sitio:

```
flowsync/
├── llms.txt           # Versión concisa para el repo
├── llms-full.txt      # Versión expandida (generada, no escrita a mano)
└── docs/site/
    └── public/
        ├── llms.txt         # Versión del sitio de docs
        └── llms-full.txt    # Generada en CI
```

### Generar `llms-full.txt` en CI

```
- name: Generate llms-full.txt
  run: |
    echo "# FlowSync — Documentación completa" > docs/site/public/llms-full.txt
    echo "" >> docs/site/public/llms-full.txt
    # Concatena todos los MDX/MD del sitio de docs
    find docs/site/src/content/docs -name "*.md" -o -name "*.mdx" | \\
      sort | xargs cat >> docs/site/public/llms-full.txt
```

> **¿Es obligatorio en 2026?**
> 
> No — pero tiene costo cero y potencialmente reduce alucinaciones cuando agentes IA externos generan código para tu proyecto. Si publicas un SDK o una API pública, es claramente recomendable. Para un proyecto interno del máster, es un buen hábito para instalar.

---

## El pipeline completo de docs en una sola imagen

```
Código + Markdown en el repo
        │
        ├── Push a main
        │       │
        │       ├── docs-quality.yml
        │       │   ├── markdownlint-cli2 → ❌ si hay Markdown roto
        │       │   ├── vale (prosa)      → ❌ si hay errores de estilo
        │       │   ├── lychee (links)    → ❌ si hay URLs rotas
        │       │   └── typedoc coverage  → ❌ si hay funciones sin docs
        │       │
        │       └── docs.yml
        │           ├── Build Starlight
        │           ├── Generate llms-full.txt
        │           └── Deploy → GitHub Pages
        │
        └── Pull Request
                ├── docs-quality.yml corre
                └── Vale comenta en el PR con sugerencias de estilo
```

Con este pipeline, la documentación tiene el mismo nivel de garantías que el código: no puede llegar a `main` rota, desactualizada en sintaxis, o con enlaces muertos.
