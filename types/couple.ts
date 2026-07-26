export interface CoupleWeddingInfo {
    coupleNames: string;
    weddingDate: string; // ISO: YYYY-MM-DD
    daysLeft: number;
    totalBudget: number;
    spentBudget: number;
    totalGuests: number;
    confirmedGuests: number;
    completedTasksCount: number;
    totalTasksCount: number;
  }
  
  export interface CoupleVendor {
    id: string;
    name: string;
    category: string;
    status: 'AGREED' | 'FAVORITE' | 'WAITING_QUOTE';
    price?: number;
    imageUrl: string;
  }