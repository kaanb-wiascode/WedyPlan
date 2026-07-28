"use client";

import React, { useState } from "react";
import DevExHeader from "./DevExHeader";
import ComponentLibraryBento from "./ComponentLibraryBento";
import DeveloperCopilotConsole from "./DeveloperCopilotConsole";
import EngineeringWikiViewer from "./EngineeringWikiViewer";

export default function AdminDevExClient() {
  const [data] = useState({
    totalDocsCount: 142,
    designComponentsCount: 64,
    apiEndpointsDocumentedCount: 128,
    avgOnboardingDays: 2.1,
    components: [
      { id: "comp_01", name: "WedyPlanGlassmorphicCard", package: "@wedyplan/ui-core", storybookUrl: "https://storybook.wedyplan.com/?path=/story/card", tokensStatus: "FIGMA_SYNCED", status: "STABLE" },
      { id: "comp_02", name: "VendorOfferBentoGrid", package: "@wedyplan/ui-vendor", storybookUrl: "https://storybook.wedyplan.com/?path=/story/bento", tokensStatus: "FIGMA_SYNCED", status: "STABLE" },
      { id: "comp_03", name: "AICopilotChatDrawer", package: "@wedyplan/ui-ai", storybookUrl: "https://storybook.wedyplan.com/?path=/story/copilot", tokensStatus: "FIGMA_SYNCED", status: "STABLE" },
      { id: "comp_04", name: "VenueMapVectorMarker", package: "@wedyplan/ui-marketplace", storybookUrl: "https://storybook.wedyplan.com/?path=/story/map", tokensStatus: "FIGMA_SYNCED", status: "STABLE" },
    ],
    docs: [
      { id: "doc_01", title: "Shared Enterprise Microservices Architecture Guide", category: "ARCHITECTURE", updatedAt: "Bugün", author: "Lead Architect" },
      { id: "doc_02", title: "Server Actions & Zod Validation Standards (Next.js 15)", category: "WIKI", updatedAt: "Dün", author: "Core Team" },
      { id: "doc_03", title: "OpenAPI v3.1 Marketplace & Payment Endpoints Spec", category: "API_SPEC", updatedAt: "3 gün önce", author: "API Engineer" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <DevExHeader
        totalDocsCount={data.totalDocsCount}
        designComponentsCount={data.designComponentsCount}
        apiEndpointsDocumentedCount={data.apiEndpointsDocumentedCount}
        avgOnboardingDays={data.avgOnboardingDays}
        onOpenCopilotModal={() => alert("🤖 AI Developer Copilot Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <DeveloperCopilotConsole />
          <EngineeringWikiViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ComponentLibraryBento components={data.components} docs={data.docs} />
        </div>
      </div>
    </div>
  );
}
