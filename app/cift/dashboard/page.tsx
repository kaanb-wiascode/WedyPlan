'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  Wallet, 
  CreditCard, 
  Users, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Image as ImageIcon,
  MoreHorizontal,
  Bell
} from 'lucide-react';

export default function PremiumCoupleDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Topbar / Nav */}
      <nav className="sticky top-0 z-50 bg-[#F8F8F7]/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.04)]">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-medium tracking-tight">WedyPlan.</span>
            <span className="text-[11px] font-medium text-[#666666] uppercase tracking-widest ml-2 border-l border-[rgba(0,0,0,0.1)] pl-3">
              Control Center
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-full bg-white border border-[rgba(0,0,0,0.06)] flex items-center justify-center text-[#111111] hover:bg-[#F0F0EF] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF453A] rounded-full border border-white"></span>
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-full text-[13px] font-medium text-[#111111]">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full"></div>
              <span>Selin & Caner</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Bento Grid */}
      <main className="max-w-[1400px] mx-auto px-6 pt-10">
        
        <header className="mb-10">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-tight text-[#111111]">
            Günaydın Selin, <br className="md:hidden" /> her şey kontrol altında.
          </h1>
        </header>

        {/* BENTO BOX LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-min">
          
          {/* 1. Countdown & Timeline (Span 2) */}
          <Link href="/dugun-akisi" className="xl:col-span-2 bg-[#111111] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.08)] block hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C5CFF] opacity-30 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] font-medium backdrop-blur-md">
                  <CalendarDays className="w-3.5 h-3.5" /> 15 Ağustos 2026
                </span>
                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </div>
              
              <div>
                <span className="text-[14px] text-white/60 font-medium block mb-2">Büyük Güne Kaldı</span>
                <div className="text-[56px] md:text-[72px] font-medium tracking-tight leading-none mb-4">
                  234 <span className="text-[24px] text-white/50 font-normal">gün</span>
                </div>
                <div className="w-full h-[4px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[65%]"></div>
                </div>
                <p className="text-[13px] text-white/60 mt-3">Zaman çizelgesinde (Timeline) tam planda ilerliyorsunuz.</p>
              </div>
            </div>
          </Link>

          {/* 2. Budget & Payments */}
          <Link href="/butce-hesaplayici" className="bg-white rounded-[32px] p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-[rgba(0,0,0,0.08)] transition-all block flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111]">
                <Wallet className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#999999] group-hover:text-[#111111] transition-colors" />
            </div>
            
            <div>
              <span className="text-[13px] font-medium text-[#666666] block mb-1">Harcanan Bütçe</span>
              <div className="text-[32px] font-medium tracking-tight text-[#111111] mb-2">184.500 ₺</div>
              <div className="flex items-center gap-2 text-[13px] font-medium">
                <span className="text-[#1DB954]">Limit: 350.000 ₺</span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="text-[#666666]">%52</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#111111] font-medium flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-[#FF453A]" /> Yaklaşan Ödeme</span>
                <span className="text-[#666666]">Yarın (Mekan)</span>
              </div>
            </div>
          </Link>

          {/* 3. Today's Tasks */}
          <Link href="/kontrol-listesi" className="bg-white rounded-[32px] p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-[rgba(0,0,0,0.08)] transition-all block xl:row-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[16px] font-medium text-[#111111]">Günün Görevleri</h3>
              <ArrowUpRight className="w-5 h-5 text-[#999999] group-hover:text-[#111111] transition-colors" />
            </div>
            
            <div className="space-y-4 flex-1">
              {[
                { title: 'Fotoğrafçı ile Zoom toplantısı', time: '14:30', done: true },
                { title: 'Davetiye taslaklarını onayla', time: 'Bugün', done: false },
                { title: 'Balayı oteli kaporasını yatır', time: 'Bugün', done: false },
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 group/task">
                  <button className="mt-0.5 shrink-0">
                    {task.done ? <CheckCircle2 className="w-5 h-5 text-[#7C5CFF]" /> : <div className="w-5 h-5 rounded-full border-2 border-[#CCCCCC] group-hover/task:border-[#999999] transition-colors" />}
                  </button>
                  <div>
                    <p className={`text-[14px] font-medium ${task.done ? 'text-[#999999] line-through decoration-[rgba(0,0,0,0.2)]' : 'text-[#111111]'}`}>{task.title}</p>
                    <p className="text-[12px] text-[#999999] mt-0.5">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)] text-[13px] font-medium text-[#7C5CFF]">
              Tüm 42 görevi gör &rarr;
            </div>
          </Link>

          {/* 4. Vendors, Requests & Contracts (OS Automation Hub) */}
          <Link href="/satici/talepler" className="xl:col-span-2 bg-white rounded-[32px] p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-[rgba(0,0,0,0.08)] transition-all block flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-medium text-[#111111] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#111111]" /> Firma & Sözleşme Durumu
              </h3>
              <ArrowUpRight className="w-5 h-5 text-[#999999] group-hover:text-[#111111] transition-colors" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-[#F8F8F7] rounded-[20px]">
                <span className="text-[12px] font-medium text-[#666666] block mb-1">Bekleyen Teklif</span>
                <span className="text-[24px] font-medium text-[#111111]">2</span>
              </div>
              <div className="p-4 bg-[#7C5CFF]/5 border border-[#7C5CFF]/10 rounded-[20px]">
                <span className="text-[12px] font-medium text-[#7C5CFF] block mb-1">İmza Bekleyen</span>
                <span className="text-[24px] font-medium text-[#7C5CFF]">1</span>
              </div>
              <div className="p-4 bg-[#1DB954]/5 border border-[#1DB954]/10 rounded-[20px]">
                <span className="text-[12px] font-medium text-[#1DB954] block mb-1">Onaylı Sözleşme</span>
                <span className="text-[24px] font-medium text-[#1DB954]">4</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF453A] animate-pulse"></span>
                <span className="text-[#111111] font-medium">Bosphorus Palace'tan yeni teklif var.</span>
              </div>
              <span className="text-[#666666]">14 dk önce</span>
            </div>
          </Link>

          {/* 5. Guest Summary & LCV */}
          <Link href="/davetli-listesi" className="bg-white rounded-[32px] p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-[rgba(0,0,0,0.08)] transition-all block flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111]">
                <Users className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#999999] group-hover:text-[#111111] transition-colors" />
            </div>
            
            <div>
              <span className="text-[13px] font-medium text-[#666666] block mb-1">Kesinleşen Davetli</span>
              <div className="text-[32px] font-medium tracking-tight text-[#111111] mb-2">182 <span className="text-[16px] text-[#999999] font-normal">/ 300</span></div>
              <div className="w-full h-[4px] bg-[#F8F8F7] rounded-full overflow-hidden">
                <div className="h-full bg-[#1DB954] rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.04)] flex justify-between text-[13px]">
              <span className="text-[#666666]">Yanıt bekleyen: <strong className="text-[#111111]">118</strong></span>
            </div>
          </Link>

          {/* 6. AI Assistant (The OS Brain) */}
          <Link href="/ai-asistan" className="xl:col-span-2 bg-[#7C5CFF] rounded-[32px] p-8 text-white relative overflow-hidden group shadow-[0_10px_30px_rgba(124,92,255,0.2)] block flex items-center justify-between transition-transform hover:scale-[1.02] duration-300">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[18px] font-medium mb-1">WedyAI Asistan</h3>
                <p className="text-[14px] text-white/80">"Bütçenize uygun 3 yeni fotoğrafçı buldum, incelemek ister misin?"</p>
              </div>
            </div>
            <div className="hidden sm:flex relative z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center group-hover:bg-white transition-colors">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#7C5CFF]" />
            </div>
          </Link>

          {/* 7. Inspiration Board */}
          <Link href="/ilham-panosu" className="xl:col-span-2 bg-white rounded-[32px] p-2 border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-[rgba(0,0,0,0.08)] transition-all block overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none rounded-[30px]"></div>
            
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
              <div>
                <h3 className="text-[18px] font-medium text-white mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> İlham Panosu
                </h3>
                <p className="text-[13px] text-white/80">Kaydedilen 42 görsel</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </div>

            <div className="grid grid-cols-3 gap-2 h-[140px] md:h-full">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-[24px]" />
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-[24px]" />
              <img src="https://images.unsplash.com/photo-1545232979-fbf4d284f32d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-[24px]" />
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}