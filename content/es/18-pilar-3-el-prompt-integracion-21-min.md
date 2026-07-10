# 📄  Pilar 3 — El Prompt + Integración 🔴 — 21 min | AI-Driven Delivery

⌛Tiempo estimado: 21 min

> En esta última lección cubrimos el pilar 3 — El Prompt — y luego cerramos integrando los tres pilares en un framework único de decisión que vas a aplicar en la sesión en vivo. Vas a ver por qué el prompt engineering clásico está siendo reclasificado, no eliminado, y cómo encajan herramienta + contexto + prompt en una arquitectura coherente.

---

## Parte 1 — El pilar Prompt

### El malentendido del "prompt engineering"

Durante 2023–2024, "prompt engineering" se vendió como la habilidad mágica de escribir el conjuro perfecto. Surgieron cursos, plantillas, y la creencia de que añadir *"think step by step"* o *"you are an expert software engineer"* multiplicaba la calidad del output.

En 2026, **eso ya no es verdad** — al menos no para coding con modelos razonadores. La razón: los modelos top (Claude Opus 4.7, GPT-5.4, Gemini 3.1 Pro Deep Think) tienen **adaptive thinking budget**: deciden por sí mismos cuánto razonar antes de responder. Decirles "piensa paso a paso" puede ser ruido o, peor, contraproducente.

Anthropic lo dice explícitamente en su guía oficial 2026: *"el mejor prompt no es el más largo ni el más complejo. Es el que logra tu objetivo de forma fiable con la mínima estructura necesaria."*

### Qué del prompt engineering clásico sigue vigente

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e96ad7b9-8256-4250-8ef4-56560f3e8b8a/81501ab79b08f0c5.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### La anatomía de un prompt técnico 2026

