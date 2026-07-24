'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Vendor {
  id: string;
  name?: string;
  category?: string;
  city?: string;
  price?: string;
  rating?: string | number;
  imageUrl?: string;
  images?: string[];
  description?: string;
}

interface Request {
  id: string;
  vendorName?: string;
  fullName?: string;
  phone?: string;
  weddingDate?: string;
  guestCount?: string;
  message?: string;
  createdAt?: any;
}

export default function AdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vendors' | 'requests'>('vendors');

  // Yeni Firma Form State'leri
  const [formData, setFormData] = useState({
    name: '',
    category: 'Düğün Salonu',
    city: 'İstanbul',
    price: '100.000 TL - 150.000 TL',
    rating: '4.8',
    description: '',
    coverImage: '',
    image2: '',
    image3: '',
    image4: '',
  });

  const [isAdding, setIsAdding] = useState(false);

  // Verileri Getir
  const fetchData = async () => {
    setLoading(true);
    try {
      // Firmaları Çek
      const vendorsSnap = await getDocs(collection(db, 'vendors'));
      const vendorList: Vendor[] = [];
      vendorsSnap.forEach((d) => vendorList.push({ id: d.id, ...d.data() } as Vendor));
      setVendors(vendorList);

      // Teklif Taleplerini Çek
      const requestsSnap = await getDocs(collection(db, 'requests'));
      const requestList: Request[] = [];
      requestsSnap.forEach((d) => requestList.push({ id: d.id, ...d.data() } as Request));
      setRequests(requestList);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Firma Ekleme
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsAdding(true);

    // Doldurulmuş tüm resim URL'lerini diziye topla
    const imageList = [
      formData.coverImage,
      formData.image2,
      formData.image3,
      formData.image4,
    ].filter((url) => url.trim() !== '');

    try {
      await addDoc(collection(db, 'vendors'), {
        name: formData.name,
        category: formData.category,
        city: formData.city,
        price: formData.price,
        rating: formData.rating,
        description: formData.description,
        imageUrl: formData.coverImage || imageList[0] || '',
        images: imageList,
        createdAt: serverTimestamp(),
      });

      // Formu Sıfırla
      setFormData({
        name: '',
        category: 'Düğün Salonu',
        city: 'İstanbul',
        price: '100.000 TL - 150.000 TL',
        rating: '4.8',
        description: '',
        coverImage: '',
        image2: '',
        image3: '',
        image4: '',
      });

      alert('Firma ve fotoğraf galerisi başarıyla eklendi! 🎉');
      fetchData();
    } catch (error) {
      console.error('Firma ekleme hatası:', error);
      alert('Firma eklenirken hata oluştu.');
    } finally {
      setIsAdding(false);
    }
  };

  // Firma Silme
  const handleDeleteVendor = async (id: string) => {
    if (!confirm('Bu firmayı silmek istediğinize emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, 'vendors', id));
      setVendors(vendors.filter((v) => v.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>{' '}
          <span className="text-xs bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded-md ml-2 font-semibold">
            Yönetim Paneli
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
          ← Ana Sayfaya Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Tab Menüsü */}
        <div className="flex gap-4 border-b border-purple-100 pb-3">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`text-sm font-bold pb-2 border-b-2 transition ${
              activeTab === 'vendors'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🏢 Firmalar & Galeriler ({vendors.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`text-sm font-bold pb-2 border-b-2 transition ${
              activeTab === 'requests'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📩 Gelen Teklif Talepleri ({requests.length})
          </button>
        </div>

        {activeTab === 'vendors' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol: Yeni Firma ve Çoklu Fotoğraf Ekleme Formu */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#4A154B]">+ Yeni Firma & Galeri Ekle</h2>

              <form onSubmit={handleAddVendor} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Firma Adı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bosphorus Kır Bahçesi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    >
                      <option value="Düğün Salonu">Düğün Salonu</option>
                      <option value="Kır Bahçesi">Kır Bahçesi</option>
                      <option value="Fotoğrafçı">Fotoğrafçı</option>
                      <option value="Gelinlik">Gelinlik</option>
                      <option value="Organizasyon">Organizasyon</option>
                      <option value="Müzik & DJ">Müzik & DJ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Şehir</label>
                    <input
                      type="text"
                      required
                      placeholder="İstanbul"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Fiyat Aralığı</label>
                  <input
                    type="text"
                    placeholder="Örn: 80.000 TL - 120.000 TL"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>

                {/* Galeri Fotoğrafları Alanı */}
                <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100 space-y-2">
                  <span className="block text-[11px] font-bold text-[#4A154B]">📸 Galeri Fotoğrafları (URL)</span>
                  
                  <input
                    type="url"
                    placeholder="1. Kapak Görseli URL"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                  />
                  <input
                    type="url"
                    placeholder="2. Galeri Görseli URL"
                    value={formData.image2}
                    onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                  />
                  <input
                    type="url"
                    placeholder="3. Galeri Görseli URL"
                    value={formData.image3}
                    onChange={(e) => setFormData({ ...formData, image3: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                  />
                  <input
                    type="url"
                    placeholder="4. Galeri Görseli URL"
                    value={formData.image4}
                    onChange={(e) => setFormData({ ...formData, image4: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Açıklama</label>
                  <textarea
                    rows={3}
                    placeholder="Firma hakkında kısa bilgi..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isAdding}
                  className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold text-xs hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {isAdding ? 'Kaydediliyor...' : 'Firmayı Kaydet'}
                </button>
              </form>
            </div>

            {/* Sağ: Mevcut Firmalar Listesi */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-[#4A154B]">Kayıtlı Firmalar</h2>

              {loading ? (
                <p className="text-xs text-slate-500">Yükleniyor...</p>
              ) : vendors.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-purple-100 text-center text-xs text-slate-400">
                  Henüz kayıtlı firma yok. Soldaki formdan ekleyebilirsiniz.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-purple-100 overflow-hidden">
                  {vendors.map((v) => (
                    <div key={v.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200'}
                          alt={v.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <h3 className="text-xs font-bold text-slate-800">{v.name}</h3>
                          <p className="text-[10px] text-slate-400">
                            {v.category} • {v.city} • Galeri: {v.images?.length || 1} Fotoğraf
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/firma/${v.id}`}
                          target="_blank"
                          className="text-[10px] font-bold text-[#4A154B] bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition"
                        >
                          Görüntüle ↗
                        </Link>
                        <button
                          onClick={() => handleDeleteVendor(v.id)}
                          className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Gelen Teklif Talepleri Sekmesi */
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-[#4A154B]">Gelen Fiyat Teklifi Talepleri</h2>

            {requests.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Henüz gelen bir teklif talebi bulunmuyor.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {requests.map((req) => (
                  <div key={req.id} className="py-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#E6007E]">{req.vendorName || 'Firma'}</span>
                      <span className="text-[10px] text-slate-400">Tarih: {req.weddingDate || 'Belirtilmedi'}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      👤 {req.fullName} — 📞 {req.phone}
                    </p>
                    {req.message && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}