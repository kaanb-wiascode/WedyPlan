"use client";

import React from "react";

export default function ListingManagerTable({
  listings,
  onToggleStatus,
  onDuplicate,
  onEdit,
}: {
  listings: any[];
  onToggleStatus: (id: string, status: any) => void;
  onDuplicate: (id: string) => void;
  onEdit: (listing: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Pazar Yeri Hizmet İlanları ({listings.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Hizmet Başlığı / Kategori</th>
            <th className="py-3 px-2">Taban Fiyat</th>
            <th className="py-3 px-2">Öne Çıkarılma</th>
            <th className="py-3 px-2">Yayın Durumu</th>
            <th className="py-3 px-2 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {listings.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {l.title}
                <span className="block text-[10px] text-slate-400 font-normal">{l.category} • {l.subCategory}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-indigo-600">
                {l.basePrice.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                {l.isFeatured ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    ⭐ Featured
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Standart</span>
                )}
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (l.status === "PUBLISHED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {l.status === "PUBLISHED" ? "● Yayında" : "Taslak"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(l)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onDuplicate(l.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                >
                  Çoğalt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
