# 🤖Git with AI: what changed in your workflow 🔴 — 17 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 17 min

## Git with AI: from the classic PR to the agentic workflow

> This lesson has two parts. **First**: how to make a well-crafted Pull Request — because being senior doesn't guarantee mastery of the PR flow (many of us come from corporate mono-repos, GitLab, SVN, or teams where PRs were always done by someone else). **Second**: how that flow changes in 2026 with AI. If you already master the first part, jump straight to the second.

## Part 1: The Pull Request flow, step by step

### Why doing it well matters

A PR isn't just "uploading code." It's the **communication contract** between you and the team: what changes, why, how to test it, what the risks are. During the master you'll open many PRs on the shared LIDR repo — and the quality of your PRs is part of the evaluation.

### Master repo convention

In AI4Devs we work on a **shared** repo (not individual forks):

-   Your personal branch: `alumno/nombre-apellido`
    
-   Mentor demo branches (fallback in live sessions): `demo/s01-*`, `demo/s02-*`, etc.
    

This enables centralized PR review by mentors and cross-visibility of progress among students. **Don't fork**, clone directly and create your branch.

### Step-by-step flow

### 1\. Clone the repo and create your personal branch

```
# Usa la URL del repo del máster (te la compartimos en la sesión de bienvenida)
git clone <URL-DEL-REPO-DEL-MASTER>
cd <nombre-del-repo>

# Asegúrate de estar en main actualizado
git checkout main
git pull

# Crea tu rama personal (la usarás todo el máster), 
# Por ejemplo alumno/JorgePilo
git checkout -b alumno/<TU-NOMBRE>
git push -u origin alumno/<TU-NOMBRE>
```

### 2\. Create a working branch per session or feature

Don't mix work from different sessions in the same branch. Recommended convention:

```
# Desde tu rama alumno/*
git checkout -b alumno/jorge-pilo/s01-justfile

# Trabajas, pruebas...
```

Useful prefixes: `feat/`, `fix/`, `docs/`, `refactor/`, `lab/`, `s01/`, `s02/`...

### 3\. Make changes and descriptive commits

```
# Ver qué cambió
git status
git diff

# Stagear (todo o selectivo)
git add .
# o por archivo:
git add backend/app/api/routes/items.py

# Commit con mensaje convencional
git commit -m "feat(backend): add Justfile for common dev tasks"
```

**Conventional Commits format**:

-   `feat`: new functionality
    
-   `fix`: bug fix
    
-   `docs`: documentation changes
    
-   `refactor`: refactoring without behavior change
    
-   `test`: adding or modifying tests
    
-   `chore`: maintenance, configuration
    

**Rules for messages**:

-   Verb in present imperative (`add`, not `added` or `adds`).
    
-   Explain **what** and **why**, not just "misc changes."
    
-   First line ≤ 72 characters.
    

### 4\. Push your branch to GitHub

```
git push -u origin alumno/jorge-pilo/s01-justfile
```

The `-u` flag sets up tracking. For future pushes, `git push` is enough.

### 5\. Create the Pull Request

1.  Go to the repo on GitHub. You'll see a yellow banner: *"alumno/jorge-pilo/s01-justfile had recent pushes — Compare & pull request"*.
    
2.  Click **Compare & pull request**.
    
3.  Verify:
    
    -   **Base branch**: `main` (or the integration branch indicated by the mentor).
        
    -   **Compare branch**: your working branch.
        
4.  Fill in the form (see next section).
    
5.  If you're still working, mark the PR as **Draft** (button below the green "Create pull request").
    

### 6\. The PR description: the contract

A good PR description answers three questions. This is what the mentor (and your future self) need to see:

**What changes?** Brief, clear description: 1-3 sentences.

> Example: Adds a Justfile at the project root with recipes for the most-used commands (dev, test, lint, migrate, generate-client).

**Why?** Context, motivation, link to the issue if applicable.

