"use client";

import React, { useState, useEffect } from "react";
import { Database, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Server, Lock, Cpu, Table, FileCode } from "lucide-react";
import { DataIntelligenceEngine, DataDomainRecord, MlFeatureStoreRecord, DataIntelligencePlatformSummary, DataPlatformDomain } from "@/lib/data/data-intelligence-engine";

export const DataDomainMap: React.FC = () => {
  const [domains, setDomains] = useState<DataDomainRecord[]>([]);
  const [mlFeatures, setMlFeatures] = useState<MlFeatureStoreRecord[]>([]);
  const [summary, setSummary] = useState<DataIntelligencePlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DataPlatformDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataIntelligenceEngine.getDomains().then(setDomains);
    DataIntelligenceEngine.getMlFeatures().then(setMlFeatures);
    DataIntelligenceEngine.getSummary().then(setSummary);
  }, []);

  const handleRefreshDomain = async (domainId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataIntelligenceEngine.refreshPipeline(domainId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' veri etki alanı hattı başarıyla yenilendi ve SSOT haritasıyla eşitlendi!` });
        DataIntelligenceEngine.getDomains().then(setDomains);
        DataIntelligenceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Veri hattı yenileme başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredDomains = selectedDomain === "ALL"
    ? domains
    : domains.filter((d) => d.domainType === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Enterprise Data Domain Map & SSOT
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Governance: %{summary.overallDataGovernanceScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          WedyPlan platform verilerinin Tekil Doğruluk Kaynağı (Single Source of Truth) mimarisinde Data Lake, Data Warehouse ve ML Feature Store katmanlarında haritalanması.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Veri Hacmi</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalIngestedDataTerabytes} TB
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Günlük Olay Akışı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalDailyPipelineEvents / 1000000).toFixed(2)}M Event
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Sorgu Gecikmesi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageQueryLatencyMs} ms
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Data Governance Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Veri Yönetişimi Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            SSOT Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDataPlatformInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "DATA_WAREHOUSE", "DATA_LAKE", "ML_FEATURE_STORE", "STREAMING"] as (DataPlatformDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Etki Alanları" : dom.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Domains Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Table className="w-5 h-5 text-[#D4AF37]" />
          <span>Veri Etki Alanı Haritası ({filteredDomains.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredDomains.map((dom) => (
            <div
              key={dom.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{dom.domainName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {dom.domainType} ({dom.pipelineStatus})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Kaynak Faz: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{dom.sourcePhaseRef}</span></div>
                <div>Hacim: <span className="font-bold text-[#D4AF37]">{dom.dataVolumeGigabytes} GB</span></div>
                <div>24s Kayıt: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(dom.totalRecordsIngested24h / 1000).toFixed(0)}K Record</span></div>
                <div>Sorgu Latency: <span className="font-bold text-emerald-500">{dom.queryLatencyMs} ms</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] flex justify-between items-center border border-black/5 dark:border-white/5">
                <span>PII Maskeleme: <strong className="text-emerald-500">{dom.piiMaskingEnabled ? "GDPR/KVKK Aktif" : "Yok"}</strong></span>
                <span>SSOT Durumu: <strong className="text-[#D4AF37]">Doğrulandı</strong></span>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Yönetişim: {dom.aiGovernanceNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleRefreshDomain(dom.id, dom.domainName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <RefreshCw className="w-3 h-3 text-[#D4AF37]" />
                      <span>Veri Hattını Yenile</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Sync: {new Date(dom.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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

      {/* ML Feature Store Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#D4AF37]" />
          <span>ML Feature Store Kayıtları</span>
        </h4>

        <div className="space-y-2">
          {mlFeatures.map((ft) => (
            <div
              key={ft.featureId}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl text-xs flex justify-between items-center font-mono border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{ft.featureName}</span>
                <span className="text-[10px] text-[#86868B]">Entity: {ft.entityType} ({ft.dataType})</span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                Tazelik: {ft.featureFreshnessMinutes} dk
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};