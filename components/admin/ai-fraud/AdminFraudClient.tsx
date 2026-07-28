"use client";

import React, { useState } from "react";
import FraudHeader from "./FraudHeader";
import AIFraudAnalyticsWidget from "./AIFraudAnalyticsWidget";
import FraudCategoriesBento from "./FraudCategoriesBento";
import FraudSimulatorConsole from "./FraudSimulatorConsole";

export default function AdminFraudClient() {
  const [aiReport] = useState({
    preventedLossUsd: "$480K",
    blockedThreatsCount: 1240,
    avgLatencyMs: 38,
    falsePositiveRatePct: 0.2,
    aiAnalysis: "Fraud Detection AI Engine, son 30 günde 1,240 sahte hesap ve ödeme suiistimalini otomatik engelleyerek platformu $480K tahmini zarardan korumuştur.",
    topRecommendation: "Kupon kullanımında 'Cihaz Parmak İzi + GSM Onay' ikili doğrulama eşiğinin aktif edilmesi kupon ihlallerini %100 sıfırlayacaktır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <FraudHeader
        preventedLoss={aiReport.preventedLossUsd}
        blockedThreats={aiReport.blockedThreatsCount}
        avgLatencyMs={aiReport.avgLatencyMs}
        falsePositive={aiReport.falsePositiveRatePct}
        onOpenSimulatorModal={() => alert("🛡️ Fraud Detection Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIFraudAnalyticsWidget aiReport={aiReport} />
          <FraudCategoriesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <FraudSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
