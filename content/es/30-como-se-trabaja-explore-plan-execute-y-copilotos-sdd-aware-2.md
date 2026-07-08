# 📄 Cómo se trabaja: Explore-Plan-Execute y copilotos SDD-aware 🔴 — 22 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 22 min

## El pipeline canónico: Explore-Plan-Execute (EPE)

EPE no lo inventó nadie en concreto. Apareció en paralelo en los blogs de Anthropic (subagents, abril 2026), Cursor (Lee Robinson, "Agent best practices", enero 2026) y en las charlas de Boris Cherny (creador de Claude Code) durante el otoño 2025. Hoy es el patrón implícito que todos asumen cuando hablan de "agentic coding serio".

La idea es trivial: **separar exploración, planificación y ejecución en fases distintas, con modelos y permisos distintos**.

```
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   EXPLORE    │   →    │     PLAN     │   →    │   EXECUTE    │
├──────────────┤        ├──────────────┤        ├──────────────┤
│ Read-only    │        │ Razonamiento │        │ Edit + Bash  │
│ Modelo barato│        │ Modelo top   │        │ Auto-accept  │
│ Subagent     │        │ Plan mode    │        │ Hooks activos│
│              │        │ ──────       │        │              │
│              │        │ ↑            │        │              │
│              │        │ │ GATE       │        │              │
│              │        │ │ HUMANO     │        │              │
└──────────────┘        └──────────────┘        └──────────────┘
```

### Fase 1 · Explore (lectura, contexto aislado, modelo barato)

**Objetivo**: que el modelo principal entienda el problema *antes* de que pretenda resolverlo, sin contaminar tu sesión principal con cientos de archivos leídos.

**Implementación en Claude Code**: el subagent `Explore` (Haiku 4.5, read-only) que ya conoces. Tres maneras de invocarlo:

-   Implícita: el agente principal lo lanza al detectar que la tarea requiere búsqueda.
    
-   Explícita en el prompt: *"Antes de implementar X, usa un subagent para explorar Y..."*
    
-   Vía custom subagent (lección 2) si tienes un patrón recurrente de research.
    

**Implementación en Cursor**: chat con `/multitask` o `/best-of-n` para paralelizar exploración; los resultados aparecen en la Agents Window y se sintetizan en un summary que entra al contexto principal.

**Coste**: bajo. Haiku a $1/$5 por MTok. Una exploración típica son ~5K-15K tokens output.

### Fase 2 · Plan (razonamiento explícito, gate humano)

**Objetivo**: convertir lo aprendido en un plan ejecutable que **tú apruebas antes de tocar código**.

**Implementación**: plan mode (Shift+Tab x2 en Claude Code, Shift+Tab en Cursor). El agente sólo puede leer; tiene que producir el plan en Markdown.

**Modelo recomendado**: el más capaz disponible. Opus 4.7 si lo tienes. Sonnet 4.6 si no.

**Anti-patrón frecuente**: aprobar el plan sin leerlo. El plan es exactamente lo que vas a desperdiciar tokens en ejecutar. Léelo. Si tiene 5 pasos y 3 te parecen mal, *No, keep planning* y reformula.

> 💡 **Truco senior**: si el plan es bueno pero faltan detalles concretos, en vez de re-planear, copia el plan, edítalo a mano en tu editor, y pásalo en el siguiente turno como *"Implementa este plan exacto"*. Cursor permite editar el plan en `.cursor/plans/<feature>.md` antes de ejecutar.

### Fase 3 · Execute (escritura, hooks activos, auto-accept)

**Objetivo**: traducir el plan aprobado a código.

**Implementación**:

-   En Claude Code, salir de plan mode (Shift+Tab) → modo agéntico con auto-accept en patrones seguros y aprobación manual en operaciones destructivas (controlado por `permissionMode` y hooks).
    
-   En Cursor, dejar Composer ejecutar el plan; los diffs se muestran inline para review.
    

