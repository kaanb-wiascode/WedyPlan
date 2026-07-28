export interface IncidentDiagnosisResult {
  incidentId: string;
  recommendedRunbook: {
    runbookId: string;
    title: string;
    steps: string[];
    estimatedRecoveryTimeMin: number;
  };
  aiPostmortemSummary: string;
}

export function diagnoseAndRecommendRunbook(serviceName: string, severity: string): IncidentDiagnosisResult {
  return {
    incidentId: "inc_sre_" + Math.random().toString(36).substring(2, 9),
    recommendedRunbook: {
      runbookId: "rb_db_failover_01",
      title: "Otomatik DB Read-Replica Failover ve Bağlantı Havuzu Sıfırlama",
      steps: [
        "1. PostgreSQL ana düğüm latensini kontrol et",
        "2. Redis bağlantı havuzundaki kilitli oturumları temizle",
        "3. Trafiği yedek read-replica havuzuna yönlendir",
        "4. AI Router'a geçici %10 gecikme toleransı tanımla",
      ],
      estimatedRecoveryTimeMin: 4,
    },
    aiPostmortemSummary: "Olay tespiti: " + serviceName + " servisinde (" + severity + ") geçici kaynak darboğazı. Otomatik Runbook rehberi hazırlandı.",
  };
}
