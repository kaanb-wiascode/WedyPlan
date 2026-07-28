"use client";

import React, { useState } from "react";
import { runStressTestAction, abortStressTestAction } from "@/lib/actions/stress-testing";

export default function StormGeneratorConsole() {
  const [scenarioName, setScenarioName] = useState("Peak Wedding Season Search Storm");
  const [targetModule, setTargetModule] = useState("Search Vector & Database Core");
  const [stressType, setStressType] = useState<any>("SEARCH_STORM");
  const [targetBreakingRps, setTargetBreakingRps] = useState(50000);
  const [virtualUsersCount, setVirtualUsersCount] = useState(100000);
  const [durationSeconds, setDurationSeconds] = useState(60);

  const handleRunTest = async () => {
    const res = await runStressTestAction({
      scenarioName,
      targetModule,
      stressType,
      targetBreakingRps,
      virtualUsersCount,
      durationSeconds,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleAbortTest = async () => {
    const res = await abortStressTestAction();
    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          ⚡ Stres Fırtınası Jeneratörü (Storm Generator Studio)
        </span>
        <button
          onClick={handleAbortTest}
          className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono text-[10px] font-bold hover:bg-rose-700 transition"
        >
          🛑 STOP STORM
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Senaryo Adı</label>
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Modül / API</label>
            <input
              type="text"
              value={targetModule}
              onChange={(e) => setTargetModule(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Stres Türü</label>
            <select
              value={stressType}
              onChange={(e) => setStressType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="SEARCH_STORM">Arama Fırtınası (Search Storm)</option>
              <option value="EXTREME_TRAFFIC">Aşırı Trafik (Extreme Traffic)</option>
              <option value="MASS_REGISTRATIONS">Toplu Kayıt (Mass Registrations)</option>
              <option value="MASS_PAYMENTS">Toplu Ödeme (Mass Payments)</option>
              <option value="MASS_AI_REQUESTS">Toplu AI İstekleri (Mass AI)</option>
              <option value="NOTIFICATION_STORM">Bildirim Fırtınası (Notification)</option>
              <option value="MASS_UPLOADS">Toplu Yükleme (Mass Uploads)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Kırılma RPS</label>
            <input
              type="number"
              value={targetBreakingRps}
              onChange={(e) => setTargetBreakingRps(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kullanıcı (VU)</label>
            <input
              type="number"
              value={virtualUsersCount}
              onChange={(e) => setVirtualUsersCount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Süre (Saniye)</label>
            <input
              type="number"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleRunTest}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-orange-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          ⚡ Stres Fırtınasını Başlat
        </button>
      </div>
    </div>
  );
}
