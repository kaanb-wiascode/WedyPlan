'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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

const CATEGORIES = [
  'Tüm Kategoriler',
  'Düğün Salonu',
  'Kır Bahçesi',
  'Fotoğrafçı',
  'Gelinlik',
  'Organizasyon',
  'Müzik & DJ',
];

export default function SearchPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtre State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tüm Kategoriler');
  const [selectedCity, setSelectedCity] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Favoriler (LocalStorage)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Favorileri Yükle
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('wedy_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Favoriler yüklenirken hata:', e);
    }
  }, []);

  // Firmaları Çek
  useEffect(() => {
    async function fetchVendors() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vendors'));
        const vendorList: Vendor[] = [];
        querySnapshot.forEach((doc) => {
          vendorList.push({ id: doc.id, ...doc.data() } as Vendor);
        });
        setVendors(vendorList);
      } catch (error) {
        console.error('Firmalar çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  // Favori Ekle / Çıkar
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedFavs: string[];
    if (favorites.includes(id)) {
      updatedFavs = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavs = [...favorites, id];
    }

    setFavorites(updatedFavs);
    localStorage.setItem('wedy_favorites', JSON.stringify(updatedFavs));
  };

  // Filtreleme Mantığı
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      // Arama Metni Filtresi (İsim veya Açıklama)
      const matchesSearch =
        !searchQuery ||
        vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Kategori Filtresi
      const matchesCategory =
        selectedCategory === 'Tüm Kategoriler' ||
        vendor.category?.toLowerCase() === selectedCategory.toLowerCase();

      // Şehir Filtresi
      const matchesCity =
        !selectedCity ||
        vendor.city?.toLowerCase().includes(selectedCity.toLowerCase());

      // Favori Filtresi
      const matchesFavorites = !showOnlyFavorites || favorites.includes(vendor.id);

      return matchesSearch && matchesCategory && matchesCity && matchesFavorites;
    });
  }, [vendors, searchQuery, selectedCategory, selectedCity, showOnlyFavorites, favorites]);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/butce-hesaplayici"
            className="text-xs font-bold text-[#E6007E] bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition"
          >
            💍 Bütçe Hesaplayıcı
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E] transition"
          >
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Düğün Hizmetlerini Keşfet 💍
          </h1>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Aradığınız kategoriyi veya şehri seçin, hayalinizdeki düğün profesyonelleriyle anında iletişime geçin.
          </p>
        </div>

        {/* Filtreleme Arama Paneli */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Kelime ile Arama */}
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Firma adı veya anahtar kelime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
              />
            </div>

            {/* Kategori Seçimi */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Şehir Arama */}
            <input
              type="text"
              placeholder="Şehir (Örn: İstanbul, İzmir)"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
          </div>

          {/* Favori Filtre Butonu ve Temizle */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                showOnlyFavorites
                  ? 'bg-[#E6007E] text-white'
                  : 'bg-purple-50 text-[#4A154B] hover:bg-purple-100'
              }`}
            >
              <span>{showOnlyFavorites ? '❤️' : '🤍'}</span>
              <span>Sadece Favorilerim ({favorites.length})</span>
            </button>

            {(searchQuery || selectedCategory !== 'Tüm Kategoriler' || selectedCity || showOnlyFavorites) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tüm Kategoriler');
                  setSelectedCity('');
                  setShowOnlyFavorites(false);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-red-500 transition"
              >
                Filtreleri Temizle ✕
              </button>
            )}
          </div>
        </div>

        {/* Sonuç Alanı */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 px-2">
            <span>Toplam <strong>{filteredVendors.length}</strong> firma bulundu</span>
          </div>

          {loading ? (
            <p className="text-center text-slate-500 text-sm py-12">Firmalar aranıyor...</p>
          ) : filteredVendors.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-purple-100 space-y-3">
              <p className="text-base font-bold text-[#4A154B]">Aradığınız kriterlere uygun firma bulunamadı 😔</p>
              <p className="text-xs text-slate-400">Filtrelerinizi değiştirerek tekrar aramayı deneyebilirsiniz.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const isFav = favorites.includes(vendor.id);
                return (
                  <div
                    key={vendor.id}
                    className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={
                            vendor.imageUrl ||
                            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'
                          }
                          alt={vendor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#4A154B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase shadow">
                          {vendor.category || 'Düğün'}
                        </span>

                        {/* Favori Kalp Butonu */}
                        <button
                          onClick={(e) => toggleFavorite(vendor.id, e)}
                          className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
                          title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                        >
                          <span className="text-sm">{isFav ? '❤️' : '🤍'}</span>
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-bold text-[#4A154B] line-clamp-1">
                            {vendor.name}
                          </h3>
                          <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                            ★ {vendor.rating || '4.8'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">📍 {vendor.city || 'Belirtilmedi'}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-2">
                          {vendor.description || 'Profesyonel düğün hizmeti.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between mt-4">
                      <span className="text-xs font-bold text-[#E6007E]">
                        {vendor.price || 'Fiyat Alınız'}
                      </span>
                      <Link
                        href={`/firma/${vendor.id}`}
                        className="bg-[#4A154B] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-purple-900 transition"
                      >
                        İncele & Teklif Al
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}