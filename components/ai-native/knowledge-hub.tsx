"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Search, FileText, Lock, Bookmark, PlusCircle, ShieldAlert } from "lucide-react";
import { AiKnowledgeEngine, KnowledgeDocumentChunk, KnowledgePlatformSummary, KnowledgeSourceCategory } from "@/lib/ai-native/ai-knowledge-engine";

export const KnowledgeHub: React.FC = () => {
  const [chunks, setChunks] = useState<KnowledgeDocumentChunk[]>([]);
  const [summary, setSummary] = useState<KnowledgePlatformSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeSourceCategory | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [titleInput, setTitleInput] = useState("");
  const [citationInput, setCitationInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<KnowledgeSourceCategory>("POLICIES");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiKnowledgeEngine.getKnowledgeChunks().then(setChunks);
    AiKnowledgeEngine.getSummary().then(setSummary);
  }, []);

  const handleIndexDocument = async () => {
    if (!titleInput.trim() || !contentInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await AiKnowledgeEngine.indexNewDocument(
        categoryInput,
        titleInput,
        contentInput,
        citationInput || "REF-CUSTOM-2026"
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.documentTitle}' başarıyla indekslendi ve alıntı kütüphanesine eklendi!` });
      setTitleInput("");
      setCitationInput("");
      setContentInput("");
      AiKnowledgeEngine.getKnowledgeChunks().then(setChunks);
      AiKnowledgeEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  const filteredChunks = chunks.filter((c) => {
    const matchesCategory = selectedCategory === "ALL" || c.sourceCategory === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      c.documentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.chunkContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citationReferenceKey.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Knowledge Hub Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Merkezi AI Bilgi & Alıntı Hub'ı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Citation Grounding: %{summary.aiGroundingCitationAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm otonom AI ajanları için merkezi doğru bilgi kaynağı (SSOT), doküman sürümleme, alıntı desteği (Citation) ve halüsinasyon koruması.
        </p>

        {/* Executive Knowledge Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İndekslenmiş Parça</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalIndexedKnowledgeChunksCount / 1000).toFixed(1)}K Chunk
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Bilgi Kaynakları</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeKnowledgeSourcesCount} Kaynak
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Halüsinasyon Engeli</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiHallucinationReductionRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Hallucination Shield & Citation Grounding Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Halüsinasyon Önleme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Grounding Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiKnowledgeInsightNote}
          </p>
        </div>
      </div>

      {/* Search & Source Filter Controls */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bilgi kütüphanesinde ve alıntılarda arama yap..."
            className="w-full h-11 pl-10 pr-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(["ALL", "POLICIES", "CONTRACTS", "MARKETPLACE_DATA", "FAQS", "FINANCE"] as (KnowledgeSourceCategory | "ALL")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
              }`}
            >
              {cat === "ALL" ? "Tüm Kaynaklar" : cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Index New Knowledge Document Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Doküman / Alıntı İndeksle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value as KnowledgeSourceCategory)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="POLICIES">Policies (Politikalar)</option>
              <option value="CONTRACTS">Contracts (Sözleşmeler)</option>
              <option value="MARKETPLACE_DATA">Marketplace Data</option>
              <option value="FAQS">FAQs & Support</option>
            </select>

            <input
              type="text"
              value={citationInput}
              onChange={(e) => setCitationInput(e.target.value)}
              placeholder="Alıntı Ref (Örn: REF-POL-2026)..."
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Doküman Başlığı..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            rows={3}
            placeholder="Ajanların alıntı yapacağı doğrudan doğru bilgi metni..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleIndexDocument}
            disabled={isProcessing || !titleInput.trim() || !contentInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                <span>Dokümanı RAG Kütüphanesine İndeksle</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Indexed Chunks Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>İndekslenmiş Bilgi Dokümanları ({filteredChunks.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredChunks.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{c.documentTitle}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {c.sourceCategory} ({c.versionTag})
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {c.chunkContent}
              </p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B] pt-1">
                <span>Alıntı Ref: <strong className="text-[#111111] dark:text-[#F5F4F0]">{c.citationReferenceKey}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Grounding: %{c.aiHallucinationShieldScorePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};