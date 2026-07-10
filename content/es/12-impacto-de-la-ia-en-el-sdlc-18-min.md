# 🎥 Impacto de la IA en el SDLC 🔴 — 18 min | AI-Driven Delivery

⏳ Tiempo estimado: 18 min

> Hasta aquí has visto datos del mercado, del rol del developer, y del ecosistema de herramientas. Ahora viene el mapa: **cómo la IA cambia cada fase del Ciclo de Vida del Desarrollo de Software (SDLC)**, qué herramientas operan en cada una, y dónde se cubre cada tema en las 16 sesiones del máster. Esta lección es tu mapa mental del programa.

## Las fases del SDLC (y por qué importa verlas todas)

Cuando pensamos en "IA para developers", el reflejo es pensar en *generación de código*. Pero ese es solo uno de los puntos donde la IA cambia el oficio. El día a día de un senior cubre mucho más:

-   **Análisis de requisitos**
    
-   **Diseño del sistema y modelo de datos**
    
-   **Documentación de alto nivel y especificaciones (historias de usuario, tareas)**
    
-   **Implementación**: infra, backend, frontend, BD; corrección de errores, refactorización, seguridad
    
-   **Generación de tests**: unitarios, E2E, integración
    
-   **Documentación de cambios y code reviews**
    
-   **Despliegues**
    
-   **Monitorización y observabilidad**
    

Cada una de estas fases ha cambiado en los últimos 18 meses. Vamos por las que más impacto tienen.

## Cómo cambia cada fase del SDLC con IA

