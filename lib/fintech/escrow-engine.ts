export type EscrowLifecycleState =
  | "PAYMENT_INITIATED"
  | "FUNDS_RESERVED"
  | "SERVICE_CONFIRMED"
  | "RELEASED"
  | "DISPUTE_HOLD"
  | "REFUNDED"
  | "SETTLED";

export interface EscrowMilestone {
  id: string;
  milestoneTitle: string;
  releasePercentage: number; // e.g. 30%
  amount: number;
  isConfirmedByCouple: boolean;
  isReleasedToVendor: boolean;
  autoReleaseDate?: Date;
}

export interface EscrowVaultContract {
  id: string;
  contractIdRef: string;
  coupleName: string;
  vendorName: string;
  totalContractAmount: number;
  escrowReservedAmount: number;
  currency: string;
  currentState: EscrowLifecycleState;
  milestones: EscrowMilestone[];
  aiRiskScore: number; // 0-100 (0 = Safe, 100 = High Fraud/Dispute Risk)
  aiDisputePredictionSummary: string;
  createdAt: Date;
}

export class EscrowEngine {
  private static STORAGE_KEY = "WEDYPLAN_ESCROW_VAULTS_V1";

  /**
   * Aktif Escrow Güvence Sözleşmelerini Getirir
   */
  public static async getEscrowVaults(): Promise<EscrowVaultContract[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "esc_101",
        contractIdRef: "cnt_ciragan_2026",
        coupleName: "Sena & Kaan B.",
        vendorName: "Çırağan Palace Kempinski",
        totalContractAmount: 180000,
        escrowReservedAmount: 180000,
        currency: "TRY",
        currentState: "FUNDS_RESERVED",
        aiRiskScore: 2, // Ultra Güvenli
        aiDisputePredictionSummary: "Tedarikçi doğrulanmış VIP statüsünde ve e-imza onayları eksiksiz. İhtilaf riski %0.2.",
        createdAt: new Date("2026-07-28"),
        milestones: [
          {
            id: "m_1",
            milestoneTitle: "1. Aşama: Kapora Güvencesi (%30)",
            releasePercentage: 30,
            amount: 54000,
            isConfirmedByCouple: true,
            isReleasedToVendor: true,
          },
          {
            id: "m_2",
            milestoneTitle: "2. Aşama: Düğün Öncesi Mekan Hazırlığı (%40)",
            releasePercentage: 40,
            amount: 72000,
            isConfirmedByCouple: false,
            isReleasedToVendor: false,
            autoReleaseDate: new Date("2026-08-30"),
          },
          {
            id: "m_3",
            milestoneTitle: "3. Aşama: Etkinlik Sonu Kapanış (%30)",
            releasePercentage: 30,
            amount: 54000,
            isConfirmedByCouple: false,
            isReleasedToVendor: false,
            autoReleaseDate: new Date("2026-09-13"),
          },
        ],
      },
      {
        id: "esc_102",
        contractIdRef: "cnt_decor_2026",
        coupleName: "Merve & Alper K.",
        vendorName: "Ahenk Çiçekçilik & Bohem Tasarım",
        totalContractAmount: 45000,
        escrowReservedAmount: 45000,
        currency: "TRY",
        currentState: "DISPUTE_HOLD",
        aiRiskScore: 78, // İhtilaf Riski Yüksek
        aiDisputePredictionSummary: "Çift ve tedarikçi arasında canlı çiçek renk paleti revizyonu nedeniyle dondurma işlemi uygulandı.",
        createdAt: new Date("2026-07-20"),
        milestones: [
          {
            id: "m_10",
            milestoneTitle: "1. Aşama: Kapora (%50)",
            releasePercentage: 50,
            amount: 22500,
            isConfirmedByCouple: true,
            isReleasedToVendor: true,
          },
          {
            id: "m_20",
            milestoneTitle: "2. Aşama: Kurulum & Teslimat (%50)",
            releasePercentage: 50,
            amount: 22500,
            isConfirmedByCouple: false,
            isReleasedToVendor: false,
          },
        ],
      },
    ];
  }

  /**
   * Milas/Aşama Onayı Verir ve Bakiyeyi Tedarikçiye Serbest Bırakır
   */
  public static async confirmAndReleaseMilestone(
    vaultId: string,
    milestoneId: string
  ): Promise<{ success: boolean; error?: string }> {
    const vaults = await this.getEscrowVaults();
    const vaultIdx = vaults.findIndex((v) => v.id === vaultId);

    if (vaultIdx !== -1) {
      const mIdx = vaults[vaultIdx].milestones.findIndex((m) => m.id === milestoneId);
      if (mIdx !== -1) {
        vaults[vaultIdx].milestones[mIdx].isConfirmedByCouple = true;
        vaults[vaultIdx].milestones[mIdx].isReleasedToVendor = true;

        // Bütün aşamalar tamamlandıysa durumu SETTLED yap
        const allDone = vaults[vaultIdx].milestones.every((m) => m.isReleasedToVendor);
        if (allDone) {
          vaults[vaultIdx].currentState = "SETTLED";
        } else {
          vaults[vaultIdx].currentState = "SERVICE_CONFIRMED";
        }

        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vaults));
        }
        return { success: true };
      }
    }
    return { success: false, error: "VAULT_NOT_FOUND: Escrow kaydı bulunamadı." };
  }

  /**
   * İhtilaf / Anlaşmazlık Durumunda Bakiyeyi Dondurur (Dispute Freeze)
   */
  public static async triggerDisputeHold(vaultId: string, reason: string): Promise<boolean> {
    const vaults = await this.getEscrowVaults();
    const idx = vaults.findIndex((v) => v.id === vaultId);

    if (idx !== -1) {
      vaults[idx].currentState = "DISPUTE_HOLD";
      vaults[idx].aiDisputePredictionSummary = `Kullanıcı Tarafından İhtilaf Açıldı: ${reason}`;
      vaults[idx].aiRiskScore = 90;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vaults));
      }
      return true;
    }
    return false;
  }
}