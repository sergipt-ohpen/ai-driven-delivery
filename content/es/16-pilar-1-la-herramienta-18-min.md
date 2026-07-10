# 📄  Pilar 1 — La Herramienta 🔴 — 18 min | AI-Driven Delivery

Tiempo estimado: 18 min

> En el pre-curso ya viste el ecosistema de asistentes y MCP. Aquí no vamos a repetir qué es Claude Code o qué es Cursor. Vamos al siguiente nivel: **cuándo elegir cada categoría, qué criterios usar y cómo evitar la trampa más común — pensar que "mejor modelo" significa "mejor herramienta"**.

## La pregunta correcta no es "¿qué herramienta uso?"

La pregunta correcta es: **"¿qué tipo de tarea voy a hacer y qué nivel de control humano necesito?"**. La herramienta cae como consecuencia. Si haces esto al revés (eliges herramienta primero y luego le buscas tareas), pasan dos cosas predecibles: usas mal la herramienta y achacas el mal resultado a la IA.

Esta lección te da el modelo mental para invertir el orden.

## Taxonomía 2026: cuatro categorías por modo de uso

Más allá del modelo subyacente, los copilotos se diferencian por **dónde viven y cómo se interactúa con ellos**. Estas son las cuatro categorías canónicas en 2026:

### Categoría A — IDE-integrated (visual + diff inline)

Vive dentro de tu editor (VS Code, JetBrains, Xcode, Neovim). Su unidad de trabajo es **el cursor**: completaciones inline, edits multi-archivo via prompt en chat lateral, refactors con diff visual.

