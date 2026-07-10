# 📚  Additional resources 🟢 | AI-Driven Delivery

## Docs-as-code and documentation frameworks

### Tools (official documentation)

-   **Documentation frameworks (core)**
    
    -   **Astro Starlight**  
        Type: Tool - [https://starlight.astro.build/](https://starlight.astro.build/)  
        Notes: Getting started guide, sidebar configuration, and internationalization
        
    -   **Docusaurus 3**  
        Type: Tool - [https://docusaurus.io/docs](https://docusaurus.io/docs)  
        Notes: Versioning support, blog, and official plugins
        
    -   **VitePress**  
        Type: Tool - [https://vitepress.dev/](https://vitepress.dev/)  
        Notes: Recommended only if the stack is Vue-first
        
    -   **MkDocs Material**  
        Type: Tool - [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/)  
        Notes: Ideal for Python projects or teams with a Python toolchain
        
-   **Hosting and deployment**
    
    -   **GitHub Pages**  
        Type: Platform - [https://pages.github.com/](https://pages.github.com/)  
        Notes: Deployment configuration and custom domains
        

### Recommended videos

-   **"Astro Starlight in 100 seconds"** — \[Fireship, YouTube, 2 min, EN\] — Quick overview of the framework
    
-   **"Build a docs site with Astro Starlight"** — \[Kevin Powell, YouTube, ~25 min, EN\] — Full tutorial with deployment on Pages
    

---

## API documentation: AdonisJS 7

-   **adonis-autoswagger README**  
    Type: GitHub - [https://github.com/ad-on-is/adonis-autoswagger](https://github.com/ad-on-is/adonis-autoswagger)  
    Notes: Full configuration, JSDoc options
    
-   **@foadonis/openapi docs**  
    Type: Documentation - [https://friendsofadonis.com/docs/openapi](https://friendsofadonis.com/docs/openapi)  
    Notes: Alternative based on TypeScript decorators
    
-   **Scalar + AdonisJS guide**  
    Type: Guide - [https://guides.scalar.com/scalar/integrations/adonisjs](https://guides.scalar.com/scalar/integrations/adonisjs)  
    Notes: Official integration with adonis-autoswagger
    
-   **Scalar documentation**  
    Type: Documentation - [https://scalar.com/](https://scalar.com/)  
    Notes: Renderer customization, dark mode, themes
    
-   **OpenAPI Specification 3.1**  
    Type: Specification - [https://spec.openapis.org/oas/v3.1.0](https://spec.openapis.org/oas/v3.1.0)  
    Notes: Complete reference for the standard
    

---

## ADRs and architecture documentation

-   **MADR format**  
    Type: Documentation - [https://adr.github.io/madr/](https://adr.github.io/madr/)  
    Notes: Official templates, version 3.x and proposed 4.x
    
-   **log4brains**  
    Type: GitHub - [https://github.com/thomvaill/log4brains](https://github.com/thomvaill/log4brains)  
    Notes: CLI + UI + GitHub Actions integration
    
-   **C4 Model**  
    Type: Documentation - [https://c4model.com/](https://c4model.com/)  
    Notes: Simon Brown — author of the model. Full tutorial
    
-   **Structurizr DSL**  
    Type: Documentation - [https://docs.structurizr.com/dsl](https://docs.structurizr.com/dsl)  
    Notes: DSL language reference
    
-   **Structurizr Lite (Docker)**  
    Type: Tool - [https://hub.docker.com/r/structurizr/lite](https://hub.docker.com/r/structurizr/lite)  
    Notes: For rendering locally without needing an account
    
-   **LikeC4**  
    Type: Tool - [https://likec4.dev/](https://likec4.dev/)  
    Notes: Modern alternative to Structurizr DSL with its own MCP server
    

### Recommended videos

-   **"The C4 model for visualising software architecture"** — \[Simon Brown, YouTube, ~45 min, EN\] — The author of the model explains C4 with real examples. The definitive reference.
    
-   **"ADRs: Architecture Decision Records"** — \[ArjanCodes, YouTube, ~15 min, EN\] — Practical introduction with code examples
    

---

## Mermaid

-   **Mermaid Live Editor**  
    Type: Tool - [https://mermaid.live/](https://mermaid.live/)  
    Notes: For trying out diagrams without installing anything
    
-   **Mermaid docs**  
    Type: Documentation - [https://mermaid.js.org/](https://mermaid.js.org/)  
    Notes: Syntax for all diagram types (v11)
    
-   **Mermaid on GitHub**  
    Type: Integration  
    Link: Native support  
    Notes: No plugins required. Works in `.md`, issues, and wikis
    
-   **Mermaid in Notion**  
    Type: Integration  
    Link: `/code → mermaid` block  
    Notes: Native rendering since 2023
    

---

## TSDoc, TypeDoc, and code documentation

-   **TSDoc specification**  
    Type: Documentation - [https://tsdoc.org/](https://tsdoc.org/)  
    Notes: Microsoft. Reference for all tags and their semantics
    
-   **TypeDoc**  
    Type: Tool - [https://typedoc.org/](https://typedoc.org/)  
    Notes: Configuration, plugins, and CI integration
    
-   **eslint-plugin-tsdoc**  
    Type: Tool - [https://www.npmjs.com/package/eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc)  
    Notes: Linting of TSDoc comments directly in the editor
    
-   **api-extractor**  
    Type: Tool - [https://api-extractor.com/](https://api-extractor.com/)  
    Notes: For public SDKs with strict TSDoc validation
    

---

## Context7 MCP

-   **Context7 GitHub**  
    Type: GitHub - [https://github.com/upstash/context7](https://github.com/upstash/context7)  
    Notes: Source code, issues, and changelog
    
-   **Context7 Dashboard**  
    Type: Platform - [https://context7.com/dashboard](https://context7.com/dashboard)  
    Notes: Free API key and search for supported libraries
    
-   **Upstash blog post**  
    Type: Article - [https://upstash.com/blog/context7-mcp](https://upstash.com/blog/context7-mcp)  
    Notes: Explanation of how it works internally
    
-   **npm** `@upstash/context7-mcp`  
    Type: npm package - [https://www.npmjs.com/package/@upstash/context7-mcp](https://www.npmjs.com/package/@upstash/context7-mcp)  
    Notes: Installation and changelog
    

---

## Documentation testing in CI

-   **Writing quality (style & clarity)**
    
    -   **Vale**  
        Type: Tool - [https://vale.sh/](https://vale.sh/)  
        Notes: Official documentation and available styles (Microsoft, Google, write-good…)
        
    -   **Microsoft style package (Vale)**  
        Type: Rules / Style - [https://github.com/errata-ai/Microsoft](https://github.com/errata-ai/Microsoft)  
        Notes: ~150 technical documentation style rules
        
    -   **Vale GitHub Action**  
        Type: Integration - [https://github.com/errata-ai/vale-action](https://github.com/errata-ai/vale-action)  
        Notes: Uses `reviewdog` to comment directly on PRs
        
-   **Markdown quality (structure & formatting)**
    
    -   **markdownlint-cli2**  
        Type: Tool - [https://github.com/DavidAnson/markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)  
        Notes: Rules reference and YAML configuration
        
    -   **markdownlint-cli2 Action**  
        Type: Integration - [https://github.com/DavidAnson/markdownlint-cli2-action](https://github.com/DavidAnson/markdownlint-cli2-action)  
        Notes: Official GitHub Action for Markdown linting
        
-   **Link quality (reliability)**
    
    -   **lychee**  
        Type: Tool - [https://lychee.cli.rs/](https://lychee.cli.rs/)  
        Notes: Documentation and configuration via `.lychee.toml`
        
    -   **lychee GitHub Action**  
        Type: Integration - [https://github.com/lycheeverse/lychee-action](https://github.com/lycheeverse/lychee-action)  
        Notes: Parameters and workflow examples
        

---

## llms.txt

-   **Fundamentals and specification**
    
    -   **llms.txt specification**  
        Type: Documentation - [https://llmstxt.org/](https://llmstxt.org/)  
        Notes: Original proposal by [Answer.AI](http://answer.ai/)
        
-   **Real examples**
    
    -   **Directory of sites with llms.txt**  
        Type: Reference - [https://directory.llmstxt.cloud/](https://directory.llmstxt.cloud/)  
        Notes: Real examples of projects with well-implemented llms.txt
        
-   **Automation**
    
    -   **Starlight plugin for llms.txt**  
        Type: Tool - [https://github.com/HiDeoo/starlight-llms-txt](https://github.com/HiDeoo/starlight-llms-txt)  
        Notes: Generates `llms.txt` and `llms-full.txt` automatically
        

---

## Data and reports

-   **Problem: time lost in development**
    
    -   **Atlassian State of DevEx 2025**  
        Type: Report - [https://www.atlassian.com/teams/software-development/state-of-developer-experience-2025](https://www.atlassian.com/teams/software-development/state-of-developer-experience-2025)  
        Notes: 50% of developers lose more than 10h/week; the biggest problem is "finding information"
        
-   **Shift: AI's impact on code**
    
    -   **Sonar State of Code 2026**  
        Type: Report - [https://www.sonarsource.com/state-of-code-developer-survey-report.pdf](https://www.sonarsource.com/state-of-code-developer-survey-report.pdf)  
        Notes: 42% of code is AI-generated or AI-assisted; 65% of senior devs highlight improved documentation as a key benefit
        
-   **Tension: trust vs dependence**
    
    -   **Stack Overflow Survey 2025**  
        Type: Report - [https://survey.stackoverflow.co/2025/](https://survey.stackoverflow.co/2025/)  
        Notes: Technical documentation remains the #1 resource (68%); trust in AI is at an all-time low (54% do not trust it)
        
-   **Future: a shift in who consumes documentation**
    
    -   **Mintlify Series B (April 2026)**  
        Type: Article - [https://mintlify.com/blog/series-b](https://mintlify.com/blog/series-b)  
        Notes: "Over 50% of traffic is already AI agents, not humans" — Han Wang
        

---

## SaaS documentation platforms (for reference)

Mentioned in the session but outside the scope of the master's program project due to cost or focus:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/97f8e80d-15c3-43dc-b763-c07e3b412a28/511474ef89bf04fe.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

For the master's program project and for most internal projects: **Starlight + GitHub Pages = $0** covers 90% of the needs.

---

## People and channels to follow

-   **References in architecture and documentation**
    
    -   **Simon Brown (@simonbrown)**  
        Type: Person  
        Platform: X / LinkedIn  
        Notes: C4 Model and architecture documentation
        
-   **Trends in documentation as a product**
    
    -   **Han Wang (@handotdev)**  
        Type: Person  
        Platform: X / LinkedIn  
        Notes: Mintlify, the future of docs-as-product
        
-   **Documentation quality tools**
    
    -   **David Anson (@DavidAnson)**  
        Type: Person  
        Platform: GitHub  
        Notes: markdownlint and Markdown quality tools
        
    -   **errata-ai**  
        Type: Organization  
        Platform: GitHub  
        Notes: Vale and technical documentation styles
        
-   **Ecosystem and stack updates**
    
    -   **Astro blog**  
        Type: Blog - [https://astro.build/blog/](https://astro.build/blog/)  
        Notes: News on Starlight and the Astro framework
        
    -   **AdonisJS releases**  
        Type: Blog - [https://adonisjs.com/blog/](https://adonisjs.com/blog/)  
        Notes: Changes in the master's program stack — worth checking quarterly
