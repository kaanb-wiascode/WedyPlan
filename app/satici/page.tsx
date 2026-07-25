'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface Vendor {
  id: string;
  userId: string;
  name: string;
  category: string;
  city: string;
  price: string;
  rating: string | number;
  imageUrl: string;
  images: string[];
  description: string;
  phone: string;
}

interface Request {
  id: string;
  fullName: string;
  phone: string;
  weddingDate: string;
  message: string;
  createdAt: any;
}

export default function VendorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'requests'>('profile');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Düğün Salonu',
    city: '',
    price: '',
    phone: '',
    description: '',
    coverImage: '',
    image2: '',
    image3: '',
    image4: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  // 1. Kullanıcı Oturumunu Kontrol Et
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchVendorProfile(currentUser.uid);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Firmaya Ait Verileri Çek
  const fetchVendorProfile = async (userId: string) => {
    try {
      // Satıcının profili var mı kontrol et
      const q = query(collection(db, 'vendors'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const vData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Vendor;
        setVendorData(vData);

        // Formu mevcut verilerle doldur
        setFormData({
          name: vData.name || '',
          category: vData.category || 'Düğün Salonu',
          city: vData.city || '',
          price: vData.price || '',
          phone: vData.phone || '',
          description: vData.description || '',
          coverImage: vData.imageUrl || '',
          image2: vData.images?.[1] || '',
          image3: vData.images?.[2] || '',
          image4: vData.images?.[3] || '',
        });

        // Satıcıya gelen talepleri çek
        const reqQuery = query(collection(db, 'requests'), where('vendorId', '==', vData.id));
        const reqSnap = await getDocs(reqQuery);
        const reqList: Request[] = [];
        reqSnap.forEach((d) => reqList.push({ id: d.id, ...d.data() } as Request));
        setRequests(reqList);
      }
    } catch (error) {
      console.error('Veri çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Profili Kaydet veya Güncelle
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    const imageList = [formData.coverImage, formData.image2, formData.image3, formData.image4].filter(
      (url) => url.trim() !== ''
    );

    const vendorPayload = {
      userId: user.uid,
      name: formData.name,
      category: formData.category,
      city: formData.city,
      price: formData.price,
      phone: formData.phone,
      description: formData.description,
      imageUrl: formData.coverImage || imageList[0] || '',
      images: imageList,
      rating: vendorData?.rating || '5.0', // Yeni ekleniyorsa varsayılan 5 yıldız
    };

    try {
      if (vendorData) {
        // Mevcut Profili Güncelle
        const docRef = doc(db, 'vendors', vendorData.id);
        await updateDoc(docRef, vendorPayload);
        alert('Firma bilgileriniz başarıyla güncellendi! 🎉');
      } else {
        // Yeni Profil Oluştur
        const docRef = await addDoc(collection(db, 'vendors'), {
          ...vendorPayload,
          createdAt: serverTimestamp(),
        });
        setVendorData({ id: docRef.id, ...vendorPayload } as Vendor);
        alert('Tebrikler! Firma profiliniz oluşturuldu ve yayına alındı! 🚀');
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('İşlem sırasında bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded-md ml-2 font-bold uppercase tracking-wider hidden sm:inline-block">
            İş Ortağı Paneli
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#E6007E]">
          ← Ana Sayfaya Dön
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#4A154B] to-purple-900 p-6 rounded-3xl text-white shadow-lg">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Hoş Geldiniz, {user?.displayName || 'Değerli İş Ortağımız'} 👋
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Firma vitrininizi buradan yönetebilir ve müşteri taleplerini görüntüleyebilirsiniz.
            </p>
          </div>
          {vendorData && (
            <Link
              href={`/firma/${vendorData.id}`}
              target="_blank"
              className="bg-[#E6007E] hover:bg-pink-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition text-center"
            >
              Vitrinimi Görüntüle ↗
            </Link>
          )}
        </div>

        {/* Sekmeler */}
        <div className="flex gap-4 border-b border-purple-100">
          <button
            onClick={() => setActiveTab('profile')}
            className={`text-xs md:text-sm font-bold pb-3 border-b-2 transition ${
              activeTab === 'profile' ? 'border-[#E6007E] text-[#E6007E]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🏢 Firma Vitrinim
          </button>
          {vendorData && (
            <button
              onClick={() => setActiveTab('requests')}
              className={`text-xs md:text-sm font-bold pb-3 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'requests' ? 'border-[#E6007E] text-[#E6007E]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              📩 Gelen Talepler 
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{requests.length}</span>
            </button>
          )}
        </div>

        {activeTab === 'profile' ? (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#4A154B] mb-6">
              {vendorData ? 'Firma Bilgilerini Güncelle' : 'Yeni Firma Profili Oluştur'}
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Firma Adı</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="Örn: Bosphorus Kır Bahçesi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
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
                  <label className="block text-xs font-bold text-slate-600 mb-1">Şehir</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="Örn: İstanbul"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Başlangıç Fiyatı</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="Örn: 80.000 TL'den başlayan fiyatlarla"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp / İletişim No</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="Örn: 05554443322"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Firma Açıklaması & Hakkımızda</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  placeholder="Çiftlere sunduğunuz hizmetleri ve farkınızı anlatın..."
                ></textarea>
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-3">
                <span className="block text-xs font-bold text-[#4A154B]">📸 Galeri URL'leri (En az 1 adet zorunlu)</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="url"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="1. Kapak Görseli URL (Zorunlu)"
                  />
                  <input
                    type="url"
                    value={formData.image2}
                    onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="2. Galeri Görseli URL (İsteğe bağlı)"
                  />
                  <input
                    type="url"
                    value={formData.image3}
                    onChange={(e) => setFormData({ ...formData, image3: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="3. Galeri Görseli URL (İsteğe bağlı)"
                  />
                  <input
                    type="url"
                    value={formData.image4}
                    onChange={(e) => setFormData({ ...formData, image4: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    placeholder="4. Galeri Görseli URL (İsteğe bağlı)"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Not: Resimleri hızlı yüklemek için Unsplash veya Imgur linkleri kullanabilirsiniz.</p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-[#E6007E] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-pink-700 transition shadow-lg disabled:opacity-50"
              >
                {isSaving ? 'Kaydediliyor...' : vendorData ? 'Değişiklikleri Kaydet' : 'Profilimi Oluştur ve Yayına Al'}
              </button>
            </form>
          </div>
        ) : (
          /* Gelen Talepler Sekmesi */
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#4A154B] mb-2">Gelen Teklif Talepleri</h2>
            {requests.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-2xl mb-2">📩</p>
                <p className="text-xs text-slate-500 font-semibold">Henüz hiç teklif talebi almadınız.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold text-slate-800">{req.fullName}</h3>
                      <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 font-bold">
                        Tarih: {req.weddingDate || 'Belirsiz'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">📞 {req.phone}</p>
                    {req.message && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 italic">
                        "{req.message}"
                      </div>
                    )}
                    <a
                      href={`https://wa.me/${req.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba ${req.fullName}, WedyPlan üzerinden gönderdiğiniz talebi aldık.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block text-center w-full bg-[#25D366] text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition"
                    >
                      WhatsApp'tan Yanıtla
                    </a>
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