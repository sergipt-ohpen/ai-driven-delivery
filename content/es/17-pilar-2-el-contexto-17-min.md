# 📄  Pilar 2 — El Contexto 🔴 — 17 min | AI-Driven Delivery

⌛Tiempo estimado: 17 min

> En 2026, el contexto **es** el verdadero cuello de botella del trabajo con copilotos de IA. Esta lección te da la disciplina que la industria llama *context engineering* — qué meter en la ventana, qué dejar fuera, cómo organizarlo y cómo evitar el deterioro silencioso de la calidad cuando el contexto crece.

## El malentendido fundacional

Cuando los seniors empiezan a trabajar con copilotos, casi todos pasan por la misma fase ingenua:

> *"El modelo tiene 1M tokens de contexto. Le meto todo el repo, los docs, los issues abiertos, los logs de los últimos despliegues, mi histórico de Slack del último mes... y que se las apañe."*

Suena razonable. Es exactamente lo contrario de lo que funciona.

**La ventana de 1M tokens es un techo, no un objetivo.** Lo demuestra la investigación más relevante de 2025 sobre LLMs: la calidad **degrada con el tamaño del contexto**, mucho antes de llenarlo, **incluso en tareas triviales**.

## Context rot: el hallazgo que cambia las prácticas

En julio de 2025, Chroma Research publicó *Context Rot: How Increasing Input Tokens Impacts LLM Performance*. Evaluaron **18 modelos frontier** (GPT-4.1, Claude 4.x, Gemini 2.5, Qwen3, Llama 4...) en tareas controladas extendiendo el contexto progresivamente. Resultados:

-   **Todos los modelos degradan** al aumentar tokens, sin excepciones.
    
-   La degradación aparece **mucho antes de llenar la ventana** — en algunos modelos a partir del 30-50% de uso.
    
-   La degradación **no es uniforme**: depende de la similitud entre la pregunta y el "needle" buscado, de la presencia de distractores y de la estructura del haystack.
    
-   En tareas con razonamiento (no solo recuperación literal), la caída es **aún más severa**.
    

A esto se suma la literatura previa que sigue siendo válida en 2026:

-   **Lost in the Middle** (Liu et al., Stanford, TACL 2024): los LLMs prestan más atención al inicio y al final del contexto. Información clave en el medio puede perder hasta **30+ puntos de precisión**.
    
-   **NoLiMa** (Adobe, febrero 2025): cuando la pregunta requiere inferencia semántica (no coincidencia léxica), la degradación con contexto largo es severa incluso en modelos diseñados para long-context.
    
-   **LOCA-bench** (HKUST-NLP, febrero 2026): estrategias de gestión de contexto **suben tasa de éxito significativamente más que upgrades de modelo**.
    

### Los tres mecanismos que producen el rot

Síntesis de la literatura (Chroma, Morph engineering, Anthropic docs):

1.  **Lost in the middle**: la atención se sesga hacia los extremos del contexto.
    
2.  **Attention dilution**: la complejidad cuadrática del attention significa que 100k tokens producen 10.000M relaciones por par. Más tokens = más ruido a filtrar.
    
3.  **Distractor interference**: contenido similar pero irrelevante (otro fragmento de código que se parece pero no es) confunde al modelo más que el ruido aleatorio.
    

### Reglas prácticas observadas

Aunque los proveedores no publican umbrales oficiales, el consenso senior 2026 (Anthropic best-practices, blogs de Cursor, Claude Code system prompts) converge en estas reglas heurísticas:

-   A partir del **~50% de la ventana**, la performance empieza a degradar de forma notable.
    
-   A partir del **~70%**, conviene compactar (`/compact` en Claude Code) o iniciar una sesión nueva.
    
-   A partir del **~90%**, los agentes empiezan a repetir trabajo, perder coherencia y cometer errores silenciosos.
    

> 💡 **Implicación operativa**: la métrica que importa **NO es** "cuántos tokens caben en mi ventana", sino "cuán denso de información útil es lo que tengo en contexto **ahora mismo**". El contexto se cura activamente, no se acumula pasivamente.

## Tipos de contexto: qué meter, qué dejar fuera

