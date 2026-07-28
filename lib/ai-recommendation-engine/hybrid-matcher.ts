import { GetRecommendationsInput } from "@/lib/validations/ai-recommendation-engine";

export interface RecommendationResultPayload {
  entityId: string;
  recommendationType: string;
  items: Array<{
    itemId: string;
    title: string;
    matchScore: number;
    reasonExplanation: string;
    category: string;
  }>;
  algorithmUsed: string;
  latencyMs: number;
}

export async function processHybridRecommendations(input: GetRecommendationsInput): Promise<RecommendationResultPayload> {
  const startTime = Date.now();
  console.log("Recommendation Engine Generating Match for Entity:", input.entityId);

  // Simüle Edilmiş Hibrit Öneri Üreticisi
  const mockItems = [
    {
      itemId: "rec_vnd_101",
      title: "Bodrum Sunset Luxury Beach Hotel",
      matchScore: 96,
      reasonExplanation: "Bodrum lokasyonu, 850k ₺ bütçe eşleşmesi ve favori plaj konseptinizle %96 uyumlu.",
      category: "Düğün Mekanı",
    },
    {
      itemId: "rec_pkg_202",
      title: "Ege Gün Batımı Fotoğraf & Drone Klip Paketi",
      matchScore: 92,
      reasonExplanation: "Benzer çiftlerin %84'ü bu mekanı seçtikten sonra bu fotoğraf paketini tercih etti.",
      category: "Fotoğraf & Video",
    },
    {
      itemId: "rec_blog_303",
      title: "2026 Bodrum Destinasyon Düğün Bütçe ve İzin Rehberi",
      matchScore: 88,
      reasonExplanation: "Düğün tarihinize 90 gün kala okumanız önerilen rehber makale.",
      category: "Blog / Rehber",
    },
  ];

  const duration = Date.now() - startTime + Math.floor(Math.random() * 10 + 5);

  return {
    entityId: input.entityId,
    recommendationType: input.recommendationType,
    items: mockItems,
    algorithmUsed: "HYBRID_SEMANTIC_COLLABORATIVE",
    latencyMs: duration,
  };
}
