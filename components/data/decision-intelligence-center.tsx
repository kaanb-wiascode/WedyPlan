"use client";

import React, { useState, useEffect } from "react";
import { Sliders, ShieldCheck, RefreshCw, CheckCircle2, Zap, TrendingUp, AlertTriangle, Lightbulb, PieChart, BarChart } from "lucide-react";
import { DecisionIntelligenceEngine, DecisionScenarioRecord, DecisionIntelligencePlatformSummary, DecisionDomainArea } from "@/lib/data/decision-intelligence-engine";

export const DecisionIntelligenceCenter: React.FC = () => {
  const [scenarios, setScenarios] = useState<DecisionScenarioRecord[]>([]);
  const [summary, setSummary] = useState<DecisionIntelligencePlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DecisionDomainArea | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DecisionIntelligenceEngine.getScenarios().then(setScenarios);
    DecisionIntelligenceEngine.getSummary().then(setSummary);
  }, []);

  const handleSimulate = async (scenarioId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DecisionIntelligenceEngine.reSimulateScenario(scenarioId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' senaryosu Monte Carlo karar simülasyonuyla yeniden çalıştırıldı (%99.0 Güven Skoru)!` });
        DecisionIntelligenceEngine.getScenarios().then(setScenarios);
        DecisionIntelligenceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Karar simülasyonu başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredScenarios = selectedDomain === "ALL"
    ? scenarios
    : scenarios.filter((s) => s.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Karar Zekası Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Avg Confidence: %{summary.averageConfidenceScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Stratejik kararların uygulamaya geçmeden önce "Ne-Olursa" (What-if) simülasyonları, risk ve güven skorlarıyla modellenmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Simüle Senaryo</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalSimulatedScenariosCount} Senaryo
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Hazır Yüksek Getiri</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.highYieldDecisionsReadyCount} Karar
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ortalama Risk Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageRiskScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Decision Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Karar Tavsiyesi Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Decision AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Lightbulb className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDecisionInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "FINANCE", "MARKETPLACE", "MARKETING", "GROWTH", "OPERATIONS", "EXECUTIVE"] as (DecisionDomainArea | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Karar Alanları" : dom}
          </button>
        ))}
      </div>

      {/* Scenarios Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <BarChart className="w-5 h-5 text-[#D4AF37]" />
          <span>Simüle Edilen Karar Senaryoları ({filteredScenarios.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredScenarios.map((sc) => (
            <div
              key={sc.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{sc.scenarioTitle}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  sc.impactLevel === "LOW_RISK_HIGH_YIELD" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {sc.impactLevel}
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] border border-black/5 dark:border-white/5">
                Değişkenler: <strong className="text-[#111111] dark:text-[#F5F4F0]">{sc.whatIfVariablesSummary}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Tahmini Net Getiri: <span className="font-bold text-emerald-500">+${sc.projectedRevenueDeltaUsd.toLocaleString()} USD</span></div>
                <div>Tedarikçi Bağlılığı: <span className="font-bold text-[#D4AF37]">%{sc.projectedPartnerRetentionPercent}</span></div>
                <div>Risk Skoru: <span className="font-bold text-amber-500">%{sc.riskScorePercent}</span></div>
                <div>Yapay Zeka Güven Skoru: <span className="font-bold text-emerald-500">%{sc.aiConfidenceScorePercent}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ {sc.aiRecommendationNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleSimulate(sc.id, sc.scenarioTitle)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Sliders className="w-3 h-3 text-[#D4AF37]" />
                      <span>Senaryoyu Yeniden Simüle Et</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Simülasyon: {new Date(sc.simulatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
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