"use client";

import React from "react";

export default function AIRoutingRulesTable() {
  const rules = [
    { task: "WEDDING_PLANNING", primary: "OpenAI (gpt-4o)", fallback: "Anthropic (claude-3-5-sonnet)", reason: "Yüksek Akıl Yürütme & Kreatif Düğün Konsepti" },
    { task: "CONTRACT_ANALYSIS", primary: "Anthropic (claude-3-5-sonnet)", fallback: "OpenAI (gpt-4o)", reason: "Uzun Bağlam (200k Context Window) & Hukuk Metni" },
    { task: "VISION_INSPECTION", primary: "Google Gemini (gemini-1.5-pro)", fallback: "OpenAI (gpt-4o-vision)", reason: "Çoklu Görsel Analizi & Portföy Kalite Kontrolü" },
    { task: "FAST_SUMMARY", primary: "Self-Hosted Llama 3", fallback: "OpenAI (gpt-4o-mini)", reason: "Milisaniyelik Yanıt & Sıfır API Maliyeti" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🔀 Görev Bazlı Akıllı Yönlendirme Kuralları (Smart Routing Rules)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Görev Türü (Task Type)</th>
            <th className="py-3 px-2">Birincil Sağlayıcı</th>
            <th className="py-3 px-2">Yedek (Fallback)</th>
            <th className="py-3 px-2 text-right">Seçim Mantığı</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {rules.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">{r.task}</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{r.primary}</td>
              <td className="py-3 px-2 text-slate-500 font-mono">{r.fallback}</td>
              <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-300 font-medium">{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
