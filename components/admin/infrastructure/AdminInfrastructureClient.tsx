"use client";

import React, { useState } from "react";
import InfrastructureHeader from "./InfrastructureHeader";
import AIInfrastructureWidget from "./AIInfrastructureWidget";
import ResourceNodesBentoGrid from "./ResourceNodesBentoGrid";
import TelemetryAndBackupsTable from "./TelemetryAndBackupsTable";
import { triggerInfrastructureNodeAction } from "@/lib/actions/admin-infrastructure";

export default function AdminInfrastructureClient() {
  const [aiReport] = useState({
    infrastructureHealthScore: 99,
    avgSystemLatencyMs: "14ms (Kusursuz)",
    activeNodesCount: 12,
    failingNodesCount: 0,
    aiAnalysis: "Tüm Kubernetes kümesi, PostgreSQL veritabanı replikaları ve Redis bellek katmanları %99.99 Uptime oranı ile ideal parametrelerde çalışmaktadır.",
    capacityForecast: "Yaklaşan yüksek düğün sezonu öncesinde BullMQ arka plan kuyruk işlemcilerinin replika sayısının 2'den 4'e çıkarılması önerilir.",
    rootCauseSuggestions: [
      "Son 24 saatte hiçbir kritik OOM (Out of Memory) veya veritabanı kilitlenme anomali kaydı tespit edilmemiştir.",
    ],
    sslCertificatesStatus: "Tüm SSL sertifikaları güncel (Let's Encrypt / Cloudflare Edge SSL - Son Geçerlilik: 280 Gün).",
  });

  const [nodes] = useState([
    { id: "node_k8s_1", name: "Primary Kubernetes Cluster", type: "SERVER", icon: "⚙️", region: "eu-central-1", cpuUsage: 22, ramUsage: "12.4 GB / 32GB", latencyMs: 12, ipAddress: "10.0.1.42", status: "HEALTHY" },
    { id: "node_pg_main", name: "PostgreSQL Master DB", type: "DATABASE_POSTGRES", icon: "🐘", region: "eu-central-1", cpuUsage: 18, ramUsage: "16.8 GB / 64GB", latencyMs: 8, ipAddress: "10.0.2.10", status: "HEALTHY" },
    { id: "node_redis_cache", name: "Redis L2 Cache & Session", type: "REDIS_CACHE", icon: "⚡", region: "eu-central-1", cpuUsage: 9, ramUsage: "3.2 GB / 16GB", latencyMs: 2, ipAddress: "10.0.3.88", status: "HEALTHY" },
    { id: "node_bullmq", name: "BullMQ Async Job Queue", type: "QUEUE_BULLMQ", icon: "📬", region: "eu-central-1", cpuUsage: 14, ramUsage: "2.1 GB / 8GB", latencyMs: 15, ipAddress: "10.0.1.99", status: "HEALTHY" },
    { id: "node_cloudflare", name: "Cloudflare Edge CDN & WAF", type: "CDN_CLOUDFLARE", icon: "🛡️", region: "Global Anycast", cpuUsage: 5, ramUsage: "Edge Serverless", latencyMs: 14, ipAddress: "172.67.18.2", status: "HEALTHY" },
  ]);

  const [backups] = useState([
    { id: "bak_101", name: "Full PostgreSQL Master Backup", targetStorage: "AWS S3 Vault (Glacier)", sizeGb: 42.8, timestamp: "Bugün 02:00", hash: "a8f9c1e2..." },
    { id: "bak_102", name: "Media Assets & Contracts Snapshot", targetStorage: "Cloudflare R2", sizeGb: 184.2, timestamp: "Bugün 01:00", hash: "f3e4d5c6..." },
  ]);

  const handleNodeAction = async (nodeId: string, action: any) => {
    const res = await triggerInfrastructureNodeAction({
      nodeId,
      action,
      reason: "Altyapı izleme panelinden operatör tetiklemesi yapıldı.",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <InfrastructureHeader
        healthScore={aiReport.infrastructureHealthScore}
        avgLatency={aiReport.avgSystemLatencyMs}
        activeNodesCount={nodes.length}
        onTriggerGlobalPing={() => alert("⚡ Tüm Altyapı Uç Noktalarına Ping & Latency Taraması Yapılıyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIInfrastructureWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ResourceNodesBentoGrid
            nodes={nodes}
            onNodeAction={handleNodeAction}
          />
          <TelemetryAndBackupsTable
            backups={backups}
            onTriggerBackup={() => alert("💾 Anlık Veritabanı ve Medya Yedekleme İşi Başlatıldı!")}
          />
        </div>
      </div>
    </div>
  );
}
