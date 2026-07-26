import { FinancialTransaction, FinanceSummary } from '@/types/vendor-finance';

export const FINANCE_SUMMARY_MOCK: FinanceSummary = {
  totalRevenue: 2450000,
  collectedAmount: 1180000,
  pendingCollectables: 1270000,
  upcomingExpenses: 420000,
  netProfitMargin: 48,
};

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'TX-101',
    title: 'Düğün Paket Kaporası',
    relatedName: 'Selin & Kaan Yılmaz',
    amount: 150000,
    type: 'INCOME',
    category: 'KAPORA',
    dueDate: '15 Mayıs 2026',
    status: 'COMPLETED',
    invoiceNumber: 'INV-2026-001',
  },
  {
    id: 'TX-102',
    title: 'Catering Yemek Menü Hakedişi',
    relatedName: 'Gourmet Catering A.Ş.',
    amount: 85000,
    type: 'EXPENSE',
    category: 'CATERING',
    dueDate: '10 Haziran 2026',
    status: 'PENDING',
  },
  {
    id: 'TX-103',
    title: 'Ara Taksit Ödemesi',
    relatedName: 'Merve & Alper Şahin',
    amount: 140000,
    type: 'INCOME',
    category: 'TAKSIT',
    dueDate: '01 Haziran 2026',
    status: 'COMPLETED',
    invoiceNumber: 'INV-2026-004',
  },
  {
    id: 'TX-104',
    title: 'Canlı Müzik & Ses Sistemi Hakediş',
    relatedName: 'Akustik Orkestra Ekibi',
    amount: 35000,
    type: 'EXPENSE',
    category: 'ORKESTRA',
    dueDate: '12 Haziran 2026',
    status: 'PENDING',
  },
  {
    id: 'TX-105',
    title: 'Final Düğün Bakiye Kapama',
    relatedName: 'Ceren & Berk Demir',
    amount: 180000,
    type: 'INCOME',
    category: 'TAKSIT',
    dueDate: '20 Mayıs 2026',
    status: 'OVERDUE',
  },
];