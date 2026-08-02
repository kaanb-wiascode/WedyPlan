"use server";

import { revalidatePath } from "next/cache";
import { 
  CalendarEvent, 
  CreateEventInput, 
  createEventSchema 
} from "@/lib/validations/vendor-calendar";

// 1. Takvim Etkinliklerini Getir (Gerçekçi 2026 Mock Verisi)
export async function getVendorCalendarEvents(vendorId?: string) {
  const events: CalendarEvent[] = [
    {
      id: "evt_1",
      title: "Zeynep & Can Düğünü",
      type: "WEDDING",
      status: "SCHEDULED",
      startDate: "2026-09-15T19:00:00",
      endDate: "2026-09-15T23:59:00",
      allDay: false,
      leadId: "lead_101",
      spaceId: "space_karina",
      color: "bg-emerald-500", // Düğünler yeşil
      notes: "400 Kişilik Yemekli Menü 2"
    },
    {
      id: "evt_2",
      title: "Elif & Burak Mekan Gezisi",
      type: "TOUR",
      status: "SCHEDULED",
      startDate: "2026-08-05T14:00:00",
      endDate: "2026-08-05T15:00:00",
      allDay: false,
      leadId: "lead_102",
      color: "bg-amber-500", // Geziler turuncu
      notes: "Havuzbaşı alanını görmek istiyorlar."
    },
    {
      id: "evt_3",
      title: "Tadım: Selin & Mert",
      type: "TASTING",
      status: "COMPLETED",
      startDate: "2026-08-01T12:30:00",
      endDate: "2026-08-01T14:00:00",
      allDay: false,
      leadId: "lead_103",
      color: "bg-purple-500", // Tadımlar mor
      notes: "Vejetaryen menü alternatifleri eklendi."
    },
    {
      id: "evt_4",
      title: "Tadilat (Teras Kapalı)",
      type: "BLOCK",
      status: "SCHEDULED",
      startDate: "2026-08-10T00:00:00",
      endDate: "2026-08-12T23:59:00",
      allDay: true,
      spaceId: "space_teras",
      color: "bg-slate-500", // Blokajlar gri
      notes: "Zemin yenileme çalışması."
    }
  ];

  return { success: true, events };
}

// 2. Yeni Etkinlik / Randevu Ekle
export async function createCalendarEventAction(data: CreateEventInput) {
  const validation = createEventSchema.safeParse(data);
  
  if (!validation.success) {
    return { success: false, error: "Geçersiz etkinlik verisi." };
  }

  // 🤖 AI Çakışma Kontrolü Simülasyonu (Örn: Aynı salona 2 düğün yazılamaz)
  if (data.type === "WEDDING" && data.startDate.includes("2026-09-15") && data.spaceId === "space_karina") {
    return { 
      success: false, 
      error: "Çakışma Uyarısı: Karina Balo Salonu'nda bu tarihte zaten bir düğün rezervasyonu var!" 
    };
  }

  // Veritabanına kaydetme simülasyonu...
  
  revalidatePath("/vendor/calendar");
  return { success: true, message: "Etkinlik başarıyla takvime eklendi." };
}

// 3. Sürükle-Bırak ile Tarih Güncelleme (Drag & Drop)
export async function updateEventDateAction(eventId: string, newStart: string, newEnd: string) {
  // DB Güncelleme İşlemi...
  revalidatePath("/vendor/calendar");
  
  return { 
    success: true, 
    message: "Etkinlik tarihi güncellendi." 
  };
}