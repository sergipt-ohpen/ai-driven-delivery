# 📋 Anatomy of an AI-Ready Backlog

## The hierarchy didn't change. Who you write it for did.

There's still a PRD, epics, user stories, tasks, and acceptance criteria. The structure has been the same for 15 years. What's radically different is that the reader is no longer just your team:

- **Before**: a human developer reads it and **fills in the missing context** with questions in the daily, in Slack, or in meetings.
- **Now**: an AI assistant reads it and **fills in the missing context by inventing it** — and then a human reviews the inventions.

This changes the relative cost of ambiguity. In the pre-AI era, a somewhat vague story eventually got clarified; now an agent may have implemented it in the worst plausible way before anyone notices. **An AI-ready backlog isn't more detailed for its own sake: it's more detailed wherever ambiguity could slip into working code unnoticed.**

---

## The pyramid and what each layer does

```
┌──────────────────────┐  Vision, MVP scope, architecture
│         PRD          │  decisions, success metrics.
└──────────┬───────────┘  (Product + Tech, weeks/months)
           │
┌──────────▼───────────┐  Big blocks of capability.
│        EPICS         │  One product hypothesis each.
└──────────┬───────────┘  (Days/weeks, several sprints)
           │
┌──────────▼───────────┐  Observable behavior of a user or
│     USER STORIES     │  system. INVEST. Fits in a sprint.
└──────────┬───────────┘  (Hours/days)
           │
┌──────────▼───────────┐  Unit of technical work for
│        TASKS         │  someone (human or agent).
└──────────┬───────────┘  (Minutes/hours)
           │
┌──────────▼───────────┐  How you verify it's done.
│ ACCEPTANCE CRITERIA  │  Testable. Observable. Unambiguous.
└──────────────────────┘
```

Three rules that are non-negotiable if your backlog is going to be read by AI agents:

1. **The right level for prompting an AI is the story, not the epic.** Asking an agent to implement a whole epic is the fastest way to burn budget and get something approximate. Story granularity (1–2 human-equivalent days) is where AI assistants perform well.

2. **Tasks are the agent's artifact more than the human's.** If the story is well defined, the AI can generate the task breakdown itself — you don't have to pre-chew it.

3. **Acceptance criteria are your only defense against AI "false completeness."** If you don't write them, the agent will produce something that *looks* finished but is missing the case you never mentioned.

---

## INVEST still applies. More than ever.

INVEST dates from 2003 (Bill Wake), but its six criteria remain the cheapest checklist for judging whether a story is AI-ready:

