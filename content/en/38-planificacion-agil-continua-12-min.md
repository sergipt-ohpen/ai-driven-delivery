# 📄 Continuous agile planning 🔴— 12 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 12 min

## Refinement is no longer a ceremony, it's a background process

The classic "backlog refinement" ceremony — the whole team, one hour, once per sprint — still exists, but it's losing its monopoly. With AI in the flow, refinement becomes **continuous and asynchronous**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/4cb84ad4-8b87-493c-b42c-a7f9f3216b45/052a44347a5e1d49.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Canonical pattern for the continuous flow**:
> 
> 1.  Anyone opens an issue with a title + 2-3 sentences of intent.
>     
> 2.  The `expand-issue` skill (Claude Code or Linear Agent) generates AC, initial technical context, labels, and a suggested priority.
>     
> 3.  The skill **flags** issues that look complex (multi-component, non-estimable, detected dependencies) and routes them to the team for human review.
>     
> 4.  The weekly ceremony shrinks to 20-30 minutes, focused on the flagged issues.
>     

---

## Skill + Hook: the "continuous guard" pattern

S3 made it clear that skills and hooks are the copilot's operational primitives. Here we apply them to the backlog:

### `expand-issue` skill

```
# .claude/skills/expand-issue.md

You are expanding a draft issue into a sprint-ready user story.

Given the title and brief description provided, generate:
1. User story in standard format (As a/I want/So that)
2. Acceptance criteria in Given/When/Then (3-5 scenarios: happy path + edge cases + error cases)
3. Technical context section pointing to relevant files in the repo
4. Suggested labels (frontend/backend/full-stack, type:bug/feature/refactor)
5. Estimation hint as t-shirt (S/M/L) with brief justification

If the issue scope seems too large for a single story, mark it as
`needs-splitting` and propose a 2-3 way decomposition.

Output as Markdown ready to paste into Linear/Jira.
```

### `validate-ac` hook (PreCommit, Linear)

```
#!/usr/bin/env bash
# Hook: bloquea cerrar tickets sin AC en Given/When/Then

ISSUE_AC=$(linear issue $1 --field acceptanceCriteria)

if [[ -z "$ISSUE_AC" ]] || ! echo "$ISSUE_AC" | grep -qE "Given|When|Then"; then
  echo "❌ Ticket $1 no tiene AC en formato Given/When/Then. Refina antes de cerrar."
  exit 1
fi
```

> 🎯 **Compound effect**: the team stops reviewing format during refinement. The ceremony is only for discussing trade-offs and priorities. The classic PM's "bureaucratic tax" disappears.

---

## Definition of Done by task type

A single DoD for the whole team is a classic anti-pattern. It's too generic to provide good guidance and too specific for tasks that don't fit. Separate templates by type:

### DoD — New feature

```
- [ ] Implementation covers all the Given/When/Then AC
- [ ] Functional tests (at least 1 per AC scenario)
- [ ] Module coverage does not decrease
- [ ] Input and output validation (VineJS / Zod / equivalent)
- [ ] OpenAPI documentation generated or updated
- [ ] OpenSpec change archived after merge (if applicable)
- [ ] PR with a description that links to the Linear ticket
- [ ] Review by at least 1 human (not just agents)
```

### DoD — Bug fix

```
- [ ] Test that reproduces the bug committed **before** the fix
- [ ] Fix implemented minimally and focused (no unrelated refactors included)
- [ ] Test that now passes
- [ ] Brief 5-whys analysis in the ticket: why was it introduced? could it be caught in CI?
- [ ] If applicable, follow-up ticket created to improve prevention
```

### DoD — Refactor

```
- [ ] Module test coverage does not decrease
- [ ] Observable behavior unchanged (same contracts, same endpoints)
- [ ] PR explains the architectural motivation
- [ ] Not mixed with feature changes
- [ ] Benchmark if it affects performance-critical paths
```

### DoD — Documentation

```
- [ ] Content reviewed by at least 1 dev on the team (not just AI)
- [ ] Code snippets are executable (tested locally)
- [ ] No broken internal links
- [ ] Versioned in the repo if it's technical docs; in Notion if it's product docs
```

### DoD — Spike / Research

```
- [ ] Output documented: findings, trade-offs, recommendation
- [ ] If applicable, ADR (Architecture Decision Record) created
- [ ] "Next steps" decision: continue / pivot / cancel
- [ ] Time spent recorded to calibrate future spikes
```

> 💡 **How they materialize**: each template is a skill (`dod-feature`, `dod-bug`, `dod-refactor`...). The PO or the agent runs the corresponding skill when creating/closing the ticket. The team doesn't have to remember which DoD applies.

---

## Honest velocity tracking in the AI era

The velocity metric is still useful **if you decorate it with metadata** that distinguishes the origin of the work. This is what separates teams that learn from teams that fool themselves:

### Pattern: PR origin tagging

Every PR (and every commit) carries an origin label:

