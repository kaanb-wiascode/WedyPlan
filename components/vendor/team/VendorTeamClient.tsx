"use client";

import React, { useState } from "react";
import TeamHeader from "./TeamHeader";
import AITeamIntelligenceWidget from "./AITeamIntelligenceWidget";
import RolePermissionMatrix from "./RolePermissionMatrix";
import EmployeeListTable from "./EmployeeListTable";
import { inviteVendorEmployeeAction } from "@/lib/actions/vendor-team";

export default function VendorTeamClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    teamWorkloadScore: 84,
    overworkedEmployees: [
      { name: "Ahmet Yılmaz", role: "Saha Koordinatörü", hoursThisWeek: 48, risk: "YÜKSEK TÜKENMİŞLİK RİSKİ" },
    ],
    shiftSuggestions: [
      "19 Haziran Cumartesi düğünü için 350 kişilik yemek servisine +2 destek garson personeli atanması önerilir.",
    ],
    conflictAlerts: [
      "Mehmet Demir (Baş Şef) aynı saat diliminde 2 farklı etkinlik mutfağına atanmış.",
    ],
  });

  const [employees, setEmployees] = useState([
    {
      id: "emp_1",
      fullName: "Ahmet Yılmaz",
      email: "ahmet@wedyplan.demo",
      phone: "+90 532 111 2233",
      department: "Operasyon & Saha",
      role: "MANAGER",
      status: "ACTIVE",
      performanceScore: "4.9",
    },
    {
      id: "emp_2",
      fullName: "Mehmet Demir",
      email: "mehmet@wedyplan.demo",
      phone: "+90 533 222 3344",
      department: "Mutfak & Catering",
      role: "COORDINATOR",
      status: "ACTIVE",
      performanceScore: "4.8",
    },
    {
      id: "emp_3",
      fullName: "Canan Kaya",
      email: "canan@wedyplan.demo",
      phone: "+90 535 333 4455",
      department: "Satış & İletişim",
      role: "STAFF",
      status: "ON_LEAVE",
      performanceScore: "5.0",
    },
  ]);

  const handleInviteMock = async () => {
    const res = await inviteVendorEmployeeAction(vendorId, {
      fullName: "Selin Şahin",
      email: "selin.sahin@wedyplan.demo",
      phone: "+90 536 444 5566",
      department: "OPERATIONS",
      role: "COORDINATOR",
    });

    if (res.success) {
      setEmployees([
        ...employees,
        {
          id: res.employeeId || "emp_" + Date.now(),
          fullName: "Selin Şahin",
          email: "selin.sahin@wedyplan.demo",
          phone: "+90 536 444 5566",
          department: "Operasyon & Saha",
          role: "COORDINATOR",
          status: "ACTIVE",
          performanceScore: "Yeni",
        },
      ]);
      alert("✨ " + res.message);
    }
  };

  const activeStaffCount = employees.filter((e) => e.status === "ACTIVE").length;
  const onLeaveCount = employees.filter((e) => e.status === "ON_LEAVE").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <TeamHeader
        totalEmployeesCount={employees.length}
        activeStaffCount={activeStaffCount}
        onLeaveCount={onLeaveCount}
        onOpenInviteModal={handleInviteMock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AITeamIntelligenceWidget aiData={aiData} />
          <RolePermissionMatrix roles={[]} />
        </div>

        <div className="lg:col-span-7">
          <EmployeeListTable
            employees={employees}
            onSelectEmployee={(emp) => alert("👤 Personel Detay & Yetki Düzenleyici: " + emp.fullName)}
          />
        </div>
      </div>
    </div>
  );
}
