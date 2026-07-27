"use client";

import React, { useState } from "react";
import InvitationHeader from "./InvitationHeader";
import AIInvitationCopyCard from "./AIInvitationCopyCard";
import QRCheckInWidget from "./QRCheckInWidget";
import RSVPTrackingTable from "./RSVPTrackingTable";

export default function InvitationClient({ userId }: { userId: string }) {
  const [guests] = useState([
    {
      id: "g1",
      name: "Ahmet Yılmaz",
      phone: "+90 532 000 0011",
      plusOne: true,
      plusOneName: "Ayşe Yılmaz",
      status: "CONFIRMED",
      mealPreference: "Set Menü (Et)",
      dietaryNotes: "Glutensiz Ekmek Rica Ediyor",
      checkInCode: "QR_AHMET_881",
    },
    {
      id: "g2",
      name: "Merve Demir",
      phone: "+90 533 000 0022",
      plusOne: false,
      status: "CONFIRMED",
      mealPreference: "Vejetaryen",
      dietaryNotes: "Süt ve Süt Ürünleri Alerjisi",
      checkInCode: "QR_MERVE_412",
    },
    {
      id: "g3",
      name: "Can Kaya",
      phone: "+90 535 000 0033",
      plusOne: false,
      status: "PENDING",
      mealPreference: "Belirtilmedi",
      dietaryNotes: "",
      checkInCode: "",
    },
  ]);

  const confirmedCount = guests.filter((g) => g.status === "CONFIRMED").length;
  const pendingCount = guests.filter((g) => g.status === "PENDING").length;
  const declinedCount = guests.filter((g) => g.status === "DECLINED").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <InvitationHeader
        totalGuests={guests.length}
        confirmedCount={confirmedCount}
        pendingCount={pendingCount}
        declinedCount={declinedCount}
        checkedInCount={12}
        onOpenCreateModal={() => alert("➕ Yeni Dijital Davetiye Modalı")}
        onExportStatus={() => alert("📥 Excel Listesi İndiriliyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIInvitationCopyCard
            userId={userId}
            pendingCount={pendingCount}
          />
          <QRCheckInWidget />
        </div>

        <div className="lg:col-span-8">
          <RSVPTrackingTable guests={guests} />
        </div>
      </div>
    </div>
  );
}
