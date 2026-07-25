'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useWeddingOS } from '@/store/useWeddingOS'; // BEYNİ İÇERİ ALDIK
import { 
  Star, MapPin, Users, Calendar, Check, Share2, Heart, Sparkles, 
  MessageCircle, ChevronLeft, Info, Building, Utensils, Car, Music 
} from 'lucide-react';

export default function PremiumVendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // SİSTEM BEYNİNDEN GELEN VERİLER VE FONKSİYONLAR
  const { venueDealStatus, acceptVenueDeal } = useWeddingOS();

  const [isSaved, setIsSaved] = useState(false);

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
    description: `Boğaz’ın en büyüleyici noktasında, tarihi doku ile modern zarafetin buluştuğu Bosphorus Palace...`,
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

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/arama" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Aramaya Dön
          </Link>
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSaved(!isSaved)} className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111]">
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#7C5CFF] text-[#7C5CFF]' : 'text-[#666666]'}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F8F7] text-[13px] font-medium text-[#666666] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" /> <span>{vendor.category}</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-medium tracking-tight text-[#111111]">{vendor.name}</h1>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 rounded-[28px] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-[#F8F8F7]">
          <div className="md:col-span-2 aspect-[4/3] md:aspect-auto">
            <img src={vendor.gallery[0]} alt={vendor.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-4">
            {vendor.gallery.slice(1, 4).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden bg-[#F0F0EF]">
                <img src={img} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h2 className="text-[24px] font-medium tracking-tight text-[#111111]">Mekan Hakkında</h2>
              <p className="text-[16px] text-[#666666] leading-relaxed whitespace-pre-line font-normal">{vendor.description}</p>
            </div>
          </div>

          {/* WEDDING OS MAGIC HAPPENS HERE: SAĞ TARAF (STICKY KART) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[104px]">
            <div className="bg-white rounded-[28px] border border-[rgba(0,0,0,0.08)] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              
              {/* EĞER ANLAŞMA ONAYLANDIYSA */}
              {venueDealStatus === 'ONAYLANDI' ? (
                <div className="py-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1DB954]/10 text-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-[24px] font-medium tracking-tight">Anlaşma Sağlandı!</h3>
                  <p className="text-[15px] text-[#666666] leading-relaxed">
                    Tebrikler! Bosphorus Palace ile dijital sözleşmeniz imzalandı. <strong>150.000 TL</strong> tutarındaki masraf otomatik olarak bütçenize eklendi.
                  </p>
                  <Link href="/butce-hesaplayici" className="text-[15px] font-medium text-[#7C5CFF] hover:underline pt-4 block mx-auto">
                    Bütçe Paneline Git &rarr;
                  </Link>
                </div>
              ) : 
              
              /* EĞER FİRMA ÇİFTE TEKLİF GÖNDERDİYSE */
              venueDealStatus === 'TEKLIF_GELDI' ? (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7C5CFF]/10 text-[#7C5CFF] rounded-full text-[13px] font-medium">
                    <Sparkles className="w-4 h-4" /> Size Özel Teklif İletildi
                  </div>
                  
                  <div>
                    <span className="text-[13px] font-medium text-[#666666] uppercase">Anlaşma Bedeli</span>
                    <div className="text-[36px] font-medium tracking-tight text-[#111111]">150.000 TL</div>
                  </div>

                  <div className="p-4 bg-[#F8F8F7] rounded-[16px] text-[14px] text-[#666666] leading-relaxed border border-[rgba(0,0,0,0.04)]">
                    "Selin & Caner, 15 Ağustos tarihindeki 300 kişilik düğününüz için hazırladığımız özel teklifi onayınıza sunuyoruz."
                  </div>

                  {/* ONAY BUTONU */}
                  <button 
                    onClick={() => acceptVenueDeal(150000)}
                    className="w-full h-[56px] bg-[#111111] hover:bg-[#333333] text-white font-medium text-[16px] rounded-[18px] transition-colors shadow-sm"
                  >
                    Teklifi Onayla & İmzala
                  </button>
                  <p className="text-center text-[12px] text-[#999999] pt-2">Onayladığınız an bütçeniz otomatik güncellenir.</p>
                </div>
              ) : null}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}