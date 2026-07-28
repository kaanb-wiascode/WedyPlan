"use client";

import React from "react";
import { replayFailedWebhookAction } from "@/lib/actions/admin-integrations";

export default function SyncLogsAndWebhooksTable({
  webhookLogs,
}: {
  webhookLogs: any[];
}) {
  const handleReplay = async (logId: string) => {
    const res = await replayFailedWebhookAction({ webhookLogId: logId });
    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📡 Canlı Webhook Gateway & Senkronizasyon Kayıtları ({webhookLogs.length} Olay)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Sağlayıcı / Olay Türü</th>
            <th className="py-3 px-2">Zaman</th>
            <th className="py-3 px-2">HTTP Yanıtı</th>
            <th className="py-3 px-2">Süre</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {webhookLogs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {log.provider}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{log.eventType}</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-mono">{log.timestamp}</td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">{log.httpCode}</td>
              <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">{log.durationMs}ms</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (log.status === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {log.status === "SUCCESS" ? "✓ 200 OK" : "🚨 FAILED"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                {log.status === "FAILED" && (
                  <button
                    onClick={() => handleReplay(log.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-[10px]"
                  >
                    Replay 🔄
                  </button>
                )}
                {log.status === "SUCCESS" && (
                  <span className="text-[10px] text-slate-400 font-mono">Payload Ok</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
