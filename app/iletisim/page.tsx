'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white">
      <PublicNavbar />

      <main className="pt-16 pb-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Sayfa Başlığı */}
        <div className="max-w-2xl">
          <span className="text-[#0071e3] font-bold tracking-widest text-sm uppercase mb-3 block">Bize Ulaşın</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sizinle Tanışmak İçin Sabırsızlanıyoruz</h1>
          <p className="text-lg text-gray-600 font-light">
            Düğün planlama sürecinizle ilgili sorularınız, firma ortaklıkları veya geri bildirimleriniz için bize her zaman ulaşabilirsiniz.
          </p>
        </div>

        {/* Bento Grid İletişim Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sol Taraf: İletişim Formu (8 Kolon) */}
          <GlassCard className="lg:col-span-8 p-6 md:p-10 border-white/60 bg-white/50" hoverEffect>
            <h2 className="text-2xl font-bold mb-6">Mesaj Gönderin</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Ayşe Yılmaz" 
                    className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">E-posta Adresiniz</label>
                  <input 
                    type="email" 
                    placeholder="Örn: ayse@ornek.com" 
                    className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Konu</label>
                <select className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all text-gray-600">
                  <option>Çift Destek & Soru</option>
                  <option>Firma Başvurusu / İş Ortaklığı</option>
                  <option>Teknik Destek</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mesajınız</label>
                <textarea 
                  rows={5}
                  placeholder="Nasıl yardımcı olabiliriz?" 
                  className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#0071e3] text-white font-bold rounded-xl hover:bg-[#0077ed] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Gönder
              </button>
            </form>
          </GlassCard>

          {/* Sağ Taraf: İletişim Bilgileri Kutu Dizilimi (4 Kolon) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* E-posta Kartı */}
            <GlassCard className="p-8 border-white/60 bg-gradient-to-br from-white/80 to-white/30" hoverEffect>
              <div className="p-3 bg-blue-100 w-fit rounded-xl mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-1">E-posta</h3>
              <p className="text-gray-600 font-light mb-2">Genel sorularınız için bize yazın.</p>
              <a href="mailto:iletisim@wedyplan.com" className="text-[#1D1D1F] font-semibold hover:text-[#0071e3] transition-colors">
                iletisim@wedyplan.com
              </a>
            </GlassCard>

            {/* Telefon Kartı */}
            <GlassCard className="p-8 border-white/60 bg-gradient-to-br from-white/80 to-white/30" hoverEffect>
              <div className="p-3 bg-emerald-100 w-fit rounded-xl mb-4">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-1">Telefon</h3>
              <p className="text-gray-600 font-light mb-2">Hafta içi 09:00 - 18:00 arası arayın.</p>
              <a href="tel:+908501234567" className="text-[#1D1D1F] font-semibold hover:text-[#0071e3] transition-colors">
                +90 (850) 123 45 67
              </a>
            </GlassCard>

            {/* Adres Kartı */}
            <GlassCard className="p-8 border-white/60 bg-gradient-to-br from-[#1D1D1F] to-gray-800 text-white" hoverEffect>
              <div className="p-3 bg-white/10 w-fit rounded-xl mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-1">Merkez Ofis</h3>
              <p className="text-gray-300 font-light">
                Levent Mah. Çayır Çimen Sok. No: 1<br/>
                Beşiktaş / İstanbul, Türkiye
              </p>
            </GlassCard>

          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}