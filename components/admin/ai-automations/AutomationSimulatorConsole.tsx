"use client";

import React, { useState } from "react";
import { triggerAIAutomationAction, toggleAutomationStatusAction } from "@/lib/actions/ai-automation-hub";

export default function AutomationSimulatorConsole() {
  const [automationKey, setAutomationKey] = useState("CRM_AUTO_LEAD_QUALIFY");
  const [domain, setDomain] = useState<any>("CRM");
  const [payloadSummary, setPayloadSummary] = useState("Yeni Çift Talebi: Bodrum Kır Düğünü 200 Kişilik VIP Lead");
  const [triggerResult, setTriggerResult] = useState<any>(null);

  const handleTrigger = async () => {
    const res = await triggerAIAutomationAction({
      automationKey,
      domain,
      payloadSummary,
      isSimulation: true,
    });

    if (res.success) {
      setTriggerResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleToggle = async (active: boolean) => {
    const res = await toggleAutomationStatusAction({
      automationKey,
      active,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Automation Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Automation Rule Trigger & Execution Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Hub Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Modül (Domain)</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="CRM">CRM</option>
                <option value="MARKETING">MARKETING</option>
                <option value="FINANCE">FINANCE</option>
                <option value="SUPPORT">SUPPORT</option>
                <option value="CONTRACTS">CONTRACTS</option>
                <option value="NOTIFICATIONS">NOTIFICATIONS</option>
                <option value="MARKETPLACE">MARKETPLACE</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Otomasyon Key</label>
              <input
                type="text"
                value={automationKey}
                onChange={(e) => setAutomationKey(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Payload Özeti</label>
              <input
                type="text"
                value={payloadSummary}
                onChange={(e) => setPayloadSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleTrigger}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              ⚡ Otomasyon Kuralını Tetikle & İnfaz Et
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(true)}
                className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                ✓ Kuralı Aktifleştir
              </button>
              <button
                onClick={() => handleToggle(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
              >
                ⏸️ Durdur
              </button>
            </div>
          </div>

          {triggerResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● AI Automation Execution Log: {triggerResult.executionId}</span>
                <span className="text-emerald-400 font-bold">Durum: {triggerResult.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Yanıt Süresi: <span className="text-slate-300">{triggerResult.latencyMs} ms</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">İşlenen Öğe: <span className="text-emerald-400 font-bold">{triggerResult.processedItemsCount} adet</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Gelecek Çalışma: <span className="text-indigo-400">{triggerResult.nextScheduledRun}</span></div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                📢 <strong>Çıktı Özeti:</strong> {triggerResult.outputSummary}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
