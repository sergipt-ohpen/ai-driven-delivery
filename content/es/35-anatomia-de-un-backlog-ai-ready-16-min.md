# 📄 Anatomía de un backlog AI-ready 🔴— 16 min | AI-Driven Delivery

⏳ Tiempo estimado: 16 min

## La jerarquía no cambió. Lo que cambió es para quién la escribes.

Sigue habiendo PRD, epics, user stories, tasks y criterios de aceptación. La estructura es la misma desde hace 15 años. Lo que es radicalmente distinto es que el lector ya no es solo el equipo:

-   Antes: lo lee un dev humano que **completa el contexto que falta** con preguntas en el daily, slack o reuniones.
    
-   Ahora: lo lee un copiloto que **rellena el contexto que falta inventando**, y luego un humano revisa lo inventado.
    

Esto cambia el coste relativo de la ambigüedad. En la era pre-IA, una story algo vaga se acababa aclarando; ahora puede que el agente la haya implementado de la peor forma plausible antes de que alguien se dé cuenta. **El backlog AI-ready no es más detallado por gusto: es más detallado donde la ambigüedad puede colarse en código sin alguien dándose cuenta.**

---

## La pirámide y qué hace cada capa

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

Tres reglas que no son negociables si tu backlog va a ser leído por agentes:

1.  **El nivel correcto del prompt al copiloto es la story, no el epic.** Pedirle a un agente que implemente un epic completo es la forma más rápida de quemar tokens y obtener algo aproximado. La granularidad de story (1-2 días humano-equivalente) es donde los copilotos rinden bien.
    
2.  **Las tasks son artefactos del agente más que del humano.** Si la story está bien definida, las tasks las puede generar el copiloto en su EPE (Explore-Plan-Execute, S3) sin que tú tengas que pre-mascarlas.
    
3.  **Los AC son la única defensa contra la "false completeness" de la IA.** Si no los pones, el agente va a producir algo que parece terminado pero le falta el caso que tú nunca mencionaste.
    

---

## INVEST sigue aplicando. Y ahora más.

INVEST es de 2003 (Bill Wake) pero los seis criterios son la mejor checklist barata para evaluar si una story es "AI-ready":

