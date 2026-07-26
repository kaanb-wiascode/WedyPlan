'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicVendorCard, PublicVendor } from '@/components/public/PublicVendorCard';
import { Search, Sparkles, Building2, Camera, Music, Scissors, Heart, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [featuredVendors, setFeaturedVendors] = useState<PublicVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const snap = await getDocs(collection(db, 'vendors'));
        const list: PublicVendor[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as PublicVendor));
        setFeaturedVendors(list);
      } catch (err) {
        console.error('Ana sayfa verileri alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const categories = [
    { title: 'Düğün Salonları', icon: Building2, count: '120+ Mekan', href: '/firmalar?category=Düğün+Salonu' },
    { title: 'Kır Bahçeleri', icon: Heart, count: '85+ Bahçe', href: '/firmalar?category=Kır+Bahçesi' },
    { title: 'Fotoğrafçılar', icon: Camera, count: '200+ Stüdyo', href: '/firmalar?category=Fotoğrafçı' },
    { title: 'Müzik & Orkestra', icon: Music, count: '90+ Ekip', href: '/firmalar?category=Müzik+%26+DJ' },
    { title: 'Gelinlik & Moda', icon: Scissors, count: '150+ Modaevi', href: '/firmalar?category=Gelinlik' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-[#1D1D1F]">
      <PublicNavbar />

      {/* Hero Alanı */}
      <section className="relative pt-12 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#E6007E] text-[12px] font-bold shadow-xs">
          <Sparkles className="w-4 h-4" /> Türkiye'nin En Akıllı Düğün Pazaryeri & WedyAI
        </div>

        <h1 className="text-[36px] sm:text-[54px] md:text-[64px] font-serif font-normal leading-[1.1] text-[#1D1D1F] max-w-4xl mx-auto">
          Hayalinizdeki Düğünü <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6007E] to-purple-600 font-semibold">Yapay Zeka</span> İle Planlayın.
        </h1>

        <p className="text-[15px] sm:text-[18px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
          En seçkin düğün salonları, kır bahçeleri ve fotoğrafçılardan anında fiyat teklifi alın, kaporadan gün takibine kadar her şeyi WedyPlan ile yönetin.
        </p>

        {/* Arama Kutusu */}
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-2xl p-3 rounded-[28px] border border-pink-100 shadow-xl shadow-pink-500/5 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100 text-left">
            <span className="text-[10px] font-bold text-[#86868B] uppercase block">Ne Arıyorsunuz?</span>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full text-[13px] font-semibold text-[#1D1D1F] bg-transparent outline-none cursor-pointer"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="Düğün Salonu">Düğün Salonu</option>
              <option value="Kır Bahçesi">Kır Bahçesi</option>
              <option value="Fotoğrafçı">Fotoğrafçı</option>
              <option value="Gelinlik">Gelinlik</option>
            </select>
          </div>

          <div className="flex-1 w-full px-4 py-2 text-left">
            <span className="text-[10px] font-bold text-[#86868B] uppercase block">Şehir</span>
            <input
              type="text"
              placeholder="Örn: İstanbul, İzmir..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full text-[13px] font-semibold text-[#1D1D1F] bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>

          <Link
            href={`/firmalar?category=${encodeURIComponent(searchCategory)}&city=${encodeURIComponent(searchCity)}`}
            className="w-full sm:w-auto bg-[#E6007E] text-white px-8 py-3.5 rounded-[20px] font-bold text-[13px] hover:bg-pink-700 transition flex items-center justify-center gap-2 shadow-md shadow-pink-200 cursor-pointer"
          >
            <Search className="w-4 h-4" /> Firmaları Bul
          </Link>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-[24px] font-serif font-semibold text-[#1D1D1F]">Popüler Kategoriler</h2>
          <p className="text-[13px] text-[#6E6E73]">Düğününüz için ihtiyacınız olan tüm hizmet sağlayıcılar</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="bg-white p-6 rounded-[24px] border border-slate-100 hover:border-pink-200 hover:shadow-md transition text-center space-y-3 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#E6007E] mx-auto flex items-center justify-center group-hover:scale-110 transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[14px] text-[#1D1D1F]">{cat.title}</h3>
                  <span className="text-[11px] text-[#86868B]">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Öne Çıkan Firmalar */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[24px] font-serif font-semibold text-[#1D1D1F]">Öne Çıkan & Sponsorlu İlanlar</h2>
            <p className="text-[13px] text-[#6E6E73]">WedyPlan onaylı yüksek puanlı mekanlar ve ekipler</p>
          </div>
          <Link href="/firmalar" className="text-[12px] font-bold text-[#E6007E] hover:underline">
            Tümünü İncele →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-3 text-center text-xs text-slate-400 py-8">Firmalar yükleniyor...</p>
          ) : featuredVendors.length === 0 ? (
            <p className="col-span-3 text-center text-xs text-slate-400 py-8">Henüz kayıtlı firma yok.</p>
          ) : (
            featuredVendors.map((vendor) => (
              <PublicVendorCard key={vendor.id} vendor={vendor} />
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20 py-12 px-6 md:px-12 text-center text-[12px] text-[#86868B]">
        <div className="flex items-center justify-center gap-2 mb-2 font-serif font-bold text-[16px] text-[#1D1D1F]">
          <ShieldCheck className="w-5 h-5 text-[#E6007E]" /> WedyPlan Platform
        </div>
        <p>© 2026 WedyPlan Inc. Tüm hakları saklıdır. Yapay Zeka Destekli Düğün İşletim Sistemi.</p>
      </footer>
    </div>
  );
}