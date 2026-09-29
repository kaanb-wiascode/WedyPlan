import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { prisma } from '@/lib/db';
import type {
  SearchDomain,
  SearchResultItem,
  UniversalSearchQuery,
} from '@/types/search-engine';

const SOURCE_TO_DOMAIN: Record<string, SearchDomain> = {
  VENDOR: 'VENDOR',
  COUPLE: 'WEDDING',
  USER: 'CUSTOMER',
  ORGANIZATION: 'CUSTOMER',
  CONTRACT: 'CONTRACT',
  DOCUMENT: 'DOCUMENT',
  PAYMENT: 'GLOBAL',
  MESSAGE: 'GLOBAL',
  SUPPORT_TICKET: 'GLOBAL',
  REVIEW: 'VENDOR',
  CATEGORY: 'VENDOR',
  ARTICLE: 'DOCUMENT',
  FAQ: 'DOCUMENT',
  AI_KNOWLEDGE_BASE: 'DOCUMENT',
};

function cosineSimilarity(a: number[], b: number[]) {
  if (a.length === 0 || a.length !== b.length) return null;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < a.length; index += 1) {
    const av = a[index] ?? 0;
    const bv = b[index] ?? 0;
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }

  if (normA === 0 || normB === 0) return null;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function metadataRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function metadataString(
  metadata: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = metadata[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function fallbackUrl(entityType: string, entityId: string) {
  switch (entityType) {
    case 'VENDOR':
      return `/firmalar/${entityId}`;
    case 'ARTICLE':
      return `/blog/${entityId}`;
    case 'FAQ':
      return '/sss';
    default:
      return '/arama';
  }
}

export class SemanticSearchEngine {
  static async generateEmbedding(text: string): Promise<number[]> {
    const value = text.trim();
    if (!value) return [];

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()) {
      throw new Error(
        'GOOGLE_GENERATIVE_AI_API_KEY semantic search için zorunludur.',
      );
    }

    const result = await embed({
      model: google.embedding('gemini-embedding-001'),
      value,
      maxRetries: 1,
    });

    return result.embedding;
  }

  static async searchByVector(
    queryVector: number[],
    searchQuery: UniversalSearchQuery,
  ): Promise<SearchResultItem[]> {
    if (queryVector.length === 0) return [];

    const requestedDomains = new Set(searchQuery.domains || []);
    const rows = await prisma.searchIndexRegistry.findMany({
      where: {
        syncStatus: 'INDEXED',
        isPublic: true,
      },
      orderBy: {
        popularityScore: 'desc',
      },
      take: 500,
    });

    const scored = rows
      .map((row) => {
        const domain = SOURCE_TO_DOMAIN[row.entityType] || 'GLOBAL';

        if (
          requestedDomains.size > 0 &&
          !requestedDomains.has('GLOBAL') &&
          !requestedDomains.has(domain)
        ) {
          return null;
        }

        const similarity = cosineSimilarity(
          queryVector,
          row.vectorEmbedding,
        );

        if (similarity === null) return null;

        const metadata = metadataRecord(row.metadata);

        return {
          similarity,
          item: {
            id: row.entityId,
            domain,
            title: row.documentTitle,
            subtitle: metadataString(metadata, 'subtitle'),
            description: row.documentContent,
            url:
              metadataString(metadata, 'url') ||
              fallbackUrl(row.entityType, row.entityId),
            imageUrl: metadataString(metadata, 'imageUrl'),
            score: Math.round(Math.max(0, Math.min(1, similarity)) * 100),
            metadata: {
              ...metadata,
              searchIndexId: row.id,
              similarity,
            },
          } satisfies SearchResultItem,
        };
      })
      .filter(
        (
          value,
        ): value is { similarity: number; item: SearchResultItem } =>
          Boolean(value && value.similarity > 0),
      )
      .sort(
        (left, right) =>
          right.similarity - left.similarity ||
          right.item.score - left.item.score,
      );

    const page = Math.max(1, searchQuery.page || 1);
    const limit = Math.min(100, Math.max(1, searchQuery.limit || 20));
    const start = (page - 1) * limit;

    return scored.slice(start, start + limit).map((entry) => entry.item);
  }

  static normalizeVoiceTranscript(rawTranscript: string): string {
    return rawTranscript
      .trim()
      .toLocaleLowerCase('tr-TR')
      .replace(/[.,?]/g, '')
      .replace(/\s+/g, ' ');
  }
}
