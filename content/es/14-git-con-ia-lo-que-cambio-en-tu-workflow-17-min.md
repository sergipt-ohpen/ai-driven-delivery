# 🤖Git con IA: lo que cambió en tu workflow 🔴 — 17 min | AI-Driven Delivery

⏳ Tiempo estimado: 17 min

## Git con IA: del PR clásico al workflow agéntico

> Esta lección tiene dos partes. **Primera**: cómo hacer un Pull Request bien hecho — porque ser senior no garantiza dominio del flujo PR (muchos venimos de mono-repos corporativos, GitLab, SVN o equipos donde los PRs los hacía siempre alguien más). **Segunda**: cómo cambia ese flujo en 2026 con IA. Si ya dominas la primera parte, salta directo a la segunda.

## Parte 1: El flujo Pull Request, paso a paso

### Por qué importa hacerlo bien

Un PR no es solo "subir código". Es el **contrato de comunicación** entre tú y el equipo: qué cambia, por qué, cómo se prueba, qué riesgos hay. En el máster vas a abrir muchos PRs sobre el repo compartido de LIDR — y la calidad de tus PRs es parte de la evaluación.

### Convención del repo del máster

En AI4Devs trabajamos sobre un repo **compartido** (no forks individuales):

-   Tu rama personal: `alumno/nombre-apellido`
    
-   Ramas de demo del mentor (fallback en sesiones en vivo): `demo/s01-*`, `demo/s02-*`, etc.
    

Esto permite revisión centralizada de PRs por mentores y visibilidad cruzada del progreso entre alumnos. **No hagas fork**, clona directamente y crea tu rama.

### Flujo paso a paso

### 1\. Clonar el repo y crear tu rama personal

```
# Usa la URL del repo del máster (te la compartimos en la sesión de bienvenida)
git clone <URL-DEL-REPO-DEL-MASTER>
cd <nombre-del-repo>

# Asegúrate de estar en main actualizado
git checkout main
git pull

# Crea tu rama personal (la usarás todo el máster), 
# Por ejemplo alumno/JorgePilo
git checkout -b alumno/<TU-NOMBRE>
git push -u origin alumno/<TU-NOMBRE>
```

### 2\. Crear una rama de trabajo por sesión o feature

No mezcles trabajo de distintas sesiones en la misma rama. Convención recomendada:

```
# Desde tu rama alumno/*
git checkout -b alumno/jorge-pilo/s01-justfile

# Trabajas, pruebas...
```

Prefijos útiles: `feat/`, `fix/`, `docs/`, `refactor/`, `lab/`, `s01/`, `s02/`...

### 3\. Hacer cambios y commits descriptivos

```
# Ver qué cambió
git status
git diff

# Stagear (todo o selectivo)
git add .
# o por archivo:
git add backend/app/api/routes/items.py

# Commit con mensaje convencional
git commit -m "feat(backend): add Justfile for common dev tasks"
```

**Formato Conventional Commits**:

-   `feat`: nueva funcionalidad
    
-   `fix`: corrección de bug
    
-   `docs`: cambios en documentación
    
-   `refactor`: refactorización sin cambio de comportamiento
    
-   `test`: añadir o modificar tests
    
-   `chore`: mantenimiento, configuración
    

**Reglas para mensajes**:

-   Verbo en imperativo presente (`add`, no `added` ni `adds`).
    
-   Explica **qué** y **por qué**, no solo "cambios varios".
    
-   Primera línea ≤ 72 caracteres.
    

### 4\. Subir tu rama a GitHub

```
git push -u origin alumno/jorge-pilo/s01-justfile
```

El flag `-u` configura tracking. En pushes futuros basta con `git push`.

### 5\. Crear el Pull Request

1.  Ve al repo en GitHub. Verás un banner amarillo: *"alumno/jorge-pilo/s01-justfile had recent pushes — Compare & pull request"*.
    
2.  Click en **Compare & pull request**.
    
3.  Verifica:
    
    -   **Base branch**: `main` (o la rama de integración que indique el mentor).
        
    -   **Compare branch**: tu rama de trabajo.
        
4.  Rellena el formulario (ver siguiente sección).
    
5.  Si aún estás trabajando, marca el PR como **Draft** (botón debajo del verde "Create pull request").
    

