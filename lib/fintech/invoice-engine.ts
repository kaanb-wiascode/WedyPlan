export type InvoiceType = "STANDARD_INVOICE" | "CREDIT_NOTE" | "RECEIPT";
export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "REFUNDED" | "VOID";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number; // e.g. 20% KDV
  totalAmount: number;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  issuerName: string;
  recipientName: string;
  taxIdNumber: string;
  subtotalAmount: number;
  taxTotalAmount: number;
  grandTotalAmount: number;
  currency: string;
  items: InvoiceItem[];
  pdfDownloadUrl: string;
  aiCategoryTag: string;
  aiFinancialInsightNote: string;
  issuedAt: Date;
  paidAt?: Date;
}

export interface TaxSummaryReport {
  totalInvoicedVolume: number;
  totalKdvTaxCollected: number;
  creditNotesTotalAmount: number;
  currency: string;
  aiTaxOptimizationTip: string;
}

export class InvoiceEngine {
  private static STORAGE_KEY = "WEDYPLAN_INVOICES_VAULT_V1";

  /**
   * Tüm e-Fatura, Dekont ve İade Faturası Kayıtlarını Getirir
   */
  public static async getInvoices(): Promise<InvoiceRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "inv_101",
        invoiceNumber: "WED-2026-000842",
        type: "STANDARD_INVOICE",
        status: "PAID",
        issuerName: "WedyPlan Teknoloji A.Ş.",
        recipientName: "Çırağan Palace Kempinski",
        taxIdNumber: "TR1234567890",
        subtotalAmount: 150000,
        taxTotalAmount: 30000, // %20 KDV
        grandTotalAmount: 180000,
        currency: "TRY",
        pdfDownloadUrl: "https://pdf.wedyplan.com/inv-101.pdf",
        aiCategoryTag: "VENUE_BOOKING_ESCROW",
        aiFinancialInsightNote: "Çırağan Balo Salonu kiralama Escrow kapora ödemesi faturalandırıldı.",
        issuedAt: new Date("2026-07-28"),
        paidAt: new Date("2026-07-28"),
        items: [
          {
            id: "itm_1",
            description: "Düğün Mekanı Escrow Kapora Güvence Hizmeti",
            quantity: 1,
            unitPrice: 150000,
            taxRatePercent: 20,
            totalAmount: 180000,
          },
        ],
      },
      {
        id: "inv_102",
        invoiceNumber: "WED-2026-000843",
        type: "CREDIT_NOTE",
        status: "REFUNDED",
        issuerName: "WedyPlan Teknoloji A.Ş.",
        recipientName: "Ahenk Çiçekçilik & Bohem Tasarım",
        taxIdNumber: "TR9876543210",
        subtotalAmount: 2500,
        taxTotalAmount: 500,
        grandTotalAmount: 3000,
        currency: "TRY",
        pdfDownloadUrl: "https://pdf.wedyplan.com/cn-102.pdf",
        aiCategoryTag: "CANCELLED_DEPOSIT_REFUND",
        aiFinancialInsightNote: "Ahenk Çiçekçilik revizyon iadesi için gider pusulası / kredi notu düzenlendi.",
        issuedAt: new Date("2026-07-25"),
        paidAt: new Date("2026-07-25"),
        items: [
          {
            id: "itm_2",
            description: "Anlaşmazlık Çözümü Kısmi İade Tutarı (Credit Note)",
            quantity: 1,
            unitPrice: 2500,
            taxRatePercent: 20,
            totalAmount: 3000,
          },
        ],
      },
    ];
  }

  /**
   * Vergi Özet Raporunu Getirir
   */
  public static async getTaxSummary(): Promise<TaxSummaryReport> {
    return {
      totalInvoicedVolume: 18450000,
      totalKdvTaxCollected: 3690000,
      creditNotesTotalAmount: 45000,
      currency: "TRY",
      aiTaxOptimizationTip: "Aylık e-Fatura ve KDV beyannamesi otomatik vergi kütüğüne işlendi. ₺3.690.000 TL KDV rezervi hazır.",
    };
  }

  /**
   * Otomatik Yeni e-Fatura Üretir
   */
  public static async generateInvoice(
    recipientName: string,
    taxIdNumber: string,
    description: string,
    amount: number
  ): Promise<InvoiceRecord> {
    const kdv = amount * 0.20;
    const grandTotal = amount + kdv;

    const newInv: InvoiceRecord = {
      id: `inv_${Math.random().toString(36).substring(2, 9)}`,
      invoiceNumber: `WED-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      type: "STANDARD_INVOICE",
      status: "PAID",
      issuerName: "WedyPlan Teknoloji A.Ş.",
      recipientName,
      taxIdNumber,
      subtotalAmount: amount,
      taxTotalAmount: kdv,
      grandTotalAmount: grandTotal,
      currency: "TRY",
      pdfDownloadUrl: "https://pdf.wedyplan.com/invoice-generated.pdf",
      aiCategoryTag: "AUTO_GENERATED_ESCROW",
      aiFinancialInsightNote: "WedyAI e-Fatura entegrasyonu ile otomatik oluşturuldu.",
      issuedAt: new Date(),
      paidAt: new Date(),
      items: [
        {
          id: `itm_${Date.now()}`,
          description,
          quantity: 1,
          unitPrice: amount,
          taxRatePercent: 20,
          totalAmount: grandTotal,
        },
      ],
    };

    const currentInvoices = await this.getInvoices();
    currentInvoices.unshift(newInv);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentInvoices));
    }

    return newInv;
  }
}