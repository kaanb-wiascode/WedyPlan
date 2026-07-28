export interface DevExSummaryModel {
  totalDocsCount: number;
  designComponentsCount: number;
  apiEndpointsDocumentedCount: number;
  avgOnboardingDays: number;
  components: Array<{
    id: string;
    name: string;
    package: string;
    storybookUrl: string;
    tokensStatus: string;
    status: "STABLE" | "BETA" | "DEPRECATED";
  }>;
  docs: Array<{
    id: string;
    title: string;
    category: string;
    updatedAt: string;
    author: string;
  }>;
}

export function getDevExStatusSnapshot(): DevExSummaryModel {
  return {
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
  };
}
