# 📄 PM tools + IA en 2026 🔴— 13 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 13 min

## El ecosistema en una hoja

El paisaje de PM tools en 2026 se reorganizó alrededor de tres ejes nuevos:

1.  **¿Tiene agentes nativos integrados?** (no solo "AI summary", sino agentes que ejecutan trabajo)
    
2.  **¿Tiene MCP server oficial estable?** (cómo lo enchufas a Claude Code/Cursor)
    
3.  **¿Está pensada para devs o para PMs/ops?** (UX y modelo de datos)
    

Tabla rápida (datos verificados abril 2026):

![image.png](https://media1-production-mightynetworks.imgix.net/asset/325ad8ca-31db-4cc9-8cb1-1c3c714605ff/d55b8d76552b434c.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ **Datos a verificar al ejecutar la sesión**: el ecosistema cambia rápido. Lo de arriba está validado a abril 2026 con changelogs oficiales. Si haces esta sesión 6 meses después, vuelve a verificar las versiones (sobre todo de los agentes que son beta).

---

## Linear — la herramienta del máster

Para AI4Devs vamos a trabajar con **Linear**. No es preferencia estética; son razones concretas:

✅ **Free tier suficiente** para el proyecto FlowSync. Hasta 250 issues activos y 10 usuarios, sin pedir tarjeta.

✅ **Linear Agent** (beta, marzo 2026) está construido específicamente para flujos dev-IA. Skills, automations, integración con Cursor/Devin/coding agents.

✅ **MCP server oficial maduro**, integración directa desde Claude Code y Cursor. Sin proxy, sin Composio, sin paso intermedio.

✅ **Modelo de datos opinionado** que coincide con la pirámide PRD → Epic (initiatives) → Issue (story) → Sub-issue (task). No hay que enseñarle al equipo el modelo.

✅ **Velocidad operativa** — el caso de uso "abrir Linear, encontrar el ticket, modificarlo, cerrarlo" es 3-5× más rápido que en Jira.

✅ **GitHub integration nativa**: PR ↔ ticket bidireccional, sin webhooks que mantener.

❌ **No es Jira**. Para empresas que ya viven en Jira, Rovo es la opción. Lo veremos abajo.

🎥 **Vídeo recomendado** — *Project scoping with Linear Agent* (~3 min, EN, oficial Linear, marzo 2026). Cómo el agente convierte contexto del workspace en un proyecto totalmente scoped en minutos. Directo y con timestamps.

📺 [https://www.youtube.com/watch?v=DF1vSmPYqzs](https://www.youtube.com/watch?v=DF1vSmPYqzs)

> 📌 **Para los alumnos**: cread cuenta gratuita en [linear.app](http://linear.app/) antes de la sesión en vivo. La invitación al workspace AI4Devs llegará vía email del programa.

---

## Linear Agent — qué hace en marzo-abril 2026

Esto es lo que se demuestra en la Demo 1 de la sesión en vivo, pero conviene que llegues con el modelo mental:

-   **Investiga issues**: "@Linear find all bugs related to authentication that we closed in the last 3 months and summarize the patterns"
    
-   **Crea issues desde conversación**: "Make issues based on this discussion" (en Slack o en un comentario)
    
-   **Skills reusables**: workflows que el equipo guarda, ejecutables con slash command. Ej: skill "decompose-prd-section" que abre 8 issues desde una sección de un PRD.
    
-   **Automations en triage**: cada issue nuevo entra a un flujo que la IA pre-clasifica y enruta.
    
-   **MCP integration con tools externos**: Linear Agent puede consultar GitHub, Slack, datos de tu producto, etc., para tomar decisiones con contexto.
    

> ⚠ **Linear Agent es beta**. Espera bugs ocasionales (no es producción). En la demo en vivo siempre hay un fallback manual; lo verás.

---

## Jira + Rovo — el setup enterprise

Si tu empresa ya vive en Jira, no tiene sentido migrar. Atlassian se ha puesto al día con Rovo y los agentes:

-   **Rovo Search + Chat**: capa de búsqueda y chat sobre Jira/Confluence/JSM/conectados. 5M MAU según el shareholder letter de Q2 FY26.
    
-   **Agents in Jira (open beta, feb 2026)**: puedes asignar issues a agentes (Rovo o de terceros vía MCP). Iteración por comentarios, los agentes son ciudadanos de primera clase.
    
-   **Rovo MCP Server (GA, feb 2026)**: endpoint oficial alojado por Atlassian para conectar Claude Code, Cursor, ChatGPT, Gemini, Copilot, etc., a tu workspace.
    

🛠 **Configuración para Claude Code** (referencia, no es del taller):

```
{
  "mcpServers": {
    "atlassian": {
      "type": "sse",
      "url": "<https://mcp.atlassian.com/v1/sse>"
    }
  }
}
```

Auth vía OAuth. Los devs reportan en la community de Atlassian (enero-marzo 2026) que la re-autenticación es frecuente; algunos prefieren skill custom con `acli` antes que el MCP oficial directo. Si trabajas con Atlassian, evalúa ambas vías.

> 💡 **Lectura sobre Rovo**: lo importante de Rovo es que materializa el patrón "agente como teammate" dentro de tools enterprise existentes, sin pedir cambio de plataforma. **La adopción la marca el ecosistema, no la calidad técnica**: si tu empresa tiene 2000 personas en Jira, Rovo es el camino.

---

## Notion + IA — para el contenido, no para el sprint

Notion sigue siendo el mejor sitio para PRDs, documentación, wikis. Su capa de IA (Notion AI + agents) es decente para generar contenido y buscar entre páginas. **No es buena para sprint planning operativo**: el modelo de datos es demasiado libre, no hay concepto fuerte de issue/sprint/cycle.

Patrón razonable:

-   **Notion**: PRD, decisiones arquitectónicas, retrospectivas, postmortems.
    
-   **Linear o Jira**: backlog, sprints, issues activos.
    
-   **MCP en ambos**: que Claude Code pueda leer el PRD de Notion **y** crear issues en Linear desde el mismo prompt.
    

Eso es lo que vamos a configurar en la Demo 1.

---

## ClickUp, Asana, Monday — el segmento "PM no-dev"

Las tres tienen capa de IA agresiva en marketing pero se quedan más cerca del nicho PM clásico (timelines, gantt, dashboards) que del flujo dev-IA. Si tu equipo no es 100% técnico y tienes PMs/marketers/ops mezclados, son razonables. Para AI4Devs no las usamos porque el foco es flujo dev.

> 📌 **No es que sean malas**. Es que su superficie no se diseñó alrededor de "el agente vive en el board". Eso lo notarás cuando intentes integrarlas con Claude Code.

---

## GitHub Projects — gratis, integrado, mínimo

Para proyectos solo personales o muy pequeños, GitHub Projects + el MCP de GitHub es una combinación válida y gratis:

```
claude mcp add github
```

Pros:

-   ✅ Gratis sin limitaciones
    
-   ✅ Integración perfecta con repo, PRs, issues
    
-   ✅ MCP de GitHub bien mantenido
    

Contras:

-   ❌ Modelo de datos pobre (solo issues + projects, no hay initiatives, sprints como concepto, ni cycles)
    
-   ❌ UX de planning débil (no es planning poker, no es velocity tracking)
    
-   ❌ No tiene agente nativo PM-aware
    

Para FlowSync vamos con Linear. Pero si después de S4 quieres replicar el patrón en un proyecto personal y no quieres pagar nada, GitHub Projects + Claude Code MCP funciona.

---

## Patrones de integración: read-only, write, two-way

Cuando configures la conexión Claude Code ↔ tu PM tool, hay tres niveles de permiso. Elige conscientemente:

### Read-only

```diagram
Claude Code ──► (read) ──► Linear/Jira
```

El agente solo puede leer. Útil para **research, summaries, generar reports**. No puede crear, modificar, ni cerrar issues. Es el mínimo riesgo. Lo recomiendo como entrada para cualquier equipo nuevo.

### Write (controlado)

```diagram
Claude Code ──► (read + create) ──► Linear/Jira
```

El agente puede leer y crear, pero no modificar/cerrar/mover. Útil para **bulk creation** desde un PRD, generar tickets de bugs a partir de logs, etc. El humano sigue siendo el que cierra y prioriza.

### Two-way (full)

```diagram
Claude Code ──► (read + create + update + close) ──► Linear/Jira
```

El agente puede hacer todo. **Riesgo real de perder tickets accidentalmente** si el prompt es ambiguo. Reserva esto para skills/automations específicas con scope acotado, no para uso interactivo.

> 💡 **Patrón senior**: empieza siempre read-only en un nuevo equipo. Sube a write cuando lo necesites. Two-way solo en automations específicas, no en uso ad-hoc.

---

## Riesgos del ecosistema MCP en PM tools

Mención obligada: el ecosistema MCP tuvo varios issues de seguridad en los últimos meses. No es para asustar, es para que los seniors lo sepan:

-   ⚠ **CVE en** `sooperset/mcp-atlassian` (RCE crítico, parchado en v0.17.0). Si usas un MCP no oficial, verifica versión.
    
-   ⚠ **MCP STDIO vulnerability** (abril 2026): la transport STDIO ejecutaba comandos en algunos casos incluso con servidor caído. Afectó muchos servidores.
    
-   ⚠ **Prompt injection en MCPs no oficiales**: si conectas Claude Code a un MCP de Notion no oficial y alguien mete instrucciones maliciosas en una página, el agente las puede ejecutar.
    

🛡 **Guardrails operativos**:

1.  **Usa MCPs oficiales cuando existen** (Linear, Atlassian Rovo, GitHub).
    
2.  **Lee el código de los MCPs comunidad antes de usarlos en algo serio**.
    
3.  **Mantén los MCPs en versión actual** (los CVE se parchan; tu versión old no).
    
4.  **Los hooks de seguridad de Claude Code** (S3) pueden interceptar llamadas peligrosas — úsalos.
    

---

## Decisión operativa AI4Devs

```diagram
┌──────────────────────────────────────────────────┐
│ Stack PM para FlowSync (este proyecto):          │
│                                                  │
│   📝 Notion       — PRD, docs, decisiones        │
│   🎯 Linear       — backlog, sprints, issues     │
│   🤖 Linear MCP   — agente conectado a Claude    │
│   🐙 GitHub       — código y PRs (vinculados)    │
│                                                  │
│ Permisos iniciales:                              │
│   • Linear MCP: read + create                    │
│   • GitHub MCP: read-only                        │
│   • Notion MCP: read-only                        │
│                                                  │
│ Subimos a write/two-way cuando demostremos que   │
│ los skills generan tickets de calidad.           │
└──────────────────────────────────────────────────┘
```
