# 🧭 Explore, Plan, Execute: A Method That Works

> The most reliable pattern for working with AI wasn't invented by anyone in particular — it emerged simultaneously across the teams doing serious agentic work. It's called **Explore–Plan–Execute (EPE)**, and while it was born in software engineering, it generalizes beautifully to product work. This page teaches it as *your* working method.

## The pattern in one picture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   EXPLORE    │  →   │     PLAN     │  →   │   EXECUTE    │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ Gather       │      │ Agree the    │      │ Generate the │
│ context.     │      │ approach.    │      │ artifact.    │
│ No output    │      │ ── YOU ──    │      │ Iterate on   │
│ yet.         │      │ REVIEW HERE  │      │ details.     │
└──────────────┘      └──────────────┘      └──────────────┘
```

The idea is almost embarrassingly simple: **separate understanding, planning, and producing into distinct phases — and put your review between plan and execution.** Engineers do this with different AI models and permission levels per phase. You'll do it with three deliberate steps in a conversation.

## Why "plan first" beats the one-shot ask

The instinctive way to use AI is the one-shot: "Write me a PRD for feature X." You get 1,500 plausible words built on assumptions you never saw, and now you must reverse-engineer which parts are grounded and which are invented. Reviewing a finished artifact is slow, and by then the structure is baked in.

The plan is different. A plan is short. Errors in it are visible and cheap to fix. **The moment between plan and execution is exactly where a mistake becomes expensive** — approve a bad plan and you'll spend an hour polishing a document built on the wrong premise. Two minutes reading a plan is the best-leveraged review you'll do all day.

Golden rule, borrowed straight from the engineering version: *if you can't explain the plan to a colleague in one sentence, you don't understand it well enough to approve it.*

## The three phases, PM edition

### Phase 1 — Explore: gather context before asking for anything

**Goal**: Claude understands the problem *before* trying to solve it.

Your first prompt asks for no deliverable. You provide the raw material — the brief, related tickets, customer feedback, the old spec — and ask Claude to read, summarize what it understands, and **surface open questions**. Then you answer those questions. That exchange is the phase closing.

This phase is cheap. Don't skip it to "save time" — a plan produced without exploration is fiction built on assumptions. Engineers phrase this as: *never Plan without Explore.*

### Phase 2 — Plan: agree the approach (and actually read it)

**Goal**: turn understanding into an approach you approve before anything gets written.

Ask for the plan explicitly: "Before writing anything, give me an outline — sections, key decisions in each, what data you'll cite, and what you're still assuming." Then do your real work: read it critically.

- Does it match the pattern of your best existing docs?
- Are the assumptions it lists actually true?
- Is anything in scope that shouldn't be — or missing that must be there?

If three of five points are wrong, don't approve-and-patch. Say "no, keep planning" and reframe. And a senior trick that transfers perfectly: if the plan is good but incomplete, **edit it yourself** — copy it, fix it, and send it back with "produce exactly this."

### Phase 3 — Execute: generate the artifact

**Goal**: translate the approved plan into the deliverable — the PRD, the story set, the stakeholder deck outline, the analysis.

Because the plan was agreed, execution is fast and the output rarely surprises you. Review it section by section against the plan, and push back on details ("tighten section 3, the risks are generic") rather than on structure — structure was settled in phase 2.

## When to use the full method (and when not)

Not every task deserves three phases. A decision tree, adapted from the engineering original:

```
Is the output important — will others act on it?
├── Yes → FULL EPE
└── No → Are the inputs messy or ambiguous?
          ├── Yes → FULL EPE
          └── No → Is it a quick reformat / summary / polish?
                    ├── Yes → JUST ASK DIRECTLY
                    └── No → FULL EPE
```

Operating heuristic: **when in doubt, ask for a plan.** The cost of an unnecessary plan is thirty seconds of reading. The cost of a confidently wrong artifact circulated to stakeholders is much higher.

## Anti-patterns to catch yourself in

- **The ride-along.** You accept every plan and every draft without reading, because the flow feels fast and competent. At the end of the week you're circulating documents you can't defend. The output carries your name — review like it does.
- **Planning cold.** Asking for a plan before providing context. If Claude hasn't seen your material, its plan is a guess with good posture.
- **The zombie conversation.** Six hours, four different topics, one chat — and Claude starts forgetting what it knew at the start. New task → new conversation. Reloading context is cheap; dragging polluted context is expensive.
- **Negotiating with a broken thread.** You've corrected the plan twice and it's still off? Start a fresh chat and rewrite the prompt incorporating what you learned. It's almost always faster than another round of patching.

## A worked example: from vague brief to story set (~15 min)

**Explore (~3 min).** "Here's a feature brief for saved filters, plus the three support threads that triggered it and our current search spec. Don't write anything yet. Summarize the problem, then list your open questions." Claude returns a summary plus questions like: *should saved filters sync across devices? per-user or per-team?* You answer them.

**Plan (~3 min).** "Now propose a plan for the story set: how you'd slice this into stories, what's explicitly out of scope for v1, and which acceptance criteria will be hardest to pin down." You read it. One slice mixes two concerns — you split it. You cut cross-device sync to v2. Approve.

**Execute (~8 min).** "Write the stories per that plan, Given/When/Then acceptance criteria, in our template." You review against the plan, tighten two criteria, done.

The payoff isn't just speed. It's that **you spent your attention on decisions — scope, slicing, criteria — instead of on typing**. The reasoning is on the record: if someone asks in a month why sync was cut from v1, the plan and the conversation show exactly when and why. That's the real uplift: not producing the same work faster, but operating one level of abstraction higher.

## 🛠️ Try it with Claude

```
EXPLORE ONLY — do not produce any deliverable yet.
Here is the raw material for a feature I'm scoping: [paste brief,
feedback, related docs]. Read everything, then give me:
(1) a summary of the problem as you understand it,
(2) your open questions, ordered by how much the answer would change
the approach. Wait for my answers before doing anything else.
```

```
Now PLAN, don't write. Propose an outline for [the PRD / story set /
analysis]: sections or slices, the key decision in each, what data or
source you'll rely on, and every assumption you're making. Flag
anything you'd put out of scope for v1 and why. I'll review before
you draft anything.
```

```
I approve the plan with these changes: [your edits]. Now EXECUTE:
produce the full [artifact] following exactly the amended plan, in
this format: [template or format rules]. Where the plan left an open
assumption, mark it inline as [ASSUMPTION] rather than resolving it
silently.
```
