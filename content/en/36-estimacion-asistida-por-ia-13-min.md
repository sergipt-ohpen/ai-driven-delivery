# 📄 AI-assisted estimation 🔴— 13 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 13 min

## The big fake debate: SP vs hours vs t-shirts

The debate is still active and half the industry is still wrong in one direction or another. Quick read so you don't waste time:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/3e31140e-e591-48c2-beea-711f43d1d4ce/534a9777bc3632dc.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### The hours trap in the AI era

> ⚠ **Why hours stopped working as an internal planning unit**:
> 
> When an agent takes 3 minutes and a human reviewing takes 25, is that 28 minutes? Which one counts? And what if the human also has to make 2 manual commits? The unit "hours" mixes human cognitive work with machine work, and the result is that nobody knows what they're measuring anymore.

**AI4Devs operational recommendation**:

-   🎯 **SP in Fibonacci (1, 2, 3, 5, 8, 13)** as the main technique in sprint planning.
    
-   🎯 **T-shirts (S, M, L, XL)** upstream / in discovery / when estimating a 6-month roadmap.
    
-   🚫 **Hours only for external reporting or billing**, never for internal sprints.
    

---

## What recent research says about LLMs and estimation

This is new and goes against intuition. The 2024-2026 academic literature shows that LLMs are **decent** at estimating story points without project-specific training data — but "decent" doesn't mean "good", and there are nuances that matter.

📊 **Key findings** (synthesis of recent papers on arXiv and in journals):

-   LLMs without fine-tuning reach accuracy comparable to deep learning models purpose-built for SP estimation, especially with few-shot examples from the project itself.
    
-   Performance improves significantly when you give the model **histories of already-estimated stories** from the same team (signal: the AI learns your scales).
    
-   Models predict **direct absolute estimation** better than the comparison between two stories. Counter-intuitive, because for humans the natural thing is "this one is like that one, therefore the same".
    
-   Accuracy drops with complex stories or ones requiring domain-specific knowledge not present in the prompt.
    

> 💡 **Operational takeaway**: LLMs are **good planning poker peers, not good sole estimators**. Their value lies in contributing an additional opinion to the team, not in replacing the conversation.

---

## Planning poker with AI as a peer (not as a referee)

The correct use of AI in estimation is as **one more participant** in planning poker, not as ground truth.

### Operational pattern: AI-augmented planning poker

```
1. El equipo lee la story juntos (5 min).
2. Cada miembro estima en privado (Fibonacci).
3. La IA estima en privado también, con contexto del repo
   y historial de stories pasadas.
4. Se revelan todas las estimaciones a la vez.
5. Si hay outliers (humano o IA), se discute por qué.
6. NO se promedia. Se converge por discusión.
```

> 🎯 **The real value is in step 5**: when the AI says 8 points and the team says 3, there's a conversation worth having. Either the AI is reading hidden complexity the team underestimated (more common than you think), or the team has context the AI doesn't have (also common). Either way, **information emerges that wouldn't appear without the AI**.

🛡 **Anti-patterns you must avoid**:

-   ❌ **Using the AI to settle team disagreements** ("let's see what the AI says"). The AI doesn't know more than the team about their own system.
    
-   ❌ **Accepting the AI's estimate when the team doesn't have a strong opinion**. It's a shortcut for not thinking.
    
-   ❌ **Reporting the AI's estimate to stakeholders as if it had authority**. The AI estimates patterns, it doesn't deliver.
    

---

## Velocity multipliers: the mirage

If you've googled "AI velocity multiplier" in the last 18 months you'll have seen figures like "+30%", "2×", "10×". The industry is infested with optimistic claims. The serious data is more nuanced:

