"use client";

import React, { useState } from "react";
import ReleasesHeader from "./ReleasesHeader";
import ReleaseCalendarBento from "./ReleaseCalendarBento";
import ReleaseApprovalConsole from "./ReleaseApprovalConsole";
import ReleaseAnalyticsViewer from "./ReleaseAnalyticsViewer";

export default function AdminReleasesClient() {
  const [data] = useState({
    activeVersion: "v2.14.0",
    upcomingReleasesCount: 3,
    pendingApprovalsCount: 1,
    systemReadinessScorePct: 98.5,
    releases: [
      { id: "rel_01", version: "v2.15.0", title: "Q3 Peak Season Core & AI Copilot Enhancement", status: "PENDING_APPROVAL", risk: "MEDIUM", maintenanceWindow: "Salı 03:00 - 04:00 UTC", changelogCount: 14 },
      { id: "rel_02", version: "v2.15.1-hotfix", title: "Emergency Payment Webhook Reconnection Patch", status: "APPROVED", risk: "LOW", maintenanceWindow: "Anlık Acil Bakım", changelogCount: 2 },
      { id: "rel_03", version: "v2.16.0-beta", title: "Multi-Region Global Expansion & Anycast Routing", status: "PLANNING", risk: "HIGH", maintenanceWindow: "Perşembe 02:00 - 05:00 UTC", changelogCount: 28 },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ReleasesHeader
        activeVersion={data.activeVersion}
        upcomingReleasesCount={data.upcomingReleasesCount}
        pendingApprovalsCount={data.pendingApprovalsCount}
        systemReadinessScorePct={data.systemReadinessScorePct}
        onOpenPlanModal={() => alert("🚀 Release Approval Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <ReleaseApprovalConsole />
          <ReleaseAnalyticsViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ReleaseCalendarBento releases={data.releases} />
        </div>
      </div>
    </div>
  );
}
