'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Users, Star, Building2, Sparkles, Camera, Music, Shirt, 
  Heart, ChevronRight, Percent, Calculator, ArrowRight, ShieldCheck, 
  SlidersHorizontal, CheckCircle2, Globe, FileText, QrCode, Play, Palette
} from 'lucide-react';

export default function WedyPlanPureGlassHome() {
  // Arama & İnteraktif Hesaplayıcı State'leri
  const [selectedCity, setSelectedCity] = useState('istanbul');
  const [selectedCategory, setSelectedCategory] = useState('kir-dugunu');
  const [guestCount, setGuestCount] = useState(250);
  const [estimatedBudget, setEstimatedBudget] = useState(350000);

  // Renk Paleti Test Etme Widget State'i
  const [activeTheme, setActiveTheme] = useState('boho');

  const themes = {
    boho: { name: 'Rustik & Bohem', colors: ['#8B5A2B', '#C5A059', '#EEDC82', '#4A5D4E'] },
    glamour: { name: 'Boğaz & Lüks Gold', colors: ['#2C2C2E', '#D4AF37', '#F5F5F7', '#E5E5E5'] },
    romantic: { name: 'Pastel Pembe & Çiçek', colors: ['#E8C5C8', '#F4E1D2', '#B5E2FA', '#EDF6F9'] }
  };

  // Dinamik Eşleşen Mekan Sayısı
  const matchedVenuesCount = Math.max(12, Math.floor((estimatedBudget / 1000) * (guestCount / 100) / 12));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F4F5F0] to-[#F0F2F5] text-[#2C2C2E] font-sans selection:bg-[#D4AF37]/20 selection:text-[#2C2C2E] relative overflow-hidden pb-20">
      
      {/* 🌟 Şeffaf Cam Derinliği Veren Sıcak Arka Plan Işık Alanları */}
      <div className="fixed -top-32 -left-32 w-[650px] h-[650px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-32 w-[700px] h-[700px] bg-rose-200/25 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed -bottom-40 left-1/3 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* 📍 SAF ŞEFFAF CAM NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2C2C2E] group-hover:opacity-80 transition-opacity">
              WedyPlan<span className="text-[#D4AF37]">.</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-white/70 border border-white/80 text-[#2C2C2E] px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md">
              Pure Glass
            </span>
          </Link>

          {/* Navigasyon Menüsü */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-xl p-1.5 rounded-full border border-white/70 shadow-sm text-[13px] font-medium text-[#555]">
            <Link href="/mekanlar" className="px-4 py-2 rounded-full hover:bg-white/80 hover:text-[#2C2C2E] transition-all">Düğün Mekanları</Link>
            <Link href="/firmalar" className="px-4 py-2 rounded-full hover:bg-white/80 hover:text-[#2C2C2E] transition-all">Tedarikçiler</Link>
            <Link href="/kampanyalar" className="px-4 py-2 rounded-full hover:bg-white/80 hover:text-[#2C2C2E] transition-all flex items-center gap-1 text-red-600">
              <Percent className="w-3.5 h-3.5" /> Fırsatlar
            </Link>
            <Link href="/gercek-dugunler" className="px-4 py-2 rounded-full hover:bg-white/80 hover:text-[#2C2C2E] transition-all">Hikayeler</Link>
            <Link href="/ilham" className="px-4 py-2 rounded-full hover:bg-white/80 hover:text-[#2C2C2E] transition-all">İlham</Link>
          </nav>

          {/* Çift Araçları ve Kurumsal Portal */}
          <div className="flex items-center gap-3">
            <Link href="/firma/dashboard" className="hidden sm:inline-flex text-[12px] font-medium px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white transition-all shadow-sm">
              Kurumsal Portal
            </Link>

            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-white/80 border border-white/90 text-[#2C2C2E] hover:bg-white transition-all shadow-[0_8px_25px_rgba(0,0,0,0.06)] backdrop-blur-xl flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>WedyAI Asistan</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 🚀 HERO SECTION: Frosted Glass & Light Aesthetic */}
      <section className="relative pt-12 pb-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-2xl border border-white/80 rounded-full text-[12px] font-medium text-[#2C2C2E] shadow-[0_10px_25px_rgba(0,0,0,0.03)]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Şeffaf Akıllı Düğün & Mekan Portalı</span>
          </div>

          <h1 className="text-[44px] sm:text-[60px] md:text-[72px] font-serif font-normal tracking-tight text-[#2C2C2E] leading-[1.08]">
            Hayalinizdeki Düğünü <br />
            <span className="bg-gradient-to-r from-[#2C2C2E] via-[#B8952B] to-[#D4AF37] bg-clip-text text-transparent italic">
              Cam Şeffaflığında
            </span> Keşfedin
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#6E6E73] max-w-[620px] mx-auto font-light leading-relaxed">
            Mekanları detaylıca karşılaştırın, yapay zeka ile bütçenizi yönetin ve şeffaf cam estetiğindeki araçlarımızla düğününüzü tasarlayın.
          </p>

          {/* 🔍 PURE FROSTED GLASS SEARCH & CALCULATOR WIDGET */}
          <div className="mt-10 bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[38px] p-6 shadow-[0_20px_60px_rgba(31,38,135,0.06)] max-w-[950px] mx-auto text-left space-y-6 relative">
            
            {/* Üst Arama Filtreleri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4 border-b border-black/[0.05]">
              
              <div className="space-y-1 px-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Şehir / Bölge
                </label>
                <select 
                  value={selectedCity} 
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent font-medium text-[#2C2C2E] text-[15px] outline-none cursor-pointer"
                >
                  <option value="istanbul">İstanbul (Tümü)</option>
                  <option value="izmir">İzmir</option>
                  <option value="ankara">Ankara</option>
                  <option value="bodrum">Muğla / Bodrum</option>
                </select>
              </div>

              <div className="space-y-1 px-3 border-t sm:border-t-0 sm:border-l border-black/[0.05]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Hizmet Türü
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent font-medium text-[#2C2C2E] text-[15px] outline-none cursor-pointer"
                >
                  <option value="kir-dugunu">Kır Düğünü Mekanı</option>
                  <option value="otel">Lüks Düğün Oteli</option>
                  <option value="tarihi-mekan">Tarihi Yalı / Mekan</option>
                  <option value="fotograf">Düğün Fotoğrafçısı</option>
                </select>
              </div>

              <div className="space-y-1 px-3 border-t md:border-t-0 md:border-l border-black/[0.05]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Davetli Kapasitesi
                </label>
                <select 
                  value={guestCount} 
                  onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full bg-transparent font-medium text-[#2C2C2E] text-[15px] outline-none cursor-pointer"
                >
                  <option value={100}>100 Kişi (Butik)</option>
                  <option value={250}>250 Kişi (Standart)</option>
                  <option value={500}>500 Kişi (Görkemli)</option>
                  <option value={750}>750+ Kişi</option>
                </select>
              </div>

            </div>

            {/* Alt Bütçe Sürgüsü & Canlı Arama Butonu */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
              <div className="w-full md:w-2/3 space-y-2">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-semibold text-[#86868B] flex items-center gap-1">
                    <Calculator className="w-4 h-4 text-[#D4AF37]" /> Tahmini Düğün Bütçeniz:
                  </span>
                  <span className="font-mono font-bold text-[15px] text-[#2C2C2E] bg-white/70 px-3 py-1 rounded-full border border-white/80 shadow-sm">
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
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div className="w-full md:w-auto shrink-0">
                <Link href={`/mekanlar?kategori=${selectedCategory}&sehir=${selectedCity}`}>
                  <button className="w-full md:w-auto h-[54px] px-8 bg-white/80 hover:bg-white backdrop-blur-xl border border-white text-[#2C2C2E] rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:scale-105">
                    <Search className="w-4 h-4 text-[#D4AF37]" />
                    <span>{matchedVenuesCount} Mekan Listele</span>
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🎨 İNTERAKTİF RENK PALETİ TEST KARTI (Şeffaf Cam Tasarım) */}
      <section className="py-10 max-w-[1300px] mx-auto px-6">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[36px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">İnteraktif Renk Deneyimi</span>
            <h3 className="text-[28px] font-serif font-normal text-[#2C2C2E]">Düğün Tema Renklerini Test Edin</h3>
            <p className="text-[13px] text-[#6E6E73] font-light leading-relaxed">
              Konseptinizi seçin, cam katmanlar üzerindeki uyumlu renk paletlerini anında görüntüleyin.
            </p>

            <div className="flex gap-2 pt-2">
              {Object.keys(themes).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                    activeTheme === key 
                      ? 'bg-white text-[#2C2C2E] shadow-md border border-white' 
                      : 'bg-white/30 text-[#6E6E73] hover:bg-white/60'
                  }`}
                >
                  {themes[key as keyof typeof themes].name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 bg-white/60 backdrop-blur-xl border border-white/90 p-6 rounded-[28px] shadow-sm space-y-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-serif font-semibold text-[#2C2C2E]">
                {themes[activeTheme as keyof typeof themes].name} Paleti
              </span>
              <Link href="/ilham" className="text-[12px] text-[#D4AF37] font-bold hover:underline">
                İlham Panosuna Git →
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

      {/* 🏰 WORKSPACE: Çift Yönetim Panelleri Cam Kartları */}
      <section className="py-12 max-w-[1300px] mx-auto px-6 space-y-8">
        <div>
          <h2 className="text-[32px] font-serif font-normal text-[#2C2C2E]">Planlama Araçları Workspace</h2>
          <p className="text-[14px] text-[#6E6E73]">Düğün hazırlıklarınızı şeffaf cam modüllerimizle yönetin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bütçe */}
          <Link href="/cift/butce" className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[30px] hover:bg-white/70 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#2C2C2E]">Bütçe Yönetimi</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">Harcamalarınızı kategorize edin, kalan limitinizi anında görün.</p>
            </div>
            <span className="text-[12px] font-bold text-[#2C2C2E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Bütçe Paneline Git <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Davetli */}
          <Link href="/cift/davetliler" className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[30px] hover:bg-white/70 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#2C2C2E]">Davetli & Masa Düzeni</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">Katılım durumlarını takip edin, oturma düzenini ayarlayın.</p>
            </div>
            <span className="text-[12px] font-bold text-[#2C2C2E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Davetlileri Düzenle <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Dijital Davetiye */}
          <Link href="/cift/dijital-davetiye" className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[30px] hover:bg-white/70 hover:shadow-xl transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-medium text-[#2C2C2E]">Dijital Web Davetiyesi</h3>
              <p className="text-[13px] text-[#6E6E73] mt-1">Kendi düğün sitenizi tasarlayın, WhatsApp ile paylaşın.</p>
            </div>
            <span className="text-[12px] font-bold text-[#2C2C2E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Davetiye Oluştur <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

        </div>
      </section>

      {/* 📜 ŞEFFAF CAM FOOTER */}
      <footer className="bg-white/50 backdrop-blur-2xl border-t border-white/80 pt-16 pb-8 text-[13px] text-[#6E6E73] mt-16">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-black/[0.05] pb-12 mb-8">
          <div>
            <span className="font-serif text-2xl font-bold text-[#2C2C2E] block mb-3">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <p className="font-light leading-relaxed">Saf buzlu cam estetiği ve yapay zeka ile geliştirilen yeni nesil düğün platformu.</p>
          </div>
          <div>
            <h4 className="text-[#2C2C2E] font-semibold mb-3">Keşfet</h4>
            <ul className="space-y-2">
              <li><Link href="/mekanlar" className="hover:text-[#2C2C2E]">Düğün Mekanları</Link></li>
              <li><Link href="/firmalar" className="hover:text-[#2C2C2E]">Tedarikçiler</Link></li>
              <li><Link href="/kampanyalar" className="hover:text-[#2C2C2E]">Kampanyalar</Link></li>
              <li><Link href="/gercek-dugunler" className="hover:text-[#2C2C2E]">Gerçek Düğünler</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#2C2C2E] font-semibold mb-3">Çift Araçları</h4>
            <ul className="space-y-2">
              <li><Link href="/cift/butce" className="hover:text-[#2C2C2E]">Bütçe Yönetimi</Link></li>
              <li><Link href="/cift/davetliler" className="hover:text-[#2C2C2E]">Davetli Listesi</Link></li>
              <li><Link href="/cift/fotograf-duvari" className="hover:text-[#2C2C2E]">Canlı Fotoğraf Duvarı</Link></li>
              <li><Link href="/cift/odeme" className="hover:text-[#2C2C2E]">Güvenli Ödeme & POS</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#2C2C2E] font-semibold mb-3">Kurumsal</h4>
            <ul className="space-y-2">
              <li><Link href="/firma/dashboard" className="hover:text-[#2C2C2E]">Firma Kontrol Paneli</Link></li>
              <li><Link href="/cift/ai-asistan" className="hover:text-[#2C2C2E]">WedyAI Concierge</Link></li>
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