# ✍️Pre-session exercise: Backlog inventory🔴 | AI-Driven Delivery

**Due date: JUNE 29, end of day**

---

## Objective

Arrive at the session with an initial FlowSync backlog already generated: turn the project's PRD into a set of user stories with acceptance criteria, using AI as a tool, but **designing the prompt yourself** and **critically reviewing the output**.

---

## Prerequisites

1.  Having gone through the S4 async material, especially page 2 (anatomy of an AI-ready backlog) and the "AI as poke-holes" pattern.
    
2.  Having access to an **AI copilot** of your choice (Claude Code recommended, it's what we'll use in the demo; Cursor, [Claude.ai](http://claude.ai/) web, ChatGPT, or Gemini also work — the exercise is model-agnostic).
    

---

## The exercise

### Part 1 - Design your decomposition prompt (15-20 min)

Write a prompt asking an AI to extract user stories from the FlowSync PRD. The prompt must meet, **at minimum**, these five requirements:

1.  **Context**: give the AI the information it needs to understand what FlowSync is, who it's for, and what the scope of the MVP is.
    
2.  **Exact format**: the stories must come in the format `As a [role], I want [action], so that [benefit]`.
    
3.  **Bounded scope**: only MVP functionality (the corresponding section of the PRD); no inventing features that aren't in the document.
    
4.  **AC in Given/When/Then**: each story with 3-5 verifiable acceptance criteria, not generic ones.
    
5.  **Grouping**: the stories grouped by module, use case, or epic, whichever makes the most sense for FlowSync.
    

I recommend that your prompt include:

-   ✅ A "role" section for the AI (you are a senior Product Owner with experience in SaaS applications).
    
-   ✅ Explicit constraints (non-goals: don't invent features, don't estimate time, don't propose architecture).
    
-   ✅ An example of the expected output format (1-2 stories already written by hand will do).
    
-   ✅ An instruction like "mark with `(assumed)` anything you infer that isn't literally in the PRD".
    

> 💡 **Hint (not mandatory)**: the **structure → constraints → example → transparency instruction** pattern usually produces noticeably better results than loose narrative prompts. You saw it applied on page 2 of the async material.

### Part 2 - Run the prompt (5-10 min)

Run the prompt against the PRD using the copilot of your choice. Save the **raw output**, exactly as the AI returns it. Don't polish anything yet — the unpolished output is part of what we'll analyze.

### Part 3 - Apply the "AI as poke-holes" pattern (10-15 min)

This is the most valuable part, and the one almost nobody does when working with AI for the first time.

Take **one of the stories the AI generated** (the one that looks like it has the most complete AC at first glance) and explicitly ask the AI to critique it:

```
Here is this user story with its acceptance criteria:
[paste the story here]

Your task: identify edge cases, implicit assumptions,
missing scenarios, and dependencies or risks not
mentioned. Do not rewrite the story, just list what
is missing or what you assumed.
```

Write down **3-5 genuine findings** (discard the noise). These are the ones we'll discuss in the live session.

### Part 4 - Brief reflection (5 min)

Wrap up with 4-6 lines of honest reflection:

-   What surprised you about the AI's output?
    
-   What failed or what did you have to correct?
    
-   Did the poke-holes pattern find something you hadn't seen yourself?
    

Honest, specific answers are worth more than elaborate, generic ones.

## [GITHUB  
REPOSITORY](https://github.com/LIDR-academy/ai4devs-s04-planificacion-ia-2026-06-Seniors)

---

## What to deliver

Upload to your `alumno/<nombre-apellido>` branch of the program repo a folder `entregables/sesion-04/` with:

```diagram
entregables/sesion-04/
├── prompt.md         # Your complete prompt
├── output.md         # The raw AI output (untouched)
├── poke-holes.md     # The 3-5 findings from Part 3
└── reflexion.md      # The 4-6 lines from Part 4
```

> 📌 **Perfection is not required.** What matters is the process, not the polish. The live session builds on what you learned by doing it, including what failed.

---

## Completion criteria ✅

You know you're done when:

-   You have a `prompt.md` that covers the 5 requirements from Part 1.
    
-   You have `output.md` with at least 8-12 generated user stories, grouped, with AC in Given/When/Then.
    
-   You have `poke-holes.md` with 3-5 non-trivial findings (gaps, assumptions, real edge cases).
    
-   You have `reflexion.md` with your honest reflection.
    
-   You have committed and pushed to your `alumno/<tu-nombre>` branch with the `entregables/sesion-04/` directory.
    

---

## Steps to deliver via Pull Request

1.  **Fork** the repository using the button at the top right (or work on your `alumno/<nombre-apellido>` branch if the cohort uses the shared repo).
    
2.  Clone your fork to your computer.
    
3.  Complete the exercise inside `entregables/sesion-04/`:
    
    -   Add `prompt.md`, `output.md`, `poke-holes.md`, and `reflexion.md`.
        
4.  Create a branch for your solution:
    

```
git checkout -b alumno/nombre-apellido
```

1.  Commit your changes:
    

```
git add entregables/sesion-04/
git commit -m "S4: backlog inicial FlowSync + poke-holes"
```

1.  Push your branch:
    

```
git push origin alumno/nombre-apellido
```

1.  Create the Pull Request to the original repository. That will be your final submission.
    

If your output lives in an external tool, make sure your TA (Teaching Assistant) has read access to the link you send.

---

```
# PRD — FlowSync MVP

> **Product**: FlowSync
> **Document version**: 1.0 · Q3 2026
> **Status**: approved for MVP
> **Product owner**: FlowSync team
> **Audience of this document**: engineering team (backend, frontend), QA, and any AI agent that will decompose this PRD into a backlog.

---

## 1. Executive summary

FlowSync is a personal task management web application that **keeps the user's tasks synchronized with their Google Calendar**. The problem it solves: people manage their to-dos in one tool (task lists) and their time in another (calendar), and keeping both aligned by hand is tedious and error-prone. FlowSync removes that manual work: tasks with a date appear as events in the calendar, and changes flow in both directions.

The MVP aims to validate a central hypothesis: **will people overloaded with tools adopt a task manager if it eliminates the double task/calendar management?**

### What the MVP includes
- User registration and authentication.
- Full task CRUD with statuses.
- Basic task filtering and organization.
- Task export.
- Google Calendar synchronization (read and write).

### What the MVP does NOT include (explicit out of scope)
- Teams or shared tasks (FlowSync MVP is strictly individual).
- Synchronization with calendars other than Google (Outlook, iCal: post-MVP).
- Push or email notifications.
- Native mobile app (responsive web only).
- Labels, projects, or task hierarchies (subtasks): post-MVP.
- Configurable reminders beyond those of Google Calendar itself.

---

## 2. Target user

**Primary profile**: knowledge worker between 25 and 45 years old, who already uses Google Calendar daily for work and currently manages their to-dos in a separate tool (Todoist, Notion, a notebook, or post-its). They have between 5 and 30 active tasks at any given time. They value simplicity and get frustrated with tools that require manual maintenance.

**Job to be done**: *"When I have a task with a deadline, I want it to appear in my calendar without having to copy it by hand, so I don't have to look at two different places to know what I have to do today."*

---

## 3. Functional requirements

### 3.1 — Authentication and account management

FlowSync requires each user to have their own account. One user's data is never visible to another.

- A visitor can **create an account** with email and password. The password must be at least 8 characters long.
- If the email is already registered, the system indicates it and offers to go to the login.
- A registered user can **log in** with their email and password.
- An authenticated user can **log out**.
- After a successful registration, the user lands on a welcome screen (minimal onboarding) that explains in one sentence what FlowSync does and invites them to create their first task.
- The session is maintained via access tokens. Neither "password recovery" nor email verification by link is required in the MVP.

### 3.2 — Task management (CRUD)

The core of FlowSync. A task has, at minimum: title, optional description, status, and optional due date.

- A user can **create a task** by providing at least a title. The description and due date are optional.
- A user can **view the list** of their tasks.
- A user can **edit** any field of an existing task.
- A user can **delete** a task.
- Each task has a **status**: `pending`, `completed`, or `archived`. A newly created task starts as `pending`.
- A user can **change the status** of a task (for example, mark it as completed).

### 3.3 — Organization and filtering

With several tasks, the user needs to find and group them.

- A user can **filter their tasks by status** (view only pending, only completed, etc.).
- The task list is shown, by default, sorted so that the tasks most relevant to "today" are visible first. *(The exact sorting criterion is left to the team's decision during refinement.)*
- When a user has no tasks (new account or all archived), they see an empty state with an invitation to create the first one.

### 3.4 — Export

Users want to be able to take their data with them.

- A user can **export their tasks to a CSV file** that includes, at minimum, the title, description, status, and due date of each task.

### 3.5 — Google Calendar synchronization

FlowSync's differentiating feature. It is also the most complex and riskiest part of the MVP.

- A user can **connect their Google account** to FlowSync (OAuth authorization with Google).
- Once connected, **tasks with a due date appear as events** in the user's Google Calendar.
- If the user **changes a task's date** in FlowSync, the corresponding event in Google Calendar is updated.
- If the user **completes or deletes a task** in FlowSync, the corresponding event in Google Calendar is removed or marked as appropriate.
- The user can **disconnect** their Google account at any time; when they do, FlowSync stops synchronizing but does not delete the tasks already created.
- Synchronization must reasonably handle cases where the Google API is unavailable or returns errors (the task is saved in FlowSync even if synchronization fails, and it is retried later).

> **Product note**: the MVP's synchronization direction is primarily **FlowSync → Google Calendar** (tasks create/update events). Full reverse synchronization (editing an event in Google and having it reflected as a change in the task) is desirable, but its exact scope must be validated with a technical spike before committing to it, given the cost of managing conflicts and the polling/webhooks of the Google API.

---

## 4. Non-functional requirements

- **Privacy**: a user's data (tasks, Google tokens) is never accessible to other users. Google tokens are stored securely.
- **Performance**: the task list must load in under 1 second for a user with up to 200 tasks.
- **Responsive**: the interface works in desktop and mobile browsers (no native app, but the web is usable on mobile).
- **Clear errors**: any validation error (invalid email, short password, required fields) is shown to the user in an understandable way, not as a technical error.
- **Observability**: Google synchronization operations are logged so failures can be diagnosed.

---

## 5. Tech stack (context for the team)

> This section is informative. The PRD does not prescribe architecture; the "how" is defined in the specs (OpenSpec) during development. But the team works on a fixed stack:

- **Backend**: AdonisJS 7 + TypeScript + Lucid ORM + SQLite (via `better-sqlite3`) + VineJS for validation + `@adonisjs/auth` (access tokens).
- **Frontend**: React 19 + TypeScript + Vite + React Router + Tailwind v4 + shadcn/ui.
- **External integration**: Google Calendar API (OAuth 2.0).

---

## 6. MVP success criteria

The MVP is considered successful if, after 4 weeks with real users:

- A user can complete the entire flow — register, create tasks, connect Google Calendar, and see their tasks reflected as events — without external help.
- At least 40% of users who register connect their Google Calendar (a signal that the differentiating value proposition is understood and desired).
- Synchronization works reliably: fewer than 5% of synchronization operations fail unrecoverably.

---

## 7. Known risks

- **Google Calendar synchronization is the biggest technical risk of the MVP.** The API has rate limits, complex time zone handling, and edge cases (recurring events, all-day events) that can inflate the scope. A technical spike is recommended before committing to its decomposition into tasks.
- **OAuth with Google** requires project configuration in Google Cloud Console and a permissions review; the initial setup may take longer than expected.
- **Time zones**: the relationship between a task's due date and the time of a calendar event must be defined carefully to avoid creating events at wrong times.

---

## 8. Glossary

- **Task**: the user's unit of work. It has a title, optional description, status, and optional due date.
- **Status**: the situation of a task — `pending`, `completed`, or `archived`.
- **Event**: an entry in Google Calendar generated from a task with a due date.
- **Synchronization**: the process by which FlowSync tasks are reflected as events in Google Calendar.
- **Google connection**: the OAuth authorization that allows FlowSync to read and write to the user's calendar.
```
