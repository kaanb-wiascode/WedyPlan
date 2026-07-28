"use client";

import React, { useState } from "react";
import { triggerDeploymentAction } from "@/lib/actions/kubernetes";

export default function DeploymentManagerConsole() {
  const [serviceName, setServiceName] = useState("wedyplan-ai-brain-api");
  const [imageTag, setImageTag] = useState("v2.14.0-canary");
  const [strategy, setStrategy] = useState<any>("CANARY");
  const [canaryTrafficPct, setCanaryTrafficPct] = useState(10);

  const handleRunDeployment = async () => {
    const res = await triggerDeploymentAction({
      serviceName,
      imageTag,
      strategy,
      canaryTrafficPct,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          ☸️ Kubernetes Deployment Manager (ArgoCD & Helm Release Studio)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Orchestrator Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Servis Adı</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-blue-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Docker Image Tag</label>
            <input
              type="text"
              value={imageTag}
              onChange={(e) => setImageTag(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Dağıtım Stratejisi</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="CANARY">Canary Release (Kademeli)</option>
              <option value="BLUE_GREEN">Blue-Green Deployment</option>
              <option value="ROLLING_UPDATE">Rolling Update (Varsayılan)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Canary Trafik Ağırlığı (%)</label>
            <input
              type="number"
              value={canaryTrafficPct}
              onChange={(e) => setCanaryTrafficPct(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleRunDeployment}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold hover:shadow-md transition"
        >
          ☸️ Kubernetes Dağıtımını Tetikle
        </button>
      </div>
    </div>
  );
}
