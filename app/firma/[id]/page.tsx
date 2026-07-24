'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';

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
  phone?: string;
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt?: any;
}

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200',
];

export default function VendorDetailPage() {
  const params = useParams();
  const vendorId = params?.id as string;

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Slider State'i
  const [currentSlide, setCurrentSlide] = useState(0);

  // Teklif Formu State'leri
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [offerData, setOfferData] = useState({
    fullName: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    message: '',
  });

  // Yorum Formu State'leri
  const [reviewData, setReviewData] = useState({
    authorName: '',
    rating: 5,
    comment: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Verileri Çek
  useEffect(() => {
    async function fetchData() {
      if (!vendorId) return;
      try {
        const docRef = doc(db, 'vendors', vendorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVendor({ id: docSnap.id, ...docSnap.data() } as Vendor);
        }

        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('vendorId', '==', vendorId)
        );
        const reviewsSnap = await getDocs(reviewsQuery);
        const fetchedReviews: Review[] = [];
        reviewsSnap.forEach((doc) => {
          fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [vendorId]);

  // Galeri fotoğraflarını hazırla
  const galleryImages =
    vendor?.images && vendor.images.length > 0
      ? vendor.images
      : vendor?.imageUrl
      ? [vendor.imageUrl, ...DEFAULT_GALLERY.slice(1)]
      : DEFAULT_GALLERY;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // WhatsApp Link Oluşturucu
  const getWhatsAppLink = () => {
    const rawPhone = vendor?.phone ? vendor.phone.replace(/\D/g, '') : '905555555555';
    const formattedPhone = rawPhone.startsWith('90') ? rawPhone : `90${rawPhone}`;
    const text = encodeURIComponent(
      `Merhaba ${vendor?.name || 'Firma Yetkilisi'}, WedyPlan platformu üzerinden ulaşıyorum. Hizmetleriniz ve fiyat teklifiniz hakkında bilgi alabilir miyim?`
    );
    return `https://wa.me/${formattedPhone}?text=${text}`;
  };

  // Teklif Gönder
  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;

    setIsSubmittingOffer(true);
    try {
      await addDoc(collection(db, 'requests'), {
        vendorId: vendor.id,
        vendorName: vendor.name,
        fullName: offerData.fullName,
        phone: offerData.phone,
        weddingDate: offerData.weddingDate,
        guestCount: offerData.guestCount,
        message: offerData.message,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setOfferSubmitted(true);
    } catch (error) {
      console.error('Teklif hatası:', error);
      alert('Teklif gönderilemedi.');
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  // Yorum Gönder
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;

    setIsSubmittingReview(true);
    try {
      const newReview = {
        vendorId: vendor.id,
        authorName: reviewData.authorName,
        rating: Number(reviewData.rating),
        comment: reviewData.comment,
        createdAt: new Date().toLocaleDateString('tr-TR'),
      };

      const docRef = await addDoc(collection(db, 'reviews'), {
        ...newReview,
        createdAtTimestamp: serverTimestamp(),
      });

      setReviews([{ id: docRef.id, ...newReview }, ...reviews]);
      setReviewSubmitted(true);
      setReviewData({ authorName: '', rating: 5, comment: '' });
    } catch (error) {
      console.error('Yorum ekleme hatası:', error);
      alert('Yorum kaydedilirken bir hata oluştu.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex items-center justify-center">
        <p className="text-[#4A154B] font-semibold">Yükleniyor...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-[#4A154B] mb-2">Firma Bulunamadı</h2>
        <Link href="/" className="bg-[#E6007E] text-white px-6 py-2.5 rounded-xl font-semibold">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <Link href="/arama" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
          ← Arama Listesine Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Fotoğraf Galerisi Slider */}
        <div className="relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden mb-8 shadow-xl bg-slate-900 group">
          <img
            src={galleryImages[currentSlide]}
            alt={`${vendor.name} - Fotoğraf ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
            <div className="text-white z-10">
              <span className="bg-[#E6007E] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase">
                {vendor.category || 'Kategori'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold mt-2">{vendor.name}</h1>
              <p className="text-slate-200 mt-1 flex flex-wrap items-center gap-4 text-xs md:text-sm">
                <span>📍 {vendor.city}</span>
                <span>★ {vendor.rating || '4.9'} Puan</span>
                <span>💬 {reviews.length} Yorum</span>
              </p>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition opacity-80 group-hover:opacity-100"
            aria-label="Önceki Fotoğraf"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition opacity-80 group-hover:opacity-100"
            aria-label="Sonraki Fotoğraf"
          >
            ❯
          </button>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {currentSlide + 1} / {galleryImages.length}
          </div>

          <div className="absolute bottom-4 right-6 flex gap-1.5 z-10">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-[#E6007E]' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Küçük Resimler */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`relative h-20 rounded-xl overflow-hidden border-2 transition ${
                currentSlide === idx ? 'border-[#E6007E] scale-[0.98]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#4A154B] mb-4">Hakkında</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {vendor.description || `${vendor.name}, ${vendor.city} şehrinde hayalinizdeki düğün organizasyonunu gerçeğe dönüştürmek için profesyonel ekibiyle hizmet vermektedir.`}
              </p>
            </div>

            {/* Yorumlar */}
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-[#4A154B]">
                  Değerlendirmeler & Yorumlar ({reviews.length})
                </h2>
              </div>

              <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
                <h3 className="text-xs font-bold text-[#4A154B] mb-3 uppercase">Siz de Deneyiminizi Paylaşın</h3>
                {reviewSubmitted ? (
                  <div className="p-3 bg-green-100 text-green-800 rounded-xl text-xs font-semibold text-center">
                    🎉 Yorumunuz başarıyla yayınlandı! Teşekkür ederiz.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Adınız Soyadınız"
                        value={reviewData.authorName}
                        onChange={(e) => setReviewData({ ...reviewData, authorName: e.target.value })}
                        className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                      />
                      <select
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}
                        className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white text-amber-600 font-bold"
                      >
                        <option value="5">★★★★★ (5 Yıldız - Mükemmel)</option>
                        <option value="4">★★★★☆ (4 Yıldız - Çok İyi)</option>
                        <option value="3">★★★☆☆ (3 Yıldız - Ortalama)</option>
                        <option value="2">★★☆☆☆ (2 Yıldız - Zayıf)</option>
                        <option value="1">★☆☆☆☆ (1 Yıldız - Kötü)</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      required
                      placeholder="Firma hakkındaki düşünceleriniz ve deneyiminiz..."
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                    ></textarea>
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="bg-[#4A154B] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-purple-900 transition disabled:opacity-50"
                    >
                      {isSubmittingReview ? 'Yayınlanıyor...' : 'Yorumu Gönder'}
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#4A154B]">{rev.authorName}</span>
                        <span className="text-xs font-bold text-amber-500">
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Teklif Formu ve WhatsApp Butonu */}
          <div className="lg:col-span-1 space-y-4">
            {/* WhatsApp Hızlı İletişim Kartı */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs py-3.5 px-4 rounded-2xl shadow-lg transition duration-200 hover:scale-[1.02]"
            >
              <span className="text-base">💬</span>
              <span>WhatsApp ile Anında İletişim Kur</span>
            </a>

            {/* Ücretsiz Fiyat Teklif Formu */}
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md">
              <h3 className="text-base font-bold text-[#4A154B] mb-2">Ücretsiz Fiyat Teklifi Al</h3>
              
              {offerSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-center">
                  <p className="font-bold text-xs mb-1">Teklif Talebiniz İletildi! 🎉</p>
                  <p className="text-[11px]">{vendor.name} yetkilileri sizinle iletişime geçecektir.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitOffer} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Adınız Soyadınız</label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmet Yılmaz"
                      value={offerData.fullName}
                      onChange={(e) => setOfferData({ ...offerData, fullName: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Telefon Numaranız</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={offerData.phone}
                      onChange={(e) => setOfferData({ ...offerData, phone: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Düğün Tarihi</label>
                    <input
                      type="date"
                      value={offerData.weddingDate}
                      onChange={(e) => setOfferData({ ...offerData, weddingDate: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingOffer}
                    className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold text-xs hover:bg-pink-700 transition shadow-md disabled:opacity-50 mt-2"
                  >
                    {isSubmittingOffer ? 'Gönderiliyor...' : 'Fiyat Teklifi Gönder'}
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