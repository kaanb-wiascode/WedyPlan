"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorCalendarHeader({
  activeEventsCount,
  syncStatusGoogle,
  syncStatusApple,
  viewMode,
  setViewMode,
  onOpenNewEventModal,
}: {
  activeEventsCount: number;
  syncStatusGoogle: boolean;
  syncStatusApple: boolean;
  viewMode: "MONTH" | "WEEK" | "DAY";
  setViewMode: (mode: "MONTH" | "WEEK" | "DAY") => void;
  onOpenNewEventModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Operations & Logistics Engine
            </span>
            <span className="text-xs text-slate-400">Canlı Operasyon & Takvim Takibi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Operations Calendar</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Görünüm Modları */}
          <div className="flex p-1 bg-slate-200/60 dark:bg-slate-800 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setViewMode("MONTH")}
              className={"px-3 py-1.5 rounded-xl transition " + (viewMode === "MONTH" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")}
            >
              Aylık
            </button>
            <button
              onClick={() => setViewMode("WEEK")}
              className={"px-3 py-1.5 rounded-xl transition " + (viewMode === "WEEK" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")}
            >
              Haftalık
            </button>
            <button
              onClick={() => setViewMode("DAY")}
              className={"px-3 py-1.5 rounded-xl transition " + (viewMode === "DAY" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")}
            >
              Günlük Zaman Tüneli
            </button>
          </div>

          <button
            onClick={onOpenNewEventModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
          >
            + Yeni Etkinlik & Lojistik Planla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bu Ayki Planlanan Etkinlikler</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeEventsCount} Operasyon</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Düğün, Kurulum ve Görüşmeler</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Google Calendar Sync</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{syncStatusGoogle ? "● Senkronize" : "Bağlı Değil"}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Çift Yönlü Canlı Takvim Akışı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Apple Calendar Sync</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{syncStatusApple ? "● Senkronize" : "Bağlı Değil"}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">iCal Otomatik Entegrasyon</span>
        </motion.div>
      </div>
    </div>
  );
}
