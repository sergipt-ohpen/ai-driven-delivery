# ⏱️ AI-Assisted Estimation

## The great fake debate: story points vs hours vs t-shirts

The debate is still running, and half the industry is still wrong in one direction or another. The short version so you don't waste time:

- **Story points** measure relative complexity. Best for sprint planning, where the team calibrates against its own history.
- **T-shirt sizes** (S/M/L/XL) measure rough magnitude. Best upstream — discovery and roadmaps — where precision would be fake anyway.
- **Hours** measure elapsed time. They were always the weakest unit, and AI has now broken them completely.

### Why hours stopped working in the AI era

> ⚠ When an agent takes 3 minutes and the human reviewing takes 25, is that 28 minutes? Which one counts? What if the human also has to make two manual adjustments? The unit "hours" mixes human cognitive work with machine work, and the result is that nobody knows what they're measuring anymore.

**Operational recommendation**:

- 🎯 **Story points in Fibonacci (1, 2, 3, 5, 8, 13)** as the main technique in sprint planning.
- 🎯 **T-shirt sizes (S, M, L, XL)** upstream — discovery and 6-month roadmaps.
- 🚫 **Hours only for external reporting or billing**, never for internal sprint planning.

---

## What recent research says about LLMs and estimation

This is new, and it runs against intuition. The 2024–2026 academic literature shows that LLMs are **decent** at estimating story points without project-specific training — but "decent" doesn't mean "good," and the nuances matter:

- LLMs without fine-tuning reach accuracy comparable to purpose-built deep learning models for story point estimation, especially when given a few examples from the same project.
- Performance improves significantly when you give the model **the team's own history of already-estimated stories**. (Signal: the AI learns *your* scale.)
- Models predict **direct absolute estimates** better than comparisons between two stories. Counter-intuitive, because for humans "this one is like that one, so same size" is the natural move.
- Accuracy drops for complex stories or ones requiring domain knowledge that isn't in the prompt.

> 💡 **Operational reading**: LLMs make **good planning poker peers, not good sole estimators**. Their value is adding one more opinion to the team — not replacing the conversation.

---

## Planning poker with AI as a peer (not a referee)

The correct use of AI in estimation is as **one more participant** in planning poker, not as ground truth.

### The AI-augmented planning poker pattern

```
1. The team reads the story together (5 min).
2. Each member estimates privately (Fibonacci).
3. The AI also estimates privately, given the project
   context and the history of past estimated stories.
4. All estimates are revealed at once.
5. If there are outliers (human or AI), discuss why.
6. Do NOT average. Converge through discussion.
```

> 🎯 **The real value is in step 5**: when the AI says 8 points and the team says 3, that's a conversation worth having. Either the AI is reading hidden complexity the team underestimated (more common than you'd think), or the team has context the AI doesn't (also common). Either way, **information surfaces that wouldn't have appeared without the AI**.

🛡 **Anti-patterns to avoid**:

- ❌ **Using the AI to settle team disagreements** ("let's see what the AI says"). The AI doesn't know your system better than your team does.
- ❌ **Accepting the AI's estimate when the team has no strong opinion.** That's a shortcut for not thinking.
- ❌ **Reporting the AI's estimate to stakeholders as if it carried authority.** The AI estimates patterns; it doesn't deliver.

---

## Velocity multipliers: the mirage

If you've searched for "AI velocity multiplier" in the last 18 months, you've seen claims like "+30%", "2×", "10×". The industry is flooded with optimistic numbers. The serious data is more nuanced:

📊 **What we actually know** (synthesis of Index.dev, Faros AI 2026, Stack Overflow 2025, DORA 2025):

- On **isolated individual tasks**: ~21% more tasks completed, and nearly 2× more PRs per person on AI-adopting teams.
- On **systemic outcomes** (DORA: deploy frequency, lead time): the effect is much smaller and depends on where the team's real bottleneck is.
- For **experienced developers working on code they know deeply**: METR (July 2025) found a **19% slowdown**. A February 2026 update reduced it to -4% — but the effect is still not positive for that case.
- For **developers new to a codebase**: real acceleration (10–30%), no debate.

> 📌 **An honest multiplier for sprint planning**:
>
> - **Greenfield tasks**: speed goes up ~20–30%. Apply a prudent multiplier of **0.85** to your human baseline estimate (estimate 8, adjust to 7 — if your team has AI well adopted).
> - **Tasks on familiar legacy code**: keep the human estimate **unchanged**. The AI doesn't accelerate here; it helps with boilerplate and review.
> - **Exploration/research tasks**: the estimate is noisy by nature, AI or not. Use t-shirts (M, L, XL) and re-assess at the end of the spike.

