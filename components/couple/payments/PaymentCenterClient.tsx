"use client";

import React, { useState } from "react";
import PaymentHeader from "./PaymentHeader";
import AIPaymentHealthWidget from "./AIPaymentHealthWidget";
import PaymentTimelineWidget from "./PaymentTimelineWidget";
import PaymentTableList from "./PaymentTableList";
import { recordPaymentAction } from "@/lib/actions/payment";

export default function PaymentCenterClient({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("ALL");

  const [payments, setPayments] = useState([
    {
      id: "pay_1",
      title: "Bodrum Sunset Venue 1. Kapora Ödemesi",
      vendorName: "Bodrum Sunset Venue",
      category: "Düğün Mekanı",
      amount: 100000,
      currency: "₺",
      dueDate: "10 Şubat 2027",
      status: "PAID",
      isInstallment: true,
      installmentNumber: 1,
      totalInstallments: 3,
    },
    {
      id: "pay_2",
      title: "Studio Aegean Fotoğraf Çekim 2. Taksit",
      vendorName: "Studio Aegean",
      category: "Fotoğraf & Video",
      amount: 35000,
      currency: "₺",
      dueDate: "15 Nisan 2027",
      status: "UPCOMING",
      isInstallment: true,
      installmentNumber: 2,
      totalInstallments: 2,
    },
    {
      id: "pay_3",
      title: "Bodrum Sunset Venue 2. Taksit Ödemesi",
      vendorName: "Bodrum Sunset Venue",
      category: "Düğün Mekanı",
      amount: 60000,
      currency: "₺",
      dueDate: "01 Mayıs 2027",
      status: "UPCOMING",
      isInstallment: true,
      installmentNumber: 2,
      totalInstallments: 3,
    },
  ]);

  const handlePayNow = async (payment: any) => {
    const res = await recordPaymentAction(userId, {
      paymentId: payment.id,
      paidAmount: payment.amount,
      paymentMethod: "BANK_TRANSFER",
      transactionId: "TXN_" + Date.now(),
    });

    if (res.success) {
      setPayments((prev) =>
        prev.map((p) => (p.id === payment.id ? { ...p, status: "PAID" } : p))
      );
      alert("✨ Ödeme başarıyla kaydedildi!");
    }
  };

  const filteredPayments = payments.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.status === activeTab;
  });

  const totalPaid = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  const upcomingDue = payments
    .filter((p) => p.status === "UPCOMING")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PaymentHeader
        totalPaid={totalPaid}
        upcomingDue={upcomingDue}
        refundsTotal={0}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRecordModal={() => alert("➕ Yeni Ödeme Kayıt Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIPaymentHealthWidget
            healthScore={91}
            forecastMessage="Önümüzdeki 30 gün içinde 2 taksit ödemeniz bulunmaktadır (95.000 ₺). Mevcut nakit akışınız ve bütçe sınırlarınız bu ödemeleri rahatlıkla karşılamaktadır."
            lateAlerts={[
              "Studio Aegean 2. Taksit ödemesi için son 5 gün! Zamanında ödeme teslim garantisini korur.",
            ]}
            savingsTips={[
              "Bodrum Sunset Venue peşin kapatma seçeneğinde %5 KDV indirimi teklif ediyor (Tasarruf: 16.000 ₺).",
            ]}
          />

          <PaymentTimelineWidget installments={payments} />
        </div>

        <div className="lg:col-span-8">
          <PaymentTableList
            payments={filteredPayments}
            onPayNow={handlePayNow}
          />
        </div>
      </div>
    </div>
  );
}