-   **Representantes**: Cursor, GitHub Copilot, Windsurf, Cline, [Continue.dev](http://continue.dev/), Zed AI, JetBrains AI Assistant.
    
-   **Modo de interacción**: edit-as-you-go. Tú escribes, el modelo sugiere; tú prompteas, el modelo edita y enseña diff; tú aceptas/rechazas.
    
-   **Latencia tolerable**: <500ms para autocompletado, segundos para chat.
    
-   **Mejor para**: trabajo iterativo dentro de un archivo o feature pequeña, exploración guiada, refactors visuales.
    

### Categoría B — Terminal/CLI agentic

Vive en el terminal. Su unidad de trabajo es **la tarea**: le describes algo, el agente planifica, ejecuta con tools (Read, Edit, Bash, Grep...), y vuelve con resultados.

-   **Representantes**: Claude Code, Codex CLI (OpenAI), Aider, OpenCode, Gemini CLI, Copilot CLI (GA febrero 2026), Cline CLI.
    
-   **Modo de interacción**: plan-then-execute. Tú describes el objetivo, el agente trabaja durante minutos, tú revisas el resultado (a menudo un commit o un PR).
    
-   **Latencia tolerable**: minutos por tarea es aceptable.
    
-   **Mejor para**: refactors multi-archivo, scripts, pipelines, exploración de codebase desconocido, trabajo paralelo via tmux/git worktrees.
    

### Categoría C — Standalone autonomous agents (cloud)

Vive en la nube. Su unidad de trabajo es **el ticket**: le asignas un issue de Jira/Linear/GitHub, ejecuta autónomamente, te devuelve un PR.

-   **Representantes**: Devin (Cognition), Cursor Background Agents, GitHub Copilot Coding Agent, Jules (Google), AWS Q Developer agent.
    
-   **Modo de interacción**: fire-and-forget supervisado. Tú especificas, el agente trabaja mientras haces otra cosa, tú revisas el PR.
    
-   **Latencia tolerable**: horas.
    
-   **Mejor para**: tareas bien especificadas, paralelización masiva, trabajo asíncrono fuera de horario.
    

### Categoría D — Especializados

Resuelven un sub-problema concreto del SDLC: review, search, security, refactor automatizado.

-   **Representantes**: Copilot Code Review (60M reviews acumuladas), Bugbot (Cursor), Greptile, Sourcegraph Cody, [Refact.ai](http://refact.ai/), [Sweep.dev](http://sweep.dev/), Augment, Tabnine.
    
-   **Modo de interacción**: pipeline. Se enchufan a tu flujo (PRs, CI, IDE) y operan en background.
    
-   **Mejor para**: añadir capacidades a tu pipeline existente sin cambiar herramienta principal.
    

> 💡 **Patrón observado en seniors 2026**: stack híbrido. Editor IDE-integrated para inline + chat (categoría A), agente terminal para refactors y planning (categoría B), y especializado en code review (categoría D). Solo casos de paralelización extrema añaden categoría C. **No es una elección excluyente — es una arquitectura de herramientas.**

## Diferencia que NO es de categoría: completion vs agentic

Dentro de la categoría A misma puedes operar en dos modos muy distintos:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/d1ad3b6c-1db8-45cb-85a3-940bdb89ed71/8874385a964b99b9.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Decisión arquitectónica clave**: cuándo cambias de modo. Como regla práctica:

-   Si la tarea cabe **dentro de una función o un par de archivos relacionados** → completion + chat lateral.
    
-   Si la tarea **toca capas (modelo + servicio + endpoint + test)** → agentic.
    
-   Si la tarea **requiere ejecutar comandos** (migrations, builds, tests) → agentic obligatorio.
    

Confundir los modos es uno de los anti-patrones más caros: usar agentic para algo trivial (overhead innecesario, contexto contaminado) o usar completion para algo multi-archivo (terminas con código inconsistente entre archivos).

## Matriz de decisión: cinco criterios prácticos

Cuando un senior dev en 2026 elige herramienta, no se basa en benchmarks: se basa en cinco criterios prácticos. Esta es la matriz que recomiendo internalizar:

### Criterio 1 — Tamaño y forma del codebase

![image.png](https://media1-production-mightynetworks.imgix.net/asset/58eb9bb5-4f27-42c9-a560-4952858295ac/6c7f8471ccd60a32.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Criterio 2 — Lenguaje principal

-   **Python / JavaScript / TypeScript**: cualquier herramienta. La mayoría de modelos están sobreentrenados en estos lenguajes.
    
-   **Rust / Go / sistemas**: Claude Code y Zed muestran mejor manejo de tipos en research independiente.
    
-   **Java / Kotlin / .NET**: GitHub Copilot, JetBrains AI Assistant, Amazon Q (especialmente para .NET → AWS).
    
-   **Lenguajes de nicho** (Elixir, Clojure, OCaml, Erlang): herramientas con BYOK + modelo de razonamiento (Aider/Cline/OpenCode + Opus 4.7 o GPT-5.4).
    
-   **Frontend (React/Vue/Svelte)**: cualquiera; herramientas especializadas como v0 o Lovable para UI rápida.
    

### Criterio 3 — Política de privacidad y compliance

-   **Código puede salir a APIs públicas**: cualquiera.
    
-   **Código no puede salir** (banca, salud, defensa): Cline o Aider con modelos locales (Llama 3.x, Qwen3, DeepSeek), Tabnine on-prem, Cursor Privacy Mode con Business+, Amazon Q en VPC AWS, Claude Code via Bedrock o Vertex.
    
-   **Hay auditoría obligatoria de cada interacción**: GitHub Copilot Enterprise, Cursor Business+, Claude Code Team con audit logs.
    

### Criterio 4 — Presupuesto

![image.png](https://media1-production-mightynetworks.imgix.net/asset/af5f93b1-9ecd-4988-a4d9-0cb60adb898e/aaa01c149f1cff92.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Cifra a vigilar**: GitHub Copilot anunció el 22 de abril de 2026 que migra a *usage-based billing* el 1 de junio de 2026 (1 AI credit = $0.01) y pausó signups de Pro/Pro+. Si lees esto después de junio, las cifras de arriba pueden estar desactualizadas — ve a `docs.github.com/copilot/billing`.

### Criterio 5 — Estilo del developer

-   **Visual / inline-driven** (escribes y aceptas sugerencias): IDE-integrated.
    
-   **Plan-driven / refactor-heavy** (piensas la arquitectura, ejecutas en bloques): CLI agentic.
    
-   **Async / multitarea** (asignas y supervisas): cloud autonomous.
    
-   **Power user de terminal**: cualquiera de las tres anteriores menos los IDE-only.
    

## Modelos disponibles dentro de las herramientas (snapshot abril 2026)

Con la consolidación post-2025, casi todas las herramientas son **multi-modelo**. El acceso al modelo top no determina ya la herramienta — la herramienta determina el harness:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a5a5e9b9-baed-4ea7-9411-29896cac6d35/23afdedd85f3b3a9.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Implicación**: en 2026 la pregunta "¿esta herramienta usa el mejor modelo?" casi siempre se responde "sí, con tu suscripción adecuada". La diferencia real está en el harness: cómo el modelo accede a tools, cómo gestiona contexto, qué workflows soporta.

## Benchmarks: cómo leerlos sin engañarte

Si vas a comparar herramientas vía benchmarks públicos, **lee estos cuatro y descarta el resto**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/65b563e3-d5a4-4bdc-9c0b-3039758e8f12/8e1677f8467cc1e4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Trampa común**: comparar SWE-Bench Verified scores entre vendors. La mayoría son self-reported con scaffolding propio. Si Vendor A reporta 87% y Vendor B reporta 85%, es probable que la diferencia sea más harness que modelo. Para comparativas honestas: [vals.ai](http://vals.ai/), [SWE-rebench](https://swe-rebench.com/), [Aider leaderboards](https://aider.chat/docs/leaderboards/).

## El framework de decisión final

Pon junto los cinco criterios y aplica este árbol:

```
1. ¿La tarea cabe en una función o cae en un archivo?
   → Completion (IDE-integrated, modo Tab)

2. ¿Toca varios archivos / capas?
   ¿Necesitas ejecutar comandos?
   → Agentic.
       2a. ¿Codebase grande o tarea larga?      → CLI agentic (Claude Code, Codex CLI)
       2b. ¿Refactor visual / iteración rápida? → IDE-integrated agentic (Cursor Composer, Windsurf Cascade)
       2c. ¿Async / paralelizable?              → Cloud autonomous (Devin, Background Agents)

3. ¿Cumples política de privacidad?
   → Si NO: filtra a herramientas con modelo local o VPC.
   → Si SÍ: aplica criterio de presupuesto.

4. ¿Estilo del dev encaja con la categoría?
   → Si NO: cambia categoría aunque la herramienta sea "mejor en benchmark".
```

## Anti-patrones documentados en selección de herramienta

1.  **"Tengo Copilot porque la empresa lo paga, no necesito otra cosa"** — confundir disponibilidad con adecuación. Copilot Pro es excelente para completion + edit; para refactors agentic largos otras categorías están mejor.
    
2.  **"Salió el modelo X.7, cambio de herramienta"** — confundir modelo con harness. La mayoría de las herramientas top te darán acceso al modelo X.7 en cuestión de días.
    
3.  **"Yo uso solo herramientas open source por filosofía"** — válido, pero asume el coste de un harness menos pulido. Cline, Aider, OpenCode están maduros pero requieren más context-engineering manual.
    
4.  **"Pruebo todas las herramientas para encontrar la mejor"** — síndrome del eterno evaluador. La curva de aprendizaje real está en el contexto y el prompt, no en cambiar de herramienta cada mes.
    
5.  **"Pago $200 por Max plan, debo poder usarlo para todo"** — pagar más no compensa elegir mal categoría. Max plan dentro del modo equivocado sigue dando malos resultados.
    

---

## Lo accionable de esta lección

1.  **No memorices comparativas**: el ecosistema cambia mensualmente. Memoriza la **taxonomía (categorías A/B/C/D)** y los **5 criterios de decisión**. Eso transfiere.
    
2.  **Identifica tu stack actual** y verifica que cubre las tres categorías que un senior dev necesita (A, B, D). Si te falta alguna, sabes qué evaluar.
    
3.  **El modelo top está casi siempre disponible** — la diferencia entre herramientas en 2026 está en el harness, no en el modelo subyacente.
    
4.  **Antes de cambiar de herramienta, pregúntate**: ¿es un problema de herramienta o un problema de cómo la uso? La mayoría de los "problemas con la IA" son problemas de pilar 2 (contexto) o pilar 3 (prompt), no de pilar 1.
    

📺 **Recurso recomendado (8 min, inglés):** [Claude Code & Cursor built the same app. There's a clear winner.](https://www.youtube.com/watch?v=aRNVncOYd5c) — mismo proyecto, mismos prompts, comparativa directa con criterios aplicados a un caso concreto. (Video ilustrativo, no obligatorio.)

📖 **Lectura corta de referencia (10 min, inglés):** [Birgitta Böckeler — Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — artículo de Thoughtworks sobre cómo configurar el contexto de un agente de código: [AGENTS.md](http://agents.md/), memoria y herramientas. Publicado en febrero 2026.

> **Próxima lección**: pilar 2 — El Contexto. Vas a entender por qué la ventana de 1M tokens es un techo y no un objetivo, qué es el *context rot* y por qué [AGENTS.md](http://agents.md/) se está convirtiendo en el `.editorconfig` de los agentes.
