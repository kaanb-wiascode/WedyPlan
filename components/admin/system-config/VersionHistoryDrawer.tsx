"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rollbackSystemConfigVersionAction } from "@/lib/actions/admin-system-config";

export default function VersionHistoryDrawer({
  isOpen,
  onClose,
  activeVersion,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeVersion: string;
}) {
  const [rollbackTarget, setRollbackTarget] = useState("");

  if (!isOpen) return null;

  const versions = [
    { version: "v4.2", date: "Bugün 01:30", author: "Ahmet Yılmaz (Lead DevOps)", note: "Siber güvenlik MFA oturum süresi güncellendi", isCurrent: true },
    { version: "v4.1", date: "Dün 18:45", author: "Selin Kaya (CTO)", note: "iyzico Escrow komisyon tevkifat oranı %5'e sabitlendi", isCurrent: false },
    { version: "v4.0", date: "24 Temmuz 2026", author: "Sistem Botu", note: "Claude 3.5 Sonnet API anahtarı yenilendi", isCurrent: false },
  ];

  const handleRollback = async (v: string) => {
    const res = await rollbackSystemConfigVersionAction({
      targetVersion: v,
      reason: "Yönetici manuel sürüm geri alma işlemi gerçekleştirdi.",
    });

    if (res.success) {
      alert("✨ " + res.message);
      onClose();
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
              <span className="text-[10px] font-bold uppercase text-indigo-600">Sürüm Kontrolü & Geçmişe Dönüş</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Konfigürasyon Sürüm Geçmişi</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">Kayıtlı Sürüm Snapshot'ları</span>

            {versions.map((v) => (
              <div key={v.version} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-600 text-sm">{v.version}</span>
                    {v.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        ● AKTİF SÜRÜM
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{v.date}</span>
                </div>

                <p className="text-[11px] text-slate-800 dark:text-slate-200 font-medium">{v.note}</p>
                <span className="text-[10px] text-slate-400 block font-mono">Değiştiren: {v.author}</span>

                {!v.isCurrent && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-end">
                    <button
                      onClick={() => handleRollback(v.version)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition text-[10px]"
                    >
                      ↩️ Bu Sürüme Geri Dön (Rollback)
                    </button>
                  </div>
                )}
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
