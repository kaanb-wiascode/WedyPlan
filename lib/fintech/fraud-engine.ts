export type FraudSignalType =
  | "SUSPICIOUS_TRANSACTION"
  | "ACCOUNT_TAKEOVER_ATO"
  | "VELOCITY_EXCEEDED"
  | "UNRECOGNIZED_DEVICE"
  | "BEHAVIORAL_ANOMALY";

export type AlertPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AlertResolutionStatus = "INVESTIGATING" | "FROZEN_LOCKDOWN" | "CLEARED_FALSE_POSITIVE";

export interface FraudAlertRecord {
  id: string;
  targetTenantRef: string;
  tenantName: string;
  signalType: FraudSignalType;
  priority: AlertPriority;
  aiRiskScorePercent: number; // 0-100%
  deviceFingerprintHash: string;
  ipAddressLocation: string;
  triggeredRules: string[];
  status: AlertResolutionStatus;
  aiAnalysisSummary: string;
  flaggedAt: Date;
}

export interface FraudPlatformSummary {
  totalScannedTransactionsCount: number;
  activeAlertsCount: number;
  frozenWalletsCount: number;
  preventedFraudAmountTotal: number;
  currency: string;
  aiFraudShieldStatus: string;
}

export class FraudEngine {
  private static STORAGE_KEY = "WEDYPLAN_FRAUD_ALERTS_V1";

  /**
   * Aktif Dolandırıcılık ve Güvenlik Uyarılarını Getirir
   */
  public static async getAlerts(): Promise<FraudAlertRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "frd_101",
        targetTenantRef: "v_bohem_decor",
        tenantName: "Bohem Çiçekçilik Ltd.",
        signalType: "VELOCITY_EXCEEDED",
        priority: "HIGH",
        aiRiskScorePercent: 88,
        deviceFingerprintHash: "fp_8a2b3c4d_macOS",
        ipAddressLocation: "Frankfurt, Almanya (VPN Proxy)",
        triggeredRules: ["Hızlı IBAN Değişikliği", "1 Saatte 5+ Para Çekme Talebi"],
        status: "INVESTIGATING",
        aiAnalysisSummary: "Tedarikçi hesabı IBAN değiştirdikten 3 dakika sonra ₺45.000 TL çekim talebinde bulundu. Geolocation uyumsuzluğu tespit edildi.",
        flaggedAt: new Date("2026-07-29T08:12:00"),
      },
      {
        id: "frd_102",
        targetTenantRef: "usr_suspicious_bot",
        tenantName: "Ahmet Y. (Şüpheli Profil)",
        signalType: "ACCOUNT_TAKEOVER_ATO",
        priority: "CRITICAL",
        aiRiskScorePercent: 96,
        deviceFingerprintHash: "fp_1f9e8d7c_Android_Emulator",
        ipAddressLocation: "Kiev, Ukrayna",
        triggeredRules: ["Parola Sıfırlama + Anında Kart Denemesi", "Çalıntı Kart Testi"],
        status: "FROZEN_LOCKDOWN",
        aiAnalysisSummary: "Android emülatör üzerinden ardışık 12 farklı kredi kartı denemesi yapıldı. Cüzdan ve hesaba otomatik koruma dondurması uygulandı.",
        flaggedAt: new Date("2026-07-28T23:45:00"),
      },
    ];
  }

  /**
   * Finansal Koruma Kalkanı Özetini Getirir
   */
  public static async getSummary(): Promise<FraudPlatformSummary> {
    return {
      totalScannedTransactionsCount: 142080,
      activeAlertsCount: 2,
      frozenWalletsCount: 1,
      preventedFraudAmountTotal: 340000,
      currency: "TRY",
      aiFraudShieldStatus: "Sistem %99.98 doğruluk oranı ile aktif. Gerçek zamanlı yapay zeka hız ve cihaz analizi çalışıyor.",
    };
  }

  /**
   * Şüpheli Hesaba veya Cüzdana Dondurma İşlemi Uygular (Lockdown)
   */
  public static async applyAccountLockdown(alertId: string): Promise<boolean> {
    const alerts = await this.getAlerts();
    const idx = alerts.findIndex((a) => a.id === alertId);

    if (idx !== -1) {
      alerts[idx].status = "FROZEN_LOCKDOWN";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alerts));
      }
      return true;
    }
    return false;
  }

  /**
   * Uyarıyı Güvenli / Yanlış Alarm Olarak İşaretler (Clear Alert)
   */
  public static async clearAlert(alertId: string): Promise<boolean> {
    const alerts = await this.getAlerts();
    const idx = alerts.findIndex((a) => a.id === alertId);

    if (idx !== -1) {
      alerts[idx].status = "CLEARED_FALSE_POSITIVE";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alerts));
      }
      return true;
    }
    return false;
  }
}