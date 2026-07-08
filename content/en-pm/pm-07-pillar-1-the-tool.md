# 🛠️ Pillar 1 — Picking the Right Tool

You already know the landscape of AI assistants. This page is about the next level: **when to pick which kind of tool, what criteria to use, and how to avoid the most common trap — believing that "better model" means "better tool."**

## The right question isn't "which tool should I use?"

The right question is: **"What kind of task am I doing, and how much of my own attention does it need?"** The tool falls out as a consequence. Do it backwards — pick a favorite tool first, then feed it every task — and two predictable things happen: you use the tool badly, and you blame the AI for the result.

## Three categories for product work

Developers sort AI tools by where they live: in the editor, in the terminal, in the cloud. For a PM, the useful sorting is by **how much context the tool can hold about your work**. Three categories cover almost everything:

### Category A — Quick chat (claude.ai in the browser)

The unit of work is **the question**. You ask, Claude answers, you refine, you're done in minutes.

- **Best for**: drafting a tricky Slack message, sanity-checking an idea, summarizing a document you paste in, translating jargon from an engineering discussion, brainstorming names or angles.
- **The trade-off**: each conversation starts from scratch. Claude knows nothing about your product unless you paste it in — every time.
- **Tolerable overhead**: near zero. That's the point.

### Category B — Document-heavy work (Claude Projects / Claude Desktop)

The unit of work is **the artifact**. A Project is a persistent workspace where you upload your standing documents once — product strategy, PRD template, personas, glossary — and every conversation inside it starts already knowing them. Claude Desktop adds the ability to work with files and folders on your computer.

- **Best for**: writing and revising PRDs, synthesizing batches of customer feedback, preparing decision memos, anything you do repeatedly against the same product knowledge.
- **The trade-off**: worth a one-time setup investment. Keep the uploaded documents current, or the AI confidently works from stale strategy.
- **Tolerable overhead**: minutes of setup, repaid every session after.

### Category C — Repo-aware analysis (Claude Code, with your team)

The unit of work is **the codebase question**. Claude Code lives where the engineers' code lives and can explore it directly. You probably won't run it alone at first — but sitting with an engineer (or using a team setup someone has prepared), it answers questions no document can: *What does the system actually do when a user cancels? Is this feature flag still used? How big is this change really?*

- **Best for**: validating that documentation matches reality, scoping questions before committing to a roadmap date, understanding why "small" requests aren't small.
- **The trade-off**: technical setup, and answers arrive in minutes, not seconds.
- **Tolerable overhead**: high — reserve it for questions where the source of truth is the code itself.

> 💡 The pattern among effective product people isn't choosing one — it's a **stack**: quick chat for throwaway questions, a Project for recurring document work, and access to repo-aware analysis (usually through the team) for ground-truth questions. It's not an either/or choice; it's an architecture.

## Four practical criteria

When choosing where a task goes, skip the benchmark charts and apply four questions:

1. **How much context does the task need?** A one-off question needs none — quick chat. A PRD revision needs your product knowledge — Project. A feasibility question needs the actual system — repo-aware.
2. **Will you do this again?** Recurring tasks justify setup. If you'll summarize customer feedback every sprint, build the Project once instead of pasting the same background forever.
3. **What's your confidentiality policy?** Know your company's rules before pasting customer data, financials, or unreleased plans anywhere. Team and Enterprise plans exist largely to answer this question — ask what your organization has.
4. **What's the cost of being wrong?** For a brainstorm, any tool. For a decision memo going to executives, use the setup that sees the most relevant context — errors are cheaper to prevent than to catch.

## The trap: confusing model with tool

Almost every serious AI product gives you access to a top-tier model now. So "does this tool use the best model?" is nearly always "yes." The real difference is everything around it: what the tool can see, remember, and do. A frontier model in a blank chat will lose to a mid-tier setup that actually knows your product.

The anti-patterns worth naming:

- **"The company pays for X, so X is what I use for everything"** — availability is not fit. A tool that's excellent for quick answers can be the wrong home for your PRD workflow.
- **"A new model came out, I should switch tools"** — your current tool will likely offer that model within days. Switching costs you accumulated context and habits for nothing.
- **"I keep trying new tools to find the best one"** — the eternal-evaluator syndrome. The real learning curve is in context and prompting, not in tool-hopping. Improvements there transfer; tool-specific tricks don't.

## What to take from this page

1. Don't memorize product comparisons — the market changes monthly. Memorize the **three categories** and the **four criteria**. Those transfer.
2. Check your own stack: do you have a home for quick questions, for document-heavy work, and a route to repo-aware answers? If one is missing, you know what to set up.
3. Before blaming (or switching) a tool, ask: is this a tool problem, or a problem with how I'm using it? Most "the AI got it wrong" complaints are really Pillar 2 (context) or Pillar 3 (prompt) problems.

## 🛠️ Try it with Claude

```
Here are the AI-assisted tasks I do (or want to do) in a typical week as a PM: [list them — e.g., drafting PRDs, summarizing user interviews, writing release notes, answering stakeholder questions, estimating scope]. Sort them into three buckets: quick chat (no context needed), persistent workspace (recurring, needs my product documents), and repo-aware (needs the actual system as source of truth). Flag any task where I'd need to check confidentiality rules first.
```

```
I want to set up a Claude Project as my standing workspace for product work on [product name]. Recommend the 5-8 documents I should upload to give it durable, high-signal context (think: strategy, personas, glossary, templates), explain what each contributes, and tell me which kinds of documents I should NOT bother uploading because they go stale too fast.
```

```
I'm a non-technical PM. Draft a short message to my engineering lead proposing a 30-minute working session where we use their AI coding assistant to answer three product questions straight from the codebase. Help me pick the three highest-value questions from this list: [paste candidate questions, e.g., "is X still used?", "what happens when a user does Y?", "how big is change Z really?"].
```
