"use client";

import React, { useState } from "react";
import AdminCoupleHeader from "./AdminCoupleHeader";
import AICoupleRiskWidget from "./AICoupleRiskWidget";
import CoupleManagementTable from "./CoupleManagementTable";
import CoupleProfileDrawer from "./CoupleProfileDrawer";
import { updateCoupleAccountStatusAction } from "@/lib/actions/admin-couples";

export default function AdminCouplesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCouple, setSelectedCouple] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    trustScore: 98,
    spamRiskScore: 2,
    aiUsageTokens: "142.500 Jeton (Yüksek Etkileşim)",
    loginFrequency: "Son 30 günde 18 aktif oturum",
    auditSummary: "Çift gerçek kullanıcı verileriyle doğrulanmış, 3 farklı tedarikçiyle e-imzalı sözleşmesi bulunuyor. Ödeme kanalları güvenli.",
    recommendation: "Düğün gününe 45 gün kaldı. Otomatik 'Son Kontrol Listesi' hatırlatması gönderilebilir.",
  });

  const [couples, setCouples] = useState([
    {
      id: "cpl_101",
      coupleNames: "Selin & Kaan Yılmaz",
      email: "selin.kaan@wedyplan.demo",
      phone: "+90 532 111 2233",
      weddingDate: "12 Eylül 2026",
      city: "Bodrum, Muğla",
      budget: 450000,
      weddingStatus: "PLANNING",
      accountStatus: "ACTIVE",
      signedVendorsCount: 3,
    },
    {
      id: "cpl_102",
      coupleNames: "Ece & Mert Demir",
      email: "ece.mert@wedyplan.demo",
      phone: "+90 533 222 3344",
      weddingDate: "28 Temmuz 2026",
      city: "İstanbul, Türkiye",
      budget: 680000,
      weddingStatus: "D_DAY_TODAY",
      accountStatus: "ACTIVE",
      signedVendorsCount: 5,
    },
    {
      id: "cpl_103",
      coupleNames: "Zeynep & Can Kaya",
      email: "zeynep.can@wedyplan.demo",
      phone: "+90 535 333 4455",
      weddingDate: "14 Mayıs 2026",
      city: "İzmir, Türkiye",
      budget: 320000,
      weddingStatus: "COMPLETED",
      accountStatus: "ACTIVE",
      signedVendorsCount: 2,
    },
  ]);

  const handleToggleStatus = async (coupleId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const res = await updateCoupleAccountStatusAction({
      coupleId,
      status: nextStatus as any,
    });

    if (res.success) {
      setCouples((prev) =>
        prev.map((c) => (c.id === coupleId ? { ...c, accountStatus: nextStatus } : c))
      );
      alert("✨ " + res.message);
    }
  };

  const filteredCouples = couples.filter((c) =>
    c.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePlanningCount = couples.filter((c) => c.weddingStatus === "PLANNING").length;
  const todayWeddingsCount = couples.filter((c) => c.weddingStatus === "D_DAY_TODAY").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminCoupleHeader
        totalCouplesCount={couples.length}
        activePlanningCount={activePlanningCount}
        todayWeddingsCount={todayWeddingsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AICoupleRiskWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <CoupleManagementTable
            couples={filteredCouples}
            onSelectCouple={(c) => {
              setSelectedCouple(c);
              setIsDrawerOpen(true);
            }}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>

      <CoupleProfileDrawer
        couple={selectedCouple}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