**Modelo**: el balanceado. Sonnet 4.6 en Claude Code, Composer 2 (Auto) en Cursor.

**Lo que tiene que estar listo**:

-   Hooks `PreToolUse` para bloquear lo peligroso (ver lección 2).
    
-   `PostToolUse` para auto-format/lint.
    
-   `Stop` para validar que tests pasan al terminar.
    

### Por qué el gate humano va entre Plan y Execute (no antes)

Tentación común: *"Quiero ver lo que el agente está leyendo en Explore antes de seguir"*.

Mala idea. Por dos razones:

1.  **Explore es barato**. Haiku leyendo 30 archivos cuesta menos de un café. Tu tiempo es más caro.
    
2.  **Mirar Explore te ata a leer 30 archivos**. El sentido de Explore es que sintetiza por ti. Si lo supervisas turn-by-turn, has perdido el ahorro de contexto.
    

El plan, en cambio, es **el momento exacto donde un error se vuelve caro**: si apruebas un plan malo, vas a desperdiciar tokens caros, ensuciar tu repo, y posiblemente romper algo. Ahí es donde mereces invertir 2 minutos en lectura.

---

## Plan mode vs agéntico directo: árbol de decisión

```
¿La tarea toca > 3 archivos?
├── Sí → PLAN MODE
└── No → ¿Tiene side-effects (DB, deploy, rm, secrets)?
           ├── Sí → PLAN MODE + hooks PreToolUse
           └── No → ¿Conoces bien la zona del código?
                      ├── No → PLAN MODE
                      └── Sí → ¿Es un fix puntual / formato / log?
                                 ├── Sí → AGÉNTICO DIRECTO (con auto-accept)
                                 └── No → PLAN MODE
```

> 📌 **Heurística operativa**: cuando dudes, plan mode. El coste de un plan extra es 30 segundos de lectura. El coste de un *Yes auto-accept* mal puesto puede ser una hora de revertir cambios.

---

## Integrar OpenSpec con el copiloto: 3 patrones SDD-aware

> En S2 trabajaste OpenSpec como método. Aquí veremos **cómo conectar las specs con el agente** durante la implementación.

El problema: tienes specs en `openspec/changes/<id>/` (proposal, specs, tasks, design), y cuando le pides al agente que implemente, hay que asegurarse de que el agente **lee y respeta** la spec, no improvisa.

Tres patrones, de menos a más control:

### Patrón A · Referencia explícita en el primer turno

El más simple y el más usado:

```
> Implementa el cambio openspec/changes/add-notifications/.
  Lee primero proposal.md, specs/*.md, design.md y tasks.md.
  Sigue tasks.md paso a paso. Pregúntame antes de desviarte
  de cualquier requisito de specs/.
```

**Pros**: zero setup, funciona en cualquier herramienta. **Contras**: tienes que recordar añadir esa coletilla. Si abres una sesión nueva y se te olvida, el agente puede improvisar.

### Patrón B · Skill SDD-aware

Lo conviertes en una skill manual:

`.claude/skills/openspec-implement/SKILL.md`:

```
---
name: openspec-implement
description: Implementa un cambio OpenSpec. Úsala cuando el prompt mencione "implementa el change <id>" o "trabaja sobre openspec/changes/<id>".
disable-model-invocation: false
allowed-tools: [Read, Edit, Write, Bash, Grep, Glob]
---

Cuando se te pida implementar un cambio OpenSpec:

1. Lee TODOS estos archivos en orden, sin excepción:
   - openspec/changes/<id>/proposal.md
   - openspec/changes/<id>/design.md (si existe)
   - openspec/changes/<id>/specs/**/*.md
   - openspec/changes/<id>/tasks.md
2. Para cada task de tasks.md, marca ☐ → en progreso, implementa, valida, marca ☑.
3. Si necesitas desviarte de algo en specs/, **detente y pregunta**. NO improvises.
4. Al terminar todas las tasks, ejecuta los tests del proyecto.
5. Cierra con un resumen: qué archivos cambiaron, qué tests pasan, qué quedó pendiente.

NUNCA modifiques archivos en openspec/. Ese directorio es input para ti, no output.
```

