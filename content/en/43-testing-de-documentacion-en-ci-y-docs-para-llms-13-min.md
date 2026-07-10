# 📄 Documentation testing in CI and docs for LLMs 🔴 — 13 min | AI-Driven Delivery

⏳ Estimated time: 13 min

## Documentation is tested too

If code without tests is technical debt, documentation without automated validation is documentary debt. The difference is that documentary debt is silent: the broken links nobody notices, the Markdown that breaks the site build, the prose that uses inconsistent terminology — all of it reaches the reader without anyone seeing it in the PR.

Documentation validation in CI has four layers:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/2769b156-128a-4810-8199-5af0d7d4a570/2817dffe06afc10e.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

None of these tools is expensive to configure. The complete GitHub Action runs in under 2 minutes.

---

## Vale: the prose linter

**Vale** is a natural-language linter aimed at technical documentation. It works with configurable rules (called "styles") and has native support for Markdown, RST, AsciiDoc, and HTML. GitLab, Spotify, Datadog, and Elastic use it in their documentation pipelines.

The value proposition for a software team: it enforces terminological consistency automatically. "backend", "back-end", and "Back End" in the same project are three ways of writing the same thing — Vale can enforce one convention without manual review.

### Installation and configuration

```
# macOS
brew install vale
```

Minimal configuration (`.vale.ini` at the project root):

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

Download the Microsoft style (the most complete for technical docs):

```
vale sync
```

This downloads the Microsoft style package to `.vale/styles/Microsoft/`. Among the ~150 rules included:

-   Active vs. passive voice (`Microsoft.Passive`)
    
-   Terms to avoid (`Microsoft.Avoid` — "easy", "simple", "just")
    
-   Capitalization of product names (`Microsoft.Brands`)
    
-   Inclusive language (`Microsoft.Bias`)
    

### Adding a custom vocabulary

The project vocabulary (entity names, commands, proper nouns) needs to be declared explicitly so Vale doesn't flag it as errors:

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

### Use in CI

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

> 💡 **Start with** `--minAlertLevel=warning` **locally,** `=error` **in CI**
> 
> Vale tends to have many warnings on a first pass — don't block the pipeline on warnings until you've cleaned up the baseline. In CI, only fail on `error`; locally you can see warnings to improve progressively.

---

## markdownlint-cli2: well-formed Markdown

**markdownlint-cli2** is the successor to the original markdownlint — faster, config in YAML, and its official GitHub action is `DavidAnson/markdownlint-cli2-action`.

It detects 40+ rules: inconsistent headings, missing line breaks, badly indented lists, empty links, and more.

Configuration (`.markdownlint.yaml` at the root):

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

In CI:

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

## lychee: broken link detector

**Lychee** is an asynchronous link checker written in Rust. It processes Markdown, HTML, and RST, detects dead URLs, nonexistent anchors, and expired domains. It runs the complete check of 576 links in ~60 seconds.

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

Exceptions configuration (`.lychee.toml`):

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

> ⚠ **Run lychee on cron, not just on PRs**
> 
> External links can break without anyone touching the documentation. Set up lychee on a weekly cron in addition to on PRs:
> 
> ```
> on:
>   push:
>     branches: [main]
>   schedule:
>     - cron: '0 9 * * 1'  # Cada lunes a las 9:00
> ```

---

## TypeDoc in CI: documentation coverage

To keep TSDoc coverage from regressing with every PR, TypeDoc can run in validation mode and fail if there are undocumented public functions:

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

For a new project, start with `--validation.notDocumented` only in `app/services/` and `app/controllers/` (the public layers) and expand to `app/models/` progressively.

---

## The complete docs-quality workflow

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

## llms.txt: the robots.txt for AI agents

This is the newest pattern in this session. In 2026, your docs are not consumed only by humans — AI agents (Claude, GPT, Gemini in agentic mode) crawl and process documentation to generate answers or code. The `llms.txt` file is the emerging standard that tells them what to read and how.

The convention (proposed in 2024 by the FastHTML/[Answer.AI](http://answer.ai/) team, quickly adopted by tools like Mintlify, Scalar, and Starlight):

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

The `llms-full.txt` file is an expanded version with all the documentation serialized, intended for tools that consume the full context programmatically.

### Where to put these files

At the project root and, if you have a docs site, at the site root:

```diagram
flowsync/
├── llms.txt           # Versión concisa para el repo
├── llms-full.txt      # Versión expandida (generada, no escrita a mano)
└── docs/site/
    └── public/
        ├── llms.txt         # Versión del sitio de docs
        └── llms-full.txt    # Generada en CI
```

### Generating `llms-full.txt` in CI

```
- name: Generate llms-full.txt
  run: |
    echo "# FlowSync — Documentación completa" > docs/site/public/llms-full.txt
    echo "" >> docs/site/public/llms-full.txt
    # Concatena todos los MDX/MD del sitio de docs
    find docs/site/src/content/docs -name "*.md" -o -name "*.mdx" | \\
      sort | xargs cat >> docs/site/public/llms-full.txt
```

> **Is it mandatory in 2026?**
> 
> No — but it has zero cost and potentially reduces hallucinations when external AI agents generate code for your project. If you publish an SDK or a public API, it is clearly recommended. For an internal master's program project, it is a good habit to build.

---

## The complete docs pipeline in a single image

```diagram
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

With this pipeline, documentation has the same level of guarantees as code: it cannot reach `main` broken, syntactically out of date, or with dead links.
