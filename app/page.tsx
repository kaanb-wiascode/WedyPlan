import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calculator, Users, Globe, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { GlassButton } from '@/components/atoms/GlassButton';
import { GlassCard } from '@/components/atoms/GlassCard';
import { HeroSearchGlass } from '@/components/organisms/HeroSearchGlass';
import { ThemeSectionWrapper } from '@/components/molecules/ThemeSectionWrapper';

export const metadata = {
  title: `${APP_CONFIG.BRAND_NAME} | ${APP_CONFIG.MARKETING_SLOGAN}`,
  description: 'Türkiye\'nin ilk yapay zeka destekli, şeffaf ve stressiz düğün planlama platformu.',
};

export default function WedyPlanHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-[#F1F3F6] to-[#E9ECF0] text-[#1D1D1F] font-sans selection:bg-[#D4AF37]/30 pb-20 relative overflow-hidden">
      
      {/* Pure CSS Arka Plan Işık Efektleri */}
      <div className="fixed -top-40 -left-40 w-[650px] h-[650px] bg-[#D4AF37]/15 rounded-full blur-[150px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed top-1/3 -right-40 w-[700px] h-[700px] bg-rose-200/25 rounded-full blur-[170px] pointer-events-none -z-10" aria-hidden="true" />
      
      {/* Header (Server Side Rendered) */}
      <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-3xl border-b border-white/60">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#1D1D1F]" aria-label="Ana Sayfaya Git">
            {APP_CONFIG.BRAND_NAME}<span className="text-[#D4AF37]">.</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/30 backdrop-blur-2xl p-1.5 rounded-full border border-white/80 shadow-sm" aria-label="Ana Menü">
            <Link href="/mekanlar" className="px-5 py-2.5 rounded-full hover:bg-white/70 text-[13px] font-medium transition-colors">Onaylı Mekanlar</Link>
            <Link href="/firmalar" className="px-5 py-2.5 rounded-full hover:bg-white/70 text-[13px] font-medium transition-colors">VIP Tedarikçiler</Link>
            <Link href="/kampanyalar" className="px-5 py-2.5 rounded-full hover:bg-white/70 text-[13px] font-bold text-red-600 transition-colors">Erken Rezervasyon</Link>
          </nav>
          <Link href="/cift/ai-asistan" passHref>
            <GlassButton variant="gold">Yapay Zeka Asistanı</GlassButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/50 backdrop-blur-2xl border border-white/80 rounded-full text-[12px] font-semibold text-[#1D1D1F]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Şeffaf Fiyatlar. Sıfır Sürpriz Maliyet.</span>
        </div>
        
        <h1 className="text-[44px] sm:text-[60px] md:text-[72px] font-serif tracking-tight text-[#1D1D1F] leading-[1.08] max-w-[900px] mx-auto">
          Hayalinizdeki Düğünü <br />
          <span className="bg-gradient-to-r from-[#1D1D1F] via-[#B8952B] to-[#D4AF37] bg-clip-text text-transparent italic">
            Yapay Zeka Şeffaflığıyla
          </span> Planlayın
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#6E6E73] max-w-[620px] mx-auto font-light leading-relaxed">
          Stres dolu Excel dosyalarını çöpe atın. Mekanları karşılaştırın, bütçenizi yönetin ve kusursuz günü WedyAI asistanınızla inşa edin.
        </p>

        {/* Client Component: Doğrudan Import */}
        <HeroSearchGlass />
      </section>

      {/* Tema Seçici Section */}
      <section className="py-10 max-w-[1300px] mx-auto px-6">
        <ThemeSectionWrapper />
      </section>

      {/* Planlama Araçları Workspace */}
      <section className="py-16 max-w-[1300px] mx-auto px-6 space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-[32px] md:text-[36px] font-serif text-[#1D1D1F]">Planlama Merkezine Hoş Geldiniz</h2>
          <p className="text-[14px] text-[#6E6E73]">İhtiyacınız olan tüm profesyonel araçlar tek bir şeffaf panelde.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              href: '/cift/butce',
              icon: Calculator,
              title: 'Akıllı Bütçe Yönetimi',
              desc: 'Giderlerinizi otomatik kategorize edin, aşım uyarılarıyla bütçenizi güvenceye alın.',
              cta: 'Bütçe Planını Gör'
            },
            {
              href: '/cift/davetliler',
              icon: Users,
              title: 'Davetli & Oturma Düzeni',
              desc: 'LCV yanıtlarını dijital toplayın, sürükle-bırak ile masa düzenini saniyeler içinde kurun.',
              cta: 'Listeni Yönet'
            },
            {
              href: '/cift/dijital-davetiye',
              icon: Globe,
              title: 'Dijital Davetiye (RSVP)',
              desc: 'Çevre dostu, mobil uyumlu ve şık tasarım şablonlarıyla kendi düğün sitenizi yayınlayın.',
              cta: 'Siteni Tasarla'
            }
          ].map((tool, idx) => (
            <Link key={idx} href={tool.href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-[32px]">
              <GlassCard interactive as="article" className="h-full p-8 space-y-5">
                <div className="w-14 h-14 rounded-[20px] bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300">
                  <tool.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-[22px] font-medium mb-2">{tool.title}</h3>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{tool.desc}</p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1D1D1F] bg-white/50 px-4 py-2 rounded-full border border-white/80 group-hover:bg-white transition-colors">
                    {tool.cta} <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}