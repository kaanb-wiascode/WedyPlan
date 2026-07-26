export type PortalMode = 'COMMAND_CENTER' | 'WEDDING_DAY_MODE' | 'AFTER_WEDDING';

export interface TimelinePhase {
  id: string;
  title: string;
  dateRange: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  description: string;
}

export interface BudgetItemOS {
  id: string;
  category: string;
  title: string;
  vendorName: string;
  estimatedPrice: number;
  actualPrice: number;
  paidAmount: number;
  dueDate: string;
  isPaid: boolean;
  status: 'SAFE' | 'RISK_OVERRUN' | 'SAVED';
}

export interface GuestOS {
  id: string;
  fullName: string;
  group: 'Gelin Ailesi' | 'Damat Ailesi' | 'Ortak Arkadaş' | 'VIP';
  rsvpStatus: 'CONFIRMED' | 'DECLINED' | 'WAITING';
  tableNumber: string;
  dietaryNotes?: string;
  plusOne: boolean;
  plusOneName?: string;
  needsTransfer: boolean;
  needsAccommodation: boolean;
  qrCode: string;
}

export interface WeddingDayTimelineStep {
  id: string;
  time: string;
  title: string;
  responsiblePerson: string;
  location: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
  note?: string;
}

export interface AiPlannerInsight {
  id: string;
  type: 'RISK' | 'SAVING' | 'WEATHER' | 'GUEST';
  title: string;
  description: string;
  actionText: string;
  impactValue?: string;
}

export interface CoupleTaskOS {
  id: string;
  title: string;
  assignedTo: 'Selin' | 'Kaan' | 'Ortak';
  dueDate: string;
  isCompleted: boolean;
}

export interface WeddingWebsiteConfig {
  slug: string;
  title: string;
  storyText: string;
  weddingDate: string;
  venueName: string;
  address: string;
  giftRegistryUrl?: string;
  isPublished: boolean;
}