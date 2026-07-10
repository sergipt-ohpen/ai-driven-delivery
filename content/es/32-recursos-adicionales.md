# 📚  Recursos adicionales 🟢 | AI-Driven Delivery

## Documentación oficial

La fuente primaria. Cuando algo en el resto de recursos contradiga a estos enlaces, **gana la documentación oficial**.

### Claude Code

-   [Claude Code Docs · Setup](https://code.claude.com/docs/en/setup) — instalación, login, configuración inicial.
    
-   [Claude Code Docs · Skills](https://code.claude.com/docs/en/skills) — frontmatter, auto-invocación, bundled skills.
    
-   [Claude Code Docs · Subagents](https://code.claude.com/docs/en/sub-agents) — built-in (Explore, Plan, general-purpose) y custom.
    
-   [Claude Code Docs · Hooks](https://code.claude.com/docs/en/hooks) — los 21 lifecycle events y los 4 handlers.
    
-   [Claude Code Docs · MCP](https://code.claude.com/docs/en/mcp) — `claude mcp add`, scopes, headersHelper.
    
-   [Claude Code Docs · Output Styles](https://code.claude.com/docs/en/output-styles) — built-in, custom y diferencia con [CLAUDE.md](http://claude.md/).
    
-   [Claude Code Docs · Plugins](https://code.claude.com/docs/en/plugins) — anatomía y marketplace.
    
-   [Claude Code GitHub releases (changelog)](https://github.com/anthropics/claude-code/releases) — leer al menos una vez al mes.
    
-   [Claude Code Pricing](https://claude.com/pricing).
    

### Cursor

-   [Cursor Docs](https://cursor.com/docs) — setup y referencia completa.
    
-   [Cursor Pricing](https://cursor.com/pricing).
    
-   [Cursor Changelog](https://cursor.com/changelog) — releases por versión.
    
-   [Cursor Blog · "Agent best practices" (Lee Robinson, ene 2026)](https://cursor.com/blog/agent-best-practices) — la guía oficial de cómo se usa bien Cursor.
    
-   [Cursor Blog · "Introducing Cursor 2.0 and Composer"](https://cursor.com/blog/2-0).
    

### Estándares y protocolos

-   [AGENTS.md](http://agents.md/) [· Open standard](https://agents.md/) — la especificación del estándar adoptado por Codex, Cursor, Copilot, Gemini, Windsurf, OpenCode.
    
-   [Model Context Protocol](https://modelcontextprotocol.io/) — referencia oficial del protocolo MCP.
    
-   [GitHub Copilot Docs](https://docs.github.com/en/copilot) — para cuando trabajes con un equipo en Copilot Enterprise.
    

---

## Mapas mentales y referencias profundas

Lo que vas a querer leer cuando una de las primitivas se te quede corta.

-   [Dean Blank · "A Mental Model for Claude Code: Skills, Subagents, and Plugins" (mar 2026)](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) — el mejor mapa mental compacto que existe. Lectura corta y de alto retorno.
    
-   [alexop.dev](http://alexop.dev/) [· "Understanding Claude Code's Full Stack" (actualizado abr 2026)](https://alexop.dev/posts/understanding-claude-code-full-stack/) — repaso integral con ejemplos. Más largo, más completo.
    
-   [Hivetrail · "](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard)[AGENTS.md](http://agents.md/) [vs](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard) [CLAUDE.md](http://claude.md/)[: Cross-Tool Standard"](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard) — el patrón symlink en detalle.
    
-   [DeployHQ · "](https://www.deployhq.com/blog/ai-coding-config-files-guide)[CLAUDE.md](http://claude.md/)[,](https://www.deployhq.com/blog/ai-coding-config-files-guide) [AGENTS.md](http://agents.md/) [& Copilot Instructions"](https://www.deployhq.com/blog/ai-coding-config-files-guide) — comparativa de los archivos de configuración.
    
-   [Augment Code · "How to Build Your](https://www.augmentcode.com/guides/how-to-build-agents-md) [AGENTS.md](http://agents.md/)["](https://www.augmentcode.com/guides/how-to-build-agents-md) — qué meter y qué NO meter en [AGENTS.md](http://agents.md/), con datos del análisis de 2.500+ archivos.
    
-   [Kau · "Keep your](https://kau.sh/blog/agents-md/) [AGENTS.md](http://agents.md/) [in sync"](https://kau.sh/blog/agents-md/) — single source of truth para múltiples copilotos.
    

---

## Patrones operativos: EPE, plan mode, subagents

-   [Anthropic Engineering · "Subagents in Claude Code" (abr 2026)](https://claude.com/blog/subagents-in-claude-code) — el blog post que estableció el patrón Explore-Plan-Execute como canon.
    
-   [Simon Willison · "Agentic Engineering Patterns" (guía abierta, en construcción)](https://simonwillison.net/guides/agentic-engineering-patterns/) — la referencia en inglés. Capítulos sobre *linear walkthroughs* y *README-driven development* especialmente útiles.
    
-   [Simon Willison · "Writing about Agentic Engineering Patterns" (feb 2026)](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/) — el post que explica la motivación de la guía.
    
-   [ClaudeLog · Plan Mode mechanics](https://claudelog.com/mechanics/plan-mode/) — guía operativa en detalle.
    
-   [ClaudeLog · Output Styles mechanics](https://claudelog.com/mechanics/output-styles/) — diferencia con [CLAUDE.md](http://claude.md/) y `-append-system-prompt`.
    
-   [Engr Mejba Ahmed · "Leveraging Plan Mode for Risk-Free Design"](https://www.mejba.me/ai-school/claude-code-mastery-2026-agentic-engineering-bootcamp/lessons/context-engineering-project-setup/leveraging-plan-mode-for-risk-free-design) — caso operativo.
    
-   [Sathish Raju · "Claude Code Subagents: Complete Guide" (abr 2026)](https://medium.com/@sathishkraju/claude-code-subagents-the-complete-guide-to-ai-agent-delegation-d0a9aba419d0) — pipeline EPE en 3 fases con frontmatter de ejemplo.
    
-   [Builder.io](http://builder.io/) [· "Claude Code Subagents: How to Create, Use, and Debug Them"](https://www.builder.io/blog/claude-code-subagents) — naming, descripciones y debug.
    

---

## Hooks production-ready

Si vas a meter hooks en serio en tu repo (auditoría, bloqueo, validación):

-   [SmartScope · "Claude Code Hooks Complete Guide (March 2026)"](https://smartscope.blog/en/generative-ai/claude/claude-code-hooks-guide/) — los 12 lifecycle events principales.
    
-   [Claude Fast · "Claude Code Hooks: Complete Guide to All 12 Lifecycle Events"](https://claudefa.st/blog/tools/hooks/hooks-guide).
    
-   `disler/claude-code-hooks-mastery` — patrones production-ready: auditoría, bloqueo de patrones peligrosos, validación de tests.
    

---

## MCP en profundidad

-   [Best MCP servers for Claude Code in 2026 · MCP Marketplace](https://mcp-marketplace.io/blog/best-mcp-servers-claude-code) — los más útiles + comandos de instalación.
    
-   [50+ Best MCP Servers · Claude Fast](https://claudefa.st/blog/tools/mcp-extensions/best-addons) — listado más amplio, incluye scoring de seguridad.
    
-   [GitHub MCP server · install guide for Claude Code](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-claude.md) — el más usado en la práctica.
    
-   [Figma MCP server setup](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server) — ejemplo de plugin con MCP integrado.
    

---

## Repositorios curados

-   `anthropics/skills` — skills de referencia mantenidas por Anthropic.
    
-   `anthropics/claude-code` — repo principal. Plugins de ejemplo en `/plugins/`.
    
-   `hesreallyhim/awesome-claude-code` — listado curado canónico.
    
-   `alirezarezvani/claude-skills` — 232+ skills cross-tool (Claude Code, Codex, Gemini CLI, Cursor, Aider, Windsurf, Kilo, OpenCode).
    
-   `affaan-m/everything-claude-code` — skills, instincts, memory, security.
    
-   `VILA-Lab/Dive-into-Claude-Code` — análisis sistemático de la arquitectura de Claude Code (paper + repo).
    
-   `caramaschiHG/awesome-ai-agents-2026` — 300+ agentes y herramientas categorizados.
    
-   `sanjeed5/awesome-cursor-rules-mdc` — reglas `.mdc` de Cursor con frontmatter avanzado.
    
-   [Claude Marketplaces](https://claudemarketplaces.com/) — directorio actualizable de marketplaces de plugins.
    

---

## Costes, planes y gobernanza

Para entender qué pagas y por qué.

-   [Finout · "Claude Code Pricing 2026"](https://www.finout.io/blog/claude-code-pricing-2026) — guía con casos de spike y monitoring.
    
-   [Verdent · Claude Code Pricing](https://www.verdent.ai/guides/claude-code-pricing-2026) — perfiles de uso reales con números.
    
-   [LaoZhang AI · "Claude Code Pricing Guide 2026"](https://blog.laozhang.ai/en/posts/claude-code-pricing-guide) — desglose por perfil.
    
-   [LaoZhang AI · "Claude Code Pro vs Max in 2026"](https://blog.laozhang.ai/en/posts/claude-code-pro-vs-max).
    
-   [Flexprice · "The Complete Guide to Cursor Pricing in 2026"](https://flexprice.io/blog/cursor-pricing-guide) — modelo de créditos explicado.
    
-   [Gradually AI · "Claude Code Statistics 2026"](https://www.gradually.ai/en/claude-code-statistics/) — datos de adopción y benchmarks de coste.
    

### El incidente Pro de abril 2026 (lectura recomendada)

-   [Simon Willison · "Is Claude Code going to cost $100/month?" (22-abr-2026)](https://simonwillison.net/2026/Apr/22/claude-code-confusion/) — la mejor crónica del incidente.
    
-   [Simon Willison · "An update on recent Claude Code quality reports" (24-abr-2026)](https://simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports/) — postmortem técnico de los tres bugs de marzo-abril.
    
-   [BigGo Finance · análisis de implicaciones de pricing](https://finance.biggo.com/news/202604240157_anthropic-tests-claude-code-removal-pro-plan).
    

---

## Datos de mercado y adopción

Cifras verificadas que conviene tener a mano para conversaciones de equipo.

-   [Stack Overflow Developer Survey 2025 · AI section](https://survey.stackoverflow.co/2025/ai/) — 84% adopción, 29% confianza.
    
-   [Stack Overflow · "Trust in AI at an All Time Low"](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/) — análisis ejecutivo.
    
-   [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — TypeScript supera a Python; 80% nuevos devs usan Copilot.
    
-   [METR · "Measuring Impact of Early-2025 AI on Experienced OSS Devs"](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — el estudio del +19% slowdown.
    
-   [METR update · "We are Changing our Developer Productivity Experiment Design" (feb 2026)](https://metr.org/blog/2026-02-24-uplift-update/) — segunda iteración con resultado distinto.
    
-   [arXiv 2507.09089 · paper original METR](https://arxiv.org/abs/2507.09089).
    

---

## Estado del ecosistema y consolidación

Para ver el bosque completo, no solo el árbol Claude Code o Cursor.

-   [The New Stack · "Cursor, Claude Code, and Codex are merging into one AI coding stack"](https://thenewstack.io/ai-coding-tool-stack/) — el "composable stack" como tendencia. Lectura imprescindible.
    
-   [Morph · "14 Best AI Coding Agents in 2026: Ranked by Benchmarks and Real Usage"](https://www.morphllm.com/best-ai-coding-agents-2026) — comparativa cuantitativa actualizada.
    
-   [Morph · "We Tested 15 AI Coding Agents (2026). Only 3 Changed How We Ship."](https://www.morphllm.com/ai-coding-agent) — análisis cualitativo.
    
-   [GitHub Blog · "Welcome home, agents" (Agent HQ launch, feb 2026)](https://github.blog/news-insights/company-news/welcome-home-agents/) — multi-agente enterprise.
    
-   [GitHub Blog · "What's new with Copilot coding agent"](https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-coding-agent/).
    
-   [Cognition · "Devin in Windsurf"](https://cognition.ai/blog/devin-in-windsurf) — integración del agente cloud en IDE.
    
-   [Buildfast · "Cursor Composer 2: Benchmarks, Pricing & Review (2026)"](https://www.buildfastwithai.com/blogs/cursor-composer-2-review-2026) — el modelo propio de Cursor.
    
-   [DataCamp · "What Is Cursor 3? Agents, Worktrees, and What's New"](https://www.datacamp.com/blog/cursor-3) — la última versión de Cursor.
    

---

## Vídeos · YouTube embebibles

Donde no se especifique, idioma EN. Duraciones aproximadas.

### En español

-   📺 [Café Codely · "Modelos que no podemos tener, Cursor 3, Claude Managed Agents"](https://www.youtube.com/watch?v=FREzjkSQ3GE) — ES, ~30 min. Repaso del estado del arte abril 2026.
    
-   📺 [Café Codely · "Claude mejor que ChatGPT 5.4, Cursor automation, MacBook Pro M5"](https://www.youtube.com/watch?v=w54nnIlbdUU) — ES, ~30 min. Estado actual de las primitivas.
    
-   📺 [Café Codely · "Filtrado código fuente de Claude Code, Fallo seguridad en Axios"](https://www.youtube.com/watch?v=iEkpNO7LssM) — ES, ~30 min. Análisis técnico de cómo orquesta Claude Code los subagents.
    

### En inglés

-   📺 [Tim Rogers · Future of Copilot, Octoverse 2025](https://www.youtube.com/watch?v=THyiJxOpbJY) — EN, ~10-15 min. Datos de adopción enterprise.
    
-   📺 [Design-to-Code Workshop with Claude Code, Cursor & Figma (Friends of Figma Miami)](https://www.youtube.com/watch?v=SEy1WPjPF3k) — EN, ~60-90 min. EPE aplicado a un caso real frontend con las dos herramientas del máster.
    

---

## Referencias en español

El ecosistema hispanohablante alrededor de copilotos de IA es más limitado que el inglés, pero hay material de calidad creciente.

-   [KMOOPS · "Guía Definitiva de Ficheros para Agentes de Código" (2-mar-2026)](https://kmoops.com/2026/03/02/guia-definitiva-como-configurar-tu-agente-ia-sin-volverte-loco-claude-md-skills-commands-y-todo-el-lio/) — el mejor recurso en español sobre configuración ([CLAUDE.md](http://claude.md/), skills, commands, [AGENTS.md](http://agents.md/)).
    
-   [Café Codely](https://www.youtube.com/@CodelyTV) — canal semanal con noticias de copilotos.
    
-   [DevAI Semanal · newsletter](https://devaisemanal.com/) — newsletter en español, patrones operativos curados.
    
-   [El Diario IA · "Copilotos de Código 2025"](https://eldiarioia.es/2025/11/15/copilotos-de-codigo-2025-claude-sonnet-4-5-vs-gpt-5-vs-cursor-vs-windsurf/) — comparativa en español, contexto histórico.
    
-   [Latent Space podcast](https://www.latent.space/) — EN, pero con varios invitados hispanohablantes y traducciones de notas.
    

---

## Personas a seguir

Si quieres mantenerte al día sin tener que leer todo:

-   **Simon Willison** — [simonwillison.net](http://simonwillison.net/) y `@simonw` en redes. La fuente independiente más fiable del ecosistema.
    
-   **Boris Cherny** — creador de Claude Code, escribe esporádicamente; sus charlas en conferencias son oro.
    
-   **Lee Robinson** (Cursor) — guía oficial de best practices de Cursor.
    
-   **Aman Sanger** (CEO Cursor) — comparte detalles técnicos de Composer 2.
    
-   **Gergely Orosz** (Pragmatic Engineer) — encuestas y análisis enterprise.
    
-   **Karpathy** — sus charlas marcan tendencia (acuñó "vibe coding" y posteriormente "agentic engineering").
    
-   **Codely** (Rafa Gómez, Carlos Buenosvinos) — referencia hispanohablante.
