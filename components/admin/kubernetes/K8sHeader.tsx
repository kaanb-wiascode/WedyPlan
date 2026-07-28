"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerRollbackAction } from "@/lib/actions/kubernetes";

export default function K8sHeader({
  clusterName,
  activeNodesCount,
  totalPodsCount,
  cpuUsagePct,
  onOpenDeployModal,
}: {
  clusterName: string;
  activeNodesCount: number;
  totalPodsCount: number;
  cpuUsagePct: number;
  onOpenDeployModal: () => void;
}) {
  const handleRollback = async () => {
    if (confirm("🛑 ACİL ROLLBACK: Canary aşamasındaki servisi derhal önceki kararlı sürüme çekmek istiyor musunuz?")) {
      const res = await triggerRollbackAction("wedyplan-ai-brain-api");
      if (res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              ✦ WedyPlan Shared Enterprise Kubernetes (k8s) Orchestration & Deployment Engine
            </span>
            <span className="text-xs text-slate-400">Pods, Deployments, Services, HPA Auto Scaling & Canary Release</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Kubernetes Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRollback}
            className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-mono text-xs font-bold hover:bg-rose-700 transition shadow-md"
          >
            🛑 ROLLBACK CANARY
          </button>

          <button
            onClick={onOpenDeployModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            ☸️ Yeni k8s Deployment / Canary Release
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-blue-600 font-medium uppercase">Aktif Küme Adı</span>
          <div className="text-lg font-bold mt-1 text-blue-600 font-mono">{clusterName}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">High Availability Multi-Node</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Node & Pod Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activeNodesCount} Nodes | {totalPodsCount} Pods</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ HPA Autoscaling Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">CPU Request / Limit Yükü</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">%{cpuUsagePct}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Balanced Hardware Allocation</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Çökme Döngüsü (CrashLoop)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">0 HATA</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Stable Container Runtime</span>
        </motion.div>
      </div>
    </div>
  );
}
