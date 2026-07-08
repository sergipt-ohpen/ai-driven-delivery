# 💬 Pillar 3 — Asking Well: Prompts That Work

The last pillar is the one everyone starts with: what you actually type. This page covers what still matters in prompting, what's become folklore, and how the three pillars combine into a single way of deciding how to approach any task.

## The "prompt engineering" myth

In 2023–2024, prompt engineering was sold as a magic skill: learn the right incantation and quality multiplies. Courses, templates, and rituals appeared — "think step by step," "you are a world-class expert."

That era is over. Modern models decide for themselves how much to reason before answering; the old spells add noise at best. Anthropic's own guidance says it plainly: *the best prompt isn't the longest or most complex — it's the one that reliably achieves your goal with the minimum structure needed.*

What still matters is not magic. It's the same skill that makes you good at briefing a colleague: clarity about the goal, the definition of done, and the constraints.

## The anatomy of a good ask

Across published best practices, effective prompts converge on the same parts. Not every prompt needs all seven — use what the task calls for:

```
1. ROLE / SITUATION (short, only if it adds real constraints)
   "You're helping a B2B SaaS PM prepare for a quarterly planning review."

2. GOAL (outcome, not steps)
   "Draft a one-page decision memo recommending whether we build
   or buy the analytics module."

3. EXPLICIT SUCCESS CRITERIA  ← the highest-leverage element
   "You're done when the memo: fits on one page, states a clear
   recommendation in the first paragraph, covers cost/time/risk
   for both options, and names what would change the decision."

4. CONSTRAINTS (what NOT to do)
   "Don't invent numbers — mark anything unverified as [NEEDS DATA].
   Don't hedge with 'it depends'; commit to a recommendation."

5. RESOURCES (point to them, don't re-paste)
   "Use the vendor comparison attached and the engineering estimate
   from earlier in this conversation."

6. OUTPUT FORMAT (when it matters)
   "Structure: recommendation, options table, risks, next steps."

7. INVITE QUESTIONS (whenever the task is ambiguous)
   "If anything about the scope is unclear, ask before writing."
```

> 💡 **The single highest-leverage change**: explicit success criteria. The gap between "write a PRD for feature X" and "write a PRD that a developer could estimate without asking me questions, covering these three user scenarios" is enormous in first-draft quality.

## Anti-patterns that cost you turns

1. **Vagueness** — "give me ideas for onboarding." You get generic output and a long back-and-forth that costs more than writing a good ask once.
2. **Micro-managing the steps** — dictating exactly how to do something simple. State the outcome and let the model choose the route; over-constraining measurably hurts results.
3. **The megaprompt** — cramming every convention, example, and caveat into every message. It confuses and burns context (see Pillar 2).
4. **No definition of done** — the model delivers what it *guesses* you want. The output "looks fine" and fails the real test: your stakeholder meeting.
5. **Bundling tasks** — "synthesize the feedback, update the PRD, and draft the announcement." Chain them: do A, review, feed A's result into B.

## Five patterns that earn their keep

**1. Spec first.** For anything substantial, write down *what* you want — inputs, outputs, edge cases, what done means — before asking for the deliverable. This is the single highest-leverage habit, and for a PM it's home turf: it's a requirements doc for the AI. (It matters so much that the "Specs" section of this guide is devoted to it.)

**2. Plan, then execute.** For big deliverables, ask for the plan first: "Before writing the PRD, give me the outline and your assumptions. Don't write it yet." Review, correct, then approve. Correcting an outline costs one minute; correcting a finished six-page draft costs an afternoon.

**3. Criteria first.** The PM version of "write the tests first": agree on the checklist before the draft. "First, list the criteria a great decision memo for this audience must meet. Once I confirm them, write the memo to meet them." Then use the same checklist to evaluate the draft.

**4. Big changes in steps.** Don't ask for the entire backlog restructured in one shot. Ask for the map first — what would change and what's at risk — approve it, then execute section by section, reviewing as you go.

**5. The critic pass.** Use a fresh conversation to review the first one's output: "Act as a skeptical engineering lead reviewing this PRD. What's ambiguous, missing, or unrealistic?" A separate session with a reviewer's role reliably catches what the writing session — and you — glossed over.

And one habit that cuts across all five: **end ambiguous asks with "ask me questions before starting."** Claude's clarifying questions are often the fastest way to discover what *you* haven't decided yet.

## Putting the three pillars together

For any real task, the pillars combine into one sequence:

```
1. CHARACTERIZE THE TASK
   One-off or recurring? How much context does it need?
   What's the cost of a wrong answer?

2. CHOOSE THE TOOL (Pillar 1)
   Throwaway question → quick chat
   Recurring document work → your Project
   Ground truth about the system → repo-aware, with the team

3. PREPARE THE CONTEXT (Pillar 2)
   Is my product context document current?
   Which artifacts does this task actually need?
   Fresh conversation, or is an old thread polluting things?

4. WRITE THE ASK (Pillar 3)
   Outcome + success criteria + constraints + "ask if unclear"

5. REVIEW
   Plan before draft for big deliverables;
   critic pass before anything ships to stakeholders.
```

### Worked example: synthesizing 40 pieces of customer feedback

- **Tool**: your Project (recurring task, needs product vocabulary).
- **Context**: the feedback export plus your personas doc — *not* the roadmap, the old survey, and three PRDs "for reference."
- **Prompt**: "Group this feedback into themes. Success criteria: every theme has a count, 2 verbatim quotes, and a severity guess; anything mentioned once goes in a 'long tail' list; flag anything that contradicts our current personas. Ask me before assuming what 'workspace' means if usage seems inconsistent."

### Where's *your* bottleneck?

The three pillars also give you a diagnostic. When AI output disappoints:

- Output is **generic, or ignores how your team works** → Pillar 2. Improve your standing context.
- Output is **competent but answers the wrong question** → Pillar 3. Define the outcome and success criteria better.
- The **workflow itself feels wrong** — endless pasting, no memory, can't see what it needs → Pillar 1. Reconsider the tool category.

Most people assume their bottleneck is the tool. It's almost always the context.

## 🛠️ Try it with Claude

```
Here's a prompt I'd normally write: "[paste a real, typical ask — e.g., 'write user stories for the export feature']". Rewrite it using this structure: goal stated as an outcome, explicit success criteria (definition of done), constraints (what NOT to do), and an invitation to ask clarifying questions. Then briefly explain what each addition buys me.
```

```
I need to produce [deliverable — e.g., a PRD for feature X / a quarterly roadmap narrative]. Do NOT write it yet. First: (1) list the criteria this deliverable must meet to succeed with [audience], (2) give me an outline with your key assumptions marked, and (3) ask me up to 5 clarifying questions. Only after I approve all three do you write the draft.
```

```
Act as a skeptical engineering lead reviewing this PRD before sprint planning: [paste PRD or attach it]. Identify: every requirement a developer couldn't estimate without asking me a question, hidden assumptions, missing edge cases, and anything that sounds simple but probably isn't. Rank your findings by how expensive they'd be to discover mid-sprint instead of now.
```
