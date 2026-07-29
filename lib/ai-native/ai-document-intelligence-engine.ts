export type BusinessDocumentType =
  | "CONTRACTS"
  | "INVOICES"
  | "OFFERS"
  | "IDENTITY_DOCUMENTS"
  | "RECEIPTS"
  | "FORMS"
  | "POLICIES";

export interface ExtractedClauseItem {
  clauseTag: string; // e.g. "ESCROW_PAYOUT", "CANCELLATION_PENALTY", "FORCE_MAJEURE"
  originalText: string;
  riskAssessment: "LOW_RISK" | "MEDIUM_RISK" | "CRITICAL_RISK";
  aiExplanation: string;
}

export interface DocumentIntelligenceRecord {
  id: string;
  documentType: BusinessDocumentType;
  title: string;
  versionTag: string; // e.g. "v1.2"
  ocrQualityPercent: number;
  extractedFields: Record<string, string | number>;
  detectedClauses: ExtractedClauseItem[];
  isDuplicateDetected: boolean;
  overallRiskScorePercent: number; // 0-100% (High means safe)
  aiExecutiveSummary: string;
  uploadedAt: Date;
}

export interface DocumentIntelligenceSummary {
  totalProcessedDocumentsCount: number;
  averageOcrAccuracyPercent: number;
  flaggedRiskClausesCount: number;
  duplicateDocumentsBlockedCount: number;
  aiDocumentInsightNote: string;
}

export class AiDocumentIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_DOCUMENT_INTELLIGENCE_V1";

  /**
   * Doküman Analiz Kayıtlarını Getirir
   */
  public static async getDocumentRecords(): Promise<DocumentIntelligenceRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "doc_101",
        documentType: "CONTRACTS",
        title: "Çırağan Palace Düğün SLA Sözleşmesi",
        versionTag: "v1.2",
        ocrQualityPercent: 99.6,
        extractedFields: {
          "Mekan": "Çırağan Palace Kempinski",
          "ToplamTutar": "₺2,500,000 TRY",
          "DepozitoOrani": "%20",
          "EtkinlikTarihi": "2027-08-15",
        },
        detectedClauses: [
          {
            clauseTag: "ESCROW_PAYOUT",
            originalText: "Düğün gününden 48 saat önce %80 hakediş serbest bırakılır.",
            riskAssessment: "LOW_RISK",
            aiExplanation: "Phase 11 Escrow standartlarına %100 uygundur.",
          },
          {
            clauseTag: "CANCELLATION_PENALTY",
            originalText: "30 gün kala iptallerde %50 cezai şart uygulanır.",
            riskAssessment: "MEDIUM_RISK",
            aiExplanation: "Standart pazaryeri iptal kuralının %10 üzerindedir.",
          },
        ],
        isDuplicateDetected: false,
        overallRiskScorePercent: 96.5,
        aiExecutiveSummary: "Sözleşme Escrow kurallarına uygundur. İptal cezası maddesi dışında finansal risk içermemektedir.",
        uploadedAt: new Date("2026-07-29T20:15:00"),
      },
      {
        id: "doc_102",
        documentType: "INVOICES",
        title: "E-Fatura #INV-2026-09481 - Catering Hizmeti",
        versionTag: "v1.0",
        ocrQualityPercent: 99.8,
        extractedFields: {
          "Firma": "Bodrum Catering Ltd.",
          "FaturaTutar": "₺380,000 TRY",
          "KDV": "%20",
          "VKN": "1940827391",
        },
        detectedClauses: [],
        isDuplicateDetected: false,
        overallRiskScorePercent: 99.2,
        aiExecutiveSummary: "GİB E-Fatura doğrulaması ve VKN kaydı başarıyla doğrulandı.",
        uploadedAt: new Date("2026-07-29T19:40:00"),
      },
      {
        id: "doc_103",
        documentType: "IDENTITY_DOCUMENTS",
        title: "Müşteri Kimlik Doğrulama Belgesi (T.C. Kimlik)",
        versionTag: "v1.0",
        ocrQualityPercent: 98.9,
        extractedFields: {
          "AdSoyad": "Sena Kaan",
          "TCKN": "*****************",
          "DoğrulamaDurumu": "e-Devlet Verified",
        },
        detectedClauses: [],
        isDuplicateDetected: false,
        overallRiskScorePercent: 100,
        aiExecutiveSummary: "Kimlik doğrulaması e-Devlet ve Phase 12 Global Identity kalkanı ile onaylandı.",
        uploadedAt: new Date("2026-07-29T18:30:00"),
      },
    ];
  }

  /**
   * Doküman Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DocumentIntelligenceSummary> {
    return {
      totalProcessedDocumentsCount: 2480,
      averageOcrAccuracyPercent: 99.4,
      flaggedRiskClausesCount: 14,
      duplicateDocumentsBlockedCount: 8,
      aiDocumentInsightNote: "Doküman AI motoru %99.4 OCR kalitesiyle sözleşme, fatura ve kimlik belgelerindeki kritik maddeleri ve mükerrer kayıtları otonom tespit etmektedir.",
    };
  }

  /**
   * Yeni Doküman Analiz Simülasyonu
   */
  public static async processDocument(
    type: BusinessDocumentType,
    title: string,
    rawText: string
  ): Promise<DocumentIntelligenceRecord> {
    const newDoc: DocumentIntelligenceRecord = {
      id: `doc_${Math.random().toString(36).substring(2, 9)}`,
      documentType: type,
      title,
      versionTag: "v1.0",
      ocrQualityPercent: 99.1,
      extractedFields: {
        "DokümanTipi": type,
        "AnalizStatüsü": "Tamamlandı",
      },
      detectedClauses: [
        {
          clauseTag: "GENERAL_TERMS",
          originalText: rawText.substring(0, 80) + "...",
          riskAssessment: "LOW_RISK",
          aiExplanation: "Madde tespiti başarıyla gerçekleştirildi.",
        },
      ],
      isDuplicateDetected: false,
      overallRiskScorePercent: 98.0,
      aiExecutiveSummary: "Yapay zeka doküman analizi tamamlandı ve veri alanları çıkarıldı.",
      uploadedAt: new Date(),
    };

    const records = await this.getDocumentRecords();
    records.unshift(newDoc);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }

    return newDoc;
  }
}