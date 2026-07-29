export type ExecutivePersonaRole = "CEO" | "COO" | "CTO" | "CFO" | "CMO" | "CIO";

export interface StrategicKpiItem {
  kpiKey: string;
  kpiName: string;
  valueDisplay: string; // e.g. "$18.4M USD"
  targetDisplay: string; // e.g. "$20.0M USD"
  changePercent: number; // e.g. +34.2%
  status: "ON_TRACK" | "EXCEEDING" | "NEEDS_ATTENTION";
}

export interface ExecutivePersonaViewData {
  role: ExecutivePersonaRole;
  title: string;
  primaryMetricHeadline: string;
  primaryMetricValue: string;
  kpiList: StrategicKpiItem[];
  aiExecutiveBriefing: string;
  aiStrategicRecommendation: string;
  aiForecast12MonthCurve: string;
  lastUpdated: Date;
}

export interface ExecutivePlatformSummary {
  enterpriseReadinessScorePercent: number;
  overallStrategicKpiPassRatePercent: number;
  activeBoardReportsGenerated24h: number;
  aiExecutiveGlobalSummaryNote: string;
}

export class ExecutiveIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_EXECUTIVE_INTELLIGENCE_V1";

  /**
   * C-Level Yönetici Rolü Verisini Getirir
   */
  public static async getPersonaData(role: ExecutivePersonaRole): Promise<ExecutivePersonaViewData> {
    switch (role) {
      case "CEO":
        return {
          role: "CEO",
          title: "Chief Executive Officer Dashboard",
          primaryMetricHeadline: "Toplam Ekosistem GMV",
          primaryMetricValue: "$18.4M USD",
          kpiList: [
            { kpiKey: "gmv", kpiName: "Brüt Pazaryeri Hacmi (GMV)", valueDisplay: "$18.4M USD", targetDisplay: "$20.0M USD", changePercent: 34.2, status: "EXCEEDING" },
            { kpiKey: "partners", kpiName: "Sertifikalı Stratejik Partner", valueDisplay: "18 Partner", targetDisplay: "20 Partner", changePercent: 20.0, status: "ON_TRACK" },
            { kpiKey: "net_yield", kpiName: "Net Escrow Gelir Marjı", valueDisplay: "%11.8", targetDisplay: "%12.0", changePercent: 1.5, status: "ON_TRACK" },
          ],
          aiExecutiveBriefing: "WedyPlan platformu BAE ve Türkiye lüks düğün pazarında %34.2 büyümeyle $18.4M GMV büyüklüğüne ulaşmıştır.",
          aiStrategicRecommendation: "Körfez bölgesindeki Lüks Mekan partnerliği lansmanını Q4 hedeflerinden öne çekerek GMV'yi $22M seviyesine taşıyın.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: $32.5M USD GMV (%96.2 Güven Skoru)",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
      case "CFO":
        return {
          role: "CFO",
          title: "Chief Financial Officer Dashboard",
          primaryMetricHeadline: "Kilitli Escrow Fon Hacmi",
          primaryMetricValue: "$22.4M USD",
          kpiList: [
            { kpiKey: "escrow_locked", kpiName: "Phase 11 Escrow Kilitli Fon", valueDisplay: "$22.4M USD", targetDisplay: "$25.0M USD", changePercent: 28.4, status: "EXCEEDING" },
            { kpiKey: "ledger_match", kpiName: "Çift Taraflı Mutabakat", valueDisplay: "%100.0", targetDisplay: "%100.0", changePercent: 0.0, status: "ON_TRACK" },
            { kpiKey: "tax_payout", kpiName: "Vergi / e-Fatura Matrahı", valueDisplay: "$1.84M USD", targetDisplay: "$2.0M USD", changePercent: 15.2, status: "ON_TRACK" },
          ],
          aiExecutiveBriefing: "Escrow kilitli fonlar $22.4M seviyesinde olup Phase 11 çift taraflı defter kayıtlarıyla %100 sıfır sapmayla eşleşmiştir.",
          aiStrategicRecommendation: "AB eIDAS e-Fatura entegrasyonu tamamlandığından sınır ötesi KDV iade sürelerini 48 saate indirin.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: $38.0M USD Escrow Kilitli Fon",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
      case "CTO":
        return {
          role: "CTO",
          title: "Chief Technology Officer Dashboard",
          primaryMetricHeadline: "Global Platform Availability",
          primaryMetricValue: "%99.99 Uptime",
          kpiList: [
            { kpiKey: "uptime", kpiName: "Erişilebilirlik SLA", valueDisplay: "%99.99", targetDisplay: "%99.99", changePercent: 0.01, status: "EXCEEDING" },
            { kpiKey: "gateway_lat", kpiName: "API Gateway Latency", valueDisplay: "14.6 ms", targetDisplay: "< 20 ms", changePercent: -12.4, status: "EXCEEDING" },
            { kpiKey: "feature_lat", kpiName: "Feature Store Online Latency", valueDisplay: "2.8 ms", targetDisplay: "< 5 ms", changePercent: -18.0, status: "EXCEEDING" },
          ],
          aiExecutiveBriefing: "Altyapı 3 coğrafi bölgede (Frankfurt, Dubai, N. Virginia) sıfır kesinti ve 14.6ms ortalama gecikmeyle çalışmaktadır.",
          aiStrategicRecommendation: "Otonom Self-Healing motorunu Edge CDN düğümlerine yayarak pazar yeri yüklenme hızını %10 artırın.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: 5.2ms Ortalama Global Response Time",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
      case "COO":
        return {
          role: "COO",
          title: "Chief Operating Officer Dashboard",
          primaryMetricHeadline: "Mekan & Tedarikçi SLA Uyum Oranı",
          primaryMetricValue: "%99.8 SLA",
          kpiList: [
            { kpiKey: "vendor_sla", kpiName: "Tedarikçi SLA Skoru", valueDisplay: "%99.8", targetDisplay: "%99.0", changePercent: 0.8, status: "EXCEEDING" },
            { kpiKey: "escalation", kpiName: "Açık Olay / Escalation", valueDisplay: "0 Incidents", targetDisplay: "0 Incidents", changePercent: 0.0, status: "ON_TRACK" },
            { kpiKey: "fulfill", kpiName: "Rezervasyon Karşılama Oranı", valueDisplay: "%98.6", targetDisplay: "%98.0", changePercent: 1.2, status: "ON_TRACK" },
          ],
          aiExecutiveBriefing: "Operasyonel süreçlerde 18 sertifikalı partnerin tamamı belirlenen SLA hedeflerini aşmıştır.",
          aiStrategicRecommendation: "Yoğun sezon öncesi Bodrum ve İstanbul Lüks Düğün Lojistiği için otonom görev devirlerini %20 artırın.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: %99.9 Operasyonel Karşılama Oranı",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
      case "CMO":
        return {
          role: "CMO",
          title: "Chief Marketing Officer Dashboard",
          primaryMetricHeadline: "LTV / CAC Oranı",
          primaryMetricValue: "4.8x LTV/CAC",
          kpiList: [
            { kpiKey: "ltv_cac", kpiName: "Büyüme Verimliliği (LTV/CAC)", valueDisplay: "4.8x", targetDisplay: "4.0x", changePercent: 20.0, status: "EXCEEDING" },
            { kpiKey: "couples", kpiName: "Aktif Çift Sayısı", valueDisplay: "4,200 Çift", targetDisplay: "4,000 Çift", changePercent: 12.5, status: "ON_TRACK" },
            { kpiKey: "csat", kpiName: "Müşteri CSAT Puanı", valueDisplay: "4.9 / 5.0", targetDisplay: "4.8 / 5.0", changePercent: 2.1, status: "EXCEEDING" },
          ],
          aiExecutiveBriefing: "Pazarlama edinim verimliliği 4.8x LTV/CAC ile sektör ortalamasının 2 katı performans göstermektedir.",
          aiStrategicRecommendation: "Yapay zeka kişiselleştirmeli davetiye kampanyalarını BAE pazarında genişleterek dönüşüm oranını artırın.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: 5.4x LTV/CAC Büyüme Katsayısı",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
      case "CIO":
        return {
          role: "CIO",
          title: "Chief Information Officer Dashboard",
          primaryMetricHeadline: "Veri Yönetişim & Uyum Skoru",
          primaryMetricValue: "%99.7 Governance",
          kpiList: [
            { kpiKey: "gov_score", kpiName: "Veri Yönetişimi Uyum Skoru", valueDisplay: "%99.7", targetDisplay: "%99.5", changePercent: 0.2, status: "EXCEEDING" },
            { kpiKey: "pii_protected", kpiName: "Maskeli PII Alanı", valueDisplay: "850 Alan", targetDisplay: "800 Alan", changePercent: 6.2, status: "ON_TRACK" },
            { kpiKey: "scim_users", kpiName: "Federated Identity Kullanıcısı", valueDisplay: "5,160 User", targetDisplay: "5,000 User", changePercent: 3.2, status: "ON_TRACK" },
          ],
          aiExecutiveBriefing: "Kurumsal veri yönetişiminde 142 kataloglanan varlık %99.7 uyum skoruyla SOC2 Type II ve GDPR standartlarındadır.",
          aiStrategicRecommendation: "Master Data Management (MDM) Golden Record erişimlerini SCIM 2.0 üzerinden otonom denetlemeye devam edin.",
          aiForecast12MonthCurve: "12 Aylık Tahmin: %99.9 Veri Yönetişim ve Sıfır Güvenlik İhlali",
          lastUpdated: new Date("2026-07-29T23:00:00"),
        };
    }
  }

  /**
   * Yönetici Platform Özetini Getirir
   */
  public static async getSummary(): Promise<ExecutivePlatformSummary> {
    return {
      enterpriseReadinessScorePercent: 99.8,
      overallStrategicKpiPassRatePercent: 100.0,
      activeBoardReportsGenerated24h: 18,
      aiExecutiveGlobalSummaryNote: "WedyAI Yönetici Özet Motoru 6 C-Level personası için $18.4M GMV, %99.99 Uptime ve %99.7 Veri Yönetişimi ile tam kurumsal hazırlık mühürlemiştir.",
    };
  }

  /**
   * Board Rapor Paketi (Executive Board Report Package) Derleme Simülasyonu
   */
  public static async generateBoardReportPackage(role: ExecutivePersonaRole): Promise<boolean> {
    if (typeof window !== "undefined") {
      const reportKey = `BOARD_REPORT_${role}_${new Date().toISOString()}`;
      localStorage.setItem(reportKey, JSON.stringify({ generated: true, timestamp: new Date() }));
    }
    return true;
  }
}