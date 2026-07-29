"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Lock, Unlock, AlertTriangle, CheckCircle2, FileText, Clock, RefreshCw, ShieldAlert } from "lucide-react";
import { EscrowEngine, EscrowVaultContract, EscrowMilestone } from "@/lib/fintech/escrow-engine";

export const EscrowCenter: React.FC = () => {
  const [vaults, setVaults] = useState<EscrowVaultContract[]>([]);
  const [selectedVault, setSelectedVault] = useState<EscrowVaultContract | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    EscrowEngine.getEscrowVaults().then((data) => {
      setVaults(data);
      if (data.length > 0) setSelectedVault(data[0]);
    });
  }, []);

  const handleReleaseMilestone = async (milestoneId: string) => {
    if (!selectedVault) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const res = await EscrowEngine.confirmAndReleaseMilestone(selectedVault.id, milestoneId);
      setIsProcessing(false);

      if (res.success) {
        setStatusMsg({ type: "success", text: "Aşama ödemesi onaylandı ve bakiyeniz tedarikçiye aktarıldı!" });
        EscrowEngine.getEscrowVaults().then((data) => {
          setVaults(data);
          const updated = data.find((v) => v.id === selectedVault.id);
          if (updated) setSelectedVault(updated);
        });
      } else {
        setStatusMsg({ type: "error", text: res.error || "İşlem başarısız." });
      }
    }, 600);
  };

  const handleDisputeHold = async () => {
    if (!selectedVault) return;
    setIsProcessing(true);

    setTimeout(async () => {
      await EscrowEngine.triggerDisputeHold(selectedVault.id, "Hizmet detaylarında uyumsuzluk tespit edildi.");
      setIsProcessing(false);
      setStatusMsg({ type: "error", text: "Escrow havuzu donduruldu. WedyPlan hakem heyeti inceleme başlattı." });
      EscrowEngine.getEscrowVaults().then((data) => {
        setVaults(data);
        const updated = data.find((v) => v.id === selectedVault.id);
        if (updated) setSelectedVault(updated);
      });
    }, 600);
  };

  if (!selectedVault) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Escrow Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Escrow Kapora & Bakiye Güvencesi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> %100 Insured Vault
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          E-imzalı sözleşme aşamalarına bağlı aşamalı bakiye serbest bırakma, WedyAI dolandırıcılık kalkanı ve ihtilaf dondurma altyapısı.
        </p>

        {/* Global Vault Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Korunan Sözleşme</span>
            <span className="font-mono font-bold text-white text-base">₺{selectedVault.totalContractAmount.toLocaleString()} TL</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Havuz Durumu</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">{selectedVault.currentState}</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">AI Risk Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%{selectedVault.aiRiskScore} Risk</span>
          </div>
        </div>
      </div>

      {/* WedyAI Risk & Dispute Prediction Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İhtilaf & Risk Analizi
          </span>
          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
            selectedVault.aiRiskScore > 50
              ? "bg-red-500/10 text-red-600 dark:text-red-400"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          }`}>
            Risk Skoru: %{selectedVault.aiRiskScore}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedVault.aiDisputePredictionSummary}
          </p>
        </div>
      </div>

      {/* Active Contract Milestones Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedVault.vendorName}
            </h4>
            <span className="text-[10px] text-[#86868B]">Sözleşmeli Çift: {selectedVault.coupleName}</span>
          </div>

          {selectedVault.currentState !== "DISPUTE_HOLD" && (
            <button
              onClick={handleDisputeHold}
              className="px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-1 shrink-0"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> İhtilaf Dondur
            </button>
          )}
        </div>

        <div className="space-y-3">
          {selectedVault.milestones.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{m.milestoneTitle}</span>
                <span className="font-mono text-sm text-[#D4AF37]">
                  ₺{m.amount.toLocaleString()} TRY
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                {m.isReleasedToVendor ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Serbest Bırakıldı (Tedarikçiye Aktarıldı)
                  </span>
                ) : (
                  <button
                    onClick={() => handleReleaseMilestone(m.id)}
                    disabled={isProcessing || selectedVault.currentState === "DISPUTE_HOLD"}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Unlock className="w-3 h-3 text-[#D4AF37]" />
                        <span>Hizmeti Onayla & Ödemeyi Serbest Bırak</span>
                      </>
                    )}
                  </button>
                )}
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
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>

      {/* Select Other Escrow Vaults Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Tüm Güvencedeki Escrow Sözleşmeleri ({vaults.length})
        </h4>

        <div className="space-y-3">
          {vaults.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVault(v)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedVault.id === v.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{v.vendorName}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {v.currentState}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Çift: {v.coupleName}</span>
                <span>Tutar: ₺{v.totalContractAmount.toLocaleString()} TRY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};