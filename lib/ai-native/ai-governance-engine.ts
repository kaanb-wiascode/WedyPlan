export type DataClassificationLevel = "PUBLIC" | "CONFIDENTIAL" | "RESTRICTED_PII" | "CRITICAL_FINANCIAL";
export type GovernanceStatus = "PASSED" | "FLAGGED_PII_REDACTED" | "BLOCKED_INJECTION_ATTEMPT";

export interface GovernancePolicyRecord {
  id: string;
  policyName: string;
  classificationLevel: DataClassificationLevel;
  isPromptInjectionShieldActive: boolean;
  isPiiAnonymizationActive: boolean;
  allowedModels: string[]; // e.g. ["GPT-4o", "Claude-3.5-Sonnet", "Llama-3-70B-Local"]
  totalBlockedThreatsCount: number;
  safetyScorePercent: number; // 0-100%
  aiRiskTip: string;
  updatedAt: Date;
}

export interface GovernanceAuditTrail {
  id: string;
  policyId: string;
  userRef: string;
  promptSnippet: string;
  status: GovernanceStatus;
  piiItemsRedactedCount: number;
  timestamp: Date;
}

export interface AiGovernanceSummary {
  totalMonitoredPrompts24h: number;
  blockedInjectionThreats24h: number;
  redactedPiiCount24h: number;
  overallSafetyCompliancePercent: number;
  aiGovernanceInsightNote: string;
}

export class AiGovernanceEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_GOVERNANCE_V1";

  /**
   * AI Güvenlik ve Yönetişim Politikalarını Getirir
   */
  public static async getPolicies(): Promise<GovernancePolicyRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "pol_101",
        policyName: "KVKK & GDPR PII Veri Koruma Kalkanı",
        classificationLevel: "RESTRICTED_PII",
        isPromptInjectionShieldActive: true,
        isPiiAnonymizationActive: true,
        allowedModels: ["GPT-4o", "Claude-3.5-Sonnet"],
        totalBlockedThreatsCount: 42,
        safetyScorePercent: 99.8,
        aiRiskTip: "E-Posta, TC Kimlik No ve Telefon numaraları modele gönderilmeden önce %100 otonom maskelenmektedir.",
        updatedAt: new Date("2026-07-29T20:00:00"),
      },
      {
        id: "pol_102",
        policyName: "Prompt Injection & Jailbreak Koruma Duvarı",
        classificationLevel: "CONFIDENTIAL",
        isPromptInjectionShieldActive: true,
        isPiiAnonymizationActive: false,
        allowedModels: ["GPT-4o", "Llama-3-70B-Local"],
        totalBlockedThreatsCount: 18,
        safetyScorePercent: 99.5,
        aiRiskTip: "Sistem prompt manipülasyonu ve zararlı talimat enjeksiyonları giriş aşamasında engellenmektedir.",
        updatedAt: new Date("2026-07-29T19:30:00"),
      },
      {
        id: "pol_103",
        policyName: "Escrow & Finansal Veri Erişim Güvenliği",
        classificationLevel: "CRITICAL_FINANCIAL",
        isPromptInjectionShieldActive: true,
        isPiiAnonymizationActive: true,
        allowedModels: ["Llama-3-70B-Local"], // Only local air-gapped model allowed for critical finance
        totalBlockedThreatsCount: 5,
        safetyScorePercent: 100,
        aiRiskTip: "Finansal veriler yalnızca hava boşluklu (air-gapped) yerel modelde işlenir.",
        updatedAt: new Date("2026-07-29T18:00:00"),
      },
    ];
  }

  /**
   * Yönetişim Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<AiGovernanceSummary> {
    return {
      totalMonitoredPrompts24h: 3840,
      blockedInjectionThreats24h: 12,
      redactedPiiCount24h: 184,
      overallSafetyCompliancePercent: 99.8,
      aiGovernanceInsightNote: "Sıfır-Güven (Zero-Trust) AI güvenlik duvarı 24 saatte 184 PII verisini maskelemiş ve 12 zararlı prompt injection girişimini engellemiştir.",
    };
  }

  /**
   * Politika Güncelleme Simülasyonu
   */
  public static async togglePolicyShield(policyId: string): Promise<boolean> {
    const policies = await this.getPolicies();
    const idx = policies.findIndex((p) => p.id === policyId);

    if (idx !== -1) {
      policies[idx].isPromptInjectionShieldActive = !policies[idx].isPromptInjectionShieldActive;
      policies[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(policies));
      }
      return true;
    }
    return false;
  }
}