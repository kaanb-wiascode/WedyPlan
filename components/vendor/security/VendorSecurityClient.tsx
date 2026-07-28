"use client";

import React, { useState } from "react";
import SecurityHeader from "./SecurityHeader";
import AISecurityThreatWidget from "./AISecurityThreatWidget";
import ActiveSessionsAndDevices from "./ActiveSessionsAndDevices";
import AuditLogsAndApiKeyManager from "./AuditLogsAndApiKeyManager";
import { requestVendorDataExportAction, revokeVendorSessionAction } from "@/lib/actions/vendor-security";

export default function VendorSecurityClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    securityScore: 98,
    blockedThreatsCount: 2,
    suspiciousLogins: [
      {
        timestamp: "Dün 23:14",
        ip: "185.220.101.5",
        location: "Berlin, Almanya (VPN / Tor Node)",
        actionTaken: "AI TARAFINDAN OTOMATİK ENGELLENDİ",
        reason: "İmkansız Seyahat (10 dk önce İstanbul'dan aktif oturum var)",
      },
    ],
    aiSecurityRecommendations: [
      "API Anahtarlarınızın süresi 90 günden uzun. Anahtar yenileme (Credential Rotation) önerilir.",
      "Authenticator App (2FA) doğrulaması aktif. Güvenlik yedek kodlarınızı güvenli bir kasaya kaydedin.",
    ],
  });

  const [sessions, setSessions] = useState([
    {
      id: "sess_1",
      deviceName: "MacBook Pro 16'' (macOS Sequoia)",
      deviceIcon: "💻",
      ipAddress: "176.234.12.88",
      location: "İstanbul, Türkiye",
      lastActive: "Şimdi Aktif",
      isCurrent: true,
    },
    {
      id: "sess_2",
      deviceName: "iPhone 15 Pro (WedyPlan Mobile App)",
      deviceIcon: "📱",
      ipAddress: "176.234.12.90",
      location: "Bodrum, Muğla",
      lastActive: "12 dakika önce",
      isCurrent: false,
    },
  ]);

  const [auditLogs] = useState([
    {
      id: "log_1",
      action: "Sözleşme E-İmza Onayı (#cnt_2026_01)",
      performedBy: "Ahmet Yılmaz (Saha Şefi)",
      timestamp: "Bugün 00:10",
      ipAddress: "176.234.12.88",
      severity: "INFO",
    },
    {
      id: "log_2",
      action: "Finansal Rapor Dışa Aktarma (Excel)",
      performedBy: "Yönetici (Admin)",
      timestamp: "Dün 18:45",
      ipAddress: "176.234.12.88",
      severity: "INFO",
    },
  ]);

  const handleRevokeSession = async (sessionId: string) => {
    const res = await revokeVendorSessionAction(vendorId, { sessionId });
    if (res.success) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      alert("✨ " + res.message);
    }
  };

  const handleDataExportMock = async () => {
    const res = await requestVendorDataExportAction(vendorId, {
      includeFinancials: true,
      includeContracts: true,
      includeCustomerLogs: true,
      confirmationText: "VERILERIMI_INDIR",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SecurityHeader
        securityScore={aiData.securityScore}
        twoFactorEnabled={true}
        activeSessionsCount={sessions.length}
        onOpenDataExportModal={handleDataExportMock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISecurityThreatWidget aiData={aiData} />
          <ActiveSessionsAndDevices
            sessions={sessions}
            onRevokeSession={handleRevokeSession}
          />
        </div>

        <div className="lg:col-span-7 font-sans">
          <AuditLogsAndApiKeyManager
            auditLogs={auditLogs}
            apiKeys={[]}
            vendorId={vendorId}
          />
        </div>
      </div>
    </div>
  );
}
