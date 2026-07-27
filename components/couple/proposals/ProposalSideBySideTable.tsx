"use client";

import React from "react";

export default function ProposalSideBySideTable({
  proposals,
  onAccept,
}: {
  proposals: any[];
  onAccept: (id: string) => void;
}) {
  if (proposals.length === 0) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          ⚖️ Yan Yana Teklif Karşılaştırma Matrisi ({proposals.length} Teklif)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-3 w-1/4">Karşılaştırma Kriteri</th>
            {proposals.map((p) => (
              <th key={p.id} className="py-3 px-3 w-1/4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{p.vendorName}</span>
                  <span className="text-[10px] text-slate-400 font-normal">★ {p.rating} ({p.reviewCount} Yorum)</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Toplam Fiyat */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500">Toplam Fiyat</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 font-serif font-bold text-base text-rose-600 dark:text-rose-400">
                {p.price.toLocaleString("tr-TR")} {p.currency}
              </td>
            ))}
          </tr>

          {/* Best Value Skoru */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500">AI Best Value Skoru</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                %{p.bestValueScore} F/P Oranı
              </td>
            ))}
          </tr>

          {/* Dahil Olan Hizmetler */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500 align-top">Dahil Olan Hizmetler</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 align-top space-y-1">
                {p.includedServices.map((inc: string, i: number) => (
                  <div key={i} className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    ✓ {inc}
                  </div>
                ))}
              </td>
            ))}
          </tr>

          {/* Hariç Tutulanlar / Ekstra Ücretler */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500 align-top">Hariç Tutulanlar</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 align-top space-y-1">
                {p.excludedServices.map((exc: string, i: number) => (
                  <div key={i} className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    ✕ {exc}
                  </div>
                ))}
              </td>
            ))}
          </tr>

          {/* Ödeme Şartları & Kapora */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500">Ödeme Şartları</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                {p.paymentTerms}
              </td>
            ))}
          </tr>

          {/* İptal Politikası */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500">İptal Politikası</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                {p.cancellationPolicy}
              </td>
            ))}
          </tr>

          {/* Aksiyon */}
          <tr>
            <td className="py-3.5 px-3 font-bold text-slate-500">Karar & Onay</td>
            {proposals.map((p) => (
              <td key={p.id} className="py-3.5 px-3">
                <button
                  onClick={() => onAccept(p.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition"
                >
                  Teklifi Kabul Et ✨
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
