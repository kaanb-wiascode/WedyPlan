"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateAIWorkflowAction } from "@/lib/actions/vendor-automation";

export default function AIAutomationIntelligenceWidget({
  onApplyAIWorkflow,
}: {
  onApplyAIWorkflow: (workflowData: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const res = await generateAIWorkflowAction(prompt);
    setIsGenerating(false);

    if (res.success) {
      onApplyAIWorkflow(res);
      setPrompt("");
      alert("✨ AI Otomasyon Akışı başarıyla kurgulandı!");
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Workflow Generator & Process Optimizer
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Otonom Mimar
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <label className="font-semibold block text-slate-700 dark:text-slate-200">
          Yapay Zekaya Ne Otomatikleştirmek İstediğinizi Söyleyin:
        </label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Örn: Yeni bir müşteri talebi geldiğinde çifte WhatsApp yanıtı at, 2 saat sonra hatırlatma e-postası gönder ve satış temsilcime görev at..."
          className="w-full p-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-white/80 dark:bg-slate-800/80 text-[11px] leading-relaxed resize-none"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:shadow-md transition disabled:opacity-50"
        >
          {isGenerating ? "AI Akış Kurguluyor..." : "✨ Doğal Dilden Otomasyon Üret"}
        </button>
      </div>

      {/* Otomasyon Tavsiye Kartı */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-xs space-y-1">
        <span className="text-[10px] text-emerald-600 font-bold uppercase block">💡 AI Süreç İyileştirme Önerisi</span>
        <p className="text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
          "Yeni Yorum Geldi" tetikleyicisine otomatik yanıt kurgulamak, ortalama yanıt sürenizi 12 dakikadan 0 saniyeye indirir ve Google SEO görünürlüğünüzü artırır.
        </p>
      </div>
    </motion.div>
  );
}
