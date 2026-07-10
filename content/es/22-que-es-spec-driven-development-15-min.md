# 📝  Qué es Spec-Driven Development 🔴 — 15 min | AI-Driven Delivery

⏳ Tiempo estimado: 15 min

> En S1 vimos que un buen prompt incluye **outcome explícito + criterios de éxito + restricciones**. Esta sesión formaliza esa idea. La spec NO es otra cosa: es el prompt con criterios de éxito formalizado, versionado y compartido.

---

## El problema que SDD intenta resolver

Programar con copilotos agénticos sin metodología tiene un patrón conocido: **los requisitos viven en el chat**. Pides una feature, conversas, refinas, llegas a algo que funciona. Tres días después necesitas un cambio relacionado y la conversación original ya no está, o está enterrada en 200 turnos donde la mitad fue ruido. El resultado: el código se vuelve la única fuente de verdad y la intención original se pierde.

Como viste en el pre-curso, Karpathy declaró el giro de *vibe coding* a *agentic engineering*. SDD es la pieza metodológica concreta de ese giro: la forma operativa de trabajar con copilotos sin caer en el vibe coding.

Hay tres síntomas concretos que SDD ataca:

1.  **Ambigüedad latente**. Lo que entiende el humano y lo que entiende la IA no coinciden, pero parece que sí porque el código compila. La divergencia se descubre en producción.
    
2.  **Pérdida de contexto entre sesiones**. La IA no recuerda lo que decidiste el martes; o tú lo escribes en algún sitio donde la IA pueda leerlo, o se pierde.
    
3.  **Imposibilidad de revisar la intención**. Hacer code review sin spec es revisar código contra código que tú mismo escribiste hace dos horas. No hay con qué contrastar.
    

> 💡 **El insight clave**: en programación pre-IA, escribir specs detalladas era a menudo overkill — el código mismo servía como spec ejecutable. Con copilotos agénticos, la spec deja de ser opcional porque la IA no tiene memoria entre turnos. **La spec es la memoria que necesita la IA para construir lo que tú querías**, no lo que ella improvisó.

---

## Definición rigurosa

**Spec-Driven Development (SDD)** es una metodología en la que la especificación es el artefacto primario y el código es una expresión de la spec en un lenguaje y framework concretos. La spec captura **qué** se construye y **por qué**; el código captura **cómo**.

Tres ideas centrales:

-   **La spec es la fuente de verdad**. Cuando algo no concuerda, ganan las specs, no el código.
    
-   **Las specs son ejecutables, no estáticas**. Una IA agéntica las lee y produce código a partir de ellas.
    
-   **Las specs evolucionan**. No se escriben una vez al inicio del proyecto y se olvidan. Cambias la spec, regeneras el código.
    

GitHub lo formuló como seis principios en su lanzamiento de spec-kit:

1.  **Specifications as the lingua franca** — la spec es el artefacto primario, el código es una de muchas expresiones posibles.
    
2.  **Executable specifications** — precisas y completas suficientes para generar sistemas funcionales.
    
3.  **Continuous refinement** — la IA analiza specs en busca de ambigüedad, contradicción y huecos.
    
4.  **Research-driven context** — agentes de research recopilan contexto técnico y organizacional.
    
5.  **Bidirectional feedback** — la implementación informa la spec; la spec dirige la implementación.
    
6.  **Branching for exploration** — múltiples implementaciones desde la misma spec para comparar.
    

---

## Los tres niveles de rigor

No todo proyecto necesita el mismo nivel de formalismo. El paper *"Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"* (arXiv 2602.00180, Piskala 2026) propone una taxonomía útil:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/c3ea98df-c2e7-44e5-b56a-b1cef90856be/be60b18eb0807294.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ La mayoría de prácticas que llamamos "SDD" en 2026 son **spec-first** o **spec-anchored**. *Spec-as-source* sigue siendo aspiracional para la mayoría de equipos.

---

## SDD vs. TDD, BDD, DDD

Confundir SDD con sus primos cercanos es habitual. La diferencia clave: **qué es el artefacto primario y quién lo lee**.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/18979528-3462-4df7-acc5-d7ac2c64071a/34cd665cb15d53e1.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 La diferencia operativa más importante: **TDD especifica el comportamiento mediante ejemplos** (tests). **SDD especifica el comportamiento mediante reglas** (requirements + scenarios). Los tests son la consecuencia de la spec, no el reemplazo.

---

## Por qué SDD funciona especialmente bien con copilotos agénticos

Recordá los tres pilares de S1: **Herramienta · Contexto · Prompt**. SDD ataca los tres a la vez:

-   **Contexto**: la spec vive en el repo, no en el chat. La IA la relee en cada `apply` sin acumular el ruido de turnos previos. Esto reduce *context rot* (regla 50/70/90 de S1) porque la conversación se resetea entre fases.
    
-   **Prompt**: la spec ES el prompt. Outcome explícito (`## ADDED Requirements`), criterios de éxito (`#### Scenario:` con GIVEN/WHEN/THEN), restricciones (sección `design.md`). No tienes que reescribirlo en cada turno.
    
