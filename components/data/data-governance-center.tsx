"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, CheckCircle2, Zap, Lock, FolderTree, GitBranch, Eye, Check } from "lucide-react";
import { DataGovernanceEngine, DataAssetGovernanceRecord, DataGovernancePlatformSummary, DataGovernancePillar } from "@/lib/data/data-governance-engine";

export const DataGovernanceCenter: React.FC = () => {
  const [assets, setAssets] = useState<DataAssetGovernanceRecord[]>([]);
  const [summary, setSummary] = useState<DataGovernancePlatformSummary | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<DataGovernancePillar | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataGovernanceEngine.getAssets().then(setAssets);
    DataGovernanceEngine.getSummary().then(setSummary);
  }, []);

  const handleApproveAsset = async (assetId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataGovernanceEngine.approveAsset(assetId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' veri varlığı yönetişim ve uyum onayından başarıyla geçti!` });
        DataGovernanceEngine.getAssets().then(setAssets);
        DataGovernanceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Onay işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredAssets = selectedPillar === "ALL"
    ? assets
    : assets.filter((a) => a.pillar === selectedPillar);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Veri Yönetişim Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Governance: %{summary.overallGovernanceScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Kataloglama, uçtan uca veri soyağacı (lineage), veri sahipliği (stewardship), WORM saklama kilitleri ve GDPR/KVKK PII hassas veri maskelemesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kataloglanan Varlık</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalCatalogedAssetsCount} Asset
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Korumalı PII Alanı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.piiProtectedFieldsCount} Alan
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Veri Yöneticisi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeDataStewardsCount} Steward
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Sensitive Data Detection Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Hassas Veri Algılama Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Governance Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Eye className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiGovernanceInsightNote}
          </p>
        </div>
      </div>

      {/* Pillar Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "POLICIES", "CLASSIFICATION", "LINEAGE", "DATA_CATALOG", "STEWARDSHIP"] as (DataGovernancePillar | "ALL")[]).map((pil) => (
          <button
            key={pil}
            onClick={() => setSelectedPillar(pil)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedPillar === pil
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {pil === "ALL" ? "Tüm Sütunlar" : pil.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Governance Assets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-[#D4AF37]" />
          <span>Yönetişim Veri Varlıkları ({filteredAssets.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredAssets.map((ast) => (
            <div
              key={ast.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ast.assetName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {ast.sensitivityLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Steward (Sorumlu): <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{ast.ownerDataSteward}</span></div>
                <div>Saklama Kilidi: <span className="font-bold text-[#D4AF37]">{ast.retentionPolicyDays ? `${ast.retentionPolicyDays} Gün` : "Sınırsız"}</span></div>
                <div>PII Maskeleme: <span className="font-bold text-emerald-500">{ast.piiMaskingActive ? "Aktif" : "Pasif"}</span></div>
                <div>Uyum Skoru: <span className="font-bold text-emerald-500">%{ast.governanceComplianceScorePercent}</span></div>
              </div>

              {/* Data Lineage Visualization Bar */}
              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> Veri Soyağacı (Data Lineage):
                </span>
                <p className="truncate text-[#111111] dark:text-[#F5F4F0]">{ast.lineageOrigin}</p>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tespiti: {ast.aiDetectionNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {ast.approvalStatus !== "APPROVED" ? (
                  <button
                    onClick={() => handleApproveAsset(ast.id, ast.assetName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                        <span>Steward Uyum Onayı Ver</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Uyum Onaylandı (Steward Approved)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Denetim: {new Date(ast.lastAuditedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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