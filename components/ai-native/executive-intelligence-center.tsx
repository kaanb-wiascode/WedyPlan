"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, DollarSign, PieChart, Crown, ArrowUpRight, Zap, Check } from "lucide-react";
import { AiExecutiveIntelligenceEngine, ExecutiveBriefingItem, ExecutivePlatformSummary, ExecutiveInsightDomain } from "@/lib/ai-native/ai-executive-intelligence-engine";

export const ExecutiveIntelligenceCenter: React.FC = () => {
  const [items, setItems] = useState<ExecutiveBriefingItem[]>([]);
  const [summary, setSummary] = useState<ExecutivePlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<ExecutiveInsightDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiExecutiveIntelligenceEngine.getBriefingItems().then(setItems);
    AiExecutiveIntelligenceEngine.getSummary().then(setSummary);
  }, []);

  const handleApproveAction = async (briefingId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiExecutiveIntelligenceEngine.approveStrategicAction(briefingId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' stratejik hamlesi C-Suite tarafından onaylandı ve otonom iş gücüne devredildi!` });
        AiExecutiveIntelligenceEngine.getBriefingItems().then(setItems);
        AiExecutiveIntelligenceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Stratejik aksiyon onaylanamadı." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredItems = selectedDomain === "ALL"
    ? items
    : items.filter((i) => i.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* C-Suite Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              C-Suite AI Executive Intelligence
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Exec Confidence: %{summary.executiveConfidenceIndexPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Üst yönetim (C-Suite) için tahminsel GMV projeksiyonları, senaryo simülasyonları, küresel büyüme riski takibi ve Executive Copilot analizi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Konsolide GMV Hedefi</span>
            <span className="font-mono font-bold text-white text-base">
              ${(summary.consolidatedGmvTargetUsd / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Küresel Pazarlar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeGlobalMarketsCount} Pazar
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. LTV / CAC</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageLtvCacRatio}x
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Executive Copilot Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Executive Copilot Rapor Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Executive AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiExecutiveInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "GLOBAL_EXPANSION", "REVENUE", "GROWTH", "FINANCE", "OPERATIONS"] as (ExecutiveInsightDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Stratejiler" : dom.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Briefings Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <span>Stratejik Yönetici Raporları ({filteredItems.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredItems.map((brf) => (
            <div
              key={brf.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{brf.title}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {brf.domain}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 flex justify-between items-center text-[11px] font-mono">
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{brf.keyMetricValueText}</span>
                <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +%{brf.quarterlyChangePercent} Q/Q
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                ✦ WedyAI Önerisi: {brf.aiStrategicRecommendation}
              </p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tahmini Etki: <strong className="text-emerald-600 dark:text-emerald-400">+${(brf.projectedImpactUsd / 1000).toFixed(0)}K USD</strong></span>
                <span>Güven: %{brf.confidenceScorePercent}</span>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {brf.isActionable ? (
                  <button
                    onClick={() => handleApproveAction(brf.id, brf.title)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Stratejik Hamleyi Onayla (C-Suite Action)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stratejik Aksiyon Onaylandı & Uygulandı
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};