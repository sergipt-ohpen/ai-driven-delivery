# ✍️Pre-session exercise: Context audit and skill creation🔴 | AI4Devs 2026/06 Seniors

**Due date: June 22 by end of day**

---

## Objective

Arrive at the session with two things done:

1.  **Knowing whether a copilot understands your project** — and having identified what it's missing.
    
2.  **A skill created in Claude Code your own way**, without any formal specification guide.
    

---

## Prerequisites

-   Have **Claude Code** installed and authenticated on your machine.
    
-   Have **Cursor** installed and signed in.
    
-   Have a **repo to audit in Part A** — ideally **a real project of your own** (from work or personal); if not, the S2 sandbox will do.
    
-   Have the **S2 sandbox** accessible for Part B (that's where you build the skill).
    
-   Have completed the pre-session exercise for S2.
    

> If Claude Code is not installed, follow the official guide at `https://code.claude.com` before starting.

---

## Part A — Does a copilot understand your project? (15-20 min)

The goal of this part is for you to discover, with your own eyes, the difference between what a copilot **can infer by reading your code** and what **you have to tell it explicitly**. That gap is exactly what gets managed with the first primitive you'll see in the live session: project memory.

> 💡 **Do it with a real project of your own** if you can — one from work or personal, with some history behind it. The more mature the repo, the more accumulated conventions it has that the agent can't guess, and the richer the exercise. A freshly created sandbox reveals few gaps; a real repo with months of history reveals many. If you don't have one at hand, use the S2 sandbox.

> ⚠ **Privacy:** the deliverable only contains your **findings** (descriptions like "the agent didn't know we use such-and-such convention"), never proprietary code or secrets. The audit stays on your machine; what you share with the TA are the conclusions, not the repo.

### Step 1 — Minimum readiness

Verify and check off:

-   Claude Code starts in the repo you're going to audit (`claude` inside the folder) and is authenticated.
    
-   Cursor opens the same project without errors.
    
-   The project's code is accessible (the project doesn't need to *run*, the code just needs to be there to be read).
    

### Step 2 — The real test

Open Claude Code in the chosen repo and launch **a single exploration prompt**. Don't ask it to change anything — just to read and summarize:

```
> Explora este repositorio y dime qué entiendes de su arquitectura:
  stack, estructura de carpetas, cómo se arranca, convenciones que
  detectes. No modifiques nada, solo análisis.
```

Watch the response carefully. Pay attention to two things:

-   **What the agent got right** without you telling it anything (what it could infer from the code).
    
-   **What it got wrong, omitted, or assumed incorrectly** (what it could NOT infer).
    

