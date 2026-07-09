# 🧭 The Workflow (read this first)

Before any prompt, any tool, any trick — this is the one idea the whole guide is built on. Get this, and the rest is just detail.

## The one-line version

**You open the real project in Claude, and Claude answers from it — not from guesses.** Around that, your tickets live in Jira and your docs live in Confluence, both connected so Claude can read and update them. That's it.

## The picture

```
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
