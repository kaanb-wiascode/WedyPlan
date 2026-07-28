"use client";

import React from "react";

export default function SLATrackerWidget() {
  const slaMetrics = [
    { title: "Platform Availability", value: "%99.98", target: "99.99% Target", status: "MEETS SLA", color: "text-emerald-600" },
    { title: "API Response Latency", value: "18 ms", target: "< 100ms Target", status: "MEETS SLA", color: "text-teal-600" },
    { title: "System Error Rate", value: "%0.02", target: "< 0.05% Target", status: "MEETS SLA", color: "text-indigo-600" },
    { title: "Success Order Rate", value: "%99.95", target: "> 99.5% Target", status: "MEETS SLA", color: "text-purple-600" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📈 Hizmet Seviyesi Taahhüdü & SLA İzleyici (SLA Tracker)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          SLA Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {slaMetrics.map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">{item.title}</span>
            <div className={`text-lg font-bold font-mono ${item.color}`}>{item.value}</div>
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>{item.target}</span>
              <span className="text-emerald-500 font-bold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}