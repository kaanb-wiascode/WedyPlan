import { 
    CategoryItem, 
    FeaturedPublicVendor, 
    PlatformFeature, 
    HowItWorksStep, 
    TestimonialItem, 
    FaqItem 
  } from '@/types/public-homepage';
  
  export const HOMEPAGE_CATEGORIES: CategoryItem[] = [
    {
      id: 'cat-1',
      title: 'Düğün Salonları & Kır Bahçeleri',
      slug: 'dugun-salonlari',
      itemCount: '140+ Seçkin Mekan',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      iconName: 'Building2'
    },
    {
      id: 'cat-2',
      title: 'Fotoğraf & Düğün Hikayesi',
      slug: 'fotografcilar',
      itemCount: '210+ Profesyonel Stüdyo',
      imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      iconName: 'Camera'
    },
    {
      id: 'cat-3',
      title: 'Gelinlik, Moda & Aksesuar',
      slug: 'gelinlik',
      itemCount: '95+ Tasarım Evi',
      imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
      iconName: 'Scissors'
    },
    {
      id: 'cat-4',
      title: 'Organizasyon & Dekorasyon',
      slug: 'organizasyon',
      itemCount: '125+ Ekip',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      iconName: 'Sparkles'
    },
    {
      id: 'cat-5',
      title: 'Müzik, Orkestra & DJ Seti',
      slug: 'muzik-orkestra',
      itemCount: '80+ Performans Sanatçısı',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      iconName: 'Music'
    }
  ];
  
  export const FEATURED_PUBLIC_VENDORS: FeaturedPublicVendor[] = [
    {
      id: 'v-luxe-kir',
      name: 'Luxe Kır Bahçesi & Balo Salonu',
      category: 'Düğün Salonu & Kır Bahçesi',
      city: 'İstanbul',
      district: 'Beykoz',
      startingPrice: 250000,
      rating: 4.95,
      reviewCount: 142,
      aiMatchScore: 98,
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      isSponsor: true,
      tags: ['Boğaz Manzarası', '500+ Kapasite', 'Michelin Menü']
    },
    {
      id: 'v-bosphorus-palace',
      name: 'Bosphorus Palace Hall',
      category: 'Tarihi Mekan',
      city: 'İstanbul',
      district: 'Üsküdar',
      startingPrice: 420000,
      rating: 4.92,
      reviewCount: 88,
      aiMatchScore: 95,
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      isSponsor: true,
      tags: ['Tarihi Yalı', 'İskele Kullanımı', 'VIP Kokteyl']
    },
    {
      id: 'v-studio-focus',
      name: 'Studio Focus Prodüksiyon',
      category: 'Fotoğraf & Video',
      city: 'İstanbul',
      district: 'Kadıköy',
      startingPrice: 45000,
      rating: 4.88,
      reviewCount: 110,
      aiMatchScore: 93,
      imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      isSponsor: false,
      tags: ['4K Drone', 'Düğün Hikayesi', 'Yurtdışı Çekim']
    }
  ];
  
  export const PLATFORM_FEATURES: PlatformFeature[] = [
    {
      id: 'feat-1',
      title: 'WedyAI Match Engine',
      subtitle: 'Akıllı Çift & Firma Eşleştirmesi',
      description: 'Bütçenizi, davetli sayınızı ve tarz tercihlerinizi analiz ederek sadece %90+ uyumlu onaylı profesyonelleri önerir.',
      icon: 'Sparkles',
      badge: 'Yapay Zeka Destekli',
      colSpan: 'lg:col-span-2'
    },
    {
      id: 'feat-2',
      title: 'WOS Çakışmasız Takvim',
      subtitle: 'Çift Rezerve Edilme Koruması',
      description: 'Mekanların saatlik slot bazlı takvimlerini milisaniyelik senkronize ederek tarih çakışması riskini tamamen yok eder.',
      icon: 'CalendarCheck',
      badge: 'Otomatik Senkron',
      colSpan: 'lg:col-span-1'
    },
    {
      id: 'feat-3',
      title: 'E-İmza & Güvenli Garanti',
      subtitle: 'Hukuki Sözleşme ve Kasa Koruması',
      description: 'Ödemeler WedyPlan Güvenli Havuzunda tutulur, e-imza onaylı resmi sözleşmelerle her iki taraf da %100 güvenceye alınır.',
      icon: 'ShieldCheck',
      badge: 'Hukuki Güvence',
      colSpan: 'lg:col-span-1'
    },
    {
      id: 'feat-4',
      title: 'Fintech Budget OS',
      subtitle: 'Sapmasız Düğün Cüzdanı',
      description: 'Görünmeyen harcamaları, ödeme vadelerini ve olası bütçe sapmalarını proaktif olarak takip eden cüzdan yönetimi.',
      icon: 'Wallet',
      badge: 'Canlı Bütçe',
      colSpan: 'lg:col-span-2'
    }
  ];
  
  export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    {
      stepNumber: '01',
      title: 'Hayalinizi Anlatın veya Profil Oluşturun',
      description: 'Çiftler WedyAI’a düğün fikirlerini iletir; firmalar ise WOS hizmet portföylerini tanımlar.',
      audience: 'COUPLE'
    },
    {
      stepNumber: '02',
      title: 'Akıllı Eşleşme ve Şeffaf Teklif Alma',
      description: 'WedyAI çakışmasız tarihleri süzerek şeffaf bütçeli, onaylı teklifleri anında hazırlar.',
      audience: 'COUPLE'
    },
    {
      stepNumber: '03',
      title: 'E-İmza Sözleşme & Güvenli Ödeme',
      description: 'Sözleşme dijital olarak imzalanır, kapora güvenceli havuza aktarılır ve rezervasyon kesinleşir.',
      audience: 'COUPLE'
    },
    {
      stepNumber: '04',
      title: 'Düğün Günü Canlı Akış Operasyonu',
      description: 'Düğün günü dakika dakika zaman çizelgesiyle kuaförden pasta kesimine kadar her şey kontrol altında tutulur.',
      audience: 'COUPLE'
    }
  ];
  
  export const TESTIMONIALS_LIST: TestimonialItem[] = [
    {
      id: 't-1',
      authorNames: 'Selin & Kaan Yılmaz',
      role: 'Evlenen Çift',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote: 'WedyPlan sayesinde 6 ay sürecek stresi 2 haftada sıfırladık. Mekanımızdan fotoğrafçımıza kadar tüm e-imza sözleşmelerimizi tek ekrandan hallettik.',
      weddingLocation: 'İstanbul, Beykoz',
      rating: 5,
      verifiedBooking: true
    },
    {
      id: 't-2',
      authorNames: 'Cemil Taşçı',
      role: 'Luxe Kır Bahçesi Kurucusu',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      quote: 'WOS çakışmasız takvim modülü işletmemizin operasyonel yükünü %70 azalttı. WedyAI üzerinden gelen çiftlerin dönüşüm oranı son derece yüksek.',
      weddingLocation: 'İstanbul, Beykoz',
      rating: 5,
      verifiedBooking: true
    }
  ];
  
  export const HOMEPAGE_FAQS: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'WedyPlan klasik bir düğün rehberinden veya ilan sitesinden nasıl farklıdır?',
      answer: 'WedyPlan sadece ilan listelemez. Bünyesindeki WedyAI eşleştirme motoru, çakışmasız saatlik WOS takvim altyapısı, e-imza resmi sözleşmeler ve güvenli ödeme havuzları ile çiftler ve firmalar arasında uçtan uca dijital bir işletim sistemi sunar.',
      category: 'GENERAL'
    },
    {
      id: 'faq-2',
      question: 'Çiftler için WedyPlan kullanmak ücretli midir?',
      answer: 'Hayır, evlenen çiftler için WedyPlan Bütçe Cüzdanı, LCV Takibi, Düğün Web Sitesi Oluşturucu ve WedyAI Asistanı tamamen ücretsizdir.',
      category: 'COUPLES'
    },
    {
      id: 'faq-3',
      question: 'Düğün firmaları ve hizmet sağlayıcıları platforma nasıl katılır?',
      answer: 'Firmalar "Firma Katıl" paneli üzerinden başvurularını iletir. WedyAI Kalite Analizinden geçen işletmeler doğrulanmış (Verified Partner) rozeti alarak WOS işletim sistemini kullanmaya başlarlar.',
      category: 'VENDORS'
    },
    {
      id: 'faq-4',
      question: 'WedyAI bütçeme en uygun firmaları nasıl seçiyor?',
      answer: 'WedyAI, girmmiş olduğunuz tahmini bütçe, davetli sayısı, düğün tarihi ve stil tercihlerinizi gerçek zamanlı firma fiyat tarifeleri ve takvim müsaitlikleriyle çapraz sorgulayarak %90+ uyumlu öneriler üretir.',
      category: 'AI'
    }
  ];