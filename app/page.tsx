'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Vendor {
  id: string;
  name?: string;
  category?: string;
  city?: string;
  price?: string;
  rating?: string | number;
  imageUrl?: string;
  description?: string;
}

export default function HomePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vendors'));
        const vendorData: Vendor[] = [];
        querySnapshot.forEach((doc) => {
          vendorData.push({ id: doc.id, ...doc.data() } as Vendor);
        });
        setVendors(vendorData);
      } catch (error) {
        console.error('Firmalar çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/arama"
            className="text-xs md:text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition"
          >
            Firma Ara
          </Link>
          <Link
            href="/butce-hesaplayici"
            className="text-xs md:text-sm font-bold text-[#E6007E] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition flex items-center gap-1"
          >
            <span>💍</span> Bütçe Hesaplayıcı
          </Link>
          <Link
            href="/admin"
            className="text-xs font-semibold bg-[#4A154B] text-white px-3 md:px-4 py-2 rounded-xl hover:bg-purple-900 transition"
          >
            Yönetim Paneli
          </Link>
        </div>
      </nav>

      {/* Hero Alanı */}
      <section className="relative bg-gradient-to-br from-[#4A154B] to-purple-900 text-white py-16 md:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-white/10 text-pink-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20">
            Hayalinizdeki Düğün İçin Tek Adres
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            En İyi Düğün Mekanları & Hizmetleri WedyPlan'da
          </h1>
          <p className="text-purple-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
            Mekanlardan fotoğrafçılara, gelinlikten organizasyona aradığınız tüm profesyonelleri keşfedin, ücretsiz fiyat teklifi alın.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/arama"
              className="bg-[#E6007E] hover:bg-pink-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-lg"
            >
              Firmaları İncele →
            </Link>
            <Link
              href="/butce-hesaplayici"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3 rounded-xl border border-white/20 transition"
            >
              💍 Bütçe Hesapla
            </Link>
          </div>
        </div>
      </section>

      {/* Akıllı Araç Tanıtım Banner'ı */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-xl">💰</span>
              <h3 className="text-base font-bold text-[#4A154B]">Düğün Bütçenizi Planladınız mı?</h3>
            </div>
            <p className="text-xs text-slate-500">
              Ücretsiz bütçe hesaplayıcımız ile tüm harcamalarınızı kategorilere ayırıp bütçe limitinizi koruyun.
            </p>
          </div>
          <Link
            href="/butce-hesaplayici"
            className="bg-[#4A154B] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-purple-900 transition whitespace-nowrap"
          >
            Bütçe Aracını Aç →
          </Link>
        </div>
      </section>

      {/* Öne Çıkan Firmalar */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <div className="flex justify-between items-end border-b border-purple-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#4A154B]">Öne Çıkan Firmalar</h2>
            <p className="text-xs text-slate-500 mt-1">En çok tercih edilen düğün profesyonelleri</p>
          </div>
          <Link href="/arama" className="text-xs font-bold text-[#E6007E] hover:underline">
            Tümünü Gör →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 text-sm py-12">Firmalar yükleniyor...</p>
        ) : vendors.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-purple-100 text-slate-500">
            Henüz eklenmiş firma bulunmuyor. Admin panelinden ilk firmayı ekleyebilirsiniz!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100">
                    <img
                      src={vendor.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#4A154B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {vendor.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-[#4A154B] line-clamp-1">{vendor.name}</h3>
                      <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                        ★ {vendor.rating || '4.8'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">📍 {vendor.city}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2">{vendor.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-[#E6007E]">{vendor.price || 'Fiyat Alınız'}</span>
                  <Link
                    href={`/firma/${vendor.id}`}
                    className="bg-[#4A154B] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-purple-900 transition"
                  >
                    Teklif Al
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 WedyPlan - Düğün Pazaryeri Platformu. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}