'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Deal {
  id: string;
  vendorName: string;
  category: string;
  city: string;
  title: string;
  description: string;
  discountBadge: string;
  code: string;
  expiryDate: string;
  imageUrl: string;
  claimedCount: number;
}

const DEALS: Deal[] = [
  {
    id: '1',
    vendorName: 'Bosphorus Palace Kır Bahçesi',
    category: 'Kır Bahçesi',
    city: 'İstanbul',
    title: 'Erken Rezervasyonda Net %20 İndirim!',
    description: 'Hafta içi ve Pazar kır düğünü organizasyonlarında geçerli özel WedyPlan indirimi.',
    discountBadge: '%20 İNDİRİM',
    code: 'WEDY20',
    expiryDate: '31 Ağustos 2026',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    claimedCount: 42,
  },
  {
    id: '2',
    vendorName: 'Art & Motion Wedding Photography',
    category: 'Fotoğrafçı',
    city: 'Ankara',
    title: 'Düğün Hikayesi Paketi Alana Drone Çekimi HEDİYE!',
    description: 'Tüm gün dış çekim paketlerinde geçerli, havadan 4K sinematik drone video hediyesi.',
    discountBadge: 'ÜCRETSİZ DRONE',
    code: 'WEDYDRONE',
    expiryDate: '15 Eylül 2026',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
    claimedCount: 28,
  },
  {
    id: '3',
    vendorName: 'Haute Couture Gelinlik & Modaevi',
    category: 'Gelinlik',
    city: 'İstanbul',
    title: 'Özel Dikim Gelinliklerde 5.000 TL Nakit İndirim',
    description: 'Sezonun en iddialı gelinlik modellerinde WedyPlan çiftlerine özel nakit kupon fırsatı.',
    discountBadge: '5.000 TL HEDİYE',
    code: 'GELIN5000',
    expiryDate: '30 Ekim 2026',
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800',
    claimedCount: 65,
  },
  {
    id: '4',
    vendorName: 'Ege Esintisi Düğün Salonu',
    category: 'Düğün Salonu',
    city: 'İzmir',
    title: 'Yemeksiz Fiyatına Yemekli Menü Yükseltmesi',
    description: 'Minimum 300 kişilik davetlerde kokteyl menüsü yerine standart yemekli menü hediyesi.',
    discountBadge: 'ÜCRETSİZ YEMEK',
    code: 'IZMIRMENU',
    expiryDate: '20 Ağustos 2026',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf4d284f32d?w=800',
    claimedCount: 19,
  },
];

const CATEGORIES = ['Tümü', 'Düğün Salonu', 'Kır Bahçesi', 'Fotoğrafçı', 'Gelinlik'];

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const filteredDeals = selectedCategory === 'Tümü'
    ? DEALS
    : DEALS.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/arama" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            🔍 Tüm Firmalar
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#E6007E] via-purple-900 to-[#4A154B] py-14 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Sadece WedyPlan Çiftlerine Özel
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Düğün Fırsatları & İndirim Kuponları 🏷️
          </h1>
          <p className="text-purple-100 text-xs md:text-sm max-w-lg mx-auto opacity-90">
            Seçkin düğün mekanları ve hizmet verenlerin sunduğu özel indirim kodlarını kapın, düğün bütçenizde binlerce lira tasarruf edin.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Kategori Filtre Butonları */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                selectedCategory === cat
                  ? 'bg-[#E6007E] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-pink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bilgilendirme Banner */}
        {copiedCode && (
          <div className="bg-emerald-600 text-white p-4 rounded-2xl text-center text-xs font-bold shadow-lg animate-bounce">
            🎉 İndirim Kodu Kopyalandı: <span className="underline uppercase tracking-widest">{copiedCode}</span>! İletişime geçerken firmaya belirtmeyi unutmayın.
          </div>
        )}

        {/* Fırsat Kartları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-xl transition flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 relative h-48 sm:h-auto bg-slate-100">
                <img
                  src={deal.imageUrl}
                  alt={deal.vendorName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#E6007E] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow uppercase">
                  {deal.discountBadge}
                </span>
              </div>

              <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">📍 {deal.city} • {deal.category}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                      🔥 {deal.claimedCount} Çift Aldı
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#4A154B] mt-1">{deal.vendorName}</h3>
                  <h2 className="text-sm font-extrabold text-slate-800 mt-1 leading-snug">{deal.title}</h2>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{deal.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="bg-dashed border border-purple-200 bg-purple-50/50 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Kupon Kodu</span>
                    <span className="text-xs font-extrabold text-[#4A154B] tracking-wider uppercase">{deal.code}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(deal.code)}
                    className="bg-[#4A154B] hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow"
                  >
                    Kodu Kopyala
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}