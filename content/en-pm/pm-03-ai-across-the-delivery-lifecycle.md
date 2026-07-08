# 🔄 AI Across the Delivery Lifecycle

> The headline of this page: **the entire software delivery lifecycle is being redefined, not just "writing code."** Every phase — planning, requirements, development, QA, release, operations — has new opportunities and new risks. Here's the map, phase by phase, from a product perspective, with the places you can plug Claude in yourself.

## First, a useful mental model: levels of autonomy

When people say "AI for software teams," the reflex is to picture code generation. But the industry describes AI tooling on a broader **autonomy scale from L1 to L5** (popularized in 2024–2025 and used by Swarmia, Vellum, AWS and others — a pragmatic framework, not an official standard; different vendors use slightly different variants):

- **L1 — Autocomplete.** The AI suggests the next few words of code; a human accepts or rejects each suggestion. (GitHub Copilot completions is the classic example.)
- **L2 — Task-level generation.** A human describes a task, the AI produces a coherent chunk of work, a human verifies. This is the level of everyday chat tools like Claude, ChatGPT, and Gemini.
- **L3 — Supervised coding agents.** The agent executes several steps on its own — read, edit, test — under supervision, leaving a full audit trail in version control. Claude Code and Cursor live here.
- **L4 — From specification to production.** "Build-from-prompt" platforms (Bolt.new, Lovable, v0, Replit Agent) go from a written description to a deployed app without anyone touching code directly. Lovable famously went from $0 to $100M+ ARR in 8 months.
- **L5 — Autonomous agents and agent teams.** Multiple agents, long-horizon planning, independent decisions. Devin (Cognition) is the only L5 agent with demonstrable mass enterprise adoption; GitHub's Agent HQ (February 2026) now orchestrates Copilot, Claude Code, and OpenAI Codex as assignable agents from a single GitHub issue.

Two things a PM should take from this scale:

- **It's a map, not a quality ranking.** Higher autonomy isn't always better; each level suits different tasks, and choosing the right level for the risk involved is a judgment call — a fair topic for you to raise.
- **Trust in full autonomy is going *down* as experience goes up.** Per Capgemini 2025, only **27% of organizations trust fully autonomous agents — down from 43% a year earlier**. Even Devin, the flagship autonomous agent, excels at junior-level work (migrations, tests, simple bugs) but requires human supervision for architecture and design decisions. Higher autonomy needs stronger guardrails, not fewer.

That said, the results at the right autonomy level are real. Cognition's published 2025 data for Devin: **67% of its pull requests merged** (up from 34% in 2024), test coverage rising from 50–60% to 80–90% on projects where it's applied, and **10–14x speedups on code migrations** versus human-only work.

## Phase by phase: what changes for the PM

### Planning

AI drafts roadmap options, summarizes discovery research, and clusters feedback in minutes. The constraint moves to *deciding*: with generation nearly free, the scarce input is a clear strategy and well-diagnosed problems. **Where you plug Claude in**: synthesizing customer feedback, stress-testing prioritization logic, drafting and comparing roadmap scenarios.

### Requirements

This is the phase with the highest leverage for you, because AI agents downstream execute exactly what's written — including the ambiguities. A vague story used to cost a conversation; now it can cost an entire wrongly-built feature, produced quickly and confidently. **Where you plug Claude in**: turning notes into structured user stories, generating acceptance criteria and edge cases, and red-teaming your own requirements before engineering sees them.

### Development

Engineers increasingly orchestrate agents rather than typing everything. The best practices the industry has converged on (2026) translate into things you can reasonably expect from your team:

- **The agent is treated like a junior collaborator with a clear contract**: teams keep instruction files in the repository (e.g., `CLAUDE.md` or the `AGENTS.md` standard, already in over 60,000 open-source repos) telling the AI the project's rules — code style, how to run tests, do's and don'ts.
- **A human reviews every AI change**: 75% of senior developers manually review all AI code before merging (Stack Overflow 2025).
- **AI-generated work is labeled** (`copilot`, `devin`, `claude-code`), so everyone knows which changes came from an agent. DORA 2025 suggests that adapting process like this is what separates high-performing teams from those that suffer.
- **Even the daily plumbing changed**: commit messages, merge-conflict resolution, and change descriptions are now routinely AI-drafted and human-checked. The check matters — the AI doesn't know your business domain, so it may describe a change as "fix bug in user service" when the truth is "fix race condition in checkout when cart is empty."

