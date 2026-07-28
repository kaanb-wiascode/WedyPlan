"use client";

import React from "react";

export default function VendorManagementTable({
  vendors,
  onSelectVendor,
  onApprove,
  onSuspend,
}: {
  vendors: any[];
  onSelectVendor: (vendor: any) => void;
  onApprove: (vendorId: string) => void;
  onSuspend: (vendorId: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🏢 Platform Tedarikçi Dizini ({vendors.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">İşletme Unvanı / Kategori</th>
            <th className="py-3 px-2">Lokasyon</th>
            <th className="py-3 px-2">Rozetler</th>
            <th className="py-3 px-2">Toplam Ciro</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {vendors.map((v) => (
            <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {v.companyName}
                <span className="block text-[10px] text-slate-400 font-normal">{v.category} • VKN: {v.taxNumber}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">{v.location}</td>
              <td className="py-3 px-2 space-x-1">
                {v.isPremium && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    👑 Premium
                  </span>
                )}
                {v.isFeatured && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    ⭐ Featured
                  </span>
                )}
              </td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600">
                {v.totalRevenue.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (v.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : v.status === "PENDING_APPROVAL"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {v.status === "ACTIVE" ? "✓ Aktif" : v.status === "PENDING_APPROVAL" ? "● Onay Bekliyor" : "✕ Askıda"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectVendor(v)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  360° İncele
                </button>

                {v.status === "PENDING_APPROVAL" && (
                  <button
                    onClick={() => onApprove(v.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                  >
                    Onayla ✓
                  </button>
                )}

                {v.status === "ACTIVE" && (
                  <button
                    onClick={() => onSuspend(v.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold hover:bg-rose-100 transition text-[10px]"
                  >
                    Askıya Al
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
