"use client";

import React, { useState, useEffect } from "react";
import { Activity, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Cpu, DollarSign, Clock, Layers, Gauge, BarChart, ArrowUpRight } from "lucide-react";
import { AiObservabilityEngine, ModelPerformanceMetric, AgentTraceSpan, AiObservabilitySummary } from "@/lib/ai-native/ai-observability-engine";

export const AiObservabilityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelPerformanceMetric[]>([]);
  const [traces, setTraces] = useState<AgentTraceSpan[]>([]);
  const [summary, setSummary] = useState<AiObservabilitySummary | null>(null);

  useEffect(() => {
    AiObservabilityEngine.getModelMetrics().then(setMetrics);
    AiObservabilityEngine.getTraceSpans().then(setTraces);
    AiObservabilityEngine.getSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Observability Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              AI Gözlemlenebilirlik Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> CSAT: %{summary.overallAiCsatPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm AI etkileşimleri ve ajan iş akışlarının anlık gecikme (Latency), token tüketimi, model maliyeti ve doğruluk skorlarının izlenmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Token Tüketimi (24s)</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalTokensConsumed24h / 1000000).toFixed(2)}M Token
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Günlük API Maliyeti</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ${summary.totalInferenceCostUsd24h.toFixed(2)} USD
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Gecikme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageGlobalLatencyMs} ms
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Cost & Latency Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Performans & Maliyet Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Tracing Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiObservabilityInsightNote}
          </p>
        </div>
      </div>

      {/* Model Benchmark & Cost Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#D4AF37]" />
          <span>Model Karşılaştırma & Maliyet Matrisi ({metrics.length})</span>
        </h4>

        <div className="space-y-3">
          {metrics.map((m) => (
            <div
              key={m.modelName}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{m.modelName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  Prompt: {m.activePromptVersion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Ort. Gecikme: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{m.averageLatencyMs} ms</span></div>
                <div>24s Token: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(m.tokensConsumed24h / 1000).toFixed(0)}K</span></div>
                <div>Günlük Maliyet: <span className="font-bold text-[#D4AF37]">${m.totalCostUsd24h.toFixed(2)} USD</span></div>
                <div>Doğruluk: <span className="font-bold text-emerald-500">%{m.accuracyScorePercent}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Değerlendirmesi: {m.aiCostEfficiencyTip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Trace Spans Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Gauge className="w-5 h-5 text-[#D4AF37]" />
          <span>Dağıtık Ajan İzleri (Distributed Traces)</span>
        </h4>

        <div className="space-y-2">
          {traces.map((t) => (
            <div
              key={t.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl space-y-1 text-[11px] font-mono border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{t.agentName}</span>
                <span className="text-[9px] text-emerald-500 font-bold">{t.status} ({t.latencyMs} ms)</span>
              </div>
              <p className="text-[10px] text-[#86868B]">{t.traceName}</p>
              <div className="flex justify-between items-center text-[9px] text-[#86868B] pt-1 border-t border-black/5 dark:border-white/5">
                <span>Tokens: {t.inputTokens} in / {t.outputTokens} out</span>
                <span className="text-[#D4AF37] font-bold">${t.costUsd.toFixed(4)} USD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};