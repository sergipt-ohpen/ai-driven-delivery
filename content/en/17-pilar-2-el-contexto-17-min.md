# 📄  Pillar 2 — The Context 🔴 — 17 min | AI-Driven Delivery

⌛Estimated time: 17 min

> In 2026, context **is** the real bottleneck when working with AI copilots. This lesson gives you the discipline the industry calls *context engineering* — what to put in the window, what to leave out, how to organize it, and how to avoid the silent quality deterioration as the context grows.

## The foundational misunderstanding

When seniors start working with copilots, almost all of them go through the same naive phase:

> *"The model has 1M tokens of context. I'll throw in the whole repo, the docs, the open issues, the logs from the latest deployments, my Slack history from the last month... and let it figure it out."*

It sounds reasonable. It's exactly the opposite of what works.

**The 1M-token window is a ceiling, not a target.** The most relevant 2025 research on LLMs proves it: quality **degrades as context size grows**, long before filling it, **even on trivial tasks**.

## Context rot: the finding that changes practices

In July 2025, Chroma Research published *Context Rot: How Increasing Input Tokens Impacts LLM Performance*. They evaluated **18 frontier models** (GPT-4.1, Claude 4.x, Gemini 2.5, Qwen3, Llama 4...) on controlled tasks while progressively extending the context. Results:

-   **All models degrade** as tokens increase, without exception.
    
-   The degradation appears **long before the window is full** — in some models starting at 30-50% usage.
    
-   The degradation **is not uniform**: it depends on the similarity between the question and the "needle" being sought, on the presence of distractors, and on the structure of the haystack.
    
-   On tasks involving reasoning (not just literal retrieval), the drop is **even more severe**.
    

Add to this the earlier literature that remains valid in 2026:

-   **Lost in the Middle** (Liu et al., Stanford, TACL 2024): LLMs pay more attention to the beginning and end of the context. Key information in the middle can lose up to **30+ points of accuracy**.
    
-   **NoLiMa** (Adobe, February 2025): when the question requires semantic inference (not lexical matching), the degradation with long context is severe even in models designed for long-context.
    
-   **LOCA-bench** (HKUST-NLP, February 2026): context management strategies **raise success rates significantly more than model upgrades**.
    

### The three mechanisms that produce the rot

A synthesis of the literature (Chroma, Morph engineering, Anthropic docs):

1.  **Lost in the middle**: attention is biased toward the extremes of the context.
    
2.  **Attention dilution**: the quadratic complexity of attention means that 100k tokens produce 10,000M pairwise relationships. More tokens = more noise to filter.
    
