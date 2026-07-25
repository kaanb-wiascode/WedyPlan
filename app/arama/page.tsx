'use client';

import React, { useEffect, useState } from 'react';
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
  isFeatured?: boolean; // Sponsorlu / Öne Çıkan İlan
}

const CATEGORIES = [
  'Tümü',
  'Düğün Salonu',
  'Kır Bahçesi',
  'Fotoğrafçı',
  'Gelinlik',
  'Organizasyon',
  'Müzik & DJ',
];

const CITIES = ['Tüm Şehirler', 'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];

export default function SearchPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtre State'leri
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedCity, setSelectedCity] = useState('Tüm Şehirler');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchVendors() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vendors'));
        const vendorData: Vendor[] = [];
        querySnapshot.forEach((doc) => {
          vendorData.push({ id: doc.id, ...doc.data() } as Vendor);
        });

        // Öne çıkan firmaları her zaman en üste sıralayalım
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

  // Filtreleme Mantığı
  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === 'Tümü' || vendor.category === selectedCategory;
    const matchesCity =
      selectedCity === 'Tüm Şehirler' || vendor.city === selectedCity;
    const matchesQuery =
      !searchQuery ||
      vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCity && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
          ← Ana Sayfa
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#4A154B]">
            Düğün Firmaları & Mekanları 🔍
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Hayalinizdeki organizasyon için en iyi profesyonelleri filtreleyin, inceleyin ve fiyat teklifi alın.
          </p>
        </div>

        {/* Filtreleme Alanı */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* İsimle Arama */}
            <input
              type="text"
              placeholder="Firma veya mekan adı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />

            {/* Şehir Seçimi */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  📍 {city}
                </option>
              ))}
            </select>

            {/* Temizle Butonu */}
            <button
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedCity('Tüm Şehirler');
                setSearchQuery('');
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-3 px-4 rounded-xl transition"
            >
              Filtreleri Temizle
            </button>
          </div>

          {/* Kategori Butonları */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  selectedCategory === cat
                    ? 'bg-[#4A154B] text-white shadow'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-purple-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuç Listesi */}
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-12">Firmalar yükleniyor...</p>
        ) : filteredVendors.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-purple-100 text-slate-500 space-y-2">
            <p className="text-2xl">🔎</p>
            <p className="text-xs font-bold">Aramanıza uygun firma bulunamadı.</p>
            <p className="text-[11px] text-slate-400">Filtre kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
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
                    
                    {/* Kategori Rozeti */}
                    <span className="absolute top-3 left-3 bg-[#4A154B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {vendor.category}
                    </span>

                    {/* Sponsorlu / Öne Çıkan Rozeti */}
                    {vendor.isFeatured && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
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
      </div>
    </div>
  );
}