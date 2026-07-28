"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RAGPipelineStepsBento() {
  const steps = [
    { step: "1. Retrieval", name: "Vektör & BM25 Hibrit Arama", latency: "8ms", icon: "🔍", desc: "PGVector + PostgreSQL BM25 indeksi üzerinden paralel arama" },
    { step: "2. Ranking", name: "Re-Ranking & Cross-Encoder", latency: "12ms", icon: "📊", desc: "Cohere Re-Rank modeli ile metin parçalarını yeniden sıralama" },
    { step: "3. Filtering", name: "Rol & Tenant Yetki Kalkanı", latency: "1ms", icon: "🛡️", desc: "Erişim izni olmayan gizli dokümanları otomatik eleme" },
    { step: "4. Context Building", name: "Akıllı Bağlam Birleştirici", latency: "2ms", icon: "🧠", desc: "Token sınırına uygun şekilde bağlam metni oluşturma" },
    { step: "5. Generation", name: "AI Orchestrated LLM Yanıtı", latency: "140ms", icon: "🤖", desc: "Seçilen LLM üzerinden doğrulanmış bağlamla yanıt üretme" },
    { step: "6. Citation Ready", name: "Dipnot & Kaynak Eşleştirme", latency: "1ms", icon: "📌", desc: "Yanıttaki iddialara otomatik kaynak referansı ekleme" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚙️ Tam Bütünleşik 6 Adımlı RAG Boru Hattı (Pipeline)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-mono font-bold text-indigo-600 text-[10px] bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                  {s.latency}
                </span>
              </div>
              <span className="text-[10px] text-purple-600 font-bold uppercase block mt-1">{s.step}</span>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{s.name}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">{s.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Active Stage</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
