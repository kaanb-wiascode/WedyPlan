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
  isFeatured?: boolean;
}

export default function HomePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Oturum Durumunu Dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Firmaları Çek ve Sponsorluları Üste Al
  useEffect(() => {
    async function fetchVendors() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vendors'));
        const vendorData: Vendor[] = [];
        querySnapshot.forEach((doc) => {
          vendorData.push({ id: doc.id, ...doc.data() } as Vendor);
        });
        
        vendorData.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        setVendors(vendorData);
      } catch (error) {
        console.error('Firmalar çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  // Çıkış Yap
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        
        {/* Masaüstü Menü Linkleri */}
        <div className="hidden lg:flex items-center gap-5">
          <Link href="/arama" className="text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition">
            Firma Ara
          </Link>
          <Link href="/kontrol-listesi" className="text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition">
            ⏳ Checklist
          </Link>
          <Link href="/davetli-listesi" className="text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition">
            🎟️ Davetliler
          </Link>
          <Link href="/butce-hesaplayici" className="text-sm font-bold text-[#E6007E] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition flex items-center gap-1">
            <span>💍</span> Bütçe
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-[#E6007E] transition">
            📰 Blog
          </Link>
          <div className="h-4 w-px bg-slate-200 mx-1"></div> {/* Ayırıcı çizgi */}
          <Link href="/satici" className="text-sm font-semibold text-[#4A154B] hover:text-[#E6007E] transition">
            🏢 Kurumsal
          </Link>

          {/* Masaüstü Profil Menüsü */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 pr-4 rounded-full border border-slate-200 transition"
              >
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=E6007E&color=fff`}
                  alt="Profil"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-slate-700">
                  {user.displayName?.split(' ')[0] || 'Hesabım'}
                </span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-purple-100 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1 bg-purple-50/50">
                    <p className="text-[11px] text-slate-500 font-semibold">Hoş Geldiniz,</p>
                    <p className="text-xs font-bold text-[#4A154B] truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <Link href="/favoriler" className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition">
                    ❤️ Favori Firmalarım
                  </Link>
                  <Link href="/kontrol-listesi" className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition">
                    ⏳ Düğün Sayacım
                  </Link>
                  <Link href="/davetli-listesi" className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition">
                    🎟️ Davetli Listem
                  </Link>
                  <Link href="/satici" className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-purple-50 hover:text-[#E6007E] transition border-t border-slate-50">
                    🏢 Firma Paneli
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition mt-1 border-t border-slate-50"
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

        {/* Mobil Hamburger Butonu */}
        <div className="flex lg:hidden items-center gap-3">
          {user && (
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=E6007E&color=fff`}
              alt="Profil"
              className="w-8 h-8 rounded-full object-cover border border-purple-200"
            />
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:text-[#E6007E] focus:outline-none p-1 text-2xl font-bold"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobil Açılır Menü Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-purple-100 shadow-xl px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300 absolute w-full z-40">
          <div className="flex flex-col space-y-2">
            <Link href="/arama" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 text-xs font-bold text-[#4A154B]">
              🔍 Firma & Mekan Ara
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 text-xs font-bold text-[#4A154B]">
              📰 Düğün Rehberi & Blog
            </Link>
            <Link href="/favoriler" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-pink-50/50 text-xs font-bold text-[#E6007E]">
              ❤️ Favori Firmalarım
            </Link>
            <Link href="/kontrol-listesi" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 text-xs font-bold text-[#4A154B]">
              ⏳ Düğün Geri Sayımı & Checklist
            </Link>
            <Link href="/davetli-listesi" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 text-xs font-bold text-[#4A154B]">
              🎟️ Masa & Davetli Listesi
            </Link>
            <Link href="/butce-hesaplayici" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 text-xs font-bold text-[#E6007E]">
              💍 Bütçe Hesaplayıcı
            </Link>
            <Link href="/satici" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-purple-100 text-xs font-bold text-[#4A154B]">
              🏢 Kurumsal / Firma Paneli
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=E6007E&color=fff`}
                    alt="Profil"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{user.displayName || 'Kullanıcı'}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full bg-red-50 text-red-500 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition">
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center w-full bg-[#E6007E] text-white py-3 rounded-xl text-xs font-bold shadow-md hover:bg-pink-700 transition">
                Giriş Yap / Üye Ol
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Sayfa İçeriği */}
      <main className="flex-grow">
        {/* Hero Alanı */}
        <section className="relative bg-gradient-to-br from-[#4A154B] to-purple-900 text-white py-16 md:py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="bg-white/10 text-pink-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
              Hayalinizdeki Düğün İçin Tek Adres
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              En İyi Düğün Mekanları & Hizmetleri WedyPlan'da
            </h1>
            <p className="text-purple-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
              Mekanlardan fotoğrafçılara, gelinlikten organizasyona aradığınız tüm profesyonelleri keşfedin, ücretsiz fiyat teklifi alın.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/arama" className="bg-[#E6007E] hover:bg-pink-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-lg">
                Firmaları İncele →
              </Link>
              <Link href="/kontrol-listesi" className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3 rounded-xl border border-white/20 transition">
                ⏳ Geri Sayımı Başlat
              </Link>
            </div>
          </div>
          {/* Arka plan süslemeleri */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#E6007E]/20 rounded-full blur-3xl"></div>
        </section>

        {/* Akıllı Araç Tanıtım Banner Alanı (ÜÇLÜ GRID) */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl flex flex-col justify-between gap-4 transition hover:-translate-y-1">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-xl text-[#E6007E]">💰</div>
              <h3 className="text-sm font-bold text-[#4A154B]">Düğün Bütçenizi Planlayın</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Harcamalarınızı kategorize edin, ücretsiz hesaplayıcımız ile bütçenizi kontrol altında tutun.</p>
            </div>
            <Link href="/butce-hesaplayici" className="bg-[#4A154B] text-white text-center text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-purple-900 transition w-full">
              Hesaplayıcıyı Aç →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xl flex flex-col justify-between gap-4 transition hover:-translate-y-1 ring-2 ring-pink-500/10">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-xl text-[#4A154B]">⏳</div>
              <h3 className="text-sm font-bold text-[#E6007E]">Geri Sayım & Checklist</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Düğün tarihinizi girin, sayacı başlatın ve tüm hazırlık adımlarını eksiksiz tamamlayın.</p>
            </div>
            <Link href="/kontrol-listesi" className="bg-[#E6007E] text-white text-center text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-pink-700 transition w-full shadow-md">
              Sayacı Başlat →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl flex flex-col justify-between gap-4 transition hover:-translate-y-1">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-xl text-emerald-600">🎟️</div>
              <h3 className="text-sm font-bold text-[#4A154B]">Masa & Davetli Listesi</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Davetlilerinizi gruplandırın, LCV katılımlarını yönetin ve oturma planınızı zahmetsizce yapın.</p>
            </div>
            <Link href="/davetli-listesi" className="bg-emerald-600 text-white text-center text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition w-full">
              Listeyi Oluştur →
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
              Henüz eklenmiş firma bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.slice(0, 6).map((vendor) => (
                <div
                  key={vendor.id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between relative ${
                    vendor.isFeatured ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-purple-100'
                  }`}
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
                      {vendor.isFeatured && (
                        <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                          👑 Sponsorlu
                        </span>
                      )}
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
                    <Link href={`/firma/${vendor.id}`} className="bg-[#4A154B] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-purple-900 transition">
                      Teklif Al
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Gelişmiş Kurumsal Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 border-t-[6px] border-[#E6007E]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Hakkımızda */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-white">
              Wedy<span className="text-[#E6007E]">Plan</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              Evlilik hazırlığındaki çiftleri Türkiye'nin en iyi düğün profesyonelleriyle buluşturan, akıllı planlama araçlarına sahip dijital düğün asistanınız.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-white font-bold mb-4">Keşfet</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/arama" className="hover:text-[#E6007E] transition">Düğün Mekanları</Link></li>
              <li><Link href="/arama" className="hover:text-[#E6007E] transition">Düğün Fotoğrafçıları</Link></li>
              <li><Link href="/arama" className="hover:text-[#E6007E] transition">Gelinlik & Modaevleri</Link></li>
              <li><Link href="/blog" className="hover:text-[#E6007E] transition">Düğün Rehberi & Blog</Link></li>
            </ul>
          </div>

          {/* Planlama Araçları */}
          <div>
            <h4 className="text-white font-bold mb-4">Ücretsiz Araçlar</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/butce-hesaplayici" className="hover:text-[#E6007E] transition">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/kontrol-listesi" className="hover:text-[#E6007E] transition">Düğün Kontrol Listesi</Link></li>
              <li><Link href="/davetli-listesi" className="hover:text-[#E6007E] transition">Oturma Planı & LCV</Link></li>
              <li><Link href="/satici" className="hover:text-[#E6007E] transition text-amber-400">Firmalar İçin: Kurumsal Üyelik</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-bold mb-4">İletişim</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>📍 Maslak, İstanbul, Türkiye</li>
              <li>✉️ merhaba@wedyplan.com</li>
              <li>📞 +90 (850) 123 45 67</li>
            </ul>
            <div className="flex gap-4 mt-4">
              {/* Sosyal Medya İkonları (Sembolik) */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E6007E] text-white transition">In</a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E6007E] text-white transition">Ig</a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E6007E] text-white transition">Fb</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} WedyPlan Teknoloji A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Kullanım Koşulları</a>
            <a href="#" className="hover:text-white transition">Gizlilik Politikası (KVKK)</a>
          </div>
        </div>
      </footer>
    </div>
  );
}