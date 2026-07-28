"use client";

import React, { useState } from "react";
import { updateMeshPolicyAction } from "@/lib/actions/service-mesh";

export default function PolicyAndCircuitConsole() {
  const [sourceService, setSourceService] = useState("wedyplan-marketplace-core");
  const [targetService, setTargetService] = useState("wedyplan-ai-brain-api");
  const [mtlsMode, setMtlsMode] = useState<any>("STRICT_MTLS_1_3");
  const [timeoutMs, setTimeoutMs] = useState(1500);
  const [retryAttempts, setRetryAttempts] = useState(3);

  const handleUpdatePolicy = async () => {
    const res = await updateMeshPolicyAction({
      sourceService,
      targetService,
      mtlsMode,
      timeoutMs,
      retryAttempts,
      circuitBreakerThresholdPct: 10,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🕸️ Service Mesh Trafik & mTLS Politika Studio
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Envoy Proxy Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kaynak Servis</label>
            <input
              type="text"
              value={sourceService}
              onChange={(e) => setSourceService(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-purple-600"
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
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">mTLS Şifreleme</label>
            <select
              value={mtlsMode}
              onChange={(e) => setMtlsMode(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="STRICT_MTLS_1_3">Strict mTLS 1.3 (Zorunlu)</option>
              <option value="PERMISSIVE">Permissive (Geçici)</option>
              <option value="DISABLED">Disabled (Şifresiz)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Timeout (ms)</label>
            <input
              type="number"
              value={timeoutMs}
              onChange={(e) => setTimeoutMs(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Smart Retry Sayısı</label>
            <input
              type="number"
              value={retryAttempts}
              onChange={(e) => setRetryAttempts(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleUpdatePolicy}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold hover:shadow-md transition"
        >
          🕸️ Service Mesh Trafik Politikasını Kaydet
        </button>
      </div>
    </div>
  );
}
