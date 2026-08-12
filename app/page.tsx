'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/homepage/PublicFooter";
import { Search, MapPin, ArrowRight, BookOpen } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Tüm Şehirler");

  return (
    <div className="apple-page">
      <PublicNavbar mode="public" />

      <section className="relative px-4 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-5xl space-y-7 text-center md:space-y-8">
          <p className="apple-kicker">Düğün planlama</p>

          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl lg:text-[72px]">
            Düğününüz için en iyi
            <br />
            mekan ve firmalar.
          </h1>

          <p className="mx-auto max-w-2xl text-[17px] font-normal leading-relaxed text-[#86868b] md:text-[21px]">
            Binlerce düğün mekanı, fotoğrafçı, gelinlikçi ve organizasyon firmasını karşılaştırın, ücretsiz fiyat teklifi alın ve düğününüzü kolayca planlayın.
          </p>

          <div className="apple-glass mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-[28px] p-3 md:flex-row md:rounded-full md:p-2.5">
            <div className="flex w-full items-center px-4 py-2.5 text-left md:flex-1 md:border-r md:border-black/8">
              <Search className="mr-3 h-4 w-4 shrink-0 text-[#86868b]" />
              <div className="w-full">
                <label className="apple-label mb-0">Ne arıyorsunuz?</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Düğün salonu, fotoğrafçı, gelinlik..."
                  className="w-full bg-transparent text-[15px] font-medium text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex w-full items-center px-4 py-2.5 text-left md:w-48 md:border-r md:border-black/8">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-[#86868b]" />
              <div className="w-full">
                <label className="apple-label mb-0">Şehir</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-[15px] font-medium text-[#1d1d1f] focus:outline-none"
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

            <Link
              href={`/firmalar?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(city === 'Tüm Şehirler' ? '' : city)}`}
              className="apple-btn apple-btn-inline w-full shrink-0 gap-2 md:w-auto"
            >
              <span>Firmaları Bul</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="apple-kicker">Kategoriler</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
              Düğün planlamaya başlayın
            </h2>
          </div>
          <Link href="/firmalar" className="apple-link inline-flex items-center gap-1 text-[15px]">
            Tüm kategorileri gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
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
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative h-48 overflow-hidden rounded-[22px] md:h-56"
            >
              <Image
                src={cat.bg}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end space-y-1 p-4 text-left text-white">
                <h3 className="text-base font-semibold leading-tight tracking-tight md:text-lg">{cat.title}</h3>
                <p className="text-[12px] text-white/70">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-2 text-center">
            <p className="apple-kicker">Lokasyonlar</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
              En çok aranan şehirler
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            ].map((cityItem) => (
              <div key={cityItem.name} className="apple-glass apple-card group flex flex-col overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={cityItem.img}
                    alt={cityItem.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between space-y-2 p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f]">{cityItem.name}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#86868b]">{cityItem.desc}</p>
                  </div>
                  <Link href={cityItem.href} className="apple-link inline-flex items-center pt-3 text-[13px]">
                    İncele <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-16 md:px-8 md:py-20">
        <div className="space-y-3 text-center">
          <p className="apple-kicker">Düğün rehberi</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
            Gelin ve damatlar için ipuçları
          </h2>
          <p className="mx-auto max-w-xl text-[17px] text-[#86868b]">
            Düğün bütçesi hazırlamaktan gelinlik seçimine kadar ihtiyacınız olan tüm rehber yazıları burada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
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
          ].map((blog) => (
            <div key={blog.title} className="apple-glass apple-card flex flex-col justify-between space-y-4 p-8">
              <div className="space-y-3">
                <span className="apple-chip">{blog.cat}</span>
                <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#1d1d1f]">{blog.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#86868b]">{blog.desc}</p>
              </div>
              <Link href="/blog" className="apple-link inline-flex items-center pt-2 text-[14px]">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Devamını oku
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="apple-glass apple-card mx-auto max-w-5xl px-6 py-16 text-center md:px-12">
          <p className="apple-kicker">İşletme sahipleri için</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
            Düğün sektöründe hizmet mi veriyorsunuz?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-[#86868b]">
            WedyPlan&apos;a katılarak binlerce evlenecek çifte ulaşın, rezervasyonlarınızı dijital takvimle kolayca yönetin.
          </p>
          <div className="pt-8">
            <Link href="/firma-katil" className="apple-btn apple-btn-inline">
              Ücretsiz firma hesabı oluşturun
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
