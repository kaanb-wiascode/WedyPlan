export type CollaborationWorkspaceType =
  | "WEDDING_PLANNING_SPACE"
  | "VENDOR_CONTRACT_COEDIT"
  | "FINANCE_ESCROW_APPROVAL"
  | "EXECUTIVE_STRATEGY_ROOM";

export type HandoffStatus = "ASSIGNED_TO_AI" | "AWAITING_HUMAN_REVIEW" | "APPROVED_AND_COMPLETED";

export interface CollaborativeTaskItem {
  id: string;
  workspaceType: CollaborationWorkspaceType;
  taskTitle: string;
  assignedHumanRef: string; // e.g. "Sena Kaan (Çift)" or "Ahmet (Planner)"
  assignedAgentRole: string; // e.g. "CONCIERGE_AGENT", "VENDOR_OPS_AGENT"
  handoffStatus: HandoffStatus;
  artifactDraftSummary: string;
  aiCollaborationTip: string;
  updatedAt: Date;
}

export interface AiCollaborationSummary {
  totalActiveCollaborativeSpacesCount: number;
  totalTasksDelegatedToAi24h: number;
  averageHandoffCompletionTimeMinutes: number;
  humanAiSynergyScorePercent: number;
  aiCollaborationInsightNote: string;
}

export class AiCollaborationEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_COLLABORATION_V1";

  /**
   * İnsan-AI Ortak Çalışma Görevlerini Getirir
   */
  public static async getCollaborativeTasks(): Promise<CollaborativeTaskItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "col_101",
        workspaceType: "WEDDING_PLANNING_SPACE",
        taskTitle: "Çırağan Palace 180 Kişilik Bütçe & Oturma Düzeni Taslağı",
        assignedHumanRef: "Sena Kaan (Gelin & Damat)",
        assignedAgentRole: "CONCIERGE_AGENT",
        handoffStatus: "AWAITING_HUMAN_REVIEW",
        artifactDraftSummary: "WedyAI Concierge 180 kişilik bütçe dağılımını ₺2.4M TRY seviyesinde optimize etti ve yerleşim planını çizdi.",
        aiCollaborationTip: "Gelin & Damat onayı bekleniyor. Onaylandığında Escrow kilitlenme akışına aktarılacaktır.",
        updatedAt: new Date("2026-07-29T20:45:00"),
      },
      {
        id: "col_102",
        workspaceType: "VENDOR_CONTRACT_COEDIT",
        taskTitle: "Bodrum Catering SLA Sözleşmesi Maddeleri Ortak Düzenleme",
        assignedHumanRef: "Ahmet Yılmaz (Düğün Planlayıcı)",
        assignedAgentRole: "VENDOR_OPS_AGENT",
        handoffStatus: "ASSIGNED_TO_AI",
        artifactDraftSummary: "Vendor Ops Ajanı iptal cezası maddesini pazaryeri standardı olan %10 seviyesine revize ediyor...",
        aiCollaborationTip: "Yapay zeka sözleşmedeki riskli maddeleri temizledi.",
        updatedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "col_103",
        workspaceType: "FINANCE_ESCROW_APPROVAL",
        taskTitle: "Körfez VIP Rezervasyonu %20 Escrow Kilitlenme İmzası",
        assignedHumanRef: "Finans Direktörü (CFO)",
        assignedAgentRole: "FINANCE_AGENT",
        handoffStatus: "APPROVED_AND_COMPLETED",
        artifactDraftSummary: "Phase 11 Escrow kasasına $45,000 USD depozito kilitlemesi çift ve CFO ortak onayı ile tamamlandı.",
        aiCollaborationTip: "İnsan-AI ortak imzası ile işlem güvenle sonuçlandı.",
        updatedAt: new Date("2026-07-29T19:15:00"),
      },
    ];
  }

  /**
   * İşbirliği Platform Özetini Getirir
   */
  public static async getSummary(): Promise<AiCollaborationSummary> {
    return {
      totalActiveCollaborativeSpacesCount: 42,
      totalTasksDelegatedToAi24h: 380,
      averageHandoffCompletionTimeMinutes: 4.2,
      humanAiSynergyScorePercent: 99.1,
      aiCollaborationInsightNote: "İnsan-AI İşbirliği Platformu ortalama 4.2 dakikalık görev tamamlama süresi ve %99.1 sinerji skoru ile çalışmaktadır.",
    };
  }

  /**
   * Görev Onaylama ve Tamamlama Simülasyonu
   */
  public static async approveCollaborativeTask(taskId: string): Promise<boolean> {
    const tasks = await this.getCollaborativeTasks();
    const idx = tasks.findIndex((t) => t.id === taskId);

    if (idx !== -1) {
      tasks[idx].handoffStatus = "APPROVED_AND_COMPLETED";
      tasks[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
      }
      return true;
    }
    return false;
  }
}