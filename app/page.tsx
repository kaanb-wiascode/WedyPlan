'use client';

import React, { useEffect, useState } from 'react';
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
        console.error('Firebase veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <div className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-[#E6007E]">Mekanlar</a>
          <a href="#" className="hover:text-[#E6007E]">Fotoğrafçılar</a>
          <a href="#" className="hover:text-[#E6007E]">Gelinlik</a>
        </div>
        <button className="bg-[#E6007E] text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-700 transition">
          Firma Girişi
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-purple-50 to-[#FDFBFD]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4A154B] mb-4">
          Hayalindeki Düğünü Planla
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          En iyi düğün mekanları, fotoğrafçılar ve organizasyon firmaları WedyPlan'da seni bekliyor.
        </p>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow-lg border border-purple-100 flex flex-col md:flex-row gap-4">
          <select className="flex-1 p-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#E6007E]">
            <option value="">Kategori Seç (Tümü)</option>
            <option value="Düğün Mekanı">Düğün Mekanı</option>
            <option value="Fotoğrafçı">Fotoğrafçı</option>
          </select>
          <select className="flex-1 p-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#E6007E]">
            <option value="">Şehir Seç (Tümü)</option>
            <option value="İstanbul">İstanbul</option>
            <option value="İzmir">İzmir</option>
            <option value="Ankara">Ankara</option>
          </select>
          <button className="bg-[#E6007E] text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition">
            Mekan Bul
          </button>
        </div>
      </section>

      {/* Dynamic Vendors Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#4A154B] mb-6">
          Öne Çıkan Firmalar
        </h2>

        {loading ? (
          <p className="text-slate-500 font-medium">Firebase veritabanından firmalar yükleniyor...</p>
        ) : vendors.length === 0 ? (
          <p className="text-slate-500">Henüz kayıtlı firma bulunamadı. Firebase Console üzerinden 'vendors' koleksiyonuna veri ekleyebilirsiniz.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-50 hover:shadow-xl transition">
               <img
  src={vendor.imageUrl && vendor.imageUrl.trim() !== '' ? vendor.imageUrl : 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'}
  alt={vendor.name || 'Firma'}
  className="w-full h-48 object-cover bg-slate-100"
  onError={(e) => {
    // Resim yüklenemezse yedek düğün resmi göster
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800';
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
                  <p className="text-sm text-slate-500 mb-4">{vendor.city || 'Şehir'}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-sm text-slate-600 font-medium">{vendor.price || 'Fiyat Alınız'}</span>
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
      </section>
    </div>
  );
}