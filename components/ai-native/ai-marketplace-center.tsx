"use client";

import React, { useState, useEffect } from "react";
import { Store, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Download, Star, Layers, Package, Zap, Wrench, ArrowRight } from "lucide-react";
import { AiMarketplaceEngine, ReusableAiAssetRecord, AiMarketplaceSummary, AiAssetCategory } from "@/lib/ai-native/ai-marketplace-engine";

export const AiMarketplaceCenter: React.FC = () => {
  const [assets, setAssets] = useState<ReusableAiAssetRecord[]>([]);
  const [summary, setSummary] = useState<AiMarketplaceSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AiAssetCategory | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiMarketplaceEngine.getMarketplaceAssets().then(setAssets);
    AiMarketplaceEngine.getSummary().then(setSummary);
  }, []);

  const handleInstall = async (assetId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiMarketplaceEngine.installAsset(assetId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' varlığı sisteme başarıyla kuruldu ve ajan kullanımına açıldı!` });
        AiMarketplaceEngine.getMarketplaceAssets().then(setAssets);
        AiMarketplaceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Varlık kurulumu gerçekleştirilemedi." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredAssets = selectedCategory === "ALL"
    ? assets
    : assets.filter((a) => a.assetCategory === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Marketplace Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal AI Pazaryeri Platformu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Quality: %{summary.averageAssetQualityScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Yeniden kullanılabilir AI bileşenlerinin (Ajanlar, İstemler, İş Akışları, Bilgi ve Otomasyon Paketleri) yayınlanması, dağıtımı ve versiyon yönetimi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Yayınlanan Varlık</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalPublishedAssetsCount} Varlık
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kurulumlar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalActiveDeploymentsCount / 1000).toFixed(1)}K Active
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kalite Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageAssetQualityScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Recommendation & Quality Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Varlık & Kalite Öneri Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Asset Engine
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMarketplaceInsightNote}
          </p>
        </div>
      </div>

      {/* Asset Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "KNOWLEDGE_PACKS", "WORKFLOWS", "PROMPTS", "AGENTS", "AUTOMATION_PACKS"] as (AiAssetCategory | "ALL")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {cat === "ALL" ? "Tüm Varlıklar" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Assets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Package className="w-5 h-5 text-[#D4AF37]" />
          <span>Kullanılabilir AI Varlıkları ({filteredAssets.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredAssets.map((ast) => (
            <div
              key={ast.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ast.assetName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {ast.assetCategory} ({ast.versionTag})
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {ast.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div className="flex items-center gap-1">Puan: <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> <strong className="text-[#111111] dark:text-[#F5F4F0]">{ast.userRatingScore}</strong></div>
                <div>Kurulum: <strong className="text-[#111111] dark:text-[#F5F4F0]">{ast.activeDeploymentsCount} Tenant</strong></div>
                <div>Geliştirici: <strong className="text-[#111111] dark:text-[#F5F4F0]">{ast.authorVendorRef}</strong></div>
                <div>Kalite Skoru: <strong className="text-emerald-500">%{ast.qualityEvaluationScorePercent}</strong></div>
              </div>

              {/* Dependencies Badges */}
              <div className="flex flex-wrap gap-1">
                {ast.requiredDependencies.map((dep) => (
                  <span
                    key={dep}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6] flex items-center gap-1"
                  >
                    <Wrench className="w-3 h-3 text-[#D4AF37]" /> {dep}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Önerisi: {ast.aiRecommendationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                {ast.isInstalled ? (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sisteme Kurulu & Aktif
                  </span>
                ) : (
                  <button
                    onClick={() => handleInstall(ast.id, ast.assetName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Download className="w-3 h-3 text-[#D4AF37]" />
                        <span>Varlığı Kur & Aktifleştir</span>
                      </>
                    )}
                  </button>
                )}

                <span className="font-mono text-[#86868B]">
                  Yayın: {new Date(ast.publishedAt).toLocaleDateString()}
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