-   `human` — written by a human dev without significant assistance
    
-   `human+copilot` — human with copilot assistance (IDE chat / completion mode)
    
-   `agent` — generated by an agent in an agentic flow (Claude Code, Cursor Agent, Devin)
    
-   `agent+human-review` — generated by an agent, significantly modified by a human before merge
    

### Metrics that matter, segmented

```diagram
                 Velocity   Bugs/PR   Time-to-merge   Rework rate
─────────────────────────────────────────────────────────────────
Human only        15 SP      0.3        2.1 days        8%
Human+copilot     22 SP      0.4        1.6 days        12%
Agent             35 SP      0.9        0.8 days        28%
Agent+review      30 SP      0.4        1.4 days        15%
```

(Illustrative figures; your team will have to generate its own after 4-6 sprints of tracking.)

> 🎯 **Senior reading**: if you only look at total velocity ("we did 102 SP, better than last sprint"), the conclusion is misleading. If you look at it segmented, you see the real cost: agents produce volume but with more bugs and more rework. **That information is what tells you how much to invest in human review**.

---

## The plan as a living doc

Roadmaps in set-in-stone Gantt format no longer work. The reality: with AI in the flow, priorities can change mid-sprint because something that looked like an L turned out to be XL, or something XL got done in a day. Patterns for keeping the plan alive:

### 3-6 month roadmap with t-shirts

```
## Q3 2026 (next 3 months)

### Initiative 1: FlowSync MVP — Google Calendar synchronization
- Google OAuth auth [M] · sprint 1-2
- Event polling and diff [M] · sprint 2-3
- Conflict resolution [L] · sprint 3-4
- Settings UI [S] · sprint 4
- Edge cases (recurring, all-day) [S] · sprint 5

### Initiative 2: Onboarding and first-run experience
- First-setup wizard [M] · sprint 5-6
- Pre-configured templates [S] · sprint 6
```

> ✅ **Every month**: re-evaluate the t-shirts in light of what you've learned. An L that turned out to be an XL doesn't stay an L; **the roadmap learns, it's not contractual**.

### Sprint planning in terms of capacity, not items

```
## Sprint 4 (FlowSync · 2 weeks, 4 devs + 1 PO)

### Net capacity (with 30% buffer):
- 4 devs × 7 working days × 1 SP/day = 28 SP base
- Buffer: 30% → we commit to 20 SP

### Sprint goal:
"Resolve basic synchronization conflicts for users with
calendars without recurrences."

### Committed stories (20 SP):
- [3] Detect simple event conflict
- [5] Manual conflict resolution UI
- [3] Apply chosen resolution
- [5] E2E tests of the full flow
- [2] Logging and observability of the flow
- [2] Documentation

### Stretch (not committed):
- [3] Conflicts with recurring events
```

🎯 **The sprint goal is the most underused piece of scrum**. It defines the sprint's **single outcome**. If stakeholders ask "what got done?", the answer is the sprint goal, not the list of tickets.

---

## Retrospectives with AI: a tool, not the facilitator

AI can help in retrospectives by analyzing data:

✅ **Useful**: feeding the AI the sprint's closed tickets + times + bugs introduced, and asking it to identify patterns (e.g. "`auth`-type tickets take 2× longer than the average; the bugs appeared in 3 PRs that had no tests in module X").

❌ **Useless**: asking the AI to "facilitate the retrospective". The value of the retro is in the team verbalizing and listening to each other; AI doesn't replace that, it only contributes data to discuss.

🛡 **Risk to avoid**: the AI detecting "patterns" about individuals ("dev X has more bugs than dev Y"). That's noise + bias and it breaks trust. Configure the prompts so it always looks **at the team level or the process level**, never the individual level.

---

## The loop that closes everything

```diagram
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    ┌─────────┐      ┌──────────┐      ┌──────────┐      │
│    │   PRD   │──►───│ Backlog  │──►───│  Sprint  │      │
│    │ (Notion)│      │ (Linear) │      │ (in IDE) │      │
│    └─────────┘      └────┬─────┘      └────┬─────┘      │
│                          │                  │           │
│                          ▼                  ▼           │
│                    ┌────────────┐    ┌─────────────┐    │
│                    │ Skill +    │    │  OpenSpec   │    │
│                    │ Hook AC    │    │  change +   │    │
│                    │ guardian   │    │  EPE agent  │    │
│                    └────────────┘    └─────────────┘    │
│                                              │          │
│  ┌────────────┐         ┌──────────┐         │          │
│  │ Retro with │◄────────│ Metrics  │◄────────┘          │
│  │ AI-as-data │         │ by origin│                    │
│  └─────┬──────┘         │ type     │                    │
│        │                └──────────┘                    │
│        └───────► feeds the next refinement ─────────────┘
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Every arrow is a concrete pattern you've seen in these 5 lessons. The missing piece — the pre-session exercise — is in the next lesson.