Para tomar decisiones conscientes hay que distinguir **qué tipos de contexto** existen. En 2026 esta es la taxonomía que más circula entre seniors:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/ebf89709-269f-4123-a428-f7367bde79f4/569e1200cafaa525.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Anti-patrón**: meter código de "por si acaso". Cada archivo no relevante es ruido que distrae al modelo y consume budget. Si no estás 80% seguro de que el modelo necesita un archivo, **no lo metas** — déjalo descubrirlo via Grep/Read si lo necesita.

## Mecanismos de contexto persistente: el archivo que el agente lee siempre

Casi todas las herramientas modernas soportan algún tipo de **archivo de contexto persistente** que el agente lee al inicio de cada sesión. Es el equivalente a `.editorconfig` o `.eslintrc` para agentes.

### El estándar de facto: [AGENTS.md](http://agents.md/)

Lanzado por OpenAI/Codex en agosto de 2025, donado a la **Linux Foundation (Agentic AI Foundation)** en diciembre de 2025 junto con MCP. En menos de un año:

-   **\>60.000 proyectos open source** lo adoptaron.
    
-   Soportado nativamente por **Cursor, Codex CLI, Devin, GitHub Copilot, VS Code, Gemini CLI, Jules, Windsurf, Cline, Amp, Factory** y más.
    
-   Especificación abierta y multi-vendor.
    

Estructura típica:

```
# AGENTS.md

## Project overview
Aplicación full-stack: FastAPI (backend) + React (frontend) + PostgreSQL.
Dockerizada. Todo el stack se levanta con `docker compose up`.

## Stack y versiones
- Python 3.12, FastAPI 0.115, SQLModel, Alembic
- TypeScript 5.x, React 19, TanStack Router/Query, Bun
- PostgreSQL 16
- Traefik (reverse proxy)

## Convenciones
- Backend: lógica de negocio en `services/`, NO en archivos de rutas.
- Frontend: cliente API auto-generado desde OpenAPI — NO escribir fetch a mano.
- Tests: pytest backend, vitest frontend. Test-first para endpoints nuevos.
- Migraciones: Alembic con autogenerate, revisar siempre antes de aplicar.

## Comandos clave
- `just dev`: levantar todo el stack en local
- `just test`: correr toda la suite de tests
- `just lint`: ruff + ESLint + tipo-check

## Gotchas
- El repo viene con `.env` (no `.env.example`). Renombrar a `.env.example`
  antes de pushear cualquier cosa.
- Hot-reload del frontend requiere `compose.override.yml` activo.
- NO introducir dependencias nuevas sin justificarlas en el PR.
```

### Comparativa de mecanismos

