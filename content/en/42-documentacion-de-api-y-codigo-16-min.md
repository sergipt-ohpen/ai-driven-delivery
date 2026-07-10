# 📄 API and code documentation 🔴 — 16 min | AI-Driven Delivery

⏳ Estimated time: 16 min

## Two layers, one single source of truth

API documentation and TypeScript code documentation are two distinct layers with different audiences, but they share the same principle: **the source of truth is the code**, not an external document.

-   **API docs**: describe your backend's HTTP contract — endpoints, parameters, request/response schemas, auth. The audience is external integrators, the frontend, and increasingly, AI agents consuming the API.
    
-   **TypeScript code (TSDoc/TypeDoc)**: describes the internal behavior — what a function does, what it expects, what it returns. The audience is the team and the AI copilots operating in agentic mode on your codebase.
    

The two are generated differently, maintained differently, and served differently. This page covers both layers for the project's AdonisJS 7 + TypeScript stack.

---

## API documentation with adonis-autoswagger + Scalar

### The real state of the ecosystem in AdonisJS 7

AdonisJS doesn't have an official `@adonisjs/openapi` package. The de facto solution adopted by the community is `adonis-autoswagger` (v3.73.0, ~5,000 downloads/week on npm), maintained by `ad-on-is`. The Scalar team itself lists it as a "great community package" in its official integration guide.

There is an emerging decorator-based alternative: `@foadonis/openapi` (Friends of Adonis, v1.0.1) — more modern in design but with a still-small community (~1,200 downloads/week). For the master's project we use `adonis-autoswagger` for its maturity and the greater amount of documentation available.

### Installation

```
npm install adonis-autoswagger
```

### Configuration

Create the file config/swagger.ts

```
// config/swagger.ts
import { options as SwaggerOptions } from 'adonis-autoswagger/dist/types.js'

const swaggerConfig: SwaggerOptions = {
  path: './', // project root
  title: 'FlowSync API',
  version: '1.0.0',
  description: 'API de gestión de tareas FlowSync — AdonisJS 7',
  tagIndex: 2,       // route level used to group tags: /api/v1/[tags]/...
  snakeCase: true,   // converts camelCase to snake_case in the schemas

  ignore: ['/swagger', '/docs', '/openapi'],  // routes that are not documented
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

### OpenAPI and viewer routes

```
// start/routes.ts
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swaggerConfig from '#config/swagger'

router.get('/', () => {
  return { hello: 'world' }
})

// OpenAPI 3.0 spec as JSON
router.get('/openapi', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swaggerConfig)
})

// Documentation UI (Scalar by default)
router.get('/docs', async () => {
  return AutoSwagger.default.scalar('/openapi')
})
```

With this, `http://localhost:3333/docs` shows your API in Scalar automatically. You don't need to write YAML by hand.

### Enriching the spec with JSDoc in the controllers

`adonis-autoswagger` infers the basic schemas from the Lucid models and the VineJS validators. To add examples, descriptions, and error cases, use JSDoc comments directly in the controller:

```
// app/controllers/auth_controller.ts
export default class AuthController {

  /**
   * @login
   * @summary Log in
   * @description Authenticates the user and returns an opaque access token.
   * The token has the format oat_* and must be sent as a Bearer token in
   * the headers of authenticated requests.
   * @requestBody <LoginRequest>
   * @responseBody 200 - <LoginResponse> - Token generated successfully
   * @responseBody 400 - { message: string } - Invalid credentials
   * @responseBody 422 - <ValidationError[]> - VineJS validation error
   */
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)
    return response.ok({ token: token.value!.release() })
  }
}
```

> 💡 **Tip: use the VineJS types as the source of truth**
> 
> `adonis-autoswagger` can infer the request schema directly from the VineJS validator if you use `request.validateUsing(validator)`. For it to work well, define the validators in `app/validators/` and export the inferred type:
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

## Scalar: the modern renderer for OpenAPI specs

**Scalar** has displaced Swagger UI as the modern standard for visualizing OpenAPI specs. Microsoft chose it as the official replacement in .NET 9 and .NET 10. The reason is simple: better UX with less visual noise.

Relevant practical differences:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/f79e5890-5435-422d-abee-fa249ac0a9db/0ca0a328cd1977e2.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

Scalar also has a **standalone mode** for inclusion in the Starlight site:

```
npm install @scalar/api-reference
```

```
// In your Astro Starlight site — docs as code
import { ApiReference } from '@scalar/api-reference'

<ApiReference
  spec={{ url: '<https://api.flowsync.dev/openapi>' }}
  configuration={{ theme: 'default', darkMode: true }}
/>
```

---

## TypeScript code documentation: TSDoc and TypeDoc

### TSDoc: the standard for TypeScript comments

**TSDoc** is Microsoft's standard for documenting TypeScript — the same one the Language Server uses to show tooltips in VS Code. The syntax is a superset of JSDoc with some important differences:

