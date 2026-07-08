# 🚀 What AI Actually Does in Software Delivery Today

> In February 2026, Andrej Karpathy — one of the founders of OpenAI — declared that "vibe coding" was already out of fashion and proposed a new term for 2026: **agentic engineering**. In 18 months the industry went from "AI suggests lines of code" to "AI executes tasks for 200 minutes straight." As a product person, you don't need to write that code — but you do need to understand what this shift means for how your team ships.

## The bottleneck has moved

The single most important idea on this page: the bottleneck in software delivery is no longer **writing code**. It is now **defining what to build, giving the AI effective context, and validating that what it produces is actually useful**.

Read that again, because it describes your job. Definition, context, and validation are product skills. AI didn't make product management less relevant — it moved the constraint closer to you.

## What the hard data says (2025–2026)

### Adoption is nearly universal

- **Stack Overflow Developer Survey 2025** (49,000 responses, 177 countries): **84%** of developers use or plan to use AI tools (up from 76% in 2024). **51%** use them every day.
- **DORA 2025** (Google Cloud, ~5,000 professionals): **90%** use AI at work (+14 points vs. 2024).
- **GitHub Octoverse 2025**: 180 million developers on GitHub (+36M in one year — roughly one new developer per second). **80%** of new developers use Copilot in their first week.

If your engineering team says they're using AI, they almost certainly are. The real question is whether they're using it well.

### But trust is falling

- Trust in AI answers dropped from **40% (2024) to 29% (2025)**. **46%** of developers actively distrust it.
- Only **3%** report "high confidence" in AI output.
- **75%** still prefer asking a human when they doubt an AI answer.

This tension — near-universal adoption, falling trust — is the honest state of the industry. Treat any vendor pitch that ignores it with suspicion.

## The productivity paradox: the myth-buster every PM should know

The most important study to have in your back pocket when someone promises "AI will double our velocity":

> **METR study (July 2025)**: a randomized controlled trial with 16 experienced developers working on large, mature open-source codebases, across 246 real tasks, using a leading AI coding tool.
>
> - Developers **predicted** they would be **24% faster** with AI.
> - **After** the experiment, they believed they had been **20% faster**.
> - **In reality, they were 19% slower.**

How to read this without drawing the wrong conclusion:

- On **new projects and simple tasks**, gains are real and sometimes large (Stanford reports up to +30–40% in these contexts).
- On **legacy, complex codebases with implicit conventions**, AI adds overhead: validating output, reworking near-misses, switching context. And people's perception of their own speed is unreliable.
- **Measure, don't assume.** For your roadmap, that means: don't bake AI productivity gains into commitments until your team has measured them on your actual codebase.

A related finding (Stanford, October 2025): after Copilot was introduced in teams, senior developers reviewed **6.5% more code** but produced **19% less original code** of their own. AI-generated work shifts the load toward your most experienced engineers, who spend more time reviewing. If your seniors seem busier despite "AI acceleration," this is why.

## From vibe coding to agentic engineering

Karpathy's framing of the evolution:

- **Software 1.0**: classic code written by humans.
- **Software 2.0**: machine learning models, where the trained model is the "code."
- **Software 3.0**: AI systems you program in plain natural language — prompts become the code.

"Vibe coding" (his term from early 2025) meant chatting with an AI and letting it write software while "forgetting the code exists." By 2026 he'd retired it in favor of **agentic engineering**: professional use with supervision, oversight, and rigor. That distinction — demo-grade vs. production-grade AI use — is exactly the line your team needs to stay on the right side of, and it's fair for you to ask how they do it.

## Follow the money

The scale of investment tells you this is not a passing trend (figures as of April 2026):

- **Cursor (Anysphere)**: USD **2 billion in annual recurring revenue** by February 2026 — the fastest B2B company ever to reach that mark. Valuation discussed at USD 50–60B.
- **Cognition (Devin + Windsurf)**: funding round discussed at a USD **25 billion valuation** (up from USD 10.2B in September 2025).
- **Total AI coding tools market**: estimated at USD 7.4–12.8B in 2026, projected to reach USD 26–30B by 2030.
- **GitHub Copilot**: 20 million total users, 4.7 million paid (+75% year over year), adopted by **90% of the Fortune 100**.

Don't memorize the numbers — internalize the magnitude. No moment in software history has seen this level of investment in tools that change how individual contributors work. That obliges every product leader to have an informed opinion about them.

## What this means for you as a PM

1. **Don't expect automatic productivity gains.** A 10–20% average is realistic; greenfield work can deliver much more, legacy work can go negative. Push for measurement on your team's real work before adjusting plans.
2. **Expect the review burden to shift to seniors.** More code review, more validation, more architectural decisions. Factor this into capacity conversations and the team's definition of Done.
3. **Your leverage is problem framing and context.** The scarce skill is no longer typing code — it's defining the problem precisely enough that humans and AI agents can execute it. That's a product competency.
4. **The market is consolidating fast.** Your team doesn't need to master ten tools; they need to master one or two well. The same goes for you.

## 🛠️ Try it with Claude

```
I'm a product manager. My engineering lead says adopting AI coding tools will make the team "at least 30% faster." Based on current evidence (the METR 2025 study, DORA 2025, Stack Overflow 2025), help me draft 5 sharp but constructive questions to test that claim, plus a simple way we could measure actual impact on our own delivery over one quarter.
```

```
Here is a feature idea from my backlog: [paste a one-line feature idea]. The bottleneck in AI-assisted delivery is problem definition, not coding. Rewrite this idea as a well-framed problem statement: the user, the pain, the evidence we have, what success looks like, and 3 open questions engineering will ask me. Flag anything I've left ambiguous.
```

```
Help me prepare a 10-minute briefing for my stakeholders titled "What AI coding tools actually change for our roadmap." Cover: realistic productivity expectations (including where AI can slow teams down), where the review burden shifts, and 3 things we should measure before promising faster delivery. Keep it non-technical and skeptical of hype.
```
