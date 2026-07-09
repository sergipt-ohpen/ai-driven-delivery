# ⏱️ Estimates & Stakeholder Updates

Two things you do constantly: figure out how big a piece of work really is, and tell people what's happening. Both get easier when Claude is grounded in your actual project folder (open in Code mode) plus live Jira and Confluence.

## Sanity-check an estimate

You are not asking Claude for a number. You are asking it to help you *see the work* before the team estimates it.

Because your project folder is attached, Claude can decompose a story against the **real code and docs** — not a guess. Point it at a Jira issue or paste a story, and ask it to break the work into concrete steps, then flag what's usually forgotten: data migrations, edge cases, tests, feature flags, third-party calls, touched files that ripple elsewhere.

What you get back is a checklist of *hidden work and assumptions*. That's the gold. "This touches the billing module, which also feeds invoices — did we account for that?" is worth more than any point value.

Keep sizing light. If your team uses story points or t-shirt sizes, ask Claude for a **rough** S/M/L with the reasoning, and treat it as a conversation starter. **Claude assists; the team still decides.** Bring its list of hidden work to planning and let the engineers react to it. Often the surprise items are what move a "small" to a "large."

A good habit: end every estimate check by asking "what would make this bigger than it looks?" and "what could we cut to make it smaller?"

## Stakeholder updates

Nobody wants to write the same status three times. Let Claude assemble it from sources that are already true.

For a **sprint-review summary**, have Claude pull the sprint's issues from Jira via the connector — what's Done, what's In Progress, what slipped — and cross-reference what actually changed in the attached project. The result reads like something a human who was paying attention wrote, because it's built from real tickets and real changes, not vibes.

For **release notes**, ask for a customer-friendly version (features and fixes, no jargon) and an internal version (with issue keys and technical notes). Same source, two audiences.

For a **weekly status update**, keep it to a short shape: progress, risks, what's next, decisions needed. Claude drafts it; you edit the judgment calls.

Then **publish to Confluence** directly through the connector — into your team space, under the right parent page. Ask Claude to link back to the Jira issues so readers can drill in. You review, tweak the tone, and it's live. What used to be a Friday-afternoon chore is now a five-minute review.

One caution: Claude reports what the tickets and code say. If a ticket is marked Done but isn't really, the summary inherits that. Skim before you publish — you're the editor.

## 🛠️ Try it with Claude

**Sanity-check an estimate**
```
You are my product engineering partner. The project folder is attached.
Look at Jira issue [ISSUE-KEY] (or this story: [PASTE STORY]).
Decompose the work into concrete steps against the REAL code and docs in the folder.
Then list: (1) hidden work and dependencies, (2) assumptions I should confirm with the
team, (3) a rough size (S/M/L) with your reasoning — this is a starting point, not a verdict.
If anything is ambiguous, ask me clarifying questions BEFORE you answer.
Output as: Steps | Hidden work | Assumptions to confirm | Rough size + why.
```

**Sprint-review summary → Confluence**
```
You are my PM assistant with Jira and Confluence connected and the project folder attached.
Summarize sprint [SPRINT NAME/ID] for a stakeholder review.
Pull Done / In-Progress / Not-completed issues from Jira, and cross-check what actually
changed in the attached project. Write a summary with: Highlights, Completed (with issue
keys), In progress, Didn't make it (+ why), Next up.
If you need me to confirm the sprint or space, ask first.
Then draft it as a Confluence page under [SPACE / PARENT PAGE], linking each issue key.
Show me the draft before publishing.
```

**Release notes (two audiences)**
```
You are my release-notes writer. Jira and Confluence are connected; the project folder is attached.
For release [VERSION], gather the shipped issues from Jira (fix version or label [X])
and confirm against the real changes in the project.
Produce TWO versions: (a) customer-facing — plain language, grouped New / Improved / Fixed,
no internal jargon; (b) internal — same items with issue keys and technical notes.
Ask me any clarifying questions first (audience, tone, what to exclude).
Then prepare both as a Confluence page under [SPACE / PARENT PAGE] for my review.
```