3.  **Distractor interference**: similar but irrelevant content (another code fragment that looks alike but isn't the right one) confuses the model more than random noise.
    

### Observed practical rules

Although providers don't publish official thresholds, the 2026 senior consensus (Anthropic best-practices, Cursor blogs, Claude Code system prompts) converges on these heuristic rules:

-   From **~50% of the window**, performance starts to degrade noticeably.
    
-   From **~70%**, it's advisable to compact (`/compact` in Claude Code) or start a new session.
    
-   From **~90%**, agents start repeating work, losing coherence, and making silent errors.
    

> 💡 **Operational implication**: the metric that matters is **NOT** "how many tokens fit in my window", but "how dense with useful information is what I have in context **right now**". Context is actively curated, not passively accumulated.

## Types of context: what to put in, what to leave out

To make conscious decisions you need to distinguish **what types of context** exist. In 2026 this is the taxonomy that circulates most among seniors:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/ebf89709-269f-4123-a428-f7367bde79f4/569e1200cafaa525.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Anti-pattern**: including code "just in case". Every irrelevant file is noise that distracts the model and consumes budget. If you're not 80% sure the model needs a file, **don't include it** — let it discover it via Grep/Read if it needs it.

## Persistent context mechanisms: the file the agent always reads

Almost all modern tools support some kind of **persistent context file** that the agent reads at the start of each session. It's the equivalent of `.editorconfig` or `.eslintrc` for agents.

### The de facto standard: [AGENTS.md](http://agents.md/)

Launched by OpenAI/Codex in August 2025, donated to the **Linux Foundation (Agentic AI Foundation)** in December 2025 along with MCP. In less than a year:

-   **\>60,000 open source projects** adopted it.
    
-   Natively supported by **Cursor, Codex CLI, Devin, GitHub Copilot, VS Code, Gemini CLI, Jules, Windsurf, Cline, Amp, Factory** and more.
    
-   Open, multi-vendor specification.
    

Typical structure:

```
# AGENTS.md

## Project overview
Aplicación full-stack: FastAPI (backend) + React (frontend) + PostgreSQL.
Dockerizada. Todo el stack se levanta con `docker compose up`.

## Stack y versiones
- Python 3.12, FastAPI 0.115, SQLModel, Alembic
- TypeScript 5.x, React 19, TanStack Router/Query, Bun
- PostgreSQL 16
- Traefik (reverse proxy)

## Convenciones
- Backend: lógica de negocio en `services/`, NO en archivos de rutas.
- Frontend: cliente API auto-generado desde OpenAPI — NO escribir fetch a mano.
- Tests: pytest backend, vitest frontend. Test-first para endpoints nuevos.
- Migraciones: Alembic con autogenerate, revisar siempre antes de aplicar.

## Comandos clave
- `just dev`: levantar todo el stack en local
- `just test`: correr toda la suite de tests
- `just lint`: ruff + ESLint + tipo-check

## Gotchas
- El repo viene con `.env` (no `.env.example`). Renombrar a `.env.example`
  antes de pushear cualquier cosa.
- Hot-reload del frontend requiere `compose.override.yml` activo.
- NO introducir dependencias nuevas sin justificarlas en el PR.
```

### Comparison of mechanisms

![image.png](https://media1-production-mightynetworks.imgix.net/asset/0298ba33-594c-40a1-8be5-4735e06a570f/02fe4382c7538d93.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Emerging pattern in 2026**: a single `AGENTS.md` as the **single source of truth**, referenced from vendor-specific files. E.g.: `CLAUDE.md` consists of a single line `@AGENTS.md` that imports the content. That way you maintain multi-agent portability without duplication.

### Best practices for the file's content

A synthesis of Anthropic best-practices, alexop.dev, and the community's `claude-code-best-practice` repo:

1.  **Minimal and high-signal**: if you include obvious things, the model ignores them along with what's important. Start with a "Gotchas" section — what deviations from default behavior it needs to know.
    
2.  **Key commands**, not the entire documentation. The model can read the docs by running `just --list`.
    
3.  **Explicit conventions**: "X YES, Y NO". Negative rules work just as well as positive ones.
    
4.  **Versioning**: stale instructions are worse than no instructions. If you update the FastAPI version, update the file.
    
5.  **Deterministic hooks, not instructions**: if you want `Co-Authored-By: Claude` to NEVER be added, put it in `settings.json` as a hook, not in `AGENTS.md` as a wish. Whatever can be automated should not live in natural language.
    

## The 4 canonical context engineering strategies

LangChain (Lance Martin) and Anthropic published in 2025 the framework that has become the reference. Four verbs:

### 1\. Write — persist outside the context

Move information you don't need this turn **to disk**. Let the agent load it when it needs it.

-   Session notes in `.md` files that the agent can read later.
    
-   Semantic memories (Cline Memory Bank, Cursor memories, Claude Code memory tools).
    
-   Intermediate results saved as artifacts that can be referenced by path.
    

### 2\. Select — choose what to bring into the context

Faced with a large repo, **don't put everything in**. Select dynamically.

-   **Agentic search**: the agent decides which files to read (iterative Grep/Glob/Read). This is Claude Code's approach.
    
-   **Semantic repository indexing**: embeddings + tree-sitter (Cursor, Cline optional). Faster, but introduces noise due to imperfect embeddings.
    
-   **2026 trend**: agentic search is gaining ground over static RAG for coding, because embedding-based retrieval degrades when code changes fast.
    

### 3\. Compress — summarize before continuing

When the context approaches 70%, don't keep accumulating: **compact**.

-   `/compact` in Claude Code: the agent summarizes the conversation down to its essence and restarts with less overhead.
    
-   Native auto-compaction in Claude Code, Cursor, Cline.
    
-   Manual pattern: ask the agent to write a summary of "current state of the work + decisions made + next step" and start a new session with that summary.
    

### 4\. Isolate — isolate context per subagent

The most powerful technique against context rot in 2026: **subagents with their own context window**.

-   **Claude Code sub-agents**: you spawn a specialized agent (e.g. "explore which files touch auth") in its own isolated context. The verbose conversation stays there; only the **conclusion** returns to the main thread.
    
-   **Cursor Background Agents**: up to 8 agents in parallel on clones of the repo, each with its own context.
    
-   **Git worktrees + parallel agents**: the equivalent manual technique — you split the work into branches, run one agent per branch, merge the results.
    

> 💡 **Key insight**: the sub-agent is the most effective way to "scale context" without paying the price of rot. If your main task would fit in 200k tokens **without the prior exploration**, don't put the exploration in the same context: do it in a sub-agent that returns only the 2k-token findings.

## Current context windows (April 2026 snapshot)

Confirming what you saw in the pre-course, the ~1M token convergence holds:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/74ceb89d-176b-4686-8bd3-c546d4205a92/1a413d8ec70e1f4e.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ Reminder: these are **physical ceilings**, not targets. Context rot starts much earlier.

## Your context engineering kit

If you had to take away only five operational practices from this lesson:

1.  **Create a minimal, high-signal** `AGENTS.md` in every repo. Keep it under 200 lines. Refresh it when conventions or versions change.
    
2.  **Curate, don't accumulate**: when you start a task, consciously decide what the agent needs to read. Resist the "just in case" temptation.
    
3.  **Use sub-agents for context-expensive subtasks** (codebase exploration, bug hunting, stack trace investigation). The verbose conversation should NOT live in the main thread.
    
4.  **Compact or restart every 15-20 turns** in an agentic session. The loss of coherence is empirically noticeable from there on.
    
5.  **Treat the persistent context file like code**: PR review, versioning, tests (if your team is serious, add an `AGENTS.md` linter).
    

> 📚 **Resources to go deeper into this pillar**: they are unified in **lesson 5 — Additional resources**, in the "Pillar 2 — Context" section. There you'll find the readings, research papers, and the official [AGENTS.md](http://agents.md/) spec.

> **Next lesson**: pillar 3 — The Prompt. You'll see what from classic prompt engineering remains valid, what became obsolete with reasoning models, and the anatomy of a technical prompt a senior dev would write in 2026 — and then how it all comes together in a single decision framework.
