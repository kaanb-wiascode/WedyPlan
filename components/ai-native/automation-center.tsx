"use client";

import React, { useState, useEffect } from "react";
import { Zap, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Play, Layers, Clock, ShieldAlert, Cpu, ToggleLeft, ToggleRight, FileText } from "lucide-react";
import { AiAutomationEngine, AutomationRuleRecord, AiAutomationSummary, AutomationDomain } from "@/lib/ai-native/ai-automation-engine";

export const AutomationCenter: React.FC = () => {
  const [rules, setRules] = useState<AutomationRuleRecord[]>([]);
  const [summary, setSummary] = useState<AiAutomationSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<AutomationDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiAutomationEngine.getRules().then(setRules);
    AiAutomationEngine.getSummary().then(setSummary);
  }, []);

  const handleToggleRule = async (ruleId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiAutomationEngine.toggleRuleStatus(ruleId);
      setIsProcessing(false);
      AiAutomationEngine.getRules().then(setRules);
      AiAutomationEngine.getSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredRules = selectedDomain === "ALL"
    ? rules
    : rules.filter((r) => r.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Automation Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal AI Otomasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Anomaly Shield: {summary.aiAnomalyDetectionStatus}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          E-posta, SMS, bildirimler, CRM, fatura, randevu ve içerik üretim süreçlerinin otonom tetikleyici ve koşullarla otomatize edilmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kurallar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveAutomationRulesCount} Kural
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Günlük Çalıştırma</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalExecutionsCount24h} Task
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Zaman Tasarrufu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.hoursSavedPerMonthTotal} Saat
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Automation Optimization & Anomaly Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Otomasyon & Anomali Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Autonomous Triggering
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiAutomationInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "INVOICES", "CRM", "SCHEDULING", "NOTIFICATIONS", "EMAIL"] as (AutomationDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Kurallar" : dom}
          </button>
        ))}
      </div>

      {/* Automation Rules Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Tanımlı Otomasyon Kuralları ({filteredRules.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredRules.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.ruleTitle}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {r.domain}
                </span>
              </div>

              <div className="space-y-1.5 p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] font-mono">
                <div>⚡ Tetikleyici: <span className="text-[#D4AF37] font-bold">{r.triggerEvent}</span></div>
                <div>🔍 Koşul: <span className="text-[#111111] dark:text-[#F5F4F0]">{r.conditionText}</span></div>
                <div>🚀 Eylem: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{r.actionSummaryText}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Önerisi: {r.aiSuggestedOptimizationNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleToggleRule(r.id)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : r.isActive ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                      <span>Kural Aktif (Durdur)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-red-400" />
                      <span>Kural Pasif (Aktif Et)</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[#86868B]">
                  Son 24s: {r.executionsCount24h} Çalıştırma
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};