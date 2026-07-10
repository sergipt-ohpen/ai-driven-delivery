# 📄El copiloto en serio: instalación, planes y primera sesión real 🔴 — 14 min | AI-Driven Delivery

⏳ Tiempo estimado: 14 min

## Dónde estamos en el máster

Las dos sesiones anteriores establecieron las dos cosas que hacen que un copiloto rinda:

-   **S1 — Modelo mental**: el output depende más de **Herramienta + Contexto + Prompt** que del modelo subyacente. La elección de modo (completion / chat / agentic) es decisión arquitectónica.
    
-   **S2 — Método**: el flujo SDD con OpenSpec convierte un prompt vago en un contrato verificable.
    

S3 cierra ese arco bajando al **harness real**: cómo se monta, configura y opera el copiloto día a día. A partir de aquí ya no hablamos de "una IA que ayuda a programar"; hablamos del entorno técnico que orquesta esa IA.

> 💡 **Anti-solapamiento**: nada de lo que viene re-explica los 3 pilares ni qué es OpenSpec ni qué es MCP. Si algo de eso no está en pie, vuelve al pre-curso o a S1/S2 antes de seguir.

---

## Por qué dos herramientas en el máster

El máster usa **Claude Code** y **Cursor**. No porque sean "las mejores", sino porque ocupan los dos extremos del espectro práctico:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/47e6e3eb-ee6d-48c9-992d-afb0ecbf7975/a03cc85809ad0cfd.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

El objetivo no es elegir una. Es **dominar las primitivas que comparten** — ese conocimiento se transfiere a cualquier copiloto que aparezca en los próximos 18 meses.

> ⚠ Todo el contenido de esta sesión es **agnóstico**. Cuando muestre comandos concretos serán de Claude Code (la herramienta principal del máster), pero cada concepto se traduce a su equivalente en Cursor en la lección 2.

---

## Instalación

### Claude Code

Tres rutas. La nativa es la recomendada:

```
# macOS / Linux (recomendado, sin dependencias)
curl -fsSL <https://claude.ai/install.sh> | bash

# Windows PowerShell
irm <https://claude.ai/install.ps1> | iex

# Alternativa Homebrew
brew install --cask claude-code

# Alternativa npm (requiere Node 18+)
npm install -g @anthropic-ai/claude-code
```

Login con tu suscripción Pro/Max:

```
cd ~/proyectos/mi-repo-master
claude          # primer arranque: te abre una pestaña del navegador para autenticar
```

Diagnóstico rápido si algo no rema:

```
claude doctor   # comprueba versión, auth, MCP servers, permisos de archivos
```

### Cursor

Descarga desde `cursor.com/download` (macOS / Linux / Windows). En el primer arranque te ofrece importar settings y extensiones de VS Code — acepta. Sign-in con email o GitHub. Abre la carpeta de tu repo y listo.

> 💡 **Tip senior**: si trabajas en varios proyectos, Cursor permite *multi-root workspaces* desde la versión 3.0 (abril 2026). Útil cuando un cambio cruza repos.

---

## Planes y economía 2026

Esta tabla es la única "tabla de precios" que necesitas memorizar como referencia operativa. **Datos confirmados a finales de abril 2026.**

### Claude Code

