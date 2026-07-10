# 📚  Recursos adicionales 🟢 | AI-Driven Delivery

> Esta lección unifica todos los recursos de profundización del asíncrono, organizados por pilar (espejo de la estructura de las lecciones 1–4). Úsala como **referencia post-sesión**: cuando quieras profundizar en un pilar concreto o citar una fuente, vuelve aquí.
> 
> No tienes que leer todo. Cada sección tiene una nota indicando qué leer **si solo tienes 30 minutos** vs. qué reservar para más adelante.

## 🧭 Cómo usar esta lección

-   **Antes de la sesión en vivo**: opcional. El asíncrono te da todo lo que necesitas. Si tienes tiempo extra, lee solo los recursos marcados con ⭐ (los imprescindibles).
    
-   **Durante el máster**: vuelve aquí cuando un pilar concreto sea tu cuello de botella. Si los outputs son inconsistentes con tu proyecto → recursos del Pilar 2. Si no resuelven la tarea → recursos del Pilar 3. Etc.
    
-   **Después del máster**: mantén esta lección como bookmark. La mayoría de las URLs son fuentes que se actualizan (changelogs, blogs, leaderboards).
    

---

## 📚 Modelo mental general (lección 1)

Recursos para reforzar la idea central: **"el modelo no es el cuello de botella; el harness, el contexto y el prompt explican más varianza que la versión del modelo"**.

### Lecturas

