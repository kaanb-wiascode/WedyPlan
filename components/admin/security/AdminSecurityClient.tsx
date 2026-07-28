"use client";

import React, { useState } from "react";
import SecurityHeader from "./SecurityHeader";
import ComplianceMatrixBento from "./ComplianceMatrixBento";
import WAFThreatInspector from "./WAFThreatInspector";
import SecurityAuditConsole from "./SecurityAuditConsole";

export default function AdminSecurityClient() {
  const [data] = useState({
    blockedThreatsCount: 1420,
    wafRulesCount: 86,
    kvkkScore: 100,
    gdprScore: 100,
    threats: [
      { id: "thr_01", type: "SQL Injection Attempt", ip: "185.220.101.4", level: "CRITICAL", action: "BLOCKED_IP", timestamp: "Anlık (12s önce)" },
      { id: "thr_02", type: "Credential Stuffing / IAM Brute Force", ip: "45.154.255.82", level: "HIGH", action: "ACCOUNT_LOCKED", timestamp: "1 dk önce" },
      { id: "thr_03", type: "Anomalous Cross-Region API Call", ip: "103.251.167.2", level: "MEDIUM", action: "CHALLENGED_2FA", timestamp: "3 dk önce" },
      { id: "thr_04", type: "Unusual Bulk KVKK Export Request", ip: "194.26.29.112", level: "HIGH", action: "FLAGGED_AUDIT", timestamp: "5 dk önce" },
    ],
    complianceItems: [
      { standard: "KVKK", requirement: "Aydınlatma Metni & Veri Maskeleme", status: "PASS" },
      { standard: "GDPR", requirement: "Right to be Forgotten & Data Export", status: "PASS" },
      { standard: "SOC2 Type 2", requirement: "Audit Logs & Continuous Telemetry", status: "PASS" },
      { standard: "ISO 27001", requirement: "Secrets Management & Vault Security", status: "PASS" },
      { standard: "OWASP Top 10", requirement: "Broken Access Control Mitigation", status: "PASS" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SecurityHeader
        blockedThreatsCount={data.blockedThreatsCount}
        wafRulesCount={data.wafRulesCount}
        kvkkScore={data.kvkkScore}
        gdprScore={data.gdprScore}
        onOpenScanModal={() => alert("🛡️ AI Security Scan Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <SecurityAuditConsole />
          <ComplianceMatrixBento auditItems={data.complianceItems} />
        </div>

        <div className="lg:col-span-7 font-sans">
          <WAFThreatInspector threats={data.threats} />
        </div>
      </div>
    </div>
  );
}
