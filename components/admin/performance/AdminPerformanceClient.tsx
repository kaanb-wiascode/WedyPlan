"use client";

import React, { useState } from "react";
import PerformanceHeader from "./PerformanceHeader";
import WebVitalsBento from "./WebVitalsBento";
import CDNAndEdgeOptimizer from "./CDNAndEdgeOptimizer";
import AIPerformanceInspector from "./AIPerformanceInspector";

export default function AdminPerformanceClient() {
  const [data] = useState({
    overallScore: 98,
    lcpMs: 820,
    inpMs: 42,
    cdnHitRate: 99.4,
    routesPerformance: [
      { path: "/marketplace/wedding-venues", lcp: 740, inp: 38, cls: 0.00, status: "GOOD" },
      { path: "/couple/dashboard", lcp: 880, inp: 45, cls: 0.01, status: "GOOD" },
      { path: "/vendor/offers", lcp: 920, inp: 52, cls: 0.02, status: "GOOD" },
      { path: "/api/ai/copilot-draft", lcp: 1100, inp: 85, cls: 0.00, status: "NEEDS_IMPROVEMENT" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PerformanceHeader
        overallScore={data.overallScore}
        lcpMs={data.lcpMs}
        inpMs={data.inpMs}
        cdnHitRate={data.cdnHitRate}
        onOpenAnalysisModal={() => alert("⚡ AI Performance Inspection Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPerformanceInspector />
          <CDNAndEdgeOptimizer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <WebVitalsBento routes={data.routesPerformance} />
        </div>
      </div>
    </div>
  );
}
