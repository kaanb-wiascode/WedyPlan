"use client";

import React from "react";

export default function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}: {
  conversations: any[];
  activeId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}) {
  return (
    <div className="h-full flex flex-col border-r border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-l-3xl overflow-hidden">
      {/* Üst Arama & Filtre */}
      <div className="p-4 space-y-3 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            💬 Mesajlar
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            Canlı
          </span>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sohbet veya tedarikçi ara..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
        />

        <div className="flex gap-1">
          {["ALL", "VENDOR", "AI", "SUPPORT"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={"flex-1 py-1 rounded-lg text-[10px] font-bold transition " +
                (activeFilter === f
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800")
              }
            >
              {f === "ALL" ? "Tümü" : f === "VENDOR" ? "Tedarikçi" : f === "AI" ? "✦ AI" : "Destek"}
            </button>
          ))}
        </div>
      </div>

      {/* Sohbet Listesi */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={"w-full p-3.5 text-left flex gap-3 items-center transition " +
              (activeId === c.id
                ? "bg-rose-50/80 dark:bg-rose-950/30 border-r-2 border-rose-500"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/40")
            }
          >
            <div className="relative w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-xs">
              {c.avatarUrl ? (
                <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                c.name.substring(0, 2)
              )}
              {c.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{c.name}</h4>
                <span className="text-[9px] text-slate-400">{c.lastTime}</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
            </div>

            {c.unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500 text-white">
                {c.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
