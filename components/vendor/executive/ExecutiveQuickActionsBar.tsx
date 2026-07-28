"use client";

import React from "react";
import { executeExecutiveAction } from "@/lib/actions/vendor-executive";

export default function ExecutiveQuickActionsBar({
  vendorId,
}: {
  vendorId: string;
}) {
  const handleExecute = async (actionType: any) => {
    const res = await executeExecutiveAction(vendorId, { actionType });
    if (res.success) {
      alert("👑 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚡ Yönetici Onay & Hızlı Sevk Barları
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => handleExecute("APPROVE_PROPOSAL")}
          className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition text-left"
        >
          ✓ Teklifi Onayla & Gönder
        </button>

        <button
          onClick={() => handleExecute("LAUNCH_CAMPAIGN")}
          className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-800 dark:text-purple-300 font-bold hover:bg-purple-100 transition text-left"
        >
          📢 %10 Kampanya Başlat
        </button>

        <button
          onClick={() => handleExecute("ASSIGN_STAFF")}
          className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 text-indigo-800 dark:text-indigo-300 font-bold hover:bg-indigo-100 transition text-left"
        >
          👥 Saha Şefi Ata
        </button>

        <button
          onClick={() => handleExecute("CREATE_TASK")}
          className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 text-amber-800 dark:text-amber-300 font-bold hover:bg-amber-100 transition text-left"
        >
          📋 Mutfak Görevi Aç
        </button>
      </div>
    </div>
  );
}
