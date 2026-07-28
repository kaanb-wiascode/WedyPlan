"use client";

import React, { useState } from "react";
import ApiGatewayHeader from "./ApiGatewayHeader";
import ApiRouteMatrixBento from "./ApiRouteMatrixBento";
import RateLimitConsole from "./RateLimitConsole";
import ApiAnalyticsViewer from "./ApiAnalyticsViewer";

export default function AdminApiGatewayClient() {
  const [data] = useState({
    totalRequestsToday: 14250000,
    currentRps: 2850,
    avgLatencyMs: 14,
    cacheHitRatio: 94.6,
    routes: [
      { id: "route_01", path: "/api/v1/marketplace/search", upstream: "http://search-service:8080", version: "V1", auth: "PUBLIC", rateLimit: "5000 req/min", cacheStatus: "EDGE_CACHE_60S", status: "HEALTHY" },
      { id: "route_02", path: "/api/v2/ai/copilot-draft", upstream: "http://ai-brain-coordinator:8081", version: "V2", auth: "OAUTH2_JWT", rateLimit: "300 req/min", cacheStatus: "BYPASS", status: "HEALTHY" },
      { id: "route_03", path: "/api/v1/checkout/payment", upstream: "http://payment-gateway-service:8082", version: "V1", auth: "OAUTH2_JWT", rateLimit: "100 req/min", cacheStatus: "BYPASS", status: "HEALTHY" },
      { id: "route_04", path: "/api/v3/vendor/analytics", upstream: "http://vendor-portal-api:8083", version: "V3_BETA", auth: "API_KEY", rateLimit: "1200 req/min", cacheStatus: "EDGE_CACHE_300S", status: "HEALTHY" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ApiGatewayHeader
        totalRequestsToday={data.totalRequestsToday}
        currentRps={data.currentRps}
        avgLatencyMs={data.avgLatencyMs}
        cacheHitRatio={data.cacheHitRatio}
        onOpenRouteModal={() => alert("🚀 Rate Limit Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <RateLimitConsole />
          <ApiAnalyticsViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ApiRouteMatrixBento routes={data.routes} />
        </div>
      </div>
    </div>
  );
}