Invocas con `/openspec-implement` y pasas el id del change.

**Pros**: workflow explícito, repetible, auditable. **Contras**: hay que mantener la skill cuando OpenSpec evoluciona.

### Patrón C · Skill + hook validador

El más estricto. Añades un hook `Stop` que valida que **lo que se implementó coincide con la spec**:

`.claude/settings.json`:

```
{
  "hooks": {
    "Stop": [
      {
        "matcher": "*",
        "type": "command",
        "command": "scripts/validate-against-spec.sh $CLAUDE_LAST_OPENSPEC_CHANGE"
      }
    ]
  }
}
```

Donde `validate-against-spec.sh` corre los tests de aceptación derivados de specs/. Si falla (exit 2), el agente recibe el error y entra en loop de reparación.

**Pros**: el ciclo se cierra solo. El agente no puede declarar "hecho" sin que la spec valide. **Contras**: requiere infra de validación. Reservado para flujos productivos.

> 💡 **Recomendación para el máster**: empieza con A. Cuando notes que copias-pegas la misma coletilla 3 veces, salta a B. C lo verás en sesiones posteriores cuando hablemos de CI/CD asistido.

### Patrón complementario · README-driven development

Simon Willison ha popularizado este patrón en *Agentic Engineering Patterns* (febrero 2026): **escribe el README/spec antes de pedirle al agente que implemente**, con tanto detalle como puedas, incluyendo casos edge. Luego pides al agente que implemente *con TDD red/green* a partir del README.

Es esencialmente lo mismo que SDD pero más informal y aplicable a cualquier scope (un script de 50 líneas, no solo un change formal). Útil cuando OpenSpec es overkill.

---

## Anti-patrones que vas a ver (y cómo evitarlos)

### 1 · El "vibe coding ride-along"

**Síntoma**: aceptas todos los planes y diffs sin leerlos. La sesión avanza rápido. Al final del día tienes 3000 líneas nuevas que no entiendes.

**Por qué pasa**: el flujo es agradable. El agente parece competente. El feedback inmediato es positivo (tests pasan, build funciona).

**Por qué es mal**: ese código va a producción con tu nombre en el commit. Cuando algo rompa, no sabrás por dónde empezar a debuguear porque nunca tuviste el modelo mental.

**Antídoto**: regla del *"explica el plan en una frase antes de aprobar"*. Si no puedes explicarle el plan a un colega en una frase, no lo entiendes lo suficiente.

### 2 · Sobre-promptear con hooks ya activos

**Síntoma**: tienes hooks `PreToolUse` que bloquean rm -rf, y aun así escribes en cada prompt *"Por favor no borres archivos sin preguntar"*.

**Por qué es mal**: el prompt ocupa contexto. El hook ya hace el trabajo. Estás pagando dos veces por la misma garantía.

