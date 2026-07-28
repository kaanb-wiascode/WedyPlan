"use client";

import React, { useState } from "react";
import FinanceHeader from "./FinanceHeader";
import FinancialKpiBento from "./FinancialKpiBento";
import AIFinanceIntelligenceWidget from "./AIFinanceIntelligenceWidget";
import TransactionsAndInvoicesTable from "./TransactionsAndInvoicesTable";
import { createVendorExpenseAction } from "@/lib/actions/vendor-finance";

export default function VendorFinanceClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    financialHealthScore: 92,
    netProfitMarginPercentage: 38,
    cashFlowPrediction30Days: "+320.000 ₺ Pozitif Nakit Akışı",
    taxProvisionAmount: "42.500 ₺ (Önümüzdeki Ay Ödenecek KDV/Stopaj)",
    savingsRecommendations: [
      {
        title: "Dış Ekipman Kiralama Maliyeti",
        advice: "Geçen aya göre dış ekipman maliyetiniz %18 arttı. Kendi ses/ışık sisteminizi satın almanız 4 ay içinde amorti sağlayacaktır.",
        potentialSaving: "18.500 ₺ / Ay",
      },
    ],
  });

  const [transactions] = useState([
    {
      id: "tx_1",
      title: "Selin & Kaan Düğün Ödemesi (1. Taksit Kapora)",
      amount: 102750,
      type: "INCOME",
      category: "WEDDING_PAYMENT",
      dueDate: "14 Şubat 2026",
      invoiceNumber: "GIB-2026-00381",
      status: "TAHSİL EDİLDİ",
    },
    {
      id: "tx_2",
      title: "Bodrum Lüks Sahne Ses/Işık Kiralama",
      amount: 35000,
      type: "EXPENSE",
      category: "VENDOR_COST",
      dueDate: "18 Şubat 2026",
      invoiceNumber: "GIB-2026-00412",
      status: "ÖDENDİ",
    },
    {
      id: "tx_3",
      title: "Şubat Ayı Personel & Garson Ekip Maaşları",
      amount: 45000,
      type: "EXPENSE",
      category: "EMPLOYEE_COST",
      dueDate: "28 Şubat 2026",
      invoiceNumber: "-",
      status: "BEKLEMEDE",
    },
  ]);

  const monthlyRevenue = 380000;
  const monthlyExpenses = 145000;
  const netProfit = monthlyRevenue - monthlyExpenses;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <FinanceHeader
        monthlyRevenue={monthlyRevenue}
        monthlyExpenses={monthlyExpenses}
        netProfit={netProfit}
        onOpenNewTransaction={() => alert("➕ Yeni Finansal İşlem & Fatura Ekle Modalı")}
      />

      <FinancialKpiBento
        pendingCollections={120000}
        commissionAmount={19000}
        recurringExpenses={45000}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5">
          <AIFinanceIntelligenceWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7">
          <TransactionsAndInvoicesTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
