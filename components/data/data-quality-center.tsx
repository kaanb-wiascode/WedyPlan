"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, RefreshCw, Zap, Sparkles, AlertTriangle, Layers, Activity, Wrench, Search, Check } from "lucide-react";
import { DataQualityEngine, DataQualityDimensionScore, DataQualityIssueTicket, DataQualityPlatformSummary, DataQualityDimension } from "@/lib/data/data-quality-engine";

export const DataQualityCenter: React.FC = () => {
  const [dimensions, setDimensions] = useState<DataQualityDimensionScore[]>([]);
  const [issues, setIssues] = useState<DataQualityIssueTicket[]>([]);
  const [summary, setSummary] = useState<DataQualityPlatformSummary | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<DataQualityDimension | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataQualityEngine.getDimensionScores().then(setDimensions);
    DataQualityEngine.getIssues().then(setIssues);
    DataQualityEngine.getSummary().then(setSummary);
  }, []);

  const handleCleanse = async (issueId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataQualityEngine.executeCleansing(issueId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' kalite sorunu WedyAI Otonom Temizleme algoritmasıyla düzeltildi ve veri seti arındırıldı!` });
        DataQualityEngine.getIssues().then(setIssues);
        DataQualityEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Veri temizleme işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredIssues = selectedDimension === "ALL"
    ? issues
    : issues.filter((i) => i.dimension === selectedDimension);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Veri Kalite Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Quality: %{summary.overallDataQualityScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Data Lake, Data Warehouse ve MDM katmanlarında 7 kalite boyutunun (Completeness, Accuracy, Validity vb.) sürekli izlenmesi, kök neden analizi ve otonom temizlenmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Profillelen Veri Seti</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalProfiledDatasetsCount} Set
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Temizlenen Kayıt</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.autoCleansedRecords24hCount} Record
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Açık Kalite Bileti</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeQualityTicketsCount} Ticket
            </span>
          </div>
        </div>
      </div>

      {/* 7 Quality Dimensions Score Grid */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-wider block">
          7 Veri Kalite Boyutu Performansı
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {dimensions.map((dim) => (
            <div
              key={dim.dimension}
              className="p-2.5 bg-[#F5F4F0] dark:bg-black/20 rounded-xl flex justify-between items-center border border-black/5 dark:border-white/5"
            >
              <span className="text-[10px] font-bold text-[#111111] dark:text-[#F5F4F0]">{dim.dimension}</span>
              <span className="text-[10px] font-bold text-emerald-500">%{dim.scorePercent}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WedyAI Quality Prediction & Root Cause Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Kök Neden & Temizleme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Quality AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Search className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiQualityInsightNote}
          </p>
        </div>
      </div>

      {/* Dimension Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "VALIDITY", "UNIQUENESS", "COMPLETENESS", "ACCURACY", "TIMELINESS"] as (DataQualityDimension | "ALL")[]).map((dim) => (
          <button
            key={dim}
            onClick={() => setSelectedDimension(dim)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDimension === dim
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dim === "ALL" ? "Tüm Boyutlar" : dim}
          </button>
        ))}
      </div>

      {/* Quality Issues Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <span>Kalite Sorunu ve Bilet Kayıtları ({filteredIssues.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredIssues.map((iss) => (
            <div
              key={iss.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{iss.issueTitle}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  iss.status === "AUTO_CLEANSED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  iss.severity === "CRITICAL" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {iss.status} ({iss.severity})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Hedef Veri Seti: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{iss.targetDataset}</span></div>
                <div>Etkilenen Kayıt: <span className="font-bold text-[#D4AF37]">{iss.affectedRecordsCount} Kayıt</span></div>
                <div>Kalite Boyutu: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{iss.dimension}</span></div>
                <div>Tespit Zamanı: <span className="font-bold text-[#86868B]">{new Date(iss.detectedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] block">✦ WedyAI Kök Neden Analizi:</span>
                <p className="text-[#111111] dark:text-[#F5F4F0]">{iss.aiRootCauseAnalysis}</p>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ Önerilen Temizleme Aksiyonu: {iss.aiSuggestedCleansingAction}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {iss.status !== "AUTO_CLEANSED" ? (
                  <button
                    onClick={() => handleCleanse(iss.id, iss.issueTitle)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Wrench className="w-3 h-3 text-[#D4AF37]" />
                        <span>Otonom Veri Temizlemeyi Çalıştır</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Otonom Temizlendi (Auto-Cleansed)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  ID: {iss.id}
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