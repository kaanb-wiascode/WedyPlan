import { KanbanColumnConfig, LeadOpportunity } from '@/types/vendor-leads';

export const KANBAN_COLUMNS: KanbanColumnConfig[] = [
  { id: 'NEW', title: 'Yeni Talepler', colorLine: 'bg-[#38BDF8]' },
  { id: 'CONTACTED', title: 'İletişim Kuruldu', colorLine: 'bg-[#FBBF24]' },
  { id: 'PROPOSAL_SENT', title: 'Teklif Sunuldu', colorLine: 'bg-[#A855F7]' },
  { id: 'NEGOTIATION', title: 'Görüşme & Revize', colorLine: 'bg-[#FB923C]' },
  { id: 'WON', title: 'Sözleşme İmzalandı', colorLine: 'bg-[#10B981]' },
];

export const INITIAL_LEADS_DATA: LeadOpportunity[] = [
  {
    id: 'L-1001',
    coupleNames: 'Selin & Kaan Yılmaz',
    weddingDate: '15 Ağustos 2026',
    guestCount: 350,
    budgetEstimated: 450000,
    stage: 'NEW',
    tags: [
      { id: 't1', label: 'VIP Müşteri', color: 'purple' },
      { id: 't2', label: 'Boğaz Manzarası', color: 'blue' }
    ],
    aiProposalStatus: 'READY',
    lastActivityAt: '12 dk önce',
    notesCount: 3,
  },
  {
    id: 'L-1002',
    coupleNames: 'Ceren & Berk Demir',
    weddingDate: '22 Eylül 2026',
    guestCount: 200,
    budgetEstimated: 280000,
    stage: 'CONTACTED',
    tags: [
      { id: 't3', label: 'Kır Düğünü', color: 'emerald' }
    ],
    aiProposalStatus: 'NONE',
    lastActivityAt: '45 dk önce',
    notesCount: 1,
  },
  {
    id: 'L-1003',
    coupleNames: 'Ece & Mert Kaya',
    weddingDate: '05 Ekim 2026',
    guestCount: 500,
    budgetEstimated: 680000,
    stage: 'PROPOSAL_SENT',
    tags: [
      { id: 't4', label: 'Lüks Paket', color: 'amber' }
    ],
    aiProposalStatus: 'SENT',
    lastActivityAt: '2 saat önce',
    notesCount: 5,
  },
  {
    id: 'L-1004',
    coupleNames: 'Merve & Alper Şahin',
    weddingDate: '12 Haziran 2026',
    guestCount: 300,
    budgetEstimated: 390000,
    stage: 'WON',
    tags: [
      { id: 't5', label: 'Kapora Alındı', color: 'emerald' }
    ],
    aiProposalStatus: 'SENT',
    lastActivityAt: '1 gün önce',
    notesCount: 8,
  }
];