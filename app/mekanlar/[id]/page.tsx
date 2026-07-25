'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, Star, Users, PhoneCall, Sparkles, Heart, ShieldCheck, 
  ChevronRight, Calendar, CheckCircle2, Clock, Car, Wine, Music, 
  Building2, MessageSquare, Send, ArrowLeft, Image as ImageIcon, Check
} from 'lucide-react';

export default function VenueDetailPage() {
  const params = useParams();
  const venueId = params?.id || '1';

  // Modal & Form State'leri
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quoteForm, setQuoteForm] = useState({
    name: 'Selin Akray',
    email: 'selin@example.com',
    phone: '0532 000 00 00',
    weddingDate: '2026-08-15',
    guestCount: '250',
    note: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Örnek Mekan Verisi (ID'ye Göre Dinamik Yüklenebilir)
  const venue = {
    id: venueId,
    name: 'Beykoz Secret Garden & Event',
    category: 'Kır Düğünü',
    location: 'Beykoz, İstanbul',
    address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
    rating: 4.9,
    reviewsCount: 128,
    pricePerGuest: '1.200 TL',
    capacity: '250 - 800 Kişi',
    isVip: true,
    description: `Beykoz Ormanları'nın kalbinde, 10.000 m² yeşil alana yayılmış Beykoz Secret Garden; doğanın zarafetiyle lüks organizasyon anlayışını bir araya getiriyor. Panoramik orman manzarası, açılır-kapanır tavanlı olumsuz hava koşulları alanı ve VIP gelin-damat suiti ile hayalinizdeki kır düğününü gerçeğe dönüştürüyoruz.`,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      { label: 'Yemekli Kapasite', val: '800 Kişi', icon: Users },
      { label: 'Kokteyl Kapasitesi', val: '1.200 Kişi', icon: Users },
      { label: 'Otopark & Vale', val: '250 Araç', icon: Car },
      { label: 'Alkol Durumu', val: 'Ruhsatlı / Servis Var', icon: Wine },
      { label: 'Müzik Yayın Sonu', val: '00:00 (After Party 03:00)', icon: Music },
      { label: 'Olumsuz Hava Önlemi', val: 'Açılır-Kapanır Tavan', icon: Building2 },
    ],
    menuTypes: ['Kırmızı Et Menüsü', 'Beyaz Et Menüsü', 'Vejetaryen / Vegan', 'Çocuk Menüsü'],
    reviews: [
      { id: '1', author: 'Ceren & Berk', date: 'Eylül 2025', rating: 5, comment: 'Düğünümüz tam bir rüya gibi geçti. Organizasyon ekibi ve yemeklerin lezzeti harikaydı.' },
      { id: '2', author: 'Merve & Kaan', date: 'Ağustos 2025', rating: 5, comment: 'Yağmur riski vardı ancak tavan sistemleri sayesinde hiçbir sorun yaşamadık. Kesinlikle tavsiye ederim.' }
    ]
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setIsFormSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/mekanlar" className="flex items-center gap-2 text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Tüm Mekanlara Dön
          </Link>

          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#333] text-white text-[13px] font-medium transition-all shadow-md flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fiyat Teklifi Al</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-8 space-y-10">
        
        {/* 📸 FOTOĞRAF GALERİSİ */}
        <section className="space-y-4">
          <div className="relative h-[420px] md:h-[500px] rounded-[32px] overflow-hidden bg-black/10 border border-black/10 shadow-sm">
            <img 
              src={venue.images[selectedImageIndex]} 
              alt={venue.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
            {venue.isVip && (
              <span className="absolute top-6 left-6 bg-[#111111] text-[#D4AF37] text-[11px] font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#D4AF37]/30 shadow-lg">
                VIP Partner Mekan
              </span>
            )}
          </div>

          {/* Küçük Önizleme Resimleri */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {venue.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-28 h-20 rounded-[16px] overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImageIndex === idx ? 'border-[#111111] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* 🏰 BAŞLIK VE HIZLI BİLGİ ALANI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Sol Kolon: Detaylar */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold uppercase tracking-wider bg-[#F4F4F0] px-3 py-1 rounded-md text-[#555]">
                  {venue.category}
                </span>
                <span className="flex items-center gap-1 text-[13px] font-bold text-[#111]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {venue.rating} ({venue.reviewsCount} Değerlendirme)
                </span>
              </div>

              <h1 className="text-[36px] md:text-[44px] font-serif font-normal text-[#111] leading-tight">
                {venue.name}
              </h1>

              <p className="text-[14px] text-[#666] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                {venue.address}
              </p>
            </div>

            {/* Açıklama */}
            <div className="p-6 bg-[#FBFBF9] border border-black/5 rounded-[24px] space-y-3">
              <h3 className="font-serif text-[20px] font-medium text-[#111]">Mekan Hakkında</h3>
              <p className="text-[14px] text-[#555] leading-relaxed font-light">
                {venue.description}
              </p>
            </div>

            {/* Teknik Kapasite & Özellikler Gridi */}
            <div className="space-y-4">
              <h3 className="font-serif text-[22px] font-medium text-[#111]">Kapasite ve Özellikler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {venue.features.map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <div key={idx} className="p-4 bg-white border border-black/10 rounded-[20px] space-y-1">
                      <div className="flex items-center gap-2 text-[#D4AF37]">
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase text-[#888]">{f.label}</span>
                      </div>
                      <p className="font-medium text-[14px] text-[#111]">{f.val}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menü Seçenekleri */}
            <div className="space-y-3">
              <h3 className="font-serif text-[22px] font-medium text-[#111]">Servis Edilen Menüler</h3>
              <div className="flex flex-wrap gap-2">
                {venue.menuTypes.map((m, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white border border-black/10 rounded-full text-[13px] font-medium text-[#333] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Değerlendirmeler */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <h3 className="font-serif text-[22px] font-medium text-[#111]">Çift Yorumları</h3>
              <div className="space-y-4">
                {venue.reviews.map((r) => (
                  <div key={r.id} className="p-5 bg-white border border-black/5 rounded-[20px] space-y-2 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[14px] text-[#111]">{r.author}</span>
                      <span className="text-[11px] text-[#888]">{r.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-[13px] text-[#555]">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sağ Kolon: Sabit Fiyat & WedyAI Bütçe Doğrulama Kartı */}
          <div className="space-y-6 sticky top-28">
            
            {/* Teklif Kartı */}
            <div className="bg-white border border-black/10 rounded-[32px] p-6 shadow-xl space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#888] block">Kişi Başı Başlangıç</span>
                <div className="text-[32px] font-bold text-[#111] font-mono">
                  {venue.pricePerGuest} <span className="text-[12px] text-[#666] font-normal">/ kişi</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full h-[52px] bg-[#111111] hover:bg-[#333] text-white font-medium rounded-full text-[14px] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ücretsiz Fiyat Teklifi Al</span>
                </button>

                <p className="text-[11px] text-center text-[#888]">
                  Teklif talebiniz doğrudan mekan yetkilisine iletilir.
                </p>
              </div>
            </div>

            {/* 🤖 WedyAI Bütçe Doğrulama Entegrasyon Kartı */}
            <div className="bg-[#111111] text-white rounded-[32px] p-6 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>WedyAI Smart Check</span>
              </div>

              <h4 className="font-serif text-[18px] leading-snug">
                Bu mekan bütçenize uygun mu?
              </h4>

              <p className="text-[12px] text-white/70 font-light leading-relaxed">
                WedyAI Asistanı bütçenizi ve davetli sayınızı analiz ederek bu mekanın maliyetini hesaplasın.
              </p>

              <Link href={`/cift/ai-asistan`}>
                <button className="w-full py-3 bg-[#222222] hover:bg-[#333] border border-white/10 text-white rounded-full text-[12px] font-medium transition-all flex items-center justify-center gap-2 mt-2">
                  <span>WedyAI ile Analiz Et</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* 📩 FİYAT TEKLİFİ MODAL'I */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-[480px] w-full p-8 shadow-2xl relative space-y-6">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[22px] font-serif font-medium text-[#111]">Fiyat Teklifi İste</h3>
                <p className="text-[12px] text-[#666]">{venue.name}</p>
              </div>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-[#888] hover:text-[#111]">✕</button>
            </div>

            {isFormSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-[20px] text-[#111]">Talebiniz Alındı!</h4>
                <p className="text-[13px] text-[#666]">Mekan yetkilisi en kısa sürede sizinle iletişime geçecektir.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Ad Soyad</label>
                  <input 
                    type="text" 
                    required 
                    value={quoteForm.name} 
                    onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} 
                    className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none focus:border-[#111]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Telefon</label>
                    <input 
                      type="text" 
                      required 
                      value={quoteForm.phone} 
                      onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} 
                      className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Tahmini Davetli</label>
                    <input 
                      type="text" 
                      required 
                      value={quoteForm.guestCount} 
                      onChange={e => setQuoteForm({...quoteForm, guestCount: e.target.value})} 
                      className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Düğün Tarihi</label>
                  <input 
                    type="date" 
                    required 
                    value={quoteForm.weddingDate} 
                    onChange={e => setQuoteForm({...quoteForm, weddingDate: e.target.value})} 
                    className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none focus:border-[#111]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full h-[50px] bg-[#111111] hover:bg-[#333] text-white font-medium rounded-full text-[14px] transition-all shadow-md mt-2"
                >
                  Teklifi Gönder
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}