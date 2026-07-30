import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased">
      <PublicNavbar mode="public" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-semibold text-rose-700 shadow-sm">
            <span>✨ Hayalinizdeki Düğün İçin Her Şey Burada</span>
          </div>

          {/* Firma Katıl Sayfası İle Birebir Aynı Font / Serif Stil */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.15]">
            Düğününüz İçin En İyi <br />
            <span className="italic bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              Mekan ve Firmaları Keşfedin
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
            Binlerce düğün mekanı, fotoğrafçı, gelinlikçi ve organizasyon firmasını karşılaştırın, fiyat teklifi alın ve hayalinizdeki düğünü kolayca planlayın.
          </p>

          {/* Arama Çubuğu */}
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

      {/* Kategoriler */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">KATEGORİLER</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-neutral-900 mt-1">Düğün Planlamaya Başlayın</h2>
          </div>
          <Link href="/arama" className="text-sm font-semibold text-rose-700 hover:underline">
            Tüm Kategorileri Gör →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Düğün Salonları", icon: "🏰", count: "2.400+ Mekan", href: "/kategori/dugun-salonlari" },
            { title: "Kır Bahçeleri", icon: "🌿", count: "1.200+ Mekan", href: "/kategori/kir-bahceleri" },
            { title: "Fotoğrafçılar", icon: "📸", count: "3.100+ Stüdyo", href: "/kategori/fotografcilar" },
            { title: "Gelinlik & Moda", icon: "👗", count: "1.800+ Mağaza", href: "/kategori/gelinlik" },
            { title: "Organizasyon", icon: "✨", count: "950+ Firma", href: "/kategori/organizasyon" },
            { title: "Müzik & DJ", icon: "🎵", count: "800+ Müzisyen", href: "/kategori/muzik" },
          ].map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className="p-6 rounded-3xl bg-white/70 border border-neutral-200/60 hover:bg-white hover:border-rose-200 hover:shadow-xl transition-all text-center space-y-3 group"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">{cat.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Şehirler */}
      <section className="py-16 bg-neutral-100/60 border-y border-neutral-200/50 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">LOKASYONLAR</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-neutral-900">En Çok Aranan Şehirler</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "İstanbul Düğün Mekanları", desc: "Boğaz manzaralı mekanlar, tarihi yalılar ve kır bahçeleri", img: "🌉" },
              { name: "Ankara Düğün Salonları", desc: "Çankaya, Gölbaşı ve İncek'te en popüler davet alanları", img: "🏛️" },
              { name: "İzmir Kır Düğünü", desc: "Urla, Çeşme ve Alaçatı'da masalsı açık hava düğünleri", img: "🌴" },
              { name: "Bursa Düğün Salonları", desc: "Nilüfer ve Osmangazi bölgesindeki şık balo salonları", img: "🌲" },
            ].map((city, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-neutral-200/80 space-y-3 hover:shadow-lg transition-all">
                <div className="text-3xl">{city.img}</div>
                <h3 className="font-serif font-bold text-lg text-neutral-900">{city.name}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{city.desc}</p>
                <Link href="/arama" className="inline-block text-xs font-semibold text-rose-600 hover:underline pt-2">
                  İncele →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Rehber */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">DÜĞÜN REHBERİ</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-neutral-900">Gelin ve Damatlar İçin İpuçları</h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            Düğün bütçesi hazırlamaktan gelinlik seçimine kadar ihtiyacınız olan tüm rehber yazıları burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div key={i} className="p-8 rounded-3xl bg-white border border-neutral-200/80 space-y-4 hover:border-rose-300 transition-all shadow-sm hover:shadow-md">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-[10px] font-bold text-rose-700 uppercase">
                {blog.cat}
              </span>
              <h3 className="font-serif font-bold text-xl text-neutral-900 leading-snug">{blog.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{blog.desc}</p>
              <Link href="/blog" className="inline-block text-xs font-semibold text-neutral-900 hover:text-rose-600 pt-2 transition-colors">
                Devamını Oku →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* İşletme Daveti CTA */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">İŞLETME SAHİPLERİ İÇİN</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Düğün Sektöründe Hizmet mi Veriyorsunuz?</h2>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            WedyPlan'a katılarak binlerce evlenecek çifte ulaşın, rezervasyonlarınızı dijital takvimle kolayca yönetin.
          </p>
          <div className="pt-4">
            <Link
              href="/firma-katil"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-full transition-all shadow-lg"
            >
              Ücretsiz Firma Hesabı Oluşturun →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}