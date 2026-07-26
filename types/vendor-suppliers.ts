export type SupplierCategory = 'CATERING' | 'ORKESTRA' | 'FOTOGRAF' | 'DEKOR' | 'PERSONEL' | 'GUVENLIK';
export type SupplierPaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  category: SupplierCategory;
  rating: number;
  activeEventsCount: number;
  totalEarnings: number;
  pendingPayment: number;
  paymentStatus: SupplierPaymentStatus;
}