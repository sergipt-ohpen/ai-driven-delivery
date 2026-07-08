# 📄 The SDD ecosystem in 2026 🔴 — 15 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 15 min

> SDD is not OpenSpec. SDD is the methodology; OpenSpec is one of the tools that implement it. Knowing what else is out there allows you to make informed decisions in your work.

---

## Map of the territory

As of April 2026 there are five relevant SDD tools / frameworks with real traction (beyond academic prototypes), each with a distinct philosophy:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/01ca5d5e-7001-438c-8295-488e1acfd594/5015321902e03623.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Alongside these there are **convention frameworks** that sit on top of an SDD tool. LIDR itself maintains two:

-   `LIDR-academy/ai-specs` — LIDR conventions designed to be used with OpenSpec.
    
-   `LIDR-academy/manual-SDD` — a skills-first variant without OpenSpec, for teams that don't want the dependency.
    

> 💡 **Convention vs. tool**: OpenSpec gives you the flow (`/opsx:propose → /opsx:apply → /opsx:archive`) and the folder structure. The LIDR conventions add coding standards, PR templates, and specialized agents (`backend`, `frontend`, `analyst`). They are complementary layers, not competitors.

---

## How to choose an SDD framework: 4 criteria (LIDR's mental frame)

Before looking at specific tools, LIDR proposes 4 criteria for evaluating any SDD framework:

1.  **Ease of getting started** — does the framework create the initial context for you or do you have to write it by hand?
    
2.  **Good context-management practices** — is the file structure it proposes coherent and scalable?
    
3.  **Change management** — does it support feature evolution and checklist updates, or only the initial flow?
    
4.  **IDE integration** — does it connect natively with Claude Code, Cursor, Windsurf, etc., or does it require glue code?
    

Applied to the 5 options in the table:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/91b55240-1870-4f97-aaf7-df1fe0b16346/609df2e1ef421dd3.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⭐ Verbatim quote from LIDR about OpenSpec: *"OpenSpec: good for both new and existing projects.* ***Our recommendation for getting started.****"*

---

## OpenSpec (Fission AI)

**Official tagline**: *"AI coding assistants are powerful but unpredictable when requirements live only in chat history. OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written."*

Key features:

-   **Node.js CLI** — `npm i -g @fission-ai/openspec`. Requires Node 20.19+.
    
-   **Brownfield-first**. It's designed for existing projects, not for starting from scratch.
    
-   **21+ supported tools**: Claude Code, Cursor, Windsurf, Continue, Gemini CLI, GitHub Copilot, Amazon Q Developer, Cline, RooCode, Kilo Code, Auggie, CodeBuddy, Qoder, Qwen Code, CoStrict, Crush, Factory, OpenCode, Antigravity, iFlow, Codex.
    
-   **Lightweight workflow**: three basic commands (`propose`, `apply`, `archive`). There is an expanded profile (`new`, `continue`, `ff`, `verify`, `onboard`, `bulk-archive`) for more controlled flows.
    
-   **Signature concept**: **delta specs**. Each change is expressed as a diff over the living specs (`## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`). When you archive, the delta is merged into the main specs. We'll see this in detail on page 3.
    

---

## GitHub spec-kit

**Official tagline**: *"*💫 *Toolkit to help you get started with Spec-Driven Development."*

Key features:

-   **Python CLI** — `uvx --from specify-cli specify init`. Requires `uv` installed.
    
-   **Greenfield-friendly**, although it supports brownfield with `-no-git`.
    
-   **20+ supported AI agents** (Claude Code, Copilot, Cursor, Gemini CLI, Codex, etc.).
    
-   **Strict linear workflow** with four phases: `/speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement`. The phases are *gated*: you don't move forward until the current one is validated.
    
-   **Signature concept**: the `constitution.md` file — the project's non-negotiable principles (mandatory testing, allowed stack, team conventions). It is evaluated at every phase.
    

**Philosophical differences with OpenSpec**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a50d96bb-a715-41c6-a9e9-02e1e2e82f36/4eb6a48855ede625.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **When to use which**: spec-kit if you're starting a project from scratch with strong compliance/regulatory requirements. OpenSpec if you work on existing code and want to iterate fast. In the master's program: OpenSpec.

> 📹 **Recommended video** — If you want to dive deeper into spec-kit before settling on OpenSpec, *"The ONLY guide you'll need for GitHub Spec Kit"* (Den Delimarsky, September 2025, English) is the tutorial by the creator himself. It has timestamps per phase: Constitution 11:10, Specification 15:25, Plan 24:00, Tasks 31:06, Implementation 34:28.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 40:01
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

## BMAD-METHOD

**What it is**: Behaviour Modeling for AI Driven development. A complete agent system with specialized roles (Analyst, Architect, Scrum Master, Developer, QA) that collaborate on a central spec. Designed for projects where the virtual AI team replicates the roles of a human team.

Key features:

