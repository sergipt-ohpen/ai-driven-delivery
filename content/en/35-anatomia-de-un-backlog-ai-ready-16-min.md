# 📄 Anatomy of an AI-ready backlog 🔴— 16 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 16 min

## The hierarchy didn't change. What changed is who you write it for.

There are still PRDs, epics, user stories, tasks, and acceptance criteria. The structure has been the same for 15 years. What is radically different is that the reader is no longer just the team:

-   Before: it's read by a human dev who **fills in the missing context** with questions in the daily, Slack, or meetings.
    
-   Now: it's read by a copilot that **fills in the missing context by making it up**, and then a human reviews what was made up.
    

This changes the relative cost of ambiguity. In the pre-AI era, a somewhat vague story eventually got clarified; now the agent may have implemented it in the worst plausible way before anyone notices. **An AI-ready backlog isn't more detailed for its own sake: it's more detailed where ambiguity can slip into code without anyone noticing.**

---

## The pyramid and what each layer does

```diagram
┌──────────────────────┐  Visión, alcance MVP, decisiones de
│         PRD          │  arquitectura, métricas de éxito.
└──────────┬───────────┘  (Producto + Tech, semanas/meses)
           │
┌──────────▼───────────┐  Bloques grandes de capacidad.
│        EPICS         │  Una hipótesis de producto.
└──────────┬───────────┘  (Días/semanas, varios sprints)
           │
┌──────────▼───────────┐  Comportamiento observable de un usuario
│     USER STORIES     │  o sistema. INVEST. Cabe en un sprint.
└──────────┬───────────┘  (Horas/días)
           │
┌──────────▼───────────┐  Unidad de trabajo técnico para
│        TASKS         │  alguien (humano o agente).
└──────────┬───────────┘  (Minutos/horas)
           │
┌──────────▼───────────┐  Cómo verificas que está hecho.
│ ACCEPTANCE CRITERIA  │  Testeable. Observable. Sin ambigüedad.
└──────────────────────┘
```

Three rules that are non-negotiable if your backlog is going to be read by agents:

1.  **The right level for prompting the copilot is the story, not the epic.** Asking an agent to implement a complete epic is the fastest way to burn tokens and get something approximate. Story granularity (1-2 human-equivalent days) is where copilots perform well.
    
2.  **Tasks are artifacts of the agent more than of the human.** If the story is well defined, the copilot can generate the tasks in its EPE (Explore-Plan-Execute, S3) without you having to pre-chew them.
    
3.  **ACs are the only defense against AI's "false completeness".** If you don't include them, the agent will produce something that looks finished but is missing the case you never mentioned.
    

---

## INVEST still applies. Now more than ever.

INVEST dates from 2003 (Bill Wake), but the six criteria are the best cheap checklist for evaluating whether a story is "AI-ready":

