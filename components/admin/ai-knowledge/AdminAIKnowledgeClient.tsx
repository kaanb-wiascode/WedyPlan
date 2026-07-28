"use client";

import React, { useState } from "react";
import AIKnowledgeHeader from "./AIKnowledgeHeader";
import AIKnowledgeAnalyticsWidget from "./AIKnowledgeAnalyticsWidget";
import KnowledgeSourcesBento from "./KnowledgeSourcesBento";
import KnowledgeAssetsTable from "./KnowledgeAssetsTable";

export default function AdminAIKnowledgeClient() {
  const [aiReport] = useState({
    overallKnowledgeScore: 98,
    totalAssetsCount: 420,
    publishedAssetsCount: 398,
    pendingApprovalsCount: 2,
    aiAnalysis: "Tüm portallardaki AI RAG sistemleri 420 doğrulanmış bilgi varlığı üzerinden %98 kalite skoru ile beslenmektedir. Son 30 günde hiçbir çelişkili veya güncelliğini yitirmiş içerik tespit edilmemiştir.",
    duplicateAlertsCount: 0,
    recommendation: "2026 yılı güncellenmiş KDV tevkifat oranları doğrultusunda 'legal.escrow_terms_v2' dokümanının revize edilmesi önerilir.",
  });

  const [assets] = useState([
    { id: "ast_101", title: "Bodrum Lüks Destinasyon Düğünü Rehberi 2026", assetKey: "guide.bodrum_destination", sourceType: "WEDDING_GUIDES", versionTag: "v1.2", qualityScore: 98, tags: ["Bodrum", "Plaj", "Lüks"], status: "PUBLISHED" },
    { id: "ast_102", title: "Escrow Güvenceli Kapora & İptal Sözleşme Koşulları", assetKey: "legal.escrow_terms_v2", sourceType: "CONTRACTS", versionTag: "v2.1", qualityScore: 96, tags: ["Escrow", "İptal", "Hukuk"], status: "PENDING_APPROVAL" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIKnowledgeHeader
        knowledgeScore={aiReport.overallKnowledgeScore}
        totalAssets={aiReport.totalAssetsCount}
        publishedAssets={aiReport.publishedAssetsCount}
        pendingApprovals={aiReport.pendingApprovalsCount}
        onOpenNewAssetModal={() => alert("📚 Yeni AI Bilgi Varlığı Oluşturucu Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIKnowledgeAnalyticsWidget aiReport={aiReport} />
          <KnowledgeSourcesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <KnowledgeAssetsTable assets={assets} />
        </div>
      </div>
    </div>
  );
}
