"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PartnerLeaderboardBento() {
  const topPartners = [
    { rank: "👑 #1", name: "Selin Yılmaz (Luxury Wedding Planner)", type: "WEDDING_PLANNER", referrals: 142, revenueGenerated: "1.420.000 ₺", score: "99/100" },
    { rank: "🥈 #2", name: "Düğün Rehberi Ajansı", type: "AGENCY", referrals: 98, revenueGenerated: "980.000 ₺", score: "96/100" },
    { rank: "🥉 #3", name: "Ece Weddings (Influencer)", type: "INFLUENCER", referrals: 64, revenueGenerated: "540.000 ₺", score: "92/100" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🏆 En Yüksek Performans Gösteren İş Ortakları (Leaderboard)
      </span>

      <div className="space-y-2">
        {topPartners.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -1 }}
            className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-600 text-sm">{p.rank}</span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{p.name}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{p.type} • {p.referrals} Yönlendirme</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif font-bold text-emerald-600 text-sm block">{p.revenueGenerated}</span>
              <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                AI Skoru: {p.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
