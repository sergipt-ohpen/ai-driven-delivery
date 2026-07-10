# 📄 Estimación asistida por IA 🔴— 13 min | AI-Driven Delivery

⏳ Tiempo estimado: 13 min

## El gran debate falso: SP vs horas vs t-shirts

El debate sigue activo y la mitad de la industria sigue equivocada en una dirección u otra. Lectura corta para no perder tiempo:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/3e31140e-e591-48c2-beea-711f43d1d4ce/534a9777bc3632dc.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### La trampa de las horas en la era de IA

> ⚠ **Por qué las horas dejaron de funcionar como unidad interna de planificación**:
> 
> Cuando un agente tarda 3 minutos y un humano revisando tarda 25, ¿son 28 minutos? ¿Cuál cuenta? ¿Y si el humano además tiene que hacer 2 commits manuales? La unidad "horas" mezcla trabajo cognitivo humano con trabajo de máquina, y el resultado es que ya nadie sabe qué está midiendo.

**Recomendación operativa AI4Devs**:

-   🎯 **SP en Fibonacci (1, 2, 3, 5, 8, 13)** como técnica principal en sprint planning.
    
-   🎯 **T-shirts (S, M, L, XL)** en upstream / discovery / cuando estimas roadmap a 6 meses.
    
-   🚫 **Horas solo para reporting externo o facturación**, nunca para sprint internal.
    

---

## Qué dice la investigación reciente sobre LLMs y estimación

Esto es nuevo y va contra la intuición. La literatura académica de 2024-2026 muestra que los LLMs son **decentes** estimando story points sin training data específico — pero "decente" no significa "bueno", y hay matices que importan.

📊 **Hallazgos clave** (síntesis de papers recientes en arXiv y journals):

-   LLMs sin fine-tuning alcanzan precisión comparable a modelos deep learning específicos para SP estimation, especialmente con few-shot examples del propio proyecto.
    
-   El rendimiento mejora significativamente cuando das al modelo **historiales de stories ya estimadas** del mismo equipo (señal: la IA aprende vuestras escalas).
    
-   Los modelos predicen mejor la **estimación absoluta directa** que la comparación entre dos stories. Contra-intuitivo, porque para humanos lo natural es "esta es como aquella, ergo igual".
    
-   La precisión cae con stories complejas o que requieren conocimiento de dominio específico no presente en el prompt.
    

> 💡 **Lectura operativa**: los LLMs son **buenos peers de planning poker, no buenos estimadores únicos**. Su valor está en aportar una opinión adicional al equipo, no en sustituir la conversación.

---

## Planning poker con IA como peer (no como árbitro)

El uso correcto de la IA en estimación es como **un participante más** en el planning poker, no como ground truth.

### Patrón operativo: planning poker AI-augmented

```
1. El equipo lee la story juntos (5 min).
2. Cada miembro estima en privado (Fibonacci).
3. La IA estima en privado también, con contexto del repo
   y historial de stories pasadas.
4. Se revelan todas las estimaciones a la vez.
5. Si hay outliers (humano o IA), se discute por qué.
6. NO se promedia. Se converge por discusión.
```

> 🎯 **El valor real está en el paso 5**: cuando la IA da 8 puntos y el equipo da 3, hay una conversación que merece la pena. O la IA está leyendo complejidad oculta que el equipo subestimó (más común de lo que crees), o el equipo tiene contexto que la IA no tiene (también común). En cualquier caso, **emerge información que no aparecería sin la IA**.

🛡 **Anti-patrones que debes evitar**:

-   ❌ **Usar la IA para resolver desacuerdos del equipo** ("a ver qué dice la IA"). La IA no sabe más que el equipo de su propio sistema.
    
-   ❌ **Aceptar la estimación de la IA cuando el equipo no tiene una opinión fuerte**. Es un atajo para no pensar.
    
-   ❌ **Reportar la estimación de la IA a stakeholders como si tuviera autoridad**. La IA estima patrones, no entrega.
    

---

## Multipliers de velocidad: el espejismo

Si has buscado en Google "AI velocity multiplier" en los últimos 18 meses habrás visto cifras tipo "+30%", "2×", "10×". La industria está infestada de claims optimistas. Los datos serios son más matizados:

