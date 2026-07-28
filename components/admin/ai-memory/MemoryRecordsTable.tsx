"use client";

import React, { useState } from "react";
import { retrieveSmartContextAction, purgeAIMemoryPrivacyAction } from "@/lib/actions/ai-memory-engine";

export default function MemoryRecordsTable() {
  const [testEntityId, setTestEntityId] = useState("couple_c101");
  const [testQuery, setTestPrompt] = useState("Çiftin düğün mekanı ve bütçe tercihleri nelerdir?");
  const [recallResult, setRecallResult] = useState<any>(null);

  const [records] = useState([
    { id: "mem_101", entityId: "couple_c101", type: "COUPLE_MEMORY", memoryText: "Maksimum bütçe 750.000 TL, Bodrum deniz kenarı mekan aranıyor", score: 95, lastAccessed: "10 dk önce" },
    { id: "mem_102", entityId: "vendor_v202", type: "VENDOR_MEMORY", memoryText: "Bodrum Sunset Venue min paket ücreti 350.000 TL, 200 kişilik", score: 88, lastAccessed: "1 saat önce" },
  ]);

  const handleTestRecall = async () => {
    const res = await retrieveSmartContextAction({
      entityId: testEntityId,
      queryPrompt: testQuery,
      topK: 5,
      minImportanceScore: 30,
    });

    if (res.success) {
      setRecallResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handlePurge = async (entityId: string) => {
    const res = await purgeAIMemoryPrivacyAction({
      entityId,
      reason: "Kullanıcı KVKK Unutulma Hakkı talebi ile silindi.",
    });

    if (res.success) {
      alert("🚨 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Smart Recall Live Playground */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Smart Recall & Context Tester Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Vector Search Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Varlık (Entity) ID</label>
              <input
                type="text"
                value={testEntityId}
                onChange={(e) => setTestEntityId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Test Sorgu Prompt'u</label>
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleTestRecall}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Vektör Bellekten Bağlam Çek (Recall)
          </button>

          {recallResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-1">
              <div className="text-white font-bold">● Birleştirilmiş Bağlam (Injected Context):</div>
              <div className="text-slate-200 pt-1 leading-relaxed">{recallResult.assembledContext}</div>
              <div className="text-slate-400 text-[10px] pt-2 border-t border-slate-800">
                Bulunan Parça: {recallResult.retrievedMemoriesCount} | Tasarruf Edilen Token: {recallResult.tokensSavedByCompression} | Ort. Önem Skoru: %{recallResult.averageImportanceScore}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Kayıtlı Bellekler Tablosu */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Örnek Anlamsal Vektör Kayıtları ({records.length} Kayıt)
        </span>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
              <th className="py-3 px-2">Varlık ID / Tür</th>
              <th className="py-3 px-2">Anlamsal Metin</th>
              <th className="py-3 px-2">Önem Skoru</th>
              <th className="py-3 px-2">Son Erişim</th>
              <th className="py-3 px-2 text-right">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                  {r.entityId}
                  <span className="block text-[10px] text-purple-600 font-mono">{r.type}</span>
                </td>
                <td className="py-3 px-2 text-slate-700 dark:text-slate-300 max-w-[250px] truncate">{r.memoryText}</td>
                <td className="py-3 px-2 font-mono font-bold text-emerald-600">%{r.score}</td>
                <td className="py-3 px-2 text-slate-500 font-mono text-[10px]">{r.lastAccessed}</td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => handlePurge(r.entityId)}
                    className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold hover:bg-rose-200 transition text-[10px]"
                  >
                    KVKK Sil 🚨
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
