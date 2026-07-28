"use client";

import React, { useState } from "react";
import AIMemoryHeader from "./AIMemoryHeader";
import AIMemoryAnalyticsWidget from "./AIMemoryAnalyticsWidget";
import MemoryTypesBentoGrid from "./MemoryTypesBentoGrid";
import MemoryRecordsTable from "./MemoryRecordsTable";

export default function AdminAIMemoryClient() {
  const [aiReport] = useState({
    memoryHealthScore: 99,
    totalActiveMemories: 142800,
    avgImportanceScore: 84,
    compressionEfficiencyPct: "%68 Token Tasarrufu",
    aiAnalysis: "Platform genelindeki 142.800 anlamsal bellek parçası PGVector ve Redis Vector önbelleğinde %99.9 erişilebilirlik ile saklanmaktadır. Akıllı Sıkıştırma (Memory Compression) son 30 günde 1.2M token tasarrufu sağlamıştır.",
    privacyAuditStatus: "%100 KVKK & GDPR Aydınlatma Metni Uyumlu",
    recommendation: "365 günü geçen 'CONVERSATION_MEMORY' parçalarının otomatik anonimleştirilerek soğuk depoya çekilmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIMemoryHeader
        healthScore={aiReport.memoryHealthScore}
        totalActiveMemories={aiReport.totalActiveMemories}
        avgImportanceScore={aiReport.avgImportanceScore}
        compressionEfficiency={aiReport.compressionEfficiencyPct}
        onOpenTestRecallModal={() => alert("🔍 Smart Recall Test Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMemoryAnalyticsWidget aiReport={aiReport} />
          <MemoryTypesBentoGrid />
        </div>

        <div className="lg:col-span-7 font-sans">
          <MemoryRecordsTable />
        </div>
      </div>
    </div>
  );
}
