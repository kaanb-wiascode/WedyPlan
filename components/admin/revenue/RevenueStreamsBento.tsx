"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RevenueStreamsBento() {
  const streams = [
    { name: "Vendor Subscriptions (SaaS)", amount: "823.600 ₺", share: "%58", trend: "+%14", icon: "🏢" },
    { name: "Marketplace Escrow Commissions", amount: "340.800 ₺", share: "%24", trend: "+%22", icon: "💳" },
    { name: "Featured & Premium Listings", amount: "156.200 ₺", share: "%11", trend: "+%18", icon: "⭐" },
    { name: "AI Kredileri & Lead Satışları", amount: "99.400 ₺", share: "%7", trend: "+%35", icon: "🤖" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Gelir Kaynakları Dağılımı (Revenue Streams Breakdown)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {streams.map((st, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl">{st.icon}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {st.trend}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{st.name}</h4>
              <div className="text-xl font-serif font-bold text-emerald-600 mt-1">{st.amount}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Pay: {st.share}</span>
              <span>Aylık Düzenli</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
