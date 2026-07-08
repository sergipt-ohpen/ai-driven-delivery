# 🎥 Papel actual de la IA en desarrollo de software 🔴 — 12 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 12 min

## Papel actual de la IA en desarrollo de software

> En febrero de 2026, Andrej Karpathy — uno de los fundadores de OpenAI — declaró que el "vibe coding" ya estaba pasado de moda y propuso un término distinto para 2026: **agentic engineering**. La frase es oportuna: en 18 meses pasamos de "la IA me sugiere líneas" a "la IA me ejecuta tareas durante 200 minutos seguidos". Este pre-curso parte de ahí.

## El cambio de paradigma en 4 años

![image.png](https://media1-production-mightynetworks.imgix.net/asset/757ecd83-bb8a-4cfb-81a1-222b37a9ffd0/cec66baaa68dc0e8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

El cuello de botella se está moviendo: ya no es **escribir código**, sino **definir qué construir, dar contexto efectivo y validar que lo generado sirve**.

## Qué dicen los datos duros (2025–2026)

### Adopción casi universal

-   **Stack Overflow Developer Survey 2025** (49.000 respuestas, 177 países): el **84%** de los desarrolladores usa o planea usar herramientas de IA (vs. 76% en 2024). El **51%** las usa todos los días.
    
-   **DORA 2025** (Google Cloud, ~5.000 profesionales): el **90%** usa IA en el trabajo (+14 puntos vs. 2024).
    
-   **GitHub Octoverse 2025**: 180 millones de devs en GitHub (+36M en un año, ≈1 nuevo dev/segundo). El **80%** de los nuevos developers usa Copilot en su primera semana.
    

### Un dato curioso del Octoverse 2025

Por primera vez en más de una década, **TypeScript superó a Python y JavaScript** como lenguaje más usado en GitHub (agosto 2025). GitHub atribuye esto al *"convenience loop"* con IA: los lenguajes tipados generan guardrails más útiles para los LLMs, lo que mejora la experiencia de generación de código, lo que aumenta su uso, lo que retroalimenta el ciclo.

> **Sobre el lenguaje de programación:** Las demos en vivo y los ejercicios del programa se desarrollarán principalmente en JavaScript y TypeScript. Sin embargo, no es un requisito conocerlos previamente ni adoptarlos obligatoriamente. Los conceptos de ingeniería agentica, uso de herramientas IA y flujos de trabajo que aprenderás aplican a cualquier stack tecnológico. Podés completar los ejercicios y el proyecto final en el lenguaje que ya dominás.

### Pero la confianza está cayendo

-   Stack Overflow 2025: la confianza en respuestas de IA cayó del **40% (2024) al 29% (2025)**. El **46%** desconfía activamente.
    
-   Sólo el **3%** de developers reporta "alta confianza" en el output de IA.
    
-   El **75%** sigue prefiriendo preguntar a un humano cuando duda de la respuesta de la IA.
    

## La paradoja productividad-percepción

Aquí está el dato que más debería desafiar tus suposiciones antes de empezar el máster:

> **Estudio METR (julio 2025)**, RCT con 16 desarrolladores experimentados sobre repositorios open source maduros (≥22k stars, ≥1M LOC), en 246 tareas reales con Cursor Pro + Claude 3.5/3.7 Sonnet:
> 
> -   Los devs **predijeron** que serían **24% más rápidos** con IA.
>     
> -   **Después** del experimento, creían haber sido **20% más rápidos**.
>     
> -   **En realidad fueron 19% más lentos**.
>     

🔗 Estudio completo: [METR — Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

📺 Andrej Karpathy comenta este estudio y otros datos en su keynote *"Software 3.0"* (Y Combinator AI Startup School, junio 2025):

Video Player is loading.

Loaded: 0.00%

Remaining Time 39:32

1x

-   2x
-   1.5x
-   1.25x
-   1x, selected
-   0.75x
-   0.5x
-   0.25x

### Cómo leer este estudio sin sacar la conclusión equivocada

El "19% más lentos" es **un dato sólido en su muestra y momento concreto** (early 2025, codebases enormes y maduras), no una ley universal. La propia METR publicó (febrero 2026) que está rediseñando el experimento por sesgos de selección. Lo importante para ti es:

-   En **greenfield + tareas simples**, las ganancias son reales y a veces masivas (Stanford reporta hasta +30–40% en estos contextos).
    
-   En **codebases legacy, complejas, con convenciones implícitas**, la IA introduce **overhead de validación, rework y context-switching**. Y la percepción engaña.
    
-   **Medir > asumir**. Es el primer principio operativo del máster.
    

### El otro hallazgo incómodo (Stanford, octubre 2025)

Un paper en arXiv (2510.10165) analizó qué pasó tras la introducción de Copilot en equipos:

-   Los devs **core** (más experimentados) revisan **+6,5% más código**.
    
-   Pero su producción de código original cae **−19%**.
    

La deuda técnica generada por la IA se **desplaza hacia los seniors**, que pasan más tiempo en code review.

## Software 3.0 y agentic engineering (Karpathy)

En su charla del **17 de junio de 2025** en la AI Startup School, Andrej Karpathy formalizó:

-   **Software 1.0**: código clásico escrito por humanos.
    
-   **Software 2.0**: redes neuronales (los pesos son el "código").
    
-   **Software 3.0**: LLMs programables en lenguaje natural, con prompts como código y la ventana de contexto como memoria.
    

📖 Transcripción y análisis: [Latent Space — Andrej Karpathy on Software 3.0](https://www.latent.space/p/s3)

**Vibe coding** lo acuñó Karpathy en X el 2 de febrero de 2025: *dejarse llevar y escribir software conversando con el LLM, "olvidando que el código existe"*.

> 🚨 **Actualización febrero 2026**: el propio Karpathy declaró que "vibe coding ya está pasado de moda" y propuso **agentic engineering** para distinguir el uso profesional con supervisión, oversight y rigor.
> 
> *"Agentic porque por defecto ya no estás escribiendo el 99% del código, estás orquestando agentes y supervisando. Engineering porque hay un arte y una ciencia que se puede aprender."*

Esa diferencia — entre vibe coding (mood, demos) y agentic engineering (supervisión, producción) — es exactamente la línea que cruza este máster.

## Lo que está pasando con el dinero

Para entender la urgencia del momento, los números de inversión hablan por sí solos (cifras a abril 2026):

-   **Cursor (Anysphere)**: USD **2.000M ARR** en febrero 2026 — la empresa B2B más rápida en llegar a USD 2B. Valuación discutida: USD 50–60B.
    
-   **Cognition (Devin + Windsurf)**: ronda en discusión a USD **25.000M de valuación** (vs. USD 10,2B en septiembre 2025).
    
-   **Mercado total de AI coding tools**: estimado entre USD 7,4B y USD 12,8B en 2026, con proyecciones a USD 26–30B hacia 2030.
    
-   **GitHub Copilot**: **20 millones de usuarios totales** (julio 2025), **4,7 millones de pago** (enero 2026, +75% YoY), **90% de las Fortune 100** lo han adoptado.
    

> 💡 No te aprendas estas cifras. Lo importante es la magnitud: en ningún momento de la historia del desarrollo de software hubo este nivel de inversión y concentración en herramientas que cambian cómo trabaja el dev individual. Eso obliga a tener una opinión informada sobre cómo usarlas.

## El elefante en la habitación: los datos de empleo

-   **SignalFire State of Talent 2025**: Big Tech recortó la contratación de recién graduados un **−25%** en 2024 vs. 2023. Los grads representan ya solo el **7%** del hiring en Big Tech (vs. ~15% pre-pandemia).
    
-   **Stanford Digital Economy Lab 2025**: el empleo de software developers de **22–25 años cayó ~20%** desde finales de 2022. El de 35–49 años subió **+9%** en el mismo período.
    
-   Las mismas empresas **subieron el hiring de devs con 2–5 años de experiencia un +27%**.
    

📺 Erik Brynjolfsson (Stanford) explica la democratización del Seniority: [El efecto "Canary in the Coal Mine”](https://www.hbs.edu/managing-the-future-of-work/podcast/Pages/podcast-details.aspx?episode=9166436185&utm_source=chatgpt.com)

El rol de "dev senior" no está siendo reemplazado, está siendo **redefinido**. Y este máster es una de las formas de hacer esa transición a propósito en vez de sufrirla.

## Lo accionable de esta página

1.  **No esperes ganancias automáticas de productividad.** Esperar 10–20% promedio es realista; greenfield puede dar mucho más, legacy puede dar negativo. **Mide tu caso concreto.**
    
2.  **La IA desplaza carga hacia ti como senior.** Más code review, más validación, más decisiones arquitectónicas. Ajusta tu definición de *Done*.
    
3.  **El cuello de botella se mueve a problem framing y context engineering.** Estos serán los pilares de las primeras sesiones del máster.
    
4.  **El mercado se está concentrando rápido.** No necesitas dominar 10 herramientas, necesitas dominar bien **1–2** y entender cómo se conectan.
    

## Recursos para profundizar

-   📺 [Andrej Karpathy — Software 3.0 (YC AI Startup School, junio 2025)](https://www.youtube.com/watch?v=LCEmiRjPEtQ) — 40 min, en inglés con subtítulos.
    
-   📖 [METR — Measuring the Impact of Early-2025 AI on Experienced OS Devs](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — el estudio de los 19%.
    
-   📖 [Stack Overflow Developer Survey 2025 — AI](https://survey.stackoverflow.co/2025/ai/) — los datos completos de adopción y confianza.
    
-   📖 [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — el estado del ecosistema dev.
    
-   📖 [DORA 2025: State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — qué amplifica la IA en equipos reales.
    
-   📺 [dotCSV — Vibe coding: ¿el futuro de programar?](https://www.youtube.com/@DotCSV) (canal en español, busca "vibe coding")
    

> 👉 Cuando termines de leer, deja en comentarios: **¿qué porcentaje de tu código del último mes fue escrito o sugerido por IA, y dónde te ha hecho ir más lento de lo que esperabas?** Es la mejor forma de empezar el curso con honestidad.
