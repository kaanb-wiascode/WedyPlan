'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Theme {
  id: string;
  name: string;
  bgClass: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderStyle: string;
}

const THEMES: Theme[] = [
  {
    id: 'rose',
    name: 'Rose Minimalist',
    bgClass: 'bg-rose-50',
    cardBg: 'bg-white',
    textColor: 'text-slate-800',
    accentColor: 'text-[#E6007E]',
    fontFamily: 'font-serif',
    borderStyle: 'border-2 border-rose-200',
  },
  {
    id: 'gold',
    name: 'Gold Elegant',
    bgClass: 'bg-amber-950/10',
    cardBg: 'bg-[#1A1A1A]',
    textColor: 'text-amber-100',
    accentColor: 'text-amber-400',
    fontFamily: 'font-serif',
    borderStyle: 'border-2 border-amber-500/40',
  },
  {
    id: 'botanical',
    name: 'Botanical Green',
    bgClass: 'bg-emerald-50',
    cardBg: 'bg-emerald-900',
    textColor: 'text-emerald-50',
    accentColor: 'text-emerald-300',
    fontFamily: 'font-sans',
    borderStyle: 'border-2 border-emerald-500/30',
  },
  {
    id: 'luxury',
    name: 'Dark Luxury',
    bgClass: 'bg-slate-900',
    cardBg: 'bg-[#0F172A]',
    textColor: 'text-purple-100',
    accentColor: 'text-[#E6007E]',
    fontFamily: 'font-serif',
    borderStyle: 'border-2 border-purple-500/30',
  },
];

export default function InvitationCardBuilderPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);

  // Form State
  const [cardData, setCardData] = useState({
    brideName: 'Selin',
    groomName: 'Caner',
    invitationText: 'Hayatımızın en anlamlı gününde, mutluluğumuza ortak olmanızdan onur duyarız.',
    date: '15 Eylül 2026',
    time: '19:00',
    venueName: 'Bosphorus Palace Kır Bahçesi',
    venueAddress: 'Çengelköy Mah. Sahil Cadesi No:12, Üsküdar / İstanbul',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const shareText = `*💍 ${cardData.brideName} & ${cardData.groomName} Düğün Davetiyesi*\n\n"${cardData.invitationText}"\n\n📅 *Tarih:* ${cardData.date} - ${cardData.time}\n📍 *Mekan:* ${cardData.venueName}\n🏠 *Adres:* ${cardData.venueAddress}\n\n*Dijital LCV & Detaylar için:* ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm print:hidden sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/davetli-listesi" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            📋 Davetli Listem
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Başlık Kartı */}
        <div className="text-center space-y-2 print:hidden">
          <span className="bg-purple-100 text-[#4A154B] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            Ücretsiz Dijital Davetiye Stüdyosu
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Dijital Davetiyenizi Tasarlayın 💌
          </h1>
          <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto">
            Metinleri düzenleyin, temanızı seçin ve davetiyenizi anında sevdiklerinizle paylaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon: Tasarım Formu (7 Kolon) */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-6 print:hidden">
            
            {/* Tema Seçici */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#4A154B]">1. Tema Seçin</label>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-3 rounded-2xl text-xs font-bold border text-left transition ${
                      selectedTheme.id === theme.id
                        ? 'border-[#E6007E] bg-pink-50/50 text-[#E6007E] shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    🎨 {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bilgi Inputları */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-[#4A154B]">2. Davetiye Bilgileri</label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Gelin Adı</label>
                  <input
                    type="text"
                    value={cardData.brideName}
                    onChange={(e) => setCardData({ ...cardData, brideName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Damat Adı</label>
                  <input
                    type="text"
                    value={cardData.groomName}
                    onChange={(e) => setCardData({ ...cardData, groomName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Davetiye Notu / Mesajı</label>
                <textarea
                  rows={2}
                  value={cardData.invitationText}
                  onChange={(e) => setCardData({ ...cardData, invitationText: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Tarih</label>
                  <input
                    type="text"
                    value={cardData.date}
                    onChange={(e) => setCardData({ ...cardData, date: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Saat</label>
                  <input
                    type="text"
                    value={cardData.time}
                    onChange={(e) => setCardData({ ...cardData, time: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Mekan Adı</label>
                <input
                  type="text"
                  value={cardData.venueName}
                  onChange={(e) => setCardData({ ...cardData, venueName: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Mekan Açık Adresi</label>
                <input
                  type="text"
                  value={cardData.venueAddress}
                  onChange={(e) => setCardData({ ...cardData, venueAddress: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp'ta Paylaş</span>
              </button>
              <button
                onClick={handlePrint}
                className="bg-[#4A154B] hover:bg-purple-900 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition shadow"
              >
                🖨️ PDF / İndir
              </button>
            </div>
          </div>

          {/* Sağ Kolon: Canlı Davetiye Kart Önizlemesi (5 Kolon) */}
          <div className="lg:col-span-6 flex flex-col items-center sticky top-24">
            <span className="text-xs font-bold text-slate-400 mb-3 print:hidden">
              👁️ Canlı Davetiye Önizlemesi
            </span>

            {/* Davetiye Kartı */}
            <div
              className={`w-full max-w-md aspect-[3/4] ${selectedTheme.cardBg} ${selectedTheme.textColor} ${selectedTheme.borderStyle} ${selectedTheme.fontFamily} rounded-3xl p-8 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden transition-all duration-300`}
            >
              {/* Süsleme Çiçek/Çerçeve Detayı */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

              {/* Üst Kısım */}
              <div className="space-y-4 pt-4">
                <span className={`text-xs font-bold tracking-[0.3em] uppercase ${selectedTheme.accentColor}`}>
                  Düğün Davetiyesi
                </span>
                
                <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                    {cardData.brideName}
                  </h2>
                  <span className={`text-xl font-serif italic ${selectedTheme.accentColor}`}>&</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                    {cardData.groomName}
                  </h2>
                </div>
              </div>

              {/* Orta Mesaj */}
              <div className="my-6 px-4">
                <p className="text-xs md:text-sm leading-relaxed opacity-90 italic">
                  "{cardData.invitationText}"
                </p>
              </div>

              {/* Alt Bilgiler */}
              <div className="space-y-4 pb-2 border-t border-current/10 pt-4">
                <div>
                  <p className={`text-base font-bold ${selectedTheme.accentColor}`}>
                    {cardData.date} • {cardData.time}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-bold uppercase tracking-wider">{cardData.venueName}</p>
                  <p className="text-[11px] opacity-75 max-w-xs mx-auto line-clamp-2">
                    {cardData.venueAddress}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] opacity-40 uppercase tracking-widest">
                    WedyPlan Dijital Davetiye
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}