# 💸 Costs, Governance & When to Use What

> This is the page you bring to budget and policy conversations. It covers what AI actually costs (orders of magnitude, not price sheets), how to decide which tool for which job, the governance questions that matter, and — just as important — when *not* to use AI.

## When to use what: a decision frame

The mature question is never "which AI tool is best?" It's "**which tool for this task, right now?**" A field guide for a product organization:

| Task | Right tool |
|---|---|
| Drafting, analysis, synthesis, brainstorming | claude.ai chat, inside your Project |
| Recurring work grounded in your product docs | A Project with knowledge + custom instructions |
| Work that touches live systems (Jira, Slack, Drive) | Claude Desktop with connectors, or team integrations |
| Anything involving the codebase | Claude Code — driven by your engineers; pair with them |
| High-volume, non-urgent processing (e.g., classifying a year of feedback) | An API batch job — ask engineering; it's ~50% cheaper than interactive use |

The productive pattern isn't picking one and being loyal to it. It's fluency in a small stack, using each where it's strongest.

## Real costs, in orders of magnitude

You don't need pricing tables (they change), you need the shape of the economics:

- **Individual subscriptions are cheap relative to any salary.** Tens of dollars per person per month — roughly 0.5% of a loaded product-person cost. If it saves two hours a month, it's paid for itself. This is not where the budget conversation should spend its time.
- **Flat-rate plans beat pay-per-use for daily work.** Subscriptions include aggressive caching under the hood: in long working sessions, over 90% of the processing is dramatically discounted re-reads of context already seen. That's why a flat plan typically works out 2–3× cheaper than paying per-use API rates for the same continuous usage.
- **API usage (what engineers use to build AI *into* the product) is metered per token** and varies ~10× or more between the cheapest and the most capable models. The cost discipline that matters: use cheap models for routine volume work, reserve top models for hard reasoning. If your team builds an AI feature, ask which model tier it runs on and what a month of projected usage costs — those two questions surface 80% of the cost risk.
- **The dominant cost is neither of these — it's people's time.** A wrong AI-generated document that circulates costs more than a year of subscriptions. Optimize for review quality before optimizing for token spend.

Upgrade heuristic (works for any plan tier): upgrade when limits interrupt work **more than twice a week, consistently**. Not before, and not because of a spike week — most plans allow pay-as-you-go top-ups for spikes.

## Governance: the questions that actually matter

### Data and privacy

Before your team pastes anything sensitive into an AI tool, three questions for the vendor (or your IT team):

1. **Is our data used to train models?** On business/enterprise tiers of the major vendors, the standard answer is no — verify it's in the contract, not just the marketing page.
2. **Where does data live and how long is it retained?** Relevant for regulated industries and EU data residency.
3. **Who in our org can see what?** Admin controls, audit logs, single sign-on — the same checklist as any SaaS handling confidential data.

Then a policy for your own team, in one line: **customer PII, unreleased financials, and anything under NDA don't go into tools that aren't covered by a company agreement.** Everything else flows.

### Rules should be enforced, not just written

The single most transferable governance idea from the engineering world: there's a difference between rules an AI is *told* (which it interprets, and may drift from) and rules that are *enforced by systems* (which hold by construction). Engineers implement hard stops — the agent literally cannot touch protected files, and every action it takes is logged with a timestamp.

Your version of the same principle: for anything compliance-critical, don't rely on "we told the AI (or the team) not to." Rely on access controls, approved-tool lists, and human sign-off gates. Prompts and guidelines are for quality; **systems are for policy**.

### Auditability

If AI helps produce a decision or a document, you should be able to reconstruct how. Practically: keep the conversation, keep the approved plan (see the Explore–Plan–Execute page), and note AI involvement where your org requires it. When something goes wrong a month later, "here's the plan we reviewed and why we decided X" is the difference between a learning and an incident.

## Don't build your workflow on one vendor

In April 2026, Anthropic briefly (and mistakenly) appeared to remove a popular capability from its mid-tier plan; the internet erupted, and it was reversed within a day. The lasting lesson isn't about that incident — it's structural: **pricing and packaging will keep changing across every vendor.** A senior posture:

- Your security is not the plan you're on; it's that your **workflow is portable**. Context documents, templates, and workflow definitions written down in your own space (not locked in one tool's settings) move with you.
- Keep a plausible plan B — knowing which alternative tool covers your two or three critical workflows costs nothing and removes the panic from any vendor change.

## When NOT to use AI

The credibility of everything above depends on knowing the boundaries. Don't use AI (or don't use it unsupervised) when:

- **The answer must be factually verified and the stakes are high** — legal commitments, financial reporting, anything customer-promised. AI drafts; humans verify against sources.
- **It's a judgment call that's yours to own** — prioritization trade-offs, personnel matters, saying no to a customer. AI can lay out options and consequences; delegating the decision is abdication, and stakeholders can tell.
- **The data can't leave your boundary** and no approved tool covers it. No workflow gain is worth a data incident.
- **A deterministic tool already does it perfectly.** Counting, arithmetic on spreadsheets, exact search — use the spreadsheet. AI is for language, synthesis, and ambiguity, not for being a slow, occasionally wrong calculator.
- **You can't review the output competently.** If you can't tell a good answer from a plausible one in a domain, AI amplifies your blind spot. Pair with someone who can review, or don't ship it.

## The five takeaways for your next budget/policy meeting

1. Individual AI subscriptions are a rounding error; approve them and move the conversation to enablement and review discipline.
2. For AI *in the product*, ask two questions: which model tier, and projected monthly cost at expected volume.
3. Get the data-training and retention answers in writing before rolling out to the team.
4. Enforce compliance-critical rules with systems and sign-off gates, not with instructions.
5. Keep workflows portable — your documents and templates are the asset, the tool is the vehicle.

## 🛠️ Try it with Claude

```
Help me prepare a business case for AI tooling for a product team of
[N] people. Assumptions: [subscription cost per seat, hours saved per
person per week, loaded hourly cost]. Build the cost-benefit math,
list the 3 strongest objections a CFO would raise, and draft my
one-paragraph response to each.
```

```
Draft a one-page "AI usage policy" for my product team. Requirements:
what data may never be pasted into AI tools, which tools are approved
[list them], when human review is mandatory, and how to record AI
involvement in decisions. Plain language, no legalese — this must fit
on one page and survive first contact with a real team.
```

```
I'm deciding whether to use AI for this task: [describe task, its
stakes, the data involved, and who acts on the output]. Walk me
through the decision: is AI appropriate here at all, with what level
of human review, which tool fits best, and what's the failure mode I
should guard against?
```
