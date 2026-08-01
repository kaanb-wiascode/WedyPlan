'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "@/components/public/PublicNavbar";
import { Search, MapPin, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Tüm Şehirler");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Üst Navigasyon */}
      <PublicNavbar mode="public" />

      {/* 2. Hero Section & Arama Motoru */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden">
        {/* Yumuşak Işık Efekti */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-semibold text-rose-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Hayalinizdeki Düğün İçin Her Şey Burada</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.15] text-neutral-900">
            Düğününüz İçin En İyi <br />
            <span className="italic bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Mekan ve Firmaları Keşfedin
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Binlerce düğün mekanı, fotoğrafçı, gelinlikçi ve organizasyon firmasını karşılaştırın, ücretsiz fiyat teklifi alın ve düğününüzü kolayca planlayın.
          </p>

          {/* Akıllı Arama Çubuğu - Mobile & Desktop Uyumlu */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-3 md:p-3.5 rounded-3xl md:rounded-full border border-neutral-200/80 shadow-xl shadow-neutral-900/5 flex flex-col md:flex-row items-center gap-2">
            
            {/* Arama İnput */}
            <div className="flex items-center w-full md:flex-1 px-4 py-2.5 text-left border-b md:border-b-0 md:border-r border-neutral-200">
              <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold tracking-wider uppercase text-neutral-400">Ne Arıyorsunuz?</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Düğün salonu, fotoğrafçı, gelinlik..."
                  className="w-full bg-transparent text-sm font-medium text-neutral-800 focus:outline-none placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Şehir Select */}
            <div className="flex items-center w-full md:w-48 px-4 py-2.5 text-left border-b md:border-b-0 md:border-r border-neutral-200">
              <MapPin className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold tracking-wider uppercase text-neutral-400">Şehir</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="Tüm Şehirler">Tüm Şehirler</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Antalya">Antalya</option>
                </select>
              </div>
            </div>

            {/* Buton */}
            <Link
              href={`/firmalar?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(city === 'Tüm Şehirler' ? '' : city)}`}
              className="w-full md:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-black rounded-2xl md:rounded-full transition-all shadow-md text-center shrink-0 flex items-center justify-center gap-2 group"
            >
              <span>Firmaları Bul</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Öne Çıkan Kategoriler */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200/60 pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">KATEGORİLER</span>
            <h2 className="text-2xl md:text-4xl font-serif text-neutral-900 mt-1">Düğün Planlamaya Başlayın</h2>
          </div>
          <Link href="/firmalar" className="text-sm font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 hover:underline">
            Tüm Kategorileri Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {[
            {
              title: "Düğün Salonları",
              count: "2.400+ Mekan",
              href: "/firmalar?category=MEKAN",
              bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Kır Bahçeleri",
              count: "1.200+ Mekan",
              href: "/firmalar?category=KIR_BAHCESI",
              bg: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Fotoğrafçılar",
              count: "3.100+ Stüdyo",
              href: "/firmalar?category=FOTOGRAF",
              bg: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Gelinlik & Moda",
              count: "1.800+ Mağaza",
              href: "/gelinlik-modelleri",
              bg: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Organizasyon",
              count: "950+ Firma",
              href: "/firmalar?category=ORGANIZASYON",
              bg: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Müzik & DJ",
              count: "800+ Müzisyen",
              href: "/firmalar?category=MUZIK",
              bg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop"
            },
          ].map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className="relative h-48 md:h-56 rounded-3xl overflow-hidden group shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/60"
            >
              <Image
                src={cat.bg}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white text-left space-y-1">
                <h3 className="font-serif font-bold text-base md:text-lg leading-tight group-hover:translate-x-1 transition-transform">{cat.title}</h3>
                <p className="text-[11px] text-neutral-300 font-light">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Popüler Şehirler & Lokasyonlar */}
      <section className="py-16 bg-neutral-100/70 border-y border-neutral-200/60 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">LOKASYONLAR</span>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">En Çok Aranan Şehirler</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "İstanbul Düğün Mekanları",
                desc: "Boğaz manzaralı mekanlar, tarihi yalılar ve kır bahçeleri",
                img: "https://images.unsplash.com/photo-1527838832700-54595d2f119b?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=İstanbul"
              },
              {
                name: "Ankara Düğün Salonları",
                desc: "Çankaya, Gölbaşı ve İncek'te en popüler davet alanları",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=Ankara"
              },
              {
                name: "İzmir Kır Düğünü",
                desc: "Urla, Çeşme ve Alaçatı'da masalsı açık hava düğünleri",
                img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=İzmir"
              },
              {
                name: "Bursa Düğün Salonları",
                desc: "Nilüfer ve Osmangazi bölgesindeki şık balo salonları",
                img: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop",
                href: "/firmalar?city=Bursa"
              },
            ].map((cityItem, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={cityItem.img}
                    alt={cityItem.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-neutral-900 group-hover:text-rose-700 transition-colors">{cityItem.name}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1">{cityItem.desc}</p>
                  </div>
                  <Link href={cityItem.href} className="inline-flex items-center text-xs font-bold text-rose-700 hover:underline pt-3">
                    İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Düğün Rehberi & Blog */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">DÜĞÜN REHBERİ</span>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">Gelin ve Damatlar İçin İpuçları</h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto font-light">
            Düğün bütçesi hazırlamaktan gelinlik seçimine kadar ihtiyacınız olan tüm rehber yazıları burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Düğün Bütçesi Nasıl Planlanır? (2026 Rehberi)",
              cat: "Bütçe & Planlama",
              desc: "Sürpriz masraflardan kaçınarak düğün bütçenizi en verimli şekilde yönetmenin adımları.",
            },
            {
              title: "Vücut Tipine Göre Gelinlik Seçimi İpuçları",
              cat: "Gelinlik & Moda",
              desc: "A kesimden balık modele, vücut tipinize en çok yakışacak gelinlik modelini keşfedin.",
            },
            {
              title: "Kır Düğünü Yapacakların Mutlaka Bilmesi Gerekenler",
              cat: "Mekan Seçimi",
              desc: "Açık hava düğünlerinde hava durumu alternatifinden konsept süslemelerine pratik tavsiyeler.",
            },
          ].map((blog, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-neutral-200 space-y-4 hover:border-rose-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-rose-50 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  {blog.cat}
                </span>
                <h3 className="font-serif font-bold text-xl text-neutral-900 leading-snug">{blog.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">{blog.desc}</p>
              </div>
              <Link href="/blog" className="inline-flex items-center text-xs font-bold text-neutral-900 hover:text-rose-600 pt-2 transition-colors">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-rose-600" /> Devamını Oku →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. İşletme Çağrısı (CTA) */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">İŞLETME SAHİPLERİ İÇİN</span>
          <h2 className="text-3xl md:text-5xl font-serif">Düğün Sektöründe Hizmet mi Veriyorsunuz?</h2>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            WedyPlan'a katılarak binlerce evlenecek çifte ulaşın, rezervasyonlarınızı dijital takvimle kolayca yönetin.
          </p>
          <div className="pt-4">
            <Link
              href="/firma-katil"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-full transition-all shadow-lg hover:scale-105"
            >
              Ücretsiz Firma Hesabı Oluşturun →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}