export interface SecurityStatusSummary {
  zeroTrustStatus: "ENFORCED" | "DEGRADED" | "DISABLED";
  activeThreatsBlockedCount: number;
  wafRulesActiveCount: number;
  encryptionStandard: string;
  kvkkComplianceScorePct: number;
  gdprComplianceScorePct: number;
  soc2Status: string;
  threats: Array<{
    id: string;
    type: string;
    ip: string;
    level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    action: string;
    timestamp: string;
  }>;
}

export function getSecurityStatusSnapshot(): SecurityStatusSummary {
  return {
    zeroTrustStatus: "ENFORCED",
    activeThreatsBlockedCount: 1420,
    wafRulesActiveCount: 86,
    encryptionStandard: "AES-256-GCM + TLS 1.3",
    kvkkComplianceScorePct: 100,
    gdprComplianceScorePct: 100,
    soc2Status: "SOC2_TYPE_2_READY",
    threats: [
      { id: "thr_01", type: "SQL Injection Attempt", ip: "185.220.101.4", level: "CRITICAL", action: "BLOCKED_IP", timestamp: "Anlık (12s önce)" },
      { id: "thr_02", type: "Credential Stuffing / IAM Brute Force", ip: "45.154.255.82", level: "HIGH", action: "ACCOUNT_LOCKED", timestamp: "1 dk önce" },
      { id: "thr_03", type: "Anomalous Cross-Region API Call", ip: "103.251.167.2", level: "MEDIUM", action: "CHALLENGED_2FA", timestamp: "3 dk önce" },
      { id: "thr_04", type: "Unusual Bulk KVKK Export Request", ip: "194.26.29.112", level: "HIGH", action: "FLAGGED_AUDIT", timestamp: "5 dk önce" },
    ],
  };
}
