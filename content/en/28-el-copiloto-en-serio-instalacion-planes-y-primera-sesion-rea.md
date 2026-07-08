# 📄The copilot for real: installation, plans, and first real session 🔴 — 14 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 14 min

## Where we are in the master's program

The two previous sessions established the two things that make a copilot perform:

-   **S1 — Mental model**: output depends more on **Tool + Context + Prompt** than on the underlying model. The choice of mode (completion / chat / agentic) is an architectural decision.
    
-   **S2 — Method**: the SDD flow with OpenSpec turns a vague prompt into a verifiable contract.
    

S3 closes that arc by getting down to the **real harness**: how the copilot is set up, configured, and operated day to day. From here on we're no longer talking about "an AI that helps you code"; we're talking about the technical environment that orchestrates that AI.

> 💡 **Anti-overlap**: nothing that follows re-explains the 3 pillars, what OpenSpec is, or what MCP is. If any of that isn't solid, go back to the pre-course or to S1/S2 before continuing.

---

## Why two tools in the master's program

The program uses **Claude Code** and **Cursor**. Not because they're "the best", but because they occupy the two ends of the practical spectrum:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/47e6e3eb-ee6d-48c9-992d-afb0ecbf7975/a03cc85809ad0cfd.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

The goal is not to pick one. It's to **master the primitives they share** — that knowledge transfers to any copilot that appears in the next 18 months.

> ⚠ All the content in this session is **agnostic**. When I show concrete commands they'll be Claude Code commands (the program's primary tool), but every concept translates to its Cursor equivalent in lesson 2.

---

## Installation

### Claude Code

Three routes. The native one is recommended:

```
# macOS / Linux (recomendado, sin dependencias)
curl -fsSL <https://claude.ai/install.sh> | bash

# Windows PowerShell
irm <https://claude.ai/install.ps1> | iex

# Alternativa Homebrew
brew install --cask claude-code

# Alternativa npm (requiere Node 18+)
npm install -g @anthropic-ai/claude-code
```

Log in with your Pro/Max subscription:

```
cd ~/proyectos/mi-repo-master
claude          # primer arranque: te abre una pestaña del navegador para autenticar
```

Quick diagnostics if something isn't working:

```
claude doctor   # comprueba versión, auth, MCP servers, permisos de archivos
```

### Cursor

Download from `cursor.com/download` (macOS / Linux / Windows). On first launch it offers to import your VS Code settings and extensions — accept. Sign in with email or GitHub. Open your repo folder and you're set.

> 💡 **Senior tip**: if you work across several projects, Cursor supports *multi-root workspaces* as of version 3.0 (April 2026). Useful when a change spans repos.

---

## Plans and economics 2026

This table is the only "pricing table" you need to memorize as an operational reference. **Data confirmed as of late April 2026.**

### Claude Code

