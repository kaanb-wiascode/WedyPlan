'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PARTNER_PLANS, SUCCESS_STORIES } from '@/lib/vendor-onboarding-constants';
import { Sparkles, ShieldCheck, TrendingUp, Check, ArrowRight, Building2, Store } from 'lucide-react';

export default function PartnerAcquisitionLandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-20">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white text-[12px] font-bold text-[#E6007E] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>WedyPlan Partner Ekosistemi & WOS</span>
          </div>

          <h1 className="text-[36px] sm:text-[60px] font-serif font-normal leading-[1.1] text-[#1D1D1F]">
            Sadece Müşteri Bulmayın. <br />
            <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37]">
              Düğün İşletmenizi Dijitalleştirin.
            </span>
          </h1>

          <p className="text-[16px] text-[#6E6E73] max-w-2xl mx-auto font-light leading-relaxed">
            Binlerce evlenecek çiftle anında buluşun; kaporadan çakışmasız saat slotu takvimine ve e-imza sözleşmelere kadar tüm operasyonunuzu tek platformdan yönetin.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/firma-katil/onboarding"
              className="bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold px-8 py-4 rounded-full transition shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Hemen Ücretsiz Başvurun</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">Başarı Hikayeleri</span>
          <h2 className="font-serif font-bold text-[28px]">Partnerlerimiz Neler Söyledi?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUCCESS_STORIES.map((story, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-3xl p-8 rounded-[32px] border border-white space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[18px] text-[#1D1D1F]">{story.company}</h4>
                  <span className="text-[12px] text-[#86868B]">{story.owner}</span>
                </div>
                <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {story.growthRate} Büyüme
                </span>
              </div>
              <p className="text-[13px] text-[#6E6E73] leading-relaxed italic">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-wider block">Paket Seçenekleri</span>
          <h2 className="font-serif font-bold text-[32px]">İşletmenize Uygun Planı Seçin</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNER_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white/60 backdrop-blur-3xl p-8 rounded-[36px] border space-y-6 flex flex-col justify-between ${
                plan.isPopular ? 'border-[#D4AF37] shadow-xl ring-2 ring-amber-100 bg-amber-50/10' : 'border-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">{plan.name}</h3>
                  {plan.isPopular && <span className="text-[10px] font-bold bg-[#D4AF37] text-white px-3 py-1 rounded-full">🌟 Popüler</span>}
                </div>
                <p className="text-[12px] text-[#6E6E73]">{plan.tagline}</p>

                <div className="font-serif font-bold text-[32px] text-[#1D1D1F]">
                  {plan.monthlyPrice === 0 ? 'Ücretsiz' : `${plan.monthlyPrice.toLocaleString('tr-TR')} ₺ / ay`}
                </div>

                <div className="space-y-2 border-t border-black/5 pt-4">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[#1D1D1F]">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/firma-katil/onboarding"
                className="w-full bg-[#1D1D1F] text-white text-center font-bold text-[12px] py-3.5 rounded-full hover:bg-black transition block cursor-pointer"
              >
                Başvuruyu Başlat
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}