- **I**ndependent — can be built without waiting on another story
- **N**egotiable — captures intent, not a rigid contract of implementation details
- **V**aluable — delivers observable value to a user or the business
- **E**stimable — the team can size it without guessing
- **S**mall — fits comfortably in a sprint (and in an AI agent's working context)
- **T**estable — you can verify it's done without debate

> 💡 **Senior pattern**: use INVEST as a **gate into the sprint**, not as an aspiration. Any story failing 2 or more of the 6 criteria goes back to refinement. No negotiation. AI doesn't rescue vague stories — it amplifies them.

---

## Acceptance criteria: the "AI as poke-holes" pattern

The common intuition is: ask the AI to **write** the acceptance criteria. It's the most obvious use and the most generic. Operational reality is the opposite: AI shines when you use it to **find the criteria you missed**, not to write them from scratch.

> 📌 **The AI-as-poke-holes pattern**:
>
> 1. A human (PO or tech lead) writes the happy-path acceptance criteria. 4–6 bullets, 3 minutes.
> 2. You give the story + AC to the AI with this prompt: "Given this user story and these acceptance criteria, list edge cases, implicit assumptions, missing scenarios, and unmentioned dependencies or risks."
> 3. The AI produces 10–15 candidates. Most are noise. **You keep the 3–5 real ones** the team hadn't thought of.
> 4. Refinement is no longer reading the story together — it's discussing the gaps the AI flagged.

🎯 **Measurable effect**: Capgemini reported (~2024, cited in 2026 literature) around 15% less ticket rework when using this pattern. Not a huge number — but **the real value isn't speed, it's that mid-sprint surprises stop happening**. That impacts morale and predictability far more than velocity.

### Given/When/Then remains the best format for AI

Acceptance criteria in Gherkin format (Given/When/Then) work best with AI assistants for one concrete reason: they are **directly translatable into tests**. An agent can read the Given/When/Then and generate the test that verifies it, with no interpretation step in between.

```
# Story: As a user, I want to filter pending tasks
# so I can find what I need to do today.

Scenario: Standard filter by pending status
  Given the user has 12 tasks (5 pending, 7 completed)
  When they request /api/tasks?status=pending
  Then the response is 200 OK
  And it contains exactly 5 tasks
  And all of them have status="pending"

Scenario: Filter with an invalid value
  Given the user requests /api/tasks?status=banana
  When it reaches the backend
  Then it responds 400 Bad Request
  And the message lists the valid values: "pending" | "completed" | "archived"
```

Compare that to an AC like "the filter should work." The first is executable; the second is a placeholder that will blow up in sprint review.

---

## The "false completeness" trap

> ⚠ **Pay attention**: this is the most common failure mode in AI-generated backlogs.

The AI generates 12 acceptance criteria. Your brain says "this looks exhaustive." It isn't. **The model doesn't know what it doesn't know about your system**: the legacy integration that fails on Mondays, the half-finished migration that left two columns holding the same data, the business rule only known by someone who left three years ago.

🛡 **Operational countermeasures**:

- **Never accept AI-written AC without a human reviewing them against the real system.** The review takes 10 minutes; the debt from an invented AC takes weeks.
- **Treat generated AC as a first draft**, never as a deliverable.
- **Explicitly ask the AI** to mark criteria as "(assumed)" when it has no clear evidence in the context. Nearly all models will do this if you ask.
- **The team writes the happy-path AC; the AI only expands edge cases.**

---

## Backlog (product layer) ↔ spec (technical layer)

The backlog and the technical spec are two layers with different purposes, and they connect cleanly:

- The **story** (in Linear/Jira) defines the *what*, with acceptance criteria in Given/When/Then. It's the product conversation.
- The **spec** (a formal markdown document in the repo, e.g., an OpenSpec change) defines the *how*: concrete file changes, API contracts, technical decisions. It's what the agent actually implements against.

```
PRD          ────► User Story           ────► Spec change          ────► Code
(page/       (Linear/Jira ticket        (formal markdown          (mergeable PR)
 docs)        with AC in GWT)            in the repo)
                  │                          ▲
                  └──────── bridge ──────────┘
                     (the story feeds the spec;
                      the spec closes the ticket)
```

> 💡 **Concrete pattern**: when a story enters the sprint, the first technical task is **generating the corresponding spec**. The story defines the what (with AC); the spec defines the how. The agent works from the spec, not directly from the ticket. The two artifacts stay linked.

---

## Patterns for writing stories an agent can execute

Three patterns that separate AI-ready stories from stories the agent will fumble:

### Pattern 1 — Technical context at the end, not the beginning

```
## Story: As a FlowSync user, I want an extended /me endpoint
that includes my role and permissions, so the frontend
doesn't need an extra call.

## AC (Given/When/Then)
... [happy path + edge cases]

## Technical context (for the agent)
- Current endpoint: backend/app/controllers/auth_controller.ts:getMe()
- The User model has a relation to Role
- Permissions come from the permission service
- Similar existing tests: tests/functional/auth/me.spec.ts
```

The agent reads top to bottom. If you put technical context first, it "decides" on technical matters before understanding the product intent.

### Pattern 2 — An explicit Definition of Done per work type

Not every story has the same DoD. A refactor, a bug fix, and a new feature demand different things. Reusable templates:

```
## DoD (new feature)
- [ ] Implemented following the existing pattern
- [ ] Input and output validation in place
- [ ] Functional tests covering every AC scenario
- [ ] API documentation updated
- [ ] Spec change archived after merge

## DoD (bug fix)
- [ ] A test that reproduces the bug BEFORE the fix (separate commit)
- [ ] Fix implemented
- [ ] The test now passes
- [ ] Brief 5-whys analysis in the ticket: what class of bug is this?

## DoD (refactor)
- [ ] Test coverage of the module does NOT decrease
- [ ] Observable behavior unchanged (same contracts)
- [ ] PR explains the architectural improvement
```

Teams turn these templates into reusable AI skills, so the right DoD gets attached automatically by work type.

### Pattern 3 — Explicit non-goals

If the story says "implement the extended /me endpoint," the agent may decide to also update the API docs, refactor the controller, and optimize a query while it's at it. You end up with an 800-line PR instead of a 150-line one.

```
## Non-goals (explicit)
- Do not touch other endpoints in this controller
- Do not change the User model
- Do not optimize existing queries (that gets its own ticket)
```

> 💡 **Senior reading**: non-goals feel painful to write because they seem redundant. They aren't. They're the line between a PR that merges in 30 minutes and a PR that needs four reviewers.

---

## Operational recap

```
┌─────────────────────────────────────────────────────────┐
│ A story is AI-ready if:                                 │
│                                                         │
│  ✓ It passes INVEST (all 6, especially Small/Testable)  │
│  ✓ It has AC in Given/When/Then                         │
│  ✓ A human wrote the happy path; the AI expanded it     │
│  ✓ Technical context sits at the end, not the start     │
│  ✓ It has a DoD matched to the work type                │
│  ✓ It has explicit non-goals where they apply           │
│  ✓ It's linked (or ready to link) to its technical      │
│    spec when it enters the sprint                       │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ Try it with Claude

```
Here is a user story and its happy-path acceptance criteria: [paste story + 4-6 AC bullets]. Play the "poke holes" role: list edge cases, implicit assumptions, missing scenarios, and unmentioned dependencies or risks. Mark anything you can't verify from the context as "(assumed)". Then rank your findings by how likely they are to cause a mid-sprint surprise, so I can pick the 3-5 worth adding.
```

```
Convert these acceptance criteria into Given/When/Then (Gherkin) format: [paste your current AC]. For each scenario, keep it observable and testable — concrete inputs, concrete expected outputs, no vague verbs like "works correctly". If any criterion is too ambiguous to convert, tell me what question I need to answer first instead of guessing.
```

```
Audit this user story against INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable): [paste story]. Score each criterion pass/fail with a one-line justification. If it fails 2 or more, rewrite it as one or more stories that would pass, and add an explicit "Non-goals" section listing what an AI agent should NOT do when implementing it.
```
