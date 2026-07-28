"use client";

import React from "react";

export default function TaxonomyAndListingsTable({
  categories,
  onToggleFeatured,
}: {
  categories: any[];
  onToggleFeatured: (id: string, current: boolean) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📁 Pazar Yeri Ana Kategoriler & Taksonomi ({categories.length} Kategori)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Kategori Adı / URL Slug</th>
            <th className="py-3 px-2">Komisyon Oranı</th>
            <th className="py-3 px-2">Bağlı İlan Sayısı</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <span>{cat.name}</span>
                  <span className="block text-[10px] text-slate-400 font-mono font-normal">/{cat.slug}</span>
                </div>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">%{cat.commissionPercentage} Sabit</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{cat.listingCount} Aktif İlan</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (cat.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {cat.status === "ACTIVE" ? "● Yayında" : "Gizli"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => alert("✏️ Kategori Düzenle: " + cat.name)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => alert("📋 Alt Kategorileri Yönet: " + cat.name)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                >
                  Alt Kategoriler →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