📊 **Lo que sí sabemos** (síntesis de [Index.dev](http://index.dev/), Faros AI 2026, Stack Overflow 2025, DORA 2025):

-   En **tareas individuales aisladas**: ~21% más tasks completadas, casi 2× más PRs por persona en equipos AI-adoptados.
    
-   En **outcomes sistémicos** (DORA: deploy frequency, lead time): el efecto es mucho más pequeño y depende del bottleneck del equipo.
    
-   En **devs experimentados sobre código que conocen profundamente**: METR julio 2025 encontró -19% (sí, slowdown). Update de febrero 2026 lo bajó a -4%, pero el efecto sigue sin ser positivo en ese caso.
    
-   En **devs nuevos en una codebase**: aceleración real (10-30%) sin discusión.
    

> 📌 **Multiplier honesto para sprint planning AI4Devs**:
> 
> -   **Tareas greenfield**: la velocidad sube ~20-30%. Aplica un multiplier prudente de **0.85** sobre tu estimación humana base (estimas 8, ajusta a 7 si tu equipo tiene IA bien adoptada).
>     
> -   **Tareas sobre legacy familiar**: mantén la estimación humana **igual**. El copiloto no acelera, ayuda en boilerplate y revisión.
>     
> -   **Tareas de exploración/research**: la estimación es ruidosa por naturaleza, IA o no. Usa t-shirts (M, L, XL) y replantéate al final del spike.
>     

> ⚠ **No multipliques velocity por 2 porque el equipo "ahora tiene Claude Code"**. Es la receta más rápida para sprints incumplidos, equipos quemados y stakeholders desencantados.

---

## Estimación de tareas que no son código

Aquí es donde casi todos los planes fallan. La IA acelera *escribir código*. Acelera mucho menos:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/007e185c-839b-4a1d-b12a-df21111789ba/2208539278cb93a0.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Lectura senior**: el 70-80% del tiempo de un equipo no se va escribiendo código nuevo. Va a debugging, revisión, alineación, refinamiento, deployment, soporte. **La IA acelera la parte que ya era pequeña en el cómputo total**. Por eso los multipliers grandes son irreales para outcomes de equipo.

---

## Buffers realistas: 30-40%, no 10%

Pre-IA, los equipos maduros usaban buffers de 10-15% sobre velocity para imprevistos. Con IA en el flujo, el buffer realista para los próximos 12-18 meses es **30-40%**, por estos motivos concretos:

1.  **Verificación tax**: cada PR generado por agente requiere review humano más cuidadoso. El tiempo de review subió.
    
2.  **Quality tax**: PR sizes +150% con IA, bug counts +9% (Faros 2026). Más bugs significan más interrupciones de soporte mid-sprint.
    
3.  **Tooling churn**: las herramientas (Cursor, Claude Code, Linear Agent) se actualizan cada 2-4 semanas. Hay tiempo de adaptación constante.
    
4.  **Inestabilidad de modelos**: los modelos cambian de día. Un patrón que funcionaba con Claude Sonnet 4.5 puede fallar con 4.6. Se invierte tiempo recalibrando.
    

```
Velocity base del equipo:                  40 SP/sprint
Buffer pre-IA (10%):                       36 SP comprometidos
Buffer AI-aware (30%):                     28 SP comprometidos
                                                       ↑
                                       12 SP de buffer real
                                       para imprevistos
```

🎯 **Cómo justificarlo a stakeholders**: muéstrales los datos. Faros 2026, DORA 2025 y los reports de tu propio equipo si llevas trackeando 3+ sprints. Buffer de 30% no es pesimismo; es realismo basado en evidencia.

---

## Estimación a nivel epic / roadmap

Para el roadmap a 3-6 meses, los SP no funcionan (demasiado granulares, ruido alto). T-shirts sí.

```
## Epic: FlowSync — Sincronización bidireccional con Google Calendar

### Estimación: L (3-5 sprints)

### Descomposición esperada:
- M: Auth OAuth con Google
- M: Polling y diff de eventos
- L: Resolución de conflictos
- S: UI de configuración
- S: Edge cases conocidos (recurrentes, all-day events)

### Riesgos que pueden mover de L a XL:
- Rate limits de Google Calendar API
- Casos de zonas horarias que aún no exploramos
- Compliance GDPR si hay calendarios B2B
```

> 💡 **Patrón senior**: las descomposiciones de epic en stories L+ se hacen **al iniciar el epic**, no en el roadmap. El roadmap es para hablar con stakeholders, no para planificar sprints.

---

## La estimación es una conversación, no un número

Cierro con la regla que va a parecer redundante pero es la que más se viola:

> 📌 **Una estimación sin discusión vale menos que la falta de estimación**.
> 
> El número en el ticket es el **subproducto** de la conversación. La conversación es lo que alinea al equipo, descubre supuestos ocultos y revela complejidad. Si el número aparece sin conversación, el ticket lleva un cero pintado de número.

Por eso la IA-as-peer en planning poker es valiosa: la IA fuerza una conversación cuando da una estimación distinta. La IA-as-oracle (decide ella) es venenosa: corta la conversación.

---
