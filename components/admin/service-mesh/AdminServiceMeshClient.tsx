"use client";

import React, { useState } from "react";
import ServiceMeshHeader from "./ServiceMeshHeader";
import ServiceTopologyBento from "./ServiceTopologyBento";
import PolicyAndCircuitConsole from "./PolicyAndCircuitConsole";
import MeshAnalyticsViewer from "./MeshAnalyticsViewer";

export default function AdminServiceMeshClient() {
  const [data] = useState({
    mtlsGlobalStatus: "STRICT_MTLS_1_3_ENFORCED",
    totalServiceLinksCount: 24,
    avgInterServiceLatencyMs: 0.8,
    globalRetrySuccessRate: 99.8,
    services: [
      { id: "link_01", source: "wedyplan-api-gateway", target: "wedyplan-marketplace-core", mtls: "STRICT TLS 1.3", latencyMs: 0.6, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_02", source: "wedyplan-marketplace-core", target: "wedyplan-ai-brain-api", mtls: "STRICT TLS 1.3", latencyMs: 1.2, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_03", source: "wedyplan-checkout-payment", target: "wedyplan-iyzico-adapter", mtls: "STRICT TLS 1.3", latencyMs: 0.8, circuitBreaker: "CLOSED", status: "HEALTHY" },
      { id: "link_04", source: "wedyplan-ai-brain-api", target: "wedyplan-vector-memory-db", mtls: "STRICT TLS 1.3", latencyMs: 0.5, circuitBreaker: "CLOSED", status: "HEALTHY" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ServiceMeshHeader
        mtlsGlobalStatus={data.mtlsGlobalStatus}
        totalServiceLinksCount={data.totalServiceLinksCount}
        avgInterServiceLatencyMs={data.avgInterServiceLatencyMs}
        globalRetrySuccessRate={data.globalRetrySuccessRate}
        onOpenPolicyModal={() => alert("🕸️ Trafik Politikaları Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <PolicyAndCircuitConsole />
          <MeshAnalyticsViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ServiceTopologyBento services={data.services} />
        </div>
      </div>
    </div>
  );
}