> ⚠ **Do not multiply velocity by 2 because the team "has Claude Code now."** That's the fastest recipe for missed sprints, burned-out teams, and disenchanted stakeholders.

---

## Estimating work that isn't code

This is where almost every plan fails. AI accelerates *writing code*. It accelerates far less: debugging, code review, cross-team alignment, refinement conversations, deployment coordination, incident support, stakeholder communication.

> 💡 **Senior reading**: 70–80% of a team's time doesn't go into writing new code. It goes into debugging, review, alignment, refinement, deployment, support. **AI accelerates the part that was already small in the total.** That's why big multipliers are unrealistic for team-level outcomes.

---

## Realistic buffers: 30–40%, not 10%

Pre-AI, mature teams used 10–15% buffers over velocity for the unexpected. With AI in the flow, the realistic buffer for the next 12–18 months is **30–40%**, for these concrete reasons:

1. **Verification tax**: every agent-generated PR needs more careful human review. Review time went up.
2. **Quality tax**: PR sizes +150%, bug counts +9% with AI (Faros 2026). More bugs mean more mid-sprint support interruptions.
3. **Tooling churn**: the tools (Cursor, Claude Code, Linear Agent) update every 2–4 weeks. There's a constant adaptation cost.
4. **Model instability**: models change from one day to the next. A pattern that worked with one version can fail with the next. Recalibration takes time.

```
Team baseline velocity:                40 SP/sprint
Pre-AI buffer (10%):                   36 SP committed
AI-aware buffer (30%):                 28 SP committed
                                              ↑
                                  12 SP of real buffer
                                  for the unexpected
```

🎯 **How to justify it to stakeholders**: show them the data. Faros 2026, DORA 2025, and your own team's numbers if you've been tracking for 3+ sprints. A 30% buffer isn't pessimism; it's evidence-based realism.

---

## Estimating at epic / roadmap level

For the 3–6 month roadmap, story points don't work (too granular, too noisy). T-shirt sizes do:

```
## Epic: FlowSync — Two-way sync with Google Calendar

### Estimate: L (3-5 sprints)

### Expected decomposition:
- M: OAuth authentication with Google
- M: Event polling and diffing
- L: Conflict resolution
- S: Settings UI
- S: Known edge cases (recurring events, all-day events)

### Risks that could move this from L to XL:
- Google Calendar API rate limits
- Timezone cases we haven't explored yet
- GDPR compliance if B2B calendars are involved
```

> 💡 **Senior pattern**: decomposing an L+ epic into stories happens **when the epic starts**, not on the roadmap. The roadmap is for talking to stakeholders, not for planning sprints.

---

## Estimation is a conversation, not a number

Closing with the rule that sounds redundant but gets violated the most:

> 📌 **An estimate without a discussion is worth less than no estimate at all.**
>
> The number in the ticket is the **byproduct** of the conversation. The conversation is what aligns the team, uncovers hidden assumptions, and reveals complexity. If the number appears without a conversation, the ticket carries a zero dressed up as a number.

That's why AI-as-peer in planning poker is valuable: the AI *forces* a conversation whenever its estimate differs. AI-as-oracle (it decides) is poisonous: it *cuts off* the conversation.

## 🛠️ Try it with Claude

```
Act as one more participant in our planning poker session. Here are 5 stories we already estimated in past sprints, with their final story points, so you can calibrate to our scale: [paste 5 estimated stories]. Now estimate this new story on the Fibonacci scale (1, 2, 3, 5, 8, 13): [paste story]. Give me one number (no decimals), your top 3 reasons, and any hidden complexity you suspect the team might be underestimating.
```

```
My team's baseline velocity is [X] story points per sprint, and we adopted AI coding assistants [N] months ago. Help me build an AI-aware sprint commitment: apply a 30% buffer, explain each component of the buffer (verification tax, quality tax, tooling churn, model instability) in stakeholder-friendly language, and draft a short paragraph I can use to justify the number in our next planning meeting.
```

```
Here's an epic from our roadmap: [paste epic description]. Estimate it in t-shirt size (S/M/L/XL), propose an expected decomposition into 4-6 t-shirt-sized chunks, and — most importantly — list the specific risks that could push the estimate up one size. Do not give me story points or hours; this is roadmap-level, not sprint-level.
```
