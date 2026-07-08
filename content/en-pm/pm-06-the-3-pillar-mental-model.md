# 🗒️ The 3-Pillar Mental Model

If you arrived here hoping to learn "the one trick" for getting great results out of Claude, this page will disappoint you. There is no trick. There's a mental model, and it rests on three pillars that matter equally. Neglect one, and the other two won't compensate.

## The model is no longer the bottleneck

Every new AI model launch comes with an implicit promise: *this time* productivity will multiply. The data tells a more interesting story.

A rigorous 2025 study (METR) found that experienced developers using AI on familiar projects were actually **19% slower** — while believing they were 20% faster. A follow-up after seven more months of practice showed the effect flipping to genuinely faster, but only for people who had put in the time to learn how to work with the tools. Other research found that in teams with heavy AI adoption, work didn't disappear — it **shifted from creating to reviewing**. Sound familiar? It should: the same thing is happening to product work. AI drafts the PRD in minutes; the expensive part is now the human judging whether it's right.

The correct reading of this data is not "AI doesn't work." It's: **AI works conditionally** — conditioned on the tool you use, the context you give it, and how you ask. People who expect automatic gains just because the model improved stay exactly where they were.

## Same AI, wildly different results

Here's the finding worth memorizing. In benchmark testing, the **exact same Claude model** scored 81% on a task suite under one setup and 46% on essentially the same problems under a more realistic setup. **35 points of difference. Same model. Same day.**

Where did the gap come from? From everything *around* the model: what information it could see, what it was allowed to do, how it was instructed. The industry shorthand: the model is the engine; everything around it is the car, the road, and the driver. Two PMs with identical Claude subscriptions can get radically different value for exactly this reason — one is driving a well-set-up car, the other is revving an engine on blocks.

## The three pillars

This guide works with three pillars that determine the effectiveness of any AI assistant:

```
PROMPT    ← what you say in each message

CONTEXT   ← what the AI "knows" and "sees" when it answers

TOOL      ← which product you're using, and what it can access and do
```

### Pillar 1 — The Tool

Not just "which model." It's the combination of model plus everything around it: can it read your documents? Search your files? Remember your product's conventions across sessions? The same Claude behaves very differently in a quick chat at claude.ai versus a Project loaded with your PRDs versus Claude Code sitting inside your team's repository. The model didn't change — the setup did.

### Pillar 2 — Context

What the AI actually has in front of it when it answers. There's a crucial distinction here: *having access to* your roadmap is not the same as *having the roadmap in view* for this specific question. And more is not better — research consistently shows that quality **degrades as context grows**, so the skill is curation, not accumulation. Context gets selected, trimmed, and refreshed. This is where most disappointing AI results actually come from.

### Pillar 3 — The Prompt

What you write in each message. It's the most visible pillar and, paradoxically, the *least* differentiating. A brilliant prompt with no context in the wrong tool produces poor results; a mediocre prompt with rich context in the right tool produces acceptable ones. Prompts still matter — they define the task, the success criteria, and the constraints — but they deserve demystifying, not worship.

## Why all three are co-equal

The evidence stacks up pillar by pillar: setup alone explains 35-point swings in performance. Poorly placed context can cost 30+ points of accuracy on its own. Vague requests versus explicit success criteria produce measurably different first-draft quality. All three levers operate at the same order of magnitude.

**Optimizing one while neglecting the other two is like tuning a car engine with flat tires** — you gain power that never reaches the road.

## The meta-message

If the next three pages had to compress into one sentence:

> **The variance in results between people using the same AI isn't explained by the model they use, but by which tool they pick, what they put in its context, and how they phrase their requests.**

Internalize that, and the rest is craft: how to choose the tool, how to prepare context, how to write the ask. Skip it, and you'll collect "Claude tricks" that stop working the moment anything changes.

Tricks don't transfer. Mental models do.

## 🛠️ Try it with Claude

```
I'm a Product Manager learning to work with AI using a 3-pillar framework: the Tool (which AI product and setup), the Context (what information the AI can see), and the Prompt (how I phrase the request). Here are three recent tasks where AI results disappointed me: [describe 2-3 tasks]. For each one, diagnose which pillar was most likely the weak point and suggest one concrete fix.
```

```
Take this request I recently gave an AI assistant: "[paste a real prompt you used]". Evaluate it against the 3 pillars: What tool/setup would suit this task best? What context would the AI have needed to do this well, and did my request provide or point to it? How could the prompt itself state the goal and success criteria more clearly? Rewrite it as an improved version.
```

```
I want to run a two-week experiment to improve how I use Claude for product work (PRDs, backlog refinement, stakeholder updates). Design a simple experiment plan: pick one recurring task, define a baseline, and tell me what to change in week 1 (context only) and week 2 (prompt only) so I can see which pillar moves my results most. Keep it under a page.
```