![image.png](https://media1-production-mightynetworks.imgix.net/asset/37f4f86a-007c-4753-9429-fc78a74c4f04/3ef7089cf49bcdc7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Patrón senior**: usa INVEST como **filtro de entrada al sprint**, no como aspiración. Cualquier story que falle 2+ de los 6 criterios vuelve a refinamiento. Sin negociación. La IA no rescata stories vagas, las amplifica.

---

## Acceptance criteria: el patrón "AI as poke-holes"

La intuición habitual es: pídele a la IA que **escriba** los criterios de aceptación. Es lo más obvio y lo más generic. La realidad operativa es lo contrario: la IA destaca cuando la usas para **encontrar los criterios que faltaban**, no para escribirlos desde cero.

> 📌 **El patrón AI as poke-holes**:
> 
> 1.  El humano (PO o tech lead) escribe los AC del happy path. 4-6 bullets, 3 minutos.
>     
> 2.  Pasas la story + AC al copiloto con el prompt: "Dado este user story y estos AC, lista edge cases, supuestos implícitos, escenarios faltantes y dependencias o riesgos no mencionados."
>     
> 3.  El copiloto saca 10-15 candidatos. La mayoría son ruido. **Te quedas con los 3-5 reales** que el equipo no había pensado.
>     
> 4.  El refinamiento ya no es leer la story juntos, es discutir los gaps que la IA marcó.
>     

🎯 **Efecto medible**: Capgemini reportó (2024, citado en literatura 2026) ~15% de reducción en rework de tickets cuando se usa este patrón. No es una mejora gigante, pero **el verdadero valor no es la velocidad, es que las sorpresas mid-sprint se acaban**. Eso impacta moral y predecibilidad mucho más que la velocity.

🎥 **Vídeo recomendado** — *Product management with AI: accelerating backlog refinement* (~7 min, EN, StackSpot Demos). Ejemplo práctico de refinamiento con IA aplicado en una sesión real.

📺 [https://www.youtube.com/watch?v=Cb5R2JbnA-c](https://www.youtube.com/watch?v=Cb5R2JbnA-c)

### Formato Given/When/Then sigue siendo el mejor para AI

Los AC en formato Gherkin (Given/When/Then) son los que mejor funcionan con copilotos por una razón concreta: son **directamente traducibles a tests**. Un agente puede leer el Given/When/Then y generar el test que verifica ese AC sin un paso intermedio de interpretación.

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

Compara esto con un AC tipo "el filtro debe funcionar". El primero es ejecutable; el segundo es un placeholder que va a explotar en sprint review.

---

## La trampa de la "false completeness"

> ⚠ **Atención senior**: este es el modo de fallo más común en backlogs generados con IA.

El copiloto te genera 12 AC. Tu cerebro dice "esto está exhaustivo". No lo está. **El modelo no sabe lo que no sabe sobre tu sistema**: esa integración legacy que se cae los lunes, esa migración a medias que dejó dos columnas con la misma información, esa regla de negocio que solo conoce alguien que se fue hace tres años.

🛡 **Contramedidas operativas**:

-   **Nunca aceptes los AC del copiloto sin que un humano los revise contra el sistema real**. La revisión es 10 minutos; la deuda de un AC inventado es semanas.
    
-   **Trata los AC generados como un primer borrador**, nunca como entregable.
    
-   **Pídele al copiloto explícitamente** que marque los AC como "(asumido)" cuando no tenga evidencia clara en el contexto. Casi todos los modelos lo hacen si lo pides.
    
-   **El equipo escribe los AC del happy path**; la IA solo expande edge cases.
    

---

## Backlog (product layer) ↔ OpenSpec (spec layer)

Aquí es donde S4 conecta con S2 sin pisarse. Son dos capas con propósitos distintos:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/b9803a69-f13d-4718-a2e8-a4cb728b7e47/bfafa15f239e6750.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### El flujo canónico de un story bien planificado

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

> 💡 **Patrón concreto**: cuando una story entra al sprint, la primera tarea técnica es **generar la OpenSpec change correspondiente**. La story define el qué (con AC); OpenSpec define el cómo (con cambios concretos a archivos, contratos de API, etc.). El agente trabaja sobre la OpenSpec, no sobre el ticket de Linear directamente.

Esto lo verás en la Demo 1 de la sesión en vivo: tomamos el PRD, generamos backlog en Linear con AC, y para una story concreta generamos su OpenSpec change y la implementamos. Los dos artefactos quedan vinculados.

---

## Patrones para escribir stories que un agente pueda ejecutar

Tres patrones que separan stories AI-ready de stories que el agente va a fastidiar:

### Patrón 1 — Contexto técnico al final, no al principio

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

El agente lee de arriba a abajo. Si pones contexto técnico arriba, "decide" sobre técnica antes de entender producto.

### Patrón 2 — Definition of Done explícita por tipo de tarea

No todas las stories tienen el mismo DoD. Una refactor, un bug fix y una feature nueva exigen cosas distintas. Plantillas reutilizables:

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

Esto se vuelve un skill (S3) en el copiloto: `dod-template feature` te genera el DoD correcto.

### Patrón 3 — Explicit non-goals

Si la story dice "implementa el endpoint /me extendido", el agente puede decidir hacer también la documentación de Swagger, refactor del controller, y de paso optimizar la query. Acabas con un PR de 800 líneas en lugar de 150.

```
## Non-goals (explícito)
- No tocar otros endpoints del controller
- No cambiar el modelo User
- No optimizar queries existentes (eso va en su propio ticket)
```

> 💡 **Lectura senior**: los non-goals duelen porque parecen redundantes. No lo son. Son la línea entre un PR mergeable en 30 min y un PR que pide review de 4 personas.

---

## Recap operativo

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
