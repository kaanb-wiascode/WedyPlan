"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processComplianceDataRequestAction } from "@/lib/actions/admin-audit-compliance";

export default function KvkkGdprRequestsDrawer({
  isOpen,
  onClose,
  dataRequests,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataRequests: any[];
}) {
  if (!isOpen) return null;

  const handleProcess = async (requestId: string, action: any) => {
    const res = await processComplianceDataRequestAction({
      requestId,
      action,
      notes: "Yasal süre sınırları dahilinde resmi işlem yürütüldü.",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 md:p-8 overflow-y-auto space-y-6 shadow-2xl text-xs"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-600">KVKK 6698 / GDPR Veri Hakları Masası</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Veri Talepleri & Unutulma Hakları</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">Bekleyen Resmi Kullanıcı Talepleri ({dataRequests.length})</span>

            {dataRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{req.userName}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{req.userEmail} • Talep: {req.requestType}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    SLA: {req.slaDaysLeft} Gün Kaldı
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {req.requestType === "DATA_EXPORT_GDPR" ? (
                    <button
                      onClick={() => handleProcess(req.id, "APPROVE_EXPORT")}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                    >
                      📦 256-bit Şifreli ZIP Üret & İlet
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProcess(req.id, "EXECUTE_ANONYMIZATION")}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-[10px]"
                    >
                      🚫 Verileri Kalıcı Anonimleştir (Unutulma)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">Kapat</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
