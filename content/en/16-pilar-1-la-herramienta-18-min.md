# 📄  Pillar 1 — The Tool 🔴 — 18 min | AI4Devs 2026/06 Seniors

Estimated time: 18 min

> In the pre-course you already saw the ecosystem of assistants and MCP. Here we're not going to repeat what Claude Code is or what Cursor is. We're going to the next level: **when to choose each category, what criteria to use, and how to avoid the most common trap — thinking that "better model" means "better tool"**.

## The right question is not "which tool do I use?"

The right question is: **"what type of task am I going to do, and what level of human control do I need?"**. The tool falls out as a consequence. If you do this backwards (choose the tool first and then look for tasks for it), two predictable things happen: you use the tool poorly and blame the bad result on the AI.

This lesson gives you the mental model to invert the order.

## 2026 taxonomy: four categories by mode of use

Beyond the underlying model, copilots differ in **where they live and how you interact with them**. These are the four canonical categories in 2026:

### Category A — IDE-integrated (visual + inline diff)

Lives inside your editor (VS Code, JetBrains, Xcode, Neovim). Its unit of work is **the cursor**: inline completions, multi-file edits via prompt in a side chat, refactors with visual diff.

-   **Representatives**: Cursor, GitHub Copilot, Windsurf, Cline, [Continue.dev](http://continue.dev/), Zed AI, JetBrains AI Assistant.
    
-   **Interaction mode**: edit-as-you-go. You write, the model suggests; you prompt, the model edits and shows a diff; you accept/reject.
    
-   **Tolerable latency**: <500ms for autocomplete, seconds for chat.
    
-   **Best for**: iterative work within one file or a small feature, guided exploration, visual refactors.
    

### Category B — Terminal/CLI agentic

Lives in the terminal. Its unit of work is **the task**: you describe something, the agent plans, executes with tools (Read, Edit, Bash, Grep...), and comes back with results.

-   **Representatives**: Claude Code, Codex CLI (OpenAI), Aider, OpenCode, Gemini CLI, Copilot CLI (GA February 2026), Cline CLI.
    
-   **Interaction mode**: plan-then-execute. You describe the goal, the agent works for minutes, you review the result (often a commit or a PR).
    
-   **Tolerable latency**: minutes per task is acceptable.
    
-   **Best for**: multi-file refactors, scripts, pipelines, exploring an unfamiliar codebase, parallel work via tmux/git worktrees.
    

### Category C — Standalone autonomous agents (cloud)

Lives in the cloud. Its unit of work is **the ticket**: you assign it a Jira/Linear/GitHub issue, it executes autonomously, and returns a PR.

-   **Representatives**: Devin (Cognition), Cursor Background Agents, GitHub Copilot Coding Agent, Jules (Google), AWS Q Developer agent.
    
-   **Interaction mode**: supervised fire-and-forget. You specify, the agent works while you do something else, you review the PR.
    
-   **Tolerable latency**: hours.
    
-   **Best for**: well-specified tasks, massive parallelization, asynchronous work outside working hours.
    

### Category D — Specialized

They solve a specific sub-problem of the SDLC: review, search, security, automated refactoring.

-   **Representatives**: Copilot Code Review (60M accumulated reviews), Bugbot (Cursor), Greptile, Sourcegraph Cody, [Refact.ai](http://refact.ai/), [Sweep.dev](http://sweep.dev/), Augment, Tabnine.
    
-   **Interaction mode**: pipeline. They plug into your flow (PRs, CI, IDE) and operate in the background.
    
-   **Best for**: adding capabilities to your existing pipeline without changing your main tool.
    

> 💡 **Pattern observed among seniors in 2026**: a hybrid stack. An IDE-integrated editor for inline + chat (category A), a terminal agent for refactors and planning (category B), and a specialized tool for code review (category D). Only extreme parallelization cases add category C. **It's not an exclusive choice — it's a tool architecture.**

## A difference that is NOT about category: completion vs agentic

Within category A itself you can operate in two very different modes:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/d1ad3b6c-1db8-45cb-85a3-940bdb89ed71/8874385a964b99b9.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Key architectural decision**: when you switch modes. As a practical rule:

-   If the task fits **within a function or a couple of related files** → completion + side chat.
    
-   If the task **touches layers (model + service + endpoint + test)** → agentic.
    
-   If the task **requires running commands** (migrations, builds, tests) → agentic is mandatory.
    

Confusing the modes is one of the most expensive anti-patterns: using agentic for something trivial (unnecessary overhead, contaminated context) or using completion for something multi-file (you end up with inconsistent code across files).

## Decision matrix: five practical criteria

When a senior dev in 2026 chooses a tool, they don't rely on benchmarks: they rely on five practical criteria. This is the matrix I recommend internalizing:

### Criterion 1 — Codebase size and shape

![image.png](https://media1-production-mightynetworks.imgix.net/asset/58eb9bb5-4f27-42c9-a560-4952858295ac/6c7f8471ccd60a32.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Criterion 2 — Primary language

-   **Python / JavaScript / TypeScript**: any tool. Most models are over-trained on these languages.
    
-   **Rust / Go / systems**: Claude Code and Zed show better type handling in independent research.
    
-   **Java / Kotlin / .NET**: GitHub Copilot, JetBrains AI Assistant, Amazon Q (especially for .NET → AWS).
    
-   **Niche languages** (Elixir, Clojure, OCaml, Erlang): tools with BYOK + a reasoning model (Aider/Cline/OpenCode + Opus 4.7 or GPT-5.4).
    
-   **Frontend (React/Vue/Svelte)**: any; specialized tools like v0 or Lovable for quick UI.
    

### Criterion 3 — Privacy and compliance policy

-   **Code can go out to public APIs**: any tool.
    
-   **Code cannot leave** (banking, healthcare, defense): Cline or Aider with local models (Llama 3.x, Qwen3, DeepSeek), Tabnine on-prem, Cursor Privacy Mode with Business+, Amazon Q in an AWS VPC, Claude Code via Bedrock or Vertex.
    
-   **Mandatory auditing of every interaction**: GitHub Copilot Enterprise, Cursor Business+, Claude Code Team with audit logs.
    

### Criterion 4 — Budget

![image.png](https://media1-production-mightynetworks.imgix.net/asset/af5f93b1-9ecd-4988-a4d9-0cb60adb898e/aaa01c149f1cff92.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Figure to watch**: GitHub Copilot announced on April 22, 2026 that it is moving to *usage-based billing* on June 1, 2026 (1 AI credit = $0.01) and paused Pro/Pro+ signups. If you're reading this after June, the figures above may be outdated — go to `docs.github.com/copilot/billing`.

### Criterion 5 — Developer style

-   **Visual / inline-driven** (you write and accept suggestions): IDE-integrated.
    
-   **Plan-driven / refactor-heavy** (you think through the architecture, execute in blocks): CLI agentic.
    
-   **Async / multitasking** (you assign and supervise): cloud autonomous.
    
-   **Terminal power user**: any of the previous three except the IDE-only ones.
    

## Models available within the tools (April 2026 snapshot)

With the post-2025 consolidation, almost all tools are **multi-model**. Access to the top model no longer determines the tool — the tool determines the harness:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a5a5e9b9-baed-4ea7-9411-29896cac6d35/23afdedd85f3b3a9.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Implication**: in 2026, the question "does this tool use the best model?" is almost always answered "yes, with the appropriate subscription". The real difference is in the harness: how the model accesses tools, how it manages context, what workflows it supports.

## Benchmarks: how to read them without fooling yourself

If you're going to compare tools via public benchmarks, **read these four and discard the rest**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/65b563e3-d5a4-4bdc-9c0b-3039758e8f12/8e1677f8467cc1e4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Common trap**: comparing SWE-Bench Verified scores across vendors. Most are self-reported with their own scaffolding. If Vendor A reports 87% and Vendor B reports 85%, the difference is probably more harness than model. For honest comparisons: [vals.ai](http://vals.ai/), [SWE-rebench](https://swe-rebench.com/), [Aider leaderboards](https://aider.chat/docs/leaderboards/).

## The final decision framework

Put the five criteria together and apply this tree:

```
1. ¿La tarea cabe en una función o cae en un archivo?
   → Completion (IDE-integrated, modo Tab)

2. ¿Toca varios archivos / capas?
   ¿Necesitas ejecutar comandos?
   → Agentic.
       2a. ¿Codebase grande o tarea larga?      → CLI agentic (Claude Code, Codex CLI)
       2b. ¿Refactor visual / iteración rápida? → IDE-integrated agentic (Cursor Composer, Windsurf Cascade)
       2c. ¿Async / paralelizable?              → Cloud autonomous (Devin, Background Agents)

3. ¿Cumples política de privacidad?
   → Si NO: filtra a herramientas con modelo local o VPC.
   → Si SÍ: aplica criterio de presupuesto.

4. ¿Estilo del dev encaja con la categoría?
   → Si NO: cambia categoría aunque la herramienta sea "mejor en benchmark".
```

## Documented anti-patterns in tool selection

1.  **"I have Copilot because the company pays for it, I don't need anything else"** — confusing availability with fitness. Copilot Pro is excellent for completion + edit; for long agentic refactors, other categories are better.
    
2.  **"Model X.7 just came out, I'm switching tools"** — confusing model with harness. Most top tools will give you access to model X.7 within days.
    
3.  **"I only use open source tools on principle"** — valid, but you take on the cost of a less polished harness. Cline, Aider, OpenCode are mature but require more manual context engineering.
    
4.  **"I try every tool to find the best one"** — eternal evaluator syndrome. The real learning curve is in the context and the prompt, not in switching tools every month.
    
5.  **"I pay $200 for the Max plan, I should be able to use it for everything"** — paying more doesn't make up for choosing the wrong category. The Max plan in the wrong mode still produces bad results.
    

---

## The actionable takeaways from this lesson

1.  **Don't memorize comparisons**: the ecosystem changes monthly. Memorize the **taxonomy (categories A/B/C/D)** and the **5 decision criteria**. That transfers.
    
2.  **Identify your current stack** and verify that it covers the three categories a senior dev needs (A, B, D). If you're missing one, you know what to evaluate.
    
3.  **The top model is almost always available** — the difference between tools in 2026 is in the harness, not the underlying model.
    
4.  **Before switching tools, ask yourself**: is it a tool problem or a problem with how I use it? Most "problems with AI" are pillar 2 (context) or pillar 3 (prompt) problems, not pillar 1.
    

📺 **Recommended resource (8 min, English):** [Claude Code & Cursor built the same app. There's a clear winner.](https://www.youtube.com/watch?v=aRNVncOYd5c) — same project, same prompts, a direct comparison with the criteria applied to a concrete case. (Illustrative video, not mandatory.)

📖 **Short reference reading (10 min, English):** [Birgitta Böckeler — Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — a Thoughtworks article on how to configure a coding agent's context: [AGENTS.md](http://agents.md/), memory, and tools. Published in February 2026.

> **Next lesson**: pillar 2 — The Context. You'll understand why the 1M-token window is a ceiling and not a target, what *context rot* is, and why [AGENTS.md](http://agents.md/) is becoming the `.editorconfig` of agents.
