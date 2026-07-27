'use client';

import React from 'react';
import { Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export const MobileAppCta: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-[#1D1D1F] text-white p-8 sm:p-14 rounded-[40px] border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden relative">
        
        {/* Soft Ambient Sheen */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#E6007E]/20 blur-[120px] pointer-events-none" />

        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 text-[#D4AF37] border border-white/20 rounded-full text-[11px] font-bold">
            <Smartphone className="w-3.5 h-3.5" /> WedyPlan Mobil Deneyimi
          </div>

          <h2 className="font-serif font-normal text-[36px] sm:text-[48px] leading-tight text-white">
            Düğün Komuta Merkeziniz <br />
            <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-300 to-[#D4AF37]">
              Her An Cebinizde.
            </span>
          </h2>

          <p className="text-[15px] text-slate-300 font-light leading-relaxed">
            Düğün günü canlı akış takibinden, anlık davetli RSVP bildirimlerine kadar her şeyi mobil uygulamamız üzerinden yönetin.
          </p>

          <div className="space-y-2 text-[13px] text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Düğün günü dakika dakika canlı zaman çizelgesi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Anlık e-imza bildirimleri ve bütçe güncellemeleri</span>
            </div>
          </div>

          {/* Download Badges Placeholders */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              disabled
              className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-[12px] font-bold hover:bg-white/20 transition cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> App Store (Yakında)
            </button>
            <button
              disabled
              className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-[12px] font-bold hover:bg-white/20 transition cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Google Play (Yakında)
            </button>
          </div>
        </div>

        {/* Right Phone Capsule Preview */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <div className="w-64 h-[380px] bg-gradient-to-b from-slate-800 to-black rounded-[40px] border-4 border-slate-700 p-4 shadow-2xl space-y-4 flex flex-col justify-between">
            <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto" />
            <div className="space-y-2 text-center p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold text-[#E6007E] block uppercase">Live Notification</span>
              <p className="text-[11px] text-white font-medium">15 Ağustos Düğün Akışı Başladı!</p>
            </div>
            <div className="text-center text-[10px] text-slate-500 font-mono">WedyPlan OS Mobile</div>
          </div>
        </div>

      </div>
    </section>
  );
};