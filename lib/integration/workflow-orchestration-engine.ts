export type WorkflowExecutionState = "RUNNING" | "WAITING_APPROVAL" | "COMPLETED" | "ESCALATED" | "FAILED";

export interface WorkflowStepDefinition {
  stepId: string;
  stepName: string; // e.g. "Sync with Opera PMS"
  targetSystemRef: string; // e.g. "Phase14-HotelPMSConnector"
  status: "SUCCESS" | "PENDING" | "FAILED" | "SKIPPED";
  executionTimeMs: number;
}

export interface OrchestratedWorkflowRecord {
  id: string;
  workflowName: string; // e.g. "VIP Booking & SAP Invoice Automation"
  triggerEvent: string; // e.g. "booking.escrow_locked"
  currentState: WorkflowExecutionState;
  totalStepsCount: number;
  completedStepsCount: number;
  steps: WorkflowStepDefinition[];
  approvalRequiredRole?: string; // e.g. "FINANCE_SUPERVISOR"
  failureRiskProbabilityPercent: number; // 0-100%
  aiOptimizationTip: string;
  startedAt: Date;
}

export interface WorkflowOrchestrationSummary {
  totalActiveWorkflowsCount: number;
  dailyCompletedWorkflowsCount: number;
  averageOrchestrationTimeSec: number;
  automatedEscalationsPreventedCount: number;
  aiOrchestrationInsightNote: string;
}

export class WorkflowOrchestrationEngine {
  private static STORAGE_KEY = "WEDYPLAN_WORKFLOW_ORCHESTRATION_V1";

  /**
   * Orkestre Edilen İş Akışlarını Getirir
   */
  public static async getWorkflows(): Promise<OrchestratedWorkflowRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "wf_101",
        workflowName: "VIP Düğün Escrow & SAP Fatura Otomasyonu",
        triggerEvent: "payment.escrow_locked",
        currentState: "WAITING_APPROVAL",
        totalStepsCount: 4,
        completedStepsCount: 2,
        steps: [
          { stepId: "s1", stepName: "Phase 11 Escrow Depozito Doğrulama", targetSystemRef: "Phase11-EscrowEngine", status: "SUCCESS", executionTimeMs: 14 },
          { stepId: "s2", stepName: "Çırağan Palace Opera PMS Oda Kilitleme", targetSystemRef: "Phase14-[#conn_101]", status: "SUCCESS", executionTimeMs: 42 },
          { stepId: "s3", stepName: "SAP S/4HANA E-Fatura Taslağı Oluşturma", targetSystemRef: "Phase14-[#conn_102]", status: "PENDING", executionTimeMs: 0 },
          { stepId: "s4", stepName: "Çifte WhatsApp VIP Onay Mesajı Gönderimi", targetSystemRef: "Phase14-TwilioConnector", status: "PENDING", executionTimeMs: 0 },
        ],
        approvalRequiredRole: "FINANCE_SUPERVISOR",
        failureRiskProbabilityPercent: 2.1,
        aiOptimizationTip: "SAP ERP taslağı onay bekliyor. Finans süpervizörü onayı sonrası WhatsApp gönderimi otomatik tetiklenecektir.",
        startedAt: new Date("2026-07-29T21:40:00"),
      },
      {
        id: "wf_102",
        workflowName: "Tedarikçi Sözleşme Yenileme & Salesforce Sync",
        triggerEvent: "vendor.contract_renewed",
        currentState: "RUNNING",
        totalStepsCount: 3,
        completedStepsCount: 1,
        steps: [
          { stepId: "s1", stepName: "Phase 13 AI Document Intelligence OCR Taraması", targetSystemRef: "Phase13-DocIntelEngine", status: "SUCCESS", executionTimeMs: 85 },
          { stepId: "s2", stepName: "Salesforce CRM Sözleşme Statüsü Güncelleme", targetSystemRef: "Phase14-[#conn_103]", status: "PENDING", executionTimeMs: 0 },
          { stepId: "s3", stepName: "E-Posta Tedariki & KVKK Onay Bildirimi", targetSystemRef: "Phase14-EmailConnector", status: "PENDING", executionTimeMs: 0 },
        ],
        failureRiskProbabilityPercent: 0.8,
        aiOptimizationTip: "Sözleşme OCR taraması %99.6 doğrulukla tamamlandı.",
        startedAt: new Date("2026-07-29T21:50:00"),
      },
      {
        id: "wf_103",
        workflowName: "Destinasyon Çift İptal & Escrow İade Akışı",
        triggerEvent: "dispute.refund_requested",
        currentState: "COMPLETED",
        totalStepsCount: 3,
        completedStepsCount: 3,
        steps: [
          { stepId: "s1", stepName: "Phase 13 AI Legal Agent Maddeleri Taraması", targetSystemRef: "Phase13-[#mdl_claude_sonnet]", status: "SUCCESS", executionTimeMs: 140 },
          { stepId: "s2", stepName: "Phase 11 Escrow Kasa İade Transferi", targetSystemRef: "Phase11-EscrowEngine", status: "SUCCESS", executionTimeMs: 22 },
          { stepId: "s3", stepName: "Mekan Takvimi Boşa Çıkarma (Opera PMS)", targetSystemRef: "Phase14-[#conn_101]", status: "SUCCESS", executionTimeMs: 18 },
        ],
        failureRiskProbabilityPercent: 0.0,
        aiOptimizationTip: "İade akışı 180ms içinde sıfır hatayla tamamlandı.",
        startedAt: new Date("2026-07-29T20:10:00"),
      },
    ];
  }

  /**
   * Orkestrasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<WorkflowOrchestrationSummary> {
    return {
      totalActiveWorkflowsCount: 18,
      dailyCompletedWorkflowsCount: 1420,
      averageOrchestrationTimeSec: 2.4,
      automatedEscalationsPreventedCount: 12,
      aiOrchestrationInsightNote: "Yapay zeka orkestrasyon motoru, çapraz sistem iş akışlarını ortalama 2.4 saniyede tamamlamakta ve SLA tırmandırmalarını %98.5 oranında önlemektedir.",
    };
  }

  /**
   * HITL İnsan Onayını Verip Adımı Devam Ettirme Simülasyonu
   */
  public static async approveWorkflowStep(workflowId: string): Promise<boolean> {
    const workflows = await this.getWorkflows();
    const idx = workflows.findIndex((w) => w.id === workflowId);

    if (idx !== -1) {
      workflows[idx].currentState = "RUNNING";
      workflows[idx].completedStepsCount += 1;
      workflows[idx].steps[2].status = "SUCCESS";
      workflows[idx].steps[2].executionTimeMs = 35;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workflows));
      }
      return true;
    }
    return false;
  }
}