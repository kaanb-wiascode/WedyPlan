import { prisma } from '@/lib/db';
import { SemanticSearchEngine } from '@/lib/search/semantic-search-engine';
import type { VectorSearchInput } from '@/lib/validations/ai-vector-platform';

export interface VectorSearchResultPayload {
  queryText: string;
  matchedChunks: Array<{
    chunkId: string;
    sourceType: string;
    sourceId: string;
    content: string;
    similarityScore: number;
    metadata: Record<string, unknown>;
  }>;
  latencyMs: number;
  totalCandidatesScanned: number;
}

const SOURCE_TYPE_MAP = {
  DOCUMENT: 'DOCUMENT',
  CONTRACT: 'CONTRACT',
  PORTFOLIO: 'DOCUMENT',
  KNOWLEDGE_BASE: 'AI_KNOWLEDGE_BASE',
  BLOG: 'ARTICLE',
  VENDOR_PROFILE: 'VENDOR',
} as const;

function cosineSimilarity(a: number[], b: number[]) {
  if (!a.length || a.length !== b.length) return null;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < a.length; index += 1) {
    const left = a[index] ?? 0;
    const right = b[index] ?? 0;
    dot += left * right;
    normA += left * left;
    normB += right * right;
  }

  if (normA === 0 || normB === 0) return null;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function metadataRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

export async function executeSemanticVectorSearch(
  input: VectorSearchInput,
): Promise<VectorSearchResultPayload> {
  const startTime = Date.now();
  const queryVector = await SemanticSearchEngine.generateEmbedding(input.queryText);
  const entityType = input.sourceType
    ? SOURCE_TYPE_MAP[input.sourceType]
    : undefined;

  const rows = await prisma.searchIndexRegistry.findMany({
    where: {
      syncStatus: 'INDEXED',
      ...(entityType ? { entityType } : {}),
    },
    orderBy: {
      popularityScore: 'desc',
    },
    take: 1000,
  });

  const matchedChunks = rows
    .map((row) => {
      const similarityScore = cosineSimilarity(
        queryVector,
        row.vectorEmbedding,
      );

      if (
        similarityScore === null ||
        similarityScore < input.minSimilarityScore
      ) {
        return null;
      }

      return {
        chunkId: row.id,
        sourceType: row.entityType,
        sourceId: row.entityId,
        content: row.documentContent,
        similarityScore,
        metadata: metadataRecord(row.metadata),
      };
    })
    .filter(
      (
        value,
      ): value is VectorSearchResultPayload['matchedChunks'][number] =>
        value !== null,
    )
    .sort((left, right) => right.similarityScore - left.similarityScore)
    .slice(0, input.topK);

  return {
    queryText: input.queryText,
    matchedChunks,
    latencyMs: Date.now() - startTime,
    totalCandidatesScanned: rows.length,
  };
}
