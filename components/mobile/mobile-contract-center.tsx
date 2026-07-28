"use client";

import React, { useState, useEffect } from "react";
import { FileText, ShieldCheck, Sparkles, CheckCircle2, XCircle, Download, Share2, PenTool, AlertTriangle, ChevronRight, Lock } from "lucide-react";
import { MobileContractEngine, MobileContractItem } from "@/lib/mobile/mobile-contract-engine";

export const MobileContractCenter: React.FC = () => {
  const [contracts, setContracts] = useState<MobileContractItem[]>([]);
  const [selectedContract, setSelectedContract] = useState<MobileContractItem | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    MobileContractEngine.getContracts().then((data) => {
      setContracts(data);
      if (data.length > 0) setSelectedContract(data[0]);
    });
  }, []);

  const handleSignConfirm = async () => {
    if (!selectedContract) return;
    setIsSigning(true);
    setStatusMsg("Biyometrik Onay ve E-İmza Zaman Damgası İşleniyor...");

    const res = await MobileContractEngine.signContractWithBiometrics(
      selectedContract.id,
      "SVG_SIGNATURE_DATA"
    );

    setIsSigning(false);

    if (res.success) {
      setStatusMsg("Sözleşme Başarıyla Onaylandı ve Escrow Koruması Başlatıldı!");
      setIsSignModalOpen(false);
      MobileContractEngine.getContracts().then(setContracts);
    } else {
      setStatusMsg("Sözleşme imzalanamadı.");
    }
  };

  if (!selectedContract) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Active Contract Header Card */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              Dijital Sözleşme Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded-full text-[#D4AF37]">
            {selectedContract.version}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif-editorial text-xl font-semibold leading-tight text-white">
            {selectedContract.vendorName}
          </h4>
          <p className="text-xs text-[#86868B]">{selectedContract.contractNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Toplam Tutar</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{selectedContract.totalAmount.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Escrow Kaporası</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{selectedContract.depositAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Risk & Clause Inspection Panel */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Hukuki Risk Analizi
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
            Güvenli
          </span>
        </div>

        <div className="space-y-3">
          {selectedContract.clauses.map((clause) => (
            <div key={clause.id} className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{clause.clauseNumber} — {clause.title}</span>
                {clause.aiRiskLevel === "LOW" ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {clause.content}
              </p>
              {clause.aiRiskSummary && (
                <div className="text-[10px] text-[#D4AF37] font-semibold flex items-center gap-1 pt-1">
                  <span>✦ {clause.aiRiskSummary}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex gap-2">
          {selectedContract.status === "PENDING_APPROVAL" ? (
            <button
              onClick={() => setIsSignModalOpen(true)}
              className="flex-1 h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4 text-[#D4AF37]" />
              <span>Sözleşmeyi E-İmzala</span>
            </button>
          ) : (
            <div className="flex-1 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sözleşme E-İmzalandı</span>
            </div>
          )}

          <button className="w-12 h-12 bg-white/80 border border-black/10 rounded-2xl flex items-center justify-center text-[#111111]">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* E-Signature Drawing Modal */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <div className="w-full max-w-sm bg-[#F5F4F0] rounded-[36px] border border-white/80 p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom">
            <div className="text-center space-y-1">
              <h4 className="font-serif-editorial text-xl font-semibold text-[#111111]">
                Mobil E-İmza Onayı
              </h4>
              <p className="text-xs text-[#666666]">
                Ekrana imzanızı çizin veya Face ID ile onaylayın.
              </p>
            </div>

            <div className="h-32 w-full bg-white border border-black/15 rounded-2xl flex items-center justify-center text-xs text-[#86868B] font-mono border-dashed">
              [ Dokunmatik İmza Çizim Alanı ]
            </div>

            <button
              onClick={handleSignConfirm}
              disabled={isSigning}
              className="w-full h-12 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>{isSigning ? "İmzalanıyor..." : "İmza ve Onayı Tamamla"}</span>
            </button>

            <button
              onClick={() => setIsSignModalOpen(false)}
              className="w-full text-center text-xs text-[#86868B]"
            >
              Vazgeç
            </button>
          </div>
        </div>
      )}
    </div>
  );
};