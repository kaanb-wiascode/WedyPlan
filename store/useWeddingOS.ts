import { create } from 'zustand';

// Sistemin hafızasında tutacağı verilerin tipleri
interface WeddingOSState {
  // Bütçe Bilgileri
  totalBudget: number;
  spentBudget: number;
  
  // Mekan Teklif Durumu
  venueDealStatus: 'BEKLIYOR' | 'TEKLIF_GELDI' | 'ONAYLANDI';
  
  // Fonksiyon: Çift teklifi onayladığında çalışacak
  acceptVenueDeal: (price: number) => void;
}

// Sistemi oluşturuyoruz
export const useWeddingOS = create<WeddingOSState>((set) => ({
  // Başlangıç değerleri
  totalBudget: 350000,
  spentBudget: 0,
  venueDealStatus: 'TEKLIF_GELDI',

  // Teklif onaylandığında ne olacak? (OS Otomasyonu)
  acceptVenueDeal: (price) => set((state) => ({
    venueDealStatus: 'ONAYLANDI',
    spentBudget: state.spentBudget + price, // Bütçeye otomatik masraf yazıldı!
  })),
}));