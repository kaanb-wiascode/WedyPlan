export const APP_CONFIG = {
    BRAND_NAME: 'WedyPlan',
    MARKETING_SLOGAN: 'Geleceğin Düğün Planlama Ekosistemi',
    CURRENCY: '₺',
  } as const;
  
  export const SEARCH_DEFAULTS = {
    CITY: 'istanbul',
    CATEGORY: 'kir-dugunu',
    GUEST_COUNT: 250,
    BUDGET: 350000,
    MIN_BUDGET: 100000,
    MAX_BUDGET: 1500000,
    BUDGET_STEP: 25000,
  } as const;
  
  export const CITIES = [
    { value: 'istanbul', label: 'İstanbul (Tüm Bölgeler)' },
    { value: 'izmir', label: 'İzmir & Çevresi' },
    { value: 'ankara', label: 'Ankara (Merkez)' },
    { value: 'bodrum', label: 'Muğla / Bodrum & Sahil' },
  ] as const;
  
  export const CATEGORIES = [
    { value: 'kir-dugunu', label: 'Doğa İçinde Kır Düğünü' },
    { value: 'otel', label: 'Premium Otel & Balo Salonu' },
    { value: 'tarihi-mekan', label: 'Tarihi Yalı & Kasır' },
    { value: 'kumsal', label: 'Kumsal & Sahil Konsepti' },
  ] as const;
  
  export const THEME_PALETTES = {
    boho: { 
      name: 'Rustik & Bohem Esintisi', 
      colors: ['#8B5A2B', '#C5A059', '#EEDC82', '#4A5D4E'],
      description: 'Doğanın sıcak tonları ve pampas otlarıyla hazırlanan özgür ruhlu konsept.'
    },
    glamour: { 
      name: 'Lüks Şampanya & Gold', 
      colors: ['#1D1D1F', '#D4AF37', '#F5F5F7', '#E5E5E5'],
      description: 'Boğaz manzaralı yalılar ve görkemli oteller için kristal parlaklığında detaylar.'
    },
    romantic: { 
      name: 'Romantik Pastel Çiçekler', 
      colors: ['#E8C5C8', '#F4E1D2', '#B5E2FA', '#EDF6F9'],
      description: 'Baharın enerjisini yansıtan, yumuşak pembe ve pudra tonlarının dansı.'
    },
  } as const;