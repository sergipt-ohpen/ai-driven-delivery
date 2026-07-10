# 📄 El ecosistema SDD en 2026 🔴 — 15 min | AI-Driven Delivery

⏳ Tiempo estimado: 15 min

> SDD no es OpenSpec. SDD es la metodología; OpenSpec es una de las herramientas que la implementan. Saber qué hay alrededor te permite tomar decisiones informadas en tu trabajo.

---

## Mapa del territorio

A abril de 2026 hay cinco herramientas / frameworks SDD relevantes con tracción real (más allá de prototipos académicos), cada uno con filosofía distinta:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/01ca5d5e-7001-438c-8295-488e1acfd594/5015321902e03623.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Junto a estas hay **frameworks de convenciones** que se montan encima de una herramienta SDD. El propio LIDR mantiene dos:

-   `LIDR-academy/ai-specs` — convenciones LIDR pensadas para usar con OpenSpec.
    
-   `LIDR-academy/manual-SDD` — variante skills-first sin OpenSpec, para equipos que no quieren la dependencia.
    

> 💡 **Convención vs. herramienta**: OpenSpec te da el flujo (`/opsx:propose → /opsx:apply → /opsx:archive`) y la estructura de carpetas. Las convenciones LIDR le añaden estándares de codificación, plantillas de PR, agentes especializados (`backend`, `frontend`, `analyst`). Son capas complementarias, no competidoras.

---

## Cómo elegir un framework SDD: 4 criterios (frame mental de LIDR)

Antes de mirar herramientas concretas, LIDR propone 4 criterios para evaluar cualquier framework SDD:

1.  **Facilidad de arranque** — ¿el framework crea el contexto inicial por ti o tenés que escribirlo a mano?
    
2.  **Buenas prácticas de manejo del contexto** — ¿la estructura de ficheros que propone es coherente y escalable?
    
3.  **Gestión de cambios** — ¿soporta evolución de features y actualización de checklists, o solo el flujo inicial?
    
4.  **Integración con IDEs** — ¿se conecta nativamente con Claude Code, Cursor, Windsurf, etc., o exige glue code?
    

Aplicado a las 5 opciones de la tabla:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/91b55240-1870-4f97-aaf7-df1fe0b16346/609df2e1ef421dd3.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⭐ Cita textual de LIDR sobre OpenSpec: *"OpenSpec: bueno tanto para proyectos nuevos como existentes.* ***Nuestra recomendación para empezar.****"*

---

## OpenSpec (Fission AI)

**Tagline oficial**: *"AI coding assistants are powerful but unpredictable when requirements live only in chat history. OpenSpec adds a lightweight spec layer so you agree on what to build before any code is written."*

Características clave:

-   **CLI Node.js** — `npm i -g @fission-ai/openspec`. Requiere Node 20.19+.
    
-   **Brownfield-first**. Está pensado para proyectos existentes, no para arrancar de cero.
    
-   **21+ herramientas soportadas**: Claude Code, Cursor, Windsurf, Continue, Gemini CLI, GitHub Copilot, Amazon Q Developer, Cline, RooCode, Kilo Code, Auggie, CodeBuddy, Qoder, Qwen Code, CoStrict, Crush, Factory, OpenCode, Antigravity, iFlow, Codex.
    
-   **Workflow ligero**: tres comandos básicos (`propose`, `apply`, `archive`). Hay un perfil expandido (`new`, `continue`, `ff`, `verify`, `onboard`, `bulk-archive`) para flujos más controlados.
    
-   **Concepto signature**: las **delta specs**. Cada cambio se expresa como diff sobre las specs vivas (`## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`). Cuando archivas, el delta se fusiona con las specs principales. Veremos esto en detalle en la página 3.
    

---

## GitHub spec-kit

**Tagline oficial**: *"*💫 *Toolkit to help you get started with Spec-Driven Development."*

Características clave:

-   **CLI Python** — `uvx --from specify-cli specify init`. Requiere `uv` instalado.
    
-   **Greenfield-friendly**, aunque soporta brownfield con `-no-git`.
    
-   **20+ AI agents soportados** (Claude Code, Copilot, Cursor, Gemini CLI, Codex, etc.).
    
-   **Workflow lineal estricto** con cuatro fases: `/speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement`. Las fases son *gated*: no avanzas hasta validar la actual.
    
-   **Concepto signature**: el archivo `constitution.md` — principios no negociables del proyecto (testing obligatorio, stack permitido, convenciones de equipo). Se evalúa en cada fase.
    

**Diferencias filosóficas con OpenSpec**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a50d96bb-a715-41c6-a9e9-02e1e2e82f36/4eb6a48855ede625.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Cuándo usar uno u otro**: spec-kit si arrancás un proyecto desde cero con requisitos compliance/regulatorios fuertes. OpenSpec si trabajás sobre código existente y querés iterar rápido. En el máster: OpenSpec.

> 📹 **Video recomendado** — Si querés profundizar en spec-kit antes de quedarte con OpenSpec, *"The ONLY guide you'll need for GitHub Spec Kit"* (Den Delimarsky, septiembre 2025, inglés) es el tutorial del propio creador. Tiene timestamps por fase: Constitution 11:10, Specification 15:25, Plan 24:00, Tasks 31:06, Implementation 34:28.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 40:01
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

## BMAD-METHOD

**Qué es**: Behaviour Modeling for AI Driven development. Sistema completo de agentes con roles especializados (Analyst, Architect, Scrum Master, Developer, QA) que colaboran sobre una spec central. Pensado para proyectos donde el equipo virtual de IA replica los roles de un equipo humano.

Características clave:

