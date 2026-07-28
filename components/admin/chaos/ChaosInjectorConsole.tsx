"use client";

import React, { useState } from "react";
import { runChaosExperimentAction } from "@/lib/actions/chaos";

export default function ChaosInjectorConsole() {
  const [experimentName, setExperimentName] = useState("AI Model Timeout & Latency Injection");
  const [targetService, setTargetService] = useState("AI Central Brain Coordinator");
  const [experimentType, setExperimentType] = useState<any>("LATENCY_INJECTION");
  const [intensityPct, setIntensityPct] = useState(50);
  const [durationSeconds, setDurationSeconds] = useState(30);

  const handleRunExperiment = async () => {
    const res = await runChaosExperimentAction({
      experimentName,
      targetService,
      experimentType,
      intensityPct,
      durationSeconds,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          💥 Kaos Enjeksiyon Konsolu (Fault Injector Studio)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Chaos Injector
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Deney Adı</label>
            <input
              type="text"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Servis</label>
            <input
              type="text"
              value={targetService}
              onChange={(e) => setTargetService(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Enjeksiyon Türü</label>
            <select
              value={experimentType}
              onChange={(e) => setExperimentType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="LATENCY_INJECTION">Gecikme Enjeksiyonu (Latency)</option>
              <option value="SERVER_FAILURE">Sunucu Kesintisi (Service Down)</option>
              <option value="DATABASE_FAILURE">Database Failover</option>
              <option value="AI_PROVIDER_FAILURE">AI Provider Timeout</option>
              <option value="PAYMENT_FAILURE">Payment Gateway Failure</option>
              <option value="PACKET_LOSS">Ağ Paket Kaybı (Packet Loss)</option>
              <option value="CPU_SATURATION">CPU Aşırı Yükleme (%100 Saturation)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Şiddet (%)</label>
            <input
              type="number"
              value={intensityPct}
              onChange={(e) => setIntensityPct(Number(e.target.value))}
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
          onClick={handleRunExperiment}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 text-white font-bold hover:shadow-md transition"
        >
          💥 Kaos Enjeksiyonunu Başlat
        </button>
      </div>
    </div>
  );
}
