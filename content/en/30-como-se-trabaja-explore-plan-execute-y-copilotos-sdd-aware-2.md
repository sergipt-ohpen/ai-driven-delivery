# 📄 How to work: Explore-Plan-Execute and SDD-aware copilots 🔴 — 22 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 22 min

## The canonical pipeline: Explore-Plan-Execute (EPE)

Nobody in particular invented EPE. It appeared in parallel in the Anthropic blogs (subagents, April 2026), Cursor (Lee Robinson, "Agent best practices", January 2026), and in the talks by Boris Cherny (creator of Claude Code) during fall 2025. Today it's the implicit pattern everyone assumes when they talk about "serious agentic coding".

The idea is trivial: **separate exploration, planning, and execution into distinct phases, with different models and permissions**.

```
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   EXPLORE    │   →    │     PLAN     │   →    │   EXECUTE    │
├──────────────┤        ├──────────────┤        ├──────────────┤
│ Read-only    │        │ Razonamiento │        │ Edit + Bash  │
│ Modelo barato│        │ Modelo top   │        │ Auto-accept  │
│ Subagent     │        │ Plan mode    │        │ Hooks activos│
│              │        │ ──────       │        │              │
│              │        │ ↑            │        │              │
│              │        │ │ GATE       │        │              │
│              │        │ │ HUMANO     │        │              │
└──────────────┘        └──────────────┘        └──────────────┘
```

### Phase 1 · Explore (read-only, isolated context, cheap model)

**Objective**: for the main model to understand the problem *before* it tries to solve it, without contaminating your main session with hundreds of read files.

**Implementation in Claude Code**: the `Explore` subagent (Haiku 4.5, read-only) you already know. Three ways to invoke it:

-   Implicit: the main agent launches it when it detects the task requires searching.
    
-   Explicit in the prompt: *"Before implementing X, use a subagent to explore Y..."*
    
-   Via custom subagent (lesson 2) if you have a recurring research pattern.
    

**Implementation in Cursor**: chat with `/multitask` or `/best-of-n` to parallelize exploration; the results appear in the Agents Window and are synthesized into a summary that enters the main context.

**Cost**: low. Haiku at $1/$5 per MTok. A typical exploration is ~5K-15K output tokens.

### Phase 2 · Plan (explicit reasoning, human gate)

**Objective**: turn what was learned into an executable plan that **you approve before any code is touched**.

**Implementation**: plan mode (Shift+Tab x2 in Claude Code, Shift+Tab in Cursor). The agent can only read; it has to produce the plan in Markdown.

**Recommended model**: the most capable available. Opus 4.7 if you have it. Sonnet 4.6 if not.

**Frequent anti-pattern**: approving the plan without reading it. The plan is exactly what you're about to spend tokens executing. Read it. If it has 5 steps and 3 look wrong, *No, keep planning* and rephrase.

> 💡 **Senior trick**: if the plan is good but missing concrete details, instead of re-planning, copy the plan, edit it by hand in your editor, and pass it in the next turn as *"Implement this exact plan"*. Cursor lets you edit the plan in `.cursor/plans/<feature>.md` before executing.

### Phase 3 · Execute (writing, active hooks, auto-accept)

**Objective**: translate the approved plan into code.

**Implementation**:

-   In Claude Code, exit plan mode (Shift+Tab) → agentic mode with auto-accept on safe patterns and manual approval on destructive operations (controlled by `permissionMode` and hooks).
    
-   In Cursor, let Composer execute the plan; diffs are shown inline for review.
    

**Model**: the balanced one. Sonnet 4.6 in Claude Code, Composer 2 (Auto) in Cursor.

**What needs to be in place**:

-   `PreToolUse` hooks to block the dangerous stuff (see lesson 2).
    
-   `PostToolUse` for auto-format/lint.
    
-   `Stop` to validate that tests pass when it finishes.
    

### Why the human gate goes between Plan and Execute (not earlier)

Common temptation: *"I want to see what the agent is reading in Explore before continuing"*.

Bad idea. For two reasons:

1.  **Explore is cheap**. Haiku reading 30 files costs less than a coffee. Your time is more expensive.
    
2.  **Watching Explore ties you to reading 30 files**. The whole point of Explore is that it synthesizes for you. If you supervise it turn-by-turn, you've lost the context savings.
    

