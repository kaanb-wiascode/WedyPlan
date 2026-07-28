"use client";

import React, { useState } from "react";
import { runDRSimulationAction } from "@/lib/actions/disaster-recovery";

export default function FailoverSimulatorConsole() {
  const [planName, setPlanName] = useState("Primary Database Center Regional Failover Test");
  const [targetComponent, setTargetComponent] = useState<any>("DATABASE");
  const [simulationType, setSimulationType] = useState<any>("DRY_RUN");

  const handleRunSimulation = async () => {
    const res = await runDRSimulationAction({
      planName,
      targetComponent,
      simulationType,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🛡️ Felaket Tatbikatı & Failover Simülatörü (DR Simulator)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          DR Simulator
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Tatbikat Plan Adı</label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Bileşen</label>
            <select
              value={targetComponent}
              onChange={(e) => setTargetComponent(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="DATABASE">PostgreSQL Veritabanları</option>
              <option value="OBJECT_STORAGE">S3 Medya Depolama</option>
              <option value="AI_MEMORY">AI Vektör Hafızası</option>
              <option value="SECRETS">Vault Şifreli Sırlar</option>
              <option value="REDIS">Redis Cache & Queue</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Simülasyon Modu</label>
            <select
              value={simulationType}
              onChange={(e) => setSimulationType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="DRY_RUN">Dry Run (Zararsız Simülasyon)</option>
              <option value="DATA_INTEGRITY_CHECK">Veri Bütünlük Kontrolü</option>
              <option value="FULL_FAILOVER_TEST">Tam Failover Geçiş Testi</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunSimulation}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🛡️ Felaket Tatbikatını Başlat
        </button>
      </div>
    </div>
  );
}
