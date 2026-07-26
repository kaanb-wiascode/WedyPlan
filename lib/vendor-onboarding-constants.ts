import { PartnerPlan } from '@/types/vendor-onboarding';

export const PARTNER_PLANS: PartnerPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Temel Görünürlük & Dijital Showroom',
    monthlyPrice: 0,
    annualPrice: 0,
    badgeGranted: 'VERIFIED_PARTNER',
    features: [
      'WedyPlan Rehberinde Listelenme',
      'Temel Firma Profili & Görsel Galerisi',
      'Standart Müşteri Teklif Formu',
      'Doğrulanmış Rozet (Verified Partner)'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Gelişmiş CRM, Çakışmasız Takvim & WedyAI',
    monthlyPrice: 1490,
    annualPrice: 14900,
    isPopular: true,
    badgeGranted: 'PREMIUM_PARTNER',
    features: [
      'Arama Sonuçlarında Üst Sıra Önceliği',
      'WedyAI Akıllı Müşteri Eşleştirme',
      'WOS Çakışmasız Saat Slotu Takvimi',
      'E-İmza Sözleşme & Kasa Yönetimi',
      'Rozet: Premium Partner (👑 Altın Çerçeve)'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Sınırsız Büyüme, Reklam Desteği & Özel Danışman',
    monthlyPrice: 3990,
    annualPrice: 39900,
    badgeGranted: 'ELITE_PARTNER',
    features: [
      'Ana Sayfa ve Kategori Banner Sponsorluğu',
      'Sınırsız WedyAI Teklif İletişimi',
      'Gelişmiş Rakip & Dönüşüm Analitiği',
      '7/24 Özel Büyüme Müşteri Temsilcisi',
      'Rozet: Elite Partner (💎 VIP Status)'
    ]
  }
];

export const SUCCESS_STORIES = [
  {
    company: 'Luxe Kır Bahçesi',
    owner: 'Cemil Bey',
    quote: 'WedyPlan WOS takvim entegrasyonu sayesinde çift rezervasyon riskini sıfırladık. İlk ayımızda 18 onaylı teklif aldık.',
    growthRate: '+%320',
    leadCount: '142 Talep'
  },
  {
    company: 'Studio Focus Prodüksiyon',
    owner: 'Zeynep Hanım',
    quote: 'Çiftlerin WedyAI ile bütçesine uyan teklif vermesi sayesinde boş zaman harcamıyoruz. Kapanış oranımız %80 yükseldi.',
    growthRate: '+%210',
    leadCount: '98 Talep'
  }
];