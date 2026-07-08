# 📄 OpenSpec cheat sheet 🔴 — 6 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 6 min

## Slash commands

### `core` profile (default — the 3 you'll use 90% of the time)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/402d1ab1-9d71-4b6f-9e9a-a27fe04abc52/d8b65cb6f7340658.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

### `expanded` profile (opt-in — more granular control)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/8f45241d-0884-4228-92c8-06156e8e2795/e0d883e2f78f5b32.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

## 💻 CLI (terminal)

```
openspec --version              # Installed version
openspec init                   # Initialize OpenSpec in the current project
openspec config profile         # Switch profile core ↔ expanded
openspec config list            # List current configuration
openspec update                 # Regenerate slash commands after changes

openspec list                   # List active changes
openspec show <change-name>     # Show details of a change
openspec validate <change-name> # Validate spec format
openspec view                   # Interactive dashboard (TUI)
openspec feedback               # Create a GitHub Issue with metadata
```

---

## 📁 Folder structure after `openspec init`

```
openspec/
├── project.md                  # project context (you curate this)
├── changes/                    # active proposals
│   └── <change-name>/
│       ├── proposal.md         # why + what
│       ├── specs/              # delta specs per capability
│       │   └── <capability>/
│       │       └── spec.md
│       ├── design.md           # technical decisions
│       └── tasks.md            # implementation checklist
└── specs/                      # living specs (filled in when archiving)
    └── <capability>/
        └── spec.md

# After `/opsx:archive`, the change moves to:
openspec/changes/archive/<YYYY-MM-DD>-<change-name>/
```

---

## 📝 Delta spec syntax (copy this)

```
# Delta for <capability>

## ADDED Requirements

### Requirement: <Requirement name>
The system MUST <expected behavior>.

#### Scenario: <scenario name>
- WHEN <action that occurs>
- THEN <expected result>
- AND <additional result>  (optional)

## MODIFIED Requirements

### Requirement: <Name of the existing requirement>
The system SHALL <new behavior>.
(Previously: <previous behavior>)

#### Scenario: <name>
- WHEN ...
- THEN ...

## REMOVED Requirements

### Requirement: <Requirement name> (Deprecated in favor of Y)
```

---

## Useful environment variables

```
export OPENSPEC_TELEMETRY=0    # Disable telemetry
export DO_NOT_TRACK=1          # Equivalent standard
```

---

## Common errors and how to fix them

![image.png](https://media1-production-mightynetworks.imgix.net/asset/e4062998-872c-40e5-99a5-5cb304555069/f00ff1d3986818d4.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

---

## Typical workflow (memorize it)

```
┌─────────────────────────────────────────────────────────────┐
│  1.  /opsx:propose "describe what you want to do"           │
│      → AI generates proposal.md + specs/ + design.md + tasks.md│
│                                                             │
│  2.  You REVIEW the 4 files. Edit if the AI improvised.     │
│      → This is the most valuable moment of the flow.        │
│                                                             │
│  3.  /opsx:apply                                            │
│      → AI implements, writes tests, runs tests.             │
│                                                             │
│  4.  You test manually. If everything is OK:                │
│                                                             │
│  5.  /opsx:archive                                          │
│      → Delta spec is merged into the living spec.           │
│      → Change moves to archive/.                            │
│                                                             │
│  6.  Commit + push. PR to main.                             │
└─────────────────────────────────────────────────────────────┘
```
