"use client";

import React, { useState } from "react";
import IdpHeader from "./IdpHeader";
import ServiceCatalogBento from "./ServiceCatalogBento";
import ProvisioningStudioConsole from "./ProvisioningStudioConsole";
import ArchitectureAdvisorViewer from "./ArchitectureAdvisorViewer";

export default function AdminIdpClient() {
  const [data] = useState({
    totalCatalogServicesCount: 28,
    activeTemplatesCount: 12,
    avgProvisioningTimeSeconds: 42,
    architectureScorePct: 99.1,
    services: [
      { id: "srv_01", name: "wedyplan-venue-recommendation-api", category: "AI_AGENT", team: "AI Engineering", db: "Vector DB + Redis", domain: "venue-ai.wedyplan.com", status: "HEALTHY", version: "v1.4.2" },
      { id: "srv_02", name: "wedyplan-vendor-lead-matcher", category: "WORKER_JOB", team: "Marketplace Core", db: "PostgreSQL + BullMQ", domain: "lead-matcher.internal", status: "HEALTHY", version: "v2.1.0" },
      { id: "srv_03", name: "wedyplan-guest-rsvp-notifier", category: "MICROSERVICE", team: "Couple Portal Team", db: "PostgreSQL", domain: "rsvp.wedyplan.com", status: "HEALTHY", version: "v1.0.8" },
      { id: "srv_04", name: "wedyplan-realtime-chat-gateway", category: "MICROSERVICE", team: "Communication Team", db: "Redis PubSub", domain: "chat.wedyplan.com", status: "HEALTHY", version: "v2.0.1" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <IdpHeader
        totalCatalogServicesCount={data.totalCatalogServicesCount}
        activeTemplatesCount={data.activeTemplatesCount}
        avgProvisioningTimeSeconds={data.avgProvisioningTimeSeconds}
        architectureScorePct={data.architectureScorePct}
        onOpenStudioModal={() => alert("🛠️ Provisioning Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <ProvisioningStudioConsole />
          <ArchitectureAdvisorViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ServiceCatalogBento services={data.services} />
        </div>
      </div>
    </div>
  );
}
