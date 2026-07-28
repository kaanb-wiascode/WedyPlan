"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Sparkles, Layers } from "lucide-react";
import { GrowthAnalyticsEngine, RevenueGrowthBreakdown, FunnelAcquisitionMetric, AiGrowthAnomaly, DashboardRole } from "@/lib/growth/growth-analytics-engine";

export const GrowthAnalyticsDashboard: React.FC = () => {
  const [revenue, setRevenue] = useState<RevenueGrowthBreakdown | null>(null);
  const [funnel, setFunnel] = useState<FunnelAcquisitionMetric[]>([]);
  const [anomalies, setAnomalies] = useState<AiGrowthAnomaly[]>([]);
  const [selectedRole, setSelectedRole] = useState<DashboardRole>("EXECUTIVE");

  useEffect(() => {
    GrowthAnalyticsEngine.getRevenueBreakdown().then(setRevenue);
    GrowthAnalyticsEngine.getAcquisitionFunnel().then(setFunnel);
    GrowthAnalyticsEngine.getAiAnomalies().then(setAnomalies);
  }, []);

  if (!revenue) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Büyüme Analitiği & Yönetici Raporu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Real-Time Telemetry
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Uçtan uca AARRR büyüme hunisi, LTV/CAC oranları, WedyAI anomali tespiti ve çoklu departman raporlaması.
        </p>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(revenue.gmvTotal / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Gelir (MRR)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(revenue.mrrTotal / 1000).toFixed(0)}K TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">LTV / CAC Oranı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {revenue.cacToLtvRatio}x
            </span>
          </div>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["EXECUTIVE", "MARKETING", "SALES", "VENDOR_GROWTH", "CUSTOMER_GROWTH"] as DashboardRole[]).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRole === role
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {role === "EXECUTIVE" ? "Yönetici" : role === "MARKETING" ? "Pazarlama" : role === "SALES" ? "Satış" : role === "VENDOR_GROWTH" ? "B2B Tedarikçi" : "B2C Çift"}
          </button>
        ))}
      </div>

      {/* WedyAI Anomaly Detection & Growth Opportunities */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Anomali & Büyüme Fırsatları
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Automated APM & Growth Guard</span>
        </div>

        <div className="space-y-3">
          {anomalies.map((anom) => (
            <div
              key={anom.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#111111] dark:text-[#F5F4F0] text-sm">{anom.metricName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  anom.anomalyType === "SPIKE_POSITIVE"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                }`}>
                  {anom.anomalyType}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {anom.description}
              </p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-semibold flex items-center gap-1">
                <span>✦ WedyAI Önerisi: {anom.recommendedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AARRR Acquisition Funnel Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>AARRR Büyüme Hunisi Analizi</span>
        </h4>

        <div className="space-y-3">
          {funnel.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{item.stageName}</span>
                <span className="font-mono text-sm">{item.count.toLocaleString()}</span>
              </div>

              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#111111] dark:bg-[#D4AF37] h-full transition-all duration-500"
                  style={{ width: `${item.conversionPercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] pt-0.5">
                <span className="text-[#86868B]">Dönüşüm Oranı: %{item.conversionPercent}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  +{item.growthDeltaPercent}% Aylık Büyüme
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};