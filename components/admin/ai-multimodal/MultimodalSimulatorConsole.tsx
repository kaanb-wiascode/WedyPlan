"use client";

import React, { useState } from "react";
import { processMultimodalPayloadAction, executeVisualSearchAction } from "@/lib/actions/ai-multimodal-platform";

export default function MultimodalSimulatorConsole() {
  const [inputType, setInputType] = useState<any>("IMAGE_MOODBOARD");
  const [payloadUrl, setPayloadUrl] = useState("https://assets.wedyplan.com/samples/bodrum_rustic_decor.jpg");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleProcessPayload = async () => {
    const res = await processMultimodalPayloadAction({
      inputType,
      payloadUrl,
      enableOCR: true,
      enableStyleRecognition: true,
      enableContractExtraction: inputType === "CONTRACT_PDF",
    });

    if (res.success) {
      setAnalysisResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleExecuteVisualSearch = async () => {
    const res = await executeVisualSearchAction({
      imageVectorId: "vec_img_bodrum_rustic_01",
      topK: 5,
    });

    if (res.success) {
      setSearchResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Multimodal Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Multimodal Payload Processing & Vision Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300">
            Vision Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Girdi Türü (Payload Type)</label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="IMAGE_MOODBOARD">Görsel Moodboard / İlham Fotoğrafı</option>
                <option value="CONTRACT_PDF">Sözleşme PDF Dokümanı</option>
                <option value="VENDOR_PORTFOLIO">Tedarikçi Portfolyo Albümü</option>
                <option value="AUDIO_RECORDING">Ses Kaydı</option>
                <option value="VIDEO_CLIP">Düğün Tanıtım Videosu</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Medya / Doküman URL</label>
              <input
                type="text"
                value={payloadUrl}
                onChange={(e) => setPayloadUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-fuchsia-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleProcessPayload}
              className="py-2.5 rounded-xl bg-fuchsia-600 text-white font-bold hover:bg-fuchsia-700 transition"
            >
              🖼️ Medyayı İşle, OCR & Stil Analizi Yap
            </button>

            <button
              onClick={handleExecuteVisualSearch}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              🔍 Görsel İle Pazaryeri Arama (Visual Search)
            </button>
          </div>

          {analysisResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-fuchsia-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Multimodal Session ID: {analysisResult.sessionId}</span>
                <span className="text-emerald-400 font-bold">Görsel Uyum: %{analysisResult.visualMatchScorePct}</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                {analysisResult.aiSummary}
              </div>

              {analysisResult.colorPaletteHex && analysisResult.colorPaletteHex.length > 0 && (
                <div className="space-y-1">
                  <span className="text-white font-bold block text-[10px]">🎨 Çıkarılan Renk Paleti Hex Kodları:</span>
                  <div className="flex gap-2">
                    {analysisResult.colorPaletteHex.map((hex: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: hex }} />
                        <span className="text-[10px] text-slate-300 font-mono">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.extractedTextOrClauses && (
                <div className="space-y-1 pt-1">
                  <span className="text-white font-bold block text-[10px]">📄 OCR İle Ayrıştırılan Sözleşme Klozları:</span>
                  {analysisResult.extractedTextOrClauses.map((clause: string, idx: number) => (
                    <div key={idx} className="text-[10px] text-amber-300 border-b border-slate-900 pb-1">• {clause}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {searchResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono space-y-1">
              <span className="font-bold block text-white">🏆 Görsel Stil Araması İle Eşleşen Pazaryeri Öğeleri:</span>
              {searchResult.matchedItems.map((item: any) => (
                <div key={item.id} className="flex justify-between text-[10px]">
                  <span>{item.title}</span>
                  <span className="text-emerald-400 font-bold">%{item.similarityPct} Benzerlik</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
