"use client";

import React, { useState } from "react";
import SupportHeader from "./SupportHeader";
import AISupportAssistantWidget from "./AISupportAssistantWidget";
import KnowledgeBaseWidget from "./KnowledgeBaseWidget";
import TicketListTable from "./TicketListTable";
import NewTicketModal from "./NewTicketModal";

export default function VendorSupportClient({ vendorId }: { vendorId: string }) {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [aiSolution] = useState({
    suggestedSolution: "İncelediğimiz kadarıyla durumunuz ödeme altyapısı güncellemesiyle ilgili olabilir. 'Abonelik & Fatura Merkezi' sekmesinden kayıtlı kartınızı doğrulamanız sorunu anında çözecektir.",
    relatedKbArticles: [
      { id: "kb_1", title: "Fatura ve Kredi Kartı Güncelleme Rehberi", readTime: "2 dk" },
      { id: "kb_2", title: "AI Mesaj Kredileri Nasıl Tanımlanır?", readTime: "1 dk" },
    ],
  });

  const [tickets] = useState([
    {
      id: "tkt_8812",
      subject: "Fatura Kesiminde KDV Oranı Uyumsuzluğu",
      category: "BILLING",
      priority: "HIGH",
      status: "IN_PROGRESS",
      date: "28 Temmuz 2026",
    },
    {
      id: "tkt_7419",
      subject: "Portföy Fotoğraflarında Filigran Boyutu Düzenleme",
      category: "TECHNICAL",
      priority: "LOW",
      status: "RESOLVED",
      date: "14 Temmuz 2026",
    },
  ]);

  const openTicketsCount = tickets.filter((t) => t.status !== "RESOLVED").length;
  const resolvedTicketsCount = tickets.filter((t) => t.status === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SupportHeader
        openTicketsCount={openTicketsCount}
        resolvedTicketsCount={resolvedTicketsCount}
        systemStatus="Tüm Servisler Online"
        onOpenNewTicketModal={() => setIsNewModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISupportAssistantWidget aiSolution={aiSolution} />
          <KnowledgeBaseWidget />
        </div>

        <div className="lg:col-span-7">
          <TicketListTable tickets={tickets} />
        </div>
      </div>

      <NewTicketModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        vendorId={vendorId}
      />
    </div>
  );
}
