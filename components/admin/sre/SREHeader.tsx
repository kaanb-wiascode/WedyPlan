"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SREHeader({
  reliabilityScore,
  activeIncidents,
  statusPageStatus,
  onOpenIncidentModal,
}: {
  reliabilityScore: number;
  activeIncidents: number;
  statusPageStatus: string;
  onOpenIncidentModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Shared Site Reliability Engineering (SRE) Control Center
            </span>
            <span className="text-xs text-slate-400">SLI/SLO, Error Budget, Runbooks, Incidents & Status Pages</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Site Reliability Engineering (SRE) Platform</h1>
        </div>

        <button
          onClick={onOpenIncidentModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚨 Yeni SRE Olayı (Incident) Bildir
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Genel Güvenilirlik Skoru</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>%{reliabilityScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Target 99.95%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sorumlu SRE Mimarisi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Olaylar (Incidents)</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activeIncidents} Olay</div>
          <span className="text-[11px] text-amber-600 font-bold block mt-0.5">SEV-2 High Priority</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Canlı Durum Sayfası</span>
          <div className="text-lg font-bold mt-1 text-emerald-600 font-mono">{statusPageStatus}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Public Status Page Live</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ortalama Kurtarma Süresi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">4 DAKİKA</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">MTTR (Mean Time to Resolve)</span>
        </motion.div>
      </div>
    </div>
  );
}
