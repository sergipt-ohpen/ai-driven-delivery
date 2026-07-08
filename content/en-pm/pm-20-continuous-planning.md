# ♻️ Continuous Agile Planning

## Planning stops being a ceremony and becomes a system

Everything in the previous pages converges here. Once your backlog is AI-ready, your estimates are AI-aware, and your tools are connected, planning stops being something that happens in a two-hour meeting every two weeks. It becomes a **continuous system**: refinement runs in the background, quality gates enforce themselves, plans update as reality arrives, and the ceremonies that remain are reserved for what actually needs humans — trade-offs and priorities.

The building blocks are simple: continuous refinement, automated guardrails, per-type Definitions of Done, honest metrics, and a plan treated as a living document.

---

## Refinement is no longer a ceremony — it's a background process

The classic backlog refinement session — whole team, one hour, once per sprint — still exists, but it's losing its monopoly. With AI in the flow, refinement becomes **continuous and asynchronous**. The canonical pattern:

1. **Anyone opens an issue** with just a title and 2–3 sentences of intent. That's the human's entire upfront cost.
2. **An AI workflow expands it** into a sprint-ready story: user story in standard format, acceptance criteria in Given/When/Then (happy path, edge cases, error cases), pointers to the relevant parts of the product, suggested labels and priority, and a t-shirt size hint with a brief justification. If the scope looks too big for one story, it marks the issue as `needs-splitting` and proposes a 2–3 way decomposition.
3. **The AI flags what needs a human**: issues that look complex, span multiple components, resist estimation, or have detected dependencies get routed to the team for review.
4. **The weekly ceremony shrinks to 20–30 minutes**, focused exclusively on the flagged issues — the ones that genuinely need discussion.

Notice what stays human in this pattern: intent (step 1) and judgment (step 4). What disappears is the middle — the mechanical drafting and formatting that used to consume the meeting.

---

## Automate the quality gates, keep the conversations

The second half of the pattern: encode your backlog quality rules so they enforce themselves. A concrete example — a small automation (a "hook") that **blocks closing any ticket that doesn't have acceptance criteria in Given/When/Then format**. If the AC field is empty or doesn't contain Given/When/Then, the ticket can't close, and the message says: "refine before closing."

> 🎯 **The compound effect**: the team stops checking format in refinement. The ceremony becomes purely about discussing trade-offs and priorities. The "bureaucratic tax" of classic PM work disappears — the machine handles compliance, humans handle judgment.

You don't need to build these yourself; you need to *specify* them. Deciding which rules deserve automated enforcement — and what the expansion workflow must always produce — is product work.

---

## Definition of Done per work type

A single DoD for everything is a classic anti-pattern: too generic to guide well, too specific for work that doesn't fit. Use separate templates per type:

### DoD — New feature

```
- [ ] Implementation covers every AC in the Given/When/Then
- [ ] Functional tests (at least 1 per AC scenario)
- [ ] Test coverage of the module does not decrease
- [ ] Input and output validation in place
- [ ] API documentation generated or updated
- [ ] Technical spec archived after merge (if one exists)
- [ ] PR description links back to the ticket
- [ ] Review by at least 1 human (not only agents)
```

### DoD — Bug fix

```
- [ ] A test that reproduces the bug, committed BEFORE the fix
- [ ] Fix is minimal and focused (no unrelated refactors)
- [ ] The test now passes
- [ ] Brief 5-whys analysis in the ticket: why was it introduced?
      Could it be caught automatically next time?
- [ ] If applicable, a follow-up ticket to improve prevention
```

### DoD — Refactor

```
- [ ] Test coverage of the module does not decrease
- [ ] Observable behavior unchanged (same contracts, same endpoints)
- [ ] PR explains the architectural motivation
- [ ] Not mixed with feature changes
- [ ] Benchmark included if it touches performance-critical paths
```

### DoD — Documentation

```
- [ ] Content reviewed by at least 1 team member (not only AI)
- [ ] Code snippets are executable (tested locally)
- [ ] No broken internal links
- [ ] Versioned in the repo if technical docs; in the wiki if product docs
```

### DoD — Spike / Research

```
- [ ] Output documented: findings, trade-offs, recommendation
- [ ] Decision record created if a significant choice was made
- [ ] Explicit "next steps" decision: continue / pivot / cancel
- [ ] Time spent logged, to calibrate future spikes
```

> 💡 **How these get used in practice**: each template becomes a reusable AI skill (`dod-feature`, `dod-bug`, `dod-refactor`…). The PO or the agent applies the right one when creating or closing a ticket. Nobody has to remember which DoD applies.

---

## Honest velocity tracking in the AI era

Velocity remains useful **if you decorate it with metadata** that distinguishes where the work came from. This is what separates teams that learn from teams that fool themselves.

### Pattern: tag the origin of every PR

Each PR (and commit) carries an origin label:

- `human` — written by a human with no significant assistance
- `human+copilot` — human with AI assistance (chat/completion in the editor)
- `agent` — generated by an agent in an agentic workflow (Claude Code, Cursor Agent, Devin)
- `agent+human-review` — agent-generated, significantly modified by a human before merge

### The metrics that matter, segmented

```
                 Velocity   Bugs/PR   Time-to-merge   Rework rate
─────────────────────────────────────────────────────────────────
Human only        15 SP      0.3        2.1 days         8%
Human+copilot     22 SP      0.4        1.6 days        12%
Agent             35 SP      0.9        0.8 days        28%
Agent+review      30 SP      0.4        1.4 days        15%
```

