"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PartnerActivityWidget({ partnerName }: { partnerName: string }) {
  const activities = [
    { action: "Müzik grubunu favorilere ekledi", time: "2 saat önce" },
    { action: "Catering bütçe limitini güncelledi", time: "Dün" },
  ];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Partner Aktivitesi</span>
        <span className="text-xs font-semibold text-rose-600">{partnerName}</span>
      </div>

      <div className="space-y-2">
        {activities.map((act, i) => (
          <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-slate-700 dark:text-slate-300">{act.action}</span>
            <span className="text-[10px] text-slate-400">{act.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}