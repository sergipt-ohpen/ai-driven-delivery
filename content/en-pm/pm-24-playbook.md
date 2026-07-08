# 🎯 10 Things to Try with Claude This Week

Each of these is a real workflow you can run today in claude.ai, Claude Desktop, or Claude Code. Every prompt follows the same anatomy: a role, your context pasted in, an explicit output format, and permission for Claude to ask before guessing. Replace the `[PASTE ... HERE]` placeholders with your real material — the more real context you give, the better the output.

---

## 1. Meeting notes → user stories

Refinement sessions and discovery calls produce messy notes that someone has to turn into tickets — usually you, usually days later, when the details have faded. Do it while the meeting is still warm. Claude is excellent at extracting structure from mess, and the Given/When/Then format makes the stories directly usable by both developers and their AI assistants.

```
You are an experienced Product Owner. I'm giving you raw meeting notes.
Extract every distinct piece of work discussed and turn each one into a
user story.

Notes:
[PASTE MEETING NOTES HERE]

For each story, output:
- Title
- Story: "As a [user], I want [capability], so that [benefit]"
- Acceptance criteria in Given/When/Then format (happy path + obvious edge cases)
- Open questions: anything the notes don't answer that the team must clarify

Mark anything you inferred rather than found in the notes as "(assumed)".
If the notes are too ambiguous to extract a story safely, ask me
clarifying questions instead of guessing.
```

---

## 2. Poke holes in a PRD

The most valuable use of AI in product work is not writing your documents — it's attacking them. You write the PRD; Claude finds what's missing before engineering does. Expect 10–15 findings, of which 3–5 will be real gaps you hadn't seen. That's the win: those are the ones that would have surfaced mid-sprint.

```
You are a skeptical senior engineer and a skeptical head of product
reviewing this PRD before it goes to the team. Your job is to find
problems, not to be nice.

PRD:
[PASTE PRD HERE]

List, in order of severity:
1. Ambiguities — statements a developer could interpret two different ways
2. Missing scenarios — user situations or edge cases the PRD ignores
3. Implicit assumptions — things the PRD treats as true without saying so
4. Contradictions — places where the PRD disagrees with itself
5. Unanswered questions — what a team would have to ask before building this

For each finding, quote the relevant PRD text and explain the risk in one
sentence. Do not summarize the PRD or praise it. If the PRD is too short
to review meaningfully, tell me what's missing before proceeding.
```

---

## 3. Make a backlog item AI-ready

Developers increasingly hand your tickets straight to AI assistants. A vague ticket used to get clarified in the daily; now it gets implemented in the worst plausible way before anyone notices. Run your next sprint candidates through this filter: INVEST check, testable acceptance criteria, and explicit non-goals so the work doesn't sprawl.

```
You are a senior Product Owner preparing a backlog item for a team where
developers work with AI coding assistants. Ambiguity in the ticket
becomes wrong code, so precision matters.

Backlog item:
[PASTE TICKET / STORY HERE]

Do the following:
1. Score it against INVEST (Independent, Negotiable, Valuable, Estimable,
   Small, Testable). Flag any criterion it fails and say why.
2. Rewrite it in this structure:
   - Story ("As a..., I want..., so that...")
   - Acceptance criteria in Given/When/Then (happy path first, then edge cases)
   - Non-goals: what is explicitly OUT of scope for this ticket
   - Open questions for the team
3. Mark every acceptance criterion you invented (vs. found in my text)
   as "(assumed)" so a human can verify it against the real system.

If the item fails 2+ INVEST criteria, recommend splitting it and propose
the split. Ask me clarifying questions if the intent is unclear.
```

---

## 4. Sanity-check an estimate

Don't ask Claude "how long will this take?" — it will give you a confident, fictional number. Instead, have it decompose the work and surface what the estimate silently assumes. The decomposition is where you and the team discover the story is bigger (or smaller) than it looked. Keep the final number human and on your team's scale.

```
You are a pragmatic tech lead helping a Product Manager pressure-test an
estimate. Do NOT give me a time or story-point estimate — that's the
team's job. Your job is to expose what the estimate depends on.

Work item:
[PASTE STORY / FEATURE DESCRIPTION HERE]

Current team estimate: [PASTE ESTIMATE, e.g. "5 points" or "3 days"]

Output:
1. Decomposition: the concrete sub-tasks this work implies, including the
   unglamorous ones (error handling, edge cases, testing, migration,
   rollout, documentation)
2. Hidden complexity: which sub-tasks look small but often aren't, and why
3. Assumptions the estimate relies on (integrations that work, data that's
   clean, decisions already made) — list each one explicitly
4. Verdict: does the decomposition make the current estimate look
   optimistic, reasonable, or padded? One paragraph, hedged appropriately.

If you don't have enough context about the system to decompose this
credibly, ask me questions first.
```

---

## 5. Draft a PRD from a one-paragraph idea

The trap with AI-drafted PRDs is that Claude fills every gap with plausible invention, and you end up reviewing fiction. The fix: force a clarifying-questions round first. You answer 5–8 questions in five minutes; the resulting draft is built from your answers, not from guesses. Then run workflow #2 on it.

```
You are a senior Product Manager. I want to develop this rough idea into
a PRD, but do NOT write the PRD yet.

Idea:
[PASTE ONE-PARAGRAPH IDEA HERE]

Step 1: Ask me the 5–8 most important clarifying questions — about target
users, the problem being solved, success metrics, scope boundaries,
constraints, and existing alternatives. Ask only questions whose answers
would change what gets built. Wait for my answers.

Step 2 (after I answer): Write a one-page PRD with these sections:
- Problem & who has it
- Goals and success metrics
- Non-goals (explicit)
- Proposed solution (high level, no implementation detail)
- Key user scenarios
- Risks & open questions

Mark anything not grounded in my answers as "(assumed)".
```

