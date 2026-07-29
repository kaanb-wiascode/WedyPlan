"use client";

import React, { useState, useEffect } from "react";
import { HardDrive, ShieldCheck, RefreshCw, CheckCircle2, Zap, Lock, Archive, Layers, Cloud, Server, Download, Check } from "lucide-react";
import { CloudStorageEngine, CloudStorageBucketRecord, CloudStoragePlatformSummary, CloudStorageProviderClass } from "@/lib/integration/cloud-storage-engine";

export const CloudStorageCenter: React.FC = () => {
  const [buckets, setBuckets] = useState<CloudStorageBucketRecord[]>([]);
  const [summary, setSummary] = useState<CloudStoragePlatformSummary | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<CloudStorageProviderClass | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    CloudStorageEngine.getBuckets().then(setBuckets);
    CloudStorageEngine.getSummary().then(setSummary);
  }, []);

  const handleArchiveBucket = async (bucketId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await CloudStorageEngine.triggerArchiveBucket(bucketId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' depolama kovası otonom Glacier soğuk arşiv katmanına taşındı!` });
        CloudStorageEngine.getBuckets().then(setBuckets);
        CloudStorageEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Arşivleme işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredBuckets = selectedProvider === "ALL"
    ? buckets
    : buckets.filter((b) => b.providerClass === selectedProvider);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Storage Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Bulut Depolama Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Encryption: %{summary.overallEncryptionCoveragePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Amazon S3, Google Cloud, Azure Blob ve Özel S3 depolama sağlayıcıları üzerinde AES-256 şifreleme, saklama kilitleri (WORM) ve soğuk arşivleme.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Depolama</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalStoredTerabytes} TB
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kovalar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeBucketsCount} Bucket
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Tasarruf</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ${summary.monthlyStorageCostSavingsUsd} USD
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Storage Lifecycle Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Depolama Yaşam Döngüsü Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Storage AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Cloud className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiStorageInsightNote}
          </p>
        </div>
      </div>

      {/* Provider Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "AMAZON_S3", "GOOGLE_CLOUD_STORAGE", "AZURE_BLOB", "PRIVATE_S3_COMPATIBLE"] as (CloudStorageProviderClass | "ALL")[]).map((prov) => (
          <button
            key={prov}
            onClick={() => setSelectedProvider(prov)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedProvider === prov
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {prov === "ALL" ? "Tüm Sağlayıcılar" : prov.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Buckets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Depolama Kovaları ({filteredBuckets.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredBuckets.map((bkt) => (
            <div
              key={bkt.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{bkt.bucketName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {bkt.tier} ({bkt.status})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Sağlayıcı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{bkt.providerClass}</span></div>
                <div>Bölge (Region): <span className="font-bold text-[#D4AF37]">{bkt.storageRegion}</span></div>
                <div>Boyut: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(bkt.totalSizeGigabytes / 1000).toFixed(1)} TB</span></div>
                <div>Nesne Sayısı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(bkt.totalObjectsCount / 1000).toFixed(0)}K Object</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] flex justify-between items-center border border-black/5 dark:border-white/5">
                <span>Şifreleme: <strong className="text-emerald-500">{bkt.encryptionMethod}</strong></span>
                <span>Saklama Kilidi: <strong className="text-[#D4AF37]">{bkt.retentionDays} Gün (WORM)</strong></span>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tasarruf İpucu: {bkt.aiOptimizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                {bkt.tier === "HOT_STANDARD" ? (
                  <button
                    onClick={() => handleArchiveBucket(bkt.id, bkt.bucketName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Archive className="w-3 h-3 text-[#D4AF37]" />
                        <span>Soğuk Katmana Taşı (Glacier Tier)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Arşivlenmiş Katman (Glacier Active)
                  </span>
                )}

                <span className="font-mono text-[#86868B]">
                  Son Sync: {new Date(bkt.lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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