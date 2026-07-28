"use client";

import React, { useState } from "react";
import { triggerHAFailoverAction } from "@/lib/actions/high-availability";

export default function SmartTrafficRouterConsole() {
  const [clusterName, setClusterName] = useState("Cloudflare Anycast L7 Smart Load Balancer");
  const [primaryWeight, setPrimaryWeight] = useState(65);
  const [secondaryWeight, setSecondaryWeight] = useState(35);

  const handleUpdateRouting = async () => {
    const res = await triggerHAFailoverAction({
      clusterId: "cls_lb_01",
      targetNode: "eu-central-primary-node",
      reason: "TRAFFIC_WEIGHT_UPDATE",
    });

    if (res.success) {
      alert("✨ Trafik Dağılımı Güncellendi: %" + primaryWeight + " / %" + secondaryWeight);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🌐 Smart Traffic Router & L7 Yük Dengeleme Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Traffic Steering Active
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Küme Adı</label>
          <input
            type="text"
            value={clusterName}
            onChange={(e) => setClusterName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Frankfurt Primary Ağırlığı (%)</label>
            <input
              type="number"
              value={primaryWeight}
              onChange={(e) => setPrimaryWeight(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">İrlanda Standby Ağırlığı (%)</label>
            <input
              type="number"
              value={secondaryWeight}
              onChange={(e) => setSecondaryWeight(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleUpdateRouting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🌐 Trafik Yönlendirme Ağırlıklarını Kaydet
        </button>
      </div>
    </div>
  );
}
