# 📄 La planificación cambia: nuevos paradigmas 🔴— 11 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 11 min

## El cambio que casi nadie está nombrando

Durante 20 años la planificación ágil tuvo una geometría estable: el cuello de botella era **la implementación**. Refinábamos historias, las estimábamos en story points, y la velocidad real del equipo se medía contra esa estimación. Si pinchaba algo, casi siempre era porque la story estaba mal entendida o era más grande de lo aparente. La IA no ha cambiado esa geometría, **la ha invertido**.

Hoy un dev senior con Claude Code puede convertir una historia bien definida en código mergeable en horas, no días. Lo que antes era el bloque más caro del ciclo (escribir el código) se ha vuelto el más barato. El cuello de botella se desplazó:

-   🔼 **Antes**: implementación cara → planificación rápida y aproximada bastaba.
    
-   🔽 **Ahora**: implementación barata → la planificación mal hecha es donde se pierde el tiempo.
    

Si la historia no tiene contexto suficiente, criterios de aceptación claros y dependencias mapeadas, el copiloto produce código rápido pero **no es el código que necesitabas**. Y rehacer en la era de IA es engañosamente barato: el coste no es la línea de código, es el tiempo de revisar, decidir, alinear. Esa parte no se acelera con un modelo más grande.

> ⚠ **El nuevo coste de mala planificación no es escribir código equivocado. Es revisar código equivocado.**
> 
> Y eso lo hace un humano caro, no un agente.

---

## De task planning a capability planning

Empieza a notar el lenguaje. Cuando antes un PM preguntaba "¿cuántas tareas entran en el sprint?", lo razonable era contar items y estimar puntos. Ahora la pregunta correcta es otra:

> *¿Qué capacidades del equipo + capacidades de los copilotos se combinan para entregar este conjunto de outcomes?*

La diferencia es operativa, no semántica:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/1af5ccc8-032e-453f-acf3-d5a1d23fa7be/3bfcf9abb377cca4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

El trabajo del senior planificando ya no es "dividir features en tareas pequeñas". Es **diseñar las condiciones bajo las cuales una tarea puede completarse rápido**: spec clara, contexto en `AGENTS.md`, MCPs configurados, tests de referencia accesibles. Si esas condiciones existen, la tarea es trivial. Si no, ningún modelo te salva.

---

## Adopción real en planificación, no en hype

Los datos que importan no son los de adopción de copilotos para escribir código (esos los vimos en el pre-curso). Lo nuevo es que la IA está entrando ya **en la capa de planificación**, y a ritmo serio:

-   📊 **AI4Agile Practitioners Report 2026**: el **83% de los practitioners ágiles** usa IA en alguna parte del flujo, aunque la mayoría todavía la usa en una porción pequeña de su trabajo. La adopción está, la madurez todavía no.
    
-   📊 **Atlassian Q2 FY26**: **Rovo (la capa AI de Jira/Confluence) cruzó los 5 millones de MAU**. Es la cifra de adopción más alta jamás reportada para una capa de IA en una herramienta de PM enterprise.
    
-   📊 **Linear (CEO Karri Saarinen, marzo 2026)**: agentes de coding ya están instalados en el **75% de workspaces enterprise de Linear**, y el volumen de trabajo hecho por agentes se ha multiplicado por 5 en los últimos 3 meses.
    
-   📊 **Capgemini 2024 (citado en literatura 2026)**: la generación asistida de criterios de aceptación reduce el rework en sprints en torno a un **15%**. No es un boost gigante, pero es el tipo de mejora compuesta que no te puedes permitir ignorar a 12 meses vista.
    

> 💡 **Lectura senior**: el patrón de adopción es el mismo que con Copilot en 2022-2023. Primero lo usan ingenieros para tareas individuales, después se infiltra en los procesos del equipo. Si tu equipo todavía no tiene IA en refinamiento o sprint planning, en 12 meses lo vas a tener — y los que llegan tarde lo van a configurar mal porque no entendieron la teoría.

🎥 **Vídeo recomendado** — *Introducing Linear Agent* (1:30 min, EN, oficial Linear, marzo 2026). El lanzamiento del agente con casos concretos en sólo 90 segundos.

