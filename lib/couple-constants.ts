import { CoupleWeddingInfo, CoupleVendor, BudgetItem, Guest, CoupleTask } from '@/types/couple';

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
    price: 250000,
    phone: '+90 532 100 20 30',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cv-2',
    name: 'Studio Focus Prodüksiyon',
    category: 'Fotoğraf & Video',
    status: 'AGREED',
    price: 60000,
    phone: '+90 535 777 66 55',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cv-3',
    name: 'Akustik Orkestra Ekibi',
    category: 'Müzik & Canlı Performans',
    status: 'WAITING_QUOTE',
    phone: '+90 533 111 22 44',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cv-4',
    name: 'Haute Couture Gelinlik',
    category: 'Gelinlik & Moda',
    status: 'AGREED',
    price: 80000,
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80',
  }
];

export const MOCK_BUDGET_ITEMS: BudgetItem[] = [
  { id: 'b-1', category: 'Mekan', title: 'Düğün Salonu Kiralama', estimatedAmount: 250000, actualAmount: 250000, isPaid: true },
  { id: 'b-2', category: 'Gelinlik & Damatlık', title: 'Gelinlik & Aksesuarlar', estimatedAmount: 70000, actualAmount: 80000, isPaid: true },
  { id: 'b-3', category: 'Fotoğraf', title: 'Dış Çekim & Düğün Hikayesi', estimatedAmount: 50000, actualAmount: 60000, isPaid: false },
  { id: 'b-4', category: 'Müzik', title: 'Orkestra & DJ Hizmeti', estimatedAmount: 40000, actualAmount: 35000, isPaid: false },
  { id: 'b-5', category: 'Dekorasyon', title: 'Çiçek & Süsleme Düzenlemesi', estimatedAmount: 30000, actualAmount: 25000, isPaid: false },
];

export const MOCK_GUESTS: Guest[] = [
  { id: 'g-1', fullName: 'Ahmet Yılmaz', group: 'Aile', status: 'CONFIRMED', tableNumber: 'Masa 1', plusOne: true },
  { id: 'g-2', fullName: 'Ayşe Kaya', group: 'Arkadaşlar', status: 'CONFIRMED', tableNumber: 'Masa 4', plusOne: false },
  { id: 'g-3', fullName: 'Mehmet Demir', group: 'İş Çevresi', status: 'WAITING', plusOne: true },
  { id: 'g-4', fullName: 'Zeynep Şahin', group: 'Akraba', status: 'DECLINED', plusOne: false },
  { id: 'g-5', fullName: 'Caner Öztürk', group: 'Arkadaşlar', status: 'CONFIRMED', tableNumber: 'Masa 4', plusOne: true },
];

export const MOCK_TASKS: CoupleTask[] = [
  { id: 't-1', title: 'Düğün mekanı rezervasyonu ve kaporası', timelineGroup: '6 Ay Kala', isCompleted: true, category: 'Mekan' },
  { id: 't-2', title: 'Gelinlik ve damatlık provaları', timelineGroup: '3 Ay Kala', isCompleted: true, category: 'Giyim' },
  { id: 't-3', title: 'Fotoğrafçı ve orkestra ile sözleşme', timelineGroup: '3 Ay Kala', isCompleted: true, category: 'Hizmet' },
  { id: 't-4', title: 'Davetiye tasarımı ve baskısı', timelineGroup: '1 Ay Kala', isCompleted: true, category: 'Baskı' },
  { id: 't-5', title: 'LAVS (RSVP) davetli teyitlerinin tamamlanması', timelineGroup: '1 Ay Kala', isCompleted: false, category: 'Organizasyon' },
  { id: 't-6', title: 'Masa oturma düzeninin kesinleştirilmesi', timelineGroup: 'Son Hafta', isCompleted: false, category: 'Mekan' },
];