-   **Agents with defined personas**: each one has a role, competencies, and a specific output format.
    
-   **Multi-phase workflows**: discovery, planning, building, testing.
    
-   **Multi-stack support**: not tied to a specific language.
    

**Position in the master's program** (LIDR quote from the SDD workshop): *"BMAD: too complex to start with, but undoubtedly very powerful"*. It's excellent once you've internalized SDD and want a more ambitious system. For getting started, OpenSpec wins.

> ⚠ If you're going to explore BMAD, give it time. The learning curve is significant because it requires you to think in terms of team roles, not just tasks. It pays off when you work in a team and want different people to perform different roles.

---

## AWS Kiro

**What it is**: AWS's own IDE (based on VS Code) with SDD built in. Announced in 2025, it positions itself as "the official IDE for Spec-Driven Development".

**Limitations that rule it out for the master's program**:

-   **Locked in to the IDE**. You can't use Cursor, Claude Code, or whichever editor you prefer.
    
-   **Tied to Claude models via Bedrock**. No option for direct GPT-5.2 or Gemini 3.
    
-   **AWS commercial product**. License cost and dependency on an AWS account.
    

OpenSpec's own documentation describes it in its comparison: *"Powerful but you're locked into their IDE and limited to Claude models. OpenSpec works with the tools you already use"*.

> ⚠ Mentioning Kiro on your CV or in team conversations is fine, but few Spanish-speaking companies are adopting it. The entry barrier (its own IDE + AWS) is high.

---

## Tessl Specs

**What it is**: a commercial SaaS platform with SDD as its core value proposition. Specifically designed for enterprise teams that want specs as a product, with dashboards, metrics, and centralized governance.

**Why it's not in the master's program**:

-   **Commercial**. Pricing aimed at companies, not individual developers.
    
-   **Closed-source**. You can't inspect how it works internally.
    
-   **Still early**. Less traction in the community (vs. OpenSpec or spec-kit).
    

It's a legitimate tool — worth knowing it exists — but it's not the right option for learning SDD from scratch.

---

## The LIDR stack: ai-specs and manual-SDD

LIDR maintains two public repos related to SDD. It's worth understanding the difference:

### `LIDR-academy/ai-specs`

-   **Philosophy**: conventions on top of OpenSpec.
    
-   **Structure**: `ai-specs/specs/`, `ai-specs/.commands/`, `ai-specs/.agents/`, `ai-specs/changes/`.
    
-   **Its own commands**: `/enrich-us` (enriches user stories), `/plan-backend-ticket`, `/plan-frontend-ticket`, `/develop-backend`, `/develop-frontend`.
    
-   **Multi-copilot**: `AGENTS.md`, `CLAUDE.md`, `codex.md`, `GEMINI.md` point to the same `base-standards.mdc` via symlink.
    
-   **The repo's official recommendation**: *"highly recommended to be used along with Spec-Driven Development frameworks like OpenSpec"*.
    

### `LIDR-academy/manual-SDD`

-   **Philosophy**: skills-first, without OpenSpec.
    
-   **Creator**: Javier Vargas (Head of AI @ Mapal), speaker at the SDD Workshop together with Álvaro Moya.
    
-   **Structure**: `ai-specs/skills/` with `SKILL.md` files invocable as Claude Code skills. Examples: `enrich-user-story/SKILL.md`, `write-pr-report/SKILL.md`.
    
-   **When to use it**: when your team doesn't want the OpenSpec dependency or already has its own spec manager.
    

> 💡 **The master's program uses OpenSpec with the** `ai-specs` **conventions as a starting point**, but the concrete specs and templates are generated on the course project. You won't literally copy `ai-specs` into the starter kit; you'll learn the principles and apply them.

---

## The brownfield-first philosophy (important)

One of OpenSpec's strongest decisions — and the reason it fits the master's program — is prioritizing **brownfield** (existing systems that evolve) over **greenfield** (new projects).

Why does it matter?

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a0c3db33-eec0-43a8-9ef1-68d710579252/f6c8296a9dec26e7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Most professional work is brownfield. Companies with startups that grow, products that iterate, continuous refactors. Greenfield is the exception, not the rule. The code you're going to write in your career is mostly code that modifies existing code, not new code. Useful SDD has to assume that.

---

## The delta spec concept (preview)

This is OpenSpec's most important pedagogical innovation, and you'll see it in detail on the next page. The idea in one line:

> A `change` does not contain the full spec of the system. It contains **the diff** that applies over the living spec.

Conceptual example:

```
## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST require a second factor during login.

#### Scenario: OTP required
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
```

When that change is archived, the `Requirement: Two-Factor Authentication` moves to `openspec/specs/auth/spec.md` and becomes a living spec. Future changes see 2FA as an existing capability of the system and can modify it, not reinvent it.

It's the equivalent of a commit in Git, but for requirements instead of code. It's what allows OpenSpec to keep specs useful without them turning into mile-long documents that are impossible to review.
