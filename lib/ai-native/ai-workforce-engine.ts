export type WorkforceDepartment =
  | "SALES_AI"
  | "MARKETING_AI"
  | "FINANCE_AI"
  | "SUPPORT_AI"
  | "MARKETPLACE_AI"
  | "HR_AI"
  | "LEGAL_AI"
  | "OPERATIONS_AI"
  | "EXECUTIVE_AI";

export type WorkerStatus = "AUTONOMOUS_RUNNING" | "AWAITING_SUPERVISOR_APPROVAL" | "IDLE" | "OPTIMIZING";

export interface AutonomousWorkerProfile {
  id: string;
  department: WorkforceDepartment;
  workerTitle: string;
  assignedManagerRole: string;
  currentTaskTitle: string;
  status: WorkerStatus;
  autonomousTaskCompletionRatePercent: number; // 0-100%
  activeWorkflowsBoundCount: number;
  memoryEntriesCount: number;
  aiEfficiencyTip: string;
  lastTaskExecutedAt: Date;
}

export interface WorkforcePlatformSummary {
  totalAutonomousWorkersCount: number;
  activeWorkflowsOrchestratedCount: number;
  pendingSupervisorApprovalsCount: number;
  overallWorkforceAutonomyPercent: number;
  aiWorkforceInsightNote: string;
}

export class AiWorkforceEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_WORKFORCE_V1";

  /**
   * Otonom Çalışan Profillerini Getirir
   */
  public static async getWorkers(): Promise<AutonomousWorkerProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "wrk_sales",
        department: "SALES_AI",
        workerTitle: "Autonomous Sales Representative AI",
        assignedManagerRole: "CMO / Sales Director",
        currentTaskTitle: "Lüks Boğaz mekanları için 12 çifte otomatik teklif paketi iletildi.",
        status: "AUTONOMOUS_RUNNING",
        autonomousTaskCompletionRatePercent: 98.4,
        activeWorkflowsBoundCount: 4,
        memoryEntriesCount: 1420,
        aiEfficiencyTip: "Sales AI, çift teklif dönüşüm oranını %32 artırdı.",
        lastTaskExecutedAt: new Date("2026-07-29T20:50:00"),
      },
      {
        id: "wrk_finance",
        department: "FINANCE_AI",
        workerTitle: "Autonomous Escrow & Treasury Worker AI",
        assignedManagerRole: "CFO",
        currentTaskTitle: "Phase 11 Escrow ₺2.5M TRY depozito kilitlemesi doğrulandı.",
        status: "AUTONOMOUS_RUNNING",
        autonomousTaskCompletionRatePercent: 99.8,
        activeWorkflowsBoundCount: 6,
        memoryEntriesCount: 2150,
        aiEfficiencyTip: "Escrow doğrulama süresi 12 saniyeye düşürüldü.",
        lastTaskExecutedAt: new Date("2026-07-29T20:45:00"),
      },
      {
        id: "wrk_legal",
        department: "LEGAL_AI",
        workerTitle: "Autonomous Compliance & Legal Auditor AI",
        assignedManagerRole: "Legal Counsel / Admin",
        currentTaskTitle: "AB GDPR & KVKK veri silme talepleri denetlendi.",
        status: "AWAITING_SUPERVISOR_APPROVAL",
        autonomousTaskCompletionRatePercent: 99.2,
        activeWorkflowsBoundCount: 2,
        memoryEntriesCount: 890,
        aiEfficiencyTip: "Yasal sözleşme onay kapısında 1 onay bekleniyor.",
        lastTaskExecutedAt: new Date("2026-07-29T20:10:00"),
      },
      {
        id: "wrk_ops",
        department: "OPERATIONS_AI",
        workerTitle: "Autonomous Logistics & Calendar Worker AI",
        assignedManagerRole: "COO",
        currentTaskTitle: "2027 Q2 Boğaz mekanları takvim çakışmaları sıfırlandı.",
        status: "AUTONOMOUS_RUNNING",
        autonomousTaskCompletionRatePercent: 98.9,
        activeWorkflowsBoundCount: 5,
        memoryEntriesCount: 3100,
        aiEfficiencyTip: "Takvim senkronizasyonunda sıfır hata oranı.",
        lastTaskExecutedAt: new Date("2026-07-29T20:30:00"),
      },
    ];
  }

  /**
   * İş Gücü Platform Özetini Getirir
   */
  public static async getSummary(): Promise<WorkforcePlatformSummary> {
    return {
      totalAutonomousWorkersCount: 9,
      activeWorkflowsOrchestratedCount: 28,
      pendingSupervisorApprovalsCount: 2,
      overallWorkforceAutonomyPercent: 98.6,
      aiWorkforceInsightNote: "9 otonom AI çalışanı, mevcut Ajan, İş Akışı ve Hafıza platformlarıyla %98.6 otonomi oranı ve insan denetimi (HITL) ile çalışmaktadır.",
    };
  }

  /**
   * Süpervizör Onaylama Simülasyonu
   */
  public static async approveWorkerTask(workerId: string): Promise<boolean> {
    const workers = await this.getWorkers();
    const idx = workers.findIndex((w) => w.id === workerId);

    if (idx !== -1) {
      workers[idx].status = "AUTONOMOUS_RUNNING";
      workers[idx].lastTaskExecutedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(workers));
      }
      return true;
    }
    return false;
  }
}