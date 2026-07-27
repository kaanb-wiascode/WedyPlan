import { CategoryPageData } from '@/types/category-page';

export const CATEGORY_DATABASE: Record<string, CategoryPageData> = {
  'dugun-mekanlari': {
    slug: 'dugun-mekanlari',
    title: 'Düğün Mekanları & Kır Bahçeleri',
    subtitle: 'Hayalinizdeki düğün konseptine uygun tarihi yalıları, kır bahçelerini ve lüks otelleri keşfedin.',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80',
    icon: 'Building2',
    totalVendors: 342,
    popularSearches: [
      { id: 'ps-1', query: 'İstanbul Boğaz Manzaralı Mekanlar', count: '12.4K' },
      { id: 'ps-2', query: 'İzmir Açık Hava Kır Düğünü', count: '8.2K' },
      { id: 'ps-3', query: 'Antalya Sahil & Kumsal Düğünü', count: '5.1K' },
      { id: 'ps-4', query: 'Ankara Lüks Balo Salonları', count: '9.3K' }
    ],
    articles: [
      {
        id: 'art-1',
        title: '2026 Kır Düğünü Trendleri: Botanik Dekorasyonlar',
        excerpt: 'Yeni sezonda doğayla iç içe mekanlar ve rustik ahşap detaylar ön planda.',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        readTime: '4 Dk Okuma'
      },
      {
        id: 'art-2',
        title: 'Düğün Mekanı Seçerken WedyAI Nasıl Kullanılır?',
        excerpt: 'Yapay zeka asistanımızla kapasite ve bütçenizi en verimli şekilde analiz edin.',
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
        readTime: '3 Dk Okuma'
      }
    ],
    featuredVendors: [
      {
        id: 'v-101',
        name: 'Luxe Kır Bahçesi & Balo Salonu',
        district: 'Beykoz',
        city: 'İstanbul',
        rating: 4.95,
        reviewCount: 142,
        startingPrice: 250000,
        imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
        isVerified: true
      },
      {
        id: 'v-102',
        name: 'Bosphorus Palace Hall',
        district: 'Üsküdar',
        city: 'İstanbul',
        rating: 4.92,
        reviewCount: 88,
        startingPrice: 420000,
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
        isVerified: true
      }
    ]
  },
  'fotografcilar': {
    slug: 'fotografcilar',
    title: 'Düğün Fotoğrafçıları & Hikaye Ekipleri',
    subtitle: 'En özel anlarınızı ölümsüzleştirecek 4K drone ekiplerini ve belgesel fotoğrafçıları inceleyin.',
    coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80',
    icon: 'Camera',
    totalVendors: 218,
    popularSearches: [
      { id: 'ps-5', query: 'Save the Date Çekimi', count: '15K' },
      { id: 'ps-6', query: 'Kapadokya Dış Çekim Platoları', count: '7.8K' },
      { id: 'ps-7', query: 'Düğün Belgeseli & Kısa Film', count: '11.2K' }
    ],
    articles: [
      {
        id: 'art-3',
        title: 'Kusursuz Bir Düğün Hikayesi İçin İpuçları',
        excerpt: 'Işık seçimi, first look (ilk karşılaşma) ve drone çekimlerinin önemi.',
        imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
        readTime: '5 Dk Okuma'
      }
    ],
    featuredVendors: [
      {
        id: 'v-103',
        name: 'Studio Focus Prodüksiyon',
        district: 'Kadıköy',
        city: 'İstanbul',
        rating: 4.88,
        reviewCount: 110,
        startingPrice: 45000,
        imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
        isVerified: true
      }
    ]
  }
};