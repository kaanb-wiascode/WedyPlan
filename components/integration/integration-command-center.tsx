"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, CheckCircle2, Zap, Server, Activity, Users, Award, Crown, Cpu, Terminal, ArrowUpRight, Check, AlertCircle, FileText } from "lucide-react";
import { IntegrationCommandCenterEngine, ExecutiveRoleView, ExecutiveMetricsPersonaData, EnterpriseReadinessReport, SystemSubmoduleHealth } from "@/lib/integration/integration-command-center-engine";

export const IntegrationCommandCenter: React.FC = () => {
  const [activeRole, setActiveRole] = useState<ExecutiveRoleView>("CEO");
  const [personaData, setPersonaData] = useState<ExecutiveMetricsPersonaData | null>(null);
  const [readinessReport, setReadinessReport] = useState<EnterpriseReadinessReport | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    IntegrationCommandCenterEngine.getPersonaData(activeRole).then(setPersonaData);
    IntegrationCommandCenterEngine.getEnterpriseReadinessReport().then(setReadinessReport);
  }, [activeRole]);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const pData = await IntegrationCommandCenterEngine.getPersonaData(activeRole);
      const rReport = await IntegrationCommandCenterEngine.getEnterpriseReadinessReport();
      setPersonaData(pData);
      setReadinessReport(rReport);
      setIsRefreshing(false);
    }, 400);
  };

  if (!personaData || !readinessReport) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Center Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Enterprise Integration Command Center
            </h3>
          </div>
          <button
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Phase 14 Kurumsal Ekosistem & Entegrasyon Platformunun üst düzey yönetici görünümü, canlı alt modül telemetrisi ve WedyAI kurumsal olgunluk değerlendirmesi.
        </p>

        {/* Master Readiness Status Badge */}
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
              Enterprise Readiness Status
            </span>
            <span className="text-sm font-mono font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{readinessReport.readinessStatus}</span>
            </span>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-[#D4AF37] block font-bold">Health: %{readinessReport.overallEnterpriseHealthScorePercent}</span>
            <span className="text-emerald-400 block text-[9px]">{readinessReport.securityComplianceRating}</span>
          </div>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-white/10">
          {(["CEO", "CTO", "CIO", "INTEGRATION_DIRECTOR", "OPERATIONS"] as ExecutiveRoleView[]).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border whitespace-nowrap transition-all ${
                activeRole === role
                  ? "bg-[#D4AF37] text-[#111111] border-[#D4AF37]"
                  : "bg-white/5 text-[#D1D1D6] border-white/10 hover:bg-white/10"
              }`}
            >
              {role.replace("_", " ")} View
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Executive Persona Metric Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> {activeRole} Executive Focus Dashboard
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Live Stream
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#86868B] block">{personaData.primaryHeadlineMetric}</span>
            <span className="text-xl font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">{personaData.primaryMetricValue}</span>
          </div>

          <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#86868B] block">{personaData.secondaryMetricName}</span>
            <span className="text-xl font-mono font-bold text-[#D4AF37]">{personaData.secondaryMetricValue}</span>
          </div>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2 text-xs">
          <Zap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {personaData.strategicFocusNote}
          </p>
        </div>
      </div>

      {/* Submodules Health Telemetry Grid */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Entegrasyon Alt Sistemleri Canlı Telemetrisi ({readinessReport.submodulesHealthList.length})</span>
        </h4>

        <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
          {readinessReport.submodulesHealthList.map((sub) => (
            <div
              key={sub.moduleKey}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex justify-between items-center text-xs border border-black/5 dark:border-white/5"
            >
              <div>
                <strong className="text-[#111111] dark:text-[#F5F4F0] block">{sub.moduleName}</strong>
                <span className="text-[10px] font-mono text-[#86868B]">İstek/İş: {sub.activeRequestsOrJobs24h.toLocaleString()} | Gecikme: {sub.latencyMs}ms</span>
              </div>

              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                %{sub.healthScorePercent}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WedyAI Executive Readiness Summary */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> WedyAI Kurumsal Olgunluk Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Audit Complete
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {readinessReport.aiReadinessSummaryNote}
          </p>
        </div>
      </div>
    </div>
  );
};