'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Sparkles, TrendingUp, Users, MessageSquare, Clock, 
  CheckCircle2, DollarSign, Calendar, ShieldCheck, Bell, ChevronRight
} from 'lucide-react';

export default function VendorDashboardGlassPage() {
  const [vendorInfo] = useState({
    name: 'Beykoz Secret Garden & Event',
    plan: 'VIP Enterprise Partner'
  });

  const [leads] = useState([
    { id: '1', coupleName: 'Selin & Kaan', weddingDate: '15 Ağustos 2026', guestCount: 300, budget: '350.000 TL', aiProposalStatus: 'AI Teklifi Hazır', requestedAt: '10 dk önce' },
    { id: '2', coupleName: 'Ceren & Berk', weddingDate: '20 Eylül 2026', guestCount: 200, budget: '250.000 TL', aiProposalStatus: 'Gönderildi', requestedAt: '2 saat önce' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-[#F1F3F6] to-[#E9ECF0] text-[#1D1D1F] font-sans pb-20">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-3xl border-b border-white/60">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1D1D1F]">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-white/60 border border-white text-[#1D1D1F] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">B2B Glass Portal</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/40 border border-white/80 rounded-full text-[12px] text-[#1D1D1F] font-medium backdrop-blur-xl">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{vendorInfo.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
              <Sparkles className="w-3.5 h-3.5" /> {vendorInfo.plan}
            </span>
            <h1 className="text-[32px] md:text-[38px] font-serif font-normal text-[#1D1D1F]">
              Firma Kontrol Paneli
            </h1>
          </div>

          <Link href="/firma/ai-asistan" className="glass-btn-gold px-5 py-3 rounded-full text-[13px] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>WedyAI Otomatik Teklif Motoru</span>
          </Link>
        </div>

        {/* KPI İstatistik Cam Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-[28px] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block">Gelen Teklif Talebi</span>
            <div className="text-[32px] font-bold font-mono text-[#1D1D1F]">48</div>
            <span className="text-[11px] text-emerald-600 font-medium block">↑ Bu ay %24 artış</span>
          </div>

          <div className="glass-card p-6 rounded-[28px] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block">WedyAI Otomatik Yanıt</span>
            <div className="text-[32px] font-bold font-mono text-[#1D1D1F]">42</div>
            <span className="text-[11px] text-[#6E6E73] block">%88 Otomasyon Başarısı</span>
          </div>

          <div className="glass-card p-6 rounded-[28px] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block">Onaylanan Düğünler</span>
            <div className="text-[32px] font-bold font-mono text-[#1D1D1F]">12</div>
            <span className="text-[11px] text-[#6E6E73] block">2026 Sezonu Kesinleşen</span>
          </div>

          <div className="glass-card p-6 rounded-[28px] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block">Aktif Teklif Değeri</span>
            <div className="text-[32px] font-bold font-mono text-[#D4AF37]">3.8M ₺</div>
            <span className="text-[11px] text-[#D4AF37] font-medium block">Tahmini Ciro</span>
          </div>
        </div>

        {/* Talepler Listesi */}
        <div className="glass-card p-6 md:p-8 rounded-[36px] space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <h3 className="font-serif text-[22px] font-medium text-[#1D1D1F]">Gelen Çift Talepleri (Leads)</h3>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Canlı Akış Active
            </span>
          </div>

          <div className="space-y-4">
            {leads.map(l => (
              <div key={l.id} className="p-5 bg-white/50 backdrop-blur-xl border border-white/80 rounded-[24px] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-[16px] text-[#1D1D1F]">{l.coupleName}</h4>
                    <span className="text-[11px] bg-white/70 px-2.5 py-0.5 rounded-full text-[#6E6E73]">{l.requestedAt}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-[#6E6E73] pt-1">
                    <span>{l.weddingDate}</span> • <span>{l.guestCount} Kişi</span> • <span className="font-bold text-[#1D1D1F]">Bütçe: {l.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono bg-[#D4AF37]/15 text-[#D4AF37] px-3 py-1.5 rounded-full border border-[#D4AF37]/30 font-bold">
                    ✨ {l.aiProposalStatus}
                  </span>
                  <button className="glass-btn-primary px-4 py-2 rounded-full text-[12px]">
                    Teklifi İncele
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}