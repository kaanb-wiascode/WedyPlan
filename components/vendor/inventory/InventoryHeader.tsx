"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InventoryHeader({
  totalAssetsCount,
  reservedCount,
  inMaintenanceCount,
  totalInventoryValue,
  onOpenNewAssetModal,
}: {
  totalAssetsCount: number;
  reservedCount: number;
  inMaintenanceCount: number;
  totalInventoryValue: number;
  onOpenNewAssetModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              ✦ Physical Asset & Warehouse OS
            </span>
            <span className="text-xs text-slate-400">Demirbaş, Ekipman & Depo Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Inventory & Asset Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("📷 Kamera QR Taraması Başlatılıyor...")}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2"
          >
            🔍 QR ile Çek / Çıkar
          </button>

          <button
            onClick={onOpenNewAssetModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
          >
            + Yeni Varlık / Malzeme Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Toplam Kayıtlı Varlık</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalAssetsCount} Kalem</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Depo & Saha Demirbaşları</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Tahsisli / Rezerveli</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{reservedCount} Kalem</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Düğün Sahalarında Kullanımda</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Bakımda / Hasarlı</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{inMaintenanceCount} Kalem</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Onarım & Servis Sürecinde</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Toplam Envanter Değeri</span>
          <div className="text-2xl font-serif font-bold mt-1 text-emerald-600">{totalInventoryValue.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sigortalı Demirbaş Tutarı</span>
        </motion.div>
      </div>
    </div>
  );
}
