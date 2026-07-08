# 📂 Pillar 2 — Context Is Everything

Context — what the AI can actually see when it answers you — is the real bottleneck of working with AI assistants. This page gives you the discipline the industry calls *context engineering*: what to put in front of Claude, what to leave out, how to organize it, and how to avoid the silent quality decay that sets in as conversations grow.

## The founding misunderstanding

Nearly everyone starts with the same naive move:

> *"Claude can handle enormous amounts of text. I'll dump in the full PRD, the roadmap, six months of customer feedback, the last ten meeting notes... and let it figure things out."*

It sounds reasonable. It's the opposite of what works.

**A large context window is a ceiling, not a target.** The most relevant research on AI models shows that answer quality **degrades as the amount of input grows** — long before the window is full, and even on simple tasks.

## Context rot: why more input means worse answers

In 2025, researchers tested 18 leading AI models by progressively extending the input while keeping the task fixed. The findings were consistent:

- **Every model degraded** as input grew. No exceptions.
- Degradation started **well before the window filled** — often at 30-50% of capacity.
- Tasks requiring reasoning (not just finding a fact) degraded **even more sharply**.

Earlier research adds a twist any PM will recognize from human meetings: models pay most attention to the **beginning and end** of what they're given. Key information buried in the middle of a long dump can lose 30+ points of accuracy. And "distractors" — content that *looks* relevant but isn't, like last year's roadmap sitting next to this year's — confuse the model more than obvious noise does.

Practical rules of thumb from heavy users: past roughly the halfway point of a long session, quality noticeably drops; well before the end, you're better off summarizing and starting fresh.

> 💡 The metric that matters is not "how much can I fit in?" but **"how information-dense is what the AI is looking at right now?"** Context is curated actively, not accumulated passively.

## What to give Claude — a PM's context inventory

Think of your context in four types, from most to least durable:

1. **Standing knowledge** — what's always true: product strategy, target personas, glossary of your product's terms, your PRD template, team conventions ("we write acceptance criteria in Given/When/Then"). This belongs in a Project or a standing document, loaded once, refreshed when it changes.
2. **Task artifacts** — the documents this specific task is about: the draft PRD you're revising, the feedback batch you're synthesizing, the two competing proposals you're comparing. Provide these explicitly, in full.
3. **Reference material** — things Claude *might* need: related tickets, the older spec, that competitor teardown. Mention that they exist and provide on request, rather than pasting preemptively.
4. **Noise** — everything "just in case": old drafts, tangential threads, the full export of the Slack channel. Leave it out. Every irrelevant document is a distractor that actively degrades the answer.

> ⚠ **Anti-pattern**: including material "just in case." If you're not fairly sure Claude needs a document for this task, don't include it — offer it instead ("I also have the Q2 research report if useful").

### What happens when you don't give context

Claude doesn't say "I don't know your product." It fills the gaps with plausible generic assumptions — a generic user, a generic industry, generic priorities. The output *looks* fine, which is exactly the danger: you get a competent PRD for a product that isn't quite yours, with acceptance criteria your team wouldn't write and edge cases that don't match your users. The failure is silent. When AI output feels "generic but polished," the diagnosis is almost always missing context, not a bad model.

## Standing context: write it once, benefit every session

Developer teams keep a small file in each project that their AI assistants read automatically — the project's rules and gotchas, in under a page. The PM equivalent is a **product context document** you reuse everywhere (as a Project's knowledge, or a doc you attach to start sessions):

- **What the product is**, in three sentences, and who it's for.
- **Vocabulary**: what *your team* means by "workspace," "activation," "enterprise tier."
- **Conventions**: how you write stories, what a "Ready" ticket must contain, your prioritization framework.
- **Gotchas**: the non-obvious constraints ("we can't change pricing copy without legal review," "the mobile app lags web by one release").

Best practices carry over directly from the developer world: keep it **short and high-signal** (if you include the obvious, the AI ignores it along with the important parts), make rules explicit in both directions ("always X, never Y" — negative rules work as well as positive ones), and **keep it current** — stale instructions are worse than none. Treat it like a real team asset: reviewed, versioned, owned.

## Four moves for managing context

The industry has converged on four verbs. All translate cleanly to product work:

1. **Write** — persist things outside the conversation. When a long working session ends, ask Claude to write a half-page "state of work: decisions made, open questions, next step." Start the next session from that summary instead of a bloated thread.
2. **Select** — bring in only what this task needs. Choosing three relevant documents beats uploading thirty.
3. **Compress** — when a session gets long and answers start drifting, don't push on. Ask for a summary of where things stand and restart fresh with just that.
4. **Isolate** — keep separate jobs in separate conversations. Don't synthesize interviews, draft the PRD, and write the stakeholder email in one endless thread; each task gets clean context, and one task's verbosity doesn't pollute the next. (Developer tools automate this with "sub-agents" — the principle is the same.)

## Your context kit

If you take only five practices from this page:

1. **Build a short, high-signal product context document** and reuse it everywhere. Under a page. Refresh it when strategy or vocabulary changes.
2. **Curate, don't accumulate**: before each task, consciously decide what Claude needs to see. Resist "just in case."
3. **Watch for the generic-but-polished smell** — it means missing context, and the fix is giving more of the right input, not rephrasing the question.
4. **Summarize and restart long sessions** rather than pushing a degrading thread further.
5. **One task, one conversation.** Separate jobs get separate contexts.

## 🛠️ Try it with Claude

```
Help me build a one-page "product context document" I can reuse with AI assistants. Interview me one question at a time about: what the product is and who it's for, the vocabulary my team uses, how we write stories and acceptance criteria, and our non-obvious constraints and gotchas. Then draft the document — maximum one page, high-signal only, no generic filler.
```

```
Here's a task and the context I was planning to give you: [describe the task, then list every document/source you were going to include]. Before doing the task, audit the context: which items are essential, which are "just in case" noise that could degrade your answer, and what's missing that you'd need to avoid making generic assumptions? Ask me for anything critical that's absent.
```

```
We've been working in this conversation for a while and I want to start a fresh session without losing progress. Write a handover summary of maximum half a page: the goal, the decisions made so far and why, open questions, and the immediate next step. Make it self-contained so a fresh conversation (or a colleague) could pick up from it alone.
```
