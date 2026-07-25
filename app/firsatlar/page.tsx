'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';

const DEALS = [
  { id: '1', vendor: 'Bosphorus Palace', category: 'Mekan', deal: '%15 Erken Rezervasyon', code: 'WEDY15', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' },
  { id: '2', vendor: 'Art & Motion Studios', category: 'Fotoğraf', deal: 'Hediye Dış Çekim Albümü', code: 'ARTWEDY', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600' },
];

export default function PremiumDealsPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#7C5CFF] bg-[#7C5CFF]/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" /> Özel Ayrıcalık Kulubü
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 pt-16">
        <header className="mb-16">
          <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
            Seçkin Ayrıcalıklar
          </h1>
          <p className="text-[18px] text-[#666666] max-w-[500px]">
            WedyPlan çiftlerine özel doğrulanmış indirimler ve ayrıcalıklı hizmet paketleri.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEALS.map((deal) => (
            <div key={deal.id} className="bg-white rounded-[28px] border border-[rgba(0,0,0,0.06)] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="h-[200px] relative overflow-hidden bg-[#F8F8F7]">
                <img src={deal.image} alt={deal.vendor} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-medium text-[#111111]">
                  {deal.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-[20px] font-medium text-[#111111]">{deal.vendor}</h3>
                  <p className="text-[15px] font-medium text-[#7C5CFF] mt-1">{deal.deal}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.04)]">
                  <span className="text-[13px] font-mono font-medium text-[#666666] bg-[#F8F8F7] px-3 py-1.5 rounded-[8px]">
                    KOD: {deal.code}
                  </span>
                  <Link href={`/firma/${deal.id}`} className="text-[14px] font-medium text-[#111111] hover:text-[#7C5CFF] flex items-center gap-1 transition-colors">
                    İncele <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}