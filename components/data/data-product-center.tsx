"use client";

import React, { useState, useEffect } from "react";
import { PackageCheck, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Users, Activity, Sparkles, Send } from "lucide-react";
import { DataProductEngine, DataProductRecord, DataProductPlatformSummary, DataProductDomain } from "@/lib/data/data-product-engine";

export const DataProductCenter: React.FC = () => {
  const [products, setProducts] = useState<DataProductRecord[]>([]);
  const [summary, setSummary] = useState<DataProductPlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DataProductDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataProductEngine.getProducts().then(setProducts);
    DataProductEngine.getSummary().then(setSummary);
  }, []);

  const handlePublish = async (productId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataProductEngine.publishProductVersion(productId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' veri ürününün yeni sürümü (v2.2) tüm tüketicilere başarıyla yayınlandı!` });
        DataProductEngine.getProducts().then(setProducts);
        DataProductEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Veri ürünü yayınlama başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredProducts = selectedDomain === "ALL"
    ? products
    : products.filter((p) => p.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Veri Ürün Merkezi (Data Product)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Product SLA: %{summary.averageProductSlaPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Veri varlıklarının etki alanı sahipliğinde, sürümlenmiş, Kalite SLA garantili ve tekrar kullanılabilir kurumsal Veri Ürünleri (Data Products) olarak sunulması.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Veri Ürünü</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveDataProductsCount} Ürün
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Tüketici (Subscribers)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalDownstreamSubscribersCount} Consumer
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ortalama Kalite SLA</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageProductSlaPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Etki Analizi & Ürün Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Data Product AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDataProductInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "FINANCE", "MARKETPLACE", "AI", "CRM", "OPERATIONS", "GROWTH"] as (DataProductDomain | "ALL")[]).map((dom) => (
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

      {/* Data Products Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Kayıtlı Veri Ürün Kataloğu ({filteredProducts.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredProducts.map((dp) => (
            <div
              key={dp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{dp.productName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {dp.domain} ({dp.versionTag})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Domain Steward: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{dp.ownerDomainSteward}</span></div>
                <div>Aşama (Lifecycle): <span className="font-bold text-[#D4AF37]">{dp.lifecycleStage}</span></div>
                <div>Kalite SLA: <span className="font-bold text-emerald-500">%{dp.qualitySlaPercent}</span></div>
                <div>Günlük Sorgu Hacmi: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(dp.dailyQueryVolumeCount / 1000).toFixed(1)}K req/day</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] block">✦ WedyAI Etki Analizi (Impact Analysis):</span>
                <p className="text-[#111111] dark:text-[#F5F4F0]">{dp.aiImpactAnalysisNote}</p>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Önerisi: {dp.aiRecommendationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handlePublish(dp.id, dp.productName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Send className="w-3 h-3 text-[#D4AF37]" />
                      <span>Yeni Sürümü Yayınla</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Yayın: {new Date(dp.lastPublishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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