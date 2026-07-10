# 📄 Anatomía de OpenSpec 🔴 — 16 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 16 min

> Lección densa. Después de esta sabes instalar OpenSpec, entender su estructura de carpetas, escribir un delta spec y ejecutar el flujo `propose → apply → archive`. Esto es el grueso de lo que necesitás operativamente.

---

## Instalación y prerequisitos

OpenSpec se instala como CLI global. Requiere **Node.js 20.19.0 o superior**.

```
# Verificá tu Node
node -v   # debe ser >= 20.19.0

# Instalación global con npm
npm install -g @fission-ai/openspec

# Verificación
openspec --version
```

Funciona también con `pnpm`, `yarn`, `bun` y Nix. La docs oficial cubre las variantes (`https://github.com/Fission-AI/OpenSpec/blob/main/docs/installation.md`).

> ⚠ **Telemetría**. OpenSpec envía estadísticas anónimas (nombres de comandos y versión, sin argumentos ni paths). Se desactiva con `export OPENSPEC_TELEMETRY=0` o `export DO_NOT_TRACK=1`. En CI se desactiva automáticamente.

> 📹 **Video recomendado** — Antes de seguir leyendo, si preferís ver el flujo en acción, mirá *"OpenSpec Changes Everything - No More Vibe Coding (Full Tutorial)"* (Nathan Sebhastian, 12:35, inglés). Recorre `propose → apply → archive` sobre un proyecto pequeño en menos de 13 minutos. Es la forma más rápida de tener intuición visual de OpenSpec antes de leer la lección completa.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 12:35
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

## `openspec init`: qué pasa al inicializar

Dentro de un proyecto existente:

```
cd my-project
openspec init
```

El wizard te pregunta qué herramientas usás (Claude Code, Cursor, Codex, etc.) y crea:

```diagram
my-project/
├── openspec/
│   ├── project.md           # contexto del proyecto (stack, convenciones)
│   ├── changes/             # propuestas activas
│   └── specs/               # specs vivas (vacías al inicio)
├── .claude/
│   └── skills/              # slash commands para Claude Code
├── .cursor/
│   └── rules/ | skills/     # configuración para Cursor
└── .github/
    └── prompts/             # prompts para GitHub Copilot (IDE only)
```

Solo se crean las carpetas de las herramientas que seleccionaste. OpenSpec auto-detecta `.claude/`, `.cursor/`, etc., si ya existen.

