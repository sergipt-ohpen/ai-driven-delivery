# 📄 Senior decisions: when to use what, real costs, governance 🔴 — 20 min | AI-Driven Delivery

⏳ Estimated time: 20 min

## Claude Code vs Cursor: concrete decision matrix

The question isn't "which one is better". It's "which one do you use for this task right now". Field table:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/d3cc7978-8af5-48cf-9093-f6cdf2a92dc2/56cd7e0f88a67f3b.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Normal pattern of a productive senior**: both open. Cursor for fine-grained editing of the active file. Claude Code in a separate terminal tab for long background tasks. The "composable AI coding stack" from The New Stack is not a metaphor — it's the operational reality.

---

## Recommended plan by profile

![image.png](https://media1-production-mightynetworks.imgix.net/asset/7c170771-8729-442c-a0d1-caebd7237b3a/f7ae0ad06c11d054.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 📌 **Rule of thumb**: the upgrade makes sense when **it interrupts your work more than twice a week**. Otherwise, Pro + extra usage during spike weeks is cheaper.

---

## Anti-budget-burn tactics

Applicable to Claude Code (where the cost is more visible):

### 1 · Automatic caching already on

The plans include prompt caching. **\>90% of tokens in long sessions are cache reads** (10% of the price). You don't have to do anything to enable it, but do two things to take advantage of it:

-   Keep [CLAUDE.md](http://claude.md/) stable during a session (changing it invalidates the cache).
    
-   Start prompts for the same project with the same structure (the cache looks for prefix matches).
    

### 2 · Cheap model for Explore

By default the Explore subagent uses Haiku 4.5 ($1/$5). If a custom subagent of yours doesn't require sophisticated reasoning, set `model: haiku` in its frontmatter. The difference between Haiku and Sonnet on search tasks is negligible.

### 3 · Batch processing for non-urgent tasks

The Anthropic API has batch processing with **\-50% on input/output**. Useful for:

-   Generating tests for 50 functions.
    
-   Migrating 100 files to the new style.
    
-   Processing historical logs.
    

Not usable for interactive sessions, but perfect for scripts you launch overnight.

### 4 · `/compact` before long tasks

If you're about to start a long task (refactor, migration) and the context is already at 80% capacity from a previous session, **/compact first**. Working on inflated context triples the tokens per turn.

### 5 · Audit `/mcp list` monthly

Every connected MCP consumes tokens on every turn (the agent knows the tools it exposes). Remove what you don't use. The *MCP Tool Search* feature (when available in your version) does lazy-loading.

### 6 · `-dangerously-skip-permissions` mode with judgment

For mechanical, safe tasks (formatting, test generation, trivial refactors), skipping the permission prompt on every operation saves time *and* tokens (each permission prompt is an extra turn). **Only if you have** `PreToolUse` **hooks that protect against the destructive.** Without hooks, this is Russian roulette.

---

## Risk and governance: lessons from the April 2026 Pro incident

On **April 21-22, 2026**, Anthropic silently updated the pricing page, removing Claude Code from the Pro plan and leaving it only on Max ($100+). Within 24 hours Reddit, Hacker News, and X exploded. Anthropic reverted the change and clarified that it was *"un test A/B en aproximadamente 2% de nuevos signups prosumer"* poorly coordinated with the docs and landing page update.

Result: today (April 29, 2026) Claude Code **is included in Pro**. But the incident left three operational lessons:

### Lesson 1 · Don't depend on a single plan/tool

**Minimum viable plan B**:

-   An Anthropic API key (free to create, $5 initial credit).
    
-   Mental readiness to switch to Cursor for IDE-friendly tasks.
    
-   Self-contained repos ([CLAUDE.md](http://claude.md/) / [AGENTS.md](http://agents.md/) / `.claude/skills/`) that move with the repo, not with the tool.
    

### Lesson 2 · What you have today may not be what you have tomorrow

Amol Avasare (Head of Growth at Anthropic) admitted after the incident that *"engagement per subscriber is way up... our current plans weren't built for this"*. Translation: you're going to see more pricing changes over the next 12 months. **Your safety isn't in the plan; it's in your workflow being portable.**

### Lesson 3 · Auditability matters more than speed

When something changes in the tool, what keeps working is **what you have versioned in your repo**: [CLAUDE.md](http://claude.md/), [AGENTS.md](http://agents.md/), `.claude/`, `.cursor/rules/`. That's yours and moves with you. **Deterministic hooks** are worth more than a good prompt when the tool ships a bad release (like the v2.1.100 token-inflation bug in March, or the three harness bugs reported on April 24 by Anthropic).

---

## Hooks as auditability for enterprise

If you work in an environment where you need to justify what the agent touched and why, hooks are your best friend.

### Basic audit hook

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "type": "command",
        "command": "echo \\"$(date -u +%FT%TZ) | $CLAUDE_TOOL | $CLAUDE_FILE | $CLAUDE_USER\\" >> .claude/audit.log",
        "async": true
      }
    ]
  }
}
```

Result: `.claude/audit.log` with every tool executed, affected file, timestamp, and user. Versionable. Auditable.

### Policy-based blocking hook

```
{
  "matcher": "Edit:**/secrets/**",
  "type": "command",
  "command": "echo 'Política: agente no edita secrets/' && exit 2"
}
```

If the agent tries to touch `secrets/`, the hook blocks with exit code 2 and the model receives the error. The policy is enforced by construction, not by interpretation.

> ⚠ **Important distinction**: what lives in [CLAUDE.md](http://claude.md/) is **interpreted** by the model. What lives in hooks is **executed** by code. For security/compliance invariants, always hooks.

---

## How it fits with your team

### [AGENTS.md](http://agents.md/) as a shared source of truth

If more than one person touches the repo:

-   `AGENTS.md` **committed** to the repo. Rules that apply to everyone: naming conventions, build/test commands, security restrictions.
    
-   `.claude/skills/` **and** `.claude/agents/` **committed**. Team workflows.
    
-   `CLAUDE.md` **as a symlink** to `AGENTS.md`.
    

### What is NOT shared

-   `~/.claude/` **(user-level)**: your personal preferences (favorite output style, your own skills).
    
-   `.claude/settings.json` **with local scope**: your MCP credentials.
    
-   **Your** `.env` **and secrets**: never.
    

### PRs on skills and [AGENTS.md](http://agents.md/)

Treat the agent's files like code:

-   Changes to `AGENTS.md` go in a PR like anything else.
    
-   New skills get reviewed (especially if they have `disable-model-invocation: false` — they auto-invoke).
    
-   Hooks get reviewed **always** (they execute code on your team's machines).
    

### Assisted code review on the team

An emerging pattern you'll see more of in upcoming sessions:

1.  PR opened → CI trigger.
    
2.  CI launches Claude Code (or Copilot Coding Agent) in plan mode on the diff.
    
3.  The agent returns feedback as a PR comment.
    
4.  You do the human review knowing you already have a first pass.
    

GitHub Agent HQ (February 2026) consolidates this flow by allowing the same issue to be assigned to Claude, Codex, or Copilot from the GitHub UI.

---

## The actionable takeaways from S3 — the 5 things that change starting tomorrow

1.  **Turn your** [**CLAUDE.md**](http://claude.md/) **into a symlink to** [**AGENTS.md**](http://agents.md/)**.** 30 seconds. Your repo becomes compatible with Cursor, Copilot, Codex, and any future copilot.
    
2.  **Memorize the Plan Mode decision tree.** Tasks that touch >3 files or have side-effects: plan mode always.
    
3.  **Create your first custom subagent.** Whichever one (research, code-review, test-writer). It gives you a sense of real control over the harness.
    
4.  **Audit your MCP servers.** `claude mcp list`. Remove what you don't use. Tokens matter.
    
5.  **Practice the EPE pattern on a small task this week**. Explore (subagent) → Plan (you approve) → Execute (with hooks). Without skipping phases.
    

---

## A typical Monday with copilots · a real-usage narrative

To ground everything you've learned, this is a reasonable Monday for a program dev at their real job, using what was covered in S3. It's not aspirational fiction: it's the natural combination of the primitives once you're comfortable with them.

### 9:00 — The day begins

You open your work repo. You have three tasks for today: investigate an intermittent bug in production, refactor the notifications module, and review two of the team's PRs.

You open two terminals with `tmux`. In the first, Claude Code:

```
$ cd ~/work/payments-service
$ claude
```

The `SessionStart` hook you have configured automatically injects the current branch, the last 3 commits, and the output of `git status`. The agent already knows what you're on.

### 9:05 — Intermittent bug (pure Explore)

```
> Tenemos un bug en producción: el endpoint /webhooks/stripe falla
  con timeout aleatoriamente, ~1 de cada 50 requests. Usa subagents
  paralelos para:
  1. Buscar todos los lugares donde se hace I/O bloqueante en ese
     endpoint y sus dependencias.
  2. Revisar los últimos 30 días de logs (MCP de Sentry está conectado)
     buscando patrones temporales en los timeouts.
  3. Comprobar si hay locks de DB sospechosos (MCP postgres).
  Sintetiza findings + 3 hipótesis ordenadas por probabilidad.
```

The agent launches three parallel Explores. While they run (3-4 min), you open Cursor on another screen and start reading one of the team's PRs.

At 9:09 you come back to the terminal: the agent has synthesized three hypotheses. #1 (lock contention on `payment_intents` when there are >10 concurrent webhooks) has evidence in the logs *and* in the query plan. **You have to decide whether to invest time validating it or the other two**.

You decide to validate. But not here, not now — you open an issue with the findings copied in and assign it to someone with more context on the module. Your time on the bug has been 4 minutes. Before, it would have been 90.

### 9:30 — Notifications refactor (full EPE)

Back to Claude Code. The day's important task is refactoring the notifications module to support multiple channels (email, SMS, in-app).

```
> /plan
> Quiero refactorizar app/services/notifications/ para que soporte
  múltiples canales. Spec: ya tenemos openspec/changes/multi-channel-notifications/.
  Lee proposal.md, design.md, specs/ y tasks.md primero.
  Sigue tasks.md paso a paso. Pregúntame antes de desviarte.
```

The agent reads the spec (which your team wrote last week using SDD) and returns a 12-step implementation plan.

You read the plan. Step #7 is worrying: the agent wants to move a class from `app/services/` to `app/lib/` and that could break imports in other modules. You ask:

```
> Antes del paso 7, verifica con un Explore si esa clase es importada
  desde fuera de app/services/. Si lo es, propón estrategia de migración
  gradual.
```

The Explore confirms it is: 4 external imports. The agent proposes a migration with temporary re-exports and a TODO for later cleanup. You approve the modified plan.

You exit plan mode. The agent executes. You go back to Cursor and continue with the PR review.

At 11:00 the agent finishes. Tests pass (the `Stop` hook verifies it). You review the diff: it's clean. Commit, push, PR.

### 11:15 — Team PRs (Cursor + review agent)

Back to Cursor. Your team has two PRs waiting for review.

For each PR, you open the branch in Cursor and run your review skill (which you have committed in the team's repo):

```
> /review-pr
```

The skill (which we saw in lesson 2) reads the diff, checks against `AGENTS.md`, and returns findings by severity. You review the agent's findings — not to trust them blindly, but so your human review starts from a baseline.

In ~15 minutes you've reviewed two PRs with the same quality as before in half the time. You approve one with minor changes; you request specific changes on the other (with feedback the agent identified but that you validated and articulated as a human).

### 12:30 — Lunch

You close Claude Code. You close Cursor. Lunch.

### 14:30 — Creative task where Cursor shines

Back at it. Time to design a new UI component: a dashboard of notifications grouped by channel.

This is a Cursor task, not a Claude Code one. You open the component file, use Tab to autocomplete the basic React structure, and ask the chat:

```
> Implementa este componente siguiendo nuestros patrones de design
  system (revisa @file:components/ui/ para referencias).
  Datos vienen del nuevo endpoint que añadí esta mañana
  (/api/notifications/grouped).
```

Composer 2 iterates with the integrated browser tool. You see the preview in real time, request adjustments ("more spacing", "make the badge outline instead of solid"), and the component is done in 20 minutes. Tab for fine details, Composer for structure. Claude Code in the terminal would do this worse.

### 15:30 — Reflection

You've done in 6 hours what used to take you 9-10. But the important difference isn't speed. It's:

-   **Focus**: each tool did its job. You didn't context-switch unnecessarily.
    
-   **Quality**: validation hooks, automatic tests, plan reviewed before executing.
    
-   **Energy**: you end the day with mental energy, not exhausted from carrying boilerplate in your head.
    
-   **Auditability**: if in a month someone asks why you moved that class, there's a log of the conversation, there's an approved plan, there are tests.
    

That's S3 applied.

> 💡 **What's missing from this Monday**: Cowork (long async sessions), Agent Teams (coordinated multi-agent), Cursor automations (cron + Slack). Those are more advanced patterns covered in later sessions. What you saw today is the *core*: EPE, primitives, the right tool for each moment.
