export type CommunicationChannel = "EMAIL" | "SMS" | "PUSH" | "WHATSAPP";
export type MessageDeliveryStatus = "DELIVERED" | "QUEUED_QUIET_HOURS" | "PENDING_DISPATCH" | "FAILED";

export interface LocalizedMessageTemplate {
  id: string;
  templateKey: string; // e.g. "escrow.deposit_confirmed"
  channel: CommunicationChannel;
  targetLanguage: string; // "tr", "en", "de", "ar"
  subjectOrTitle: string;
  bodyContent: string;
  isQuietHoursExempt: boolean; // Transactional messages are exempt
  aiOptimizationScorePercent: number;
}

export interface CommunicationDispatchRecord {
  id: string;
  recipientRef: string;
  channel: CommunicationChannel;
  countryCode: string;
  languageCode: string;
  dispatchStatus: MessageDeliveryStatus;
  aiPredictedBestTimeFormatted: string;
  sentAt: Date;
}

export interface GlobalCommunicationSummary {
  totalDispatchedMessagesCount: number;
  activeChannelsCount: number;
  deliverySuccessRatePercent: number;
  aiContentOptimizationScorePercent: number;
  aiCommunicationInsightNote: string;
}

export class GlobalCommunicationEngine {
  private static STORAGE_KEY = "WEDYPLAN_GLOBAL_COMMUNICATIONS_V1";

  /**
   * Yerelleştirilmiş Mesaj Şablonlarını Getirir
   */
  public static async getMessageTemplates(): Promise<LocalizedMessageTemplate[]> {
    return [
      {
        id: "tmpl_101",
        templateKey: "escrow.deposit_confirmed",
        channel: "WHATSAPP",
        targetLanguage: "tr",
        subjectOrTitle: "Escrow Güvenceli Depozito Onayı",
        bodyContent: "Sayın {{coupleName}}, {{vendorName}} için ₺{{amount}} tutarındaki kaporanız Escrow saklama hesabında kilitlendi.",
        isQuietHoursExempt: true,
        aiOptimizationScorePercent: 99,
      },
      {
        id: "tmpl_102",
        templateKey: "campaign.summer_wedding_discount",
        channel: "SMS",
        targetLanguage: "de",
        subjectOrTitle: "Sommer-Hochzeitsangebot",
        bodyContent: "Hallo {{coupleName}}, buchen Sie Ihre Traumlocation in der Türkei mit 15% Rabatt!",
        isQuietHoursExempt: false, // Marketing obeys Quiet Hours
        aiOptimizationScorePercent: 95,
      },
    ];
  }

  /**
   * Gönderim Kütüğünü Getirir
   */
  public static async getDispatchRecords(): Promise<CommunicationDispatchRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "disp_101",
        recipientRef: "Sena & Kaan (+90 532 123 45 67)",
        channel: "WHATSAPP",
        countryCode: "TR",
        languageCode: "tr",
        dispatchStatus: "DELIVERED",
        aiPredictedBestTimeFormatted: "10:30 TRT (High Open Rate)",
        sentAt: new Date("2026-07-29T10:30:00"),
      },
      {
        id: "disp_102",
        recipientRef: "Hans Schmidt (+49 170 9876543)",
        channel: "EMAIL",
        countryCode: "DE",
        languageCode: "de",
        dispatchStatus: "DELIVERED",
        aiPredictedBestTimeFormatted: "14:00 CEST",
        sentAt: new Date("2026-07-28T14:00:00"),
      },
      {
        id: "disp_103",
        recipientRef: "Rashid Al-Maktoum (+971 50 123 4567)",
        channel: "SMS",
        countryCode: "AE",
        languageCode: "ar",
        dispatchStatus: "QUEUED_QUIET_HOURS",
        aiPredictedBestTimeFormatted: "09:00 GST (Delayed for Quiet Hours)",
        sentAt: new Date("2026-07-28T23:15:00"),
      },
    ];
  }

  /**
   * İletişim Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<GlobalCommunicationSummary> {
    return {
      totalDispatchedMessagesCount: 48200,
      activeChannelsCount: 4, // Email, SMS, Push, WhatsApp
      deliverySuccessRatePercent: 99.6,
      aiContentOptimizationScorePercent: 98.4,
      aiCommunicationInsightNote: "Arapça WhatsApp ve SMS mesajları için yerel 'Sessiz Saatler' (22:00-08:00) kuralları ve RTL metin biçimlendirmesi aktifleştirildi.",
    };
  }

  /**
   * Test Mesajı Gönderimi Simüle Eder
   */
  public static async dispatchTestMessage(
    recipient: string,
    channel: CommunicationChannel,
    countryCode: string
  ): Promise<CommunicationDispatchRecord> {
    const newDisp: CommunicationDispatchRecord = {
      id: `disp_${Math.random().toString(36).substring(2, 9)}`,
      recipientRef: recipient,
      channel,
      countryCode,
      languageCode: countryCode.toLowerCase(),
      dispatchStatus: "DELIVERED",
      aiPredictedBestTimeFormatted: "Immediate (Test Dispatch)",
      sentAt: new Date(),
    };

    const dispatches = await this.getDispatchRecords();
    dispatches.unshift(newDisp);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dispatches));
    }

    return newDisp;
  }
}