"use client";

import React, { useState, useEffect } from "react";
import { Crown, ShieldCheck, RefreshCw, CheckCircle2, Zap, TrendingUp, Award, Layers, FileText, Download, Activity, Check } from "lucide-react";
import { ExecutiveIntelligenceEngine, ExecutivePersonaRole, ExecutivePersonaViewData, ExecutivePlatformSummary } from "@/lib/data/executive-intelligence-engine";

export const ExecutiveIntelligenceDashboard: React.FC = () => {
  const [activeRole, setActiveRole] = useState<ExecutivePersonaRole>("CEO");
  const [personaData, setPersonaData] = useState<ExecutivePersonaViewData | null>(null);
  const [summary, setSummary] = useState<ExecutivePlatformSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ExecutiveIntelligenceEngine.getPersonaData(activeRole).then(setPersonaData);
    ExecutiveIntelligenceEngine.getSummary().then(setSummary);
  }, [activeRole]);

  const handleGenerateBoardReport = async () => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await ExecutiveIntelligenceEngine.generateBoardReportPackage(activeRole);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${activeRole}' için Yönetim Kurulu Rapor Paketi (Board Report Package) başarıyla derlendi ve mühürlendi!` });
      } else {
        setStatusMsg({ type: "error", text: "Board rapor paketi derlemesi başarısız oldu." });
      }
    }, 400);
  };

  if (!personaData || !summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Executive Intelligence Dashboard
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Readiness: %{summary.enterpriseReadinessScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          CEO, CFO, CTO, COO, CMO ve CIO yöneticileri için konsolide stratejik göstergeler, 12 aylık yapay zeka tahminleri ve otonom yönetim kurulu raporlaması.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">KPI Başarı Oranı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.overallStrategicKpiPassRatePercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Board Rapor Paketi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeBoardReportsGenerated24h} Paket
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kurumsal Skor</span>
            <span className="font-mono font-bold text-white text-base">
              %{summary.enterpriseReadinessScorePercent}
            </span>
          </div>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-white/10">
          {(["CEO", "CFO", "CTO", "COO", "CMO", "CIO"] as ExecutivePersonaRole[]).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border whitespace-nowrap transition-all ${
                activeRole === role
                  ? "bg-[#D4AF37] text-[#111111] border-[#D4AF37]"
                  : "bg-white/5 text-[#D1D1D6] border-white/10 hover:bg-white/10"
              }`}
            >
              {role} Dashboard
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Persona Metric Focus Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> {personaData.title}
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Live Stream
          </span>
        </div>

        <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex justify-between items-center border border-black/5 dark:border-white/5">
          <div>
            <span className="text-[10px] font-mono text-[#86868B] block">{personaData.primaryMetricHeadline}</span>
            <span className="text-2xl font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">{personaData.primaryMetricValue}</span>
          </div>
          <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 font-mono">
            <TrendingUp className="w-4 h-4" /> Strategic Focus Active
          </span>
        </div>

        {/* Strategic KPIs Stream */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-wider block">
            Stratejik KPI Performans Göstergeleri
          </span>

          {personaData.kpiList.map((kpi) => (
            <div
              key={kpi.kpiKey}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl flex justify-between items-center text-xs font-mono border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{kpi.kpiName}</span>
                <span className="text-[10px] text-[#86868B]">Hedef: {kpi.targetDisplay}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#D4AF37] block">{kpi.valueDisplay}</span>
                <span className="text-[9px] text-emerald-500 font-bold">+{kpi.changePercent}% ({kpi.status})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WedyAI Executive Briefing & Forecast Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Yönetici Özeti & Stratejik Tavsiyeler
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Executive AI Active
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">✦ Yönetici Briefing Özeti</span>
            <p className="text-[#111111] dark:text-[#F5F4F0] leading-relaxed font-medium">
              {personaData.aiExecutiveBriefing}
            </p>
          </div>

          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-emerald-500 font-bold block">✦ Stratejik Aksiyon Tavsiyesi</span>
            <p className="text-[#111111] dark:text-[#F5F4F0] leading-relaxed font-medium">
              {personaData.aiStrategicRecommendation}
            </p>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex justify-between items-center">
            <span>{personaData.aiForecast12MonthCurve}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          </div>
        </div>

        {/* Board Report Export Action */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
          <button
            onClick={handleGenerateBoardReport}
            disabled={isProcessing}
            className="px-4 py-2 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Board Rapor Paketini Derle ({activeRole})</span>
              </>
            )}
          </button>

          <span className="font-mono text-[10px] text-[#86868B]">
            Son Sync: {new Date(personaData.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
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