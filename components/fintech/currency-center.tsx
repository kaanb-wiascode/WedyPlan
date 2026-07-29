"use client";

import React, { useState, useEffect } from "react";
import { Globe, Sparkles, ShieldCheck, ArrowRightLeft, RefreshCw, CheckCircle2, TrendingUp, DollarSign, Layers } from "lucide-react";
import { CurrencyEngine, ExchangeRateItem, CurrencyCode, FxTrendSummary, CurrencyConversionResult } from "@/lib/fintech/currency-engine";

export const CurrencyCenter: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRateItem[]>([]);
  const [summary, setSummary] = useState<FxTrendSummary | null>(null);

  // Conversion Form
  const [amountInput, setAmountInput] = useState("1000");
  const [sourceCode, setSourceCode] = useState<CurrencyCode>("EUR");
  const [targetCode, setTargetCode] = useState<CurrencyCode>("TRY");
  const [conversionResult, setConversionResult] = useState<CurrencyConversionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    CurrencyEngine.getExchangeRates().then(setRates);
    CurrencyEngine.getFxSummary().then(setSummary);
    handleConvert();
  }, []);

  const handleConvert = async () => {
    const numAmt = Number(amountInput);
    if (!numAmt || numAmt <= 0) return;
    setIsProcessing(true);

    setTimeout(async () => {
      const res = await CurrencyEngine.convert(numAmt, sourceCode, targetCode);
      setConversionResult(res);
      setIsProcessing(false);
    }, 400);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Multi-Currency Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çoklu Para Birimi & FX Yönetimi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> TCMB / ECB Live Sync
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Uluslararası düğün operasyonları için anlık merkez bankası döviz kurları, atomik çevirici ve WedyAI FX trend tahminleri.
        </p>

        {/* Global FX Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Birimler</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.supportedCurrenciesCount} Para Birimi
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Volatite Riski</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.aiVolatilityRiskLevel}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Çapraz Sınır Payı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%24 GMV</span>
          </div>
        </div>
      </div>

      {/* WedyAI FX Trend & Forecast Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI FX Trend & Kur Tahmini
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Real-Time FX Guard
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {summary.ai30DayFxForecastNote}
            </p>
            <p className="text-[10px] text-[#86868B] pt-1">
              Pazar: {summary.crossBorderRevenueComparisonSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Instant Currency Converter Calculator Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-[#D4AF37]" />
          <span>Anlık Döviz Çevirici (Currency Converter)</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Tutar..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <select
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value as CurrencyCode)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {(["EUR", "USD", "GBP", "AED", "TRY"] as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={targetCode}
              onChange={(e) => setTargetCode(e.target.value as CurrencyCode)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {(["TRY", "EUR", "USD", "GBP", "AED"] as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4 text-[#D4AF37]" />
                <span>Hesapla & Çevir</span>
              </>
            )}
          </button>

          {conversionResult && (
            <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5 space-y-1 text-center font-mono">
              <span className="text-[10px] text-[#86868B] block">Dönüştürülen Sonuç Tutar</span>
              <span className="text-2xl font-bold text-[#111111] dark:text-[#F5F4F0]">
                {CurrencyEngine.formatCurrency(conversionResult.targetAmount, conversionResult.targetCurrency)}
              </span>
              <span className="text-[9px] text-[#D4AF37] block">
                Uygulanan Parite: 1 {conversionResult.sourceCurrency} = {conversionResult.appliedExchangeRate.toFixed(4)} {conversionResult.targetCurrency}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Live Rates Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Canlı Merkez Bankası Kurları ({rates.length})</span>
        </h4>

        <div className="space-y-3">
          {rates.map((r) => (
            <div
              key={r.code}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex justify-between items-center text-xs border border-black/5 dark:border-white/5 font-mono"
            >
              <div>
                <span className="font-bold text-sm text-[#111111] dark:text-[#F5F4F0] block">
                  {r.code} ({r.symbol})
                </span>
                <span className="text-[9px] text-[#86868B]">{r.providerName}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm text-[#D4AF37] block">
                  ₺{r.rateVsTry.toFixed(2)} TRY
                </span>
                <span className="text-[9px] text-emerald-500 font-bold">Live Rate</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};