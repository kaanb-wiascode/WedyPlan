export interface CoupleWeddingInfo {
    coupleNames: string;
    weddingDate: string;
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
    phone?: string;
  }
  
  export interface BudgetItem {
    id: string;
    category: string;
    title: string;
    estimatedAmount: number;
    actualAmount: number;
    isPaid: boolean;
  }
  
  export interface Guest {
    id: string;
    fullName: string;
    group: 'Aile' | 'Arkadaşlar' | 'İş Çevresi' | 'Akraba';
    status: 'CONFIRMED' | 'DECLINED' | 'WAITING';
    tableNumber?: string;
    plusOne: boolean;
  }
  
  export interface CoupleTask {
    id: string;
    title: string;
    timelineGroup: '6 Ay Kala' | '3 Ay Kala' | '1 Ay Kala' | 'Son Hafta';
    isCompleted: boolean;
    category: string;
  }