import React from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      <PublicNavbar mode="public" />

      {/* Hero Section & Arama Motoru - Rozet Kaldırıldı */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.15]">
            Düğününüz İçin En İyi <br />
            <span className="italic bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              Mekan ve Firmaları Keşfedin
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
            Binlerce düğün mekanı, fotoğrafçı, gelinlikçi ve organizasyon firmasını karşılaştırın, fiyat teklifi alın ve hayalinizdeki düğünü kolayca planlayın.
          </p>

          {/* Akıllı Arama Çubuğu */}
          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-3xl md:rounded-full border border-neutral-200/80 shadow-2xl shadow-black/5 flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full px-4 py-2 text-left border-b md:border-b-0 md:border-r border-neutral-200">
              <label className="block text-[10px] font-bold tracking-wider uppercase text-neutral-400">Ne Arıyorsunuz?</label>
              <input
                type="text"
                placeholder="Düğün salonu, fotoğrafçı, gelinlik..."
                className="w-full bg-transparent text-sm font-medium text-neutral-800 focus:outline-none placeholder:text-neutral-400"
              />
            </div>
            <div className="flex-1 w-full px-4 py-2 text-left">
              <label className="block text-[10px] font-bold tracking-wider uppercase text-neutral-400">Şehir</label>
              <select className="w-full bg-transparent text-sm font-medium text-neutral-800 focus:outline-none cursor-pointer">
                <option>İstanbul</option>
                <option>Ankara</option>
                <option>İzmir</option>
                <option>Bursa</option>
                <option>Tüm Şehirler</option>
              </select>
            </div>
            <Link
              href="/arama"
              className="w-full md:w-auto px-8 py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-2xl md:rounded-full transition-all shadow-md text-center shrink-0"
            >
              Firmaları Bul →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Öne Çıkan Kategoriler */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">KATEGORİLER</span>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mt-1">Düğün Planlamaya Başlayın</h2>
          </div>
          <Link href="/arama" className="text-sm font-semibold text-rose-700 hover:underline">
            Tüm Kategorileri Gör →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Düğün Salonları", count: "2.400+ Mekan", href: "/kategori/dugun-salonlari", bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop" },
            { title: "Kır Bahçeleri", count: "1.200+ Mekan", href: "/kategori/kir-bahceleri", bg: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop" },
            { title: "Fotoğrafçılar", count: "3.100+ Stüdyo", href: "/kategori/fotografcilar", bg: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop" },
            { title: "Gelinlik & Moda", count: "1.800+ Mağaza", href: "/kategori/gelinlik", bg: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600&auto=format&fit=crop" },
            { title: "Organizasyon", count: "950+ Firma", href: "/kategori/organizasyon", bg: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" },
            { title: "Müzik & DJ", count: "800+ Müzisyen", href: "/kategori/muzik", bg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
          ].map((cat, index) => (
            <Link key={index} href={cat.href} className="relative h-48 rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 border border-neutral-200/60 block">
              <Image src={cat.bg} alt={cat.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white text-left space-y-1 z-10">
                <h3 className="font-semibold text-sm leading-tight group-hover:translate-x-1 transition-transform">{cat.title}</h3>
                <p className="text-[11px] text-neutral-300 font-light">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Diğer Bölümler Mevcut Haliyle Kalır (Lokasyonlar, Blog, İşletme Çağrısı vb.) */}
      {/* 4. Popüler Şehirler & Lokasyonlar */}
      <section className="py-16 bg-neutral-100/60 border-y border-neutral-200/50 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">LOKASYONLAR</span>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">En Çok Aranan Şehirler</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "İstanbul Düğün Mekanları", desc: "Boğaz manzaralı mekanlar, tarihi yalılar ve kır bahçeleri", img: "https://images.unsplash.com/photo-1527838832700-54595d2f119b?q=80&w=800&auto=format&fit=crop" },
              { name: "Ankara Düğün Salonları", desc: "Çankaya, Gölbaşı ve İncek'te en popüler davet alanları", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" },
              { name: "İzmir Kır Düğünü", desc: "Urla, Çeşme ve Alaçatı'da masalsı açık hava düğünleri", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop" },
              { name: "Bursa Düğün Salonları", desc: "Nilüfer ve Osmangazi bölgesindeki şık balo salonları", img: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop" },
            ].map((city, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={city.img} alt={city.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-neutral-900">{city.name}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{city.desc}</p>
                  <Link href="/arama" className="inline-block text-xs font-semibold text-rose-600 hover:underline pt-2">İncele →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Düğün Rehberi & Blog */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">DÜĞÜN REHBERİ</span>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">Gelin ve Damatlar İçin İpuçları</h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            Düğün bütçesi hazırlamaktan gelinlik seçimine kadar ihtiyacınız olan tüm rehber yazıları burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Düğün Bütçesi Nasıl Planlanır? (2026 Rehberi)", cat: "Bütçe & Planlama", desc: "Sürpriz masraflardan kaçınarak düğün bütçenizi en verimli şekilde yönetmenin adımları." },
            { title: "Vücut Tipine Göre Gelinlik Seçimi İpuçları", cat: "Gelinlik & Moda", desc: "A kesimden balık modele, vücut tipinize en çok yakışacak gelinlik modelini keşfedin." },
            { title: "Kır Düğünü Yapacakların Mutlaka Bilmesi Gerekenler", cat: "Mekan Seçimi", desc: "Açık hava düğünlerinde hava durumu alternatifinden konsept süslemelerine pratik tavsiyeler." },
          ].map((blog, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-neutral-200/80 space-y-4 hover:border-rose-300 transition-all shadow-sm hover:shadow-md">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-[10px] font-bold text-rose-700 uppercase">{blog.cat}</span>
              <h3 className="font-serif font-bold text-xl text-neutral-900 leading-snug">{blog.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{blog.desc}</p>
              <Link href="/blog" className="inline-block text-xs font-semibold text-neutral-900 hover:text-rose-600 pt-2 transition-colors">Devamını Oku →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. İşletme Çağrısı (CTA) */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">İŞLETME SAHİPLERİ İÇİN</span>
          <h2 className="text-3xl md:text-5xl font-serif">Düğün Sektöründe Hizmet mi Veriyorsunuz?</h2>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            WedyPlan'a katılarak binlerce evlenecek çifte ulaşın, rezervasyonlarınızı dijital takvimle kolayca yönetin.
          </p>
          <div className="pt-4">
            <Link href="/firma-katil" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-full transition-all shadow-lg">
              Ücretsiz Firma Hesabı Oluşturun →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}