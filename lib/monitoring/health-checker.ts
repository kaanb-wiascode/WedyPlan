export interface ServiceHealthStatus {
  name: string;
  category: string;
  status: "HEALTHY" | "DEGRADED" | "CRITICAL_DOWN";
  latencyMs: number;
  uptimePct: number;
  lastHeartbeat: string;
}

export interface SystemHealthSnapshot {
  availabilityPct: number;
  healthyCount: number;
  totalCount: number;
  avgLatencyMs: number;
  services: ServiceHealthStatus[];
}

export function getSystemHealthSnapshot(): SystemHealthSnapshot {
  const services: ServiceHealthStatus[] = [
    {
      name: "PostgreSQL Primary Cluster",
      category: "Database",
      status: "HEALTHY",
      latencyMs: 4,
      uptimePct: 99.99,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "Redis Cache & PubSub Queue",
      category: "Memory/Queue",
      status: "HEALTHY",
      latencyMs: 1,
      uptimePct: 100.0,
      lastHeartbeat: "Anlık (1s önce)",
    },
    {
      name: "OpenAI & Anthropic Gateway",
      category: "AI Provider",
      status: "DEGRADED",
      latencyMs: 142,
      uptimePct: 99.85,
      lastHeartbeat: "Anlık (4s önce)",
    },
    {
      name: "Background Worker Pool (BullMQ)",
      category: "Worker",
      status: "HEALTHY",
      latencyMs: 8,
      uptimePct: 99.95,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "Next.js App Router (Edge)",
      category: "Application",
      status: "HEALTHY",
      latencyMs: 12,
      uptimePct: 99.98,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "Firebase Auth & Firestore",
      category: "Identity/Data",
      status: "HEALTHY",
      latencyMs: 22,
      uptimePct: 99.97,
      lastHeartbeat: "Anlık (3s önce)",
    },
    {
      name: "Stripe Payment Webhooks",
      category: "Payments",
      status: "HEALTHY",
      latencyMs: 35,
      uptimePct: 99.99,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "S3 Media Storage (CDN)",
      category: "Storage",
      status: "HEALTHY",
      latencyMs: 18,
      uptimePct: 99.99,
      lastHeartbeat: "Anlık (1s önce)",
    },
    {
      name: "Elasticsearch Search Index",
      category: "Search",
      status: "HEALTHY",
      latencyMs: 15,
      uptimePct: 99.96,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "Email & SMS Notification Hub",
      category: "Messaging",
      status: "HEALTHY",
      latencyMs: 28,
      uptimePct: 99.94,
      lastHeartbeat: "Anlık (3s önce)",
    },
    {
      name: "Vector DB (Pinecone)",
      category: "AI/RAG",
      status: "HEALTHY",
      latencyMs: 45,
      uptimePct: 99.92,
      lastHeartbeat: "Anlık (4s önce)",
    },
    {
      name: "Cron Scheduler (Vercel)",
      category: "Scheduler",
      status: "HEALTHY",
      latencyMs: 6,
      uptimePct: 99.99,
      lastHeartbeat: "Anlık (1s önce)",
    },
    {
      name: "Admin Command Center API",
      category: "Internal API",
      status: "HEALTHY",
      latencyMs: 11,
      uptimePct: 99.98,
      lastHeartbeat: "Anlık (2s önce)",
    },
    {
      name: "Vendor Portal Gateway",
      category: "B2B API",
      status: "HEALTHY",
      latencyMs: 14,
      uptimePct: 99.97,
      lastHeartbeat: "Anlık (2s önce)",
    },
  ];

  const healthyCount = services.filter((s) => s.status === "HEALTHY").length;
  const avgLatencyMs = Math.round(
    services.reduce((sum, s) => sum + s.latencyMs, 0) / services.length
  );

  return {
    availabilityPct: 99.98,
    healthyCount,
    totalCount: services.length,
    avgLatencyMs,
    services,
  };
}
