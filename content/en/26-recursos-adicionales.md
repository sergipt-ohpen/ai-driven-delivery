# 📚  Additional resources 🟢 | AI4Devs 2026/06 Seniors

## SDD — theory and philosophy

If you want to understand SDD beyond OpenSpec, these are the minimum readings:

-   **Academic paper**: Piskala D.B., *"Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"*, arXiv (2026). Defines the 3 levels of rigor (spec-first / spec-anchored / spec-as-source). Reading time ~30 min. → `https://arxiv.org/pdf/2602.00180`
    
-   **Official GitHub blog post** on the spec-kit launch (Sept 2025). Explains the 6 principles of SDD from the perspective of those formalizing it for the industry. → `https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/`
    
-   **Microsoft Developer Blog**: *"Diving Into Spec-Driven Development With GitHub Spec Kit"*. An enterprise view of the concept. Useful if you're going to sell SDD to your team or a manager. → `https://developer.microsoft.com/blog/spec-driven-development-spec-kit`
    
-   **Visual Studio Magazine**: *"GitHub Spec Kit Experiment: 'A Lot of Questions'"*. Critical analysis, useful for the "not everything is perfect" perspective. → `https://visualstudiomagazine.com/articles/2025/09/16/github-spec-kit-experiment-a-lot-of-questions.aspx`
    

---

## OpenSpec — the master's program tool

All the living documentation is in the Fission AI repo:

-   **Official repo**: → `https://github.com/Fission-AI/OpenSpec`
    
-   **Complete docs (index)**: → `https://github.com/Fission-AI/OpenSpec/tree/main/docs`
    
-   **Getting started** (the official minimum reading, ~10 min): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md`
    
-   **Commands reference** (slash commands explained one by one): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md`
    
-   **CLI reference** (terminal commands): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md`
    
-   **Concepts** (delta specs, capabilities, archive): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md`
    
-   **Workflows** (advanced combinations): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md`
    
-   **Supported tools** (the 21+ supported clients with installation paths): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md`
    
-   **Multi-language support**: → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/multi-language.md`
    
-   **Customization** (how to extend OpenSpec to your workflow): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md`
    
-   **CHANGELOG** (check the recent releases before teaching/applying — the tool evolves fast): → `https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md`
    
