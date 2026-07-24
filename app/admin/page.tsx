'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../lib/firebase';

interface RequestItem {
  id: string;
  vendorName?: string;
  fullName?: string;
  phone?: string;
  weddingDate?: string;
  guestCount?: string;
  message?: string;
  createdAt?: any;
}

export default function AdminPanelPage() {
  const router = useRouter();
  const [userLoading, setUserLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'addVendor'>('requests');

  // Gelen Teklifler State'i
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Yeni Firma Form State'leri
  const [vendorForm, setVendorForm] = useState({
    name: '',
    category: 'Düğün Mekanı',
    city: 'İstanbul',
    price: '',
    rating: '4.8',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [addingVendor, setAddingVendor] = useState(false);
  const [vendorSuccess, setVendorSuccess] = useState(false);

  // Oturum Kontrolü (Giriş yapılmadıysa /login'e at)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Gelen Teklif Taleplerini Çek
  useEffect(() => {
    async function fetchRequests() {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const requestData: RequestItem[] = [];
        querySnapshot.forEach((doc) => {
          requestData.push({ id: doc.id, ...doc.data() } as RequestItem);
        });
        setRequests(requestData);
      } catch (error) {
        console.error('Talepler çekilirken hata oluştu:', error);
      } finally {
        setLoadingRequests(false);
      }
    }

    if (!userLoading) {
      fetchRequests();
    }
  }, [userLoading]);

  // Çıkış Yapma Fonksiyonu
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // Yeni Firma Kaydetme & Resim Yükleme Fonksiyonu
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingVendor(true);
    setVendorSuccess(false);

    try {
      let finalImageUrl = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800';

      if (imageFile) {
        const storageRef = ref(storage, `vendors/${Date.now()}_${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(uploadResult.ref);
      }

      await addDoc(collection(db, 'vendors'), {
        ...vendorForm,
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
      });

      setVendorSuccess(true);
      setImageFile(null);
      setVendorForm({
        name: '',
        category: 'Düğün Mekanı',
        city: 'İstanbul',
        price: '',
        rating: '4.8',
        description: '',
      });
    } catch (error) {
      console.error('Firma ekleme hatası:', error);
      alert('Firma eklenirken bir hata oluştu.');
    } finally {
      setAddingVendor(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex items-center justify-center">
        <p className="text-[#4A154B] font-semibold">Oturum kontrol ediliyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#4A154B] text-white shadow-md">
        <div className="text-2xl font-bold">
          Wedy<span className="text-[#E6007E]">Plan</span> <span className="text-xs font-normal opacity-75">| Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
            Sitede Gör →
          </a>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Menüsü */}
        <div className="flex gap-4 border-b border-purple-100 mb-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 ${
              activeTab === 'requests'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Gelen Teklif Talepleri ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('addVendor')}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 ${
              activeTab === 'addVendor'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            + Yeni Firma Ekle
          </button>
        </div>

        {/* Tab 1: Talepler */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-xl font-bold text-[#4A154B] mb-4">Gelen Müşteri Talepleri</h2>
            {loadingRequests ? (
              <p className="text-slate-500">Talepler yükleniyor...</p>
            ) : requests.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-purple-100 text-center text-slate-500">
                Henüz gelen bir teklif talebi bulunmuyor.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs text-[#E6007E] font-bold uppercase">Talep Edilen Firma:</span>
                        <h3 className="text-lg font-bold text-[#4A154B]">{req.vendorName || 'Belirtilmedi'}</h3>
                      </div>
                      <span className="bg-purple-100 text-[#4A154B] text-xs px-2.5 py-1 rounded-full font-semibold">
                        Yeni
                      </span>
                    </div>

                    <div className="text-sm space-y-1 text-slate-600">
                      <p><strong className="text-slate-800">Müşteri:</strong> {req.fullName}</p>
                      <p><strong className="text-slate-800">Telefon:</strong> <a href={`tel:${req.phone}`} className="text-[#E6007E] underline">{req.phone}</a></p>
                      <p><strong className="text-slate-800">Düğün Tarihi:</strong> {req.weddingDate || 'Belirtilmedi'}</p>
                      <p><strong className="text-slate-800">Konuk Sayısı:</strong> {req.guestCount || 'Belirtilmedi'}</p>
                      {req.message && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-xl text-xs italic border border-slate-100">
                          "{req.message}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Firma Ekleme */}
        {activeTab === 'addVendor' && (
          <div className="max-w-2xl bg-white p-8 rounded-2xl border border-purple-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#4A154B] mb-2">Yeni Firma / Mekan İlanı Oluştur</h2>
            <p className="text-xs text-slate-500 mb-6">Bilgisayarınızdan görsel seçip doğrudan sisteme yükleyebilirsiniz.</p>

            {vendorSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-semibold">
                🎉 Firma ve görsel başarıyla yüklendi, ilan anında yayına alındı!
              </div>
            )}

            <form onSubmit={handleAddVendor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Firma / Mekan Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Portis Kır Bahçesi"
                  value={vendorForm.name}
                  onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                  <select
                    value={vendorForm.category}
                    onChange={(e) => setVendorForm({ ...vendorForm, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                  >
                    <option value="Düğün Mekanı">Düğün Mekanı</option>
                    <option value="Fotoğrafçı">Fotoğrafçı</option>
                    <option value="Gelinlik">Gelinlik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Şehir</label>
                  <select
                    value={vendorForm.city}
                    onChange={(e) => setVendorForm({ ...vendorForm, city: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Ankara">Ankara</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Başlangıç Fiyatı</label>
                  <input
                    type="text"
                    placeholder="Örn: 50.000 TL'den başlayan"
                    value={vendorForm.price}
                    onChange={(e) => setVendorForm({ ...vendorForm, price: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Puan (1.0 - 5.0)</label>
                  <input
                    type="text"
                    placeholder="4.8"
                    value={vendorForm.rating}
                    onChange={(e) => setVendorForm({ ...vendorForm, rating: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Firma Görseli Yükle</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full p-2 border border-slate-200 rounded-xl text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#4A154B] hover:file:bg-purple-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Firma hakkında kısa bilgi..."
                  value={vendorForm.description}
                  onChange={(e) => setVendorForm({ ...vendorForm, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={addingVendor}
                className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-md disabled:opacity-50"
              >
                {addingVendor ? 'Görsel Yükleniyor ve Kaydediliyor...' : 'Firmayı Yayınla'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}