"use client";

import React, { useState } from "react";
import AIVectorHeader from "./AIVectorHeader";
import AIVectorAnalyticsWidget from "./AIVectorAnalyticsWidget";
import VectorCollectionsBento from "./VectorCollectionsBento";
import VectorSearchExplorerTable from "./VectorSearchExplorerTable";

export default function AdminAIVectorClient() {
  const [aiReport] = useState({
    vectorHealthScore: 99,
    totalIndexedVectors: 842000,
    avgSearchLatencyMs: "8ms (Ultra-Fast)",
    embeddingModel: "text-embedding-3-small (1536d)",
    aiAnalysis: "Tüm platform içerikleri (34.000 İlan metni, 12.000 Sözleşme, 420.000 Görsel açıklaması) HNSW indeksi ile %99.9 doğrulukta anlamsal aramaya hazırdır.",
    recommendation: "Görsel arama indekslerinde 'clip-vit-base-patch32' modelinden multi-modal vision embedding modeline geçilmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIVectorHeader
        healthScore={aiReport.vectorHealthScore}
        totalIndexedVectors={aiReport.totalIndexedVectors}
        avgSearchLatency={aiReport.avgSearchLatencyMs}
        embeddingModel={aiReport.embeddingModel}
        onOpenExplorerModal={() => alert("🔍 Semantic Vector Search Explorer Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIVectorAnalyticsWidget aiReport={aiReport} />
          <VectorCollectionsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <VectorSearchExplorerTable />
        </div>
      </div>
    </div>
  );
}
