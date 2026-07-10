# 🗒️ The 3-Pillar Mental Model 🔴 — 11 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 11 min

> If you've come here expecting to learn "the ultimate trick" for using Claude Code or Cursor, this session is going to disappoint you. Because the reality is that **there is no trick**. There is a mental model, and that model rests on three co-equal pillars. All three matter. If you neglect one, the others don't make up for it.

## The bottleneck is no longer the model

You've probably seen the meme: "GPT-X is out, and now developers are really done for." Every frontier model release comes with an implicit promise that **this time** productivity will really multiply. And yet, the data doesn't back up that narrative.

-   **METR (July 2025)** ran an RCT with senior OSS developers working in repos where they had 5+ years of experience. Result: with AI enabled they **took 19% LONGER** to close tasks. They predicted −24%, they perceived −20%. The reality: +19%.
    
-   **METR update (February 2026)** on the same developers after 7 additional months of experience: the effect flipped to **−18% (faster)**, but with a huge confidence interval: −38% to +9%. For new developers recruited into the study, the effect remains within the noise (−4%, CI −15% to +9%).
    
-   **arXiv 2510.10165 (October 2025)** demonstrated something more uncomfortable: in repositories with high Copilot adoption, **core developers produce 19% less original code** and **review 6.5% more** AI-generated code from others. AI doesn't reduce work: it transfers it from the author to the reviewer.
    

> 💡 **The correct reading of this data is not "AI doesn't work"**. It's: AI **works conditionally** — on the tool, the context, and the prompt. And seniors who expect automatic gains because the model got better stay exactly where they were.

## The experiment that changes the perspective

Scale AI published a data point in 2026 that's worth committing to memory:

> The **same model**, Claude Opus 4.5, scores **80.9% on SWE-Bench Verified** (the standard benchmark) and **45.9% on SWE-Bench Pro** (the same problem with more realistic, multi-language scaffolding).
> 
> **35 points of difference. Same model. Same day.**

Where does the difference come from? From the **harness**: the scaffolding that surrounds the model (what files it reads, what tools it has, what rules it follows, what context it receives, how it's spoken to). The model is the engine; the harness is the car, the roads, and the driver.

Birgitta Böckeler (Thoughtworks, April 2026) formalizes it like this:

```
Agente = Modelo + Scaffolding
```

Where *Scaffolding* includes tools, instructions, sensors, constraints, and memory. Mitchell Hashimoto (Vagrant, HashiCorp) takes the same intuition to a slogan that circulates among senior devs: **"Engineer the harness, not the prompt."**

OpenAI published a memo in February 2026 titled *Harness Engineering: leveraging Codex in an agent-first world*. Anthropic picks it up in its official documentation. Karpathy tweets it as "context engineering > prompt engineering". Tobi Lütke (CEO of Shopify) gives it the status of corporate practice. The senior consensus in 2026 is clear: **the prompt is the tip of the iceberg.**

## The 3 pillars: this master's framework

In this master's program we're going to work with **three pillars that determine the effectiveness of any AI copilot**, in order of increasing depth:

```diagram
┌─────────────────────────────────────────────────┐
│                                                 │
│  PROMPT      ← lo que dices en cada turno       │
│                                                 │
│  CONTEXTO    ← lo que el modelo "sabe" y "ve"   │
│                                                 │
│  HERRAMIENTA ← qué modelo + qué harness         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Pillar 1 — Tool

It's not just "which model". It's the **model + harness** combination: what tools it has available (Read, Edit, Bash, Grep, MCP servers...), what security policies it applies, what workflows it supports (plan mode, sub-agents, hooks), how it integrates with your IDE/terminal/PR. The same Claude Sonnet 4.6 inside Cursor, Claude Code, and a custom wrapper **behaves differently**, not because the model changes, but because the harness changes.

### Pillar 2 — Context

What the model has in its window when it responds. **"Having access to the codebase" is not the same as "having the codebase in context"**. The distinction matters more and more in 2026 because benchmarks show that model quality **degrades as context size grows** (Chroma, July 2025) — the 1M-token window is a ceiling, not a target. Context is managed, curated, reduced, isolated. That's why the discipline called *context engineering* is emerging.

### Pillar 3 — Prompt

What you write in each turn. It's the most visible part and, paradoxically, the **least differentiating** among seniors. A good prompt on a bad harness with bad context produces bad results. A mediocre prompt on a good harness with good context produces acceptable results. Even so, the prompt matters: it defines the task, the success criteria, and the constraints. It just needs to be demystified.

## Why the three are co-equal

Let's go back to the Scale AI data point: **35 points from scaffolding**. That's only pillar 1 (tool). If on top of that you add:

-   **Context rot**: documented drops of up to 30+ points when key information is poorly positioned in the context (Liu et al., *Lost in the Middle*, TACL 2024) — pillar 2.
    
-   **Vague prompts vs explicit success criteria**: a measurable empirical difference in first-pass acceptance rate of PRs — pillar 3.
    

The three levers operate at the same order of magnitude. **Optimizing only one and neglecting the other two is like tuning a car's engine with flat tires**: you gain power that never reaches the asphalt.

## Connection with the 2026 senior literature

What we call *the 3 pillars* in this master's program is our accessible way of unifying three disciplines that the industry names separately:

Our pillar Industry discipline Reference figures who teach it **Tool** *Harness Engineering* / *Scaffolding* Birgitta Böckeler ([martinfowler.com](http://martinfowler.com/)), OpenAI Codex memo, Mitchell Hashimoto **Context** *Context Engineering* / *ContextOps* Andrej Karpathy, Simon Willison, Lance Martin (LangChain), Anthropic docs **Prompt** *Prompt Engineering* (reclassified) Anthropic best practices, OpenAI Cookbook, Phil Schmid

> 💡 **Why we unify**: because the three disciplines overlap in practice, and separating them into three isolated blocks creates the false impression that there are three distinct specialists. The truth is that the effective senior dev in 2026 handles all three simultaneously, and needs a single mental model to make decisions.

## The meta-message of this session

If I had to reduce the next 4 pages to a single sentence, it would be:

> **"In 2026, the productivity variance among seniors is not explained by the model they use, but by how they configure their harness, what they put into the context, and how they formulate their prompts."**

If you internalize that, the rest of the session is engineering: how to choose a tool, how to curate context, how to write prompts. If you **don't** internalize it, you'll leave the session thinking you learned "Claude Code tricks", and the next time you switch tools you'll feel like you're starting over.

Tricks don't transfer. The mental model does.

## Before moving on to lesson 2

Make sure you've solidified these four points:

1.  **The model is not the bottleneck** in 2026 for senior devs (as demonstrated by METR, arXiv 2510.10165, DORA 2025).
    
2.  **The harness explains differences on the order of 35 points** in comparable benchmarks (Scale AI, SWE-Bench Verified vs Pro).
    
3.  **The 3 pillars — Tool, Context, Prompt — are co-equal**, not hierarchical. Optimizing only one doesn't make up for neglecting the other two.
    
4.  **What we call pillars here unifies three industry disciplines**: Harness Engineering, Context Engineering, and Prompt Engineering.
    

In lesson 2 we dive into pillar 1 — The Tool — and you'll come out with a concrete decision matrix for choosing a copilot based on your project, not your intuition.

> 📚 **Resources to go deeper into this pillar**: they are unified in **lesson 5 — Additional resources**, in the "General mental model" section. There you'll find the key readings and references to reinforce what you've seen in this lesson.
