"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, MapPin, ShieldCheck, Share2, Compass } from "lucide-react";
import { DeviceIntegrationEngine, DynamicIslandState } from "@/lib/mobile/device-integration-engine";

interface LiveActivityWidgetProps {
  initialState?: Partial<DynamicIslandState>;
}

export const LiveActivityWidget: React.FC<LiveActivityWidgetProps> = ({ initialState }) => {
  const [activity] = useState<DynamicIslandState>({
    activityId: "activity_101",
    eventTitle: "Sena & Kaan Düğün Töreni",
    daysRemaining: 18,
    escrowStatus: "SECURED",
    venueName: "Çırağan Palace Kempinski",
    ...initialState,
  });

  const handleExportCalendar = (type: "apple" | "google") => {
    DeviceIntegrationEngine.exportToCalendar(
      {
        title: activity.eventTitle,
        startDate: new Date(Date.now() + 18 * 86400000),
        endDate: new Date(Date.now() + 18 * 86400000 + 18000000),
        location: activity.venueName,
        notes: "WedyPlan Korumalı Etkinlik",
      },
      type
    );
  };

  const handleShare = () => {
    DeviceIntegrationEngine.triggerNativeShare({
      title: activity.eventTitle,
      text: `${activity.eventTitle} düğün detayları WedyPlan üzerinde yayınlandı!`,
      url: window.location.href,
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#111111] text-[#F5F4F0] rounded-[32px] p-5 border border-white/20 shadow-2xl space-y-4 font-sans">
      {/* Dynamic Island Header Pills */}
      <div className="flex justify-between items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider text-[#D4AF37] uppercase font-bold">
            Live Activity / Dynamic Island
          </span>
        </div>
        <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
          {activity.daysRemaining} Gün Kaldı
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="font-serif-editorial text-lg font-semibold leading-snug">
          {activity.eventTitle}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-[#86868B]">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{activity.venueName}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
          <ShieldCheck className="w-4 h-4" />
          <span>Escrow Kaporası Güvencede</span>
        </div>
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#F5F4F0]" />
        </button>
      </div>

      {/* OS Native Integration Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => handleExportCalendar("apple")}
          className="flex items-center justify-center gap-2 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-[11px] font-medium transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Apple Takvim</span>
        </button>
        <button
          onClick={() => handleExportCalendar("google")}
          className="flex items-center justify-center gap-2 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-[11px] font-medium transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Google Takvim</span>
        </button>
      </div>
    </div>
  );
};