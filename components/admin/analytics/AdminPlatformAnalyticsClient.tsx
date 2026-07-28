"use client";

import React, { useState } from "react";
import AdminPlatformAnalyticsHeader from "./AdminPlatformAnalyticsHeader";
import AIBehaviorIntelligenceWidget from "./AIBehaviorIntelligenceWidget";
import ConversionFunnelsBento from "./ConversionFunnelsBento";
import TrafficAndJourneyTable from "./TrafficAndJourneyTable";

export default function AdminPlatformAnalyticsClient() {
  const [aiReport] = useState({
    uxHealthScore: 96,
    overallConversionRate: "%4.2 (Sektör Ortalamasının Üzerinde)",
    topDropOffStep: "Teklif Formu -> Bütçe Seçimi Aşaması (%32 Terk Oranı)",
    rageClickAlertsCount: 1,
    aiAnalysis: "Gözlemlerimize göre mobildeki çiftlerin %68'i pazar yeri arama sonuçlarını 'Filtrele' butonuna basmadan önce ilk 3 mekanı inceliyor. 'Teklif İste' butonunun her kart üstüne sabitlenmesi dönüşümü artıracaktır.",
    journeyOptimizationRecommendation: "Çiftlerin kayıt olduktan sonraki ilk 10 dakika içinde AI Wedding Planner ile etkileşime girmesi 30 günlük sözleşme imzalama oranını 2.4 katına çıkarıyor.",
    abTestWinner: "A/B Test #104: 'Hızlı E-İmza' varyantı %18.4 daha yüksek dönüşüm sağladı.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminPlatformAnalyticsHeader
        totalSessionsMonth={340000}
        overallConversionRate={aiReport.overallConversionRate}
        avgSessionDuration="3 Dk 42 Saniye"
        onOpenHeatmaps={() => alert("🔥 Canlı Isı Haritası (Heatmaps) ve Session Replay Oynatıcı Paneli")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIBehaviorIntelligenceWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ConversionFunnelsBento />
          <TrafficAndJourneyTable />
        </div>
      </div>
    </div>
  );
}
