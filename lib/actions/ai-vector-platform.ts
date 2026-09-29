"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  vectorSearchSchema,
  type VectorSearchInput,
  indexDocumentSchema,
  type IndexDocumentInput,
} from "@/lib/validations/ai-vector-platform";
import { executeSemanticVectorSearch } from "@/lib/ai-vector-platform/search";
import { SemanticSearchEngine } from "@/lib/search/semantic-search-engine";

const SOURCE_TYPE_MAP = {
  DOCUMENT: "DOCUMENT",
  CONTRACT: "CONTRACT",
  PORTFOLIO: "DOCUMENT",
  KNOWLEDGE_BASE: "AI_KNOWLEDGE_BASE",
  BLOG: "ARTICLE",
  VENDOR_PROFILE: "VENDOR",
} as const;

function keywordsFromText(value: string) {
  return Array.from(
    new Set(
      value
        .toLocaleLowerCase("tr-TR")
        .replace(/[^a-z0-9çğıöşü\s-]/gi, " ")
        .split(/\s+/)
        .map((token) => token.trim())
        .filter((token) => token.length >= 3),
    ),
  ).slice(0, 32);
}

function metadataJson(
  metadata: Record<string, unknown> | undefined,
): Prisma.InputJsonValue {
  return (metadata || {}) as Prisma.InputJsonValue;
}

export async function searchVectorSimilarityAction(data: VectorSearchInput) {
  const validation = vectorSearchSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const result = await executeSemanticVectorSearch(validation.data);
    revalidatePath("/admin/ai-vector");
    return {
      success: true,
      data: result,
      message:
        "Gerçek indeks üzerinde " +
        result.matchedChunks.length +
        " anlamsal eşleşme bulundu.",
    };
  } catch (error: unknown) {
    console.error("Vector Search Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Anlamsal vektör araması yürütülemedi.",
    };
  }
}

export async function indexDocumentChunkAction(data: IndexDocumentInput) {
  const validation = indexDocumentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const input = validation.data;
    const entityType = SOURCE_TYPE_MAP[input.sourceType];
    const vectorEmbedding =
      await SemanticSearchEngine.generateEmbedding(input.rawContent);

    const rawTitle = input.metadata?.title;
    const title =
      typeof rawTitle === "string" && rawTitle.trim()
        ? rawTitle.trim()
        : input.sourceId;

    const rawPublic = input.metadata?.isPublic;
    const isPublic =
      typeof rawPublic === "boolean"
        ? rawPublic
        : input.sourceType === "VENDOR_PROFILE" || input.sourceType === "BLOG";

    await prisma.searchIndexRegistry.upsert({
      where: {
        entityType_entityId: {
          entityType,
          entityId: input.sourceId,
        },
      },
      create: {
        entityType,
        entityId: input.sourceId,
        documentTitle: title,
        documentContent: input.rawContent,
        keywords: keywordsFromText(input.rawContent),
        vectorEmbedding,
        syncStatus: "INDEXED",
        isPublic,
        metadata: metadataJson(input.metadata),
      },
      update: {
        documentTitle: title,
        documentContent: input.rawContent,
        keywords: keywordsFromText(input.rawContent),
        vectorEmbedding,
        syncStatus: "INDEXED",
        isPublic,
        metadata: metadataJson(input.metadata),
        indexedAt: new Date(),
      },
    });

    revalidatePath("/admin/ai-vector");

    return {
      success: true,
      dimensions: vectorEmbedding.length,
      message: "Doküman gerçek embedding ile indekslendi.",
    };
  } catch (error: unknown) {
    console.error("Index Document Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Doküman vektörleştirilemedi.",
    };
  }
}

export async function generateAIVectorAnalyticsAction() {
  try {
    const [
      totalIndexedVectors,
      failedCount,
      pendingCount,
      staleCount,
      bySource,
      latencyAggregate,
      sample,
    ] = await Promise.all([
      prisma.searchIndexRegistry.count({ where: { syncStatus: "INDEXED" } }),
      prisma.searchIndexRegistry.count({ where: { syncStatus: "FAILED" } }),
      prisma.searchIndexRegistry.count({ where: { syncStatus: "PENDING" } }),
      prisma.searchIndexRegistry.count({ where: { syncStatus: "STALE" } }),
      prisma.searchIndexRegistry.groupBy({
        by: ["entityType"],
        _count: { _all: true },
      }),
      prisma.searchAnalyticsLog.aggregate({
        _avg: { executionMs: true },
      }),
      prisma.searchIndexRegistry.findFirst({
        where: { syncStatus: "INDEXED" },
        select: { vectorEmbedding: true },
      }),
    ]);

    const totalTracked =
      totalIndexedVectors + failedCount + pendingCount + staleCount;
    const healthScore =
      totalTracked > 0
        ? Math.round((totalIndexedVectors / totalTracked) * 100)
        : 0;

    return {
      success: true,
      vectorHealthScore: healthScore,
      totalIndexedVectors,
      failedCount,
      pendingCount,
      staleCount,
      avgSearchLatencyMs: Math.round(
        Number(latencyAggregate._avg.executionMs || 0),
      ),
      embeddingModel: "gemini-embedding-001",
      vectorDimensions: sample?.vectorEmbedding.length || 0,
      apiConfigured: Boolean(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim(),
      ),
      collections: bySource.map((row) => ({
        sourceType: row.entityType,
        count: row._count._all,
      })),
    };
  } catch (error: unknown) {
    console.error("AI Vector Analytics Error:", error);
    return { success: false, error: "Vektör analitiği üretilemedi." };
  }
}
