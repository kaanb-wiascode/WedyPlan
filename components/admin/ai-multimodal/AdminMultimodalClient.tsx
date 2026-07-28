"use client";

import React, { useState } from "react";
import MultimodalHeader from "./MultimodalHeader";
import AIMultimodalAnalyticsWidget from "./AIMultimodalAnalyticsWidget";
import MultimodalCapabilitiesBento from "./MultimodalCapabilitiesBento";
import MultimodalSimulatorConsole from "./MultimodalSimulatorConsole";

export default function AdminMultimodalClient() {
  const [aiReport] = useState({
    ocrAccuracyPct: 99.1,
    totalProcessedFilesCount: "38.4K",
    avgVisionLatencyMs: 145,
    supportedMediaFormatsCount: 7,
    aiAnalysis: "Multimodal AI Platform, son 30 günde 38,400 görsel ve PDF sözleşmeyi %99.1 OCR doğruluğu ve 145ms ortalama hızla işlemiştir.",
    topRecommendation: "Tedarikçi portfolyo yüklemelerinde otomatik 'Görsel Stil & Renk Paleti' etiketlemesinin aktif edilmesi pazaryeri arama tıklamalarını %35 artıracaktır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MultimodalHeader
        ocrAccuracy={aiReport.ocrAccuracyPct}
        totalProcessed={aiReport.totalProcessedFilesCount}
        avgLatencyMs={aiReport.avgVisionLatencyMs}
        supportedFormats={aiReport.supportedMediaFormatsCount}
        onOpenSimulatorModal={() => alert("🖼️ Multimodal AI Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMultimodalAnalyticsWidget aiReport={aiReport} />
          <MultimodalCapabilitiesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <MultimodalSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
