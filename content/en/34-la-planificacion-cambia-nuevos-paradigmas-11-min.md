# 📄 Planning changes: new paradigms 🔴— 11 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 11 min

## The shift almost nobody is naming

For 20 years, agile planning had a stable geometry: the bottleneck was **implementation**. We refined stories, estimated them in story points, and the team's actual velocity was measured against that estimate. If something went wrong, it was almost always because the story was misunderstood or bigger than it appeared. AI hasn't changed that geometry — **it has inverted it**.

Today a senior dev with Claude Code can turn a well-defined story into mergeable code in hours, not days. What used to be the most expensive block of the cycle (writing the code) has become the cheapest. The bottleneck has shifted:

-   🔼 **Before**: expensive implementation → quick, approximate planning was enough.
    
-   🔽 **Now**: cheap implementation → poorly done planning is where time gets lost.
    

If the story lacks sufficient context, clear acceptance criteria, and mapped dependencies, the copilot produces code fast, but **it's not the code you needed**. And redoing work in the AI era is deceptively cheap: the cost isn't the line of code, it's the time spent reviewing, deciding, aligning. That part doesn't get faster with a bigger model.

> ⚠ **The new cost of bad planning isn't writing the wrong code. It's reviewing the wrong code.**
> 
> And that's done by an expensive human, not an agent.

---

## From task planning to capability planning

Start noticing the language. When a PM used to ask "how many tasks fit in the sprint?", the reasonable thing was to count items and estimate points. Now the right question is different:

> *What team capabilities + copilot capabilities combine to deliver this set of outcomes?*

The difference is operational, not semantic:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/1af5ccc8-032e-453f-acf3-d5a1d23fa7be/3bfcf9abb377cca4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

The senior's job when planning is no longer "splitting features into small tasks". It's **designing the conditions under which a task can be completed quickly**: a clear spec, context in `AGENTS.md`, MCPs configured, reference tests accessible. If those conditions exist, the task is trivial. If not, no model will save you.

---

## Real adoption in planning, not hype

The data that matters isn't copilot adoption for writing code (we saw that in the pre-course). What's new is that AI is already entering **the planning layer**, and at a serious pace:

-   📊 **AI4Agile Practitioners Report 2026**: **83% of agile practitioners** use AI somewhere in their flow, although most still use it in a small portion of their work. Adoption is there; maturity isn't yet.
    
-   📊 **Atlassian Q2 FY26**: **Rovo (the AI layer of Jira/Confluence) crossed 5 million MAU**. It's the highest adoption figure ever reported for an AI layer in an enterprise PM tool.
    
-   📊 **Linear (CEO Karri Saarinen, March 2026)**: coding agents are already installed in **75% of Linear's enterprise workspaces**, and the volume of work done by agents has multiplied by 5 in the last 3 months.
    
-   📊 **Capgemini 2024 (cited in 2026 literature)**: AI-assisted generation of acceptance criteria reduces sprint rework by around **15%**. It's not a giant boost, but it's the kind of compounding improvement you can't afford to ignore on a 12-month horizon.
    

> 💡 **Senior takeaway**: the adoption pattern is the same as with Copilot in 2022-2023. First engineers use it for individual tasks, then it infiltrates the team's processes. If your team doesn't yet have AI in refinement or sprint planning, in 12 months you will — and the latecomers will configure it badly because they didn't understand the theory.

🎥 **Recommended video** — *Introducing Linear Agent* (1:30 min, EN, official Linear, March 2026). The agent launch with concrete use cases in just 90 seconds.

📺 [https://www.youtube.com/watch?v=mRql2VJ99gM](https://www.youtube.com/watch?v=mRql2VJ99gM)

---

## The 3 traps for seniors estimating with AI

This is where the experienced dev stumbles most, precisely because their pre-AI intuition was good. All three masquerade as common sense.

### Trap 1 — Optimism by contagion

When the copilot generates a proposal decomposing an epic into 6 stories in 30 seconds, your brain **calibrates against the generation time, not against the real complexity**. A story that took 3 seconds to appear "feels" small. It's the cognitive fluency bias: whatever is processed easily seems simple.

🛡 **Countermeasure**: separate generation from estimation by time and by person. Generate with the copilot, let it rest, and estimate the next day with a human who hasn't seen the generation.

### Trap 2 — False precision

You ask the AI for estimates and it returns "3.5 points" or "4.2 hours". That decimal precision is fictitious: the model is averaging patterns from its dataset, not measuring your codebase. But it sounds more sophisticated than a human's round 3 or 5 and slips into the ticket.

🛡 **Countermeasure**: always round to the team's discrete scale (Fibonacci, t-shirts). The AI can *suggest* the bucket, not the decimal.

### Trap 3 — Story homogenization

If you ask the copilot to "decompose this PRD into user stories", all the stories will come out with the same shape, the same level of detail, and the same tone. That masks the fact that some are trivial (basic CRUD) and others hide real complexity (synchronization, concurrency, flaky integrations).

🛡 **Countermeasure**: ask the copilot to **classify** the stories into complexity buckets before asking for AC. Explicit heterogeneity rescues the information that the uniform format erases.

---

## The most expensive bias: confusing velocity with productivity

This one deserves its own section because it's showing up in 2026 reports with a specific name.

> 📊 **DORA 2025**: **42% of teams admit to manipulating velocity metrics** when they're tied to performance reviews. With AI, this accelerates because it's easier to "fill the sprint" with stories that were effectively generated and completed with minimal human input. Velocity goes up. Value delivered, not necessarily.

📊 **Faros AI Engineering Report 2026** (telemetry from 22,000 devs over 2 years): teams with high AI adoption show **PR sizes +150%** and **bug counts +9%** compared to teams without AI. More code, faster, more bugs. The tradeoff is real and must be planned for, not hidden under inflated velocity.

> ⚠ **What you must do in S4 and always**:
> 
> -   Velocity remains useful **only as a planning tool**, never as a performance KPI.
>     
> -   If you're going to measure real productivity, look at **outcomes** (DORA: deploy frequency, lead time, MTTR, change failure rate) — not story points.
>     
> -   Tag PRs generated by agents (`copilot`, `claude-code`, etc.) and report quality by origin. If agent PRs have 3× more bugs than human ones, velocity is lying.
>     

---

## The new geometry of uncertainty

If you had to draw where risk concentrates in a project in 2026 vs 2020, the peaks have shifted:

```diagram
2020 (sin IA):                2026 (con IA):
   ▁▂▆█▆▂▁                       ▆██▂▁▁▁▂▆
   D R I T D                      D R I T D
                                  ▲ ▲     ▲
                                  donde está
                                  el riesgo ahora
```

(D=Discovery, R=Refinement, I=Implementation, T=Testing, D=Deployment)

The operational conclusion is direct: **you invest more in discovery and refinement, less in implementation, and you invest heavily again in deployment** (because there's more code and more attack surface). Planning moves toward the extremes.
