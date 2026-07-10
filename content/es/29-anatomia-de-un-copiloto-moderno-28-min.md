# 📄 Anatomía de un copiloto moderno 🔴 — 28 min | AI-Driven Delivery

⏳ Tiempo estimado: 28 min

## La tesis: las herramientas convergen en las mismas primitivas

Hace un año, comparar Claude Code con Cursor con Copilot con Cline era comparar productos. Hoy es comparar **superficies sobre el mismo set de primitivas**. The New Stack lo describió en marzo como un *"composable AI coding stack"* que nadie planeó: las funciones convergieron, los nombres no.

Ese cambio importa porque:

1.  **Lo que aprendas a configurar en una herramienta se transfiere casi por completo a las otras.** No estás aprendiendo Claude Code; estás aprendiendo *agentic coding*.
    
2.  **Cuando aparezca la siguiente herramienta** (y aparecerá), reconocer las primitivas te ahorra el reinicio mental.
    
3.  **Mezclar herramientas es la norma, no la excepción.** Saber traducir conceptos entre ellas es lo que distingue al senior.
    

Las **7 primitivas** que comparten todos los copilotos serios en abril 2026:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e242077c-5aed-48db-9820-ac3a54a0e757/783031282fc56fbd.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

El resto de la lección explica cada una con su instanciación concreta. Cierra con una **tabla de traducción agnóstica** lista para imprimir.

---

## 1 · Memoria persistente del proyecto

> En S1 ya conociste la idea (el pilar Contexto). Aquí formalizamos **cuál archivo, dónde vive y qué meter**.

El agente arranca cada sesión sin memoria. La memoria persistente del proyecto resuelve eso: un archivo en tu repo que se carga automáticamente en cada sesión.

### El archivo según la herramienta

