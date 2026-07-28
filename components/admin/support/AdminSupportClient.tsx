"use client";

import React, { useState } from "react";
import SupportOperationsHeader from "./SupportOperationsHeader";
import AISupportCopilotWidget from "./AISupportCopilotWidget";
import TicketManagementTable from "./TicketManagementTable";
import TicketDetailDrawer from "./TicketDetailDrawer";
import { updateAdminTicketStatusAction } from "@/lib/actions/admin-support";

export default function AdminSupportClient() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiInsight] = useState({
    sentimentScore: "%86 Negatif (Gergin Müşteri)",
    escalationRisk: "YÜKSEK (SLA İhlaline 14 Dk Kaldı)",
    summary: "Çift, düğün mekanının ses sistemi kapasitesinden memnun kalmadığını belirtiyor. Sözleşmedeki 4. maddeye göre ek amfi talebi var.",
    suggestedReply: "Sayın Selin Hanım, ilettiğiniz durum hızla saha operasyon yöneticimize aktarılmıştır. Bodrum Sunset Venue yetkilisi ile görüşülerek ücretsiz ilave amfi kurulumu 30 dakika içinde sağlanacaktır.",
    duplicateTicketRisk: "Tespit edilmedi (Tekil Talep)",
  });

  const [tickets, setTickets] = useState([
    {
      id: "tkt_101",
      subject: "Düğün Günü Ses Sistemi Amfi Kapasite Sorunu",
      requesterName: "Selin & Kaan Yılmaz",
      requesterType: "COUPLE",
      category: "D_DAY_EMERGENCY",
      priority: "URGENT_D_DAY",
      slaRemaining: "14 Dakika",
      status: "OPEN",
      initialMessage: "Düğün günümüze 2 gün kala mekan yetkilisi ek ücret talep etti. Yardımınız rica olunur.",
    },
    {
      id: "tkt_102",
      subject: "Escrow Kapora Hakediş Aktarım Zamanlaması",
      requesterName: "Bodrum Sunset Venue",
      requesterType: "VENDOR",
      category: "ESCROW_DISPUTE",
      priority: "HIGH",
      slaRemaining: "2 Saat 10 Dk",
      status: "OPEN",
      initialMessage: "Düğün başarıyla tamamlandı, Escrow hakediş tutarının IBAN hesabımıza aktarılmasını rica ederiz.",
    },
  ]);

  const handleQuickResolve = async (ticketId: string) => {
    const res = await updateAdminTicketStatusAction({
      ticketId,
      status: "RESOLVED",
    });

    if (res.success) {
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: "RESOLVED" } : t))
      );
      alert("✨ " + res.message);
    }
  };

  const openTicketsCount = tickets.filter((t) => t.status === "OPEN").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SupportOperationsHeader
        openTicketsCount={openTicketsCount}
        escalatedCount={1}
        slaComplianceRate={98.8}
        onOpenKnowledgeBase={() => alert("📚 Bilgi Bankası Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISupportCopilotWidget aiInsight={aiInsight} />
        </div>

        <div className="lg:col-span-7">
          <TicketManagementTable
            tickets={tickets}
            onSelectTicket={(t) => {
              setSelectedTicket(t);
              setIsDrawerOpen(true);
            }}
            onQuickResolve={handleQuickResolve}
          />
        </div>
      </div>

      <TicketDetailDrawer
        ticket={selectedTicket}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
