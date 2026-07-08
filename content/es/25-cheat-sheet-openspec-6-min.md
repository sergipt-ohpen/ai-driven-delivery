# 📄 Cheat-sheet OpenSpec 🔴 — 6 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 6 min

## Slash commands

### Perfil `core` (default — los 3 que vas a usar el 90% del tiempo)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/402d1ab1-9d71-4b6f-9e9a-a27fe04abc52/d8b65cb6f7340658.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### Perfil `expanded` (opt-in — más control granular)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/8f45241d-0884-4228-92c8-06156e8e2795/e0d883e2f78f5b32.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

## 💻 CLI (terminal)

```
openspec --version              # Versión instalada
openspec init                   # Inicializa OpenSpec en el proyecto actual
openspec config profile         # Cambia perfil core ↔ expanded
openspec config list            # Lista configuración actual
openspec update                 # Regenera slash commands después de cambios

openspec list                   # Lista changes activos
openspec show <change-name>     # Muestra detalles de un change
openspec validate <change-name> # Valida formato del spec
openspec view                   # Dashboard interactivo (TUI)
openspec feedback               # Crea un GitHub Issue con metadata
```

---

## 📁 Estructura de carpetas tras `openspec init`

```
openspec/
├── project.md                  # contexto del proyecto (lo curás vos)
├── changes/                    # propuestas activas
│   └── <change-name>/
│       ├── proposal.md         # por qué + qué
│       ├── specs/              # delta specs por capability
│       │   └── <capability>/
│       │       └── spec.md
│       ├── design.md           # decisiones técnicas
│       └── tasks.md            # checklist de implementación
└── specs/                      # specs vivas (se llenan al archivar)
    └── <capability>/
        └── spec.md

# Tras `/opsx:archive`, el change se mueve a:
openspec/changes/archive/<YYYY-MM-DD>-<change-name>/
```

---

## 📝 Sintaxis delta spec (copia esto)

```
# Delta for <capability>

## ADDED Requirements

### Requirement: <Nombre del requirement>
The system MUST <comportamiento esperado>.

#### Scenario: <nombre escenario>
- WHEN <acción que ocurre>
- THEN <resultado esperado>
- AND <resultado adicional>  (opcional)

## MODIFIED Requirements

### Requirement: <Nombre del requirement existente>
The system SHALL <nuevo comportamiento>.
(Previously: <comportamiento previo>)

#### Scenario: <nombre>
- WHEN ...
- THEN ...

## REMOVED Requirements

### Requirement: <Nombre del requirement> (Deprecated en favor de Y)
```

---

## Variables de entorno útiles

```
export OPENSPEC_TELEMETRY=0    # Desactiva telemetría
export DO_NOT_TRACK=1          # Standard equivalente
```

---

## Errores comunes y cómo resolverlos

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e4062998-872c-40e5-99a5-5cb304555069/f00ff1d3986818d4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

---

## Flujo de trabajo típico (memorízalo)

```
┌─────────────────────────────────────────────────────────────┐
│  1.  /opsx:propose "describe lo que queres hacer"           │
│      → AI genera proposal.md + specs/ + design.md + tasks.md│
│                                                             │
│  2.  REVISÁS los 4 archivos. Editás si la IA improvisó.     │
│      → Este es el momento más valioso del flujo.            │
│                                                             │
│  3.  /opsx:apply                                            │
│      → AI implementa, escribe tests, ejecuta tests.         │
│                                                             │
│  4.  Probás manualmente. Si todo OK:                        │
│                                                             │
│  5.  /opsx:archive                                          │
│      → Delta spec se fusiona con la spec viva.              │
│      → Change se mueve a archive/.                          │
│                                                             │
│  6.  Commit + push. PR a main.                              │
└─────────────────────────────────────────────────────────────┘
```
