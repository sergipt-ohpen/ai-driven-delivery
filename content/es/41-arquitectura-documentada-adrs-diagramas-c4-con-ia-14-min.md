# 📄 Arquitectura documentada: ADRs + diagramas C4 con IA 🔴— 14 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 14 min

## Por qué los diagramas y ADRs mueren primero

La documentación de arquitectura es la primera en desactualizarse y la más costosa de no tener. Los diagramas de PowerPoint del kick-off quedan obsoletos en el primer sprint de refactor. Los ADRs que nadie escribe se convierten en conversaciones de Slack que nadie encuentra dos años después.

El problema no es falta de voluntad — es fricción. Crear y mantener un diagrama Lucidchart tiene demasiado costo cognitivo para hacerlo como parte de un PR. Escribir un ADR desde cero requiere recordar la plantilla, reunir los argumentos, y dedicar 30-45 minutos a algo que "no está en el ticket".

La solución es bajar esa fricción a cero: **diagramas como texto en el repo + ADRs generados por IA desde la conversación que ya tuviste**.

---

## ADRs: la memoria institucional del proyecto

Un **Architecture Decision Record (ADR)** es un documento corto que registra una decisión técnica significativa: el contexto en el que se tomó, las opciones consideradas, y la razón por la que se eligió una sobre las otras.

No se trata de documentar todas las decisiones — solo las que un developer nuevo necesitaría entender para no rehacerlas o cuestionarlas sin contexto. El criterio pragmático: *¿Si este developer llegara hoy al proyecto y viera este código, se preguntaría "por qué lo hicieron así"?* Si la respuesta es sí, hay un ADR pendiente.

### El formato MADR

El formato dominante en 2025-2026 es **MADR** (Markdown Any Decision Records), no el formato Nygard original. La diferencia clave: MADR tiene estructura explícita para opciones consideradas y sus pros/cons, lo que lo hace mucho más útil cuando un agente IA tiene que rellenarlo.

```
# Uso de SQLite + better-sqlite3 en lugar de PostgreSQL

## Estado

Aceptado

## Contexto y problema

El proyecto FlowSync es una aplicación de gestión de tareas con una carga de trabajo
predecible y un equipo de 2-4 developers. Necesitamos una base de datos para el
desarrollo local y para los entornos de testing del máster.

## Opciones consideradas

* SQLite + better-sqlite3
* PostgreSQL en Docker
* Turso (SQLite distribuido)

## Decisión

Se elige **SQLite + better-sqlite3** porque:

* Cero overhead de infraestructura para desarrollo local
* AdonisJS 7 + Lucid ORM soporta SQLite de primera clase
* better-sqlite3 es síncrono — elimina la complejidad async en queries simples
* Para producción real del proyecto del máster, la carga no justifica Postgres

## Consecuencias

* Los tipos de columna disponibles son los de SQLite (sin arrays, sin jsonb avanzado)
* Migrar a Postgres en producción requiere revisar los migrations (los tipos son compatibles vía Lucid)
* No hay soporte para conexiones concurrentes de escritura a escala — aceptable en este contexto
```

### Instalación y setup con log4brains

**log4brains** es el CLI que combina plantillas MADR + UI estática + integración con GitHub Pages. Es la opción con mejor relación configuración/resultado para proyectos JS/TS.

```
# Instalación (una sola vez por proyecto)
npm install --save-dev log4brains

# Inicialización — genera docs/adr/ con la plantilla MADR
npx log4brains init

# Crear un nuevo ADR
npx log4brains adr new "Uso de SQLite en lugar de PostgreSQL"

# Preview local del site de ADRs
npx log4brains preview
```

La estructura que crea `log4brains init`:

```diagram
docs/
└── adr/
    ├── README.md              # Índice de ADRs
    ├── 20260101-uso-de-adonisjs-7.md
    ├── 20260115-uso-de-sqlite.md
    └── template.md            # Plantilla MADR que usará npx log4brains adr new
```

> ⚠ **Convención de nombres**
> 
> `log4brains` nombra los archivos con fecha ISO + slug: `YYYYMMDD-nombre-del-adr.md`. No uses números secuenciales manuales — la fecha es más robusta cuando hay ADRs concurrentes en ramas distintas.

