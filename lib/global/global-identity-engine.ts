export type RegionalVerificationMethod = "NV_EDEVLET_TR" | "EU_EIDAS" | "UAE_PASS" | "US_CARRIER_LOOKUP";

export interface CountryIdentityProfile {
  countryCode: string; // e.g. "TR", "DE", "AE", "US"
  countryName: string;
  phoneCallingCode: string; // e.g. "+90", "+49", "+971", "+1"
  phoneMaskPattern: string; // e.g. "+90 (5XX) XXX XX XX"
  verificationMethod: RegionalVerificationMethod;
  requiredIdentityFields: string[]; // e.g. ["tcKimlikNo"], ["emiratesId"]
  privacyConsentType: string; // e.g. "KVKK", "GDPR", "UAE_PDPL"
}

export interface RegisteredGlobalUserRecord {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumberFormatted: string;
  isIdentityVerified: boolean;
  aiFraudRiskScorePercent: number; // 0-100%
  aiFraudShieldVerdict: "PASS_LOW_RISK" | "FLAGGED_SUSPICIOUS" | "BLOCKED_FRAUD";
  registeredAt: Date;
}

export interface GlobalIdentitySummary {
  registeredGlobalUsersCount: number;
  supportedIdentityCountriesCount: number;
  verifiedUsersPercent: number;
  aiIdentityFraudPreventionRatePercent: number;
  aiIdentityInsightNote: string;
}

export class GlobalIdentityEngine {
  private static STORAGE_KEY = "WEDYPLAN_GLOBAL_IDENTITY_USERS_V1";

  /**
   * Ülke Kimlik ve Telefon Format Profillerini Getirir
   */
  public static async getCountryProfiles(): Promise<CountryIdentityProfile[]> {
    return [
      {
        countryCode: "TR",
        countryName: "Türkiye",
        phoneCallingCode: "+90",
        phoneMaskPattern: "+90 (5XX) XXX XX XX",
        verificationMethod: "NV_EDEVLET_TR",
        requiredIdentityFields: ["tcKimlikNo", "birthYear"],
        privacyConsentType: "KVKK_AYDINLATMA",
      },
      {
        countryCode: "DE",
        countryName: "Germany (EU)",
        phoneCallingCode: "+49",
        phoneMaskPattern: "+49 XXX XXXXXXXX",
        verificationMethod: "EU_EIDAS",
        requiredIdentityFields: ["eIdNumber"],
        privacyConsentType: "EU_GDPR_CONSENT",
      },
      {
        countryCode: "AE",
        countryName: "United Arab Emirates",
        phoneCallingCode: "+971",
        phoneMaskPattern: "+971 5X XXX XXXX",
        verificationMethod: "UAE_PASS",
        requiredIdentityFields: ["emiratesId"],
        privacyConsentType: "UAE_PDPL_CONSENT",
      },
      {
        countryCode: "US",
        countryName: "United States",
        phoneCallingCode: "+1",
        phoneMaskPattern: "+1 (XXX) XXX-XXXX",
        verificationMethod: "US_CARRIER_LOOKUP",
        requiredIdentityFields: ["zipCode", "ssn4LastDigits"],
        privacyConsentType: "US_CCPA_CONSENT",
      },
    ];
  }

  /**
   * Kayıtlı Küresel Kullanıcı Listesini Getirir
   */
  public static async getGlobalUsers(): Promise<RegisteredGlobalUserRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "usr_g_101",
        fullName: "Sena & Kaan B.",
        email: "sena.kaan@wedyplan.com",
        countryCode: "TR",
        phoneNumberFormatted: "+90 (532) 123 45 67",
        isIdentityVerified: true,
        aiFraudRiskScorePercent: 1,
        aiFraudShieldVerdict: "PASS_LOW_RISK",
        registeredAt: new Date("2026-07-28T10:00:00"),
      },
      {
        id: "usr_g_102",
        fullName: "Hans & Freya Schmidt",
        email: "hans.schmidt@berlin-wedding.de",
        countryCode: "DE",
        phoneNumberFormatted: "+49 170 9876543",
        isIdentityVerified: true,
        aiFraudRiskScorePercent: 3,
        aiFraudShieldVerdict: "PASS_LOW_RISK",
        registeredAt: new Date("2026-07-27T14:30:00"),
      },
      {
        id: "usr_g_103",
        fullName: "Rashid & Fatima Al-Maktoum",
        email: "rashid.dubai@gulf-events.ae",
        countryCode: "AE",
        phoneNumberFormatted: "+971 50 123 4567",
        isIdentityVerified: true,
        aiFraudRiskScorePercent: 2,
        aiFraudShieldVerdict: "PASS_LOW_RISK",
        registeredAt: new Date("2026-07-26T16:15:00"),
      },
    ];
  }

  /**
   * Küresel Kimlik Özetini Getirir
   */
  public static async getSummary(): Promise<GlobalIdentitySummary> {
    return {
      registeredGlobalUsersCount: 14200,
      supportedIdentityCountriesCount: 4,
      verifiedUsersPercent: 98.4,
      aiIdentityFraudPreventionRatePercent: 99.8,
      aiIdentityInsightNote: "e-Devlet, eIDAS ve UAE PASS kimlik doğrulama entegrasyonları ile Sahte Hesap (Fake Account) oranı %0.02'ye düşürüldü.",
    };
  }

  /**
   * Yeni Yerelleştirilmiş Kullanıcı Kaydı (Simulator)
   */
  public static async registerGlobalUser(
    fullName: string,
    email: string,
    countryCode: string,
    phoneNumberFormatted: string
  ): Promise<RegisteredGlobalUserRecord> {
    const newUser: RegisteredGlobalUserRecord = {
      id: `usr_g_${Math.random().toString(36).substring(2, 9)}`,
      fullName,
      email,
      countryCode,
      phoneNumberFormatted,
      isIdentityVerified: true,
      aiFraudRiskScorePercent: 2,
      aiFraudShieldVerdict: "PASS_LOW_RISK",
      registeredAt: new Date(),
    };

    const users = await this.getGlobalUsers();
    users.unshift(newUser);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    return newUser;
  }
}