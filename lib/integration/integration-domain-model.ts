export type ConnectorCategory =
  | "HOTEL_PMS" // e.g. Opera, Mews
  | "ACCOUNTING_ERP" // e.g. SAP, Oracle NetSuite, Logo
  | "EXTERNAL_CRM" // e.g. Salesforce, HubSpot
  | "CALENDAR_SYNC" // e.g. Google Calendar, Apple iCal
  | "PAYMENT_GATEWAY" // e.g. Stripe, iyzico, Adyen
  | "COMMUNICATION"; // e.g. WhatsApp Business, Twilio

export type WebhookEventTopic =
  | "BOOKING_CREATED"
  | "ESCROW_LOCKED"
  | "ESCROW_RELEASED"
  | "VENDOR_ONBOARDED"
  | "DISPUTE_RAISED";

export interface IntegrationApiKey {
  id: string;
  keyLabel: string;
  apiKeyMasked: string; // e.g. "wp_live_****89a2"
  assignedTenantName: string;
  scopes: string[]; // e.g. ["read:bookings", "write:escrow_payout"]
  rateLimitPerMinute: number;
  isActive: boolean;
  createdAt: Date;
  lastUsedAt?: Date;
}

export interface EnterpriseConnectorRecord {
  id: string;
  category: ConnectorCategory;
  connectorName: string;
  providerVendorRef: string;
  syncDirection: "BI_DIRECTIONAL" | "INBOUND_ONLY" | "OUTBOUND_ONLY";
  status: "CONNECTED" | "SYNCING" | "DISCONNECTED" | "ERROR";
  totalEventsProcessed24h: number;
  healthLatencyMs: number;
  lastSyncedAt: Date;
}

export interface WebhookSubscriptionRecord {
  id: string;
  targetEndpointUrl: string;
  subscribedTopics: WebhookEventTopic[];
  secretSignatureKeyMasked: string;
  deliverySuccessRatePercent: number;
  status: "ACTIVE" | "PAUSED_DLQ";
  createdAt: Date;
}

export interface EnterpriseIntegrationSummary {
  totalActiveConnectorsCount: number;
  totalApiKeysCount: number;
  activeWebhookSubscriptionsCount: number;
  dailyIntegrationVolumeEvents: number;
  averageGatewayLatencyMs: number;
  integrationInsightNote: string;
}

export class EnterpriseIntegrationDomain {
  private static STORAGE_KEY = "WEDYPLAN_ENTERPRISE_INTEGRATIONS_V1";

  /**
   * Aktif Entegrasyon Konnektörlerini Getirir
   */
  public static async getConnectors(): Promise<EnterpriseConnectorRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "conn_101",
        category: "HOTEL_PMS",
        connectorName: "Opera Cloud PMS (Çırağan Palace)",
        providerVendorRef: "Oracle Hospitality Integration",
        syncDirection: "BI_DIRECTIONAL",
        status: "CONNECTED",
        totalEventsProcessed24h: 1840,
        healthLatencyMs: 24,
        lastSyncedAt: new Date("2026-07-29T21:10:00"),
      },
      {
        id: "conn_102",
        category: "ACCOUNTING_ERP",
        connectorName: "SAP S/4HANA Finance Sync",
        providerVendorRef: "SAP Enterprise Enterprise",
        syncDirection: "OUTBOUND_ONLY",
        status: "CONNECTED",
        totalEventsProcessed24h: 420,
        healthLatencyMs: 38,
        lastSyncedAt: new Date("2026-07-29T20:55:00"),
      },
      {
        id: "conn_103",
        category: "EXTERNAL_CRM",
        connectorName: "Salesforce Executive CRM Sync",
        providerVendorRef: "Salesforce AppExchange",
        syncDirection: "BI_DIRECTIONAL",
        status: "CONNECTED",
        totalEventsProcessed24h: 3100,
        healthLatencyMs: 18,
        lastSyncedAt: new Date("2026-07-29T21:20:00"),
      },
    ];
  }

  /**
   * Entegrasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<EnterpriseIntegrationSummary> {
    return {
      totalActiveConnectorsCount: 12,
      totalApiKeysCount: 28,
      activeWebhookSubscriptionsCount: 16,
      dailyIntegrationVolumeEvents: 42800,
      averageGatewayLatencyMs: 19.4,
      integrationInsightNote: "Enterprise Integration Gateway, 12 aktif konnektör ve 42.8K günlük olay ile Opera PMS, SAP ERP ve Salesforce sistemlerine 19.4ms ortalama gecikmeyle bağlıdır.",
    };
  }

  /**
   * Yeni API Anahtarı Oluşturma Simülasyonu
   */
  public static async createApiKey(label: string, tenant: string, scopes: string[]): Promise<IntegrationApiKey> {
    const newKey: IntegrationApiKey = {
      id: `key_${Math.random().toString(36).substring(2, 9)}`,
      keyLabel: label,
      apiKeyMasked: `wp_live_${Math.random().toString(36).substring(2, 6)}****${Math.random().toString(36).substring(2, 6)}`,
      assignedTenantName: tenant,
      scopes,
      rateLimitPerMinute: 1000,
      isActive: true,
      createdAt: new Date(),
    };
    return newKey;
  }
}