The plan, on the other hand, is **the exact moment where a mistake becomes expensive**: if you approve a bad plan, you're going to waste expensive tokens, dirty your repo, and possibly break something. That's where it's worth investing 2 minutes of reading.

---

## Plan mode vs direct agentic: decision tree

```
¿La tarea toca > 3 archivos?
├── Sí → PLAN MODE
└── No → ¿Tiene side-effects (DB, deploy, rm, secrets)?
           ├── Sí → PLAN MODE + hooks PreToolUse
           └── No → ¿Conoces bien la zona del código?
                      ├── No → PLAN MODE
                      └── Sí → ¿Es un fix puntual / formato / log?
                                 ├── Sí → AGÉNTICO DIRECTO (con auto-accept)
                                 └── No → PLAN MODE
```

> 📌 **Operational heuristic**: when in doubt, plan mode. The cost of an extra plan is 30 seconds of reading. The cost of a misplaced *Yes auto-accept* can be an hour of reverting changes.

---

## Integrating OpenSpec with the copilot: 3 SDD-aware patterns

> In S2 you worked with OpenSpec as a method. Here we'll look at **how to connect the specs with the agent** during implementation.

The problem: you have specs in `openspec/changes/<id>/` (proposal, specs, tasks, design), and when you ask the agent to implement, you need to make sure the agent **reads and respects** the spec, rather than improvising.

Three patterns, from least to most control:

### Pattern A · Explicit reference in the first turn

The simplest and most used:

```
> Implementa el cambio openspec/changes/add-notifications/.
  Lee primero proposal.md, specs/*.md, design.md y tasks.md.
  Sigue tasks.md paso a paso. Pregúntame antes de desviarte
  de cualquier requisito de specs/.
```

**Pros**: zero setup, works in any tool. **Cons**: you have to remember to add that tag line. If you open a new session and forget, the agent may improvise.

### Pattern B · SDD-aware skill

You turn it into a manual skill:

`.claude/skills/openspec-implement/SKILL.md`:

```
---
name: openspec-implement
description: Implementa un cambio OpenSpec. Úsala cuando el prompt mencione "implementa el change <id>" o "trabaja sobre openspec/changes/<id>".
disable-model-invocation: false
allowed-tools: [Read, Edit, Write, Bash, Grep, Glob]
---

Cuando se te pida implementar un cambio OpenSpec:

1. Lee TODOS estos archivos en orden, sin excepción:
   - openspec/changes/<id>/proposal.md
   - openspec/changes/<id>/design.md (si existe)
   - openspec/changes/<id>/specs/**/*.md
   - openspec/changes/<id>/tasks.md
2. Para cada task de tasks.md, marca ☐ → en progreso, implementa, valida, marca ☑.
3. Si necesitas desviarte de algo en specs/, **detente y pregunta**. NO improvises.
4. Al terminar todas las tasks, ejecuta los tests del proyecto.
5. Cierra con un resumen: qué archivos cambiaron, qué tests pasan, qué quedó pendiente.

NUNCA modifiques archivos en openspec/. Ese directorio es input para ti, no output.
```

You invoke it with `/openspec-implement` and pass the change id.

**Pros**: explicit, repeatable, auditable workflow. **Cons**: the skill needs maintenance as OpenSpec evolves.

### Pattern C · Skill + validator hook

The strictest. You add a `Stop` hook that validates that **what was implemented matches the spec**:

`.claude/settings.json`:

```
{
  "hooks": {
    "Stop": [
      {
        "matcher": "*",
        "type": "command",
        "command": "scripts/validate-against-spec.sh $CLAUDE_LAST_OPENSPEC_CHANGE"
      }
    ]
  }
}
```

Where `validate-against-spec.sh` runs the acceptance tests derived from specs/. If it fails (exit 2), the agent receives the error and enters a repair loop.

**Pros**: the loop closes itself. The agent can't declare "done" without the spec validating. **Cons**: requires validation infrastructure. Reserved for production flows.

> 💡 **Recommendation for the program**: start with A. When you notice you're copy-pasting the same tag line 3 times, jump to B. You'll see C in later sessions when we talk about AI-assisted CI/CD.

### Complementary pattern · README-driven development

Simon Willison has popularized this pattern in *Agentic Engineering Patterns* (February 2026): **write the README/spec before asking the agent to implement**, with as much detail as you can, including edge cases. Then you ask the agent to implement *with red/green TDD* from the README.

