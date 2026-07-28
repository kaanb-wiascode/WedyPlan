"use client";

import React, { useState } from "react";
import { saveSearchSynonymRuleAction } from "@/lib/actions/admin-search-ops";

export default function RankingAndSynonymsTable() {
  const [mainTerm, setMainTerm] = useState("");
  const [synonymText, setSynonymText] = useState("");

  const synonyms = [
    { id: "syn_1", mainTerm: "Kır Düğünü", terms: ["Açık Hava Düğünü", "Bahçe Düğünü", "Doğa Düğünü"] },
    { id: "syn_2", mainTerm: "Fotoğrafçı", terms: ["Düğün Hikayesi", "Dış Çekim", "Sinematik Video"] },
  ];

  const handleAddSynonym = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainTerm || !synonymText) return;

    const res = await saveSearchSynonymRuleAction({
      mainTerm,
      synonyms: synonymText.split(",").map((s) => s.trim()),
    });

    if (res.success) {
      alert("✨ " + res.message);
      setMainTerm("");
      setSynonymText("");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🔤 Eş Anlamlı Kelime Matrisi (Synonym Rules) & Algoritma Kuralları
        </span>
      </div>

      {/* Yeni Eş Anlamlı Ekleme Formu */}
      <form onSubmit={handleAddSynonym} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-3">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">+ Yeni Eş Anlamlı Kural Tanımla</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Ana Kelime (Örn: Kır Düğünü)..."
            value={mainTerm}
            onChange={(e) => setMainTerm(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-bold"
          />
          <input
            type="text"
            placeholder="Eş Anlamlılar (Virgülle ayırın: Açık Hava, Bahçe)..."
            value={synonymText}
            onChange={(e) => setSynonymText(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition"
        >
          Kuralı Kaydet & İndekse İşle ✨
        </button>
      </form>

      {/* Eş Anlamlılar Listesi */}
      <div className="space-y-2">
        <span className="font-bold text-slate-700 dark:text-slate-200 block">Aktif Eş Anlamlı Kuralları</span>
        <div className="space-y-2">
          {synonyms.map((syn) => (
            <div key={syn.id} className="p-3 rounded-2xl bg-white dark:bg-slate-800 border flex justify-between items-center">
              <div>
                <span className="font-bold text-cyan-600">{syn.mainTerm}</span>
                <span className="text-slate-400 mx-2 font-mono">==</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{syn.terms.join(", ")}</span>
              </div>
              <button
                onClick={() => alert("🗑️ Kural Silindi: " + syn.mainTerm)}
                className="text-rose-600 font-bold hover:underline text-[10px]"
              >
                Sil ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
