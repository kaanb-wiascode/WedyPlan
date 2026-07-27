import { AiSearchVendor, SuggestedPrompt, AiSearchFaqItem } from '@/types/ai-search';

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: 'p-1', text: "İstanbul'da 300 kişilik lüks kır bahçesi", category: 'Düğün Salonu' },
  { id: 'p-2', text: "Kadıköy bölgesinde 4K drone çekimli fotoğrafçı", category: 'Fotoğrafçı' },
  { id: 'p-3', text: "Bütçesi 150.000 ₺ altı kokteyl mekanları", category: 'Düğün Salonu' },
  { id: 'p-4', text: "Açık hava canlı orkestra ve DJ ekibi", category: 'Müzik & DJ' },
  { id: 'p-5', text: "Haute couture gelinlik ve özel tasarım evi", category: 'Gelinlik' }
];

export const POPULAR_SEARCH_CATEGORIES = [
  { id: 'all', title: 'Tüm Kategoriler' },
  { id: 'dugun-salonlari', title: 'Düğün Salonları & Kır Bahçeleri' },
  { id: 'fotografcilar', title: 'Fotoğraf & Düğün Hikayesi' },
  { id: 'muzik-dj', title: 'Müzik & Orkestra' },
  { id: 'gelinlik', title: 'Gelinlik & Modaevleri' },
  { id: 'organizasyon', title: 'Organizasyon & Süsleme' }
];

export const MOCK_AI_SEARCH_VENDORS: AiSearchVendor[] = [
  {
    id: 'ai-v1',
    name: 'Luxe Kır Bahçesi & Balo Salonu',
    category: 'Düğün Salonu',
    city: 'İstanbul',
    district: 'Beykoz',
    startingPrice: 250000,
    capacity: 600,
    rating: 4.95,
    reviewCount: 142,
    matchScore: 98,
    matchBreakdown: [
      '✓ Girdiğiniz 300+ davetli kapasitesine tam uygun',
      '✓ Lüks kır bahçesi ve cam balo salonu mevcut',
      '✓ Belirttiğiniz bütçe aralığı içinde paket sunuyor'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    tags: ['Kır Düğünü', 'Boğaz Manzarası', 'Michelin Menü'],
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'ai-v2',
    name: 'Bosphorus Palace Hall',
    category: 'Düğün Salonu',
    city: 'İstanbul',
    district: 'Üsküdar',
    startingPrice: 420000,
    capacity: 400,
    rating: 4.92,
    reviewCount: 88,
    matchScore: 94,
    matchBreakdown: [
      '✓ Tarihi yalı konsepti ile lüks kriterinizle uyumlu',
      '✓ İskele yanaşma ve VIP kokteyl alanı',
      '✓ 400 kişilik geniş kapasite'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    tags: ['Tarihi Yalı', 'VIP Hizmet', 'Deniz Kenarı'],
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'ai-v3',
    name: 'Studio Focus Prodüksiyon',
    category: 'Fotoğrafçı',
    city: 'İstanbul',
    district: 'Kadıköy',
    startingPrice: 45000,
    capacity: 0,
    rating: 4.88,
    reviewCount: 110,
    matchScore: 92,
    matchBreakdown: [
      '✓ 4K Drone ve belgesel tarzı düğün hikayesi',
      '✓ Kadıköy ve tüm İstanbul çekim tecrübesi',
      '✓ Erken rezervasyon kaporasında %10 indirim'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    tags: ['4K Drone', 'Düğün Hikayesi', 'Dış Çekim'],
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'ai-v4',
    name: 'Aura Akustik Orkestra & DJ Set',
    category: 'Müzik & DJ',
    city: 'İstanbul',
    district: 'Beşiktaş',
    startingPrice: 55000,
    capacity: 0,
    rating: 4.9,
    reviewCount: 64,
    matchScore: 89,
    matchBreakdown: [
      '✓ Geniş repertuar ve canlı sahne performansı',
      '✓ Ses ve ışık sistemi paket dahilinde'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    tags: ['Canlı Orkestra', 'DJ Performans', 'Işık Şovu'],
    isVerified: true,
    isAvailable: true
  }
];

export const AI_SEARCH_FAQS: AiSearchFaqItem[] = [
  {
    id: 'faq-ai-1',
    question: 'WedyAI Doğal Dil Araması nasıl çalışır?',
    answer: 'WedyAI, arama kutusuna yazdığınız cümleyi analiz eder; konum, bütçe, davetli kapasitesi, konsept ve hizmet türü gibi parametreleri otomatik ayıklar. Ardından veritabanımızdaki onaylı firmalarla eşleştirerek size özel uyum skoru üretir.'
  },
  {
    id: 'faq-ai-2',
    question: 'Arama sonuçlarındaki % Uyum Skoru neyi ifade eder?',
    answer: 'Uyum skoru, aradığınız kriterlerin (bütçe, lokasyon, tarih müsaitliği, kapasite ve tarz) firmanın sunduğu özelliklerle ne kadar örtüştüğünü gösteren yapay zeka metriğidir.'
  },
  {
    id: 'faq-ai-3',
    question: 'Arama sonuçlarını daha sonra kaydedebilir miyim?',
    answer: 'Evet, beğendiğiniz firmaları kalp simgesine tıklayarak favorilerinize ekleyebilir veya Çift Paneline giriş yaparak WedyAI arama geçmişinizi saklayabilirsiniz.'
  }
];