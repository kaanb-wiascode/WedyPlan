"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProfileHeader({
  businessName,
  profileScore,
  onPublish,
  isPublishing,
}: {
  businessName: string;
  profileScore: number;
  onPublish: () => void;
  isPublishing: boolean;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Showcase Manager
            </span>
            <span className="text-xs text-slate-400">Kamuya Açık Vitrin Yöneticisi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">{businessName}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {isPublishing ? "Yayınlanıyor..." : "🌐 Vitrini Canlıda Güncelle"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Profil Doluluk Skoru</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">%{profileScore} Tamamlandı</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: profileScore + "%" }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Google SEO İndeks Durumu</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">İndekslendi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">1. Sayfa Arama Performansı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Eksik Bilgi Uyarısı</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">2 Madde</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dönüşümü Artırmak İçin Tamamlayın</span>
        </motion.div>
      </div>
    </div>
  );
}
