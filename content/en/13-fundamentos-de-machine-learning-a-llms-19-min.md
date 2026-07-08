# 🎥 Fundamentals: from Machine Learning to LLMs 🟢 — 19 min | AI4Devs 2026/06 Seniors

⏳ Estimated time: 19 min

> The goal of this section is **NOT** for you to master the mathematical details of neural networks. It is for you to understand **the bare minimum needed to not misuse your copilot**. If you finish this lesson knowing what a token is, what the context window is, why LLMs hallucinate, and when to use RAG vs. fine-tuning, you've done your pre-course job.

## Why a senior dev needs this

As a senior, you're not going to train models. You're going to **prompt them, integrate them, supervise them, and debug their outputs**. To do that well you need a correct mental model of what's underneath. Without it, you'll get frustrated for reasons that seem random but aren't:

-   "Why did the agent forget the file I gave it 5 messages ago?" → context window.
    
-   "Why did it invent an endpoint that doesn't exist?" → a mechanism of probability, not of truth.
    
-   "Why does the answer change every time even though the prompt is the same?" → temperature.
    
-   "Why doesn't it know what happened at my company last week?" → base model vs. RAG.
    

Those four misunderstandings cover 80% of the frustrations attributed to "AI is bad". In reality, they are misunderstandings about how it works.

## Brief historical context (don't linger here)

Classic **Machine Learning** is divided into 4 categories that have existed for decades:

-   **Supervised**: learns from labeled data (spam/not spam, cat/dog photo). Algorithms: regression, KNN, SVM, trees.
    
-   **Unsupervised**: finds patterns without labels (clustering, recommendations). Algorithms: K-means, PCA.
    
-   **Reinforcement**: learns by trial and error with rewards (AlphaGo, robots). Algorithms: Q-learning, policy gradient.
    
-   **Deep neural networks**: layers of neurons that extract features automatically. Variants: CNN (images), RNN/LSTM (sequences), **Transformer** (text and everything else).
    

All of this is still alive and used in production. But **the dominant paradigm today in developer tools is LLMs based on the Transformer + post-training with reinforcement**. That's what you'll use every day in the master's program, so let's go straight there.

## The Transformer revolution (2017)

📄 Original paper: *Attention Is All You Need* (Vaswani et al., NeurIPS 2017).

**What changed**: previous networks (RNN, LSTM) processed text **sequentially** — word by word, waiting for the previous one. The Transformer replaced recurrence with **self-attention**: each token can attend to all the others **in parallel**.

Why does this matter? Two reasons:

1.  **Massive parallelization on GPUs**: that's why scale exploded. RNNs couldn't be trained at 100B parameters because they were sequential. Transformers can.
    
2.  **Long-distance context**: a word at the end of the text can attend to a word at the beginning without "forgetting it". This solved the classic RNN problem with long sentences.
    

### How self-attention works (the bare minimum)

For each token, the model computes three vectors: **Query (Q)**, **Key (K)**, and **Value (V)**. The weight between tokens *i* and *j* is:

`softmax(Q_i · K_j / √d_k)`

In words: each token "asks" (Q) which other tokens are relevant to it, looks at the "keys" (K) of the others, and aggregates their "values" (V) weighted by relevance. This is done in parallel for the entire sequence.

**Multi-head attention**: different "heads" learn different relationships (syntactic, semantic, positional). That's why the same model understands both "the subject of the verb" and "the referent of the pronoun" at once.

> 💡 **The intuition you take away**: when you give context to your copilot (files, instructions, examples), the model is literally "paying attention" to parts of that context when generating each token. That's why **context matters so much in your prompts**.

📺 Essential interactive visualization:

