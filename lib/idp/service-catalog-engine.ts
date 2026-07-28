export interface IdpCatalogSummary {
  totalCatalogServicesCount: number;
  activeTemplatesCount: number;
  provisionedDatabasesCount: number;
  provisionedQueuesCount: number;
  avgProvisioningTimeSeconds: number;
  services: Array<{
    id: string;
    name: string;
    category: string;
    team: string;
    db: string;
    domain: string;
    status: "HEALTHY" | "PROVISIONING" | "DEGRADED";
    version: string;
  }>;
}

export function getIdpStatusSnapshot(): IdpCatalogSummary {
  return {
    totalCatalogServicesCount: 28,
    activeTemplatesCount: 12,
    provisionedDatabasesCount: 18,
    provisionedQueuesCount: 24,
    avgProvisioningTimeSeconds: 42,
    services: [
      { id: "srv_01", name: "wedyplan-venue-recommendation-api", category: "AI_AGENT", team: "AI Engineering", db: "Vector DB + Redis", domain: "venue-ai.wedyplan.com", status: "HEALTHY", version: "v1.4.2" },
      { id: "srv_02", name: "wedyplan-vendor-lead-matcher", category: "WORKER_JOB", team: "Marketplace Core", db: "PostgreSQL + BullMQ", domain: "lead-matcher.internal", status: "HEALTHY", version: "v2.1.0" },
      { id: "srv_03", name: "wedyplan-guest-rsvp-notifier", category: "MICROSERVICE", team: "Couple Portal Team", db: "PostgreSQL", domain: "rsvp.wedyplan.com", status: "HEALTHY", version: "v1.0.8" },
      { id: "srv_04", name: "wedyplan-realtime-chat-gateway", category: "MICROSERVICE", team: "Communication Team", db: "Redis PubSub", domain: "chat.wedyplan.com", status: "HEALTHY", version: "v2.0.1" },
    ],
  };
}
