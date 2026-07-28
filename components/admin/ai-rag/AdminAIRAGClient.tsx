"use client";

import React, { useState } from "react";
import AIRAGHeader from "./AIRAGHeader";
import AIRAGAnalyticsWidget from "./AIRAGAnalyticsWidget";
import RAGPipelineStepsBento from "./RAGPipelineStepsBento";
import RAGQueryExplorerTable from "./RAGQueryExplorerTable";

export default function AdminAIRAGClient() {
  const [aiReport] = useState({
    ragFaithfulnessScore: 99,
    totalRAGQueriesToday: 42800,
    avgTotalLatencyMs: "162ms",
    hallucinationRatePct: "%0.01 (Sıfıra Yakın)",
    aiAnalysis: "RAG Engine son 24 saatte 42.800 sorguyu %99 sadakat (faithfulness) skoru ile yanıtlamıştır. Hibrit Arama (BM25 + Cosine) bağlam kalitesini %38 artırmıştır.",
    recommendation: "Destek botu RAG boru hattında re-ranking adımına 'Cohere-Rerank-v3' modelinin entegre edilmesi yanıt kalitesini %5 daha artıracaktır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIRAGHeader
        faithfulnessScore={aiReport.ragFaithfulnessScore}
        totalQueriesToday={aiReport.totalRAGQueriesToday}
        avgLatency={aiReport.avgTotalLatencyMs}
        hallucinationRate={aiReport.hallucinationRatePct}
        onOpenTestConsole={() => alert("🧪 Live RAG Query & Citation Tester Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIRAGAnalyticsWidget aiReport={aiReport} />
          <RAGPipelineStepsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <RAGQueryExplorerTable />
        </div>
      </div>
    </div>
  );
}
