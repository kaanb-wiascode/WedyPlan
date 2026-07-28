"use client";

import React, { useState } from "react";
import { logAITraceTelemetryAction, submitAIFeedbackAction } from "@/lib/actions/ai-observability";

export default function TraceLogsAndFeedbackTable() {
  const [testTask, setTestTask] = useState("WEDDING_PLANNING");
  const [testResult, setTestResult] = useState<any>(null);

  const [traces] = useState([
    { traceId: "tr_8f4e222a", portal: "COUPLE", task: "WEDDING_PLANNING", provider: "OpenAI (gpt-4o)", tokens: 230, cost: "$0.0006", latency: 16, status: 200, feedback: "THUMBS_UP" },
    { traceId: "tr_a1b2c3d4", portal: "VENDOR", task: "CONTRACT_ANALYSIS", provider: "Anthropic (claude-3-5)", tokens: 1420, cost: "$0.0042", latency: 24, status: 200, feedback: "NONE" },
  ]);

  const handleTestTrace = async () => {
    const res = await logAITraceTelemetryAction({
      callerPortal: "ADMIN",
      taskType: testTask,
      provider: "OpenAI",
      model: "gpt-4o",
      promptTokens: 140,
      completionTokens: 80,
      totalCostUsd: 0.00042,
      latencyMs: 18,
      statusCode: 200,
    });

    if (res.success) {
      setTestResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleFeedback = async (traceId: string, feedbackType: any) => {
    const res = await submitAIFeedbackAction({
      traceId,
      feedbackType,
      userComment: "Test geri bildirimi iletildi.",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Interactive Telemetry Trace Simulator */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Telemetry Trace Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Collector Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <select
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-xs"
            >
              <option value="WEDDING_PLANNING">WEDDING_PLANNING</option>
              <option value="CONTRACT_ANALYSIS">CONTRACT_ANALYSIS</option>
              <option value="VISION_INSPECTION">VISION_INSPECTION</option>
              <option value="RAG_QUERY">RAG_QUERY</option>
            </select>

            <button
              onClick={handleTestTrace}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition text-xs"
            >
              Trace Kaydı Fırlat (Simulate Span) 🚀
            </button>
          </div>

          {testResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-1">
              <div className="text-white font-bold">● Span Kaydedildi: {testResult.traceId}</div>
              <div>Sağlayıcı: {testResult.provider} ({testResult.model}) | Latency: {testResult.latencyMs}ms | Kalite: %{testResult.qualityScore}</div>
            </div>
          )}
        </div>
      </div>

      {/* Canlı Distributed Trace Tablosu */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Canlı Distributed Trace & User Feedback Masası ({traces.length} Kayıt)
        </span>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
              <th className="py-3 px-2">Trace ID / Portal</th>
              <th className="py-3 px-2">Görev & Sağlayıcı</th>
              <th className="py-3 px-2">Token & Maliyet</th>
              <th className="py-3 px-2">Latency</th>
              <th className="py-3 px-2">Geri Bildirim</th>
              <th className="py-3 px-2 text-right">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {traces.map((t) => (
              <tr key={t.traceId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-mono font-bold text-indigo-600 text-[10px]">
                  {t.traceId}
                  <span className="block text-[10px] text-slate-400 font-normal">{t.portal}</span>
                </td>
                <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                  {t.task}
                  <span className="block text-[10px] text-slate-500 font-mono font-normal">{t.provider}</span>
                </td>
                <td className="py-3 px-2 font-mono text-slate-700 dark:text-slate-300">
                  {t.tokens} tok • <span className="text-emerald-600 font-bold">{t.cost}</span>
                </td>
                <td className="py-3 px-2 font-mono font-bold text-purple-600">{t.latency}ms</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                    {t.feedback}
                  </span>
                </td>
                <td className="py-3 px-2 text-right space-x-1">
                  <button
                    onClick={() => handleFeedback(t.traceId, "THUMBS_UP")}
                    className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition text-[10px]"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleFeedback(t.traceId, "HALLUCINATION_REPORTED")}
                    className="px-2 py-1 rounded bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition text-[10px]"
                  >
                    🚨 İhbar Et
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
