'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Users, Star, Building2, Sparkles, Camera, Music, Shirt, 
  Heart, ChevronRight, Percent, CalendarDays, Calculator, ScrollText, ArrowRight, Play
} from 'lucide-react';

export default function WedyPlanMarketplaceHome() {
  const [activeTab, setActiveTab] = useState('mekanlar');

  // Görselli Kategoriler (Dugun.com tarzı duygusal yaklaşım)
  const visualCategories = [
    { id: 'kir-dugunu', label: 'Kır Düğünü', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80', count: '1.240 Mekan' },
    { id: 'otel', label: 'Otelde Düğün', image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80', count: '450 Mekan' },
    { id: 'tarihi-mekan', label: 'Tarihi Mekanlar', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80', count: '85 Mekan' },
    { id: 'fotograf', label: 'Düğün Fotoğrafçısı', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80', count: '2.100 Firma' },
    { id: 'gelinlik', label: 'Gelinlik', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', count: '850 Mağaza' },
    { id: 'davetiye', label: 'Davetiye', image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=600&q=80', count: '320 Firma' },
  ];

  // Kampanyalı ve VIP Firmalar
  const featuredVendors = [
    {
      id: '1', name: 'Bosphorus Palace Hotel', category: 'Tarihi Mekan & Otel',
      location: 'Üsküdar, İstanbul', rating: 5.0, reviews: 124,
      oldPrice: '3.000 TL', newPrice: '2.500 TL',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      badge: '%15 Erken Rezervasyon', isVip: true
    },
    {
      id: '2', name: 'Beykoz Secret Garden', category: 'Kır Düğünü',
      location: 'Beykoz, İstanbul', rating: 4.8, reviews: 86,
      oldPrice: '1.500 TL', newPrice: '1.200 TL',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      badge: '2026 Yaz Kampanyası', isVip: true
    },
    {
      id: '3', name: 'Serafina Fine Art', category: 'Düğün Fotoğrafçısı',
      location: 'Tüm Türkiye', rating: 4.9, reviews: 312,
      oldPrice: '45.000 TL', newPrice: '35.000 TL',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      badge: 'Drone Çekimi Hediye', isVip: false
    },
    {
      id: '4', name: 'Nova Gelinlik Modaevi', category: 'Gelinlik & Tasarım',
      location: 'Nişantaşı, İstanbul', rating: 4.7, reviews: 54,
      oldPrice: '60.000 TL', newPrice: '45.000 TL',
      image: 'https://images.unsplash.com/photo-1594992111196-857e504ce835?auto=format&fit=crop&w=800&q=80',
      badge: 'Provalarda VİP İkram', isVip: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 YENİ NESİL NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-black/[0.05]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">WedyPlan<span className="text-[#D4AF37]">.</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#555]">
            <Link href="/mekanlar" className="hover:text-[#111111] transition-colors">Düğün Mekanları</Link>
            <Link href="/firmalar" className="hover:text-[#111111] transition-colors">Tedarikçiler</Link>
            <Link href="/kampanyalar" className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors">
              <Percent className="w-4 h-4" /> Fırsatlar
            </Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/firma/ai-asistan" className="hidden sm:block text-[13px] font-medium px-4 py-2 hover:bg-black/5 rounded-full transition-colors">
              Firma mısınız?
            </Link>
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#3333] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
              Ücretsiz Planla
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 HERO & İNTERAKTİF ARAMA (dugun.com katili özellik) */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        {/* Dekoratif Arka Plan Gradientleri */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#F4F4F0] to-[#FDFDFD] -z-10" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-[1000px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-black/10 rounded-full text-[12px] font-medium shadow-sm mb-4">
            <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
            <span>4.500+ Onaylı Firma ve Mekan</span>
          </div>

          <h1 className="text-[40px] sm:text-[56px] md:text-[68px] font-serif font-normal tracking-tight leading-[1.1]">
            Hayalinizdeki düğünü <br className="hidden md:block" /> <span className="text-[#D4AF37] italic">saniyeler içinde</span> planlayın.
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#666666] max-w-[600px] mx-auto font-light leading-relaxed">
            Mekanları keşfedin, fiyat teklifleri alın ve yapay zeka asistanımızla bütçenizi kusursuz yönetin.
          </p>

          {/* İNTERAKTİF ARAMA KUTUSU */}
          <div className="mt-10 bg-white p-2 rounded-[32px] md:rounded-full border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] max-w-[850px] mx-auto flex flex-col md:flex-row items-center relative z-10">
            
            <div className="flex-1 w-full flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-black/5">
              <Building2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="ml-3 w-full text-left">
                <label className="block text-[10px] font-bold uppercase text-[#888] tracking-wider">Ne Arıyorsunuz?</label>
                <select className="w-full bg-transparent outline-none font-medium text-[#111] text-[15px] cursor-pointer mt-0.5">
                  <option>Düğün Mekanları (Tümü)</option>
                  <option>Kır Düğünü</option>
                  <option>Düğün Fotoğrafçısı</option>
                  <option>Gelinlik & Moda Evi</option>
                </select>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-black/5">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="ml-3 w-full text-left">
                <label className="block text-[10px] font-bold uppercase text-[#888] tracking-wider">Nerede?</label>
                <select className="w-full bg-transparent outline-none font-medium text-[#111] text-[15px] cursor-pointer mt-0.5">
                  <option>İstanbul (Tümü)</option>
                  <option>İstanbul - Boğaz Hattı</option>
                  <option>İzmir</option>
                  <option>Ankara</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-auto p-2">
              <Link href="/mekanlar" className="w-full md:w-[140px] h-[54px] bg-[#111111] hover:bg-[#333] text-white rounded-[24px] md:rounded-full flex items-center justify-center gap-2 font-medium transition-all">
                <Search className="w-4 h-4" /> Bul
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-[12px] text-[#777] font-medium pt-4">
            <span>Popüler:</span>
            <span className="cursor-pointer hover:text-[#111] underline decoration-black/20">Beykoz Kır Düğünü</span>
            <span className="cursor-pointer hover:text-[#111] underline decoration-black/20">Boğazda Otel</span>
            <span className="hidden sm:inline cursor-pointer hover:text-[#111] underline decoration-black/20">Dış Çekim Fotoğrafçısı</span>
          </div>
        </div>
      </section>

      {/* 🖼️ GÖRSEL KATEGORİLER (İlham Verici) */}
      <section className="py-16 max-w-[1300px] mx-auto px-6">
        <h2 className="text-[28px] font-serif font-medium text-[#111111] mb-8">Kategorileri Keşfet</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {visualCategories.map((c) => (
            <Link key={c.id} href={`/mekanlar?kategori=${c.id}`} className="group relative h-[180px] rounded-[24px] overflow-hidden bg-black flex flex-col justify-end p-4">
              <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
              <div className="relative z-10">
                <h3 className="text-white font-medium text-[15px] leading-tight">{c.label}</h3>
                <span className="text-white/70 text-[11px] block mt-1">{c.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎯 WEDYPLAN'İN GÜCÜ: AI & PLANLAMA ARAÇLARI (Bento Grid) */}
      <section className="py-16 bg-[#111111] my-10">
        <div className="max-w-[1300px] mx-auto px-6 text-white">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[#D4AF37] font-mono tracking-widest text-[11px] uppercase mb-2 flex items-center justify-center md:justify-start gap-1"><Sparkles className="w-3.5 h-3.5" /> Akıllı Araçlar</div>
              <h2 className="text-[32px] md:text-[40px] font-serif">Düğün asistanınız cebinizde.</h2>
            </div>
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 mx-auto md:mx-0">
              Ücretsiz Dene <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Büyük Yapay Zeka Kartı */}
            <div className="md:col-span-2 bg-[#1A1A1A] rounded-[32px] p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#D4AF37]/20 transition-all duration-700" />
              <div className="relative z-10 space-y-4 max-w-[400px]">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#D4AF37]"><Sparkles className="w-6 h-6" /></div>
                <h3 className="text-[24px] font-serif">WedyAI ile Konuşun</h3>
                <p className="text-[14px] text-white/60 leading-relaxed">Siz "Boğazda 300 kişilik mekan öner" deyin, yapay zeka asistanımız size bütçenize en uygun listeyi çıkarsın.</p>
              </div>
              <div className="relative z-10 mt-8 p-4 bg-black/40 border border-white/10 rounded-2xl">
                <p className="text-[13px] italic text-white/80">"WedyAI, fotoğrafçı bütçemizi 35.000 TL olarak ayarla ve kalan bütçeyi mekan için analiz et."</p>
              </div>
            </div>

            {/* Yan Araç Kartları */}
            <div className="space-y-4">
              <div className="bg-[#1A1A1A] rounded-[32px] p-6 border border-white/5 h-full flex flex-col justify-center hover:bg-[#222] transition-colors cursor-pointer">
                <Calculator className="w-6 h-6 text-[#D4AF37] mb-3" />
                <h4 className="font-medium text-[16px] mb-1">Bütçe Hesaplayıcı</h4>
                <p className="text-[12px] text-white/50">Gizli maliyetleri önceden görün, ödemelerinizi takip edin.</p>
              </div>
              <div className="bg-[#1A1A1A] rounded-[32px] p-6 border border-white/5 h-full flex flex-col justify-center hover:bg-[#222] transition-colors cursor-pointer">
                <Users className="w-6 h-6 text-[#D4AF37] mb-3" />
                <h4 className="font-medium text-[16px] mb-1">Davetli Yönetimi</h4>
                <p className="text-[12px] text-white/50">LCV durumlarını tek tıkla güncelleyin, masa düzenini kurun.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ FIRSATLAR VE VIP MEKANLAR (Dönüşüm Odaklı Grid) */}
      <section className="py-16 max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[28px] font-serif font-medium text-[#111111] flex items-center gap-2">
              Öne Çıkan Kampanyalar <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md animate-pulse">Yeni</span>
            </h2>
            <p className="text-[14px] text-[#777] mt-1">Sınırlı süreli indirimler ve erken rezervasyon fırsatları.</p>
          </div>
          <Link href="/mekanlar" className="text-[13px] font-medium border border-black/10 px-4 py-2 rounded-full hover:border-black transition-all">
            Tümünü Gör
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((v) => (
            <Link key={v.id} href={`/mekanlar/${v.id}`} className="group bg-white border border-black/5 rounded-[24px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all flex flex-col h-full">
              <div className="relative h-[200px] w-full overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Percent className="w-3 h-3" /> {v.badge}
                </div>
                {v.isVip && (
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                    VIP Partner
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#777] mb-1.5">
                    <span className="uppercase tracking-wider">{v.category}</span>
                    <span className="flex items-center gap-0.5 text-[#111] font-bold"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {v.rating}</span>
                  </div>
                  <h3 className="font-medium text-[16px] text-[#111] leading-snug group-hover:text-[#D4AF37] transition-colors">{v.name}</h3>
                  <p className="text-[12px] text-[#666] flex items-center gap-1 mt-1.5"><MapPin className="w-3 h-3 text-red-500" /> {v.location}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-black/5 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-[#999] line-through block">{v.oldPrice}</span>
                    <span className="text-[15px] font-bold text-[#111]">{v.newPrice} <span className="text-[10px] font-normal text-[#666]">/ kişi</span></span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#F4F4F0] flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 📜 FOOTER */}
      <footer className="bg-[#111111] pt-16 pb-8 text-white/60 text-[13px] mt-10">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl font-bold text-white block mb-4">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <p className="font-light leading-relaxed mb-6 text-white/50">Yapay zeka ile düğün planlama devrimi. Stres yok, sadece kusursuz anılar.</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">IG</div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">TT</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium text-[15px] mb-4">Keşfet</h4>
            <ul className="space-y-3 font-light">
              <li><Link href="/mekanlar" className="hover:text-white transition-colors">Düğün Mekanları</Link></li>
              <li><Link href="/firmalar" className="hover:text-white transition-colors">Düğün Tedarikçileri</Link></li>
              <li><Link href="/kampanyalar" className="hover:text-white transition-colors">Kampanyalar & Fırsatlar</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium text-[15px] mb-4">Planlama Araçları</h4>
            <ul className="space-y-3 font-light">
              <li><Link href="/cift/ai-asistan" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[#D4AF37]"/> WedyAI Concierge</Link></li>
              <li><Link href="/cift/butce" className="hover:text-white transition-colors">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/cift/davetliler" className="hover:text-white transition-colors">Davetli Yönetimi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium text-[15px] mb-4">Kurumsal</h4>
            <ul className="space-y-3 font-light">
              <li><Link href="/firma/ai-asistan" className="hover:text-white transition-colors">Firma Paneline Giriş</Link></li>
              <li><Link href="/reklam" className="hover:text-white transition-colors">Mekanınızı Ekleyin</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1300px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between font-light text-[12px]">
          <p>© 2026 WedyPlan Inc. Türkiye'nin Yeni Nesil Düğün Platformu.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Kullanıcı Sözleşmesi</span>
            <span className="hover:text-white cursor-pointer">Gizlilik Politikası</span>
          </div>
        </div>
      </footer>

    </div>
  );
}