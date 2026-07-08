# 📚  Additional resources 🟢 | AI4Devs 2026/06 Seniors

> This lesson unifies all the deep-dive resources from the async content, organized by pillar (mirroring the structure of lessons 1–4). Use it as a **post-session reference**: when you want to go deeper into a specific pillar or cite a source, come back here.
> 
> You don't have to read everything. Each section includes a note indicating what to read **if you only have 30 minutes** vs. what to save for later.

## 🧭 How to use this lesson

-   **Before the live session**: optional. The async content gives you everything you need. If you have extra time, read only the resources marked with ⭐ (the essentials).
    
-   **During the master's program**: come back here when a specific pillar is your bottleneck. If the outputs are inconsistent with your project → Pillar 2 resources. If they don't solve the task → Pillar 3 resources. Etc.
    
-   **After the master's program**: keep this lesson bookmarked. Most of the URLs are sources that get updated (changelogs, blogs, leaderboards).
    

---

## 📚 General mental model (lesson 1)

Resources to reinforce the central idea: **"the model is not the bottleneck; the harness, the context, and the prompt explain more variance than the model version"**.

### Readings

-   ⭐ **Birgitta Böckeler / Martin Fowler** — *Harness engineering for coding agent users* (April 2026) [https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
    
    > The Thoughtworks article that best formalizes the paradigm shift. **If you read only one thing outside the master's program this week, make it this one.** ~10 min.
    
-   **Birgitta Böckeler — Precursor memo** (short version of the previous one) [https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html)
    
    > A briefer version for less technical audiences. ~5 min.
    

### Research cited in lesson 1

-   **METR (July 2025)** — *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
    
    > The RCT that demonstrated the +19% extra time for seniors with AI. Full paper: [https://arxiv.org/abs/2507.09089](https://arxiv.org/abs/2507.09089)
    
-   **METR (February 2026) update** [https://metr.org/blog/2026-02-24-uplift-update/](https://metr.org/blog/2026-02-24-uplift-update/)
    
    > The effect flipped to −18% in the same developers after 7 months, but with a very wide CI.
    
-   **arXiv 2510.10165** (October 2025) — *AI-Assisted Programming Decreases the Productivity of Experienced Developers by Increasing the Technical Debt and Maintenance Burden* [https://arxiv.org/abs/2510.10165](https://arxiv.org/abs/2510.10165)
    
    > The paper that documents how AI transfers work from author to reviewer: core developers produce 19% less original code and review 6.5% more code from others.
    

---

## 🛠 Pillar 1 — The Tool (lesson 2)

Resources to go deeper into taxonomy, selection criteria, and honest comparisons between tools.

### Readings

-   [https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting)
    

### Official tool documentation

-   **Anthropic — Claude Code Best Practices** [https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
    
    > The official guide on how to use Claude Code effectively. Essential if you're going to use it as your main tool.
    
-   **GitHub Copilot — Updated models and pricing** [https://docs.github.com/en/copilot/reference/ai-models/supported-models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
    
    > Changes frequently. Bookmark this URL to check which models are available in each plan.
    
-   **Cursor — Pricing and models** [https://cursor.com/pricing](https://cursor.com/pricing) · [https://cursor.com/docs/models-and-pricing](https://cursor.com/docs/models-and-pricing)
    
-   **Cognition — Acquisition of Windsurf** (July 2025) [https://cognition.ai/blog/windsurf](https://cognition.ai/blog/windsurf)
    
    > Historical context for the shift in the ecosystem.
    

### Honest benchmarks for comparing tools

-   [**vals.ai**](http://vals.ai/) — Independent re-evaluations [https://www.vals.ai/benchmarks/swebench](https://www.vals.ai/benchmarks/swebench)
    
    > Useful because most official scores are self-reported. Here you see how the same model performs when evaluated by third parties.
    
-   **SWE-rebench** — Rotating leaderboard with standardized harnesses [https://swe-rebench.com/](https://swe-rebench.com/)
    
-   **Aider Polyglot leaderboards** — 225 Exercism exercises, 6 languages [https://aider.chat/docs/leaderboards/](https://aider.chat/docs/leaderboards/)
    
    > Reproducible, cheap to run, multi-language. The reference for comparing models without tricks.
    

---

## 🧠 Pillar 2 — The Context (lesson 3)

Resources to go deeper into context engineering, context rot, and [AGENTS.md](http://agents.md/) as a standard.

### Readings

-   ⭐ **Lance Martin (LangChain)** — *Context Engineering for Agents* (June 2025) [https://blog.langchain.com/context-engineering-for-agents/](https://blog.langchain.com/context-engineering-for-agents/)
    
    > The seminal post that popularized the Write/Select/Compress/Isolate framework. ~15 min.
    
-   ⭐ **Simon Willison** — *Context engineering* (June 2025) [https://simonwillison.net/2025/jun/27/context-engineering/](https://simonwillison.net/2025/jun/27/context-engineering/)
    
    > A seminal post complementary to the LangChain one. Why the term "prompt engineering" is falling short.
    
-   **Phil Schmid — *Context Engineering*** [https://www.philschmid.de/context-engineering](https://www.philschmid.de/context-engineering)
    
    > A complementary technical perspective with code examples.
    
-   **Lance Martin — Context Engineering for Agents (academic version)** [https://rlancemartin.github.io/2025/06/23/context\_engineering/](https://rlancemartin.github.io/2025/06/23/context_engineering/)
    
    > The most detailed version by the same author on his personal blog.
    

### Research on context rot

-   ⭐ **Chroma Research** — *Context Rot: How Increasing Input Tokens Impacts LLM Performance* (July 2025) [https://www.trychroma.com/research/context-rot](https://www.trychroma.com/research/context-rot)
    
    > **The paper that changed practices in 2025.** If you bought the "1M tokens, throw everything into the window" narrative, read it. ~10 min.
    
-   **arXiv 2510.21413** (October 2025) — *Context Engineering for AI Agents in Open-Source Software* [https://arxiv.org/pdf/2510.21413](https://arxiv.org/pdf/2510.21413)
    
    > An empirical analysis of the state of agents in OSS.
    

### Documentation and specifications

-   ⭐ [**AGENTS.md**](http://agents.md/) **open spec** [https://agents.md](https://agents.md/)
    
    > The spec of the de facto standard since 2025. Read it in 5 minutes.
    
-   **Anthropic — Sub-agents in Claude Code** [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)
    
    > How to isolate context with sub-agents — the most powerful technique against context rot.
    
-   **OpenAI Codex —** [**AGENTS.md**](http://agents.md/) **guide** [https://developers.openai.com/codex/guides/agents-md](https://developers.openai.com/codex/guides/agents-md)
    
    > OpenAI's official guide on how to structure [AGENTS.md](http://agents.md/).
    
-   **Anthropic — Donating MCP to the Linux Foundation** (December 2025) [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
    
    > Context on why [AGENTS.md](http://agents.md/) and MCP are now neutral standards.
    

---

## ✏ Pillar 3 — The Prompt + Integration (lesson 4)

Resources to go deeper into prompting with reasoning models and coding-specific patterns.

### Readings

-   ⭐ **Anthropic** — *Prompting best practices* (official, updated for Claude 4.6/4.7) [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
    
    > The canonical guide. If you read only one thing about prompting in 2026, make it this one. ~20 min.
    
-   **Anthropic — Prompt engineering overview** [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
    
    > The entry point to all of Anthropic's prompting documentation.
    
-   **Anthropic — Best practices for prompt engineering** [https://claude.com/blog/best-practices-for-prompt-engineering](https://claude.com/blog/best-practices-for-prompt-engineering)
    
    > The blog post version (more narrative) of the official guide.
    
-   **OpenAI Cookbook — Prompt engineering for GPT-5.x** [https://platform.openai.com/docs/guides/prompt-engineering](https://platform.openai.com/docs/guides/prompt-engineering)
    
    > Essential if you work with GPT-5.x. Especially the section on `effort` levels and why NOT to add CoT.
    
-   **OpenAI** — *The next evolution of the Agents SDK* (April 15, 2026) [https://openai.com/index/the-next-evolution-of-the-agents-sdk/](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
    
    > The announcement of OpenAI's native harness with sandbox + [AGENTS.md](http://agents.md/) + state snapshotting.
    

### Research on prompting with reasoners

-   **arXiv 2506.04210** — *Does Thinking More always Help? Mirage of Test-Time Scaling in Reasoning Models* [https://arxiv.org/abs/2506.04210](https://arxiv.org/abs/2506.04210)
    
    > Key result: **multiple independent reasoning paths + majority vote** beats longer thinking by 20%. Implication: parallelizing (sub-agents) beats "thinking harder".
    

### Emerging coding patterns

-   **GitHub spec-kit** — a tool for Spec Driven Development (S2 preview)
    
    > Mentioned as a tease in lesson 4. We go deeper in S2.
    
-   **Karpathy — Tweets on context engineering** (Jun 2025) [https://x.com/karpathy/status/1937902205765607626](https://x.com/karpathy/status/1937902205765607626)
    
    > The post that established "context engineering > prompt engineering" in the senior discourse.
    
-   **Tobi Lütke — Tweet on context engineering** [https://x.com/tobi/status/1935533422589399127](https://x.com/tobi/status/1935533422589399127)
    
    > Shopify's CEO turning the term into corporate practice.
    

---

## 📖 Cross-cutting resources (covering multiple pillars)

### Senior newsletters and blogs

-   **Simon Willison** ([https://simonwillison.net](https://simonwillison.net/)) — near-daily updates on the entire ecosystem. **Essential if you want to stay current without reading 50 blogs.**
    
-   **Andrej Karpathy** (twitter/X) — micro-tutorials and reflections from one of the field's leading figures.
    
    -   [https://x.com/karpathy](https://x.com/karpathy)
        
-   **Geoffrey Huntley** ([https://ghuntley.com](https://ghuntley.com/)) — practical guides for intensive use of Claude Code and agentic engineering.
    

### Communities

-   [**AGENTS.md**](http://agents.md/) **GitHub repos** — search GitHub for `path:AGENTS.md` to see real examples of how OSS projects structure their persistent context.
    
-   **Anthropic Discord / OpenAI Forum** — real-time technical discussions.
    

---

## 🎯 What you should have read before the live session

If your time is limited, these are the **3 minimum readings** to arrive at the live session with the right foundation:

1.  ⭐ **Böckeler** — *Harness engineering for coding agent users* (10 min) — reinforces lesson 1
    
2.  ⭐ **Chroma** — *Context Rot* (10 min) — reinforces lesson 3
    
3.  ⭐ **Anthropic** — *Prompting best practices* (20 min) — reinforces lesson 4
