# 🎬 Copy-Paste Playbook

Your ready-made prompts for this exact setup: the **project folder attached** in Claude Desktop, and **Jira + Confluence connected**. Copy one, fill the `[PLACEHOLDERS]`, and go. Each prompt asks Claude to check with you before running off in the wrong direction.

**1. Pull & orient at the start of a session**
Use when you sit down to work and want Claude grounded in the latest project.
```
You are my product partner for this project, running in Code mode inside the project folder; Jira and Confluence are connected.
First, run `git pull` to get the latest, then tell me in a few bullets what changed since last time.
Then give me a 5-line orientation: what this project is, its main parts, and where the docs live.
Finally, from Jira, list the current sprint's open issues for [PROJECT/BOARD].
Ask me what I want to focus on before doing anything else.
```

**2. Turn notes into Jira stories**
Use to convert a Confluence page or meeting notes into proper backlog items.
```
You are my backlog assistant. Read the notes here: [CONFLUENCE PAGE LINK or PASTE NOTES].
Ground your understanding in the attached project where relevant.
Draft user stories in the form "As a [user], I want [goal], so that [benefit]",
each with Given/When/Then acceptance criteria and a suggested priority.
Ask me clarifying questions about anything ambiguous BEFORE drafting.
Output as a table I can review. Do NOT create them in Jira until I say "create these".
```

**3. Poke holes in a story before sprint**
Use in refinement to find gaps before the team commits.
```
You are a skeptical staff engineer + QA lead. The project folder is attached.
Here is a story: Jira issue [ISSUE-KEY] (or [PASTE STORY]).
Poke holes in it against the REAL code and docs: missing acceptance criteria, edge cases,
error states, data/permissions concerns, dependencies, and anything unclear.
List the top risks and the questions I should answer before we commit.
Ask me anything you need first. Output as: Gaps | Edge cases | Risks | Open questions.
```

**4. Make a backlog item "ready"**
Use to get a rough item to Definition-of-Ready before planning.
```
You are my backlog assistant with Jira connected and the project folder attached.
Take Jira issue [ISSUE-KEY] and get it to "ready": crisp description, clear user value,
Given/When/Then acceptance criteria, dependencies, and out-of-scope notes.
Check feasibility against the real project and flag anything that needs a decision.
Ask clarifying questions first. Show me the updated version; update the Jira issue only after I approve.
```

**5. Draft a PRD in Confluence from a one-paragraph idea**
Use to go from a rough idea to a structured PRD (clarify first).
```
You are my product lead. Here's the idea: [ONE PARAGRAPH].
Before writing anything, ask me 3–7 clarifying questions (users, problem, scope, success metrics, constraints).
Then draft a PRD with: Problem, Goals & non-goals, Users, Solution overview, Requirements,
Success metrics, Risks, Open questions. Ground it in the attached project where relevant.
Prepare it as a Confluence page under [SPACE / PARENT PAGE] for my review — don't publish until I confirm.
```

**6. Sanity-check an estimate against the real code**
Use before planning to surface hidden work.
```
You are my product engineering partner; the project folder is attached.
Decompose Jira issue [ISSUE-KEY] (or [PASTE STORY]) against the REAL code and docs.
Surface hidden work, dependencies, and assumptions I should confirm with the team.
Give a rough S/M/L with reasoning — a starting point, not a verdict. The team still decides.
Ask clarifying questions first. Output as: Steps | Hidden work | Assumptions | Rough size + why.
```

**7. Sprint-review / release-notes summary**
Use to write an update from Jira plus what actually changed.
```
You are my PM assistant; Jira and Confluence connected, project folder attached.
Summarize [sprint SPRINT-ID / release VERSION] for [AUDIENCE].
Pull the relevant issues from Jira (Done / In-Progress / not completed) and cross-check
against real changes in the attached project.
Output: Highlights, Completed (with issue keys), In progress, Didn't make it (+why), Next up.
Ask me to confirm the sprint/version and space first.
Then prepare it as a Confluence page under [SPACE / PARENT PAGE] for my review before publishing.
```

**8. Explain a technical decision in plain product language**
Use when engineering says something you need to translate for stakeholders.
```
You are a translator between engineering and product. The project folder is attached.
Explain [the code area / technical decision: e.g. "why we're moving to a queue for emails"]
in plain language a non-technical stakeholder understands.
Cover: what it is, why it matters for users/business, trade-offs, and what it does NOT change.
Ask me what to focus on if it's ambiguous. Keep it to a short paragraph plus 3 bullet takeaways.
```

**9. Build or refresh a project glossary in Confluence**
Use to keep a shared vocabulary that matches the real system.
```
You are my documentation assistant; Confluence connected, project folder attached.
Scan the attached project (code, docs, config) and extract the key domain terms, entities,
and acronyms actually used. For each: a plain-language definition and where it appears.
Flag terms used inconsistently. Ask me to confirm scope first.
Prepare (or update) a "Glossary" Confluence page under [SPACE / PARENT PAGE] for my review.
```

**10. Prioritization pass (RICE)**
Use to rank a set of items with assumptions made explicit.
```
You are my prioritization partner; Jira connected, project folder attached.
Take these items: [ISSUE-KEYS or LIST]. Score each with RICE (Reach, Impact, Confidence, Effort).
Base Effort on the real project where you can; state every assumption you make for Reach/Impact.
Ask me for any inputs you're missing first.
Output as a table sorted by RICE score, with a short "why" and a clearly labeled Assumptions section.
Don't change Jira priorities until I approve the ranking.
```
