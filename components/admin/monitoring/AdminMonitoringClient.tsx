"use client";

import React, { useState } from "react";
import MonitoringHeader from "./MonitoringHeader";
import ServiceHealthMatrixBento from "./ServiceHealthMatrixBento";
import SLATrackerWidget from "./SLATrackerWidget";
import PredictiveIncidentConsole from "./PredictiveIncidentConsole";

export default function AdminMonitoringClient() {
  const [data] = useState({
    availabilityPct: 99.98,
    healthyCount: 13,
    totalCount: 14,
    avgLatencyMs: 18,
    services: [
      { name: "PostgreSQL Primary Cluster", category: "Database", status: "HEALTHY", latencyMs: 4, uptimePct: 99.99, lastHeartbeat: "Anlık (2s önce)" },
      { name: "Redis Cache & PubSub Queue", category: "Memory/Queue", status: "HEALTHY", latencyMs: 1, uptimePct: 100.00, lastHeartbeat: "Anlık (1s önce)" },
      { name: "OpenAI & Anthropic Gateway", category: "AI Provider", status: "DEGRADED", latencyMs: 142, uptimePct: 99.85, lastHeartbeat: "Anlık (4s önce)" },
      { name: "Background Worker Pool (BullMQ)", category: "Worker", status: "HEALTHY", latencyMs: 8, uptimePct: 99.95, lastHeartbeat: "Anlık (2s önce)" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MonitoringHeader
        availabilityPct={data.availabilityPct}
        healthyServicesCount={data.healthyCount}
        totalServicesCount={data.totalCount}
        avgLatencyMs={data.avgLatencyMs}
        onOpenAnalysisModal={() => alert("🔮 AI Predictive Analysis Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <SLATrackerWidget />
          <PredictiveIncidentConsole />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ServiceHealthMatrixBento services={data.services} />
        </div>
      </div>
    </div>
  );
}