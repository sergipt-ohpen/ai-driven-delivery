# 🚀 Build a POC From Scratch

Everything else in this guide assumes a real project already exists — you attach it, and Claude grounds every answer in it. A POC is the one case where that's not true yet: there's no code, maybe not even a repo. The grounding has to come from somewhere else — from a spec you write, and from an existing product you point Claude at as the reference to copy.

This is the other half of **AI-driven Delivery**: the same discipline (spec first, guardrails enforced, nothing invented), applied before any project exists at all.

It's also where the last lesson's ladder ends. A single prompt became a Playbook entry, a repeated Playbook entry became a personal skill — and a whole recurring procedure, with its own rules baked in, becomes a dedicated **agent**. That's what this lesson builds.

## What a good POC scaffold looks like

A POC that stays disciplined as it grows needs a few things in place *before* the first screen gets built:

- **A rules file** (`AGENTS.md`) — what this POC is, what stack it uses, which existing product (if any) it should look and behave like, and what's explicitly out of scope.
- **An orchestration file** (`CLAUDE.md`) — points Claude at the rules and the workflow, in order.
- **A spec-driven workflow** (`openspec/`) — the Spec-Driven Development approach named back in The Workflow, now made concrete per screen: `proposal.md` → `specs.md` (Given/When/Then) → `design.md` → `tasks.md`, with a template folder to copy for each new screen.
- **Matching skills** for the loop: refine the spec → confirm it → build it → verify it → iterate → commit and archive.
- **An implementer with guardrails** — a subagent that enforces "reuse the existing component library, don't invent your own," "match the reference product's structure," and "speak up if you can't find the reference — never guess."

Building all of this by hand, for every new idea, is exactly the kind of setup a PM would normally need a developer for. So instead of doing it by hand each time, you build it **once, as a personal skill** — the same trick from the previous lesson — and reuse it for every future POC.

## Set it up once: a personal `/bootstrap-poc` skill

Ask Claude to create this as a personal skill (`~/.claude/skills/bootstrap-poc/SKILL.md`), so it's available in any empty folder, for any future idea:

```
Create a personal Claude skill called "bootstrap-poc"
(~/.claude/skills/bootstrap-poc/SKILL.md, not the project's).
It scaffolds a brand-new proof-of-concept repo end-to-end. Use this as its content:

---
description: Scaffold a brand-new POC repo end-to-end when there's no existing
  project to ground into yet — rules, a spec-driven workflow, matching skills,
  and an implementer subagent with guardrails. Use when starting a POC from an
  empty folder.
---

# Bootstrap a new POC

## 1. Interview the user first
Ask, one at a time, and wait for real answers:
- One paragraph: what does this POC need to demonstrate?
- Is there an existing product to visually and structurally mimic? If yes, where
  does its code live (a sibling folder/repo I can point you at), and what
  component library does it use? If no reference exists, propose a sensible,
  boring default (a well-known component library, standard patterns) instead of
  inventing a bespoke look per screen.
- Preferred stack, or propose one that fits the idea.
- Hard constraints: mock data only? no real auth/backend? anything explicitly
  out of scope?
- What to call the project.

## 2. Generate the scaffold
- `AGENTS.md` — what this is, the stack, the reference product and where it
  lives (if any), the hard rules (reuse the component library, never invent one
  when a real one exists, mock-only if applicable, keep it simple — it's a
  demo), and "if you can't find/access the reference, stop and ask — never
  guess or fall back to a different UI kit."
- `CLAUDE.md` — short orchestration: read `AGENTS.md` and `openspec/config.yaml`
  first; the workflow is enrich-spec → validate → implement-spec → verify →
  iterate → commit → archive.
- `openspec/config.yaml`, `openspec/specs/` (standing rules), and
  `openspec/changes/TEMPLATE-new-screen/` (proposal/specs/design/tasks,
  fill-in-the-blank) — the same Spec-Driven Development shape used elsewhere.
- Five **project** skills (`.claude/skills/enrich-spec`, `implement-spec`,
  `verify`, `commit`, `archive`) — commit these to the repo, so anyone who
  opens this specific POC later gets them too. Model each on the matching
  OpenSpec stage: refine, confirm, execute, verify/iterate, commit & archive.
- An implementer subagent (`.claude/agents/<project>-developer.md`) with the
  guardrails from the interview baked in, plus a self-check list before it
  reports anything done (build passes, structure matches the reference,
  nothing invented).
- `PO-GUIDE.md` — a short, non-technical walkthrough for whoever drives this
  POC: one-time setup, then the build loop (refine → validate → execute →
  verify → iterate → commit/archive), one screen at a time.

## 3. Finish
Show a short summary of what was created, and the exact next command to run
(`/enrich-spec <first-screen-name>`).
```

## Use it

Open a brand-new, empty folder in Claude Desktop's Code mode and run:

```
/bootstrap-poc
```

Answer the interview honestly — especially the question about an existing product to mimic. If one exists, the whole POC will look and feel consistent with it instead of inventing its own style per screen.

## Then it's the same loop as everywhere else in this guide

Once the scaffold exists, building each screen follows the same rhythm as the Playbook: refine the spec, confirm it reads like a contract you'd sign, build it, verify it, iterate on what's off, then commit and archive. The only difference from working in an existing project is where the grounding comes from — a spec and a reference product you named, instead of a codebase that was already there.

## 🛠️ Try it with Claude

```
Run /bootstrap-poc for a new proof-of-concept: [ONE PARAGRAPH — what it should
demonstrate]. [Mention an existing product to mimic, or say there isn't one].
Interview me for anything else you need before generating the scaffold.
```
