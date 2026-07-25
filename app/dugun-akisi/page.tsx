'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Camera, 
  Music, 
  MapPin, 
  Utensils, 
  Sparkles 
} from 'lucide-react';

const ITINERARY = [
  { time: '10:00', title: 'Kuaför & Hazırlık', description: 'Gelin ve nedimeler için saç ve makyaj başlangıcı.', icon: Sparkles },
  { time: '14:00', title: 'İlk Buluşma (First Look)', description: 'Otel bahçesinde ilk karşılaşma ve dış çekim.', icon: Camera },
  { time: '16:30', title: 'Mekana Geçiş & Aile Fotoğrafları', description: 'Düğün mekanına varış ve aile üyeleriyle çekimler.', icon: MapPin },
  { time: '18:30', title: 'Kokteyl Karşılama', description: 'Misafirlerin alana alınması, trio müzik grubu eşliğinde.', icon: Music },
  { time: '19:45', title: 'Nikah Seremonisi', description: 'Gelin yolundan giriş ve nikah memurunun gelişi.', icon: Clock },
  { time: '20:30', title: 'Akşam Yemeği Servisi', description: 'Ana yemek servisi ve hafif arka plan müziği.', icon: Utensils },
];

export default function PremiumItineraryPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[800px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/kontrol-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Planlama</Link>
            <Link href="/dugun-akisi" className="text-[#7C5CFF]">Zaman Çizelgesi</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[800px] mx-auto px-6 pt-16">
        
        <header className="mb-16">
          <h1 className="text-[48px] font-medium tracking-tight leading-[1.05] mb-4">
            Düğün Günü Akışı
          </h1>
          <p className="text-[18px] text-[#666666]">
            O büyük günün kusursuz saatlik planı. 
          </p>
        </header>

        {/* Elegant Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[80px] md:left-[120px] top-4 bottom-4 w-[1px] bg-[rgba(0,0,0,0.06)]"></div>

          <div className="space-y-10">
            {ITINERARY.map((item, i) => (
              <div key={i} className="relative flex items-start gap-8 md:gap-12 group">
                
                {/* Time */}
                <div className="w-[60px] md:w-[90px] text-right shrink-0 mt-0.5">
                  <span className="text-[16px] font-medium text-[#111111]">{item.time}</span>
                </div>

                {/* Node / Icon */}
                <div className="absolute left-[80px] md:left-[120px] -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center group-hover:border-[#7C5CFF] group-hover:text-[#7C5CFF] transition-colors z-10">
                  <item.icon className="w-4 h-4 text-inherit" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white p-6 rounded-[20px] border border-[rgba(0,0,0,0.04)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-hover:border-[rgba(0,0,0,0.08)] transition-all">
                  <h3 className="text-[18px] font-medium text-[#111111] mb-2">{item.title}</h3>
                  <p className="text-[15px] text-[#666666] leading-relaxed">{item.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}