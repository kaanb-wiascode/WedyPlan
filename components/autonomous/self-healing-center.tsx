"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, CheckCircle2, Zap, Activity, Cpu, Server, Globe, Radio, Check, AlertTriangle } from "lucide-react";
import { SelfHealingEngine, InfrastructureNodeHealth, SelfHealingIncidentRecord, SelfHealingPlatformSummary, InfrastructureRegion } from "@/lib/autonomous/self-healing-engine";

export const SelfHealingCenter: React.FC = () => {
  const [nodes, setNodes] = useState<InfrastructureNodeHealth[]>([]);
  const [incidents, setIncidents] = useState<SelfHealingIncidentRecord[]>([]);
  const [summary, setSummary] = useState<SelfHealingPlatformSummary | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<InfrastructureRegion | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    SelfHealingEngine.getNodeHealth().then(setNodes);
    SelfHealingEngine.getIncidents().then(setIncidents);
    SelfHealingEngine.getSummary().then(setSummary);
  }, []);

  const handleTriggerHealing = async (incidentId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await SelfHealingEngine.triggerAutonomousHealing(incidentId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' aksaklığı otonom self-healing motoru tarafından başarıyla giderildi!` });
        SelfHealingEngine.getIncidents().then(setIncidents);
        SelfHealingEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "İyileştirme işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredNodes = selectedRegion === "ALL"
    ? nodes
    : nodes.filter((n) => n.region === selectedRegion);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Self-Healing Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Otonom İyileştirme Merkezi (Self-Healing)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Healing Score: %{summary.overallSelfHealingScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Küresel altyapı düğümlerinde olası aksaklıkların tespiti, insan müdahalesine ihtiyaç duymadan sıfır kesintiyle otonom olarak iyileştirilmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Otonom Onarım</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalAutonomousRemediations24h} Onarım
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. İyileştirme Süresi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.meanTimeToRecoverySeconds} sn
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Müdahale</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.humanInterventionsPreventedCount} İnsan
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Healing Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı İyileştirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Self-Healing Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Zap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiHealingInsightNote}
          </p>
        </div>
      </div>

      {/* Region Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "EU_CENTRAL", "ME_CENTRAL", "US_EAST"] as (InfrastructureRegion | "ALL")[]).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRegion === reg
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {reg === "ALL" ? "Tüm Bölgeler" : reg.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Regional Infrastructure Nodes Grid */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Altyapı Düğümleri ({filteredNodes.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredNodes.map((node) => (
            <div
              key={node.nodeId}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{node.providerName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  %{node.healthScorePercent} Sağlık ({node.status})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-[#86868B] text-center bg-white dark:bg-black/40 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                <div>CPU: <strong className="text-[#111111] dark:text-[#F5F4F0]">%{node.cpuUtilizationPercent}</strong></div>
                <div>RAM: <strong className="text-[#111111] dark:text-[#F5F4F0]">%{node.memoryUtilizationPercent}</strong></div>
                <div>Latency: <strong className="text-emerald-500">{node.latencyMs} ms</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Healing Incidents Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#D4AF37]" />
          <span>Otonom İyileştirme Olay Kayıtları</span>
        </h4>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{inc.incidentType}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {inc.remediationStatus}
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] border border-black/5 dark:border-white/5">
                Tespit Edilen Anomali: <strong className="text-[#111111] dark:text-[#F5F4F0]">{inc.detectedMetricAnomaly}</strong>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ {inc.aiPredictiveHealingTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Müdahale: <strong className="text-[#D4AF37]">{inc.executedRemediation}</strong></span>
                <span>Çözüm Süresi: <strong className="text-emerald-500">{inc.recoveryTimeSeconds} sn</strong></span>
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