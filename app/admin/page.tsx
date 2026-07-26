'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Building2, Users, Activity, Wallet, Star } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  price: string;
  rating: string | number;
  imageUrl: string;
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
}

export default function AdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vendors' | 'requests'>('vendors');

  const [formData, setFormData] = useState({
    name: '', category: 'Düğün Salonu', city: '', price: '', phone: '', description: '', imageUrl: '', isFeatured: false,
  });

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

  useEffect(() => { fetchData(); }, []);

  const handleToggleFeatured = async (vendor: Vendor) => {
    try {
      const docRef = doc(db, 'vendors', vendor.id);
      const newStatus = !vendor.isFeatured;
      await updateDoc(docRef, { isFeatured: newStatus });
      setVendors((prev) => prev.map((v) => (v.id === vendor.id ? { ...v, isFeatured: newStatus } : v)));
    } catch (error) {
      alert('Durum güncellenemedi.');
    }
  };

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vendors'), { ...formData, rating: 4.8, createdAt: serverTimestamp() });
      alert('Firma başarıyla eklendi!');
      setFormData({ name: '', category: 'Düğün Salonu', city: '', price: '', phone: '', description: '', imageUrl: '', isFeatured: false });
      fetchData();
    } catch (error) {
      alert('Firma eklenemedi.');
    }
  };

  const handleDeleteVendor = async (id: string) => {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, 'vendors', id));
      setVendors(vendors.filter((v) => v.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Üst Metrikler */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building2 className="w-5 h-5" /></div>
          <div>
            <span className="text-[20px] font-bold text-slate-800 block">{vendors.length}</span>
            <span className="text-[11px] font-semibold text-slate-500">Kayıtlı Firma</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Users className="w-5 h-5" /></div>
          <div>
            <span className="text-[20px] font-bold text-slate-800 block">{requests.length}</span>
            <span className="text-[11px] font-semibold text-slate-500">Gelen Talep</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Star className="w-5 h-5" /></div>
          <div>
            <span className="text-[20px] font-bold text-slate-800 block">
              {vendors.filter(v => v.isFeatured).length}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">Sponsorlu Firma</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Wallet className="w-5 h-5" /></div>
          <div>
            <span className="text-[20px] font-bold text-slate-800 block">₺2.4M</span>
            <span className="text-[11px] font-semibold text-slate-500">Platform Hacmi</span>
          </div>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('vendors')}
          className={`text-[12px] font-bold px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'vendors' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          🏢 Kayıtlı Firmalar ({vendors.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`text-[12px] font-bold px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'requests' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          📩 Müşteri Talepleri ({requests.length})
        </button>
      </div>

      {/* İçerik Alanı */}
      {activeTab === 'vendors' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol: Ekleme Formu */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-fit">
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" /> Yeni Firma Ekle
            </h2>
            <form onSubmit={handleAddVendor} className="space-y-3">
              <input type="text" required placeholder="Firma Adı" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500" />
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500 bg-white">
                <option value="Düğün Salonu">Düğün Salonu</option>
                <option value="Kır Bahçesi">Kır Bahçesi</option>
                <option value="Fotoğrafçı">Fotoğrafçı</option>
                <option value="Organizasyon">Organizasyon</option>
              </select>
              <input type="text" required placeholder="Şehir" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500" />
              <input type="text" required placeholder="Fiyat Bilgisi" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500" />
              <input type="tel" required placeholder="Telefon" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500" />
              <input type="url" required placeholder="Görsel Linki URL" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500" />
              <textarea rows={2} required placeholder="Kısa Açıklama" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-blue-500"></textarea>
              <label className="flex items-center gap-2 text-[12px] font-bold text-slate-700 cursor-pointer pt-1">
                <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-amber-500" />
                👑 Ana Sayfa Sponsoru Yap
              </label>
              <button type="submit" className="w-full bg-blue-600 text-white text-[12px] font-bold py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer">
                Kaydet ve Yayınla
              </button>
            </form>
          </div>

          {/* Sağ: Firma Listesi */}
          <div className="lg:col-span-2 space-y-3">
            {loading ? <p className="text-xs text-slate-400 py-8 text-center">Veriler Yükleniyor...</p> : vendors.map((v) => (
              <div key={v.id} className={`bg-white p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${v.isFeatured ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <img src={v.imageUrl} alt={v.name} className="w-14 h-14 rounded-xl object-cover border border-slate-100" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{v.category}</span>
                      {v.isFeatured && <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">👑 Sponsorlu</span>}
                    </div>
                    <h3 className="text-[14px] font-bold text-slate-800">{v.name}</h3>
                    <p className="text-[11px] text-slate-500">{v.city} • {v.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleToggleFeatured(v)} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer ${v.isFeatured ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {v.isFeatured ? 'Sponsorluğu Kaldır' : 'Öne Çıkar'}
                  </button>
                  <button onClick={() => handleDeleteVendor(v.id)} className="text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer">
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Gelen Talepler */
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-[15px] font-bold text-slate-800">Tüm Müşteri Talepleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((r) => (
              <div key={r.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{r.vendorName || 'Genel Talep'}</span>
                <h3 className="text-[14px] font-bold text-slate-800 mt-2">{r.fullName}</h3>
                <p className="text-[11px] text-slate-600">📞 {r.phone}</p>
                <p className="text-[11px] text-slate-500">📅 Tarih: {r.weddingDate || 'Belirtilmedi'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}