export type FinancialAssistantPersona =
  | "COUPLE_ASSISTANT"
  | "VENDOR_ASSISTANT"
  | "FINANCE_TEAM_ASSISTANT"
  | "EXECUTIVE_ASSISTANT";

export interface FinancialAiInsightCard {
  id: string;
  persona: FinancialAssistantPersona;
  title: string;
  category: "REVENUE" | "EXPENSE" | "CASH_FLOW" | "BUDGET_ADVICE" | "SUMMARY";
  insightSummary: string;
  actionableRecommendation: string;
  confidenceScorePercent: number;
  createdAt: Date;
}

export interface FinancialAiChatMessage {
  id: string;
  sender: "USER" | "WEDY_AI";
  text: string;
  timestamp: Date;
}

export class FinancialAiEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINANCIAL_AI_VAULT_V1";

  /**
   * Personaya Özel Akıllı Finansal Kartları Getirir
   */
  public static async getPersonaInsights(
    persona: FinancialAssistantPersona
  ): Promise<FinancialAiInsightCard[]> {
    const allInsights: FinancialAiInsightCard[] = [
      {
        id: "ai_101",
        persona: "COUPLE_ASSISTANT",
        title: "Düğün Bütçesi Pacing & Tasarruf Fırsatı",
        category: "BUDGET_ADVICE",
        insightSummary: "Toplam ₺500.000 TL bütçenizden ₺300.000 TL harcandı/kilitlendi. Bütçenizin %60'ı kullanıldı.",
        actionableRecommendation: "Süsleme ve Müzik kalemlerinde WedyPlan VIP partner indirimi aktifleştirilerek ₺38.000 TL bütçe tasarrufu sağlanabilir.",
        confidenceScorePercent: 98,
        createdAt: new Date(),
      },
      {
        id: "ai_102",
        persona: "VENDOR_ASSISTANT",
        title: "Ağustos Ayı Hakediş & Nakit Akışı Tahmini",
        category: "CASH_FLOW",
        insightSummary: "Önümüzdeki 30 gün içinde tamamlanacak 3 düğün organizasyonundan ₺162.000 TL net hakediş cüzdanınıza aktarılacak.",
        actionableRecommendation: "Banka IBAN bilginiz doğrulandı. Anında FAST transferi ile ödemeleriniz 09:00'da hesabınıza geçecek.",
        confidenceScorePercent: 96,
        createdAt: new Date(),
      },
      {
        id: "ai_103",
        persona: "FINANCE_TEAM_ASSISTANT",
        title: "E-Fatura & Mutabakat Sapma Uyarısı",
        category: "SUMMARY",
        insightSummary: "Günlük cüzdan ve ödeme ağ geçidi mutabakatı %99.97 oranında otomatik tamamlandı. 1 adet banka masraf istisnası mevcut.",
        actionableRecommendation: "₺75 TL tutarındaki banka FAST kesintisi için 'Manuel Eşleştirme & Gider Yazma' butonuna basmanız yeterlidir.",
        confidenceScorePercent: 99,
        createdAt: new Date(),
      },
      {
        id: "ai_104",
        persona: "EXECUTIVE_ASSISTANT",
        title: "C-Suite Stratejik Gelir & Profit Margin Analizi",
        category: "REVENUE",
        insightSummary: "Aylık net kar marjı %68.5 ile rekor seviyede. Toplam Escrow kilitli bakiye ₺4.2M TL.",
        actionableRecommendation: "Bulut sunucu ve ödeme ağ geçidi komisyon giderlerinde toplu pazarlık ile aylık ₺85.000 TL ek kar elde edilebilir.",
        confidenceScorePercent: 97,
        createdAt: new Date(),
      },
    ];

    return allInsights.filter((i) => i.persona === persona);
  }

  /**
   * Finansal AI Asistanı Soru-Cevap İşleyicisi
   */
  public static async processUserQuery(
    persona: FinancialAssistantPersona,
    queryText: string
  ): Promise<FinancialAiChatMessage> {
    let replyText = "WedyAI Finansal Asistanı sorunuzu analiz etti.";

    const lower = queryText.toLowerCase();
    if (lower.includes("bütçe") || lower.includes("kalan")) {
      replyText = "✦ Mevcut bütçe durumunuz: ₺200.000 TL kullanılabilir bakiyeniz bulunmaktadır. Yaklaşan 2 Escrow kapora ödemeniz güvence altındadır.";
    } else if (lower.includes("hakediş") || lower.includes("ödeme")) {
      replyText = "✦ Hakediş analiziniz: Bu hafta içi ₺162.000 TL tutarındaki hakedişiniz banka hesabınıza FAST ile aktarılacaktır.";
    } else if (lower.includes("kar") || lower.includes("gelir")) {
      replyText = "✦ C-Suite Özeti: Bu ayki toplam GMV ₺24.8M TL, Net Gelir ₺3.84M TL ve Net Kar Marjı %68.5'tir.";
    } else {
      replyText = `✦ WedyAI Yanıtı: '${queryText}' talebiniz çift girişli muhasebe kütüğünde doğrulandı. Finansal risk oranı %0.`;
    }

    return {
      id: `msg_${Math.random().toString(36).substring(2, 9)}`,
      sender: "WEDY_AI",
      text: replyText,
      timestamp: new Date(),
    };
  }
}