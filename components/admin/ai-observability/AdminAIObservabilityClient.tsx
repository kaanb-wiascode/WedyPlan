"use client";

import React, { useState } from "react";
import AIObservabilityHeader from "./AIObservabilityHeader";
import AIObservabilityAnalyticsWidget from "./AIObservabilityAnalyticsWidget";
import ProviderCostMetricsBento from "./ProviderCostMetricsBento";
import TraceLogsAndFeedbackTable from "./TraceLogsAndFeedbackTable";

export default function AdminAIObservabilityClient() {
  const [aiReport] = useState({
    overallQualityScore: 99,
    totalCostUsdToday: "$12.48",
    totalTokensToday: 4820000,
    avgLatencyMs: "18ms",
    hallucinationReportsCount: 1,
    aiAnalysis: "Tüm portallardaki LLM ve RAG etkileşimleri %99 genel kalite skoru ve ortalama 18ms latency ile izlenmektedir. Son 24 saatte yalnızca 1 adet hallüsinasyon ihbarı yapılmış ve doğrulanmıştır.",
    costOptimizationTip: "'FAST_SUMMARY' görevlerinde gpt-4o yerine Llama-3-8B modelinin tercih edilmesi günlük maliyeti $3.40 düşürecektir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIObservabilityHeader
        qualityScore={aiReport.overallQualityScore}
        totalCostToday={aiReport.totalCostUsdToday}
        totalTokensToday={aiReport.totalTokensToday}
        avgLatency={aiReport.avgLatencyMs}
        onOpenTestTraceModal={() => alert("📊 Live Telemetry Trace Playground Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIObservabilityAnalyticsWidget aiReport={aiReport} />
          <ProviderCostMetricsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <TraceLogsAndFeedbackTable />
        </div>
      </div>
    </div>
  );
}
