# 🔗 Connect Jira & Confluence

With the project open, Claude understands your product. Now connect Jira and Confluence so it can also read your tickets and pages — and write back to them. This is a one-time click-through.

## What this gives you

Once connected, Claude can:

- **Read** Jira issues and Confluence pages you have access to.
- **Create and update** Jira issues (stories, bugs, acceptance criteria) and Confluence pages (PRDs, notes, release notes).
- Do it **in place** — no more copy-pasting between Claude and your tools.

The connector is official (built by Atlassian, generally available since early 2026) and works with **Jira Cloud and Confluence Cloud**, which is what we use.

## Setup

1. In Claude, open **Settings → Connectors**.
2. Find **Atlassian** in the list and click **Connect** (or **Add**).
3. A browser window opens asking you to log in to Atlassian and **approve access**. Use your normal work Atlassian account and accept.
4. Done. Claude now shows Atlassian as a connected tool.

That's the whole setup. You may be asked to re-approve occasionally — that's normal and just protects access.

## The one thing to know about permissions

**Claude only ever sees what your own Atlassian account can see.** It's you, working faster — not a new door into the company's data. If you can't open a board or a space today, neither can Claude through your login.

## Confirm it works

Ask something that requires reaching into Jira:

```
Using the Atlassian connector, list the 5 most recently updated issues
in the [YOUR PROJECT KEY, e.g. FLOW] project, with their status and a
one-line summary each. If you can't reach the project, tell me why.
```

Then try Confluence:

```
Find the Confluence page titled "[A PAGE YOU KNOW EXISTS]" and give me
a 3-bullet summary. Link the page so I can confirm it's the right one.
```

If both come back with real, correct results, your setup is complete.

## You're ready

You now have the full workflow wired up: the **real project** open in Claude, and **Jira + Confluence** connected. Everything in the next section assumes exactly this. Head to **The Project as Source of Truth** to start using it.
