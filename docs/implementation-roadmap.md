# Implementation roadmap

## Phase 1: Local notebook

- App shell and layout
- Markdown notes
- Folder/tag model
- SQLite schema and migrations
- FTS5 keyword search

## Phase 2: Cited chat

- Chunking pipeline
- Embedding provider adapter
- Retrieval scoring
- Local model provider adapter, defaulting to oMLX with OpenAI-compatible endpoint support
- Citation validation and source tray

## Phase 3: Safe agent edits

- Proposed patch schema
- Diff preview
- Approval/reject flow
- Note checkpoints and undo

## Phase 4: Research mode

- Research plan
- Source selection
- Web fetch/import guardrails
- Progress timeline
- Final cited note and follow-up checklist

## Phase 5: Attachments and memory links

- PDF import and chunking
- Related-note panel
- Backlinks
- Optional graph view

## Provider milestone

- Make oMLX the default local provider.
- Keep provider calls OpenAI-compatible so OpenRouter, LM Studio, and similar endpoints can be configured.
- Add provider health checks through `/v1/models`.
- Store API keys outside source control.
