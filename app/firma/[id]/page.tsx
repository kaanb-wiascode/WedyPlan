'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { doc, getDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';

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
  phone?: string;
}

interface Review {
  id: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Teklif Modal State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    fullName: '',
    phone: '',
    weddingDate: '',
    guestCount: '200-300 Kişi',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Yorum Form State'leri
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  // Oturum ve Firma Verilerini Çek
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setRequestForm(prev => ({
          ...prev,
          fullName: currentUser.displayName || '',
        }));
      }
    });

    async function fetchVendorDetails() {
      try {
        const docRef = doc(db, 'vendors', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVendor({ id: docSnap.id, ...docSnap.data() } as Vendor);
        }

        // Yorumları Çek
        const q = query(collection(db, 'reviews'), where('vendorId', '==', id));
        const reviewSnap = await getDocs(q);
        const reviewList: Review[] = [];
        reviewSnap.forEach((d) => reviewList.push({ id: d.id, ...d.data() } as Review));
        setReviews(reviewList);
      } catch (error) {
        console.error('Firma detay hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendorDetails();
    return () => unsubscribe();
  }, [id]);

  // Teklif Formu Gönderme
  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'requests'), {
        vendorId: id,
        vendorName: vendor?.name,
        fullName: requestForm.fullName,
        phone: requestForm.phone,
        weddingDate: requestForm.weddingDate,
        guestCount: requestForm.guestCount,
        message: requestForm.message,
        createdAt: serverTimestamp(),
      });

      alert('🎉 Fiyat teklifi talebiniz firmaya iletildi! En kısa sürede sizinle iletişime geçecekler.');
      setIsModalOpen(false);
      setRequestForm({ fullName: '', phone: '', weddingDate: '', guestCount: '200-300 Kişi', message: '' });
    } catch (error) {
      console.error('Teklif gönderme hatası:', error);
      alert('Teklif gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Yorum Gönderme
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Yorum yapabilmek için lütfen giriş yapın.');
      router.push('/login');
      return;
    }

    setIsReviewSubmitting(true);
    try {
      const reviewPayload = {
        vendorId: id,
        userId: user.uid,
        userName: user.displayName || 'Anonim Kullanıcı',
        userPhoto: user.photoURL || '',
        rating: newRating,
        comment: newComment,
        createdAt: new Date().toLocaleDateString('tr-TR'),
      };

      const docRef = await addDoc(collection(db, 'reviews'), reviewPayload);
      setReviews([{ id: docRef.id, ...reviewPayload }, ...reviews]);
      setNewComment('');
      alert('Yorumunuz başarıyla yayınlandı!');
    } catch (error) {
      console.error('Yorum hatası:', error);
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Firma detayları yükleniyor...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBFD] space-y-4">
        <p className="text-slate-500 font-bold">Aradığınız firma bulunamadı.</p>
        <Link href="/arama" className="bg-[#4A154B] text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          Firmalara Dön
        </Link>
      </div>
    );
  }

  const galleryImages = vendor.images && vendor.images.length > 0 ? vendor.images : [vendor.imageUrl];

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <Link href="/arama" className="text-xs font-semibold text-slate-500 hover:text-[#E6007E]">
          ← Arama Listesine Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Fotoğraf Galerisi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-lg border border-purple-100">
          <div className="md:col-span-2 h-80 md:h-[420px] relative">
            <img src={galleryImages[0]} alt={vendor.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 bg-[#4A154B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {vendor.category}
            </span>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4 h-[420px]">
            <img src={galleryImages[1] || galleryImages[0]} alt="Galeri 2" className="w-full h-[202px] object-cover" />
            <img src={galleryImages[2] || galleryImages[0]} alt="Galeri 3" className="w-full h-[202px] object-cover" />
          </div>
        </div>

        {/* Başlık ve Hızlı Aksiyon Kartı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol: Detaylar & Yorumlar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#4A154B]">{vendor.name}</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">📍 {vendor.city}</p>
                </div>
                <span className="text-sm font-bold text-amber-500 bg-amber-50 px-3 py-1 rounded-xl">
                  ★ {vendor.rating || '5.0'} (Yüksek Müşteri Memnuniyeti)
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#4A154B] mb-2">Hakkında</h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{vendor.description}</p>
              </div>
            </div>

            {/* Yorumlar Bölümü */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#4A154B]">Çift Yorumları ({reviews.length})</h3>

              {/* Yorum Yapma Formu */}
              <form onSubmit={handleAddReview} className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Siz de Değerlendirin:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Puanınız:</span>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="p-1.5 border border-slate-200 rounded-lg text-xs font-bold bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Deneyimlerinizi yazın..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                ></textarea>
                <button
                  type="submit"
                  disabled={isReviewSubmitting}
                  className="bg-[#4A154B] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-purple-900 transition"
                >
                  Yorum Gönder
                </button>
              </form>

              {/* Var Olan Yorumlar */}
              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic pt-2">Henüz yorum yapılmamış. İlk yorumu siz yazın!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="pt-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{rev.userName}</span>
                        <span className="text-xs text-amber-500 font-bold">{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sağ: Fiyat & İletişim Kartı */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl space-y-6 sticky top-24">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Başlangıç Fiyatı</span>
                <p className="text-2xl font-extrabold text-[#E6007E] mt-0.5">{vendor.price}</p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#E6007E] hover:bg-pink-700 text-white font-bold text-xs py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Ücretsiz Fiyat Teklifi Al</span>
              </button>

              {vendor.phone && (
                <a
                  href={`https://wa.me/${vendor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba ${vendor.name}, WedyPlan üzerinden ulaşmıştım. Fiyatlarınız hakkında bilgi alabilir miyim?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 block text-center"
                >
                  <span>📱</span>
                  <span>WhatsApp ile Sor</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teklif Alma Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-[#4A154B]">{vendor.name} - Teklif Al</h3>
            <p className="text-xs text-slate-500">Bilgilerinizi girin, firma size özel fiyat teklifi hazırlasın.</p>

            <form onSubmit={handleSendRequest} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Adınız Soyadınız"
                value={requestForm.fullName}
                onChange={(e) => setRequestForm({ ...requestForm, fullName: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
              />
              <input
                type="tel"
                required
                placeholder="Telefon Numaranız (05XX...)"
                value={requestForm.phone}
                onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
              />
              <input
                type="date"
                required
                value={requestForm.weddingDate}
                onChange={(e) => setRequestForm({ ...requestForm, weddingDate: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
              />
              <textarea
                rows={3}
                placeholder="Eklemek istediğiniz notlar..."
                value={requestForm.message}
                onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E6007E] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-pink-700 transition shadow disabled:opacity-50"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Teklif Talebini Gönder'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}