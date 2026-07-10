# 📚  Additional resources 🟢 | AI-Driven Delivery

## Official documentation

The primary source. When something in the rest of the resources contradicts these links, **the official documentation wins**.

### Claude Code

-   [Claude Code Docs · Setup](https://code.claude.com/docs/en/setup) — installation, login, initial configuration.
    
-   [Claude Code Docs · Skills](https://code.claude.com/docs/en/skills) — frontmatter, auto-invocation, bundled skills.
    
-   [Claude Code Docs · Subagents](https://code.claude.com/docs/en/sub-agents) — built-in (Explore, Plan, general-purpose) and custom.
    
-   [Claude Code Docs · Hooks](https://code.claude.com/docs/en/hooks) — the 21 lifecycle events and the 4 handlers.
    
-   [Claude Code Docs · MCP](https://code.claude.com/docs/en/mcp) — `claude mcp add`, scopes, headersHelper.
    
-   [Claude Code Docs · Output Styles](https://code.claude.com/docs/en/output-styles) — built-in, custom, and the difference from [CLAUDE.md](http://claude.md/).
    
-   [Claude Code Docs · Plugins](https://code.claude.com/docs/en/plugins) — anatomy and marketplace.
    
-   [Claude Code GitHub releases (changelog)](https://github.com/anthropics/claude-code/releases) — read at least once a month.
    
-   [Claude Code Pricing](https://claude.com/pricing).
    

### Cursor

-   [Cursor Docs](https://cursor.com/docs) — setup and full reference.
    
-   [Cursor Pricing](https://cursor.com/pricing).
    
-   [Cursor Changelog](https://cursor.com/changelog) — releases by version.
    
-   [Cursor Blog · "Agent best practices" (Lee Robinson, Jan 2026)](https://cursor.com/blog/agent-best-practices) — the official guide on how to use Cursor well.
    
-   [Cursor Blog · "Introducing Cursor 2.0 and Composer"](https://cursor.com/blog/2-0).
    

### Standards and protocols

-   [AGENTS.md](http://agents.md/) [· Open standard](https://agents.md/) — the specification of the standard adopted by Codex, Cursor, Copilot, Gemini, Windsurf, OpenCode.
    
-   [Model Context Protocol](https://modelcontextprotocol.io/) — official reference for the MCP protocol.
    
-   [GitHub Copilot Docs](https://docs.github.com/en/copilot) — for when you work with a team on Copilot Enterprise.
    

---

## Mental maps and deep references

What you'll want to read when one of the primitives falls short for you.

-   [Dean Blank · "A Mental Model for Claude Code: Skills, Subagents, and Plugins" (Mar 2026)](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) — the best compact mental map out there. Short, high-return read.
    
-   [alexop.dev](http://alexop.dev/) [· "Understanding Claude Code's Full Stack" (updated Apr 2026)](https://alexop.dev/posts/understanding-claude-code-full-stack/) — comprehensive overview with examples. Longer, more complete.
    
-   [Hivetrail · "](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard)[AGENTS.md](http://agents.md/) [vs](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard) [CLAUDE.md](http://claude.md/)[: Cross-Tool Standard"](https://hivetrail.com/blog/agents-md-vs-claude-md-cross-tool-standard) — the symlink pattern in detail.
    
-   [DeployHQ · "](https://www.deployhq.com/blog/ai-coding-config-files-guide)[CLAUDE.md](http://claude.md/)[,](https://www.deployhq.com/blog/ai-coding-config-files-guide) [AGENTS.md](http://agents.md/) [& Copilot Instructions"](https://www.deployhq.com/blog/ai-coding-config-files-guide) — comparison of the configuration files.
    
-   [Augment Code · "How to Build Your](https://www.augmentcode.com/guides/how-to-build-agents-md) [AGENTS.md](http://agents.md/)["](https://www.augmentcode.com/guides/how-to-build-agents-md) — what to put and what NOT to put in [AGENTS.md](http://agents.md/), with data from an analysis of 2,500+ files.
    
-   [Kau · "Keep your](https://kau.sh/blog/agents-md/) [AGENTS.md](http://agents.md/) [in sync"](https://kau.sh/blog/agents-md/) — single source of truth for multiple copilots.
    

---

## Operational patterns: EPE, plan mode, subagents

-   [Anthropic Engineering · "Subagents in Claude Code" (Apr 2026)](https://claude.com/blog/subagents-in-claude-code) — the blog post that established the Explore-Plan-Execute pattern as canon.
    
-   [Simon Willison · "Agentic Engineering Patterns" (open guide, in progress)](https://simonwillison.net/guides/agentic-engineering-patterns/) — the reference in English. The chapters on *linear walkthroughs* and *README-driven development* are especially useful.
    
-   [Simon Willison · "Writing about Agentic Engineering Patterns" (Feb 2026)](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/) — the post explaining the motivation behind the guide.
    
-   [ClaudeLog · Plan Mode mechanics](https://claudelog.com/mechanics/plan-mode/) — detailed operational guide.
    
-   [ClaudeLog · Output Styles mechanics](https://claudelog.com/mechanics/output-styles/) — difference from [CLAUDE.md](http://claude.md/) and `-append-system-prompt`.
    
-   [Engr Mejba Ahmed · "Leveraging Plan Mode for Risk-Free Design"](https://www.mejba.me/ai-school/claude-code-mastery-2026-agentic-engineering-bootcamp/lessons/context-engineering-project-setup/leveraging-plan-mode-for-risk-free-design) — operational case study.
    
-   [Sathish Raju · "Claude Code Subagents: Complete Guide" (Apr 2026)](https://medium.com/@sathishkraju/claude-code-subagents-the-complete-guide-to-ai-agent-delegation-d0a9aba419d0) — 3-phase EPE pipeline with example frontmatter.
    
-   [Builder.io](http://builder.io/) [· "Claude Code Subagents: How to Create, Use, and Debug Them"](https://www.builder.io/blog/claude-code-subagents) — naming, descriptions, and debugging.
    

---

## Production-ready hooks

If you're going to put hooks seriously into your repo (auditing, blocking, validation):

-   [SmartScope · "Claude Code Hooks Complete Guide (March 2026)"](https://smartscope.blog/en/generative-ai/claude/claude-code-hooks-guide/) — the 12 main lifecycle events.
    
-   [Claude Fast · "Claude Code Hooks: Complete Guide to All 12 Lifecycle Events"](https://claudefa.st/blog/tools/hooks/hooks-guide).
    
-   `disler/claude-code-hooks-mastery` — production-ready patterns: auditing, blocking dangerous patterns, test validation.
    

---

## MCP in depth

-   [Best MCP servers for Claude Code in 2026 · MCP Marketplace](https://mcp-marketplace.io/blog/best-mcp-servers-claude-code) — the most useful ones + installation commands.
    
-   [50+ Best MCP Servers · Claude Fast](https://claudefa.st/blog/tools/mcp-extensions/best-addons) — broader listing, includes security scoring.
    
-   [GitHub MCP server · install guide for Claude Code](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-claude.md) — the most used in practice.
    
-   [Figma MCP server setup](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server) — example of a plugin with integrated MCP.
    

---

## Curated repositories

-   `anthropics/skills` — reference skills maintained by Anthropic.
    
-   `anthropics/claude-code` — main repo. Example plugins in `/plugins/`.
    
-   `hesreallyhim/awesome-claude-code` — the canonical curated list.
    
-   `alirezarezvani/claude-skills` — 232+ cross-tool skills (Claude Code, Codex, Gemini CLI, Cursor, Aider, Windsurf, Kilo, OpenCode).
    
-   `affaan-m/everything-claude-code` — skills, instincts, memory, security.
    
-   `VILA-Lab/Dive-into-Claude-Code` — systematic analysis of Claude Code's architecture (paper + repo).
    
-   `caramaschiHG/awesome-ai-agents-2026` — 300+ categorized agents and tools.
    
-   `sanjeed5/awesome-cursor-rules-mdc` — Cursor `.mdc` rules with advanced frontmatter.
    
-   [Claude Marketplaces](https://claudemarketplaces.com/) — regularly updated directory of plugin marketplaces.
    

---

## Costs, plans, and governance

To understand what you pay and why.

-   [Finout · "Claude Code Pricing 2026"](https://www.finout.io/blog/claude-code-pricing-2026) — guide with spike cases and monitoring.
    
-   [Verdent · Claude Code Pricing](https://www.verdent.ai/guides/claude-code-pricing-2026) — real usage profiles with numbers.
    
-   [LaoZhang AI · "Claude Code Pricing Guide 2026"](https://blog.laozhang.ai/en/posts/claude-code-pricing-guide) — breakdown by profile.
    
-   [LaoZhang AI · "Claude Code Pro vs Max in 2026"](https://blog.laozhang.ai/en/posts/claude-code-pro-vs-max).
    
-   [Flexprice · "The Complete Guide to Cursor Pricing in 2026"](https://flexprice.io/blog/cursor-pricing-guide) — the credits model explained.
    
-   [Gradually AI · "Claude Code Statistics 2026"](https://www.gradually.ai/en/claude-code-statistics/) — adoption data and cost benchmarks.
    

### The April 2026 Pro incident (recommended reading)

-   [Simon Willison · "Is Claude Code going to cost $100/month?" (22-Apr-2026)](https://simonwillison.net/2026/Apr/22/claude-code-confusion/) — the best chronicle of the incident.
    
-   [Simon Willison · "An update on recent Claude Code quality reports" (24-Apr-2026)](https://simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports/) — technical postmortem of the three March-April bugs.
    
-   [BigGo Finance · analysis of pricing implications](https://finance.biggo.com/news/202604240157_anthropic-tests-claude-code-removal-pro-plan).
    

---

## Market and adoption data

Verified figures worth having on hand for team conversations.

-   [Stack Overflow Developer Survey 2025 · AI section](https://survey.stackoverflow.co/2025/ai/) — 84% adoption, 29% trust.
    
-   [Stack Overflow · "Trust in AI at an All Time Low"](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/) — executive analysis.
    
-   [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — TypeScript overtakes Python; 80% of new devs use Copilot.
    
-   [METR · "Measuring Impact of Early-2025 AI on Experienced OSS Devs"](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — the +19% slowdown study.
    
-   [METR update · "We are Changing our Developer Productivity Experiment Design" (Feb 2026)](https://metr.org/blog/2026-02-24-uplift-update/) — second iteration with a different result.
    
-   [arXiv 2507.09089 · original METR paper](https://arxiv.org/abs/2507.09089).
    

---

## State of the ecosystem and consolidation

To see the whole forest, not just the Claude Code or Cursor tree.

-   [The New Stack · "Cursor, Claude Code, and Codex are merging into one AI coding stack"](https://thenewstack.io/ai-coding-tool-stack/) — the "composable stack" as a trend. Essential reading.
    
-   [Morph · "14 Best AI Coding Agents in 2026: Ranked by Benchmarks and Real Usage"](https://www.morphllm.com/best-ai-coding-agents-2026) — updated quantitative comparison.
    
-   [Morph · "We Tested 15 AI Coding Agents (2026). Only 3 Changed How We Ship."](https://www.morphllm.com/ai-coding-agent) — qualitative analysis.
    
-   [GitHub Blog · "Welcome home, agents" (Agent HQ launch, Feb 2026)](https://github.blog/news-insights/company-news/welcome-home-agents/) — enterprise multi-agent.
    
-   [GitHub Blog · "What's new with Copilot coding agent"](https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-coding-agent/).
    
-   [Cognition · "Devin in Windsurf"](https://cognition.ai/blog/devin-in-windsurf) — cloud agent integration into the IDE.
    
-   [Buildfast · "Cursor Composer 2: Benchmarks, Pricing & Review (2026)"](https://www.buildfastwithai.com/blogs/cursor-composer-2-review-2026) — Cursor's own model.
    
-   [DataCamp · "What Is Cursor 3? Agents, Worktrees, and What's New"](https://www.datacamp.com/blog/cursor-3) — the latest Cursor version.
    

---

## Videos · Embeddable YouTube

Where not specified, the language is EN. Approximate durations.

### In Spanish

-   📺 [Café Codely · "Modelos que no podemos tener, Cursor 3, Claude Managed Agents"](https://www.youtube.com/watch?v=FREzjkSQ3GE) — ES, ~30 min. Review of the state of the art, April 2026.
    
-   📺 [Café Codely · "Claude mejor que ChatGPT 5.4, Cursor automation, MacBook Pro M5"](https://www.youtube.com/watch?v=w54nnIlbdUU) — ES, ~30 min. Current state of the primitives.
    
-   📺 [Café Codely · "Filtrado código fuente de Claude Code, Fallo seguridad en Axios"](https://www.youtube.com/watch?v=iEkpNO7LssM) — ES, ~30 min. Technical analysis of how Claude Code orchestrates subagents.
    

### In English

-   📺 [Tim Rogers · Future of Copilot, Octoverse 2025](https://www.youtube.com/watch?v=THyiJxOpbJY) — EN, ~10-15 min. Enterprise adoption data.
    
-   📺 [Design-to-Code Workshop with Claude Code, Cursor & Figma (Friends of Figma Miami)](https://www.youtube.com/watch?v=SEy1WPjPF3k) — EN, ~60-90 min. EPE applied to a real frontend case with the program's two tools.
    

---

## References in Spanish

The Spanish-speaking ecosystem around AI copilots is more limited than the English one, but there's material of growing quality.

-   [KMOOPS · "Guía Definitiva de Ficheros para Agentes de Código" (2-Mar-2026)](https://kmoops.com/2026/03/02/guia-definitiva-como-configurar-tu-agente-ia-sin-volverte-loco-claude-md-skills-commands-y-todo-el-lio/) — the best resource in Spanish on configuration ([CLAUDE.md](http://claude.md/), skills, commands, [AGENTS.md](http://agents.md/)).
    
-   [Café Codely](https://www.youtube.com/@CodelyTV) — weekly channel with copilot news.
    
-   [DevAI Semanal · newsletter](https://devaisemanal.com/) — newsletter in Spanish, curated operational patterns.
    
-   [El Diario IA · "Copilotos de Código 2025"](https://eldiarioia.es/2025/11/15/copilotos-de-codigo-2025-claude-sonnet-4-5-vs-gpt-5-vs-cursor-vs-windsurf/) — comparison in Spanish, historical context.
    
-   [Latent Space podcast](https://www.latent.space/) — EN, but with several Spanish-speaking guests and translated notes.
    

---

## People to follow

If you want to stay up to date without having to read everything:

-   **Simon Willison** — [simonwillison.net](http://simonwillison.net/) and `@simonw` on social media. The most reliable independent source in the ecosystem.
    
-   **Boris Cherny** — creator of Claude Code, writes sporadically; his conference talks are gold.
    
-   **Lee Robinson** (Cursor) — official Cursor best-practices guide.
    
-   **Aman Sanger** (CEO of Cursor) — shares technical details about Composer 2.
    
-   **Gergely Orosz** (Pragmatic Engineer) — enterprise surveys and analysis.
    
-   **Karpathy** — his talks set trends (he coined "vibe coding" and later "agentic engineering").
