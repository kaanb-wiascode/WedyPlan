export interface KnowledgeRankingPayload {
  assetKey: string;
  qualityScore: number;
  isDuplicateDetected: boolean;
  suggestedTags: string[];
  suggestedCategory: string;
}

export async function evaluateKnowledgeQuality(title: string, content: string): Promise<KnowledgeRankingPayload> {
  console.log("Evaluating Knowledge Quality for Title:", title);

  return {
    assetKey: "eval_" + Date.now(),
    qualityScore: 96,
    isDuplicateDetected: false,
    suggestedTags: ["Düğün Planlama", "Bütçe Rehberi", "Bodrum"],
    suggestedCategory: "WEDDING_GUIDES",
  };
}
