"use client";

import React, { useState } from "react";
import LoadTestingHeader from "./LoadTestingHeader";
import BenchmarkMetricsBento from "./BenchmarkMetricsBento";
import LoadGeneratorConsole from "./LoadGeneratorConsole";
import CapacityForecastViewer from "./CapacityForecastViewer";

export default function AdminLoadTestingClient() {
  const [data] = useState({
    maxUsersCount: 45000,
    maxRps: 12500,
    avgP95Ms: 32,
    overallScalabilityScore: "ENTERPRISE_HIGH_SCALE_READY",
    snapshots: [
      { testId: "bench_01", scenarioName: "Peak Season Wedding Venue Search Spike", targetModule: "Marketplace Search Engine", concurrentUsersCount: 15000, achievedRps: 4200, avgResponseMs: 14, p95Ms: 32, p99Ms: 58, dbPoolUsagePct: 42.1, queueLength: 0, status: "COMPLETED" },
      { testId: "bench_02", scenarioName: "AI Copilot Concurrent Proposal Draft Generation", targetModule: "AI Central Brain Coordinator", concurrentUsersCount: 2500, achievedRps: 850, avgResponseMs: 124, p95Ms: 180, p99Ms: 240, dbPoolUsagePct: 28.4, queueLength: 12, status: "COMPLETED" },
      { testId: "bench_03", scenarioName: "Flash Deal Checkout & Iyzico Payment Load", targetModule: "Checkout & Payment Gateway", concurrentUsersCount: 8000, achievedRps: 1800, avgResponseMs: 38, p95Ms: 64, p99Ms: 92, dbPoolUsagePct: 56.0, queueLength: 4, status: "COMPLETED" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <LoadTestingHeader
        maxUsersCount={data.maxUsersCount}
        maxRps={data.maxRps}
        avgP95Ms={data.avgP95Ms}
        overallScalabilityScore={data.overallScalabilityScore}
        onOpenGeneratorModal={() => alert("🚀 Load Generator Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <LoadGeneratorConsole />
          <CapacityForecastViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <BenchmarkMetricsBento snapshots={data.snapshots} />
        </div>
      </div>
    </div>
  );
}
