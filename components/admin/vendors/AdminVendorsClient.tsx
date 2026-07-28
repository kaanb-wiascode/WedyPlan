"use client";

import React, { useState } from "react";
import AdminVendorHeader from "./AdminVendorHeader";
import AIVendorRiskWidget from "./AIVendorRiskWidget";
import VendorManagementTable from "./VendorManagementTable";
import VendorProfileDrawer from "./VendorProfileDrawer";
import { approveVendorStatusAction, suspendOrBlacklistVendorAction } from "@/lib/actions/admin-vendors";

export default function AdminVendorsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    qualityScore: 96,
    riskScore: 4,
    fraudFlagsCount: 0,
    aiAnalysis: "Tedarikçi belgeleri güncel, VKN doğrulaması eşleşti. Son 60 mesajlaşmada platform dışı ödeme yönlendirmesi tespit edilmedi. Müşteri CSAT puanı 4.9/5.0 seviyesinde.",
    recommendation: "Bu işletmeye 'WedyPlan Verified Luxury' rozeti verilmesi önerilir.",
  });

  const [vendors, setVendors] = useState([
    {
      id: "vnd_101",
      companyName: "Bodrum Sunset Venue & Luxury Events",
      category: "Düğün Mekanı",
      taxNumber: "9820192831",
      location: "Bodrum, Muğla",
      isPremium: true,
      isFeatured: true,
      totalRevenue: 1240000,
      status: "ACTIVE",
      csatScore: "4.9",
      subscriptionPlan: "Enterprise Luxury",
    },
    {
      id: "vnd_102",
      companyName: "Ege Panorama Fotoğraf & Sinema",
      category: "Fotoğraf & Video",
      taxNumber: "1120948120",
      location: "İzmir, Türkiye",
      isPremium: false,
      isFeatured: true,
      totalRevenue: 340000,
      status: "PENDING_APPROVAL",
      csatScore: "Yeni",
      subscriptionPlan: "Pro Business",
    },
    {
      id: "vnd_103",
      companyName: "Kayıp Sahne Ses & Işık Sistemleri",
      category: "Müzik & Ses",
      taxNumber: "8830192839",
      location: "İstanbul, Türkiye",
      isPremium: false,
      isFeatured: false,
      totalRevenue: 120000,
      status: "SUSPENDED",
      csatScore: "2.1",
      subscriptionPlan: "Basic Partner",
    },
  ]);

  const handleApprove = async (vendorId: string) => {
    const res = await approveVendorStatusAction({
      vendorId,
      commissionPercentage: 5,
      isFeatured: true,
      isPremium: false,
    });

    if (res.success) {
      setVendors((prev) =>
        prev.map((v) => (v.id === vendorId ? { ...v, status: "ACTIVE" } : v))
      );
      alert("✨ " + res.message);
    }
  };

  const handleSuspend = async (vendorId: string) => {
    const res = await suspendOrBlacklistVendorAction({
      vendorId,
      action: "SUSPEND",
      reason: "Müşteri şikayeti ve SLA aşımı",
    });

    if (res.success) {
      setVendors((prev) =>
        prev.map((v) => (v.id === vendorId ? { ...v, status: "SUSPENDED" } : v))
      );
      alert("⚠️ " + res.message);
    }
  };

  const filteredVendors = vendors.filter((v) =>
    v.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingApprovals = vendors.filter((v) => v.status === "PENDING_APPROVAL").length;
  const suspendedCount = vendors.filter((v) => v.status === "SUSPENDED").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminVendorHeader
        totalVendors={vendors.length}
        pendingApprovals={pendingApprovals}
        suspendedCount={suspendedCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIVendorRiskWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <VendorManagementTable
            vendors={filteredVendors}
            onSelectVendor={(v) => {
              setSelectedVendor(v);
              setIsDrawerOpen(true);
            }}
            onApprove={handleApprove}
            onSuspend={handleSuspend}
          />
        </div>
      </div>

      <VendorProfileDrawer
        vendor={selectedVendor}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
