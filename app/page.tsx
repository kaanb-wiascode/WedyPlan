'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Sparkles, Search, MapPin, ArrowRight, Building2, Camera, Shirt, Music, HeartHandshake, Utensils, Star, BookOpen, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');

  const categories = [
    {
      title: "Düğün Mekanları",
      count: "2.400+ Mekan",
      href: "/firmalar?category=MEKAN",
      bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
      icon: Building2
    },
    {
      title: "Fotoğraf & Video",
      count: "3.100+ Stüdyo",
      href: "/firmalar?category=FOTOGRAF",
      bg: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop",
      icon: Camera
    },
    {
      title: "Gelinlik & Moda",
      count: "1.800+ Mağaza",
      href: "/gelinlik-modelleri",
      bg: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600&auto=format&fit=crop",
      icon: Shirt
    },
    {
      title: "Organizasyon",
      count: "950+ Firma",
      href: "/firmalar?category=ORGANIZASYON",
      bg: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
      icon: HeartHandshake
    },
    {
      title: "Müzik & Orkestra",
      count: "800+ Müzisyen",
      href: "/firmalar?category=MUZIK",
      bg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
      icon: Music
    },
    {
      title: "Catering & İkram",
      count: "450+ Şef",
      href: "/firmalar?category=CATERING",
      bg: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop",
      icon: Utensils
    },
  ];

  return (
    <PublicPageLayout>
      <div className="space-y-16 md:space-y-24 pb-20">
        
        {/* 1. Hero Section & Akıllı Hap Arama Çubuğu */}
        <section className="relative pt-6 md:pt-12 px-4 max-w-7xl mx-auto">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-[#E6007E]/20 text-xs font-bold text-[#E6007E] shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Yapay Zeka Destekli Düğün Planlama Platformu</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Hayalinizdeki Düğünü <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6007E] via-purple-600 to-indigo-600">
                Kusursuz Planlayın
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 font-light leading-relaxed">
              Binlerce mekan ve hizmet sağlayıcıyı karşılaştırın, yapay zeka ile size en uygun teklifleri saniyeler içinde toplayın.
            </p>

            {/* Tek Satır Glassmorphic Komuta Arama Barları */}
            <div className="pt-4 max-w-3xl mx-auto">
              <GlassCard className="p-2 border-white/80 bg-white/80 shadow-2xl rounded-3xl lg:rounded-full flex flex-col md:flex-row items-center justify-between gap-2 relative z-20">
                
                {/* Arama Alanı */}
                <div className="flex items-center w-full md:w-auto flex-1 px-4 py-2">
                  <Search className="w-5 h-5 text-[#E6007E] mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ne arıyorsunuz? (Mekan, Fotoğrafçı, Gelinlik...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-[14px] font-medium text-gray-900 placeholder:text-gray-400 outline-none w-full min-w-0"
                  />
                </div>

                <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />

                {/* Şehir Seçimi */}
                <div className="flex items-center w-full md:w-auto px-4 py-2">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-[14px] font-semibold text-gray-800 outline-none cursor-pointer w-full md:w-auto"
                  >
                    <option value="ALL">Tüm Şehirler</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                  </select>
                </div>

                {/* Arama Butonu */}
                <Link
                  href={`/firmalar?search=${searchQuery}&city=${selectedCity}`}
                  className="w-full md:w-auto px-8 py-3.5 bg-[#1D1D1F] hover:bg-black text-white text-sm font-bold rounded-2xl md:rounded-full transition-all shadow-lg hover:shadow-xl shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Keşfet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </div>

          </div>
        </section>

        {/* 2. Öne Çıkan Kategori Kartları */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#E6007E] uppercase">KATEGORİLER</span>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">Nereden Başlamak İstersiniz?</h2>
            </div>
            <Link href="/firmalar" className="text-sm font-bold text-[#E6007E] hover:underline flex items-center gap-1">
              Tümünü Gör <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link key={idx} href={cat.href} className="group">
                  <GlassCard hoverEffect className="relative h-56 p-4 border-white/60 overflow-hidden flex flex-col justify-between">
                    <Image
                      src={cat.bg}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="relative z-10 self-start p-2.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="relative z-10 text-white space-y-1">
                      <h3 className="font-bold text-base leading-snug group-hover:text-pink-300 transition-colors">{cat.title}</h3>
                      <p className="text-[11px] text-gray-300 font-medium">{cat.count}</p>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Popüler Düğün Lokasyonları */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">LOKASYONLAR</span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">Popüler Düğün Şehirleri</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "İstanbul Düğün Mekanları",
                desc: "Boğaz manzaralı tarihi yalılar ve kır bahçeleri",
                img: "https://images.unsplash.com/photo-1527838832700-54595d2f119b?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=İstanbul"
              },
              {
                name: "Ankara Düğün Salonları",
                desc: "İncek ve Gölbaşı'nın en şık davet alanları",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=Ankara"
              },
              {
                name: "İzmir Kır Düğünü",
                desc: "Urla, Çeşme ve Alaçatı'da masalsı konseptler",
                img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=İzmir"
              },
              {
                name: "Bursa Düğün Salonları",
                desc: "Nilüfer bölgesindeki premium balo salonları",
                img: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=Bursa"
              },
            ].map((city, idx) => (
              <GlassCard key={idx} hoverEffect className="p-0 border-white/60 overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={city.img} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#E6007E] transition-colors">{city.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{city.desc}</p>
                  <Link href={city.href} className="inline-flex items-center text-xs font-bold text-[#E6007E] pt-2">
                    Keşfet <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 4. Düğün Rehberi & Blog */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-widest text-amber-600 uppercase">DÜĞÜN REHBERİ</span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Gelin & Damat Rehberi</h2>
            <p className="text-sm text-gray-600 font-light">Bütçe yönetiminden konsept seçimine uzman tavsiyeleri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Düğün Bütçesi Nasıl Planlanır? (2026 Rehberi)",
                cat: "Bütçe & Planlama",
                desc: "Sürpriz masraflardan kaçınarak bütçenizi yönetmenin adımları.",
              },
              {
                title: "Vücut Tipine Göre Gelinlik Seçimi İpuçları",
                cat: "Gelinlik & Moda",
                desc: "A kesimden balık modele en çok yakışacak gelinliği keşfedin.",
              },
              {
                title: "Kır Düğünü Yapacakların Mutlaka Bilmesi Gerekenler",
                cat: "Mekan Seçimi",
                desc: "Açık hava düğünlerinde hava durumu alternatifleri ve süslemeler.",
              },
            ].map((blog, i) => (
              <GlassCard key={i} hoverEffect className="p-6 border-white/60 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-[10px] font-bold text-[#E6007E] uppercase">
                    {blog.cat}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 leading-snug">{blog.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{blog.desc}</p>
                </div>
                <Link href="/blog" className="inline-flex items-center text-xs font-bold text-gray-900 hover:text-[#E6007E] pt-2 transition-colors">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Devamını Oku
                </Link>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 5. İşletme Sahipleri İçin Banner (CTA) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <GlassCard className="p-8 md:p-12 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-[36px] relative overflow-hidden border-none shadow-2xl">
            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">İŞLETME SAHİPLERİ İÇİN</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Düğün Sektöründe Hizmet mi Veriyorsunuz?</h2>
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                WedyPlan'a katılarak binlerce evlenecek çifte ulaşın, teklif taleplerini ve rezervasyonlarınızı dijital panelle kolayca yönetin.
              </p>
              <div className="pt-2">
                <Link
                  href="/firma-katil"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all shadow-lg"
                >
                  <span>Ücretsiz Firma Hesabı Oluşturun</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </GlassCard>
        </section>

      </div>
    </PublicPageLayout>
  );
}