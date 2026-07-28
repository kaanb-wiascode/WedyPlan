"use client";

import React, { useState } from "react";
import BIHeader from "./BIHeader";
import AIBusinessHealthWidget from "./AIBusinessHealthWidget";
import BIKpiBento from "./BIKpiBento";
import BIAnalyticsCharts from "./BIAnalyticsCharts";

export default function VendorBIClient({ vendorId }: { vendorId: string }) {
  const [viewMode, setViewMode] = useState("EXECUTIVE");
  const [timeframe, setTimeframe] = useState("MONTHLY");

  const [biData] = useState({
    kpis: {
      totalRevenue: "1.240.000 ₺",
      revenueGrowth: "+%22",
      conversionRate: "%34",
      campaignRoi: "%340",
      responseTimeMinutes: "12 dk",
      customerSatisfactionScore: 4.9,
      contractSuccessRate: "%88",
      paymentSuccessRate: "%96",
      cancellationRate: "%2",
    },
    competitorBenchmark: {
      regionalRank: "2 / 48 (Bodrum Bölgesi)",
      pricePositioning: "Lüks Segment Ortalamasında",
      responseSpeedComparison: "Pazardan %40 Daha Hızlı",
    },
    leadSourcesDistribution: [
      { source: "WedyPlan Organik", percentage: 48 },
      { source: "Instagram & Sosyal Medya", percentage: 32 },
      { source: "Tavsiye & Doğrudan", percentage: 20 },
    ],
  });

  const [aiData] = useState({
    businessHealthScore: 96,
    growthForecast: "Önümüzdeki 12 ayda %24 beklenen ciro büyümesi.",
    opportunityDetection: "Son 3 ayda açık hava akşam düğünü talepleri %35 arttı. Bu alandaki paket kapasitenizi artırmak ek 280.000 ₺ ciro yaratabilir.",
    riskAlerts: [
      "Cuma günleri için gelen taleplerde yanıt süresi ortalaması 24 dakikaya yükseldi.",
    ],
    actionRecommendations: [
      "Hafta sonu boş kalan 2 tarihi dolabilmesi için %10 'Sınırlı Zaman' fırsat kampanyası başlatın.",
      "Mutfak ekibi tadım süreçlerinde müşteri memnuniyeti %98 seviyesinde; bunu pazarlama materyallerinde öne çıkarın.",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <BIHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      <BIKpiBento kpis={biData.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIBusinessHealthWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <BIAnalyticsCharts
            benchmark={biData.competitorBenchmark}
            leadSources={biData.leadSourcesDistribution}
          />
        </div>
      </div>
    </div>
  );
}
