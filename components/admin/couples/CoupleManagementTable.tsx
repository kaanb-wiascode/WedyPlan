"use client";

import React from "react";

export default function CoupleManagementTable({
  couples,
  onSelectCouple,
  onToggleStatus,
}: {
  couples: any[];
  onSelectCouple: (couple: any) => void;
  onToggleStatus: (coupleId: string, currentStatus: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          👥 Platform Çift Dizini ({couples.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Çift Adı / İletişim</th>
            <th className="py-3 px-2">Düğün Tarihi / Şehir</th>
            <th className="py-3 px-2">Düğün Bütçesi</th>
            <th className="py-3 px-2">Aşama</th>
            <th className="py-3 px-2">Hesap Durumu</th>
            <th className="py-3 px-2 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {couples.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {c.coupleNames}
                <span className="block text-[10px] text-slate-400 font-normal">{c.email} • {c.phone}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">
                {c.weddingDate}
                <span className="block text-[10px] text-slate-400 font-normal">{c.city}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-rose-600">
                {c.budget.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (c.weddingStatus === "D_DAY_TODAY"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 animate-pulse"
                      : c.weddingStatus === "PLANNING"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300")
                  }
                >
                  {c.weddingStatus === "D_DAY_TODAY" ? "💍 DÜĞÜN GÜNÜ" : c.weddingStatus === "PLANNING" ? "Planlama Yapıyor" : "✓ Tamamlandı"}
                </span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded text-[10px] font-bold " +
                    (c.accountStatus === "ACTIVE"
                      ? "text-emerald-600"
                      : "text-rose-600")
                  }
                >
                  {c.accountStatus === "ACTIVE" ? "● Aktif" : "✕ Donduruldu"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectCouple(c)}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 font-bold hover:bg-rose-100 transition text-[10px]"
                >
                  360° Detay
                </button>

                <button
                  onClick={() => onToggleStatus(c.id, c.accountStatus)}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                >
                  {c.accountStatus === "ACTIVE" ? "Dondur" : "Aktifleştir"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