### 6\. La descripción del PR: el contrato

Una buena descripción de PR responde tres preguntas. Esto es lo que el mentor (y tu yo del futuro) necesitan ver:

**¿Qué cambia?** Descripción breve y clara: 1-3 frases.

> Ejemplo: Añade un Justfile en la raíz del proyecto con recipes para los comandos más usados (dev, test, lint, migrate, generate-client).

**¿Por qué?** Contexto, motivación, link al issue si aplica.

> Ejemplo: Los comandos del proyecto están dispersos entre 3 READMEs y 4 scripts. Justfile centraliza el interface CLI y reduce la fricción de onboarding. Resuelve el punto "HIGH: No task runner" del [REPORT.md](http://report.md/) de la sesión 1.

**¿Cómo probarlo?** Pasos concretos para que el reviewer valide.

> Ejemplo:
> 
> 1.  `just --list` muestra todas las recipes disponibles
>     
> 2.  `just dev` levanta el entorno de desarrollo
>     
> 3.  `just test` corre la suite completa de tests
>     
> 4.  `just lint` ejecuta linters de backend y frontend
>     

> 💡 **Tip senior**: si el PR es complejo, añade una sección "**Decisiones / trade-offs**" explicando alternativas que consideraste y descartaste. Ahorra rondas de comentarios.

### 7\. El ciclo de revisión

1.  Asigna reviewers (mentor o compañeros, según convención de la sesión).
    
2.  Espera comentarios. Responde a cada uno: aplicas el cambio o argumentas por qué no.
    
3.  Push de cambios → el PR se actualiza solo.
    
4.  Cuando recibes aprobación: **squash merge** (la convención por defecto del máster) para mantener el historial limpio.
    
5.  Borra la rama local y remota:
    

```
git checkout main
git pull
git branch -D alumno/jorge-pilo/s01-justfile
git push origin --delete alumno/jorge-pilo/s01-justfile
```

### Anti-patterns que un mentor te marcará en el PR

-   ❌ Mensaje de commit "**fix stuff**" o "**WIP**" en main.
    
-   ❌ Un solo commit gigante con 50 archivos.
    
-   ❌ PR sin descripción ("ver código").
    
-   ❌ Mezclar refactor + feature + fix en el mismo PR (cada uno debería ir aparte).
    
-   ❌ Cambios en archivos no relacionados con la tarea (formateadores agresivos, imports auto-ordenados).
    
-   ❌ `git push --force` sobre main o sobre PRs que ya tienen reviews aprobadas.
    

---

## Parte 2: Cómo cambia esto con IA (2026)

Ahora que tienes el flujo clásico claro, esto es lo que cambió y vas a usar todos los días en el máster.

### Lo que cambió en cada paso del flujo PR

![image.png](https://media1-production-mightynetworks.imgix.net/asset/18e66cd6-daf7-40a2-bfd5-14f4094a3ee6/d0f7b9368aee5c49.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Cheatsheet: comandos y atajos por herramienta

### Generación de commit messages

![image.png](https://media1-production-mightynetworks.imgix.net/asset/1ef20fe5-7599-4127-a2d1-232067916e0a/9b1c0b9a8ec69180.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 Configura el estilo (Conventional Commits, Gitmoji, custom) en los settings de tu herramienta para que los mensajes salgan ya con el formato que tu equipo usa.

### Generación de descripción de PR

![image.png](https://media1-production-mightynetworks.imgix.net/asset/4a587ee7-4621-4f4a-b00e-4d361e427690/d7f53de40dde5675.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ La IA **no conoce el contexto del issue ni el por qué del cambio**. Siempre revisa la descripción y añade el "por qué" — es lo que te diferencia de un PR generado.

### Resolución de merge conflicts

![image.png](https://media1-production-mightynetworks.imgix.net/asset/a7b06d5f-6bdf-47e7-93aa-39f0a7236386/e7dc66f56838b42f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> ⚠ La IA no conoce tu lógica de negocio. Resuelve **patrones de código**, no decisiones de producto. Siempre revisa la resolución propuesta antes de marcar como resuelto.

### Asignar tareas a agentes desde GitHub

![image.png](https://media1-production-mightynetworks.imgix.net/asset/5300c715-aeb9-4e8b-ad4e-40005d084b98/742c6d719badbba8.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Code Review automatizado

![image.png](https://media1-production-mightynetworks.imgix.net/asset/37398e88-2661-4a4d-8968-f3460227e2e1/9ea87a9c97792e6a.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

📊 **Datos oficiales (GitHub Blog, marzo 2026)**: Copilot Code Review ha hecho **60M de reviews acumuladas**, **\>1 de cada 5** reviews en GitHub, **71%** dejan comentarios accionables, promedio **5,1 comentarios** por review.

### Setup mínimo: Claude Code GitHub Action

Si vas a configurar tu repo del máster para que Claude Code responda a `@claude` mentions en PRs e issues, este es el archivo mínimo:

```
# .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment: { types: [created] }
  pull_request_review_comment: { types: [created] }

jobs:
  claude:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Pasos para activarlo**:

1.  En el terminal con Claude Code instalado: `claude` → `/install-github-app`.
    
2.  Autoriza la app de GitHub para tu repo.
    
3.  Añade `ANTHROPIC_API_KEY` a los secrets del repo.
    
4.  Mention `@claude` en cualquier PR/issue del repo.
    

📖 Documentación oficial: [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions)

### Las 5 reglas de oro (tátualas)

1.  **Siempre revisa el diff** antes de aceptar un commit message generado por IA. La IA no conoce tu dominio de negocio.
    
2.  **Nunca dejes que un agente haga** `git push --force` **sin confirmación humana.** Si tu herramienta lo permite, deshabilítalo.
    
3.  **CI gate estricto**. Que la IA genere un PR no significa que pase tests automáticamente — bloquea merge si tests/coverage/security fallan.
    
4.  **Etiqueta los PRs auto-generados** (`copilot`, `devin`, `claude-code`) para que el equipo sepa qué revisar con más cuidado.
    
5.  **MCP read-only para code review.** El agente puede leer tu BD de staging y observability, pero **nunca con permisos de escritura sobre prod sin un humano en el loop**.
    

### Lo que NO hace la IA bien (todavía)

-   **Decisiones arquitectónicas en PRs grandes**: necesita review humano serio.
    
-   **Detección de bugs sutiles de concurrencia / race conditions**: falsos positivos altos.
    
-   **Resolución de conflictos en archivos con lógica de negocio densa**: confunde patrones similares con intenciones distintas.
    
-   **Reviews de seguridad profundas**: detecta patterns conocidos pero no zero-days ni lógica de auth compleja.
    
-   **Escribir el "por qué" del PR**: la IA describe el qué (lee diff y commits) pero no conoce tu motivación de negocio. Eso lo escribes tú.
    

## Lo accionable de esta lección

1.  **Domina el flujo PR clásico antes de delegárselo a la IA.** Si no entiendes qué hace `git push -u origin`, la IA no te va a salvar cuando algo se rompa.
    
2.  **El "qué" del PR puede generarlo la IA. El "por qué" siempre lo escribes tú.** Es la diferencia entre un PR mecánico y uno revisable.
    
3.  **Configura los atajos de IA en tu IDE antes de S1.** Generar commit messages, resolver conflictos y describir PRs son acciones que harás 5–10 veces al día.
    
4.  **Aprende a leer review comments de Copilot críticamente.** El 71% son accionables, pero el 29% son ruido — y necesitas el ojo entrenado para distinguir.
    
5.  **El agente puede abrir el PR, pero tú firmas el merge.** Esa es la línea senior.
    

## Recursos

-   📖 [GitHub Docs — About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) — referencia oficial sobre PRs.
    
-   📖 [Conventional Commits — Especificación](https://www.conventionalcommits.org/es/v1.0.0/) — la convención que usamos en el máster (versión en español).
    
-   📖 [GitHub Blog — 60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) — métricas oficiales.
    
-   📖 [Claude Code GitHub Actions — Documentación oficial](https://code.claude.com/docs/en/github-actions) — la integración oficial.
    
-   📖 [anthropics/claude-code-action en GitHub](https://github.com/anthropics/claude-code-action) — el repo oficial.
    
-   📺 [MoureDev — Curso de Git y GitHub](https://mouredev.com/cursogit) — 5h, en español. Si necesitas refrescar fundamentos antes de empezar.
