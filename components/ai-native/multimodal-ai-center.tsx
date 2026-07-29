"use client";

import React, { useState, useEffect } from "react";
import { Layers, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Image as ImageIcon, FileText, Video, Mic, Upload, Eye, FileSpreadsheet } from "lucide-react";
import { AiMultimodalEngine, MultimodalAnalysisRecord, MultimodalPlatformSummary, ContentModality } from "@/lib/ai-native/ai-multimodal-engine";

export const MultimodalAiCenter: React.FC = () => {
  const [records, setRecords] = useState<MultimodalAnalysisRecord[]>([]);
  const [summary, setSummary] = useState<MultimodalPlatformSummary | null>(null);
  const [selectedModality, setSelectedModality] = useState<ContentModality | "ALL">("ALL");

  // Form State
  const [fileNameInput, setFileNameInput] = useState("");
  const [summaryInput, setSummaryInput] = useState("");
  const [modalityInput, setModalityInput] = useState<ContentModality>("PDF");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiMultimodalEngine.getAnalysisRecords().then(setRecords);
    AiMultimodalEngine.getSummary().then(setSummary);
  }, []);

  const handleProcessFile = async () => {
    if (!fileNameInput.trim() || !summaryInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await AiMultimodalEngine.processMultimodalFile(
        modalityInput,
        fileNameInput,
        summaryInput
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.sourceFileName}' başarıyla multimodal bağlama dönüştürüldü!` });
      setFileNameInput("");
      setSummaryInput("");
      AiMultimodalEngine.getAnalysisRecords().then(setRecords);
      AiMultimodalEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  const filteredRecords = selectedModality === "ALL"
    ? records
    : records.filter((r) => r.primaryModality === selectedModality);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Multimodal Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çoklu-Modal (Multimodal) AI Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Fusion Latency: {summary.crossModalFusionLatencyMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Metin, ses, görsel, PDF dokümanları, video ve yapılandırılmış verilerin yapay zeka tarafından ortak bağlamda işlenmesi ve analizi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İşlenen Medya</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalProcessedFilesCount / 1000).toFixed(1)}K Dosya
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Modalite</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedModalitiesCount} Tip
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. OCR Doğruluğu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageOcrAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Cross-Modal Reasoning Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Çapraz-Modal Füzyon Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Cross-Modal Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMultimodalInsightNote}
          </p>
        </div>
      </div>

      {/* Modality Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "PDF", "IMAGES", "VIDEO", "VOICE", "DOCUMENTS", "STRUCTURED_DATA"] as (ContentModality | "ALL")[]).map((mod) => (
          <button
            key={mod}
            onClick={() => setSelectedModality(mod)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedModality === mod
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {mod === "ALL" ? "Tüm Modaliteler" : mod}
          </button>
        ))}
      </div>

      {/* Upload & Process Multimodal Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#D4AF37]" />
          <span>Multimodal Dosya Yükle & Çözümle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={modalityInput}
              onChange={(e) => setModalityInput(e.target.value as ContentModality)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="PDF">PDF Document</option>
              <option value="IMAGES">Image / Moodboard</option>
              <option value="VIDEO">Video Walkthrough</option>
              <option value="VOICE">Voice Recording</option>
              <option value="STRUCTURED_DATA">Structured JSON/CSV</option>
            </select>

            <input
              type="text"
              value={fileNameInput}
              onChange={(e) => setFileNameInput(e.target.value)}
              placeholder="Dosya Adı (Örn: Sozlesme.pdf)..."
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <textarea
            value={summaryInput}
            onChange={(e) => setSummaryInput(e.target.value)}
            rows={3}
            placeholder="Dosya içeriği veya yapay zeka tarafından çıkarılacak bağlam simülasyonu..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleProcessFile}
            disabled={isProcessing || !fileNameInput.trim() || !summaryInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>Medya Bağlamını Vektörleştir & İşle</span>
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

      {/* Processed Media Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>İşlenmiş Multimodal Kayıtlar ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredRecords.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.sourceFileName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {r.primaryModality}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {r.extractedTextSummary}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>OCR Doğruluğu: <span className="font-bold text-emerald-500">%{r.ocrConfidencePercent}</span></div>
                <div>Çıkarılan Varlık: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{r.extractedEntitiesCount} Varlık</span></div>
              </div>

              <p className="text-[10px] text-[#86868B] pt-1">
                ✦ WedyAI Füzyon Notu: {r.aiProcessingTip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};