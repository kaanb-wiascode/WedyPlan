export interface TimeZoneProfile {
    ianaCode: string; // e.g. "Europe/Istanbul", "Europe/Berlin", "Asia/Dubai", "America/New_York"
    cityName: string;
    utcOffsetFormatted: string; // e.g. "UTC+03:00", "UTC+02:00"
    isDstActive: boolean;
    dstOffsetHours: number;
    regionalWeekendDays: ("FRIDAY" | "SATURDAY" | "SUNDAY")[];
  }
  
  export interface CrossBorderMeetingSuggestion {
    id: string;
    coupleTimeZone: string;
    vendorTimeZone: string;
    coupleLocationName: string;
    vendorLocationName: string;
    suggestedLocalTimeCouple: string;
    suggestedLocalTimeVendor: string;
    aiOverlapScorePercent: number; // 0-100%
    aiOptimizationNote: string;
  }
  
  export interface TimeZoneSummary {
    configuredTimeZonesCount: number;
    dstTransitionShieldActive: boolean;
    aiMeetingOverlapOptimizationPercent: number;
    aiTimeZoneInsightNote: string;
  }
  
  export class TimeZoneEngine {
    private static STORAGE_KEY = "WEDYPLAN_TIMEZONES_VAULT_V1";
  
    /**
     * Tanımlı IANA Saat Dilimlerini Getirir
     */
    public static async getTimeZones(): Promise<TimeZoneProfile[]> {
      return [
        {
          ianaCode: "Europe/Istanbul",
          cityName: "İstanbul (Türkiye)",
          utcOffsetFormatted: "UTC+03:00",
          isDstActive: false, // Sabit GMT+3
          dstOffsetHours: 0,
          regionalWeekendDays: ["SATURDAY", "SUNDAY"],
        },
        {
          ianaCode: "Europe/Berlin",
          cityName: "Berlin / Münih (Almanya)",
          utcOffsetFormatted: "UTC+02:00",
          isDstActive: true, // Yaz saati uygulaması aktif
          dstOffsetHours: 1,
          regionalWeekendDays: ["SATURDAY", "SUNDAY"],
        },
        {
          ianaCode: "Asia/Dubai",
          cityName: "Dubai (BAE / BAE)",
          utcOffsetFormatted: "UTC+04:00",
          isDstActive: false,
          dstOffsetHours: 0,
          regionalWeekendDays: ["SATURDAY", "SUNDAY"], // Cuma/Cumartesi veya Cumartesi/Pazar
        },
        {
          ianaCode: "America/New_York",
          cityName: "New York (ABD)",
          utcOffsetFormatted: "UTC-04:00",
          isDstActive: true,
          dstOffsetHours: 1,
          regionalWeekendDays: ["SATURDAY", "SUNDAY"],
        },
      ];
    }
  
    /**
     * WedyAI Çapraz Sınır Toplantı Önerilerini Getirir
     */
    public static async getMeetingSuggestions(): Promise<CrossBorderMeetingSuggestion[]> {
      return [
        {
          id: "m_sug_101",
          coupleTimeZone: "America/New_York",
          vendorTimeZone: "Europe/Istanbul",
          coupleLocationName: "New York (Çift)",
          vendorLocationName: "İstanbul (Çırağan Palace)",
          suggestedLocalTimeCouple: "10:00 AM EDT",
          suggestedLocalTimeVendor: "17:00 (5:00 PM) TRT",
          aiOverlapScorePercent: 98,
          aiOptimizationNote: "7 saatlik zaman farkı için en ideal çalışma saati çakışması New York sabah 10:00 - İstanbul akşamüstü 17:00 saatleridir.",
        },
        {
          id: "m_sug_102",
          coupleTimeZone: "Europe/Berlin",
          vendorTimeZone: "Asia/Dubai",
          coupleLocationName: "Berlin (Çift)",
          vendorLocationName: "Dubai (Burj Al Arab)",
          suggestedLocalTimeCouple: "12:00 PM CEST",
          suggestedLocalTimeVendor: "14:00 (2:00 PM) GST",
          aiOverlapScorePercent: 96,
          aiOptimizationNote: "Sadece 2 saatlik fark mevcuttur. Öğle saatleri %100 mesai çakışması sağlar.",
        },
      ];
    }
  
    /**
     * Saat Dilimi Özetini Getirir
     */
    public static async getTimeZoneSummary(): Promise<TimeZoneSummary> {
      return {
        configuredTimeZonesCount: 4,
        dstTransitionShieldActive: true,
        aiMeetingOverlapOptimizationPercent: 98.2,
        aiTimeZoneInsightNote: "Yaz saati (DST) geçişleri UTC ISO-8601 standart damgası ile sıfır zaman kayması güvencesiyle senkronize edildi.",
      };
    }
  }