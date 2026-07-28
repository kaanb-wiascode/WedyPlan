"use client";

import React, { useState, useEffect } from "react";
import { Store, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Sliders, Globe, Download, ArrowRight } from "lucide-react";
import { MobileReleaseEngine, StoreReleaseBuild, StoreLocalization } from "@/lib/mobile/mobile-release-engine";

export const MobileReleaseCenter: React.FC = () => {
  const [releases, setReleases] = useState<StoreReleaseBuild[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<StoreReleaseBuild | null>(null);
  const [activeLocalization, setActiveLocalization] = useState<StoreLocalization | null>(null);
  const [rolloutVal, setRolloutVal] = useState<number>(100);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    MobileReleaseEngine.getReleases().then((data) => {
      setReleases(data);
      if (data.length > 0) {
        setSelectedRelease(data[0]);
        setActiveLocalization(data[0].localizations[0] || null);
        setRolloutVal(data[0].stagedRolloutPercent);
      }
    });
  }, []);

  const handleRolloutChange = (val: number) => {
    setRolloutVal(val);
    if (selectedRelease) {
      MobileReleaseEngine.updateRolloutPercent(selectedRelease.id, val);
    }
  };

  const handleGenerateAiAso = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const generated = MobileReleaseEngine.generateAiStoreAssets("tr-TR");
      setActiveLocalization(generated);
      setIsGeneratingAi(false);
    }, 800);
  };

  if (!selectedRelease || !activeLocalization) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Release Overview Header Card */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              App Store Yayın Yönetimi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
            {selectedRelease.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Hedef Mağaza</span>
            <span className="font-mono font-bold text-white text-base">
              {selectedRelease.targetStore === "APPLE_APP_STORE" ? "Apple App Store" : "Google Play"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Sürüm / Build</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {selectedRelease.versionName} ({selectedRelease.buildNumber})
            </span>
          </div>
        </div>
      </div>

      {/* Pre-Flight Build Validation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Pre-Flight Derleme Kontrolleri</span>
        </h4>

        <div className="space-y-2">
          {selectedRelease.preflightChecks.map((check, idx) => (
            <div key={idx} className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{check.checkName}</span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {check.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Staged Rollout Slider */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            <span>Kademeli Dağıtım Oranı (Staged Rollout)</span>
          </label>
          <span className="font-mono font-bold text-xs text-[#D4AF37]">%{rolloutVal}</span>
        </div>

        <input
          type="range"
          min={1}
          max={100}
          value={rolloutVal}
          onChange={(e) => handleRolloutChange(Number(e.target.value))}
          className="w-full accent-[#111111] dark:accent-[#D4AF37] cursor-pointer"
        />
        <p className="text-[10px] text-[#666666] dark:text-[#86868B]">
          Güncelleme mevcut kullanıcıların %{rolloutVal}'ine otomatik sunuluyor.
        </p>
      </div>

      {/* WedyAI ASO & Localized Store Metadata Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI ASO Metin Üretici
          </span>
          <button
            onClick={handleGenerateAiAso}
            disabled={isGeneratingAi}
            className="text-[10px] font-semibold text-[#111111] dark:text-[#F5F4F0] hover:underline flex items-center gap-1"
          >
            {isGeneratingAi ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Globe className="w-3 h-3" />}
            <span>Metinleri Yenile</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block font-bold">Mağaza Başlığı</span>
            <p className="font-semibold text-[#111111] dark:text-[#F5F4F0]">{activeLocalization.title}</p>
          </div>

          <div>
            <span className="text-[10px] text-[#86868B] block font-bold">Alt Başlık (Subtitle)</span>
            <p className="text-[#555555] dark:text-[#A1A1A6]">{activeLocalization.subtitle}</p>
          </div>

          <div>
            <span className="text-[10px] text-[#86868B] block font-bold">Yayın Notları (What's New)</span>
            <p className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-[11px] text-[#424245] dark:text-[#D1D1D6] leading-relaxed">
              {activeLocalization.releaseNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};