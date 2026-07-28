"use client";

import React from "react";

export default function SubscriptionPlansTable({
  plans,
  onEditPlan,
}: {
  plans: any[];
  onEditPlan: (plan: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📦 Platform Abonelik Paket Katmanları ({plans.length} Paket)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Paket Adı</th>
            <th className="py-3 px-2">Aylık / Yıllık Fiyat</th>
            <th className="py-3 px-2">Komisyon</th>
            <th className="py-3 px-2">AI / Lead Kotaları</th>
            <th className="py-3 px-2">Aktif Abone</th>
            <th className="py-3 px-2 text-right">Aksiyon</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {plans.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {p.planName}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{p.tier}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600">
                {p.priceMonthly.toLocaleString("tr-TR")} ₺ / Ay
                <span className="block text-[10px] text-slate-400 font-normal">Yıllık: {p.priceAnnual.toLocaleString("tr-TR")} ₺</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">%{p.commissionPercentage} Sabit</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                {p.aiCreditsLimit} AI • {p.leadCreditsLimit} Lead • {p.storageGbLimit}GB
              </td>
              <td className="py-3 px-2 font-bold text-purple-600">{p.activeSubscribersCount} Abone</td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onEditPlan(p)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition text-[10px]"
                >
                  Düzenle →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
