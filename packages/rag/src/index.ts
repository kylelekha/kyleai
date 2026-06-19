export const retrievalPipeline = [
  {
    id: "chunk",
    label: "Chunk",
    description: "Split notes and imported files into stable, citable source chunks."
  },
  {
    id: "index",
    label: "Index",
    description: "Store keyword text in SQLite FTS5 and embeddings in a vector store adapter."
  },
  {
    id: "retrieve",
    label: "Retrieve",
    description: "Blend semantic, keyword, recency, scope, and pin scores."
  },
  {
    id: "answer",
    label: "Answer",
    description: "Send only selected chunks to the model with stable source IDs."
  },
  {
    id: "validate-citations",
    label: "Validate citations",
    description: "Reject or flag answers that cite missing or out-of-scope chunks."
  }
] as const;

export type RetrievalScore = {
  chunkId: string;
  semanticScore: number;
  keywordScore: number;
  recencyScore: number;
  sourceScopeBoost: number;
  manualPinBoost: number;
};

export function combineRetrievalScore(score: RetrievalScore): number {
  return (
    score.semanticScore * 0.45 +
    score.keywordScore * 0.3 +
    score.recencyScore * 0.1 +
    score.sourceScopeBoost * 0.1 +
    score.manualPinBoost * 0.05
  );
}

export * from "./chat";
