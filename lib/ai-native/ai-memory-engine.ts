export type MemoryType =
  | "USER_MEMORY"
  | "ORGANIZATION_MEMORY"
  | "VENDOR_MEMORY"
  | "WEDDING_MEMORY"
  | "CONVERSATION_MEMORY"
  | "TASK_MEMORY";

export interface VectorMemoryRecord {
  id: string;
  memoryType: MemoryType;
  ownerRef: string; // e.g. "couple_101", "vendor_502", "org_wedy"
  conceptTag: string;
  memoryContentText: string;
  vectorEmbeddingDimensions: number; // e.g. 1536 (OpenAI / Cohere)
  relevanceRankScore: number; // 0.0 - 1.0
  ttlDaysRemaining: number;
  isAccessRestricted: boolean;
  createdAt: Date;
}

export interface MemoryPlatformSummary {
  totalVectorEmbeddingsCount: number;
  activeMemoryTypesCount: number;
  averageSemanticRetrievalTimeMs: number;
  aiContextRankingAccuracyPercent: number;
  aiMemoryPlatformInsightNote: string;
}

export class AiMemoryEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_MEMORY_VAULT_V1";

  /**
   * Vektörel Hafıza Kayıtlarını Getirir
   */
  public static async getMemoryRecords(): Promise<VectorMemoryRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "mem_101",
        memoryType: "WEDDING_MEMORY",
        ownerRef: "Wedding #2027-TR-09",
        conceptTag: "Boğaz Manzarası & 180 Kişi",
        memoryContentText: "Çift 180 kişilik açık hava Boğaz manzaralı düğün istiyor. Bütçe tavanı ₺2,500,000 TRY.",
        vectorEmbeddingDimensions: 1536,
        relevanceRankScore: 0.98,
        ttlDaysRemaining: 365,
        isAccessRestricted: true,
        createdAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "mem_102",
        memoryType: "USER_MEMORY",
        ownerRef: "User #SenaKaan",
        conceptTag: "Vejetaryen Menü & Modern Elegant",
        memoryContentText: "Gelin ve damat vejetaryen menü seçeneği ve modern-elegant dekorasyon konsepti tercih ediyor.",
        vectorEmbeddingDimensions: 1536,
        relevanceRankScore: 0.95,
        ttlDaysRemaining: 180,
        isAccessRestricted: false,
        createdAt: new Date("2026-07-28T14:30:00"),
      },
      {
        id: "mem_103",
        memoryType: "VENDOR_MEMORY",
        ownerRef: "Vendor #CiraganPalace",
        conceptTag: "2027 Q2 Müsaitlik & Erken Rezervasyon",
        memoryContentText: "Çırağan Palace 2027 Q2 Cuma ve Pazar günlerinde %15 erken rezervasyon indirimi tanımladı.",
        vectorEmbeddingDimensions: 1536,
        relevanceRankScore: 0.92,
        ttlDaysRemaining: 90,
        isAccessRestricted: false,
        createdAt: new Date("2026-07-27T11:20:00"),
      },
      {
        id: "mem_104",
        memoryType: "TASK_MEMORY",
        ownerRef: "Task #EscrowVerify",
        conceptTag: "Kapanış Onayı & BKM FAST",
        memoryContentText: "Escrow depozito kilitleme adımı FAST banka entegrasyonu ile doğrulandı.",
        vectorEmbeddingDimensions: 1536,
        relevanceRankScore: 0.99,
        ttlDaysRemaining: 30,
        isAccessRestricted: true,
        createdAt: new Date("2026-07-26T09:10:00"),
      },
    ];
  }

  /**
   * Hafıza Platform Özetini Getirir
   */
  public static async getSummary(): Promise<MemoryPlatformSummary> {
    return {
      totalVectorEmbeddingsCount: 12480,
      activeMemoryTypesCount: 6,
      averageSemanticRetrievalTimeMs: 14,
      aiContextRankingAccuracyPercent: 99.1,
      aiMemoryPlatformInsightNote: "Vektörel RAG hafıza motoru 14ms ortalama sorgu süresi ve %99.1 semantik bağlam doğrulama oranıyla çalışmaktadır.",
    };
  }

  /**
   * Yeni Vektör Hafızası Ekleme Simülasyonu
   */
  public static async addMemoryRecord(
    type: MemoryType,
    ownerRef: string,
    tag: string,
    content: string
  ): Promise<VectorMemoryRecord> {
    const newRecord: VectorMemoryRecord = {
      id: `mem_${Math.random().toString(36).substring(2, 9)}`,
      memoryType: type,
      ownerRef,
      conceptTag: tag,
      memoryContentText: content,
      vectorEmbeddingDimensions: 1536,
      relevanceRankScore: 0.96,
      ttlDaysRemaining: 180,
      isAccessRestricted: false,
      createdAt: new Date(),
    };

    const records = await this.getMemoryRecords();
    records.unshift(newRecord);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }

    return newRecord;
  }
}