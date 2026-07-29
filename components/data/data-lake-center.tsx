"use client";

import React, { useState, useEffect } from "react";
import { Database, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Server, Lock, ArrowUpRight, FolderTree, FileCode, Check } from "lucide-react";
import { DataLakeEngine, DataLakeDatasetRecord, DataLakeSummary, DataLakeZone } from "@/lib/data/data-lake-engine";

export const DataLakeCenter: React.FC = () => {
  const [datasets, setDatasets] = useState<DataLakeDatasetRecord[]>([]);
  const [summary, setSummary] = useState<DataLakeSummary | null>(null);
  const [selectedZone, setSelectedZone] = useState<DataLakeZone | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataLakeEngine.getDatasets().then(setDatasets);
    DataLakeEngine.getSummary().then(setSummary);
  }, []);

  const handlePromoteDataset = async (datasetId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataLakeEngine.promoteDataset(datasetId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' veri seti başarıyla bir üst katmana (Silver/Gold) yükseltildi ve işlendi!` });
        DataLakeEngine.getDatasets().then(setDatasets);
        DataLakeEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Katman yükseltme başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredDatasets = selectedZone === "ALL"
    ? datasets
    : datasets.filter((d) => d.zone === selectedZone);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Data Lake Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Classification: %{summary.aiClassificationAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Bronze (Raw), Silver (Processed) ve Gold (Curated) bölgelerinde yapılandırılmış ve yapılandırılmamış tüm kurumsal verilerin merkezi deposu.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Data Lake</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalStoredVolumeTerabytes} TB
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Bronze / Silver / Gold</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              3 Katman
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Veri Seti</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.totalActiveDatasetsCount} Dataset
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Şema Keşif & Katman Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Data Lake Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <FileCode className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDataLakeInsightNote}
          </p>
        </div>
      </div>

      {/* Zone Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "RAW_BRONZE", "PROCESSED_SILVER", "CURATED_GOLD"] as (DataLakeZone | "ALL")[]).map((zone) => (
          <button
            key={zone}
            onClick={() => setSelectedZone(zone)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedZone === zone
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {zone === "ALL" ? "Tüm Bölgeler" : zone.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Datasets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Kataloğa Alınan Veri Setleri ({filteredDatasets.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredDatasets.map((ds) => (
            <div
              key={ds.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ds.datasetName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  ds.zone === "CURATED_GOLD" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  ds.zone === "PROCESSED_SILVER" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                  "bg-stone-500/10 text-stone-600 dark:text-stone-400"
                }`}>
                  {ds.zone} ({ds.storageFormat})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Kaynak Türü: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{ds.sourceType}</span></div>
                <div>Boyut: <span className="font-bold text-[#D4AF37]">{ds.sizeMegabytes} MB</span></div>
                <div>Kayıt Sayısı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(ds.recordCount / 1000).toFixed(0)}K Record</span></div>
                <div>Kalite Skoru: <span className="font-bold text-emerald-500">%{ds.dataQualityScorePercent}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] flex justify-between items-center border border-black/5 dark:border-white/5">
                <span>Sınıflandırma: <strong className="text-emerald-500">{ds.classificationTag}</strong></span>
                <span>Format: <strong className="text-[#D4AF37]">{ds.storageFormat}</strong></span>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Keşif: {ds.aiSchemaDiscoveryNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {ds.zone !== "CURATED_GOLD" ? (
                  <button
                    onClick={() => handlePromoteDataset(ds.id, ds.datasetName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                        <span>Üst Katmana İşle & Yükselt</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> En Yüksek Katman (Gold Tier Active)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Aktarım: {new Date(ds.lastIngestedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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