It's essentially the same as SDD but more informal and applicable to any scope (a 50-line script, not just a formal change). Useful when OpenSpec is overkill.

---

## Anti-patterns you're going to see (and how to avoid them)

### 1 · The "vibe coding ride-along"

**Symptom**: you accept every plan and diff without reading them. The session moves fast. At the end of the day you have 3000 new lines you don't understand.

**Why it happens**: the flow is pleasant. The agent seems competent. The immediate feedback is positive (tests pass, build works).

**Why it's bad**: that code goes to production with your name on the commit. When something breaks, you won't know where to start debugging because you never had the mental model.

**Antidote**: the *"explain the plan in one sentence before approving"* rule. If you can't explain the plan to a colleague in one sentence, you don't understand it well enough.

### 2 · Over-prompting with hooks already active

**Symptom**: you have `PreToolUse` hooks that block rm -rf, and you still write in every prompt *"Please don't delete files without asking"*.

**Why it's bad**: the prompt takes up context. The hook already does the job. You're paying twice for the same guarantee.

**Antidote**: if an invariant lives in hooks, **don't repeat it in** [**CLAUDE.md**](http://claude.md/) **or in the prompt**. And vice versa.

### 3 · Trusting the initial plan without re-validating after Explore

**Symptom**: you request a plan cold, without the agent having explored first. The plan assumes false things about your codebase.

**Antidote**: always `Explore → Plan`. Never `Plan` without context. If the agent hasn't read code, its plan is fiction.

### 4 · The 6-hour zombie session

**Symptom**: you've been in the same session for 6 hours, switched tasks 4 times, and the agent starts forgetting things it knew at the beginning.

**Why it happens**: context rot (S1, the 50/70/90 rule).

