"use client";

import React, { useState, useEffect } from "react";
import { FileSearch, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, FileText, Upload, AlertTriangle, ShieldAlert, Layers, Check, Search, FileCheck } from "lucide-react";
import { AiDocumentIntelligenceEngine, DocumentIntelligenceRecord, DocumentIntelligenceSummary, BusinessDocumentType } from "@/lib/ai-native/ai-document-intelligence-engine";

export const DocumentIntelligenceCenter: React.FC = () => {
  const [records, setRecords] = useState<DocumentIntelligenceRecord[]>([]);
  const [summary, setSummary] = useState<DocumentIntelligenceSummary | null>(null);
  const [selectedType, setSelectedType] = useState<BusinessDocumentType | "ALL">("ALL");

  // Form State
  const [docTitleInput, setDocTitleInput] = useState("");
  const [docTextInput, setDocTextInput] = useState("");
  const [docTypeInput, setDocTypeInput] = useState<BusinessDocumentType>("CONTRACTS");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiDocumentIntelligenceEngine.getDocumentRecords().then(setRecords);
    AiDocumentIntelligenceEngine.getSummary().then(setSummary);
  }, []);

  const handleUploadDocument = async () => {
    if (!docTitleInput.trim() || !docTextInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await AiDocumentIntelligenceEngine.processDocument(
        docTypeInput,
        docTitleInput,
        docTextInput
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.title}' dokümanı tarandı, OCR ve risk analizi tamamlandı!` });
      setDocTitleInput("");
      setDocTextInput("");
      AiDocumentIntelligenceEngine.getDocumentRecords().then(setRecords);
      AiDocumentIntelligenceEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  const filteredRecords = selectedType === "ALL"
    ? records
    : records.filter((r) => r.documentType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Document Intelligence Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Doküman Zekası Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> OCR Accuracy: %{summary.averageOcrAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sözleşmeler, faturalar, teklifler, kimlik belgeleri ve makbuzların otonom OCR taranması, veri çıkarımı, risk maddesi tespiti ve mükerrer engelleme.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Taranan Doküman</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalProcessedDocumentsCount / 1000).toFixed(1)}K Doc
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Riskli Madde Tespiti</span>
            <span className="font-mono font-bold text-amber-400 text-base">
              {summary.flaggedRiskClausesCount} Clause
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Mükerrer Engelleme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.duplicateDocumentsBlockedCount} Block
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Document Risk & Clause Analysis Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Sözleşme & OCR Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Clause Detection Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDocumentInsightNote}
          </p>
        </div>
      </div>

      {/* Document Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "CONTRACTS", "INVOICES", "IDENTITY_DOCUMENTS", "OFFERS", "POLICIES"] as (BusinessDocumentType | "ALL")[]).map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === t
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {t === "ALL" ? "Tüm Dokümanlar" : t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Upload & Analyze Document Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Doküman Yükle & OCR Taraması Yap</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={docTypeInput}
              onChange={(e) => setDocTypeInput(e.target.value as BusinessDocumentType)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="CONTRACTS">Contracts (Sözleşmeler)</option>
              <option value="INVOICES">Invoices (E-Faturalar)</option>
              <option value="IDENTITY_DOCUMENTS">Identity Documents (Kimlik)</option>
              <option value="OFFERS">Offers (Teklifler)</option>
            </select>

            <input
              type="text"
              value={docTitleInput}
              onChange={(e) => setDocTitleInput(e.target.value)}
              placeholder="Doküman Başlığı (Örn: SLA Sözleşmesi)..."
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <textarea
            value={docTextInput}
            onChange={(e) => setDocTextInput(e.target.value)}
            rows={3}
            placeholder="Taranacak doküman metni veya sözleşme maddeleri..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleUploadDocument}
            disabled={isProcessing || !docTitleInput.trim() || !docTextInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Dokümanı Tara, OCR Yap & Analiz Et</span>
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

      {/* Document Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>Analiz Edilen Dokümanlar ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredRecords.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{doc.title}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {doc.documentType} ({doc.versionTag})
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {doc.aiExecutiveSummary}
              </p>

              {/* Extracted Key-Value Fields */}
              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] font-mono space-y-1">
                <span className="text-[9px] font-bold text-[#86868B] uppercase tracking-wider block">Çıkarılan OCR Veri Alanları</span>
                <div className="grid grid-cols-2 gap-1 text-[#111111] dark:text-[#F5F4F0]">
                  {Object.entries(doc.extractedFields).map(([k, v]) => (
                    <div key={k}>{k}: <strong className="text-[#D4AF37]">{String(v)}</strong></div>
                  ))}
                </div>
              </div>

              {/* Detected Clause Risks */}
              {doc.detectedClauses.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-bold text-[#86868B] uppercase tracking-wider block">Tespit Edilen Sözleşme Maddeleri</span>
                  {doc.detectedClauses.map((cls, idx) => (
                    <div key={idx} className="p-2 bg-amber-500/10 rounded-lg text-[10px] border border-amber-500/20 space-y-0.5">
                      <div className="flex justify-between font-bold text-amber-600 dark:text-amber-400">
                        <span>[{cls.clauseTag}]</span>
                        <span>{cls.riskAssessment}</span>
                      </div>
                      <p className="text-[#666666] dark:text-[#A1A1A6]">"{cls.originalText}"</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono">
                <span>OCR Kalitesi: <strong className="text-emerald-500">%{doc.ocrQualityPercent}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Güvenlik Skoru: %{doc.overallRiskScorePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};