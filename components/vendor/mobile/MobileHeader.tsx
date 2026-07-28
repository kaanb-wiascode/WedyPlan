"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileHeader({
  vendorName,
  isOnline,
  pendingOfflineSyncsCount,
}: {
  vendorName: string;
  isOnline: boolean;
  pendingOfflineSyncsCount: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            WedyPlan Mobile OS
          </span>
        </div>

        {/* Çevrimdışı / Çevrimiçi Rozeti */}
        <div className="flex items-center gap-2">
          <span
            className={"px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 " +
              (isOnline
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
            }
          >
            <span className={"w-1.5 h-1.5 rounded-full " + (isOnline ? "bg-emerald-500" : "bg-amber-500")} />
            {isOnline ? "Çevrimiçi" : "Çevrimdışı Mod"}
          </span>

          {pendingOfflineSyncsCount > 0 && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white font-mono">
              {pendingOfflineSyncsCount} Bekleyen
            </span>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">{vendorName}</h1>
        <p className="text-xs text-slate-400">Saha Operasyon & Mobil Komuta Paneli</p>
      </div>
    </div>
  );
}
