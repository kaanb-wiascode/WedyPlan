"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveModerationReportAction } from "@/lib/actions/admin-moderation";

export default function ModerationDetailDrawer({
  report,
  isOpen,
  onClose,
}: {
  report: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [reasonNotes, setReasonNotes] = useState("");
  const [applyBan, setApplyBan] = useState(false);

  if (!isOpen || !report) return null;

  const handleResolve = async (decision: any) => {
    const res = await resolveModerationReportAction({
      reportId: report.id,
      decision,
      reasonNotes: reasonNotes || "Moderatör incelemesi tamamlandı.",
      applyBan,
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
              <span className="text-[10px] font-bold uppercase text-rose-600">360° İhlal & Güvenlik Denetleyicisi</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{report.violationCategory}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* İhlal Edilen İçerik Önizlemesi */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Şikayet Edilen Metin / Görsel</span>
            <p className="text-slate-800 dark:text-slate-200 text-xs italic leading-relaxed p-3 bg-white dark:bg-slate-800 rounded-xl border">
              "{report.contentSnippet || "İçerik önizleme verisi yuklendi."}"
            </p>
          </div>

          {/* AI Teşhis Raporu */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 space-y-1">
            <span className="text-[10px] text-rose-600 font-bold uppercase block">🤖 AI Teşhir Nedeni</span>
            <p className="text-rose-900 dark:text-rose-200 text-[11px] font-medium leading-relaxed">
              İçerik %{report.aiUnsafeScore} oranında güvensiz bulundu. İhlal türü: {report.violationCategory}.
            </p>
          </div>

          {/* Moderatör Karar Notu */}
          <div className="space-y-2">
            <label className="font-semibold block text-slate-700 dark:text-slate-200">Moderatör Karar Notu</label>
            <textarea
              rows={3}
              value={reasonNotes}
              onChange={(e) => setReasonNotes(e.target.value)}
              placeholder="Gerekçenizi detaylandırın..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
            />
          </div>

          {/* Ban Hesabı Kutusu */}
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/40">
            <input
              type="checkbox"
              checked={applyBan}
              onChange={(e) => setApplyBan(e.target.checked)}
              className="rounded text-rose-600 border-slate-300"
            />
            <span className="font-bold text-rose-600">🚫 Kullanıcı/Tedarikçi Hesabını Dondur / Ban İşle</span>
          </label>

          {/* Karar Butonları */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleResolve("REMOVE_CONTENT")}
              className="py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
            >
              İçeriği Kaldır ✕
            </button>
            <button
              onClick={() => handleResolve("APPROVE_CLEAN")}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              Temiz Onayla ✓
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
