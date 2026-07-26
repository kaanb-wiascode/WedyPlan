'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  price: string;
  rating: string | number;
  imageUrl: string;
  images?: string[];
  description: string;
  phone: string;
  isFeatured?: boolean;
}

interface Request {
  id: string;
  vendorName?: string;
  fullName: string;
  phone: string;
  weddingDate: string;
  message?: string;
  createdAt?: any;
}

export default function AdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vendors' | 'requests'>('vendors');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Düğün Salonu',
    city: '',
    price: '',
    phone: '',
    description: '',
    imageUrl: '',
    isFeatured: false,
  });

  // Verileri Çek
  const fetchData = async () => {
    setLoading(true);
    try {
      const vendorSnap = await getDocs(collection(db, 'vendors'));
      const vendorList: Vendor[] = [];
      vendorSnap.forEach((d) => vendorList.push({ id: d.id, ...d.data() } as Vendor));
      setVendors(vendorList);

      const reqSnap = await getDocs(collection(db, 'requests'));
      const reqList: Request[] = [];
      reqSnap.forEach((d) => reqList.push({ id: d.id, ...d.data() } as Request));
      setRequests(reqList);
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sponsor / Öne Çıkar Durumunu Değiştir (Toggle)
  const handleToggleFeatured = async (vendor: Vendor) => {
    try {
      const docRef = doc(db, 'vendors', vendor.id);
      const newStatus = !vendor.isFeatured;
      await updateDoc(docRef, { isFeatured: newStatus });

      setVendors((prev) =>
        prev.map((v) => (v.id === vendor.id ? { ...v, isFeatured: newStatus } : v))
      );
    } catch (error) {
      console.error('Sponsorluk değiştirme hatası:', error);
      alert('Sponsorluk durumu güncellenemedi.');
    }
  };

  // Manuel Firma Ekleme
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vendors'), {
        ...formData,
        rating: 4.8,
        images: [formData.imageUrl],
        createdAt: serverTimestamp(),
      });
      alert('Firma başarıyla eklendi!');
      setFormData({
        name: '',
        category: 'Düğün Salonu',
        city: '',
        price: '',
        phone: '',
        description: '',
        imageUrl: '',
        isFeatured: false,
      });
      fetchData();
    } catch (error) {
      console.error('Firma ekleme hatası:', error);
      alert('Firma eklenemedi.');
    }
  };

  // Firma Silme
  const handleDeleteVendor = async (id: string) => {
    if (!confirm('Bu firmayı silmek istediğinizden emin misiniz?')) return;
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
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md ml-2 font-bold uppercase">
            Sistem Yönetimi
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#E6007E]">
          ← Ana Sayfaya Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Üst Yönetim Kartı */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#4A154B]">Sistem Admin Paneli</h1>
            <p className="text-xs text-slate-500">Firmaların öne çıkarılma durumlarını ve gelen teklif taleplerini yönetin.</p>
          </div>
        </div>

        {/* Sekme Butonları */}
        <div className="flex gap-3 border-b border-purple-100 pb-2">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'vendors' ? 'bg-[#4A154B] text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            🏢 Kayıtlı Firmalar ({vendors.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'requests' ? 'bg-[#4A154B] text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            📩 Gelen Teklif Talepleri ({requests.length})
          </button>
        </div>

        {activeTab === 'vendors' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol: Manuel Ekleme Formu */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#4A154B]">Yeni Firma Ekle</h2>
              <form onSubmit={handleAddVendor} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Firma Adı"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                >
                  <option value="Düğün Salonu">Düğün Salonu</option>
                  <option value="Kır Bahçesi">Kır Bahçesi</option>
                  <option value="Fotoğrafçı">Fotoğrafçı</option>
                  <option value="Gelinlik">Gelinlik</option>
                  <option value="Organizasyon">Organizasyon</option>
                  <option value="Müzik & DJ">Müzik & DJ</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Şehir (Örn: İstanbul)"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <input
                  type="text"
                  required
                  placeholder="Fiyat Bilgisi (Örn: 80.000 TL)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefon / WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <input
                  type="url"
                  required
                  placeholder="Görsel Linki (URL)"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Açıklama"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                ></textarea>

                <label className="flex items-center gap-2 text-xs font-bold text-[#4A154B] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>👑 Öne Çıkan / Sponsorlu İlan Yap</span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#E6007E] text-white text-xs font-bold py-3 rounded-xl hover:bg-pink-700 transition cursor-pointer"
                >
                  Kaydet ve Yayınla
                </button>
              </form>
            </div>

            {/* Sağ: Firma Listesi */}
            <div className="lg:col-span-2 space-y-3">
              {loading ? (
                <p className="text-xs text-slate-400 py-8 text-center">Yükleniyor...</p>
              ) : vendors.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">Henüz firma yok.</p>
              ) : (
                vendors.map((v) => (
                  <div
                    key={v.id}
                    className={`bg-white p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      v.isFeatured ? 'border-amber-300 bg-amber-50/20' : 'border-purple-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={v.imageUrl}
                        alt={v.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded">
                            {v.category}
                          </span>
                          {v.isFeatured && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded flex items-center gap-1">
                              👑 Sponsorlu
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-slate-800 mt-1">{v.name}</h3>
                        <p className="text-[11px] text-slate-500">📍 {v.city} • 💰 {v.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleFeatured(v)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                          v.isFeatured
                            ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {v.isFeatured ? '👑 Sponsorlu' : '☆ Öne Çıkar'}
                      </button>

                      <button
                        onClick={() => handleDeleteVendor(v.id)}
                        className="text-xs font-bold text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition cursor-pointer"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Gelen Talepler */
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#4A154B]">Müşteri Teklif Talepleri</h2>
            {requests.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Henüz gelen bir talep bulunmuyor.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                    <span className="text-[10px] font-bold text-[#E6007E]">{r.vendorName || 'Firma'}</span>
                    <h3 className="text-xs font-bold text-slate-800">{r.fullName}</h3>
                    <p className="text-[11px] text-slate-600">📞 {r.phone}</p>
                    <p className="text-[11px] text-slate-500">📅 Düğün Tarihi: {r.weddingDate || 'Belirtilmedi'}</p>
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