"use client";

import React, { useState, useEffect } from "react";
import { Users2, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, UserCheck, Bot, Check, Layers, FileText, ArrowRightLeft, Clock } from "lucide-react";
import { AiCollaborationEngine, CollaborativeTaskItem, AiCollaborationSummary, CollaborationWorkspaceType } from "@/lib/ai-native/ai-collaboration-engine";

export const AiCollaborationCenter: React.FC = () => {
  const [tasks, setTasks] = useState<CollaborativeTaskItem[]>([]);
  const [summary, setSummary] = useState<AiCollaborationSummary | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<CollaborationWorkspaceType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiCollaborationEngine.getCollaborativeTasks().then(setTasks);
    AiCollaborationEngine.getSummary().then(setSummary);
  }, []);

  const handleApproveTask = async (taskId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiCollaborationEngine.approveCollaborativeTask(taskId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' ortak çalışması insan onayı ile onaylandı ve tamamlandı!` });
        AiCollaborationEngine.getCollaborativeTasks().then(setTasks);
        AiCollaborationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Onay işlemi başarısız oldu." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredTasks = selectedSpace === "ALL"
    ? tasks
    : tasks.filter((t) => t.workspaceType === selectedSpace);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Collaboration Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              İnsan-AI Ortak Çalışma Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Synergy: %{summary.humanAiSynergyScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          İnsanlar ve AI ajanları arasında ortak çalışma alanları (Shared Workspaces), karşılıklı görev devri (Task Handoffs), ortak sözleşme düzenleme ve karar takibi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Ortak Alanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveCollaborativeSpacesCount} Alan
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">AI'ya Devredilen (24s)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalTasksDelegatedToAi24h} Task
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Devir Süresi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageHandoffCompletionTimeMinutes} dk
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Synergy Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İnsan-AI Sinerji Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Hybrid Teamwork
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiCollaborationInsightNote}
          </p>
        </div>
      </div>

      {/* Workspace Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "WEDDING_PLANNING_SPACE", "VENDOR_CONTRACT_COEDIT", "FINANCE_ESCROW_APPROVAL"] as (CollaborationWorkspaceType | "ALL")[]).map((spc) => (
          <button
            key={spc}
            onClick={() => setSelectedSpace(spc)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedSpace === spc
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {spc === "ALL" ? "Tüm Çalışma Alanları" : spc.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Collaborative Tasks Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>İnsan-AI Ortak Görev Listesi ({filteredTasks.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredTasks.map((tsk) => (
            <div
              key={tsk.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{tsk.taskTitle}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  tsk.handoffStatus === "AWAITING_HUMAN_REVIEW"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : tsk.handoffStatus === "APPROVED_AND_COMPLETED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {tsk.handoffStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>İnsan Kullanıcı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{tsk.assignedHumanRef}</span></div>
                <div>Sorumlu Ajan: <span className="font-bold text-[#D4AF37]">{tsk.assignedAgentRole}</span></div>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[11px] font-medium text-[#111111] dark:text-[#F5F4F0]">
                📄 Üretilen Taslak: {tsk.artifactDraftSummary}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI İpucu: {tsk.aiCollaborationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {tsk.handoffStatus === "AWAITING_HUMAN_REVIEW" ? (
                  <button
                    onClick={() => handleApproveTask(tsk.id, tsk.taskTitle)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Taslağı İncele & İnsan Onayını Ver</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> İnsan-AI Ortak Onayı Tamamlandı
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