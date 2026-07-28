"use client";

import React, { useState } from "react";
import ObservabilityHeader from "./ObservabilityHeader";
import InfrastructureMetricsBento from "./InfrastructureMetricsBento";
import DistributedTraceViewer from "./DistributedTraceViewer";
import ObservabilityAlertCenter from "./ObservabilityAlertCenter";

export default function AdminObservabilityClient() {
  const [telemetry] = useState({
    cpuUsagePct: 18.4,
    ramUsageMb: 4120,
    apiP99LatencyMs: 84,
    errorRatePct: 0.04,
    traceSample: {
      spanId: "sp_01_gateway",
      traceId: "tr_wedy_88ab19",
      operationName: "POST /api/v1/marketplace/booking",
      service: "API-Gateway",
      durationMs: 128,
      status: "OK",
      children: [
        { spanId: "sp_02_auth", traceId: "tr_wedy_88ab19", operationName: "JWT Verify & RBAC Check", service: "Auth-Service", durationMs: 12 },
        { spanId: "sp_03_db", traceId: "tr_wedy_88ab19", operationName: "Prisma findUnique(VendorAvailability)", service: "PostgreSQL-Core", durationMs: 24 },
        { spanId: "sp_04_ai", traceId: "tr_wedy_88ab19", operationName: "Copilot Fraud & Dynamic Pricing Inspection", service: "AI-Central-Brain", durationMs: 68 },
        { spanId: "sp_05_payment", traceId: "tr_wedy_88ab19", operationName: "Iyzico Gateway Tokenize Payment", service: "Payment-Gateway", durationMs: 24 },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ObservabilityHeader
        cpuUsage={telemetry.cpuUsagePct}
        ramUsage={telemetry.ramUsageMb}
        p99Latency={telemetry.apiP99LatencyMs}
        errorRate={telemetry.errorRatePct}
        onOpenAlertModal={() => alert("🚨 Observability Alert Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <InfrastructureMetricsBento />
          <ObservabilityAlertCenter />
        </div>

        <div className="lg:col-span-7 font-sans">
          <DistributedTraceViewer trace={telemetry.traceSample} />
        </div>
      </div>
    </div>
  );
}
