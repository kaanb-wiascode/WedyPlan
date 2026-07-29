"use client";

import React, { useState, useEffect } from "react";
import { FileBarChart, Sparkles, Download, ShieldCheck, CheckCircle2, Plus, RefreshCw, Layers, FileSpreadsheet, FileText, Calendar, TrendingUp } from "lucide-react";
import { ReportingEngine, FinancialReportDocument, ReportingSummaryStats, FinancialReportType, ExportFormatType } from "@/lib/fintech/reporting-engine";

export const FinancialReportingCenter: React.FC = () => {
  const [reports, setReports] = useState<FinancialReportDocument[]>([]);
  const [stats, setStats] = useState<ReportingSummaryStats | null>(null);
  const [selectedType, setSelectedType] = useState<FinancialReportType | "ALL">("ALL");
  const [selectedReport, setSelectedReport] = useState<FinancialReportDocument | null>(null);

  // Form State
  const [titleInput, setTitleInput] = useState("");
  const [typeInput, setTypeInput] = useState<FinancialReportType>("REVENUE");
  const [formatInput, setFormatInput] = useState<ExportFormatType>("PDF");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ReportingEngine.getReports().then((data) => {
      setReports(data);
      if (data.length > 0) setSelectedReport(data[0]);
    });
    ReportingEngine.getSummaryStats().then(setStats);
  }, []);

  const handleGenerate = async () => {
    if (!titleInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const newDoc = await ReportingEngine.generateReportOnDemand(
        titleInput,
        typeInput,
        formatInput
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `Rapor '${newDoc.reportTitle}' başarıyla derlendi ve hazırlandı!` });
      setTitleInput("");
      ReportingEngine.getReports().then((data) => {
        setReports(data);
        setSelectedReport(newDoc);
      });
      ReportingEngine.getSummaryStats().then(setStats);
    }, 600);
  };

  if (!stats || !selectedReport) return null;

  const filteredReports = selectedType === "ALL"
    ? reports
    : reports.filter((r) => r.reportType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Reporting Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Finansal Raporlama Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Board Ready
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          C-Suite yönetim kurulu finansal raporları, otomatik zamanlanmış derlemeler, PDF / Excel dışa aktarım ve WedyAI yönetici özetleri.
        </p>

        {/* Executive Reporting Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Derlenen Raporlar</span>
            <span className="font-mono font-bold text-white text-base">
              {stats.totalGeneratedReportsCount} Adet
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Zamanlanmış Görevler</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {stats.activeScheduledReportsCount} Aktif
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ana Para Birimi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {stats.primaryCurrency}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Executive Summary & Trend Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Yönetici Özeti & Trend Tespiti
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Rapor: {selectedReport.reportType}</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {selectedReport.aiExecutiveSummary}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
              Trend Analizi: {selectedReport.aiDetectedTrendNote}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Report Details & Export Buttons */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedReport.reportTitle}
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Sıklık: {selectedReport.cadence} • Tarih: {new Date(selectedReport.generatedAt).toLocaleDateString()}
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
            ₺{selectedReport.totalVolumeAmount.toLocaleString()} {selectedReport.currency}
          </span>
        </div>

        {/* Action Buttons: PDF & Excel Download */}
        <div className="pt-1 flex gap-2">
          <a
            href={selectedReport.pdfDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>PDF Rapor İndir</span>
          </a>
          <a
            href={selectedReport.excelDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-11 bg-[#F5F4F0] dark:bg-black/20 text-[#111111] dark:text-[#F5F4F0] border border-black/10 dark:border-white/10 text-xs font-semibold rounded-2xl hover:bg-black/5 transition-all flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>Excel (.xlsx) İndir</span>
          </a>
        </div>
      </div>

      {/* Generate On-Demand Report Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <span>Anlık Yeni Finansal Rapor Derle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Rapor Başlığı (Örn: 2026 Temmuz Ayı P&L Tablosu)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value as FinancialReportType)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {(["REVENUE", "EXPENSE", "SUBSCRIPTION", "ESCROW", "VENDOR", "MARKETPLACE_GMV"] as FinancialReportType[]).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={formatInput}
              onChange={(e) => setFormatInput(e.target.value as ExportFormatType)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {(["PDF", "EXCEL", "REST_API"] as ExportFormatType[]).map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!titleInput.trim() || isProcessing}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <FileBarChart className="w-4 h-4 text-[#D4AF37]" />
                <span>Raporu Derle & Hazırla</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reports List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Hazır Finansal Rapor Kütüğü ({reports.length})
        </h4>

        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedReport(r)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedReport.id === r.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{r.reportTitle}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {r.reportType}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Format: {r.exportFormat}</span>
                <span>Hacim: ₺{r.totalVolumeAmount.toLocaleString()} TRY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};