-   [**Official Discord** (link in the repo README)](https://discord.com/invite/YctCnvvshC)
    
-   **Maintainer's Twitter**: `@0xTab`
    

---

## GitHub spec-kit — comparison

Although the master's program uses OpenSpec, it's worth knowing spec-kit to understand the landscape:

-   **Repo**: → `https://github.com/github/spec-kit`
    
-   **"Spec-driven Development" document** (deep philosophy): → `https://github.com/github/spec-kit/blob/main/spec-driven.md`
    
-   **Upgrade guide** (interesting for understanding how they manage breaking changes): → `https://github.com/github/spec-kit/blob/main/docs/upgrade.md`
    

> 💡 Tip: reading the spec-kit section where they explain `constitution.md` gives you an alternative perspective on how to capture team rules. OpenSpec doesn't have a constitution; it uses `openspec/project.md` in a partially equivalent role.

---

## BMAD-METHOD — the "powerful but heavy" framework

If, once you finish the master's program, you want to explore SDD with a more ambitious system of specialized agents:

-   **Repo**: → `https://github.com/bmad-code-org/BMAD-METHOD`
    

LIDR describes it as *"too complex to start with, but undoubtedly very powerful"*. It's not for your first SDD project, but it can be your next step.

---

## The master's program project stack

### Frontend (React 19 + Vite + Tailwind + shadcn/ui)

-   **Vite** (official): → `https://vite.dev/`
    
-   **Tailwind CSS v4 — upgrade guide** (important: Tailwind v4 no longer uses `tailwind.config.js`): → `https://tailwindcss.com/docs/upgrade-guide`
    
-   **shadcn/ui — Vite installation** (the official step-by-step guide): → `https://ui.shadcn.com/docs/installation/vite`
    
-   **shadcn/ui — Tailwind v4 + React 19 guide**: → `https://ui.shadcn.com/docs/tailwind-v4`
    
-   **shadcn/ui — installation index** (other frameworks: Next, React Router, Astro, TanStack): → `https://ui.shadcn.com/docs/installation`
    

---

## Tooling

-   **Biome** (linter + formatter recommended in the master's program): → `https://biomejs.dev/`
    
-   **simple-git-hooks** (lightweight pre-commit hooks): → `https://github.com/toplenboren/simple-git-hooks`
    
-   **lefthook** (a more robust alternative, written in Go): → `https://github.com/evilmartians/lefthook`
    
-   **lint-staged** (run linters only on staged files): → `https://github.com/lint-staged/lint-staged`
    

---

## Optional deeper readings

-   **Web Reactiva (in Spanish)**: *"Guía de Spec Driven Development con agentes IA (con OpenSpec)"*, Dani Primo (March 2026). The most complete guide in Spanish about OpenSpec that I found. Covers syntax differences between Claude Code (`/opsx:propose`) and other agents (`/opsx-propose` with a hyphen). Useful if you prefer to read in Spanish: → `https://www.webreactiva.com/blog/openspec`
    
-   [**redreamality.com**](http://redreamality.com/): *"OpenSpec Deep Dive: Spec-Driven Development Architecture & Practice in AI-Assisted Programming"* (January 2026). Independent architectural analysis: → `https://redreamality.com/garden/notes/openspec-guide/`
    
-   [**redreamality.com**](http://redreamality.com/): *"GitHub Spec Kit Deep Dive: AI-Driven Specification Development Methodology"* (January 2026). A useful comparison with the previous one: → `https://redreamality.com/garden/notes/github-spec-kit-guide/`
    
-   [**dev.to**](http://dev.to/): *"How to make AI follow your instructions more for free (OpenSpec)"* (October 2025). A practical case of an individual dev integrating OpenSpec into a small project. Useful to see the "before and after": → `https://dev.to/webdeveloperhyper/how-to-make-ai-follow-your-instructions-more-for-free-openspec-2c85`
    
-   **Medium**: *"Spec-Driven Development with OpenSpec and Claude Code"*, Rajan Raj (February 2026). Applying OpenSpec to a NestJS project, similar in philosophy to the master's program stack: → `https://medium.com/@rajanonly98/spec-driven-development-with-openspec-and-claude-code-c289c4882541`
    
-   **QubitTool**: *"OpenSpec Tutorial: Master Spec-Driven Development (SDD) \[2026\]"* (April 2026). A step-by-step tutorial in blog format. Good quick reference: → `https://qubittool.com/blog/openspec-sdd-tutorial`
    

---

## 📹 Videos

A selection of YouTube videos validated for availability and quality. Most are in English — quality training content in Spanish on SDD/OpenSpec is still scarce. When Spanish-language content of equivalent quality appears, we prioritize it.

### To understand SDD from scratch

> 📹 **"Spec-Driven Development - From Idea to Production with AI - Workshop"** — Unlearn (English, **2h 07min**, April 2026). Full live workshop: they build a real product with an SDD flow from a structured spec. If you're only going to watch one long video about SDD, this is it.
> 
> Video Player is loading.
> 
> Loaded: 0%
> 
> Remaining Time 2:07:34
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

### For OpenSpec specifically

> 📹 **"OpenSpec Changes Everything - No More Vibe Coding (Full Tutorial)"** — Nathan Sebhastian (English, **12:35**, November 2025). A complete walkthrough of the `propose → apply → archive` flow on a small project. The fastest way to see OpenSpec in action.
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

### For spec-kit (comparison)

> 📹 **"The ONLY guide you'll need for GitHub Spec Kit"** — Den Delimarsky (English, September 2025). The creator of spec-kit himself explains the flow step by step. Useful timestamps in the video description: Constitution (11:10), Specification (15:25), Plan (24:00), Tasks (31:06), Implementation (34:28).
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
