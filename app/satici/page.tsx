'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWeddingOS } from '@/store/useWeddingOS';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Eye, 
  Zap,
  Phone,
  BarChart3,
  CalendarCheck
} from 'lucide-react';

export default function PremiumVendorDashboardPage() {
  const { venueDealStatus } = useWeddingOS();
  const [pipelineFilter, setPipelineFilter] = useState('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header: Business Status Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(0,0,0,0.06)]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-medium tracking-tight text-[#111111]">
              Bosphorus Palace Kır Bahçesi
            </h1>
            <span className="px-3 py-1 bg-[#1DB954]/10 text-[#1DB954] text-[12px] font-medium rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span> Canlı Yayın
            </span>
          </div>
          <p className="text-[14px] text-[#666666] mt-1">
            25 Temmuz 2026 • İstanbul / Beykoz • Gold İş Ortaklığı
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/satici/teklif-hazirla" 
            className="h-[44px] px-5 bg-[#111111] hover:bg-[#333333] text-white rounded-[14px] text-[13px] font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" /> Hızlı Teklif Oluştur
          </Link>
        </div>
      </header>

      {/* STRIPE STYLE METRICS (Son 30 Gün & Performans Özeti) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Revenue */}
        <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-medium text-[#666666]">Son 30 Gün Ciro</span>
            <span className="text-[12px] font-medium text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +%18.4
            </span>
          </div>
          <div>
            <div className="text-[32px] font-medium tracking-tight text-[#111111]">
              {venueDealStatus === 'ONAYLANDI' ? '450.000 ₺' : '300.000 ₺'}
            </div>
            <span className="text-[12px] text-[#999999] mt-1 block">Geçen ay: 254.000 ₺</span>
          </div>
        </div>

        {/* Metric 2: Calendar Occupancy Rate */}
        <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-medium text-[#666666]">Takvim Doluluk Oranı</span>
            <span className="text-[12px] font-medium text-[#7C5CFF] bg-[#7C5CFF]/10 px-2 py-0.5 rounded-full">
              2026 Sezonu
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-medium tracking-tight text-[#111111]">%82</span>
              <span className="text-[13px] text-[#666666]">Doluluk</span>
            </div>
            <div className="w-full h-[4px] bg-[#F8F8F7] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#7C5CFF] rounded-full w-[82%]"></div>
            </div>
            <span className="text-[12px] text-[#999999] mt-2 block">28 / 34 Hafta Sonu Dolu</span>
          </div>
        </div>

        {/* Metric 3: Profile Performance */}
        <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-medium text-[#666666]">Profil Görüntülenme</span>
            <Eye className="w-4 h-4 text-[#999999]" />
          </div>
          <div>
            <div className="text-[32px] font-medium tracking-tight text-[#111111]">4.820</div>
            <span className="text-[12px] text-[#1DB954] font-medium mt-1 block">
              Dönüşüm Oranı: %18.2
            </span>
          </div>
        </div>

        {/* Metric 4: Pending Payments */}
        <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[13px] font-medium text-[#666666]">Bekleyen Tahsilatlar</span>
            <CreditCard className="w-4 h-4 text-[#FF453A]" />
          </div>
          <div>
            <div className="text-[32px] font-medium tracking-tight text-[#FF453A]">130.000 ₺</div>
            <span className="text-[12px] text-[#666666] mt-1 block">3 Müşteri Vadesi Yaklaştı</span>
          </div>
        </div>

      </section>

      {/* CRM SALES PIPELINE (Satış Hunisi) */}
      <section className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[18px] font-medium text-[#111111]">Satış Hunisi (Pipeline)</h2>
            <p className="text-[13px] text-[#666666] mt-0.5">Aktif müşteri görüşmelerinizin aşama bazlı dağılımı.</p>
          </div>
          <Link href="/satici/talepler" className="text-[13px] font-medium text-[#7C5CFF] hover:underline flex items-center gap-1">
            Tüm CRM Talepleri &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { stage: 'Gelen Talep', count: '8 Çift', price: '1.2M ₺', color: 'border-l-4 border-l-[#999999]' },
            { stage: 'Teklif Gönderildi', count: '4 Çift', price: '680K ₺', color: 'border-l-4 border-l-[#7C5CFF]' },
            { stage: 'Sözleşme Bekliyor', count: venueDealStatus === 'ONAYLANDI' ? '1 Çift' : '2 Çift', price: '300K ₺', color: 'border-l-4 border-l-[#F5A623]' },
            { stage: 'Kapora Alındı', count: '14 Çift', price: '2.1M ₺', color: 'border-l-4 border-l-[#1DB954]' },
            { stage: 'Düğün Tamamlandı', count: '22 Çift', price: '3.4M ₺', color: 'border-l-4 border-l-[#111111]' },
          ].map((item, i) => (
            <div key={i} className={`bg-[#F8F8F7] p-4 rounded-[18px] ${item.color} space-y-1`}>
              <span className="text-[12px] font-medium text-[#666666] block">{item.stage}</span>
              <div className="text-[20px] font-medium text-[#111111]">{item.count}</div>
              <span className="text-[11px] text-[#999999] font-mono block">{item.price} Hacim</span>
            </div>
          ))}
        </div>
      </section>

      {/* CORE OPERATIONS GRID (Bugünkü Talepler, Takvim & AI Önerileri) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Today's Requests & Live Messages (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Bugünkü Talepler & Yeni Müşteriler */}
          <div className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[18px] font-medium text-[#111111] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#7C5CFF]" />
                Bugünkü Talepler & Mesajlar
              </h2>
              <span className="px-2.5 py-1 bg-[#7C5CFF]/10 text-[#7C5CFF] text-[11px] font-medium rounded-full">
                3 Bekleyen Yanıt
              </span>
            </div>

            <div className="space-y-3">
              
              {/* Live OS Contract Alert */}
              {venueDealStatus === 'ONAYLANDI' && (
                <div className="p-4 rounded-[20px] bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1DB954] shrink-0" />
                    <div>
                      <h4 className="text-[14px] font-medium text-[#111111]">Selin & Caner Dijital Sözleşmeyi İmzalandı!</h4>
                      <p className="text-[12px] text-[#666666]">150.000 TL anlaşma bedeli alacaklarınıza işlendi.</p>
                    </div>
                  </div>
                  <Link href="/satici/finans" className="h-[36px] px-3.5 bg-[#1DB954] text-white text-[12px] font-medium rounded-[10px] flex items-center gap-1 shrink-0">
                    Finansa Git
                  </Link>
                </div>
              )}

              {[
                { name: 'Merve & Kaan', date: '22.09.2026', phone: '0532 987 65 43', text: 'Merhaba, 350 kişi yemekli düzen menü tadımı şartlarınızı öğrenebilir miyiz?', status: 'Yeni Talep', time: '12 Dk Önce' },
                { name: 'Gamze & Onur', date: '12.10.2026', phone: '0535 111 22 33', text: 'Özel fiyat teklifinizi inceledik, Cumartesi mekan gezisi için randevu istiyoruz.', status: 'Görüşme Bekliyor', time: '1 Saat Önce' },
              ].map((req, i) => (
                <div key={i} className="p-5 rounded-[20px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)] hover:border-[rgba(0,0,0,0.08)] transition-all space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[16px] font-medium text-[#111111]">{req.name}</h3>
                      <p className="text-[12px] text-[#666666] mt-0.5">Düğün Tarihi: {req.date} • {req.phone}</p>
                    </div>
                    <span className="text-[11px] font-medium text-[#999999]">{req.time}</span>
                  </div>

                  <p className="text-[13px] text-[#666666] italic bg-white p-3 rounded-[12px] border border-[rgba(0,0,0,0.04)]">
                    "{req.text}"
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[12px] font-medium text-[#7C5CFF]">{req.status}</span>
                    <button className="h-[36px] px-4 bg-[#1DB954] hover:bg-[#1AA34A] text-white text-[12px] font-medium rounded-[10px] transition-colors inline-flex items-center gap-1.5 shadow-sm">
                      <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp'tan Yanıtla
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aktif Müşteriler & Rezervasyonlar */}
          <div className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-[18px] font-medium text-[#111111]">Yaklaşan Düğün Rezervasyonları</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.04)] text-[#999999]">
                    <th className="pb-3 font-medium">Çift</th>
                    <th className="pb-3 font-medium">Tarih</th>
                    <th className="pb-3 font-medium">Paket</th>
                    <th className="pb-3 font-medium text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(0,0,0,0.04)]">
                  {[
                    { name: 'Selin & Caner', date: '15.08.2026', pack: '300 Kişi Yemekli', status: 'Onaylandı' },
                    { name: 'Ayşe & Burak', date: '22.08.2026', pack: '500 Kişi Kokteyl', status: 'Onaylandı' },
                  ].map((res, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium text-[#111111]">{res.name}</td>
                      <td className="py-3 text-[#666666]">{res.date}</td>
                      <td className="py-3 text-[#666666]">{res.pack}</td>
                      <td className="py-3 text-right">
                        <span className="text-[11px] font-medium text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded-full">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: AI Suggestions & Calendar Occupancy (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI İş Ortaklığı Önerileri (Apple Intelligence Vibe) */}
          <div className="bg-[#111111] text-white p-6 md:p-8 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7C5CFF] opacity-30 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#7C5CFF]">
                <Sparkles className="w-5 h-5" />
                <span className="text-[13px] font-medium tracking-wider uppercase">WedyAI İş Danışmanı</span>
              </div>
              <span className="text-[11px] text-white/50">Canlı Analiz</span>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-[18px] border border-white/10 space-y-2">
                <h4 className="text-[14px] font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#F5A623]" /> Eylül Ayı Doluluk Tavsiyesi
                </h4>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Bölgenizdeki kır bahçelerinde Eylül Cumartesi günleri %90 doluluğa ulaştı. Takviminizde boş kalan 19 Eylül tarihi için %10 Erken Kapora İndirimi tanımlayarak 4 kat daha fazla talep alabilirsiniz.
                </p>
                <button className="text-[12px] font-medium text-[#7C5CFF] hover:underline pt-1 block">
                  İndirimi Otomatik Tanımla &rarr;
                </button>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-[18px] border border-white/10 space-y-2">
                <h4 className="text-[14px] font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1DB954]" /> Fiyatlandırma Avantajı
                </h4>
                <p className="text-[12px] text-white/70 leading-relaxed">
                  Başlangıç menü fiyatınız (1.200 TL/Kişi) Beykoz bölge ortalamasıyla birebir uyumlu. Dönüşüm oranınız rakiplere göre %18 daha yüksek.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Takvim & Sezon Takibi */}
          <div className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] font-medium text-[#111111] flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#111111]" />
                Ağustos 2026 Sezon Takvimi
              </h3>
              <span className="text-[12px] font-medium text-[#7C5CFF]">8/8 Cumartesi Dolu</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[12px] pt-2">
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => (
                <span key={i} className="text-[#999999] font-medium pb-1">{day}</span>
              ))}
              
              {/* Simulated Calendar Grid */}
              {Array.from({ length: 31 }).map((_, i) => {
                const dayNum = i + 1;
                const isWeekend = dayNum % 7 === 6 || dayNum % 7 === 0;
                const isBooked = isWeekend && dayNum < 24;

                return (
                  <div 
                    key={i} 
                    className={`h-[36px] rounded-[10px] flex flex-col items-center justify-center text-[12px] font-medium transition-all ${
                      isBooked ? 'bg-[#111111] text-white shadow-sm' : 
                      dayNum === 15 ? 'bg-[#7C5CFF] text-white font-bold ring-4 ring-[#7C5CFF]/20' : 
                      'bg-[#F8F8F7] text-[#666666]'
                    }`}
                  >
                    <span>{dayNum}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.04)] text-[11px] text-[#666666]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]"></span> Dolu (Düğün Var)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]"></span> Sözleşme Bekliyor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F8F8F7]"></span> Boş
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}