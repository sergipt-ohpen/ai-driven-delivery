# 📄 Documentación de API y código 🔴 — 16 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 16 min

## Dos capas, una misma fuente de verdad

La documentación de API y la documentación de código TypeScript son dos capas distintas con distintas audiencias, pero comparten el mismo principio: **la fuente de verdad es el código**, no un documento externo.

-   **API docs**: describe el contrato HTTP de tu backend — endpoints, parámetros, esquemas de request/response, auth. La audiencia son integradores externos, el frontend, y cada vez más, agentes IA que consumen la API.
    
-   **Código TypeScript (TSDoc/TypeDoc)**: describe el comportamiento interno — qué hace una función, qué espera, qué devuelve. La audiencia es el equipo y los copilotos IA que operan en modo agentic sobre tu codebase.
    

Las dos se generan de forma diferente, se mantienen de forma diferente, y se sirven de forma diferente. Esta página cubre ambas capas para el stack AdonisJS 7 + TypeScript del proyecto.

---

## Documentación de API con adonis-autoswagger + Scalar

### El estado real del ecosistema en AdonisJS 7

AdonisJS no tiene un paquete oficial `@adonisjs/openapi`. La solución de facto adoptada por la comunidad es `adonis-autoswagger` (v3.73.0, ~5.000 descargas/semana en npm), mantenida por `ad-on-is`. El propio equipo de Scalar la lista como "great community package" en su guía de integración oficial.

Hay una alternativa emergente basada en decoradores: `@foadonis/openapi` (Friends of Adonis, v1.0.1) — más moderna en diseño pero con comunidad todavía pequeña (~1.200 descargas/semana). Para el proyecto del máster usamos `adonis-autoswagger` por madurez y más documentación disponible.

### Instalación

```
npm install adonis-autoswagger
```

### Configuración

Crea el archivo config/swagger.ts

```
// config/swagger.ts
import { options as SwaggerOptions } from 'adonis-autoswagger/dist/types.js'

const swaggerConfig: SwaggerOptions = {
  path: './', // raíz del proyecto
  title: 'FlowSync API',
  version: '1.0.0',
  description: 'API de gestión de tareas FlowSync — AdonisJS 7',
  tagIndex: 2,       // nivel de ruta para agrupar tags: /api/v1/[tags]/...
  snakeCase: true,   // convierte camelCase a snake_case en los schemas

  ignore: ['/swagger', '/docs', '/openapi'],  // rutas que no se documentan
  preferredPutPatch: 'PUT',

  common: {
    parameters: {},
    headers: {},
  },

  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      description: 'Token opaco AdonisJS: oat_xxxxxxxxxxxx'
    }
  },
  defaultSecurityScheme: 'bearerAuth',
  persistAuthorization: true,
}

export default swaggerConfig
```

### Rutas de OpenAPI y del visualizador

```
// start/routes.ts
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swaggerConfig from '#config/swagger'

router.get('/', () => {
  return { hello: 'world' }
})

// Spec OpenAPI 3.0 en JSON
router.get('/openapi', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swaggerConfig)
})

// UI de documentación (Scalar por defecto)
router.get('/docs', async () => {
  return AutoSwagger.default.scalar('/openapi')
})
```

Con esto, `http://localhost:3333/docs` muestra tu API en Scalar automáticamente. No necesitas escribir YAML a mano.

### Enriquecer la spec con JSDoc en los controllers

`adonis-autoswagger` infiere los esquemas básicos desde los modelos Lucid y los validators VineJS. Para añadir ejemplos, descripciones, y casos de error, usa comentarios JSDoc directamente en el controller:

```
// app/controllers/auth_controller.ts
export default class AuthController {

  /**
   * @login
   * @summary Iniciar sesión
   * @description Autentica al usuario y devuelve un token de acceso opaco.
   * El token tiene formato oat_* y debe enviarse como Bearer token en
   * los headers de las peticiones autenticadas.
   * @requestBody <LoginRequest>
   * @responseBody 200 - <LoginResponse> - Token generado correctamente
   * @responseBody 400 - { message: string } - Credenciales inválidas
   * @responseBody 422 - <ValidationError[]> - Error de validación VineJS
   */
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)
    return response.ok({ token: token.value!.release() })
  }
}
```