📊 **What we do know** (synthesis of [Index.dev](http://index.dev/), Faros AI 2026, Stack Overflow 2025, DORA 2025):

-   On **isolated individual tasks**: ~21% more tasks completed, nearly 2× more PRs per person in AI-adopting teams.
    
-   On **systemic outcomes** (DORA: deploy frequency, lead time): the effect is much smaller and depends on the team's bottleneck.
    
-   For **experienced devs working on code they know deeply**: METR July 2025 found -19% (yes, a slowdown). A February 2026 update lowered it to -4%, but the effect still isn't positive in that case.
    
-   For **devs new to a codebase**: real acceleration (10-30%), no debate.
    

> 📌 **Honest multiplier for AI4Devs sprint planning**:
> 
> -   **Greenfield tasks**: velocity rises ~20-30%. Apply a prudent multiplier of **0.85** on top of your base human estimate (you estimate 8, adjust to 7 if your team has AI well adopted).
>     
> -   **Tasks on familiar legacy code**: keep the human estimate **the same**. The copilot doesn't accelerate; it helps with boilerplate and review.
>     
> -   **Exploration/research tasks**: estimation is noisy by nature, AI or not. Use t-shirts (M, L, XL) and reassess at the end of the spike.
>     

> ⚠ **Don't multiply velocity by 2 because the team "now has Claude Code"**. It's the fastest recipe for missed sprints, burned-out teams, and disenchanted stakeholders.

---

## Estimating tasks that aren't code

This is where almost all plans fail. AI accelerates *writing code*. It accelerates much less:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/007e185c-839b-4a1d-b12a-df21111789ba/2208539278cb93a0.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Senior takeaway**: 70-80% of a team's time is not spent writing new code. It goes to debugging, review, alignment, refinement, deployment, support. **AI accelerates the part that was already small in the total picture**. That's why big multipliers are unrealistic for team outcomes.

---

## Realistic buffers: 30-40%, not 10%

Pre-AI, mature teams used 10-15% buffers on velocity for the unexpected. With AI in the flow, the realistic buffer for the next 12-18 months is **30-40%**, for these concrete reasons:

1.  **Verification tax**: every agent-generated PR requires a more careful human review. Review time went up.
    
2.  **Quality tax**: PR sizes +150% with AI, bug counts +9% (Faros 2026). More bugs mean more mid-sprint support interruptions.
    
3.  **Tooling churn**: the tools (Cursor, Claude Code, Linear Agent) update every 2-4 weeks. There's constant adaptation time.
    
4.  **Model instability**: models change overnight. A pattern that worked with Claude Sonnet 4.5 may fail with 4.6. Time is spent recalibrating.
    

```
Velocity base del equipo:                  40 SP/sprint
Buffer pre-IA (10%):                       36 SP comprometidos
Buffer AI-aware (30%):                     28 SP comprometidos
                                                       ↑
                                       12 SP de buffer real
                                       para imprevistos
```

🎯 **How to justify it to stakeholders**: show them the data. Faros 2026, DORA 2025, and your own team's reports if you've been tracking for 3+ sprints. A 30% buffer isn't pessimism; it's evidence-based realism.

---

## Epic / roadmap-level estimation

For the 3-6 month roadmap, SPs don't work (too granular, high noise). T-shirts do.

```
## Epic: FlowSync — Sincronización bidireccional con Google Calendar

### Estimación: L (3-5 sprints)

### Descomposición esperada:
- M: Auth OAuth con Google
- M: Polling y diff de eventos
- L: Resolución de conflictos
- S: UI de configuración
- S: Edge cases conocidos (recurrentes, all-day events)

### Riesgos que pueden mover de L a XL:
- Rate limits de Google Calendar API
- Casos de zonas horarias que aún no exploramos
- Compliance GDPR si hay calendarios B2B
```

> 💡 **Senior pattern**: decomposing epics into stories for L+ epics is done **when the epic starts**, not on the roadmap. The roadmap is for talking to stakeholders, not for planning sprints.

---

## Estimation is a conversation, not a number

I'll close with the rule that will sound redundant but is the one most often violated:

> 📌 **An estimate without discussion is worth less than no estimate at all**.
> 
> The number on the ticket is the **byproduct** of the conversation. The conversation is what aligns the team, uncovers hidden assumptions, and reveals complexity. If the number appears without a conversation, the ticket carries a zero dressed up as a number.

That's why AI-as-peer in planning poker is valuable: the AI forces a conversation when it gives a different estimate. AI-as-oracle (it decides) is poisonous: it cuts off the conversation.

---
