"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Sparkles, ShieldCheck, Lock, ArrowDownRight, ArrowUpRight, Gift, RefreshCw, CheckCircle2, AlertCircle, Plus, CreditCard, DollarSign } from "lucide-react";
import { WalletEngine, WalletBalanceBuckets, WalletTransactionItem, SpendingAnalysisSummary, WalletOperationType } from "@/lib/fintech/wallet-engine";

export const WalletDashboard: React.FC = () => {
  const [balances, setBalances] = useState<WalletBalanceBuckets | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactionItem[]>([]);
  const [analysis, setAnalysis] = useState<SpendingAnalysisSummary | null>(null);

  // Operation Form
  const [amountInput, setAmountInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [selectedOp, setSelectedOp] = useState<WalletOperationType>("DEPOSIT");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    WalletEngine.getWalletBalance().then(setBalances);
    WalletEngine.getTransactions().then(setTransactions);
    WalletEngine.getSpendingAnalysis().then(setAnalysis);
  }, []);

  const handleExecute = async () => {
    const numAmount = Number(amountInput);
    if (!numAmount || numAmount <= 0) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const res = await WalletEngine.executeOperation(
        "w_couple_main",
        selectedOp,
        numAmount,
        descInput || `${selectedOp} Cüzdan İşlemi`
      );

      setIsProcessing(false);

      if (res.success && res.updatedBalances) {
        setBalances(res.updatedBalances);
        setStatusMsg({ type: "success", text: "Cüzdan işlemi başarıyla tamamlandı!" });
        setAmountInput("");
        setDescInput("");
        WalletEngine.getTransactions().then(setTransactions);
      } else {
        setStatusMsg({ type: "error", text: res.error || "İşlem gerçekleştirilemedi." });
      }
    }, 600);
  };

  if (!balances || !analysis) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Wallet Multi-Bucket Balance Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              WedyPlan Dijital Cüzdanım
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
          </span>
        </div>

        {/* Primary Available Balance */}
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] text-[#86868B] block uppercase tracking-wider font-mono">
            Kullanılabilir Bakiye
          </span>
          <span className="text-3xl font-mono font-bold text-white">
            ₺{balances.available.toLocaleString()} <span className="text-sm text-[#D4AF37]">{balances.currency}</span>
          </span>
        </div>

        {/* Balance Buckets Grid */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[9px] text-[#86868B] block">Escrow Kilitli</span>
            <span className="font-mono font-bold text-[#D4AF37] text-xs">
              ₺{(balances.escrowLocked / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[9px] text-[#86868B] block">Temizlenen (Pending)</span>
            <span className="font-mono font-bold text-amber-400 text-xs">
              ₺{(balances.pending / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[9px] text-[#86868B] block">İade (Refund)</span>
            <span className="font-mono font-bold text-blue-400 text-xs">
              ₺{balances.refund.toLocaleString()}
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[9px] text-[#86868B] block">Bonus / Prim</span>
            <span className="font-mono font-bold text-emerald-400 text-xs">
              ₺{balances.bonus.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Spending Analysis & Cash Flow Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Harcama & Nakit Akış Önerisi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            {analysis.monthlyCashFlowTrend}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {analysis.aiBudgetSuggestion}
            </p>
            <span className="text-[10px] text-[#86868B] block">{analysis.aiCashFlowTip}</span>
          </div>
        </div>
      </div>

      {/* Quick Wallet Operations Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#D4AF37]" />
          <span>Hızlı Cüzdan Operasyonları</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex gap-2">
            {(["DEPOSIT", "ESCROW_LOCK", "WITHDRAWAL"] as WalletOperationType[]).map((op) => (
              <button
                key={op}
                onClick={() => setSelectedOp(op)}
                className={`flex-1 py-2.5 rounded-2xl text-[11px] font-bold border transition-all ${
                  selectedOp === op
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {op === "DEPOSIT" ? "Para Yükle" : op === "ESCROW_LOCK" ? "Escrow Kilitle" : "Para Çek"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Tutar (₺)..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <input
              type="text"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              placeholder="Açıklama (Örn: Kapora)..."
              className="col-span-2 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <button
            onClick={handleExecute}
            disabled={!amountInput || isProcessing}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>İşlemi Onayla ve Çalıştır</span>
              </>
            )}
          </button>

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

      {/* Wallet Transactions History Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Cüzdan İşlem Geçmişi ({transactions.length})
        </h4>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{tx.description}</span>
                <span
                  className={`font-mono text-sm ${
                    tx.operation === "ESCROW_LOCK"
                      ? "text-[#D4AF37]"
                      : tx.operation === "DEPOSIT" || tx.operation === "BONUS_CREDIT"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {tx.operation === "ESCROW_LOCK" ? "🔒 " : tx.operation === "DEPOSIT" ? "+ " : "- "}
                  ₺{tx.amount.toLocaleString()} {tx.currency}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tür: {tx.operation}</span>
                <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};