> 💡 **Sobre** `AGENTS.md` **y** `CLAUDE.md`. En S1 vendimos [AGENTS.md](http://agents.md/) como estándar de facto. Desde **OpenSpec 1.0** (release de la versión estable), esos archivos **ya no se generan automáticamente**. Las reglas se distribuyen a `.claude/skills/`, `.cursor/`, `.github/prompts/`, etc., directamente. **Esto NO contradice S1**: el contexto sigue siendo curado y vive en archivos versionados. Solo cambia *dónde* vive. Si necesitas un [AGENTS.md](http://agents.md/) raíz para otro propósito, lo creas tú a mano y referencia las skills de OpenSpec.

---

## Profile `core` vs. `expanded`

OpenSpec ofrece dos perfiles de workflow:

### Profile `core` (default)

Tres comandos. La opción recomendada para empezar.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/96f13472-f8aa-422b-94d1-b590febe496a/bbbc7f17c8803301.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Profile `expanded`

Para flujos más controlados con más artefactos intermedios. Se activa con `openspec config profile`.

![image.png](https://media1-production-mightynetworks.imgix.net/asset/132ef282-abf7-437d-a445-7c3b85a95e19/a962f467aec5496d.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Recomendación del máster**: empezá con `core`. Cambiá a `expanded` solo cuando necesites el control extra (típicamente en proyectos con varios devs trabajando sobre el mismo repo).

---

## La estructura de un `change`

Cuando ejecutas `/opsx:propose add-refresh-tokens`, OpenSpec genera:

```diagram
openspec/changes/add-refresh-tokens/
├── proposal.md      # por qué y qué
├── specs/           # delta specs (qué cambia en las capabilities)
│   └── auth/
│       └── spec.md  # delta spec del sistema de auth
├── design.md        # cómo (decisiones técnicas)
└── tasks.md         # checklist de implementación
```

Cada archivo tiene una función específica:

### `proposal.md`

El contexto narrativo. Por qué se hace este cambio, qué problema resuelve, qué se incluye y qué queda fuera. Lo lee tanto la IA como el reviewer humano. Estructura típica:

```
## Why
## What Changes
## Capabilities
### New Capabilities
### Modified Capabilities
## Impact
```

### `specs/<capability>/spec.md`

El **delta spec**: el corazón de OpenSpec. Describe el comportamiento esperado del sistema usando secciones `ADDED`, `MODIFIED`, `REMOVED` y formato BDD.

```
# Delta for Auth
## ADDED Requirements
### Requirement: Refresh token rotation
#### Scenario: Successful refresh
#### Scenario: Reuse of invalidated refresh token
## MODIFIED Requirements
### Requirement: Access token lifetime
#### Scenario: Expired access token
```

> 💡 **Por qué BDD aquí**. Los `Scenario:` con GIVEN/WHEN/THEN son intencionalmente sintaxis BDD. La IA puede traducir cada scenario directamente a un test de integración. Si tu test runner habla Cucumber/Gherkin, mejor todavía. Si no, los scenarios siguen siendo legibles para revisores humanos.

### `design.md`

Las decisiones técnicas. Aquí va el "cómo": qué patrones usar, qué librerías, qué refactors implícitos hace falta hacer. Es el lugar donde se evita que la IA improvise arquitectura.

```
## Context
## Goals / Non-Goals
## Decisions
## Risks / Trade-offs
## Migration Plan
## Open Questions
```

### `tasks.md`

La checklist accionable. Cada task es lo suficientemente pequeña como para ejecutarse en un solo turno de IA.

```
# Tasks

## Backend

- [ ] 1.1 Create migration for auth_refresh_tokens table
- [ ] 1.2 Add RefreshToken model with hash methods
- [ ] 1.3 Modify access token TTL to 15min in config
- [ ] 1.4 Add POST /auth/refresh controller
- [ ] 1.5 Add token rotation logic with reuse detection
- [ ] 2.1 Tests for happy path
- [ ] 2.2 Tests for reuse detection
- [ ] 2.3 Tests for expired refresh token

## Frontend

- [ ] 3.1 Configure axios interceptor for 401 handling
- [ ] 3.2 Add refresh logic with mutex (avoid duplicate refreshes)
- [ ] 3.3 Update AuthContext to handle token rotation
```

---

## El workflow `propose → apply → archive`

### Paso 1: `/opsx:propose`

```
You: /opsx:propose add-refresh-tokens

AI:  Created openspec/changes/add-refresh-tokens/
     ✓ proposal.md
     ✓ specs/auth/spec.md
     ✓ design.md
     ✓ tasks.md

     Ready for implementation. Run /opsx:apply.
```

**Punto de revisión humano**. Antes de avanzar, abrís los 4 archivos y los revisás. Si la IA inventó scope que no querías, lo recortás. Si faltan scenarios, los agregás. Esta revisión es donde SDD ahorra horas de bugs futuros.

### Paso 2: `/opsx:apply`

```
You: /opsx:apply

AI:  Implementing tasks for add-refresh-tokens...
     ✓ 1.1 Migration created
     ✓ 1.2 RefreshToken model added
     ✓ 1.3 Config updated
     ✓ 1.4 Controller created
     ✓ 1.5 Rotation logic with reuse detection
     ✓ 2.1 Tests for happy path (5/5 passing)
     ✓ 2.2 Tests for reuse detection (3/3 passing)
     ✓ 2.3 Tests for expired refresh token (2/2 passing)
     ✓ 3.1-3.3 Frontend tasks complete

     All tasks complete. Run /opsx:archive when ready.
```

La IA ejecuta los tasks en orden, escribiendo código y tests. Si un test falla, intenta corregirlo (con tu supervisión). Si un task no está claro, te pregunta antes de improvisar.

### Paso 3: `/opsx:archive`

```
You: /opsx:archive

AI:  Archiving add-refresh-tokens...
     ✓ Merged specs into openspec/specs/auth/spec.md
     ✓ Moved to openspec/changes/archive/2026-04-28-add-refresh-tokens/

     Done! Ready for the next feature.
```

Los delta specs (`ADDED`, `MODIFIED`, `REMOVED`) se aplican a la spec viva en `openspec/specs/auth/spec.md`. El `change` completo se mueve a `archive/`. La historia queda en Git.

> 💡 **Importante**: archivar **no es opcional**. Si dejás changes activos sin archivar, las próximas propuestas no tendrán el contexto correcto de qué ya está implementado y qué no. Archivá apenas el cambio esté mergeado a main.

---

## Comandos CLI complementarios

Además de los slash commands, OpenSpec expone una CLI:

```
openspec list                    # Lista changes activos
openspec show add-refresh-tokens # Detalles de un change
openspec validate <change>       # Valida formato del spec
openspec view                    # Dashboard interactivo TUI
```

Útiles cuando trabajás en terminal sin abrir Claude Code, o para CI.

---

## Recomendaciones operativas (de la docs oficial)

### Modelos recomendados

OpenSpec funciona mejor con modelos de alto razonamiento. La docs oficial recomienda:

-   **Claude Opus 4.5** o superior (Opus 4.6 / 4.7 disponibles a abril 2026)
    
-   **GPT-5.2** o superior
    

Modelos más pequeños (Haiku, GPT-5 Mini) funcionan para tareas simples pero pierden calidad en specs complejas.

### Higiene de contexto

Conexión directa con S1 (regla 50/70/90):

> *"OpenSpec benefits from a clean context window. Clear your context before starting implementation and maintain good context hygiene throughout your session."*

Práctica recomendada:

1.  **Antes de** `/opsx:propose`: contexto vacío.
    
2.  **Antes de** `/opsx:apply`: si el contexto está al 50%+, hacé `/clear` primero. La IA releerá la propuesta del disco, no necesita la conversación previa.
    
3.  **Antes de** `/opsx:archive`: igual.
    

---

## Limitaciones conocidas

-   **Anthropic NO soporta nativamente** el patrón [AGENTS.md](http://agents.md/) (issue Anthropic #6235, tema cubierto en S1). OpenSpec usa `.claude/skills/` directamente como workaround.
    
-   **GitHub Copilot CLI** no soporta custom prompt files. Solo funciona con Copilot dentro de IDE (VS Code, JetBrains).
    
-   **Concurrent changes**: si dos devs hacen `/opsx:propose` a la vez sobre la misma capability, las delta specs pueden chocar al archivar. Coordinar en equipo igual que coordinás merges.
    
-   **Telemetría on by default**: ya cubierta arriba.
    
-   **Migración legacy** `/openspec:*` **→** `/opsx:*`: en proyectos creados antes de OpenSpec 1.0, los slash commands tenían el prefijo `/openspec:`. Si actualizás un proyecto viejo, tenés que correr `openspec init` de nuevo y los comandos cambian. La estructura de archivos es compatible.
