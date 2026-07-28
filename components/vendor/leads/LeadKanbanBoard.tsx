"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LeadKanbanBoard({
  leads,
  onSelectLead,
  onUpdateStage,
}: {
  leads: any[];
  onSelectLead: (lead: any) => void;
  onUpdateStage: (leadId: string, newStage: string) => void;
}) {
  const columns = [
    { id: "NEW", label: "Yeni Talepler", color: "bg-blue-500" },
    { id: "QUALIFIED", label: "Uygun / Nitelikli", color: "bg-purple-500" },
    { id: "OFFER_SENT", label: "Teklif İletildi", color: "bg-amber-500" },
    { id: "NEGOTIATION", label: "Pazarlık / Revizyon", color: "bg-indigo-500" },
    { id: "WON", label: "✓ Kazanıldı (Won)", color: "bg-emerald-500" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
      {columns.map((col) => {
        const columnLeads = leads.filter((l) => l.stage === col.id);

        return (
          <div
            key={col.id}
            className="w-72 flex-shrink-0 backdrop-blur-2xl bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-800 rounded-3xl p-4 space-y-3"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={"w-2.5 h-2.5 rounded-full " + col.color} />
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{col.label}</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {columnLeads.length}
              </span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {columnLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  whileHover={{ y: -2 }}
                  onClick={() => onSelectLead(lead)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-sm cursor-pointer space-y-2 hover:border-indigo-300 transition"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{lead.coupleName}</h4>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded-md">
                      %{lead.leadScore}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400">{lead.weddingDate} • {lead.location}</p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{lead.budget.toLocaleString("tr-TR")} ₺</span>
                    <span className="text-[10px] font-semibold text-slate-400">{lead.guestCount} Davetli</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
