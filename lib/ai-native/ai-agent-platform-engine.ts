export type SpecializedAgentRole =
  | "COUPLE_AGENT"
  | "VENDOR_AGENT"
  | "ADMINISTRATOR_AGENT"
  | "SALES_AGENT"
  | "MARKETING_AGENT"
  | "FINANCE_AGENT"
  | "SUPPORT_AGENT"
  | "DEVELOPER_AGENT"
  | "EXECUTIVE_AGENT";

export type AgentExecutionState = "IDLE" | "PLANNING" | "EXECUTING_TOOL" | "DELEGATING" | "COMPLETED";

export interface EnterpriseAgentProfile {
  id: string;
  role: SpecializedAgentRole;
  title: string;
  description: string;
  primaryToolsBound: string[];
  executionState: AgentExecutionState;
  activeTaskName: string;
  priorityScore: number; // 1-100
  learningExperiencePoints: number;
  aiSuccessRatePercent: number; // 0-100%
  lastActiveAt: Date;
}

export interface AgentPlatformSummary {
  totalSpecializedAgentsCount: number;
  activeBoundToolsCount: number;
  tasksCompletedTodayCount: number;
  aiCoordinationHealthPercent: number;
  aiAgentPlatformInsightNote: string;
}

export class AiAgentPlatformEngine {
  private static STORAGE_KEY = "WEDYPLAN_ENTERPRISE_AI_AGENTS_V1";

  /**
   * 9 Uzmanlaşmış AI Ajan Profilini Getirir
   */
  public static async getEnterpriseAgents(): Promise<EnterpriseAgentProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "eag_couple",
        role: "COUPLE_AGENT",
        title: "Couple Concierge AI",
        description: "Çiftlerin düğün hayali, bütçe yönetimi ve mekan seçim sürecini yönetir.",
        primaryToolsBound: ["VenueMatcherTool", "BudgetCalculatorTool", "RSVPOptimizerTool"],
        executionState: "IDLE",
        activeTaskName: "Hazır: Çift bütçe tercihlerini bekliyor.",
        priorityScore: 95,
        learningExperiencePoints: 12400,
        aiSuccessRatePercent: 99.2,
        lastActiveAt: new Date(),
      },
      {
        id: "eag_vendor",
        role: "VENDOR_AGENT",
        title: "Vendor Operations AI",
        description: "Tedarikçi takvimlerini, teklif taslaklarını ve müşteri yanıtlarını otomatize eder.",
        primaryToolsBound: ["CalendarSyncTool", "ProposalGeneratorTool", "PricingEngineTool"],
        executionState: "PLANNING",
        activeTaskName: "İstanbul ve Bodrum mekanları için 2027 sezonsal takvim eşlemesi.",
        priorityScore: 90,
        learningExperiencePoints: 18900,
        aiSuccessRatePercent: 98.6,
        lastActiveAt: new Date(),
      },
      {
        id: "eag_finance",
        role: "FINANCE_AGENT",
        title: "Finance & Escrow AI",
        description: "Çoklu para birimli Escrow milatları, ödeme tetikleyicileri ve komisyon hesaplarını denetler.",
        primaryToolsBound: ["EscrowReleaseTool", "FXRateTool", "PayoutVerificationTool"],
        executionState: "IDLE",
        activeTaskName: "Tüm Escrow kilitleme kuralları doğrulandı.",
        priorityScore: 98,
        learningExperiencePoints: 21500,
        aiSuccessRatePercent: 99.8,
        lastActiveAt: new Date(),
      },
      {
        id: "eag_support",
        role: "SUPPORT_AGENT",
        title: "Customer Support & Resolution AI",
        description: "Çift ve tedarikçi canlı destek taleplerini, anlaşmazlıkları ve biletleri çözer.",
        primaryToolsBound: ["TicketResolverTool", "DisputeEscalationTool", "ChatBotBridgeTool"],
        executionState: "IDLE",
        activeTaskName: "Canlı bilet kuyruğu temiz.",
        priorityScore: 85,
        learningExperiencePoints: 9400,
        aiSuccessRatePercent: 97.4,
        lastActiveAt: new Date(),
      },
      {
        id: "eag_executive",
        role: "EXECUTIVE_AGENT",
        title: "Executive Strategy & Intelligence AI",
        description: "C-Suite için GMV tahminleri, küresel risk analizleri ve büyüme önerileri üretir.",
        primaryToolsBound: ["GMVForecastTool", "MarketScoringTool", "ExecutiveBriefingTool"],
        executionState: "IDLE",
        activeTaskName: "Çeyreklik stratejik büyüme raporu güncel.",
        priorityScore: 99,
        learningExperiencePoints: 31000,
        aiSuccessRatePercent: 99.5,
        lastActiveAt: new Date(),
      },
    ];
  }

  /**
   * Platform Özet İstatistiklerini Getirir
   */
  public static async getPlatformSummary(): Promise<AgentPlatformSummary> {
    return {
      totalSpecializedAgentsCount: 9,
      activeBoundToolsCount: 24,
      tasksCompletedTodayCount: 1280,
      aiCoordinationHealthPercent: 99.4,
      aiAgentPlatformInsightNote: "9 uzmanlaşmış AI ajanı, otonom görev devri (Task Delegation) ve araç bağlama (Tool Binding) ile %99.4 başarı oranında çalışmaktadır.",
    };
  }

  /**
   * Ajan Görev Tetikleme Simülasyonu
   */
  public static async executeAgentTask(agentId: string, taskName: string): Promise<boolean> {
    const agents = await this.getEnterpriseAgents();
    const idx = agents.findIndex((a) => a.id === agentId);

    if (idx !== -1) {
      agents[idx].executionState = "EXECUTING_TOOL";
      agents[idx].activeTaskName = taskName;
      agents[idx].lastActiveAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agents));
      }
      return true;
    }
    return false;
  }
}