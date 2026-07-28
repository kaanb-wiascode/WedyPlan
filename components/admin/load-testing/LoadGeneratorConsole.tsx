"use client";

import React, { useState } from "react";
import { runLoadTestAction, abortLoadTestAction } from "@/lib/actions/load-testing";

export default function LoadGeneratorConsole() {
  const [scenarioName, setScenarioName] = useState("Peak Wedding Season Booking Load");
  const [targetModule, setTargetModule] = useState("Marketplace Search & Checkout");
  const [virtualUsersCount, setVirtualUsersCount] = useState(5000);
  const [targetRps, setTargetRps] = useState(2500);
  const [pattern, setPattern] = useState<any>("SPIKE");
  const [durationSeconds, setDurationSeconds] = useState(60);

  const handleRunTest = async () => {
    const res = await runLoadTestAction({
      scenarioName,
      targetModule,
      virtualUsersCount,
      targetRps,
      pattern,
      durationSeconds,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleAbortTest = async () => {
    const res = await abortLoadTestAction();
    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🚀 Dağıtık Yük Jeneratörü (k6 & Locust Studio)
        </span>
        <button
          onClick={handleAbortTest}
          className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono text-[10px] font-bold hover:bg-rose-700 transition"
        >
          🛑 STOP TEST
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
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-cyan-600"
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
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sanal Kullanıcı (VU)</label>
            <input
              type="number"
              value={virtualUsersCount}
              onChange={(e) => setVirtualUsersCount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef RPS</label>
            <input
              type="number"
              value={targetRps}
              onChange={(e) => setTargetRps(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Yük Deseni</label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="SPIKE">Spike Traffic (Ani Artış)</option>
              <option value="RAMP_UP">Ramp Up (Kademeli)</option>
              <option value="STRESS_TEST">Stress Test (Sınır Zorlama)</option>
              <option value="SOAK_TEST">Soak Test (Uzun Süreli)</option>
            </select>
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
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🚀 Dağıtık Yük Testini Başlat
        </button>
      </div>
    </div>
  );
}
