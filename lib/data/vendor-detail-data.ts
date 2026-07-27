import { VendorDetailFull } from '@/types/vendor-detail-page';

export const MOCK_VENDOR_DETAIL_FULL: VendorDetailFull = {
  id: 'luxe-kir-bahcesi',
  companyName: 'Luxe Kır Bahçesi & Balo Salonu',
  tagline: 'Boğaz Manzaralı Botanik Bahçe ve Cam Balo Salonunda Kusursuz Düğünler',
  category: 'Düğün Salonu & Kır Bahçesi',
  city: 'İstanbul',
  district: 'Beykoz',
  address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
  phone: '+90 (216) 555 20 30',
  email: 'info@luxekirbahcesi.com',
  websiteUrl: 'https://luxekirbahcesi.com',
  instagramUrl: 'https://instagram.com/luxekirbahcesi',
  startingPrice: 250000,
  capacity: 600,
  rating: 4.95,
  reviewCount: 142,
  aiMatchScore: 98,
  isVerified: true,
  establishedYear: 2018,
  coverImages: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80'
  ],
  logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  story: '2018 yılında Beykoz’un eşsiz doğasında kurulan Luxe Kır Bahçesi, 600 kişilik botanik açık hava alanı ve 400 kişilik açılır-kapanır cam balo salonu ile çiftlerin hayallerini gerçeğe dönüştürüyor. Editoryal süsleme konseptleri, Michelin deneyimli şef menüleri ve WedyPlan WOS altyapısıyla çakışmasız, kusursuz organizasyonlar sunuyoruz.',
  specialties: [
    'Boğaz & Doğa Manzarası',
    'Açılır-Kapanır Cam Balo Salonu',
    'Michelin Deneyimli Şef Menüleri',
    'Gelin & Damat VIP Hazırlık Süiti',
    '250 Araçlık Özel Vale Otoparkı'
  ],
  awards: [
    '2025 Türkiye’nin En İyi Kır Düğünü Mekanı',
    'WedyPlan Excellence Platinum Ödülü',
    'Vogue Wedding Editoryal Mekan Seçimi'
  ],
  certificates: [
    'Sürdürülebilir Yeşil Mekan Sertifikası (ISO 14001)',
    'Uluslararası Gıda Güvenliği Belgesi (HACCP)',
    'WedyPlan Onaylı Güvenli İşletme Rozeti'
  ],
  packages: [
    {
      id: 'pkg-gold',
      name: 'Gold Botanical Kır Paketi',
      tagline: '300 Kişilik Standart Yemekli Düğün Konsepti',
      price: 250000,
      isPopular: false,
      features: [
        '300 Kişilik 4 Çeşit Yemekli Menü',
        'Canlı Orkestra & Profesyonel DJ',
        'Botanical Masa Dekorasyonu & Çiçek Aranjmanı',
        'Gelin Hazırlık Süiti Kullanımı',
        'Vale Otopark Hizmeti'
      ]
    },
    {
      id: 'pkg-platinum',
      name: 'Platinum Balo VIP Paketi',
      tagline: '500 Kişilik Her Şey Dahil VIP Düğün Deneyimi',
      price: 420000,
      isPopular: true,
      features: [
        '500 Kişilik VIP Gourme Menü & Kokteyl',
        '4K Drone & Düğün Hikayesi Çekim Ekibi',
        'Işık Şovu, Robot Başlar & Sis Efekti',
        'WedyPlan WOS Çakışmasız Takvim Garantisi',
        'Gece 02:00’ye Kadar After Party Salonu'
      ]
    }
  ],
  campaigns: [
    {
      id: 'cmp-1',
      title: 'Erken Rezervasyon Fırsatı',
      discountBadge: '%15 İndirim',
      description: 'Eylül 2026 öncesi yapılan düğün rezervasyonlarında tüm paketlerde geçerli %15 indirim avantajı.',
      validUntil: '31 Ağustos 2026'
    }
  ],
  reviews: [
    {
      id: 'r-1',
      authorName: 'Selin & Kaan Yılmaz',
      weddingDate: '12 Haziran 2026',
      rating: 5,
      comment: 'Hayalimizdeki kır düğününü yaşadık! Menü lezzeti, ekibin profesyonel kriz yönetimi ve ışık şovu muazzamdı. WedyPlan üzerinden teklif alıp 10 dakikada e-sözleşmemizi imzaladık.',
      verifiedBooking: true,
      photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80'],
      vendorReply: 'Selin Hanım & Kaan Bey, bu mutlu gününüze ev sahipliği yapmak bizim için büyük bir gururdu! Ömür boyu mutluluklar dileriz.'
    },
    {
      id: 'r-2',
      authorName: 'Ece & Onur Kaya',
      weddingDate: '20 Mayıs 2026',
      rating: 5,
      comment: 'Yağmur ihtimaline karşı cam balo salonuna geçiş organizasyonu sıfır hatayla yönetildi. Tüm misafirlerimiz hayran kaldı.',
      verifiedBooking: true
    }
  ],
  aiReviewSummary: 'Son 142 doğrulanan düğün yorumunun analizinde çiftler en çok %98 oranında ekibin kriz yönetimini, mekanın botanik ışıklandırmasını ve yemek servis hızını övüyor.',
  videos: [
    {
      id: 'v-1',
      title: '2026 Tanıtım Filmi & Mekan Turu',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com',
      duration: '02:45'
    }
  ],
  faq: [
    {
      question: 'Yağış ihtimaline karşı kapalı alan alternatifiniz var mı?',
      answer: 'Evet, 400 kişilik tam donanımlı, iklimlendirmeli ve açılır-kapanır cam balo salonumuz sayesinde olumsuz hava koşullarında 15 dakika içinde kapalı alana geçiş yapılmaktadır.'
    },
    {
      question: 'Dışarıdan fotoğrafçı veya orkestra getirmemize izin veriliyor mu?',
      answer: 'Anlaşmalı çözüm ortaklarımız haricinde dilerseniz dışarıdan profesyonel ekiplerle de çalışabilirsiniz.'
    }
  ],
  suggestedAiQuestions: [
    'Yağış ihtimalinde kapalı alana geçiş senaryonuz nasıl işliyor?',
    'Menü tadımı etkinliği hangi tarihte gerçekleştiriliyor?',
    'Gece 00:00 sonrası After Party imkanı mevcut mu?'
  ],
  similarVendors: [
    {
      id: 'bosphorus-palace',
      name: 'Bosphorus Palace Hall',
      category: 'Tarihi Mekan',
      city: 'İstanbul',
      startingPrice: 420000,
      rating: 4.92,
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'bodrum-isola',
      name: 'Bodrum Isola Sahil Kulübü',
      category: 'Düğün Salonu',
      city: 'Muğla',
      startingPrice: 380000,
      rating: 4.94,
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    }
  ]
};