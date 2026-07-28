"use client";

import React, { useState } from "react";
import SREHeader from "./SREHeader";
import ErrorBudgetBento from "./ErrorBudgetBento";
import IncidentCommandCenter from "./IncidentCommandCenter";

export default function AdminSREClient() {
  const [data] = useState({
    reliabilityScore: 99.96,
    activeIncidents: 1,
    statusPageStatus: "ALL_SYSTEMS_OPERATIONAL",
    budgets: [
      { serviceName: "Checkout & Payment API", targetSloPct: 99.95, currentSliPct: 99.98, remainingErrorBudgetPct: 84.2, burnRateMultiplier: 0.8, status: "HEALTHY" },
      { serviceName: "AI Central Brain Coordinator", targetSloPct: 99.90, currentSliPct: 99.82, remainingErrorBudgetPct: 41.0, burnRateMultiplier: 1.4, status: "WARNING" },
      { serviceName: "PostgreSQL Database Core", targetSloPct: 99.99, currentSliPct: 99.99, remainingErrorBudgetPct: 96.5, burnRateMultiplier: 0.2, status: "HEALTHY" },
      { serviceName: "Search Vector Indexing Engine", targetSloPct: 99.90, currentSliPct: 99.95, remainingErrorBudgetPct: 91.0, burnRateMultiplier: 0.5, status: "HEALTHY" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SREHeader
        reliabilityScore={data.reliabilityScore}
        activeIncidents={data.activeIncidents}
        statusPageStatus={data.statusPageStatus}
        onOpenIncidentModal={() => alert("🚨 SRE Incident Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <IncidentCommandCenter />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ErrorBudgetBento budgets={data.budgets} />
        </div>
      </div>
    </div>
  );
}
