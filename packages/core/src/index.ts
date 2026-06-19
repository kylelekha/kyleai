export type Note = {
  id: string;
  title: string;
  markdown: string;
  folderId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type SourceChunk = {
  id: string;
  documentId: string;
  documentType: "note" | "pdf" | "text" | "markdown" | "web";
  text: string;
  headingPath: string[];
  startOffset: number;
  endOffset: number;
  metadata: Record<string, unknown>;
};

export type Citation = {
  marker: number;
  chunkId: string;
  title: string;
  location?: string;
};

export type ProposedPatch = {
  targetNoteId: string;
  summary: string;
  unifiedDiff: string;
  risk: "low" | "medium" | "high";
};

export const MVP_FEATURES = [
  "Markdown notes",
  "Folders and tags",
  "Local SQLite storage",
  "Full-text search with FTS5",
  "Chunking and embeddings",
  "Chat over selected notes/files",
  "Cited answers with source validation",
  "Save answer as note",
  "Related notes",
  "Local model provider adapter"
] as const;

export * from "./providers";
export * from "./provider-health";
