'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

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

const DEMO_VENDORS = [
  {
    name: 'Bosphorus Palace Kır Bahçesi',
    category: 'Kır Bahçesi',
    city: 'İstanbul',
    price: '95.000 TL',
    rating: 4.9,
    phone: '05321112233',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200',
    ],
    description: 'Boğaz manzarası eşliğinde 1000 kişilik yemekli ve yemeksiz kır düğünü organizasyonları için hayallerinizdeki mekan.',
  },
  {
    name: 'Ege Esintisi Düğün Salonu',
    category: 'Düğün Salonu',
    city: 'İzmir',
    price: '75.000 TL',
    rating: 4.8,
    phone: '05332223344',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf4d284f32d?w=800',
    images: [
      'https://images.unsplash.com/photo-1545232979-fbf4d284f32d?w=1200',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200',
    ],
    description: 'İzmir Bayraklı’da yüksek tavanlı, kolonsuz modern mimarisi ve lüks ikramlarıyla unutulmaz anlar sunuyoruz.',
  },
  {
    name: 'Art & Motion Wedding Photography',
    category: 'Fotoğrafçı',
    city: 'Ankara',
    price: '25.000 TL',
    rating: 5.0,
    phone: '05343334455',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
    images: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200',
    ],
    description: 'Düğün hikayesi, dış çekim ve drone çekimleriyle en özel gününüzü sinematik ve doğal karelerle ölümsüzleştiriyoruz.',
  },
  {
    name: 'Haute Couture Gelinlik & Modaevi',
    category: 'Gelinlik',
    city: 'İstanbul',
    price: '35.000 TL',
    rating: 4.9,
    phone: '05354445566',
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800',
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=1200',
    ],
    description: 'Kişiye özel tasarım gelinlikler, A kesim, helen ve prenses modeller ile gelinlerimizin ışıltısını ortaya çıkarıyoruz.',
  },
  {
    name: 'Dream Events Organizasyon',
    category: 'Organizasyon',
    city: 'Bursa',
    price: '40.000 TL',
    rating: 4.7,
    phone: '05365556677',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200',
    ],
    description: 'Masa süslemesinden sahne ışıklandırmasına, karşılama ekibinden gelin yoluna kadar tüm detayları kusursuz tasarlıyoruz.',
  },
  {
    name: 'Ritmi Hisset Live Orchestra & DJ',
    category: 'Müzik & DJ',
    city: 'İstanbul',
    price: '30.000 TL',
    rating: 5.0,
    phone: '05376667788',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
    ],
    description: 'Geniş repertuvarlı canlı orkestra performansı ve enerjik DJ konseptiyle düğün eğlencenizi zirveye taşıyoruz.',
  },
];

export default function AdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vendors' | 'requests'>('vendors');
  const [isSeeding, setIsSeeding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Düğün Salonu',
    city: '',
    price: '',
    phone: '',
    description: '',
    imageUrl: '',
  });

  // Verileri Çek
  const fetchData = async () => {
    setLoading(true);
    try {
      // Firmaları Çek
      const vendorSnap = await getDocs(collection(db, 'vendors'));
      const vendorList: Vendor[] = [];
      vendorSnap.forEach((d) => vendorList.push({ id: d.id, ...d.data() } as Vendor));
      setVendors(vendorList);

      // Talepleri Çek
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

  // Tek Tıkla Örnek Demo Veri Yükleyici
  const handleSeedData = async () => {
    if (!confirm('Veritabanına 6 adet kaliteli örnek firma verisi yüklensin mi?')) return;
    setIsSeeding(true);
    try {
      for (const item of DEMO_VENDORS) {
        await addDoc(collection(db, 'vendors'), {
          ...item,
          createdAt: serverTimestamp(),
        });
      }
      alert('🎉 6 adet örnek firma başarıyla veritabanına yüklendi!');
      fetchData();
    } catch (error) {
      console.error('Demo veri yükleme hatası:', error);
      alert('Demo veriler yüklenirken bir hata oluştu.');
    } finally {
      setIsSeeding(false);
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
        {/* Üst Yönetim Kartı & Demo Veri Yükleme Butonu */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#4A154B]">Sistem Admin Paneli</h1>
            <p className="text-xs text-slate-500">Tüm firmaları ve gelen kullanıcı taleplerini buradan denetleyebilirsiniz.</p>
          </div>
          <button
            onClick={handleSeedData}
            disabled={isSeeding}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            <span>✨</span>
            <span>{isSeeding ? 'Yükleniyor...' : 'Örnek Demo Verileri Yükle'}</span>
          </button>
        </div>

        {/* Sekme Butonları */}
        <div className="flex gap-3 border-b border-purple-100 pb-2">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
              activeTab === 'vendors' ? 'bg-[#4A154B] text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            🏢 Kayıtlı Firmalar ({vendors.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
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
                <button
                  type="submit"
                  className="w-full bg-[#E6007E] text-white text-xs font-bold py-3 rounded-xl hover:bg-pink-700 transition"
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
                <div className="bg-white p-8 rounded-3xl border border-purple-100 text-center space-y-3">
                  <p className="text-xs text-slate-500">Henüz hiç firma bulunmuyor.</p>
                  <button
                    onClick={handleSeedData}
                    className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    ✨ Hemen 6 Adet Örnek Firma Yükle
                  </button>
                </div>
              ) : (
                vendors.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={v.imageUrl}
                        alt={v.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                      />
                      <div>
                        <span className="text-[10px] font-bold bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded">
                          {v.category}
                        </span>
                        <h3 className="text-xs font-bold text-slate-800 mt-0.5">{v.name}</h3>
                        <p className="text-[11px] text-slate-500">📍 {v.city} • 💰 {v.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteVendor(v.id)}
                      className="text-xs font-bold text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      Sil
                    </button>
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