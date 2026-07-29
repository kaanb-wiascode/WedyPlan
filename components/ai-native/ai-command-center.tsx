"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, RefreshCw, CheckCircle2, Cpu, Activity, Gauge, Server, Users, DollarSign, Layers, Globe, Zap, AlertTriangle, ShieldAlert } from "lucide-react";
import { AiCommandCenterEngine, EnterpriseAiReadinessTelemetry, ExecutiveRoleView } from "@/lib/ai-native/ai-command-center-engine";

export const AiCommandCenter: React.FC = () => {
  const [telemetry, setTelemetry] = useState<EnterpriseAiReadinessTelemetry | null>(null);
  const [activeRole, setActiveRole] = useState<ExecutiveRoleView>("CEO");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    AiCommandCenterEngine.getGlobalTelemetry().then(setTelemetry);
  }, []);

  const handleRefreshTelemetry = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const refreshed = await AiCommandCenterEngine.getGlobalTelemetry();
      setTelemetry(refreshed);
      setIsRefreshing(false);
    }, 400);
  };

  if (!telemetry) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Center Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gauge className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Enterprise AI Command Center
            </h3>
          </div>
          <button
            onClick={handleRefreshTelemetry}
            disabled={isRefreshing}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          WedyPlan üzerindeki tüm AI ajanlarının, modellerinin, bellek, güvenlik, maliyet ve iş akışlarının merkezi komuta kontrol paneli.
        </p>

        {/* Master Readiness Score & Status */}
        <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider block">
              Enterprise AI Readiness Score
            </span>
            <span className="font-mono text-3xl font-bold text-white flex items-center gap-2">
              %{telemetry.enterpriseAiReadinessScorePercent}
              <span className="text-xs font-sans font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {telemetry.globalSystemHealthStatus}
              </span>
            </span>
          </div>

          <div className="text-right font-mono text-xs space-y-0.5">
            <span className="text-[#D4AF37] block font-bold">9 Ajan Aktif</span>
            <span className="text-[#86868B] block">${telemetry.totalApiCostUsd24h.toFixed(2)}/gün</span>
          </div>
        </div>

        {/* Global Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Günlük Token</span>
            <span className="font-mono font-bold text-white text-base">
              {(telemetry.totalTokensConsumed24h / 1000000).toFixed(2)}M
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Otomasyon Oranı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{telemetry.overallAutomationRatePercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Tehdit</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {telemetry.blockedSecurityThreats24h} Threat
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Global System Recommendation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Global Sistem Analiz Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Command Center Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {telemetry.aiGlobalOptimizationRecommendation}
          </p>
        </div>
      </div>

      {/* Role Dashboard Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["CEO", "CTO", "CIO", "AI_DIRECTOR", "OPERATIONS"] as ExecutiveRoleView[]).map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              activeRole === role
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {role === "CEO" ? "CEO View" : role === "CTO" ? "CTO View" : role === "CIO" ? "CIO View" : role === "AI_DIRECTOR" ? "AI Director View" : "Operations View"}
          </button>
        ))}
      </div>

      {/* Subsystems Health Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <span>Alt Sistem Telemetrisi ({telemetry.moduleHealthList.length} Modül)</span>
        </h4>

        <div className="space-y-3">
          {telemetry.moduleHealthList.map((m) => (
            <div
              key={m.moduleKey}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{m.moduleName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {m.status} (%{m.efficiencyScorePercent})
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6]">
                ✦ Status: {m.activeTelemetryNotes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};