"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VaultHeader({
  totalDocuments,
  usedStorageMb,
  maxStorageMb,
  activeCategory,
  setActiveCategory,
  onUploadClick,
}: {
  totalDocuments: number;
  usedStorageMb: number;
  maxStorageMb: number;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onUploadClick: () => void;
}) {
  const storagePercentage = Math.round((usedStorageMb / maxStorageMb) * 100);

  const categories = [
    { id: "ALL", label: "Tüm Belgeler" },
    { id: "CONTRACT", label: "Sözleşmeler" },
    { id: "INVOICE", label: "Faturalar & Makbuzlar" },
    { id: "GUEST_FILE", label: "Konuk Dosyaları" },
    { id: "MEDIA", label: "Medya & İlhamlar" },
    { id: "RECYCLE", label: "🗑️ Geri Dönüşüm" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Encrypted Digital Vault
            </span>
            <span className="text-xs text-slate-400">Güvenli Düğün Doküman Arşivi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Document Vault</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onUploadClick}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium hover:shadow-lg transition flex items-center gap-2"
          >
            + Yeni Doküman / Belge Yükle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Arşivdeki Doküman Sayısı</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{totalDocuments} Dosya</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">OCR İndeksli</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Kullanılan Bulut Depolama</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{usedStorageMb} MB / {maxStorageMb / 1024} GB</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: storagePercentage + "%" }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Güvenlik & Şifreleme</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">AES-256 Kasa</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otomatik AI Yedeklemeli</span>
        </motion.div>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
              (activeCategory === cat.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
