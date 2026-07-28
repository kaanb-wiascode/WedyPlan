"use client";

import React, { useState } from "react";
import AutomationHeader from "./AutomationHeader";
import AIAutomationIntelligenceWidget from "./AIAutomationIntelligenceWidget";
import WorkflowBuilderModal from "./WorkflowBuilderModal";
import ExecutionLogsTable from "./ExecutionLogsTable";
import { toggleWorkflowStatusAction } from "@/lib/actions/vendor-automation";

export default function VendorAutomationClient({ vendorId }: { vendorId: string }) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [aiWorkflowData, setAiWorkflowData] = useState<any>(null);

  const [workflows, setWorkflows] = useState([
    {
      id: "wf_1",
      title: "Sözleşme İmzalandığında Otomatik Onay & Görev",
      triggerType: "CONTRACT_SIGNED",
      isActive: true,
      executionCount: 142,
      successRate: "%99.8",
    },
    {
      id: "wf_2",
      title: "Yeni Müşteri Talebinde Anında WhatsApp Yanıtı",
      triggerType: "NEW_LEAD",
      isActive: true,
      executionCount: 320,
      successRate: "%100",
    },
  ]);

  const [logs] = useState([
    {
      id: "log_201",
      workflowTitle: "Sözleşme İmzalandığında Otomatik Onay & Görev",
      triggeredBy: "Selin & Kaan Yılmaz (Sözleşme İmzalandı)",
      executedAt: "Bugün 00:15",
      actionType: "SEND_WHATSAPP",
      status: "SUCCESS",
    },
    {
      id: "log_202",
      workflowTitle: "Yeni Müşteri Talebinde Anında WhatsApp Yanıtı",
      triggeredBy: "Ece & Mert Demir (Yeni Lead)",
      executedAt: "Dün 18:30",
      actionType: "SEND_WHATSAPP",
      status: "SUCCESS",
    },
  ]);

  const handleToggleStatus = async (id: string, currentActive: boolean) => {
    const nextState = !currentActive;
    const res = await toggleWorkflowStatusAction(vendorId, id, nextState);
    if (res.success) {
      setWorkflows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isActive: nextState } : w))
      );
      alert(res.message);
    }
  };

  const handleApplyAIWorkflow = (aiData: any) => {
    setAiWorkflowData(aiData);
    setIsBuilderOpen(true);
  };

  const activeWorkflowsCount = workflows.filter((w) => w.isActive).length;
  const totalExecutionsCount = workflows.reduce((sum, w) => sum + w.executionCount, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AutomationHeader
        activeWorkflowsCount={activeWorkflowsCount}
        totalExecutionsCount={totalExecutionsCount}
        healthScore={99}
        onOpenBuilder={() => {
          setAiWorkflowData(null);
          setIsBuilderOpen(true);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIAutomationIntelligenceWidget onApplyAIWorkflow={handleApplyAIWorkflow} />

          {/* Aktif Akış Listesi Kartı */}
          <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              ⚡ Tanımlı Otomasyon Akışları ({workflows.length})
            </span>

            <div className="space-y-3">
              {workflows.map((wf) => (
                <div key={wf.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{wf.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{wf.executionCount} Çalışma • {wf.successRate} Başarı</span>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(wf.id, wf.isActive)}
                    className={"px-3 py-1.5 rounded-xl text-[10px] font-bold transition " +
                      (wf.isActive
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400")
                    }
                  >
                    {wf.isActive ? "● Aktif" : "Pasif"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ExecutionLogsTable logs={logs} />
        </div>
      </div>

      <WorkflowBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        vendorId={vendorId}
        aiWorkflowData={aiWorkflowData}
      />
    </div>
  );
}