![image.png](https://media1-production-mightynetworks.imgix.net/asset/17eb9fab-2134-419c-9648-a94a8b2527be/002a3b3b4b9090d7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Modelos y precios API** (útil saberlos para entender qué consume cada subagent):

![image.png](https://media1-production-mightynetworks.imgix.net/asset/0c58234d-ba8a-460a-a01a-bab76a46866a/537aa231e4a8355f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Truco de coste**: los planes incluyen *prompt caching* automático. En sesiones largas, **\>90% de los tokens son cache reads** (10% del precio input). Eso es lo que hace que el plan flat-rate sea 2-3× más barato que la API equivalente para uso continuo.

### Cursor

![image.png](https://media1-production-mightynetworks.imgix.net/asset/2424228c-c091-4f0e-8b05-817febf30acc/e5b8b4d055171631.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 🔑 **Detalle clave de Cursor**: Auto mode (Composer 2) **no consume el pool**. Ese pool sólo se gasta cuando eliges manualmente Sonnet 4.6, Opus 4.6, GPT-5.4 o Gemini 3.1 Pro. Si vives en Auto, $20/mes te da uso prácticamente ilimitado. Overage al precio API sin markup.

### Reglas pragmáticas para el alumno del máster

-   **Empieza en Pro de ambas.** $40/mes es la inversión sensata mientras dura el máster.
    
-   Si vas a Max algún mes, hazlo cuando **ya hayas saturado Pro de forma consistente** — no antes. Anthropic permite *extra usage* pay-as-you-go en Pro como tercera vía.
    
-   Tener una API key como **plan B** es buena higiene (ver lección 4: el incidente Pro de abril 2026).
    

---

## Primera sesión productiva: hello world agéntico

### Claude Code: del cero al primer cambio

Sobre tu rama personal del [repo del máster](https://github.com/LIDR-academy/full-stack-adonisjs-master):

```
cd ~/proyectos/full-stack-adonisjs-master
git checkout alumno/tu-nombre-apellido
claude
```

Dentro de la sesión interactiva:

```
> /init
```

`/init` analiza tu repo y genera (o actualiza) un `CLAUDE.md` en la raíz con:

-   Stack detectado (AdonisJS 7, React 19, SQLite, OpenSpec)
    
-   Comandos comunes (cómo arrancar back y front, cómo correr tests)
    
-   Convenciones que se infieren del código
    

Léelo. Edítalo si algo no encaja. Ese archivo es el contexto base de toda sesión futura sobre este repo. **Lo formalizamos en lección 2 cuando hablemos de** [**AGENTS.md**](http://agents.md/)**.**

Ahora un primer prompt agéntico simple para sentir el flujo:

```
> Lee el endpoint /health implementado tras la sesión 2 y proponme
  qué métricas adicionales tendría sentido exponer. Sólo análisis,
  no toques código.
```

Observa:

-   El agente lanza el subagent **Explore** automáticamente (verás algo como `[Task] Searching codebase…`).
    
-   Devuelve un resumen, no un dump de archivos.
    
-   No ha tocado código (en esta sesión interactiva, ningún tool de escritura se ejecuta sin tu aprobación por defecto).
    

### Cursor: equivalente

Abre la carpeta del mismo repo en Cursor. Cmd+L (Mac) / Ctrl+L (Windows) abre el chat. Mismo prompt. Cursor invoca su agente, que internamente hace lo mismo que Claude Code (explorar, sintetizar, devolver) pero con UI visual.

> 💡 **Calibración mental**: si el primer prompt te pareció "obvio, esto ya lo hacía", recuerda que en S1 ya estabas usando agentic mode. Lo nuevo de S3 son las 7 primitivas que controlan **cómo** lo hace. Esa lección viene a continuación.

---

## Comandos esenciales de sesión interactiva (Claude Code)

Memoriza estos 8. Cubren el 90% de lo que vas a hacer en el máster:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/263d0faf-95c7-45c5-ae0c-f1e5dfef6544/4d40cbc5f96ebb6c.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

En Cursor el equivalente vive en el **command palette** (Cmd/Ctrl+Shift+P → buscar "Plan", "Agents", "MCP"…) y en los comandos slash dentro del chat (`/multitask`, `/best-of-n`, `/worktree`, `/btw`).

---

## Anti-patrones del primer día

Errores típicos que vas a cometer (o ya estás cometiendo) en tus primeras horas con un copiloto agéntico. Reconocerlos pronto ahorra semanas:

### "Empezar sin `/init`"

**Síntoma**: abres Claude Code en el repo del máster, le pides directamente *"añade un endpoint /users/recent"* y el agente pregunta tres veces qué framework usas, qué ORM, dónde están los validators.

**Por qué pasa**: nada le dice al agente que está en un proyecto AdonisJS+Lucid+VineJS. Cada turno empieza de cero.

**Antídoto**: `/init` siempre lo primero al abrir un repo nuevo. Genera [CLAUDE.md](http://claude.md/) con el stack detectado y los comandos comunes. Costo: 30 segundos. Ahorro: cientos de turnos en el futuro.

### "El prompt-monstruo de un solo turno"

**Síntoma**: escribes un prompt de 800 palabras en el primer turno explicando exactamente cómo quieres el código, todas las restricciones, todos los casos edge.

**Por qué pasa**: vienes del paradigma "le digo todo de una vez y que lo haga". Funcionaba con ChatGPT en chat puro.

**Por qué falla**: ese prompt entra en un agente que va a iterar 30 turnos. Se diluye. Y peor: te impide aprobar/corregir cosas en mitad del camino.

**Antídoto**: prompts más cortos, con plan mode activado. Deja que el agente investigue, proponga, y *ahí* aprietas detalles.

### "Aceptar el primer plan sin leerlo"

**Síntoma**: pides plan mode, el agente devuelve un plan, lo apruebas porque "se ve bien". 30 minutos después tienes 800 líneas de código que no entiendes.

**Antídoto**: regla de oro — *"si no puedo explicar el plan a un colega en una frase, no lo entiendo"*. No apruebes hasta poder hacerlo.

### "Mantener una sesión abierta toda la tarde"

**Síntoma**: a las 6pm tu sesión lleva 80 turnos, ha cambiado de tarea 4 veces, y empieza a olvidar cosas que sabía al principio.

**Antídoto**: nuevas tareas → nueva sesión. Cargar contexto es barato ([CLAUDE.md](http://claude.md/) + skills auto-invocadas). Arrastrar contexto contaminado es caro.

> 💡 La lección 3 entra en estos patrones a fondo. Lo que importa hoy es **reconocer que el modelo de trabajo es distinto al chat tradicional**: el agente es un colaborador que itera, no un oracle que responde.
