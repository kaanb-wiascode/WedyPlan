export interface StressTestResultSummary {
  testId: string;
  scenarioName: string;
  stressType: string;
  targetModule: string;
  breakingPointRps: number;
  breakingPointVu: number;
  firstFailingComponent: string;
  recoveryDurationSeconds: number;
  status: "BREAKING_POINT_REACHED" | "PASSED_WITHOUT_BREAKING" | "ABORTED";
}

export function getStressTestStatusSnapshot(): StressTestResultSummary[] {
  return [
    {
      testId: "str_01",
      scenarioName: "Extreme Traffic & Marketplace Search Storm",
      stressType: "SEARCH_STORM",
      targetModule: "Hybrid Search Vector Engine",
      breakingPointRps: 28400,
      breakingPointVu: 65000,
      firstFailingComponent: "Redis Vector Index Cache Memory",
      recoveryDurationSeconds: 4,
      status: "BREAKING_POINT_REACHED",
    },
    {
      testId: "str_02",
      scenarioName: "Mass AI Copilot Proposal Generation Storm",
      stressType: "MASS_AI_REQUESTS",
      targetModule: "AI Central Brain Coordinator",
      breakingPointRps: 8500,
      breakingPointVu: 22000,
      firstFailingComponent: "AI Provider Rate Limit & Token Buffer",
      recoveryDurationSeconds: 6,
      status: "BREAKING_POINT_REACHED",
    },
    {
      testId: "str_03",
      scenarioName: "Mass Flash Deal Payments & Checkout Storm",
      stressType: "MASS_PAYMENTS",
      targetModule: "Checkout & Iyzico Payment Gateway",
      breakingPointRps: 18200,
      breakingPointVu: 48000,
      firstFailingComponent: "PostgreSQL Primary Connection Pool",
      recoveryDurationSeconds: 3,
      status: "BREAKING_POINT_REACHED",
    },
  ];
}
