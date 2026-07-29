export type WorkflowCategory =
  | "SALES"
  | "SUPPORT"
  | "VENDOR_ONBOARDING"
  | "BOOKING"
  | "PAYMENTS"
  | "MARKETING"
  | "CRM"
  | "FINANCE";

export type WorkflowExecutionState =
  | "RUNNING"
  | "AWAITING_APPROVAL"
  | "COMPLETED"
  | "ROLLED_BACK"
  | "FAILED";

export interface WorkflowStepItem {
  id: string;
  stepNumber: number;
  title: string;
  assignedAgentRole: string;
  isHitlApprovalRequired: boolean;
  status: "PENDING" | "EXECUTING" | "PASSED" | "FAILED";
}

export interface EnterpriseWorkflowInstance {
  id: string;
  category: WorkflowCategory;
  workflowTitle: string;
  triggeringEntityRef: string; // e.g. "Couple #SenaKaan", "Vendor #Ciragan"
  executionState: WorkflowExecutionState;
  currentStepIndex: number;
  totalStepsCount: number;
  steps: WorkflowStepItem[];
  aiOptimizationScorePercent: number; // 0-100%
  aiRecoveryTip: string;
  startedAt: Date;
  updatedAt: Date;
}

export interface AiWorkflowSummary {
  totalActiveWorkflowsCount: number;
  pendingApprovalsCount: number;
  automatedWorkflowSuccessRatePercent: number;
  aiWorkflowInsightNote: string;
}

export class AiWorkflowEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_WORKFLOWS_V1";

  /**
   * Aktif AI İş Akışlarını Getirir
   */
  public static async getWorkflows(): Promise<EnterpriseWorkflowInstance[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "wf_101",
        category: "BOOKING",
        workflowTitle: "Çırağan Palace Düğün Rezervasyon & Escrow Kilitleme Süreci",
        triggeringEntityRef: "Düğün #2027-TR-09",
        executionState: "AWAITING_APPROVAL",
        currentStepIndex: 2,
        totalStepsCount: 4,
        steps: [
          { id: "stp_1", stepNumber: 1, title: "Mekan Müsaitlik & Fiyat Doğrulama", assignedAgentRole: "VENDOR_OPS", isHitlApprovalRequired: false, status: "PASSED" },
          { id: "stp_2", stepNumber: 2, title: "Çift Ön Onayı & %20 Depozito Teklifi", assignedAgentRole: "CONCIERGE", isHitlApprovalRequired: true, status: "EXECUTING" },
          { id: "stp_3", stepNumber: 3, title: "Phase 11 Escrow Banka Depozitolu Kilitleme", assignedAgentRole: "FINANCE", isHitlApprovalRequired: false, status: "PENDING" },
          { id: "stp_4", stepNumber: 4, title: "Tedarikçi Takvim Senkronizasyonu & Onay Belgesi", assignedAgentRole: "VENDOR_OPS", isHitlApprovalRequired: false, status: "PENDING" },
        ],
        aiOptimizationScorePercent: 98,
        aiRecoveryTip: "Çift onayı bekleniyor. HITL onay kapısından geçildiğinde Escrow otomatik kilitlenecektir.",
        startedAt: new Date("2026-07-29T18:00:00"),
        updatedAt: new Date("2026-07-29T20:15:00"),
      },
      {
        id: "wf_102",
        category: "VENDOR_ONBOARDING",
        workflowTitle: "Lüks Catering Firması Evrak & Vergi Uyum Denetimi",
        triggeringEntityRef: "Vendor #BodrumCatering",
        executionState: "RUNNING",
        currentStepIndex: 3,
        totalStepsCount: 3,
        steps: [
          { id: "stp_5", stepNumber: 1, title: "Vergi Levhası & Sicil Gazetesi OCR Taraması", assignedAgentRole: "COMPLIANCE", isHitlApprovalRequired: false, status: "PASSED" },
          { id: "stp_6", stepNumber: 2, title: "WedyAI Kalite & Portföy Analizi", assignedAgentRole: "VENDOR_OPS", isHitlApprovalRequired: false, status: "PASSED" },
          { id: "stp_7", stepNumber: 3, title: "Bölgesel Pazaryeri Kataloğuna Endeksleme", assignedAgentRole: "ADMIN", isHitlApprovalRequired: false, status: "EXECUTING" },
        ],
        aiOptimizationScorePercent: 99,
        aiRecoveryTip: "Evrak OCR doğrulaması %100 başarılı. Katalog indeksleme tamamlanmak üzere.",
        startedAt: new Date("2026-07-29T19:30:00"),
        updatedAt: new Date("2026-07-29T20:30:00"),
      },
    ];
  }

  /**
   * İş Akışı Özet İstatistiklerini Getirir
   */
  public static async getWorkflowSummary(): Promise<AiWorkflowSummary> {
    return {
      totalActiveWorkflowsCount: 18,
      pendingApprovalsCount: 3,
      automatedWorkflowSuccessRatePercent: 99.2,
      aiWorkflowInsightNote: "Çoklu-Ajan iş akışı motoru %99.2 başarı oranıyla çalışmaktadır. 3 adet kritik finansal işlem C-Suite/Kullanıcı onayı beklemektedir.",
    };
  }

  /**
   * HITL Onay Kapısını Onaylar (Approve Workflow Step)
   */
  public static async approveWorkflowStep(workflowId: string): Promise<boolean> {
    const workflows = await this.getWorkflows();
    const idx = workflows.findIndex((w) => w.id === workflowId);

    if (idx !== -1) {
      const currentStep = workflows[idx].steps[workflows[idx].currentStepIndex - 1];
      if (currentStep) {
        currentStep.status = "PASSED";
      }

      if (workflows[idx].currentStepIndex < workflows[idx].totalStepsCount) {
        workflows[idx].currentStepIndex += 1;
        workflows[idx].steps[workflows[idx].currentStepIndex - 1].status = "EXECUTING";
        workflows[idx].executionState = "RUNNING";
      } else {
        workflows[idx].executionState = "COMPLETED";
      }

      workflows[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workflows));
      }
      return true;
    }
    return false;
  }
}