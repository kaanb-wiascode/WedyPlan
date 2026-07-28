"use client";

import React from "react";
import { approveAndPublishKnowledgeAction } from "@/lib/actions/ai-knowledge-platform";

export default function KnowledgeAssetsTable({
  assets,
}: {
  assets: any[];
}) {
  const handleApproveAndPublish = async (assetId: string, versionTag: string) => {
    const res = await approveAndPublishKnowledgeAction({
      assetId,
      versionTag,
      autoIndexVector: true,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Bilgi Varlıkları & Onay Masası ({assets.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Başlık / Key</th>
            <th className="py-3 px-2">Kaynak Türü</th>
            <th className="py-3 px-2">Sürüm</th>
            <th className="py-3 px-2">Kalite Skoru</th>
            <th className="py-3 px-2">Etiketler</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {assets.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100 max-w-[200px] truncate">
                {a.title}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">key: {a.assetKey}</span>
              </td>
              <td className="py-3 px-2 font-mono text-indigo-600 font-bold text-[10px]">{a.sourceType}</td>
              <td className="py-3 px-2 font-mono text-purple-600 font-bold">{a.versionTag}</td>
              <td className="py-3 px-2 font-mono font-bold text-emerald-600">%{a.qualityScore}</td>
              <td className="py-3 px-2">
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((t: string, i: number) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono text-[9px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (a.status === "PUBLISHED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {a.status === "PUBLISHED" ? "● Canlıda" : "Onay Bekliyor"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                {a.status !== "PUBLISHED" ? (
                  <button
                    onClick={() => handleApproveAndPublish(a.id, a.versionTag)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition text-[10px]"
                  >
                    Onayla & Yayınla 🚀
                  </button>
                ) : (
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">✓ Synced</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
