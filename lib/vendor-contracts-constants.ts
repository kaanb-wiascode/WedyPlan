import { Contract } from '@/types/vendor-contracts';

export const CONTRACT_STATUS_MAP = {
  DRAFT: { label: 'Taslak', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  SENT_TO_COUPLE: { label: 'Çift Onayı Bekliyor', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  SIGNED: { label: 'Dijital İmzalandı', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  EXPIRED: { label: 'Zaman Aşımı', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  CANCELLED: { label: 'İptal Edildi', color: 'bg-stone-100 text-stone-600 border-stone-200' },
} as const;

export const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'c-1',
    contractNumber: 'WED-2026-0891',
    coupleNames: 'Merve & Alper Şahin',
    couplePhone: '+90 532 111 2233',
    weddingDate: '12 Haziran 2026',
    totalAmount: 390000,
    depositAmount: 100000,
    status: 'SIGNED',
    aiRiskCheckStatus: 'PASSED',
    aiNotes: 'Sözleşmede cayma tazminatı ve iptal şartları KVKK standartlarına tamamen uygundur.',
    createdAt: '01 Mayıs 2026',
    signedAt: '03 Mayıs 2026 14:32 (Mobil E-İmza)',
  },
  {
    id: 'c-2',
    contractNumber: 'WED-2026-0904',
    coupleNames: 'Selin & Kaan Yılmaz',
    couplePhone: '+90 535 444 5566',
    weddingDate: '15 Ağustos 2026',
    totalAmount: 450000,
    depositAmount: 150000,
    status: 'SENT_TO_COUPLE',
    aiRiskCheckStatus: 'WARNING',
    aiNotes: 'Kötü hava koşulları (açık alan organizasyon) maddesinde alternatif salon belirtilmemiş.',
    createdAt: '20 Mayıs 2026',
  }
];