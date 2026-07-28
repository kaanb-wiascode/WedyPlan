export type BookingType = "VENUE_BOOKING" | "VENDOR_BOOKING" | "APPOINTMENT" | "MEETING";
export type BookingStatus = "PENDING_APPROVAL" | "CONFIRMED" | "RESCHEDULED" | "CANCELLED";

export interface BookingSlot {
  id: string;
  timeSlot: string;
  isAvailable: boolean;
  aiRecommendationScore?: number; // 0-100
}

export interface MobileBookingItem {
  id: string;
  vendorId: string;
  vendorName: string;
  type: BookingType;
  eventDate: string;
  timeSlot: string;
  status: BookingStatus;
  notes?: string;
  depositAmount?: number;
  createdAt: Date;
}

export class MobileBookingEngine {
  private static STORAGE_KEY = "WEDYPLAN_MOBILE_BOOKINGS_V1";

  /**
   * Tedarikçi/Mekan için WedyAI Destekli Akıllı Takvim Saatlerini Getirir
   */
  public static async getAvailableSlots(vendorId: string, dateStr: string): Promise<BookingSlot[]> {
    return [
      { id: "slot_1", timeSlot: "10:00 - 11:30", isAvailable: true, aiRecommendationScore: 82 },
      { id: "slot_2", timeSlot: "14:00 - 15:30", isAvailable: true, aiRecommendationScore: 98 }, // AI En Uygun Zaman
      { id: "slot_3", timeSlot: "16:00 - 17:30", isAvailable: false, aiRecommendationScore: 0 }, // Çakışma Var
      { id: "slot_4", timeSlot: "19:00 - 21:00", isAvailable: true, aiRecommendationScore: 91 },
    ];
  }

  /**
   * Yeni Rezervasyon / Randevu Oluşturur ve Çakışma Kontrolü Yapar
   */
  public static async createBooking(
    bookingData: Omit<MobileBookingItem, "id" | "status" | "createdAt">
  ): Promise<{ success: boolean; booking?: MobileBookingItem; error?: string }> {
    const existing = this.getBookingHistory();

    // Conflict Detection (Tarih ve Saat Çakışma Denetçisi)
    const hasConflict = existing.some(
      (b) => b.eventDate === bookingData.eventDate && b.timeSlot === bookingData.timeSlot && b.status !== "CANCELLED"
    );

    if (hasConflict) {
      return { success: false, error: "BOOKING_TIME_CONFLICT: Seçilen saat dilimi zaten dolu." };
    }

    const newBooking: MobileBookingItem = {
      ...bookingData,
      id: `book_${Math.random().toString(36).substring(2, 9)}`,
      status: "CONFIRMED",
      createdAt: new Date(),
    };

    existing.unshift(newBooking);
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
    }

    return { success: true, booking: newBooking };
  }

  /**
   * Kullanıcının Rezervasyon Geçmişini Getirir
   */
  public static getBookingHistory(): MobileBookingItem[] {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }
    
    // Varsayılan Mock Veri
    return [
      {
        id: "book_demo_1",
        vendorId: "v_101",
        vendorName: "Çırağan Palace Kempinski",
        type: "VENUE_BOOKING",
        eventDate: "2026-08-15",
        timeSlot: "19:00 - 23:30",
        status: "CONFIRMED",
        depositAmount: 30000,
        createdAt: new Date(),
      },
    ];
  }

  /**
   * Tarih Değişikliği (Reschedule Workflow)
   */
  public static async rescheduleBooking(bookingId: string, newDate: string, newTimeSlot: string): Promise<boolean> {
    const bookings = this.getBookingHistory();
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookings[index].eventDate = newDate;
      bookings[index].timeSlot = newTimeSlot;
      bookings[index].status = "RESCHEDULED";
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
      }
      return true;
    }
    return false;
  }
}