"use client";

import React, { useState } from "react";
import { searchVectorSimilarityAction } from "@/lib/actions/ai-vector-platform";

export default function VectorSearchExplorerTable() {
  const [queryText, setQueryText] = useState("Bodrum'da deniz kenarında kır düğünü yapmak istiyorum");
  const [sourceType, setSourceType] = useState<any>("VENDOR_PROFILE");
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleExecuteSearch = async () => {
    const res = await searchVectorSimilarityAction({
      queryText,
      sourceType,
      topK: 5,
      minSimilarityScore: 0.75,
    });

    if (res.success) {
      setSearchResult(res.data);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Interactive Vector Search & RAG Tester */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Semantic Vector Search Console (Cosine Similarity)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Cosine Similarity Engine
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Koleksiyon / Kaynak</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="VENDOR_PROFILE">VENDOR_PROFILE (Tedarikçiler)</option>
                <option value="CONTRACT">CONTRACT (Sözleşmeler)</option>
                <option value="PORTFOLIO">PORTFOLIO (Görsel/Hizmetler)</option>
                <option value="KNOWLEDGE_BASE">KNOWLEDGE_BASE (Rehberler)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sorgu Metni (Natural Language Query)</label>
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleExecuteSearch}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Vektör Uzayında Anlamsal Arama Yap
          </button>

          {searchResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Arama Süresi: {searchResult.latencyMs}ms</span>
                <span className="text-slate-400 text-[10px]">Taranan Aday Vektör: {searchResult.totalCandidatesScanned.toLocaleString("tr-TR")}</span>
              </div>

              <div className="space-y-2">
                {searchResult.matchedChunks.map((chunk: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-indigo-400 font-bold">Chunk ID: {chunk.chunkId} ({chunk.sourceId})</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                        Benzerlik Skoru: %{(chunk.similarityScore * 100).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed">{chunk.content}</p>
                    <div className="text-[9px] text-slate-500 pt-1">Metadata: {JSON.stringify(chunk.metadata)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
