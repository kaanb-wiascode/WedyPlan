export type ContentModality =
  | "TEXT"
  | "VOICE"
  | "IMAGES"
  | "DOCUMENTS"
  | "PDF"
  | "VIDEO"
  | "AUDIO"
  | "STRUCTURED_DATA";

export interface MultimodalAnalysisRecord {
  id: string;
  primaryModality: ContentModality;
  sourceFileName: string;
  extractedTextSummary: string;
  ocrConfidencePercent: number; // 0-100%
  extractedEntitiesCount: number;
  fusedContextTokensCount: number;
  aiModalityAlignmentScorePercent: number; // 0-100%
  aiProcessingTip: string;
  processedAt: Date;
}

export interface MultimodalPlatformSummary {
  totalProcessedFilesCount: number;
  supportedModalitiesCount: number;
  averageOcrAccuracyPercent: number;
  crossModalFusionLatencyMs: number;
  aiMultimodalInsightNote: string;
}

export class AiMultimodalEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_MULTIMODAL_V1";

  /**
   * Multimodal Analiz Kayıtlarını Getirir
   */
  public static async getAnalysisRecords(): Promise<MultimodalAnalysisRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "mm_101",
        primaryModality: "PDF",
        sourceFileName: "Ciragan_Palace_2027_SLA_Contract.pdf",
        extractedTextSummary: "4 sayfalık Escrow sözleşmesi: %20 kapora, 48 saat önce %80 hakediş serbest bırakma maddeleri doğrulandı.",
        ocrConfidencePercent: 99.8,
        extractedEntitiesCount: 18,
        fusedContextTokensCount: 2450,
        aiModalityAlignmentScorePercent: 99.4,
        aiProcessingTip: "PDF sözleşmesindeki finansal maddeler Phase 11 Escrow kurallarıyla %100 eşleşti.",
        processedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "mm_102",
        primaryModality: "IMAGES",
        sourceFileName: "Bosphorus_Venue_Moodboard_Concept.jpg",
        extractedTextSummary: "Görsel Analizi: Modern-Elegant Boğaz düğün konsepti, beyaz floral aranjmanlar, şeffaf Napolyon sandalyeler.",
        ocrConfidencePercent: 96.5,
        extractedEntitiesCount: 12,
        fusedContextTokensCount: 1820,
        aiModalityAlignmentScorePercent: 98.2,
        aiProcessingTip: "Görsel tema dekorasyon tedarikçi kataloğuna eklendi.",
        processedAt: new Date("2026-07-29T19:45:00"),
      },
      {
        id: "mm_103",
        primaryModality: "VIDEO",
        sourceFileName: "Bodrum_Luxury_Resort_Walkthrough.mp4",
        extractedTextSummary: "Video Özeti: 250 kişilik açık hava iskelesi, helikopter pisti ve 3 VIP gelin odası tespit edildi.",
        ocrConfidencePercent: 94.2,
        extractedEntitiesCount: 8,
        fusedContextTokensCount: 3100,
        aiModalityAlignmentScorePercent: 97.5,
        aiProcessingTip: "Video spatial analizi mekan kapasiye alanını doğruladı.",
        processedAt: new Date("2026-07-29T18:15:00"),
      },
    ];
  }

  /**
   * Multimodal Platform Özetini Getirir
   */
  public static async getSummary(): Promise<MultimodalPlatformSummary> {
    return {
      totalProcessedFilesCount: 3840,
      supportedModalitiesCount: 8,
      averageOcrAccuracyPercent: 99.2,
      crossModalFusionLatencyMs: 42,
      aiMultimodalInsightNote: "Çapraz-Modal Akıl Yürütme (Cross-Modal Reasoning) motoru metin, ses, görsel ve PDF verilerini 42ms sürede vektörel bağlama dönüştürmektedir.",
    };
  }

  /**
   * Yeni Dosya Yükleme & Analiz Simülasyonu
   */
  public static async processMultimodalFile(
    modality: ContentModality,
    fileName: string,
    summaryText: string
  ): Promise<MultimodalAnalysisRecord> {
    const newRecord: MultimodalAnalysisRecord = {
      id: `mm_${Math.random().toString(36).substring(2, 9)}`,
      primaryModality: modality,
      sourceFileName: fileName,
      extractedTextSummary: summaryText,
      ocrConfidencePercent: 98.5,
      extractedEntitiesCount: 10,
      fusedContextTokensCount: 1950,
      aiModalityAlignmentScorePercent: 98.8,
      aiProcessingTip: "Yapay zeka çoklu-modal bağlam birleştirmeyi otonom tamamladı.",
      processedAt: new Date(),
    };

    const records = await this.getAnalysisRecords();
    records.unshift(newRecord);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }

    return newRecord;
  }
}