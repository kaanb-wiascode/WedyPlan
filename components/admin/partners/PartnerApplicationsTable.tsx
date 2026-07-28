"use client";

import React from "react";
import { approvePartnerApplicationAction, processPartnerPayoutAction } from "@/lib/actions/admin-partners";

export default function PartnerApplicationsTable({
  partners,
}: {
  partners: any[];
}) {
  const handleApprove = async (partnerId: string) => {
    const res = await approvePartnerApplicationAction({
      partnerId,
      commissionRate: 12,
      assignedTier: "PLATINUM_VIP",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handlePayout = async (partnerId: string, unpaidAmount: number) => {
    const res = await processPartnerPayoutAction({
      partnerId,
      payoutAmount: unpaidAmount,
      taxDeductionRate: 20,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📋 İş Ortaklığı Listesi & Hakediş Masası ({partners.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Ortak Adı / Tür</th>
            <th className="py-3 px-2">Takip Kodu / Kupon</th>
            <th className="py-3 px-2">Komisyon %</th>
            <th className="py-3 px-2">Biriken Hakediş</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {partners.map((pt) => (
            <tr key={pt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {pt.name}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{pt.type} • Tier: {pt.tier}</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600 text-[10px]">
                {pt.trackingCode}
              </td>
              <td className="py-3 px-2 font-mono font-bold text-purple-600">%{pt.commissionRate}</td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600 text-sm">
                {pt.unpaidBalance.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (pt.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {pt.status === "ACTIVE" ? "● Aktif Ortak" : "Onay Bekliyor"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                {pt.status === "PENDING_APPROVAL" ? (
                  <button
                    onClick={() => handleApprove(pt.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                  >
                    Başvuruyu Onayla ✓
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayout(pt.id, pt.unpaidBalance)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition text-[10px]"
                  >
                    Hakediş Öde 💸
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
