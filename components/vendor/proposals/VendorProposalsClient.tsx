"use client";

import React, { useState } from "react";
import VendorProposalsHeader from "./VendorProposalsHeader";
import AIProposalInsightsWidget from "./AIProposalInsightsWidget";
import ProposalBuilderModal from "./ProposalBuilderModal";
import ProposalListTable from "./ProposalListTable";

export default function VendorProposalsClient({ vendorId }: { vendorId: string }) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const [aiData] = useState({
    qualityScore: 94,
    winProbability: 86,
    pricingRecommendation: "Belirlediğiniz 342.500 ₺ tutarındaki ortalama teklif tutarı, Ege bölgesi lüks segment ortalamasına oldukça uygundur.",
    suggestedUpsells: [
      { title: "Gece Sonu Drone Çekimi", estimatedPrice: 15000, conversionImpact: "+%12 Onay İhtimali" },
      { title: "Kişiselleştirilmiş Misafir Karşılama Panosu", estimatedPrice: 8500, conversionImpact: "+%8 Müşteri Memnuniyeti" },
    ],
  });

  const [proposals] = useState([
    {
      id: "prp_1",
      coupleName: "Selin & Kaan Yılmaz",
      title: "Bodrum Sunset Venue - Ultra Lüks Paket",
      totalPrice: 342500,
      expirationDate: "15 Mayıs 2027",
      status: "SENT",
      version: "v1.2",
    },
    {
      id: "prp_2",
      coupleName: "Zeynep & Can Kaya",
      title: "Full Balo Salonu & Catering Paketi",
      totalPrice: 410000,
      expirationDate: "02 Nisan 2027",
      status: "ACCEPTED",
      version: "v1.0",
    },
  ]);

  const activeProposalsCount = proposals.filter((p) => p.status === "SENT").length;
  const acceptedValue = proposals.reduce((sum, p) => sum + p.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorProposalsHeader
        activeProposalsCount={activeProposalsCount}
        acceptedValue={acceptedValue}
        conversionRate={34}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4">
          <AIProposalInsightsWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-8">
          <ProposalListTable proposals={proposals} />
        </div>
      </div>

      <ProposalBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        vendorId={vendorId}
      />
    </div>
  );
}
