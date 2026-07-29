"use client";

import React, { useState, useEffect } from "react";
import { Database, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Search, Brain, Lock, Tag, Clock, PlusCircle } from "lucide-react";
import { AiMemoryEngine, VectorMemoryRecord, MemoryPlatformSummary, MemoryType } from "@/lib/ai-native/ai-memory-engine";

export const MemoryCenter: React.FC = () => {
  const [records, setRecords] = useState<VectorMemoryRecord[]>([]);
  const [summary, setSummary] = useState<MemoryPlatformSummary | null>(null);
  const [selectedType, setSelectedType] = useState<MemoryType | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [ownerInput, setOwnerInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [typeInput, setTypeInput] = useState<MemoryType>("WEDDING_MEMORY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiMemoryEngine.getMemoryRecords().then(setRecords);
    AiMemoryEngine.getSummary().then(setSummary);
  }, []);

  const handleAddMemory = async () => {
    if (!ownerInput.trim() || !contentInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await AiMemoryEngine.addMemoryRecord(
        typeInput,
        ownerInput,
        tagInput || "General Context",
        contentInput
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.conceptTag}' vektör hafıza kaydı eklendi!` });
      setOwnerInput("");
      setTagInput("");
      setContentInput("");
      AiMemoryEngine.getMemoryRecords().then(setRecords);
      AiMemoryEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  const filteredRecords = records.filter((r) => {
    const matchesType = selectedType === "ALL" || r.memoryType === selectedType;
    const matchesSearch = !searchQuery.trim() ||
      r.conceptTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.memoryContentText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ownerRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Memory Platform Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Vektörel Hafıza & Bağlam Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Retrieval: {summary.averageSemanticRetrievalTimeMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Yapay zeka etkileşimleri için kalıcı vektörel hafıza (User, Organization, Vendor, Wedding, Conversation, Task), semantik RAG araması ve erişim sınırları.
        </p>

        {/* Executive Memory Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Vektör Varlıkları</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalVectorEmbeddingsCount / 1000).toFixed(1)}K Vector
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Hafıza Tipleri</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeMemoryTypesCount} Tip
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">RAG Doğruluğu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiContextRankingAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Semantic RAG & Context Ranking Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Semantik RAG Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            1536-Dim Embeddings
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMemoryPlatformInsightNote}
          </p>
        </div>
      </div>

      {/* Semantic Search & Type Filter Controls */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Vektörel hafızada semantik arama yap (Örn: Boğaz, Vejetaryen)..."
            className="w-full h-11 pl-10 pr-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(["ALL", "WEDDING_MEMORY", "USER_MEMORY", "VENDOR_MEMORY", "TASK_MEMORY"] as (MemoryType | "ALL")[]).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border whitespace-nowrap transition-all ${
                selectedType === t
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
              }`}
            >
              {t === "ALL" ? "Tüm Hafıza" : t.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Memory Record Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Vektörel Bağlam Ekle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value as MemoryType)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="WEDDING_MEMORY">Wedding Memory</option>
              <option value="USER_MEMORY">User Memory</option>
              <option value="VENDOR_MEMORY">Vendor Memory</option>
              <option value="TASK_MEMORY">Task Memory</option>
            </select>

            <input
              type="text"
              value={ownerInput}
              onChange={(e) => setOwnerInput(e.target.value)}
              placeholder="Sahip Ref (Örn: Wedding #2027)..."
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Konsept Etiketi (Örn: Boğaz Manzarası)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            rows={3}
            placeholder="Vektörleştirilecek doğal dil bağlam metni..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleAddMemory}
            disabled={isProcessing || !ownerInput.trim() || !contentInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Brain className="w-4 h-4 text-[#D4AF37]" />
                <span>Vektörleştir & Hafızaya Kaydet</span>
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

      {/* Memory Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#D4AF37]" />
          <span>Vektörel Hafıza Kayıtları ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredRecords.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{r.conceptTag}</span>
                </span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {r.memoryType}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {r.memoryContentText}
              </p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B] pt-1">
                <span>Sahip: {r.ownerRef}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Skor: {r.relevanceRankScore} (1536-dim)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};