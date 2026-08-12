'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Heart, Target, Sparkles, ShieldCheck, Users, Globe } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white">
      <PublicNavbar />

      <main className="pt-16 pb-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Sayfa Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0071e3] font-bold tracking-widest text-sm uppercase mb-3 block">Biz Kimiz?</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Aşkın ve Teknolojinin Buluştuğu Yer</h1>
          <p className="text-lg text-gray-600 font-light">
            WedyPlan olarak, geleneksel düğün planlama süreçlerini yapay zeka ve modern teknolojiyle baştan yaratıyoruz. Çiftlerin en mutlu gününü stresten uzak, mükemmel bir deneyime dönüştürüyoruz.
          </p>
        </div>

        {/* Bento Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Vizyon Kartı (Büyük) */}
          <GlassCard className="col-span-1 md:col-span-8 p-8 md:p-12 border-white/60 bg-gradient-to-br from-white/80 to-white/40" hoverEffect>
            <div className="p-4 bg-pink-100 rounded-2xl w-fit mb-6">
              <Sparkles className="w-8 h-8 text-[#0071e3]" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Vizyonumuz</h2>
            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Düğün endüstrisini küresel ölçekte dijitalleştirerek, çiftlerin ve hizmet veren firmaların kusursuz bir uyum içinde çalıştığı lider pazar yeri olmak. Yapay zeka destekli akıllı algoritmalarımızla her detayın düşünüldüğü, hatasız ve keyifli bir organizasyon süreci sağlamayı hedefliyoruz.
            </p>
          </GlassCard>

          {/* İstatistik Kartı */}
          <GlassCard className="col-span-1 md:col-span-4 p-8 md:p-12 border-white/60 bg-gradient-to-br from-[#1D1D1F] to-gray-800 text-white" hoverEffect>
            <div className="flex flex-col h-full justify-center space-y-8">
              <div>
                <span className="text-4xl font-black text-[#D4AF37]">+10.000</span>
                <p className="text-gray-300 mt-1 font-medium">Mutlu Çift</p>
              </div>
              <div className="h-px bg-white/20 w-full" />
              <div>
                <span className="text-4xl font-black text-[#D4AF37]">+5.000</span>
                <p className="text-gray-300 mt-1 font-medium">Onaylı Firma</p>
              </div>
            </div>
          </GlassCard>

          {/* Değerler Kartları */}
          <GlassCard className="col-span-1 md:col-span-4 p-8 border-white/60" hoverEffect>
            <Heart className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Çift Odaklılık</h3>
            <p className="text-gray-600 font-light">Tüm özelliklerimizi çiftlerin stresini azaltmak ve yüzlerini güldürmek için tasarlıyoruz.</p>
          </GlassCard>

          <GlassCard className="col-span-1 md:col-span-4 p-8 border-white/60" hoverEffect>
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Güven ve Şeffaflık</h3>
            <p className="text-gray-600 font-light">Yalnızca doğrulanmış firmalarla çalışıyor, sözleşmeler ve ödemeler için güvenli altyapı sunuyoruz.</p>
          </GlassCard>

          <GlassCard className="col-span-1 md:col-span-4 p-8 border-white/60" hoverEffect>
            <Globe className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Global Standartlar</h3>
            <p className="text-gray-600 font-light">En yeni web teknolojilerini (AI, SRE, Cloud) kullanarak dünya standartlarında bir deneyim sunuyoruz.</p>
          </GlassCard>

        </div>
      </main>

      <PublicFooter />
    </div>
  );
}