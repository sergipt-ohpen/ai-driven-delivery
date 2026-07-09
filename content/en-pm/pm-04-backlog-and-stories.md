# 📋 Backlog & User Stories in Jira

A backlog is only useful when its items are grounded in the real product and clear enough to build. With your project open in Claude Desktop's Code mode and Jira connected through the Atlassian connector, Claude can turn rough ideas into well-formed stories, check them against how the system actually works, and write them straight into Jira.

Pull first — ask Claude to pull the latest and summarize what changed (see the previous page) — then work.

## From rough idea to real story

Start with whatever you have — a Slack thread, a Confluence note, a one-line request. Hand it to Claude and ask it to shape a story, but tell it to read the project first so the story fits reality.

A good user story has:

- **A clear "so that"** — who benefits and why.
- **Acceptance criteria in Given/When/Then** — testable, not fuzzy.
- **The right size** — small enough to finish inside a sprint.

Example of criteria Claude should produce:

> **Given** a logged-in user on the account page
> **When** they request a password reset
> **Then** they receive a reset email within one minute and the old password stops working after they set a new one.

Because Claude read the project, it knows whether "reset email" is even possible yet — and if the email service isn't wired up, it flags that as a dependency instead of pretending it's a five-minute job.

## Make it "ready"

A story is *ready* when it's **clear, testable, and small enough**. Before anything enters a sprint, have Claude poke holes in it:

> "Play skeptical engineer. Read the attached project and this story. List every ambiguity, missing edge case, and hidden dependency you'd raise in refinement — before this goes into a sprint."

Claude will surface the awkward questions early: What happens if the email bounces? Do reset links expire? Does this touch the mobile app too? Better to answer these now than mid-sprint.

## Write it into Jira

Once you're happy, Claude can create or update the issue directly through the Atlassian connector:

- **Create:** "Create this as a Story in the `PAY` project, add the acceptance criteria to the description, and set the label `checkout`."
- **Update:** "Open `PAY-214`, replace the acceptance criteria with the version above, and add a comment explaining what changed."
- **Split:** "This story is too big. Split it into 2-3 smaller stories and create them all in `PAY`, linked to the epic `PAY-100`."

Always glance at the result in Jira. Confirm the project, issue type, and epic link are right before refinement.

## 🛠️ Try it with Claude

```text
Here's a rough request: [PASTE IDEA / CONFLUENCE NOTES / SLACK THREAD].
Read the attached project so your story matches how the system really works.
Draft ONE user story with: title, "As a / I want / so that", and 3-6
acceptance criteria in Given/When/Then. Note any dependency you spot in the
code. If the request is ambiguous, ask me up to 3 questions BEFORE drafting.

Output: the story in markdown, then a short "Dependencies / risks" list.
```

```text
Act as a skeptical engineer in backlog refinement. Read the attached project
and this story: [PASTE STORY]. List every ambiguity, missing edge case, and
hidden dependency, and say whether it's small enough for one sprint. If not,
propose how to split it. Ask me a clarifying question if anything is unclear.

Output: a checklist of issues, then a verdict: Ready / Not ready (why).
```

```text
Create the story below as a [ISSUE TYPE] in the Jira project [PROJECT KEY],
linked to epic [EPIC KEY], with label [LABEL]. Put the acceptance criteria in
the description. Story: [PASTE STORY]. After creating it, give me the new
issue key and a link, and confirm the fields you set. Ask me first if the
project key or issue type is unclear.
```
