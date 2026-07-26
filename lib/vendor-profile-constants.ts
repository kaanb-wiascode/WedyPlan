import { VendorProfileData } from '@/types/vendor-profile';

export const INITIAL_VENDOR_PROFILE: VendorProfileData = {
  id: 'v-101',
  companyName: 'Luxe Kır Bahçesi & Balo Salonu',
  category: 'Kır Bahçesi & Düğün Salonu',
  city: 'İstanbul / Beykoz',
  address: 'Polonezköy Yolu No: 42, Beykoz, İstanbul',
  phone: '+90 532 100 20 30',
  email: 'info@luxekirbahcesi.com',
  description: 'Doğa ile iç içe, 1000 kişilik kır bahçesi ve 500 kişilik açılır-kapanır balo salonumuzla hayallerinizdeki düğünü gerçeğe dönüştürüyoruz.',
  coverImageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  galleryImages: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
  ],
  rating: 4.9,
  reviewCount: 48,
  packages: [
    {
      id: 'pkg-1',
      name: 'Gold Kır Düğünü Paketi',
      price: 250000,
      description: '300 Kişilik Yemekli Menü + Canlı Müzik + Standart Süsleme',
      features: ['300 Kişilik Yemek Servisi', 'Canlı Müzik Ekibi (4 Saat)', 'Karşılamento & İkramlar', 'Gelin Oynatma / Anı Köşesi'],
      isPopular: false,
    },
    {
      id: 'pkg-2',
      name: 'Platinum Premium Balo Paketi',
      price: 390000,
      description: '500 Kişilik VIP Yemekli Menü + WedyAI Fotoğraf/Video + Lüks Dekorasyon',
      features: ['500 Kişilik VIP Menü', '4K Drone & Video Çekimi', 'Orkestra & Işık Şovu', 'Gelin Hazırlık Odası & Vale'],
      isPopular: true,
    },
  ],
};