"use client";

import React from "react";

export default function MobileFeedWidget({
  onQuickAction,
}: {
  onQuickAction: (type: string, id: string) => void;
}) {
  const feedItems = [
    {
      id: "feed_1",
      coupleName: "Selin & Kaan Yılmaz",
      time: "18:30 (Bugün)",
      eventType: "💍 Düğün Seremonisi",
      location: "Bodrum Sunset Venue",
      status: "SAHADA HAZIRLIK",
    },
    {
      id: "feed_2",
      coupleName: "Ece & Mert Demir",
      time: "Yarın 11:00",
      eventType: "🍷 Menü Tadımı Görüşmesi",
      location: "Merkez Ofis",
      status: "ONAY BEKLİYOR",
    },
  ];

  return (
    <div className="space-y-3 text-xs">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
        📋 Yaklaşan Saha Etkinlikleri & Akış
      </span>

      <div className="space-y-3">
        {feedItems.map((item) => (
          <div key={item.id} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.coupleName}</h4>
                <p className="text-[10px] text-slate-400">{item.eventType} • {item.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                {item.status}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-mono font-bold text-indigo-600">{item.time}</span>
              <button
                onClick={() => onQuickAction("COMPLETE_TASK", item.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[10px]"
              >
                ✓ Görevi Kapat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
