'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, User, Heart, Sparkles } from 'lucide-react';

export const MobileGlassNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Düğün Mekanları', href: '/firmalar?category=MEKAN', icon: '🏰' },
    { title: 'Fotoğraf & Video', href: '/firmalar?category=FOTOGRAF', icon: '📸' },
    { title: 'Gelinlik & Moda', href: '/gelinlik-modelleri', icon: '👗' },
    { title: 'Organizasyon', href: '/firmalar?category=ORGANIZASYON', icon: '✨' },
    { title: 'Müzik & Orkestra', href: '/firmalar?category=MUZIK', icon: '🎵' },
  ];

  return (
    <div className="lg:hidden fixed top-4 left-4 right-4 z-50">
      {/* Üst Süzülen Cam Bar (Pill Header) */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-3 rounded-full shadow-lg flex items-center justify-between px-5">
        <Link href="/" className="font-serif font-bold text-xl text-[#1D1D1F]">
          wedy<span className="text-[#E6007E]">plan</span>.
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/favoriler" className="p-2 text-gray-700 hover:text-[#E6007E]">
            <Heart className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-[#1D1D1F] text-white rounded-full transition-transform active:scale-95"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Ekranı Kaplayan Büyüleyici Cam Menü Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-3 bg-white/85 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-2xl overflow-y-auto max-h-[80vh] landscape:max-h-[85vh]"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
                <Sparkles className="w-6 h-6 text-[#E6007E]" />
                <div>
                  <p className="text-xs font-bold text-[#E6007E] uppercase">Yapay Zeka Asistanı</p>
                  <p className="text-sm font-semibold text-gray-800">Hayalindeki Düğünü Planla</p>
                </div>
              </div>

              {/* Menü Linkleri */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2">Kategoriler</p>
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3.5 bg-white/50 hover:bg-white rounded-2xl border border-gray-100/60 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-bold text-gray-800">{item.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>

              {/* Alt Butonlar */}
              <div className="pt-4 border-t border-gray-200/50 flex flex-col gap-3">
                <Link
                  href="/giris"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-gray-100 text-gray-900 font-bold text-center text-sm rounded-2xl hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Giriş Yap / Kaydol
                </Link>
                <Link
                  href="/hizli-teklif"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#E6007E] text-white font-bold text-center text-sm rounded-2xl shadow-lg hover:bg-[#c5006b] transition-all"
                >
                  Ücretsiz Teklif Al
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};