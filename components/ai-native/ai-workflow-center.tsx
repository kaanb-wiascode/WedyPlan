"use client";

import React, { useState, useEffect } from "react";
import { GitMerge, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Play, AlertTriangle, Layers, Clock, ArrowRight, Check } from "lucide-react";
import { AiWorkflowEngine, EnterpriseWorkflowInstance, AiWorkflowSummary, WorkflowCategory } from "@/lib/ai-native/ai-workflow-engine";

export const AiWorkflowCenter: React.FC = () => {
  const [workflows, setWorkflows] = useState<EnterpriseWorkflowInstance[]>([]);
  const [summary, setSummary] = useState<AiWorkflowSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkflowCategory | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiWorkflowEngine.getWorkflows().then(setWorkflows);
    AiWorkflowEngine.getWorkflowSummary().then(setSummary);
  }, []);

  const handleApproveStep = async (workflowId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiWorkflowEngine.approveWorkflowStep(workflowId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' iş akışı adımı onaylandı ve bir sonraki otonom adıma geçildi!` });
        AiWorkflowEngine.getWorkflows().then(setWorkflows);
        AiWorkflowEngine.getWorkflowSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "İş akışı adımı onaylanamadı." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredWorkflows = selectedCategory === "ALL"
    ? workflows
    : workflows.filter((w) => w.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive AI Workflow Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitMerge className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Otonom AI İş Akışı Platformu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Workflow Rate: %{summary.automatedWorkflowSuccessRatePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Otonom AI ajanlarının çok adımlı iş süreçlerini (Booking, Onboarding, Escrow, Support) zincirleme çalıştırması, HITL insan onayı ve rollback koruması.
        </p>

        {/* Executive Workflow Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif İş Akışları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveWorkflowsCount} Akış
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Onay Bekleyen (HITL)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.pendingApprovalsCount} Onay
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Otomasyon Başarısı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.automatedWorkflowSuccessRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Dynamic Planning & Failure Recovery Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İş Akışı & İyileştirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Dynamic Orchestration
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiWorkflowInsightNote}
          </p>
        </div>
      </div>

      {/* Workflow Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "BOOKING", "VENDOR_ONBOARDING", "PAYMENTS", "SUPPORT", "SALES"] as (WorkflowCategory | "ALL")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {cat === "ALL" ? "Tüm Akışlar" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Workflows Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Yürütülen AI İş Akışları ({filteredWorkflows.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredWorkflows.map((wf) => (
            <div
              key={wf.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{wf.workflowTitle}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  wf.executionState === "AWAITING_APPROVAL"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : wf.executionState === "COMPLETED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {wf.executionState}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tetikleyen: {wf.triggeringEntityRef}</span>
                <span>Adım: {wf.currentStepIndex} / {wf.totalStepsCount}</span>
              </div>

              {/* Multi-Step Timeline View */}
              <div className="space-y-2 pt-1 border-t border-black/5 dark:border-white/5">
                {wf.steps.map((stp) => (
                  <div
                    key={stp.id}
                    className="p-2.5 bg-white dark:bg-black/40 rounded-xl flex justify-between items-center text-[10px] border border-black/5 dark:border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] rounded-full flex items-center justify-center font-mono font-bold text-[9px]">
                        {stp.stepNumber}
                      </span>
                      <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{stp.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#86868B]">[{stp.assignedAgentRole}]</span>
                      <span className={`font-mono font-bold ${
                        stp.status === "PASSED"
                          ? "text-emerald-500"
                          : stp.status === "EXECUTING"
                          ? "text-amber-500"
                          : "text-[#86868B]"
                      }`}>
                        {stp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#D4AF37] font-medium pt-1">
                ✦ WedyAI Notu: {wf.aiRecoveryTip}
              </p>

              {wf.executionState === "AWAITING_APPROVAL" && (
                <div className="pt-2 border-t border-black/5 dark:border-white/5">
                  <button
                    onClick={() => handleApproveStep(wf.id, wf.workflowTitle)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>İnsan Onayını Ver (HITL Approval Gate)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
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