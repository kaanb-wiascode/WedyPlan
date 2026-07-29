export interface SharingRiskAssessment {
    policyId: string;
    overallRiskScore: number; // 0 - 100
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    sensitiveFieldsDetected: string[];
    recommendations: string[];
  }
  
  export class DataSharingEngine {
    /**
     * Paylaşılan veri setinde hassas veri (PII, Finansal Veri) tespiti ve risk analizi
     */
    static analyzeSharingRisk(
      policyName: string,
      targetType: string,
      sensitivityLevel: string,
      hasDataContract: boolean
    ): SharingRiskAssessment {
      const sensitiveFieldsDetected: string[] = [];
      let riskScore = 15; // Base risk
  
      if (sensitivityLevel === 'CRITICAL' || sensitivityLevel === 'SENSITIVE') {
        riskScore += 35;
        sensitiveFieldsDetected.push('couple_phone_number', 'payment_card_tokens', 'vendor_bank_account');
      }
  
      if (targetType === 'EXTERNAL_API') {
        riskScore += 25;
      } else if (targetType === 'PARTNER_VENDOR') {
        riskScore += 15;
      }
  
      if (!hasDataContract) {
        riskScore += 20;
      }
  
      riskScore = Math.min(100, riskScore);
  
      const riskLevel = riskScore > 75 ? 'CRITICAL' : riskScore > 50 ? 'HIGH' : riskScore > 25 ? 'MEDIUM' : 'LOW';
  
      const recommendations: string[] = [];
  
      if (sensitiveFieldsDetected.length > 0) {
        recommendations.push('Hassas veri alanları için Anonymization veya Dynamic Masking filtresi aktifleştirin.');
      }
  
      if (!hasDataContract) {
        recommendations.push('Dış tedarikçi paylaşımı için bağlayıcı bir Veri Kontratı (Data Contract) zorunlu kılınmalıdır.');
      }
  
      if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
        recommendations.push('Paylaşım süresini 30 gün ile sınırlayın ve otomatik Usage Auditing uyarısı kurun.');
      } else {
        recommendations.push('Erişim izinleri ve kontrat geçerliliği optimal durumda.');
      }
  
      return {
        policyId: policyName,
        overallRiskScore: riskScore,
        riskLevel,
        sensitiveFieldsDetected,
        recommendations,
      };
    }
  }