'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight, 
  Sparkles, 
  Target,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function PremiumVendorAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">Pazar & Rekabet Analizi</h1>
          <p className="text-[15px] text-[#666666] mt-1">Şehrinizdeki ve kategorinizdeki rakiplerinize karşı anlık performansınız.</p>
        </div>

        {/* Time Selector */}
        <div className="inline-flex bg-[#F8F8F7] p-1 rounded-[14px] border border-[rgba(0,0,0,0.04)]">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 h-[36px] rounded-[10px] text-[13px] font-medium transition-all ${
                timeRange === range 
                  ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' 
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              {range === '7d' ? 'Son 7 Gün' : range === '30d' ? 'Son 30 Gün' : 'Son 3 Ay'}
            </button>
          ))}
        </div>
      </header>

      {/* Hero Performance Card (Dark Vercel Style) */}
      <div className="bg-[#111111] p-8 md:p-10 rounded-[32px] text-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C5CFF] opacity-20 blur-[140px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] font-medium text-white/80">
            <Award className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span>İstanbul / Kır Bahçesi Kategorisi</span>
          </div>
          <div className="text-[56px] font-medium tracking-tight leading-none pt-2">%88</div>
          <p className="text-[14px] text-[#1DB954] font-medium flex items-center gap-1.5 pt-1">
            <ArrowUpRight className="w-4 h-4" /> Bölge ortalamasından %24 daha fazla talep alıyorsunuz.
          </p>
        </div>

        <div className="relative z-10 w-full lg:w-auto grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[20px]">
            <span className="text-[12px] font-medium text-white/60 block mb-1">Pazar Sıralamanız</span>
            <div className="text-[28px] font-medium tracking-tight">#2 <span className="text-[14px] text-white/40 font-normal">/ 54 Firma</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[20px]">
            <span className="text-[12px] font-medium text-white/60 block mb-1">Görünürlük Payı</span>
            <div className="text-[28px] font-medium tracking-tight">%34</div>
          </div>
        </div>
      </div>

      {/* Benchmark Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Ortalama Başlangıç Fiyatı', yourVal: '150.000 TL', marketVal: '135.000 TL', status: 'Pazar Ortalamasında' },
          { title: 'Teklif Dönüşüm Süresi', yourVal: '14 Dakika', marketVal: '4.2 Saat', status: '%85 Daha Hızlı', positive: true },
          { title: 'Görüntülenme / Teklif Oranı', yourVal: '%18.2', marketVal: '%11.4', status: 'Yüksek Performans', positive: true },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
            <span className="text-[13px] font-medium text-[#666666]">{item.title}</span>
            <div className="text-[28px] font-medium tracking-tight text-[#111111]">{item.yourVal}</div>
            <div className="pt-3 border-t border-[rgba(0,0,0,0.04)] flex justify-between items-center text-[13px]">
              <span className="text-[#999999]">Pazar Ort: {item.marketVal}</span>
              <span className={`font-medium ${item.positive ? 'text-[#1DB954]' : 'text-[#666666]'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Competitor Insights */}
      <div className="bg-[#F8F8F7] rounded-[28px] border border-[rgba(0,0,0,0.04)] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7C5CFF]" />
            <h2 className="text-[18px] font-medium text-[#111111]">Yapay Zeka Rekabet Stratejileri</h2>
          </div>
          <span className="text-[13px] text-[#999999]">Güncelleme: Bugün 14:00</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-[20px] border border-[rgba(0,0,0,0.04)] space-y-2">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[#111111]">
              <Target className="w-4 h-4 text-[#7C5CFF]" />
              <span>Hafta İçi Fiyatlandırması İncelemesi</span>
            </div>
            <p className="text-[13px] text-[#666666] leading-relaxed">
              Bölgenizdeki 3 rakip firma Salı-Perşembe düğünlerinde %15 indirimli paket yayınladı. Hafta içi doluluğunuzu artırmak için benzer bir paket tanımlayabilirsiniz.
            </p>
          </div>

          <div className="p-5 bg-white rounded-[20px] border border-[rgba(0,0,0,0.04)] space-y-2">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[#111111]">
              <Eye className="w-4 h-4 text-[#1DB954]" />
              <span>Fotoğraf Galerisi Avantajı</span>
            </div>
            <p className="text-[13px] text-[#666666] leading-relaxed">
              Profilinizdeki yüksek çözünürlüklü görseller rakiplerinize göre %40 daha fazla inceleniyor. Gece aydınlatması çekimlerini ekleyerek bu farkı artırabilirsiniz.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}