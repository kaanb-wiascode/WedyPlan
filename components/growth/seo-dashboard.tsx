"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, Globe, CheckCircle2, FileCode, ExternalLink, RefreshCw, BarChart2, ShieldCheck, Layers } from "lucide-react";
import { SeoEngine, SeoPageHealth } from "@/lib/growth/seo-engine";

export const SeoDashboard: React.FC = () => {
  const [pagesHealth, setPagesHealth] = useState<SeoPageHealth[]>([]);
  const [selectedPage, setSelectedPage] = useState<SeoPageHealth | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const [aiGeneratedSeo, setAiGeneratedSeo] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    SeoEngine.getSeoPagesHealth().then((data) => {
      setPagesHealth(data);
      if (data.length > 0) setSelectedPage(data[0]);
    });
  }, []);

  const handleGenerateSeo = () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const res = SeoEngine.generateAiSeoContent(topicInput);
      setAiGeneratedSeo(res);
      setIsGenerating(false);
    }, 800);
  };

  if (!selectedPage) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal SEO & SERP Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Globe className="w-3 h-3" /> Schema.org Ready
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Otomatik Schema.org JSON-LD yapılandırılmış verileri, OpenGraph entegrasyonu ve WedyAI SEO yazar motoru.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Taranan Sayfa</span>
            <span className="font-mono font-bold text-white text-lg">1.420</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Google Endeks Oranı</span>
            <span className="font-mono font-bold text-emerald-400 text-lg">%98.4</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. SERP Konumu</span>
            <span className="font-mono font-bold text-[#D4AF37] text-lg">#2.4</span>
          </div>
        </div>
      </div>

      {/* WedyAI SEO Content & Keyword Generator */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI SEO Yazar & İnceleme
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Arama Motoru Optimizasyonu</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Örn: Bodrum Kır Düğünü Mekanları"
            className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />
          <button
            onClick={handleGenerateSeo}
            disabled={!topicInput.trim() || isGenerating}
            className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>SEO Üret</span>
              </>
            )}
          </button>
        </div>

        {aiGeneratedSeo && (
          <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5">
            <div>
              <span className="text-[10px] font-bold text-[#86868B] block">Önerilen SERP Başlığı</span>
              <p className="font-bold text-[#111111] dark:text-[#F5F4F0] text-sm">{aiGeneratedSeo.title}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#86868B] block">Meta Açıklaması</span>
              <p className="text-[#555555] dark:text-[#A1A1A6] text-[11px]">{aiGeneratedSeo.metaDescription}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#86868B] block">Hiyerarşik Başlık Yapısı (H1-H3)</span>
              <ul className="space-y-1 pt-1 font-mono text-[10px] text-[#D4AF37]">
                {aiGeneratedSeo.headingStructure.map((h: string, idx: number) => (
                  <li key={idx}>• {h}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Pages SEO Health Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Sayfa SEO Sağlığı & Endeks Takibi</span>
        </h4>

        <div className="space-y-3">
          {pagesHealth.map((page) => (
            <div
              key={page.url}
              onClick={() => setSelectedPage(page)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedPage?.url === page.url
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="font-mono text-xs truncate max-w-[240px]">{page.url}</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  Sağlık: %{page.healthScore}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] opacity-80">
                <span className="flex items-center gap-1">
                  <FileCode className="w-3 h-3 text-[#D4AF37]" /> Schema JSON-LD
                </span>
                <span>•</span>
                <span>Endeks: {page.indexingStatus}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {page.targetKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[9px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-md text-[#D4AF37]"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};