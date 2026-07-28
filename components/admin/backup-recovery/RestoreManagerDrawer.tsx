"use client";

import React, { useState } from "react";
import { executeSystemRestoreAction } from "@/lib/actions/admin-backup-recovery";

export interface RestoreSnapshot {
  id: string;
  title: string;
  createdAt: string;
  sizeMb: number;
}

export default function RestoreManagerDrawer({
  snapshot,
  isOpen,
  onClose,
}: {
  snapshot: RestoreSnapshot | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [targetEnv, setTargetEnv] = useState<"STAGING_SANDBOX" | "PRODUCTION_FAILOVER">("STAGING_SANDBOX");
  const [confirmCode, setConfirmCode] = useState("");
  const [reason, setReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !snapshot) return null;

  const handleRestore = async () => {
    if (confirmCode !== "CONFIRM_RESTORE_2026") {
      alert("⚠️ Onay kodu hatalı! Lütfen 'CONFIRM_RESTORE_2026' yazın.");
      return;
    }

    setIsProcessing(true);

    const res = await executeSystemRestoreAction({
      snapshotId: snapshot.id,
      targetEnvironment: targetEnv,
      confirmCode: "CONFIRM_RESTORE_2026",
      reason: reason || "Yönetici güvenlik testi gerçekleştirdi.",
    });

    setIsProcessing(false);

    if (res.success) {
      alert("🚀 " + res.message);
      onClose();
    } else {
      alert("❌ Hata: " + (res.error || "Geri yükleme başarısız."));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end text-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full p-6 space-y-6 overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">Yedek Geri Yükleme Masası</h2>
            <span className="text-[10px] text-slate-400 font-mono">Snapshot ID: {snapshot.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold block">⚠️ DİKKAT: Veritabanı Geri Yükleme İşlemi</span>
            <p className="text-[11px] leading-relaxed">
              Bu işlem seçili snapshot verisini veritabanına yazacaktır. İşlem öncesi güvenlik kilit kodu girilmesi zorunludur.
            </p>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Ortam (Environment)</label>
            <select
              value={targetEnv}
              onChange={(e) => setTargetEnv(e.target.value as "STAGING_SANDBOX" | "PRODUCTION_FAILOVER")}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="STAGING_SANDBOX">STAGING_SANDBOX (Test Veritabanı)</option>
              <option value="PRODUCTION_FAILOVER">PRODUCTION_FAILOVER (Canlı Veritabanı)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">
              Geri Yükleme Gerekçesi
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Örn: Veri felaket senaryosu testi veya sehven silinen verileri kurtarma"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 resize-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">
              Güvenlik Onay Kodu (Girin: <code className="text-rose-600 font-bold">CONFIRM_RESTORE_2026</code>)
            </label>
            <input
              type="text"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
              placeholder="CONFIRM_RESTORE_2026"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold uppercase"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              İptal Et
            </button>
            <button
              onClick={handleRestore}
              disabled={isProcessing}
              className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition disabled:opacity-50"
            >
              {isProcessing ? "Geri Yükleniyor..." : "Geri Yüklemeyi Başlat 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