![image.png](https://media1-production-mightynetworks.imgix.net/asset/28c24e44-c471-4729-96cb-454be21009e4/680e4ea6ae8a8593.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### El estándar emergente: [AGENTS.md](http://agents.md/)

`AGENTS.md` es el formato común que la mayoría de herramientas adoptaron en 2025-2026. Está bajo *stewardship* de la **Linux Foundation** (Agentic AI Foundation) y lo soportan Codex, Cursor, Copilot, Gemini, Windsurf, OpenCode, Jules… y prácticamente cualquier herramienta seria. **\>60.000 repos públicos en GitHub ya lo usan** (Apache Airflow, Temporal, Vercel Next.js, Inngest, entre los referencia).

Claude Code es la **excepción** a abril 2026: no lo lee nativamente. El issue [anthropics/claude-code#6235](https://github.com/anthropics/claude-code/issues) lleva miles de upvotes pidiéndolo. La comunidad lo resolvió con un patrón estándar:

```
# Source of truth multi-tool
AGENTS.md

# Symlink para que Claude Code lo lea
ln -s AGENTS.md CLAUDE.md
```

Eso es todo. Tu `AGENTS.md` se vuelve la única fuente de verdad y Claude Code lo lee a través del symlink.

### Estructura recomendada del repo

```diagram
your-repo/
├── AGENTS.md                       ← Source of truth multi-tool
├── CLAUDE.md → AGENTS.md           ← Symlink
├── .github/
│   └── copilot-instructions.md     ← Sólo lo único de Copilot
├── .cursor/
│   └── rules/
│       ├── frontend.mdc            ← Aplica a frontend/** vía glob
│       └── adonis.mdc              ← Aplica a backend/** vía glob
└── README.md                       ← Para humanos (no para el agente)
```

### Qué meter (y qué no) en [AGENTS.md](http://agents.md/)

**Mete sólo lo que el agente NO puede inferir leyendo el código:**

-   Comandos de build/test/run no triviales (`npm run dev:backend` que arranca AdonisJS + migraciones).
    
-   Convenciones internas (políticas de naming, estructura de carpetas, qué va en `app/transformers/`).
    
-   Restricciones operativas ("nunca commitear `.env`", "no tocar `vendor/`", "PRs siempre contra `main`, nunca contra `release/*`").
    
-   Tooling no obvio (Pixi, herramientas internas, tipos de testing).
    

**No metas:**

-   Estructura del repo en formato árbol. Un estudio de ETH (citado en `agents.md`) demostró que esto **aumenta el coste de inferencia y empuja al agente a recorrer más archivos sin mejorar la tasa de éxito**.
    
-   Documentación de la arquitectura. Eso va en `docs/`.
    
-   Onboarding para humanos. Eso es `README.md`.
    

> 💡 **Tamaño ideal**: <200 líneas. Si crece más, parte en subdirs anidados (`backend/AGENTS.md`, `frontend/AGENTS.md`). El agente lee el más profundo.

> 📌 **Una regla operativa que aparece en >2.500** [**AGENTS.md**](http://agents.md/) **analizados por GitHub Copilot**: `Never commit secrets`. Es la regla más útil y universal que existe.

---

## 2 · Skills — workflows reusables

Las skills son **instrucciones empaquetadas que el agente puede invocar** (manualmente o automáticamente) cuando aplica el contexto. En octubre de 2025 Anthropic fusionó *commands* y *skills* en una sola primitiva. Hoy la diferencia es operacional, no conceptual.

### Anatomía de una skill en Claude Code

```diagram
.claude/
└── skills/
    └── pr-review/
        └── SKILL.md
```

`.claude/skills/pr-review/SKILL.md`:

```
---
name: pr-review
description: Revisa el diff de la PR actual buscando bugs, problemas de seguridad y violaciones de convenciones del repo. Usa cuando se te pida "revisar PR" o "code review".
disable-model-invocation: false
allowed-tools: [Read, Grep, Glob, Bash]
---

Eres un reviewer senior. Cuando se invoque esta skill:

1. Ejecuta `git diff origin/main...HEAD` para obtener el diff.
2. Lee `AGENTS.md` para conocer las convenciones del repo.
3. Para cada archivo del diff, busca:
   - Bugs lógicos
   - Problemas de seguridad (inyecciones, secrets, validación)
   - Violaciones de las convenciones del repo
   - Tests faltantes
4. Devuelve un único resumen estructurado con severidad por hallazgo.

NO modifiques archivos. Solo análisis.
```

### Cómo se activan

Tres modos:

-   **Manual** — escribes `/pr-review` en el chat. Inyecta la skill.
    
-   **Auto-invocación** — el agente lee la `description` de cada skill al inicio de turno y decide si la skill aplica al prompt actual. Si la descripción es buena, el match funciona.
    
-   **Bloqueado a manual** — `disable-model-invocation: true` impide auto-invocación. Útil para skills sensibles (deploys, scripts destructivos).
    

### Skills bundled en Claude Code

Vienen de fábrica y siempre disponibles:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/7ada2f5b-4ef7-4a81-8159-23c095f64861/d4dea7efd31e33e6.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### En Cursor

Idéntico concepto: archivos `SKILL.md` con frontmatter, carpeta `.cursor/skills/` o reconocidos vía rule. Cursor también lee skills de Claude por compatibilidad cross-tool (Agent Skills es un open standard).

> 💡 **Buena descripción = mejor auto-invocación**: si tu skill se llama `pr-review` pero la descripción dice "review code", el agente la invocará para *cualquier* lectura de código. Sé específico: incluye triggers reales ("cuando se mencione 'revisa la PR' o 'code review'").

---

## 3 · Subagents

Un subagent es una **instancia del modelo con su propio contexto, sus propios permisos y su propio resumen de salida**. Cuando el principal delega, el subagent trabaja, devuelve un resumen, y nada de lo que vio entra en el contexto principal.

### Built-in en Claude Code

![image.png](https://media1-production-mightynetworks.imgix.net/asset/30b88e6c-5e13-4286-ad46-0f6230ce1e72/57cb71c514287a93.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Tú no los invocas explícitamente. El agente principal decide. Tu único trabajo es **redactar el prompt de forma que el modelo entienda que conviene delegar**.

Ejemplo:

```
> Antes de implementar la nueva funcionalidad de notificaciones,
  usa un subagent para investigar cómo se mandan emails en este
  codebase ahora mismo y resume las decisiones de arquitectura
  que ya están tomadas.
```

El "usa un subagent" es un *signal* explícito. El modelo lanzará un Explore (porque es read-only por naturaleza) y devolverá un resumen al main. Tu contexto principal no se llenó de archivos leídos.

### Custom subagents

Cuando descubres que repites el mismo "research → resumen → planning" varias veces, conviértelo en un custom subagent.

`.claude/agents/research-assistant.md`:

```
---
name: research-assistant
description: Research técnico profundo. Lee múltiples archivos y/o documentación, sintetiza, devuelve un brief con findings + decisiones recomendadas + open questions. Úsalo antes de cualquier planificación de feature compleja.
tools: [Read, Grep, Glob, WebSearch, WebFetch]
model: sonnet
permissionMode: default
---

Eres un research engineer senior. Cuando recibas una tarea:

1. Mapea el problema en 3-5 sub-preguntas concretas.
2. Para cada sub-pregunta, busca en el codebase y/o web.
3. Sintetiza un brief con esta estructura exacta:
   - **Findings**: lo que sabemos
   - **Recomendación**: qué decisiones tomar y por qué
   - **Open questions**: lo que sigue sin resolver

Sé conciso. Cita rutas/líneas y URLs específicas. No propongas implementación, solo análisis.
```

### Reglas operativas

-   La **descripción es el routing hint**. Si el modelo no encuentra match claro, no delega. Sé explícito sobre cuándo usar la skill.
    
-   Tools restringidas son tu amigo. Un subagent de research **no debe tener Edit ni Bash**.
    
-   `permissionMode: plan` fuerza al subagent a generar plan que tú apruebas antes de ejecutar.
    
-   **Multi-agent workflows usan ~4-7× más tokens** que single-agent. Los subagents son potentes pero no gratis.
    

### En Cursor

Desde **Cursor 3.0 (2 abril 2026)** la primitiva equivalente vive en la **Agents Window** — un panel dedicado donde conviven los agentes locales con los *cloud agents*. Los comandos relevantes en chat son:

-   `/multitask <prompt>` — paraleliza N agentes async, hasta 8 a la vez (mejorado en Cursor 3.2, 24 abril 2026).
    
-   `/best-of-n <prompt>` — el mismo prompt contra varios modelos, comparar.
    
-   `/worktree` — agente en un worktree git aislado para experimentos.
    

A diferencia de los subagents de Claude Code, los agentes de Cursor pueden ejecutar tanto en local (con tu codebase, tu shell) como en cloud (Cursor lo provisiona en una VM). Cursor 3.x también permite **agentes self-hosted** en plan Enterprise (25 marzo 2026), donde la VM corre dentro de tu infraestructura.

---

## 4 · Plan Mode — el dry-run con gate humano

Plan mode es el modo donde el agente **solo lee** (Read, Grep, Glob, LS, WebSearch, WebFetch, Task, AskUserQuestion) y produce un plan. Tú apruebas. Luego ejecuta.

### Activación

-   **Claude Code**: `Shift+Tab` dos veces (Tab cicla auto-accept ↔ default ↔ plan), o `/plan` directo.
    
-   **Cursor**: `Shift+Tab` para entrar en Plan Mode. El plan se guarda opcionalmente en `.cursor/plans/<feature>.md` como Markdown editable.
    
-   **Copilot CLI**: `Plan mode` en el TUI.
    

### Salida típica

Al terminar, el agente te presenta:

```diagram
Accept plan?
  ▶ Yes, auto-accept future similar tool calls
    Yes, manually approve each tool call
    No, keep planning
```

### Cuándo SÍ usarlo

![image.png](https://media1-production-mightynetworks.imgix.net/asset/82b21637-204d-4a52-9b6c-afb1c515de96/c5b84e514858797b.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Cuándo NO usarlo

-   Fix tipográfico, formateo, añadir log único.
    
-   Tareas exploratorias (ahí ya hay un Explore subagent que es lo correcto).
    
-   Iteración rápida sobre algo que tú entiendes mejor que el agente.
    

> 💡 **Patrón senior**: empezar siempre en plan mode para tareas no triviales. Si el plan es bueno, *Yes auto-accept*. Si el plan es malo, *No keep planning* y reformulas. **El gate humano va entre Plan y Execute, no antes.** La fase Explore debe ser libre y barata.

---

## 5 · Hooks — código determinista en el ciclo de vida

Los prompts son interpretables. Los hooks no. Un hook es **un script (o llamada HTTP, o prompt, o agent)** que se ejecuta automáticamente en un evento concreto del ciclo de vida del agente.

### Eventos disponibles en Claude Code (versión actual, abril 2026)

21 puntos del ciclo de vida. Los que vas a usar de verdad:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/aa2f6323-cbbc-4ead-8a4e-6b611e618ecd/31521a0c874be5e8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### 4 tipos de handler

```
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(rm -rf:*)",
        "type": "command",
        "command": "echo 'BLOQUEADO: rm -rf detectado' && exit 2"
      }
    ]
  }
}
```

-   `command`: shell command. Exit code 2 bloquea la operación.
    
-   `http`: POST a una URL (nuevo en feb 2026). Útil para integraciones con sistemas internos.
    
-   `prompt`: inyecta texto al modelo.
    
-   `agent`: delega a un subagent.
    

`async: true` en cualquier handler hace que no bloquee la ejecución (útil para logging).

### Ejemplos prácticos sobre el repo del máster

**Bloquear escritura accidental en producción:**

```
{
  "matcher": "Bash(*production*)",
  "type": "command",
  "command": "echo 'No tocar producción desde Claude Code' && exit 2"
}
```

**Auto-format al guardar archivos AdonisJS:**

```
{
  "PostToolUse": [
    {
      "matcher": "Edit:*.ts",
      "type": "command",
      "command": "cd backend && npm run format -- $CLAUDE_FILE"
    }
  ]
}
```

**Cargar branch + último commit al arrancar:**

```
{
  "SessionStart": [
    {
      "type": "command",
      "command": "echo \\"Branch: $(git branch --show-current)\\\\nLast commit: $(git log -1 --oneline)\\""
    }
  ]
}
```

### En Cursor

Hooks similares se declaran dentro de skills/rules. Menos eventos disponibles que en Claude Code, pero suficientes para el 80% de los casos comunes.

> ⚠ **Hooks > prompts para invariantes críticos**. Si necesitas garantizar que algo *nunca* pase, no se lo pidas al modelo en [CLAUDE.md](http://claude.md/). Escríbelo como hook. La diferencia es entre **interpretación** (que falla a veces) y **ejecución** (que falla nunca).

---

## 6 · MCP servers en serio

> El pre-curso ya cubrió **qué es MCP** y por qué se convirtió en estándar (Linux Foundation, dic 2025). Aquí vamos al **cómo se configura**.

### Comandos esenciales en Claude Code

```
# Añadir MCP server vía HTTP transport
claude mcp add <nombre> --transport http <url> -H "Authorization: Bearer XXX"

# Añadir MCP server vía stdio (proceso local)
claude mcp add <nombre> -- npx -y @modelcontextprotocol/server-<x>

# Listar servers configurados
claude mcp list

# Inspeccionar un server
claude mcp get <nombre>

# Quitar un server
claude mcp remove <nombre>
```

### Scopes (dónde vive la configuración)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/43d7ad0b-e308-4e28-b0c3-e2b82aa28a5d/32b44769f36f2de8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Regla de oro**: lo que requiere credenciales personales (tu PAT de GitHub, tu API key de Notion) va en `--scope user`. Lo que es del proyecto y no tiene secrets (un servidor MCP custom de tu equipo) va en `--scope project` y se commitea.

### MCP servers que merece la pena conocer en abril 2026

-   **filesystem** — acceso controlado a directorios fuera del proyecto.
    
-   **github** — repos, PRs, issues, code search. (`claude mcp add github --transport http <https://api.githubcopilot.com/mcp> -H "Authorization: Bearer $GITHUB_PAT"`)
    
-   **context7** — pulls docs actualizadas de cualquier librería en contexto. Crítico para librerías que cambian rápido.
    
-   **postgres / sqlite** — query natural language sobre la BD.
    
-   **playwright / puppeteer** — control de navegador.
    
-   **sentry** — errores de producción.
    

### Inspeccionar la sesión activa

Dentro de Claude Code:

```
> /mcp
```

Te muestra qué servers están conectados y qué tools/prompts/resources expone cada uno. Los prompts MCP aparecen como `/mcp__servername__promptname`.

### En Cursor

`Settings → MCP → New MCP Server`. UI con catálogo curado de servers populares. Se puede instalar con un click. La configuración subyacente es un JSON equivalente.

> 📌 **Disciplina de contexto**: cada MCP server conectado consume tokens en cada turno (Claude tiene que conocer las tools que expone). No tengas conectados servers que no usas. La nueva feature **MCP Tool Search** (Claude Code) hace lazy-loading: las tools sólo entran al contexto cuando hacen falta. Si tu versión la soporta, actívala.

---

## 7 · Output Styles — cambiar la "personalidad"

Output styles **reemplazan** el system prompt de Claude Code. No es lo mismo que [CLAUDE.md](http://claude.md/) (que añade contexto encima del system prompt) ni que skills (que se invocan on-demand). Es un cambio de personalidad **persistente** durante la sesión.

### Built-in

![image.png](https://media1-production-mightynetworks.imgix.net/asset/816e6072-d829-4103-8fdd-3043fc81bf15/c55e8ffe51aac516.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Custom

```
> /output-style:new
```

Te guía para crear un archivo en `~/.claude/output-styles/<name>.md` con el system prompt que quieras.

### Cuándo importa de verdad

-   **Onboarding de un dev junior al repo**: estilo explanatory durante la primera semana.
    
-   **Trabajos no-coding** (research, escritura técnica, análisis de logs): un estilo que quite las asunciones de "soy un coding agent".
    
-   **Estilo de equipo**: que el agente hable en castellano, en tono profesional, sin emojis, etc.
    

> ⚠ **Output Styles ≠** [**CLAUDE.md**](http://claude.md/) **≠ Skills**. Output style cambia *cómo* habla el agente. [CLAUDE.md](http://claude.md/) le da contexto del proyecto. Skill es un workflow on-demand. **Si el patrón "yo necesito que el agente hable así" lo aplicas en cada repo, va en output style. Si es de este proyecto, va en** [**CLAUDE.md**](http://claude.md/)**.**

---

## Tabla de traducción agnóstica

Llévate ésta a tu siguiente sesión:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/05ca0612-f9d6-44fe-8334-effd4cb82380/2c206babfdfd8390.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

---

## Bonus · Plugins: cómo se distribuye todo lo anterior

Las 7 primitivas son lo que *hace* el copiloto. Los plugins son **cómo se empaquetan y se comparten**. No son una primitiva más; son el mecanismo de distribución de las anteriores.

### Anatomía de un plugin de Claude Code

```diagram
my-plugin/
├── .claude-plugin/
│   └── plugin.json          ← Manifest obligatorio
├── skills/                   ← Skills bundled
│   └── my-skill/
│       └── SKILL.md
├── agents/                   ← Subagents bundled
│   └── reviewer.md
├── hooks/                    ← Hooks bundled
│   └── hooks.json
└── .mcp.json                 ← MCP servers bundled
```

Un plugin puede traer cualquier combinación de skills, agents, hooks y MCP. Los nombres se *namespacean* automáticamente con el plugin (`<plugin>:<skill>`) para evitar colisiones.

### Marketplace y comandos

El marketplace de Anthropic vive en GitHub:

```
# Añadir el marketplace oficial
> /plugin marketplace add anthropics/claude-plugins-official

# Buscar plugins disponibles
> /plugin

# Instalar uno específico
> /plugin install code-review@anthropics
```

Cualquier repo público de GitHub puede ser un marketplace. Eso es importante: **tu equipo puede tener su propio marketplace privado** con los plugins internos.

### Cuándo crear un plugin propio

Crea un plugin cuando:

-   Tienes 2+ skills que conviven y se complementan (ej: `pr-review` + `pr-feedback-formatter`).
    
-   Quieres compartir hooks de seguridad con todo tu equipo.
    
-   Necesitas que un cambio en una skill se propague a todos los proyectos del equipo sin tocar repos.
    

No crees un plugin cuando:

-   Tienes una skill aislada → vive como skill simple en `.claude/skills/`.
    
-   Solo lo vas a usar tú → user-level (`~/.claude/skills/`) hace el trabajo.
    

### En Cursor

El ecosistema de plugins evolucionó por versiones:

-   **Cursor 2.5** (febrero 2026): plugin marketplace.
    
-   **Cursor 2.6** (marzo 2026): team marketplaces (catálogos privados por equipo).
    
-   **Cursor 3.0** (2 abril 2026): integración con la *Agents Window* — los plugins conviven con cloud agents, automations y multi-root workspaces en la misma UI.
    
-   **Cursor 3.2** (24 abril 2026, versión actual): worktrees mejorados, multitask async optimizado.
    

La estructura del plugin sigue siendo la misma a lo largo de las versiones: skills + rules + hooks empaquetados.

> 📌 **Implicación práctica para el máster**: cuando el cliente cambie de copiloto en 2 años, lo que se mueve contigo no son los plugins (atados a la herramienta). Lo que se mueve es [**AGENTS.md**](http://agents.md/) **y la lógica de tus skills**. Diseña tus plugins como *capas finas sobre primitivas portables*, no como ecosistemas atados al vendor.
