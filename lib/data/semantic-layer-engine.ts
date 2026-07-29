export type SemanticDomainType =
  | "SALES"
  | "FINANCE"
  | "MARKETING"
  | "MARKETPLACE"
  | "OPERATIONS"
  | "CUSTOMER_SUCCESS";

export type MetricGovernanceStatus = "GOVERNED_STABLE" | "PENDING_REVIEW" | "DEPRECATED";

export interface SemanticMetricRecord {
  id: string;
  metricKey: string; // e.g. "gross_market_volume_gmv"
  metricDisplayName: string; // e.g. "Brüt Pazaryeri Hacmi (GMV)"
  domain: SemanticDomainType;
  calculationFormulaSql: string; // e.g. "SUM(fact_escrow.deposit_amount_usd)"
  reusableDimensions: string[]; // e.g. ["DimTime", "DimRegion", "DimVendorTier"]
  versionTag: string; // e.g. "v2.0"
  governanceStatus: MetricGovernanceStatus;
  ownerSteward: string;
  aiGlossaryDefinition: string;
  aiRecommendationNote: string;
  lastUpdated: Date;
}

export interface SemanticLayerPlatformSummary {
  totalGovernedMetricsCount: number;
  totalReusableDimensionsCount: number;
  activeSemanticDomainsCount: number;
  aiGlossaryAssistantAccuracyPercent: number;
  aiSemanticInsightNote: string;
}

export class SemanticLayerEngine {
  private static STORAGE_KEY = "WEDYPLAN_SEMANTIC_LAYER_V1";

  /**
   * Semantik Metrik Kayıtlarını Getirir
   */
  public static async getMetrics(): Promise<SemanticMetricRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "sem_101",
        metricKey: "gross_market_volume_gmv",
        metricDisplayName: "Brüt Pazaryeri Hacmi (GMV)",
        domain: "FINANCE",
        calculationFormulaSql: "SUM(FactEscrowTransactions.amount_usd) WHERE status = 'LOCKED'",
        reusableDimensions: ["DimTime", "DimRegion", "DimVendorTier"],
        versionTag: "v2.0",
        governanceStatus: "GOVERNED_STABLE",
        ownerSteward: "Finans Yöneticisi (Finance Steward)",
        aiGlossaryDefinition: "WedyPlan platformu üzerinden kilitlenen ve tamamlanan tüm escrow düğün ödemelerinin toplam USD değeri.",
        aiRecommendationNote: "Tüm BI panoları ve CEO panosu bu semantik metrik tanımını %100 uyumla kullanmaktadır.",
        lastUpdated: new Date("2026-07-29T23:15:00"),
      },
      {
        id: "sem_102",
        metricKey: "vendor_sla_compliance_rate",
        metricDisplayName: "Tedarikçi SLA Uyum Oranı",
        domain: "MARKETPLACE",
        calculationFormulaSql: "COUNT(successful_sla_responses) / COUNT(total_booking_inquiries) * 100",
        reusableDimensions: ["DimVendor", "DimServiceCategory", "DimRegion"],
        versionTag: "v1.2",
        governanceStatus: "GOVERNED_STABLE",
        ownerSteward: "Pazaryeri Yöneticisi (Marketplace Steward)",
        aiGlossaryDefinition: "Tedarikçilerin müşteri taleplerine belirlenen SLA süresi (15 dk) içerisinde dönme yüzdesi.",
        aiRecommendationNote: "Tedarikçi performans puanlamasında tekil doğru kaynak olarak mühürlenmiştir.",
        lastUpdated: new Date("2026-07-29T23:00:00"),
      },
      {
        id: "sem_103",
        metricKey: "customer_acquisition_efficiency_ltv_cac",
        metricDisplayName: "Büyüme Verimliliği (LTV / CAC Ratio)",
        domain: "MARKETING",
        calculationFormulaSql: "AVG(CoupleProfile.lifetime_value_usd) / AVG(Marketing.cac_usd)",
        reusableDimensions: ["DimTime", "DimAcquisitionChannel"],
        versionTag: "v1.0",
        governanceStatus: "GOVERNED_STABLE",
        ownerSteward: "Büyüme Yöneticisi (Growth Steward)",
        aiGlossaryDefinition: "Bir çiftin platforma kazandırdığı ortalama ömür boyu değerin edinim maliyetine oranı.",
        aiRecommendationNote: "LTV/CAC hesabı Phase 15 Feature Store verisiyle canlı senkronize edilmektedir.",
        lastUpdated: new Date("2026-07-29T22:45:00"),
      },
    ];
  }

  /**
   * Semantik Katman Özetini Getirir
   */
  public static async getSummary(): Promise<SemanticLayerPlatformSummary> {
    return {
      totalGovernedMetricsCount: 84,
      totalReusableDimensionsCount: 16,
      activeSemanticDomainsCount: 6,
      aiGlossaryAssistantAccuracyPercent: 99.8,
      aiSemanticInsightNote: "WedyAI İş Sözlüğü Asistanı 84 semantik metriği 6 etki alanında %99.8 tanım doğruluğu ile standartlaştırmıştır.",
    };
  }

  /**
   * Metrik Tanımını Güncelleme & Doğrulama Simülasyonu
   */
  public static async updateMetricGovernance(metricId: string): Promise<boolean> {
    const metrics = await this.getMetrics();
    const idx = metrics.findIndex((m) => m.id === metricId);

    if (idx !== -1) {
      metrics[idx].governanceStatus = "GOVERNED_STABLE";
      metrics[idx].lastUpdated = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(metrics));
      }
      return true;
    }
    return false;
  }
}