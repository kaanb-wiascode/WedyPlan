import { create } from 'zustand';

export type UserRole = 'COUPLE' | 'VENDOR' | null;

interface WeddingOSState {
  // Rol ve Oturum
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  logout: () => void;

  // Bütçe Bilgileri
  totalBudget: number;
  spentBudget: number;
  
  // Mekan Teklif Durumu
  venueDealStatus: 'BEKLIYOR' | 'TEKLIF_GELDI' | 'ONAYLANDI';
  
  // Fonksiyonlar
  acceptVenueDeal: (price: number) => void;
}

export const useWeddingOS = create<WeddingOSState>((set) => ({
  // Varsayılan rol (Başlangıçta henüz giriş yapılmadı)
  userRole: null,

  setUserRole: (role) => set({ userRole: role }),
  
  logout: () => set({ userRole: null }),

  totalBudget: 350000,
  spentBudget: 0,
  venueDealStatus: 'TEKLIF_GELDI',

  acceptVenueDeal: (price) => set((state) => ({
    venueDealStatus: 'ONAYLANDI',
    spentBudget: state.spentBudget + price,
  })),
}));