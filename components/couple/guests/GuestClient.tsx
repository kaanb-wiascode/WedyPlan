"use client";

import React, { useState } from "react";
import GuestHeader from "./GuestHeader";
import AIGuestInsightsCard from "./AIGuestInsightsCard";
import TablePlannerWidget from "./TablePlannerWidget";
import GuestTableList from "./GuestTableList";

export default function GuestClient({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const [guests] = useState([
    {
      id: "g1",
      firstName: "Ahmet",
      lastName: "Yılmaz",
      category: "FAMILY",
      rsvpStatus: "CONFIRMED",
      dietaryPreference: "NONE",
      tableName: "Masa 1 - Protokol",
      needsAccommodation: true,
      attendanceProbability: 98,
    },
    {
      id: "g2",
      firstName: "Merve",
      lastName: "Demir",
      category: "FRIEND",
      rsvpStatus: "CONFIRMED",
      dietaryPreference: "VEGAN",
      tableName: "Masa 4 - Üniversite Grubu",
      needsAccommodation: false,
      attendanceProbability: 92,
    },
    {
      id: "g3",
      firstName: "Can",
      lastName: "Kaya",
      category: "VIP",
      rsvpStatus: "PENDING",
      dietaryPreference: "GLUTEN_FREE",
      tableName: "Atanmadı",
      needsAccommodation: true,
      attendanceProbability: 65,
    },
  ]);

  const filteredGuests = guests.filter((g) => {
    const fullName = (g.firstName + " " + g.lastName).toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <GuestHeader
        totalGuests={180}
        confirmedGuests={124}
        pendingGuests={42}
        declinedGuests={14}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIGuestInsightsCard confirmedCount={124} totalCount={180} />
          <TablePlannerWidget />
        </div>

        <div className="lg:col-span-8">
          <GuestTableList guests={filteredGuests} />
        </div>
      </div>
    </div>
  );
}
