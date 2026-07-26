import { CoupleWeddingInfo, CoupleVendor } from '@/types/couple';

export const MOCK_WEDDING_INFO: CoupleWeddingInfo = {
  coupleNames: 'Selin & Kaan',
  weddingDate: '2026-08-15',
  daysLeft: 20,
  totalBudget: 600000,
  spentBudget: 390000,
  totalGuests: 350,
  confirmedGuests: 280,
  completedTasksCount: 18,
  totalTasksCount: 24,
};

export const MOCK_COUPLE_VENDORS: CoupleVendor[] = [
  {
    id: 'cv-1',
    name: 'Luxe Kır Bahçesi & Balo Salonu',
    category: 'Mekan & Düğün Salonu',
    status: 'AGREED',
    price: 390000,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cv-2',
    name: 'Studio Focus Prodüksiyon',
    category: 'Fotoğraf & Video',
    status: 'WAITING_QUOTE',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cv-3',
    name: 'Akustik Orkestra Ekibi',
    category: 'Müzik & Canlı Performans',
    status: 'FAVORITE',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
];