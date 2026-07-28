export type NotificationPriority = "CRITICAL_AI" | "CONTRACT_ESCROW" | "BOOKING_REMINDER" | "PROMOTION";

export interface MobileNotificationPayload {
  id: string;
  title: string;
  body: string;
  category: "CONTRACT" | "WEDY_AI" | "BOOKING" | "PAYMENT";
  priority: NotificationPriority;
  deepLinkUrl?: string;
  mediaUrl?: string;
  receivedAt: Date;
  isRead: boolean;
  actionButtons?: { id: string; label: string; action: string }[];
}

export class PushNotificationEngine {
  private static STORAGE_KEY = "WEDYPLAN_NOTIFICATIONS_HISTORY_V1";

  /**
   * Cihaz push izinlerini ve APNs/FCM Device Token kayıt sürecini yönetir.
   */
  public static async requestPermissionAndRegisterToken(): Promise<{ success: boolean; deviceToken?: string; error?: string }> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return { success: false, error: "NOTIFICATION_NOT_SUPPORTED" };
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const mockDeviceToken = `apns_fcm_${Math.random().toString(36).substring(2, 15)}`;
        return { success: true, deviceToken: mockDeviceToken };
      }
      return { success: false, error: "PERMISSION_DENIED" };
    } catch (err) {
      return { success: false, error: "PUSH_REGISTRATION_FAILED" };
    }
  }

  /**
   * AI Öncelik Motoru: Bildirimin kullanıcının güncel aksiyonlarına göre sırasını belirler.
   */
  public static calculatePriority(payload: Partial<MobileNotificationPayload>): NotificationPriority {
    if (payload.category === "CONTRACT" || payload.category === "PAYMENT") {
      return "CONTRACT_ESCROW";
    }
    if (payload.category === "WEDY_AI") {
      return "CRITICAL_AI";
    }
    return "BOOKING_REMINDER";
  }

  /**
   * Bildirimi yerel geçmiş veritabanına kaydeder.
   */
  public static saveToHistory(notification: Omit<MobileNotificationPayload, "id" | "receivedAt" | "isRead">): MobileNotificationPayload {
    const history = this.getHistory();
    const newNotif: MobileNotificationPayload = {
      ...notification,
      id: `notif_${Math.random().toString(36).substring(2, 9)}`,
      receivedAt: new Date(),
      isRead: false,
    };

    history.unshift(newNotif);
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(0, 50))); // Son 50 bildirim
    }
    return newNotif;
  }

  /**
   * Okunmamış bildirim geçmişini getirir.
   */
  public static getHistory(): MobileNotificationPayload[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Tümü okundu işaretleme
   */
  public static markAllAsRead(): void {
    const history = this.getHistory().map(n => ({ ...n, isRead: true }));
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
  }
}