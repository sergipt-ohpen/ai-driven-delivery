# 📚  Recursos adicionales 🟢 | AI4Devs 2026/06 Seniors

## SDD — teoría y filosofía

Si querés entender SDD más allá de OpenSpec, estas son las lecturas mínimas:

-   **Paper académico**: Piskala D.B., *"Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"*, arXiv (2026). Define los 3 niveles de rigor (spec-first / spec-anchored / spec-as-source). Lectura ~30 min. → `https://arxiv.org/pdf/2602.00180`
    
-   **GitHub blog post oficial** sobre el lanzamiento de spec-kit (sept 2025). Explica los 6 principios de SDD desde la perspectiva de quien lo está formalizando para la industria. → `https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/`
    
-   **Microsoft Developer Blog**: *"Diving Into Spec-Driven Development With GitHub Spec Kit"*. Visión enterprise del concepto. Útil si vas a venderle SDD a tu equipo o a un manager. → `https://developer.microsoft.com/blog/spec-driven-development-spec-kit`
    
-   **Visual Studio Magazine**: *"GitHub Spec Kit Experiment: 'A Lot of Questions'"*. Análisis crítico, útil para tener la perspectiva de "no todo es perfecto". → `https://visualstudiomagazine.com/articles/2025/09/16/github-spec-kit-experiment-a-lot-of-questions.aspx`
    

---

## OpenSpec — herramienta del máster

Toda la documentación viva está en el repo de Fission AI:

-   **Repo oficial**: → `https://github.com/Fission-AI/OpenSpec`
    
-   **Docs completas (índice)**: → `https://github.com/Fission-AI/OpenSpec/tree/main/docs`
    
-   **Getting started** (la lectura mínima oficial, ~10 min): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md`
    
-   **Commands reference** (slash commands explicados uno por uno): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md`
    
-   **CLI reference** (comandos terminal): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md`
    
-   **Concepts** (delta specs, capabilities, archive): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md`
    
-   **Workflows** (combinaciones avanzadas): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md`
    
-   **Supported tools** (los 21+ clientes soportados con paths de instalación): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md`
    
-   **Multi-language support**: → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/multi-language.md`
    
-   **Customization** (cómo extender OpenSpec a tu workflow): → `https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md`
    
-   **CHANGELOG** (mirá las releases recientes antes de impartir/aplicar — la herramienta evoluciona rápido): → `https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md`
    
-   [**Discord oficial** (link en el README del repo)](https://discord.com/invite/YctCnvvshC)
    
-   **Twitter del mantenedor**: `@0xTab`
    

---

## GitHub spec-kit — comparativa

Aunque el máster usa OpenSpec, vale la pena conocer spec-kit para entender el paisaje:

-   **Repo**: → `https://github.com/github/spec-kit`
    
-   **Documento "Spec-driven Development"** (filosofía profunda): → `https://github.com/github/spec-kit/blob/main/spec-driven.md`
    
-   **Upgrade guide** (interesante para entender cómo gestionan breaking changes): → `https://github.com/github/spec-kit/blob/main/docs/upgrade.md`
    

> 💡 Tip: leer la sección de spec-kit donde explican `constitution.md` te da una perspectiva alternativa de cómo capturar reglas de equipo. OpenSpec no tiene constitution; usa `openspec/project.md` con un rol parcialmente equivalente.

---

## BMAD-METHOD — el framework "potente pero pesado"

Si cuando termines el máster querés explorar SDD con un sistema más ambicioso de agentes especializados:

-   **Repo**: → `https://github.com/bmad-code-org/BMAD-METHOD`
    

LIDR lo describe como *"demasiado complejo para arrancar, pero indudablemente muy potente"*. No es para tu primer proyecto SDD, pero puede ser para tu siguiente paso.

---

## Stack del proyecto del máster

### Frontend (React 19 + Vite + Tailwind + shadcn/ui)

-   **Vite** (oficial): → `https://vite.dev/`
    
-   **Tailwind CSS v4 — upgrade guide** (importante: Tailwind v4 ya no usa `tailwind.config.js`): → `https://tailwindcss.com/docs/upgrade-guide`
    
-   **shadcn/ui — Vite installation** (la guía oficial paso a paso): → `https://ui.shadcn.com/docs/installation/vite`
    
-   **shadcn/ui — Tailwind v4 + React 19 guide**: → `https://ui.shadcn.com/docs/tailwind-v4`
    
-   **shadcn/ui — installation index** (otros frameworks: Next, React Router, Astro, TanStack): → `https://ui.shadcn.com/docs/installation`
    

---

## Tooling

