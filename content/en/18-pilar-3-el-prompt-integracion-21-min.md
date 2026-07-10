# 📄  Pillar 3 — The Prompt + Integration 🔴 — 21 min | AI4Devs 2026/06 Seniors

⌛Estimated time: 21 min

> In this final lesson we cover pillar 3 — The Prompt — and then close by integrating the three pillars into a single decision framework you'll apply in the live session. You'll see why classic prompt engineering is being reclassified, not eliminated, and how tool + context + prompt fit together into a coherent architecture.

---

## Part 1 — The Prompt pillar

### The "prompt engineering" misunderstanding

During 2023–2024, "prompt engineering" was sold as the magical skill of writing the perfect incantation. Courses and templates sprang up, along with the belief that adding *"think step by step"* or *"you are an expert software engineer"* multiplied the quality of the output.

In 2026, **that's no longer true** — at least not for coding with reasoning models. The reason: the top models (Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro Deep Think) have an **adaptive thinking budget**: they decide for themselves how much to reason before responding. Telling them "think step by step" can be noise or, worse, counterproductive.

Anthropic says it explicitly in its official 2026 guide: *"the best prompt isn't the longest or the most complex. It's the one that reliably achieves your goal with the minimum necessary structure."*

### What from classic prompt engineering remains valid

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e96ad7b9-8256-4250-8ef4-56560f3e8b8a/81501ab79b08f0c5.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### The anatomy of a technical prompt in 2026

