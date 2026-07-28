"use client";

import React, { useState } from "react";
import AdminRevenueHeader from "./AdminRevenueHeader";
import AIRevenueForecastWidget from "./AIRevenueForecastWidget";
import RevenueStreamsBento from "./RevenueStreamsBento";
import UnitEconomicsTable from "./UnitEconomicsTable";
import { runRevenueForecastScenarioAction } from "@/lib/actions/admin-revenue";

export default function AdminRevenueClient() {
  const [aiReport] = useState({
    financialHealthScore: 98,
    currentMrr: "1.420.000 ₺",
    currentArr: "17.040.000 ₺",
    ltvCacRatio: "4.8x (Mükemmel Verimlilik)",
    arpuVendor: "1.690 ₺ / Ay",
    arpuCouple: "145 ₺ / Düğün",
    aiAnalysis: "WedyPlan platform gelirlerinin %58'i Tedarikçi Aboneliklerinden, %24'ü Pazar Yeri Komisyonlarından ve %18'i AI Credit & Öne Çıkan İlan satışlarından oluşmaktadır. Birim ekonomisi LTV/CAC oranı 4.8x ile global SaaS standartlarının üzerindedir.",
    churnRevenueImpact: "14.500 ₺ / Ay (Risk Düşük)",
    upsellOpportunityValue: "68.000 ₺ / Ay Potential",
    growthRecommendation: "Bodrum ve Çeşme bölgelerinde 'Featured Venue' vitrin ilan fiyatlarının %15 oranında güncellenmesi önerilir.",
  });

  const handleRunSimulation = async () => {
    const res = await runRevenueForecastScenarioAction({
      timeframe: "THIS_YEAR",
      scenario: "REALISTIC",
      simulatedChurnChange: -5,
      simulatedPriceIncrease: 10,
    });

    if (res.success) {
      alert("✨ " + res.message + " -> Gelecek Yıl Tahmini ARR: " + res.projectedArr);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminRevenueHeader
        mrrAmount={aiReport.currentMrr}
        arrAmount={aiReport.currentArr}
        ltvCacRatio={aiReport.ltvCacRatio}
        onRunSimulation={handleRunSimulation}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIRevenueForecastWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <RevenueStreamsBento />
          <UnitEconomicsTable aiReport={aiReport} />
        </div>
      </div>
    </div>
  );
}
