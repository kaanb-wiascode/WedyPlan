"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateAIWorkflowFromPromptAction } from "@/lib/actions/admin-workflows";

export default function AIWorkflowGeneratorWidget({
  onApplyAIWorkflow,
}: {
  onApplyAIWorkflow: (workflowData: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const res = await generateAIWorkflowFromPromptAction({
      userPrompt: prompt,
    });

    setIsGenerating(false);

    if (res.success && res.generatedWorkflow) {
      onApplyAIWorkflow(res.generatedWorkflow);
      setPrompt("");
      alert("✨ " + res.message);
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Prompt-to-Workflow Engine
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Otomatik Akış Mimarisi
        </span>
      </div>

      <div className="space-y-2">
        <label className="font-semibold block text-slate-700 dark:text-slate-200">
          Ne Tür Bir Otomasyon Akışı Oluşturmak İstiyorsunuz?
        </label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Örn: Bir çift yeni kaydolduğunda 10 dakika bekle, WhatsApp'tan AI asistanını tanıtan hoş geldin mesajı fırlat ve bütçe sihirbazına yönlendir..."
          className="w-full p-3 rounded-2xl border border-purple-100 dark:border-purple-900/40 bg-white/80 dark:bg-slate-800/80 text-xs resize-none leading-relaxed"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:shadow-md transition disabled:opacity-50"
        >
          {isGenerating ? "AI Akış Ağacını Çiziyor..." : "✨ AI Akış Düğüm Ağacını Oluştur"}
        </button>
      </div>

      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 text-indigo-900 dark:text-indigo-200 font-semibold">
        💡 <strong>AI Otomasyon İpucu:</strong> Üretilen akışlar görsel canvas üzerinde adımları sürüklenerek veya tıklanarak özelleştirilebilir.
      </div>
    </motion.div>
  );
}
