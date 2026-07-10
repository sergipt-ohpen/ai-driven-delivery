# 📄 Anatomy of OpenSpec 🔴 — 16 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 16 min

> Dense lesson. After this one you'll know how to install OpenSpec, understand its folder structure, write a delta spec, and run the `propose → apply → archive` flow. This is the bulk of what you need operationally.

---

## Installation and prerequisites

OpenSpec installs as a global CLI. It requires **Node.js 20.19.0 or higher**.

```
# Verificá tu Node
node -v   # debe ser >= 20.19.0

# Instalación global con npm
npm install -g @fission-ai/openspec

# Verificación
openspec --version
```

It also works with `pnpm`, `yarn`, `bun`, and Nix. The official docs cover the variants (`https://github.com/Fission-AI/OpenSpec/blob/main/docs/installation.md`).

> ⚠ **Telemetry**. OpenSpec sends anonymous statistics (command names and version, without arguments or paths). It can be disabled with `export OPENSPEC_TELEMETRY=0` or `export DO_NOT_TRACK=1`. In CI it's disabled automatically.

> 📹 **Recommended video** — Before reading further, if you prefer to see the flow in action, watch *"OpenSpec Changes Everything - No More Vibe Coding (Full Tutorial)"* (Nathan Sebhastian, 12:35, English). It walks through `propose → apply → archive` on a small project in under 13 minutes. It's the fastest way to build visual intuition for OpenSpec before reading the full lesson.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 12:35
> 
> 1x
> 
> -   2x
> -   1.5x
> -   1.25x
> -   1x, selected
> -   0.75x
> -   0.5x
> -   0.25x

---

## `openspec init`: what happens on initialization

Inside an existing project:

```
cd my-project
openspec init
```

The wizard asks which tools you use (Claude Code, Cursor, Codex, etc.) and creates:

```diagram
my-project/
├── openspec/
│   ├── project.md           # contexto del proyecto (stack, convenciones)
│   ├── changes/             # propuestas activas
│   └── specs/               # specs vivas (vacías al inicio)
├── .claude/
│   └── skills/              # slash commands para Claude Code
├── .cursor/
│   └── rules/ | skills/     # configuración para Cursor
└── .github/
    └── prompts/             # prompts para GitHub Copilot (IDE only)
```

Only the folders for the tools you selected are created. OpenSpec auto-detects `.claude/`, `.cursor/`, etc., if they already exist.

