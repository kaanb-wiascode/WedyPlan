'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('kategori') || '';
  const initialCity = searchParams.get('sehir') || '';

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity);

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
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  useEffect(() => {
    let result = vendors;

    if (selectedCategory) {
      result = result.filter(
        (v) => v.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedCity) {
      result = result.filter(
        (v) => v.city?.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    setFilteredVendors(result);
  }, [vendors, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <a href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </a>
        <a
          href="/"
          className="text-sm font-semibold text-[#4A154B] hover:text-[#E6007E]"
        >
          ← Ana Sayfaya Dön
        </a>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sol Filtre Paneli */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm h-fit space-y-6">
          <h3 className="text-lg font-bold text-[#4A154B]">Filtrele</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              KATEGORİ
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#E6007E]"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="Düğün Mekanı">Düğün Mekanı</option>
              <option value="Fotoğrafçı">Fotoğrafçı</option>
              <option value="Gelinlik">Gelinlik</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              ŞEHİR
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#E6007E]"
            >
              <option value="">Tüm Şehirler</option>
              <option value="İstanbul">İstanbul</option>
              <option value="İzmir">İzmir</option>
              <option value="Ankara">Ankara</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedCity('');
            }}
            className="w-full text-xs text-[#E6007E] font-semibold hover:underline"
          >
            Filtreleri Temizle
          </button>
        </div>

        {/* Sağ Sonuç Listesi */}
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold text-[#4A154B] mb-6">
            Arama Sonuçları ({filteredVendors.length})
          </h1>

          {loading ? (
            <p className="text-slate-500 font-medium">Sonuçlar aranıyor...</p>
          ) : filteredVendors.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-purple-100">
              <p className="text-slate-600 font-medium mb-2">
                Aradığınız kriterlere uygun firma bulunamadı.
              </p>
              <p className="text-xs text-slate-400">
                Filtreleri değiştirerek tekrar aramayı deneyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-50 hover:shadow-xl transition"
                >
                  <img
                    src={
                      vendor.imageUrl && vendor.imageUrl.trim() !== ''
                        ? vendor.imageUrl
                        : 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'
                    }
                    alt={vendor.name || 'Firma'}
                    className="w-full h-48 object-cover bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800';
                    }}
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-pink-100 text-[#E6007E] rounded-md">
                        {vendor.category || 'Kategori'}
                      </span>
                      <span className="text-sm font-bold text-amber-500">
                        ★ {vendor.rating || '4.9'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4A154B] mb-1">
                      {vendor.name || 'Firma Adı'}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {vendor.city || 'Şehir'}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="text-sm text-slate-600 font-medium">
                        {vendor.price || 'Fiyat Alınız'}
                      </span>
                      <a 
  href={`/firma/${vendor.id}`} 
  className="bg-[#4A154B] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-purple-900 transition text-center inline-block"
>
  Teklif Al
</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Yükleniyor...</div>}>
      <SearchContent />
    </Suspense>
  );
}