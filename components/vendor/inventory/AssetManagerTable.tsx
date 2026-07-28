"use client";

import React from "react";

export default function AssetManagerTable({
  assets,
  onReportDamage,
}: {
  assets: any[];
  onReportDamage: (asset: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📦 Kayıtlı Demirbaş & Sarf Malzemeleri ({assets.length} Kalem)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Varlık Adı / QR Kodu</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Depo Konumu</th>
            <th className="py-3 px-2">Stok / Mevcut</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {assets.map((ast) => (
            <tr key={ast.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {ast.title}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{ast.qrCode}</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-semibold text-[10px] uppercase">{ast.category}</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">{ast.location}</td>
              <td className="py-3 px-2 font-mono font-bold text-slate-800 dark:text-slate-100">
                {ast.availableQuantity} / {ast.totalQuantity} Adet
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (ast.status === "AVAILABLE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : ast.status === "RESERVED"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {ast.status === "AVAILABLE" ? "✓ Müsait" : ast.status === "RESERVED" ? "● Kullanımda" : "⚠️ Bakımda"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => alert("📱 QR Kodu İndiriliyor: " + ast.qrCode)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                >
                  QR Yazdır
                </button>
                <button
                  onClick={() => onReportDamage(ast)}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold hover:bg-rose-100 transition text-[10px]"
                >
                  Hasar Bildir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
