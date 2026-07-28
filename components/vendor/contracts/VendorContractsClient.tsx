"use client";

import React, { useState } from "react";
import ContractHeader from "./ContractHeader";
import AIContractIntelligenceWidget from "./AIContractIntelligenceWidget";
import ContractBuilderModal from "./ContractBuilderModal";
import ContractTimelineWidget from "./ContractTimelineWidget";
import ContractLifecycleBoard from "./ContractLifecycleBoard";
import { generateAIContractAnalysisAction } from "@/lib/actions/vendor-contracts";

export default function VendorContractsClient({ vendorId }: { vendorId: string }) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const [contracts] = useState([
    {
      id: "cnt_1",
      coupleName: "Selin & Kaan Yılmaz",
      title: "Bodrum Sunset Venue - Düğün Hizmet Sözleşmesi",
      totalAmount: 342500,
      depositAmount: 102750,
      status: "ACTIVE",
      complianceScore: 96,
      weddingDate: "19 Haziran 2027",
    },
    {
      id: "cnt_2",
      coupleName: "Ece & Mert Demir",
      title: "Çeşme Açık Hava Kır Düğünü Sözleşmesi",
      totalAmount: 250000,
      depositAmount: 75000,
      status: "WAITING_CUSTOMER_APPROVAL",
      complianceScore: 92,
      weddingDate: "12 Eylül 2027",
    },
  ]);

  const handleSelectContract = async (contract: any) => {
    setSelectedContract(contract);
    const res = await generateAIContractAnalysisAction(contract.title, "Düğün Mekanı");
    if (res.success) {
      setAiAnalysis(res);
    }
  };

  const activeContractsCount = contracts.filter((c) => c.status === "ACTIVE").length;
  const pendingApprovalCount = contracts.filter((c) => c.status === "WAITING_CUSTOMER_APPROVAL").length;
  const totalContractValue = contracts.reduce((sum, c) => sum + c.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ContractHeader
        activeContractsCount={activeContractsCount}
        pendingApprovalCount={pendingApprovalCount}
        totalContractValue={totalContractValue}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIContractIntelligenceWidget aiAnalysis={aiAnalysis} />
          <ContractTimelineWidget contract={selectedContract} />
        </div>

        <div className="lg:col-span-8">
          <ContractLifecycleBoard
            contracts={contracts}
            onSelectContract={handleSelectContract}
          />
        </div>
      </div>

      <ContractBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        vendorId={vendorId}
      />
    </div>
  );
}
