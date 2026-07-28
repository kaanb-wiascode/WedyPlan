import { AnalyzeBudgetInput } from "@/lib/validations/ai-budget-engine";

export interface BudgetAnalysisResult {
  healthScore: number;
  riskScore: number;
  unexpectedCostEstimate: number;
  potentialSavings: number;
  categories: Array<{
    name: string;
    allocatedAmount: number;
    recommendedPercentage: number;
    riskStatus: "HEALTHY" | "OVER_BUDGET_RISK" | "UNDER_ALLOCATED";
  }>;
  cashFlowTimeline: Array<{
    month: string;
    paymentAmount: number;
    milestone: string;
  }>;
}

export function calculateBudgetHealth(input: AnalyzeBudgetInput): BudgetAnalysisResult {
  const perGuestBudget = input.totalBudget / input.guestCount;
  let healthScore = 88;
  let riskScore = 14;

  if (perGuestBudget < 1000 && input.currency === "TRY") {
    healthScore = 72;
    riskScore = 35;
  }

  const allocatedVenue = Math.round(input.totalBudget * 0.40);
  const allocatedCatering = Math.round(input.totalBudget * 0.25);
  const allocatedPhoto = Math.round(input.totalBudget * 0.12);
  const allocatedDecor = Math.round(input.totalBudget * 0.13);
  const allocatedOthers = Math.round(input.totalBudget * 0.10);

  return {
    healthScore,
    riskScore,
    unexpectedCostEstimate: Math.round(input.totalBudget * 0.08),
    potentialSavings: Math.round(input.totalBudget * 0.15),
    categories: [
      { name: "Mekan & Konaklama", allocatedAmount: allocatedVenue, recommendedPercentage: 40, riskStatus: "HEALTHY" },
      { name: "Catering & Yeme İçme", allocatedAmount: allocatedCatering, recommendedPercentage: 25, riskStatus: "HEALTHY" },
      { name: "Fotoğraf & Video Production", allocatedAmount: allocatedPhoto, recommendedPercentage: 12, riskStatus: "HEALTHY" },
      { name: "Dekorasyon & Çiçek Tasarım", allocatedAmount: allocatedDecor, recommendedPercentage: 13, riskStatus: "OVER_BUDGET_RISK" },
      { name: "Gelinlik, Müzik & Diğer", allocatedAmount: allocatedOthers, recommendedPercentage: 10, riskStatus: "HEALTHY" },
    ],
    cashFlowTimeline: [
      { month: "İlk 1. Ay (Kayıt & Kapora)", paymentAmount: Math.round(input.totalBudget * 0.30), milestone: "Mekan ve Ana Tedarikçi Kaporaları" },
      { month: "Düğüne 3 Ay Kala", paymentAmount: Math.round(input.totalBudget * 0.40), milestone: "Gelinlik, Fotoğrafçı & Müzik Sözleşme Taksitleri" },
      { month: "Düğün Haftası (Son Ödeme)", paymentAmount: Math.round(input.totalBudget * 0.30), milestone: "Kapanış Bakiyeleri & Bahşişler" },
    ],
  };
}
