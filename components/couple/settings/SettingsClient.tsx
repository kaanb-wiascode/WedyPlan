"use client";

import React, { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import ProfileSettingsTab from "./ProfileSettingsTab";
import PartnerSettingsTab from "./PartnerSettingsTab";
import SecuritySessionsTab from "./SecuritySessionsTab";
import PreferencesTab from "./PreferencesTab";

export default function SettingsClient({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("PROFILE");

  const tabs = [
    { id: "PROFILE", label: "👤 Profil & Kişisel" },
    { id: "PARTNER", label: "💍 Partner Bağlantısı" },
    { id: "SECURITY", label: "🔒 Güvenlik & Oturumlar" },
    { id: "PREFERENCES", label: "📦 Veri & Tercihler" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SettingsHeader
        partnerStatus="Kaan Yılmaz ile Bağlı"
        securityScore={95}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Sol Menü (3 Sütun) */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={"w-full p-3.5 rounded-2xl text-xs font-bold text-left transition " +
                (activeTab === tab.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                  : "bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100")
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sağ İçerik (9 Sütun) */}
        <div className="lg:col-span-9">
          {activeTab === "PROFILE" && <ProfileSettingsTab userId={userId} />}
          {activeTab === "PARTNER" && <PartnerSettingsTab />}
          {activeTab === "SECURITY" && <SecuritySessionsTab userId={userId} />}
          {activeTab === "PREFERENCES" && <PreferencesTab userId={userId} />}
        </div>
      </div>
    </div>
  );
}
