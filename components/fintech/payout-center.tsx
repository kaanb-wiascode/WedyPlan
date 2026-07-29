"use client";

import React, { useState, useEffect } from "react";
import { Send, Sparkles, ShieldCheck, CheckCircle2, Zap, Landmark, RefreshCw, AlertCircle, Plus, Building2, CreditCard } from "lucide-react";
import { PayoutEngine, VendorPayoutRecord, VendorPayoutSummary } from "@/lib/fintech/payout-engine";

export const PayoutCenter: React.FC = () => {
  const [records, setRecords] = useState<VendorPayoutRecord[]>([]);
  const [summary, setSummary] = useState<VendorPayoutSummary | null>(null);

  // Form State
  const [vendorNameInput, setVendorNameInput] = useState("");
  const [ibanInput, setIbanInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    PayoutEngine.getPayoutRecords().then(setRecords);
    PayoutEngine.getSummary().then(setSummary);
  }, []);

  const handleApprove = async (payoutId: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await PayoutEngine.approvePayout(payoutId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Hakediş transferi onaylandı ve banka hesabına aktarıldı!" });
        PayoutEngine.getPayoutRecords().then(setRecords);
        PayoutEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Transfer onaylanamadı." });
      }
    }, 600);
  };

  const handleCreateRequest = async () => {
    const numAmt = Number(amountInput);
    if (!vendorNameInput.trim() || !ibanInput.trim() || !numAmt) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const res = await PayoutEngine.requestPayout(vendorNameInput, ibanInput, numAmt);
      setIsProcessing(false);

      if (res.success) {
        setStatusMsg({ type: "success", text: "Hakediş transfer talebi başarıyla oluşturuldu!" });
        setVendorNameInput("");
        setIbanInput("");
        setAmountInput("");
        PayoutEngine.getPayoutRecords().then(setRecords);
        PayoutEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: res.error || "Talebiniz kaydedilemedi." });
      }
    }, 600);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Payout Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Send className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Tedarikçi Hakediş & Payout Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> IBAN / FAST Validated
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Banka Havalesi / FAST / EFT kanalları üzerinden güvenli tedarikçi hakediş dağıtımı, minimum transfer eşikleri ve onay mekanizması.
        </p>

        {/* Executive Payout Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktarılan Toplam Hakediş</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalDisbursedVolume / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Onay Bekleyen Hakediş</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{summary.pendingApprovalVolume.toLocaleString()} TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Minimum Eşik</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{summary.minimumPayoutThreshold.toLocaleString()} TL
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Liquidity Health & Risk Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Likidite & Risk Analizi
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Hata: {summary.failedPayoutsCount}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiPayoutLiquidityHealth}
          </p>
        </div>
      </div>

      {/* New Payout Request Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Hakediş Transfer Talebi Oluştur</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={vendorNameInput}
              onChange={(e) => setVendorNameInput(e.target.value)}
              placeholder="Tedarikçi Unvanı..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Transfer Tutarı (₺)..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <input
            type="text"
            value={ibanInput}
            onChange={(e) => setIbanInput(e.target.value)}
            placeholder="TR00 0000 0000 0000 0000 0000 00 (IBAN)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleCreateRequest}
            disabled={!vendorNameInput.trim() || !ibanInput.trim() || !amountInput || isProcessing}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Hakediş Transfer Talebini Gönder</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Payout Records Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Hakediş Transfer Kütüğü ({records.length})
        </h4>

        <div className="space-y-3">
          {records.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.vendorName}</span>
                <span className="font-mono text-[#D4AF37] text-sm">
                  ₺{r.amount.toLocaleString()} {r.currency}
                </span>
              </div>

              <span className="font-mono text-[10px] text-[#86868B] block truncate">
                IBAN: {r.destinationIban}
              </span>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-medium">
                ✦ WedyAI Analizi: {r.aiLiquidityForecastTip}
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                {r.status === "SETTLED" || r.status === "APPROVED" ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Transfer Tamamlandı (Settled)
                  </span>
                ) : (
                  <button
                    onClick={() => handleApprove(r.id)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                        <span>Hakedişi Onayla & Aktar</span>
                      </>
                    )}
                  </button>
                )}
                <span className="font-mono text-[#86868B]">{r.auditHash}</span>
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              statusMsg.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};