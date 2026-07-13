# ⚙️ Configure Your Own Claude

The Playbook works, but you're still pasting the same prompts every day. This lesson makes that stop. The important part: **you do all of it just by talking to Claude in Code mode.** Nothing to install, no folders to find, no files to copy by hand. You paste a message, Claude writes whatever it needs on your machine, exactly like every other prompt in this guide.

## Skills: turn a Playbook prompt into one word

A **skill** is a saved prompt you run by typing `/its-name` instead of pasting the whole thing. `/sprint-summary` instead of the twelve-line summary prompt. That's the entire idea.

And you don't build them one at a time. **Paste this once** and Claude creates your whole PM pack for you:

```
Set up my personal PM skill pack. Create these as personal Claude skills
(~/.claude/skills/<name>/SKILL.md, not inside any project). For each, write a
SKILL.md in the grounded style from this guide: read the attached project
first, ask before creating anything in Jira or Confluence, and show me a draft
before publishing.

- /refine-story: turn a rough idea or notes into one ready user story
- /poke-holes: a skeptical-engineer review of a story before a sprint
- /draft-prd: interview me, then draft a PRD grounded in the real project
- /estimate-check: decompose a story against the real code, surface hidden work
- /sprint-summary: a sprint or release summary from Jira plus what actually changed
- /new-skill: interview me about a task I keep repeating, then create a new
  personal skill for it

When you're done, show me the list of files you created.
```

Claude writes all six files itself. You never open a folder or move anything. From now on, typing `/refine-story` does what used to take a full copy-paste, in every project you open.

*This works because you're in Code mode, where Claude can write to your own machine (the same setup from "Get Your Project into Claude"). If you're ever in plain chat, switch to Code mode first.*

## Need a new one later? Just describe it

The last skill in that list, `/new-skill`, is the one that means you never write another skill by hand. Whenever you catch yourself repeating something, type:

```
/new-skill
```

Claude asks what the task is, what it should check, and what output you want, then writes the skill for you. You describe the goal in plain words. You never learn where files go or how a skill is built. That's Claude's job, not yours.

## Set your preferences once, too

Skills are per-task. Your **preferences** are the things you want in *every* answer: ground it in the real project, ask before creating anything, keep drafts short. Those live in one personal file Claude reads automatically, and you set it up the same way, by talking:

```
Set up my personal Claude preferences (~/.claude/CLAUDE.md). Interview me with a
few short questions about how I like to work: what you should always check
before acting, what output format I prefer, and anything that has tripped us up
before. Then write the file and show me what you wrote before saving.
```

Answer the questions and you're done. From then on every chat and every skill follows those preferences without you repeating them.

## Where all this lives (only if you're curious)

You never have to touch these. But if you want to look: your skills are small text files at `~/.claude/skills/<name>/SKILL.md`, and your preferences are at `~/.claude/CLAUDE.md`. Both are **personal**, on your laptop only, and they follow you into every project you open. Engineers also keep a **project** version of both inside the repo, shared with the team. Leave those to them and keep your own habits in the personal ones.

## The next rung

A skill is the right tool when the repeated thing is *one prompt*. When it's a whole procedure with its own rules, like building every screen of a new app the same disciplined way, that is a job for a dedicated **agent**. The next lesson builds one from scratch.
