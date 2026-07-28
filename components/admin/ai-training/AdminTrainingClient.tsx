"use client";

import React, { useState } from "react";
import TrainingHeader from "./TrainingHeader";
import AITrainingAnalyticsWidget from "./AITrainingAnalyticsWidget";
import TrainingDatasetsBento from "./TrainingDatasetsBento";
import ModelDeploymentExplorerTable from "./ModelDeploymentExplorerTable";

export default function AdminTrainingClient() {
  const [aiReport] = useState({
    trainingHealthScore: 99,
    activeFineTunedModelsCount: 4,
    totalTrainingSamples: 482000,
    monthlyCostSavingsUsd: "$14.200",
    aiAnalysis: "Özel eğitilmiş 'wedyplan-llama3-8b' ve 'wedyplan-gpt4o-mini' modellerimiz dış API harcamalarını %82 azaltmış, Türkçe düğün terminolojisi doğruluk oranını %99.1 seviyesine çıkarmıştır.",
    recommendation: "Sözleşme analizi için 12.000 yeni hukuki veri seti örneği ile 'wedyplan-legal-v3' modelinin yeniden eğitilmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <TrainingHeader
        healthScore={aiReport.trainingHealthScore}
        activeModels={aiReport.activeFineTunedModelsCount}
        totalSamples={aiReport.totalTrainingSamples}
        costSavings={aiReport.monthlyCostSavingsUsd}
        onOpenStartJobModal={() => alert("⚡ Start Fine-Tuning Modal Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AITrainingAnalyticsWidget aiReport={aiReport} />
          <TrainingDatasetsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ModelDeploymentExplorerTable />
        </div>
      </div>
    </div>
  );
}
