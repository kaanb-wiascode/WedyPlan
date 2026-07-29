"use client";

import React, { useState, useEffect } from "react";
import { Workflow, ShieldCheck, RefreshCw, CheckCircle2, Zap, Play, Check, Clock, AlertTriangle, Layers, Server, ArrowRight } from "lucide-react";
import { WorkflowOrchestrationEngine, OrchestratedWorkflowRecord, WorkflowOrchestrationSummary, WorkflowExecutionState } from "@/lib/integration/workflow-orchestration-engine";

export const WorkflowCenter: React.FC = () => {
  const [workflows, setWorkflows] = useState<OrchestratedWorkflowRecord[]>([]);
  const [summary, setSummary] = useState<WorkflowOrchestrationSummary | null>(null);
  const [selectedState, setSelectedState] = useState<WorkflowExecutionState | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    WorkflowOrchestrationEngine.getWorkflows().then(setWorkflows);
    WorkflowOrchestrationEngine.getSummary().then(setSummary);
  }, []);

  const handleApproveStep = async (workflowId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await WorkflowOrchestrationEngine.approveWorkflowStep(workflowId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' iş akışındaki HITL insan onayı verildi. Adım başarıyla devam ettirildi!` });
        WorkflowOrchestrationEngine.getWorkflows().then(setWorkflows);
        WorkflowOrchestrationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Onay işlemi gerçekleştirilemedi." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredWorkflows = selectedState === "ALL"
    ? workflows
    : workflows.filter((w) => w.currentState === selectedState);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Workflow Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Workflow className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal İş Akışı Orkestrasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Avg Time: {summary.averageOrchestrationTimeSec}s
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Dahili mikroservisler ve harici sistemler (Opera PMS, SAP ERP, Salesforce) arasında çok adımlı iş akışlarının, HITL onay kapılarının ve SLA tırmandırmalarının koordinasyonu.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif İş Akışları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveWorkflowsCount} Akış
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Tamamlanan (24s)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.dailyCompletedWorkflowsCount / 1000).toFixed(1)}K
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Önlenen Tırmandırma</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.automatedEscalationsPreventedCount} SLA
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Workflow Optimization Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Orkestrasyon Optimize Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Orchestrator Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Zap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiOrchestrationInsightNote}
          </p>
        </div>
      </div>

      {/* State Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "RUNNING", "WAITING_APPROVAL", "COMPLETED", "ESCALATED"] as (WorkflowExecutionState | "ALL")[]).map((st) => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedState === st
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {st === "ALL" ? "Tüm Akışlar" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Workflows Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Yürütülen İş Akışları ({filteredWorkflows.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredWorkflows.map((wf) => (
            <div
              key={wf.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{wf.workflowName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  wf.currentState === "COMPLETED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : wf.currentState === "WAITING_APPROVAL"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {wf.currentState} ({wf.completedStepsCount}/{wf.totalStepsCount} Adım)
                </span>
              </div>

              {/* Steps Execution List */}
              <div className="space-y-1.5 pt-1">
                {wf.steps.map((step, idx) => (
                  <div
                    key={step.stepId}
                    className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono"
                  >
                    <span className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F4F0]">
                      <span className="w-4 h-4 bg-[#111111] text-white rounded-full flex items-center justify-center text-[8px]">
                        {idx + 1}
                      </span>
                      <span>{step.stepName}</span>
                    </span>
                    <span className="text-[#86868B]">
                      {step.status === "SUCCESS" ? (
                        <strong className="text-emerald-500">{step.executionTimeMs}ms</strong>
                      ) : (
                        <strong className="text-amber-500">PENDING</strong>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Orkestrasyon İpucu: {wf.aiOptimizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {wf.currentState === "WAITING_APPROVAL" ? (
                  <button
                    onClick={() => handleApproveStep(wf.id, wf.workflowName)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>İnsan Onayını Ver (HITL Approval: {wf.approvalRequiredRole})</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Otonom Orkestrasyon Aktif
                  </span>
                )}
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