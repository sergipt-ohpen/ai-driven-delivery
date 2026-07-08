# 📄 Decisiones de senior: cuándo qué, costes reales, gobernanza 🔴 — 20 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 20 min

## Claude Code vs Cursor: matriz decisional concreta

La pregunta no es "cuál es mejor". Es "cuál usas para esta tarea ahora mismo". Tabla de campo:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/d3cc7978-8af5-48cf-9093-f6cdf2a92dc2/56cd7e0f88a67f3b.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Patrón normal de un senior productivo**: ambos abiertos. Cursor para la edición fina del archivo activo. Claude Code en una pestaña de terminal aparte para tareas largas en background. El "composable AI coding stack" de The New Stack no es metáfora — es la realidad operativa.

---

## Plan recomendado por perfil

![image.png](https://media1-production-mightynetworks.imgix.net/asset/7c170771-8729-442c-a0d1-caebd7237b3a/f7ae0ad06c11d054.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 📌 **Regla de bolsillo**: el upgrade tiene sentido cuando **te interrumpe el trabajo más de 2 veces por semana**. Si no, Pro + extra usage en spike weeks es más barato.

---

## Tácticas anti-quema-presupuesto

Aplicables a Claude Code (donde el coste es más visible):

### 1 · Caching automático ya activo

Los planes incluyen prompt caching. **\>90% de los tokens en sesiones largas son cache reads** (10% del precio). No hay que hacer nada para activarlo, pero sí dos cosas para aprovecharlo:

-   Mantén [CLAUDE.md](http://claude.md/) estable durante una sesión (cambiarlo invalida el cache).
    
-   Empieza prompts del mismo proyecto con la misma estructura (el cache busca prefix match).
    

### 2 · Modelo barato para Explore

Por defecto el subagent Explore usa Haiku 4.5 ($1/$5). Si un custom subagent tuyo no requiere razonamiento sofisticado, ponle `model: haiku` en el frontmatter. La diferencia entre Haiku y Sonnet en tareas de búsqueda es despreciable.

### 3 · Batch processing para tareas no urgentes

La API de Anthropic tiene batch processing con **\-50% en input/output**. Útil para:

-   Generar tests para 50 funciones.
    
-   Migrar 100 archivos al nuevo estilo.
    
-   Procesar logs históricos.
    

No usable para sesión interactiva, pero perfecto para scripts que tú lances overnight.

### 4 · `/compact` antes de tareas largas

Si vas a iniciar una tarea larga (refactor, migración) y el contexto ya tiene 80% de capacidad usada de una sesión anterior, **/compact primero**. Trabajar sobre contexto inflado triplica los tokens por turno.

### 5 · Auditar `/mcp list` mensualmente

Cada MCP conectado consume tokens en cada turno (el agente conoce las tools que expone). Quita lo que no uses. La feature *MCP Tool Search* (cuando esté disponible en tu versión) hace lazy-loading.

### 6 · Modo `-dangerously-skip-permissions` con criterio

En tareas mecánicas y seguras (formato, generación de tests, refactor trivial), saltar el prompt de permisos en cada operación ahorra tiempo *y* tokens (cada prompt de permiso es un turn extra). **Solo si tienes hooks** `PreToolUse` **que protejan lo destructivo.** Sin hooks, esto es ruleta rusa.

---

## Riesgo y gobernanza: lecciones del incidente Pro de abril 2026

El **21-22 de abril de 2026** Anthropic actualizó silenciosamente la página de pricing eliminando Claude Code del plan Pro y dejándolo solo en Max ($100+). En 24 horas Reddit, Hacker News y X explotaron. Anthropic revirtió el cambio y aclaró que era *"un test A/B en aproximadamente 2% de nuevos signups prosumer"* mal coordinado con la actualización de docs y landing page.

Resultado: hoy (29 abril 2026) Claude Code **sí está incluido en Pro**. Pero el incidente dejó tres lecciones operativas:

### Lección 1 · No dependas de un único plan/herramienta

**Plan B mínimo viable**:

-   Una API key de Anthropic (gratis crear, $5 de crédito inicial).
    
-   Capacidad mental de cambiar a Cursor para tareas IDE-friendly.
    
-   Repos auto-contenidos ([CLAUDE.md](http://claude.md/) / [AGENTS.md](http://agents.md/) / `.claude/skills/`) que se mueven con el repo, no con la herramienta.
    

### Lección 2 · Lo que tienes hoy puede no ser lo que tendrás mañana

Amol Avasare (Head of Growth de Anthropic) admitió tras el incidente que *"engagement per subscriber is way up... our current plans weren't built for this"*. Traducción: vas a ver más cambios de pricing en los próximos 12 meses. **Tu seguridad no está en el plan, está en que tu workflow sea portable.**

### Lección 3 · La auditabilidad importa más que la velocidad

Cuando algo cambia en la herramienta, lo que sigue funcionando es **lo que tienes versionado en tu repo**: [CLAUDE.md](http://claude.md/), [AGENTS.md](http://agents.md/), `.claude/`, `.cursor/rules/`. Eso es tuyo y se mueve contigo. **Los hooks deterministas** valen más que un buen prompt cuando la herramienta tiene un release malo (como el bug del v2.1.100 con inflación de tokens en marzo, o los tres bugs en el harness reportados el 24 de abril por Anthropic).

---

## Hooks como auditabilidad para enterprise

Si trabajas en un entorno donde hace falta justificar qué tocó el agente y por qué, los hooks son tu mejor amigo.

### Hook básico de auditoría

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "type": "command",
        "command": "echo \\"$(date -u +%FT%TZ) | $CLAUDE_TOOL | $CLAUDE_FILE | $CLAUDE_USER\\" >> .claude/audit.log",
        "async": true
      }
    ]
  }
}
```

Resultado: `.claude/audit.log` con cada tool ejecutado, archivo afectado, timestamp y usuario. Versionable. Auditable.

### Hook de bloqueo por política

```
{
  "matcher": "Edit:**/secrets/**",
  "type": "command",
  "command": "echo 'Política: agente no edita secrets/' && exit 2"
}
```

Si el agente intenta tocar `secrets/`, el hook bloquea con exit code 2 y el modelo recibe el error. La política se cumple por construcción, no por interpretación.

> ⚠ **Distinción importante**: lo que vive en [CLAUDE.md](http://claude.md/) es **interpretado** por el modelo. Lo que vive en hooks es **ejecutado** por código. Para invariantes de seguridad/compliance, siempre hooks.

---

## Cómo encaja con tu equipo

### [AGENTS.md](http://agents.md/) como source of truth compartido

Si más de una persona toca el repo:

-   `AGENTS.md` **commiteado** en el repo. Reglas que aplican a todos: convenciones de naming, comandos de build/test, restricciones de seguridad.
    
-   `.claude/skills/` **y** `.claude/agents/` **commiteados**. Workflows del equipo.
    
-   `CLAUDE.md` **como symlink** a `AGENTS.md`.
    

### Lo que NO se comparte

-   `~/.claude/` **(user-level)**: tus preferencias personales (output style favorito, skills tuyas).
    
-   `.claude/settings.json` **con scope local**: tus credenciales MCP.
    
-   **Tu** `.env` **y secrets**: jamás.
    

### PRs sobre skills y [AGENTS.md](http://agents.md/)

Trata los archivos del agente como código:

-   Cambios a `AGENTS.md` van en PR como cualquier otro.
    
-   Skills nuevas se revisan (sobre todo si tienen `disable-model-invocation: false` — auto-invocan).
    
-   Hooks se revisan **siempre** (ejecutan código en máquinas de tu equipo).
    

### Code review asistido en el equipo

Patrón emergente que vas a ver más en próximas sesiones:

1.  PR abierta → trigger CI.
    
2.  CI lanza Claude Code (o Copilot Coding Agent) en modo plan sobre el diff.
    
3.  El agente devuelve feedback como comentario de PR.
    
4.  Tú haces el review humano sabiendo que ya tienes una primera pasada.
    

GitHub Agent HQ (febrero 2026) consolida este flujo permitiendo asignar el mismo issue a Claude, Codex o Copilot desde la UI de GitHub.

---

## Lo accionable de S3 — las 5 cosas que cambian desde mañana

1.  **Convierte tu** [**CLAUDE.md**](http://claude.md/) **en un symlink a** [**AGENTS.md**](http://agents.md/)**.** 30 segundos. Tu repo se vuelve compatible con Cursor, Copilot, Codex y cualquier copiloto futuro.
    
2.  **Memoriza el árbol de decisión Plan Mode.** Tareas que tocan >3 archivos o tienen side-effects: plan mode siempre.
    
3.  **Crea tu primer custom subagent.** El que sea (research, code-review, test-writer). Te da la sensación de control real sobre el harness.
    
4.  **Audita tus MCP servers.** `claude mcp list`. Quita lo que no usas. Los tokens importan.
    
5.  **Practica el patrón EPE en una tarea pequeña esta semana**. Explore (subagent) → Plan (apruebas) → Execute (con hooks). Sin saltarte fases.
    

---

## Un lunes típico con copilotos · narrativa de uso real

Para aterrizar todo lo aprendido, este es un lunes razonable de un dev del máster en su trabajo real, usando lo que se vio en S3. No es ficción aspiracional: es la combinación natural de las primitivas cuando ya te son cómodas.

### 9:00 — Empieza el día

Abres tu repo del trabajo. Tienes tres tareas para hoy: investigar un bug intermitente en producción, refactorizar el módulo de notificaciones y revisar dos PRs del equipo.

Abres dos terminales con `tmux`. En la primera, Claude Code:

```
$ cd ~/work/payments-service
$ claude
```

El hook `SessionStart` que tienes configurado inyecta automáticamente el branch actual, los últimos 3 commits y el output de `git status`. El agente ya sabe en qué estás.

### 9:05 — Bug intermitente (Explore puro)

```
> Tenemos un bug en producción: el endpoint /webhooks/stripe falla
  con timeout aleatoriamente, ~1 de cada 50 requests. Usa subagents
  paralelos para:
  1. Buscar todos los lugares donde se hace I/O bloqueante en ese
     endpoint y sus dependencias.
  2. Revisar los últimos 30 días de logs (MCP de Sentry está conectado)
     buscando patrones temporales en los timeouts.
  3. Comprobar si hay locks de DB sospechosos (MCP postgres).
  Sintetiza findings + 3 hipótesis ordenadas por probabilidad.
```

El agente lanza tres Explores paralelos. Mientras corren (3-4 min), tú abres Cursor en otra pantalla y empiezas a leer una de las PRs del equipo.

A las 9:09 vuelves al terminal: el agente ha sintetizado tres hipótesis. La #1 (lock contention en `payment_intents` cuando hay >10 webhooks concurrentes) tiene evidencia en logs *y* en el query plan. **Tienes que decidir si invertir tiempo en validarla o en las otras dos**.

Decides validar. Pero no aquí, no ahora — abres un issue con los findings copiados y lo asignas a alguien con más contexto del módulo. Tu tiempo en el bug ha sido 4 minutos. Antes habrían sido 90.

### 9:30 — Refactor de notificaciones (EPE completo)

Vuelves a Claude Code. La tarea importante del día es refactorizar el módulo de notificaciones para soportar múltiples canales (email, SMS, in-app).

```
> /plan
> Quiero refactorizar app/services/notifications/ para que soporte
  múltiples canales. Spec: ya tenemos openspec/changes/multi-channel-notifications/.
  Lee proposal.md, design.md, specs/ y tasks.md primero.
  Sigue tasks.md paso a paso. Pregúntame antes de desviarte.
```

El agente lee la spec (que tu equipo escribió la semana pasada en SDD) y devuelve un plan de implementación de 12 pasos.

Lees el plan. Hay un paso #7 que inquieta: el agente quiere mover una clase de `app/services/` a `app/lib/` y eso podría romper imports en otros módulos. Pides:

```
> Antes del paso 7, verifica con un Explore si esa clase es importada
  desde fuera de app/services/. Si lo es, propón estrategia de migración
  gradual.
```

El Explore confirma que sí: 4 imports externos. El agente propone una migración con re-exports temporales y un TODO para limpieza posterior. Apruebas el plan modificado.

Sales de plan mode. El agente ejecuta. Tú vuelves a Cursor y sigues con la PR review.

A las 11:00 el agente termina. Los tests pasan (hook `Stop` lo verifica). Revisas el diff: está limpio. Commit, push, PR.

### 11:15 — PRs del equipo (Cursor + agente de review)

Vuelves a Cursor. Tu equipo tiene dos PRs esperando review.

Para cada PR, abres el branch en Cursor y ejecutas tu skill de review (que tienes commiteada en el repo del equipo):

```
> /review-pr
```

La skill (que vimos en lección 2) lee el diff, revisa contra `AGENTS.md`, y devuelve hallazgos por severidad. Tú revisas los hallazgos del agente — no para confiar ciegamente, sino para que tu review humana parta de un baseline.

En ~15 minutos has revisado dos PRs con la calidad de antes y la mitad del tiempo. Apruebas una con cambios menores; pides cambios concretos en la otra (con feedback que el agente identificó pero que tú validaste y articulaste como humano).

### 12:30 — Comida

Cierras Claude Code. Cierras Cursor. Comer.

### 14:30 — Tarea creativa donde Cursor brilla

Vuelta. Toca diseñar un componente nuevo de UI: un dashboard de notificaciones agrupadas por canal.

Esta es tarea de Cursor, no de Claude Code. Abres el archivo del componente, usas Tab para autocompletar la estructura básica de React, y pides al chat:

```
> Implementa este componente siguiendo nuestros patrones de design
  system (revisa @file:components/ui/ para referencias).
  Datos vienen del nuevo endpoint que añadí esta mañana
  (/api/notifications/grouped).
```

Composer 2 itera con el browser tool integrado. Tú ves el preview en tiempo real, pides ajustes ("más espaciado", "que el badge sea outline en lugar de solid"), y el componente queda en 20 minutos. Tab para detalles finos, Composer para estructura. Esto Claude Code en terminal lo haría peor.

### 15:30 — Reflexión

Has hecho en 6 horas lo que antes te costaba 9-10. Pero la diferencia importante no está en velocidad. Está en:

-   **Concentración**: cada herramienta hizo lo suyo. No saltaste de contexto innecesariamente.
    
-   **Calidad**: hooks de validación, tests automáticos, plan revisado antes de ejecutar.
    
-   **Energía**: terminas el día con energía mental, no agotado de cargar boilerplate en tu cabeza.
    
-   **Auditabilidad**: si dentro de un mes alguien pregunta por qué moviste esa clase, hay log de la conversación, hay plan aprobado, hay tests.
    

Eso es S3 aplicado.

> 💡 **Lo que falta en este lunes**: Cowork (sesiones async largas), Agent Teams (multi-agente coordinado), automations de Cursor (cron + Slack). Esos son patrones más avanzados que se ven en sesiones posteriores. Lo que viste hoy es lo *core*: EPE, primitivas, herramienta correcta para cada momento.