![image.png](https://media1-production-mightynetworks.imgix.net/asset/0298ba33-594c-40a1-8be5-4735e06a570f/02fe4382c7538d93.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Patrón emergente 2026**: un solo `AGENTS.md` como **fuente única de verdad**, referenciado desde los archivos vendor-específicos. Ej.: `CLAUDE.md` consiste en una línea `@AGENTS.md` que importa el contenido. Así mantienes portabilidad multi-agente sin duplicar.

### Buenas prácticas en el contenido del archivo

Síntesis de Anthropic best-practices, alexop.dev, y el repo `claude-code-best-practice` de la comunidad:

1.  **Mínimo y de alta señal**: si pones obviedades, el modelo las ignora junto con lo importante. Empieza por una sección "Gotchas" — qué desviaciones del comportamiento por defecto debe conocer.
    
2.  **Comandos clave**, no toda la documentación. El modelo puede leer la doc al ejecutar `just --list`.
    
3.  **Convenciones** explícitas: "X SÍ, Y NO". Las reglas en negativo funcionan tan bien como las positivas.
    
4.  **Versionado**: stale instructions son peor que no-instructions. Si actualizas la versión de FastAPI, actualiza el archivo.
    
5.  **Hooks deterministas, no instrucciones**: si quieres que NUNCA se añada `Co-Authored-By: Claude`, ponlo en `settings.json` como hook, no en `AGENTS.md` como deseo. Lo que se puede automatizar no debe estar en lenguaje natural.
    

## Las 4 estrategias canónicas de context engineering

LangChain (Lance Martin) y Anthropic publicaron en 2025 el framework que se ha vuelto referencia. Cuatro verbos:

### 1\. Write — persistir fuera del contexto

Mueve información que no necesitas en este turno **a disco**. Que el agente la cargue cuando la necesite.

-   Notas de sesión en archivos `.md` que el agente puede leer luego.
    
-   Memorias semánticas (Cline Memory Bank, Cursor memories, Claude Code memory tools).
    
-   Resultados intermedios guardados como artefactos que se pueden referenciar por path.
    

### 2\. Select — elegir qué traer al contexto

Ante un repo grande, **no metas todo**. Selecciona dinámicamente.

-   **Agentic search**: el agente decide qué archivos leer (Grep/Glob/Read iterativos). Es el approach de Claude Code.
    
-   **Repository indexing semántico**: embeddings + tree-sitter (Cursor, Cline opcional). Más rápido pero introduce ruido por embeddings imperfectos.
    
-   **Tendencia 2026**: agentic search está ganando terreno sobre RAG estático para coding, porque retrieval con embeddings degrada cuando el código cambia rápido.
    

### 3\. Compress — resumir antes de continuar

Cuando el contexto se acerca al 70%, no continúes acumulando: **compacta**.

-   `/compact` en Claude Code: el agente resume la conversación a su esencia y arranca con menos overhead.
    
-   Auto-compaction nativa en Claude Code, Cursor, Cline.
    
-   Patrón manual: pídele al agente que escriba un resumen de "estado actual del trabajo + decisiones tomadas + siguiente paso" y arranca sesión nueva con ese resumen.
    

### 4\. Isolate — aislar contexto por subagente

La técnica más poderosa contra context rot en 2026: **subagentes con context window propio**.

-   **Claude Code sub-agents**: spawneas un agente especializado (ej. "explora qué archivos tocan auth") en su propio context aislado. La conversación verbosa se queda allí; solo la **conclusión** vuelve al main thread.
    
-   **Cursor Background Agents**: hasta 8 agentes en paralelo en clones del repo, cada uno con contexto propio.
    
-   **Git worktrees + agentes paralelos**: técnica manual equivalente — divides el trabajo en ramas, ejecutas un agente por rama, mergeas resultados.
    

> 💡 **Insight clave**: el sub-agent es la forma más efectiva de "escalar contexto" sin pagar el precio del rot. Si tu tarea principal cabría en 200k tokens **sin la exploración previa**, no metas la exploración en el mismo contexto: hazla en un sub-agent que devuelva solo el findings de 2k tokens.

## Ventanas de contexto actuales (snapshot abril 2026)

Confirmando lo que viste en el pre-curso, la convergencia ~1M tokens se mantiene:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/74ceb89d-176b-4686-8bd3-c546d4205a92/1a413d8ec70e1f4e.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ Recordatorio: estos son **techos físicos**, no objetivos. El context rot empieza mucho antes.

## Tu kit de context engineering

Si tuvieras que llevarte solo cinco prácticas operativas de esta lección:

1.  **Crea un** `AGENTS.md` **mínimo y de alta señal** en cada repo. Mantenlo bajo 200 líneas. Refresca cuando cambien convenciones o versiones.
    
2.  **Curaciona, no acumules**: cuando arrancas una tarea, decide conscientemente qué necesita el agente leer. Resiste la tentación de "por si acaso".
    
3.  **Usa sub-agents para subtareas costosas en contexto** (exploración de codebase, búsqueda de bugs, investigación de stack traces). La conversación verbosa NO debe vivir en el thread principal.
    
4.  **Compacta o reinicia cada 15-20 turnos** en una sesión agentic. La pérdida de coherencia es empíricamente notable a partir de ahí.
    
5.  **Trata el archivo de contexto persistente como código**: revisión por PR, versionado, tests (si tu equipo es serio, add un linter de `AGENTS.md`).
    

> 📚 **Recursos para profundizar en este pilar**: están unificados en la **lección 5 — Recursos adicionales**, en la sección "Pilar 2 — Contexto". Allí encontrarás las lecturas, papers de research y la spec oficial de [AGENTS.md](http://agents.md/).

> **Próxima lección**: pilar 3 — El Prompt. Vas a ver qué del prompt engineering clásico sigue vigente, qué quedó obsoleto con los modelos razonadores, y la anatomía de un prompt técnico que un senior dev escribiría en 2026 — y luego cómo se integra todo en un framework único de decisión.
