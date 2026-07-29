"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Scale, Shield } from "lucide-react";
import { ComplianceEngine, FinancialPolicyRule, GovernanceAuditLog, ComplianceReadinessSummary } from "@/lib/fintech/compliance-engine";

export const FinancialGovernanceDashboard: React.FC = () => {
  const [policies, setPolicies] = useState<FinancialPolicyRule[]>([]);
  const [logs, setLogs] = useState<GovernanceAuditLog[]>([]);
  const [summary, setSummary] = useState<ComplianceReadinessSummary | null>(null);

  useEffect(() => {
    ComplianceEngine.getPolicies().then(setPolicies);
    ComplianceEngine.getAuditLogs().then(setLogs);
    ComplianceEngine.getSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Compliance Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Finansal Uyum & Yönetişim Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Score: {summary.overallComplianceScore}/100
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Bölgesel vergi ve regülasyon konfigürasyonları, 7 yıllık değişmez denetim kütükleri (Audit Logs) ve WedyAI yönetişim asistanı.
        </p>

        {/* Governance Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Uyum Skoru</span>
            <span className="font-mono font-bold text-white text-base">
              %{summary.overallComplianceScore}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Denetlenen Kurallar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeAuditedRulesCount} Kural
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Veri Saklama Süresi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.dataRetentionRetentionYears} Yıl (VUK)
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Policy Suggestions & Audit Insights Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Uyum & Denetim Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Audit Ready
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {summary.aiAuditInsightNote}
            </p>
            <p className="text-[10px] text-[#86868B] pt-1">
              Öneri: {summary.aiPolicyRecommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Configurable Regional Policies Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#D4AF37]" />
          <span>Konfigüre Edilebilir Uyum Politikaları ({policies.length})</span>
        </h4>

        <div className="space-y-3">
          {policies.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{p.policyName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {p.status}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{p.description}</p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Bölge: {p.regionScope}</span>
                <span>Saklama: {p.retentionPeriodYears} Yıl</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Immutable Audit Logs Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Değişmez Yönetişim Denetim Kütüğü (Audit Logs) ({logs.length})
        </h4>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{log.actionTaken}</span>
                <span className="font-mono text-[#D4AF37] text-[10px]">
                  {log.actorRole}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Hedef: {log.targetDomain}</span>
                <span>Hash: {log.auditHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};