![image.png](https://media1-production-mightynetworks.imgix.net/asset/37f4f86a-007c-4753-9429-fc78a74c4f04/3ef7089cf49bcdc7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Senior pattern**: use INVEST as a **sprint entry filter**, not as an aspiration. Any story that fails 2+ of the 6 criteria goes back to refinement. No negotiation. AI doesn't rescue vague stories, it amplifies them.

---

## Acceptance criteria: the "AI as poke-holes" pattern

The usual intuition is: ask the AI to **write** the acceptance criteria. It's the most obvious and the most generic. The operational reality is the opposite: AI shines when you use it to **find the criteria that were missing**, not to write them from scratch.

> 📌 **The AI as poke-holes pattern**:
> 
> 1.  The human (PO or tech lead) writes the happy path ACs. 4-6 bullets, 3 minutes.
>     
> 2.  You pass the story + ACs to the copilot with the prompt: "Given this user story and these ACs, list edge cases, implicit assumptions, missing scenarios, and unmentioned dependencies or risks."
>     
> 3.  The copilot produces 10-15 candidates. Most are noise. **You keep the 3-5 real ones** the team hadn't thought of.
>     
> 4.  Refinement is no longer reading the story together, it's discussing the gaps the AI flagged.
>     

🎯 **Measurable effect**: Capgemini reported (2024, cited in 2026 literature) ~15% reduction in ticket rework when this pattern is used. It's not a giant improvement, but **the real value isn't the speed, it's that mid-sprint surprises come to an end**. That impacts morale and predictability much more than velocity.

🎥 **Recommended video** — *Product management with AI: accelerating backlog refinement* (~7 min, EN, StackSpot Demos). A practical example of AI-assisted refinement applied in a real session.

📺 [https://www.youtube.com/watch?v=Cb5R2JbnA-c](https://www.youtube.com/watch?v=Cb5R2JbnA-c)

### The Given/When/Then format is still the best for AI

ACs in Gherkin format (Given/When/Then) are the ones that work best with copilots for a concrete reason: they are **directly translatable into tests**. An agent can read the Given/When/Then and generate the test that verifies that AC without an intermediate interpretation step.

```
# Story: Como usuario, quiero filtrar tareas pendientes
# para encontrar lo que tengo que hacer hoy.

Scenario: Filtro estándar por estado pendiente
  Given el usuario tiene 12 tareas (5 pendientes, 7 completadas)
  When solicita /api/tasks?status=pending
  Then la respuesta es 200 OK
  And contiene exactamente 5 tareas
  And todas tienen status="pending"

Scenario: Filtro con valor inválido
  Given el usuario solicita /api/tasks?status=banana
  When llega al backend
  Then responde 400 Bad Request
  And el mensaje incluye los valores válidos: "pending" | "completed" | "archived"
```

Compare this with an AC like "the filter must work". The first is executable; the second is a placeholder that will blow up in sprint review.

---

## The "false completeness" trap

> ⚠ **Senior warning**: this is the most common failure mode in AI-generated backlogs.

The copilot generates 12 ACs for you. Your brain says "this is exhaustive". It isn't. **The model doesn't know what it doesn't know about your system**: that legacy integration that goes down on Mondays, that half-finished migration that left two columns with the same information, that business rule known only to someone who left three years ago.

🛡 **Operational countermeasures**:

-   **Never accept the copilot's ACs without a human reviewing them against the real system**. The review takes 10 minutes; the debt from a made-up AC takes weeks.
    
-   **Treat generated ACs as a first draft**, never as a deliverable.
    
-   **Explicitly ask the copilot** to mark ACs as "(assumed)" when it has no clear evidence in the context. Almost all models do this if you ask.
    
-   **The team writes the happy path ACs**; the AI only expands edge cases.
    

---

## Backlog (product layer) ↔ OpenSpec (spec layer)

This is where S4 connects with S2 without stepping on it. They are two layers with different purposes:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/b9803a69-f13d-4718-a2e8-a4cb728b7e47/bfafa15f239e6750.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### The canonical flow of a well-planned story

```diagram
PRD          ────► User Story            ────► OpenSpec change       ────► Código
(página/    (Linear/Jira ticket          (openspec/changes/...        (PR mergeable)
 docs)       con AC en GWT)               markdown formal)
                  │                            ▲
                  └──────── pasarela ──────────┘
                       (la story alimenta
                        la spec; la spec
                        cierra el ticket)
```

> 💡 **Concrete pattern**: when a story enters the sprint, the first technical task is to **generate the corresponding OpenSpec change**. The story defines the what (with ACs); OpenSpec defines the how (with concrete changes to files, API contracts, etc.). The agent works on the OpenSpec, not on the Linear ticket directly.

You'll see this in Demo 1 of the live session: we take the PRD, generate a backlog in Linear with ACs, and for one specific story we generate its OpenSpec change and implement it. The two artifacts end up linked.

---

## Patterns for writing stories an agent can execute

Three patterns that separate AI-ready stories from stories the agent is going to mess up:

### Pattern 1 — Technical context at the end, not at the beginning

```
## Story: Como dev de FlowSync, quiero un endpoint /me
extendido que incluya rol y permisos para evitar
una llamada extra desde el frontend.

## AC (Given/When/Then)
... [happy path + edge cases]

## Contexto técnico (para el agente)
- Endpoint actual: backend/app/controllers/auth_controller.ts:getMe()
- Modelo User tiene relación @hasOne con Role en app/models/user.ts
- Permisos vienen de RolePermission (revisar app/services/permission_service.ts)
- Tests previos similares: tests/functional/auth/me.spec.ts
```

The agent reads top to bottom. If you put technical context at the top, it "decides" on technique before understanding the product.

### Pattern 2 — Explicit Definition of Done per task type

Not all stories have the same DoD. A refactor, a bug fix, and a new feature demand different things. Reusable templates:

```
## DoD (feature nueva)
- [ ] Endpoint implementado siguiendo el patrón existente
- [ ] Validación con VineJS de inputs y outputs
- [ ] Tests funcionales cubriendo todos los AC del GWT
- [ ] Documentación en OpenAPI auto-generada
- [ ] OpenSpec change archivado tras merge

## DoD (bug fix)
- [ ] Test que reproduce el bug **antes** del fix (commit aparte)
- [ ] Fix implementado
- [ ] Test que ahora pasa
- [ ] Análisis 5-whys en el ticket de qué clase de bug es

## DoD (refactor)
- [ ] Cobertura de tests del módulo NO baja
- [ ] Comportamiento observable inalterado (mismos contratos)
- [ ] PR con explicación de la mejora arquitectónica
```

This becomes a skill (S3) in the copilot: `dod-template feature` generates the correct DoD for you.

### Pattern 3 — Explicit non-goals

If the story says "implement the extended /me endpoint", the agent may decide to also do the Swagger documentation, refactor the controller, and optimize the query while it's at it. You end up with an 800-line PR instead of 150.

```
## Non-goals (explícito)
- No tocar otros endpoints del controller
- No cambiar el modelo User
- No optimizar queries existentes (eso va en su propio ticket)
```

> 💡 **Senior takeaway**: non-goals hurt because they seem redundant. They aren't. They are the line between a PR mergeable in 30 minutes and a PR that requires review from 4 people.

---

## Operational recap

```diagram
┌─────────────────────────────────────────────────────────┐
│ Una story es AI-ready si:                               │
│                                                         │
│  ✓ Pasa INVEST (los 6, especialmente Small y Testable)  │
│  ✓ Tiene AC en Given/When/Then                          │
│  ✓ El humano escribió el happy path; la IA lo expandió  │
│  ✓ Tiene contexto técnico al final, no al principio     │
│  ✓ Tiene DoD por tipo de trabajo                        │
│  ✓ Tiene non-goals explícitos cuando aplique            │
│  ✓ Está enlazada (o lista para enlazar) con su          │
│     OpenSpec change cuando entre al sprint              │
└─────────────────────────────────────────────────────────┘
```
