export class ContextBuilder {
    /**
     * Constructs wedding-specific system context payload
     */
    static buildWeddingContext(data: {
      coupleNames?: string;
      weddingDate?: string;
      city?: string;
      budgetTotal?: number;
      guestCount?: number;
    }): string {
      return `
        DÜĞÜN BAĞLAMI:
        - Çift: ${data.coupleNames || 'Belirtilmedi'}
        - Düğün Tarihi: ${data.weddingDate || 'Belirtilmedi'}
        - Şehir: ${data.city || 'İstanbul'}
        - Toplam Bütçe: ${data.budgetTotal ? `${data.budgetTotal.toLocaleString('tr-TR')} ₺` : 'Belirtilmedi'}
        - Davetli Sayısı: ${data.guestCount || 'Belirtilmedi'}
      `.trim();
    }
  }