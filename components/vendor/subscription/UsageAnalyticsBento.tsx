"use client";

import React from "react";

export default function UsageAnalyticsBento({ usage }: { usage: any }) {
  if (!usage) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📊 Paket Kullanım Analitiği & Kotalar
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* AI Kredileri */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <div className="flex justify-between font-bold">
            <span>🤖 AI Mesaj & İçerik Kredisi</span>
            <span className="font-mono text-emerald-600">{usage.aiCreditsUsed} / {usage.aiCreditsLimit}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: (usage.aiCreditsUsed / usage.aiCreditsLimit) * 100 + "%" }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">%{(usage.aiCreditsUsed / usage.aiCreditsLimit * 100).toFixed(0)} Kullanıldı</span>
        </div>

        {/* Lead / Müşteri Talebi Kredisi */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <div className="flex justify-between font-bold">
            <span>📩 Aylık Lead / İhale Kredisi</span>
            <span className="font-mono text-indigo-600">{usage.leadCreditsUsed} / {usage.leadCreditsLimit}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: (usage.leadCreditsUsed / usage.leadCreditsLimit) * 100 + "%" }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">%{(usage.leadCreditsUsed / usage.leadCreditsLimit * 100).toFixed(0)} Kullanıldı</span>
        </div>

        {/* HD Medya Depolama */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <div className="flex justify-between font-bold">
            <span>🖼️ HD Medya Depolama (GB)</span>
            <span className="font-mono text-amber-600">{usage.storageUsedGb} GB / {usage.storageLimitGb} GB</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: (usage.storageUsedGb / usage.storageLimitGb) * 100 + "%" }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">%{(usage.storageUsedGb / usage.storageLimitGb * 100).toFixed(0)} Doluluk</span>
        </div>
      </div>
    </div>
  );
}