📺 [https://www.youtube.com/watch?v=mRql2VJ99gM](https://www.youtube.com/watch?v=mRql2VJ99gM)

---

## Las 3 trampas de los seniors estimando con IA

Aquí es donde el dev experimentado tropieza más, precisamente porque su intuición de pre-IA era buena. Las tres se confunden con sentido común.

### Trampa 1 — Optimismo por contagio

Cuando el copiloto te genera una propuesta de descomposición de un epic en 6 stories en 30 segundos, tu cerebro **calibra contra el tiempo de generación, no contra la complejidad real**. Una story que tardó 3 segundos en aparecer "siente" pequeña. Es el sesgo de fluidez cognitiva: lo que se procesa fácil parece simple.

🛡 **Contramedida**: separar la generación de la estimación por tiempo y por interlocutor. Genera con el copiloto, déjalo reposar, estima al día siguiente con un humano que no haya visto la generación.

### Trampa 2 — Falsa precisión

Pides estimaciones a la IA y te devuelve "3.5 puntos" o "4.2 horas". Esa precisión decimal es ficticia: el modelo está promediando patrones de su dataset, no midiendo tu codebase. Pero suena más sofisticada que un round 3 o 5 humano y se cuela en el ticket.

🛡 **Contramedida**: redondear siempre a la escala discreta del equipo (Fibonacci, t-shirts). La IA puede *sugerir* el bucket, no el decimal.

### Trampa 3 — Homogeneización de stories

Si pides al copiloto "decompón este PRD en user stories", todas las stories te van a salir con la misma forma, el mismo nivel de detalle y el mismo tono. Eso enmascara que algunas son triviales (CRUD básico) y otras esconden complejidad real (sincronización, concurrencia, integraciones flaky).

🛡 **Contramedida**: pedir al copiloto que **clasifique** las stories en buckets de complejidad antes de pedir AC. La heterogeneidad explícita rescata la información que el formato uniforme borra.

---

## El sesgo más caro: confundir velocity con productividad

Este merece sección propia porque está saliendo en los reports de 2026 con un nombre concreto.

> 📊 **DORA 2025**: el **42% de equipos admite manipular las métricas de velocity** cuando se vinculan a performance reviews. Con IA, esto se acelera porque es más fácil "llenar el sprint" de stories que efectivamente fueron generadas y completadas con mínimo aporte humano. La velocidad sube. El valor entregado, no necesariamente.

📊 **Faros AI Engineering Report 2026** (telemetría de 22.000 devs durante 2 años): los equipos con alta adopción de IA muestran **PR sizes +150%** y **bug counts +9%** comparados con equipos sin IA. Más código, más rápido, más bugs. El tradeoff es real y hay que planificarlo, no esconderlo bajo una velocity inflada.

> ⚠ **Lo que tienes que hacer en S4 y siempre**:
> 
> -   Velocity sigue siendo útil **solo como herramienta de planificación**, nunca como KPI de performance.
>     
> -   Si vas a medir productividad real, mira **outcomes** (DORA: deploy frequency, lead time, MTTR, change failure rate) — no story points.
>     
> -   Marca PRs generadas por agente (`copilot`, `claude-code`, etc.) y reporta calidad por origen. Si los PRs de agentes tienen 3× más bugs que los humanos, la velocity está mintiendo.
>     

---

## La nueva geometría de la incertidumbre

Si tuvieras que dibujar dónde se concentra el riesgo en un proyecto en 2026 vs 2020, los picos se han desplazado:

```diagram
2020 (sin IA):                2026 (con IA):
   ▁▂▆█▆▂▁                       ▆██▂▁▁▁▂▆
   D R I T D                      D R I T D
                                  ▲ ▲     ▲
                                  donde está
                                  el riesgo ahora
```

(D=Discovery, R=Refinamiento, I=Implementación, T=Testing, D=Deployment)

La conclusión operativa es directa: **inviertes más en discovery y refinamiento, menos en implementación, y vuelves a invertir fuerte en deployment** (porque hay más código y más superficie de ataque). La planificación se mueve hacia los extremos.
