export type EventType =
  | "WEDDING_FAIR"
  | "WORKSHOP"
  | "WEBINAR"
  | "LIVE_STREAM"
  | "VENDOR_MEETUP"
  | "LAUNCH_EVENT";

export type EventFormat = "PHYSICAL" | "VIRTUAL" | "HYBRID";

export interface EventRecord {
  id: string;
  title: string;
  type: EventType;
  format: EventFormat;
  locationOrUrl: string;
  startDate: Date;
  capacityLimit: number;
  registeredCount: number;
  checkedInCount: number;
  aiPredictedAttendanceRatePercent: number; // 0-100%
  aiOptimalSchedulingTip: string;
  ticketPriceAmount: number;
  currency: string;
}

export interface TicketRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  registrantName: string;
  registrantEmail: string;
  qrValidationToken: string;
  isCheckedIn: boolean;
  checkedInAt?: Date;
  certificateUrl?: string;
  registeredAt: Date;
}

export class EventsEngine {
  private static STORAGE_KEY = "WEDYPLAN_EVENTS_VAULT_V1";
  private static TICKET_KEY = "WEDYPLAN_EVENT_TICKETS_V1";

  /**
   * Yaklaşan ve Aktif Etkinlikleri Getirir
   */
  public static async getEvents(): Promise<EventRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "evt_101",
        title: "2026 İstanbul Lüks Düğün Fuarı & Balo Lansmanı",
        type: "WEDDING_FAIR",
        format: "PHYSICAL",
        locationOrUrl: "Çırağan Palace Kempinski Balo Salonu",
        startDate: new Date("2026-08-15T10:00:00"),
        capacityLimit: 1200,
        registeredCount: 840,
        checkedInCount: 0,
        aiPredictedAttendanceRatePercent: 88,
        aiOptimalSchedulingTip: "Cumartesi 10:00-18:00 saatleri çift katılımları için %32 daha yüksek dönüşüm sağlıyor.",
        ticketPriceAmount: 0, // Ücretsiz VIP Giriş
        currency: "TRY",
      },
      {
        id: "evt_102",
        title: "WedyAI ile Bütçe Optimizasyonu & Escrow Web semineri",
        type: "WEBINAR",
        format: "VIRTUAL",
        locationOrUrl: "https://live.wedyplan.com/webinar-102",
        startDate: new Date("2026-08-05T20:00:00"),
        capacityLimit: 3000,
        registeredCount: 1420,
        checkedInCount: 0,
        aiPredictedAttendanceRatePercent: 74,
        aiOptimalSchedulingTip: "Hafta içi saat 20:00 canlı yayın katılımı için en pik noktadır.",
        ticketPriceAmount: 0,
        currency: "TRY",
      },
      {
        id: "evt_103",
        title: "B2B Tedarikçi & Mekan Yöneticileri Network Buluşması",
        type: "VENDOR_MEETUP",
        format: "HYBRID",
        locationOrUrl: "Swissôtel The Bosphorus & Online Zoom Stream",
        startDate: new Date("2026-08-20T14:00:00"),
        capacityLimit: 300,
        registeredCount: 210,
        checkedInCount: 0,
        aiPredictedAttendanceRatePercent: 92,
        aiOptimalSchedulingTip: "B2B katılımlarda Perşembe öğleden sonra katılım oranı en yüksektir.",
        ticketPriceAmount: 500,
        currency: "TRY",
      },
    ];
  }

  /**
   * Etkinlik Kaydı Yaparak Dinamik QR Bilet Üretir
   */
  public static async registerForEvent(
    eventId: string,
    registrantName: string,
    registrantEmail: string
  ): Promise<TicketRegistration> {
    const events = await this.getEvents();
    const event = events.find((e) => e.id === eventId);
    const eventTitle = event ? event.title : "WedyPlan Etkinliği";

    const qrToken = `QR_${Math.random().toString(36).substring(2, 9).toUpperCase()}_${Date.now()}`;

    const newTicket: TicketRegistration = {
      id: `tkt_${Math.random().toString(36).substring(2, 9)}`,
      eventId,
      eventTitle,
      registrantName,
      registrantEmail,
      qrValidationToken: qrToken,
      isCheckedIn: false,
      registeredAt: new Date(),
    };

    let tickets: TicketRegistration[] = [];
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.TICKET_KEY);
      if (data) tickets = JSON.parse(data);
      tickets.unshift(newTicket);
      localStorage.setItem(this.TICKET_KEY, JSON.stringify(tickets));
    }

    return newTicket;
  }

  /**
   * QR Kod Taraması İle Check-in Doğrulaması Yapar
   */
  public static async validateQrCheckIn(qrToken: string): Promise<{ success: boolean; ticket?: TicketRegistration; error?: string }> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.TICKET_KEY);
      if (data) {
        const tickets: TicketRegistration[] = JSON.parse(data);
        const idx = tickets.findIndex((t) => t.qrValidationToken === qrToken);

        if (idx !== -1) {
          if (tickets[idx].isCheckedIn) {
            return { success: false, error: "ALREADY_CHECKED_IN: Bu QR bilet ile daha önce giriş yapılmış." };
          }

          tickets[idx].isCheckedIn = true;
          tickets[idx].checkedInAt = new Date();
          tickets[idx].certificateUrl = `https://cert.wedyplan.com/verify?tkt=${tickets[idx].id}`;

          localStorage.setItem(this.TICKET_KEY, JSON.stringify(tickets));
          return { success: true, ticket: tickets[idx] };
        }
      }
    }

    return { success: false, error: "INVALID_QR_TOKEN: Geçersiz veya bulunamayan QR bilet." };
  }
}