export type AutomationDomain =
  | "EMAIL"
  | "SMS"
  | "NOTIFICATIONS"
  | "CRM"
  | "INVOICES"
  | "SCHEDULING"
  | "REPORTING"
  | "CONTENT_GENERATION";

export interface AutomationRuleRecord {
  id: string;
  domain: AutomationDomain;
  ruleTitle: string;
  triggerEvent: string; // e.g. "ESCROW_LOCKED", "PROPOSAL_ACCEPTED"
  conditionText: string;
  actionSummaryText: string;
  isHitlApprovalRequired: boolean;
  isActive: boolean;
  executionsCount24h: number;
  aiSuggestedOptimizationNote: string;
  lastExecutedAt: Date;
}

export interface AutomationAuditLog {
  id: string;
  ruleId: string;
  ruleTitle: string;
  triggeredByRef: string;
  status: "SUCCESS" | "PAUSED_ANOMALY" | "AWAITING_APPROVAL";
  executionLatencyMs: number;
  timestamp: Date;
}

export interface AiAutomationSummary {
  totalActiveAutomationRulesCount: number;
  totalExecutionsCount24h: number;
  hoursSavedPerMonthTotal: number;
  aiAnomalyDetectionStatus: "NORMAL" | "ANOMALY_PAUSED";
  aiAutomationInsightNote: string;
}

export class AiAutomationEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_AUTOMATION_RULES_V1";

  /**
   * Otomasyon Kurallarını Getirir
   */
  public static async getRules(): Promise<AutomationRuleRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "aut_101",
        domain: "INVOICES",
        ruleTitle: "Otomatik Fatura Oluşturma & Escrow Dekont Gönderimi",
        triggerEvent: "EVENT_ESCROW_LOCKED",
        conditionText: "Kilitlenen Tutar > ₺10,000 TRY AND Yasal Fatura Tipi == Kurumsal",
        actionSummaryText: "E-Fatura PDF oluştur ➔ E-Posta & WhatsApp ile Çifte ve Muhasebeye ilet.",
        isHitlApprovalRequired: false,
        isActive: true,
        executionsCount24h: 142,
        aiSuggestedOptimizationNote: "Fatura oluşturma ve dekont iletimi %100 otomatize edilmiştir. Hata oranı %0.",
        lastExecutedAt: new Date("2026-07-29T20:15:00"),
      },
      {
        id: "aut_102",
        domain: "CRM",
        ruleTitle: "VIP Destinasyon Çiftleri CRM Aşama & Hatırlatma Güncellemesi",
        triggerEvent: "EVENT_VENUE_SAVED",
        conditionText: "Çift Bütçesi > $50,000 USD AND Konum == 'BAE' | 'Bodrum'",
        actionSummaryText: "CRM Fırsat Aşamasını 'VIP Lead' olarak güncelle ➔ Concierge Ajanına Hatırlatma Kur.",
        isHitlApprovalRequired: false,
        isActive: true,
        executionsCount24h: 84,
        aiSuggestedOptimizationNote: "VIP Lead otomatik etiketleme dönüşüm süresini 3.2 saat kısalttı.",
        lastExecutedAt: new Date("2026-07-29T19:40:00"),
      },
      {
        id: "aut_103",
        domain: "SCHEDULING",
        ruleTitle: "Tedarikçi Çakışma Engelleyici Takvim Senkronizasyonu",
        triggerEvent: "EVENT_BOOKING_CONFIRMED",
        conditionText: "Mekan Randevusu == Onaylı",
        actionSummaryText: "Tedarikçinin Google/Apple Takvimini güncelle ➔ İlgili saatleri kilitle.",
        isHitlApprovalRequired: false,
        isActive: true,
        executionsCount24h: 210,
        aiSuggestedOptimizationNote: "Çift randevu kilitlenmesi çift rezervasyon riskini tamamen sıfırladı.",
        lastExecutedAt: new Date("2026-07-29T20:30:00"),
      },
    ];
  }

  /**
   * Otomasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<AiAutomationSummary> {
    return {
      totalActiveAutomationRulesCount: 16,
      totalExecutionsCount24h: 1420,
      hoursSavedPerMonthTotal: 380,
      aiAnomalyDetectionStatus: "NORMAL",
      aiAutomationInsightNote: "Yapay zeka otomasyon motoru aylık 380 saatlik manuel iş gücü tasarrufu sağlamaktadır. Anomali tespit kalkanı aktiftir.",
    };
  }

  /**
   * Otomasyon Kuralını Aktif/Pasif Yapma Simülasyonu
   */
  public static async toggleRuleStatus(ruleId: string): Promise<boolean> {
    const rules = await this.getRules();
    const idx = rules.findIndex((r) => r.id === ruleId);

    if (idx !== -1) {
      rules[idx].isActive = !rules[idx].isActive;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rules));
      }
      return true;
    }
    return false;
  }
}