**Antidote**: new tasks → new session. The investment of re-loading context via [CLAUDE.md](http://claude.md/) and skills is **far smaller** than the cost of dragging along contaminated context.

### 5 · MCP servers piling up unused

**Symptom**: you have 12 MCP servers configured. You only use 3.

**Why it's bad**: every server consumes tokens on every turn (the agent has to know the tools it exposes). You're paying for tools you don't use.

**Antidote**: `claude mcp list` periodically. Remove what you don't use. The new *MCP Tool Search* feature does lazy-loading; if your version supports it, enable it.

---

## Advanced context rot management

> S1 already covered the 50/70/90 rule (degrade / compact / reset). Here are the concrete operational tactics for real long sessions.

### Tactic 1 · Subagents for heavy exploration

If your first instinct is *"I'm going to read these 20 files"*, don't do it in the main session. Delegate to Explore. The main session receives the summary, not the 20 files.

### Tactic 2 · SessionStart hook with fresh context

Every new session, the hook injects:

```
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --oneline)"
echo "Open changes (OpenSpec): $(ls openspec/changes/ 2>/dev/null | head -5)"
git status --short | head -10
```

That saves you the first 3-4 turns of "where were we?".

### Tactic 3 · `/compact` with a specific hint

`/compact` on its own lets the agent decide what to summarize. Hints:

```
> /compact mantén el plan de la migración auth y los tests que ya pasan; descarta la conversación sobre el bug de logging que ya resolvimos
```

Result: the post-compact summary preserves exactly what's still useful.

### Tactic 4 · `/clear` when starting over is faster

If you've corrected the plan twice and it's still wrong: **/clear and rewrite the prompt**. It's almost always faster than continuing to negotiate with a context that's already corrupted.

> 💡 **Heuristic**: if you're 10+ turns in and feel like you're "fighting the agent", the context is probably contaminated. /clear, reload [CLAUDE.md](http://claude.md/) (automatic), rephrase the prompt incorporating what you've learned.

### Tactic 5 · Skills over one-shot instructions

Skills have a subtle property that [CLAUDE.md](http://claude.md/) doesn't: **they persist through auto-compact**. When the agent compacts, the invoked skills are re-injected (the first 5K tokens of each, within a shared 25K budget).

Implication: if an instruction **must survive compaction**, put it in a skill. If you only need it once, use a direct prompt.

---

## End-to-end case · Applying EPE to a real task in the program repo

Let's walk through the complete pipeline on a concrete task: adding a `GET /api/v1/users/active` endpoint that returns the users authenticated in the last 24 hours. The repo is the one from S2 (AdonisJS+React+OpenSpec).

### Prior setup (~30 seconds)

```
cd ~/proyectos/full-stack-adonisjs-master
git checkout alumno/tu-nombre-apellido
git pull
claude
```

### Phase 1 · Explore (~2 min)

Your first prompt doesn't ask for code. It asks for understanding:

```
> Antes de implementar nada, usa un subagent para investigar:
  1. Cómo está estructurado actualmente el módulo de users
     (controllers, models, validators, transformers).
  2. Cómo se está midiendo "actividad" del usuario hoy
     (campo en BD, middleware de tracking, logs?).
  3. Si hay algún endpoint similar (paginación, filtrado por fecha)
     del que podamos copiar el patrón.

Devuélveme un brief con findings + open questions.
```

The agent launches an Explore (Haiku, read-only). In ~2 minutes you have a summary like:

```
FINDINGS:
- Users en app/models/User.ts con last_seen_at (timestamp).
  Se actualiza en middleware app/middleware/track_activity.ts.
- Patrón de listado con filtros en UserController.list() — usa
  query builder de Lucid con .where('created_at', '>', ...).
- AccessTokenController tiene un patrón similar para tokens
  recientes — ver getRecentTokens().

OPEN QUESTIONS:
- ¿"Activos en 24h" significa last_seen_at > now-24h, o sesión
  iniciada en últimas 24h?
- ¿Devolver datos completos o sólo {id, name, last_seen_at}?
```

You answer those open questions. That closes the Explore phase.

### Phase 2 · Plan (~3 min)

You activate plan mode (Shift+Tab x2):

```
> Plan: añade endpoint GET /api/v1/users/active siguiendo el patrón
  de getRecentTokens. Filtro: last_seen_at > now-24h. Respuesta:
  {id, name, email, last_seen_at}. Auth: token requerido.
  Necesito test de integración que cubra el caso vacío y el caso
  con 3 usuarios mezclando recientes/antiguos.
```

The agent returns a structured plan:

```
1. Añadir método UserController.listActive() siguiendo patrón de
   AccessTokenController.getRecentTokens():
   - Validar auth en route guard
   - Query con Lucid: User.query().where('last_seen_at', '>', ...)
   - Map a UserTransformer (excluir password_hash, secrets)
2. Registrar ruta GET /api/v1/users/active en start/routes.ts
3. Test en tests/functional/users_controller.spec.ts:
   - Caso vacío
   - Caso con 3 users (2 activos, 1 antiguo)
4. Actualizar UserTransformer si hace falta exponer last_seen_at

Archivos afectados:
  app/controllers/UserController.ts (modificar)
  start/routes.ts (modificar)
  tests/functional/users_controller.spec.ts (modificar)
  app/transformers/UserTransformer.ts (verificar)
```

**Here's your real job**: read it. Does it match what you expected?

-   Does it follow the existing pattern? Yes (explicit getRecentTokens reference).
    
-   Does it exclude sensitive data? Yes (excludes password\_hash, secrets).
    
-   Does it cover the tests you asked for? Yes.
    

If everything's OK → **Yes, manually approve each tool call** (no auto-accept until you see how it behaves in this repo).

### Phase 3 · Execute (~5 min)

You exit plan mode (Shift+Tab). The agent implements file by file. You approve each Edit.

Hooks you have active (from lesson 2):

-   `PostToolUse` runs `npm run lint` every time a `.ts` file is edited (auto-format + lint).
    
-   `Stop` runs `npm test` on completion.
    

If the tests pass, the cycle ends with a summary from the agent:

```
✓ UserController.listActive implementado
✓ Ruta registrada
✓ 2 tests añadidos, ambos pasan
✓ Lint clean

Cambios listos para commit.
```

### Reflection on the complete cycle

Total time: ~10 min. Time if you had done it by hand: 30-45 min. But that's not the important metric. The metric is:

-   **Your cognitive load**: you focused on the *what*, not the *how*. You decided the endpoint's contract, you didn't write boilerplate.
    
-   **Auditability**: the plan is in the chat, the hooks left logs, the git diff is reviewable. If something goes wrong in a week, you can reconstruct why it was decided that way.
    
-   **Quality**: the tests exist because you explicitly asked for them in the plan. The pattern matches the rest of the codebase because Explore saw it.
    

That's the *real uplift* of a well-used copilot: not writing the same code faster, but **raising the level of abstraction at which you operate**.
