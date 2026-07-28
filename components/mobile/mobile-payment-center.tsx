"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, CreditCard, Sparkles, Download, CheckCircle2, ArrowRight, Wallet, Lock, Receipt } from "lucide-react";
import { MobilePaymentEngine, MobilePaymentTransaction, PaymentInsight } from "@/lib/mobile/mobile-payment-engine";

export const MobilePaymentCenter: React.FC = () => {
  const [transactions, setTransactions] = useState<MobilePaymentTransaction[]>([]);
  const [insights, setInsights] = useState<PaymentInsight | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"APPLE_PAY" | "CREDIT_CARD">("APPLE_PAY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    setTransactions(MobilePaymentEngine.getTransactionHistory());
    setInsights(MobilePaymentEngine.getPaymentInsights());
  }, []);

  const handlePayDeposit = async () => {
    setIsProcessing(true);
    setStatusMsg("Biometric Unlock & PassKit Doğrulanıyor...");

    const res = await MobilePaymentEngine.processPayment({
      vendorName: "Ahenk Çiçekçilik & Tasarım",
      amount: 15000,
      method: selectedMethod,
      installments: selectedMethod === "CREDIT_CARD" ? 3 : 1,
    });

    setIsProcessing(false);

    if (res.success) {
      setStatusMsg("Ödeme Başarılı! Escrow Akıllı Havuzuna Aktarıldı.");
      setTransactions(MobilePaymentEngine.getTransactionHistory());
      setTimeout(() => setStatusMsg(null), 3500);
    } else {
      setStatusMsg(res.error || "Ödeme başarısız.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* WedyAI Budget & Payment Overview Header */}
      {insights && (
        <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-editorial text-lg font-semibold">
                WedyPay Mobil Cüzdan
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
              Escrow Korumalı
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
            <div>
              <span className="text-[10px] text-[#86868B] block">Toplam Harcanan</span>
              <span className="text-lg font-mono font-bold text-[#F5F4F0]">
                ₺{insights.totalSpent.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#86868B] block">Kalan Bütçe</span>
              <span className="text-lg font-mono font-bold text-[#D4AF37]">
                ₺{insights.remainingBudget.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <p className="text-[11px] text-[#D1D1D6]">{insights.aiAdvice}</p>
          </div>
        </div>
      )}

      {/* Quick Payment Execution Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
            Bekleyen Bakiye Ödemesi
          </span>
          <span className="text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
            ₺15.000 TL
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMethod("APPLE_PAY")}
            className={`flex-1 py-3 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedMethod === "APPLE_PAY"
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white/60 border-black/10 text-[#111111]"
            }`}
          >
            <Wallet className="w-4 h-4 text-[#D4AF37]" />
            <span>Apple Pay</span>
          </button>
          <button
            onClick={() => setSelectedMethod("CREDIT_CARD")}
            className={`flex-1 py-3 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedMethod === "CREDIT_CARD"
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white/60 border-black/10 text-[#111111]"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Kart / 3 Taksit</span>
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{statusMsg}</span>
          </div>
        )}

        <button
          onClick={handlePayDeposit}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40"
        >
          <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{isProcessing ? "İşleniyor..." : "Güvenli Ödemeyi Tamamla"}</span>
        </button>
      </div>

      {/* Payment History & Receipts Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Son Ödeme İşlemleri & Makbuzlar
        </h4>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F4F0]">
                  <span>{tx.vendorName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="text-[10px] text-[#86868B]">
                  {tx.receiptNumber} • {new Date(tx.paidAt).toLocaleDateString()}
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className="font-mono font-bold block text-[#111111] dark:text-[#F5F4F0]">
                  ₺{tx.amount.toLocaleString()}
                </span>
                <button className="text-[10px] font-semibold text-[#D4AF37] hover:underline flex items-center gap-0.5 justify-end">
                  <Receipt className="w-3 h-3" />
                  <span>Makbuz İndir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};