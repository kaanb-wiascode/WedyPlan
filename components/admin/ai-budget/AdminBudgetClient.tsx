"use client";

import React, { useState } from "react";
import BudgetHeader from "./BudgetHeader";
import AIBudgetAnalyticsWidget from "./AIBudgetAnalyticsWidget";
import BudgetCategoriesBento from "./BudgetCategoriesBento";
import BudgetSimulatorConsole from "./BudgetSimulatorConsole";

export default function AdminBudgetClient() {
  const [aiReport] = useState({
    trainingHealthScore: 92,
    totalManagedBudgetUsd: "$18.4M",
    avgSavingsRatePct: 14.8,
    analyzedCount: 1240,
    aiAnalysis: "Budget Intelligence Engine, son 30 günde çiftlerin mekan ve catering seçimlerinde %14.8 oranında ortalama tasarruf sağlamış, gizli maliyet risklerini önceden tespit etmiştir.",
    topRecommendation: "Catering hizmetlerini mekan içi paket yerine dışarıdan sertifikalı ortak tedarikçi ile eşleştirerek ortalama %18 ek maliyet avantajı elde edilebilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <BudgetHeader
        healthScore={aiReport.trainingHealthScore}
        totalManaged={aiReport.totalManagedBudgetUsd}
        avgSavings={aiReport.avgSavingsRatePct}
        analyzedCount={aiReport.analyzedCount}
        onOpenSimulationModal={() => alert("💡 Bütçe Simülatörü Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIBudgetAnalyticsWidget aiReport={aiReport} />
          <BudgetCategoriesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <BudgetSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