![image.png](https://media1-production-mightynetworks.imgix.net/asset/17eb9fab-2134-419c-9648-a94a8b2527be/002a3b3b4b9090d7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Models and API prices** (useful to know in order to understand what each subagent consumes):

![image.png](https://media1-production-mightynetworks.imgix.net/asset/0c58234d-ba8a-460a-a01a-bab76a46866a/537aa231e4a8355f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Cost trick**: the plans include automatic *prompt caching*. In long sessions, **\>90% of tokens are cache reads** (10% of the input price). That's what makes the flat-rate plan 2-3× cheaper than the equivalent API for continuous use.

### Cursor

![image.png](https://media1-production-mightynetworks.imgix.net/asset/2424228c-c091-4f0e-8b05-817febf30acc/e5b8b4d055171631.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 🔑 **Key Cursor detail**: Auto mode (Composer 2) **does not consume the pool**. That pool is only spent when you manually choose Sonnet 4.6, Opus 4.6, GPT-5.4, or Gemini 3.1 Pro. If you live in Auto, $20/month gives you practically unlimited usage. Overage at API price with no markup.

### Pragmatic rules for the program student

-   **Start on Pro for both.** $40/month is the sensible investment for the duration of the program.
    
-   If you go to Max some month, do it when **you've already saturated Pro consistently** — not before. Anthropic allows pay-as-you-go *extra usage* on Pro as a third route.
    
-   Having an API key as a **plan B** is good hygiene (see lesson 4: the April 2026 Pro incident).
    

---

## First productive session: agentic hello world

### Claude Code: from zero to the first change

On your personal branch of the [program repo](https://github.com/LIDR-academy/full-stack-adonisjs-master):

```
cd ~/proyectos/full-stack-adonisjs-master
git checkout alumno/tu-nombre-apellido
claude
```

Inside the interactive session:

```
> /init
```

`/init` analyzes your repo and generates (or updates) a `CLAUDE.md` at the root with:

-   Detected stack (AdonisJS 7, React 19, SQLite, OpenSpec)
    
-   Common commands (how to start the back end and front end, how to run tests)
    
-   Conventions inferred from the code
    

Read it. Edit it if something doesn't fit. That file is the base context for every future session on this repo. **We formalize it in lesson 2 when we talk about** [**AGENTS.md**](http://agents.md/)**.**

Now a simple first agentic prompt to feel the flow:

```
> Lee el endpoint /health implementado tras la sesión 2 y proponme
  qué métricas adicionales tendría sentido exponer. Sólo análisis,
  no toques código.
```

Observe:

-   The agent launches the **Explore** subagent automatically (you'll see something like `[Task] Searching codebase…`).
    
-   It returns a summary, not a dump of files.
    
-   It hasn't touched code (in this interactive session, no write tool runs without your approval by default).
    

### Cursor: equivalent

Open the same repo folder in Cursor. Cmd+L (Mac) / Ctrl+L (Windows) opens the chat. Same prompt. Cursor invokes its agent, which internally does the same as Claude Code (explore, synthesize, return) but with a visual UI.

> 💡 **Mental calibration**: if the first prompt seemed "obvious, I was already doing this", remember that in S1 you were already using agentic mode. What's new in S3 is the 7 primitives that control **how** it does it. That lesson comes next.

---

## Essential interactive session commands (Claude Code)

Memorize these 8. They cover 90% of what you'll do in the program:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/263d0faf-95c7-45c5-ae0c-f1e5dfef6544/4d40cbc5f96ebb6c.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

In Cursor the equivalent lives in the **command palette** (Cmd/Ctrl+Shift+P → search "Plan", "Agents", "MCP"…) and in the slash commands inside the chat (`/multitask`, `/best-of-n`, `/worktree`, `/btw`).

---

## Day-one anti-patterns

Typical mistakes you're going to make (or are already making) in your first hours with an agentic copilot. Recognizing them early saves weeks:

### "Starting without `/init`"

**Symptom**: you open Claude Code in the program repo, ask it directly *"add a /users/recent endpoint"*, and the agent asks three times what framework you use, what ORM, where the validators live.

**Why it happens**: nothing tells the agent it's in an AdonisJS+Lucid+VineJS project. Every turn starts from zero.

**Antidote**: `/init` always comes first when opening a new repo. It generates [CLAUDE.md](http://claude.md/) with the detected stack and common commands. Cost: 30 seconds. Savings: hundreds of turns in the future.

### "The single-turn monster prompt"

**Symptom**: you write an 800-word prompt in the first turn explaining exactly how you want the code, every restriction, every edge case.

**Why it happens**: you come from the "tell it everything at once and let it do it" paradigm. It worked with ChatGPT in pure chat.

**Why it fails**: that prompt goes into an agent that will iterate over 30 turns. It gets diluted. And worse: it prevents you from approving/correcting things along the way.

**Antidote**: shorter prompts, with plan mode enabled. Let the agent investigate, propose, and *then* you tighten the details.

### "Accepting the first plan without reading it"

**Symptom**: you request plan mode, the agent returns a plan, you approve it because "it looks fine". 30 minutes later you have 800 lines of code you don't understand.

**Antidote**: golden rule — *"if I can't explain the plan to a colleague in one sentence, I don't understand it"*. Don't approve until you can.

### "Keeping a session open all afternoon"

**Symptom**: at 6pm your session is 80 turns deep, has switched tasks 4 times, and starts forgetting things it knew at the beginning.

**Antidote**: new tasks → new session. Loading context is cheap ([CLAUDE.md](http://claude.md/) + auto-invoked skills). Dragging along contaminated context is expensive.

> 💡 Lesson 3 goes into these patterns in depth. What matters today is **recognizing that the working model is different from traditional chat**: the agent is a collaborator that iterates, not an oracle that answers.
