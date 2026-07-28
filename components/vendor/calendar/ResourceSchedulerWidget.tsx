"use client";

import React from "react";

export default function ResourceSchedulerWidget({ resources }: { resources: any }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🚚 Saha Lojistiği, Ekipman & Personel Atama Matrisi
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personel Atamaları */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <span>👥 Görevli Personel ({resources.staff.length})</span>
          </h4>
          <div className="space-y-1">
            {resources.staff.map((st: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-800 border text-[11px]">
                <span className="font-semibold">{st.name}</span>
                <span className="text-[10px] text-emerald-600 font-bold">{st.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Araç Filosu */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <span>🚛 Nakliye & VIP Araçlar ({resources.vehicles.length})</span>
          </h4>
          <div className="space-y-1">
            {resources.vehicles.map((vh: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-800 border text-[11px]">
                <span className="font-semibold">{vh.plate}</span>
                <span className="text-[10px] text-indigo-600 font-bold">{vh.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zimmetli Ekipmanlar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <span>📦 Sahada Kullanılan Ekipmanlar ({resources.equipment.length})</span>
          </h4>
          <div className="space-y-1">
            {resources.equipment.map((eq: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-slate-800 border text-[11px]">
                <span className="font-semibold">{eq.name}</span>
                <span className="text-[10px] text-amber-600 font-bold">{eq.assignedTo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
