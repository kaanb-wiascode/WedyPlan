"use client";

import React, { useState } from "react";
import { dispatchAgentWorkflowTaskAction, approveHumanInTheLoopTaskAction } from "@/lib/actions/ai-agent-framework";

export default function AgentWorkflowsAndBusTable() {
  const [taskDescription, setTaskDescription] = useState("Bodrum'da 200 kişilik deniz kenarı kır düğünü için mekan seç, sözleşmeyi denetle ve bütçeyi hesapla");
  const [targetAgentKey, setTargetAgentKey] = useState("agent.wedding_planner");
  const [taskResult, setTaskResult] = useState<any>(null);

  const handleDispatchTask = async () => {
    const res = await dispatchAgentWorkflowTaskAction({
      taskDescription,
      targetAgentKey,
      callerPortal: "ADMIN",
      requiresSupervisorReview: true,
      allowParallelExecution: true,
    });

    if (res.success) {
      setTaskResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleHumanApprove = async (taskId: string) => {
    const res = await approveHumanInTheLoopTaskAction({
      taskId,
      approved: true,
      notes: "Yönetici insan onayı onaylandı.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Agent Swarm Task Dispatcher */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Agent Workflow & Swarm Task Dispatcher
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            ReAct Loop Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Orkestratör Lider Ajan</label>
              <select
                value={targetAgentKey}
                onChange={(e) => setTargetAgentKey(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="agent.wedding_planner">agent.wedding_planner (Planner)</option>
                <option value="agent.vendor_finder">agent.vendor_finder (Executor)</option>
                <option value="agent.contract_auditor">agent.contract_auditor (Reviewer)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Ajan Swarm Görev Tanımı</label>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleDispatchTask}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Ajan Swarm Görevini Tetikle
          </button>

          {taskResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Görev Tamamlandı: {taskResult.taskId}</span>
                <span className="text-slate-400 text-[10px]">Supervisor Skoru: %{taskResult.supervisorApprovalScore} | Süre: {taskResult.executionTimeMs}ms</span>
              </div>

              {/* Alt Görevler (Sub-tasks) */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Alt Ajan Görev Delegasyonları:</span>
                {taskResult.subTasks.map((st: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-[10px] p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-200 font-sans">{st.title}</span>
                    <span className="text-indigo-400 font-bold">{st.agentAssigned} (✓ Done)</span>
                  </div>
                ))}
              </div>

              <div className="text-slate-300 font-sans pt-2 border-t border-slate-800">{taskResult.finalOutput}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
