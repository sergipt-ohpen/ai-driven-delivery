# 📂 Get Your Project into Claude

This is the setup that makes everything else work: the real project, open in Claude. It takes about ten minutes the first time, and then you never think about it again.

## What you need

- The **Claude Desktop** app (download it and sign in with your work account).
- A **paid Claude plan** — Code mode is part of it.
- **Git installed on your laptop.** Claude drives it for you — you'll never type a git command — but the real `git` still has to be on your machine first. Windows: download the installer from [git-scm.com](https://git-scm.com/downloads) and accept every default. Mac: open Terminal, type `git --version`, and if it's missing macOS offers to install it on the spot. Stuck? Any engineer can do this in two minutes.
- **Access to your team's repository** on GitHub. If you're not sure you have it, ask any engineer to add you and share the repo's address (a URL like `github.com/your-company/your-product`).

## Step 1 — Turn on Code mode

Open Claude Desktop. In the top-left, click the **`</> Code`** toggle. This switches Claude from plain chat into the mode that can work with files on your computer.

At the bottom you'll see **"Where Claude runs."** Choose **Local** — this means Claude works on your own laptop, in a folder you pick.

## Step 2 — Get the project folder onto your laptop

You need a local copy of the repository. The easiest way: **just ask Claude to do it.** In Code mode, paste this:

```
Clone our team's repository to a sensible folder on my machine:
https://github.com/your-company/your-product

Then tell me the folder path so I can select it.
```

Claude will download the project and tell you where it put it. (If your company requires a special login for GitHub, an engineer can do this one-time step with you.)

## Step 3 — Point Claude at the folder

Back at the bottom of the Code panel, next to **"Where Claude runs,"** click the **folder button** (or the **+**) and select the project folder from Step 2. You'll see the folder's name appear there — that's your confirmation that Claude is now "inside" the project.

From now on, when you ask about the product, Claude reads the actual files to answer.

## Step 4 — Keep it fresh (the only habit that matters)

Code and docs change every day. Before you start real work, tell Claude:

```
Pull the latest from the repository, then give me a 5-line summary
of what changed since I last worked here.
```

Claude runs this with the Git you installed earlier — no separate app, no buttons, no commands to remember. Do this at the start of a session and you're always working against today's reality.

## Sanity check

Confirm it's wired up correctly with a question only the real project can answer:

```
Look at the actual code and docs in this folder and tell me, in plain
language, what this product does and what its main parts are. If
anything is unclear or missing, say so instead of guessing.
```

If you get a specific answer that matches your product — you're set. Next: connect Jira & Confluence.
