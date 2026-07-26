export type OrgProjectStatus = 'PREPARATION' | 'READY_FOR_EVENT' | 'LIVE_EVENT' | 'COMPLETED';

export type RiskSeverity = 'NONE' | 'LOW' | 'HIGH';

export interface OrgTask {
  id: string;
  title: string;
  category: 'DEKOR' | 'CATERING' | 'ORKESTRA' | 'TEKNIK' | 'PERSONEL';
  dueDate: string;
  isCompleted: boolean;
  assignedStaffName?: string;
}

export interface OrgProject {
  id: string;
  contractId: string;
  coupleNames: string;
  eventDate: string;
  daysRemaining: number;
  hallName: string;
  guestCount: number;
  completionRate: number;
  status: OrgProjectStatus;
  riskSeverity: RiskSeverity;
  riskMessage?: string;
  tasks: OrgTask[];
  assignedStaffCount: number;
  confirmedSuppliersCount: number;
  totalSuppliersCount: number;
}