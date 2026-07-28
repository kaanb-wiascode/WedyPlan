"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, ShieldCheck, Sparkles, Activity, AlertTriangle, CheckCircle2, Lock, Eye, Users } from "lucide-react";
import { MobileAnalyticsEngine, FunnelStage, ConsentSettings } from "@/lib/mobile/mobile-analytics-engine";

export const MobileAnalyticsDashboard: React.FC = () => {
  const [funnel, setFunnel] = useState<FunnelStage[]>([]);
  const [consent, setConsent] = useState<ConsentSettings>(MobileAnalyticsEngine.getConsent());
  const [anrWarning, setAnrWarning] = useState<string | null>(null);

  useEffect(() => {
    setFunnel(MobileAnalyticsEngine.getConversionFunnel());

    // Main Thread ANR İzleyici Başlat
    MobileAnalyticsEngine.startAnrMonitoring((stallMs) => {
      setAnrWarning(`Main Thread Gecikmesi Algılandı (${stallMs}ms)`);
      setTimeout(() => setAnrWarning(null), 4000);
    });

    // Sayfa Görüntüleme Event'i Fırlat
    MobileAnalyticsEngine.trackEvent("VIEW_ANALYTICS_DASHBOARD", "SCREEN_VIEW");
  }, []);

  const handleToggleConsent = (key: keyof ConsentSettings) => {
    const updated = { ...consent, [key]: !consent[key] };
    setConsent(updated);
    MobileAnalyticsEngine.updateConsent(updated);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Analytics Overview Header Card */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              Mobil Analitik & Telemetri
            </h3>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> KVKK Uyumlu
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Aktif Mobil Oturum</span>
            <span className="font-mono font-bold text-white text-base">12.400</span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Ort. Dönüşüm Oranı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">%13.0</span>
          </div>
        </div>
      </div>

      {/* ANR & Main Thread Warning Banner */}
      {anrWarning && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-2xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>{anrWarning}</span>
        </div>
      )}

      {/* WedyAI Conversion Funnel & Drop-off Prediction Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Dönüşüm Hunisi
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Canlı Veri</span>
        </div>

        <div className="space-y-2.5">
          {funnel.map((stage, i) => (
            <div key={i} className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1 text-xs">
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{stage.stageName}</span>
                <span className="font-mono text-[11px]">{stage.visitorsCount.toLocaleString()} kullanıcı</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#111111] dark:bg-[#D4AF37] h-full transition-all duration-500"
                  style={{ width: `${stage.conversionRatePercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] pt-0.5">
                <span className="text-[#666666]">Dönüşüm: %{stage.conversionRatePercent}</span>
                {stage.aiDropoffRisk === "HIGH" && (
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    ⚠️ Yüksek Terk Etme Riski
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KVKK / GDPR Privacy Consent Settings */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#D4AF37]" />
          <span>KVKK & GDPR Rıza Yönetimi</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl">
            <div>
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">Anonim Analitik</span>
              <span className="text-[10px] text-[#666666]">Kullanım istatistikleri toplanır.</span>
            </div>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={() => handleToggleConsent("analytics")}
              className="w-4 h-4 accent-[#111111]"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl">
            <div>
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">Performans & Hata Logları</span>
              <span className="text-[10px] text-[#666666]">ANR ve çökme raporları iletilir.</span>
            </div>
            <input
              type="checkbox"
              checked={consent.performance}
              onChange={() => handleToggleConsent("performance")}
              className="w-4 h-4 accent-[#111111]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};