'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { AiAssistantCapsule } from '@/components/public/AiAssistantCapsule';
import { LiquidVendorCard, LiquidVendor } from '@/components/public/LiquidVendorCard';
import { 
  Search, 
  Sparkles, 
  Building2, 
  Camera, 
  Music, 
  Scissors, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Wallet, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [featuredVendors, setFeaturedVendors] = useState<LiquidVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const snap = await getDocs(collection(db, 'vendors'));
        const list: LiquidVendor[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as LiquidVendor));
        setFeaturedVendors(list);
      } catch (err) {
        console.error('Firmalar okunamadı:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const categories = [
    { title: 'Düğün Salonları', icon: Building2, count: '120+ Mekan', href: '/firmalar?category=Düğün+Salonu' },
    { title: 'Kır Bahçeleri', icon: Heart, count: '85+ Bahçe', href: '/firmalar?category=Kır+Bahçesi' },
    { title: 'Fotoğraf Stüdyoları', icon: Camera, count: '200+ Ekip', href: '/firmalar?category=Fotoğrafçı' },
    { title: 'Müzik & Orkestra', icon: Music, count: '90+ Sanatçı', href: '/firmalar?category=Müzik+%26+DJ' },
    { title: 'Gelinlik & Moda', icon: Scissors, count: '150+ Modaevi', href: '/firmalar?category=Gelinlik' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-pink-200/40 via-purple-100/20 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[400px] left-[-200px] w-[500px] h-[500px] bg-amber-100/30 blur-[140px] pointer-events-none -z-10" />

      {/* Glass Navigation */}
      <PublicNavbar />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 sm:pt-40 pb-20 px-6 max-w-7xl mx-auto text-center space-y-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white text-[12px] font-bold text-[#E6007E] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Liquid Glass OS & WedyAI Deneyimi</span>
          </div>

          <h1 className="text-[40px] sm:text-[64px] lg:text-[76px] font-serif font-normal leading-[1.08] tracking-tight text-[#1D1D1F]">
            Düğün Planlamanın <br className="hidden sm:block" />
            <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37]">
              Sıradışı Geleceği.
            </span>
          </h1>

          <p className="text-[16px] sm:text-[20px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed font-light">
            En seçkin mekanları ve hizmet sağlayıcıları keşfedin; çakışmasız randevulardan dijital e-imzaya kadar her adımı akıllı asistanınızla yönetin.
          </p>
        </motion.div>

        {/* WedyPlan Assist Kapsülü */}
        <AiAssistantCapsule />

        {/* Floating Liquid Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto bg-white/50 backdrop-blur-2xl p-3 rounded-[32px] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="flex-1 w-full px-5 py-2.5 border-b sm:border-b-0 sm:border-r border-black/5 text-left">
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">Kategori</span>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full text-[14px] font-semibold text-[#1D1D1F] bg-transparent outline-none cursor-pointer"
            >
              <option value="">Tüm Kategori ve Hizmetler</option>
              <option value="Düğün Salonu">Düğün Salonları</option>
              <option value="Kır Bahçesi">Kır Bahçeleri</option>
              <option value="Fotoğrafçı">Fotoğraf & Video Stüdyoları</option>
              <option value="Gelinlik">Gelinlik & Modaevleri</option>
            </select>
          </div>

          <div className="flex-1 w-full px-5 py-2.5 text-left">
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">Lokasyon</span>
            <input
              type="text"
              placeholder="Örn: İstanbul, Beykoz..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full text-[14px] font-semibold text-[#1D1D1F] bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          <Link
            href={`/firmalar?category=${encodeURIComponent(searchCategory)}&city=${encodeURIComponent(searchCity)}`}
            className="w-full sm:w-auto bg-[#1D1D1F] hover:bg-black text-white px-8 py-4 rounded-[24px] font-bold text-[13px] transition flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Mekan Ara</span>
          </Link>
        </motion.div>
      </section>

      {/* --- TRUST METRICS BENTO --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-8 rounded-[32px] shadow-xs space-y-2">
            <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-2xl w-fit"><Wallet className="w-6 h-6" /></div>
            <div className="text-[32px] font-serif font-bold text-[#1D1D1F]">₺2.4 Milyar+</div>
            <p className="text-[13px] text-[#6E6E73]">WedyPlan güvencesiyle yönetilen bütçe hacmi</p>
          </div>

          <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-8 rounded-[32px] shadow-xs space-y-2">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl w-fit"><Calendar className="w-6 h-6" /></div>
            <div className="text-[32px] font-serif font-bold text-[#1D1D1F]">%100 Çakışmasız</div>
            <p className="text-[13px] text-[#6E6E73]">WOS akıllı saat slot denetleyicisi koruması</p>
          </div>

          <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-8 rounded-[32px] shadow-xs space-y-2">
            <div className="p-3 bg-pink-500/10 text-[#E6007E] rounded-2xl w-fit"><ShieldCheck className="w-6 h-6" /></div>
            <div className="text-[32px] font-serif font-bold text-[#1D1D1F]">E-İmza & Garanti</div>
            <p className="text-[13px] text-[#6E6E73]">Resmi dijital sözleşme altyapısı</p>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Koleksiyonlar</span>
            <h2 className="text-[28px] sm:text-[36px] font-serif font-semibold text-[#1D1D1F]">Popüler Hizmet Kategorileri</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="bg-white/40 backdrop-blur-2xl p-6 rounded-[28px] border border-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 text-center space-y-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1D1D1F] mx-auto flex items-center justify-center group-hover:scale-110 shadow-xs transition duration-300">
                  <Icon className="w-6 h-6 text-[#E6007E]" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#1D1D1F]">{cat.title}</h3>
                  <span className="text-[11px] text-[#86868B]">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* --- FEATURED VENDORS SHOWCASE --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-widest block mb-1">Seçkin Mekanlar</span>
            <h2 className="text-[28px] sm:text-[36px] font-serif font-semibold text-[#1D1D1F]">Öne Çıkan Düğün Salonları</h2>
          </div>
          <Link href="/firmalar" className="text-[13px] font-bold text-[#1D1D1F] hover:text-[#E6007E] transition flex items-center gap-1">
            Tüm Kataloğu İncele <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-3 text-center text-xs text-slate-400 py-12">Görseller yükleniyor...</p>
          ) : featuredVendors.length === 0 ? (
            <p className="col-span-3 text-center text-xs text-slate-400 py-12">Henüz kayıtlı mekan bulunmuyor.</p>
          ) : (
            featuredVendors.slice(0, 6).map((vendor) => (
              <LiquidVendorCard key={vendor.id} vendor={vendor} />
            ))
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/80 bg-white/40 backdrop-blur-2xl mt-20 py-12 px-6 text-center text-[12px] text-[#86868B] space-y-3">
        <div className="flex items-center justify-center gap-2 font-serif font-bold text-[18px] text-[#1D1D1F]">
          <Heart className="w-5 h-5 text-[#E6007E] fill-[#E6007E]" /> WedyPlan Inc.
        </div>
        <p>© 2026 WedyPlan — Liquid Glass Operating System. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}