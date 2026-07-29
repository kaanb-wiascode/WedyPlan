"use client";

import React, { useState, useEffect } from "react";
import { Handshake, ShieldCheck, RefreshCw, CheckCircle2, Zap, Award, Key, Layers, Star, ExternalLink, Check } from "lucide-react";
import { PartnerProgramEngine, EnterprisePartnerRecord, PartnerProgramSummary, PartnerType } from "@/lib/integration/partner-program-engine";

export const PartnerIntegrationCenter: React.FC = () => {
  const [partners, setPartners] = useState<EnterprisePartnerRecord[]>([]);
  const [summary, setSummary] = useState<PartnerProgramSummary | null>(null);
  const [selectedType, setSelectedType] = useState<PartnerType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    PartnerProgramEngine.getPartners().then(setPartners);
    PartnerProgramEngine.getSummary().then(setSummary);
  }, []);

  const handleVerify = async (partnerId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await PartnerProgramEngine.reVerifyPartner(partnerId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' partner entegrasyonu yeniden denetlendi ve Gold Tier sertifikasyonu onaylandı!` });
        PartnerProgramEngine.getPartners().then(setPartners);
        PartnerProgramEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Sertifikasyon denetimi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredPartners = selectedType === "ALL"
    ? partners
    : partners.filter((p) => p.type === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Partner Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Partner Entegrasyon Programı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{summary.averagePartnerHealthScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Teknoloji, danışmanlık ve stratejik partnerler için teknik sertifikasyon, izole Sandbox erişimi, özel API anahtarları ve WedyAI kalite analizi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kayıtlı Partner</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalRegisteredPartnersCount} Partner
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Sertifikalı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.certifiedPartnersCount} Approved
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Sağlık Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averagePartnerHealthScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Partner Health & Quality Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Partner Sağlık & Kalite Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Health Analyzer Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiPartnerInsightNote}
          </p>
        </div>
      </div>

      {/* Partner Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "STRATEGIC", "TECHNOLOGY", "CONSULTING", "IMPLEMENTATION", "MARKETPLACE"] as (PartnerType | "ALL")[]).map((typ) => (
          <button
            key={typ}
            onClick={() => setSelectedType(typ)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === typ
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {typ === "ALL" ? "Tüm Partnerler" : typ}
          </button>
        ))}
      </div>

      {/* Partners Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Handshake className="w-5 h-5 text-[#D4AF37]" />
          <span>Kurumsal Ekosistem Partnerleri ({filteredPartners.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredPartners.map((part) => (
            <div
              key={part.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{part.partnerName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" /> {part.certificationTier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Tür: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{part.type}</span></div>
                <div>Sandbox Erişimi: <span className="font-bold text-emerald-500">{part.sandboxAccessActive ? "Aktif" : "Pasif"}</span></div>
                <div>Sağlık Skoru: <span className="font-bold text-emerald-500">%{part.partnerHealthScorePercent}</span></div>
                <div>Kalite Puanı: <span className="font-bold text-[#D4AF37]">{part.integrationQualityRating} / 5.0</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Analizi: {part.aiQualityAnalysisTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleVerify(part.id, part.partnerName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                      <span>Partner Sertifikasyonunu Denetle</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Sertifika: {new Date(part.certifiedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};