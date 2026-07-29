export type FrameworkConnectorCategory =
  | "CRM"
  | "ERP"
  | "ACCOUNTING"
  | "MARKETING"
  | "PAYMENTS"
  | "IDENTITY"
  | "STORAGE"
  | "COMMUNICATION";

export type FrameworkConnectorStatus = "HEALTHY" | "DEGRADED" | "TOKEN_EXPIRED" | "OFFLINE";

export interface RegisteredFrameworkConnector {
  id: string;
  category: FrameworkConnectorCategory;
  name: string; // e.g. "Salesforce Enterprise CRM"
  vendorRef: string;
  authType: "OAUTH2" | "API_KEY" | "MTLS" | "JWT";
  endpointUrl: string;
  status: FrameworkConnectorStatus;
  healthPingLatencyMs: number;
  failureRiskProbabilityPercent: number; // 0-100% (Predicted by AI)
  retryPolicyMaxCount: number;
  activeTokenExpiresAt?: Date;
  aiPredictiveTip: string;
  lastCheckedAt: Date;
}

export interface ConnectorFrameworkSummary {
  totalRegisteredConnectorsCount: number;
  healthyConnectorsCount: number;
  averageHealthPingMs: number;
  predictedOutagesPrevented24h: number;
  aiConnectorInsightNote: string;
}

export class ConnectorFrameworkEngine {
  private static STORAGE_KEY = "WEDYPLAN_CONNECTOR_FRAMEWORK_V1";

  /**
   * Kayıtlı Çerçeve Konnektörlerini Getirir
   */
  public static async getConnectors(): Promise<RegisteredFrameworkConnector[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "fconn_101",
        category: "CRM",
        name: "Salesforce Enterprise CRM",
        vendorRef: "Salesforce AppExchange API",
        authType: "OAUTH2",
        endpointUrl: "https://wedyplan.my.salesforce.com/services/data/v60.0",
        status: "HEALTHY",
        healthPingLatencyMs: 18,
        failureRiskProbabilityPercent: 1.2,
        retryPolicyMaxCount: 3,
        activeTokenExpiresAt: new Date("2026-07-30T12:00:00"),
        aiPredictiveTip: "Konnektör %99.9 Uptime ile çalışıyor. Token yenileme 14 saat sonra otonom yürütülecektir.",
        lastCheckedAt: new Date("2026-07-29T21:40:00"),
      },
      {
        id: "fconn_102",
        category: "ACCOUNTING",
        name: "Logo Tiger ERP / E-Fatura Connector",
        vendorRef: "Logo Software REST API",
        authType: "API_KEY",
        endpointUrl: "https://efatura.logo.com.tr/api/v1/invoices",
        status: "HEALTHY",
        healthPingLatencyMs: 28,
        failureRiskProbabilityPercent: 4.5,
        retryPolicyMaxCount: 5,
        aiPredictiveTip: "GİB fatura doğrulama uç noktası sağlıklı. Gecikme 28ms.",
        lastCheckedAt: new Date("2026-07-29T21:35:00"),
      },
      {
        id: "fconn_103",
        category: "IDENTITY",
        name: "e-Devlet / eIDAS Identity Vault",
        vendorRef: "Turkey Digital Gov API",
        authType: "MTLS",
        endpointUrl: "https://identity.edevlet.gov.tr/oauth/v2",
        status: "HEALTHY",
        healthPingLatencyMs: 14,
        failureRiskProbabilityPercent: 0.8,
        retryPolicyMaxCount: 3,
        aiPredictiveTip: "mTLS sertifikası geçerli. Phase 12 Küresel Kimlik Kalkanı ile senkronize.",
        lastCheckedAt: new Date("2026-07-29T21:45:00"),
      },
      {
        id: "fconn_104",
        category: "PAYMENTS",
        name: "iyzico & Stripe Escrow Payout Gateway",
        vendorRef: "iyzico Merchant V2 API",
        authType: "API_KEY",
        endpointUrl: "https://api.iyzipay.com/payment/v1",
        status: "HEALTHY",
        healthPingLatencyMs: 22,
        failureRiskProbabilityPercent: 2.1,
        retryPolicyMaxCount: 3,
        aiPredictiveTip: "Phase 11 Escrow ödeme dağıtım konnektörü faal.",
        lastCheckedAt: new Date("2026-07-29T21:48:00"),
      },
    ];
  }

  /**
   * Konnektör Çerçeve Özetini Getirir
   */
  public static async getSummary(): Promise<ConnectorFrameworkSummary> {
    return {
      totalRegisteredConnectorsCount: 8,
      healthyConnectorsCount: 8,
      averageHealthPingMs: 20.5,
      predictedOutagesPrevented24h: 4,
      aiConnectorInsightNote: "Yapay Zeka Hata Tahmin Motoru, 8 kurumsal konnektörün ping latency trendlerini analiz ederek 4 olası OAuth token kesintisini önceden engellemiştir.",
    };
  }

  /**
   * Konnektör Sağlık Kontrolü (Health Ping) Tetikleme Simülasyonu
   */
  public static async triggerHealthPing(connectorId: string): Promise<boolean> {
    const connectors = await this.getConnectors();
    const idx = connectors.findIndex((c) => c.id === connectorId);

    if (idx !== -1) {
      connectors[idx].lastCheckedAt = new Date();
      connectors[idx].healthPingLatencyMs = Math.floor(Math.random() * 15) + 12;
      connectors[idx].failureRiskProbabilityPercent = 0.5;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(connectors));
      }
      return true;
    }
    return false;
  }
}