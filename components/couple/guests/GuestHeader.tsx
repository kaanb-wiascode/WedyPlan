"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GuestHeader({
  totalGuests,
  confirmedGuests,
  pendingGuests,
  declinedGuests,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: {
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Guest Intelligence
            </span>
            <span className="text-xs text-slate-400">Gelişmiş LCV & Konuk Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Guest Management</h1>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium hover:bg-slate-50 transition">
            📥 Excel Yükle
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition">
            + Yeni Konuk Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Toplam Davetli</span>
          <div className="text-2xl font-bold mt-1">{totalGuests} Kişi</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Katılım Onaylandı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{confirmedGuests} Kişi</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Yanıt Bekliyor</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{pendingGuests} Kişi</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Katılamayacak</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{declinedGuests} Kişi</div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="İsim veya soyisimle konuk ara..."
          className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-xs focus:ring-2 focus:ring-rose-500 outline-none transition"
        />

        <div className="flex gap-2 overflow-x-auto">
          {["ALL", "FAMILY", "FRIEND", "VIP", "WORK"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
                (selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
              }
            >
              {cat === "ALL" ? "Tümü" : cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
