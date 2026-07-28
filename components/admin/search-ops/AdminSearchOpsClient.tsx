"use client";

import React, { useState } from "react";
import AdminSearchHeader from "./AdminSearchHeader";
import AISearchIntelligenceWidget from "./AISearchIntelligenceWidget";
import SearchAnalyticsBento from "./SearchAnalyticsBento";
import RankingAndSynonymsTable from "./RankingAndSynonymsTable";
import { triggerSearchReindexJobAction } from "@/lib/actions/admin-search-ops";

export default function AdminSearchOpsClient() {
  const [aiReport] = useState({
    searchHealthScore: 98,
    avgSearchLatencyMs: "18ms (Işık Hızında)",
    zeroResultQueryRate: "%1.4 (Sektör Standartlarının Altında)",
    trendingSearches: [
      "Bodrum Sahil Nikah Seremonisi (+%140)",
      "Gelinlik Kiralama Trendleri (+%85)",
      "Açık Hava Ses Işık Podyum (+%60)",
    ],
    missingContentGaps: [
      "'Sualtı Fotoğraf Çekimi' aramasında 0 sonuç döndü (420 Sorgu/Ay). Kategoriye yeni tedarikçi eklenmesi önerilir.",
    ],
    aiRecommendation: "'Kır Bahçesi' kelimesi ile 'Açık Hava Düğün Mekanı' terimleri arasına otomatik çift yönlü eş anlamlılık tanımlanmalıdır.",
  });

  const handleTriggerReindex = async () => {
    const res = await triggerSearchReindexJobAction({
      targetIndex: "ALL",
      forceFullReindex: false,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminSearchHeader
        searchHealthScore={aiReport.searchHealthScore}
        avgLatency={aiReport.avgSearchLatencyMs}
        zeroResultRate={aiReport.zeroResultQueryRate}
        onTriggerReindex={handleTriggerReindex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISearchIntelligenceWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <SearchAnalyticsBento />
          <RankingAndSynonymsTable />
        </div>
      </div>
    </div>
  );
}
