# ⚙️ Configure Your Own Claude

The Playbook works, but you're still retyping the same setup every time: "ground this in the real project," "ask before you create anything in Jira," "ask clarifying questions first." This lesson is the next rung: say it once in the right place, and Claude already knows it before you ask — no more copying.

## Two places to configure Claude — and why the difference matters

Claude reads instructions from a file called `CLAUDE.md`, and there are two of them:

- **Project `CLAUDE.md`** — lives inside the repository, travels with git, applies to *everyone* who opens that project in Claude. Engineers usually already have one, full of their own conventions.
- **Personal `CLAUDE.md`** — lives on your own laptop (at `~/.claude/CLAUDE.md`), applies to *every* project you open, and only affects your own sessions.

**Put your preferences in the personal one.** Editing the project's shared file with your own habits means every engineer's session changes too — that's not your call to make alone. Your personal file is exactly the right amount of yours: nobody else sees it, and it follows you into any project you attach.

## Set it up — let Claude interview you

Don't write this from a blank page. Ask Claude to draft it *with* you:

```
I want to set up my personal Claude configuration (~/.claude/CLAUDE.md).
Interview me with a handful of short questions about how I like to work:
what I always want you to check before acting, what output formats I prefer,
what tone I want in drafts, and anything that's bitten me before (things you've
done that I had to correct). Then write the file for me and show me what
you wrote before saving.
```

## A starter you can react to

If you'd rather start from something concrete and edit it, here's a reasonable default for a PO/PM. Paste it in, then tell Claude what to change:

```text
## How I work

- Always ground answers in the attached project — say so plainly if
  something isn't there instead of guessing.
- Never create or update a Jira issue or Confluence page without
  showing me the draft first.
- If a request is ambiguous, ask up to 3 clarifying questions before
  producing anything.
- Default output: short and structured (tables or bullets), not long prose.
- Flag hidden work and assumptions explicitly — don't fold them into
  a confident-sounding answer.
```

That last block of five lines is genuinely all it takes — Claude reads it automatically from now on, in every project, without you pasting anything.

## Skills: turn a whole Playbook prompt into one word

A **Skill** is a saved procedure Claude can run on command — you type `/name` instead of pasting the whole prompt. Like `CLAUDE.md`, skills come in two flavors: **project** skills (shared, in the repo) and **personal** skills (`~/.claude/skills/<name>/SKILL.md`, yours, everywhere). For your own recurring tasks, personal is what you want.

You don't need to write the file yourself — ask Claude to do it from a Playbook entry you already like:

```
Turn this into a personal Claude skill I can run with /sprint-summary
(save it under my personal skills, not the project's):

[PASTE THE "Sprint-review / release-notes summary" PROMPT FROM THE PLAYBOOK]

Ask me anything you need to generalize it, then create the skill file.
```

From then on, typing `/sprint-summary` does what used to take a full copy-paste. Do the same with whichever 2-3 Playbook prompts you actually reach for most — that's the whole exercise, and the Playbook stops being something you copy from and becomes something Claude already knows.

A skill is the right tool when the repeated thing is *one prompt*. When the repeated thing is a whole procedure with its own rules — building every screen of a POC the same disciplined way, say — that's a job for a dedicated agent instead. The next lesson builds one.
