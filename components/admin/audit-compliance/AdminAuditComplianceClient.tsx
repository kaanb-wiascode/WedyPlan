"use client";

import React, { useState } from "react";
import AuditComplianceHeader from "./AuditComplianceHeader";
import AIAuditComplianceWidget from "./AIAuditComplianceWidget";
import AuditLogsTable from "./AuditLogsTable";
import KvkkGdprRequestsDrawer from "./KvkkGdprRequestsDrawer";

export default function AdminAuditComplianceClient() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    complianceHealthScore: 99,
    pendingDataRequestsCount: 2,
    expiredRecordsForRetention: 1240,
    aiAnalysis: "Platform genelinde KVKK 6698 ve GDPR Aydınlatma Metinleri %100 günceldir. Tüm açık rıza onayları IP ve zaman damgasıyla kriptografik kasada saklanmaktadır.",
    privacyRiskAlerts: [
      "Son 24 saatte 'Finance Export' modülünden yapılan veri indirmeleri normal sınırlar içerisindedir. Şüpheli sızıntı riski %0.",
    ],
    recommendation: "Düğün tarihi 2024 öncesine ait olan 1.240 pasif kullanıcı kaydının otonom anonimleştirme motoruna (Retention Bot) devredilmesi önerilir.",
  });

  const [logs] = useState([
    {
      id: "log_101",
      actionType: "FINANCE_PAYOUT_RELEASED",
      actorName: "Ahmet Yılmaz",
      actorRole: "Finance Operations Manager",
      timestamp: "Bugün 01:45:12",
      ipAddress: "176.234.12.88",
      hashChain: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
    {
      id: "log_102",
      actionType: "CONTRACT_E_SIGNED",
      actorName: "Selin & Kaan Yılmaz",
      actorRole: "Couple",
      timestamp: "Bugün 00:12:04",
      ipAddress: "185.220.101.5",
      hashChain: "8f4e222a0339d2c2084f3e69192c730e2f3d2f2d9c3451b68f5c35b6a3b2a8d1",
    },
  ]);

  const [dataRequests] = useState([
    {
      id: "req_101",
      userName: "Zeynep Kaya",
      userEmail: "zeynep.kaya@wedyplan.demo",
      requestType: "DATA_EXPORT_GDPR",
      slaDaysLeft: 12,
    },
    {
      id: "req_102",
      userName: "Mert Demir",
      userEmail: "mert.demir@wedyplan.demo",
      requestType: "RIGHT_TO_BE_FORGOTTEN_KVKK",
      slaDaysLeft: 18,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AuditComplianceHeader
        complianceHealthScore={aiReport.complianceHealthScore}
        pendingDataRequestsCount={aiReport.pendingDataRequestsCount}
        expiredRetentionCount={aiReport.expiredRecordsForRetention}
        onOpenRequestsDrawer={() => setIsDrawerOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIAuditComplianceWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 font-sans">
          <AuditLogsTable logs={logs} />
        </div>
      </div>

      <KvkkGdprRequestsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        dataRequests={dataRequests}
      />
    </div>
  );
}
