export type ExperimentType = "AB_TEST" | "SPLIT_TEST" | "FEATURE_FLAG" | "CANARY_RELEASE" | "MULTIVARIATE";
export type ExperimentStatus = "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED_WINNER_FOUND";

export interface ExperimentVariant {
  id: string;
  variantName: string;
  trafficAllocationPercent: number; // e.g. 50%
  conversionsCount: number;
  conversionRatePercent: number;
  clickThroughRatePercent: number;
  revenueDeltaPercent: number;
}

export interface ExperimentRecord {
  id: string;
  experimentName: string;
  type: ExperimentType;
  status: ExperimentStatus;
  targetMetric: "CONVERSION" | "CTR" | "RETENTION" | "REVENUE" | "ENGAGEMENT";
  sampleSizeTotal: number;
  confidenceScorePercent: number; // e.g. 98.4%
  variants: ExperimentVariant[];
  winningVariantId?: string;
  aiWinnerPrediction: string;
  aiImpactSummary: string;
  startedAt: Date;
}

export class ExperimentationEngine {
  private static STORAGE_KEY = "WEDYPLAN_EXPERIMENTS_VAULT_V1";

  /**
   * Aktif ve Geçmiş Deneyleri Getirir
   */
  public static async getExperiments(): Promise<ExperimentRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "exp_101",
        experimentName: "Escrow Kapora Güvence Rozeti Optimizasyonu",
        type: "AB_TEST",
        status: "COMPLETED_WINNER_FOUND",
        targetMetric: "CONVERSION",
        sampleSizeTotal: 48200,
        confidenceScorePercent: 99.2,
        winningVariantId: "var_b",
        aiWinnerPrediction: "Varyant B (Lüks Altın Escrow Rozeti) e-imzalı sözleşme imzalama oranında %24.8 net artış sağladı.",
        aiImpactSummary: "Platform bazında aylık +₺420.000 TL ilave GMV artışı doğrulandı.",
        startedAt: new Date("2026-07-10"),
        variants: [
          {
            id: "var_a",
            variantName: "Kontrol (Klasik Rozet)",
            trafficAllocationPercent: 50,
            conversionsCount: 1420,
            conversionRatePercent: 5.8,
            clickThroughRatePercent: 12.4,
            revenueDeltaPercent: 0,
          },
          {
            id: "var_b",
            variantName: "Varyant B (Lüks Altın Rozet + WedyAI Vurgusu)",
            trafficAllocationPercent: 50,
            conversionsCount: 1840,
            conversionRatePercent: 7.6,
            clickThroughRatePercent: 16.8,
            revenueDeltaPercent: 24.8,
          },
        ],
      },
      {
        id: "exp_102",
        experimentName: "Düğün Bütçesi WedyAI Asistanı Soru Akışı",
        type: "MULTIVARIATE",
        status: "RUNNING",
        targetMetric: "ENGAGEMENT",
        sampleSizeTotal: 24100,
        confidenceScorePercent: 94.5,
        aiWinnerPrediction: "WedyAI 3 Adımlı Hızlı Anket Varyantı kullanıcı tamamlama oranlarında %18 önde gidiyor.",
        aiImpactSummary: "Aktivasyon hızında %14 artış öngörülüyor.",
        startedAt: new Date("2026-07-20"),
        variants: [
          {
            id: "var_m1",
            variantName: "Adım 1: Tek Sayfa Form",
            trafficAllocationPercent: 33,
            conversionsCount: 840,
            conversionRatePercent: 10.2,
            clickThroughRatePercent: 22.1,
            revenueDeltaPercent: 4.1,
          },
          {
            id: "var_m2",
            variantName: "Adım 2: WedyAI Sesli Asistan Akışı",
            trafficAllocationPercent: 33,
            conversionsCount: 1120,
            conversionRatePercent: 13.8,
            clickThroughRatePercent: 28.4,
            revenueDeltaPercent: 18.2,
          },
          {
            id: "var_m3",
            variantName: "Adım 3: İnteraktif Bütçe Kartları",
            trafficAllocationPercent: 34,
            conversionsCount: 980,
            conversionRatePercent: 12.1,
            clickThroughRatePercent: 25.1,
            revenueDeltaPercent: 12.4,
          },
        ],
      },
      {
        id: "exp_103",
        experimentName: "Apple Pay & Instant Escrow Ödeme Canary Sürümü",
        type: "CANARY_RELEASE",
        status: "RUNNING",
        targetMetric: "REVENUE",
        sampleSizeTotal: 8900,
        confidenceScorePercent: 96.8,
        aiWinnerPrediction: "Sadece %10 Canary trafiğine açılan instant Apple Pay seçeneği sepet terk etmeyi %34 düşürdü.",
        aiImpactSummary: "Sıfır hata/canary rollback oranı doğrulandı.",
        startedAt: new Date("2026-07-25"),
        variants: [
          {
            id: "var_c1",
            variantName: "Canary Group (%10 iOS Kullanıcıları)",
            trafficAllocationPercent: 10,
            conversionsCount: 420,
            conversionRatePercent: 18.4,
            clickThroughRatePercent: 34.2,
            revenueDeltaPercent: 34.0,
          },
        ],
      },
    ];
  }

  /**
   * WedyAI Deney ve A/B Test Öneri Motoru
   */
  public static suggestNewExperiment(pageTopic: string): {
    suggestedExperimentName: string;
    hypothesis: string;
    expectedImpactGmv: string;
  } {
    return {
      suggestedExperimentName: `${pageTopic} - WedyAI Anında Fiyat Teklifi Butonu A/B Testi`,
      hypothesis: "Mekan detay sayfalarında 'Anında Teklif Al' yerine 'WedyAI İle Bütçene Göre Teklif Al' yazılması CTR oranını artıracaktır.",
      expectedImpactGmv: "+₺320.000 TL Aylık Dönüşüm Artışı",
    };
  }
}