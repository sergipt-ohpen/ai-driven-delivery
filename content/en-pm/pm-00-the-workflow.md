# 🧭 The Workflow (read this first)

Before any prompt, any tool, any trick — this is the one idea the whole guide is built on. Get this, and the rest is just detail.

## The one-line version

**You open the real project in Claude, and Claude answers from it — not from guesses.** Around that, your tickets live in Jira and your docs live in Confluence, both connected so Claude can read and update them. That's it.

## The picture

<div class="diagram-wrap">
<svg viewBox="0 0 900 510" role="img" aria-label="Diagram: GitHub feeds the project folder, opened in Claude Desktop. Claude connects to Jira and Confluence via the Atlassian connector. You direct Claude by refining the backlog, writing stories, PRDs, estimates and updates.">
<defs>
<marker id="wfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0L10,5L0,10z" style="fill:var(--muted)"/>
</marker>
</defs>
<style>
.wf-box{fill:var(--card);stroke:var(--line);stroke-width:1.5;}
.wf-box.hub{stroke:var(--accent);stroke-width:2.5;}
.wf-t{font-family:-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;fill:var(--fg);}
.wf-t.sub{fill:var(--muted);font-size:13px;}
.wf-t.lbl{fill:var(--muted);font-size:12px;}
.wf-line{stroke:var(--muted);stroke-width:1.6;fill:none;marker-end:url(#wfArrow);}
.wf-line.both{marker-start:url(#wfArrow);}
</style>

<rect class="wf-box" x="20" y="40" width="180" height="90" rx="14"/>
<text class="wf-t" x="110" y="80" font-size="15" font-weight="700" text-anchor="middle">🐙 GitHub</text>
<text class="wf-t sub" x="110" y="102" text-anchor="middle">the source of truth</text>

<rect class="wf-box" x="320" y="20" width="280" height="110" rx="14"/>
<text class="wf-t" x="460" y="58" font-size="15" font-weight="700" text-anchor="middle">💻 Project folder</text>
<text class="wf-t sub" x="460" y="80" text-anchor="middle">on your laptop</text>
<text class="wf-t sub" x="460" y="100" text-anchor="middle">real code + real docs</text>

<rect class="wf-box" x="280" y="190" width="200" height="70" rx="14"/>
<text class="wf-t" x="380" y="222" font-size="15" font-weight="700" text-anchor="middle">🎫 Jira Cloud</text>
<text class="wf-t sub" x="380" y="242" text-anchor="middle">tickets</text>

<rect class="wf-box" x="280" y="290" width="200" height="70" rx="14"/>
<text class="wf-t" x="380" y="322" font-size="15" font-weight="700" text-anchor="middle">📄 Confluence</text>
<text class="wf-t sub" x="380" y="342" text-anchor="middle">docs</text>

<rect class="wf-box hub" x="580" y="170" width="220" height="160" rx="18"/>
<text class="wf-t" x="690" y="232" font-size="28" text-anchor="middle">🧭</text>
<text class="wf-t" x="690" y="266" font-size="17" font-weight="700" text-anchor="middle">CLAUDE</text>
<text class="wf-t sub" x="690" y="288" text-anchor="middle">you work here</text>

<rect class="wf-box" x="580" y="400" width="220" height="90" rx="14"/>
<text class="wf-t" x="690" y="428" font-size="15" font-weight="700" text-anchor="middle">🧑‍💻 YOU</text>
<text class="wf-t sub" x="690" y="450" text-anchor="middle">refine backlog, write stories,</text>
<text class="wf-t sub" x="690" y="466" text-anchor="middle">PRDs, estimates, updates</text>

<path class="wf-line" d="M200,82 L320,75"/>
<text class="wf-t lbl" x="260" y="68" text-anchor="middle">clone / pull</text>

<path class="wf-line" d="M460,130 L460,155 L690,155 L690,170"/>
<text class="wf-t lbl" x="575" y="148" text-anchor="middle">opened in Claude Desktop (Code mode)</text>

<path class="wf-line both" d="M480,222 L580,222"/>
<path class="wf-line both" d="M480,318 L580,300"/>
<text class="wf-t lbl" x="530" y="270" text-anchor="middle">via Atlassian</text>
<text class="wf-t lbl" x="530" y="285" text-anchor="middle">connector</text>

<path class="wf-line" d="M690,400 L690,330"/>
</svg>
</div>

## Why this is the whole game

Most people use AI by describing their product from memory and hoping. The answers come back fluent and generic — and often wrong, because the AI never saw the actual thing.

This workflow removes the guessing. When the real project is open in front of Claude, "how does our login work?" or "what would this change touch?" get answered from **your** code and **your** docs. When Jira and Confluence are connected, a refined story doesn't get copy-pasted by hand — Claude reads the ticket and updates it in place. Your job shifts from *typing things up* to *deciding and directing*.

## It has a name: AI-driven Delivery

Everything in this guide is one half of something bigger: **AI-driven Delivery**, the whole path from a raw idea to shipped software, grounded in the real project at every step instead of guesswork.

Your half starts before any spec exists — turning a rough idea into a refined backlog item, a clear ticket, a PRD, an estimate a stakeholder can trust. Once that's solid, it hands off into **Spec-Driven Development**, the practice your engineering team uses to turn a written spec into a contract an AI copilot can implement against. Same grounding, same "project as source of truth" principle — just the other half of the pipeline.

You don't need to run SDD yourself to benefit from it: the clearer your ticket, the more literally an AI can build it. That's the whole point of AI-driven Delivery — product and engineering, both working from the same real project, handing off clean instead of re-explaining from memory.

## The five steps

1. **The project is the source of truth.** Your team's repository — the code and its docs — lives on GitHub.
2. **You open that project folder in Claude.** In the Claude Desktop app you switch to **Code mode** and point it at the folder. Now Claude can read every file.
3. **You keep it fresh.** Because Code mode has Git, you just tell Claude *"pull the latest"* at the start of a session. Now it sees today's reality, not last month's.
4. **Jira and Confluence are connected.** Through the official Atlassian connector, Claude can read your tickets and pages — and create or update them.
5. **You drive the product work.** Refine the backlog, write stories and PRDs, sanity-check estimates, write stakeholder updates — every answer grounded in the actual project, tickets, and docs.

## How to read the rest

- **Set it up once** — two short pages: get your project into Claude, then connect Jira & Confluence. Do these once and forget them.
- **Using it day to day** — the four things you actually do, each grounded in the real project.
- **Playbook** — copy-paste prompts for when you just want to get going.

Skim the daily-use pages, then live in the Playbook. You don't need to remember any of this — you need to do it once and feel the difference.
