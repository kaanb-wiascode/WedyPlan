export type TransactionType = 'INCOME' | 'EXPENSE';
export type PaymentStatus = 'COMPLETED' | 'PENDING' | 'OVERDUE';

export interface FinancialTransaction {
  id: string;
  title: string;
  relatedName: string;
  amount: number;
  type: TransactionType;
  category: 'KAPORA' | 'TAKSIT' | 'CATERING' | 'ORKESTRA' | 'PERSONEL' | 'DEKOR';
  dueDate: string;
  status: PaymentStatus;
  invoiceNumber?: string;
}

export interface FinanceSummary {
  totalRevenue: number;
  collectedAmount: number;
  pendingCollectables: number;
  upcomingExpenses: number;
  netProfitMargin: number;
}