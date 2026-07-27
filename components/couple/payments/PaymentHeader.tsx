"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PaymentHeader({
  totalPaid,
  upcomingDue,
  refundsTotal,
  activeTab,
  setActiveTab,
  onOpenRecordModal,
}: {
  totalPaid: number;
  upcomingDue: number;
  refundsTotal: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRecordModal: () => void;
}) {
  const tabs = [
    { id: "ALL", label: "Tüm Ödemeler" },
    { id: "UPCOMING", label: "Yaklaşan Taksitler & Vadeler" },
    { id: "PAID", label: "Tamamlanan Ödemeler" },
    { id: "REFUNDED", label: "İadeler & İptaller" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Financial Ledger
            </span>
            <span className="text-xs text-slate-400">Canlı Ödeme & Taksit Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Payment Center</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenRecordModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium hover:shadow-lg transition flex items-center gap-2"
          >
            + Yeni Ödeme Kaydı Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Tamamlanan Toplam Ödeme</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{totalPaid.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Makbuzlu & Onaylanmış</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Yaklaşan Vadeler (30 Gün)</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{upcomingDue.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">2 Taksit Bekliyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Toplam İade & Teminat</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{refundsTotal.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Hesaba Aktarılan</span>
        </motion.div>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
              (activeTab === tab.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
