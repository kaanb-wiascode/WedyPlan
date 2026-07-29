"use client";

import React, { useState, useEffect } from "react";
import { GitCommit, Sparkles, Smartphone, Globe, Mail, MessageSquare, PhoneCall, Bell, Zap, Layers } from "lucide-react";
import { OmnichannelJourneyEngine, UserOmnichannelJourney, OmnichannelChannel } from "@/lib/growth/omnichannel-journey-engine";

export const OmnichannelJourneyBuilder: React.FC = () => {
  const [journeys, setJourneys] = useState<UserOmnichannelJourney[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<UserOmnichannelJourney | null>(null);

  useEffect(() => {
    OmnichannelJourneyEngine.getActiveJourneys().then((data) => {
      setJourneys(data);
      if (data.length > 0) setSelectedJourney(data[0]);
    });
  }, []);

  if (!selectedJourney) return null;

  const renderChannelIcon = (chan: OmnichannelChannel) => {
    switch (chan) {
      case "WEBSITE": return <Globe className="w-4 h-4 text-blue-400" />;
      case "MOBILE_APP": return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case "EMAIL": return <Mail className="w-4 h-4 text-purple-400" />;
      case "WHATSAPP": return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case "CALL_CENTER": return <PhoneCall className="w-4 h-4 text-amber-400" />;
      case "PUSH": return <Bell className="w-4 h-4 text-rose-400" />;
      default: return <Globe className="w-4 h-4 text-gray-400" />;
    }
  };

  const aiPrediction = OmnichannelJourneyEngine.predictOptimalChannel(selectedJourney);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Omnichannel Müşteri Yolculuğu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Velocity Score: %{selectedJourney.aiPredictedConversionVelocityScore}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Web, Mobil, E-posta, SMS, Push, WhatsApp ve Çağrı Merkezi temas noktalarının uçtan uca senkronizasyonu ve WedyAI kanal optimizasyonu.
        </p>

        {/* High Level Journey Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Yolculuklar</span>
            <span className="font-mono font-bold text-white text-base">{journeys.length} Çift</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Mevcut Aşama</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">{selectedJourney.currentStage}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Escrow Durumu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {selectedJourney.isEscrowActive ? "Aktif Güvence" : "Korumalı"}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Journey Prediction & Next Channel Trigger Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Kanal & Tetikleyici Tahmini
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            +{aiPrediction.velocityBoostPercent}% Dönüşüm Hızı
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
            {selectedJourney.coupleNames}
          </h4>
          <span className="text-[10px] text-[#86868B]">Düğün Tarihi: {new Date(selectedJourney.weddingDate).toLocaleDateString()}</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between font-bold text-[#111111] dark:text-[#F5F4F0]">
            <span className="text-[10px] text-[#D4AF37] flex items-center gap-1">
              ✦ Önerilen Sonraki Kanal: {aiPrediction.recommendedChannel}
            </span>
            {renderChannelIcon(aiPrediction.recommendedChannel)}
          </div>
          <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
            "{aiPrediction.triggerMessage}"
          </p>
        </div>
      </div>

      {/* Touchpoints Timeline Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Uçtan Uca Temas Noktaları Geçmişi ({selectedJourney.touchpointsHistory.length})</span>
        </h4>

        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-black/10 dark:before:bg-white/10">
          {selectedJourney.touchpointsHistory.map((tp) => (
            <div key={tp.id} className="relative pl-9 space-y-1 text-xs">
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#111111] dark:bg-[#F5F4F0] border-2 border-white dark:border-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5">
                <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                  <div className="flex items-center gap-2">
                    {renderChannelIcon(tp.channel)}
                    <span>{tp.touchpointTitle}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
                    {tp.stage}
                  </span>
                </div>

                <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{tp.actionSummary}</p>

                <div className="pt-1 text-[10px] text-[#D4AF37] font-semibold">
                  ✦ WedyAI Notu: {tp.aiOptimizationTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Journeys Selector Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Diğer Aktif Çift Yolculukları ({journeys.length})
        </h4>

        <div className="space-y-3">
          {journeys.map((jrn) => (
            <div
              key={jrn.id}
              onClick={() => setSelectedJourney(jrn)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedJourney.id === jrn.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{jrn.coupleNames}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {jrn.currentStage}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Aktif Kanal: {jrn.activeChannel}</span>
                <span>Hız Skoru: %{jrn.aiPredictedConversionVelocityScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};