"use client";

import React, { useState } from "react";
import ProposalHeader from "./ProposalHeader";
import AIProposalInsightsCard from "./AIProposalInsightsCard";
import ProposalSideBySideTable from "./ProposalSideBySideTable";
import ProposalCard from "./ProposalCard";
import { acceptOfferAction } from "@/lib/actions/proposal-comparison";

export default function ProposalComparisonClient({ userId }: { userId: string }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(["p1", "p2"]);

  const [proposals] = useState([
    {
      id: "p1",
      vendorName: "Bodrum Sunset Venue",
      category: "Düğün Mekanı",
      rating: 4.9,
      reviewCount: 48,
      price: 320000,
      currency: "₺",
      bestValueScore: 96,
      expirationDate: "15 Nisan 2027",
      paymentTerms: "%30 Kapora, Kalan Düğün Günü",
      cancellationPolicy: "Düğüne 60 gün kala %100 kesintisiz iade.",
      includedServices: [
        "350 Kişilik Yemekli Menü & Meze",
        "Açık Hava Sahil Kullanımı",
        "Gelin Odası & İkramlar",
        "Işık & Ses Sistemi",
      ],
      excludedServices: [
        "Gece 24:00 sonrası saat başı 6.000 ₺ mesai",
        "Alkol Servisi (Ekstra)",
      ],
    },
    {
      id: "p2",
      vendorName: "Ege Bay Resort & Spa",
      category: "Düğün Mekanı",
      rating: 4.7,
      reviewCount: 31,
      price: 290000,
      currency: "₺",
      bestValueScore: 91,
      expirationDate: "20 Nisan 2027",
      paymentTerms: "%50 Kapora, Kalan 2 Taksit",
      cancellationPolicy: "Düğüne 30 gün kala %50 iade.",
      includedServices: [
        "350 Kişilik Set Menü",
        "Balayı Odası Konaklama (1 Gece)",
        "Hoş geldin Kokteyli",
      ],
      excludedServices: [
        "KDV %20 fiyata dahil değildir",
        "Fotoğraf & Çekim İzni Ücreti",
      ],
    },
  ]);

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) {
        alert("En az 1 teklif seçili olmalıdır.");
        return;
      }
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("En fazla 3 teklif yan yana karşılaştırılabilir.");
        return;
      }
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleAcceptProposal = async (id: string) => {
    const res = await acceptOfferAction(id);
    if (res.success) {
      alert(res.message);
    }
  };

  const comparedProposals = proposals.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ProposalHeader
        activeOffersCount={proposals.length}
        comparedOffersCount={comparedProposals.length}
        savingsPotential="35.000 ₺"
        onExportPdf={() => alert("📄 Karşılaştırma Raporu PDF olarak indiriliyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIProposalInsightsCard
            bestValueVendor="Bodrum Sunset Venue"
            hiddenCosts={[
              "Bodrum Sunset Venue: Gece 24:00 sonrası saat başı 6.000 ₺ mesai maddesi mevcut.",
              "Ege Bay Resort: Fiyata %20 KDV dahil değildir (Gerçek Maliyet: 348.000 ₺).",
            ]}
            negotiationTips={[
              "Ege Bay Resort teklifini göstererek Bodrum Sunset'ten alkol servisini ücretsiz ekletmeyi teklif edebilirsiniz.",
            ]}
          />

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Teklif Listesi</span>
            {proposals.map((p) => (
              <ProposalCard
                key={p.id}
                proposal={p}
                isSelected={selectedIds.includes(p.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <ProposalSideBySideTable
            proposals={comparedProposals}
            onAccept={handleAcceptProposal}
          />
        </div>
      </div>
    </div>
  );
}
