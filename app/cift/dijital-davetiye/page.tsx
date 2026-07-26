'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Link2, Copy, Check, Eye, QrCode, Palette, 
  Globe, Calendar, MapPin, Heart, ShieldCheck, Share2, Music, Utensils
} from 'lucide-react';

export default function DigitalInvitationBuilderPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Davetiye Ayarları State'i
  const [invitationConfig, setInvitationConfig] = useState({
    slug: 'selin-kaan-2026',
    title: 'Selin & Kaan Evleniyor',
    date: '15 Ağustos 2026',
    time: '19:00',
    venueName: 'Beykoz Secret Garden & Event',
    address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
    theme: 'gold-luxury', // gold-luxury, minimalist-white, rustic-boho
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    welcomeMessage: 'Hayatımızın en özel gününde, mutluluğumuza ortak olmanızdan onur duyarız.',
    askDietary: true,
    askSongRequest: true
  });

  const fullUrl = `https://wedyplan.com/davetiye/${invitationConfig.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/cift/butce" className="hover:text-[#111] transition-colors">Bütçe</Link>
            <Link href="/cift/davetliler" className="hover:text-[#111] transition-colors">Davetliler</Link>
            <Link href="/cift/dijital-davetiye" className="text-[#111] font-bold">Dijital Davetiye</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] text-[12px] font-medium transition-all flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>{copied ? 'Link Kopyalandı!' : 'Davetiye Linkini Kopyala'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Üst Başlık & Link Çubuğu */}
        <div className="bg-[#111111] text-white p-6 md:p-8 rounded-[32px] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[11px] text-[#D4AF37] font-mono tracking-widest uppercase">
              <Globe className="w-3.5 h-3.5" /> Web Sitesi & Dijital LCV
            </div>
            <h1 className="text-[28px] md:text-[36px] font-serif font-normal">
              Özel Düğün Web Siteniz Hazır
            </h1>
            <p className="text-[13px] text-white/70 font-light max-w-[500px]">
              Davetlilerinize WhatsApp veya SMS ile gönderebileceğiniz, LCV toplamalı interaktif davetiye sayfanız.
            </p>
          </div>

          {/* Link Bağlantı Kutusu */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-[20px] space-y-2 shrink-0 z-10">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 block">Canlı Davetiye Adresiniz</span>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl text-[12px] font-mono text-[#D4AF37]">
              <Link2 className="w-3.5 h-3.5" />
              <span>{fullUrl}</span>
            </div>
          </div>
        </div>

        {/* 🛠️ TASARIM VE CANLI ÖNİZLEME (2 Kolon) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol Kolon: Düzenleme Formu (5 Kolon) */}
          <div className="lg:col-span-5 bg-white border border-black/10 rounded-[32px] p-6 space-y-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <h3 className="font-serif text-[20px] font-medium text-[#111]">Davetiye Ayarları</h3>
              <span className="text-[11px] bg-[#F4F4F0] px-2.5 py-1 rounded-full font-medium text-[#555]">
                Otomatik Kaydediliyor
              </span>
            </div>

            <div className="space-y-4 text-[13px]">
              
              {/* Tema Seçimi */}
              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#D4AF37]" /> Tasarım Konsepti
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setInvitationConfig({...invitationConfig, theme: 'gold-luxury'})}
                    className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                      invitationConfig.theme === 'gold-luxury' ? 'border-[#111] bg-[#111] text-white' : 'border-black/10 bg-[#FBFBF9]'
                    }`}
                  >
                    Lüks Altın
                  </button>
                  <button 
                    onClick={() => setInvitationConfig({...invitationConfig, theme: 'minimalist-white'})}
                    className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                      invitationConfig.theme === 'minimalist-white' ? 'border-[#111] bg-[#111] text-white' : 'border-black/10 bg-[#FBFBF9]'
                    }`}
                  >
                    Sade Beyaz
                  </button>
                  <button 
                    onClick={() => setInvitationConfig({...invitationConfig, theme: 'rustic-boho'})}
                    className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                      invitationConfig.theme === 'rustic-boho' ? 'border-[#111] bg-[#111] text-white' : 'border-black/10 bg-[#FBFBF9]'
                    }`}
                  >
                    Rustik Doğa
                  </button>
                </div>
              </div>

              {/* Başlık ve Mesaj */}
              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Davetiye Başlığı</label>
                <input 
                  type="text" 
                  value={invitationConfig.title}
                  onChange={e => setInvitationConfig({...invitationConfig, title: e.target.value})}
                  className="w-full h-11 px-3.5 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none focus:border-black/30 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Karşılama Notu</label>
                <textarea 
                  rows={3}
                  value={invitationConfig.welcomeMessage}
                  onChange={e => setInvitationConfig({...invitationConfig, welcomeMessage: e.target.value})}
                  className="w-full p-3.5 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none focus:border-black/30 font-light text-[12px]"
                />
              </div>

              {/* Ek Sorular Toggle */}
              <div className="pt-2 border-t border-black/5 space-y-3">
                <label className="text-[11px] font-bold uppercase text-[#888] block">Lcv Form Seçenekleri</label>

                <label className="flex items-center justify-between p-3 bg-[#FBFBF9] border border-black/5 rounded-xl cursor-pointer">
                  <span className="text-[12px] font-medium text-[#333] flex items-center gap-2">
                    <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> Vejetaryen/Vegan Menü Sorulsun mu?
                  </span>
                  <input 
                    type="checkbox" 
                    checked={invitationConfig.askDietary}
                    onChange={e => setInvitationConfig({...invitationConfig, askDietary: e.target.checked})}
                    className="w-4 h-4 text-[#111] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#FBFBF9] border border-black/5 rounded-xl cursor-pointer">
                  <span className="text-[12px] font-medium text-[#333] flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-[#D4AF37]" /> Müzik/Şarkı İstek Alanı Olsun mu?
                  </span>
                  <input 
                    type="checkbox" 
                    checked={invitationConfig.askSongRequest}
                    onChange={e => setInvitationConfig({...invitationConfig, askSongRequest: e.target.checked})}
                    className="w-4 h-4 text-[#111] rounded cursor-pointer"
                  />
                </label>
              </div>

            </div>

          </div>

          {/* Sağ Kolon: Canlı Telefon Simülatörü & Önizleme (7 Kolon) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <div className="text-center mb-4">
              <span className="text-[12px] font-semibold text-[#888] uppercase tracking-wider block">Davetlilerin Sitenizi Nasıl Göreceği</span>
              <span className="text-[11px] text-[#A0A0A0]">Mobil Uyumlu Görünüm Önizlemesi</span>
            </div>

            {/* Mockup Telefon Kasası */}
            <div className="w-full max-w-[380px] bg-[#111111] p-3 rounded-[48px] shadow-2xl border-4 border-[#222222]">
              
              {/* Ekran İçeriği */}
              <div className="bg-white rounded-[38px] overflow-hidden min-h-[620px] flex flex-col justify-between text-center selection:bg-none">
                
                {/* Header Görsel */}
                <div className="relative h-[220px] bg-black">
                  <img src={invitationConfig.coverImage} alt="" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center p-6 text-white">
                    <div className="space-y-1">
                      <Heart className="w-5 h-5 text-[#D4AF37] mx-auto fill-[#D4AF37]" />
                      <h2 className="font-serif text-[22px] font-normal leading-tight">{invitationConfig.title}</h2>
                    </div>
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  <p className="text-[12px] text-[#555] font-serif italic leading-relaxed">
                    "{invitationConfig.welcomeMessage}"
                  </p>

                  <div className="p-4 bg-[#FBFBF9] border border-black/5 rounded-2xl space-y-2 text-left text-[11px]">
                    <div className="flex items-center gap-2 text-[#111] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{invitationConfig.date} • {invitationConfig.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#555]">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{invitationConfig.venueName}</span>
                    </div>
                  </div>

                  {/* Örnek LCV Form Kutusu */}
                  <div className="p-4 bg-[#111111] text-white rounded-2xl space-y-2 text-left">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Katılım Formu (RSVP)</span>
                    <input 
                      disabled
                      placeholder="Adınız Soyadınız..." 
                      className="w-full h-8 px-3 bg-white/10 rounded-lg text-[11px] text-white placeholder-white/40 border border-white/10"
                    />
                    <button disabled className="w-full h-8 bg-[#D4AF37] text-black font-bold text-[11px] rounded-lg">
                      Katılımımı Onayla
                    </button>
                  </div>

                </div>

                {/* Footer Footer Badge */}
                <div className="py-2.5 bg-[#F4F4F0] text-[10px] text-[#888] font-mono">
                  Powered by WedyPlan.com
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}