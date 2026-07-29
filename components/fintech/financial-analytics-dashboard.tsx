"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Sparkles, ShieldCheck, DollarSign, PieChart, BarChart3, ArrowUpRight, Zap, Crown, Landmark, AlertCircle, Layers } from "lucide-react";
import { FinancialAnalyticsEngine, FinancialTelemetryMetrics, FinancialForecastReport, FinancialAnomalyAlert, FinancialRoleViewport } from "@/lib/fintech/financial-analytics-engine";

export const FinancialAnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<FinancialTelemetryMetrics | null>(null);
  const [forecast, setForecast] = useState<FinancialForecastReport | null>(null);
  const [anomalies, setAnomalies] = useState<FinancialAnomalyAlert[]>([]);
  const [selectedRole, setSelectedRole] = useState<FinancialRoleViewport>("CFO");

  useEffect(() => {
    FinancialAnalyticsEngine.getMetrics().then(setMetrics);
    FinancialAnalyticsEngine.getForecast().then(setForecast);
    FinancialAnalyticsEngine.getAnomalies().then(setAnomalies);
  }, []);

  if (!metrics || !forecast) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Financial Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              C-Suite Finansal Analiz Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Profit Margin: %{metrics.netProfitMarginPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          CEO, CFO, Finans ve Pazaryeri yöneticileri için anlık gelir, gider, net kar, komisyon, abonelik ve Escrow finansal görünürlüğü.
        </p>

        {/* Global Executive Financial Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Pazaryeri GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(metrics.grossMarketplaceVolumeGmv / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Net Gelir</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(metrics.netRevenueTotal / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Net Kar</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{(metrics.netProfitMarginAmount / 1000000).toFixed(2)}M TL
            </span>
          </div>
        </div>
      </div>

      {/* Role Viewport Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["CEO", "CFO", "FINANCE", "MARKETPLACE"] as FinancialRoleViewport[]).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedRole === role
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {role === "CEO" ? "CEO View" : role === "CFO" ? "CFO View" : role === "FINANCE" ? "Finans Ekibi" : "Pazaryeri Metrikleri"}
          </button>
        ))}
      </div>

      {/* WedyAI Revenue Forecast & Cost Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI 30/60/90 Günlük Gelir Tahmini
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            30d: ₺{(forecast.projectedRevenue30Days / 1000000).toFixed(2)}M TL
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs border border-black/5 dark:border-white/5">
          <span className="font-bold text-[#D4AF37] text-[10px] block">✦ WedyAI Büyüme Özeti</span>
          <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] font-medium leading-relaxed">
            {forecast.aiGrowthTrajectorySummary}
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            Maliyet Tasarrufu: {forecast.aiCostOptimizationTip}
          </p>
        </div>

        {/* 30/60/90 Days Horizon Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
          <div className="p-2.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">30 Gün Tahmini</span>
            <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">
              ₺{(forecast.projectedRevenue30Days / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="p-2.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">60 Gün Tahmini</span>
            <span className="font-bold text-[#D4AF37]">
              ₺{(forecast.projectedRevenue60Days / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="p-2.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">90 Gün Tahmini</span>
            <span className="font-bold text-emerald-500">
              ₺{(forecast.projectedRevenue90Days / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>
      </div>

      {/* Role-Specific Metric Streams */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>{selectedRole} Finansal Görünümü & Detayları</span>
        </h4>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">Komisyon Gelirleri</span>
            <span className="font-mono font-bold text-sm text-[#111111] dark:text-[#F5F4F0]">
              ₺{(metrics.totalCommissionCollected / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">Abonelik Gelirleri (MRR)</span>
            <span className="font-mono font-bold text-sm text-[#D4AF37]">
              ₺{(metrics.totalSubscriptionsMrr / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">Operasyonel Giderler</span>
            <span className="font-mono font-bold text-sm text-red-500">
              ₺{(metrics.operationalExpensesTotal / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">Escrow Kilitli Hacim</span>
            <span className="font-mono font-bold text-sm text-emerald-500">
              ₺{(metrics.totalEscrowHeldValue / 1000000).toFixed(2)}M TL
            </span>
          </div>
        </div>
      </div>

      {/* Financial Anomalies & Risk Alerts Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Finansal Anomali & Risk Uyarıları ({anomalies.length})
        </h4>

        <div className="space-y-3">
          {anomalies.map((anom) => (
            <div
              key={anom.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{anom.title}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  {anom.severity}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{anom.description}</p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-semibold">
                ✦ Aksiyon: {anom.suggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};