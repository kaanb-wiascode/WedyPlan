'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, Calendar, Sparkles, ArrowRight, Camera, MapPin, Music } from 'lucide-react';

export default function PremiumHomePage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#7C5CFF] selection:text-white font-sans">
      
      {/* Navigation (Minimal, Crisp, Sticky) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] text-[#666666] font-medium">
            <Link href="/arama" className="hover:text-[#111111] transition-colors duration-300">Keşfet</Link>
            <Link href="/kontrol-listesi" className="hover:text-[#111111] transition-colors duration-300">Planlama</Link>
            <Link href="/hediye-listesi" className="hover:text-[#111111] transition-colors duration-300">Kayıtlar</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[15px] font-medium text-[#111111] hover:text-[#666666] transition-colors">
              Giriş
            </Link>
            <Link 
              href="/satici" 
              className="bg-[#111111] text-white text-[15px] font-medium h-[44px] px-6 rounded-[14px] flex items-center justify-center hover:bg-[#333333] transition-colors duration-300"
            >
              İş Ortağı Ol
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Apple-like, Centered, Huge Typography) */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C5CFF] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)] mb-8">
          <Sparkles className="w-4 h-4 text-[#7C5CFF]" strokeWidth={2} />
          <span className="text-[13px] font-medium text-[#666666]">Yeni nesil düğün asistanı ile tanışın.</span>
        </div>

        <h1 className="text-[56px] md:text-[72px] font-medium tracking-tight leading-[1.05] max-w-[800px]">
          Hayalinizdeki günü <br className="hidden md:block"/> zahmetsizce tasarlayın.
        </h1>
        
        <p className="mt-6 text-[18px] md:text-[22px] text-[#666666] max-w-[600px] font-normal leading-relaxed">
          Zamanın ötesinde bir kutlama için ihtiyacınız olan mekanlar, 
          profesyoneller ve planlama araçları tek bir zarif ekosistemde.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/arama"
            className="w-full sm:w-auto h-[56px] px-8 bg-[#7C5CFF] text-white rounded-[18px] text-[18px] font-medium flex items-center justify-center gap-2 hover:bg-[#6A4FE0] transition-colors duration-300 shadow-[0_8px_40px_rgba(124,92,255,0.2)]"
          >
            Planlamaya Başla <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/ai-asistan"
            className="w-full sm:w-auto h-[56px] px-8 bg-[#F8F8F7] text-[#111111] rounded-[18px] text-[18px] font-medium flex items-center justify-center hover:bg-[#F0F0F0] transition-colors duration-300"
          >
            WedyAI ile Konuş
          </Link>
        </div>

        {/* Minimal Search Input Simulation */}
        <div className="mt-20 w-full max-w-[700px] bg-white rounded-[28px] p-2 border border-[rgba(0,0,0,0.08)] shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 h-[56px] w-full">
            <Search className="w-5 h-5 text-[#666666]" />
            <input 
              type="text" 
              placeholder="Mekan, fotoğrafçı veya şehir arayın..." 
              className="w-full bg-transparent border-none outline-none text-[18px] text-[#111111] placeholder:text-[#999999]"
            />
          </div>
          <button className="w-full md:w-auto h-[56px] px-8 bg-[#111111] text-white rounded-[18px] text-[15px] font-medium hover:bg-[#333333] transition-colors duration-300">
            Arama Yap
          </button>
        </div>
      </section>

      {/* Editorial Image Showcase */}
      <section className="max-w-[1200px] mx-auto px-6 pb-32">
        <div className="relative w-full aspect-[21/9] md:aspect-[21/7] rounded-[28px] overflow-hidden bg-[#F8F8F7]">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop" 
            alt="Zarif düğün tasarımı" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </section>

      {/* Feature Cards (Linear/Stripe style) */}
      <section className="bg-[#F8F8F7] py-32 px-6 border-t border-[rgba(0,0,0,0.04)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-[36px] font-medium tracking-tight text-[#111111]">
              Her detay, kusursuzca tasarlandı.
            </h2>
            <p className="text-[18px] text-[#666666] mt-4 max-w-[500px]">
              Düğün planlamanın karmaşasını ortadan kaldıran, 
              size sadece anın tadını çıkarmayı bırakan akıllı araçlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-[28px] border border-[rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#7C5CFF]/10 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-[#7C5CFF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-medium mb-3">Akıllı Planlama</h3>
              <p className="text-[15px] text-[#666666] leading-relaxed">
                Davetli listenizi, oturma düzeninizi ve düğün günü akışınızı sezgisel bir arayüzle saniyeler içinde oluşturun.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[28px] border border-[rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#7C5CFF]/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-[#7C5CFF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-medium mb-3">Kişisel Web Sitesi</h3>
              <p className="text-[15px] text-[#666666] leading-relaxed">
                Hikayenizi anlatan, davetlilerinizden dijital LCV toplayan zarif ve tamamen size özel bir düğün web sitesi yayınlayın.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[28px] border border-[rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#7C5CFF]/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#7C5CFF]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-medium mb-3">Seçkin Mekanlar</h3>
              <p className="text-[15px] text-[#666666] leading-relaxed">
                Şehrin en premium mekanlarını ve yaratıcı profesyonellerini şeffaf fiyatlarla keşfedin ve doğrudan iletişim kurun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Directory (Minimalist List) */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto">
        <h2 className="text-[36px] font-medium tracking-tight mb-12">Kusursuz ekibi kurun.</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Kır Bahçeleri', icon: MapPin },
            { name: 'Fotoğraf Sanatçıları', icon: Camera },
            { name: 'Orkestra & DJ', icon: Music },
            { name: 'Moda Evleri', icon: Heart },
          ].map((cat, i) => (
            <Link 
              key={i} 
              href="/arama" 
              className="group flex flex-col items-center justify-center h-[160px] bg-[#F8F8F7] rounded-[28px] border border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0EF] transition-colors duration-300"
            >
              <cat.icon className="w-8 h-8 text-[#111111] mb-4 opacity-60 group-hover:opacity-100 group-hover:text-[#7C5CFF] transition-all" strokeWidth={1.5} />
              <span className="text-[15px] font-medium text-[#111111]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[rgba(0,0,0,0.06)] py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[22px] font-medium tracking-tight text-[#111111]">
            WedyPlan.
          </div>
          <div className="flex gap-8 text-[15px] text-[#666666]">
            <Link href="#" className="hover:text-[#111111] transition-colors">Gizlilik</Link>
            <Link href="#" className="hover:text-[#111111] transition-colors">Şartlar</Link>
            <Link href="#" className="hover:text-[#111111] transition-colors">İletişim</Link>
          </div>
          <div className="text-[13px] text-[#999999]">
            © {new Date().getFullYear()} WedyPlan. Tasarımın zarafetiyle oluşturuldu.
          </div>
        </div>
      </footer>
    </div>
  );
}