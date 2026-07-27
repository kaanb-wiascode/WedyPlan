"use client";
import React from "react";

type TabType = "general" | "theme" | "venue" | "privacy";

export default function ProfileTabsNav({ activeTab, setActiveTab }: { activeTab: TabType; setActiveTab: (tab: TabType) => void }) {
  return (
    <div className="flex gap-2 border-b pb-2">
      {(["general", "theme", "venue", "privacy"] as TabType[]).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize ${activeTab === tab ? "bg-rose-100 text-rose-700" : "text-slate-500"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
