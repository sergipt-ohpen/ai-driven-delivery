# 🧠 How LLMs Work — Just Enough to Be Effective

> The goal of this page is **not** to make you an AI expert. It's to give you the minimum mental model to work with Claude effectively. If you finish knowing what a token is, what the context window does, why models "hallucinate," and why some models think longer than others, you're equipped.

## Why a product person needs this

You're not going to train models. You're going to **prompt them, review their outputs, and decide when to trust them**. Without a correct mental model, you'll hit frustrations that feel random but aren't:

- "Why did it forget the document I shared five messages ago?" → context window.
- "Why did it invent a competitor feature that doesn't exist?" → it predicts plausibility, not truth.
- "Why does the answer change each time I ask the same thing?" → built-in randomness (temperature).
- "Why doesn't it know what happened in my company last week?" → it only knows its training data plus what you give it.

Those four misunderstandings cover about 80% of the complaints usually filed under "AI is unreliable." They're actually just how the technology works.

## A one-paragraph history

Machine learning has existed for decades — systems that learn patterns from data (spam filters, recommendation engines, game-playing AIs). The breakthrough behind today's assistants came in 2017 with an architecture called the **Transformer**, which let models process entire texts in parallel instead of word by word. That unlocked massive scale, and massive scale is what turned pattern-matching software into assistants that can write, summarize, and reason about almost anything.

The practical intuition you should keep: when you give Claude context — documents, examples, instructions — the model is literally *paying attention* to specific parts of that context as it writes each word of its answer. **This is why the context you provide matters more than clever wording.**

## The concepts you'll use every day

### 1. Tokens

**What they are**: the smallest unit a model processes. Not letters, not quite words — chunks of words. Rules of thumb:

- ~4 characters of English ≈ 1 token.
- An average paragraph ≈ 100 tokens.
- A typical product spec ≈ 2,000–4,000 tokens.

**Why you care**: tokens are how AI usage is measured and billed, and they define the limits of what a model can "see" at once. When someone on your team says "that document is too long for the model," they're talking about tokens.

### 2. The context window

**What it is**: the maximum amount of text (input plus output) the model can consider at one time. Everything inside the window is what the model "sees." Everything outside it effectively doesn't exist.

**State of play**: the leading models (Claude, GPT, Gemini) have converged on context windows of roughly **1 million tokens** — enough to load an entire product wiki, a quarter's worth of customer interviews, or a full competitive analysis in a single conversation.

**Two caveats**:

- The model has no memory *between* conversations unless a memory feature is explicitly enabled. Each new chat starts fresh.
- Even inside a huge window, retrieval can degrade in the middle of very long inputs ("lost in the middle"). If one document is critical, say so explicitly rather than burying it in a pile.

### 3. Randomness (temperature)

Models have a dial controlling how predictable versus creative their output is. High settings are great for brainstorming names or generating divergent ideas; low settings give consistent, repeatable answers. You usually can't change this in a chat interface, but it explains why the same prompt produces different answers each time — that's a feature, not a bug. If you want variety, just ask again.

### 4. Why LLMs hallucinate

This is **the** most important concept on this page.

A model generates its answer one token at a time, choosing the most *plausible* continuation given the context. **It does not check anything against reality.** It doesn't "know" your competitor shipped a feature — it knows that, given the pattern of your question, a certain answer sounds right.

When the real answer isn't in its training data or your context, the model doesn't stop — it continues with the most plausible-sounding text. That's what we call hallucination. It's not a bug; it's exactly how the architecture works.

AI researcher Andrej Karpathy describes models as having **"jagged intelligence"** — brilliant at some things, surprisingly bad at others — and a kind of **amnesia**: no lasting memory beyond the current conversation.

**What to do about it as a PM**:

- Give explicit context (paste the actual data, spec, or research — don't assume it knows).
- Ask it to cite sources or flag uncertainty ("tell me which claims you're unsure about").
- **Verify anything you'll act on**: market sizes, competitor claims, statistics, and dates are where hallucination bites hardest.

### 5. Why models differ (training stages and "thinking")

Modern models go through stages: first they absorb huge amounts of text (this makes them knowledgeable but not helpful), then they're trained to follow instructions, then refined with human feedback to be genuinely useful. The newest stage trains models on problems with verifiable answers, producing **reasoning models** — the "thinking" modes you see in Claude and other tools.

**The practical takeaway**: "thinking" modes deliberate before answering. They're slower but noticeably better on complex, multi-step problems — prioritization trade-offs, analyzing conflicting data, planning. For quick tasks (rewriting a sentence, summarizing a short doc), standard modes are faster and just as good. Match the mode to the task.

### 6. Giving models your knowledge: retrieval beats retraining

Two ways to make a model useful with *your* information:

- **Retrieval (RAG)**: the model looks up your documents at question time. Best when information changes often — which describes almost everything in product work.
- **Fine-tuning**: retraining the model itself. Rarely worth it outside specialized cases.

For a PM, the takeaway is simple: **you don't need a custom model — you need to connect the model to your documents**. Tools like Claude's connectors and Projects do exactly this: they retrieve your Notion pages, tickets, and docs into the context window when relevant.

## What this means for how you work

1. **The model doesn't know your product.** Everything it should consider must be in the conversation — paste it, attach it, or connect it.
2. **It predicts; it doesn't know.** Treat outputs as a strong first draft from a bright new hire: fast, articulate, and in need of a fact-check.
3. **Long context is your friend.** You can now give the model the *whole* research corpus instead of a summary of a summary.
4. **Use thinking modes for hard trade-offs**, standard modes for quick edits.
5. **Don't memorize model versions** — they change every few months. The concepts on this page have been stable for years.

## 🛠️ Try it with Claude

```
I'm going to paste our latest product requirements document. Before doing anything else, tell me: (1) what key information is MISSING that you'd need to give a reliable analysis, and (2) which parts of any answer you give would be based on assumption rather than what I provided. Then wait for me to fill the gaps.
```

```
Here are notes from 6 customer interviews [paste them]. Summarize the top 5 recurring pain points. For each one, quote the exact line(s) from the notes that support it — do not include any pain point you cannot back with a direct quote.
```

```
Draft a competitive one-pager on [competitor] based only on the material I paste below — do not use anything you "remember" about them, since it may be outdated or wrong. Flag any section where my material is too thin to write confidently.
```
