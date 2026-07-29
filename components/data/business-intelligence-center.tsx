"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, ShieldCheck, RefreshCw, CheckCircle2, Zap, Download, FileSpreadsheet, TrendingUp, Layers, PieChart, LineChart, FileText } from "lucide-react";
import { BusinessIntelligenceEngine, DepartmentalReportRecord, BusinessIntelligencePlatformSummary, DepartmentDashboardType, ReportExportFormat } from "@/lib/data/business-intelligence-engine";

export const BusinessIntelligenceCenter: React.FC = () => {
  const [reports, setReports] = useState<DepartmentalReportRecord[]>([]);
  const [summary, setSummary] = useState<BusinessIntelligencePlatformSummary | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDashboardType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    BusinessIntelligenceEngine.getReports().then(setReports);
    BusinessIntelligenceEngine.getSummary().then(setSummary);
  }, []);

  const handleExport = async (reportId: string, title: string, format: ReportExportFormat) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await BusinessIntelligenceEngine.exportReport(reportId, format);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' raporu (${format} biçiminde) başarıyla derlendi ve indirildi!` });
        BusinessIntelligenceEngine.getReports().then(setReports);
        BusinessIntelligenceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Rapor dışa aktarımı başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredReports = selectedDepartment === "ALL"
    ? reports
    : reports.filter((r) => r.department === selectedDepartment);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal İş Zekası Merkezi (BI)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Drill Query: {summary.averageDrillDownQueryTimeMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm departmanlar için self-service iş zekası panoları, derinlemesine (drill-down) analiz, otomatik zamanlanmış raporlama ve WedyAI anlatı özetleri.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Departman Panoları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeDepartmentDashboardsCount} Pano
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Rapor Sayısı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalActiveReportsCount} Rapor
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Aktarılan Fiş</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.totalScheduledExports24h} Export
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Trend & Narrative Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Trend & Anlatı (Narrative) Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            BI AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <LineChart className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiBiInsightNote}
          </p>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "EXECUTIVE", "FINANCE", "MARKETPLACE", "SALES", "MARKETING", "OPERATIONS", "CUSTOMER_SUCCESS"] as (DepartmentDashboardType | "ALL")[]).map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDepartment(dept)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDepartment === dept
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dept === "ALL" ? "Tüm Departmanlar" : dept.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Reports Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>Departman BI Raporları ({filteredReports.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredReports.map((rep) => (
            <div
              key={rep.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{rep.reportTitle}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {rep.department} ({rep.scheduledFrequency})
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 flex justify-between items-center font-mono">
                <div>
                  <span className="text-[9px] text-[#86868B] block">Ana Performans Metriği</span>
                  <strong className="text-sm text-[#111111] dark:text-[#F5F4F0]">{rep.primaryMetricHeadline}</strong>
                </div>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +%{rep.metricGrowthPercent}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] leading-relaxed font-medium">
                  ✦ WedyAI Anlatı Özeti: {rep.aiGeneratedNarrativeSummary}
                </p>
                <p className="text-[10px] text-[#86868B]">
                  ✦ Trend Öngörüsü: {rep.aiTrendForecastNote}
                </p>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleExport(rep.id, rep.reportTitle, "PDF")}
                    disabled={isProcessing}
                    className="px-3 py-1 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    <Download className="w-3 h-3 text-[#D4AF37]" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport(rep.id, rep.reportTitle, "XLSX")}
                    disabled={isProcessing}
                    className="px-3 py-1 bg-white dark:bg-black/40 text-[#111111] dark:text-[#F5F4F0] border border-black/10 dark:border-white/10 text-[10px] font-bold rounded-xl hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3 h-3 text-emerald-500" />
                    <span>Excel</span>
                  </button>
                </div>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Üretim: {new Date(rep.lastGeneratedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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