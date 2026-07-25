'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  price: string;
  rating: string | number;
  imageUrl: string;
  description: string;
  phone?: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteVendors, setFavoriteVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Oturum Durumunu Dinle & Favorileri Çek
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Firestore'dan kullanıcının favorilerini çek
          const favDocRef = doc(db, 'favorites', currentUser.uid);
          const favDocSnap = await getDoc(favDocRef);

          let ids: string[] = [];
          if (favDocSnap.exists()) {
            ids = favDocSnap.data().vendorIds || [];
          } else {
            // Cihaz hafızasındaki favorileri taşı
            const localFavs = localStorage.getItem('wedy_favorites');
            if (localFavs) ids = JSON.parse(localFavs);
          }

          setFavoriteIds(ids);

          // Favori ID'lerine göre firmaların detaylarını getir
          if (ids.length > 0) {
            const vendorsList: Vendor[] = [];
            for (const vId of ids) {
              const vendorDocRef = doc(db, 'vendors', vId);
              const vendorDocSnap = await getDoc(vendorDocRef);
              if (vendorDocSnap.exists()) {
                vendorsList.push({ id: vendorDocSnap.id, ...vendorDocSnap.data() } as Vendor);
              }
            }
            setFavoriteVendors(vendorsList);
          }
        } catch (error) {
          console.error('Favoriler yüklenirken hata:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Giriş yapmamışsa cihaz hafızasından yükle
        try {
          const localFavs = localStorage.getItem('wedy_favorites');
          if (localFavs) {
            const ids = JSON.parse(localFavs);
            setFavoriteIds(ids);
            
            const vendorsList: Vendor[] = [];
            for (const vId of ids) {
              const vendorDocRef = doc(db, 'vendors', vId);
              const vendorDocSnap = await getDoc(vendorDocRef);
              if (vendorDocSnap.exists()) {
                vendorsList.push({ id: vendorDocSnap.id, ...vendorDocSnap.data() } as Vendor);
              }
            }
            setFavoriteVendors(vendorsList);
          }
        } catch (e) {
          console.error('Yerel favori yükleme hatası:', e);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Favoriden Çıkar
  const handleRemoveFavorite = async (vendorId: string) => {
    const updatedIds = favoriteIds.filter((id) => id !== vendorId);
    const updatedVendors = favoriteVendors.filter((v) => v.id !== vendorId);

    setFavoriteIds(updatedIds);
    setFavoriteVendors(updatedVendors);

    try {
      if (user) {
        await setDoc(doc(db, 'favorites', user.uid), {
          vendorIds: updatedIds,
          updatedAt: new Date().toISOString(),
        });
      } else {
        localStorage.setItem('wedy_favorites', JSON.stringify(updatedIds));
      }
    } catch (error) {
      console.error('Favori silme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/arama" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            🔍 Firma Ara
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık Kartı */}
        <div className="bg-gradient-to-r from-[#4A154B] to-purple-900 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-pink-500/30 text-pink-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Kişisel Listeniz
              </span>
              {user && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  ☁️ Hesabınıza Senkronize
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Favori Düğün Firmalarım ❤️</h1>
            <p className="text-purple-200 text-xs md:text-sm mt-1 max-w-lg">
              Beğendiğiniz mekanları ve hizmet sağlayıcılarını burada karşılaştırabilir, doğrudan iletişime geçebilirsiniz.
            </p>
          </div>
          <Link
            href="/arama"
            className="bg-[#E6007E] hover:bg-pink-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-lg whitespace-nowrap"
          >
            + Yeni Firma Keşfet
          </Link>
        </div>

        {/* Liste Alanı */}
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-16">Favorileriniz yükleniyor...</p>
        ) : favoriteVendors.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-pink-50 text-[#E6007E] text-2xl rounded-full flex items-center justify-center mx-auto">
              ❤️
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#4A154B]">Favori Listeniz Henüz Boş</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Arama sayfasındaki firmaların üzerindeki kalp butonuna tıklayarak beğendiğiniz seçenekleri buraya ekleyebilirsiniz.
              </p>
            </div>
            <Link
              href="/arama"
              className="inline-block bg-[#4A154B] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-900 transition shadow"
            >
              Firmaları İncelemeye Başla →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between relative"
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

                    {/* Favoriden Çıkar Butonu */}
                    <button
                      onClick={() => handleRemoveFavorite(vendor.id)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-red-50 text-red-500 p-2 rounded-full transition shadow-md"
                      title="Favorilerden Çıkar"
                    >
                      ❤️
                    </button>
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
                    Detay & Teklif
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}