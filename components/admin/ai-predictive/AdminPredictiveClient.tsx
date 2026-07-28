"use client";

import React, { useState } from "react";
import PredictiveHeader from "./PredictiveHeader";
import AIPredictiveAnalyticsWidget from "./AIPredictiveAnalyticsWidget";
import ForecastCategoriesBento from "./ForecastCategoriesBento";
import PredictiveSimulatorConsole from "./PredictiveSimulatorConsole";

export default function AdminPredictiveClient() {
  const [aiReport] = useState({
    overallModelAccuracyPct: 96.8,
    projectedAnnualRevenueUsd: "$34.5M",
    predictedCustomerGrowthPct: 42.1,
    predictedVendorGrowthPct: 31.8,
    aiAnalysis: "Predictive Analytics Engine, 2026 yılı sonunda platform işlem hacminde $34.5M ciro ve %42.1 müşteri büyümesi öngörmektedir.",
    topRecommendation: "2026 Q3 yüksek sezon zirvesinde sunucu ve AI Gateway kapasitesinin 1.5x ölçeklenmesi olası darboğazları önleyecektir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PredictiveHeader
        modelAccuracy={aiReport.overallModelAccuracyPct}
        projectedRevenue={aiReport.projectedAnnualRevenueUsd}
        customerGrowth={aiReport.predictedCustomerGrowthPct}
        vendorGrowth={aiReport.predictedVendorGrowthPct}
        onOpenSimulatorModal={() => alert("📈 Predictive Forecast Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPredictiveAnalyticsWidget aiReport={aiReport} />
          <ForecastCategoriesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <PredictiveSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
