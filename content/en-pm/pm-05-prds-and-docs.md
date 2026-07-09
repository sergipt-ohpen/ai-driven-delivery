# 📄 PRDs & Docs in Confluence

A PRD is a promise about what you'll build and why. It's only trustworthy when it matches the product you actually have. With your project open in Claude Desktop's Code mode and Confluence connected through the Atlassian connector, Claude can draft a spec grounded in the real system and publish it straight to Confluence — with you reviewing before anyone reads it.

Pull first — ask Claude to pull the latest — then draft.

## Start from one paragraph

You don't need a blank-page ritual. Give Claude the seed:

> "We want to let users export their invoice history as a PDF. Help me turn this into a PRD."

## Let Claude ask questions first

Before it writes a word, have Claude interview you. This is where a good PRD is won.

> "Before drafting, ask me the questions a strong PM would need answered: scope, users, edge cases, what's out of scope, success metrics. Don't write the PRD until I've answered."

Claude will ask the useful things: Which users can export? All invoices or a date range? What happens with zero invoices? Is this web-only? Answering these up front means the PRD is right the first time instead of after three review rounds.

## Cross-check against reality

Now the part only a grounded assistant can do: check the idea against the actual project.

> "Read the attached project. Given how invoices and PDFs are handled today, what already exists we can reuse, what's missing, and what would this realistically touch?"

Claude might find you already generate PDFs for receipts (reuse it), that invoices aren't stored with a stable ID (a gap to solve), or that export would need a new background job. This turns a wishful PRD into a buildable one and gives engineering a running start.

A solid PRD usually covers: problem, users, goals & non-goals, user flow, requirements, success metrics, open questions, and dependencies pulled from the real code.

## The human review checkpoint

**This is non-negotiable: read every PRD yourself before it's published.** Claude drafts fast and drafts well, but you own the decision. Check that the scope matches what stakeholders agreed, that non-goals are honest, and that the "reuse/gaps" claims point to real files. When you're satisfied, publish.

## Publish or update in Confluence

Claude can write to Confluence directly:

- **Create:** "Publish this as a new page titled 'PRD: Invoice PDF Export' in the `Product` space, under the parent page 'Roadmap 2026'."
- **Update:** "Open the Confluence page 'PRD: Invoice PDF Export', update the Requirements section with the version below, and leave the rest untouched."

Open the page afterward, skim it in Confluence's own view, and share the link once it reads the way you want.

## 🛠️ Try it with Claude

```text
Seed idea: [ONE PARAGRAPH DESCRIBING THE FEATURE]. Before writing anything,
interview me: ask the questions a strong PM needs answered about scope, users,
edge cases, non-goals, and success metrics. Wait for my answers. Do NOT draft
the PRD yet.

Output: a numbered list of clarifying questions, grouped by topic.
```

```text
Read the attached project. For this idea — [PASTE IDEA / ANSWERS] — tell me
what already exists that we can reuse, what's missing, and what areas of the
system this would touch. Cite the files or docs behind each point. If the
relevant area of code is ambiguous, ask me before assuming.

Output: three lists — "Reuse", "Gaps", "Impact (with file paths)".
```

```text
Using my answers and your project findings, draft a PRD for [FEATURE] with:
problem, users, goals, non-goals, user flow, requirements, success metrics,
open questions, dependencies. Then STOP so I can review — do not publish yet.
Once I approve, publish it as a new Confluence page titled "[TITLE]" in the
[SPACE] space under parent "[PARENT PAGE]". Ask me if any of these are unclear.
```
