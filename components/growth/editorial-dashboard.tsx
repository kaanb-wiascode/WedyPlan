"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, CheckCircle2, FileText, Send, Clock, Layers, Globe, Eye, PenTool, RefreshCw } from "lucide-react";
import { CmsEngine, CmsArticle, ContentStatus, ContentType } from "@/lib/growth/cms-engine";

export const EditorialDashboard: React.FC = () => {
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<CmsArticle | null>(null);
  const [promptInput, setTopicInput] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("BLOG_POST");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    CmsEngine.getArticles().then((data) => {
      setArticles(data);
      if (data.length > 0) setSelectedArticle(data[0]);
    });
  }, []);

  const handleStatusChange = async (status: ContentStatus) => {
    if (!selectedArticle) return;
    const ok = await CmsEngine.updateArticleStatus(selectedArticle.id, status);
    if (ok) {
      setStatusMsg(`İçerik durumu '${status}' olarak güncellendi.`);
      CmsEngine.getArticles().then((data) => {
        setArticles(data);
        const updated = data.find((a) => a.id === selectedArticle.id);
        if (updated) setSelectedArticle(updated);
      });
      setTimeout(() => setStatusMsg(null), 2500);
    }
  };

  const handleGenerateAiArticle = () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generated = CmsEngine.generateAiArticle(promptInput, selectedContentType);
      const newArticle: CmsArticle = {
        id: `art_${Math.random().toString(36).substring(2, 9)}`,
        slug: promptInput.toLowerCase().replace(/\s+/g, "-"),
        title: generated.title,
        contentType: selectedContentType,
        status: "DRAFT",
        excerpt: generated.excerpt,
        bodyMarkdown: generated.bodyMarkdown,
        authorName: "WedyAI Editorial Copilot",
        locale: "tr-TR",
        seoScore: generated.readabilityScore,
        version: 1,
      };

      setArticles((prev) => [newArticle, ...prev]);
      setSelectedArticle(newArticle);
      setIsGenerating(false);
      setTopicInput("");
      setStatusMsg("Yeni WedyAI taslağı başarıyla oluşturuldu!");
      setTimeout(() => setStatusMsg(null), 3000);
    }, 1000);
  };

  if (!selectedArticle) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal İçerik & CMS Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Globe className="w-3 h-3" /> Multi-Locale CMS
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Bloglar, Gerçek Düğün Hikayeleri, Dergi Derlemeleri ve WedyAI destekli otomasyonel yayın akışı.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam İçerik</span>
            <span className="font-mono font-bold text-white text-lg">{articles.length} Makale</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yayınlananlar</span>
            <span className="font-mono font-bold text-emerald-400 text-lg">
              {articles.filter((a) => a.status === "PUBLISHED").length}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. SEO Skoru</span>
            <span className="font-mono font-bold text-[#D4AF37] text-lg">94 / 100</span>
          </div>
        </div>
      </div>

      {/* WedyAI Article & Story Writer Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İçerik Yazar
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Headless CMS Copilot</span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            {(["BLOG_POST", "WEDDING_STORY", "MAGAZINE_FEATURE", "FAQ_ARTICLE"] as ContentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedContentType(type)}
                className={`flex-1 py-2 px-1 text-[10px] font-bold rounded-xl border transition-all ${
                  selectedContentType === type
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {type === "BLOG_POST" ? "Blog" : type === "WEDDING_STORY" ? "Hikaye" : type === "MAGAZINE_FEATURE" ? "Dergi" : "S.S.S"}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Örn: Bodrum Yalı Düğünü Organizasyonu"
              className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleGenerateAiArticle}
              disabled={!promptInput.trim() || isGenerating}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Taslak Üret</span>
                </>
              )}
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>

      {/* Selected Article Inspection & Workflow Controls */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] font-mono">
            Sürüm v{selectedArticle.version} • {selectedArticle.contentType}
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            {selectedArticle.status}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-serif-editorial text-xl font-semibold text-[#111111] dark:text-[#F5F4F0]">
            {selectedArticle.title}
          </h4>
          <p className="text-xs text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
            {selectedArticle.excerpt}
          </p>
        </div>

        <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs">
          <span className="text-[10px] font-bold text-[#86868B] block">İçerik Önizlemesi (Markdown)</span>
          <p className="font-mono text-[11px] text-[#424245] dark:text-[#D1D1D6] whitespace-pre-line leading-relaxed">
            {selectedArticle.bodyMarkdown}
          </p>
        </div>

        {/* Workflow Transition Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => handleStatusChange("IN_REVIEW")}
            className="flex-1 py-2.5 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-[#111111] dark:text-[#F5F4F0] text-xs font-semibold rounded-xl hover:bg-black/5"
          >
            İncelemeye Al
          </button>
          <button
            onClick={() => handleStatusChange("APPROVED")}
            className="flex-1 py-2.5 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 text-[#111111] dark:text-[#F5F4F0] text-xs font-semibold rounded-xl hover:bg-black/5"
          >
            Onayla
          </button>
          <button
            onClick={() => handleStatusChange("PUBLISHED")}
            className="flex-1 py-2.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-xl shadow-md hover:opacity-90 flex items-center justify-center gap-1"
          >
            <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Yayınla</span>
          </button>
        </div>
      </div>

      {/* Articles List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Tüm Makaleler & Taslaklar ({articles.length})
        </h4>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-1 ${
                selectedArticle.id === art.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-[10px] font-mono text-[#D4AF37]">{art.contentType}</span>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full">{art.status}</span>
              </div>
              <p className="font-semibold text-xs truncate">{art.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};