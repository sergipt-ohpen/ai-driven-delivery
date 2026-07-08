# 🎥 Fundamentos: de Machine Learning a LLMs 🟢 — 19 min | AI4Devs 2026/06 Seniors

⏳ Tiempo estimado: 19 min

> El objetivo de esta sección **NO es** que domines los detalles matemáticos de las redes neuronales. Es que entiendas **lo mínimo necesario para no usar mal tu copilot**. Si terminas esta lección sabiendo qué es un token, qué es la ventana de contexto, por qué los LLMs alucinan y cuándo usar RAG vs. fine-tuning, has hecho tu trabajo de pre-curso.

## Por qué un dev senior necesita esto

Como senior, no vas a entrenar modelos. Vas a **prompearlos, integrarlos, supervisarlos y depurar sus salidas**. Para hacerlo bien necesitas un modelo mental correcto de qué hay debajo. Sin él, te vas a frustrar por razones que parecen aleatorias pero no lo son:

-   "¿Por qué el agente se olvidó del archivo que le pasé hace 5 mensajes?" → ventana de contexto.
    
-   "¿Por qué inventó un endpoint que no existe?" → mecanismo de probabilidad, no de verdad.
    
-   "¿Por qué la respuesta cambia cada vez aunque el prompt sea el mismo?" → temperatura.
    
-   "¿Por qué no sabe lo que pasó en mi empresa la semana pasada?" → modelo base vs. RAG.
    

Esos cuatro malentendidos cubren el 80% de las frustraciones que se atribuyen a "la IA es mala". En realidad, son malentendidos sobre cómo funciona.

## Contexto histórico breve (no te detengas aquí)

El **Machine Learning clásico** se clasifica en 4 categorías que llevan décadas existiendo:

-   **Supervisado**: aprende de datos etiquetados (spam/no spam, foto de gato/perro). Algoritmos: regresión, KNN, SVM, árboles.
    
-   **No supervisado**: encuentra patrones sin etiquetas (clustering, recomendaciones). Algoritmos: K-means, PCA.
    
-   **Refuerzo**: aprende por prueba y error con recompensas (AlphaGo, robots). Algoritmos: Q-learning, policy gradient.
    
-   **Redes neuronales profundas**: capas de neuronas que extraen features automáticamente. Variantes: CNN (imágenes), RNN/LSTM (secuencias), **Transformer** (texto y todo lo demás).
    

Todo esto sigue vivo y se usa en producción. Pero **el paradigma dominante hoy en herramientas de developer son los LLMs basados en Transformer + post-training con refuerzo**. Eso es lo que vas a usar todos los días en el máster, así que vamos directo allí.

## La revolución del Transformer (2017)

📄 Paper original: *Attention Is All You Need* (Vaswani et al., NeurIPS 2017).

**Lo que cambió**: las redes anteriores (RNN, LSTM) procesaban texto **secuencialmente** — palabra por palabra, esperando a la anterior. El Transformer reemplazó la recurrencia por **self-attention**: cada token puede atender a todos los demás **en paralelo**.

¿Por qué importa esto? Dos razones:

1.  **Paralelización masiva en GPUs**: por eso explotó la escala. RNNs no podían entrenarse a 100B parámetros porque eran secuenciales. Transformers sí.
    
2.  **Contexto de larga distancia**: una palabra al final del texto puede atender a una palabra al principio sin "olvidarla". Esto resolvió el problema clásico de las RNNs con frases largas.
    

### Cómo funciona self-attention (lo mínimo)

Para cada token, el modelo computa tres vectores: **Query (Q)**, **Key (K)** y **Value (V)**. El peso entre los tokens *i* y *j* es:

`softmax(Q_i · K_j / √d_k)`

En palabras: cada token "pregunta" (Q) qué otros tokens son relevantes para él, mira las "claves" (K) de los demás, y agrega sus "valores" (V) ponderados por relevancia. Esto se hace en paralelo para toda la secuencia.

**Multi-head attention**: distintas "cabezas" aprenden distintas relaciones (sintácticas, semánticas, posicionales). Es por eso que un mismo modelo entiende a la vez "el sujeto del verbo" y "el referente del pronombre".

> 💡 **La intuición que te llevas**: cuando le das contexto a tu copilot (archivos, instrucciones, ejemplos), el modelo está literalmente "prestando atención" a partes de ese contexto al generar cada token. Por eso **el contexto importa tanto en tus prompts**.

