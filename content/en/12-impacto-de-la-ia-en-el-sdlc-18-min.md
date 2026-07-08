# 🎥 AI's Impact on the SDLC 🔴 — 18 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 18 min

> So far you've seen data about the market, the developer role, and the tool ecosystem. Now comes the map: **how AI changes each phase of the Software Development Life Cycle (SDLC)**, which tools operate in each one, and where each topic is covered across the master's 16 sessions. This lesson is your mental map of the program.

## The SDLC phases (and why it matters to see them all)

When we think about "AI for developers," the reflex is to think of *code generation*. But that's only one of the points where AI changes the craft. A senior's day-to-day covers much more:

-   **Requirements analysis**
    
-   **System design and data model**
    
-   **High-level documentation and specifications (user stories, tasks)**
    
-   **Implementation**: infra, backend, frontend, DB; bug fixing, refactoring, security
    
-   **Test generation**: unit, E2E, integration
    
-   **Change documentation and code reviews**
    
-   **Deployments**
    
-   **Monitoring and observability**
    

Each of these phases has changed in the last 18 months. Let's go through the ones with the greatest impact.

## How each SDLC phase changes with AI

![image.png](https://media1-production-mightynetworks.imgix.net/asset/aa45ddda-80e6-4aa7-8070-c190fba7abe5/30a7cc7ddf4eef4f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Reading the map**: each cell in the "Master session" column is where we dive deep into that phase. If one session sparks more curiosity than another, that's a good sign — it means you've already identified your priority lever.

## The L1–L5 framework: autonomy levels

To understand which tool to use in each phase, the industry adopted a **5-level autonomy** framework (popularized in 2024–2025; used by Swarmia, Vellum, AWS, and others). It's not an IEEE standard, but it is the most widely used pragmatic taxonomy.

> 🚨 **Important note**: different vendors use slightly different variants (Vellum uses L0–L5, AWS talks about 4 levels). Take it as a **widely used practical framework**, not a universal law.

### L1 — Code autocompletion

Inline token/line suggestions in the editor. The human accepts or rejects each suggestion.

**Representative tools (April 2026)**:

-   **GitHub Copilot completions** — the pioneer, still the leader in enterprise adoption.
    
-   **Supermaven** — acquired by Cursor in **November 2024**; the standalone product was retired in late 2025.
    
-   **Tabby** — open source alternative for self-hosting.
    
-   **Codeium / Windsurf inline** — the Codeium legacy now inside the Windsurf ecosystem.
    

### L2 — Task-level generation

The human describes a task; the AI produces a coherent block. The human verifies.

**Representative tools**:

-   **ChatGPT,** [**Claude.ai**](http://claude.ai/)**, Gemini** — chat with code.
    
-   **aider** — open source CLI tool for code editing via LLM.
    
-   **Cursor Chat inline, GitHub Copilot Chat** — chat inside the editor.
    

### L3 — Coding agents (in context)

The agent executes multiple steps (read/edit/test) under supervision, with a full paper trail in Git.

**Main tools**:

-   **Cursor Composer / Cursor 2.0** — multi-agent UI with up to 8 parallel agents in isolated git worktrees.
    
-   **Claude Code** — CLI agent with `CLAUDE.md` for persistent context. Officially supports GitHub Actions since September 2025.
    
-   **GitHub Copilot Workspace + coding agent** — launched May 2025; **\>1M PRs authored in 5 months** (Octoverse 2025).
    

### L4 — From specifications to production

Full-stack build-from-prompt with DB, auth, deploy. You can go from "I want an app" to "it's deployed" without touching code directly.

**Representative tools**:

-   **Bolt.new (StackBlitz)** — in-browser generation with WebContainers.
    
-   **Lovable** — full-stack MVPs with auth and DB; went from USD 0 to USD 100M+ ARR in 8 months.
    
-   **v0 (Vercel)** — React/Next.js components from text or images.
    
-   **Replit Agent 3** — autonomous for up to 200 minutes with its own tests.
    
-   **Pythagora** — all-in-one platform with specs, React frontend, Node backend.
    

### L5 — Autonomous teams / agents

Multiple agents, long-term planning, independent decisions. **The current frontier**.

**Main tools**:

-   **Devin (Cognition)** — the only L5 agent with demonstrable massive enterprise adoption. Goldman Sachs, Citi, Dell, Cisco, Palantir, Nubank, Mercado Libre, Ramp use it in production.
    
-   **GitHub Agent HQ (February 2026)** — orchestrates Copilot, Claude Code, and OpenAI Codex as assignable agents from the same GitHub issue.
    
-   **Cursor 2.0 multi-agent** — up to 8 parallel agents in git worktrees.
    
-   **MetaGPT** — open source multi-agent coordination framework.
    

### Real enterprise data (Devin, Jan 2026)

Cognition published Devin's metrics in its *2025 Performance Review*:

-   **67% of PRs merged** (vs. 34% in 2024).
    
-   **4x faster and 2x more efficient** than the previous year.
    
-   **5–10% of total dev time** saved on security remediation.
    
-   **Test coverage** rising from 50–60% to 80–90% in projects where it's applied.
    
-   **Migrations at a 10–14x factor** vs. human development (Oracle reports 14x faster on Java migrations).
    

> ⚠ **Reality vs. Hype**: although L5 sounds futuristic, **27% of organizations trust fully autonomous agents** according to Capgemini 2025 (vs. 43% a year earlier). The trust curve inverts with maturity. Devin excels at junior tasks (migrations, tests, simple bugs) but **requires human supervision for architecture and design decisions**.

## Alternative frameworks (in case you see them elsewhere)

-   **Vellum (Dec 2025)**: L0 (Rule-Based) → L5 (Fully Creative).
    
-   **AWS staged autonomy**: 4 levels (Predefined → Dynamic → Partially → Fully autonomous). Most of prod at levels 2–3.
    
-   **Knight First Amendment Institute (Jun 2025)**: taxonomy centered on the human's role (L1=Operator, L4=Approver, L5=Observer).
    

📖 Analysis of the L1–L5 framework: [AI Coding Evolution and Landscape: L1 to L5](https://prompt.16x.engineer/blog/ai-coding-l1-l5)

📖 Swarmia variant (recommended): [Five levels of AI coding agent autonomy](https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/)

---

## Git with AI: how your concrete workflow changes

Of all the SDLC phases, there is one that is already completely permeated by AI in 2026 and that deserves its own section: **Git, code review, and PRs**. This applies every day, in every session of the master.

### GitHub Copilot Code Review

Launched in preview in April 2025, progressive GA throughout 2025. The March 2026 data (GitHub Blog):

-   **60 million cumulative reviews**.
    
-   **10x growth since launch**.
    
-   **\>1 out of every 5 reviews** on GitHub are already done by Copilot.
    
-   **71% of reviews** leave actionable comments (29% correctly leave no comments — silence is better than noise).
    
-   Average: **5.1 comments per review**.
    
-   **72.6% of users** report improved effectiveness (Octoverse 2025).
    

📖 GitHub Blog: [60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/)

### AI-generated commit messages

Standard flows in 2026:

-   **Claude Code**: built-in command (`/commit` or asking "generate a commit message based on the staged changes").
    
-   **Cursor**: "Generate commit message" button in the Git panel.
    
-   **GitHub Copilot in VS Code**: "Generate Commit Message" in the Source Control tab. Supports configurable styles (conventional commits, Gitmoji).
    

> 💡 **Usage tip**: AI doesn't know your business domain; a generated commit message might say *"fix bug in user service"* when the correct one would be *"fix race condition in checkout when cart is empty"*. Always review before committing.

### Resolving merge conflicts with AI

-   **Cursor "Resolve in Chat"**: detects `<<<<<<<` / `=======` / `>>>>>>>` and proposes a contextualized resolution.
    
-   **Claude Code**: `claude resolve-conflicts` or `@claude resolve` in GitHub Actions.
    
-   **GitHub Copilot in VS Code**: "Resolve in chat" button in the conflicts panel.
    

### Copilot Workspace + coding agent

-   Launched in preview in April 2024, **GA with coding agent in May 2025**.
    
-   Assign an issue to Copilot → it creates a branch, implements, opens a PR.
    
-   In August 2025: 1.2M PRs generated/month.
    
-   Octoverse 2025: **\>1M PRs authored in 5 months** (May–September 2025).
    
-   **Agent HQ (February 2026)**: multi-vendor orchestration from GitHub.
    

### Claude Code + GitHub Actions (official integration)

Launched on **September 29, 2025** as part of Claude Code 2.0. Official repo: `anthropics/claude-code-action`.

**Minimal setup**:

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

**Usage modes**:

-   **Interactive**: mention `@claude` in PRs/issues; the agent responds and acts.
    
-   **Automation**: direct prompt in YAML; runs on every event.
    

**Flexible auth**: Anthropic API key, AWS Bedrock, GCP Vertex, Microsoft Foundry (with OIDC).

**Prompt injection mitigation**: filters HTML comments, invisible characters, image alt-text. Repo admins should configure `allowed_bots` and `allowed_non_write_users` carefully.

📖 Official documentation: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

📖 Marketplace: [Claude Code Action Official](https://github.com/marketplace/actions/claude-code-action-official)

### Best practices for senior devs (2026)

1.  **Treat the agent as a junior collaborator with a clear contract.** Define `CLAUDE.md` / `.cursor/rules` / `AGENTS.md` (OpenAI's standard, already in >60,000 OSS repos) in each repo: code style, test commands, do/don't.
    
2.  **Enforce human diff-review of any agentic change.** **75% of senior devs** (Stack Overflow 2025) manually review all AI code before merging.
    
3.  **Strict CI gate.** Block merge if tests/coverage/security checks don't pass. AI produces more code, but also more bugs (Faros AI 2026: incidents/PR +242%, bugs/dev +54% in teams with high adoption).
    
4.  **Differentiate the PR's profile.** Label auto-generated PRs (`copilot`, `devin`, `claude-code`). DORA 2025 suggests that adapting the process is what separates high-performance teams from those that struggle.
    
5.  **Read-only MCP for code review.** Connect the agent to the ticket tracker, staging database, and observability — but **never with write permissions on prod without a human in the loop**.
    
6.  **Prefer async agents over chat for long tasks.** Devin, Copilot coding agent, Cursor background agents leave a paper trail in Git, much more auditable than an ephemeral chat.
    
7.  **Git hygiene matters more than ever.** Atomic commits, conventional-format messages, short branches. Agents work better with a clean history.
    

---

## Enterprise data: who is using this in production

So it doesn't sound like theory, the concrete names as of April 2026:

-   **Goldman Sachs**: first major bank to deploy Devin to its workforce of >12,000 developers. CIO Marco Argenti talks about a "hybrid workforce" and estimated 3–4x productivity.
    
-   **Microsoft**: 20–30% of internal code generated or suggested by AI (Satya Nadella, May 2025).
    
-   **Anthropic**: ~90% of code AI-assisted (Dario Amodei).
    
-   **Salesforce**: communications cite ">90% Cursor usage" among its 20,000 engineers \[⚠ VERIFY: figure reported by third parties, no direct official confirmation\].
    
-   **Cognition customer list (January 2026)**: Goldman Sachs, Citi, Dell, Cisco, Ramp, Palantir, Nubank, Mercado Libre, OpenSea, Lumos, Microsoft, Curai Health, Santander.
    

This is not optional. It is the current state of the industry.

## The actionable takeaways from this lesson

1.  **The entire SDLC is being redefined, not just "writing code."** Each phase has opportunities and risks. The master covers the ones with the greatest impact for a senior.
    
2.  **L1–L5 is a map, not a quality hierarchy.** Moving up a level isn't always better; each level serves different tasks. Knowing how to choose well is a senior skill.
    
3.  **Code review went from "occasional task" to "core skill."** When 1 out of every 5 reviews is already done by an AI, your role as a human reviewer is redefined: you filter what the AI can't see.
    
4.  **Git with AI isn't a feature, it's the new default.** Learn to generate commits, resolve conflicts, and configure GitHub Actions with Claude Code before S1.
    
5.  **The big companies are already doing it.** You're not arriving early; you're arriving on time.
    

## Resources to go deeper

### On the SDLC with AI

-   📖 [DORA 2025: State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — the AI Capabilities Model and how each phase changes.
    
-   📖 [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — data on the state of the dev ecosystem.
    

### On the L1–L5 framework

-   📖 [Swarmia — Five levels of AI coding agent autonomy](https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/) — the version most aligned with coding tools.
    
-   📖 [Vellum — LLM Agents: The Six Levels of Agentic Behavior](https://www.vellum.ai/blog/levels-of-agentic-behavior) — L0–L5 variant.
    
-   📖 [Cognition — Devin's 2025 Performance Review](https://cognition.ai/blog/devin-annual-performance-review-2025) — real enterprise data from an L5 agent.
    

### On Git with AI

-   📖 [GitHub Blog — 60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) — official Copilot Code Review metrics.
    
-   📖 [Claude Code GitHub Actions — Official documentation](https://code.claude.com/docs/en/github-actions) — the official integration.
    
-   📖 [Anthropic — anthropics/claude-code-action on GitHub](https://github.com/anthropics/claude-code-action) — the official repo.
    
-   📖 [GitHub — Claude Code Action on Marketplace](https://github.com/marketplace/actions/claude-code-action-official) — installation.
    

> 👉 **To reflect on before S1**: review the last PR you merged. At which L1–L5 level did you operate? Could you have operated at a higher one, or did the context require the level you used? That question is the muscle you'll train throughout the master.
