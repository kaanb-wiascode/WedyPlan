"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, User, Heart, Briefcase, Award, Tag, Compass, Zap } from "lucide-react";
import { AiPersonalizationEngine, UserPersonalizationProfile, PersonalizationPlatformSummary, PersonalizationPersonaType } from "@/lib/ai-native/ai-personalization-engine";

export const PersonalizationCenter: React.FC = () => {
  const [profiles, setProfiles] = useState<UserPersonalizationProfile[]>([]);
  const [summary, setSummary] = useState<PersonalizationPlatformSummary | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PersonalizationPersonaType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiPersonalizationEngine.getPersonalizationProfiles().then(setProfiles);
    AiPersonalizationEngine.getSummary().then(setSummary);
  }, []);

  const handleAdaptProfile = async (profileId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiPersonalizationEngine.triggerAdaptiveOptimization(profileId);
      setIsProcessing(false);
      AiPersonalizationEngine.getPersonalizationProfiles().then(setProfiles);
      AiPersonalizationEngine.getSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredProfiles = selectedPersona === "ALL"
    ? profiles
    : profiles.filter((p) => p.personaType === selectedPersona);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Personalization Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kişiselleştirme & Niyet Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Intent Accuracy: %{summary.averageIntentPredictionAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çiftler, tedarikçiler, çalışanlar, yöneticiler ve partnerler için dinamik diyalog tonu, davranış analizi ve tahminsel niyet modellemesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kişiselleştirilen Kullanıcı</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalPersonalizedUsersCount / 1000).toFixed(1)}K User
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Personalar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activePersonaTypesCount} Persona
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Niyet Doğruluğu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageIntentPredictionAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Intent Modeling Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Niyet & Persona Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Dynamic Adaptation
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiPersonalizationInsightNote}
          </p>
        </div>
      </div>

      {/* Persona Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "COUPLES", "VENDORS", "EXECUTIVES", "EMPLOYEES", "PARTNERS"] as (PersonalizationPersonaType | "ALL")[]).map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPersona(p)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedPersona === p
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {p === "ALL" ? "Tüm Personalar" : p}
          </button>
        ))}
      </div>

      {/* Profiles Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <User className="w-5 h-5 text-[#D4AF37]" />
          <span>Kişiselleştirilmiş Kullanıcı Profilleri ({filteredProfiles.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredProfiles.map((prs) => (
            <div
              key={prs.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{prs.userRefName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {prs.personaType}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1.5 font-mono text-[10px]">
                <div>🎨 Ton Tercihi: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{prs.toneStylePreference}</span></div>
                <div>🔮 Tahmin Edilen Niyet: <span className="font-bold text-emerald-500">{prs.predictedNextIntent} (%{prs.intentConfidenceScorePercent})</span></div>
                <div>⚡ Uygulanan Kurallar: <span className="font-bold text-[#D4AF37]">{prs.adaptivePromptRulesAppliedCount} Kural</span></div>
              </div>

              {/* Interaction Concept Tags */}
              <div className="flex flex-wrap gap-1">
                {prs.topInteractionConcepts.map((c) => (
                  <span
                    key={c}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6] flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-[#D4AF37]" /> {c}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tahmini: {prs.aiPersonalizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleAdaptProfile(prs.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-[#D4AF37]" />
                      <span>Kişiselleştirme Vektörünü Güncelle</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[#86868B]">
                  Son Uyum: {new Date(prs.lastAdaptedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};