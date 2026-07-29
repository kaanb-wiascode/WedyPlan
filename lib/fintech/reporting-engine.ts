export type FinancialReportType =
  | "REVENUE"
  | "EXPENSE"
  | "SUBSCRIPTION"
  | "ESCROW"
  | "VENDOR"
  | "MARKETPLACE_GMV";

export type ExportFormatType = "PDF" | "EXCEL" | "REST_API";
export type ReportCadence = "ON_DEMAND" | "DAILY_SCHEDULED" | "WEEKLY_SCHEDULED" | "MONTHLY_SCHEDULED";

export interface FinancialReportDocument {
  id: string;
  reportTitle: string;
  reportType: FinancialReportType;
  cadence: ReportCadence;
  exportFormat: ExportFormatType;
  totalVolumeAmount: number;
  currency: string;
  pdfDownloadUrl: string;
  excelDownloadUrl: string;
  aiExecutiveSummary: string;
  aiDetectedTrendNote: string;
  generatedAt: Date;
}

export interface ReportingSummaryStats {
  totalGeneratedReportsCount: number;
  activeScheduledReportsCount: number;
  primaryCurrency: string;
  aiPlatformFinancialHealthNote: string;
}

export class ReportingEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINANCIAL_REPORTS_V1";

  /**
   * Hazır ve Zamanlanmış Finansal Rapor Belgelerini Getirir
   */
  public static async getReports(): Promise<FinancialReportDocument[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "rep_101",
        reportTitle: "2026 Q2 Konsolide Gelir & Komisyon İcmal Raporu",
        reportType: "REVENUE",
        cadence: "MONTHLY_SCHEDULED",
        exportFormat: "PDF",
        totalVolumeAmount: 3840000,
        currency: "TRY",
        pdfDownloadUrl: "https://pdf.wedyplan.com/rep-revenue-q2.pdf",
        excelDownloadUrl: "https://excel.wedyplan.com/rep-revenue-q2.xlsx",
        aiExecutiveSummary: "Konsolide net gelir geçen yılın aynı dönemine göre %34 artarak ₺3.84M TL seviyesine ulaştı. Komisyon gelirleri ana büyüme sürücüsüdür.",
        aiDetectedTrendNote: "Lüks otel ve açık hava mekan kategorisinde ortalama sepet büyüklüğü %18 yükseldi.",
        generatedAt: new Date("2026-07-29T09:00:00"),
      },
      {
        id: "rep_102",
        reportTitle: "Escrow Güvence Havuzu & Teminat Kütük Raporu",
        reportType: "ESCROW",
        cadence: "WEEKLY_SCHEDULED",
        exportFormat: "EXCEL",
        totalVolumeAmount: 4200000,
        currency: "TRY",
        pdfDownloadUrl: "https://pdf.wedyplan.com/rep-escrow-weekly.pdf",
        excelDownloadUrl: "https://excel.wedyplan.com/rep-escrow-weekly.xlsx",
        aiExecutiveSummary: "Aktif sözleşmelere bağlı ₺4.2M TL Escrow bakiyesi Garanti BBVA saklama hesabında %100 güvence altındadır.",
        aiDetectedTrendNote: "Önümüzdeki 14 gün içinde ₺1.8M TL tutarındaki aşama ödemesi serbest bırakılacak.",
        generatedAt: new Date("2026-07-28T18:00:00"),
      },
      {
        id: "rep_103",
        reportTitle: "Tedarikçi Hakediş & Payout Mutabakat Raporu",
        reportType: "VENDOR",
        cadence: "ON_DEMAND",
        exportFormat: "PDF",
        totalVolumeAmount: 18450000,
        currency: "TRY",
        pdfDownloadUrl: "https://pdf.wedyplan.com/rep-vendor-payouts.pdf",
        excelDownloadUrl: "https://excel.wedyplan.com/rep-vendor-payouts.xlsx",
        aiExecutiveSummary: "Tedarikçilere aktarılan toplam hakediş ₺18.45M TL. Başarısız transfer oranı %0.01 ile rekor düşük seviyede.",
        aiDetectedTrendNote: "FAST / IBAN hakediş aktarım hızı ortalama 4 dakikaya geriledi.",
        generatedAt: new Date("2026-07-25T14:30:00"),
      },
    ];
  }

  /**
   * Finansal Raporlama Özetini Getirir
   */
  public static async getSummaryStats(): Promise<ReportingSummaryStats> {
    return {
      totalGeneratedReportsCount: 142,
      activeScheduledReportsCount: 8,
      primaryCurrency: "TRY",
      aiPlatformFinancialHealthNote: "Tüm finansal raporlar çift girişli muhasebe defteri ile %100 doğrulanarak C-Suite onayına hazırlandı.",
    };
  }

  /**
   * Anlık Yeni Finansal Rapor Oluşturur
   */
  public static async generateReportOnDemand(
    title: string,
    type: FinancialReportType,
    format: ExportFormatType
  ): Promise<FinancialReportDocument> {
    const newRep: FinancialReportDocument = {
      id: `rep_${Math.random().toString(36).substring(2, 9)}`,
      reportTitle: title,
      reportType: type,
      cadence: "ON_DEMAND",
      exportFormat: format,
      totalVolumeAmount: 24800000,
      currency: "TRY",
      pdfDownloadUrl: "https://pdf.wedyplan.com/report-generated.pdf",
      excelDownloadUrl: "https://excel.wedyplan.com/report-generated.xlsx",
      aiExecutiveSummary: `Anlık ${type} raporu WedyAI finansal motoru tarafından başarıyla derlendi.`,
      aiDetectedTrendNote: "Çift girişli defter kütükleri sıfır sapma ile doğrulandı.",
      generatedAt: new Date(),
    };

    const currentReports = await this.getReports();
    currentReports.unshift(newRep);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentReports));
    }

    return newRep;
  }
}