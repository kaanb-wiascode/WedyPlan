export type KnowledgeSourceCategory =
  | "DOCUMENTATION"
  | "MARKETPLACE_DATA"
  | "POLICIES"
  | "CONTRACTS"
  | "FAQS"
  | "CRM"
  | "FINANCE"
  | "ANALYTICS";

export interface KnowledgeDocumentChunk {
  id: string;
  sourceCategory: KnowledgeSourceCategory;
  documentTitle: string;
  versionTag: string; // e.g. "v2026.2"
  chunkContent: string;
  citationReferenceKey: string; // e.g. "DOC-KVKK-ART17"
  semanticRelevanceScorePercent: number; // 0-100%
  requiredAgentAccessRole: string; // "PUBLIC" | "FINANCE_ONLY" | "ADMIN_ONLY"
  aiHallucinationShieldScorePercent: number; // 0-100% (High means grounded)
  updatedAt: Date;
}

export interface KnowledgePlatformSummary {
  totalIndexedKnowledgeChunksCount: number;
  activeKnowledgeSourcesCount: number;
  aiGroundingCitationAccuracyPercent: number;
  aiHallucinationReductionRatePercent: number;
  aiKnowledgeInsightNote: string;
}

export class AiKnowledgeEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_KNOWLEDGE_VAULT_V1";

  /**
   * İndekslenmiş Bilgi Dokümanı Parçalarını Getirir
   */
  public static async getKnowledgeChunks(): Promise<KnowledgeDocumentChunk[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "knw_101",
        sourceCategory: "POLICIES",
        documentTitle: "6698 KVKK & AB GDPR Veri İşleme Politikası",
        versionTag: "v2026.1",
        chunkContent: "Kullanıcı açık rızası ve 30 günlük unutulma hakkı (Right to Erasure) otonom olarak veritabanı silme görevleriyle senkronize çalışır.",
        citationReferenceKey: "REF-POL-KVKK-2026",
        semanticRelevanceScorePercent: 99,
        requiredAgentAccessRole: "PUBLIC",
        aiHallucinationShieldScorePercent: 99.8,
        updatedAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "knw_102",
        sourceCategory: "CONTRACTS",
        documentTitle: "Standard Escrow Service Level Agreement (SLA)",
        versionTag: "v2026.2",
        chunkContent: "Düğün gününden 48 saat önce %80 hakediş serbest bırakılır. Kalan %20 tutar çift onayından sonra tedarikçiye aktarılır.",
        citationReferenceKey: "REF-CNT-ESCROW-2026",
        semanticRelevanceScorePercent: 97,
        requiredAgentAccessRole: "FINANCE_ONLY",
        aiHallucinationShieldScorePercent: 99.5,
        updatedAt: new Date("2026-07-28T14:30:00"),
      },
      {
        id: "knw_103",
        sourceCategory: "MARKETPLACE_DATA",
        documentTitle: "İstanbul Lüks Balo Salonları Fiyatlandırma Rehberi",
        versionTag: "v2026.1",
        chunkContent: "Çırağan Palace ve Sait Halim Paşa Yalısı için 2027 sezonsal tavan fiyat aralığı ₺2,000,000 - ₺4,500,000 TRY seviyesindedir.",
        citationReferenceKey: "REF-[#MKT-IST-PRICING]",
        semanticRelevanceScorePercent: 95,
        requiredAgentAccessRole: "PUBLIC",
        aiHallucinationShieldScorePercent: 98.9,
        updatedAt: new Date("2026-07-27T11:20:00"),
      },
    ];
  }

  /**
   * Bilgi Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<KnowledgePlatformSummary> {
    return {
      totalIndexedKnowledgeChunksCount: 4820,
      activeKnowledgeSourcesCount: 8,
      aiGroundingCitationAccuracyPercent: 99.4,
      aiHallucinationReductionRatePercent: 99.8,
      aiKnowledgeInsightNote: "RAG bilgi kütüphanesi alıntı doğrulama (Citation Grounding) sayesinde yapay zeka halüsinasyon oranını %99.8 oranında engellemektedir.",
    };
  }

  /**
   * Yeni Bilgi Dokümanı İndeksleme Simülasyonu
   */
  public static async indexNewDocument(
    category: KnowledgeSourceCategory,
    title: string,
    content: string,
    citationKey: string
  ): Promise<KnowledgeDocumentChunk> {
    const newChunk: KnowledgeDocumentChunk = {
      id: `knw_${Math.random().toString(36).substring(2, 9)}`,
      sourceCategory: category,
      documentTitle: title,
      versionTag: "v2026.3",
      chunkContent: content,
      citationReferenceKey: citationKey,
      semanticRelevanceScorePercent: 98,
      requiredAgentAccessRole: "PUBLIC",
      aiHallucinationShieldScorePercent: 99.6,
      updatedAt: new Date(),
    };

    const chunks = await this.getKnowledgeChunks();
    chunks.unshift(newChunk);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(chunks));
    }

    return newChunk;
  }
}