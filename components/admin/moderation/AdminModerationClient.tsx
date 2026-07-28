"use client";

import React, { useState } from "react";
import AdminModerationHeader from "./AdminModerationHeader";
import AIModerationShieldWidget from "./AIModerationShieldWidget";
import ModerationQueueTable from "./ModerationQueueTable";
import ModerationDetailDrawer from "./ModerationDetailDrawer";
import { resolveModerationReportAction } from "@/lib/actions/admin-moderation";

export default function AdminModerationClient() {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    platformCleanlinessScore: 99,
    flaggedContentCount: 3,
    aiDetections: [
      {
        id: "mod_scan_1",
        type: "OFF_PLATFORM_PAYMENT_BYPASS",
        target: "Tedarikçi Mesajı (#vnd_103)",
        confidence: "%96 Yüksek Şüphe",
        details: "Mesaj içeriğinde gizlenmiş IBAN ve 'Havale yapalım komisyon ödemeyin' cümlesi tespit edildi.",
      },
      {
        id: "mod_scan_2",
        type: "COPYRIGHT_INFRINGEMENT",
        target: "Görsel Portföyü (#img_881)",
        confidence: "%91 Telif Eşleşmesi",
        details: "Yüklenen kapak fotoğrafı Getty Images stok kütüphanesi filigranı ile eşleşti.",
      },
    ],
    aiRecommendation: "Şüpheli IBAN paylaşan tedarikçiye otonom uyarı bildirimi gönderilmesi önerilir.",
  });

  const [reports, setReports] = useState([
    {
      id: "rep_101",
      violationCategory: "OFF_PLATFORM_PAYMENT_BYPASS",
      targetContentTitle: "Tedarikçi Mesajı (Komisyon Kaçak Şüphesi)",
      reportedBy: "AI Automated Scanner",
      aiUnsafeScore: 96,
      status: "PENDING_REVIEW",
      contentSnippet: "Kaparoyu siteden yatırın ancak kalan 200 bin TL'yi TR92 0006... IBAN hesabımıza atın.",
    },
    {
      id: "rep_102",
      violationCategory: "COPYRIGHT_INFRINGEMENT",
      targetContentTitle: "Bodrum Sahil Düğünü Fotoğrafı",
      reportedBy: "Mazeret Ajansı (Telif İhbarı)",
      aiUnsafeScore: 91,
      status: "PENDING_REVIEW",
      contentSnippet: "Görsel üzerinde stok ajansı filigranı bulunmaktadır.",
    },
  ]);

  const handleQuickResolve = async (reportId: string, decision: any) => {
    const res = await resolveModerationReportAction({
      reportId,
      decision,
      reasonNotes: "Hızlı onay butonuyla temiz olarak karara bağlandı.",
      applyBan: false,
    });

    if (res.success) {
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: "APPROVED_CLEAN" } : r))
      );
      alert("✨ " + res.message);
    }
  };

  const pendingCount = reports.filter((r) => r.status === "PENDING_REVIEW").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminModerationHeader
        pendingQueueCount={pendingCount}
        cleanlinessScore={aiReport.platformCleanlinessScore}
        todayResolvedCount={14}
        onOpenShieldSettings={() => alert("🛡️ AI Kalkan Ayarları Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIModerationShieldWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <ModerationQueueTable
            reports={reports}
            onSelectReport={(r) => {
              setSelectedReport(r);
              setIsDrawerOpen(true);
            }}
            onQuickResolve={handleQuickResolve}
          />
        </div>
      </div>

      <ModerationDetailDrawer
        report={selectedReport}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