(Illustrative figures; your team will generate its own after 4–6 sprints of tracking.)

> 🎯 **Senior reading**: if you only look at total velocity ("we did 102 SP, better than last sprint"), the conclusion is misleading. Segmented, you see the real cost: agents produce volume, but with more bugs and more rework. **That's the information that tells you how much to invest in human review.**

---

## The plan as a living document

Set-in-stone Gantt roadmaps no longer work. The reality: with AI in the flow, priorities can shift mid-sprint because something that looked L turned out to be XL — or something XL got done in a day. Patterns for keeping the plan alive:

### The 3–6 month roadmap in t-shirt sizes

```
## Q3 2026 (next 3 months)

### Initiative 1: FlowSync MVP — Google Calendar sync
- Google OAuth auth [M] · sprint 1-2
- Event polling and diffing [M] · sprint 2-3
- Conflict resolution [L] · sprint 3-4
- Settings UI [S] · sprint 4
- Edge cases (recurring, all-day) [S] · sprint 5

### Initiative 2: Onboarding and first-run experience
- First-setup wizard [M] · sprint 5-6
- Pre-configured templates [S] · sprint 6
```

> ✅ **Every month**: re-evaluate the t-shirt sizes in light of what you've learned. An L that turned out to be XL doesn't stay labeled L. **The roadmap learns; it isn't a contract.**

### Sprint planning in terms of capacity, not items

```
## Sprint 4 (FlowSync · 2 weeks, 4 devs + 1 PO)

### Net capacity (with 30% buffer):
- 4 devs × 7 working days × 1 SP/day = 28 SP base
- Buffer: 30% → we commit to 20 SP

### Sprint goal:
"Resolve basic sync conflicts for users with
non-recurring calendars."

### Committed stories (20 SP):
- [3] Detect a simple event conflict
- [5] Manual conflict-resolution UI
- [3] Apply the chosen resolution
- [5] End-to-end tests of the full flow
- [2] Logging and observability of the flow
- [2] Documentation

### Stretch (not committed):
- [3] Conflicts involving recurring events
```

🎯 **The sprint goal is the most underused piece of Scrum.** It defines the **single outcome** of the sprint. When stakeholders ask "what got done?", the answer is the sprint goal — not the list of tickets.

---

## Retrospectives with AI: a tool, not the facilitator

AI can help retrospectives by analyzing data:

✅ **Useful**: feed the AI the sprint's closed tickets, cycle times, and bugs introduced, and ask it to find patterns — e.g., "auth-type tickets take 2× longer than average; the bugs appeared in 3 PRs that had no tests in module X."

❌ **Useless**: asking the AI to "facilitate the retrospective." The value of a retro is the team verbalizing and listening to each other; AI doesn't replace that. It supplies data to discuss.

🛡 **Risk to avoid**: letting the AI surface "patterns" about individuals ("dev X has more bugs than dev Y"). That's noise plus bias, and it destroys trust. Configure your prompts so the AI always analyzes **at the team or process level, never the individual level**.

---

## The loop that closes everything

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    ┌─────────┐      ┌──────────┐      ┌──────────┐      │
│    │   PRD   │──►───│ Backlog  │──►───│  Sprint  │      │
│    │ (docs)  │      │ (Linear) │      │ (in IDE) │      │
│    └─────────┘      └────┬─────┘      └────┬─────┘      │
│                          │                 │            │
│                          ▼                 ▼            │
│                    ┌────────────┐    ┌─────────────┐    │
│                    │ Skills +   │    │ Tech spec + │    │
│                    │ AC-format  │    │ agent doing │    │
│                    │ guardrails │    │ the work    │    │
│                    └────────────┘    └──────┬──────┘    │
│                                             │           │
│  ┌────────────┐         ┌──────────┐        │           │
│  │ Retro with │◄────────│ Metrics  │◄───────┘           │
│  │ AI-as-data │         │ by work  │                    │
│  └─────┬──────┘         │ origin   │                    │
│        │                └──────────┘                    │
│        └───────► feeds the next refinement ─────────────┘
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Every arrow in this loop is a concrete pattern from this section of the guide. Your job as a PO/PM isn't to operate every arrow — it's to make sure the loop exists, and that what it learns actually feeds the next refinement.

## 🛠️ Try it with Claude

```
Act as my "expand-issue" workflow. I'll give you a draft issue with just a title and 2-3 sentences of intent: [paste it]. Generate: (1) a user story in As a/I want/So that format, (2) acceptance criteria in Given/When/Then — happy path, edge cases, and error cases, (3) suggested labels and priority, (4) a t-shirt size (S/M/L) with a one-line justification. If the scope is too big for one story, say "needs splitting" and propose a 2-3 way decomposition. Finally, tell me whether this issue should be flagged for human discussion, and why.
```

```
Help me design Definition of Done templates for my team, one per work type: new feature, bug fix, refactor, documentation, and spike/research. Here's our current single generic DoD: [paste it]. For each work type, produce a checklist of 5-8 items, and flag which items could be enforced automatically (by CI or a ticket-workflow rule) versus which need human judgment.
```

```
Here is the data from our last sprint: [paste closed tickets with type, story points, cycle time, and any bugs introduced — or export from your PM tool]. Analyze it at the team and process level only — never comment on individuals. Identify: (1) ticket types that take significantly longer than average, (2) patterns in where bugs appeared, (3) one process experiment we should try next sprint. Format it as 3 discussion topics for our retrospective.
```
