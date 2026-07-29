"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, RefreshCw, CheckCircle2, ShieldAlert, Lock, EyeOff, Terminal, Cpu, FileLock, Sliders, ToggleLeft, ToggleRight } from "lucide-react";
import { AiGovernanceEngine, GovernancePolicyRecord, AiGovernanceSummary, DataClassificationLevel } from "@/lib/ai-native/ai-governance-engine";

export const AiGovernanceCenter: React.FC = () => {
  const [policies, setPolicies] = useState<GovernancePolicyRecord[]>([]);
  const [summary, setSummary] = useState<AiGovernanceSummary | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<DataClassificationLevel | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiGovernanceEngine.getPolicies().then(setPolicies);
    AiGovernanceEngine.getSummary().then(setSummary);
  }, []);

  const handleToggleShield = async (policyId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiGovernanceEngine.togglePolicyShield(policyId);
      setIsProcessing(false);
      AiGovernanceEngine.getPolicies().then(setPolicies);
      AiGovernanceEngine.getSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredPolicies = selectedLevel === "ALL"
    ? policies
    : policies.filter((p) => p.classificationLevel === selectedLevel);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Governance Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              AI Güvenlik & Yönetişim Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Safety: %{summary.overallSafetyCompliancePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Zero-Trust AI güvenlik duvarı, Prompt Injection engelleme, PII verisi maskeleme, model yetkilendirmesi ve izlenebilir denetim kütükleri.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İzlenen Prompt (24s)</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalMonitoredPrompts24h / 1000).toFixed(1)}K Prompt
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Tehdit</span>
            <span className="font-mono font-bold text-red-400 text-base">
              {summary.blockedInjectionThreats24h} Injection
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Maskelenen PII</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.redactedPiiCount24h} Veri
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Output Monitoring & Governance Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Güvenlik & Yönetişim Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Zero-Trust Shield
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiGovernanceInsightNote}
          </p>
        </div>
      </div>

      {/* Classification Level Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "RESTRICTED_PII", "CONFIDENTIAL", "CRITICAL_FINANCIAL", "PUBLIC"] as (DataClassificationLevel | "ALL")[]).map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedLevel === level
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {level === "ALL" ? "Tüm Seviyeler" : level.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Governance Policies Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileLock className="w-5 h-5 text-[#D4AF37]" />
          <span>Güvenlik & Uyum Politikaları ({filteredPolicies.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredPolicies.map((pol) => (
            <div
              key={pol.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{pol.policyName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {pol.classificationLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>PII Maskeleme: <span className="font-bold text-emerald-500">{pol.isPiiAnonymizationActive ? "Aktif" : "Pasif"}</span></div>
                <div>Injection Kalkanı: <span className="font-bold text-emerald-500">{pol.isPromptInjectionShieldActive ? "Aktif" : "Pasif"}</span></div>
                <div>Engellenen Tehdit: <span className="font-bold text-red-500">{pol.totalBlockedThreatsCount} Saldırı</span></div>
                <div>Güvenlik Skoru: <span className="font-bold text-emerald-500">%{pol.safetyScorePercent}</span></div>
              </div>

              <div className="flex flex-wrap gap-1">
                {pol.allowedModels.map((m) => (
                  <span
                    key={m}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6] flex items-center gap-1"
                  >
                    <Cpu className="w-3 h-3 text-[#D4AF37]" /> {m}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Güvenlik Analizi: {pol.aiRiskTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleToggleShield(pol.id)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : pol.isPromptInjectionShieldActive ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                      <span>Kalkan Aktif (Durdur)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-red-400" />
                      <span>Kalkan Pasif (Aktif Et)</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Sınıflandırma: {pol.classificationLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};