export type FlowNodeType = "TRIGGER" | "ACTION" | "CONDITION" | "VARIABLE" | "APPROVAL";
export type VisualFlowPublishStatus = "DRAFT" | "TESTING" | "PUBLISHED" | "ARCHIVED";

export interface VisualFlowNode {
  id: string;
  type: FlowNodeType;
  label: string; // e.g. "Trigger: Escrow Locked Event"
  connectorOrServiceRef: string;
  configSummary: string; // e.g. "Topic: payment.escrow_locked"
  hasValidationError: boolean;
  aiOptimizationSuggestion?: string;
}

export interface LowCodeIntegrationFlow {
  id: string;
  flowTitle: string;
  description: string;
  versionTag: string; // e.g. "v1.2"
  status: VisualFlowPublishStatus;
  nodesCount: number;
  nodes: VisualFlowNode[];
  executionSuccessRatePercent: number; // 0-100%
  aiFlowGenerationPrompt?: string;
  aiErrorDetectionTip: string;
  updatedAt: Date;
}

export interface LowCodeBuilderSummary {
  totalDesignedFlowsCount: number;
  activePublishedFlowsCount: number;
  aiFlowsGenerated24h: number;
  averageFlowExecutionTimeMs: number;
  aiBuilderInsightNote: string;
}

export class LowCodeBuilderEngine {
  private static STORAGE_KEY = "WEDYPLAN_LOWCODE_BUILDER_V1";

  /**
   * Tasarlanan Düşük Kodlu Entegrasyon Akışlarını Getirir
   */
  public static async getFlows(): Promise<LowCodeIntegrationFlow[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "flow_101",
        flowTitle: "VIP Düğün Escrow & Otel PMS Otomasyon Akışı",
        description: "Escrow depozitosu kilitlendiğinde Çırağan Palace Opera PMS takvimini kapatır ve çift için WhatsApp VIP onay mesajı oluşturur.",
        versionTag: "v1.4",
        status: "PUBLISHED",
        nodesCount: 5,
        nodes: [
          { id: "n1", type: "TRIGGER", label: "Olay Tetikleyici", connectorOrServiceRef: "Phase14-EventBus", configSummary: "Topic: payment.escrow_locked", hasValidationError: false },
          { id: "n2", type: "CONDITION", label: "Tutar Kontrolü", connectorOrServiceRef: "Logic-Branching", configSummary: "Tutar > $10,000 USD", hasValidationError: false },
          { id: "n3", type: "ACTION", label: "Opera PMS Oda Kilitleme", connectorOrServiceRef: "Phase14-[#conn_101]", configSummary: "POST /reservations/lock", hasValidationError: false, aiOptimizationSuggestion: "Bağlantı pini 18ms latency'ye sahip." },
          { id: "n4", type: "APPROVAL", label: "Finans Süpervizör Onayı", connectorOrServiceRef: "HITL-Gate", configSummary: "Role: FINANCE_SUPERVISOR", hasValidationError: false },
          { id: "n5", type: "ACTION", label: "WhatsApp Mesajı Gönder", connectorOrServiceRef: "Phase14-CommHub", configSummary: "Channel: WhatsApp", hasValidationError: false },
        ],
        executionSuccessRatePercent: 99.8,
        aiFlowGenerationPrompt: "Escrow kilitlemede Opera PMS ve WhatsApp mesajını birbirine bağlayan onaylı akış oluştur.",
        aiErrorDetectionTip: "Görsel akışta hata bulunamadı. Tüm düğümler OpenAPI v3 şemasına %100 uygundur.",
        updatedAt: new Date("2026-07-29T22:15:00"),
      },
      {
        id: "flow_102",
        flowTitle: "Tedarikçi Fatura Sync & SAP ERP Aktarımı",
        description: "Tedarikçi e-Faturası yüklendiğinde OCR ile okur, SAP S/4HANA sistemine yevmiye fişi olarak aktarır.",
        versionTag: "v1.1",
        status: "DRAFT",
        nodesCount: 4,
        nodes: [
          { id: "n1", type: "TRIGGER", label: "Evrak Yükleme Tetikleyici", connectorOrServiceRef: "Phase13-DocIntelEngine", configSummary: "Document: e-Fatura PDF", hasValidationError: false },
          { id: "n2", type: "VARIABLE", label: "OCR Metin Çıkarımı", connectorOrServiceRef: "Data-Mapping", configSummary: "Extract: VKN, KDV, Matrah", hasValidationError: false },
          { id: "n3", type: "ACTION", label: "SAP ERP Fiş Kaydı", connectorOrServiceRef: "Phase14-[#conn_102]", configSummary: "POST /invoices", hasValidationError: true, aiOptimizationSuggestion: "Eksik hata yakalama bloğu! İstek zaman aşımına uğrarsa retry ekleyin." },
          { id: "n4", type: "ACTION", label: "E-Posta Bildirimi", connectorOrServiceRef: "Phase14-CommHub", configSummary: "Channel: Email", hasValidationError: false },
        ],
        executionSuccessRatePercent: 96.5,
        aiFlowGenerationPrompt: "e-Faturayı oku ve SAP ERP sistemine aktar.",
        aiErrorDetectionTip: "WedyAI Uyarısı: 3. düğümde zaman aşımı hata yakalayıcısı (Catch Error Node) eksik.",
        updatedAt: new Date("2026-07-29T21:40:00"),
      },
    ];
  }

  /**
   * Düşük Kod Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<LowCodeBuilderSummary> {
    return {
      totalDesignedFlowsCount: 14,
      activePublishedFlowsCount: 12,
      aiFlowsGenerated24h: 8,
      averageFlowExecutionTimeMs: 42.5,
      aiBuilderInsightNote: "Yapay zeka Akış Üreticisi 8 entegrasyon akışını doğal dilden otonom derlemiş ve %99.8 yürütme başarısı elde etmiştir.",
    };
  }

  /**
   * Akışı Yayınlama (Publish Flow) Simülasyonu
   */
  public static async publishFlow(flowId: string): Promise<boolean> {
    const flows = await this.getFlows();
    const idx = flows.findIndex((f) => f.id === flowId);

    if (idx !== -1) {
      flows[idx].status = "PUBLISHED";
      flows[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(flows));
      }
      return true;
    }
    return false;
  }
}