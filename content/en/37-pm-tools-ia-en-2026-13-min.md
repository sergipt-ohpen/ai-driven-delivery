# 📄 PM tools + AI in 2026 🔴— 13 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 13 min

## The ecosystem on one page

The PM tools landscape in 2026 reorganized around three new axes:

1.  **Does it have native integrated agents?** (not just "AI summary", but agents that execute work)
    
2.  **Does it have a stable official MCP server?** (how you plug it into Claude Code/Cursor)
    
3.  **Is it designed for devs or for PMs/ops?** (UX and data model)
    

Quick table (data verified April 2026):

![image.png](https://media1-production-mightynetworks.imgix.net/asset/325ad8ca-31db-4cc9-8cb1-1c3c714605ff/d55b8d76552b434c.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Data to verify when running the session**: the ecosystem changes fast. The above is validated as of April 2026 against official changelogs. If you run this session 6 months later, re-verify the versions (especially of the agents that are in beta).

---

## Linear — the course's tool

For AI4Devs we're going to work with **Linear**. It's not an aesthetic preference; there are concrete reasons:

✅ **Sufficient free tier** for the FlowSync project. Up to 250 active issues and 10 users, without asking for a card.

✅ **Linear Agent** (beta, March 2026) is built specifically for dev-AI flows. Skills, automations, integration with Cursor/Devin/coding agents.

✅ **Mature official MCP server**, direct integration from Claude Code and Cursor. No proxy, no Composio, no intermediate step.

✅ **Opinionated data model** that matches the pyramid PRD → Epic (initiatives) → Issue (story) → Sub-issue (task). No need to teach the team the model.

✅ **Operational speed** — the "open Linear, find the ticket, modify it, close it" use case is 3-5× faster than in Jira.

✅ **Native GitHub integration**: bidirectional PR ↔ ticket, with no webhooks to maintain.

❌ **It's not Jira**. For companies that already live in Jira, Rovo is the option. We'll cover it below.

🎥 **Recommended video** — *Project scoping with Linear Agent* (~3 min, EN, official Linear, March 2026). How the agent turns workspace context into a fully scoped project in minutes. To the point and with timestamps.

📺 [https://www.youtube.com/watch?v=DF1vSmPYqzs](https://www.youtube.com/watch?v=DF1vSmPYqzs)

> 📌 **For students**: create a free account at [linear.app](http://linear.app/) before the live session. The invitation to the AI4Devs workspace will arrive via the program's email.

---

## Linear Agent — what it does in March-April 2026

This is what gets demonstrated in Demo 1 of the live session, but it helps to arrive with the mental model:

-   **Investigates issues**: "@Linear find all bugs related to authentication that we closed in the last 3 months and summarize the patterns"
    
-   **Creates issues from conversation**: "Make issues based on this discussion" (in Slack or in a comment)
    
-   **Reusable skills**: workflows the team saves, executable with a slash command. E.g.: a "decompose-prd-section" skill that opens 8 issues from a section of a PRD.
    
-   **Automations in triage**: every new issue enters a flow that the AI pre-classifies and routes.
    
-   **MCP integration with external tools**: Linear Agent can query GitHub, Slack, your product's data, etc., to make decisions with context.
    

> ⚠ **Linear Agent is beta**. Expect occasional bugs (it's not production). In the live demo there's always a manual fallback; you'll see it.

---

## Jira + Rovo — the enterprise setup

If your company already lives in Jira, migrating makes no sense. Atlassian has caught up with Rovo and agents:

-   **Rovo Search + Chat**: a search and chat layer over Jira/Confluence/JSM/connected tools. 5M MAU according to the Q2 FY26 shareholder letter.
    
-   **Agents in Jira (open beta, Feb 2026)**: you can assign issues to agents (Rovo or third-party via MCP). Iteration through comments; agents are first-class citizens.
    
-   **Rovo MCP Server (GA, Feb 2026)**: an official Atlassian-hosted endpoint to connect Claude Code, Cursor, ChatGPT, Gemini, Copilot, etc., to your workspace.
    

🛠 **Configuration for Claude Code** (reference, not part of the workshop):

```
{
  "mcpServers": {
    "atlassian": {
      "type": "sse",
      "url": "<https://mcp.atlassian.com/v1/sse>"
    }
  }
}
```

Auth via OAuth. Devs report in the Atlassian community (January-March 2026) that re-authentication is frequent; some prefer a custom skill with `acli` over the direct official MCP. If you work with Atlassian, evaluate both routes.

> 💡 **Takeaway on Rovo**: the important thing about Rovo is that it materializes the "agent as teammate" pattern inside existing enterprise tools, without demanding a platform change. **Adoption is driven by the ecosystem, not by technical quality**: if your company has 2000 people on Jira, Rovo is the way.

---

## Notion + AI — for content, not for the sprint

Notion remains the best place for PRDs, documentation, wikis. Its AI layer (Notion AI + agents) is decent for generating content and searching across pages. **It's not good for operational sprint planning**: the data model is too free-form, and there's no strong concept of issue/sprint/cycle.

A reasonable pattern:

-   **Notion**: PRD, architectural decisions, retrospectives, postmortems.
    
-   **Linear or Jira**: backlog, sprints, active issues.
    
-   **MCP on both**: so Claude Code can read the PRD from Notion **and** create issues in Linear from the same prompt.
    

That's what we're going to configure in Demo 1.

---

## ClickUp, Asana, Monday — the "non-dev PM" segment

All three have an aggressively marketed AI layer but stay closer to the classic PM niche (timelines, gantt, dashboards) than to the dev-AI flow. If your team isn't 100% technical and you have PMs/marketers/ops mixed in, they're reasonable. For AI4Devs we don't use them because the focus is the dev flow.

> 📌 **It's not that they're bad**. It's that their surface wasn't designed around "the agent lives on the board". You'll notice that when you try to integrate them with Claude Code.

---

## GitHub Projects — free, integrated, minimal

For personal-only or very small projects, GitHub Projects + the GitHub MCP is a valid and free combination:

```
claude mcp add github
```

Pros:

-   ✅ Free with no limitations
    
-   ✅ Perfect integration with the repo, PRs, issues
    
-   ✅ Well-maintained GitHub MCP
    

Cons:

-   ❌ Poor data model (only issues + projects; no initiatives, no sprints as a concept, no cycles)
    
-   ❌ Weak planning UX (no planning poker, no velocity tracking)
    
-   ❌ No native PM-aware agent
    

For FlowSync we're going with Linear. But if after S4 you want to replicate the pattern in a personal project and don't want to pay anything, GitHub Projects + Claude Code MCP works.

---

## Integration patterns: read-only, write, two-way

When you configure the Claude Code ↔ your PM tool connection, there are three permission levels. Choose consciously:

### Read-only

```diagram
Claude Code ──► (read) ──► Linear/Jira
```

The agent can only read. Useful for **research, summaries, generating reports**. It cannot create, modify, or close issues. It's the minimum risk. I recommend it as the entry point for any new team.

### Write (controlled)

```diagram
Claude Code ──► (read + create) ──► Linear/Jira
```

The agent can read and create, but not modify/close/move. Useful for **bulk creation** from a PRD, generating bug tickets from logs, etc. The human is still the one who closes and prioritizes.

### Two-way (full)

```diagram
Claude Code ──► (read + create + update + close) ──► Linear/Jira
```

The agent can do everything. **Real risk of accidentally losing tickets** if the prompt is ambiguous. Reserve this for specific skills/automations with a bounded scope, not for interactive use.

> 💡 **Senior pattern**: always start read-only on a new team. Move up to write when you need it. Two-way only in specific automations, not in ad-hoc use.

---

## Risks of the MCP ecosystem in PM tools

Obligatory mention: the MCP ecosystem had several security issues in recent months. This isn't to scare you; it's so seniors know:

-   ⚠ **CVE in** `sooperset/mcp-atlassian` (critical RCE, patched in v0.17.0). If you use an unofficial MCP, verify the version.
    
-   ⚠ **MCP STDIO vulnerability** (April 2026): the STDIO transport executed commands in some cases even with the server down. It affected many servers.
    
-   ⚠ **Prompt injection in unofficial MCPs**: if you connect Claude Code to an unofficial Notion MCP and someone puts malicious instructions on a page, the agent can execute them.
    

🛡 **Operational guardrails**:

1.  **Use official MCPs when they exist** (Linear, Atlassian Rovo, GitHub).
    
2.  **Read the code of community MCPs before using them for anything serious**.
    
3.  **Keep MCPs on the current version** (CVEs get patched; your old version doesn't).
    
4.  **Claude Code's security hooks** (S3) can intercept dangerous calls — use them.
    

---

## AI4Devs operational decision

```diagram
┌──────────────────────────────────────────────────┐
│ Stack PM para FlowSync (este proyecto):          │
│                                                  │
│   📝 Notion       — PRD, docs, decisiones        │
│   🎯 Linear       — backlog, sprints, issues     │
│   🤖 Linear MCP   — agente conectado a Claude    │
│   🐙 GitHub       — código y PRs (vinculados)    │
│                                                  │
│ Permisos iniciales:                              │
│   • Linear MCP: read + create                    │
│   • GitHub MCP: read-only                        │
│   • Notion MCP: read-only                        │
│                                                  │
│ Subimos a write/two-way cuando demostremos que   │
│ los skills generan tickets de calidad.           │
└──────────────────────────────────────────────────┘
```