---

## 6. Translate a technical discussion for stakeholders

Engineers make decisions in ADRs, RFCs, and long threads that materially affect timeline, cost, and risk — and most stakeholders never understand them. Translating is exactly what LLMs are best at. You stay the credible bridge between engineering and business, at a fraction of the effort.

```
You are a translator between engineering and business. I'll give you a
technical discussion (an ADR, RFC, or thread). Rewrite it for a
non-technical stakeholder audience.

Technical source:
[PASTE ADR / DISCUSSION / THREAD HERE]

Output:
1. What was decided — one sentence, no jargon
2. Why it matters to the business — impact on timeline, cost, risk, or
   user experience (only the dimensions actually affected)
3. What was considered and rejected, and why — 2-3 bullets max
4. What this means for us — any action, decision, or expectation change
   for non-engineers

Rules: no unexplained technical terms; if a term is unavoidable, define
it in parentheses in plain words. Total length under 200 words. If the
source doesn't state the final decision clearly, ask me rather than
inferring one.
```

---

## 7. Release notes / sprint review from done tickets

Nobody enjoys writing the sprint summary, so it's either skipped or written as a ticket list nobody reads. Paste the done column and get audience-appropriate narratives in two minutes. The theming — grouping tickets into user-visible outcomes — is the part humans skip and Claude does well.

```
You are a product communications writer. I'm giving you the list of
tickets completed this sprint. Turn them into two outputs.

Completed tickets:
[PASTE LIST OF DONE TICKETS HERE — titles and short descriptions]

Output A — Release notes (for users/customers):
- Group tickets into themes by user-visible outcome, not by ticket
- Lead with benefits ("You can now..."), not implementation
- Omit purely internal work (refactors, tooling) entirely

Output B — Sprint review summary (for internal stakeholders):
- 3-5 bullets: what shipped and why it matters
- 1-2 bullets: notable internal/technical work and its future payoff
- Anything that was planned but visibly didn't ship, if inferable

Plain language throughout, no ticket IDs in Output A. If you can't tell
whether a ticket is user-visible or internal, ask me instead of guessing.
```

---

## 8. Build a decision log from threads

Real decisions get made in Slack threads and email chains, then evaporate. Three months later nobody remembers why you chose X, and the debate reopens from zero. Paste the raw thread and get a structured decision record you can drop into Confluence or Notion. Do this weekly and you accumulate organizational memory almost for free.

```
You are a meticulous project historian. I'm giving you a raw conversation
(Slack thread, email chain, or meeting transcript). Extract every
decision that was actually made.

Conversation:
[PASTE THREAD / EMAIL CHAIN HERE]

For each decision, output a decision-log entry:
- Decision: what was decided, one sentence
- Date & participants (if identifiable from the text)
- Context: the problem that forced the decision
- Options discussed and why the alternatives lost
- Status: Decided / Tentative / Reopened — based only on the text
- Follow-ups: any actions or open items attached to it

Strict rule: only record decisions explicitly supported by the text. If
something was discussed but not resolved, list it separately under
"Discussed, not decided". If the thread is ambiguous about whether a
decision was final, flag it and ask me.
```

---

## 9. Prioritization pass with assumptions surfaced

RICE and WSJF scores look objective but every number in them is a judgment call. Claude won't know your real reach or impact — and that's fine. The value is in forcing every assumption into the open, so your prioritization conversation is about the assumptions (where the disagreement actually lives) instead of about defending final scores.

```
You are a prioritization facilitator. Score these backlog items using
[RICE / WSJF — pick one], but treat every input as an assumption to be
challenged, not a fact.

Items:
[PASTE BACKLOG ITEMS HERE — titles + short descriptions; include any
data you have: user counts, revenue, effort guesses]

For each item:
1. Estimate each scoring component (e.g. Reach, Impact, Confidence,
   Effort). For every component, state the assumption behind the number
   in one sentence, prefixed "ASSUMPTION:".
2. Compute the score.
3. Rate your confidence in the score: High / Medium / Low, with reason.

Then output:
- A ranked table
- The 3 assumptions that most affect the ranking — the ones where being
  wrong would reorder the list — phrased as questions for my team
- Any item you couldn't score credibly, with what data you'd need

Where I gave you no data for a component, ask me before inventing a number.
```

---

## 10. Create a project glossary

Half of all product-engineering misalignment is vocabulary: "account" means one thing in the codebase, another in sales, a third in the data warehouse. A shared glossary fixes this cheaply — and it doubles as context you can paste into future Claude sessions so its output uses your team's language, not generic terms.

```
You are a domain-language editor building a shared glossary for a
software project. Business and engineering must end up meaning the same
thing by the same word.

Source material (any mix of: PRD, ticket samples, API docs, onboarding
notes):
[PASTE SOURCE MATERIAL HERE]

Output a glossary table with columns:
- Term
- Plain-language definition (one sentence a new hire understands)
- What it is NOT / common confusion (e.g. "a User is not an Account")
- Where it appears (product UI, code, analytics — if inferable)

Rules:
1. Include every domain-specific term, including ones used inconsistently.
2. If the source uses two words for the same concept, or one word for two
   concepts, flag it in a "Conflicts to resolve" section at the end —
   these are the most valuable findings.
3. Don't invent definitions for terms the source doesn't explain enough;
   list those under "Needs a human definition" and ask me about the top 3.
```

---

## One habit to keep

Notice the pattern across all ten: **you provide the judgment and the real context; Claude provides the structure, the exhaustiveness, and the first draft.** Never ship its output unreviewed — treat everything it produces as a strong draft from a smart colleague who has never seen your actual system. Ten minutes of review beats weeks of unwinding an invented acceptance criterion.
