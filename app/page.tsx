'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Users, Star, Building2, Sparkles, Camera, Music, Shirt, 
  Heart, ChevronRight, Percent, Calculator, ArrowRight, ShieldCheck, 
  SlidersHorizontal, CheckCircle2, Globe, FileText, QrCode, Play, ChevronDown, Layers
} from 'lucide-react';

export default function WedyPlanLiquidGlassHome() {
  // Arama & İnteraktif Hesaplayıcı State'leri
  const [selectedCity, setSelectedCity] = useState('istanbul');
  const [selectedCategory, setSelectedCategory] = useState('kir-dugunu');
  const [guestCount, setGuestCount] = useState(250);
  const [estimatedBudget, setEstimatedBudget] = useState(350000);

  // Renk Paleti Test Etme Widget State'i
  const [activeTheme, setActiveTheme] = useState('boho');

  const themes = {
    boho: { name: 'Rustik & Bohem', colors: ['#8B5A2B', '#C5A059', '#EEDC82', '#4A5D4E'] },
    glamour: { name: 'Boğaz & Lüks Gold', colors: ['#111111', '#D4AF37', '#F5F5F7', '#E5E5E5'] },
    romantic: { name: 'Pastel Pembe & Çiçek', colors: ['#E8C5C8', '#F4E1D2', '#B5E2FA', '#EDF6F9'] }
  };

  // Dinamik Eşleşen Mekan Sayısı Hesaplama (İnteraktif)
  const matchedVenuesCount = Math.max(12, Math.floor((estimatedBudget / 1000) * (guestCount / 100) / 12));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans selection:bg-[#D4AF37]/30 selection:text-[#1D1D1F] relative overflow-hidden pb-20">
      
      {/* 🌟 Apple Liquid Glass Arka Plan Işık Küreleri (Glow Orbs) */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 to-amber-200/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-40 w-[700px] h-[700px] bg-gradient-to-tl from-rose-200/20 via-sky-100/30 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 📍 HEADING NAVBAR: Streamlined & Liquid Glass Mega Nav */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1D1D1F] group-hover:opacity-80 transition-opacity">
              WedyPlan<span className="text-[#D4AF37]">.</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-white/80 border border-black/5 text-[#1D1D1F] px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md">
              Glass Edition
            </span>
          </Link>

          {/* Düzeltilmiş Düzenli Navigasyon Menüsü */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/[0.03] p-1.5 rounded-full border border-black/[0.04] text-[13px] font-medium text-[#555]">
            <Link href="/mekanlar" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm transition-all">Düğün Mekanları</Link>
            <Link href="/firmalar" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm transition-all">Tedarikçiler</Link>
            <Link href="/kampanyalar" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm transition-all flex items-center gap-1 text-red-600">
              <Percent className="w-3.5 h-3.5" /> Fırsatlar
            </Link>
            <Link href="/gercek-dugunler" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm transition-all">Hikayeler</Link>
            <Link href="/ilham" className="px-4 py-2 rounded-full hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm transition-all">İlham</Link>
          </nav>

          {/* Çift Araçları ve B2B Portalı */}
          <div className="flex items-center gap-3">
            <Link href="/firma/dashboard" className="hidden sm:inline-flex text-[12px] font-medium px-4 py-2 rounded-full bg-white/80 border border-black/10 hover:bg-white transition-all shadow-sm">
              Kurumsal Portal
            </Link>

            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white hover:bg-black transition-all shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>WedyAI Asistan</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 🚀 HERO SECTION: Liquid Glass Aesthetic */}
      <section className="relative pt-12 pb-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur-xl border border-white/80 rounded-full text-[12px] font-medium text-[#1D1D1F] shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Türkiye'nin İlk Liquid Glass Yapay Zeka Düğün Platformu</span>
          </div>

          <h1 className="text-[44px] sm:text-[60px] md:text-[72px] font-serif font-normal tracking-tight text-[#1D1D1F] leading-[1.08]">
            Kusursuz Bir Düğün İçin <br />
            <span className="bg-gradient-to-r from-[#1D1D1F] via-[#D4AF37] to-[#B8952B] bg-clip-text text-transparent italic">
              Akıllı ve Şeffaf Keşif
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#6E6E73] max-w-[620px] mx-auto font-light leading-relaxed">
            Mekanları şeffaf fiyatlarla karşılaştırın, yapay zeka ile bütçenizi yönetin ve tek tıkla dijital davetiyenizi oluşturun.
          </p>

          {/* 🔍 LIQUID GLASS INTERACTIVE SEARCH & CALCULATOR WIDGET */}
          <div className="mt-10 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[36px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] max-w-[950px] mx-auto text-left space-y-6 relative">
            
            {/* Üst Arama Filtreleri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 border-b border-black/[0.06]">
              
              <div className="space-y-1 px-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Şehir / Lokasyon
                </label>
                <select 
                  value={selectedCity} 
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent font-medium text-[#1D1D1F] text-[15px] outline-none cursor-pointer"
                >
                  <option value="istanbul">İstanbul (Tümü)</option>
                  <option value="izmir">İzmir</option>
                  <option value="ankara">Ankara</option>
                  <option value="bodrum">Muğla / Bodrum</option>
                </select>
              </div>

              <div className="space-y-1 px-3 border-t sm:border-t-0 sm:border-l border-black/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Hizmet Kriteri
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent font-medium text-[#1D1D1F] text-[15px] outline-none cursor-pointer"
                >
                  <option value="kir-dugunu">Kır Düğünü Mekanı</option>
                  <option value="otel">Lüks Düğün Oteli</option>
                  <option value="tarihi-mekan">Tarihi Yalı / Mekan</option>
                  <option value="fotograf">Düğün Fotoğrafçısı</option>
                </select>
              </div>

              <div className="space-y-1 px-3 border-t md:border-t-0 md:border-l border-black/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Davetli Sayısı
                </label>
                <select 
                  value={guestCount} 
                  onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full bg-transparent font-medium text-[#1D1D1F] text-[15px] outline-none cursor-pointer"
                >
                  <option value={100}>100 Kişi (Butik)</option>
                  <option value={250}>250 Kişi (Standart)</option>
                  <option value={500}>500 Kişi (Görkemli)</option>
                  <option value={750}>750+ Kişi</option>
                </select>
              </div>

            </div>

            {/* Alt İnteraktif Bütçe Sürgüsü & Canlı Sonuç */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
              <div className="w-full md:w-2/3 space-y-2">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-semibold text-[#86868B] flex items-center gap-1">
                    <Calculator className="w-4 h-4 text-[#D4AF37]" /> Tahmini Bütçeniz:
                  </span>
                  <span className="font-mono font-bold text-[16px] text-[#1D1D1F] bg-white/80 px-3 py-1 rounded-full border border-black/5">
                    {estimatedBudget.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <input 
                  type="range" 
                  min={100000} 
                  max={1000000} 
                  step={25000}
                  value={estimatedBudget}
                  onChange={e => setEstimatedBudget(Number(e.target.value))}
                  className="w-full accent-[#1D1D1F] cursor-pointer"
                />
              </div>

              <div className="w-full md:w-auto shrink-0">
                <Link href={`/mekanlar?kategori=${selectedCategory}&sehir=${selectedCity}`}>
                  <button className="w-full md:w-auto h-[54px] px-8 bg-[#1D1D1F] hover:bg-black text-white rounded-full font-medium text-[14px] flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105">
                    <Search className="w-4 h-4 text-[#D4AF37]" />
                    <span>{matchedVenuesCount} Mekan Bul</span>
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🎯 İNTERAKTİF RENK PALETİ TEST ETME WIDGET'I (Liquid Glass Cam Kartı) */}
      <section className="py-12 max-w-[1300px] mx-auto px-6">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[36px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">İnteraktif Tasarım Deneyimi</span>
            <h3 className="text-[28px] font-serif font-normal text-[#1D1D1F]">Düğün Konseptinizi Canlı Test Edin</h3>
            <p className="text-[13px] text-[#6E6E73] font-light leading-relaxed">
              Düğününüz için hayal ettiğiniz konsepti seçin, renk paletinin canlı cam kartlar üzerindeki duruşunu görün.
            </p>

            <div className="flex gap-2 pt-2">
              {Object.keys(themes).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                    activeTheme === key ? 'bg-[#1D1D1F] text-white shadow-md' : 'bg-white/80 text-[#555] hover:bg-white'
                  }`}
                >
                  {themes[key as keyof typeof themes].name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 bg-white/80 backdrop-blur-xl border border-white/90 p-6 rounded-[28px] shadow-sm space-y-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-serif font-semibold text-[#1D1D1F]">
                {themes[activeTheme as keyof typeof themes].name} Paleti
              </span>
              <Link href="/ilham" className="text-[12px] text-[#D4AF37] font-bold hover:underline">
                Tüm Paletleri Gör →
              </Link>
            </div>

            <div className="flex h-16 w-full rounded-2xl overflow-hidden shadow-inner">
              {themes[activeTheme as keyof typeof themes].colors.map((c, idx) => (
                <div key={idx} className="flex-1 flex items-end justify-center pb-2 group relative" style={{ backgroundColor: c }}>
                  <span className="text-white text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 🏰 PLANLAMA ARAÇLARI WORKSPACE (Çift Kontrol Panelleri Bağlantısı) */}
      <section className="py-12 max-w-[1300px] mx-auto px-6 space-y-8">
        <div>
          <h2 className="text-[32px] font-serif font-normal text-[#1D1D1F]">Kusursuz Planlama Workspace</h2>
          <p className="text-[14px] text-[#6E6E73]">Düğününüzün tüm operasyonunu tek ekrandan yönetin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bütçe */}
          <Link href="/cift/butce" className="bg-white/60 backdrop-blur-2xl border border-white/80 p-6 rounded-[28px] hover:border-black/20 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#1D1D1F]">Bütçe Yönetimi</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">Harcanan ve kalan limitinizi yapay zeka analiziyle takip edin.</p>
            </div>
            <span className="text-[12px] font-bold text-[#1D1D1F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Bütçeyi Aç <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Davetli */}
          <Link href="/cift/davetliler" className="bg-white/60 backdrop-blur-2xl border border-white/80 p-6 rounded-[28px] hover:border-black/20 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#1D1D1F]">Davetli & Masa Düzeni</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">LCV durumlarını toplayın, masa oturma düzenini oluşturun.</p>
            </div>
            <span className="text-[12px] font-bold text-[#1D1D1F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Davetlileri Yönet <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Dijital Davetiye */}
          <Link href="/cift/dijital-davetiye" className="bg-white/60 backdrop-blur-2xl border border-white/80 p-6 rounded-[28px] hover:border-black/20 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#1D1D1F]">Dijital Web Davetiyesi</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">Özel düğün linkinizi oluşturun, RSVP yanıtlarını otomatik alın.</p>
            </div>
            <span className="text-[12px] font-bold text-[#1D1D1F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Davetiye Tasarla <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

        </div>
      </section>

      {/* 📜 LIQUID GLASS FOOTER */}
      <footer className="bg-white/80 backdrop-blur-2xl border-t border-black/[0.06] pt-16 pb-8 text-[13px] text-[#6E6E73] mt-16">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-black/[0.06] pb-12 mb-8">
          <div>
            <span className="font-serif text-2xl font-bold text-[#1D1D1F] block mb-3">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <p className="font-light leading-relaxed">Apple Liquid Glass mimarisi ve yapay zeka ile geliştirilen yeni nesil düğün platformu.</p>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-semibold mb-3">Keşif</h4>
            <ul className="space-y-2">
              <li><Link href="/mekanlar" className="hover:text-[#1D1D1F]">Düğün Mekanları</Link></li>
              <li><Link href="/firmalar" className="hover:text-[#1D1D1F]">Tedarikçiler</Link></li>
              <li><Link href="/kampanyalar" className="hover:text-[#1D1D1F]">Kampanyalar</Link></li>
              <li><Link href="/gercek-dugunler" className="hover:text-[#1D1D1F]">Gerçek Düğünler</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-semibold mb-3">Çift Araçları</h4>
            <ul className="space-y-2">
              <li><Link href="/cift/butce" className="hover:text-[#1D1D1F]">Bütçe Yönetimi</Link></li>
              <li><Link href="/cift/davetliler" className="hover:text-[#1D1D1F]">Davetli Listesi</Link></li>
              <li><Link href="/cift/fotograf-duvari" className="hover:text-[#1D1D1F]">Canlı Fotoğraf Duvarı</Link></li>
              <li><Link href="/cift/odeme" className="hover:text-[#1D1D1F]">Güvenli Ödeme & POS</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-semibold mb-3">Kurumsal</h4>
            <ul className="space-y-2">
              <li><Link href="/firma/dashboard" className="hover:text-[#1D1D1F]">Firma Kontrol Paneli</Link></li>
              <li><Link href="/cift/ai-asistan" className="hover:text-[#1D1D1F]">WedyAI Concierge</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1300px] mx-auto px-6 text-center text-[12px]">
          © 2026 WedyPlan Inc. Tüm hakları saklıdır.
        </div>
      </footer>

    </div>
  );
}