# 📄 Anatomy of a modern copilot 🔴 — 28 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 28 min

## The thesis: the tools are converging on the same primitives

A year ago, comparing Claude Code with Cursor with Copilot with Cline was comparing products. Today it's comparing **surfaces over the same set of primitives**. The New Stack described it in March as a *"composable AI coding stack"* that nobody planned: the functions converged, the names didn't.

That shift matters because:

1.  **What you learn to configure in one tool transfers almost entirely to the others.** You're not learning Claude Code; you're learning *agentic coding*.
    
2.  **When the next tool appears** (and it will), recognizing the primitives saves you the mental reset.
    
3.  **Mixing tools is the norm, not the exception.** Knowing how to translate concepts between them is what distinguishes the senior.
    

The **7 primitives** shared by every serious copilot as of April 2026:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e242077c-5aed-48db-9820-ac3a54a0e757/783031282fc56fbd.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

The rest of the lesson explains each one with its concrete instantiation. It closes with an **agnostic translation table** ready to print.

---

## 1 · Persistent project memory

> In S1 you already met the idea (the Context pillar). Here we formalize **which file, where it lives, and what to put in it**.

The agent starts every session with no memory. Persistent project memory solves that: a file in your repo that is loaded automatically in every session.

### The file per tool

![image.png](https://media1-production-mightynetworks.imgix.net/asset/28c24e44-c471-4729-96cb-454be21009e4/680e4ea6ae8a8593.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### The emerging standard: [AGENTS.md](http://agents.md/)

`AGENTS.md` is the common format most tools adopted in 2025-2026. It's under the *stewardship* of the **Linux Foundation** (Agentic AI Foundation) and is supported by Codex, Cursor, Copilot, Gemini, Windsurf, OpenCode, Jules… and practically every serious tool. **\>60,000 public repos on GitHub already use it** (Apache Airflow, Temporal, Vercel Next.js, Inngest, among the reference ones).

Claude Code is the **exception** as of April 2026: it doesn't read it natively. The issue [anthropics/claude-code#6235](https://github.com/anthropics/claude-code/issues) has thousands of upvotes requesting it. The community solved it with a standard pattern:

```
# Source of truth multi-tool
AGENTS.md

# Symlink para que Claude Code lo lea
ln -s AGENTS.md CLAUDE.md
```

That's it. Your `AGENTS.md` becomes the single source of truth and Claude Code reads it through the symlink.

### Recommended repo structure

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

### What to put (and what not to) in [AGENTS.md](http://agents.md/)

**Put in only what the agent can NOT infer by reading the code:**

-   Non-trivial build/test/run commands (`npm run dev:backend` that starts AdonisJS + migrations).
    
-   Internal conventions (naming policies, folder structure, what goes in `app/transformers/`).
    
-   Operational constraints ("never commit `.env`", "don't touch `vendor/`", "PRs always against `main`, never against `release/*`").
    
-   Non-obvious tooling (Pixi, internal tools, testing types).
    

**Don't put in:**

-   The repo structure in tree format. An ETH study (cited in `agents.md`) showed that this **increases inference cost and pushes the agent to traverse more files without improving the success rate**.
    
-   Architecture documentation. That goes in `docs/`.
    
-   Onboarding for humans. That's `README.md`.
    

> 💡 **Ideal size**: <200 lines. If it grows beyond that, split it into nested subdirs (`backend/AGENTS.md`, `frontend/AGENTS.md`). The agent reads the deepest one.

> 📌 **One operational rule that appears in >2,500** [**AGENTS.md**](http://agents.md/) **files analyzed by GitHub Copilot**: `Never commit secrets`. It's the most useful and universal rule there is.

---

## 2 · Skills — reusable workflows

Skills are **packaged instructions the agent can invoke** (manually or automatically) when the context applies. In October 2025 Anthropic merged *commands* and *skills* into a single primitive. Today the difference is operational, not conceptual.

### Anatomy of a skill in Claude Code

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

### How they get activated

Three modes:

-   **Manual** — you type `/pr-review` in the chat. It injects the skill.
    
-   **Auto-invocation** — the agent reads each skill's `description` at the start of the turn and decides whether the skill applies to the current prompt. If the description is good, the match works.
    
-   **Locked to manual** — `disable-model-invocation: true` prevents auto-invocation. Useful for sensitive skills (deploys, destructive scripts).
    

### Skills bundled in Claude Code

They come out of the box and are always available:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/7ada2f5b-4ef7-4a81-8159-23c095f64861/d4dea7efd31e33e6.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### In Cursor

Identical concept: `SKILL.md` files with frontmatter, a `.cursor/skills/` folder or recognized via rule. Cursor also reads Claude skills for cross-tool compatibility (Agent Skills is an open standard).

> 💡 **Good description = better auto-invocation**: if your skill is called `pr-review` but the description says "review code," the agent will invoke it for *any* code reading. Be specific: include real triggers ("when 'revisa la PR' or 'code review' is mentioned").

---

## 3 · Subagents

A subagent is an **instance of the model with its own context, its own permissions, and its own output summary**. When the main agent delegates, the subagent works, returns a summary, and nothing it saw enters the main context.

### Built-in in Claude Code

![image.png](https://media1-production-mightynetworks.imgix.net/asset/30b88e6c-5e13-4286-ad46-0f6230ce1e72/57cb71c514287a93.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

You don't invoke them explicitly. The main agent decides. Your only job is to **write the prompt in a way that makes the model understand that delegating is worthwhile**.

Example:

```
> Antes de implementar la nueva funcionalidad de notificaciones,
  usa un subagent para investigar cómo se mandan emails en este
  codebase ahora mismo y resume las decisiones de arquitectura
  que ya están tomadas.
```

The "usa un subagent" is an explicit *signal*. The model will launch an Explore (because it's read-only by nature) and return a summary to the main agent. Your main context didn't fill up with read files.

### Custom subagents

When you find yourself repeating the same "research → summary → planning" several times, turn it into a custom subagent.

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

### Operational rules

-   The **description is the routing hint**. If the model doesn't find a clear match, it doesn't delegate. Be explicit about when to use the skill.
    
-   Restricted tools are your friend. A research subagent **should not have Edit or Bash**.
    
-   `permissionMode: plan` forces the subagent to generate a plan that you approve before executing.
    
-   **Multi-agent workflows use ~4-7× more tokens** than single-agent. Subagents are powerful but not free.
    

### In Cursor

Since **Cursor 3.0 (April 2, 2026)** the equivalent primitive lives in the **Agents Window** — a dedicated panel where local agents coexist with *cloud agents*. The relevant chat commands are:

-   `/multitask <prompt>` — parallelizes N async agents, up to 8 at a time (improved in Cursor 3.2, April 24, 2026).
    
-   `/best-of-n <prompt>` — the same prompt against several models, to compare.
    
-   `/worktree` — an agent in an isolated git worktree for experiments.
    

Unlike Claude Code's subagents, Cursor's agents can run both locally (with your codebase, your shell) and in the cloud (Cursor provisions it in a VM). Cursor 3.x also allows **self-hosted agents** on the Enterprise plan (March 25, 2026), where the VM runs inside your infrastructure.

---

## 4 · Plan Mode — the dry-run with a human gate

Plan mode is the mode where the agent **only reads** (Read, Grep, Glob, LS, WebSearch, WebFetch, Task, AskUserQuestion) and produces a plan. You approve. Then it executes.

### Activation

-   **Claude Code**: `Shift+Tab` twice (Tab cycles auto-accept ↔ default ↔ plan), or `/plan` directly.
    
-   **Cursor**: `Shift+Tab` to enter Plan Mode. The plan is optionally saved to `.cursor/plans/<feature>.md` as editable Markdown.
    
-   **Copilot CLI**: `Plan mode` in the TUI.
    

### Typical output

When it finishes, the agent presents you with:

```diagram
Accept plan?
  ▶ Yes, auto-accept future similar tool calls
    Yes, manually approve each tool call
    No, keep planning
```

### When to use it

![image.png](https://media1-production-mightynetworks.imgix.net/asset/82b21637-204d-4a52-9b6c-afb1c515de96/c5b84e514858797b.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### When NOT to use it

-   Typo fix, formatting, adding a single log line.
    
-   Exploratory tasks (there's already an Explore subagent for that, which is the right choice).
    
-   Rapid iteration on something you understand better than the agent.
    

> 💡 **Senior pattern**: always start in plan mode for non-trivial tasks. If the plan is good, *Yes auto-accept*. If the plan is bad, *No keep planning* and rephrase. **The human gate goes between Plan and Execute, not before.** The Explore phase should be free and cheap.

---

## 5 · Hooks — deterministic code in the lifecycle

Prompts are interpretable. Hooks are not. A hook is **a script (or HTTP call, or prompt, or agent)** that runs automatically on a specific event in the agent's lifecycle.

### Available events in Claude Code (current version, April 2026)

21 lifecycle points. The ones you'll actually use:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/aa2f6323-cbbc-4ead-8a4e-6b611e618ecd/31521a0c874be5e8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### 4 handler types

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

-   `command`: shell command. Exit code 2 blocks the operation.
    
-   `http`: POST to a URL (new in Feb 2026). Useful for integrations with internal systems.
    
-   `prompt`: injects text into the model.
    
-   `agent`: delegates to a subagent.
    

`async: true` on any handler makes it non-blocking (useful for logging).

### Practical examples on the master repo

**Block accidental writes to production:**

```
{
  "matcher": "Bash(*production*)",
  "type": "command",
  "command": "echo 'No tocar producción desde Claude Code' && exit 2"
}
```

**Auto-format when saving AdonisJS files:**

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

**Load branch + latest commit on startup:**

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

### In Cursor

Similar hooks are declared inside skills/rules. Fewer available events than in Claude Code, but enough for 80% of common cases.

> ⚠ **Hooks > prompts for critical invariants**. If you need to guarantee that something *never* happens, don't ask the model for it in [CLAUDE.md](http://claude.md/). Write it as a hook. The difference is between **interpretation** (which sometimes fails) and **execution** (which never fails).

---

## 6 · MCP servers, seriously

> The pre-course already covered **what MCP is** and why it became a standard (Linux Foundation, Dec 2025). Here we get into **how it's configured**.

### Essential commands in Claude Code

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

### Scopes (where the configuration lives)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/43d7ad0b-e308-4e28-b0c3-e2b82aa28a5d/32b44769f36f2de8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Golden rule**: anything requiring personal credentials (your GitHub PAT, your Notion API key) goes in `--scope user`. Anything that belongs to the project and has no secrets (a custom MCP server from your team) goes in `--scope project` and gets committed.

### MCP servers worth knowing in April 2026

-   **filesystem** — controlled access to directories outside the project.
    
-   **github** — repos, PRs, issues, code search. (`claude mcp add github --transport http <https://api.githubcopilot.com/mcp> -H "Authorization: Bearer $GITHUB_PAT"`)
    
-   **context7** — pulls up-to-date docs for any library into context. Critical for fast-changing libraries.
    
-   **postgres / sqlite** — natural language queries over the DB.
    
-   **playwright / puppeteer** — browser control.
    
-   **sentry** — production errors.
    

### Inspecting the active session

Inside Claude Code:

```
> /mcp
```

It shows you which servers are connected and which tools/prompts/resources each one exposes. MCP prompts appear as `/mcp__servername__promptname`.

### In Cursor

`Settings → MCP → New MCP Server`. UI with a curated catalog of popular servers. One-click installation. The underlying configuration is an equivalent JSON.

> 📌 **Context discipline**: every connected MCP server consumes tokens on every turn (Claude has to know the tools it exposes). Don't keep servers connected that you don't use. The new **MCP Tool Search** feature (Claude Code) does lazy-loading: tools only enter the context when they're needed. If your version supports it, enable it.

---

## 7 · Output Styles — changing the "personality"

Output styles **replace** Claude Code's system prompt. It's not the same as [CLAUDE.md](http://claude.md/) (which adds context on top of the system prompt) nor as skills (which are invoked on-demand). It's a **persistent** personality change for the session.

### Built-in

![image.png](https://media1-production-mightynetworks.imgix.net/asset/816e6072-d829-4103-8fdd-3043fc81bf15/c55e8ffe51aac516.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Custom

```
> /output-style:new
```

It guides you to create a file in `~/.claude/output-styles/<name>.md` with whatever system prompt you want.

### When it really matters

-   **Onboarding a junior dev to the repo**: explanatory style during the first week.
    
-   **Non-coding work** (research, technical writing, log analysis): a style that removes the "I'm a coding agent" assumptions.
    
-   **Team style**: having the agent speak in Spanish, in a professional tone, without emojis, etc.
    

> ⚠ **Output Styles ≠** [**CLAUDE.md**](http://claude.md/) **≠ Skills**. Output style changes *how* the agent speaks. [CLAUDE.md](http://claude.md/) gives it project context. A skill is an on-demand workflow. **If the pattern "I need the agent to speak like this" applies in every repo, it goes in an output style. If it's specific to this project, it goes in** [**CLAUDE.md**](http://claude.md/)**.**

---

## Agnostic translation table

Take this one to your next session:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/05ca0612-f9d6-44fe-8334-effd4cb82380/2c206babfdfd8390.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

---

## Bonus · Plugins: how everything above gets distributed

The 7 primitives are what the copilot *does*. Plugins are **how they get packaged and shared**. They're not another primitive; they're the distribution mechanism for the previous ones.

### Anatomy of a Claude Code plugin

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

A plugin can bring any combination of skills, agents, hooks, and MCP. Names are automatically *namespaced* with the plugin (`<plugin>:<skill>`) to avoid collisions.

### Marketplace and commands

Anthropic's marketplace lives on GitHub:

```
# Añadir el marketplace oficial
> /plugin marketplace add anthropics/claude-plugins-official

# Buscar plugins disponibles
> /plugin

# Instalar uno específico
> /plugin install code-review@anthropics
```

Any public GitHub repo can be a marketplace. That's important: **your team can have its own private marketplace** with internal plugins.

### When to create your own plugin

Create a plugin when:

-   You have 2+ skills that coexist and complement each other (e.g. `pr-review` + `pr-feedback-formatter`).
    
-   You want to share security hooks with your whole team.
    
-   You need a change in a skill to propagate to all the team's projects without touching repos.
    

Don't create a plugin when:

-   You have an isolated skill → it lives as a simple skill in `.claude/skills/`.
    
-   Only you will use it → user-level (`~/.claude/skills/`) does the job.
    

### In Cursor

The plugin ecosystem evolved across versions:

-   **Cursor 2.5** (February 2026): plugin marketplace.
    
-   **Cursor 2.6** (March 2026): team marketplaces (private per-team catalogs).
    
-   **Cursor 3.0** (April 2, 2026): integration with the *Agents Window* — plugins coexist with cloud agents, automations, and multi-root workspaces in the same UI.
    
-   **Cursor 3.2** (April 24, 2026, current version): improved worktrees, optimized async multitask.
    

The plugin structure remains the same across versions: skills + rules + hooks, packaged.

> 📌 **Practical implication for the master**: when the client switches copilots in 2 years, what moves with you isn't the plugins (tied to the tool). What moves is [**AGENTS.md**](http://agents.md/) **and the logic of your skills**. Design your plugins as *thin layers over portable primitives*, not as vendor-locked ecosystems.
