'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Users, Star, Building2, Sparkles, Filter, 
  PhoneCall, SlidersHorizontal, ChevronRight, ShieldCheck, Percent
} from 'lucide-react';

export default function VenuesListingPage() {
  const [selectedCity, setSelectedCity] = useState('istanbul');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const filterFeaturesList = [
    { id: 'deniz', label: 'Deniz / Boğaz Manzaralı' },
    { id: 'alkolsuz', label: 'Alkolsüz Menü Seçeneği' },
    { id: 'otopark', label: 'Otopark & Vale Hizmeti' },
    { id: 'acilir-tavan', label: 'Açılır/Kapanır Tavan' },
    { id: 'after-party', label: 'After Party Alanı' },
  ];

  const mockVenues = [
    {
      id: '1',
      name: 'Beykoz Secret Garden & Event',
      category: 'kir-dugunu',
      categoryLabel: 'Kır Düğünü',
      location: 'Beykoz, İstanbul',
      rating: 4.9,
      reviewsCount: 128,
      capacity: '250 - 800 Kişi',
      pricePerGuest: 1200,
      oldPrice: 1500,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      badge: '%20 Erken Rezervasyon',
      isVip: true,
      features: ['deniz', 'otopark', 'after-party']
    },
    {
      id: '2',
      name: 'Bosphorus Palace Hotel',
      category: 'otel',
      categoryLabel: 'Lüks Otel / Yalı',
      location: 'Üsküdar, İstanbul',
      rating: 5.0,
      reviewsCount: 94,
      capacity: '100 - 450 Kişi',
      pricePerGuest: 2500,
      oldPrice: 3000,
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
      badge: 'VIP Boğaz Yalı Kampanyası',
      isVip: true,
      features: ['deniz', 'alkolsuz', 'otopark']
    }
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredVenues = mockVenues.filter(venue => {
    if (selectedCategory !== 'all' && venue.category !== selectedCategory) return false;
    if (venue.pricePerGuest > maxPrice) return false;
    if (selectedFeatures.length > 0 && !selectedFeatures.every(f => venue.features.includes(f))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-[#F1F3F6] to-[#E9ECF0] text-[#1D1D1F] font-sans selection:bg-[#D4AF37]/30 pb-20">
      
      {/* Liquid Glass Header */}
      <header className="sticky top-0 z-40 bg-white/30 backdrop-blur-3xl border-b border-white/60">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#1D1D1F]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-white/30 backdrop-blur-2xl p-1.5 rounded-full border border-white/80 text-[13px] font-medium text-[#444]">
            <Link href="/" className="px-4 py-2 rounded-full hover:bg-white/60 transition-all">Ana Sayfa</Link>
            <Link href="/mekanlar" className="px-4 py-2 rounded-full bg-white/80 font-bold text-[#1D1D1F]">Düğün Mekanları</Link>
            <Link href="/firmalar" className="px-4 py-2 rounded-full hover:bg-white/60 transition-all">Tedarikçiler</Link>
          </div>

          <Link href="/cift/ai-asistan" className="glass-btn-gold px-5 py-2.5 rounded-full text-[13px] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI Teklif İste
          </Link>
        </div>
      </header>

      {/* Hero Özet Barı */}
      <section className="bg-white/20 backdrop-blur-2xl border-b border-white/60 py-8">
        <div className="max-w-[1300px] mx-auto px-6">
          <h1 className="text-[28px] md:text-[34px] font-serif font-normal text-[#1D1D1F]">
            İstanbul Düğün Mekanları <span className="text-[16px] font-sans text-[#6E6E73]">({filteredVenues.length} Onaylı Mekan)</span>
          </h1>
        </div>
      </section>

      {/* Sol Filtre & Sağ Grid */}
      <div className="max-w-[1300px] mx-auto px-6 pt-8">
        <div className="flex gap-8 items-start">
          
          {/* Sol Cam Filtre Paneli */}
          <aside className="hidden lg:block w-[300px] glass-card rounded-[32px] p-6 sticky top-28 space-y-6 shrink-0">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="font-serif text-[18px] font-medium text-[#1D1D1F]">Filtreler</h3>
              <button onClick={() => { setSelectedCategory('all'); setSelectedFeatures([]); setMaxPrice(3000); }} className="text-[12px] text-[#6E6E73] underline">
                Sıfırla
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B]">Mekan Tipi</label>
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full h-11 glass-input px-3 text-[13px] font-medium"
              >
                <option value="all">Tüm Mekan Tipleri</option>
                <option value="kir-dugunu">Kır Düğünü</option>
                <option value="otel">Lüks Otel & Yalı</option>
              </select>
            </div>

            <div className="space-y-2 pt-2 border-t border-black/5">
              <div className="flex justify-between text-[12px]">
                <span className="font-bold uppercase tracking-wider text-[#86868B]">Maks. Kişi Başı</span>
                <span className="font-bold text-[#1D1D1F]">{maxPrice.toLocaleString('tr-TR')} ₺</span>
              </div>
              <input type="range" min="500" max="3500" step="100" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-[#D4AF37] cursor-pointer" />
            </div>

            <div className="space-y-3 pt-2 border-t border-black/5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] block">Özellikler</label>
              <div className="space-y-2">
                {filterFeaturesList.map(f => (
                  <label key={f.id} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer">
                    <input type="checkbox" checked={selectedFeatures.includes(f.id)} onChange={() => toggleFeature(f.id)} className="w-4 h-4 rounded border-white/80 accent-[#D4AF37]" />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Sağ Mekan Kartları Grid */}
          <main className="flex-1 space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVenues.map(v => (
                <div key={v.id} className="glass-card rounded-[32px] overflow-hidden hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="relative h-[220px] w-full overflow-hidden">
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {v.isVip && (
                        <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[#1D1D1F] text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white">
                          VIP Partner
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#86868B]">
                        <span className="uppercase font-semibold">{v.categoryLabel}</span>
                        <span className="flex items-center gap-1 font-bold text-[#1D1D1F]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {v.rating} ({v.reviewsCount})
                        </span>
                      </div>
                      <h3 className="text-[18px] font-serif font-medium text-[#1D1D1F] group-hover:text-[#D4AF37] transition-colors">{v.name}</h3>
                      <p className="text-[12px] text-[#6E6E73] flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-500" /> {v.location} • {v.capacity}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-black/5 mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#86868B] line-through block">{v.oldPrice} ₺</span>
                      <span className="text-[16px] font-bold text-[#1D1D1F]">{v.pricePerGuest} ₺ <span className="text-[10px] text-[#6E6E73] font-normal">/ kişi</span></span>
                    </div>

                    <Link href={`/mekanlar/${v.id}`}>
                      <button className="glass-btn-primary px-5 py-2.5 rounded-full text-[12px] flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Incele & Teklif Al</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </div>

    </div>
  );
}