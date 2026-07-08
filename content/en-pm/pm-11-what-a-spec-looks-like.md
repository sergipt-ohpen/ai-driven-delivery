# 📄 What a Spec Looks Like (and What You Contribute)

The previous page argued that specs are the new leverage point. This one gets concrete: what does a spec actually look like in an AI-assisted team, and — most importantly — which parts are yours?

## The ecosystem, in one paragraph

Spec-Driven Development is a methodology; several tools implement it. The names you'll hear in 2026: **OpenSpec** (lightweight, designed for evolving existing products — the most common starting point), **GitHub Spec Kit** (stricter, phase-gated, with a "constitution" of non-negotiable project principles — good for compliance-heavy work), **BMAD-METHOD** (a full virtual team of AI roles — Analyst, Architect, Scrum Master, Developer, QA — powerful but complex to start with), **AWS Kiro** (a dedicated IDE, locked to AWS's ecosystem), and **Tessl** (an enterprise SaaS platform with dashboards and centralized governance). When teams evaluate them, four criteria matter: how easy it is to get started, whether the file structure scales, whether it handles *changes to existing features* (not just new ones), and how well it plugs into the tools engineers already use. Your engineers will pick one. You don't need to install or operate any of them — but the *artifacts* they produce are remarkably similar across tools, and those artifacts are where you come in.

One philosophical point worth knowing: the most-recommended tools are **brownfield-first** — built for evolving existing products, not starting from scratch. That matches reality. Most professional product work is modifying what already exists; greenfield is the exception. A spec process that only works for brand-new projects wouldn't survive contact with your roadmap.

## The anatomy of a change

In SDD, a feature or change is described by a small bundle of documents. Using OpenSpec's structure as the reference (other tools use near-identical equivalents):

- **Proposal** — why this change exists: the problem, what changes, which product capabilities are new or modified, what's in and out of scope, and the expected impact. Think of it as a mini-PRD, read by both the AI and human reviewers.
- **Spec** — the requirements themselves, each backed by concrete scenarios (more below). This is the contract.
- **Design** — the technical approach: context, goals and non-goals, decisions, risks and trade-offs, open questions. This document is what stops the AI from improvising architecture.
- **Tasks** — a checklist of implementation steps, each small enough for the AI to complete in one go ("create the data table," "add the endpoint," "write the tests for the happy path," "write the tests for the failure cases"). Notice that tests appear as explicit tasks — quality is planned, not hoped for.

The heart of the bundle is the spec, and its building block is the **requirement with scenarios**. A requirement states a rule in one or two sentences, using unambiguous language (the system MUST / MUST NOT...). Each scenario then pins down the rule with a concrete situation in **GIVEN / WHEN / THEN** form: given this starting condition, when this happens, then this must be the result.

This format isn't decorative. It's deliberately borrowed from behavior-driven development, which means **each scenario can be translated almost directly into an automated test**. When you write a scenario, you're not just describing behavior — you're effectively specifying the test that will verify it, forever. If you've ever written acceptance criteria, this is the same muscle — just held to a higher standard, because the reader is a literal-minded AI, not a colleague who can ask you at standup.

## An example in product language

Here's a realistic requirement a PO could write for a subscription product:

```
### Requirement: Cancellation with end-of-period access
A customer who cancels a paid subscription MUST retain access to paid
features until the end of the current billing period. The system MUST
NOT charge them again after cancellation.

#### Scenario: Cancel mid-period
- GIVEN a customer on a monthly plan, 10 days into the billing period
- WHEN they cancel their subscription
- THEN they keep full access for the remaining 20 days
- AND no further charges are made

#### Scenario: Cancel then change your mind
- GIVEN a customer who cancelled 5 days ago, still within their paid period
- WHEN they reactivate their subscription
- THEN billing resumes at the next period with no interruption in access

#### Scenario: Access after the period ends
- GIVEN a cancelled customer whose paid period ended yesterday
- WHEN they log in
- THEN they see the free tier and a clear option to resubscribe
```