Convergencia de Anthropic best-practices, OpenAI Cookbook y Codex [AGENTS.md](http://agents.md/) guidance:

```
1. CONTEXTO/ROLE  (corto, solo si añade restricciones reales)
   "Estás trabajando en un backend FastAPI con SQLModel."

2. OBJETIVO / TAREA  (orientado a outcome, no a steps)
   "Implementa el endpoint POST /items que cree un Item asociado al usuario actual."

3. CRITERIOS DE ÉXITO EXPLÍCITOS  ← lo más alto-leverage según Anthropic
   "Sabes que terminaste cuando:
    - El endpoint pasa los 3 tests de tests/test_items.py
    - Mantiene la convención repository-pattern del resto del código
    - No introduce nuevas dependencias"

4. RESTRICCIONES / ANTIPATTERNS  (qué NO hacer)
   "No metas lógica de negocio en el archivo de rutas.
    No introduzcas migraciones nuevas — el modelo Item ya existe."

5. RECURSOS / CONTEXTO  (referencias, no copy-paste)
   "Mira services/users.py como ejemplo del patrón a seguir.
    Las convenciones generales están en AGENTS.md."

6. FORMATO DE SALIDA  (cuando aplique)
   "Genera un PR con título 'feat: add POST /items endpoint',
    descripción que liste los archivos tocados, y commits atómicos."

7. CLARIFICACIÓN  (siempre que el espacio de soluciones sea ambiguo)
   "Si tienes dudas sobre el shape del payload, pregunta antes de implementar."
```

> 💡 **El cambio más alto-leverage según Anthropic**: añadir **criterios de éxito explícitos**. La diferencia entre "implementa el endpoint" y "implementa el endpoint que hace pasar estos 3 tests" es enorme en first-pass acceptance rate.

### Anti-patterns documentados

1.  **Vaguedad** — *"hazme un dashboard"*. Output genérico, mucho ida y vuelta. Cuesta más turnos que escribir bien el prompt una vez.
    
2.  **Sobre-especificación micro** — listar instrucciones step-by-step para algo trivial. Los razonadores **pierden recall** cuando los limitas en exceso (Anthropic notó esto explícitamente en Opus 4.7: instrucciones tipo "be conservative" reducen recall reportado pese a la misma profundidad).
    
3.  **Megaprompt gigantesco** — meter convenciones, código, ejemplos, restricciones, todo en cada turn. Confunde, consume contexto. **Anti-principio Anthropic**: *"the best prompt isn't the longest or most complex"*.
    
4.  **No proporcionar criterios de éxito** — el modelo entrega lo que cree que tú quieres, no lo que pasa los tests. Resultado: PRs que "parecen bien" pero fallan en CI.
    
5.  **Mezclar varias tareas en un solo turno** — divide en sub-prompts encadenados. Si necesitas hacer A, luego B basado en el resultado de A, no metas todo junto.
    
6.  **Re-pegar inline el** [**AGENTS.md/CLAUDE.md**](http://agents.md/CLAUDE.md) **en cada prompt** — ya está cargado por la herramienta. Solo añade ruido.
    

### Patrones específicos de coding (en orden de impacto 2026)

### 1\. Spec-driven development (preview de S2)

Escribir la **especificación primero** en markdown — qué se construye, qué inputs/outputs, qué edge cases — y solo entonces pedirle al agente que implemente. Es la evolución del "vibe coding" según Karpathy y GitHub (spec-kit, ago 2025). Lo cubrimos en profundidad en S2; aquí solo lo señalamos como el patrón más alto-leverage.

### 2\. Plan-then-execute

`/plan` o Plan Mode: pides al agente que NO toque estado, solo lea y proponga un plan; tú revisas; ejecuta con modelo más barato.

-   Nativo en Claude Code (`/plan`), Cline (Plan vs Act mode).
    
-   Patrón emergente en Cursor y Windsurf.
    
-   Permite usar Opus 4.7 para planificar (caro pero brillante) y Sonnet 4.6 para ejecutar (más barato).
    

### 3\. Test-first prompting

Pedir tests primero, luego implementación, luego correr tests, iterar hasta verde.

```
"Antes de implementar el endpoint, escribe los tests que validan
los criterios de éxito. Luego implementa hasta que todos pasen."
```

Aider lo soporta nativamente; Claude Code lo formaliza con el patrón Writer/Reviewer.

### 4\. Refactor con anclas

El antipattern del "refactor de un shot 3000 LoC" produce regresiones masivas. El patrón correcto:

1.  **Mapa primero**: pedir al agente que identifique símbolos, dependencias y riesgos, sin tocar código.
    
2.  **Aprobación del mapa** por el humano.
    
3.  **Ejecución en pasos reversibles** con commits intermedios.
    

### 5\. Critic loops / self-review

Usar un segundo modelo (a veces el mismo modelo en sesión separada) para revisar la salida del primero. Anthropic documenta el patrón Writer/Reviewer; circula entre seniors como *"Claude Code finds bugs that another Claude Code introduced"*.

### Investigación reciente sobre prompting con razonadores

-   **arXiv 2506.04210** — *"Does Thinking More always Help?"*: extender thinking con "wait, rethink" funciona, pero **multiple independent reasoning paths + majority vote** supera 20% al thinking más largo. **Implicación**: paralelizar (sub-agents independientes) supera a "pensar más fuerte".
    
-   **arXiv 2510.21413** — *Context Engineering for AI Agents in Open-Source Software* (oct 2025): análisis empírico que confirma que las decisiones de contexto y harness explican mucha más varianza que el prompt en sí.
    
-   **OpenAI Cookbook 2026**: guía explícita de NO añadir CoT a GPT-5.x; usar `effort` levels (low/medium/high) como dial principal.
    

### Tu kit de prompting

Si tuvieras que llevarte cinco prácticas operativas de esta sección:

1.  **Empieza por el outcome y los criterios de éxito**, no por los steps. Deja que el modelo decida cómo.
    
2.  **Restricciones explícitas** ("no introduzcas dependencias nuevas", "mantén el patrón X"). Las restricciones reducen el espacio de soluciones malas.
    
3.  **Pide clarificación si hay ambigüedad**: añade *"si tienes dudas sobre X, pregunta antes de implementar"*. Te ahorra rework.
    
4.  **Para razonadores: prompt corto y directo**. Si te encuentras escribiendo un megaprompt, párate y rebaja.
    
5.  **Probar 0-shot antes de few-shot**. La mitad de las veces los ejemplos sobran.
    

---

## Parte 2 — Integración: cómo se complementan los 3 pilares

### El framework de decisión combinado

Ya tienes los tres pilares por separado. Ahora viene la pregunta operativa: **¿cómo decides simultáneamente herramienta + contexto + prompt para una tarea concreta?**

Este es el árbol de decisión que recomiendo adoptar:

```diagram
Paso 1: CARACTERIZA LA TAREA
├── ¿Toca un solo archivo o varios?
├── ¿Necesita ejecutar comandos (build, tests, migrations)?
├── ¿Codebase conocido o exploración?
└── ¿Time-budget alto o bajo?

Paso 2: ELIGE HERRAMIENTA (Pilar 1)
├── Tarea pequeña / inline       → IDE-integrated en modo completion
├── Tarea multi-archivo / refactor → CLI agentic o IDE-integrated agentic
└── Tarea async / paralelizable  → Cloud autonomous

Paso 3: PREPARA CONTEXTO (Pilar 2)
├── ¿AGENTS.md actualizado?
├── ¿Qué archivos meto explícitamente vs dejo descubrir?
├── ¿Necesito sub-agent para exploración previa?
└── ¿Estoy bajo el ~50% de la ventana?

Paso 4: ESCRIBE EL PROMPT (Pilar 3)
├── Objetivo claro orientado a outcome
├── Criterios de éxito explícitos
├── Restricciones / antipatterns
├── Referencias a docs/archivos clave
└── "Pregunta si hay ambigüedad"

Paso 5: EJECUTA Y REVISA
├── Si es plan-driven: revisa plan antes de aprobar ejecución
└── Si es test-first: verifica tests antes de implementación
```

### Casos canónicos: aplicación combinada

### Caso A — Refactor grande (mover lógica de archivos de rutas a services)

> **Aplicado al proyecto del máster**: el repo del máster tiene la lógica directamente en archivos de rutas (mencionado en el `REPORT.md`). Es exactamente este caso.

-   **Pilar 1 — Herramienta**: CLI agentic (Claude Code o Cursor Composer). Razón: refactor multi-archivo, necesidad de ejecutar tests entre pasos.
    
-   **Pilar 2 — Contexto**: `AGENTS.md` con la convención repository-pattern. Sub-agent que explore primero qué endpoints tienen lógica inline. Mapa de dependencias antes de tocar.
    
-   **Pilar 3 — Prompt**: plan-then-execute. Primero `/plan`: "identifica todos los endpoints que tienen lógica de negocio inline y propón un orden de migración". Luego ejecución por bloques con commits atómicos.
    

### Caso B — Feature greenfield (añadir endpoint de notificaciones)

-   **Pilar 1**: IDE-integrated agentic (Cursor Composer / Claude Code). Cualquiera funciona.
    
-   **Pilar 2**: [AGENTS.md](http://agents.md/) + `services/users.py` como referencia de patrón. Sin sub-agent (tarea contenida).
    
-   **Pilar 3**: spec-driven (preview S2) o test-first. Criterios de éxito = tests que pasan + endpoint documentado en OpenAPI.
    

### Caso C — Debugging (un test falla intermitentemente)

-   **Pilar 1**: CLI agentic con acceso a Bash para correr tests repetidamente.
    
-   **Pilar 2**: el test que falla + el código bajo test + logs recientes. **NO** meter todo el repo. Sub-agent si la traza requiere explorar histórico.
    
-   **Pilar 3**: prompt con hipótesis explícitas ("¿es race condition? ¿es estado compartido?"). Criterio de éxito = el test pasa 10 veces seguidas.
    

### Caso D — Exploración de codebase desconocido

-   **Pilar 1**: CLI agentic con buen agentic search (Claude Code).
    
-   **Pilar 2**: **sub-agent explorador** crítico aquí. La conversación de "¿dónde está X? léeme Y" debe vivir en sub-agent, NO en thread principal.
    
-   **Pilar 3**: prompt orientado a output ("genera un mapa de los endpoints relacionados con auth y dame un resumen de 1 párrafo").
    

### Caso E — Code review

-   **Pilar 1**: especializado (Copilot Code Review, Bugbot) o agente con prompt de review.
    
-   **Pilar 2**: el diff + [AGENTS.md](http://agents.md/) con convenciones del proyecto. NO meter todo el repo.
    
-   **Pilar 3**: prompt con checklist explícita: convenciones, tests, edge cases, performance, seguridad. Reglas en positivo y negativo.
    

### Anti-patrones combinados (los más caros de todos)

1.  **Megaprompt + todo el repo en contexto + modelo top**: confundir "más es mejor" con efectividad. Resultado: tokens caros, calidad baja, context rot inmediato.
    
2.  **Herramienta agentic potente + sin** [**AGENTS.md**](http://agents.md/) **+ prompt vago**: el agente improvisa convenciones que no son las tuyas. Genera código inconsistente con el resto del proyecto.
    
3.  **Cambiar de herramienta cada semana** mientras el contexto y los prompts no mejoran: la varianza de resultados está en pilares 2 y 3, no en pilar 1.
    
4.  **Test-first prompt con cloud autonomous** sin haber probado primero local: te encuentras 30 minutos después con un PR que falla CI por algo que habrías visto en el primer turno.
    

### El meta-insight de los 3 pilares

Si los pilares operan en el mismo orden de magnitud de impacto, la pregunta práctica es: **¿en cuál estoy más débil ahora mismo?**

-   Si tu output con IA es **inconsistente con las convenciones de tu proyecto** → tu cuello de botella está en pilar 2 (contexto). Mejora [AGENTS.md](http://agents.md/).
    
-   Si los outputs son **correctos pero no resuelven la tarea real** → tu cuello de botella está en pilar 3 (prompt). Define mejor los criterios de éxito.
    
-   Si la herramienta se siente **inadecuada estructuralmente** (mal modo de trabajo) → tu cuello de botella está en pilar 1 (herramienta). Reconsidera categoría.
    

La mayoría de los seniors entran al máster pensando que su cuello de botella es pilar 1 (la herramienta). La mayoría descubre durante el máster que era pilar 2.

---

## Parte 3 — Glosario y cierre

### Glosario rápido (referencia para la sesión en vivo)

-   **Harness / Scaffolding**: el andamiaje que rodea al modelo (tools, instrucciones, sensores, restricciones). El "coche" que rodea al "motor" (modelo).
    
-   **Context Engineering**: disciplina de gestionar qué información tiene el modelo en su ventana en cada momento.
    
-   **Context Rot**: degradación de calidad observada al aumentar tokens en contexto, antes de llenar la ventana.
    
-   [**AGENTS.md**](http://agents.md/): archivo de contexto persistente, estándar de facto desde 2025–2026, soportado por la mayoría de herramientas.
    
-   **Sub-agent**: agente con su propia ventana de contexto, spawneado para una subtarea, cuya conclusión vuelve al thread principal.
    
-   **Plan Mode**: modo donde el agente NO toca estado, solo lee y propone plan. Aprobación humana antes de ejecutar.
    
-   **Adaptive thinking**: capacidad del modelo razonador de decidir cuánto razonar antes de responder, en lugar de aplicar CoT fijo.
    

### Qué traer mentalmente a la sesión en vivo

1.  **El framework de los 3 pilares interiorizado** — herramienta, contexto, prompt — como capas co-iguales, no jerárquicas.
    
2.  **El árbol de decisión** que viste en la parte 2 de esta lección: caracterizar tarea → elegir herramienta → preparar contexto → escribir prompt → ejecutar.
    
3.  **La regla de los umbrales de contexto**: 50% empieza degradación, 70% compactar, 90% reset.
    
4.  **La idea de que "modelo no es el cuello de botella"** — el harness, el contexto y el prompt explican más varianza que la versión del modelo.
    

> **Nota final**: en S2 vamos a profundizar en el patrón más alto-leverage que solo mencionamos aquí — *Spec Driven Development*. Es la evolución natural del pilar PROMPT y la mejor inversión que un senior dev puede hacer en 2026. Pero lo que aprendiste aquí es la base sin la cual S2 no funciona.

> 📚 **Recursos para profundizar**: todos los recursos del asíncrono (lecturas, papers, documentación oficial, referencias por pilar) están unificados en la **lección5 — Recursos adicionales**. Allí encontrarás material organizado por pilar para profundizar después de la sesión en vivo.