> 💡 If the agent launches an exploration subagent (you'll see something like `[Task] Searching codebase…`), you're watching one of the async primitives in action. Don't do anything special — just observe it.

### Step 3 — The findings

Identify **3 to 5 things the agent could NOT infer** from the code and that you would have to tell it explicitly for it to work well on your project. Think of things like:

-   Non-trivial build, test, or startup commands.
    
-   Internal conventions (naming, structure, where each thing goes).
    
-   Operational restrictions ("never commit X", "don't touch folder Y").
    
-   Non-obvious tooling (internal tools, particular configurations).
    

> ⚠ **Do not write these things into any project file.** Don't create `AGENTS.md` or `CLAUDE.md` yet — we'll work on that in the live session. In this part you only **identify and note down** the findings in your deliverable.

**Completion criterion for Part A:** you know you're done when you have a list of 3-5 concrete points the agent didn't know, written so that another person would understand them without additional context.

---

## Part B — Create a skill in Claude Code, your own way (30-40 min)

> This part is the heart of the exercise. The decision journal you produce here is the material we're going to compare in the live session.

### Step 4 — Get familiar with the skill concept

Read the official skills documentation in Claude Code (links in Resources). Five to ten minutes at most. Take away the essentials:

-   What a skill is.
    
-   Where it physically lives: `.claude/skills/<nombre-skill>/SKILL.md`.
    
-   What basic metadata it requires (YAML frontmatter with `name` and `description`).
    
-   When and how Claude is triggered to use a skill.
    

You don't need to master the subject. Just have the basic vocabulary before building your own.

### Step 5 — Design your skill

Choose a skill useful for your day-to-day work. Some options (you can propose another):

-   Generate commit messages following Conventional Commits.
    
-   Review pull requests according to your own checklist.
    
-   Write tests following your team's pattern.
    
-   Document functions with a specific format (docstring, JSDoc, etc.).
    
-   Create database migrations following your stack's conventions.
    
-   Generate structured logs with a given format.
    

Choose one that would genuinely solve a real problem for you. The closer to your actual work, the better.

### Step 6 — Build the skill the way you believe it should be done

Create the skill at `.claude/skills/<nombre-skill>/SKILL.md` in the sandbox project (don't use the real project from the previous section). Build the skill **following your intuition and experience**, without following any formal specification protocol. Trust your judgment.

Some questions you'll probably have to answer while building it:

-   What do I put in the `description` so Claude activates the skill when it should and not when it shouldn't?
    
-   What level of detail do I give in the body's instructions?
    
-   Do I include examples? How many?
    
-   Do I define clear boundaries for what it must not do?
    
-   Do I need auxiliary files or is the [SKILL.md](http://skill.md/) enough?
    
-   What external tools should the skill be able to use?
    

Don't look for "the right way". Don't over-polish it. We want to see your natural approach so we can contrast it in the live session with what emerges when applying SDD inside Claude Code.

### Step 7 — Keep a decision journal

While building the skill, keep a brief journal in parallel with this structure:

```
*Skill creada:* [nombre y propósito en una línea]

*Decisiones de diseño tomadas:*
  [Decisión 1: qué decidiste y por qué]
  [Decisión 2: ...]
  [Decisión 3: ...]

*Qué me resultó fácil:*
  [Lista corta]

*Qué me resultó ambiguo o difícil de decidir:*
  [Lista corta — sé específico, no genérico]

*Tiempo real invertido:*
  [Tiempo total, separando lectura previa, diseño y escritura si puedes]

*Qué probarías si tuvieras más tiempo:*
  [Una o dos cosas]
```

This journal is as important as the skill itself.

### Step 8 — Test the skill at least once

Before wrapping up, run a conversation with Claude Code in which the skill **should** activate. Observe:

-   Did it activate when you expected?
    
-   Was the result what you wanted?
    
-   If not, what do you think went wrong?
    

Add a final section to the journal with the result of this test. **Do not iterate to "fix it"** — we want to see the result of your first attempt.

---

## Deliverable

Send your TA, **no later than two days before the live session**, a single document (Markdown or equivalent) containing:

1.  **The 3-5 audit findings** (Part A, Step 3): what things the agent could not infer from your project.
    
2.  **The** `SKILL.md` **file** of the skill you created (paste its content or link to it in your sandbox repository).
    
3.  **The complete decision journal** (Step 7), including the result of the test (Step 8).
    

If you can't complete some part, **submit what you have anyway** within the deadline. Having the material on time, even if partial, is more valuable than submitting complete work late.

---

## Steps to submit via Pull Request

[**Repository here**](https://github.com/LIDR-academy/ai4devs-auditoria-contexto-creacion-skill-s3-202606-seniors)

1.  **Fork** the repository using the button at the top right.
    
2.  Clone your fork to your computer. It will be a project with the same name, but under your username.
    
3.  Complete the exercise:
    
    -   Fill in the prompt.
        
    -   Add or modify the corresponding files inside your folder.
        
    -   Upload the single document with the evidence, Part A, and the observations.
        
4.  Create a new branch for your solution, for example:
    

```
git checkout -b solved-stopwatch
```

1.  Commit your changes:
    

```
git add .
git commit -m "Solve stopwatch exercise"
```

1.  Push your branch to the repository:
    

```
git push origin solved-stopwatch
```

1.  In the GitHub interface of your fork, a notice will appear to create the **Pull Request**.
    
2.  Create the Pull Request against the original repository.
    

That will be your final submission.

---

## Recommended resources

**Official documentation:**

-   Skills in Claude Code: `https://code.claude.com/docs/en/skills`
    
-   Custom skills creation guide: `https://support.claude.com/en/articles/12512198-how-to-create-custom-skills`
    
-   Public repository of example skills: `https://github.com/anthropics/skills`
    

**Complementary reading (optional, only if you have time left):**

-   "How to create Skills for Claude: steps and examples" on the official Claude blog.
    
-   "Create Your First Claude Code Skill" on [egghead.io](http://egghead.io/).
    

> You don't need to read everything. With the main official documentation and one of the complementary readings you have enough to build the skill.

> ⚠ **About the example skills repo:** look at it *after* building your skill, not before. In the live session we want to see your natural approach, not one copied from an example. Your raw first attempt is exactly what gives value to the comparison with SDD.
