"use client";

import React, { useState } from "react";
import ContractHeader from "./ContractHeader";
import AIContractRiskWidget from "./AIContractRiskWidget";
import ContractTableList from "./ContractTableList";
import ContractDocumentViewerModal from "./ContractDocumentViewerModal";

export default function ContractCenterClient({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [contracts] = useState([
    {
      id: "c_1",
      title: "Bodrum Sunset Venue Düğün Mekanı Sözleşmesi",
      vendorName: "Bodrum Sunset Venue",
      category: "Düğün Mekanı",
      amount: 320000,
      currency: "₺",
      status: "PENDING",
      expiryDate: "15 Nisan 2027",
      riskScore: 12,
    },
    {
      id: "c_2",
      title: "Studio Aegean Fotoğraf & Çekim Sözleşmesi",
      vendorName: "Studio Aegean",
      category: "Fotoğraf & Video",
      amount: 85000,
      currency: "₺",
      status: "SIGNED",
      signedDate: "10 Şubat 2027",
      riskScore: 5,
    },
  ]);

  const handleViewContract = (contract: any) => {
    setSelectedContract(contract);
    setIsViewerOpen(true);
  };

  const filteredContracts = contracts.filter((c) => {
    if (activeTab === "ALL") return true;
    return c.status === activeTab;
  });

  const signedCount = contracts.filter((c) => c.status === "SIGNED").length;
  const pendingCount = contracts.filter((c) => c.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ContractHeader
        signedCount={signedCount}
        pendingCount={pendingCount}
        riskAlertsCount={1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIContractRiskWidget
            summary="İmza bekleyen Bodrum Sunset Venue sözleşmesi 350 kişilik açık hava organizasyonunu ve 320.000 ₺ bedeli kapsamaktadır."
            risks={[
              "Aşırı Kötü Hava Şartları durumunda kapalı salona geçiş için en geç 12 saat önce yazılı bildirim şartı var.",
            ]}
            missingClauses={[
              "Elektrik kesintisi durumunda jeneratör yakıt maaliyeti maddesi netleştirilmelidir.",
            ]}
            dates={[
              { date: "15 Nisan 2027", title: "İkinci Taksit Ödemesi (100.000 ₺)" },
              { date: "19 Mayıs 2027", title: "Kesintisiz İptal Bildirimi Son Günü" },
            ]}
          />
        </div>

        <div className="lg:col-span-8">
          <ContractTableList
            contracts={filteredContracts}
            onViewContract={handleViewContract}
          />
        </div>
      </div>

      <ContractDocumentViewerModal
        userId={userId}
        contract={selectedContract}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
