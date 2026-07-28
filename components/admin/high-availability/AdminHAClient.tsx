"use client";

import React, { useState } from "react";
import HAHeader from "./HAHeader";
import ClusterReplicationBento from "./ClusterReplicationBento";
import SmartTrafficRouterConsole from "./SmartTrafficRouterConsole";
import AvailabilityPredictionViewer from "./AvailabilityPredictionViewer";

export default function AdminHAClient() {
  const [data] = useState({
    uptimePct: 99.999,
    activeClustersCount: 4,
    failoverMode: "AUTO_ACTIVE",
    availabilityTarget: "99.999% (Five Nines)",
    clusters: [
      { clusterId: "cls_db_01", name: "PostgreSQL Multi-Region Primary Cluster", type: "DATABASE", availabilityTarget: "99.999% (Five Nines)", currentUptimePct: 99.999, activeNodesCount: 3, standbyNodesCount: 2, failoverMode: "AUTO_ACTIVE", replicationLagMs: 0.4, status: "HEALTHY" },
      { clusterId: "cls_redis_01", name: "Redis Sentinel & Cluster Replication", type: "REDIS", availabilityTarget: "99.99% (Four Nines)", currentUptimePct: 99.995, activeNodesCount: 6, standbyNodesCount: 3, failoverMode: "AUTO_ACTIVE", replicationLagMs: 0.1, status: "HEALTHY" },
      { clusterId: "cls_queue_01", name: "BullMQ Distributed Worker Queue Pool", type: "QUEUE", availabilityTarget: "99.99% (Four Nines)", currentUptimePct: 99.991, activeNodesCount: 12, standbyNodesCount: 4, failoverMode: "AUTO_ACTIVE", replicationLagMs: 0.8, status: "HEALTHY" },
      { clusterId: "cls_lb_01", name: "Cloudflare Anycast L7 Smart Load Balancer", type: "LOAD_BALANCER", availabilityTarget: "99.999% (Five Nines)", currentUptimePct: 100.0, activeNodesCount: 24, standbyNodesCount: 8, failoverMode: "AUTO_ACTIVE", replicationLagMs: 0.0, status: "HEALTHY" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <HAHeader
        uptimePct={data.uptimePct}
        activeClustersCount={data.activeClustersCount}
        failoverMode={data.failoverMode}
        availabilityTarget={data.availabilityTarget}
        onOpenTrafficModal={() => alert("🌐 Smart Traffic Router Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <SmartTrafficRouterConsole />
          <AvailabilityPredictionViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ClusterReplicationBento clusters={data.clusters} />
        </div>
      </div>
    </div>
  );
}