-   **Biome** (linter + formatter recomendado en el máster): → `https://biomejs.dev/`
    
-   **simple-git-hooks** (pre-commit hooks ligero): → `https://github.com/toplenboren/simple-git-hooks`
    
-   **lefthook** (alternativa más robusta, escrita en Go): → `https://github.com/evilmartians/lefthook`
    
-   **lint-staged** (correr linters solo sobre archivos staged): → `https://github.com/lint-staged/lint-staged`
    

---

## Lecturas opcionales más profundas

-   **Web Reactiva (en español)**: *"Guía de Spec Driven Development con agentes IA (con OpenSpec)"*, Dani Primo (marzo 2026). La guía más completa en español sobre OpenSpec que encontré. Cubre diferencias de sintaxis entre Claude Code (`/opsx:propose`) y otros agentes (`/opsx-propose` con guión). Útil si preferís leer en castellano: → `https://www.webreactiva.com/blog/openspec`
    
-   [**redreamality.com**](http://redreamality.com/): *"OpenSpec Deep Dive: Spec-Driven Development Architecture & Practice in AI-Assisted Programming"* (enero 2026). Análisis arquitectónico independiente: → `https://redreamality.com/garden/notes/openspec-guide/`
    
-   [**redreamality.com**](http://redreamality.com/): *"GitHub Spec Kit Deep Dive: AI-Driven Specification Development Methodology"* (enero 2026). Comparativa útil con el anterior: → `https://redreamality.com/garden/notes/github-spec-kit-guide/`
    
-   [**dev.to**](http://dev.to/): *"How to make AI follow your instructions more for free (OpenSpec)"* (octubre 2025). Caso práctico de un dev individual integrando OpenSpec en un proyecto pequeño. Útil para ver el "antes y después": → `https://dev.to/webdeveloperhyper/how-to-make-ai-follow-your-instructions-more-for-free-openspec-2c85`
    
-   **Medium**: *"Spec-Driven Development with OpenSpec and Claude Code"*, Rajan Raj (febrero 2026). Aplicación de OpenSpec sobre proyecto NestJS, similar al stack del máster en filosofía: → `https://medium.com/@rajanonly98/spec-driven-development-with-openspec-and-claude-code-c289c4882541`
    
-   **QubitTool**: *"OpenSpec Tutorial: Master Spec-Driven Development (SDD) \[2026\]"* (abril 2026). Tutorial paso a paso en formato blog. Buena referencia rápida: → `https://qubittool.com/blog/openspec-sdd-tutorial`
    

---

## 📹 Videos

Selección de videos en YouTube validados por disponibilidad y calidad. La mayoría está en inglés — el contenido formativo en español sobre SDD/OpenSpec todavía es escaso. Cuando aparece contenido en español de calidad equivalente, lo priorizamos.

### Para entender SDD desde cero

> 📹 **"Spec-Driven Development - From Idea to Production with AI - Workshop"** — Unlearn (inglés, **2h 07min**, abril 2026). Workshop completo en vivo: construyen un producto real con flujo SDD desde una spec estructurada. Si vas a ver un solo video largo sobre SDD, este.
> 
> Video Player is loading.
> 
> Loaded: 0%
> 
> Remaining Time 2:07:34
> 
> 1x
> 
> -   2x
> -   1.5x
> -   1.25x
> -   1x, selected
> -   0.75x
> -   0.5x
> -   0.25x

### Para OpenSpec específicamente

> 📹 **"OpenSpec Changes Everything - No More Vibe Coding (Full Tutorial)"** — Nathan Sebhastian (inglés, **12:35**, noviembre 2025). Recorrido completo del flujo `propose → apply → archive` sobre un proyecto pequeño. La forma más rápida de ver OpenSpec en acción.
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 12:35
> 
> 1x
> 
> -   2x
> -   1.5x
> -   1.25x
> -   1x, selected
> -   0.75x
> -   0.5x
> -   0.25x

### Para spec-kit (comparativa)

> 📹 **"The ONLY guide you'll need for GitHub Spec Kit"** — Den Delimarsky (inglés, septiembre 2025). El propio creador de spec-kit explica el flujo paso a paso. Timestamps útiles en la descripción del video: Constitution (11:10), Specification (15:25), Plan (24:00), Tasks (31:06), Implementation (34:28).
> 
> Video Player is loading.
> 
> Loaded: 0.00%
> 
> Remaining Time 40:01
> 
> 1x
> 
> -   2x
> -   1.5x
> -   1.25x
> -   1x, selected
> -   0.75x
> -   0.5x
> -   0.25x
