import { ExecuteSemanticSearchInput } from "@/lib/validations/ai-search-engine";

export interface SearchIntentResult {
  detectedIntent: "VENUE_SEARCH" | "VENDOR_DIRECTORY" | "PRICE_INQUIRY" | "CONCEPT_INSPIRATION";
  confidenceScorePct: number;
  extractedEntities: {
    location?: string;
    capacity?: number;
    style?: string;
    budgetCategory?: string;
  };
  expandedKeywords: string[];
  rankingScore: number;
  searchResults: Array<{
    id: string;
    title: string;
    category: string;
    location: string;
    relevanceScorePct: number;
    matchType: "VECTOR_SEMANTIC" | "HYBRID_BM25";
  }>;
}

export function parseSearchIntent(input: ExecuteSemanticSearchInput): SearchIntentResult {
  const q = input.query.toLowerCase();
  let intent: SearchIntentResult["detectedIntent"] = "VENUE_SEARCH";
  let style = "Modern & Şık";

  if (q.includes("fotoğraf") || q.includes("çekim") || q.includes("müzik")) {
    intent = "VENDOR_DIRECTORY";
  } else if (q.includes("fiyat") || q.includes("bütçe") || q.includes("paket")) {
    intent = "PRICE_INQUIRY";
  } else if (q.includes("kır") || q.includes("rustik") || q.includes("boho")) {
    intent = "CONCEPT_INSPIRATION";
    style = "Kır & Rustik";
  }

  return {
    detectedIntent: intent,
    confidenceScorePct: 96,
    extractedEntities: {
      location: input.userLocation || "Bodrum / Muğla",
      capacity: input.guestCount || 200,
      style,
      budgetCategory: "PREMIUM",
    },
    expandedKeywords: [input.query, "Butik Düğün Mekanları", "Lüks Kır Bahçesi", "Deniz Manzaralı Davet"],
    rankingScore: 0.94,
    searchResults: [
      { id: "res_1", title: "Bodrum Riviera Luxury Beach Resort & Venue", category: "Mekan", location: "Bodrum", relevanceScorePct: 98, matchType: "VECTOR_SEMANTIC" },
      { id: "res_2", title: "Ege Rustik Kır Bahçesi & Orman Konsepti", category: "Mekan", location: "Milas", relevanceScorePct: 92, matchType: "HYBRID_BM25" },
      { id: "res_3", title: "Sunset Fine Dining & Event Hall", category: "Catering & Mekan", location: "Yalıkavak", relevanceScorePct: 88, matchType: "VECTOR_SEMANTIC" },
    ],
  };
}
