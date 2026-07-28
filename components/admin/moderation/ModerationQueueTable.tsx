"use client";

import React from "react";

export default function ModerationQueueTable({
  reports,
  onSelectReport,
  onQuickResolve,
}: {
  reports: any[];
  onSelectReport: (report: any) => void;
  onQuickResolve: (reportId: string, decision: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Moderasyon & İhlal İnceleme Kuyruğu ({reports.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">İhlal Türü / Hedef İçerik</th>
            <th className="py-3 px-2">Şikayet Eden</th>
            <th className="py-3 px-2">AI Güvensizlik</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {reports.map((rep) => (
            <tr key={rep.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {rep.violationCategory}
                <span className="block text-[10px] text-slate-400 font-normal">{rep.targetContentTitle}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">{rep.reportedBy}</td>
              <td className="py-3 px-2 font-mono font-bold text-rose-600">%{rep.aiUnsafeScore} Risk</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (rep.status === "PENDING_REVIEW"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300")
                  }
                >
                  {rep.status === "PENDING_REVIEW" ? "● İncelemede" : "✓ Karara Bağlandı"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectReport(rep)}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 font-bold hover:bg-rose-100 transition text-[10px]"
                >
                  360° İncele
                </button>
                <button
                  onClick={() => onQuickResolve(rep.id, "APPROVE_CLEAN")}
                  className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                >
                  Temiz ✓
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