```
/**
 * Creates a new task and associates it with the specified project.
 * The task is created in the `pending` state by default.
 *
 * @param createDto - Data of the new task (validated by VineJS)
 * @param userId - ID of the user creating the task (from the auth token)
 * @returns The created task with its assigned ID and timestamps
 *
 * @throws {ValidationException} If the `projectId` does not exist for this user
 * @throws {AuthorizationException} If the user does not have access to the project
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

> ⚠ **TSDoc vs JSDoc: the difference that matters**
> 
> TypeScript understands both, but TSDoc has stricter typing. If you use `@param {string} name`, TypeScript may ignore the declared type if it already infers it. With pure TSDoc, the type comes from the type system — the comment describes the *behavior*, not the type. Less duplication, less drift.

### Generating TSDoc with Claude Code

The most effective prompt for generating TSDoc on existing code:

```
Read app/services/task_service.ts and generate complete TSDoc comments for all
public methods.

Requirements:
- @param for every parameter with a semantic description (not just the type —
  TypeScript already has that)
- @returns describing the returned value and when it can be null/undefined
- @throws for the errors it explicitly throws
- @example if the method has non-obvious usage
- Do NOT include types in @param/@returns — TypeScript already knows them
- Keep the tone technical, without explaining the obvious

Do not modify the logic, only add the comments.
```

> 💡 **The "don't include types" trick**
> 
> If you ask Claude Code to generate `@param {string} email - The user's email`, you're duplicating information TypeScript already has. The comment adds value when it describes the *meaning* of the parameter, not its type. Claude Code has a tendency to include types unless you explicitly forbid it.

### TypeDoc: API reference for the team

**TypeDoc** automatically generates a reference documentation site from the TSDoc comments and the TypeScript types. It's the equivalent of Javadoc or pdoc3, but for the TS ecosystem.

```
npm install --save-dev typedoc

# Generate the documentation
npx typedoc --out docs/api-reference app/
```

Minimal configuration in `typedoc.json`:

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

To integrate it into the CI pipeline:

```
# Part of the docs workflow
- name: Generate TypeDoc reference
  run: npx typedoc

- name: Upload API reference
  uses: actions/upload-artifact@v4
  with:
    name: api-reference
    path: docs/api-reference/
```

---

## Context7 MCP: so Claude Code never hallucinates the AdonisJS 7 API

This is the point where documentation *for the AI* connects with the daily workflow.

**Context7** (Upstash) is an MCP server that injects versioned library documentation directly into the context of Claude Code or Cursor. The problem it solves: LLMs have a knowledge cutoff that may be months old, and AdonisJS 7 came out in February 2026 — a version almost no model knows well.

With Context7 connected, when you ask Claude Code to implement a feature with Lucid ORM or VineJS, the agent consults the up-to-date documentation before responding. Without it, Claude Code may generate code that is valid for AdonisJS 6 but doesn't work in v7.

Adoption data (May 2026): **53,300 stars on GitHub, 890,000 weekly downloads on npm**, ranked #1 on MCP.Directory, included in the ThoughtWorks Technology Radar Vol. 33 (November 2025) in the "Trial" category.

### Installation and configuration from this session

```
# In Claude Code (global mode — available in all projects)
claude mcp add context7 -- npx -y @upstash/context7-mcp

# Verify that it is available
claude mcp list
```

In Cursor (`~/.cursor/mcp.json`):

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

### How it's used in practice

Once installed, Context7 is activated by adding `use context7` at the end of the prompt:

```
Implement the PATCH /tasks/:id endpoint that updates a task's title and priority.
Use Lucid ORM for the update and VineJS for validation.
use context7
```

Claude Code automatically consults the documentation for AdonisJS 7, Lucid, and VineJS before generating the code.

To force a specific library:

```
use context7
/adonisjs/v7/lucid  ← library + specific branch
```

> **Recommended project rule in** [**CLAUDE.md**](http://claude.md/)
> 
> Add this to your `CLAUDE.md` so Context7 is used by default in the project:
> 
> ```
> ## Project libraries
> 
> When generating code that uses AdonisJS 7, Lucid ORM, VineJS, or React 19,
> always use Context7 MCP to consult the up-to-date documentation.
> Add `use context7` to the working context.
> ```

### Known limitations

Context7 has a precision limitation on queries that span multiple libraries simultaneously — if you ask about the interaction between VineJS and Lucid in the same query, precision drops. The workaround: one turn per library when the question is about complex integration.

---

## The complete cycle: well-documented code → more useful AI

Code documentation is not an end in itself — it's the context that makes AI agents work better on your codebase. The cycle closes like this:

```
You write code + TSDoc
        ↓
TypeDoc generates the API reference
        ↓
Claude Code/Cursor read it in future sessions
        ↓
Prompts need less manual context
        ↓
The developer writes less in each turn
        ↓
More room for business logic, less for technical instructions
```

The [CLAUDE.md](http://claude.md/) you've had since S1 is the project's instruction layer. The TSDoc + TypeDoc documentation is the code's knowledge layer. Together, they ensure that the AI agent working on your project at turn 50 of a long session has the same level of understanding as at turn 1.