-   **Herramienta**: SDD aprovecha el modo *agentic*. Una IA agéntica puede leer `proposal.md`, navegar el repo, escribir tests, ejecutarlos, y volver a la spec si algo falla. Sin spec, el modo agentic se vuelve un agente sin objetivo.
    

Hay un dato cuantitativo que ya viste en S1: el experimento de Scale AI mostró que **el harness explica más varianza que el modelo** (35 puntos en SWE-Bench solo cambiando el harness). SDD es esencialmente un harness disciplinado: estructura el contexto y el prompt para que el modelo opere en su mejor régimen.

### Las 4 capacidades de los copilotos modernos que SDD aprovecha

Los copilotos agénticos actuales (Claude Code 2.x, Cursor, Codex) ya pueden:

1.  **Comprender contratos**: GitHub issues, tickets en Jira, formatos OpenAPI/GraphQL/JSON, BDD/Gherkin para tests. La spec encaja con esto naturalmente.
    
2.  **Planificar tareas en paralelo con sub-agentes especializados**: backend, frontend, tests, documentación. Una spec bien dividida en `tasks.md` lo permite.
    
3.  **Aplicar cambios en tiempo real dentro del IDE**, con diffs y checkpoints automáticos. Si te equivocas, hacés rollback al último checkpoint sin perder la spec.
    
4.  **Validar con la suite de tests** (y a veces navegando el producto vía Playwright para QA). El sistema rechaza un merge que no cumple la spec.
    

Sin SDD, todas estas capacidades existen pero se subaprovechan: te metés en el chat sin contrato verificable, sin checklist de tareas, sin criterios para validar. Con SDD, cada capacidad cae en su lugar.

> 💡 **Cita** (Álvaro Moya, LIDR): *"El developer ya no programa cada detalle, sino que diseña el contrato que los agentes deben cumplir. Es un cambio de mentalidad enorme."*

### Del SDLC clásico al SDLC automatizado

Durante décadas, el SDLC (Software Development Life Cycle) ha sido el marco de referencia: análisis, diseño, implementación, pruebas, despliegue, mantenimiento. Fases claras, responsables definidos, entregables medibles. **En papel, impecable**. En la práctica, entre esas fases se colaba:

-   Tickets mal definidos.
    
-   Documentación desactualizada.
    
-   Test cases que nadie mantenía.
    
-   *"Funciona en mi entorno de desarrollo".*
    
-   Equipos apagando incendios y revisiones eternas.
    

SDD no reemplaza ese flujo, pero lo **reinterpreta con agentes**. Cada feature parte de un requisito verificable; cada commit puede trazarse hasta ese requisito. La spec es el contrato. Nada se rompe sin que el sistema lo detecte. Nada llega a producción sin haber pasado por el contrato.

> 💡 La frase operativa que vas a escuchar en el workshop de LIDR y en el resto del máster: *"el control no se pierde, se distribuye — entre tus agentes, tus specs y tus propios procesos"*.

---

## Cuándo SDD es overkill

Honestidad técnica: SDD no es para todo.

-   **Prototipos exploratorios** donde la pregunta es "¿esto se puede hacer?". Escribir la spec de algo que puede que tires a la basura es desperdicio.
    
-   **Scripts de un solo uso** (migraciones puntuales, automatizaciones internas).
    
-   **Spikes técnicos** de menos de 2 horas. Si la conversación con la IA cabe entera en un turno, no necesitas spec.
    
-   **Bug fixes triviales** donde el cambio es obvio y la spec del comportamiento ya existe implícitamente.
    

Donde SDD aporta más:

-   **Features nuevas en sistemas existentes** (brownfield). Aquí brilla OpenSpec.
    
-   **Refactors no triviales** donde múltiples agentes / sesiones intervienen.
    
-   **APIs públicas** donde el contrato es el producto.
    
-   **Equipos distribuidos** donde la transferencia de contexto es cara.
    
-   **Trabajo regulado** (financiero, médico, legal) donde la trazabilidad es obligatoria.
    

---

## Voces autorizadas (abril 2026)

-   **Anthropic** — el blog de ingeniería ha publicado varios posts sobre cómo Claude Code se beneficia de specs explícitas en el contexto. *"AI-generated code is welcome — as long as it's been tested and verified"* (política oficial de contribuciones, repos de Anthropic).
    
-   **GitHub** — Den Delimarsky sobre spec-kit: *"We treat coding agents like search engines when we should be treating them more like literal-minded pair programmers"*. La spec es el documento que un pair literal entiende.
    
-   **Karpathy** — su giro de *vibe coding* a *agentic engineering* (visto en el pre-curso) es el contexto cultural en el que SDD se vuelve relevante. SDD es la metodología concreta que sostiene ese giro.
    
-   **LIDR (Álvaro Moya)** — *"Es la misma lógica que aplicamos con Spec-Driven Development: darle al agente un contrato claro de qué tiene que saber"* (LinkedIn, marzo 2026).
    

> 📹 **Video recomendado** — Si tenés 2 horas para invertir, el workshop *"Spec-Driven Development - From Idea to Production with AI"* (Unlearn, abril 2026, inglés) construye un producto real desde una spec en vivo. Es la mejor referencia visual de SDD aplicado.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 2:07:34
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
