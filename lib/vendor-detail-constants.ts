import { VendorDetail } from '@/types/vendor-detail';

export const MOCK_VENDOR_DETAIL: VendorDetail = {
  id: 'luxe-kir-bahcesi',
  companyName: 'Luxe Kır Bahçesi & Balo Salonu',
  tagline: 'Boğaz Manzaralı Doğa İçinde 1000 Kişilik Lüks Düğün Kompleksi',
  category: 'Kır Bahçesi & Balo Salonu',
  city: 'İstanbul',
  district: 'Beykoz',
  address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
  phone: '+90 532 100 20 30',
  startingPrice: 250000,
  rating: 4.9,
  reviewCount: 128,
  isVerified: true,
  establishedYear: 2018,
  coverImages: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80'
  ],
  logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  story: '2018 yılında Beykoz’un eşsiz doğasında kurulan Luxe Kır Bahçesi, 1000 kişilik açık hava botanik bahçesi ve 500 kişilik açılır-kapanır cam balo salonu ile çiftlerin en özel anlarına ev sahipliği yapmaktadır. Editoryal süsleme konseptleri, Michellin deneyimli şef menüleri ve WedyPlan WOS teknolojisiyle çakışmasız ve kusursuz organizasyonlar sunuyoruz.',
  specialties: ['Boğaz Manzarası', 'Helikopter Pisti', 'Cam Balo Salonu', 'Michelin Şef Menüsü', 'Gelin Hazırlık Suite'],
  awards: ['2025 Türkiye’nin En İyi Kır Düğünü Mekanı', 'WedyPlan Excellence Platinum Ödülü', 'Sürdürülebilir Yeşil Mekan Sertifikası'],
  aiMatch: {
    score: 94,
    summary: 'Bu mekan, bütçeniz, davetli sayınız ve tarz tercihlerinizle mükemmel bir uyum sergiliyor.',
    criterias: [
      { label: 'Bütçe Uyumu', isMatched: true, description: 'Belirlediğiniz bütçe aralığında esnek paket seçenekleri mevcut.' },
      { label: 'Tarih Uygunluğu', isMatched: true, description: 'Haziran ve Temmuz 2026 aylarında haftasonu opsiyonları açık.' },
      { label: 'Kapasite & Konfor', isMatched: true, description: '350 kişilik davetli listeniz için geniş oturma ve pist alanı.' },
      { label: 'Konum & Ulaşım', isMatched: true, description: 'Beykoz lokasyonu ve 250 araçlık özel vale otoparkı.' }
    ]
  },
  packages: [
    {
      id: 'pkg-gold',
      name: 'Gold Kır Düğünü Paketi',
      tagline: '300 Kişilik Standart Yemekli Organizasyon',
      price: 250000,
      features: ['300 Kişilik Yemekli Menü', 'Canlı Müzik & DJ Performansı', 'Standart Botanical Dekorasyon', 'Gelin Hazırlık Odası & Vale'],
      isPopular: false
    },
    {
      id: 'pkg-platinum',
      name: 'Platinum Premium Balo Paketi',
      tagline: '500 Kişilik Her Şey Dahil VIP Konsept',
      price: 390000,
      features: ['500 Kişilik VIP Menü & Kokteyl', '4K Drone & Düğün Hikayesi Çekimi', 'Orkestra & Işık Şovu', 'WedyAI Çakışmasız Takvim Garantisi', 'After Party Alanı Kullanımı'],
      isPopular: true
    }
  ],
  portfolio: [
    { id: 'p1', type: 'PHOTO', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80', title: 'Gece Işıklandırmalı Ana Bahçe' },
    { id: 'p2', type: 'PHOTO', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80', title: 'Açılır Kapanır Cam Balo Salonu' },
    { id: 'p3', type: 'PHOTO', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80', title: 'Botanik Nikah Kürsüsü Masası' },
    { id: 'p4', type: 'TOUR_360', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80', title: '360° Sanal Tur Mekan Gezisi' }
  ],
  reviews: [
    {
      id: 'r1',
      authorName: 'Selin & Kaan Yılmaz',
      weddingDate: '12 Haziran 2026',
      rating: 5,
      comment: 'Hayalimizdeki kır düğününü yaşadık! Menü lezzeti, ekibin koordinasyonu ve Işık düzeni muazzamdı. WedyPlan üzerinden teklif alıp 10 dakikada sözleşmemizi imzaladık.',
      verifiedBooking: true,
      photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80'],
      vendorReply: 'Selin Hanım & Kaan Bey, bu mutlu gününüze ev sahipliği yapmak bizim için büyük bir gururdu! Ömür boyu mutluluklar dileriz.'
    },
    {
      id: 'r2',
      authorName: 'Ece & Onur Kaya',
      weddingDate: '20 Mayıs 2026',
      rating: 5,
      comment: 'Yağmur ihtimaline karşı cam balo salonuna geçiş organizasyonu sıfır hatayla yönetildi. Tüm misafirlerimiz hayran kaldı.',
      verifiedBooking: true
    }
  ],
  aiReviewSummary: 'Son 128 doğrulanan düğün yorumunun analizinde çiftler en çok %98 oranında ekibin profesyonel kriz yönetimini, mekanın ışıklandırmasını ve yemek servis hızını övüyor.',
  suggestedAiQuestions: [
    'Yağış ihtimaline karşı kapalı alana geçiş senaryonuz nasıl işliyor?',
    'Dışarıdan fotoğrafçı veya orkestra getirmemize izin veriliyor mu?',
    'Menü tadımı etkinliği ne zaman gerçekleştiriliyor?',
    'Gece 00:00 sonrası After Party imkanı mevcut mu?'
  ],
  similarVendorsIds: ['bosphorus-palace', 'kemer-botanic-garden']
};