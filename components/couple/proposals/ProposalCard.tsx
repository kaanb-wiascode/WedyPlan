"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProposalCard({
  proposal,
  isSelected,
  onToggleSelect,
}: {
  proposal: any;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={"p-5 rounded-3xl border backdrop-blur-2xl transition space-y-3 " +
        (isSelected
          ? "bg-rose-50/60 dark:bg-rose-950/30 border-rose-500 shadow-md"
          : "bg-white/70 dark:bg-slate-900/70 border-white/60 dark:border-slate-800")
      }
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-rose-500 uppercase">{proposal.category}</span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{proposal.vendorName}</h3>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(proposal.id)}
          className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
        />
      </div>

      <div className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
        {proposal.price.toLocaleString("tr-TR")} {proposal.currency}
      </div>

      <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-emerald-600 font-bold">%{proposal.bestValueScore} F/P Skoru</span>
        <span className="text-slate-400">Son Gün: {proposal.expirationDate}</span>
      </div>
    </motion.div>
  );
}
