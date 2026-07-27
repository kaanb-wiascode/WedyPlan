"use client";

import React from "react";
import AIWebsiteStoryWidget from "./AIWebsiteStoryWidget";

export default function SectionControlsSidebar({
  settings,
  setSettings,
  sections,
  setSections,
  onStoryGenerated,
}: {
  settings: any;
  setSettings: (s: any) => void;
  sections: any[];
  setSections: (s: any[]) => void;
  onStoryGenerated: (title: string, content: string) => void;
}) {
  const toggleSection = (id: string) => {
    setSections(
      sections.map((sec) => (sec.id === id ? { ...sec, isVisible: !sec.isVisible } : sec))
    );
  };

  return (
    <div className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl space-y-6 overflow-y-auto max-h-[750px]">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        🎛️ Site Ayarları & Bölümler
      </h3>

      {/* Tema & Bağlantı Ayarları */}
      <div className="space-y-3 border-b border-slate-200/60 dark:border-slate-800 pb-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Çift İsimleri</label>
          <input
            type="text"
            value={settings.coupleNames}
            onChange={(e) => setSettings({ ...settings, coupleNames: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Özel Web Adresi (Slug)</label>
          <div className="flex items-center text-slate-400">
            <span className="text-[10px] pr-1">wed.yplan.com/</span>
            <input
              type="text"
              value={settings.slug}
              onChange={(e) => setSettings({ ...settings, slug: e.target.value })}
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tasarım Teması</label>
          <select
            value={settings.themeId}
            onChange={(e) => setSettings({ ...settings, themeId: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          >
            <option value="theme_boho_luxe">Bohemian Luxe (Ege & Akdeniz)</option>
            <option value="theme_editorial">Editorial Serif (Lüks & Modern)</option>
            <option value="theme_coastal">Coastal Elegance (Sahil Düğünü)</option>
          </select>
        </div>
      </div>

      {/* AI Hikaye Widget */}
      <AIWebsiteStoryWidget onStoryGenerated={onStoryGenerated} />

      {/* Bölün Yönetimi & Sıralama */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          📑 Sayfa Bölümleri & Görünürlük
        </span>
        <div className="space-y-2">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="cursor-grab text-slate-400">⋮⋮</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{sec.label}</span>
              </div>
              <input
                type="checkbox"
                checked={sec.isVisible}
                onChange={() => toggleSection(sec.id)}
                className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
