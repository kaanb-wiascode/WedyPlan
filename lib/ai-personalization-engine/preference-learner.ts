import { GenerateRecommendationsInput } from "@/lib/validations/ai-personalization-engine";

export interface PersonalizationResult {
  userId: string;
  personalizationScorePct: number;
  lifecycleStage: string;
  predictedAffinities: {
    primaryStyle: string;
    budgetTier: string;
    topCategoryInterest: string;
  };
  recommendedItems: Array<{
    id: string;
    title: string;
    category: string;
    predictedCtrPct: number;
    matchReason: string;
  }>;
}

export function learnAndRankRecommendations(input: GenerateRecommendationsInput): PersonalizationResult {
  const style = input.preferredStyle || "Boho Chic & Kır Konsepti";
  const budget = input.budgetScopeMax ? `${input.budgetScopeMax.toLocaleString()} ₺ Bütçe Aralığı` : "Lüks Segment";

  return {
    userId: input.userId,
    personalizationScorePct: 94,
    lifecycleStage: input.lifecycleStage,
    predictedAffinities: {
      primaryStyle: style,
      budgetTier: budget,
      topCategoryInterest: "Mekan & Fotoğraf Production",
    },
    recommendedItems: [
      { id: "rec_101", title: "Bodrum Riviera Kır Bahçesi & Sunset Lounge", category: "Mekan", predictedCtrPct: 92, matchReason: "Sık aranan Bodrum lokasyonu ve Kır konsepti uyumu" },
      { id: "rec_102", title: "Ege Belgesel Dış Çekim & Drone Production", category: "Fotoğraf", predictedCtrPct: 88, matchReason: "Düğüne 4 ay kala kritik fotoğrafçı seçimi aşaması" },
      { id: "rec_103", title: "Acoustic Jazz & Pop Live Band Ensemble", category: "Müzik", predictedCtrPct: 84, matchReason: "İncelediğiniz Butik Düğün konseptine özel müzik grubu" },
    ],
  };
}
