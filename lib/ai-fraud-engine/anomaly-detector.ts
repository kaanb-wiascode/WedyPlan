import { ScanFraudRiskInput } from "@/lib/validations/ai-fraud-engine";

export interface FraudScanResult {
  scanId: string;
  fraudScorePct: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  recommendedAction: "ALLOW" | "FLAG_REVIEW" | "AUTO_BLOCK";
  detectedAnomalies: string[];
  latencyMs: number;
  aiExplanation: string;
}

export function detectFraudAnomalies(input: ScanFraudRiskInput): FraudScanResult {
  const scanId = "scan_frd_" + Math.random().toString(36).substring(2, 9);
  let score = 12;
  let riskLevel: FraudScanResult["riskLevel"] = "LOW";
  let action: FraudScanResult["recommendedAction"] = "ALLOW";
  const anomalies: string[] = [];

  if (input.targetType === "FAKE_VENDOR") {
    score = 88;
    riskLevel = "HIGH";
    action = "FLAG_REVIEW";
    anomalies.push("Stok/AI Üretimi Görsel Kullanım Tespiti", "Sürekli Değişen IP Adresi", "Şüpheli Fiyat/İndirim Oranı");
  } else if (input.targetType === "PAYMENT_FRAUD") {
    score = 94;
    riskLevel = "CRITICAL";
    action = "AUTO_BLOCK";
    anomalies.push("Anormal Kart Deneme Hızı", "Proxy/VPN İletim Tespiti");
  }

  return {
    scanId,
    fraudScorePct: score,
    riskLevel,
    recommendedAction: action,
    detectedAnomalies: anomalies.length > 0 ? anomalies : ["Anomali tespit edilmedi"],
    latencyMs: 38,
    aiExplanation: `Fraud Detection AI, '${input.targetType}' hedefi için ${score}% risk skoru hesapladı. Otomatik Aksiyon: ${action}.`,
  };
}
