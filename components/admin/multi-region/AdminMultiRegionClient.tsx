"use client";

import React, { useState } from "react";
import MultiRegionHeader from "./MultiRegionHeader";
import GeoLatencyMatrixBento from "./GeoLatencyMatrixBento";
import GlobalTrafficManagerConsole from "./GlobalTrafficManagerConsole";
import RegionOptimizationViewer from "./RegionOptimizationViewer";

export default function AdminMultiRegionClient() {
  const [data] = useState({
    activeRegionsCount: 6,
    globalAvgLatencyMs: 22,
    peakRegionText: "EUROPE (Frankfurt)",
    globalStatusText: "ANYCAST_MESH_ACTIVE",
    nodes: [
      { regionCode: "EUROPE", regionName: "Europe (Frankfurt / London)", status: "OPTIMIZED", avgLatencyMs: 12, activeUsersCount: 42000, regionalDbStatus: "PostgreSQL Multi-Primary Sync", regionalStorageStatus: "S3 Europe Encrypted Bucket", regionalAiProvider: "OpenAI EU Gateway", dataResidencyStatus: "GDPR_ENFORCED" },
      { regionCode: "MIDDLE_EAST", regionName: "Middle East (Bahrain / Dubai)", status: "OPTIMIZED", avgLatencyMs: 24, activeUsersCount: 18500, regionalDbStatus: "PostgreSQL Read Replica", regionalStorageStatus: "S3 ME Encrypted Bucket", regionalAiProvider: "Azure ME AI Gateway", dataResidencyStatus: "LOCAL_LAW_COMPLIANT" },
      { regionCode: "NORTH_AMERICA", regionName: "North America (Virginia / Oregon)", status: "OPTIMIZED", avgLatencyMs: 18, activeUsersCount: 35000, regionalDbStatus: "PostgreSQL Read Replica", regionalStorageStatus: "S3 US Encrypted Bucket", regionalAiProvider: "Anthropic Claude US", dataResidencyStatus: "US_SOC2_ENFORCED" },
      { regionCode: "ASIA_PACIFIC", regionName: "Asia Pacific (Singapore / Tokyo)", status: "OPTIMIZED", avgLatencyMs: 32, activeUsersCount: 22000, regionalDbStatus: "PostgreSQL Read Replica", regionalStorageStatus: "S3 APAC Encrypted Bucket", regionalAiProvider: "AWS Bedrock APAC", dataResidencyStatus: "APAC_COMPLIANT" },
      { regionCode: "SOUTH_AMERICA", regionName: "South America (São Paulo)", status: "ONLINE", avgLatencyMs: 48, activeUsersCount: 8200, regionalDbStatus: "Global Edge DB Cache", regionalStorageStatus: "S3 SA Encrypted Bucket", regionalAiProvider: "OpenAI SA Gateway", dataResidencyStatus: "LGPD_ENFORCED" },
      { regionCode: "AFRICA", regionName: "Africa (Cape Town / Johannesburg)", status: "ONLINE", avgLatencyMs: 52, activeUsersCount: 4500, regionalDbStatus: "Global Edge DB Cache", regionalStorageStatus: "S3 AF Encrypted Bucket", regionalAiProvider: "AWS Bedrock AF", dataResidencyStatus: "POPIA_COMPLIANT" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MultiRegionHeader
        activeRegionsCount={data.activeRegionsCount}
        globalAvgLatencyMs={data.globalAvgLatencyMs}
        peakRegionText={data.peakRegionText}
        globalStatusText={data.globalStatusText}
        onOpenTrafficManagerModal={() => alert("🌐 Global Traffic Manager Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <GlobalTrafficManagerConsole />
          <RegionOptimizationViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <GeoLatencyMatrixBento nodes={data.nodes} />
        </div>
      </div>
    </div>
  );
}
