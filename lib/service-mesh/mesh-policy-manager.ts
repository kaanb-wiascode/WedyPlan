export interface ServiceMeshStatusSummary {
  meshProvider: string;
  mtlsGlobalStatus: string;
  totalServiceLinksCount: number;
  activeCircuitBreakersCount: number;
  avgInterServiceLatencyMs: number;
  globalRetrySuccessRatePct: number;
  services: Array<{
    id: string;
    source: string;
    target: string;
    mtls: string;
    latencyMs: number;
    circuitBreaker: "CLOSED" | "OPEN" | "HALF_OPEN";
    status: "HEALTHY" | "DEGRADED" | "TRIPPED";
  }>;
}

export function getMeshStatusSnapshot(): ServiceMeshStatusSummary {
  return {
    meshProvider: "Cilium eBPF + Istio Envoy Mesh",
    mtlsGlobalStatus: "STRICT_MTLS_1_3_ENFORCED",
    totalServiceLinksCount: 24,
    activeCircuitBreakersCount: 0,
    avgInterServiceLatencyMs: 0.8,
    globalRetrySuccessRatePct: 99.8,
    services: [
      { id: "link_01", source: "wedyplan-api-gateway", target: "wedyplan-marketplace-core", mtls: "STRICT TLS 1.3", latencyMs: 0.6, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_02", source: "wedyplan-marketplace-core", target: "wedyplan-ai-brain-api", mtls: "STRICT TLS 1.3", latencyMs: 1.2, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_03", source: "wedyplan-checkout-payment", target: "wedyplan-iyzico-adapter", mtls: "STRICT TLS 1.3", latencyMs: 0.8, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_04", source: "wedyplan-ai-brain-api", target: "wedyplan-vector-memory-db", mtls: "STRICT TLS 1.3", latencyMs: 0.5, circuitBreaker: "CLOSED", status: "HEALTHY" },
    ],
  };
}
