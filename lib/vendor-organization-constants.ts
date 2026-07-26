import { OrgProject } from '@/types/vendor-organization';

export const ORG_STATUS_LABELS = {
  PREPARATION: { label: 'Hazırlık Aşamasında', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  READY_FOR_EVENT: { label: 'Düğüne Hazır', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  LIVE_EVENT: { label: 'Canlı Etkinlik', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  COMPLETED: { label: 'Tamamlandı', color: 'bg-gray-50 text-gray-600 border-gray-200' },
} as const;

export const INITIAL_ORG_PROJECTS: OrgProject[] = [
  {
    id: 'ORG-2026-01',
    contractId: 'S-8821',
    coupleNames: 'Merve & Alper Şahin',
    eventDate: '12 Haziran 2026',
    daysRemaining: 3,
    hallName: 'Kır Bahçesi A Salonu',
    guestCount: 300,
    completionRate: 85,
    status: 'PREPARATION',
    riskSeverity: 'HIGH',
    riskMessage: 'Düğüne 3 gün kaldı! Ses & Işık tedarikçi teyidi henüz alınmadı.',
    assignedStaffCount: 12,
    confirmedSuppliersCount: 4,
    totalSuppliersCount: 5,
    tasks: [
      { id: 't1', title: 'Masa düzeni ve şamdan yerleşimi', category: 'DEKOR', dueDate: '11 Haziran', isCompleted: true, assignedStaffName: 'Ahmet Y.' },
      { id: 't2', title: 'Catering menü tadım onayı', category: 'CATERING', dueDate: '10 Haziran', isCompleted: true },
      { id: 't3', title: 'Orkestra ses provası ve teknik kurulum', category: 'TEKNIK', dueDate: '12 Haziran', isCompleted: false, assignedStaffName: 'Mehmet C.' },
    ]
  },
  {
    id: 'ORG-2026-02',
    contractId: 'S-8825',
    coupleNames: 'Selin & Kaan Yılmaz',
    eventDate: '15 Ağustos 2026',
    daysRemaining: 67,
    hallName: 'Balo Salonu (Kapalı)',
    guestCount: 450,
    completionRate: 40,
    status: 'PREPARATION',
    riskSeverity: 'NONE',
    assignedStaffCount: 18,
    confirmedSuppliersCount: 6,
    totalSuppliersCount: 6,
    tasks: [
      { id: 't4', title: 'Gelin yolu çiçek konsept seçimi', category: 'DEKOR', dueDate: '01 Temmuz', isCompleted: false },
    ]
  }
];