# 🤖 What a Modern AI Assistant Can Actually Do

> Most people's mental model of AI stops at "a chat box that answers questions." Modern assistants are far more than that — and the gap between what's possible and what most teams use is enormous. This page is a capability map, in plain language, so you know what to ask for: from Claude directly, or from your engineering team.

## First, the big idea: the tools have converged

A year ago, comparing Claude Code with Cursor with Copilot meant comparing different products. Today they're different surfaces over **the same set of underlying capabilities** — industry observers call it a "composable AI stack" that nobody planned. Three consequences matter for you:

1. **The concepts transfer.** What you learn about one assistant applies almost entirely to the others. You're not learning a tool; you're learning how AI assistants work.
2. **When the next tool arrives** (and it will), recognizing the primitives saves you the mental restart.
3. **Mixing tools is the norm.** Your engineers probably use two or three. Knowing the shared concepts lets you have one conversation instead of three.

You don't need to configure any of what follows yourself. But a PM who knows these capabilities exist can say things like "could we give the review agent a checklist so it always applies our definition of done?" — and that question alone changes what your team builds. Think of this page as a menu, not a manual.

## The capability map

### 1. Context files — standing knowledge

Assistants start every session with no memory of your world. The fix is a **persistent description that loads automatically**: engineers keep a file in the codebase (Claude's is `CLAUDE.md`; the cross-tool standard is `AGENTS.md`, stewarded by the Linux Foundation and already used in over 60,000 public repositories). Your equivalent is **Project knowledge and custom instructions** in claude.ai: product strategy, personas, glossary, format preferences.

There's a discipline to what goes in, and it applies to product context too: **include only what the AI can't figure out on its own** — your conventions, your constraints, your "never do this" rules — and keep it short (engineering teams aim for under 200 lines). Padding it with material the AI could infer anyway actually makes results *worse*, not better: a study cited by the standard's maintainers found that stuffing in redundant structure raises cost without improving success rates. Fun fact: across thousands of these files analyzed by GitHub, the single most common rule is "never commit secrets" — the AI equivalent of "lock the door."

**Product example**: with your spec template and quality bar loaded as standing context, every draft PRD comes out in your format — you stop correcting the same things weekly.

**Why it matters**: this is the single highest-leverage setup step. Teams that skip it re-explain their context in every conversation and conclude "AI output is generic." It's generic because the input was.

### 2. Skills and commands — repeatable workflows

A **skill** is a saved, named workflow: a packaged set of instructions the assistant follows every time it's invoked. Engineers create skills like "review this pull request against our standards, report findings by severity — and never modify files, analysis only."

Skills activate three ways, and the distinction is worth knowing:

- **Manually** — someone types the skill's name.
- **Automatically** — the assistant reads each skill's description and invokes the right one when a request matches. (Which means the *description* is the routing logic: a vague one fires at the wrong times.)
- **Locked to manual** — sensitive workflows (anything destructive or expensive) can be configured so the AI can never trigger them on its own. A human must ask.

**Product example**: a "feedback triage" skill that takes raw customer feedback and always produces the same output — themes, severity, affected segments, suggested backlog items in your format. Or a "story-splitting" skill that decomposes any epic using your team's definition of ready.

**Why it matters**: skills turn one person's good prompt into the **team's standard operating procedure**. If you find yourself pasting the same instructions three times, that's a skill waiting to be created. You can build lightweight versions today by saving prompts in Project instructions.

### 3. Subagents — delegation and parallel work

An assistant can **spawn helper agents**, each with its own working memory and its own (restricted) permissions. The helper does the heavy reading in isolation and reports back a synthesis — nothing it waded through clutters the main conversation. Engineers use this constantly: a read-only "explore" agent sweeps the codebase and returns a two-paragraph brief. Teams also define custom researcher agents with a fixed output format: findings, recommendation, open questions.

**Product example**: "Before we plan this feature, use a subagent to research how our product handles notifications today and summarize the decisions already made." Or: "Analyze these 200 support tickets and this competitor's changelog in parallel; give me the overlapping themes."

**Why it matters**: it changes the economics of research — broad discovery that used to cost a day of skimming becomes minutes. Two governance notes worth repeating in team conversations: research agents should be **read-only** (no editing, no system access), and multi-agent workflows consume roughly **4–7x more tokens** than a single conversation. Powerful, not free.

### 4. Plan mode — look before it acts

Every serious assistant now has a mode where it **only reads and produces a plan** — no changes until a human approves. The plan is presented, you accept, adjust, or send it back. Engineers use this for anything non-trivial; it's overkill for a typo fix.

**Product example**: the same gate exists in your work whenever an assistant is about to touch something real — reorganize a backlog, update tickets, send communications. "Show me the plan first" is a habit, not a feature request.

**Why it matters**: this is where human judgment is cheapest and most effective — **between the plan and the execution**, not after the work is done. It's the AI-era version of reviewing the approach before the sprint, not the output after it.

### 5. Hooks — rules that always execute

Instructions in a context file are *interpreted* — and interpretation occasionally fails. A **hook** is different: a rule wired into the assistant's lifecycle that runs automatically and deterministically at specific moments. Classic examples from engineering teams: block any command that touches production, auto-format every file the AI edits, log every action for audit.

**Product example**: you likely won't write hooks, but you should know they exist when discussing governance. "The AI must never post to customers without approval" shouldn't be a polite instruction in a prompt — it should be a hard rule that executes.

**Why it matters**: the difference between *asking* the AI to behave and *guaranteeing* it. For anything critical — compliance, security, customer-facing actions — insist on guarantees, not requests.

### 6. MCP and integrations — connecting to your tools

**MCP (Model Context Protocol)** is the open standard — also under the Linux Foundation since late 2025 — that lets assistants connect to external systems: GitHub, Jira, Slack, Google Drive, databases, browsers, error monitoring, up-to-date documentation. Once connected, Claude doesn't just talk *about* your backlog — it can read it, query it, and (with permission) update it.

**Product example**: "Pull all tickets tagged 'checkout' closed this quarter and summarize what shipped, for my stakeholder update." Or: "Read the last 50 messages in #customer-feedback and flag anything about the new pricing."

**Why it matters**: integrations remove the copy-paste tax — the biggest friction in real adoption. Two cautions to carry into team conversations. First, **credentials**: personal access keys stay personal; only secret-free team configuration gets shared. Second, **every connected integration has a small ongoing cost** (the assistant must keep track of what each one can do) and a governance surface (what can it see and touch?). Connect what you use; prune what you don't.

### 7. Memory and output styles — continuity and voice

Two smaller capabilities round out the map:

- **Memory.** By default every conversation starts fresh; memory features let the assistant retain durable facts across sessions — preferences, decisions, ongoing threads. Convenient, but implicit. For anything that *must* persist — decisions, standards, definitions — prefer explicit context (Project files, documented instructions), which is inspectable and shareable. Memory is neither.
- **Output styles.** The assistant's entire personality can be swapped: an "explanatory" style that teaches while it works (great for onboarding), a non-coding style for research and writing, a team style ("professional tone, our language, no jargon"). The rule of thumb engineers use maps neatly to your world: if it's about *how the assistant talks everywhere*, it's a style; if it's knowledge about *this product*, it's context; if it's a *workflow*, it's a skill.

### 8. Plugins — packaging it all for a team

Skills, subagents, hooks, and integrations can be bundled into **plugins** and shared through catalogs — including a company's own private catalog, which can be as simple as an internal repository. That's how one team's proven workflow becomes standard equipment for every team: change the skill once, and it propagates to everyone.

**When it's worth it** (verbatim question to bring to your platform/engineering lead): "We have two or three workflows everyone repeats — could we package them so a change propagates to everyone without each person maintaining their own copy?" When it's *not* worth it: a single personal workflow. Keep that as a saved prompt or personal skill.

## The portability principle

Tools will change — your assistant in two years may not be today's. What travels with you is not the tool configuration or the plugins (those are tool-bound); it's the **written-down knowledge**: your context documents, your workflow definitions, the logic of your skills. Teams that treat these as versioned, reviewed team assets (yes, changes go through review like any other work product) can switch tools without losing their operating system.

For you as a PM, the takeaway is simple: **invest in the documents, not the tool settings.** A crisp product context pack is valuable in any assistant, forever.

## What to do with this map

Four questions to take into your next team conversation:

1. Which of our repeated workflows deserves to become a skill?
2. Which systems should the assistant be connected to first (and with what permissions)?
3. Which "must never happen" rules are currently polite instructions, and which are enforced guarantees?
4. Where is our team context written down — and would an assistant reading it actually understand our product?

## 🛠️ Try it with Claude

```
Here are 5 tasks I repeat every week as a PM: [list them].
For each one, tell me which assistant capability fits best — standing
context, a saved skill/workflow, a subagent research task, a tool
integration, or a plan-then-approve flow — and what setup it would
need. Rank them by effort vs. payoff.
```

```
I want to propose 2 AI workflow investments to my engineering team.
Our stack: [Jira/Linear, Slack, docs tool, analytics tool]. Draft a
one-page proposal: which integrations to connect first, one team
skill worth building (e.g., PR review or feedback triage), which
rules should be enforced guarantees rather than prompt instructions,
and how we'd measure whether it's working.
```

```
Act as my "feedback triage" workflow. Rules: group items by theme,
tag each theme with severity (blocker/major/minor), estimate how many
distinct customers are affected, and propose backlog items in the
format "As a [user], I want [goal], so that [benefit]".
Here's the raw feedback: [paste]. At the end, write the one-paragraph
"description" you'd give this workflow so an assistant could invoke
it automatically at the right moments — that description is what I'd
save as a reusable skill.
```
