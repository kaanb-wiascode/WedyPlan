export interface GatewayStatusSummary {
  gatewayVersion: string;
  totalRequestsToday: number;
  currentRps: number;
  avgLatencyMs: number;
  p99LatencyMs: number;
  blockedRateLimitCount: number;
  activeRoutesCount: number;
  cacheHitRatioPct: number;
  routes: Array<{
    id: string;
    path: string;
    upstream: string;
    version: string;
    auth: string;
    rateLimit: string;
    cacheStatus: string;
    status: "HEALTHY" | "DEGRADED" | "RATE_LIMITED";
  }>;
}

export function getGatewayStatusSnapshot(): GatewayStatusSummary {
  return {
    gatewayVersion: "v3.2.0-Enterprise",
    totalRequestsToday: 14250000,
    currentRps: 2850,
    avgLatencyMs: 14,
    p99LatencyMs: 42,
    blockedRateLimitCount: 1240,
    activeRoutesCount: 38,
    cacheHitRatioPct: 94.6,
    routes: [
      { id: "route_01", path: "/api/v1/marketplace/search", upstream: "http://search-service:8080", version: "V1", auth: "PUBLIC", rateLimit: "5000 req/min", cacheStatus: "EDGE_CACHE_60S", status: "HEALTHY" },
      { id: "route_02", path: "/api/v2/ai/copilot-draft", upstream: "http://ai-brain-coordinator:8081", version: "V2", auth: "OAUTH2_JWT", rateLimit: "300 req/min", cacheStatus: "BYPASS", status: "HEALTHY" },
      { id: "route_03", path: "/api/v1/checkout/payment", upstream: "http://payment-gateway-service:8082", version: "V1", auth: "OAUTH2_JWT", rateLimit: "100 req/min", cacheStatus: "BYPASS", status: "HEALTHY" },
      { id: "route_04", path: "/api/v3/vendor/analytics", upstream: "http://vendor-portal-api:8083", version: "V3_BETA", auth: "API_KEY", rateLimit: "1200 req/min", cacheStatus: "EDGE_CACHE_300S", status: "HEALTHY" },
    ],
  };
}
