export type DepartmentDashboardType =
  | "EXECUTIVE"
  | "SALES"
  | "MARKETING"
  | "FINANCE"
  | "MARKETPLACE"
  | "OPERATIONS"
  | "CUSTOMER_SUCCESS";

export type ReportExportFormat = "PDF" | "XLSX" | "CSV" | "INTERACTIVE_CANVAS";

export interface DepartmentalReportRecord {
  id: string;
  reportTitle: string; // e.g. "Executive Q3 GMV & Escrow Yield Analysis"
  department: DepartmentDashboardType;
  primaryMetricHeadline: string; // e.g. "$18.4M GMV"
  metricGrowthPercent: number; // e.g. +34.2%
  drillDownDepthLevelsCount: number;
  scheduledFrequency: "DAILY" | "WEEKLY" | "MONTHLY" | "REAL_TIME";
  aiGeneratedNarrativeSummary: string;
  aiTrendForecastNote: string;
  lastGeneratedAt: Date;
}

export interface BusinessIntelligencePlatformSummary {
  totalActiveReportsCount: number;
  activeDepartmentDashboardsCount: number;
  totalScheduledExports24h: number;
  averageDrillDownQueryTimeMs: number;
  aiBiInsightNote: string;
}

export class BusinessIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_BI_PLATFORM_V1";

  /**
   * Departman Rapor Kayıtlarını Getirir
   */
  public static async getReports(): Promise<DepartmentalReportRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "rep_101",
        reportTitle: "Executive Q3 GMV & Escrow Net Yield Briefing",
        department: "EXECUTIVE",
        primaryMetricHeadline: "$18.4M USD (Gross Market Volume)",
        metricGrowthPercent: 34.2,
        drillDownDepthLevelsCount: 4,
        scheduledFrequency: "DAILY",
        aiGeneratedNarrativeSummary: "Yaz dönemi düğün rezervasyonları Körfez (KSA/UAE) ve Bodrum destinasyonlarında %34.2 büyüme kaydetmiştir.",
        aiTrendForecastNote: "Önümüzdeki çeyrekte Escrow kilitli fon hacminin $22M USD sınırını aşması öngörülmektedir.",
        lastGeneratedAt: new Date("2026-07-29T22:40:00"),
      },
      {
        id: "rep_102",
        reportTitle: "Marketplace Vendor SLA & Escalation Analysis",
        department: "MARKETPLACE",
        primaryMetricHeadline: "%99.8 SLA Uyum Oranı",
        metricGrowthPercent: 1.8,
        drillDownDepthLevelsCount: 3,
        scheduledFrequency: "WEEKLY",
        aiGeneratedNarrativeSummary: "Çırağan Palace ve Sait Halim Paşa Yalısı gibi lüks mekanlar ortalama 14ms yanıt süresiyle en yüksek SLA skoru yakalamıştır.",
        aiTrendForecastNote: "Tedarikçi yanıt süreleri geçen aya göre %12 iyileşmiştir.",
        lastGeneratedAt: new Date("2026-07-29T22:25:00"),
      },
      {
        id: "rep_103",
        reportTitle: "Finance & Tax Compliance Audit Ledger",
        department: "FINANCE",
        primaryMetricHeadline: "$1.84M KDV / Tax Matrahı",
        metricGrowthPercent: 12.5,
        drillDownDepthLevelsCount: 5,
        scheduledFrequency: "DAILY",
        aiGeneratedNarrativeSummary: "Phase 11 Escrow Defteri ile Phase 12 Vergi Katmanı %100 mutabakat sağlamıştır.",
        aiTrendForecastNote: "Çift taraflı muhasebe fişlerinde sıfır çakışma (zero mismatch) raporlanmıştır.",
        lastGeneratedAt: new Date("2026-07-29T22:15:00"),
      },
    ];
  }

  /**
   * BI Platform Özetini Getirir
   */
  public static async getSummary(): Promise<BusinessIntelligencePlatformSummary> {
    return {
      totalActiveReportsCount: 24,
      activeDepartmentDashboardsCount: 7,
      totalScheduledExports24h: 142,
      averageDrillDownQueryTimeMs: 14.2,
      aiBiInsightNote: "WedyAI Trend ve Anlatı Motoru 7 departman panosu için günlük otonom narrative özetler derlemekte ve %34.2 büyüme trendi doğrulamaktadır.",
    };
  }

  /**
   * Raporu Dışa Aktarma (Export Report) Simülasyonu
   */
  public static async exportReport(reportId: string, format: ReportExportFormat): Promise<boolean> {
    const reports = await this.getReports();
    const idx = reports.findIndex((r) => r.id === reportId);

    if (idx !== -1) {
      reports[idx].lastGeneratedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
      }
      return true;
    }
    return false;
  }
}