"use client";

import React, { useState } from "react";
import AdminFinanceHeader from "./AdminFinanceHeader";
import AIFinancialHealthWidget from "./AIFinancialHealthWidget";
import FinancialOverviewBento from "./FinancialOverviewBento";
import VendorPayoutsTable from "./VendorPayoutsTable";
import { processVendorPayoutReleaseAction } from "@/lib/actions/admin-finance";

export default function AdminFinanceClient() {
  const [aiReport] = useState({
    financialHealthScore: 98,
    forecast90DaysRevenue: "48.500.000 ₺ (Konsolide Düğün Hacmi)",
    predictedPlatformCommissions: "3.400.000 ₺ (Tahmini Net Komisyon Geliri)",
    escrowSafetyStatus: "Kusursuz (Tüm bakiyeler 256-bit banka güvencesinde)",
    chargebackRiskCount: 1,
    aiAnalysis: "Önümüzdeki 30 günde tamamlanacak 142 düğün için toplam 18.200.000 ₺ Escrow hakediş salımı gerçekleşecektir. Likidite ve KDV karşılıkları tamdır.",
    recommendation: "Yüksek ciro yapan 5 ana tedarikçinin hakediş vadeleri erken ödeme indirimi karşılığında 1 güne düşürülebilir.",
  });

  const [financials] = useState({
    grossVolume: "148.500.000 ₺",
    netCommissions: "10.240.000 ₺",
    escrowHoldingBalance: "24.800.000 ₺",
    releasedPayouts: "113.460.000 ₺",
    pendingEscrow: "24.800.000 ₺",
    taxReserves: "2.048.000 ₺",
    chargebacksCount: 1,
    chargebacksAmount: "120.000 ₺",
  });

  const [payouts, setPayouts] = useState([
    {
      id: "pay_101",
      vendorId: "vnd_101",
      vendorName: "Bodrum Sunset Venue & Luxury Events",
      maskedIban: "TR92 **** **** **** 4812",
      weddingEvent: "Selin & Kaan Yılmaz Düğünü",
      weddingDate: "12 Temmuz 2026 (Tamamlandı)",
      grossAmount: 340000,
      commissionPercentage: 5,
      netAmount: 323000,
      status: "PENDING_ESCROW",
    },
    {
      id: "pay_102",
      vendorId: "vnd_102",
      vendorName: "Ege Panorama Fotoğraf & Sinema",
      maskedIban: "TR34 **** **** **** 1092",
      weddingEvent: "Zeynep & Can Kaya Çekimi",
      weddingDate: "04 Mayıs 2026 (Tamamlandı)",
      grossAmount: 120000,
      commissionPercentage: 8,
      netAmount: 110400,
      status: "RELEASED",
    },
  ]);

  const handleProcessPayout = async (payoutId: string, vendorId: string, amount: number, action: any) => {
    const res = await processVendorPayoutReleaseAction({
      payoutId,
      vendorId,
      amount,
      action,
    });

    if (res.success) {
      setPayouts((prev) =>
        prev.map((p) => (p.id === payoutId ? { ...p, status: "RELEASED" } : p))
      );
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminFinanceHeader
        grossVolume={financials.grossVolume}
        netCommissions={financials.netCommissions}
        escrowHoldingBalance={financials.escrowHoldingBalance}
        onTriggerBatchPayout={() => alert("⚡ Onaylı Escrow Hakedişleri Toplu Aktarılıyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIFinancialHealthWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <FinancialOverviewBento financials={financials} />
          <VendorPayoutsTable
            payouts={payouts}
            onProcessPayout={handleProcessPayout}
          />
        </div>
      </div>
    </div>
  );
}
