"use client";

import React from "react";

export default function AITimelinePreview({ data }: { data: any }) {
  const schedule = data?.schedule || [
    { time: "18:30", title: "Nikah Seremonisi", desc: "Açık hava sahilde nikah kıyılması" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4 block">
        📅 AI Üretilen Zaman Çizelgesi
      </span>

      <div className="space-y-3">
        {schedule.map((item: any, i: number) => (
          <div key={i} className="flex gap-3 text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{item.time}</span>
            <div>
              <h5 className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</h5>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}