> 💡 **Tip: usa los tipos VineJS como fuente de verdad**
> 
> `adonis-autoswagger` puede inferir el schema del request directamente desde el validator VineJS si usas `request.validateUsing(validator)`. Para que funcione bien, define los validators en `app/validators/` y exporta el tipo inferido:
> 
> ```
> import vine, { type InferInput } from '@vinejs/vine'
> 
> export const loginValidator = vine.compile(
>   vine.object({
>     email: vine.string().email(),
>     password: vine.string().minLength(8),
>   })
> )
> 
> export type LoginInput = InferInput<typeof loginValidator>
> ```

---

## Scalar: el renderer moderno para OpenAPI specs

**Scalar** ha desplazado a Swagger UI como el estándar moderno para visualizar OpenAPI specs. Microsoft lo eligió como reemplazo oficial en .NET 9 y .NET 10. La razón es sencilla: mejor UX con menos ruido visual.

Diferencias prácticas relevantes:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/f79e5890-5435-422d-abee-fa249ac0a9db/0ca0a328cd1977e2.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Scalar también tiene un **modo standalone** para incluir en el sitio de Starlight:

```
npm install @scalar/api-reference
```

```
// En tu sitio Astro Starlight — docs como código
import { ApiReference } from '@scalar/api-reference'

<ApiReference
  spec={{ url: '<https://api.flowsync.dev/openapi>' }}
  configuration={{ theme: 'default', darkMode: true }}
/>
```

---

## Documentación de código TypeScript: TSDoc y TypeDoc

### TSDoc: el estándar para comentarios TypeScript

**TSDoc** es el estándar de Microsoft para documentar TypeScript — el mismo que usa el Language Server para mostrar tooltips en VS Code. La sintaxis es un superconjunto de JSDoc con algunas diferencias importantes:

```
/**
 * Crea una tarea nueva y la asocia al proyecto especificado.
 * La tarea se crea en estado `pending` por defecto.
 *
 * @param createDto - Datos de la nueva tarea (validados por VineJS)
 * @param userId - ID del usuario que crea la tarea (del token auth)
 * @returns La tarea creada con su ID asignado y timestamps
 *
 * @throws {ValidationException} Si el `projectId` no existe para este usuario
 * @throws {AuthorizationException} Si el usuario no tiene acceso al proyecto
 *
 * @example
 * ```ts
 * const task = await taskService.create(
 *   { title: 'Revisar PR', projectId: 1, priority: 'high' },
 *   auth.user!.id
 * )
 * console.log(task.id) // 42
 * ```
 */
async create(createDto: CreateTaskDto, userId: number): Promise<Task> {
  // ...
}
```

> ⚠ **TSDoc vs JSDoc: la diferencia que importa**
> 
> TypeScript entiende ambos, pero TSDoc tiene tipos más estrictos. Si usas `@param {string} name`, TypeScript puede ignorar el tipo declarado si ya lo infiere. Con TSDoc puro, el tipo viene del sistema de tipos — el comentario describe el *comportamiento*, no el tipo. Menos duplicación, menos drift.

### Generar TSDoc con Claude Code

El prompt más efectivo para generar TSDoc en código existente:

```
Lee app/services/task_service.ts y genera comentarios TSDoc completos para todos
los métodos públicos.

Requisitos:
- @param para cada parámetro con descripción semántica (no solo el tipo — eso ya
  lo tiene TypeScript)
- @returns describiendo el valor devuelto y cuándo puede ser null/undefined
- @throws para los errores que lanza explícitamente
- @example si el método tiene uso no obvio
- NO incluyas tipos en @param/@returns — TypeScript ya los conoce
- Mantén el tono técnico, sin explicar lo obvio

No modifiques la lógica, solo añade los comentarios.
```

> 💡 **El truco del "no incluyas tipos"**
> 
> Si le pides a Claude Code que genere `@param {string} email - El email del usuario`, estás duplicando información que TypeScript ya tiene. El comentario aporta valor cuando describe el *significado* del parámetro, no su tipo. Claude Code tiene la tendencia a incluir tipos a menos que explícitamente se lo prohíbas.

### TypeDoc: referencia de API para el equipo

**TypeDoc** genera automáticamente un sitio de documentación de referencia desde los comentarios TSDoc y los tipos de TypeScript. Es el equivalente a Javadoc o pdoc3, pero para el ecosistema TS.

