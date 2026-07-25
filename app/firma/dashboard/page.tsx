'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Sparkles, TrendingUp, Users, MessageSquare, Clock, 
  CheckCircle2, DollarSign, Calendar, ChevronRight, PhoneCall, ArrowUpRight, ShieldCheck, Bell
} from 'lucide-react';

export default function VendorDashboardPage() {
  const [vendorInfo] = useState({
    name: 'Beykoz Secret Garden & Event',
    type: 'Kır Düğünü Mekanı',
    rating: 4.9,
    plan: 'VIP Enterprise Partner'
  });

  const [leads, setLeads] = useState([
    {
      id: '1',
      coupleName: 'Selin & Kaan',
      weddingDate: '15 Ağustos 2026',
      guestCount: 300,
      budget: '350.000 TL',
      aiProposalStatus: 'AI Teklifi Hazır',
      status: 'Beklemede',
      requestedAt: '10 dakika önce'
    },
    {
      id: '2',
      coupleName: 'Ceren & Berk',
      weddingDate: '20 Eylül 2026',
      guestCount: 200,
      budget: '250.000 TL',
      aiProposalStatus: 'Gönderildi',
      status: 'İncelendi',
      requestedAt: '2 saat önce'
    },
    {
      id: '3',
      coupleName: 'Elif & Murat',
      weddingDate: '04 Temmuz 2026',
      guestCount: 500,
      budget: '600.000 TL',
      aiProposalStatus: 'Sözleşme Aşaması',
      status: 'Onaylandı',
      requestedAt: 'Dün'
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-sans selection:bg-[#D4AF37] selection:text-black pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-[#D4AF37] text-black font-bold px-2 py-0.5 rounded-full">B2B Portal</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[12px] text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{vendorInfo.name}</span>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors relative">
              <Bell className="w-4 h-4 text-white/80" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Üst Karşılama */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#D4AF37]/30 rounded-full text-[11px] font-medium text-[#D4AF37] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{vendorInfo.plan}</span>
            </div>
            <h1 className="text-[32px] md:text-[38px] font-serif font-normal">
              Firma Kontrol Paneli
            </h1>
          </div>

          <Link href="/firma/ai-asistan">
            <button className="px-5 py-3 bg-[#D4AF37] hover:bg-[#b8952b] text-black font-semibold text-[13px] rounded-full transition-all flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>WedyAI Otomatik Teklif Motoru</span>
            </button>
          </Link>
        </div>

        {/* 📊 KPI İSTATİSTİK KARTLARI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#181818] border border-white/10 rounded-[24px] p-6 space-y-2">
            <div className="flex justify-between items-center text-white/50 text-[12px]">
              <span>Gelen Teklif Talebi</span>
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-[32px] font-bold font-mono text-white">48</div>
            <span className="text-[11px] text-emerald-400 font-medium block">↑ Bu ay %24 artış</span>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-[24px] p-6 space-y-2">
            <div className="flex justify-between items-center text-white/50 text-[12px]">
              <span>WedyAI Otomatik Yanıt</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-[32px] font-bold font-mono text-white">42</div>
            <span className="text-[11px] text-white/50 block">%88 Otomasyon Başarısı</span>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-[24px] p-6 space-y-2">
            <div className="flex justify-between items-center text-white/50 text-[12px]">
              <span>Onaylanan Düğünler</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-[32px] font-bold font-mono text-white">12</div>
            <span className="text-[11px] text-white/50 block">2026 Sezonu Kesinleşen</span>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-[24px] p-6 space-y-2">
            <div className="flex justify-between items-center text-white/50 text-[12px]">
              <span>Tahmini Ciro Potansiyeli</span>
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-[32px] font-bold font-mono text-[#D4AF37]">3.8M ₺</div>
            <span className="text-[11px] text-[#D4AF37] font-medium block">Aktif Teklif Değeri</span>
          </div>
        </div>

        {/* 📋 GELEN TEKLİF TALEPLERİ (LEADS) */}
        <div className="bg-[#181818] border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-[22px] font-medium text-white">Gelen Çift Talepleri (Leads)</h3>
              <p className="text-[12px] text-white/50">WedyAI tarafından filtrelenip mekanınıza yönlendirilen anlık talepler.</p>
            </div>
            <span className="text-[11px] bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full font-mono font-bold">
              Canlı Akış
            </span>
          </div>

          <div className="space-y-4">
            {leads.map((l) => (
              <div 
                key={l.id}
                className="p-5 bg-white/5 border border-white/10 rounded-[20px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-[16px] text-white">{l.coupleName}</h4>
                    <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-white/70">{l.requestedAt}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/60 pt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {l.weddingDate}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {l.guestCount} Kişi</span>
                    <span className="flex items-center gap-1 font-mono text-white"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Bütçe: {l.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
                    ✨ {l.aiProposalStatus}
                  </span>
                  <Link href="/firma/ai-asistan">
                    <button className="px-4 py-2 bg-white text-black font-semibold text-[12px] rounded-full hover:bg-[#D4AF37] transition-all">
                      Teklifi İncele
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

    </div>
  );
}