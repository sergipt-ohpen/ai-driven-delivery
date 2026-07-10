# 📝  What is Spec-Driven Development 🔴 — 15 min | AI-Driven Delivery

⏳ Estimated time: 15 min

> In S1 we saw that a good prompt includes **explicit outcome + success criteria + constraints**. This session formalizes that idea. The spec is NOT something else: it is the prompt with success criteria, formalized, versioned, and shared.

---

## The problem SDD tries to solve

Programming with agentic copilots without a methodology follows a well-known pattern: **requirements live in the chat**. You ask for a feature, you converse, you refine, you get to something that works. Three days later you need a related change and the original conversation is gone, or it's buried in 200 turns where half of it was noise. The result: the code becomes the only source of truth and the original intent is lost.

As you saw in the pre-course, Karpathy declared the shift from *vibe coding* to *agentic engineering*. SDD is the concrete methodological piece of that shift: the operational way of working with copilots without falling into vibe coding.

There are three concrete symptoms SDD attacks:

1.  **Latent ambiguity**. What the human understands and what the AI understands don't match, but they seem to because the code compiles. The divergence is discovered in production.
    
2.  **Loss of context between sessions**. The AI doesn't remember what you decided on Tuesday; either you write it down somewhere the AI can read it, or it gets lost.
    
3.  **Inability to review the intent**. Doing code review without a spec is reviewing code against code you yourself wrote two hours ago. There's nothing to compare against.
    

> 💡 **The key insight**: in pre-AI programming, writing detailed specs was often overkill — the code itself served as an executable spec. With agentic copilots, the spec stops being optional because the AI has no memory between turns. **The spec is the memory the AI needs to build what you wanted**, not what it improvised.

---

## Rigorous definition

**Spec-Driven Development (SDD)** is a methodology in which the specification is the primary artifact and the code is an expression of the spec in a concrete language and framework. The spec captures **what** is being built and **why**; the code captures **how**.

Three central ideas:

-   **The spec is the source of truth**. When something doesn't match, the specs win, not the code.
    
-   **Specs are executable, not static**. An agentic AI reads them and produces code from them.
    
-   **Specs evolve**. They aren't written once at the start of the project and forgotten. You change the spec, you regenerate the code.
    

GitHub formulated it as six principles in its spec-kit launch:

1.  **Specifications as the lingua franca** — the spec is the primary artifact, the code is one of many possible expressions.
    
2.  **Executable specifications** — precise and complete enough to generate working systems.
    
3.  **Continuous refinement** — the AI analyzes specs looking for ambiguity, contradiction, and gaps.
    
4.  **Research-driven context** — research agents gather technical and organizational context.
    
5.  **Bidirectional feedback** — the implementation informs the spec; the spec drives the implementation.
    
6.  **Branching for exploration** — multiple implementations from the same spec for comparison.
    

---

## The three levels of rigor

Not every project needs the same level of formalism. The paper *"Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"* (arXiv 2602.00180, Piskala 2026) proposes a useful taxonomy:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/c3ea98df-c2e7-44e5-b56a-b1cef90856be/be60b18eb0807294.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ Most of the practices we call "SDD" in 2026 are **spec-first** or **spec-anchored**. *Spec-as-source* remains aspirational for most teams.

---

## SDD vs. TDD, BDD, DDD

Confusing SDD with its close cousins is common. The key difference: **what the primary artifact is and who reads it**.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/18979528-3462-4df7-acc5-d7ac2c64071a/34cd665cb15d53e1.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 The most important operational difference: **TDD specifies behavior through examples** (tests). **SDD specifies behavior through rules** (requirements + scenarios). Tests are the consequence of the spec, not the replacement.

---

## Why SDD works especially well with agentic copilots

Remember the three pillars from S1: **Tool · Context · Prompt**. SDD attacks all three at once:

-   **Context**: the spec lives in the repo, not in the chat. The AI re-reads it on every `apply` without accumulating the noise of previous turns. This reduces *context rot* (the 50/70/90 rule from S1) because the conversation resets between phases.
    
-   **Prompt**: the spec IS the prompt. Explicit outcome (`## ADDED Requirements`), success criteria (`#### Scenario:` with GIVEN/WHEN/THEN), constraints (`design.md` section). You don't have to rewrite it on every turn.
    
