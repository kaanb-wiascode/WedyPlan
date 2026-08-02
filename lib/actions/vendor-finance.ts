"use server";

import { revalidatePath } from "next/cache";
import { Transaction } from "@/lib/validations/vendor-finance";

// 1. Finansal Özet ve İşlemleri Getir
export async function getVendorFinanceData(vendorId?: string) {
  const transactions: Transaction[] = [
    {
      id: "tx_101",
      coupleName: "Zeynep & Can",
      title: "1. Taksit Ödemesi (Karina Balo Salonu)",
      type: "INSTALLMENT",
      status: "PENDING",
      amount: 4500,
      currency: "EUR",
      dueDate: "2026-08-10",
      aiRiskScore: 12,
      aiNotes: "Daha önceki kapora ödemesini gününde yaptılar. Risk düşük."
    },
    {
      id: "tx_102",
      coupleName: "Selin & Mert",
      title: "Kapora Ödemesi (Teras Konsepti)",
      type: "DEPOSIT",
      status: "OVERDUE",
      amount: 3000,
      currency: "EUR",
      dueDate: "2026-07-28",
      aiRiskScore: 84,
      aiNotes: "Ödeme tarihi 5 gün geçti. Otomatik WhatsApp hatırlatması önerilir."
    },
    {
      id: "tx_103",
      coupleName: "Elif & Burak",
      title: "Kapanış Bakiyesi (Havuzbaşı)",
      type: "FINAL_PAYMENT",
      status: "PAID",
      amount: 9500,
      currency: "EUR",
      dueDate: "2026-08-01",
      paidDate: "2026-08-01",
      aiRiskScore: 0,
      aiNotes: "Ödeme zamanında başarıyla tahsil edildi."
    }
  ];

  const summary = {
    totalRevenue: 185000,
    collectedRevenue: 112000,
    pendingRevenue: 73000,
    overdueAmount: 3000,
    currency: "EUR"
  };

  return { success: true, summary, transactions };
}

// 2. Tahsilat Kaydet Action
export async function recordPaymentAction(transactionId: string) {
  revalidatePath("/vendor/finance");
  return { 
    success: true, 
    message: "Tahsilat başarıyla kaydedildi ve nakit akışına işlendi." 
  };
}

// 3. AI Ödeme Hatırlatması Gönder Action
export async function sendPaymentReminderAction(transactionId: string, coupleName: string) {
  revalidatePath("/vendor/finance");
  return { 
    success: true, 
    message: `${coupleName} çiftine WhatsApp ödeme hatırlatma bağlantısı ve SMS gönderildi.` 
  };
}