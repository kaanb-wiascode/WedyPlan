"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, ShieldCheck, RefreshCw, CheckCircle2, Zap, Database, Server, Layers, ArrowUpRight, PieChart, LineChart } from "lucide-react";
import { BiConnectorEngine, BiDatasetExportRecord, BiPlatformSummary, BiConnectorTarget } from "@/lib/integration/bi-connector-engine";

export const BiConnectorCenter: React.FC = () => {
  const [datasets, setDatasets] = useState<BiDatasetExportRecord[]>([]);
  const [summary, setSummary] = useState<BiPlatformSummary | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<BiConnectorTarget | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    BiConnectorEngine.getDatasets().then(setDatasets);
    BiConnectorEngine.getSummary().then(setSummary);
  }, []);

  const handleRefreshDataset = async (datasetId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await BiConnectorEngine.triggerDatasetRefresh(datasetId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' BI veri seti başarıyla yenilendi ve dış panolara aktarıldı!` });
        BiConnectorEngine.getDatasets().then(setDatasets);
        BiConnectorEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Veri seti yenileme başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredDatasets = selectedTarget === "ALL"
    ? datasets
    : datasets.filter((d) => d.targetPlatform === selectedTarget);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive BI Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Business Intelligence (BI) Connector Platform
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Data Quality: %{summary.averageDataQualityIndexPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Power BI, Tableau, Looker ve Snowflake sistemlerine WedyPlan GMV, Escrow defterleri ve pazaryeri analitiğinin güvenli ve zamanlanmış aktarımı.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Aktarılan Satır</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalExportedRows24h / 1000000).toFixed(2)}M Row
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif BI Bağlantıları</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeBiConnectionsCount} Target
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Veri Kalitesi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageDataQualityIndexPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Data Quality & Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Veri Kalite & İçgörü Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Data Quality Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <LineChart className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiBiInsightNote}
          </p>
        </div>
      </div>

      {/* Target BI Platform Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "POWER_BI", "TABLEAU", "LOOKER", "SNOWFLAKE"] as (BiConnectorTarget | "ALL")[]).map((tgt) => (
          <button
            key={tgt}
            onClick={() => setSelectedTarget(tgt)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedTarget === tgt
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {tgt === "ALL" ? "Tüm BI Hedefleri" : tgt.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Datasets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Database className="w-5 h-5 text-[#D4AF37]" />
          <span>BI Veri Seti Aktarım Kayıtları ({filteredDatasets.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredDatasets.map((ds) => (
            <div
              key={ds.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ds.datasetName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {ds.targetPlatform} ({ds.domain})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Yenileme Sıklığı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{ds.refreshFrequencyHours} saatte 1</span></div>
                <div>Toplam Satır: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{ds.totalRowsExported.toLocaleString()} Row</span></div>
                <div>Veri Kalitesi: <span className="font-bold text-emerald-500">%{ds.dataQualityScorePercent}</span></div>
                <div>Durum: <span className="font-bold text-emerald-500">{ds.status}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] truncate border border-black/5 dark:border-white/5">
                Endpoint: {ds.connectionEndpointUrl}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI İçgörüsü: {ds.aiInsightRecommendation}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleRefreshDataset(ds.id, ds.datasetName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <RefreshCw className="w-3 h-3 text-[#D4AF37]" />
                      <span>BI Veri Setini Şimdi Yenile</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Yenileme: {new Date(ds.lastRefreshedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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