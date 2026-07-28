"use client";

import React, { useState } from "react";
import { executeAIWorkflowAction, approveWorkflowStepAction } from "@/lib/actions/ai-workflow-engine";

export default function WorkflowSimulatorConsole() {
  const [workflowType, setWorkflowType] = useState<any>("CONTRACT_ANALYSIS_AND_APPROVAL");
  const [payloadDescription, setPayloadDescription] = useState("Lüks Otel Balo Salonu Düğün Sözleşmesi & İptal Şartları Analizi");
  const [requiresHumanApproval, setRequiresHumanApproval] = useState(true);
  const [workflowResult, setWorkflowResult] = useState<any>(null);

  const handleExecuteWorkflow = async () => {
    const res = await executeAIWorkflowAction({
      workflowType,
      payloadDescription,
      requiresHumanApproval,
      maxRetryAttempts: 3,
    });

    if (res.success) {
      setWorkflowResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleApprove = async (approved: boolean) => {
    if (!workflowResult) return;

    const res = await approveWorkflowStepAction({
      instanceId: workflowResult.instanceId,
      approved,
      notes: approved ? "Yönetici sözleşme ve bütçeyi onayladı." : "Sözleşme klozları yetersiz bulundu.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live AI Workflow Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live AI Agent Workflow Orchestrator & Approval Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">İş Akışı Şablonu</label>
              <select
                value={workflowType}
                onChange={(e) => setWorkflowType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="CONTRACT_ANALYSIS_AND_APPROVAL">Sözleşme Analizi & Onay</option>
                <option value="AUTOMATED_VENDOR_RFOP_DISPATCH">Tedarikçi Teklif Dağıtımı</option>
                <option value="INTELLIGENT_BUDGET_REBALANCE">Bütçe Yeniden Dengeleme</option>
                <option value="EMERGENCY_TIMELINE_RESCHEDULE">Acil Zaman Çizelgesi Güncelleme</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Görev Açıklaması & Payload</label>
              <input
                type="text"
                value={payloadDescription}
                onChange={(e) => setPayloadDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-purple-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="humanApproval"
              checked={requiresHumanApproval}
              onChange={(e) => setRequiresHumanApproval(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="humanApproval" className="font-semibold text-slate-700 dark:text-slate-200 text-xs">
              Kritik Adımda 'Human-in-the-Loop' Onay Kapısını Zorunlu Tut
            </label>
          </div>

          <button
            onClick={handleExecuteWorkflow}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white font-bold hover:shadow-md transition"
          >
            ⚡ Ajan Orkestrasyon Akışını Başlat & Delege Et
          </button>

          {workflowResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-purple-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● AI Workflow Instance: {workflowResult.instanceId}</span>
                <span className="text-amber-400 font-bold">Durum: {workflowResult.status}</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                {workflowResult.aiOutputSummary}
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">🤖 Ajan Adımları İnfaz Dökümü:</span>
                {workflowResult.steps.map((s: any) => (
                  <div key={s.stepNumber} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span>Adım {s.stepNumber}: <strong>{s.agentName}</strong> - {s.action}</span>
                    <span className="text-emerald-400 font-bold">[{s.status}]</span>
                  </div>
                ))}
              </div>

              {workflowResult.status === "WAITING_HUMAN_APPROVAL" && (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 space-y-2 pt-2">
                  <span className="font-bold text-amber-200 block">⚠️ İNSAN ONAYI BEKLENİYOR (HUMAN APPROVAL REQUIRED):</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(true)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                    >
                      ✓ Onayla & Akışı Tamamla
                    </button>
                    <button
                      onClick={() => handleApprove(false)}
                      className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
                    >
                      ✕ Reddet & Akışı İptal Et
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
