import React from 'react';
import type { Metadata } from 'next';
import { PublicNavbar } from '@/components/public/homepage/PublicNavbar';
import { HeroSection } from '@/components/public/homepage/HeroSection';
import { AiValueProp } from '@/components/public/homepage/AiValueProp';
import { JourneySelector } from '@/components/public/homepage/JourneySelector';
import { CategoriesGrid } from '@/components/public/homepage/CategoriesGrid';
import { FeaturedVendors } from '@/components/public/homepage/FeaturedVendors';
import { PlatformFeaturesBento } from '@/components/public/homepage/PlatformFeaturesBento';
import { HowItWorks } from '@/components/public/homepage/HowItWorks';
import { SuccessMetrics } from '@/components/public/homepage/SuccessMetrics';
import { TestimonialsSection } from '@/components/public/homepage/TestimonialsSection';
import { FaqAccordion } from '@/components/public/homepage/FaqAccordion';
import { MobileAppCta } from '@/components/public/homepage/MobileAppCta';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';

export const metadata: Metadata = {
  title: 'WedyPlan — AI Powered Wedding Commerce Operating System',
  description: 'Hayalinizdeki düğünü WedyAI ile yönlendirin. Seçkin mekanlar, çakışmasız WOS takvimi ve güvenli e-imza sözleşmeler.',
  openGraph: {
    title: 'WedyPlan — AI Powered Wedding Commerce Operating System',
    description: 'Yapay zeka destekli düğün planlama ve işletim sistemi.',
    url: 'https://wedyplan.com',
    siteName: 'WedyPlan',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white overflow-hidden relative">
      {/* Global Ambient Sheen Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-pink-200/30 via-purple-100/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[600px] right-[-200px] w-[500px] h-[500px] bg-amber-100/20 blur-[140px] pointer-events-none -z-10" />

      {/* Floating Glass Navigation */}
      <PublicNavbar />

      {/* 12 Sections Sequence as per Specification */}
      <main>
        {/* 1. Premium Hero Section */}
        <HeroSection />

        {/* 2. AI-Powered Value Proposition */}
        <AiValueProp />

        {/* 3. Choose Your Journey (Couple / Vendor) */}
        <JourneySelector />

        {/* 4. Marketplace Categories */}
        <CategoriesGrid />

        {/* 5. Featured Vendors */}
        <FeaturedVendors />

        {/* 6. Platform Features (Bento Grid) */}
        <PlatformFeaturesBento />

        {/* 7. How It Works */}
        <HowItWorks />

        {/* 8. Success Metrics */}
        <SuccessMetrics />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. FAQ */}
        <FaqAccordion />

        {/* 11. Download Mobile App */}
        <MobileAppCta />
      </main>

      {/* 12. Footer */}
      <PublicFooter />
    </div>
  );
}