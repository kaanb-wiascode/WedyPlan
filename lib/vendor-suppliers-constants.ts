import { Supplier, SupplierCategory } from '@/types/vendor-suppliers';

export const SUPPLIER_CATEGORY_LABELS: Record<SupplierCategory, string> = {
  CATERING: 'Catering & Yemek',
  ORKESTRA: 'Orkestra & Müzik',
  FOTOGRAF: 'Fotoğraf & Video',
  DEKOR: 'Süsleme & Dekor',
  PERSONEL: 'Garson & Servis Elemanı',
  GUVENLIK: 'Güvenlik & Karşılama',
};

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    companyName: 'Gourmet Catering A.Ş.',
    contactPerson: 'Serkan Yılmaz',
    phone: '+90 532 999 8877',
    category: 'CATERING',
    rating: 4.9,
    activeEventsCount: 4,
    totalEarnings: 340000,
    pendingPayment: 85000,
    paymentStatus: 'PENDING',
  },
  {
    id: 'sup-2',
    companyName: 'Akustik Orkestra Ekibi',
    contactPerson: 'Murat Can',
    phone: '+90 533 111 2244',
    category: 'ORKESTRA',
    rating: 4.8,
    activeEventsCount: 2,
    totalEarnings: 120000,
    pendingPayment: 0,
    paymentStatus: 'PAID',
  },
  {
    id: 'sup-3',
    companyName: 'Studio Focus Prodüksiyon',
    contactPerson: 'Burak Demir',
    phone: '+90 535 777 6655',
    category: 'FOTOGRAF',
    rating: 4.7,
    activeEventsCount: 3,
    totalEarnings: 180000,
    pendingPayment: 45000,
    paymentStatus: 'PARTIAL',
  },
];