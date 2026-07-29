"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, MessageSquare, Sliders, Cpu } from "lucide-react";
import { AiLocalizationEngine, RegionalAiPromptProfile, AiLocalizationSummary, ConversationalTone } from "@/lib/global/ai-localization-engine";

export const AiLocalizationCenter: React.FC = () => {
  const [profiles, setProfiles] = useState<RegionalAiPromptProfile[]>([]);
  const [summary, setSummary] = useState<AiLocalizationSummary | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<RegionalAiPromptProfile | null>(null);

  // Form State
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState<ConversationalTone>("WARM_TRADITIONAL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiLocalizationEngine.getPromptProfiles().then((data) => {
      setProfiles(data);
      if (data.length > 0) {
        setSelectedProfile(data[0]);
        setSystemPrompt(data[0].systemPromptAddendum);
        setSelectedTone(data[0].tone);
      }
    });
    AiLocalizationEngine.getSummary().then(setSummary);
  }, []);

  const handleSelectProfile = (p: RegionalAiPromptProfile) => {
    setSelectedProfile(p);
    setSystemPrompt(p.systemPromptAddendum);
    setSelectedTone(p.tone);
  };

  const handleSaveProfile = async () => {
    if (!selectedProfile) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiLocalizationEngine.updatePromptProfile(selectedProfile.id, {
        systemPromptAddendum: systemPrompt,
        tone: selectedTone,
      });
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${selectedProfile.countryName}' AI prompt ve ton parametreleri kaydedildi!` });
        AiLocalizationEngine.getPromptProfiles().then((data) => {
          setProfiles(data);
          const updated = data.find((p) => p.id === selectedProfile.id);
          if (updated) setSelectedProfile(updated);
        });
      } else {
        setStatusMsg({ type: "error", text: "AI ayarları güncellenemedi." });
      }
    }, 500);
  };

  if (!summary || !selectedProfile) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive AI Localization Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel AI Yerelleştirme Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> AI Accuracy: %{summary.overallAiCulturalAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          WedyAI'ın bölgesel iletişim tonu, kültürel gelenekler, yerelleştirilmiş sistem promptları ve yanıt kalite değerlendirmesi.
        </p>

        {/* Executive AI Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">AI Profil Alanları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.configuredAiProfilesCount} Bölge
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen AI Dilleri</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedAiLanguagesCount} Dil
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kültürel Uyum</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.overallAiCulturalAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Cultural Validation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Kültürel Doğrulama
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Score: %{selectedProfile.aiResponseQualityScorePercent}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedProfile.aiCulturalValidationTip}
          </p>
        </div>
      </div>

      {/* Profile Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectProfile(p)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedProfile.id === p.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {p.countryName} ({p.languageCode.toUpperCase()})
          </button>
        ))}
      </div>

      {/* Edit Selected Profile Prompt Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedProfile.countryName} ({selectedProfile.countryCode}) AI Prompt Konfigürasyonu
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Odak Etkinlikler: {selectedProfile.culturalEventFocus}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            {selectedProfile.tone}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">İletişim Tonu Tipi</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as ConversationalTone)}
              className="w-full h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="WARM_TRADITIONAL">Samimi & Geleneksel (WARM_TRADITIONAL)</option>
              <option value="PRECISE_FORMAL">Resmi & Net (PRECISE_FORMAL)</option>
              <option value="LUXURY_RESPECTFUL">VIP & Prestijli (LUXURY_RESPECTFUL)</option>
              <option value="DIRECT_CASUAL">Dinamik & Doğrudan (DIRECT_CASUAL)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Bölgesel Sistem Prompt Ek eklentisi (System Prompt Addendum)</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              dir={selectedProfile.languageCode === "ar" ? "rtl" : "ltr"}
              placeholder="Sistem prompt talimatını girin..."
              className="w-full p-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none font-medium leading-relaxed"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
                <span>AI Prompt & Ton Ayarlarını Kaydet</span>
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