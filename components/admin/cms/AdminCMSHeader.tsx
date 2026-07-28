"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminCMSHeader({
  publishedPagesCount,
  totalBlogsCount,
  activeTemplatesCount,
  onOpenNewContentModal,
}: {
  publishedPagesCount: number;
  totalBlogsCount: number;
  activeTemplatesCount: number;
  onOpenNewContentModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Enterprise CMS OS
            </span>
            <span className="text-xs text-slate-400">Tüm Kamusal İçerikler, Sayfalar & Medya Kasası</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise CMS</h1>
        </div>

        <button
          onClick={onOpenNewContentModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          + Yeni Sayfa / Blog / Şablon Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Yayındaki Kamusal Sayfalar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{publishedPagesCount} Sayfa</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %98 SEO İndeksleme Başarısı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Rehber & Blog Yazıları</span>
          <div className="text-2xl font-bold mt-1 text-purple-600">{totalBlogsCount} Yazı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Aylık 180.000 Organik Okunma</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Sistem E-Posta / SMS Şablonları</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeTemplatesCount} Şablon</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dinamik Değişken Entegre</span>
        </motion.div>
      </div>
    </div>
  );
}
