"use client";

import React, { useState } from "react";
import { executeRAGQueryAction } from "@/lib/actions/ai-rag-engine";

export default function RAGQueryExplorerTable() {
  const [userQuery, setUserQuery] = useState("Bodrum'da deniz kenarında düğün mekanı fiyatları ve iptal şartları nedir?");
  const [callerPortal, setCallerPortal] = useState<any>("COUPLE");
  const [ragResult, setRagResult] = useState<any>(null);

  const handleExecuteRAG = async () => {
    const res = await executeRAGQueryAction({
      userQuery,
      callerPortal,
      topK: 5,
      enableHybridSearch: true,
      minSimilarityScore: 0.75,
    });

    if (res.success) {
      setRagResult(res.data);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live RAG Tester & Citation Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive RAG Pipeline & Citation Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            6-Step Pipeline Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Çağıran Portal (Role Context)</label>
              <select
                value={callerPortal}
                onChange={(e) => setCallerPortal(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="COUPLE">COUPLE (Çift Portal)</option>
                <option value="VENDOR">VENDOR (Tedarikçi Portal)</option>
                <option value="PUBLIC">PUBLIC (Kamu/Arama)</option>
                <option value="ADMIN">ADMIN (Yönetici)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kullanıcı Sorusu (Query)</label>
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleExecuteRAG}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 RAG Boru Hattından Atıflı Yanıt Üret
          </button>

          {ragResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● RAG Yanıtı (Faithfulness: %{ragResult.faithfulnessScore})</span>
                <span className="text-slate-400 text-[10px]">Toplam Latency: {ragResult.latencyBreakdownMs.total}ms</span>
              </div>

              <p className="text-slate-100 text-xs leading-relaxed font-sans bg-slate-900 p-3 rounded-xl border border-slate-800">
                {ragResult.generatedAnswer}
              </p>

              {/* Atıf Dipnot Kartları (Citations) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">📌 Kullanılan Doğrulanmış Kaynaklar (Citations)</span>
                {ragResult.citations.map((c: any, i: number) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-400 font-bold">[Kaynak {i + 1}] {c.sourceTitle}</span>
                      <span className="text-emerald-400 font-bold font-mono">Güven: %{(c.confidenceScore * 100).toFixed(0)}</span>
                    </div>
                    <p className="text-slate-300 font-sans italic">"{c.excerpt}"</p>
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
