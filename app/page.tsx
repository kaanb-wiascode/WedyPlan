'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth } from '../lib/firebase';

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
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  // 1. Firebase Authentication Dinleyicisi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Firmaları Çekme
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

  // 3. Çıkış Yapma İşlemi
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      router.push('/');
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        
        {/* Navbar Menü Linkleri ve Kullanıcı Paneli */}
        <div className="flex items-center gap-4 md:gap-6 relative">
          <Link
            href="/arama"
            className="text-xs md:text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition hidden md:block"
          >
            Firma Ara
          </Link>
          <Link
            href="/kontrol-listesi"
            className="text-xs md:text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition hidden md:block"
          >
            ⏳ Planlama Listesi
          </Link>
          <Link
            href="/butce-hesaplayici"
            className="text-xs md:text-sm font-bold text-[#E6007E] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition flex items-center gap-1 hidden md:flex"
          >
            <span>💍</span> Bütçe
          </Link>
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#4A154B] border border-purple-200 px-3 py-1.5 rounded-xl hover:bg-purple-50 transition hidden md:block"
          >
            Admin
          </Link>

          {/* Kullanıcı Giriş Yapmışsa / Yapmamışsa */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 pr-4 rounded-full border border-slate-200 transition"
              >
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=E6007E&color=fff`}
                  alt="Profil"
                  className="w-7 h-7 rounded-full object-cover bg-white"
                />
                <span className="text-xs font-bold text-slate-700 hidden sm:block">
                  {user.displayName?.split(' ')[0] || 'Hesabım'}
                </span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {/* Kullanıcı Açılır Menüsü */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-purple-100 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[11px] text-slate-400 font-semibold">Hoş Geldiniz,</p>
                    <p className="text-xs font-bold text-[#4A154B] truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <Link
                    href="/arama"
                    className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition"
                  >
                    ❤️ Favori Firmalarım
                  </Link>
                  <Link
                    href="/kontrol-listesi"
                    className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition"
                  >
                    ⏳ Düğün Sayacım
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition mt-1 border-t border-slate-50"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold bg-[#E6007E] text-white px-5 py-2.5 rounded-xl hover:bg-pink-700 transition shadow-md whitespace-nowrap"
            >
              Giriş Yap / Üye Ol
            </Link>
          )}
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
              href="/kontrol-listesi"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3 rounded-xl border border-white/20 transition"
            >
              ⏳ Geri Sayımı Başlat
            </Link>
          </div>
        </div>
      </section>

      {/* Akıllı Araç Tanıtım Banner Alanı */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: Bütçe Hesaplayıcı */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xl">💰</span>
              <h3 className="text-sm font-bold text-[#4A154B]">Düğün Bütçenizi Planlayın</h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Ücretsiz hesaplayıcımız ile bütçenizi kontrol altında tutun.
            </p>
          </div>
          <Link
            href="/butce-hesaplayici"
            className="bg-[#4A154B] text-white text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-purple-900 transition whitespace-nowrap"
          >
            Aracı Aç →
          </Link>
        </div>

        {/* Banner 2: Düğün Sayacı & Checklist */}
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xl">⏳</span>
              <h3 className="text-sm font-bold text-[#E6007E]">Büyük Güne Ne Kadar Kaldı?</h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Sayacı başlatın, hazırlık adımlarını eksiksiz tamamlayın.
            </p>
          </div>
          <Link
            href="/kontrol-listesi"
            className="bg-[#E6007E] text-white text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-pink-700 transition whitespace-nowrap"
          >
            Sayacı Başlat →
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