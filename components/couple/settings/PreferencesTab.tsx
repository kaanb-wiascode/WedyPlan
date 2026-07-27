"use client";

import React, { useState } from "react";
import { exportUserDataAction } from "@/lib/actions/settings";

export default function PreferencesTab({ userId }: { userId: string }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    const res = await exportUserDataAction(userId);
    setIsExporting(false);

    if (res.success && res.downloadUrl) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Veri Dışa Aktarma (KVKK / GDPR Export) */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📦 KVKK / GDPR Veri Paketleyici (Data Export)
        </h3>
        <p className="text-slate-500 leading-relaxed">
          WedyPlan üzerindeki tüm bütçe verilerinizi, konuk listelerinizi, sözleşmelerinizi ve sohbet geçmişinizi tek tıkla cihazınıza indirebilirsiniz.
        </p>

        <button
          onClick={handleExportData}
          disabled={isExporting}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isExporting ? "Veriler Paketlemeye Alındı..." : "📥 Tüm Düğün Verilerimi İndir (.ZIP)"}
        </button>
      </div>

      {/* Tehlikeli Alan / Hesabı Sil */}
      <div className="p-6 backdrop-blur-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600">
          ⚠️ Tehlikeli Alan (Danger Zone)
        </h3>
        <p className="text-rose-800 dark:text-rose-300 leading-relaxed">
          Hesabınızı sildiğiniz takdirde düğün web siteniz canlıdan kaldırılacak, tüm sözleşmeleriniz ve bütçe verileriniz kalıcı olarak imha edilecektir.
        </p>

        <button
          onClick={() => {
            if (confirm("Düğün hesabınızı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
              alert("Hesap silme talebiniz alındı.");
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
        >
          Hesabımı ve Tüm Verilerimi Kalıcı Olarak Sil
        </button>
      </div>
    </div>
  );
}
