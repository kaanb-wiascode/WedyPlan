"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateAIContentAndSEOAction, translateCMSContentAction } from "@/lib/actions/admin-cms";

export default function AICMSAssistantWidget({
  onApplyGeneratedContent,
}: {
  onApplyGeneratedContent: (contentData: any) => void;
}) {
  const [topic, setPromptTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    const res = await generateAIContentAndSEOAction({
      promptTopic: topic,
      contentType: "BLOG_POST",
      targetLanguage: "TR",
    });

    setIsGenerating(false);

    if (res.success) {
      onApplyGeneratedContent(res);
      setPromptTopic("");
      alert("✨ AI SEO Uyumlu Makale ve Meta Etiketleri Üretildi!");
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Copywriter, SEO & Translation Studio
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Otomatik Mimar
        </span>
      </div>

      <div className="space-y-2">
        <label className="font-semibold block text-slate-700 dark:text-slate-200">
          Hangi Konuda SEO Uyumlu Makale veya İniş Sayfası Üretilsin?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setPromptTopic(e.target.value)}
          placeholder="Örn: 2026 Bodrum Sahil Düğünü Fiyatları & Trendleri"
          className="w-full p-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-white/80 dark:bg-slate-800/80 text-xs"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:shadow-md transition disabled:opacity-50"
        >
          {isGenerating ? "AI İçerik & SEO Analizi Yapıyor..." : "✨ AI İçerik & SEO Başlığı Üret"}
        </button>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        🌐 <strong>AI Çok Dilli Çeviri:</strong> Üretilen içerikler tek tıkla İngilizce (EN), Almanca (DE) ve Fransızca (FR) dillerine yerelleştirilir.
      </div>
    </motion.div>
  );
}
