export interface ReleaseSummaryModel {
  activeVersion: string;
  upcomingReleasesCount: number;
  pendingApprovalsCount: number;
  systemReadinessScorePct: number;
  releases: Array<{
    id: string;
    version: string;
    title: string;
    status: "PLANNING" | "PENDING_APPROVAL" | "APPROVED" | "DEPLOYED";
    risk: "LOW" | "MEDIUM" | "HIGH";
    maintenanceWindow: string;
    changelogCount: number;
  }>;
}

export function getReleaseStatusSnapshot(): ReleaseSummaryModel {
  return {
    activeVersion: "v2.14.0",
    upcomingReleasesCount: 3,
    pendingApprovalsCount: 1,
    systemReadinessScorePct: 98.5,
    releases: [
      { id: "rel_01", version: "v2.15.0", title: "Q3 Peak Season Core & AI Copilot Enhancement", status: "PENDING_APPROVAL", risk: "MEDIUM", maintenanceWindow: "Salı 03:00 - 04:00 UTC", changelogCount: 14 },
      { id: "rel_02", version: "v2.15.1-hotfix", title: "Emergency Payment Webhook Reconnection Patch", status: "APPROVED", risk: "LOW", maintenanceWindow: "Anlık Acil Bakım", changelogCount: 2 },
      { id: "rel_03", version: "v2.16.0-beta", title: "Multi-Region Global Expansion & Anycast Routing", status: "PLANNING", risk: "HIGH", maintenanceWindow: "Perşembe 02:00 - 05:00 UTC", changelogCount: 28 },
    ],
  };
}
