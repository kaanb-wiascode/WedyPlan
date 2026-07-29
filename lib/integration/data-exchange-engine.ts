export type DataExchangeFormat = "JSON" | "CSV" | "XML" | "EXCEL_XLSX";
export type DataExchangeJobDirection = "IMPORT" | "EXPORT";
export type DataExchangeJobStatus = "COMPLETED" | "RUNNING" | "SCHEDULED" | "VALIDATION_ALERT";

export interface DataExchangeJobRecord {
  id: string;
  jobTitle: string; // e.g. "Bodrum Venues Bulk Inventory Import"
  direction: DataExchangeJobDirection;
  format: DataExchangeFormat;
  targetSystemOrCloudBucket: string;
  recordsProcessedCount: number;
  fileSizeBytesMb: number;
  isEncrypted: boolean; // AES-256 / PGP
  isCompressed: boolean; // GZIP / ZIP
  status: DataExchangeJobStatus;
  aiSchemaMappingAccuracyPercent: number; // 0-100%
  aiValidationTip: string;
  executedAt: Date;
}

export interface DataExchangePlatformSummary {
  totalExchangedVolumeMb24h: number;
  totalProcessedRecords24h: number;
  activeScheduledJobsCount: number;
  averageSchemaMappingAccuracyPercent: number;
  aiDataExchangeInsightNote: string;
}

export class DataExchangeEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_EXCHANGE_V1";

  /**
   * Veri Değişim İş Kayıtlarını Getirir
   */
  public static async getJobs(): Promise<DataExchangeJobRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "dex_101",
        jobTitle: "Bodrum & Çırağan VIP Mekan Envanter İçe Aktarımı",
        direction: "IMPORT",
        format: "EXCEL_XLSX",
        targetSystemOrCloudBucket: "wedyplan-wedding-media-prod",
        recordsProcessedCount: 4200,
        fileSizeBytesMb: 14.8,
        isEncrypted: true,
        isCompressed: true,
        status: "COMPLETED",
        aiSchemaMappingAccuracyPercent: 99.6,
        aiValidationTip: "Excel sütunları (Mekan_Adi -> venueName, Kapasite -> capacity) %99.6 doğrulukla otonom eşleşti.",
        executedAt: new Date("2026-07-29T22:15:00"),
      },
      {
        id: "dex_102",
        jobTitle: "Phase 11 Escrow Aylık Finans Mutabakat Dışa Aktarımı",
        direction: "EXPORT",
        format: "JSON",
        targetSystemOrCloudBucket: "SAP S/4HANA Finance Endpoint",
        recordsProcessedCount: 18400,
        fileSizeBytesMb: 42.2,
        isEncrypted: true,
        isCompressed: true,
        status: "COMPLETED",
        aiSchemaMappingAccuracyPercent: 100.0,
        aiValidationTip: "JSON şeması UBL 2.1 ve Phase 11 Çift Taraflı Defter standartlarıyla %100 uyumlu.",
        executedAt: new Date("2026-07-29T21:45:00"),
      },
      {
        id: "dex_103",
        jobTitle: "Tedarikçi Fiyat Listesi Toplu CSV Güncellemesi",
        direction: "IMPORT",
        format: "CSV",
        targetSystemOrCloudBucket: "S3 /vendor-uploads/csv/",
        recordsProcessedCount: 12500,
        fileSizeBytesMb: 8.4,
        isEncrypted: false,
        isCompressed: false,
        status: "COMPLETED",
        aiSchemaMappingAccuracyPercent: 98.4,
        aiValidationTip: "Fiyat alanında tespit edilen 3 hatalı para birimi simgesi otonom TRY cinsine dönüştürüldü.",
        executedAt: new Date("2026-07-29T21:00:00"),
      },
    ];
  }

  /**
   * Veri Değişim Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DataExchangePlatformSummary> {
    return {
      totalExchangedVolumeMb24h: 1845.0,
      totalProcessedRecords24h: 35100,
      activeScheduledJobsCount: 8,
      averageSchemaMappingAccuracyPercent: 99.3,
      aiDataExchangeInsightNote: "WedyAI Şema Haritalama Motoru 35.1K işlenmiş kaydı %99.3 doğrulukla dönüştürmüş, PGP/AES-256 şifrelemeyle güvenli aktarım sağlamıştır.",
    };
  }

  /**
   * Manuel Veri Değişim İşini Tetikleme Simülasyonu
   */
  public static async triggerExchangeJob(jobId: string): Promise<boolean> {
    const jobs = await this.getJobs();
    const idx = jobs.findIndex((j) => j.id === jobId);

    if (idx !== -1) {
      jobs[idx].status = "COMPLETED";
      jobs[idx].executedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
      }
      return true;
    }
    return false;
  }
}