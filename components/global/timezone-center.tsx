"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Calendar, Users, ArrowRightLeft } from "lucide-react";
import { TimeZoneEngine, TimeZoneProfile, CrossBorderMeetingSuggestion, TimeZoneSummary } from "@/lib/global/timezone-engine";

export const TimeZoneCenter: React.FC = () => {
  const [timezones, setTimezones] = useState<TimeZoneProfile[]>([]);
  const [suggestions, setSuggestions] = useState<CrossBorderMeetingSuggestion[]>([]);
  const [summary, setSummary] = useState<TimeZoneSummary | null>(null);

  useEffect(() => {
    TimeZoneEngine.getTimeZones().then(setTimezones);
    TimeZoneEngine.getMeetingSuggestions().then(setSuggestions);
    TimeZoneEngine.getTimeZoneSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Time Zone Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Saat Dilimi & Etkinlik Senkronizasyonu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> DST Shield: ACTIVE
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çapraz sınır randevu senkronizasyonu, IANA saat dilimleri, ISO-8601 UTC dönüşümleri ve WedyAI akıllı toplantı zamanlayıcısı.
        </p>

        {/* Timezone Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Saat Dilimleri</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.configuredTimeZonesCount} Zone
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplantı Çakışma Başarısı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{summary.aiMeetingOverlapOptimizationPercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">UTC Standart Tipi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ISO-8601
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Meeting Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Toplantı & UTC Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Zero Clock Drift
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiTimeZoneInsightNote}
          </p>
        </div>
      </div>

      {/* Cross-Border AI Meeting Suggestions Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span>WedyAI Çapraz Sınır Toplantı Önerileri ({suggestions.length})</span>
        </h4>

        <div className="space-y-3">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{s.coupleLocationName} ↔ {s.vendorLocationName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  %{s.aiOverlapScorePercent} Uyum
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl grid grid-cols-2 gap-2 font-mono text-[11px] border border-black/5 dark:border-white/5">
                <div>Çift Yeri: <span className="font-bold text-[#D4AF37]">{s.suggestedLocalTimeCouple}</span></div>
                <div>Tedarikçi Yeri: <span className="font-bold text-emerald-500">{s.suggestedLocalTimeVendor}</span></div>
              </div>

              <p className="text-[10px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                ✦ {s.aiOptimizationNote}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Timezones Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Aktif IANA Saat Dilimi Profilleri ({timezones.length})</span>
        </h4>

        <div className="space-y-3">
          {timezones.map((tz) => (
            <div
              key={tz.ianaCode}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex justify-between items-center text-xs border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="font-bold text-sm text-[#111111] dark:text-[#F5F4F0] block">
                  {tz.cityName}
                </span>
                <span className="text-[10px] font-mono text-[#86868B]">{tz.ianaCode}</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-[#D4AF37] block text-xs">{tz.utcOffsetFormatted}</span>
                <span className={`text-[9px] font-bold ${tz.isDstActive ? "text-emerald-500" : "text-[#86868B]"}`}>
                  {tz.isDstActive ? "DST Aktif (+1s)" : "Standart Zaman"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};