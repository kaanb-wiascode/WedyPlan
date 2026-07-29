"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Bot, Play, Layers, ShieldAlert, Cpu, Check, ArrowRight } from "lucide-react";
import { AiWorkforceEngine, AutonomousWorkerProfile, WorkforcePlatformSummary, WorkforceDepartment } from "@/lib/ai-native/ai-workforce-engine";

export const AiWorkforceCenter: React.FC = () => {
  const [workers, setWorkers] = useState<AutonomousWorkerProfile[]>([]);
  const [summary, setSummary] = useState<WorkforcePlatformSummary | null>(null);
  const [selectedDept, setSelectedDept] = useState<WorkforceDepartment | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiWorkforceEngine.getWorkers().then(setWorkers);
    AiWorkforceEngine.getSummary().then(setSummary);
  }, []);

  const handleApproveWorker = async (workerId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiWorkforceEngine.approveWorkerTask(workerId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' süpervizör onayı verildi ve otonom göreve devam edildi!` });
        AiWorkforceEngine.getWorkers().then(setWorkers);
        AiWorkforceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Onay işlemi başarısız oldu." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredWorkers = selectedDept === "ALL"
    ? workers
    : workers.filter((w) => w.department === selectedDept);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Workforce Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Otonom AI İş Gücü Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Autonomy: %{summary.overallWorkforceAutonomyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          9 departmanda görev yapan otonom dijital AI çalışanları, insan süpervizör denetimi (HITL), iş akışı orkestrasyonu ve otonom görev planlaması.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Otonom Çalışanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalAutonomousWorkersCount} Worker
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yürütülen Akışlar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeWorkflowsOrchestratedCount} Workflow
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Süpervizör Onayı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.pendingSupervisorApprovalsCount} Approval
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Autonomous Workforce Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İş Gücü & Otonomi Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Workforce Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiWorkforceInsightNote}
          </p>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "SALES_AI", "FINANCE_AI", "LEGAL_AI", "OPERATIONS_AI"] as (WorkforceDepartment | "ALL")[]).map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDept === dept
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dept === "ALL" ? "Tüm Departmanlar" : dept.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Autonomous Workers Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#D4AF37]" />
          <span>Otonom AI Çalışan Profilleri ({filteredWorkers.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredWorkers.map((w) => (
            <div
              key={w.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{w.workerTitle}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  w.status === "AWAITING_SUPERVISOR_APPROVAL"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {w.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Departman: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{w.department}</span></div>
                <div>Süpervizör: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{w.assignedManagerRole}</span></div>
                <div>Bağlı Akışlar: <span className="font-bold text-[#D4AF37]">{w.activeWorkflowsBoundCount} Workflow</span></div>
                <div>Hafıza Kaydı: <span className="font-bold text-emerald-500">{w.memoryEntriesCount} Entry</span></div>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[11px] font-medium text-[#111111] dark:text-[#F5F4F0]">
                ⚡ Aktif Görev: {w.currentTaskTitle}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Verimlilik: {w.aiEfficiencyTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {w.status === "AWAITING_SUPERVISOR_APPROVAL" ? (
                  <button
                    onClick={() => handleApproveWorker(w.id, w.workerTitle)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Süpervizör Onayı Ver (HITL Approval)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Otonom Görevde (%{w.autonomousTaskCompletionRatePercent} Başarı)
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