> 💡 **About** `AGENTS.md` **and** `CLAUDE.md`. In S1 we sold [AGENTS.md](http://agents.md/) as the de facto standard. Since **OpenSpec 1.0** (the stable version release), those files **are no longer generated automatically**. The rules are distributed to `.claude/skills/`, `.cursor/`, `.github/prompts/`, etc., directly. **This does NOT contradict S1**: context is still curated and lives in versioned files. Only *where* it lives changes. If you need a root [AGENTS.md](http://agents.md/) for another purpose, you create it yourself by hand and reference the OpenSpec skills.

---

## Profile `core` vs. `expanded`

OpenSpec offers two workflow profiles:

### Profile `core` (default)

Three commands. The recommended option to start with.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/96f13472-f8aa-422b-94d1-b590febe496a/bbbc7f17c8803301.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Profile `expanded`

For more controlled flows with more intermediate artifacts. Activated with `openspec config profile`.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/132ef282-abf7-437d-a445-7c3b85a95e19/a962f467aec5496d.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Master recommendation**: start with `core`. Switch to `expanded` only when you need the extra control (typically in projects with several devs working on the same repo).

---

## The structure of a `change`

When you run `/opsx:propose add-refresh-tokens`, OpenSpec generates:

```diagram
openspec/changes/add-refresh-tokens/
├── proposal.md      # por qué y qué
├── specs/           # delta specs (qué cambia en las capabilities)
│   └── auth/
│       └── spec.md  # delta spec del sistema de auth
├── design.md        # cómo (decisiones técnicas)
└── tasks.md         # checklist de implementación
```

Each file has a specific function:

### `proposal.md`

The narrative context. Why this change is being made, what problem it solves, what's included and what's left out. Both the AI and the human reviewer read it. Typical structure:

```
## Why
## What Changes
## Capabilities
### New Capabilities
### Modified Capabilities
## Impact
```

### `specs/<capability>/spec.md`

The **delta spec**: the heart of OpenSpec. It describes the system's expected behavior using `ADDED`, `MODIFIED`, `REMOVED` sections and BDD format.

```
# Delta for Auth
## ADDED Requirements
### Requirement: Refresh token rotation
#### Scenario: Successful refresh
#### Scenario: Reuse of invalidated refresh token
## MODIFIED Requirements
### Requirement: Access token lifetime
#### Scenario: Expired access token
```

> 💡 **Why BDD here**. The `Scenario:` entries with GIVEN/WHEN/THEN are intentionally BDD syntax. The AI can translate each scenario directly into an integration test. If your test runner speaks Cucumber/Gherkin, even better. If not, the scenarios remain readable for human reviewers.

### `design.md`

The technical decisions. This is where the "how" goes: which patterns to use, which libraries, which implicit refactors need to happen. It's the place where you prevent the AI from improvising architecture.

```
## Context
## Goals / Non-Goals
## Decisions
## Risks / Trade-offs
## Migration Plan
## Open Questions
```

### `tasks.md`

The actionable checklist. Each task is small enough to be executed in a single AI turn.

```
# Tasks

## Backend

- [ ] 1.1 Create migration for auth_refresh_tokens table
- [ ] 1.2 Add RefreshToken model with hash methods
- [ ] 1.3 Modify access token TTL to 15min in config
- [ ] 1.4 Add POST /auth/refresh controller
- [ ] 1.5 Add token rotation logic with reuse detection
- [ ] 2.1 Tests for happy path
- [ ] 2.2 Tests for reuse detection
- [ ] 2.3 Tests for expired refresh token

## Frontend

- [ ] 3.1 Configure axios interceptor for 401 handling
- [ ] 3.2 Add refresh logic with mutex (avoid duplicate refreshes)
- [ ] 3.3 Update AuthContext to handle token rotation
```

---

## The `propose → apply → archive` workflow

### Step 1: `/opsx:propose`

```
You: /opsx:propose add-refresh-tokens

AI:  Created openspec/changes/add-refresh-tokens/
     ✓ proposal.md
     ✓ specs/auth/spec.md
     ✓ design.md
     ✓ tasks.md

     Ready for implementation. Run /opsx:apply.
```

**Human review checkpoint**. Before moving forward, you open the 4 files and review them. If the AI invented scope you didn't want, you trim it. If scenarios are missing, you add them. This review is where SDD saves hours of future bugs.

### Step 2: `/opsx:apply`

```
You: /opsx:apply

AI:  Implementing tasks for add-refresh-tokens...
     ✓ 1.1 Migration created
     ✓ 1.2 RefreshToken model added
     ✓ 1.3 Config updated
     ✓ 1.4 Controller created
     ✓ 1.5 Rotation logic with reuse detection
     ✓ 2.1 Tests for happy path (5/5 passing)
     ✓ 2.2 Tests for reuse detection (3/3 passing)
     ✓ 2.3 Tests for expired refresh token (2/2 passing)
     ✓ 3.1-3.3 Frontend tasks complete

     All tasks complete. Run /opsx:archive when ready.
```

The AI executes the tasks in order, writing code and tests. If a test fails, it tries to fix it (under your supervision). If a task isn't clear, it asks you before improvising.

### Step 3: `/opsx:archive`

```
You: /opsx:archive

AI:  Archiving add-refresh-tokens...
     ✓ Merged specs into openspec/specs/auth/spec.md
     ✓ Moved to openspec/changes/archive/2026-04-28-add-refresh-tokens/

     Done! Ready for the next feature.
```

The delta specs (`ADDED`, `MODIFIED`, `REMOVED`) are applied to the living spec in `openspec/specs/auth/spec.md`. The complete `change` is moved to `archive/`. The history remains in Git.

> 💡 **Important**: archiving **is not optional**. If you leave active changes unarchived, the next proposals won't have the correct context about what's already implemented and what isn't. Archive as soon as the change is merged to main.

---

## Complementary CLI commands

In addition to the slash commands, OpenSpec exposes a CLI:

```
openspec list                    # Lista changes activos
openspec show add-refresh-tokens # Detalles de un change
openspec validate <change>       # Valida formato del spec
openspec view                    # Dashboard interactivo TUI
```

Useful when you're working in the terminal without opening Claude Code, or for CI.

---

## Operational recommendations (from the official docs)

### Recommended models

OpenSpec works best with high-reasoning models. The official docs recommend:

-   **Claude Opus 4.5** or higher (Opus 4.6 / 4.7 available as of April 2026)
    
-   **GPT-5.2** or higher
    

Smaller models (Haiku, GPT-5 Mini) work for simple tasks but lose quality on complex specs.

### Context hygiene

Direct connection to S1 (50/70/90 rule):

> *"OpenSpec benefits from a clean context window. Clear your context before starting implementation and maintain good context hygiene throughout your session."*

Recommended practice:

1.  **Before** `/opsx:propose`: empty context.
    
2.  **Before** `/opsx:apply`: if context is at 50%+, run `/clear` first. The AI will re-read the proposal from disk; it doesn't need the previous conversation.
    
3.  **Before** `/opsx:archive`: same.
    

---

## Known limitations

-   **Anthropic does NOT natively support** the [AGENTS.md](http://agents.md/) pattern (Anthropic issue #6235, topic covered in S1). OpenSpec uses `.claude/skills/` directly as a workaround.
    
-   **GitHub Copilot CLI** doesn't support custom prompt files. It only works with Copilot inside an IDE (VS Code, JetBrains).
    
-   **Concurrent changes**: if two devs run `/opsx:propose` at the same time on the same capability, the delta specs can clash when archiving. Coordinate as a team the same way you coordinate merges.
    
-   **Telemetry on by default**: already covered above.
    
-   **Legacy migration** `/openspec:*` **→** `/opsx:*`: in projects created before OpenSpec 1.0, the slash commands had the `/openspec:` prefix. If you upgrade an old project, you have to run `openspec init` again and the commands change. The file structure is compatible.