```
npm install --save-dev typedoc

# Generar la documentación
npx typedoc --out docs/api-reference app/
```

Configuración mínima en `typedoc.json`:

```
{
  "entryPoints": ["app/"],
  "entryPointStrategy": "expand",
  "out": "docs/api-reference",
  "excludePrivate": true,
  "excludeInternal": true,
  "includeVersion": true,
  "readme": "none",
  "navigationLinks": {
    "Repositorio": "<https://github.com/LIDR-academy/flowsync>"
  }
}
```

Para integrarlo en el pipeline CI:

```
# Parte del workflow de docs
- name: Generate TypeDoc reference
  run: npx typedoc

- name: Upload API reference
  uses: actions/upload-artifact@v4
  with:
    name: api-reference
    path: docs/api-reference/
```

---

## Context7 MCP: que Claude Code nunca alucine la API de AdonisJS 7

Este es el punto donde se conecta la documentación *para la IA* con el workflow diario.

**Context7** (Upstash) es un servidor MCP que inyecta documentación versionada de librerías directamente en el contexto de Claude Code o Cursor. El problema que resuelve: los LLMs tienen un conocimiento de corte que puede ser de hace meses, y AdonisJS 7 salió en febrero de 2026 — una versión que casi ningún modelo conoce bien.

Con Context7 conectado, cuando le pides a Claude Code que implemente un feature con Lucid ORM o VineJS, el agente consulta la documentación actualizada antes de responder. Sin él, Claude Code puede generar código válido para AdonisJS 6 que no funciona en la v7.

Datos de adopción (mayo 2026): **53.300 stars en GitHub, 890.000 descargas semanales en npm**, ranking #1 en MCP.Directory, incluido en el ThoughtWorks Technology Radar Vol. 33 (noviembre 2025) en categoría "Trial".

### Instalación y configuración desde esta sesión

```
# En Claude Code (modo global — disponible en todos los proyectos)
claude mcp add context7 -- npx -y @upstash/context7-mcp

# Verificar que está disponible
claude mcp list
```

En Cursor (`~/.cursor/mcp.json`):

```
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    }
  }
}
```

### Cómo se usa en la práctica

Una vez instalado, Context7 se activa añadiendo `use context7` al final del prompt:

```
Implementa el endpoint PATCH /tasks/:id que actualiza el título y la prioridad
de una tarea. Usa Lucid ORM para la actualización y VineJS para la validación.
use context7
```

Claude Code consulta automáticamente la documentación de AdonisJS 7, Lucid, y VineJS antes de generar el código.

Para forzar una librería específica:

```
use context7
/adonisjs/v7/lucid  ← librería + rama específica
```

> **Regla de proyecto recomendada en** [**CLAUDE.md**](http://claude.md/)
> 
> Añade esto a tu `CLAUDE.md` para que Context7 se use por defecto en el proyecto:
> 
> ```
> ## Librerías del proyecto
> 
> Cuando generes código que use AdonisJS 7, Lucid ORM, VineJS, o React 19,
> usa siempre Context7 MCP para consultar la documentación actualizada.
> Añade `use context7` al contexto de trabajo.
> ```

### Limitaciones conocidas

Context7 tiene una limitación de precisión en queries que cruzan múltiples librerías simultáneamente — si preguntas sobre la interacción entre VineJS y Lucid en el mismo query, la precisión baja. El workaround: un turno por librería cuando la pregunta es sobre integración compleja.

---

## El ciclo completo: código bien documentado → IA más útil

La documentación de código no es un fin en sí misma — es el contexto que hace que los agentes IA trabajen mejor en tu codebase. El ciclo se cierra así:

```
Escribes código + TSDoc
        ↓
TypeDoc genera referencia de API
        ↓
Claude Code/Cursor la leen en futuras sesiones
        ↓
Los prompts necesitan menos contexto manual
        ↓
El developer escribe menos en cada turno
        ↓
Más espacio para lógica de negocio, menos para instrucciones técnicas
```

El [CLAUDE.md](http://claude.md/) que tienes desde S1 es la capa de instrucciones del proyecto. La documentación TSDoc + TypeDoc es la capa de conocimiento del código. Las dos juntas hacen que el agente IA que trabaja en tu proyecto en el turno 50 de una sesión larga tenga el mismo nivel de comprensión que en el turno 1.