### QA and code review

Code review has moved from occasional task to central skill — roughly **1 in 5 code reviews on GitHub is already done by AI**. GitHub reports **60 million Copilot code reviews and counting** (10x growth since launch), with 71% of reviews leaving actionable comments, an average of 5.1 comments per review, and 72.6% of users reporting an efficacy improvement. The human reviewer's role is redefined: filtering what the AI can't see — business intent, product context, risk.

But volume cuts both ways: **Faros AI (2026)** found that teams with high AI adoption saw **incidents per change up +242% and bugs per developer up +54%** when quality gates were weak. The professional answer is a strict, automated quality gate: nothing merges unless tests, coverage, and security checks pass. **What to ask as a PM**: "What's our quality gate for AI-generated code, and are we tracking bug rates since adoption?" **Where you plug Claude in**: generating test scenarios from your acceptance criteria and drafting UAT checklists.

### Release and operations

Agents now run inside delivery pipelines. Claude Code has had an official GitHub integration since September 2025: anyone can mention `@claude` on an issue or pull request and the agent responds and acts, or it runs automatically on events. GitHub's Copilot coding agent works similarly — assign it an issue and it creates a branch, implements, and opens a pull request (over 1 million such PRs authored in its first 5 months).

Two guardrails your team should have, in plain terms:

- Agents get **read-only access** to sensitive systems (ticket trackers, staging data, monitoring) — never write access to production without a human in the loop.
- Long-running work goes through **asynchronous agents that leave an auditable trail** in version control, rather than ephemeral chats. Auditable beats fast when something goes wrong.

**Where you plug Claude in**: drafting release notes, changelogs, and stakeholder comms from the actual list of shipped changes.

## Who's already doing this in production

This isn't theory. As of April 2026:

- **Goldman Sachs**: first major bank to deploy Devin to its 12,000+ developers; CIO Marco Argenti describes a "hybrid workforce" with estimated 3–4x productivity on suited tasks.
- **Microsoft**: 20–30% of internal code generated or suggested by AI (Satya Nadella, May 2025).
- **Anthropic**: ~90% of its code is AI-assisted (Dario Amodei).
- **Cognition's customer list** (January 2026) includes Goldman Sachs, Citi, Dell, Cisco, Palantir, Nubank, Mercado Libre, Ramp, and Santander.

If banks and healthcare companies are running this in production, "our industry is too regulated for AI" is no longer a viable default position. The differentiator is governance, not abstinence.

## What this means for you

1. **Every phase you own is being redefined** — planning and requirements most of all, because they feed everything downstream.
2. **Ambiguity is now more expensive.** AI executes requirements literally and fast; the cost of a vague story has gone up, not down.
3. **Quality questions are product questions.** More AI code means more potential defects without gates. Bug rates, incident trends, and review discipline belong in your delivery conversations.
4. **Autonomy level is a decision, not a default.** For each kind of work, someone should be choosing how much runs on its own and what the guardrails are. You can be part of that conversation without writing code.
5. **You don't need engineering's permission to start.** Feedback synthesis, story writing, acceptance criteria, test scenarios, release notes — all are yours to accelerate with Claude today.

## 🛠️ Try it with Claude

```
I'm a PM mapping where AI helps across our delivery lifecycle. Our current process: [briefly describe how your team goes from idea to release]. For each phase (planning, requirements, development, QA, release), tell me: what AI could realistically take over, what must stay human, and one risk to watch. Then tell me which autonomy level (L1 suggestions → L5 autonomous agents) fits each phase given our risk tolerance: [low/medium/high]. Format it as a table I can bring to my next team retro.
```

```
Here are my rough notes for an upcoming feature: [paste notes]. Turn them into: (1) a user story with clear acceptance criteria, (2) a list of edge cases and failure scenarios a QA engineer or an AI agent should test, and (3) the 3 most dangerous ambiguities you had to guess about — because an AI coding agent would guess too, silently.
```

```
Draft release notes and a short stakeholder update from this list of shipped changes: [paste ticket titles or changelog]. Produce two versions: one for customers (benefits, plain language, no internal jargon) and one for internal stakeholders (what shipped, what was descoped, known risks). Flag any change where you lack enough context to describe the user impact.
```