📺 Visualización interactiva imprescindible:

[https://poloclub.github.io/transformer-explainer/](https://poloclub.github.io/transformer-explainer/) (Polo Club / Georgia Tech, ejecuta GPT-2 en tu navegador y te deja ver el flujo interno).

📺 *3Blue1Brown — Visualizing Attention, a Transformer's Heart* (la explicación visual más intuitiva que existe, en inglés con subtítulos):

Video Player is loading.

Loaded: 0.00%

Remaining Time 26:10

1x

-   2x
-   1.5x
-   1.25x
-   1x, selected
-   0.75x
-   0.5x
-   0.25x

📺 *dotCSV — ¿Qué son los TRANSFORMERS? Arquitectura de ChatGPT explicada* (en español):

Video Player is loading.

Loaded: 0.00%

Remaining Time 13:05

1x

-   2x
-   1.5x
-   1.25x
-   1x, selected
-   0.75x
-   0.5x
-   0.25x

## Familias de modelos

Aunque "LLM" suena monolítico, hay tres familias principales:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/f0284032-d668-493a-8dd7-4e6884c0271a/1af6048e8f3f4a38.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Los LLMs comerciales que usas hoy son todos decoder-only**. Cuando hablamos de "LLM" en el máster nos referimos casi siempre a esta familia.

## Modelos LLMs principales (snapshot abril 2026)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/172bae15-e02b-4a77-9d74-3a4316251925/d30ea2487cf530d7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **No te aprendas las cifras**. La tabla es para que tengas un mapa al ver nombres en la documentación de las herramientas. Lo que importa: **los tres líderes (GPT, Claude, Gemini) convergieron en ~1M tokens de contexto en 2026** — un cambio cualitativo para developers.

## Conceptos operativos imprescindibles

Esta es la sección que más rinde tener clara antes de S1.

### 1\. Tokens

**Qué es**: la unidad mínima que el modelo procesa. No son letras ni palabras, son **sub-palabras** (BPE / SentencePiece).

**Reglas de pulgar**:

-   ~4 caracteres en inglés ≈ 1 token.
    
-   Un párrafo medio ≈ 100 tokens.
    
-   Un README típico ≈ 2.000–4.000 tokens.
    
-   Este pre-curso completo ≈ 12.000–15.000 tokens.
    

**Por qué importa**:

-   **Cuestan dinero**. Las APIs cobran por tokens (input + output).
    
-   **Definen el límite de contexto**. La "ventana de contexto" se mide en tokens.
    
-   **Diferentes modelos tokenizan distinto**. Opus 4.7 introdujo un nuevo tokenizer que puede usar **hasta 35% más tokens** sobre el mismo texto a cambio de mejor rendimiento.
    

🛠 Herramienta para experimentar: [OpenAI Tokenizer](https://platform.openai.com/tokenizer) — pega texto y mira cómo se segmenta.

### 2\. Ventana de contexto

**Qué es**: la cantidad máxima de tokens (input + output) que el modelo puede considerar a la vez. Todo lo que está dentro de esa ventana es lo que el modelo "ve".

**Estado actual (abril 2026)** — **convergencia hacia ~1M tokens**:

-   Claude Sonnet/Opus 4.6 y 4.7: 1M tokens estándar.
    
-   GPT-5.5 API: 1.050.000 tokens (400K en Codex, 196K en ChatGPT Thinking).
    
-   Gemini 3 Pro: ~1M+ tokens.
    
-   Claude Haiku 4.5: 200K tokens.
    

**Lo que cambió en los últimos 6 meses**: 1M tokens te permite **cargar repositorios medios completos** en un solo prompt. Esto cambia la decisión de arquitectura "RAG vs. cargar todo el repo".

**Cuidado con el "lost in the middle"**: aunque el modelo tenga 1M de contexto, su capacidad de retrieval se degrada en mensajes muy largos. Sonnet 4.6 mejoró substancialmente: **76% en 8-needle a 1M tokens** vs. 18,5% de Sonnet 4.5.

### 3\. Temperature, top-p, top-k

Parámetros que controlan la **aleatoriedad** del output:

-   **Temperature** (0 a 2): cuanto más alto, más creativo (y errático). Con `temperature=0`, el modelo es casi determinista.
    
-   **Top-p** (nucleus sampling): trunca a la masa de probabilidad acumulada. Top-p=0.95 considera solo los tokens que suman 95% de probabilidad.
    
-   **Top-k**: considera solo los k tokens más probables.
    

**Para brainstorming, escritura creativa, naming**: temperature 0.7–1.0.

> 💡 **Tip**: cuando un agente te genera código distinto cada vez con el mismo prompt, la causa suele ser temperature > 0. En el máster trabajamos con temperatures bajas para que las demos sean reproducibles.

### 4\. Embeddings

**Qué son**: vectores densos (típicamente 1024–4096 dimensiones) que **codifican significado**. Dos textos con significado similar tienen embeddings cercanos en el espacio vectorial.

**Para qué se usan**:

-   **Búsqueda semántica**: "encuentra documentos que hablen de este tema, aunque no usen las mismas palabras".
    
-   **RAG** (Retrieval-Augmented Generation): la base técnica para que un LLM responda sobre tus documentos privados.
    
-   **MCP**: muchos servidores MCP usan embeddings para retrieval (ej. servidor de docs internos).
    

**Modelos líderes 2026**:

-   OpenAI `text-embedding-3-large`
    
-   Voyage 3
    
-   Cohere Embed v3
    
-   BGE (open source)
    

> 💡 **Por qué importa para ti**: cuando configures MCP a tu base de conocimiento interno, vas a estar usando embeddings sin saberlo. Saber qué son te ayuda a debuggear cuando el retrieval devuelve resultados raros.

### 5\. Por qué los LLMs alucinan

Esta es **la** confusión más común entre devs no familiarizados.

**Cómo funciona la generación**: un LLM genera token a token, eligiendo en cada paso el más probable según el contexto. **No valida contra realidad**. No "sabe" que un endpoint existe — sabe que, dado el patrón "API endpoint para usuarios", la continuación más plausible es `/api/users`.

Cuando el contexto es ambiguo o el dato no está en el training, el modelo **continúa con la continuación más plausible**. Eso es lo que llamamos "alucinar". No es un bug — es exactamente cómo funciona la arquitectura.

Andrej Karpathy lo describe como:

-   **"Jagged intelligence"**: brillante en algunas áreas, sorprendentemente malo en otras.
    
-   **"Anterograde amnesia"**: no consolida conocimiento entre sesiones; solo tiene memoria de corto plazo en la ventana de contexto.
    

**Mejoras recientes**:

-   GPT-5 redujo errores ~45% vs. GPT-4o.
    
-   Sonnet 4.6 mejoró substancialmente en long-context retrieval.
    
-   Reasoning models ("thinking" en Claude, "o1/o3" en OpenAI) reducen alucinaciones en tareas con razonamiento estructurado.
    

**Qué hacer al respecto**:

-   Dale contexto explícito (archivos, docs, esquemas).
    
-   Pídele que cite la fuente cuando aplique.
    
-   **Verifica salidas críticas** (paquetes, endpoints, APIs externas — son los puntos donde más alucina).
    

### 6\. Modelo base vs. instruction-tuned vs. RLHF vs. RLVR

Una progresión de cómo se entrena un LLM moderno:

1.  **Base**: pre-entrenamiento sobre corpus crudo (internet entero). Solo predice el próximo token. **No sigue instrucciones**, no es útil como chatbot.
    
2.  **Instruction-tuned**: fine-tuning supervisado sobre pares (instrucción, respuesta). Aprende a seguir instrucciones.
    
3.  **RLHF** (Reinforcement Learning from Human Feedback): humanos rankean respuestas, el modelo aprende a generar las preferidas. Lo que hizo a ChatGPT "amable y útil".
    
4.  **RLVR** (Reinforcement Learning from Verifiable Rewards): emergió en 2025. Se entrena con tareas de math/code/lógica con recompensa verificable (¿el código pasa los tests?). Esto dio nacimiento a los **reasoning models** (DeepSeek R1, OpenAI o1/o3, Claude "thinking", Sonnet 4.6 adaptive thinking).
    

> 💡 **Por qué importa**: cuando ves "Opus thinking" o "GPT-5 thinking" en una herramienta, estás activando un modelo entrenado con RLVR que **piensa antes de responder**. Cuesta más latencia pero reduce errores en tareas complejas. Los modelos sin "thinking" son más rápidos y baratos para tareas simples.

### 7\. Fine-tuning vs. RAG (la decisión más común que enfrentarás)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/ebf3aa53-0d4c-48d2-9d65-1722ba83ae6d/8551a020b44b0b1f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Regla práctica**:

-   ¿Tus datos cambian frecuentemente? → **RAG**.
    
-   ¿Necesitas un estilo o formato muy específico que el modelo base no acierta? → **fine-tuning**.
    
-   En la práctica, el 90% de los casos de un dev senior se resuelven con **RAG (vía MCP)**, no con fine-tuning.
    

> 💡 **MCP es el patrón estándar de RAG en 2026**. Cuando configures un servidor MCP a tu base de conocimiento, estás haciendo RAG sin escribir código de retrieval.

## Lo nuevo en LLMs en los últimos 6 meses (qué un dev debe saber)

1.  **1M de contexto sin sobreprecio** en Claude Opus/Sonnet 4.6, Gemini 3 y GPT-5.5 — replantea la decisión "RAG vs. cargar el repo entero".
    
2.  **Reasoning como toggle** (Sonnet 4.6 "adaptive thinking", GPT-5 "thinking budget") — empezar a pensar el coste/latencia vs. profundidad de razonamiento explícitamente.
    
3.  **Memoria persistente en cliente** (Cursor memories, Claude memory, ChatGPT memory) — cambia el patrón de prompting día a día.
    
4.  **Reducción significativa de alucinaciones** en SOTA: GPT-5 ~45% menos errores que GPT-4o, Sonnet 4.6 long-context retrieval 76% (vs. 18,5%).
    
5.  **Tokenizers nuevos** (Opus 4.7) que usan más tokens pero rinden mejor — el costo en USD por tarea no siempre baja con cada nueva versión.
    

## Lo accionable de esta lección

1.  **Tokens, ventana de contexto, temperatura, embeddings** — son los 4 conceptos que vas a usar todos los días. Dómalos antes de S1.
    
2.  **Los LLMs no "saben", predicen probabilísticamente.** Cuando alucinan, no es un bug — es la arquitectura. Tu trabajo como senior es darles el contexto que necesitan y verificar lo crítico.
    
3.  **RAG > fine-tuning** para casi todos tus casos como dev. Y en 2026, **RAG = MCP**.
    
4.  **El "thinking" no es gratis.** Úsalo cuando la tarea lo requiera (debugging complejo, planning de varios pasos), no para tareas triviales.
    
5.  **No memorices versiones de modelos.** Cambian cada 2-3 meses. Memoriza los **conceptos** — esos llevan estables desde 2017.
    

## Recursos para profundizar

### Lo imprescindible (en este orden)

-   📺 [Transformer Explainer (Polo Club / Georgia Tech)](https://poloclub.github.io/transformer-explainer/) — herramienta interactiva, ejecuta GPT-2 en tu navegador.
    
-   📺 [3Blue1Brown — Visualizing Attention, a Transformer's Heart](https://www.youtube.com/watch?v=eMlx5fFNoYc) — la explicación visual más intuitiva.
    
-   📖 [Jay Alammar — The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — el clásico canónico.
    

### En español

-   📺 [dotCSV — serie de reasoning models y LLMs 2024–2025](https://www.youtube.com/@DotCSV) — busca en el canal.
    
-   📺 [SobernIA — Descifrando los Secretos de los Transformers](https://www.youtube.com/watch?v=as2FFM3c6mI).
    

### Si quieres ir muy a fondo

-   📺 [Andrej Karpathy — Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) — el mejor curso técnico para devs. Construyes GPT desde cero.
    
-   📺 [Andrej Karpathy — Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY) — 2h, intensivo.
    
-   📖 [Karpathy — 2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/) — qué cambió en 2025, escrito por Karpathy.
    

### Para conceptos operativos

-   📖 [Anthropic — Pricing & Context Windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — guía oficial sobre tokens y contexto.
    
-   📖 [OpenAI Tokenizer](https://platform.openai.com/tokenizer) — herramienta para experimentar con tokenización.
    

> 👉 **Para reflexionar antes de S1**: ¿qué temperature usas (o usa por defecto) tu copilot principal hoy? Si nunca lo configuraste, busca en settings y experimenta — es uno de los ajustes que más cambia la experiencia.
