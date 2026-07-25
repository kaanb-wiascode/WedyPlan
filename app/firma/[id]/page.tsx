'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  Check, 
  Share2, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ChevronLeft,
  Info,
  Building,
  Utensils,
  Car,
  Music
} from 'lucide-react';

export default function PremiumVendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Form State
  const [weddingDate, setWeddingDate] = useState('');
  const [guestCount, setGuestCount] = useState('300');
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock Vendor Data (Production'da Firestore'dan çekilir)
  const vendor = {
    id: id,
    name: 'Bosphorus Palace Kır Bahçesi',
    category: 'Kır Bahçesi & Tarihi Mekan',
    city: 'İstanbul',
    district: 'Beykoz',
    address: 'Çayır Caddesi No:14, Beykoz / İstanbul',
    rating: 4.9,
    reviewsCount: 128,
    pricePerPerson: '1.200 TL / Kişi',
    startingPrice: '150.000 TL',
    capacity: '200 - 800 Kişi',
    description: `Boğaz’ın en büyüleyici noktasında, tarihi doku ile modern zarafetin buluştuğu Bosphorus Palace, hayatınızın en özel gününü unutulmaz kılmak için tasarlandı. 

Geniş çim alanı, asırlık ağaçların altındaki davet düzeni ve kesintisiz deniz manzarası ile 800 kişiye kadar olan düğün ve davetlerinize ev sahipliği yapıyoruz. Deneyimli şeflerimizin hazırladığı gastronomi odaklı menüler ve kişiselleştirilebilir konsept seçeneklerimizle her detayı kusursuzlaştırıyoruz.`,
    features: [
      { name: 'Açık & Kapalı Alan', icon: Building },
      { name: 'Özel Menü & Tadım', icon: Utensils },
      { name: 'Vale & Otopark (250 Araç)', icon: Car },
      { name: 'Gelişmiş Ses & Işık Düzeni', icon: Music },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545232979-fbf4d284f32d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    ],
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link 
            href="/arama" 
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Aramaya Dön</span>
          </Link>
          
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111] hover:bg-[#F0F0EF] transition-colors"
              aria-label="Kaydet"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#7C5CFF] text-[#7C5CFF]' : 'text-[#666666]'}`} />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111] hover:bg-[#F0F0EF] transition-colors"
              aria-label="Paylaş"
            >
              <Share2 className="w-5 h-5 text-[#666666]" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        
        {/* Title Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F8F7] text-[13px] font-medium text-[#666666] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span>{vendor.category}</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-medium tracking-tight text-[#111111]">
              {vendor.name}
            </h1>
            <div className="flex items-center gap-4 text-[15px] text-[#666666] mt-2">
              <div className="flex items-center gap-1 text-[#111111] font-medium">
                <Star className="w-4 h-4 fill-[#111111]" />
                <span>{vendor.rating}</span>
                <span className="text-[#666666] font-normal">({vendor.reviewsCount} değerlendirme)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{vendor.district}, {vendor.city}</span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[13px] text-[#999999] uppercase tracking-wider block">Başlangıç Fiyatı</span>
            <span className="text-[28px] font-medium text-[#111111]">{vendor.startingPrice}</span>
          </div>
        </div>

        {/* Editorial Photo Gallery (Airbnb / Apple Style Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 rounded-[28px] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-[#F8F8F7]">
          <div className="md:col-span-2 aspect-[4/3] md:aspect-auto">
            <img 
              src={vendor.gallery[0]} 
              alt={vendor.name} 
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-4">
            {vendor.gallery.slice(1, 4).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden bg-[#F0F0EF]">
                <img 
                  src={img} 
                  alt={`${vendor.name} - ${i+2}`} 
                  className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content & Sticky Booking Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Information & Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-[24px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)]">
              <div className="space-y-1">
                <span className="text-[13px] text-[#999999] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Kapasite
                </span>
                <span className="text-[15px] font-medium text-[#111111] block">{vendor.capacity}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[13px] text-[#999999] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Kişi Başı
                </span>
                <span className="text-[15px] font-medium text-[#111111] block">{vendor.pricePerPerson}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[13px] text-[#999999] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Lokasyon
                </span>
                <span className="text-[15px] font-medium text-[#111111] block">{vendor.district}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-[24px] font-medium tracking-tight text-[#111111]">Mekan Hakkında</h2>
              <p className="text-[16px] text-[#666666] leading-relaxed whitespace-pre-line font-normal">
                {vendor.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6 pt-6 border-t border-[rgba(0,0,0,0.06)]">
              <h2 className="text-[24px] font-medium tracking-tight text-[#111111]">Öne Çıkan Özellikler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendor.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-[18px] bg-[#F8F8F7]">
                    <feat.icon className="w-5 h-5 text-[#7C5CFF]" strokeWidth={1.5} />
                    <span className="text-[15px] font-medium text-[#111111]">{feat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location / Address */}
            <div className="space-y-4 pt-6 border-t border-[rgba(0,0,0,0.06)]">
              <h2 className="text-[24px] font-medium tracking-tight text-[#111111]">Konum</h2>
              <p className="text-[15px] text-[#666666]">{vendor.address}</p>
              
              {/* Minimal Map Placeholder */}
              <div className="w-full h-[240px] rounded-[24px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-2 text-[#999999]">
                <MapPin className="w-8 h-8 text-[#7C5CFF]" strokeWidth={1.5} />
                <span className="text-[14px] font-medium text-[#111111]">İnteraktif Harita Önizlemesi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Lead Capture / Quote Card (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[104px]">
            <div className="bg-white rounded-[28px] border border-[rgba(0,0,0,0.08)] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] space-y-6">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#1DB954]/10 text-[#1DB954] rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-[22px] font-medium tracking-tight">Talebiniz İletildi</h3>
                  <p className="text-[15px] text-[#666666] leading-relaxed">
                    <strong>{vendor.name}</strong> yetkilileri seçtiğiniz tarihler için sizinle en kısa sürede iletişime geçecektir.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[14px] font-medium text-[#7C5CFF] hover:underline pt-2 block mx-auto"
                  >
                    Yeni Teklif İstediğinde Bulun
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[13px] font-medium text-[#666666] uppercase">Başlangıç Paketi</span>
                      <span className="text-[22px] font-medium text-[#111111]">{vendor.startingPrice}</span>
                    </div>
                    <p className="text-[13px] text-[#999999]">Tarih ve davetli sayısına göre fiyat değişiklik gösterebilir.</p>
                  </div>

                  <form onSubmit={handleSubmitQuote} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[13px] font-medium text-[#111111] mb-1.5">
                        Planlanan Düğün Tarihi
                      </label>
                      <input 
                        type="date"
                        required
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full h-[52px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[18px] text-[15px] text-[#111111] outline-none focus:border-[#7C5CFF]/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#111111] mb-1.5">
                        Tahmini Davetli Sayısı
                      </label>
                      <select 
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full h-[52px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[18px] text-[15px] text-[#111111] outline-none focus:border-[#7C5CFF]/40 transition-colors"
                      >
                        <option value="100">100 Kişiye Kadar</option>
                        <option value="300">200 - 300 Kişi</option>
                        <option value="500">400 - 500 Kişi</option>
                        <option value="800">500+ Kişi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#111111] mb-1.5">
                        Özel Notunuz (Opsiyonel)
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Menü beklentiniz, organizasyon detayları..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[18px] text-[15px] text-[#111111] outline-none focus:border-[#7C5CFF]/40 transition-colors resize-none placeholder:text-[#999999]"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-[56px] bg-[#7C5CFF] hover:bg-[#6A4FE0] text-white font-medium text-[16px] rounded-[18px] transition-colors shadow-[0_8px_30px_rgba(124,92,255,0.2)]"
                    >
                      Ücretsiz Fiyat Teklifi Al
                    </button>
                  </form>

                  <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-[13px] text-[#666666]">
                    <span className="flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#7C5CFF]" /> Komisyon veya gizli ücret yok
                    </span>
                    <a 
                      href="https://wa.me/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#111111] font-medium flex items-center gap-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}