export interface HAClusterSummary {
  clusterId: string;
  name: string;
  type: "DATABASE" | "REDIS" | "QUEUE" | "LOAD_BALANCER";
  availabilityTarget: string;
  currentUptimePct: number;
  activeNodesCount: number;
  standbyNodesCount: number;
  failoverMode: "AUTO_ACTIVE" | "MANUAL_STANDBY";
  replicationLagMs: number;
  status: "HEALTHY" | "REPLICATING" | "DEGRADED";
}

export function getHAStatusSnapshot(): HAClusterSummary[] {
  return [
    {
      clusterId: "cls_db_01",
      name: "PostgreSQL Multi-Region Primary Cluster",
      type: "DATABASE",
      availabilityTarget: "99.999% (Five Nines)",
      currentUptimePct: 99.999,
      activeNodesCount: 3,
      standbyNodesCount: 2,
      failoverMode: "AUTO_ACTIVE",
      replicationLagMs: 0.4,
      status: "HEALTHY",
    },
    {
      clusterId: "cls_redis_01",
      name: "Redis Sentinel & Cluster Replication",
      type: "REDIS",
      availabilityTarget: "99.99% (Four Nines)",
      currentUptimePct: 99.995,
      activeNodesCount: 6,
      standbyNodesCount: 3,
      failoverMode: "AUTO_ACTIVE",
      replicationLagMs: 0.1,
      status: "HEALTHY",
    },
    {
      clusterId: "cls_queue_01",
      name: "BullMQ Distributed Worker Queue Pool",
      type: "QUEUE",
      availabilityTarget: "99.99% (Four Nines)",
      currentUptimePct: 99.991,
      activeNodesCount: 12,
      standbyNodesCount: 4,
      failoverMode: "AUTO_ACTIVE",
      replicationLagMs: 0.8,
      status: "HEALTHY",
    },
    {
      clusterId: "cls_lb_01",
      name: "Cloudflare Anycast L7 Smart Load Balancer",
      type: "LOAD_BALANCER",
      availabilityTarget: "99.999% (Five Nines)",
      currentUptimePct: 100.0,
      activeNodesCount: 24,
      standbyNodesCount: 8,
      failoverMode: "AUTO_ACTIVE",
      replicationLagMs: 0.0,
      status: "HEALTHY",
    },
  ];
}
