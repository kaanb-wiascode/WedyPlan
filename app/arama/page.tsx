'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Map, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight,
  Heart,
  ChevronDown
} from 'lucide-react';

// Mock Data for Vendors
const VENDORS = [
  {
    id: '1',
    name: 'Bosphorus Palace Kır Bahçesi',
    category: 'Tarihi Mekan & Kır Düğünü',
    location: 'Beykoz, İstanbul',
    rating: 4.9,
    reviews: 128,
    price: '150.000 TL',
    capacity: '200-800 Kişi',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    aiMatch: 94,
    tags: ['Bütçenize Uygun', 'OS Onaylı']
  },
  {
    id: '2',
    name: 'The Glasshouse Botanical',
    category: 'Kapalı Salon & Botanik',
    location: 'Sarıyer, İstanbul',
    rating: 4.8,
    reviews: 84,
    price: '220.000 TL',
    capacity: '100-400 Kişi',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    aiMatch: 72,
    tags: ['Lüks Segment']
  },
  {
    id: '3',
    name: 'Art & Motion Studios',
    category: 'Fotoğraf & Video',
    location: 'Kadıköy, İstanbul',
    rating: 5.0,
    reviews: 215,
    price: '35.000 TL',
    capacity: 'Tam Gün Çekim',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800',
    aiMatch: 98,
    tags: ['Yüksek Puan', 'Bütçenize Uygun']
  }
];

export default function PremiumDiscoveryPage() {
  const [isMapView, setIsMapView] = useState(true);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col">
      
      {/* Topbar / Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)] shrink-0">
        <div className="max-w-[1600px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          
          {/* Quick Search Bar (Airbnb Style) */}
          <div className="hidden md:flex items-center bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-full h-[48px] px-2 w-[500px]">
            <div className="flex-1 px-4 border-r border-[rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:bg-[#F8F8F7] rounded-l-full h-full transition-colors">
              <span className="text-[13px] font-medium text-[#111111]">İstanbul</span>
            </div>
            <div className="flex-1 px-4 border-r border-[rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:bg-[#F8F8F7] h-full transition-colors">
              <span className="text-[13px] font-medium text-[#111111]">15 Ağu 2026</span>
            </div>
            <div className="flex-1 pl-4 pr-1 flex items-center justify-between cursor-pointer hover:bg-[#F8F8F7] rounded-r-full h-full transition-colors">
              <span className="text-[13px] font-medium text-[#999999]">Kategori</span>
              <div className="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center text-white">
                <Search className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cift/dashboard" className="text-[14px] font-medium text-[#666666] hover:text-[#111111]">
              Kontrol Merkezi
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area (Split Screen) */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Listing (Dynamic Width based on Map View) */}
        <div className={`flex flex-col h-[calc(100vh-72px)] overflow-y-auto ${isMapView ? 'w-full lg:w-[60%] xl:w-[55%]' : 'w-full'}`}>
          
          {/* Filters Bar */}
          <div className="sticky top-0 z-10 bg-white border-b border-[rgba(0,0,0,0.04)] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button className="flex items-center gap-2 h-[36px] px-4 rounded-full border border-[rgba(0,0,0,0.08)] text-[13px] font-medium hover:border-[#111111] transition-colors whitespace-nowrap">
                <Filter className="w-3.5 h-3.5" /> Tüm Filtreler
              </button>
              <button className="flex items-center gap-1.5 h-[36px] px-4 rounded-full border border-[rgba(0,0,0,0.08)] text-[13px] font-medium hover:border-[#111111] transition-colors whitespace-nowrap">
                Fiyat <ChevronDown className="w-3.5 h-3.5 text-[#999999]" />
              </button>
              <button className="flex items-center gap-1.5 h-[36px] px-4 rounded-full border border-[rgba(0,0,0,0.08)] text-[13px] font-medium hover:border-[#111111] transition-colors whitespace-nowrap bg-[#7C5CFF]/5 border-[#7C5CFF]/20 text-[#7C5CFF]">
                <Sparkles className="w-3.5 h-3.5" /> Bütçeme Uygunlar
              </button>
            </div>
            
            <button 
              onClick={() => setIsMapView(!isMapView)}
              className="hidden lg:flex items-center gap-2 h-[36px] px-4 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-[#333333] transition-colors ml-4 shrink-0"
            >
              {isMapView ? 'Haritayı Kapat' : <><Map className="w-3.5 h-3.5" /> Haritada Göster</>}
            </button>
          </div>

          {/* Vendors Grid */}
          <div className={`p-6 grid gap-6 ${isMapView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
            {VENDORS.map((vendor) => (
              <Link href={`/firma/${vendor.id}`} key={vendor.id} className="group flex flex-col gap-3 relative">
                
                {/* AI Match Badge (OS Feature) */}
                {vendor.aiMatch >= 90 && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
                    <span className="text-[11px] font-bold text-[#111111]">%{vendor.aiMatch} Uyumlu</span>
                  </div>
                )}
                
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5 text-white drop-shadow-md" />
                </button>

                {/* Image */}
                <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#F8F8F7]">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Info */}
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[16px] font-medium text-[#111111] truncate pr-4">{vendor.name}</h3>
                    <div className="flex items-center gap-1 text-[13px] font-medium">
                      <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" />
                      {vendor.rating}
                    </div>
                  </div>
                  
                  <p className="text-[14px] text-[#666666] truncate">{vendor.category} • {vendor.location}</p>
                  <p className="text-[14px] text-[#999999] truncate flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5" /> {vendor.capacity}
                  </p>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-[15px] font-medium text-[#111111] border-b border-[#111111] pb-0.5 leading-none inline-block">
                      {vendor.price}'den başlayan
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Map (Sticky) */}
        {isMapView && (
          <div className="hidden lg:block w-[40%] xl:w-[45%] h-[calc(100vh-72px)] bg-[#F0F0EF] relative border-l border-[rgba(0,0,0,0.06)]">
            
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Simulated Map Pins */}
            <div className="absolute top-1/3 left-1/4">
              <div className="bg-white px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.12)] text-[13px] font-medium text-[#111111] hover:scale-105 transition-transform cursor-pointer border border-[rgba(0,0,0,0.04)] relative">
                150.000 TL
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-[rgba(0,0,0,0.04)]"></div>
              </div>
            </div>

            <div className="absolute top-1/2 left-2/3">
              <div className="bg-[#111111] px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] text-[13px] font-medium text-white hover:scale-105 transition-transform cursor-pointer relative">
                220.000 TL
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111111] rotate-45"></div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute right-6 bottom-6 flex flex-col gap-2">
              <div className="bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
                <button className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#F8F8F7] border-b border-[rgba(0,0,0,0.04)]">+</button>
                <button className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#F8F8F7]">-</button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}