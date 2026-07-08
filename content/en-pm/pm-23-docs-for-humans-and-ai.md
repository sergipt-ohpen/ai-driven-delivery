# 🤝 Docs That Humans and AI Can Both Use

For decades, documentation had one audience: people. That quietly changed. Today a growing share of the "readers" of your product docs are AI assistants — Claude answering a support agent's question, an AI agent integrating with your API, or you loading docs into a Claude Project before a planning session. Documentation platforms now report that **more than half of their docs traffic comes from AI agents, not humans**.

This changes what "good documentation" means. The good news: writing for AI and writing for humans are almost the same discipline — AI just punishes bad docs faster.

## Docs are now context

Here's the mental model shift. A document isn't only something a person reads end to end; it's **context you hand to an AI** so its answers are grounded in your product's reality instead of its general training.

When you paste a PRD into Claude, add docs to a Claude Project, or point Claude Code at a repository, you're doing the same thing: turning documentation into context. The quality of the answers is capped by the quality of what you feed in. Stale doc in, confidently wrong answer out — delivered fluently, to someone who may not know it's wrong.

That's why the documentation deficit from the previous page has a new price tag: every gap or outdated page now degrades *every AI-assisted workflow* built on top of it.

## Documentation debt is silent — so teams now test their docs

Engineering has a saying worth borrowing: if code without tests is technical debt, docs without validation are **documentary debt**. The dangerous part is that documentary debt is silent. Broken links nobody clicks, inconsistent terminology, pages that quietly contradict each other — none of it announces itself. It just reaches the reader.

So mature teams now run automated checks on documentation the same way they test code, in four layers. You'll never configure these, but knowing they exist tells you what's reasonable to ask for:

1. **Formatting** — is the document structurally sound? (Malformed pages break docs sites and confuse AI readers alike.)
2. **Prose and terminology** — is language consistent? Tools used by GitLab, Spotify, Datadog, and Elastic automatically enforce that "backend," "back-end," and "Back End" don't coexist, flag vague words like "easy" and "just," and check inclusive language — no manual review needed. Your product glossary can be enforced the same way.
3. **Links** — do all references still resolve? A subtlety with product relevance: **external links rot without anyone touching your docs**, so good teams re-check them on a schedule, not just when docs change.
4. **Coverage** — does everything public have documentation at all? Teams can make "new feature with no docs" fail automatically, the way untested code fails.

With this in place, documentation gets the same guarantee as the product: **it can't ship broken.** That's the principle that transfers to product work, even without any machinery:

- Every product doc has an **owner** and a **"last verified" date**
- Changing a feature isn't done until the affected docs are updated
- Periodically, someone (or Claude) audits docs against reality — including whether the things docs point to still exist

## llms.txt: a welcome mat for AI readers

A convention has emerged for making docs AI-friendly: a plain-text file called **`llms.txt`** placed at the root of a project or docs site. Proposed in 2024 by the team at Answer.AI and quickly adopted by documentation platforms like Mintlify, Scalar, and Starlight, it's often described as "robots.txt for AI agents": a concise, structured summary that tells AI readers *what this product is, what it's built on, and where the canonical documentation lives*.

A minimal one reads like an executive brief:

- One paragraph on what the product is
- The key technical facts an assistant needs to get right
- Links to the authoritative docs: getting-started guide, API reference, architecture decisions

Many teams also publish an expanded companion, `llms-full.txt` — essentially all the documentation concatenated into one machine-readable file. Crucially, it's **generated automatically from the real docs, never written by hand**, so it can't drift from the source.

Is this mandatory? No. But it costs almost nothing, and it measurably reduces the odds of AI tools hallucinating about your product — including AI agents writing code *against* your product. If you publish an API or SDK, it's clearly worth it; even for internal products, it's a good habit — a single, current, canonical summary helps human newcomers just as much as it helps AI.

You won't create these files yourself, but you can put them on the team's radar — and you can review the summary text, because "describe our product accurately in ten lines" is a product skill, not an engineering one.

## What a PM can do so product docs work as AI context

Five practical moves, none requiring engineering:

1. **Keep one canonical source per topic.** AI can't tell which of your three conflicting PRDs is current. Neither can new hires. Mark superseded docs as superseded.
2. **Front-load the facts.** Start each doc with what it covers, what's current as of when, and the key decisions. Both skimming humans and AI assistants weight the opening heavily.
3. **Prefer text over screenshots.** A pricing table pasted as an image is invisible to most AI workflows. If information matters, it should exist as text.
4. **Write self-contained sections.** A section that says "as discussed in the meeting" is useless out of context. Docs get consumed in fragments — by AI retrieval and by humans searching.
5. **Date and label everything.** "Q3 plan" is ambiguous forever. "Q3 2026 plan, drafted July 2026, owner: Sergi" ages gracefully.

And borrow the terminology discipline from layer 2 above: pick one name for each feature and concept, write the list down, and use it everywhere. Inconsistent naming confuses AI retrieval today the same way it has always confused customers.

Then close the loop: use your docs *as* AI context routinely — in a Claude Project, in planning conversations — and treat every wrong answer as a docs bug. It's the fastest documentation-quality feedback loop ever invented: the AI reads everything, forgets nothing, and surfaces every contradiction you'd rather not know about.

## 🛠️ Try it with Claude

```
Here are our main product docs: [paste or attach]. Act as an AI assistant that only knows what these docs say. I'll ask you five common questions our support team gets: [list them]. Answer strictly from the docs, and after each answer tell me whether the docs were sufficient, ambiguous, or contradictory — so I know exactly what to fix.
```

```
Draft an llms.txt-style summary for our product: a 10-15 line plain-text brief with (1) one paragraph on what the product is and who it's for, (2) the key facts an AI assistant must get right, (3) a linked list of our canonical docs. Here's our current overview material: [paste]. Flag anything ambiguous that I should clarify before we publish it.
```

```
Act as a documentation linter for product docs. Here are 3 of our docs: [paste]. Check them the way engineering tools check technical docs: (1) inconsistent terminology — the same feature or concept called different names, (2) vague filler words that hide missing information, (3) undated references like "the new pricing" or "last quarter", (4) claims that contradict each other across the docs, (5) critical information that exists only in images or external links. Return a prioritized fix list, then propose the canonical glossary we should standardize on.
```
