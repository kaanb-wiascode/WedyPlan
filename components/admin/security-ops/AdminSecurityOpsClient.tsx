"use client";

import React, { useState } from "react";
import AdminSecurityOpsHeader from "./AdminSecurityOpsHeader";
import AISecurityOpsWidget from "./AISecurityOpsWidget";
import SecurityThreatsBento from "./SecurityThreatsBento";
import SecurityIncidentsTable from "./SecurityIncidentsTable";

export default function AdminSecurityOpsClient() {
  const [aiReport] = useState({
    platformSecurityScore: 98,
    blockedThreats24h: 142,
    activeCriticalIncidentsCount: 1,
    aiAnalysis: "Son 24 saatte 142 adet otomatik Bot & Credential Stuffing denemesi yapay zeka WAF kalkanı tarafından engellenmiştir. Sistem genelinde Zero-Trust güvenlik protokolleri aktiftir.",
    impossibleTravelAlerts: [
      "Kullanıcı 'adm_991' (İstanbul, TR) hesabına 10 dakika sonra Frankfurt (DE) IP'sinden erişim denendi. Oturum donduruldu.",
    ],
    aiRecommendation: "Admin portalı yetki yükseltme (Role Escalation) eylemleri için 'Hardware Security Key (YubiKey)' zorunluluğu getirilmesi önerilir.",
  });

  const [incidents] = useState([
    { id: "inc_101", title: "Şüpheli Admin Yetki Yükseltme Denemesi", component: "RBAC Module", severity: "CRITICAL_THREAT" },
    { id: "inc_102", title: "Anormal Toplu Finans Veri İndirme Girişimi", component: "Finance Export API", severity: "HIGH" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminSecurityOpsHeader
        securityScore={aiReport.platformSecurityScore}
        blockedThreats24h={aiReport.blockedThreats24h}
        activeIncidentsCount={aiReport.activeCriticalIncidentsCount}
        onOpenEmergencyLock={() => alert("🚨 ACİL DURUM: Tüm Admin ve Tedarikçi Oturumları Donduruluyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISecurityOpsWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <SecurityThreatsBento />
          <SecurityIncidentsTable incidents={incidents} />
        </div>
      </div>
    </div>
  );
}
