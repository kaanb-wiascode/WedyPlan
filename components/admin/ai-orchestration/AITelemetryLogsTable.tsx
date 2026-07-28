"use client";

import React, { useState } from "react";
import { dispatchAIOrchestratedRequestAction } from "@/lib/actions/admin-ai-orchestration";

export default function AITelemetryLogsTable() {
  const [testTask, setTestTask] = useState<any>("WEDDING_PLANNING");
  const [testPrompt, setTestPrompt] = useState("Bodrum'da deniz kenarında 200 kişilik düğün için mekan önerisi ve bütçe planı hazırla.");
  const [testResult, setTestResult] = useState<any>(null);

  const handleTestDispatch = async () => {
    const res = await dispatchAIOrchestratedRequestAction({
      taskType: testTask,
      prompt: testPrompt,
      callerPortal: "ADMIN",
      maxTokens: 2000,
      temperature: 0.7,
    });

    if (res.success) {
      setTestResult(res.data);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Gateway Dispatcher & Simulator */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live AI Gateway Test Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Gateway Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Görev Türü (Task Type)</label>
              <select
                value={testTask}
                onChange={(e) => setTestTask(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="WEDDING_PLANNING">WEDDING_PLANNING</option>
                <option value="CONTRACT_ANALYSIS">CONTRACT_ANALYSIS</option>
                <option value="VISION_INSPECTION">VISION_INSPECTION</option>
                <option value="TRANSLATION">TRANSLATION</option>
                <option value="FAST_SUMMARY">FAST_SUMMARY</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Test Prompt</label>
              <input
                type="text"
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleTestDispatch}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 AI Gateway İsteğini Tetikle & Yönlendir
          </button>

          {testResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-2">
              <div className="text-white font-bold">● Seçilen Model: {testResult.selectedProvider} ({testResult.selectedModel})</div>
              <div>Gecikme Süresi: {testResult.latencyMs}ms | Harcanan Token: {testResult.totalTokens} | Tahmini Maliyet: ${testResult.costUSD}</div>
              <div className="text-slate-300 font-sans p-2 rounded bg-slate-900 border border-slate-800 text-xs">
                {testResult.responseMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}