[https://poloclub.github.io/transformer-explainer/](https://poloclub.github.io/transformer-explainer/) (Polo Club / Georgia Tech, runs GPT-2 in your browser and lets you see the internal flow).

📺 *3Blue1Brown — Visualizing Attention, a Transformer's Heart* (the most intuitive visual explanation there is, in English with subtitles):

Video Player is loading.

Loaded: 0.00%

Remaining Time 26:10

1x

-   2x
-   1.5x
-   1.25x
-   1x, selected
-   0.75x
-   0.5x
-   0.25x

📺 *dotCSV — ¿Qué son los TRANSFORMERS? Arquitectura de ChatGPT explicada* (in Spanish):

Video Player is loading.

Loaded: 0.00%

Remaining Time 13:05

1x

-   2x
-   1.5x
-   1.25x
-   1x, selected
-   0.75x
-   0.5x
-   0.25x

## Model families

Although "LLM" sounds monolithic, there are three main families:

![image.png](https://media1-production-mightynetworks.imgix.net/asset/f0284032-d668-493a-8dd7-4e6884c0271a/1af6048e8f3f4a38.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**The commercial LLMs you use today are all decoder-only**. When we talk about "LLMs" in the master's program we're almost always referring to this family.

## Main LLM models (April 2026 snapshot)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/172bae15-e02b-4a77-9d74-3a4316251925/d30ea2487cf530d7.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

> 💡 **Don't memorize the figures**. The table is so you have a map when you see names in tool documentation. What matters: **the three leaders (GPT, Claude, Gemini) converged at ~1M tokens of context in 2026** — a qualitative change for developers.

## Essential operational concepts

This is the section that pays off most to have clear before S1.

### 1\. Tokens

**What it is**: the minimal unit the model processes. They are not letters or words, they are **sub-words** (BPE / SentencePiece).

**Rules of thumb**:

-   ~4 characters in English ≈ 1 token.
    
-   An average paragraph ≈ 100 tokens.
    
-   A typical README ≈ 2,000–4,000 tokens.
    
-   This entire pre-course ≈ 12,000–15,000 tokens.
    

**Why it matters**:

-   **They cost money**. APIs charge per token (input + output).
    
-   **They define the context limit**. The "context window" is measured in tokens.
    
-   **Different models tokenize differently**. Opus 4.7 introduced a new tokenizer that can use **up to 35% more tokens** on the same text in exchange for better performance.
    

🛠 Tool to experiment with: [OpenAI Tokenizer](https://platform.openai.com/tokenizer) — paste text and see how it gets segmented.

### 2\. Context window

**What it is**: the maximum number of tokens (input + output) the model can consider at once. Everything inside that window is what the model "sees".

**Current state (April 2026)** — **convergence toward ~1M tokens**:

-   Claude Sonnet/Opus 4.6 and 4.7: 1M tokens standard.
    
-   GPT-5.5 API: 1,050,000 tokens (400K in Codex, 196K in ChatGPT Thinking).
    
-   Gemini 3 Pro: ~1M+ tokens.
    
-   Claude Haiku 4.5: 200K tokens.
    

**What changed in the last 6 months**: 1M tokens lets you **load complete medium-sized repositories** in a single prompt. This changes the architecture decision of "RAG vs. load the whole repo".

**Watch out for "lost in the middle"**: even if the model has 1M of context, its retrieval capacity degrades in very long messages. Sonnet 4.6 improved substantially: **76% on 8-needle at 1M tokens** vs. 18.5% for Sonnet 4.5.

### 3\. Temperature, top-p, top-k

Parameters that control the **randomness** of the output:

-   **Temperature** (0 to 2): the higher, the more creative (and erratic). With `temperature=0`, the model is nearly deterministic.
    
-   **Top-p** (nucleus sampling): truncates to the cumulative probability mass. Top-p=0.95 considers only the tokens that add up to 95% probability.
    
-   **Top-k**: considers only the k most probable tokens.
    

**For brainstorming, creative writing, naming**: temperature 0.7–1.0.

> 💡 **Tip**: when an agent generates different code each time with the same prompt, the cause is usually temperature > 0. In the master's program we work with low temperatures so the demos are reproducible.

### 4\. Embeddings

**What they are**: dense vectors (typically 1024–4096 dimensions) that **encode meaning**. Two texts with similar meaning have embeddings close to each other in vector space.

**What they're used for**:

-   **Semantic search**: "find documents about this topic, even if they don't use the same words".
    
-   **RAG** (Retrieval-Augmented Generation): the technical foundation for an LLM to answer questions about your private documents.
    
-   **MCP**: many MCP servers use embeddings for retrieval (e.g. an internal docs server).
    

**Leading models 2026**:

-   OpenAI `text-embedding-3-large`
    
-   Voyage 3
    
-   Cohere Embed v3
    
-   BGE (open source)
    

> 💡 **Why it matters for you**: when you configure MCP against your internal knowledge base, you'll be using embeddings without knowing it. Knowing what they are helps you debug when retrieval returns weird results.

### 5\. Why LLMs hallucinate

This is **the** most common confusion among devs unfamiliar with the topic.

**How generation works**: an LLM generates token by token, choosing at each step the most probable one given the context. **It does not validate against reality**. It doesn't "know" that an endpoint exists — it knows that, given the pattern "API endpoint for users", the most plausible continuation is `/api/users`.

When the context is ambiguous or the data isn't in the training, the model **continues with the most plausible continuation**. That's what we call "hallucinating". It's not a bug — it's exactly how the architecture works.

Andrej Karpathy describes it as:

-   **"Jagged intelligence"**: brilliant in some areas, surprisingly bad in others.
    
-   **"Anterograde amnesia"**: it doesn't consolidate knowledge between sessions; it only has short-term memory in the context window.
    

**Recent improvements**:

-   GPT-5 reduced errors ~45% vs. GPT-4o.
    
-   Sonnet 4.6 improved substantially in long-context retrieval.
    
-   Reasoning models ("thinking" in Claude, "o1/o3" in OpenAI) reduce hallucinations in tasks with structured reasoning.
    

**What to do about it**:

-   Give it explicit context (files, docs, schemas).
    
-   Ask it to cite the source when applicable.
    
-   **Verify critical outputs** (packages, endpoints, external APIs — those are the points where it hallucinates most).
    

### 6\. Base model vs. instruction-tuned vs. RLHF vs. RLVR

A progression of how a modern LLM is trained:

1.  **Base**: pre-training on a raw corpus (the whole internet). It only predicts the next token. **It does not follow instructions**, it's not useful as a chatbot.
    
2.  **Instruction-tuned**: supervised fine-tuning on (instruction, response) pairs. It learns to follow instructions.
    
3.  **RLHF** (Reinforcement Learning from Human Feedback): humans rank responses, the model learns to generate the preferred ones. What made ChatGPT "kind and helpful".
    
4.  **RLVR** (Reinforcement Learning from Verifiable Rewards): emerged in 2025. Trained on math/code/logic tasks with a verifiable reward (does the code pass the tests?). This gave birth to **reasoning models** (DeepSeek R1, OpenAI o1/o3, Claude "thinking", Sonnet 4.6 adaptive thinking).
    

> 💡 **Why it matters**: when you see "Opus thinking" or "GPT-5 thinking" in a tool, you're activating a model trained with RLVR that **thinks before answering**. It costs more latency but reduces errors on complex tasks. Models without "thinking" are faster and cheaper for simple tasks.

### 7\. Fine-tuning vs. RAG (the most common decision you'll face)

![image.png](https://media1-production-mightynetworks.imgix.net/asset/ebf3aa53-0d4c-48d2-9d65-1722ba83ae6d/8551a020b44b0b1f.png?ixlib=rails-4.3.1&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit "image.png")

**Practical rule**:

-   Does your data change frequently? → **RAG**.
    
-   Do you need a very specific style or format that the base model doesn't get right? → **fine-tuning**.
    
-   In practice, 90% of a senior dev's cases are solved with **RAG (via MCP)**, not with fine-tuning.
    

> 💡 **MCP is the standard RAG pattern in 2026**. When you configure an MCP server against your knowledge base, you're doing RAG without writing retrieval code.

## What's new in LLMs in the last 6 months (what a dev should know)

1.  **1M context without a price premium** in Claude Opus/Sonnet 4.6, Gemini 3, and GPT-5.5 — rethinks the "RAG vs. load the entire repo" decision.
    
2.  **Reasoning as a toggle** (Sonnet 4.6 "adaptive thinking", GPT-5 "thinking budget") — start thinking about cost/latency vs. depth of reasoning explicitly.
    
3.  **Persistent client-side memory** (Cursor memories, Claude memory, ChatGPT memory) — changes the day-to-day prompting pattern.
    
4.  **Significant reduction in hallucinations** in SOTA: GPT-5 ~45% fewer errors than GPT-4o, Sonnet 4.6 long-context retrieval 76% (vs. 18.5%).
    
5.  **New tokenizers** (Opus 4.7) that use more tokens but perform better — the cost in USD per task doesn't always go down with each new version.
    

## The actionable takeaways from this lesson

1.  **Tokens, context window, temperature, embeddings** — these are the 4 concepts you'll use every day. Master them before S1.
    
2.  **LLMs don't "know", they predict probabilistically.** When they hallucinate, it's not a bug — it's the architecture. Your job as a senior is to give them the context they need and verify what's critical.
    
3.  **RAG > fine-tuning** for almost all your cases as a dev. And in 2026, **RAG = MCP**.
    
4.  **"Thinking" is not free.** Use it when the task requires it (complex debugging, multi-step planning), not for trivial tasks.
    
5.  **Don't memorize model versions.** They change every 2-3 months. Memorize the **concepts** — those have been stable since 2017.
    

## Resources to go deeper

### The essentials (in this order)

-   📺 [Transformer Explainer (Polo Club / Georgia Tech)](https://poloclub.github.io/transformer-explainer/) — interactive tool, runs GPT-2 in your browser.
    
-   📺 [3Blue1Brown — Visualizing Attention, a Transformer's Heart](https://www.youtube.com/watch?v=eMlx5fFNoYc) — the most intuitive visual explanation.
    
-   📖 [Jay Alammar — The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — the canonical classic.
    

### In Spanish

-   📺 [dotCSV — series on reasoning models and LLMs 2024–2025](https://www.youtube.com/@DotCSV) — search the channel.
    
-   📺 [SobernIA — Descifrando los Secretos de los Transformers](https://www.youtube.com/watch?v=as2FFM3c6mI).
    

### If you want to go really deep

-   📺 [Andrej Karpathy — Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) — the best technical course for devs. You build GPT from scratch.
    
-   📺 [Andrej Karpathy — Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY) — 2h, intensive.
    
-   📖 [Karpathy — 2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/) — what changed in 2025, written by Karpathy.
    

### For operational concepts

-   📖 [Anthropic — Pricing & Context Windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — official guide on tokens and context.
    
-   📖 [OpenAI Tokenizer](https://platform.openai.com/tokenizer) — tool to experiment with tokenization.
    

> 👉 **To reflect on before S1**: what temperature does your main copilot use (or use by default) today? If you've never configured it, look in the settings and experiment — it's one of the settings that most changes the experience.
