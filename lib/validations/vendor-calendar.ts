import { z } from "zod";

// Etkinlik Tipleri
export const EventTypeEnum = z.enum([
  "WEDDING",      // Kesinleşmiş Düğün / Etkinlik
  "MEETING",      // Ön Görüşme / Toplantı
  "TASTING",      // Menü Tadımı
  "TOUR",         // Mekan Gezisi
  "BLOCK",        // Kapalı / Tadilat (O gün satışa kapalı)
]);

export const EventStatusEnum = z.enum([
  "SCHEDULED",    // Planlandı
  "COMPLETED",    // Tamamlandı
  "CANCELLED",    // İptal Edildi
]);

export type EventType = z.infer<typeof EventTypeEnum>;
export type EventStatus = z.infer<typeof EventStatusEnum>;

// Takvim Etkinliği Şeması
export const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Başlık gereklidir"),
  type: EventTypeEnum,
  status: EventStatusEnum.default("SCHEDULED"),
  
  // Zamanlama
  startDate: z.string(), // ISO String
  endDate: z.string(),   // ISO String
  allDay: z.boolean().default(false),
  
  // İlişkiler (CRM ve Mekan)
  leadId: z.string().optional(),     // Hangi çift ile ilgili?
  spaceId: z.string().optional(),    // Hangi salonda? (Örn: Karina Balo Salonu)
  
  // Görsel ve Notlar
  color: z.string().optional(),      // UI'da gösterilecek renk
  notes: z.string().optional(),
});

// Yeni Etkinlik Oluşturma Şeması (İstemciden gelecek veri)
export const createEventSchema = CalendarEventSchema.omit({ id: true });

// Tip Tanımları
export type CalendarEvent = z.infer<typeof CalendarEventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;