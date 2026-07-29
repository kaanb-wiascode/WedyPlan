export type ApiAuthMethod = "OAUTH2_OIDC" | "JWT_BEARER" | "API_KEY" | "IP_WHITELIST";
export type ApiRouteStatus = "HEALTHY" | "RATE_LIMITED" | "THREAT_BLOCKED" | "DEPRECATED";

export interface ApiRouteRecord {
  id: string;
  endpointPath: string; // e.g. "/api/v1/venues/search"
  targetServiceRef: string; // e.g. "Phase14-IntegrationGateway"
  apiVersion: string; // e.g. "v1.4"
  authMethod: ApiAuthMethod;
  rateLimitPerMin: number;
  monthlyQuota: number;
  cacheTtlSeconds: number;
  totalRequests24h: number;
  averageLatencyMs: number;
  status: ApiRouteStatus;
  aiOptimizationTip: string;
}

export interface ApiGatewayMetricsSummary {
  totalApiRequests24h: number;
  activeApiRoutesCount: number;
  cacheHitRatePercent: number;
  blockedThreatsCount24h: number;
  averageGatewayLatencyMs: number;
  aiGatewayInsightNote: string;
}

export class ApiGatewayEngine {
  private static STORAGE_KEY = "WEDYPLAN_API_GATEWAY_V1";

  /**
   * API Gateway Rota Kayıtlarını Getirir
   */
  public static async getApiRoutes(): Promise<ApiRouteRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "route_101",
        endpointPath: "/api/v1/venues/search",
        targetServiceRef: "Phase13-KnowledgePlatform",
        apiVersion: "v1.4",
        authMethod: "API_KEY",
        rateLimitPerMin: 1200,
        monthlyQuota: 500000,
        cacheTtlSeconds: 300,
        totalRequests24h: 18420,
        averageLatencyMs: 12,
        status: "HEALTHY",
        aiOptimizationTip: "Edge Redis önbellekleme %94 hit oranı yakaladı. Latency 12ms.",
      },
      {
        id: "route_102",
        endpointPath: "/api/v1/escrow/deposit/lock",
        targetServiceRef: "Phase11-EscrowEngine",
        apiVersion: "v1.2",
        authMethod: "OAUTH2_OIDC",
        rateLimitPerMin: 300,
        monthlyQuota: 100000,
        cacheTtlSeconds: 0, // No caching for escrow transactions
        totalRequests24h: 3420,
        averageLatencyMs: 28,
        status: "HEALTHY",
        aiOptimizationTip: "OAuth2 mTLS doğrulaması aktif. Sıfır önbellek politikası uygulanıyor.",
      },
      {
        id: "route_103",
        endpointPath: "/api/v1/workforce/agents/delegate",
        targetServiceRef: "Phase13-AiWorkforceEngine",
        apiVersion: "v2.0",
        authMethod: "JWT_BEARER",
        rateLimitPerMin: 600,
        monthlyQuota: 250000,
        cacheTtlSeconds: 60,
        totalRequests24h: 8900,
        averageLatencyMs: 18,
        status: "HEALTHY",
        aiOptimizationTip: "AI Ajan yetkilendirmesi JWT scope kontrolü ile güvenceye alındı.",
      },
    ];
  }

  /**
   * API Gateway Metrik Özetini Getirir
   */
  public static async getGatewaySummary(): Promise<ApiGatewayMetricsSummary> {
    return {
      totalApiRequests24h: 42800,
      activeApiRoutesCount: 16,
      cacheHitRatePercent: 94.2,
      blockedThreatsCount24h: 8,
      averageGatewayLatencyMs: 14.6,
      aiGatewayInsightNote: "API Gateway, OAuth2 ve API Key doğrulamalarıyla 42.8K isteği %94.2 önbellek başarısı ve 14.6ms gecikmeyle yönetmektedir.",
    };
  }

  /**
   * Rota Oran Sınırlaması Güncelleme Simülasyonu
   */
  public static async updateRouteRateLimit(routeId: string, newRateLimit: number): Promise<boolean> {
    const routes = await this.getApiRoutes();
    const idx = routes.findIndex((r) => r.id === routeId);

    if (idx !== -1) {
      routes[idx].rateLimitPerMin = newRateLimit;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(routes));
      }
      return true;
    }
    return false;
  }
}