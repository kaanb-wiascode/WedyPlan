'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Store, ArrowRight, Sparkles } from 'lucide-react';

export const JourneySelector: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block">Deneyiminizi Seçin</span>
        <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#1D1D1F]">WedyPlan Ekosistemine Katılın</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Couple Journey Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white/50 backdrop-blur-2xl border border-white p-8 sm:p-10 rounded-[36px] shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-[#E6007E] flex items-center justify-center">
              <Heart className="w-6 h-6 fill-[#E6007E]" />
            </div>
            <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-wider block">Evlenen Çiftler İçin</span>
            <h3 className="font-serif font-bold text-[28px] text-[#1D1D1F]">Düğününüzü Huzur İçinde Planlayın</h3>
            <p className="text-[14px] text-[#6E6E73] font-light leading-relaxed">
              Bütçe cüzdanından LCV davetli takibine, kişisel düğün web sitenizden WedyAI asistanına kadar tüm süreç elinizin altında.
            </p>
          </div>

          <Link
            href="/cift"
            className="bg-[#1D1D1F] hover:bg-black text-white font-bold text-[13px] py-4 rounded-full transition flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E]"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Çift Moduna Geçin (Ücretsiz)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Vendor Journey Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white/50 backdrop-blur-2xl border border-white p-8 sm:p-10 rounded-[36px] shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">İşletmeler & Profesyoneller</span>
            <h3 className="font-serif font-bold text-[28px] text-[#1D1D1F]">Düğün İşletmenizi Büyütün (WOS)</h3>
            <p className="text-[14px] text-[#6E6E73] font-light leading-relaxed">
              Çakışmasız saatlik takvim, e-imza resmi sözleşmeler ve WedyAI nitelikli müşteri talepleriyle cironuzu artırın.
            </p>
          </div>

          <Link
            href="/firma-katil"
            className="bg-white hover:bg-slate-50 text-[#1D1D1F] font-bold text-[13px] py-4 rounded-full border border-slate-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <span>Firma Başvurusu Yapın</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};