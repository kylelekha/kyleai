# KyleAI clean-room product blueprint

KyleAI is scaffolded as a clean-room, local-first AI research notebook inspired by public Canto behavior, not by decompiling or bypassing Canto.

## Core promise

Chat with your notes, files, and research locally, with citations and editable outputs.

## MVP scope

1. Markdown notes
2. Folders and tags
3. Local SQLite storage
4. Import PDF, text, and markdown
5. Chunk and embed imported content
6. Chat over selected scope
7. Cited answers
8. Save answer as note
9. Related notes
10. Local model through Ollama, LM Studio, or another OpenAI-compatible local endpoint

## Later, not now

- iCloud/encrypted sync
- license system
- live code notebooks
- complex graph view
- video transcription
- MCP server

## Safety rules

- The model proposes; the app disposes.
- Agent edits must be structured patches with preview, approval, checkpoint, and undo.
- Citations must map to real source chunks; never trust invented model citations.
- Web import must block private/local network targets and treat web text as untrusted content.
