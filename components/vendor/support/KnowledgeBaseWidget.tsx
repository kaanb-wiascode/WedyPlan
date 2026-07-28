"use client";

import React, { useState } from "react";

export default function KnowledgeBaseWidget() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    { id: "kb_1", title: "WedyPlan İhale & Müşteri Talebi (Lead) Nasıl Kabul Edilir?", category: "Müşteri Talepleri" },
    { id: "kb_2", title: "E-İmzalı Sözleşme Oluşturma ve Dijital Onay Adımları", category: "Sözleşmeler" },
    { id: "kb_3", title: "Saha Lojistik ve Personel Vardiya Çakışması Nasıl Çözülür?", category: "Operasyon" },
  ];

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📚 Bilgi Bankası & Self-Service Rehberler
        </span>
      </div>

      <input
        type="text"
        placeholder="Yardım makalelerinde veya SSS'lerde arayın..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs"
      />

      <div className="space-y-2">
        {filteredArticles.map((art) => (
          <div key={art.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center hover:border-slate-300 transition cursor-pointer">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{art.title}</h4>
              <span className="text-[10px] text-slate-400">{art.category}</span>
            </div>
            <span className="text-sky-600 font-bold text-xs">Oku →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
