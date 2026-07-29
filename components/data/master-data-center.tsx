"use client";

import React, { useState, useEffect } from "react";
import { Database, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Server, GitMerge, Award, Layers2, Check } from "lucide-react";
import { MasterDataEngine, GoldenRecordItem, MasterDataPlatformSummary, MasterDataDomain } from "@/lib/data/master-data-engine";

export const MasterDataCenter: React.FC = () => {
  const [records, setRecords] = useState<GoldenRecordItem[]>([]);
  const [summary, setSummary] = useState<MasterDataPlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<MasterDataDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    MasterDataEngine.getGoldenRecords().then(setRecords);
    MasterDataEngine.getSummary().then(setSummary);
  }, []);

  const handleResolveDuplicate = async (recordId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await MasterDataEngine.resolveDuplicate(recordId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' mükerrer kaydı başarıyla doğrulandı ve Golden Record olarak mühürlendi!` });
        MasterDataEngine.getGoldenRecords().then(setRecords);
        MasterDataEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Varlık birleştirme başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredRecords = selectedDomain === "ALL"
    ? records
    : records.filter((r) => r.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Master Data Management (MDM)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> MDM Quality: %{summary.averageMasterDataQualityScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Kullanıcı, çift, tedarikçi ve lokasyon verilerinin tüm sistemler genelinde tekil Golden Record standartlarında otonom yönetimi ve zenginleştirilmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Golden Record</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalGoldenRecordsCount / 1000).toFixed(1)}K Record
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Çözülen Mükerrer</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalResolvedDuplicates24h} Duplicate
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Master Etki Alanı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeMasterDomainsCount} Domain
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Varlık Çözümleme & Zenginleştirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            MDM AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <GitMerge className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMasterDataInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "VENDORS", "COUPLES", "LOCATIONS", "USERS", "ORGANIZATIONS", "SERVICES", "PRODUCTS"] as (MasterDataDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Etki Alanları" : dom}
          </button>
        ))}
      </div>

      {/* Records Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers2 className="w-5 h-5 text-[#D4AF37]" />
          <span>Golden Master Kayıtları ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{rec.entityName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {rec.goldenRecordId} ({rec.versionTag})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Etki Alanı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{rec.domain}</span></div>
                <div>Veri Kalitesi: <span className="font-bold text-emerald-500">%{rec.dataQualityScorePercent}</span></div>
                <div>Katkı Sağlayan Kaynaklar: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{rec.contributingSources.join(", ")}</span></div>
                <div>AI Güven Skoru: <span className="font-bold text-emerald-500">%{rec.aiEnrichmentConfidencePercent}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Çözümlemesi: {rec.aiResolutionNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {rec.status !== "GOLDEN_VERIFIED" ? (
                  <button
                    onClick={() => handleResolveDuplicate(rec.id, rec.entityName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <GitMerge className="w-3 h-3 text-[#D4AF37]" />
                        <span>Golden Record Olarak Doğrula</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Golden Record Doğrulandı
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Birleştirme: {new Date(rec.lastMergedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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