-   ⭐ **Birgitta Böckeler / Martin Fowler** — *Harness engineering for coding agent users* (abril 2026) [https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
    
    > El artículo de Thoughtworks que mejor formaliza el cambio de paradigma. **Si solo lees una cosa de fuera del máster esta semana, que sea esta.** ~10 min.
    
-   **Birgitta Böckeler — Memo precursor** (versión corta del anterior) [https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html)
    
    > Versión más breve para audiencias menos técnicas. ~5 min.
    

### Investigación citada en lección 1

-   **METR (julio 2025)** — *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
    
    > El RCT que demostró el +19% de tiempo extra en seniors con IA. Paper completo: [https://arxiv.org/abs/2507.09089](https://arxiv.org/abs/2507.09089)
    
-   **METR (febrero 2026) update** [https://metr.org/blog/2026-02-24-uplift-update/](https://metr.org/blog/2026-02-24-uplift-update/)
    
    > Inversión del efecto a −18% en los mismos developers tras 7 meses, pero con CI muy ancho.
    
-   **arXiv 2510.10165** (octubre 2025) — *AI-Assisted Programming Decreases the Productivity of Experienced Developers by Increasing the Technical Debt and Maintenance Burden* [https://arxiv.org/abs/2510.10165](https://arxiv.org/abs/2510.10165)
    
    > El paper que documenta cómo la IA transfiere trabajo del autor al revisor: core developers producen 19% menos código original y revisan 6.5% más código ajeno.
    

---

## 🛠 Pilar 1 — La Herramienta (lección 2)

Recursos para profundizar en taxonomía, criterios de selección y comparativas honestas entre herramientas.

### Lecturas

-   [https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting)
    

### Documentación oficial de herramientas

-   **Anthropic — Claude Code Best Practices** [https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
    
    > La guía oficial de cómo usar Claude Code efectivamente. Imprescindible si lo vas a usar como herramienta principal.
    
-   **GitHub Copilot — Modelos y pricing actualizados** [https://docs.github.com/en/copilot/reference/ai-models/supported-models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
    
    > Cambia frecuentemente. Marca esta URL para verificar qué modelos están disponibles en cada plan.
    
-   **Cursor — Pricing y modelos** [https://cursor.com/pricing](https://cursor.com/pricing) · [https://cursor.com/docs/models-and-pricing](https://cursor.com/docs/models-and-pricing)
    
-   **Cognition — Acquisition of Windsurf** (julio 2025) [https://cognition.ai/blog/windsurf](https://cognition.ai/blog/windsurf)
    
    > Contexto histórico del cambio en el ecosistema.
    

### Benchmarks honestos para comparar herramientas

-   [**vals.ai**](http://vals.ai/) — Re-evaluaciones independientes [https://www.vals.ai/benchmarks/swebench](https://www.vals.ai/benchmarks/swebench)
    
    > Útil porque la mayoría de scores oficiales son self-reported. Aquí ves cómo rinde el mismo modelo evaluado por terceros.
    
-   **SWE-rebench** — Leaderboard rotativo con harnesses estandarizados [https://swe-rebench.com/](https://swe-rebench.com/)
    
-   **Aider Polyglot leaderboards** — 225 ejercicios Exercism, 6 lenguajes [https://aider.chat/docs/leaderboards/](https://aider.chat/docs/leaderboards/)
    
    > Reproducible, barato de correr, multi-lenguaje. La referencia para comparar modelos sin trampa.
    

---

## 🧠 Pilar 2 — El Contexto (lección 3)

Recursos para profundizar en context engineering, context rot y [AGENTS.md](http://agents.md/) como estándar.

### Lecturas

-   ⭐ **Lance Martin (LangChain)** — *Context Engineering for Agents* (junio 2025) [https://blog.langchain.com/context-engineering-for-agents/](https://blog.langchain.com/context-engineering-for-agents/)
    
    > El post seminal que popularizó el framework Write/Select/Compress/Isolate. ~15 min.
    
-   ⭐ **Simon Willison** — *Context engineering* (junio 2025) [https://simonwillison.net/2025/jun/27/context-engineering/](https://simonwillison.net/2025/jun/27/context-engineering/)
    
    > Post seminal complementario al de LangChain. Por qué el término "prompt engineering" se está quedando corto.
    
-   **Phil Schmid — *Context Engineering*** [https://www.philschmid.de/context-engineering](https://www.philschmid.de/context-engineering)
    
    > Visión técnica complementaria con ejemplos de código.
    
-   **Lance Martin — Context Engineering for Agents (versión académica)** [https://rlancemartin.github.io/2025/06/23/context\_engineering/](https://rlancemartin.github.io/2025/06/23/context_engineering/)
    
    > La versión más detallada del mismo autor en su blog personal.
    

### Investigación sobre context rot

-   ⭐ **Chroma Research** — *Context Rot: How Increasing Input Tokens Impacts LLM Performance* (julio 2025) [https://www.trychroma.com/research/context-rot](https://www.trychroma.com/research/context-rot)
    
    > **El paper que cambió las prácticas en 2025.** Si te creías el discurso de "1M tokens, todo a la ventana", léelo. ~10 min.
    
-   **arXiv 2510.21413** (octubre 2025) — *Context Engineering for AI Agents in Open-Source Software* [https://arxiv.org/pdf/2510.21413](https://arxiv.org/pdf/2510.21413)
    
    > Análisis empírico del estado de los agentes en OSS.
    

### Documentación y especificaciones

-   ⭐ [**AGENTS.md**](http://agents.md/) **spec abierta** [https://agents.md](https://agents.md/)
    
    > La spec del estándar de facto desde 2025. Léela en 5 minutos.
    
-   **Anthropic — Sub-agents en Claude Code** [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)
    
    > Cómo aislar contexto con sub-agents — la técnica más poderosa contra context rot.
    
-   **OpenAI Codex —** [**AGENTS.md**](http://agents.md/) **guide** [https://developers.openai.com/codex/guides/agents-md](https://developers.openai.com/codex/guides/agents-md)
    
    > Guía oficial de OpenAI sobre cómo estructurar [AGENTS.md](http://agents.md/).
    
-   **Anthropic — Donating MCP to the Linux Foundation** (diciembre 2025) [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
    
    > Contexto de por qué [AGENTS.md](http://agents.md/) y MCP son ahora estándares neutrales.
    

---

## ✏ Pilar 3 — El Prompt + Integración (lección 4)

Recursos para profundizar en prompting con modelos razonadores y patrones específicos de coding.

### Lecturas

-   ⭐ **Anthropic** — *Prompting best practices* (oficial, actualizado para Claude 4.6/4.7) [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
    
    > La guía canónica. Si solo lees una cosa sobre prompting en 2026, que sea esta. ~20 min.
    
-   **Anthropic — Prompt engineering overview** [https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
    
    > Punto de entrada a toda la documentación de prompting de Anthropic.
    
-   **Anthropic — Best practices for prompt engineering** [https://claude.com/blog/best-practices-for-prompt-engineering](https://claude.com/blog/best-practices-for-prompt-engineering)
    
    > Versión blog post (más narrativa) de la guía oficial.
    
-   **OpenAI Cookbook — Prompt engineering for GPT-5.x** [https://platform.openai.com/docs/guides/prompt-engineering](https://platform.openai.com/docs/guides/prompt-engineering)
    
    > Imprescindible si trabajas con GPT-5.x. Especialmente la sección sobre `effort` levels y por qué NO añadir CoT.
    
-   **OpenAI** — *The next evolution of the Agents SDK* (15 abril 2026) [https://openai.com/index/the-next-evolution-of-the-agents-sdk/](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
    
    > Anuncio del harness nativo de OpenAI con sandbox + [AGENTS.md](http://agents.md/) + state snapshotting.
    

### Investigación sobre prompting con razonadores

-   **arXiv 2506.04210** — *Does Thinking More always Help? Mirage of Test-Time Scaling in Reasoning Models* [https://arxiv.org/abs/2506.04210](https://arxiv.org/abs/2506.04210)
    
    > Resultado clave: **multiple independent reasoning paths + majority vote** supera 20% al thinking más largo. Implicación: paralelizar (sub-agents) supera a "pensar más fuerte".
    

### Patrones de coding emergentes

-   **GitHub spec-kit** — herramienta para Spec Driven Development (preview de S2)
    
    > Mencionada como tease en la lección 4. Profundizamos en S2.
    
-   **Karpathy — Tweets sobre context engineering** (jun 2025) [https://x.com/karpathy/status/1937902205765607626](https://x.com/karpathy/status/1937902205765607626)
    
    > El post que estableció "context engineering > prompt engineering" en el discurso senior.
    
-   **Tobi Lütke — Tweet sobre context engineering** [https://x.com/tobi/status/1935533422589399127](https://x.com/tobi/status/1935533422589399127)
    
    > El CEO de Shopify haciendo del término práctica corporativa.
    

---

## 📖 Recursos transversales (cubren múltiples pilares)

### Newsletters y blogs senior

-   **Simon Willison** ([https://simonwillison.net](https://simonwillison.net/)) — actualización casi diaria sobre todo el ecosistema. **Imprescindible si quieres mantenerte al día sin leer 50 blogs.**
    
-   **Andrej Karpathy** (twitter/X) — micro-tutoriales y reflexiones de uno de los referentes del campo.
    
    -   [https://x.com/karpathy](https://x.com/karpathy)
        
-   **Geoffrey Huntley** ([https://ghuntley.com](https://ghuntley.com/)) — guías prácticas de uso intensivo de Claude Code y agentic engineering.
    

### Comunidades

-   [**AGENTS.md**](http://agents.md/) **GitHub repos** — busca en GitHub `path:AGENTS.md` para ver ejemplos reales de cómo proyectos OSS estructuran su contexto persistente.
    
-   **Anthropic Discord / OpenAI Forum** — discusiones técnicas en tiempo real.
    

---

## 🎯 Lo que debes haber leído antes de la sesión en vivo

Si tienes tiempo limitado, estas son las **3 lecturas mínimas** para llegar a la sesión en vivo con la base correcta:

1.  ⭐ **Böckeler** — *Harness engineering for coding agent users* (10 min) — refuerza lección 1
    
2.  ⭐ **Chroma** — *Context Rot* (10 min) — refuerza lección 3
    
3.  ⭐ **Anthropic** — *Prompting best practices* (20 min) — refuerza lección 4
