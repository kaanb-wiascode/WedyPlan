"use client";

import React from "react";

export default function CustomerHealthTable({
  accounts,
  onSelectAccount,
  onTriggerIntervention,
}: {
  accounts: any[];
  onSelectAccount: (account: any) => void;
  onTriggerIntervention: (accountId: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          👥 Müşteri Sağlık & Benimseme Listesi ({accounts.length} Hesap)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Hesap Adı / Türü</th>
            <th className="py-3 px-2">Sağlık Skoru</th>
            <th className="py-3 px-2">Onboarding</th>
            <th className="py-3 px-2">Benimseme (Adoption)</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {accounts.map((acc) => (
            <tr key={acc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <span>{acc.name}</span>
                  {acc.isVIP && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                      👑 VIP
                    </span>
                  )}
                </div>
                <span className="block text-[10px] text-slate-400 font-normal">{acc.type} • CSM: {acc.assignedCsm}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600 text-sm">
                %{acc.healthScore}
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">
                %{acc.onboardingProgress} Tamamlandı
              </td>
              <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">
                %{acc.adoptionScore}
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (acc.healthStatus === "EXCELLENT"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : acc.healthStatus === "HEALTHY"
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {acc.healthStatus === "EXCELLENT" ? "✓ Mükemmel" : acc.healthStatus === "HEALTHY" ? "● Sağlıklı" : "🚨 Riskli Churn"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectAccount(acc)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold hover:bg-emerald-100 transition text-[10px]"
                >
                  360° Plan
                </button>
                {acc.healthStatus === "AT_RISK" && (
                  <button
                    onClick={() => onTriggerIntervention(acc.id)}
                    className="px-2 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-[10px]"
                  >
                    Müdahale Et ⚡
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