**Antídoto**: si una invariante está en hooks, **no la repitas en** [**CLAUDE.md**](http://claude.md/) **ni en el prompt**. Y al revés.

### 3 · Confiar en el plan inicial sin re-validar tras Explore

**Síntoma**: pides un plan en frío sin que el agente haya explorado primero. El plan asume cosas falsas sobre tu codebase.

**Antídoto**: siempre `Explore → Plan`. Nunca `Plan` sin contexto. Si el agente no ha leído código, su plan es ficción.

### 4 · Sesión zombi de 6 horas

**Síntoma**: llevas 6 horas en la misma sesión, has cambiado de tarea 4 veces, y el agente empieza a olvidar cosas que sabía al principio.

**Por qué pasa**: context rot (S1, regla 50/70/90).

**Antídoto**: nuevas tareas → nueva sesión. La inversión de re-cargar contexto vía [CLAUDE.md](http://claude.md/) y skills es **mucho menor** que el coste de arrastrar contexto contaminado.

### 5 · MCP servers acumulados sin uso

**Síntoma**: tienes 12 MCP servers configurados. Solo usas 3.

**Por qué es mal**: cada server consume tokens en cada turno (el agente tiene que conocer las tools que expone). Estás pagando por tools que no usas.

**Antídoto**: `claude mcp list` periódicamente. Quita lo que no uses. La nueva feature *MCP Tool Search* hace lazy-loading; si tu versión la soporta, actívala.

---

## Gestión avanzada de context rot

> S1 ya cubrió la regla 50/70/90 (degrada / compacta / reset). Aquí van las tácticas operativas concretas para sesiones largas reales.

### Táctica 1 · Subagents para exploración pesada

Si el primer instinto es *"voy a leer estos 20 archivos"*, no lo hagas en la sesión principal. Delega a Explore. La sesión principal recibe el resumen, no los 20 archivos.

### Táctica 2 · Hook SessionStart con contexto fresco

Cada sesión nueva, el hook inyecta:

```
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log -1 --oneline)"
echo "Open changes (OpenSpec): $(ls openspec/changes/ 2>/dev/null | head -5)"
git status --short | head -10
```

Eso te ahorra los primeros 3-4 turnos de "¿en qué estábamos?".

### Táctica 3 · `/compact` con hint específico

`/compact` por sí solo deja al agente decidir qué resumir. Hints:

```
> /compact mantén el plan de la migración auth y los tests que ya pasan; descarta la conversación sobre el bug de logging que ya resolvimos
```

Resultado: el resumen post-compact preserva exactamente lo que sigue siendo útil.

### Táctica 4 · `/clear` cuando es más rápido empezar de nuevo

Si has corregido el plan dos veces y sigue mal: **/clear y reescribe el prompt**. Casi siempre es más rápido que seguir negociando con un contexto que ya está corrupto.

> 💡 **Heurística**: si llevas 10+ turnos y sientes que estás "luchando con el agente", es probable que el contexto esté contaminado. /clear, recarga [CLAUDE.md](http://claude.md/) (auto), reformula el prompt incorporando lo aprendido.

### Táctica 5 · Skills sobre instructions one-shot

Las skills tienen una propiedad sutil que [CLAUDE.md](http://claude.md/) no: **persisten en auto-compact**. Cuando el agente compacta, las skills invocadas se vuelven a inyectar (los primeros 5K tokens de cada una, dentro de un budget compartido de 25K).

Implicación: si una instrucción **debe sobrevivir compactación**, ponla como skill. Si solo la necesitas una vez, prompt directo.

---

## Caso end-to-end · Aplicar EPE a una tarea real del repo del máster

Vamos a recorrer el pipeline completo sobre una tarea concreta: añadir un endpoint `GET /api/v1/users/active` que devuelva los usuarios autenticados en las últimas 24 horas. El repo es el de S2 (AdonisJS+React+OpenSpec).

### Setup previo (~30 segundos)

```
cd ~/proyectos/full-stack-adonisjs-master
git checkout alumno/tu-nombre-apellido
git pull
claude
```

### Fase 1 · Explore (~2 min)

Tu primer prompt no pide código. Pide entendimiento:

```
> Antes de implementar nada, usa un subagent para investigar:
  1. Cómo está estructurado actualmente el módulo de users
     (controllers, models, validators, transformers).
  2. Cómo se está midiendo "actividad" del usuario hoy
     (campo en BD, middleware de tracking, logs?).
  3. Si hay algún endpoint similar (paginación, filtrado por fecha)
     del que podamos copiar el patrón.

Devuélveme un brief con findings + open questions.
```

El agente lanza un Explore (Haiku, read-only). En ~2 minutos tienes un resumen tipo:

```
FINDINGS:
- Users en app/models/User.ts con last_seen_at (timestamp).
  Se actualiza en middleware app/middleware/track_activity.ts.
- Patrón de listado con filtros en UserController.list() — usa
  query builder de Lucid con .where('created_at', '>', ...).
- AccessTokenController tiene un patrón similar para tokens
  recientes — ver getRecentTokens().

OPEN QUESTIONS:
- ¿"Activos en 24h" significa last_seen_at > now-24h, o sesión
  iniciada en últimas 24h?
- ¿Devolver datos completos o sólo {id, name, last_seen_at}?
```

Tú respondes esas open questions. Eso es el cierre de la fase Explore.

### Fase 2 · Plan (~3 min)

Activas plan mode (Shift+Tab x2):

```
> Plan: añade endpoint GET /api/v1/users/active siguiendo el patrón
  de getRecentTokens. Filtro: last_seen_at > now-24h. Respuesta:
  {id, name, email, last_seen_at}. Auth: token requerido.
  Necesito test de integración que cubra el caso vacío y el caso
  con 3 usuarios mezclando recientes/antiguos.
```

El agente devuelve un plan estructurado:

```
1. Añadir método UserController.listActive() siguiendo patrón de
   AccessTokenController.getRecentTokens():
   - Validar auth en route guard
   - Query con Lucid: User.query().where('last_seen_at', '>', ...)
   - Map a UserTransformer (excluir password_hash, secrets)
2. Registrar ruta GET /api/v1/users/active en start/routes.ts
3. Test en tests/functional/users_controller.spec.ts:
   - Caso vacío
   - Caso con 3 users (2 activos, 1 antiguo)
4. Actualizar UserTransformer si hace falta exponer last_seen_at

Archivos afectados:
  app/controllers/UserController.ts (modificar)
  start/routes.ts (modificar)
  tests/functional/users_controller.spec.ts (modificar)
  app/transformers/UserTransformer.ts (verificar)
```

**Aquí tu trabajo real**: léelo. ¿Coincide con lo que esperabas?

-   ¿Sigue el patrón existente? Sí (referencia getRecentTokens explícita).
    
-   ¿Excluye datos sensibles? Sí (excluye password\_hash, secrets).
    
-   ¿Cubre los tests que pediste? Sí.
    

Si todo OK → **Yes, manually approve each tool call** (no auto-accept hasta que veas cómo se comporta en este repo).

### Fase 3 · Execute (~5 min)

Sales de plan mode (Shift+Tab). El agente implementa archivo por archivo. Tú apruebas cada Edit.

Hooks que tienes activos (de lección 2):

-   `PostToolUse` ejecuta `npm run lint` cada vez que se edita un `.ts` (auto-format + lint).
    
-   `Stop` corre `npm test` al finalizar.
    

Si los tests pasan, el ciclo termina con un resumen del agente:

```
✓ UserController.listActive implementado
✓ Ruta registrada
✓ 2 tests añadidos, ambos pasan
✓ Lint clean

Cambios listos para commit.
```

### Reflexión sobre el ciclo completo

Tiempo total: ~10 min. Tiempo si lo hubieras hecho a mano: 30-45 min. Pero esa no es la métrica importante. La métrica es:

-   **Tu carga cognitiva**: te concentraste en el *qué*, no en el *cómo*. Decidiste el contrato del endpoint, no escribiste boilerplate.
    
-   **Auditabilidad**: el plan está en el chat, los hooks dejaron logs, el git diff es revisable. Si en una semana algo va mal, puedes reconstruir por qué se decidió así.
    
-   **Calidad**: los tests existen porque los pediste explícitamente en el plan. El patrón coincide con el resto del codebase porque el Explore lo vio.
    

Eso es el *uplift real* de un copiloto bien usado: no escribir más rápido el mismo código, sino **subir el nivel de abstracción al que operas**.
