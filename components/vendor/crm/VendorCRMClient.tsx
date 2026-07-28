"use client";

import React, { useState } from "react";
import CRMHeader from "./CRMHeader";
import AICRMInsightsWidget from "./AICRMInsightsWidget";
import CustomerProfileModal from "./CustomerProfileModal";
import CustomerListTable from "./CustomerListTable";
import { generateAICRMSummaryAction } from "@/lib/actions/vendor-crm";

export default function VendorCRMClient({ vendorId }: { vendorId: string }) {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [aiSummaryData, setAiSummaryData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("ALL");

  const [customers] = useState([
    {
      id: "cust_1",
      coupleName: "Selin & Kaan Yılmaz",
      weddingDate: "19 Haziran 2027",
      budget: 342500,
      location: "Bodrum, Muğla",
      phone: "+90 532 000 1122",
      email: "selin@wedyplan.demo",
      segment: "ACTIVE_COUPLE",
      healthScore: 95,
      tags: ["#BodrumDüğünü", "#SetMenü"],
    },
    {
      id: "cust_2",
      coupleName: "Zeynep & Can Kaya",
      weddingDate: "04 Mayıs 2027",
      budget: 410000,
      location: "İstanbul",
      phone: "+90 535 000 3344",
      email: "zeynep@wedyplan.demo",
      segment: "VIP",
      healthScore: 98,
      tags: ["#VIPProtokol", "#BaloSalonu"],
    },
    {
      id: "cust_3",
      coupleName: "Ece & Mert Demir",
      weddingDate: "12 Eylül 2027",
      budget: 250000,
      location: "Çeşme, İzmir",
      phone: "+90 533 000 2233",
      email: "ece@wedyplan.demo",
      segment: "PROSPECT",
      healthScore: 82,
      tags: ["#AdayMüşteri"],
    },
  ]);

  const handleSelectCustomer = async (customer: any) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    const res = await generateAICRMSummaryAction(customer.id, customer.coupleName);
    if (res.success) {
      setAiSummaryData(res);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    if (activeSegment === "ALL") return true;
    return c.segment === activeSegment;
  });

  const vipCount = customers.filter((c) => c.segment === "VIP").length;
  const activeCouplesCount = customers.filter((c) => c.segment === "ACTIVE_COUPLE").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.budget, 0);

  const segments = [
    { id: "ALL", label: "Tüm Müşteriler" },
    { id: "ACTIVE_COUPLE", label: "💍 Aktif Düğün Çiftleri" },
    { id: "VIP", label: "⭐ VIP Portföy" },
    { id: "PROSPECT", label: "🎯 Aday Müşteriler" },
    { id: "PAST_CUSTOMER", label: "✓ Geçmiş Müşteriler" },
    { id: "BLACK_LIST", label: "⚠️ Kara Liste" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CRMHeader
        totalCustomers={customers.length}
        vipCount={vipCount}
        activeCouplesCount={activeCouplesCount}
        totalRevenue={totalRevenue}
      />

      {/* Segment Filtreleme Barı */}
      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto max-w-[1600px] mx-auto">
        {segments.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSegment(s.id)}
            className={"px-4 py-2 rounded-2xl text-xs font-semibold transition whitespace-nowrap " +
              (activeSegment === s.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4">
          <AICRMInsightsWidget
            selectedCustomer={selectedCustomer}
            aiSummaryData={aiSummaryData}
          />
        </div>

        <div className="lg:col-span-8">
          <CustomerListTable
            customers={filteredCustomers}
            onSelectCustomer={handleSelectCustomer}
          />
        </div>
      </div>

      <CustomerProfileModal
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
