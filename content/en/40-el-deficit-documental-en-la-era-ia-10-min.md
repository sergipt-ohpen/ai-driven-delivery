# 📄 The documentation deficit in the AI era 🔴 — 10 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 10 min

## The new problem nobody warned you about

There is a structural irony in AI-assisted development that is rarely named openly: **AI accelerates code production, but it does not accelerate documentation**. The result is a deficit that keeps growing.

Before, implementation speed was the natural bottleneck. A feature took 3 days; the developer had time (or social pressure) to document while implementing. With copilots, that same feature takes half a day. The documentation — which nobody explicitly asked for — ends up in the technical debt pile.

The data backs this up. The **Sonar "State of Code" 2026** (1,149 responses) reports that **42% of code currently in production is AI-generated or AI-assisted**. The same study points out that developer *toil* does not drop — it simply shifts toward "managing technical debt". Code reaches the repo faster; the team's understanding of that code does not.

And then there is the audience problem nobody expected.

> 💡 **The data point that changed everything in 2026**
> 
> Han Wang, co-founder of Mintlify, in the announcement of their Series B (April 14, 2026): *"Over 50% of traffic across our customer base is now AI agents, not humans."*
> 
> Your docs are no longer just for your team. They are the context you give the AI agents working in your codebase.

---

## The map: types of documentation and who they're for

Before talking about tools, you need a clear mental map. Technical documentation has four layers with distinct audiences. Mixing them in the same place is the root of most maintenance problems.

```diagram
┌─────────────────────────────────────────────────────────────┐
│  LAYER             AUDIENCE           LIFECYCLE              │
├─────────────────────────────────────────────────────────────┤
│  Architecture      Technical team     Slow (months)          │
│  (ADRs, C4,        + AI agents        Changes with           │
│   diagrams)                           technical decisions    │
├─────────────────────────────────────────────────────────────┤
│  API               External devs      Medium (weeks)         │
│  (OpenAPI,         + integrators      Changes with each      │
│   examples)        + AI agents        API release            │
├─────────────────────────────────────────────────────────────┤
│  Code              Team devs          Fast (days)            │
│  (TSDoc, README    + AI agents in     Changes with each      │
│   per module)      agentic mode       relevant PR            │
├─────────────────────────────────────────────────────────────┤
│  Operational       SREs, on-call      Medium                 │
│  (runbooks,        Observability      Changes with infra     │
│   deployment)      agents                                    │
└─────────────────────────────────────────────────────────────┘
```

**The most common mistake**: keeping everything in a single 800-line `README.md`, or in a Confluence that nobody updates because it sits outside the code workflow. Neither survives the pace of a team using AI.

The solution is not to write more — it is **docs-as-code**: treating documentation with the same rigor as code. It lives in the repo, goes through review, has tests, and is deployed in CI.

---

## Living documentation vs. static documentation

The distinction is not technical, it is organizational.

**Static documentation** is what someone wrote at a specific point in time and nobody has a process to update. A Confluence from 2022, an architecture PDF from the kick-off sprint, a README describing version 1 of an API that is already on version 4. The problem is not the format — it is the absence of *ownership* and of a trigger to update it.

**Living documentation** has three characteristics:

1.  **Source of truth in the repository**: it does not exist in any external system without synchronization
    
2.  **Updates as part of the workflow**: the PR that changes code also updates the affected doc
    
3.  **Automated validation**: if the doc goes stale, something in CI complains
    

> ⚠ **A warning about "automatically generated documentation"**
> 
> The fact that AI *can* generate docs does not mean that what it generates is *correct*. Claude Code can write a TSDoc that is perfect in form, but if the behavior it describes does not match what the function actually does, you have documentation that actively harms code comprehension.
> 
> The rule: **AI generates the draft, a human validates the semantics**. The form is cheap; the meaning is not.

---

## The ROI of well-done documentation

If you need to justify the investment in documentation to your team or management, these are the numbers that work.

**Time lost searching for information:**

The **Atlassian "State of Developer Experience 2025"** survey (3,500 developers and managers, Wakefield Research) found that **50% of developers lose 10 or more hours per week on non-coding tasks**. The first item on that list is, consistently, *"finding information (services, docs, APIs)"*.

The irony the same report points out: AI saves ~10 h/week, but those hours are not redirected to coding — they go into those very same information-search frictions. **AI alone does not solve the problem if the information does not exist or is out of date.**

**Documented ROI cases:**

-   **Coinbase**: docs update time went from 20 minutes to 60 seconds with Mintlify Workflows (a 20× factor)
    
-   **HubSpot**: 50% fewer engineering resources dedicated to maintaining docs
    
-   **Stack Overflow Survey 2025** (49,000+ responses): technical documentation remains the #1 learning resource (68%) for developers, above Stack Overflow (51%) and video tutorials
    

For a mid-sized AdonisJS 7 project (4-8 developers), well-maintained documentation is roughly equivalent to **not having to explain the same thing twice during onboarding**, which usually costs between 2 and 5 senior developer days.

---

## AI as a documentation partner, not an automatic generator

The correct mental model for this session is the following: **AI does not replace judgment about what to document — it amplifies it**.

The tasks where AI adds real value in documentation:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/09ce6026-a09b-46ed-9ee1-33ab3bc10a07/aa279cc50de459c0.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

The tasks where AI **does not substitute** for the developer:

-   Deciding *what* deserves to be documented and at what level of detail
    
-   Validating that the generated doc correctly describes the *actual behavior* (not the code as written)
    
-   Detecting when an ADR is obsolete and should be marked as `superseded`
    
-   Writing the "whys" of decisions — AI can fill in the template, but the real reasoning belongs to whoever made the decision
    

> 💡 **The key mindset shift of S5**
> 
> In S2 you learned that a well-written spec gives AI context to implement. In S5 you are going to see the reverse movement: **well-annotated code gives AI context to document**. The two flows are complementary, not alternatives.

---