Notice there's nothing technical here — no databases, no APIs. It's pure product behavior, and yet it's precise enough for an AI to implement and for automated tests to verify. That third scenario is exactly the kind of edge case that gets invented on the fly (badly) when nobody writes it down.

## How the flow works — and where the review points are

The typical cycle has three steps: **propose → apply → archive**.

1. **Propose.** Someone describes the change, and the AI drafts the full bundle — proposal, spec, design, tasks — in minutes. Then comes the single most valuable moment in the whole process: **the human review**. You open all four documents. If the AI invented scope you didn't ask for, cut it. If scenarios are missing, add them. Ten minutes of review here saves hours of rework later. This checkpoint is where a PO belongs.
2. **Apply.** The AI works through the task list in order, writing code and tests and checking them off one by one, with the engineer supervising. If a test fails, it tries to fix it; if a task is unclear, a good setup asks rather than improvises.
3. **Archive.** Once shipped, the change is merged into the product's living specs. Here's the elegant part: each change is written as a **delta** — requirements marked as ADDED, MODIFIED, or REMOVED relative to what already exists. When archived, the delta folds into the living spec, and the change itself is filed away with the history preserved. It's like version control for requirements: the spec stays current and readable instead of growing into a document nobody reviews, and every future change starts from an accurate picture of what the product already does.

Two operational details that sound like engineering hygiene but have product consequences:

- **Archiving isn't optional.** If shipped changes are left un-archived, the next proposal is drafted against a stale picture of the product — the AI won't know a capability already exists and may reinvent it. If your spec library drifts from reality, its value collapses.
- **Two changes can collide.** If two in-flight changes touch the same capability, their deltas can conflict — just like two people editing the same document. Teams coordinate this the same way they coordinate any parallel work, but it's a reason to keep changes small and shipped quickly.

The practical consequence for you: your product has (or can have) a **living, always-current description of its actual behavior** — something most PRD archives and wiki pages have never achieved.

## Who owns what

**You write or co-write:**

- The **proposal** — problem, motivation, scope boundaries, impact. This is product territory, full stop.
- The **requirements and scenarios** — the behavioral rules and their edge cases, in product language. You know which edge cases matter to customers and to the business; the AI and the engineers don't.

**You review:**

- The AI-drafted spec at the propose stage. Ask: is anything here that I didn't ask for? Is any scenario missing? Would a literal reader build the right thing?
- The **task list**, at a skim level — not for technical correctness, but to check the shape matches your priorities (is the "must-have" scenario covered before the nice-to-haves? Are tests planned for the risky paths?).

**Engineers own:**

- The **design** document — architecture, technical trade-offs, which systems get touched.
- Technical execution and code review of what the AI produces.
- The mechanics of the tooling itself — installation, profiles, validation commands, keeping the AI's context clean between steps.

The boundary is intent versus implementation. Everything that defines *what correct behavior looks like* is yours to write or approve. Everything about *how the system achieves it* is theirs. The spec is precisely the interface between the two — which is why it's the most important document in the process, and why it deserves your best writing.

## 🛠️ Try it with Claude

```
Turn this user story into a spec-style requirement with scenarios: [paste story]. Format: a one-sentence rule using MUST/MUST NOT, followed by 3-5 scenarios in GIVEN/WHEN/THEN form. Stay in product language — describe user-visible behavior only, no technical implementation. Then list any edge cases you had to guess at, so I can confirm or correct them.
```

```
Here is a draft spec my team's AI generated from my feature request: [paste spec]. Review it as the Product Owner would: (1) flag anything that expands scope beyond what I described, (2) list missing scenarios — especially unhappy paths like errors, cancellations, and edge-of-period timing, (3) flag any requirement vague enough that two reasonable readers could build different things.
```

```
My product's cancellation flow currently works like this: [describe current behavior]. We want to change it so that [describe new behavior]. Write the change as a delta: which requirements are ADDED, which are MODIFIED (show before and after), and which are REMOVED. Use GIVEN/WHEN/THEN scenarios for anything new or modified.
```
