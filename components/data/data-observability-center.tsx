"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, RefreshCw, CheckCircle2, Zap, AlertTriangle, Eye, GitBranch, Cpu, Clock, Wrench } from "lucide-react";
import { DataObservabilityEngine, DataPipelineObservabilityRecord, ObservabilityIncidentLog, DataObservabilityPlatformSummary, PipelineJobType } from "@/lib/data/data-observability-engine";

export const DataObservabilityCenter: React.FC = () => {
  const [pipelines, setPipelines] = useState<DataPipelineObservabilityRecord[]>([]);
  const [incidents, setIncidents] = useState<ObservabilityIncidentLog[]>([]);
  const [summary, setSummary] = useState<DataObservabilityPlatformSummary | null>(null);
  const [selectedType, setSelectedType] = useState<PipelineJobType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataObservabilityEngine.getPipelines().then(setPipelines);
    DataObservabilityEngine.getIncidents().then(setIncidents);
    DataObservabilityEngine.getSummary().then(setSummary);
  }, []);

  const handleOptimize = async (pipelineId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataObservabilityEngine.optimizePipeline(pipelineId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' boru hattı WedyAI Otonom Optimizasyonu ile güncellendi ve SLA seviyesine çekildi!` });
        DataObservabilityEngine.getPipelines().then(setPipelines);
        DataObservabilityEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Boru hattı optimizasyonu başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredPipelines = selectedType === "ALL"
    ? pipelines
    : pipelines.filter((p) => p.jobType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Veri Gözlemlenebilirlik Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> SLA: %{summary.slaCompliancePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          ETL, CDC streaming ve veri ambarı yüklemelerinin tam şeffaflıkla izlenmesi, Schema Drift tespiti, SLA takibi ve WedyAI tahminsel arıza önleme.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İzlenen Boru Hattı</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalMonitoredPipelinesCount} Pipeline
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Arıza</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.aiPredictedFailuresPrevented24hCount} Arıza
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Schema Drift Uyarısı</span>
            <span className="font-mono font-bold text-amber-400 text-base">
              {summary.schemaDriftAlerts24hCount} Drift
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Arıza Tahmin & Kök Neden Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Observability AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiObservabilityInsightNote}
          </p>
        </div>
      </div>

      {/* Job Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "WAREHOUSE_LOAD", "STREAMING_CDC", "ETL_BATCH", "SCHEMA_SYNC"] as (PipelineJobType | "ALL")[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === type
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {type === "ALL" ? "Tüm İşler" : type.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Pipelines Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-[#D4AF37]" />
          <span>İzlenen Veri Boru Hatları ({filteredPipelines.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredPipelines.map((pipe) => (
            <div
              key={pipe.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="font-mono text-[11px]">{pipe.pipelineName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  pipe.status === "HEALTHY" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  pipe.status === "SLA_BREACH_WARNING" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {pipe.status} ({pipe.jobType})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Akış Hızı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{pipe.throughputRecordsPerSec} rec/s</span></div>
                <div>Tazelik: <span className="font-bold text-emerald-500">{pipe.freshnessMinutes} dk (Target: {pipe.slaTargetMinutes} dk)</span></div>
                <div>Schema Drift: <span className="font-bold text-amber-500">{pipe.schemaDriftDetected ? "Uyarılı" : "Yok"}</span></div>
                <div>Arıza Olasılığı: <span className="font-bold text-emerald-500">%{pipe.aiFailurePredictionPercent}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] block">✦ WedyAI Teşhis & Kök Neden:</span>
                <p className="text-[#111111] dark:text-[#F5F4F0]">{pipe.aiRootCauseAnalysis}</p>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ Önerilen Optimizasyon: {pipe.aiOptimizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {pipe.status !== "HEALTHY" || pipe.schemaDriftDetected ? (
                  <button
                    onClick={() => handleOptimize(pipe.id, pipe.pipelineName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Wrench className="w-3 h-3 text-[#D4AF37]" />
                        <span>Boru Hattını Otonom Optimize Et</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Boru Hattı Stabil (Optimal)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Çalışma: {new Date(pipe.lastExecutionAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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