![image.png](https://media1-production-mightynetworks.imgix.net/asset/aa45ddda-80e6-4aa7-8070-c190fba7abe5/30a7cc7ddf4eef4f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Lectura del mapa**: cada celda de la columna "Sesión del máster" es donde profundizamos en esa fase. Si una sesión te genera más curiosidad que otra, es buena señal — significa que ya identificaste tu palanca prioritaria.

## El framework L1–L5: niveles de autonomía

Para entender qué herramienta usar en cada fase, la industria adoptó un framework de **5 niveles de autonomía** (popularizado en 2024–2025; usado por Swarmia, Vellum, AWS y otros). No es un estándar IEEE, pero es la taxonomía pragmática más usada.

> 🚨 **Nota importante**: distintos vendors usan variantes ligeramente distintas (Vellum usa L0–L5, AWS habla de 4 niveles). Tómalo como **marco práctico ampliamente usado**, no como ley universal.

### L1 — Autocompletado de código

Sugerencias de tokens/líneas en línea, en el editor. El humano acepta o rechaza cada sugerencia.

**Herramientas representativas (abril 2026)**:

-   **GitHub Copilot completions** — el pionero, sigue siendo líder en adopción enterprise.
    
-   **Supermaven** — adquirido por Cursor en **noviembre de 2024**; producto independiente retirado a finales de 2025.
    
-   **Tabby** — alternativa open source para self-hosting.
    
-   **Codeium / Windsurf inline** — el legacy de Codeium ahora dentro del ecosistema Windsurf.
    

### L2 — Generación a nivel de tareas

El humano describe una tarea; la IA produce un bloque coherente. El humano verifica.

**Herramientas representativas**:

-   **ChatGPT,** [**Claude.ai**](http://claude.ai/)**, Gemini** — chat con código.
    
-   **aider** — herramienta CLI open source para edición de código vía LLM.
    
-   **Cursor Chat inline, GitHub Copilot Chat** — chat dentro del editor.
    

### L3 — Coding agents (en contexto)

El agente ejecuta varios pasos (read/edit/test) bajo supervisión, con paper trail completo en Git.

**Herramientas principales**:

-   **Cursor Composer / Cursor 2.0** — multi-agent UI con hasta 8 agentes paralelos en git worktrees aislados.
    
-   **Claude Code** — agente CLI con `CLAUDE.md` para contexto persistente. Soporta GitHub Actions oficial desde septiembre 2025.
    
-   **GitHub Copilot Workspace + coding agent** — lanzado mayo 2025; **\>1M PRs autorizadas en 5 meses** (Octoverse 2025).
    

### L4 — De especificaciones a producción

Build-from-prompt full-stack con DB, auth, deploy. Puedes ir de "quiero una app" a "está deployada" sin tocar código directamente.

**Herramientas representativas**:

-   **Bolt.new (StackBlitz)** — generación en navegador con WebContainers.
    
-   **Lovable** — MVPs full-stack con auth y DB; pasó de USD 0 a USD 100M+ ARR en 8 meses.
    
-   **v0 (Vercel)** — componentes React/Next.js desde texto o imágenes.
    
-   **Replit Agent 3** — autónomo hasta 200 minutos con tests propios.
    
-   **Pythagora** — plataforma all-in-one con specs, frontend React, backend Node.
    

### L5 — Equipos / agentes autónomos

Múltiples agentes, planning de largo plazo, decisiones independientes. **Frontera actual**.

**Herramientas principales**:

-   **Devin (Cognition)** — el único agente L5 con adopción enterprise masiva demostrable. Goldman Sachs, Citi, Dell, Cisco, Palantir, Nubank, Mercado Libre, Ramp lo usan en producción.
    
-   **GitHub Agent HQ (febrero 2026)** — orquesta Copilot, Claude Code y OpenAI Codex como agentes asignables desde el mismo issue de GitHub.
    
-   **Cursor 2.0 multi-agent** — hasta 8 agentes paralelos en git worktrees.
    
-   **MetaGPT** — framework open source de coordinación multi-agente.
    

### Datos enterprise reales (Devin, ene 2026)

Cognition publicó las métricas de Devin en su *2025 Performance Review*:

-   **67% de PRs mergeadas** (vs. 34% en 2024).
    
-   **4x más rápido y 2x más eficiente** que el año anterior.
    
-   **5–10% del tiempo total de devs** ahorrado en remediación de seguridad.
    
-   **Cobertura de tests** subiendo del 50–60% al 80–90% en proyectos donde se aplica.
    
-   **Migraciones con factor 10–14x** vs. desarrollo humano (Oracle reporta 14x más rápido en migraciones Java).
    

> ⚠ **Realidad vs. Hype**: aunque L5 suena futurista, **el 27% de las organizaciones confía en agentes plenamente autónomos** según Capgemini 2025 (vs. 43% un año antes). La curva de confianza se invierte con la madurez. Devin sobresale en tareas junior (migraciones, tests, bugs simples) pero **requiere supervisión humana para arquitectura y decisiones de diseño**.

## Frameworks alternativos (por si los ves en otros sitios)

-   **Vellum (dic 2025)**: L0 (Rule-Based) → L5 (Fully Creative).
    
-   **AWS staged autonomy**: 4 niveles (Predefined → Dynamic → Partially → Fully autonomous). La mayoría de prod en niveles 2–3.
    
-   **Knight First Amendment Institute (jun 2025)**: taxonomía centrada en el rol del humano (L1=Operator, L4=Approver, L5=Observer).
    

📖 Análisis del framework L1–L5: [AI Coding Evolution and Landscape: L1 to L5](https://prompt.16x.engineer/blog/ai-coding-l1-l5)

📖 Variante Swarmia (recomendada): [Five levels of AI coding agent autonomy](https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/)

---

## Git con IA: cómo cambia tu workflow concreto

De todas las fases del SDLC, hay una que ya está completamente atravesada por IA en 2026 y que merece su propia sección: **Git, code review y PRs**. Esto se aplica todos los días, en cualquier sesión del máster.

### GitHub Copilot Code Review

Lanzado en preview en abril 2025, GA progresivo durante 2025. Los datos de marzo 2026 (GitHub Blog):

-   **60 millones de reviews acumuladas**.
    
-   Crecimiento **10x desde el lanzamiento**.
    
-   **\>1 de cada 5 reviews** en GitHub ya las hace Copilot.
    
-   **71% de las reviews** dejan comentarios accionables (29% correctamente no comentan nada — silencio es mejor que ruido).
    
-   Promedio: **5,1 comentarios por review**.
    
-   **72,6% de los usuarios** reportan mejora de eficacia (Octoverse 2025).
    

📖 GitHub Blog: [60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/)

### Generación de commit messages con IA

Flujos estándar en 2026:

-   **Claude Code**: comando integrado (`/commit` o pedir "generate a commit message based on the staged changes").
    
-   **Cursor**: botón "Generate commit message" en el panel Git.
    
-   **GitHub Copilot in VS Code**: "Generate Commit Message" en la pestaña Source Control. Soporta estilos configurables (conventional commits, Gitmoji).
    

> 💡 **Tip de uso**: la IA no conoce tu dominio de negocio; un commit message generado puede decir *"fix bug in user service"* cuando lo correcto sería *"fix race condition in checkout when cart is empty"*. Siempre revisa antes de confirmar.

### Resolución de merge conflicts con IA

-   **Cursor "Resolve in Chat"**: detecta `<<<<<<<` / `=======` / `>>>>>>>` y propone resolución contextualizada.
    
-   **Claude Code**: `claude resolve-conflicts` o `@claude resolve` en GitHub Actions.
    
-   **GitHub Copilot in VS Code**: botón "Resolve in chat" en el panel de conflictos.
    

### Copilot Workspace + coding agent

-   Lanzado en preview en abril 2024, **GA con coding agent en mayo 2025**.
    
-   Asignar un issue a Copilot → crea branch, implementa, abre PR.
    
-   En agosto 2025: 1,2M PRs generadas/mes.
    
-   Octoverse 2025: **\>1M PRs autorizadas en 5 meses** (mayo–septiembre 2025).
    
-   **Agent HQ (febrero 2026)**: orquestación multi-vendor desde GitHub.
    

### Claude Code + GitHub Actions (integración oficial)

Lanzada el **29 de septiembre de 2025** como parte de Claude Code 2.0. Repo oficial: `anthropics/claude-code-action`.

**Setup mínimo**:

```
# .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment: { types: [created] }
  pull_request_review_comment: { types: [created] }

jobs:
  claude:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # Default: Sonnet. Para Opus 4.7:
          # claude_args: --model claude-opus-4-7
```

**Modos de uso**:

-   **Interactivo**: mention `@claude` en PRs/issues; el agente responde y actúa.
    
-   **Automation**: prompt directo en YAML; corre en cada evento.
    

**Auth flexible**: API key de Anthropic, AWS Bedrock, GCP Vertex, Microsoft Foundry (con OIDC).

**Mitigación de prompt injection**: filtra HTML comments, caracteres invisibles, alt-text de imágenes. Los repo admins deben configurar `allowed_bots` y `allowed_non_write_users` con cuidado.

📖 Documentación oficial: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

📖 Marketplace: [Claude Code Action Official](https://github.com/marketplace/actions/claude-code-action-official)

### Mejores prácticas para senior devs (2026)

1.  **Tratar al agente como colaborador junior con contrato claro.** Define `CLAUDE.md` / `.cursor/rules` / `AGENTS.md` (estándar de OpenAI ya en >60.000 repos OSS) en cada repo: estilo de código, comandos de test, do/don't.
    
2.  **Forzar diff-review humano de cualquier cambio agéntico.** El **75% de los devs senior** (Stack Overflow 2025) revisan manualmente todo el código IA antes del merge.
    
3.  **CI gate estricto.** Bloquea merge si tests/coverage/security checks no pasan. La IA produce más código, pero también más bugs (Faros AI 2026: incidentes/PR +242%, bugs/dev +54% en equipos con alta adopción).
    
4.  **Diferenciar perfil del PR.** Etiqueta PRs auto-generadas (`copilot`, `devin`, `claude-code`). DORA 2025 sugiere que adaptar el process es lo que separa a equipos high-performance de los que sufren.
    
5.  **MCP read-only para code review.** Conecta el agente al ticket-tracker, base de datos de staging y observability — pero **nunca con permisos de escritura sobre prod sin un humano en el loop**.
    
6.  **Preferir agentes async sobre chat para tareas largas.** Devin, Copilot coding agent, Cursor background agents dejan paper trail en Git, mucho más auditable que un chat efímero.
    
7.  **Git hygiene importa más que antes.** Commits atómicos, mensajes en formato convencional, branches cortas. Los agentes funcionan mejor con historia limpia.
    

---

## Datos enterprise: quién está usando esto en producción

Para que no parezca teoría, los nombres concretos a abril 2026:

-   **Goldman Sachs**: primer banco grande en desplegar Devin a su fuerza de >12.000 desarrolladores. CIO Marco Argenti habla de "hybrid workforce" y productividad estimada 3–4x.
    
-   **Microsoft**: 20–30% del código interno generado o sugerido por IA (Satya Nadella, mayo 2025).
    
-   **Anthropic**: ~90% del código asistido por IA (Dario Amodei).
    
-   **Salesforce**: comunicaciones citan ">90% de uso de Cursor" entre sus 20.000 ingenieros \[⚠ VERIFICAR: cifra reportada por terceros, sin confirmación oficial directa\].
    
-   **Cognition customer list (enero 2026)**: Goldman Sachs, Citi, Dell, Cisco, Ramp, Palantir, Nubank, Mercado Libre, OpenSea, Lumos, Microsoft, Curai Health, Santander.
    

Esto no es opcional. Es el estado actual de la industria.

## Lo accionable de esta lección

1.  **El SDLC entero está siendo redefinido, no solo "escribir código".** Cada fase tiene oportunidades y riesgos. El máster cubre las que más impacto tienen para un senior.
    
2.  **L1–L5 es un mapa, no una jerarquía de calidad.** Subir de nivel no siempre es mejor; cada nivel sirve para tareas distintas. Saber elegir bien es habilidad senior.
    
3.  **El code review pasó de "tarea ocasional" a "habilidad central".** Cuando 1 de cada 5 reviews ya las hace una IA, tu rol como reviewer humano se redefine: filtras lo que la IA no puede ver.
    
4.  **Git con IA no es una feature, es el nuevo default.** Aprende a generar commits, resolver conflictos y configurar GitHub Actions con Claude Code antes de S1.
    
5.  **Las empresas grandes ya lo están haciendo.** No estás llegando temprano; estás llegando a tiempo.
    

## Recursos para profundizar

### Sobre el SDLC con IA

-   📖 [DORA 2025: State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — el AI Capabilities Model y cómo cambia cada fase.
    
-   📖 [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — datos del estado del ecosistema dev.
    

### Sobre el framework L1–L5

-   📖 [Swarmia — Five levels of AI coding agent autonomy](https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/) — la versión más alineada con coding tools.
    
-   📖 [Vellum — LLM Agents: The Six Levels of Agentic Behavior](https://www.vellum.ai/blog/levels-of-agentic-behavior) — variante L0–L5.
    
-   📖 [Cognition — Devin's 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025) — datos enterprise reales de un agente L5.
    

### Sobre Git con IA

-   📖 [GitHub Blog — 60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) — métricas oficiales de Copilot Code Review.
    
-   📖 [Claude Code GitHub Actions — Documentación oficial](https://code.claude.com/docs/en/github-actions) — la integración oficial.
    
-   📖 [Anthropic — anthropics/claude-code-action en GitHub](https://github.com/anthropics/claude-code-action) — el repo oficial.
    
-   📖 [GitHub — Claude Code Action en Marketplace](https://github.com/marketplace/actions/claude-code-action-official) — instalación.
    

> 👉 **Para reflexionar antes de S1**: revisa el último PR que mergeaste. ¿En qué nivel L1–L5 operaste? ¿Pudiste haber operado en uno superior, o el contexto requería el nivel que usaste? Esa pregunta es el músculo que vas a entrenar todo el máster.
