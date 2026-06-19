# kyleai

Clean-room scaffold for a local-first AI research notebook.

## What this is

KyleAI is intended to become a private Canto-style notebook app for notes, files, local search, cited chat, and safe AI-assisted edits.

## Current app slice

- `apps/desktop` — Vite/React app shell with notebook, provider, and RAG panels
- `packages/core` — shared domain types, provider types, provider health helpers, and initial SQLite schema sketch
- `packages/rag` — retrieval/scoring pipeline plus cited-chat request helpers
- `docs` — product blueprint, provider plan, and implementation roadmap

## Provider defaults

- Default local provider: oMLX at `http://localhost:8000/v1`
- OpenAI-compatible preset: OpenRouter at `https://openrouter.ai/api/v1`

Start oMLX locally with something like:

```bash
omlx serve --model-dir ~/.omlx/models --port 8000
```

Then verify:

```bash
curl -fsS http://localhost:8000/v1/models
```

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run check
npm run build
npm audit --omit=dev
```
