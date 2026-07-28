"use client";

import React, { useState } from "react";
import { executeExecutiveCommandAction, coordinateAgentMeshAction } from "@/lib/actions/wedyplan-central-intelligence";

export default function ExecutiveConsoleSimulator() {
  const [commandPrompt, setCommandPrompt] = useState("Platform geneli ciro artışını %15 hedefleyerek yüksek sezon dinamik fiyatlandırmasını ve bütçe marjlarını güncelle.");
  const [commandType, setCommandType] = useState<any>("BUSINESS_OPTIMIZATION");
  const [executiveResult, setExecutiveResult] = useState<any>(null);

  const handleExecuteCommand = async () => {
    const res = await executeExecutiveCommandAction({
      commandPrompt,
      commandType,
      autoExecuteDirectives: true,
      targetDomains: ["PRICING", "BUDGET", "TIMELINE", "AUTOMATION"],
    });

    if (res.success) {
      setExecutiveResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleSyncMesh = async () => {
    const res = await coordinateAgentMeshAction({
      meshMode: "HIGH_PERFORMANCE_PEAK",
      forceSyncGlobalMemory: true,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Executive AI Console Simulator */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Executive AI Natural Language Command & Orchestration Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Brain Online
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Komut Türü (Directivity)</label>
              <select
                value={commandType}
                onChange={(e) => setCommandType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="BUSINESS_OPTIMIZATION">İş & Gelir Optimizasyonu</option>
                <option value="RESOURCE_REALLOCATION">Kaynak Re-alokasyonu</option>
                <option value="RISK_MITIGATION">Manevratik Risk Engelleme</option>
                <option value="GLOBAL_MEMORY_SYNC">Küresel Bellek Senkronizasyonu</option>
                <option value="EMERGENCY_SHIELD_OVERRIDE">Acil Güvenlik Override</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Executive Komut Cümlesi (Prompt Directivity)</label>
              <input
                type="text"
                value={commandPrompt}
                onChange={(e) => setCommandPrompt(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleExecuteCommand}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              🧠 Executive Komutu İşle & Direktifleri Fırlat
            </button>

            <button
              onClick={handleSyncMesh}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              🌐 Küresel Ajan Ağını (Mesh) Yeniden Senkronize Et
            </button>
          </div>

          {executiveResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Central Brain Directive ID: {executiveResult.directiveId}</span>
                <span className="text-emerald-400 font-bold">Sağlık: %{executiveResult.globalHealthScorePct}</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                📢 {executiveResult.aiMetaReasoningSummary}
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">🎯 Alt Sistemlere Dağıtılan Otonom Direktifler:</span>
                {executiveResult.strategicDirectives.map((d: any, idx: number) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-0.5">
                    <div className="flex justify-between text-indigo-300 font-bold">
                      <span>[{d.targetEngine}]</span>
                      <span className="text-emerald-400">{d.executionStatus}</span>
                    </div>
                    <div className="text-slate-200">{d.actionDirectivity}</div>
                    <div className="text-slate-400 text-[9px]">Beklenen Etki: <strong className="text-emerald-400">{d.expectedImpact}</strong></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
