# ✍️ Ejercicio previo: Instalar SDD en un proyecto limpio 🔴 | AI-Driven Delivery

---

**Repositorio:** [**Github**](https://github.com/LIDR-academy/ai4devs-openspec-sandbox-2026-06)

## Objetivo

Asentar los **3 Pilares (Herramienta, Contexto, Prompt)** aplicándolos de forma consciente, y llegar a la sesión con **OpenSpec ya instalado y funcionando** en un proyecto sandbox.

---

## Prerrequisitos

-   **Node.js v20.19.0 o superior** instalado en tu máquina (requisito de OpenSpec)
    
-   Acceso a un copiloto de IA de tu elección (ChatGPT, Claude, Copilot, Cursor…)
    

Verifica tu versión de Node antes de empezar:

bash

`node --version`

Si tu versión es inferior a la 20.19.0, actualízala antes de continuar (con `nvm`, el instalador oficial o el gestor que prefieras).

---

## Parte A — Repaso de los 3 Pilares

### Aplicación deliberada de los 3 Pilares en una micro-tarea

Elige una **micro-tarea** cualquiera. Algunas ideas (puedes proponer otra):

-   Validador de email
    
-   Parser sencillo de CSV
    
-   Función de formateo de fechas (ISO → "hace X minutos")
    
-   Generador de slugs a partir de un título
    
-   Función que detecte si un string es un palíndromo
    

Resuélvela con tu copiloto preferido aplicando los 3 Pilares **de forma explícita**. Antes de lanzar el prompt, anota tus decisiones:

### Plantilla de registro

markdown

```
*Micro-tarea:* [descripción en una línea]
*Pilar 1 — Herramienta:* ¿Cuál eliges?
 ¿Por qué esta y no otra?
*Pilar 2 — Contexto:* ¿Qué información estás aportando? (lenguaje, framework, restricciones, ejemplos…)
 ¿Hay algo del contexto que has decidido omitir conscientemente?
*Pilar 3 — Prompt:* ¿Cómo lo estructuras? (estilo, formato de salida, ejemplos…)
 Pega aquí el prompt final que vas a lanzar.
*Resultado:* ¿Funcionó a la primera o tuviste que iterar?
 Una mejora que harías si volvieras a hacerlo.
```

---

## Parte B — Instalación de OpenSpec en sandbox

### Paso 1 — Crea un proyecto sandbox

Crea una carpeta nueva **fuera de cualquier proyecto existente**. Este proyecto es **descartable**: sólo sirve para trastear con OpenSpec, no para construir nada que vayas a usar.

bash

```
mkdir openspec-sandbox
cd openspec-sandbox
```

---

### Paso 2 — Instala la CLI de OpenSpec

OpenSpec se distribuye como un paquete npm global:

bash

```
npm install -g @fission-ai/openspec@latest
```

Verifica que la instalación ha funcionado:

bash

```
openspec --version
```

Si el comando responde con un número de versión, vas bien. Si te da error, revisa que Node esté correctamente instalado y que tu PATH incluya el directorio de binarios globales de npm.

---

### Paso 3 — Inicializa OpenSpec en el sandbox

Desde dentro del directorio `openspec-sandbox`, ejecuta:

bash

```
openspec init
```

Esto lanza un asistente de configuración. Durante la inicialización:

1.  **Selecciona el asistente de IA** que más uses (Claude Code, Cursor, Copilot, OpenCode…). Elige el que vayas a utilizar más probablemente — esto sólo afecta a dónde se instalan las skills y los comandos (`.claude/skills/`, `.opencode/skills/`, etc.).
    
2.  **Acepta los valores por defecto** del resto de prompts. No necesitas personalizar nada para este ejercicio.
    

Cuando termine, comprueba que se ha creado la estructura esperada:

bash

`ls -la`

Deberías ver al menos:

-   📁 `openspec/` — directorio principal con la configuración y los specs
    
-   📁 `.claude/skills/` (o equivalente según el asistente elegido)
    
-   📄 Posiblemente `openspec/**config.yaml**` — el "constitution" del proyecto
    

Ya deberías haber alcanzado lo siguiente:

-   OpenSpec está instalado correctamente
    
-   La estructura de carpetas de OpenSpec aparece en tu sandbox
    
-   El comando `openspec --version` responde sin errores
    

---

### Paso 4 — Exploración guiada

Ahora trastea con lo que OpenSpec ha generado. **No escribas specs todavía** — sólo explora.

**4.1. Lee el archivo** `openspec/config.yaml # ← contexto + reglas del proyecto (reemplaza a project.md)`  
Echa un vistazo a lo que OpenSpec ha generado como plantilla. Este archivo es la "constitución" del proyecto en la filosofía de OpenSpec: define los principios y restricciones no negociables que toda spec futura debe respetar.

**4.2. Mira la estructura interna** Explora el árbol de `openspec/`:

bash

`ls -R openspec/`

Identifica las carpetas/archivos principales:

-   ¿dónde se guardarían las propuestas?
    
-   ¿dónde los specs?
    
-   ¿dónde lo archivado?
    

**4.3. Lee un ejemplo del workflow OPSX** Lee por encima la documentación oficial sobre el flujo **propose → apply → archive** (o sobre OPSX si estás en una versión reciente). No tienes que entenderlo todo — sólo familiarizarte con el vocabulario.

---

### Paso 5 — Registra 3 observaciones

Cierra la Parte B con **3 cosas que te hayan llamado la atención** durante la exploración. Pueden ser de cualquier tipo:

-   Algo del formato de los archivos
    
-   Una convención que te sorprendió
    
-   Un comando que no acabas de entender
    
-   Una decisión de diseño del framework
    
-   Una analogía con algo que ya conoces
    
-   Cualquier "ah, mira"
    

No hace falta que sean profundas. Lo importante es que llegues con material propio a la sesión.

---

## **Entrega del ejercicio**

Para entregar este ejercicio, deberás subir un **pull request** al repositorio correspondiente.

Tu entrega debe consistir en **un único documento** dentro del repo. Puede ser en formato **Markdown**, notas o el formato que prefieras, siempre que sea claro y fácil de revisar.

El documento debe incluir:

**Evidencia de que OpenSpec está instalado y operativo en el sandbox**

Incluye una captura o evidencia donde se vea:

-   `openspec --version` funcionando correctamente.
    
-   `ls` mostrando la estructura del proyecto.
    

**Plantilla de la Parte A completada**

Rellena la plantilla aplicando los **3 Pilares** a tu aplicación.

**3 observaciones de la exploración de OpenSpec**

Agrega tres aprendizajes, hallazgos o comentarios derivados de haber explorado OpenSpec.

---

## **Pasos para entregar mediante Pull Request**

1.  Haz un **fork** del repositorio usando el botón ubicado arriba a la derecha.
    
2.  Clona tu fork en tu computadora. Será un proyecto con el mismo nombre, pero bajo tu usuario.
    
3.  Completa el ejercicio:
    
    -   Rellena el prompt.
        
    -   Agrega o modifica los archivos correspondientes dentro de tu carpeta.
        
    -   Sube el documento único con la evidencia, la Parte A y las observaciones.
        
4.  Crea una nueva rama para tu solución, por ejemplo:
    

```
git checkout -b solved-stopwatch
```

1.  Haz commit de tus cambios:
    

```
git add .
git commit -m "Solve stopwatch exercise"
```

1.  Sube tu rama al repositorio:
    

```
git push origin solved-stopwatch
```

1.  En la interfaz de GitHub de tu fork aparecerá un aviso para crear el **Pull Request**.
    
2.  Crea el Pull Request hacia el repositorio original.
    

Esa será tu entrega final.

---

## Recursos recomendados

-   **Documentación oficial de OpenSpec:** [https://openspec.pro](https://openspec.pro/)
    
-   **Repositorio de OpenSpec en GitHub:** búscalo como `fission-ai/openspec`
    
-   **Guía en español:** *Spec Driven Development con OpenSpec* en [webreactiva.com](http://webreactiva.com/) — buena introducción al workflow OPSX si quieres contexto adicional
    
-   **Vídeo de getting started** (opcional): "Getting Started with OpenSpec | Spec Driven Development | Setup Tutorial" en YouTube
    

---

**Fecha de entrega: 17 JUN 26**
