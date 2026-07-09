# 🎯 The Project as Source of Truth

The team's real project lives on GitHub: the code and the docs, together, always current. That project is your source of truth. Everything you ask Claude should be anchored to it — not to a guess, not to a six-month-old memory of how the product works.

You keep a copy of that project on your laptop and attach it in Claude Desktop's **Code mode**: click the **`</>` Code** toggle (top-left), then under **"Where Claude runs"** choose **Local** and pick the project folder. Now Claude runs *inside* that folder with full read access to the code, the config, the docs — and git. That single change is what turns Claude from a clever writer into a teammate who knows *your* product.

## Pull first, every time

Your local copy is only as fresh as your last pull — and in Code mode you never leave the chat to refresh it. At the start of a session, just ask:

> "Pull the latest and give me a 5-line summary of what changed."

Claude runs `git pull` for you and tells you what moved. Make this your opening move every session. Pull first, then ask — otherwise Claude will confidently describe last week's reality.

## Vague question vs. real question

Watch the difference. Here's the vague version:

> "How does our login work? Write a story to add password reset."

Claude has nothing to hold onto, so it invents a plausible-sounding login and a plausible-sounding story. Some of it will be wrong, and you won't know which parts.

Now the grounded version:

> "Read the auth code and docs in the attached project. Based on how login *actually* works today, draft a story for password reset."

Same goal, completely different answer. Claude now cites the real files, notices we already use email-based sessions, spots that there's no email-sending service wired up yet, and writes a story that fits the product you actually have.

Grounding changes three things:

1. **Accuracy** — answers reference real files, real ticket IDs, real page names.
2. **Relevance** — Claude respects constraints that already exist instead of inventing new ones.
3. **Trust** — when Claude points to a specific file or doc, you can open it and check.

## Still sanity-check

Grounded answers are much better, not magic. Claude can misread a file, miss a folder, or work from a stale pull. So keep a light hand on the wheel:

- If a claim matters, ask Claude *which file or page* it came from.
- If something surprises you, open that file yourself or ask a developer.
- Treat the first draft as a strong starting point, never the final word.
- If a pull fails or you're on the wrong branch, ask Claude — it's all in the same chat.

The habit is simple: **pull, ground, verify.** Do that and every ticket, PRD, and update you produce will match the product your team is actually building.

## 🛠️ Try it with Claude

```text
Using the project open in Claude Desktop's Code mode, give me a plain-English
tour of what this product does. Read the top-level docs and the main code
folders — do NOT guess. For each capability you describe, name the file or
doc it came from. If the project structure is unclear or something is
ambiguous, ask me before you assume.

Output: a short bulleted list, "Capability — where I found it".
```

```text
I think our checkout supports discount codes. Confirm or correct this by
reading the attached project only. If it's there, point me to the exact
files. If it's not there (or only partly there), say so plainly and list
what's missing. Ask a clarifying question if "checkout" maps to more than
one area of the code.

Output: a verdict line, then a short evidence list with file paths.
```

```text
Before we start today, pull the latest changes for this project (run git pull),
then give me a 5-line summary of what changed since the last pull that a PM
should care about. If the pull fails or you're unsure which branch to check,
tell me and ask.
```
