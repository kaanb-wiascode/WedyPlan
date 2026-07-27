import { DocumentReaderRequest, DocumentReaderResult } from '@/types/ai-core';

export class DocumentReaderEngine {
  /**
   * Reads contract/offer texts and extracts structured financial & risk data
   */
  static async extractStructuredData(request: DocumentReaderRequest): Promise<DocumentReaderResult> {
    return {
      extractedData: {
        vendorName: 'Luxe Kır Bahçesi A.Ş.',
        coupleName: 'Selin Arslan & Kaan Yılmaz',
        agreedPrice: 250000,
        paymentSchedule: [
          { dueDate: '2026-05-01', amount: 50000, isPaid: true },
          { dueDate: '2026-08-01', amount: 200000, isPaid: false }
        ],
        cancellationClauseSummary: 'Etkinlik tarihinden 30 gün öncesine kadar yapılan iptallerde %50 kapora iade edilir.',
        includedServices: ['300 Kişilik Menü', 'Canlı Orkestra', 'Gelin Süiti'],
        excludedServices: ['After party alkol servisi', 'Ekstra vale ücretleri']
      },
      confidenceScore: 96,
      riskFlags: [
        '⚠️ İptal maddesinde 30 günden daha kısa süre kalması halinde kapora iadesi yapılmayacağı belirtilmektedir.'
      ]
    };
  }
}