"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, RefreshCw, CheckCircle2, Zap, AlertTriangle, Layers, Server, Clock, Search, Terminal, ArrowRightLeft, Radio } from "lucide-react";
import { IntegrationMonitoringEngine, IntegrationTraceRecord, IntegrationIncidentRecord, MonitoringControlPlaneSummary } from "@/lib/integration/integration-monitoring-engine";

export const IntegrationOperationsDashboard: React.FC = () => {
  const [traces, setTraces] = useState<IntegrationTraceRecord[]>([]);
  const [incidents, setIncidents] = useState<IntegrationIncidentRecord[]>([]);
  const [summary, setSummary] = useState<MonitoringControlPlaneSummary | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    IntegrationMonitoringEngine.getTraces().then(setTraces);
    IntegrationMonitoringEngine.getIncidents().then(setIncidents);
    IntegrationMonitoringEngine.getSummary().then(setSummary);
  }, []);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const refreshedTraces = await IntegrationMonitoringEngine.getTraces();
      const refreshedIncidents = await IntegrationMonitoringEngine.getIncidents();
      const refreshedSummary = await IntegrationMonitoringEngine.getSummary();
      setTraces(refreshedTraces);
      setIncidents(refreshedIncidents);
      setSummary(refreshedSummary);
      setIsRefreshing(false);
    }, 400);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Monitoring Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Integration Operations Dashboard
            </h3>
          </div>
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm harici ve dahili entegrasyonların (API Gateway, Connectors, Event Bus, Webhooks) tekil kontrol düzleminde canlı izlenmesi, dağıtık izleme (tracing) ve Kök Neden Analizi.
        </p>

        {/* Master Health & Availability Metric */}
        <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono text-[#86868B] uppercase tracking-wider block">
              Integration Health Score
            </span>
            <span className="font-mono text-3xl font-bold text-white flex items-center gap-2">
              %{summary.overallIntegrationHealthScorePercent}
              <span className="text-xs font-sans font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Uptime: %{summary.overallAvailabilityPercent}
              </span>
            </span>
          </div>

          <div className="text-right font-mono text-xs space-y-0.5">
            <span className="text-[#D4AF37] block font-bold">{summary.averageResponseLatencyMs} ms Latency</span>
            <span className="text-emerald-400 block">{summary.activeIncidentsCount} Aktif Incident</span>
          </div>
        </div>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Yakalanan Trace</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalTracesCaptured24h / 1000).toFixed(1)}K Trace
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Erişilebilirlik</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{summary.overallAvailabilityPercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Sağlık Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.overallIntegrationHealthScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Monitoring & Predictive Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Tahminsel İzleme & Kök Neden Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Control Plane Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMonitoringInsightNote}
          </p>
        </div>
      </div>

      {/* Distributed Traces Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#D4AF37]" />
          <span>Canlı Dağıtık İzleme Kayıtları (Distributed Traces)</span>
        </h4>

        <div className="space-y-3">
          {traces.map((tr) => (
            <div
              key={tr.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5 font-mono"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{tr.targetEndpoint}</span>
                <span className={`text-[9px] px-2.5 py-0.5 rounded-full ${
                  tr.httpStatus === 200
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  HTTP {tr.httpStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#86868B]">
                <div>Trace ID: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{tr.correlationId}</span></div>
                <div>Kaynak Servis: <span className="font-bold text-[#D4AF37]">{tr.serviceOrigin}</span></div>
                <div>Gecikme (Latency): <span className="font-bold text-emerald-500">{tr.latencyMs} ms</span></div>
                <div>Zaman: {new Date(tr.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
              </div>

              {tr.hasError && (
                <div className="p-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-[10px]">
                  ⚠ Hata: {tr.errorMessage}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Incident Timeline Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#D4AF37]" />
          <span>Olay Zaman Çizelgesi (Incident Timeline)</span>
        </h4>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{inc.incidentTitle}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {inc.status}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                ✦ WedyAI Kök Neden Tespiti: {inc.aiRootCauseAnalysis}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Sistem: <strong className="text-[#111111] dark:text-[#F5F4F0]">{inc.affectedSystemName}</strong></span>
                <span>Çözüm Zamanı: {inc.resolvedAt ? new Date(inc.resolvedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Devam Ediyor"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};