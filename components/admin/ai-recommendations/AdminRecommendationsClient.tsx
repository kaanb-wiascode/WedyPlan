"use client";

import React, { useState } from "react";
import RecommendationsHeader from "./RecommendationsHeader";
import AIRecommendationAnalyticsWidget from "./AIRecommendationAnalyticsWidget";
import RecommendationCategoriesBento from "./RecommendationCategoriesBento";
import RecommendationExplorerTable from "./RecommendationExplorerTable";

export default function AdminRecommendationsClient() {
  const [aiReport] = useState({
    recommendationHealthScore: 99,
    clickThroughRatePct: "%34.2",
    conversionBoostPct: "+%28.4 Ciro",
    avgMatchingLatencyMs: "6ms",
    aiAnalysis: "Recommendation Engine son 30 günde 420.000 öneri kartı sunmuş, %34.2 CTR (Tıklanma Oranı) elde etmiştir. Hibrit anlamsal eşleşme (Semantic Matching) dönüşüm oranlarını %28.4 artırmıştır.",
    recommendation: "Gelinlik ve Takı önerilerinde 'Pinterest Visual Similarity' modelinin ağırlığının %10 artırılması önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <RecommendationsHeader
        healthScore={aiReport.recommendationHealthScore}
        ctrRate={aiReport.clickThroughRatePct}
        conversionBoost={aiReport.conversionBoostPct}
        avgLatency={aiReport.avgMatchingLatencyMs}
        onOpenPlaygroundModal={() => alert("🧪 Live Recommendation Playground Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIRecommendationAnalyticsWidget aiReport={aiReport} />
          <RecommendationCategoriesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <RecommendationExplorerTable />
        </div>
      </div>
    </div>
  );
}
