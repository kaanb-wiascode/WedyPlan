"use client";

import React, { useState, useEffect } from "react";
import { Languages, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Code2 } from "lucide-react";
import { LocalizationEngine, SupportedLanguageMeta, TranslationKeyRecord, LocalizationSummary } from "@/lib/global/localization-engine";

export const LocalizationCenter: React.FC = () => {
  const [languages, setLanguages] = useState<SupportedLanguageMeta[]>([]);
  const [keys, setKeys] = useState<TranslationKeyRecord[]>([]);
  const [summary, setSummary] = useState<LocalizationSummary | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [selectedKey, setSelectedKey] = useState<TranslationKeyRecord | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    LocalizationEngine.getLanguages().then(setLanguages);
    LocalizationEngine.getTranslationKeys().then((data) => {
      setKeys(data);
      if (data.length > 0) {
        setSelectedKey(data[0]);
        setEditingText(data[0].enText);
      }
    });
    LocalizationEngine.getLocalizationSummary().then(setSummary);
  }, []);

  const handleSaveTranslation = async () => {
    if (!selectedKey || !editingText.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await LocalizationEngine.updateTranslationKey(
        selectedKey.id,
        selectedLang as "tr" | "en" | "ar" | "de",
        editingText
      );
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${selectedLang.toUpperCase()}' çeviri metni başarıyla güncellendi!` });
        LocalizationEngine.getTranslationKeys().then(setKeys);
      } else {
        setStatusMsg({ type: "error", text: "Çeviri güncellenemedi." });
      }
    }, 500);
  };

  if (!summary || !selectedKey) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Localization Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çoklu Dil & Yerelleştirme Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> RTL & i18n Ready
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sınırsız dil desteği, Arapça RTL hizalaması, dinamik dil değiştirme, çeviri belleği ve WedyAI akıllı kalite skorlaması.
        </p>

        {/* Global Localization Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Çeviri Anahtarı</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalKeysCount} Key
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Diller</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedLanguagesCount} Dil
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Çeviri Belleği Doğruluğu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiTranslationMemoryAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Quality & RTL Support Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Çeviri & Kalite Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Fallback: {summary.fallbackLanguageCode.toUpperCase()}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiLocalizationQualityTip}
          </p>
        </div>
      </div>

      {/* Supported Languages Grid Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Aktif Dil Paketleri ({languages.length})</span>
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {languages.map((l) => (
            <div
              key={l.code}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5 space-y-1"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{l.nativeName} ({l.code.toUpperCase()})</span>
                {l.isRtl && (
                  <span className="text-[9px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                    RTL
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tamamlanma: %{l.completionPercent}</span>
                <span>Eksik: {l.missingKeysCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Translation Key Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#D4AF37]" />
            <span>Çeviri Anahtarı Düzenle</span>
          </h4>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
            v{selectedKey.version}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl font-mono text-[11px] text-[#111111] dark:text-[#F5F4F0] font-bold">
            Namespace: {selectedKey.keyNamespace}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedLang}
              onChange={(e) => {
                const l = e.target.value;
                setSelectedLang(l);
                if (l === "tr") setEditingText(selectedKey.trText);
                if (l === "en") setEditingText(selectedKey.enText);
                if (l === "ar") setEditingText(selectedKey.arText);
                if (l === "de") setEditingText(selectedKey.deText);
              }}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="tr">Türkçe (TR)</option>
              <option value="en">English (EN)</option>
              <option value="ar">العربية (AR) - RTL</option>
              <option value="de">Deutsch (DE)</option>
            </select>

            <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center">
              WedyAI Kalite: %{selectedKey.aiQualityScorePercent}
            </div>
          </div>

          <textarea
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            rows={3}
            dir={selectedLang === "ar" ? "rtl" : "ltr"}
            placeholder="Metni girin..."
            className="w-full p-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleSaveTranslation}
            disabled={isProcessing || !editingText.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Languages className="w-4 h-4 text-[#D4AF37]" />
                <span>Çeviri Metnini Kaydet</span>
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
    </div>
  );
};