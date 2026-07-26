export type ContractStatus = 'DRAFT' | 'SENT_TO_COUPLE' | 'SIGNED' | 'EXPIRED' | 'CANCELLED';

export interface Contract {
  id: string;
  contractNumber: string;
  coupleNames: string;
  couplePhone: string;
  weddingDate: string;
  totalAmount: number;
  depositAmount: number;
  status: ContractStatus;
  aiRiskCheckStatus: 'PASSED' | 'WARNING' | 'NEEDS_REVIEW';
  aiNotes?: string;
  createdAt: string;
  signedAt?: string;
}