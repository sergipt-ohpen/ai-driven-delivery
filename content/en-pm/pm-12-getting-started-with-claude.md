# ▶️ Getting Started with Claude

> This page takes you from "I have an account somewhere" to "I have a working setup and I've run my first real session." No terminal, no installs beyond an app — just the decisions and the first hour that determine whether Claude becomes a daily tool or a forgotten tab.

## The three ways to use Claude

Anthropic ships Claude in three forms. As a product person you'll mainly use the first two, and you should *understand* the third:

- **claude.ai (web chat)**: the browser interface. Conversations, file uploads, Projects, artifacts. This is your home base — nothing to install, works anywhere.
- **Claude Desktop**: the same experience as a native app, plus deeper integrations — it can connect to tools on your machine and to external services (Google Drive, Slack, Jira and more via connectors). Worth installing if Claude becomes part of your daily routine.
- **Claude Code**: the agentic tool your engineers use inside their terminal and codebase. It reads the code, plans changes, edits files, and runs tests. You won't drive it yourself, but knowing it exists changes conversations with your team — you can pair with an engineer on a Claude Code session to explore the codebase, validate a spec against reality, or watch a feature get scaffolded live.

The good news: the skills transfer. How you provide context, how you prompt, how you review output — it's the same craft across all three surfaces.

## Plans, at the altitude you need

You don't need to memorize a pricing table. You need three facts:

1. **The free tier is for evaluation, not for work.** Usage limits will interrupt you mid-task.
2. **A paid individual plan (Pro tier) is the sensible starting point** — around the cost of a couple of business lunches per month. It unlocks Projects, higher limits, and the stronger models. Upgrade to a bigger plan only when you're *consistently* hitting limits, not preemptively.
3. **For teams, there are Team and Enterprise plans** with centralized billing, admin controls, and stronger data governance guarantees. If your company adopts Claude broadly, that's an IT/procurement conversation — flag it early.

Rule of pocket: an upgrade makes sense when limits interrupt your work more than a couple of times a week. Otherwise, stay put.

## Your week-one setup

Spending one focused hour here pays back every session afterward. Three moves:

### 1. Create a Project for your product

In claude.ai, a **Project** is a persistent workspace with its own knowledge base. Every conversation inside it automatically has access to the files you've added. Create one per product (or per major workstream) and load it with:

- Product vision / strategy one-pager
- Current roadmap or quarterly OKRs
- Personas or key customer segments
- Glossary of internal terms and acronyms
- A recent product spec that represents "what good looks like" in your org

This is the equivalent of what engineers do when they give Claude Code a context file describing their codebase: **stop re-explaining your world in every conversation.**

### 2. Write custom instructions

Projects support custom instructions — standing guidance applied to every chat. Tell Claude who you are, what your product does in one sentence, your preferred output formats ("user stories in Given/When/Then," "summaries as bullet points, max 10"), and what to avoid ("don't invent metrics; ask if data is missing").

### 3. Decide your recurring use cases

Pick two or three workflows you'll run weekly — meeting-notes-to-actions, PRD first drafts, customer feedback synthesis. Depth in a few workflows beats shallow dabbling across twenty.

## What a good first real session looks like

Don't start with "write me a PRD." Start with a task where Claude analyzes something you already know well — so you can judge the quality of its output.

A strong pattern: paste in real material (a feature brief, a batch of customer feedback, last quarter's roadmap) and ask for **analysis only, no artifacts**. For example: "Read this brief and tell me what's ambiguous, what's missing, and what questions engineering will ask." You'll immediately feel the difference between Claude-with-context and generic chatbot output.

Notice what happens in a good session:

- Claude asks or surfaces questions rather than bluffing past gaps.
- You iterate: its first answer is a draft you push back on, not a verdict.
- You stay the decision-maker; Claude does the legwork.

## Day-one anti-patterns

The same mistakes show up in almost everyone's first week. Recognize them early:

- **Starting with zero context.** You ask for a roadmap review without sharing the roadmap, strategy, or constraints — then blame the generic answer. Antidote: set up the Project first. Thirty minutes of setup saves hundreds of repeated explanations.
- **The 800-word monster prompt.** You try to specify everything in one giant message. It works worse than a short prompt followed by iteration, because you lose the chance to correct course midway. Antidote: shorter asks, review, refine.
- **Accepting the first draft without reading it.** If you can't explain the output to a colleague in one sentence, you haven't reviewed it — you've rubber-stamped it. Whatever ships still carries your name.
- **One endless conversation for everything.** After 50 mixed-topic messages, quality degrades — the conversation "forgets" early details. New task → new chat. Your Project knowledge reloads automatically, so starting fresh is cheap.

The underlying mindset shift: Claude is a **collaborator that iterates**, not an oracle that answers. Plan for a back-and-forth, and the quality compounds.

## 🛠️ Try it with Claude

```
I'm a product manager setting up a Claude Project for [product name].
Here's a short description of the product, our customers, and my role: [paste].
Draft custom instructions for this Project: who I am, output format
preferences, terminology to use, and things Claude should always ask
me about instead of assuming. Keep it under 200 words.
```

```
Here is a feature brief I wrote recently: [paste brief].
Don't rewrite it. Instead, tell me: (1) what's ambiguous, (2) what's
missing that engineering will ask about, (3) which assumptions I'm
making without stating them. Rank by how likely each is to cause
rework later.
```

```
I want to build 3 weekly workflows with Claude. My recurring PM tasks
are: [list your actual tasks — e.g., stakeholder updates, backlog
grooming, feedback triage]. For each, propose how Claude could help,
what context I'd need to provide, and a reusable prompt I can save.
```
