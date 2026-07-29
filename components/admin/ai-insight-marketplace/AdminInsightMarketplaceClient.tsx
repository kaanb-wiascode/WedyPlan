'use client';

import React, { useState } from 'react';
import { toggleSubscribeAssetAction } from '@/lib/actions/admin-insight-marketplace';

interface AdminInsightMarketplaceClientProps {
  initialData: any;
}

export function AdminInsightMarketplaceClient({ initialData }: AdminInsightMarketplaceClientProps) {
  const [data, setData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (assetId: string) => {
    setLoading(assetId);
    const res = await toggleSubscribeAssetAction(assetId);
    if (res.success) {
      setData((prev: any) => ({
        ...prev,
        subscriptions: res.isSubscribed
          ? [...prev.subscriptions, assetId]
          : prev.subscriptions.filter((id: string) => id !== assetId)
      }));
    }
    setLoading(null);
  };

  const filteredAssets = selectedCategory === 'ALL'
    ? data.assets
    : data.assets.filter((a: any) => a.category === selectedCategory);

  return (
    <div className="space-y-8 p-8 bg-[#F9F8F6] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD8] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Phase 15 • Enterprise Analytics</span>
          <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">Enterprise Insight Marketplace</h1>
          <p className="text-sm text-[#666666] mt-1">
            Yeniden kullanılabilir panolar, raporlar, KPI şablonları ve AI tahmin modelleri kataloğu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] rounded-full text-sm font-medium hover:bg-[#333333] transition-all shadow-sm">
            + Yeni Analitik Varlık Yayınla
          </button>
        </div>
      </div>

      {/* KPI Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Yayınlanan Varlıklar</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.totalPublishedAssets}</p>
          <span className="text-xs text-[#6E7A6E] font-medium mt-1 inline-block">✓ Panolar, Raporlar, KPI'lar</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Toplam Abonelik</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">{data.stats.totalSubscribers}</p>
          <span className="text-xs text-[#C5A059] font-medium mt-1 inline-block">Aktif Şirket İçi Kullanıcılar</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Ortalama Puan</p>
          <p className="text-3xl font-serif font-bold text-[#1A1A1A] mt-2">⭐ {data.stats.avgRating}</p>
          <span className="text-xs text-[#666666] mt-1 inline-block">Kullanıcı Değerlendirmeleri</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E8DFD8] shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666]">Öne Çıkan Şablonlar</p>
          <p className="text-3xl font-serif font-bold text-[#C5A059] mt-2">{data.stats.featuredCount}</p>
          <span className="text-xs text-[#6E7A6E] font-medium mt-1 inline-block">Featured Analytics Assets</span>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex overflow-x-auto gap-3 pb-2 border-b border-[#E8DFD8]">
        {['ALL', 'REVENUE', 'VENDORS', 'COUPLES', 'MARKETING', 'OPERATIONS'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-[#666666] border border-[#E8DFD8] hover:bg-[#FAF9F5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Discovery Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredAssets.map((asset: any) => {
          const isSubscribed = data.subscriptions.includes(asset.id);
          const rec = data.recommendations.find((r: any) => r.assetId === asset.id);

          return (
            <div key={asset.id} className="bg-white rounded-2xl border border-[#E8DFD8] p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-all">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-[#F9F8F6] text-[#666666] text-[10px] font-bold rounded-full border border-[#E8DFD8]">
                    {asset.assetType}
                  </span>
                  <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1">
                    ⭐ {asset.rating} <span className="text-[10px] text-[#666666]">({asset.ratingCount})</span>
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{asset.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed line-clamp-3">{asset.description}</p>

                {rec && (
                  <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#E8DFD8] text-[11px] text-[#1A1A1A]">
                    <span className="font-bold text-[#C5A059]">✨ AI Trend Önerisi: </span>
                    <span>{rec.recommendationReason}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                <div className="text-[10px] text-[#666666]">
                  <p>Yazar: <span className="font-semibold text-[#1A1A1A]">{asset.author}</span></p>
                  <p>Sürüm: <span className="font-mono text-[#1A1A1A]">{asset.version}</span> | Aboneler: <span className="font-bold text-[#1A1A1A]">{asset.subscriberCount}</span></p>
                </div>

                <button
                  onClick={() => handleSubscribe(asset.id)}
                  disabled={loading === asset.id}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                    isSubscribed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#1A1A1A] text-white hover:bg-[#333333]'
                  }`}
                >
                  {isSubscribed ? '✓ Abone Olundu' : 'Abone Ol'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}