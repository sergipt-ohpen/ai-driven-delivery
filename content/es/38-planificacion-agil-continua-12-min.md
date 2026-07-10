# 📄 Planificación ágil continua 🔴— 12 min | AI-Driven Delivery

⏳ Tiempo estimado: 12 min

## El refinamiento ya no es una ceremonia, es un proceso de fondo

La ceremonia clásica de "backlog refinement" — todo el equipo, una hora, una vez por sprint — sigue existiendo, pero está perdiendo el monopolio. Con IA en el flujo, el refinamiento se vuelve **continuo y asincrónico**:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/4cb84ad4-8b87-493c-b42c-a7f9f3216b45/052a44347a5e1d49.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Patrón canónico para el flujo continuo**:
> 
> 1.  Cualquiera abre un issue con título + 2-3 frases de intención.
>     
> 2.  Skill `expand-issue` (Claude Code o Linear Agent) genera AC, contexto técnico inicial, etiquetas, prioridad sugerida.
>     
> 3.  El skill **flagea** issues que parecen complejas (multi-componente, no-estimables, dependencias detectadas) y los manda al equipo para revisión humana.
>     
> 4.  La ceremonia semanal se acorta a 20-30 minutos, focalizada en los issues flagged.
>     

---

## Skill + Hook: el patrón de "guardia continua"

S3 dejó claro que skills y hooks son las primitivas operativas del copiloto. Aquí los aplicamos al backlog:

### Skill `expand-issue`

```
# .claude/skills/expand-issue.md

You are expanding a draft issue into a sprint-ready user story.

Given the title and brief description provided, generate:
1. User story in standard format (As a/I want/So that)
2. Acceptance criteria in Given/When/Then (3-5 scenarios: happy path + edge cases + error cases)
3. Technical context section pointing to relevant files in the repo
4. Suggested labels (frontend/backend/full-stack, type:bug/feature/refactor)
5. Estimation hint as t-shirt (S/M/L) with brief justification

If the issue scope seems too large for a single story, mark it as
`needs-splitting` and propose a 2-3 way decomposition.

Output as Markdown ready to paste into Linear/Jira.
```

### Hook `validate-ac` (PreCommit, Linear)

```
#!/usr/bin/env bash
# Hook: bloquea cerrar tickets sin AC en Given/When/Then

ISSUE_AC=$(linear issue $1 --field acceptanceCriteria)

if [[ -z "$ISSUE_AC" ]] || ! echo "$ISSUE_AC" | grep -qE "Given|When|Then"; then
  echo "❌ Ticket $1 no tiene AC en formato Given/When/Then. Refina antes de cerrar."
  exit 1
fi
```

> 🎯 **Efecto compuesto**: el equipo deja de revisar formato en refinamiento. La ceremonia es solo para discutir trade-offs y prioridades. El "tax burocrático" del PM clásico desaparece.

---

## Definition of Done por tipo de tarea

Una sola DoD para todo el equipo es un anti-patrón clásico. Es demasiado genérica para guiar bien y demasiado específica para tareas que no calzan. Plantillas separadas por tipo:

### DoD — Feature nueva

```
- [ ] Implementación cubre todos los AC del Given/When/Then
- [ ] Tests funcionales (al menos 1 por escenario AC)
- [ ] Cobertura del módulo no baja
- [ ] Validación de inputs y outputs (VineJS / Zod / equivalente)
- [ ] Documentación OpenAPI generada o actualizada
- [ ] OpenSpec change archivado tras merge (si aplica)
- [ ] PR con descripción que enlaza al ticket Linear
- [ ] Review de al menos 1 humano (no solo agentes)
```

### DoD — Bug fix

```
- [ ] Test que reproduce el bug commitado **antes** del fix
- [ ] Fix implementado mínimo y enfocado (no incluye refactors no relacionados)
- [ ] Test que ahora pasa
- [ ] Análisis 5-whys breve en el ticket: ¿por qué se introdujo? ¿se podría detectar en CI?
- [ ] Si aplica, ticket de seguimiento creado para mejorar la prevención
```

### DoD — Refactor

```
- [ ] Cobertura de tests del módulo no baja
- [ ] Comportamiento observable inalterado (mismos contratos, mismos endpoints)
- [ ] PR explica la motivación arquitectónica
- [ ] No mezcla con cambios de feature
- [ ] Benchmark si afecta a paths críticos de performance
```

### DoD — Documentación

```
- [ ] Contenido revisado por al menos 1 dev del equipo (no solo IA)
- [ ] Snippets de código son ejecutables (probados localmente)
- [ ] Enlaces internos no rotos
- [ ] Versionado en el repo si es docs técnicas; en Notion si es product docs
```

### DoD — Spike / Investigación

```
- [ ] Output documentado: hallazgos, trade-offs, recomendación
- [ ] Si aplica, ADR (Architecture Decision Record) creado
- [ ] Decisión de "siguientes pasos": continuar / pivotar / cancelar
- [ ] Tiempo gastado registrado para calibrar futuros spikes
```

> 💡 **Cómo se materializan**: cada plantilla es un skill (`dod-feature`, `dod-bug`, `dod-refactor`...). El PO o el agente ejecuta el skill correspondiente al crear/cerrar el ticket. El equipo no tiene que recordar qué DoD aplica.

---

## Velocity tracking honesto en la era de IA

La métrica de velocity sigue siendo útil **si la decoras con metadata** que distinga el origen del trabajo. Esto es lo que separa equipos que aprenden de equipos que se autoengañan:

### Pattern: marcado de origen del PR

Cada PR (y cada commit) lleva una etiqueta del origen:

-   `human` — escrito por dev humano sin asistencia significativa
    
-   `human+copilot` — humano con asistencia de copiloto (modo IDE chat / completion)
    
-   `agent` — generado por agente en flujo agéntico (Claude Code, Cursor Agent, Devin)
    
-   `agent+human-review` — generado por agente, modificado significativamente por humano antes de merge
    

### Métricas que importan, segmentadas

```diagram
                 Velocity   Bugs/PR   Time-to-merge   Rework rate
─────────────────────────────────────────────────────────────────
Human only        15 SP      0.3        2.1 días        8%
Human+copilot     22 SP      0.4        1.6 días        12%
Agent             35 SP      0.9        0.8 días        28%
Agent+review      30 SP      0.4        1.4 días        15%
```

(Cifras ilustrativas; tu equipo tendrá que generar las suyas tras 4-6 sprints de tracking.)

> 🎯 **Lectura senior**: si solo miras velocity total ("hicimos 102 SP, mejor que el sprint pasado"), la conclusión es engañosa. Si miras segmentado, ves el coste real: agentes producen volumen pero con más bugs y más rework. **Esa información es la que te dice cuánto invertir en review humano**.

---

## El plan como living doc

Los roadmaps en formato gantt-papel-piedra ya no funcionan. La realidad: con IA en el flujo, las prioridades pueden cambiar mid-sprint porque algo que parecía L se reveló XL, o algo XL se hizo en un día. Patrones para mantener el plan vivo:

### Roadmap a 3-6 meses con t-shirts

```
## Q3 2026 (próximos 3 meses)

### Initiative 1: FlowSync MVP — Sincronización con Google Calendar
- Auth OAuth Google [M] · sprint 1-2
- Polling y diff de eventos [M] · sprint 2-3
- Resolución de conflictos [L] · sprint 3-4
- UI configuración [S] · sprint 4
- Edge cases (recurrentes, all-day) [S] · sprint 5

### Initiative 2: Onboarding y first-run experience
- Wizard primer setup [M] · sprint 5-6
- Templates pre-configurados [S] · sprint 6
```

> ✅ **Cada mes**: re-evalúa las t-shirts a la luz de lo aprendido. Una L que se reveló XL no se queda L; **el roadmap aprende, no es contractual**.

### Sprint planning en términos de capacity, no de items

```
## Sprint 4 (FlowSync · 2 semanas, 4 devs + 1 PO)

### Capacity neta (con buffer 30%):
- 4 devs × 7 días útiles × 1 SP/día = 28 SP base
- Buffer: 30% → comprometemos 20 SP

### Sprint goal:
"Resolver conflictos básicos de sincronización para usuarios con
calendarios sin recurrencias."

### Stories comprometidas (20 SP):
- [3] Detectar conflicto de evento simple
- [5] UI de resolución manual de conflicto
- [3] Aplicar resolución elegida
- [5] Tests E2E del flujo completo
- [2] Logging y observability del flujo
- [2] Documentación

### Stretch (no comprometidas):
- [3] Conflictos con eventos recurrentes
```

🎯 **El sprint goal es la pieza más subutilizada del scrum**. Define el **outcome único** del sprint. Si los stakeholders preguntan "¿qué se hizo?", la respuesta es el sprint goal, no la lista de tickets.

---

## Retrospectivas con IA: una herramienta, no el facilitador

La IA puede ayudar en retrospectivas analizando datos:

✅ **Útil**: pasarle a la IA los tickets cerrados del sprint + tiempos + bugs introducidos, y pedirle que identifique patrones (ej: "los tickets de tipo `auth` tardan 2× más que la media; los bugs aparecieron en 3 PRs que no tenían tests en el módulo X").

❌ **Inútil**: pedirle a la IA "facilita la retrospectiva". El valor de la retro está en que el equipo verbalice y se escuche; la IA no reemplaza eso, solo aporta data para discutir.

🛡 **Riesgo a evitar**: que la IA detecte "patrones" de individuos ("dev X tiene más bugs que dev Y"). Eso es ruido + sesgo y rompe la confianza. Configura los prompts para que mire siempre **a nivel equipo o a nivel proceso**, nunca individual.

---

## El bucle que cierra todo

```diagram
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    ┌─────────┐      ┌──────────┐      ┌──────────┐      │
│    │   PRD   │──►───│ Backlog  │──►───│  Sprint  │      │
│    │ (Notion)│      │ (Linear) │      │ (in IDE) │      │
│    └─────────┘      └────┬─────┘      └────┬─────┘      │
│                          │                  │           │
│                          ▼                  ▼           │
│                    ┌────────────┐    ┌─────────────┐    │
│                    │ Skill +    │    │  OpenSpec   │    │
│                    │ Hook AC    │    │  change +   │    │
│                    │ guardian   │    │  agente EPE │    │
│                    └────────────┘    └─────────────┘    │
│                                              │          │
│  ┌────────────┐         ┌──────────┐         │          │
│  │ Retro con  │◄────────│ Métricas │◄────────┘          │
│  │ IA-as-data │         │ por tipo │                    │
│  └─────┬──────┘         │ de origen│                    │
│        │                └──────────┘                    │
│        └───────► alimenta el siguiente refinamiento ────┘
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Cada flecha es un patrón concreto que has visto en estas 5 lecciones. La pieza que falta — el ejercicio pre-sesión — está en la siguiente lección.
