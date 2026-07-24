'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

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

export default function VendorDetailPage() {
  const params = useParams();
  const vendorId = params?.id as string;

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    message: '',
  });

  useEffect(() => {
    async function fetchVendorDetail() {
      if (!vendorId) return;
      try {
        const docRef = doc(db, 'vendors', vendorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVendor({ id: docSnap.id, ...docSnap.data() } as Vendor);
        }
      } catch (error) {
        console.error('Firma detayı çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendorDetail();
  }, [vendorId]);

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;

    setIsSubmitting(true);
    try {
      // Firebase'deki 'requests' koleksiyonuna teklif talebini kaydet
      await addDoc(collection(db, 'requests'), {
        vendorId: vendor.id,
        vendorName: vendor.name,
        fullName: formData.fullName,
        phone: formData.phone,
        weddingDate: formData.weddingDate,
        guestCount: formData.guestCount,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'pending', // Beklemede
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Teklif gönderme hatası:', error);
      alert('Teklif gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex items-center justify-center">
        <p className="text-[#4A154B] font-semibold">Firma detayı yükleniyor...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-[#4A154B] mb-2">Firma Bulunamadı</h2>
        <a href="/" className="bg-[#E6007E] text-white px-6 py-2.5 rounded-xl font-semibold">
          Ana Sayfaya Dön
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <a href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </a>
        <a href="/arama" className="text-sm font-semibold text-[#4A154B] hover:text-[#E6007E]">
          ← Arama Listesine Dön
        </a>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-8 shadow-lg">
          <img
            src={vendor.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'}
            alt={vendor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
            <div className="text-white">
              <span className="bg-[#E6007E] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {vendor.category || 'Kategori'}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{vendor.name}</h1>
              <p className="text-slate-200 mt-1 flex items-center gap-4">
                <span>📍 {vendor.city}</span>
                <span>★ {vendor.rating || '4.9'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#4A154B] mb-4">Hakkında</h2>
              <p className="text-slate-600 leading-relaxed">
                {vendor.description || `${vendor.name}, ${vendor.city} şehrinde hayalinizdeki düğün organizasyonunu gerçeğe dönüştürmek için profesyonel ekibiyle hizmet vermektedir.`}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md sticky top-6">
              <h3 className="text-lg font-bold text-[#4A154B] mb-2">Ücretsiz Fiyat Teklifi Al</h3>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-center">
                  <p className="font-bold text-sm mb-1">Teklif Talebiniz Başarıyla İletildi! 🎉</p>
                  <p className="text-xs">
                    {vendor.name} yetkilileri en kısa sürede sizinle iletişime geçecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitOffer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Adınız Soyadınız</label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Telefon Numaranız</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Düğün Tarihi</label>
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Notunuz</label>
                    <textarea
                      rows={3}
                      placeholder="İstekleriniz..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Fiyat Teklifi Gönder'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}