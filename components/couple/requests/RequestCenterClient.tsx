"use client";

import React, { useState } from "react";
import RequestHeader from "./RequestHeader";
import AIQualityScoreWidget from "./AIQualityScoreWidget";
import RequestTrackingTable from "./RequestTrackingTable";
import RequestWizardModal from "./RequestWizardModal";

export default function RequestCenterClient({ userId }: { userId: string }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const [requests] = useState([
    {
      id: "req_1",
      title: "Bodrum Sunset Düğün Daveti",
      category: "Düğün Mekanı",
      location: "Bodrum",
      weddingDate: "19 Haziran 2027",
      budgetRange: "200.000 ₺ - 350.000 ₺",
      vendorCount: 3,
      qualityScore: 94,
      statusText: "2 Teklif Alındı",
    },
    {
      id: "req_2",
      title: "Cinematic Düğün Çekimi",
      category: "Fotoğraf & Video",
      location: "Bodrum",
      weddingDate: "19 Haziran 2027",
      budgetRange: "70.000 ₺ - 100.000 ₺",
      vendorCount: 2,
      qualityScore: 91,
      statusText: "Yanıt Bekliyor",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <RequestHeader
        activeRequestsCount={requests.length}
        offersReceivedCount={2}
        avgResponseRate={88}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIQualityScoreWidget
            qualityScore={94}
            responseRate={88}
            suggestions={[
              "Menü detaylarını netleştirmeniz tedarikçi dönüş süresini %20 hızlandıracaktır.",
              "Bodrum bölgesi için haziran ayında fotoğrafçılara 3 hafta önceden ulaşmanız önerilir.",
            ]}
          />
        </div>

        <div className="lg:col-span-8">
          <RequestTrackingTable requests={requests} />
        </div>
      </div>

      <RequestWizardModal
        userId={userId}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  );
}
