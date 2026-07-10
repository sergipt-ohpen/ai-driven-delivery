# ✍️ Pre-session exercise: Install SDD in a clean project 🔴 | AI-Driven Delivery

---

**Repository:** [**Github**](https://github.com/LIDR-academy/ai4devs-openspec-sandbox-2026-06)

## Goal

Consolidate the **3 Pillars (Tool, Context, Prompt)** by applying them deliberately, and arrive at the session with **OpenSpec already installed and working** in a sandbox project.

---

## Prerequisites

-   **Node.js v20.19.0 or higher** installed on your machine (an OpenSpec requirement)
    
-   Access to an AI copilot of your choice (ChatGPT, Claude, Copilot, Cursor…)
    

Check your Node version before you start:

bash

`node --version`

If your version is lower than 20.19.0, update it before continuing (with `nvm`, the official installer, or whichever manager you prefer).

---

## Part A — Review of the 3 Pillars

### Deliberate application of the 3 Pillars to a micro-task

Pick any **micro-task**. Some ideas (you can propose your own):

-   Email validator
    
-   Simple CSV parser
    
-   Date formatting function (ISO → "X minutes ago")
    
-   Slug generator from a title
    
-   Function that detects whether a string is a palindrome
    

Solve it with your preferred copilot, applying the 3 Pillars **explicitly**. Before launching the prompt, write down your decisions:

### Log template

markdown

```
*Micro-task:* [one-line description]
*Pillar 1 — Tool:* Which one do you choose?
 Why this one and not another?
*Pillar 2 — Context:* What information are you providing? (language, framework, constraints, examples…)
 Is there anything in the context you deliberately decided to leave out?
*Pillar 3 — Prompt:* How do you structure it? (style, output format, examples…)
 Paste here the final prompt you are going to launch.
*Result:* Did it work on the first try or did you have to iterate?
 One improvement you would make if you did it again.
```

---

## Part B — Installing OpenSpec in a sandbox

### Step 1 — Create a sandbox project

Create a new folder **outside of any existing project**. This project is **disposable**: it only exists so you can tinker with OpenSpec, not to build anything you will actually use.

bash

```
mkdir openspec-sandbox
cd openspec-sandbox
```

---

### Step 2 — Install the OpenSpec CLI

OpenSpec is distributed as a global npm package:

bash

```
npm install -g @fission-ai/openspec@latest
```

Verify that the installation worked:

bash

```
openspec --version
```

If the command responds with a version number, you're on track. If you get an error, check that Node is properly installed and that your PATH includes npm's global binaries directory.

---

### Step 3 — Initialize OpenSpec in the sandbox

From inside the `openspec-sandbox` directory, run:

bash

```
openspec init
```

This launches a setup wizard. During initialization:

1.  **Select the AI assistant** you use the most (Claude Code, Cursor, Copilot, OpenCode…). Choose the one you are most likely to use — this only affects where the skills and commands are installed (`.claude/skills/`, `.opencode/skills/`, etc.).
    
2.  **Accept the default values** for the remaining prompts. You don't need to customize anything for this exercise.
    

When it finishes, verify that the expected structure was created:

bash

`ls -la`

You should see at least:

-   📁 `openspec/` — main directory containing the configuration and specs
    
-   📁 `.claude/skills/` (or the equivalent, depending on the assistant you chose)
    
-   📄 Possibly `openspec/**config.yaml**` — the project's "constitution"
    

By now you should have achieved the following:

-   OpenSpec is correctly installed
    
-   The OpenSpec folder structure appears in your sandbox
    
-   The `openspec --version` command responds without errors
    

---

### Step 4 — Guided exploration

Now poke around what OpenSpec generated. **Don't write specs yet** — just explore.

**4.1. Read the file** `openspec/config.yaml # ← contexto + reglas del proyecto (reemplaza a project.md)`  
Take a look at what OpenSpec generated as a template. This file is the project's "constitution" in OpenSpec's philosophy: it defines the non-negotiable principles and constraints that every future spec must respect.

**4.2. Look at the internal structure** Explore the `openspec/` tree:

bash

`ls -R openspec/`

Identify the main folders/files:

-   where would proposals be stored?
    
-   where the specs?
    
-   where the archived items?
    

**4.3. Read an example of the OPSX workflow** Skim the official documentation on the **propose → apply → archive** flow (or on OPSX if you're on a recent version). You don't have to understand everything — just get familiar with the vocabulary.

---

### Step 5 — Record 3 observations

Wrap up Part B with **3 things that caught your attention** during the exploration. They can be of any kind:

-   Something about the file format
    
-   A convention that surprised you
    
-   A command you don't quite understand
    
-   A design decision of the framework
    
-   An analogy with something you already know
    
-   Any "oh, interesting"
    

They don't need to be profound. What matters is that you arrive at the session with material of your own.

---

## **Exercise submission**

To submit this exercise, you must open a **pull request** to the corresponding repository.

Your submission must consist of **a single document** inside the repo. It can be in **Markdown** format, notes, or whichever format you prefer, as long as it is clear and easy to review.

The document must include:

**Evidence that OpenSpec is installed and operational in the sandbox**

Include a screenshot or evidence showing:

-   `openspec --version` working correctly.
    
-   `ls` showing the project structure.
    

**Completed Part A template**

Fill in the template applying the **3 Pillars** to your application.

**3 observations from the OpenSpec exploration**

Add three learnings, findings, or comments derived from having explored OpenSpec.

---

## **Steps to submit via Pull Request**

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

1.  In your fork's GitHub interface, a prompt will appear to create the **Pull Request**.
    
2.  Create the Pull Request against the original repository.
    

That will be your final submission.

---

## Recommended resources

-   **Official OpenSpec documentation:** [https://openspec.pro](https://openspec.pro/)
    
-   **OpenSpec repository on GitHub:** look it up as `fission-ai/openspec`
    
-   **Guide in Spanish:** *Spec Driven Development con OpenSpec* on [webreactiva.com](http://webreactiva.com/) — a good introduction to the OPSX workflow if you want additional context
    
-   **Getting started video** (optional): "Getting Started with OpenSpec | Spec Driven Development | Setup Tutorial" on YouTube
    

---

**Due date: 17 JUN 26**
