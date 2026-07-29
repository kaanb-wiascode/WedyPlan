"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeftRight, ShieldCheck, RefreshCw, CheckCircle2, Zap, FileCode, FileSpreadsheet, Lock, Download, Upload, Layers, Check } from "lucide-react";
import { DataExchangeEngine, DataExchangeJobRecord, DataExchangePlatformSummary, DataExchangeFormat } from "@/lib/integration/data-exchange-engine";

export const DataExchangeCenter: React.FC = () => {
  const [jobs, setJobs] = useState<DataExchangeJobRecord[]>([]);
  const [summary, setSummary] = useState<DataExchangePlatformSummary | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<DataExchangeFormat | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataExchangeEngine.getJobs().then(setJobs);
    DataExchangeEngine.getSummary().then(setSummary);
  }, []);

  const handleRunJob = async (jobId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataExchangeEngine.triggerExchangeJob(jobId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' veri değişim görevi çalıştırıldı ve başarıyla tamamlandı!` });
        DataExchangeEngine.getJobs().then(setJobs);
        DataExchangeEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Veri aktarım görevi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredJobs = selectedFormat === "ALL"
    ? jobs
    : jobs.filter((j) => j.format === selectedFormat);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Data Exchange Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Veri Değişim Merkezi (Data Exchange)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Schema Mapping: %{summary.averageSchemaMappingAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          JSON, CSV, XML ve Excel biçimlerinde güvenli yapılandırılmış iş verisi içe/dışa aktarımı, AES-256 şifreleme ve WedyAI akıllı şema haritalama.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Aktarılan Veri</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalExchangedVolumeMb24h / 1000).toFixed(2)} GB
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">İşlenen Kayıt</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalProcessedRecords24h / 1000).toFixed(1)}K Record
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Zamanlanmış İşler</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeScheduledJobsCount} Job
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Schema Mapping & Validation Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Şema Haritalama Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Schema AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <FileCode className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDataExchangeInsightNote}
          </p>
        </div>
      </div>

      {/* Format Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "JSON", "EXCEL_XLSX", "CSV", "XML"] as (DataExchangeFormat | "ALL")[]).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedFormat === fmt
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {fmt === "ALL" ? "Tüm Biçimler" : fmt.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Jobs Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
          <span>Veri Değişim Görevleri ({filteredJobs.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="flex items-center gap-1.5">
                  {job.direction === "IMPORT" ? (
                    <Upload className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Download className="w-4 h-4 text-blue-500" />
                  )}
                  <span>{job.jobTitle}</span>
                </span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {job.format} ({job.status})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Yön: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{job.direction}</span></div>
                <div>Boyut: <span className="font-bold text-[#D4AF37]">{job.fileSizeBytesMb} MB</span></div>
                <div>İşlenen Kayıt: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{job.recordsProcessedCount.toLocaleString()} Record</span></div>
                <div>Şema Doğruluğu: <span className="font-bold text-emerald-500">%{job.aiSchemaMappingAccuracyPercent}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] flex justify-between items-center border border-black/5 dark:border-white/5">
                <span>Şifreleme: <strong className="text-emerald-500">{job.isEncrypted ? "AES-256 Aktif" : "Yok"}</strong></span>
                <span>Sıkıştırma: <strong className="text-[#D4AF37]">{job.isCompressed ? "GZIP Aktif" : "Yok"}</strong></span>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Doğrulama: {job.aiValidationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleRunJob(job.id, job.jobTitle)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <ArrowLeftRight className="w-3 h-3 text-[#D4AF37]" />
                      <span>Veri Değişimini Şimdi Çalıştır</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Yürütme: {new Date(job.executedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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