A convergence of Anthropic best-practices, the OpenAI Cookbook, and Codex [AGENTS.md](http://agents.md/) guidance:

```
1. CONTEXTO/ROLE  (corto, solo si añade restricciones reales)
   "Estás trabajando en un backend FastAPI con SQLModel."

2. OBJETIVO / TAREA  (orientado a outcome, no a steps)
   "Implementa el endpoint POST /items que cree un Item asociado al usuario actual."

3. CRITERIOS DE ÉXITO EXPLÍCITOS  ← lo más alto-leverage según Anthropic
   "Sabes que terminaste cuando:
    - El endpoint pasa los 3 tests de tests/test_items.py
    - Mantiene la convención repository-pattern del resto del código
    - No introduce nuevas dependencias"

4. RESTRICCIONES / ANTIPATTERNS  (qué NO hacer)
   "No metas lógica de negocio en el archivo de rutas.
    No introduzcas migraciones nuevas — el modelo Item ya existe."

5. RECURSOS / CONTEXTO  (referencias, no copy-paste)
   "Mira services/users.py como ejemplo del patrón a seguir.
    Las convenciones generales están en AGENTS.md."

6. FORMATO DE SALIDA  (cuando aplique)
   "Genera un PR con título 'feat: add POST /items endpoint',
    descripción que liste los archivos tocados, y commits atómicos."

7. CLARIFICACIÓN  (siempre que el espacio de soluciones sea ambiguo)
   "Si tienes dudas sobre el shape del payload, pregunta antes de implementar."
```

> 💡 **The highest-leverage change according to Anthropic**: adding **explicit success criteria**. The difference between "implement the endpoint" and "implement the endpoint that makes these 3 tests pass" is enormous in first-pass acceptance rate.

### Documented anti-patterns

1.  **Vagueness** — *"build me a dashboard"*. Generic output, lots of back and forth. It costs more turns than writing the prompt well once.
    
2.  **Micro over-specification** — listing step-by-step instructions for something trivial. Reasoners **lose recall** when you constrain them excessively (Anthropic noted this explicitly for Opus 4.7: instructions like "be conservative" reduce reported recall despite the same depth).
    
3.  **Gigantic megaprompt** — cramming conventions, code, examples, constraints, everything into every turn. It confuses, consumes context. **Anthropic anti-principle**: *"the best prompt isn't the longest or most complex"*.
    
4.  **Not providing success criteria** — the model delivers what it thinks you want, not what passes the tests. Result: PRs that "look fine" but fail in CI.
    
5.  **Mixing several tasks into a single turn** — split into chained sub-prompts. If you need to do A, then B based on A's result, don't put everything together.
    
6.  **Re-pasting the** [**AGENTS.md/CLAUDE.md**](http://agents.md/CLAUDE.md) **inline in every prompt** — it's already loaded by the tool. It only adds noise.
    

### Coding-specific patterns (in order of impact, 2026)

### 1\. Spec-driven development (preview of S2)

Writing the **specification first** in markdown — what is being built, what inputs/outputs, what edge cases — and only then asking the agent to implement. It's the evolution of "vibe coding" according to Karpathy and GitHub (spec-kit, Aug 2025). We cover it in depth in S2; here we only flag it as the highest-leverage pattern.

### 2\. Plan-then-execute

`/plan` or Plan Mode: you ask the agent NOT to touch state, only to read and propose a plan; you review; it executes with a cheaper model.

-   Native in Claude Code (`/plan`), Cline (Plan vs Act mode).
    
-   Emerging pattern in Cursor and Windsurf.
    
-   Lets you use Opus 4.7 for planning (expensive but brilliant) and Sonnet 4.6 for execution (cheaper).
    

### 3\. Test-first prompting

Asking for tests first, then implementation, then running the tests, iterating until green.

```
"Antes de implementar el endpoint, escribe los tests que validan
los criterios de éxito. Luego implementa hasta que todos pasen."
```

Aider supports it natively; Claude Code formalizes it with the Writer/Reviewer pattern.

### 4\. Anchored refactoring

The "one-shot 3000 LoC refactor" antipattern produces massive regressions. The correct pattern:

1.  **Map first**: ask the agent to identify symbols, dependencies, and risks, without touching code.
    
2.  **Human approval of the map**.
    
3.  **Execution in reversible steps** with intermediate commits.
    

### 5\. Critic loops / self-review

Using a second model (sometimes the same model in a separate session) to review the first one's output. Anthropic documents the Writer/Reviewer pattern; it circulates among seniors as *"Claude Code finds bugs that another Claude Code introduced"*.

### Recent research on prompting with reasoners

-   **arXiv 2506.04210** — *"Does Thinking More always Help?"*: extending thinking with "wait, rethink" works, but **multiple independent reasoning paths + majority vote** beats longer thinking by 20%. **Implication**: parallelizing (independent sub-agents) beats "thinking harder".
    
-   **arXiv 2510.21413** — *Context Engineering for AI Agents in Open-Source Software* (Oct 2025): an empirical analysis confirming that context and harness decisions explain far more variance than the prompt itself.
    
-   **OpenAI Cookbook 2026**: explicit guidance NOT to add CoT to GPT-5.x; use `effort` levels (low/medium/high) as the main dial.
    

### Your prompting kit

If you had to take away five operational practices from this section:

1.  **Start with the outcome and the success criteria**, not the steps. Let the model decide how.
    
2.  **Explicit constraints** ("don't introduce new dependencies", "keep pattern X"). Constraints shrink the space of bad solutions.
    
3.  **Ask for clarification when there's ambiguity**: add *"if you have doubts about X, ask before implementing"*. It saves you rework.
    
4.  **For reasoners: short, direct prompts**. If you find yourself writing a megaprompt, stop and scale back.
    
5.  **Try 0-shot before few-shot**. Half the time the examples are unnecessary.
    

---

## Part 2 — Integration: how the 3 pillars complement each other

### The combined decision framework

You now have the three pillars separately. Now comes the operational question: **how do you simultaneously decide tool + context + prompt for a specific task?**

This is the decision tree I recommend adopting:

```diagram
Paso 1: CARACTERIZA LA TAREA
├── ¿Toca un solo archivo o varios?
├── ¿Necesita ejecutar comandos (build, tests, migrations)?
├── ¿Codebase conocido o exploración?
└── ¿Time-budget alto o bajo?

Paso 2: ELIGE HERRAMIENTA (Pilar 1)
├── Tarea pequeña / inline       → IDE-integrated en modo completion
├── Tarea multi-archivo / refactor → CLI agentic o IDE-integrated agentic
└── Tarea async / paralelizable  → Cloud autonomous

Paso 3: PREPARA CONTEXTO (Pilar 2)
├── ¿AGENTS.md actualizado?
├── ¿Qué archivos meto explícitamente vs dejo descubrir?
├── ¿Necesito sub-agent para exploración previa?
└── ¿Estoy bajo el ~50% de la ventana?

Paso 4: ESCRIBE EL PROMPT (Pilar 3)
├── Objetivo claro orientado a outcome
├── Criterios de éxito explícitos
├── Restricciones / antipatterns
├── Referencias a docs/archivos clave
└── "Pregunta si hay ambigüedad"

Paso 5: EJECUTA Y REVISA
├── Si es plan-driven: revisa plan antes de aprobar ejecución
└── Si es test-first: verifica tests antes de implementación
```

### Canonical cases: combined application

### Case A — Large refactor (moving logic from route files to services)

> **Applied to the master's project**: the master's repo has logic directly in route files (mentioned in the `REPORT.md`). This is exactly this case.

-   **Pillar 1 — Tool**: CLI agentic (Claude Code or Cursor Composer). Reason: multi-file refactor, need to run tests between steps.
    
-   **Pillar 2 — Context**: `AGENTS.md` with the repository-pattern convention. A sub-agent that first explores which endpoints have inline logic. Dependency map before touching anything.
    
-   **Pillar 3 — Prompt**: plan-then-execute. First `/plan`: "identify all the endpoints that have inline business logic and propose a migration order". Then execution in blocks with atomic commits.
    

### Case B — Greenfield feature (adding a notifications endpoint)

-   **Pillar 1**: IDE-integrated agentic (Cursor Composer / Claude Code). Either works.
    
-   **Pillar 2**: [AGENTS.md](http://agents.md/) + `services/users.py` as a pattern reference. No sub-agent (contained task).
    
-   **Pillar 3**: spec-driven (S2 preview) or test-first. Success criteria = passing tests + endpoint documented in OpenAPI.
    

### Case C — Debugging (a test fails intermittently)

-   **Pillar 1**: CLI agentic with Bash access to run tests repeatedly.
    
-   **Pillar 2**: the failing test + the code under test + recent logs. Do **NOT** include the whole repo. Sub-agent if the trace requires exploring history.
    
-   **Pillar 3**: a prompt with explicit hypotheses ("is it a race condition? is it shared state?"). Success criterion = the test passes 10 times in a row.
    

### Case D — Exploring an unfamiliar codebase

-   **Pillar 1**: CLI agentic with good agentic search (Claude Code).
    
-   **Pillar 2**: an **explorer sub-agent** is critical here. The "where is X? read me Y" conversation should live in a sub-agent, NOT in the main thread.
    
-   **Pillar 3**: an output-oriented prompt ("generate a map of the auth-related endpoints and give me a 1-paragraph summary").
    

### Case E — Code review

-   **Pillar 1**: specialized (Copilot Code Review, Bugbot) or an agent with a review prompt.
    
-   **Pillar 2**: the diff + [AGENTS.md](http://agents.md/) with the project's conventions. Do NOT include the whole repo.
    
-   **Pillar 3**: a prompt with an explicit checklist: conventions, tests, edge cases, performance, security. Rules in the positive and the negative.
    

### Combined anti-patterns (the most expensive of all)

1.  **Megaprompt + whole repo in context + top model**: confusing "more is better" with effectiveness. Result: expensive tokens, low quality, immediate context rot.
    
2.  **Powerful agentic tool + no** [**AGENTS.md**](http://agents.md/) **+ vague prompt**: the agent improvises conventions that aren't yours. It generates code inconsistent with the rest of the project.
    
3.  **Switching tools every week** while the context and the prompts don't improve: the variance in results is in pillars 2 and 3, not in pillar 1.
    
4.  **Test-first prompt with a cloud autonomous agent** without having tried locally first: 30 minutes later you find yourself with a PR failing CI over something you would have caught in the first turn.
    

### The meta-insight of the 3 pillars

If the pillars operate at the same order of magnitude of impact, the practical question is: **which one am I weakest in right now?**

-   If your output with AI is **inconsistent with your project's conventions** → your bottleneck is in pillar 2 (context). Improve [AGENTS.md](http://agents.md/).
    
-   If the outputs are **correct but don't solve the real task** → your bottleneck is in pillar 3 (prompt). Define the success criteria better.
    
-   If the tool feels **structurally inadequate** (wrong working mode) → your bottleneck is in pillar 1 (tool). Reconsider the category.
    

Most seniors enter the master's program thinking their bottleneck is pillar 1 (the tool). Most discover during the program that it was pillar 2.

---

## Part 3 — Glossary and wrap-up

### Quick glossary (reference for the live session)

-   **Harness / Scaffolding**: the scaffolding surrounding the model (tools, instructions, sensors, constraints). The "car" around the "engine" (the model).
    
-   **Context Engineering**: the discipline of managing what information the model has in its window at each moment.
    
-   **Context Rot**: the quality degradation observed as tokens in context increase, before filling the window.
    
-   [**AGENTS.md**](http://agents.md/): a persistent context file, the de facto standard since 2025–2026, supported by most tools.
    
-   **Sub-agent**: an agent with its own context window, spawned for a subtask, whose conclusion returns to the main thread.
    
-   **Plan Mode**: a mode where the agent does NOT touch state, only reads and proposes a plan. Human approval before executing.
    
-   **Adaptive thinking**: a reasoning model's ability to decide how much to reason before responding, rather than applying fixed CoT.
    

### What to bring mentally to the live session

1.  **The 3-pillar framework internalized** — tool, context, prompt — as co-equal layers, not hierarchical ones.
    
2.  **The decision tree** you saw in part 2 of this lesson: characterize the task → choose the tool → prepare the context → write the prompt → execute.
    
3.  **The context thresholds rule**: at 50% degradation starts, at 70% compact, at 90% reset.
    
4.  **The idea that "the model is not the bottleneck"** — the harness, the context, and the prompt explain more variance than the model version.
    

> **Final note**: in S2 we'll go deep into the highest-leverage pattern we only mentioned here — *Spec Driven Development*. It's the natural evolution of the PROMPT pillar and the best investment a senior dev can make in 2026. But what you learned here is the foundation without which S2 doesn't work.

> 📚 **Resources to go deeper**: all the async resources (readings, papers, official documentation, references by pillar) are unified in **lesson 5 — Additional resources**. There you'll find material organized by pillar to explore further after the live session.
