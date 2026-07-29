"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, FileText, Lock, Eye, ToggleLeft, ToggleRight, History } from "lucide-react";
import { ComplianceEngine, RegionalPolicyRecord, ComplianceAuditLogItem, ComplianceSummaryStats, JurisdictionFramework } from "@/lib/global/compliance-engine";

export const ComplianceCenter: React.FC = () => {
  const [policies, setPolicies] = useState<RegionalPolicyRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<ComplianceAuditLogItem[]>([]);
  const [summary, setSummary] = useState<ComplianceSummaryStats | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<JurisdictionFramework | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    ComplianceEngine.getPolicies().then(setPolicies);
    ComplianceEngine.getAuditLogs().then(setAuditLogs);
    ComplianceEngine.getComplianceSummary().then(setSummary);
  }, []);

  const handleTogglePolicy = async (policyId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await ComplianceEngine.togglePolicy(policyId);
      setIsProcessing(false);
      ComplianceEngine.getPolicies().then(setPolicies);
      ComplianceEngine.getComplianceSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredPolicies = selectedFramework === "ALL"
    ? policies
    : policies.filter((p) => p.framework === selectedFramework);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Compliance Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Uluslararası Yasal Uyum Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{summary.aiComplianceHealthScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          KVKK, EU GDPR, UAE PDPL ve US CCPA mevzuatlarına uyumlu bölgesel yasal politikalar, rıza yönetimi ve denetim kütükleri.
        </p>

        {/* Global Compliance Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Politika</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.configuredPoliciesCount} Politika
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Çerçeve</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeFrameworksCount} Framework
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Uyum Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiComplianceHealthScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Legal Gap Monitoring Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Yasal Açık & Risk İzleme
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Audit Ready
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiComplianceInsightNote}
          </p>
        </div>
      </div>

      {/* Framework Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "KVKK_TR", "EU_GDPR", "UAE_PDPL", "US_CCPA"] as (JurisdictionFramework | "ALL")[]).map((fw) => (
          <button
            key={fw}
            onClick={() => setSelectedFramework(fw)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedFramework === fw
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {fw === "ALL" ? "Tüm Mevzuatlar" : fw}
          </button>
        ))}
      </div>

      {/* Policies Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Yasal Politikalar ({filteredPolicies.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredPolicies.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{p.policyTitle}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {p.framework}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Saklama Süresi: {p.retentionPeriodMonths} Ay</span>
                <span>Sürüm: {p.version}</span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-medium">
                ✦ WedyAI Değerlendirmesi: {p.aiPolicyRecommendationTip}
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleTogglePolicy(p.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : p.isActive ? (
                    <span>Politika Aktif (Pasif Yap)</span>
                  ) : (
                    <span>Politika Pasif (Aktif Et)</span>
                  )}
                </button>

                <span className="font-mono text-[#86868B]">Risk: %{p.aiPolicyGapRiskPercent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Audit Logs Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <History className="w-5 h-5 text-[#D4AF37]" />
          <span>Yasal Denetim Günlüğü (Audit Trail)</span>
        </h4>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl flex justify-between items-center text-[11px] font-mono border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{log.userRef}</span>
                <span className="text-[9px] text-[#86868B]">{log.actionTaken}</span>
              </div>
              <div className="text-right text-[9px] text-[#86868B]">
                <span className="block font-bold text-[#D4AF37]">{log.framework}</span>
                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};