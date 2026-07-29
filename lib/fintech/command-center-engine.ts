export type ExecutiveViewportRole =
  | "CEO"
  | "CFO"
  | "FINANCE_DIRECTOR"
  | "MARKETPLACE_DIRECTOR"
  | "OPERATIONS_DIRECTOR";

export interface CommandCenterMetrics {
  totalGmv: number;
  netRevenue: number;
  netProfitMarginPercent: number;
  liquidTreasuryCash: number;
  activeWalletBalancesTotal: number;
  escrowLockedTotal: number;
  mrrSubscriptionsTotal: number;
  commissionsCollectedTotal: number;
  taxReservesHeldTotal: number;
  marketplaceHealthScore: number; // 0-100%
  currency: string;
}

export interface StrategicExecutiveInsight {
  id: string;
  role: ExecutiveViewportRole;
  title: string;
  category: "RISK" | "FORECAST" | "STRATEGY";
  insightText: string;
  recommendationNote: string;
  impactScorePercent: number;
  updatedAt: Date;
}

export class CommandCenterEngine {
  private static STORAGE_KEY = "WEDYPLAN_COMMAND_CENTER_V1";

  /**
   * Birleşik Finansal Komuta Merkezi Metriklerini Getirir
   */
  public static async getMetrics(): Promise<CommandCenterMetrics> {
    return {
      totalGmv: 24800000,
      netRevenue: 3840000,
      netProfitMarginPercent: 68.5,
      liquidTreasuryCash: 28400000,
      activeWalletBalancesTotal: 18040000,
      escrowLockedTotal: 4200000,
      mrrSubscriptionsTotal: 1236000,
      commissionsCollectedTotal: 2604000,
      taxReservesHeldTotal: 3690000,
      marketplaceHealthScore: 99.2,
      currency: "TRY",
    };
  }

  /**
   * Yönetici Rolüne Özel Stratejik Yapay Zeka Analizlerini Getirir
   */
  public static async getInsights(role: ExecutiveViewportRole): Promise<StrategicExecutiveInsight[]> {
    const allInsights: StrategicExecutiveInsight[] = [
      {
        id: "ins_ceo",
        role: "CEO",
        title: "Pazaryeri Ölçeklenme & Büyüme Hızı",
        category: "STRATEGY",
        insightText: "Yıllık GMV büyüme hızı %42 seviyesine ulaştı. Lüks mekan kiralama ve fotoğraf kategorileri en yüksek marjlı büyüme sürücüleridir.",
        recommendationNote: "AB genişleme stratejisi kapsamında EUR/TRY sabitli Escrow cüzdan modülünün aktifleştirilmesi GMV'yi %18 artıracaktır.",
        impactScorePercent: 96,
        updatedAt: new Date(),
      },
      {
        id: "ins_cfo",
        role: "CFO",
        title: "Bilanço & Likidite Dengeleme",
        category: "FORECAST",
        insightText: "Net kar marjı %68.5 ile rekor seviyede. ₺28.4M TL banka nakit rezervi ve ₺3.69M TL KDV rezervi kilitli durumdadır.",
        recommendationNote: "Gecelik mevduatta değerlendirilen likit fon kütüğü sayesinde aylık ₺120.000 TL ek pasif gelir elde edilebilir.",
        impactScorePercent: 98,
        updatedAt: new Date(),
      },
      {
        id: "ins_mkt",
        role: "MARKETPLACE_DIRECTOR",
        title: "Mekan Dönüşüm & Take Rate Optimizasyonu",
        category: "RISK",
        insightText: "Pazaryeri ortalama Take Rate %10.5 seviyesindedir. Yüksek hacimli otellerde kademeli (tiered) komisyon modeli dönüşümü %22 artırdı.",
        recommendationNote: "Sezon sonu erken rezervasyon kampanyası için '0% Komisyon - 14 Gün Ücretsiz Deneme' paketi lansmanı önerilir.",
        impactScorePercent: 94,
        updatedAt: new Date(),
      },
    ];

    return allInsights.filter((i) => i.role === role || role === "CEO");
  }
}