-   **Agentes con personas definidas**: cada uno tiene un rol, competencias y formato de output específico.
    
-   **Workflows multi-fase**: discovery, planning, building, testing.
    
-   **Soporte multi-stack**: no atado a un lenguaje concreto.
    

**Posición en el máster** (cita LIDR del workshop SDD): *"BMAD: demasiado complejo para arrancar, pero indudablemente muy potente"*. Es excelente cuando ya tenés SDD interiorizado y querés un sistema más ambicioso. Para empezar, OpenSpec gana.

> ⚠ Si vas a explorar BMAD, dedicale tiempo. La curva de aprendizaje es notable porque te exige pensar en términos de roles de equipo, no solo de tareas. Se recompensa cuando trabajás en equipo y querés que distintas personas ejecuten distintos roles.

---

## AWS Kiro

**Qué es**: un IDE propio de AWS (basado en VS Code) con SDD integrado. Anunciado en 2025, se posiciona como "el IDE oficial para Spec-Driven Development".

**Limitaciones que lo descartan para el máster**:

-   **Locked-in al IDE**. No podés usar Cursor, Claude Code o el editor que prefieras.
    
-   **Atado a modelos Claude vía Bedrock**. Sin opción de GPT-5.2 o Gemini 3 directos.
    
-   **Producto comercial AWS**. Coste de licencia y dependencia de cuenta AWS.
    

La propia documentación de OpenSpec lo describe en su comparativa: *"Powerful but you're locked into their IDE and limited to Claude models. OpenSpec works with the tools you already use"*.

> ⚠ Mencionar Kiro en CV o conversaciones de equipo está bien, pero pocas empresas hispanohablantes lo están adoptando. La barrera de entrada (IDE propio + AWS) es alta.

---

## Tessl Specs

**Qué es**: plataforma SaaS comercial con SDD como propuesta core. Específicamente diseñada para equipos enterprise que quieren specs como producto, con dashboards, métricas y governance centralizada.

**Por qué no está en el máster**:

-   **Comercial**. Pricing dirigido a empresas, no a developers individuales.
    
-   **Closed-source**. No podés inspeccionar cómo funciona internamente.
    
-   **Aún temprano**. Tracción menor en la comunidad (vs. OpenSpec o spec-kit).
    

Es una herramienta legítima — vale la pena conocer su existencia — pero no es la opción correcta para aprender SDD desde cero.

---

## El stack LIDR: ai-specs y manual-SDD

LIDR mantiene dos repos públicos relacionados con SDD. Vale la pena entender la diferencia:

### `LIDR-academy/ai-specs`

-   **Filosofía**: convenciones encima de OpenSpec.
    
-   **Estructura**: `ai-specs/specs/`, `ai-specs/.commands/`, `ai-specs/.agents/`, `ai-specs/changes/`.
    
-   **Comandos propios**: `/enrich-us` (enriquece user stories), `/plan-backend-ticket`, `/plan-frontend-ticket`, `/develop-backend`, `/develop-frontend`.
    
-   **Multi-copiloto**: `AGENTS.md`, `CLAUDE.md`, `codex.md`, `GEMINI.md` apuntan al mismo `base-standards.mdc` por symlink.
    
-   **Recomendación oficial del repo**: *"highly recommended to be used along with Spec-Driven Development frameworks like OpenSpec"*.
    

### `LIDR-academy/manual-SDD`

-   **Filosofía**: skills-first, sin OpenSpec.
    
-   **Creador**: Javier Vargas (Head of AI @ Mapal), ponente del Workshop SDD junto con Álvaro Moya.
    
-   **Estructura**: `ai-specs/skills/` con archivos `SKILL.md` invocables como skills de Claude Code. Ejemplos: `enrich-user-story/SKILL.md`, `write-pr-report/SKILL.md`.
    
-   **Cuándo usarlo**: cuando tu equipo no quiere la dependencia de OpenSpec o ya tiene su propio gestor de specs.
    

> 💡 **El máster usa OpenSpec con las convenciones de** `ai-specs` **como punto de partida**, pero las specs concretas y las plantillas las generamos sobre el proyecto del curso. No vas a copiar literalmente `ai-specs` al starter kit; vas a aprender los principios y aplicarlos.

---

## La filosofía brownfield-first (importante)

Una de las decisiones más fuertes de OpenSpec — y por la que encaja con el máster — es priorizar **brownfield** (sistemas existentes que evolucionan) sobre **greenfield** (proyectos nuevos).

¿Por qué importa?

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a0c3db33-eec0-43a8-9ef1-68d710579252/f6c8296a9dec26e7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

La mayoría del trabajo profesional es brownfield. Empresas con startups que crecen, productos que iteran, refactors continuos. Greenfield es la excepción, no la regla. El código que vas a escribir en tu carrera es mayoritariamente código que modifica código existente, no código nuevo. SDD útil tiene que asumir eso.

---

## El concepto delta spec (preview)

Esta es la innovación pedagógica más importante de OpenSpec, y la verás en detalle en la página siguiente. La idea en una línea:

> Un `change` no contiene la spec completa del sistema. Contiene **el diff** que aplica sobre la spec viva.

Ejemplo conceptual:

```
## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST require a second factor during login.

#### Scenario: OTP required
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
```

Cuando ese cambio se archiva, el `Requirement: Two-Factor Authentication` se mueve a `openspec/specs/auth/spec.md` y queda como spec viva. Los próximos cambios ven 2FA como una capacidad existente del sistema y pueden modificarla, no reinventarla.

Es el equivalente a un commit en Git, pero para requisitos en lugar de código. Es lo que permite a OpenSpec mantener specs útiles sin que se vuelvan documentos kilométricos imposibles de revisar.