### Generar un ADR con Claude Code

El flujo más eficiente no es escribir el ADR — es **transcribir la decisión que ya tomaste** a formato MADR. Claude Code lo hace muy bien si le das el contexto correcto.

Ejemplo de prompt en Claude Code:

```
Basándote en el siguiente contexto, genera un ADR en formato MADR para el directorio
docs/adr/ del proyecto.

Contexto: Decidimos usar VineJS para validación en lugar de Zod porque AdonisJS 7
incluye VineJS de forma nativa y tiene integración directa con los modelos Lucid.
Zod funcionaría pero introduce una dependencia adicional y la integración manual
con los tipos de AdonisJS requiere más boilerplate. El equipo ya conoce la sintaxis
de VineJS del trabajo con la guía oficial de AdonisJS v6.

Nombra el archivo con la fecha de hoy y el slug apropiado.
```

> 💡 **Truco de productividad**
> 
> Si la decisión se tomó en un hilo de Slack o en la descripción de un PR, pega ese texto directamente en el prompt. Claude Code extrae los argumentos y los estructura en MADR mejor de lo que la mayoría de developers lo haría escribiéndolo desde cero.

---

## Mermaid 11: diagramas que viven en tu Markdown

**Mermaid.js** es la solución estándar para diagramas embebidos en Markdown. GitHub, GitLab y Notion los renderizan nativamente — escribes el diagrama como texto en un bloque de código con el identificador `mermaid` y aparece como visual.

La versión 11 (actual) añade diagramas de arquitectura específicos, Radar charts, y un motor de layout ELK customizable. Lo que más importa para un proyecto AdonisJS 7:

**Diagrama de secuencia (flujo de autenticación):**

```
sequenceDiagram
    participant C as Cliente React
    participant A as AdonisJS API
    participant DB as SQLite

    C->>A: POST /auth/login {email, password}
    A->>DB: SELECT user WHERE email = ?
    DB-->>A: User record
    A->>A: Verify password hash (bcrypt)
    A->>DB: INSERT access_token (user_id, hash, expires_at)
    DB-->>A: Token record
    A-->>C: { token: "oat_xxxx", expires_at }

    Note over C: Almacena token en localStorage / HttpOnly cookie
```

