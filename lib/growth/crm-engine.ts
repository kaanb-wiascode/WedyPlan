export type CustomerLifecycleStage =
  | "LEAD"
  | "PROSPECT"
  | "QUALIFIED"
  | "ACTIVE"
  | "RETURNING"
  | "VIP"
  | "LOST"
  | "ARCHIVED";

export type CrmPipelineType = "SALES_PIPELINE" | "VENDOR_PIPELINE" | "PARTNERSHIP_PIPELINE" | "SPONSOR_PIPELINE";

export interface CrmLeadRecord {
  id: string;
  userIdRef: string; // Zero duplication - references core User ID
  name: string;
  email: string;
  pipelineType: CrmPipelineType;
  lifecycleStage: CustomerLifecycleStage;
  dealValueAmount: number;
  dealCurrency: string;
  aiLeadScore: number; // 0 - 100
  aiNextBestAction: string;
  aiChurnRiskPercent: number;
  assignedOwnerName: string;
  lastContactedAt: Date;
  activeTasksCount: number;
}

export interface CrmPipelineSummary {
  pipelineType: CrmPipelineType;
  totalLeadsCount: number;
  totalPipelineValue: number;
  averageLeadScore: number;
  currency: string;
}

export class CrmEngine {
  private static STORAGE_KEY = "WEDYPLAN_CRM_LEADS_V1";

  /**
   * Aktif CRM Müşteri Kayıtlarını Getirir
   */
  public static async getCrmLeads(pipelineFilter?: CrmPipelineType): Promise<CrmLeadRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed: CrmLeadRecord[] = JSON.parse(data);
        return pipelineFilter ? parsed.filter((l) => l.pipelineType === pipelineFilter) : parsed;
      }
    }

    return [
      {
        id: "crm_101",
        userIdRef: "usr_kaan_sena",
        name: "Sena & Kaan (Bosphorus Balo)",
        email: "sena_kaan_2026@gmail.com",
        pipelineType: "SALES_PIPELINE",
        lifecycleStage: "QUALIFIED",
        dealValueAmount: 180000,
        dealCurrency: "TRY",
        aiLeadScore: 96,
        aiNextBestAction: "WhatsApp üzerinden %10 Erken Rezervasyon Escrow Kuponu (SUMMER2026) iletin.",
        aiChurnRiskPercent: 4,
        assignedOwnerName: "Aylin Yılmaz (Kıdemli Satış Temsilcisi)",
        lastContactedAt: new Date("2026-07-28"),
        activeTasksCount: 1,
      },
      {
        id: "crm_102",
        userIdRef: "v_ciragan_admin",
        name: "Çırağan Palace Kempinski",
        email: "corporate@ciragan.com",
        pipelineType: "VENDOR_PIPELINE",
        lifecycleStage: "VIP",
        dealValueAmount: 450000,
        dealCurrency: "TRY",
        aiLeadScore: 99,
        aiNextBestAction: "Güz dönemi takvim senkronizasyonu ve Dynamic Island widget aktifleşme kontrolü yapın.",
        aiChurnRiskPercent: 1,
        assignedOwnerName: "Caner Demir (Tedarikçi İlişkileri Müdürü)",
        lastContactedAt: new Date("2026-07-27"),
        activeTasksCount: 0,
      },
      {
        id: "crm_103",
        userIdRef: "usr_influencer_selin",
        name: "Selin Yılmaz (Wedding Blogger)",
        email: "selin@weddingblog.com",
        pipelineType: "PARTNERSHIP_PIPELINE",
        lifecycleStage: "ACTIVE",
        dealValueAmount: 85000,
        dealCurrency: "TRY",
        aiLeadScore: 92,
        aiNextBestAction: "Ağustos ayı affiliate komisyon raporunu PDF olarak iletin ve yeni kampanya tanımlayın.",
        aiChurnRiskPercent: 8,
        assignedOwnerName: "Elif Karahan (Büyüme Yöneticisi)",
        lastContactedAt: new Date("2026-07-25"),
        activeTasksCount: 2,
      },
    ];
  }

  /**
   * Boru Hattı Özet Metriklerini Hesaplar
   */
  public static async getPipelineSummary(pipeline: CrmPipelineType): Promise<CrmPipelineSummary> {
    const leads = await this.getCrmLeads(pipeline);
    const totalVal = leads.reduce((acc, curr) => acc + curr.dealValueAmount, 0);
    const avgScore = leads.length > 0 ? Math.round(leads.reduce((acc, curr) => acc + curr.aiLeadScore, 0) / leads.length) : 0;

    return {
      pipelineType: pipeline,
      totalLeadsCount: leads.length,
      totalPipelineValue: totalVal,
      averageLeadScore: avgScore,
      currency: "TRY",
    };
  }

  /**
   * Müşteri Yaşam Döngü Aşamasını Günceller (Stage Transition)
   */
  public static async updateStage(leadId: string, newStage: CustomerLifecycleStage): Promise<boolean> {
    const leads = await this.getCrmLeads();
    const idx = leads.findIndex((l) => l.id === leadId);

    if (idx !== -1) {
      leads[idx].lifecycleStage = newStage;
      leads[idx].lastContactedAt = new Date();
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
      }
      return true;
    }
    return false;
  }
}