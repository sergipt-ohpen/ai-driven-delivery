# ✍️Ejercicio previo: Inventario del backlog🔴 | AI4Devs 2026/06 Seniors

**Fecha de entrega: 29 JUNIO, al final del día**

---

## Objetivo

Llegar a la sesión con un backlog inicial de FlowSync ya generado: convertir el PRD del proyecto en un conjunto de user stories con criterios de aceptación, usando IA como herramienta, pero **diseñando tú el prompt** y **revisando críticamente la salida**.

---

## Prerrequisitos

1.  Haber consumido el material asíncrono de la S4, en especial la página 2 (anatomía de un backlog AI-ready) y el patrón "AI as poke-holes".
    
2.  Tener acceso a un **copiloto de IA** de tu elección (Claude Code recomendado, es lo que usaremos en la demo; Cursor, [Claude.ai](http://claude.ai/) web, ChatGPT o Gemini también sirven, el ejercicio es agnóstico al modelo).
    

---

## El ejercicio

### Parte 1 - Diseña tu prompt de descomposición (15-20 min)

Escribe un prompt para pedirle a una IA que extraiga user stories del PRD de FlowSync. El prompt debe cumplir, **al menos**, estos cinco requisitos:

1.  **Contexto**: dar a la IA la información necesaria para entender qué es FlowSync, para quién es, y cuál es el alcance del MVP.
    
2.  **Formato exacto**: las stories deben venir en el formato `Como [rol], quiero [acción], para [beneficio]`.
    
3.  **Alcance acotado**: solo funcionalidades del MVP (la sección correspondiente del PRD); sin inventar features que no estén en el documento.
    
4.  **AC en Given/When/Then**: cada story con 3-5 criterios de aceptación verificables, no genéricos.
    
5.  **Agrupación**: las stories agrupadas por módulo, caso de uso o épica, según tenga más sentido para FlowSync.
    

Te recomiendo que tu prompt incluya:

-   ✅ Una sección de "rol" para la IA (eres un Product Owner senior con experiencia en aplicaciones SaaS).
    
-   ✅ Restricciones explícitas (non-goals: no inventar features, no estimar tiempos, no proponer arquitectura).
    
-   ✅ Un ejemplo del formato de output esperado (1-2 stories ya escritas a mano sirven).
    
-   ✅ Una instrucción de "marca con `(asumido)` lo que infieras y no esté literal en el PRD".
    

> 💡 **Pista (no es obligación)**: el patrón **estructura → restricciones → ejemplo → instrucción de transparencia** suele dar resultados notablemente mejores que prompts narrativos sueltos. Lo viste aplicado en la página 2 del asíncrono.

### Parte 2 - Ejecuta el prompt (5-10 min)

Lanza el prompt contra el PRD usando el copiloto que prefieras. Guarda el **output crudo**, exactamente como te lo devuelve la IA. No retoques nada todavía, el output sin pulir es parte de lo que analizaremos.

### Parte 3 - Aplica el patrón "AI as poke-holes" (10-15 min)

Esta es la parte más valiosa, y la que casi nadie hace cuando trabaja con IA por primera vez.

Toma **una de las stories que generó la IA** (la que veas con AC más completos a primera vista) y pídele explícitamente que la critique:

```
Aquí tienes esta user story con sus criterios de aceptación:
[pega la story aquí]

Tu tarea: identifica edge cases, supuestos implícitos,
escenarios faltantes, y dependencias o riesgos no
mencionados. No reescribas la story, solo lista lo
que falta o lo que asumiste.
```

Anota **3-5 hallazgos genuinos** (descarta el ruido). Estos son los que vamos a comentar en la sesión en vivo.

### Parte 4 - Reflexión breve (5 min)

Cierra con 4-6 líneas de reflexión honesta:

-   ¿Qué te sorprendió del output de la IA?
    
-   ¿Qué falló o tuviste que corregir?
    
-   ¿El patrón poke-holes te encontró algo que tú no habías visto?
    

Respuestas honestas y específicas valen más que respuestas elaboradas y genéricas.

## [REPOSITORIO  
GITHUB](https://github.com/LIDR-academy/ai4devs-s04-planificacion-ia-2026-06-Seniors)

---

## Qué entregar

Sube a tu rama `alumno/<nombre-apellido>` del repo del programa una carpeta `entregables/sesion-04/` con:

```diagram
entregables/sesion-04/
├── prompt.md         # Tu prompt completo
├── output.md         # El output crudo de la IA (sin retocar)
├── poke-holes.md     # Los 3-5 hallazgos de la Parte 3
└── reflexion.md      # 4-6 líneas de la Parte 4
```

> 📌 **No hace falta perfección.** Lo importante es el proceso, no la pulcritud. La sesión en vivo se basa en lo que aprendiste haciéndolo, incluyendo lo que falló.

---

## Criterio de completitud ✅

Sabes que terminaste cuando:

-   Tienes un `prompt.md` que cubre los 5 requisitos de la Parte 1.
    
-   Tienes `output.md` con al menos 8-12 user stories generadas, agrupadas, con AC en Given/When/Then.
    
-   Tienes `poke-holes.md` con 3-5 hallazgos no triviales (gaps, supuestos, edge cases reales).
    
-   Tienes `reflexion.md` con tu reflexión honesta.
    
-   Has commiteado y pusheado a tu rama `alumno/<tu-nombre>` con el directorio `entregables/sesion-04/`.
    

---

## Pasos para entregar mediante Pull Request

1.  Haz un **fork** del repositorio usando el botón ubicado arriba a la derecha (o trabaja sobre tu rama `alumno/<nombre-apellido>` si la cohorte usa el repo compartido).
    
2.  Clona tu fork en tu computadora.
    
3.  Completa el ejercicio dentro de `entregables/sesion-04/`:
    
    -   Añade `prompt.md`, `output.md`, `poke-holes.md` y `reflexion.md`.
        
4.  Crea una rama para tu solución:
    

```
git checkout -b alumno/nombre-apellido
```

1.  Haz commit de tus cambios:
    

```
git add entregables/sesion-04/
git commit -m "S4: backlog inicial FlowSync + poke-holes"
```

1.  Sube tu rama:
    

```
git push origin alumno/nombre-apellido
```

1.  Crea el Pull Request hacia el repositorio original. Esa será tu entrega final.
    

Si tu output está en una herramienta externa, asegúrate de que tu TA (Teaching Assistant) tenga acceso de lectura al enlace que envíes.

---

```
# PRD — FlowSync MVP

> **Producto**: FlowSync
> **Versión del documento**: 1.0 · Q3 2026
> **Estado**: aprobado para MVP
> **Owner de producto**: equipo FlowSync
> **Audiencia de este documento**: equipo de ingeniería (backend, frontend), QA, y cualquier agente de IA que vaya a decomponer este PRD en backlog.

---

## 1. Resumen ejecutivo

FlowSync es una aplicación web de gestión de tareas personales que **mantiene sincronizadas las tareas del usuario con su Google Calendar**. El problema que resuelve: las personas gestionan sus pendientes en una herramienta (listas de tareas) y su tiempo en otra (calendario), y mantener ambas alineadas a mano es tedioso y propenso a errores. FlowSync elimina ese trabajo manual: las tareas con fecha aparecen como eventos en el calendario, y los cambios fluyen en ambas direcciones.

El MVP busca validar una hipótesis central: **¿la gente con sobrecarga de herramientas adoptará un gestor de tareas si elimina la doble gestión tarea/calendario?**

### Qué incluye el MVP
- Registro y autenticación de usuarios.
- CRUD completo de tareas con estados.
- Filtrado y organización básica de tareas.
- Exportación de tareas.
- Sincronización con Google Calendar (lectura y escritura).

### Qué NO incluye el MVP (out of scope explícito)
- Equipos o tareas compartidas (FlowSync MVP es estrictamente individual).
- Sincronización con calendarios que no sean Google (Outlook, iCal: post-MVP).
- Notificaciones push o por email.
- Aplicación móvil nativa (solo web responsive).
- Etiquetas, proyectos, o jerarquías de tareas (subtareas): post-MVP.
- Recordatorios configurables más allá de los del propio Google Calendar.

---

## 2. Usuario objetivo

**Perfil primario**: profesional del conocimiento (knowledge worker) entre 25 y 45 años, que ya usa Google Calendar a diario para su trabajo y que actualmente gestiona sus pendientes en una herramienta separada (Todoist, Notion, una libreta, o post-its). Tiene entre 5 y 30 tareas activas en un momento dado. Valora la simplicidad y se frustra con herramientas que requieren mantenimiento manual.

**Job to be done**: *"Cuando tengo una tarea con fecha límite, quiero que aparezca en mi calendario sin que yo tenga que copiarla a mano, para no tener que mirar dos sitios distintos para saber qué tengo que hacer hoy."*

---

## 3. Requisitos funcionales

### 3.1 — Autenticación y gestión de cuenta

FlowSync requiere que cada usuario tenga una cuenta propia. Los datos de un usuario nunca son visibles para otro.

- Un visitante puede **crear una cuenta** con email y contraseña. La contraseña debe tener al menos 8 caracteres.
- Si el email ya está registrado, el sistema lo indica y ofrece ir al inicio de sesión.
- Un usuario registrado puede **iniciar sesión** con su email y contraseña.
- Un usuario autenticado puede **cerrar sesión**.
- Tras el registro exitoso, el usuario llega a una pantalla de bienvenida (onboarding mínimo) que explica en una frase qué hace FlowSync y le invita a crear su primera tarea.
- La sesión se mantiene mediante tokens de acceso. No se requiere "recordar contraseña" ni verificación de email por enlace en el MVP.

### 3.2 — Gestión de tareas (CRUD)

El núcleo de FlowSync. Una tarea tiene, como mínimo: título, descripción opcional, estado, y fecha límite opcional.

- Un usuario puede **crear una tarea** indicando al menos un título. La descripción y la fecha límite son opcionales.
- Un usuario puede **ver el listado** de sus tareas.
- Un usuario puede **editar** cualquier campo de una tarea existente.
- Un usuario puede **borrar** una tarea.
- Cada tarea tiene un **estado**: `pending` (pendiente), `completed` (completada) o `archived` (archivada). Una tarea recién creada nace en `pending`.
- Un usuario puede **cambiar el estado** de una tarea (por ejemplo, marcarla como completada).

### 3.3 — Organización y filtrado

Con varias tareas, el usuario necesita encontrarlas y agruparlas.

- Un usuario puede **filtrar sus tareas por estado** (ver solo pendientes, solo completadas, etc.).
- El listado de tareas se muestra, por defecto, ordenado de forma que las más relevantes para "hoy" sean visibles primero. *(El criterio exacto de ordenación queda a decisión del equipo durante el refinamiento.)*
- Cuando un usuario no tiene ninguna tarea (cuenta nueva o todas archivadas), ve un estado vacío con una invitación a crear la primera.

### 3.4 — Exportación

Los usuarios quieren poder llevarse sus datos.

- Un usuario puede **exportar sus tareas a un archivo CSV** que incluya, como mínimo, título, descripción, estado y fecha límite de cada tarea.

### 3.5 — Sincronización con Google Calendar

La funcionalidad diferenciadora de FlowSync. Es también la más compleja y arriesgada del MVP.

- Un usuario puede **conectar su cuenta de Google** a FlowSync (autorización OAuth con Google).
- Una vez conectado, las **tareas con fecha límite aparecen como eventos** en el Google Calendar del usuario.
- Si el usuario **cambia la fecha de una tarea** en FlowSync, el evento correspondiente en Google Calendar se actualiza.
- Si el usuario **completa o borra una tarea** en FlowSync, el evento correspondiente en Google Calendar se elimina o se marca según corresponda.
- El usuario puede **desconectar** su cuenta de Google en cualquier momento; al hacerlo, FlowSync deja de sincronizar pero no borra las tareas ya creadas.
- La sincronización debe manejar de forma razonable los casos en que la API de Google no esté disponible o devuelva errores (la tarea se guarda en FlowSync aunque la sincronización falle, y se reintenta más tarde).

> **Nota de producto**: la dirección de sincronización del MVP es primariamente **FlowSync → Google Calendar** (las tareas crean/actualizan eventos). La sincronización inversa completa (editar un evento en Google y que se refleje como cambio en la tarea) es deseable pero su alcance exacto debe validarse con un spike técnico antes de comprometerla, dado el coste de gestionar conflictos y el polling/webhooks de la API de Google.

---

## 4. Requisitos no funcionales

- **Privacidad**: los datos de un usuario (tareas, tokens de Google) nunca son accesibles por otros usuarios. Los tokens de Google se almacenan de forma segura.
- **Rendimiento**: el listado de tareas debe cargar en menos de 1 segundo para un usuario con hasta 200 tareas.
- **Responsive**: la interfaz funciona en navegadores de escritorio y móvil (no hay app nativa, pero la web es usable en móvil).
- **Errores claros**: cualquier error de validación (email inválido, contraseña corta, campos obligatorios) se muestra al usuario de forma comprensible, no como un error técnico.
- **Observabilidad**: las operaciones de sincronización con Google se registran (logs) para poder diagnosticar fallos.

---

## 5. Stack técnico (contexto para el equipo)

> Esta sección es informativa. El PRD no prescribe arquitectura; el "cómo" se define en las specs (OpenSpec) durante el desarrollo. Pero el equipo trabaja sobre un stack fijado:

- **Backend**: AdonisJS 7 + TypeScript + Lucid ORM + SQLite (vía `better-sqlite3`) + VineJS para validación + `@adonisjs/auth` (access tokens).
- **Frontend**: React 19 + TypeScript + Vite + React Router + Tailwind v4 + shadcn/ui.
- **Integración externa**: Google Calendar API (OAuth 2.0).

---

## 6. Criterios de éxito del MVP

El MVP se considera exitoso si, tras 4 semanas con usuarios reales:

- Un usuario puede completar el flujo entero — registrarse, crear tareas, conectar Google Calendar y ver sus tareas reflejadas como eventos — sin ayuda externa.
- Al menos el 40% de los usuarios que se registran conectan su Google Calendar (señal de que la propuesta de valor diferenciadora se entiende y se desea).
- La sincronización funciona de forma fiable: menos del 5% de las operaciones de sincronización fallan de forma no recuperable.

---

## 7. Riesgos conocidos

- **La sincronización con Google Calendar es el mayor riesgo técnico del MVP.** La API tiene rate limits, manejo de zonas horarias complejo, y casos límite (eventos recurrentes, eventos de todo el día) que pueden inflar el alcance. Se recomienda un spike técnico antes de comprometer su decomposición en tareas.
- **OAuth con Google** requiere configuración de proyecto en Google Cloud Console y revisión de permisos; el setup inicial puede llevar más tiempo del esperado.
- **Zonas horarias**: la relación entre la fecha límite de una tarea y la hora de un evento de calendario debe definirse con cuidado para no crear eventos a horas erróneas.

---

## 8. Glosario

- **Tarea**: unidad de trabajo del usuario. Tiene título, descripción opcional, estado y fecha límite opcional.
- **Estado**: situación de una tarea — `pending`, `completed` o `archived`.
- **Evento**: entrada en Google Calendar generada a partir de una tarea con fecha límite.
- **Sincronización**: el proceso por el que las tareas de FlowSync se reflejan como eventos en Google Calendar.
- **Conexión de Google**: la autorización OAuth que permite a FlowSync leer y escribir en el calendario del usuario.
```