![image.png](https://media1-production-mightynetworks.imgix.net/asset/80d0811b-acf5-48b9-80dc-c013d55bb661/56a9b6da4b563078.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Diagrama de contexto C4 básico (Mermaid):**

```
graph LR
    User["👤 Usuario\\n[Persona]"]
    FE["Frontend React\\n[Single Page App\\nReact 19 + Vite]"]
    BE["Backend AdonisJS 7\\n[API REST\\nTypeScript + Lucid]"]
    DB[("SQLite\\n[Base de datos\\nbetter-sqlite3]")]

    User -->|"Navega en el browser"| FE
    FE -->|"HTTP/JSON\\nBearerToken: oat_*"| BE
    BE -->|"SQL\\nvia Lucid ORM"| DB
```

![diagram.jpg](https://media1-production-mightynetworks.imgix.net/asset/283e109c-84e9-423a-9df1-b7138885583c/diagram.jpg?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "diagram.jpg")

> **Nota sobre Mermaid en GitHub**
> 
> Funciona bien para la mayoría de tipos de diagrama. Limitaciones conocidas: los hyperlinks clickables en nodos no siempre funcionan en GitHub Preview, y algunos símbolos de FontAwesome (`fa:fa-ban`) no renderizan. Para diagramas de producción que necesiten precisión, usa Structurizr DSL (ver más abajo).

### Generar diagramas desde el código con Claude Code

La ventaja real de combinar Mermaid con Claude Code es que puedes pedir diagramas **directamente desde la estructura del repo**, sin tener que describir la arquitectura manualmente.

Prompt efectivo:

```
Lee la estructura del directorio app/ y los archivos de rutas en start/routes.ts.
Genera un diagrama Mermaid que muestre:
1. Las entidades principales (modelos Lucid en app/models/)
2. Las relaciones entre ellas
3. Los grupos de endpoints REST disponibles

Usa graph LR. Embédelo directamente en el README.md existente bajo la sección
"## Arquitectura".
```

---

## C4 con Structurizr DSL: el estándar para arquitecturas reales

Para proyectos más complejos, o cuando necesitas múltiples vistas coordinadas (Context → Container → Component → Code), **Structurizr DSL** es la herramienta de referencia. La creó Simon Brown, el autor del modelo C4.

La idea central: defines el modelo de arquitectura **una sola vez** en un archivo `.dsl`, y Structurizr genera todas las vistas desde ese modelo. Si mueves un componente, todas las vistas se actualizan.

```
# flowsync.dsl — modelo C4 mínimo del proyecto

workspace "FlowSync" "Sistema de gestión de tareas" {

    model {
        user = person "Usuario" "Developer o PM usando FlowSync"

        flowsync = softwareSystem "FlowSync" "Aplicación de gestión de tareas" {
            frontend = container "Frontend" "SPA React 19 + Vite" "TypeScript/React" {
                tags "Browser"
            }
            backend = container "Backend API" "AdonisJS 7 REST API" "TypeScript/Node 24" {
                authController = component "AuthController" "Login, registro, tokens"
                taskController = component "TaskController" "CRUD de tareas"
                userService = component "UserService" "Lógica de usuario"
            }
            database = container "Base de datos" "SQLite via better-sqlite3" "SQLite" {
                tags "Database"
            }
        }

        user -> frontend "Usa"
        frontend -> backend "API REST / JSON (Bearer token oat_*)"
        backend -> database "Lee y escribe vía Lucid ORM"
    }

    views {
        systemContext flowsync "Context" {
            include *
            autolayout lr
        }
        container flowsync "Containers" {
            include *
            autolayout lr
        }
        component backend "Components" {
            include *
            autolayout lr
        }
        theme default
    }
}
```

**Para renderizar localmente:**

```
# Con Docker (forma más fácil)
docker pull structurizr/lite
docker run -it --rm -p 8080:8080 \\
  -v $(pwd)/docs/architecture:/usr/local/structurizr \\
  structurizr/lite

# El archivo .dsl debe estar en docs/architecture/workspace.dsl
# Abre <http://localhost:8080>
```

**Para exportar SVG en CI** (GitHub Actions):

```
# .github/workflows/generate-diagrams.yml
- name: Generate C4 diagrams
  uses: structurizr/actions/export@main
  with:
    workspace: docs/architecture/workspace.dsl
    format: svg
    output: docs/diagrams/generated/
```

> 💡 **Cuándo usar Mermaid y cuándo Structurizr**
> 
> Usa **Mermaid** cuando el diagrama es ad-hoc, vive en un README o ADR, y no necesitas vistas coordinadas. Usa **Structurizr** cuando tienes más de dos capas de arquitectura, el equipo necesita vistas consistentes del mismo modelo, o cuando la documentación de arquitectura es un entregable formal. Para el proyecto del máster, Mermaid en el README + un `workspace.dsl` básico en `docs/architecture/` es la combinación correcta.

---

## Flujo completo: Claude Code genera tu documentación de arquitectura

Aquí está el flujo end-to-end que vas a ejecutar sobre el proyecto AdonisJS 7:

```
1. Claude Code lee app/models/*.ts
        ↓
2. Genera diagrama de entidades Mermaid (ERD o graph)
        ↓
3. Embede en README.md bajo ## Arquitectura
        ↓
4. Claude Code lee start/routes.ts + app/controllers/
        ↓
5. Genera diagrama de secuencia del flujo de auth (Mermaid)
        ↓
6. Coloca en docs/architecture/auth-flow.md
        ↓
7. Tú decides: ¿merece un Structurizr DSL para vistas C4 formales?
        ↓
8. Si sí: Claude Code genera el workspace.dsl base
   Si no: los Mermaid son suficientes para esta fase
```

El criterio de "¿merece Structurizr?" es pragmático: si el diagrama Mermaid del README te explica suficientemente la arquitectura a un nuevo developer, no necesitas más. Si tienes múltiples servicios o el sistema tiene más de 3-4 containers no triviales, Structurizr paga su complejidad.

---