-   **Tool**: SDD leverages *agentic* mode. An agentic AI can read `proposal.md`, navigate the repo, write tests, run them, and go back to the spec if something fails. Without a spec, agentic mode becomes an agent without a goal.
    

There's a quantitative data point you already saw in S1: the Scale AI experiment showed that **the harness explains more variance than the model** (35 points on SWE-Bench just by changing the harness). SDD is essentially a disciplined harness: it structures the context and the prompt so the model operates in its best regime.

### The 4 capabilities of modern copilots that SDD leverages

Today's agentic copilots (Claude Code 2.x, Cursor, Codex) can already:

1.  **Understand contracts**: GitHub issues, Jira tickets, OpenAPI/GraphQL/JSON formats, BDD/Gherkin for tests. The spec fits into this naturally.
    
2.  **Plan tasks in parallel with specialized sub-agents**: backend, frontend, tests, documentation. A spec well split into `tasks.md` enables this.
    
3.  **Apply changes in real time inside the IDE**, with diffs and automatic checkpoints. If you make a mistake, you roll back to the last checkpoint without losing the spec.
    
4.  **Validate with the test suite** (and sometimes by navigating the product via Playwright for QA). The system rejects a merge that doesn't fulfill the spec.
    

Without SDD, all of these capabilities exist but are underused: you dive into the chat without a verifiable contract, without a task checklist, without criteria to validate against. With SDD, each capability falls into place.

> 💡 **Quote** (Álvaro Moya, LIDR): *"The developer no longer programs every detail, but rather designs the contract the agents must fulfill. It's a huge mindset shift."*

### From the classic SDLC to the automated SDLC

For decades, the SDLC (Software Development Life Cycle) has been the frame of reference: analysis, design, implementation, testing, deployment, maintenance. Clear phases, defined owners, measurable deliverables. **On paper, impeccable**. In practice, between those phases would slip in:

-   Poorly defined tickets.
    
-   Outdated documentation.
    
-   Test cases nobody maintained.
    
-   *"It works in my development environment."*
    
-   Teams putting out fires and endless reviews.
    

SDD doesn't replace that flow, but it **reinterprets it with agents**. Every feature starts from a verifiable requirement; every commit can be traced back to that requirement. The spec is the contract. Nothing breaks without the system detecting it. Nothing reaches production without having passed through the contract.

> 💡 The operational phrase you're going to hear in the LIDR workshop and throughout the rest of the master's program: *"control isn't lost, it's distributed — among your agents, your specs, and your own processes."*

---

## When SDD is overkill

Technical honesty: SDD is not for everything.

-   **Exploratory prototypes** where the question is "can this even be done?". Writing the spec for something you might throw away is waste.
    
-   **Single-use scripts** (one-off migrations, internal automations).
    
-   **Technical spikes** under 2 hours. If the conversation with the AI fits entirely in one turn, you don't need a spec.
    
-   **Trivial bug fixes** where the change is obvious and the spec of the behavior already exists implicitly.
    

Where SDD adds the most value:

-   **New features in existing systems** (brownfield). This is where OpenSpec shines.
    
-   **Non-trivial refactors** where multiple agents / sessions are involved.
    
-   **Public APIs** where the contract is the product.
    
-   **Distributed teams** where context transfer is expensive.
    
-   **Regulated work** (financial, medical, legal) where traceability is mandatory.
    

---

## Authoritative voices (April 2026)

-   **Anthropic** — the engineering blog has published several posts on how Claude Code benefits from explicit specs in the context. *"AI-generated code is welcome — as long as it's been tested and verified"* (official contribution policy, Anthropic repos).
    
-   **GitHub** — Den Delimarsky on spec-kit: *"We treat coding agents like search engines when we should be treating them more like literal-minded pair programmers"*. The spec is the document a literal-minded pair understands.
    
-   **Karpathy** — his shift from *vibe coding* to *agentic engineering* (covered in the pre-course) is the cultural context in which SDD becomes relevant. SDD is the concrete methodology that sustains that shift.
    
-   **LIDR (Álvaro Moya)** — *"It's the same logic we apply with Spec-Driven Development: giving the agent a clear contract of what it needs to know"* (LinkedIn, March 2026).
    

> 📹 **Recommended video** — If you have 2 hours to invest, the workshop *"Spec-Driven Development - From Idea to Production with AI"* (Unlearn, April 2026, English) builds a real product from a spec, live. It's the best visual reference of SDD in practice.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
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

---
