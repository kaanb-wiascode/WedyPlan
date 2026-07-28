"use client";

import React from "react";

export default function ContentManagerTable({
  contents,
  onEdit,
}: {
  contents: any[];
  onEdit: (item: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Yayınlanmış İçerikler & Şablonlar ({contents.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">İçerik Başlığı / URL Slug</th>
            <th className="py-3 px-2">Tür</th>
            <th className="py-3 px-2">Dil</th>
            <th className="py-3 px-2">Yayın Durumu</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {contents.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {item.title}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">/{item.slug}</span>
              </td>
              <td className="py-3 px-2 font-mono text-indigo-600 font-semibold text-[10px] uppercase">{item.type}</td>
              <td className="py-3 px-2 font-bold text-slate-700 dark:text-slate-200">{item.language}</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (item.status === "PUBLISHED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {item.status === "PUBLISHED" ? "● Yayında" : "Taslak"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => alert("🌐 Yapay Zeka Çevirisi Başlatılıyor...")}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 font-bold hover:bg-purple-100 transition text-[10px]"
                >
                  Çevir (EN/DE)
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
