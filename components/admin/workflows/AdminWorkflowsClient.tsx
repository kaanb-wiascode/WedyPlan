"use client";

import React, { useState } from "react";
import AdminWorkflowHeader from "./AdminWorkflowHeader";
import AIWorkflowGeneratorWidget from "./AIWorkflowGeneratorWidget";
import WorkflowCanvasBuilder from "./WorkflowCanvasBuilder";
import WorkflowExecutionLogsTable from "./WorkflowExecutionLogsTable";
import { executeWorkflowTestAction } from "@/lib/actions/admin-workflows";

export default function AdminWorkflowsClient() {
  const [currentWorkflow, setCurrentWorkflow] = useState<any>({
    id: "wf_101",
    name: "Otonom Tedarikçi Onay & Kalite Kontrol Akışı",
    description: "Yeni onaylanan tedarikçilerin AI profil kalite kontrolü ve SMS Hoş Geldin serisi.",
    trigger: "VENDOR_APPROVED",
    steps: [
      { id: "step_1", actionType: "RUN_AI", config: { prompt: "Tedarikçi vergi levhası ve portföy kalite skoru üret" } },
      { id: "step_2", actionType: "CONDITIONS", config: { condition: "AI Kalite Skoru >= 85" } },
      { id: "step_3", actionType: "SEND_SMS", config: { template: "Tedarikçi Onay & Vitrin Yayın SMS'i" } },
      { id: "step_4", actionType: "CREATE_TASK", config: { task: "Müşteri Başarı Temsilcisine Onboarding Çağrısı Ata" } },
    ],
  });

  const [logs] = useState([
    { id: "log_exec_1", workflowName: "Otonom Tedarikçi Onay & Kalite Kontrol Akışı", trigger: "VENDOR_APPROVED", timestamp: "01:52:10", durationMs: 142, status: "SUCCESS" },
    { id: "log_exec_2", workflowName: "Sözleşme İmzalandı Kapora Hatırlatma", trigger: "CONTRACT_SIGNED", timestamp: "01:40:00", durationMs: 88, status: "SUCCESS" },
    { id: "log_exec_3", workflowName: "Ödeme Başarısızlığı Kurtarma Akışı", trigger: "PAYMENT_FAILED", timestamp: "01:12:30", durationMs: 110, status: "SUCCESS" },
  ]);

  const handleApplyAIWorkflow = (generated: any) => {
    setCurrentWorkflow(generated);
  };

  const handleRunTest = async (workflowId: string) => {
    const res = await executeWorkflowTestAction(workflowId);
    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminWorkflowHeader
        activeWorkflowsCount={18}
        totalExecutionsMonth={124000}
        automationSuccessRate={99.8}
        onOpenNewWorkflowModal={() => alert("⚡ Yeni Boş Akış Tuvali Açılıyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIWorkflowGeneratorWidget onApplyAIWorkflow={handleApplyAIWorkflow} />
          <WorkflowExecutionLogsTable logs={logs} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <WorkflowCanvasBuilder
            workflow={currentWorkflow}
            onRunTest={handleRunTest}
          />
        </div>
      </div>
    </div>
  );
}
