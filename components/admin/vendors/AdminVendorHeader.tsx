"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminVendorHeader({
  totalVendors,
  pendingApprovals,
  suspendedCount,
  searchQuery,
  setSearchQuery,
}: {
  totalVendors: number;
  pendingApprovals: number;
  suspendedCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Vendor Governance OS
            </span>
            <span className="text-xs text-slate-400">Tüm Tedarikçiler, Onaylar & İhlal Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Vendor Management Center</h1>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Tedarikçi adı, VKN veya şehir arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Kayıtlı Toplam Tedarikçi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalVendors} İşletme</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">18 Farklı Düğün Kategorisi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Onay Bekleyen Başvurular</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{pendingApprovals} Başvuru</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Vergi Levhası & İmzalar İnceleniyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Askıdaki / Cezalı Tedarikçi</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{suspendedCount} İşletme</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kural İhlali veya Düşük CSAT</span>
        </motion.div>
      </div>
    </div>
  );
}
