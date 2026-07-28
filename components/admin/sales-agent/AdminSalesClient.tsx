"use client";

import React, { useState } from "react";
import SalesAgentHeader from "./SalesAgentHeader";
import AISalesForecastWidget from "./AISalesForecastWidget";
import SalesToolsBentoGrid from "./SalesToolsBentoGrid";
import SalesConsoleAndPipelineTable from "./SalesConsoleAndPipelineTable";

export default function AdminSalesClient() {
  const [aiReport] = useState({
    salesHealthScore: 98,
    avgClosingProbabilityPct: "%82.4",
    forecastedMonthlyGMV: "₺14.200.000",
    activeOpportunitiesCount: 142,
    upsellConversionRatePct: "%34.8",
    aiAnalysis: "Satış Ajanı pazar yerindeki teklifleşme dönüşüm oranını %18.4'ten %28.6'ya yükseltmiştir. Pazarlık Koçluğu (Negotiation Coaching) sayesinde ortalama sözleşme kapanış süresi 12 günden 3 güne düşmüştür.",
    recommendation: "Fotoğrafçılık ve Catering kategorilerinde çapraz satış (Cross-sell) paketlerinin 'Escrow Güvenceli İkili Fırsat' etiketiyle öne çıkarılması önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SalesAgentHeader
        salesHealthScore={aiReport.salesHealthScore}
        closingProbability={aiReport.avgClosingProbabilityPct}
        forecastedGMV={aiReport.forecastedMonthlyGMV}
        activeOpportunities={aiReport.activeOpportunitiesCount}
        onOpenSalesConsole={() => alert("💰 Sales AI Agent Pipeline Console")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISalesForecastWidget aiReport={aiReport} />
          <SalesToolsBentoGrid />
        </div>

        <div className="lg:col-span-7 font-sans">
          <SalesConsoleAndPipelineTable />
        </div>
      </div>
    </div>
  );
}