> Example: The project's commands are scattered across 3 READMEs and 4 scripts. Justfile centralizes the CLI interface and reduces onboarding friction. Resolves the "HIGH: No task runner" point from session 1's [REPORT.md](http://report.md/).

**How to test it?** Concrete steps for the reviewer to validate.

> Example:
> 
> 1.  `just --list` shows all available recipes
>     
> 2.  `just dev` starts the development environment
>     
> 3.  `just test` runs the full test suite
>     
> 4.  `just lint` runs backend and frontend linters
>     

> 💡 **Senior tip**: if the PR is complex, add a "**Decisions / trade-offs**" section explaining alternatives you considered and discarded. It saves rounds of comments.

### 7\. The review cycle

1.  Assign reviewers (mentor or peers, depending on the session's convention).
    
2.  Wait for comments. Respond to each one: apply the change or argue why not.
    
3.  Push changes → the PR updates automatically.
    
4.  When you receive approval: **squash merge** (the master's default convention) to keep the history clean.
    
5.  Delete the local and remote branch:
    

```
git checkout main
git pull
git branch -D alumno/jorge-pilo/s01-justfile
git push origin --delete alumno/jorge-pilo/s01-justfile
```

### Anti-patterns a mentor will flag in your PR

-   ❌ Commit message "**fix stuff**" or "**WIP**" on main.
    
-   ❌ A single giant commit with 50 files.
    
-   ❌ PR without a description ("see code").
    
-   ❌ Mixing refactor + feature + fix in the same PR (each should go separately).
    
-   ❌ Changes to files unrelated to the task (aggressive formatters, auto-sorted imports).
    
-   ❌ `git push --force` on main or on PRs that already have approved reviews.
    

---

## Part 2: How this changes with AI (2026)

Now that you have the classic flow clear, here's what changed and what you'll use every day in the master.

### What changed at each step of the PR flow

![image.png](https://media1-production-mightynetworks.imgix.net/asset/18e66cd6-daf7-40a2-bfd5-14f4094a3ee6/d0f7b9368aee5c49.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Cheatsheet: commands and shortcuts by tool

### Commit message generation

![image.png](https://media1-production-mightynetworks.imgix.net/asset/1ef20fe5-7599-4127-a2d1-232067916e0a/9b1c0b9a8ec69180.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 Configure the style (Conventional Commits, Gitmoji, custom) in your tool's settings so messages come out already in the format your team uses.

### PR description generation

![image.png](https://media1-production-mightynetworks.imgix.net/asset/4a587ee7-4621-4f4a-b00e-4d361e427690/d7f53de40dde5675.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ AI **doesn't know the context of the issue or the why behind the change**. Always review the description and add the "why" — it's what differentiates you from a generated PR.

### Merge conflict resolution

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a7b06d5f-6bdf-47e7-93aa-39f0a7236386/e7dc66f56838b42f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ AI doesn't know your business logic. It resolves **code patterns**, not product decisions. Always review the proposed resolution before marking as resolved.

### Assigning tasks to agents from GitHub

![image.png](https://media1-production-mightynetworks.imgix.net/asset/5300c715-aeb9-4e8b-ad4e-40005d084b98/742c6d719badbba8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Automated Code Review

![image.png](https://media1-production-mightynetworks.imgix.net/asset/37398e88-2661-4a4d-8968-f3460227e2e1/9ea87a9c97792e6a.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

📊 **Official data (GitHub Blog, March 2026)**: Copilot Code Review has done **60M cumulative reviews**, **\>1 out of every 5** reviews on GitHub, **71%** leave actionable comments, an average of **5.1 comments** per review.

### Minimal setup: Claude Code GitHub Action

If you're going to configure your master repo so Claude Code responds to `@claude` mentions in PRs and issues, this is the minimal file:

```
# .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment: { types: [created] }
  pull_request_review_comment: { types: [created] }

jobs:
  claude:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Steps to activate it**:

1.  In the terminal with Claude Code installed: `claude` → `/install-github-app`.
    
2.  Authorize the GitHub app for your repo.
    
3.  Add `ANTHROPIC_API_KEY` to the repo secrets.
    
4.  Mention `@claude` in any PR/issue of the repo.
    

📖 Official documentation: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

### The 5 golden rules (tattoo them on)

1.  **Always review the diff** before accepting an AI-generated commit message. AI doesn't know your business domain.
    
2.  **Never let an agent run** `git push --force` **without human confirmation.** If your tool allows it, disable it.
    
3.  **Strict CI gate**. AI generating a PR doesn't mean it automatically passes tests — block merge if tests/coverage/security fail.
    
4.  **Label auto-generated PRs** (`copilot`, `devin`, `claude-code`) so the team knows what to review more carefully.
    
5.  **Read-only MCP for code review.** The agent can read your staging DB and observability, but **never with write permissions on prod without a human in the loop**.
    

### What AI does NOT do well (yet)

-   **Architectural decisions in large PRs**: needs serious human review.
    
-   **Detecting subtle concurrency bugs / race conditions**: high false positives.
    
-   **Resolving conflicts in files with dense business logic**: it confuses similar patterns with different intentions.
    
-   **Deep security reviews**: it detects known patterns but not zero-days or complex auth logic.
    
-   **Writing the "why" of the PR**: AI describes the what (it reads diff and commits) but doesn't know your business motivation. You write that.
    

## The actionable takeaways from this lesson

1.  **Master the classic PR flow before delegating it to AI.** If you don't understand what `git push -u origin` does, AI won't save you when something breaks.
    
2.  **The "what" of the PR can be generated by AI. The "why" is always written by you.** It's the difference between a mechanical PR and a reviewable one.
    
3.  **Set up the AI shortcuts in your IDE before S1.** Generating commit messages, resolving conflicts, and describing PRs are actions you'll do 5–10 times a day.
    
4.  **Learn to read Copilot review comments critically.** 71% are actionable, but 29% are noise — and you need the trained eye to tell them apart.
    
5.  **The agent can open the PR, but you sign the merge.** That's the senior line.
    

## Resources

-   📖 [GitHub Docs — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) — official reference on PRs.
    
-   📖 [Conventional Commits — Specification](https://www.conventionalcommits.org/es/v1.0.0/) — the convention we use in the master (Spanish version).
    
-   📖 [GitHub Blog — 60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) — official metrics.
    
-   📖 [Claude Code GitHub Actions — Official documentation](https://code.claude.com/docs/en/github-actions) — the official integration.
    
-   📖 [anthropics/claude-code-action on GitHub](https://github.com/anthropics/claude-code-action) — the official repo.
    
-   📺 [MoureDev — Git and GitHub Course](https://mouredev.com/cursogit) — 5h, in Spanish. If you need to refresh fundamentals before starting.
