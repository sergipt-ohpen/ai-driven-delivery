# 🧭 The Workflow (read this first)

Before any prompt, any tool, any trick — this is the one idea the whole guide is built on. Get this, and the rest is just detail.

## The one-line version

**You open the real project in Claude, and Claude answers from it — not from guesses.** Around that, your tickets live in Jira and your docs live in Confluence, both connected so Claude can read and update them. That's it.

## The picture

```diagram
   GitHub  ──clone / pull──▶   The project folder on your laptop
 (the source                    (real code + real docs)
  of truth)                             │
                                        │  opened in Claude Desktop (Code mode)
                                        ▼
                                  ┌───────────────┐
     Jira Cloud  ◀───────────────│               │
   (tickets)      via Atlassian   │    CLAUDE     │   ← you work here
                   connector      │               │
   Confluence  ◀───────────────  └───────────────┘
   (docs)                                 ▲
                                          │
                                        YOU
                            (refine backlog, write stories,
                             PRDs, estimates, updates)
```

## Why this is the whole game

Most people use AI by describing their product from memory and hoping. The answers come back fluent and generic — and often wrong, because the AI never saw the actual thing.

This workflow removes the guessing. When the real project is open in front of Claude, "how does our login work?" or "what would this change touch?" get answered from **your** code and **your** docs. When Jira and Confluence are connected, a refined story doesn't get copy-pasted by hand — Claude reads the ticket and updates it in place. Your job shifts from *typing things up* to *deciding and directing*.

## It has a name: AI-driven Delivery

Everything in this guide is one half of something bigger: **AI-driven Delivery**, the whole path from a raw idea to shipped software, grounded in the real project at every step instead of guesswork.

Your half starts before any spec exists — turning a rough idea into a refined backlog item, a clear ticket, a PRD, an estimate a stakeholder can trust. Once that's solid, it hands off into **Spec-Driven Development**, the practice your engineering team uses to turn a written spec into a contract an AI copilot can implement against. Same grounding, same "project as source of truth" principle — just the other half of the pipeline.

You don't need to run SDD yourself to benefit from it: the clearer your ticket, the more literally an AI can build it. That's the whole point of AI-driven Delivery — product and engineering, both working from the same real project, handing off clean instead of re-explaining from memory.

## The five steps

1. **The project is the source of truth.** Your team's repository — the code and its docs — lives on GitHub.
2. **You open that project folder in Claude.** In the Claude Desktop app you switch to **Code mode** and point it at the folder. Now Claude can read every file.
3. **You keep it fresh.** Because Code mode has Git, you just tell Claude *"pull the latest"* at the start of a session. Now it sees today's reality, not last month's.
4. **Jira and Confluence are connected.** Through the official Atlassian connector, Claude can read your tickets and pages — and create or update them.
5. **You drive the product work.** Refine the backlog, write stories and PRDs, sanity-check estimates, write stakeholder updates — every answer grounded in the actual project, tickets, and docs.

## How to read the rest

- **Set it up once** — two short pages: get your project into Claude, then connect Jira & Confluence. Do these once and forget them.
- **Using it day to day** — the four things you actually do, each grounded in the real project.
- **Playbook** — copy-paste prompts for when you just want to get going.

Skim the daily-use pages, then live in the Playbook. You don't need to remember any of this — you need to do it once and feel the difference.
