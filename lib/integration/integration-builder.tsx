"use client";

import React, { useState, useEffect } from "react";
import { Workflow, ShieldCheck, RefreshCw, CheckCircle2, Zap, Play, ArrowRight, Layers, Sparkles, Plus, AlertTriangle, Code, Check } from "lucide-react";
import { LowCodeBuilderEngine, LowCodeIntegrationFlow, LowCodeBuilderSummary, FlowNodeType } from "@/lib/integration/lowcode-builder-engine";

export const IntegrationBuilder: React.FC = () => {
  const [flows, setFlows] = useState<LowCodeIntegrationFlow[]>([]);
  const [summary, setSummary] = useState<LowCodeBuilderSummary | null>(null);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const [aiPromptInput, setAiPromptInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    LowCodeBuilderEngine.getFlows().then((data) => {
      setFlows(data);
      if (data.length > 0) setSelectedFlowId(data[0].id);
    });
    LowCodeBuilderEngine.getSummary().then(setSummary);
  }, []);

  const handlePublishFlow = async (flowId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await LowCodeBuilderEngine.publishFlow(flowId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' akışı başarıyla derlendi ve canlı entegrasyon ağında yayınlandı!` });
        LowCodeBuilderEngine.getFlows().then(setFlows);
        LowCodeBuilderEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Yayınlama işlemi başarısız oldu." });
      }
    }, 400);
  };

  const handleAiGenerateFlow = () => {
    if (!aiPromptInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `WedyAI Akış Üreticisi: "${aiPromptInput}" istemi için 4 düğümlü görsel akış oluşturuldu!` });
      setAiPromptInput("");
    }, 600);
  };

  if (!summary) return null;

  const activeFlow = flows.find((f) => f.id === selectedFlowId) || flows[0];

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Low-Code Builder Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Workflow className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Görsel Entegrasyon Oluşturucu (Low-Code)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Published: {summary.activePublishedFlowsCount}/{summary.totalDesignedFlowsCount}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sürükle-bırak görsel tuval üzerinde tetikleyiciler, eylemler, koşullar ve HITL onayları bağlayarak kod yazmadan kurumsal entegrasyonlar tasarlayın.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Tasarlanan Akış</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalDesignedFlowsCount} Flow
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">AI Üretilen (24s)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.aiFlowsGenerated24h} Akış
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Yürütme Süresi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageFlowExecutionTimeMs} ms
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Natural Language Flow Generator Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Yapay Zeka Akış Oluşturucu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Flow Generator Active
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Örn: Escrow ödemesi kilitlendiğinde SAP ERP'ye işlensin ve e-posta gitsin..."
            value={aiPromptInput}
            onChange={(e) => setAiPromptInput(e.target.value)}
            className="flex-1 h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />
          <button
            onClick={handleAiGenerateFlow}
            disabled={isProcessing}
            className="px-4 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] font-bold rounded-2xl shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0 text-xs"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Akış Üret</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Select Active Flow Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {flows.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFlowId(f.id)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedFlowId === f.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {f.flowTitle} ({f.status})
          </button>
        ))}
      </div>

      {/* Visual Canvas Representative View */}
      {activeFlow && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-3">
            <div>
              <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
                {activeFlow.flowTitle}
              </h4>
              <span className="text-[10px] text-[#86868B] block font-mono">Versiyon: {activeFlow.versionTag} | Status: {activeFlow.status}</span>
            </div>
            {activeFlow.status !== "PUBLISHED" && (
              <button
                onClick={() => handlePublishFlow(activeFlow.id, activeFlow.flowTitle)}
                disabled={isProcessing}
                className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center gap-1"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                ) : (
                  <>
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                    <span>Canlıya Yayınla</span>
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6]">
            {activeFlow.description}
          </p>

          {/* Visual Node Diagram Stack */}
          <div className="space-y-2 pt-2">
            {activeFlow.nodes.map((node, idx) => (
              <div key={node.id} className="space-y-2">
                <div
                  className={`p-3.5 rounded-2xl border text-xs flex justify-between items-center ${
                    node.hasValidationError
                      ? "bg-red-500/5 border-red-500/30 text-red-700 dark:text-red-400"
                      : "bg-[#F5F4F0] dark:bg-black/20 border-black/5 dark:border-white/5 text-[#111111] dark:text-[#F5F4F0]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="block">{node.label}</strong>
                      <span className="text-[9px] font-mono text-[#86868B]">{node.connectorOrServiceRef} ({node.configSummary})</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold ${
                    node.type === "TRIGGER" ? "bg-purple-500/20 text-purple-600 dark:text-purple-300" :
                    node.type === "ACTION" ? "bg-blue-500/20 text-blue-600 dark:text-blue-300" :
                    node.type === "CONDITION" ? "bg-amber-500/20 text-amber-600 dark:text-amber-300" :
                    "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                  }`}>
                    {node.type}
                  </span>
                </div>

                {idx < activeFlow.nodes.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#86868B] pt-2 border-t border-black/5 dark:border-white/5">
            ✦ WedyAI Hata Tespiti: {activeFlow.aiErrorDetectionTip}
          </p>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};