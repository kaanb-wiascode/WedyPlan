import { DiscoveryVendor, CuratedCollection } from '@/types/vendor-discovery';

export const AI_NATURAL_PROMPTS: string[] = [
  'İstanbul Anadolu yakasında 500 kişilik, bohem konsept kır düğünü',
  'Bodrum sahilinde 200 kişilik lüks deniz kenarı nikah & kokteyl',
  'İstanbul Boğaz manzaralı tarihi yalıda 300 kişilik VIP düğün',
  'İzmir Urla çiftlik alanında minimalist & naturel organizasyon'
];

export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    id: 'col-bohem',
    title: 'Bohem & Botanik Düğünler',
    subtitle: 'Açık hava, ahşap detaylar ve naturel çiçek konseptleri',
    coverUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
    themeStyle: 'Bohem'
  },
  {
    id: 'col-luxury',
    title: 'Modern Luxury Balo Salonları',
    subtitle: 'Kristal avizeler, yüksek tavanlar ve Michelin konsept menüler',
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    themeStyle: 'Modern Luxury'
  },
  {
    id: 'col-beach',
    title: 'Deniz Kenarı & Isola Konseptleri',
    subtitle: 'Ege ve Akdeniz esintili büyüleyici sahil düğünleri',
    coverUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    itemCount: 15,
    themeStyle: 'Deniz Kenarı'
  }
];

export const DISCOVERY_VENDORS: DiscoveryVendor[] = [
  {
    id: 'v-101',
    name: 'Luxe Kır Bahçesi & Balo Salonu',
    category: 'Düğün Salonu',
    city: 'İstanbul',
    district: 'Beykoz',
    priceStart: 250000,
    rating: 4.9,
    reviewCount: 128,
    matchScore: 98,
    matchBreakdown: ['✓ Bütçenize uygun', '✓ 500 Kişi kapasitesi hazır', '✓ Gece 00:00 ses izni var'],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    ],
    styleTags: ['Kır Düğünü', 'Bohem'],
    isVerified: true,
    isDeals: true,
    capacity: 600,
    responseTime: '< 10 Dakika',
    completedEvents: 142,
    coordinates: { lat: 41.12, lng: 29.11 }
  },
  {
    id: 'v-102',
    name: 'Bosphorus Palace Hall',
    category: 'Tarihi Mekan',
    city: 'İstanbul',
    district: 'Üsküdar',
    priceStart: 450000,
    rating: 4.95,
    reviewCount: 84,
    matchScore: 94,
    matchBreakdown: ['✓ Boğaz manzaralı', '✓ VIP Michelin Menü', '✓ Vale ve İskele kullanımı'],
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    galleryUrls: ['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'],
    styleTags: ['Modern Luxury', 'Tarihi Mekan'],
    isVerified: true,
    isDeals: false,
    capacity: 400,
    responseTime: '< 15 Dakika',
    completedEvents: 98,
    coordinates: { lat: 41.04, lng: 29.05 }
  },
  {
    id: 'v-103',
    name: 'Studio Focus Prodüksiyon',
    category: 'Fotoğrafçı',
    city: 'İstanbul',
    district: 'Kadıköy',
    priceStart: 45000,
    rating: 4.85,
    reviewCount: 62,
    matchScore: 91,
    matchBreakdown: ['✓ 4K Drone Çekimi Dahil', '✓ Yurtdışı Çekim Deneyimi'],
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    galleryUrls: ['https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'],
    styleTags: ['Minimalist'],
    isVerified: true,
    isDeals: true,
    capacity: 0,
    responseTime: '< 5 Dakika',
    completedEvents: 210,
    coordinates: { lat: 40.99, lng: 29.02 }
  }
];